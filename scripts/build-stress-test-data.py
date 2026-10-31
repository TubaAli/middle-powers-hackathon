#!/usr/bin/env python3
"""Deterministic public projection; never rewrites frozen research or model inputs."""
import copy
import hashlib
import json
from pathlib import Path
from urllib.parse import quote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PACKET = Path('research_notes/Safeguard proposal stress tests')
INPUTS = {}


def load(path):
    path = Path(path)
    raw = (ROOT / path).read_bytes()
    INPUTS[str(path)] = hashlib.sha256(raw).hexdigest()
    return json.loads(raw)


def href(path):
    if urlsplit(path).scheme in ('http', 'https'):
        return path
    if urlsplit(path).scheme or path.startswith(('/', '//')) or '..' in Path(path).parts:
        raise ValueError(f'Unsafe source path: {path}')
    return '../' + quote(path, safe='/')


def references(obj):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key == 'sourceIds':
                yield from value
            else:
                yield from references(value)
    elif isinstance(obj, list):
        for value in obj:
            yield from references(value)


def build():
    meta = load('data/routes-quantitative.json')
    model = load('data/route-placement-model.json')
    inherited = load('data/coordinate-evidence.json')
    synthesis = load(PACKET / 'synthesis.json')
    audit = load(PACKET / 'model-audit.json')
    check = load(PACKET / 'source-check.json')
    coverage = load(PACKET / 'coverage.json')
    method = load(PACKET / 'workflow-method.json')
    load(PACKET / 'execution-receipt.json')
    lenses = {name: load(PACKET / (name + '.json')) for name in
              ('baseline', 'lens-implementation', 'lens-frontier', 'lens-rights', 'lens-international')}
    errata_path = PACKET / 'errata.json'
    errata = load(errata_path) if (ROOT / errata_path).exists() else None
    applied = []
    routes, sources = {}, {}
    for shard in ('compute', 'japan-asia', 'europe-finance', 'rights-enforcement', 'sandbox-deployment'):
        data = load(PACKET / (shard + '.json'))
        if errata:
            applied.extend(apply_errata(data, errata, str(PACKET / (shard + '.json'))))
        for row in data['routes']:
            rid = row['routeId']
            assert rid not in routes, f'Duplicate route {rid}'
            routes[rid] = {**row, 'ledgerHref': href(str(PACKET / (shard + '.json'))), 'shard': shard}
        for row in data['sources']:
            assert row['id'] not in sources, f'Duplicate source {row["id"]}'
            sources[row['id']] = {**row, 'ledgerHref': href(str(PACKET / (shard + '.json')))}

    # Inherited citations remain visibly inherited, not fresh retrievals.
    for scope in inherited['scopes'].values():
        for row in scope.get('sources', []):
            sources.setdefault(row['id'], {**row, 'inherited': True,
                                           'ledgerHref': href('data/coordinate-evidence.json')})
    for route in meta['routes']:
        for row in route.get('sources', []):
            sources.setdefault(row['id'], {**row, 'inherited': True,
                                           'ledgerHref': href('data/routes-quantitative.json')})
    for sid, path in {'placement-model': 'data/route-placement-model.json',
                      'quantitative-routes': 'data/routes-quantitative.json',
                      'coordinate-report': 'reports/Route coordinate evidence.md'}.items():
        sources.setdefault(sid, {'id': sid, 'title': path, 'url': path,
                                'access': 'read', 'inherited': True, 'locator': 'Fixed input packet'})
    needed = set(references([list(routes.values()), synthesis, coverage]))
    # Some lens citations explicitly name a saved fact ID, rather than a source
    # ID. Resolve the exact record without pretending it is a new primary read.
    for route in inherited['routes']:
        for fact in route['facts']:
            if fact['id'] in needed and fact['id'] not in sources:
                sources[fact['id']] = {
                    'id': fact['id'], 'title': 'Saved fact reference: ' + fact['id'],
                    'url': 'data/coordinate-evidence.json', 'inherited': True,
                    'access': 'read saved fact record only; not fresh primary retrieval',
                    'locator': f'{route["routeId"]} / {fact["id"]}: ' + fact.get('locator', ''),
                    'whatItSupports': fact['claim'] + ' Original source IDs: ' + ', '.join(fact.get('sourceIds', [])),
                    'ledgerHref': href('data/coordinate-evidence.json')}
    # Never silently resolve an ambiguous alias by guessing a source.
    for sid in sorted(needed - sources.keys()):
        sources[sid] = {'id': sid, 'title': sid, 'access': 'unresolved',
                        'locator': 'Unresolved source alias; retain the original point locator in the coverage ledger.',
                        'ledgerHref': href(str(PACKET / 'coverage.json'))}
    sources = {sid: row for sid, row in sources.items() if sid in needed or not row.get('inherited')}
    checked = check['checkedSourceRecords']
    checked_ids = set(checked['livePageOrExhibit'] + checked['freshByteMatchedPdf'] + checked['localModelSeparatelyChecked'])
    review_findings = check['findings'] + check.get('followUpFindings', [])
    for sid, row in sources.items():
        row['originalAccess'] = row.get('access', 'unknown')
        access = row['originalAccess'].lower()
        row['access'] = ('inaccessible' if any(t in access for t in ('inaccessible', 'unread', 'blocked'))
                         else 'partial' if 'partial' in access
                         else 'read' if 'read' in access else 'unresolved')
        row['href'] = href(row['url']) if row.get('url') else row.get('ledgerHref')
        row['sourceCheck'] = 'checked' if sid in checked_ids else 'not independently checked'
        row['checkFindings'] = [f['id'] for f in review_findings + check['upheldChecks'] if sid in f.get('sourceIds', [])]
    by_model = {r['id']: r for r in model['routes']}
    assert set(routes) == set(by_model) == {r['id'] for r in meta['routes']}
    output_routes = []
    for row in meta['routes']:
        rid = row['id']
        research = routes[rid]
        output_routes.append({**research, 'id': rid, 'title': row['title'],
                              'shortLabel': row['shortLabel'], 'countries': row['countries'],
                              'coordination': row['coordination'], 'original': by_model[rid],
                              'sourceIds': sorted(set(references(research))),
                              'findingIds': [f['id'] for f in synthesis['findings'] if rid in f['routeIds']],
                              'pointIds': [p['pointId'] for p in coverage['points'] if rid in p.get('routeIds', [])],
                              'checkFindings': [{**f, 'correction': f.get('correction', f.get('correctionRequired', ''))}
                                                for f in review_findings if rid in f.get('routeIds', [])]})
    scenarios = [{**{k: s[k] for k in ('id', 'regime', 'prior', 'weights')},
                  'routes': [{k: r[k] for k in ('id', 'x', 'y', 'rank', 'non_dominated')} for r in s['routes']]}
                 for s in audit['scenarios']]
    assert len(scenarios) == 15
    result = {'schemaVersion': 1, 'observed': synthesis['observedDate'], 'scoresUpdated': False,
              'recommendation': synthesis['recommendation'], 'summary': synthesis['summary'],
              'routes': output_routes, 'sources': sources, 'scenarios': scenarios,
              'findings': synthesis['findings'], 'viewpoints': synthesis['viewpoints'],
              'ideas': synthesis['ideas'], 'coverage': coverage['points'],
              'baselineComparison': synthesis['baselineComparison'],
              'limitations': synthesis['limitations'], 'method': method,
              'sourceCheck': check, 'auditDefinitions': audit['definitions'],
              'auditLimitations': audit['limitations'], 'errata': errata,
              'appliedErrataIds': applied}
    if errata:
        assert set(applied) == {c['id'] for c in errata['corrections']}, 'Unapplied errata scope'
    downloads = sorted(set(INPUTS) | {str(PACKET / 'reproduce-model-audit.py'),
                                      'reports/Safeguard proposal stress tests.md'})
    result['downloads'] = [{'path': path, 'href': href(path), 'sha256': INPUTS.get(path)} for path in downloads]
    result['inputHashes'] = dict(sorted(INPUTS.items()))
    return result


def apply_errata(document, errata, scope):
    """Apply the reviewed RFC6901 overlay to in-memory shard copies only."""
    applied = []
    for operation in errata['corrections']:
        if operation['scope'] != scope:
            continue
        keys = [k.replace('~1', '/').replace('~0', '~') for k in operation['field'].split('/')[1:]]
        assert keys and keys[0] in ('routes', 'sources'), 'Errata cannot change model inputs'
        owner = document[keys[0]][int(keys[1])]
        if keys[0] == 'routes':
            assert owner['routeId'] == operation['routeId']
            assert operation['sourceId'] in set(references(owner))
        else:
            assert owner['id'] == operation['sourceId']
        target = document
        for key in keys[:-1]:
            target = target[int(key)] if isinstance(target, list) else target[key]
        key = int(keys[-1]) if isinstance(target, list) else keys[-1]
        assert target[key] == operation['original'], f'Errata original mismatch: {operation["id"]}'
        target[key] = copy.deepcopy(operation['corrected'])
        owner.setdefault('appliedErrata', []).append({'id': operation['id'], 'sourceCheckId': operation['sourceCheckId'],
                                                    'field': operation['field']})
        applied.append(operation['id'])
    return applied


if __name__ == '__main__':
    result = build()
    path = ROOT / 'data/stress-tests.json'
    path.write_text(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + '\n')
    print(f'{path.relative_to(ROOT)}: {len(result["routes"])} routes, {len(result["sources"])} sources, 15 scenarios, {len(result["ideas"])} ideas')
