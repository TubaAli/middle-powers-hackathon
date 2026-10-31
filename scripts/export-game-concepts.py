#!/usr/bin/env python3
"""Export Gemini artwork with editable UI overlays in the local CDP browser."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
NAMES = ['01-november-council', '02-february-negotiation', '03-april-disputed-report', '04-geneva-final-clause']

async def main():
    output = ROOT / 'game/concepts/stills'
    output.mkdir(exist_ok=True)
    async with async_playwright() as pw:
        browser = await pw.chromium.connect_over_cdp('http://localhost:9222')
        page = await browser.contexts[0].new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        try:
            await page.set_viewport_size({'width': 1600, 'height': 900})
            for i, name in enumerate(NAMES):
                await page.goto(f'http://127.0.0.1:8765/game/concepts/frame.html?scene={i}', wait_until='networkidle')
                await page.locator('#frame svg').wait_for()
                await page.evaluate("Promise.all(Array.from(document.querySelectorAll('svg image')).map(el => {const img = new Image(); img.src = el.getAttribute('href'); return img.decode();}))")
                await page.locator('#frame').screenshot(path=str(output / f'{name}.png'), scale='css')
                print(f'Exported {name}: 1600×900 PNG; editable UI source in scenes.js')
            assert not errors, errors
        finally:
            await page.close()

if __name__ == '__main__':
    asyncio.run(main())
