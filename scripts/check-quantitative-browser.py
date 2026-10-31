#!/usr/bin/env python3
"""Check the served quantitative explorer in the existing authorized CDP browser."""
import argparse
import asyncio
import json
from urllib.parse import urljoin
from playwright.async_api import async_playwright


async def check(url):
    async with async_playwright() as pw:
        browser = await pw.chromium.connect_over_cdp('http://localhost:9222')
        page = await browser.contexts[0].new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        session = await page.context.new_cdp_session(page)
        await session.send('Network.enable')
        await session.send('Network.setCacheDisabled', {'cacheDisabled': True})
        try:
            await page.set_viewport_size({'width': 1440, 'height': 1000})
            await page.goto(url, wait_until='networkidle')
            await page.locator('#q-workspace').wait_for(state='visible')
            data = await page.evaluate("async () => (await fetch('../data/routes-quantitative.json')).json()")
            assert await page.locator('#q-list button').count() == len(data['routes'])
            for basis in data['bases']:
                await page.locator('#basis').select_option(basis['id'])
                expected = sum(1 for r in data['routes'] if
                    (r['quantitative'].get('coverage') or {}).get('basisId') == basis['id']
                    and (r['quantitative'].get('agreements') or {}).get('handoffsLowerBound') is not None)
                assert await page.locator('.q-dot').count() == expected
            await page.locator('.q-assumptions summary').click()
            await page.locator('#use-assumption').check()
            await page.locator('#cooperation').fill('0.7')
            assert await page.locator('.q-dot.scenario').count() > 0
            await page.reload(wait_until='networkidle')
            assert await page.locator('#use-assumption').is_checked()
            assert await page.locator('#cooperation').input_value() == '0.7'
            dot = page.locator('.q-dot').first
            selected = await dot.get_attribute('data-route')
            await dot.focus()
            await page.keyboard.press('Enter')
            assert await page.locator(f'.q-dot[data-route="{selected}"]').get_attribute('aria-pressed') == 'true'
            await page.locator('.q-filters summary').click()
            for country in sorted(set(c for r in data['routes'] for c in r['countries'])):
                await page.locator('#country').select_option(country)
                assert await page.locator('#q-list button').count() == sum(country in r['countries'] for r in data['routes'])
            await page.locator('#country').select_option('')
            await page.locator('#search').fill('zzzz-no-matching-route')
            assert await page.locator('#q-list button').count() == 0
            assert await page.locator('#q-detail h2').inner_text() == 'No matching routes'
            await page.locator('#reset').click()
            await page.set_viewport_size({'width': 390, 'height': 844})
            largest = 0
            for route in data['routes']:
                await page.locator(f'#q-list [data-route="{route["id"]}"]').click()
                box = await page.locator('#q-detail').bounding_box()
                largest = max(largest, box['height'])
                assert box['height'] <= 844, (route['id'], box)
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                detail = await page.locator('.brief-links a').first.get_attribute('href')
                await page.goto(urljoin(url, detail), wait_until='networkidle')
                assert await page.locator('.source-card').count() == len(route['sources'])
                assert await page.locator('#coverage').count() == 1
                assert await page.locator('#agreements').count() == 1
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                await page.locator('#back').click()
                await page.locator('#q-workspace').wait_for(state='visible')
                assert f'route={route["id"]}' in page.url
            assert not errors, errors
            print(json.dumps({'url': url, 'routes': len(data['routes']),
                'bases': len(data['bases']), 'largestMobileBriefPx': largest,
                'pageErrors': errors}))
        finally:
            await page.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:8765/routes/')
    asyncio.run(check(parser.parse_args().url))
