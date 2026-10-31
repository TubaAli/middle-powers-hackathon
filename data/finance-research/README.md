# Finance research data (research leads, not application schema)

Observation date for every record and source: **2026-10-31**.

## What this is

`candidates.json` holds five hand-curated **research leads** for the finance layer of the
Leverage Map + Coalition Builder, produced under the discipline in
`research_notes/Finance decision rights followup/METHOD.md` and the corrections in
`reports/Finance layer handoff.md` and the follow-up notes.

One record = **one holder, one right, one target, one decision context**, assessed against a
fixed rubric of six model-safety conditions (`pre_release_testing`, `incident_reporting`,
`protected_weights`, `essential_user_continuity`, `known_chip_locations`,
`local_stop_due_process`).

**No record in this dataset is a currently existing, enforceable, complete model-safety
path.** Every record carries `model_safety_path.existing_enforceable_complete: false` with a
basis. Three of the five instruments are draft or unsigned; one is an announced commitment with
no located instrument; no explicit model-safety covenant was identified in the reviewed
provisions of the signed credit agreement.

## What this is NOT

- **Not a drop-in application schema.** These files are research leads for humans and for
  future curation. Any prototype ingestion must treat `null`/`unknown` as first-class
  rendered states, not blanks to fill by inference.
- **Not a count of opportunities.** No record here has both documented discretion and a
  verified open decision window. If the prototype ever displays opportunity counts, it may
  only count records with both, separately from announcements and research leads. Nothing in
  this file justifies such a count today.
- **Not authority transfer.** Selecting a country in a UI never grants its government the
  rights recorded here. Holder jurisdiction is institutional location, not a power.
- **Not a digest of researcher reports.** Other researchers' notes are treated as claim
  indexes, never as source evidence. Every factual claim in `candidates.json` is cited, at
  claim level, to a **retained primary source** indexed in `sources.json`.
- **Not a copy of the sources.** Raw texts stay in the git-ignored
  `.local/finance-evidence/` directory, hashed in
  `.local/finance-evidence/retrieval-manifest.json`. `sources.json` is a compact index of
  that manifest (URL, SHA-256, bytes, access status, locators used); no raw source text is
  reproduced in this directory.

## Records

| id | instrument | one-line status |
|---|---|---|
| `eurohpc-incident-notification` | EuroHPC AI Gigafactory draft FWC, I.14.6 → II.18.1(p)/II.18.3 | Security-incident notification duty: **existing in draft only**, not signed/enforceable today; obligor is the Contractor; infrastructure security scope, not model behaviour |
| `eurohpc-asset-inventory-relocation` | EuroHPC draft FWC, I.16.3 + I.16.5 | Quarterly asset inventory and PGB prior approval of critical-asset relocation: **draft**; partial facility oversight, no explicit serial-level register or weight-custody right identified |
| `eurohpc-additional-security-measures-request` | EuroHPC draft FWC, I.14.7 + SC Art. 11.5 | REQUEST power with "every reasonable effort" accommodation: **proposed model-safety use, not guaranteed** — undefined "appropriate", no compliance deadline, no clause-specific remedy, contractor-bound |
| `anthropic-credit-consent-gates` | Anthropic credit agreement (S-1 Exhibit 10.10), §§2.21–2.23, §9.08 | New-money gates in a **signed** agreement; **amount null** (Schedule 2.01 redacted); **present window unknown, borrower-initiated**; named arrangers are **not confirmed lenders**; evidence is `retained_tool_extraction`/`section_checked` |
| `canada-cohere-staged-equity` | PM release 2026-10-29 | **Announced** staged equity **up to $1.6bn**, currency CAD **inferred** (source says "$" only); investing vehicle **unnamed — NOT established as CDEV**; window **unknown**; reporting covers all company commitments (jobs/compute are non-exhaustive examples, not the exclusive scope); **no signed terms known** |

The three EuroHPC records share `transaction_id: eurohpc-aigf-cft-2026`: one call-wide
research context, with **amount null**. The EUR 100m figure is a Lot 1 Phase 1 per-framework
ceiling, not the whole call's financing. Other lot/phase ceilings and the portal's estimated
call value remain separately described in `amount_basis`; they are not additive flows.
Any subsequently established shared transaction amount must be counted once.

`conditions.incident_reporting.scope` distinguishes the draft infrastructure-security duty
from proposed model-incident reporting. An `existing_in_draft` status does not mean the
model-level condition is satisfied. The asset-location duty is likewise partial facility
oversight. `outside_instrument_scope` means the reviewed right does not expressly establish
the condition, not that the entire contract excludes it. No executed EuroHPC FWC was located;
that is a bounded retrieval finding, not proof none exists.

## Evidence access statuses (exact distinctions, validator-enforced)

| Source | Access | Why |
|---|---|---|
| 4 EuroHPC PDFs (FWC, specifications, changes, Annex 2) | `raw_download` / `section_checked` | curl with normal TLS verification; page-labelled extractions retained; cited sections read in this task |
| Canada release, CDEV Act | `raw_download` | HTML retained and hashed; extractions cross-checked; absences verified by string search |
| EuroHPC portal capture | `rendered_dom` | browser-rendered DOM innerText; used for dates/deadlines/Q&A only, never clause text |
| Anthropic exhibit text | `retained_tool_extraction` — **NOT `raw_html`** | direct raw fetch returned HTTP 403; the coordinator recovered a 682,490-character source text via a pre-skill webfetch, retained at `.local/finance-evidence/anthropic-credit-tool-text.txt`; treated as retained primary text at reduced provenance grade |

A 403 is an access limitation, never evidence that a filing is absent. `not_retained`
entries in `sources.json` document failed fetches only.

## Status vocabularies (all validator-enforced enums)

- `instrument.instrument_status`: `draft_unsigned` | `signed` | `announced` | `unknown`
- `instrument.transaction_status`: `announced` | `signed` | `closed` | `repaid` | `cancelled` | `exited` | `unknown`
- `instrument.evidence_type`: `contract` | `filing` | `official_release` | `reporting`
- `right_status`: `documented` | `announced` | `proposed` | `unknown`
- `finance.flow_type`: `equity` | `debt` | `procurement` | `guarantee` | `lease` | `grant` | `unknown`
- `finance.payment_status`: `funded` | `committed` | `conditional` | `announced` | `undisclosed` | `unknown`
- `window.status`: `open` | `closed` | `conditional` | `unknown`
- `conditions.*.status`: `existing_in_draft` | `existing_evidenced` | `proposed_reachable` | `outside_instrument_scope` | `unknown`
- `verification.access`: `full` | `partial` | `index_only` | `phrase_match`

Two discipline rules are baked into the data and the validator:

1. **`existing_in_draft` never counts as an existing power** — the instrument is unsigned.
   `existing_evidenced` requires `instrument_status == "signed"` and is used nowhere in this
   version.
2. **No open-window inference on announced/unknown/draft records**: if the instrument is
   `draft_unsigned`/`announced`/`unknown` or the transaction is `announced`/`unknown`, the
   window may not be `open`. The Canada record's window is `unknown` (not `open`, not
   `closed`); the Anthropic gates are `conditional` because they open only on
   borrower-initiated events whose present openness is itself unknown.

## Deliberately excluded (unsupported on the retained sources)

Sovereign-control claims, authority ranks, total national shares, bank nationality counts,
and implied cheap substitutes. The `substitutes` field is explicitly `null` on every record:
existence of alternative financing channels was never priced. See the `exclusions` block at
the end of `candidates.json`.

## Validation

```
python3 scripts/validate-finance-research.py
```

Standard library only. The validator checks: source references resolve into `sources.json`
with non-empty locators; unique record and source IDs; required explicit `null`/`unknown`
fields per record (unknowns render explicitly, they are never omitted); all status enums
above; the per-record required distinctions in the table (Anthropic amount null, Canada CAD
inferred + vehicle null, EuroHPC draft status, etc.); the no-open-window rule; the
`existing_evidenced`-requires-signed rule; `model_safety_path.existing_enforceable_complete`
false everywhere; shared-transaction finance consistency; a prohibited-claims scan (no
sovereign-control/nationality-count/cheap-substitute assertions); and, when
`.local/finance-evidence/` is present, that every retained source's SHA-256 and byte size in
`sources.json` match the actual retained file (integrity check). When the evidence directory
is absent, those checks degrade to format checks so the dataset remains verifiable
elsewhere.

Passing validates structure and retained-file integrity, not the truth of prose or legal
interpretations. The integration review corrected scope, amount and unsupported-absence
claims that the initial validator accepted.

## Provenance

- Derived from `.local/finance-evidence/retrieval-manifest.json` (2026-10-31) and the
  retained, hashed files it indexes.
- Verification method: `research_notes/Finance decision rights followup/METHOD.md`
  (raw-source retention, claim-level provenance, independent refutation); raw-source checks
  in `eurohpc-raw-verification.md`; adversarial corrections in `authority-refutation.md`.
- Next falsifying tests, per record, are listed in each record's `missing_evidence`.
