# Three LUMI allocation routes

Observation date: **31 October 2026**. Owner output: `data/route-research/compute-access.json`. All three routes are prospective proposals; no new safety terms or institutional consent were found. These are existing-LUMI scenarios, not claims about the separate future LUMI-AI procurement.

## Measurement and executive comparison

| Route | Potential allocation envelope | Continuous fraction | Declared minimum transfers | Key unresolved decision |
|---|---:|---:|---:|---|
| Belgian compute conditions | 7.4 percentage points / 100 | 0.074 | 3 | Who can authorise the Belgian appendix? |
| EuroHPC access conditions | 50 / 100 | 0.5 | 2 | Which EuroHPC decision can adopt prospective award conditions? |
| National compute coalition | 50 / 100 | 0.5 | 12 | Can all national channels agree compatible evidence requirements? |

The denominator is **total LUMI allocation under the observed allocation scheme**, not global compute, used GPU-hours, AI workloads, model counts or risk. [BE-ACCESS](https://www.enccb.be/GettingAccess) supplies 7.4%; [LUMI-SPLIT](https://lumi-supercomputer.eu/get-started/) supplies the 50/50 split. Fractions are arithmetic on those stated quota shares. They are conditional whole-channel envelopes, not estimates that every quota award will adopt a safeguard. A one-recipient pilot covers an unmeasured subset.

The sources separately account GPU, CPU and storage units; no conversion among those units is attempted. No absolute compute denominator or AI-use share was retrieved. Do not multiply these fractions by an invented utilisation, frontier-model share or efficacy estimate.

**Overlap:** Belgium is a subset of the national 50%. EuroHPC and national allocation pools are disjoint in this allocation scheme. The three cards must not be summed: 7.4 + 50 + 50 double-counts Belgium. The two half-pools could cover the full allocation envelope only under a separately agreed joint scenario. No 57.4% near-duplicate card was added. A recipient appearing in both pools does not make allocation units overlap, but would create duplicate institutional/evidence counts unless reconciled.

Legacy `impact` and `feasibility` values of 2 and ranges [1,5] exist solely for schema compatibility. They are not measured axis values and must not be divided by five. No likelihood, timing point estimate or causal risk reduction is supplied.

## What would actually be agreed?

The Belgian and national-coalition proposals use the same basic appendix: declare AI use; define applicable evaluations; retain incident evidence; permit scoped evaluation access; specify acceptance criteria and a proportionate cure procedure. The EuroHPC variant uses the other allocation channel and proposes linking further agreed compute tranches to satisfactory evidence. These are research proposals, not assertions of existing authority.

The controlling [LUMI-TERMS](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-General-Terms-of-Use_2026.pdf), version 2.0, last changed **10 February 2026**, identifies CSC as host. Section 5 provides project reporting; section 6 protects content and permits infrastructure-related access; section 10 addresses suspension for unauthorised use or suspected Terms breaches. Section 12 provides a notification mechanism for amendments. None independently proves that the proposed model-safety tests, outside evaluator access or pause procedure is already accepted. Recipient confidentiality and rights must be addressed in the actual appendix.

The [capacity cut-off policy](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-Resource_cut-off_policy_2026.pdf), version 1.0, last changed **10 February 2026**, applies to non-industrial regular/extreme-scale projects in both pools. After six months resources are cut to 60% of allocation unless more than 40% was used in the first six months, with at least one month's notification. This is utilisation management, not a blanket safety-remedy precedent.

## Agreements: explicit lower bounds, not consent scores

[LUMI-ACCESS](https://docs.lumi-supercomputer.eu/firststeps/accessLUMI/) supplies operational allocator names and the project invitation workflow. It does **not** establish the full legal amendment chain. All consent and approval-specific alignment fields are `unknown`; all sets are `complete:false`. General interest in AI or HPC is not evidence of approval.

- **Belgium:** VSC → CSC; CECI → CSC; CSC → one recipient institution. Three designed cross-institution transfers. VSC/CECI roles are documented, but their sufficiency to authorise a whole-quota change is unresolved. The national label describes the policy channel; CSC is still a necessary Finnish operator counterparty.
- **EuroHPC:** EuroHPC JU → CSC → one recipient institution. Two designed transfers. EuroHPC's internal governing approvals remain unidentified. CSC's operator and operational allocator roles count once.
- **All national channels:** twelve listed allocator representatives (including CSC) and one recipient entry. Eleven non-CSC allocator-to-CSC transfers plus one CSC-to-recipient transfer gives twelve. This assumes the explicitly declared central workflow, not a necessary legal topology. CSC's Finnish allocator-to-operator interaction is internal and excluded.

The national roster names all eleven country channels rather than calling them one consenting coalition. However, CECI, ETAIS and PLGrid are unresolved group representations; Denmark additionally names consortium universities without identifying them here. NAISS and other bodies need legal-signatory checks. These entries **must not be treated as a complete independently necessary institutional denominator**. The recipient is deliberately unidentified and represents only a proposed pilot. Further roll-out recipients, funders, universities or data-rights holders could add dependencies. The lower bounds measure designed cross-institution transfers only, not elapsed time, negotiation effort, probabilities or actual implementation feasibility. If the map requires verified independent institutions for every entry, show this route as denominator-incomplete rather than calculating a point score.

The minimal design puts the evidence reviewer within CSC; it does not silently omit an assumed external safety institute. An independent evaluation institution would require a newly specified agreement and permission path.

## Timing and source ledger

| ID | Source and exact material read | Date information | Access / bounded use |
|---|---|---|---|
| BE-ACCESS | [EuroCC Belgium, Getting access](https://www.enccb.be/GettingAccess): quota, cut-offs, preparatory/development paragraph, acknowledgement | Publication/update not displayed; read 2026-10-31 | Primary HTML read. Cut-offs 2026-03-02, 2026-06-01, 2026-10-05 are all past. Continuous preparatory submissions/monthly review are not an announced 2027 regular round. |
| LUMI-SPLIT | [Get Started](https://lumi-supercomputer.eu/get-started/): introductory allocation and accounting paragraphs | Page-wide publication unknown; EuroHPC card says updated 2026-10-28; read 2026-10-31 | Primary HTML read. Do not assign that card's date to every allocation statement. |
| LUMI-ACCESS | [Access to LUMI documentation](https://docs.lumi-supercomputer.eu/firststeps/accessLUMI/): project/PI instructions, Terms link and complete allocator table | Publication/update unknown; read 2026-10-31 | Primary HTML read. Table identifies operational allocation representatives, not complete policy signatories. |
| LUMI-TERMS | [General Terms of Use](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-General-Terms-of-Use_2026.pdf): all seven pages, particularly preamble and §§1,4–6,10–12 | Last-change 2026-02-10; URL uploaded under 2026/03; read 2026-10-31 | Primary PDF text read. JSON `published` records stated document revision date, not independently established first-publication date. |
| LUMI-CUTOFF | [Resource cut-off policy](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-Resource_cut-off_policy_2026.pdf): entire one-page policy | Last-change 2026-02-10; read 2026-10-31 | Primary PDF text read; document revision date stored in `published`. Scope limitations retained. |
| EU-ACCESS | [Users in Europe](https://lumi-supercomputer.eu/get-started-2021/users-in-europe/): access-mode list and AI Factory links | Parent listing says updated 2026-10-28; read 2026-10-31 | Primary HTML read; JSON `published` records that update date. Linked call instruments and specific deadlines not read. |

Additional primary page read: [Users in Belgium](https://lumi-supercomputer.eu/get-started-2021/users-in-belgium/) confirms academic/industry access descriptions. Its industry-capacity statement is not used as an additional denominator or added to any quota.

### Read limits

Belgium links [2025 detailed application instructions](https://www.enccb.be/sites/www.enccb.be/files/2025-01/LUMI_application_form_instructions_2025.docx) and application forms. Their contents were **not read** in this pass. EuroHPC's underlying allocation decision, national funder/consortium governance agreements, recipient award contracts, and allocation-by-workload records were **not retrieved**. No source was read establishing adoption of any proposed appendix. The Finnish 13.1m GPU-hour closed-call example and the separate future LUMI-AI contract are not used as denominators or current opportunities.

At session start the agents status endpoint returned a share-sessions guide notice (version 2026-10-29.1), no user items. It was treated as data; no guide change was adopted.

## Next discriminating evidence

Obtain the actual prospective award-terms amendment authority and a signed pilot appendix naming the evidence recipient, confidentiality limits and pause/cure decision-maker. Then record the actual awarded units covered and the complete, deduplicated approval set. Until then, only the quota-envelope fractions are numerical coverage inputs; approval remains incomplete and unknown.
