#!/usr/bin/env python3
"""Package the live route explorer into a portable single-file submission asset.

``submission/policy-explorer.html`` is a self-contained copy of the approved
all-32-route policy explorer (``routes/index.html`` + ``routes/quantitative.js``
and its four modules + the two data snapshots). It opens directly over
``file://`` with no web server, no network access and no installed
dependencies.

This script is read-only towards the live site: it never writes to ``routes/``,
``game/`` or ``data/``, never edits the submission draft, never recomputes a
score for the package and never invents a value. The page structure, visible
method text, calculation code and data snapshots are copied verbatim. The only
changes are the packaging transforms below, each asserted to match exactly the
expected number of occurrences, so drift in the live files fails the build
instead of silently producing a wrong package:

1. The five ES modules are concatenated into one inline
   ``<script type="module">`` (imported modules cannot be fetched over
   ``file://``; inline modules run).
2. The two ``fetch('../data/*.json')`` calls in ``init()`` are replaced with
   ``JSON.parse`` of embedded, byte-identical snapshots (``</`` escaped to
   ``<\\/``, which ``JSON.parse`` reads back unchanged).
3. Cross-page links (route details, retrieved evidence, stress tests, the
   game, the model JSON downloads) are rewritten to the published site's
   absolute URLs; those pages are deliberately not bundled.
4. ``history.replaceState`` is wrapped in ``try/catch`` because some contexts
   refuse history updates over ``file://``; in-session selection still works
   if it throws.
5. Both stylesheets are inlined; a small provenance note, a ``<noscript>``
   notice and an "Orbit prototype" nav link to the live game are added.

Every copied source is recorded with its SHA-256 in the HTML header comment
and in ``submission/policy-explorer-README.md``, together with the repository
commit. The HTML contains no build timestamp, so rebuilding from the same
commit reproduces byte-identical output.

Usage::

  python3 scripts/package-policy-explorer.py              build HTML + README
  python3 scripts/package-policy-explorer.py --verify    build, then check the
      generated file over file:// in an isolated headless Chrome. This uses the
      existing Playwright environment only: no installs, no extra browser
      profile, no sign-ins, no CDP. As a test-only integrity check it also
      recomputes every route's score from the embedded model with an
      independent reimplementation of the live placement formula and compares
      it with what the page displays; the package itself embeds no recomputed
      values. Optional --screenshot-dir PATH saves desktop/mobile receipts.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
LIVE = "https://tubaali.github.io/middle-powers-hackathon/"
OUT_HTML = REPO / "submission" / "policy-explorer.html"
OUT_README = REPO / "submission" / "policy-explorer-README.md"

# Every file copied into the package, with the role it plays there.
SOURCES = [
    ("routes/index.html", "page structure and visible method text"),
    ("routes/quantitative.js", "explorer controller"),
    ("routes/placement.mjs", "score and sensitivity calculation"),
    ("routes/metrics.mjs", "coverage/agreement metrics and snapshot validation"),
    ("routes/model.mjs", "coordination labels and dataset validation"),
    ("routes/briefs.mjs", "editorial one-line briefs"),
    ("routes/style.css", "base styles"),
    ("routes/quantitative.css", "explorer styles"),
    ("data/routes-quantitative.json", "embedded snapshot: 32 routes"),
    ("data/route-placement-model.json", "embedded snapshot: model weights and factors"),
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git(*args: str) -> str:
    try:
        return subprocess.run(
            ["git", *args], cwd=REPO, capture_output=True, text=True, check=True
        ).stdout.strip()
    except Exception:
        return ""


def replace_exact(text: str, old: str, new: str, expected: int = 1, what: str = "") -> str:
    found = text.count(old)
    if found != expected:
        shown = what or old[:70]
        raise SystemExit(
            f"packager: expected {expected} occurrence(s) of {shown!r}, found {found}; "
            "the live file changed, update the packager transforms"
        )
    return text.replace(old, new)


def strip_exports(text: str, module: str, expected: int) -> str:
    out, count = re.subn(r"^export (?=(?:function|const)\b)", "", text, flags=re.M)
    if count != expected:
        raise SystemExit(f"packager: {module}: expected {expected} export declaration(s), found {count}")
    if re.search(r"\bexport\s+(?:function|const)\b", out) or re.search(r"^\s*import\s", out, flags=re.M):
        raise SystemExit(f"packager: {module}: unexpected residual import/export text")
    return out


def embed_json(raw: bytes, name: str) -> str:
    """Escape a JSON file for safe embedding inside a <script> element.

    ``</`` becomes ``<\\/`` which JSON.parse reads back as ``/``; the result is
    byte-identical data. Anything that cannot be round-tripped safely refuses
    to build.
    """
    text = raw.decode("utf-8")
    if "<!--" in text:
        raise SystemExit(f"packager: {name} contains '<!--'; refusing to embed")
    escaped = text.replace("</", "<\\/")
    if escaped.replace("<\\/", "</") != text:
        raise SystemExit(f"packager: {name}: JSON escape round-trip failed")
    return escaped


def js_round(value: float) -> int:
    """JavaScript Math.round for non-negative values (the live score())."""
    return math.floor(value * 100 + 0.5)


def expected_scores(model: dict) -> dict:
    """Test-only reimplementation of the live placement formula (placement.mjs).

    value  = sum(weight * (factor ?? prior))
    bounds = sum(weight * clip(factor +/- spread, 0, 1))
    with the model's own weights, 0.5 prior and +/-0.15 (assessed) and
    +/-0.30 (imputed) spreads. Iteration order follows the JSON files so the
    floating-point arithmetic matches the browser's exactly. Used only by
    --verify to prove the packaged page displays the live model's numbers.
    """
    prior = model["prior"]
    spreads = model["sensitivity"]
    expected = {}
    for route in model["routes"]:
        def axis(key):
            value = lower = upper = 0.0
            for factor, weight in model["axes"][key]["weights"].items():
                assessed = route["factors"][factor]
                spread = spreads["imputed"] if assessed is None else spreads["assessed"]
                v = prior if assessed is None else assessed
                value += weight * v
                lower += weight * max(0.0, v - spread)
                upper += weight * min(1.0, v + spread)
            return value, lower, upper

        x, xlo, xhi = axis("x")
        y, ylo, yhi = axis("y")
        imputed = sum(1 for k in model["factors"] if route["factors"][k] is None)
        expected[route["id"]] = {
            "x": x, "y": y, "xlo": xlo, "xhi": xhi, "ylo": ylo, "yhi": yhi,
            "imputed": imputed,
            "xBasis": route["xBasis"], "yBasis": route["yBasis"],
        }
    return expected


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------


def build() -> dict:
    raw = {path: (REPO / path).read_bytes() for path, _ in SOURCES}
    receipts = {path: {"sha256": sha256(data), "bytes": len(data)} for path, data in raw.items()}

    commit = git("rev-parse", "HEAD") or "unknown"
    commit_date = git("log", "-1", "--format=%cI", commit)
    porcelain = git("status", "--porcelain", "--", *[p for p, _ in SOURCES])
    dirty = bool(porcelain)

    # ---- JavaScript: concatenate the modules, strip imports/exports ----------
    placement = strip_exports(raw["routes/placement.mjs"].decode(), "routes/placement.mjs", 3)
    metrics = strip_exports(raw["routes/metrics.mjs"].decode(), "routes/metrics.mjs", 4)
    model_js = strip_exports(raw["routes/model.mjs"].decode(), "routes/model.mjs", 6)
    briefs = strip_exports(raw["routes/briefs.mjs"].decode(), "routes/briefs.mjs", 1)

    app = raw["routes/quantitative.js"].decode()
    app, imports = re.subn(r"^import \{[^}]*\} from '\./[^']*';\n", "", app, flags=re.M)
    if imports != 4:
        raise SystemExit(f"packager: expected 4 import lines in quantitative.js, found {imports}")

    # fetch() -> embedded snapshots (documented transform 2)
    old_fetch = (
        "    const response=await fetch('../data/routes-quantitative.json',{cache:'no-cache'});\n"
        "    if(!response.ok) throw Error(`HTTP ${response.status}`);\n"
        "    data=validateQuantitative(await response.json());\n"
        "    const modelResponse=await fetch('../data/route-placement-model.json',{cache:'no-cache'});\n"
        "    if(!modelResponse.ok) throw Error(`Model HTTP ${modelResponse.status}`);\n"
        "    model=validatePlacement(await modelResponse.json(),data.routes);"
    )
    new_fetch = (
        "    // Portable copy: the two snapshots below are byte-identical copies of\n"
        "    // data/routes-quantitative.json and data/route-placement-model.json.\n"
        "    data=validateQuantitative(JSON.parse(document.getElementById('snapshot-routes-quantitative').textContent));\n"
        "    model=validatePlacement(JSON.parse(document.getElementById('snapshot-route-placement-model').textContent),data.routes);"
    )
    app = replace_exact(app, old_fetch, new_fetch, 1, "snapshot fetch block")

    # Cross-page links -> absolute live URLs (documented transform 3)
    app = replace_exact(app, "quantitative-details.html?${new URLSearchParams",
                        LIVE + "routes/quantitative-details.html?${new URLSearchParams",
                        1, "quantitative-details link")
    app = replace_exact(app, "stress-tests.html?route=", LIVE + "routes/stress-tests.html?route=",
                        1, "stress-tests link")
    app = replace_exact(app, "../game/?route=", LIVE + "game/?route=", 1, "game link")
    app = replace_exact(app, "coordinate-evidence.html?route=",
                        LIVE + "routes/coordinate-evidence.html?route=", 1, "coordinate-evidence link")
    app = replace_exact(app, '<a href="../data/route-placement-model.json">Download model inputs</a>',
                        '<a href="' + LIVE + 'data/route-placement-model.json">Download model inputs</a>',
                        1, "model download link")
    # replaceState guard for file:// contexts (documented transform 4)
    app = replace_exact(
        app, "history.replaceState(null,'',`${location.pathname}#${p}`);",
        "try{history.replaceState(null,'',`${location.pathname}#${p}`);}"
        "catch(err){/* file:// or restricted contexts may refuse history updates;"
        " selection state still works in-session */}",
        1, "history.replaceState")

    banner = (
        "// Portable copy generated by scripts/package-policy-explorer.py.\n"
        "// The code below is copied from the live explorer (see the HTML header\n"
        "// comment for per-file SHA-256 receipts). Only these packaging changes\n"
        "// were made: the five ES modules are concatenated in import-graph order\n"
        "// because module imports cannot load over file://; the two data-snapshot\n"
        "// requests are replaced by JSON.parse of embedded byte-identical copies;\n"
        "// cross-page links point at the published site; replaceState is\n"
        "// guarded for file://. No score, weight, prior, disclaimer, label or\n"
        "// datum was changed, recomputed or invented.\n"
        "\n// --- verbatim: routes/placement.mjs (export-stripped) ---\n"
    )
    js = (
        banner
        + placement
        + "\n// --- verbatim: routes/metrics.mjs (export-stripped) ---\n"
        + metrics
        + "\n// --- verbatim: routes/model.mjs (export-stripped) ---\n"
        + model_js
        + "\n// --- verbatim: routes/briefs.mjs (export-stripped) ---\n"
        + briefs
        + "\n// --- verbatim: routes/quantitative.js (imports removed, documented transforms) ---\n"
        + app
    )
    for needle, what in (("</script", "closing script tag inside JS"),
                         ("fetch(", "fetch call"),
                         ("cache:'no-cache'", "cache option")):
        if needle in js:
            raise SystemExit(f"packager: residual {what} in packaged JavaScript")

    # ---- HTML ----------------------------------------------------------------
    html = raw["routes/index.html"].decode()

    css = (
        "<style>\n/* routes/style.css - verbatim copy (see file header for receipts) */\n"
        + raw["routes/style.css"].decode()
        + "\n</style>\n<style>\n/* routes/quantitative.css - verbatim copy */\n"
        + raw["routes/quantitative.css"].decode()
        + "\n</style>\n<style>\n/* Packager additions (not part of the live files). */\n"
        + ".portable-note{margin-top:10px;max-width:560px}\n"
        + "</style>"
    )
    html = replace_exact(
        html,
        '<link rel="stylesheet" href="style.css"><link rel="stylesheet" href="quantitative.css">',
        css, 1, "stylesheet links")

    html = replace_exact(html, 'href="../game/">Coalition game</a>',
                        'href="' + LIVE + 'game/">Coalition game</a>'
                        '<a href="' + LIVE + 'game/orbit.html">Orbit prototype</a>',
                        1, "coalition game nav link")
    html = replace_exact(html, 'href="stress-tests.html"', 'href="' + LIVE + 'routes/stress-tests.html"',
                        1, "stress-tests nav link")
    html = replace_exact(html, 'href="coordinate-evidence.html"',
                        'href="' + LIVE + 'routes/coordinate-evidence.html"',
                        2, "coordinate-evidence links")
    html = replace_exact(html, 'href="research.html"', 'href="' + LIVE + 'routes/research.html"',
                        1, "research nav link")
    html = replace_exact(html, 'href="research.html?view=numbers"',
                        'href="' + LIVE + 'routes/research.html?view=numbers"',
                        1, "research measurement link")
    html = replace_exact(html, 'href="../"', 'href="' + LIVE + '"', 1, "supply-chain nav link")
    html = replace_exact(html, 'href="estimates.html"', 'href="' + LIVE + 'routes/estimates.html"',
                        1, "estimates link")
    html = replace_exact(html, 'href="../data/route-placement-model.json"',
                        'href="' + LIVE + 'data/route-placement-model.json"',
                        1, "model download link")
    html = replace_exact(html, 'href="../data/routes-quantitative.json"',
                        'href="' + LIVE + 'data/routes-quantitative.json"',
                        1, "snapshot download link")
    html = replace_exact(html, 'href="./"', 'href="#explorer"', 1, "brand link")

    provenance_note = (
        '<p class="small portable-note">Portable submission copy: this single file embeds the '
        'explorer, its method and its data snapshot, so the map works offline. Deeper evidence, '
        'stress tests and the playable games open on the live site. '
        '<a href="' + LIVE + 'routes/#basis=model">Open the live explorer</a>.</p>'
    )
    html = replace_exact(
        html,
        '<p id="sample-count" class="small">Loading the research…</p>',
        '<p id="sample-count" class="small">Loading the research…</p>' + provenance_note,
        1, "sample-count paragraph")

    html = replace_exact(
        html,
        '<div id="load-status" role="status">Loading routes and calculation inputs…</div>',
        '<div id="load-status" role="status">Loading routes and calculation inputs…</div>\n'
        '      <noscript><p class="small" role="alert">JavaScript is off. This explorer needs '
        'JavaScript to draw, filter and select routes; the written method below stays readable, '
        'and the live site works the same way.</p></noscript>',
        1, "load-status paragraph")

    receipt_lines = "\n".join(
        f"      {receipts[path]['sha256']}  {path} ({receipts[path]['bytes']} bytes) - {role}"
        for path, role in SOURCES
    )
    head_note = (
        '<meta name="description" content="Compare 32 safety routes with evidence-informed '
        'feasibility and potential impact estimates. Inspect assumptions, imputations and sources.">\n'
        '  <meta name="generator" content="scripts/package-policy-explorer.py">\n'
        "  <!--\n"
        "    Portable single-file copy of the Middle Powers route explorer.\n"
        "    Live explorer: " + LIVE + "routes/#basis=model\n"
        "    Generated by scripts/package-policy-explorer.py from repository commit "
        + commit + ("" if not commit_date else " (" + commit_date + ")") + ".\n"
        "    Scores were NOT recomputed and no value was invented: the page structure,\n"
        "    method text, calculation code and both data snapshots are verbatim copies of\n"
        "    the repository files below (the embedded JSON uses '<\\/' in place of '</',\n"
        "    which JSON.parse reads back unchanged).\n"
        "    Source SHA-256 receipts:\n"
        + receipt_lines + "\n"
        "    Documented transforms: inline module concatenation; embedded snapshots replace\n"
        "    fetch(); cross-page links use absolute live URLs; replaceState guarded for\n"
        "    file://; CSS inlined; provenance note, noscript notice and Orbit prototype\n"
        "    nav link added. Regenerate with: python3 scripts/package-policy-explorer.py\n"
        "  -->"
    )
    html = replace_exact(
        html,
        '<meta name="description" content="Compare 32 safety routes with evidence-informed '
        'feasibility and potential impact estimates. Inspect assumptions, imputations and sources.">',
        head_note, 1, "meta description")

    scripts = (
        '<script type="application/json" id="snapshot-routes-quantitative">\n'
        + embed_json(raw["data/routes-quantitative.json"], "data/routes-quantitative.json")
        + '\n</script>\n<script type="application/json" id="snapshot-route-placement-model">\n'
        + embed_json(raw["data/route-placement-model.json"], "data/route-placement-model.json")
        + '\n</script>\n<script type="module">\n'
        + js
        + "\n</script>"
    )
    html = replace_exact(html, '<script type="module" src="quantitative.js"></script>',
                        scripts, 1, "module script tag")

    # Final safety scan: every static href must be an in-page anchor or an
    # absolute URL. href="...${...}..." values are JS template literals whose
    # resolved runtime values the --verify checks against the live site.
    for href in re.findall(r'href="([^"]*)"', html):
        if not (href.startswith("#") or href.startswith("https://") or "${" in href):
            raise SystemExit(f"packager: unexpected non-absolute href left in package: {href!r}")
    if "<link" in html or 'src="quantitative.js"' in html:
        raise SystemExit("packager: residual external reference left in package")

    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUT_HTML.write_text(html, encoding="utf-8")

    return {
        "commit": commit,
        "commitDate": commit_date,
        "sourcesModifiedAtBuild": dirty,
        "receipts": receipts,
        "html": {
            "path": str(OUT_HTML.relative_to(REPO)),
            "bytes": len(html.encode("utf-8")),
            "sha256": sha256(html.encode("utf-8")),
        },
        "modelBytes": raw["data/route-placement-model.json"],
        "snapshotBytes": raw["data/routes-quantitative.json"],
    }


# ---------------------------------------------------------------------------
# Verification (isolated headless Chrome over file://)
# ---------------------------------------------------------------------------


async def verify(info: dict, screenshot_dir: Path | None) -> dict:
    from playwright.async_api import async_playwright

    model = json.loads(info["modelBytes"])
    snapshot = json.loads(info["snapshotBytes"])
    expected = expected_scores(model)
    url = OUT_HTML.resolve().as_uri()

    mp_countries = [
        c for c in sorted({c for r in snapshot["routes"] for c in r["countries"]})
        if c not in ("United States", "China", "European Union", "EuroHPC participating states")
        and not c.startswith("EU ")
    ]
    coverage_count = sum(1 for r in snapshot["routes"] if r.get("quantitative", {}).get("coverage"))
    lumi_route = next(
        r["id"] for r in snapshot["routes"]
        if ((r.get("quantitative") or {}).get("coverage") or {}).get("basisId") == "lumi-total-allocation")

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(channel="chrome", headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 1000})
        page = await context.new_page()
        network, errors, console = [], [], []
        context.on("request", lambda r: network.append(r.url) if r.url.startswith(("http://", "https://")) else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: console.append(m.text) if m.type == "error" else None)

        async def positions():
            return await page.locator(".q-dot").evaluate_all(
                "els=>Object.fromEntries(els.map(e=>[e.dataset.route,"
                "[e.querySelector('circle').getAttribute('cx'),"
                "e.querySelector('circle').getAttribute('cy')]]))")

        try:
            await page.goto(url)
            await page.locator("#q-workspace").wait_for(state="visible")
            assert await page.locator(".q-dot").count() == 32, "expected 32 plotted routes"
            assert await page.locator("#basis").input_value() == "model", "default view must be the model"
            assert await page.locator("#plot-count").inner_text() == "32 modelled routes · all-sample view"
            assert (await page.locator("#sample-count").inner_text()
                    == f"32 modelled routes · {len(mp_countries)} named middle-power countries · "
                       f"{coverage_count} separate coverage records"), "sample summary line"
            assert await page.locator("#observed").inner_text() == f"Evidence checked {snapshot['observed']}"

            # Axis names and the not-probabilities caveat are drawn on the plot.
            plot_text = await page.locator(".q-plot svg").text_content()
            for needle in ("Implementation feasibility", "Potential safety impact",
                           "not probabilities"):
                assert needle in plot_text, f"plot text missing {needle!r}"

            # Visible method overview with the real weights, priors and sensitivity.
            assert await page.locator("#model-method").is_visible(), "method overview must be visible"
            method = await page.locator("#calculation").inner_text()
            for needle in ("40% authority/operational readiness", "30% timing before Geneva",
                           "30% manageable coordination", "40% possible reach",
                           "30% safety relevance", "30% ability to enforce a remedy",
                           "neutral 0.5 prior", "±0.15", "±0.30",
                           "not a statistical confidence interval"):
                assert needle in method, f"method text missing {needle!r}"
            assert await page.locator('a[href="#calculation"]').count() == 1

            # Test-only integrity check: every displayed score must equal the live
            # formula recomputed from the embedded model, for all 32 routes.
            labels = await page.locator(".q-dot").evaluate_all(
                "els=>els.map(e=>[e.dataset.route,e.getAttribute('aria-label')])")
            assert len(labels) == 32
            for route_id, label in labels:
                exp = expected[route_id]
                match = re.fullmatch(
                    r".+\. Model feasibility (\d+), potential safety impact (\d+)\. "
                    r"(\d+) of 6 factors imputed\.", label)
                assert match, f"aria-label shape: {label!r}"
                assert int(match.group(1)) == js_round(exp["x"]), f"{route_id} x score"
                assert int(match.group(2)) == js_round(exp["y"]), f"{route_id} y score"
                assert int(match.group(3)) == exp["imputed"], f"{route_id} imputed count"

            # Keyboard selection of all 32 routes, detail panel and live links.
            initial = await positions()
            for route in model["routes"]:
                route_id = route["id"]
                exp = expected[route_id]
                dot = page.locator(f'.q-dot[data-route="{route_id}"]')
                await dot.focus()
                await page.keyboard.press("Enter")
                assert await page.locator(".model-sensitivity rect").count() == 1, f"{route_id} sensitivity box"
                basis_text = await page.locator(".model-basis").inner_text()
                assert exp["xBasis"] in basis_text and exp["yBasis"] in basis_text, f"{route_id} rationale"
                metrics = await page.locator("#q-detail .q-metrics>div").evaluate_all(
                    "els=>els.map(e=>e.innerText)")
                assert len(metrics) == 2, f"{route_id} metric cards"
                for text, value, low, high in (
                    (metrics[0], exp["x"], exp["xlo"], exp["xhi"]),
                    (metrics[1], exp["y"], exp["ylo"], exp["yhi"]),
                ):
                    value_match = re.search(r"(\d+) / 100", text)
                    range_match = re.search(r"Sensitivity (\d+)–(\d+)", text)
                    assert value_match and range_match, f"{route_id} metric text: {text!r}"
                    assert int(value_match.group(1)) == js_round(value), f"{route_id} displayed score"
                    assert (int(range_match.group(1)), int(range_match.group(2))) \
                        == (js_round(low), js_round(high)), f"{route_id} sensitivity range"
                await page.locator(".model-basis summary").click()
                rows = await page.locator(".model-basis tbody tr").evaluate_all(
                    "els=>els.map(e=>[e.querySelector('td').innerText,"
                    "e.querySelectorAll('td')[1].innerText,"
                    "e.querySelectorAll('td')[2].innerText])")
                assert len(rows) == 6, f"{route_id} factor rows"
                assert [r[2] for r in rows] == ["40%", "30%", "30%", "40%", "30%", "30%"], \
                    f"{route_id} displayed weights"
                links = await page.locator("#q-detail a").evaluate_all("els=>els.map(e=>e.href)")
                assert LIVE + "routes/coordinate-evidence.html?route=" + route_id in links, route_id
                assert LIVE + "game/?route=" + route_id in links, f"{route_id} game link"
                assert any(l.startswith(LIVE + "routes/quantitative-details.html?route=" + route_id)
                           for l in links), f"{route_id} detail link"
                assert LIVE + "routes/stress-tests.html?route=" + route_id in links, route_id
            assert await page.locator(".q-dot.selected").count() == 1

            # Cross-page links stay absolute and the Orbit prototype nav link exists.
            nav_links = await page.locator(".masthead nav a").evaluate_all("els=>els.map(e=>e.href)")
            assert LIVE + "game/orbit.html" in nav_links, "orbit prototype link"
            assert await page.locator("#q-detail a", has_text="Play this conversation").count() == 1

            # In-page hash state survives reload over file://.
            assert "route=" in page.url, "hash state written"
            selected_id = await page.locator(".q-dot.selected").get_attribute("data-route")
            await page.reload()
            await page.locator("#q-workspace").wait_for(state="visible")
            assert await page.locator(".q-dot").count() == 32
            assert await page.locator(".q-dot.selected").get_attribute("data-route") == selected_id
            assert await positions() == initial, "positions must be reload-stable"

            # Filters: every country, stable positions, empty state, reset.
            await page.locator(".q-filters summary").click()
            countries = await page.locator("#country option").evaluate_all(
                "els=>els.map(e=>e.value).filter(Boolean)")
            for country in countries:
                await page.locator("#country").select_option(country)
                visible = await positions()
                assert len(visible) == await page.locator("#q-list button").count(), country
                assert all(initial[k] == v for k, v in visible.items()), country
            await page.locator("#country").select_option("")
            await page.locator("#search").fill("not-a-matching-route-xyz")
            assert await page.locator(".q-dot").count() == 0
            assert await page.locator("#q-detail h2").inner_text() == "No matching routes"
            await page.locator("#reset").click()
            assert await page.locator(".q-dot").count() == 32

            # Coverage-only views and the cooperation assumption slider.
            await page.locator("#basis").select_option("lumi-total-allocation")
            assert await page.locator(".q-dot").count() == 3, "LUMI coverage view"
            assert await page.locator(".q-assumptions").is_visible()
            await page.locator(".q-assumptions summary").click()
            await page.locator("#use-assumption").check()
            await page.locator("#cooperation").fill("0.8")
            assert await page.locator("#cooperation-value").inner_text() == "0.800"
            assert await page.locator(".q-dot.scenario").count() == 3, "assumption scenario dots"
            assert "cooperation assumption" in await page.locator("#plot-note").inner_text()
            await page.locator("#basis").select_option("aigf-phase1-design")
            assert await page.locator(".q-dot").count() == 1, "AIGF coverage view"
            await page.locator("#basis").select_option("model")
            assert await page.locator(".q-dot").count() == 32
            assert not await page.locator(".q-assumptions").is_visible()

            # Deep link straight into a coverage view via the URL hash.
            await page.goto(url + "#basis=lumi-total-allocation&route=" + lumi_route)
            await page.locator("#q-workspace").wait_for(state="visible")
            assert await page.locator(".q-dot").count() == 3, "hash deep link into coverage view"
            await page.goto(url + "#basis=model")
            await page.locator("#q-workspace").wait_for(state="visible")
            assert await page.locator(".q-dot").count() == 32

            if screenshot_dir:
                screenshot_dir.mkdir(parents=True, exist_ok=True)
                await page.screenshot(path=str(screenshot_dir / "policy-explorer-desktop.png"),
                                      full_page=True)

            # Mobile: every route selectable from the list, factor tables, no overflow.
            await page.set_viewport_size({"width": 390, "height": 844})
            for route in model["routes"]:
                route_id = route["id"]
                await page.locator(f'#q-list [data-route="{route_id}"]').click()
                await page.locator(".model-basis summary").click()
                assert await page.locator(".model-basis tbody tr").count() == 6, f"{route_id} mobile rows"
                assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth"), \
                    f"{route_id} mobile horizontal overflow"
            if screenshot_dir:
                await page.screenshot(path=str(screenshot_dir / "policy-explorer-mobile.png"))

            # No network was needed or attempted at any point.
            assert not network, f"network requests during file:// session: {network}"
            assert not errors, errors
            assert not console, console
            resources = await page.evaluate(
                "performance.getEntriesByType('resource').map(e=>e.name)")
            assert not [r for r in resources if r.startswith(("http://", "https://"))], resources

            receipt = {
                "checkedAtUTC": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                "target": str(OUT_HTML.relative_to(REPO)),
                "browser": {"engine": "chromium", "channel": "chrome", "headless": True,
                            "version": browser.version},
                "viewports": ["1440x1000", "390x844"],
                "httpRequestsDuringWholeSession": len(network),
                "routesPlotted": 32,
                "keyboardSelections": len(model["routes"]),
                "displayedScoresMatchLiveFormula": "all 32 aria-labels, detail scores and "
                                                  "sensitivity ranges recomputed from the embedded "
                                                  "model match exactly",
                "methodOverviewVisible": True,
                "weightsDisplayed": "40/30/30 on both axes, checked for every route",
                "filters": {"countriesChecked": len(countries), "positionsStable": True,
                            "emptyStateAndReset": True},
                "coverageViews": {"lumi-total-allocation": 3, "aigf-phase1-design": 1,
                                  "assumptionScenarioDots": 3},
                "deepLinks": {"hashReloadPersistence": True, "coverageHashDeepLink": True},
                "mobile": {"routesTapped": len(model["routes"]), "factorRows": 6,
                           "horizontalOverflow": False},
                "pageErrors": errors,
                "consoleErrors": console,
            }
            return receipt
        finally:
            await context.close()
            await browser.close()


# ---------------------------------------------------------------------------
# README
# ---------------------------------------------------------------------------

RECEIPT_MARKERS = ("<!-- verification-receipt:start -->", "<!-- verification-receipt:end -->")


def verification_md(receipt: dict) -> str:
    bullets = [
        f"- Checked at (UTC): {receipt['checkedAtUTC']}",
        f"- Isolated headless Chrome {receipt['browser']['version']} via Playwright, "
        f"channel `chrome`, no CDP, no profile, no sign-ins; viewports "
        f"{' and '.join(receipt['viewports'])}.",
        f"- Opened over `file://` with no web server; "
        f"{receipt['httpRequestsDuringWholeSession']} http(s) requests during the whole session "
        f"(load, all interactions, reloads), so the core display needs no network.",
        f"- {receipt['routesPlotted']} plotted routes; all {receipt['keyboardSelections']} "
        f"keyboard selections; {receipt['mobile']['routesTapped']} mobile list selections at "
        f"390×844 with no horizontal overflow and 6 factor rows each.",
        f"- Displayed scores: {receipt['displayedScoresMatchLiveFormula']}.",
        f"- Method overview visible on the page with the 40/30/30 weights on both axes, the "
        f"neutral 0.5 prior and the ±0.15/±0.30 sensitivity disclaimers.",
        f"- Filters: {receipt['filters']['countriesChecked']} country options checked with "
        f"stable positions; empty state and reset work.",
        f"- Coverage views (LUMI {receipt['coverageViews']['lumi-total-allocation']}, "
        f"AIGF {receipt['coverageViews']['aigf-phase1-design']}) and the cooperation assumption "
        f"slider ({receipt['coverageViews']['assumptionScenarioDots']} scenario dots) work offline.",
        f"- URL-hash state survives reload and deep-links into coverage views; page errors: "
        f"{receipt['pageErrors']}; console errors: {receipt['consoleErrors']}.",
    ]
    return "\n".join([RECEIPT_MARKERS[0], *bullets, RECEIPT_MARKERS[1]])


def write_readme(info: dict, receipt: dict | None) -> None:
    receipts = info["receipts"]
    table = ["| Source file | SHA-256 | Bytes | Role in the package |",
             "|---|---|---|---|"]
    for path, role in SOURCES:
        r = receipts[path]
        table.append(f"| `{path}` | `{r['sha256']}` | {r['bytes']} | {role} |")

    if receipt is None:
        old = OUT_README.read_text(encoding="utf-8") if OUT_README.exists() else ""
        match = re.search(re.escape(RECEIPT_MARKERS[0]) + r"\n(.*?\n)?" + re.escape(RECEIPT_MARKERS[1]),
                          old, flags=re.S)
        verification_section = (
            match.group(0) if match
            else RECEIPT_MARKERS[0] + "\nNot yet verified in this build. Run "
            "`/Users/gszep/Documents/repos/yu/.venv/bin/python "
            "scripts/package-policy-explorer.py --verify` to check the generated file over "
            "file:// in isolated headless Chrome.\n" + RECEIPT_MARKERS[1])
    else:
        verification_section = verification_md(receipt)

    modified_note = ("Yes - regenerate after committing them" if info["sourcesModifiedAtBuild"]
                     else "No (all copied sources are committed and clean)")
    readme = f"""# Portable policy explorer (submission asset)

`policy-explorer.html` is a single, self-contained copy of the live 32-route
policy explorer. Open it by double-clicking the file, from a USB stick or from
any attachment: no web server, no internet connection, no installs and no
repository checkout are needed to view and use the map.

- Packaged live explorer: <{LIVE}routes/#basis=model>
- Live game linked from it (original Orbit Accord prototype):
  <{LIVE}game/orbit.html>
- Playable Before Geneva: <{LIVE}game/>
- Source repository: <https://github.com/TubaAli/middle-powers-hackathon>

## What is inside the file

- The page structure, all styles, the explorer code and **both data snapshots**
  (the 32-route snapshot and the placement model with its rubrics) exactly as
  they exist in this repository. Nothing was rescored and no value was
  invented; the file header comment lists a SHA-256 receipt for every copied
  source.
- All **32 plotted routes** on the two named axes, *Implementation feasibility*
  and *Potential safety impact*, each mark keyboard-focusable and clickable.
- The **real ranking method**: 40% authority/operational readiness + 30%
  timing before Geneva + 30% manageable coordination for feasibility;
  40% possible reach + 30% safety relevance + 30% ability to enforce a remedy
  for potential impact; each route's factor table shows its exact scores and
  these weights.
- The **neutral priors and sensitivity disclaimers**: missing factors use the
  neutral 0.5 prior and are marked as imputed; the shaded box varies assessed
  factors by ±0.15 and imputed factors by ±0.30; the page states these are
  evidence-informed editorial judgments, uncertainty ranges - **not outcome
  probabilities**, not measured impact and not statistical confidence
  intervals.
- The **selection interactions**: point selection (mouse, touch and keyboard),
  country and text filters with a visible empty state and reset, the
  comparison-view switch (all-route model plus the two matched-pool coverage
  views), the cooperation assumption slider, per-route rationale and factor
  tables, and shareable in-page URL-hash state.

## What deliberately stays online

The deeper evidence is not bundled into the file; every cross-page link opens
the published site with an absolute URL: per-route calculations
(`quantitative-details.html`), retrieved evidence and gaps
(`coordinate-evidence.html`), stress tests (`stress-tests.html`), the research
pages, the downloadable JSON snapshots, and the games - Before Geneva and the
original Orbit Accord prototype at `game/orbit.html`. The core map, filters,
method text and factor tables all work offline.

## Complete list of packaging transforms

The copied code and data are byte-identical to the live files except for:

1. The five ES modules (`placement.mjs`, `metrics.mjs`, `model.mjs`,
   `briefs.mjs`, `quantitative.js`) are concatenated into one inline
   `<script type="module">`, because imported module files cannot load over
   `file://`. Their `export`/`import` keywords are removed; nothing else in
   them changed.
2. The two `fetch('../data/*.json')` calls in `init()` are replaced with
   `JSON.parse` of the embedded, byte-identical snapshots (the embedded JSON
   writes `<\\/` where the source has `</`; `JSON.parse` reads it back
   unchanged, so the data is identical).
3. Cross-page links are rewritten to the published site's absolute URLs.
4. `history.replaceState` is wrapped in `try/catch` for contexts that refuse
   history updates over `file://`; if it ever throws, in-session selection
   still works.
5. Both stylesheets are inlined; a short provenance note was added under the
   page title, a `<noscript>` notice replaces the loading message when
   JavaScript is off, the brand link scrolls to the map, and an "Orbit
   prototype" nav link to the live game was added.

The build asserts each rewrite matches exactly once, so a future change to the
live files fails the packaging script instead of silently producing a wrong
package.

## Source receipts

Generated from repository commit `{info['commit']}`
({info['commitDate']}). Copied sources modified at build time: {modified_note}.

{chr(10).join(table)}

Generated file: `{info['html']['path']}` - {info['html']['bytes']} bytes,
SHA-256 `{info['html']['sha256']}`. The HTML embeds no build timestamp, so
rebuilding from the same commit reproduces byte-identical output.

## Regeneration

From the repository root (Python 3 standard library only):

```sh
python3 scripts/package-policy-explorer.py
```

To regenerate and re-check the file over `file://` in an isolated headless
Chrome (existing Playwright environment; no installs, no user profile, no
sign-ins, no CDP):

```sh
/Users/gszep/Documents/repos/yu/.venv/bin/python scripts/package-policy-explorer.py --verify
```

The verification recomputes every route's score and sensitivity range from the
embedded model with an independent reimplementation of the live placement
formula and compares them with what the page displays, alongside the 32-route,
selection, method, keyboard, mobile and no-network checks. It is a test of the
package only; the package itself embeds no recomputed values.

## Verification receipt (isolated Playwright over file://)

{verification_section}

## Known gaps

- **Snapshot, not a mirror.** The file embeds the repository's current
  research snapshot (observed {json.loads(info['snapshotBytes'])['observed']}). Later changes to the
  live explorer or data do not appear here; regenerate to refresh.
- **"Copy route link" copies the local address.** Opened from disk, the button
  copies the `file://` URL of this copy, which only works on the same machine;
  the live site is the shareable version.
- **Hash links are location-relative.** Selection state in the URL hash is
  preserved across reloads of this same file, but a pasted `file://` link only
  works where the file sits at that path.
- **Deeper evidence and games need the network.** By design, the detail,
  evidence, stress-test, research and game links (and the JSON downloads) open
  the published site.
- **Fonts are the system stack.** The live site also uses no web fonts, but
  local font availability can shift typography slightly.
- **Coverage-only views** rely on the same embedded snapshot and remain
  matched-pool comparisons; missing coverage stays unknown, exactly as live.
"""
    OUT_README.write_text(readme, encoding="utf-8")


# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--verify", action="store_true",
                        help="after building, check the generated file over file:// "
                             "in isolated headless Chrome (existing Playwright env)")
    parser.add_argument("--screenshot-dir", type=Path, default=None,
                        help="optional directory for desktop/mobile verification screenshots")
    args = parser.parse_args()

    info = build()
    receipt = None
    if args.verify:
        import asyncio

        receipt = asyncio.run(verify(info, args.screenshot_dir))
    write_readme(info, receipt)

    summary = {
        "commit": info["commit"],
        "sourcesModifiedAtBuild": info["sourcesModifiedAtBuild"],
        "html": info["html"],
        "verified": bool(receipt),
    }
    print(json.dumps(summary, indent=2))
    if receipt:
        print(json.dumps(receipt, indent=2))


if __name__ == "__main__":
    main()
