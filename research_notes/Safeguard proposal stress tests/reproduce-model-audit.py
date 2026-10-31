#!/usr/bin/env python3
"""Offline standard-library audit; writes only sibling model-audit.json.

Run from any directory. Baseline inputs are read-only. No random sampling.
"""
import hashlib
import itertools
import json
import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
MODEL = ROOT / 'data/route-placement-model.json'
META = ROOT / 'data/routes-quantitative.json'
EPS = 1e-10
REGIMES = {
    'baseline': ([.4,.3,.3], [.4,.3,.3]),
    'implementation-delivery': ([.35,.45,.2], [.25,.25,.5]),
    'frontier-risk-proxy': ([.4,.3,.3], [.25,.6,.15]),
    'rights-accountability-proxy': ([.5,.2,.3], [.2,.25,.55]),
    'international-scale-proxy': ([.25,.2,.55], [.7,.2,.1]),
}
X = ['readiness','timing','coordination']
Y = ['reach','relevance','remedy']
KEYS = X + Y

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def rank(values, key='utility'):
    return {r['id']: 1 + sum(s[key] > r[key] + EPS for s in values) for r in values}

def dominates(a,b):
    return (a['x'] >= b['x']-EPS and a['y'] >= b['y']-EPS
            and (a['x'] > b['x']+EPS or a['y'] > b['y']+EPS))

def decorate(rows):
    ranks = rank(rows)
    for r in rows:
        r['rank'] = ranks[r['id']]
        r['dominated_by'] = [s['id'] for s in rows if dominates(s,r)]
        r['non_dominated'] = not r['dominated_by']
    return rows

def coordinates(f, wx, wy):
    return sum(f[k]*w for k,w in zip(X,wx)), sum(f[k]*w for k,w in zip(Y,wy))

def score(route, prior, wx, wy, delta=None, alpha=.5):
    f = {k: prior if route['factors'][k] is None else route['factors'][k] for k in KEYS}
    if delta:
        for k,d in delta.items():
            f[k] = min(1,max(0,f[k]+d))
    x,y = coordinates(f,wx,wy)
    return {'id':route['id'], 'x':x, 'y':y, 'utility':alpha*x+(1-alpha)*y}

def reversals(base, rows):
    out=[]
    for i,j in itertools.combinations(base,2):
        d0=base[i]['utility']-base[j]['utility']
        d1=rows[i]['utility']-rows[j]['utility']
        if d0*d1 < -EPS:
            out.append([i,j])
    return out

def correlation(a,b):
    ma=sum(a)/len(a); mb=sum(b)/len(b)
    den=math.sqrt(sum((v-ma)**2 for v in a)*sum((v-mb)**2 for v in b))
    return sum((x-ma)*(y-mb) for x,y in zip(a,b))/den if den else None

def main():
    model=json.loads(MODEL.read_text())
    meta={r['id']:r for r in json.loads(META.read_text())['routes']}
    routes=model['routes']
    assert len(routes)==32 and set(meta)=={r['id'] for r in routes}
    assert model['prior']==.5 and model['sensitivity']=={'assessed':.15,'imputed':.3}
    assert list(model['axes']['x']['weights'].values())==REGIMES['baseline'][0]
    assert list(model['axes']['y']['weights'].values())==REGIMES['baseline'][1]
    original_hash=sha(MODEL)
    baseline=decorate([score(r,.5,*REGIMES['baseline']) for r in routes])
    base={r['id']:r for r in baseline}
    missing={r['id']:[k for k in KEYS if r['factors'][k] is None] for r in routes}
    scenarios=[]
    for name,(wx,wy) in REGIMES.items():
        assert abs(sum(wx)-1)<EPS and abs(sum(wy)-1)<EPS
        for prior in [.25,.5,.75]:
            rows=decorate([score(r,prior,wx,wy) for r in routes])
            current={r['id']:r for r in rows}
            bounds={}
            for r in routes:
                delta={k:model['sensitivity']['imputed' if r['factors'][k] is None else 'assessed'] for k in KEYS}
                bounds[r['id']]={
                    'lower':score(r,prior,wx,wy,{k:-d for k,d in delta.items()}),
                    'upper':score(r,prior,wx,wy,delta),
                }
            # Exact attainable rank extrema under independently variable route boxes:
            # target at upper and all others at lower (best), conversely worst.
            for row in rows:
                rid=row['id']; lo=bounds[rid]['lower']; hi=bounds[rid]['upper']
                row['missing_factors']=missing[rid]
                row['coordination_category']=meta[rid]['coordination']
                row['delta_utility_vs_baseline']=row['utility']-base[rid]['utility']
                row['rank_change_vs_baseline']=row['rank']-base[rid]['rank']
                row['box']={
                    'lower':{k:lo[k] for k in ['x','y','utility']},
                    'upper':{k:hi[k] for k in ['x','y','utility']},
                    'best_attainable_rank':1+sum(b['lower']['utility']>hi['utility']+EPS for s,b in bounds.items() if s!=rid),
                    'worst_attainable_rank':1+sum(b['upper']['utility']>lo['utility']+EPS for s,b in bounds.items() if s!=rid),
                    'necessarily_dominated_by':[s for s,b in bounds.items() if s!=rid and dominates(b['lower'],hi)],
                    'possibly_dominated_by':[s for s,b in bounds.items() if s!=rid and dominates(b['upper'],lo)],
                }
            # Every one of the 192 inputs separately, both signed documented endpoints.
            oat=[]
            for route in routes:
                rid=route['id']
                for k in KEYS:
                    d=model['sensitivity']['imputed' if route['factors'][k] is None else 'assessed']
                    for sign in [-1,1]:
                        changed=score(route,prior,wx,wy,{k:sign*d})
                        others=[r for r in rows if r['id']!=rid]
                        changed['rank']=1+sum(r['utility']>changed['utility']+EPS for r in others)
                        changed['non_dominated']=not any(dominates(r,changed) for r in others)
                        crossed=[s['id'] for s in others if (current[rid]['utility']-s['utility'])*(changed['utility']-s['utility']) < -EPS]
                        oat.append({'route_id':rid,'factor':k,'delta':sign*d,
                                    'x':changed['x'],'y':changed['y'],'utility':changed['utility'],
                                    'rank':changed['rank'],'non_dominated':changed['non_dominated'],
                                    'strict_rank_reversals_against':crossed})
            for row in rows:
                rr=[r for r in oat if r['route_id']==row['id']]
                row['own_oat_rank_min']=min([row['rank']]+[r['rank'] for r in rr])
                row['own_oat_rank_max']=max([row['rank']]+[r['rank'] for r in rr])
                row['own_oat_loses_pareto_status']=row['non_dominated'] and any(not r['non_dominated'] for r in rr)
            alpha_sweep=[]
            for alpha in [.25,.5,.75]:
                values=decorate([score(r,prior,wx,wy,alpha=alpha) for r in routes])
                alpha_sweep.append({'alpha':alpha,'routes':values,'strict_reversals_vs_baseline':reversals(base,{r['id']:r for r in values})})
            scenarios.append({'id':name+'-prior-'+str(prior),'regime':name,'prior':prior,
                              'weights':{'x':dict(zip(X,wx)),'y':dict(zip(Y,wy))},
                              'routes':rows,'non_dominated':[r['id'] for r in rows if r['non_dominated']],
                              'strict_rank_reversals_vs_baseline':reversals(base,current),
                              'one_at_a_time':oat,'alpha_sweep':alpha_sweep})
    # Removal/renormalisation probes ask whether overlapping maturity signals matter.
    ablations=[]
    for label,wx,wy in [
        ('remove-remedy-y-renormalise',[.4,.3,.3],[4/7,3/7,0]),
        ('remove-readiness-x-renormalise',[0,.5,.5],[.4,.3,.3]),
        ('remove-coordination-x-renormalise',[4/7,3/7,0],[.4,.3,.3]),
    ]:
        vals=decorate([score(r,.5,wx,wy) for r in routes])
        ablations.append({'id':label,'weights':{'x':dict(zip(X,wx)),'y':dict(zip(Y,wy))},'routes':vals,
                          'strict_rank_reversals_vs_baseline':reversals(base,{r['id']:r for r in vals})})
    observed=[r for r in routes if r['factors']['readiness'] is not None and r['factors']['remedy'] is not None]
    duplicate=[r['id'] for r in observed if r['factors']['readiness']==r['factors']['remedy']]
    comparisons=[]
    for left,right in [
        ('jp-procurement-safety-evidence','indiaai-subsidy-evaluation-gate'),
        ('jp-procurement-safety-evidence','jp-kr-sg-procurement-profile'),
        ('indiaai-subsidy-evaluation-gate','eurohpc-incident-protocol'),
    ]:
        dx=base[left]['x']-base[right]['x']; dy=base[left]['y']-base[right]['y']
        lf=next(r['factors'] for r in routes if r['id']==left)
        rf=next(r['factors'] for r in routes if r['id']==right)
        contribution={k: w*((lf[k] if lf[k] is not None else .5)-(rf[k] if rf[k] is not None else .5)) for ks,ws in [(X,REGIMES['baseline'][0]),(Y,REGIMES['baseline'][1])] for k,w in zip(ks,ws)}
        comparisons.append({'left':left,'right':right,'delta_x':dx,'delta_y':dy,'axis_factor_contributions_left_minus_right':contribution,'utility_alpha_tie':-dy/(dx-dy) if abs(dx-dy)>EPS else None})
    groups={g:[r for r in baseline if meta[r['id']]['coordination']==g] for g in sorted({r['coordination'] for r in meta.values()})}
    summary={
        'baseline_winners':[r['id'] for r in baseline if r['rank']==1],
        'baseline_non_dominated':[r['id'] for r in baseline if r['non_dominated']],
        'baseline_india':base['indiaai-subsidy-evaluation-gate'],
        'baseline_japan':base['jp-procurement-safety-evidence'],
        'scenario_winners':{s['id']:[r['id'] for r in s['routes'] if r['rank']==1] for s in scenarios},
        'groups':{g:{'count':len(rs),'mean_x':sum(r['x'] for r in rs)/len(rs),'mean_y':sum(r['y'] for r in rs)/len(rs),'mean_utility':sum(r['utility'] for r in rs)/len(rs),'ids':[r['id'] for r in rs]} for g,rs in groups.items()},
        'robust_dominance_pairs_across_baseline_boxes':sum(len(r['box']['necessarily_dominated_by']) for s in scenarios if s['id']=='baseline-prior-0.5' for r in s['routes']),
    }
    out={
        'observed':'2026-10-31','method':'Deterministic bounded sensitivity of editorial scores; not empirical forecast or stakeholder elicitation.',
        'inputs':{'model':str(MODEL.relative_to(ROOT)),'model_sha256':original_hash,'metadata_sha256':sha(META),'evidence_sha256':sha(ROOT/model['evidencePath']),'placement_sha256':sha(ROOT/'routes/placement.mjs')},
        'definitions':{
            'utility':'U_alpha = alpha*x + (1-alpha)*y; default alpha=0.5. Additive audit preference only, absent from production chart. Neither probability, expected risk reduction nor coalition value.',
            'rank':'Competition rank: 1 + count of strictly greater utility (tolerance 1e-10). Ties share rank; IDs do not break ties.',
            'dominance':'a dominates b iff a.x>=b.x and a.y>=b.y and at least one strictly greater, tolerance 1e-10; higher is preferred on both axes.',
            'reversals':'Strict pair order inversion only; resolving or creating ties is excluded.',
            'box':'Each assessed factor independently moves +/-0.15 and each null-imputed factor +/-0.30 around scenario prior; clip [0,1]. Exact monotone coordinate bounds, no distribution, no confidence or probability meaning. Simultaneous rank extremes need not occur together.',
            'oat':'One route/factor at a time moves by its signed sensitivity endpoint; all other inputs fixed. 384 probes per regime/prior. Report changed-route numbers and all strict crossings.',
            'regimes':'All axes normalised to 1. These are transparent analyst stress preferences, not elicited stakeholder weights. Proxy labels cannot add unmeasured frontier specificity, rights or international spillovers.',
            'alpha_sweep':'For every regime/prior also evaluate feasibility weights alpha=.25,.5,.75. Pareto set is independent of alpha.',
        },
        'missingness':{'total':sum(map(len,missing.values())),'routes_affected':sum(bool(v) for v in missing.values()),'per_route':missing,'per_factor':{k:sum(k in v for v in missing.values()) for k in KEYS}},
        'structure':{'readiness_remedy_complete_pairs':len(observed),'exact_duplicate_ids':duplicate,'exact_duplicate_count':len(duplicate),'readiness_remedy_pearson_complete_pairs':correlation([r['factors']['readiness'] for r in observed],[r['factors']['remedy'] for r in observed]),'distinct_assessed_levels':{k:sorted({r['factors'][k] for r in routes if r['factors'][k] is not None}) for k in KEYS},'all_observed_values_on_005_grid':all(abs(v*20-round(v*20))<EPS for r in routes for v in r['factors'].values() if v is not None)},
        'baseline':baseline,'scenarios':scenarios,'ablations':ablations,'pair_comparisons':comparisons,'summary':summary,
        'limitations':[
            'Judgment scores on ordinal-like 0.05 grids are treated as cardinal by weighted sums; the arithmetic does not validate that assumption.',
            'Readiness and remedy are distinct definitions with potentially shared evidence, not literal copies across all routes. Correlation is descriptive, not proof of causal double counting.',
            'No international spillover, substitution, additionality, cost, rights-distribution or frontier-specific-effect factor exists; changing weights cannot recover one.',
            'Programme scale, operational pilot scope and full-capacity aspiration are not a common denominator; near-term x can describe a drill while y describes later broad deployment.',
            'Sample selection and route categories are not matched treatment/control groups. Group means do not estimate a causal coalition effect.',
            'Missing not at random is plausible. Neutral prior .5 can reward unknown scope/remedy and penalise unobserved strength; varying one common prior is not a missingness model.',
            'Boxes allow independent extremes and are deliberately adversarial, not likely joint states. OAT omits interaction; neither assigns likelihood to rankings.',
            'No new country-level empirical claims are verified by this numerical audit; the saved evidence report is the substantive source audit.',
        ],
    }
    assert out['inputs']['evidence_sha256']==model['evidenceSha256']
    assert sha(MODEL)==original_hash
    (HERE/'model-audit.json').write_text(json.dumps(out,indent=2,allow_nan=False)+'\n')
    print(json.dumps({'summary':summary,'missingness':out['missingness'],'structure':out['structure']},indent=2))

if __name__=='__main__':
    main()
