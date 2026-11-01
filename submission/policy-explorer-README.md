# Portable policy explorer (submission asset)

`policy-explorer.html` is a single, self-contained copy of the live 32-route
policy explorer. Open it by double-clicking the file, from a USB stick or from
any attachment: no web server, no internet connection, no installs and no
repository checkout are needed to view and use the map.

- Packaged live explorer: <https://tubaali.github.io/middle-powers-hackathon/routes/#basis=model>
- Live game linked from it (original Orbit Accord prototype):
  <https://tubaali.github.io/middle-powers-hackathon/game/orbit.html>
- Playable Before Geneva: <https://tubaali.github.io/middle-powers-hackathon/game/>
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
   writes `<\/` where the source has `</`; `JSON.parse` reads it back
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

Generated from repository commit `3250f597283cefd0b5762965e13e76d178a775d1`
(2026-11-01T15:50:52+09:00). Copied sources modified at build time: No (all copied sources are committed and clean).

| Source file | SHA-256 | Bytes | Role in the package |
|---|---|---|---|
| `routes/index.html` | `e3d0ec3a4362a7339687a7c84c8e178af94d6760c48a32b4bbbfdd6498b6c6d7` | 5843 | page structure and visible method text |
| `routes/quantitative.js` | `722e71f923c5b9ad6000f5b29c1c78d096efe8b59ec94797228e3bc1bba4b7fe` | 15894 | explorer controller |
| `routes/placement.mjs` | `cb3ed4e03370f43de0d6db88abcb6579d8f7167cdd1161fb63286e5540c54e24` | 2829 | score and sensitivity calculation |
| `routes/metrics.mjs` | `68593e3a364dcc874b3e81cf1c1640f6f144c7d02d7a1a05ba286ee56a00e499` | 4250 | coverage/agreement metrics and snapshot validation |
| `routes/model.mjs` | `8f8c4c407b9a5daef4610eb1b8342bf7a319c4db04607f899c2e7d7d2a6a5ee7` | 3780 | coordination labels and dataset validation |
| `routes/briefs.mjs` | `8ca22152b24dd4fca3bd1b61da1b2c51a5607936ae1dd4b14a39650b3ed871ba` | 2650 | editorial one-line briefs |
| `routes/style.css` | `ed7de8e453396cea867824403420a343ed52a437ac7c68ec0ec43ca825e75b72` | 14473 | base styles |
| `routes/quantitative.css` | `25b16a808b42e2d5da2a736d9f7dba25dc3735ad9551b5654b7d2aad252808d8` | 4552 | explorer styles |
| `data/routes-quantitative.json` | `8461105a9aae97b1d2b875d0a346ffbeeed57581e9bf0998099d5756dfb8b865` | 304698 | embedded snapshot: 32 routes |
| `data/route-placement-model.json` | `b7c93011ec16f6ac6b30c7588ba1a0685c9052a46f1040ef043a93a896bc8ba1` | 17486 | embedded snapshot: model weights and factors |

Generated file: `submission/policy-explorer.html` - 381343 bytes,
SHA-256 `e53c24d78ab34def265915dd43f1cfc34de50822ff3ccf289517db0b25f7d460`. The HTML embeds no build timestamp, so
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

<!-- verification-receipt:start -->
- Checked at (UTC): 2026-11-01T06:53:14+00:00
- Isolated headless Chrome 156.0.8078.74 via Playwright, channel `chrome`, no CDP, no profile, no sign-ins; viewports 1440x1000 and 390x844.
- Opened over `file://` with no web server; 0 http(s) requests during the whole session (load, all interactions, reloads), so the core display needs no network.
- 32 plotted routes; all 32 keyboard selections; 32 mobile list selections at 390×844 with no horizontal overflow and 6 factor rows each.
- Displayed scores: all 32 aria-labels, detail scores and sensitivity ranges recomputed from the embedded model match exactly.
- Method overview visible on the page with the 40/30/30 weights on both axes, the neutral 0.5 prior and the ±0.15/±0.30 sensitivity disclaimers.
- Filters: 37 country options checked with stable positions; empty state and reset work.
- Coverage views (LUMI 3, AIGF 1) and the cooperation assumption slider (3 scenario dots) work offline.
- URL-hash state survives reload and deep-links into coverage views; page errors: []; console errors: [].
<!-- verification-receipt:end -->

## Known gaps

- **Snapshot, not a mirror.** The file embeds the repository's current
  research snapshot (observed 2026-10-31). Later changes to the
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
