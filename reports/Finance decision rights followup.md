# Financial leverage: from funding connections to contract rights

**Evidence cutoff: 31 October 2026.** Follow-up for the **Leverage Map + Coalition Builder**. Read with the [finance data handoff](Finance%20layer%20handoff.md) and the [verification notes](../research_notes/Finance%20decision%20rights%20followup/METHOD.md).

## Result

**EuroHPC is now our strongest worked example of public financing buying concrete safeguards.** Its model procurement contract already combines infrastructure-security duties, incident notification, asset oversight and remedies. That is materially stronger evidence than a map of investors. However, it is a **draft contract**, not evidence of an executed agreement or a power to control frontier-model releases. The promising next step is to specify which model-related risks fall within those duties and which require a new, agreed obligation. [S1]

The other two tests remain useful but incomplete. Anthropic's credit terms distinguish committed lending from discretionary new credit; they do not establish a coalition safety veto. Canada's Cohere announcement establishes staged public investment and a safety-cooperation commitment, but not the investing vehicle, draw conditions or enforceable safety deliverables. [S2][S3]

| Candidate | What we can map now | What we cannot claim |
|---|---|---|
| **EuroHPC public purchasers → gigafactory contractor** | Explicit duties and remedies in the published model contract; distinct public-buyer and operator roles | That the draft is signed; that infrastructure security equals a model-release veto |
| **Anthropic prospective lenders → new credit** | Contractual routes for incremental commitments, extensions, refinancing and agreed amendments, checked against retained source text | A right to withhold compliant committed draws; a known non-US lender majority; a dated new financing request |
| **Government of Canada → Cohere** | Announced staged equity, company commitments and progress reporting | A confirmed CDEV investment; discretionary unpaid tranches; a defined evaluator-access right |

## 1. EuroHPC: a concrete contract path, with a narrower safety scope

The initial memo could not read the tender pack and relied on secondary summaries. We subsequently downloaded the revised specifications, model framework contract, change history and Annex 2, retained their hashes, and reviewed the relevant clauses directly. The raw-document check **corrected the earlier suggestion that incident/security provisions were missing**. [S1][S4][S5]

### The strongest demonstrated path

**Public purchase of compute → contractor's security-notification duty → breach remedy with a stated procedure.**

The model framework contract's **Article I.14.6** requires notification of security breaches, continuing information sharing, and notification and implementation of mitigation/resilience measures. Its scope expressly includes relevant breaches beyond the publicly supported activities. **Article II.18.1(p)** makes violation of the specified security/confidentiality provisions a termination ground. **Article II.18.3** provides notice and an opportunity to submit observations before the final decision, and requires transition assistance. These are textual links between an obligation, a beneficiary and a remedy—not an inference from money invested. [S1, pp.20, 54–55]

That path would operate under the completed agreement. It does **not** mean a security allegation automatically permits termination, nor that the buyer can order a model's worldwide withdrawal. The obligor is the contractor; the underlying facts, applicable provisions, procedure and resulting agreement still matter. [S1]

### Other rights worth showing separately

- **Asset oversight:** Article I.16.3 requires periodic asset/system inventory information; I.16.5 reserves specified structural changes and critical-asset relocations for Public Governance Body approval. This is not a verified serial-number inventory of every chip. [S1, p.22]
- **Additional security measures:** I.14.7 allows the contracting authorities to request appropriate measures on security/public-order grounds. This is a request power, not a general unilateral variation power. [S1, p.20]
- **Additional service requirements:** Specific Contract Article 11.5 requires reasonable efforts to accommodate requested technical requirements/SLAs without extra cost. It does not promise acceptance of any proposed evaluation regime. [S1, p.72]
- **Operator-level restriction:** I.15.3 gives the contractor a right to suspend or restrict a risky user's access. The public buyer and the operator must therefore be different nodes in the map. [S1, p.21]
- **Written flow-down:** I.14.3(c) extends end-user screening/supervision obligations across the facility, including anchor-customer capacity. It is an eligibility/security flow-down, not a general obligation to allow pre-release model evaluations. [S1, p.20]

Article II.11.2 restricts amendments that alter the initial procurement conditions or create unequal treatment. We should therefore present a proposed model-safety annex as something needing a lawful route and agreement—not a feature the buyer can simply switch on. [S1, p.45]

**Important limit on the limit:** user ownership of intellectual property does not by itself put weights outside every security obligation. We found no explicit right to take custody of weights or inspect them for pre-release evaluation. That narrower statement is supported; categorical exclusion from all contractual protection would overreach. [S1, I.20.1 and I.14]

### Timing and coalition membership

The portal's announcement, updated **26 October 2026**, states **4 February 2027** for Lot 1 and **3 December 2026** for Lot 2. Its older Lot 1 milestone field still shows 3 December. Preserve the conflicting metadata, use the explicit extension announcement for the research record, and verify the applicable submission terms before anyone acts. The questioner's claim of an earlier decision date is not official proof of that date. [S6]

Annex 2 identifies national contracting authorities. A country's participation in EuroHPC generally is not equivalent to a vote or payment commitment in this specific procurement. Nor can a set of national purchasers be assumed to control every Public Governance Body decision: the draft assigns the Commission and national authorities separate voting shares. [S1, I.16.2; S5]

## 2. Anthropic: condition new finance, do not invent a draw veto

The retained EX-10.10 text expressly gives lenders discretion over new incremental commitments, extension participation and replacement facilities. Its amendment provisions also require borrower agreement and the applicable lender consents. Existing credit-event conditions are a different category. A safety condition would need an appropriate new agreement or amendment; a lender's policy preference is not itself a new condition on an already compliant draw. [S2, §§2.21–2.23, 4.02, 9.08]

This is **a prospective negotiating route**, not proof of bargaining strength. We do not know which named arrangers are current lenders, their allocations, whether a relevant financing request is open, or the cost of replacing them. Alternative financing relationships show possible substitutes, not cheap or immediately available substitutes. [S2; initial financing notes]

Direct raw SEC retrieval was blocked. We recovered the earlier tool's full extracted exhibit text and checked the key passages against it; it is retained and hashed separately from raw HTML. This improves on relying only on a researcher's paraphrase, but remains a distinct provenance class. We have not completed an independent full-prospectus financial analysis. “Not read” must not become “not filed.”

## 3. Cohere: determine the actual funding conditions

The Canadian announcement names the Government of Canada, an equity ceiling of **$1.6 billion**, staged investment, company commitments and regular progress reporting. It does not name the investing legal entity or set out an executed subscription. The source uses a dollar sign without spelling out the currency; the data record marks CAD as inferred rather than silently treating it as explicit. [S3]

Its reporting sentence says **“including jobs and investment”**. Those are examples, not an exhaustive limitation. The listed commitments also include continued work with CAISI. But the announcement supplies no specific model-evaluation deliverable, evidence standard, draw-stop right or remedy. [S3]

The decisive question is **what conditions govern later funding**, not whether there is one agreement or several. A single agreement can contain conditional draws, certifications, milestones or breach remedies. Separate subscriptions can also involve pre-existing commitments. We therefore mark present discretion **unknown**. [Research inference; no subscription retrieved]

CDEV's statute documents a potentially relevant institution's capacity. It does not establish that CDEV is this investment's holder, validate our proposed clause, or prove that the terms will remain secret. The current powers or contractual role of CAISI also cannot be inferred exhaustively from its launch announcement. [S3][S7]

## What to build and what to ask next

The [research dataset](../data/finance-research/README.md) separates:

1. a duty **written in a draft**;
2. a documented financing decision with **proposed safety use**;
3. an announced relationship with **unknown decision rights**.

For the demo, start with the EuroHPC incident-notification path and let users inspect **holder, obligor, scope, evidence, remedy and execution status**. Then show where a proposed evaluator-access requirement breaks that path. This is a stronger demonstration than giving each country an invented finance-leverage score.

The [desk-only clarification pack](Finance%20clarification%20questions.md) specifies the next discriminating evidence for all three candidates. **No questions have been sent.** The practical priority is a precise interpretation of EuroHPC's existing security measures and user terms; for Anthropic and Cohere, obtain the missing commitment/draw-condition evidence before assigning an actionable-right label.

## Method and limits

We used the requested Deeper Research skill's raw-retention and independent-refutation discipline. Its full Exa pipeline did not run: preflight returned exit 20, and no Exa expenditure occurred. The checks here are bounded source and inference checks, not legal advice, a complete literature review, or evidence of institutional willingness to cooperate. Original notes remain available with correction notices; the raw-document verification and this synthesis supersede their broader inferences.

### Primary source key

- **S1:** [EuroHPC model Framework Contract, revised PDF](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Annex%203%20-%20Model%20FWC%20v2_V2.pdf).
- **S2:** [Anthropic EX-10.10 credit agreement](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/exhibit1010-sx1.htm), retained tool-extracted text; raw retrieval blocked.
- **S3:** [Canada's Cohere investment announcement, 29 October 2026](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai).
- **S4:** [EuroHPC revised Tender Specifications](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Tender%20Specifications%20v2_V1.pdf).
- **S5:** [EuroHPC Annex 2](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Annex%202_V1.pdf).
- **S6:** [Official procurement portal, EUROHPC/2026/OP/0008](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/bc712395-692d-41ab-aa25-8e254ae86eb2-CN).
- **S7:** [Canada Development Investment Corporation Act](https://laws-lois.justice.gc.ca/eng/acts/C-3.43/FullText.html), general institutional authority only.
