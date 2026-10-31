# Route research notes: finance & compute routes (Canada, Taiwan, Anthropic)

> Integration review: the published JSON qualifies Taiwan's assumed discretion over support programmes; authority, existing commitments and recipient agreements need checking. No executed Cohere investment instrument was located; this is not proof that none exists. All three safeguards remain proposed.

**Observation date: 2026-10-31.** Companion data: [`data/route-research/finance-compute.json`](../data/route-research/finance-compute.json).
Scope: three curated routes for the routes-to-safeguards explorer, following `DESIGN.md` (approved direction,
31 October 2026) and the canonical qualifications in [`reports/Finance decision rights followup.md`](../reports/Finance%20decision%20rights%20followup.md).
These notes record what was read, how it was validated, the axis method, source limits and the assumptions that were
deliberately rejected. The author of this file owns only `data/route-research/finance-compute.json` and this note.

## What this is

Three points for the plot, chosen by the coordinator for diversity across coordination class, region and mechanism:

| id | shortLabel | coordination | region | mechanism | status | confidence | impact | feasibility |
|---|---|---|---|---|---|---|---|---|
| `canada-cohere-equity-safety-covenant` | Canada Cohere covenant | national | Cross-regional | Finance | Proposed | Medium | 2 [1–3] | 3 [2–4] |
| `taiwan-public-compute-safety-conditions` | Taiwan public compute | national | Asia-Pacific | Compute | Proposed | Low | 2 [1–3] | 3 [2–4] |
| `anthropic-new-credit-lender-safety-covenant` | Lender safety covenant | broader | Cross-regional | Finance | Documented mechanism | Medium | 3 [2–4] | 2 [1–3] |

All three safeguards are **proposed**. No route here documents an executed model-safety covenant, and none should be
rendered as an existing power. The Anthropic route is the only one whose *negotiating gates* (not the covenant) are
documented in a signed instrument — that is what `Documented mechanism` marks.

## Sources read and validation performed (all 2026-10-31)

**Canada — PM news release (published 2026-10-29).** Retained hashed HTML and extraction
(`.local/finance-evidence/canada-cohere.html` / `.txt`) read in full this session. SHA-256
(`35f0180a86e89f03aec7510140a542fd69c46e6d96bb61a311218f80a2045763`) and byte size (47,435) re-verified against
`data/finance-research/sources.json`. Absence claims re-verified by string search: `CDEV`, `Development Investment`,
`veto`, `CAD` — zero hits in HTML and extraction; `board`, `consent` — zero hits in the operative text (the only raw-HTML
hits are page chrome: `modal_keyboard`, `gtag consentMode`). The single `condition` occurrence is Minister Solomon's
quote about "the conditions to turn ambitious ideas into globally successful businesses", not an investment term.
Operative facts used: equity "up to $1.6 billion" (L72), "made in stages" with "regular reporting" and
"hold the company accountable" (L83, L93), five undertakings including CAISI cooperation (L77–82), co-investors
NVIDIA, Bell, Schwarz Group without amounts (L73), Aleph Alpha merger (L95).

**Canada — CDEV Act (consolidated to 2026-09-30).** Retained hashed text; cited for statutory capacity only
(s.9, s.10(2), s.11(b), s.21, s.22). Capacity is not identity: nothing establishes CDEV as the Cohere investor.

**Taiwan — Artificial Intelligence Basic Act (promulgated 2026-01-14).** Official English text fetched from
`law.nstc.gov.tw` and read in full this session (the coordinator had freshly read the same primary). Key articles
verified in the fetched text: Art. 2 (NSTC central competent authority), Art. 5 (high-risk advisory machinery; MODA
assessment/verification tools), Art. 6 (National AI Strategic Committee), Art. 10 (subsidies, commissions, funding,
investments, incentives, fiscal measures; annual public performance-report system), Art. 11 (support and subsidy
measures for emerging-AI development/testing), Art. 16 incl. 16(3) (MODA risk taxonomy interoperable with
international frameworks; risk-based management regulations; restriction/prohibition of Art. 5(1) circumstances by
law), Art. 18 (non-complying laws/regulations to be enacted, amended or repealed within two years of the effective
date), Art. 19 (government risk assessments for its own AI use in duties/services), Art. 20 (effective on
promulgation). **No local copy is retained** — retention would write outside this task's file ownership — so this
source is a live primary read, not a hashed artifact. No grant terms are inferred from the Act, per coordinator
instruction.

**Anthropic — Amended and Restated Credit Agreement (EX-10.10 to Form S-1).** Retained tool-extracted text
(`.local/finance-evidence/anthropic-credit-tool-text.txt`, 682,490 characters; direct raw fetch returned HTTP 403 and
was **not** re-downloaded, per coordinator instruction). SHA-256
(`28a843501360aa0facaaacec9538640f249635446d0e6e37f2fb191dabeea83a`) and byte size (687,285) re-verified against
`data/finance-research/sources.json`. Sections re-checked directly in the retained text this session:

- preamble: "AMENDED AND RESTATED CREDIT AGREEMENT dated as of September 4, 2026, among ANTHROPIC, PBC, as the
  Borrower";
- s.2.21 and s.2.22: "any election to do so shall be in the sole discretion of such Lender" (2 exact occurrences;
  contexts read);
- s.2.23: "any Lender offered or approached … may elect or decline, in its sole discretion, to provide a Replacement
  Revolving Facility Commitment" — different phrasing from ss.2.21/2.22, which is why exact-string counting alone
  finds only two; all three sections are now passage-verified;
- s.9.08(b): amendment gate "pursuant to an agreement or agreements in writing entered into by the Borrower and the
  Required Lenders";
- s.1.01: "Required Lenders" = Lenders holding outstanding Incremental Term Loans and Revolving Facility Commitments
  "taken together" representing more than 50%;
- `SCHEDULE 2.01Commitments[***]` and `[Signature Pages Intentionally Omitted]`.

## Axis method

Ordinal editor judgments (1–5) for plot placement, each with a judgment range; not probabilities, calibrated forecasts
or measured risk reduction. `impact` = potential safety impact *if the proposed safeguard were implemented as
described*; `feasibility` = implementation feasibility (consent required, legal authority, coordination cost, timing).
`confidence` is kept separate from both axes and grades the **mechanism evidence only** — how well the
actor → instrument → safeguard chain is documented — never the impact. Broad reach does not mean success: the
Anthropic route has the broadest potential reach and the lowest feasibility of the three.

Confidence ordering and why: Anthropic **Medium** (gates documented in a signed instrument, but retained tool text at
reduced provenance grade, redacted roster, unknown window — consistent with the canonical dataset's `partial`/`medium`
grade); Canada **Medium** (full-provenance official release documents the staged equity and reporting machinery the
covenant would ride, but the operative hook — draw conditions, vehicle — is unevidenced); Taiwan **Low** (the law is
promulgated and primary-read, but the route's operative instrument — any public-compute program — is absent from the
record entirely, not merely unstudied). Low confidence is not doubt about the law; it is the honest grade for a
mechanism with enabling authority but no program document.

## Route reasoning, in brief

**Canada → Cohere future-stage equity covenant (national, Finance, Proposed).** The announcement supplies staging,
a reporting architecture and an existing CAISI-cooperation undertaking — a concrete attachment surface for a covenant,
which is why feasibility sits at 3. What caps both axes: no instrument exists on the record (vehicle, tranche
architecture, draw conditions, currency unit, remedy all unknown), any covenant needs Cohere's written assent, the
stages may be unconditional or precommitted, and the obligor group spans two jurisdictions after the Aleph Alpha
merger. Impact caps at one company group with an existing voluntary safety undertaking.

**Taiwan → public-compute access conditions (national, Compute, Proposed).** A government conditioning its own support
programs needs no external consent, and the Act's Art. 18 two-year implementing window (to 2028-01-14) is a dated
legislative hook — feasibility 3. Impact is likely small and uncertain because no compute program, budget, user base
or access terms are evidenced; the value is the Art. 16 interoperable-taxonomy hook and template diffusion, not
frontier reach. Explicitly **no assumed chip control**: nothing here rests on TSMC, exports or corporate chip supply.

**Multinational lenders → new Anthropic credit covenant (broader, Finance, Documented mechanism).** The strongest
documented negotiating gates of the set — signed, passage-verified — attached to the weakest coalition story: every
route requires Borrower initiation or agreement; the Required-Lender roster is redacted, so consent arithmetic is
impossible; each lender elects individually, so objectors cannot block others' money; no window is evidenced open; no
middle-power government actor is evidenced at all; and there is **no holdback of compliant committed draws** — the
gates govern new money and amendments only. Hence impact 3 (frontier developer, enforceable machinery, market
precedent) with feasibility 2.

## Source limits

- Anthropic: retained tool extraction, not raw bytes (HTTP 403); S-1 body not read; Schedule 2.01 redacted; facility
  amount absent from the retained text; general default machinery not extracted (missing, not asserted absent). A 403
  is an access limitation, never evidence of absence.
- Canada: announcement-grade evidence only; no instrument; "regular reporting" has no recipient, cadence or standard;
  CAISI's current powers are not established from primary sources in this corpus.
- Taiwan: live-fetch primary read this session, no retained local copy (file-ownership constraint); no program
  guidelines, budget lines, drafts or user terms in evidence; framework-law articles cannot substitute for program
  documents.
- Region vocabulary has no Americas value: the Canada route is `Cross-regional` by elimination (its obligor group also
  spans Canada and Germany via the merger); the Anthropic route is `Cross-regional` because the multinational lender
  roster is unknown. Flagged in the JSON rather than hidden.

## Rejected assumptions (none carried into the records)

1. CDEV as the investing vehicle — unnamed; the Act documents capacity only.
2. CAD as a stated currency — inferred from a "$" figure; must be flagged as inferred wherever used.
3. A lender right to withhold compliant committed draws — does not exist; leverage is ex ante over new money and
   amendments only.
4. Arranger titles as lender status, or any bank-nationality tally — roster redacted; excluded deliberately.
5. Taiwan exercising control over TSMC or any corporate chip supply — no assumed chip control; public compute access
   is the only leverage claimed.
6. Specific compute-grant terms inferred from Basic Law articles 10/16/19 — enabling and duty provisions only.
7. Open decision windows inferred from announcements or undated gates — Canada's tranche calendar and Anthropic's
   next credit event are unknown, not open.
8. "Not read" as "not filed" for the SEC exhibit — a 403 documents an access limitation only.
9. Cheap substitution (e.g. "Anthropic can just refinance elsewhere") — alternative financing channels were never
   priced; substitutes stay unasserted.
10. Categorical zero-safeguard claims from absence — unlocated instruments and missing program texts are recorded as
    unknown, never as proof of nothing.

## Next discriminating questions

1. **Canada:** which legal vehicle holds the staged investment, and what conditions govern later-stage draws —
   unconditional staged calls, conditional tranches with certifications, or precommitted subscriptions?
   (Subscription/shareholders agreement, or a ministerial statement naming the vehicle and tranche conditions.)
2. **Taiwan:** which program allocates public AI compute, at what scale, to whom, on what published access terms —
   and does the Art. 18 window (to 2028-01-14) include any compute-support or subsidy regulation now in draft?
3. **Anthropic:** who actually holds the commitments (Schedule 2.01 or an authoritative allocation disclosure), and is
   any Borrower-initiated incremental/extension/refinancing event live or foreseeable?

No questions have been sent to anyone; no outside contacts, spend, git operations or agent-to-agent traffic were
performed for this task.
