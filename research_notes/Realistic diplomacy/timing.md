# Timing audit: windows.json, the game calendar, and date-dependent rules

Owner: timing research pass (Realistic diplomacy). Observation date for all live
retrievals below: **1 November 2026**; research cutoff 1 November 2026. Game
baseline per BRIEF: `198d3ac`; audited files as they stand at `cbaa491`
(working tree, unmodified). This file proposes labels and semantics only; no
implementation, shared-file or dialogue edits were made. Events dated through
June 2027 are **future scheduled/proposed, not observed**.

What was audited: `data/windows.json` (all nine rows), `game/game.js`
(`MONTHS`/`MONTH_KEYS`/`GAME_END`, window-driven logic, decay, build/seed/
stockpile/choke moves, scripted shocks), `game/planets.json` + `data/layers.json`
(country keys, `replicate_years`), `game/opening.js` clock framing, plus the
repo's own verified datasets (`data/geneva-research.json`, APAC and EuroHPC
research notes) and the blog that seeded the dates.

## 1. The clock the game claims

- `game/game.js:6-8`: `MONTHS` Nov 2026 → Jun 2027, `GAME_END = '2027-06-30'`.
  Eight turns, one council move + one round of meetings per month.
- `game/opening.js:26`: "The rules are being written now. In eight months, the
  window closes." — the core pressure line. The eight-month clock itself is
  fiction, but it is anchored on a real announced endpoint (§2, Geneva).
- Honest guardrails already present: `windows.json:5` ("Dates are openings, not
  delivery plans") and `game/game.js:279` ("Law dates are openings, not plans").
  Everything below builds on those, not around them.

## 2. Verified status of each claimed window

Kinds used: **statutory deadline** (in instrument), **confirmed tender
deadline** (published by contracting authority), **announced event** (date
published by organiser), **announced target** (government-stated intention, no
published date), **derived earliest** (computed minimum, explicitly not a
deadline), **adopted, not in force** (passage done, commencement pending),
**standing** (no date by design).

| windows.json row (lines) | In-game date | What it really is | Event / publication dates | Primary source (access) |
|---|---|---|---|---|
| Singapore (9-24) | 2026-10-07 | **Adopted, not in force.** Parliament passed the Digital Infrastructure Bill 7 Oct 2026; minister: Act "into force in stages", codes/licensing developed "over the coming year", "We expect the approved Act to come into force in 2027"; existing operators get 6 months from commencement to licence | Second-reading closing speech 7 Oct 2026; as-enacted published 8 Sep 2026; no commencement gazette located as of 31 Oct 2026 (repo-verified) | [MDDI closing speech](https://www.mddi.gov.sg/newsroom/closing-speech-by-sms-tan-kiat-how-for-the-second-reading-of-the-digital-infrastructure-bill/) (fetched in full); repo: [SSO as-enacted](https://sso.agc.gov.sg/Bills-Supp/20-2026/Published/20260908?DocDate=20260908) + Drew & Napier 15 Oct 2026 |
| Japan (25-38) | 2026-10-31, approx | **Announced target / review start.** Digital Agency minister announced (6 Oct 2026 press conference) the AI Strategy expert council convenes "around late October", with a **new working group reviewing the in-force AI Act ("including whether legal changes are needed")**; minister explicitly declined any timetable or Diet-session commitment | Press conference 6 Oct 2026; page updated 7 Oct 2026; the reviewed law (Act No. 53 of 2025) promulgated 4 Jun 2025, full effect 1 Sep 2025 (repo-verified, non-penal) | [Digital Agency, Minister Furukawa press conference](https://www.digital.go.jp/speech/minister-261006-01) (fetched in full, Japanese) |
| EU EuroHPC Lot 2 (39-54) | 2026-12-03 | **Confirmed tender deadline.** Call `EUROHPC-2026-CEI-AIGF-01` (published 30 Jul 2026): "deadline for receipt of tenders for Lot 2 remains 03/12/2026 17:00 Europe/Luxembourg" | Call published 30 Jul 2026; observed live 1 Nov 2026 | [EuroHPC JU call page](https://www.eurohpc-ju.europa.eu/call-tenders-selection-artificial-intelligence-gigafactory-consortia-and-establishment-ai_en) (fetched in full) |
| EU EuroHPC Lot 1 (55-70) | 2027-02-04 | **Confirmed tender deadline, extended.** "the Contracting Authority has decided to extend the deadline… The new deadline for receipt of tenders for Lot 1 is 04/02/2027 17:00 Europe/Luxembourg" (to let states finish national budget procedures) | Extension announced late Oct 2026 (repo retained record: published 2026-10-26); observed live 1 Nov 2026 | Same EuroHPC page (fetched in full) |
| EU Product Liability Directive (71-84) | 2026-12-09 | **Statutory deadline.** Directive (EU) 2024/2853, Art. 22(1): "Member States shall bring into force the laws, regulations and administrative provisions necessary to comply with this Directive by 9 December 2026" | Directive of 23 Oct 2024; text verified 1 Nov 2026 | [EUR-Lex, 2024/2853](https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng) (fetched; Art. 22(1) read) |
| EU AI Act testing powers / Code review (85-97) | null | **Standing.** Implementing Regulation (EU) 2026/1755 of 20 Jul 2026 sets the Commission's GPAI evaluation proceedings; EC Q&A: "The AI Office will review the Code at least every two years" — no date set | Regulation dated 20 Jul 2026; Q&A page last updated 20 Jul 2026 | [EUR-Lex 2026/1755](https://eur-lex.europa.eu/eli/reg_impl/2026/1755/oj/eng) (fetched; title confirmed); [EC Q&A](https://digital-strategy.ec.europa.eu/en/faqs/questions-and-answers-code-practice-general-purpose-ai) (fetched in full) |
| South Korea (98-110) | 2027-01-22, approx: **false** | **Derived earliest, not a deadline.** MSIT (Jan 2026): Act in force 22 Jan 2026; "A grace period of **at least one year** will be granted… fact-finding investigations and the imposition of penalties will be deferred"; guidelines refined during grace; an improvement working group launched Feb 2026. 22 Jan 2027 is the earliest possible end; extension/actual enforcement timing unverified. The seeding blog itself marks it "no earlier than 22 January" (earliest-possible symbol) | MSIT release January 2026 (board lacks exact posting day); Act effective 22 Jan 2026 | [MSIT English release 1214](https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1214&sCode=eng) (fetched in full) |
| Australia (111-127) | 2027-03-01, approx | **Announced target.** PM package "AI in Australia's interests" (15 Jul 2026) announced Australian Standards for AI — obligations for large data centres (power, water, siting) plus AI copyright — with **legislation expected early 2027**; no published date. 1 Mar is a placeholder (approx flag ✓ true) | PM release 15 Jul 2026 (repo-verified, fetched in full 31 Oct 2026); Digital Watch summary 16 Jul 2026 | [pm.gov.au release](https://www.pm.gov.au/media/ai-australias-interests) (repo-verified 31 Oct 2026; not re-fetched this pass); corroborating locators in `research_notes/Asia Pacific safeguard coalitions/singapore-australia.md` |
| All participants — Geneva summit (128-142) | 2027-06-21 | **Announced event.** BAKOM (published 14 Aug 2026): the Geneva AI Summit, 21–22 June 2027 at Palexpo; Fabiola Gianotti appointed Delegate by the Federal Council; "fifth international summit dedicated to AI governance". Participation list not established — "All participants" is game fiction | BAKOM publication 14 Aug 2026; summit 21–22 Jun 2027 (future) | [BAKOM page](https://www.bakom.admin.ch/en/geneva-ai-summit-2027-international-summit-on-artificial-intelligence-in-geneva) (fetched in full) |

Seeding source for all non-EuroHPC rows: gszep, "Six safety conditions for
upcoming laws", published **12 October 2026**
([URL](https://gszep.com/en/blog/six-safety-conditions-for-upcoming-laws/),
fetched in full). Its own legend marks Japan and Korea as *earliest-possible*
dates (open circles) and says "not every review has a fixed timetable" — the
game data drops some of that nuance (finding 2 below).

**Verdict:** none of the nine dates is fabricated; two are hard statutory/tender
deadlines (PLD, both EuroHPC lots), one a dated announced event (Geneva), one
adopted-not-in-force (Singapore), one standing (EU AI Act), three announced or
derived (Japan, Korea, Australia). The one mislabelled row is Korea
(`approx: false` where the primary source says "at least one year").

## 3. Where timing actually bites in the rules (locators)

- **Arrival gate (the only one):** `game.js:116-117` — "Table a bill" is offered
  once `w.date.slice(0, 7) <= MONTH_KEYS[g.turn]` (window month arrived) for a
  window that lists *your* country and overlaps your goal's condition.
- **Month event lines:** `game.js:175-176` — a window renders
  `📜 who: label` only in the exact month of its date, and only for coalition
  countries or all-participants rows.
- **Goal "law vehicle":** `game.js:64-67` — any window with a date ≤ `GAME_END`
  whose countries intersect your coalition (or that you tabled) counts; the
  result caps goal progress at 75% without it (`achieved = raw * 0.75`).
- **Acceptance odds:** `game.js:90` — +10 if the target country has *any* window
  overlapping your goal's condition. **No date check at all** (null dates and
  not-yet-arrived windows both count).
- **Decay clock:** `game.js:10, 49, 174` — from April 2027 (turn 5), stages with
  `replicate_years[1] <= 3` count ×0.8. Per `data/layers.json` that is exactly
  power (hosting), compute, model — the event text matches the data.
- **Scripted shocks:** `game.js:159-172` — China refined-metals squeeze fixed at
  Dec 2026 (turn 1; "70% of refining" matches layers.json CN `mine` share 70);
  US pressure on one ally fixed at Feb 2027 (turn 3). Stockpile move
  (`game.js:129-133`) shields only `dep.top` (top supplier of your weakest-held
  stage); the shocks test `g.shield.CN` / `g.shield.US` specifically.
- **Build / seed:** `game.js:12, 134-138` build is instant (+2 power, +1 compute
  for −1 energy −1 capital); `game.js:142-146` seed is instant +1 pt, labelled
  "real replacement takes lo–hi years".
- **`approx` is dead code:** the flag exists in `data/windows.json:23,37,...`
  but no game JS reads it — approximation nuance reaches the player only if a
  label happens to contain it.

## 4. Top 8 material timing issues

1. **Windows never close (false urgency inverted: no teeth).**
   `game.js:116-117` only checks that a window's month has *arrived*; nothing
   stops tabling after the real deadline. A Germany/Netherlands player can
   "Table a bill" on the EuroHPC Lot 2 window (real receipt deadline 3 Dec 2026,
   17:00) in May 2027, and on the PLD transposition window (9 Dec 2026) in June
   2027, with no in-game consequence. The player is told deadlines exist
   (labels say "closes", "deadline") but the clock never enforces them.
   **Fix:** gate tabling to the window's month (deadline-kind rows: eligible
   only while `MONTH_KEYS[g.turn] === w.date.slice(0,7)`), and let expired
   windows show one passed line ("📜 EU: tender closed") — real pressure,
   honest mechanics, same data.

2. **Korea's date is presented as firm but is a derived earliest.**
   `windows.json:103,109` — `2027-01-22` with `approx: false`, labelled "Notices
   under the AI Basic Act before the fines grace period ends (may be extended)".
   The primary source says the grace is "at least one year" with penalties
   deferred; the seeding blog marks it "no earlier than 22 January". No source
   publishes 22 Jan 2027 as a notice deadline. **Fix (data only):** set
   `approx: true` and label: *"Earliest possible end of the AI Basic Act fine
   grace (≥1 year from 22 Jan 2026; MSIT may extend; enforcement timing not
   published)."* January 2027 stays the in-game month; pressure is preserved,
   fake precision removed. Note `approx` is currently unread by code (§3), so
   the label must carry the hedge.

3. **Goal "law vehicle" ignores arrival; one row makes it near-automatic.**
   `game.js:64-65` has no comparison to the current month, so a *future* window
   of any coalition member counts immediately. The Australia row's conditions
   (`windows.json:118-125`) list **1-6** (it is the only all-six
   row), so recruiting Australia & Canada in November 2026 lifts the 75% cap on
   **every** goal five months before its March window, and regardless of whether
   the real bill (target: early 2027, no published date) ever materialises.
   Timing pressure is cosmetic for goal progress; only coalition membership
   matters. **Fix:** require arrival (count only windows whose month has come,
   or that were tabled while open), or split the AUCA row's conditions; a "law:
   pending (opens Mar 2027)" HUD state (§6) keeps the anticipation visible.

4. **Singapore's window is dead data — the most recent real law in the set is
   invisible.** `windows.json:11-13` maps it to `countries: ["OTH"]`, but no
   planet uses that key (`game/planets.json` players: US, CN, JP, TW, KR, NL,
   DE, UK, GULF, AUCA, PROD; `OTH` is a supply-share bucket in layers.json).
   It is never tableable, never a law vehicle, never +10, and its month
   (2026-10) precedes every `MONTH_KEYS` entry so it never renders as an event.
   **Fix:** either (a) repurpose as a one-line global event in Nov 2026 —
   `countries: []`, date `2026-11`, label *"Singapore: Digital Infrastructure
   Act passed 7 Oct; codes drafted over the coming year; expected in force
   2027"* (matches the minister's speech); or (b) drop the row. Do not leave a
   pseudo-country window.

5. **Japan's window never displays, and pre-start dates can't render.**
   Same month-equality mechanism (`game.js:175`): `2026-10-31` precedes the
   game's first month, so a Japan player is offered "Table a bill" from turn 0
   (correct — the review is genuinely open at game start) but never sees the
   event line explaining it. The verified content is fine; only the display
   date is wrong for the mechanism. **Fix:** keep the real late-Oct start in
   the label, set the display date to `2026-11` (or add a "windows open now"
   list to the first council), and optionally rename "AI Promotion Act" to
   "the AI Act" to match the in-force 2025 statute the working group reviews.

6. **The +10 acceptance bonus is date-blind.** `game.js:90` grants +10 for a
   matching window whether it is already open, not yet arrived (Korea Jan 2027,
   Australia Mar 2027, Lot 1 Feb 2027 from November 2026), or standing (the
   null-date EU row). As a *property* ("this country has a legislative vehicle
   that fits your goal") it is defensible fiction; as *timing* it is wrong.
   **Fix (pick one, don't mix):** either gate the bonus on the open state
   (standing rows exempt), or reframe it in code/data vocabulary as a
   vehicle-property so no timing claim is implied. It is invisible to players
   either way (not shown in the odds breakdown).

7. **Fixed-month adversarial shocks with mismatched counterplay.**
   `game.js:159-172` hardcodes China's squeeze to Dec 2026 and US pressure to
   Feb 2027 — invented calendar certainty about adversary behaviour — and the
   advertised shield frequently does not work: the stockpile move (`game.js:130-133`)
   shields `dependsOn(me)[0].top`, while the December event tests `g.shield.CN`
   specifically, so a player whose top dependency is not China cannot defend
   against the scripted metals shock at all. **Fix:** keep the shocks (they are
   the game's teeth) but label them as scenario events in-fiction ("war-game
   scenario, month 2"), and align shield semantics (shield any exposed supplier
   of the squeezed stage, or make the shock target the player's actual
   dependency chain).

8. **The substitution clock is date-fixed and asymmetric (labelled fiction —
   keep, but say so).** Decay starts in April 2027 regardless of when capacity
   was built (`game.js:49`): a campus approved in May decays next month like
   one from November. Meanwhile a chokepoint licence (+25%, `game.js:11, 46`)
   and seeded points never expire, and seeding a slow-to-replicate stage
   (e.g. tools, 8-15 yrs) is decay-exempt while the build move's own outputs
   (power/compute, ≤3 yrs) are exactly what decays. Internally consistent with
   layers.json replication horizons and honestly announced in the event text;
   no fix required, but the debrief/limits text could state that the decay
   month is a game rule, not a forecast of rivals' catch-up date.

Minor, listed for completeness: (a) UK, Taiwan, Gulf and Producer-state players
have no own-country windows, so they can never "Table a bill" — window dates
create in-game deadlines only for JP/DE/NL/KR/AUCA homes; (b) `GAME_END`
(2027-06-30) and the summit (21-22 Jun) are consistent, and the summit row is
correctly excluded from law/odds — its only role is the June event line, which
is fine; (c) the AUCA row's `who` says "Australia" while the actor is
"Australia & Canada" — display nit.

## 5. Build timing / chokepoint substitution, computed from the rules

- **Build** (`BUILD = {power: 2, compute: 1}`, `game.js:12, 136-137`): −1 energy
  −1 capital → +2 hosting share points, +1 compute, **instant**, though the
  move's own text says hosting takes "1–3 yrs" to grow. If built before April
  2027 it counts in full for ~5 months, then ×0.8 under decay.
- **Decay** (×0.8 from April 2027, `game.js:49`): applies to coalition share of
  power, compute and model stages only (all `replicate_years[1] ≤ 3`); ore,
  mine, magnet, grid, mat, tools, fab, hbm, design are untouched.
- **Seed**: free, +1 pt instantly to your most-exposed dependent stage; if that
  stage is slow to replicate it never decays — seeding slow stages strictly
  outperforms building fast ones after April, which the rules do not surface.
- **Chokepoint licence**: one-time, permanent +25% multiplier on your own share
  of your strongest stage; no expiry; triggers a retaliation roll scaled to the
  rival's weighted share. Substitution erodes its value only via stage decay.
- **Stockpile**: −1 token, one shield per supplier, only offered when you hold a
  spare token and have an exposed dependency; shields against scripted shocks
  only when the supplier matches (see issue 7).

Net: the game has exactly one substitution clock (fixed April decay) and two
instant-capacity moves whose timing fiction is acknowledged in their own text.
No change needed to numbers; the timing semantics below make them legible.

## 6. Proposed time-state semantics (scheduled vs decision-pending vs implemented)

Reuse the vocabulary the repo already verified in `data/geneva-research.json`
(`kind`, `precision`, `status`) so integration is one mapping, not a redesign.
Three layers, all player-visible in plain words:

1. **Per-row `kind` (what the date is):** `statutory-deadline` (PLD; EuroHPC
   lots), `announced-event` (Geneva), `announced-target` (Japan review,
   Australia early-2027), `derived-earliest` (Korea grace end),
   `adopted-not-in-force` (Singapore), `standing` (EU AI Act row, null date).
   Add `precision`: day / month / season / none. This is the "scheduled vs
   decision-pending" distinction the task asks for, and it is data-only.
2. **Runtime state per month (computed, not stored):**
   - `upcoming` — window month not yet arrived → shown grey ("opens Jan 2027"),
     no tabling, no law credit, no odds bonus;
   - `open` — month arrived, not past → tabling allowed, law credit, +10;
   - `closed` — month past (deadline kinds) → one "deadline passed" line, no
     tabling, law credit retained only if tabled while open;
   - `standing` (null-date rows) → always open, explicitly "no fixed date";
   - `adopted-not-in-force` → a state of its own ("passed; not yet in force"),
     never tableable, shown as context.
   "Implemented" (law in force) is beyond the game's horizon except as the
   debrief's honest endpoint: the game ends at the summit, so nothing can be
   *verified* implemented inside play — the debrief should say the accord is a
   proposal carried to Geneva, not enacted law.
3. **Calendar certainty:** only `statutory-deadline` and `announced-event` rows
   render a day; `announced-target`/`derived-earliest` render month or season
   with their hedge ("target", "earliest possible"); no invented day-level
   precision anywhere. This satisfies "no fabricated calendar certainty" while
   keeping every pressure point.

## 7. Simple replacements / labels (all preserve the pressure as fiction)

- **Korea** (`windows.json:98-110`): `approx: true`; label → *"Earliest
  possible end of the AI Basic Act fine grace (≥1 year from 22 Jan 2026; may be
  extended; enforcement timing not published)."*
- **Australia** (`windows.json:111-127`): keep `approx: true`; label → *"AI
  Standards legislation targeted for early 2027 (no date published; data-centre
  duties, copyright, and safety/security expectations for large-scale training
  authorisations)."*
- **Japan** (`windows.json:25-38`): keep content and `approx: true`; display
  date `2026-11`; label → *"Working group reviewing the AI Act opens late Oct;
  no bill or timetable yet."*
- **Singapore** (`windows.json:9-24`): `countries: []`, date `2026-11`, label →
  *"Singapore: Digital Infrastructure Act passed 7 Oct; codes drafted over the
  coming year; expected in force 2027"* (renders once, all players) — or drop.
- **EU rows**: keep as-is (dates verified); with issue 1's closure fix, add one
  "📜 EU: Lot 2 tender closed" line for January. Optional: append
  "(Directive (EU) 2024/2853, Art. 22)" to the PLD label.
- **Geneva** (`windows.json:128-142`): keep; optional label addendum —
  *"announced by Switzerland, 14 Aug 2026; participation still open"* — to mark
  "All participants" as the game's fiction.
- **Optional real anchors for window-less actors** (all inside the game's
  months, all repo-verified or blog-cited, kinds included): UK — ICO agentic-AI
  evidence call closes **2026-11-20** (statutory-ish consultation deadline;
  repo `win-eur-uk-ico-input`); Gulf — UAE operators' approved status lapses
  **April 2027** unless renewed (blog ref 13, Federal Register 14 Jul 2026,
  decision-pending); Japan additionally has the Gen-nai FY2027 domestic-model
  call opening **Nov–Dec 2026** (announced target, Digital Agency plan of
  2026-05-29). Adding the UK row alone would give every non-superpower actor
  except TW/GULF/PROD a dated window.

## 8. Source ledger (access and role)

Live primary, fetched in full this pass (observed 2026-11-01): gszep blog
(pub. 12 Oct 2026); BAKOM Geneva summit page (pub. 14 Aug 2026); EuroHPC JU
call page (call pub. 30 Jul 2026; extension notice current); MSIT release
1214 (Jan 2026); Digital Agency press conference (event 6 Oct 2026, page
updated 7 Oct 2026); MDDI closing speech (7 Oct 2026); EC Code-of-Practice
Q&A (page updated 20 Jul 2026); EUR-Lex 2024/2853 (Art. 22(1) read);
EUR-Lex 2026/1755 (title read: Implementing Regulation of 20 Jul 2026 on
detailed arrangements for Commission proceedings under the AI Act).

Repo-verified, not re-fetched this pass (their observation date 2026-10-31;
URLs in the named files): Singapore passage/commencement status
(`singapore-australia.md`: SSO as-enacted 8 Sep 2026; Drew & Napier 15 Oct
2026); Australia PM release 15 Jul 2026 and National AI Plan 2 Dec 2025
(`singapore-australia.md`); Korea Act/decree versions and MSIT 1215
(`japan-korea.md`); Japan AI Act 2025 promulgation/effect dates
(`japan-korea.md`); EuroHPC extension publication date 2026-10-26
(`data/geneva-research.json` `win-eur-eur-euhpc-lot1`).

Not used as evidence: `genevaaisummit.swiss` (repo-verified only), aipolicy-
tracker/airiskaware/Piper Alderman/Digital Watch corroboration locators
(secondary; used only to corroborate repo-verified facts, never a sole basis),
and the blog's chart imagery itself (text and cited references used instead).

**Inaccessible / partial (logged):** EUR-Lex deep links returned empty payloads
on two variants (`/oj`, `legal-content EN/TXT`) before the `/oj/eng` variant
worked — treat EUR-Lex as flaky, not blocked. MSIT board pages do not display
exact posting days (month-level publication dates only). The Australia PM
release was fetched in full by the 31 Oct pass but not re-fetched here;
all facts I cite from it are cross-checked against that pass's verified
ledger. No source needed for this audit was fully inaccessible.

## 9. Unknowns (kept unknown on purpose)

- Whether Korea's grace actually ends 22 Jan 2027 or is extended, and what the
  2026 amendment (Act No. 21311, effective 2026-07-21) changed — unverified
  (repo gap); the game must not resolve this; label as earliest.
- Whether Australia's bill arrives on time or at all; nothing published beyond
  "early 2027".
- Which countries attend the Geneva summit; agenda and outcomes unknown — the
  game's "All participants" stays fiction.
- EuroHPC Lot 1's clarification-question cutoff after the extension ("may not
  reply after 2026-11-25" may be stale) — irrelevant to the game's month scale.
- Singapore commencement gazette — none as of 31 Oct 2026; keep "expected
  2027" hedged.

**Next discriminating question for integration:** with windows that open *and*
close (§4.1) plus the three-state display (§6), does the player still reach the
Geneva finale with a live decision pending in every branch? That is the playtest
to run before adopting the semantics.
