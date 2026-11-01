# East Asian actors: Japan, Taiwan and South Korea — three governments, three clocks

Observation date: **1 November 2026** (all web pages read that day). Research cutoff:
**1 November 2026**. Game baseline `198d3ac` on main.

Scope: the `JP`, `TW` and `KR` tokens in `game/planets.json` (all three are individually
playable and individually met), the existing dialogues
`jp-procurement-safety-evidence`, `jp-kr-sg-procurement-profile`,
`sg-kr-jp-shared-eval-evidence-protocol`, `kr-safety-case-incident-rehearsal` and
`taiwan-public-compute-safety-conditions` in `game/dialogue-authored.json`, the law
windows in `data/windows.json`, the monthly events in `game/game.js`
(`monthEvents()` L157–178) and the single-roll acceptance in `odds()` L84–96.
Machine-readable candidate rules: `east-asia.json` in this folder.

Everything below is either **observed** (document read, locator given), **inferred**
(my reading, marked as such) or **proposed fiction** (a game rule — a scripted reaction
state, never a probability and never a measured acceptance rate). No real government
agreed to any scene. No game file, dialogue, shared summary or commit was touched.

---

## 1. The short version

- **Japan** is mid-review, not mid-law. Its AI Promotion Act has no penalties; a review
  committee with "penalties as the focus" was reported for late October 2026 (press
  aggregator, not primary), and a year-end AI action plan is due December 2026
  [S1][S2][S8]. In the past year Japan was hit by China's retaliation for the Prime
  Minister's Taiwan remark, refused to retract, and kept its channels open
  [S4][S5][S6]. It can offer: procurement conditions (Gen-nai), AISI evaluation
  cooperation, and licence-level export conditions — but its end-user list covers only
  WMD/military users, so it cannot offer US-style entity bans [S3][S27].
- **Taiwan** is in survival mode with a brand-new framework law. Its AI Basic Act passed
  23 December 2025 and took effect 14 January 2026 as a 20-article, principles-first
  statute whose implementing instruments are still being written; NSTC is the
  central competent authority [S18][S19]. What it cannot do is promise TSMC: on
  1 October 2025 its lead negotiator publicly refused the US demand for a 50% chip
  production split, while accepting a 20% tariff and pledging more US investment,
  energy purchases and defence spending above 3% of GDP [S20]. Its asks are security
  shaped; its red line is any "Taiwan is part of China" framing; its November 28, 2026
  local elections are a dated domestic clock [S22][S25].
- **South Korea** runs both clubs at once. In January 2026 Lee Jae-myung made the first
  ROK state visit to China in nine years, signed 15 cooperation documents and reaffirmed
  a one-China stance [S10]; the same month he told Japan the China–Japan rift was "a
  matter for China and Japan" [S6]. Its HBM chokepoint is real but partly licensed in
  Washington: the US revoked VEU status for Samsung's and SK hynix's China fabs
  effective 31 December 2025 [S9]. Its AI Basic Act commenced 22 January 2026 with a
  penalty-grace clock the team already tracks to 22 January 2027 [S14], and its National
  AI Computing Center broke ground 3 August 2026 after two failed tenders [S13].
- **The clock they share.** China's 9 October 2025 rare-earth controls were suspended
  around 1 November 2025 as part of the Trump–Xi truce, with a one-year delay reported
  on the harshest measures [S28][S29]. The game's scripted December 2026
  "China squeezes refined metals" event now has a real-world clock attached — and a
  real reason the squeeze might resume exactly during the campaign.

---

## 2. What the game does today, checked against this evidence

| Current game mechanic | Evidence verdict |
|---|---|
| All middle powers share base-40 acceptance in `odds()` | Not contradicted, but it hides the three biggest differences between these governments: what they want, who signs, and what is only announced. Use the state classes from `process.md` instead (`signs / refers / conditions / declines`). |
| Token needs: JP needs food/energy/minerals; KR and TW also need medicine | Directionally right. JP/KR import dependence on Chinese rare earths and both countries' mineral-diplomacy behaviour matches the mineral need [S5][S11]. KR's real 2026 ask list is compute + critical minerals [S11][S13]. |
| Law-window bonus +10: JP (conds 1,2,3, ~31 Oct 2026), KR (conds 2,5, 22 Jan 2027); **Taiwan none** | JP window: grounded in direction — the second AI Basic Plan mandates continuous review of "legal, regulatory and policy frameworks, including the AI Act" [S1]; the specific late-October committee is press-aggregator-level only [S8]. KR window: team-derived, keep its caveat. TW: an obvious gap — Taiwan has a fresh framework law with implementation work, plus elections 28 Nov 2026 [S18][S19][S25]. |
| `monthEvents()` Dec 2026: China squeezes refined metals | Grounded and better than the game knows: the squeeze is currently *paused* under the Nov 2025 truce [S28][S29]. See cross-cutting rule X1. |
| `monthEvents()` Feb 2027: US leans on the weakest ally | Grounded: the US revoked Samsung/SK hynix VEU status [S9], demanded 50% of Taiwan's chip production [S20] and imposed a temporary 20% tariff on Taiwan [S20]. Being the US's partner does not immunise a country. |
| "License your chokepoint" may trigger CN retaliation | Grounded: China retaliated against Japan with export restrictions, travel bans and seafood suspension after a single sentence about Taiwan [S4][S5][S6]; China's own 2020+ export-control build-out replicates US-style tools [S27]. |
| Verdicts arrive by letter, never in person | Keep. Every reaction below is written as a letter a named government could send. |

---

## 3. Japan — profile

**In-game facts (must be respected):** `JP` holds 60% chip materials, 20% tools, 40%
magnets/robot parts in `data/layers.json`; needs food/energy/minerals; window: AI
Promotion Act review, conditions 1–3.

**What it wants (observed).** The second AI Basic Plan (Cabinet decision 14 July 2026)
sets the objectives in Japan's own words: "AI sovereignty" through "strategic autonomy
and strategic indispensability"; Vertical AI and Physical AI; an operational AISI with
"technical evaluation capabilities for AI model assessment, traceability, guardrails,
and crisis-time information sharing"; leadership "through the AISI International
Network"; and "convening an AI Summit in Japan at an early opportunity". It also
mandates "proactively and continuously review and update legal, regulatory and policy
frameworks, **including the AI Act**" [S1: Pillar 3 key points]. On 1 October 2026
PM Takaichi ordered an AI action plan by year-end, designated the five years from
April 2027 an intensive investment period for 17 strategic sectors including AI and
semiconductors, and plans a special account for economic-security-critical sectors
[S2]. IP protection for content creators (the anime/manga constituency) is an explicit
pillar [S1: Pillar 4].

**What it can actually offer or approve (observed).**
- *Procurement terms.* The Gen-nai government-AI programme runs evaluation and
  screening windows in Nov–Dec 2026 and Jan–Feb 2027 for the FY2027 domestic-model call
  — a real, dated place to put vendor safety evidence obligations (team-verified, from
  the Digital Agency sources in the Geneva ledger [S8b]).
- *AISI evaluation cooperation.* The Basic Plan moves AISI from research toward
  operational model evaluation and crisis-time information sharing [S1] — exactly the
  instrument conditions 1 and 2 need.
- *Licence-level export conditions.* METI controls exports under the Foreign Exchange
  and Foreign Trade Act; its End User List was expanded 29 September 2025 to 835
  entities (+87) from 15 countries/regions — but it is a WMD/missile/conventional-
  weapons catch-all list, "not an embargo list", and contains no Chinese AI firms [S3].
  Japan's 23-category semiconductor-equipment controls (July 2023) are list-based and
  were deliberately *not* presumption-of-denial [S27].
- *Not available:* US-style entity bans, extraterritorial foreign-direct-product rules,
  or statutory AI penalties before the Act review concludes [S27][S8].

**Reactions to specific previous player actions/partners (observed precedents).**
- *To a partner that licenses chokepoints against China / embraces Taiwan openly:*
  this exact sequence happened to Japan. After Takaichi's 7 November 2025 Diet remark
  that a Chinese attack on Taiwan could be a "survival-threatening situation", China
  suspended Japanese seafood imports again, discouraged its citizens from travelling to
  Japan, cancelled air routes, demanded a retraction through DG-level talks (18 Nov 2025)
  and refused a Li Qiang–Takaichi meeting at the G20 [S4][S5][S6]. Japan did not
  retract, but its lead negotiator told China its position was unchanged from the 1972
  Joint Communiqué [S4] — resolve *and* hedge, in one month.
- *To China as a coalition partner:* Japan keeps the Japan-China-ROK trilateral
  formally alive while it has de facto collapsed — the tenth summit planned for
  January 2026 fell apart over China's refusal to meet Takaichi [S23][S24]. A
  Japan that "joins" something Beijing also joins will be slower and will insist on
  technical framing.
- *To Korea:* the two governments are closer than in years — shuttle summits in Nara
  (13 January 2026) and Andong (19 May 2026), an oil/LNG swap arrangement, and shared
  US-alliance costs — but the Japan-US-ROK acquisition agreement (ACSA) is still
  unresolved over their China gap, and Lee pointedly named the China-Japan-Korea
  trilateral where Takaichi named only the Japan-US-ROK framework [S6][S7].
- *To the US:* aligned, not absorbed. Japan expanded its End User List on 29 September 2025
  and signed a US bilateral technology-cooperation deal of the same template Korea later
  signed (export-control alignment plus data-burden reduction, per the Korea Herald
  report) [S3][S12] —
  but its 2019 use of export licensing against Korea shows it will also use these tools
  on an ally, and Japanese firms simply routed around that control by relocating
  production, which is the honest failure mode to encode [S27].

**What must NOT be assumed.**
- Japan is not "anti-China": China is its second export market (US$125bn in 2024) and
  the 2025 crisis was about a security statement, not a decoupling decision [S5].
- Japan is not a US policy-copy machine: it declined presumption-of-denial licensing and
  has no entity-list equivalent [S27].
- The AI Promotion Act has **no penalties today**; any in-game Japanese "yes" that
  sounds like binding enforcement is ahead of the observed record [S1][S8].
- A Japanese AISI evaluation is not a release veto [S1].

### JP-1 — "Year-end action plan, not a new law"
- **Actor.** AI Strategic Headquarters (chaired by the PM, all Cabinet ministers); Digital
  Agency for Gen-nai procurement; METI for export licensing.
- **Objective.** Put the safety condition inside Japan's growth-strategy frame: adopt
  AI, stay trusted, review the law in an orderly annual cycle.
- **Authority/instrument.** Cabinet-decided AI Basic Plan + year-end growth-strategy
  programme [S1][S2]; Gen-nai FY2027 call terms [S8b]; AI Promotion Act review committee
  (reported, penalties focus) [S8].
- **Trigger.** Player asks Japan to join conditions 1 (testing) / 2 (incidents) / 3 (weights).
- **Conditions.** Technical-cooperation and procurement framings are signable by
  ministers this month; anything that reads as statutory penalties is `referred` to the
  Act review with the answer "no timetable yet" [S8].
- **Time cost.** 0–1 month for AISI/procurement scope; the statutory track has no
  published clock.
- **Plausible response (proposed).** *Signs* condition 2 and an AISI joint-evaluation
  pilot; *refers* condition 1's binding version to the review, offering Gen-nai
  tender terms as the interim instrument; *declines* to promise penalties.
- **Substitute.** Vendor safety-evidence requirements in the FY2027 domestic-model call
  (the team's existing `jp-procurement-safety-evidence` route).
- **Evidence limit.** No retrieved document shows Japan accepting foreign safety duties
  in law. The late-October review committee is press-aggregator-level; the Digital
  Minister's 30 October 2026 press appearance is confirmed as an event but its transcript
  was not yet published at cutoff [S8].

### JP-2 — "The squeeze costs Tokyo more" (reaction rule)
- **Actor.** METI and the PM's office as the letter's authors; China as the off-screen
  actor.
- **Objective.** Show that chokepoint moves have asymmetric costs: Japan already paid
  this bill once.
- **Authority/instrument.** The observed 2025–26 retaliation set (seafood suspension,
  travel caution, export restrictions, refused meetings) against Japan's ~60%
  rare-earth-magnet import reliance and $125bn China market [S4][S5][S6].
- **Trigger.** Player licenses a chokepoint aimed at China, or the accord's public
  framing is a China-exclusion club; also fires when the scripted December 2026 metal
  squeeze event runs.
- **Conditions.** If the accord includes the US, Japan absorbs the hit and stays
  (alliance-first: it refused China's retraction demand [S4][S6]). If the player is
  alone, Japan asks for a technical framing ("trustworthy AI co-creation", ASEAN/Global
  South language from the Basic Plan [S1]) before joining.
- **Time cost.** 1 month delay on Japan's signature while it asks for reframing.
- **Plausible response (proposed).** A conditional letter: joins as "AI safety
  technical cooperation, not a bloc", and requests the player stockpile or substitute
  rare-earth inputs first (Japan's in-game needs are food/energy/minerals — consistent).
- **Substitute.** X1's truce-renewal move as an alternative to eating the squeeze.
- **Evidence limit.** The one observed crisis followed a security statement, not a
  safety accord. Japan's reaction to a hypothetical AI-safety bloc with Taiwan is a
  design choice constrained by, not read off, the 2025 precedent.

### JP-3 — "Licence conditions, not entity bans"
- **Actor.** METI Security Trade Control Policy Division (the office named on the End
  User List release [S3]).
- **Objective.** Let Japan contribute supply-chain leverage only in the form its law
  actually allows.
- **Authority/instrument.** FEFTA licence conditions on controlled chip materials and
  tools; End User List limited to WMD/military scope with no AI-firm entries [S3][S27].
- **Trigger.** Player asks Japan to attach condition 5 (chip-location reporting) or
  condition 1 to its materials/tools exports.
- **Conditions.** In-scope: location reporting and end-use statements inside export
  licences for listed items (the `chips` goal's chokepoint lever). Out-of-scope: adding
  Chinese AI companies to an entity list, presumption-of-denial policies, or
  extraterritorial rules [S27].
- **Time cost.** 1–2 months (licence-rule amendment rhythm; Japan's 2023 controls took
  about four months from announcement to enforcement, which also let buyers stockpile
  — an honest delay to show [S27]).
- **Plausible response (proposed).** *Conditions*: "We can write the reporting clause
  into licences for controlled items. We cannot blacklist firms; our list is WMD-only
  and stays that way pending the Act review."
- **Substitute.** Location reporting via procurement and hosting contracts instead of
  export law (the `host` lever in `data/conditions.json`).
- **Evidence limit.** **No retrieved instance of Japan attaching safety or testing
  conditions to any export licence.** This rule is proposed fiction grounded only in
  Japan's demonstrated instruments, and must be labelled as such in-game.

---

## 4. Taiwan — profile

**In-game facts:** `TW` holds 80% leading-edge fabs and 5% chip materials; needs
food/medicine/energy/minerals; **no law window** in `data/windows.json`; its counterpart
title is "Minister of Economic Affairs".

**What it wants (observed).** The AI Basic Act (passed 23 December 2025, effective
14 January 2026) states the goals: human-centric AI, seven governance principles, a
"generous AI budget", industry subsidies, and going "beyond its semiconductor advantage
to the integration of hardware and software" [S18][S19]. Above all, survival: in his
10 October 2026 National Day speech President Lai rejected "subordination imposed
through Chinese military pressure" and tied defence spending (above 3% of GDP this
year, reported target 5% by 2030 under US pressure) to deterring war [S22]. Resilience
drills and whole-of-society defence committee meetings run through 2026 [S21b][S22].

**What it can actually offer or approve (observed).**
- *Its own programmes:* ADI public-compute awards (2026 application round closed
  30 October 2026; final review 2 November 2026; access rules dated 14 August 2026 with
  logs, reporting and suspension remedies; TWSC as implementing operator) — the team's
  existing `taiwan-public-compute-safety-conditions` route is built on this and stays
  valid [S26].
- *Framework-law machinery:* NSTC as central competent authority; an Executive-Yuan
  National AI Strategy Special Committee; moda studying an AI risk-classification
  framework [S18][S19]. This is where conditions could become Taiwanese policy — the
  committee exists, the sub-instruments mostly do not yet.
- *Export controls:* Taiwan is the *partial exception* among US allies — it already
  runs China-wide advanced-node end-use controls and restricts its citizens/firms from
  supporting China's chip industry through several regulations [S27].
- *Not available:* any promise about TSMC's production, pricing or locations. On
  1 October 2025 Vice Premier Cheng Li-chiun (lead tariff negotiator) said of the US
  50-50 production-split demand: "this is the US's idea. Our negotiation team has never
  made a 50-50 commitment to a chip split... we will not agree to such a condition"
  [S20]. TSMC was also the VEU survivor: the US rule that stripped Samsung and SK hynix
  removed only three entities, none of them TSMC's Nanjing fab [S9].

**Reactions to specific previous player actions/partners (observed precedents).**
- *To Japan:* Taiwan and China reacted "sharply differently" to Takaichi's remark —
  Taipei welcomed a Japan that openly ties its own survival to Taiwan's, while Beijing
  exploded [S6][S21][S21b]. But Japan immediately told China the remark did not change
  the 1972 framework [S4]. So: Japanese support is real, hedged, and never a treaty.
- *To Korea:* Lee refused to be drawn into the China–Japan dispute and reaffirmed a
  one-China stance in Beijing [S6][S10]. A Taiwan clause in a Korea co-signed accord is
  not supported by the observed record.
- *To China:* any accord text or press framing that mirrors Beijing's position (UNGA
  Resolution 2758 language, "Taiwan, China", unification framings) is the hard red line;
  China's pressure campaign — including Coast Guard intrusions near the Senkakus right
  after the Takaichi remark — is the ambient condition, not a hypothetical [S21].
- *To the US:* alignment, investment and arms purchases — yes; transferring the
  silicon shield, no [S20].

**What must NOT be assumed.**
- The Taiwan government cannot deliver TSMC. Any game card that turns the 80% fab
  share into a government promise is the single biggest realism failure available
  [S20].
- Taiwan is not automatically in anyone's coalition: it is excluded from most
  international bodies, and partners' one-China policies (Korea's written reaffirmation
  [S10]) constrain what they will co-sign with Taipei.
- Not anti-US and not anti-China in commercial terms; the silicon shield itself is the
  doctrine [S20].
- The AI Basic Act is principles-first — the retrieved texts contain no penalty
  provisions, and its sub-instruments are not yet written [S18][S19].

### TW-1 — "Survival first" (the gate)
- **Actor.** The President's office and the Executive Yuan (NSTC as central competent
  authority for AI).
- **Objective.** Filter every offer through deterrence, continuity and recognition.
- **Authority/instrument.** National-day security policy; Whole-of-Society Defense
  Resilience Committee; AI Basic Act machinery [S18][S22].
- **Trigger.** Player makes any offer to Taiwan.
- **Conditions.** Fast yes: conditions 4 (continuity for essential users), 6 (lawful
  off-switch), 2 (incident sharing) — all match its resilience posture and its own
  programme remedies [S22][S26]. Slow/conditional: condition 1 (testing) via ADI awards
  and the risk-classification framework [S18][S26]. Red line: accord text or partner
  framing that treats Taiwan as part of China; trading chip location for vague security
  talk.
- **Time cost.** 0–1 month for programme-scope terms. Note the domestic clock: local
  elections 28 November 2026 — in campaign months, answers are slower and more
  partisan [S25].
- **Plausible response (proposed).** *Signs* continuity/off-switch/incident scope;
  *refers* testing to the ADI/Basic Act track with the next application round as the
  date; *declines with reason* any China-framed joint statement, regardless of other
  sweeteners.
- **Substitute.** The existing `taiwan-public-compute-safety-conditions` route.
- **Evidence limit.** No retrieved Taiwan government statement about joining a
  hypothetical AI-safety coalition; the security filter is inferred from defence and
  resilience behaviour, and must be labelled inference.

### TW-2 — "Government programmes, not TSMC"
- **Actor.** ADI (Ministry of Digital Affairs) and NSTC — not the Ministry of Economic
  Affairs card the game shows, and definitely not TSMC.
- **Objective.** Stop the player converting the 80% fab share into a Taipei promise.
- **Authority/instrument.** The refused 50-50 precedent [S20]; the ADI award rules and
  remedies [S26]; the Basic Act's committee and risk framework [S18][S19].
- **Trigger.** Player picks the "Promise {fab}" option or asks Taiwan to "use TSMC as
  leverage".
- **Conditions.** Taiwan's letter names what it can bind: its own compute awards,
  procurement, incident reporting, and (with care) its China-wide export-control
  end-use rules [S27]. It explicitly declines to promise any company's production,
  pricing or location.
- **Time cost.** 1 month (ADI review cadence; next application round).
- **Plausible response (proposed).** A refusal-with-redirect letter: "No government
  here can promise a foundry's output. We can put your conditions into our own compute
  awards — our 2026 review sits on 2 November."
- **Substitute.** Condition 5 (chip locations) via Taiwan's own export-control rules —
  the one allied China-wide instrument CSIS documents [S27].
- **Evidence limit.** TSMC's own positions were not retrieved; the corporate-red-line
  reading rests on the government negotiator's statement [S20].

### TW-3 — "Watched and hedged partners"
- **Actor.** The same letter writers, reacting to coalition composition.
- **Objective.** Make the player see that partners' support for Taiwan has three
  different ceilings.
- **Authority/instrument.** Observed positions: Japan (supportive but re-anchored to
  the 1972 framework within days [S4][S6][S21]); Korea (explicitly staying out of
  cross-strait framing [S6][S10]); the US (demanding chips, arming the island, and
  refusing to be treated as a shield [S20][S22]).
- **Trigger.** Accord composition includes/omits Japan, Korea, US, or China.
- **Conditions.** With Japan: warmer letter, asks for explicit security linkage, gets
  hedged language. With Korea: friendly but "technical cooperation only" on anything
  touching the strait. With the US in: Taiwan asks who pays for the 5%-of-GDP defence
  pledge [S22]. With China in: automatic, reasoned refusal.
- **Time cost.** 0–1 month.
- **Plausible response (proposed).** Distinct letters per composition — never one
  averaged "Taiwan replies".
- **Substitute.** If the owner prefers fewer cases: one letter with a visible
  "depends who else signs" line.
- **Evidence limit.** These are scripted reactions constrained by three observed
  positions; none of the three governments was observed reacting to a real
  AI-safety coalition containing Taiwan.

---

## 5. South Korea — profile

**In-game facts:** `KR` holds 80% HBM and 5% notable models; needs
food/medicine/energy/minerals; window: AI Basic Act notices, 22 January 2027,
conditions 2 and 5.

**What it wants (observed).** "AI G3" — top-three AI nation status (MSIT's own framing
when the AI Basic Act commenced 22 January 2026 [S14]). Lee's July 2026 "San Francisco
AI Declaration": Korea as "a trustworthy AI chip production base and supply chain
partner", with $950bn of cooperation projects announced alongside US tech chiefs
(including SK Group's $750bn chip supply to Nvidia and others) and, from June 2026,
"three megaprojects" totalling over 4,000 trillion won (semiconductor cluster, physical
AI, AI data centres) [S11]. Mineral security is now an explicit diplomatic line: the
July 2026 South America tour secured critical-minerals cooperation with Brazil, Chile
and Argentina [S11]. With China: "full restoration" of ties, fifteen cooperation
documents, and cooperation offers in AI, green industry and the silver economy [S10].

**What it can actually offer or approve (observed).**
- *Regulatory instruments:* the AI Basic Act's safety-duty notices (a consultation ran
  6–26 February 2026; the team's window derives the next clock at 22 January 2027 and
  marks it derived, not confirmed) [S14].
- *Safety-institute capacity:* AISI Korea jointly evaluated tool-using agents' data-
  leakage risks with Singapore's AISI in a published June 2026 study [S15] — the
  strongest in-trio evidence that "safety institutes with capacity to test" is real,
  not aspirational.
- *State compute:* the National AI Computing Center broke ground 3 August 2026 at
  Haenam (Samsung SDS-led KOACC consortium; ~2.5 trillion won; 15,000 accelerators by
  2028, reported target 50,000 by 2030) after two failed tenders [S13].
- *State money:* the National Growth Fund anchored FuriosaAI's US$620m Series D at a
  US$2.9bn valuation, announced 28 October 2026 [S16b].
- *Constrained:* the memory chokepoint. The US revoked VEU authorisations for Samsung
  China Semiconductor and SK hynix Semiconductor (China) effective 31 December 2025
  [S9]; Korean fabs in China now run on reported annual licences [S16]; and the
  US-Korea AI/tech deal of 29 October 2025 trades export-control alignment for data
  and tech cooperation [S12]. Korea's HBM leverage exists, but part of its exercise
  already runs through Washington's licence decisions.

**Reactions to specific previous player actions/partners (observed precedents).**
- *To a US-aligned ask:* signs the template (the APEC Gyeongju deal aligned export
  controls and cut data burdens) [S12] — but when the US revoked the China fab waivers,
  Korea absorbed ~1,000 extra licence applications a year [S9] and did not get its firms
  exempted. Acceptance, then cost.
- *To a China-aligned ask:* Lee took the first ROK state visit to China in nine years
  days before meeting Takaichi, reaffirmed the one-China stance, and asked Xi to press
  North Korea [S6][S10]. Korea will not trade Beijing away for a safety accord.
- *To Japan:* cooperation is genuinely warming (shuttle summits, energy swap), with the
  old scar tissue intact — ACSA unresolved, and Japan's 2019 export-control action
  against Korea is the canonical example of an allied chokepoint move that was
  politically explosive and economically porous at the same time [S7][S27].
- *To trilateral formats:* Lee keeps proposing the China-Japan-Korea channel even as
  the summit itself has "hollowed out" [S7][S23][S24].

**What must NOT be assumed.**
- Korea's US partnership is not US obedience: it restored China ties, declined to take
  sides in the China-Japan crisis, and asks both suitors for North Korea help [S6][S7][S10].
- Korea's China ties are not hostility to Japan: "we are starting a new 60 years" [S6].
- The $950bn and the 4,000-trillion-won megaprojects are **announcements** — corporate
  supply deals and investment intentions, not Seoul's to spend or to attach safety
  conditions to [S11].
- The National AI Computing Center exists, but it broke ground only in August 2026;
  capacity arrives toward 2028 [S13]. Do not code it as available compute.

### KR-1 — "Both clubs at once" (the hedge rule)
- **Actor.** The President's office (foreign-policy line) and MSIT (technical line).
- **Objective.** Join without being forced to choose between Washington and Beijing.
- **Authority/instrument.** The observed dual-track record: APEC Gyeongju US tech deal
  [S12] one month, Beijing state visit [S10] the next; JUSK and JCK both invoked at the
  same May 2026 press conference [S7].
- **Trigger.** Player asks Korea to join the accord, or the accord's membership shifts
  to include/exclude China or the US.
- **Conditions.** Korea signs technical scope (conditions 2, 5 are its open window
  scope in the game's own data) without entanglement language. It *conditions* any
  Taiwan-linked clause down to technical-only, and it *offers* to host or revive a
  China-inclusive format alongside (the stalled trilateral is the natural hook [S23][S24]).
- **Time cost.** 0–1 month technical; 2–3 months if text touches the strait or
  exclusivity.
- **Plausible response (proposed).** "We'll join the incident and chip-tracking work.
  We'll co-sponsor it in both our formats. We won't co-sign anything that names the
  strait."
- **Substitute.** A Korea-proposed extra: a trilateral (JCK) technical annex — turning
  the real-world hollowed-out summit into a player opportunity.
- **Evidence limit.** "Hedging" is an analyst reading (Foreign Policy, The Diplomat
  authors) of behaviour, not a government doctrine text [S6][S7]. No observed Korean
  statement on joining AI-safety coalitions.

### KR-2 — "The chokepoint is licensed in Washington"
- **Actor.** MSIT (AI Basic Act, AISI Korea, compute programmes) versus MOTIE
  (strategic-goods export licensing) — and, off-screen, US BIS.
- **Objective.** Be honest that Korea's strongest card is partly held by its ally.
- **Authority/instrument.** The VEU revocation and its ~1,000 annual licences [S9][S16];
  the US-Korea export-control-alignment deal [S12]; Korea's own notices, AISI joint
  evaluations [S15] and KOACC compute-centre terms [S13].
- **Trigger.** Player asks Korea to "license your AI memory chokepoint" (the in-game
  move) with safety conditions attached.
- **Conditions.** Korea can attach conditions to what it governs directly: its
  safety-duty notices, its compute awards, its AISI evaluation partnerships. For
  Samsung/SK hynix exports it must say that US licence conditions co-govern some flows
  [S9][S12] — and ask the player to bring the US along rather than promise unilaterally.
- **Time cost.** 1 month (ministerial notices) — but the in-game window bonus already
  ties Korea to the January 2027 clock [S14].
- **Plausible response (proposed).** A *conditions* letter: "We can write evaluation
  and incident duties into our notices and our new compute centre's terms. For memory
  exports to third markets, part of the licence is decided in Washington; bring them
  and we'll match."
- **Substitute.** `kr-safety-case-incident-rehearsal` (the team's existing route) as
  the signable piece.
- **Evidence limit.** No evidence Korea can lawfully attach novel safety conditions to
  HBM exports under its strategic-goods regime; the "annual licences granted for 2026"
  detail is press-excerpt-level [S16]; the $750bn Nvidia supply figure is an
  announcement [S11].

### KR-3 — "Announced is not disbursed"
- **Actor.** The same letter writers, with an honesty duty on the numbers.
- **Objective.** Keep the game from treating headlines as commitments.
- **Authority/instrument.** The San Francisco AI Declaration's $950bn of *cooperation
  projects*, SK's $750bn *supply deal*, the 4,000-trillion-won megaproject *plan* [S11]
  versus what the state actually spends now: the ~2.5-trillion-won compute centre [S13]
  and the National Growth Fund's FuriosaAI round [S16b].
- **Trigger.** Player offers Korea a "capital"/"build" deal or cites the megaprojects as
  Korea's contribution.
- **Conditions.** Korea matches genuine public spending and co-funding quickly; it
  *cannot* offer the corporate numbers as its own commitment, and no safety condition
  attaches to SK-Samsung contracts through Seoul.
- **Time cost.** 0 months to say; the money moves at budget cadence.
- **Plausible response (proposed).** "Our sovereign fund and our new centre are ours to
  commit. The $750bn you read about is between companies; we won't pretend to sign for
  them." Letter marks the offer **announced**, not **granted** (the Gulf note's X1
  distinction, applied here).
- **Substitute.** In-game: state-fund co-investment cards with delivery stages from
  `process.md`.
- **Evidence limit.** FuriosaAI's round is press-level (startup-announcement via
  tech/Yahoo) [S16b]; the megaproject totals are government-announced figures [S11],
  not budget lines I could read.

---

## 6. Cross-cutting rules

- **X1 — The rare-earth truce clock.** China's 9 October 2025 controls (reaching
  foreign-made goods containing Chinese-origin rare earths) were suspended around
  1 November 2025 under the Trump–Xi truce, with a one-year delay reported on the
  harshest parts [S28][S29]. The scripted December 2026 squeeze should be presented as
  *the pause expiring*, and the player should have a counter-move (renew the truce,
  stockpile, substitute) before it bites. This also explains why Japan and Korea both
  ask for minerals tokens in-game — their real behaviour matches [S5][S11].
- **X2 — Announced / committed / granted.** Letters from all three governments should
  carry one of these three status words for whatever they promise: $950bn projects
  (announced) [S11]; Japan's year-end action plan (committed-to-a-date) [S2]; Taiwan's
  2026 ADI review (a granted, dated programme action) [S26].
- **X3 — Being the US's partner does not immunise you from the US.** The VEU
  revocation hit the closest US allies in chips [S9]; the 50-50 demand hit Taiwan [S20];
  the US leans on allies for naval deployments and defence spending [S7][S22]. The
  February 2027 "US leans on an ally" event is realistic — and should fire even inside
  US-aligned coalitions.
- **X4 — Partnering with one rival is not automatic hostility from the other.** Korea
  signed one-China-respecting documents with China while deepening the US and Japan
  channels [S6][S7][S10]; Japan refused China's retraction demand while re-anchoring to
  the 1972 communiqué and keeping dialogue open [S4]. Never code "US partner ⇒ China
  sanctions it" or its reverse as a rule; the observed triggers are specific acts
  (Taiwan security statements, chip-sourcing demands), not alignments.
- **X5 — Their export-control tools are list-based and slower than America's.** None
  of the three has a US-style Entity List; Japan's end-user list is WMD/military-only
  [S3][S27]; Taiwan is the partial China-wide exception [S27]; Korea polices technology
  leakage through its industrial-technology act [S27]. Chokepoint moves by these
  governments should be slower, narrower, and more porous than the US equivalent — and
  occasionally routed around by their own companies, as Japanese firms did in 2019 [S27].

---

## 7. Contradictory evidence and things I could not establish

- **Japan's late-October AI Act review committee.** Reported by a news-aggregator post
  as announced 6 October 2026 by Digital Minister Furukawa, "penalties as the focus",
  first meeting late October [S8]. The Digital Agency confirms a Furukawa press
  appearance on 30 October 2026 but its transcript was unpublished at cutoff, and I
  found no primary announcement of the committee. The second AI Basic Plan's review
  mandate [S1] makes the direction plausible; the specific committee is unverified.
- **China's retaliation menu vs Japan.** "Export restrictions" is confirmed by Foreign
  Policy's reporting [S6]; one encyclopedia-style source claims rare-earth export bans
  specifically, which I did **not** use because I could not verify it. The seafood
  suspension and travel caution are documented [S4][S5]. ORF's supply-dependence
  percentages (~60% rare-earth magnets, 45% electronics value) are a single think-tank
  author's figures — indicative, not authoritative [S5].
- **The truce's exact resumption date.** The one-year-delay reading is from commentary
  on the 1 November 2025 fact sheet [S29]; I found no primary text fixing the
  suspension's end date. The game should show a *reported* clock, not a certain one.
- **Korea's compute-centre tender history.** Two failed tenders and a policy retreat is
  from one tech-news piece [S13]; the groundbreaking, Haenam site, Samsung SDS-led
  KOACC and 2028/2030 targets are corroborated by MSIT's own release title and several
  outlets [S13]. Earlier reporting placed bids around Ulsan [S13b]; the shift to Haenam
  is real but unexplained in what I retrieved.
- **$950bn vs $1.23tn.** Yonhap's presidential-office figure is $950bn in cooperation
  projects [S11]; one outlet reported "$1.23 trillion in deals" for the same summit. I
  use the presidential-office number and flag the discrepancy.
- **Taiwan's defence trajectory.** "Above 3% this year, 5% by 2030" is consistent
  across three press excerpts but I did not retrieve a government budget document [S22].
- **FuriosaAI's Series D.** Startup/tech-press level with a Yahoo Finance press-release
  wire copy; the National Growth Fund anchor is reported, not registry-verified [S16b].
- **Late-October/November 2026 events I saw only as headlines:** Korea's October
  exports ($115.3bn, chips-led), a DMZ mine-blast discussion at the G20, and North
  Korea's cluster-munition warhead test [S17]. Headline-level only; do not build
  mechanics on them without verification.
- **Not retrieved at all:** any text of the US-Korea or US-Japan technology-cooperation
  deals [S12]; the US-Taiwan tariff agreement text; TSMC's own strategy statements;
  MSIT's current notice calendar; MOFA Japan's country pages (HTTP 403); Reuters
  article bodies (HTTP 401); CNA article bodies (HTTP 404); Japan's Rapidus status;
  any Japanese read of the BIS VEU revocation; whether the US discussed AI-chip
  onshoring conditions with Korea in 2026.

---

## 8. Source ledger

All items observed on **1 November 2026**. "Published" = the document's own date;
"event" = when the underlying thing happened. Team-verified entries are reused from
`data/geneva-research.json` and `data/route-research/finance-compute.json` ledgers and
marked as such — I did not re-fetch them.

| ID | Source | Published | Event | Status / locator |
|---|---|---|---|---|
| S1 | Cabinet Office (Japan), *Summary of Japan's Second AI Basic Plan* (English, 6 pp, PDF) | 2026-07-14 | Cabinet decision 2026-07-14 | **Read, full text** via macOS PDFKit after a direct PDF fetch failed. Locators: "Four Principles"; Pillar 2 "Expand domestic production... data centers, computing resources, and semiconductors"; Pillar 3 "Operationalize... Article 16 of the AI Act", "Project YATA-Shield", "Establish and enhance AISI's technical evaluation capabilities... crisis-time information sharing", "AISI International Network", "convening an AI Summit in Japan at an early opportunity"; Pillar 4 IP protection; annual update clause. https://www8.cao.go.jp/cstp/ai/ai_plan/aiplan_g_eng_20260714.pdf |
| S2 | Japan Times (Jiji), *Takaichi says government will compile action plan to spread the use of AI* | 2026-10-01 | Council for Japan's Growth Strategy meeting 2026-10-01 | **Read, full.** "Action plan by the end of the year"; five years from April 2027 intensive investment in 17 strategic sectors incl. AI and semiconductors; special account for economic-security sectors; multi-year budget visibility. https://www.japantimes.co.jp/news/2026/10/01/japan/politics/takaichi-ai-promote/ |
| S3 | METI, *Review of the End User List...* | 2025-09-29 | Applied from 2025-10-09 | **Read, full.** 835 listed entities (+87) from 15 countries/regions; WMD/missile/conventional-weapons catch-all purpose; "not an embargo list"; issued by Security Trade Control Policy Division, Trade Control Department. https://www.meti.go.jp/english/press/2025/0929_003.html |
| S4 | The Japan News (Yomiuri), *Japan, China Still at Odds Over Takaichi's Taiwan Remark Even After Diplomatic Talks in Beijing* | 2025-11-19 (13:18 JST) | DG talks 2025-11-18 | **Read, full.** Kanai (MOFA Asian and Oceanian Affairs Bureau) vs Liu Jinsong; 1972 Joint Communiqué re-anchor; retraction demand; Osaka consul-general's X post protest; Beijing travel caution; Li Qiang declines G20 meeting with Takaichi; Kihara: open to dialogue. https://japannews.yomiuri.co.jp/politics/politics-government/20251119-293605/ |
| S5 | ORF (A. R. Alok), *The Economic and Diplomatic Costs of Takaichi's Taiwan Remarks* | 2025-12-18 | Remark 2025-11-07 | **Read, full.** China = 2nd export market (US$125bn, 2024, UN COMTRADE); seafood re-suspension; air-route cancellations; ~60% rare-earth-magnet import reliance; Suzuki 2025 closure; APEC (Korea) rebuke. **Author is an ORF research intern; figures are his, treated as indicative.** https://www.orfonline.org/expert-speak/the-economic-and-diplomatic-costs-of-takaichi-s-taiwan-remarks |
| S6 | Foreign Policy World Brief (A. Sharp), *Japan Courts South Korea Amid Rift With China* | 2026-01-13 | Nara summit 2026-01-13 | **Read, full.** "Survival-threatening situation" timing (Nov 2025); Chinese retaliation list (travel bans, export restrictions, summoned ambassador); Lee's China visit first since 2019; Lee: "matter for China and Japan", "starting a new 60 years"; Yoon death-penalty request, ruling expected February. https://foreignpolicy.com/2026/01/13/japan-takaichi-south-korea-lee-china-xi-taiwan/ |
| S7 | The Diplomat (Kimiya Tadashi), *Japan and South Korea Navigate a Turbulent World* | 2026-06-12 | Andong summit 2026-05-19 | **Read, full.** Trump–Xi summit 2026-05-14/15; briefing asymmetry (Takaichi 5/15, Lee 5/17); Lee cites JCK vs Takaichi's JUSK; ACSA unresolved; crude/LNG swap; Hormuz burden-sharing ask; NK "two states" constitution; South Korean concern over Japan's constitutional revision. https://thediplomat.com/2026/06/japan-and-south-korea-navigate-a-turbulent-world/ |
| S8 | News-aggregator summary of Sept–Oct 2026 Japan AI regulation news (note.com) + Digital Agency event page | 2026-10-06 / event 2026-10-30 | — | **Excerpt-level only.** Aggregator: Furukawa announced 2026-10-06 an AI Act review committee to launch late October, "penalties as the focus". Digital Agency page confirms the 2026-10-30 press appearance but states the transcript is forthcoming. Treat the committee as reported-until-primary. https://www.digital.go.jp/speech/minister-261030-01 |
| S8b | Digital Agency Gen-nai programme sources (programme page updated 2026-10-30; FY2027 call plan 2026-05-29; first staff-survey results 2026-10-30) | 2026-05-29 / 2026-10-30 | Programme milestones | **Team-verified** in `data/geneva-research.json` (ids `apac-jp-main`, `apac-jp-next`, `apac-jp-plan`, `apac-jp-survey*`). Windows: FY2027 call screening 2026-11→12; evaluation/notice 2027-01→02; award 2027-03; paid use 2027-04. Not re-fetched. |
| S9 | BIS final rule, *Revocation of Validated End-User Authorizations in the PRC*, 90 FR 42321 | 2025-09-02 (public inspection 2025-08-29) | Effective 2025-12-31 | **Read, full.** Removes Intel Semiconductor (Dalian), Samsung China Semiconductor, SK hynix Semiconductor (China) from the VEU list; ERC (State/Defense/Energy/Commerce) decision; ~1,000 additional licence applications annually (+495 burden hours). TSMC's Nanjing fab is not among the removals. https://www.federalregister.gov/documents/2025/09/02/2025-16735/revocation-of-validated-end-user-authorizations-in-the-peoples-republic-of-china |
| S10 | Chinese MFA readout, *President Xi Jinping Holds Talks With ROK President Lee Jae Myung* | 2026-01-05 | Talks 2026-01-05 | **Read, full.** State visit; 15 cooperation documents signed (sci-tech, environment, transport, economy/trade); Xi proposes cooperation in "artificial intelligence, green industries and the silver economy"; WWII-victory framing; Lee reaffirms one-China stance; Lee wishes China's 2026 APEC year success. https://www.fmprc.gov.cn/eng/xw/zyxw/202601/t20260105_11806810.html |
| S11 | Yonhap (P. Boram), *Lee advances S. Korea's AI chip hub vision with U.S. deals, S. America critical mineral cooperation* | 2026-08-02 | SF summit 2026-07-24/25; South America 2026-07-27/31 | **Read, full.** US$950bn cooperation projects; SK Group US$750bn chip supply to Nvidia et al.; "San Francisco AI Declaration" quote; June "three megaprojects" >4,000T won (semiconductor cluster, physical AI, AI data centres); Brazil/Chile/Argentina minerals; NSA Wi Sung-lac framing. https://en.yna.co.kr/view/AEN20260801003100315 |
| S12 | Korea Herald, *S. Korea, US to sign deal to strengthen AI cooperation: report* | 2025-10-29 | Signing 2025-10-29, APEC Gyeongju | **Read, full.** Deal on AI, quantum, 6G; strengthen AI export controls + reduce cross-border data burdens; signed by White House OSTP director Kratsios; follows similar US deals with Japan and Britain (per Bloomberg/Yonhap). https://www.koreaherald.com/article/10603735 |
| S13 | MSIT release, *National AI Computing Center... Breaks Ground in Haenam* + press corroboration (Korea Times, etnews, Sedaily, biz.chosun; May 2026 Sedaily on consortium finalisation) | 2026-08-03 (groundbreaking) | Groundbreaking 2026-08-03; consortium finalised 2026-05-11 | **Excerpts (official release title + multiple outlets).** Solaseado Data Center Park, Haenam; Samsung SDS-led KOACC public-private JV; ~2.5T won (~US$1.75bn); 15,000 accelerators by 2028, reported target 50,000 by 2030; 400bn won initial funding (May). Two-failed-tenders detail from one outlet (TechTimes). Ulsan-bid reports (Sept 2025) predate the final site. MSIT: https://www.msit.go.kr/eng/bbs/view.do?sCode=eng&mPid=2&mId=4&bbsSeqNo=42&nttSeqNo=1291 |
| S13b | Asia Economic Daily, *Ulsan City Formalizes Bid for AI Computing Center... U-NEXT AI Forum* | 2025-09-30 | Ulsan bid launch 2025-09-30 | **Excerpt via search.** Bid-stage reporting that predates the final Haenam site selection. https://www.asiae.co.kr/en/article/2025093008474597251 |
| S14 | MSIT, *The AI Basic Act Comes into Force... AI G3* + Feb 2026 safety-duty notice consultation | 2026-01-22 (commencement) | Commencement 2026-01-22; consultation 2026-02-06→26 | **Team-verified** in `data/geneva-research.json` (`apac-kr-commencement`, `apac-kr-notice`, `apac-kr-consult`, `apac-kr-draft`); the 2027-01-22 grace/notice clock is team-derived, not a confirmed deadline. Not re-fetched. |
| S15 | SG/KR AISI, *Evaluation of leakage risks in tool-using LLM agents* (joint report) | 2026-06-16 | Study published June 2026 | **Team-verified** in `data/geneva-research.json` (`apac-sg-kr-test`). Documents standing Korea–Singapore safety-institute evaluation cooperation. Not re-fetched. |
| S16 | TrendForce, *Samsung, SK hynix Escape Worst-Case as China VEU Ends: Annual Review Risks Loom* | 2025-12-30 | — | **Excerpt via search only.** 2026 annual licences granted; annual-review risk framing. The ~1,000-approvals estimate itself is primary in S9. https://www.trendforce.com/news/2025/12/30/news-samsung-sk-hynix-escape-worst-case-as-china-veu-ends-annual-review-risks-loom/ |
| S16b | TechWire Asia + Yahoo Finance wire, *FuriosaAI US$620m Series D, National Growth Fund anchor* | 2026-10-28 | Announcement 2026-10-28 | **Excerpt-level press.** US$620m at US$2.9bn valuation; state-backed National Growth Fund largest investor. Not registry-verified. https://techwireasia.com/2026/10/furiosaai-series-d-korea-national-growth-fund-ai-chips/ |
| S17 | Yonhap front-page headlines observed 2026-11-01 (October exports US$115.3bn; DMZ mine-blast position at G20; NK cluster-bomb warhead test) | 2026-10-31/11-01 | — | **Headline-level only.** Context, not foundations. https://en.yna.co.kr |
| S18 | moda (Taiwan) press release, *Legislative Yuan Passes Artificial Intelligence Fundamental Act in Third Reading...* | 2025-12-24 | Passage 2025-12-23 | **Read, full.** Seven governance principles; NSTC drafted from 2024 (draft announced 2025-07-15); moda took over the legislative process in 2025 and is studying an AI risk-classification framework; "generous AI budget", subsidies; goal to go "beyond its semiconductor advantage". https://moda.gov.tw/en/press/press-releases/18316 |
| S19 | US Library of Congress Global Legal Monitor, *Taiwan: New Law Establishes Basic Framework on AI* (+ NSTC English law text) | 2026-05-07 | Promulgated/effective 2026-01-14 | **Excerpt (LOC) + official law page (title/dates).** 20-article act; NSTC designated central competent authority; Executive Yuan to set up a National AI Strategy Special Committee. LOC: https://www.loc.gov/item/global-legal-monitor/2026-05-07/taiwan-new-law-establishing-basic-framework-on-artificial-intelligence/ ; law text: https://law.nstc.gov.tw/EngLawContent.aspx?id=10099&lan=E |
| S20 | HKFP (AFP), *Taiwan says 'will not agree' to making 50% of its chips in US* | 2025-10-01 | Cheng Li-chiun remarks 2025-10-01 | **Read, full.** Direct quotes refusing the 50-50 split; Lutnick's NewsNation statements; temporary 20% US tariff; Trump's semiconductor-tariff threat; >70% of Taiwan's US exports are ICT (cabinet statement); pledges: more US investment, US energy purchases, defence >3% GDP; silicon-shield framing. https://hongkongfp.com/2025/10/01/taiwan-says-will-not-agree-to-making-50-of-its-chips-in-us/ |
| S21 | Taipei Times, *China should restrain itself, Lai says*; UPI, *Taiwan, China react sharply differently to Japan's Taiwan remarks* | 2025-11-18 / 2026-01-28 | CCG vessels near Senkaku after Takaichi remark | **Excerpts via search.** Taipei welcomed Japan's stance while Beijing retaliated. https://www.taipeitimes.com/News/front/archives/2025/11/18/2003847383 ; https://www.upi.com/Top_News/World-News/2026/01/28/china-taiwan-responded-different-ways-japanese-pm-takaichi-sanae-remarks/4241769649557/ |
| S21b | Reuters-observed Taiwan resilience drill reporting (politicstoday) + Epoch Times bunker-drill photo report | 2026-08 | Drills Aug 2026 | **Excerpt-level.** Whole-of-society resilience exercises continue through 2026. |
| S22 | Al Jazeera + Seoul Economic Daily (English) + Defense Post on Lai's National Day speech | 2026-10-10 | Speech 2026-10-10 | **Excerpts via search, consistent across three outlets.** Lai rejects "subordination imposed through Chinese military pressure"; defence spending >3% GDP this year, reported 5% target by 2030 under US pressure; China condemned the speech. https://www.aljazeera.com/news/2026/10/10/taiwan-president-says-defence-spending-boost-aims-to-deter-war |
| S23 | East Asia Forum, *Northeast Asia's trilateral framework has hollowed out* | 2026-08-13 | 9th CJK summit 2024-05; 10th stalled since | **Excerpt via search.** Japan holds the coordination chair; the 10th summit was never officially cancelled; China–Japan friction is the primary cause. https://eastasiaforum.org/2026/08/13/northeast-asias-trilateral-framework-has-hollowed-out/ |
| S24 | Chosun Ilbo (English), *Japan-China Tensions Scuttle Trilateral Summit Plans* | 2025-11-22 | Plan for Jan 2026 summit collapsed | **Excerpt via search.** China refused; Takaichi-remark backlash the cause. https://www.chosun.com/english/world-en/2025/11/22/PGMUERUT6FBBPCDT3C7ZVNFH2M/ |
| S25 | Taiwan 2026 local-election calendar: CNA topic page; Taiwan.md candidate roster checked against the CEC's 2026-10-16 qualification release; Wikipedia summary | observed 2026-11-01 | Election day 2026-11-28 | **Excerpts, mutually consistent.** "Nine-in-one" local elections across 22 cities/counties; 81 mayoral/magistrate candidates registered. |
| S26 | Taiwan ADI public-compute programme (2026 application cutoff 2026-10-30; final review 2026-11-02; access rules dated 2026-08-14 with logs/reporting/suspension remedies; TWSC implementing operator; 2027 draft budget) | 2026-10-30 | Programme actions | **Team-verified** in `data/geneva-research.json` (`fin-tw-*` windows) and `data/route-research/finance-compute.json`. Not re-fetched. ADI 2027 draft-budget PDF (team-read): https://www-api.moda.gov.tw/File/Get/adi/zh-tw/szsgzAtSajkTt6G |
| S27 | CSIS (G. C. Allen & I. Goldston), *Understanding U.S. Allies' Current Legal Authority to Implement AI and Semiconductor Export Controls* | 2025-03-14 | — | **Read, most of report.** JP/KR/TW have end-user authority but narrower than the US Entity List; Japan's list is WMD/military-only; no allied country has publicly entity-listed Chinese AI/chip firms; Japan's 23 SME controls (Jul 2023) under the 1949 FEFTA, without presumption of denial; the 2019 Japan–Korea white-list delisting and the production-relocation workaround; Korea's industrial-technology act use; Taiwan as the partial China-wide exception; trilateral-deal gaps and the 2023 stockpiling window. https://www.csis.org/analysis/understanding-us-allies-current-legal-authority-implement-ai-and-semiconductor-export |
| S28 | MOFCOM Notice 2025 No. 61 (9 October 2025), CSET English translation | 2025-10-09 | Controls announced 2025-10-09 | **Excerpt (CSET translation description).** Requires Chinese approval to export dual-use items containing even trace Chinese-origin rare earths; reaches goods made outside China, notably semiconductor- and AI-related devices/components. https://cset.georgetown.edu/publication/mofcom-notice-2025-61/ |
| S29 | Pillsbury Law + FDD commentary on the 1 November 2025 US fact sheet and the Trump–Xi truce (APEC, South Korea, late Oct 2025) | 2025-11 | Fact sheet 2025-11-01 | **Excerpts.** China "will suspend the global implementation" of the 9 Oct controls; general licences for rare earths/gallium; a one-year delay reported on the harshest new measures. Suspension end-date not primary-verified. https://www.pillsburylaw.com/en/news-and-insights/china-suspends-export-controls-certain-critical-minerals-related-items.html |

**Latest verified evidence:** 30 October 2026 (S8b Gen-nai survey publication; also
S16b's 28 October announcement). **Gap to cutoff:** 2 days, unsearched for these three
governments specifically.

**Inaccessible / not read:** MOFA Japan country pages (HTTP 403); Reuters article
bodies (HTTP 401); CNA article bodies (HTTP 404); MOFCOM's original Chinese notice
text; Taiwan Executive Yuan/NSTC Chinese pages; Korea Presidential Office English
pages; the texts of the US-Korea and US-Japan tech deals; the US-Taiwan tariff
agreement; TSMC strategy statements; the Digital Minister's 30 Oct transcript
(forthcoming); any Japanese/Korean government read on the BIS VEU rule.

---

## 9. Recommended integration (proposal only — I edited nothing)

1. **Give the three governments distinct mandates and clocks** (the Gulf note's
   pattern): Japan — "AI Strategic Headquarters / Digital Agency / METI", clock:
   year-end action plan + FY2027 Gen-nai call; Taiwan — "NSTC (AI Basic Act) / ADI
   (compute awards)", clock: 2 Nov 2026 review, 28 Nov 2026 elections; Korea — "MSIT
   (AI Basic Act) + KOACC", clock: 22 Jan 2027 notices. The game's counterpart titles
   are already JP=METI and KR=MSIT; Taiwan's card says "Minister of Economic Affairs"
   but the Basic Act's central authority is NSTC — fix the mandate text, not the data.
2. **Reuse the five existing dialogues** rather than writing new ones: JP-1 →
   `jp-procurement-safety-evidence` and `jp-kr-sg-procurement-profile`; KR-2 →
   `kr-safety-case-incident-rehearsal` and `sg-kr-jp-shared-eval-evidence-protocol`
   (the SG/KR AISI precedent is the factual spine); TW-2 →
   `taiwan-public-compute-safety-conditions`.
3. **Add one Taiwan window** to `data/windows.json` when the owner integrates: AI
   Basic Act implementation/sub-instrument drafting under NSTC (approximate date,
   post-promulgation work), plus the 28 November 2026 local-election date as a
   domestic-attention flag. Conditions 2, 4, 6 fit the observed programme remedies.
4. **Wire the letter states to `process.md`'s classes** (`signs / refers / conditions /
   declines` + `announced / committed / granted` status). None of these rules should
   ever display a percentage.
5. **Tie the December 2026 China event to the truce clock (X1)** and let the player
   act before it fires (stockpile is already in the game; "renew the truce" would be a
   new summit-tour-style move).
6. **Make JP-3 and KR-2 visible honesty devices**: the chokepoint screens should say
   what list-based licensing can and cannot do, and KR-2 should name the US licence
   constraint on Korean memory exports.
7. **Reactions to partners, not affinity scores**: Taiwan's and Korea's letters should
   visibly change with coalition composition (TW-3, KR-1) — this is the "reaction to
   previous player actions/partners" the brief asks for, and it is cheap to implement
   as a lookup on `g.coalition` membership.

---

## 10. Next discriminating questions

1. Did Japan's AI Act review committee actually convene in late October 2026, and did
   the Digital Minister's 30 October appearance address it? (Fetch the transcript when
   the Digital Agency publishes it; check METI/AI Strategic Headquarters meeting
   records.)
2. What exactly does the Nov 2025 truce suspension say about duration and renewal —
   and was it discussed at the Trump–Xi meeting of 14–15 May 2026 [S7]?
3. Did Korea publish its AI Basic Act enforcement-notice calendar for January 2027, and
   does any notice text already contain evaluation or incident-reporting duties usable
   for condition 1?
4. Did Taiwan's AI Basic Act machinery (National AI Strategy Special Committee) meet,
   and did moda's risk-classification framework reach draft form before 1 November 2026?
5. Did Japan or Korea make any public, on-record read of the BIS VEU revocation —
   a protest, a licensing-workaround plan, or an acceptance? (Would calibrate how much
   "US constraint" to show on the KR-2 screen.)
