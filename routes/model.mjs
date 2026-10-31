export const COORDINATION = { national: 'One jurisdiction', 'middle-power': 'Middle powers together', broader: 'Broader coalition' };

export function safeUrl(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}

export function validateDataset(data) {
  if (!data || !Array.isArray(data.routes) || !data.routes.length) throw Error('No routes found');
  const ids = new Set();
  for (const route of data.routes) {
    if (!route.id || ids.has(route.id)) throw Error('Missing or duplicate route ID');
    ids.add(route.id);
    if (!COORDINATION[route.coordination]) throw Error(`Invalid coordination: ${route.id}`);
    for (const axis of ['impact', 'feasibility']) {
      const value = route[axis], range = route[`${axis}Range`];
      if (!Number.isInteger(value) || value < 1 || value > 5 || !Array.isArray(range) || range.length !== 2 ||
        range.some(x => !Number.isInteger(x) || x < 1 || x > 5) || range[0] > value || range[1] < value) throw Error(`Invalid ${axis} rating/range: ${route.id}`);
    }
    for (const field of ['title', 'shortLabel', 'actor', 'obligor', 'instrument', 'safeguard', 'verification', 'remedy', 'window', 'gap', 'nextQuestion', 'impactRationale', 'feasibilityRationale', 'evidenceSummary']) {
      if (typeof route[field] !== 'string' || !route[field].trim()) throw Error(`Missing ${field}: ${route.id}`);
    }
    if (!['Low', 'Medium', 'High'].includes(route.confidence)) throw Error(`Invalid confidence: ${route.id}`);
    if (!['Proposed', 'Draft-backed', 'Documented mechanism'].includes(route.status)) throw Error(`Invalid status: ${route.id}`);
    if (!['Procurement', 'Evaluation', 'Finance', 'Compute'].includes(route.mechanism)) throw Error(`Invalid mechanism: ${route.id}`);
    if (!['Asia-Pacific', 'Europe', 'Cross-regional'].includes(route.region)) throw Error(`Invalid region: ${route.id}`);
    for (const key of ['countries', 'incentives', 'constraints']) {
      if (!Array.isArray(route[key]) || !route[key].length || route[key].some(x => typeof x !== 'string')) throw Error(`Missing ${key}: ${route.id}`);
    }
    if (!Array.isArray(route.sources) || !route.sources.length || route.sources.some(s => !safeUrl(s.url) || !s.claim || !s.locator || !s.observed)) throw Error(`Missing source provenance: ${route.id}`);
  }
  for (const id of new Set(data.routes.map(r => r.pairId).filter(Boolean))) {
    const routes = data.routes.filter(r => r.pairId === id);
    if (routes.length !== 2 || routes.filter(r => r.pairRole === 'national').length !== 1 || routes.filter(r => r.pairRole === 'coordinated').length !== 1) throw Error(`Invalid pair: ${id}`);
  }
  return data;
}

export function filterRoutes(routes, filters) {
  const query = (filters.search || '').toLowerCase().trim();
  return routes.filter(r => (!filters.coordination || r.coordination === filters.coordination) &&
    (!filters.mechanism || r.mechanism === filters.mechanism) && (!filters.region || r.region === filters.region) &&
    (!query || [r.title, ...r.countries, r.actor, r.safeguard, r.instrument].join(' ').toLowerCase().includes(query)));
}

export function displayRoutes(data, stage) {
  return data.routes.map(route => stage === 'before' && route.id === data.replay?.routeId ? { ...route, ...data.replay.before } : { ...route });
}

export function comparePair(routes, id) {
  const national = routes.find(r => r.pairId === id && r.pairRole === 'national');
  const coordinated = routes.find(r => r.pairId === id && r.pairRole === 'coordinated');
  if (!national || !coordinated) return null;
  return { national, coordinated, impactDelta: coordinated.impact - national.impact, feasibilityDelta: coordinated.feasibility - national.feasibility };
}
