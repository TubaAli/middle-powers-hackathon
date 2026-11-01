# Orbit Accord × Before Geneva: style-transfer handoff

Three Gemini-generated background stills handing Before Geneva's (game A)
painted-anime look to Orbit Accord (game B), prepared for Tuba on
1 November 2026. They are handoff reference assets — not live-game files.

**Handoff statement:** Orbit Accord keeps its world map, its delegation
jet, its existing characters and their mechanics. Only the look changes.
These pages hand over reference artwork for that change; they replace no
cast, no gameplay and no style implementation, and nothing here edits the
live game at `../orbit.html`.

## The set

- `01-mira-morning` — the only image with a character. Mira (your chief
  of staff) keeps her exact in-game code appearance — plum-brown bob
  `#3a2f4a`, navy blazer `#2b3a55`, gold blouse `#f2c96b`, blue eyes
  `#3f8fbf` (definition in `../meeting.js`) — so the transfer's fidelity
  to the existing cast can be checked directly.
- `02-bilateral-room` — an empty diplomatic meeting room, **empty by design**.
- `03-delegation-cabin` — the delegation jet cabin, **empty by design**.

Orbit Accord composes meetings at runtime: the room is a plain background
layer and the existing animated portraits are drawn over it
(`../meeting.js`). Because rooms 02 and 03 contain no people, the
existing portraits overlay them unchanged; nothing in the cast needs redrawing.

## Provenance

Generated 2026-11-01 about 06:31–06:32 UTC with the installed
subscription-backed `images` tool (Gemini web app through the existing
Work Ultra subscription), all three in one conversation for style and
character continuity. The private conversation URL is not published.
`prompts.json` records the provider, honest prompt summaries (not the
verbatim prompts) and SHA-256 hashes for every prompt and image. The
reusable tools are documented in `../../tools/image-generation/README.md`.

## Files

- `index.html` — the mobile-friendly gallery: `Download original` links,
  an optional editable overlay example per image, Mira's source palette
  swatches, and links back to the game.
- `prompts.json` — provenance and the hash ledger.
- `art/` — read-only generated originals (2752 × 1536 JPEG). Do not
  edit; verify with `shasum -a 256`.

## View

Serve the repository root and open the gallery:

    python3 -m http.server 8765
    open http://localhost:8765/game/style-transfer/

## Acceptance (checked 2026-11-01)

- All three `art/` SHA-256 hashes match the recorded values, before and
  after this work; `art/` was not modified.
- With the existing isolated Playwright (Chromium 145) against port 8765:
  page loads, all three images decode at 2752 × 1536, three working
  `Download original` links and three `Open full size` links, back-links to
  `../orbit.html` and `../concepts/` resolve (HTTP 200), `prompts.json`
  parses, overlay toggles on and off with `aria-pressed` state, overlay
  caption text is editable, five Mira swatches render, and no JavaScript
  or console errors on desktop (1280 px) or mobile (iPhone 13, 390 ×
  844) with zero horizontal overflow and tap targets ≥ 45 px. Desktop and
  mobile screenshots inspected.

## Links

- Play Orbit Accord: [`../orbit.html`](../orbit.html) · Before Geneva: [`../`](../)
- Before Geneva concept stills: [`../concepts/`](../concepts/)
- Current in-game art: [`../orbit-art/`](../orbit-art/)
- Image tools: [`../../tools/image-generation/README.md`](../../tools/image-generation/README.md)
