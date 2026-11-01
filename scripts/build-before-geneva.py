#!/usr/bin/env python3
"""Compile authored fiction with the existing public research snapshot. No retrieval."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
research_path = ROOT / 'data/stress-tests.json'
authored_path = ROOT / 'game/dialogue-authored.json'
research = json.loads(research_path.read_text())
authored = json.loads(authored_path.read_text())
assert set(authored) == {r['id'] for r in research['routes']}

def choice(id, label, next=None, action=None, detail=''):
    return {k: v for k, v in dict(id=id, label=label, next=next, action=action, detail=detail).items() if v is not None}

routes = []
for r in research['routes']:
    a = authored[r['id']]
    sources = [{k: s.get(k) for k in ('id', 'title', 'href', 'access', 'locator', 'sourceCheck')}
               for sid in r['sourceIds'] if (s := research['sources'][sid])]
    nodes = {
        'opening': {'text': a['opening'], 'choices': [choice('challenge', 'What could go wrong?', 'challenge'), choice('terms', 'Make a deal', 'terms'), choice('leave', 'Walk away', action='leave')]},
        'challenge': {'text': a['concern'], 'choices': [choice('brief', 'Dig deeper', 'prepared', 'prepare', 'Cheaper fix later.'), choice('provisional', 'Go ahead anyway', 'terms'), choice('leave', 'Walk away', action='leave')]},
        'prepared': {'text': 'Good. Now we know who decides and what is missing.', 'choices': [choice('terms', 'Make a deal', 'terms')]},
        'terms': {'text': a['question'], 'choices': [choice('pilot', a['pilot'], 'receipt', 'commission-pilot', 'Small test. Results next month.'), choice('shared', a['shared'], 'receipt', 'commission-shared', 'Needs one other finished test.'), choice('defer', 'Not yet', 'receipt', 'defer', 'Save your points.')]},
        'report': {'text': a['complication'], 'choices': [choice('retest', 'Fix it and test again', 'receipt', 'resolve', 'Win a finished test.'), choice('pause', 'Admit it and pause', 'receipt', 'pause', 'Come back later.'), choice('leave', 'Walk away', action='leave')]},
        'receipt': {'text': '', 'choices': [choice('close', 'Back to the map', action='leave')]},
        'complete': {'text': 'Test passed. Our lever is ready for Geneva.', 'choices': [choice('leave', 'Back to the map', action='leave')]}
    }
    routes.append({'id': r['id'], 'title': a.get('title', r['shortLabel']), 'researchTitle': r['shortLabel'], 'about': a.get('about', ''), 'lever': a['lever'], 'countries': r['countries'], 'coordination': r['coordination'],
                   'speaker': ' / '.join(r['countries']), 'nodes': nodes,
                   'research': {'headline': r['headline'], 'assessment': r['assessment'], 'nextTest': r['decisionTest'],
                                'unknowns': r['unknowns'], 'evidence': r['newEvidence'], 'sources': sources}})

campaign = {'version': 1, 'id': 'before-geneva-v1', 'title': 'Before Geneva', 'researchObserved': research['observed'],
            'fictionNotice': 'A made-up story built on real research. No real government agreed to these scenes.',
            'inputs': {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in (research_path, authored_path)},
            'months': [
                {'label': 'November 2026', 'short': 'NOV', 'title': 'The job', 'event': 'Eight months to Geneva. Find the levers.'},
                {'label': 'December 2026', 'short': 'DEC', 'title': 'First answers', 'event': 'Every lever needs someone who can pull it.'},
                {'label': 'January 2027', 'short': 'JAN', 'title': 'Who pays?', 'event': 'Small teams fear the cost. Keep it cheap.'},
                {'label': 'February 2027', 'short': 'FEB', 'title': 'Share or go alone?', 'event': 'Partners want to share. Secrets make it hard.'},
                {'label': 'March 2027', 'short': 'MAR', 'title': 'Not done yet', 'event': 'Partners want a headline. Only finished tests count.'},
                {'label': 'April 2027', 'short': 'APR', 'title': 'The disputed result', 'event': 'A result is challenged. Can anyone repeat it?'},
                {'label': 'May 2027', 'short': 'MAY', 'title': 'Last chance', 'event': 'One month left. New tests may not return.'},
                {'label': 'June 2027', 'short': 'JUN', 'title': 'Geneva', 'event': '21 June. Three meetings left. Then the vote.'}
            ], 'routes': routes}
out = ROOT / 'game/campaign.json'
out.write_text(json.dumps(campaign, ensure_ascii=False, indent=2) + '\n')
print(f'{out.relative_to(ROOT)}: {len(routes)} conversations, {sum(len(r["nodes"]) for r in routes)} nodes')
