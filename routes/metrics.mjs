// A transparent comparison index, not a calibrated delivery probability.
// Unresolved cooperation is an interval unless a visitor supplies an assumption.
export function agreementMetric(agreements, assumption = null) {
  if (assumption !== null && (!Number.isFinite(assumption) || assumption < 0 || assumption > 1)) {
    throw new Error('Cooperation assumption must be between 0 and 1');
  }
  const actors = agreements?.actors || [];
  const handoffs = agreements?.handoffsLowerBound;
  if (!actors.length || !Number.isInteger(handoffs) || handoffs < 0) return null;
  if (new Set(actors.map(a => a.id)).size !== actors.length) throw new Error('Duplicate agreement actor');
  if (actors.some(a => !['approved', 'opposed', 'unknown'].includes(a.consent))) throw new Error('Invalid agreement state');
  const approved = actors.filter(a => a.consent === 'approved').length;
  const unknown = actors.filter(a => a.consent === 'unknown').length;
  const veto = actors.some(a => a.consent === 'opposed');
  const complete = agreements.complete === true;
  const remainingHandoffs = complete && approved === actors.length ? 0 : handoffs;
  const coordinationFactor = 1 / (1 + remainingHandoffs);
  const lower = veto || !complete ? 0 : approved / actors.length * coordinationFactor;
  const upper = veto ? 0 : (approved + unknown) / actors.length * coordinationFactor;
  const scenario = assumption === null ? null : veto ? 0 :
    (approved + assumption * unknown) / actors.length * coordinationFactor;
  return {lower, upper, scenario, approved, unknown, actors:actors.length,
    handoffs:remainingHandoffs, coordinationFactor, complete, veto,
    conditionalScenario:assumption !== null && !complete};
}

export function coverageMetric(coverage) {
  if (!coverage) return null;
  const {numerator, denominator} = coverage;
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0 || numerator < 0 || numerator > denominator) {
    throw new Error('Coverage needs a nonnegative subset and a positive matching denominator');
  }
  for (const key of ['basisId','basisLabel','unit','period','stage','interpretation']) {
    if (typeof coverage[key] !== 'string' || !coverage[key].trim()) throw new Error(`Coverage missing ${key}`);
  }
  return {...coverage, value:numerator / denominator};
}

export function routeMetrics(route, assumption = null) {
  return {coverage:coverageMetric(route.quantitative?.coverage),
    agreement:agreementMetric(route.quantitative?.agreements, assumption)};
}

export function validateQuantitative(data) {
  if (!Array.isArray(data.routes) || !data.routes.length) throw new Error('No routes');
  const ids = new Set();
  const bases = new Map();
  for (const route of data.routes) {
    if (!route.id || ids.has(route.id)) throw new Error('Missing or duplicate route');
    ids.add(route.id);
    if (!route.title || !route.countries?.length || !route.sources?.length) throw new Error(`Incomplete route ${route.id}`);
    const sourceIds = new Set(route.sources.map(s => s.id));
    for (const s of route.sources) {
      let url; try { url = new URL(s.url); } catch { throw new Error(`Invalid source ${route.id}`); }
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsafe source');
    }
    function refs(value) {
      if (!value || typeof value !== 'object') return;
      for (const [key, child] of Object.entries(value)) {
        if (key === 'sourceIds') {
          if (!Array.isArray(child) || child.some(id => !sourceIds.has(id))) throw new Error(`Unresolved metric source: ${route.id}`);
        } else refs(child);
      }
    }
    refs(route.quantitative);
    const {coverage, agreement} = routeMetrics(route);
    if (coverage) {
      if (!coverage.sourceIds?.length) throw new Error('Unsourced coverage');
      const definition = JSON.stringify([coverage.denominator, coverage.unit, coverage.period]);
      if (bases.has(coverage.basisId) && bases.get(coverage.basisId) !== definition) throw new Error(`Incompatible coverage basis: ${coverage.basisId}`);
      bases.set(coverage.basisId, definition);
    }
    if (agreement && !route.quantitative.agreements.sourceIds?.length) throw new Error('Unsourced agreement path');
  }
  return data;
}
