import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {newGame,council,enterMeeting,choose,advance,summit,validSave,verified,choiceReason,meetingReason,monthSummary} from './story-engine.mjs';
const campaign=JSON.parse(readFileSync(new URL('./campaign.json',import.meta.url)));
const ids=campaign.routes.map(r=>r.id);
const jp='jp-procurement-safety-evidence',ind='indiaai-subsidy-evaluation-gate',lumi='lumi-national-evidence-protocol';
const pick=(s,c)=>choose(s,campaign,c);
function plan(s,id,kind='pilot',prepared=false) {
  s=enterMeeting(s,campaign,id);
  if(prepared) {s=pick(s,'challenge');s=pick(s,'brief');}
  s=pick(s,'terms');s=pick(s,kind);return pick(s,'close');
}
function finish(s,id) {s=enterMeeting(s,campaign,id);s=pick(s,'retest');return pick(s,'close');}

test('32 research-linked trees have valid edges, distinct authored openings and current source hashes',()=>{
  const source=JSON.parse(readFileSync(new URL('../data/stress-tests.json',import.meta.url)));
  const authored=JSON.parse(readFileSync(new URL('./dialogue-authored.json',import.meta.url)));
  assert.equal(ids.length,32);assert.deepEqual(new Set(ids),new Set(source.routes.map(r=>r.id)));
  assert.equal(new Set(campaign.routes.map(r=>r.nodes.opening.text)).size,32);
  for(const r of campaign.routes) {
    assert(r.research.sources.length);assert(r.research.headline);assert(r.research.nextTest);
    assert(r.about&&r.lesson&&r.repair&&r.check.question&&r.check.explanation);
    assert.equal(r.title,authored[r.id].title);assert.equal(r.about,authored[r.id].about);
    for(const [node,key] of [['opening','opening'],['challenge','concern'],['terms','question'],['report','complication']])assert.equal(r.nodes[node].text,authored[r.id][key]);
    for(const id of ['pilot','shared'])assert.equal(r.nodes.terms.choices.find(c=>c.id===id).label,authored[r.id][id]);
    assert.equal(r.check.answers.length,2);assert([0,1].includes(r.check.correctIndex));
    for(const [id,node] of Object.entries(r.nodes)) {
      assert(node.choices.length>0,`${r.id}/${id} dead end`);
      assert.equal(new Set(node.choices.map(c=>c.id)).size,node.choices.length);
      for(const c of node.choices) assert(c.action==='leave'||r.nodes[c.next],`${r.id}/${id}/${c.id}`);
    }
  }
  for(const [path,hash] of Object.entries(campaign.inputs))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),hash);
});
test('all 32 conversations can prepare, commission and resolve a bounded pilot in reachable play',()=>{
  for(const id of ids) {
    let s=council(newGame(),'funding');s=plan(s,id,'pilot',true);
    assert.equal(s.actions,2);assert.equal(s.resources.budget,7);assert.equal(s.resources.evidence,2);
    assert.throws(()=>enterMeeting(s,campaign,id),/already met/);
    s=council(advance(s),'research');s=finish(s,id);
    assert.equal(s.projects[id].stage,'tested');assert.equal(s.resources.budget,6);assert.equal(s.resources.evidence,3);
    assert.equal(s.resources.mandate,3);assert(validSave(JSON.parse(JSON.stringify(s)),campaign));
    const old=structuredClone(s);s=pick(enterMeeting(s,campaign,id),'leave');assert.deepEqual(s,old);
  }
});
test('resource limits, peer dependency and meeting limits cannot be bypassed by repeated choices',()=>{
  let s=council(newGame(),'funding');s=plan(s,lumi,'shared');
  s=council(advance(s),'research');s=enterMeeting(s,campaign,lumi);
  assert.throws(()=>pick(s,'retest'),/other finished test/);
  s=pick(s,'pause');assert.equal(s.projects[lumi].stage,'paused');assert.throws(()=>pick(s,'pause'),/Unknown/);
  s=pick(s,'close');assert.throws(()=>enterMeeting(s,campaign,lumi),/already met/);
  s=council(advance(s),'research');s=plan(s,jp);s=plan(s,ind);s=enterMeeting(s,campaign,ids[0]);s=pick(s,'terms');s=pick(s,'defer');s=pick(s,'close');
  assert.equal(s.actions,0);assert(meetingReason(s,ids[3]));
  const insufficient=council(newGame(),'diplomacy');insufficient.resources.budget=0;
  const n=pick(enterMeeting(insufficient,campaign,jp),'terms');assert.throws(()=>pick(n,'pilot'),/Need 2 money/);assert.equal(n.resources.budget,0);
});
test('meeting results and monthly totals distinguish started, deferred, paused and finished work',()=>{
  let s=council(newGame(),'funding');
  s=plan(s,jp,'pilot',true);
  s=pick(pick(enterMeeting(s,campaign,ind),'terms'),'defer');
  assert.equal(s.conversation.result.title,'Saved for later');
  assert.deepEqual(s.conversation.result.delta,{budget:0,evidence:0,mandate:0});
  s=pick(s,'close');
  let summary=monthSummary(s);
  assert.equal(summary.meetingsUsed,2);assert.deepEqual(summary.completed,[]);assert.deepEqual(summary.started,[jp]);
  assert.deepEqual(summary.delta,{budget:1,evidence:-1,mandate:0});
  assert.deepEqual(summary.unfinished,[jp,ind]);assert.deepEqual(summary.ready,[]);
  s=council(advance(s),'research');
  assert.deepEqual(monthSummary(s).ready,[jp]);
  s=pick(enterMeeting(s,campaign,jp),'pause');
  assert.equal(s.conversation.result.title,'Paused');s=pick(s,'close');
  assert.deepEqual(monthSummary(s).ready,[]);assert.deepEqual(monthSummary(s).completed,[]);
  s=council(advance(s),'research');s=pick(enterMeeting(s,campaign,jp),'retest');
  assert.deepEqual(s.conversation.result.delta,{budget:-1,evidence:-1,mandate:1});
  assert.equal(s.conversation.result.title,'Fixed and tested again');
  assert.deepEqual(monthSummary(s).completed,[jp]);
  assert(validSave(JSON.parse(JSON.stringify(s)),campaign));
});
test('old saves still load and never invent a missing resource history; caps report actual gains',()=>{
  let s=council(newGame(),'funding');s=plan(s,jp);
  for(const e of s.journal){delete e.delta;delete e.next;delete e.action;}
  assert(validSave(s,campaign));assert.equal(monthSummary(s).delta,null);
  s=council(advance(s),'research');s.resources.budget=19;
  s=council(advance(s),'funding');
  assert.equal(s.resources.budget,20);assert.equal(s.journal.at(-1).delta.budget,1);
  assert.equal(monthSummary(s).delta.budget,1);
});
test('a strong ending is reachable through multiple routes and a shared follow-up',()=>{
  let s=council(newGame(),'funding');s=plan(s,jp,'pilot',true);s=plan(s,ind);
  s=council(advance(s),'research');s=finish(s,jp);s=finish(s,ind);s=plan(s,lumi,'shared');
  s=council(advance(s),'research');s=finish(s,lumi);
  assert.equal(verified(s).length,3);
  while(s.month<7)s=council(advance(s),'funding');
  s=summit(advance(s),'verification');assert.equal(s.ending.success,true);assert(validSave(s,campaign));
  assert.throws(()=>summit(s,'verification'),/No such summit/);
});
test('different final choices preserve insufficient evidence rather than granting automatic success',()=>{
  let s=council(newGame(),'funding');while(s.month<7)s=council(advance(s),'funding');s=advance(s);
  assert.equal(summit(s,'verification').ending.success,false);
  assert.equal(summit(s,'phased').ending.success,false);
  assert.equal(summit(s,'record').ending.success,true);
});
test('save validation rejects corrupt phases, unsafe counters, IDs and missing report projects',()=>{
  let s=enterMeeting(council(newGame(),'research'),campaign,jp);
  assert(validSave(s,campaign));
  for(const bad of [{...s,month:8},{...s,phase:'alien'},{...s,resources:{budget:-1,evidence:2,mandate:2}},{...s,actions:8},{...s,prepared:['unknown']},{...s,conversation:{routeId:jp,node:'report',receipt:''}}])assert.equal(validSave(bad,campaign),false);
});
