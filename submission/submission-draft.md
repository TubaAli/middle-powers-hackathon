# Before Geneva
## A policy explorer and diplomatic game for middle-power AI safeguards

Draft for team review | 1 November 2026 | Middle Powers Hackathon, Team 2

Suggested track: Diplomacy, with procurement, regulation and investment applications.

## Project summary

Before Geneva helps people investigate what middle powers could do to make advanced AI safer, individually and together. The submission has two principal assets: an interactive feasibility-versus-potential-impact plot of 32 routes to AI safety, with the ranking method and evidence available inside the explorer; and a diplomatic game that communicates the research through understandable choices and consequences. The game direction combines Orbit Accord’s map, plane, characters and progression with Before Geneva’s visual style. The central question is practical: who can require a safeguard, through which decision, and what happens when a system fails the test?

Our preliminary finding is that identifying a national asset or a funding programme is only the start. A useful intervention needs an authorised decision-maker, a changeable instrument, access to relevant evidence and an operational consequence. The explorer makes these assumptions inspectable. The game turns them into conversations about limited resources, consent, testing and follow-up.

The prototype is live. Its policy scores are transparent editorial judgments, and its negotiations are fictional. We have demonstrated a working tool and a set of testable policy designs; we have not demonstrated government adoption or a reduction in real-world AI harm.

## Start here

Policy explorer: https://tubaali.github.io/middle-powers-hackathon/routes/#basis=model

Playable Before Geneva: https://tubaali.github.io/middle-powers-hackathon/game/

Evidence challenges and sensitivity tests: https://tubaali.github.io/middle-powers-hackathon/routes/stress-tests.html

Source repository and reproducible checks: https://github.com/TubaAli/middle-powers-hackathon

Suggested reviewer path: open the policy map, select India’s public-compute proposal, inspect the evidence challenge, then play the corresponding conversation. Compare it with Japan’s procurement proposal or the shared LUMI proposal. This shows how an attractive policy idea becomes a more specific question about authority and implementation.

## Problem and intended users

Countries outside the US and China participate in AI through public procurement, compute allocations, finance, infrastructure, data protection and international institutions. These relationships may create opportunities to require evaluations, constrain dangerous uses or verify corrections. However, exposure to an industry is not the same as control over it, and adding countries to a proposal can introduce delay without adding protection.

Our intended users are policy researchers, public-sector teams and people learning about AI governance. The tool helps them compare proposals, find missing evidence and identify the next discriminating test. It is a research and discussion aid, not an automated policy recommendation system.

The safety concern is that increasingly capable systems can be deployed without evidence that matches their actual version, permissions and operating environment, or without anyone able to act on a failed evaluation. Relevant failures include unauthorised agent actions, information leakage and ineffective correction. How much a particular intervention would reduce catastrophic or other serious risk remains an empirical question.

## What we built

The policy explorer places 32 proposals on feasibility and potential-impact axes. Each proposal connects an actor and instrument to a safeguard, verification method and possible remedy. Colours distinguish the proposed international coordination requirement. Route details expose assumptions, evidence and unresolved questions.

The research layer links retrieved claims to their sources and retains reading limitations. The deeper review covers all 32 proposals, presents a baseline and four analytical viewpoints, and proposes eight follow-up test designs. Users can inspect 15 combinations of weights and missing-data priors without silently rewriting the original model.

The game contains 32 policy conversations and 224 dialogue nodes, set across eight monthly councils from November 2026 to June 2027. Players allocate effort, prepare evidence, commission pilots and return to resolve problems. A shared protocol requires another tested route. The Geneva ending depends on completed fictional work. Every conversation includes a dossier connected to the research.

The interface uses four generated anime scenes with separately editable HTML controls. The original Orbit Accord prototype, including the team's animated envoy meetings and verdict letters, remains available at https://tubaali.github.io/middle-powers-hackathon/game/orbit.html.

## How to interpret the model

Feasibility combines readiness, timing and coordination at weights of 40%, 30% and 30%. Potential impact combines reach, relevance and remedy at the same weights. These are team modelling choices, not calibrated estimates of success or harm reduction.

Of 192 factor entries, 23 across 14 routes are missing and use an explicitly marked neutral prior of 0.5. Sensitivity views vary that prior and the weights. Small deterministic display offsets prevent overlapping points; they do not change scores. Separate matched-resource coverage views retain their own denominators and uncertainty.

The deeper research preserves competing interpretations. It does not treat a majority of analytical viewpoints as validation. The sample is curated, national and coalition proposals are not matched experiments, and the plot cannot establish that international cooperation causes better or worse outcomes. Game resources and endings are separate deterministic rules, not probabilities inferred from policy scores.

Model documentation: https://github.com/TubaAli/middle-powers-hackathon/blob/main/routes/README.md

## Worked example: a funding condition must reach the workload

India's public-compute proposal illustrates why deeper evidence matters. In the 31 October research snapshot, a provider's documentation describes services continuing at commercial prices after a project's expiry. This is not evidence of safety evasion. It does show why withdrawing public support and stopping a workload must be treated as separate mechanisms.

The revised next test is to identify a future award, establish the authorised conditions, and separately verify what the provider would do after a failed safety test. A controlled rehearsal should observe actual service availability, commercial conversion and the associated funding records. If the workload continues, the proposal cannot be described as a workload-stop mechanism on the strength of subsidy withdrawal alone.

The game presents an explicitly fictional version of that problem. The player must decide whether to repair the arrangement, collect more evidence or record the limitation. The lesson is the difference between an intended incentive and an enforceable operational consequence.

Research and underlying references: https://github.com/TubaAli/middle-powers-hackathon/blob/main/reports/Safeguard%20proposal%20stress%20tests.md

Provider documentation used in that snapshot: https://docs.e2enetworks.com/docs/tir/indiaai/

## Preliminary recommendation and alternatives

Our current research recommendation is to investigate Japan's procurement route as a conditional next validation candidate. The question is whether a specific purchasing or release decision can require version-bound behavioural evidence, support a failed-test hold and preserve a usable fallback. The key comparison is added assurance against fully compliant ordinary review. If ordinary controls already solve the problem, another layer may not be justified.

This is a value-of-information judgment, not a finding that Japan is the best policy or has agreed to participate. Supplier disclosure, authority, contract amendability, staffing and marginal costs remain unresolved.

Two competing priorities remain visible. A Brazil-focused correction test asks whether a reported remedy survives fresh challenges and offers usable redress. A matched LUMI comparison asks whether a common-host condition adds protection or reduces duplicated work relative to national allocation conditions. Both could deserve priority if access, authority and the chosen safety objective favour them.

The full synthesis provides claim-level references, disagreements and proposed tests: https://tubaali.github.io/middle-powers-hackathon/routes/stress-tests.html

## Feasibility and next steps

The software is a deployed static web prototype, with data, model definitions, dialogue and build scripts in the repository. It can be inspected without installing software. That demonstrates technical feasibility for a research interface, not institutional feasibility for the underlying policies.

The next policy step is a narrow scoping exercise with a willing purchaser or allocation authority. Identify the instrument and its amendment window; confirm who can accept, hold and restart the relevant service; obtain itemised supplier, legal and evaluation costs; and agree on a bounded rehearsal with synthetic tasks. No participating institution or funding commitment has been secured through this project.

A subsequent test should compare ordinary controls with the proposed safeguard, introduce held-out failures, verify the operational response, and measure added detection, bypasses, useful-task performance, staff time and supplier burden. A shared version should be tested against a comparable national version with each physical workload counted once. The result should include reasons to stop or redesign the proposal, not just success conditions.

For the interface, we propose user testing with policy practitioners and newcomers. Can they identify the required authority and explain what a high score does not prove? Does playing the conversation improve that understanding beyond reading the dossier? We have not yet measured learning effects.

## Validation and limitations

The game and model checks passed 17 automated unit tests. Live browser acceptance covered all 32 conversations at desktop and phone widths, for 64 walkthroughs, and two complete campaigns. It checked keyboard choices, source panels, saving, resuming and recovery, with no page errors. Eight live game files were compared with committed bytes. These checks establish implementation behaviour, not substantive policy validity.

The evidence snapshot is dated 31 October 2026. Sources include incomplete reads and unresolved access gaps; source-record counts must not be interpreted as independent confirmations. The deeper source review checked 18 external records plus the local model, rather than independently rechecking the entire corpus. The dossiers and repository retain those limits and later errata.

No government consent, signed new safety condition, completed field trial, measured cost-effectiveness or real-world reduction in harm is claimed. Local safeguards also need an explicit argument connecting them to advanced-AI risk; that link cannot be supplied by a high impact score or a successful game ending.

## AI-use disclosure

AI assistants were used extensively for coding, research retrieval and synthesis, model audits, dialogue drafting and document preparation. The recorded analytical viewpoints are same-family OpenAI model outputs, not independent stakeholder interviews or cross-family validation. Gemini generated the four scene artworks through an existing subscription. Game outcomes are authored rules, not AI-generated diplomatic predictions during play.

The team set the project direction and requested revisions. Automated source and software checks provide partial verification; neither all factual claims nor all model judgments have received independent human review. The team should confirm the final tool inventory and individual contribution statement before submission.

## Items to finish before final submission

Confirm the author and contributor list, chosen track and final title. Record and upload the short walkthrough video using the accompanying draft script. Review the claims and AI-use disclosure. Confirm reviewer access to the selected files, then complete the separate organizer submission process.

These files are draft materials placed in the shared workspace. Their presence in Drive does not confirm a final portal submission.

Organizer guidance, checked 1 November 2026: https://mangrove.one/hackathon/middle-powers-hackathon
