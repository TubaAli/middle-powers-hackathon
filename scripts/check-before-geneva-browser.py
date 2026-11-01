#!/usr/bin/env python3
"""Play and inspect Before Geneva in an isolated installed-Chrome test profile."""
import argparse
import asyncio
import json
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

KEY = 'before-geneva-save-v1'
JP = 'jp-procurement-safety-evidence'
INDIA = 'indiaai-subsidy-evaluation-gate'
LUMI = 'lumi-national-evidence-protocol'


async def check(url, screenshots):
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(channel='chrome', headless=True)
        errors = []
        checks = 0
        try:
            for width in [1440, 390]:
                context = await browser.new_context(viewport={'width': width, 'height': 1000 if width > 700 else 844}, reduced_motion='reduce')
                page = await context.new_page()
                page.on('pageerror', lambda e: errors.append(str(e)))
                await page.goto(url, wait_until='networkidle')
                await page.locator('[data-act=new]').wait_for()
                data = await page.evaluate("async()=> (await fetch('campaign.json')).json()")

                async def state():
                    return await page.evaluate('(key)=>JSON.parse(localStorage.getItem(key))', KEY)

                async def picture(name):
                    if screenshots:
                        await page.evaluate('document.fonts.ready')
                        await page.screenshot(path=str(screenshots / f'{width}-{name}.png'), full_page=True)

                async def bounds():
                    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'), width

                await picture('title')
                await page.locator('[data-act=new]').click()
                await page.locator('[data-council=funding]').click()
                await picture('lounge')
                await page.locator('[data-act=all]').click()
                assert await page.locator('[data-meet]').count() == 32
                for r in data['routes']:
                    await page.locator(f'[data-meet="{r["id"]}"]').click()
                    assert await page.locator('.speech').inner_text() == r['nodes']['opening']['text']
                    await page.keyboard.press('1')
                    assert (await state())['conversation']['node'] == 'challenge'
                    prior = await state()
                    await page.locator('.dialogue-heading [data-evidence]').click()
                    assert await page.locator('#drawer').is_visible()
                    assert r['research']['headline'] in await page.locator('#drawer-body').inner_text()
                    await bounds()
                    await page.keyboard.press('Escape')
                    assert await state() == prior
                    await page.locator('[data-choice=provisional]').click()
                    assert (await state())['conversation']['node'] == 'terms'
                    await bounds()
                    if r['id'] == JP:
                        await picture('dialogue')
                    await page.locator('[data-act=lounge]').click()
                    assert (await state())['actions'] == 3
                    checks += 1
                await page.locator('#contact-search').fill('no-such-policy-xyz')
                assert await page.locator('[data-meet]').count() == 0
                await page.locator('#contact-search').fill('')

                async def plan(id, kind='pilot', prepared=False):
                    await page.locator(f'[data-meet="{id}"]').click()
                    if prepared:
                        await page.locator('[data-choice=challenge]').click()
                        await page.locator('[data-choice=brief]').click()
                    await page.locator('[data-choice=terms]').click()
                    await page.locator(f'[data-choice={kind}]').click()
                    await page.locator('[data-choice=close]').click()

                async def next_month(move='research'):
                    await page.locator('[data-act=advance]').click()
                    if await page.locator('[data-act=confirm-advance]').is_visible():
                        await page.locator('[data-act=confirm-advance]').click()
                    if (await state())['phase'] == 'council':
                        await page.locator(f'[data-council={move}]').click()

                async def finish(id):
                    await page.locator(f'[data-meet="{id}"]').click()
                    assert (await state())['conversation']['node'] == 'report'
                    await page.locator('[data-choice=retest]').click()
                    await page.locator('[data-choice=close]').click()

                await plan(JP, prepared=True)
                await plan(INDIA)
                await next_month()
                await finish(JP)
                await finish(INDIA)
                await plan(LUMI, 'shared')
                await next_month()
                await finish(LUMI)
                assert len([p for p in (await state())['projects'].values() if p['stage'] == 'tested']) == 3
                # Autosave resumes at a specific node, not at the start of the month.
                await page.locator('[data-meet=sg-agent-data-leakage-deployment-gate]').click()
                await page.locator('[data-choice=challenge]').click()
                before = await state()
                await page.reload(wait_until='networkidle')
                await page.locator('[data-act=resume]').click()
                assert await state() == before
                assert await page.locator('.speech').inner_text() == next(r for r in data['routes'] if r['id'] == 'sg-agent-data-leakage-deployment-gate')['nodes']['challenge']['text']
                await page.locator('[data-act=lounge]').click()
                while (await state())['month'] < 7:
                    await next_month('funding')
                # New projects cannot pretend they will return before a deadline already here.
                await page.locator('[data-meet=sg-agent-data-leakage-deployment-gate]').click()
                await page.locator('[data-choice=terms]').click()
                assert await page.locator('[data-choice=pilot]').is_disabled()
                await page.locator('[data-act=lounge]').click()
                await next_month()
                assert (await state())['phase'] == 'summit'
                await page.locator('[data-summit=verification]').click()
                assert (await state())['ending']['success'] is True
                assert await page.locator('.ending h1').inner_text() == 'A deal that can be checked.'
                await bounds()
                await picture('ending')
                await page.locator('#journal-button').click()
                assert 'Fixed and tested again' in await page.locator('#drawer-body').inner_text()
                await page.keyboard.press('Escape')
                await page.locator('[data-act=new]').click()
                await page.locator('[data-act=close]').click()
                assert (await state())['phase'] == 'ending'
                # Missing storage and damaged saves must not strand the title screen.
                await page.evaluate('(key)=>localStorage.setItem(key,"broken-json")', KEY)
                await page.reload(wait_until='networkidle')
                assert await page.locator('.warning').count() == 1
                await page.locator('[data-act=new]').click()
                await page.locator('[data-act=confirm-new]').click()
                assert (await state())['phase'] == 'council'
                for path in ['campaign.json', 'story-engine.mjs', 'before-geneva.js', 'before-geneva.css', 'orbit.html', 'concepts/']:
                    response = await page.request.get(urljoin(url, path))
                    assert response.ok, (path, response.status)
                await context.close()
            assert not errors, errors
            print(json.dumps({'routeWalkthroughs': checks, 'viewports': [1440, 390], 'fullCampaigns': 2, 'testedSharedEnding': True, 'saveResumeAndRecovery': True, 'sourcesAndKeyboard': True, 'pageErrors': errors}))
        finally:
            await browser.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:8765/game/')
    parser.add_argument('--screenshots', type=Path)
    args = parser.parse_args()
    if args.screenshots:
        args.screenshots.mkdir(parents=True, exist_ok=True)
    asyncio.run(check(args.url, args.screenshots))
