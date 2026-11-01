# Grounding Orbit Accord's diplomacy

Research cutoff: 1 November 2026. Game baseline: `198d3ac` on main.

## Approved direction

Use Orbit Accord (Game B) as the mechanical and story-progression base, with
Before Geneva (Game A)'s visual style. Keep the approachable opening and travel
loop. Add a little realism without turning the game into a complex simulator:
country-specific interests, credible negotiation conditions, and reactions to
the player's past actions and partners. Ground these in observed foreign-policy
behaviour and the geopolitical context available by the cutoff date.

This research pass gathers evidence and proposes implementable rules. The live
game is being edited by teammates; researchers must not edit implementation,
primary dialogue or shared summaries.

## Research contract

- Read `README.md`, `notes.md`, `DESIGN.md`, `game/game.js`, `game/planets.json`,
  and relevant `data/conditions.json`, `data/windows.json`, `data/layers.json`.
- Research the actual actors represented in the game, not all 32 separate
  Before Geneva routes. Treat grouped countries as distinct governments.
- Retrieve current sources. Record observation date, publication date and event
  date separately. Do not invent late-2026 events if retrieval does not establish
  them; label the latest verified evidence and its gap to the cutoff.
- Prefer official statements, enacted instruments, agreements and documented
  decisions. Political rhetoric is not implemented policy, and investment
  announcements are not disbursements or executed rights.
- Every material factual claim needs a source URL and precise passage/locator.
  Mark sources read, partial or inaccessible. Summarize rather than copying.
- Separate observed facts, interpretation, proposed fictional mechanics and
  unknowns. Never represent game modifiers as measured acceptance probabilities.
- For each proposed rule name the actor, objective, authority/instrument, trigger,
  conditions, time cost, plausible response, substitute and evidence limit.
- Prior help is not automatic consent; a relationship with one government is
  not automatically hostility from its rival. Distinguish issue-specific trust,
  compliance/security conditions, commercial ties and diplomatic alignment.
- Deliver plain-language policy cards, a short source ledger, contradictory
  evidence and a small machine-readable candidate-rule list if useful.
- Each researcher owns only their assigned new files. No nested agents, commits,
  edits to shared files, messages to people or public posting. The task owner
  integrates, checks and publishes the research in this repository.

## Parallel research areas

1. East Asian actors: Japan, Taiwan and South Korea.
2. European actors: Netherlands, Germany and United Kingdom; EU competence.
3. Gulf actors: distinguish UAE and Saudi Arabia.
4. Australia, Canada and the producer-state group, disaggregated.
5. United States and China: constraints and third-party reactions.
6. Negotiation process: realistic small-state decisions, memory and delivery.

## Integration test

Can a player understand what the other government wants, why its answer changed,
what their offer actually commits, and what still needs approval? Prefer a small
number of transparent states to hidden precise odds. Evidence should constrain
the fiction without claiming to predict a real government's decisions.
