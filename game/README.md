# Before Geneva

A playable, research-informed diplomatic visual novel. Lead a small negotiating
team from November 2026 to the Geneva session on 21 June 2027. The four original
Gemini scene illustrations now sit behind live HTML dialogue, choices and UI.

**Play:** https://tubaali.github.io/middle-powers-hackathon/game/

The original Orbit Accord prototype is at `orbit.html` (`game.js`, `game.css`,
`planets.json`). You fly your delegation's jet across a real world map
(`world.json`: Natural Earth 1:110m, public domain) and meet the 11 country
groups (you play a middle power; the US and China are rivals, not playable),
each shown by its flags (`flags/`, flag-icons, MIT). It opens with a breaking-news scene: your chief of staff, Mira, calls you to act,
then you pick your country and one goal (`opening.js`). It works on phones:
tap to fly, then tap Meet or End month. Meetings use fictional anime-style diplomats, one per country, and the
answer always comes by official letter (`meeting.js`, `meeting.css`). The concept
gallery remains at `concepts/`.

## Story and rewards (Narrative Engine, Deep mode)

The player text was reframed with the Narrative Engine Deep workflow
(https://github.com/nraford7/Narrative-Engine), approved with Tuba on 1 Nov 2026:

- Main point: middle powers already hold real levers over AI (buying power,
  computers, investment, rules). Together, they're hard to ignore.
- Audience: hackathon judges and team (AI-safety experts and policy generalists).
- Shape: answer first, thriller tone, at most about 12 words per screen line.
- Every route has a lever tag and a one-line summary traceable to its research.
  A blind main-point judge and an evidence reviewer checked the text; their
  fixes are applied.
- Rewards are a display layer derived from engine state: a lever card per deal,
  gold cards for passed retests, a combo when two countries share a lever (a game
  bonus, not a research claim), and a Geneva lever board. Rules and tests are unchanged.

## Play loop

- Each month, choose what the team needs: Money, Proof or Support.
- Choose among 32 policy conversations. Highlights include Japan, India, Brazil,
  national LUMI channels, Singapore, Kenya, Switzerland and Taiwan. Search or select
  **Show all 32** for the full sample.
- Ask about the problem, optionally prepare research notes, then start a small
  test, work on a shared plan, or save the idea for later.
- Return in a later month to see what went wrong. Fix the problem and test again,
  or pause the work. Shared plans also need another finished test.
- Each result card states what changed, its cost and the next step. At month end,
  review finished tests, work started, resource changes and teams to revisit.
- Three meeting decisions are available per month. Reading, asking questions and
  leaving conversations are free. Research notes use Proof and lower the later
  test cost. A new project cannot start in June because its results would arrive late.
- In June, ask for a shared testing plan, a smaller programme, or publish what the
  team learned without a joint project. The outcome depends on the work completed.

## Educational rewrite

The 1 November revision uses the approved [plain-language brief](narrative-rewrite.md)
and Narrative Engine's reader-first writing and source-fidelity reviews. All 32
routes have a concrete setup, explained alternatives, a learning note and an
optional two-answer comprehension check. Questions do not grant game points.
The research panel keeps the technical evidence available for deeper reading.

Tuba's concurrent plain-language rewrite in `e784e4f` supplies the primary
dialogue, titles, summaries, month text and existing UI copy. This pass keeps
`dialogue-authored.json` intact and adds explanations in `learning-notes.json`.

The internal save keys `evidence` and `mandate` still mean the same resources; only
their visible names are Proof and Support. Existing saves remain usable.
Old journal entries retain their original text; monthly resource totals are shown
only when the save contains enough information to calculate them.

This is an educational design, not evidence of measured learning outcomes. A next
user test should ask players to explain the difference between starting and
finishing a test, and identify one useful follow-up without opening this guide.

There is no timer or random acceptance roll. Click/tap choices or use **1–3**;
Tab/Enter also work. Escape closes dossiers. Progress saves to this browser/device
when local storage is available. The title button pauses to the opening screen;
Continue resumes the same node. A new campaign requires confirmation before
replacing an existing save. Dossiers and the journal are readable during dialogue.

An explicit `?route=indiaai-subsidy-evaluation-gate` link puts that conversation
first in the lounge. Every route on the model plot now links to its game entry.

## Fiction and evidence

All dialogue, scenarios, approvals, failures, resources and endings are authored
fiction. These are not government statements or forecasts. The same ensemble
art depicts recurring rooms and delegates, not a unique portrait for every route.
The actual research remains in each dossier, with reading status, limitations,
source locators and links to the original figure and stress tests. The current
campaign uses the 31 October 2026 research snapshot, not a new legal-currentness review.

`dialogue-authored.json` supplies distinctive opening, negotiating question,
objection, fictional test complication and proposal labels for each policy.
`scripts/build-before-geneva.py` joins these to `data/stress-tests.json`, checks
complete route coverage and writes `campaign.json` (32 trees, 224 nodes). Its
input hashes identify exactly which research and writing generated the game.
`story-engine.mjs` holds deterministic resource, time, follow-up and ending rules;
`before-geneva.js` renders the interface. Display and state transitions are separate.

## Build and check

```sh
python3 scripts/build-before-geneva.py
node --test game/story-engine.test.mjs
```

Use the existing Playwright Python environment for the browser acceptance script
`scripts/check-before-geneva-browser.py`. It launches installed Chrome headlessly
in an isolated test profile, not the user's signed-in browser. Supply `--url`
to test a served local or public copy. Do not deliver a localhost URL as a preview;
use the published site or a verified Tailscale Serve route.

The unit checks cover source hashes, all 32 paths, resource constraints, no repeat
rewards, shared-route prerequisites, save validation and distinct Geneva endings.
