const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = value => { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
const statusLabels = {candidate:'Candidate for testing', conditional:'Needs more evidence', exploratory:'Watch'};
// Editorial summaries; the full, unabridged decision and protocol remain one link away.
const briefs = {
  'scenario-eurohpc-security-evidence': ['Confirm incident scope, the question deadline and tenant evidence duties with the contracting authority. No material change disguised as clarification.', 'Rehearse breach classification, evidence and notices with synthetic cases—not operating hardware.', 'A usable reporting process; adoption only with a published clarification or agreement.'],
  'scenario-jp-versioned-acceptance': ['By our proposed 30 November check, find the tender owner and a lawful way to add version-bound terms before bids. Existing safety evidence is already required.', 'April–May: compare current and version-bound controls in a shadow deployment, using synthetic secrets and model-change drills.', 'If adopted: signed terms, version traceability and evidence that a failing shadow deployment can be halted.'],
  'scenario-sg-sandbox-purchaser-gate': ['By our proposed 31 January check, secure a purchaser with release authority, vendor and tester agreement, and sandbox admission if needed.', 'Compare existing controls with permission limits and a signed release gate; independently retest in May.', 'An actual withheld release or removed permission, bounded leakage results and measured compliance effort.'],
  'scenario-ch-electricity-ai-fallback': ['By our proposed 31 January check, recruit an operator with fallback authority, cleared rights, logs and an isolated test environment. Swissgrid is not recruited.', 'Compare current and proposed fallback procedures on 30 matched critical cases plus controls. No live-grid fault injection.', 'Agreed scope and simulator results against baseline, including recovery performance and staff workload.'],
  'scenario-uk-ico-agent-accountability': ['Find a consenting deployer and independent reviewers for personal-data tasks. Guidance is not a frontier-model licence.', 'Compare baseline and limited permissions/logging on synthetic tasks; ask blinded reviewers to reconstruct incidents.', 'Evidence of control performance and usable logs; compare final guidance if published.'],
  'scenario-uk-energy-staged-autonomy': ['Find an operator, a lawful instrument and a usable historical dataset. A strategy response alone is not enough.', 'Replay a fixed workload under outages and model changes; use shadow operation only if authorised.', 'Fallback performance on specified cases; policy uptake only if documented.'],
  'scenario-tw-adi-award': ['Verify the 2027 budget, operator contract, dates and signatory discretion. Current awards need their own notices and acceptance; no assumed retrospective powers.', 'Follow a consenting award cohort and comparison group; test reporting and an authorised sandbox suspension/restoration.', 'An accepted future-award appendix and a three-month evidence cycle, if timing permits.'],
  'scenario-kr-safety-case-rehearsal': ['Before a proposed February pilot, verify the final notice and enforcement position, identify the responsible parties and recruit a developer. No open legislative window is established.', 'Rehearse incidents and model changes against verified current rules; independently repeat one mitigation test.', 'A verified legal or purchaser path and drill results—or an evidence-backed decision not to proceed.'],
  'scenario-ca-measurable-stage': ['Inspect the investment terms and stage schedule. Proceed only with genuinely negotiable terms and written investor–company agreement.', 'Track one model/version through independent evaluation, remediation and a release decision, preserving the existing baseline.', 'Negotiated rights and one observed remediation cycle, only if an authentic stage opens.'],
  'scenario-an-new-money-evidence': ['Require a borrower-confirmed transaction, actual commitment holders and consent rules. Otherwise keep this as a watch item.', 'If new credit is negotiated, track a signed evidence covenant, reports due and verified corrections separately.', 'Signed information rights if a transaction arises; otherwise only a draft protocol and reasons for non-selection.']
};
let data, sourceMap, current;
const refs = ids => `<span class="sources">${(ids || []).map(id => {
  const s = sourceMap.get(id), url = safeUrl(s?.url);
  return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="${esc(s.title)}" aria-label="${esc(s.title)}">[${data.sources.indexOf(s) + 1}]</a>` : `<span>Source unavailable: ${esc(id)}</span>`;
}).join(' ')}</span>`;
const paragraph = (label, text) => text ? `<p>${label ? `<strong>${esc(label)}</strong> ` : ''}${esc(text)}</p>` : '';
const fractionText = e => {
  const scale = e.denominator.value >= 1e9 && e.numerator.value >= 1e8 ? 1e9 : 1;
  const number = n => (n / scale).toLocaleString('en-US', {maximumFractionDigits:3});
  return `${scale > 1 ? '≈ ' : ''}${number(e.numerator.value)} / ${number(e.denominator.value)} ${scale > 1 ? 'billion ' : ''}${e.numerator.unit}`;
};
function dateLabel(w) {
  // Human labels preserve deadline, opening and month/season precision separately.
  return w.displayDate || w.date || [w.start, w.end].filter(Boolean).join(' – ') || 'Date not established';
}
function windowRow(w) {
  return `<article class="date-row"><div class="date">${esc(dateLabel(w))}</div><h3>${esc(w.title)} ${refs(w.sourceIds)}</h3><p class="small">${esc(w.kind.replaceAll('-', ' '))}</p><details><summary>What can change</summary>${paragraph('', w.whatCanChange)}${paragraph('Decision authority:', w.decisionAuthority)}</details></article>`;
}
function renderRoute(s) {
  const b = briefs[s.id] || [s.nextDecision, s.proposedPilot, s.byGeneva];
   $('#routes-view').innerHTML = `<article class="card" id="selected-card"><span class="status ${esc(s.status)}">${esc(statusLabels[s.status] || s.status)}</span><h2>${esc(s.title)}</h2><dl><dt>Next decision</dt><dd>${esc(b[0])}</dd><dt>Proposed test</dt><dd>${esc(b[1])}</dd></dl><dl><dt>Evidence by Geneva</dt><dd>${esc(b[2])}</dd></dl><div class="card-links"><a href="#protocol" data-expand="protocol">Test details & evidence</a><a href="${shareUrl(s.id, 'agreement')}">Who must agree →</a>${s.existingRouteId ? `<a href="./#route=${encodeURIComponent(s.existingRouteId)}">Original map route ↗</a>` : ''}</div><p class="small">No agreement or test results are recorded yet.</p></article>
  <div class="detail-area"><details id="protocol"><summary>Full decision and proposed test</summary>${paragraph('Next decision:', s.nextDecision)}${paragraph('Proposed test:', s.proposedPilot)}${paragraph('By Geneva:', s.byGeneva)}${paragraph('Measure:', s.successMeasure)}${paragraph('Baseline needed:', s.baselineNeeded)}${paragraph('Do not infer:', s.notEstablished)}${paragraph('Stop condition:', s.stopRule)}${paragraph('Existing practice:', s.baselineCorrection?.correction)}${paragraph('Possible addition:', s.baselineCorrection?.whatMayAdd)}${refs(s.sourceIds)}</details><details><summary>Decision windows for this route</summary>${s.windowIds.map(id => windowRow(data.windows.find(w => w.id === id))).join('')}</details><details><summary>Economic incentives and evidence</summary>${(s.politicalEconomy || []).map(p => `<p><strong>${esc(p.kind)}:</strong> ${esc(p.claim)} ${refs(p.sourceIds)}</p>`).join('')}</details><details><summary>Hypothetical role-play arguments</summary><p>These are invented negotiation arguments, not testimony or recorded consent.</p>${(s.roles || []).map(r => `<h3>${esc(r.role)}</h3>${paragraph('Possible objection:',r.objection)}${paragraph('Possible response:',r.response)}${paragraph('Evidence versus assumption:',r.evidenceVsAssumption)}`).join('')}</details></div>`;
}
function renderAgreement(s) {
  const g = s.agreementGraph, count = g.institutionLowerBound;
  const nodes = new Map(g.nodes.map(n => [n.id, n]));
  const name = id => { const n = nodes.get(id); return n ? [n.institution, n.office].filter(Boolean).join(' — ') : id; };
  const dependency = d => {
    const u = d.upstream || d;
    const inputs = (u.nodeIds || u.inputs || []).map(name);
    return `<p>${d.nodeId || d.gate ? `<strong>${esc(name(d.nodeId || d.gate))}:</strong> ` : ''}${esc(u.operator)}: ${esc(inputs.join(` ${u.operator} `) || 'No additional named institution in this record')}. ${esc(u.qualification || u.note || '')}</p>
      ${u.conditions?.length ? `<p>Conditions (${esc(u.operator)}):</p><ul>${u.conditions.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      ${u.alternatives ? dependency(u.alternatives) : ''}${paragraph('Conditional:',u.conditionalInputs?.join('; '))}`;
  };
  const timing = value => typeof value === 'object' && value
    ? `${value.kind === 'proposed-test' ? 'Proposed test' : value.kind}: ${value.by ? `by ${value.by}` : 'date not established'}${value.testStart ? `; proposed start ${value.testStart}` : ''}`
    : value;
  const node = n => `<details><summary>${esc(n.institution || n.office)}
    ${n.leader ? `<span class="small">${esc(n.leader)}</span>` : ''}
    <span class="small">${esc(n.status === 'unknown' ? 'Position unknown' : n.status.replaceAll('-', ' '))} · ${esc(n.statusScope)}</span></summary>
    ${paragraph('Office:',n.office)}${paragraph('Power:',n.power)}${paragraph('Required agreement:',n.requiredAgreement)}
    ${paragraph('When needed:',timing(n.criticalTiming))}${paragraph('Necessity:',n.necessity)}
    ${n.upstream ? dependency(n.upstream) : ''}
    ${paragraph('Name verification:',n.leaderVerification)}${paragraph('Candidate only:',n.candidateNamedOffice)}
    <p class="small">Evidence date: ${esc(n.evidenceDate || n.evidence?.[0]?.observed || 'Not specified')} ${refs(n.sourceIds)}</p></details>`;
  $('#agreement-view').innerHTML = `<h2>${esc(s.title)}</h2>
    <p class="count">${count == null ? 'Institution count unknown' : `At least ${count} institution${count === 1 ? '' : 's'}; total unknown`} ${refs(g.counts?.countSourceIds || g.counts?.sourceIds || s.sourceIds)}</p>
    <p class="small">For this endpoint: ${esc(g.scope || s.byGeneva)}</p>
    <p class="callout">Recorded general support is different from signing the proposed terms. Unknown means we have not established a position—not opposition or zero approvals.</p>
    <details><summary>What the count includes</summary>
      ${paragraph('',g.counts?.lowerBoundBasis || g.counts?.lowerBoundConditionalOn || g.completeness)}${paragraph('Still unresolved:',g.completeness)}
      <p>Required individual signatures: ${g.totalSignatures == null ? 'unknown' : esc(g.totalSignatures)}. Complete approval fraction: ${g.approvalFraction01 == null ? 'unknown' : esc(g.approvalFraction01)}.</p>
      ${paragraph('Instrument lower bound:',g.instrumentLowerBound)}${paragraph('Advisory role:',g.advisoryNotVeto)}</details>
    ${paragraph('Critical decision:',briefs[s.id]?.[0] || g.criticalBlocker)}
    <details><summary>Full decision and stop condition</summary>${paragraph('',g.criticalBlocker)}${paragraph('Stop condition:',s.stopRule)}</details>
    <div class="node-list">${g.nodes.map(node).join('')}</div>
    <details><summary>Recorded support and practical tensions</summary>
      ${(g.alignmentObservations || []).map(a => `<p><strong>${esc(a.status.replaceAll('-', ' '))}</strong> · ${esc(a.date)}</p>${paragraph('Scope:',a.statusScope || 'The observation below only; not consent to our proposed terms.')}${paragraph('',a.observation)}${paragraph('Open tension:',a.practicalDisagreement || a.practicalTension)}${refs(a.sourceIds)}`).join('') || '<p>No separate alignment observation recorded.</p>'}
    </details>`;
  $('#agreement-view').insertAdjacentHTML('beforeend', `<details><summary>Required combinations of approvals · AND / OR</summary>${(g.dependencies || []).map(dependency).join('') || '<p>The complete dependency chain is not established.</p>'}</details>`);
}
function renderNumbers() {
  const sorted = windows => [...windows].sort((a,b) => (a.date || a.start || '').localeCompare(b.date || b.start || ''));
  const upcoming = data.windows.filter(w => w.status === 'upcoming');
  const dated = sorted(upcoming.filter(w => w.date || w.start));
  const broad = upcoming.filter(w => !w.date && !w.start);
  $('#numbers-view').innerHTML = `
    <h2>Five measured examples</h2><p>These describe economic exposure, capacity or existing tests. They do not measure the proposed safeguards’ effects.</p>
    <div class="measure-grid">${data.examples.map(e => `<article class="measure">
      <span class="small">${e.kind === 'proxy' ? 'Proxy measure' : 'Context only'}</span><h3>${esc(e.label)} ${refs(e.sourceIds)}</h3>
      <p class="value">${esc(e.displayValue)}</p>
      <p class="fraction">${esc(fractionText(e))}</p><p class="small">${esc(e.numerator.period)}</p>
      <details><summary>Population and limits</summary>
        ${paragraph('Exact inputs:', `${e.numerator.value} / ${e.denominator.value} ${e.numerator.unit}`)}
        ${paragraph('Numerator:',e.numerator.population)}${paragraph('Denominator:',e.denominator.population)}
        ${paragraph('Denominator period:',e.denominator.period)}${paragraph('',e.interpretation)}
        ${paragraph('Not measured:',e.notEstablished.join('; '))}
      </details></article>`).join('')}</div>
    <h2>Two route measures to build</h2>
    <p><strong>Covered activity / all relevant activity</strong><br>Count activity covered by an effective duty, evidence collection and an enforceable remedy.</p>
    <p><strong>Required approvals secured / all required approvals</strong><br>Identify everyone who must agree. Show any outstanding veto separately.</p>
    <p class="callout">We still need complete coverage and approval records to calculate these for each route. The original map uses estimates; these fractions will require evidence.</p>
    <details><summary>Measurement definitions and limits</summary>${Object.values(data.measurement).filter(v => v && !Array.isArray(v) && v.label).map(m => `<h3>${esc(m.label)}</h3>${paragraph('',m.description || m.reason)}${paragraph('Limits:',m.limits)}`).join('')}</details>
    <div class="dates"><h2>Dates to act on</h2><p class="small">Checked ${esc(data.observed)}.</p>${dated.map(windowRow).join('')}
      <details><summary>Announced targets without exact dates</summary>${broad.map(windowRow).join('')}</details>
      <details><summary>Timing still unknown</summary>${data.windows.filter(w => w.status === 'unknown').map(windowRow).join('')}</details>
      <details><summary>Closed opportunities</summary>${sorted(data.windows.filter(w => w.status === 'past')).map(windowRow).join('')}</details>
      <details><summary>Our proposed test dates</summary>${[...data.proposedMilestones].sort((a,b) => a.date.localeCompare(b.date)).map(m => `<article class="date-row"><div class="date">${esc(m.date)}</div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></article>`).join('')}
        <details><summary>Route-specific test dates</summary>${sorted(data.windows.filter(w => w.status === 'proposed')).map(windowRow).join('')}</details>
      </details>
    </div>
    <details id="source-notes"><summary>Sources · ${data.sources.length} records</summary>${data.sources.map(s => `<article class="date-row"><h3>${refs([s.id])} ${esc(s.title)}</h3>${paragraph('Supports:',s.claim)}${paragraph('Locator:',s.locator || s.shortLocator)}<p class="small">Published: ${esc(s.published || 'Unknown')} · observed: ${esc(s.observed || data.observed)} · event: ${esc(s.eventDate || 'Not specified')}</p>${paragraph('Access:',s.access)}${s.unread || s.inaccessible ? '<p><strong>Unread or inaccessible material; see access note.</strong></p>' : ''}</article>`).join('')}</details>`;
}
function shareUrl(id, view) { return `?scenario=${encodeURIComponent(id)}&view=${encodeURIComponent(view)}`; }
function readState() {
  const p = new URLSearchParams(location.search);
  const scenario = data.scenarios.find(s => s.id === p.get('scenario')) || data.scenarios[0];
  const view = ['routes','agreement','numbers'].includes(p.get('view')) ? p.get('view') : 'routes';
  return {scenario, view};
}
function render() {
  current = readState();
  $('#scenario').value = current.scenario.id;
  renderRoute(current.scenario);
  renderAgreement(current.scenario);
  for (const v of ['routes','agreement','numbers']) {
    $(`#${v}-view`).hidden = current.view !== v;
    $(`[data-view="${v}"]`).setAttribute('aria-pressed', String(current.view === v));
  }
  $('#scenario-control').hidden = current.view === 'numbers';
  if (location.hash === '#protocol') { $('#protocol').open = true; $('#protocol').scrollIntoView(); }
}
function navigate(id, view) { history.pushState(null, '', shareUrl(id, view)); render(); }
async function init() {
  try {
    const response = await fetch('../data/geneva-research.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
    if (!data.scenarios?.length || !data.sources?.length) throw new Error('Research data is incomplete');
    sourceMap = new Map(data.sources.map(s => [s.id, s]));
    $('#snapshot').innerHTML = `Evidence observed ${esc(data.observed)} · Summit dates ${refs(data.summit.sourceIds)}`;
    $('#scenario').innerHTML = data.scenarios.map(s => `<option value="${esc(s.id)}">${esc(s.title)} · ${esc(statusLabels[s.status])}</option>`).join('');
    renderNumbers(); render();
    $('#scenario').addEventListener('change', e => navigate(e.target.value, current.view));
    document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => navigate(current.scenario.id, b.dataset.view)));
    document.addEventListener('click', e => { const a = e.target.closest('[data-expand]'); if (a) { const target = document.getElementById(a.dataset.expand); if (target) target.open = true; } });
    window.addEventListener('popstate', render);
    $('#research').hidden = false;
    $('#load-status').hidden = true;
    if (location.hash === '#protocol') $('#protocol').scrollIntoView();
  } catch (error) {
    $('#research').hidden = true;
    $('#load-status').className = 'error';
    $('#load-status').setAttribute('role', 'alert');
    $('#load-status').textContent = `The research could not load (${error.message}). Reload to retry, or use the full research report below.`;
  }
}
init();
