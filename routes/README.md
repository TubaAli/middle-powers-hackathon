# Routes to safeguards

The approved route-level explorer for the Middle Powers hackathon. Run a static
server from the repository root (`python3 -m http.server 8765`) and open
`http://localhost:8765/routes/`.

## What it does

The default map places all 32 routes using an **evidence-informed editorial
model**, approved on 31 October 2026. Feasibility and potential safety impact
are continuous weighted indices on 0–100, not probabilities or measured harm
reduction. `data/route-placement-model.json` contains six-factor rubrics, weights,
each route's assessments, explicit nulls and x/y reasoning. Nulls use the neutral
0.5 prior. All assessments are judgments; retrieved facts inform them rather
than directly measuring the axes. Each card links to its retrieved evidence.

`placement.mjs` calculates scores and factor-wise sensitivity bounds (±0.15 for
assessed factors, ±0.30 for imputed factors, clipped to 0–1 before weighting).
The bounds are scenario sensitivity, not statistical confidence. Deterministic
3px noise plus collision separation keeps all circles visible. Positions are
computed once over the full sample, so filtering and reloads do not move them.
Selected points show a cross at their true score and a line to the drawn mark.
No noise is added to scores, factor inputs or downloads.

The selector retains **coverage-only views** with matched resource denominators
and the agreement index. These remain separate from the all-route model;
missing empirical coverage stays unknown. Existing `#basis=...` links preserve
their chosen view; `#basis=model` opens the complete model explicitly.

Coverage is a matched numerator / denominator, conditional on adoption, not
measured harm prevention. The agreement index is support share / (1 + minimum
unresolved handoffs). This penalty is a modelling choice, not a calibrated
probability. Unknown consent produces bounds; the optional slider supplies a
visitor assumption. Incomplete agreement paths may need more parties.

Build with `python3 scripts/build-quantitative-data.py`; the default page reads
`data/routes-quantitative.json`. The builder strips legacy numeric scores.
Run `node --test routes/metrics.test.mjs routes/placement.test.mjs` and
`python3 scripts/check-quantitative-browser.py --url http://127.0.0.1:8765/routes/`
(the latter needs installed Playwright and an authorized CDP browser on 9222).
For the all-route view, run `scripts/check-placement-browser.py` with the same
Python environment and optional `--url`. It checks all 32 point selections,
stable filter/reload positions, mobile factor tables, coverage-view switching
and round-trip navigation from the detailed calculations.

## Earlier estimates

## Retrieved coordinate evidence

`coordinate-evidence.html` is a separate, mobile-friendly evidence browser for
all 32 map routes. Filter by route, text or x/y/context; inspect exact source
locators, retrieval queries, gap status and limitations. Share a selection with
`?route=kenya-biometric-dpia-evidence-gate&axis=x` (hash parameters also work).
The first non-context inputs are visible; remaining inputs and sources expand.
This ordering is not an evidence-strength score. Numerical records include
plans, legal thresholds, dates and context, not just measured outcomes.

Build with `python3 scripts/build-coordinate-evidence.py` after the quantitative
snapshot. The deterministic, lossless `data/coordinate-evidence.json` includes
regional source/search scopes, method findings, file hashes and download links.
It does not estimate or change coordinates. Source record totals do not imply
independent sources. Research owners retain their original ledgers unchanged.

Run `node scripts/check-coordinate-evidence.mjs` for coverage, scoped references,
value types, finite values, URL safety, lossless normalization, file hashes and
negative cases. Optional browser acceptance uses the already-installed Python
Playwright environment and authorized CDP session:

```sh
COORDINATE_BROWSER_PYTHON=/path/to/existing/python node scripts/check-coordinate-evidence.mjs --browser http://127.0.0.1:8765/routes/coordinate-evidence.html
```

No dependency installation or new browser profile is needed. Browser acceptance
checks every route, all axis filters, query/hash deep links, search/reset,
all quantitative-detail links, expanded 390px layout and page errors.

## Earlier estimates (preserved view)

The following describes `estimates.html`, which preserves the original eight
routes, ordinal assessments, comparison arrows and reconstructed replay.

The map leads with potential impact and feasibility. Each point opens a short
decision brief; on mobile, selecting a point brings the brief into view. The
brief links to `details.html` for the full mechanism, assessment, gaps and
claim-level sources. Filters and paired comparisons expand on request.
The green upper-right zone is a direction to look, not an endorsed shortlist.
Dotted rings mark non-dominated visible routes: no other visible route has at
least as high a rating on both axes and a higher one on either. They describe
the current editorial scores, not recommendations or measured superiority.

- Plots ordinal implementation feasibility against potential impact **if adopted**.
- Colours routes by international coordination requirements; source confidence
  is a separate visual channel, never a success probability.
- Filters by country/institution text, instrument, region and coordination.
- Shows actor, instrument, obligor, safeguard, verification, remedy, timing,
  source claims and unresolved questions for each route.
- Compares national and coordinated versions of similar proposals. Arrows show
  editorial comparisons, not observed causal effects or an automatic coalition bonus.
- Replays a reconstructed EuroHPC source-review sequence. It changes an in-memory
  display state only; it does not alter the published snapshot or run a search.
- Keeps route selection, filters, comparison and replay state in shareable URLs.

## Data and checks

`research.html` presents the Geneva scenario follow-up. Its source snapshot is
`data/geneva-research.json`: ten candidate scenarios, agreement dependencies,
dated opportunities and empirical fractions. These fractions describe specified
populations or existing tests; they do not replace the original map ratings.
Run `node scripts/check-geneva-research.mjs` to check arithmetic, references,
date precision and protection against treating unknown approvals as zero.

`data/route-research/*.json` are the reviewed inputs. Build the static runtime
snapshot with `python3 scripts/build-route-data.py`. The browser reads only
`data/routes.json`. Source dates, locators and claim scope travel with each card.

Run `node --test routes/model.test.mjs` for model checks; set
`CHECK_ROUTE_SNAPSHOT=1` to also validate the assembled snapshot. Source truth,
legal reach and editorial ratings still require substantive review.

## Interpretation

All ratings are editor-assigned integers from 1 to 5. They are not probabilities,
effect sizes or country rankings. Ranges represent reasonable editorial
disagreement, not confidence intervals. A source's discussion of a programme
does not prove that a proposed safeguard has been accepted. Each card separates
that distinction and asks for the next discriminating evidence.

The sample is selected for diversity, not representativeness. Cluster separation
in these points cannot validate the middle-power thesis. A later evaluation
would need a defined sampling frame, independent coding, outcome evidence and
controls for differences between proposed national and coordinated routes.

Continuous source monitoring and proposal review are future capabilities. This
is a dated research snapshot and a transparent replay, not an autonomous live
research engine. No keys, sign-ins or paid APIs are required to view it.
