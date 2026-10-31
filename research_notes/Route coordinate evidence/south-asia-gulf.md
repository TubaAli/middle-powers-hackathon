# South Asia and Gulf route coordinate evidence

Observed **31 October 2026**; checkpoint **21–22 June 2027**, as specified in the assignment. The paired `south-asia-gulf.json` contains claim-level numerical inputs, source dates, locators, retrieval attempts and unresolved fields. These are inputs, not invented 0–1 coordinates. Original route definitions in `data/route-research/south-asia-gulf.json` were read but not changed.

## Targeted follow-up: reproducible allocations, payments and award counts

Observed **31 October 2026**. Inspectable artifacts are in [`allocation-inputs/README.md`](allocation-inputs/README.md); the capture is timestamped **10:35:38 UTC**. The public snapshot is allocation evidence, not a contract or payment audit.

### IndiaAI: saved raw and displayed bases

- [`indiaai-raw-allocations.json`](allocation-inputs/indiaai-raw-allocations.json) and [`indiaai-displayed-allocations.json`](allocation-inputs/indiaai-displayed-allocations.json) each contain **303 records / 303 distinct project IDs**. **Displayed is the chosen published-table basis.** Only institutional/business-allowlisted organisation names are retained; other organisation values are null. No applicant-name, personal-contact, token or authentication fields are retained.
- Exact allocated subsidy totals: **raw INR 11,899,445,537.63**, **displayed INR 11,894,482,337.63**; difference **INR 4,963,200.00**. Both BOM totals are **INR 13,515,604,776.34**. All money is stored as decimal INR strings. Source URLs, timestamp, source-script hash, dataset SHA256 hashes and full field-level differences are in [`indiaai-receipt.json`](allocation-inputs/indiaai-receipt.json).
- Four project records differ: `P1-ST2025090352` subsidy **1,777,614,720.00 → 1,772,651,520.00**, GPUs **18,048 → 1,504**; `P1-G2025111479` and `P2-G2025111479` GPUs **4,000 → 2,000** each; `P3-G2025111479` GPUs **192 → 96**. Other hardcoded assignments produce no raw/displayed difference in this capture. Both bases contain **49 null and 148 empty-string hours**. No metering/GPU-instance basis is specified, so these fields are not aggregated as consumed GPU-hours. Null status means no source status supplied.

### IndiaAI: one layer deeper in usage and financial execution

1. [PIB release 2295477, 6 August 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2295477&reg=48&lang=1), reporting the **5 August** parliamentary answer, gives **237 approved projects / 93.18 lakh = 9,318,000 sanctioned GPU-hours**. The later precision does not establish 18,000 additional hours consumed, or even that the difference from July is a real change rather than rounding. It remains sanctioned compute.
2. [Rajya Sabha question 1668, 13 February 2026](https://sansad.in/getFile/annex/270/AU1668_ajohnN.pdf?source=pqars), PDF p.2, reports **funds received by IndiaAI**: **INR 21.79 crore in FY2024–25** and **INR 379.15 crore in FY2025–26 through 9 February 2026**. The table was visually checked. Their **400.94 crore** sum is cross-year mission receipts, **not expenditure or compute subsidy paid**. Page 3 reports resources being availed by 114 academic researchers, 47 startups/MSMEs, 8 fellows, 32 students, 36 early-stage startups, 10 early-stage researchers and 58 government entities. These mixed categories are not a deduplicated organisation count and supply no usage hours.
3. [Standing Committee twenty-fourth report, tabled 16 March 2026](https://elibrary.sansad.in/server/api/core/bitstreams/f12a1957-4f66-464f-acf5-f6c752a3bc8f/content), PDF p.45 / printed p.39, paragraph 51, reports **INR 256.86 crore actual mission expenditure in FY2025–26 through 31 December 2025**. This is a stronger execution measure than a budget allocation, but still not a compute-pillar/provider-payment statement. Different dates and accounting concepts prevent subtracting it from February receipts to derive a valid unspent balance.
4. [Lok Sabha question 6044, 1 April 2026](https://sansad.in/getFile/loksabhaquestions/annex/187/AU6044_lZOsLn.pdf?source=pqals), PDF pp.2–3, says foundation-model assistance covers actual compute usage costs, with another 25% of compute expenditure earmarked for ancillary expenses. It describes half-yearly financial reviews but supplies **no actual payment amount**, despite the question asking about Sarvam allocations/disbursements. This is a funding mechanism, not proof of a settled invoice.

Three distinct approaches were used: public allocation/schema and policy inspection; targeted indexed usage/payment searches; direct parliamentary/PIB financial and programme publications. **No annual consumed-GPU-hour ledger or compute-subsidy quarterly payment statement was retrieved.** The MeitY annual-report PDF first timed out, then returned an incomplete transfer; its contents are not treated as read. PIB's 403 was overcome with direct Python HTTPS. Retrieval dates, source-byte hashes, relevant extracted pages and failures are preserved in [`followup-source-receipts.json`](allocation-inputs/followup-source-receipts.json).

### Türkiye: dated lists narrow, but do not settle, 65 / 64 / 61

- The [27 December 2024 results announcement](https://tubitak.gov.tr/tr/duyuru/1711-yapay-zeka-ekosistem-cagrisi-sonuclari-aciklandi) reports 27 applications, one withdrawal, **11 supported**, and **five pending**. Its linked supported and pending PDFs contain respectively **11 and five distinct, disjoint project IDs**, saved without applicant names in the follow-up receipt.
- The [2024 annual report](https://tubitak.gov.tr/sites/default/files/2025-03/TUBITAK_2024_Yili_Faaliyet_Raporu.pdf), PDF p.118 / printed p.104, instead records **13 accepted, one pending**, and **TRY 55,629,903 project budget**. This demonstrates differing evaluation snapshots, but does not identify which pending projects advanced. Its March 2025 URL path is not an exact publication date. Page 103 / printed p.89 also says the ten 2022 projects formally completed **31 March 2024**, with field implementation continuing: cumulative awards are not a current active-project count.
- The [2025 annual report](https://tubitak.gov.tr/sites/default/files/2026-03/TUBITAK_2025_Yili_Faaliyet_Raporu_0.pdf), PDF p.117 / printed p.103, reports **53 applications / 23 supported consortia**. Its 18 large + 5 SME customers and sector counts 8+3+2+4+6 both corroborate 23. The July-path presentation says **24** for that cohort.
- **Inference, not a confirmed reconciliation:** substituting annual-report 23 into the presentation's other annual counts yields **10+18+13+23 = 64**, matching the live programme total. The 2025 cohort therefore provides an exact arithmetic explanation candidate for **65 versus 64**. No dated project-ID addition, withdrawal or correction was retrieved to explain why the sources differ. The **61** in the 16 June 2026 announcement and the **TRY 353.7m versus TRY 325,089,753** totals remain unresolved. Do not force them onto a shared cutoff or price/payment basis.
- Retrieval approaches: dated announcement attachments; annual institutional reports; comparison against programme/presentation and indexed project-list/PRODİS searches. **Next discriminating question:** which 2025 project is included in 24 but not 23, and what decision date/status accounts for it? For India, the equivalent next input is a provider settlement statement linking actual GPU-hours, invoice period, subsidy amount and payment date.

## What numerical reach is actually evidenced?

### Takeaway
India now has a usable public **allocation** inventory. Dubai has candidate-service counts and concrete older service examples. Saudi Arabia has historical admissions/completions in different units. Türkiye has annual selection counts, but conflicting cumulative counts and support totals. None establishes a safety-conditioned, consequential-activity coverage fraction.

### Cited Findings

#### India — the fresh lead is verified, with an important unit correction

- The [PIB release, ID 2289946](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2289946&lang=2&reg=48) is dated **27 July 2026, 16:42**, and says the information was submitted to Rajya Sabha **24 July 2026**. Its “Affordable compute” bullets report **237 supported projects**, **15 empanelled providers**, and **93 lakh = 9,300,000 sanctioned GPU-hours**. It does **not** call these used GPU-hours. The same release reports **13 Responsible AI projects** under a separate pillar; those are not 13 safety-conditioned compute allocations.
- The [public end-user inventory](https://compute.indiaai.gov.in/endusers), fully rendered through the existing browser, contains **303 rows and 303 distinct project IDs**, with approval dates **23 April 2025–10 September 2026**. Thus its headline “users” must not be read as 303 distinct organisations: organisations recur. The portal may also lag the observation date.
- Summing all displayed rows gives **INR 11,894,482,337.63 allocated subsidy** and **INR 13,515,604,776.34 Bill of Materials value**. The static headline rounds the former to INR 11,89,44,82,338. Filtering approval dates beginning `2026` yields **212 records** and **INR 3,395,901,537.19 allocated subsidy**. These are calendar-year approvals with heterogeneous, sometimes multi-year durations—not fiscal-year payments. [Inventory](https://compute.indiaai.gov.in/endusers)
- A significant data-quality caveat: the [public rendering script](https://compute.indiaai.gov.in/js/common/endusers.js) overwrites one record's subsidy and several GPU counts before displaying the table. The aggregate above reproduces the public display; it is not an audit of the backend or contracts. The dataset's `number_of_hours` field includes **49 nulls**, additional blank strings and ambiguous instance/hour semantics; do not sum it as metered GPU-hours. [Inventory and public data schema](https://compute.indiaai.gov.in/endusers)

#### UAE — Dubai scope, targets and operational examples must stay separate

- The [5 October 2026 launch](https://www.dubaifuture.ae/latest-news/dubai-future-foundation-launches-agentic-ai-for-government-services-accelerator/) describes **33 Dubai government entities** and **more than 300 public-facing use cases to assess**. Neither number counts deployed services or passed safety gates.
- The [live programme](https://www.dubaifuture.ae/dcai-accelerators/) sets per-cohort targets of **up to 10 reusable service blueprints** and **5–8 tested/validated prototypes**. These are more realistic pilot-scale inputs than treating all 300 candidates as imminent deployments. They remain targets, not achieved outputs.
- The earlier [Dubai State of AI report announcement, 23 April 2025](https://www.digitaldubai.ae/newsroom/news/digital-dubai-and-dubai-future-foundation-launch-inaugural-dubai-state-of-ai-report-showcasing-government-adoption-trends) covers **over 100 use cases already deployed or in development**. The [report itself](https://www.digitaldubai.ae/docs/default-source/default-document-library/digital-dubai_dubai's-state-of-ai-406d1ca17c24745e0b05e363719f9fcc6.pdf?sfvrsn=a792ed61_0) is dated **21 April 2025** in the publication catalogue. This older mixed-stage inventory cannot be added to the 300 without an overlap map.
- Concrete consequential workflow: the same [report, case 15, printed p.103](https://www.digitaldubai.ae/docs/default-source/default-document-library/digital-dubai_dubai's-state-of-ai-406d1ca17c24745e0b05e363719f9fcc6.pdf?sfvrsn=a792ed61_0), reports **over 3,600 food-layout assessment requests annually**, a **40% historical rejection rate** mainly for missing/unclear information, and approximately **14,000 annual manual-review hours saved**. Case 14, p.102, reports **25% shorter ticket-resolution time** for DEWA's Rammas for You. These are official case-study claims without a supplied causal evaluation or precise measurement period; neither case is confirmed as a 2026 accelerator participant. Numbers were visually checked because the PDF text layer drops digits.

#### Saudi Arabia — real history, no valid AI graduation percentage yet

- [CST's ten-company admission announcement](https://www.cst.gov.sa/en/media-center/news/CST-announces-that-10-local-and-international-companies-have-joined-the-experimental-regulatory-envi) is actually dated **28 December 2022**, despite a search result presenting an October 2026 date. It names Microsoft, Siemens, OQ Technology, Tata, Master Works, DEMA Energy, Brighter, Future Look, ITMAM and Moltazim, spanning several emerging technologies.
- The [third-cohort announcement](https://www.cst.gov.sa/en/media-center/news/CST-Announces-the-Opening-of-Registration-for-the-3rd-Cohort-of-the-CST-Regulatory-Sandbox), dated **3 July 2025**, reports **8 first-cohort** and **15 second-cohort technology products** successfully completing participation, and **110% participant growth**. The [Arabic original](https://www.cst.gov.sa/ar/media-center/news/CST-Announces-the-Opening-of-Registration-for-the-3rd-Cohort-of-the-CST-Regulatory-Sandbox) confirms the product wording. **8 products / 10 companies is not a valid graduation rate.** No matched AI-specific admission count or exposed-transaction denominator was retrieved.

#### Türkiye — annual selection numbers improve the evidence substantially

The official [2026 presentation, slide 15](https://tubitak.gov.tr/sites/default/files/2026-07/1711-YZE_Cagrisi-2026_Sunumu.pdf), visually checked, reports:

| Call | Applications | Supported projects |
|---|---:|---:|
| 2022 | 22 | 10 |
| 2023 | 32 | 18 |
| 2024 | 27 | 13 |
| 2025 | 53 | 24 |

- These columns sum to **134 applications and 65 supported projects**. They are historic selection results, not probabilities of obtaining an amendment or adopting a safety gate. In 2023, the slide separately lists **17 customer organisations** for 18 supported projects, illustrating why project and entity counts differ. [Slide 15](https://tubitak.gov.tr/sites/default/files/2026-07/1711-YZE_Cagrisi-2026_Sunumu.pdf)
- Preserve an unresolved three-way inconsistency: the [16 June 2026 announcement](https://tubitak.gov.tr/tr/duyuru/1711-yapay-zeka-ekosistem-2026-yili-cagrisi-acildi) says **61 projects / TRY 353.7 million**, the [undated live programme page](https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1711-yapay-zeka-ekosistem-cagrisi) says **64 projects / TRY 325,089,753**, and slide 15 sums to **65 projects**. A newer retrieval is not sufficient to infer a correction, common price basis, cancellation or disbursement definition. Do not attach one source's funding total to another source's count.

### Inferences
- India is the best of these four candidates for a **record-level allocation-pool** analysis now. That still requires identifying which allocations could lawfully receive the proposed condition and getting consumed-resource data.
- Dubai's food-permitting example supplies a concrete consequential workflow to investigate, not a citywide safety-impact estimate.
- Türkiye's historic selection ratios could inform a descriptive base-rate discussion, but safety-amendment consent is a different outcome and population.

### Gaps
- For all four: no matched numerator of actual activity governed by the exact proposed safeguard, complete denominator of eligible activity, or measured causal risk reduction.
- For India: public allocation values are not metered activity, and the dataset has ambiguities and display overrides.
- For Dubai: no crosswalk connecting the old report, the 300 assessed candidates and live accelerator services.
- For Saudi Arabia: no product-to-company-to-AI mapping and no observed exposed-user/transaction count.
- For Türkiye: no reconciled project-level award/payment ledger or downstream deployment inventory.

## What constrains feasibility, timing and enforceability?

### Takeaway
Real procedural and financial inputs are available. They identify where to negotiate and what evidence to request, but none supplies exact-safeguard consent or an empirical adoption probability.

### Cited Findings

#### India
- [Union Budget 2026–27, Demand 27, printed p.102, row 12](https://www.indiabudget.gov.in/doc/eb/sbe27.pdf): IndiaAI Mission **FY2024–25 actual INR 19.24 crore**, **FY2025–26 budget estimate INR 2,000 crore**, **FY2025–26 revised estimate INR 800 crore**, and **FY2026–27 budget estimate INR 1,000 crore**. Column alignment was visually verified. These whole-mission amounts do not measure compute subsidy execution or available evaluation funding. The [PIB](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2289946&lang=2&reg=48) **INR 10,371 crore / five-year** envelope is a different stock/period.
- [End-User Policy](https://compute.indiaai.gov.in/files/end-user-policy.pdf), sections 4.6/5.2: PMEC reviews requests above **5,000 GPU-hours**, above **50 GPUs**, or seeking subsidy. Section 4.6 says **0–50% subsidy**, while 5.2 says **maximum 40%**. The policy assigns policy updates to IndiaAI. These contradictory passages remain in the retrieved linked PDF.
- Public practice does not resolve the legal hierarchy: of [303 displayed allocations](https://compute.indiaai.gov.in/endusers), **254** have subsidy/BOM ratios rounding to **40.00%**, one to **39.99%**, **29** to **100.00%**, and one to **99.72%**. The latter is the client-overridden record. Remaining ratios are 0% (12 records), 8%, 17%, 18%, 33%, 36%, and 16.04% (one each). Foundation-model/government treatment, exceptions or inconsistent data may explain differences; no operative exception instrument was retrieved.
- [Policy sections 8–9](https://compute.indiaai.gov.in/files/end-user-policy.pdf), printed pp.15–16, provide quarterly post-paid subsidy on consumed services, no subsidy for unused reserved capacity, and a **30-day activation** rule. Section 9 separately describes **23 days plus one week grace**, with a specific 30-day start rule for longer reserved instances. These are written rules, not measured payment or response times. A pilot must confirm the applicable approval terms rather than flatten these into one guaranteed SLA.

#### Dubai
- The [programme](https://www.dubaifuture.ae/dcai-accelerators/) runs year-round through **four stages**, with independent assurance at deployment. This is a genuine place to attach evidence requirements. Its “in weeks” ambition is not an observed lead-time distribution, and four stages do not mean four separate approvals.
- No retrieved [programme](https://www.dubaifuture.ae/dcai-accelerators/), [launch](https://www.dubaifuture.ae/latest-news/dubai-future-foundation-launches-agentic-ai-for-government-services-accelerator/) or [case report](https://www.digitaldubai.ae/docs/default-source/default-document-library/digital-dubai_dubai's-state-of-ai-406d1ca17c24745e0b05e363719f9fcc6.pdf?sfvrsn=a792ed61_0) supplies the signed acceptance contract, named independent assurer, payment hold, quantified pilot budget or rollback authority for the proposed gate.

#### Saudi Arabia
- [May 2025 guidelines](https://www.cst.gov.sa/-/media/cst-website-app/data/media/Reports/Whitepaper/EN/Emerging%20Technologies/Communications%20Space%20and%20Technology%20Regulatory%20Sandbox), p.5: indicative admission **1–3 months**, preparation **1–2 months**, testing **6–9 months**. Summing lower endpoints gives eight months before allowing for exit. A newly applying participant cannot be promised complete graduation before June 2027; an interim failure/stop/retest demonstration is a different objective.
- Guidelines section 4.3 has **six onboarding steps**, including mutually finalising testing/exit plans and confirming other required approvals. Sections 4.4–5 require **monthly interim reports**, allow correction for minor breaches and possible termination for significant breaches, and call for customer limits and failure thresholds set before testing. They do not publish a universal AI user cap, automatic stop threshold or observed enforcement count. [Guidelines, pp.9–15](https://www.cst.gov.sa/-/media/cst-website-app/data/media/Reports/Whitepaper/EN/Emerging%20Technologies/Communications%20Space%20and%20Technology%20Regulatory%20Sandbox)
- [Registration service](https://www.cst.gov.sa/en/business/services/Emerging-Technologies-Regulatory-Sandbox-Registration): **free service**, processing time **determined according to the request**. That is not a zero-cost pilot or numerical response-time commitment. The [third-cohort application window](https://www.cst.gov.sa/en/media-center/news/CST-Announces-the-Opening-of-Registration-for-the-3rd-Cohort-of-the-CST-Regulatory-Sandbox) was **3 July–3 October 2025**, notwithstanding rolling-admission language in general guidance. Current availability needs confirmation.

#### Türkiye
- [Updated 2026 call](https://tubitak.gov.tr/sites/default/files/2026-09/1711_YZE_2026_Cagri_Metni_Guncel.pdf), pp.6–9: **TRY 10 million project-budget ceiling** excluding specified overhead items, **24-month maximum duration**, **60% grant rate** on accepted technology-company expenses with a large customer, **70% with an SME customer**; customer contributions are respectively 20% and 10% of declared expenses. Eligible research/public institutions have **100% accepted-expense support**, but their combined proposed budget is capped at **25% of total project budget**. Accepted versus declared expenses must not be merged.
- The call's pp.13–14 specify **six-month formal periods** and additional **three-month YZE monitoring**. The first 2027 half-year ends **30 June**, after Geneva. Section 15.2 allows the cooperation agreement to be signed by project-contract signature, although the [older June announcement](https://tubitak.gov.tr/tr/duyuru/1711-yapay-zeka-ekosistem-2026-yili-cagrisi-acildi) asked for signing with the application. The updated call and live programme confirm applications closed **2 October 2026, 23:59**.
- The [official blank cooperation agreement](https://tubitak.gov.tr/sites/default/files/2026-07/Yapay_Zeka_Ekosistem_Cagrisi_Is_birligi_sozlesmesi_v1_1.docx) has **three signature blocks**, plus fields for responsibilities, IP, disputes and other matters. This is an actual drafting surface, not an executed safety contract or the complete funder approval set. The [2025 results announcement, 31 December 2025](https://tubitak.gov.tr/tr/duyuru/1711-yapay-zeka-ekosistem-cagrisi-sonuclari-aciklandi-0) says decisions go through KEP and contracts through PRODİS. No still-unsigned 2026 award was identified.
- The [programme FAQ](https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1711-yapay-zeka-ekosistem-cagrisi) explicitly says ordinary project failure does not trigger repayment. A proposed safety-test failure cannot simply be presented as an existing automatic clawback.

### Inferences
- Most discriminating next test: obtain one actual allocation/acceptance/testing/grant instrument, with a lawful amendment path and corresponding activity ledger. This would add more coordinate information than another headline total.
- Türkiye's signature timing creates a **conditional** opportunity, not proof that a material post-competition amendment is permissible. Saudi Arabia's procedure creates a plan-negotiation opportunity, not an automatic nationwide AI veto.

### Gaps
- Actual elapsed decision times, marginal evaluation costs, full approval sets and exact-safeguard consents remain unmeasured.
- India subsidy authority is **unresolved**, not “40% confirmed”; observed practice is now documented.
- The first FY2026–27 months' cash execution and FY2025–26 actuals were not retrieved. Budget estimates and allocation totals are not substitutes.

## What was searched, what failed, and what remains retrievable?

### Takeaway
The paired JSON is the retrieval ledger. Unsuccessful searches are distinguished from inaccessible pages and from positive evidence that something is nonpublic. **No gap here is labelled nonpublic solely because it was not found.**

### Cited Findings
- **India methods:** directly retrieved [policy](https://compute.indiaai.gov.in/files/end-user-policy.pdf) and [PIB](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2289946&lang=2&reg=48); searched for subsidy amendments; followed [public portal](https://compute.indiaai.gov.in/endusers) through dynamic rendering and inspected its data schema; retrieved and visually checked the [budget table](https://www.indiabudget.gov.in/doc/eb/sbe27.pdf). Initial PIB webfetch returned 403; ordinary independent HTTPS fetch succeeded. [MeitY annual-report landing page](https://www.meity.gov.in/annual-report) returned only a dynamic shell. A precise search for the unverified `400.94` lead returned no documents; excluded from facts.
- **Dubai methods:** launch/programme full-page retrieval; rendered [publication-catalogue navigation](https://www.digitaldubai.ae/knowledge-hub/publications); [case-report](https://www.digitaldubai.ae/docs/default-source/default-document-library/digital-dubai_dubai's-state-of-ai-406d1ca17c24745e0b05e363719f9fcc6.pdf?sfvrsn=a792ed61_0) extraction and visual inspection. A network-idle timeout was overcome with DOM-content loading; a text-only catalogue would have missed the report. Contract and current-cohort inventory gaps survived these different routes.
- **Saudi methods:** full [guidelines](https://www.cst.gov.sa/-/media/cst-website-app/data/media/Reports/Whitepaper/EN/Emerging%20Technologies/Communications%20Space%20and%20Technology%20Regulatory%20Sandbox) and [service specification](https://www.cst.gov.sa/en/business/services/Emerging-Technologies-Regulatory-Sandbox-Registration); English/Arabic announcements; current Google-index discovery with original-date checks; [programme roster](https://www.cst.gov.sa/en/about/program-and-initiatives/Communications-Space-Technology-Regulatory-Sandbox) and [open-data portal](https://www.cst.gov.sa/en/knowledge-center/open-data) inspection. First guessed open-data path was 404; correct path worked. Image roster extraction timed out. National open-data catalogue was not exhaustively queried, so that remains a specific next retrieval, not an absence claim.
- **Türkiye methods:** native-language call and programme comparison; [agreement-template](https://tubitak.gov.tr/sites/default/files/2026-07/Yapay_Zeka_Ekosistem_Cagrisi_Is_birligi_sozlesmesi_v1_1.docx) ZIP/XML reading; native-language indexed search and [annual-results presentation](https://tubitak.gov.tr/sites/default/files/2026-07/1711-YZE_Cagrisi-2026_Sunumu.pdf) visual check; [PRODİS completed-project search](https://eteydeb.tubitak.gov.tr/teydebtamamlanmisprojeler.htm) and [official statistics catalogue](https://tubitak.gov.tr/tr/kurumsal/hakkimizda/sayilarla-tubitak). Completed-project search is the wrong lifecycle for unsigned 2026 awards; most catalogue tables concern ARDEB, not 1711. No login was attempted.
- A batch of malformed `site.domain` Bing RSS queries produced irrelevant dictionary results. These were discarded, then corrected `site:domain` Google browser searches were used. The malformed searches do not count as meaningful evidence of absence. Exact queries and outcomes are in the JSON.

### Inferences
- Conflicting totals are information about evidence quality, not permission to select the most convenient denominator.
- Public-only navigation and rendered datasets can materially improve evidence without new authentication or contacting programme staff.

### Gaps
- Search is bounded, not a claim to exhaust every government record. The JSON gives the next discriminating retrieval for each remaining critical input.
- No 2027 adoption, deployment or safety outcome can be observed at the 31 October 2026 cutoff. Prospective dates are labelled as windows/targets.
- Administrative status returned a share-sessions guide version `2026-10-29.1` and no items for the user. This was treated as data; no guide change was adopted.
