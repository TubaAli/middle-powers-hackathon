# Post-check corrections preserve the frozen packet

Observed **31 October 2026**. These corrections incorporate [source-check.md](source-check.md) and [source-check.json](source-check.json) after the independent baseline/lens round. They change the interpretation presented in the report and normalized research view, **not the original 14-file evidence packet, model, audit or lens outputs**. The machine-actionable replacements are in [errata.json](errata.json).

## SC-01: Malaysia requires an applicability determination

The broad DPIA trigger in ADMP **§6.1** must appear together with **§7.1**, which says the guideline may not cover all ADMP and identifies **legal or significant effects**, and **§10.1**, which applies where **AI is used for ADMP**. An authorised determination must establish how these provisions relate for the selected workflow. Do not infer that every AI feature or low-consequence profiling activity falls under the entire guideline; equally, this review does not establish that §7.1 cancels every §6.1 duty. Preserve the existing qualification that §10.2.6 occurs within §10.2's **may-adopt best-practices** wording.

Source: `sandbox-my-admp`, [original guideline](https://www.pdp.gov.my/wp-content/uploads/2026/04/Automated-Decision-Making-And-Profiling-Guideline-ADMP.pdf), PDF pp.7,9,15; saved text lines149–153,192–198,376–379. The checker freshly downloaded the PDF and matched its saved bytes; this does not itself decide legal applicability.

The overlay corrects `sandbox-deployment.json`'s Malaysian first evidence claim and locator, selection inference, decision test, design dependency, qualitative score rationale, and source metadata. The report's **I8**, synthesis summary/**F7/I8**, source index and coverage registry carry the qualification visibly. This adds a scope dependency, not a new numerical score or evidence of consent. The original Markdown's Malaysia paragraph should be read with this qualification; its bytes remain unchanged.

## SC-02: LUMI's known day is last change

For `euro-lumi-terms`, **10 February 2026** is the last-change date on the cover of the [approved terms](https://lumi-supercomputer.eu/wp-content/uploads/2026/03/LUMI-General-Terms-of-Use_2026.pdf), not an established publication day. The overlay sets `/sources/1/published` to `null`, labels `/sources/1/eventDate` as last change and leaves the **31 October 2026** observation intact. The March URL directory proves no publication day. No substantive LUMI route assessment changes.

## Apply replacements to derived views, not evidence files

Each correction has a repository-relative `scope`, exact JSON Pointer `field`, exact `original`, replacement `corrected`, source/route identifiers where applicable, and `sourceCheckId`. Validate the frozen file's hash and each original value, then replace **in memory** before normalization. Refuse mismatched originals; do not silently reapply an overlay to already-corrected values. Preserve the original file reference and correction provenance. The report and synthesis are already post-check outputs; do not apply the frozen-shard pointers directly to them.

## Review scope and unresolved credit reference

The checker inspected **18 external source records** (eight byte-matched PDFs and ten live pages/exhibits) plus the local model. **54 other source records were not independently checked**; their exact IDs and review exclusions remain in `source-check.json`. This is a same-family check, not cross-family review, stakeholder testimony, exhaustive legal-currentness verification or review of the baseline/lens recommendations. The baseline and lenses retain their pre-correction packet; they were not rerun.

The narrow **SC-16** follow-up confirms the Anthropic agreement **§2.22(b) → §9.08(g)** mismatch in filed HTML (printed pp.82,134), removing extraction uncertainty only. **Intended correction and legal effect remain unresolved**; no correcting instrument or authorised interpretation was inspected. SC-13's general credit checks do not establish those matters. Do not silently substitute §9.08(f), infer ineffective amendments or unrestricted safety-covenant authority. Earlier raw-403 observations remain method-specific history. No replacement agreement wording is supplied.
