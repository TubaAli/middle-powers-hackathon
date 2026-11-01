# AUCA and PROD, disaggregated: what Australia, Canada, DRC, Indonesia, Chile and Peru actually demand

Owned file for research area 4 ("Australia, Canada and the producer-state group, disaggregated") under
[BRIEF.md](BRIEF.md). Game baseline `198d3ac` on main. Research cutoff: **1 November 2026**.
All retrieval done **2026-11-01**; every claim carries a source marker `[S#]` resolved in the
[ledger](#source-ledger). I own only this file (+ `resources.json`); no live code, shared summary or
dialogue was edited, nothing committed.

---

## 1. Membership inspection (what the game groups together)

`game/planets.json` defines exactly two composite actors in scope here:

| Key | Game label | Members (exact) | Map flags | Illustrative tokens (not data) |
|---|---|---|---|---|
| `AUCA` | "Australia & Canada", *Joint ministers of Australia and Canada* | **Australia, Canada** | `ca` base, `au` outpost | food 3, medicine 1, energy 3, minerals 3, capital 2, market 1 |
| `PROD` | "Producer states", *Ministers of DRC, Indonesia, Chile and Peru* | **DR Congo, Indonesia, Chile, Peru** | `cd` base; `id`, `cl`, `pe` outposts | food 2, medicine 0, energy 1, minerals 3, capital 0, market 2 |

These are **six separate governments** with different regimes, instruments, clocks and demands.
The game currently treats each pair/group as one partner with one composite token set and generic
acceptance odds (`game.js` `needs()` / `odds()`), and `data/windows.json` gives AUCA a single
"AI Standards legislation planned for early 2027" window labelled Australia. Two structural
corrections follow from the evidence below:

1. **The AUCA window is Australia-only.** Canada's live decision points are funding-cycle based
   (SCIP applications already open; staged Cohere payments with unknown draw dates), not an
   "early 2027" law.
2. **PROD's "needs" list starts with medicine**, which the game therefore offers first
   (`needs()` returns powers ≤ 1, so PROD's list is medicine, energy, capital). Nothing retrieved
   this pass connects any of the four producer governments' mineral or hosting cooperation to food
   or medicine. The DRC is the sharpest case: the US is already its largest donor at over
   US$1bn/year `[S7]`, and the DRC still banned cobalt exports and moved to quotas `[S8][S9]`.

---

## 2. Method and evidence limits

- **Retrieval**: direct URL fetches only. No search engine and no subagent delegation were
  available (forbidden by the contract and not provided by the harness), so primary URLs were
  targeted from known sources and consolidated tertiary anchors (Wikipedia) were used to locate
  and date events. This is a bounded snapshot, not a search-exhaustive pass.
- **Access failures recorded**: `industry.gov.au` (timeouts), `ato.gov.au` (403), `gob.cl` (403),
  `reuters.com` (401), `lemonde.fr` (paywall 402), `news.microsoft.com` (404 across slug
  variants), Peru's congress law archive (404). A 403/404 is an access limitation, never evidence
  of absence.
- **Date discipline**: observation date (2026-11-01) is kept separate from publication dates and
  event dates. Nothing after the cutoff is asserted; late-2026 gaps are named in
  [§7 Contradictions and unknowns](#7-contradictions-and-unknowns-by-date).
- Tertiary reads are marked as such; where they cite a primary I could not fetch, the primary is
  cited with "not retrieved — paywalled/blocked".

---

## 3. Cross-cutting findings (the parent's two direct questions)

### What specific previous help / player commitment credibly affects cooperation?

Prior help works as a **precondition that opens a specific door**, never as a general bonus. The
most credible commitments are the ones that match each government's own written industrial
strategy:

| Member | Commitment that credibly moves cooperation (observed analogue) | Evidence |
|---|---|---|
| Australia | Co-funded **firmed renewables + grid connection** for any large compute build (its standards will make operators underwrite exactly this), and local-processing/skills investment for minerals. | `[S1][S2]` |
| Canada | **Anchor purchase or staged equity in Canadian compute/AI firms** (Budget 2024 explicitly fears reliance on foreign-owned compute; the Cohere pattern is staged public money), plus long-term offtake for Canadian-processed critical minerals. | `[S4][S5][S6]` |
| DR Congo | **Security support against armed-group pressure** (Tshisekedi's stated minerals-for-security ask) and **corridor/energy infrastructure** (Lobito; US–DRC–Zambia battery MOU). The US already supplies both. | `[S7]` and `[S16][S17]` |
| Indonesia | **Onshore processing investment + technology transfer** — it has absorbed seven-plus years of WTO litigation to force exactly this. | `[S10][S11]` |
| Chile | Accept **state-controlled joint venture terms with royalties** (how Rio Tinto entered: via ENAMI/Codelco partnerships), plus water/community terms. | `[S12][S13]` |
| Peru | **Legal-stability-style guarantees + infrastructure/capital**, and mine-community stabilization. Note: the new government's actual policy is *not established by retrieval*. | `[S14][S15]` |

### What cannot be bought with a medicine/food token?

All six. No retrieved source ties any of these governments' AI-supply-chain bargaining to food or
medicine offers:

- **Australia and Canada** are rich, food- and (for Canada) medicine-secure economies; their
  recorded asks are energy, capital, market access and security alignment `[S1][S2][S4][S5]`.
- **DR Congo** receives >US$1bn/year in US humanitarian and bilateral assistance and still
  restricted cobalt exports; its recorded asks are security and infrastructure, not aid `[S7][S8]`.
- **Indonesia** defended its ore ban through a WTO panel at the cost of export revenue and
  litigation, for industrial policy — not for any food/medicine consideration `[S10]`.
- **Chile** restructured lithium ownership toward state control; the price of entry is equity
  share and royalties, in kind `[S12]`.
- **Peru**'s documented bargains are fiscal stability contracts and canon (tax-sharing), not
  humanitarian flows `[S15]`.

Game-design translation: a medicine or food offer should at most change a government's *tone*,
never its answer. None of the proposed rules below let tokens alone produce a "yes".

### Public vs private (whose "yes" is it, anyway?)

A recurring pattern with direct game consequences: **the government controls licences, ownership
terms and funding; the physical capacity often belongs to foreign or private companies.**

- DRC: the export ban is a public ARECOMS decree, but the biggest producers are CMOC and Glencore
  `[S8]`; a "DR Congo joins" letter binds export regulation, not Chinese-owned refineries
  elsewhere in the chain.
- Indonesia: the ban/processing requirement is public law, while smelter ownership is largely
  Chinese; an Indonesian commitment constrains Indonesian policy, not plant owners `[S10][S11]`.
- Chile: lithium runs through state-controlled JV companies (Codelco/SQM, ENAMI/Rio Tinto)
  `[S12][S13]`.
- Canada: the Cohere investment is public money routed into a private company; Canada's letter
  controls funding stages, not the company `[S6]`.
- Australia: standards bind operators, and foreign data-centre investment must pass FIRB
  screening; hosting deals are corporate but permission is sovereign `[S1]`.

---

## 4. Member cards

Each card: observed facts → interpretation → proposed rules. Rules are written as inspectable
states, per the brief (no automatic approval, no invented acceptance odds).

---

### 4.1 Australia

**Actor / authority.** Commonwealth executive (PM&C hosts the new Office of AI); Treasurer via the
Foreign Acquisitions and Takeovers framework; states keep planning. Parliament has not yet passed
the relevant law.

**Observed (retrieved).**
- 15 Jul 2026: PM announced the government "will introduce AI laws in Australia's interests";
  Australian Standards for AI; Office of AI established within PM&C "effective today"; National
  Cabinet consideration in August; "standards expected to be legislated early next year" (i.e.
  early 2027) `[S2]`.
- The standards set **mandatory minimums for large data centres**: legal obligation to underwrite
  their own new power supply, pay their full share of connection costs, reduce power when needed
  for grid stability, and be as water-efficient as possible `[S2]`; a renewable-electricity
  obligation with certificate retirement enforced by the Clean Energy Regulator, plus demand
  flexibility and "no net costs" to consumers `[S1]`.
- Tiered thresholds: exclude <30 MW; baseline 30–100 MW; stronger duties above 100 MW (or a 150 MW
  cumulative portfolio) `[S1]`.
- Conditions for **frontier AI training** in Australia: support national security and safety,
  local capability/skills/research, and Australian creators (no training on creative works without
  the artist's control) `[S1][S2]`.
- Sept 2026 consultation paper (submissions closed 9 Oct 2026) building on the March 2026
  national *Expectations of data centres and AI infrastructure developers* and an August 2026
  National Cabinet decision `[S1]`.
- AEMO projects NEM data-centre load rising ~5 TWh (2025–26) → ~34 TWh (2035–36), ~3% → ~13% of
  grid supply `[S1]`. Foreign data-centre/cloud investment faces "greater scrutiny" under FIRB
  reform; SOCI Act security obligations apply; classified work requires certified hosting; the
  pitch is "as a trusted Five Eyes member, Australia can be the infrastructure partner for our
  region" `[S1]`.
- Australia's **AI Safety Institute** exists and "is collaborating with international partners on
  safety testing for emerging AI models" `[S1]`.

**Interpretation.** Australia's opening position is already written down and it is a *hosting
bargain with domestic guardrails*: it wants frontier-training investment, and its price is (a)
energy and water protection, (b) local value capture (skills, research, sovereign capability),
(c) security screening. Any player asking Australia to host or to license its minerals for an
accord should expect to *pay into the energy build-out* and *accept value-capture riders*.
Food/medicine offers are noise; the 2026 policy conversation is entirely about power, water,
jobs and control.

**Prior-help triggers.** Energy-infrastructure co-funding and long-term offtake/processing
commitments (the Ayres quote ties the standards to "A Future Made in Australia" industrial
strategy) `[S1][S2]`.

**Proposed rules.**
- **AU-1 "Hosting on Australia's terms"** — *Actor*: Australian government. *Objective*: join or
  host an accord's compute/conditions. *Authority/instrument*: the planned AI Standards
  legislation (not yet law). *Trigger*: player tables an accord condition that needs Australian
  hosting (conditions 3/4/6-type) or Australian mineral inputs. *Conditions*: the player's offer
  must include an energy package (new firmed generation + connection costs, mirroring the
  standards' own requirement) — in token terms energy + capital. *Time cost*: any "yes" before
  the bill passes is a commitment to legislate; the letter should say "subject to Parliament
  passing the AI Standards bill" (window: early 2027). *Plausible response*: "Yes with
  conditions" if energy+capital offered; "Not now — bring power" otherwise. *Substitute*: route
  the deal through procurement or a voluntary facility the operator chooses to build (the CPTPP
  constraint below). *Evidence limit*: bill text does not exist yet; exact legal hooks unknown.
- **AU-2 "Value capture rider"** — any minerals or training deal must carry local-processing /
  skills / research commitments, echoing the AI-training conditions in `[S1]`; offers of food or
  medicine never change Australia's answer. *Evidence limit*: the rider is a design proposal
  grounded in the retrieved policy direction, not a quoted statutory clause.

---

### 4.2 Canada

**Actor / authority.** ISED (Minister of Innovation), Finance (Budget), PSPC for procurement;
public money moves through programs (SCIP, Access Fund, AI Compute Challenge) and staged
investments. Parliament's AIDA (proposed AI act) was funded for enforcement in Budget 2024 but
its legislative fate is unverified this pass.

**Observed (retrieved + team record).**
- Budget 2024 (16 Apr 2024): **US$2.4bn AI package** including **$2bn over five years** for an AI
  Compute Access Fund and the Canadian **Sovereign AI Compute Strategy**, **$50M over five years
  to create the AI Safety Institute of Canada (CAISI)**, $5.1M for an AI and Data Commissioner
  office to enforce the *proposed* AIDA, plus NVIDIA letter of intent and a UK compute MoU
  `[S5]`. The budget text states the motive plainly: reliance on "privately-owned computing,
  outside of Canada... comes with dependencies and security risks" `[S5]`.
- Strategy detail (ISED page, modified 2026-06-04): up to **$700M** to mobilize private AI
  data-centre investment (anchoring or growing "Canadian AI champions"), up to **$1bn** public
  supercomputing (SCIP, applications open; plus an SSC/NRC secure facility for national-security
  R&D; up to $200M near-term augmentation), up to **$300M** Access Fund; objectives include
  safeguarding Canadian data and IP, leveraging "energy, land and climate" `[S4]`.
- Critical minerals: **$3.8bn Critical Minerals Strategy** ("supplier of choice"), a **10% EV
  Supply Chain investment tax credit** on buildings for assembly, battery production and cathode
  active material production, and Clean Technology Manufacturing credit improvements for critical
  minerals projects; the retrieved page also stresses "rigorous standards for consultation and
  engagement with Indigenous communities" `[S5]`.
- Team-retained record (29 Oct 2026): staged public equity **up to $1.6bn** in Cohere, currency
  CAD inferred, investing vehicle unnamed, CAISI cooperation named alongside NVIDIA, Bell, Schwarz
  Group and a Cohere–Aleph Alpha merger; no signed terms known `[S6]`.

**Interpretation.** Canada's bargaining pattern is **buy capacity, attach conditions at the
payment stage**. It has standing programs open now (no "early 2027" window) and it pays in
stages with reporting. Its cooperation is most credible where the player helps its stated goals:
sovereign compute, CAISI-linked testing, and market access for Canadian-processed minerals. It
will not grant instant approval: the real-world analogue is staged tranches with conditions, so
the game should show "joined, subject to a signed contribution agreement".

**Prior-help triggers.** Anchor compute purchase / staged equity in Canadian AI (Cohere
pattern); long-term mineral offtake with processing in Canada (EV-ITC segments); CAISI
partnership on testing `[S4][S5][S6]`.

**Proposed rules.**
- **CA-1 "Anchor investor clause"** — *Actor*: Government of Canada. *Objective*: join an accord
  and open its compute to the bloc's conditions. *Authority/instrument*: program funding and
  staged investment agreements (SCIP/Access Fund/Challenge; the announced Cohere equity).
  *Trigger*: player offers capital + market, or a compute-anchor commitment. *Conditions*: the
  offer must be structured in stages with public progress reporting (jobs/compute), mirroring
  the retrieved announcement. *Time cost*: at least one month between offer and signed
  agreement (the real instrument remains unsigned at cutoff). *Plausible response*: "Yes in
  principle, first tranche on signature" — never an instant yes. *Substitute*: buy Canadian
  compute capacity commercially and attach conditions contractually. *Evidence limit*: investing
  vehicle and draw conditions unknown `[S6]`; no rule may assume Canada controls Cohere.
- **CA-2 "Test through CAISI"** — if the accord's goal is pre-release testing or incident
  sharing (conditions 1–2), Canada's implementation route is CAISI + AI-institute cooperation,
  and its letter says so explicitly; Canada will not grant a unilateral national veto over a
  developer. *Evidence limit*: CAISI's launch date and leadership were not verified this pass
  (Budget 2024 proposed it `[S5]`; the PM's release references its "recent establishment"
  via the team record's linked materials). AIDA's status unverified — do not imply Canada has
  an AI act.

---

### 4.3 Democratic Republic of the Congo

**Actor / authority.** Presidency (Tshisekedi), Ministry of Mines, **ARECOMS** (the strategic
minerals regulator), Gécamines and EGC as state companies. The instrument is export regulation
and quota/licence terms, plus state-stake renegotiation.

**Observed (retrieved).**
- **22 Feb 2025: ARECOMS suspended cobalt exports for at least four months**, by decree
  co-signed by Mines Minister Kizito Pakabomba, citing oversupply and a 21-year price low; the
  suspension covers industrial through small-scale output, bans mixing artisanal with industrial
  cobalt, and provides for an assessment after three months. ARECOMS president Patrick Luabeya:
  the measure "is intended to regulate supply on the international market" `[S8]`. CMOC had
  doubled DRC cobalt output to ~114kt (from ~56kt); CMOC and Glencore are the biggest producers
  `[S8]`.
- **25 Sep 2025: Le Monde reported the DRC instituting export quotas** (world's top producer);
  the article is paywalled — headline/date verified as a citation only, contents not read `[S9]`.
- The 2018 mining code raised royalties and declared cobalt and coltan "strategic metals"
  (Reuters, via `[S16]`).
- The DRC supplies a **67–76% share of 2024 world cobalt mine production** (IEA/USGS/Cobalt
  Institute figures compiled in `[S16]`) and minerals exceed **95% of export revenues** `[S16]`.
  EGC was created (Dec 2019) to centralize artisanal cobalt; Gécamines holds minority stakes in
  industrial copper-cobalt ventures `[S16]`.
- **Value capture is moving from talk to hardware**: 13 Mar 2026 the DRC inaugurated its first
  gold refinery (DRC Gold Trading + Tanzania's Lunga Mining), described by the mines minister as
  the first time the country can process strategic minerals domestically `[S16]`. A 13 May 2026
  MOU between EVelution Energy, EGC and Trafigura contemplates refining Congolese cobalt
  hydroxide in the US, a possible EGC minority stake in EVelution, and "cooperation to expand
  local mineral processing capacity in the DRC" `[S16]`.
- **The US already pays the DRC's stated price**: over US$1bn/year in assistance (largest
  bilateral donor); Lobito Corridor rail MOU (Oct 2023) with >US$560M new funding announced Dec
  2024 (total US investment >$4bn); a **US–DRC–Zambia EV battery supply-chain MOU** ("from the
  mine to the assembly line") with anti-corruption commitments; a $2M Fair Cobalt Alliance award
  to formalize artisanal cobalt `[S7]`.
- Mar 2025: Tshisekedi proposed to the US a **minerals-for-security deal** — mining
  opportunities in exchange for help against M23 (WSJ/Reuters, via `[S17]`); April 2025
  commutations of three Americans' death sentences happened "amid ongoing U.S.-DRC negotiations
  on mineral deals and security cooperation"; the US mediated the DRC–Rwanda peace process; in
  Apr 2026 the DRC accepted US third-country deportees (first batch 19 Apr 2026) `[S17]`.
  *Caution*: `[S17]` is a tertiary article carrying an LLM-content warning banner; its key
  events are corroborated by its cited outlets, which I could not fetch (Reuters 401).

**Interpretation.** The DRC has demonstrated, twice, that it will **absorb real revenue losses to
gain market power and force structural change** (ban during a price low; quotas after). Its
publicly stated price for alignment is **security** and **infrastructure** — and the US is
already paying both, which sets the reference price for any player. Humanitarian aid is not the
currency: >$1bn/year of US assistance coexisted with the export ban `[S7][S8]`. Also, a DRC
"yes" binds its own export policy, not the (largely foreign-owned) producing companies or the
refining stages elsewhere in the chain.

**Prior-help triggers.** Security support against armed groups; corridor/energy infrastructure
finance; processing investments of the EVelution/EGC type `[S7][S16][S17]`.

**Proposed rules.**
- **DRC-1 "Minerals need muscle"** — *Actor*: DRC government. *Objective*: join a minerals-linked
  accord. *Authority/instrument*: ARECOMS export licences/quotas; mining-code instruments.
  *Trigger*: player asks DRC to attach conditions to cobalt/copper flows. *Conditions*: the offer
  must contain a security or corridor/infrastructure component (the game has no security token,
  so the nearest honest mechanic is: DRC answers "not now" to any offer of food, medicine or
  capital alone, and explains what it wants, citing its US negotiations). *Time cost*: months —
  its own export controls took a full ministerial decree cycle. *Plausible response*: "Not now"
  with a stated price; "Yes with quotas carved to fit" only if the offer matches the stated
  price. *Substitute*: none within the current token set — this gap is itself the finding.
  *Evidence limit*: whether a US–DRC minerals-for-security agreement was ever signed by the
  cutoff was **not established by retrieval**.
- **DRC-2 "Licence conditions, not chain control"** — DRC can ride accord conditions onto its
  export licences (reporting, traceability, destination disclosure — the artisanal/industrial
  separation decree shows licence-level micro-regulation is its style `[S8]`), but it cannot
  deliver refined-supply guarantees (refining sits elsewhere; see the team's `layers.json`
  shares). Its letter should never promise more than licence terms.

---

### 4.4 Indonesia

**Actor / authority.** Presidency; Ministry of Energy and Mineral Resources (ESDM); the mining
law framework (Law 4/2009 as amended; the 2020 mining law) and ministerial regulations; state
holding Mind ID. The instrument is export prohibition + domestic processing requirement (DPR),
licences/quotas and price floors.

**Observed (retrieved).**
- **WTO DS592 (official record)**: EU consultations requested 22 Nov 2019 over Indonesia's
  nickel ore export ban and domestic processing requirement; panel report circulated 30 Nov 2022
  found both inconsistent with GATT Art. XI:1 and not justified (Art. XI:2(a) and XX(d) defences
  rejected). At the panel, the ban had been in place **seven years** and the DPR **nine years**,
  and both "remained in effect as of the drafting of the Panel Report". Indonesia appealed on
  8 Dec 2022; the appeal sits before a non-operational Appellate Body, and the WTO page's current
  status is "panel report under appeal" — the dispute is unresolved, and the measures stay in
  force `[S10]`.
- The ore ban was first imposed Jan 2014, relaxed 2017, re-imposed Jan 2020; coordinating
  minister Luhut Pandjaitan framed the goal as moving Indonesian firms into the lithium-battery
  supply chain; President Widodo said the new ferronickel smelter would raise the ore's value
  **1,400%** `[S11]`. In Apr 2020 a minimum nickel ore price regulation was issued to protect
  small miners; state-owned Mind ID acquired 20% of Vale Indonesia (Jun 2020, $390M) `[S11]`.
- Indonesia is the world's largest nickel producer (~1.6 Mt in 2022) and became the **world's
  second cobalt producer** as a byproduct of nickel processing: 1,300 t (2015) → 20,500 t (2024),
  growth the tertiary read attributes to the export ban "ensuring an influx of foreign
  investment in nickel and cobalt processing" `[S11][S19]`.
- Environmental/social friction is documented: 2024 reporting has nickel mining and processing
  among the main causes of Indonesian deforestation (AP, via `[S11]`).

**Interpretation.** Indonesia's rulebook is written into the WTO record: it will spend years of
litigation and forgo raw-ore export revenue to force **onshore processing**. The currency of
cooperation is processing investment and technology transfer, plus market access for processed
products. Its battery-supply-chain ambition (mine-to-assembly) is exactly the shape of deal it
wants. Food/medicine play no retrieved role anywhere in this file.

**Prior-help triggers.** Smelter/processing finance; technology transfer; offtake for processed
nickel/cobalt products `[S10][S11]`.

**Proposed rules.**
- **ID-1 "No raw-ore diplomacy"** — *Actor*: Indonesian government. *Objective*: join an accord
  touching nickel/cobalt. *Authority/instrument*: mining law + export regulations (the WTO
  record shows these are used and defended). *Trigger*: any accord clause that treats Indonesian
  output as a raw-material lever. *Conditions*: the player must offer onshore-processing
  investment (capital + a technology/local-value commitment) so the clause supports, rather than
  bypasses, the DPR. *Time cost*: immediate "no" on raw-material asks; a processing-linked ask
  takes months of licence/contract work. *Plausible response*: refuse raw-ore framing; redirect
  to a processing partnership. *Substitute*: a deal structured on processed products. *Evidence
  limit*: a reported 2025 export-duty plan for refined minerals was **not verified** this pass.
- **ID-2 "Environmental and social rider"** — any cooperation offer carries co-funded
  environmental/social obligations (deforestation, smelter-community impacts), reflecting the
  documented friction `[S11]`. *Evidence limit*: this rider is a design proposal; no retrieved
  Indonesian instrument enforces it at deal level.

---

### 4.5 Chile

**Actor / authority.** Presidency (Boric); CORFO; state companies **Codelco** and **ENAMI**;
Contraloría approves the JV contracts. Lithium is legally not open to ordinary concession.

**Observed (retrieved).**
- **National Lithium Strategy (2023, in force)** — IEA policy record (updated 3 Dec 2025):
  lithium "can only be explored or extracted directly by the State or state-owned companies, or
  through administrative concessions or special operation contracts", with pre-1979 concessions
  excepted; the strategy is a public-private collaboration "in which the Chilean government
  maintains a controlling interest in all new strategic projects"; private partners enter "by
  entering partnerships with the State, ceding a share of the operation and paying royalties".
  Pillars include a Strategic Committee, a stakeholder-engagement process, a National Lithium
  Company, a **Network of Protected Salt Flats covering at least 30% of these ecosystems by
  2030**, a Public Technology and Research Institute, state involvement in Atacama production
  "particularly in light of the expiration of private sector lease agreements in 2030", and
  prospecting elsewhere `[S12]`.
- Practice has moved to **state-led partnerships**: the National Lithium Company was dropped as
  of 2025 (UChile commentary, Apr 2025), replaced by public-private JVs — **Nova Andino Litio**
  (Codelco + SQM) for the Salar de Atacama, created per a gob.cl announcement of **30 Dec 2025**
  (gob.cl blocked for this client; date/title verified via `[S13]`), with Contraloría's
  definitive approval reported 6 Feb 2026; plus Salares Altoandinos (ENAMI + Rio Tinto) and
  Salar de Maricunga (Codelco + Rio Tinto) `[S13]`.
- Background: SQM was the world's biggest lithium producer by 2017, operating Atacama brines;
  whether brine extraction affects adjacent freshwater is documented as an **unresolved
  dispute**; China's Tianqi holds 23.77% of SQM (2018) `[S18]`.

**Interpretation.** Chile does not sell access; it **restructures ownership**. The price of entry
is a state-controlled JV with royalties, and the standing deadline behind its leverage is the
2030 Atacama lease expiry. Water and community terms are not decoration: the strategy
formalizes protected salt flats, and the Atacama water science remains contested. Prior help
that matches observed behaviour is entering through the state vehicle and funding
technology/refining work in Chile; Rio Tinto's two entries are the template.

**Prior-help triggers.** JV participation through ENAMI/Codelco with royalty terms; in-country
refining/technology investment; respect for the protected-salt-flats and engagement process
`[S12][S13]`.

**Proposed rules.**
- **CL-1 "Through the state vehicle"** — *Actor*: Chilean government/state companies.
  *Objective*: lithium-linked accord participation. *Authority/instrument*: JV contracts under
  the strategy (Contraloría-approved), CORFO/Codelco/ENAMI. *Trigger*: player proposes lithium
  cooperation. *Conditions*: the player accepts a state-controlled JV with royalties — private
  direct offers are redirected, not refused. *Time cost*: JV formation and approval took months
  in the real case (deal announced → company created 30 Dec 2025 → Contraloría approval Feb
  2026). *Plausible response*: "Join us in the vehicle" or "Not now" if the player insists on
  private terms. *Substitute*: cooperation on copper or hosting does not require the JV path.
  *Evidence limit*: the strategy text and JV creation dates are solid; the internal JV economics
  are not public here.
- **CL-2 "Water and community are gates, not side clauses"** — any hosting/processing commitment
  includes water monitoring and protected-area terms (30% salt flats by 2030 is strategy-track
  policy), and the game should show the water science as **contested**, not settled, mirroring
  the documented dispute `[S12][S18]`. *Evidence limit*: no retrieved enforcement instrument for
  the protected-salt-flats network; treat as policy direction.

---

### 4.6 Peru

**Actor / authority.** New presidency (Fujimori, Popular Force) with a fragmented Congress;
Ministry of Energy and Mines for licences; the legal-stability contract regime; subnational
governments funded by the **canon minero**. **Caveat: the new government's actual policy was not
established by retrieval.**

**Observed (retrieved).**
- **2026 general election**: first round 12–13 Apr 2026; runoff 7 Jun 2026; **Keiko Fujimori
  (Popular Force) defeated Roberto Sánchez (Together for Peru) 50.13%–49.87%** (~50,000 votes);
  the National Jury of Elections finished counting by 29 Jun 2026 and certified her win `[S14]`.
  Background: Boluarte was removed by Congress (Oct 2025); interim president José Jerí was then
  removed (Feb 2026); José María Balcázar served into the election. Congress is newly bicameral
  and fragmented: Popular Force is the largest party but holds only 22/60 Senate and 41/130
  Chamber seats `[S14]`.
- The campaign was dominated by **crime, corruption and insecurity** — not minerals or AI
  `[S14]`. Observers classify the system as "hybrid"/"in the process of becoming autocratic"
  (V-Dem) `[S14]`.
- Structural mining facts (dated tertiary read with an explicit "needs update" banner — used
  only for structure): Peru was the **2nd-largest copper producer** (2019); the 1990s Fujimori-era
  framework introduced legal-stability contracts, tax exemptions until investment recovery, and
  land-use rules; the **canon minero** routes 50% of income tax from mining to producing
  regions/municipalities; corporate-community environmental conflict is a documented, standing
  feature `[S15]`.
- Peru's 2023 AI-promotion law (Law 31814) is known by name but was **not retrieved this pass**
  (congress archive 404); no details are asserted.

**Interpretation.** Peru's government is weeks old at the cutoff, with no congressional majority
and a mandate focused on security. Its mineral diplomacy therefore runs on the **structural**
instruments that survive governments: stability contracts, canon redistribution and community
peace around mines. The one thing retrieval establishes strongly is *what Peru's cooperation
costs in institutional terms* (stability + community consent + fragmented ratification), not what
the new president wants. The game should treat any specific Fujimori-administration mineral or
AI position as **fictional and marked as such**.

**Prior-help triggers.** Infrastructure/capital and legal-stability guarantees; support for
mine-community stabilization `[S15]`.

**Proposed rules.**
- **PE-1 "Stability for support"** — *Actor*: Peruvian government. *Objective*: mining-linked
  accord participation. *Authority/instrument*: legal-stability contracts and fiscal regime
  (structural), ratified politically by Congress. *Trigger*: player proposes mineral-linked
  conditions. *Conditions*: the player guarantees stability-style terms (no surprise fiscal
  changes for the deal's life) plus infrastructure/capital investment. *Time cost*: long — and
  the letter should carry a "Congress has not ratified" state because no party holds majorities
  in either chamber `[S14]`. *Plausible response*: "Yes in principle, ratification pending" or
  "Not now". *Substitute*: cooperation through existing operator contracts rather than new
  state deals. *Evidence limit*: the new government's positions are unknown — this rule rests
  on structure, not on any retrieved Fujimori-administration commitment.
- **PE-2 "Community consent is a gate"** — any mineral-linked cooperation requires
  community/prior-consultation guarantees; where communities resist, projects stall regardless
  of capital offered (the documented conflict pattern) `[S15]`. *Evidence limit*: the read
  behind this is dated; current conflict lines (e.g., specific corridors/projects) were not
  retrieved.

---

## 5. Windows and timing (what the game's timeline should show)

| Member | Verified clock | Status at cutoff |
|---|---|---|
| Australia | AI Standards legislation **planned early 2027** (announced 15 Jul 2026); consultation closed 9 Oct 2026; National Cabinet decision Aug 2026 | Bill not yet introduced; passage unknown |
| Canada | Budget 2024 funds live now; **SCIP applications open**; staged Cohere equity announced 29 Oct 2026 with unknown draw dates | Programs open; no fixed legislative window |
| DRC | Export ban from 22 Feb 2025; 3-month assessment built in; Le Monde-reported quotas 25 Sep 2025 | Quota regime's current terms **unverified** |
| Indonesia | No window: standing policy (ban + DPR in force since ~2014/2020; WTO appeal pending since 8 Dec 2022) | Continuous |
| Chile | Strategy in force; Nova Andino Litio created 30 Dec 2025; Contraloría approval reported 6 Feb 2026; Atacama leases expire 2030 | JV operational track; 2030 is the structural deadline |
| Peru | Election certified 29 Jun 2026; new administration in office (inauguration date not verified) | Government positions on minerals/AI **unknown** |

The Geneva AI Summit (21–22 Jun 2027) is the game's shared endpoint and remains the natural
coalition deadline; nothing retrieved changes it.

---

## 6. What this means for the game (design input, not code)

1. **Disaggregate the letters.** Six governments, six prices. The minimum-cost version: keep the
   two map tokens but branch each meeting by capital (the game already draws each member's flag
   on the map), and let each letter state its own conditions.
2. **Replace "needs" with structural demands.** `needs()` currently makes the game offer
   PROD medicine first and AUCA medicine/market. Retrieved evidence supports none of these as
   decisive. A defensible demand set:
   - AUCA (Australia): energy + capital + market; - (Canada): capital + market + compute.
   - PROD (DRC): security/infrastructure (no token exists — surface this as the gap),
     (Indonesia): capital + technology, (Chile): JV-acceptance + royalties,
     (Peru): stability + community-consent + infrastructure.
3. **Show consent as staged states, not odds.** Real-world letters in this file say things like
   "joined, subject to a signed contribution agreement" (Canada), "subject to Parliament passing
   the bill" (Australia), "Congress has not ratified" (Peru), "join us in the state vehicle"
   (Chile). These four states are more honest and more playable than a percentage.
4. **Medicine/food tokens never flip a mineral or hosting decision.** At most they buy goodwill
   in dialogue; the DRC card is the reason (aid at >$1bn/year did not prevent the cobalt ban).
5. **Public/private split matters.** A government's letter binds licences, funding stages and
   JV terms — not foreign-owned plants or refineries. Letters should scope their promises to the
   government's actual instrument.

---

## 7. Contradictions and unknowns (by date)

**Contradictory evidence.**
- **ARECOMS founding**: `[S8]` says ARECOMS was "established in 2019"; the same client's
  background read dates EGC to Dec 2019 as the artisanal-cobalt body `[S16]`. ARECOMS's own
  founding date was not independently verified — flag, don't harmonize.
- **Chile's National Lithium Company**: strategy pillar `[S12]` vs dropped-as-of-2025 reporting
  `[S13]`. Practice superseded the plan text.
- **Australia's standards**: "first framework of its kind" framing in `[S2]` coexists with
  open consultation questions and unresolved thresholds in `[S1]` — a plan, not a regime, until
  Parliament acts.
- **Canada's AIDA**: Budget 2024 funded enforcement for a *proposed* act `[S5]`; its
  legislative fate is unverified this pass — the game must not imply Canada has an AI act.
- **DRC–US "deal"**: negotiations, an Erik Prince-adjacent arrangement (Apr 2025) and
  deportee acceptance (Apr 2026) are documented; **no signed minerals-for-security agreement was
  established by retrieval**. `[S17]` also carries an LLM-content warning banner.
- **SQM water**: the freshwater-inflow question is documented as unresolved `[S18]`; do not let
  the game settle it.
- **WTO DS592**: "Indonesia lost" is wrong (appeal into the void); "Indonesia won" is wrong
  (panel findings stand unadopted). The unresolved state is the accurate one `[S10]`.

**Unknown at cutoff (dated).**
- Whether Australia's AI Standards bill is introduced/passes in early 2027. (Gap: bill text.)
- DRC quota regime terms as of 1 Nov 2026. (Gap: `[S9]` paywalled; no official DRC source
  reachable.)
- Whether any US–DRC minerals agreement was signed. (Gap: primary outlets blocked.)
- Cohere staged-equity vehicle, signatory, draw conditions (team's own open question `[S6]`).
- The Fujimori administration's mineral/AI positions; Peru's inauguration date.
- Indonesia's reported 2025 refined-nickel export-duty plan. (Not verified.)
- Peru Law 31814's current status/content. (Not retrieved.)
- Indonesia's data-centre/AI policy posture (Microsoft's Apr 2024 $1.7bn commitment known by name
  only; source URL not retrievable this pass — no claim rests on it.)

**Next discriminating questions.**
1. Does Australia's bill text attach the six conditions to *training authorisations* (the
   `[S1]` "granted authorisation to undertake large scale AI training" hook)?
2. Are the DRC's cobalt quotas numerical, and does ARECOMS publish them? (One official decree
   would settle it.)
3. Do Cohere's staged tranches have milestone dates a coalition could condition on?
4. Does the Fujimori government publish a critical-minerals or digital-economy plan within its
   first 100 days?

---

## Source ledger

Observation date for every entry: **2026-11-01**. Publication and event dates listed separately.

**Cited sources (13).**

| # | Source | Type | Published | Access | Used for |
|---|---|---|---|---|---|
| S1 | [PMC, *Getting it right: Building AI infrastructure that works for Australia*, consultation paper](https://www.pmc.gov.au/resources/getting-it-right-building-ai-infrastructure-works-australia) | primary (government) | Sept 2026 | read (full; saved text on disk) | AU standards detail, thresholds, energy/water duties, FIRB/SOCI, Five Eyes framing, AI Safety Institute, 15 Jul announcement date |
| S2 | [PM of Australia, *AI in Australia's interests*, media release](https://www.pm.gov.au/media/ai-australias-interests) | primary (government) | 15 Jul 2026 | read (full) | Office of AI; early-2027 legislation plan; data-centre obligations; copyright; FMIA framing |
| S3 | [Digital Watch Observatory, *Australia unveils AI framework for data centres, copyright and infrastructure*](https://dig.watch/updates/australia-ai-standards-data-centres) | secondary | 16 Jul 2026 | read (full) | corroboration of S2 (kept as background; redundant with S2) |
| S4 | [ISED, *Canadian Sovereign AI Compute Strategy*](https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy) | primary (government) | page modified 2026-06-04 (strategy from Nov 2024) | read (full) | $2B/$700M/$1B/$300M structure; SCIP open; secure facility; data-and-IP goals |
| S5 | [Budget 2024, Chapter 4](https://www.budget.canada.ca/2024/report-rapport/chap4-en.html) | primary (government) | 16 Apr 2024 (archived page) | read (full) | $2.4B AI package; CAISI $50M; AIDA enforcement proposal; NVIDIA LOI/UK MoU; $3.8B critical minerals; EV ITC segments |
| S6 | PM of Canada, Cohere investment release | primary (government) | 29 Oct 2026 | **not re-fetched** — team-retained record (`data/finance-research/`) | staged equity up to $1.6bn; CAD inferred; vehicle unknown; CAISI cooperation |
| S7 | [U.S. Embassy Kinshasa, *U.S. Engagement in the DRC*](https://cd.usembassy.gov/us-engagement-in-the-drc/) | primary (government) | 23 Jan 2025 | read (full) | >$1bn/yr assistance; Lobito MOU/funding; DRC–Zambia EV battery MOU; Fair Cobalt Alliance |
| S8 | [Mining Technology, *Congo imposes temporary cobalt export ban to address supply glut*](https://www.mining-technology.com/news/congo-cobalt-export-ban/) | secondary (news) | 25 Feb 2025 | read (full) | ban effective 22 Feb 2025; ARECOMS decree; minister co-signature; mixing ban; CMOC figures |
| S9 | [Le Monde, *La RDC... instaure des quotas sur son exportation*](https://www.lemonde.fr/afrique/article/2025/09/25/premier-producteur-mondial-de-cobalt-la-rdc-instaure-des-quotas-sur-son-exportation_6642952_3212.html) | secondary (news) | 25 Sep 2025 | **inaccessible** (HTTP 402 paywall; headline/date verified as a citation in [S16]) | DRC cobalt export quotas |
| S10 | [WTO, DS592: Indonesia — Measures Relating to Raw Materials](https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds592_e.htm) | primary (intergovernmental record) | status page; summary current as of 7 Feb 2023 | read (full) | ban + DPR findings; 7/9-year durations; appeal into the void; measures still in effect |
| S11 | [Wikipedia, *Nickel mining in Indonesia*](https://en.wikipedia.org/wiki/Nickel_mining_in_Indonesia) | tertiary | last edited 19 Jan 2026 | read (full) | 2014/2017/2020 ban sequence; Luhut and Widodo quotes; #2 cobalt producer; deforestation reporting |
| S12 | [IEA Policies Database, *National Lithium Strategy* (Chile)](https://www.iea.org/policies/17958-national-lithium-strategy) | secondary (intergovernmental database) | entry updated 3 Dec 2025 (policy year 2023, in force) | read (full) | no-concession rule; state controlling interest; royalties; 30% protected salt flats; 2030 lease expiry |
| S13 | [Wikipedia, *National Lithium Strategy*](https://en.wikipedia.org/wiki/National_Lithium_Strategy) | tertiary | last edited 2 Apr 2026 | read (full; links primary gob.cl announcement of 30 Dec 2025 and Contraloría approval report of 6 Feb 2026 — gob.cl blocked for this client) | JV creations; NLC dropped 2025 |
| S14 | [Wikipedia, *2026 Peruvian general election*](https://en.wikipedia.org/wiki/2026_Peruvian_general_election) | tertiary | current at retrieval | read (partial; results/background sections) | Fujimori 50.13% win; certification 29 Jun 2026; Congress fragmentation; campaign issues |

**Background reads (tertiary, used for orientation and to locate primaries).**

| # | Source | Access | Note |
|---|---|---|---|
| S15 | [Wikipedia, *Mineral industry of Peru*](https://en.wikipedia.org/wiki/Mining_in_Peru) | read (partial) | carries "needs update" banner (Dec 2024); 2006-era data used structurally only (canon minero, stability contracts, conflict pattern) |
| S16 | [Wikipedia, *Mining industry of the Democratic Republic of the Congo*](https://en.wikipedia.org/wiki/Mining_industry_of_the_Democratic_Republic_of_the_Congo) | read (full) | 2024 share range; >95% export reliance; EGC/Gécamines; 13 Mar 2026 gold refinery; EVelution–EGC–Trafigura MOU; carries S9 as its citation |
| S17 | [Wikipedia, *DRC–United States relations*](https://en.wikipedia.org/wiki/Democratic_Republic_of_the_Congo%E2%80%93United_States_relations) | read (full) | **LLM-content warning banner (Oct 2025)**; events corroborated by cited WSJ/Reuters/BBC pieces (not fetchable: Reuters 401) |
| S18 | [Wikipedia, *Sociedad Química y Minera*](https://en.wikipedia.org/wiki/Sociedad_Qu%C3%ADmica_y_Minera) | read (full) | SQM history; Atacama operations; unresolved water dispute; Tianqi stake |
| S19 | [Wikipedia, *Cobalt*](https://en.wikipedia.org/wiki/Cobalt) | read (partial) | Feb 2025 ban corroboration; 2018 mining-code "strategic metals"; Indonesia cobalt 1,300→20,500 t |

**Team inputs reused (not new retrieval).** `data/layers.json` supply-chain shares (rough model,
cited as such); `data/windows.json` Australia window (now traced to `[S2]`); the Canada–Cohere
retained record `[S6]`; gszep's six-conditions post (12 Oct 2026) for the CPTPP Art. 14.13
constraint on local-compute requirements, which applies to Australia, Canada, Chile, Peru and
other CPTPP members.
