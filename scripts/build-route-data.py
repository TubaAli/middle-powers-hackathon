#!/usr/bin/env python3
"""Build the dated public snapshot from reviewed research cards; no network calls."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORDER = ['eurohpc', 'procurement', 'evaluation', 'finance-compute']


def build():
    routes = []
    for name in ORDER:
        path = ROOT / 'data' / 'route-research' / f'{name}.json'
        if not path.exists():
            raise SystemExit(f'Missing reviewed route shard: {path}')
        routes.extend(json.loads(path.read_text())['routes'])
    euro = next(r for r in routes if r['id'] == 'eurohpc-incident-protocol')
    snapshot = {
        'schemaVersion': 1,
        'observed': '2026-10-31',
        'method': 'Curated research leads. Ordinal impact and feasibility are editorial judgments, not calibrated probabilities or measured risk reductions. Ranges express plausible disagreement. Evidence confidence concerns the mechanism, not predicted success. Coordination adds no automatic bonus.',
        'routes': routes,
        'replay': {
            'routeId': euro['id'],
            'explanation': 'Reviewing I.14.6 and II.18 identified an explicit draft security-notification duty, mitigation obligations and a remedy procedure. The illustrative feasibility assessment rises because the contractual starting point is clearer. Potential impact remains unchanged: no additional safety outcome has been observed.',
            'caveat': 'Reconstruction of the source-review sequence for demonstration. The earlier coordinates were not a contemporaneously recorded forecast. This does not imply a new law, signed contract, live search or proven safety improvement.',
            'before': {
                'status': 'Proposed', 'confidence': 'Low', 'feasibility': 2,
                'feasibilityRange': [1, 4], 'impact': euro['impact'],
                'impactRange': euro['impactRange'],
                'instrument': 'Initial procurement lead before direct review of the revised model contract. Obligation and remedy not yet established in the review.',
                'evidenceSummary': 'Reconstructed initial lead: financing and procurement context suggested a potential route, but the notification duty and remedy had not yet been located in the review. Linked primary sources below are the subsequently reviewed evidence.',
                'feasibilityRationale': 'Reconstructed editorial judgment: procurement creates a possible negotiating channel, but the controlling obligation and remedy were not yet checked. This is not a recorded historical forecast.',
                'remedy': 'Unknown at this review stage; no remedy inferred solely from public funding.'
            }
        }
    }
    target = ROOT / 'data' / 'routes.json'
    target.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n')
    print(f'Built {target.relative_to(ROOT)}: {len(routes)} curated routes')


if __name__ == '__main__':
    build()
