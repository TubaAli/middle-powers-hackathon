# Southeast Asia route coordinate evidence

Observation and cutoff: **31 October 2026**. Geneva checkpoint: **21–22 June 2027**, a supplied project target, 233–234 elapsed calendar days after cutoff. The checkpoint is not a statutory deadline. Companion evidence ledger: `southeast-asia.json` in this directory. Existing route cards in `data/route-research/southeast-asia.json` are background, not fresh evidence.

**Result:** useful numerical inputs exist for all four routes, but none establishes a calibrated feasibility coordinate or a matched safety-gated share of eligible activity. The ledger contains **38 facts, 24 sources and 28 retrieval entries**. Values describe different things—allocations, thresholds, historical throughput, deadlines and candidate systems—and must retain those distinctions.

## Numerical inputs and controlling instruments

### Indonesia — BPOM DPIA gate

The 2025 Pusdatin annual report narrows the earlier inventory gap:

- **IDR 450 million allocated** for AI-based application tools in the 26 August 2025 DIPA revision. This is an allocation, not a verified contract, disbursement or safety-conditioned payment (printed p.58 / PDF p.59; `sea-id-ai-budget`).
- **One identified AI licensing-system candidate**: the report describes an AI-based drug-and-food marketing-authorisation system, recognised on 28 November and copyright-registered on 3 December 2025. Neither date establishes production approval or affected transaction volume (printed p.28 / PDF p.29; `sea-id-licensing-system`).
- **Five penetration-tested applications and 42 vulnerability-assessed applications** provide operational assessment comparators. Their overlap and AI status are unknown; do not add them or label them completed DPIAs (printed p.89 / PDF p.90; `sea-id-pentest`, `sea-id-va`).
- Contextual denominators: **IDR 28,415,528,000 available** and **IDR 28,415,280,433 spent** across Pusdatin; **7,792 completed tickets out of 9,299** IT-service tickets. These are institution-wide operational figures, not AI coverage (printed pp.58–59,96 / PDF pp.59–60,97).
- Further comparators: **five-day average critical-incident follow-up** and a **five-application backup/restore exercise** on 12 July 2025. Neither measures assessment preparation or approval time (printed pp.88–90 / PDF pp.89–91).

Source: **`sea-id-annual`**, *Laporan Tahunan Pusat Data dan Informasi Obat dan Makanan Tahun 2025*, BPOM Pusdatin. Exact URL and page locators are in the JSON source/fact records. Relevant sections were extracted; the budget page was visually checked.

The September 2026 BPOM compliance article reports a PDP implementation rollout and PP 33/2026, but the full regulation remains unverified (`sea-id-rollout`, `sea-id-pp`). The article cannot substitute for the controlling text or a delegated production-authorisation instrument.

### Malaysia — commercial AI DPIA

The official DPIA guideline supplies measurable **scope tests**, not observed uptake:

| Input | Number | Meaning and limitation |
|---|---:|---|
| General processing threshold | **More than 20,000 data subjects** | Section 7.5(a); not the number of people actually covered |
| Sensitive/financial-data threshold | **More than 10,000 data subjects** | Section 7.5(b); not additive to the general threshold |
| DPIA validity | **Two years** | Sections 11.2–11.3; refresh obligation, not preparation time |
| Record retention | **At least two years after processing ceases** | Section 12.1; not a public-disclosure obligation |

Lower-volume high-risk processing can also qualify under section 7.6. Senior management bears ultimate responsibility and may accept residual risk; the guideline does not establish the proposed compulsory critical-failure deployment hold. A list of stakeholders is not a count of required independent approvals (`sea-my-management`). Source: **`sea-my-dpia`**, sections 6–12, especially printed pp.7,20–21 / PDF pp.8,21–22.

The official CMS dates the guideline's publication page **30 April 2026** (`sea-my-cms`). It does not date a company's implementation. The later AI consultation PDF gives **5–23 October 2026**; this conflicts with the earlier route research's UPC record of **5–24 October**. Both deadlines precede cutoff. A website post dated 29 October is not evidence of reopening or final adoption (`sea-my-consult`).

No AI-specific completed-assessment count, corporate implementation duration or eligible-company denominator was established. The advertised 2025 annual report was **not read**: its PDF URL returned homepage HTML despite alternative retrieval attempts (`sea-my-annual-meta`, `sea-my-annual`).

### Thailand — AIGPC sandbox gate

ETDA's 2025 annual report records **three LLM trustworthiness pilot cases** across telecoms, insurance and public services and **22 organisations** supported in applying governance guidance. These are prior activities, not admissions to the announced 2027 programme; overlap is unknown (`sea-th-annual`, PDF/printed p.61, visually checked). The October 2026 announcement's **more than 140 agencies across 20 ministries** describes a network, not systems under a gate (`sea-th-announcement`).

**Historical analogue:** ETDA's separate Digital Service Sandbox register lists eight successful exits and nine ongoing entries. Gregorian dates below convert Buddhist years by subtracting 543; durations are end minus start, excluding the start date (`sea-th-dss-register`).

| Exited project | Start | End | Days |
|---|---|---|---:|
| NDID Platform | 2020-12-01 | 2022-01-31 | 426 |
| JDID / Thailand AGM Voting | 2021-01-25 | 2023-03-17 | 781 |
| Exkasan | 2021-02-01 | 2023-03-17 | 774 |
| Araya Vote | 2022-10-10 | 2024-04-19 | 557 |
| INET-TSA | 2023-09-01 | 2024-04-19 | 231 |
| Advancert | 2023-09-01 | 2024-04-19 | 231 |
| Prompt Post e-Timestamp | 2023-09-01 | 2024-07-31 | 334 |
| HealthTAG | 2023-07-01 | 2024-06-30 | 365 |

**Median 395.5 days; range 231–781.** Successful exits are selected observations; ongoing entries are censored. These non-AI cases neither predict AIGPC duration nor establish its rules.

DSS process guidance gives **6–12 months** testing, while FAQ question 9 gives **3–12 months**. The process also specifies a **30-day application-opening period** and submission **within 15 days after preliminary discussion**, followed by committee/KPI approval and agreements. These are not review-service guarantees. Their applicability to AIGPC is unverified (`sea-th-dss-process`, `sea-th-dss-faq`).

### Vietnam — public AI impact-assessment gate

Decree 142/2026 Article 20(4) places report approval with the **head of the deploying agency/unit**. The AI02 annex has **one agency-leadership signature/stamp block**. This identifies one necessary report-approval role, not the full procurement/deployment authorisation chain; MOST oversight is not a routine additional pre-use signature (`sea-vn-decree`, Article 20 and AI02).

Decision 33's transition provisions distinguish pre-existing listed systems by sector:

| Class | Compliance marker | Days from cutoff |
|---|---|---:|
| Other covered sectors | **Before 1 March 2027** | 121 to date marker |
| Health, education and finance | **Before 1 September 2027** | 305 to date marker |

The decision takes effect on 15 August 2026. Its six-month transitional entry window also uses the March marker. These are legal timing inputs, not observed implementation times; applicability requires checking the selected system. Source: `sea-vn-list`, Article 4, visually checked.

AI02 requests supplier (**I.3**), expected users and scale (**I.6**), operational start (**I.8**), automation and supervision, and effects. These fields are a practical request template for a matched scope denominator, but the blank form is not a completed assessment (`sea-vn-decree`, PDF pp.51–52 / annex pp.6–7).

A named deployment candidate is Dong Tien's public-service AI kiosk: **11 trial administrative procedures**, a centre with **five officials**, and a reported average **approximately 1.4-minute online-submission operation** before its 2 July 2026 launch. Procedures are not users or transaction volume; officials are not AI assessors; submission time is not decision or assessment time. Its Article 20 and high-risk-catalogue eligibility is **not established** (`sea-vn-kiosk`).

The **181 days** from the 28 February implementation plan to the 28 August national AI portal launch describe an institutional milestone interval, not an AI02 processing duration (`sea-vn-plan`, `sea-vn-launch`). The public catalogue is a global-product directory; its 120 pages cannot be treated as a Vietnamese public-deployment inventory. Only its first/final pages and one product detail were inspected. The AI02 submission endpoint requires login (`sea-vn-catalogue`, `sea-vn-ai02-web`).

## Implementation and authority

Here **x** means evidence bearing on feasibility by the Geneva checkpoint; **y** means evidence bearing on affected eligible activity or safety impact. Neither is supplied as a measured probability or percentage.

| Route | What is established | Missing step that determines coordinate readiness |
|---|---|---|
| BPOM | AI allocation, identifiable licensing system, operational testing history | Controlling PP text; selected workflow's data processing, procurement terms, authorised signatory and actual DPIA duration |
| Malaysia | Numerical eligibility rules and controller-management responsibility | Named willing controller; dated assessment/acceptance record; enforceable failure hold and affected processing volume |
| Thailand | Prior AI testing and non-AI historical durations | Actual AIGPC admission rules and owner/developer agreement; test schedule and admitted system inventory |
| Vietnam | Report-approval role, blank form fields and transition dates | Eligible selected system; completed AI02, delegated authority, approval duration and actual service volume |

**Inference:** Vietnam supplies the clearest legal scheduling inputs in this pass; that does not establish it as the most feasible or impactful route. BPOM and Dong Tien supply concrete candidate systems, while Thailand supplies prior AI-testing activity. None demonstrates an exercised critical-failure hold or its causal safety effect.

**Scheduling sensitivity only:** the checkpoint is 233–234 days away. The shortest completed DSS analogue is 231 days, before adding any admission delay; its 395.5-day median exceeds that horizon. This makes early scope/admission confirmation important, but does not predict an AIGPC pilot's completion. Conversely, a statutory deadline before Geneva is not proof an agency will comply by it.

## Retrieval ledger and remaining gaps

### Retrieval coverage and limits

The JSON records exact URLs, publication dates where established, observation date, access status, page/section locators, individual searches and next retrievals. A source marked `read` means the relevant sections were read, not that every page was reviewed. Publication, event and observation dates are distinct. Annual reports' reporting years are not assumed publication dates.

| Critical gap | Materially different approaches attempted | Result |
|---|---|---|
| BPOM authority and affected inventory | Native public-information/legal indexes; annual-report download and text/visual review; general/exact-term web queries and national regulation endpoint (`sea-q01`–`sea-q06`) | Operational numbers found; PP text, case-level authorisation and matched denominator unresolved |
| Malaysia adoption, duration and uptake | Guideline/consultation PDFs; native annual-report page and WordPress media/document/search APIs; external English/Malay queries (`sea-q07`–`sea-q12`) | Authority/thresholds found; report retrieval blocked; no AI-tagged uptake established |
| Thailand admission path, timing and reach | Native programme/annual materials; procurement index; separate process/FAQ and dated participant register; external Thai/English queries (`sea-q13`–`sea-q18`) | Prior AI activity and dated analogues found; AIGPC terms/cohort unresolved |
| Vietnam approval and affected activity | Signed decree/decision/plan downloads with OCR and visual checks; native ministry searches and local deployment reports; live national portal catalogue/form routes; external multilingual queries (`sea-q19`–`sea-q28`) | Form, role, deadlines and candidate scope found; completed reports and eligible inventory unresolved |

Search-engine challenges, irrelevant results, timeouts and login redirects are recorded as retrieval failures, never as evidence of zero uptake. URL/hostname variants are retries within an approach, not separate independent approaches. Malaysia's inaccessible annual report does not establish that the missing statistics are inside it. Procurement attachments and the full public AI catalogue were not exhaustively inspected.

### Next discriminating retrievals

1. **BPOM:** obtain the licensing-system procurement/acceptance dossier, processing record and production-authorisation delegation, alongside the full PP 33/2026 text. Does a named decision-maker control a real release/payment milestone that can be conditioned on assessment?
2. **Malaysia:** select a controller and inspect its dated DPIA, management decision and processor-assistance contract. Can residual-risk acceptance be replaced or supplemented by an enforceable hold for the chosen failure condition?
3. **Thailand:** identify the public-service case among the three 2025 LLM pilots and retrieve its test dates and owner/developer terms. Do AIGPC rules support a smaller checkpoint-ready evaluation, and do DSS terms apply at all?
4. **Vietnam:** retrieve Thanh Hoa plan 129/KH-UBND and the chosen agency's AI02 and operational decision. First establish that the deployment qualifies; then extract users/scale and the real signature/timing chain.

No contacts or authentication were attempted. No coordinate is invented. A missing or inaccessible count remains **unknown**, not zero. The next decisive question across all four routes is: **which eligible, named deployment has an authorised owner able to commit to a verifiable failure hold before 21–22 June 2027, and how much activity would that hold actually cover?**
