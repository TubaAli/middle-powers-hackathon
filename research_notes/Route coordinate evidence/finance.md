# Financing-route coordinate evidence

Observed **31 October 2026**; Geneva checkpoint **21–22 June 2027** (task-supplied). Machine-readable claims, dates, access grades, limits and retrieval outcomes are in `finance.json`. Only these two assigned files were edited. No git, installations, paid access, subagents or contacts were used.

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

No executed October subscription, public investor legal vehicle, shareholder reserved matters, tranche allocation, disbursement ledger or eligible-cost annex was retrieved. Three materially different channels were pursued: **government/company transaction announcements**, **administrative grants record plus actual amendments view and project assessment**, and **parliamentary disclosure**. Institutional web-search attempts also occurred but returned irrelevant results; they are not evidence of absence.

**Best next retrieval:** Q-935 asks for all government–Cohere agreements since 2024, including value, terms, type, duration and file number. Its response was tabled **April 24, 2026**, Sessional Paper **8555-451-935**. Metadata is readable; ISED's answer body remains dynamically `Loading`. Inspecting the public site's JavaScript exposed the response endpoint, but it returned HTTP 400. This is **inaccessible answer content**, not no answer, and concerns historical arrangements rather than the later October agreement. [Filtered public response](https://www.ourcommons.ca/written-questions/45-1/q-935/14042537?section=ised).

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

### Gaps

Current borrowing and LC utilization, remaining incremental headroom, holder allocations, borrower request date and accepted safety conditions remain unresolved. Three approaches were attempted: **operative exhibit definitions/schedules**, **whole S-1 financial-statement retrieval**, and **lender/company publication searches**. The full S-1 exceeded the webfetch 5 MiB limit and direct requests returned 403; institutional searches produced nonresponsive generic results; a guessed company announcement URL returned 404. These access/search failures are logged explicitly rather than called proof of nonpublication.

**Correction to the interim progress message:** the S-1 financial-statement body was **not successfully retained/read in this pass**. The verified $15bn finding comes from the credit agreement itself. No historic utilization figure from the S-1 is used. Existing or confidential filing status is not disproved by any retrieval failure. [Attempted S-1 body](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm).

## 3. Coordinate readiness and the next discriminating test

### Takeaway

Both routes now have more defensible numerical inputs, but **neither has a measured exact-safeguard consent fraction or matched covenant-coverage fraction**. Keep x/y null; show the useful contextual numbers with their actual definitions. Missing consent is neither rejection nor permission to assign a synthetic score.

### Cited findings

Canada's staging and CAISI cooperation announcement identifies a proposal hook, not an executed condition; Anthropic's contract identifies agreement machinery, not acceptance of a new safety demand. [Canada announcement](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai); [Anthropic §§2.21–2.23 and 9.08](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm).

### Inferences

For each route, first identify **one dated, genuinely negotiable stage or new-credit event**, its legal signatories and required approvals; then collect accepted covenant language and matched financial amounts. Only then calculate consent and covered-resource fractions. Test evidence delivery, hold/remedy and corrective retest separately from harm reduction. Historical award/credit dates above are useful process context, not empirical safety implementation times.

### Gaps

The highest-value next documents are **Canada's executed equity subscription and contribution payment/cost annexes**, and **Anthropic's readable S-1 financial statements plus an authoritative allocation schedule**. Retrieval exhaustion is not claimed: the parliamentary answer and large prospectus remain real access gaps. Session-start status returned guide `share-sessions` version `2026-10-29.1` and no user items; no guide change was adopted.
