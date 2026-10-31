# Discussion notes

## Next research pass: selected and tested by Geneva

Grisha clarified the objective: by the Geneva 2027 AI summit, identify which safeguard routes have been selected and, where feasible, obtain evidence that they work. Continue sampling scenarios against real late-2026 and 2027 decision windows and the current political/economic context. Role-based analysis is a stress test, not testimony or institutional consent. Separate adoption, implementation, changed behaviour and risk reduction.

Grisha also requested more quantitative axes: continuous measures from 0 to 1 grounded in actual numbers rather than LLM-assigned 1–5 categories. This pass will investigate operational definitions, denominators, empirical inputs, uncertainty, comparability and validation. No division of the existing scores by five will be presented as measurement. Existing plot ratings remain unchanged until a defensible replacement is demonstrated. Research outputs will be collected under `research_notes/Safeguard validation by Geneva/`.

## Approved: routes to safeguards explorer

Executive-first design WIP: Grisha asked for an at-a-glance map and a one-mobile-page route overview, with research behind text links. Implemented short editorial briefs, linked full research pages, optional filters/comparisons, a highlighted upper-right direction and mobile selection scrolling. All eight route investigations have now arrived; their unreviewed data remains local pending integration, including correction of categorical absence claims in the procurement draft.

Integrated the eight-route snapshot after reviewing each card: qualified unsupported absence claims, assumed procurement remedies, legislative sufficiency and open decision windows; lowered Japan procurement evidence confidence to Medium. Original investigation notes retain visible integration qualifications. Dotted rings identify non-dominated visible ratings, not recommended policies. Full evidence pages retain source-level provenance, including reduced-quality SEC extraction. Current source gaps: procurement terms and recognition authority; deployment-gate authority; Cohere investment instrument; Taiwanese compute programme; Anthropic lender allocations and new-credit timing. Next discriminating step: retrieve the actual Gen-nai tender terms to test whether vendor safety evidence is already required and what can lawfully change.

Delivery checked: `7c31352` is deployed at https://tubaali.github.io/middle-powers-hackathon/routes/ and linked from the landing page. All six model tests pass. Browser acceptance passed against the actual public site: eight points, linked source records, intersecting filters and empty state, list view, comparison arrow, reversible replay, shared-URL reload, keyboard selection, no page errors and no mobile horizontal overflow. All eight summary cards fit within 760 CSS pixels at a 390×844 viewport; a captured lender summary measured 535 pixels. Desktop and mobile screenshots were inspected locally. Full research remains behind links; the public dataset is a dated editorial snapshot, not a live discovery engine.

On 31 October, Grisha approved the route-level plot described in [DESIGN.md](DESIGN.md#approved-direction-routes-to-safeguards-31-october-2026), and asked us to build it. Compare potential safety impact against implementation feasibility; colour by national, middle-power coordination or broader-coalition requirements. Keep evidence confidence independent. Pair national/coordinated proposals to test the coordination hypothesis rather than assume it. EuroHPC is one worked route among a diverse set. The first build will demonstrate source-backed evidence updates; continuous literature discovery is a later capability, not a claim about the static demo.

Implementation WIP is pushed in `d086b56` and `7654291`: standalone explorer under `routes/`, ordinal plot, filters, evidence detail, paired comparison, shareable state and source-review replay. `scripts/build-route-data.py` assembles the runtime snapshot. Model tests pass; the single-card local layout/replay preview was exercised, and a mobile overflow fix was added. Three independent investigations own procurement, evaluation and finance/compute input cards. The complete snapshot, integrated browser checks and live-site delivery are pending; the explorer is not yet linked from the landing page. Grisha reiterated that these intermediate steps should keep being committed and pushed.

A summary of the brainstorm so far. The full idea list is in [ideas.md](ideas.md).

## Context
- **Hackathon:** Middle Powers: AI Safety Hackathon (Mangrove). Online, 36 hours, Oct 31 – Nov 1 2026 (JST).
- **Judging:** Safety impact 50% · Feasibility 40% · Clarity 10%.
- **What sparked it:** an earlier law → governance → tech → value conversation.

## Organizer notice: team page and deadlines

Source: organizer message pasted by Grisha on 31 October 2026, subsequently checked against the [official event page](https://mangrove.one/hackathon/middle-powers-hackathon). Its timeline explicitly displays Tokyo time. The organizer's team email also explicitly uses GMT+9. **JST is confirmed, superseding the earlier timezone uncertainty.**

- **Start:** 31 October 2026, 04:00 JST.
- **Submission deadline:** 1 November 2026, 16:00 JST.
- **Peer-review deadline:** 5 November 2026, 10:00 JST.
- **Team page:** https://try.mangrove.one/projects/a4eeba8d-acba-4336-a6f1-a55420644abb — the notice says it holds the Drive folder, submission portal and scheduler, with a help button for organizer support.
- **Access check, 31 October 2026:** the signed-in hackathon criteria page was read after Grisha provided browser access; the public event page and its FAQ were also read.
- The notice's relative “starts in 21 hours” countdown is historical, not a current countdown.
- **Kickoff follow-up:** Grisha shared an organizer message saying the hackathon “has begun” and kickoff emails would arrive shortly, received at **04:49 JST** (31 October 2026 inferred from the conversation). This records the message receipt time, not the exact event start. It does not establish the timezone of the earlier submission or peer-review deadlines.

## Official judging criteria and submission requirements — checked 31 October

Sources: [signed-in hackathon page](https://try.mangrove.one/hackathons/92b5e028-1fd7-4870-8a78-cdab39f4c418), Judging section; [public event page](https://mangrove.one/hackathon/middle-powers-hackathon), Judging and FAQ. The rubric matches across both pages. The implications below are our interpretation, not additional organizer requirements.

| Official criterion | Weight | Meaning | Implication for our project |
|---|---:|---|---|
| Safety Impact | 50% | Reduction of a real advanced-AI risk, including its magnitude | Show a specific risk, the intervention, and the causal route to reducing it. A supply share or scenario score alone is not demonstrated safety impact. Be explicit about unmeasured effects. |
| Feasibility | 40% | Whether it could be built or adopted, considering cost, effort and necessary agreement | Identify the decision-maker, instrument, timing, implementation effort and parties whose consent is needed. Separate draft rights and proposed demands from enforceable obligations. |
| Clarity | 10% | Whether someone outside the team can follow the work and its rationale | Give a short, intelligible worked example and make assumptions and evidence inspectable. |

**Official FAQ guidance:**
- For this event, any country other than the US and China can count as a middle power.
- Submit what a reviewer needs to experience the project, **plus a short video showing how it works**. A rough prototype is acceptable; whether the idea works matters more than polish.
- A written submission might be **4–8 pages**, covering context, approach, preliminary findings and next steps. This is indicative guidance, not a universal page limit or a requirement to add a report to every prototype.
- **Disclose AI-tool use.** The FAQ explicitly allows it and asks for disclosure to support informed feedback.
- Tracks are Regulation (A), Investment (B) and Diplomacy (C). Our coalition focus fits C, with finance and procurement links to B and A.

**Application to the current build:** lead with one evidence-backed decision and its limits. EuroHPC's draft incident-notification/remedy path is a useful worked example, but does not establish a frontier-model release veto. If the proposed game format is adopted, its debrief should expose the assumed causal effect, required consent and evidence gaps; winning a simulated mission is not measured real-world safety impact. The short video and AI-use disclosure need to be part of submission preparation.

## Idea 1: Procurement as regulation (Japan)
- **Not a new law.** It proposes a new *practice*: government uses its buying power to put safety conditions into AI contracts. The legal basis is the 2025 AI Promotion Act and the AI Basic Plan.
- **Output:** a 4–8 page memo and a web tool.
  - A government buyer answers a few questions: ministry, use case, risk.
  - The tool returns contract clauses: eval access, incident reporting, notice of model changes. Each clause is mapped to its legal basis.
- **Users:** government procurement officers, not private businesses. One big coordinated buyer can move AI companies in a way soft law can't.

## Idea 2: Compute-for-access deal
- **Output:** mainly a negotiation document, a sample term sheet for when hyperscalers build data centres in a middle power.
  - **The country gives:** land, power, permits, subsidies.
  - **The country asks for:** early eval access for its safety institute, security standards, incident reporting, guaranteed model access in a crisis.
- **Optional:** a web page for adjusting the trade-offs.
- More a policy piece than a product.

## Decision
- **We want a product people can use and demo**, not just policy, aimed at middle powers worldwide rather than only Japan.
- **Product ideas:** 6–11 in ideas.md.
- **Shortlist:**
  - **Leverage Map + Coalition Builder:** the strongest fit with the "middle powers" theme.
  - **Multilingual Safety Eval Hub:** the most direct safety impact.

## Working agreement
- Everything we discuss from here on is committed and pushed to `main` in real time.
- Collaborators: gszep and Drukboy.

## Oct 31: chosen: Leverage Map + Coalition Builder
- The design is in [DESIGN.md](DESIGN.md).
- **Inputs:**
  - gszep's "Speed limits, not walls": supply-chain leverage from mines to models.
  - gszep's "Six safety conditions": the demands and the legal windows.
  - mapping-ai.org/map: the D3 network, with a sourced claim and confidence for every link.
  - mapping-ai.org/insights#funding: the concentration and "kingmaker" lens, applied to countries' supply dependence.
- **Key gap we fill:** mapping-ai.org is US-centred and has no middle-power or supply-chain view.

## Oct 31: prototype v0 (stack map + coalition builder)
- **What's built:**
  - `index.html` + `app.js` + `style.css`, reading `data/layers.json`, `data/conditions.json` and `data/windows.json`.
  - To run it: `python3 -m http.server` in this folder.
- **Data:**
  - Shares and stage weights are copied from gszep's published model. Our numbers match the post: middle powers about 39% at a 40% mix, 19% at the software end.
  - Confidence levels, years-to-replace and the condition scoring are our additions, and are marked as such.
- **Applied from the finance handoff:**
  - Two EuroHPC deadlines: Lot 2 on 3 Dec 2026, Lot 1 on 4 Feb 2027.
  - Condition labels now read "strong / some / weak supply-chain basis", a scenario rather than enforceable power.
- **Not yet:**
  - The dependence/"what if X withdraws" view and the timeline view.
  - The finance-rights layer.
  - A public link: the repo is private.

## Oct 31: dependence view added
- **New "Dependence" tab:** pick a supplier (e.g., China or the US) to see:
  - its share of each stage, i.e. what's at risk if it withdraws or coerces;
  - how much the bloc already makes itself;
  - years to replace;
  - "who needs whom more": China could withhold 18% of the weighted chain, while the chip trio (NL+JP+KR) could withhold 26%.
- **Concentration table:** HHI per stage. Stages are marked fragile when the top supplier holds more than 60%: AI chip design (US), HBM (Korea), leading-edge chips (Taiwan), installed compute (US) and mineral refining (China).
- **Honest limits:**
  - World shares only, with no bilateral trade flows, so this shows exposure, not loss.
  - HHI is a lower bound, because "Others" is treated as many small suppliers.

## Oct 31: timeline view added
- **New "Timeline" tab:**
  - When each jurisdiction's laws are open to change (Oct 2026 – Jul 2027), with your bloc's lanes highlighted.
  - Rough dates (Japan, Australia) are drawn as hollow markers. You can filter by condition.
- **Matrix:** each condition × jurisdiction, with the bloc's first chance to act.
  - For the chip trio (NL+JP+KR): Japan's review (31 Oct, rough) for conditions 1–3, and EuroHPC Lot 2 (3 Dec) for conditions 4–6.
- **Caveat:** dates are openings, not delivery plans. Only the EuroHPC dates are independently checked. Singapore sits under "Others" in the supply data, so it can't be picked as a bloc member yet.

## Oct 31: repo public, live site
- **The repo is now public.** The site is live on GitHub Pages from `main` at https://tubaali.github.io/middle-powers-hackathon/
- **Before going public:** we scanned the full history. No tokens or keys were found. The only semi-private item is the Mangrove team-page link above, which needs a login to open.
- **Every push to `main` now updates the live site.**

## Oct 31: idea for the team: game format (ideation only, not built)
- **Tuba's proposal:** turn the Leverage Map into a short mission game, so officials and private players (banks, investors, cloud operators) understand coalition leverage by playing.
- **Draft game: "Coalition"**
  - **Role:** you negotiate for one middle power. Each mission has a deadline taken from the Timeline, e.g. "Secure pre-release testing before Japan's review closes".
  - **Recruit allies:** each country brings leverage cards from the Stack map, but also has a cost or fear, e.g. Korea's exposure to China (from the Dependence view).
  - **Play levers:** hosting, chokepoint, or **finance cards from Grisha's research** (EuroHPC tender clauses, credit-syndicate amendments, the Canada–Cohere stages). Each card shows its status: documented, announced, or research lead.
  - **Events:** US pressure on allies, China restricting gallium exports, substitution clocks counting down (years to replace).
  - **Debrief:** after each mission, what worked, why, and "what this doesn't prove", which fits the judging criteria.
  - **Private-player mode:** play as a lender or investor and see which conditions your contract can actually attach.
- **Risk:** a game can oversimplify and hurt our rigour score. Mitigation: every card sourced, and an honest debrief.
- **Scope if we build it:** 3 missions on top of the existing views. That fits before the Nov 1 16:00 deadline.
- **Open to the team:** keep or cut? Which finance cards are solid enough to use?

## Oct 31: Tuba is trying a game format on branch `orbit-accord`
- **Heads-up to the team:** Tuba is prototyping a game version on a separate branch, [`orbit-accord`](https://github.com/TubaAli/middle-powers-hackathon/tree/orbit-accord). `main` and the live site are unchanged.
- **Concept: "Orbit Accord"**
  - Countries are planets in a solar system, each ruled by a sovereign who stands for its government or policymakers.
  - You pick a planet and see its AI powers (chips, data centres, etc.) and how much of the world's AI depends on it (%).
  - You choose a goal from a preset list of common government AI goals, mostly the six safety conditions.
  - You negotiate with other planets to build a coalition. Middle powers accept more easily than the two superpowers.
  - You can sweeten deals with non-AI powers (food, medicine, energy, minerals, capital).
  - **Score:** how much of the goal you achieve, plus the leverage your coalition holds.
- **Built from:** the `main` data (`data/*.json`: supply-chain shares, the six conditions, law windows). It follows the limits on the "Sources & limits" page and the judging notes above.
  - The debrief will show the assumed causal effect, whose consent is needed, and the evidence gaps.
  - Winning a mission is not real-world safety impact.
- **Feedback welcome:** which finance cards from Grisha's research are solid enough to use as negotiation chips?
- **Update: the first playable version is on `orbit-accord`** (commit d084b8c). How to play: [game/README.md on the branch](https://github.com/TubaAli/middle-powers-hackathon/blob/orbit-accord/game/README.md).
  - Run `python3 -m http.server` from the repo root and open `/game/` on the branch.
  - Played end to end in headless Chrome with no errors. Game balance is unverified.
  - **Team input wanted:**
    - Should a game mode go into the submission?
    - Which finance research items could become negotiation cards? Only records marked "documented", per the finance handoff.
- **Update: game v2 on `orbit-accord`.** It's now real-time and fits one laptop screen.
  - You fly your planet with the arrow keys and press Space near another planet to negotiate.
  - Each month opens a council with 3–4 moves built from our data: table a bill when your law window is open, license your chokepoint, stockpile your biggest dependency, build data centres, summit tour.
  - Details: [game/README.md](https://github.com/TubaAli/middle-powers-hackathon/blob/orbit-accord/game/README.md).

## Oct 31: teammate idea: "Routes to AI Safeguards" (Tuba's plain-words summary)
- **What it is:** a chart of possible safety moves for middle-power governments.
  - **Easy ↔ hard** to do.
  - **Small ↔ big** safety effect.
  - **Colour:** one country alone, a group of middle powers, or one that needs the big powers too.
- **Click a move to see:** who acts → with what tool → which safeguard → how it's checked → what happens if it's broken.
- **Key test:** is acting *together* actually better than acting alone?
- **First examples:** EU computing tenders, Asia-Pacific buying and testing, Canada's investment terms, Taiwan's computing access, and conditions on new loans. These are mostly ideas, not proven powers yet.
- **Tuba's read of the teammates' Routes page** (`/routes/`, 8 routes):
  - The chart scores each route 1–5 on "how doable" and "how much safer". Colour shows who must agree. Confidence shows how solid the sources are.
  - The EuroHPC route: when the EU rents out its new AI supercomputers, it uses the contract's existing "report security breaches" rule. It would add a clear plan: what counts as an AI incident, what evidence to keep, who reviews it, and termination as the last resort.
  - The rule is in the draft contract, which is why confidence is high. It's unclear whether it covers incidents *caused by the AI model* rather than hacks.
  - Deadlines: 3 Dec 2026 (Lot 2) and 4 Feb 2027 (Lot 1).
