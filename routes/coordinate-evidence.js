const $ = id => document.getElementById(id);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = v => typeof v === 'object' && v !== null ? JSON.stringify(v, null, 2) : String(v ?? 'Not quantified');
const url = v => {try {const u = new URL(v); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password ? esc(u.href) : '#';} catch {return '#';}};
const local = v => '../' + v.split('/').map(encodeURIComponent).join('/');
const labels = {found_partial:'Some evidence found; important gaps remain', not_found_after_search:'Not found in the recorded searches', inaccessible:'Could not read the needed material', not_publicly_disclosed:'Not publicly disclosed in the inspected material', future_unobserved:'Future event; not yet observed'};
const axisLabel = {x:'x · Feasibility input', y:'y · Reach input', context:'Context only'};
const source = s => `<div class="source"><h3><a href="${s.id==='method-src-local' && s.url==='../../DESIGN.md' ? '../DESIGN.md' : url(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a></h3><p class="meta">${esc(s.id)} · ${esc(s.publisher)}<br>Published: ${esc(s.published || 'not established')} · observed: ${esc(s.observed)} · access: ${esc(s.access)}</p><p>${esc(s.locator)}</p></div>`;
const refs = (ids, scope) => ids.map(id => source(scope.sources.find(s => s.id === id))).join('');
const search = s => `<div class="source"><p><strong>${esc(s.id)}</strong></p><p>Query / URL: ${esc(s.queryOrUrl)}</p><p>Result: ${esc(s.outcome)}</p><p class="meta">Source IDs: ${esc((s.sourceIds || []).join(', '))}</p></div>`;
const fact = (f, scope) => `<section class="input" data-fact-id="${esc(f.id)}" data-axis="${esc(f.axis)}"><span class="tag">${axisLabel[f.axis]}</span><h3>${esc(f.claim)}</h3><p class="value">${esc(text(f.value))} <small>${esc(f.unit)}</small></p><dl><dt>Period · population / scope</dt><dd>${esc(f.period)} · ${esc(f.population)}</dd><dt>Evidence type</dt><dd>${esc(f.evidenceType)}</dd><dt>Use for coordinates</dt><dd>${esc(f.coordinateUse)}</dd></dl><p class="limits">${esc(f.limits)}</p><details><summary>Sources (${f.sourceIds.length}) and exact locator</summary><p><strong>Fact ${esc(f.id)}:</strong> ${esc(f.locator)}</p>${refs(f.sourceIds, scope)}</details></section>`;
const gap = (g, scope) => `<div class="gap"><h3>${esc(g.field)}</h3><span class="tag">${esc(labels[g.status] || g.status)}</span><p>${esc(g.reason)}</p><p><strong>Next evidence:</strong> ${esc(g.nextRetrieval)}</p><details><summary>Recorded searches (${g.searchIds.length})</summary>${g.searchIds.length ? g.searchIds.map(id => search(scope.searches.find(s => s.id === id))).join('') : '<p>No search is attached to this gap; this is not proof of absence.</p>'}</details></div>`;

try {
  const response = await fetch('../data/coordinate-evidence.json', {cache:'no-cache'});
  if (!response.ok) throw Error(`HTTP ${response.status}`);
  const data = await response.json();
  const c = data.counts;
  $('counts').textContent = `${c.routes} routes · ${c.facts} fact records · ${c.numericScalarFacts} numeric scalar entries · ${c.sourceRecords} source records.`;
  $('value-types').textContent = `Also ${c.structuredValueFacts} structured values, ${c.textValueFacts} text values and ${c.nullValueFacts} unquantified values. Source counts include method sources. ${c.searchRecords} retrieval records document the bounded search.`;
  $('observed').textContent = data.observed;
  $('route').innerHTML += data.routes.map(r => `<option value="${esc(r.routeId)}">${esc(r.countries.join(', '))} · ${esc(r.shortLabel)}</option>`).join('');
  $('filters').hidden = false;
  const initial = new URLSearchParams(location.search || location.hash.slice(1));
  const initialRoute = initial.get('route') || initial.get('routeID') || '';
  if (data.routes.some(r => r.routeId === initialRoute)) $('route').value = initialRoute;
  $('axis').value = ['x','y','context'].includes(initial.get('axis')) ? initial.get('axis') : '';
  $('search').value = initial.get('q') || '';

  function render(updateURL = true) {
    const selected = $('route').value, axis = $('axis').value, query = $('search').value.trim().toLocaleLowerCase();
    let routeCount = 0, factCount = 0;
    $('results').innerHTML = data.routes.filter(r => !selected || selected === r.routeId).map(r => {
      const scope = data.scopes[r.scopeId];
      const routeMatches = [r.title,r.shortLabel,...r.countries].join(' ').toLocaleLowerCase().includes(query);
      const facts = r.facts.filter(f => (!axis || f.axis === axis) && (routeMatches || JSON.stringify(f).toLocaleLowerCase().includes(query) || f.sourceIds.some(id => JSON.stringify(scope.sources.find(s => s.id === id)).toLocaleLowerCase().includes(query))));
      if (!facts.length && (query || axis)) return '';
      routeCount++; factCount += facts.length;
      // Preserve researcher order within x/y and context. No automated evidence-strength score.
      const ordered = [...facts.filter(f => f.axis !== 'context'), ...facts.filter(f => f.axis === 'context')];
      const lead = ordered.slice(0, 2), rest = ordered.slice(2);
      return `<article class="route" data-route-id="${esc(r.routeId)}"><p class="eyebrow">${esc(r.countries.join(' · '))} · ${facts.length} of ${r.facts.length} inputs shown</p><h2>${esc(r.title)}</h2><p><a href="?route=${encodeURIComponent(r.routeId)}">Link to this evidence</a> · <a href="quantitative-details.html?route=${encodeURIComponent(r.routeId)}">Current map calculations</a></p><p>${esc(r.coordinateReadiness.x)}</p><p>${esc(r.coordinateReadiness.y)}</p><p class="meta">First non-context inputs shown in researcher order—not a ranking of evidence strength.</p>${lead.map(f => fact(f, scope)).join('')}${rest.length ? `<details class="more-inputs"><summary>All other matching inputs (${rest.length})</summary>${rest.map(f => fact(f, scope)).join('')}</details>` : ''}<details><summary>What is missing (${r.gaps.length} gaps)</summary>${r.gaps.map(g => gap(g, scope)).join('')}</details><p class="meta"><a href="${local(`research_notes/Route coordinate evidence/${r.scopeId}.json`)}">Original regional ledger</a></p></article>`;
    }).join('') || '<p class="note">No matching inputs. Clear the search or reset the filters.</p>';
    $('results-count').textContent = `${routeCount} routes · ${factCount} matching inputs`;
    if (updateURL) {
      const params = new URLSearchParams();
      if(selected) params.set('route', selected);
      if(axis) params.set('axis', axis);
      if(query) params.set('q', $('search').value.trim());
      history.replaceState(null, '', location.pathname + (params.size ? '?' + params : ''));
    }
  }
  $('filters').addEventListener('submit', e => e.preventDefault());
  $('filters').addEventListener('input', () => render());
  $('filters').addEventListener('reset', () => { $('search').value=''; $('route').value=''; $('axis').value=''; render(); });
  render(false);
  const m = data.method, follow = m.boundedFollowup;
  $('method-content').innerHTML = `<p>${esc(follow.summary ? 'Saved input files and inspection receipts supersede earlier access failures where indicated below.' : '')}</p><p class="note">${esc(follow.supersedes)}</p><h3>Recovered country coverage</h3><ul>${Object.entries(follow.recoveredTargetCountryCoverage).map(([k,v])=>`<li>${esc(k)}: ${esc(v)} of ${esc(follow.targetCountries)} target countries</li>`).join('')}</ul><details><summary>Technical access gaps solved; remaining limits</summary><h3>Solved</h3><ul>${follow.accessGapsSolved.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>Still missing</h3><ul>${follow.remainingGaps.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><details><summary>Method findings (${m.findings.length})</summary>${m.findings.map(f=>`<div class="dataset"><p>${esc(f.claim)}</p><details><summary>Sources</summary>${refs(f.sourceIds,m)}</details></div>`).join('')}</details><details><summary>Dataset catalogue (${m.datasets.length}; original access notes may be superseded)</summary>${m.datasets.map(d=>`<div class="dataset"><h3><a href="${url(d.url)}">${esc(d.title)}</a></h3><p>${esc(d.countryCoverage)} · ${esc(d.period)}</p><p>Original access note: ${esc(d.access)}</p><p>Fields: ${esc(d.fields.join('; '))}</p><p>Use: ${esc(d.coordinateUse)}</p><p class="limits">${esc(d.limitations.join('; '))}</p><details><summary>Sources</summary>${refs(d.sourceIds,m)}</details></div>`).join('')}</details><details><summary>Proposed method—not fitted coordinates</summary><p>${esc(m.recommendation.x)}</p><p>${esc(m.recommendation.y)}</p><h3>Do not use</h3><ul>${m.recommendation.doNotUse.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><details><summary>Cross-route retrieval searches (${m.searches.length})</summary>${m.searches.map(search).join('')}</details>`;
  $('downloads').innerHTML = `<ul class="downloads">${data.downloads.map(d=>`<li><a href="${local(d.path)}" download>${esc(d.path.split('/').slice(-2).join('/'))}</a> · ${d.bytes.toLocaleString()} bytes<br><code>SHA256 ${esc(d.sha256)}</code></li>`).join('')}</ul>`;
} catch(e) {
  $('counts').textContent = `Could not load evidence: ${e.message}. Try the complete JSON download below.`;
}
