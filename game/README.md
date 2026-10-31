# Orbit Accord (game prototype)

A negotiation game built on the Leverage Map data. Countries are planets, and each sovereign stands for its government. This is a work-in-progress branch (`orbit-accord`); `main` and the live site are unchanged.

**Play locally:** run `python3 -m http.server` from the repository root, then open http://localhost:8000/game/

**How it plays:**
- **Setup:** pick a planet, 1–3 goals (the six safety conditions) and an age, which sets the physical ↔ software mix.
- **Your card shows:**
  - how much of the world's AI depends on you (your weighted supply-chain share);
  - your AI powers, and what you depend on;
  - your other powers (food, medicine, energy, minerals, capital, market access).
- **Turns:** eight months, Nov 2026 to Jun 2027, with one envoy per month.
  - Select a planet, offer tokens it needs and/or a supply promise, and see the acceptance chance with every term explained.
  - Superpowers are much harder to persuade.
- **Events:**
  - Magnor (China) squeezes refined metals (Dec).
  - Titanis (US) pressures an ally (Feb).
  - Short-lived chokepoints fade from April.
- **Goals:** each goal needs the accord's best relevant stage to reach 50%, and a member with a law window before July. Without that window, progress is capped at 75%.
- **Debrief:** for each goal, the risk addressed, the assumed causal route, whose consent is needed, and the evidence gap. Then what the game does not prove.

**Data:**
- AI shares and weights come from `../data/layers.json`, gszep's model, unchanged. The conditions and law windows also come from `../data/`.
- `planets.json` holds the fantasy names, the goals, and the **illustrative** non-AI power tokens. Those tokens are not measured data.
