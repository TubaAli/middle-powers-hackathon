# Routes to safeguards: procurement pair (Japan national / Japan–Korea–Singapore coordinated) — observed 2026-10-31

> Later same-day update: the Geneva investigation retrieved the original vendor call and FY2027 plan. Safety explanations and benchmark submissions already exist. The current route instead asks what version-specific retesting and incident duties can be added to executed terms. See `data/route-research/procurement.json` and `research_notes/Safeguard validation by Geneva/apac.md`; retrieval gaps below describe the earlier pass.

> Integration review: this is the original working investigation. The published JSON corrects unsupported regional absence claims, assumed remedies, legislative sufficiency and open-window inferences. “Not located” does not mean “does not exist.” Japan's confidence is Medium because operative tender terms were not retrieved. Use `data/route-research/procurement.json` for the integrated assessment; dates in this note are not verified negotiation opportunities.

Researcher file for the routes-to-safeguards plot (DESIGN.md, approved 31 Oct 2026). I own exactly two files: `data/route-research/procurement.json` and this note. The parent session is building the UI concurrently; sibling files in `data/route-research/` (eurohpc, evaluation) are other agents' work.

**Method.** All web content was observed **2026-10-31**; publication dates and event dates are recorded separately. The two routes are a designed pair (`pairId: procurement`) testing DESIGN.md's coordination hypothesis: the same mechanism (Procurement), once national and once coordinated across three middle powers. Axes are **ordinal editor assessments, not calibrated probabilities or measured risk reductions**; ranges are judgment ranges, not statistical confidence intervals; confidence rates the evidence for the *mechanism*, never predicted impact. No coordination bonus is built into either axis — the coordinated route scores +1 impact and −1 feasibility against its national pair on the merits, and the ranges overlap (national impact [2,4] vs coordinated [3,5]) so the plot should not display clean separation.

**Starting position.** The parent had already read the Digital Agency's Gen-nai Standard release (`https://www.digital.go.jp/policies/genai/agent-safety-standard`) and flagged the key discipline: the standard supports *government agent governance with AISI cooperation*, **not vendor contract enforcement**. The earlier APAC note (`research_notes/Asia Pacific safeguard coalitions/japan-korea.md`) is treated as provisional with potential overclaims; every load-bearing fact below was re-verified against a primary source this pass, and its heuristic weighted scores (8.35 etc.) were **not** carried over.

---

## Route 1 — Japan national: vendor safety-evidence requirements in government AI procurement (`jp-procurement-safety-evidence`)

Status **Proposed**, confidence **High**, impact 3 [2–4], feasibility 4 [3–5], coordination **national**.

### What the primary sources establish (all read 2026-10-31)

- **The buyer pool is real, unified and dated.** The Digital Agency's Gen-nai is the whole-of-government generative-AI platform: ~180,000 national officials in FY2026 (main policy page, last updated 2026-10-30), with full-scale use from FY2027 (Release 3.0) funded by participating ministries' budgets (their 概算要求 were made spring–summer 2026; Diet approval by end-March 2027). No other Japanese buyer concentrates demand like this.
- **Rolling model procurement exists.** Domestic-LLM public call 2025-12-02 (results 2026-03-06); pre-announcement of a domestic foundation-model call 2026-05-29; domestic foundation models trialled on domestic cloud from 2026-07-10. Procurement is framed as safety- and sovereignty-serving: "国内で開発されたAIの調達・利用を通じ…日本のAI自律性確保を推進" (via procuring and using domestically developed AI, promoting safe, secure AI use and Japan's AI autonomy).
- **The Gen-nai Standard (published 2026-10-20) is a government-side instrument.** It sets duties for three roles — 利用者 (officials), 管理者 (CAIO, PMO, system administrators), 源内開発者 (Digital Agency staff) — and was drafted "with the cooperation of AISI". It is offered as a *model case* for local governments and private businesses, and Gen-nai OSS Ver.2.0 (commercial-use licence, anyone may use/modify/redistribute) follows ~Feb 2027.
- **The standard already requires model evaluation — on the government side.** Its principles include 基盤モデルの評価・選定体制の確立 (establishing a foundation-model evaluation/selection system) and 国内外の基盤モデルの適切な選択 (appropriate selection of domestic and foreign foundation models). User duties adopt a risk-based approach **based on the AI Procurement and Utilization Guideline (AI調達・利活用ガイドライン)**, using its high-risk determination sheet (高リスク判定シート) with CAIO reporting, plus human-in-the-loop (no direct copying of unverified AI output into official documents) and a shadow-AI ban.
- **The procurement guideline sits inside the AI Act framework.** The standard's governance diagram: "AI法を基礎に、基本計画・重点計画・調達利活用ガイドラインが連携し、政策から実務までをカバー" (the AI Act as basis, with basic plan, priority program and procurement guideline linked, covering policy through practice). Its quoted Second AI Basic Plan excerpt commits the government to lead proper procurement and utilization so that AI used across Japanese society is reliable and transparent.
- **The verifier is named and committed, but not yet wired.** The Second AI Basic Plan (Cabinet decision 2026-07-14) commits to AISI evaluation capabilities (model assessment, traceability, guardrails, crisis-time information sharing) and to "creating mechanisms to translate evaluation results into policy, regulatory, and operational improvements" — an announced mechanism, not an operating one. The plan updates annually; frameworks including the AI Act are to be reviewed continuously.

### What the route proposes (new, clearly marked)

Vendor-side safety-evidence requirements in the Digital Agency's calls and contracts: pre-deployment safety-evaluation evidence or AISI testing access, incident reporting, and notice of material model changes, as conditions of award and continued platform eligibility — remedies being non-selection, suspension/termination, loss of platform eligibility, all contract-based. **No fetched document imposes any such duty on vendors**; the standard binds government roles only. The claim "no new statute required" is an assessment resting on the government's own contracting authority inside the AI Act-based guideline framework — not on an absence-of-law assertion; competitive-procurement and budget rules still apply.

### Scoring rationale in brief

Impact 3: the demand pool is large and the model-case framing gives diffusion, but reach is public-sector-only, one country, mostly domestic vendors under current calls. Feasibility 4: administrative instrument, machinery running, windows dated and near (工房 ~Dec 2026; OSS ~Feb 2027; FY2027 contracts by Mar 2027; annual plan updates ~Jul 2027); obstacles are procurement-law fit, AISI pipeline build-out, unknown call contents, vendor capacity.

---

## Route 2 — Coordinated: compatible procurement profile across Japan, Korea, Singapore (`jp-kr-sg-procurement-profile`)

Status **Proposed**, confidence **Medium**, impact 4 [3–5], feasibility 3 [2–4], coordination **middle-power**.

### What the primary sources establish (all read 2026-10-31)

- **Institute cooperation is operational, trilateral and recent.** Japan–Korea AISIs held their **first joint technical workshop 2026-10-08/09** (30 researchers; multilingual/multicultural evaluation methods; Japan presented JAI-Trust, its generative-AI safety/security benchmark project; Korea presented multimodal red-teaming; purpose: "lay the foundation for ongoing information sharing and collaboration") — AISI Japan article, published 2026-10-16.
- **Singapore is the network's methodology hub.** The Singapore AISI resources page (fetched) lists: the **NAAIMES Best Practice Guidance Document on Automated Evaluation of LLMs** (Jul 23, 2026) — the network's first guidance for the third-party evaluator ecosystem, confirming the network's current name (International Network for Advanced AI Measurement, Evaluation and Science); the **SG–KR AISI joint evaluation of data-leakage risks in tool-using LLM agents** (report Jun 16, 2026; 12 realistic tasks; "task correctness alone is insufficient to assess agent safety"); the 2026 Singapore Consensus from the International Scientific Exchange; and a 14-country red-teaming challenge.
- **The MDDI Paris release (11 Feb 2025)** confirms Singapore **co-led the AISI network's Testing and Evaluation Track**, released a **Joint Testing Report with Japan** testing guardrails across **10 languages including Japanese and Korean** and five harm categories (explicitly addressing English-centric testing gaps), and runs the **Global AI Assurance Pilot** (AI Verify Foundation + IMDA) convening testing vendors with real GenAI deployers to shape assurance standards and grow the third-party testing market.
- **Korea supplies the statutory hooks.** MSIT release 1071 (posted 2024-12-26): the AI Basic Act (effective January 2026) creates a specialized **AI Safety Institute (Art. 12)**, imposes **transparency (Art. 31), safety (Art. 32) and operator-responsibility (Art. 34)** obligations on high-risk and generative AI, and provides a **legal basis for government support of voluntary private verification and certification (Art. 30)** plus AI impact assessments (Art. 35). Korea's grace period (fact-finding and penalties deferred at least one year — team-verified MSIT release 1215, 2026-01-22, not re-fetched this pass) makes safety documentation commercially pressing by ~January 2027.
- **Japan supplies the published template** (Route 1's Gen-nai Standard and procurement guideline).

### What the route proposes (new, clearly marked)

"Evaluated once, accepted across": a common minimum clause set plus an institute-level mutual-recognition arrangement — one pre-deployment evaluation per model, in a shared evidence format covering Japanese-, Korean- and regional-language failure modes, performed by or accepted from any of the three AISIs, plus mirrored incident-notification and model-change-notice clauses. **Documented absence (team research, this pass and earlier passes): no mutual recognition of AI test results and no common AI procurement clause set exists anywhere in APAC**; regional-mechanisms.md's wider absence findings (no pooled AI procurement mechanism; no regulator crediting a foreign AISI evaluation) still stand. No claim of government assent is made; nothing fetched shows any of the three governments has authorized cross-acceptance of evaluations.

### Scoring rationale in brief

Impact 4: three markets gated by one evidence bar, multilingual coverage English-centric testing misses, race-to-the-bottom removed — but upper bound requires substantive recognition, lower bound is paperwork harmonization. Feasibility 3: the technical layer is draftable from existing cooperation, but the obstacles are governmental — untested recognition mechanism, three legal bases, multiple agencies per country, and **Singapore's procurement anchor missing entirely** (no whole-of-government AI procurement policy located in team research; GovTech/IMDA internal requirements unknown).

### Pair comparison (explicit assumptions)

Coordination buys reach (3→4 impact): pooled demand, multilingual evaluation, regional default. It costs achievability (4→3 feasibility): three consent processes, an untested mechanism, one anchor unverified. If Singapore's procurement anchor turns out not to exist, the honest fallback is a bilateral Japan–Korea profile (the two AISIs with the freshest cooperation) with Singapore as methodology provider rather than procurement party — a materially different route the parent may want to display as the pair's downside case.

---

## Unsupported claims rejected this pass

1. **"The Gen-nai Standard imposes obligations on AI vendors."** False on the standard's own text: the three obligated roles are officials, ministry administrators (CAIO/PMO) and Digital Agency developers. Vendor obligations are the *proposal*.
2. **"Japan's Gen-nai procurements already require safety evidence."** Not established: call documents were not retrieved; contents unknown. Treated as an open question, not a fact in either direction.
3. **"The next domestic-model call is open now."** Rejected — the 2025-12-02 call is closed (results 2026-03-06) and the 2026-05-29 item is a pre-announcement (予告); no current open procurement is inferred from either.
4. **"AISI Japan has (or will receive) a release veto."** Rejected: the standard co-opts AISI as drafter/evaluator; the Basic Plan commits to translation *mechanisms* not yet built; no veto anywhere in fetched text.
5. **"The APAC institutes already mutually recognise evaluations."** Rejected: joint testing reports are shared *methodologies and findings*; no regulator acceptance of another institute's results was found anywhere (documented absence).
6. **The earlier japan-korea note's weighted scores (e.g. 8.35 for compute reciprocity, 6.9 for the procurement profile) were not reused.** The parent flagged that note as provisional with overclaims; my axes are independent editor assessments on the 1–5 plot scale.
7. **"Korea's PPS has AI procurement standards" / "Singapore has a whole-of-government AI procurement policy."** Neither asserted — both explicitly unexamined/unlocated and recorded as gaps.

## Access limits and provenance notes

- **webfetch cannot render PDFs.** The two PDFs (Gen-nai Standard overview; Second AI Basic Plan English summary) were downloaded via curl and text-extracted locally with pypdf (Python 3.14; the Cabinet Office PDF is AES-encrypted with an empty user password, consistent with the earlier note). Extraction was complete enough to quote from: overview 9 pages / 6,884 chars; Basic Plan 6 pages / 13,372 chars. Both marked `primary-read`.
- **No web-search capability in this session** (provider-native search unavailable). Source discovery was therefore confined to URLs already verified in team research notes (the parent's Digital Agency URL plus the japan-korea, singapore-australia and regional-mechanisms ledgers). No new sources could be discovered; claims rest on those.
- **All 8 sources in the JSON are `primary-read`** — four per route, at the 2–4 cap: full HTML pages fetched, or PDFs fully downloaded and extracted.
- **Team-verified, not re-fetched this pass** (same-day reads by the earlier researcher in `japan-korea.md`): the Cabinet Office AI Act overview (no penalties; endeavour-based duties); MSIT release 1215 (grace period; transparency guidelines, 2026-01-22); law.go.kr version lines (Act amendment No. 21311 effective 2026-07-21; Decree No. 36580); AISI Japan's MOCs with OpenAI (2025-05-29) and Anthropic (2025-10-29); Korea's APEC PPSTI chairmanship. Each is attributed as team-verified wherever used; none is load-bearing for a JSON source claim.
- **Not attempted / known blocked**: METI/NEDO GENIAC pages (403 for the earlier researcher; subsidy terms — out of scope for these procurement routes); Korea's aisi.re.kr (timed out earlier); the AI Procurement and Utilization Guideline's own text (referenced only inside the standard's overview — URL/issuer/date not located); the Gen-nai call documents; Korea PPS standards; Singapore GovTech/IMDA procurement requirements.

## Next discriminating questions (in priority order)

1. **Gen-nai call documents + FY2027 tender text** (route 1's baseline and insertion point): do they contain safety-evaluation, incident-reporting or model-change conditions today?
2. **The AI Procurement and Utilization Guideline itself**: who issued it, when, and does it bind vendors or only government users?
3. **Singapore's procurement anchor** (route 2's weakest leg): do GovTech/IMDA have current government AI procurement requirements that could host a shared clause set?
4. **Korea's PPS AI procurement standards** and the Act No. 21311 amendment content — the second national anchor for the coordinated profile.

*Files owned by this agent: `data/route-research/procurement.json` (the pair, exact plot schema) and this note. Not committed — no git operations were in scope; the parent integrates.*
