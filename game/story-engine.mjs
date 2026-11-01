// Deterministic fiction rules. Research scores never become acceptance probabilities.
export const RESOURCE_KEYS = ['budget', 'evidence', 'mandate'];
export function newGame() {
  return {version:1, campaignId:'before-geneva-v1', month:0, phase:'council', resources:{budget:6,evidence:3,mandate:2}, actions:3, prepared:[], projects:{}, met:{}, conversation:null, journal:[], ending:null};
}
const copy = s => structuredClone(s);
const log = (s,title,text,routeId=null) => s.journal.push({month:s.month,title,text,routeId});
export const verified = s => Object.entries(s.projects).filter(([,p])=>p.stage==='tested');
export function routeStatus(s,id) {
  const p=s.projects[id];
  if(p?.stage==='tested') return 'Tested record';
  if(s.met[id]===s.month) return 'Met this month';
  if(p?.strategy && p.started<s.month) return 'Follow-up ready';
  return p?.stage==='documented'?'Limits recorded':p?'Awaiting report':'New conversation';
}
export function meetingReason(s,id) {
  if(s.phase!=='hub') return 'Return to the lounge first.';
  if(s.projects[id]?.stage==='tested') return '';
  if(s.actions<=0) return 'No meetings left this month.';
  if(s.met[id]===s.month) return 'You already used a meeting here this month.';
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
export function costFor(s,action) {
  const id=s.conversation?.routeId;
  if(action==='prepare') return {evidence:s.prepared.includes(id)?0:1};
  if(action==='commission-pilot') return {budget:2};
  if(action==='commission-shared') return {budget:1,mandate:2};
  if(action==='resolve') return {budget:1,evidence:s.prepared.includes(id)?1:2};
  return {};
}
export function choiceReason(s,choice) {
  if(choice.action?.startsWith('commission-')&&s.month===7)return 'Too late for a new rehearsal before Geneva. Complete existing work or record this proposal for later.';
  for(const [k,v] of Object.entries(costFor(s,choice.action))) if(s.resources[k]<v) return `Need ${v} ${k}; you have ${s.resources[k]}.`;
  if(choice.action==='resolve' && s.projects[s.conversation.routeId]?.strategy==='shared' && !verified(s).some(([id])=>id!==s.conversation.routeId)) return 'A shared protocol needs one other tested route. Start with a bounded pilot elsewhere.';
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
  const reason=choiceReason(s,ch);if(reason) throw Error(reason);
  const n=copy(s),id=route.id;
  for(const [k,v] of Object.entries(costFor(n,ch.action))) n.resources[k]-=v;
  if(ch.action==='leave') {n.phase='hub';n.conversation=null;return n;}
  if(ch.action==='prepare'&&!n.prepared.includes(id)) {n.prepared.push(id);log(n,'Case brief commissioned',`${route.title}: one evidence resource invested before negotiations.`,id);}
  let receipt='';
  if(ch.action?.startsWith('commission-')) {
    const strategy=ch.action.split('-')[1];
    n.projects[id]={stage:'commissioned',strategy,started:n.month};
    receipt=strategy==='shared'?'The fictional delegation agrees to explore a shared protocol. The report returns next month; completion also needs another tested route.':'The fictional delegation commissions a bounded rehearsal. Return next month to inspect the failure and decide how to repair it.';
    log(n,strategy==='shared'?'Shared protocol commissioned':'Pilot commissioned',`${route.title}. ${receipt}`,id);
  } else if(ch.action==='resolve') {
    n.projects[id].stage='tested';n.projects[id].completed=n.month;n.resources.mandate=Math.min(20,n.resources.mandate+1);
    receipt='The fictional team repairs the gap and completes a fresh rehearsal. You gain a tested record and 1 mandate. Its limited scope remains in the draft; this is not a claim of real-world effectiveness.';
    log(n,'Repair and retest recorded',`${route.title}. ${receipt}`,id);
  } else if(ch.action==='defer') {
    n.projects[id]={stage:'documented',started:n.month};
    receipt='You record what is not yet established. No promise of adoption is made. The delegation will hear a revised proposal in a later month.';
    log(n,'Limits recorded',`${route.title}. ${receipt}`,id);
  } else if(ch.action==='pause') {
    n.projects[id].stage='paused';
    receipt='The limitation is published in the fictional journal. The work remains open for a later follow-up; it does not count as a tested safeguard.';
    log(n,'Follow-up paused',`${route.title}. ${receipt}`,id);
  }
  if(receipt) {n.actions--;n.met[id]=n.month;n.conversation.receipt=receipt;}
  n.conversation.node=ch.next;
  return n;
}
export function council(s,move) {
  if(s.phase!=='council') throw Error('The council has already decided');
  const moves={funding:['budget',3,'Fund the next rehearsal'],research:['evidence',2,'Commission independent briefs'],diplomacy:['mandate',2,'Listen and build negotiating support']};
  if(!moves[move]) throw Error('Unknown council choice');
  const n=copy(s),[k,v,title]=moves[move];
  n.resources[k]=Math.min(20,n.resources[k]+v);n.phase='hub';n.actions=3;
  log(n,title,`Council decision: +${v} ${k}. These are game resources, not real funding or consent.`);
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
  log(n,'Geneva text settled',kind==='verification'?(success?'A bounded verification annex survives the fictional negotiations.':'The broad verification clause remains bracketed: its requirements were not met.'):kind==='phased'?(success?'A phased pilot programme is agreed in the fictional scenario.':'The proposed pilot programme lacks a tested foundation; the record preserves the gap.'):'An honest record of agreement and disagreement is published in the fictional scenario.');
  return n;
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
  if(s.phase==='conversation') {
    const r=campaign.routes.find(r=>r.id===s.conversation?.routeId);if(!r||!r.nodes[s.conversation.node]||typeof s.conversation.receipt!=='string')return false;
    if(s.conversation.node==='report'&&!s.projects[r.id]?.strategy)return false;
    if(s.conversation.node==='complete'&&s.projects[r.id]?.stage!=='tested')return false;
  }
  else if(s.conversation!==null)return false;
  if(['summit','ending'].includes(s.phase)&&s.month!==7)return false;
  if(s.phase==='ending'&&(!s.ending||!['verification','phased','record'].includes(s.ending.kind)||typeof s.ending.success!=='boolean'))return false;
  return true;
}
