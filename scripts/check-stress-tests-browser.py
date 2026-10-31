#!/usr/bin/env python3
"""Acceptance via existing CDP or explicitly opted-in, isolated headless Chrome."""
import argparse
import asyncio
import json
from pathlib import Path
from urllib.parse import parse_qs, urljoin, urlsplit
from playwright.async_api import async_playwright


async def check(url, screenshot=None, headless=False, screenshot_dir=None):
    async with async_playwright() as pw:
        # launch() owns an ephemeral profile. No persistent context, user-data-dir,
        # CDP attachment or existing account state is used in headless mode.
        browser = (await pw.chromium.launch(channel='chrome', headless=True) if headless
                   else await pw.chromium.connect_over_cdp('http://localhost:9222'))
        context = await browser.new_context() if headless else browser.contexts[0]
        page = await context.new_page()
        errors = []
        screenshots = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        async def capture(name):
            if screenshot_dir:
                directory = Path(screenshot_dir)
                directory.mkdir(parents=True, exist_ok=True)
                target = directory / (name + '.png')
                await page.screenshot(path=str(target))
                screenshots.append(str(target.resolve()))

        try:
            await page.goto(url, wait_until='networkidle')
            await page.locator('#app').wait_for(state='visible')
            data = await page.evaluate("async()=> (await fetch('../data/stress-tests.json')).json()")
            for width, height in [(1440, 1000), (390, 844)]:
                await page.set_viewport_size({'width': width, 'height': height})
                await page.goto(url, wait_until='networkidle')
                await page.locator('#app').wait_for(state='visible')
                await page.evaluate('scrollTo(0,0)')
                await capture(f'stress-tests-{width}-overview')
                assert await page.locator('#route option').count() == 32
                assert await page.locator('.point').count() == 32
                assert 'safeguard, not' in ' '.join((await page.locator('h1').text_content()).split())
                for r in data['routes']:
                    await page.locator('#route').select_option(r['id'])
                    assert r['headline'] in await page.locator('#route-content').inner_text()
                    await page.locator(f'.point[data-route="{r["id"]}"]').focus()
                    await page.keyboard.press('Enter')
                    assert await page.locator('#route').input_value() == r['id']
                    assert r['headline'] in await page.locator('#route-content').inner_text()
                    assert parse_qs(urlsplit(page.url).query)['route'] == [r['id']]
                    # Claim links must open their otherwise-collapsed source panel.
                    evidence = page.locator('#route-content details').filter(has=page.locator('.claim')).first
                    await evidence.locator('summary').first.click()
                    citation = evidence.locator('a[href^="#src-"]').first
                    source_id = (await citation.get_attribute('href'))[5:]
                    assert not await page.locator('#route-sources').evaluate('(e)=>e.open')
                    await citation.click()
                    assert await page.locator('#route-sources').evaluate('(e)=>e.open')
                    await page.locator('#src-' + source_id).wait_for(state='visible')
                    source_link = page.locator('#src-' + source_id + ' h3 a')
                    assert await source_link.get_attribute('href') == urljoin(url, data['sources'][source_id]['href'])
                    if urlsplit(await source_link.get_attribute('href')).netloc != urlsplit(url).netloc:
                        assert await source_link.get_attribute('target') == '_blank'
                        assert 'noopener' in await source_link.get_attribute('rel')
                    await page.locator('#route-content details').evaluate_all('els=>els.forEach(e=>e.open=true)')
                    for finding in r['checkFindings']:
                        assert finding['id'] in await page.locator('#route-content').inner_text()
                        assert finding['finding'] in await page.locator('#route-content').inner_text()
                    assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), r['id']
                    for status in ['', 'read', 'partial', 'inaccessible', 'unresolved']:
                        await page.locator('#source-status').select_option(status)
                        tags = await page.locator('#source-list .source .tag:first-child').all_text_contents()
                        expected = [data['sources'][sid]['access'] for sid in r['sourceIds']
                                    if not status or data['sources'][sid]['access'] == status]
                        assert tags == expected, (r['id'], status)
                # Last route has a missing reach factor: prior changes must be visible.
                displayed = set()
                for s in data['scenarios']:
                    await page.locator('#scenario').select_option(s['regime'])
                    await page.locator('#prior').select_option(str(s['prior']))
                    p = next(r for r in s['routes'] if r['id'] == data['routes'][-1]['id'])
                    selected = page.locator('.point.selected')
                    assert abs(float(await selected.get_attribute('cx')) - (48+p['x']*360)) < 1e-8
                    assert abs(float(await selected.get_attribute('cy')) - (318-p['y']*270)) < 1e-8
                    cells = await page.locator('#coordinates tbody td').all_text_contents()
                    expected = await page.evaluate('(p)=>[(p.x*100).toFixed(1),(p.y*100).toFixed(1)]', p)
                    assert [cells[1], cells[3]] == expected, (s['id'], cells, expected)
                    displayed.add(tuple(expected))
                    query = parse_qs(urlsplit(page.url).query)
                    assert query['scenario'] == [s['regime']] and query['prior'] == [str(s['prior'])]
                assert len(displayed) > 3, 'Scenario selector must change displayed data'
                saved = page.url
                await page.reload(wait_until='networkidle')
                assert page.url == saved
                assert await page.locator('#scenario').input_value() == data['scenarios'][-1]['regime']
                assert await page.locator('#prior').input_value() == str(data['scenarios'][-1]['prior'])
                assert await page.locator('#coordinates tbody td').all_text_contents() == cells
                await page.locator('#search').fill('no-match-xyz')
                assert await page.locator('#route option').count() == 0
                assert 'No matching routes' in await page.locator('#route-content').inner_text()
                await page.locator('button[type="reset"]').click()
                assert await page.locator('#route option').count() == 32
                await page.locator('#scenario').select_option('baseline')
                await page.locator('#prior').select_option('0.5')
                await page.locator('section[aria-labelledby="sensitivity-title"]').evaluate('(e)=>e.scrollIntoView()')
                await capture(f'stress-tests-{width}-sensitivity')
                # Exercise a synthesis-only citation, including a saved fact alias.
                await page.locator('#perspectives > details').last.locator('summary').first.click()
                point = page.locator('#coverage details').filter(has=page.locator('a[href="#src-eu-national-quota"]')).first
                await point.locator('summary').click()
                await point.locator('a[href="#src-eu-national-quota"]').click()
                await page.locator('#src-eu-national-quota').wait_for(state='visible')
                assert await page.locator('#route-sources').evaluate('(e)=>e.open')
                await capture(f'stress-tests-{width}-source')
                await page.locator('details').evaluate_all('els=>els.forEach(e=>e.open=true)')
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), r['id']
            rendered_downloads = await page.locator('#downloads a').evaluate_all('els=>els.map(a=>a.href)')
            assert rendered_downloads == [urljoin(url, d['href']) for d in data['downloads']]
            for d, href in zip(data['downloads'], rendered_downloads):
                response = await page.request.get(href)
                assert response.status == 200, (d['path'], response.status)
            for report in await page.locator('a[href*="Safeguard%20proposal%20stress%20tests.md"]').all():
                response = await page.request.get(urljoin(url, await report.get_attribute('href')))
                assert response.status == 200 and len(await response.body()) > 1000
            # Fetch the rendered report target; Markdown handling varies by browser.
            report_url = urljoin(url, await page.locator('header a').filter(has_text='Full report').get_attribute('href'))
            response = await page.request.get(report_url)
            assert response.status == 200
            if screenshot:
                await page.screenshot(path=screenshot)
            assert not errors, errors
            print(json.dumps({'mode': 'isolated-headless-chrome' if headless else 'existing-cdp',
                              'viewports': [1440, 390], 'keyboardSelections': 64, 'selectorSelections': 64,
                              'scenarioAndNumericChecks': 30, 'claimSourceLinks': 64,
                              'queryReload': True, 'sourceFilters': True,
                              'downloads': len(data['downloads']), 'fullReport': 'HTTP 200',
                              'horizontalOverflow': False, 'errors': errors, 'screenshots': screenshots}))
        finally:
            await page.close()
            if headless:
                await context.close()
                await browser.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:8765/routes/stress-tests.html')
    parser.add_argument('--screenshot', help='Optional output PNG path for the mobile viewport')
    parser.add_argument('--screenshot-dir', help='Save desktop/mobile overview, sensitivity and source screenshots')
    parser.add_argument('--headless', action='store_true', help='Launch installed Chrome in an isolated ephemeral test profile; no CDP or user accounts')
    args = parser.parse_args()
    asyncio.run(check(args.url, args.screenshot, args.headless, args.screenshot_dir))
