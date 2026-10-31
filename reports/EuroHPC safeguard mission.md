# EuroHPC safeguard mission

> **WIP mission expansion.** The narrower notification → breach remedy → procedure path is integrated in the route explorer. Further claims below about report-delay damages, the Q&A cut-off, audit-log scope and universal access to clarification require integration review before operational use. The displayed Q&A cut-off comes from a stale Lot 1 block. Whether a particular theft or model-originated incident meets the contract definition depends on facts and interpretation; the source wording does not settle every hypothetical case. The safer integrated statement is no explicit model-evaluation/custody right was identified, not categorical inclusion or exclusion.

**Evidence cutoff: 31 October 2026.** A mission brief for the Leverage Map + Coalition Builder: an implementable incident-reporting and escalation mission inside the EuroHPC AI Gigafactory procurement (CfT EUROHPC-2026/OP/0008), including model-originated security incidents. Evidence detail, quotes and the claim ledger are in [research_notes/EuroHPC safeguard mission.md](../research_notes/EuroHPC%20safeguard%20mission.md) (source key **F/TS/CH/A2/PORT**, defined in the Sources section). This mission deliberately does **not** claim a frontier-model release veto.

**Mission in one line.** Before signature, use the tender's own clarification process to fix whether the contract's existing security-breach notification duty covers model-originated incidents; after signature, turn that duty into a working escalation channel through Specific Contract SLAs and the contract's existing reporting machinery — holder, obligor, remedy and due process already exist in the draft text.

## Mission card

| Field | Value | Status |
|---|---|---|
| **Holder** | Contracting Authorities: EuroHPC JU + 18 National Contracting Authorities (13 Lot 1, 5 Lot 2, listed in Annex 2) | observed (A2 pp.5, 8) |
| **Obligor** | The Contractor (AIGF Consortium: Coordinator + Hosting Entity). Tenants/anchor customers are reached only via the Contractor's user terms (I.15.2) and the written flow-down (I.14.3(c)) | observed (F pp.20-21) |
| **Instrument** | Annex 3 Model FWC v2 (Ares(2026)9952478, 22/10/2026) — **draft, unsigned**; adhesive on submission; signature + first Specific Contract create the obligations | observed (F; sources.json) |
| **Decision window** | Q&A cut-off displayed 25/11/2026 23:59 Europe/Luxembourg; Lot 2 tenders due 03/12/2026 17:00; Lot 1 tenders due 04/02/2027 17:00 per the 26/10/2026 announcement, while the same page's Lot 1 record still displays 03/12/2026 (conflict retained). Post-award: duty live at signature; I.14.7 "at any time"; SC 11.5 during each Specific Contract | observed (PORT L74-89, L148-157) |
| **Security incident trigger** | "Any security breach, including cyberattacks, or any other physical or digital breach related e.g. to the premises, systems, data or personnel used by any involved entity, even if not directly related to the Union / Participating States-supported activities" → notify the CAs **without delay**, share information ongoing, notify and implement a mitigation/resilience plan (I.14.6) | observed (F p.20) |
| **Deliverable** | (1) published Q&A interpretation on model-incident scope; (2) clause-survival re-check at signature; (3) agreed incident-notification protocol at SC 11.5; (4) standing escalation use (PGB quarterly info, I.14.7 requests, monthly incident reports, annual security review) | proposal (all four) |
| **Verifier** | CAs as recipients; JU access-time audits (I.19.4, II.24); PGB quarterly information (I.16.3-16.4); monthly status reports (App. III); annual review (I.21.2). Artifacts are publicly checkable: Q&A ID + date; signed SC annex; report lines | observed mechanisms; proposed use |
| **Remedy** | Termination for violating I.14/II.8 security/confidentiality provisions (II.18.1(p)) via the II.18.3 procedure; delayed reports already carry liquidated damages (EUR 100/day per report, cap EUR 25,000; I.23.3/II.15.1); general damages (II.6.3, 3× cap, II.6.4 displacement); termination damages (II.18.4); court review (I.10.2) | observed (F pp.28-30, 54-55) |
| **Due process** | II.18.3: formal notice + grounds; 15 days for observations; final decision with stated effect date; transition assistance at no additional cost unless substantial additional resources shown. Contractor-side user suspension requires notice to CAs without undue delay (I.15.3) | observed (F pp.21, 54-55) |

**Strongest draft path (confirmed on re-reading):** I.14.6 duty → II.18.1(p) termination ground → II.18.3 procedure. I.14.7 (request additional security/public-order measures, "at any time") and SC 11.5 ("every reasonable effort ... at no additional cost") are supporting levers — **request powers, not switches**: no compliance deadline, no definition of "appropriate", no clause-specific remedy (F pp.20, 72).

## Incident scope: what is covered, what is the question

| Zone | Contents | Status |
|---|---|---|
| **A — infrastructure/service security** | Breaches of premises, systems, data, personnel used by any involved entity, even if unrelated to supported activities; service incidents (severity matrix, crisis unit after 24h, RCA within 5 business days, four-step escalation); monthly major-incident reporting; annual cybersecurity review | **observed**: duties exist in the draft; scope is infrastructure/service |
| **B — model-originated security incidents** | Scenarios (proposed taxonomy): cross-tenant data exfiltration via a hosted/fine-tuned model; model-mediated intrusion or privilege escalation; theft of model artefacts from AIGF systems; use of facility services to defeat access controls | **inference**: plausibly inside Zone A — the I.14.6 list is illustrative ("e.g."), covers "any involved entity", and extends "even if not directly related" to supported activities; I.14.1 adds "misuse of the technology". **Not established**: no model-incident taxonomy; no tenant duty to report model incidents; the anchor-customer exemption in the specifications (p.19) is a *sovereignty* exemption while the FWC flow-down applies "in its entirety, without exception" (I.14.3(c)). This is the mission's target and needs the contracting authority's interpretation |
| **C — model harm outside security framing** | Harmful outputs or dangerous capabilities with no breach of AIGF systems/data/personnel | **observed absence** (no duty located) + **inference** (not claimed covered; not claimed categorically excluded — general breach grounds (II.18.1(c), II.17.2) do not by their terms exclude security-related facts). No release veto, evaluator access or weight custody is claimed |

**Weights boundary.** User-created IP stays with users (I.20.1) — but a weight file stored on AIGF systems is still "systems" and "data" under I.14.6, so theft or exfiltration of weights from the facility is a security breach regardless of IP ownership. The supported statement: no custody/inspection right was identified; weights are not outside security duties. Categorical claims either way overreach.

## The proposed addition (the actual ask)

**PROPOSAL — "model-originated security incident" (MOSI) protocol.** Four steps, earliest first, none requiring invented authority:

1. **Before the Q&A cut-off (25/11/2026 23:59 Europe/Luxembourg, as displayed; verify current terms before acting):** file the clarification questions below through the portal. Cost: drafting hours. Any answer — including "a new agreement would be needed" — is a dated, citable, public artifact. A clarification cannot add a condition to the procedure; it fixes interpretation.
2. **At FWC signature:** re-verify that the notification duty survives with unchanged numbering — the pack was corrected and re-published in late October (CH; portal document list 25/10/2026), and even the FWC's internal cross-references needed clerical fixes.
3. **At the first Specific Contract:** request, under SC 11.5, an incident-notification protocol: severity classes mapped to the existing Appendix II matrix; an operational clock for "without delay" (the draft states no hours); an evidence list anchored to the existing 12-month inference audit logs (App. II §6); tenant-to-Contractor incident reporting in the written flow-down (I.14.3(c)) and terms of use (I.15.2); RCA and escalation steps per Appendix II §3. Acceptance is "every reasonable effort", not guaranteed.
4. **During performance:** use what already exists — I.14.7 requests on security/public-order grounds, PGB quarterly information and eligibility-scrutiny suggestions (I.16.3-16.4), monthly major-incident lines in service reports (App. III(b)), annual operational-incident and cybersecurity review (I.21.2(c),(e)), JU access-time audits (I.19.4).

**Procurement compatibility questions** (extend, and do not duplicate, Priority 1 of [Finance clarification questions](Finance%20clarification%20questions.md); all PROPOSAL, none sent):

> **Scope.** Does Article I.14.6's "any other physical or digital breach related e.g. to the premises, systems, data or personnel used by any involved entity" include incidents originating in a model or AI service operated on AIGF capacity — including capacity managed, partitioned or commercialised by anchor customers, to which I.14.3(c) applies the end-user obligations "in their entirety, without exception"? Examples: cross-tenant data exfiltration via a hosted or fine-tuned model; model-mediated intrusion or privilege escalation; theft or unauthorised transfer of model artefacts stored on AIGF systems. If yes, what must the Contractor notify, to whom, in what form, and within what clock? If not, which provision governs such events?

> **Flow-down.** Must the written obligations passed on under I.14.3(c) to third parties acquiring access time include reporting security incidents that affect the AIGF to the Contractor, so that the Contractor can perform I.14.6? Are the I.15.2 terms of use required to contain such a reporting term?

> **Evidence.** Do the Appendix II §6 audit logs ("full audit logs for AI inference use — access events, inference metadata, system changes — for a minimum of 12 months") cover tenant workloads' inference, or only the Contractor-provided inference service? What evidence would exist after a Zone B incident?

> **Compatibility.** Could an incident-notification protocol with severity classes, a stated notification clock, retained evidence and a tenant-reporting flow-down be agreed at Specific Contract level under Art. 11.5 without breaching Article II.11.2 (no amendment that alters the initial procurement conditions or causes unequal treatment)? Which elements would require a written amendment or a new call text?

> **AI Act interaction.** How does the I.14.6 notification duty interact with the AIGF's AI Act compliance duty (I.11.5) where an AIGF-provided service falls within the AI Act's incident-reporting obligations?

> **Versioning.** Will the contracting authority publish the final signed FWC text with clause numbering, given the October corrections (History of changes) and the still-inconsistent portal records?

## Institutional consent and effort

| Step | Who must act / agree | Effort | Does NOT |
|---|---|---|---|
| Clarification question | Any interested party may ask via the portal; an NCA or the JU can ask internally. No consent needed | Hours | Create an obligation; add a procurement condition |
| Re-check at signature | JU/NCA contract management | Low | Compensate for a signed text that dropped or renumbered the duty (hence do it) |
| SC 11.5 protocol | Contracting Authority(-ies) request; **Contractor accommodation** ("every reasonable effort", "at no additional cost") | Contract-management level | Guarantee acceptance; the Contractor has a reasoned basis to decline |
| I.14.7 request | Contracting Authorities as such, "at any time"; no PGB vote; no Contractor consent needed to make the request | Medium; must be framed on security/public-order grounds, proportionality review expected | Create a compliance deadline or clause-specific remedy — the draft has neither |
| I.16.4 suggestions | PGB; power is scoped to user-access-eligibility compliance | Quarterly cycle | Reach model behaviour; it is not a general safety suggestion power |
| Standing new obligation | Written amendment (II.11.1) constrained by II.11.2 (no alteration of initial procurement conditions, no unequal treatment) + Contractor agreement | High | Happen unilaterally; the durable route for binding developers directly is the Hosting Agreement / next call text (out of set) |
| Any PGB decision | ≥75% of all voting rights **including absent members**; Commission holds indivisible 50%, NCAs 50% by committed contributions | — | Be carried by NCAs alone (≤50%) or the Commission alone (≤50%): an NCA coalition can never adopt a PGB decision without the Commission; absence counts against the mover |

**Middle-power read.** The 18 NCAs are EU member states; Japan, Korea, Canada or other middle powers have no decision role in this instrument. The product value is the **template**: buy compute, write a without-delay security-incident notification duty with a termination backstop, priced delay damages, and a notice-and-observations procedure — then export the clause set into other middle-power compute purchases (e.g., the Japan procurement practice idea). Present the card as "EU template, exportable", not as a middle-power coalition lever.

## Measurable mechanism (no invented effect size)

Countable, publicly checkable, no privileged access needed:

1. **Binary:** a published Q&A answer exists (ID + date) answering the scope question — either direction is a citable result.
2. **Binary, at signature:** the signed FWC retains the notification duty (numbering re-checked).
3. **Binary, at SC1:** a signed incident-notification protocol exists with named severity classes, a stated clock for "without delay", an evidence list, and tenant flow-down language.
4. **Exercise counts, in performance:** I.14.6 notifications received; RCAs delivered within 5 business days (App. II §3's existing requirement); monthly service reports include major incidents (App. III(b)); 12-month inference audit logs retained (App. II §6); annual review covers cybersecurity incidents (I.21.2(e)); delayed reports priced at EUR 100/day per report (I.23.3).

**Explicitly not claimed:** any percentage reduction in incident frequency, harm or risk; any causal safety effect; any party's willingness to adopt. A reporting channel measures incidents reported, not incidents prevented; its safety value is unquantified and the display must say so (this matches the official judging guidance to be explicit about unmeasured effects).

## 2-minute demo narrative

- **0:00** "In about five weeks, offers close for Lot 2 of one of the largest AI compute purchases outside the US and China. The contract text is public. Here is what it already obliges — and the one gap worth fixing."
- **0:20** *Card on screen:* I.14.6 quote — any security breach, "even if not directly related to the Union / Participating States-supported activities", notified **without delay**, with a mitigation plan. Backstop: termination ground II.18.1(p). Procedure: 15 days for observations, effect date stated, transition assistance (II.18.3). Delayed reports already cost EUR 100/day per report. "Holder, obligor, remedy, due process — on paper, today."
- **0:50** *Gap:* "The duty lists premises, systems, data, personnel. Does a model that exfiltrates another tenant's data count? The text says 'e.g.' — and nothing else decides it. No published Q&A answers it. Weights are user property — but a weight theft from facility systems is still a breach of 'systems and data'. The tool shows **'needs interpretation'**, not an invented power."
- **1:15** *Mission:* "Before 25 November — the displayed Q&A cut-off — file the scope question: cost is a portal submission, the artifact is a dated public answer. At signature: re-check numbering; the pack was corrected and re-published in late October. At the first Specific Contract: attach the incident protocol under 11.5. In operation: quarterly PGB scrutiny, monthly incident lines, annual security review — escalation that already exists in the draft."
- **1:45** *Honest close:* "What this is not: no executed contract has been located — which proves nothing either way; no release veto; no claimed percentage risk reduction. What this is: 18 states wrote incident-notification duties, a termination backstop and due process into a draft AI compute deal. Any middle power can copy this clause set into its own compute purchases." *Badges on screen:* `draft_unsigned · duty documented · extension proposed · consent unknown`.

## Next discriminating evidence

1. **A published Q&A answer on model-incident scope** (or documented silence past the cut-off): decides the mission's core question at near-zero cost; moves the condition from "needs interpretation" to a documented interpretation either way.
2. **The signed FWC(s) and first Specific Contract** after award (Lot 2 first): does I.14.6 survive, with what numbering, and does any incident protocol attach. No executed FWC located ≠ none exists.
3. **The I.15.2 user terms as actually adopted**: is there already a tenant incident-reporting term? (Would turn step 3's flow-down from proposal into documentation.)
4. **The Hosting Agreement** (defined in Art. 2(3f) of the EuroHPC Regulation; referenced by Q&A 109284, 30/10/2026): the durable route that could bind model developers directly — out of set.
5. **Appendix II §6 audit-log coverage** (tenant inference vs. contractor service): decides what evidence exists after a Zone B incident.
6. **Lot 1's Q&A cut-off after the extension** (the milestone block still shows the stale 03/12/2026 deadline), the Regulation (EU) 2026/150 text, and GB Decisions 30/34/47 — out of set.

## Non-claims

Draft only — nothing here binds EUROHPC-2026/OP/0008 before award, and no executed agreement was located (which is not proof none exists). No release veto, evaluator access or weight custody is claimed or supported. I.14.7 and SC 11.5 are request/reasonable-effort provisions, not unilateral variation powers. EUR 100m is the Lot 1 Phase 1 per-FWC EU ceiling, not the call amount; the EUR 10bn portal figure is an estimated total value, not funding paid; phase ceilings are conditional and non-additive. The Lot 1 deadline conflict (04/02/2027 announcement vs 03/12/2026 lot record) is retained, not resolved. All steps beyond citing draft text are proposals.

## Sources

Retained, hashed, indexed in [data/finance-research/sources.json](../data/finance-research/sources.json): **F** model FWC v2 (773c9456…, 22/10/2026); **TS** tender specifications v2 (d64a3d7a…, 23/10/2026); **CH** history of changes (228cebb0…, 23/10/2026); **A2** Annex 2 (4e934dee…, 30/07/2026); **PORT** portal capture (5880352e…, 31/10/2026). Primary URLs are in sources.json and the follow-up report's source key; page-level locators for every claim are in the [research note](../research_notes/EuroHPC%20safeguard%20mission.md). Nothing was sent to any party; no questions have been asked.
