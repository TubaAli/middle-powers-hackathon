import test from 'node:test';
import assert from 'node:assert/strict';
import {affinity, mood, moodCost} from './relations.mjs';

const rel = {
  countries: {JP: {name: 'Japan', toUS: 2, toChina: -2, toEU: 1}, CN: {name: 'China', toUS: -2, toChina: 2, toEU: 0}, KR: {name: 'South Korea', toUS: 2, toChina: -1, toEU: 1}, BR: {name: 'Brazil', toUS: -1, toChina: 1, toEU: 1}},
  pairs: [{a: 'JP', b: 'CN', score: -2, why: 'Dispute over Taiwan remarks.', url: 'https://example.org/a'}, {a: 'JP', b: 'KR', score: 1, why: 'Shuttle diplomacy.', url: 'https://example.org/b'}],
};
const campaign = {relations: rel, routes: [{id: 'jp', codes: ['JP'], countries: ['Japan']}, {id: 'kr', codes: ['KR'], countries: ['South Korea']}, {id: 'cn', codes: ['CN'], countries: ['China']}, {id: 'br', codes: ['BR'], countries: ['Brazil']}]};
const state = projects => ({projects, conversation: null});

test('only sourced pairs and stances toward the big powers count; no guessing from similar stances', () => {
  assert.equal(affinity(rel, 'JP', 'CN'), -2);
  assert.equal(affinity(rel, 'KR', 'US'), 2);
  assert.equal(affinity(rel, 'JP', 'KR'), 1);
  assert.equal(affinity(rel, 'JP', 'BR'), 0);
});

test('mood follows past partners: started work counts half, finished tests fully', () => {
  assert.equal(mood(state({}), campaign, 'kr').score, 0);
  assert.equal(mood(state({jp: {stage: 'tested', strategy: 'pilot'}}), campaign, 'kr').score, 1);
  assert.equal(mood(state({jp: {stage: 'tested', strategy: 'pilot'}}), campaign, 'br').score, 0);
  const cold = mood(state({jp: {stage: 'tested', strategy: 'pilot'}}), campaign, 'cn');
  assert.equal(cold.score, -2);
  assert.match(cold.reason, /Taiwan/);
  assert.equal(mood(state({jp: {stage: 'documented'}}), campaign, 'cn').score, 0);
});

test('mood changes costs only for new work', () => {
  const s = {projects: {jp: {stage: 'tested', strategy: 'pilot'}}, conversation: {routeId: 'kr'}};
  assert.deepEqual(moodCost(s, campaign, 'commission-shared'), {mandate: -1});
  assert.deepEqual(moodCost({...s, conversation: {routeId: 'cn'}}, campaign, 'commission-pilot'), {budget: 1});
  assert.deepEqual(moodCost(s, campaign, 'resolve'), {});
  assert.deepEqual(moodCost(s, {routes: campaign.routes}, 'commission-shared'), {});
});
