# Before Geneva: visual concepts

Four fictional diplomatic scenes, generated in Gemini on 31 October 2026 using
the existing signed-in subscription. Open `index.html` through a local server
or use the published gallery. These are concept stills, not playable screens.

- `art/`: full-resolution generated JPEG originals.
- `prompts.json`: art direction and prompts; follow-ups used the same conversation
  for character and style continuity. Private conversation URLs are not published.
- `scenes.js`: separate editable SVG interface, dialogue and choices.
- `frame.html?scene=0` through `3`: composed scene previews.
- `stills/`: exported 1600 × 900 PNG screens.

The monthly progression moves from November approaches to February negotiation,
an April evidence dispute and the June Geneva session. Delegates are fictional
adults; the scenes portray professional relationships and no romance.

## Reproduce the interface exports

Serve the repository on port 8765, then run `scripts/export-game-concepts.py`
with the existing Playwright-enabled Python and authorised local CDP browser.
The script renders existing artwork; it does not request new generations.
See `../../tools/image-generation/README.md` for the reusable generation tools.

## Acceptance

All four original artworks and composed screens were visually inspected.
The local gallery passed all linked downloads and frame links, both artwork/UI
toggles, image decoding, desktop (1440px) and mobile (390px) overflow checks,
with no JavaScript page errors. The installed `images.generate` tool generated
and downloaded the fourth original; `images.status` confirmed connectivity.
