# Middle Powers: AI Safety Hackathon: brainstorm

Event: https://mangrove.one/hackathon/middle-powers-hackathon
- Online, 36 hours. Kickoff Oct 31, 4:00 AM JST. Submissions close Nov 1, 4:00 PM JST.
- **Register by Oct 30, 3:00 AM JST.** The FAQ says Oct 29, so register early.
- Tracks: A Regulation · B Investment · C Diplomacy
- Judging: Safety impact 50%, which rewards rigour and saying what you did *not* establish. Feasibility 40%. Clarity 10%.
- Deliverable: a 4–8 page write-up or a prototype, plus a short video. You must disclose any AI use.
- Funding: BlueDot rapid grants, about $50 to $10k.

## Landscape (what's happening)
- **Thesis** (from the middlepowers.ai RFP, which has about $10M from Astralis Foundation): middle powers have leverage through chips, capital, data centres, diplomacy and state capacity. They should use it for frontier-model access, transparency and enforceable safety, not to build their own frontier models.
- **Japan:** the AI Promotion Act (May 2025) is soft law with no penalties. The first AI Basic Plan (Dec 2025) is updated every year and adds staff to J-AISI. Japan's approach is called "pluralistic interoperability".
- **Korea:** the Basic AI Act took effect in Jan 2026, the first comprehensive AI law in the region.
- **Singapore:** Model AI Governance Framework, AI Verify testing tools, and the Singapore Consensus.
- **Canada:** its 2026 AI strategy calls for a "coalition of aligned democracies" to pool compute and procurement.
- **The AISI network** was renamed in 2026 and is now about measurement and evaluation. Members: AU, CA, EU, FR, JP, KE, KR, SG, UK, US.
- **Chokepoints:** ASML alone gives little leverage. A pooled position could: NL lithography, JP equipment, KR HBM memory.
- **Open questions in the RFP:**
  - What does hosting a foreign data centre actually give a country?
  - What security standards would let labs serve frontier models from middle-power territory?
  - How can verification work without trusting developer claims?
  - How long will chokepoints last?

## Ideas (law → governance → tech → value)

1. **Procurement as regulation, for Japan** (Track A)
   - Japan's AI law has no penalties, but the government is a big buyer.
   - Draft model contract clauses for government purchases of frontier AI: J-AISI eval access, incident reporting, model-change notice. Map each clause to an existing legal hook (Basic Plan, procurement guidelines).
   - Output: a memo and a clause-pack tool. Tightly scoped, and Japan-native.

2. **Compute-for-access term sheet** (Track B)
   - Japan is attracting hyperscaler data centres. What should it ask for in return?
   - Draft a term sheet that trades hosting for safety terms: eval access, security standards, local incident reporting.
   - Answers an open question in the RFP directly.

3. **Chokepoint coalition calculator** (Track C)
   - Model NL, JP, KR and TW leverage over the stack, and how long each chokepoint lasts.
   - Show which safety demands a pooled bloc could credibly make.
   - Risk: the data is hard to make rigorous in 36 hours.

4. **Comply-once crosswalk** (Track A)
   - Map EU AI Act, Korea Basic AI Act, Japan guidelines and Singapore AI Verify obligations onto each other.
   - Shows where a middle-power standards bloc already agrees and where gaps are.
   - Could be an interactive tool, built on arXiv 2608.19278 (20-jurisdiction mapping).

5. **Neutral verification body hosted by a middle power** (Track C)
   - An IAEA- or VERTIC-style institution in Japan, Singapore or Switzerland to verify US–China AI commitments.
   - Design its mandate, what it checks, and its failure modes.

## Product ideas (global, buildable in 36h)

6. **Leverage Map + Coalition Builder**
   - Interactive dashboard of countries against the AI stack: energy, chips, data centres, talent, capital, market. Each cell has a source and a confidence level.
   - Pick countries to see what share of each chokepoint the group controls, and which safety demands it could credibly make (e.g., NL + JP + KR → model-access conditions on chips).
   - For policymakers and researchers.
   - Build: static data (JSON) + web front end.

7. **Multilingual Safety Eval Hub**
   - Open test kit: small sets of safety tests (refusals, misinformation, local legal harms) in Korean, Hindi, Portuguese, Bahasa, Swahili, Japanese and more. Run them against 2–3 models and show a scorecard.
   - Argument: models are tested mostly in English, so middle powers need their own evals.
   - The most direct safety impact of the set.

8. **Comply-Once Crosswalk**
   - Search tool: enter a safety requirement and see the equivalent in the EU, Korea, Japan, Singapore, Canada, Brazil and UK rules, plus a heatmap of gaps.
   - Shows where a joint middle-power standard is already possible.

9. **Coalition Negotiation Simulator**
   - Large language model (LLM) agents play middle powers, the US, China and the labs.
   - The user proposes a deal (e.g., "compute access for eval access") and sees who signs, who defects, and why.
   - Risk: the simulation's validity is questionable, so the write-up has to state its limits clearly.

10. **Lab Commitment Tracker**
    - Ledger of frontier labs' public safety promises (Seoul, Paris, etc.) against the evidence they kept them, with links to which middle powers they operate in.
    - Lets countries condition market access or purchasing on track record.

11. **Cross-border AI Incident Exchange**
    - Shared incident-report form and database in one standard format (aligned with the OECD AI Incidents Monitor, AIM). Countries can see the same model failing in several places.

## Leaning
1 or 2. Both play to a Japan base, are scoped enough to be rigorous in 36 hours, and fit the "state your limits" judging.
