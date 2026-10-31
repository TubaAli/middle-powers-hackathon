# Adversary review: authority and inference audit of cohere-stages.md and anthropic-credit.md

> Subsequent integration update: the coordinator recovered and hashed the earlier full tool-extracted Anthropic exhibit text and checked the key new-credit passages against it. Direct raw-HTML retrieval remains blocked; see METHOD.md for the distinct provenance classes. This review's statements about no retained exhibit text describe its original input state. Signing a staged investment would not itself prove all future discretion is gone: conditions, certifications, remedies and amendment possibilities must still be read. The integrated data preserves unknown stage discretion and omits unverified bank-nationality counts.

> Independent refutation pass under the METHOD.md discipline (nraford7/deeper-research raw-source retention and independent-attempt-to-refute rules). The upstream Deeper Research pipeline remains **blocked** (dispatch preflight exit 20; no Exa call made), so this review is **not** a completed upstream pass either — it is the manual raw-source discipline only. Provisional researcher output; **not approved application data**.

**Role:** independent raw-source verification, owner-assigned. **Observation date:** 31 October 2026.
**What this pass did:** re-read both researcher notes against the raw sources retained in ignored `.local/finance-evidence/` — `cdev-act.{html,txt}` (Justice Laws consolidated text), `canada-cohere.{html,txt}` (PM release, 29 Oct 2026), `retrieval-manifest.json` — and checked the `.txt` extractions against the `.html` originals (key strings and occurrence counts match). **No new web retrieval, no webfetch, no git operations; this file is the only thing written.**

## 0. Verification status of each evidence class

| Evidence class | Status | Locator |
|---|---|---|
| PM release (Canada→Cohere, 29 Oct 2026) | **Raw-verified** (HTML retained, sha256 in manifest; extraction cross-checked) | `.local/finance-evidence/canada-cohere.{html,txt}`; manifest L44–53 |
| CDEV Act (consolidated, current to 2026-09-30) | **Raw-verified** (HTML retained, sha256 in manifest; extraction cross-checked) | `.local/finance-evidence/cdev-act.{html,txt}`; manifest L34–43 |
| Anthropic EX-10.10 credit agreement | **Not raw-verified.** Coordinator's direct SEC fetch returned HTTP 403; **no raw exhibit text is retained in this repository**. Every §-level quote in anthropic-credit.md is researcher-reported and is used here only as **internally quoted, attributed evidence**. | `retrieval-manifest.json` L54–58 |
| All other URLs cited in the two notes (Cohere PR Newswire, aiweekly/CBC, Financial Post, Reuters, ISED 22 Oct backgrounder, CAISI 12 Nov 2024 release, CDEV site/news, Cohere blog, Baker McKenzie, Aleph Alpha, Tech Times, financing-audit.md) | **Reported, not retained.** Neither corroborated nor contradicted in this pass. | notes passim |

Consequence: facts below marked *raw* can enter the evidence ledger at full strength; everything else enters as *reported* (the researcher's claim of having read a source is itself unverified here, per METHOD.md: "earlier researcher prose is an index of claims to check, not a primary evidence corpus").

---

## 1. cohere-stages.md — corrections

### C1. CDEV: confirmed general capacity vs unconfirmed investor — the note conflates them
**Claim (L16):** "The legal vehicle and statutory capacity are now established from primary law"; Q2 then reasons about "the holder" as if CDEV were it (L79–80); Q3 (L123) says the statutory chain is established.
**Raw check:** the PM release names **no vehicle at all** — zero occurrences of "CDEV", "Development Investment" or "Corporation" in `canada-cohere.html`. It says only "the Government of Canada's commitment to making an equity investment of up to $1.6 billion in Cohere" (txt L71–72). The CDEV attribution is a single secondary relay (aiweekly summarizing a CBC article the note itself could not open — L37, L229).
**Raw-supported residue:** CDEV is a statutory Crown agent (cdev-act.txt L153), with purpose-scoped natural-person capacity (L161), mandate and commercial-manner duty (L167, L171), and power to invest in entities including by acquiring shares or securities (L183). Capacity: documented. Identity as this deal's investor: not.
**Exact correction:** "A lawful, capacitated vehicle exists (CDEV, raw-verified), but no raw source connects CDEV — or any other named vehicle — to this investment. Read 'the legal vehicle is established' as 'one candidate vehicle has confirmed capacity; the actual vehicle is unconfirmed'. If the investor turns out to be BDC, a new fund, or another institution, the entire CDEV Act analysis (ss.9–11, 21, 22) does not apply to it." Keep `holder_named: false` (L143) everywhere; the YAML already has it right — the prose does not.

### C2. False binary: one committed agreement vs separate discretionary agreements
**Claim (L16, L61, YAML L162–163):** "a question about whether the stages are one contract or several"; "(a) one subscription agreement with staged capital calls: later stages are already contractually committed, withholding is a default, and the discretion has been spent at signature. (b) separate per-stage subscription agreements: each stage is a fresh decision."
**Why it fails:** staged funding inside a single contract need not be unconditionally committed. Within one agreement, later draws can be (i) subject to **conditions precedent** the investor influences through certifications or milestone sign-offs, (ii) suspended or terminated **as a remedy for covenant breach** — where withholding is not "a default" by the investor but an exercised contractual remedy, (iii) gated by internal approvals, or (iv) committed but releasable on failed representations. Discretion can therefore live entirely inside one contract.
**Exact correction** for `discretion_assessment` (L163): "unknown; at least four architectures fit the public record: (a) one agreement, unconditional staged calls — discretion spent at signature; (b) one agreement, conditional draws — discretion exercised per draw; (c) one agreement, remedy-linked withholding — discretion via enforcement; (d) separate per-stage agreements — discretion by re-signing. The release's 'hold the company accountable' (raw L83) is weak evidence for conditionality (b/c), not proof of any architecture." The note's "next discriminating question" (L220) survives but must widen from "one vs several" to "which architecture, and what conditions attach to each draw".

### C3. `window_open: true` is unsupported
**Claim (YAML L181):** `window_open: true`, while its own `window_basis` (L182) concedes "stages undisclosed and amount is a ceiling; no executed instrument located".
**Why it fails:** if the government's commitment already closed within the initial close (Cohere's reported "commitments to date" — note L42, reported, not raw), the window for attaching new terms on that paper may already be shut; if nothing is executed, terms remain negotiable. The raw record cannot distinguish, so the field cannot assert `true`.
**Exact correction:** `window_open: unknown`, basis: "existence of an executed instrument is unestablished on the raw record; if the commitment is already signed within the initial close, no conditioning window remains on this instrument and any future window requires new paper; if unsigned, terms are still negotiable." (The reported ISED consultation closing 2026-11-23 stays as a separate, secondary route with its own `reported` label.)

### C4. Permanent secrecy and FOI outcome cannot be inferred from the statute alone
**Claims (L62, L123, L208):** "the statutorily privileged information rule … is the reason this will stay secret"; "even a well-formed freedom-of-information request should be expected to fail"; "the statute makes the terms likely permanently non-public"; document table: investee information "releasable essentially only with Cohere's written consent".
**Raw text (cdev-act.txt L278–297):** s.21(1) makes privileged any information "obtained by the Corporation or any of its subsidiaries in relation to entities in which they hold investments, other than wholly-owned subsidiaries"; s.21(2) provides **four** disclosure limbs — (a) administration/enforcement of this Act and related legal proceedings; (b) prosecution of an offence under any other Act; (c) to the Minister of National Revenue for tax purposes; (d) written consent. The note's "essentially only with … written consent" misdescribes the raw text, and three inferential leaps fail:
1. s.21 binds **CDEV and its subsidiaries** — it is irrelevant if another vehicle is the investor (C1);
2. records held by other institutions (PCO, ISED, Finance) about this deal are not CDEV-held investee information; an access request there meets the *Access to Information Act's* own tests, and whether s.21 privilege operates as an ATIA exclusion is an unresolved legal question, not a statutory fact;
3. consent, parliamentary/committee compulsion and future legislation all remain open routes — "permanent" is a prediction about behaviour, not a property of the section.
**Exact correction:** "If CDEV is the investor, s.21(1) makes CDEV-held investee information privileged, with four narrow disclosure routes (raw L281, L285–297). That makes voluntary publication unlikely and a CDEV-directed access request difficult, but does not establish that FOI must fail or that non-disclosure is permanent."

### C5. CAISI: a 2024 description is not its 2026 powers — the note contradicts itself
**Claims (L79, L93, YAML L185):** present tense — "CAISI **is** a $50m research funder housed in ISED with no inspection, licensing, or model-access power"; `safety_counterparty_power: none`.
**Raw check:** the only raw CAISI fact is the commitment sentence "Keep working with the Canadian AI Safety Institute to champion the safe development and use of advanced AI" (canada-cohere.txt L82). The $50m/ISED/CIFAR/NRC description comes from a 12 Nov 2024 ISED release that is cited but **not retained raw**. The note's own gap (L113) admits "CAISI's 2026 status is not established" — the takeaway and YAML contradict the gap.
**Exact correction:** "As described at its November 2024 launch (reported source, not raw-retained), CAISI was a $50m/5-year ISED-housed research funder; no primary source on its 2026 status was retrieved. `safety_counterparty_power` must read `unknown_as_of_2026 — no coercive power evidenced in retrieved 2024 sources; completeness of current powers not established`." Resolve the internal contradiction in favour of the gap.

### C6. "including" is non-exhaustive: the reporting sentence covers all five commitments
**Claims (L97, L106, YAML L194 and the `incident_reporting` reason):** reporting "is expressly scoped to 'jobs and investment in Canada'"; the evidenced current duty is "progress reports on jobs and domestic compute investment … That is the whole of it"; "reporting in the announcement is scoped to jobs and investment only".
**Raw text (canada-cohere.txt L77–83):** "As part of this investment, Cohere will:" — five undertakings (≥1,000 jobs by 2030, ≥$1.7bn domestic compute by 2030, Canadian incorporation and headquarters, research partnerships, **CAISI cooperation** — L78–82) — then: "It will be made in stages, with regular reporting on progress against **the company's commitments**, **including** jobs and investment in Canada" (L83). The object of the reporting is all the commitments; "including" marks examples, not the scope.
**Exact correction:** "The announced reporting runs against all five listed commitments, with jobs and investment named as non-exhaustive examples (raw L83); the CAISI-cooperation undertaking therefore sits inside the reporting object. What remains true: the release states no verification standard, no named recipient, no defined cadence ('regular' is undefined), no cure period and no consequence anywhere; and no incident-reporting duty appears in the raw text." Rewrite `evidenced_current_duty` (L194) and the two `safety_asks` reasons on this basis. The stronger point survives in weakened form: an undertaking to "keep working with" plus in-scope progress reporting is still not an enforceable safety deliverable.

### C7. No budget inconsistency follows automatically from $1.6bn vs $500m
**Claims (L60, YAML L158, document request #3 L210):** "The two statements can coexist **only if** the Cohere stake is funded outside that fund"; the YAML flags the excess as if it were an anomaly; the document request calls it "the budget-authority inconsistency".
**Raw check:** the PM release (L71–73, L93) **never mentions** the Canadian Tech Growth Fund; the fund is known here only from a note-cited 22 Oct backgrounder (reported, not retained). Two separately announced instruments of different sizes establish no inconsistency: the Cohere stake could sit under CDEV authorized capital (s.22, raw L301–307), another authority, a future budget, or multi-year tranches. Also demote "no deal-specific parliamentary vote is required" (L60) permanently to hypothesis: payments "out of the Consolidated Revenue Fund" (raw L307) still operate inside appropriation law, and the note itself flags the authorized-capital figure as unlocated.
**Exact correction:** "The $1.6bn ceiling and the $500m fund are different, unlinked announcements; no inconsistency is established. Drop 'resolves the inconsistency' from document request #3; reword as 'identifies which authority funds the Cohere stake'."

### C8. Contract capacity does not itself validate an arbitrary safety term
**Claims (L79, L85–87, L107–108):** "Yes on legal capacity"; "There is no provision prohibiting non-financial covenants"; the s.17 analogy as evidence Parliament contemplated conditions.
**Raw-supported pieces:** s.9 capacity is real but purpose-scoped ("In carrying out its purpose, the Corporation has the capacity…" — L161; the note's quote drops the qualifier); s.10(2) duty is real (L171); s.17(1) guarantees run "in accordance with any terms or conditions specified by the **Minister of Finance**" (L253).
**Unsupported steps:** capacity is the ability to be bound, not authority for any particular term; absence of prohibition is not authorization; whether a specific covenant satisfies the s.10(2) commercial-manner and best-interests duties is an unresolved legal question on which no counsel view exists (the note admits this at L227); the s.17 analogy is weak and cuts the other way — even for guarantees, the terms are **Minister-specified**, not holder-invented, so if anything it supports minister-specified conditions rather than CDEV-designed covenants.
**Exact correction:** add a field `term_permissibility: unassessed_legal_question` — "raw-verified: CDEV can contract, invest and take shares; raw-silent and legally unresolved: whether the proposed security-and-integrity covenant is consistent with ss.9–10. The Q2 covenant remains a design proposal tested only for fit, with no Canadian legal opinion."

### C9. Equity covenants can influence operations — with company assent
**Claims (L108, YAML L192):** "Local stop with due process is not reachable by equity at all"; `local_stop_due_process: {state: instrument_cannot_reach, reason: "equity is not an operating licence or a direction power"}`.
**Why it fails:** what equity cannot do is impose terms **without** the company's assent. With assent, subscription and shareholders' agreements routinely carry operational covenants — information rights, approval rights, business-plan consents — and nothing in law confines covenants to financial matters. The raw record contains no instrument text, so no bound exists in evidence either way.
**Exact correction:** `local_stop_due_process: {state: proposed_with_assent_only, reason: "not imposible as a design matter, but unreachable without Cohere's written agreement; no raw evidence of any operational covenant; treat as proposal-only"}`. Keep the practical pessimism; delete the categorical "cannot reach".

### C10. Merger status: older signed-not-closed sources vs newer government wording — keep as unresolved conflict
**Raw (canada-cohere.txt L95):** "Cohere's **recent merger** with Aleph Alpha brings together Canadian and German AI expertise." The 29 Oct release calls it a recent merger with no closing date and no approval status.
**Reported (not retained):** 16 Sep primary sources say a definitive agreement was signed and "remains subject to final regulatory approvals"; the 29 Oct Financial Post says the acquisition was "in September completed".
**Verdict:** the note's handling (L134) is correct in substance and survives this review. Add for precision: on the raw record alone, the only merger fact is the government's "recent merger" phrasing — which is consistent with completion but does not evidence it; the September sources are note-cited and not raw-retained. Neither completion nor non-completion is verified. Record as `closing_status: unresolved_conflict (16 Sep signed-subject-to-approvals [reported] vs 29 Oct government "recent merger" [raw] and press "completed" [reported])`, observation date 2026-10-31.

---

## 2. anthropic-credit.md — corrections

### A1. Source-level verification limit applies to the entire note
The coordinator's direct fetch of EX-10.10 returned HTTP 403 and **no raw exhibit text exists in this repository** (`retrieval-manifest.json` L54–58; confirmed: no exhibit file in `.local/finance-evidence/`). The researcher's claim of a full read (L5: "687 KB plain text, 142 pages … retrieved and read section-by-section") is itself unverified here. The preamble (L3) already instructs this distinction; the body must carry it. **Consequence for any JSON:** every credit-agreement field's evidence class is `attributed_researcher_report`, never `raw_verified`; the internally quoted clauses (§§1.01, 2.01, 2.05–2.06, 2.08, 2.10, 2.19, 2.21–2.24, 4.02, 5.04–5.05, 5.07, 5.12, 6.09, 7.01, 8.09, 9.04, 9.08, 9.16, 9.25) are usable as attributed evidence with reduced confidence, and nothing in this review contradicts them — the corrections below concern the inferences drawn on top of them.

### A2. "No financial statements filed" contradicts the note's own preamble
**Claims (L111, L183):** "no financial statements for Anthropic are filed yet"; financials are "in the unfiled 'Model' … and the unread 14 MB S-1 body; **nothing public** as of 31 October 2026".
**Why it fails:** a Form S-1 registration statement is itself a public filing that ordinarily contains audited financial statements. The note admits the S-1 body is **unread**, then asserts nothing is public — exactly the inference its own preamble (L3: "Do not infer that financial statements are unfiled merely because this pass did not read the prospectus") forbids.
**Exact correction:** "Anthropic financial data were **not read** in this pass; the S-1 body (reported ~14 MB) was not read, and the exhibit text itself is researcher-reported (A1). Whether audited statements exist inside the S-1 is **unverified, not absent**. Consolidated Total Assets, Liquidity, utilization: `unknown_but_possibly_derivable_from_unread_S1` — never record as 'not public'."

### A3. The bank-headquarters tally is internally inconsistent
**Claims (L11, L41, L45 vs L158):** "Seventeen institutions … including **nine** non-US-headquartered banks"; "the nine non-US-headquartered institutions named (Mizuho, MUFG, SMBC, BMO, RBC, TD Securities (USA), BNP Paribas, Crédit Agricole CIB, **plus** Barclays (UK) and UBS/Deutsche securities affiliates)"; yet KQ5 (L158) flags "TD Securities (USA) LLC **is a US entity**".
**Why it fails arithmetically:** the parenthetical names 8, the "plus" adds 3, the headline says 9 — and TD Securities (USA) is counted non-US at L41 but US at L158. Counting the note's own cover list by **parent headquarters** gives **11** non-US parents (Barclays UK; Deutsche DE; UBS CH; RBC, BMO, TD CA; BNP Paribas, Crédit Agricole CIB FR; Mizuho, MUFG, SMBC JP). Counting by **named legal entity** gives **8** (Deutsche Bank Securities Inc., UBS Securities LLC and TD Securities (USA) LLC are US-registered entities). "Nine" matches neither rule.
**Exact correction for JSON:** carry both counts with their rule — `non_us_parent_hq_count: 11`; `non_us_named_entity_count: 8`; `entity_registration: unresolved for the three US-registered securities entities (US entities, non-US parents)`. All from the researcher-reported cover page (A1). A bare "nine non-US banks" must never reach the map.

### A4. A keyword scan is not proof against indirect coverage
**Claims (L120, L124):** "A full-text scan … finds zero AI-safety, model, weights, or machine-learning provisions"; KQ4 takeaway: "No."
**Why it fails:** the scan (as reported) covered literal terms (`safety`, `artificial intelligence`, `model weight`, `AI safety`, `machine learning`, `weights`, `models`). Absence of *labels* is not absence of *relevant clauses*: the note's own findings quote §5.05(b) — notice on the Borrower becoming a "'covered foreign person' as that term is used in the Outbound Investment Rules", a US investment-security regime that expressly covers AI activities — and §5.12, which pins Material IP inside the Guarantor perimeter. Both are governance-relevant provisions a literal scan does not classify, and both exist inside the same instrument. A clause-by-clause policy review was not performed.
**Exact correction:** reword the takeaway to "No **safety-labeled** provisions were found by literal scan (researcher-reported); at least two indirectly relevant provisions exist (§5.05(b) outbound-investment notice; §5.12 Material-IP location covenant); absence of indirect reach is **not proven**." The six-condition gap conclusion survives unchanged, since neither clause is a safety deliverable.

### A5. Existence of alternative capital is not cheap substitution
**Claim (L104):** "substitution **is cheap** given the repo-documented alternatives: Amazon's $20bn facility, Google and Broadcom note programs".
**Why it fails:** existence of other financing channels does not price them. The terms, capacity, conditionality and security of those facilities were not read in this pass (they rest on a prior note, financing-audit.md, not in this raw set); strategic/vendor financings carry their own commercial conditions; replacing committed revolver capacity could be costlier or differently constrained. Note the cohere note applies the correct discipline to its analogous claim ("a directional argument only", L64) — this note must match it.
**Exact correction:** "Alternative financing channels exist (reported: Amazon/Google/Broadcom programs). Cost, availability and conditions unverified; substitution strength: existence **partial**, cheapness **unevidenced**." Keep the strategic conclusion (refusal-to-lend gains little) explicitly as hypothesis.

---

## 3. Raw-supported fact ledger (usable at full strength, with locators)

All line numbers refer to the retained `.txt` extractions, cross-checked against the `.html` originals.

**From canada-cohere.txt (PM release, 29 Oct 2026, Montréal):**
1. "the Government of Canada's commitment to making an equity investment of up to $1.6 billion in Cohere" — L71–72. **No currency unit anywhere**; hedged two ways in one document ("up to $1.6 billion" L72; "up to approximately $1.6 billion" L93).
2. "This is a commercial investment, announced alongside private investors, including NVIDIA, Bell, and Schwarz Group" — L73 ("including" = the co-investor list is also non-exhaustive).
3. Five company undertakings — L77–82: ≥1,000 new Canadian technical jobs by 2030 (L78); ≥$1.7bn additional Canadian computing infrastructure by 2030 (L79); maintain Canadian incorporation and Canadian headquarters (L80); research partnerships and student opportunities (L81); "Keep working with the Canadian AI Safety Institute to champion the safe development and use of advanced AI" (L82).
4. Staging and reporting — L83: "It will be made in stages, with regular reporting on progress against the company's commitments, including jobs and investment in Canada. This approach will give Cohere the capital to expand and hold the company accountable to deliver benefits to Canadians."
5. Quick facts — L93: total "up to approximately $1.6 billion", made in stages.
6. Merger phrasing — L95: "Cohere's recent merger with Aleph Alpha brings together Canadian and German AI expertise."
7. Absences verified in the raw text: **no investment vehicle named** ("CDEV"/"Development Investment"/"Corporation" — zero hits in the HTML); no tranche schedule; no paid amount; no governance, board, veto, or consent right; no safety condition beyond L82; no executed instrument (the release says "commitment", "planned", "will be made" — L71, 74, 83, 93); **no "revenue" anywhere** (the aiweekly "revenue targets" detail is reported-only and remains uncorroborated).

**From cdev-act.txt (Act current to 2026-09-30, last amended 2026-06-14; in force 2026-06-14 per SI/2026-26; assented 2026-03-26 — L50–52, L79–81):**
8. s.7 agent of His Majesty (L153); s.8 contracts with His Majesty as though not an agent (L157); s.9 natural-person capacity, purpose-scoped (L161); s.10(1) mandate (L167); s.10(2) best interests of Canada + commercial manner (L171); s.11(b) invest in entities incl. shares or securities (L183); s.16 ministerial concurrence for subsidiary share transactions (L246); s.17(1) guarantees on Minister-of-Finance-specified terms (L253); s.21(1) privilege over non-wholly-owned investee information (L281) with four s.21(2) disclosure limbs (L285–297); s.22(1) authorized capital determined by the Minister of Finance, $100-par shares (L303); s.22(2) subscriptions paid out of the Consolidated Revenue Fund at times/amounts the Board requires (L307); s.23 loans from the CRF (L315).
9. The Act nowhere mentions Cohere or this investment; the consolidation predates the announcement.

**From retrieval-manifest.json:**
10. cdev-act and canada-cohere retained with URLs, SHA-256 and sizes (L34–53); the Anthropic EX-10.10 direct fetch failed 403 (L54–58) — the credit-agreement evidence class is **attributed-only**.

---

## 4. Candidate statuses for eventual JSON (not approved application data)

Three status dimensions, per the team's request. Cohere-side: raw-verified where cited. Anthropic-side: every field inherits the A1 attribution limit.

```yaml
ca_cohere_equity:                     # from cohere-stages.md
  documented_right_vs_proposed_use:
    status: proposed_use_only
    documented_elements:              # raw-verified
      - "announced staged equity investment, up to ~$1.6bn, currency unstated (canada-cohere.txt L72, L93)"
      - "regular reporting on progress against the company's commitments, 'including' jobs and investment (L83; non-exhaustive)"
      - "five company undertakings incl. CAISI cooperation (L77-82)"
    undocumented_elements:
      - "any right to withhold a future stage (architecture unknown - C2)"
      - "any safety term (nothing anywhere in the raw record)"
      - "executed instrument, signatory, tranche schedule, governance rights, board seat"
  actual_holder:
    status: unconfirmed
    raw_statement: "the Government of Canada (canada-cohere.txt L71-72); no vehicle named in any raw source"
    reported_candidate: "CDEV - single secondary relay (aiweekly -> CBC), underlying article unreachable (cohere-stages.md L37, L229); capacity raw-verified, identity not (C1)"
  open_window:
    status: unknown                   # NOT window_open: true (C3)
    basis: "no executed instrument on the raw record; if the commitment already closed within the initial close (reported Cohere PR, unverified), no conditioning window remains on this paper; if unsigned, terms remain negotiable"
  what_would_change_it: "the subscription/shareholders agreement or a ministerial statement naming the vehicle, the tranche architecture, and the draw conditions"

anthropic_revolver:                    # from anthropic-credit.md - ALL attributed (A1)
  documented_right_vs_proposed_use:
    status: documented_right__proposed_safety_use
    documented_right: "lender sole-discretion elections over new credit (reported §§2.21(a), 2.22(a), 2.23(b)); Required-Lenders covenant vote with Borrower consent (§9.08(b)); no right to block committed compliant draws (§§2.01, 2.06, 4.02)"
    proposed_use: "safety-reporting covenant on a new tranche - no existing safety clause per the reported scan, itself keyword-limited (A4)"
  actual_holder:
    status: arranger_named__lender_status_unknown
    basis: "17 cover institutions carry titles only; Lender roster, Schedule 2.01 commitments and signature pages omitted; corrected nationality tally: 11 non-US by parent HQ / 8 by named entity (A3)"
  open_window:
    status: conditional__borrower_initiated
    basis: "windows open only on a Borrower-requested incremental/extension/refinancing (reported §§2.21-2.23) or a Borrower + Required-Lenders amendment; undated; present openness at any given time unknown"
  what_would_change_it: "the unredacted agreement with Schedule 2.01 and signature pages, or an effective-registration filing cycle"
```

---

## 5. What survived the attempted refutation

For honesty, the claims this pass tried and failed to break:

- **cohere-stages.md's PM-release and statute quotes are faithful to the raw text** (verified string-by-string against retained files). Minor precision fixes: s.9's "In carrying out its purpose" qualifier was dropped (L29), and s.21(2) has four limbs, not one (C4).
- The **Tech Times "veto" rejection** (L130) is correct and raw-supported: the release contains no veto, reserved matter, consent right or board seat; the "maintain its Canadian incorporation and Canadian headquarters" line (raw L80) is a company undertaking, not a government approval right.
- The **currency hedge** ("$1.6 billion" with no unit, hedged inconsistently) is accurate and raw-verified.
- **"Nothing establishes an executed subscription"** holds on the raw record (commitment/planned/will-be language, L71–93), with the reported Cohere "commitments to date" flagged as the unverified counter-signal.
- anthropic-credit.md's **documented-right vs proposed-use split** (L159), the **Borrower-consent gate** on every amendment, and the **committed-draw vs new-credit distinction** all survive at attributed confidence — they were not contradicted because no raw text exists to contradict them with; they simply cannot be elevated above `attributed_researcher_report`.
- Both notes' **PARTIAL verdicts** survive in structure; with the corrections above applied, each becomes more conservative, not refuted.

## 6. Bottom line

Neither note's direction changes under adversarial reading; both must drop confidence and tighten status fields. The Cohere path is weaker than its prose implies: capacity is documented, but **holder, tranche architecture, executed instrument, and any safety content are all unestablished on the raw record**, and four of the note's strongest sentences (FOI prediction, permanent secrecy, the committed-vs-discretionary binary, `window_open: true`) are inferences beyond the retained sources. The Anthropic path is better evidenced internally but rests entirely on **researcher-reported text (403)**, and three specific inferences (financial-statement absence, the "nine banks" tally, "substitution is cheap") must be corrected before any map use. The next discriminating questions are unchanged: for Cohere, which tranche architecture and under what draw conditions (now four options, not two); for Anthropic, nothing short of the unredacted Schedule 2.01 and signature pages resolves holder identity or coalition arithmetic.

*Method: raw sources re-read in full (cdev-act.txt 420 lines, canada-cohere.txt 102 lines, retrieval-manifest.json); HTML cross-checks by string count; no new retrieval; no git; only this file written. The full upstream Deeper Research pipeline remains blocked and is not called completed by this pass.*
