// Geopolitical moods for Before Geneva. Deterministic: who you worked with before shifts how a delegation receives you.
// Data comes from data/geopolitics.json (sourced, dated) via campaign.relations; see scripts/build-before-geneva.py.
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const POLES = {US: 'toUS', CN: 'toChina', EU: 'toEU'};

// Affinity between two codes, -2..2, only where there is evidence: a sourced bilateral pair, or a country's
// sourced stance toward the US, China or the EU. Otherwise neutral; we do not guess from similar stances.
export function affinity(rel, a, b) {
  if (!rel || a === b) return a === b ? 2 : 0;
  const pair = rel.pairs.find(p => (p.a === a && p.b === b) || (p.a === b && p.b === a));
  if (pair) return pair.score;
  const A = rel.countries[a], B = rel.countries[b];
  if (POLES[b] && A) return A[POLES[b]];
  if (POLES[a] && B) return B[POLES[a]];
  if (rel.euMembers?.includes(a) && rel.euMembers.includes(b)) return 1;   // shared EU membership
  return 0;
}
const POLE_NAME = {US: 'the United States', CN: 'China', EU: 'the EU'};
const STANCE = {2: 'close to', 1: 'friendly toward', 0: 'neutral toward', '-1': 'at odds with', '-2': 'in open dispute with'};
// The evidence behind an affinity, in plain words.
function pairWhy(rel, a, b) {
  if (a === b) return {why: 'You already have a project with them.'};
  const p = rel.pairs.find(p => (p.a === a && p.b === b) || (p.a === b && p.b === a));
  if (p) return p;
  if (rel.euMembers?.includes(a) && rel.euMembers.includes(b)) return {why: 'Both are EU members.'};
  const [c, pole] = POLES[b] ? [a, b] : [b, a];
  const C = rel.countries[c];
  return C && POLES[pole] ? {why: `${C.name}'s government is ${STANCE[C[POLES[pole]]]} ${POLE_NAME[pole]}.`} : null;
}

// How this route's delegation feels about your past partners. Started work counts half; finished tests count fully.
export function mood(s, campaign, routeId) {
  const rel = campaign?.relations, here = campaign?.routes.find(r => r.id === routeId);
  if (!rel || !here?.codes?.length) return {score: 0, label: 'neutral', reason: ''};
  let total = 0, strongest = null;
  for (const [id, p] of Object.entries(s.projects)) {
    if (id === routeId || !p.strategy) continue;
    const there = campaign.routes.find(r => r.id === id);
    if (!there?.codes?.length) continue;
    let sum = 0, best = null;
    for (const a of here.codes) for (const b of there.codes) {
      const v = affinity(rel, a, b); sum += v;
      if (!best || Math.abs(v) > Math.abs(best.v)) best = {v, a, b};
    }
    const avg = sum / (here.codes.length * there.codes.length), w = p.stage === 'tested' ? 1 : 0.5;
    total += avg * w;
    if (!strongest || Math.abs(avg * w) > Math.abs(strongest.weight)) strongest = {weight: avg * w, route: there, best};
  }
  const score = clamp(Math.round(total), -2, 2);
  if (!strongest || score === 0) return {score: 0, label: 'neutral', reason: ''};
  const {route, best} = strongest, why = pairWhy(rel, best.a, best.b);
  const who = rel.countries[best.b]?.name ?? route.countries[0];
  return {
    score, label: score > 0 ? 'warm' : 'cold', partner: route.id,
    reason: `You worked with ${who}. ${why?.why ?? ''}`.trim(),
    url: why?.url ?? '',
  };
}

// Cost change from mood: warm delegations make a shared deal cheaper; cold ones make every new test dearer.
export function moodCost(s, campaign, action) {
  const id = s.conversation?.routeId;
  if (!id || !campaign?.relations) return {};
  const m = mood(s, campaign, id).score;
  if (action === 'commission-shared') return m > 0 ? {mandate: -1} : m < 0 ? {mandate: 1} : {};
  if (action === 'commission-pilot') return m < 0 ? {budget: 1} : {};
  return {};
}
