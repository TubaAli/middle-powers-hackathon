// Additive research layer. Keeps Orbit Accord's map, cast and core controls.
// Trend projections and fictional policy effects are deliberately separate.
(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups = {US:['United States'],CN:['China'],JP:['Japan'],TW:['Taiwan'],KR:['South Korea'],NL:['Netherlands'],DE:['Germany','EU institutions','EU participating states'],UK:['United Kingdom'],GULF:['UAE','Saudi Arabia','Qatar'],AUCA:['Australia','Canada'],PROD:['Indonesia','Chile','Peru','DR Congo']};
  const priorities = {
    US:'We want secure access to advanced technology. An offer still has to meet export and end-use rules.',
    CN:'We want access and a say in the rules. Cooperation on safety does not settle our other disputes.',
    JP:'We want useful AI and reliable supply chains. Let us agree what buyers can test and what suppliers can actually promise.',
    TW:'We want secure, reliable partnerships. Our government cannot promise a private chipmaker’s entire output.',
    KR:'We want a strong chip industry and access to markets. Export permissions and company decisions still matter.',
    NL:'We want a strong chip industry and secure trade. Export licences are case-by-case decisions, not a promise of unlimited supply.',
    DE:'We want useful AI, industry and workable safeguards. Some decisions need EU agreement, not just our minister’s signature.',
    UK:'We want AI growth and credible safety tests. A research partnership can start before a new law is passed.',
    GULF:'We want computing capacity and local expertise. UAE and Saudi decisions are separate, and chip access can need outside approval.',
    AUCA:'We want investment that builds local capability. Australia and Canada still make separate decisions.',
    PROD:'We want investment and more value kept locally. Indonesia, Chile, Peru and DR Congo have different rules; an aid offer does not replace their approval.'
  };
  const profileFiles={US:'us-china',CN:'us-china',JP:'east-asia',TW:'east-asia',KR:'east-asia',NL:'europe',DE:'europe',UK:'europe',GULF:'gulf',AUCA:'resources',PROD:'resources'};
  let routes = [];
  fetch('../data/stress-tests.json').then(r => {if(!r.ok)throw Error('Research unavailable');return r.json();}).then(d => {routes=d.routes;}).catch(() => {});
  const sourceLinks = '<a href="https://epoch.ai/trends" target="_blank" rel="noopener">Epoch: measured trends</a> · <a href="https://metr.org/blog/2026-01-29-time-horizon-1-1/" target="_blank" rel="noopener">METR: task horizons</a> · <a href="https://github.com/TubaAli/middle-powers-hackathon/tree/main/research_notes/AI%20trends%20to%20Geneva" target="_blank" rel="noopener">Evidence and limits</a>';
  function model(turn, readiness) {
    const years = Math.max(0,Math.min(8,turn))/8*232/365.25;
    const coverage = Math.max(0,Math.min(1,readiness));
    return {baseline:5**years,low:4**years,high:6**years,rollout:5**(years*(1-0.35*coverage)),coverage};
  }
  function readiness() {
    if(!g.goals.length)return 0;
    return g.goals.reduce((sum,id)=>sum+Math.min(1,goalProgress(id).achieved),0)/g.goals.length;
  }
  function outlook() {
    const m=model(g.turn,readiness());
    return `<details class="or-research"><summary>World outlook · AI is still changing</summary><p><b>Training-compute trend: ${m.baseline.toFixed(2)}×</b> the November reference (${m.low.toFixed(2)}–${m.high.toFixed(2)}× using alternative growth rates).</p><p>This extrapolates Epoch’s historical 5× annual training-compute trend (4–6× fit range). It is not a forecast interval, a measure of intelligence, or a catastrophe probability. Growth can change.</p><p><b>Your coalition’s rollout scenario: ${m.rollout.toFixed(2)}×.</b> Your current safety-goal progress slows this fictional deployment curve. The rule reduces its growth exponent by up to 35%; that effect size is a game-design choice, not a measured policy effect. The global research trend above stays unchanged.</p><p>Agent task horizons are growing, but depend strongly on the task and success threshold. Declining reasoning visibility, harmful agent cooperation and training-data feedback are risks to investigate, not established exponential clocks.</p><p>${sourceLinks}</p></details>`;
  }
  function routeLinks(k) {
    const matched=routes.filter(r=>r.countries.some(c=>(groups[k]||[]).includes(c)));
    const list=matched.length?`<ul>${matched.map(r=>`<li><a href="../routes/#basis=model&route=${encodeURIComponent(r.id)}" target="_blank" rel="noopener">${escape(r.shortLabel||r.id)}</a> <small>(${escape(r.countries.join(', '))})</small></li>`).join('')}</ul>`:'<p>No country-specific route in this 32-route sample. Explore the full map instead.</p>';
    return `<details class="or-research or-meeting"><summary>Why this country? See the research</summary><p>${escape(priorities[k]||'Each agreement needs an owner, a workable instrument and a check that it was carried out.')}</p><p><a href="https://github.com/TubaAli/middle-powers-hackathon/blob/main/research_notes/Realistic%20diplomacy/${profileFiles[k]||'BRIEF'}.md" target="_blank" rel="noopener">Country evidence and qualifications</a></p>${list}<p><a href="../routes/#basis=model" target="_blank" rel="noopener">Open all 32 routes and the ranking method</a></p><p>These are related researched proposals, not proof that this country has agreed. Plot positions are team judgments about feasibility and potential impact. They do not set this game’s acceptance odds. Gifts and diplomatic warmth do not create legal authority.</p></details>`;
  }
  function endingText(goal,progress) {
    if(progress<0.5)return {title:'An incident exposes the gaps',text:'In this fictional stress test, an agent’s unsafe action spreads between connected services. Your coalition has too little coverage to coordinate a reliable response. Some services remain disrupted at Geneva. This is one possible scenario, not a prediction that weak policy inevitably causes disaster.'};
    const endings={
      test:['A risky release is held','A pre-release check catches the unsafe behaviour before the service is widely deployed. Your coalition delays that release and asks for another test. Systems outside its coverage remain an open question.'],
      incident:['The warning reaches the right people','A shared report connects incidents at several operators. Teams begin a coordinated response sooner, but reporting alone cannot stop the affected systems.'],
      weights:['One route to misuse is blocked','A protected model copy is not available through the attempted access path. That blocks one route in this stress test; it does not make every model or deployment safe.'],
      continuity:['Essential services keep a fallback','An AI service is withdrawn during a crisis. Essential users in your coalition keep a tested fallback while operators investigate. Continuity limits disruption, not every source of harm.'],
      chips:['The investigation can locate the systems','Operators identify the compute involved in the incident and who can act on it. Visibility helps a response; it is not itself an off-switch.'],
      offswitch:['The incident is contained locally','A lawful local order isolates the affected workload in your coalition. Operators preserve evidence and review the shutdown. Copies elsewhere remain outside that authority.']
    };
    const chosen=endings[goal]||endings.test;return {title:chosen[0],text:chosen[1]};
  }
  const originalCouncil=openCouncil;
  const originalOpening=Opening.start;
  Opening.start=function(c){originalOpening.call(Opening,c);document.querySelectorAll('.op-ticker span').forEach(el=>{el.textContent='AI capabilities are growing · Countries debate safeguards · An eight-month fictional campaign to Geneva · ';});};
  const originalEvents=monthEvents;
  monthEvents=function(...args){return originalEvents(...args).map(event=>typeof event==='string'&&!event.startsWith('📜')?'Game scenario: '+event:event);};
  openCouncil=function(...args){originalCouncil(...args);document.querySelector('#panel').insertAdjacentHTML('beforeend',outlook());};
  const originalMeeting=Meeting.open;
  const dialog=document.createElement('dialog');dialog.className='or-dialog';document.body.append(dialog);
  Meeting.open=function(c){
    // Replace the generic scarcity pitch with an issue-specific negotiating interest.
    c.script=c.script.map(line=>line.who==='them'&&line.text&&(/Our people are short|Rules like that slow our labs|Your accord looks like/.test(line.text))?{...line,text:priorities[c.them.k]||line.text}:line);
    const after=c.afterChoice;
    if(after)c.afterChoice=function(i){return after.call(this,i).map(line=>line.who==='me'&&/^We'll send/.test(line.text)?{...line,text:'We can discuss support alongside the safety proposal. Your government still needs to agree the terms and approvals.'}:line);};
    originalMeeting.call(Meeting,c);
    const button=document.createElement('button');button.className='or-open-research';button.textContent='Research behind this meeting ↗';
    button.addEventListener('click',e=>{e.stopPropagation();dialog.innerHTML='<button class="or-close">Close ×</button>'+routeLinks(c.them.k);dialog.querySelector('details').open=true;dialog.querySelector('.or-close').onclick=()=>dialog.close();dialog.showModal();});
    document.querySelector('#meeting').append(button);
  };
  const originalFinish=finish;
  finish=function(...args){originalFinish(...args);const e=endingText(g.goals[0],readiness());document.querySelector('#panel').insertAdjacentHTML('beforeend',`<section class="or-ending"><p class="small">FICTIONAL STRESS-TEST EPILOGUE</p><h3>${escape(e.title)}</h3><p>${escape(e.text)}</p><p>Real incidents require several conditions to line up: capability, access, a failed safeguard and a response gap. A high game score is not evidence of safety; a low score is not a forecast of catastrophe.</p>${outlook()}<p><a href="../routes/#basis=model" target="_blank" rel="noopener">Inspect the real routes, assumptions and open questions →</a></p></section>`);};
  // Links must not also advance a meeting's dialogue.
  document.addEventListener('click',e=>{if(e.target.closest('.or-research'))e.stopPropagation();},true);
  document.addEventListener('keydown',e=>{if(dialog.open)e.stopPropagation();},true);
  window.OrbitResearchModel={model,endingText};
})();
