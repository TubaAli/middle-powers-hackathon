# Finance layer implementation handoff

**Proposal only; no production or DESIGN edits.** Evidence cutoff: 31 October 2026. Companion: [Financial leverage synthesis](Financial%20leverage%20for%20safer%20AI.md). Sources and access limits are in that report and the five notes under `research_notes/Financial leverage for safer AI/`.

## Smallest useful addition

Add a hand-curated finance-rights dataset and an evidence drawer beside the physical supply-chain view. One record represents **one holder, one right, one target, one decision context**. A separate transaction identifier groups records sharing a financing amount. Country selection discovers relevant institutions; it never grants a government their powers.

First seed candidates: Anthropic credit-syndicate agreement; Canadian Cohere staged-equity announcement; historical JBIC–NTT GDCI loan plus a separate guideline-governance record; GIC mandate/internal risk gate; Aligned consortium ownership and completed seller exit; EuroHPC procurement. Label candidates as research leads where authority, remaining discretion or safety reach is unresolved.

## Minimal field schema

| Field | Contents and required behavior |
|---|---|
| `id`, `transaction_id` | Stable right ID and shared deal/facility ID. Preserve multiple rights; count any shared amount once. |
| `holder`, `decision_body`, `target` | Named legal institution, actual approving body, covered counterparty. Explicit nulls for unknowns; retain a label such as “Government of Canada—vehicle unknown.” |
| `holder_jurisdiction`, `asset_jurisdictions`, `state_authority_basis` | Separate institutional location, host-state authority and evidenced government mandate. Support multinational consortia without assigning the entire consortium to one country. |
| `instrument`, `right`, `right_status` | Instrument type; exact action permitted; `documented`, `announced`, `proposed`, or `unknown`. Distinguish board election, stockholder voting, creditor consent and operating authority. |
| `transaction_status`, `evidence_type` | `announced`, `signed`, `closed`, `repaid`, `cancelled`, `exited`, or `unknown`; separately identify contract, filing, official release or reporting. A press release can evidence a closed transaction without exposing its contract rights. |
| `finance` | Object: `flow_type`, `amount`, `unit`, `currency`, `currency_basis`, `amount_basis`, `payment_status`, `as_of`. Distinguish equity/debt/lease/procurement/guarantee, investor cheque/round total/facility cap/enterprise value, and funded/committed/conditional/undisclosed. No implicit FX conversion. |
| `dates` | Separate announcement, signature, closing, maturity/sunset, next decision, publication and observation dates. Distinguish filing date from public-release date. |
| `window` | `open`, `closed`, `unknown`, or `conditional`; basis, discretion evidence and dependencies. Periodic review or future draw alone does not establish an open renegotiation right. |
| `consent` | Threshold, denominator, holder allocation, exceptions, borrower consent and source. Null allocation cannot become zero or assumed majority. |
| `substitutes`, `incentive` | Named capital/capacity alternatives and evidence; why the institution might accept/refuse the demand. Separate observed facts from hypotheses. |
| `conditions` | Six IDs, each with `existing_evidenced`, `proposed_reachable`, `outside_instrument_scope`, or `unknown`; obligor, verifier, deliverable, remedy and expiry/survival. A proposed clause never lights an “existing power” badge. |
| `evidence`, `gaps` | Claim-level URL, locator/short quotation, source date, observation date, `full`/`partial`/`index_only`/`phrase_match` access, confidence and next falsifying test. |

Keep financial quantities independent of rights. Do not multiply exposure by a qualitative power score. If displaying opportunity counts, count only records with **documented discretion and a verified open window**, separately from announcements and research leads. No current exact count is justified by the unresolved Canadian stage terms. A second count can describe evidenced safety obligations, without claiming completeness.

## Specific proposed DESIGN.md corrections

| Location | Proposed correction |
|---|---|
| One-line pitch and coalition score, lines 3, 20–23 | Physical market share is not enforceable bargaining power. Label weighted physical/software results as scenarios; exclude finance from that score. Finance output: named right, scope, window and uncertainty. |
| Source table, line 11 | Treat roughly 40% and its decline as the blog’s weighted scenario, not an independently measured national-control share. |
| Source table, line 12; timeline, line 28 | Replace single EuroHPC deadline with Lot 2: 3 December 2026 and Lot 1: 4 February 2027, both 17:00 Europe/Luxembourg. Other blog dates require their own verification. Mandate-review dates remain unknown unless documented. |
| Mapping description, line 13 | June snapshot inspected: 1,968 entities / 2,946 relationships; not a complete October census. Describe US-centered scope without denying non-US entities. Public funding edges do not expose confidence universally. |
| Dependence lens, line 14 | Funding concentration is relationship-count concentration; red is strictly greater than 60%, not at least 60%. “Kingmaker” means unique selected policy recipients, not financial control. |
| Demand cards, line 23 | Separate proposed instrument reach from existing enforceable rights. No finance-based “credible” label without holder, discretion, obligor, verification and remedy. An infrastructure landlord cannot promise a developer’s weights. |
| Sankey and HHI, lines 25–27 | Keep physical flows only where consistent units and denominators exist. Use unweighted rights edges for mixed finance; no cross-instrument dollar Sankey, national money share or simulated causal withdrawal loss. |
| Limitations, line 34 | Add contract redactions, unknown allocations, jurisdiction, replacement finance, coalition willingness and rights sunsets. Evidence of a transaction is not evidence of safety authority. |
| Build plan, lines 39–42 | Optional separate `data/finance-rights.json`; evidence drawer and condition links first. Do not alter production solely on this handoff. |

## Corrections that must survive implementation

Canada: currency unstated, CAD inferred; investing vehicle, signatory and board rights unknown. Jobs/compute reporting and CAISI cooperation are not a safety veto. Co-announced NVIDIA, Bell and Schwarz Group participation cannot be assigned invented amounts.

Singapore: GIC deal autonomy and state mandate rights are different layers; Temasek charter consultation is not approval of individual deals. Do not import GIC-specific presidential/board details into Temasek without evidence.

Aligned: consortium ownership is documented, individual MGX rights unknown. Stated operational independence constrains assumptions but does not prove no shareholder influence. Keep US and Latin American host jurisdictions; record Macquarie-managed sellers as exited. Enterprise value, growth capital and AIP mobilization targets are distinct quantities.

Anthropic: present Class T board-election rights and proposed post-IPO Class T/Class F locks separately. Neither is a direct safety-release order. Do not assume all investors become non-voting or all preferred rights disappear at pricing; use the applicable conversion/closing trigger. Bank arranger titles do not establish lender allocations. Required-Lenders majority is not a universal amendment rule; exceptions and borrower consent need extraction. Scheduled draws are not discretionary capital calls. Phrase matches do not identify IPO lead underwriters. Index plus selected exhibits is not a full prospectus review.

JBIC: signed historical loan is closed to initial negotiation; later amendment/renewal windows require evidence. Environmental/social procedures demonstrate a conditions mechanism, not current AI-safety authority. DiGi is a coordination precedent, not consent to this proposal.

## Acceptance checks before displaying a finance claim

Check the displayed result against its cited document and access status. Unknowns render explicitly, including currency and allocations. Changing selected countries never transfers private rights to governments. Multiple right records do not duplicate transaction amounts. Existing, proposed and unreachable safety conditions look different. Repaid/cancelled/exited relationships remain historical, not live levers. The three research tests in the report determine whether any candidate advances to an evidenced negotiating opportunity.
