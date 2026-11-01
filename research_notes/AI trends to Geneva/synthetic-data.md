# Synthetic data, agent traces and the recirculation problem (evidence for a Geneva-facing game variable)

> Review correction: [synthetic-data-check.md](synthetic-data-check.md) supersedes
> this initial note wherever they differ. The full S1 paper has a 62-month series,
> published detector error estimates and its own forecast; the initial abstract-only
> claims that these were absent are incorrect. The detector-vendor authorship and
> lack of an autonomous-writing time series remain important limitations. Do not
> use the initial note alone to parameterise the game.

Observation date: **1 November 2026**. Horizon: **Geneva, June 2027** (planning target, not an independently verified event date). Scope: whether AI systems leave growing traces on the open Internet that alter or bias later training rounds — and what can honestly be turned into a game variable. Companion: `synthetic-data.json`.

**Read this first.** Widely repeated claims such as "half the Internet is now AI-generated" are not supported by any source retrieved here. The best available measurements are (a) token shares inside *filtered English web crawls*, (b) lower bounds inside *one publication corpus*, and (c) crawler-to-referral ratios. Each is population-specific and detector-dependent. Nothing below licenses a global percentage, and nothing below establishes that collapse is inevitable or already happening at frontier scale.

## Q1. How much of the web is model-generated, and how well is that measured?

### Takeaway
Two independent literatures now measure model-derived text at real scale, and both produce *lower bounds on a defined population*, not a share of "the Internet". The newest and most useful number comes from a pretraining-corpus study: 27.5% of tokens in a June 2026 filtered web crawl were labelled AI-generated, rising to 31.1% by August 2026 — inside one vendor's detector, in one English-centric crawl.

### Cited Findings
- **S1** Russell et al. apply FineWeb quality filtering to June 2026 and August 2026 web data and find **27.5% of tokens labelled AI-generated in June, 31.1% by August**, using the commercial Pangram detector. They then pretrain **800 language models** at varying ratios of added AI to human tokens and fit scaling laws on held-out loss. For data-starved models, added AI tokens initially *lower* loss on human text, the benefit saturates, then **reverses into harm**; for models trained on high human-token budgets, AI tokens **raise loss almost immediately** while fresh human tokens keep lowering it. Standard scaling laws (Hoffman et al. 2022) fail to predict this; their replacement law adds separate benefit and harm terms, allows the value of an AI token to change sign, and reduces to Chinchilla when AI text is absent. Fitted on smaller models it predicts effects for models up to **3.6× larger with 41% lower error** than the best existing law across AI ratios. They release **WildAI, an 83B-token corpus with AI, topic and format labels** ([arXiv:2609.40295](https://arxiv.org/abs/2609.40295), submitted 2026-09-30).
- **S2** Kobak et al. study vocabulary change in **over 15 million PubMed abstracts, 2010–2024**, and estimate that **at least 13.5% of 2024 abstracts were processed with LLMs**, reaching **40% in some subcorpora**; they describe this as a lower bound, differing by discipline, country and journal, and larger in effect than the Covid pandemic ([Science Advances 11(27)](https://doi.org/10.1126/sciadv.adt3813), published 2025-07-02; preprint [arXiv:2406.07016](https://arxiv.org/abs/2406.07016)).
- **S3** Liang et al. estimate **6.5%–16.9% of submitted peer-review text** at ICLR 2024, NeurIPS 2023, CoRL 2023 and EMNLP 2023 was "substantially modified" by LLMs, using a maximum-likelihood model calibrated against expert-written and AI-generated reference texts; the share is higher in low-confidence reviews, near-deadline submissions and reviewers who do not respond to rebuttals ([arXiv:2403.07183](https://arxiv.org/abs/2403.07183), ICML '24; v1 2024-03-11, v4 2026-05-19).
- **Defect common to all three:** none of these is a census, none reports a detector false-positive rate on human-only control text in the retrieved abstract, and none measures page counts, traffic or reading. Token share in a filtered crawl ≠ share of pages ≠ share of what people read.

### Inferences
- The defensible statement is directional and bounded: *model-derived text is a large and growing fraction of the material that pretraining pipelines ingest, measured at 27.5%→31.1% of tokens in one filtered crawl over two months (S1), and at ≥13.5% of 2024 biomedical abstracts (S2).*
- Because S1 and S2 use unrelated methods on unrelated populations and land in the same order of magnitude, the *direction* is corroborated. The *level* is not transferable to "the web".
- S1's central result is more important than its percentage: the marginal value of an AI token is **not constant and can change sign**, which is exactly the mechanism a game needs to represent — and exactly the thing a single percentage cannot express.

### Gaps
- No retrieved study reports detector precision/recall on a human-authored control set for web-scale AI-text labelling, so the 27.5%/31.1% figures carry unknown measurement error. Pangram is a commercial detector; independent replication was not found.
- No measurement of AI-generated *images, video or audio* prevalence at web scale was retrieved.
- Non-English web prevalence is unmeasured in the sources retrieved.

## Q2. What do agents actually *do* to the web, as distinct from what models write?

### Takeaway
The only well-documented, methodologically explicit agent-side quantity is **crawling** (read) behaviour; there is a public weekly time series for it. Autonomous *write* actions — agents posting, filing, committing, transacting — have no audited census in the sources retrieved, and should not be inferred from crawl data.

### Cited Findings
- Cloudflare publishes a **crawl-to-refer ratio**: HTML requests from a platform's user agents divided by HTML requests whose `Referer` names that platform, normalised to one referral. For **19–26 June 2025** the range ran from **Anthropic at 70,900:1** to **Mistral at 0.1:1** (Mistral sent ~10× more referrals than crawls). Their own stated caveat: native-app referrals carry no `Referer`, so **ratios may be overstated by an unclear amount**; and ratios move week to week with crawling policy changes (Google's fell 19.4% week-on-week during an observed `GoogleBot` drop) ([Cloudflare blog, 2025-07-01](https://blog.cloudflare.com/ai-search-crawl-refer-ratio-on-radar/)).
- The same metric exists as a **public time series** with API endpoints and a Data Explorer view, so cadence and population are documented rather than anecdotal (same source).
- Cloudflare changed its default on **1 July 2025** to **block AI crawlers unless they pay**, describing the prior search deal (crawl for traffic) as broken ([Cloudflare, 2025-07-01](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/)).
- Autonomous *write* behaviour appears in the literature only as an assumption inside experimental designs (agents acting in benchmark environments, e.g. fictional-world search environments), not as measured Internet traffic ([arXiv:2609.40221](https://arxiv.org/abs/2609.40221), 2026-09-30) — noted as a gap, not evidence.

### Inferences
- Reads and writes must be separate variables. Crawl volume is measurable monthly and is already distorted by blocking policy; write volume (agent-published content) is currently observable only indirectly, through the AI-text prevalence studies in Q1, which do not attribute text to autonomous agents versus human-directed tools.
- The 70,900:1 figure is a **ratio of requests, not of value or of content created**, and it is a platform-attribution measurement, not an economic one.

### Gaps
- No source retrieved quantifies the share of newly published web content produced by *autonomous* agents (as opposed to humans using assistants). This is the single largest hole in the "agents leave growing traces" claim.
- No audited count of agent-initiated transactions, filings, commits or edits was found.

## Q3. Does benchmark contamination actually change measured capability?

### Takeaway
Yes, measurably, in controlled settings — but the size is benchmark-specific and, importantly, contamination usually **inflates absolute scores without reordering leaderboards**. Contamination is therefore a validity problem for *claims about capability levels*, not automatically a ranking crisis.

### Cited Findings
- **S7** LeakScale makes benchmark exposure *manipulable*: fresh executable tasks whose answers depend on private, non-derivable information, with counterfactual certification and paired adapters so each task family is exposed in exactly one adapter. Across **2,048 families, 2 model families, 2 domains, 3 task formulations and 589,824 generations**, exposure raised exact-task accuracy in **every** model-by-domain cell, with primary effects of **+3.22 to +10.66 percentage points**, all family-clustered 95% intervals excluding zero, surviving Holm correction, and remaining positive across all eight paraphrase and isomorphic-transfer measurements ([arXiv:2609.27176](https://arxiv.org/abs/2609.27176), v1 2026-09-23, v3 2026-10-23).
- **S8** Xiao & Cheng measure contamination as a **within-item** contrast between original and semantically equivalent paraphrased items, calibrated on **74 models fine-tuned with a known contamination dose** (recovering a corrected effect of **+0.187 accuracy points**, and not flagging a negative control at **−0.012**), then applied to **47 public models across ARC, GSM8K, HellaSwag and MMLU**. The rank correlation between a standard leaderboard and a paraphrase-controlled leaderboard is **0.997**; only **3 of 188** model-by-benchmark cases showed differential contamination corroborated across two references. Their conclusion: contamination is largely **uniform**, inflating scores without reordering, and ranking distortion requires the rare *differential* case ([arXiv:2609.02899](https://arxiv.org/abs/2609.02899), 2026-07-05).
- **S10** GSM1k, a benchmark built to mirror GSM8k on human solve rate, step count and answer magnitude, produced accuracy drops of **up to 8%**, with systematic overfitting across almost all sizes in several model families (Spearman r² = **0.36** between the probability of generating a GSM8k item and the GSM8k–GSM1k gap) — while **many frontier models showed minimal overfitting** and all models generalised to novel problems ([arXiv:2405.00332](https://arxiv.org/abs/2405.00332), NeurIPS 2024 D&B; v4 2024-11-22).
- **Contrary methodological finding:** a 2026 attempt to detect contamination from internal activations found its own protocol failed, and **withdrew its only nominally significant result** (p = 0.0075 → 0.0745 once the control's sampling variance was propagated) ([arXiv:2608.12652](https://arxiv.org/abs/2608.12652), v2 2026-08-16). Detection methods are not yet reliable enough to audit a corpus at scale.

### Inferences
- Contamination is best modelled as a **score-inflation term with a possible differential component**, not a binary "corrupted benchmark" flag. S8's 0.997 rank correlation is the strongest available counterweight to catastrophic framings.
- S7's causal design is the right template for any claim a coalition wants to make: manipulate exposure, certify answers, report effect sizes with intervals. It also warns that effects survive paraphrase, so "our benchmark is private" is not by itself a defence — only *unseen* items are.

### Gaps
- No retrieved study estimates contamination rates for *contamination introduced by agents writing into public repositories and corpora* specifically; the mechanism is plausible but unmeasured.
- Effect sizes come from constructed exposure on executable tasks; transfer to open-ended capability claims is untested.

## Q4. Does synthetic-data feedback cause collapse in practice?

### Takeaway
The honest answer is conditional, and the 2024–2026 literature has converged on the condition rather than the catastrophe: **replacement** of real data by synthetic data degrades generation after generation; **accumulation** of synthetic data alongside retained real data bounds the error. A third, more realistic regime — fixed training budget with a growing pool — degrades *partially*.

### Cited Findings
- **S4** Shumailov et al. define model collapse as a degenerative process in which generated data pollute the next generation's training set, with early collapse (tails lost) and late collapse (convergence to low variance). The Gaussian case is proved: expected Wasserstein-2 distance to the true distribution **diverges to infinity** while the estimated variance **→ 0 almost surely** as generations increase. Empirically they fine-tune **OPT-125m on wikitext2** across generations: with **no original data retained**, perplexity degraded across generations; with **10% of the original data preserved over ten epochs**, degradation was "only minor". They conclude that access to genuine human interaction data becomes *more* valuable as model-generated text spreads, and that provenance of crawled content is an open problem ([Nature 631:755–759](https://www.nature.com/articles/s41586-024-07566-y), published 2024-07-24; received 2023-10-20; an author correction was published 2025-03-21, which I did not read — treat the correction as unverified).
- **S5** Gerstgrasser et al. show the collapse results largely assumed data *replace* old data; under *accumulation*, pretraining sequences of language models on successive synthetic generations **alongside the original real data avoids collapse**, with a finite upper bound on test error independent of the number of iterations, holding across model sizes, architectures and hyperparameters, and replicated for diffusion models on molecule conformations and VAEs on images ([arXiv:2404.01413](https://arxiv.org/abs/2404.01413), v2 2024-04-29).
- **S6** Malet & Turinici test the intermediate regime typical of real pipelines: **all** past data and the real data are kept, but each new model trains on a **fixed-size sample** from the growing pool, so the real fraction vanishes without anything being deleted. On a 2D spiral, MNIST, Fashion-MNIST and CIFAR-10, **replacement degrades rapidly** as in the literature, while **fixed budget degrades only partially, sparing some features**; a linear-response model shows some features are lost within a few generations under both protocols while others are preserved over "practically unbounded horizons" under fixed budget ([arXiv:2610.01318](https://arxiv.org/abs/2610.01318), 2026-10-01, NeurIPS 2026 PriGM workshop).
- **Contrary to the "inevitable" reading:** S1 finds AI tokens *improve* held-out loss for data-starved models before turning harmful, and S5 proves a bounded-error regime exists. **Contrary to the "solved" reading:** a 2026 spectral study reports that at sampling temperature < 1, **even data accumulation does not arrest the drift** toward a deterministic operator ([arXiv:2610.30009](https://arxiv.org/abs/2610.30009), 2026-10-21).

### Inferences
- "Model collapse" is not a prediction about the Internet; it is a family of results about a **protocol** (replace vs accumulate vs fixed-budget) and about **sampling temperature and filtering**. Any game variable must expose the protocol as a lever, or it will encode the most pessimistic assumption as if it were physics.
- S4's own 10%-retention arm is the cheapest, best-evidenced mitigation in the whole literature: retain a fixed fraction of verified human data.

### Gaps
- All collapse experiments use small models (OPT-125m, 124M–8B scale) over few generations. No retrieved study demonstrates collapse at frontier pretraining scale on real crawls.
- No retrieved field evidence that any deployed frontier model has degraded because of web contamination.

## Q5. When is curated synthetic data genuinely useful?

### Takeaway
Synthetic data is a demonstrated capability multiplier when it is *filtered, verified or diversity-preserving* — and the curation step is where the value is created, not the synthesis.

### Cited Findings
- **S13** phi-3-mini, **3.8B parameters trained on 3.3T tokens** of "heavily filtered publicly available web data and synthetic data", reports **69% MMLU and 8.38 MT-Bench**, rivalling Mixtral 8x7B and GPT-3.5 — a vendor technical report, not an independent evaluation ([arXiv:2404.14219](https://arxiv.org/abs/2404.14219), v4 2024-08-30).
- **S15** A non-parametric **entropy-rate filter** (Kontoyiannis estimator, computable from raw text with no model) applied over a **six-generation QLoRA collapse experiment on Llama-3.1-8B** yielded **+42% unique trigrams, +30% vocabulary and −19% repetition** (all p < 0.001), whereas the established log-probability-based filter gave **no significant diversity benefit on any metric** (p > 0.23) ([arXiv:2610.01493](https://arxiv.org/abs/2610.01493), 2026-10-01, NeurIPS 2026).
- **S14** In a linear-regression framework for **verified self-training**, three counterintuitive results: **tighter verification does not always lower prediction risk**; a *suitable* level of injected generation noise can reduce risk while excessive noise increases it; and full versus partial fine-tuning respond differently to the same verification rule. Finite-sample risk bounds are given for four regimes determined by the relative scales of verification threshold, generation noise and pre-training error ([arXiv:2610.40254](https://arxiv.org/abs/2610.40254), 2026-10-29).

### Inferences
- Curation is a **threshold with an interior optimum**, not a monotone dial. A game that rewards "more filtering" linearly would teach the opposite of S14.
- S15 matters for the provenance discussion: text-diversity can be measured **without model access**, which makes third-party audit of a training corpus technically feasible in a way log-probability filtering is not.

### Gaps
- No retrieved independent replication of S13's benchmark numbers, and no ablation isolating the synthetic share for phi-3.
- No retrieved cost accounting for curation at pretraining scale.

## Q6. Can provenance be established at scale?

### Takeaway
Partly, and less than the policy conversation assumes. Consent signals are measurable and deteriorating; but **machine detection of training-data membership is close to chance** in realistic post-training settings, so provenance currently has to be *institutional and cryptographic*, not *inferred*.

### Cited Findings
- **S9** The first large-scale longitudinal audit of consent protocols across **14,000 web domains** underlying C4, RefinedWeb and Dolma found that in **one year (2023–2024)** restrictions rendered **~5%+ of all C4 tokens**, or **28%+ of the most actively maintained critical sources**, fully restricted; **45% of C4** is restricted by Terms of Service. They diagnose this as protocol failure, not malice, and note the bias to diversity, freshness and scaling ([arXiv:2407.14933](https://arxiv.org/abs/2407.14933), v2 2024-07-24).
- **S11** WildTrace evaluates training-data detection in **realistic large-scale post-training** (SFT, DPO, RL) with distribution-matched members and non-members and verifiable membership labels: the **best method reaches average AUC 0.529** against random guessing at 0.5, and evaluation protocol choices materially change measured performance ([arXiv:2610.16152](https://arxiv.org/abs/2610.16152), 2026-10-12).
- **S1** releases a corpus carrying **AI, topic and format labels** — a working example of provenance-by-construction at 83B tokens, and the only retrieved artifact that makes "is this text model-derived?" a *labelled field* rather than an inference.
- **S8** recommend that leaderboards publish **paraphrase-controlled rankings alongside confidence intervals** — an evaluation-isolation practice that reduces reliance on provenance claims about training corpora.

### Inferences
- Three distinct provenance regimes exist and must not be conflated: **(i) declared** (licence, robots.txt, ToS — measurable, deteriorating, S9); **(ii) labelled** (corpus-level AI/topic/format tags — feasible, S1); **(iii) inferred** (membership detection, watermark, classifier — currently near-chance in realistic settings, S11). Only (i) and (ii) can carry a policy obligation today.
- Because (iii) is weak, an agent that writes to the web is effectively **unattributable after the fact** unless labelling happened at creation. That is the strongest technical argument in this note for provenance-at-source rather than provenance-by-audit.

### Gaps
- **EU AI Act Article 53 training-content summary and California AB 2013 were not retrieved or verified this session.** Their existence, exact obligations and effective dates must be confirmed against EUR-Lex and leginfo.ca.gov before any policy claim; do not cite them from memory. (Attempted retrieval of the Commission template page returned 404 on 2026-11-01.)
- No retrieved evaluation of whether C2PA-style content credentials survive into pretraining corpora, or of adoption rates.

## Q7. Time series or snapshot — and can any of it become a game variable?

### Takeaway
There is **one genuinely scalable, public, weekly series** (crawler-to-referral ratios), **one 15-year annual series** (excess vocabulary in PubMed), and for the headline prevalence question only **two monthly snapshots**. Therefore: scenario bands, never extrapolation.

### Series inventory

| Series | Cadence / span | Population | Public & reproducible | Extrapolable? |
|---|---|---|---|---|
| AI-token share (S1) | 2 points (Jun, Aug 2026) | FineWeb-filtered English crawl, one detector | Corpus released (WildAI); detector commercial | **No** — 2 points, unknown FP rate |
| Excess vocabulary (S2) | Annual, 2010–2024 | PubMed abstracts | Method + data described | Only within PubMed; lower bound only |
| Peer-review LLM text (S3) | Per conference cycle 2023–24 | 4 ML conferences | Method published | No — venue-specific |
| Crawl-to-refer (S12) | **Weekly, ongoing, API** | Cloudflare-observed HTTP | Yes (Radar API) | Yes as a *crawling* series; breaks on policy change |
| Consent restriction (S9) | Annual, 2023–2024 | 14,000 domains in 3 corpora | Yes | Direction only |
| Collapse generations (S4–S6) | 5–10 generations | Small models, lab corpora | Code released | **No** — not a web measurement |

**Answer to "is any metric extrapolable":** no. Two points cannot identify a trend; the detector's error rate is unpublished; and S12's own publisher documents regime breaks caused by blocking policy — i.e. the measurement is endogenous to the behaviour being measured. By June 2027 a continued monthly pipeline would yield roughly **twelve more observations**, which is the minimum that would make a trend claim arguable. That is a *proposal for what to demand*, not a forecast.

### Proposed game variable

One state, three levers, one declared-sensitivity update. Deliberately simple enough to explain in a summit briefing.

**State — `traceLoad` T ∈ [0,1]:** share of tokens newly ingested into the next training round that are model-derived, carried as an **interval** `[T_lo, T_hi]`, never a point. Scenario seeds: low 0.10 / central 0.28 / high 0.45, labelled "scenario, not forecast", anchored to S1's two observations with the spread standing in for detector and population uncertainty.

**Levers (each a real, dated institutional instrument, not a virtue):**
- `p` — **provenance coverage**: share of ingested tokens carrying a verifiable origin label. Implementations that exist today: labelled corpora (S1's WildAI fields), declared licence/robots state (S9), paid-crawl defaults (S12).
- `e` — **evaluation isolation**: share of benchmark items never published, plus rotation of private held-out sets. Implements S7's unseen-item requirement and S8's paraphrase-controlled reporting.
- `c` — **curation retention**: fraction of verified human-origin data retained plus diversity filtering strength. Implements S4's 10%-retention result, S5's accumulation, S15's entropy filter — with an **interior optimum**, per S14.

**Update rule (declared, not estimated):**

```
fresh_g   = (1 - T_g) * c_g * (1 - lambda * (1 - p_g))     # verifiable human signal reaching the model
T_{g+1}   = clamp( T_g + alpha * (1 - p_g) * inflow_g - beta * c_g * T_g , 0, 1 )
```

`alpha`, `beta`, `lambda` are **scenario parameters with no fitted value**. `inflow_g` is the exogenous rate at which model-derived text enters the pool. The only empirically anchored behaviours the model may display are **orderings**: accumulation beats replacement (S5, S6); retaining verified human data beats discarding it (S4); tighter curation is not monotonically better (S14); marginal value of an AI token can change sign (S1).

**What the variable must refuse to output:** a probability of collapse, a year of collapse, a dollar value of avoided harm, or a single prevalence number for "the Internet".

### Safeguards and how to audit them

| Safeguard | Concrete instrument | Evidence it can work | What it does *not* prove |
|---|---|---|---|
| Provenance | labelled-at-creation corpora; declared licence/robots state; paid-crawl defaults | S1 (83B tokens labelled); S9 (measurable consent decline); S12 (enforceable default) | S11: post-hoc membership detection is ~chance, so unlabelled traces are unrecoverable |
| Evaluation isolation | private/unseen item pools; paraphrase-controlled leaderboards with intervals | S7 (exposure effects vanish on unseen items); S8 (0.997 rank correlation, so isolation mainly protects *level* claims) | Does not protect open-ended capability claims; S7 shows effects survive paraphrase |
| Curation | human-data retention floor; model-free diversity filtering; verified self-training with tuned threshold | S4 (10% retention); S5/S6 (accumulation, fixed budget); S15 (+42% trigrams); S14 (interior optimum) | No evidence of frontier-scale effect; no cost accounting |

### Limits to any causal estimate here

1. **No field experiment.** Every effect size in this note comes from a constructed corpus or a lab model. There is no randomised or natural experiment showing that a provenance mandate changed a deployed model's quality.
2. **Detector dependence.** The only web-scale prevalence numbers rest on one commercial classifier with an unpublished error rate (S1). Reversing the sign of the "harm" term would not require a large error.
3. **Scale gap.** Collapse evidence spans OPT-125m to 8B over 5–10 generations; frontier pretraining uses orders of magnitude more verified data and few generations. S6 shows the protocol, not the model size, decides the outcome — which cuts both ways.
4. **Reverse causality / endogeneity.** Crawl ratios (S12) respond to blocking policy; consent restrictions (S9) change the corpus that prevalence is measured on. Measuring the trace changes the trace.
5. **Attribution gap.** No source separates autonomous-agent text from human-directed assistant text, so "agents are doing this" is an inference from tool design, not a measurement.
6. **Uniformity, not catastrophe.** Contamination inflates levels but rarely reorders (S8). A game that shows leaderboards collapsing under contamination would be teaching a result the best current evidence rejects.

### Gaps
- No audited census of autonomous agent write-actions on the public web.
- No detector false-positive/negative calibration on human-authored control text at web scale.
- No frontier-scale test of S4/S5/S6 protocols.
- EU AI Act Art. 53 template and California AB 2013 unverified (see Q6).

## Source ledger

Dates are separated deliberately: **published** (or posted), **event/data period**, **accessed**. All accessed 2026-11-01.

| ID | Source | Published | Data / event period | Status |
|---|---|---|---|---|
| **S1** | Russell et al., *How Much Is an AI Token Worth? Scaling Laws for Wild AI-Generated Web Text*, [arXiv:2609.40295](https://arxiv.org/abs/2609.40295) | 2026-09-30 (v1) | web snapshots Jun & Aug 2026; 800 models | Core. Preprint, not peer-reviewed. Corpus released (WildAI). |
| **S2** | Kobak et al., *Delving into LLM-assisted writing…*, [Science Advances 11(27)](https://doi.org/10.1126/sciadv.adt3813) / [arXiv:2406.07016](https://arxiv.org/abs/2406.07016) | 2025-07-02 | 15M PubMed abstracts, 2010–2024 | Core. Peer-reviewed. |
| **S3** | Liang et al., *Monitoring AI-Modified Content at Scale*, [arXiv:2403.07183](https://arxiv.org/abs/2403.07183) | 2024-03-11 (v1); v4 2026-05-19 | ICLR/NeurIPS/CoRL/EMNLP 2023–24 reviews | Core. ICML '24. |
| **S4** | Shumailov et al., *AI models collapse when trained on recursively generated data*, [Nature 631:755–759](https://www.nature.com/articles/s41586-024-07566-y) | 2024-07-24 (received 2023-10-20) | OPT-125m / wikitext2, 5–10 generations | Core. Peer-reviewed; **correction 2025-03-21 not read**. |
| **S5** | Gerstgrasser et al., *Is Model Collapse Inevitable?*, [arXiv:2404.01413](https://arxiv.org/abs/2404.01413) | 2024-04-29 (v2) | LM sequences, diffusion, VAE | Core. Preprint. |
| **S6** | Malet & Turinici, *Feature Selective Model Collapse…*, [arXiv:2610.01318](https://arxiv.org/abs/2610.01318) | 2026-10-01 | spiral, MNIST, Fashion-MNIST, CIFAR-10 | Core. Workshop paper (NeurIPS 2026 PriGM). |
| **S7** | Singh, *LeakScale*, [arXiv:2609.27176](https://arxiv.org/abs/2609.27176) | 2026-09-23 (v1); v3 2026-10-23 | 2,048 families; 589,824 generations | Core. Preprint. |
| **S8** | Xiao & Cheng, *Contamination Inflates Scores but Rarely Reorders…*, [arXiv:2609.02899](https://arxiv.org/abs/2609.02899) | 2026-07-05 | 47 public + 74 dosed models; 4 benchmarks | Core. Preprint. |
| **S9** | Longpre et al., *Consent in Crisis*, [arXiv:2407.14933](https://arxiv.org/abs/2407.14933) | 2024-07-24 (v2) | 14,000 domains, 2023–2024 | Core. Preprint. |
| S10 | Zhang et al., *GSM1k*, [arXiv:2405.00332](https://arxiv.org/abs/2405.00332) | v4 2024-11-22 | GSM8k vs GSM1k, multiple model families | Supporting. NeurIPS 2024 D&B. |
| S11 | Zhang, Liu & Wei, *WildTrace*, [arXiv:2610.16152](https://arxiv.org/abs/2610.16152) | 2026-10-12 | SFT/DPO/RL post-training, large-scale | Supporting. Preprint. |
| S12 | Cloudflare, *The crawl before the fall… of referrals*, [blog](https://blog.cloudflare.com/ai-search-crawl-refer-ratio-on-radar/) | 2025-07-01 | 19–26 Jun 2025 (+ Radar API series) | Supporting. Vendor measurement, method disclosed. |
| S13 | Abdin et al., *Phi-3 Technical Report*, [arXiv:2404.14219](https://arxiv.org/abs/2404.14219) | v4 2024-08-30 | 3.8B params, 3.3T tokens | Supporting. Vendor report, not independent. |
| S14 | Sheen & Zhou, *Statistical Analysis of Synthetic Data with Verification*, [arXiv:2610.40254](https://arxiv.org/abs/2610.40254) | 2026-10-29 | linear-regression theory | Supporting. Preprint. |
| S15 | Mitchell, *Text Entropy Rate Filtering…*, [arXiv:2610.01493](https://arxiv.org/abs/2610.01493) | 2026-10-01 | 6-generation QLoRA, Llama-3.1-8B | Supporting. NeurIPS 2026. |

## Do not claim (phrasing rules for the report and the game)

- **Not:** "X% of the Internet is AI-generated." **Instead:** "27.5% of tokens in a June-2026 FineWeb-filtered crawl and 31.1% in August 2026 were labelled AI-generated by one commercial detector (S1)."
- **Not:** "AI is collapsing models." **Instead:** "Under replacement, generation quality degrades monotonically in lab models; under accumulation with retained real data, error is bounded (S4, S5); under fixed budget it degrades partially (S6)."
- **Not:** "Benchmarks are contaminated and untrustworthy." **Instead:** "Exposure raises scores by 3.2–10.7 pp on unseen-item-controlled tasks (S7), but observed contamination is largely uniform and rank correlation remains 0.997 (S8)."
- **Not:** "Agents are flooding the web." **Instead:** "Crawling is measured weekly at ratios up to 70,900:1 (S12); autonomous write volume is unmeasured."
- **Not:** "Provenance can be audited." **Instead:** "Declared and labelled provenance can; inferred membership detection is near chance (S11)."
