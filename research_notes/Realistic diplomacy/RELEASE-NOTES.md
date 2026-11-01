# Release notes: Realistic diplomacy research pass

Status: research complete as of the **1 November 2026** cutoff; every retrieval in this
folder was observed that day (publication, event and observation dates are recorded
separately in each ledger). Synthesised into `reports/Realistic diplomacy.md`. Nothing
in this folder edits implementation, dialogue or shared summaries.

## Correction precedence (read this before citing the notes)

1. **`source-check.md` takes precedence over the original notes wherever they differ.**
   Its verdict on the 12 highest-load-bearing claims: **10 supported against reopened
   primary text, 1 partial, 0 contradicted.** Specific corrections to carry:
   - **PLD 9 Dec 2026 is repo-verified only** — EUR-Lex returned empty payloads on
     re-check; do not cite it as reviewer-confirmed until the page is readable again
     (same for Implementing Regulation (EU) 2026/1755).
   - The **BIS stay citation URL 404s as printed**; relocate documents via the
     Federal Register API (`/api/v1/documents.json`, agency + date conditions) or the
     title-slug document path.
   - **`process.json`'s `safeguard_ladder` is invented design, not an empirical
     regularity**, and is the only machine-readable behavioural block in that file
     without its own `evidence`/`evidence_limit`. Attach an invented-design label or
     fold it into R7 before any consumer reads the JSON as an observed trust model.
2. Confirmed-correct things reviewers should *not* "fix" away: entity-scoped vs
   national licence distinctions (UAE A:5 + D:5 entity test), announced-vs-operative
   discipline, inference labelling on candidate rules, and date hygiene — all checked
   against operative text in `source-check.md` §Positive scope checks.

## Baseline drift: the notes predate current main

The notes and the plot–game audit were written against game baseline `198d3ac`
(audited at `cbaa491`). **The core-game inspection baseline was `3250f59`**; the additive research release is `ab4e84a`. Game B has moved:

- **Implemented since the audit** (so "no relationships"/"monthly amnesia" statements
  in the audit and in `process.md` §1 are partially outdated):
  - `game/game.js` now loads **`data/geopolitics.json`** and computes trust from
    sourced bilateral pairs: `trust()` weights ally history 0.6 / gifts 0.3,
    `trustPts()` adds ±7 pts per affinity unit, and meeting letters cite the sourced
    pair and its `why` (`game.js:79–121`; deterministic sibling `relations.mjs` with
    tests feeds Game A's route moods).
  - **Mission tracker + Mira's tips** (commit `3b1ca14`) and **Tuba's style-transfer
    backgrounds** (commit `b23db53`; `17b39fd` is the separate artwork handoff).
   - `ab4e84a` adds related-route links, country-interest explanations, a labelled AI outlook and fictional epilogues. The final follow-up labels scripted shocks and corrects the opening ticker.
- **Still true at `3250f59`** (verified for these notes — do not assume otherwise
  without looking): heuristic `odds()` with base 40/10 and a single `Math.random()`
  roll; all-six-conditions membership (`g.coalition`); no route-level IDs in
  `game/game.js`; windows never close after their deadline; the +10 window bonus is
  date-blind; Korea's row still `approx: false`; Singapore still mapped to the unused
  `OTH` key; fixed-month shocks with a stockpile shield that cannot block the
  December squeeze for most players; refusals still record no reason.
- Line numbers cited in the notes refer to the older baseline; re-locate before
  editing. The current synthesis is `reports/Realistic diplomacy.md`.

## Open discriminating questions before integration ships

1. **Re-check the three 10 November 2026 clocks** (BIS stay extension, MOFCOM amending
   notice, SI Dialogue "next exchange by November 2026") on ~10 November 2026 — they
   resolve inside the game's opening month and decide whether `us-china.md`'s
   opening-state framing ships as written.
2. Read the **EuroHPC Lot 2 tender pack** with a rendered browser before 3 Dec 2026:
   does any clause already authorise contracting authorities to attach conditions to
   Union access time? This decides whether R-DE-1's "EU vehicle" is real.
3. Date the UK incident-reporting window from the **Cyber Security and Resilience
   Bill text** and the March 2026 copyright/AI report rather than the 12 Oct 2026
   press release.
4. Whether **G42/Core42 restructured or requested an extension** before the 6 Apr 2027
   expiry; whether any **Saudi-equivalent licences or rule** was published after
   July 2026; contents of the two **123 side letters**.
5. Confirm the Dutch AI Act implementation act's passage after the 1 Jun 2026
   consultation (can NL offer any national AI-condition enforcement inside the
   horizon, or only licences?).
6. Re-fetch **EUR-Lex** for the PLD deadline and Regulation 2026/1755.

## Not established anywhere in this pass (keep it that way in-game)

This pass does not establish government acceptance of the specific proposed safety
bargains or measured acceptance percentages. Candidate gameplay rules are
evidence-constrained fiction and must be labelled as such.
