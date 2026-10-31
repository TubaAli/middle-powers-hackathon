# South Asia and Gulf: four instrument-level candidates

Observation cutoff: **31 October 2026**. Delivery checkpoint: **21–22 June 2027**, supplied by the project brief. Scope: four cards, one each for India, UAE, SaudiArabia and Türkiye. JSON: `data/route-research/south-asia-gulf.json`.

All four safety requirements are **proposals**. The underlying mechanisms are documented; adoption, implementation, changed behaviour and risk reduction are separate claims. All legacy scores are compatibility placeholders and must not be plotted. Coverage is `null` for every card: no matched operational numerator/denominator was obtained. No GDP fractions are used.

## Source ledger and actual scope

The source IDs below resolve to URLs, locators, claims, publication dates and access status in the JSON. All eight controlling sources were read through their official sites. `published: null` means an exact publication day was not established, not that the document has no date. Text extraction of PDFs was used; no graph/table-derived numerical coverage claim is made.

| Route | Controlling source IDs | Publication / event / update distinction | Scope and access |
|---|---|---|---|
| IndiaAI allocation | `in-end-user-policy`, `in-compute-portal` | Policy cover: February 2025, exact day unknown. Portal footer: updated 14 October 2026, not publication. | Policy sections 4.6, 5 and 6; public portal FAQs read. Authentication and award records not accessed. |
| Dubai service assurance | `ae-agentic-programme`, `ae-agentic-launch` | Programme page undated; launch published and event dated 5 October 2026. | Programme stages and direct leadership statements read. Dubai government-service scope, not UAE-wide procurement authority. |
| Saudi CST sandbox | `sa-cst-guidelines`, `sa-cst-registration` | Guidelines cover: May 2025, exact day unknown; service page undated. | Agreement, safeguards, monitoring and breach sections read from official PDF; service requirements read. No applicant submission or contact. |
| Türkiye 1711 grant | `tr-1711-updated-call`, `tr-1711-programme` | Updated PDF path contains September 2026, not an established publication day. Closing event: 2 October 2026. | Updated call controls deadline/signature interpretation; programme FAQ controls the limited repayment statement. No executed project contract read. |

### India: prospective subsidy allocation conditions

The proposed pilot uses one already-verified company's subsidised allocation above 5,000 GPU-hours and one provider. This avoids reliance on the public FAQ's simplified automatic-approval description for smaller requests. It avoids counting PMEC as an institution separate from IndiaAI/DIC. A two-interface lower bound follows the allocation and service relationship; it does not resolve amendment approvals. Section 7(a) describes revocable access, but does not settle the proposed safety-triggered procedure. Source: `in-end-user-policy`; `in-compute-portal`.

**Critical contradiction:** policy section 4.6 states 0–50%, while section 5.2 states a maximum 40% subsidy. Preserve the conflict. Neither is an affected-compute fraction. An announced GPU fleet is also not metered usage under signed safety terms. Source: `in-end-user-policy`.

**Proposed validation:** by December identify a lawful prospective cohort and signed flow-down; by March run a version-linked evaluation; by May reconcile workload IDs, metering and incident drill logs. Report covered GPU-hours / eligible cohort GPU-hours for the same period and accelerator class. Report a failed or missed enforcement action, not only successful tests. These are research milestones, not institutional commitments.

### UAE: a Dubai deployment acceptance schedule

The concrete hook is independent assurance at the accelerator's deployment stage. The launch's 33 entities and over 300 assessed use cases are different populations, neither a numerator of passed deployments. Source: `ae-agentic-programme`; `ae-agentic-launch`.

The current, directly attributed Digital Dubai/DESC responsible-use and lifecycle-security statements support a directional policy signal. Exact consent remains unknown. DFF's adoption ambition is not classified as safety-gate consent. Security partners are not counted as independent veto institutions without authority evidence; the actual approval path remains unknown, so no handoff number is offered. Source: `ae-agentic-launch`.

**Proposed validation:** secure one service owner's written acceptance authority, test rights and fallback channel by January; preregister injection and unauthorised-action tests; require one seeded failure to prevent acceptance and one corrected retest by May. Coverage should count passed-and-signed live services over all live services in that same accelerator cohort, not all proposed use cases. A deployed programme badge alone fails validation.

### Saudi Arabia: agree an AI-specific sandbox stop-rule

CST's guidelines expressly provide a negotiated plan, monthly evidence and breach outcomes. Applicability is limited by CST jurisdiction; any other regulator's role must be checked for the chosen service. The sandbox team is not another institution. Source: `sa-cst-guidelines`.

Rolling admission is documented, but actual intake capacity is unverified. Published lifecycle stages make full graduation by June an unreliable promise for a new late-2026 applicant. Source: `sa-cst-guidelines`; `sa-cst-registration`.

**Proposed validation:** identify an eligible participant approaching plan agreement, set a measurable failure threshold and evidence-retention rules, then demonstrate a contained stop/retest cycle by May. Use covered AI transactions / all AI transactions within that same service and period. Keep market launch and national risk reduction outside this test's claims.

### Türkiye: a conditional pre-signature opportunity after a closed call

The 2026 call is closed. Crucially, updated section 15.2 permits the cooperation agreement to be signed by project-contract signature. This is a possible negotiation point, not evidence that any award remains unsigned or that material award changes are lawful. The minimum sampled path is TÜBİTAK, customer, SME and a legally separate research institution; TEYDEB/YZE are internal roles. Source: `tr-1711-updated-call`; `tr-1711-programme`.

**Proposed validation:** first obtain an unsigned eligible award and permission for the extra work package; otherwise mark this pre-Geneva route unavailable rather than invent a 2027 call. By May seek interim reproducible evaluation and a customer acceptance/correction decision. The routine first-half period ends 30 June, after Geneva, so an interim packet is necessary. Expenditure coverage needs a same-cohort ledger; historic support totals and percentage reimbursement rates cannot supply it. Ordinary failure is not automatic clawback. Source: `tr-1711-updated-call`; `tr-1711-programme`.

## Retrieval gaps and discarded leads

- The HTTP text reader could not extract the three PDF sources. They were subsequently retrieved and read with macOS PDFKit text extraction. No missing PDF is labelled read solely from a search snippet.
- The TÜBİTAK programme FAQ still describes pre-application agreement in its intellectual-property answer; the updated call's specific section 15.2 permits signature by the project contract. This discrepancy needs confirmation before treating a particular project's agreement as still negotiable.
- UAE AI Seal is mentioned by the accelerator but is not used as authority for the proposed safety requirement. No national strategy is treated as an enforcement instrument.
- Unread/unobtained: executed IndiaAI provider agreements; authenticated allocation ledger; Dubai pilot acceptance/security-policy text; any selected CST AI plan; TÜBİTAK award list, executed cooperation agreement and full general grant-amendment rules. Absence from this retrieval does not establish nonexistence.
- No direct contemporaneous leadership statement approving the exact proposed requirement was found for any route. India, Saudi and Türkiye leadership alignment therefore remains unknown.

## Acceptance check for the Geneva checkpoint

For each candidate, record separately: (1) authorised signed adoption, (2) a real operational test, (3) observed correction/withholding/stop behaviour, and (4) any defensible outcome evidence. Only (1)–(3) are targeted here; neither a signature nor a simulated success establishes risk reduction. Preserve failed tests and refusals. Obtain an exhaustive approval set before presenting an agreement-completion fraction; the JSON actor lists are incomplete maps, not approval denominators.

Next discriminating question: **which institution can provide one actual, still-open agreement or allocation decision, an authorised signatory and the matching operational ledger before committing to a pilot?**

## Local verification

Parsed the actual saved JSON and checked four unique route IDs, four requested country labels, every required top-level/source field, eight controlling sources, resolvable source references, unknown exact consents, null coverage, the mandated compatibility placeholders and handoff lower bounds. All checks passed. This verifies the research input files, not parent-site integration or publication.
