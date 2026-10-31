import test from 'node:test';
import assert from 'node:assert/strict';
import {agreementMetric, coverageMetric} from './metrics.mjs';

const path = (states, handoffs = states.length - 1, complete = true) => ({
  actors:states.map((consent,i) => ({id:`a${i}`, consent})), handoffsLowerBound:handoffs, complete
});

test('unknown cooperation is bounded, never an observed midpoint', () => {
  const r = agreementMetric(path(['unknown','unknown','unknown']));
  assert.equal(r.lower,0); assert.equal(r.upper,1/3); assert.equal(r.scenario,null);
  assert.ok(Math.abs(agreementMetric(path(['unknown','unknown','unknown']),.6).scenario-.2)<1e-12);
});
test('a required veto cannot be averaged away', () => {
  const r = agreementMetric(path(['approved','approved','opposed']),1);
  assert.equal(r.lower,0); assert.equal(r.upper,0); assert.equal(r.scenario,0);
});
test('more unresolved handoffs reduce the index; complete approvals reach one', () => {
  assert.ok(agreementMetric(path(['unknown','unknown'],1),.5).scenario > agreementMetric(path(['unknown','unknown'],4),.5).scenario);
  assert.equal(agreementMetric(path(['approved','approved','approved'])).lower,1);
});
test('an incomplete path has no guaranteed lower bound', () => {
  const r = agreementMetric(path(['approved','unknown'],1,false),.7);
  assert.equal(r.lower,0); assert.equal(r.upper,.5); assert.equal(r.conditionalScenario,true);
  assert.equal(agreementMetric({actors:[],handoffsLowerBound:0}),null);
});
test('policy alignment is not exact approval; inputs outside the scale are rejected', () => {
  const p=path(['unknown']); p.actors[0].alignment='support';
  assert.equal(agreementMetric(p).approved,0);
  assert.throws(()=>agreementMetric(p,1.1));
  assert.throws(()=>agreementMetric(path(['unknown','unknown'].map(()=> 'bad'))));
});
test('coverage is calculated from a matched subset, independent of legacy scores', () => {
  const c={basisId:'pool',basisLabel:'Pool',numerator:7.4,denominator:100,unit:'quota percentage points',period:'2026',stage:'potential',interpretation:'Conditional allocation envelope'};
  assert.ok(Math.abs(coverageMetric(c).value-.074)<1e-12);
  assert.equal(coverageMetric(null),null);
  assert.throws(()=>coverageMetric({...c,denominator:0}));
  assert.throws(()=>coverageMetric({...c,numerator:101}));
});
