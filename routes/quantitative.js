import {routeMetrics, validateQuantitative} from './metrics.mjs';
import {briefs} from './briefs.mjs';
import {COORDINATION} from './model.mjs';
import {placement, validatePlacement, arrangePoints} from './placement.mjs';

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const f = v => v.toFixed(3);
let data, model, positions, state={route:'',basis:'',country:'',search:'',assumption:null};
const isModel = () => state.basis === 'model';
const score = v => Math.round(v*100);
const number = r => data.routes.findIndex(x=>x.id===r.id)+1;
const brief = r => r.brief || briefs[r.id] || [r.shortLabel,r.safeguard,r.gap];
const detailURL = r => `quantitative-details.html?${new URLSearchParams({route:r.id,basis:state.basis,...(state.assumption===null?{}:{assume:state.assumption})})}`;
const filtered = () => data.routes.filter(r=>(!state.country || r.countries.includes(state.country)) && (!state.search || [r.title,...r.countries,r.actor,r.instrument,r.safeguard].join(' ').toLowerCase().includes(state.search.toLowerCase())));

function readState() {
  const p=new URLSearchParams(location.hash.slice(1));
  for(const key of ['route','basis','country','search']) state[key]=p.get(key)||'';
  const a=p.has('assume') ? Number(p.get('assume')) : null;
  state.assumption=a!==null && Number.isFinite(a) && a>=0 && a<=1 ? a : null;
  if(state.basis!=='model' && !data.bases.some(b=>b.id===state.basis)) state.basis='model';
  $('#basis').value=state.basis; $('#country').value=state.country; $('#search').value=state.search;
  $('#use-assumption').checked=state.assumption!==null;
  $('#cooperation').disabled=state.assumption===null;
  if(state.assumption!==null) $('#cooperation').value=state.assumption;
  $('#cooperation-value').textContent=f(Number($('#cooperation').value));
}
function writeState() {
  const p=new URLSearchParams();
  for(const key of ['route','basis','country','search']) if(state[key]) p.set(key,state[key]);
  if(state.assumption!==null) p.set('assume',state.assumption);
  history.replaceState(null,'',`${location.pathname}#${p}`);
}
function renderPlot(routes) {
  if(isModel()) {renderModelPlot(routes);return;}
  const shown=routes.map(r=>({r,...routeMetrics(r,state.assumption)})).filter(x=>x.coverage?.basisId===state.basis && x.agreement);
  $('#plot-count').textContent=`${shown.length} routes with comparable inputs`;
  if(!shown.length) {$('#q-plot').innerHTML='<div class="q-empty">No comparable coverage and agreement inputs for this filter. Browse the candidate routes below.</div>';return;}
  const x=v=>94+600*v, y=v=>440-380*v;
  let s='<svg viewBox="0 0 740 510" role="group" aria-label="Quantitative route comparison"><rect x="94" y="60" width="600" height="380" class="plot-bound"/>';
  for(const v of [0,.25,.5,.75,1]) s+=`<line x1="${x(v)}" y1="60" x2="${x(v)}" y2="440" class="grid-line"/><line x1="94" y1="${y(v)}" x2="694" y2="${y(v)}" class="grid-line"/><text x="${x(v)}" y="460" class="axis-text" text-anchor="middle">${f(v)}</text><text x="81" y="${y(v)+4}" class="axis-text" text-anchor="end">${f(v)}</text>`;
  s+='<text x="394" y="494" text-anchor="middle" class="axis-title">Agreement index →</text><text transform="translate(25 250) rotate(-90)" text-anchor="middle" class="axis-title">Potential coverage of selected pool →</text><text x="94" y="32" class="axis-text">Fractions from 0 to 1 · conditional on adopting the proposed terms</text>';
  for(const item of shown) {
    const {r,coverage:c,agreement:a}=item;
    const ties=shown.filter(t=>t.coverage.value===c.value && t.agreement.upper===a.upper);
    const offset=(ties.indexOf(item)-(ties.length-1)/2)*14;
    const yy=y(c.value)+offset, value=a.scenario??a.upper;
    const selected=state.route===r.id;
    s+=`<g class="q-dot ${esc(r.coordination)}${selected?' selected':''}${a.scenario===null?'':' scenario'}" role="button" tabindex="0" data-route="${esc(r.id)}" aria-pressed="${selected}" aria-label="${esc(`${r.shortLabel}. Coverage ${f(c.value)}. Agreement index ${f(a.lower)} to ${f(a.upper)}${a.scenario===null?'':`. Your scenario ${f(a.scenario)}`}`)}"><title>${esc(r.title)} — ${a.scenario===null?'upper index bound':'your assumed scenario'}</title><line class="range-line" x1="${x(a.lower)}" y1="${yy}" x2="${x(a.upper)}" y2="${yy}"/><circle class="mark" cx="${x(value)}" cy="${yy}" r="12"/><text x="${x(value)}" y="${yy+3.5}" text-anchor="middle">${number(r)}</text>${selected?`<text class="point-label" x="${Math.max(190,Math.min(580,x(value)))}" y="${yy-22}" text-anchor="middle">${esc(r.shortLabel)}</text>`:''}</g>`;
  }
  $('#q-plot').innerHTML=s+'</svg>';
  $('#plot-note').textContent=state.assumption===null?'Hollow points show upper index bounds; bars cover unresolved agreement. Tied points are offset for visibility.':'Filled points use your cooperation assumption; bars retain the evidence bounds. These are model indices, not probabilities.';
}
function renderModelPlot(routes) {
  $('#plot-count').textContent=`${routes.length} modelled routes · all-sample view`;
  $('#plot-note').textContent='Evidence-informed judgments + neutral imputations, not measured outcomes. Small display offsets separate marks; select a point to see its true position, sensitivity range and evidence.';
  const x=v=>94+600*v, y=v=>440-380*v;
  let s='<svg viewBox="0 0 740 510" role="group" aria-label="Modelled feasibility and potential safety impact"><rect x="94" y="60" width="600" height="380" class="plot-bound"/>';
  for(const v of [0,.25,.5,.75,1]) s+=`<line x1="${x(v)}" y1="60" x2="${x(v)}" y2="440" class="grid-line"/><line x1="94" y1="${y(v)}" x2="694" y2="${y(v)}" class="grid-line"/><text x="${x(v)}" y="460" class="axis-text" text-anchor="middle">${score(v)}</text><text x="81" y="${y(v)+4}" class="axis-text" text-anchor="end">${score(v)}</text>`;
  s+='<text x="394" y="494" text-anchor="middle" class="axis-title">Implementation feasibility →</text><text transform="translate(25 250) rotate(-90)" text-anchor="middle" class="axis-title">Potential safety impact →</text><text x="94" y="32" class="axis-text">Model indices, 0–100 · higher is more promising · not probabilities</text>';
  const selected=routes.find(r=>r.id===state.route);
  if(selected) {
    const p=placement(selected,model), pos=positions.get(selected.id);
    s+=`<g class="model-sensitivity" aria-hidden="true"><rect x="${x(p.x.lower)}" y="${y(p.y.upper)}" width="${600*(p.x.upper-p.x.lower)}" height="${380*(p.y.upper-p.y.lower)}"/><path d="M${x(p.x.value)-5} ${y(p.y.value)}h10M${x(p.x.value)} ${y(p.y.value)-5}v10"/><line x1="${x(p.x.value)}" y1="${y(p.y.value)}" x2="${pos.px}" y2="${pos.py}"/></g>`;
  }
  for(const r of [...routes.filter(r=>r.id!==state.route),...(selected?[selected]:[])]) {
    const p=placement(r,model), pos=positions.get(r.id), active=r.id===state.route;
    s+=`<g class="q-dot ${esc(r.coordination)}${active?' selected':''}${p.imputed.length?' imputed':''}" role="button" tabindex="0" data-route="${esc(r.id)}" aria-pressed="${active}" aria-label="${esc(`${r.shortLabel}. Model feasibility ${score(p.x.value)}, potential safety impact ${score(p.y.value)}. ${p.imputed.length} of 6 factors imputed.`)}"><title>${esc(r.shortLabel)} — ${score(p.x.value)} / ${score(p.y.value)} (modelled)</title><circle class="mark" cx="${pos.px}" cy="${pos.py}" r="9.5"/><text x="${pos.px}" y="${pos.py+3.5}" text-anchor="middle">${number(r)}</text>${active?`<text class="point-label" x="${Math.max(215,Math.min(560,pos.px))}" y="${Math.max(54,pos.py-19)}" text-anchor="middle">${esc(r.shortLabel)}</text>`:''}</g>`;
  }
  $('#q-plot').innerHTML=s+'</svg>';
}
function renderDetail(r) {
  if(!r) {$('#q-detail').innerHTML='<h2>No matching routes</h2><p>Try another country or clear the filter.</p>';return;}
  const [title,opportunity,catchText]=brief(r), {coverage:c,agreement:a}=routeMetrics(r,state.assumption), url=detailURL(r);
  const value=a ? a.scenario===null ? `${f(a.lower)}–${f(a.upper)}` : f(a.scenario) : 'Unknown';
  $('#q-detail').innerHTML=`<div class="detail-top"><span class="coord-tag ${esc(r.coordination)}"><i class="dot"></i>${esc(COORDINATION[r.coordination]||r.coordination)}</span></div><h2>${esc(title)}</h2><p class="brief-status">${esc(r.countries.join(' · '))} · ${esc(r.status)}</p><p class="brief-proposal">${esc(opportunity)}</p><div class="q-metrics"><div><b>${c?f(c.value):'Unknown'}</b><a href="${url}#coverage">Potential coverage</a><small>${esc(c?.basisLabel || 'Denominator needed')}</small></div><div><b>${value}</b><a href="${url}#agreements">Agreement index${a?.scenario!==null && a?' · scenario':''}</a><small>${a?`${a.actors} named parties · at least ${a.handoffs} handoffs`:'Decision path needed'}</small></div></div><p class="brief-caveat"><strong>The catch · </strong>${esc(catchText)}</p><p class="brief-links"><a href="${url}">How it works & evidence</a> · <a href="${url}#validation">What to test</a></p><div class="detail-footer"><span>${esc(r.confidence)} evidence confidence</span><button id="copy-link">Copy route link</button></div>`;
  if(a && !a.complete) $('#q-detail .q-metrics>div:last-child small').append(' · path incomplete');
  if(isModel()) {
    const p=placement(r,model);
    $('#q-detail .q-metrics').innerHTML=[['Feasibility',p.x],['Potential impact',p.y]].map(([label,v])=>`<div><b>${score(v.value)}<span class="score-unit"> / 100</span></b><span>${label}</span><small>Sensitivity ${score(v.lower)}–${score(v.upper)}</small></div>`).join('');
    $('#q-detail .brief-caveat').insertAdjacentHTML('beforebegin',`<div class="model-basis"><p><strong>Why this position</strong></p><p>${esc(p.xBasis)}</p><p>${esc(p.yBasis)}</p><p class="small">All six factors are model judgments. ${p.imputed.length?`${p.imputed.length} missing factors use the neutral 50/100 prior: ${p.imputed.map(esc).join(', ')}.`:'No neutral-prior factors; all six use evidence-informed assessments.'} The shaded area is a sensitivity range, not a confidence interval.</p><details><summary>Inspect factors and weights</summary><table><thead><tr><th>Factor</th><th>Score</th><th>Weight</th></tr></thead><tbody>${Object.entries(model.axes).flatMap(([axis,config])=>Object.entries(config.weights).map(([key,w])=>`<tr><td>${esc(key)} (${axis})</td><td>${score(p.factors[key]??model.prior)}${p.factors[key]===null?' · imputed':''}</td><td>${score(w)}%</td></tr>`)).join('')}</tbody></table><p class="small">${Object.entries(model.factors).map(([k,v])=>`<strong>${esc(k)}:</strong> ${esc(v)}`).join('<br>')}</p></details><p><a href="coordinate-evidence.html?route=${encodeURIComponent(r.id)}">Retrieved evidence and gaps for this route</a> · <a href="../data/route-placement-model.json">Download model inputs</a></p></div>`);
  }
}
function render() {
  const routes=filtered();
  $('.q-assumptions').hidden=isModel();
  $('#model-method').hidden=!isModel();
  $('#coverage-method').hidden=isModel();
  if(!routes.some(r=>r.id===state.route)) state.route=routes.find(r=>r.quantitative?.coverage?.basisId===state.basis)?.id || routes[0]?.id || '';
  renderPlot(routes); renderDetail(routes.find(r=>r.id===state.route));
  $('#q-list').innerHTML=routes.map(r=>`<button data-route="${esc(r.id)}" aria-pressed="${r.id===state.route}"><small>${number(r)} · ${esc(r.countries.join(' · '))}</small><strong>${esc(brief(r)[0])}</strong><small>${isModel()?`Modelled position · ${placement(r,model).imputed.length}/6 factors imputed`:r.quantitative?.coverage?'Numerical coverage available':'Coverage not yet quantified'} · ${esc(r.mechanism)}</small></button>`).join('');
  $('#list-count').textContent=`${routes.length} routes`;
  const missing=routes.filter(r=>!r.quantitative?.coverage).length;
  $('#measurement-gap').textContent=isModel()?'Dashed circles include neutral-prior imputations. The cross marks the selected route’s unshifted score. Display offsets are repeatable and do not change scores or rankings.':missing?`${missing} candidate routes in this filter still need a matched coverage denominator. They remain in the list below.`:'';
  writeState();
}
function selectRoute(id) {
  state.route=id;
  const route=data.routes.find(r=>r.id===id);
  if(!isModel() && route?.quantitative?.coverage) {state.basis=route.quantitative.coverage.basisId;$('#basis').value=state.basis;}
  render();
  if(matchMedia('(max-width:760px)').matches) $('#q-detail').scrollIntoView({block:'start'});
}
async function init() {
  try {
    const response=await fetch('../data/routes-quantitative.json',{cache:'no-cache'});
    if(!response.ok) throw Error(`HTTP ${response.status}`);
    data=validateQuantitative(await response.json());
    const modelResponse=await fetch('../data/route-placement-model.json',{cache:'no-cache'});
    if(!modelResponse.ok) throw Error(`Model HTTP ${modelResponse.status}`);
    model=validatePlacement(await modelResponse.json(),data.routes);
    positions=arrangePoints(data.routes.map(r=>{const p=placement(r,model);return {id:r.id,x:94+600*p.x.value,y:440-380*p.y.value};}));
    const countries=[...new Set(data.routes.flatMap(r=>r.countries))].sort();
    const countryCount=countries.filter(c=>!['United States','China','European Union','EuroHPC participating states'].includes(c)&&!c.startsWith('EU ')).length;
    const coverageCount=data.routes.filter(r=>r.quantitative?.coverage).length;
    $('#sample-count').textContent=`${data.routes.length} modelled routes · ${countryCount} named middle-power countries · ${coverageCount} separate coverage records`;
    $('#observed').textContent=`Evidence checked ${data.observed}`;
    $('#basis').innerHTML='<option value="model">All routes · evidence-informed model</option>'+data.bases.map(b=>`<option value="${esc(b.id)}">Coverage only · ${esc(b.label)}</option>`).join('');
    $('#country').innerHTML='<option value="">All countries</option>'+countries.map(c=>`<option>${esc(c)}</option>`).join('');
    readState();render();
    $('#load-status').hidden=true;$('#q-workspace').hidden=false;
    for(const field of ['basis','country','search']) $(`#${field}`).addEventListener(field==='search'?'input':'change',e=>{state[field]=e.target.value;if(field==='basis')state.route='';render();});
    $('#reset').addEventListener('click',()=>{state.country='';state.search='';$('#country').value='';$('#search').value='';render();});
    $('#use-assumption').addEventListener('change',e=>{state.assumption=e.target.checked?Number($('#cooperation').value):null;$('#cooperation').disabled=!e.target.checked;render();});
    $('#cooperation').addEventListener('input',e=>{state.assumption=Number(e.target.value);$('#cooperation-value').textContent=f(state.assumption);render();});
    document.addEventListener('click',async e=>{const r=e.target.closest('[data-route]');if(r){selectRoute(r.dataset.route);return;}if(e.target.id==='copy-link'){try{await navigator.clipboard.writeText(location.href);e.target.textContent='Link copied';}catch{e.target.textContent='Copy the address bar URL';}}});
    $('#q-plot').addEventListener('keydown',e=>{const r=e.target.closest('[data-route]');if(r&&['Enter',' '].includes(e.key)){e.preventDefault();selectRoute(r.dataset.route);$(`#q-plot [data-route="${CSS.escape(state.route)}"]`)?.focus();}});
    window.addEventListener('hashchange',()=>{if(['#calculation','#explorer'].includes(location.hash))return;readState();render();});
  } catch(e) {$('#load-status').textContent=`Could not load the route inputs: ${e.message}`;$('#load-status').setAttribute('role','alert');}
}
init();
