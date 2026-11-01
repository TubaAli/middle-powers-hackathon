# Plot–game traceability audit

Question (from the team): *is the submitted game actually based on the research that
produced the 2D feasibility-vs-impact plot?* Audited 1 November 2026, repo head
`cbaa491`, evidence snapshot 31 October 2026. File/line/ID audit of existing
artefacts only: no new research, no implementation edits, no commits. Machine-readable
companion: `plot-game-audit.json` (32-entry route trace). The parallel WIP notes in this
directory are other owners' untracked work and were not touched.

## Verdict: actual vs intended

**Game A — Before Geneva (`game/`, the submitted game): grounded at route level, not at
coordinate level.** Its 32 conversations are keyed to the *identical* route-ID set as the
plot (`set` equality verified across `data/route-placement-model.json`,
`data/stress-tests.json`, `game/campaign.json`), compiled from the same 31 October
research snapshot with SHA256-pinned inputs, and two-way per-route links exist 32/32.
But the game consumes **zero plot coordinates**: `campaign.json` route objects carry no
factor scores, no x/y, and the game code never fetches `route-placement-model.json`.
Outcomes come from deterministic authored rules
(`game/story-engine.mjs:1` — "Research scores never become acceptance probabilities").

**Game B — Orbit Accord (`game/orbit.html`): not based on the routes research at all.**
It runs on the earlier aggregate supply-chain layer — `data/layers.json` shares (gszep's
"Speed limits, not walls", copied unchanged), `data/conditions.json` six-condition lever
heuristic ("Team heuristic… a scenario, not a measure of enforceable bargaining power"),
`data/windows.json` law windows, `game/planets.json` 11 country groups with illustrative
tokens ("not measured data and should not be cited") — plus invented acceptance odds and
random rolls. It has no route IDs and no link to the plot. It is, however, honestly
self-labeled (`game/game.js:253,279`).

**Intended vs actual.** The intended framing — plot explains the ranking method, game
communicates it publicly — is *mostly* delivered and mostly honestly caveated, with two
gaps: (1) the submission draft never states what "the game is based on the research"
precisely means (same sample + snapshot + per-route links, but no coordinate grounding),
and (2) it links Orbit Accord without saying that prototype uses a different evidence base
with random odds. The team's *intended* future direction (this directory's `BRIEF.md:7-8`:
Game B as mechanical/story base with Game A's visual style, grounded by new diplomacy
research) is **not implemented**; those research files are untracked WIP.

## Demonstrable traceability chain (Game A ↔ plot)

1. **Same 32 route IDs everywhere.** 32 routes in the placement model, 32 in
   `data/stress-tests.json`, 32 conversations in `game/campaign.json`, 32 entries each
   in `game/dialogue-authored.json` and `game/learning-notes.json`; sets identical, no
   duplicates (verified programmatically; recorded in `plot-game-audit.json:idAlignment`).
2. **Compiler gate.** `scripts/build-before-geneva.py:14` asserts the authored dialogue
   set equals the stress-tests route-ID set, so the game cannot drift from the researched
   sample. Lines 26–27 carry source records (id/title/href/access/locator/sourceCheck);
   lines 42–43 carry per-route research (`headline`, `assessment`, `decisionTest`,
   `unknowns`, `newEvidence`, `sources`); line 47 writes SHA256 input hashes into
   `campaign.json:inputs` — pinning exactly which research produced the game
   (`data/stress-tests.json` `f2b67e2d…`, `dialogue-authored.json` `8df4c408…`,
   `learning-notes.json` `305eefcf…`).
3. **Plot → game link, 32/32.** `routes/quantitative.js:80` appends
   "Play this conversation" → `../game/?route=<id>` in `renderDetail` for the selected
   route in every view (all 32 routes selectable; `game/README.md:81` claims and this
   audit confirms full coverage).
4. **Game → plot link, 32/32.** `game/before-geneva.js:180` (research drawer per
   conversation) links "On the chart" → `../routes/#basis=model&route=<id>` and
   "Full research" → `../routes/stress-tests.html?route=<id>`.
5. **Deep-link handling.** `game/before-geneva.js:225-226` reads `?route=`; the lounge
   sort (`:105-110`) pins it first; 8 featured routes by default (`:12`) with an
   "All 32" toggle (`:117`).
6. **Snapshot identity.** `campaign.json` `researchObserved: 2026-10-31` matches
   `data/stress-tests.json` and `data/route-placement-model.json` `observed`.
7. **Index arithmetic cross-check.** Recomputing the weighted model indices from
   `route-placement-model.json` reproduces the documented example exactly:
   `indiaai-subsidy-evaluation-gate` → feasibility 0.655, impact 0.735
   (`notes.md:395`: "impact 73.5 … feasibility 65.5").

What the game does **not** take from the plot: coordinates, factor scores, feasibility or
impact values, sensitivity ranges. The stress-tests file *does* retain the original
placement reasoning per route (`routes[].original.factors/xBasis/yBasis`), but the
compiler does not carry it into `campaign.json`; the dossier reaches it only via the
"On the chart" link. So: shared sample, shared snapshot, shared sources and real ID-level
linkage — **not** plotted-position grounding of game mechanics.

## What is not established (guards against overclaiming)

- Plot coordinates are heuristic/imputed editorial judgments: 23 of 192 factor entries
  (14 routes) use the neutral 0.5 prior; `data/route-placement-model.json:4` — "No score
  is a probability or an estimate of harm prevented." They are not causal effects,
  success probabilities, or measured feasibility/impact. Sensitivity bands are ±0.15/
  ±0.30 scenario ranges, not confidence intervals (`routes/README.md:17-23`).
- Winning or completing anything in Game A is authored fiction; `campaign.json`
  `fictionNotice` and the in-game fineprint say so explicitly.
- Game B's "Chance was X%" letters are illustrative rules over aggregate shares
  (`game/game.js:84-96,106-111,253`), never output of the 32-route research.
- `data/stress-tests.json` summary itself records: "Production is a 2D plot; only an
  added preference function supplies ranks."

## Submission draft claim audit (`submission/submission-draft.md`)

Supported (spot-verified): :10 combination claim; :14 editorial-judgment/fiction framing;
:42 32 conversations / 224 nodes / eight monthly councils / dossier per conversation
(32×7 nodes; `campaign.json` months); :48 weights and 23/192 imputations (verified
count); :50 deterministic display offsets and separate coverage views; :52 for Game A;
:58–66 IndiaAI worked example (matches the stress-tests route record); :90 browser
acceptance and byte-match statements (match `notes.md:13-18`); :94 no-consent disclaimer.

Unsupported or imprecise — the actionable list:

1. **:90 "The game and model checks passed 17 automated unit tests."** Imprecise. Current
   counts: `game/story-engine.test.mjs` = 8 tests (8 pass); routes model+metrics+placement
   = 17 tests (16 pass, 1 *skipped* — "all published route data satisfies the model
   contract" runs only with `CHECK_ROUTE_SNAPSHOT=1`, then 6/6 model tests pass). The 17
   matches the routes suite, which does not include the game's 8;
   `game/narrative-rewrite.md:95` separately says "19 engine/model tests". State
   suite-by-suite counts or drop the single number.
2. **:44 Orbit Accord mention.** True but underspecified: it does not say the prototype's
   evidence base is aggregate supply-chain shares with illustrative odds and random
   outcomes — a different layer from the 32-route research the draft describes. A judge
   who plays it meets a `Math.random` acceptance roll with a "Chance was 42%" letter.
3. **:52 "Game resources and endings are separate deterministic rules, not probabilities
   inferred from policy scores."** Accurate for Game A only. Because :44 links Game B in
   the same "What we built" section, add the A/B distinction or scope the sentence to
   Before Geneva.
4. **Missing positive claim (under-sold, zero-risk to add):** the draft never says the
   32 conversations are keyed to the same route IDs as the plot with working two-way
   links and pinned input hashes. That is the strongest true grounding statement
   available and costs one sentence.

No other unsupported claims found: the draft's model caveats (:46–52), validation limits
(:88–94) and AI-use disclosure (:96–100) accurately match the artefacts.

## Minimum honest framing (proposed wording, not applied)

- Add to "What we built" or "How to interpret the model": *"The game's 32 conversations
  are keyed to the same route IDs as the map and compiled from the same 31 October 2026
  research snapshot; the build records the exact input hashes. The map's feasibility and
  impact positions are editorial judgments and are not used by the game's rules."*
- Amend :44 to: *"The original Orbit Accord prototype — aggregate supply-chain shares
  (gszep's published model) with illustrative acceptance odds and random outcomes —
  remains available at …/game/orbit.html; it is a separate, self-labeled toy of the
  leverage idea, not the 32-route research."*
- Replace :90's test sentence with suite counts: *"All 8 game story-engine tests and all
  17 route-model tests pass (one snapshot-contract test runs only in the full-check
  configuration)."*
- Keep every existing caveat; do not add claims that the game "implements" or "validates"
  the plot.

## Integration bridge preserving Game B (map, jet, characters, mechanics)

The team's `BRIEF.md` already fixes direction: Game B as the mechanical and
story-progression base, Game A's visual style, grounded by this directory's diplomacy
research. Minimum-honesty bridge, in increasing effort:

1. **Label the two evidence layers inside Game B** (small copy change): shares HUD =
  "rough supply-chain estimate (gszep model)"; odds footer already says "illustrative".
   Never surface placement-model scores as negotiation inputs.
2. **Add outbound route hooks, no rewiring:** from a planet's meeting letter, dossier or
   the end screen, deep-link "Researched routes for these countries" →
   `../routes/#basis=model&country=<name>` (the plot supports country filters) and, where
   a conversation exists, `../game/?route=<id>`. The mapping is derivable from
   `campaign.json` `countries` arrays (e.g. `jp-procurement-safety-evidence` → Japan;
   `lumi-*` → EuroHPC states) and is already materialised per route in
   `plot-game-audit.json:routeTrace`.
3. **When the Realistic-diplomacy rules land,** treat proposed modifiers as
   evidence-constrained fiction per `BRIEF.md:33` ("Never represent game modifiers as
   measured acceptance probabilities") — consistent with this audit: coordinates and
   country-interest scores are heuristic inputs to drama, never effect probabilities.

## Verification log

- `set` equality of route IDs across placement model / stress-tests / campaign /
  dialogue / learning-notes: 32 = 32 = 32 = 32 = 32, identical sets.
- Campaign: 32 conversations × 7 nodes = 224; 8 months; input hashes present.
- Placement model: 192 factor entries, 23 nulls across 14 routes; recomputed IndiaAI
  indices match `notes.md:395`.
- `node --test game/story-engine.test.mjs` → 8/8 pass; `node --test
  routes/{model,metrics,placement}.test.mjs` → 17 tests, 16 pass, 1 skip
  (snapshot contract); with `CHECK_ROUTE_SNAPSHOT=1` model suite 6/6 pass.
  `scripts/check-stress-tests.mjs` and `check-geneva-research.mjs` pass.
- Read end-to-end: `README.md`, `notes.md`, `DESIGN.md`, `RESEARCH-STATUS.md`,
  `routes/README.md`, `routes/index.html`, `routes/quantitative.js`,
  `data/route-placement-model.json`, `data/stress-tests.json` (structure + sample
  records), `data/conditions.json`, `data/windows.json`, `data/layers.json` (_meta),
  `scripts/build-before-geneva.py`, `game/README.md`, `game/index.html`,
  `game/orbit.html`, `game/before-geneva.js`, `game/story-engine.mjs`, `game/game.js`,
  `game/planets.json`, `game/meeting.js`, `game/narrative-rewrite.md`,
  `game/campaign.json` (structure + samples), `game/dialogue-authored.json` /
  `learning-notes.json` (samples), `submission/submission-draft.md`,
  `submission/README.md`, `submission/demo-video-script.md`,
  `research_notes/Realistic diplomacy/BRIEF.md`.

Not verified here (out of scope): live-site behaviour beyond the team's recorded
acceptance runs, and the content accuracy of the 89 source records.
