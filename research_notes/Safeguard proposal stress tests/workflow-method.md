# Honest adaptation of Agent Studio and deeper-research

## What was actually read and what can we borrow?

### Takeaway
Use a retrieval-first evidence ledger plus a small, isolated, dissent-preserving analytical trial. Do not call this an execution of either upstream pipeline. Agent Studio designs and tests staffing; deeper-research implements a substantially larger retrieval and verification pipeline. This audit read their methods and ran local model calculations only.

### Cited findings
- **Agent Studio**, pinned at `6f6a37258e4e33401b7b0f10a2c9634adffebd60` (commit 17 October 2026), starts with a plain assistant, requires a same-input baseline for a panel, isolates generating lenses, checks sourced outputs, and preserves dissent. Its hard rules permit a disclosed same-family fallback for the critic. Here the current executor is OpenAI, so copying its default “Codex critic” would **not** create a second family. [README](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/README.md), [SKILL](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/SKILL.md), [hard rules](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/references/hard-rules.md).
- Its evidence gate distinguishes value-laden deliberation from factual/procedural work; its playbook makes stance, bounded expertise, process, output and constraints explicit. These are suitable as **analytical attention guides**, without impersonating a real official or claiming lived experience. Its own efficacy claims are not independently reviewed here. [Gate](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/references/evidence-gate.md), [playbook](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/docs/research/Persona-Construction-Playbook.md).
- Synthesis should retain attributed minority positions and unique findings, then check point-level retention. Mechanical validation establishes structure, not substantive correctness. [Synthesis modes](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/references/synthesis-modes.md), [kernel](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/methodologies/kernel.md).
- **deeper-research**, pinned at `d49d27c75d94ee57c19cd062269e2d5f1c96cd67` (commit 28 September 2026), requires retrieved evidence before synthesis, Exa slices and an evidence gate, a scholarly anchor/citation chase, subsequent question-driven retrieval, citation and number checks, and a refute-mode reviewer from a different model family. Its family rule additionally excludes OpenAI↔xAI and is fail-closed for claiming independent review. A number existing somewhere in evidence is explicitly **not** enough to establish correct attribution. [README](https://github.com/nraford7/deeper-research/blob/d49d27c75d94ee57c19cd062269e2d5f1c96cd67/README.md), [SKILL](https://github.com/nraford7/deeper-research/blob/d49d27c75d94ee57c19cd062269e2d5f1c96cd67/SKILL.md).
- Its squad performs an explicit scope checklist before isolated depth lenses, refutes each proposed gap before spending retrieval budget, records capped-out gaps, and never treats panel agreement as source verification. The source-selection design requires primary-source deduplication and records required-lane failures as partial, but explicitly defers wiring its matrix into pipeline scripts. That design is a useful proposed ledger pattern, not evidence that the whole upstream pipeline implements it. [Squad](https://github.com/nraford7/deeper-research/blob/d49d27c75d94ee57c19cd062269e2d5f1c96cd67/references/squad-audit.md), [source-selection specification](https://github.com/nraford7/deeper-research/blob/d49d27c75d94ee57c19cd062269e2d5f1c96cd67/docs/superpowers/specs/2026-08-27-source-selection-protocol-design.md).

### Inferences
Native raw HTTP retrieval, source excerpts and locators, executable arithmetic, source-gap checking, and host-native isolated subagents can reproduce useful **principles**. Native web tools do not become Exa or PaperQA; prompt-based isolation is not filesystem access control; several instances of one model do not establish cross-family independence. The upstream raw-fetch rule concerns avoiding summarizer-mediated evidence; our pinned raw GitHub downloads satisfy that narrow purpose.

### Gaps
No installation, paid retrieval, scholarly graph chase, upstream validators, cross-family review, blind judge, semantic-embedding score, new panel or interviews ran here. Full retrieval receipts and execution/non-execution fields are in [workflow-method.json](workflow-method.json). GitHub raw files and API metadata were fetched, not a scholarly corpus. Repository methodology statements are cited as prescriptions, not proof their panels improve decisions.

## How should the next round run without anchoring the result?

### Takeaway
Freeze one common evidence packet. Obtain a short plain baseline and four sealed analytical briefs independently, then synthesise and compare. This is a proposed experiment, not a completed panel.

### Cited findings
The upstream hard rules require a same-input baseline, isolated generation, a source check, and quality **and** coverage reporting. [Agent Studio hard rules](https://github.com/nraford7/agent-studio/blob/6f6a37258e4e33401b7b0f10a2c9634adffebd60/references/hard-rules.md). The current evidence report supplies route-specific missing joins rather than measured implementation probabilities. [Prior evidence report](../../reports/Route%20coordinate%20evidence.md).

### Inferences — proposed protocol
1. **Common packet and question.** Pin the model, evidence report, full relevant source passages, dates and receipt hashes. Ask: “Which route or matched national/coordinated pair deserves the next validation test before Geneva, and what evidence would reverse that choice?” Do not tell generators that India/Japan ought to win. Distinguish adoption, implementation, changed behaviour and risk reduction. Include counterevidence and an explicit list of unread sources.
2. **Short baseline memo, fresh context.** One plain assistant gets that question and packet, with no persona, peer outputs or this audit's conclusions. Return a concise recommendation, strongest contrary evidence, unknowns, and next discriminating test. Keep it sealed from lenses. For a fair comparison, any subsequent new source must also be offered to a separately rerun baseline before blind judging; otherwise label the different evidence budgets.
3. **Four sealed briefs, fresh context per lens.** Each receives the same packet plus one priority below. No generator sees or anticipates the other outputs. The owner records output hash, source packet hash and executor identity before opening the briefs together. No invented biography or national stereotype. These are analytical priorities, not statements made by real stakeholders.

| Lens | Priority and bounded remit | Required contrary test |
|---|---|---|
| Implementation/delivery | Identify named authority, instrument, staffed execution and binding hold/retest by the checkpoint | Would a tractable pilot govern too little consequential activity? |
| Frontier-risk | Demand a specified serious failure mechanism, causal change, additionality and displacement test | Can a broad frontier proposal actually be imposed and implemented? |
| Rights/accountability | Demand contestability, affected-person rights, correction, proportionality and an accountable remedy | Could procedural compliance mask failure to reduce harm, or impose exclusion costs? |
| International scale | Demand deduplicated cross-border adoption, supplier recognition, spillovers and coalition incentives | Does coordination add verified scope beyond nationally feasible action, after substitution and delay? |

Every brief uses: recommendation; source-backed facts with exact locators; assumptions/value judgments; strongest objection; missing evidence; one feasible test; and **“Dissent I would defend.”** Never invent official consent, infer affected populations from budgets, or label scenario ranks probabilities. The same-family limitation remains even with fresh contexts.

4. **Checklist and gap refutation.** Explicitly check authority, timing, staffing/cost, coverage denominator, enforcement, outcomes, substitution, rights and cross-border spillovers for each finalist. Before retrieval, check whether each alleged gap is already resolved in the packet, partly resolved, or outside scope. Keep scope-named gaps even if a lens overlooks them. One targeted gap-fill round; record unresolved/unread separately from nonexistence.
5. **Refutation and synthesis.** One fresh checker sees claims plus their sources; keep findings, corrections and source support separately. A genuinely different available model family can provide additional review only if permitted; otherwise label the absence. The synthesizer sees sealed briefs only after completion, reconstructs the strongest competing positions and preserves disagreement. No mean of recommendations or vote presented as empirical truth. Provide a kept/dropped/refuted ledger for each distinct point and dissent; re-synthesise once if a supported dissent was silently lost.
6. **Compare to baseline.** Present masked baseline and synthesis for human review on source fidelity, decision relevance, genuinely discriminating tests and an unsupported-authority harm check. Record quality separately from coverage: new verified claims, corrections, unique surviving tests, omitted baseline insights and effort. If the baseline is better, retain it with supported unique additions. Do not claim a causal panel advantage from one subjective comparison.

Suggested bound: four lenses, one plain baseline, one checking pass and one synthesis; no debate loop. New evidence or material corrections may justify one focused repeat, documented. Actual execution counts must replace this proposed budget in the eventual receipt.

### Gaps
An empirical stakeholder interview requires an actual person, authorised contact, a question protocol, consent and a dated record with role and sampling limits. No such contact is authorised or performed here. A sealed lens brief is neither testimony nor institutional acceptance. Future interviews could test which signatory can change the instrument, what is unacceptable, and which operational records can be disclosed; even an interviewee's opinion does not substitute for signed authority.

## What follow-up evidence would most change the decision?

### Takeaway
Prioritise a matched national-versus-coordinated intervention and a real instrument-to-operation join over more general country statistics.

### Cited findings
The prior report separates Japan's release authority from supplier remedies, India's allocations from settled use, and national procurement precedents from a recognised three-country purchasing pool. It also distinguishes a pre-Geneva EuroHPC protocol/drill from operating gigafactory capacity. [Route evidence and missing joins](../../reports/Route%20coordinate%20evidence.md). The model audit demonstrates preference sensitivity without filling those joins. [Model audit](model-audit.md).

### Inferences — next tests
- **Japan versus JP–KR–SG:** hold the exact version-specific safeguard and deployment population fixed; ask which acceptance steps a shared profile adds, whether suppliers actually reuse evidence, and what incremental deployment scope becomes bound. Obtain an instrument/decision record rather than infer mutual recognition from shared interest.
- **India:** connect a project ID to applicable subsidy/exception terms, consumed hours, settlement and the authority for a future conditional release; test a witnessed failed-evaluation hold and corrected retest. This discriminates operative leverage from an impressive allocation inventory.
- **International spillovers:** register a separate unmeasured variable before collecting it: additional deployments/jurisdictions that accept and enforce the same evidence duty because of coordination, deduplicated by model/version/operator and time. Trace substitution and national-only counterfactuals. Do not backfill this with current reach weights.
- **Readiness versus remedy:** have reviewers score the two against different evidence: execution capacity and adoption stage for readiness; actual power plus observed hold/correction/retest for remedy. Compare coding disagreements without mechanically forcing their correlation to zero.
- **Temporal scope:** for each finalist specify one common June endpoint and one later scale endpoint. A feasibility estimate for a drill must not multiply an impact claim for a future full programme.

### Gaps
No retrieved material currently establishes the needed cross-border incremental effect, a common harm denominator, or complete exact-safeguard approval and outcome observations across all routes. More retrieval may resolve authority or terms; future implementation and causal impact must be observed or experimentally evaluated rather than “discovered” by a model.
