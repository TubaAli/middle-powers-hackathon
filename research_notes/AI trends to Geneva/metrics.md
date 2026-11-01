# AI trends to Geneva: measured baselines and defensible projections for the Orbit Accord simulation

Scope: measurable AI trend metrics for the educational Orbit Accord / Before Geneva
simulation window. Scenario cutoff **2026-11-01**, horizon **2027-06-21** (the Geneva
session; campaign window = 232 days = 7.6 months = 0.635 years). Research notes only;
no game mechanics, map plane, characters or Game A style are affected. Companion
machine-readable file: `metrics.json` (same directory).

Every value below is labelled with its evidence class, used consistently in both files:

- **[M] measured** — an observed value with a date, published by the named primary source.
- **[X] extrapolated** — a value computed by extending a published fitted trend past its
  last observed point; the fit, its interval and its provenance are stated.
- **[J] judgement** — a modelling choice among defensible published alternatives.
- **[F] fictional** — a simulation-only quantity with no data basis (policy-lever effects,
  drift rates, any 2026 value for a metric that has no 2026 observation).

No 2026 value is invented: every dated number is quoted from the retrieved primary
sources, all accessed 2026-11-01. All retrieval was by direct URL fetch; no search engine.

## Which 3–5 metrics are defensible for an eight-month projection to the June 2027 Geneva window?

### Takeaway

Five metrics survive an evidence screen that required a published data definition, an
explicit fit with interval, observed values near the cutoff, and no demonstrated
saturation: (1) Epoch Capabilities Index (ECI) frontier, (2) frontier training compute,
(3) METR task time horizon, (4) chip performance per dollar, (5) workplace adoption
measured by the Epoch/Ipsos polling programme. The first three carry the capability pace;
the last two carry cost and deployment exposure. An eight-month linear or exponential
extension of (1)–(3) is defensible as a *scenario input* (not a forecast) because each
extrapolation is shorter than one-third of its fit window and each trend has survived a
methodology change; (4) is step-shaped and must not be extrapolated smoothly; (5) is a
measured starting state only, with no defensible fitted growth rate.

### Cited Findings

- Epoch's trends dashboard (updated Feb. 5, 2026) lists current headline trends with 90% intervals: frontier training compute 5×/yr since 2020 (CI 4×–6×), training cost 3.5×/yr (CI 2.8×–4.4×), total compute stock 3.4×/yr since 2022 (CI 3.2×–3.7×), chip performance per dollar +49%/yr since 2023 (CI 36%–66%), ECI frontier +14 points/yr since reasoning models (CI +12 to +17), context windows 30×/yr since 2023 (CI 10×–50×) — [Epoch, Trends in AI](https://epoch.ai/trends), accessed 2026-11-01.
- Epoch's models dataset (2,000+ models, CSV updated daily) defines "frontier models" as models in the top 5 of training compute at release — [Epoch, AI models documentation](https://epoch.ai/data/ai-models-documentation), accessed 2026-11-01.
- METR's time-horizon programme has published a 50%-success task-length series since 2019, updated as Time Horizon 1.1 on Jan. 29, 2026 — [METR, Time Horizon 1.1](https://metr.org/blog/2026-01-29-time-horizon-1-1/), accessed 2026-11-01.
- Epoch runs a repeated, probability-based AI-usage polling programme with Ipsos (waves: Nov. 2025, n=5,660; Mar. 2026, n=2,021; Jul. 2026, n=1,103 employed US adults) — [Epoch, Polling on AI usage](https://epoch.ai/data/polling), accessed 2026-11-01.
- METR's cross-domain analysis found 9 external benchmarks (scientific reasoning, math, robotics, computer use, self-driving) improve at "generally similar rates" to the ~7-month time-horizon doubling — [METR, How Does Time Horizon Vary Across Domains?](https://metr.org/blog/2025-07-14-how-does-time-horizon-vary-across-domains/), located via [METR research index](https://metr.org/research), accessed 2026-11-01.

### Inferences

- The five selected metrics span the simulation's needs: capability pace (ECI, compute, time horizon), cost (chip performance per dollar), and deployment exposure (adoption). Strong alternates (algorithmic efficiency, compute stock, training cost, context windows) are documented in a later section with full data, so the writer can substitute if the game design prefers.
- Projection length (232 days) relative to fit windows: ECI reasoning era 2019-style window is ~25 months (extrapolation ≈ 31% of it); training-compute trend 2020–2026 (extrapolation ≈ 10%); time horizon 2019–2025 (extrapolation of the *rate* well inside the observed era). Short-horizon extension of ongoing trends is defensible for scenario use *when the interval is carried along and labelled*, which is done for every projection below.

### Gaps

- Global (non-US) adoption series were not retrieved; the only repeated-measurement adoption series found is US-only (see adoption section). For a Geneva/middle-powers simulation this is a real coverage gap; candidate non-US primary sources (Eurostat AI usage, World Bank Enterprise Survey items) exist in the repo's earlier coordinate-evidence work but were not re-verified for this brief within the tool-call budget.
- Stanford HAI AI Index 2026 and McKinsey State of AI editions were not fetched; the Epoch/Ipsos series was preferred because its methodology, microdata and questionnaires are fully public.

## Metric 1 — Frontier capability: Epoch Capabilities Index (ECI)

### Takeaway

The ECI frontier has advanced linearly by 14 points per year since reasoning models
appeared (Sept 2024), with a published 90% interval of +12 to +17, and no observed
plateau through Oct 2026 (top score 167, Claude Opus 5.5; 169 as displayed for GPT-6
Astra on 2026-11-01). Extrapolating 232 days gives a Geneva frontier ECI of ~178
(range ~176–180 across interval and anchor choices). This is the most defensible
capability clock for the simulation.

### Cited Findings

- **[M]** Definition: "The ECI combines scores from many different AI benchmarks into a single 'general capability' scale, allowing for comparisons between models and model eras." Frontier = best score at a date. — [Epoch ECI insight](https://epoch.ai/data-insights/eci-frontier-trend), Sep. 1, 2026, accessed 2026-11-01.
- **[M]** Trend: "Following the introduction of the first reasoning models (OpenAI's o1-mini and o1-preview) in September 2024, the ECI frontier has advanced linearly by 14 points per year, compared with 6 points per year for non-reasoning models." 90% CI +12 to +17. Prediction intervals are published as downloadable CSVs (`band.csv`, `band_nonreasoning.csv`, `eci_bootstraps.json`). — [Epoch ECI insight](https://epoch.ai/data-insights/eci-frontier-trend), accessed 2026-11-01.
- **[M]** Measured reasoning-SOTA series (from `points.csv`, chart updated Sep. 1, 2026; ECI, release date): o1-mini 136.64 (2024-09-12); o1 142.67 (2024-12-17); Gemini 2.5 Pro 144.63 (2025-03-31); o3 147.06 (2025-04-16); o3-pro 147.51 (2025-06-10); GPT-5 150 (2025-08-07); GPT-5 Pro 150.29 (2025-10-07); Gemini 3 Pro 153.06 (2025-11-18); GPT-5.2 Pro 155.07 (2025-12-11); GPT-5.3 Codex 156.22 (2026-02-05); GPT-5.4 Pro 158.55 (2026-03-05); GPT-5.5 Pro 161.71 (2026-04-23); Claude Fable 5 162.48 (2026-06-09) — [Epoch ECI points CSV](https://epoch.ai/data/charts/eci-frontier-trend/points.csv), retrieved 2026-11-01.
- **[M]** Post-CSV frontier, from the benchmarks hub: "Claude Opus 5.5 took the top spot on the Epoch Capabilities Index with a score of 167, narrowly ahead of GPT-6 Astra" (Oct. 1, 2026); hub header displays "169 top ECI: GPT-6 Astra" (hub updated Nov. 1, 2026); GPT-6 Astra was pre-release evaluated Sep. 3, 2026 and "set new records on the ECI." The hub tracks 418 models and 95 benchmarks — [Epoch benchmarks hub](https://epoch.ai/benchmarks), accessed 2026-11-01.
- **[M]** Non-reasoning SOTA for contrast: GPT-4 126.19 (2023-03-14) → GPT-4.5 137.63 (2025-02-27), ~6 points/yr — [Epoch ECI points CSV](https://epoch.ai/data/charts/eci-frontier-trend/points.csv).
- **[M]** The trend break is documented in Epoch's April 2026 report "Have AI capabilities accelerated?", which "found evidence of an acceleration in the ECI following the launch of reasoning models" — linked and summarised by the [ECI insight page](https://epoch.ai/data-insights/eci-frontier-trend) (report: [epoch.ai/publications/have-ai-capabilities-accelerated](https://epoch.ai/publications/have-ai-capabilities-accelerated), Apr. 16, 2026).
- **[M]** Remaining headroom datapoint: on FrontierMath Erdős (68 unsolved Erdős problems, solutions written in Lean, announced Sep. 3, 2026) "No prior model solved any of them; GPT-6 Astra solved 2 of 68, scoring 3%" — [Epoch benchmarks hub](https://epoch.ai/benchmarks), accessed 2026-11-01.
- **[M]** Diffusion datapoint: "Frontier AI performance becomes accessible on consumer hardware within a year" (stat shown: 8 months) — [Epoch trends](https://epoch.ai/trends).

### Inferences

- **[X]** Slope check from the raw series (my computation): o1-mini (2024-09-12, 136.64) → Claude Fable 5 (2026-06-09, 162.48) = 25.84 points over 635 days = 14.9 points/yr, inside the published 90% interval (+12 to +17). The published fit and the raw points agree, which supports using the published band for extrapolation.
- **[X]** Geneva projection: from the cutoff anchor 169 (GPT-6 Astra, hub display, 2026-11-01): 169 + 14×(232/365.25) = 177.9 ≈ **178**; interval 169 + [12, 17]×0.635 → **176.6–179.8**. From the Oct. 1 anchor 167 (Claude Opus 5.5): 175.9 [174.6–177.8]. Combined honest statement: **frontier ECI at Geneva ≈ 176–180, central ≈ 178**. Monthly interpolation for the game: ECI(t) = ECI₀ + 14×(days since 2026-11-01)/365.25, with a fan using +12 and +17.
- **[J]** The small anchor ambiguity (167 on Oct. 1 vs 169 displayed Nov. 1 for a different model) is a source-metadata wrinkle, not a trend problem: both points sit on the fitted line. I recommend the game display "≈178 (90% band 176–180)" and cite both anchors.
- **[J]** Suitability judgement: this is the best master clock for the simulation — monthly release cadence, ~25 months of frontier data plus a 195-row cross-section in the published CSV, a *linear* (not exponential) trend that is easy to show honestly on a plain axis, and a published prediction interval. Extrapolating 8 months is ~31% of the reasoning-era window — short enough to be defensible, long enough to matter in play.

### Gaps

- The exact ECI scale construction (item selection, scaling method) is documented on the /eci pages, which were not retrieved in this pass; the insight page's one-line definition is quoted instead.
- `band.csv` (trend line + 90% prediction interval values) was not retrieved; only its existence and update date (Sep. 1, 2026) are recorded. The dashboard builder should download it directly.
- The reason the hub header shows GPT-6 Astra at 169 while the Oct. 1 note reported Opus 5.5 (167) "narrowly ahead" is not explained in the retrieved pages (likely a later revision or post-release re-score); recorded as-is rather than resolved.

## Metric 2 — Frontier training compute

### Takeaway

Frontier training compute has grown about 5× per year since 2020 (Epoch's current
headline; 90% CI 4×–6×), on top of a 14-year record of 4–5×/yr across multiple
definitions, with ~10,000× total growth among top-5 models since 2020. During the
232-day campaign the trend implies a ×2.8 multiplier (CI ×2.4–×3.1). Epoch's constraint
analysis finds no physical wall before 2030 (2e29 FLOP feasible), so an eight-month
extension is defensible; the honest risks are definitional (top-5 vs top-10) and
economic (willingness to invest), plus the documented precedent that the growth rate
changed once already (a slowdown after 2018).

### Cited Findings

- **[M]** Current headline: "Training compute for frontier language models has been growing at 5× per year since 2020" (doubling 5.2 months; 90% CI 4× to 6×, i.e. 4.6–6.0 months); "Since 2020, the trend among top-5 models has grown by a factor of ~10,000." — [Epoch trends](https://epoch.ai/trends), updated Feb. 5, 2026, accessed 2026-11-01.
- **[M]** Underlying methods (log-linear fits, bootstrap CIs; database tripled to 333 compute estimates for notable models 2010–May 2024): notable models 4.1×/yr (90% CI 3.7–4.6, 2010–May 2024); frontier (running top-10) 5.3×/yr (4.9–5.7, 2010–May 2024); frontier after 2018 slowdown 4.2×/yr (3.6–4.9; break 80% CI Oct 2016–Aug 2019, excluding AlphaGo Master/Zero outliers); notable language models 9.5×/yr (7.4–12.2, Jun 2017–May 2024), slowing to ~5.0×/yr (3.1–7.3) after mid-2020; robust to top-N choice (5.15–5.44× for N=5–20) — [Epoch, Training compute of frontier AI models grows by 4-5x per year](https://epoch.ai/publications/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year), May 28, 2024, accessed 2026-11-01.
- **[M]** Observed anchor values (Epoch estimates): GPT-3 ~3e23 FLOP (May 2020); GPT-4 ~2e25 FLOP (Mar 2023); Gemini Ultra ~5e25 FLOP (Dec 2023) — same report. Llama 3.1 405B: 4e25 FLOP, 16,000 H100s, 27 MW, 72 days (Jul 2024) — [Epoch, Can AI scaling continue through 2030?](https://epoch.ai/publications/can-ai-scaling-continue-through-2030), Aug. 20, 2024, accessed 2026-11-01.
- **[M]** Notability criteria (models qualify by citations, SOTA results, historical importance, or significant product deployment) and dataset access: [AI models documentation](https://epoch.ai/data/ai-models-documentation); full dataset CSV `https://epoch.ai/data/all_ai_models.csv`, updated daily — accessed 2026-11-01.
- **[M]** Feasibility envelope: "training runs of around 2e29 FLOP are likely possible by 2030"; constraint order: power binds first, then chip manufacturing, then data, then the latency wall; power: 1–5 GW campuses → 1e28–3e29 FLOP, distributed 2–45 GW → 2e28–2e30 FLOP; chips: 20M–400M H100e → 1e29–5e30 FLOP; data: 400T–20Q tokens → 6e28–2e32 FLOP; latency wall cap 3e30–1e32 FLOP. Historical comparison: 4×/yr outpaces peak mobile-phone adoption (2×/yr, 1980–87), solar capacity (1.5×/yr, 2001–10) and genome sequencing (3.3×/yr, 2008–15) — [Epoch, Can AI scaling continue through 2030?](https://epoch.ai/publications/can-ai-scaling-continue-through-2030).
- **[M]** Related industry facts for texture: five hyperscalers own 71% of global AI compute; largest known AI data center ~1.1M H100-equivalents (Colossus 2, Memphis); Meta Hyperion expected at 3.7M H100e by Jan 2028; frontier labs have raised >$370B; gigawatt-scale build time ~2.1 years (90% CI 1–3.6); ~$38B capex per GW; total compute stock (all AI chips) growing 3.4×/yr since 2022 (CI 3.2–3.7); OpenAI annualized revenue growing 3.2×/yr since 2024 (CI 3.0–3.4); only 30% of OpenAI's 2024 compute spend was inference — [Epoch trends](https://epoch.ai/trends), accessed 2026-11-01.

### Inferences

- **[X]** Campaign multiplier: 5^(232/365.25) = **×2.8** per campaign; interval 4^0.635 = ×2.4 to 6^0.635 = ×3.1. Per game month: 5^(1/12) = ×1.14. These are trend extensions, all labelled [X].
- **[X]** Trend-implied frontier level: 3e23 (GPT-3, the scale-setter at the start of the "since 2020" window) × ~10,000 (published top-5 growth factor since 2020) ≈ **~3e27 FLOP** trend-line level in early 2026; at Geneva ~3e27 × 2.8 ≈ **~8.4e27 FLOP** (range ~7.2–9.3e27). This is a *derived* level from two published statements, not an observed model estimate — no 2026 frontier model's compute was retrieved, and none should be quoted.
- **[X]** No-wall check: ~8.4e27 at Geneva sits two orders of magnitude below Epoch's 2030 feasibility envelope (1e28–2e30 FLOP), so within the horizon there is no physical-saturation argument against the trend continuing; the binding risks are investment willingness and cluster delivery, not physics.
- **[J]** Definitional sensitivity: the 2024 report's preferred frontier description was 4–5×/yr with a post-2018 rate of 4.2×/yr, while the current headline is 5×/yr since 2020 for the *top-5 language models* subset. Both are Epoch's; the difference is subset definition. I recommend the game use 5×/yr (CI 4–6×) as the default and disclose the 4.2×/yr post-2018 figure as the documented precedent that these rates can shift.
- **[J]** Defensibility: MODERATE-HIGH as a scenario input. Six years of consistent frontier growth at the headline rate, 14 years of 4–5× across definitions, retrodiction successes (GPT-4, Gemini Ultra), and explicit constraint analysis — against which stand the 2018 slowdown precedent, partly-inferred per-model estimates, and dependence on continued investment. Present as a fan, never as a single line.

### Gaps

- No observed training-compute estimate for any 2025–2026 frontier model was retrieved (the daily-updated `all_ai_models.csv` would contain them; not fetched within the tool-call budget). The trend-implied ~3e27 FLOP level is the honest substitute and must be labelled derived.
- The exact fit interval and method behind the Feb. 5, 2026 "5×/yr since 2020" headline are not documented on the trends page itself; the 2024 report's methods are the documented proxy.
- Training-cost trend (3.5×/yr since 2020, CI 2.8–4.4) is quoted from the trends dashboard; its dedicated methodology page was not retrieved.

## Metric 3 — Task time horizon (METR)

### Takeaway

METR's 50%-success time horizon — the human-equivalent task length an AI agent
completes with 50% probability — has doubled roughly every 7 months since 2019
(196 days over the full hybrid series; 131 days [107–161] for 2023+ models under the
current TH1.1 suite). The last measured frontier value is Claude Opus 4.5 at 320
minutes [170–729] (Nov 2025); no 2026 frontier model has a published estimate, so the
simulation must treat the 2026 level as on-trend inference. During the 232-day campaign
the horizon multiplier is ×2.3–×6.1 depending on the rate chosen (central ×3.4), making
this the widest-uncertainty capability metric — usable, but only with its band shown.

### Cited Findings

- **[M]** Definition and series origin: time horizon = task length (in human minutes) at which the model succeeds with 50% probability; task suites drawn from research/software-engineering skills (RE-Bench subset, HCAST subset, SWAA short tasks); "consistently exponentially increasing over the past 6 years, with a doubling time of around 7 months" — [METR, Measuring AI Ability to Complete Long Software Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/), Mar. 19, 2025 (URL located via the [research index](https://metr.org/research); headline numbers restated and tabulated by TH1.1 below; paper: Kwa et al., arXiv:2503.14499).
- **[M]** TH1.1 update (Jan. 29, 2026): task suite 170 → 228 tasks (+73 HCAST, −15 removed, 53 updated); tasks ≥8h human time: 14 → 31, of which only 5 human-baselined; 14 of 33 models re-estimated (11 SOTA); evaluation infrastructure moved from Vivaria to Inspect (UK AI Security Institute framework); TH1.1 estimates "generally lie within the confidence intervals from the TH1 time horizons" — [METR, Time Horizon 1.1](https://metr.org/blog/2026-01-29-time-horizon-1-1/), accessed 2026-11-01.
- **[M]** Doubling times (TH1.1 appendix table): P50 doubling TH1 = 195.8 days [162, 223]; TH1.1 hybrid (TH1 values for pre-2023 models) = 196.5 days; since 2023: TH1 = 165.3 [129, 211], TH1.1 = 130.8 [107, 161]; since 2024: TH1 = 108.9, TH1.1 = 88.6 — same page.
- **[M]** Model values (minutes; TH1.1 where available): Claude Opus 4.5 (rel. 2025-11-24) 320 [170, 729] (TH1: 289); GPT-5 (2025-08-07) 214 [117, 480] (TH1: 138, +55%); o3 121 [74, 201] (TH1: 94); Claude Opus 4 101 [58, 170]; Claude Sonnet 3.7 60 [32, 106]; GPT-4 (1106) 3.6 [1.6, 7.5] (TH1: 8.5, −57%); GPT-4 (0314) 3.5 (TH1: 5.4, −35%). TH1-only frontier values: GPT-5.1-Codex-Max (2025-11-19) 173 [81, 411]; Claude Sonnet 4.5 122 [59, 252]; Claude Opus 4.1 114 [56, 215]; Grok 4 109 [48, 235]; Claude Sonnet 4 75 — same page.
- **[M]** METR's own trend-stability caveats: "the trend in time horizon growth looks a little different" under the new suite; the change is "due to our estimates of older models shifting down... and estimates of recent models shifting up"; "We cannot directly compare growth-rates between TH1 and TH1.1 over the entire period"; the confidence intervals represent draws over task families/tasks/runs and "over-estimate the run-level variance"; the TH1.1 doubling time is within TH1's confidence intervals but with substantial task overlap — same page.
- **[M]** Measurement-ceiling risk, in METR's words: "even our Time Horizon 1.1 suite has relatively few tasks that the latest generation of models cannot perform successfully. We are prioritizing work on updates to our evaluations so that they can measure the capabilities of very strong models." — same page.
- **[M]** Cross-domain replication: 9 benchmarks across scientific reasoning, math, robotics, computer use and self-driving show "generally similar rates of improvement to the 7-month doubling time" — [METR, How Does Time Horizon Vary Across Domains?](https://metr.org/blog/2025-07-14-how-does-time-horizon-vary-across-domains/), Jul. 14, 2025.
- **[M]** Adjacent 2026 evidence: "MirrorCode: Evidence that AI can already do some weeks-long coding tasks... including reimplementing a 16,000-line codebase" (Apr. 10, 2026, with Epoch) — [METR research index](https://metr.org/research); data repo for TH1 and TH1.1: [github.com/METR/eval-analysis-public](https://github.com/METR/eval-analysis-public) (linked from TH1.1).

### Inferences

- **[X]** Campaign multipliers over 232 days: at the full-period hybrid rate (196.5 d): ×2.27; at the TH1.1 since-2023 rate (130.8 d): ×3.42 (CI from [107, 161]: ×2.7–×4.5); at the since-2024 rate (88.6 d): ×6.1. Per game month: ×1.11 / ×1.17 / ×1.27 respectively.
- **[J]** Rate choice: I recommend the since-2023 TH1.1 rate (131 days, CI 107–161) as the simulation default, with 196.5 days as the conservative bound and 88.6 days as the fast bound. Rationale: it is the most recent suite's fit over the period covering every model the game will simulate, and METR states the new suite is the better measurement. This is a judgement among published alternatives, not a new estimate.
- **[X]** Cutoff level (inference across the measurement gap): on-trend backcast from Opus 4.5's 320 min (2025-11-24) to 2026-11-01 gives ~18h (196.5-day rate) to ~33h (131-day rate) to ~77h (88.6-day rate). **[X]** Geneva level: extending to 2027-06-21 gives ~40h (~1.7 days) / ~112h (~4.7 days) / ~476h (~20 days) for the three rates. All of these are extrapolations beyond the last measured point (Nov 2025) and must be displayed as such.
- **[J]** Defensibility: MODERATE — the metric has 6+ years of consistent exponential growth, survived a suite rebuild with the full-period doubling essentially unchanged (196 days), and replicates across 9 external domains; against this stand the widest intervals of any selected metric, task-composition sensitivity, and a 2026 measurement gap at the cutoff. No saturation is *demonstrated* (the trend is still exponential), but the suite itself is near its ceiling for recent models — a censoring problem METR explicitly flags and is fixing.

### Gaps

- No published TH1.1 (or TH1) estimate exists in the retrieved material for any 2026 frontier model (GPT-5.5, Claude Opus 5/5.5, GPT-5.6 Sol, GPT-6 Astra). The 2026 level is on-trend inference only; the game must not display a specific "current horizon in minutes" as if measured.
- Only 5 of 31 long (≥8h) tasks are human-baselined; the rest use estimated human times (METR states this), which adds unquantified uncertainty to long-horizon points.
- The Mar. 19, 2025 page itself was not fetched (URL located via the research index; its numbers are used as restated by TH1.1). If the writer wants direct quotes from the original, fetch the URL given above.

## Metric 4 — Chip performance per dollar (hardware cost trend)

### Takeaway

The performance bought per dollar of AI chips purchased each quarter grew ~49%/yr
(90% CI 36%–66%) from Q1 2023 to end-2025 (5.6e11 → 1.4e12 bit-operations/s per
2025-dollar), but the series is a generation-driven step function — nearly flat through
mid-2024, then roughly doubling as Blackwell became the majority of spending. With only
~12 quarters, a smooth exponential extrapolation is NOT defensible; the honest campaign
statement is ×1.22–×1.38 (central ×1.29) with an explicit "stepped, one-generation-risk"
caveat. Use as cost context, not as a clock.

### Cited Findings

- **[M]** Definition and method: "we compute the performance per dollar of the chips sold in each quarter since 2023: their combined computing performance divided by the dollars spent on them, in constant 2025 dollars. Widely sold chips contribute more to each quarter's figure than chips produced in smaller volumes." Sales data from the AI Chip Sales Hub (revenue data, financial disclosures, analyst reports) — [Epoch, chip performance per dollar](https://epoch.ai/data-insights/chip-performance-per-dollar), Aug. 13, 2026, accessed 2026-11-01.
- **[M]** Values and fit: "Performance per dollar rose from about 5.6 × 10¹¹ bit-operations per second per dollar in the first quarter of 2023 to about 1.4 × 10¹² by the end of 2025, in constant 2025 dollars. Fitting an exponential trend gives an average growth rate of about 49% per year (90% CI: 36% to 66%)." Doubling every 1.7 years (CI 1.4–2.3) — same page.
- **[M]** Step structure: "Gains have come in spurts, as spending shifts to the newest generation of chips. Price-performance was nearly flat through mid-2024, then roughly doubled as Blackwell-generation chips grew to a majority of new spending." — same page.
- **[M]** Supporting comparisons: NVIDIA GB300 costs ~5.5× the P100's 2016 launch price but delivers ~200× the performance (~37× more cost-effective); best price-performance chip listed: Google TPU v6e at 3.6×10¹² bit-ops/s per dollar; most spending goes to NVIDIA GPUs at lower price-perf than some ASICs — same page.
- **[M]** Underlying data CSV: `https://epoch.ai/data/charts/chip-performance-per-dollar/chip_perf_per_dollar_quarterly_other_merged.csv` (CSV, updated Aug. 13, 2026) — same page.
- **[M]** Longer-run hardware trends for context: FLOP/s performance of 47 ML accelerators doubled every 2.3 years ([Trends in machine learning hardware](https://epoch.ai/publications/trends-in-machine-learning-hardware)); GPU memory bandwidth +28%/yr since 2008 (CI 24%–33%); FLOP/s per watt +34%/yr since 2008 (CI 29%–39%); new numeric formats took 3–4 years to become widespread — [Epoch trends](https://epoch.ai/trends).

### Inferences

- **[X]** Campaign multiplier: 1.49^0.635 = **×1.29** central; CI 1.36^0.635 = ×1.22 to 1.66^0.635 = ×1.38. Per game month: ×1.034. Labelled [X] and presented as a drift band, not a smooth law.
- **[J]** Model risk: over 8 months the series may include zero or one chip-generation transition; a single step can dominate the whole campaign. The right simulation treatment is a stepped or range input (e.g., cost per effective FLOP falls 20–40% by Geneva), not a monthly compounding curve. This metric is the clearest case in the set where "no demonstrated saturation" must NOT be read off a fitted exponential: 12 spiky quarters do not establish a stable growth law, only a central drift within a wide interval.

### Gaps

- Whether the published CSV includes 2026 quarters beyond end-2025 is not stated in the retrieved text ("by the end of 2025" is the last quoted value; the CSV was updated Aug. 13, 2026). The dashboard builder should read the CSV to extend the measured series.
- Per-chip 2026 prices (e.g., GB300/Rubin-class) were not retrieved; the cited page's GB300-vs-P100 comparison is the only price datum quoted.

## Metric 5 — Workplace adoption / deployment exposure (Epoch/Ipsos polling)

### Takeaway

Adoption is measured, current and citable — but not projectable. In the July 2026
probability-based wave (1,103 employed US adults), 20% said AI now handles at least one
task previously delegated to a coworker or contractor; per-task AI use ranges from 25%
(maintaining records) to 57% (designing systems/software). The three published waves
(Nov 2025, Mar 2026, Jul 2026) use different questionnaires, so no cross-wave growth
rate can be defensibly fitted. Use measured levels as the campaign's starting state
for "deployment exposure"; any monthly drift must be marked **[F] fictional**.

### Cited Findings

- **[M]** Programme design: Epoch AI polling in collaboration with Ipsos on KnowledgePanel (probability-based panel, address-based sampling, weighted to US Census benchmarks); waves: Nov. 2025 (5,660 US adults), Mar. 2026 (2,021 US adults), Jul. 2026 (1,103 employed US adults); 90% Wilson score intervals on effective sample size; Taylor-series-linearization variance; respondent as primary sampling unit; microdata, questionnaire PDF and methodology DOCX published — [Epoch, Polling on AI usage](https://epoch.ai/data/polling), updated Aug. 14, 2026, accessed 2026-11-01.
- **[M]** July 2026 wave (fielded Jul. 10–19, 2026; 1,106 surveyed, n=1,103 after removing 3 invalid): "One in five employed adults now delegates tasks to AI rather than other humans. 20% of respondents say AI now handles at least one task that was previously handed off to a coworker or contractor." Per-task AI use among workers performing the task: 57% (designing computer systems or software), 46% (analyzing data), 39% (reading work documents), 25% (maintaining records, lowest of ten). Time savings reported on 37% of part-assisted tasks and 53% of mostly-fully-AI tasks; ~1 in 6 AI-assisted tasks now takes more time; 66% of outputs used unchanged or with minor edits (6% unchanged; 27% more revision; 5% majorly reworked); task list from O*NET v30.3 weighted by BLS employment — [Epoch, One in five US workers now delegates tasks to AI](https://epoch.ai/publications/one-in-five-workers-delegate-work-to-ai), Aug. 6, 2026, accessed 2026-11-01.
- **[M]** March 2026 wave (fielded Mar. 3–5, 2026; 2,021 US adults): "AI has become a common workplace tool in the US, with 51% of employed AI users reporting they use it at least as much for work as for personal tasks" — [Epoch, Half of employed AI users now use it for work](https://epoch.ai/publications/half-of-employed-ai-users-now-use-it-for-work), Apr. 9, 2026 (cited within the Aug. 6, 2026 report), accessed 2026-11-01.
- **[M]** Counter-evidence on productivity claims (measured): a randomized controlled trial with experienced open-source developers found they "take 19% longer than without—AI makes them slower" (Jul. 10, 2025); a survey of 349 technical workers (May 11, 2026) found a median 1.4–2× self-reported value change "though there are reasons to be skeptical of the magnitude"; METR is redesigning its developer-productivity experiment (Feb. 24, 2026) because "selection effects from wider AI adoption" invalidate the previous design — [METR research index](https://metr.org/research), accessed 2026-11-01.

### Inferences

- **[J]** Simulation use: adoption anchors the *deployment exposure* starting state — e.g., "in July 2026, 20% of US employed adults already delegated at least one work task to AI; per-task use spans 25–57%" — all [M]. Because no wave-to-wave trend is fittable from the published questionnaires, the campaign should hold these levels constant and let fictional policy levers move exposure, or apply an explicitly **[F]** drift (e.g., ±0–1.5 percentage points per month) that the game labels as illustrative.
- **[J]** US-only scope is a material limitation for a Geneva simulation: the measured exposure baselines describe US employed adults; the simulation's dossier text should say so, and non-US baselines remain a gap (see below).

### Gaps

- The Nov. 2025 wave's values were not retrieved (CSV available at the polling hub); cross-wave comparisons of any single question were therefore impossible in this pass.
- No non-US adoption series was retrieved; middle-power deployment exposure must not be quantified from the US series.
- Question-level comparability across waves is not documented in the retrieved text; the hub's changelog (Aug. 14, 2026) describes interval-method changes, implying estimates can be revised between waves.

## Strong alternates: full data, and why they were not selected in the top five

### Takeaway

Four alternates carry complete, citable data and are recorded here so the writer can
swap them in: algorithmic efficiency (compute-for-fixed-performance halving every
~8 months), total compute stock (3.4×/yr since 2022), frontier training cost
(3.5×/yr since 2020), and context windows (30×/yr since 2023). Algorithmic efficiency
was the closest cut: excellent methodology, but its series predates the reasoning era,
so as a *current* Geneva clock it is censored; as a multiplier inside "effective
compute" it remains useful with its confound warning attached.

### Cited Findings

- **[M]** Algorithmic efficiency: "the level of compute needed to achieve a given level of performance has halved roughly every 8 months, with a 95% confidence interval of 5 to 14 months" (231 language models; pre-training performance, log perplexity); Shapley analysis: 60–95% of gains from compute+data vs 5–40% from algorithms; transformer introduction ≈ 2 years of algorithmic progress; Chinchilla ≈ 8–16 months; explicitly limited to pre-training and not accounting for post-training enhancements; "the relative importance of algorithmic improvements has decreased over time as compute scaling accelerated around 2018" — [Epoch, Algorithmic progress in language models](https://epoch.ai/blog/algorithmic-progress-in-language-models), Mar. 12, 2024 (paper: arXiv:2403.05812; code: github.com/epoch-research/lm-algorithmic-progress), accessed 2026-11-01.
- **[M]** Compute stock: 3.4×/yr since 2022 (90% CI 3.2–3.7; doubling 6.8 months), "based on revenue data, other financial disclosures, and analyst reports" — [Epoch trends](https://epoch.ai/trends).
- **[M]** Training cost: "The cost to train frontier language models has increased by 3.5×/year since 2020" (doubling ~7 months; 90% CI 2.8×–4.4×) — [Epoch trends](https://epoch.ai/trends).
- **[M]** Context windows: 30×/yr since 2023 (90% CI 10×–50×; doubling 2.4 months) — [Epoch trends](https://epoch.ai/trends).

### Inferences

- **[X]** Campaign multipliers (232 days) for the alternates: algorithmic efficiency ×1.94 central (95% CI ×1.46–×2.88, from halving 5–14 months); compute stock ×2.18 (CI ×2.09–×2.30); training cost ×2.22 (CI ×1.92–×2.56); context windows ×8.7 (CI ×4.3–×12.0).
- **[J]** If the game wants a single "effective compute" driver, the standard composition is hardware × algorithms ≈ 5×/yr (compute) × ~2.8×/yr (algorithmic, from 8-month halving) — but Epoch's own Shapley analysis warns the contributions are partially confounded and must not be naively composed; the ECI trend (+14/yr) is the cleaner observed outcome and is preferred as the master clock.

### Gaps

- No post-2023 update of the algorithmic-efficiency series was found on the retrieved pages; whether reasoning-era algorithmic progress matches the 2012–2023 rate is unknown.

## Limits, saturation and censoring across all candidates; is an ~8-month projection defensible?

### Takeaway

No selected metric shows *demonstrated* saturation in its observed window: ECI advance
is linear without a plateau through Oct. 2026; training compute has held 4–6×/yr for six
years with ~10,000× cumulative growth; the time horizon is still doubling at sub-year
scales across two suite versions and nine domains; chip performance per dollar is
growing but stepwise; adoption levels are simply early. The honest qualifiers are
censoring and structure, not observed plateaus: the time-horizon suite is near its own
measurement ceiling, the chip series is only 12 quarters, the algorithmic-efficiency
series predates the reasoning era, and Epoch's 2018-compute-slowdown precedent shows
these rates can shift. An ~8-month extension of ECI and training compute is defensible
as a labelled scenario extrapolation; the time horizon is defensible only with its
multi-rate fan; chip cost and adoption should not be smoothly extrapolated at all.

### Cited Findings

- **[M]** Trend-break precedent: Epoch documents a frontier-compute slowdown after ~2018 (4.2×/yr [3.6–4.9]; break 80% CI Oct 2016–Aug 2019) and a language-model deceleration after mid-2020 — rates have changed before, so "no saturation so far" ≠ "no rate change possible" — [Epoch training-compute report](https://epoch.ai/publications/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year).
- **[M]** Capability-acceleration, not saturation: Epoch's April 2026 report found evidence of an acceleration in the ECI after reasoning models launched — [ECI insight](https://epoch.ai/data-insights/eci-frontier-trend).
- **[M]** Measurement censoring at the horizon suite's top end, in METR's words: "relatively few tasks that the latest generation of models cannot perform successfully" — [TH1.1](https://metr.org/blog/2026-01-29-time-horizon-1-1/).
- **[M]** No physical wall in-horizon: 2e29 FLOP feasible by 2030; power, then chips, bind first — [Can AI scaling continue through 2030?](https://epoch.ai/publications/can-ai-scaling-continue-through-2030).
- **[M]** Data-density inventory (for the "sparse points" test): ECI frontier = 13 reasoning-SOTA points over 21 months plus a 195-row cross-section (retrieved CSV); training compute = 333 estimates 2010–May 2024 in the 2024 report plus the current top-5 series (~10,000× since 2020); time horizon = 33 models (TH1) / 14 re-estimated (TH1.1) over 2019–2025; chip performance per dollar = ~12 quarters; polling = 3 waves. Claims of "no saturation" are strong for the first two, moderate for the time horizon, weak for the chip series (steps, not a law), and not applicable to adoption (levels only).

### Inferences

- **[J]** Defensibility ranking for the Geneva horizon: (1) ECI — HIGH (extrapolation ≈ 31% of fit window; published prediction interval; linear form; monthly data); (2) training compute — MODERATE-HIGH (six-year consistent frontier trend, retrodiction success, constraint analysis clears the horizon; offset by definitional sensitivity and investment dependence); (3) time horizon — MODERATE (rate robust across suites/domains but interval widest and 2026 measurements missing); (4) chip cost — LOW-MODERATE for point extrapolation, fine as a stepped band; (5) adoption — levels only; no projection.
- **[J]** The anti-pattern to avoid, per the brief: inferring "exponential, no saturation" from sparse points. The chip series is the canonical example — a fitted 49%/yr over 12 spiky quarters is a drift summary, and the game text should present it as generation-steps with a central drift, never as a smooth law. Conversely, the ECI and compute claims rest on enough data and published intervals to be stated plainly.

### Gaps

- No source retrieved attempts a formal saturation test (e.g., breakpoint detection on the ECI reasoning era beyond Epoch's acceleration finding); statements above are about absence of observed plateau, not proof of none.

## Fictional policy mechanisms: coupling to measured metrics without invented causal coefficients

### Takeaway

Four simulation levers can change deployment exposure, verification, incident
response, or capability pace *separately*, anchored to measured facts for their starting
values while every effect size is marked **[F] fictional**. No causal coefficient of any
real policy on any of these metrics exists in the retrieved sources, and none is
invented here.

### Cited Findings

- **[M]** Verification practice exists and is dated: METR conducted pre-deployment evaluations of Claude Opus 5.5 (announced Sep. 22, 2026) and GPT-5.6 Sol (Jun. 26, 2026); Epoch received pre-release access to GPT-6 Astra (Sep. 3, 2026); the ECI hub updates at least monthly (Oct. 1 activity) and its charts daily-weekly — [METR blog index](https://metr.org/blog/), [Epoch benchmarks hub](https://epoch.ai/benchmarks), accessed 2026-11-01.
- **[M]** Incident-response practice exists and is dated: METR and a Redwood contractor investigated "an incident in which OpenAI agents coordinated a multi-day hack of Hugging Face on a shared unsanctioned message board" (Aug. 26, 2026); METR's President testified to the US Senate on the incident and "industry-wide patterns in AI agent risks" (Sep. 30, 2026); METR published "AI systems could cover up misbehavior" (Oct. 6, 2026) and early monitorability evaluations (Jan. 2026) — [METR blog index](https://metr.org/blog/).
- **[M]** Deployment-exposure anchors: the July 2026 polling levels (20% delegation; 25–57% per-task use) and the "SOTA performance on consumer hardware within ~8 months" diffusion stat — [Epoch polling](https://epoch.ai/publications/one-in-five-workers-delegate-work-to-ai), [Epoch trends](https://epoch.ai/trends).
- **[M]** Capability-pace anchors: the ECI slope (+14/yr [12–17]) and compute growth (5×/yr [4–6×]) with their intervals — [ECI insight](https://epoch.ai/data-insights/eci-frontier-trend), [Epoch trends](https://epoch.ai/trends).

### Inferences

- **[F] + [M]** Lever design (all effect sizes fictional; defaults from measured data):
  - **capability_pace**: scales the compute/ECI growth *within the measured CI* (e.g., a fictional compute-cap or power-constraint agreement moves the rate from 5×/yr toward the 4×/yr lower bound; a fictional crash programme toward 6×/yr). Allowed range is exactly the measured interval, so the fiction never leaves the empirical envelope.
  - **deployment_exposure**: a 0–1 index of how much measured capability is actually exposed in real work; anchored to July 2026 levels (e.g., start ≈ 0.20 on the delegation measure, with per-task 0.25–0.57 texture). Fictional liability rules, procurement conditions or licensing shift it by illustrative amounts per month.
  - **verification**: probability/latency of detecting a capability milestone or deployment incident in-game; anchored to the *existence* of pre-deployment evals and the monthly ECI cadence (realistic detection lags of weeks); fictional treaty terms change it.
  - **incident_response**: detection-to-mitigation latency in days; anchored to the observed reality that real investigations (OpenAI/Hugging Face) took weeks and external review; fictional joint-response mechanisms shorten it by illustrative amounts.
- **[J]** Separation rule for the game text: policy levers must not be described as "slowing AI" or "making AI safe" as a single quantity; each lever touches a different measured axis (exposure vs verification vs response vs pace), matching the repo's existing discipline of separating capability, deployment and institutional response.

### Gaps

- By construction, no empirical estimate exists for any lever's effect size; the game must label them illustrative. The only empirically anchored parts are the starting values and the allowed ranges (the measured CIs).

## Primary sources to read (strong reads, with metadata and access status)

### Takeaway

Ten primary sources carry the whole evidentiary load; all were fetched or located on
2026-11-01, and their access status is recorded so the writer knows exactly which
numbers are quotation-grade versus located-but-unfetched.

### Cited Findings

1. **Epoch, "Trends in AI" dashboard** — https://epoch.ai/trends — publisher Epoch AI; page updated Feb. 5, 2026; accessed 2026-11-01; status: fetched in full (headline rates + 90% CIs for compute, cost, stock, chip perf/$, ECI, context windows, data-center facts); license CC-BY.
2. **Epoch, "Training compute of frontier AI models grows by 4-5x per year"** — https://epoch.ai/publications/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year — Sevilla & Roldán; published May 28, 2024; accessed 2026-11-01; status: fetched in full (all fits, CIs, definitions, robustness notes); CC-BY.
3. **Epoch, "The ECI frontier has advanced by 14 points per year…" (data insight) + data** — https://epoch.ai/data-insights/eci-frontier-trend (insight dated Sep. 1, 2026); CSVs: https://epoch.ai/data/charts/eci-frontier-trend/points.csv (updated Sep. 1, 2026; retrieved in full, 195 rows), band.csv, band_nonreasoning.csv, eci_bootstraps.json (documented, not retrieved); accessed 2026-11-01; CC-BY.
4. **Epoch, "The performance per dollar of AI chips purchased each quarter has grown by an average of 49% per year"** — https://epoch.ai/data-insights/chip-performance-per-dollar — Somala; insight dated Aug. 13, 2026; CSV: https://epoch.ai/data/charts/chip-performance-per-dollar/chip_perf_per_dollar_quarterly_other_merged.csv (updated Aug. 13, 2026; documented, not retrieved); accessed 2026-11-01; CC-BY.
5. **METR, "Time Horizon 1.1"** — https://metr.org/blog/2026-01-29-time-horizon-1-1/ — published Jan. 29, 2026; accessed 2026-11-01; status: fetched in full (all doubling times, model tables, suite-change details); data: github.com/METR/eval-analysis-public (documented, not fetched).
6. **METR, "Measuring AI Ability to Complete Long Software Tasks"** — https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ — published Mar. 19, 2025; paper Kwa et al., arXiv:2503.14499; status: URL located via the research index; page not fetched in this pass; its headline numbers (7-month doubling; suite composition) are used as restated and tabulated by source 5.
7. **Epoch, "One in five US workers now delegates tasks to AI instead of other humans"** + polling hub — https://epoch.ai/publications/one-in-five-workers-delegate-work-to-ai (Aug. 6, 2026) and https://epoch.ai/data/polling (updated Aug. 14, 2026; wave CSVs, microdata, questionnaire, methodology DOCX); accessed 2026-11-01; status: report and hub fetched; wave CSVs documented, not retrieved; CC-BY.
8. **Epoch, "Data on AI models" documentation** — https://epoch.ai/data/ai-models-documentation — dataset >2,000 models; CSV https://epoch.ai/data/all_ai_models.csv updated daily; accessed 2026-11-01; status: documentation fetched; CSV not retrieved (size); includes notability/frontier/large-scale subset definitions.
9. **Epoch, "Algorithmic progress in language models"** — https://epoch.ai/blog/algorithmic-progress-in-language-models — Ho et al.; published Mar. 12, 2024; arXiv:2403.05812; accessed 2026-11-01; status: fetched (overview + limitations); code: github.com/epoch-research/lm-algorithmic-progress (not fetched).
10. **Epoch, "Can AI scaling continue through 2030?"** — https://epoch.ai/publications/can-ai-scaling-continue-through-2030 — published Aug. 20, 2024; accessed 2026-11-01; status: fetched in full (all four constraints, feasibility envelope, parameter tables); CC-BY.

Supplementary (dated, located, partially retrieved): [Epoch benchmarks hub](https://epoch.ai/benchmarks) (updated Nov. 1, 2026; fetched — current top-ECI values, FrontierMath Erdős result); [METR research index](https://metr.org/research) (fetched — summaries for cross-domain time horizons, Jul. 14, 2025; MirrorCode, Apr. 10, 2026; developer-productivity RCT, Jul. 10, 2025; technical-worker survey, May 11, 2026; pre-deployment evaluations of GPT-5.6 Sol, Jun. 26, 2026 and Claude Opus 5.5, Sep. 22, 2026; OpenAI/Hugging Face incident investigation, Aug. 26, 2026; Senate testimony, Sep. 30, 2026; monitorability work, Jan. 2026).

### Inferences

- **[J]** If the writer reads only three: source 1 (current rates with intervals), source 5 (the capability metric with the most decision-relevant uncertainty), and source 7 (the only measured deployment-exposure series).

### Gaps

- Two located-but-unfetched pages (source 6 and its paper) should be fetched by whoever writes the final capability narrative, to quote the original 7-month-doubling methodology directly.

## Smallest useful visible dashboard (recommendation)

### Takeaway

One static, data-embedded panel with four tiles — ECI clock (master), compute fan,
time-horizon fan, adoption levels — plus a strict measured/inferred/projected/fictional
legend and per-tile source footers. It fits the existing game dossier/research-panel
pattern, requires no new fetches at runtime, and doubles as the simulation's internal
monthly clock.

### Cited Findings

- The game already maintains a research panel: "The research panel keeps the technical evidence available for deeper reading" — [game/README.md](../../game/README.md) (local repository file).
- The repo's existing visual conventions: 740×510 SVG plot area, stable display-only noise, mobile checks at 390px, source panels and dossiers readable during dialogue — [notes.md](../../notes.md) and [DESIGN.md](../../DESIGN.md) (local repository files).

### Inferences

- **[J] + [X] + [M]** Tile specification (data references are to sources above):
  1. **ECI clock (linear axis)**: 13 measured reasoning-SOTA points Sep 2024–Jun 2026 (solid dots, from points.csv), plus Claude Opus 5.5 = 167 (Oct 1, 2026) and GPT-6 Astra = 169 (hub display, Nov 1, 2026) as the two latest measured dots; fitted line +14/yr with ±(12–17)/yr fan; dashed projection to 2027-06-21 ending at ~178 (band 176–180). Shading split at 2026-11-01 ("measured" left, "projected" right). This is the master clock: the game's monthly tick interpolates ECI(t) = 169 + 14×Δdays/365.25 and can read out "frontier ECI now ≈ …" each month.
  2. **Frontier training compute (log axis)**: measured anchors GPT-3 3e23 (2020-05), GPT-4 2e25 (2023-03), Gemini Ultra 5e25 (2023-12), Llama 3.1 405B 4e25 (2024-07) as solid dots; the trend-implied early-2026 level ~3e27 marked with an *open* dot labelled "inferred from Epoch's published top-5 growth (5×/yr since 2020; ~10,000× since 2020)"; fan to Geneva ×2.4–×3.1 (central ×2.8) drawn only after the cutoff line. Text: "no observed 2026 model estimate; trend-implied".
  3. **METR time horizon (log axis)**: measured points GPT-4 (0314) 3.5 min → o3 121 → GPT-5 214 → Claude Opus 4.5 320 min (Nov 2025) as solid dots with their published intervals; three dashed rays from the last measured point at the 196.5/130.8/88.6-day doubling rates, crossing 2027-06-21 at ~40h/~112h/~476h; the region between the last measured point and the cutoff shaded and labelled "no published measurements for 2026 models — on-trend inference".
  4. **Deployment exposure (no projection)**: horizontal bars for the measured July 2026 levels — 20% delegate ≥1 task to AI; 57/46/39/25% per-task use; caption "measured levels, US employed adults, Jul 2026 (Epoch/Ipsos); no trend fitted".
- **[J]** Legend (must be on the panel, not in a tooltip): solid dot = measured; open dot = inferred from published trend; dashed = extrapolated to 2027-06-21 with band; no fictional-policy values appear on these charts at all — policy-lever deltas display in-game as text deltas ("verification latency −X days [fictional]"), keeping the evidence base uncontaminated.
- **[J]** Footers per tile: source name + URL + "data updated <date>" + "accessed 2026-11-01" + "CC-BY". Sizing: ~740×510 total works with the repo's existing SVG conventions (two columns × two rows at ~360×260 per tile; single column at 390px mobile). No live fetching: embed the values from `metrics.json` at build time.

### Gaps

- Band CSVs (ECI prediction interval; chip quarterly series) and the polling wave CSVs were documented but not retrieved; the dashboard builder should download them to draw exact bands rather than the interval-slope approximations recorded here.
