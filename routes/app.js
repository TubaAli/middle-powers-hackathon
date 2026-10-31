import { COORDINATION, validateDataset, filterRoutes, displayRoutes, comparePair, safeUrl } from './model.mjs';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
const state = { search:'', coordination:'', mechanism:'', region:'', route:'', pair:'', stage:'after', view:'map', tab:'route' };
let data;
const confidenceOpacity = { Low: .48, Medium: .75, High: 1 };
const number = route => data.routes.findIndex(r => r.id === route.id) + 1;
const sign = value => value > 0 ? `+${value}` : String(value);
const sourceLink = source => `<a href="${esc(safeUrl(source.url) || '#')}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ↗</a>`;

function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  for (const key of ['search', 'coordination', 'mechanism', 'region', 'route', 'pair', 'stage', 'view']) state[key] = params.get(key) || ({ stage:'after', view:'map' }[key] ?? '');
  if (!['before', 'after'].includes(state.stage)) state.stage = 'after';
  if (!['map', 'list'].includes(state.view)) state.view = 'map';
  for (const key of ['coordination', 'mechanism', 'region']) if (![...$(`#${key}`).options].some(o => o.value === state[key])) state[key] = '';
  for (const key of ['search', 'coordination', 'mechanism', 'region']) $(`#${key}`).value = state[key];
}

function writeHash() {
  const params = new URLSearchParams();
  for (const key of ['route', 'pair', 'stage', 'view', 'search', 'coordination', 'mechanism', 'region']) {
    if (state[key] && !(['stage','view'].includes(key) && ['after','map'].includes(state[key]))) params.set(key, state[key]);
  }
  history.replaceState(null, '', `${location.pathname}${location.search}#${params}`);
}

function renderPlot(routes) {
  const x = rating => 94 + (rating - .5) * 120, y = rating => 441 - (rating - .5) * 80;
  const positions = new Map();
  for (const route of routes) {
    const ties = routes.filter(r => r.impact === route.impact && r.feasibility === route.feasibility);
    const index = ties.findIndex(r => r.id === route.id);
    positions.set(route.id, { x:x(route.feasibility) + (index - (ties.length - 1) / 2) * 30, y:y(route.impact) });
  }
  let svg = `<svg viewBox="0 0 740 520" aria-label="Feasibility versus potential safety impact" role="group"><defs><marker id="arrow-head" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#087f78"/></marker></defs><rect x="94" y="41" width="600" height="400" rx="4" class="plot-bound"/>`;
  for (let i = 0; i <= 5; i++) svg += `<line x1="${94 + i * 120}" y1="41" x2="${94 + i * 120}" y2="441" class="grid-line"/><line x1="94" y1="${41 + i * 80}" x2="694" y2="${41 + i * 80}" class="grid-line"/>`;
  for (let i = 1; i <= 5; i++) svg += `<text class="axis-text" x="${x(i)}" y="463" text-anchor="middle">${i}</text><text class="axis-text" x="78" y="${y(i) + 4}" text-anchor="end">${i}</text>`;
  svg += `<text class="axis-title" x="394" y="495" text-anchor="middle">Implementation feasibility →</text><text class="axis-text" x="96" y="480">Harder to implement</text><text class="axis-text" x="694" y="480" text-anchor="end">More achievable</text><text class="axis-title" transform="translate(24 241) rotate(-90)" text-anchor="middle">Potential safety impact if implemented →</text><text class="axis-text" x="94" y="25">Broader potential benefit · conditional on adoption</text>`;
  const selected = routes.find(r => r.id === state.route);
  if (selected && $('#uncertainty').checked) {
    const [xl,xh] = selected.feasibilityRange, [yl,yh] = selected.impactRange;
    svg += `<rect class="range ${selected.coordination}" x="${x(xl) - 24}" y="${y(yh) - 22}" width="${(xh-xl)*120 + 48}" height="${(yh-yl)*80 + 44}" rx="9"><title>Judgment range: feasibility ${xl}–${xh}; impact ${yl}–${yh}. Not a statistical interval.</title></rect>`;
  }
  const pair = comparePair(routes, state.pair);
  if (pair) {
    const a = positions.get(pair.national.id), b = positions.get(pair.coordinated.id);
    svg += `<path d="M${a.x} ${a.y} L${b.x} ${b.y}" class="pair-line" marker-end="url(#arrow-head)"><title>National to coordinated proposal; editorial comparison, not observed causal change.</title></path>`;
  }
  for (const route of routes) {
    const pos = positions.get(route.id), isSelected = route.id === state.route;
    svg += `<g class="plot-dot ${route.coordination}${isSelected ? ' selected':''}" transform="translate(${pos.x} ${pos.y})" role="button" tabindex="0" data-route="${esc(route.id)}" aria-label="${esc(`${number(route)}. ${route.title}. Feasibility ${route.feasibility} of 5, impact ${route.impact} of 5. ${COORDINATION[route.coordination]}. ${route.confidence} evidence confidence.`)}" aria-pressed="${isSelected}"><title>${esc(route.title)} — select to inspect evidence</title><circle r="12" style="fill-opacity:${confidenceOpacity[route.confidence]}"/><text y="3.5" text-anchor="middle">${number(route)}</text></g>`;
    if (isSelected) svg += `<text x="${pos.x}" y="${pos.y-22}" class="point-name" text-anchor="middle">${esc(route.shortLabel)}</text>`;
  }
  $('#plot').innerHTML = svg + '</svg>';
  $('#plot-index').innerHTML = routes.map(route => `<button class="${route.coordination}" data-route="${esc(route.id)}" aria-pressed="${route.id === state.route}"><b>${number(route)}</b>${esc(route.shortLabel)}</button>`).join('');
}

function renderList(routes) {
  $('#route-list').innerHTML = routes.map(route => `<button class="route-row ${route.coordination}" data-route="${esc(route.id)}" aria-pressed="${state.route === route.id}"><span class="row-number">${number(route)}</span><small>${esc(COORDINATION[route.coordination])} · ${esc(route.status)}</small><strong>${esc(route.title)}</strong><small>${esc(route.countries.join(' · '))} &nbsp; / &nbsp; Feasibility ${route.feasibility} · Impact ${route.impact} · ${esc(route.confidence)} confidence</small></button>`).join('');
}

function renderDetail(route) {
  if (!route) { $('#route-detail').innerHTML = '<h2>No matching route</h2><p>Reset the filters to explore the full sample.</p>'; return; }
  const chain = [['Actor',route.actor],['Instrument',route.instrument],['Obligor',route.obligor],['Safeguard',route.safeguard],['Verification',route.verification],['Remedy',route.remedy],['Decision window',route.window]];
  const routeBody = `<dl class="route-chain">${chain.map(([key,value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><div class="gap"><strong>Next discriminating question</strong>${esc(route.nextQuestion)}</div>`;
  const evidenceBody = `<h3>What the evidence establishes</h3><p>${esc(route.evidenceSummary)}</p><div class="gap"><strong>What remains unresolved</strong>${esc(route.gap)}</div>${route.sources.map(source => `<article class="source-card">${sourceLink(source)}<p>${esc(source.claim)}</p><small>${esc(source.locator)}<br>Published: ${esc(source.published || 'not established')} · Checked: ${esc(source.observed)} · ${esc(source.access)}</small></article>`).join('')}`;
  const assessmentBody = `<h3>Why feasibility is ${route.feasibility}/5</h3><p>${esc(route.feasibilityRationale)}</p><h3>Why potential impact is ${route.impact}/5</h3><p>${esc(route.impactRationale)}</p><h3>Shared incentives</h3><ul>${route.incentives.map(text => `<li>${esc(text)}</li>`).join('')}</ul><h3>Costs and obstacles</h3><ul>${route.constraints.map(text => `<li>${esc(text)}</li>`).join('')}</ul><p class="small">These are editor-assigned ordinal judgments. Ranges are plausible disagreement, not calibrated forecasts. Coordination carries no automatic bonus.</p>`;
  $('#route-detail').innerHTML = `<div class="detail-top"><span class="coord-tag ${route.coordination}"><i class="dot"></i>${esc(COORDINATION[route.coordination])}</span><span>ROUTE ${String(number(route)).padStart(2,'0')}</span></div><h2>${esc(route.title)}</h2><p class="detail-location">${esc(route.countries.join(' · '))} &nbsp; / &nbsp; ${esc(route.mechanism)}</p><span class="status">${esc(route.status)}</span><span class="status">${esc(route.confidence)} evidence confidence</span><p class="detail-safeguard">${esc(route.safeguard)}</p><div class="score-grid">${['feasibility','impact'].map(axis => `<div class="score"><b>${route[axis]}<small> / 5</small></b><span>${axis === 'impact' ? 'Potential impact' : 'Implementation feasibility'}</span><small>Judgment range ${route[axis+'Range'].join('–')}</small></div>`).join('')}</div><div class="detail-tabs" role="tablist" aria-label="Route detail"><button role="tab" data-detail="route" aria-selected="${state.tab === 'route'}">The route</button><button role="tab" data-detail="evidence" aria-selected="${state.tab === 'evidence'}">Evidence (${route.sources.length})</button><button role="tab" data-detail="assessment" aria-selected="${state.tab === 'assessment'}">Assessment</button></div><div class="detail-body" role="tabpanel">${state.tab === 'evidence' ? evidenceBody : state.tab === 'assessment' ? assessmentBody : routeBody}</div><div class="detail-footer"><span>Reviewed ${esc(data.observed)} · research lead</span><button id="copy-link">Copy route link</button></div>`;
}

function renderPair(routes) {
  const pairs = [...new Set(data.routes.map(r => r.pairId).filter(Boolean))];
  $('#pair-buttons').innerHTML = pairs.map(id => `<button data-pair="${esc(id)}" aria-pressed="${state.pair === id}">${esc(id[0].toUpperCase()+id.slice(1))} pair ↗</button>`).join('') + `<button data-pair="" aria-pressed="${!state.pair}">Clear comparison</button>`;
  const pair = comparePair(routes, state.pair);
  if (!pair) { $('#pair-detail').innerHTML = '<p>Compare two versions of a similar intervention. Connecting arrows are hypotheses about coordination—not measured policy effects.</p>'; return; }
  $('#pair-detail').innerHTML = `<div class="pair-summary">${[pair.national,pair.coordinated].map(route => `<button data-route="${esc(route.id)}"><span>${esc(COORDINATION[route.coordination])}</span><strong>${esc(route.title)}</strong><span>Feasibility ${route.feasibility}/5 · Potential impact ${route.impact}/5</span></button>`).join('')}</div><p class="pair-verdict">Coordinated minus national: <strong>${sign(pair.impactDelta)} impact tier</strong> · <strong>${sign(pair.feasibilityDelta)} feasibility tier</strong>. Editorial judgments, not estimated treatment effects.</p><p>${esc(pair.coordinated.feasibilityRationale)}</p><p><strong>Hypothesis to test:</strong> ${esc(pair.coordinated.impactRationale)}</p>`;
}

function renderReplay() {
  if (!data.replay) { $('#updates').hidden = true; return; }
  const current = data.routes.find(r => r.id === data.replay.routeId), before = data.replay.before;
  for (const stage of ['before','after']) $(`#replay-${stage}`).setAttribute('aria-pressed', state.stage === stage);
  $('#replay-status').textContent = state.stage === 'before' ? 'Showing the reconstructed initial lead on the map. This is a demonstration state.' : 'Showing the reviewed snapshot. No background search is running.';
  $('#update-card').innerHTML = `<p class="eyebrow">SOURCE-REVIEW REPLAY / ${esc(data.observed)}</p><h3>${state.stage === 'before' ? 'A promising connection. Rights still unclear.' : 'A duty and remedy, located in the draft.'}</h3><div class="update-delta"><span>Feasibility <strong>${before.feasibility} → ${current.feasibility}</strong></span><span>Impact <strong>${before.impact} → ${current.impact}</strong></span><span>Confidence <strong>${before.confidence} → ${current.confidence}</strong></span></div><p>${esc(data.replay.explanation)}</p><p><strong>Still unknown:</strong> ${esc(current.gap)}</p>${sourceLink(current.sources[0])}<p class="small">${esc(data.replay.caveat)}</p>`;
}

function render() {
  const all = displayRoutes(data, state.stage), visible = filterRoutes(all, state);
  if (!visible.some(r => r.id === state.route)) state.route = visible[0]?.id || '';
  $('#visible-count').textContent = `${visible.length} of ${data.routes.length} routes`;
  $('#empty').hidden = visible.length > 0;
  $('#map-panel').hidden = state.view !== 'map' || !visible.length;
  $('#list-panel').hidden = state.view !== 'list' || !visible.length;
  for (const view of ['map','list']) $(`#show-${view}`).setAttribute('aria-pressed', state.view === view);
  renderPlot(visible); renderList(visible); renderDetail(visible.find(r => r.id === state.route)); renderPair(all); renderReplay(); writeHash();
}

function selectRoute(id) { state.route = id; state.tab = 'route'; render(); }

function wire() {
  for (const field of ['search','coordination','mechanism','region']) $(`#${field}`).addEventListener(field === 'search' ? 'input':'change', event => { state[field] = event.target.value; render(); });
  $('#reset').addEventListener('click', () => {
    for (const field of ['search','coordination','mechanism','region']) { state[field] = ''; $(`#${field}`).value = ''; }
    state.pair = ''; render();
  });
  for (const view of ['map','list']) $(`#show-${view}`).addEventListener('click', () => { state.view = view; render(); });
  $('#uncertainty').addEventListener('change', render);
  document.addEventListener('click', async event => {
    const route = event.target.closest('[data-route]');
    if (route) { selectRoute(route.dataset.route); return; }
    const tab = event.target.closest('[data-detail]');
    if (tab) { state.tab = tab.dataset.detail; renderDetail(displayRoutes(data,state.stage).find(r => r.id === state.route)); return; }
    const pair = event.target.closest('[data-pair]');
    if (pair) {
      state.pair = pair.dataset.pair;
      for (const field of ['search','coordination','mechanism','region']) { state[field]=''; $(`#${field}`).value=''; }
      const match = comparePair(data.routes,state.pair); if (match) state.route = match.coordinated.id;
      state.view = 'map'; render(); return;
    }
    if (event.target.id === 'copy-link') {
      try { await navigator.clipboard.writeText(location.href); event.target.textContent = 'Link copied'; }
      catch { event.target.textContent = 'Copy the URL from your address bar'; }
    }
  });
  $('#plot').addEventListener('keydown', event => {
    const dot = event.target.closest('[data-route]');
    if (dot && ['Enter',' '].includes(event.key)) {
      event.preventDefault(); selectRoute(dot.dataset.route);
      $(`#plot [data-route="${CSS.escape(state.route)}"]`)?.focus();
    }
  });
  for (const stage of ['before','after']) $(`#replay-${stage}`).addEventListener('click', () => {
    state.stage = stage; state.route = data.replay.routeId; state.view = 'map'; state.pair=''; state.tab='evidence';
    for (const field of ['search','coordination','mechanism','region']) { state[field]=''; $(`#${field}`).value=''; }
    render();
  });
  window.addEventListener('hashchange', () => { readHash(); render(); });
}

async function main() {
  try {
    const response = await fetch('../data/routes.json');
    if (!response.ok) throw Error(`Route data returned HTTP ${response.status}`);
    data = validateDataset(await response.json());
    $('#snapshot-date').textContent = data.observed;
    $('#route-count').textContent = `${data.routes.length} routes`;
    $('#pair-count').textContent = `${new Set(data.routes.map(r => r.pairId).filter(Boolean)).size} paired comparisons · transparent judgments`;
    $('#loading').hidden = true; $('#workspace').hidden = false;
    readHash(); if (!state.route) state.route = data.replay?.routeId || data.routes[0].id;
    wire(); render();
  } catch(error) {
    $('#loading').hidden = false;
    $('#workspace').hidden = true;
    $('#loading').textContent = `Could not load the route data: ${error.message}. Serve the repository over HTTP and try reloading.`;
    $('#loading').setAttribute('role','alert');
  }
}
main();
