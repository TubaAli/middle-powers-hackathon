import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const readJSON = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const unique = (rows, label) => {
  const ids = rows.map(r => r.id);
  assert(ids.every(id => typeof id === 'string' && id.length), `${label}: missing id`);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate id`);
  return new Set(ids);
};
function date(value, label) {
  if (value == null) return;
  assert.equal(typeof value, 'string', `${label}: not a date string`);
  const m = /^(20\d{2})-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?(?:T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2}))?$/.exec(value);
  assert(m, `${label}: unsupported date ${value}`);
  if (m[3]) {
    const y = Number(m[1]), month = Number(m[2]), day = Number(m[3]);
    assert(day <= new Date(Date.UTC(y, month, 0)).getUTCDate(), `${label}: impossible day`);
    if (value.includes('T')) assert(Number.isFinite(Date.parse(value)), `${label}: invalid timestamp`);
  }
}

export function validate(data, routeData) {
  const sources = unique(data.sources, 'sources');
  const windows = unique(data.windows, 'windows');
  unique(data.scenarios, 'scenarios'); unique(data.examples, 'examples');
  const routes = unique(routeData.routes, 'existing routes');
  assert.equal(data.scenarios.length, 10, 'expected ten scenarios');
  assert.equal(data.examples.length, 5, 'expected five measured examples');
  date(data.observed, 'observed'); date(data.summit.start, 'summit start'); date(data.summit.end, 'summit end');
  assert(data.summit.start <= data.summit.end, 'summit interval reversed');
  // Check references wherever nested, not just the top-level source lists.
  function walk(value, path = 'data') {
    if (!value || typeof value !== 'object') return;
    for (const [key, v] of Object.entries(value)) {
      const p = `${path}.${key}`;
      if (['sourceIds','countSourceIds'].includes(key)) {
        assert(Array.isArray(v), `${p}: expected array`);
        v.forEach(id => assert(sources.has(id), `${p}: missing source ${id}`));
      }
      if (key === 'sourceId' && v != null) assert(sources.has(v), `${p}: missing source ${v}`);
      if (key === 'windowIds') v.forEach(id => assert(windows.has(id), `${p}: missing window ${id}`));
      if (key === 'existingRouteId' && v != null) assert(routes.has(v), `${p}: missing route ${v}`);
      walk(v, p);
    }
  }
  walk(data);
  for (const s of data.sources) {
    assert(['https:', 'http:'].includes(new URL(s.url).protocol), `${s.id}: unsafe source URL`);
  }
  for (const w of data.windows) {
    for (const k of ['date','start','end']) date(w[k], `${w.id}.${k}`);
    if (w.start && w.end) assert(w.start <= w.end, `${w.id}: reversed interval`);
    if (w.start && w.date) assert(w.start <= w.date, `${w.id}: deadline before opening`);
    const end = w.date || w.end;
    if (w.status === 'past' && end) assert(end.slice(0,10) < data.observed, `${w.id}: past opportunity not past`);
    if (w.status === 'upcoming' && end) assert(end.slice(0,10) >= data.observed, `${w.id}: upcoming opportunity already ended`);
    if (['season','relative','unknown'].includes(w.precision)) assert(!w.date && !w.start && !w.end, `${w.id}: invented precise date`);
    if (w.precision === 'month') for (const k of ['date','start','end']) if (w[k]) assert(/^\d{4}-\d{2}$/.test(w[k]), `${w.id}: month precision has a day`);
    assert(w.displayDate, `${w.id}: missing human date/uncertainty label`);
  }
  for (const m of data.proposedMilestones) date(m.date, `milestone ${m.title}`);
  for (const e of data.examples) {
    const n = e.numerator, d = e.denominator;
    assert(Number.isFinite(n.value) && Number.isFinite(d.value), `${e.id}: non-finite input`);
    assert(d.value > 0 && n.value >= 0 && n.value <= d.value, `${e.id}: invalid subset fraction`);
    assert.equal(n.unit, d.unit, `${e.id}: unlike units`);
    assert.equal(n.period, d.period, `${e.id}: unlike periods`);
    assert(Math.abs(n.value / d.value - e.value01) < 1e-12, `${e.id}: arithmetic mismatch`);
    const digits = e.displayValue.split('.')[1]?.replace('%','').length || 0;
    assert.equal(`${(100*n.value/d.value).toFixed(digits)}%`, e.displayValue, `${e.id}: display arithmetic mismatch`);
    assert(['context-only','proxy'].includes(e.kind), `${e.id}: example cannot be a route impact score`);
  }
  // Independent decompositions of the retained inputs catch internally consistent but wrong totals.
  const e = Object.fromEntries(data.examples.map(x => [x.id, x]));
  assert.equal(e['example-jp-weekly'].numerator.value, 1698+711+669, 'Japan respondent total');
  assert.equal(e['example-jp-weekly'].denominator.value, 6439, 'Japan sample denominator');
  assert.equal(e['example-eu-lot2'].numerator.value, 3*40000, 'Lot 2 minimum');
  assert.equal(e['example-eu-lot2'].denominator.value, 4*25000+3*40000, 'Tender design total');
  assert.equal(e['example-tw-budget'].numerator.value, 863300*1000, 'Taiwan budget: thousands to TWD');
  assert.equal(e['example-tw-budget'].denominator.value, 6561499*1000, 'Taiwan total: thousands to TWD');
  assert.equal(e['example-ch-gdp'].numerator.value, 969919786394.884, 'Swiss 2024 GDP input');
  assert.equal(e['example-ch-gdp'].denominator.value, 111669432109121, 'World 2024 GDP input');
  assert.equal(e['example-sgkr-benchmark'].numerator.value, 9, 'Agent A successful runs');
  assert.equal(e['example-sgkr-benchmark'].denominator.value, 60, 'Agent A total runs');
  for (const s of data.scenarios) {
    const g = s.agreementGraph, nodeIds = unique(g.nodes, `${s.id} nodes`);
    assert(['candidate','conditional','exploratory'].includes(s.status), `${s.id}: unknown status`);
    for (const key of ['nextDecision','proposedPilot','byGeneva','stopRule']) assert(s[key], `${s.id}: missing ${key}`);
    for (const n of g.nodes) {
      assert(n.statusScope && n.power && n.requiredAgreement, `${s.id}/${n.id}: missing scope or authority`);
      assert(n.sourceIds?.length || n.status === 'unknown', `${s.id}/${n.id}: claimed alignment without evidence`);
    }
    const dependencies = [...g.nodes.map(n => n.upstream).filter(Boolean), ...(g.dependencies || []).map(d => d.upstream || d)];
    const gates = new Set((g.dependencies || []).map(d => d.gate).filter(Boolean));
    function checkDependency(d) {
      assert(['AND','OR','THRESHOLD'].includes(d.operator), `${s.id}: unsupported dependency operator ${d.operator}`);
      assert(Array.isArray(d.nodeIds || d.inputs), `${s.id}: missing dependency inputs`);
      if (d.nodeIds) d.nodeIds.forEach(id => assert(nodeIds.has(id), `${s.id}: missing dependency node ${id}`));
      if (d.inputs) d.inputs.forEach(id => assert(nodeIds.has(id) || gates.has(id) || /\s/.test(id), `${s.id}: missing gate/input ${id}`));
      if (d.alternatives) checkDependency(d.alternatives);
    }
    dependencies.forEach(checkDependency);
    for (const d of g.dependencies || []) if(d.nodeId) assert(nodeIds.has(d.nodeId), `${s.id}: missing dependent node`);
    if (g.institutionLowerBound != null) assert(Number.isInteger(g.institutionLowerBound) && g.institutionLowerBound > 0, `${s.id}: invalid lower bound`);
    if (g.totalInstitutions != null) assert(g.totalInstitutions >= (g.institutionLowerBound || 0), `${s.id}: total below lower bound`);
    // No known complete approval-act denominator exists in this snapshot.
    // A future finite value must supply a complete register, not an institution count.
    if (g.approvalFraction01 != null) {
      const r = g.approvalRegister;
      assert(r?.complete && Number.isInteger(r.totalRequired) && r.totalRequired > 0, `${s.id}: approval fraction without complete denominator`);
      assert(Number.isInteger(r.secured) && r.secured >= 0 && r.secured <= r.totalRequired, `${s.id}: invalid approval numerator`);
      assert.equal(g.approvalFraction01, r.secured/r.totalRequired, `${s.id}: incorrect approval fraction`);
    }
    for (const key of ['exactSafeguardConsentFraction','consentCompletionFraction']) {
      if (g.counts?.[key] != null) {
        assert(g.approvalRegister?.complete, `${s.id}: ${key} without a complete approval denominator`);
        assert.equal(g.counts[key], g.approvalFraction01, `${s.id}: approval aliases disagree`);
      }
    }
    for (const key of ['coverage01','impact01','probability01']) if (key in s) assert.equal(s[key], null, `${s.id}: unmeasured score must remain unknown`);
  }
  assert.equal(data.measurement.forecast.value01, null, 'uncalibrated forecast must remain unknown, not zero');
  return true;
}

async function main() {
  const data = await readJSON('data/geneva-research.json'), routes = await readJSON('data/routes.json');
  validate(data, routes);
  const mutations = [
    ['duplicate id', d => d.scenarios[1].id = d.scenarios[0].id],
    ['source reference', d => d.scenarios[0].sourceIds.push('missing')],
    ['window reference', d => d.scenarios[0].windowIds.push('missing')],
    ['route reference', d => d.scenarios[0].existingRouteId = 'missing'],
    ['dependency reference', d => d.scenarios[0].agreementGraph.nodes[0].upstream.nodeIds.push('missing')],
    ['fraction arithmetic', d => d.examples[0].value01 = .5],
    ['zero denominator', d => d.examples[0].denominator.value = 0],
    ['independent input total', d => {d.examples[0].numerator.value++; d.examples[0].value01=d.examples[0].numerator.value/d.examples[0].denominator.value; d.examples[0].displayValue=(100*d.examples[0].value01).toFixed(2)+'%';}],
    ['impossible date', d => d.proposedMilestones[0].date = '2027-02-30'],
    ['invented month deadline', d => d.windows.find(w => w.precision === 'month').start = '2026-11-01'],
    ['unknown forecast as zero', d => d.measurement.forecast.value01 = 0],
    ['approval without denominator', d => d.scenarios[0].agreementGraph.approvalFraction01 = 0],
    ['nested consent fraction without denominator', d => d.scenarios[0].agreementGraph.counts.exactSafeguardConsentFraction = 0],
    ['unmeasured coverage as zero', d => d.scenarios[0].coverage01 = 0]
  ];
  for (const [label, mutate] of mutations) {
    const bad = structuredClone(data); mutate(bad);
    assert.throws(() => validate(bad, routes), undefined, `validator did not reject ${label}`);
  }
  console.log(`PASS: ${data.scenarios.length} scenarios, ${data.examples.length} independently checked fractions, ${data.sources.length} sources, ${data.windows.length} windows; ${mutations.length} negative tests rejected. Checks validate consistency, not the truth of source claims.`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
