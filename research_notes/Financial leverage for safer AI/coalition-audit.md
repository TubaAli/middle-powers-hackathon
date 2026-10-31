# Second-pass audit: do the four finance hypotheses survive primary sources?

**Auditor role:** independent second pass. **Observation date:** 31 October 2026. **Cutoff for every claim below:** 31 October 2026.
**Scope:** test the four top actionable finance hypotheses in `coalition-levers.md` (Canadian staged Cohere equity, Japanese policy-bank financing, Singapore investor independence, MGX consortium rights) against primary documents retrieved directly, and say plainly what is wrong, what is missing, and what the Leverage Map should store.
**What this note is not:** an investment memo, a ranking of countries by financial capability, or evidence that any institution would accept a safety condition.

Retrieval was bounded to 13 direct fetches. Documents I could not open are listed in §7 and are **not** treated as read.

---

## 1. Verdict in one page

| Hypothesis | Survives? | The load-bearing correction |
|---|---|---|
| **Canada → Cohere staged equity** | **Partly.** The money and the staging are real; the *safety* lever is not. | The primary release names **no investing entity, no signatory, and no board seat**. It conditions tranches on **jobs and domestic compute**, not on safety. Two prior-note details are unsourced amplification. |
| **Japan → JBIC policy-bank financing** | **Yes as an instrument, no as an open window.** | The cited loan was **signed 28 March 2025** and disclosed **after** signature. There is no live decision for a coalition to act on. But JBIC's **Environmental Guidelines** machinery is a real, existing template for attaching and monitoring non-financial conditions — a missing power the earlier note did not use. |
| **Singapore investor independence** | **Yes, and now better sourced — but it is two layers, not one.** | Autonomy is documented at the **individual-investment** layer (GIC: "without influence from the Client or the Board"). The state retains **mandate/charter and board-appointment** rights. The earlier note's supporting URL is now **404**. |
| **MGX consortium rights** | **Weakest of the four. Downgrade.** | The closing release says Aligned keeps **"operational independence"** and its existing management. Rights evidence is close to zero, and the assets are overwhelmingly **US-sited**, so the relevant sovereign is the US, not the UAE. |

**Headline judgement on the prior note:** it is broadly accurate on amounts and statuses and does not fabricate. Its problems are of a specific and fixable kind — **amplification** (naming holders the sources do not name), **omission** (co-investors, a merger, an entire guidelines machinery), and **conflation** (one "Use" rating covering both economic conditionality and safety conditionality). No prior financial figure I could check turned out to be wrong.

**The one sentence the map should adopt:** *finance volume is not bargaining power; the only thing that counts is a named decision maker holding an unspent right over a named counterparty at a dated moment.*

---

## 2. Hypothesis 1 — Canadian staged Cohere equity

### What was claimed

An up-to-CAD 1.6bn equity commitment announced 29 October 2026, invested in stages with progress reporting; holder described as "government investment signatory and Cohere board"; ranked #1 with Hold H\*, Last M\*, Use H\*.

### What the primary source actually says

Retrieved 31 Oct 2026 from the Prime Minister's release dated 29 October 2026, Montréal. Verbatim load-bearing passages:

- "the Government of Canada's commitment to **making an equity investment of up to $1.6 billion in Cohere**. This is a **commercial investment**, announced alongside private investors, including **NVIDIA, Bell, and Schwarz Group**."
- Company undertakings: "Create at least **1,000** new high-paying Canadian technical jobs by **2030**"; "Commit at least **$1.7 billion** to additional computing infrastructure in Canada by 2030"; "Maintain its **Canadian incorporation and Canadian headquarters**"; research partnerships; "**Keep working with the Canadian AI Safety Institute** to champion the safe development and use of advanced AI."
- "The investment is for Canadians, by Canadians. It will be made **in stages, with regular reporting on progress against the company's commitments, including jobs and investment in Canada**."
- Quick facts: total "up to approximately $1.6 billion ... made in stages"; and "Cohere's recent **merger with Aleph Alpha** brings together Canadian and German AI expertise."

### Corrections to the prior note

1. **"government investment signatory and Cohere board" is not in the source.** The release identifies no ministry, agency, Crown corporation, fund or official, and mentions **no board seat or governance right**. Equity does not imply a board seat and even a board seat would not imply a release veto. Treat the named holder as **unknown** until the subscription agreement or an Order-in-Council/agency disclosure names it.
2. **The currency is not stated.** The release writes "$1.6 billion" with no currency unit. CAD is a reasonable convention for a Government of Canada release, but it is an **inference, not evidence**, and at prevailing rates the difference is material. The prior note's blanket statement "Canadian government amounts below are CAD" should be softened to "currency not stated by the source; assumed CAD".
3. **The conditionality is economic, not safety.** Tranche progress is measured against jobs and domestic compute. The safety item is "keep working with CAISI" — unquantified, unremedied, with no defined deliverable and no stated consequence. A coalition cannot withhold a tranche for a failed evaluation on this text.
4. **Omitted co-investors and a second jurisdiction.** NVIDIA (US), Bell (Canada) and **Schwarz Group (Germany)** are co-announced, and Cohere has **merged with Aleph Alpha (Germany)**. The prior note's Canada-centric framing hides that this cap table is Canada + US + Germany. For a coalition product, that is the interesting part: a single company now sits across three middle-power jurisdictions with different finance instruments available.
5. **"Use" conflates two different uses.** Use for *economic conditionality* (H: there are unspent stages and a named reporting cadence) is not the same as Use for *safety conditionality* (L: nothing in the instrument reaches a safety decision). The prior note's single H\* hides this.

### Decision-right test

| Test | Finding |
|---|---|
| Holder | "Government of Canada" — **unnamed institution**, unknown signatory |
| Instrument | Equity subscription, staged; commercial investment |
| Right actually exercisable | Withhold or release undisclosed future stages; receive progress reports on jobs/compute |
| Established by | Ministerial announcement only — **no agreement, no term sheet, no order** |
| Open window | Undisclosed tranche schedule; next stage date unknown |
| Substitutes | NVIDIA, Schwarz Group and private markets are in the same round; Cohere is a going concern with commercial revenue. Replacement capital plausibly available; strength not established |
| Safety reach | **None established.** Six conditions all `not_established` for this instrument |

**Revised assessment:** keep as a research target, not a leverage finding. Real but unquantified power over **staging**; zero evidenced power over **safety**. The discriminating question is unchanged and still unanswered: *who signs the next stage, and what does the stage agreement say about CAISI access?*

---

## 3. Hypothesis 2 — Japanese policy-bank financing

### What was claimed

JBIC signed an NTT India data-centre loan 28 March 2025, announced 31 March, up to INR13bn JBIC / INR21.7bn total co-financing with MUFG and Mizuho, under the Japan–US–Korea DiGi framework; ranked #4 at M/M\*/M.

### What the primary source actually says

Retrieved 31 Oct 2026, JBIC release dated **31 March 2025**, filed under FY2024:

- Agreement **signed 28 March 2025** with **NTT Global Data Centers & Cloud Infrastructure India Private Limited (NTT GDCI)**, "an Indian group company of Nippon Telegraph and Telephone Corporation", "amounting to **up to INR13.0 billion** (JBIC portion)"; "co-financed with **MUFG Bank, Ltd. and Mizuho Bank, Ltd.**, bringing the total co-financing amount to **INR21.7 billion**."
- Purpose: build and operate data centres in **Maharashtra and Tamil Nadu**.
- Stated rationale: "support for the overseas business expansion of NTT", "help improve the business environment for Japanese companies and enhance their **supply chain resilience**", "contribute toward maintaining and strengthening the **international competitiveness of Japanese industries**."
- Framework: JBIC "signed an arrangement on **October 25, 2024** to cooperate with the launch of the **Digital Infrastructure Growth Initiative for India (DiGi)** with the **U.S. International Development Finance Corporation (DFC)** and the **Export-Import Bank of Korea (KEXIM)**."

**Every number in the prior note checks out, including the currency and the co-lender split.** So does the "In March 2024 a similar loan" cross-reference.

### The missing power: JBIC already runs a conditions machinery

Retrieved separately, the same day, JBIC's **Environmental Guidelines** page:

- JBIC has "established 'JBIC Guidelines for Confirmation of Environmental and Social Considerations (Environmental Guidelines)', which set out the guiding policy and procedures for **confirming that the borrowers or project proponents have taken appropriate steps** for environmental and social considerations."
- Current version "came into effect on **July 1, 2022**".
- JBIC publishes "**category classification** of the project when it is in the screening process and results of its environmental review", plus project proponents' **monitoring**.
- JBIC "introduced **objection procedures** simultaneously with implementation of its Guidelines ... to ensure compliance."
- JBIC has "signed agreements on **environmental assessment with private financial institutions**" and "will provide private financial institutions with knowledge and knowhow on the environmental review it has conducted ... for the projects for which JBIC **cofinances** with them."

This changes the hypothesis materially and in a direction the prior note missed. Japan does not need to invent a mechanism to attach, verify and enforce non-financial conditions on a co-financed data-centre loan — **it already operates one**, including syndicate-wide standard harmonisation with exactly the private banks (MUFG, Mizuho) that appear in the cited transaction. What does not exist is any indication that AI-safety considerations fall within the Guidelines' scope, which is environmental and social.

### Corrections and refinements

1. **No open window exists in the cited transaction.** The loan was signed 28 March 2025 and announced three days later. JBIC's disclosure practice is post-signature. A coalition working from public sources therefore arrives after the decision. This is a structural constraint, not a data gap: the prior note's "no verified future date for cited historical loans" understates it.
2. **The obligation sits in the wrong place for safety.** The borrower is an **Indian operating subsidiary of a Japanese telco**, not a model developer, and the sites are in India. The prior note says "borrower may be a financing subsidiary" — accurate but soft. Even a perfect covenant binds an SPV leasing data-centre space to NTT group tenants.
3. **The mandate cuts against safety conditions.** The release grounds the loan in Japanese industrial competitiveness and supply-chain resilience. Adding a condition that raises a Japanese champion's cost of capital runs against the stated purpose. Any coalition ask must be framed as protecting the asset and the lender, not as restraining the borrower.
4. **DiGi is an existing standing trilateral coordination channel** (JBIC + US DFC + KEXIM) among three partner economies. The prior note mentions DiGi only in passing as "an evidenced project-finance channel". It is in fact the closest thing found to *countries jointly exercising finance decision rights through a shared instrument*, which is the actual thesis of this project. It also shows the limit: the shared instrument is infrastructure finance, with no safety annex.
5. **Do not convert INR to USD.** No conversion date is given, and the loan is a local-currency facility by design.

### Decision-right test

| Test | Finding |
|---|---|
| Holder | JBIC (policy-based financial institution); MUFG and Mizuho as co-lenders |
| Instrument | Overseas investment loan, local currency, co-financed |
| Right actually exercisable | Pre-signature credit approval and condition-setting; post-signature: monitoring, guideline-based review, objection procedure |
| Established by | Signed loan agreement (not public); JBIC Environmental Guidelines (public, in force 1 July 2022) |
| Open window | None in the cited transaction; next window is a *new* facility or a *guideline revision* |
| Substitutes | NTT is a large investment-grade borrower with access to private syndicated lending; India offers competing data-centre finance. Substitute strength partial |
| Safety reach | Guidelines cover environmental/social only. All six conditions `instrument_cannot_reach` **as currently scoped**; `plausible_contract_term` only after a guideline/mandate change |

**Revised assessment:** instrument reality confirmed and *strengthened* (a conditions machinery exists), but decision timing and mandate scope both cut against near-term safety use. Downgrade **Use** for a public-information coalition; keep the guideline-revision process as a genuine, dated, public window worth watching.

---

## 4. Hypothesis 3 — Singapore investor independence

### What was claimed

Finance Ministry statement of 4 August 2026 that Temasek makes individual commercial investment decisions independently, with government holding its board accountable for long-term performance; state ownership must not be encoded as ministerial authority over a particular AI deal.

### What the primary sources actually say

**Source A — MOF parliamentary reply, 7 October 2026** (Second Minister for Finance, Mr Jeffrey Siow), retrieved directly. This is a *different and better* source than the one the prior note cites:

- "There were **no terms of reference issued to Temasek when it was first incorporated**. But it has been clear since its early years that Temasek would **operate independently and be commercially driven**."
- "The Temasek Charter was introduced in 2002 ... It is a living document which Temasek **reviews periodically, in consultation with the Government as its shareholder**."

**Source B — GIC, "Our Governance"**, retrieved directly:

- "The Government, represented by the **Ministry of Finance**, mandates GIC to manage Singapore's foreign reserves ... The mandate sets out the **terms of appointment, investment objective, investment horizon, risk parameters, and investment guidelines**."
- "**GIC acts autonomously on individual investments however, without influence from the Client or the Board.**"
- GIC is a **Fifth Schedule** company: "No one may be appointed to or removed from the GIC Board **without the President's concurrence**." The President holds the **two-key** power over past reserves.
- The **Investment Board** "ensures GIC considers potential **reputational risks** arising from investment activities."

### Corrections to the prior note

1. **Citation failure.** The prior note's cited MOF URL (`.../temasek-holdings--investment-in-indonesia-s-efishery/`) returns **HTTP 404** at cutoff. The claim it supports is substantially corroborated by the 7 October 2026 reply, but the specific citation is no longer re-verifiable and should be replaced.
2. **"Independence" was stated too broadly.** Singapore's position is not "the state has no finance decision rights". It is a **two-layer** structure: autonomy over *individual investments*, retained shareholder rights over *mandate, charter and board composition*. For GIC the retained rights are unusually concrete — MOF writes the investment guidelines; the President concurs on board appointments and removals; the President holds the reserve drawdown key. The prior note's framing ("MOF cannot be presumed to instruct an individual deal") is correct but incomplete, and the incompleteness matters because the retained rights are exactly the kind of slow, legitimate lever a coalition could actually use.
3. **No constitutive document exists for Temasek's independence.** Per the government's own answer, **no terms of reference were ever issued**. The independence claim therefore rests on executive assertion plus the Charter (not retrieved). This is decent evidence, weaker than a statute, and it should not be labelled "law".
4. **A realistic entry point was missed.** GIC's Investment Board explicitly reviews **reputational risk** in investments. That is an internal governance gate where a safety/incident/continuity concern can legitimately land — not as a government direction, but as a risk factor in a fiduciary process. This is a far more plausible route than appealing to MOF, and it is grounded in a primary source.

### Decision-right test

| Test | Finding |
|---|---|
| Holder | GIC management/Investment Board; Temasek management. Shareholder rights: MOF; Presidential concurrence on GIC board |
| Instrument | Fund mandate and investment guidelines (MOF); charter revision (Temasek, in consultation with shareholder); board appointment; internal reputational-risk review |
| Right actually exercisable | **Not** approval of an individual AI deal. Yes: change the mandate, change guidelines, appoint/remove directors, and refuse a drawdown of past reserves |
| Established by | GIC governance page (institutional statement); MOF parliamentary reply 7 Oct 2026 (executive assertion); no public Temasek ToR |
| Open window | Undated; charter/mandate review is periodic, not scheduled publicly |
| Substitutes | Global private capital is abundant; GIC/Temasek are price-insensitive long-term capital, so their *absence* is not easily replaced at the same cost of capital. Partial |
| Safety reach | No transaction-level hook. `plausible_contract_term` only via internal risk policy, unverified |

**Revised assessment:** the independence finding is **confirmed and better sourced**, but must be recast as *autonomy at the deal layer, retained rights at the mandate layer*. Do not record Singapore as a state that can direct its investors. Do record it as a state that can rewrite its investors' mandate and appoint their boards — a different, slower, still real power.

---

## 5. Hypothesis 4 — MGX consortium rights

### What was claimed

AIP/MGX/BlackRock GIP completed the Aligned acquisition at about USD40bn enterprise value plus a USD5bn growth-capital commitment; AIP targets of USD30bn equity / USD100bn including debt are not sums of UAE money; holder described as "MGX investment committee, consortium governance and local operator".

### What the primary source actually says

Retrieved 31 Oct 2026 from Aligned's release dated **21 July 2026**, Dallas/New York/Abu Dhabi:

- "AIP, MGX, and BlackRock's Global Infrastructure Partners ('GIP') (collectively, the 'Consortium') today successfully completed their previously announced acquisition of **100% of the equity** in Aligned Data Centers ... from private infrastructure funds managed by **Macquarie Asset Management** and its co-invest partners."
- "enterprise value of approximately **$40 billion**".
- "**51 campuses** and more than **6.4GW** of operational and planned capacity".
- "**Aligned's CEO Andrew Schaap and the existing management team will continue to lead the Company**, which will remain headquartered in **Dallas, Texas**."
- Consortium offers "a supportive partnership model ... while maintaining its **customer and community focus and operational independence**."
- "an important step toward its initial target of mobilizing and deploying **$30 billion of equity capital**, with the potential to support up to **$100 billion of total investment, including debt**."
- "the consortium has also committed an additional **$5 billion of growth capital**".
- Footprint: "Northern Virginia, Chicago, Dallas, Ohio, Phoenix and Salt Lake City, as well as **São Paulo, Querétaro and Santiago**."

**Amount typing in the prior note is correct and should be preserved.** Enterprise value is not an equity cheque; the $5bn is committed growth capital; $30bn/$100bn are targets. No summing anywhere.

### Corrections to the prior note

1. **"Local operator" as a holder overstates the source.** The release states the existing management team continues and the company retains **operational independence**. A sponsor that affirms operational independence is, by its own words, not the operational decision maker. Remove the operator from the holder list or mark it `none_established`.
2. **The jurisdictional point is under-weighted.** The portfolio is overwhelmingly **US-sited**. Whatever governance MGX holds over the Aligned holding company, the sovereign that governs security obligations, chip location verification, continuity of service and foreign-investor review at those campuses is the **United States**. The prior note treats US authority only as an export-licence diligence item (the G42/Core42 authorisation expiry). The sharper claim is that UAE ownership of Aligned **does not transfer any safety decision right over US-hosted capacity**, and being a regulated foreign owner inside the US perimeter may *reduce* rather than increase the consortium's room to impose conditions.
3. **An Australian middle power appears on the exit side and was missed.** The sellers were **Macquarie-managed funds**. Australia thus executed a very large, dated, completed finance decision in AI-relevant infrastructure — an *exit*, not an entry. The map currently models only who supplies and who can withhold; it does not model **who left**. That is a genuine structural gap and a good Australia hook for the coalition builder.
4. **Ownership split, voting, reserved matters and board composition remain unknown** — the prior note is right about this and the release confirms it discloses nothing.
5. **Independent corroboration of the prior note's chronology caution:** the page footer really does carry an image named `Aligned_logo_Dec2026_rgb_SolidWhite_horizontal_notag-1`, i.e. dated after the July transaction. Body text is unambiguously 21 July 2026. The prior note's "page-asset contamination" flag is correct and should be kept in the source ledger.

### Decision-right test

| Test | Finding |
|---|---|
| Holder | AIP / MGX / GIP consortium, as shareholder of Aligned; Aligned management as operator |
| Instrument | Equity ownership (100%), plus committed growth capital |
| Right actually exercisable | Shareholder rights — **unknown**. Affirmatively constrained by stated "operational independence" |
| Established by | Closing press release. No SHA, no governance summary, no regulatory filing retrieved |
| Open window | Acquisition negotiation **closed**. Remaining: growth-capital deployment, new leases, refinancing |
| Substitutes | Tenants can multi-source capacity; rival data-centre owners compete. Partial to strong |
| Safety reach | `not_established` for all six. Lease-level covenants are conceivable but unevidenced |

**Revised assessment:** the weakest of the four as a safety lever. Retain as a **counterparty and asset-owner entry point**, downgrade the implied authority, and add the US-jurisdiction and Australian-exit observations.

---

## 6. Missing powers the four hypotheses collectively fail to capture

These are the items a second pass adds. Each is an instrument class or a decision layer that the prior note does not represent, and each is grounded in a primary source retrieved above.

1. **Mandate and charter revision.** Singapore can rewrite its investors' mandate and appoint their boards. JBIC can revise the Guidelines that govern what it screens for. Canada can attach conditions to a Crown equity programme. These are *slow, legitimate, high-leverage* rights that are invisible in a map built only from transactions.
2. **Conditions machinery that already exists.** JBIC's Environmental Guidelines — screening categories, published review results, project proponent monitoring, a formal objection procedure, and agreements to harmonise standards with co-financing private banks — is a working template for attaching and enforcing non-financial conditions across a syndicate. The prior note cited only the crane loan and UKEF as precedents and missed the strongest one.
3. **Standing plurilateral finance coordination.** DiGi (JBIC + US DFC + KEXIM) is a real trilateral channel with a shared framework and a shared pipeline. It is the closest observed instance of the project's actual thesis.
4. **Capital exit as a decision, not only entry.** Macquarie's sale of Aligned is a completed, dated, multi-billion-dollar decision by an Australian-linked institution. The map has no concept of an exit.
5. **The investee's own internal risk gate.** GIC's Investment Board reviews reputational risk. That is where a safety argument can legitimately enter a fiduciary process, without any claim of state direction.
6. **Host-state sovereignty over the financed asset.** US law governs Aligned's US campuses; Indian law governs NTT GDCI's sites. A middle power's condition can be nullified by the jurisdiction where the asset physically sits.
7. **Contract status is the binding constraint in all four cases.** Not one of the four is an executed document in public. Three are announcements; one is a closed acquisition with undisclosed terms. The map must not promote any of them beyond `announced`.

---

## 7. Minimal map edge schema

Design goals: store the *right*, not the relationship; make "unknown" a first-class value; make volume and power separate fields that cannot be silently combined; keep the record small enough that a researcher can fill it in an hour.

One edge = **one holder, one right, one counterparty, one dated moment**. If a holder has two rights over the same counterparty, that is two edges.

| Field | Type | Why it exists | Rule |
|---|---|---|---|
| `edge_id` | string | Stable reference | `country-holder-target-instrument-NN` |
| `holder` | string | **Named institution**, never a country | `Government of Canada` is acceptable only if no institution is named — mark `holder_named: false` |
| `holder_country` | ISO | Coalition filtering only | Never implies state control |
| `target` | string | Named legal entity | Not a category or a sector |
| `instrument` | enum | `equity_subscription`, `equity_ownership`, `debt_facility`, `guarantee`, `insurance`, `procurement`, `grant`, `licence_condition`, `mandate_charter`, `internal_risk_gate` | Determines what a condition can legally attach to |
| `flow_class` | enum | `equity`, `debt`, `guarantee`, `procurement`, `grant`, `none` | Prevents adding unlike flows |
| `amount_value`, `amount_currency` | number, ISO | Size, for display only | `null` when undisclosed — **never 0** |
| `amount_status` | enum | `announced_ceiling`, `signed_committed`, `closed`, `disbursed`, `enterprise_value`, `target_not_raised`, `undisclosed` | This field, not the number, decides what may be said |
| `amount_basis` | string | One line: is this equity, EV, facility size, purchase commitment, or target? | Required when `amount_value` is present |
| `decision_maker` | string | The **role or body** that can exercise the right | e.g. "JBIC credit approval", "GIC Investment Board", "MOF as shareholder" |
| `decision_right` | string | What exactly can be withheld, amended, waived or ordered | Must be a verb phrase, not "influence" |
| `right_status` | enum | `contract_executed`, `announced_condition`, `mandate_level_right`, `internal_policy_gate`, `none_established` | Drives the credibility flag |
| `authority_evidence` | list of `{url, quote, doc_type, doc_date, observed}` | Claim-level provenance | `doc_type` ∈ `statute`, `contract`, `filing`, `official_release`, `parliamentary_reply`, `institutional_page`, `reporting` |
| `dates` | object | `announced`, `signed`, `closed`, `next_window`, `observed` | Keep separate; never infer one from another |
| `window_open` | bool + `window_basis` | Whether a decision can still be influenced | `false` for anything already signed |
| `substitutes` | string + `substitute_strength` ∈ `strong`, `partial`, `none_established` | The field that can turn a large number into zero leverage | Must name the alternative, not assert its absence |
| `safety_asks` | object of six keys | One state per condition | `evidenced`, `plausible_contract_term`, `instrument_cannot_reach`, `not_established` — plus one-line reason |
| `power_basis` | enum `none`, `limited`, `substantial` | **Qualitative only.** The bargaining-power judgement | Never multiplied by amount; never summed across edges |
| `jurisdiction_of_asset` | ISO | Which sovereign actually governs the financed thing | Catches the Aligned/NTT case |
| `confidence` | `high` / `medium` / `low` + `what_would_change_it` | Uncertainty with a falsifier | Required |
| `gaps` | list | Named unknowns | "Unknown" ≠ "absent" |

**Rules the schema enforces, stated for the UI copy:**

- No composite score. `power_basis` is a judgement per edge. A bloc-level view may **count** edges with `right_status ∈ {contract_executed, announced_condition}` and `window_open = true`. It may not weight by dollars or average across edges.
- `amount_status` gates language: only `signed_committed`, `closed` and `disbursed` may be described as money. `announced_ceiling` is a stated intention. `target_not_raised` is an ambition. `enterprise_value` is a valuation that includes debt.
- `amount_value` absent means **unknown exposure**, and must render as "undisclosed", never as zero and never as excluded from a total that is then presented as complete.

---

## 8. Three illustrative edge records

YAML, because a researcher can read and edit it without tooling. All six safety-ask states are shown explicitly so that "the instrument cannot reach this" is visible rather than implied.

### Edge 1 — Canada → Cohere (staged equity)

```yaml
edge_id: CA-goc-cohere-equity-01
holder: Government of Canada            # no institution or signatory named in source
holder_named: false
holder_country: CA
target: Cohere Inc.                     # merged with Aleph Alpha (DE); combined legal entity not verified
instrument: equity_subscription
flow_class: equity
amount_value: 1.6
amount_currency: null                   # source writes "$1.6 billion"; currency not stated
amount_status: announced_ceiling
amount_basis: "up to approximately $1.6bn, made in stages; stage schedule and paid amount undisclosed"
decision_maker: unknown                 # investing vehicle/signatory not disclosed
decision_right: "release or withhold undisclosed future stages; receive progress reports"
right_status: announced_condition
authority_evidence:
  - url: https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai
    quote: "commitment to making an equity investment of up to $1.6 billion in Cohere ... made in stages, with regular reporting on progress against the company's commitments, including jobs and investment in Canada"
    doc_type: official_release
    doc_date: 2026-10-29
    observed: 2026-10-31
dates: {announced: 2026-10-29, signed: null, closed: null, next_window: null, observed: 2026-10-31}
window_open: true
window_basis: "stages undisclosed; later releases of capital not yet committed"
substitutes: "NVIDIA, Bell and Schwarz Group co-announced in the same round; private markets available to a revenue-generating company"
substitute_strength: partial
safety_asks:
  pre_release_testing:    {state: not_established, reason: "no evaluator access term; only 'keep working with CAISI'"}
  incident_reporting:     {state: not_established, reason: "reporting is on jobs and domestic compute only"}
  protected_weights:      {state: not_established, reason: "not addressed in announcement"}
  essential_user_continuity: {state: not_established, reason: "not addressed; sovereign-AI framing is commercial, not continuity"}
  known_chip_locations:   {state: not_established, reason: "$1.7bn domestic compute commitment implies assets but no inventory duty"}
  local_stop_due_process: {state: instrument_cannot_reach, reason: "equity is not an operating licence or a direction power"}
power_basis: limited
jurisdiction_of_asset: CA
confidence: medium
what_would_change_it: "a published subscription agreement naming the vehicle and any reserved matters, or a board appointment"
gaps: ["investing entity", "stage schedule and amounts", "board seat or reserved matters", "currency", "post-merger cap table and German side"]
```

### Edge 2 — JBIC + MUFG + Mizuho → NTT GDCI (signed loan)

```yaml
edge_id: JP-jbic-nttgdci-debt-01
holder: Japan Bank for International Cooperation (with MUFG Bank and Mizuho Bank)
holder_named: true
holder_country: JP
target: NTT Global Data Centers & Cloud Infrastructure India Private Limited
instrument: debt_facility
flow_class: debt
amount_value: 13.0
amount_currency: INR                    # JBIC portion, ceiling; total co-financing INR21.7bn
amount_status: signed_committed
amount_basis: "overseas investment loan, 'up to' JBIC portion; disbursement not disclosed; no conversion date for USD"
decision_maker: "JBIC credit approval; co-lender credit committees"   # pre-signature
decision_right: "condition and approve new facilities; post-signature monitoring, guideline review, objection procedure"
right_status: contract_executed         # as to the loan; conditions machinery is mandate-level
authority_evidence:
  - url: https://www.jbic.go.jp/en/information/press/press-2024/press_00149.html
    quote: "signed on March 28 a loan agreement with NTT Global Data Centers & Cloud Infrastructure India Private Limited ... amounting to up to INR13.0 billion (JBIC portion) ... co-financed with MUFG Bank, Ltd. and Mizuho Bank, Ltd. ... total co-financing amount to INR21.7 billion"
    doc_type: official_release
    doc_date: 2025-03-31
    observed: 2026-10-31
  - url: https://www.jbic.go.jp/en/business-areas/environment.html
    quote: "guiding policy and procedures for confirming that the borrowers or project proponents have taken appropriate steps for environmental and social considerations ... objection procedures ... agreements on environmental assessment with private financial institutions"
    doc_type: institutional_page
    doc_date: 2022-07-01          # guidelines in force date; page undated
    observed: 2026-10-31
dates: {announced: 2025-03-31, signed: 2025-03-28, closed: null, next_window: null, observed: 2026-10-31}
window_open: false
window_basis: "agreement signed before disclosure; only a new facility or a Guidelines revision reopens a window"
substitutes: "NTT is a large investment-grade borrower with syndicated private access; Indian market offers competing data-centre finance"
substitute_strength: partial
safety_asks:
  pre_release_testing:    {state: instrument_cannot_reach, reason: "borrower is a data-centre SPV, not a model developer"}
  incident_reporting:     {state: plausible_contract_term, reason: "reporting covenants are standard; Guidelines currently cover environmental/social only"}
  protected_weights:      {state: plausible_contract_term, reason: "security annex conceivable at site level; no evidence of one"}
  essential_user_continuity: {state: plausible_contract_term, reason: "asset-finance style availability covenants are a natural fit"}
  known_chip_locations:   {state: plausible_contract_term, reason: "equipment inventory is within lender's collateral interest"}
  local_stop_due_process: {state: instrument_cannot_reach, reason: "lender has no operational direction power; acceleration is not a stop switch"}
power_basis: limited
jurisdiction_of_asset: IN
confidence: high                          # as to the loan; low as to any condition
what_would_change_it: "the loan agreement's covenants, or a published Guidelines revision adding AI/safety scope"
gaps: ["loan agreement text", "disbursed balance", "tenant contracts", "whether Guidelines could extend to AI safety"]
```

### Edge 3 — AIP / MGX / GIP → Aligned Data Centers (closed acquisition)

```yaml
edge_id: AE-aipmgx-aligned-equity-01
holder: "Consortium of AIP, MGX and BlackRock's Global Infrastructure Partners"
holder_named: true
holder_country: AE                      # MGX; consortium is multi-national
target: Aligned Data Centers
instrument: equity_ownership
flow_class: equity
amount_value: 40.0
amount_currency: USD
amount_status: enterprise_value         # NOT an equity cheque; includes debt
amount_basis: "approximately $40bn enterprise value for 100% of equity; separate $5bn growth capital committed at closing; AIP $30bn equity / up to $100bn incl. debt are targets only"
decision_maker: unknown                 # consortium governance undisclosed
decision_right: "shareholder rights — reserved matters, board composition, distributions: all undisclosed"
right_status: none_established
authority_evidence:
  - url: https://aligneddc.com/press-release/aip-mgx-and-blackrocks-gip-close-acquisition-of-aligned-data-centers/
    quote: "completed ... acquisition of 100% of the equity in Aligned Data Centers ... enterprise value of approximately $40 billion ... existing management team will continue to lead the Company ... maintaining its customer and community focus and operational independence"
    doc_type: official_release
    doc_date: 2026-07-21
    observed: 2026-10-31
dates: {announced: 2026-07-21, signed: null, closed: 2026-07-21, next_window: null, observed: 2026-10-31}
window_open: false
window_basis: "acquisition closed; remaining openings are growth-capital deployment, new leases and refinancing"
substitutes: "tenants multi-source capacity across competing data-centre owners; 6.4GW portfolio is scarce but not unique"
substitute_strength: partial
safety_asks:
  pre_release_testing:    {state: instrument_cannot_reach, reason: "landlord does not control tenant model development"}
  incident_reporting:     {state: plausible_contract_term, reason: "lease-level incident and access terms are possible; unevidenced"}
  protected_weights:      {state: plausible_contract_term, reason: "physical security is within landlord control; weights are tenant-held"}
  essential_user_continuity: {state: plausible_contract_term, reason: "power, cooling and availability are the landlord's actual product"}
  known_chip_locations:   {state: plausible_contract_term, reason: "site inventory of installed accelerators is within operator knowledge"}
  local_stop_due_process: {state: plausible_contract_term, reason: "workload isolation is an operator function, but authority is the host state's"}
power_basis: none
jurisdiction_of_asset: US               # also BR, MX, CL for Latin American sites
confidence: high                          # as to the transaction; rights are unknown, not assumed absent
what_would_change_it: "a shareholder agreement, a tenant lease, or a CFIUS-type review record naming conditions"
gaps: ["consortium ownership split", "voting and reserved matters", "board seats", "tenant consent mechanics", "whether any US foreign-investment review attached conditions", "AIP co-investor list (Temasek, KIA reported on MGX homepage, not verified this pass)"]
```

---

## 9. Concrete integration advice for the Coalition Builder

Ordered by how much they change the product for the effort.

1. **Do not add a financial leverage score.** Add a **filter and a count**. The bloc panel should report: *n edges where a member holds a `right_status` of `contract_executed` or `announced_condition` **and** `window_open = true`.* Currently that number is **1** for Canada (staged capital, economic conditions only), **0** for Japan, **0** for Singapore, **0** for the UAE. That honest zero is a better demo than a synthetic ranking.
2. **Replace the funding-insight Sankey.** The design's "dependence and fragility" view is borrowed from a count-based relationship chart (already documented in `mapping-ai.md`). Rendering finance flows in a Sankey will imply shared units across equity, debt, guarantees and purchase commitments. Instead render the **rights graph**: holder → counterparty, edge colour by `right_status`, edge thickness *not* used at all (or used only for a single declared `flow_class` filter at a time).
3. **Feed the six condition cards from `safety_asks`, not from country shares.** A condition should be lit by whether *any* selected bloc member holds an instrument that can reach it. Today the answer for five of six conditions is "no instrument in evidence" for all four hypotheses. That is a finding, and the UI should say it plainly rather than fill the card with a share-based heuristic.
4. **Add `substitute_strength` to the credibility calculation.** It is the single field that converts a $40bn headline into zero leverage. Surface it next to every amount: "USD40bn enterprise value · substitute strength: partial · rights: none established".
5. **Put mandate-level windows on the timeline.** The windows view currently holds legislative dates. Add three finance-specific windows, each sourced and each genuinely open: JBIC's public Guidelines revision process; Temasek's periodic charter review with its shareholder; and the unannounced next stage of the Canadian Cohere subscription. These are slow but real, and they are the only finance windows that are actually open.
6. **Add a "left the table" category.** Australia's Macquarie-managed funds sold Aligned. Exits are decisions, they are dated, and they are evidence of a middle power's revealed risk appetite in AI infrastructure. A coalition builder that only shows entries is showing half the decision space.
7. **Add `jurisdiction_of_asset` to the credibility panel and to the "What this does not establish" text.** Two of the four hypotheses concern assets governed by a third country (India, the United States). A bloc cannot exercise a stop power over capacity it does not host.
8. **Rewrite the "What this does not establish" panel** around the four contract-status facts: none of the four is an executed public document; two are post-signature announcements; one is a closed deal with undisclosed governance; one rests on executive statements rather than a constitutive text.
9. **Deduplicate by round, not by investor.** The Cohere round includes Canada, NVIDIA, Bell and Schwarz Group. Counting each as a separate edge overstates the bloc's position fourfold.

---

## 10. Source ledger and access status

All retrieved directly on **31 October 2026**. Publication/event dates as stated by each source, kept separate from the retrieval date.

| # | Source | Retrieved | Status | Used for |
|---|---|---|---|---|
| A1 | [PM of Canada, Cohere investment, 29 Oct 2026](https://www.pm.gc.ca/en/news/news-releases/2026/10/29/canada-announces-landmark-investment-cohere-scale-secure-sovereign-ai) | Yes | **Read in full** | Hyp. 1 — amount, staging, conditions, co-investors, Aleph Alpha merger |
| A2 | [JBIC, NTT India data-centre loan, 31 Mar 2025](https://www.jbic.go.jp/en/information/press/press-2024/press_00149.html) | Yes | **Read in full** | Hyp. 2 — amounts, co-lenders, borrower, DiGi framework, mandate rationale |
| A3 | [JBIC Environmental Guidelines](https://www.jbic.go.jp/en/business-areas/environment.html) | Yes | **Read in full** | Hyp. 2 — missing power: conditions machinery, objection procedure, co-lender harmonisation |
| A4 | [MOF Singapore, Temasek ToR parliamentary reply, 7 Oct 2026](https://www.mof.gov.sg/news-resources/newsroom/temasek-holdings-founding-terms-of-reference--charter-revision-approval-process-and-reasons-for-discontinuation-of-industry-cluster-nurturing-role/) | Yes | **Read in full** | Hyp. 3 — no ToR issued; independence; shareholder consultation on charter |
| A5 | [GIC, Our Governance](https://www.gic.com.sg/who-we-are/our-governance/) | Yes | **Read in full** | Hyp. 3 — MOF mandate, investment autonomy, Fifth Schedule, Presidential concurrence, reputational-risk gate |
| A6 | [Aligned, AIP/MGX/GIP closing, 21 Jul 2026](https://aligneddc.com/press-release/aip-mgx-and-blackrocks-gip-close-acquisition-of-aligned-data-centers/) | Yes | **Read in full** | Hyp. 4 — EV, growth capital, targets, operational independence, footprint, Macquarie exit, footer-date anomaly |
| A7 | [MOF Singapore newsroom index](https://www.mof.gov.sg/news-resources/newsroom) | Yes | Read (index) | Located A4 after the prior note's citation 404'd |
| A8 | [GIC homepage](https://www.gic.com.sg/) | Yes | Read (index) | Route to A5 |

**Not accessible — do not treat as read:**

| Source | Result | Consequence |
|---|---|---|
| Prior note's MOF eFishery reply, 4 Aug 2026 | **HTTP 404** | The specific citation supporting Singapore independence cannot be re-verified. Claim corroborated by A4/A5; the citation itself should be replaced. |
| `temasek.com.sg` charter and Temasek Review 2026 | **HTTP 403** (both attempts) | Temasek's own charter text was **not** read; independence rests on A4 (executive assertion) and A5 (GIC only). Do not describe Temasek independence as statutory. |
| `mgx.ae` Aligned announcement | Exceeded 5 MB fetch limit | MGX's own version not read; A6 used instead. MGX board composition and AIP co-investor list not verified this pass. |
| `gic.com.sg/about/` | HTTP 404 | Irrelevant; A5 served the purpose. |
| JBIC US data-centre loan (press_00073) | **Not attempted this pass** | The prior note's USD250m/500m NTT Finance Americas figures remain unverified by this audit. |
| Mubadala MGX founding release, PIF/HUMAIN release, ISED SCIP page, EuroHPC call, MDDI speech, CMA, SEC Anthropic S-1 | **Not attempted this pass** | Out of this audit's four-hypothesis scope. Their status is exactly as the prior notes left it — not independently re-confirmed here. |

---

## 11. Gaps and the next discriminating question

**Gaps that block a stronger finding**

- No executed document was available for any of the four hypotheses: no subscription agreement, no loan agreement, no shareholder agreement, no lease. Every rights statement above is therefore about *announced* or *institutional* authority, not contract text.
- No consortium ownership split, voting threshold, reserved-matter list or board composition for AIP/MGX/GIP. Without it, MGX's power is unknown in both directions.
- No confirmation of which Canadian entity invests in Cohere, on what mandate, or with what reserved matters. The single most important missing fact in the whole set.
- No evidence anywhere that AI safety falls inside JBIC's Guidelines scope, GIC's risk policy, or any Canadian investment condition. The plausible-route claims in this note are *institutional plausibility*, not documented intent.
- No denominator for substitutability. I can name alternatives; I cannot quantify how costly replacement capital or replacement capacity would be.
- The Anthropic registration statement (public S-1, filed 26 Oct 2026 per `financing.md`) is the best available source of real investor rights — voting agreements, preferred conversion, board composition — and it was **not** opened in this pass. It is the obvious next retrieval.

**Next discriminating question (one, testable):**

> **In the Anthropic S-1 exhibit index, is there any shareholder or investor agreement that gives a named non-US holder a board seat, a consent right, or a reporting right that could be conditioned on safety — and if so, which named institution holds it?**

This question is chosen because it is the only route found that would convert "state-linked investor" into "named decision maker with a documented right", which is precisely the distinction all four hypotheses currently fail. It is answerable from one filing, at a known URL, without a counterparty's consent.

**Second, if the filing does not answer it:** obtain the next Canadian Cohere stage agreement or an access-to-information release naming the investing vehicle, since Canada is the only one of the four with an actually open window.
