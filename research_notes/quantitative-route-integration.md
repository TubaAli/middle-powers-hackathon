# Quantitative route integration — 31 October 2026

## Delivered inputs

This is an offline conversion of existing Geneva research, not a new research pass or a deployment. Only these three files are owned by this task:

- `data/route-research/geneva-additions.json`: five new legacy-compatible route cards, each with `scenarioId`, a three-sentence `brief` array, `quantitativeOnly: true`, a quantitative input object and local source records retaining their Geneva IDs.
- `data/route-research/quantitative-overlays.json`: eight exact-existing-ID overlays and one named coverage basis. Merge each overlay's `quantitative` into its existing card and merge its source records by ID; preserve the original legacy evidence records.
- This integration note.

No change to `data/routes.json`, source research, front-end code, builder or navigation was made. No git operations, agents, contacts, installs or new external retrieval were performed. Build, presentation, commit, push and public delivery belong to the integrating owner.

## New routes and why they are distinct

| New route ID | Original Geneva scenario | Distinct endpoint | Evidence confidence |
|---|---|---|---|
| `ch-electricity-operator-fallback` | `scenario-ch-electricity-ai-fallback` | Swissgrid-owned isolated fallback comparison, not a state deployment gate | Medium: operator application and governance are documented; pilot permission, baseline and test environment are not |
| `uk-energy-staged-autonomy-assurance` | `scenario-uk-energy-staged-autonomy` | Energy-operator staged-autonomy replay, separate from strategy uptake | Medium: evidence call and assurance topics documented; actual operator/data/rights unknown |
| `uk-agent-accountability-evidence` | `scenario-uk-ico-agent-accountability` | Data-protection accountability pilot plus incorporation in ICO guidance | Medium: call, scope and guidance target documented; exact proposal unaccepted |
| `sg-purchaser-sandbox-release-gate` | `scenario-sg-sandbox-purchaser-gate` | One purchaser's contractual release consequence within a voluntary sandbox | Medium: programme and application testing documented; empowered buyer and agreements unknown |
| `kr-safety-case-incident-rehearsal` | `scenario-kr-safety-case-rehearsal` | A consenting developer's synthetic incident/evidence rehearsal against verified operative duties | Low: relevant draft is available but current legal text, enforcement and applicability are unresolved |

Singapore's new card is deliberately **not** the existing Singapore government-wide deployment gate or the three-country shared-evaluation protocol. The Korean card is a developer workflow rehearsal, not the three-country procurement profile or reciprocal evaluation recognition. No pairing or coordination bonus is created. All five statuses are `Proposed`.

Legacy `impact: 2` and `feasibility: 2` (with broad `[1,5]` compatibility ranges) are **schema placeholders only**, not fresh expert estimates. Both rationales say so. The integrating UI must hide these fields for `quantitativeOnly` cards; do not divide them by five or use them as fallback coordinates. The existing mechanism enum is preserved: `Evaluation` for the assurance cards, `Procurement` for the buyer gate; optional `mechanismLabel` gives a more specific description.

## Quantified inputs and limits

There are **13 route records after integration**, **one conditional proposed-resource coverage ratio**, **zero measured operational coverage values**, and **12 null coverage values**. Six records have numeric structural handoff lower bounds; none has a complete agreement inventory or an approval fraction.

### One legitimate matched resource envelope

The EuroHPC **whole proposed Phase 1 procurement route**, not the Geneva one-facility pilot, can be scoped to the tender's own minimum design:

`(4 × 25,000) + (3 × 40,000) = 220,000 H100-equivalent accelerators`.

If all relevant contracts adopt the proposed protocol, its potential envelope is `220,000 / 220,000 = 1`. The numerator is explicitly **conditional proposed scope**, not an observed protected amount. The denominator is neither world compute nor installed capacity. This uses the existing specification evidence, `eur-eu-spec`, sections 3.d–f, and the draft contractual mechanism, `eur-eu-fwc`. The retained synthesis at `research_notes/Safeguard validation by Geneva/europe.md` and the denominator record in its sibling `europe.json` establish the minimum-capacity arithmetic.

The minimum-design basis is `aigf-phase1-design`, labelled “AIGF Phase 1 tender design”; unit, period and planned-procurement stage are explicit. The dataset does **not** claim that the source proves a 220,000 safeguarded numerator, that the proposed protocol is already agreed, or that it necessarily reaches tenant model incidents. All-contract adoption, lawful scope and necessary tenant evidence rights are conditions. A single-facility pilot must not be presented with this whole-route coverage. A runtime view showing only the pilot must set its resource coverage unknown unless that pilot's own matched capacity is established.

The source's market-led off-take, setup period and anchor-customer exceptions prevent substituting installed chips, public-access hours or deployment control for this narrowly labelled design envelope. Cross-basis ranking would be misleading: a full share of one proposed tender is not the same safety effect as a full share of a national or global population.

### Agreement mapping

| Existing route | Geneva linked scenario | Minimum independent institutions | External handoffs lower bound |
|---|---|---:|---:|
| `eurohpc-incident-protocol` | `scenario-eurohpc-security-evidence` | 3 in minimum one-facility subpath | 2; full seven-facility roster incomplete |
| `jp-procurement-safety-evidence` | `scenario-jp-versioned-acceptance` | 2 in Digital Agency-only path | 1 |
| `canada-cohere-equity-safety-covenant` | `scenario-ca-measurable-stage` | 2 counterparties; evaluator independence unresolved | 1 |
| `taiwan-public-compute-safety-conditions` | `scenario-tw-adi-award` | 3 if documented external-operator architecture retained | 2 |
| `anthropic-new-credit-lender-safety-covenant` | `scenario-an-new-money-evidence` | Unknown; actual lender roster missing | Unknown |
| `jp-kr-sg-procurement-profile` | No exact counterpart | Unknown | Unknown |
| `sg-agent-data-leakage-deployment-gate` | No exact counterpart: individual buyer scenario is different | Unknown | Unknown |
| `sg-kr-jp-shared-eval-evidence-protocol` | No exact counterpart: replication is not recognition | Unknown | Unknown |

For new cards, Swissgrid has the source graph's one-institution lower bound and therefore zero *forced external* transfers; this is not a claim that no outside permission is needed. The ICO combined pilot-and-guidance endpoint has two distinct institutions and at least one transfer. UK energy, Singapore sandbox and Korean rehearsal retain the source graph's null institution counts rather than inventing a number from role labels.

Where N is a known independent-institution lower bound for a connected implementation path, `handoffsLowerBound = N − 1` is the minimum number of external decision, evidence or contract transfers needed to connect those institutions. It is **not** a count of bureaucracy, document signatures, critical-path stages, duration or acceptance probability. Counting multiple offices in the same organisation as independent institutions would invalidate it. Optional sponsors are excluded. Conditional rights holders, additional recipients, new budget gates and unverified supplier/evaluator independence stay in limitations, not silently in a finite total.

All `complete` flags remain false. Every `consent` is `unknown`: no existing evidence records an accepted exact-proposal agreement. `alignment: support` only records sourced general policy/evidence interest (ICO, Cohere, ADI), not acceptance of the proposed terms. Other alignment is unknown rather than invented opposition. Empty actor arrays on the three unmatched overlays mean “no exact graph in this evidence set”, not “zero agreements required”. Named-but-unselected counterpart roles are explicitly labelled unknown, and cannot be treated as signed participants.

## Coverage deliberately left unknown

- Swiss electricity: need covered and total MWh for the same declared AI-facility population and period. Thirty fault cases or a proposed 27/30 success gate is not this denominator.
- UK energy: need the selected asset population and consistent covered/total MW or MWh, not national energy scale.
- UK agent accountability: need an eligible workflow/execution inventory, not a synthetic test success fraction.
- Singapore purchaser: need the purchaser's signed-gate applications and full frozen eligible inventory; thirty programme applications is a reach count, not the population of this policy.
- Korean rehearsal: need current in-scope model inventory and version-specific evidence coverage; unresolved applicability prevents the denominator.
- Japan procurement: survey use, question counts and an evaluation's pass rate do not describe procurement resource coverage.
- Canada: need actually negotiable uncommitted subscriptions and the subset bearing an executed condition, not the announced investment ceiling or fundraise target.
- Taiwan: keep training GPU-hours and inference tokens separate within the same award cohort; do not substitute broader programme expenditure or heterogeneous GPU totals.
- Anthropic: need actual new commitment amounts and executed covenant coverage in a real transaction. Contractual headroom, arranger nationality and GDP do not establish them.
- Regional routes and the Singapore government-wide gate: no matched institutional/resource inventory is provided by the individual Geneva pilots.

## Window distinctions preserved

- UK energy evidence: **6 November 2026** deadline; no operator test permission follows.
- ICO agentic evidence: **20 November 2026** deadline; **spring 2027** guidance is a target without an exact day.
- Swiss public consultation: **spring 2027** opening target; electricity-sector code work has no adoption deadline. January selection and February–May testing are project proposals.
- Singapore programme: ongoing participation and a three-month testing/case-study period, not a guaranteed future intake or signed February–April booking.
- Korea: consultation closed **26 February 2026**; **22 January 2027** is only the earliest grace-period anniversary, not confirmed enforcement change or a new drafting window.
- EuroHPC: retained extension announcement gives **3 December 2026** for Lot 2 and **4 February 2027** for Lot 1; no executed protocol follows from either.
- Japan: November–April sequence is changeable month-level planning; Taiwan's 2026 application cutoff is already past; finance transactions have no verified live future negotiation dates.

These are transformations of the retained research's observation date, not new verification of current events. Source access labels describe the original research. They do not imply sources were re-fetched in this task.

## Checks and integration boundary

Executed local checks:

1. Parsed both JSON files and matched every addition against the exact keys of the existing EuroHPC legacy card: all required fields present.
2. Verified five unique new route IDs disjoint from the existing eight, eight overlays matching exactly the existing IDs, and five valid Geneva scenario IDs whose `existingRouteId` is null.
3. Verified every quantitative and actor `sourceIds` reference resolves within its own card/overlay; every normalized source ID and URL resolves to the global Geneva source ledger, with its retained observation date. **26 normalized source records** across the two files.
4. Verified all five new routes are proposed and quantitative-only; all consent is unknown; all agreement inventories incomplete; source-derived numeric lower bounds match N−1; the sole non-null coverage matches its basis and arithmetic.
5. Called `validateDataset` from `routes/model.mjs` on the additions alone and on an in-memory 13-route combination. Both passed. No runtime snapshot was generated.
6. Called the integrating owner's `validateQuantitative` from `routes/metrics.mjs` on an in-memory 13-route dataset with overlay sources merged: passed. Ran `node --test routes/model.test.mjs routes/metrics.test.mjs`: 11 passed, zero failed, one published-data test skipped. The skip is not a public-delivery check; the direct in-memory validation above covers these input files only.

Re-run legacy schema checks without writing output:

```sh
node --input-type=module - <<'JS'
import fs from 'node:fs';
import {validateDataset} from './routes/model.mjs';
const additions = JSON.parse(fs.readFileSync('data/route-research/geneva-additions.json'));
const original = JSON.parse(fs.readFileSync('data/routes.json'));
validateDataset(additions);
validateDataset({...original, routes: [...original.routes, ...additions.routes]});
console.log('Legacy schema: additions and combined 13-route snapshot pass');
JS
```

Remaining integration work: load the new shard; merge overlays and their sources; use each card's `brief`; hide compatibility ratings on quantitative-only cards; display nulls rather than manufactured coordinates; distinguish conditional coverage from observed coverage and keep named bases visible. Browser and public-deployment checks are not part of this input-only task.

The next discriminating research question is not “what number should fill every empty point?” It is: **which named counterparty can supply an accepted exact-safeguard agreement and a complete, matched inventory for its declared policy scope?** Until then, a partially populated quantitative map is the evidence-faithful result.
