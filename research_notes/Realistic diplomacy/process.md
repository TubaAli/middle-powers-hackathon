# Negotiation process, memory and delivery

Research note for the Orbit Accord (Game B) diplomacy pass. Owner: this file only
(`process.md`, plus optional `process.json`). No implementation, dialogue or shared
summary was edited.

- Research cutoff: **1 November 2026**. All web pages were read on **1 November 2026**
  (observation date). Publication and event dates are recorded separately in the ledger.
- Game baseline inspected: `game/game.js`, `game/planets.json`, `game/opening.js`,
  `game/meeting.js`, `data/conditions.json`, `data/windows.json`, `data/layers.json`.
- Scope: the *process* of getting a government from "we met" to "it is done, and here is
  what it cost". Not the country dossiers, not the safety case for any condition.

This note proposes a small, transparent state machine that replaces the single random
acceptance roll. It is a design proposal constrained by historical precedent, not a
prediction of what any real government would do.

---

## 1. What the game does now, and why it reads as unrealistic

Current mechanics, with line references in `game/game.js`:

| Mechanic | Code | What it implies |
|---|---|---|
| One acceptance number | `odds()` L84–96 | Starts at 40 (10 for a superpower) and adds fixed points: needed token +15, other token +5, promise +15, your supply share ÷2, open law window +10, summit tour +10, domestic rally +5, US −10, CN −15. Clamped to 3–92. |
| One random draw | `rollDeal()` L106–111 | `Math.random() * 100 < pct`. Success = token spent, country appended to `g.coalition`. Failure = nothing recorded except "asked". |
| Three canned offers | `deals()` L97–105 | Token, promise, or "just ask". No scope, no conditions, no counterparty wording. |
| A promise with no afterlife | `promiseStage()` L80–83 | A promise is only a label attached to a stage where you hold ≥25% and they hold <10%. It is never stored, never delivered, never checked. |
| Instant, binary membership | `g.coalition` | A country either is or is not in the accord. It joins for all six conditions at once, in the month it says yes. |
| Monthly amnesia | `g.asked` reset in `openCouncil()` L182 | A refusal is forgotten at the month boundary. No reason, no condition, no consequence. |
| Scripted shocks | `monthEvents()` L157–178 | China squeezes at turn 1 and the US leans on an ally at turn 3 regardless of what the player did, except for coalition membership and stockpiles. |
| Score from shares | `goalProgress()` L57–68, `finish()` L263–281 | Outcomes are shares and law vehicles. Nothing measures whether a partner actually did what it promised. |

The player therefore learns: *persuasion is a dice roll, a signature is membership, and
a promise is free.* Real negotiation is closer to: *a named official can sign only
within their authority, the commitment is narrower than the headline, the money or
market access arrives in stages, and the counterparty remembers whether you delivered
last time.*

Two specific problems worth naming:

1. **The number hides the reason.** Two countries with the same 55% can be in completely
   different positions — one needs its legislature, one needs a ministry circular, one
   is waiting for a budget line. The player cannot tell which lever matters.
2. **No record, so no learning.** Because nothing is stored, the game cannot show the
   thing that matters most in repeated diplomacy: that a partner's willingness next
   month depends on whether the last commitment arrived.

---

## 2. Design rule: four questions on one screen

The integration test in the brief is the specification. For every meeting the player
must be able to answer:

1. **What do they want?** (interest, stated in their words, tied to a visible fact)
2. **Who decides?** (minister, regulator, legislature, collective body)
3. **What does my offer actually commit?** (which conditions, for how long, delivered when)
4. **What happens next?** (signature today, approval by a date, or a named blocker)

If a screen cannot answer all four, the state is under-specified. That is a cheaper
test than any probability calibration, and it is checkable.

---

## 3. The proposed state machine (small)

Keep one record per **(partner, condition)** pair, not one per partner. Six states, one
clock, one record. `process.json` carries the same model for implementers.

```
unknown ──meet──> talked ──offer──> decided
                                     ├─ signs ────────> in_force ──> delivering ──> verified
                                     ├─ refers ──(1–2 months)──> in_force | lapsed
                                     ├─ conditions ──(named fix)──> decided
                                     └─ declines ──(named reason + reopen trigger)
```

### 3.1 Fields per (partner, condition)

| Field | Values | Visible to player? |
|---|---|---|
| `interest` | high / medium / low / opposed | Yes, as one sentence and one fact |
| `authority` | minister / regulator / legislature / collective | Yes, on the meeting card |
| `scope` | which conditions this partner would join | Yes, before the offer |
| `record` | kept / late / broken counts, this condition only | Yes, as "last time…" |
| `state` | the six states above | Yes |
| `next_date` | the month an answer or delivery is due | Yes |
| `reason` | short text for decline or referral | Yes |

### 3.2 Decision as a threshold on visible inputs, not a die

Replace `odds()` with a deterministic sum (numbers are invented game weights, to be
tuned; they are *not* measured probabilities):

```
score = interest_match      (+2 if the offer answers their stated need, else 0)
      + reciprocity         (+1 if a benefit is released only after a verified stage)
      + reliability         (+1 kept ≥2, −1 broken ≥1, −2 broken ≥2, this condition)
      + timing              (+1 if their window is open now, −1 if it is closed
                             and authority is legislative)
      − scope_cost          (−1 if the ask covers more than two conditions,
                             −2 if it crosses a stated red line)
```

| Score | Outcome class | Player sees |
|---|---|---|
| ≥ 3 | Signs today | "They can sign this within their own authority." |
| 1–2 | Refers or sets conditions | "Their parliament must approve it; answer by March." / "They will sign if the benefit is released in stages." |
| 0 | Declines, fixable | "Not while the ask covers testing too. Bring the incident rule alone." |
| < 0 | Declines | "Their ministry says no this year." + reason |

No percentage anywhere. If a coarse band is wanted for flavour, derive it from the same
score (`likely / unclear / unlikely`) and show the reason next to it. Two partners at the
same band must still be distinguishable by *who decides* and *what is missing*.

### 3.3 Approval clock

- `authority = minister` → immediate, same month.
- `authority = regulator` → 1 month, succeeds unless the window closed or reliability fell.
- `authority = legislature` → 1–2 months, and only if a law window for that condition is
  open at the decision date. This gives `data/windows.json` a real job: windows transfer
  *authority to act*, they do not grant consent.
- `authority = collective` (EU-style, or a joint Gulf/Australia-Canada decision) → 2 months
  and a second named approver, so grouped countries stop behaving as single actors.

### 3.4 Delivery and verification

Each signed condition gets 2–3 named stages (for example: *bill tabled → regulator
issues guidance → first reports received*). Each stage:

- costs the player one action or one token, paid in the month it is due;
- resolves at the next month boundary;
- produces `verified` (on time), `late` (one month), or `lapsed` (missed).

A signature with no delivery is visible as `in_force, 0/3 stages`. This is the single most
useful honesty device in the whole design: the accord can be wide and shallow, and the
screen says so.

### 3.5 Memory and safeguards

`record` changes the *shape* of the next deal, not a hidden multiplier:

| Record on this condition | Next ask |
|---|---|
| 0 broken, ≥2 kept | Normal terms; partner may offer to co-sponsor |
| 1 broken or ≥2 late | Partner requires an independent check before signing (+1 cost) |
| 2 broken | Partner requires phased release: your benefit only after their first delivery |
| 3+ broken | Partner declines this condition for the campaign; other conditions unaffected |

That is the "specific past behaviour → safeguard" link. It is issue-specific: a partner
that caught you overstating a testing promise can still sign the incident-alarm rule
tomorrow.

### 3.6 Exit and re-entry

Partners may pause a condition (1 month notice) or leave it (2 months), and the screen
states the reason. Leaving is not a betrayal flag; it costs `record.broken` on that
condition and forfeits the benefit. Re-entry is possible after one delivery cycle. This
mirrors the withdrawal clauses in the precedents below and stops the game treating
membership as permanent.

---

## 4. Candidate rules

Each rule is written so an implementer can build it and a reviewer can refute it.
"Authority/instrument" means what real-world mechanism the fiction is standing in for.

### R1 — Two-step consent: a meeting produces a decision, not a membership

- **Actor:** the partner government, represented by its envoy.
- **Objective:** keep the visible promise inside what the official can actually bind.
- **Authority/instrument:** ministerial signature, referral to cabinet/legislature, or a
  regulator's own procedure. Standing in for treaty ratification and domestic implementing law.
- **Trigger:** player makes an offer in a meeting.
- **Conditions:** outcome class from §3.2; `referred` requires a named approver and a date.
- **Time cost:** 0–2 months.
- **Plausible response:** "I can sign the incident rule today; testing needs my minister."
- **Substitute:** a lower-scope offer that fits the envoy's authority.
- **Evidence:** Paris Agreement — signature, ratification and entry into force are separate
  acts; entry into force required 55 parties covering 55% of emissions and took effect
  4 November 2016 (S1). AI Act — entered into force 1 August 2024 but applied from
  2 August 2026 with staged exceptions (S4).
- **Evidence limit:** neither instrument is an AI-safety accord among middle powers; both
  show the *sequence*, not the likelihood that any given government refers an AI commitment.

### R2 — Scope-limited participation: partners join conditions, not the accord

- **Actor:** each partner.
- **Objective:** avoid signing a package that contains one unacceptable element.
- **Authority/instrument:** a schedule of commitments (like a WTO goods schedule) rather
  than a single yes/no.
- **Trigger:** player invites a partner.
- **Conditions:** partner selects a subset of the six conditions; the accord's strength for
  each condition is computed only from members that joined *that* condition.
- **Time cost:** none extra; it makes the first yes cheaper and the accord narrower.
- **Plausible response:** "We will join the alarm and the off-switch. Not chip tracking."
- **Substitute:** full package, which the partner may refuse.
- **Evidence:** Kimberley Process — trade is permitted only between certified participants,
  and the scheme covers rough diamonds only (S7). China's WTO accession rested on a
  negotiated goods schedule and specific commitments, not blanket acceptance (S9).
- **Evidence limit:** both are trade instruments; breadth of an AI accord's scope is a
  design choice, not something the sources dictate.

### R3 — Approval clock: the answer comes from an institution, not the envoy

- **Actor:** legislature, regulator or collective body.
- **Objective:** make domestic authority the binding constraint it usually is.
- **Authority/instrument:** legislative window, regulator's rulemaking, or joint decision.
- **Trigger:** partner state becomes `referred`.
- **Conditions:** decision at `next_date`; fails if the window closed or reliability fell.
- **Time cost:** 1–2 months of campaign time.
- **Plausible response:** "My government will deliberate. Its answer comes by official
  letter." (Already the game's best line — `game.js` L241.)
- **Substitute:** ask a partner whose authority is ministerial, or narrow the ask.
- **Evidence:** EITI — a member can be suspended by a board decision for failing corrective
  actions, which is an institutional act distinct from any minister's statement (S5, S6).
  AI Act — application dates set by the legislator, then changed by a later legislative
  proposal ("AI Omnibus") (S4).
- **Evidence limit:** the sources show that approval bodies exist and change timelines;
  they do not show how a middle-power cabinet would treat a fictional AI accord.

### R4 — Phased delivery with verification gates

- **Actor:** both sides.
- **Objective:** tie each benefit to an observed step rather than to a promise.
- **Authority/instrument:** staged annex with dates and a verifying body.
- **Trigger:** signature.
- **Conditions:** 2–3 stages; benefit releases only after the matching stage is verified.
- **Time cost:** one month per stage, minimum.
- **Plausible response:** "Sanctions relief only after the IAEA confirms the steps."
- **Substitute:** upfront release, which the partner will usually refuse after any breach.
- **Evidence:** UN Security Council resolution 2231 — Implementation Day (16 January 2016)
  came only when the Council received an IAEA report confirming the Annex V steps; the
  terminated sanctions were "subject to re-imposition in the event of significant
  non-performance" (S3). Seoul commitments — organisations undertook to publish a safety
  framework "by the upcoming AI Summit in France", i.e. a dated deliverable (S10).
- **Evidence limit:** JCPOA is a hard-security case with a dedicated inspectorate; an AI
  accord has no equivalent body, so the "verifier" in the game has to be invented and
  should be named as fictional.

### R5 — Reciprocity ledger: benefits are released, not gifted

- **Actor:** the player's government and each partner.
- **Objective:** make the exchange legible and reversible without drama.
- **Authority/instrument:** a ledger with one line per commitment and one per benefit.
- **Trigger:** any offer that includes a token or market access.
- **Conditions:** benefit marked `held`, `released`, `withheld`, each with a date.
- **Time cost:** none; it is bookkeeping the player can read.
- **Plausible response:** "The payment is approved but not disbursed until the report arrives."
- **Substitute:** unconditional gift, which raises the partner's expectation of more gifts.
- **Evidence:** EITI — suspension is a board action for missed reporting or inadequate
  progress and is described as temporary; membership is the benefit (S5, S6). WTO — all members are
  reviewed under the Trade Policy Review Mechanism, with frequency by trade share (S9).
- **Evidence limit:** "benefit" in the game is a token, not money; the precedents show the
  *linkage* between reporting and standing, not any specific sanction.

### R6 — Issue-specific reliability record

- **Actor:** each partner, about the player.
- **Objective:** let past behaviour change future terms in a way the player can see.
- **Authority/instrument:** a per-condition record maintained by the accord (in fiction,
  a secretariat; in the game, a field).
- **Trigger:** every verified, late or missed stage.
- **Conditions:** counts are per condition and are shown before an offer is made.
- **Time cost:** none.
- **Plausible response:** "Last time your report arrived two months late. We want a
  monitor this time."
- **Substitute:** a new partner with no record; a narrower ask.
- **Evidence:** EITI Azerbaijan — suspended 9 March 2017 for not meeting corrective actions
  on civil society space; the government withdrew the next day (S5). Kimberley Process —
  a seriously non-compliant participant can have imports and exports suspended; the
  Republic of Congo was removed in July 2004 (S7).
- **Evidence limit:** both are membership organisations with a board; the game's "record"
  is a simplification and must not be presented as a real trust score.

### R7 — Record triggers safeguards, not just refusal

- **Actor:** the partner demanding the safeguard.
- **Objective:** continue cooperating while managing the risk it has observed.
- **Authority/instrument:** third-party check, escrow/staged release, or a named monitor.
- **Trigger:** `record.broken ≥ 1` on that condition.
- **Conditions:** the safeguard is added to the deal card as a cost, not hidden in a roll.
- **Time cost:** +1 month or +1 token.
- **Plausible response:** "We will join, but the benefit stays in escrow until the first
  inspection."
- **Substitute:** decline, or accept a lower-scope commitment with no benefit.
- **Evidence:** JCPOA — after non-performance the Council re-applied all six resolutions
  effective 27 September 2025, i.e. the response was a restoration of safeguards, not a
  rhetorical condemnation (S3). CWC — challenge inspection is "any time, anywhere" with no
  right of refusal, the institutionalised version of "we do not take your word for it" (S8).
- **Evidence limit:** snapback is a unique, heavily contested mechanism; it overstates how
  quickly an AI accord could re-impose anything.

### R8 (optional) — Windows create authority, not consent

- **Actor:** the player's own government and the partner's legislature.
- **Objective:** make the calendar matter without making it magic.
- **Authority/instrument:** a bill, a tender deadline, a regulator's consultation.
- **Trigger:** `data/windows.json` date reached for that country and condition.
- **Conditions:** an open window converts `referred` into a decision this month; a missed
  window pushes the next opportunity back (in the fiction, 6–12 months).
- **Time cost:** the campaign month.
- **Plausible response:** "The bill is tabled; after that we wait for the next session."
- **Substitute:** executive action where authority allows it.
- **Evidence:** AI Act application dates and their later extension (S4); Paris entry into
  force threshold date (S1).
- **Evidence limit:** `windows.json` dates are research inputs owned by other notes; this
  rule assumes they are correct and does not verify them.

---

## 5. Player-facing wording (short strings)

Use these instead of percentages. Each names the state, the actor and the next step.

| State | Line on the card |
|---|---|
| Signs | "Can sign today. Their minister has the authority." |
| Refers | "Signed, not yet in force. Their parliament votes by {month}." |
| Conditions | "Will sign if {named fix}. Nothing else needs to change." |
| Declines (fixable) | "No while the ask includes {condition}. Bring {narrower ask} alone." |
| Declines | "No this year: {reason}. Revisit after {event}." |
| Pending delivery | "In force, delivering: {k} of {n} stages done. Next: {stage}, {month}." |
| Late | "Late. {Partner} has not received the {stage}. Reliability on {condition} down." |
| Safeguard | "{Partner} asks for {check/escrow} because of {past event}." |
| Exit | "{Partner} paused {condition} for one month. Reason: {reason}." |

And in the accord view, never a single total: show **conditions × members**, with the
members that actually joined each one. "Seven countries" is not a fact about safety.

---

## 6. What the precedents show, and what they do not

### 6.1 Eleven sources, with what each is used for

Full URLs, dates and locators are in §8. Summary of the evidential role:

| # | Source | Used for | Does **not** show |
|---|---|---|---|
| S1 | UNFCCC, Paris Agreement status | signature→ratification→entry into force sequence; 194 of 198 parties | that parties comply |
| S2 | Paris Agreement text (EUR-Lex) | NDCs are self-determined and reviewed; withdrawal clause | any enforcement mechanism |
| S3 | UN Security Council, resolution 2231 | staged relief gated on IAEA verification; re-imposition after non-performance; snapback 27 Sep 2025 | that AI has an equivalent inspectorate |
| S4 | European Commission, AI Act timeline | entry into force ≠ application; staged dates; deadlines later extended | middle-power behaviour |
| S5 | EITI, Azerbaijan country record | concrete suspension → withdrawal sequence | that suspension is common |
| S6 | EITI, suspension and delisting rules | institutional (board) decision, corrective-action logic | any AI application |
| S7 | Kimberley Process, what is the KP | scope-limited certification; trade only between compliant members; suspensions | enforcement capacity |
| S8 | OPCW, Chemical Weapons Convention | challenge inspection, declarations, national implementation | political willingness to use it |
| S9 | WTO, China accession and TPR | negotiated schedules; phased terms; universal peer review | safety content |
| S10 | GOV.UK, Seoul Frontier AI Safety Commitments | voluntary, organisation-level, dated deliverable | state obligation |
| S11 | GOV.UK, Bletchley Declaration | political declaration language, no operative commitments | that declarations are worthless (they can coordinate) |

### 6.2 The strongest single lesson

The JCPOA record is the cleanest example of the whole chain the game is missing:
adoption (18 October 2015) → implementation gated on a verification report
(16 January 2016) → relief "subject to re-imposition" → re-imposition actually used,
effective 27 September 2025. It shows both that conditionality can be designed and that
it can be reversed by politics, which is exactly the tension a diplomacy game should let
the player feel.

### 6.3 Contradictory evidence to keep visible

1. **Voluntary is the norm in AI.** Bletchley and Seoul produced declarations and
   voluntary commitments, not obligations. A game that makes every commitment binding
   would mislead. Hence R1's "referred" state should sometimes end in a *political*
   commitment with no legal force, labelled as such.
2. **Participation is not compliance.** 194 of 198 parties joined Paris; that says
   nothing about delivery. Do not score membership as impact (S1, S2).
3. **Enforcement bodies are reluctant.** EITI and KP can suspend, but do so rarely and
   often after long corrective-action cycles. Frequent snapback would be unrealistic (S5–S7).
4. **Deadlines slip.** The AI Act's high-risk deadlines moved to 2 December 2027 and
   2 August 2028 through the "AI Omnibus" (S4). Windows should be soft, not fatal.
5. **Reversal is possible and is a procedure, not a mood.** The relief under resolution
   2231 was designed to be re-imposed on significant non-performance, and that is what
   happened in September 2025 (S3). A simple "ally/enemy" switch captures none of this.

---

## 7. Limitations

- **Analogue, not measurement.** Every precedent is from trade, arms control, climate or
  extractives. None is an AI-safety accord among middle powers. The rules transfer the
  *process shape*, not any probability.
- **Compressed time.** Real ratification runs months to years; the campaign is eight
  months. R1/R3 compress approval to 1–2 months and must say so in the interface.
- **Grouped actors are not single actors.** `planets.json` groups the Gulf states and
  Australia+Canada. `authority = collective` is a placeholder for a real joint decision
  that the country dossiers should specify.
- **No verification institution exists for AI.** R4's verifier is fictional. Name it as
  fictional in the UI; do not borrow IAEA's authority by implication.
- **Sources not used because retrieval failed** (all attempted 1 November 2026):
  FATF (HTTP 403), Council of Europe treaty office for CETS 225 (403), IAEA topic pages
  (403), UN document PDFs (binary not readable by the fetch tool), `un.org` General
  Assembly resolution search (403). No claim in this note depends on them.
- **Not verified here:** the dates in `data/windows.json`. They are treated as inputs.
- **No claim about real governments' intentions.** The state machine assigns interests
  and authority for game purposes; the country dossiers own the evidence for those.

---

## 8. Source ledger

Observation date for every entry: **2026-11-01**. "Read" means the page text was
retrieved and the quoted passage located; "partial" means only part of the page was
usable.

| # | Source | Publisher / type | Publication date | Event date | Access | Locator for the claim used |
|---|---|---|---|---|---|---|
| S1 | *Paris Agreement — Status of Ratification*, https://unfccc.int/process/the-paris-agreement/status-of-ratification | UNFCCC, official | undated page | EIF 4 Nov 2016 | Read | "194 Parties out of 198 Parties…"; "On 5 October 2016, the threshold… was achieved"; "entered into force on 4 November 2016, thirty days after…" |
| S2 | *Paris Agreement*, OJ L 282, 19.10.2016 (CELEX 22016A1019(01)), https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:22016A1019(01) | EU Official Journal, treaty text | 2016-10-19 | adopted 2015-12-12 | Read | Art. 4(2) "shall prepare, communicate and maintain successive nationally determined contributions… with the aim of achieving"; Art. 13(1) transparency framework "to build mutual trust and confidence"; Art. 28(1)–(2) withdrawal after three years, effective one year after notice |
| S3 | *Resolution 2231 (2015) on Iran Nuclear Issue*, https://www.un.org/securitycouncil/content/2231/background | UN Security Council, official | undated page, current to 2025 | Adoption Day 2015-10-18; Implementation Day 2016-01-16; re-imposition 2025-09-27 | Read | "Adoption Day occurred on 18 October 2015"; "Implementation Day occurred on 16 January 2016 when the Security Council received the report from the IAEA confirming… paragraphs 15.1-15.11 of JCPOA Annex V"; sanctions "terminated subject to re-imposition in the event of significant non-performance"; update: "effective on 27 September 2025… all provisions of resolutions 1696… 1929… have been re-applied" |
| S4 | *Regulatory framework for AI — AI Act*, https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai | European Commission, official | undated page, current to 2026 | EIF 2024-08-01; application 2026-08-02; Annex III 2027-12-02; Annex I 2028-08-02 | Read | "The AI Act entered into force on 1 August 2024 and became applicable on 2 August 2026, with some exceptions"; prohibited practices from 2 February 2025; GPAI obligations from 2 August 2025; high-risk deadlines extended "as a result of the political agreement on… 'AI Omnibus'" |
| S5 | *Azerbaijan — country page*, https://eiti.org/countries/azerbaijan | EITI, official | undated page | Board decision 2017-03-09; withdrawal 2017-03-10 | Read | "Joined 27 September 2007 / Left 10 March 2017"; "On 9 March 2017, the EITI Board decided that Azerbaijan did not meet the corrective actions… The country was therefore suspended"; "On March 10 2017, the Government of Azerbaijan decided to withdraw" |
| S6 | *Countries — suspension and delisting*, https://eiti.org/countries | EITI, official | undated page | — | Read (policy text) | "Implementing countries may be temporarily suspended… if they fail to meet reporting deadlines; if they make inadequate progress…; or if they fail to meet… stakeholder engagement"; "enhanced scrutiny as preliminary step before considering suspension"; delisting revokes status |
| S7 | *What is the Kimberley Process?*, https://www.kimberleyprocess.com/about/what-is-kp | Kimberley Process, official | undated page | KPCS launched 2003; DRC removed 2004-07-09 | Read | "Trade is permitted only between certified KP members who comply fully"; "For a serious non-compliant Participant, the Plenary may decide to suspend its import and export"; "The Republic of the Congo was removed… on 9 July 2004 following… significant non-compliance" |
| S8 | *Chemical Weapons Convention*, https://www.opcw.org/chemical-weapons-convention | OPCW, official | undated page | not stated on retrieved page | Read | "any State Party in doubt about another State Party's compliance can request a surprise inspection"; "'any time, anywhere' inspections with no right of refusal"; Article VII "National Implementation Measures" |
| S9 | *China — accession*, https://www.wto.org/english/thewto_e/acc_e/a1_chine_e.htm ; *China — member information*, https://www.wto.org/english/thewto_e/countries_e/china_e.htm ; *Trade Policy Reviews*, https://www.wto.org/english/tratop_e/tpr_e/tpr_e.htm | WTO, official | undated pages | Protocol WT/L/432, 2001-11-10; membership 2001-12-11 | Read | "Protocol of Accession 10/11/2001 WT/L/432"; "Notification of Acceptance and Entry Into Force… 11/11/2001 WT/LET/408"; "Date of Membership 11/12/2001 143rd Member"; accession requires that "all WTO members agree on the terms"; "All WTO members are reviewed, the frequency… varying according to… share of world trade" |
| S10 | *Frontier AI Safety Commitments, AI Seoul Summit 2024*, https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024 | UK DSIT, official | published 2024-05-21, updated 2025-02-07 | Seoul summit 2024-05-21/22 | Read | organisations "undertake to… in accordance with the following voluntary commitments"; "publishing a safety framework focused on severe risks by the upcoming AI Summit in France"; signatories are companies (Amazon, Anthropic, Google, Meta, Microsoft, OpenAI, …) |
| S11 | *The Bletchley Declaration*, https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/the-bletchley-declaration-by-countries-attending-the-ai-safety-summit-1-2-november-2023 | UK DSIT, official | page updated 2025-02-13 | summit 2023-11-01/02 | Read (partial: long page) | text is framed as "we affirm", "we recognise", "we welcome"; no reporting, verification or enforcement clause located in the retrieved text |

### 8.1 Unread or inaccessible material (recorded, not relied on)

- FATF black/grey list and jurisdiction statements — HTTP 403 on 2026-11-01.
- Council of Europe treaty office, CETS 225 (Framework Convention on AI) — HTTP 403.
- IAEA safeguards and verification pages — HTTP 403.
- UN document PDFs (S/RES/2231(2015)) — binary PDF not readable by the available fetch tool;
  the UN Security Council HTML background page (S3) was used instead.
- UN General Assembly resolution A/RES/78/265 — search endpoint returned 403.

---

## 9. Measurable acceptance checks

These are testable against the built game, not against this note.

1. **Four questions test.** For each of the 11 partners, a screenshot of the meeting card
   contains: an interest sentence, an authority label, the scope of the offer, and a
   dated next step. Pass = 11/11.
2. **No fake precision.** A text search of the meeting and letter screens returns no
   `%` sign attached to an acceptance chance. Pass = zero matches.
3. **Deterministic consent.** Changing one visible input (open the window, add the needed
   token, narrow the scope) changes the outcome class in the predicted direction, in a
   scripted replay. Pass = 8/8 scripted cases.
4. **Scope is real.** A partner that joins two conditions appears in the accord view for
   those two only, and the other four conditions' strength is unchanged. Pass = visual +
   data assertion.
5. **Delivery is visible.** After any signature, the accord view shows `k/n` stages and a
   date. Pass = every signed condition has both.
6. **Memory is visible.** A scripted campaign that misses one delivery produces, on the
   next ask for that condition, a safeguard line naming the missed delivery. Pass = 1/1,
   and no safeguard appears on an unrelated condition.
7. **Exit works.** Pausing a condition removes its contribution, shows a reason, and can
   be reversed after one cycle. Pass = 1/1.
8. **Comprehension.** Five cold players, after one meeting, can say who decides and what
   happens next without being told. Pass = 4/5.

Checks 1–7 are automatable; check 8 is a small user test and should be reported as such,
not as measured learning.

---

## 10. Smallest implementation slice

If only one thing is built, build this, in this order:

1. Split `g.coalition` into `members[partner][condition]` and show it.
2. Replace `odds()` with the four outcome classes and the reason string.
3. Add `referred` + `next_date` so at least the legislature case exists.
4. Add `record[partner][condition]` and one safeguard line.
5. Leave tokens, travel, windows and shocks alone; they already work.

That is roughly one data field, one function and three UI strings — much smaller than
the current `odds()` arithmetic, and it produces the four answers the integration test
asks for.
