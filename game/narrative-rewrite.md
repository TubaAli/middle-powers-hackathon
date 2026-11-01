# Before Geneva: educational rewrite

User-approved brief, 1 November 2026. Narrative Engine mode: Fast.

Reference: https://github.com/nraford7/Narrative-Engine at commit
`5b4cdcd7dc42ba6a467e9cfc5cbb68222cb886ef`. This applies its prose-writing and
review process to the route narratives; it does not install a new game runtime.

## Purpose and audience

Primary purpose: understanding. The player should be able to explain the problem,
what a meeting agreed, what remains unfinished and what to do next. The user found
the existing language difficult and the monthly outcomes unclear. Assume no policy
training; do not assume that judges want specialist language. Keep the professional,
fictional setting, original artwork and eight-month campaign.

## Point and structure

User-stated goal: approachable, educational play with clear consequences. Each
conversation starts with a concrete problem, offers a decision and shows its result.
Use direct explanation. A mystery structure would hide facts the player needs to
choose; a triumphant transformation would overstate the underlying research.

Each result names the work produced, resource change, remaining limit and next step.
At month end, recap completed tests and unfinished work with return links. Explain
support, research and budget as game resources. Keep genuine uncertainty visible.
Do not imply that spending a game point establishes real political consent.

## Source read and evidence boundaries

The original 32 authored routes are the narrative source; the current campaign
contains their research dossiers. The engine defines what choices actually do.
Prepared briefs cost one evidence point; pilots cost two budget; shared projects
cost one budget and two mandate. Later resolution costs one budget and one or two
evidence, and earns one mandate. Rename evidence to Research and mandate to Support
in the interface, preserving save keys and mechanics. A project started this month
is not complete, and a test never proves universal safety.

Concrete contrasts worth preserving include India's funding versus service stop;
Japan's model-version change; LUMI's duplicate job counts and channel switching;
and a correction that fails through a different interface. These existing fictional
complications give the player something understandable to investigate. The real
sources support investigating the mechanism, not claiming these events occurred.

Use ordinary verbs and specific objects. Prefer a buyer, supplier, researcher,
computer job, permission or agreement to abstract phrases. Introduce a technical
term only when it teaches something useful, with an immediate explanation. Retain
differences among routes, qualified authority and separate national decisions.
Do not invent legal powers, consent, observed failures or measured safety gains.

## Scope and checks

Rewrite the authored game text and shared game prompts. Add plain-language route
titles, short context and learning notes. Leave the source dossiers available as
advanced reading. Use a separate result panel and monthly summary rather than
making a fictional delegate speak UI instructions. Existing saves must still load.

Preserve Tuba's edits from commit 42e11fc and later upstream changes. In particular,
Orbit Accord's game.js, meeting.js, meeting.css, orbit.html, planets.json and world.json
are outside this implementation's scope. Fetch and inspect again before publishing.

Check all 32 routes, result accuracy, monthly totals, follow-up navigation, save
compatibility and phone layout. Narrative reviews evaluate comprehension and source
fidelity; they are model reviews, not evidence of measured learning outcomes.

## Concurrent-work integration

During final checking, Tuba published `e784e4f`, a complete plain-language pass
over the same game. The user's explicit preservation instruction takes priority:
retain Tuba's primary dialogue file byte-for-byte, including titles and summaries,
and keep her Money / Proof / Support names and main UI copy. Our educational
material is an additive `learning-notes.json` layer, with result cards, monthly
summaries and optional questions around her text. The earlier replacement prose
was reviewed but is not substituted for her published work. Recheck the integrated
version before release; distinguish earlier narrative review from final integration.

## Final integration checks — 1 November 2026

The earlier replacement narrative passed a cold-reader review after one revision
clarifying the small/shared choices. That verdict does not certify Tuba's later
primary prose. A separate source review checked all 32 integrated routes and all
160 learning fields against the existing research snapshot, without new retrieval.
It found one added overstatement: Mexico's lesson implied nonbinding advice could
never change a launch. The corrected lesson distinguishes persuasion from a
required response before launch.

Five inherited summaries needed context. Separate visible notes now distinguish
Canada's announced investment from verified payment, Thailand's recorded contract
from completed delivery, Mexico's qualifying assessment from a universal duty,
Kenya's biometric case from unsupported fingerprint-specific verification, and
Vietnam's conditional legal route from a newly verified blanket rule. The primary
dialogue remains unchanged. These qualifications use the existing route dossiers;
they are not new legal findings.

Local integrated acceptance passed 19 engine/model tests, 64 route walkthroughs
across 1440px and 390px viewports, two full campaigns, optional question feedback,
source panels, keyboard controls and save recovery, with no page errors. Phone
and desktop result/summary screenshots were inspected. Old saves do not invent
missing resource history. Next user check: can a player explain what their last
meeting achieved and name the next useful action without reading the guide?

Public acceptance: deployment `2a91dff` passed the same 64 route walkthroughs
and two complete campaigns on the live GitHub Pages site, with no page errors.
Ten live game/data/Orbit files matched committed bytes. Tuba's subsequent
`598ab47` phone layout and flags were incorporated before release; her primary
dialogue, entry page and Orbit implementation were preserved unchanged.
