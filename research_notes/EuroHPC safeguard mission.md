# EuroHPC safeguard mission: research note

> **WIP expansion:** see the integration qualification at the top of the linked mission report. New interpretations, audit-log reach, report-delay remedies and the Q&A cut-off are not approved operational findings. The route explorer relies on the narrower reviewed draft notification/remedy path.

**Observation date: 2026-10-31.** Research note for the mission report [reports/EuroHPC safeguard mission.md](../reports/EuroHPC%20safeguard%20mission.md). This file owns the evidence detail, quotes and claim ledger; the report owns the mission card, questions, consent/effort, measurability and demo narrative.

**Scope of this note.** EuroHPC AI Gigafactory CfT EUROHPC-2026/OP/0008: an implementable incident-reporting and escalation mission, including model-originated security incidents, inside the published draft contract. Not a model-release veto.

**Method.** Reuse of the retained, hashed primary sources indexed in [data/finance-research/sources.json](../data/finance-research/sources.json), plus fresh locator checks in the retained page-labelled extractions in `.local/finance-evidence/` (git-ignored; hashes in `retrieval-manifest.json`). Every clause cited below was re-read in the retained extraction during this task unless marked otherwise. No new downloads, no external contacts, no spending.

**Claim vocabulary (used inline below):**
- **[observed]** — read directly in a retained source this task (2026-10-31), with locator.
- **[reported]** — from another researcher's note; not load-bearing in this note (every load-bearing claim here was re-checked).
- **[inference]** — interpretation of observed text; stated as interpretation, not as the text's meaning.
- **[proposal]** — a design proposal; no acceptance by any party is implied or established.
- **[out of set]** — document not in the retained corpus; undecided, not refuted.

**Source key** (URLs in [sources.json](../data/finance-research/sources.json); S-numbers match the follow-up report):

| Key | Source | Date | Hash (SHA-256, first 16) |
|---|---|---|---|
| **F** | Annex 3 Model FWC v2, 86 pp. (S1) | Ares(2026)9952478, 22/10/2026 | `773c9456913f6d7b` |
| **TS** | Tender Specifications v2, 135 pp. (S4) | Ares(2026)9990852, 23/10/2026 | `d64a3d7ab6938392` |
| **CH** | History of changes, 3 pp. | Ares(2026)9990862, 23/10/2026 | `228cebb0a0fe0bb1` |
| **A2** | Annex 2, participating states and contributions, 8 pp. (S5) | Ares(2026)7487282, 30/07/2026 | `4e934dee3e304269` |
| **PORT** | Portal rendered capture, 646 lines (S6) | 31/10/2026 | `5880352ef86e55ea` |

Locators cite PDF page numbers (stable) plus extraction line numbers in `.local/finance-evidence/eurohpc-framework.txt` etc. (convenience).

---

## 1. Fresh verification performed this task

| Locator | What it supports | Label |
|---|---|---|
| F I.11.2 (p.16; L641-645) | Contractor duty to ensure AIGF security incl. "incident detection and response" | observed |
| F I.11.5 (p.16; L652-655) | AIGF must comply with GDPR, **AI Act (Regulation (EU) 2024/1689)**, Data Act, Data Governance Act | observed |
| F I.11.7 (p.16; L659-660) | Inform Contracting Authorities **and users** "without delay" about incidents impacting use of the AIGF or delivery of services | observed |
| F I.14.1 (p.19; L780-789) | Security/integrity/confidentiality duty; prevent/manage "cyber-attacks and unauthorised access and use, and **misuse of the technology** by all means"; "reporting of significant incidents to the relevant authorities without undue delay" | observed |
| F I.14.3(c) (p.20; L821-830) | End-user screening/supervision "in full to the AIGF facility **in its entirety, without exception**", explicitly incl. anchor-customer capacity; obligations passed on **in writing** to any third party acquiring access time | observed |
| F I.14.6 (p.20; L842-848) | The notification duty (quoted §2) | observed |
| F I.14.7 (p.20; L849-853) | The request power (quoted §2) | observed |
| F I.15.2, I.15.3 (p.21; L863-875) | User terms of use (acceptable use, data protection, confidentiality, security); Contractor's right to suspend/restrict a risky end user, notifying CAs "without undue delay" | observed |
| F I.16.2-I.16.5 (pp.21-22; L888-929) | PGB composition and 75% voting; quarterly information; PGB suggestion power (eligibility compliance); prior approvals + II.18 backstop | observed |
| F I.17.4 (p.23; L956-959) | No dedicated/isolated infrastructure access "unless expressly agreed otherwise in writing" | observed |
| F I.19.1-19.4 (p.24; L985-1000) | Traceable/auditable registration of access-time usage; quarterly usage info incl. **categories of users and country of establishment**; annual audit report by 31 January; JU right to audit allocation and usage (II.24) | observed |
| F I.20.1-20.2 (p.24; L1002-1006) | User-created IP remains user property; Contractor retains rights in infrastructure/software/underlying technology | observed |
| F I.21.2(a)-(f), I.21.3-4 (pp.24-25; L1013-1032) | Annual review incl. (c) operational incidents and corrective actions, (e) security/compliance updates (cybersecurity incidents, patches); quarterly summary operational report with incident reports; possible written action plan | observed |
| F I.23.3 replacing II.15 (pp.28-30; L1162-1258) | Reporting-deliverable delay damages **EUR 100 per day per report, capped EUR 25,000**; milestone delay 0.001×V/week capped 5%; scheduled-access credits 1%/day capped 20%; capacity-shortfall table + 100% make-up capacity; annual LD cap 10% of yearly SC value | observed |
| F II.18.1(c), (p) (pp.53-54; L2229-2233, L2278-2280) | Material-breach ground; security/confidentiality termination ground (quoted §2) | observed |
| F II.18.3 (pp.54-55; L2288-2321) | Termination procedure: formal notice + grounds; 15 days for observations; final decision with effect date; transition assistance at no additional cost unless substantial additional resources shown | observed |
| F II.18.4 (p.55; L2322-2337) | Termination damages incl. replacement-contractor cost; 60-day final reports | observed |
| SC Art. 11.5 (p.72; L2914-2918) | Reasonable-effort SLA accommodation (quoted §2) | observed |
| SC Art. 12.2, 12.44 (pp.72-73; L2929-2944) | Scheduling requests carry workload criticality classification; each workload designated Critical/High/Medium/Low incl. "security implications" and "public service impact" | observed |
| F Appendix II §3-§7 (pp.82-84; L3215-3274) | Incident severity matrix with response/resolution clocks; crisis unit after 24h unavailability; **RCA within 5 business days**; four-step escalation; maintenance notice; regression testing "deployed models and training environments"; backups; **12-month inference audit logs**; versioning/rollback + prior notification of material infrastructure changes affecting model outputs; monthly SLA/usage/incident reporting | observed |
| F Appendix III (p.85; L3282-3297) | Monthly status reports must include (b) "major incidents, deployment of new or changed services" and (d) detected non-conformities | observed |
| TS L3 definition + anchor/sovereignty (pp.14, 19; specs txt L687-696, L322-335) | L3 = MaaS incl. "AI guardrails for safety and compliance"; anchor customers "may not be subject to the overall conditions of sovereignty of the AIGF" but infrastructure must ensure no data leakage/unauthorised access; AIGF complies with GDPR and AI Act | observed |
| TS scored criteria (p.55; specs txt L2560-2574) | "Advanced AI guardrails", "safety compliance tools", "auditing mechanisms that align with the EU AI Act" are **scored** (25 points, L3), not obligations | observed |
| A2 pp.5, 8 (L229-258, L373-386) | Lot 1: Phase 1 **EUR 100m per FWC** (up to 4), Phase 2 estimated max EUR 400m per FWC subject to MFF; 17% IT CAPEX cap; 13 NCAs listed. Lot 2: EUR 200m/800m per FWC (up to 3); 5 NCAs (PT, ES, IT, DE, EL) | observed |
| CH pp.1-3 (whole file) | Corrections TS v1→v2; **clerical corrections to FWC v1→v2 are all cross-reference fixes** (I.5.2, I.21.1, I.11.1, Appendix III audit due date) — the pack is still moving; numbering must be re-checked at signature | observed |
| PORT announcement (L74-89) | Lot 1 deadline extended to **04/02/2027 17:00 Europe/Luxembourg**; Lot 2 unchanged **03/12/2026 17:00**; "Last update on 26/10/2026 18:11"; portal records "will be reflected ... shortly" | observed |
| PORT Lot 1 milestone block (L148-157) | Same page still displays the **stale** Lot 1 deadline 03/12/2026 17:00 **and** "Contracting authority is not bound to reply to questions submitted after **25/11/2026 23:59** Europe/Luxembourg" | observed |
| PORT Q&A items | 108458 (23/10) states both deadlines incl. Lot 1 = 4 Feb 2027; 109115 (29/10) confirms the extension decision; 109243 (30/10) Lot 2 multi-site; 109284 (30/10) cites Art. 2(3f) of the EuroHPC Regulation as defining the "AI gigafactory Hosting Agreement" (question text; answer truncated in capture) | observed |
| PORT Q&A scan | No retained Q&A item addresses incident-reporting scope, model-originated incidents, or evaluator access (bounded: 375 truncated items; absence of a Q&A ≠ absence of an answer) | observed |

Amount context (all [observed]): portal estimated total value EUR 10,000,000,000 is a call estimate, not funding paid; Lot 1 estimated value EUR 4bn, 4 awarded consortia. **EUR 100m is the Lot 1 Phase 1 per-FWC EU ceiling, not the call amount.** Phase 2 ceilings are "estimated max ... subject to the availability of Union funds" (A2). Different scopes; never additive.

## 2. The chain as written (all quotes [observed])

**The strongest draft path: I.14.6 → II.18.1(p) → II.18.3.**

> "**Any security breach, including cyberattacks, or any other physical or digital breach related e.g. to the premises, systems, data or personnel used by any involved entity, even if not directly related to the Union / Participating States-supported activities, shall be notified to the Contracting Authorities without delay** and any information on the breach and subsequent investigations shall be shared on an ongoing basis. In case of any such security breach, a plan for corresponding mitigation and resilience measures must be notified to the Contracting Authorities and implemented." — F I.14.6, p.20 (L842-848)

> "(p) where the contractor or any related entity or person has violated any provisions on security and confidentiality included in Articles I.14 and II.8 of the FWC or specific contracts signed to implement it." — F II.18.1(p), p.54 (L2278-2280) (termination ground)

> "A party must formally notify the other party of its intention to terminate ... and the grounds for termination. The other party has **15 days** following the date of receipt to submit observations ... the party intending to terminate must formally notify the other party either of the withdrawal of its intention to terminate or of its final decision to terminate. In the cases referred to in points ... (k) to (p) ... the date on which the termination takes effect must be specified in the formal notification." — F II.18.3, pp.54-55 (L2288-2302)

Supporting machinery, same chain: I.11.2 and I.11.7 (duty to detect/respond; inform CAs and users without delay); I.14.1 (significant-incident reporting to relevant authorities; "misuse of the technology"); Appendix II §3 (severity matrix; crisis unit after 24h; RCA within 5 business days; four-step escalation to the CA's responsible person); Appendix III(b) (monthly major-incident reporting); I.21.2(c),(e) (annual review of operational and cybersecurity incidents); I.23.3 (EUR 100/day per delayed report, capped EUR 25,000 — the draft already prices delayed incident reporting); II.18.4 (termination damages); I.10.2 courts (per sources.json; General Court → CJEU).

**The two request provisions — powers, not switches (all quotes [observed]):**

> "The Contracting Authorities may, **at any time, request** the Contractor to take additional appropriate measures to ensure that the Union's and National Contracting Authorities' interest on grounds of security or public order are safeguarded. These measures could include, but are not limited to, the appropriate handling of confidential information or **limitation of certain entities in specific operational activities of the AIGF**." — F I.14.7, p.20 (L849-853)

> "The Contracting Authority (-ies) may **request** the Contractor to implement additional specific technical requirements/SLAs ... The contractor shall make **every reasonable effort** to accommodate such requests **at no additional cost** for the contracting authority (-ies)." — SC Art. 11.5, p.72 (L2914-2918)

[observed, textual] Neither provision states a compliance deadline, defines "appropriate", or creates a clause-specific remedy. I.14.7 is a request power; SC 11.5 is a reasonable-efforts accommodation. **[inference]** They are levers whose acceptance and enforceability must be established case by case; they are not automatic unilateral safeguards. The follow-up report's integration decision to lead with I.14.6 (a stated duty) rather than I.14.7 (a request) is confirmed by the text.

## 3. Incident scope: infrastructure vs model

| Zone | Contents | Status |
|---|---|---|
| **A — covered, infrastructure/service security** | Breaches of premises, systems, data, personnel used by any involved entity, even if unrelated to supported activities (I.14.6); service-affecting incidents (I.11.7; App. II §3); significant incidents to relevant authorities (I.14.1); cybersecurity incidents in annual review (I.21.2(e)) | **[observed]** duties exist in draft; scope is infrastructure, systems, data, personnel, services |
| **B — model-originated security incidents** | Hypothetical scenarios (proposed taxonomy, not contract text): cross-tenant data exfiltration via a hosted or fine-tuned model; model-mediated intrusion or privilege escalation; theft/unauthorised transfer of model artefacts stored on AIGF systems; use of facility services to defeat access controls; a trained model as an attack vector against the facility or other tenants | **[inference]** Plausibly inside Zone A — I.14.6's list is introduced by "e.g." (illustrative), says "used by **any involved entity**", and extends "**even if not directly related** to the Union/Participating States-supported activities"; I.14.1 adds "misuse of the technology". **Not established**: no model-incident taxonomy exists; no explicit duty that a tenant report model incidents to the Contractor or the buyer; the I.14.3(c) written flow-down covers screening/supervision, and the FWC does not prescribe the safety content of the I.15.2 user terms. This zone is the mission's target; whether it is covered **needs interpretation by the contracting authority** |
| **C — model harm outside security framing** | A model producing harmful outputs or exhibiting dangerous capabilities where AIGF systems, data or personnel are not breached or threatened | **[observed]** no located duty in the retained text (no model-harm reporting, no pre-release evaluator access, no release approval). **[inference]** Not claimed as covered; also not claimed as categorically excluded — general breach grounds (II.18.1(c) material breach; II.17.2 suspension incl. verification of suspected breach) do not by their terms exclude security-related or model-risk facts, but nothing located makes Zone C a contractual duty. Do not stretch I.14.6 into a harm-reporting or release-veto clause |

**Anchor-customer boundary.** [observed] TS p.19 says anchor customers may keep operational autonomy and "may not be subject to the overall conditions of sovereignty of the AIGF"; but F I.14.3(c) says end-user screening/supervision obligations "shall apply in full to the AIGF facility in its entirety, **without exception**", "explicitly includes any compute capacity managed, partitioned, or commercialised by potential anchor customers", and must be passed on in writing to any third party acquiring access time. [inference] The FWC text is the broader security reach; the specs' exemption is labelled as a *sovereignty* exemption, not a security exemption. Whether security-incident notification reaches events on anchor-customer capacity is exactly the question to put to the contracting authority — the two texts pull in different directions and no retained Q&A resolves it.

**Evidence-availability ambiguity (new this task).** [observed] Appendix II §6 requires "full audit logs for AI inference use (access events, inference metadata, system changes) for a minimum of 12 months" and "controlled deployment, versioning, rollback procedures, and prior notification of material infrastructure changes affecting model outputs". [inference] It is undetermined whether "AI inference use" covers tenant workloads' inference or only the Contractor-provided L3 inference service; after an incident this decides what evidence exists. Add to the clarification questions.

## 4. The weights/IP boundary (the limit on the limit)

[observed] I.20.1: "All intellectual property created by the users using the AI compute capacity of the AIGF shall remain property of each user." No explicit weight-custody, key-custody or evaluator-access right was identified in the retained text.

[observed] I.14.6 covers breaches "related e.g. to the premises, **systems, data** or personnel used by any involved entity". [inference] Therefore user ownership of model weights does **not** place weights outside the contract's security duties: theft, exfiltration or unauthorized transfer of weight files stored on AIGF systems is a breach of "systems" and "data" regardless of who owns the IP. The supported narrow statement is: **no custody/inspection right over weights was identified; weights are not outside security duties.** A categorical claim in either direction would overreach. This matches the follow-up report's "Important limit on the limit".

## 5. Mission parameters (nine fields)

| Field | Value | Label/locator |
|---|---|---|
| **Holder** | Contracting Authorities: EuroHPC JU + the National Contracting Authorities (18 NCAs listed in Annex 2: 13 Lot 1 — CZ, DK, FR, IE, FI, EE, LV, PL, HR, HU, LT, SK, SE; 5 Lot 2 — PT, ES, IT, DE, EL). Separately, the PGB (Commission + one representative per NCA) holds quarterly-information and eligibility-scrutiny rights (I.16.3, I.16.4) | observed, A2 pp.5, 8; F I.16.3-16.4 |
| **Obligor** | The Contractor (AIGF Consortium: Coordinator + Hosting Entity). Tenants/anchor customers are third parties reached only via the Contractor's I.15.2 terms of use and the I.14.3(c) written flow-down | observed, F I.15.2, I.14.3(c); follow-up report |
| **Instrument** | Annex 3 Model FWC v2 to CfT EUROHPC-2026/OP/0008 — **draft, unsigned**; contractor placeholder; tenderers confirm prior acceptance by submitting (adhesive, not signed). Signature + first Specific Contract create the obligations | observed, sources.json instrument_status_basis; F |
| **Decision window** | Pre-award: Q&A cut-off displayed 25/11/2026 23:59 Europe/Luxembourg (in a Lot 1 milestone block that also still shows the stale 03/12/2026 deadline); Lot 2 tenders due 03/12/2026 17:00; Lot 1 tenders due 04/02/2027 17:00 per the 26/10/2026 announcement — same page's Lot 1 record still displays 03/12/2026 (conflict retained, do not resolve). Post-award: duty live on FWC signature; I.14.7 "at any time"; SC 11.5 during each Specific Contract; quarterly PGB information; annual review | observed, PORT L74-89, L148-157 |
| **Security incident trigger** | The I.14.6 text quoted in §2, plus I.11.7/I.14.1/App. II §3/App. III(b). For the mission's proposed extension: the Zone B definition in the report | observed (existing text); proposal (extension) |
| **Deliverable** | (1) a published, dated Q&A interpretation on Zone B scope; (2) clause-survival re-check at signature; (3) an agreed incident-notification protocol at SC 11.5; (4) standing escalation use (PGB info, I.14.7, monthly reports, annual review) | proposal, all four |
| **Verifier** | CAs as notification recipients; JU access-time audits (I.19.4, II.24); PGB quarterly information (I.16.3-4); monthly status reports (App. III); annual review (I.21.2). Mission artifacts are checkable by anyone: published Q&A ID+date; signed SC annex; report lines | observed (mechanisms); proposal (their use) |
| **Remedy** | II.18.1(p) termination via II.18.3; I.23.3 service credits incl. EUR 100/day per delayed report (cap 25k); II.6.3 damages capped 3× relevant Specific Contract with II.6.4 displacement; II.18.4 termination damages; I.10.2 court review (per sources.json locators) | observed, draft text |
| **Due process** | II.18.3: formal notice + grounds; 15 days for observations; final decision with stated effect date; transition assistance at no additional cost unless substantial additional resources demonstrated. Contractor-side: I.15.3 suspension with notification to CAs without undue delay. II.17.2 suspension incl. verification of suspected breach (per sources.json) | observed, draft text |

## 6. Non-claims (do not cross these lines)

1. **No executed agreement was located; that is not proof none exists.** The instrument is a draft model FWC. Nothing here binds EUROHPC-2026/OP/0008 before award. (observed absence, bounded retrieval)
2. **No model-release veto, evaluator access, or weight custody** is claimed anywhere in this mission. The parent synthesis already rejected that reading; the text supports it nowhere in the retained corpus. (observed absence)
3. **I.14.7 and SC 11.5 are not switches.** A request is not a duty; "every reasonable effort" is not "must". (observed text)
4. **User IP ownership ≠ weights outside security duties**; equally, no custody right was identified. (observed + inference, §4)
5. **General breach grounds do not categorically exclude model/security risk** — and nothing located makes model harm a contractual duty either. Both directions of overreach are refused. (observed text + inference)
6. **EUR 100m is the Lot 1 Phase 1 per-FWC EU ceiling**, not the call amount; the EUR 10bn portal figure is an estimate of total value, not funding paid; phase ceilings are conditional and non-additive. (observed, A2 + PORT)
7. **The deadline conflict is retained**: Lot 1 = 04/02/2027 per the 26/10/2026 announcement vs 03/12/2026 still displayed in the lot record. Verify applicable terms before acting; the pack's own cross-references needed clerical fixes (CH). (observed)
8. **No effect size is claimed** for any part of the mission (report section "Measurable mechanism"). The mechanism's measurable claims are existence, timeliness and completeness of reporting artifacts, not reduced incident rates or harm.

## 7. Out-of-set documents (undecided, not refuted)

Council Regulation (EU) 2026/150 (incl. the Art. 2(3f) "Hosting Agreement" definition referenced in Q&A 109284 — question text observed, answer truncated, Regulation not retained); GB Decisions 30/2026, 34/2026, 47/2026; the TED notices; the model Joint Procurement Agreement; the Hosting Agreement; the FAQ; any signed FWC; the AI Act's own text (its incident-reporting obligations are not verified here — I.11.5's compliance duty is observed, its interaction with I.14.6 is a question, not a claim); applicable user terms implementing I.15.2 (none located).

---

## Claim ledger (load-bearing claims only)

| # | Claim | Label | Locator |
|---|---|---|---|
| 1 | The draft FWC contains a security-breach notification duty owed by the Contractor to the CAs, extending beyond supported activities, with a mitigation-plan duty | observed | F I.14.6, p.20 |
| 2 | Violation of I.14/II.8 security/confidentiality provisions is a termination ground, via a notice-and-observations procedure with a 15-day window and stated effect date | observed | F II.18.1(p), II.18.3, pp.54-55 |
| 3 | Delayed reporting deliverables already carry liquidated damages (EUR 100/day, cap 25k/report; annual LD cap 10% of yearly SC value) | observed | F I.23.3/II.15.1, II.15.5, pp.28-30 |
| 4 | I.14.7 is a request power with security/public-order grounds; SC 11.5 is a reasonable-efforts, no-additional-cost accommodation | observed | F I.14.7 p.20; SC 11.5 p.72 |
| 5 | End-user screening/supervision applies facility-wide without exception incl. anchor-customer capacity, with a written pass-on duty | observed | F I.14.3(c), p.20 |
| 6 | Specs exempt anchor services from AIGF *sovereignty* conditions; the FWC security flow-down is not expressed as exempt | observed | TS p.19; F I.14.3(c) |
| 7 | 12-month inference audit logs and versioning/rollback with prior notification of material infrastructure changes affecting model outputs are required of the Contractor | observed | F App. II §6, p.84 |
| 8 | Model-originated security incidents are plausibly but not certainly within I.14.6; no taxonomy, tenant reporting duty, or buyer-side model duty was identified | inference + observed absence | F I.14.6; whole-corpus scan |
| 9 | Weights remain user IP; no custody/inspection right identified; weights on AIGF systems remain within security duties | observed + inference | F I.20.1, I.14.6 |
| 10 | PGB decisions need ≥75% of all voting rights incl. absent members; Commission holds indivisible 50%; NCAs hold 50% by committed contributions — so NCAs alone (≤50%) can never adopt a PGB decision | observed + arithmetic inference | F I.16.2, pp.21-22 |
| 11 | Lot 2 tender deadline 03/12/2026 17:00; Lot 1 04/02/2027 17:00 per 26/10/2026 announcement; same page still displays 03/12/2026 for Lot 1; Q&A cut-off displayed 25/11/2026 23:59 | observed (conflict retained) | PORT L74-89, L148-157 |
| 12 | Lot 1 Phase 1 EU ceiling EUR 100m per FWC (up to 4); Lot 2 EUR 200m (up to 3); Phase 2 ceilings conditional on MFF; 17% IT CAPEX cap; portal estimate EUR 10bn not funding paid | observed | A2 pp.5, 8; PORT L112-113 |
| 13 | The call pack changed in October (specs v1→v2 corrections; FWC clerical cross-reference fixes), so clause numbering must be re-checked at signature | observed | CH pp.1-3 |
| 14 | All mission steps beyond citing existing draft text (clarification question, protocol annex, escalation use, tenant flow-down language) are proposals | proposal | report §"Proposed addition" |

*End of note.*
