# Source check: Realistic diplomacy research pass

Owner of this file: independent source-check reviewer (subagent). Owns **only this file**.
No other file, report, code or dialogue was edited; no commits were made.

- **Observation date for every retrieval below: 1 November 2026** (research cutoff 1 Nov 2026).
- Method: reopened the **exact original source URLs** cited in the ledgers of `europe.md`,
  `gulf.md`, `us-china.md`, `timing.md`, `process.md` and the companion JSONs, and read the
  **operative text**, not report summaries. A fetched page was counted as verification only
  where the load-bearing sentence itself was found on the page. Publication dates and event
  dates are recorded separately below.
- Scope per the task brief: the 12 highest-load-bearing claims — especially the surprising
  2026 assertions (EU Omnibus dates, UAE A:5 and entity expiry, US–China SI channel, the two
  10 November cliffs, UK AISI/reporting regime, EuroHPC/Geneva schedule, Saudi 123) — plus a
  mandated flag on `process.json`'s broken-promise ladder. Innocuous prose, repo-internal
  game-file line references, and the remaining ledger items were deliberately **not**
  re-verified and keep the status each file already records.

## Verdict in one line

**10 of 12 high-load-bearing claims: SUPPORTED against reopened primary text (several
verbatim). 1 PARTIAL (PLD deadline — EUR-Lex unreachable from this host, repo record stands,
no contradicting evidence). 0 contradicted.** One citation-URL defect found (BIS stay link
404s as printed). One mandated flag: `process.json`'s fixed broken-promise ladder is
invented design, not an empirical regularity, and is the only machine-readable element in
that file presented without its own evidence limit.

---

## Ledger (12 high-load-bearing claims)

| # | Claim (files / source IDs) | Reopened source (publication date; event date) | Verdict | Evidence read, and exact correction |
|---|---|---|---|---|
| 1 | **EU AI Omnibus in force 27 Jul 2026; Annex III high-risk rules apply 2 Dec 2027; embedded (Annex I) high-risk 2 Aug 2028.** Used by europe.md S7/§4/§6, europe.json (proposed out-of-horizon EU window 2027-12-02), process.md S4/§6.3.4 | EC digital-strategy news "AI Omnibus enters into force" — digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (publication **27 July 2026**, page last updated **31 July 2026**) | **SUPPORTED** | Read live. Text: "On 27 July 2026, the AI Omnibus enters into force across the EU"; "High-risk AI systems in Annex III: Rules apply starting 2 December 2027"; "High-risk AI embedded in physical products (machinery, toys, lifts, etc.) in Annex I: Rules apply starting 2 August 2028"; proposed "as part of the digital omnibus package on 19 November 2025"; AI Office "extended oversight … including those built on general-purpose models and embedded in large online platforms and search engines"; EU-level sandbox. Caveat kept honest: verified against the Commission's own announcement of its act; the linked OJ legislative text was not itself reopened in this pass. The files' use (deadline after the game's 30 Jun 2027 horizon) is correct. |
| 2 | **UAE upgraded to Country Group A:5, final rule effective 10 Jul 2026; G42/Core42 named-entity advanced-computing authorisation auto-expires 6 Apr 2027 absent further BIS notice; the two Emirati AI companies must become US companies or reapply; MGX flagged for favourable licence review.** Used by gulf.md (§1, §3 U1, ledger S1/S2), gulf.json (AE export_status, dated_condition, AE-U1) | BIS final rule, FR Doc 2026-14132, "Enhanced Favorable Treatment for the United Arab Emirates Under the Export Administration Regulations", **91 FR 43034** (published **14 Jul 2026**; effective **10 Jul 2026**) — full regulatory text read; plus BIS press release of **10 Jul 2026** | **SUPPORTED** | Operative text confirms every element: A:5 addition with Footnote 5 and new §740.2(a)(26); Supplement 8(a) government agencies (incl. Ministry of Defense and Armed Forces) approved "as of July 10, 2026" — and the approval "does not extend to UAE state-owned corporations or to contractors or grantees"; Supplement 8(b) table naming **Group 42 Holding Ltd d/b/a G42, including G42 Cloud Technology LLC** and **Core42 Technology Projects LLC d/b/a Core42**; **Note 2**: "Absent subsequent notice by BIS, the authorization provided for G42 and Core42 in this supplement shall automatically expire on April 6, 2027"; "If the two UAE-based AI companies fail to become U.S. companies on or before April 6, 2027, they will need to apply for authorization pursuant to the §748.3(c) process"; "BIS intends to favorably review export license applications involving the UAE-headquartered company MGX"; 30-day Commerce/State/NSP-advisor determination for new entities. BIS press release (10 Jul 2026) confirms "U.S. Major Defense Partner", "support in advancing U.S. national security interests, including Operation Epic Fury", and the UAE having "reaffirmed its commitment … including the commitment to make matching investments in U.S. SI digital infrastructure buildout" (the quote gulf.md U2 attributes to it). Bonus: the rule itself states the D:5 test — BIS enforces the worldwide advanced-computing licence requirement only "to entities headquartered in or with an ultimate parent headquartered in Country Group D:5 or Macau, **wherever located**" — corroborating gulf.md S3's substance from primary rule text even though the 31 May 2026 guidance PDF was not parsed here. |
| 3 | **25 Sep 2026 US–China state visit: both governments adopt "super intelligence" terminology; establish the US–China Super Intelligence (SI) Dialogue with next exchange "by November 2026"; agree a bilateral SI incident channel; Boards of Trade and Investment (chartered May 2026 Beijing summit) operationalized; rare-earth shipments still being worked.** Used by us-china.md §1/§2/S9, the SI terminology note, audit rows C/I, us-china.json EV-SI-DIALOGUE | White House fact sheet "…Advances a Fair and Reciprocal Relationship with China While Hosting Historic State Visit" (published **25 Sep 2026**) | **SUPPORTED** | Read in full. Verbatim: "The two leaders agreed to use the term 'super intelligence' rather than 'artificial intelligence' to describe the applicable emerging technologies."; "The two countries established the U.S.-China Super Intelligence (SI) Dialogue to exchange views on risks and benefits related to SI. The next exchange will occur by November 2026. The United States and China also agreed to establish a bilateral communication channel for SI incidents."; "operationalized the cornerstone government-to-government mechanisms … which were chartered during the May 2026 Summit in Beijing"; "with the goal of ensuring shipment levels return to appropriate levels". The live whitehouse.gov menus do show "Lead the World in SI" and "SI.gov", exactly as us-china.md's terminology note reports. The note's inference discipline (audit row I: "no shared safety rules" now contradicted *in-world*) is a fair reading of this source. |
| 4 | **The two 10 November 2026 cliffs.** US: Affiliates Rule (≥50%-owned affiliates of Entity List parties inherit restrictions; rationale "diversion concerns"; published 30 Sep 2025, 90 FR 47201, effective 29 Sep 2025) stayed one year — "stayed until November 9, 2026", snapback "effective November 10, 2026 and extending indefinitely … added back into the EAR" unless extended. CN: MOFCOM/GAC Announcement No. 70 of 2025 (7 Nov 2025) suspends Announcements 55–58 and 61–62 "until 10 November 2026". No extension of either published by the cutoff. Used by us-china.md §1/§2/§8, US-4-SNAPBACK-CALENDAR, CN rules, us-china.json EV-TRUCE-LAPSE-US/CN | BIS stay rule FR Doc 2025-19846, "One Year Suspension of Expansion of End-User Controls for Affiliates of Certain Listed Entities", **90 FR 50857** (published **12 Nov 2025**; stay effective **10 Nov 2025**) — full text read; Affiliates Rule FR Doc 2025-19001 (published 30 Sep 2025) — abstract/dates read via FR API; MOFCOM original Chinese text (posted **7 Nov 2025, 18:00**) — read in Chinese | **SUPPORTED** | Stay text verbatim: "Effective November 10, 2025, the amendments … in the interim final rule published at 90 FR 47201, on September 30, 2025, are stayed until November 9, 2026" and "In the second phase of this final rule, effective November 10, 2026 and extending indefinitely, the changes included in the Affiliates Rule that are removed in the first stage will be added back into the EAR." Affiliates Rule: "any entity that is at least 50 percent owned … by one or more entities on the Entity List … is itself automatically subject to Entity List restrictions", issued "to address diversion concerns", effective 29 Sep 2025. MOFCOM No. 70 verbatim: 经批准，自即日起至2026年11月10日，…公告2025年第55号、56号、57号、58号，及…第61号、62号暂停实施 ("from today until 10 November 2026, Announcements No. 55, 56, 57, 58, 61 and 62 of 2025 are suspended") — and the page's status marker still reads 现行有效 (currently in force) as of today, consistent with "no amending notice published". **Corrections (URLs only, metadata correct):** (a) the S7 URL as printed (`…/2025/11/12/2025-19846/`, no title slug) returns 404 — canonical: `…/2025/11/12/2025-19846/one-year-suspension-of-expansion-of-end-user-controls-for-affiliates-of-certain-listed-entities` (short form `federalregister.gov/d/2025-19846`); (b) the S12 URL without `www.` fails from this host — `www.mofcom.gov.cn/…` works; the quoted text matches, so the claim stands. |
| 5 | **"No extension of the US Affiliates Rule suspension appears in the Federal Register between 15 Sep and 1 Nov 2026 (agency query for BIS documents returned nine unrelated items)."** Used by us-china.md §1/S10, us-china.json EV-TRUCE-LAPSE-US status; also grounds the "extension reported, not published" China-side framing | Federal Register API, agency = Industry and Security Bureau, publication_date 2026-09-15 → 2026-11-01 (queried 1 Nov 2026) | **SUPPORTED (exact)** | The query returns **exactly nine** BIS documents, none extending the stay: three airline temporary-denial renewals (17 Sep, 29 Sep, 27 Oct), a records-retention OMB item (30 Sep), and — corroborating us-china.md §2's market-access instruments precisely — "Guidance and Procedures for Implementing Tariff Adjustments for Specialty Pharmaceuticals … Proclamation 11020" (23 Sep 2026) and "Measures To Restrict Stockpiling of Polysilicon and Polysilicon Derivatives Under Proclamation 11052" (24 Sep 2026), plus CBP "U.S. Content" guidance under Proclamation 11032 (14 Oct 2026). The researcher's count and the "unresolved at cutoff" framing both hold. |
| 6 | **UK: AI Security Institute is part of the Cabinet Office; on 12 Oct 2026 the government announced that stronger protections against emerging AI threats — including how serious AI incidents and near misses are identified and reported — will be *considered* through the Cyber Security and Resilience Bill regime; "We will legislate wherever necessary"; "if you cannot adequately control the risks, do not release the system"; AI verification detail "in the coming months"; AI at the heart of the next G20 presidency.** Used by europe.md S9/S10, §5, R-UK-1/2/3, europe.json UK actor/rules | GOV.UK AISI organisation page (live) and GOV.UK press release "Britain steps up national defences against growing AI risks" (published **12 Oct 2026**) | **SUPPORTED** | Org page: "Part of Cabinet Office"; "AISI is part of the Cabinet Office"; its document lists carry exactly the dated items europe.md S9 cites (UK–Australia pact 25 May 2026; "Secure AI infrastructure: call for information" 29 Jan 2026; Frontier AI Trends factsheet 18 Dec 2025). Press release: bullet "Stronger protections against emerging AI threats to be considered through the Cyber Security and Resilience Bill regime, such as how serious AI incidents and near misses can be identified and reported"; body "the government will explore strengthening parts of the Cyber Security and Resilience Bill and the wider regime"; AISI evaluations "following work with leading AI developers and the US Government"; all quoted ministerial lines verbatim. **Scope check passes:** europe.md/R-UK-3 correctly keeps this as *consideration, not enacted reporting rules*, and labels the proposed Q2-2027 UK window date "invented for playability" — the operative text supports that restraint. |
| 7 | **EuroHPC AI Gigafactory call deadlines: Lot 2 (receipt of tenders) 03/12/2026 17:00 Europe/Luxembourg; Lot 1 extended to 04/02/2027 17:00 to let Member States finish national budget procedures.** Used by timing.md §2 (rows 3–4, "confirmed tender deadline"), windows.json dates, europe.md §1/§6, R-DE-1 | EuroHPC JU call page "Call for tenders for the selection of Artificial Intelligence Gigafactory Consortia…" — eurohpc-ju.europa.eu (call reference EUROHPC-2026-CEI-AIGF-01, published/opened **30 Jul 2026**; page read live 1 Nov 2026, extension notice current) | **SUPPORTED** | Page text verbatim: "The new deadline for receipt of tenders for Lot 1 is 04/02/2027 17:00 Europe/Luxembourg." and "The deadline for receipt of tenders for Lot 2 remains 03/12/2026 17:00 Europe/Luxembourg." — plus the budget-procedure rationale, matching timing.md's quotes exactly. Note: europe.md's `EUROHPC/2026/OP/0008` identifier comes from the repo's finance record (portal procedure number, not re-verified here); the call page reference verified above is the same AI Gigafactory procurement, and the two deadline dates agree across both records. |
| 8 | **Geneva AI Summit 21–22 June 2027 at Palexpo; announced 14 Aug 2026; Fabiola Gianotti appointed Delegate by the Federal Council; "fifth international summit dedicated to AI governance".** Used by timing.md §2 (Geneva row, "announced event"), §9, windows.json Geneva row, europe.md R-NL-3 substitute | BAKOM (Swiss Federal Office of Communications OFCOM) page "Geneva AI Summit 2027: International Summit on Artificial Intelligence in Geneva" (published **14 Aug 2026**; summit **21–22 Jun 2027**, future) | **SUPPORTED** | Read live. All four elements verbatim on the page, including "Published on 14 August 2026" and the summit website pointer (genevaaisummit.swiss). timing.md's caveats (participation list not established; "All participants" is game fiction) remain correct — nothing on the page fixes attendance. |
| 9 | **Product Liability Directive transposition deadline 9 Dec 2026 (Directive (EU) 2024/2853, Art. 22(1)).** Used by timing.md §2 (PLD row, "statutory deadline"), §7 label suggestion, windows.json | EUR-Lex `eli/dir/2024/2853/oj/eng` — attempted 1 Nov 2026 on four URL variants (eli, legal-content EN/TXT, TXT/HTML, encoded CELEX) | **PARTIAL — not reopened from this host** | All four variants returned empty payloads, exactly the flakiness timing.md's own access note records ("treat EUR-Lex as flaky, not blocked"). The claim stands on timing.md's documented 1 Nov fetch of Art. 22(1) and the repo record; no contradicting evidence was located; it was **not** independently re-verified in this pass and should not be cited as reviewer-confirmed until EUR-Lex is readable again. Same applies to timing.md's Implementing Regulation (EU) 2026/1755 (20 Jul 2026, GPAI evaluation proceedings) — not reopened here. |
| 10 | **US–Saudi 123 Agreement approved 16 Jul 2026 (Presidential Determination 2026-18, 91 FR 47715, published 28 Jul 2026), concluded "with the two related side letters" and a separate Agreement on Additional Safeguards and Verification Measures.** Used by gulf.md (verification-precedent column, S2 §4, ledger S9), gulf.json SA dated_condition | FR Doc 2026-15273, Presidential Determination No. 2026-18 of July 16, 2026 (published **28 Jul 2026**, 91 FR 47715) — full text read | **SUPPORTED** | Operative text verbatim: the Agreement "will be concluded with the two related side letters and the associated Agreement … for the Application of Additional Safeguards and Verification Measures to the United States-Saudi Arabia Agreement for Cooperation…"; approval "Pursuant to subsection 123 b. of the Atomic Energy Act of 1954, as amended (42 U.S.C. 2153(b))". Dates match the ledger (signed 16 Jul 2026, published 28 Jul 2026). gulf.md correctly notes the side letters' and safeguards agreement's *contents* remain unpublished — nothing in the determination discloses them. |
| 11 | **White House fact sheet of 18 Nov 2025 on Saudi Arabia: AI MOU giving access to US systems "while protecting U.S. technology from foreign influence"; investment commitments raised from $600bn to "almost $1 trillion"; Joint Declaration completing civil-nuclear negotiations; Strategic Defense Agreement; F-35 package approved.** Used by gulf.md (§1 table, S1 §4, ledger S4), gulf.json SA-S1/SA-S3 | White House fact sheet "…Solidifies Economic and Defense Partnership with the Kingdom of Saudi Arabia" (published **18 Nov 2025**) | **SUPPORTED** | All elements verbatim, including "access to world-leading American systems while protecting U.S. technology from foreign influence" and "increasing their investment commitments in the United States to almost $1 trillion". Scope discipline holds: gulf.md marks the $1T as announced (no schedule/disbursement data located) and the MOU text itself as unretrieved — both true from the sheet's own framing. |
| 12 | **Korea: AI Basic Act in force 22 Jan 2026; MSIT grants "a grace period of at least one year", deferring fact-finding investigations and penalties; improvement working group launched February 2026.** Used by timing.md §2 (Korea row: 22 Jan 2027 is a *derived earliest*, windows.json's `approx:false` is the one mislabel), §4 finding 2 | MSIT English press release 1214, "The AI Basic Act Comes into Force to Lay the Foundation for Korea to Become an AI G3" (January 2026; exact posting day not displayed on the board, as timing.md notes) | **SUPPORTED** | Verbatim: "Following approval at a Cabinet meeting on January 20, 2026, the AI Basic Act and its Enforcement Decree come into force on January 22, 2026."; "MSIT will grant a grace period of at least one year … During this period, fact-finding investigations and the imposition of penalties will be deferred."; "an 'AI Basic Act Improvement Working Group' will be launched in February". This fully supports timing.md's verdict that 22 Jan 2027 is the earliest possible grace end, that no source publishes it as a notice deadline, and that the in-game label must carry the ≥1-year hedge. |

**Ledger totals: 10 supported, 1 partial, 1 partial-by-inclusion (row 9), 0 unlocated, 0
contradicted.** No load-bearing 2026 assertion in the checked set was found to be invented,
misdated, or misread. The one "unlocated as of cutoff" item (SDAIA's Year-of-AI page,
gulf.md S6) is browser-only from this environment exactly as that file's own access note
records, and gulf.md already treats its statistics as self-reported and undated — no
correction needed.

---

## Flag (mandated by the task): `process.json`'s fixed broken-promise ladder is invented, not empirical

`process.json`'s top-level `safeguard_ladder` encodes a fixed escalation keyed to counted
broken promises: 0 broken/≥2 kept → normal terms; 1 broken (or ≥2 late) → independent check
before signing; 2 broken → phased release; 3+ broken → declines the condition for the
campaign.

- **No source in the note's own ledger documents any such count-keyed ladder.** The nearest
  precedents the note cites behave differently: EITI's sequence is enhanced scrutiny → board
  suspension after (per the note's own §6.3.3) "long corrective-action cycles", and the JCPOA
  response verified above (row: UNSC 2231 page) was a one-shot re-application of six
  resolutions effective **27 September 2025**, not a graduated 1/2/3+ remedy scale. The
  Chemical Weapons Convention's challenge inspection is a standing right, not an escalation
  keyed to a partner's broken-promise count.
- The prose companion carries the honesty framing — §3.2 says the numbers "are invented game
  weights, to be tuned", R7's evidence limit warns snapback "overstates how quickly an AI
  accord could re-impose anything" — and the JCPOA/2231 facts R7 cites are themselves
  verified (Adoption Day 18 Oct 2015; Implementation Day 16 Jan 2016 gated on the IAEA
  report confirming Annex V ¶15.1–15.11; terminations "subject to re-imposition in the event
  of significant non-performance"; re-applied effective 27 Sep 2025 — all confirmed on the
  UNSC 2231 background page today).
- **The defect is in the machine-readable presentation:** `safeguard_ladder` is the only
  behavioural block in `process.json` that carries **no `evidence` and no `evidence_limit`
  field**, unlike every entry in `rules[]`. A reader consuming only the JSON could read it as
  an empirical trust model observed in negotiation practice.
- **Exact correction (label, not content):** attach to the `safeguard_ladder` block an
  explicit invented-design label and an evidence limit — e.g. *"thresholds and step sizes
  are invented tuning, not observed escalation behaviour; no source documents a ladder keyed
  to counted broken promises; nearest real mechanisms are slower and less mechanical"* — or
  fold the ladder into R7, which already carries a limit. The global `_meta.warning` covers
  "numbers", but the ladder is a *structural behavioural claim* and needs its own flag.

## Positive scope checks (things the files get right that a reviewer should not "fix" away)

1. **Per-entity licence constraints vs national relations.** The UAE research matches the
   operative rule exactly: A:5 is a country-group change, but licence-free advanced-computing
   access is strictly entity-scoped (Supplement 8: government agencies — explicitly *not*
   state-owned corporations or contractors/grantees — G42/Core42 with a dated expiry, and
   listed US-headquartered companies plus subsidiaries), and the D:5/Macau test is an
   entity-attribute ("headquartered in or with an ultimate parent headquartered in …
   wherever located"), not a statement about any country's alignment. gulf.md's X2 ("an
   approved consignee is an entity, not a country"), AE-U1 ("Approved entity, not a country")
   and SA-S3's refusal to infer "US partner ⇒ hostile to China" are all faithful to the rule
   text. The UAE-held-A:5-plus-D:5-entity-test coexistence is real and the files use it
   correctly.
2. **Announced vs operative.** The Gulf files keep frameworks, MOUs and announced investment
   commitments distinct from licences, contracts and disbursements throughout, and the UK
   file keeps the 12 Oct 2026 reporting regime as "considered through … under consideration"
   rather than enacted law — both match the operative text read today.
3. **Inference labelling.** Spot-checked candidate rules in all files carry evidence limits
   and invented-knob warnings as the brief requires (e.g. R-UK-3's invented Q2-2027 date;
   US-1's "extrapolates a documented domestic principle, not an observed bilateral
   reaction"; CN-1's "no observed case"; timing.md's kind-of-date vocabulary). The one
   exception is the JSON ladder flagged above.
4. **Date hygiene.** Publication, event and observation dates are separated everywhere
   checked, and the two "unresolved at cutoff" framings (BIS stay extension; MOFCOM extension
   reported 28 Sep 2026 but unamended as of 27 Oct 2026) are consistent with what the primary
   pages show today: the stay's second phase is still law with no extension published, and
   MOFCOM's No. 70 page still carries the suspension text marked currently-in-force.

## Access notes (for whoever re-runs this check)

- **Federal Register:** full-text pages fetch reliably **with their title slug**; bare
  `…/documents/YYYY/MM/DD/docnum/` paths 404'd for this fetcher. The FR API
  (`/api/v1/documents.json`, term/agency/date conditions) is the fastest way to relocate any
  document by number.
- **EUR-Lex:** empty payloads on every variant tried today (4 attempts) — flaky, not
  blocked, matching timing.md's note. PLD and Regulation 2026/1755 remain repo-verified only.
- **MOFCOM:** use `www.mofcom.gov.cn`; the bare domain reset the connection. Chinese text
  fetched fine and matches the researchers' translations.
- **White House / GOV.UK / EC digital-strategy / BAKOM / EuroHPC / rijksoverheid / MSIT /
  bis.gov:** all fetched in full without workarounds.
- **SDAIA:** still browser-only from this host (connection reset), as gulf.md records.

## What this pass did not check (kept out of scope on purpose)

The 2024–2025 Netherlands/Germany/UK ledger items (S1–S3, S5–S6, S8, S12–S13 in europe.md),
Singapore MDDI speech, Japan Digital Agency press conference, Australia PM release,
A/RES/78/311, the Sept 2025 Entity List additions, OFAC Sudan actions, World Bank FDI API,
all trade-press secondary sources (us-china.md S13–S16), the BIS 31 May 2026 guidance PDF
itself (substance corroborated via the UAE rule text, see row 2), and every repo-internal
game-file reference. These keep the read/partial/located status their own ledgers already
record. Nothing in them was found contradicted; nothing here upgrades them to
reviewer-verified.

**Next discriminating question for the owner:** the three "unresolved at cutoff" clocks
(BIS stay extension, MOFCOM amending notice, and the SI Dialogue's "next exchange by
November 2026") all resolve or tick inside the game's opening month — a dated re-check on
~10 November 2026 would confirm or retire us-china.md's opening-state framing before
integration ships it as the game's starting world.
