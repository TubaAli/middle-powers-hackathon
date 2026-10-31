#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve, dirname} from 'node:path';
import {execFileSync} from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const shardNames = ['africa','asia-pacific','europe','finance','latin-america','south-asia-gulf','southeast-asia'];
const statuses = new Set(['found_partial','not_found_after_search','future_unobserved','inaccessible','not_publicly_disclosed']);
const string = v => assert.equal(typeof v, 'string');
const unique = xs => assert.equal(new Set(xs).size, xs.length, 'duplicate ID');
function safeURL(value) {
  string(value); const u = new URL(value);
  assert.ok(['https:','http:'].includes(u.protocol) && u.hostname && !u.username && !u.password, 'unsafe source URL');
}
function value(v) {
  if (v === null) return;
  if (typeof v === 'number') {assert.ok(Number.isFinite(v), 'nonfinite value'); return;}
  if (typeof v === 'string') return; // Keep decimal strings and dates exact; never silently coerce.
  assert.equal(typeof v, 'object', 'unsupported value type');
  for (const item of Object.values(v)) value(item);
}
function links(record, sources, searches) {
  if (!record || typeof record !== 'object') return;
  if ('sourceIds' in record) {
    assert.ok(Array.isArray(record.sourceIds));
    record.sourceIds.forEach(id => assert.ok(sources.has(id), `unknown source ${id}`));
  }
  if ('searchIds' in record) {
    assert.ok(Array.isArray(record.searchIds));
    record.searchIds.forEach(id => assert.ok(searches.has(id), `unknown search ${id}`));
  }
  Object.values(record).forEach(v => {if (v && typeof v === 'object') links(v,sources,searches);});
}
function scope(s, allowLocal = false) {
  unique(s.sources.map(x=>x.id)); unique(s.searches.map(x=>x.id));
  s.sources.forEach(x=>{string(x.id);if(allowLocal && x.id==='method-src-local' && x.url==='../../DESIGN.md') assert.ok(existsSync(resolve(root,'DESIGN.md')));else safeURL(x.url);for(const k of ['title','access','locator','observed']) string(x[k]);});
  s.searches.forEach(x=>{for(const k of ['id','queryOrUrl','outcome']) string(x[k]);});
  const sources = new Set(s.sources.map(x=>x.id)), searches = new Set(s.searches.map(x=>x.id));
  links(s,sources,searches);
  return {sources, searches};
}
function localPath(p) {
  string(p); assert.ok(!p.startsWith('/') && !p.includes('..') && !p.includes('\\') && !p.includes(':'), 'unsafe local path');
}
export function validate(data) {
  assert.equal(data.schemaVersion,1); assert.equal(data.coordinateEstimatesAssigned,false);
  assert.equal(data.routes.length,32); unique(data.routes.map(r=>r.routeId));
  assert.deepEqual(Object.keys(data.scopes).sort(), [...shardNames].sort());
  const scopes = Object.fromEntries(Object.entries(data.scopes).map(([id,s])=>[id,scope(s)]));
  const facts = [];
  for(const r of data.routes) {
    string(r.title); string(r.shortLabel); assert.ok(r.countries.length); r.countries.forEach(string);
    assert.ok(scopes[r.scopeId], 'unknown regional scope');
    const s = scopes[r.scopeId]; links(r,s.sources,s.searches);
    unique(r.facts.map(f=>f.id));
    for(const f of r.facts) {
      assert.ok(['x','y','context'].includes(f.axis));
      for(const k of ['id','input','claim','unit','population','period','evidenceType','locator','coordinateUse','limits']) string(f[k]);
      assert.ok(Object.hasOwn(f,'value')); value(f.value); assert.ok(f.sourceIds.length);
    }
    r.gaps.forEach(g=>{assert.ok(statuses.has(g.status)); for(const k of ['field','reason','nextRetrieval']) string(g[k]);assert.ok(Array.isArray(g.searchIds));});
    string(r.coordinateReadiness.x); string(r.coordinateReadiness.y);
    facts.push(...r.facts);
  }
  scope(data.method,true); data.method.datasets.forEach(d=>safeURL(d.url));
  assert.equal(data.method.coordinateEstimatesAssigned,false);
  const c=data.counts;
  assert.equal(c.routes,data.routes.length); assert.equal(c.facts,facts.length);
  assert.equal(c.numericScalarFacts,facts.filter(f=>typeof f.value==='number').length);
  assert.equal(c.structuredValueFacts,facts.filter(f=>f.value!==null && typeof f.value==='object').length);
  assert.equal(c.textValueFacts,facts.filter(f=>typeof f.value==='string').length);
  assert.equal(c.nullValueFacts,facts.filter(f=>f.value===null).length);
  assert.equal(c.sourceRecords,Object.values(data.scopes).reduce((n,s)=>n+s.sources.length,data.method.sources.length));
  assert.equal(c.searchRecords,Object.values(data.scopes).reduce((n,s)=>n+s.searches.length,data.method.searches.length));
  [...data.inputs,...data.downloads].forEach(d=>{localPath(d.path);assert.match(d.sha256,/^[0-9a-f]{64}$/);assert.ok(Number.isInteger(d.bytes)&&d.bytes>0);});
  unique(data.downloads.map(d=>d.path));localPath(data.reportPath);
  return data;
}

const data=validate(read('data/coordinate-evidence.json'));
const map=read('data/routes-quantitative.json');
assert.deepEqual(data.routes.map(r=>r.routeId).sort(),map.routes.map(r=>r.id).sort());
for(const name of shardNames) {
  const original=read(`research_notes/Route coordinate evidence/${name}.json`);
  const {routes,...rest}=original;
  assert.deepEqual(data.scopes[name],rest,'source scope must be lossless');
  routes.forEach(r=>{
    const normalized=data.routes.find(x=>x.routeId===r.routeId);
    const {scopeId,title,shortLabel,countries,...record}=normalized;
    assert.equal(scopeId,name); assert.deepEqual(record,r,'fact or gap changed during normalization');
    const meta=map.routes.find(x=>x.id===r.routeId);
    for(const k of ['title','shortLabel','countries']) assert.deepEqual(normalized[k],meta[k]);
  });
}
assert.deepEqual(data.method,read('research_notes/Route coordinate evidence/measurement.json'));
for(const d of [...data.inputs,...data.downloads]) {
  const bytes=readFileSync(resolve(root,d.path));assert.equal(bytes.length,d.bytes);assert.equal(hash(bytes),d.sha256,`stale snapshot: ${d.path}`);
}
if(process.argv.includes('--allow-pending-report') && !existsSync(resolve(root,data.reportPath))) console.warn('PENDING: report writer has not supplied the linked report yet.');
else assert.ok(existsSync(resolve(root,data.reportPath)), 'report is not yet available');
const mutations = [
  ['missing route',d=>d.routes.pop()],
  ['duplicate route',d=>d.routes[1].routeId=d.routes[0].routeId],
  ['unresolved source',d=>d.routes[0].facts[0].sourceIds=['unknown']],
  ['cross-regional source',d=>d.routes[0].facts[0].sourceIds=[d.scopes.africa.sources[0].id]],
  ['unresolved search',d=>d.routes[0].gaps[0].searchIds=['unknown']],
  ['nonfinite scalar',d=>d.routes[0].facts[0].value=Infinity],
  ['nonfinite nested value',d=>d.routes[0].facts[0].value={nested:[NaN]}],
  ['boolean value',d=>d.routes[0].facts[0].value=true],
  ['unsafe URL',d=>d.scopes.africa.sources[0].url='javascript:alert(1)'],
  ['credential URL',d=>d.scopes.africa.sources[0].url='https://user:password@example.org/'],
  ['bad axis',d=>d.routes[0].facts[0].axis='score'],
  ['bad gap status',d=>d.routes[0].gaps[0].status='exhaustive'],
  ['incorrect counts',d=>d.counts.numericScalarFacts++],
  ['invented estimates',d=>d.coordinateEstimatesAssigned=true],
  ['unsafe download',d=>d.downloads[0].path='../private'],
  ['missing locator',d=>delete d.routes[0].facts[0].locator],
  ['duplicate source',d=>d.scopes.africa.sources.push(d.scopes.africa.sources[0])],
  ['method bad ref',d=>d.method.findings[0].sourceIds=['unknown']],
];
for(const [name,mutate] of mutations) {const bad=structuredClone(data);mutate(bad);assert.throws(()=>validate(bad),undefined,name);}
console.log(`PASS: ${data.counts.routes} routes, ${data.counts.facts} facts, ${data.counts.numericScalarFacts} numeric scalar entries, ${data.counts.sourceRecords} source records; lossless normalization, hashes and ${mutations.length} negative cases.`);

const browserIndex=process.argv.indexOf('--browser');
if(browserIndex!==-1) {
  const base=process.argv[browserIndex+1];assert.ok(base,'--browser requires a local preview URL');
  const python=process.env.COORDINATE_BROWSER_PYTHON;
  assert.ok(python,'Set COORDINATE_BROWSER_PYTHON to the existing authorized Playwright Python; no installation required.');
  const script=String.raw`
import asyncio,json,sys
from urllib.parse import urljoin
from playwright.async_api import async_playwright
async def main():
  base=sys.argv[1]
  async with async_playwright() as pw:
    browser=await pw.chromium.connect_over_cdp('http://localhost:9222')
    assert browser.contexts, 'No authorized CDP context'
    page=await browser.contexts[0].new_page()
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    try:
      await page.set_viewport_size({'width':390,'height':844})
      response=await page.goto(base)
      assert response.status==200
      await page.wait_for_selector('#filters:not([hidden])')
      ids=await page.locator('#route option').evaluate_all('(xs)=>xs.map(x=>x.value).filter(Boolean)')
      assert len(ids)==32 and len(set(ids))==32
      assert await page.locator('article.route').count()==32
      assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Initial mobile overflow'
      for rid in ids:
        await page.select_option('#route',rid)
        assert await page.locator('article.route').count()==1
        assert await page.locator('article.route').get_attribute('data-route-id')==rid
        for axis in ['x','y','context']:
          await page.select_option('#axis',axis)
          assert await page.locator('.input').evaluate_all('(xs)=>xs.every(x=>x.dataset.axis==="'+axis+'")')
        await page.select_option('#axis','')
        await page.locator('article.route details').evaluate_all('(xs)=>xs.forEach(x=>x.open=true)')
        assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Expanded mobile overflow '+rid
      rid='kenya-biometric-dpia-evidence-gate'
      await page.goto(base+'?route='+rid+'&axis=x')
      await page.wait_for_selector('article.route')
      assert await page.input_value('#route')==rid and await page.input_value('#axis')=='x'
      await page.reload();await page.wait_for_selector('article.route')
      assert await page.locator('article.route').count()==1
      await page.goto(base+'#route='+rid)
      await page.reload();await page.wait_for_selector('article.route')
      assert await page.input_value('#route')==rid
      await page.fill('#search','impossible-no-record-12345')
      assert await page.locator('article.route').count()==0
      await page.click('button[type=reset]')
      assert await page.locator('article.route').count()==32
      await page.fill('#search','Kenya')
      assert await page.locator('article.route').count()==1
      await page.click('button[type=reset]')
      await page.locator('#methods details').evaluate_all('(xs)=>xs.forEach(x=>x.open=true)')
      assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Method mobile overflow'
      for rid in ids:
        await page.goto(urljoin(base,'quantitative-details.html?route='+rid))
        await page.wait_for_selector('a.coordinate-evidence-link')
        href=await page.locator('a.coordinate-evidence-link').get_attribute('href')
        assert href=='coordinate-evidence.html?route='+rid
      await page.goto(urljoin(base,'./'))
      assert await page.locator('a[href="coordinate-evidence.html"]').count()>=1
      assert not errors,errors
      print('PASS browser: all 32 IDs, all x/y/context filters, query and hash deep links, reload, search/reset/empty states, all 32 detail links, default map link, expanded 390px mobile layout, zero page errors.')
    finally:
      await page.close()
asyncio.run(main())
`;
  process.stdout.write(execFileSync(python,['-c',script,base],{encoding:'utf8',timeout:180000}));
}
