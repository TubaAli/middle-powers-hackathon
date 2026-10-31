const $ = s => document.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => {
  if (!value || /[\u0000-\u0020\\]/.test(value)) return null;
  try { const u = new URL(value, location.href); return ['http:', 'https:'].includes(u.protocol) ? u.href : null; } catch { return null; }
};
const link = (url, text) => safeURL(url) ? `<a href="${esc(safeURL(url))}"${new URL(safeURL(url)).origin !== location.origin ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(text)}</a>` : esc(text);
const list = rows => `<ul>${(rows || []).map(row => `<li>${esc(row)}</li>`).join('')}</ul>`;
// Structured text renderer uses escaped strings; no source HTML is trusted.
const structured = value => value == null ? '<span class="meta">Unknown</span>' : Array.isArray(value) ? `<ul>${value.map(v => `<li>${structured(v)}</li>`).join('')}</ul>` : typeof value === 'object' ? `<dl>${Object.entries(value).map(([k,v]) => `<dt>${esc(k.replace(/([a-z])([A-Z])/g,'$1 $2').replaceAll('_',' '))}</dt><dd>${structured(v)}</dd>`).join('')}</dl>` : esc(value);
const labels = {'baseline':'Original weights','implementation-delivery':'Delivery weights','frontier-risk-proxy':'Frontier-risk proxy','rights-accountability-proxy':'Rights / accountability proxy','international-scale-proxy':'International-scale proxy'};
let data, state;
const sourceRefs = ids => (ids || []).map(id => `<a href="#src-${esc(id)}">${esc(id)}</a>`).join(' · ');
const routeLinks = ids => (ids || []).map(id => link(`?${new URLSearchParams({route:id,scenario:state.scenario,prior:state.prior})}`, data.routes.find(r => r.id === id)?.shortLabel || id)).join(' · ');
const selected = () => data.routes.find(r => r.id === state.route);
function save() { history.replaceState(null, '', `?${new URLSearchParams({route:state.route,scenario:state.scenario,prior:state.prior,...(state.search?{q:state.search}:{})})}${location.hash}`); }
function sourceHTML(source) {
  return `<article class="source" id="src-${esc(source.id)}"><h3>${link(source.href, source.title || source.id)}</h3><p><span class="tag">${esc(source.access || 'unknown')}</span><span class="tag">${esc(source.sourceCheck)}</span>${source.inherited ? '<span class="tag">Inherited packet source</span>' : ''}</p><p>${esc(source.locator)}</p><p>${esc(source.whatItSupports || '')}</p><p class="meta">Published: ${esc(source.published || 'unknown')} · Event: ${esc(source.eventDate || 'unspecified')} · Observed: ${esc(source.accessed || source.observed || data.observed)}</p>${source.revisionDate ? `<p class="meta">Revision: ${esc(source.revisionDate)}</p>` : ''}<p class="meta">${esc(source.id)} · ${source.ledgerHref ? link(source.ledgerHref,'Original ledger') : ''}${source.checkFindings.length ? ` · Check: ${esc(source.checkFindings.join(', '))}` : ''}</p></article>`;
}
function sourcesForRoute(status = '') {
  const r = selected();
  const rows = r.sourceIds.map(id => data.sources[id]).filter(s => !status || s.access === status);
  $('#source-list').innerHTML = rows.length ? rows.map(sourceHTML).join('') : '<p class="empty">No sources with this reading status for this route.</p>';
}
function renderRoute() {
  const r = selected();
  const corrections = r.checkFindings.map(f => `<details class="note warning"><summary>${esc(f.id)} · ${data.appliedErrataIds?.some(id=>id.startsWith('ERR-'+f.id.replace('-','')))?'Correction applied to public view':esc(f.status)}</summary><p>${esc(f.finding)}</p><p>${esc(f.correction)}</p><p class="meta">Original review status: ${esc(f.status)}. Frozen inputs remain unchanged.</p></details>`).join('');
  $('#route-content').innerHTML = `<article data-route="${esc(r.id)}"><p class="meta">${esc(r.countries.join(' · '))} · <span class="tag">${esc(r.assessment)}</span></p><h2>${esc(r.shortLabel)}</h2><p class="lead">${esc(r.headline)}</p><div class="note"><strong>Next discriminating test</strong><p>${esc(r.decisionTest)}</p></div><p>${link(`./#basis=model&route=${encodeURIComponent(r.id)}`,'Original plot')} · ${link(`quantitative-details.html?route=${encodeURIComponent(r.id)}&basis=model`,'Exact model / route')} · ${link(`coordinate-evidence.html?route=${encodeURIComponent(r.id)}`,'Earlier evidence')} · ${link(r.ledgerHref,'New source ledger')}</p>${corrections}<details><summary>New evidence: support, challenges and gaps</summary><div class="columns"><div><h3>What supports the route</h3>${list(r.supports)}</div><div><h3>What challenges it</h3>${list(r.challenges)}</div></div><h3>Claim-level evidence</h3>${r.newEvidence.map(e => `<div class="claim"><p>${esc(e.claim)}</p><p class="meta">${esc(e.locator)} · ${sourceRefs(e.sourceIds)}</p></div>`).join('')}<h3>Still unknown</h3>${list(r.unknowns)}<h3>Implications—not a score update</h3>${structured(r.scoreImplications)}</details><details><summary>Original model reasoning (unchanged)</summary><p><strong>x:</strong> ${esc(r.original.xBasis)}</p><p><strong>y:</strong> ${esc(r.original.yBasis)}</p>${structured(r.original.factors)}</details><details><summary>New synthesis findings for this route</summary>${r.findingIds.map(id => {const f=data.findings.find(f=>f.id===id); return `<h3>${esc(f.id)} · ${esc(f.title)}</h3><p>${esc(f.body)}</p><p class="meta">${sourceRefs(f.sourceIds)}</p>`;}).join('')}</details><details id="route-sources"><summary>Sources and reading status (${r.sourceIds.length})</summary><label class="source-filter">Show reading status<select id="source-status"><option value="">All statuses</option><option value="read">Read</option><option value="partial">Partial</option><option value="inaccessible">Inaccessible</option><option value="unresolved">Unresolved alias</option></select></label><div id="source-list"></div></details></article>`;
  sourcesForRoute();
  $('#source-status').addEventListener('change', e => sourcesForRoute(e.target.value));
}
function renderPlot() {
  const s = data.scenarios.find(s => s.regime === state.scenario && String(s.prior) === state.prior);
  const base = data.scenarios.find(s => s.regime === 'baseline' && s.prior === .5);
  const p = s.routes.find(p => p.id === state.route), b = base.routes.find(p => p.id === state.route);
  const x = v => 48 + v * 360, y = v => 318 - v * 270;
  $('#plot').innerHTML = `<svg viewBox="0 0 450 370" role="group" aria-label="Original editorial score sensitivity; select a point or use the route selector"><title>Scenario editorial scores for all 32 routes</title>${[0,.25,.5,.75,1].map(v=>`<path d="M48 ${y(v)} H408 M${x(v)} 48 V318" fill="none" stroke="#e1e7e3"/><text x="30" y="${y(v)+4}" text-anchor="end">${v*100}</text><text x="${x(v)}" y="340" text-anchor="middle">${v*100}</text>`).join('')}<text x="228" y="365" text-anchor="middle">Feasibility index →</text><text transform="translate(13 190) rotate(-90)" text-anchor="middle">Potential impact index →</text><line x1="${x(b.x)}" y1="${y(b.y)}" x2="${x(p.x)}" y2="${y(p.y)}" stroke="#0f5e52" stroke-width="2"/><circle cx="${x(b.x)}" cy="${y(b.y)}" r="10" fill="none" stroke="#192b33" stroke-width="2"/>${[...s.routes].sort((a,b)=>(a.id===state.route)-(b.id===state.route)).map(point=>`<circle class="point ${point.id===state.route?'selected':''}" tabindex="0" role="button" data-route="${esc(point.id)}" aria-label="${esc(data.routes.find(r=>r.id===point.id).shortLabel)}" aria-pressed="${point.id===state.route}" cx="${x(point.x)}" cy="${y(point.y)}" r="${point.id===state.route?6:4.5}"><title>${esc(data.routes.find(r=>r.id===point.id).shortLabel)}</title></circle>`).join('')}</svg>`;
  $('#comparison-title').textContent = selected().shortLabel;
  $('#coordinates').innerHTML = `<table><caption class="meta">Editorial indices · 0–100</caption><thead><tr><th>Score</th><th>Original</th><th>Scenario</th></tr></thead><tbody><tr><th>Feasibility</th><td>${(b.x*100).toFixed(1)}</td><td>${(p.x*100).toFixed(1)}</td></tr><tr><th>Potential impact</th><td>${(b.y*100).toFixed(1)}</td><td>${(p.y*100).toFixed(1)}</td></tr></tbody></table>`;
  $('#weights').innerHTML = `<p>Audit-only rank: ${p.rank} of 32 · ${p.non_dominated ? 'Non-dominated' : 'Dominated'} in this scenario.</p>${structured(s.weights)}`;
}
function choose(id) {
  state.route = id; $('#route').value = id; save(); renderRoute(); renderPlot();
}
function filterRoutes() {
  const q = state.search.toLowerCase();
  const rows = data.routes.filter(r=>JSON.stringify([r.shortLabel,r.countries,r.headline,r.decisionTest]).toLowerCase().includes(q));
  $('#route').innerHTML = rows.map(r=>`<option value="${esc(r.id)}">${esc(r.shortLabel)}</option>`).join('');
  $('#count').textContent = `${rows.length} of 32 routes · every route has a new evidence review and next test`;
  $('#route').disabled = !rows.length;
  if (!rows.length) { $('#route-content').innerHTML = '<p class="empty">No matching routes. Clear the search or reset.</p>'; save(); return; }
  choose(rows.some(r=>r.id===state.route)?state.route:rows[0].id);
}
function openSource(id) {
  if (!$('#src-'+CSS.escape(id))) {
    const r=data.routes.find(r=>r.sourceIds.includes(id));
    if (r) {state.search='';$('#search').value='';state.route=r.id;filterRoutes();}
  }
  if (!$('#src-'+CSS.escape(id)) && data.sources[id]) {
    if (!$('#source-list')) {state.search='';$('#search').value='';filterRoutes();}
    $('#source-list').insertAdjacentHTML('afterbegin', `<p class="meta">Additional citation from the synthesis / viewpoint ledger</p>${sourceHTML(data.sources[id])}`);
  }
  const el=$('#src-'+CSS.escape(id));
  if (el) {$('#route-sources').open=true;el.scrollIntoView({block:'center'});}
}
async function init() {
  const response = await fetch('../data/stress-tests.json'); if (!response.ok) throw Error(`Data request failed (${response.status})`);
  data = await response.json();
  const params = new URLSearchParams(location.search);
  state = {route:params.get('route') || 'jp-procurement-safety-evidence',scenario:params.get('scenario') || 'baseline',prior:params.get('prior') || '0.5',search:params.get('q') || ''};
  if (!selected()) state.route='jp-procurement-safety-evidence';
  if (!data.scenarios.some(s=>s.regime===state.scenario)) state.scenario='baseline';
  if (!['0.25','0.5','0.75'].includes(state.prior)) state.prior='0.5';
  $('#scenario').innerHTML = [...new Set(data.scenarios.map(s=>s.regime))].map(id=>`<option value="${esc(id)}">${esc(labels[id] || id)}</option>`).join('');
  $('#scenario').value=state.scenario;$('#prior').value=state.prior;$('#search').value=state.search;
  $('#viewpoints').innerHTML = data.viewpoints.map(v=>`<details><summary>${esc(v.title)}</summary><h3>Recommendation</h3>${structured(v.recommendation)}<h3>Dissent retained</h3>${structured(v.dissent)}<p>${routeLinks(v.recommendation.routeIds)}</p></details>`).join('');
  $('#baseline-comparison').innerHTML=structured(data.baselineComparison);
  $('#coverage').innerHTML=data.coverage.map(p=>`<details><summary>${esc(p.pointId)} · ${esc(p.status)}</summary><p>${esc(p.claim)}</p><p>${esc(p.reason)}</p><p class="meta">${esc(p.sourceLocators?.join(' · '))}</p><p>${sourceRefs(p.sourceIds)}</p>${structured(p.target)}</details>`).join('');
  $('#idea-list').innerHTML=data.ideas.map(i=>`<details><summary>${esc(i.id)} · ${esc(i.title)}</summary><p>${esc(i.proposal)}</p><p>${routeLinks(i.routeIds)}</p>${structured(Object.fromEntries(Object.entries(i).filter(([k])=>!['id','title','proposal','routeIds','sourceIds'].includes(k))))}<p class="meta">${sourceRefs(i.sourceIds)}</p></details>`).join('');
  $('#method').innerHTML=`<p>Retrieval-first research and dissent-preserving synthesis, adapted rather than a full run of either upstream system.</p>${structured(data.method.adaptation)}${data.method.sources.map(s=>`<h3>${link(s.repository,s.repository.split('/').at(-1))}</h3><p class="meta">Pinned commit: ${esc(s.commit)}</p><p>${esc(s.scope_limit)}</p>`).join('')}`;
  $('#limitations').innerHTML=`<p>${esc(data.sourceCheck.conclusion)}</p><p>Source checking is scoped, not blanket verification. “Read” can mean relevant sections; counts do not imply independent corroboration.</p>${data.errata?'<p class="note">Public errata overlay applied. Frozen inputs remain available in the downloads.</p>':'<p class="note warning">No errata overlay received. Source-check qualifications are shown beside affected routes.</p>'}${list(data.limitations)}${list(data.auditLimitations)}<h3>Source-check scope and remaining gaps</h3>${structured(data.sourceCheck.remainingLimitations)}`;
  $('#downloads').innerHTML=data.downloads.map(d=>`<li>${link(d.href,d.path)}${d.sha256?`<br><small>SHA256: ${esc(d.sha256)}</small>`:''}</li>`).join('');
  $('#route').addEventListener('change',e=>choose(e.target.value));
  $('#search').addEventListener('input',e=>{state.search=e.target.value;filterRoutes();});
  $('#filters').addEventListener('submit',e=>e.preventDefault());
  $('#filters').addEventListener('reset',e=>{e.preventDefault();state.search='';$('#search').value='';state.route='jp-procurement-safety-evidence';filterRoutes();});
  for (const id of ['scenario','prior']) $('#'+id).addEventListener('change',e=>{state[id]=e.target.value;save();renderPlot();});
  $('#plot').addEventListener('click',e=>{const id=e.target.closest('[data-route]')?.dataset.route;if(id){state.search='';$('#search').value='';state.route=id;filterRoutes();}});
  $('#plot').addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&e.target.dataset.route){e.preventDefault();const id=e.target.dataset.route;state.search='';$('#search').value='';state.route=id;filterRoutes();$('#plot [data-route="'+CSS.escape(id)+'"]').focus();}});
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#src-"]');if(a){e.preventDefault();openSource(a.getAttribute('href').slice(5));}});
  $('#app').hidden=false;$('#loading').hidden=true;filterRoutes();
}
init().catch(error=>{$('#loading').textContent=`Unable to load the research view: ${error.message}. Use the full report above.`;console.error(error);});
