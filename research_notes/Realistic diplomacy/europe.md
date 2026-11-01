# European actors in Game B: Netherlands, Germany, United Kingdom (+ EU competence)

Owner: Europe researcher (subagent of the Realistic diplomacy pass). Own files: `europe.md`,
`europe.json`. Not committed; the task owner integrates, checks and publishes.

- Research cutoff: **1 November 2026**. All web retrievals below were observed **1 November 2026**.
- Game baseline: `198d3ac` on `main` (verified: only `BRIEF.md` differs between baseline and current `HEAD`).
- Game B = Orbit Accord at `game/orbit.html` (engine: `game/game.js`, `game/meeting.js`, data in
  `game/planets.json`, `data/layers.json`, `data/conditions.json`, `data/windows.json`).
- Label key: **[O]** = observed fact (source cited), **[I]** = interpretation,
  **[D]** = design inference / proposed fiction, **[U]** = unknown / gap.
- All candidate game modifiers are invented game numbers, not measured acceptance probabilities.

Method note: no provider-native web search is enabled for this subagent and nested agents are
forbidden by the brief, so retrieval used direct `webfetch` of known official domains. When a
guessed URL 404'd, the official URL was located via a plain DuckDuckGo HTML listing and the
*official page itself* was then fetched and is what is cited below; the search listing is never
used as evidence. This mirrors the access note in `research_notes/Finance decision rights
followup/eurohpc-tender.md`.

---

## 1. How Game B models these actors today (baseline read)

- `game/planets.json` gives each actor a fixed flavor and non-AI "powers" (0–3, illustrative):
  - **NL** (lines 152–177): "Home of the only maker of EUV lithography machines"; title
    "Minister of Foreign Trade"; powers food 3, medicine 2, energy 1, minerals 0, capital 2,
    market 1 → `needs()` in `game/game.js` line 75 computes needs = **energy, minerals, market**.
  - **DE** (lines 179–205): "Builds the precision optics and industrial machines behind chip fabs";
    title "Federal Minister for Digital Affairs"; needs = **food, energy, minerals**.
  - **UK** (lines 207–233): "Strong AI research labs and chip design (Arm)"; title "Secretary of
    State for Science"; needs = **food, energy, minerals**.
- `data/layers.json` shares relevant to these rules: **tools** NL 25% / DE 3% (lines 239–267),
  **mat** DE 5%, **power** DE 3% / UK 2% / NL 1% (lines 157–184), **compute** DE 1% / UK 1%
  (lines 341–366), **model** UK 1%. So only NL ever passes the `councilMoves()` ≥25% test for
  the "License your chokepoint" move (`game/game.js` lines 122–128); DE and UK have no choke move.
- `data/windows.json` maps **EU windows to DE and NL only** (lines 44–97: EuroHPC Lot 2
  2026-12-03, Lot 1 2027-02-04, Product Liability 2026-12-09, "AI Act testing powers" with
  `date: null`). **UK has no window at all** in the baseline. The EuroHPC dates were already
  corrected by the team's finance research (`reports/Finance layer handoff.md`).
- `game/game.js` `odds()` (lines 84–96) treats all middle powers identically: base 40, +15 for a
  token they need, +15 promise, +half your weighted share, +10 if their window covers the goal,
  +10 summit tour, +5 rally; the only actor modifiers are US (−10 on conditions 1/5/6) and
  CN (−15 on condition ≠2). Nothing in the engine yet records *why* NL/DE/UK said yes or no,
  except `g.asked` (one ask per target per month).
- `game/game.js` `monthEvents()` (lines 157–178): in month 2 China squeezes refined metals; in
  month 4 the US can pull your weakest middle-power ally out of the accord. There is no
  Europe-specific event.

**[I]** The integration test ("can a player understand what the other government wants, why its
answer changed, what their offer commits, and what still needs approval?") currently fails most
for these three: NL's licensing power is treated as a plain share boost, DE/UK never have
actor-specific reasons, and UK has no legal vehicle at all in the data.

---

## 2. Source ledger (retrieved 1 November 2026)

Core sources, all read in full unless marked. Publication and event dates recorded separately.

| # | Source (publisher, publication date) | URL | Status | Used for |
|---|---|---|---|---|
| S1 | Rijksoverheid news, **6 Sep 2024**: "Nederland breidt exportcontrolemaatregel uit…" | rijksoverheid.nl/actueel/nieuws/2024/09/06/nederland-uitbreiding-exportcontrolemaatregel-geavanceerde-productieapparatuur-halfgeleiders | Read (Dutch) | NL national export-licence expansion for advanced chipmaking equipment (DUV lithography), effective 7 Sep 2024; per-application cabinet decisions; "not an export ban"; security rationale |
| S2 | Rijksoverheid news, **15 Jan 2025**: "Klever: aanscherping exportcontrole…" | rijksoverheid.nl/actueel/nieuws/2025/01/15/klever-aanscherping-exportcontrole-op-geavanceerde-productieapparatuur-voor-halfgeleiders | Read (Dutch) | 2nd adjustment (effective 1 Apr 2025) adding measurement/inspection equipment; "control over who gets which technology" |
| S3 | Government.nl news, **28 Mar 2024**: "The Netherlands to invest €2.5 billion… Brainport Eindhoven" ("Project Beethoven") | government.nl/latest/news/2024/03/28/the-netherlands-to-invest--euro-2.5-billion-to-strengthen-business-climate-for-chip-industry-in-brainport-eindhoven | Read (English) | €2.51bn package to keep/grow the chip industry (ASML expected to keep HQ, operations and tax residence in NL); talent, housing, infrastructure, grid study; National Growth Fund |
| S4 | Rijksoverheid news, **20 Apr 2026**: "Kabinet zet stap met toezicht op Europese AI-regels" | rijksoverheid.nl/actueel/nieuws/2026/04/20/kabinet-zet-stap-met-toezicht-op-europese-ai-regels | Read (Dutch) | NL AI Act implementation act (*Uitvoeringswet AI-verordening*) opened for internet consultation until 1 Jun 2026; AP as default supervisor + special "AI-bestuurder"; AP + RDI coordinating; State Secretary Aerdts (Digital Economy and Sovereignty, EZK) |
| S5 | Bundesregierung article: "Innovationen durch KI fördern" (KI-MIG in force) | bundesregierung.de/breg-de/aktuelles/umsetzung-ki-verordnung-2406638 | Read (German); page body undated, image asset dated 11 Feb 2026 | German AI Act implementation law in force; Bundesnetzagentur as lead market-surveillance authority + coordination/competence centre; at least one KI-Reallabor (sandbox); "innovation-friendly, low-bureaucracy" |
| S6 | BMWK press release, **13 Dec 2024**: "Startschuss für die hochmoderne Chipfabrik 'ESMC' in Dresden" | bundeswirtschaftsministerium.de/Redaktion/DE/Pressemitteilungen/2024/12/20241213-startschuss-fuer-die-chipfabrik-esmc-in-dresden.html | Read (German); page retrieved from the ministry site now branded "Bundesministerium für Wirtschaft und Energie" | Up to €5bn federal subsidy for the TSMC/Bosch/Infineon/NXP ESMC fab (>€10bn investment); EC state-aid approval 20 Aug 2024; first German project under the European Chips Act; **"In Krisensituationen wird ESMC… Aufträge aus der EU und Deutschland zu priorisieren"** (crisis prioritisation of EU/German orders); 12–28nm, ~500k wafers/yr; SME/start-up preferred access |
| S7 | European Commission, digital-strategy news, **27 Jul 2026** (page updated 31 Jul 2026): "AI Omnibus enters into force" | digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force | Read (English) | Digital Omnibus on AI in force 27 Jul 2026 (proposed 19 Nov 2025): Annex III high-risk obligations now apply **2 Dec 2027**; embedded high-risk **2 Aug 2028**; extended AI Office oversight of GPAI models in large platforms/search; EU-level sandbox |
| S8 | GOV.UK: **AI Opportunities Action Plan** (13 Jan 2025) + **government response** (13 Jan 2025) | gov.uk/government/publications/ai-opportunities-action-plan ; …/ai-opportunities-action-plan-government-response | Read (English) | UK growth-first strategy: sovereign compute ≥20× by 2030, first AI Growth Zone at Culham, AI Energy Council, National Data Library, sovereign-AI "national champions" function; **AISI to be made a statutory body**; consultation on legislation for "critical risks" of the most powerful models; copyright/TDM reform consultation |
| S9 | GOV.UK: AI Security Institute organisation page | gov.uk/government/organisations/ai-security-institute | Read (English) | AISI renamed (from AI Safety Institute), now part of the **Cabinet Office**; lists dated items incl. UK–Australia pact (25 May 2026), "Secure AI infrastructure: call for information" (29 Jan 2026), Frontier AI Trends factsheet (18 Dec 2025) |
| S10 | GOV.UK press release, **12 Oct 2026**: "Britain steps up national defences against growing AI risks" | gov.uk/government/news/britain-steps-up-national-defences-against-growing-ai-risks | Read (English) | UK security suite: AI incident and near-miss reporting to be considered **through the Cyber Security and Resilience Bill regime**; preparing for serious incidents involving autonomous AI agents; AISI evaluations of latest models with developers and the US Government; "We will legislate wherever necessary"; AI verification support "in the coming months"; UK G20 presidency (next year) to put AI at its heart |
| S11 | GOV.UK press release, **25 May 2026**: "UK and Australia pact on fast-moving AI security risks" | gov.uk/government/news/uk-and-australia-pact-on-fast-moving-ai-security-risks | Read (English) | UK AISI–Australian AI Safety Institute MoU: share capability info, joint evaluation best practice, research, staff exchanges; mentions the International Network for Advanced AI Measurement, Evaluation and Science |
| S12 | GOV.UK press release, **20 May 2024**: "New independent Institute to steer UK semiconductor innovation…" | gov.uk/government/news/new-independent-institute-to-steer-uk-semiconductor-innovation-and-support-semiconductor-strategy | Read (English) | UK Semiconductor Institute; £1bn National Semiconductor Strategy; UK focus = **compound chips, design, R&D** (not leading-edge fabs); ChipStart incubator; UK access to Horizon Europe's €1.3bn Chips Joint Undertaking; UK Infrastructure Bank £60m into Pragmatic |
| S13 | GOV.UK consultation page: "Copyright and Artificial Intelligence" (published 17 Dec 2024; **last updated 19 Mar 2026**) | gov.uk/government/consultations/copyright-and-artificial-intelligence | Read (English) | Consultation ran 17 Dec 2024 – 25 Feb 2025 (transparency, control, remuneration objectives); a report and impact assessment has been published (linked, not read here); page still shows "We are analysing your feedback" |

Repo-internal evidence reused (not re-retrieved): `research_notes/Finance decision rights
followup/eurohpc-tender.md` (EuroHPC AI Gigafactory joint procurement EUROHPC/2026/OP/0008,
observed 31 Oct 2026: Lot 2 deadline 3 Dec 2026 incl. places of performance in **Germany**;
Germany among the 18 JPA signatory states; **UK and Canada are EuroHPC Participating States but
not JPA signatories**; the tender pack itself is unreadable without a JS-capable browser).

### Located but not read (access or budget, kept honest)
- **L1** `wetten.overheid.nl/BWBR0048439` — the Dutch "Regeling geavanceerde productieapparatuur
  voor halfgeleiders" itself (current to 25 Nov 2025 per listing), and the **20 Nov 2025**
  Staatscourant amendment replacing its annex (`officielebekendmakingen.nl/stcrt-2025-38653.pdf`).
  Located via search listing; the two ministerial news items (S1, S2) were read instead. **[U]**
  Whether further tightening happened between Apr 2025 and the cutoff beyond that annex change.
- **L2** `bmds.bund.de` KI-MIG legislative page and Bundestag record (draft "KI-Marktüberwachungs-
  und Innovationsförderungs-Gesetz", BT-Drs. 21/4594; Bundestag plenary coverage calendar week 12
  of 2026). Located via search listing; S5 read instead. **[U]** Exact adoption/promulgation dates.
- **L3** ASML corporate statements on the 2024/2025 measures and their alignment with US rules.
  Not retrieved (corporate secondary to the licensing power itself). **[U]**
- **L4** German federal AI-infrastructure/compute spending (e.g. the July 2025 "Hightech Agenda"
  cabinet item referenced from S5's related links). Located only as an undated related link; not
  read. **[U]** No verified German compute-budget instrument is cited in this file.
- **L5** UK "Report and impact assessment on copyright and artificial intelligence" (published
  ~March 2026, linked from S13). Not read; secondary summaries describe it as maintaining the
  status quo rather than legislating a TDM exception, which remains **unverified** here. **[U]**
- **L6** UK Compute Strategy (promised Spring 2025 in S8) and any 2025 Spending Review compute
  figures. Not located in this pass. **[U]**
- **L7** EuroHPC tender pack (specifications, draft Framework Contract) — per the repo record,
  JavaScript-only portal, unread in that pass too. **[U]**

---

## 3. Netherlands

### What The Hague wants **[O]**
- **Security through controlled technology transfer.** The export-licence regime exists "voor
  onze veiligheid" (for our security), because uncontrolled export of advanced production
  equipment has consequences for Dutch security interests, given the equipment's role in
  advanced chips for military applications (S1, S2).
- **A live, undisturbed chip industry at home.** Project Beethoven invests €2.51bn in talent,
  housing, roads and grid around Eindhoven so "the Netherlands' position as an attractive
  business environment for the semiconductor industry" holds; the government explicitly
  *expects* these measures to keep ASML investing and basing operations and tax residence in
  the Netherlands (S3). The same ministerial statements stress working "zorgvuldig en gericht"
  (carefully and narrowly) "om de wereldwijde handelsstromen en waardeketens zo min mogelijk te
  verstoren" — to minimise disruption of global trade flows and value chains (S1; S2 similar).
- **Trusted AI, supervised nationally but by EU rules.** The AI Act implementation act is framed
  as "clear rules while keeping room for innovation and entrepreneurship" (S4).

### Who can actually agree, with which instrument **[O]**
- **Minister for Foreign Trade and Development Assistance** issues and expands the national
  licence requirement for advanced semiconductor production equipment (S1, S2 — Klever's role;
  the game's NL title, "Minister of Foreign Trade", matches this well). The instrument is a
  *licence*, decided **per application by the cabinet**: "Het kabinet bepaalt per aanvraag of de
  vergunning wordt toegekend" (S1, S2). It applies to exports **outside the EU** and "Er is dus
  geen sprake van een exportverbod" — it is not a ban (S1, S2).
- **Ministry of Economic Affairs and Climate Policy** (State Secretary for Digital Economy and
  Sovereignty) runs the AI Act implementation act; the **Autoriteit Persoonsgegevens (Dutch
  DPA)** is proposed as the default supervisor with a special AI-bestuurder, with the **RDI**
  (digital-infrastructure inspectorate) coordinating alongside sectoral regulators (S4). Note
  the timing: consultation open to 1 June 2026, so Dutch AI Act supervision was still being
  legislated inside the game's first months. **[O]**
- **Parliament** must approve the tax incentives announced in Project Beethoven (S3) and any
  implementation act; **[I]** money-like offers in-game (capital, market access, energy) map to
  executive instruments, but new legal conditions map to a parliamentary step.

### Government power ≠ corporate asset **[O]→[I]**
- The 25% "tools" share in `data/layers.json` is **ASML's** (plus peers), a listed private
  company. What the state holds is a *licence requirement over exports* plus *subsidy money*
  (Beethoven) — not ownership, capacity allocation, or R&D direction. **[I]** Game B's "License
  your chokepoint" move is therefore realistic *for NL specifically and only as a licensing
  act*: the crown can condition export licences; it cannot promise machines, order books or
  corporate know-how. ASML's own behaviour (lobbying, expansion decisions) is a separate actor
  the game currently leaves implicit.

### Candidate rules (all **[D]**; numbers are invented game knobs, not probabilities)

**R-NL-1 — "Licence, case by case."**
- Actor/objective: NL joins a chip-location (cond 5) or testing-as-licence-condition (cond 1)
  accord only through its export-licence instrument, never as a supply guarantee.
- Authority/instrument: national licence requirement (S1, S2); cabinet decides per application.
- Trigger: player asks NL to join an accord using the tools stage.
- Conditions: activated at **full strength only if US or JP is already in the coalition** (the
  real measures were taken alongside allied control efforts — **[I]** from S1/S2's
  geopolitical framing), else at half strength with the letter citing "we move together with
  partners, or not at all".
- Time cost: one extra council month ("Coordinate licences") instead of instant.
- Plausible response: joins with "licence conditions only" caveat; refuses any promise phrased
  as supply/shipment guarantees.
- Substitute: a weaker "notification-only" clause (counts ½ for cond 5, nothing for cond 1).
- Evidence limit: the public record shows incremental, unilateral Dutch measures with allied
  alignment as context; **no public decision rule** says NL conditions future licences on a
  coalition. This is fiction constrained by observed behaviour, not prediction.

**R-NL-2 — "Keep the company, don't command it."**
- Actor/objective: NL will not pledge ASML's corporate capacity; it can pledge licences and
  money (Beethoven-style industrial policy).
- Authority/instrument: export licences (S1, S2) plus public investment and tax measures, the
  latter subject to parliamentary approval (S3).
- Trigger: player uses a "promise <stage>" offer (game's `promiseStage`, `game/game.js` lines
  80–83) targeting NL, or asks NL for tool-supply priority.
- Conditions/letter text: the letter always says the commitment is "a licence condition, not
  a factory order"; offers of **energy, minerals or market access** (NL's `needs()`) count as
  full-value tokens because they answer documented NL constraints (grid/housing/talent limits,
  S3; energy need per `planets.json`).
- Time cost: none (a standard negotiation month).
- Plausible response: NL counters with a subsidy/partnership offer (its `capital: 2` token)
  rather than a chokepoint commitment.
- Substitute: co-investment in Brainport-style expansion (adds NL `power` share, mirroring
  Beethoven's housing/grid logic).
- Evidence limit: Beethoven is regional infrastructure investment, not a control instrument;
  no evidence exists that ASML accepts state-directed commercial conditions.

**R-NL-3 — "Don't go first."**
- Actor/objective: NL avoids being the first mover on broader new conditions, because its
  stated method is narrow, targeted, minimal-disruption measures (S1, S2).
- Authority/instrument: the same licence regime (S1, S2); the rule concerns *timing and
  coalition shape*, not a new power.
- Trigger: player asks NL to join before any other tool-state or superpower is in the accord.
- Conditions: −10 to NL's odds in this situation; +10 once US or JP has joined; +5 extra if the
  player has already licensed their *own* chokepoint or tabled their own bill this campaign
  (shared-cost signal).
- Time cost: at most one month (ask again after coordination exists).
- Plausible response: "not first" hold letter; door open next month (reuses the existing
  asked-once-per-month rule).
- Substitute: NL proposes a joint announcement at the Geneva summit instead (goal progress
  delayed, not lost).
- Evidence limit: inferred from official language ("carefully and targeted"); there is no
  documented Dutch refusal-to-go-first policy.

### Past-action memory for NL **[D]**
- **Coordinated?** (US/JP in coalition before the ask) and **cost-shared?** (player used a
  costly move first) as two visible flags on the NL dossier; NL's letter explains the verdict by
  these flags. Repeated unilateral escalation attempts (asking NL first three months running)
  shift NL to a standing "consulting with allies" state instead of a hard no.

---

## 4. Germany

### What Berlin wants **[O]**
- **An innovation-friendly, low-bureaucracy implementation of the EU AI Act.** The national law
  exists "damit der Standort Deutschland die Chancen Künstlicher Intelligenz voll ausschöpfen
  kann" (so Germany can fully exploit AI's opportunities) and ensures "innovationsfreundlich und
  bürokratiearm" implementation; the Bundesnetzagentur becomes the lead market-surveillance
  authority with a central competence centre, plus at least one KI-Reallabor sandbox (S5).
- **Chip supply resilience paid with subsidies, under EU rules.** Germany pays "bis zu 5 Mrd.
  Euro" toward the >€10bn ESMC fab, "wettbewerbsfähiger, unabhängiger vom globalen Markt"
  (more competitive, more independent from the global market), explicitly under the European
  Chips Act and only after EC state-aid approval on 20 Aug 2024; the fab's documented
  commitments include preferred SME/start-up access and **crisis prioritisation of EU and German
  orders** (S6).
- **EU-level timing discipline.** As an EU member state Germany's binding AI windows are now
  the Omnibus ones: high-risk rules from 2 Dec 2027, embedded high-risk from 2 Aug 2028 (S7) —
  i.e., **after Game B ends on 30 June 2027** (`game/game.js` line 8).

### Who can agree, with which instrument **[O]**
- **Bundesnetzagentur** enforces the AI Act in Germany and runs the sandbox (S5) — the natural
  counterpart for testing/incident conditions attached to *enforcement practice*.
- **Federal Government + Bundestag** passed the implementation law (S5; draft BT-Drs. 21/4594
  located at L2, not read).
- **BMWK/BMWE (economics ministry)** signs chip subsidies — but only within EC state-aid
  approval (S6). Germany is also one of the 18 EuroHPC Joint Procurement Agreement signatories,
  and Lot 2's places of performance include Germany (repo EuroHPC record). **[O]**
- **[I]** For game purposes, "Germany" cannot offer EU-level rule changes by itself: the EU AI
  Act text, the AI Office's GPAI oversight, and the Omnibus timelines are EU-level decisions
  (S7); Germany's own levers are national supervision, sandboxes, subsidies and its EuroHPC
  contracting-authority seat.

### Candidate rules (all **[D]**)

**R-DE-1 — "EU vehicle or nothing."**
- Actor/objective: DE accepts testing/incident-reporting conditions only when they ride an EU
  instrument, because national gold-plating contradicts its own implementation law's design.
- Authority/instrument: EU-level vehicles only — EuroHPC access-time conditions as a JPA
  contracting state (repo record) or the EU AI Act/Omnibus timeline (S7); nationally, the
  BNetzA sandbox (S5).
- Trigger: player proposes conditions stricter than the EU AI Act baseline (e.g., mandatory
  pre-release evaluator access) to DE.
- Conditions: +10 to DE's odds if the player has tabled the EuroHPC bill (`g.tabled` includes a
  EuroHPC window) **or** NL (the other EU member in the game) is already in the coalition; −10
  if the ask is "national-only" rules.
- Plausible response: joins via "EuroHPC access-time conditions" wording; otherwise offers a
  sandbox pilot (counts ½ toward cond 1).
- Substitute: Bundesnetzagentur KI-Reallabor hosting for the coalition's evaluators (S5).
- Time cost: joins one month after the EU vehicle exists, not in the same month.
- Evidence limit: the KI-MIG's *design* (S5) supports the "no gold-plating" reading; it does not
  document any actual German position on hypothetical coalition conditions.

**R-DE-2 — "Crisis-priority buyer."**
- Actor/objective: DE is the coalition's continuity specialist; its documented price is supply
  resilience (ESMC crisis-prioritisation clause, S6).
- Authority/instrument: subsidy contracts (S6) and its EuroHPC contracting-authority seat
  (repo record); no national licensing lever.
- Trigger: goals "continuity" (cond 4) or "chips" (cond 5).
- Conditions: +10 to DE's odds for those goals; DE's acceptance letter offers a
  **crisis-priority clause** as its contribution (a contract condition in the player's favour);
  **energy** tokens are DE's full-value need (`energy: 0` in `planets.json`).
- Time cost: none.
- Plausible response: offers co-funding (`capital: 2`) or a guaranteed industrial order instead
  of enforcement powers it does not hold.
- Substitute: subsidy-for-resilience swap (mirrors ESMC: money for priority).
- Evidence limit: the crisis-prioritisation wording is a single JV commitment for one fab (S6),
  not a German national policy; generalising it to a national behaviour is fiction.

**R-DE-3 — "No national choke move."**
- Actor/objective: DE never offers licensing/withholding of chipmaking inputs (its tools share
  is 3%; no German analogue of the Dutch regulation was found in this pass — **[U] L3/L4**).
- Authority/instrument: none national found in this pass; the reachable levers are co-funding
  budget (S6) and the EU path (S7).
- Trigger: player asks DE to "license your chokepoint" or lead a supply-withholding accord.
- Conditions: DE simply declines the choke framing; it does not punish the ask.
- Time cost: none.
- Plausible response: counters with subsidy/co-funding or an Omnibus-timed EU path; letter
  honestly notes the EU rule path opens **after** the Geneva summit (2 Dec 2027, S7).
- Substitute: DE pays others to hold the line (its classic move in the game's token economy).
- Evidence limit: absence of evidence in this pass, not evidence of absence.

### Past-action memory for DE **[D]**
- **Delivered?** flag: if the player tabled the EU bill and it produced a window (the existing
  `law` move, `game/game.js` lines 116–121), DE's odds improve and DE references it in the
  letter ("the Union vehicle exists because of you"). If the player previously accepted DE's
  co-funding substitute and then abandoned the accord, DE downgrades offers to sandbox-only
  for the rest of the campaign.

---

## 5. United Kingdom

### What London wants **[O]**
- **To be an "AI superpower" first.** The Action Plan response commits to sovereign compute
  expansion "by at least 20x by 2030", the first AI Growth Zone at Culham, an AI Energy Council,
  a National Data Library, and a new function to back "national champions at the frontier of
  AI" (S8). The plan is opportunity-led; the PM's foreword frames AI as "the defining
  opportunity of our generation".
- **Security reframed, incident reporting through the cyber regime.** The AI Safety Institute
  was renamed the **AI Security Institute** and moved to the **Cabinet Office** (S9). On
  12 Oct 2026 the government announced work to put frontier AI to work on cyber defence, and —
  crucially for cond 2 — that stronger protections against emerging AI threats will be
  considered **through the Cyber Security and Resilience Bill regime**, "such as how serious AI
  incidents and near misses can be identified and reported", plus preparation for serious
  incidents involving autonomous AI agents, near-miss learning, and AI verification support
  (S10). The AI Minister: "We will legislate wherever necessary", and to frontier developers:
  "if you cannot adequately control the risks, do not release the system" (S10).
- **Institute-to-institute diplomacy.** The UK's fastest documented cooperation instrument is
  the AISI partnership network (MoU with Australia, 25 May 2026: capability information
  sharing, evaluation best practice, staff exchanges) (S9, S11).
- **A chips niche, not a chokepoint.** The £1bn National Semiconductor Strategy deliberately
  targets "compound chips, design and research and development" strengths, a Semiconductor
  Institute as a single entry point, ChipStart, and access to Horizon Europe's Chips Joint
  Undertaking (S12). The game's UK flavor ("chip design (Arm)") matches the niche; **[I]** Arm
  is a listed company (foreign-owned) — a UK corporate asset, not a government instrument.

### Regulatory timing **[O]**
- As of the cutoff the UK has **no enacted AI statute** of the EU type: the Action Plan response
  only promised consultation on legislation for "critical risks" of the most powerful models and
  a statutory AISI (S8); the copyright-and-AI consultation closed 25 Feb 2025 and its outcome
  report was published ~March 2026 (page updated 19 Mar 2026; report not read, L5) (S13); the
  Oct 2026 package routes AI incident reporting into the **cyber-security** bill regime and
  promises further AI verification detail "in the coming months" (S10). The next UK G20
  presidency will put "AI at its heart" (S10).
- **[I]** For Game B this means: UK can move fast on *institute protocols and definitions*, slow
  on *statutory mandates*, and its realistic window inside the game horizon is the Cyber
  Security and Resilience Bill regime, not a bespoke AI Act. The baseline's absence of any UK
  window (`data/windows.json`) is defensible but leaves the player without this explanation.

### Who can agree, with which instrument **[O]**
- **Secretary of State for Science, Innovation and Technology** and the **AI Minister** drive
  AI policy and sign institute pacts (S11, S10); **AISI (Cabinet Office)** signs technical MoUs
  and runs evaluations (S9, S10, S11); **Parliament** is needed for any statute or the promised
  statutory AISI footing (S8); the **Cyber Security and Resilience Bill** is the live legislative
  vehicle for incident-type duties (S10); the **UK Semiconductor Institute** is the entry point
  for chip-sector partnerships (S12). The UK is a EuroHPC Participating State but not one of the
  18 joint-procurement signatories (repo record) — **[I]** so it observes and can partner, but
  does not hold contracting-authority rights in the AI Gigafactory procedure.

### Candidate rules (all **[D]**)

**R-UK-1 — "Institute protocol fast lane."**
- Actor/objective: UK joins testing (cond 1) and incident (cond 2) accords via AISI protocols,
  not market or supply levers.
- Authority/instrument: AISI MoUs and evaluation agreements (S9, S10, S11) — signature by the
  AI Minister and institute directors, no statute required.
- Trigger: player proposes cond 1/2 accord to UK.
- Conditions: +10 to UK's odds; if **AUCA** is already in the coalition, +5 more (documented
  UK–Australia institute pact, S11). UK's contribution is an "AISI evaluation protocol"
  (evaluator access, shared definitions, staff exchange language straight from S11).
- Time cost: none — institute pacts are UK's fast move.
- Plausible response: yes for protocol-level asks; no for asks that require UK statute or
  supply guarantees.
- Substitute: shared incident definitions only (counts toward cond 2, not cond 1).
- Evidence limit: the Australia MoU covers information sharing and best practice (S11); it
  creates no enforcement rights or release veto. UK "accepting" a protocol in-game is not
  institutional consent by the real AISI.

**R-UK-2 — "Growth-for-security trade."**
- Actor/objective: UK's price is growth partnership; security concessions ride on commercial
  hosting.
- Authority/instrument: AI Growth Zone partnerships and compute programmes (S8,
  strategy-grade, not enacted obligations).
- Trigger: player proposes hosting-based conditions (conds 3/4/6) to UK.
- Conditions: **energy** tokens are UK's full-value need (`energy: 1`); UK accepts off-switch /
  continuity conditions when framed as **AI Growth Zone** partnership (S8's Culham model),
  counting UK's small `power: 2`/`compute: 1` shares at the margin.
- Time cost: none.
- Plausible response: "host with us, and the rules come with the zone"; refuses conditions that
  would tax the 20x-compute ambition (S8).
- Substitute: UK offers a pilot zone clause rather than a national mandate.
- Evidence limit: the Action Plan is strategy, not enacted obligation; specific
  developer partnerships (OpenAI/Anthropic-type deals reported in 2025 press) were **not**
  re-verified in this pass and are not cited.

**R-UK-3 — "Cyber Bill timing, honest lag."**
- Actor/objective: model the UK's real legislative timing — statute-based asks land late or in
  the cyber vehicle.
- Authority/instrument: the Cyber Security and Resilience Bill regime (S10) and a Geneva
  declaration as the interim step; primary AI legislation remains absent at the cutoff.
- Trigger: player proposes conditions requiring primary AI legislation before June 2027 (e.g.,
  binding near-miss reporting, statutory evaluator powers).
- Conditions: UK's odds drop; UK's letter offers the **Cyber Security and Resilience Bill
  route** (S10) as the vehicle and a Geneva summit declaration as the interim step.
- Time cost: statutory asks are deferred past the summit (~6 months).
- Proposed window: add a UK window ~**Q2 2027** labelled "Cyber Bill regime: AI incident and
  near-miss reporting (under consideration)" with `approx: true`, covering cond 2 (partially
  3/6), matching `data/windows.json`'s format and its own warning that dates are openings, not
  delivery plans.
- Plausible response: joins an incident-definition accord immediately at protocol level (R-UK-1),
  defers statutory asks past the summit.
- Substitute: voluntary developer commitments mirroring the AI Minister's public demand ("do
  not release the system" if risks cannot be controlled, S10).
- Evidence limit: the Oct 2026 release says the government "will explore strengthening" the
  cyber regime — consideration, not enacted reporting rules. The Q2 2027 window date is
  invented for playability.

### Past-action memory for UK **[D]**
- **Partnered?** flag: UK checks whether the accord already contains AUCA or US-linked institute
  work (S11 shows Australia; S10 shows AISI evaluations "following work with leading AI
  developers and the US Government"). If the player's earlier coalition collapsed under the
  game's US-pressure event (`monthEvents`, month 4), UK still joins protocol-level accords
  (institutes, not alliances) but asks for a "no-surprise" clause first. **[I]** This encodes
  the brief's rule that a relationship with one government is not automatic hostility from its
  rival, and prior help is not automatic consent.

---

## 6. Cross-cutting distinctions the research must protect

1. **Government licensing power vs corporate semiconductor assets.**
   - NL: the state holds *export licences* over ASML's tools (S1, S2); ASML's capacity,
     expansion (S3's Beethoven context) and order book are corporate. **[O]**
   - DE: the state holds *subsidy contracts* (ESMC, S6); the fab belongs to a JV of TSMC,
     Bosch, Infineon, NXP. **[O]**
   - UK: the state holds *strategy funding and an institute* (S12); Arm and the lab ecosystem
     are corporate/private. **[O]**
   - **[D]** Game consequence: only NL's "License your chokepoint" move is a state act as
     currently implemented; DE/UK offers should be contracts, protocols, subsidies or windows,
     never "we control the fabs".
2. **EU vs member-state powers.**
   - The AI Act and its Omnibus timelines are EU-level (S7); GPAI-model oversight sits with the
     EU **AI Office**, while prohibited/high-risk/transparency compliance is monitored by
     **national** supervisors (S4, S5, S7). **[O]**
   - Export control: NL's semiconductor measure is a *national* licence requirement applying to
     exports outside the EU (S1, S2) — a member-state instrument, coordinated in fact with
     allied measures (**[I]**; ASML's own statements at L3 not read).
   - Industrial subsidy: DE's €5bn needed EC state-aid approval (S6); the UK accessed the
     Horizon Europe Chips JU from outside the EU (S12). **[O]**
   - Procurement: the EuroHPC AI Gigafactory is EU-level joint procurement in which Germany is
     a contracting-signatory host for Lot 2 and the UK only a Participating State (repo record).
   - **[D]** Game consequence: keep `data/windows.json`'s EU windows mapped to DE+NL but label
     who must agree — "EU window: needs the Union vehicle, not one capital" — and give UK-only
     windows separately.
3. **UK interests and regulatory timing.** Documented above (S8, S9, S10, S11, S13): growth
   first, institute protocols fast, statute slow, incident reporting entering via the Cyber
   Security and Resilience Bill regime. **[O]**
   - **Timing conflict with the baseline:** the EU "AI Act testing powers" window in
     `data/windows.json` (date null) now falls *after* the game's end for high-risk obligations
     (2 Dec 2027, S7); the windows inside the game horizon for DE/NL are therefore the
     **EuroHPC** ones (3 Dec 2026, 4 Feb 2027) and the Product Liability transposition
     (9 Dec 2026). **[O]** + **[I]**.

---

## 7. Contradictory evidence and tensions (kept visible)

- **NL holds two levers in opposite directions**: a security-driven licence regime (S1, S2) and
  an industrial policy paid to keep the same industry growing (S3). Both quote minimal
  disruption and national earning capacity as goals. A game rule that makes NL either a
  reliable blocker or a reliable opener misrepresents this; the case-by-case structure (R-NL-1)
  is the honest compression.
- **DE's "innovation-friendly" national law (S5) vs the EU Omnibus preserving "strong
  safeguards" (S7)**: member-state lean and EU-level discipline pull apart; the game should not
  resolve this tension silently, R-DE-1 keeps the EU vehicle as the condition.
- **UK growth ambition vs 2026 security suite**: S8's 20x compute and national-champions
  function sits beside S10's "harden defences" and loss-of-control warnings; the same ministry
  family produces both. R-UK-2 prices security asks in growth terms rather than treating UK as
  either hawk or dove.
- **UK–Australia pact (S11) vs the game's US-pressure event**: the game currently models only
  US gravity (`monthEvents` month 4). S10 shows AISI evaluating "with… the US Government", S11
  shows a parallel non-US institute network. **[I]** Neither implies automatic alignment with
  or against the US; the flags in R-UK-1/R-UK-3 encode this without claiming real-world consent.
- **The Dutch Nov 2025 annex amendment (L1) sits between S2 (Apr 2025) and the cutoff**: the
  regime kept tightening after S2; any in-game NL licence rules should be labelled as of
  the cutoff, not frozen at S2's snapshot.

## 8. What this does not establish

- No source shows NL, DE or UK ever attaching AI-safety conditions (pre-release testing,
  incident reporting, weight custody, continuity, chip-location reporting, lawful stop) to a
  licence, subsidy or procurement contract. All R-* rules are fiction constrained by
  instruments that exist, not predictions. The closest documented hooks: ESMC's crisis-priority
  clause (S6), the EuroHPC governance rights in the repo record, AISI evaluation practice
  (S10, S11), and the UK cyber-bill incident route (S10).
- No acceptance percentages exist for any actor; all game numbers above are invented knobs.
- Unverified in this pass (beyond L1–L7): the reported US–Dutch/US–German alignment statements
  behind the 2024–2025 export measures; the German AI-infrastructure budget; UK developer
  partnership deals; the UK copyright report's content; any post-Apr-2025 Dutch tightening
  beyond the Nov 2025 annex.

## 9. Next discriminating questions (for the owner)

1. Read the EuroHPC tender pack with a rendered browser before 3 Dec 2026 (Lot 2): does any
   clause already authorise contracting authorities to attach conditions to Union access time
   (Art. 12b(14) route)? This decides whether R-DE-1's "EU vehicle" is real or hypothetical.
2. Read the UK's March 2026 copyright/AI report (L5) and the Cyber Security and Resilience
   Bill's current text to date the UK incident-reporting window (R-UK-3) from a document rather
   than a press release.
3. Confirm the Dutch implementation act's passage after the 1 Jun 2026 consultation and
   whether the AP's "AI-bestuurder" gained powers by the cutoff — this fixes whether NL can
   offer any *national* AI-condition enforcement inside the game horizon, or only licences.
