# Compute-subsidy safeguard stress tests

Observed **31 October 2026**; prospective checkpoint **Geneva, 21–22 June 2027**. Assigned routes only. Assessments below qualify the proposals; **no model scores were changed**. The companion `compute.json` contains four follow-up designs, source/access metadata and the bounded retrieval ledger. Primary PDFs and their page-marked text are in `compute-source-extracts/`.

Method: read the repository's README, notes, design, route model, quantitative cards and coordinate evidence before retrieval. Following the requested [deeper-research](https://github.com/nraford7/deeper-research) and [Agent Studio](https://github.com/nraford7/agent-studio) READMEs, use retrieved evidence for factual claims and contrasting priorities to expose trade-offs. The latter are **analytical lenses, not testimony, institutional consent or an actual panel**. No tools from those repositories were installed or run. Their underlying methodological research was not independently audited. This is a bounded decision-focused pass, not source exhaustion.

## 1. IndiaAI: can a subsidy condition actually stop the relevant harm?

### Takeaway

**Qualified. The strongest new evidence is a concrete bypass of the assumed remedy:** E2E documents continued operation at commercial prices after an IndiaAI project's expiry. This does not prove evasion after a safety violation, but it decisively separates a **funding hold** from a **workload stop**. The most valuable next experiment is a two-switch enforcement rehearsal, paired with a funded, version-specific evaluator service. [E2E, Billing and Platform Service][e2e]

### Cited Findings

- **Fact—provider implementation.** E2E says the approved subsidy has a maximum, and after project expiry services on IndiaAI SKUs continue running under E2E pricing, transitioning to corresponding TIR SKUs. A zero subsidy balance is therefore not evidence that the model stopped running. This is one provider's documented normal operation, not a witnessed government enforcement action or a statement about every provider. [E2E, Billing → Important Consideration; Platform Service][e2e]
- **Fact—accounting is more complicated than allocated GPU-hours.** E2E distinguishes subsidised compute/storage from separately discounted platform services; storage allocations can be charged upfront irrespective of use. Overlapping same-SKU projects are consumed in first-come order, including situations in which a project's subsidy limit has already been reached. A safety audit needs project **and** service/SKU identifiers, rather than account-level expenditure alone. [E2E, Compute and Storage; Multiple IndiaAI Projects Handling][e2e]
- **Fact—authority is partly explicit, not unlimited.** The policy assigns future policy updates to IndiaAI (§5.1) and a project-evaluation/subsidy framework to PMEC (§§4.6, 5.2). It also specifies periodic audits and utilisation logging (§6), revocable access and account monitoring (§7). It does not state a model-harm test threshold, an independent adjudicator, or an appeal process for the proposed condition. These provisions establish a starting point, not an executed provider flow-down. [Policy, physical pp14–20][policy]
- **Fact—payment and reservations.** Government subsidy is post-paid quarterly to providers; users bear the balance and unused reserved-compute costs. Thus a new pre-access test could impose a reservation bill while delaying useful work. The public allocation record is not a settlement record. The previous dossier's conflicting 40%/50% policy limits remain unresolved, and this pass does not silently choose one. [Policy §§4.6, 5.2, 8(f), 8(i), 9; physical pp15–16,21–22][policy]
- **Original stakeholder reporting, not a population estimate.** ThePrint's interviews report Prathosh A.P.'s concerns about affordability, waiting and fragmented infrastructure, while also recording his support for the mission. A startup applicant reported switching to AWS after eligibility demands. These are credible original accounts of mechanisms that could defeat uptake; they do not quantify how often applicants leave or prove that the proposed safety gate would cause exit. [ThePrint, 20 October 2026, “Not worth it”, “The frontier problem”, “The start-ups”][print]
- **Correction to overbroad exclusion claims.** The live portal has distinct regular-startup and early-stage-startup pathways. The latter lists experience and a senior-official letter, rather than the regular category's revenue/funding threshold. Therefore “all startups need the regular funding threshold” is too broad; the alternative endorsement burden is still real on the face of the published criteria. [Portal, Are You Eligible?][portal]
- **Research result.** Qi et al.'s 2023 study reports safety degradation after both adversarial and benign fine-tuning in the models studied. That supports testing the final tuned model, not trusting its base-model certificate. It does **not** establish the current failure rate of Indian systems, the sufficiency of a particular benchmark or the causal effectiveness of this policy. This pass read the abstract, not a replication. [Qi et al., abstract][qi]

### Inferences

**What would change the decision?** Obtain one future allocation, the current provider agreement and an authorised statement specifying which of two actions is allowed: withholding future subsidy, or suspending a particular service. Run a harmless failed-test fixture alongside an ordinary-expiry fixture. Observe the control plane, billing state and inference availability. If the model continues at full price, retain the proposal as a **conditional-public-support policy**, and abandon any claim that it is itself a model-release veto. This inference follows directly from the provider's continuation path and the policy's separate billing responsibilities. [E2E][e2e]; [Policy §§7–9][policy]

**Preserve these competing priorities rather than average them into approval:**

- **Public-finance lens:** make public support conditional on evidence. Counterargument: refusing payment retrospectively for already valid consumed services is different from conditioning the next award. Require the applicable signed payment terms.
- **Provider lens:** new testing, suspension and dispute handling have operating costs and may interact with SLAs. Existing general security language cannot establish acceptance of every new evaluation task.
- **Applicant-access lens:** evaluate total cash, time and administrative burden. A nominally free test that delays activation can still be expensive. The documented ordinary-commercial path and reported switching make substitution a live hypothesis; neither measures its elasticity. [Policy §§8–9][policy]; [E2E][e2e]; [ThePrint][print]
- **Evaluator-independence lens:** separate development from final adjudication; require conflicts disclosure, recusal, reproducible protocols and a non-developing second reviewer. These are proposals, not identified existing safeguards or a claim that university status ensures independence.
- **Privacy lens:** prefer locally executed tests, hashes and minimal signed results. The policy's account/data monitoring permission does not demonstrate that transferring raw prompts, private training corpora or model weights is necessary for this gate. [Policy §7(e)–(f)][policy]
- **Safety lens:** choose a failure that can plausibly change—for example post-tuning assistance with credential-theft fraud, tested with safe simulations in the relevant languages. Measure failures, benign-task false positives and corrected versions. A benchmark improvement is not a count of prevented crimes. Offshore substitutions and exported weights remain outside a provider-only stop.

**Design 1 — Two-switch enforcement and settlement rehearsal.** Proposed owner: an authorised IndiaAI policy/procurement official, one provider and one consenting future awardee. Agree separate funding/service states and notice/cure/retest rules. Join approval ID → SKU → provisioning → meter → customer invoice → accepted provider claim → dated payment, and test commercial conversion explicitly. By **31 January 2027**, seek the authority/instrument decision; by **31 May**, seek the witnessed rehearsal and accounting follow-up. Those are proposed planning deadlines, not announced programme dates. A service hold is permissible only if separately authorised; the default remedy is a prospective support hold, not unilateral retrospective invoice cancellation. **Better than the original generic gate:** directly challenges its assumed enforcement mechanism. [E2E][e2e]; [Policy][policy]

**Design 2 — Fund post-tuning evaluation, then test whether mandatory gating is worth its burden.** Proposed owner: IndiaAI/AISI programme owner and a non-developing evaluator, subject to actual funding and appointment. Begin with a consenting shadow-mode cohort. Fix the model version and harm class, use held-out locally relevant tests and blind review of disputes, then measure staff hours, queue time, cash cost, false positives and pre/post-remediation failures. Set an applicant-burden tolerance **before** the pilot; no defensible universal threshold was retrieved. Keep raw private data local where feasible. If the gate adds substantial cost without reproducible improvement, redesign or stop making it mandatory. Proposed protocol deadline **28 February 2027**, go/no-go **31 May**. **Better:** tests safety value and the strongest observed access objection together, rather than treating compliance volume as success. [Qi abstract][qi]; [ThePrint][print]; [Portal][portal]

### Gaps

- **Unretrieved/undisclosed:** current executed provider contract and security annex, exact delegation, signed user award, safety-triggered remedy, review rights, metered project/SKU use, invoices, accepted claims and payments. The right next artifact is a single joined transaction/control record, not another national fleet total.
- **Conflicting evidence:** ThePrint describes 304 approvals in its 8 October snapshot; the live portal displays 303, matching the earlier repository audit. Snapshot timing, revisions and classifications were not reconciled here. Its wording about money “paid” cannot turn an approval table into cash settlement. Do not replace the earlier audited allocation totals with press aggregates. [ThePrint][print]; [Portal][portal]; [Policy §8][policy]
- **Inaccessible:** direct requests for the [original procurement corrigendum][corrigendum], [AISI partnership call][aisi] and [AISI FAQ][faq] returned HTTP403. Leads about security-amendment powers, evaluator funding and conflicts declarations were **not admitted as verified findings**. A successful retrieval of the operative contract remains particularly decision-relevant. The general AISI web shell did not supply those missing terms.
- **Unsearched in this bounded pass:** exhaustive provider contracts, procurement-law cases, a like-for-like offshore/egress price survey, and a systematic current technical literature review. No exact substitution rate, compliance cost or evaluator capacity is claimed.
- **Future evidence:** actual pilot consent, implementation, evasion, retest and harm outcomes before Geneva remain unobserved.

## 2. Taiwan: do existing compute conditions establish the proposed safety lever?

### Takeaway

**Qualified.** The rules contain stronger specific controls than a generic “public compute” description suggests, but they also reward open publication. The incremental design should distinguish **model origin**, **tested behaviour** and **publication status**, and act before release rather than assume platform termination recalls a model. [ADI rules §§6–7][tw]

### Cited Findings

- **Fact:** §7 prohibits specified China-origin/Chinese-funded open models and interfaces, including API/MCP, in platform training/inference, and remote connections to mainland China/Hong Kong/Macao. These are existing provenance/access restrictions, not an empirically validated measure of model harmfulness. [Rules, physical p8, §7(2)(1) items2,5][tw]
- **Fact:** training review gives additional credit for willingness to publish models/datasets on Hugging Face or GitHub; inference review similarly rewards dataset/code publication. [Rules, physical pp6–7, §6 tables][tw]
- **Fact:** results remain user-owned; access is withdrawn and storage cleared at expiry. The privacy notice lists contact/role information and purpose limits, not unrestricted disclosure of a new evaluation corpus. [Rules, physical pp9–10, §7 and Annex1][tw]

### Inferences

**Decision test:** choose a future training award with an intended public model release. Confirm the next-cycle authority/operator agreement and participant acceptance. Show a version-linked failed test, hold, correction and retest **before publication**. An origin-rule pass and a harmlessness-test pass are separate outcomes. The existing closed 2026 application window does not reopen because new evidence is found.

**Design 3 — Safe-publication checkpoint.** Proposed owners: ADI, the appointed future operator, recipient and non-developing evaluator. Link a funded post-tuning test and local synthetic privacy-canary check to the final model hash. Preserve a minimal result before storage clearing and compare the release timestamp with the retest decision. Remedy: only agreed remaining support/access, with cure; no recall claim for previously published weights. Dependency: a lawful future award by **31 March 2027**; proposed evidence deadline **31 May**. If the award window does not exist, report that failure rather than assume it. **Better:** complements the explicit sharing incentive and prevents provenance compliance being mistaken for demonstrated safety. [ADI §§6–7][tw]; [Qi abstract][qi]

**Analytical lenses, not sourced Taiwanese stakeholder statements:** an SME may value publication and object to a blanket no-export term; the operator may prefer easy-to-check origin rules; a safety evaluator needs actual behaviour tests; a privacy advocate asks why existing long-retained logs require broader disclosure. These priorities are not equivalent, and no consensus is claimed.

### Gaps

No current operator contract, next-cycle adopted terms/appropriation, amended-condition delegation, actual origin-rule enforcement, exported-model inventory, testing cost or harm outcome was retrieved. Representative Taiwanese SME objections were **unsearched**. Rules establish a programme perimeter, not national control of compute or semiconductor exports. Existing award-name inventories were not counted again; no new consumption denominator was produced.

## 3. Türkiye 1711: does a university work package supply independent assurance and a remedy?

### Takeaway

**Qualified.** Explicit related-party restrictions improve the institutional starting point, but independence, data rights and customer acceptance still need separate design. The useful intervention is a costed deployment-specific acceptance package, not an assumed safety clawback. [Programme eligibility and repayment FAQs][tr]; [Updated call §6.2][trcall]

### Cited Findings

- **Fact:** eligibility excludes related customer/provider entities, relevant participating-university academics' companies from the supplier-SME role, and declaring university academics as supplier-SME employees. These are concrete conflict controls; they do not prove that a project-funded evaluator is independent of its success. [Programme, “Kimler Başvurabilir?”][tr]
- **Fact:** call §6.2 says YZE does not claim project IP and is not a party to the participants' output/property agreement, while expecting rights-protected sharing of data, models and solution approaches. A proposed independent retester still needs agreed access. [Call, physical pp5–6 / printed pp4–5][trcall]
- **Fact:** the programme page gives a following-month-end transmission deadline for quarterly technical reports, followed by two weeks for YZE assessment to TEYDEB. A three-month cadence is not evidence of a reviewed report being ready by Geneva. [Programme, “İzleme ve Sonuçlandırma”][tr]
- **Textual tension:** §15.2 permits cooperation-agreement signature by project-contract signature, but §6.2 and the live IP FAQ retain pre-application agreement language. The specific updated provision is a plausible route, not an unrestricted post-competition amendment power. Obtain the authorised interpretation for the chosen award. [Call §§6.2,15.2][trcall]; [Programme IP FAQ][tr]
- **Fact:** the FAQ distinguishes ordinary project failure, which does not trigger repayment, from termination due to intentional conduct, which can entail recovery with interest. A failed safety test is not automatically the latter. [Programme, “Verilen destek geri alınır mı?” and “Proje başarısız olursa…”][tr]

### Inferences

**Design 4 — Customer acceptance with a separate retester.** Proposed owner: customer-led consortium and TÜBİTAK/TEYDEB, with YZE's monitoring role and a non-developing retester stated in writing. First identify an eligible still-changeable award and obtain the scope-change decision. Cost the evaluation and agree protected data access, conflicts/recusal and acceptance criteria. Choose the actual deployment harm—for example unsafe recommendations in an industrial decision-support application—rather than applying a generic chatbot refusal test. The development university can produce evidence; a separate reviewer should adjudicate disputed critical failures. Proposed remedy is customer non-acceptance and correction/retest; grant withholding/recovery requires its own lawful ground. Proposed decision deadline **31 January 2027**, interim evidence package **30 April**, allowing May transmission and early-June assessment. **Better:** uses the customer decision and actual review lag rather than treating a university signature or grant budget as assurance. [Call §§6,14–15][trcall]; [Programme eligibility, monitoring, repayment FAQs][tr]

**Analytical lenses:** a customer wants reliable deployment, a supplier wants payment for legitimate expenses, researchers need publication/data rights, and the funder wants both innovation and accountability. A shared development incentive can undermine critical retesting even when the parties are legally unrelated. These are hypotheses to test with the agreement and review process, not allegations against any consortium.

### Gaps

No named unsigned 2026 award, executed safety package, authorised interpretation of the signature text, separate retester, accepted-expense/payment ledger or deployed-harm inventory was recovered. Private consortium objections and exhaustive Turkish procurement-law treatment were **unsearched**. No future 2027 call or Geneva outcome is inferred from annual recurrence. The score implication is to keep coordination and review lag visible and limit the remedy claim to its actual instrument; no numerical rescore is justified by this pass alone.

[policy]: https://compute.indiaai.gov.in/files/end-user-policy.pdf
[e2e]: https://docs.e2enetworks.com/docs/tir/indiaai/
[portal]: https://compute.indiaai.gov.in/login
[print]: https://theprint.in/tech/indiaai-mission-9-model-builders-get-rs-1058-cr-of-govts-compute-subsidy-researchers-only-rs-10-cr/3076401/
[qi]: https://arxiv.org/abs/2310.03693
[corrigendum]: https://indiaai.s3.ap-south-1.amazonaws.com/docs/corrigendum-I.pdf
[aisi]: https://indiaai.s3.ap-south-1.amazonaws.com/docs/sg-call-for-partnerships-indiaai-safety-institute.pdf
[faq]: https://indiaai.s3.ap-south-1.amazonaws.com/docs/aisi-faqs.pdf
[tw]: https://aipower.dginfra.gov.tw/front/filePush?pFolder=content&pName=%E6%95%B8%E7%99%BC%E9%83%A8%E6%95%B8%E4%BD%8D%E7%94%A2%E6%A5%AD%E7%BD%B2%20115%E5%B9%B4%E7%AE%97%E5%8A%9B%E5%B9%B3%E5%8F%B0%E4%BD%BF%E7%94%A8%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5.pdf
[tr]: https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1711-yapay-zeka-ekosistem-cagrisi
[trcall]: https://tubitak.gov.tr/sites/default/files/2026-09/1711_YZE_2026_Cagri_Metni_Guncel.pdf
