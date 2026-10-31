import { validateDataset, displayRoutes, safeUrl } from './model.mjs';
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
try {
  const response = await fetch('../data/routes.json');
  if (!response.ok) throw Error('Research could not be loaded.');
  const data = validateDataset(await response.json());
  const params = new URLSearchParams(location.search);
  const stage = params.get('stage') === 'before' ? 'before' : 'after';
  const route = displayRoutes(data, stage).find(r => r.id === params.get('route'));
  if (!route) throw Error('Route not found. Return to the map to select a route.');
  document.title = `${route.shortLabel} · Evidence`;
  document.querySelector('#back').href = `./#${new URLSearchParams({route:route.id, stage})}`;
  const section = (id, title, fields) => `<section id="${id}"><h2>${title}</h2>${fields.map(([label, text]) => `<h3>${label}</h3><p>${esc(text)}</p>`).join('')}</section>`;
  document.querySelector('#research').innerHTML = `<p class="eyebrow">RESEARCH RECORD · ${esc(data.observed)} · ${stage === 'before' ? 'RECONSTRUCTED INITIAL LEAD' : 'REVIEWED SNAPSHOT'}</p><h1>${esc(route.title)}</h1><p>${esc(route.status)} · ${esc(route.confidence)} evidence confidence</p>`
    + section('mechanism', 'Who acts, and how', [['Actor',route.actor],['Instrument',route.instrument],['Obligor',route.obligor],['Proposed safeguard',route.safeguard],['Verification',route.verification],['Remedy',route.remedy],['Decision window',route.window]])
    + section('gaps', 'What needs resolving', [['Evidence establishes',route.evidenceSummary],['Unresolved',route.gap],['Next question',route.nextQuestion]])
    + section('assessment', 'Why these ratings', [['Feasibility '+route.feasibility+'/5 · range '+route.feasibilityRange.join('–'),route.feasibilityRationale],['Potential impact '+route.impact+'/5 · range '+route.impactRange.join('–'),route.impactRationale],['Incentives',route.incentives.join(' ')],['Constraints',route.constraints.join(' ')]])
    + `<section id="sources"><h2>Sources</h2>${route.sources.map(s => `<article class="source-card"><a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><p>${esc(s.claim)}</p><p>${esc(s.locator)}</p><small>Published: ${esc(s.published || 'unknown')} · Checked: ${esc(s.observed)} · ${esc(s.access)}</small></article>`).join('')}</section><p>Ratings are editorial judgments, not measured risk reductions. Ranges represent plausible disagreement, not statistical intervals.</p>`;
  document.getElementById(location.hash.slice(1))?.scrollIntoView();
} catch(error) { document.querySelector('#research').textContent = error.message; }
