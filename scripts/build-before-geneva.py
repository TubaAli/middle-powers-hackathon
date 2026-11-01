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
        'opening': {'text': a['opening'], 'choices': [choice('challenge', 'Ask what could go wrong', 'challenge'), choice('terms', 'Discuss the terms', 'terms'), choice('leave', 'Return to the lounge', action='leave')]},
        'challenge': {'text': a['concern'], 'choices': [choice('brief', 'Commission a case-specific brief', 'prepared', 'prepare', 'Spend 1 evidence. Reduce the later retest cost.'), choice('provisional', 'Proceed with provisional evidence', 'terms'), choice('leave', 'Think it over in the lounge', action='leave')]},
        'prepared': {'text': 'Then put the owner, the exact version and the missing evidence on one page. It will not settle the negotiation, but it will make our next test more useful.', 'choices': [choice('terms', 'Return to the proposal', 'terms')]},
        'terms': {'text': a['question'], 'choices': [choice('pilot', a['pilot'], 'receipt', 'commission-pilot', 'Spend 2 budget. A bounded rehearsal returns next month.'), choice('shared', a['shared'], 'receipt', 'commission-shared', 'Spend 1 budget and 2 mandate. Completion needs another tested route.'), choice('defer', 'Record the limits and defer', 'receipt', 'defer', 'Use this meeting; keep resources for a different route.')]},
        'report': {'text': a['complication'], 'choices': [choice('retest', 'Repair the terms and run a fresh test', 'receipt', 'resolve', 'Spend 1 budget and 1–2 evidence. Shared work also needs one other tested route.'), choice('pause', 'Publish the limitation and pause', 'receipt', 'pause', 'Use this meeting. Preserve the work for a later month.'), choice('leave', 'Consult another delegation first', action='leave')]},
        'receipt': {'text': '', 'choices': [choice('close', 'Return to the lounge', action='leave')]},
        'complete': {'text': 'Our fictional rehearsal and correction record are ready for the negotiating table. Keep their limited scope in the final text; a successful exercise is not proof of real-world impact.', 'choices': [choice('leave', 'Return to the lounge', action='leave')]}
    }
    routes.append({'id': r['id'], 'title': r['shortLabel'], 'countries': r['countries'], 'coordination': r['coordination'],
                   'speaker': ' / '.join(r['countries']) + ' · fictional delegate', 'nodes': nodes,
                   'research': {'headline': r['headline'], 'assessment': r['assessment'], 'nextTest': r['decisionTest'],
                                'unknowns': r['unknowns'], 'evidence': r['newEvidence'], 'sources': sources}})

campaign = {'version': 1, 'id': 'before-geneva-v1', 'title': 'Before Geneva', 'researchObserved': research['observed'],
            'fictionNotice': 'All dialogue, negotiations, resources, decisions and outcomes are fictional. Linked research describes real proposals and evidence; no government has endorsed these scenes.',
            'inputs': {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in (research_path, authored_path)},
            'months': [
                {'label': 'November 2026', 'short': 'NOV', 'title': 'A seat at the table', 'event': 'Thirty-two proposals are waiting. You have three meetings this month. Choose where a first test could teach you the most.'},
                {'label': 'December 2026', 'short': 'DEC', 'title': 'The terms behind the promise', 'event': 'The first replies arrive. Every promising principle needs an owner, an instrument and a decision it can actually change.'},
                {'label': 'January 2027', 'short': 'JAN', 'title': 'Who carries the cost?', 'event': 'Smaller teams ask whether your evidence requirements will price them out. There is time to revise the approach before anyone signs.'},
                {'label': 'February 2027', 'short': 'FEB', 'title': 'Access has a price', 'event': 'Delegations want to reuse each other’s work. Confidentiality and separate acceptance decisions make that harder than sharing a score.'},
                {'label': 'March 2027', 'short': 'MAR', 'title': 'A rehearsal is not a release', 'event': 'Your partners want a progress announcement. Distinguish a commissioned exercise from a repaired and retested safeguard.'},
                {'label': 'April 2027', 'short': 'APR', 'title': 'The missing appendix', 'event': 'A disputed result exposes the difference between a report and reproducible evidence. Follow-up meetings can turn a flaw into a stronger agreement.'},
                {'label': 'May 2027', 'short': 'MAY', 'title': 'What survives the deadline?', 'event': 'One month remains before Geneva. New projects may not return in time. Decide which unfinished promises deserve your last follow-up meetings.'},
                {'label': 'June 2027', 'short': 'JUN', 'title': 'One clause left', 'event': 'Geneva, 21 June. Use your final three meetings, then choose what the joint text can honestly claim.'}
            ], 'routes': routes}
out = ROOT / 'game/campaign.json'
out.write_text(json.dumps(campaign, ensure_ascii=False, indent=2) + '\n')
print(f'{out.relative_to(ROOT)}: {len(routes)} conversations, {sum(len(r["nodes"]) for r in routes)} nodes')
