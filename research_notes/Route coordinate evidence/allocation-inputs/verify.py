"""Offline verification of the saved public subset and research references."""
import hashlib
import json
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parent
receipt = json.loads((ROOT / 'indiaai-receipt.json').read_text())
fields = {'projectID', 'approvalDate', 'organisation', 'allocatedSubsidyINR',
          'billOfMaterialsINR', 'gpuCount', 'gpuTypes', 'hoursRaw', 'hoursUnit', 'status'}
tables = {}
for basis in ('raw', 'displayed'):
    name = f'indiaai-{basis}-allocations.json'
    data = (ROOT / name).read_bytes()
    assert hashlib.sha256(data).hexdigest() == receipt['files'][name]['sha256']
    rows = json.loads(data)
    assert len(rows) == len({r['projectID'] for r in rows}) == 303
    assert all(set(r) == fields for r in rows)
    for field in ('allocatedSubsidyINR', 'billOfMaterialsINR'):
        assert all(r[field] is None or isinstance(r[field], str) for r in rows)
        total = sum((Decimal(r[field] or '0') for r in rows), Decimal(0))
        assert total == Decimal(receipt['summary'][basis][field])
    assert sum(r['hoursRaw'] is None for r in rows) == 49
    assert sum(r['hoursRaw'] == '' for r in rows) == 148
    tables[basis] = {r['projectID']: r for r in rows}
assert tables['raw'].keys() == tables['displayed'].keys()
differences = []
for pid, row in tables['displayed'].items():
    before = tables['raw'][pid]
    changes = {k: {'raw': before[k], 'displayed': v}
               for k, v in row.items() if before[k] != v}
    if changes:
        differences.append({'projectID': pid, 'changes': changes})
assert differences == receipt['displayDifferences']
assert len(differences) == 4
research = json.loads((ROOT.parent / 'south-asia-gulf.json').read_text())
sources = {s['id'] for s in research['sources']}
searches = {s['id'] for s in research['searches']}
assert len(sources) == len(research['sources'])
assert len(searches) == len(research['searches'])
facts = [f for r in research['routes'] for f in r['facts']]
assert len(facts) == len({f['id'] for f in facts})
for item in facts + research['searches']:
    assert set(item['sourceIds']) <= sources
for route in research['routes']:
    for gap in route['gaps']:
        assert set(gap['searchIds']) <= searches
followup = json.loads((ROOT / 'followup-source-receipts.json').read_text())
by_id = {s['id']: s for s in followup}
supported = by_id['tr-supported24']['projectIDs']
pending = by_id['tr-pending24']['projectIDs']
assert len(supported) == len(set(supported)) == 11
assert len(pending) == len(set(pending)) == 5
assert not set(supported) & set(pending)
print(f'PASS: 303 records each; hashes, decimal sums, four overrides, allowed fields; '
      f'11/5 disjoint Turkish IDs; {len(facts)} facts, {len(sources)} sources, '
      f'{len(searches)} retrieval records and references valid.')
