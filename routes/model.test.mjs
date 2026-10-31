import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateDataset, filterRoutes, displayRoutes, comparePair, safeUrl } from './model.mjs';

const base = JSON.parse(readFileSync(new URL('../data/route-research/eurohpc.json', import.meta.url))).routes[0];
const make = fields => ({ ...structuredClone(base), ...fields });

test('rejects fabricated precision, misplaced ranges and unsafe source URLs', () => {
  assert.throws(() => validateDataset({ routes:[make({ feasibility:3.75 })] }), /feasibility/);
  assert.throws(() => validateDataset({ routes:[make({ impactRange:[4,5] })] }), /impact/);
  const route = make({}); route.sources[0].url = 'javascript:alert(1)';
  assert.throws(() => validateDataset({ routes:[route] }), /provenance/);
  assert.equal(safeUrl('data:text/html,test'), null);
});

test('each comparison has one national and one coordinated route', () => {
  const national = make({ id:'single', pairId:'test', pairRole:'national' });
  const other = make({ id:'multi', pairId:'test', pairRole:'national' });
  assert.throws(() => validateDataset({ routes:[national,other] }), /pair/);
  assert.throws(() => validateDataset({ routes:[national,national] }), /duplicate/);
});

test('filters intersect and search includes institutions and countries', () => {
  const routes = [make({ id:'jp', countries:['Japan'], coordination:'national', region:'Asia-Pacific' }), make({ id:'eu' })];
  assert.deepEqual(filterRoutes(routes,{ search:'japan', coordination:'broader' }), []);
  assert.deepEqual(filterRoutes(routes,{ search:'JAPAN', region:'Asia-Pacific' }).map(r=>r.id), ['jp']);
  assert.equal(filterRoutes(routes,{ search:'EuroHPC' }).length, 2);
});

test('replay is reversible and never mutates the reviewed snapshot', () => {
  const data = { routes:[base], replay:{ routeId:base.id, before:{ feasibility:1, confidence:'Low' } } };
  const saved = JSON.stringify(data);
  assert.equal(displayRoutes(data,'before')[0].feasibility, 1);
  assert.equal(displayRoutes(data,'after')[0].feasibility, base.feasibility);
  assert.equal(JSON.stringify(data), saved);
});

test('comparison preserves coordination costs rather than awarding a bonus', () => {
  const routes = [make({ id:'solo', pairId:'p', pairRole:'national', feasibility:4, impact:2 }), make({ id:'joint', pairId:'p', pairRole:'coordinated', feasibility:2, impact:4 })];
  const result = comparePair(routes,'p');
  assert.equal(result.feasibilityDelta, -2);
  assert.equal(result.impactDelta, 2);
  assert.equal(comparePair(routes,'missing'), null);
});

test('all published route data satisfies the model contract', { skip:!process.env.CHECK_ROUTE_SNAPSHOT }, () => {
  const data = JSON.parse(readFileSync(new URL('../data/routes.json', import.meta.url)));
  validateDataset(data);
  assert.ok(data.routes.length >= 8);
  validateDataset({ ...data, routes:displayRoutes(data,'before') });
  assert.equal(new Set(data.routes.map(r=>r.coordination)).size, 3);
});
