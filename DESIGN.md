# Leverage Map + Coalition Builder: design

## All-route placement model (31 October 2026)

Grisha approved placing the complete sample using evidence-informed estimates,
reasonable imputation where inputs are missing, and small display noise to avoid
overlap. The default is now all 32 routes. The six-factor model and its limitations
are documented in `routes/README.md` and `data/route-placement-model.json`.
The model uses the retrieved snapshot, explicitly separates judgments from
facts, imputes missing factors at 0.5, and shows sensitivity rather than claiming
calibrated uncertainty. Noise affects only drawn marks. The matched-pool views
below remain available as a separate comparison mode.

## Implementing quantitative comparison

The default route view now uses potential coverage within a named resource pool
and an explicit agreement index on 0–1 axes. Coverage is a sourced numerator
divided by its matching denominator; it is conditional scope, not measured harm
prevention. Different pools are never plotted as interchangeable quantities.

Agreement index = support share among the proposed path's required parties /
(1 + minimum unresolved cross-organisation handoffs). The handoff penalty is an
explicit modelling choice, not a fitted causal law. Unknown exact consent yields
an interval; optional visitor assumptions produce scenario points. A required
rejection blocks that path. Incomplete paths have a zero lower bound and may need
additional parties. General political support is shown separately from consent.

Missing coverage or authority data stays missing. Such candidates remain in the
country list. Earlier 1–5 judgments are preserved in `routes/estimates.html`;
newly sampled routes have no displayed legacy scores.

## Approved direction: routes to safeguards (31 October 2026)

Grisha approved a route-level explorer: **help middle-power policymakers identify routes to safeguards, and compare what they can accomplish alone versus together.** The existing supply-chain views remain supporting context.

- Plot **implementation feasibility** horizontally (right is more achievable), and **potential safety impact if implemented** vertically. Initial positions are transparent qualitative assessments, not calibrated probabilities or measured risk reduction. Difficulty, legal authority, cost, time and required consent stay inspectable.
- Colour points by coordination requirement: **one jurisdiction**, **multiple middle powers**, or **broader coalition** (requiring additional actors/institutions). National action still needs counterparties; the colour concerns international coordination, not unilateral control.
- Keep **evidence confidence separate** from both axes; show uncertainty and evidence maturity. Do not reward a route just because more articles repeat the same announcement.
- A point represents an **actor → instrument → safeguard → verification → remedy** route. EuroHPC is one point, not the entire product. Include contrasting routes across countries and mechanisms.
- Pair otherwise comparable national and coordinated proposals, with an arrow and explicit assumptions. Test whether coordination improves impact and feasibility; do not build a coordination bonus into the scoring or claim cluster separation from a hand-picked sample.
- A future research engine should discover diverse routes, retrieve supporting and contradicting evidence, and propose traceable assessment changes. For this hackathon, build a curated set and a replayable, source-backed update demonstrating how a route changes. Do not label replay as a live literature search.
- Build a usable plot, filters, accessible route list, evidence detail, comparison and change history. Show unknowns and implementation gaps, alongside the next evidence question. No autonomous background job is needed for this first version.

The original supply-chain design below documents the supporting prototype. The route explorer is the newly approved primary policy question.

**One line:** pick a group of middle powers and see what share of the AI supply chain they hold together, which of the six safety conditions they could credibly demand, and when each member's laws are open to change.

**Track:** C (Diplomacy), with links to A (Regulation).

## What we build on

| Source | What we take |
|---|---|
| [gszep: Speed limits, not walls](https://gszep.com/en/blog/speed-limits-not-walls/#who-holds-leverage-from-mines-to-models) | **The data backbone.** Supply-chain layers from mines to models, with country shares and chokepoints. The thesis: middle powers hold about 40% of the weighted chain today, but that share falls as progress shifts to software, so they should act while leverage lasts and act *together*. |
| [gszep: Six safety conditions](https://gszep.com/en/blog/six-safety-conditions-for-upcoming-laws/#when-the-decisions-are-made) | **The "demands."** Pre-release testing, a shared incident definition, protected weights, crisis continuity, known chip locations, and a local off-switch. Also the **decision windows**: Singapore's DI Bill, Japan's AI Act review, EU Gigafactory tender (Dec 3), Korea notices (Jan 2027), Australia (early 2027), Geneva Summit (Jun 2027). |
| [mapping-ai.org/map](https://mapping-ai.org/map) | **The interaction model.** A D3 network of about 1,800 people, organisations and resources and about 2,900 sourced relationships. Every claim has a quote, URL and confidence level. Its gap: it is US-centred (SF, DC, NY) and has no middle-power or supply-chain view. That gap is where we fit. |
| [mapping-ai.org/insights#funding](https://mapping-ai.org/insights#funding) | **The dependence lens.** Their funding analysis covers who funds whom (Sankey), "kingmakers", and concentration risk ("if the top funder withdrew…", red if 60% or more comes from one source). We apply the same idea to countries: **who supplies whom, which countries are kingmakers, and how fragile each layer is if one supplier withdraws or coerces.** |

## Views

1. **Stack map:** a heat grid with layers as rows (mining → refining → magnets → power and hosting → grid → chip materials → tools and lithography → fabs and packaging → HBM → chip design → compute → models) and countries as columns. Every cell shows its share, source, confidence and date.
2. **Coalition builder:** select countries (e.g., NL + JP + KR + TW).
   - Shows the bloc's combined share per layer.
   - Shows a weighted leverage score, with a **physical ↔ software mix slider** that reproduces the 40% → under 20% shift from gszep's model.
   - Shows **durability:** how many years a rival needs to replicate each chokepoint.
3. **Credible demands:** the six conditions as cards. Each card is lit by the leverage it needs: hosting for an off-switch or continuity, chips and export licences for chip location, and so on. Each says *credible / partial / not credible* for the selected bloc, with the reasoning shown.
4. **Dependence and fragility:** the funding-insight analogue.
   - A Sankey from supplier country → layer → dependent country.
   - Concentration risk per layer, measured by HHI and the top supplier's share.
   - **"What if X withdraws?"** shows the bloc's exposure to coercion (e.g., China on gallium, the US on compute).
5. **Windows timeline:** when each bloc member's laws are open to change, so you can see *when* the bloc should act.

## Judging fit
- **Safety (50%):**
  - Turns leverage into specific, sourced safety conditions.
  - Every number carries a confidence level.
  - A **"What this does not establish"** panel covers: rough shares, credibility as a heuristic rather than a prediction, and coalition politics left out of the model.
- **Feasibility (40%):** a static site (D3 + JSON) on GitHub Pages, with data from 2 sourced posts and a few public datasets. Anyone can open the link and use it.
- **Clarity (10%):** one question: *"Can this group of countries credibly demand this safety condition, and when?"*

## Build plan (36h)
1. `data/layers.json`: layer × country shares, with source, confidence, date and replicate-years.
2. `data/conditions.json`: the six conditions, the leverage each one needs, and the scoring rules.
3. `data/windows.json`: the legal windows by country and date.
4. Front end: one `index.html` + D3, with five views as tabs. Deployed to GitHub Pages.
5. Write-up (4–8 pages) and a 2-minute video.

## Open questions
- Should the layer weights in the slider match gszep's model exactly? Ask gszep.
- Which countries are in scope? Proposed: JP, KR, TW, NL, DE, UK, FR, CA, AU, SG, IN, UAE, SA, plus the US and CN as reference.
