// Middle Powers Leverage Map: stack map + coalition builder.
// Stage weights and shares follow gszep's published leverage model (data/layers.json).

const state = { s: 0.4, view: 'stack', bloc: ['NL', 'JP', 'KR'], stage: null, withdraw: 'CN' };
const VIEWS = ['stack', 'coalition', 'dependence', 'about'];
// Groups that are many countries, not one supplier: left out of HHI squares and the supplier picker.
const FRAGMENTED = ['OTH', 'PROD'];
let L, C, W;

const PRESETS = [
  { name: 'Chip trio', bloc: ['NL', 'JP', 'KR'] },
  { name: 'Chip four', bloc: ['NL', 'JP', 'KR', 'TW'] },
  { name: 'All middle powers', bloc: null },
  { name: 'Law drafters now', bloc: ['JP', 'KR', 'AUCA', 'DE', 'NL'] },
  { name: 'Minerals + chips', bloc: ['PROD', 'AUCA', 'JP', 'KR'] },
];
const NOT_SELECTABLE = ['US', 'CN', 'OTH'];

const $ = (sel) => document.querySelector(sel);
const pct = (x) => (x <= 0 ? '' : x < 0.5 ? '<1%' : `${Math.round(x)}%`);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Weight of a stage at physical share s: linear between w[0] (s=0), w[1] (s=.5), w[2] (s=1).
function weight(stage, s) {
  const [a, b, c] = stage.w;
  return s <= 0.5 ? a + (b - a) * (s / 0.5) : b + (c - b) * ((s - 0.5) / 0.5);
}
const blocShare = (stage, keys) => keys.reduce((t, k) => t + (stage.share[k] ?? 0), 0);
function weighted(keys, s) {
  let num = 0, den = 0;
  for (const st of L.stages) { const w = weight(st, s); den += w; num += w * blocShare(st, keys); }
  return den ? num / den : 0;
}
const middleKeys = () => L.countries.filter((c) => c.middle).map((c) => c.k);
const cname = (k) => L.countries.find((c) => c.k === k)?.name ?? k;
const sname = (k) => L.stages.find((s) => s.k === k)?.name ?? k;

// URL hash keeps state shareable: #coalition&s=40&b=NL,JP,KR
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1).replace(new RegExp(`^(${VIEWS.join('|')})&?`), (m, v) => { state.view = v; return ''; }));
  if (p.has('s')) state.s = Math.min(1, Math.max(0, Number(p.get('s')) / 100 || 0));
  if (p.has('w') && L.countries.some((c) => c.k === p.get('w') && !FRAGMENTED.includes(c.k))) state.withdraw = p.get('w');
  if (p.has('b')) state.bloc = p.get('b').split(',').filter((k) => L.countries.some((c) => c.k === k) && !NOT_SELECTABLE.includes(k));
}
function writeHash() {
  history.replaceState(null, '', `#${state.view}&s=${Math.round(state.s * 100)}&b=${state.bloc.join(',')}&w=${state.withdraw}`);
}

function renderMix() {
  $('#mix').value = state.s;
  $('#mix-val').textContent = `${Math.round(state.s * 100)}% of progress needs new physical things`;
  const us = weighted(['US'], state.s), cn = weighted(['CN'], state.s), mp = weighted(middleKeys(), state.s);
  $('#mix-read').innerHTML = `Weighted supply chain at this mix: US <b>${Math.round(us)}%</b>, China <b>${Math.round(cn)}%</b>, middle powers combined <b>${Math.round(mp)}%</b>.`;
}

function rgbFor(c) {
  return c.k === 'US' ? 'var(--us)' : c.k === 'CN' ? 'var(--cn)' : c.middle ? 'var(--accent)' : 'var(--other)';
}

function renderStack() {
  const ws = L.stages.map((st) => weight(st, state.s));
  const maxW = Math.max(...ws) || 1;
  const head = `<thead><tr><th style="text-align:left">Stage</th>${L.countries
    .map((c) => `<th class="${c.middle ? 'mp' : ''}" title="${esc(c.name)}">${esc(c.name)}</th>`).join('')}</tr></thead>`;
  const rows = L.stages.map((st, i) => {
    const rel = ws[i] / maxW;
    const cells = L.countries.map((c) => {
      const v = st.share[c.k] ?? 0;
      const a = 0.85 * (v / 100) * rel;
      const style = a > 0.005 ? `background: rgba(${rgbFor(c)}, ${a.toFixed(3)});${a > 0.5 ? 'color:#fff' : ''}` : '';
      const used = st.used.includes(c.k) ? '<span class="used" title="Has used this as leverage">●</span>' : '';
      return `<td style="${style}">${pct(v)}${used}</td>`;
    }).join('');
    const low = st.confidence === 'low' ? '<span class="conf-low" title="Low confidence">low conf.</span>' : '';
    return `<tr class="row${state.stage === st.k ? ' sel' : ''}" data-k="${st.k}" tabindex="0"><td class="stage">${esc(st.name)}${low}<span class="wbar"><i style="width:${(rel * 100).toFixed(1)}%"></i></span></td>${cells}</tr>`;
  }).join('');
  const tot = L.countries.map((c) => `<td>${pct(weighted([c.k], state.s))}</td>`).join('');
  $('#stack').innerHTML = `${head}<tbody>${rows}<tr class="tot"><td class="stage">Weighted total</td>${tot}</tr></tbody>`;
  renderStageDetail();
}

function renderStageDetail() {
  const el = $('#stage-detail');
  const st = L.stages.find((s) => s.k === state.stage);
  if (!st) { el.hidden = true; return; }
  const [lo, hi] = st.replicate_years;
  el.hidden = false;
  el.innerHTML = `<h3>${esc(st.name)}</h3>
    <p>${esc(st.note)}</p>
    <p class="meta">Confidence: ${st.confidence} · Weight at this mix: ${weight(st, state.s).toFixed(2)} · Years to replace (team estimate): ${lo}–${hi}. ${esc(st.replicate_note)}</p>
    <p class="meta">Source: <a href="${L._meta.source_url}" target="_blank" rel="noopener">${esc(L._meta.source)}</a></p>`;
}

function renderChips() {
  $('#presets').innerHTML = PRESETS.map((p, i) => `<button data-preset="${i}">${esc(p.name)}</button>`).join('');
  $('#chips').innerHTML = L.countries.filter((c) => !NOT_SELECTABLE.includes(c.k))
    .map((c) => `<button data-k="${c.k}" aria-pressed="${state.bloc.includes(c.k)}">${esc(c.name)}</button>`).join('');
}

function scoreCondition(cond, bloc) {
  let best = { v: 0, stage: null, lever: null };
  for (const lever of cond.levers) for (const k of lever.stages) {
    const v = blocShare(L.stages.find((s) => s.k === k), bloc);
    if (v > best.v) best = { v, stage: k, lever };
  }
  const t = C._meta.thresholds;
  best.level = best.v >= t.strong ? 'strong' : best.v >= t.some ? 'some' : 'weak';
  return best;
}

function renderCoalition() {
  const bloc = state.bloc;
  const b = weighted(bloc, state.s), us = weighted(['US'], state.s), cn = weighted(['CN'], state.s);
  const chokes = L.stages.filter((st) => blocShare(st, bloc) >= 50);
  $('#kpis').innerHTML = bloc.length ? `
    <div class="kpi bloc"><div class="n">${Math.round(b)}%</div><div class="l">Bloc's weighted share of the supply chain</div></div>
    <div class="kpi"><div class="n">${Math.round(us)}%</div><div class="l">US, for comparison</div></div>
    <div class="kpi"><div class="n">${Math.round(cn)}%</div><div class="l">China, for comparison</div></div>
    <div class="kpi"><div class="n">${chokes.length}</div><div class="l">Stages where the bloc holds ≥50%</div></div>`
    : `<p class="empty">Pick at least one country or a preset above.</p>`;

  $('#bars').innerHTML = L.stages.map((st) => {
    const v = blocShare(st, bloc);
    const [lo, hi] = st.replicate_years;
    return `<div class="bar${v >= 50 ? ' choke' : ''}" title="${esc(st.note)}">
      <span class="name">${esc(st.name)}</span>
      <span class="track"><span class="fill" style="width:${Math.min(100, v)}%"></span><span class="half"></span></span>
      <span class="v">${v ? Math.round(v) + '%' : '0%'}${v >= 50 ? ` · ${lo}–${hi}y` : ''}</span></div>`;
  }).join('');

  $('#cards').innerHTML = C.conditions.map((cond) => {
    const sc = scoreCondition(cond, bloc);
    const wins = W.windows.filter((w) => w.conditions.includes(cond.n) && (w.countries.length === 0 || w.countries.some((k) => bloc.includes(k))));
    const why = sc.stage
      ? `Strongest lever: ${sc.lever.mode === 'host' ? 'hosting' : 'chokepoint'} on <b>${esc(sname(sc.stage))}</b>, where the bloc holds ${Math.round(sc.v)}%. ${esc(sc.lever.why)}`
      : 'The bloc holds none of the stages this condition relies on.';
    const winList = wins.length
      ? `<ul>${wins.map((w) => `<li>${w.date ?? 'No date'} · ${esc(w.who)}: ${esc(w.label)}</li>`).join('')}</ul>`
      : '<ul><li>No member has a known law window for this condition.</li></ul>';
    return `<div class="card ${sc.level}">
      <h3>${cond.n}. ${esc(cond.name)}</h3>
      <span class="tag">${esc(C._meta.labels[sc.level])}</span>
      <p>${esc(cond.text)}</p>
      <p class="why">${why}</p>${winList}</div>`;
  }).join('');
}

// Herfindahl index over single-supplier groups; fragmented groups count as zero, so this is a lower bound.
function hhi(stage) {
  return Object.entries(stage.share).reduce((t, [k, v]) => t + (FRAGMENTED.includes(k) ? 0 : v * v), 0);
}
function topSupplier(stage) {
  return Object.entries(stage.share).filter(([k]) => !FRAGMENTED.includes(k)).sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
}

function renderDependence() {
  const x = state.withdraw, xc = L.countries.find((c) => c.k === x);
  const bloc = state.bloc.filter((k) => k !== x);
  const blocName = bloc.length ? bloc.map(cname).join(' + ') : 'no bloc selected';
  $('#suppliers').innerHTML = L.countries.filter((c) => !FRAGMENTED.includes(c.k))
    .map((c) => `<button data-k="${c.k}" aria-pressed="${c.k === x}">${esc(c.name)}</button>`).join('');

  const xW = weighted([x], state.s), bW = weighted(bloc, state.s);
  const atRisk = L.stages.filter((st) => (st.share[x] ?? 0) >= 50);
  const blind = L.stages.filter((st) => (st.share[x] ?? 0) >= 25 && blocShare(st, bloc) < 10);
  $('#dep-kpis').innerHTML = `
    <div class="kpi"><div class="n">${Math.round(xW)}%</div><div class="l">Weighted supply chain ${esc(xc.name)} holds, so at risk</div></div>
    <div class="kpi"><div class="n">${atRisk.length}</div><div class="l">Stages where ${esc(xc.name)} holds ≥50%</div></div>
    <div class="kpi bloc"><div class="n">${blind.length}</div><div class="l">Stages where ${esc(xc.name)} holds ≥25% and the bloc &lt;10%</div></div>`;

  const rows = [...L.stages].sort((a, b) => (b.share[x] ?? 0) - (a.share[x] ?? 0));
  $('#dep-bars').innerHTML = `<p class="legend"><span class="sw" style="background:rgb(${rgbFor(xc)})"></span>${esc(xc.name)}'s share <span class="sw" style="background:rgb(var(--accent))"></span>bloc's own share (${esc(blocName)})</p>` +
    rows.map((st) => {
      const v = st.share[x] ?? 0, b = blocShare(st, bloc);
      const [lo, hi] = st.replicate_years;
      return `<div class="bar dep${v >= 50 ? ' choke' : ''}" title="${esc(st.note)}">
        <span class="name">${esc(st.name)}</span>
        <span class="track"><span class="fill" style="width:${v}%;background:rgb(${rgbFor(xc)})"></span><span class="fill own" style="width:${Math.min(100, b)}%"></span><span class="half"></span></span>
        <span class="v">${v ? Math.round(v) + '%' : '–'}${v >= 25 ? ` · ${lo}–${hi}y` : ''}</span></div>`;
    }).join('');

  if (!bloc.length) {
    $('#mutual').innerHTML = '<p class="empty">Pick a bloc in the Coalition builder to compare.</p>';
  } else {
    // Stages one side holds that the other barely does, ranked by weighted importance at this mix.
    const edge = (hasKeys, lacksKeys) => L.stages
      .map((st) => ({ st, have: blocShare(st, hasKeys), lack: blocShare(st, lacksKeys), w: weight(st, state.s) }))
      .filter((r) => r.have >= 25 && r.lack < 10)
      .sort((a, b) => b.have * b.w - a.have * a.w).slice(0, 4);
    const li = (r) => `<li><b>${esc(r.st.name)}</b>: ${Math.round(r.have)}% vs ${Math.round(r.lack)}%</li>`;
    const theirs = edge([x], bloc), ours = edge(bloc, [x]);
    const inBloc = state.bloc.includes(x) ? `<p class="hint">${esc(xc.name)} is in your bloc; it is left out of the bloc here.</p>` : '';
    $('#mutual').innerHTML = `${inBloc}
      <div class="vs">
        <div><div class="n" style="color:rgb(${rgbFor(xc)})">${Math.round(xW)}%</div><div class="l">${esc(xc.name)} could withhold</div></div>
        <div><div class="n" style="color:rgb(var(--accent))">${Math.round(bW)}%</div><div class="l">the bloc could withhold</div></div>
      </div>
      <p class="hint">Weighted shares of the supply chain at this mix. A bloc that holds stages the supplier lacks has something to bargain with; one that holds nothing it needs does not.</p>
      <h4>${esc(xc.name)} holds, the bloc lacks</h4>${theirs.length ? `<ul>${theirs.map(li).join('')}</ul>` : '<p class="empty">Nothing large.</p>'}
      <h4>The bloc holds, ${esc(xc.name)} lacks</h4>${ours.length ? `<ul>${ours.map(li).join('')}</ul>` : '<p class="empty">Nothing large.</p>'}`;
  }

  const conc = [...L.stages].sort((a, b) => hhi(b) - hhi(a));
  $('#conc').innerHTML = `<thead><tr><th style="text-align:left">Stage</th><th>Top supplier</th><th>Share</th><th>HHI</th><th>Years to replace</th></tr></thead><tbody>` +
    conc.map((st) => {
      const [k, v] = topSupplier(st), h = hhi(st);
      const c = L.countries.find((cc) => cc.k === k);
      return `<tr><td class="stage">${esc(st.name)}${v > 60 ? ' <span class="flag">fragile</span>' : ''}</td>
        <td>${esc(c?.name ?? '–')}</td><td>${Math.round(v)}%</td>
        <td><span class="hhi" style="--h:${Math.min(100, h / 100)}%">${Math.round(h).toLocaleString()}</span></td>
        <td>${st.replicate_years[0]}–${st.replicate_years[1]}</td></tr>`;
    }).join('') + '</tbody>';
}

function renderAbout() {
  const srcs = [
    [L._meta.source, L._meta.source_url],
    [C._meta.source, C._meta.source_url],
    [W._meta.source, W._meta.source_url],
    ['Team finance research (corrected EuroHPC dates)', 'reports/Finance%20layer%20handoff.md'],
  ];
  $('#sources').innerHTML = srcs.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('');
}

function render() {
  for (const v of VIEWS) $(`#view-${v}`).hidden = state.view !== v;
  document.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-selected', b.dataset.view === state.view));
  renderMix();
  if (state.view === 'stack') renderStack();
  if (state.view === 'coalition') { renderChips(); renderCoalition(); }
  if (state.view === 'dependence') renderDependence();
  writeHash();
}

function wire() {
  $('#mix').addEventListener('input', (e) => { state.s = Number(e.target.value); render(); });
  document.querySelector('.tabs').addEventListener('click', (e) => {
    const v = e.target.dataset?.view; if (v) { state.view = v; render(); }
  });
  $('#stack').addEventListener('click', (e) => {
    const tr = e.target.closest('tr.row'); if (!tr) return;
    state.stage = state.stage === tr.dataset.k ? null : tr.dataset.k; renderStack();
  });
  $('#stack').addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.closest('tr.row')?.click(); });
  $('#chips').addEventListener('click', (e) => {
    const k = e.target.dataset?.k; if (!k) return;
    state.bloc = state.bloc.includes(k) ? state.bloc.filter((x) => x !== k) : [...state.bloc, k];
    render();
  });
  $('#suppliers').addEventListener('click', (e) => {
    const k = e.target.dataset?.k; if (k) { state.withdraw = k; render(); }
  });
  $('#presets').addEventListener('click', (e) => {
    const i = e.target.dataset?.preset; if (i == null) return;
    state.bloc = PRESETS[i].bloc ?? middleKeys(); render();
  });
}

Promise.all(['data/layers.json', 'data/conditions.json', 'data/windows.json'].map((u) => fetch(u).then((r) => r.json())))
  .then(([l, c, w]) => {
    L = l; C = c; W = w;
    state.s = L._meta.default_s;
    readHash(); wire(); renderAbout(); render();
  })
  .catch((err) => { document.querySelector('main').innerHTML = `<p class="empty">Could not load data: ${esc(err.message)}. Serve this folder over HTTP.</p>`; });
