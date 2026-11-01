#!/usr/bin/env python3
"""Compile authored fiction with the existing public research snapshot. No retrieval."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
research_path = ROOT / 'data/stress-tests.json'
authored_path = ROOT / 'game/dialogue-authored.json'
learning_path = ROOT / 'game/learning-notes.json'
research = json.loads(research_path.read_text())
authored = json.loads(authored_path.read_text())
learning = json.loads(learning_path.read_text())
assert set(authored) == {r['id'] for r in research['routes']}
assert set(learning) == set(authored)

def choice(id, label, next=None, action=None, detail=''):
    return {k: v for k, v in dict(id=id, label=label, next=next, action=action, detail=detail).items() if v is not None}

routes = []
for r in research['routes']:
    a = authored[r['id']]
    lesson = learning[r['id']]
    assert all(lesson.get(k) for k in ('lesson', 'repair', 'check', 'pilotDetail', 'sharedDetail')), r['id']
    assert len(lesson['check']['answers']) == 2 and lesson['check']['correctIndex'] in (0, 1), r['id']
    sources = [{k: s.get(k) for k in ('id', 'title', 'href', 'access', 'locator', 'sourceCheck')}
               for sid in r['sourceIds'] if (s := research['sources'][sid])]
    nodes = {
        'opening': {'text': a['opening'], 'choices': [choice('challenge', 'Ask what could go wrong', 'challenge'), choice('terms', 'Talk about the deal', 'terms'), choice('leave', 'Go back to the lounge', action='leave')]},
        'challenge': {'text': a['concern'], 'choices': [choice('brief', 'Ask your team to research this case', 'prepared', 'prepare', 'Costs 1 proof. Makes the re-check cheaper later.'), choice('provisional', 'Go ahead with what you know', 'terms'), choice('leave', 'Think about it in the lounge', action='leave')]},
        'prepared': {'text': 'Good. Put three things on one page: who is in charge, which exact version we are testing, and what proof is still missing. It will not end the talks, but it will make our next test better.', 'choices': [choice('terms', 'Back to the deal', 'terms')]},
        'terms': {'text': a['question'], 'choices': [choice('pilot', a['pilot'], 'receipt', 'commission-pilot', 'Costs 2 money. A small test run. Results come back next month.'), choice('shared', a['shared'], 'receipt', 'commission-shared', 'Costs 1 money and 2 support. To finish it, you also need one other finished test.'), choice('defer', 'Write down what is unclear and wait', 'receipt', 'defer', 'Uses this meeting. Saves your points for another country.')]},
        'report': {'text': a['complication'], 'choices': [choice('retest', 'Fix the problem and test again', 'receipt', 'resolve', 'Costs 1 money and 1–2 proof. A shared deal also needs one other finished test.'), choice('pause', 'Tell everyone about the problem and pause', 'receipt', 'pause', 'Uses this meeting. You can come back to it later.'), choice('leave', 'Talk to another country first', action='leave')]},
        'receipt': {'text': '', 'choices': [choice('close', 'Back to the lounge', action='leave')]},
        'complete': {'text': 'Our pretend test and the fix are ready to bring to the big meeting. Be honest that it was a small test. Passing a practice does not prove it works in real life.', 'choices': [choice('leave', 'Back to the lounge', action='leave')]}
    }
    routes.append({'id': r['id'], 'title': a.get('title', r['shortLabel']), 'researchTitle': r['shortLabel'], 'about': a.get('about', ''), 'countries': r['countries'], 'coordination': r['coordination'],
                   'speaker': ' / '.join(r['countries']) + ' · pretend delegate', 'nodes': nodes,
                   'lesson': lesson['lesson'], 'repair': lesson['repair'], 'check': lesson['check'],
                   'researchContext': lesson.get('researchContext', ''),
                   'plans': {'pilot': lesson['pilotDetail'], 'shared': lesson['sharedDetail']},
                   'research': {'headline': r['headline'], 'assessment': r['assessment'], 'nextTest': r['decisionTest'],
                                'unknowns': r['unknowns'], 'evidence': r['newEvidence'], 'sources': sources}})

campaign = {'version': 1, 'id': 'before-geneva-v1', 'title': 'Before Geneva', 'researchObserved': research['observed'],
            'fictionNotice': 'This is a made-up story. The people, talks, points and endings are all pretend. The research links describe real ideas, but no real government agreed to these scenes.',
            'inputs': {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in (research_path, authored_path, learning_path)},
            'months': [
                {'label': 'November 2026', 'short': 'NOV', 'title': 'A seat at the table', 'event': '32 countries and groups have ideas to make AI safer. You can have three meetings this month. Pick where a first test could teach you the most.'},
                {'label': 'December 2026', 'short': 'DEC', 'title': 'Who will actually do it?', 'event': 'The first answers arrive. A good idea needs a person in charge, a written rule, and a real decision it can change.'},
                {'label': 'January 2027', 'short': 'JAN', 'title': 'Who pays for it?', 'event': 'Small teams worry your safety checks will cost too much for them. There is still time to change the plan before anyone signs.'},
                {'label': 'February 2027', 'short': 'FEB', 'title': 'Sharing is harder than it looks', 'event': 'Countries want to reuse each other’s tests. But secrets, and each country making its own choice, make that harder than sharing one score.'},
                {'label': 'March 2027', 'short': 'MAR', 'title': 'A practice is not the real thing', 'event': 'Your partners want to announce good news. Be clear about the difference between a practice that was started and a safety fix that was tested again.'},
                {'label': 'April 2027', 'short': 'APR', 'title': 'The missing page', 'event': 'People argue about one result. It shows that a report is not proof unless someone else can repeat it. Follow-up meetings can turn a mistake into a stronger deal.'},
                {'label': 'May 2027', 'short': 'MAY', 'title': 'What can still be finished?', 'event': 'One month until Geneva. New tests may not come back in time. Choose which unfinished work gets your last meetings.'},
                {'label': 'June 2027', 'short': 'JUN', 'title': 'The final meeting', 'event': 'Geneva, 21 June. Use your last three meetings. Then choose what the final agreement can honestly say.'}
            ], 'routes': routes}
out = ROOT / 'game/campaign.json'
out.write_text(json.dumps(campaign, ensure_ascii=False, indent=2) + '\n')
print(f'{out.relative_to(ROOT)}: {len(routes)} conversations, {sum(len(r["nodes"]) for r in routes)} nodes')
