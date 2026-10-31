import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {placement,validatePlacement,arrangePoints} from './placement.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const data=read('../data/routes-quantitative.json'), model=read('../data/route-placement-model.json');

test('every published route has a valid placement and a retrieved evidence record',()=>{
  validatePlacement(model,data.routes);
  const evidence=read('../data/coordinate-evidence.json');
  assert.equal(createHash('sha256').update(readFileSync(new URL('../data/coordinate-evidence.json',import.meta.url))).digest('hex'),model.evidenceSha256);
  for(const r of data.routes) {
    assert(evidence.routes.some(e=>e.routeId===r.id));
    const p=placement(r,model);
    for(const a of [p.x,p.y]) assert(a.lower>=0 && a.lower<=a.value && a.value<=a.upper && a.upper<=1);
  }
});
test('missing factors use neutral prior and wider sensitivity, not zero or approval',()=>{
  const m=structuredClone(model), r=data.routes[0];
  m.routes.find(x=>x.id===r.id).factors=Object.fromEntries(Object.keys(m.factors).map(k=>[k,null]));
  const p=placement(r,m);
  assert.equal(p.x.value,.5);assert.equal(p.y.value,.5);assert.equal(p.imputed.length,6);
  assert(Math.abs(p.x.lower-.2)<1e-9);assert(Math.abs(p.x.upper-.8)<1e-9);
  m.routes.find(x=>x.id===r.id).factors.readiness=1;
  assert(Math.abs(placement(r,m).x.value-.7)<1e-9);
});
test('invalid, duplicate and missing inputs fail rather than silently inventing placements',()=>{
  const bad=structuredClone(model);bad.routes[0].factors.reach=2;
  assert.throws(()=>validatePlacement(bad,data.routes),/Invalid factor/);
  const missing=structuredClone(model);delete missing.routes[0].factors.reach;
  assert.throws(()=>validatePlacement(missing,data.routes),/Invalid factor/);
  assert.throws(()=>validatePlacement({...model,routes:model.routes.slice(1)},data.routes),/coverage mismatch/);
});
test('display noise is deterministic, order-independent, collision-free and leaves scores untouched',()=>{
  const points=data.routes.map(r=>{const p=placement(r,model);return {id:r.id,x:94+600*p.x.value,y:440-380*p.y.value};});
  const before=JSON.stringify(points),a=arrangePoints(points),b=arrangePoints([...points].reverse());
  assert.deepEqual(a,b);assert.equal(JSON.stringify(points),before);
  for(const p of a.values()) {
    assert(p.px>=107 && p.px<=681 && p.py>=73 && p.py<=427);
    assert(Math.hypot(p.px-p.x,p.py-p.y)<60,'display displacement should stay local');
    for(const q of a.values()) if(p.id!==q.id) assert(Math.hypot(p.px-q.px,p.py-q.py)>=23-1e-8);
  }
});
