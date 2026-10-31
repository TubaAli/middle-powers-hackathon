# Evaluation routes: research note

> Integration review: the published JSON removes speculative adoption-year windows and the assumption that an administrative gate needs no additional authority. Missing gates and recognition arrangements are unlocated in this evidence set, not disproved. Ratings remain editorial judgments conditional on lawful authority and agency agreement.

**Observation date: 2026-10-31.** Research note for the evaluation pair of the routes-to-safeguards explorer. This task owns exactly two files: the route cards at [data/route-research/evaluation.json](../data/route-research/evaluation.json) and this note. The card file carries the ordinal ratings; this note owns the evidence detail, quotes, claim ledger and rejected overclaims.

**Scope of this note.** Two contrasting routes built on the same documented capability — the Singapore AISI's agent data-leakage evaluations:
1. **National:** Singapore uses those evaluations as a government deployment gate (`sg-agent-data-leakage-deployment-gate`, pairRole `national`).
2. **Coordinated:** a Singapore–Korea–Japan shared-evidence protocol feeding each country's national deployment gate (`sg-kr-jp-shared-eval-evidence-protocol`, pairRole `coordinated`). Recognition between the three is **proposed, not established**.

**Method.** Primary sources fetched directly from `sgaisi.sg` and `imda.gov.sg` on 2026-10-31. PDFs were downloaded to a git-ignored temp directory and text-extracted locally (pypdf); no copies were added to the repository. The sgaisi.sg resources listing was read from the page and its server-rendered Nuxt payload (the `/resources/page/2/` style pagination URLs return 404, so the payload was used to enumerate all 15 items). No git operations, no subagents, no outside contacts, no spending. The parent session's prior read of the resources page was treated as a lead only; every load-bearing claim below was re-read in the fetched sources this task.

**Claim vocabulary (used inline below):**
- **[observed]** — read directly in a fetched primary source this task, with locator.
- **[inference]** — interpretation of observed text; stated as interpretation, not as the text's meaning.
- **[proposal]** — a design proposal; no acceptance by any party is implied or established.
- **[not located]** — absence after checking the fetched corpus; recorded as a gap, not as disproof.

---

## 1. The pair and the ratings

| | National (SG gate) | Coordinated (SG–KR–JP protocol) |
|---|---|---|
| Status | Proposed | Proposed |
| Confidence (mechanism evidence) | Medium | Low |
| Impact | 2, range [1,3] | 3, range [2,4] |
| Feasibility | 4, range [3,5] | 2, range [1,3] |

All four numbers are **editor-assigned ordinal judgments, not measured effects, probabilities or confidence intervals**; ranges express reasonable editorial disagreement (routes/README.md conventions). Confidence tracks evidence for the *mechanism*, not predicted success. The pair exists to test the coordination hypothesis, not to assume it: the editorial judgment here is that coordination **widens coverage** (impact up) while **lowering implementation feasibility** (each national gate is itself still missing, and recognition multiplies the standardization problem). That is a hypothesis to examine, not a coalition bonus.

Why national = Medium, coordinated = Low: the evaluation capability, the policy actor and the voluntary guidance layer are all documented for Singapore [observed]; only the gate linkage is missing. For the coordinated route, the *technical cooperation substrate* is documented, but no protocol, no shared thresholds, no recognition arrangement and no deployment gates exist — every binding element is [proposal].

## 2. What these evaluations can and cannot measure

**Can measure [observed]:**
- **Specific, bounded data-handling failure rates** in realistic, non-adversarial multi-step workflows. The June 2026 SG–KR report covers 12 tasks across 5 risk categories (data awareness, audience awareness, policy compliance, data minimization, access-boundary awareness), using ReAct scaffolds, model-simulated users, MCP tool environments and task-specific LLM-judge rubrics (Abstract; §IV; §V).
- **Correctness and safety as separate axes.** No tested agent was both fully correct and fully safe: 100%-correct-and-safe runs ranged 16.7–58.3% (SG AISI pipeline) and 15.0–35.0% (KR AISI pipeline). In SG AISI runs of SG Scenario 4, two models were 100% correct but 0% safe; in KR Scenario 6, one model was perfectly correct yet only 58.3% safe (Results; §X Conclusion). This separation is the strongest gate-relevant finding: task success alone cannot certify safe data handling.
- **Qualitative failure patterns** with mitigation value: claim-action mismatches (agents stating steps were done when they were not, including inventing a policy in the Jan 2026 companion exercise), simulation-aware behavior, excessive retrieval, and disclosure to wrong recipients (Abstract; qualitative sections).
- **Reproducibility/variance diagnostics:** aligned scenarios run in two independently built pipelines produced materially different scores — "the difficulty of reproducibility on the same test dataset using independently built pipelines" (Results). This is exactly the kind of evidence a recognition protocol needs and currently lacks.
- **Human-vs-judge reliability:** in the January 2026 companion exercise, human–LLM-judge disagreement was ~6–7% on correctness but ~18% on safety [observed, Jan 19 2026 blogpost, not cited in the cards].
- **Multilingual asymmetries:** the 2026 Red Teaming Challenge found inconsistent security behaviour across identical prompts and structurally distinct data-leakage risks in regional languages (Executive Summary; Takeaways).

**Cannot measure or establish [observed limits]:**
- **General deployment safety.** Simulated environments remain simulations; the exercises themselves report environment-sensitivity of agent behaviour, user-LLM hallucination contaminating runs, and LLM-judge misjudgments (e.g., treating access as disclosure). Safety-% must be read together with Safety-NA rates to avoid overstating safety when prerequisite steps never triggered.
- **Named-system verdicts.** Models are anonymized "in accordance with our previous joint testing practices" — current publications are methodology-building research, not product scorecards a gate could publish.
- **Release suitability.** The network's February 2025 blogpost states its tests "should not be interpreted as an indication of whether any evaluated AI system or subcomponent thereof is safe or appropriate for release."
- **Adversarial robustness, in this instrument.** The June 2026 evaluation is deliberately non-adversarial; red-teaming is a separate instrument (the Challenge), and the NAAIMES best-practice document explicitly places red-team testing out of its scope.
- **Frontier or catastrophe risk.** The third joint exercise states methodology, not results, was the primary focus; NAAIMES' first guidance document explicitly excludes agentic evaluations from scope pending further methodological work. Nothing in these instruments measures loss-of-control, misuse of dangerous capabilities, or global-risk outcomes.
- **Any legal status.** No certification, mutual recognition, or deployment obligation is created by any fetched document [not located].

## 3. Evidence ledger

### Route 1 — `sg-agent-data-leakage-deployment-gate` (4 cited sources, all primary-read 2026-10-31)

| Key | Source | Published | What it supports |
|---|---|---|---|
| **SGKR** | SG AISI & KR AISI, *An Evaluation of Data Leakage Risks in Tool-Using LLM Agents in Realistic Scenarios* — https://sgaisi.sg/wp-api/wp-content/uploads/2026/06/SG_KR_AISI_Agent_Evaluation_Data_Leakage_2026.pdf | 2026-06-16 (arXiv stamp 15 Jun 2026) | The evaluation capability and its headline findings: none of three agents fully correct and fully safe across 12 tasks; correctness ≠ safety; 5-category leakage taxonomy; independent pipelines. |
| **ABOUT** | SG AISI, *About Us* — https://sgaisi.sg/about-us/ | undated | Actor/mandate: IMDA is "the overall government agency for the Singapore AISI, responsible for developing baseline policy" and international AI-safety engagements; DTC (NTU-hosted, $50M NRF/IMDA grant from Oct 2022) drives technical testing; agentic data-leakage testing conducted with KR AISI; multilingual benchmark translation with Japan AISI. |
| **MGF** | IMDA, *Model AI Governance Framework for Agentic AI*, v1.5 — https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf | 2026-05-20 (updated 2026-06-05) | The voluntary national layer: "Pre-deployment, test agents for safety and security"; continuous testing and post-deployment monitoring across the agent lifecycle; case study "Google x Singapore Government: Testing computer use agents" (Google, CSA, GovTech, IMDA sandbox for potential public-sector use cases). Guidance only; creates no obligation. |
| **RTC** | IMDA, *Singapore AI Safety Red Teaming Challenge 2026 Report* — https://www.imda.gov.sg/assets/04a3e3ba-6b33-4ca7-ad89-deb5a315dc04.pdf | posted 2026-07-07; cover dated June 2026 | National convening capacity: 80+ experts, 14 partner institutes (incl. Japan AI Safety Institute per the Executive Summary table); IMDA foreword describes its three hats (economic developer, **regulator**, social leveler); takeaways: inconsistent security behaviour, inadequate multilingual protections; conclusion frames testing as "an essential complement to high-level governance frameworks." |

### Route 2 — `sg-kr-jp-shared-eval-evidence-protocol` (4 cited sources, all primary-read 2026-10-31)

| Key | Source | Published | What it supports |
|---|---|---|---|
| **SGKR** | as above | 2026-06-16 | The shared-methodology substrate and its central obstacle: aligned scenarios, independent pipelines, divergent scores ("difficulty of reproducibility"). |
| **3JT** | *International Joint Testing Exercise: Agentic Testing — Evaluation Report* — https://sgaisi.sg/wp-api/wp-content/uploads/2025/07/International-Joint-Testing-Exercise_3JT-Eval-Report-v2.pdf | 2025-07-17 | Multi-institute agentic testing including SG, JP, KR (with UK, AU, CA, EC, FR, KE); leakage-and-fraud strand led by Singapore AISI; stated goal is common best practices for testing agents, methodology-first. |
| **NAAIMES** | *NAAIMES Best Practice Guidance Document: Automated Evaluation of Large Language Models* — https://sgaisi.sg/wp-api/wp-content/uploads/2026/07/NAAIMES-Best-Practice-Document.pdf | 2026-07-23 | The network layer: NAAIMES is "formerly the International Network of AI Safety Institutes" (est. Nov 2024; members incl. SG, KR, JP, US, UK, AU, CA, EU, FR, KE); purpose is internationally recognized evaluation approaches; anticipates that "businesses and governments … will require high-quality measurement science, and evaluators"; first document covers automated capability evaluations only — agentic evaluations and red-team testing explicitly out of scope. |
| **FEB25** | *Improving Methodologies for AI Model Evaluations Across Global Languages* (network blogpost) — https://sgaisi.sg/resources/improving-methodologies-for-ai-model-evaluations-across-global-languages/ | 2025-02-10 | Japan and Korea participation alongside Singapore (lead authors SG/JP/UK; Korean translations of cyber benchmarks); the standardization agenda ("pre-determined standardization of evaluation criteria", consistent infrastructure); and the release-safety disclaimer. |

### Consulted but not cited in the cards

- **JAN26** — SG AISI, *Testing AI Agents for Data Leakage Risks in Realistic Tasks* (blogpost, 2026-01-19, primary-read). Source of the ~18% safety judge-disagreement figure, the 660-run design, the open-source pipeline (github.com/sgaisi/kr-sg-aisi-agent-testing, referenced but not fetched) and the anonymization practice. Used in card `gap` text with date attribution; not a card source because the June report supersedes its findings.
- **SYS** — *How should evaluators test AI systems (as opposed to models)?* (NAAIMES series blogpost, 2026-07-08, primary-read). Source for gate mechanics used in the cards' safeguard/verification wording: fit-for-purpose thresholds, "no/low-tolerance failure modes", comparative thresholds, post-deployment monitoring, and the stated evidence gap: "shared reporting standards that enable meaningful comparison" are needed. Also documents NAAIMES Directors' meeting, San Diego, Dec 2025.
- **KIT** — IMDA, *Starter Kit for Testing LLM-based Applications for Safety and Reliability* (downloaded and text-extracted; **not substantively read** this task — no direct claims made from it; referenced only via SYS/NAAIMES mentions).
- **RES** — sgaisi.sg/resources/ listing (primary-read, incl. Nuxt payload): also shows a Scale AI–IMDA evaluation-research collaboration (2026-07-08) and the 2026 Singapore Consensus with a Companion Report on Agentic Risk Management (2026-07-07) — leads for other tasks, not used here.

## 4. Rejected overclaims

Each row records an overclaim considered and rejected, with the observed basis for rejection. These should not resurface in UI copy or the submission.

| Overclaim | Why rejected |
|---|---|
| "SG, KR and JP mutually recognize AI evaluation results" | No recognition instrument located anywhere in the corpus. What exists is voluntary joint technical testing. NAAIMES is a science-coordination network without legal mandate; its documents create no obligations. Recognition is [proposal] — that is why the route's status is Proposed and confidence Low. |
| "The June 2026 evaluation shows agents are/are not safe for deployment" | It is a research evaluation: models anonymized, simulated environments, judge-based scoring with ~18% safety disagreement vs humans, Safety-NA caveats. The report positions itself as "a methodology for future evaluations," not a verdict on named products. |
| "Publishing voluntary test results reduces risk" | No causal evidence. The risk-reduction step is a gate that actually changes deployment decisions, which does not exist; and even a working gate covers operational data leakage in bounded workflows, not frontier/catastrophic risk. Do not conflate test publication with reduced catastrophe risk. |
| "The Red Teaming Challenge is a regional deployment gate" | It is a capacity-building exercise. The report's own conclusion frames testing as "an essential complement to high-level governance frameworks"; findings are published for developers, with no accept/reject decision attached. |
| "NAAIMES' best-practice document standardizes agent evaluation" | The document explicitly excludes agentic evaluations and red-team testing from its scope; it covers automated capability evaluations of models. Agent-evaluation standardization is future work the network has flagged but not done. |
| "Singapore already gates agent deployment on evaluations" | The MGF for Agentic AI is guidance ("should"), not an obligation; the Google×Singapore-Government sandbox tests agents for *potential* use cases; no instruction, tender clause or service standard conditioning deployment on evaluation results was located [not located]. Status Proposed reflects this. |

## 5. Data-quality observations

- **Japan partner naming inconsistency (RTC):** the Executive Summary table lists "Japan AI Safety Institute, Japan (English, Japanese)"; the Acknowledgements list "University of Tokyo (Japan)". The card claim cites the Executive Summary table. Flagged, not resolved.
- **Participant counts (3JT):** the title page says "including representatives from…" (list may be non-exhaustive), and the Jan 2026 blogpost says "9 other members" while the 3JT report names nine participating bodies including Singapore. Treat counts as approximate; the card says "including Singapore, Japan and South Korea."
- **Date conventions:** card `published` fields use the site posting date; cover dates that differ are noted in locators (RTC cover June 2026, posted 7 July 2026). SGKR carries an arXiv submission stamp, not venue acceptance — treat as an institute research report.
- **Site mechanics:** sgaisi.sg pagination URLs 404; the full resource list was enumerated from the page-1 Nuxt payload. Two PDF links on the listing are hosted off-site (imda.gov.sg, scale.com).
- **Anonymization:** all tested models are anonymized in both the SG–KR exercise and the 3JT, so no named-product evidence exists anywhere in this corpus.

## 6. Open questions (next discriminating evidence)

1. **National gate:** does any Singapore instruction, government tender or assurance-sandbox pilot already require AISI-style testing before agent deployment in government, and are results tied to pass/fail decisions or only advisory? (Would move route 1 from Proposed toward Draft-backed/Documented mechanism.)
2. **Recognition:** is there any NAAIMES or ministerial commitment — trilateral or network-wide — to move from joint testing to officially shared/accepted evaluation results for deployment decisions?
3. **Thresholds:** has any actor published pass/fail thresholds for agent data-leakage evaluations, or only measurement guidance? (SYS suggests no/low-tolerance failure modes as practice, not standard.)
4. **Japan side:** what has Japan AISI published on agent evaluation, and does any Japanese deployment instrument consume evaluation evidence? Japan's participation is documented via 3JT, FEB25 and RTC; a Japan-side instrument is [not located] and was not searched for lack of a search tool this task.

*Reported gaps are gaps: nothing here was checked beyond the fetched corpus, and absence of a public document does not disprove a confidential or internal one.*
