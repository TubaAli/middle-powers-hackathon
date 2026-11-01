import {newGame, council, enterMeeting, choose, advance, summit, verified, routeStatus, meetingReason, choiceReason, costFor, validSave, leaveConversation, monthSummary, RESOURCE_NAMES} from './story-engine.mjs';

const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SAVE='before-geneva-save-v1';
const ART=['01-november-council.jpg','02-february-negotiation-1-49f6789f062e.jpg','03-april-disputed-report-1-60badf629bae.jpg','04-geneva-final-clause-1-ddbbb378de0e.jpg'];
const names=RESOURCE_NAMES;
const featured=['jp-procurement-safety-evidence','indiaai-subsidy-evaluation-gate','brazil-anpd-ai-inspection-evidence','lumi-national-evidence-protocol','sg-agent-data-leakage-deployment-gate','kenya-biometric-dpia-evidence-gate','ch-electricity-operator-fallback','taiwan-public-compute-safety-conditions'];
let campaign,state,started=false,saved=false,filter='',all=false,notice='',unreadableSave=false,focusRoute='';
let quizAnswers={};
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
  $('#hud').innerHTML=`<button class="brand" data-act="title"><span class="seal">◎</span><span>BEFORE GENEVA<small>A story game about making AI safer</small></span></button>${started?`<ol class="timeline" aria-label="Months">${campaign.months.map((m,i)=>`<li class="${i===state.month?'active':i<state.month?'past':''}" ${i===state.month?'aria-current="step"':''}><span>${m.short}</span></li>`).join('')}</ol><div class="resources">${Object.entries(state.resources).map(([k,v])=>`<span><b>${v}</b><small>${names[k]}</small></span>`).join('')}</div>`:'<span class="header-note">November 2026 — June 2027</span>'}`;
  $('#journal-button').disabled=!started;
}
function startScreen() {
  return `<section class="title-screen"><p class="eyebrow">Eight months to make AI safer</p><h1>Before<br><em>Geneva.</em></h1><p class="tagline">Making a promise is easy.<br>Making it work is hard.</p><p class="intro-copy">You lead a small team. Countries around the world have ideas to make AI safer. Talk to them, test their ideas, and see what everyone can honestly agree on at a big meeting in Geneva in June.</p><div class="title-actions">${saved?'<button class="primary" data-act="resume">Continue <span>→</span></button>':''}<button class="${saved?'secondary':'primary'}" data-act="new">${saved?'Start a new game':'Start the game'} <span>→</span></button><button class="text-button" data-act="guide">How to play</button></div>${unreadableSave?'<p class="warning">Your old save could not be opened. Starting a new game will replace it.</p>':''}<p class="fineprint">Pretend people. Real ideas. No timer.<br>What happens in the game is made up. Every country links to the real research.</p><a class="legacy-link" href="orbit.html">Play our first game, Orbit Accord ↗</a></section>`;
}
function councilScreen() {
  const recent=state.journal.filter(e=>e.routeId).at(-1);
  return `<section class="council-screen panel"><p class="eyebrow">${esc(month().label)} · team meeting</p><h1>${esc(month().title)}</h1><p class="scene-copy">${esc(month().event)}</p>${recent?`<p class="memory">Last thing you did: ${esc(recent.title.toLowerCase())} — ${esc(route(recent.routeId).title)}.</p>`:''}<p class="subheading">What should your team focus on this month?</p><div class="choices"><button data-council="funding"><span class="choice-number">01</span><span><strong>Raise money for tests</strong><small>+3 money · pay for small test runs and fixes.</small></span></button><button data-council="research"><span class="choice-number">02</span><span><strong>Gather proof</strong><small>+2 proof · research a case and check the results.</small></span></button><button data-council="diplomacy"><span class="choice-number">03</span><span><strong>Build support from other countries</strong><small>+2 support · needed for shared deals.</small></span></button></div><p class="fineprint">Each month: one team choice, then three meetings. The points show your team's effort. They are not real money or real agreement.</p></section>`;
}
function cards() {
  let rows=campaign.routes.filter(r=>!filter||[r.title,...r.countries].join(' ').toLowerCase().includes(filter.toLowerCase()));
  rows.sort((a,b)=>{
    const priority=r=>r.id===focusRoute?-3:routeStatus(state,r.id)==='Results are back!'?-2:featured.includes(r.id)?featured.indexOf(r.id):100;
    return priority(a)-priority(b)||a.title.localeCompare(b.title);
  });
  if(!all&&!filter)rows=rows.slice(0,8);
  $('#contacts').innerHTML=rows.length?rows.map(r=>{
    const reason=meetingReason(state,r.id),status=routeStatus(state,r.id);
    return `<article class="contact ${status==='Results are back!'?'ready':''}"><button class="contact-main" data-meet="${esc(r.id)}" ${reason?'disabled':''}><small>${esc(r.countries.join(' · '))}</small><strong>${esc(r.title)}</strong>${r.about?`<em class="about">${esc(r.about)}</em>`:''}<span>${esc(reason||status)} ${!reason?'→':''}</span></button><button class="dossier-button" data-evidence="${esc(r.id)}" aria-label="Research: ${esc(r.title)}">Research ↗</button></article>`;
  }).join(''):'<p class="empty">No match. Try another country or idea.</p>';
}
function hubScreen() {
  return `<section class="hub"><div class="chapter-heading"><p class="eyebrow">${esc(month().label)} · the lounge</p><h1>${esc(month().title)}</h1><p>${state.actions} meeting${state.actions===1?'':'s'} left <span>· ${verified(state).length} finished test${verified(state).length===1?'':'s'}</span></p></div><section class="contact-panel panel"><div class="contact-toolbar"><label>Find a country<input id="contact-search" type="search" value="${esc(filter)}" placeholder="Country or idea"></label><button class="text-button" data-act="all" aria-pressed="${all}">${all?'Show fewer':'Show all 32'}</button></div><div id="contacts" class="contacts"></div><div class="hub-footer"><p>Reading research is free. A meeting is used up when you start, fix or put off a test.</p><button class="primary" data-act="advance">${state.month===7?'Go to the Geneva meeting':'End the month'} →</button></div></section></section>`;
}
function dialogueScreen() {
  const r=route(state.conversation.routeId),node=r.nodes[state.conversation.node];
  let memory='';
  if(r.id==='indiaai-subsidy-evaluation-gate'&&state.projects['jp-procurement-safety-evidence']?.stage==='tested')memory='Your team brings its test results from Japan. They help, but they do not give you power over a company in India.';
  if(r.id==='lumi-national-evidence-protocol'&&state.projects['lumi-belgium-safety-appendix']?.stage==='tested')memory='Your Belgian test is already in your journal. Now you can ask what one shared rule would add.';
  return `<section class="dialogue-screen"><div class="dialogue-heading"><p class="eyebrow">${esc(month().label)} · ${state.conversation.node==='report'?'follow-up meeting':'meeting'}</p><h1>${esc(r.title)}</h1>${r.about?`<p class="about-line">${esc(r.about)}</p>`:''}<button class="glass-button" data-evidence="${esc(r.id)}">Read the real research ↗</button> <button class="glass-button" data-act="lounge">Back to lounge</button></div>${memory?`<p class="memory dialogue-memory">${esc(memory)}</p>`:''}<div class="dialogue-bottom"><article class="dialogue-box"><p class="speaker">${esc(r.speaker)}</p><p class="speech" aria-live="polite">${esc(state.conversation.node==='receipt'?state.conversation.receipt:node.text)}</p><small>${state.prepared.includes(r.id)?'Your team researched this':'Not researched yet'} · ${routeStatus(state,r.id)}</small></article><div class="response-box"><p class="eyebrow">What do you say?</p><div class="choices">${node.choices.map((c,i)=>{
    const reason=choiceReason(state,c),cost=costText(costFor(state,c.action));
    return `<button data-choice="${esc(c.id)}" ${reason?'disabled':''}><span class="choice-number">0${i+1}</span><span><strong>${esc(c.label)}</strong><small>${esc(reason||cost||c.detail||'Keep talking')}${cost&&!reason?` · ${esc(c.action==='prepare'?'Makes the re-check cheaper':'Pretend promise')}`:''}</small></span></button>`;
  }).join('')}</div></div></div></section>`;
}
function summitScreen() {
  const count=verified(state).length,shared=verified(state).filter(([,p])=>p.strategy==='shared').length;
  return `<section class="council-screen panel"><p class="eyebrow">Geneva · 21 June 2027 · the final meeting</p><h1>The final meeting.</h1><p class="scene-copy">“Saying nice words together is easy. Making safety work is harder. What can we really promise, in a way others can check?”</p><p class="memory">What you have: ${count} finished test${count===1?'':'s'} · ${shared} shared deal${shared===1?'':'s'} · ${state.resources.mandate} support.</p><div class="choices"><button data-summit="verification"><span class="choice-number">01</span><span><strong>Ask countries to check each other’s safety tests</strong><small>Needs 3 finished tests (one of them a shared deal) and 2 support. ${count>=3&&shared&&state.resources.mandate>=2?'You have enough!':'If you do not have enough, this part gets left out.'}</small></span></button><button data-summit="phased"><span class="choice-number">02</span><span><strong>Start small and grow step by step</strong><small>Needs 1 finished test. Say clearly what is done and what is still to do.</small></span></button><button data-summit="record"><span class="choice-number">03</span><span><strong>Publish an honest list of what we agree and disagree on</strong><small>Keep the open questions visible. Make no promise you cannot back up.</small></span></button></div><button class="text-button" data-act="final-meetings">Go back to your last meetings</button></section>`;
}
function endingScreen() {
  const e=state.ending;
  const title=e.kind==='record'?'An honest list.':!e.success?'Not enough proof.':e.kind==='phased'?'A small first step.':'A deal that can be checked.';
  const copy=e.kind==='record'?'The countries publish what they agree on and what they do not. This gives the next team a clearer place to start.':!e.success?'The other countries could not support your plan. Your earlier work still counts, but the missing proof is written into the final paper.':e.kind==='phased'?'A smaller plan is agreed. Everyone knows what it covers, what has been tested, and who decides the next step.':'Countries agree to check each other’s safety tests. The deal is linked to tests you finished, and it is honest about what is still unknown.';
  const pending=Object.entries(state.projects).filter(([,p])=>p.stage!=='tested').length;
  return `<section class="ending panel"><p class="eyebrow">Before Geneva · game over</p><h1>${title}</h1><p class="scene-copy">${copy}</p><div class="ending-stats"><span><b>${e.tested}</b>finished tests</span><span><b>${pending}</b>unfinished</span><span><b>${state.prepared.length}</b>researched</span></div><h2>What you brought to Geneva</h2>${verified(state).length?`<ul>${verified(state).map(([id,p])=>`<li>${esc(route(id).title)} <small>· ${p.strategy==='shared'?'shared deal':'small test'}</small></li>`).join('')}</ul>`:'<p>No test was finished. Tip: start a test, then come back the next month to fix it and test again.</p>'}<p class="fineprint">This ending comes from the game rules. It does not predict what real governments will do, or how safe AI really is. You can read the real ideas and their open questions in the research.</p><div class="title-actions"><button class="primary" data-act="journal">Read your journal</button><button class="secondary" data-act="new">Play again</button><a href="../routes/stress-tests.html">See the real research ↗</a></div></section>`;
}
function render() {
  backdrop();hud();
  $('#main').innerHTML=(notice?`<p class="notice" role="alert">${esc(notice)}</p>`:'')+(!started?startScreen():state.phase==='council'?councilScreen():state.phase==='hub'?hubScreen():state.phase==='conversation'?dialogueScreen():state.phase==='summit'?summitScreen():endingScreen());
  if(started&&state.phase==='hub') {
    const latest=state.journal.filter(e=>e.routeId).at(-1);
    const next=monthSummary(state).ready.find(id=>!meetingReason(state,id));
    $('.contact-panel').insertAdjacentHTML('afterbegin',`${goalProgress()}${latest?`<div class="last-result"><strong>Last result: ${esc(latest.title)}</strong><p>${esc(route(latest.routeId).title)} — ${esc(latest.text)}</p>${latest.delta?deltaHtml(latest.delta):''}${latest.next?`<p><strong>Next step at the time:</strong> ${esc(latest.next)}</p>`:''}</div>`:''}${next?`<p class="next-meeting">Results are back! <button class="text-button" data-meet="${esc(next)}">Return to ${esc(route(next).title)} →</button></p>`:''}`);
    cards();$('#contact-search').addEventListener('input',e=>{filter=e.target.value;cards();});
  }
  if(started&&state.phase==='conversation')enhanceDialogue();
}
function deltaHtml(delta) {
  const items=Object.entries(delta).filter(([,n])=>n!==0);
  return `<p class="resource-change">${items.length?items.map(([k,v])=>`${v>0?'+':'−'}${Math.abs(v)} ${esc(names[k])}`).join(' · '):'No net change to Money, Proof or Support.'}</p>`;
}
function goalProgress() {
  const count=verified(state).length,shared=verified(state).some(([,p])=>p.strategy==='shared');
  return `<details class="goal-progress"><summary>Your goal: bring a finished test to Geneva <b>${count?'✓':'0 / 1'}</b></summary><p>A finished test means you returned to the team, fixed the problem and tested again. You do not need to visit every country.</p><p>For the larger shared plan: <strong>${Math.min(count,3)} / 3</strong> finished tests, <strong>${shared?'1':'0'} / 1</strong> shared deal, and <strong>${Math.min(state.resources.mandate,2)} / 2</strong> Support.</p></details>`;
}
function resultHtml(r) {
  const result=state.conversation.result,p=state.projects[r.id],done=p?.stage==='tested';
  const next=result?.next||(done?'Take this finished test to Geneva, or work on another project.':p?.strategy?(state.month<7?`Return in ${campaign.months[state.month+1].label}.`:'Include the unfinished work in your Geneva report.'):'No test has started. Return to this idea when you are ready to start one.');
  const plan=p?.strategy&&r.plans?.[p.strategy];
  const planLabel=r.nodes.terms?.choices.find(c=>c.id===p?.strategy)?.label;
  return `<p class="eyebrow">Meeting result · in this story</p><h2>${esc(result?.title||(done?'Test finished':'Your decision is recorded'))}</h2>${planLabel?`<p><strong>Your plan:</strong> ${esc(planLabel)}</p>`:''}${result?.delta?deltaHtml(result.delta):'<p class="fineprint">This older save has no resource breakdown for this decision.</p>'}${plan?`<details class="agreed-plan"><summary>What your team agreed to work on</summary><p>${esc(plan)}</p></details>`:''}<p><strong>Progress:</strong> ${done?'This test is finished and counts toward your Geneva plan.':p?.strategy?'This project has not completed its test.':'No test has started for this idea.'}</p><p class="next-step"><strong>Next step</strong><br>${esc(next)}</p>${done&&r.lesson?`<p class="learned"><strong>What this shows</strong><br>${esc(r.lesson)}</p><p class="fineprint">A pass here completes a fictional exercise. It does not prove that a real system is safe or give a team real legal powers.</p>`:''}${goalProgress()}`;
}
function knowledgeCheck(r) {
  if(!r.check)return '';
  const answer=quizAnswers[r.id];
  return `<details class="knowledge-check" ${answer!==undefined?'open':''}><summary>Try a quick question (optional)</summary><p>${esc(r.check.question)}</p><div class="check-answers">${r.check.answers.map((text,i)=>`<button data-check="${i}" data-check-route="${esc(r.id)}" aria-pressed="${answer===i}">${esc(text)}</button>`).join('')}</div>${answer!==undefined?`<p role="status"><strong>${answer===r.check.correctIndex?'That’s right.':'Not quite.'}</strong> ${esc(r.check.explanation)}</p>`:''}<small>No points at stake. You can change your answer.</small></details>`;
}
function enhanceDialogue() {
  const r=route(state.conversation.routeId),node=state.conversation.node,box=$('.dialogue-box');
  if(r.researchContext) $('.dialogue-heading').insertAdjacentHTML('beforeend',`<p class="scene-context"><strong>Research context:</strong> ${esc(r.researchContext)}</p>`);
  if(node==='receipt') {
    $('.dialogue-screen').classList.add('show-result');
    box.classList.add('meeting-result');
    // Keep the original speaker, receipt and status, then add the decision breakdown.
    box.insertAdjacentHTML('beforeend',resultHtml(r));
  }
  if(node==='report'&&r.repair)box.insertAdjacentHTML('beforeend',`<details class="repair-plan"><summary>What would fixing it involve?</summary><p>${esc(r.repair)}</p></details>`);
  for(const c of r.nodes[node].choices) {
    const button=[...$('.response-box').querySelectorAll('[data-choice]')].find(b=>b.dataset.choice===c.id);
    const cost=costText(costFor(state,c.action));
    if(choiceReason(state,c)&&cost)button?.lastElementChild.insertAdjacentHTML('beforeend',`<small>${esc(cost)}</small>`);
    const plan=r.plans?.[c.id]||r.plans?.[c.action];
    if(plan) {
      button?.lastElementChild.insertAdjacentHTML('beforeend',`<small class="plan-scope">${esc(plan)}</small>`);
    }
  }
  if(state.projects[r.id]?.stage==='tested')$('.response-box').insertAdjacentHTML('beforeend',knowledgeCheck(r));
}
function reviewMonth() {
  const summary=monthSummary(state);
  const list=ids=>ids.length?`<ul>${ids.map(id=>`<li>${esc(route(id).title)}</li>`).join('')}</ul>`:'<p>None this month.</p>';
  const ready=summary.ready.filter(id=>!meetingReason(state,id));
  drawer(`${month().label}: what you achieved`,`<section class="month-summary"><p><strong>${summary.meetingsUsed} of 3 meetings used.</strong> ${state.actions?`${state.actions} still available. Unused meetings are lost when you end the month.`:'You used all three meetings.'}</p><h3>Finished tests: ${summary.completed.length}</h3>${list(summary.completed)}<h3>Work started: ${summary.started.length}</h3>${list(summary.started)}${summary.started.length?'<p>Starting work is progress, but does not by itself finish a test.</p>':''}<h3>Your decisions</h3>${summary.entries.map(e=>`<article class="summary-entry"><strong>${esc(e.title)}</strong><p>${esc(e.text)}</p></article>`).join('')||'<p>No decisions yet.</p>'}<h3>Net resource change this month</h3>${summary.delta?deltaHtml(summary.delta):'<p>Earlier saves do not have a full resource breakdown. Your current totals are shown above.</p>'}<p class="fineprint">Includes team-choice gains and meeting costs. Preparing research uses Proof but does not use a meeting.</p><h3>${state.month===7?'Still unfinished at Geneva':'Unfinished follow-ups'}</h3>${summary.unfinished.length?`<ul>${summary.unfinished.map(id=>`<li><strong>${esc(route(id).title)}</strong> — ${state.projects[id].strategy?'return to check or finish the test':'idea saved; no test started'}</li>`).join('')}</ul>`:'<p>No unfinished projects.</p>'}${ready.length?'<p>There are results you can check now:</p>'+ready.map(id=>`<button class="text-button" data-return="${esc(id)}">Return to ${esc(route(id).title)} →</button>`).join(''):''}<div class="summary-actions"><button class="primary" data-act="confirm-advance">${state.month===7?'Go to the Geneva meeting':'End the month'} →</button><button class="text-button" data-act="close">Back to the lounge</button></div></section>`);
}
function drawer(title,body) {$('#drawer-title').textContent=title;$('#drawer-body').innerHTML=body;if(!$('#drawer').open)$('#drawer').showModal();}
function guide() {
  drawer('How to play',`<p>It is November 2026. You lead a small team from a middle-sized country. Your goal: help the world agree on AI safety at a big meeting in Geneva in June 2027.</p><ol><li>Each month, pick one team choice. It gives you money, proof or support.</li><li>Then meet up to three countries. Each one has an idea to make AI safer. Ask what could go wrong, then start a small test or a shared deal.</li><li>Tests take time. Come back next month, fix the problem they found, and test again. Then it counts as finished.</li><li>A shared deal needs at least one other finished test first. So start with small tests.</li><li>In June, choose what the final agreement can honestly say.</li></ol><p>Starting, fixing, pausing or putting off a test uses one meeting. Reading, asking questions and walking away are free. Researching a case costs proof but makes fixing cheaper later.</p><h3>Controls and saving</h3><p>Click or tap an answer, or press 1, 2 or 3. There is no timer. Tab and Enter also work. Escape closes this panel. Your game saves on this device by itself.</p><h3>What is real and what is pretend</h3><p>${esc(campaign.fictionNotice)} The pictures show the same pretend team in every meeting. Points show your team's effort, and the game rules decide what happens, not real governments.</p><p>The research is a snapshot from ${esc(campaign.researchObserved)}. It shows what is still uncertain instead of guessing what governments will do.</p><p><a href="campaign.json" target="_blank">See all the game's conversations ↗</a> · <a href="orbit.html">Play our first game, Orbit Accord ↗</a></p>`);
}
function evidence(id) {
  const r=route(id);if(!r)return;
  drawer(r.title,`<p class="eyebrow">Real research · ${esc(r.researchTitle||r.title)} · ${esc(campaign.researchObserved)}</p>${r.about?`<p class="dossier-lead">${esc(r.about)}</p>`:''}<p class="fineprint">Below is the research team's own wording. It is more technical than the game.</p><p><strong>What the research found:</strong> ${esc(r.research.headline)}</p><p><strong>The next real test:</strong> ${esc(r.research.nextTest)}</p><details><summary>What we still don't know</summary><ul>${r.research.unknowns.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><details><summary>Evidence found</summary>${r.research.evidence.map(e=>`<p>${esc(e.claim)}</p><small>${esc(e.locator)}</small>`).join('')}</details><h3>Sources</h3>${r.research.sources.map(s=>`<article class="source"><strong>${safeLink(s.href,s.title)}</strong><p>${esc(s.locator)}</p><small>${esc(s.access)} · ${esc(s.sourceCheck)}</small></article>`).join('')}<p>${safeLink('../routes/stress-tests.html?route='+encodeURIComponent(id),'Read the full research')} · ${safeLink('../routes/#basis=model&route='+encodeURIComponent(id),'Find this idea on the chart')}</p><p class="fineprint">The conversations in the game are made up, based on this research. Winning or losing in the game does not mean it happened in real life.</p>`);
}
function progressiveEvidence(r) {
  const body=$('#drawer-body'),start=body.querySelector('.fineprint');
  if(!start)return;
  const details=document.createElement('details');
  details.className='research-depth';
  const summary=document.createElement('summary');
  summary.textContent='Go deeper: evidence and open questions';
  details.append(summary);
  // Move, rather than rewrite, the original research wording and source links.
  let node=start;
  while(node){const next=node.nextSibling;details.append(node);node=next;}
  if(r.lesson)body.insertAdjacentHTML('beforeend',`<p>${esc(r.lesson)}</p>`);
  if(r.researchContext)body.insertAdjacentHTML('beforeend',`<p><strong>Research context:</strong> ${esc(r.researchContext)}</p>`);
  body.append(details);
}
function journal() {
  if(!started)return;
  drawer('Your journal',`<p>${esc(month().label)} · ${verified(state).length} finished tests. This is the story of your game.</p>${state.journal.length?state.journal.map(e=>`<article class="journal-entry"><small>${esc(campaign.months[e.month].label)}</small><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${e.routeId?`<button class="text-button" data-evidence="${esc(e.routeId)}">Read the research behind this ↗</button>`:''}</article>`).join(''):'<p>Your first team choice will start the journal.</p>'}`);
}
function fresh() {
  const begin=()=>{state=newGame();started=true;saved=true;unreadableSave=false;filter='';all=false;save();render();};
  if(saved||unreadableSave)drawer('Start a new game?',`<p>This will replace the game saved on this device.</p><button class="primary" data-act="confirm-new">Start a new game</button><button class="text-button" data-act="close">Keep my current game</button>`);
  else begin();
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled||!campaign)return;
  if(b.dataset.council){update(()=>council(state,b.dataset.council));return;}
  if(b.dataset.meet){update(()=>enterMeeting(state,campaign,b.dataset.meet));return;}
  if(b.dataset.choice){update(()=>choose(state,campaign,b.dataset.choice));return;}
  if(b.dataset.summit){update(()=>summit(state,b.dataset.summit));return;}
  if(b.dataset.evidence){evidence(b.dataset.evidence);const r=route(b.dataset.evidence);if(r)progressiveEvidence(r);return;}
  if(b.dataset.return){$('#drawer').close();update(()=>enterMeeting(state,campaign,b.dataset.return));return;}
  if(b.dataset.check!==undefined){
    quizAnswers[b.dataset.checkRoute]=Number(b.dataset.check);
    const check=b.closest('.knowledge-check'),r=route(b.dataset.checkRoute);
    check.outerHTML=knowledgeCheck(r);
    [...$('.response-box').querySelectorAll('[data-check]')].find(button=>button.dataset.check===b.dataset.check)?.focus();
    return;
  }
  const act=b.dataset.act;
  if(act==='new')fresh();
  if(act==='confirm-new'){state=newGame();started=true;unreadableSave=false;filter='';all=false;quizAnswers={};$('#drawer').close();save();render();}
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
  const res=await fetch('campaign.json',{cache:'no-cache'});if(!res.ok)throw Error(`Campaign HTTP ${res.status}`);
  campaign=await res.json();
  const requested=new URLSearchParams(location.search).get('route');
  if(campaign.routes.some(r=>r.id===requested))focusRoute=requested;
  try {const raw=localStorage.getItem(SAVE);if(raw){const candidate=JSON.parse(raw);if(validSave(candidate,campaign)){state=candidate;saved=true;}else unreadableSave=true;}}
  catch {unreadableSave=true;}
  render();
}
init().catch(e=>{$('#main').innerHTML=`<section class="panel"><h1>The game could not load.</h1><p>${esc(e.message)}</p><p>Reload the page to try again, or ${safeLink('../routes/stress-tests.html','read the research')}.</p></section>`;});
