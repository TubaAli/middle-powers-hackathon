#!/usr/bin/env python3
"""Exercise the additive Orbit research layer with an isolated browser."""
import argparse
import asyncio
import json
from playwright.async_api import async_playwright


async def check(url):
    result = {"viewports": [1440, 390], "meetingChecks": 0, "pageErrors": []}
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(channel="chrome")
        for width in result["viewports"]:
            page = await browser.new_page(viewport={"width": width, "height": 900})
            page.on("pageerror", lambda error: result["pageErrors"].append(str(error)))
            await page.goto(url, wait_until="networkidle")
            assert "fictional campaign" in await page.locator(".op-ticker").inner_text()
            await page.locator(".op-skip").click()
            await page.locator('[data-k="JP"]').click()
            await page.locator(".op-skip").click()
            await page.locator('[data-goal="test"]').click()
            await page.locator(".op-skip").click()
            await page.locator("#panel .or-research").wait_for()
            await page.locator("#panel .or-research summary").click()
            assert "Training-compute trend" in await page.locator("#panel").inner_text()
            await page.locator('[data-move="0"]').click()
            for country in ["US", "CN", "JP", "TW", "KR", "NL", "DE", "UK", "GULF", "AUCA", "PROD"]:
                await page.evaluate("key => openTalk(key)", country)
                await page.locator(".or-open-research").click()
                assert "acceptance odds" in await page.locator(".or-dialog").inner_text()
                if country == "JP":
                    assert await page.locator('.or-dialog a[href*="route=jp-"]').count() > 0
                await page.locator(".or-close").click()
                await page.locator("#m-leave").click()
                # Respect the original game's exit animation before another meeting.
                await page.locator("#meeting").wait_for(state="hidden")
                result["meetingChecks"] += 1
            await page.evaluate("g.turn=8;finish()")
            assert "FICTIONAL STRESS-TEST" in await page.locator(".or-ending").inner_text()
            assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth+1")
            values = await page.evaluate("""() => {
                const m=OrbitResearchModel;
                return {baseline:m.model(8,0),protected:m.model(8,1),start:m.model(0,1),
                    endings:['test','incident','weights','continuity','chips','offswitch'].map(k=>m.endingText(k,1).title),
                    weak:m.endingText('test',0).title};
            }""")
            assert 2.7 < values["baseline"]["baseline"] < 2.9
            assert values["protected"]["rollout"] < values["baseline"]["rollout"]
            assert values["protected"]["baseline"] == values["baseline"]["baseline"]
            assert values["start"]["baseline"] == 1
            assert len(set(values["endings"])) == 6
            assert values["weak"] not in values["endings"]
            await page.close()
        await browser.close()
    assert not result["pageErrors"], result
    print(json.dumps(result))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:8765/game/orbit.html")
    asyncio.run(check(parser.parse_args().url))
