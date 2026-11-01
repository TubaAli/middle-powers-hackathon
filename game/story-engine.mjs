// Deterministic fiction rules. Research scores never become acceptance probabilities.
import {moodCost} from './relations.mjs';
export const RESOURCE_KEYS = ['budget', 'evidence', 'mandate'];
export const RESOURCE_NAMES = {budget:'Money', evidence:'Proof', mandate:'Support'};
export function newGame() {
  return {version:1, campaignId:'before-geneva-v1', month:0, phase:'council', resources:{budget:6,evidence:3,mandate:2}, actions:3, prepared:[], projects:{}, met:{}, conversation:null, journal:[], ending:null};
}
const copy = s => structuredClone(s);
const log = (s,title,text,routeId=null,details={}) => s.journal.push({month:s.month,title,text,routeId,...details});
const changes = (before,after) => Object.fromEntries(RESOURCE_KEYS.map(k=>[k,after[k]-before[k]]));
export const verified = s => Object.entries(s.projects).filter(([,p])=>p.stage==='tested');
export function routeStatus(s,id) {
  const p=s.projects[id];
  if(p?.stage==='tested') return 'Tested ✓';
  if(s.met[id]===s.month) return 'Already met this month';
  if(p?.strategy && p.started<s.month) return 'Results are back!';
  return p?.stage==='documented'?'Waiting for later':p?'Waiting for results':'New';
}
export function meetingReason(s,id) {
  if(s.phase!=='hub') return 'Go back to the lounge first.';
  if(s.projects[id]?.stage==='tested') return '';
  if(s.actions<=0) return 'No meetings left this month.';
  if(s.met[id]===s.month) return 'You already met them this month.';
  return '';
}
export function enterMeeting(s,campaign,id) {
  if(!campaign.routes.some(r=>r.id===id)) throw Error('Unknown delegation');
  const reason=meetingReason(s,id);if(reason) throw Error(reason);
  const n=copy(s), p=n.projects[id];
  n.phase='conversation';
  n.conversation={routeId:id,node:p?.stage==='tested'?'complete':p?.strategy&&p.started<n.month?'report':'opening',receipt:''};
  return n;
}
function baseCost(s,action) {
  const id=s.conversation?.routeId;
  if(action==='prepare') return {evidence:s.prepared.includes(id)?0:1};
  if(action==='commission-pilot') return {budget:2};
  if(action==='commission-shared') return {budget:1,mandate:2};
  if(action==='resolve') return {budget:1,evidence:s.prepared.includes(id)?1:2};
  return {};
}
// With a campaign that carries relations, a delegation's mood (relations.mjs) adjusts the price of new work.
export function costFor(s,action,campaign) {
  const c=baseCost(s,action);
  for(const [k,v] of Object.entries(moodCost(s,campaign,action))) c[k]=Math.max(k==='mandate'?1:0,(c[k]??0)+v);
  return c;
}
export function choiceReason(s,choice,campaign) {
  if(choice.action==='prepare'&&s.prepared.includes(s.conversation?.routeId))return 'Your research notes are already ready. Choose a plan below.';
  if(choice.action?.startsWith('commission-')&&s.month===7)return 'Too late for a new test. Finish what you started.';
  for(const [k,v] of Object.entries(costFor(s,choice.action,campaign))) if(s.resources[k]<v) return `Need ${v} ${RESOURCE_NAMES[k].toLowerCase()}; you have ${s.resources[k]}.`;
  if(choice.action==='resolve' && s.projects[s.conversation.routeId]?.strategy==='shared' && !verified(s).some(([id])=>id!==s.conversation.routeId)) return 'A shared deal needs one other finished test first.';
  return '';
}
export function leaveConversation(s) {
  if(s.phase!=='conversation')throw Error('No conversation is open');
  const n=copy(s);n.phase='hub';n.conversation=null;return n;
}
export function choose(s,campaign,choiceId) {
  if(s.phase!=='conversation' || !s.conversation) throw Error('No conversation is open');
  const route=campaign.routes.find(r=>r.id===s.conversation.routeId);
  const node=route.nodes[s.conversation.node], ch=node.choices.find(c=>c.id===choiceId);
  if(!ch) throw Error('Unknown dialogue choice');
  const reason=choiceReason(s,ch,campaign);if(reason) throw Error(reason);
  const n=copy(s),id=route.id;
  for(const [k,v] of Object.entries(costFor(n,ch.action,campaign))) n.resources[k]-=v;
  if(ch.action==='leave') {n.phase='hub';n.conversation=null;return n;}
  if(ch.action==='prepare'&&!n.prepared.includes(id)) {
    n.prepared.push(id);
    log(n,'Team research done',`${route.title}: you spent 1 proof to learn more before the talks.`,id,{action:'prepare',delta:changes(s.resources,n.resources)});
  }
  let receipt='';
  if(ch.action?.startsWith('commission-')) {
    const strategy=ch.action.split('-')[1];
    n.projects[id]={stage:'commissioned',strategy,started:n.month};
    receipt=strategy==='shared'?'Deal! Shared test starts. Results next month.':'Deal! Small test starts. Results next month.';
  } else if(ch.action==='resolve') {
    n.projects[id].stage='tested';n.projects[id].completed=n.month;n.resources.mandate=Math.min(20,n.resources.mandate+1);
    receipt='Fixed and tested again. It holds! +1 support.';
  } else if(ch.action==='defer') {
    n.projects[id]={stage:'documented',started:n.month};
    receipt='Noted. No promises yet. Try again later.';
  } else if(ch.action==='pause') {
    n.projects[id].stage='paused';
    receipt='Problem made public. Paused for now.';
  }
  if(receipt) {
    n.actions--;n.met[id]=n.month;n.conversation.receipt=receipt;
    const titles={'commission-pilot':'Small test started','commission-shared':'Shared deal started',resolve:'Fixed and tested again',defer:'Saved for later',pause:'Paused'};
    const next=ch.action.startsWith('commission-')?`Return in ${campaign.months[n.month+1].label} to see the results.${ch.action==='commission-shared'?' You also need to finish another test before completing this shared plan.':''}`:ch.action==='resolve'?'This test is ready for Geneva. You can now work on another project.':n.month===7?'This stays unfinished in your Geneva report.':`You can return in ${campaign.months[n.month+1].label}.`;
    n.conversation.result={title:titles[ch.action],next,delta:changes(s.resources,n.resources),action:ch.action};
    log(n,titles[ch.action],`${route.title}. ${receipt}`,id,n.conversation.result);
  }
  n.conversation.node=ch.next;
  return n;
}
export function council(s,move) {
  if(s.phase!=='council') throw Error('The council has already decided');
  const moves={funding:['budget',3,'Raise money for tests'],research:['evidence',2,'Gather proof'],diplomacy:['mandate',2,'Build support from other countries']};
  if(!moves[move]) throw Error('Unknown council choice');
  const n=copy(s),[k,v,title]=moves[move];
  n.resources[k]=Math.min(20,n.resources[k]+v);n.phase='hub';n.actions=3;
  const gained=n.resources[k]-s.resources[k];
  log(n,title,`Team choice: +${gained} ${RESOURCE_NAMES[k].toLowerCase()}. These are game points, not real money or real agreement.`,null,{action:'council',delta:changes(s.resources,n.resources)});
  return n;
}
export function advance(s) {
  if(s.phase!=='hub') throw Error('Finish the conversation first');
  const n=copy(s);
  if(n.month===7) n.phase='summit';
  else {n.month++;n.phase='council';}
  return n;
}
export function summit(s,kind) {
  if(s.phase!=='summit'||!['verification','phased','record'].includes(kind)) throw Error('No such summit decision');
  const n=copy(s),tested=verified(n),shared=tested.some(([,p])=>p.strategy==='shared');
  const strong=tested.length>=3&&shared&&n.resources.mandate>=2;
  const success=kind==='verification'?strong:kind==='phased'?tested.length>=1:true;
  n.ending={kind,success,tested:tested.length,shared};n.phase='ending';
  log(n,'Geneva agreement decided',kind==='verification'?(success?'Countries agree to check each other’s safety tests.':'The checking plan is left out: you did not have enough finished tests.'):kind==='phased'?(success?'Countries agree to start small and grow step by step.':'The small plan fails: no test was finished to build on. The gap is written down.'):'Countries publish an honest list of what they agree on and what they do not.');
  return n;
}
export function monthSummary(s) {
  const entries=s.journal.filter(e=>e.month===s.month);
  const deltasKnown=entries.every(e=>e.delta);
  return {
    meetingsUsed:3-s.actions,
    entries,
    delta:deltasKnown?Object.fromEntries(RESOURCE_KEYS.map(k=>[k,entries.reduce((n,e)=>n+e.delta[k],0)])):null,
    completed:Object.entries(s.projects).filter(([,p])=>p.stage==='tested'&&p.completed===s.month).map(([id])=>id),
    started:Object.entries(s.projects).filter(([,p])=>p.strategy&&p.started===s.month).map(([id])=>id),
    unfinished:Object.entries(s.projects).filter(([,p])=>p.stage!=='tested').map(([id])=>id),
    ready:Object.entries(s.projects).filter(([id,p])=>p.strategy&&p.stage!=='tested'&&p.started<s.month&&s.met[id]!==s.month).map(([id])=>id),
  };
}
export function validSave(s,campaign) {
  const phases=['council','hub','conversation','summit','ending'];
  if(!s||s.version!==1||s.campaignId!==campaign.id||!Number.isInteger(s.month)||s.month<0||s.month>7||!phases.includes(s.phase))return false;
  if(!s.resources||RESOURCE_KEYS.some(k=>!Number.isInteger(s.resources[k])||s.resources[k]<0||s.resources[k]>20))return false;
  if(!Number.isInteger(s.actions)||s.actions<0||s.actions>3||!Array.isArray(s.prepared)||!Array.isArray(s.journal)||!s.projects||!s.met)return false;
  const ids=new Set(campaign.routes.map(r=>r.id));
  if(s.prepared.some(id=>!ids.has(id))||Object.keys(s.met).some(id=>!ids.has(id)||!Number.isInteger(s.met[id])||s.met[id]<0||s.met[id]>s.month))return false;
  for(const [id,p] of Object.entries(s.projects))if(!ids.has(id)||!p||!['commissioned','paused','tested','documented'].includes(p.stage)||!Number.isInteger(p.started)||p.started<0||p.started>s.month||(p.stage!=='documented'&&!['pilot','shared'].includes(p.strategy)))return false;
  if(s.journal.some(e=>!e||!Number.isInteger(e.month)||e.month<0||e.month>s.month||typeof e.title!=='string'||typeof e.text!=='string'||(e.routeId!==null&&!ids.has(e.routeId))))return false;
  const validDelta=d=>d&&typeof d==='object'&&RESOURCE_KEYS.every(k=>Number.isInteger(d[k])&&Math.abs(d[k])<=20)&&Object.keys(d).length===3;
  if(s.journal.some(e=>(e.delta!==undefined&&!validDelta(e.delta))||(e.next!==undefined&&typeof e.next!=='string')))return false;
  if(s.phase==='conversation') {
    const r=campaign.routes.find(r=>r.id===s.conversation?.routeId);if(!r||!r.nodes[s.conversation.node]||typeof s.conversation.receipt!=='string')return false;
    if(s.conversation.node==='report'&&!s.projects[r.id]?.strategy)return false;
    if(s.conversation.node==='complete'&&s.projects[r.id]?.stage!=='tested')return false;
    const result=s.conversation.result;
    if(result!==undefined&&(!result||typeof result.title!=='string'||typeof result.next!=='string'||!validDelta(result.delta)))return false;
  }
  else if(s.conversation!==null)return false;
  if(['summit','ending'].includes(s.phase)&&s.month!==7)return false;
  if(s.phase==='ending'&&(!s.ending||!['verification','phased','record'].includes(s.ending.kind)||typeof s.ending.success!=='boolean'))return false;
  return true;
}
