#!/usr/bin/env python3
"""Smoke-test the served route explorer with Playwright against local or public URLs.

Uses an already-authorized local CDP browser. Never closes the browser or reads
unrelated tabs. Run with a Python environment that already has Playwright.
"""
import argparse
import asyncio
import json
from pathlib import Path
from urllib.parse import urljoin

from playwright.async_api import async_playwright


async def check(url, screenshot):
    async with async_playwright() as playwright:
        browser = await playwright.chromium.connect_over_cdp('http://localhost:9222')
        page = await browser.contexts[0].new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        try:
            await page.set_viewport_size({'width': 1440, 'height': 1100})
            await page.goto(url, wait_until='networkidle')
            await page.locator('#workspace').wait_for(state='visible')
            data = await page.evaluate("async () => (await fetch('../data/routes.json')).json()")
            count = len(data['routes'])
            assert count >= 8, count
            assert await page.locator('.plot-dot').count() == count
            evidence_url = await page.locator('.brief-links a').last.get_attribute('href')
            await page.goto(urljoin(url, evidence_url), wait_until='networkidle')
            assert await page.locator('.source-card').count() >= 1
            await page.locator('#back').click()
            await page.locator('#workspace').wait_for(state='visible')
            await page.locator('.filter-disclosure summary').click()
            await page.locator('#search').fill('no-matching-route-xyz')
            assert await page.locator('#empty').is_visible()
            assert await page.locator('.plot-dot').count() == 0
            await page.locator('#reset').click()
            await page.locator('#coordination').select_option('middle-power')
            middle = [r for r in data['routes'] if r['coordination'] == 'middle-power']
            assert await page.locator('.plot-dot').count() == len(middle)
            await page.locator('#show-list').click()
            assert await page.locator('.route-row:visible').count() == len(middle)
            await page.locator('#reset').click()
            first_pair = next(r['pairId'] for r in data['routes'] if r['pairId'])
            await page.locator('.comparison > summary').click()
            await page.locator(f'[data-pair="{first_pair}"]').click()
            assert await page.locator('.pair-line').count() == 1
            assert await page.locator('.pair-summary button').count() == 2
            await page.locator('#replay-before').click()
            before = data['replay']['before']
            assert str(before['feasibility']) in await page.locator('.score').first.inner_text()
            assert 'Initial' in await page.locator('#route-detail').inner_text() or 'initial' in await page.locator('#route-detail').inner_text()
            replay_url = page.url
            await page.reload(wait_until='networkidle')
            await page.locator('#workspace').wait_for(state='visible')
            assert 'stage=before' in page.url
            assert str(before['feasibility']) in await page.locator('.score').first.inner_text()
            await page.locator('#replay-after').click()
            actual = next(r for r in data['routes'] if r['id'] == data['replay']['routeId'])
            assert str(actual['feasibility']) in await page.locator('.score').first.inner_text()
            await page.locator('#show-map').click()
            await page.locator('.plot-dot').last.focus()
            await page.keyboard.press('Enter')
            assert await page.locator('.plot-dot').last.get_attribute('aria-pressed') == 'true'
            await page.locator('#replay-after').click()
            if screenshot:
                Path(screenshot).parent.mkdir(parents=True, exist_ok=True)
                await page.screenshot(path=screenshot, full_page=True)
            await page.set_viewport_size({'width': 390, 'height': 844})
            overflow = await page.evaluate('document.documentElement.scrollWidth > innerWidth + 1')
            assert not overflow, 'Mobile horizontal overflow'
            for route in data['routes']:
                await page.locator(f'.plot-index [data-route="{route["id"]}"]').click()
                height = await page.locator('#route-detail').evaluate('(el) => el.getBoundingClientRect().height')
                assert height <= 760, (route['id'], height)
            await page.locator('#show-list').scroll_into_view_if_needed()
            await page.locator('#show-list').click()
            assert await page.locator('.route-row:visible').count() == count
            assert not errors, errors
            print(json.dumps({'url': url, 'routes': count, 'checks': ['desktop render', 'source cards', 'empty results', 'coordination filter', 'list', 'pair arrow', 'reversible replay', 'deep-link reload', 'keyboard selection', 'mobile overflow', 'no page errors'], 'replay_url': replay_url}, indent=2))
        finally:
            await page.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('url', nargs='?', default='http://127.0.0.1:8765/routes/')
    parser.add_argument('--screenshot')
    args = parser.parse_args()
    asyncio.run(check(args.url, args.screenshot))
