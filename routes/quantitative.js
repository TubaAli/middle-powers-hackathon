import {routeMetrics, validateQuantitative} from './metrics.mjs';
import {briefs} from './briefs.mjs';
import {COORDINATION} from './model.mjs';

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const f = v => v.toFixed(3);
let data, state={route:'',basis:'',country:'',search:'',assumption:null};
const number = r => data.routes.findIndex(x=>x.id===r.id)+1;
const brief = r => r.brief || briefs[r.id] || [r.shortLabel,r.safeguard,r.gap];
const detailURL = r => `quantitative-details.html?${new URLSearchParams({route:r.id,...(state.assumption===null?{}:{assume:state.assumption})})}`;
const filtered = () => data.routes.filter(r=>(!state.country || r.countries.includes(state.country)) && (!state.search || [r.title,...r.countries,r.actor,r.instrument,r.safeguard].join(' ').toLowerCase().includes(state.search.toLowerCase())));

function readState() {
  const p=new URLSearchParams(location.hash.slice(1));
  for(const key of ['route','basis','country','search']) state[key]=p.get(key)||'';
  const a=p.has('assume') ? Number(p.get('assume')) : null;
  state.assumption=a!==null && Number.isFinite(a) && a>=0 && a<=1 ? a : null;
  if(!data.bases.some(b=>b.id===state.basis)) state.basis=data.bases.find(b=>b.id==='lumi-total-allocation')?.id || data.bases[0]?.id || '';
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
function renderDetail(r) {
  if(!r) {$('#q-detail').innerHTML='<h2>No matching routes</h2><p>Try another country or clear the filter.</p>';return;}
  const [title,opportunity,catchText]=brief(r), {coverage:c,agreement:a}=routeMetrics(r,state.assumption), url=detailURL(r);
  const value=a ? a.scenario===null ? `${f(a.lower)}–${f(a.upper)}` : f(a.scenario) : 'Unknown';
  $('#q-detail').innerHTML=`<div class="detail-top"><span class="coord-tag ${esc(r.coordination)}"><i class="dot"></i>${esc(COORDINATION[r.coordination]||r.coordination)}</span></div><h2>${esc(title)}</h2><p class="brief-status">${esc(r.countries.join(' · '))} · ${esc(r.status)}</p><p class="brief-proposal">${esc(opportunity)}</p><div class="q-metrics"><div><b>${c?f(c.value):'Unknown'}</b><a href="${url}#coverage">Potential coverage</a><small>${esc(c?.basisLabel || 'Denominator needed')}</small></div><div><b>${value}</b><a href="${url}#agreements">Agreement index${a?.scenario!==null && a?' · scenario':''}</a><small>${a?`${a.actors} named parties · at least ${a.handoffs} handoffs`:'Decision path needed'}</small></div></div><p class="brief-caveat"><strong>The catch · </strong>${esc(catchText)}</p><p class="brief-links"><a href="${url}">How it works & evidence</a> · <a href="${url}#validation">What to test</a></p><div class="detail-footer"><span>${esc(r.confidence)} evidence confidence</span><button id="copy-link">Copy route link</button></div>`;
  if(a && !a.complete) $('#q-detail .q-metrics>div:last-child small').append(' · path incomplete');
}
function render() {
  const routes=filtered();
  if(!routes.some(r=>r.id===state.route)) state.route=routes.find(r=>r.quantitative?.coverage?.basisId===state.basis)?.id || routes[0]?.id || '';
  renderPlot(routes); renderDetail(routes.find(r=>r.id===state.route));
  $('#q-list').innerHTML=routes.map(r=>`<button data-route="${esc(r.id)}" aria-pressed="${r.id===state.route}"><small>${number(r)} · ${esc(r.countries.join(' · '))}</small><strong>${esc(brief(r)[0])}</strong><small>${r.quantitative?.coverage?'Numerical coverage available':'Coverage not yet quantified'} · ${esc(r.mechanism)}</small></button>`).join('');
  $('#list-count').textContent=`${routes.length} routes`;
  const missing=routes.filter(r=>!r.quantitative?.coverage).length;
  $('#measurement-gap').textContent=missing?`${missing} candidate routes in this filter still need a matched coverage denominator. They remain in the list below.`:'';
  writeState();
}
function selectRoute(id) {
  state.route=id;
  const route=data.routes.find(r=>r.id===id);
  if(route?.quantitative?.coverage) {state.basis=route.quantitative.coverage.basisId;$('#basis').value=state.basis;}
  render();
  if(matchMedia('(max-width:760px)').matches) $('#q-detail').scrollIntoView({block:'start'});
}
async function init() {
  try {
    const response=await fetch('../data/routes-quantitative.json',{cache:'no-cache'});
    if(!response.ok) throw Error(`HTTP ${response.status}`);
    data=validateQuantitative(await response.json());
    const countries=[...new Set(data.routes.flatMap(r=>r.countries))].sort();
    const countryCount=countries.filter(c=>!['United States','China','European Union','EuroHPC participating states'].includes(c)&&!c.startsWith('EU ')).length;
    const coverageCount=data.routes.filter(r=>r.quantitative?.coverage).length;
    $('#sample-count').textContent=`${data.routes.length} routes · ${countryCount} named middle-power countries · ${coverageCount} coverage records`;
    $('#observed').textContent=`Evidence checked ${data.observed}`;
    $('#basis').innerHTML=data.bases.map(b=>`<option value="${esc(b.id)}">${esc(b.label)}</option>`).join('');
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
