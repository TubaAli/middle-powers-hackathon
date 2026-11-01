# Orbit Accord art (style transfer from Before Geneva)

Painted delegate stills and meeting rooms for Orbit Accord (`orbit.html`), made so
game B looks like Before Geneva (game A). Mechanics and story are unchanged.

- **Source style:** the four Before Geneva scenes in `game/concepts/art/` (Gemini art, see
  `game/concepts/README.md`). Every image here was generated from one of those scenes as an
  image reference, with Canva's AI image generator, on 1 November 2026.
- **Characters:** eight delegates are taken from the Before Geneva scenes (the protagonist in the
  white blazer, the bearded delegate, the Brazil and Kenya delegates, the man with glasses, the
  Swiss chair, the US and China delegates). Two new East Asian delegates (`eam`, `eaw`) were drawn
  in the same style because the scenes had too few. All are fictional.
- **Expressions:** `neutral`, `happy`, `sad` (displeased/worried), `think` (hand to chin), each
  generated from that character's neutral still so the face stays consistent.
- **Rooms:** `room-snow`, `room-rain`, `room-geneva` are the Before Geneva rooms regenerated empty.
- **Processing:** exported at 1088x1456 (rooms 1680x944), background cut out locally, saved as
  WebP. Cast mapping lives in `ART` in `game/meeting.js`.
