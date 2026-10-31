#!/usr/bin/env python3
"""Validator for data/finance-research (finance research leads).

Checks sources.json and candidates.json for:
  - source reference integrity (every record cites real, checked sources with locators)
  - unique IDs (records and sources)
  - required explicit null/unknown fields (unknowns render explicitly, never omitted)
  - status enums (instrument, right, finance, window, condition, verification)
  - per-record required status distinctions (Anthropic amount null; Canada CAD inferred
    and vehicle unnamed; EuroHPC draft status; etc.)
  - no open-window inference on announced/unknown/draft records
  - 'existing_evidenced' conditions require a signed instrument; draft instruments may
    only carry 'existing_in_draft'
  - no record labeled a currently existing enforceable complete model-safety path
  - shared-transaction finance consistency (same amount/currency/flow/payment status)
  - prohibited-claims scan (no sovereign control, authority rank, national share,
    bank nationality counts, or implied cheap substitutes)
  - when .local/finance-evidence/ is present, SHA-256/byte integrity of each retained
    source against sources.json (degrades to format check when absent)

Standard library only. Run from the repository root:
    python3 scripts/validate-finance-research.py
"""

import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data", "finance-research")
SOURCES_PATH = os.path.join(DATA_DIR, "sources.json")
CANDIDATES_PATH = os.path.join(DATA_DIR, "candidates.json")
EVIDENCE_DIR = os.path.join(ROOT, ".local", "finance-evidence")
OBSERVATION_DATE = "2026-10-31"

CONDITION_IDS = [
    "pre_release_testing",
    "incident_reporting",
    "protected_weights",
    "essential_user_continuity",
    "known_chip_locations",
    "local_stop_due_process",
]

EXPECTED_RECORD_IDS = {
    "eurohpc-incident-notification",
    "eurohpc-asset-inventory-relocation",
    "eurohpc-additional-security-measures-request",
    "anthropic-credit-consent-gates",
    "canada-cohere-staged-equity",
}

INSTRUMENT_STATUSES = {"draft_unsigned", "signed", "announced", "unknown"}
TRANSACTION_STATUSES = {"announced", "signed", "closed", "repaid", "cancelled", "exited", "unknown"}
EVIDENCE_TYPES = {"contract", "filing", "official_release", "reporting"}
RIGHT_STATUSES = {"documented", "announced", "proposed", "unknown"}
FLOW_TYPES = {"equity", "debt", "procurement", "guarantee", "lease", "grant", "unknown"}
PAYMENT_STATUSES = {"funded", "committed", "conditional", "announced", "undisclosed", "unknown"}
WINDOW_STATUSES = {"open", "closed", "conditional", "unknown"}
CONDITION_STATUSES = {"existing_in_draft", "existing_evidenced", "proposed_reachable", "outside_instrument_scope", "unknown"}
ACCESS_STATUSES = {"raw_download", "rendered_dom", "retained_tool_extraction", "not_retained"}
VERIFICATION_STATUSES = {"section_checked", "string_checked", "not_relied"}
EVIDENCE_ACCESS_LEVELS = {"full", "partial", "index_only", "phrase_match"}
CONFIDENCE_LEVELS = {"low", "medium", "high"}

REQUIRED_RECORD_KEYS = [
    "id", "transaction_id", "label", "summary", "instrument", "holder", "target",
    "right", "right_status", "safety_proposal", "rights_vs_proposal_separation",
    "model_safety_path", "finance", "dates", "window", "consent", "substitutes",
    "conditions", "verification", "remedies", "source_references", "missing_evidence",
]
REQUIRED_INSTRUMENT_KEYS = ["type", "name", "instrument_status", "transaction_status", "evidence_type"]
REQUIRED_FINANCE_KEYS = ["flow_type", "amount", "currency", "currency_basis", "amount_basis", "payment_status", "as_of"]
REQUIRED_DATES_KEYS = ["announcement_date", "signature_date", "closing_date", "publication_date", "next_decision_dates", "observation_date"]
REQUIRED_WINDOW_KEYS = ["status", "basis"]
REQUIRED_CONDITION_KEYS = ["status", "obligor", "verifier", "deliverable", "remedy", "expiry_survival", "note"]
REQUIRED_SOURCE_KEYS = ["id", "name", "title", "url", "sha256", "bytes", "access", "verification", "observed", "document_date", "extraction", "notes"]
REQUIRED_VERIFICATION_KEYS = ["access", "confidence", "observation_date", "basis"]

PROHIBITED_KEY_NAMES = [
    "authority_rank", "national_share", "total_national_share", "bank_nationality",
    "non_us_bank_count", "sovereign_control", "cheap_substitute", "substitution_cost",
    "power_score",
]
PROHIBITED_PHRASES = [
    "sovereign control", "authority rank", "national control share", "cheap substitut",
    "nine non-us", "free money", "veto over model",
]
MAX_STRING_LEN = 1200  # guard against copying raw source text into the dataset

ERRORS = []
WARNINGS = []


def error(msg):
    ERRORS.append(msg)


def warn(msg):
    WARNINGS.append(msg)


def is_sha256(value):
    return isinstance(value, str) and re.fullmatch(r"[0-9a-f]{64}", value) is not None


def walk_strings(obj, path="$"):
    """Yield (path, value) for every string leaf, recursing dicts and lists."""
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for key, value in obj.items():
            yield from walk_strings(value, "{}.{}".format(path, key))
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            yield from walk_strings(value, "{}[{}]".format(path, index))


def check_enum(value, allowed, where):
    if value not in allowed:
        error("{}: invalid status {!r}; allowed: {}".format(where, value, sorted(allowed)))


def check_required_keys(obj, keys, where):
    for key in keys:
        if key not in obj:
            error("{}: missing required key '{}'".format(where, key))


def check_explicit_unknown(obj, key, where):
    """Key must exist; if null it is an explicit, rendered unknown - that is allowed."""
    if key not in obj:
        error("{}: missing key '{}' (unknowns must render explicitly, not be omitted)".format(where, key))


def validate_sources(sources_doc):
    if not isinstance(sources_doc, dict) or "sources" not in sources_doc:
        error("sources.json: top-level object with 'sources' list required")
        return {}
    sources_doc["observation_date"] = sources_doc.get("observation_date")
    if sources_doc.get("observation_date") != OBSERVATION_DATE:
        error("sources.json: observation_date must be {}".format(OBSERVATION_DATE))

    by_id = {}
    for source in sources_doc["sources"]:
        where = "sources.json [{}]".format(source.get("id", "<missing id>"))
        check_required_keys(source, REQUIRED_SOURCE_KEYS, where)
        sid = source.get("id")
        if sid in by_id:
            error("{}: duplicate source id".format(where))
        if isinstance(sid, str):
            by_id[sid] = source
        if not isinstance(source.get("url"), str) or not source["url"].startswith("http"):
            error("{}: url must be an http(s) string".format(where))
        sha = source.get("sha256")
        if source.get("access") == "not_retained":
            if sha is not None:
                error("{}: not_retained entry must have sha256 null".format(where))
        elif not is_sha256(sha):
            error("{}: sha256 must be 64 lowercase hex chars".format(where))
        bytes_ = source.get("bytes")
        if source.get("access") == "not_retained":
            if bytes_ is not None:
                error("{}: not_retained entry must have bytes null".format(where))
        elif not isinstance(bytes_, int) or bytes_ <= 0:
            error("{}: bytes must be a positive integer".format(where))
        check_enum(source.get("access"), ACCESS_STATUSES, where + " access")
        check_enum(source.get("verification"), VERIFICATION_STATUSES, where + " verification")
        if source.get("observed") != OBSERVATION_DATE:
            error("{}: observed must be {}".format(where, OBSERVATION_DATE))
        if not isinstance(source.get("title"), str) or not source["title"]:
            error("{}: title must be a non-empty string".format(where))
        if not isinstance(source.get("notes"), str) or not source["notes"]:
            error("{}: notes must be a non-empty string".format(where))

    # Exact status distinctions required by the task.
    required_access = {
        "eurohpc-framework": "raw_download",
        "eurohpc-specifications": "raw_download",
        "eurohpc-changes": "raw_download",
        "eurohpc-annex2": "raw_download",
        "eurohpc-portal": "rendered_dom",
        "cdev-act": "raw_download",
        "canada-cohere": "raw_download",
        "anthropic-credit-tool-text": "retained_tool_extraction",
        "anthropic-credit-raw-fetch": "not_retained",
    }
    for sid, access in required_access.items():
        source = by_id.get(sid)
        if source is None:
            error("sources.json: required source '{}' missing".format(sid))
            continue
        if source.get("access") != access:
            error("sources.json [{}]: access must be '{}' (got {!r})".format(sid, access, source.get("access")))
    for sid in ("eurohpc-framework", "eurohpc-specifications", "eurohpc-changes", "eurohpc-annex2", "anthropic-credit-tool-text", "eurohpc-portal"):
        source = by_id.get(sid)
        if source and source.get("verification") != "section_checked":
            error("sources.json [{}]: verification must be 'section_checked'".format(sid))
    tool_text = by_id.get("anthropic-credit-tool-text")
    if tool_text:
        notes = tool_text.get("notes", "") + tool_text.get("title", "")
        if "not raw html" not in notes.lower():
            if "NOT raw HTML" not in (tool_text.get("notes", "") or ""):
                error("sources.json [anthropic-credit-tool-text]: notes must state it is NOT raw HTML (direct fetch 403)")
        if "403" not in (tool_text.get("notes", "") or ""):
            error("sources.json [anthropic-credit-tool-text]: notes must state the direct raw fetch 403")
        if "682,490" not in (tool_text.get("notes", "") or "") + (tool_text.get("title", "") or ""):
            error("sources.json [anthropic-credit-tool-text]: must record the 682,490-character retained text")
    if by_id.get("canada-cohere", {}).get("verification") not in ("section_checked", "string_checked"):
        error("sources.json [canada-cohere]: verification must be section_checked or string_checked")
    if by_id.get("cdev-act", {}).get("verification") not in ("section_checked", "string_checked"):
        error("sources.json [cdev-act]: verification must be section_checked or string_checked")

    # Integrity: if the git-ignored evidence directory exists, hashes and sizes must match.
    for source in sources_doc["sources"]:
        if source.get("access") == "not_retained":
            continue
        where = "sources.json [{}]".format(source.get("id", "<missing id>"))
        path = os.path.join(EVIDENCE_DIR, source.get("name", ""))
        if not os.path.exists(path):
            warn("evidence file not present (skipping integrity check): {}".format(source.get("name")))
            continue
        with open(path, "rb") as handle:
            digest = hashlib.sha256(handle.read()).hexdigest()
        size = os.path.getsize(path)
        if digest != source.get("sha256"):
            error("{}: retained file sha256 mismatch (file={}, dataset={})".format(where, digest, source.get("sha256")))
        if size != source.get("bytes"):
            error("{}: retained file byte-size mismatch (file={}, dataset={})".format(where, size, source.get("bytes")))
    return by_id


def validate_record(record, source_ids):
    rid = record.get("id", "<missing id>")
    where = "candidates.json [{}]".format(rid)
    check_required_keys(record, REQUIRED_RECORD_KEYS, where)

    # --- enums ---
    instrument = record.get("instrument", {})
    check_required_keys(instrument, REQUIRED_INSTRUMENT_KEYS, where + " instrument")
    check_enum(instrument.get("instrument_status"), INSTRUMENT_STATUSES, where + " instrument_status")
    check_enum(instrument.get("transaction_status"), TRANSACTION_STATUSES, where + " transaction_status")
    check_enum(instrument.get("evidence_type"), EVIDENCE_TYPES, where + " evidence_type")
    check_enum(record.get("right_status"), RIGHT_STATUSES, where + " right_status")

    holder = record.get("holder", {})
    check_explicit_unknown(holder, "vehicle", where + " holder")

    # Deliberate exclusion: no retained source evidences substitute cost or
    # availability, so the substitutes field must render as an explicit null.
    if record.get("substitutes") is not None:
        error("{}: substitutes must be null (no retained source evidences substitute "
              "cost or availability)".format(where))

    finance = record.get("finance", {})
    check_required_keys(finance, REQUIRED_FINANCE_KEYS, where + " finance")
    check_enum(finance.get("flow_type"), FLOW_TYPES, where + " flow_type")
    check_enum(finance.get("payment_status"), PAYMENT_STATUSES, where + " payment_status")
    if finance.get("amount") is not None and not isinstance(finance.get("amount"), (int, float)):
        error("{}: finance.amount must be a number or null".format(where))
    for key in ("currency_basis", "amount_basis"):
        if not isinstance(finance.get(key), str) or not finance.get(key):
            error("{}: finance.{} must be a non-empty string".format(where, key))
    if finance.get("as_of") != OBSERVATION_DATE:
        error("{}: finance.as_of must be {}".format(where, OBSERVATION_DATE))

    dates = record.get("dates", {})
    check_required_keys(dates, REQUIRED_DATES_KEYS, where + " dates")
    if dates.get("observation_date") != OBSERVATION_DATE:
        error("{}: dates.observation_date must be {}".format(where, OBSERVATION_DATE))

    window = record.get("window", {})
    check_required_keys(window, REQUIRED_WINDOW_KEYS, where + " window")
    check_enum(window.get("status"), WINDOW_STATUSES, where + " window.status")
    if not isinstance(window.get("basis"), str) or not window.get("basis"):
        error("{}: window.basis must be a non-empty string".format(where))

    verification = record.get("verification", {})
    check_required_keys(verification, REQUIRED_VERIFICATION_KEYS, where + " verification")
    check_enum(verification.get("access"), EVIDENCE_ACCESS_LEVELS, where + " verification.access")
    check_enum(verification.get("confidence"), CONFIDENCE_LEVELS, where + " verification.confidence")
    if verification.get("observation_date") != OBSERVATION_DATE:
        error("{}: verification.observation_date must be {}".format(where, OBSERVATION_DATE))

    # --- six conditions ---
    conditions = record.get("conditions", {})
    if set(conditions.keys()) != set(CONDITION_IDS):
        error("{}: conditions must contain exactly the six IDs {}, got {}".format(
            where, CONDITION_IDS, sorted(conditions.keys())))
    for cid in conditions:
        condition = conditions[cid]
        cwhere = "{} conditions.{}".format(where, cid)
        check_required_keys(condition, REQUIRED_CONDITION_KEYS, cwhere)
        check_enum(condition.get("status"), CONDITION_STATUSES, cwhere + " status")
        if cid == "incident_reporting" and condition.get("scope") not in {
            "infrastructure_security", "model_incidents_proposed", "not_established_by_this_right"
        }:
            error("{}: explicit incident-reporting scope required".format(cwhere))
        if not isinstance(condition.get("note"), str) or not condition.get("note"):
            error("{}: note must be a non-empty string".format(cwhere))

    # --- core discipline rules ---
    instrument_status = instrument.get("instrument_status")
    transaction_status = instrument.get("transaction_status")

    # Rule 1: no record is a currently existing enforceable complete model-safety path.
    path = record.get("model_safety_path", {})
    if path.get("existing_enforceable_complete") is not False:
        error("{}: model_safety_path.existing_enforceable_complete must be false".format(where))
    if not isinstance(path.get("basis"), str) or not path.get("basis"):
        error("{}: model_safety_path.basis must be a non-empty string".format(where))

    # Rule 2: no open-window inference on announced/unknown/draft.
    if window.get("status") == "open":
        if instrument_status in ("draft_unsigned", "announced", "unknown") or transaction_status in ("announced", "unknown"):
            error("{}: window.status 'open' is forbidden for draft/announced/unknown instruments".format(where))

    # Rule 3: existing_evidenced requires a signed instrument; draft instruments may
    # only carry existing_in_draft (never an "existing power" badge).
    for cid, condition in conditions.items():
        status = condition.get("status")
        if status == "existing_evidenced" and instrument_status != "signed":
            error("{} conditions.{}: 'existing_evidenced' requires instrument_status 'signed'".format(where, cid))
        if status == "existing_in_draft" and instrument_status != "draft_unsigned":
            error("{} conditions.{}: 'existing_in_draft' requires instrument_status 'draft_unsigned'".format(where, cid))
        if instrument_status in ("draft_unsigned", "announced", "unknown") and status == "existing_evidenced":
            error("{} conditions.{}: draft/announced/unknown instrument cannot carry 'existing_evidenced'".format(where, cid))

    # --- source references ---
    refs = record.get("source_references", [])
    if not refs:
        error("{}: at least one source_reference is required".format(where))
    for ref in refs:
        sid = ref.get("source_id")
        if sid not in source_ids:
            error("{}: source_reference cites unknown source_id {!r}".format(where, sid))
        else:
            source = source_ids[sid]
            if source.get("verification") == "not_relied":
                error("{}: source {!r} is marked not_relied and cannot back a claim".format(where, sid))
            if source.get("access") == "not_retained":
                error("{}: source {!r} is not_retained and cannot back a claim".format(where, sid))
        if not isinstance(ref.get("locator"), str) or not ref.get("locator"):
            error("{}: source_reference for {!r} needs a non-empty locator".format(where, sid))

    # --- required non-empty prose fields ---
    for key in ("summary", "label", "safety_proposal", "rights_vs_proposal_separation"):
        if not isinstance(record.get(key), str) or not record.get(key):
            error("{}: '{}' must be a non-empty string".format(where, key))
    for key in ("remedies", "missing_evidence"):
        value = record.get(key)
        if not isinstance(value, list) or not value:
            error("{}: '{}' must be a non-empty list".format(where, key))

    return rid


def validate_per_record_distinctions(records_by_id):
    """Encode the task's exact per-record status distinctions as assertions."""
    def get(rid):
        record = records_by_id.get(rid)
        if record is None:
            error("candidates.json: required record '{}' missing".format(rid))
            return {}
        return record

    # EuroHPC trio: draft, documented rights, never enforceable today, no open window.
    for rid in ("eurohpc-incident-notification", "eurohpc-asset-inventory-relocation", "eurohpc-additional-security-measures-request"):
        record = get(rid)
        where = "candidates.json [{}]".format(rid)
        if record.get("instrument", {}).get("instrument_status") != "draft_unsigned":
            error("{}: instrument_status must be 'draft_unsigned'".format(where))
        if record.get("right_status") != "documented":
            error("{}: right_status must be 'documented'".format(where))
        if record.get("window", {}).get("status") not in ("conditional", "unknown"):
            error("{}: window.status must be 'conditional' or 'unknown'".format(where))
        if record.get("finance", {}).get("currency") != "EUR":
            error("{}: finance.currency must be 'EUR'".format(where))
        if record.get("finance", {}).get("amount") is not None:
            error("{}: call-wide amount must be null; per-lot/per-FWC ceilings are not a shared transaction amount".format(where))
        if "once" not in record.get("finance", {}).get("amount_basis", ""):
            error("{}: finance.amount_basis must carry the count-once note for the shared transaction".format(where))

    rec = get("eurohpc-incident-notification")
    if rec:
        if rec["conditions"]["incident_reporting"]["status"] != "existing_in_draft":
            error("[eurohpc-incident-notification] conditions.incident_reporting must be 'existing_in_draft'")
        if rec["conditions"]["incident_reporting"].get("scope") != "infrastructure_security":
            error("[eurohpc-incident-notification] draft duty has infrastructure_security scope")
        for cid, cond in rec["conditions"].items():
            if cid != "incident_reporting" and cond["status"] == "existing_in_draft":
                error("[eurohpc-incident-notification] only incident_reporting may be existing_in_draft")

    rec = get("eurohpc-asset-inventory-relocation")
    if rec:
        if rec["conditions"]["known_chip_locations"]["status"] != "existing_in_draft":
            error("[eurohpc-asset-inventory-relocation] conditions.known_chip_locations must be 'existing_in_draft'")
        for cid, cond in rec["conditions"].items():
            if cid != "known_chip_locations" and cond["status"] == "existing_in_draft":
                error("[eurohpc-asset-inventory-relocation] only known_chip_locations may be existing_in_draft")

    rec = get("eurohpc-additional-security-measures-request")
    if rec:
        if rec["conditions"]["incident_reporting"]["status"] != "proposed_reachable":
            error("[eurohpc-additional-security-measures-request] conditions.incident_reporting must be 'proposed_reachable'")
        if rec["conditions"]["local_stop_due_process"]["status"] != "proposed_reachable":
            error("[eurohpc-additional-security-measures-request] conditions.local_stop_due_process must be 'proposed_reachable'")
        for cid, cond in rec["conditions"].items():
            if cond["status"] == "existing_in_draft":
                error("[eurohpc-additional-security-measures-request] no condition may be existing_in_draft (request power only)")
            if cond["status"] == "existing_evidenced":
                error("[eurohpc-additional-security-measures-request] no condition may be existing_evidenced")

    # Anthropic: signed instrument, amount null, arrangers-not-lenders, window conditional
    # and borrower-initiated, retained tool text evidence.
    rec = get("anthropic-credit-consent-gates")
    if rec:
        where = "[anthropic-credit-consent-gates]"
        if rec["instrument"]["instrument_status"] != "signed":
            error("{} instrument_status must be 'signed'".format(where))
        if rec["instrument"]["evidence_type"] != "filing":
            error("{} evidence_type must be 'filing'".format(where))
        if rec["finance"]["amount"] is not None:
            error("{} finance.amount must be null (Schedule 2.01 redacted)".format(where))
        if rec["finance"]["currency"] is not None:
            error("{} finance.currency must be null (not established on retained evidence)".format(where))
        if rec["window"]["status"] != "conditional":
            error("{} window.status must be 'conditional' (borrower-initiated, present openness unknown)".format(where))
        if "borrower" not in rec["window"]["basis"].lower():
            error("{} window.basis must state the borrower-initiated character".format(where))
        if rec["verification"]["access"] != "partial":
            error("{} verification.access must be 'partial' (retained tool text, not raw HTML)".format(where))
        if "retained_tool_extraction" not in rec["verification"]["basis"]:
            error("{} verification.basis must state retained_tool_extraction/section_checked".format(where))
        holder_note = json.dumps(rec["holder"])
        if "sole discretion" not in rec["right"]:
            error("{} right must quote the sole-discretion elections".format(where))
        if "Required Lenders" not in rec["right"]:
            error("{} right must state the Borrower + Required Lenders amendment gate".format(where))
        if "not confirmed lenders" not in holder_note and "not confirmed as lenders" not in holder_note and "do not establish lender status" not in holder_note:
            error("{} holder must state that named arrangers are not confirmed lenders".format(where))
        if "[Signature Pages Intentionally Omitted]" not in holder_note:
            error("{} holder must record the omitted signature pages".format(where))
        for cid, cond in rec["conditions"].items():
            if cond["status"] in ("existing_in_draft", "existing_evidenced"):
                error("{} conditions.{} may not be existing_* (no explicit model-safety covenant identified in this review)".format(where, cid))
        sids = {r["source_id"] for r in rec["source_references"]}
        if "anthropic-credit-tool-text" not in sids:
            error("{} must cite source anthropic-credit-tool-text".format(where))

    # Canada: announced, CAD inferred, vehicle unnamed (NOT CDEV), window unknown,
    # no right, reporting non-exclusive, official release evidence.
    rec = get("canada-cohere-staged-equity")
    if rec:
        where = "[canada-cohere-staged-equity]"
        if rec["instrument"]["instrument_status"] != "unknown":
            error("{} instrument_status must be 'unknown'".format(where))
        if rec["instrument"]["transaction_status"] != "announced":
            error("{} transaction_status must be 'announced'".format(where))
        if rec["instrument"]["evidence_type"] != "official_release":
            error("{} evidence_type must be 'official_release'".format(where))
        if rec["right"] is not None:
            error("{} right must be null (no governance/consent right appears in the release)".format(where))
        if rec["right_status"] != "unknown":
            error("{} right_status must be 'unknown'".format(where))
        if rec["finance"]["amount"] != 1600000000:
            error("{} finance.amount must be 1600000000".format(where))
        if rec["finance"]["currency"] != "CAD":
            error("{} finance.currency must be 'CAD'".format(where))
        if "inferred" not in rec["finance"]["currency_basis"]:
            error("{} finance.currency_basis must mark CAD as inferred (source states '$' only)".format(where))
        if rec["finance"]["amount_basis"] and "ceiling" not in rec["finance"]["amount_basis"]:
            error("{} finance.amount_basis must mark the 'up to' ceiling".format(where))
        if rec["window"]["status"] != "unknown":
            error("{} window.status must be 'unknown'".format(where))
        if rec["holder"].get("vehicle") is not None:
            error("{} holder.vehicle must be null (vehicle unnamed)".format(where))
        vehicle_note = rec["holder"].get("vehicle_note", "")
        if "CDEV" not in vehicle_note:
            error("{} holder.vehicle_note must address CDEV".format(where))
        if "NOT established as the investor" not in vehicle_note:
            error("{} holder.vehicle_note must state CDEV is NOT established as the investor".format(where))
        if "zero occurrences" not in vehicle_note:
            error("{} holder.vehicle_note must record the zero-occurrence check".format(where))
        if "capacity" not in vehicle_note or "identity" not in vehicle_note:
            error("{} holder.vehicle_note must distinguish CDEV capacity from investor identity".format(where))
        summary = rec.get("summary", "") + rec.get("rights_vs_proposal_separation", "")
        if "non-exhaustive" not in summary:
            error("{} must record that the reporting scope is non-exhaustive ('including' jobs and investment)".format(where))
        if "including" not in rec.get("rights_vs_proposal_separation", ""):
            error("{} rights_vs_proposal_separation must quote the 'including' reporting sentence".format(where))
        for cid, cond in rec["conditions"].items():
            if cond["status"] in ("existing_in_draft", "existing_evidenced"):
                error("{} conditions.{} may not be existing_* (no instrument located)".format(where, cid))
        sids = {r["source_id"] for r in rec["source_references"]}
        if "canada-cohere" not in sids:
            error("{} must cite source canada-cohere".format(where))
        if "cdev-act" in sids:
            for ref in rec["source_references"]:
                if ref["source_id"] == "cdev-act" and "never as identification of the investor" not in ref["locator"] \
                        and "only for CDEV" not in ref["locator"] and "capacity" not in ref["locator"]:
                    error("{} cdev-act citation must be scoped to capacity, not investor identity".format(where))


def validate_transactions(records):
    groups = {}
    for record in records:
        groups.setdefault(record.get("transaction_id"), []).append(record)
    for tid, group in groups.items():
        if len(group) < 2:
            continue
        first = group[0].get("finance", {})
        for record in group[1:]:
            finance = record.get("finance", {})
            rid = record.get("id")
            for key in ("amount", "currency", "flow_type", "payment_status"):
                if finance.get(key) != first.get(key):
                    error("[{}]: shared transaction '{}' must have identical finance.{} across records "
                          "(count the shared amount once)".format(rid, tid, key))


def validate_prohibited_claims(candidates_doc):
    raw = json.dumps(candidates_doc)

    def find_key(obj, path="$"):
        if isinstance(obj, dict):
            for key, value in obj.items():
                if key.lower() in PROHIBITED_KEY_NAMES:
                    error("candidates.json: prohibited key '{}' at {}".format(key, path))
                find_key(value, "{}.{}".format(path, key))
        elif isinstance(obj, list):
            for index, value in enumerate(obj):
                find_key(value, "{}[{}]".format(path, index))

    find_key(candidates_doc)
    lowered = raw.lower()
    for phrase in PROHIBITED_PHRASES:
        if phrase in lowered:
            error("candidates.json: prohibited phrase {!r} present".format(phrase))

    # Guard against copying raw source text: cap any single string value.
    for path, value in walk_strings(candidates_doc):
        if len(value) > MAX_STRING_LEN:
            error("candidates.json: string at {} is {} chars (over cap {}); raw source text must not be copied"
                  .format(path, len(value), MAX_STRING_LEN))


def main():
    if not os.path.exists(SOURCES_PATH):
        print("FAIL: missing {}".format(SOURCES_PATH))
        return 2
    if not os.path.exists(CANDIDATES_PATH):
        print("FAIL: missing {}".format(CANDIDATES_PATH))
        return 2

    with open(SOURCES_PATH, encoding="utf-8") as handle:
        sources_doc = json.load(handle)
    with open(CANDIDATES_PATH, encoding="utf-8") as handle:
        candidates_doc = json.load(handle)

    source_ids = validate_sources(sources_doc)

    records = candidates_doc.get("records")
    if not isinstance(records, list) or not records:
        print("FAIL: candidates.json needs a non-empty 'records' list")
        return 2
    if candidates_doc.get("observation_date") != OBSERVATION_DATE:
        error("candidates.json: observation_date must be {}".format(OBSERVATION_DATE))

    seen_ids = set()
    records_by_id = {}
    for record in records:
        rid = validate_record(record, source_ids)
        if rid in seen_ids:
            error("candidates.json: duplicate record id '{}'".format(rid))
        seen_ids.add(rid)
        if isinstance(rid, str):
            records_by_id[rid] = record
    if seen_ids != EXPECTED_RECORD_IDS:
        error("candidates.json: record ids must be exactly {}; got {}".format(
            sorted(EXPECTED_RECORD_IDS), sorted(seen_ids)))

    validate_per_record_distinctions(records_by_id)
    validate_transactions(records)
    validate_prohibited_claims(candidates_doc)

    # Every record cites at least one section_checked source.
    checked_sources = {sid for sid, source in source_ids.items() if source.get("verification") in ("section_checked", "string_checked")}
    for rid, record in records_by_id.items():
        sids = {ref.get("source_id") for ref in record.get("source_references", [])}
        if not sids & checked_sources:
            error("[{}]: must cite at least one section/string_checked source".format(rid))

    print("records: {}  sources: {}".format(len(records), len(sources_doc.get("sources", []))))
    for warning in WARNINGS:
        print("WARN: " + warning)
    if ERRORS:
        print("FAIL: {} validation error(s)".format(len(ERRORS)))
        for message in ERRORS:
            print("  - " + message)
        return 1
    print("PASS: finance-research dataset is internally consistent "
          "(source refs, unique IDs, explicit unknowns, status enums, per-record distinctions, "
          "no open-window inference on announced/unknown/draft, no enforceable-model-safety-path label, "
           "shared-transaction amounts consistent, configured phrase checks passed). "
           "This is a structural/integrity check, not factual or legal validation.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
