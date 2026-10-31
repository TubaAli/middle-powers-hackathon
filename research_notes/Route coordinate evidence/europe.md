# European route coordinate evidence

**Cutoff: 31 October 2026. Geneva horizon: 21–22 June 2027.** There are 233 calendar days from cutoff to the opening day. This investigation supplies numerical inputs, not estimated scatter coordinates. The companion `europe.json` contains **7 routes, 69 facts, 42 sources and 25 retrieval records**. Fact and source identifiers below resolve there; publication, observation and underlying event periods are recorded separately wherever known.

## Main finding

The strongest new evidence is actual **2025 LUMI-G award volume**, **national application ceilings and review times**, **Swiss balancing-process volumes and downloadable replay inputs**, and **Ofgem's already-decided technical sandbox**. These make bounded pilots more concrete. They do not establish exact-proposal consent, the fraction of activity actually protected, or a causal safety effect.

No route has enough evidence for a measured consequential-safety-reach coordinate. Feasibility evidence describes procedures and precedents, not calibrated success probabilities. Unknown adoption is not measured rejection, and an unmeasured protected numerator is not an observed zero.

## 1. What existing activity can bound consequential reach?

### EuroHPC AI Gigafactory incident protocol

The tender specifies four Lot 1 projects with at least **25,000 H100-equivalent accelerators each**, and three Lot 2 projects with at least **40,000 each**: a **220,000-equivalent programme design minimum**. A protocol agreed with one project cannot inherit the seven-project total. Projects may span multiple sites; these are neither seven proven facilities nor installed accelerators. The Phase 1 EU budget is up to **€1 billion**, with at least matching national contributions and a per-project EU cap of 17% of IT CAPEX. Funding ceilings are not purchased hours or completed expenditure. ([Tender specifications](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Tender%20Specifications%20v2_V1.pdf), pp.11–12,23; `eu-aigf-lot1` through `eu-aigf-budget`.)

**Usable input:** conditional single-project or whole-programme design scale. **Missing:** selected project, executed contract, purchased capacity schedule, actual utilisation, and how much activity the agreed protocol covers. The planned minimum is not an upper bound on eventual capacity.

### Belgian LUMI safety appendix

Belgium's published allocation is **7.4% of total LUMI computing time**, within the national half. More useful for a bounded pilot, the currently linked instructions cap a preparatory/development application at **25,000 GPU-hours**, and a regular application at **500,000 GPU-hours**. A regular project runs one year. Preparatory access is for development and benchmarking, not a substitute production-training programme. CPU requests reduce the GPU allowance proportionately. ([Access page](https://www.enccb.be/GettingAccess); [2025 application instructions](https://www.enccb.be/sites/www.enccb.be/files/2025-01/LUMI_application_form_instructions_2025.docx); `eu-be-quota`, `eu-be-prep`, `eu-be-regular`.)

The Belgian billing definition charges **four MI250X package-GPU-hours per full node-hour**, making the preparatory ceiling equivalent to **6,250 full node-hours** and the regular ceiling **125,000 full node-hours** under that definition. Each package contains two GPU compute dies. The EuroHPC strategic-allocation table instead reports approximately eight GPU-hours per node-hour. Preserve native node-hours until the accounting definitions are reconciled; doubling or pooling the two GPU-hour conventions would corrupt the comparison. (Instructions, billing section; EuroHPC annual report Table 18; `eu-be-billing`, `eu-ju-strategic`.)

**Usable input:** per-award conditional ceiling, considerably narrower than 7.4% system-wide coverage. **Missing:** Belgian AI-classified awards, consumption and accepted-appendix population. The instructions already request AI-method declarations, including generative language modelling and virtual agents; merely adding an AI checkbox would not be a new safeguard.

### EuroHPC LUMI evaluation-access route

The [EuroHPC 2025 Consolidated Annual Activity Report](https://www.eurohpc-ju.europa.eu/document/download/146a4fd0-5d74-435b-95d5-4d3c746d6de7_en?filename=CAAR%202025%20FINAL.pdf), published 30 June 2026, provides a matched historical LUMI-G allocation ledger:

| Competitive category | 2025 node-hours awarded |
|---|---:|
| Benchmark | 120,000 |
| Development | 351,000 |
| AI for science / collaborative EU projects | 1,024,836 |
| Industrial AI | 251,875 |
| Regular | 876,816 |
| Extreme scale | 3,292,485 |
| **Six-category total** | **5,917,012** |

Tables 14–17, pp.57–59,65,67; `eu-ju-ai-science` through `eu-ju-ai-floor`. Industrial AI comprises 10,625 playground, 78,750 fast-lane and 162,500 large-scale node-hours. The two explicitly AI-labelled categories total **1,276,711 node-hours**, or **21.577%** of this six-category denominator. Other categories may also include AI. This is historical category composition, not a safety coverage fraction. It excludes **1,236,723 strategic node-hours**, national allocations and unobserved consumption. The published EuroHPC channel is 50% of LUMI resources, but that does not turn historical awards into half of all AI activity. ([Allocation split](https://lumi-supercomputer.eu/get-started/); annual report Table 18.)

**Usable input:** observed award volumes for relevant AI access paths, with an explicitly matched denominator. **Missing:** consumption, current award recipients, accepted evidence-access terms and changed behaviour. Do not project the 2025 mix onto 2027 without evidence.

### Shared national LUMI evidence protocol

All national channels together receive **50%** of LUMI resources. The [operational allocator table](https://docs.lumi-supercomputer.eu/firststeps/accessLUMI/) lists **eleven country channels**. These are not eleven proven legal vetoes: Belgium lists two operational bodies, and several labels represent consortia. Belgian 7.4% is already inside the national half. (`eu-national-quota`, `eu-national-countries`.)

CSC reports **140 million cumulative GPU-hours**, nearly **7,000 users**, and more than half of resources serving AI-related work in its [10 June 2025 account](https://csc.fi/en/media-release/lumis-capacity-in-high-demand-to-be-succeeded-by-an-ai-optimized-supercomputer/). Its [15 January 2026 retrospective](https://research.csc.fi/2026/01/15/breakthrough-science-enabled-by-lumi/) reports around **3,500 projects** since launch. The periods and units do not support multiplying 140 million by 50%, 7.4% or the reported AI share. Users are not independent organisations, and projects are not distinct models. (`eu-lumi-historical-gpu` through `eu-lumi-projects`.)

**Usable input:** a conditional allocation envelope and institutional scale. **Missing:** a harmonised national AI award/consumption ledger and actual adoption. Finnish published ceilings of 5,000 GPU-hours for development/benchmarking and 100,000 for regular access provide a smaller pilot comparator, subject to unit reconciliation. ([Finnish access modes](https://research.csc.fi/resources/finnish-lumi-resource-applications/).)

### Swiss electricity-operator fallback

Swissgrid's [2025 annual report](https://www.swissgrid.ch/dam/jcr%3A96d467f1-2dc9-4977-bf99-9dc8722c6149/swissgrid-annual-report-2025-en.pdf), p.144, reports **913 GWh positive** and **506 GWh negative control energy**. Keep the directions separate rather than netting away operational exposure. These are balancing-process volumes, not electricity supplied to a defined AI-facility population, and not all proven to be controlled by one model. (`eu-ch-positive`, `eu-ch-negative`.)

Secondary balancing-energy activations fell **22% in January–October 2025 versus the same months of 2024**. Swissgrid attributes this to multiple measures including forecasting and Optimizer Autopilot. This is observational operational evidence, not causal attribution to AI, a fallback test, or outages prevented. (`eu-ch-operational-change`.)

The [grid-data page](https://www.swissgrid.ch/en/home/operation/grid-data/control-energy-system-balance.html) showed missing chart data, but both CSV downloads worked. The control-energy file contained **28,608 data rows**, through 25 October 2026 23:45; the control-area-balance file contained **29,088**, with explicitly UTC timestamps through 30 October 22:45. Headers, counts, boundaries and sample intervals were checked, not full continuity or missingness. Quarter-hour aggregate data can support an offline replay investigation; it cannot validate fast controller fallback or reveal model action logs. (`eu-ch-data-rows` through `eu-ch-sampling`; direct download URLs in JSON.)

**Usable input:** relevant process-volume context and a concrete public data inventory. **Missing:** model-specific dispatch volume, fault episodes, controller actions and recovery performance. Prefer this process denominator over national electricity or unspecified AI-facility MWh.

### UK energy staged-autonomy assurance

[DESNZ's evidence call](https://www.gov.uk/government/calls-for-evidence/vision-for-an-ai-enabled-clean-energy-system/vision-for-an-ai-enabled-clean-energy-system-html) reports a tenfold increase in NESO balancing instructions between December 2023 and June 2025, to **over 200,000**. The underlying NESO skip-rate page returned HTTP 403, so the exact count-period definition remains unverified. This is official secondary evidence of operational complexity, not an AI-only workload or pilot denominator. DESNZ identifies NESO's Volta as a relevant programme; its original page was also inaccessible. (`eu-uk-instructions`, `eu-uk-named-owner-lead`.)

**Usable input:** a named operator programme and candidate process metric. **Missing:** selected workflow, asset inventory, affected MW/MWh, baseline failure rates and actual pilot participation. The **32 responses** to Ofgem's sandbox consultation are engagement, not 32 route consents.

### UK agent accountability evidence

The ICO's [industry-supervision report](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/building-trust-and-transparency-into-generative-ai-development-our-work-to-create-regulatory-certainty/industry-supervision/) names **eleven priority developers**. Ten made **or committed to** changes. Apple, Cohere and OpenAI are explicitly described as having completed particular transparency-information changes; this is a narrow named subset, not an exhaustive count of all completed changes. Neither 10/11 nor 3/11 is an agent-safeguard success probability. (`eu-ico-priority-developers` through `eu-ico-completed-transparency`.)

The [8 October announcement](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/10/ico-secures-changes-from-leading-ai-developers-as-scrutiny-extends-to-ai-agents/) identifies agent-related enquiries to OpenAI, Anthropic, Meta and UK AISI: **three developers and one institute**, not four deployers. The [annual report](https://ico.org.uk/about-the-ico/our-information/annual-reports/information-commissioners-annual-report-202526/performance-overview/objective-2-empower-responsible-innovation-and-sustainable-economic-growth/) reports more than 25 organisations helped by the sandbox across all topics and sixteen recruitment-ADM organisations committing to recommendations. Neither establishes completed agent safeguards. (`eu-ico-agent-enquiries`, `eu-ico-sandbox-precedent`, `eu-ico-adm-commitments`.)

**Usable input:** demonstrated supervisory reach and adjacent implementation precedent. **Missing:** a frozen agent-workflow/execution population, adoption of the proposed controls and measured unauthorised-action or accountability outcomes.

## 2. What implementation precedents exist before Geneva?

### Cited process inputs and their limits

| Route | Evidence relevant to the 233-day horizon | What it does not establish |
|---|---|---|
| AIGF incident protocol | Set-up may take up to **18 months after signature**. Service payments begin at audited operational readiness and run five years. FWC termination procedure allows **15 days for observations**. | Live hardware by Geneva, an incident-reporting SLA in hours, or total remedy latency. |
| Belgian LUMI appendix | Preparatory review is **monthly**; panel aims to notify within **one month after deadline**. Benchmark projects normally last **four months**. LUMI amended terms require **at least two weeks' notice**. | Approval of new safety terms, or eligibility of production training under preparatory access. Published regular 2026 deadlines are already past. |
| EuroHPC LUMI access | Policy permits benchmark/development allocation within **two weeks** after cutoff, AI-science review within **one month**, industrial large-scale AI review in **ten working days**, and regular review over **four months**. | Equivalent processing for a new policy amendment, observed SLA attainment, or automatic external evaluator rights. |
| National LUMI protocol | Finnish small applications: **1–4 weekdays**; regular: **1–2 weeks**. Next Finnish Extreme Scale call targets **spring 2027**. Czech rounds recur three times yearly; Polish continuous test grants last **30 days**. | One synchronised coalition decision, confirmed 2027 Czech dates, or a complete signatory set. |
| Swiss fallback | Operator account places productive automatic introduction between **January and May 2025**, following earlier development. Public operating data can support initial replay work. | Four-month end-to-end development SLA, model access or a measured fallback success rate. |
| UK energy assurance | DESNZ evidence deadline **6 November 2026**, six days after cutoff. Ofgem decided a **12-month technical sandbox**, targeting late-autumn applications and early-2027 testing. | Pilot acceptance, fixed testing dates, live-system deployment approval or final evaluation by Geneva; lessons are targeted for end-2027. |
| UK agent accountability | ICO evidence deadline **20 November 2026**, twenty days after cutoff; agentic guidance targeted **spring 2027**. | Adoption of submitted recommendations, completed deployer changes or a guaranteed guidance date. |

Sources: [AIGF specifications](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Tender%20Specifications%20v2_V1.pdf), pp.16–17; [FWC](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/tender-details/docs/bc712395-692d-41ab-aa25-8e254ae86eb2-CN/CfT%20AIGF%20-%20Annex%203%20-%20Model%20FWC%20v2_V2.pdf), pp.20–22,54; Belgian instructions above; [LUMI terms](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-General-Terms-of-Use_2026.pdf), section 12; [EuroHPC access policy](https://eurohpc-ju.europa.eu/document/download/30614065-6dd6-4206-8065-fc97948e5e2c_en?filename=EuroHPC%20JU%20Access%20Policy%20-%20Version%202025.12.pdf), pp.19,22,25–30; [Finnish allocation](https://research.csc.fi/resources/); [Czech guide](https://lumi-supercomputer.eu/get-started-2021/users-in-czech-republic/); [Polish guide](https://lumi-supercomputer.eu/get-started-2021/users-in-poland/); [Swiss implementation account](https://www.swissgrid.ch/en/home/newsroom/blog/2026/20260218-01.html); [Ofgem decision](https://www.ofgem.gov.uk/sites/default/files/2026-06/ai-technical-sandbox-consultation-decision.pdf), pp.8,14,18–23; [ICO call](https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/10/agentic-ai-call-for-evidence/); [ICO roadmap](https://ico.org.uk/about-the-ico/what-we-do/our-plans-for-new-and-updated-guidance/technology).

### Authority discoveries

- **AIGF:** FWC I.14.6 requires prompt security-breach notification, ongoing information and mitigation. I.15.2–3 requires signed end-user terms before access and permits contractor suspension of risky use. I.16 gives the Commission an indivisible **50% vote**, national authorities the other 50% weighted by committed contributions, and requires **75% of all voting rights** if consensus fails. These are concrete mechanisms within their contractual remit, not a universal threshold for imposing model-safety amendments. The proposed model-incident taxonomy and evaluator rights remain unagreed. (`eu-aigf-notify`, `eu-aigf-user-terms`, `eu-aigf-governance-vote`.)
- **LUMI:** Regular EuroHPC award decisions go through Executive Director submission and Governing Board approval; industrial large-scale AI selection is approved by the Executive Director under its specified process. Finnish resource officers and Resource Allocation Board are identifiable decision-makers. These award powers do not by themselves establish competence to change consortium terms. The [shared resource cut policy](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-Resource_cut-off_policy_2026.pdf) is nevertheless a real cross-channel precedent: at six months, eligible regular/extreme allocations fall to 60% unless utilisation exceeds 40%, with at least one month's notice. That is utilisation management, not an existing model-safety penalty. (`eu-ju-review-regular`, `eu-ju-large-ai-review`, `eu-fi-review-upper`, `eu-national-cut`.)
- **Ofgem:** The decision specifies accountable leads such as licensees, market participants or essential-service operators, with technology partners under the lead and testing separated from live systems. Participation is not regulatory approval or deployment endorsement. This is a more concrete route to an operator trial than consultation submission alone. (`eu-uk-sandbox-lead`.)

**Interpretation, not estimated probability:** a small existing-access-channel pilot has fewer unresolved timing dependencies than commissioning a new gigafactory. AIGF could instead target a contractual protocol and tabletop drill by Geneva. These are different endpoints and must not share one undifferentiated “implemented” label.

## 3. Which critical retrievals remain?

### Retrieval coverage

The ledger records source families, failed access and practical alternatives. For LUMI, retrieval used allocation pages/forms, actual annual-award tables, and service/access-policy instruments; national investigation also read country guides and Finnish rules. For Swissgrid it used implementation accounts, the annual operating report, and downloadable data. For UK energy it used DESNZ's call and citations, Ofgem's decision, and attempted operator originals. For ICO it used the live call/roadmap, named supervision outcomes, and annual programme results. For AIGF it used live specification/contract PDFs, attempted the procurement portal, and checked EuroHPC's annual-report context.

These are materially different evidence approaches, but **they do not exhaust underlying national delegation instruments, private agreements or every operator publication**. No coordinate is estimated to bridge that retrieval gap. A second-language operator article corroborates wording; it is not independent evidence of performance. Re-reading one source is not counted as a new independent approach.

### Actual access limitations

- The procurement portal returned no readable body. Earlier repository notes report an October 26 extension to **4 February 2027 for Lot 1** and **3 December 2026 for Lot 2**; those dates were not independently refreshed here and are not used to infer a current clarification deadline. Live linked specification and FWC PDFs were readable.
- Both NESO originals returned **HTTP 403**. DESNZ's official secondary account remains labelled secondary; operator count periods, primary Volta details and direct outcome evidence remain open.
- Sweden's country article was read through the first 5,000 characters; its lower legacy EuroHPC table was not relied upon. Country-guide update dates are not necessarily publication dates of the underlying procedures.
- Public Swiss CSV availability was verified, but missingness, duplicate timestamps, daylight-saving handling and full numeric consistency were not audited. No controller fault log was obtained.
- Source status `read` means the identified relevant text was retrieved, not that every page of a long report was reviewed. Locators describe the actual inspected portions. Unknown publication dates remain null.

### Next discriminating evidence by route

| Route | Exact evidence needed next |
|---|---|
| AIGF | Current corrected notice and clarification cutoff; selected project's executed FWC/specific contract and capacity schedule; agreed incident taxonomy, user flow-down and one witnessed drill. |
| Belgium | Programme delegation/joint agreement and CSC-approved appendix; one eligible recipient's acceptance; project-level AI awards and metered usage under a reconciled billing unit; updated regular-call dates. |
| EuroHPC LUMI | Board amendment or explicit delegated pilot authority; CSC and recipient agreement; versioned accepted terms joined to actual award and consumption records. |
| National LUMI | Country delegation instruments and consortium amendment rules; complete approval set for a named pilot coalition; deduplicated national AI awards/consumption joined by project ID. |
| Switzerland | Approved operator test charter and model/data rights; model-specific dispatch volume; matched faults, fallback actions and recovery timing from an authorised simulator or operating log. |
| UK energy | Autumn sandbox participation guidance and a selected operator/use-case agreement; workflow/asset inventory and budget; primary NESO data definitions; baseline and fallback trial results. |
| UK agents | Current guidance approval/delegation record and one deployer's signed pilot; frozen workflow/execution inventory; allowed/unauthorised outcomes, false refusals and independently scored accountability reconstruction. |

### Coordinate readiness and measurement design

All seven routes have **partial feasibility inputs**. None has complete proposal-specific approvals, costs and observed execution timing sufficient for a calibrated probability. Agreement counts require the full indispensable-party set; eleven country labels, four funders, consultation respondents and prior award success rates are not that denominator.

For reach, define a future pilot's population and period before calculating anything: accepted-terms **consumed node-hours / eligible consumed node-hours**, **controlled dispatch volume / eligible process volume**, or **covered agent executions / eligible agent executions**, as appropriate. Report test outcomes separately from this coverage fraction. Each ratio needs an actually observed numerator, matched units and deduplicated denominator. Translating coverage into consequential safety requires additional evidence about failure reduction, severity and displacement; no such coefficient is supplied here.

**Next discriminating research question:** which named owner can supply both a complete approval path and a matched activity ledger, then permit observation of a failed-test hold, fallback or corrective retest before 21 June 2027?

## Delivery and checks

The two local deliverables are `research_notes/Route coordinate evidence/europe.md` and `research_notes/Route coordinate evidence/europe.json`. JSON validation checks required collections and fact fields, unique `eu-` identifiers, source/search reference integrity, exact route membership, finite numerical values and the derived allocation arithmetic. No coordinates are supplied. No git operations, installations, contacts or UI changes were performed.

Administrative status was checked earlier in this session: it returned share-sessions guide version 2026-10-29.1 and no user items. No guide change was adopted.
