# Discussion notes

A summary of the brainstorm so far. The full idea list is in [ideas.md](ideas.md).

## Context
- **Hackathon:** Middle Powers: AI Safety Hackathon (Mangrove). Online, 36 hours, Oct 31 – Nov 1 2026 (JST).
- **Judging:** Safety impact 50% · Feasibility 40% · Clarity 10%.
- **What sparked it:** an earlier law → governance → tech → value conversation.

## Organizer notice: team page and deadlines

Source: organizer message pasted by Grisha on 31 October 2026. The year below follows this hackathon's context; the notice does not specify a timezone. Do not assume these clock times are JST from the context line above.

- **Start:** 31 October 2026, 04:00.
- **Submission deadline:** 1 November 2026, 16:00.
- **Peer-review deadline:** 5 November 2026, 10:00.
- **Team page:** https://try.mangrove.one/projects/a4eeba8d-acba-4336-a6f1-a55420644abb — the notice says it holds the Drive folder, submission portal and scheduler, with a help button for organizer support.
- **Access check, 31 October 2026:** unauthenticated retrieval redirects to sign-in; page contents and deadline timezone have not been independently verified.
- The notice's relative “starts in 21 hours” countdown is historical, not a current countdown. Confirm the timezone in the authenticated scheduler before using the clock times operationally.
- **Kickoff follow-up:** Grisha shared an organizer message saying the hackathon “has begun” and kickoff emails would arrive shortly, received at **04:49 JST** (31 October 2026 inferred from the conversation). This records the message receipt time, not the exact event start. It does not establish the timezone of the earlier submission or peer-review deadlines.

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
