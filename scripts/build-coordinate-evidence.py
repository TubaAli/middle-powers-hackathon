#!/usr/bin/env python3
"""Lossless, deterministic evidence assembly. Does not calculate map coordinates."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / 'research_notes/Route coordinate evidence'
SHARDS = ['africa', 'asia-pacific', 'europe', 'finance', 'latin-america',
          'south-asia-gulf', 'southeast-asia']


def load(path):
    return json.loads(path.read_text())


def receipt(path):
    content = path.read_bytes()
    return {'path': path.relative_to(ROOT).as_posix(), 'bytes': len(content),
            'sha256': hashlib.sha256(content).hexdigest()}


def build():
    route_file = ROOT / 'data/routes-quantitative.json'
    metadata = {r['id']: r for r in load(route_file)['routes']}
    routes, scopes = [], {}
    inputs = [receipt(route_file)]
    for name in SHARDS:
        path = RESEARCH / f'{name}.json'
        data = load(path)
        inputs.append(receipt(path))
        scopes[name] = {k: v for k, v in data.items() if k != 'routes'}
        for record in data['routes']:
            route = metadata[record['routeId']]
            routes.append({**record, 'scopeId': name, 'title': route['title'],
                           'shortLabel': route['shortLabel'], 'countries': route['countries']})
    ids = [r['routeId'] for r in routes]
    if len(ids) != 32 or len(set(ids)) != 32 or set(ids) != set(metadata):
        raise ValueError('Expected exactly the same 32 routes as the map')
    method_path = RESEARCH / 'measurement.json'
    method = load(method_path)
    inputs.append(receipt(method_path))
    downloads = [receipt(p) for directory in ['measurement-inputs', 'allocation-inputs']
                 for p in sorted((RESEARCH / directory).rglob('*'))
                 if p.is_file() and p.suffix in {'.csv', '.json', '.md', '.py'}]
    facts = [f for r in routes for f in r['facts']]
    result = {
        'schemaVersion': 1,
        'observed': max(s['observed'] for s in scopes.values()),
        'coordinateEstimatesAssigned': False,
        'interpretation': 'Retrieved inputs, not estimated coordinates. Numeric values include dates, thresholds, plans, context and reported outcomes; they are not a count of measured safety outcomes. Source records are not unique independent sources. Existing map coordinates are unchanged.',
        'counts': {'routes': len(routes), 'facts': len(facts),
                   'numericScalarFacts': sum(type(f['value']) in (int, float) for f in facts),
                   'structuredValueFacts': sum(isinstance(f['value'], (dict, list)) for f in facts),
                   'textValueFacts': sum(isinstance(f['value'], str) for f in facts),
                   'nullValueFacts': sum(f['value'] is None for f in facts),
                   'sourceRecords': sum(len(s['sources']) for s in scopes.values()) + len(method['sources']),
                   'searchRecords': sum(len(s['searches']) for s in scopes.values()) + len(method['searches'])},
        'inputs': inputs, 'routes': sorted(routes, key=lambda r: r['routeId']),
        'scopes': scopes, 'method': method, 'downloads': downloads,
        'reportPath': 'reports/Route coordinate evidence.md',
    }
    target = ROOT / 'data/coordinate-evidence.json'
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + '\n')
    print(json.dumps(result['counts']))


if __name__ == '__main__':
    build()
