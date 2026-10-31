#!/usr/bin/env python3
"""Check the all-route placement view in the existing authorised CDP browser."""
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
        page.on('pageerror', lambda e: errors.append(str(e)))
        session = await page.context.new_cdp_session(page)
        await session.send('Network.enable')
        await session.send('Network.setCacheDisabled', {'cacheDisabled': True})
        try:
            await page.set_viewport_size({'width': 1440, 'height': 1000})
            await page.goto(url, wait_until='networkidle')
            await page.locator('#q-workspace').wait_for(state='visible')
            assert await page.locator('#basis').input_value() == 'model'
            model = await page.evaluate("async()=> (await fetch('../data/route-placement-model.json')).json()")
            routes = model['routes']
            assert await page.locator('.q-dot').count() == len(routes) == 32
            assert not await page.locator('.q-assumptions').is_visible()

            async def positions():
                return await page.locator('.q-dot').evaluate_all("els=>Object.fromEntries(els.map(e=>[e.dataset.route,[e.querySelector('circle').getAttribute('cx'),e.querySelector('circle').getAttribute('cy')]]))")

            initial = await positions()
            for route in routes:
                dot = page.locator(f'.q-dot[data-route="{route["id"]}"]')
                await dot.focus()
                await page.keyboard.press('Enter')
                assert await page.locator('#basis').input_value() == 'model'
                assert await page.locator('.q-dot').count() == 32
                text = await page.locator('.model-basis').inner_text()
                assert route['xBasis'] in text and route['yBasis'] in text
                assert await page.locator('.model-sensitivity rect').count() == 1
                href = await page.locator('.model-basis a').first.get_attribute('href')
                assert href == 'coordinate-evidence.html?route=' + route['id']
            await page.reload(wait_until='networkidle')
            assert await positions() == initial

            await page.locator('.q-filters summary').click()
            countries = await page.locator('#country option').evaluate_all('els=>els.map(e=>e.value).filter(Boolean)')
            for country in countries:
                await page.locator('#country').select_option(country)
                current = await positions()
                assert len(current) == await page.locator('#q-list button').count()
                assert all(initial[k] == v for k, v in current.items())
            await page.locator('#country').select_option('')
            await page.locator('#search').fill('not-a-matching-route-xyz')
            assert await page.locator('.q-dot').count() == 0
            assert await page.locator('#q-detail h2').inner_text() == 'No matching routes'
            await page.locator('#reset').click()
            assert await page.locator('.q-dot').count() == 32
            for basis, expected in [('lumi-total-allocation', 3), ('aigf-phase1-design', 1), ('model', 32)]:
                await page.locator('#basis').select_option(basis)
                assert await page.locator('.q-dot').count() == expected

            await page.set_viewport_size({'width': 390, 'height': 844})
            for route in routes:
                await page.locator(f'#q-list [data-route="{route["id"]}"]').click()
                await page.locator('.model-basis summary').click()
                assert await page.locator('.model-basis tbody tr').count() == 6
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            # The detailed legacy calculations must return to the model view.
            href = await page.locator('.brief-links a').first.get_attribute('href')
            await page.goto(urljoin(url, href), wait_until='networkidle')
            await page.locator('#back').click()
            await page.locator('#q-workspace').wait_for(state='visible')
            assert await page.locator('#basis').input_value() == 'model'
            assert await page.locator('.q-dot').count() == 32
            assert not errors, errors
            print(json.dumps({'url': url, 'modelPoints': len(routes), 'allRouteKeyboardSelections': True,
                              'filterAndReloadPositionsStable': True, 'mobileFactors': True,
                              'coverageViews': [3, 1], 'pageErrors': errors}))
        finally:
            await page.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:8765/routes/')
    asyncio.run(check(parser.parse_args().url))
