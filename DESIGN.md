# Leverage Map + Coalition Builder: design

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
