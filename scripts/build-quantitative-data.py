#!/usr/bin/env python3
"""Assemble quantitative inputs without promoting legacy ratings to measurements."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SHARDS = ['compute-access', 'geneva-additions', 'latin-america', 'africa', 'south-asia-gulf', 'southeast-asia']

def build():
    legacy = json.loads((ROOT / 'data/routes.json').read_text())
    routes = legacy['routes']
    included, missing = [], []
    for name in SHARDS:
        file = ROOT / 'data/route-research' / f'{name}.json'
        if not file.exists():
            missing.append(name)
            continue
        routes.extend(json.loads(file.read_text())['routes'])
        included.append(name)
    overlay_path = ROOT / 'data/route-research/quantitative-overlays.json'
    overlays = json.loads(overlay_path.read_text()).get('overlays', []) if overlay_path.exists() else []
    by_id = {r['id']: r for r in routes}
    if len(by_id) != len(routes):
        raise ValueError('Duplicate route IDs')
    for overlay in overlays:
        route = by_id[overlay['id']]
        route['quantitative'] = overlay['quantitative']
        route['sources'].extend(overlay.get('sources', []))
    bases = {}
    for route in routes:
        # No old 1–5 values or fabricated compatibility placeholders enter this snapshot.
        for key in ['impact', 'feasibility', 'impactRange', 'feasibilityRange']:
            route.pop(key, None)
        route.setdefault('quantitative', {'coverage': None, 'agreements': None})
        sources = {}
        for i, source in enumerate(route['sources']):
            source.setdefault('id', f"{route['id']}-source-{i+1}")
            sources[source['id']] = source
        route['sources'] = list(sources.values())
        coverage = route['quantitative'].get('coverage')
        if coverage:
            bases[coverage['basisId']] = {'id': coverage['basisId'], 'label': coverage['basisLabel']}
    data = {'schemaVersion': 2, 'observed': '2026-10-31',
            'method': 'Potential coverage uses a matched resource-pool denominator. Agreement index is cooperation share divided by one plus minimum unresolved cross-organisation handoffs. Unknown exact consent gives bounds. Optional cooperation assumptions are visitor scenarios, not observed support or calibrated probabilities. Incomplete paths may require additional parties.',
            'bases': list(bases.values()), 'routes': routes,
            'includedShards': included, 'missingShards': missing}
    (ROOT / 'data/routes-quantitative.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(f"Built {len(routes)} quantitative route records; {len(bases)} coverage bases. Missing shards: {', '.join(missing) or 'none'}")

if __name__ == '__main__':
    build()
