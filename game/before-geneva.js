import {newGame, council, enterMeeting, choose, advance, summit, verified, routeStatus, meetingReason, choiceReason, costFor, validSave, leaveConversation, monthSummary} from './story-engine.mjs';

// Presentation layer only: lever cards, rewards and the Geneva board are derived from engine state.
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SAVE='before-geneva-save-v1', MUTE='before-geneva-mute';
const ART=['01-november-council.jpg','02-february-negotiation-1-49f6789f062e.jpg','03-april-disputed-report-1-60badf629bae.jpg','04-geneva-final-clause-1-ddbbb378de0e.jpg'];
const RES={budget:['🪙','Money'],evidence:['🔍','Proof'],mandate:['🤝','Support']};
const LEVERS={buy:['🛒','Buying power'],compute:['🖥️','Computers'],money:['💰','Investment'],regulator:['⚖️','Rules']};
const ICON={challenge:'🔍',terms:'🤝',leave:'↩',brief:'🕵️',provisional:'▶',pilot:'🧪',shared:'🌐',defer:'⏸',retest:'🔧',pause:'📢',close:'🗺️'};
const FLAG={'Belgium':'be','Brazil':'br','Canada':'ca','Chile':'cl','Colombia':'co','Czech Republic':'cz','Denmark':'dk','EU institutions':'eu','EU participating states':'eu','EuroHPC participating states':'eu','Estonia':'ee','Finland':'fi','Iceland':'is','India':'in','Indonesia':'id','Japan':'jp','Kenya':'ke','Malaysia':'my','Mexico':'mx','Netherlands':'nl','Nigeria':'ng','Norway':'no','Poland':'pl','Rwanda':'rw','Saudi Arabia':'sa','Singapore':'sg','South Africa':'za','South Korea':'kr','Sweden':'se','Switzerland':'ch','Taiwan':'tw','Thailand':'th','Türkiye':'tr','UAE':'ae','United Kingdom':'gb','United States':'us','Vietnam':'vn'};
const featured=['jp-procurement-safety-evidence','indiaai-subsidy-evaluation-gate','brazil-anpd-ai-inspection-evidence','lumi-national-evidence-protocol','sg-agent-data-leakage-deployment-gate','kenya-biometric-dpia-evidence-gate','canada-cohere-equity-safety-covenant','taiwan-public-compute-safety-conditions'];
let campaign,state,started=false,saved=false,filter='',lever='',all=false,notice='',unreadableSave=false,focusRoute='',muted=false,quizAnswers={};
const route=id=>campaign.routes.find(r=>r.id===id);
const month=()=>campaign.months[state?.month??0];
const flags=(r,max=6)=>{const codes=[...new Set(r.countries.map(c=>FLAG[c]).filter(Boolean))];return `<span class="flags">${codes.slice(0,max).map(c=>`<img src="flags/${c}.svg" alt="">`).join('')}${codes.length>max?`<b>+${codes.length-max}</b>`:''}</span>`;};
const leverChip=k=>`<span class="lever-chip lv-${k}">${LEVERS[k][0]} ${LEVERS[k][1]}</span>`;
const costText=cost=>Object.entries(cost).filter(([,n])=>n>0).map(([k,v])=>`${RES[k][0]} −${v}`).join('  ');
function safeLink(href,label) {try {const u=new URL(href,location.href);return ['https:','http:'].includes(u.protocol)?`<a href="${esc(u.href)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`:esc(label);}catch{return esc(label);}}

// ---------- Lever cards (derived from projects, never stored) ----------
function cards(s=state) {
  return Object.entries(s?.projects??{}).filter(([,p])=>p.strategy).map(([id,p])=>({id,r:route(id),tested:p.stage==='tested',strategy:p.strategy}));
}
function board(s=state) {
  const b={};for(const k of Object.keys(LEVERS))b[k]=[];
  for(const c of cards(s))b[c.r.lever].push(c);
  return b;
}
function boardHTML(s=state,big=false) {
  const b=board(s);
  return `<div class="board ${big?'big':''}">${Object.entries(LEVERS).map(([k,[ic,name]])=>{
    const list=b[k],combo=list.length>=2;
    return `<div class="lever-col lv-${k} ${combo?'combo':''}"><div class="lever-head"><span>${ic}</span><b>${name}</b>${combo?`<em>×${list.length}</em>`:''}</div><div class="lever-cards">${list.map(c=>`<span class="mini ${c.tested?'gold':''}" title="${esc(c.r.title)}">${flags(c.r,2)}${c.tested?'<i>★</i>':''}</span>`).join('')||'<span class="empty-slot">—</span>'}</div></div>`;
  }).join('')}</div>`;
}

// ---------- Rewards ----------
let audio;
function sound(kind) {
  if(muted)return;
  try {
    audio??=new (window.AudioContext||window.webkitAudioContext)();
    const t=audio.currentTime,notes=kind==='gold'?[523,659,784,1047]:kind==='combo'?[392,523,659,784,988]:kind==='small'?[660]:[196,392,523];
    notes.forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type=i?'triangle':'square';o.frequency.value=f;g.gain.setValueAtTime(0.0001,t+i*0.07);g.gain.exponentialRampToValueAtTime(i?0.12:0.18,t+i*0.07+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+i*0.07+0.35);o.connect(g).connect(audio.destination);o.start(t+i*0.07);o.stop(t+i*0.07+0.4);});
  } catch {}
}
function rewards(before,after) {
  const out=[];
  if(before.phase==='council'&&after.phase==='hub'){for(const k of Object.keys(RES)){const d=after.resources[k]-before.resources[k];if(d>0)out.push({kind:'small',big:`${RES[k][0]} +${d}`,small:RES[k][1]});}}
  if(after.prepared.length>before.prepared.length)out.push({kind:'small',big:'🕵️ Intel',small:'Your next fix is cheaper'});
  const bc=new Map(cards(before).map(c=>[c.id,c])),bb=board(before),ab=board(after);
  for(const c of cards(after)){
    const old=bc.get(c.id);
    if(!old)out.push({kind:'card',card:c,big:'Lever card won',small:`${LEVERS[c.r.lever][1]} · ${c.r.countries.slice(0,2).join(', ')}`});
    else if(c.tested&&!old.tested)out.push({kind:'gold',card:c,big:'★ Test passed',small:'Your card turns gold'});
  }
  for(const k of Object.keys(LEVERS))if(ab[k].length>=2&&ab[k].length>bb[k].length)out.push({kind:'combo',big:`Combo ×${ab[k].length}`,small:`${ab[k].length} countries, one lever. Harder to ignore.`});
  return out;
}
let queue=[],showing=false;
function celebrate(list) {queue.push(...list);if(!showing)nextReward();}
function nextReward() {
  const r=queue.shift(),box=$('#reward');
  if(!r){showing=false;box.hidden=true;return;}
  showing=true;sound(r.kind);
  box.className=`reward ${r.kind}`;
  box.innerHTML=(r.card?`<div class="reward-card lv-${r.card.r.lever} ${r.kind==='gold'?'gold':''}">${flags(r.card.r,4)}<span class="lever-icon">${LEVERS[r.card.r.lever][0]}</span><strong>${esc(r.card.r.title)}</strong><span class="stars">${r.kind==='gold'?'★★★':'★'}</span></div>`:'')+`<p class="reward-big">${esc(r.big)}</p><p>${esc(r.small)}</p>`;
  box.hidden=false;box.style.animation='none';void box.offsetWidth;box.style.animation='';
  clearTimeout(nextReward.t);nextReward.t=setTimeout(nextReward,r.kind==='small'?1100:2100);
}

function save() {
  try {localStorage.setItem(SAVE,JSON.stringify(state));saved=true;$('#save-status').textContent='Saved';}
  catch {$('#save-status').textContent='Not saved · keep this tab open';}
}
function update(fn) {
  const before=state;
  try {state=fn();notice='';save();render();$('#main').focus({preventScroll:true});if(before)celebrate(rewards(before,state));}
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
  $('#hud').innerHTML=`<button class="brand" data-act="title"><span class="seal">◎</span><span>BEFORE GENEVA<small>Middle powers · real levers</small></span></button>${started?`<ol class="timeline" aria-label="Months">${campaign.months.map((m,i)=>`<li class="${i===state.month?'active':i<state.month?'past':''}" ${i===state.month?'aria-current="step"':''}><span>${m.short}</span></li>`).join('')}</ol><div class="resources">${Object.entries(state.resources).map(([k,v])=>`<span title="${RES[k][1]}"><b>${RES[k][0]} ${v}</b><small>${RES[k][1]}</small></span>`).join('')}</div>`:'<span class="header-note">Nov 2026 → Geneva, June 2027</span>'}`;
  $('#journal-button').disabled=!started;
}
function startScreen() {
  return `<section class="title-screen"><p class="eyebrow countdown">Eight months to Geneva</p><h1>Before<br><em>Geneva.</em></h1><p class="tagline">Middle powers already hold real levers.<br><b>Together, they're hard to ignore.</b></p><div class="lever-row">${Object.values(LEVERS).map(([ic,n])=>`<span>${ic}<small>${n}</small></span>`).join('')}</div><div class="title-actions">${saved?'<button class="primary" data-act="resume">Continue <span>→</span></button>':''}<button class="${saved?'secondary':'primary'}" data-act="new">${saved?'New game':'Start'} <span>→</span></button><button class="text-button" data-act="guide">How to play</button></div>${unreadableSave?'<p class="warning">Old save could not be opened. A new game replaces it.</p>':''}<p class="fineprint">Fiction: outcomes are invented. Country facts come from public research.</p><a class="legacy-link" href="orbit.html">Also play Orbit Accord ↗</a></section>`;
}
function councilScreen() {
  const opts=[['funding','🪙','Raise money','+3 money'],['research','🔍','Gather proof','+2 proof'],['diplomacy','🤝','Win support','+2 support']];
  return `<section class="council-screen"><p class="eyebrow">${esc(month().label)}</p><h1>${esc(month().title)}</h1><p class="scene-copy">${esc(month().event)}</p>${state.month?boardHTML():''}<div class="pick-row">${opts.map(([id,ic,t,s],i)=>`<button class="pick" data-council="${id}"><span class="pick-ic">${ic}</span><strong>${t}</strong><small>${s}</small><kbd>${i+1}</kbd></button>`).join('')}</div></section>`;
}
function contacts() {
  let rows=campaign.routes.filter(r=>(!lever||r.lever===lever)&&(!filter||[r.title,...r.countries].join(' ').toLowerCase().includes(filter.toLowerCase())));
  rows.sort((a,b)=>{
    const priority=r=>r.id===focusRoute?-3:routeStatus(state,r.id)==='Results are back!'?-2:featured.includes(r.id)?featured.indexOf(r.id):100;
    return priority(a)-priority(b)||a.title.localeCompare(b.title);
  });
  if(!all&&!filter&&!lever)rows=rows.slice(0,8);
  $('#contacts').innerHTML=rows.length?rows.map(r=>{
    const reason=meetingReason(state,r.id),status=routeStatus(state,r.id),p=state.projects[r.id];
    return `<article class="contact lv-${r.lever} ${status==='Results are back!'?'ready':''} ${p?.stage==='tested'?'gold':''}"><button class="contact-main" data-meet="${esc(r.id)}" ${reason?'disabled':''}>${flags(r)}<strong>${esc(r.title)}</strong>${leverChip(r.lever)}<span class="status">${esc(reason||status)}</span></button><button class="dossier-button" data-evidence="${esc(r.id)}" aria-label="Research: ${esc(r.title)}">Research</button></article>`;
  }).join(''):'<p class="empty">No match.</p>';
}
function hubScreen() {
  return `<section class="hub"><div class="chapter-heading"><p class="eyebrow">${esc(month().label)}</p><h1>${esc(month().title)}</h1><p class="meetings">${'●'.repeat(state.actions)}${'○'.repeat(3-state.actions)} <span>meetings left</span></p></div>${boardHTML()}${hubExtras()}<section class="contact-panel panel"><div class="contact-toolbar"><div class="lever-filter" role="group" aria-label="Filter by lever"><button data-lever="" aria-pressed="${!lever}">All</button>${Object.entries(LEVERS).map(([k,[ic,n]])=>`<button data-lever="${k}" aria-pressed="${lever===k}" title="${n}">${ic}<span> ${n}</span></button>`).join('')}</div><input id="contact-search" type="search" value="${esc(filter)}" placeholder="Search a country" aria-label="Search a country"><button class="text-button" data-act="all" aria-pressed="${all}">${all?'Fewer':'All 32'}</button></div><div id="contacts" class="contacts"></div><div class="hub-footer"><button class="primary" data-act="advance">${state.month===7?'Go to Geneva':'End month'} →</button></div></section></section>`;
}
function dialogueScreen() {
  const r=route(state.conversation.routeId),nodeId=state.conversation.node,node=r.nodes[nodeId];
  let memory='';
  if(r.id==='indiaai-subsidy-evaluation-gate'&&state.projects['jp-procurement-safety-evidence']?.stage==='tested')memory='Bonus: your Japan test helps here.';
  if(r.id==='lumi-national-evidence-protocol'&&state.projects['lumi-belgium-safety-appendix']?.stage==='tested')memory='Bonus: your Belgium test helps here.';
  const line=nodeId==='receipt'?state.conversation.receipt:node.text;
  return `<section class="dialogue-screen"><div class="dialogue-heading"><p class="eyebrow">${esc(month().label)}${nodeId==='report'?' · results are back':''}</p><div class="dlg-title">${flags(r)}<h1>${esc(r.title)}</h1></div>${leverChip(r.lever)}${r.about?`<p class="about-line">${esc(r.about)}</p>`:''}<button class="glass-button" data-evidence="${esc(r.id)}">Research ↗</button> <button class="glass-button" data-act="lounge">↩ Back</button></div>${memory?`<p class="memory dialogue-memory">${esc(memory)}</p>`:''}<div class="dialogue-bottom"><article class="dialogue-box ${nodeId==='report'?'catch':''}">${nodeId==='report'?'<p class="catch-banner">⚠ The catch</p>':''}<p class="speaker">${esc(r.speaker)}</p><p class="speech" aria-live="polite">${esc(line)}</p>${nodeId==='report'&&r.repair?`<details class="repair-plan"><summary>What would fixing it involve?</summary><p>${esc(r.repair)}</p></details>`:''}${nodeId==='receipt'?resultHtml(r):''}</article><div class="response-box"><div class="choices">${node.choices.map((c,i)=>{
    const reason=choiceReason(state,c),cost=costText(costFor(state,c.action));
    return `<button data-choice="${esc(c.id)}" ${reason?'disabled':''}><span class="choice-number">${ICON[c.id]??'▶'}</span><span><strong>${esc(c.label)}</strong><small>${esc(reason||[cost,c.detail].filter(Boolean).join(' · '))}</small></span><kbd>${i+1}</kbd></button>`;
  }).join('')}</div>${state.projects[r.id]?.stage==='tested'?knowledgeCheck(r):''}</div></div></section>`;
}
function summitScreen() {
  const count=verified(state).length,shared=verified(state).filter(([,p])=>p.strategy==='shared').length,ok=count>=3&&shared&&state.resources.mandate>=2;
  return `<section class="council-screen summit"><p class="eyebrow">Geneva · 21 June 2027</p><h1>The vote.</h1><p class="scene-copy">Lay your levers on the table.</p>${boardHTML(state,true)}<div class="pick-row"><button class="pick" data-summit="verification"><span class="pick-ic">🌐</span><strong>Everyone checks everyone</strong><small>${ok?'✓ You have enough':'Needs 3 ★ (1 shared) + 2 🤝'}</small><kbd>1</kbd></button><button class="pick" data-summit="phased"><span class="pick-ic">🪜</span><strong>Start small</strong><small>${count?'✓ You have enough':'Needs 1 ★'}</small><kbd>2</kbd></button><button class="pick" data-summit="record"><span class="pick-ic">📜</span><strong>Honest list</strong><small>Always possible</small><kbd>3</kbd></button></div><button class="text-button" data-act="final-meetings">↩ Last meetings</button></section>`;
}
function endingScreen() {
  const e=state.ending;
  const title=e.kind==='record'?'An honest list.':!e.success?'Pulled alone.':e.kind==='phased'?'A first step.':'Your levers held.';
  const copy=e.kind==='record'?'Real levers, not yet proven to stop anything. You say so.':!e.success?'Real levers, too few tested. Too easy to ignore.':e.kind==='phased'?'A few levers, tested and pulled together. A start.':'Together, middle powers were hard to ignore.';
  const stars=e.kind==='verification'&&e.success?3:e.success&&e.kind==='phased'?2:e.success?1:0;
  return `<section class="ending"><p class="eyebrow">Geneva · final result</p><p class="end-stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</p><h1>${title}</h1><p class="scene-copy">${copy}</p>${boardHTML(state,true)}<div class="ending-stats"><span><b>${e.tested}</b>★ tests</span><span><b>${cards().length}</b>lever cards</span><span><b>${Object.values(board()).filter(l=>l.length>=2).length}</b>combos</span></div><p class="fineprint">Fiction: game rules, not a forecast. The research shows what is still uncertain.</p><div class="title-actions"><button class="primary" data-act="new">Play again</button><button class="secondary" data-act="journal">Journal</button><a href="../routes/stress-tests.html">Real research ↗</a></div></section>`;
}
function render() {
  backdrop();hud();
  $('#main').innerHTML=(notice?`<p class="notice" role="alert">${esc(notice)}</p>`:'')+(!started?startScreen():state.phase==='council'?councilScreen():state.phase==='hub'?hubScreen():state.phase==='conversation'?dialogueScreen():state.phase==='summit'?summitScreen():endingScreen());
  if(started&&state.phase==='hub') {
    contacts();$('#contact-search').addEventListener('input',e=>{filter=e.target.value;contacts();});
  }
  $('#mute-button').textContent=muted?'🔇':'🔊';
}
// ---------- Learning layer (learning-notes.json, from the team): results, month review, optional quiz ----------
const deltaHtml=delta=>{const items=Object.entries(delta).filter(([,n])=>n!==0);return `<p class="resource-change">${items.length?items.map(([k,v])=>`<span>${RES[k][0]} ${v>0?'+':'−'}${Math.abs(v)} ${RES[k][1]}</span>`).join(''):'<span>No change</span>'}</p>`;};
function goalProgress() {
  const count=verified(state).length,shared=verified(state).some(([,p])=>p.strategy==='shared');
  return `<details class="goal-progress"><summary>🎯 Goal: one ★ test for Geneva <b>${count?'✓':'0 / 1'}</b></summary><p>A ★ test: start it, come back next month, fix the catch, test again.</p><p>Big deal at Geneva: <strong>${Math.min(count,3)}/3</strong> ★ · <strong>${shared?1:0}/1</strong> shared · <strong>${Math.min(state.resources.mandate,2)}/2</strong> 🤝</p></details>`;
}
function hubExtras() {
  const next=monthSummary(state).ready.find(id=>!meetingReason(state,id));
  return `<div class="hub-extras">${goalProgress()}${next?`<button class="next-meeting" data-meet="${esc(next)}">⚡ Results are back: ${esc(route(next).title)} →</button>`:''}</div>`;
}
function resultHtml(r) {
  const result=state.conversation.result,p=state.projects[r.id],done=p?.stage==='tested',plan=p?.strategy&&r.plans?.[p.strategy];
  const next=result?.next||(done?'Take it to Geneva, or start another.':'Come back when ready.');
  return `<div class="result-card meeting-result">${result?.delta?deltaHtml(result.delta):''}<p class="next-step">➜ Next step: ${esc(next)}</p>${plan?`<details><summary>What your team agreed</summary><p>${esc(plan)}</p></details>`:''}${done&&r.lesson?`<details open><summary>What this shows</summary><p>${esc(r.lesson)}</p><p class="fineprint">A pretend pass. Not proof a real system is safe.</p></details>`:''}</div>`;
}
function knowledgeCheck(r) {
  if(!r.check)return '';
  const answer=quizAnswers[r.id];
  return `<details class="knowledge-check" ${answer!==undefined?'open':''}><summary>❓ Quick question (optional)</summary><p>${esc(r.check.question)}</p><div class="check-answers">${r.check.answers.map((text,i)=>`<button data-check="${i}" data-check-route="${esc(r.id)}" aria-pressed="${answer===i}">${esc(text)}</button>`).join('')}</div>${answer!==undefined?`<p role="status"><strong>${answer===r.check.correctIndex?'✓ That’s right.':'✗ Not quite.'}</strong> ${esc(r.check.explanation)}</p>`:''}</details>`;
}
function reviewMonth() {
  const sm=monthSummary(state),ready=sm.ready.filter(id=>!meetingReason(state,id));
  const list=ids=>ids.length?`<ul>${ids.map(id=>`<li>${esc(route(id).title)}</li>`).join('')}</ul>`:'<p>None.</p>';
  drawer(`${month().label}: your month`,`<section class="month-summary">${boardHTML()}<p><strong>${sm.meetingsUsed}/3 meetings used.</strong>${state.actions?' Unused meetings are lost.':''}</p><h3>★ Finished tests: ${sm.completed.length}</h3>${list(sm.completed)}<h3>🧪 Started: ${sm.started.length}</h3>${list(sm.started)}${sm.delta?`<h3>Points this month</h3>${deltaHtml(sm.delta)}`:''}${sm.unfinished.length?`<h3>${state.month===7?'Unfinished at Geneva':'Still open'}</h3>${list(sm.unfinished)}`:''}${ready.map(id=>`<button class="text-button" data-return="${esc(id)}">⚡ Results are back: ${esc(route(id).title)} →</button>`).join('')}<div class="summary-actions"><button class="primary" data-act="confirm-advance">${state.month===7?'Go to Geneva':'End month'} →</button><button class="text-button" data-act="close">Keep playing</button></div></section>`);
}
function drawer(title,body) {$('#drawer-title').textContent=title;$('#drawer-body').innerHTML=body;if(!$('#drawer').open)$('#drawer').showModal();}
function guide() {
  drawer('How to play',`<ol class="guide"><li><b>🎯 The job:</b> get AI safety into the Geneva deal, June 2027.</li><li><b>🪙🔍🤝 Each month:</b> pick money, proof or support.</li><li><b>🗺️ Meet countries:</b> 3 meetings a month. Each has a lever: ${Object.values(LEVERS).map(([i,n])=>`${i} ${n}`).join(', ')}.</li><li><b>🧪 Make a deal:</b> win a lever card.</li><li><b>⚠ Next month:</b> fix the catch. ★ Your card turns gold.</li><li><b>🔥 Combo:</b> two countries on one lever = harder to ignore (a game bonus).</li><li><b>🌐 Geneva:</b> lay down your cards. More ★ = a bigger deal.</li></ol><p>Tap an answer or press 1–3. No timer. Saves on this device.</p><p class="fineprint">${esc(campaign.fictionNotice)} Combos are a game rule. Research snapshot: ${esc(campaign.researchObserved)}.</p><p><a href="campaign.json" target="_blank">All conversations ↗</a> · <a href="orbit.html">Orbit Accord ↗</a></p>`);
}
function evidence(id) {
  const r=route(id);if(!r)return;
  drawer(r.title,`<p class="eyebrow">Real research · ${esc(r.researchTitle||r.title)} · ${esc(campaign.researchObserved)}</p>${r.about?`<p class="dossier-lead">${esc(r.about)}</p>`:''}${r.lesson?`<p>${esc(r.lesson)}</p>`:''}${r.researchContext?`<p><strong>Context:</strong> ${esc(r.researchContext)}</p>`:''}<details class="research-depth"><summary>Go deeper: the research team's own wording</summary><p><strong>Found:</strong> ${esc(r.research.headline)}</p><p><strong>Next real test:</strong> ${esc(r.research.nextTest)}</p><details><summary>Still unknown</summary><ul>${r.research.unknowns.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><details><summary>Evidence</summary>${r.research.evidence.map(e=>`<p>${esc(e.claim)}</p><small>${esc(e.locator)}</small>`).join('')}</details><h3>Sources</h3>${r.research.sources.map(s=>`<article class="source"><strong>${safeLink(s.href,s.title)}</strong><p>${esc(s.locator)}</p><small>${esc(s.access)} · ${esc(s.sourceCheck)}</small></article>`).join('')}<p>${safeLink('../routes/stress-tests.html?route='+encodeURIComponent(id),'Full research')} · ${safeLink('../routes/#basis=model&route='+encodeURIComponent(id),'On the chart')}</p></details><p class="fineprint">The game's conversations are made up, based on this research.</p>`);
}
function journal() {
  if(!started)return;
  drawer('Journal',`${boardHTML()}${state.journal.length?state.journal.slice().reverse().map(e=>`<article class="journal-entry"><small>${esc(campaign.months[e.month].label)}</small><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${e.routeId?`<button class="text-button" data-evidence="${esc(e.routeId)}">Research ↗</button>`:''}</article>`).join(''):'<p>Nothing yet.</p>'}`);
}
function fresh() {
  const begin=()=>{state=newGame();started=true;saved=true;unreadableSave=false;filter='';lever='';all=false;save();render();};
  if(saved||unreadableSave)drawer('New game?',`<p>This replaces your saved game.</p><button class="primary" data-act="confirm-new">New game</button><button class="text-button" data-act="close">Keep playing</button>`);
  else begin();
}
document.addEventListener('click',e=>{
  if(e.target.closest('#reward')){clearTimeout(nextReward.t);nextReward();return;}
  const b=e.target.closest('button');if(!b||b.disabled||!campaign)return;
  if(b.dataset.council){update(()=>council(state,b.dataset.council));return;}
  if(b.dataset.meet){update(()=>enterMeeting(state,campaign,b.dataset.meet));return;}
  if(b.dataset.choice){update(()=>choose(state,campaign,b.dataset.choice));return;}
  if(b.dataset.summit){update(()=>summit(state,b.dataset.summit));return;}
  if(b.dataset.evidence){evidence(b.dataset.evidence);return;}
  if(b.dataset.lever!==undefined){lever=b.dataset.lever;render();return;}
  if(b.dataset.return){$('#drawer').close();update(()=>enterMeeting(state,campaign,b.dataset.return));return;}
  if(b.dataset.check!==undefined){quizAnswers[b.dataset.checkRoute]=Number(b.dataset.check);b.closest('.knowledge-check').outerHTML=knowledgeCheck(route(b.dataset.checkRoute));return;}
  const act=b.dataset.act;
  if(b.id==='mute-button'){muted=!muted;try{localStorage.setItem(MUTE,muted?'1':'');}catch{}render();return;}
  if(act==='new')fresh();
  if(act==='confirm-new'){state=newGame();started=true;unreadableSave=false;filter='';lever='';all=false;quizAnswers={};$('#drawer').close();save();render();}
  if(act==='resume'){started=true;render();}
  if(act==='title'){started=false;render();}
  if(act==='lounge')update(()=>leaveConversation(state));
  if(act==='all'){all=!all;render();}
  if(act==='guide'||b.id==='guide-button')guide();
  if(act==='journal'||b.id==='journal-button')journal();
  if(act==='close'||b.id==='close-drawer')$('#drawer').close();
  if(act==='advance')reviewMonth();
  if(act==='confirm-advance'){$('#drawer').close();update(()=>advance(state));}
  if(act==='final-meetings')update(()=>({...state,phase:'hub'}));
});
document.addEventListener('keydown',e=>{
  if(!started||$('#drawer').open||e.altKey||e.ctrlKey||e.metaKey||e.repeat||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;
  if(/^[123]$/.test(e.key)) {const buttons=[...$('#main').querySelectorAll('[data-choice],[data-council],[data-summit]')];const b=buttons[Number(e.key)-1];if(b&&!b.disabled){e.preventDefault();b.click();}}
});
async function init() {
  try {muted=!!localStorage.getItem(MUTE);} catch {}
  const res=await fetch('campaign.json',{cache:'no-cache'});if(!res.ok)throw Error(`Campaign HTTP ${res.status}`);
  campaign=await res.json();
  const requested=new URLSearchParams(location.search).get('route');
  if(campaign.routes.some(r=>r.id===requested))focusRoute=requested;
  try {const raw=localStorage.getItem(SAVE);if(raw){const candidate=JSON.parse(raw);if(validSave(candidate,campaign)){state=candidate;saved=true;}else unreadableSave=true;}}
  catch {unreadableSave=true;}
  render();
}
init().catch(e=>{$('#main').innerHTML=`<section class="panel"><h1>The game could not load.</h1><p>${esc(e.message)}</p><p>Reload to try again, or ${safeLink('../routes/stress-tests.html','read the research')}.</p></section>`;});
