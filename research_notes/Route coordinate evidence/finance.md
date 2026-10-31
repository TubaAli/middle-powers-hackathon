# Financing-route coordinate evidence

Observed **31 October 2026**; Geneva checkpoint **21–22 June 2027** (task-supplied). Machine-readable claims, dates, access grades, limits and retrieval outcomes are in `finance.json`. Only these two assigned files were edited. No git, installations, paid access, subagents or contacts were used.

**Targeted follow-up:** the existing public browser recovered both previously blocked targets. Q-935's ISED response is now read, and the S-1's financial and credit sections are now read through full DOM text extraction. Historical access failures remain in the ledger as history, not current blockers.

## 1. Canada: what is the instrument and what can be quantified?

### Takeaway

**There are two distinct transactions.** March 2025 agreement **820219** is a **partially conditionally repayable contribution**, whereas the October 29, 2026 announcement explicitly describes **equity**. Do not relabel both as equity, or use the historical contribution's ISED identity as proof of the October investing vehicle. [Contribution disclosure](https://search.open.canada.ca/grants/record/ic%2C033-2024-2025-Q4-820219%2Ccurrent); [October announcement](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai).

### Cited findings

- Administrative record: **$240 million**, Cohere Inc., ISED, SIF Stream 2 Growth; agreement term **March 10, 2025–April 30, 2049**. This is face value, not payment confirmation. The amendments view returns a Current record and `0001-01-01T00:00:00`; that placeholder is not an amendment date. [Record: Agreement Value/Date/Type and Additional Information](https://search.open.canada.ca/grants/record/ic%2C033-2024-2025-Q4-820219%2Ccurrent); [amendments view](https://search.open.canada.ca/grants/record/ic,033-2024-2025-Q4-820219,current?amendments).
- **New matched financial denominator:** ISED's project statement describes up to **$240 million for a $725 million project**, with Cohere anchor tenant at a CoreWeave-built/operated facility in Cambridge, Ontario. Announcement event March 20, 2025; page modified September 2, 2026, not necessarily first publication. Thus **240/725 = 0.3310344828**, a usable **announced contribution/project-cost fraction**, not safety-controlled funding. [ISED, first two paragraphs](https://ised-isde.canada.ca/site/ised/en/strategic-response-fund-cohere-compute-expansion-project-public-statement).
- October public equity ceiling: **$1.6 billion**, staged with reporting; announced company milestones include **1,000 additional Canadian technical jobs** and **$1.7 billion additional Canadian compute infrastructure**, both by **2030**, plus continued CAISI cooperation. Those undertakings are not retrieved contractual payment conditions. PM currency is `$` only; CAD is inferred. [PM, commitment, undertaking list and staging paragraph](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai).
- Cohere reports an **initial close** of Series E targeting **CAD $7 billion**, with government among investors; initial-close proceeds are not stated. A target is not a completed cash receipt. Do not add the public ceiling to the round target as though it were outside the round. [Company release, October 29, 2026, 11:45 ET, opening and government-equity paragraphs](https://www.prnewswire.com/news-releases/cohere-announces-series-e-fundraise-targeting-cad-7-billion-to-meet-surging-global-demand-for-secure-sovereign-ai-302923951.html).

### Inferences

The **33.10%** project financing ratio is a genuine sourced number worth showing on a separately labelled contextual measure. It cannot provide y for a future equity-stage safety covenant: different instrument, resource pool and condition. Neither the **2049** agreement end nor **2030** performance milestones establish a negotiable equity payment before Geneva. [Contribution record](https://search.open.canada.ca/grants/record/ic%2C033-2024-2025-Q4-820219%2Ccurrent); [project statement](https://ised-isde.canada.ca/site/ised/en/strategic-response-fund-cohere-compute-expansion-project-public-statement); [October terms announced](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai).

### Gaps

No executed October subscription, public investor legal vehicle, shareholder reserved matters, tranche allocation, disbursement ledger or eligible-cost annex was retrieved. Three materially different channels were pursued: **government/company transaction announcements**, **administrative grants record plus actual amendments view and project assessment**, and **parliamentary disclosure**, now successfully rendered. Institutional web-search attempts also occurred but returned irrelevant results; they are not evidence of absence.

**Recovered Q-935:** ISED's response, tabled **April 24, 2026**, reports **one signed contribution agreement**, **$240 million** supporting a **$725 million** project. It separately reports an **August 19, 2025 MOU** to explore government AI deployment. The contribution row uses March 20, 2025—the announcement date—and gives duration/file number as “Not applicable”; the proactive record supplies a March 10 start and agreement 820219. Preserve that reporting distinction rather than erasing one source. The response covers **January 1, 2024–March 9, 2026**, so it cannot answer October equity-stage questions. No payment ledger or eligible-cost annex appears in the recovered ISED answer. [ISED response, agreement table and part (d)](https://www.ourcommons.ca/written-questions/45-1/q-935/14042537?section=ised).

**Disclosure limits are now distinguishable:** the full-response scan found explicit nondisclosure language from CSE/CSIS/RCMP, and Indigenous Services says some requested arrangements were not systematically tracked and could not be comprehensively compiled in the allotted time. These are substantive withholding/compilation limits, unlike the resolved browser-access problem. They prevent treating ISED's one contribution as a complete government-wide relationship inventory; they do not establish additional financing. [Full Q-935, named departmental replies](https://www.ourcommons.ca/written-questions/45-1/q-935/14042537?section=all).

## 2. Anthropic: which numerical credit facts are actually available?

### Takeaway

**Important correction to earlier repository research:** total facility size is **not missing**. Section 1.01's **Revolving Facility Commitment** definition explicitly states **$15 billion aggregate commitments at closing**. Earlier notes correctly identified a redacted allocation schedule but incorrectly extended that gap to aggregate size. This pass freshly retrieved the 682,490-character exhibit extraction and located the exact definition. [Exhibit 10.10, §1.01](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm).

### Cited findings

| Numerical input | Interpretation and exact locator |
|---|---|
| **$15bn** commitments, September 4, 2026 | Executed-form closing aggregate, §1.01 Revolving Facility Commitment. |
| **$15bn** LC sublimit | Included in the revolver, not additive; §1.01 Letter of Credit Sublimit. |
| **Strictly >50%** | Required Lenders vote rule, not measured support; §1.01 and §9.08. Borrower and applicable exception consents still matter. |
| **Greater of $7.5bn or 50% of assets** | Base incremental-capacity limb, not unused cash; §1.01 Incremental Amount (w). |
| **65%, capped $20bn** | Qualifying-equity-receipts limb with anti-double-use conditions; §1.01 Incremental Amount (y). |
| **478 days** | Arithmetic between original May 14, 2025 closing and September 4, 2026 restatement; recitals. Not negotiation duration. |
| **160 days** after year-end | Annual financial delivery cadence, §5.04(a); calendar calculation gives June 9, 2027, **12 days** before Geneva. Not safety reporting. |
| **5 years** | Initial stated maturity September 4, 2031; §1.01 Maturity Date, subject to springing-maturity/business-day qualifications. |

All table values derive from the [filed credit agreement](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm); the JSON records each value separately with its population and limits. Direct raw SEC requests still returned 403; tool extraction is useful primary-document access, not a retained raw-byte verification.

### Inferences

Known aggregate commitments improve financial context but **do not turn existing commitments into safety-discretionary capital**. The relevant distinction remains elective new credit or an agreed amendment versus compliant committed draws. Schedule 2.01 remains redacted; named arrangers cannot be counted as confirmed lenders or assigned equal shares. No numerical approval coordinate follows from a >50% threshold without allocations and actual assent. [§§2.21–2.23, 4.02, 9.08 and Schedule 2.01](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm).

### Follow-up findings

**Recovered financial statements and amendment history:** S-1 MD&A “Revolving Credit Agreement” (pp.163–164) gives precise commitment totals; Note 9 (pp.F-44–F-45) gives rounded totals and further details. Together they support the following dated inputs. [S-1, MD&A and Note 9](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm).

| Event/measurement date | Recovered observation |
|---|---|
| May 14, 2025 | Original **$2.5bn** revolving facility, **$400m** LC sublimit. |
| September 2025 | Amendment increased commitments by **$250m**, to **$2.75bn**. Note 9 rounds this to $2.8bn. |
| November 2025 | Amendment added **$500m**, to **$3.25bn**. Note 9 rounds this to $3.3bn. |
| December 31, 2025 | **Zero cash borrowings**, **$4m outstanding standby LCs**. |
| February 2026 | Third amendment increased the LC sublimit by **$600m**, to **$1bn**; not another $600m of total commitments. |
| June 30, 2026 | **Zero cash borrowings**, **$78m outstanding standby LCs**, under the **$3.25bn** facility. June interim figures are unaudited. |
| September 2026 | Restatement to **$15bn**, maturity September 2031; minimum-liquidity covenant increased from **$500m to $5bn**. |

**Matched numerical result:** `(3,250m − 0m − 78m) / 3,250m = 0.976`, or **97.6% not utilized by disclosed cash borrowings and LCs at June 30**. The difference is **$3.172bn**, consistent with the separate MD&A statement of approximately **$3.2bn available**. This is a genuine dated financial-resource fraction. It is **not safety coverage, discretionary uncommitted lender capital, or October availability**. Do not combine June's numerator with September's $15bn denominator. [S-1, Liquidity and Capital Resources and Revolving Credit Agreement](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm).

The recovered balance-sheet data also gives **$147.358bn total assets** and **$131.651bn cash, equivalents and short-term investments** at June 30. These are useful context and potential starting inputs for further reconciliation. They are not automatically the agreement's defined asset base or liquidity: contract scope, adjustments, the latest test period and prior capacity usage still need reconciliation. [S-1, Summary Consolidated Financial Data, Actual June 30 column; consolidated balance sheet](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm).

### Remaining gaps

**Remaining precise gap:** MD&A p.139 contains **blank placeholders for September 30 liquidity, cash, investments and availability under the restated facility**. This is now an observed absence of amounts in this public version, not a technical access failure and not a zero balance. No October utilization certificate, unredacted lender allocations or accepted safety covenant was found in the targeted sections. Earlier 5 MiB/403 failures are superseded by browser access for those sections; they remain valid historical retrieval receipts. The cover also directly confirms **October 26, 2026 filing**; neither listing completion nor a confidential-submission date is inferred. [S-1 cover, MD&A p.139 and Exhibit Index omission legend](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm).

**Method:** existing browser, public URLs only, no authentication/storage inspection. Initial `networkidle` timed out; an early `innerText` capture was incomplete. A subsequent `document.body.textContent` extraction returned approximately **1.566 million characters** from approximately **13.816 million characters of HTML**, enabling targeted section reads. A final correctly formed content-readiness check confirmed full text before rechecking balances and blank fields. Task-created tabs were closed and the existing browser left running. No need remains to classify the whole S-1 as inaccessible.

## 3. Coordinate readiness and the next discriminating test

### Takeaway

Both routes now have more defensible numerical inputs, but **neither has a measured exact-safeguard consent fraction or matched covenant-coverage fraction**. Keep x/y null; show the useful contextual numbers with their actual definitions. Missing consent is neither rejection nor permission to assign a synthetic score.

### Cited findings

Canada's staging and CAISI cooperation announcement identifies a proposal hook, not an executed condition; Anthropic's contract identifies agreement machinery, not acceptance of a new safety demand. [Canada announcement](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai); [Anthropic §§2.21–2.23 and 9.08](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm).

### Inferences

For each route, first identify **one dated, genuinely negotiable stage or new-credit event**, its legal signatories and required approvals; then collect accepted covenant language and matched financial amounts. Only then calculate consent and covered-resource fractions. Test evidence delivery, hold/remedy and corrective retest separately from harm reduction. Historical award/credit dates above are useful process context, not empirical safety implementation times.

### Gaps

The highest-value next documents are **Canada's executed equity subscription and contribution payment/cost annexes**, and **Anthropic's populated post-restatement utilization disclosure plus an authoritative allocation schedule**. The targeted public-browser follow-up resolved both named access gaps and recovered usable matched historical financial inputs; it did not recover those underlying documents or exact-safeguard consents. No exhaustive absence claim is made. Session-start status returned guide `share-sessions` version `2026-10-29.1` and no user items; no guide change was adopted.
