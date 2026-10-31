#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const packet = 'research_notes/Safeguard proposal stress tests/';
const data = read('data/stress-tests.json');
const model = read('data/route-placement-model.json');
const audit = read(packet+'model-audit.json');
const eps = 1e-10;
const close = (a,b) => assert.ok(Number.isFinite(a) && Math.abs(a-b)<eps, `${a} != ${b}`);
function sourceRefs(value, known) {
  if (Array.isArray(value)) value.forEach(v=>sourceRefs(v,known));
  else if (value && typeof value==='object') for (const [key,v] of Object.entries(value)) {
    if(key==='sourceIds') v.forEach(id=>assert.ok(known.has(id),`Dangling source ${id}`));
    else sourceRefs(v,known);
  }
}
function safeHref(href) {
  assert.equal(typeof href,'string');
  assert.ok(!/[\u0000-\u0020\\]/.test(href),'Unsafe URL characters');
  if (href.startsWith('../')) {
    const decoded=decodeURIComponent(href.slice(3));
    assert.ok(!decoded.startsWith('/') && !decoded.split('/').includes('..'),'Unsafe local path');
    assert.ok(fs.existsSync(path.join(root,decoded)),`Missing linked file ${decoded}`);
  } else {
    const u=new URL(href); assert.ok(['https:','http:'].includes(u.protocol),'Unsafe URL scheme');
    assert.ok(!u.username&&!u.password,'Credentials in source URL');
  }
}
function validate(d) {
  assert.equal(d.schemaVersion,1);assert.equal(d.scoresUpdated,false);
  const routeIds=new Set(d.routes.map(r=>r.id)), sourceIds=new Set(Object.keys(d.sources));
  assert.equal(d.routes.length,32);assert.equal(routeIds.size,32);
  assert.deepEqual([...routeIds].sort(), model.routes.map(r=>r.id).sort());
  for(const r of d.routes) {
    for(const k of ['headline','decisionTest','ledgerHref']) assert.ok(typeof r[k]==='string'&&r[k].length);
    for(const k of ['supports','challenges','newEvidence','unknowns','sourceIds']) assert.ok(Array.isArray(r[k])&&r[k].length,`${r.id}: ${k}`);
    assert.deepEqual(r.original,model.routes.find(m=>m.id===r.id));
    safeHref(r.ledgerHref);
    r.findingIds.forEach(id=>assert.ok(d.findings.some(f=>f.id===id)));
    r.pointIds.forEach(id=>assert.ok(d.coverage.some(p=>p.pointId===id)));
  }
  sourceRefs([d.routes,d.findings,d.ideas,d.coverage,d.viewpoints],sourceIds);
  for(const [id,s] of Object.entries(d.sources)) {
    assert.equal(s.id,id); assert.ok(['read','partial','inaccessible','unresolved'].includes(s.access));
    assert.ok(s.locator); assert.ok(['checked','not independently checked'].includes(s.sourceCheck));
    if(s.href)safeHref(s.href);if(s.ledgerHref)safeHref(s.ledgerHref);
  }
  assert.equal(d.scenarios.length,15);assert.equal(new Set(d.scenarios.map(s=>s.id)).size,15);
  assert.equal(new Set(d.scenarios.map(s=>s.regime)).size,5);
  for(const s of d.scenarios) {
    assert.ok([.25,.5,.75].includes(s.prior));assert.equal(s.routes.length,32);
    assert.deepEqual(s.routes.map(r=>r.id).sort(),[...routeIds].sort());
    assert.deepEqual(s.weights,audit.scenarios.find(a=>a.id===s.id).weights);
    for(const axis of ['x','y'])close(Object.values(s.weights[axis]).reduce((a,b)=>a+b,0),1);
    for(const p of s.routes) {
      assert.deepEqual(Object.keys(p).sort(),['id','non_dominated','rank','x','y']);
      const m=model.routes.find(r=>r.id===p.id);
      for(const axis of ['x','y']) {
        assert.ok(p[axis]>=0&&p[axis]<=1);
        close(p[axis],Object.entries(s.weights[axis]).reduce((sum,[factor,w])=>sum+w*(m.factors[factor]??s.prior),0));
      }
      const utility=(p.x+p.y)/2;
      assert.equal(p.rank,1+s.routes.filter(q=>(q.x+q.y)/2>utility+eps).length);
      const dominated=s.routes.some(q=>q.x>=p.x-eps&&q.y>=p.y-eps&&(q.x>p.x+eps||q.y>p.y+eps));
      assert.equal(p.non_dominated,!dominated);
      const original=audit.scenarios.find(a=>a.id===s.id).routes.find(r=>r.id===p.id);
      for(const key of ['x','y'])close(p[key],original[key]);
    }
  }
  assert.equal(d.ideas.length,8);assert.equal(d.viewpoints.length,5);assert.equal(d.coverage.length,61);
  assert.equal(new Set(d.coverage.map(p=>p.pointId)).size,61);
  for(const i of d.ideas) for(const key of ['owner','instrument','falsifier','nextStep'])assert.ok(i[key]);
  d.downloads.forEach(f=>safeHref(f.href));
}
validate(data);
assert.deepEqual(data.sourceCheck,read(packet+'source-check.json'),'Public view must retain the complete latest source check');
for(const f of data.sourceCheck.followUpFindings || []) {
  for(const id of f.routeIds || [])assert.ok(data.routes.find(r=>r.id===id).checkFindings.some(c=>c.id===f.id));
  for(const id of f.sourceIds || [])assert.ok(data.sources[id].checkFindings.includes(f.id));
}
// Integrity checks concern original bytes, not corrected in-memory copies.
for(const [file,hash] of Object.entries(data.inputHashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,`Stale input: ${file}`);
assert.equal(data.inputHashes['data/route-placement-model.json'],audit.inputs.model_sha256);
assert.equal(data.inputHashes['data/routes-quantitative.json'],audit.inputs.metadata_sha256);
assert.equal(data.inputHashes['data/coordinate-evidence.json'],audit.inputs.evidence_sha256);
if(data.errata) {
  assert.deepEqual([...data.appliedErrataIds].sort(),data.errata.corrections.map(c=>c.id).sort());
  for(const c of data.errata.corrections) {
    const parts=c.field.split('/').slice(1).map(k=>k.replaceAll('~1','/').replaceAll('~0','~'));
    const original=parts.reduce((o,k)=>o[k],read(c.scope));assert.deepEqual(original,c.original);
    const owner=parts[0]==='routes'?data.routes.find(r=>r.id===c.routeId):data.sources[c.sourceId];
    assert.deepEqual(parts.slice(2).reduce((o,k)=>o[k],owner),c.corrected,c.id);
    assert.ok(owner.appliedErrata.some(e=>e.id===c.id&&e.sourceCheckId===c.sourceCheckId));
  }
}
const negatives = [
  d=>d.routes.pop(),
  d=>d.routes[0].sourceIds.push('missing-source'),
  d=>d.routes[0].original.factors.readiness=0,
  d=>d.routes[0].decisionTest='',
  d=>d.sources[Object.keys(d.sources)[0]].href='javascript:alert(1)',
  d=>d.sources[Object.keys(d.sources)[0]].href='../%2e%2e/secret',
  d=>d.sources[Object.keys(d.sources)[0]].access='verified',
  d=>d.scenarios[0].routes[0].x+=.01,
  d=>d.scenarios[0].routes[0].rank+=1,
  d=>d.scenarios[0].routes[0].non_dominated=!d.scenarios[0].routes[0].non_dominated,
  d=>d.scenarios[0].routes[0].probe_array=[],
  d=>d.scenarios[0].prior=.1,
  d=>d.scenarios[0].routes[0].x=NaN,
  d=>d.scoresUpdated=true,
  d=>d.ideas.pop(),
];
negatives.forEach(mutate=>{const d=structuredClone(data);mutate(d);assert.throws(()=>validate(d));});
const bytes=fs.readFileSync(path.join(root,'data/stress-tests.json'));
execFileSync('python3',['scripts/build-stress-test-data.py'],{cwd:root});
assert.deepEqual(fs.readFileSync(path.join(root,'data/stress-tests.json')),bytes,'Builder must be deterministic');
console.log(`PASS: 32 routes, 480 original-factor points, 15 scenarios, 8 ideas, 61 retained points; references, safe links, hashes, errata and deterministic rebuild; ${negatives.length} negative cases.`);
