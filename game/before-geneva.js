import {newGame, council, enterMeeting, choose, advance, summit, verified, routeStatus, meetingReason, choiceReason, costFor, validSave, leaveConversation} from './story-engine.mjs';

const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SAVE='before-geneva-save-v1';
const ART=['01-november-council.jpg','02-february-negotiation-1-49f6789f062e.jpg','03-april-disputed-report-1-60badf629bae.jpg','04-geneva-final-clause-1-ddbbb378de0e.jpg'];
const names={budget:'Budget',evidence:'Evidence',mandate:'Mandate'};
const featured=['jp-procurement-safety-evidence','indiaai-subsidy-evaluation-gate','brazil-anpd-ai-inspection-evidence','lumi-national-evidence-protocol','sg-agent-data-leakage-deployment-gate','kenya-biometric-dpia-evidence-gate','ch-electricity-operator-fallback','taiwan-public-compute-safety-conditions'];
let campaign,state,started=false,saved=false,filter='',all=false,notice='',unreadableSave=false,focusRoute='';
const route=id=>campaign.routes.find(r=>r.id===id);
const month=()=>campaign.months[state?.month??0];
const costText=cost=>Object.entries(cost).filter(([,n])=>n>0).map(([k,v])=>`−${v} ${names[k].toLowerCase()}`).join(' · ');
function safeLink(href,label) {try {const u=new URL(href,location.href);return ['https:','http:'].includes(u.protocol)?`<a href="${esc(u.href)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`:esc(label);}catch{return esc(label);}}
function save() {
  try {localStorage.setItem(SAVE,JSON.stringify(state));saved=true;$('#save-status').textContent='Saved on this device';}
  catch {$('#save-status').textContent='Device storage unavailable · keep this tab open';}
}
function update(fn) {
  try {state=fn();notice='';save();render();$('#main').focus({preventScroll:true});}
  catch(e) {notice=e.message;render();}
}
function backdrop() {
  let i=!started?0:state.month<3?0:state.month<5?1:state.month<7?2:3;
  const id=state?.conversation?.routeId;
  if(started&&state.phase==='conversation'&&state.month!==7) {
    if(id?.startsWith('jp-')||id==='indiaai-subsidy-evaluation-gate')i=1;
    if(id?.startsWith('brazil-'))i=2;
  }
  $('#art').style.backgroundImage=`url("concepts/art/${ART[i]}")`;
  document.body.style.setProperty('--mobile-art-position',id?.startsWith('jp-')?'94%':id==='indiaai-subsidy-evaluation-gate'?'55%':'64%');
  document.body.dataset.phase=started?state.phase:'title';
}
function hud() {
  $('#hud').innerHTML=`<button class="brand" data-act="title"><span class="seal">◎</span><span>BEFORE GENEVA<small>A diplomatic visual novel</small></span></button>${started?`<ol class="timeline" aria-label="Campaign months">${campaign.months.map((m,i)=>`<li class="${i===state.month?'active':i<state.month?'past':''}" ${i===state.month?'aria-current="step"':''}><span>${m.short}</span></li>`).join('')}</ol><div class="resources">${Object.entries(state.resources).map(([k,v])=>`<span><b>${v}</b><small>${names[k]}</small></span>`).join('')}</div>`:'<span class="header-note">November 2026 — June 2027</span>'}`;
  $('#journal-button').disabled=!started;
}
function startScreen() {
  return `<section class="title-screen"><p class="eyebrow">Eight months to make it matter</p><h1>Before<br><em>Geneva.</em></h1><p class="tagline">A promise is easy.<br>A safeguard has to hold.</p><p class="intro-copy">Lead a small negotiating team through 32 policy conversations. Follow the evidence, choose your partners, and decide what can honestly be agreed in June.</p><div class="title-actions">${saved?'<button class="primary" data-act="resume">Continue negotiations <span>→</span></button>':''}<button class="${saved?'secondary':'primary'}" data-act="new">${saved?'Start a new campaign':'Begin negotiations'} <span>→</span></button><button class="text-button" data-act="guide">How to play</button></div>${unreadableSave?'<p class="warning">An older or damaged save could not be loaded. Starting a new campaign will replace it.</p>':''}<p class="fineprint">Fictional delegates. Professional intrigue. No timer.<br>Game outcomes are imagined; every policy dossier links to the research.</p><a class="legacy-link" href="orbit.html">Play the original Orbit Accord prototype ↗</a></section>`;
}
function councilScreen() {
  const recent=state.journal.filter(e=>e.routeId).at(-1);
  return `<section class="council-screen panel"><p class="eyebrow">${esc(month().label)} · monthly council</p><h1>${esc(month().title)}</h1><p class="scene-copy">${esc(month().event)}</p>${recent?`<p class="memory">On your desk: ${esc(recent.title.toLowerCase())} — ${esc(route(recent.routeId).title)}.</p>`:''}<p class="subheading">Where will your team put its effort?</p><div class="choices"><button data-council="funding"><span class="choice-number">01</span><span><strong>Fund the next rehearsal</strong><small>+3 budget · pay for scoped pilots and corrections.</small></span></button><button data-council="research"><span class="choice-number">02</span><span><strong>Commission independent briefs</strong><small>+2 evidence · prepare the terms and test the result.</small></span></button><button data-council="diplomacy"><span class="choice-number">03</span><span><strong>Listen and build negotiating support</strong><small>+2 mandate · make a shared protocol possible.</small></span></button></div><p class="fineprint">One council decision and three meeting decisions per month. These resources represent your team's effort, not measured funding or government support.</p></section>`;
}
function cards() {
  let rows=campaign.routes.filter(r=>!filter||[r.title,...r.countries].join(' ').toLowerCase().includes(filter.toLowerCase()));
  rows.sort((a,b)=>{
    const priority=r=>r.id===focusRoute?-3:routeStatus(state,r.id)==='Follow-up ready'?-2:featured.includes(r.id)?featured.indexOf(r.id):100;
    return priority(a)-priority(b)||a.title.localeCompare(b.title);
  });
  if(!all&&!filter)rows=rows.slice(0,8);
  $('#contacts').innerHTML=rows.length?rows.map(r=>{
    const reason=meetingReason(state,r.id),status=routeStatus(state,r.id);
    return `<article class="contact ${status==='Follow-up ready'?'ready':''}"><button class="contact-main" data-meet="${esc(r.id)}" ${reason?'disabled':''}><small>${esc(r.countries.join(' · '))}</small><strong>${esc(r.title)}</strong><span>${esc(reason||status)} ${!reason?'→':''}</span></button><button class="dossier-button" data-evidence="${esc(r.id)}" aria-label="Research dossier: ${esc(r.title)}">Dossier ↗</button></article>`;
  }).join(''):'<p class="empty">No matching delegation. Try another country or policy.</p>';
}
function hubScreen() {
  return `<section class="hub"><div class="chapter-heading"><p class="eyebrow">${esc(month().label)} · delegation lounge</p><h1>${esc(month().title)}</h1><p>${state.actions} meeting decision${state.actions===1?'':'s'} remaining <span>· ${verified(state).length} tested record${verified(state).length===1?'':'s'}</span></p></div><section class="contact-panel panel"><div class="contact-toolbar"><label>Find a delegation<input id="contact-search" type="search" value="${esc(filter)}" placeholder="Country or policy"></label><button class="text-button" data-act="all" aria-pressed="${all}">${all?'Show highlights':'All 32 routes'}</button></div><div id="contacts" class="contacts"></div><div class="hub-footer"><p>Reading dossiers is free. A meeting is used when you commission, resolve or defer work.</p><button class="primary" data-act="advance">${state.month===7?'Enter the Geneva session':'Close the month'} →</button></div></section></section>`;
}
function dialogueScreen() {
  const r=route(state.conversation.routeId),node=r.nodes[state.conversation.node];
  let memory='';
  if(r.id==='indiaai-subsidy-evaluation-gate'&&state.projects['jp-procurement-safety-evidence']?.stage==='tested')memory='Your team brings its Japanese test record. It is a starting point, not authority over an Indian provider.';
  if(r.id==='lumi-national-evidence-protocol'&&state.projects['lumi-belgium-safety-appendix']?.stage==='tested')memory='The Belgian rehearsal is already in your journal. Now you can ask what a shared condition would actually add.';
  return `<section class="dialogue-screen"><div class="dialogue-heading"><p class="eyebrow">${esc(month().label)} · ${state.conversation.node==='report'?'follow-up meeting':'bilateral conversation'}</p><h1>${esc(r.title)}</h1><button class="glass-button" data-evidence="${esc(r.id)}">Open the research dossier ↗</button> <button class="glass-button" data-act="lounge">Return to lounge</button></div>${memory?`<p class="memory dialogue-memory">${esc(memory)}</p>`:''}<div class="dialogue-bottom"><article class="dialogue-box"><p class="speaker">${esc(r.speaker)}</p><p class="speech" aria-live="polite">${esc(state.conversation.node==='receipt'?state.conversation.receipt:node.text)}</p><small>${state.prepared.includes(r.id)?'Case-specific brief prepared':'Provisional evidence'} · ${routeStatus(state,r.id)}</small></article><div class="response-box"><p class="eyebrow">Your response</p><div class="choices">${node.choices.map((c,i)=>{
    const reason=choiceReason(state,c),cost=costText(costFor(state,c.action));
    return `<button data-choice="${esc(c.id)}" ${reason?'disabled':''}><span class="choice-number">0${i+1}</span><span><strong>${esc(c.label)}</strong><small>${esc(reason||cost||c.detail||'Continue the conversation')}${cost&&!reason?` · ${esc(c.action==='prepare'?'Lower retest cost':'Fictional commitment')}`:''}</small></span></button>`;
  }).join('')}</div></div></div></section>`;
}
function summitScreen() {
  const count=verified(state).length,shared=verified(state).filter(([,p])=>p.strategy==='shared').length;
  return `<section class="council-screen panel"><p class="eyebrow">Geneva · 21 June 2027 · final session</p><h1>One clause left.</h1><p class="scene-copy">“A joint statement is not the same as a working safeguard. What can this room commit to—and let others verify?”</p><p class="memory">Your fictional record: ${count} tested initiatives · ${shared} shared protocols · ${state.resources.mandate} mandate.</p><div class="choices"><button data-summit="verification"><span class="choice-number">01</span><span><strong>Table a shared verification annex</strong><small>Needs 3 tested records, including a shared protocol, and 2 mandate. ${count>=3&&shared&&state.resources.mandate>=2?'Your record meets those game conditions.':'The clause will remain bracketed if the record is insufficient.'}</small></span></button><button data-summit="phased"><span class="choice-number">02</span><span><strong>Agree a narrower, phased pilot programme</strong><small>Needs 1 tested record. Name the scope and the work still to do.</small></span></button><button data-summit="record"><span class="choice-number">03</span><span><strong>Publish an honest record of disagreement</strong><small>Keep the unresolved questions visible. Make no unsupported promise.</small></span></button></div><button class="text-button" data-act="final-meetings">Return to the final meetings</button></section>`;
}
function endingScreen() {
  const e=state.ending;
  const title=e.kind==='record'?'The honest record.':!e.success?'The brackets remain.':e.kind==='phased'?'A testable first step.':'A clause with consequences.';
  const copy=e.kind==='record'?'The delegations publish what they could agree and what they could not. Your record leaves the next negotiators a clearer starting point.':!e.success?'The room cannot support the text you tabled. Your earlier work still matters, but the missing evidence and agreements remain visible in the final draft.':e.kind==='phased'?'A smaller programme survives. Its scope is explicit, its first tests are recorded, and its next decision has an owner.':'A bounded verification annex survives the fictional negotiation. It links tested records to a shared protocol—and keeps the remaining uncertainty on the page.';
  const pending=Object.entries(state.projects).filter(([,p])=>p.stage!=='tested').length;
  return `<section class="ending panel"><p class="eyebrow">Before Geneva · campaign complete</p><h1>${title}</h1><p class="scene-copy">${copy}</p><div class="ending-stats"><span><b>${e.tested}</b>tested records</span><span><b>${pending}</b>unfinished threads</span><span><b>${state.prepared.length}</b>case briefs</span></div><h2>What you brought to the table</h2>${verified(state).length?`<ul>${verified(state).map(([id,p])=>`<li>${esc(route(id).title)} <small>· ${p.strategy==='shared'?'shared protocol':'bounded pilot'}</small></li>`).join('')}</ul>`:'<p>No initiative reached a completed fictional retest. Try preparing evidence and returning to a commissioned project the following month.</p>'}<p class="fineprint">This ending follows game rules, not a forecast of government behaviour or measured safety impact. Compare the real proposals and their unresolved evidence in the policy map.</p><div class="title-actions"><button class="primary" data-act="journal">Read your decision journal</button><button class="secondary" data-act="new">Begin another campaign</button><a href="../routes/stress-tests.html">Explore the actual policy stress tests ↗</a></div></section>`;
}
function render() {
  backdrop();hud();
  $('#main').innerHTML=(notice?`<p class="notice" role="alert">${esc(notice)}</p>`:'')+(!started?startScreen():state.phase==='council'?councilScreen():state.phase==='hub'?hubScreen():state.phase==='conversation'?dialogueScreen():state.phase==='summit'?summitScreen():endingScreen());
  if(started&&state.phase==='hub') {
    cards();$('#contact-search').addEventListener('input',e=>{filter=e.target.value;cards();});
  }
}
function drawer(title,body) {$('#drawer-title').textContent=title;$('#drawer-body').innerHTML=body;if(!$('#drawer').open)$('#drawer').showModal();}
function guide() {
  drawer('Your brief',`<p>It is November 2026. You lead a small middle-power negotiating team, working towards the June Geneva session.</p><ol><li>Each month, choose one council priority. It adds budget, evidence or mandate.</li><li>Choose from 32 policy conversations. Ask about the problem, commission a brief, then fund a pilot or negotiate a shared protocol.</li><li>A commissioned project needs a follow-up in a later month. Repair its weakness and retest it to earn a tested record.</li><li>Shared protocols need at least one other tested route. Prepare some bounded pilots first.</li><li>In June, choose what the final text can honestly claim.</li></ol><p>You have three meeting decisions per month. Commissioning, retesting, pausing or deferring uses one. Reading, asking questions and returning to the lounge do not. Briefs cost evidence and make later retests cheaper.</p><h3>Controls and saving</h3><p>Click or tap a response, or press its number key (1–3). There is no timer. Use Tab and Enter to navigate. Escape closes this panel. Progress saves automatically on this device when storage is available.</p><h3>Research and fiction</h3><p>${esc(campaign.fictionNotice)} The art shows a recurring fictional delegation ensemble, not a portrait of every speaker. Resources represent negotiating effort; dialogue outcomes are deterministic game rules.</p><p>The dossiers preserve the research snapshot dated ${esc(campaign.researchObserved)}. They identify uncertainty instead of converting plot scores into chances of government acceptance.</p><p><a href="campaign.json" target="_blank">Read the complete dialogue-tree data ↗</a> · <a href="orbit.html">Original Orbit Accord prototype ↗</a></p>`);
}
function evidence(id) {
  const r=route(id);if(!r)return;
  drawer(r.title,`<p class="eyebrow">Research dossier · ${esc(campaign.researchObserved)}</p><p class="dossier-lead">${esc(r.research.headline)}</p><p><strong>Actual next test:</strong> ${esc(r.research.nextTest)}</p><details><summary>Unresolved evidence</summary><ul>${r.research.unknowns.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><details><summary>Retrieved claims and locators</summary>${r.research.evidence.map(e=>`<p>${esc(e.claim)}</p><small>${esc(e.locator)}</small>`).join('')}</details><h3>Sources</h3>${r.research.sources.map(s=>`<article class="source"><strong>${safeLink(s.href,s.title)}</strong><p>${esc(s.locator)}</p><small>${esc(s.access)} · ${esc(s.sourceCheck)}</small></article>`).join('')}<p>${safeLink('../routes/stress-tests.html?route='+encodeURIComponent(id),'Read the full stress test')} · ${safeLink('../routes/#basis=model&route='+encodeURIComponent(id),'Locate this route on the figure')}</p><p class="fineprint">The dialogue is authored fiction informed by this material. A fictional approval, failure or successful retest does not establish a real event.</p>`);
}
function journal() {
  if(!started)return;
  drawer('Your negotiating journal',`<p>${esc(month().label)} · ${verified(state).length} tested records. This is the fictional history of your campaign.</p>${state.journal.length?state.journal.map(e=>`<article class="journal-entry"><small>${esc(campaign.months[e.month].label)}</small><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${e.routeId?`<button class="text-button" data-evidence="${esc(e.routeId)}">Open the research behind this decision ↗</button>`:''}</article>`).join(''):'<p>Your first council decision will begin the record.</p>'}`);
}
function fresh() {
  const begin=()=>{state=newGame();started=true;saved=true;unreadableSave=false;filter='';all=false;save();render();};
  if(saved||unreadableSave)drawer('Start a new campaign?',`<p>This replaces the campaign saved on this device.</p><button class="primary" data-act="confirm-new">Start a new campaign</button><button class="text-button" data-act="close">Keep the current campaign</button>`);
  else begin();
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled||!campaign)return;
  if(b.dataset.council){update(()=>council(state,b.dataset.council));return;}
  if(b.dataset.meet){update(()=>enterMeeting(state,campaign,b.dataset.meet));return;}
  if(b.dataset.choice){update(()=>choose(state,campaign,b.dataset.choice));return;}
  if(b.dataset.summit){update(()=>summit(state,b.dataset.summit));return;}
  if(b.dataset.evidence){evidence(b.dataset.evidence);return;}
  const act=b.dataset.act;
  if(act==='new')fresh();
  if(act==='confirm-new'){state=newGame();started=true;unreadableSave=false;filter='';all=false;$('#drawer').close();save();render();}
  if(act==='resume'){started=true;render();}
  if(act==='title'){started=false;render();}
  if(act==='lounge')update(()=>leaveConversation(state));
  if(act==='all'){all=!all;render();}
  if(act==='guide'||b.id==='guide-button')guide();
  if(act==='journal'||b.id==='journal-button')journal();
  if(act==='close'||b.id==='close-drawer')$('#drawer').close();
  if(act==='advance'){
    if(state.actions>0)drawer('Close this month?',`<p>You have ${state.actions} meeting decision${state.actions===1?'':'s'} left. Unused meetings do not carry over.</p><button class="primary" data-act="confirm-advance">${state.month===7?'Enter the Geneva session':'Close the month'}</button><button class="text-button" data-act="close">Return to the lounge</button>`);
    else update(()=>advance(state));
  }
  if(act==='confirm-advance'){$('#drawer').close();update(()=>advance(state));}
  if(act==='final-meetings')update(()=>({...state,phase:'hub'}));
});
document.addEventListener('keydown',e=>{
  if(!started||$('#drawer').open||e.altKey||e.ctrlKey||e.metaKey||e.repeat||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;
  if(/^[123]$/.test(e.key)) {const buttons=[...$('#main').querySelectorAll('[data-choice],[data-council],[data-summit]')];const b=buttons[Number(e.key)-1];if(b&&!b.disabled){e.preventDefault();b.click();}}
});
async function init() {
  const res=await fetch('campaign.json',{cache:'no-cache'});if(!res.ok)throw Error(`Campaign HTTP ${res.status}`);
  campaign=await res.json();
  const requested=new URLSearchParams(location.search).get('route');
  if(campaign.routes.some(r=>r.id===requested))focusRoute=requested;
  try {const raw=localStorage.getItem(SAVE);if(raw){const candidate=JSON.parse(raw);if(validSave(candidate,campaign)){state=candidate;saved=true;}else unreadableSave=true;}}
  catch {unreadableSave=true;}
  render();
}
init().catch(e=>{$('#main').innerHTML=`<section class="panel"><h1>The dossier could not be opened.</h1><p>${esc(e.message)}</p><p>Reload this page to retry, or ${safeLink('../routes/stress-tests.html','read the research')}.</p></section>`;});
