# Orbit Accord (game prototype)

A real-time negotiation game built on the Leverage Map data. Countries are planets, and each sovereign stands for its government. This is a work-in-progress branch (`orbit-accord`); `main` and the live site are unchanged.

**Play:** run `python3 -m http.server` from the repository root, then open http://localhost:8000/game/. It fits one laptop screen (checked at 1280×720 and 1366×768).

**Controls:** arrow keys or WASD to fly; Space to talk to a nearby planet; 1–4 to choose; N to end the month; Esc to leave. Clicking the map also steers.

**How it plays:**
1. **Setup:** pick a planet (the % shows how much of the world's AI supply chain depends on it), 1–3 safety goals, and an age (the physical ↔ software mix).
2. **Each month** (8 months, Nov 2026 to Jun 2027, 30 s each) opens with a **council**: pick 1 of 3–4 moves built from the data.
   - ⚖️ **Table a bill:** only when your country's law window is open (`windows.json`). It gives your goals a law vehicle.
   - 🔒 **License your chokepoint:** your top stage ≥25% counts 25% more. The superpower you depend on may retaliate, with a chance equal to its weighted share.
   - 📦 **Stockpile** your biggest dependency: shields you from that supplier's squeeze.
   - 🏗️ **Data-centre campus:** costs ⚡ and 💰. Hosting is the only stage you can replace within 1–3 years.
   - 🤝 **Summit tour** or 📣 **rally at home:** better odds this month.
   - 🔬 **Seed your own dependency:** tiny gain, and it shows how many years real replacement takes.
   - Trade season: +1 of your strongest token.
3. **Fly** to planets and press Space to open a **meeting**: two anime mecha-alien envoys (yours and theirs; armour locks together as they arrive) talk in a meeting room whose season follows the month. Space advances the dialogue. Pick one of up to three leverage points (a token they need, a promise of your chokepoint, or just asking; odds shown). The envoy never answers in person: the court's verdict arrives only as a **letter** stamped Approved or Declined. Envoys are original SVG mecha drawings, animated in CSS (`meeting.js`, `meeting.css`); the art direction follows `concepts/`.
4. **Events:**
   - Dec: China squeezes refined metals.
   - Feb: the US pressures your weakest ally.
   - From April: stages that are quick to replace (≤3 years) fade by 20%.
   - Law windows open on their real dates.
5. **Score:** goal progress (needs the best lever stage ≥50% *and* a law vehicle, else capped at 75%), plus accord leverage, plus tokens kept. The debrief shows the risk, route, consent needed and evidence gap for each goal.

**Data:**
- AI shares, weights and years-to-replace come from `../data/layers.json`, unchanged. Conditions and law windows come from `../data/`.
- `planets.json` holds the fantasy names, goals and **illustrative** non-AI tokens.
- Move effects and odds are game rules, not measured effects.
