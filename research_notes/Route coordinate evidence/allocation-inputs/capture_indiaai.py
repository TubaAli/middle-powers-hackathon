"""Capture a privacy-minimised public allocation snapshot via an existing CDP browser.

Requires an already-installed Playwright Python environment and running authorized
browser. No login, browser launch, cookies/storage export or dependency installation.
Run: python capture_indiaai.py --cdp http://localhost:9222
Only new tab is closed. Outputs are written beside this script.
"""
import argparse
import asyncio
import hashlib
import json
import re
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path

from playwright.async_api import async_playwright

URL = "https://compute.indiaai.gov.in/endusers"
FIELDS = ["projectid", "approveddate", "organizationname", "subsidyallocated",
          "totalprice", "total_number_of_gpu", "number_of_hours", "gpu_types"]


def money(value):
    cleaned = re.sub(r"[^0-9.\-]", "", str(value or ""))
    return str(Decimal(cleaned)) if cleaned else None


def minimise(row):
    org = row.get("organizationname")
    # Retain only explicitly institutional/business strings. Never copy applicant name.
    institutional = bool(org and re.search(
        r"private limited|\bpvt\b|\bltd\b|university|institute|department|ministry|"
        r"foundation|corporation|^NIC$|^CDAC$|^IndiaAI$|^Sarvam AI$|^Prasar Bharati$",
        org, re.I))
    return {
        "projectID": row.get("projectid"),
        "approvalDate": row.get("approveddate"),
        "organisation": org if institutional else None,
        "allocatedSubsidyINR": money(row.get("subsidyallocated")),
        "billOfMaterialsINR": money(row.get("totalprice")),
        "gpuCount": row.get("total_number_of_gpu"),
        "gpuTypes": row.get("gpu_types"),
        "hoursRaw": row.get("number_of_hours"),
        "hoursUnit": "source field number_of_hours; metering and instance/GPU basis unspecified",
        "status": row.get("status"),
    }


def encode(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode()


async def capture(endpoint):
    async with async_playwright() as pw:
        browser = await pw.chromium.connect_over_cdp(endpoint)
        if not browser.contexts:
            raise RuntimeError("Existing browser has no context")
        page = await browser.contexts[0].new_page()
        try:
            async with page.expect_response(
                lambda r: r.url.endswith("/enduserDashboardData"), timeout=45000
            ) as pending:
                await page.goto(URL, wait_until="domcontentloaded", timeout=45000)
            response = await pending.value
            payload = await response.text()
            await page.wait_for_selector("#enduserTable_info", timeout=20000)
            # Decode the public response in its own page, then return only allowed fields.
            raw = await page.evaluate("""({payload, fields}) => {
              const parsed = JSON.parse(setV(payload));
              return parsed.data.map(r => Object.fromEntries(
                fields.concat(['status']).filter(k => k in r).map(k => [k,r[k]])));
            }""", {"payload": payload, "fields": FIELDS})
            displayed = await page.evaluate("""fields =>
              $('#enduserTable').DataTable().rows().data().toArray().map(r =>
                Object.fromEntries(fields.concat(['status']).filter(k=>k in r)
                  .map(k=>[k,r[k]])))""", FIELDS)
            code = await page.request.get("https://compute.indiaai.gov.in/js/common/endusers.js")
            script_bytes = await code.body()
            retrieval = datetime.now(timezone.utc).isoformat()
        finally:
            await page.close()

    root = Path(__file__).resolve().parent
    basis = {"raw": raw, "displayed": displayed}
    files, clean = {}, {}
    for label, rows in basis.items():
        clean[label] = sorted((minimise(r) for r in rows), key=lambda r: r['projectID'])
        name = f"indiaai-{label}-allocations.json"
        content = encode(clean[label])
        (root / name).write_bytes(content)
        files[name] = {"sha256": hashlib.sha256(content).hexdigest(), "rows": len(rows)}

    indexed = {r['projectID']: r for r in clean['raw']}
    differences = []
    for row in clean['displayed']:
        before = indexed[row['projectID']]
        changed = {k: {"raw": before[k], "displayed": v}
                   for k,v in row.items() if v != before[k]}
        if changed:
            differences.append({"projectID": row['projectID'], "changes": changed})
    summary = {}
    for label, rows in clean.items():
        summary[label] = {
            "rowCount": len(rows), "uniqueProjectIDs": len({r['projectID'] for r in rows}),
            "allocatedSubsidyINR": str(sum((Decimal(r['allocatedSubsidyINR'] or '0') for r in rows), Decimal(0))),
            "billOfMaterialsINR": str(sum((Decimal(r['billOfMaterialsINR'] or '0') for r in rows), Decimal(0))),
            "nullHours": sum(r['hoursRaw'] is None for r in rows),
            "blankHours": sum(r['hoursRaw'] == '' for r in rows),
        }
    receipt = {
        "sourceURL": URL, "publicDataResponseURL": response.url,
        "retrievedAtUTC": retrieval, "researchCutoff": "2026-10-31",
        "chosenBasis": "displayed: reproduces the published table; raw retained separately for comparison",
        "method": "Read existing browser's public response and DataTable; no login or credentials exported",
        "moneyRepresentation": "decimal INR strings, commas and currency symbols removed; no rounding",
        "privacy": "No applicant names, contact details, tokens or auth fields retained. Organisation strings retained only by conservative institutional/business allowlist; others null.",
        "status": "null means source did not supply a status field, not inactive or rejected",
        "scriptURL": "https://compute.indiaai.gov.in/js/common/endusers.js",
        "scriptSHA256": hashlib.sha256(script_bytes).hexdigest(),
        "files": files, "summary": summary, "displayDifferences": differences,
        "limitations": ["Allocation records, not consumption or payments", "No GPU-hour aggregate inferred from ambiguous hours field", "Source can change; rerun creates a new snapshot"],
    }
    (root / 'indiaai-receipt.json').write_bytes(encode(receipt))
    print(json.dumps({"summary": summary, "differences": differences, "files": files}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--cdp', default='http://localhost:9222')
    asyncio.run(capture(parser.parse_args().cdp))
