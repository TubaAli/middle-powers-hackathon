# India, Japan and coalition routes: model audit

## Does the model establish an India/Japan advantage over coalitions?

### Takeaway
**It establishes an assumption-dependent position on an editorial chart, not a measured policy advantage.** Japan and India are both baseline non-dominated points, but there are six such points, including EuroHPC and the Anthropic lender route. The production chart does not define an overall ranking. For this audit's explicitly chosen equal-axis utility, Japan ties Switzerland first; India ranks fourth, behind Singapore's leakage gate. Coalition routes are not one homogeneous class.

### Cited findings
All numerical findings below are computed from the unchanged [six-factor model](../../data/route-placement-model.json) by [reproduce-model-audit.py](reproduce-model-audit.py), with exact outputs in [model-audit.json](model-audit.json). The [production implementation](../../routes/placement.mjs) supplies the weighted-axis and sensitivity formulas. The [prior evidence report](../../reports/Route%20coordinate%20evidence.md) supplies substantive evidence limits; this audit does not independently re-retrieve each national source.

**Definitions.** Higher x and y are preferred. A route is non-dominated when no other route has both coordinates at least as high and at least one strictly higher. We introduce `Uα = αx + (1−α)y`, with **α = 0.5** by default. This additive index assumes cardinal comparability of the editorial axes and is only a preference probe. It is not an implementation probability, expected harm reduction, or an observed coalition payoff. Competition ranks equal one plus the number of strictly better utilities; ties share rank. Pairwise reversal counts exclude ties becoming ordered or ordered pairs becoming tied. Floating comparisons use tolerance `1e-10`.

| Exact route ID | x | y | U₀.₅ | Rank | Non-dominated |
|---|---:|---:|---:|---:|---|
| `eurohpc-incident-protocol` | 0.4750 | 0.7950 | 0.6350 | 9 | yes |
| `jp-procurement-safety-evidence` | 0.8000 | 0.6650 | 0.7325 | 1 | yes |
| `jp-kr-sg-procurement-profile` | 0.4600 | 0.6800 | 0.5700 | 22 | |
| `sg-agent-data-leakage-deployment-gate` | 0.8150 | 0.5950 | 0.7050 | 3 | yes |
| `sg-kr-jp-shared-eval-evidence-protocol` | 0.5600 | 0.5800 | 0.5700 | 22 | |
| `canada-cohere-equity-safety-covenant` | 0.5500 | 0.6900 | 0.6200 | 12 | |
| `taiwan-public-compute-safety-conditions` | 0.6400 | 0.6100 | 0.6250 | 11 | |
| `anthropic-new-credit-lender-safety-covenant` | 0.3700 | 0.8000 | 0.5850 | 20 | yes |
| `lumi-belgium-safety-appendix` | 0.6650 | 0.5300 | 0.5975 | 17 | |
| `lumi-eurohpc-evaluation-access` | 0.6350 | 0.6800 | 0.6575 | 5 | |
| `lumi-national-evidence-protocol` | 0.4600 | 0.6500 | 0.5550 | 24 | |
| `ch-electricity-operator-fallback` | 0.8100 | 0.6550 | 0.7325 | 1 | yes |
| `uk-energy-staged-autonomy-assurance` | 0.5400 | 0.6400 | 0.5900 | 19 | |
| `uk-agent-accountability-evidence` | 0.6800 | 0.6050 | 0.6425 | 7 | |
| `sg-purchaser-sandbox-release-gate` | 0.6850 | 0.6000 | 0.6425 | 7 | |
| `kr-safety-case-incident-rehearsal` | 0.5850 | 0.7150 | 0.6500 | 6 | |
| `brazil-anpd-ai-inspection-evidence` | 0.6450 | 0.6200 | 0.6325 | 10 | |
| `mexico-public-sector-impact-assessment` | 0.5250 | 0.4400 | 0.4825 | 30 | |
| `chile-high-risk-data-impact-assessment` | 0.4100 | 0.5300 | 0.4700 | 32 | |
| `colombia-sic-ai-privacy-retest` | 0.6200 | 0.6050 | 0.6125 | 14 | |
| `south-africa-popia-ai-linkage-review` | 0.6300 | 0.5850 | 0.6075 | 16 | |
| `kenya-biometric-dpia-evidence-gate` | 0.6350 | 0.5900 | 0.6125 | 14 | |
| `nigeria-ai-compliance-audit-annex` | 0.6500 | 0.5400 | 0.5950 | 18 | |
| `rwanda-ai-dpia-security-retest` | 0.5250 | 0.5300 | 0.5275 | 27 | |
| `indiaai-subsidy-evaluation-gate` | 0.6550 | 0.7350 | 0.6950 | 4 | yes |
| `uae-dubai-agentic-assurance-gate` | 0.5550 | 0.5950 | 0.5750 | 21 | |
| `saudi-cst-ai-sandbox-stop-rule` | 0.5300 | 0.5500 | 0.5400 | 25 | |
| `turkiye-1711-safety-work-package` | 0.5400 | 0.5150 | 0.5275 | 27 | |
| `indonesia-bpom-dpia-gate` | 0.5750 | 0.4650 | 0.5200 | 29 | |
| `malaysia-commercial-ai-dpia` | 0.5650 | 0.5000 | 0.5325 | 26 | |
| `thailand-aigpc-sandbox-gate` | 0.4750 | 0.4850 | 0.4800 | 31 | |
| `vietnam-public-ai-impact-gate` | 0.6800 | 0.5600 | 0.6200 | 12 | |

At baseline India dominates all three routes labelled `middle-power`. Japan dominates the shared-evaluation and LUMI-national routes, but **does not dominate** the JP–KR–SG procurement profile: the latter's y is 0.680 versus Japan's 0.665. Nor do India or Japan dominate EuroHPC or Anthropic: those have greater modeled y and lower x. The model's coordination categories contain **26 national, three middle-power, three broader** routes. Their mean utilities are respectively **0.59875, 0.56500, 0.625833**. These small, selected, unmatched groups cannot identify an effect of coalition membership. [Computed results and exact group membership](model-audit.json).

Japan's x advantage over its procurement coalition is **0.340**: readiness contributes **0.100**, timing **0.090**, coordination **0.150**. The coalition's y advantage is only **0.015**: +0.060 from reach, +0.015 from relevance, −0.060 from imputed remedy. Under these point estimates the coalition beats Japan on U only when α is below **0.042254**. This large x penalty is partly the explicit cost of coordination and partly the editorial judgment that the joint route is less mature and slower. It is not an empirically estimated coordination penalty. [Pair decompositions](model-audit.json).

### Inferences
The strongest defensible reading is “Japan is a plausible near-term procurement validation candidate; India is a plausible programme-level conditional-access candidate.” Their baseline points offer useful hypotheses, not evidence that national action generally outperforms coordinated action. The coalition's incremental benefit needs its own evidence and cannot be inferred from country count. A national route can also have international effects; an international route can govern a small cohort.

### Gaps
No common denominator of consequential activity, matched national/coordinated counterfactual, exact consent set, or measured harm reduction supports a general superiority claim. The [evidence report](../../reports/Route%20coordinate%20evidence.md) records precisely these missing joins. Display noise is excluded from every calculation; pixel positions are not evidence.

## How robust is the result to weights, priors and input uncertainty?

### Takeaway
The identity of a plausible candidate is more stable than its rank or Pareto status. Japan stays above India in all five equal-axis point regimes at prior 0.5, but loses Pareto status in three. India loses Pareto status in the rights/accountability proxy. Changing the relative preference for impact versus feasibility reverses India/Japan without changing a single factor. The documented sensitivity boxes are too wide to support robust dominance.

### Cited findings
We evaluate **15 regime/prior combinations**, **45 α preferences**, and **5,760 one-at-a-time input probes** (32 routes × six factors × two endpoints × 15 combinations), plus three removal/renormalisation probes. Every main scenario has all 32 coordinates, utilities, ranks, dominance lists, missingness and exact monotone bounds; every one-at-a-time probe stores changed coordinates/rank and strict crossing IDs. [Executable](reproduce-model-audit.py), [full results](model-audit.json).

Weights in each row sum to one **within each axis**. No row represents elicited human preferences.

| Regime | x: readiness / timing / coordination | y: reach / relevance / remedy | Japan rank; Pareto? | India rank; Pareto? | Strict reversals vs baseline, prior .5 |
|---|---|---|---|---|---:|
| Baseline | .40 / .30 / .30 | .40 / .30 / .30 | 1; yes | 4; yes | 0 |
| Implementation/delivery | .35 / .45 / .20 | .25 / .25 / .50 | 2; no | 4; yes | 40 |
| Frontier-risk proxy | .40 / .30 / .30 | .25 / .60 / .15 | 3; no | 4; yes | 30 |
| Rights/accountability proxy | .50 / .20 / .30 | .20 / .25 / .55 | 2; no | 4; no | 47 |
| International-scale proxy | .25 / .20 / .55 | .70 / .20 / .10 | 1; yes | 2; yes | 48 |

Rationale: delivery emphasizes timing and a consequential remedy; frontier-risk emphasizes the existing relevance score; rights emphasizes authority maturity and remedy; scale emphasizes reach while making coordination dependencies salient. **These are proxies.** The relevance score is not frontier-specific, remedy is not a full measure of rights, and reach is not measured international diffusion. The international-scale regime's failure to elevate coalitions is not evidence against spillovers: **weights cannot create an unmeasured spillover factor.** [Factor definitions](../../data/route-placement-model.json), [scenario definitions](model-audit.json).

At the baseline axis weights, α=0.25 gives **India and EuroHPC a first-place tie, U=0.715**, with Japan third, U=0.69875. At α=0.5 Japan and Switzerland tie first; at α=0.75 Switzerland is first and Japan second. India overtakes Japan below α≈**0.325581**. This is an explicit preference reversal, not changed evidence or a probability. [Alpha sweep and pair thresholds](model-audit.json).

**Missingness:** 23/192 factor entries across 14 routes are null: timing eight, remedy eight, reach six, coordination one, readiness/relevance zero. At fixed baseline weights and α=.5, lowering the common missing prior from .5 to .25 causes **48** strict pair reversals; raising it to .75 causes **83**. The Pareto set changes from six routes to five or nine. India and Japan have no missing factors, so their coordinates do not move, but India's rank moves from fourth to fifth at .75 because competitors change. Anthropic moves from rank **25 → 20 → 10** across priors .25/.5/.75; its x/y are **(.295,.725) → (.370,.800) → (.445,.875)**. This is prior leverage, not newly observed lender control. [Missingness and scenarios](model-audit.json).

**Documented input magnitudes:** assessed factors ±.15, imputed factors ±.30, clipped to [0,1], exactly as production sensitivity. Under baseline weights Japan has x=[.650,.950], y=[.515,.815], U=[.5825,.8825]; India has x=[.505,.805], y=[.585,.885], U=[.545,.845]. Because every other route can independently move to the opposite box corner, each has attainable competition ranks **1 through 32 at the extrema** (best=1, worst=32; no claim that all intermediate ranks were enumerated). **Zero pairwise dominance relations survive every permitted combination of baseline boxes.** These are adversarial attainable bounds, not credible intervals. [Bounds](model-audit.json).

The narrower own-input one-at-a-time probe gives Japan ranks **1–3** and India **3–4**, with all competitors held at baseline. Reducing Japan's reach from .65 to .50 alone gives x=.800, y=.605, U=.7025, rank 3 and loss of Pareto status. Reducing readiness alone gives x=.740, y=.665 and the same rank 3, but retains Pareto status. One-at-a-time probes cannot describe joint uncertainty; their smaller range does not invalidate the wider box result. [Exact probe witnesses](model-audit.json).

### Inferences
Prefer conditional recommendations: “at this feasibility/impact trade-off and these factors, test this route next.” Do not report the fraction of scenarios won as probability of success: the scenario menu is chosen by the analyst, not sampled from a probability distribution. Broad boxes establish fragility, not equal plausibility of every extreme. A posterior forecast needs outcome data and calibration absent here.

### Gaps
No measured factor covariance, sampling uncertainty, credible prior distribution or empirical stakeholder weights are available. Endpoint independence is deliberately permissive; positive and negative correlations may constrain feasible joint states. The 15 scenarios are not exhaustive over possible value systems or model structures.

## Which structural assumptions deserve revision, and can this audit be reproduced?

### Takeaway
There is **no universal one-to-one duplication of readiness and remedy**: eight of 24 jointly assessed pairs are equal, and their Pearson correlation is 0.698668. But shared maturity evidence, coarse scores, mismatched horizons and common neutral priors can materially shape the chart. Improve the evidence-to-factor mapping and outcome definition before claiming finer precision.

### Cited findings
- **Duplication versus shared signal.** Eight equal pairs include India, Taiwan, two LUMI routes, Korea, Brazil, Kenya and Saudi Arabia. Japan is .80 readiness versus .70 remedy. Readiness and remedy definitions differ, but both invoke an operating exact safeguard or demonstrated hold/retest at the high end. Equal values and correlation do not prove accidental copying; they warrant source-level checks for double use of the same maturity evidence. [Definitions and assignments](../../data/route-placement-model.json), [structure diagnostics](model-audit.json).
- **Removal probes.** Removing remedy from y and renormalising remaining weights causes **60** strict pair reversals; Japan becomes sole first and India second. Removing readiness from x causes **42** reversals; Switzerland is sole first, Japan second, India fourth. Removing coordination from x causes **46** reversals; Japan is sole first, India fourth. These probes alter the construct and are not preferred corrected models, but demonstrate that the current result is not explained by a single duplicated factor alone. [Ablations](model-audit.json).
- **Precision.** All 169 assessed entries lie on a .05 grid; factors have only 9–13 distinct assessed levels. Weighted sums create apparently fine decimal separation from coarse editorial inputs. Those decimals support faithful arithmetic, not equally fine empirical discrimination. [Structure and missingness](model-audit.json).
- **Scope/horizon mismatch.** EuroHPC's x rationale explicitly allows a protocol before Geneva while its reach rationale uses a multi-project design envelope. Japan's access-enabled official count is not active governed usage; India's project inventory is not metered consumption or settled subsidy; a shared evaluation result is not itself a deployment hold. These limitations are already disclosed but remain inside a cross-route score. [Model rationales](../../data/route-placement-model.json), [evidence report](../../reports/Route%20coordinate%20evidence.md).
- **Neutral does not mean neutral in effect.** Imputation assigns the same midpoint to an undisclosed lender remedy, an unknown administrative schedule and an absent deployment inventory. Known narrow scope may receive less than .5 while unknown scope receives .5. Readiness/relevance are never missing but remedy/timing often are: the model's selection and missingness pattern is asymmetrical. [Missingness audit](model-audit.json).

### Inferences
Separate (a) operating authority/readiness, (b) legally available remedy, and (c) witnessed remedy effectiveness; document which evidence supports each. Fix a common near-term endpoint, then show later potential scope separately. Add a distinct international incremental-effect field only when its denominator, counterfactual and evidence are defined. Have fresh reviewers code evidence without seeing the desired country ordering, preserving disagreement. See the proposed [workflow adaptation](workflow-method.md); no new panel was run for this audit.

### Reproduction and checks
From the repository root:

```sh
python3 "research_notes/Safeguard proposal stress tests/reproduce-model-audit.py"
```

Python standard library only; no network or installation. The command regenerates **only** sibling `model-audit.json`, writes no baseline data, and prints summary diagnostics. SHA256 receipts identify model, evidence, metadata and placement implementation. The script asserts all 32 exact route IDs, weights, sensitivity settings and the pinned evidence hash; checks baseline bytes unchanged; JSON disallows NaN. All **32 routes × two axes × value/lower/upper = 192** computed values/bounds were compared against actual `placement()` in `routes/placement.mjs` and matched within `1e-10`. Exhaustive six-factor box corners and deterministic regeneration were additionally checked after generation.

Files delivered: this memo, `model-audit.json`, `reproduce-model-audit.py`, `workflow-method.md`, and `workflow-method.json`. No baseline scores or shared navigation files were edited, no agents spawned, no installation or paid retrieval performed, and no commits made by this audit.

### Gaps
Reproducing the arithmetic does not validate the score semantics or establish stakeholder consent. The most discriminating follow-up remains a matched procurement case with actual national/shared acceptance terms, deduplicated operational coverage, and a witnessed failed-test hold and corrective retest. Source-specific next questions are in [workflow-method.md](workflow-method.md).
