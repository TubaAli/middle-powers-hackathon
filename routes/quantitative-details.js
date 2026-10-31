import {routeMetrics, validateQuantitative} from './metrics.mjs';
import {safeUrl} from './model.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
try {
  const response=await fetch('../data/routes-quantitative.json',{cache:'no-cache'});
  if(!response.ok)throw Error(`HTTP ${response.status}`);
  const data=validateQuantitative(await response.json()),p=new URLSearchParams(location.search);
  const r=data.routes.find(x=>x.id===p.get('route'));if(!r)throw Error('Route not found');
  const assumption=p.has('assume')?Number(p.get('assume')):null;
  const {coverage:c,agreement:a}=routeMetrics(r,assumption);
  const g=r.quantitative?.agreements;
  const ref=ids=>(ids||[]).map(id=>`<a href="#source-${encodeURIComponent(id)}">[${r.sources.findIndex(s=>s.id===id)+1}]</a>`).join(' ');
  const para=(h,text)=>`<h3>${h}</h3><p>${esc(text)}</p>`;
  document.title=`${r.shortLabel} · Calculations and evidence`;
  const returnBasis=p.get('basis')==='model'?'model':data.bases.some(b=>b.id===p.get('basis'))?p.get('basis'):c?.basisId;
  document.querySelector('#back').href=`./#${new URLSearchParams({route:r.id,...(returnBasis?{basis:returnBasis}:{}),...(assumption===null?{}:{assume:assumption})})}`;
  let html=`<p class="eyebrow">${esc(r.countries.join(' · '))} · ${esc(data.observed)}</p><h1>${esc(r.title)}</h1><p>${esc(r.status)} · ${esc(r.confidence)} evidence confidence</p><p>${esc(r.safeguard)}</p>`;
   html+=`<p><a class="coordinate-evidence-link" href="coordinate-evidence.html?route=${encodeURIComponent(r.id)}">Retrieved inputs, source details and remaining gaps for this route →</a></p>`;
   html+=`<section id="coverage" class="q-calc"><h2>Potential coverage</h2>${c?`<p><strong>${c.numerator.toLocaleString()} ÷ ${c.denominator.toLocaleString()} = ${c.value.toFixed(4)}</strong> ${ref(c.sourceIds)}</p><p>Unit: ${esc(c.unit)}<br>Pool: ${esc(c.basisLabel)}<br>Period: ${esc(c.period)}<br>State: ${esc(c.stage)}</p><p>${esc(c.interpretation)}</p>`:'<p>A comparable numerator and denominator have not been established. The map leaves this quantity unknown.</p>'}</section>`;
  html+=`<section id="agreements" class="q-calc"><h2>Agreement calculation</h2>${a?`<p>Named parties: <strong>${a.actors}</strong>. Evidenced exact approvals: <strong>${a.approved}</strong>. Unresolved: <strong>${a.unknown}</strong>. Minimum unresolved cross-organisation handoffs: <strong>${a.handoffs}</strong>.</p><p><code>Index = cooperation share / (1 + handoffs)</code></p><p>Evidence bounds: <strong>${a.lower.toFixed(4)}–${a.upper.toFixed(4)}</strong>${a.scenario===null?'':`. Your scenario: <strong>${a.scenario.toFixed(4)}</strong>, using support weight ${assumption} for unresolved parties`}.</p>${a.veto?'<p class="q-warning">A required party is recorded as opposed. This implementation path is blocked.</p>':''}<p>${a.complete?'The declared approval set is recorded as complete.':'The path is incomplete: more required parties or handoffs may lower the index. The lower bound is zero.'}</p>`:'<p>The required decision path or its minimum handoffs is not established, so there is no index.</p>'}<p>${esc(g?.scope||'')}</p><p>${esc(g?.limitations||'')}</p>${ref(g?.sourceIds)}<p>This is a comparison index, not a delivery probability. General policy support is not consent to the exact safeguard. Complete approval of the recorded path gives an agreement index of one; it does not establish safe operation.</p>`;
  if(g?.actors?.length)html+='<h3>Who must agree</h3>'+g.actors.map(actor=>`<details><summary>${esc(actor.name)} · ${esc(actor.consent)}</summary>${para('Role',actor.role)}${para('Policy alignment',actor.alignment)}${para('Evidence and limits',actor.note)}${ref(actor.sourceIds)}</details>`).join('');
  html+='</section><section id="validation"><h2>What to test</h2>'+para('Next evidence question',r.nextQuestion)+para('Unresolved',r.gap)+'</section>';
  html+='<section><h2>How the route would work</h2>'+[['Actor',r.actor],['Who would be bound',r.obligor],['Instrument',r.instrument],['Verification',r.verification],['Remedy',r.remedy],['Decision window',r.window],['Evidence so far',r.evidenceSummary]].map(([h,t])=>para(h,t)).join('')+'</section>';
  html+='<section><h2>Sources</h2>'+r.sources.map((s,i)=>`<article class="source-card" id="source-${encodeURIComponent(s.id)}"><h3>${i+1}. <a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></h3><p>${esc(s.claim)}</p><p>${esc(s.locator)}</p><small>Published: ${esc(s.published||'unknown')} · checked: ${esc(s.observed)} · ${esc(s.access)}</small></article>`).join('')+'</section>';
  document.querySelector('#record').innerHTML=html;
  document.getElementById(location.hash.slice(1))?.scrollIntoView();
}catch(e){document.querySelector('#record').textContent=`Could not load this record: ${e.message}`;}
