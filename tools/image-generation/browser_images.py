#!/usr/bin/env python3
"""Generate/download Gemini images through an already authorised local browser.

JSON request on stdin; JSON result on stdout. No cookies or credentials are read.
Use submit + collect to recover a long generation without submitting it twice.
"""
import asyncio
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from playwright.async_api import async_playwright

APP = 'https://gemini.google.com/app'
BOX = 'Enter a prompt for Gemini'


def chat_url(value):
    if not isinstance(value, str) or not re.fullmatch(r'https://gemini\.google\.com/app(?:/[a-zA-Z0-9_-]+)?', value):
        raise ValueError('chat_url must be a Gemini /app URL without query parameters')
    return value


def output_directory(value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError('output_dir is required for downloads')
    directory = Path(value).expanduser()
    if not directory.is_absolute():
        raise ValueError('output_dir must be an absolute path')
    directory = directory.resolve()
    directory.mkdir(parents=True, exist_ok=True)
    return directory


def image_info(data):
    # Validate actual file signatures; the suggested filename is not trusted.
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return '.png', 'image/png'
    if data.startswith(b'\xff\xd8\xff'):
        return '.jpg', 'image/jpeg'
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return '.webp', 'image/webp'
    raise ValueError('The downloaded file is not a recognised PNG, JPEG or WebP image')


async def target_page(browser, url=None):
    if not browser.contexts:
        raise RuntimeError('The authorised browser has no context. Open the dedicated browser first.')
    if url:
        url = chat_url(url)
        for context in browser.contexts:
            for page in context.pages:
                if page.url.rstrip('/') == url.rstrip('/'):
                    return page
    page = await browser.contexts[0].new_page()
    await page.goto(url or APP, wait_until='domcontentloaded')
    try:
        await page.get_by_role('textbox', name=BOX, exact=True).wait_for(timeout=20000)
    except Exception as exc:
        raise RuntimeError('Gemini composer unavailable. Sign in or resolve the visible account screen in this browser; no request was submitted.') from exc
    return page


async def submit(page, request):
    prompt = request.get('prompt')
    if not isinstance(prompt, str) or not prompt.strip():
        raise ValueError('A nonempty prompt is required')
    if len(prompt) > 60000:
        raise ValueError('Prompt exceeds 60000 characters')
    # Never replace a human draft or submit into an in-flight generation.
    box = page.get_by_role('textbox', name=BOX, exact=True)
    await box.wait_for(timeout=15000)
    if (await box.inner_text()).strip():
        raise RuntimeError('The selected chat has an unsent draft. Use a new chat or preserve the draft first.')
    if await page.get_by_role('button', name=re.compile(r'^Stop (response|generating)')).count():
        raise RuntimeError('The selected chat is still generating. Collect its result before submitting another prompt.')
    before = await page.locator('user-query').count()
    # Explicitly select image creation using the normal app controls.
    await page.get_by_role('button', name='Upload and tools', exact=True).click()
    item = page.get_by_role('menuitemcheckbox', name='Create image', exact=True)
    await item.wait_for(timeout=10000)
    if await item.get_attribute('aria-checked') == 'true':
        await page.keyboard.press('Escape')
    else:
        await item.click()
    await box.fill(prompt)
    await box.press('Enter')
    try:
        await page.wait_for_function('(n) => document.querySelectorAll("user-query").length > n', arg=before, timeout=20000)
    except Exception as exc:
        raise RuntimeError(f'Submission acknowledgement was not observed. Inspect {page.url}; do not resubmit automatically.') from exc
    await page.wait_for_url(re.compile(r'https://gemini\.google\.com/app/[a-zA-Z0-9_-]+'), timeout=20000)
    return {'provider': 'gemini-web', 'status': 'submitted', 'chat_url': page.url,
            'response_index': before, 'prompt_sha256': hashlib.sha256(prompt.encode()).hexdigest()}


async def collect(page, request):
    index = request.get('response_index')
    if not isinstance(index, int) or isinstance(index, bool) or index < 0:
        raise ValueError('response_index must be the nonnegative index returned by submit')
    timeout = min(max(int(request.get('timeout_seconds', 240)), 10), 600) * 1000
    directory = output_directory(request.get('output_dir'))
    prefix = request.get('prefix', 'gemini-image')
    if not isinstance(prefix, str) or not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}', prefix):
        raise ValueError('prefix must be a plain filename stem (letters, digits, hyphens or underscores)')
    try:
        await page.wait_for_function('''(i) => {
          const r = document.querySelectorAll('model-response')[i];
          return r && Array.from(r.querySelectorAll('img')).some(img => img.complete && img.naturalWidth > 300);
        }''', arg=index, timeout=timeout)
    except Exception:
        response = page.locator('model-response').nth(index)
        excerpt = (await response.inner_text())[:1200] if await response.count() else 'Response has not appeared.'
        return {'provider': 'gemini-web', 'status': 'pending_or_no_image', 'chat_url': page.url,
                'response_index': index, 'response_excerpt': excerpt,
                'next_step': 'Inspect the response or call collect again. Do not duplicate the request.'}
    response = page.locator('model-response').nth(index)
    downloads = response.get_by_role('button', name='Download full-sized image', exact=True)
    await downloads.first.wait_for(timeout=20000)
    count = await downloads.count()
    saved = []
    for number in range(count):
        async with page.expect_download(timeout=90000) as event:
            await downloads.nth(number).click()
        download = await event.value
        error = await download.failure()
        if error:
            raise RuntimeError(f'Gemini download failed: {error}')
        temp = directory / f'.{prefix}-{os.getpid()}-{number}.download'
        await download.save_as(str(temp))
        data = temp.read_bytes()
        try:
            extension, mime = image_info(data)
        except Exception:
            temp.unlink(missing_ok=True)
            raise
        digest = hashlib.sha256(data).hexdigest()
        # Content-addressed suffixes are stable on recovery and never overwrite other work.
        destination = directory / f'{prefix}-{number+1}-{digest[:12]}{extension}'
        if destination.exists():
            if hashlib.sha256(destination.read_bytes()).hexdigest() != digest:
                raise RuntimeError('Existing output has unexpected content; refusing to replace it')
            temp.unlink()
        else:
            temp.rename(destination)
        saved.append({'path': str(destination), 'mime_type': mime, 'bytes': len(data), 'sha256': digest})
    return {'provider': 'gemini-web', 'status': 'downloaded', 'chat_url': page.url,
            'response_index': index, 'images': saved,
            'retrieved_at': datetime.now(timezone.utc).isoformat()}


async def run(request):
    endpoint = request.get('cdp_url') or os.environ.get('IMAGE_BROWSER_CDP', 'http://localhost:9222')
    parsed = urlparse(endpoint)
    if parsed.scheme != 'http' or parsed.hostname not in ('localhost', '127.0.0.1', '::1'):
        raise ValueError('Only the existing local CDP browser is supported')
    action = request.get('action', 'generate')
    if action not in ('status', 'submit', 'collect', 'generate'):
        raise ValueError('Unknown action')
    if action in ('generate', 'collect'):
        prefix = request.get('prefix', 'gemini-image')
        if not isinstance(prefix, str) or not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}', prefix):
            raise ValueError('prefix must be a plain filename stem')
    async with async_playwright() as pw:
        try:
            browser = await pw.chromium.connect_over_cdp(endpoint, timeout=10000)
        except Exception as exc:
            raise RuntimeError('The authorised local browser is not reachable. Open it with its dedicated debug profile; no browser was launched or account copied.') from exc
        if action == 'status':
            pages = [p for c in browser.contexts for p in c.pages if p.url.startswith(APP)]
            return {'provider': 'gemini-web', 'browser_connected': True,
                    'gemini_tabs': len(pages), 'transport': 'Playwright over local CDP',
                    'account_access': 'Existing browser session; sign-in is checked on submission',
                    'capabilities': ['text-to-image', 'follow-up-image-edit', 'original-download']}
        if action == 'collect' and not request.get('chat_url'):
            raise ValueError('collect requires the chat_url from submit')
        # Validate output location before spending a generation on an unusable request.
        if action in ('generate', 'collect'):
            output_directory(request.get('output_dir'))
        page = await target_page(browser, request.get('chat_url'))
        if action in ('submit', 'generate'):
            receipt = await submit(page, request)
            if action == 'submit':
                return receipt
            request = {**request, **receipt}
        return await collect(page, request)


if __name__ == '__main__':
    try:
        request = json.load(sys.stdin)
        if not isinstance(request, dict):
            raise ValueError('Expected a JSON object')
        print(json.dumps(asyncio.run(run(request)), ensure_ascii=False))
    except Exception as exc:
        print(json.dumps({'status': 'error', 'error': str(exc)}, ensure_ascii=False))
        sys.exit(1)
