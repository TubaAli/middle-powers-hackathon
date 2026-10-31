# EuroHPC AI Gigafactory contract text: raw-source verification of the tender memo

Observation date: **31 October 2026**. Bounded, source-set verification of `eurohpc-tender.md` (the GLM note). Every clause locator below was read in the retained PDFs or their page-labelled extractions in `.local/finance-evidence/`.

**What this is not.** This is not a completed Deeper Research run. The upstream `nraford7/deeper-research` dispatch preflight returned exit 20 (no Exa key or compatible endpoint); no Exa call or spend occurred. This file applies only the retention, provenance and refutation discipline described in `METHOD.md`. The prior memo is treated as a list of claims to test, never as evidence.

**Verdict vocabulary.** `Confirmed` = text says it. `Corrected` = substance survives, wording/scope/actor is wrong. `Refuted` = text says otherwise. `Unsupported` = no support in this source set, and the claim may still be true elsewhere. `Out of set` = the document is not in the retained corpus, so this file cannot decide it.

---

## 1. Source set, hashes and access status

All four PDFs were downloaded by `curl` with normal TLS verification; extracted texts carry `=== PDF PAGE n ===` markers. Hashes as recorded in `retrieval-manifest.json`.

| File | Manifest URL | SHA-256 (first 16) | Pages | Internal date | What it can and cannot support |
|---|---|---|---|---|---|
| `eurohpc-framework.pdf` / `.txt` | `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Annex%203%20-%20Model%20FWC%20v2_V2.pdf` | `773c9456913f6d7b` | 86 | `Ref. Ares(2026)9952478 - 22/10/2026` | The operative contract text, but a **model/draft** FWC (Annex 3 to the call), not a signed contract |
| `eurohpc-specifications.pdf` / `.txt` | `…/CfT%20AIGF%20-%20Tender%20Specifications%20v2_V1.pdf` | `d64a3d7ab6938392` | 135 | `Ref. Ares(2026)9990852 - 23/10/2026` | Mandatory requirements, award criteria, eligibility, control guidance. Scored criteria are not contract obligations |
| `eurohpc-annex2.pdf` / `.txt` | `…/CfT%20AIGF%20-%20Annex%202_V1.pdf` | `4e934dee3e304269` | 8 | `Ares(2026)7487282 - 30/07/2026` | National contributions, NCA identities, per-FWC EU ceilings |
| `eurohpc-changes.pdf` / `.txt` | `…/History%20of%20changes%20in%20Call%20documents_V1.pdf` | `228cebb0a0fe0bb1` | 3 | `Ares(2026)9990862 - 23/10/2026` | Proves the FWC/specs are **v2 with corrections**, and that the pack is still moving |
| `eurohpc-portal.txt` | **no manifest entry** (captured from the parent tender page `…/tender-details/bc712395-692d-41ab-aa25-8e254ae86eb2-CN`) | none | 646 lines | Announcements dated 19/09, 26/10/2026 | Portal metadata, deadlines, document versions, truncated Q&A list. **Gap: no URL field or hash was recorded for this capture; treat it as secondary to the PDFs** |

Not in the set, therefore `Out of set` throughout: Council Regulation (EU) 2026/150 itself; GB Decisions 30/2026, 34/2026, 47/2026; the TED notices 529135-2026 and 674672-2026; the model Joint Procurement Agreement; the Hosting Agreement; the FAQ; any signed FWC. Claims that rest only on those documents are not refuted here — they are undecided. Several were previously sourced to a third-party tracker; the retained Q&A list contains **none** of the IDs the memo relies on (106705, 107371, 107399, 107993, 106485, 106486, 106075/6, 107989, 106465/7, 106451, 107937), so those figures stay unsupported in this file.

Three date facts worth separating, because the memo merged them:

- Portal **document list** shows Annex 3 Model FWC, the specifications and the change log as `Published on 25/10/2026`; the FWC file itself is `Ares … 22/10/2026`. The **announcement** is headed `Last update on 26/10/2026 18:11` and `(Updated on 26/10/2026)`. So "revised 25 October, announced 26 October" survives, but the documents are older than either timestamp.
- The Lot 1 extension is **not undated**. Q&A 108458, published `23/10/2026 18:24`, already states that "for Lot 1 the deadline is 4 Febr…" 2027. Q&A 109115, published `29/10/2026 19:45`, puts the date in the questioner's words — "On 22 October 2026, the deadline for Lot 1 was extended to 04/02/2027" — and the answer confirms the decision without restating a date. So **22 October is a recorded date, not an official one**; the announcement itself is 26 October.
- Preserve the conflict: the **Lot 1 lot record still reads** `Deadline for receipt of tenders 03/12/2026 17:00` and `Date and time of public opening 04/12/2026 15:00`, contradicting the announcement of 4 February 2027 on the same page. The portal also labels the specifications "Version 1" while the change log describes a v1→v2 correction. Version control on this pack is unreliable.

---

## 2. Five distinctions that decide the conclusions

1. **Draft versus signed.** The FWC is Annex 3, a "Model Framework Contract", portal document type `Draft contract`. It is not executed; no contractor is named (`[Contractor's full official name]`). Tenderers "confirm the prior acceptance of the terms and conditions" by submitting (specs p.21), which makes it adhesive but not signed. Signature, and the first Specific Contract, create the obligations.
2. **Contractor versus tenant.** The obligor throughout is the "Contractor" — the AIGF Consortium, its Coordinator and Hosting Entity. A model developer is a third party: an L3 model-as-a-service provider, an anchor customer, or an end user under I.15. The contract reaches them only through the flow-down in I.14.3(c), and that flow-down is limited to eligibility screening and supervision.
3. **Framework contract versus specifications.** I.1 sets precedence: main conditions, then special conditions, then general conditions, then tender specifications (Annex I), then the tender. Where the specifications grant anchor customers an exception (p.19) and the FWC imposes a duty "without exception" (I.14.3(c)), **the FWC wins**.
4. **Infrastructure security versus model safety versus release veto.** The text is dense on the first, thin on the second, and empty on the third. Do not let "security" in a clause heading carry a safety meaning it does not have.
5. **Request and reasonable effort versus obligation and consent.** The two most useful post-award levers (I.14.7, Specific Contract Art. 11.5) are framed as requests, one with "every reasonable effort" and "at no additional cost". They are not unilateral variation powers.

---

## 3. Claim-by-claim verdicts on the prior memo

| # | Prior claim (paraphrased) | Verdict | What the text actually says, with locator |
|---|---|---|---|
| 1 | Public offtake value EUR 10bn; Lot 1 EUR 4bn / 4 consortia; 78-month framework; open procedure; award by Governing Board on independent experts' evaluation | **Confirmed** | Portal: `Estimated total value 10000000000 EUR`; Lot 1 `4000000000 EUR`, "4 awarded consortia"; `Maximum contract duration 78 MONTH`; `Open procedure`; "the Governing Board will make an award decision". FWC Main Conditions Art. 3: "maximum duration … is 78 months" (p.3) |
| 2 | Phase 1 EU EUR 100m (Lot 1) / 200m (Lot 2); Phase 2 up to 400m / 800m; max 500m / 1bn per AIGF; 17% of IT CAPEX | **Confirmed** | Annex 2 p.5: "Phase 1: EUR 100 million per each FWC (up to 4 FWC)"; "Phase 2 … EUR 400 million per FWC"; p.8: 200m / 800m; both "limited to up to an amount of 17% of the IT CAPEX". Specs p.21 repeats the 17% cap |
| 3 | At least EUR 4–5bn per AIGF, predominantly privately financed; public role limited to anchor customer | **Confirmed** | Specs p.13: "indicatively estimated at least EUR 4–5 billion per AIGF"; "predominantly industrial, market-driven model"; "role of the public authorities is intended to be limited to act as a strategic anchor customer" |
| 4 | 18 JPA signatory states, listed | **Confirmed** | Annex 2 pp.5, 8 list NCAs for 13 Lot 1 states (CZ, DK, FR, IE, FI, EE, LV, PL, HR, HU, LT, SK, SE) and 5 Lot 2 states (PT, ES, IT, DE, EL) = 18, exactly the memo's list |
| 5 | 50/50 L2/L3 for Lot 1, 60/40 for Lot 2 | **Confirmed** | Specs p.16 and p.56 ("50% L2 / 50% L3 for Lot 1; 60% L2 / 40% L3 for Lot 2") |
| 6 | Annual benchmark must reach ≥90% of performance at first installation; breach is an SLA violation | **Confirmed** | Appendix II §2: "benchmarks must be executed regularly (at least every 1 year), achieving at least 90% of the performance measured at the system's initial installation" (p.81) |
| 7 | SLA breach triggers II.15 damages and/or II.16 price reduction, **and** termination under II.18 | **Corrected** | Appendix II preamble names only "liquidated damages in accordance with Article II.15 and/or reduction in price in accordance with Article II.16" (p.81). Termination is available only if the failure is a material breach under II.18.1(c) (p.53). The memo's "and may terminate" is inference, not SLA text |
| 8 | II.15 = "lump-sum damages for delay in delivery" | **Corrected** | I.23.3 replaces II.15 with "SERVICE CREDITS AND LIQUIDATED DAMAGES": milestone delay 0.001×V/week capped at **5%** of the specific contract; reporting delay EUR 100/day capped at EUR 25,000; scheduled-access credits 1%/day up to 20% of affected capacity; capacity-shortfall table (95/90/85%) plus 100% make-up capacity; residual delays 0.3×(V/d) (pp.28–30) |
| 9 | Annual liquidated-damages cap 10% of annual Specific Contract value "in aggregate", with service credits and catch-up capacity outside the cap | **Unsupported** | II.15.5 says only: "The maximum amount of liquidated damages payable per each contract year will be limited to 10% of the yearly value of the specific contract" (p.30). There is no "in aggregate" wording and no carve-out. The carve-out is tracker-derived only |
| 10 | Liability capped at 3× the affected Specific Contract, with carve-outs | **Confirmed, with addition** | II.6.3: "up to an amount not exceeding three times the total amount of the relevant specific contract", displaced for gross negligence, wilful misconduct, personal injury, IP claims (pp.39–40). **Addition the memo missed:** II.6.4 removes the cap entirely where the authority's liability to a third party is established (p.40) |
| 11 | Joint tenderers jointly and severally liable | **Confirmed** | II.6.5 (p.40); specs §8.1 (p.30) |
| 12 | Public Governance Body = Commission + each NCA; Union 50%; 75% contribution-weighted threshold | **Confirmed, with clarification** | I.16.2: Commission holds "50% of the voting rights, which shall be indivisible"; NCAs share the other 50% "in proportion to the total financial contributions committed in Specific Contract(s)"; decisions need "at least 75% of all voting rights, including the votes of members who are absent" (pp.21–22). **Consequence:** neither the Commission nor the NCAs can reach 75% alone; a >25% blocking minority suffices, and absence counts against the mover |
| 13 | PGB prior approval for third-country access agreements, control/ownership changes, relocation of critical assets, strategic-purpose change; termination if done without consent | **Confirmed** | I.16.5(a)–(c) and final paragraph: "the Contracting Authorities reserve the right to terminate the FWC and/or a specific contract in accordance with Article II.18" (p.22) |
| 14 | Core technical operations and data processing cannot be subcontracted outside the EU | **Confirmed** | Specs §8.2: "The subcontracting of core technical operations or data processing to entities established in non-EU third countries is strictly prohibited" (p.32) |
| 15 | If a tenderer relies on a financier's financial capacity, the authority may require the financier to become a contract party or give a first-call guarantee | **Corrected (actor)** | Specs §8.4: "If a successful tenderer intends to rely on another entity to meet the minimum levels of economic and financial capacity, the contracting authority may require the entity to sign the contract or, alternatively, to provide a joint and several first-call financial guarantee" (p.33). The clause names an **entity whose capacity is relied on**, not a "financier"; a lender could qualify, but the label is the memo's |
| 16 | Main subcontractors above 20% economic share face evidentiary rules | **Corrected (scope)** | The 20% test exists only for the Foreign Subsidies Regulation: a subcontractor is "main where … the economic share of their contribution exceeds 20% of the value of the submitted tender", triggering FSR notification/declaration (specs p.24). General subcontractor evidence is Annex 1C + 1D commitment letters (p.32) |
| 17 | Phase 2 is mandatory and integral; refusal after funding confirmation triggers damages and termination | **Unsupported** | The text supports only the *offer*: tenderers "are required to submit a complete project proposal that encompasses both Phase 1 and Phase 2" (specs p.17). The *purchase* is conditional: Phase 2 exists "subject to the availability of additional MFF funds" (p.17) and Annex 2 calls Phase 2 an "estimated max. additional contribution … subject to the availability of Union funds" (pp.5, 8). The consequence of refusal is not in this corpus |
| 18 | Confirmed reserved capacity is paid whether used or not, with ~20% annual rollover | **Confirmed (terminology)** | Specific Contract Art. 14.3: "Payment shall not depend upon actual utilisation" (p.75). Art. 13.2: unused access time "carried forward … provided that it does not exceed 20% of the annual access entitlement" (p.74). It is carry-forward, not rollover of reserved capacity |
| 19 | Contract contains **no incident or security terms**; obligations "stop at infrastructure sovereignty and service quality" | **Refuted** | See §4. I.11.2, I.11.7, I.14.1, I.14.6, I.21.2(c)/(e), Appendix II §3, Appendix III(b), II.18.1(p) are all incident/security terms |
| 20 | No AI-model-safety obligation anywhere in the record | **Confirmed in substance, needs precision** | Correct as to prevent-release testing, evaluator access, weight custody and model-level stop. But the record does contain an AI Act compliance duty on the AIGF (I.11.5, p.16), L3 "AI guardrails", "safety compliance tools" and "auditing mechanisms that align with the EU AI Act" as **scored** services (specs pp.15, 55), and inference audit-log duties (Appendix II §6) |
| 21 | Customer partition autonomy limits how far AIGF rules reach into what tenants run | **Corrected** | True only for sovereignty and data-residency of tenant services (specs p.19). The same document says end-user "supervision and screening … shall apply in full to the AIGF facility in its entirety, without exception", including capacity "managed, partitioned, or commercialised by potential anchor customers", and must be passed on in writing (specs p.9; FWC I.14.3(c), p.20) |
| 22 | Annex 1F(A): "minority blocking rights can count as negative control" | **Refuted as stated** | The guidance says the opposite direction on EU rights: control "through veto or blocking rights by EU shareholder(s) (negative control) is not sufficient as such to exclude influence by non-EU shareholders" (p.119). A separate passage says a simple-majority holder under a supermajority rule "may be sufficient to confer … blocking rights and therefore the power of control" (p.121). Two propositions, conflated in the memo |
| 23 | No weight-custody, key-custody or version-control obligation; no serial-level asset register | **Corrected** | Custody: none, and I.20.1 puts user IP outside the contract ("shall remain property of each user", p.24). But version control **is** required for the contractor's inference service: "controlled deployment, versioning, rollback procedures … prior notification of material infrastructure changes affecting model outputs" (Appendix II §6, p.84). Asset inventory **is** required quarterly: "an inventory (or an update thereof) of the assets and systems of the AIGF" (I.16.3, p.22). Serial-level granularity is not specified |
| 24 | No workload-isolation obligation | **Corrected** | Isolation is tested at acceptance — "strict tenant isolation (logical and physical)" (I.13.4(h), p.18); offered and scored as "dedicated tenants, enclaves/air-gapped zones … independent identity, keys, and monitoring" (specs p.82); and available only by express written agreement — Committed Capacity "shall not constitute dedicated, isolated … access at all times", "unless expressly agreed otherwise in writing" (I.17.4, p.23). No mandatory isolation of a tenant's model |
| 25 | GB Decisions 30/34/47, Regulation 12b text, TED notices, deadlines 3 Dec / 4 Feb, 6-month tender validity | **Out of set** (deadlines partly confirmed) | The retained portal confirms `TED reference 145/2026 529135-2026`, `TED publication date 30/07/2026`, change notice `190/2026 00674672-2026`, and the 3 Dec / 4 Feb dates. Tender validity and the GB documents are not in the corpus |

**Net effect on the memo.** Its central substantive conclusion survives: the contract buys compute and sovereignty, not model behaviour. Its most consequential error runs the other way — it under-read the contract's security, incident, audit and flow-down machinery, and therefore overstated how empty the instrument is and how little a public purchaser can do after signature.

---

## 4. The "no incident or security terms" statement, tested

This claim fails on the face of the text. The relevant provisions, in order:

| Clause | Page | What it obliges | Whose incidents |
|---|---|---|---|
| I.11.2 | 16 | Contractor "shall ensure the security of the AIGF", including "access control, cybersecurity, data protection, **incident detection and response**" | Infrastructure, systems, networks, Hosting Entity data |
| I.11.7 | 16 | Contractor "shall inform the Contracting Authorities **and users without delay** about the incidents impacting the use of the AIGF, or the delivery of the services" | Service-affecting incidents |
| I.14.1 | 19 | Prevent and manage "cyber-attacks and unauthorised access and use, and misuse of the technology", plus "reporting of significant incidents to the relevant authorities without undue delay" | AIGF-wide |
| I.14.3(c) | 20 | Screening/supervision of all end users "in its entirety, without exception", including anchor-customer capacity, passed on in writing to any third party buying access time | End-user eligibility, not incidents |
| I.14.6 | 20 | "Any security breach, including cyberattacks, or any other physical or digital breach … **even if not directly related to the Union / Participating States-supported activities**, shall be notified … without delay", with ongoing information sharing and a mitigation plan | Broadest notification duty in the contract |
| I.21.2(c),(e) | 25 | Annual review of operational incidents, corrective actions, cybersecurity incidents, patches, vulnerabilities | Service and security |
| Appendix II §3 | 82–83 | Incident matrix (Critical/High/Medium/Low), crisis unit after 24h unavailability, RCA within 5 business days, escalation to the authority's responsible person | Service availability |
| Appendix III(b) | 85 | Monthly reporting of "major incidents, deployment of new or changed services" | Service |
| II.18.1(p) | 54 | Termination where the contractor or a related entity "has violated any provisions on security and confidentiality included in Articles I.14 and II.8" | Security breach as termination ground |

So the accurate statement is narrower and more useful: **the contract has a developed incident and security regime at infrastructure and service level, with a termination backstop, but it has no AI-incident taxonomy, no model-harm reporting duty, no notification duty owed by tenants, and no duty that a model developer report anything to the buyer.** The gap is the object of the duty (model behaviour), not the existence of duties.

The same correction applies to "security terms": I.14 runs to two pages and is reinforced by I.11.2–I.11.5, I.12, I.13.4(h), I.18, II.8, II.18.1(p) and II.24.

---

## 5. The six safety conditions against the actual text

| Condition | Status in the draft FWC | Precise hook | Holder of the right | What it does not do |
|---|---|---|---|---|
| **1. Pre-release testing / evaluator access** | Absent for models; present for infrastructure | I.13 Technical Validation Tests by the EuroHPC JU or a body it authorises, gating each phase, with a Technical Validation Certificate and no service before signature (pp.17–19); award benchmark criterion viii (specs p.84); regression testing after significant change (App. II §4) | EuroHPC JU (I.13.3) | Nothing entitles the buyer to test, red-team or inspect a tenant's model before release; I.13 tests the facility against the tender |
| **2. Incident reporting** | Present, infrastructure/service scope | I.11.7, I.14.6, App. II §3, App. III(b), I.21 | Contracting Authorities (JU and NCAs) | No AI-incident categories, no model-harm reporting, no tenant duty except the eligibility-screening flow-down in I.14.3(c) |
| **3. Protected weights** | Absent, and structurally excluded | None for custody or keys. Nearest: I.13.4(h) isolation testing; specs p.82 "independent identity, keys"; App. II §5 backup; App. II §6 versioning/rollback for the contractor's inference service | None over weights; the contractor holds the service-level hooks | I.20.1: user-created IP "shall remain property of each user"; specs p.19 exempts anchor-customer services from AIGF sovereignty and data-residency conditions. Weights are outside the contract perimeter |
| **4. Essential-user continuity** | Partial, different beneficiary | App. II §1 uptime 99.5% general / 99.9% inference, RTO ≤4h, RPO ≤1h; I.17.1 Committed Capacity; SC Art. 13.2 20% carry-forward; II.15 credits and 100% make-up capacity; II.4.12 substitution at contractor's expense; II.18.3 transition assistance "without interruption" | Contracting Authorities, and "essential services" they run (App. II §3 critical class) | No continuity duty toward third-party users of a tenant's model; and II.18.1(k) lets the authority terminate the FWC if its needs change, though ongoing Specific Contracts remain unaffected |
| **5. Known chip locations** | Partial, stronger than the memo allowed | I.14.3 processing units used exclusively for this AIGF, no transfer without explicit agreement; I.14.3(a) no transfer to non-eligible countries; I.14.4 end-of-life export limits; I.16.3 quarterly asset/system inventory; I.16.5(b) relocation of critical assets needs PGB prior approval; I.24.1(j) hosting site must be in a Member State; I.12.1 supplier eligibility | Contracting Authorities; PGB for relocation | No serial-number register, no per-chip movement log, no verification mechanism beyond the unspecified "inventory" |
| **6. Local stop with due process** | Absent for the buyer; present for the operator | I.15.3: contractor "may suspend or restrict" an end user whose activity "poses a risk to the AIGF and its infrastructure, security, or compliance obligations", notifying the authorities without undue delay. II.17.2: authority may suspend the FWC or a specific contract, but only for force majeure, verification of suspected irregularity/fraud/breach, or established irregularity. II.18.3: 15 days to submit observations before termination takes effect | Contractor (I.15.3); authority (II.17.2, II.18) | No scoped, workload-level stop held by public authorities; no model kill switch; II.17.2's grounds do not include security or model risk |

Read together, conditions 1–3 and 6 are exactly where the buyer's decision rights stop. Conditions 2 and 5 are materially better than the memo reported, and condition 6 has a hidden inversion: the only actor with a fast, scoped stop is the contractor.

---

## 6. Public-purchaser access and actor decision rights

| Actor | Instrument | Right | Source |
|---|---|---|---|
| EuroHPC JU | Signatory and manager | Signs and manages the FWC and Specific Contracts "in the name and on behalf of all Contracting Parties"; conducts Technical Validation Tests; audits access-time use | Specs p.4; FWC I.13.3; I.19.4 |
| JU + NCAs ("Contracting Authorities") | I.14.7 | May "at any time" request additional measures for security or public order, including "limitation of certain entities in specific operational activities of the AIGF" | FWC p.20 |
| JU + NCAs | I.15.1, I.15.4 | Right to allocate, resell, sublicence or commercially redistribute purchased access time; solely responsible for internal allocation | FWC p.21 |
| JU + NCAs | Specific Contract Art. 11.5 / FWC I.4.3(a) | May request "additional specific technical requirements / SLAs"; contractor makes "every reasonable effort" at no extra cost | FWC pp.9, 72 |
| Public Governance Body | I.16 | Prior approval of third-country access agreements, control/ownership change, relocation of critical assets, strategic-purpose change; quarterly user and scrutiny information; may suggest additional compliance measures | FWC pp.21–22 |
| PGB voting | I.16.2 | Commission 50% indivisible; NCAs 50% by committed contribution; 75% of all votes including absent members | FWC pp.21–22 |
| Contractor | I.15.3, I.17.4 | Suspend or restrict an end user on infrastructure/security risk; refuse dedicated isolation absent written agreement | FWC pp.21, 23 |
| Contracting Authorities | II.4.12 | Step-in and have obligations performed by a third party at the contractor's expense where quality standards fail | FWC p.37 |
| Tenants / model developers | I.15.2 | Must sign terms of use covering acceptable use, data protection, confidentiality and security before access | FWC p.21 |
| Tenants / anchor customers | I.14.3(c) | Receive, in writing, the end-user screening and supervision obligations | FWC p.20 |
| Courts | I.10.2 | General Court, then Court of Justice, exclusive jurisdiction over validity, interpretation, performance, termination | FWC p.15 |

**The constraint that governs all post-award creativity.** II.11.1 requires amendments in writing; II.11.2 requires that any amendment "must not make changes … that might alter the initial conditions of the procurement procedure or result in unequal treatment of tenderers or contractors" (p.45). That is the textual reason a coalition cannot simply bolt a release veto onto a signed FWC, and it is also the reason I.14.7 and SC 11.5 matter: they are powers the draft already contains, exercised inside the contract rather than by altering it.

---

## 7. One strongest traceable contract path, and its limits

**Path.** `FWC Art. I.14.7` → a written request by the Contracting Authorities for additional security or public-order measures → implemented, where a new service level is needed, through a Specific Contract request under `SC Art. 11.5` (or `FWC I.4.3(a)`) → breach enforced as a violation of the security provisions of Art. I.14 under `II.18.1(p)`, with `II.18.3`'s 15-day observations as the due-process step and `I.10.2` court review as the outer check.

**Why this one.** It is in the operative draft; it needs no new tender, no PGB 75% vote and no contractor consent to the *request*; it applies "at any time"; it has an express termination backstop in II.18.1(p); and it is the only clause that gives the Contracting Authorities themselves a hook to restrict a specific entity's activity inside the facility. It connects a public decision to a contractual remedy without changing the award.

**Limits, stated as limits.**

1. It is a right to *request* "appropriate measures". There is no compliance deadline, no express remedies clause specific to I.14.7, and no definition of "appropriate". Enforcement runs through general breach and termination, not an automatic sanction.
2. The grounds are "security or public order" of the Union and the NCAs. AI-safety measures must be framed that way and would be reviewed for proportionality; the clause is not a safety mandate.
3. The illustrative measures are "appropriate handling of confidential information" and "limitation of certain entities in specific operational activities". That reaches exclusion or restriction of a tenant or activity. It does not reach evaluator access to a model, weight custody, or approval of a model release.
4. It binds the Contractor, not tenants. A measure aimed at a tenant's model must be executed through the contractor's user terms (I.15.2) whose safety content the FWC does not prescribe, and through the narrow flow-down in I.14.3(c).
5. A new standing obligation needs an amendment, and any amendment "must not … alter the initial conditions of the procurement procedure or result in unequal treatment" (II.11.2). Routing it instead through SC 11.5 or I.4.3(a) requires "every reasonable effort" and "no additional cost", which gives the contractor a reasoned basis to decline.
6. It only exists after signature. Nothing here binds EUROHPC-2026/OP/0008 before award, and the draft text may be completed per lot before signature.
7. The backstop is expensive and blunt: whole-contract termination, with II.6.3's 3× cap (displaced by II.6.4 in third-party claims) and II.18.4 damages, plus continuity risk the authority itself must manage.

**Rejected alternatives, for the record.** II.11 amendment is available but constrained by II.11.2 and needs contractor agreement. The PGB route (I.16.5) covers only the three enumerated approvals. A clarification during the live procedure can interpret text but cannot add a condition. None of these is a lawful unilateral route to a new procurement condition, and this note does not claim otherwise.

---

## 8. Feasible next action under the actual text

Ordered by what the documents permit, earliest first.

1. **Before the Lot 2 deadline (3 December 2026) and the Lot 1 deadline (4 February 2027 per the 26 October announcement; the lot record still says 3 December).** The only pre-award instrument is a question or clarification that fixes the record without changing terms: ask the contracting authority to state how I.14.7, I.14.3(c) and Appendix II §6 audit logs will apply to anchor-customer capacity and L3 model services, and whether a Specific Contract under Art. 11.5 may carry tenant isolation and incident-notification SLAs. This creates a dated, citable answer. It does not create an obligation, and a coalition state would act through the JU/GB or as an interested operator, not by asserting a right to rewrite the pack.
2. **At signature and SC1.** Use SC Art. 11.5 / FWC I.4.3(a) to specify the security SLA package: tenant isolation, incident notification to the authorities, 12-month inference audit logs, change notification affecting model outputs, and PGB information rights. Consensual, no extra cost, time-bound, and inside the contract.
3. **During performance.** Use I.14.7 for security or public-order measures, and I.16.4's power to "suggest additional measures or mechanisms" to the PGB for compliance monitoring.
4. **The durable route is the next instrument, not this one.** A condition that binds model developers needs a new call text adopted by the Governing Board before launch, or Hosting Agreement terms under Reg. 12b(17), or GB-set access-time conditions. Those documents are not in this corpus; the memo's assertion that such a route exists is plausible from the Regulation but unverified here.
5. **What not to claim.** That the contracting authority may unilaterally impose a model-release veto, weight custody, or evaluator access on an awarded contractor. The text does not support it, and II.11.2 plus equal-treatment rules cut against it.

---

## 9. Residual uncertainty

- The signed FWC will not be identical to this model; the tenderer's Annex II and the clarifications become part of the contract (I.1), and the completed contract may add or drop terms.
- No Q&A in the retained capture answers a safety question. The memo's negative observation stands, but it is bounded by the capture, which shows only 375 items and truncates every answer.
- The prior memo's most load-bearing external claims — Regulation 12b(14)/(17)/(18), GB Decisions 30/34/47, the TED notices, the Hosting Agreement, the model JPA — are all `Out of set`. This file neither confirms nor refutes them. Anyone relying on the GB voting arithmetic or the Hosting Agreement scrutiny duty must read those documents directly.
- The appendix audit regime is financial and operational: two yearly audit reports, access-time use (31 January) and operation costs (31 March), plus II.24 checks with site access. It is not a security-audit regime, and calling it one would overstate it.
- The pack changed on 25–26 October (document reissue, plus a new MLPerf model requirement in the 26 October update). Clause numbering in the final signed text should be re-checked at signature.

---

## 10. Source ledger

Retained, hashed, read in full or in the cited sections:

- Model Framework Contract (Annex 3, draft, v2, 86 pp.): `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Annex%203%20-%20Model%20FWC%20v2_V2.pdf` — sha256 `773c9456913f6d7b594bd82df01c18158d971d9e5497fd1f53643e6e6dc9cd0f`
- Tender Specifications (v2, 135 pp.): `…/CfT%20AIGF%20-%20Tender%20Specifications%20v2_V1.pdf` — sha256 `d64a3d7ab6938392b61e23c7901b1981088c1adf09d6eada10edc4ad1b8d86c7`
- Annex 2, participating states and contributions (8 pp.): `…/CfT%20AIGF%20-%20Annex%202_V1.pdf` — sha256 `4e934dee3e3042690e0af88b8a0195288f6b9cef382a3bff0f5456d1864b97b0`
- History of changes (3 pp.): `…/History%20of%20changes%20in%20Call%20documents_V1.pdf` — sha256 `228cebb0a0fe0bb1b90789227c95f340bb6f33d3fbb4656a059842aa9bb66f8b`

Retained but unmanifested (weakness to fix): portal capture `eurohpc-portal.txt`, parent page `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/bc712395-692d-41ab-aa25-8e254ae86eb2-CN`. Used only for dates, deadlines, document versions and the Q&A list; it carries no hash and should not be cited for clause text.

Accessed and read but **not** used as evidence here, because it is a claim index: `research_notes/Finance decision rights followup/eurohpc-tender.md`.
