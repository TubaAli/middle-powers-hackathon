# Public allocation and follow-up evidence

Research cutoff: **31 October 2026**. Main interpretation: [`../south-asia-gulf.md`](../south-asia-gulf.md).

| File | Scope |
|---|---|
| `indiaai-raw-allocations.json` | 303 privacy-minimised public response records, before display overrides |
| `indiaai-displayed-allocations.json` | Same 303 project IDs after overrides; **chosen published-table basis** |
| `indiaai-receipt.json` | Source URLs, retrieval timestamp, SHA256 dataset/source-script receipts, totals and four changed rows |
| `capture_indiaai.py` | Reusable public-response capture through an existing local CDP browser |
| `followup-source-receipts.json` | Official source-byte hashes, retrieval timestamps, relevant PDF text and Turkish project IDs; failed MeitY transfer explicitly recorded |
| `verify.py` | Offline integrity, fields, decimal sums, IDs and source-reference checks |

## Units and privacy

Money fields are exact decimal **INR strings**, not crore and not floats. `billOfMaterialsINR` is BOM value; `allocatedSubsidyINR` is allocated subsidy, never payments. `gpuCount` and `hoursRaw` preserve source values and types. Hours are not confirmed metered usage and their GPU/instance basis is unspecified. `status: null` means absent source data, not inactive. Organisation names are retained only through the script's conservative institutional/business allowlist; omitted names are null. Applicant names, contact details and authentication fields are excluded. This is a derived public subset, not a retained full server response.

SHA256 for raw table: `9aa7f1e86f64a0329ddaf1a9f2404162ff8aa295829e9e85fa22f12b586a539f`.

SHA256 for displayed table: `cd3af00fc866d8c38432c0b49bc8fe8cfc04ccf2511c5e311fbe234aa8337756`.

## Reproduce and check

Run `python3 verify.py` from this directory; it needs only the standard library.

To take a **new** live snapshot, run `python capture_indiaai.py --cdp http://localhost:9222` using an already-installed Playwright environment and existing browser. This overwrites the snapshot/receipt, so preserve this dated evidence first. No login, installation or browser launch is performed; only the new capture tab is closed. Source data and rendering logic can change, so historical hashes are not expected to match future captures. Review retained organisation names before sharing a new snapshot.

Follow-up PDF receipts hash the downloaded original bytes; full source PDFs are not archived here. Relevant text is for inspection, not a substitute for checking page layout where column order matters. Turkish lists retain project IDs only. MeitY's failed PDF has no completed-source hash and supplies no evidence.
