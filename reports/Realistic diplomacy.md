# Realistic diplomacy: connecting the plot and the game

Research cutoff: 1 November 2026. This synthesis records the release state and links to the detailed evidence ledgers.

## The two submission assets

1. **The feasibility/impact plot** contains 32 researched routes. Its positions are team judgments under an explicit model, not success probabilities. The portable version is [policy-explorer.html](../submission/policy-explorer.html); [packaging and verification](../submission/policy-explorer-README.md) document its frozen inputs.
2. **Orbit Accord** is the selected communication game. Tuba's map, plane, characters, style transfer, mission guide and core progression remain its foundation. The `ab4e84a` research layer adds country-interest dialogue, related-route links, an AI outlook and fictional safety-policy endings.

The separate Before Geneva prototype matches all 32 research route IDs directly to its conversations. Orbit's related-route links are a lighter connection: they do not turn plotted coordinates into diplomatic acceptance probabilities. Its core continues to use aggregate supply-chain shares, authored modifiers and random outcomes. See the [plot–game audit](../research_notes/Realistic%20diplomacy/plot-game-audit.md), read with the release correction below.

## Release correction

The early audit predates Tuba's relationship/history rules and mission tracker. Her style-transfer artwork landed in `b23db53`; `17b39fd` contains the separate art handoff, not that live integration. The research layer in `ab4e84a` subsequently added links and explanatory material. The final small follow-up corrects the opening ticker and labels scripted monthly shocks as game scenarios.

Tests of `game/relations.test.mjs`, `game/story-engine.test.mjs`, `routes/metrics.test.mjs` and `routes/placement.test.mjs` pass **22 tests**. The research-layer browser check exercises all 11 meeting groups at desktop and phone widths, outlooks, links and endings. These validate implementation behaviour, not policy effectiveness.

## What the diplomacy research contributes

| Area | Practical distinction | Evidence ledger |
|---|---|---|
| East Asia | Government programmes and export approvals do not amount to control of private chipmakers' entire output. | [Japan, Taiwan and South Korea](../research_notes/Realistic%20diplomacy/east-asia.md) |
| Europe | National authority, EU authority, procurement and voluntary institute cooperation have different scopes. | [Europe](../research_notes/Realistic%20diplomacy/europe.md) |
| Gulf | UAE and Saudi decisions are separate; entity-specific permissions and announced investment are not general guarantees of access. | [Gulf](../research_notes/Realistic%20diplomacy/gulf.md) |
| Resources | Investment, royalties, local value creation and approval procedures differ by country. Grouping countries is a game simplification. | [Resources](../research_notes/Realistic%20diplomacy/resources.md) |
| US and China | Competition can coexist with limited cooperation. Agreements and reported extensions require dated, instrument-specific checks. | [US–China](../research_notes/Realistic%20diplomacy/us-china.md) |
| Process | Signature, implementation, verification and enforcement are distinct. Trust modifiers are authored rules, not measured behavioural laws. | [Process](../research_notes/Realistic%20diplomacy/process.md) |
| Timing | A statutory deadline, announced target and derived earliest date need different labels. | [Timing](../research_notes/Realistic%20diplomacy/timing.md) |

## Limits and next question

The [independent source check](../research_notes/Realistic%20diplomacy/source-check.md) takes precedence over initial notes. It records inaccessible EUR-Lex material, a broken BIS citation and the invented nature of `process.json`'s escalation ladder. The game still simplifies coalition membership, combines some countries and uses heuristic acceptance odds. Its date-window rules and fixed shocks are not a validated geopolitical forecast.

The pass does not establish that governments have accepted the proposed safety bargains. Each proposal still needs a named decision-maker, lawful instrument, relevant timing, credible incentive and observable compliance condition. The next discriminating question is which specific contract or approval already authorises a proposed safety condition—and who can enforce it when a supplier objects.
