# Routes to safeguards

The approved route-level explorer for the Middle Powers hackathon. Run a static
server from the repository root (`python3 -m http.server 8765`) and open
`http://localhost:8765/routes/`.

## What it does

The map leads with potential impact and feasibility. Each point opens a short
decision brief; on mobile, selecting a point brings the brief into view. The
brief links to `details.html` for the full mechanism, assessment, gaps and
claim-level sources. Filters and paired comparisons expand on request.
The green upper-right zone is a direction to look, not an endorsed shortlist.

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
