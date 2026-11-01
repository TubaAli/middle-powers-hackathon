# Gulf actors: the UAE and Saudi Arabia as two governments, not one envoy

Observation date: **1 November 2026**. Research cutoff: **1 November 2026**.
Scope: the `GULF` token in `game/planets.json` (flags `sa`, `ae`) and the two
Gulf routes already in `game/dialogue-authored.json`
(`uae-dubai-agentic-assurance-gate`, `saudi-cst-ai-sandbox-stop-rule`).
Machine-readable candidate rules: `gulf.json` in this folder.

Everything below is either **observed** (document read, locator given), **inferred**
(my reading, marked as such) or **proposed fiction** (a game rule, never a
probability). No real government agreed to any scene. No game file, shared
summary or commit was touched.

---

## 1. The short version

- The UAE and Saudi Arabia are not at the same point in the same queue. By the
  cutoff the UAE holds a **formal, published US export-control upgrade** (Country
  Group A:5, effective 10 July 2026) with entity-level approvals that **expire by
  default on 6 April 2027** — continuation needs a fresh US notice, and the two
  named Emirati AI companies were told to become US companies or reapply. Saudi Arabia holds a
  **political commitment and an AI Memorandum of Understanding** (November 2025),
  a new civil-nuclear agreement with added safeguards (2026), and a domestic
  "Year of AI" (2026) — but **no located equivalent export-control rule**.
  [S1][S2][S4][S6][S9]
- So the UAE's answer to a safeguards proposal is usually *"which approved entity,
  and does Washington still agree?"*. Saudi Arabia's answer is usually *"does this
  bring capability and standing, and does it create a US licensing problem?"*.
- One "Gulf delegation" token lets a player buy consent that neither government
  gave, at a speed neither government works at, and hides the single most
  important fact in this file: **the UAE's access is contractual and dated; Saudi
  Arabia's is aspirational and undated.**

---

## 2. Why one Gulf envoy hides important differences

| | United Arab Emirates | Saudi Arabia |
|---|---|---|
| US export status at cutoff | Country Group **A:5**; UAE government agencies and named approved entities receive advanced computing items licence-free; STA available. Final rule effective 10 Jul 2026. [S1][S2] | **No located equivalent rule.** Advanced-computing flows still run through case-by-case licensing and company deals. Absence of a rule is not proof one does not exist. [S1][S3] |
| Named corporate channel | G42 / Core42 approved, **authorisation auto-expires 6 Apr 2027** absent further BIS notice; MGX flagged for favourable licence review. [S1] | No equivalent named-entity approval located; HUMAIN/PIF not verifiable from official pages I could reach. |
| Who signs | Federal government (Ministry of Defence and agencies approved automatically), plus company-level approvals decided by BIS with State and the White House NSC, within 30 days of request. Dubai entities act separately on service deployment. [S1][S7][S8] | Council of Ministers designated 2026 the Year of AI on 10 Mar 2026; the Crown Prince chairs SDAIA's board; SDAIA runs the national data/AI strategy; CST regulates AI services. [S6] (CST scope from team route research, not re-verified here.) |
| What they are buying | Speed, status (the UAE calls A:5 the first granted to an Arab state) and a place in US AI supply chains; reciprocal investment in US data centres. [S2][S5][S8] | Standing as a global AI hub plus access to US systems, framed as protecting US technology from "foreign influence"; ~$1T investment commitment announced Nov 2025. [S4][S6] |
| Domestic goal statement | UAE strategy aims to be "first in the field of AI investments"; Dubai blueprint targets AED 100bn a year and an AI chief executive in every government entity. [S7] | 2026 "Year of AI"; SDAIA claims 142 government AI officers and 32 data / 13 AI regulatory instruments (self-reported). [S6] |
| Verification precedent | Civil nuclear 123 Agreement; "Major Defense Partner" designation; A:5 described by the UAE as the capstone of "layered commitments". [S8] | 123 Agreement approved 16 Jul 2026 **with two side letters and a separate additional-safeguards and verification agreement**. [S9] |
| Failure mode for a player | Deal binds Dubai services but not Abu Dhabi compute; or approval lapses in April 2027. | Deal is announced, praised, and then waits on a US licence that nobody in Riyadh controls. |

**Design consequence.** If the team keeps one `GULF` token for map simplicity, the
envoy must at minimum carry two separate mandates with different clocks, and the
player must be told which government is answering. A single "Gulf states" reply
that averages these two positions would be the least realistic thing in the game.

---

## 3. UAE — three candidate mechanics

### U1. "Approved entity, not a country" (the dated clearance)

- **Actor.** UAE federal government; G42/Core42 and other approved firms; the US
  Bureau of Industry and Security with the State Department and the White House
  National Security Council.
- **What they want.** To keep licence-free access and the A:5 status that came with
  it. That status is the asset; a safeguards row that puts it at risk is a cost,
  not a favour.
- **Authority / instrument.** Supplement 8 to part 740 of the US Export
  Administration Regulations: named approved consignees, entity-specific scope,
  recordkeeping, and Note 2 stating the G42/Core42 authorisation "shall
  automatically expire on April 6, 2027" unless BIS acts. Approvals are decided
  case by case on "compliance capabilities and track record". [S1]
- **Trigger.** The player asks the UAE to guarantee pre-release testing, an
  off-switch, or incident reporting for a commercial data centre.
- **Conditions.** Government-hosted workloads: the UAE can answer directly.
  Commercial: the answer depends on the company and on a US approval the UAE does
  not issue. Diversion prevention and recordkeeping are already conditions of the
  access. [S1][S2]
- **Time cost.** About one month for a government-agency pilot; two to three months
  for a corporate one, with an April 2027 cliff.
- **Plausible response (proposed, bounded).** Offer a government-hosted pilot and
  describe the commercial case as "subject to approvals"; do not promise a private
  company's compliance. In fiction terms: *accept with a narrower scope*, not
  *accept*.
- **Substitute.** Dubai government-service deployment, where the buyer is the
  emirate rather than a federal security authority. [S7]
- **Evidence limit.** No document I read shows any specific testing or off-switch
  term being agreed with any UAE entity. The rule shows what access costs in
  paperwork, not what safety terms were accepted.

### U2. "Matching investment is the receipt"

- **Actor.** UAE government and sovereign-linked investors; US counterparts.
- **What they want.** Reciprocity: Emirati money into US AI infrastructure in
  exchange for access to US systems.
- **Authority / instrument.** The May 2025 US–UAE AI agreement, which the White
  House describes as including a UAE commitment to "invest in, build, or finance
  U.S. data centers that are at least as large and as powerful as those in the
  UAE", plus alignment of national-security regulations and diversion protections.
  BIS's July 2026 release says the UAE "has reaffirmed its commitment to the
  investment commitments in the framework, including… matching investments in
  U.S. SI digital infrastructure buildout". [S5][S2]
- **Trigger.** The player asks the UAE to pay for, or host, something expensive.
- **Conditions.** Is the ask inside the $1.4 trillion ten-year framework? Does it
  bring a US partner, purchaser or co-signer? If yes, the UAE has a reason to move
  now. If it is a new unilateral cost, it waits.
- **Time cost.** One month when a US counterpart is attached; longer when not.
- **Plausible response.** Counter-offer that pairs the safeguard with an investment
  or procurement line, or asks the player to bring Washington in first.
- **Substitute.** A smaller joint announcement with a US company rather than a
  government-to-government commitment.
- **Evidence limit.** **Announced, not disbursed.** The $1.4 trillion is a
  "framework" and the $200 billion are "deals" announced at a state visit. I found
  no executed contract schedule or disbursement ledger. World Bank recorded
  inward FDI to the UAE was about $48bn in 2025 — useful for scale, but it measures
  money entering the UAE, not Emirati money leaving for the US, so it must not be
  presented as a fulfilment rate. [S11]

### U3. "Two levels of state" (federal security vs Dubai services)

- **Actor.** Federal authorities (defence, foreign affairs, security) versus Dubai
  government entities.
- **What they want.** Dubai wants visible service leadership and adoption speed;
  the federal centre wants strategic standing and no export-control accident.
- **Authority / instrument.** The Dubai Universal Blueprint for AI, with an AI chief
  executive in each government entity and an explicit goal of becoming a hub for
  "AI governance and legislation"; versus federal control of chips, defence and
  foreign security commitments. [S7][S1][S8]
- **Trigger.** The player says "I have a deal with the UAE".
- **Conditions.** Which authority is signing? A Dubai service gate can be agreed
  quickly and verified on real deployments. A federal compute or security
  commitment cannot be delivered by Dubai.
- **Time cost.** One month (Dubai) versus two to three (federal).
- **Plausible response.** The two levels may give different answers in the same
  month, and the emirate's answer may be the more ambitious one.
- **Substitute.** Treat the Dubai route as its own counterparty, as the existing
  game route already does.
- **Evidence limit.** I could not retrieve a UAE approval map. The federal/emirate
  split is documented in the pages above; the specific signatory for a given
  safeguards clause is unknown.

---

## 4. Saudi Arabia — three candidate mechanics

### S1. "The prestige-and-capability bargain"

- **Actor.** Council of Ministers and the Crown Prince (chair of SDAIA's board);
  SDAIA; CST for AI services; MCIT for infrastructure.
- **What they want.** To be seen as a global AI leader and to obtain capability,
  not merely to host other countries' models. The 2026 "Year of AI" is a standing
  and mobilisation project, and SDAIA's own page frames the Kingdom as "an
  international hub" that shapes "global decision-making". [S6]
- **Authority / instrument.** Council of Ministers decision of 10 March 2026;
  SDAIA's National Strategy for Data and AI; the November 2025 AI Memorandum of
  Understanding with the US, which the White House says gives access to US systems
  "while protecting U.S. technology from foreign influence". [S6][S4]
- **Trigger.** The player offers a named joint testing or incident-reporting regime.
- **Conditions.** Shared credit and a capability transfer (evaluation expertise,
  model access, a named institute). A framework that reads as a foreign body
  policing Saudi labs will be narrowed. Reporting and incident definitions are
  easier than a foreign-operated off-switch.
- **Time cost.** One to two months through a regulatory sandbox path; longer if a
  new instrument is needed.
- **Plausible response.** Accept the reporting half, negotiate the enforcement
  half, and ask for the announcement to be jointly branded.
- **Substitute.** A sandbox stop-rule inside one service (the team's existing Saudi
  route), with the national strategy left as context rather than authority.
- **Evidence limit.** No retrieved statement shows Saudi leadership approving any
  specific safety requirement. The team's earlier Saudi route research reached the
  same conclusion. SDAIA's achievement statistics are self-reported.

### S2. "No A:5, so every chip is a licence question"

- **Actor.** Saudi government and its AI/chip buyers; US BIS, State and NSC.
- **What they want.** Access without the appearance of second-tier status.
- **Authority / instrument.** No Saudi counterpart to the UAE's A:5 rule was located.
  The operative US constraint is that a licence is still required for advanced
  computing items to entities headquartered in, or ultimately parented in, Country
  Group D:5 (China) or Macau — "even if the entities themselves are located outside"
  those destinations. That guidance is dated 31 May 2026. [S3]
- **Trigger.** The player asks Saudi Arabia to host compute for a third party, to
  route chips onward, or to host a Chinese-linked operator.
- **Conditions.** Saudi Arabia will check whether the arrangement creates a US
  licensing problem it cannot solve. A verification annex modelled on the 123
  Agreement's additional safeguards and side letters is a plausible, documentable
  way to make a deal signable. [S9]
- **Time cost.** About two months, because the binding decision sits in Washington.
- **Plausible response.** Ask for the US supplier to be named and licensed first;
  decline arrangements that require Saudi Arabia to guarantee someone else's
  export status.
- **Substitute.** A US-supplied, US-licensed facility with Saudi hosting and
  Saudi-funded evaluation.
- **Evidence limit.** Absence of a Saudi rule in the Federal Register as of
  1 November 2026 is not proof that no licences were granted; individual licences
  are not published. This is the single largest gap in this file.

### S3. "Foreign-influence language, not a China flag"

- **Actor.** Saudi government; US negotiators.
- **What they want.** US systems and investment without a public exclusive
  alignment that closes other options.
- **Authority / instrument.** The AI MOU's stated purpose includes protecting US
  technology "from foreign influence"; that is a US condition written into a
  bilateral document, not evidence that Saudi Arabia has chosen a camp. [S4]
- **Trigger.** The player demands that Saudi Arabia "drop China" or sign an
  exclusivity clause.
- **Conditions.** Acceptable: supplier screening, audit rights, end-use assurances,
  a named approved-supplier list. Difficult: a public naming of a third country, or
  a clause that makes Saudi Arabia responsible for another state's conduct.
- **Time cost.** One month if the clause is technical; the deal stalls if it is
  symbolic.
- **Plausible response.** Rewrite the demand into a technical control and keep the
  strategic relationship unlabelled.
- **Substitute.** Apply the D:5 headquarters test to the specific counterparty
  rather than to the country. [S3]
- **Evidence limit.** I did not retrieve a Saudi statement on China policy. The
  argument rests on the wording of the US-side documents and on the licensing rule,
  not on Saudi self-description. Do **not** model "US partner ⇒ hostile to China"
  or the reverse: the UAE is a clear counter-example, holding A:5 status while
  remaining a diversified trading state. [S1][S8]

---

## 5. Cross-cutting rules the game should enforce

1. **Announced is not closed.** Use "commitment", "framework", "MOU" and "deals
   announced" as distinct from "signed contract", "licence granted", "chips
   delivered", "money disbursed". The documents support the first set only.
   [S4][S5][S2]
2. **Corporate acts are not government promises.** G42/Core42 becoming US companies
   is a corporate restructuring with a US regulatory consequence; the UAE
   government cannot simply promise it on a company's behalf. Likewise an approved
   consignee is an entity, not a country. [S1]
3. **The binding clock is often American.** The A:5 approvals, the G42/Core42 expiry
   (6 April 2027) and the 123 Agreement's entry into force are US-side acts. A Gulf
   government can lobby, not decide. [S1][S9]
4. **Enforcement still bites inside the favourite.** In September 2025 the US added
   two UAE-based logistics/trading entities to the Entity List for diversion-type
   conduct. Favourable country status did not immunise the jurisdiction. [S10]
5. **Reactions are design, not measurement.** Each mechanic above is a scripted,
   inspectable response. None is an estimate of what either government would do.

---

## 6. Contradictory evidence and things I could not establish

- **"Operation Epic Fury".** BIS's July 2026 release credits UAE "support in
  advancing U.S. national security interests, including Operation Epic Fury". I
  could not retrieve an official description of that operation, so I do not
  characterise it. It is cited only as evidence that the US executive branch
  publicly links the UAE's export status to security cooperation. [S2]
- **Whether G42/Core42 actually restructured.** Unknown. The rule makes the
  authorisation expire; it does not say the companies will change ownership.
- **Whether Saudi Arabia received equivalent licences.** Unknown and unpublished.
- **Whether the $1 trillion is new money.** The White House describes an increase
  from $600bn to "almost $1 trillion" in commitments. No schedule, no sector
  breakdown, no disbursement data retrieved. [S4]
- **Sudan / RSF allegations.** US sanctions in January 2025 included a UAE-domiciled
  individual linked to a Sudan-related entity. That is evidence about one
  facilitator, **not** evidence of UAE state policy, and I did not retrieve a UAE
  official response. Any game rule that punishes the UAE for Sudan would be
  asserting a contested claim; treat it as a player-raised grievance with an unknown
  answer, not as a fact. [S13]
- **Qatar and Oman.** They appear on the map inside the `GULF` group but are not
  researched here. Do not let a `GULF` modifier silently bind them.

---

## 7. Source ledger

All items were retrieved and read on **1 November 2026**. "Published" is the
document's own date; "event" is when the underlying decision happened. Where a page
is undated I say so rather than inventing a date.

| ID | Source | Published | Event | Status / locator |
|---|---|---|---|---|
| S1 | BIS final rule, *Enhanced Favorable Treatment for the United Arab Emirates Under the Export Administration Regulations*, 91 FR 43034 | 2026-07-14 | Effective 2026-07-10 | **Read, full text.** Sections: A:5 addition; §740.2(a)(26); Supplement 8 (a) government agencies, (b) G42/Core42 table + Note 2 (expiry 6 Apr 2027), (c) US AI companies; MGX review. https://www.federalregister.gov/documents/2026/07/14/2026-14132/enhanced-favorable-treatment-for-the-united-arab-emirates-under-the-export-administration |
| S2 | BIS press release, *Department of Commerce Eases Export Controls for UAE* | 2026-07-10 | Same decision | **Read.** "Major Defense Partner", "Operation Epic Fury", matching US SI infrastructure investment, reaffirmed framework commitments. https://www.bis.gov/press-release/department-commerce-eases-export-controls-uae |
| S3 | BIS guidance, *Regarding Enforcement of License Requirements for Advanced Computing Items for Entities Headquartered in Country Group D:5 and Macau* | 2026-05-31 | Guidance in force | **Read (PDF text).** Licence required even when the entity is located outside D:5/Macau; data-centre operators need not cease existing use. https://www.bis.gov/media/documents/bis-guidance-may-31-2026.pdf |
| S4 | White House fact sheet, *President Donald J. Trump Solidifies Economic and Defense Partnership with the Kingdom of Saudi Arabia* | 2025-11-18 | State visit, same day | **Read.** AI MOU ("foreign influence"), $600bn→"almost $1 trillion", civil-nuclear Joint Declaration, Strategic Defense Agreement, F-35 package approved. https://www.whitehouse.gov/fact-sheets/2025/11/fact-sheet-president-donald-j-trump-solidifies-economic-and-defense-partnership-with-the-kingdom-of-saudi-arabia/ |
| S5 | White House fact sheet, *$200 Billion in New U.S.–UAE Deals… $1.4 Trillion UAE Investment* | 2025-05-15 | Announcement in Abu Dhabi | **Read.** AI agreement; matching US data-centre commitment; regulatory alignment and diversion protections; $1.4T ten-year framework. https://www.whitehouse.gov/fact-sheets/2025/05/fact-sheet-president-donald-j-trump-secures-200-billion-in-new-u-s-uae-deals-and-accelerates-previously-committed-1-4-trillion-uae-investment/ |
| S6 | SDAIA, *The Year of AI* | Page undated; observed 2026-11-01 | Council of Ministers decision **2026-03-10** | **Read.** Designation of 2026 as Year of AI; MBS chairs SDAIA board; National Strategy for Data & AI; self-reported programme statistics. Reachable through the text-extraction client; a direct `curl` from this host resets the connection, so treat the link as browser-only. https://sdaia.gov.sa/en/MediaCenter/Pages/ai-year.aspx |
| S7 | UAE government platform, *UAE Strategy for Artificial Intelligence* and *Dubai Universal Blueprint for AI* | Undated pages; observed 2026-11-01 | Strategy dates not stated on page | **Read.** "First in the field of AI investments"; AED 100bn/year, 50% productivity, AI CEO in each Dubai government entity, "hub for AI governance and legislation". https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/Ai |
| S8 | UAE Embassy Washington, *UAE and US Advance Technology Partnership Agenda in High-Level Washington Engagements* | 2026-10-03 | Meetings that week | **Read.** A:5 as "first ever granted to an Arab state"; layered commitments incl. 123 Agreement and Major Defense Partner; $1.4T framework; named officials and agencies. https://www.uae-embassy.org/news/uae-and-us-advance-technology-partnership-agenda-high-level-washington-engagements |
| S9 | Presidential Determination 2026-18, 91 FR 47715, US–Saudi 123 Agreement | 2026-07-28 | Signed **2026-07-16** | **Read.** Approval under Atomic Energy Act §123(b); "two related side letters" and a separate *Additional Safeguards and Verification Measures* agreement. https://www.federalregister.gov/documents/2026/07/28/2026-15273/presidential-determination-on-the-proposed-agreement-for-cooperation-between-the-government-of-the |
| S10 | BIS rule, *Additions and Revisions to the Entity List* | 2025-09-16 | Same | **Read (UAE entries only).** HAS General Trading LLC and Smart Mail Services (Dubai) added, presumption of denial. https://www.federalregister.gov/documents/2025/09/16/2025-17893/additions-and-revisions-to-the-entity-list |
| S11 | World Bank, *FDI net inflows, BoP* (BX.KLT.DINV.CD.WD), SAU/ARE, 2019–2025 | API observed 2026-11-01 | Calendar-year data | **Read.** Saudi 2025 ≈ $32.6bn; UAE 2025 ≈ $48.2bn. Inward FDI — **not** a fulfilment measure for outbound pledges. https://api.worldbank.org/v2/country/SAU;ARE/indicator/BX.KLT.DINV.CD.WD |
| S12 | DoD arms sales notifications, Saudi Arabia (JDAM-ER; AGT-1500 engines) | 2026-10-19 | Notification | **Read (excerpt).** Continuing defence-transfer pipeline; congressional notification path. https://www.federalregister.gov/documents/2026/10/19/2026-21340/arms-sales-notification |
| S13 | OFAC, *Treasury Sanctions Sudanese Paramilitary Leader, Weapons Supplier, and Related Companies* | 2025-01-07 | Designations | **Read (excerpt).** Hemedti and a UAE-resident individual linked to Capital Tap Holding LLC. One facilitator, not state policy. https://ofac.treasury.gov/recent-actions/20250107 |

**Latest verified evidence:** 19 October 2026 (S12). **Gap to cutoff:** 13 days.
Those 13 days were not searched for Gulf-specific decisions; do not read the
absence as calm.

**Inaccessible / not read:** Saudi Press Agency and WAM (JavaScript-only, no
retrievable text); PIF, HUMAIN and the Saudi Ministry of Investment (blocked);
Saudi MCIT AI pages (403); the text of the US–Saudi AI MOU, the Strategic Defense
Agreement and the two 123 side letters (not published in what I could reach); any
individual export licence, chip shipment volume, or executed investment contract.

---

## 8. Recommended integration (proposal only)

- Keep the `GULF` token if the map needs one, but give it **two named mandates**:
  "UAE (federal; Dubai separately)" and "Saudi Arabia (Council of Ministers /
  SDAIA)". The player should always see which one is speaking.
- Reuse the existing two routes rather than inventing new content: U1/U3 map onto
  `uae-dubai-agentic-assurance-gate`; S1/S2 map onto
  `saudi-cst-ai-sandbox-stop-rule`.
- Add one visible, dated fact to the UAE screen: *entity approvals expire
  6 April 2027*. It is true, checkable, and it explains urgency better than any
  probability.
- Add one visible asymmetry to the Saudi screen: *no equivalent export-control
  upgrade found as of 1 November 2026*. That explains why Riyadh says yes to a
  framework and then waits.
- Never expose a single "Gulf acceptance" number. Show two states with different
  clocks, and let disagreement between them be the content.

---

## 9. Next discriminating questions

1. Did BIS publish any Saudi counterpart to the July 2026 UAE rule, or grant
   individual licences to Saudi buyers, between July and November 2026?
2. Did G42 or Core42 actually become US companies, or request an extension before
   the 6 April 2027 expiry?
3. What do the two 123 side letters and the additional-safeguards agreement
   actually require, and is any of it a template for AI verification?
4. Which UAE federal body, if any, can bind a commercial data centre to an
   off-switch, as distinct from Dubai binding its own services?
