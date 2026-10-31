# Inspected measurement inputs — 31 October 2026

These are small public-data extracts, not route scores. The population is the **33 named non-US countries** in `data/routes-quantitative.json`. The United States is retained as a separately flagged comparator. The three EU/EuroHPC collective labels are not countries and were not expanded into invented membership lists.

Start with `country-coverage.csv`, `summary.json`, `variable-definitions.json` and `receipts.json`. `manifest.json` hashes the derived files; `receipts.json` hashes fetched source bytes, with URL, retrieval date and explicit hash scope. Full workbooks/reports are not retained. `retrieve.py` and `summarize.py` document extraction and calculation. XML parsing uses cached workbook values, never recalculates or modifies source workbooks. Re-fetching mutable URLs need not reproduce these hashes.

| Extract | Actual retained content |
|---|---|
| `dgi-country.csv` | 22 target countries, 2023/2025 DGI composites; 22 have 2025 and 19 have 2023 values. Excel row locators. |
| `govtech-indices-country.csv` | Five publisher indices for all 33 targets plus US. |
| `govtech-items-country.csv` | 37 selected source fields per country, including coded answers, names, URLs and years; not 37 numerical metrics. |
| `govtech-item-definitions.json` | Original item wording/coding, including `I-12` e-procurement, `I-38` privacy law, `I-39` data-protection authority, `I-41` AI ethics guidelines. |
| `bready-procurement-country.csv` | 29 selected expert-answer variables × 19 countries = 551 records (18 targets plus US). |
| `bready-duration-inputs.csv` | Five duration questions × 19 countries = 95 answers; 58 plain numeric, including 56 for target countries. Annotations/skip logic are retained, not coerced. |
| `enterprise-surveys-country.csv` | Public-procurement tender-difficulty index, 32 targets plus US. |
| `enterprise-surveys-regulations-country.csv` | 12 public aggregate indicators, same country rows. Payment-days and tender-difficulty have numeric observations for 31 targets each. |
| `enterprise-surveys-metadata.json` | 13 retained indicator definitions/units/IDs from the site's public API. |
| `pstw-rows.csv`, `clusters-rows.csv`, `models-rows.csv` | 968, 225 and 878 selected rows respectively, including US comparator matches; source-row number, native identifiers/name, country, owner/organisation, dates/status where available. |
| `inventory-country-counts.csv` | Disclosure row counts only: PSTW matches 13 targets, clusters 23, models 19. A zero means no matching row, not zero underlying activity. |
| `ocds-event-sample.json` | 12 contract records reached after reading the first 372 lines of Nigeria's 2025 compiled-release file; not a random sample or 2025 award cohort. |
| `ocds-duration-audit.csv` | 12 calculable award→signature differences; one negative and 11 nonnegative. |
| `ocds-milestone-duration-audit.csv` | Eight dated **approval** milestones: five nonnegative and three negative signature→milestone differences. All eight `dateMet` equal `dueDate`. None is established as actual final delivery. |

## Edition and access corrections

- **DGI access solved:** standard-library ZIP/XML parsing of the downloadable XLSX. It contains chart composites, not the underlying questionnaire. 2025 DGI reference period is 2023–24, except Indonesia/Thailand 2022–23; source note retained in `variable-definitions.json`.
- **B-READY access solved:** ordinary public browser fetch from the official publications page overcame the urllib 403. ZIP member `02_B-READY-2025-EconomyAnswer.xlsx` contains actual responses and source classification. `MCP_29_1` through `_5` are expert-reported procurement-duration questions, not observed transaction histories. The answer table provides no item collection timestamps.
- **GovTech access solved:** the catalogue exposed the direct December 2025 XLSX, which urllib downloaded. There are 198 country-code rows but Nicaragua is a hyphen placeholder; the README explicitly says **197 assessed economies**. Survey collection March–June 2025, validation July–October; 158 survey participants and 39 remote assessments. The workbook says generative AI assisted validation/remote collection, so do not treat the answers as independently audited facts.
- **Enterprise Surveys public access solved:** the site's actual public JSON endpoints were observed in the browser and then fetched without login. Current payment-days code is **`bready_reg9`**, not old `reg9`. `isLatestYear=1` and **`economyType=Economy`** filters avoid incorrectly counting subnational locations as national observations. UAE is absent from this response; South Africa has `n.a.` for the two highlighted indicators. Waves remain country-specific. Respondent counts/SEs and full calculation methodology are not returned by these endpoints.
- **OCDS payload access solved:** schema presence is now distinguished from observed fields. The sample's release timestamps are in 2025 but awards/signatures include 2019 and 2022. An apparent milestone “completion” is actually labelled `approval`; source verification is essential before treating any as implementation duration. Twelve transactions have amounts but no dates.

## Interpretation

The saved publisher indices are observed **indices**, not measured route feasibility. The observed duration inputs make a procurement reference-class investigation possible, but no mapping to a June 2027 success probability was fitted. No new 0–1 coordinates, harm weights, or efficacy estimates were assigned. Remaining gaps are listed in `summary.json` and the parent `measurement.md`.

The only browser tabs used for retrieval were task-specific public pages. No logins, credentials, installs, spending or contacts were required.
