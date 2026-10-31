/* Gemini-generated backgrounds; original, editable SVG interface overlay. */
const scenes = [
  {id:'01-november-council',art:'01-november-council.jpg',month:'NOVEMBER 2026',stage:1,time:'7 MONTHS',location:'Delegation lounge · opening round'},
  {id:'02-february-negotiation',art:'02-february-negotiation-1-49f6789f062e.jpg',month:'FEBRUARY 2027',stage:4,time:'4 MONTHS',location:'Bilateral room 04 · a proposed compute agreement'},
  {id:'03-april-disputed-report',art:'03-april-disputed-report-1-60badf629bae.jpg',month:'APRIL 2027',stage:6,time:'2 MONTHS',location:'Evening session · coalition secretariat'},
  {id:'04-geneva-final-clause',art:'04-geneva-final-clause-1-ddbbb378de0e.jpg',month:'JUNE 2027',stage:8,time:'SUMMIT DAY',location:'Geneva · multilateral negotiating room'},
];
const rect=(x,y,w,h,fill,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const text=(x,y,t,size=18,fill='#e3ebef',extra='')=>`<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" ${extra}>${t}</text>`;
const line=(x1,y1,x2,y2,stroke='#85aaa9',extra='')=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${stroke}" fill="none" ${extra}/>`;
const definitions=`<defs>
  <linearGradient id="panel" x2="1" y2="1"><stop stop-color="#102632" stop-opacity=".96"/><stop offset="1" stop-color="#0c1725" stop-opacity=".97"/></linearGradient>
  <linearGradient id="heading" x2="0" y2="1"><stop stop-color="#071621" stop-opacity=".73"/><stop offset="1" stop-color="#071621" stop-opacity="0"/></linearGradient>
  <linearGradient id="bottom" x2="0" y2="1"><stop stop-color="#06121b" stop-opacity="0"/><stop offset="1" stop-color="#06121b" stop-opacity=".85"/></linearGradient>
  <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0H0V46" stroke="#9ac0c1" stroke-opacity=".07" fill="none"/></pattern>
  <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#020912" flood-opacity=".5"/></filter>
</defs>`;
function emblem(x,y,r=15){return `<g transform="translate(${x} ${y})" fill="none" stroke="#c3d7d4"><circle r="${r}" stroke-opacity=".6"/><ellipse rx="${r*.47}" ry="${r}"/><path d="M${-r} 0H${r}M${-r*.82} ${-r*.5}H${r*.82}M${-r*.82} ${r*.5}H${r*.82}" stroke-opacity=".65"/></g>`;}
function hud(scene){
  let s=rect(0,0,1600,82,'#081722','fill-opacity=".95"')+line(42,81,1558,81,'#88a19f','opacity=".3"');
  s+=emblem(58,39,18)+text(92,37,'BEFORE GENEVA',20,'#e6e5d8','letter-spacing="4" font-weight="600"')+text(94,58,'ORBIT ACCORD / VISUAL STUDY',10,'#839da6','letter-spacing="2.2"');
  s+=text(661,34,scene.month,16,'#ddd7c5','text-anchor="middle" letter-spacing="2"')+text(661,56,`CHAPTER ${scene.stage} / 08`,10,'#91a9ae','text-anchor="middle" letter-spacing="2"');
  ['NOV','DEC','JAN','FEB','MAR','APR','MAY','JUN'].forEach((m,i)=>{let x=803+i*59;s+=rect(x,25,39,3,i<scene.stage?'#b3c7c0':'#29404f')+text(x+19,51,m,9,i===scene.stage-1?'#e5d6b4':'#7896a1','text-anchor="middle" letter-spacing="1"');});
  s+=text(1540,34,scene.time,16,'#cfc6ac','text-anchor="end"')+text(1540,55,'UNTIL GENEVA',9,'#90a7aa','text-anchor="end" letter-spacing="2"');
  return s+text(58,112,scene.location.toUpperCase(),11,'#cbd6d5','letter-spacing="2.2"');
}
function footer(){return rect(0,868,1600,32,'#07121e')+text(45,889,'FICTIONAL SCENARIO  /  GEMINI ART + EDITABLE INTERFACE',9,'#82979e','letter-spacing="1.6"')+text(1557,889,'JOURNAL     •     EVIDENCE     •     SETTINGS',10,'#93a5ac','letter-spacing="1.3" text-anchor="end"');}
function title(kicker,heading,sub){return rect(0,82,1600,230,'url(#heading)')+text(60,163,kicker,10,'#c5ccb4','letter-spacing="3"')+text(56,215,heading,49,'#f2eddd','font-family="Georgia,serif"')+text(60,251,sub,17,'#c0cfcd');}
function tag(x,y,label,sub,width=230){return rect(x,y,width,52,'#102936','fill-opacity=".86" rx="2" stroke="#6f8f94" stroke-opacity=".35"')+text(x+15,y+22,label,12,'#e8e5d7','letter-spacing="1.2"')+text(x+15,y+40,sub,9,'#adc2bf','letter-spacing=".7"');}
function dialogue(country,name,lines,choices,selected=0){
  let s=rect(0,580,1600,288,'url(#bottom)')+rect(45,660,959,188,'url(#panel)','rx="3" stroke="#58747e" stroke-opacity=".7"');
  s+=rect(45,660,4,188,'#b8be9d')+rect(71,636,202,39,'#b9c7ba','rx="2"')+text(88,661,country.toUpperCase(),12,'#1b3340','letter-spacing="2" font-weight="700"');
  s+=text(78,709,name,14,'#cabf9e','letter-spacing="1"');
  lines.forEach((l,i)=>s+=text(78,749+i*31,l,22,'#edf0e8','font-family="Georgia,serif"'));
  s+=text(970,825,'▾',20,'#b8c9c4','text-anchor="end"')+text(1035,647,'YOUR RESPONSE',10,'#d0d9ce','letter-spacing="2.5"');
  choices.forEach((c,i)=>{const y=662+i*65;s+=rect(1033,y,522,56,i===selected?'#c7d1bf':'#112735',`rx="2" stroke="${i===selected?'#e7e0bd':'#536b76'}" stroke-opacity=".8"`)+text(1052,y+33,'0'+(i+1),12,i===selected?'#405958':'#8ca6ac','letter-spacing="1"')+text(1090,y+23,c[0],17,i===selected?'#183441':'#e4ebe6','font-weight="500"')+text(1090,y+43,c[1],11,i===selected?'#536b6a':'#8ba7ae');});
  return s;
}
function council(){
  let s=title('CHAPTER ONE','A seat at the table.','The summit is months away. The first calls matter.');
  s+=rect(60,291,688,424,'#102632','fill-opacity=".82" stroke="#6e8d92" stroke-opacity=".5" rx="4"')+rect(61,292,686,422,'url(#grid)');
  s+=text(84,324,'WHO WILL YOU APPROACH?',11,'#c4d3ce','letter-spacing="2"');
  s+=`<g transform="translate(403 516)" fill="none" stroke="#91acaa"><ellipse rx="257" ry="126" stroke-opacity=".3"/><ellipse rx="172" ry="180" transform="rotate(61)" stroke-opacity=".17"/><circle r="65" stroke-opacity=".23"/></g>`;
  s+=emblem(403,516,36)+text(403,581,'YOUR DELEGATION',9,'#e0dfcf','letter-spacing="1.8" text-anchor="middle"');
  [{x:220,y:431,c:'JAPAN',t:'Purchasing conditions',a:true},{x:602,y:415,c:'KENYA',t:'Independent review'},{x:618,y:618,c:'BRAZIL',t:'An evidence proposal'},{x:206,y:626,c:'INDIA',t:'Compute access'}].forEach(n=>{s+=line(403,516,n.x,n.y,'#adc6bc',`opacity="${n.a?'.75':'.28'}" stroke-dasharray="${n.a?'0':'4 7'}"`)+`<circle cx="${n.x}" cy="${n.y}" r="${n.a?21:14}" fill="#213f4a" stroke="${n.a?'#d4d9b1':'#789d9f'}" stroke-width="2"/><circle cx="${n.x}" cy="${n.y}" r="4" fill="#ccceb2"/>`+text(n.x,n.y-31,n.c,12,'#e2e8dd','text-anchor="middle" letter-spacing="2"')+text(n.x,n.y+37,n.t,11,'#abc4c1','text-anchor="middle"');});
  s+=text(84,693,'Select a delegation to open a conversation.',12,'#a5bcbc');
  s+=tag(1073,534,'JAPAN','AVAILABLE THIS MONTH',255);
  s+=rect(908,611,646,180,'url(#panel)','stroke="#718a89" stroke-opacity=".6" rx="3"')+text(936,645,'AN OPENING',10,'#c8c4a2','letter-spacing="2.5"')+text(936,686,'“A shared test is possible.',27,'#e9ebdd','font-family="Georgia,serif"')+text(936,721,'Who is willing to act on it?”',27,'#e9ebdd','font-family="Georgia,serif"')+text(937,761,'Discuss a joint procurement standard  →',14,'#b8d6cd');
  s+=rect(59,754,689,89,'url(#panel)','rx="3"')+text(82,782,'THIS MONTH',10,'#c7c5a9','letter-spacing="2"')+text(82,816,'Talk to delegations   •   Review evidence   •   Make a council decision',14,'#c0d1cb');
  return s+rect(1222,804,332,40,'#bbcabd','rx="2"')+text(1388,830,'OPEN CONVERSATION  →',12,'#173240','text-anchor="middle" letter-spacing="1"');
}
function bilateral(){
  let s=title('THE CONDITION','Access has a price.','Two delegations. One unresolved obligation.');
  s+=rect(60,293,389,249,'#102732','fill-opacity=".90" stroke="#597a81" stroke-opacity=".6" rx="3"')+text(83,325,'ON THE TABLE',11,'#c3ccba','letter-spacing="2.5"');
  [['COMPUTE ACCESS','A proposed shared evaluation pilot'],['EVIDENCE RIGHTS','Who can inspect the results?'],['OPEN QUESTION','Who pays for independent testing?']].forEach((a,i)=>{s+=text(83,367+i*65,a[0],10,'#9db7bd','letter-spacing="1.7"')+text(83,390+i*65,a[1],15,'#e2e8df');});
  s+=tag(750,554,'INDIA','COMPUTE DELEGATION')+tag(1250,552,'JAPAN','PROCUREMENT DELEGATION');
  return s+dialogue('India','COMPUTE DELEGATE',['“We can open the programme. But a requirement without','funding will exclude the teams you want at the table.”'],[['Offer a jointly funded pilot','Keep the scope small; share the testing cost.'],['Negotiate mutual evidence access','Discuss rights before committing resources.'],['Request a revised proposal','Keep the talks open; spend another month.']]);
}
function disputed(){
  let s=title('A REPORT DOES NOT MATCH','The missing appendix.','The coalition has the same results. Not the same test.');
  s+=`<g transform="translate(80 303) rotate(-2)">${rect(0,0,410,285,'#c2cabc','rx="2" filter="url(#shadow)"')}${text(25,34,'INDEPENDENT EVALUATION',12,'#31515a','letter-spacing="1.8"')}${line(25,51,382,51,'#617c7b')}${text(25,86,'MODEL VERSION  /  04.2',11,'#536e72')}${text(25,123,'Reproduction status',20,'#223f4a','font-family="Georgia,serif"')}${rect(25,144,183,30,'#71776a')}${text(37,165,'INCOMPLETE RECORD',11,'#f3edcf','letter-spacing=".7"')}${text(25,210,'Test configuration absent from annex.',13,'#385660')}${text(25,238,'Evidence request: still outstanding.',13,'#385660')}${text(357,270,'03 / 08',10,'#607976')}</g>`;
  s+=tag(956,557,'BRAZIL','EVIDENCE REVIEW DELEGATE',285);
  return s+dialogue('Brazil','EVIDENCE REVIEW DELEGATE',['“I am not accusing anyone. I am asking which test we ran.','Until we can reproduce it, the announcement is premature.”'],[['Convene a joint technical review','Ask both teams to reproduce the result.'],['Publish the uncertainty','Keep the draft; label what is not verified.'],['Postpone the announcement','Protect the standard; risk losing momentum.']]);
}
function geneva(){
  let s=title('FINAL SESSION','One clause left.','Geneva · 21 June 2027');
  s+=rect(1085,135,470,108,'#142c36','fill-opacity=".89" stroke="#a9b3a0" stroke-opacity=".5"')+text(1108,167,'JOINT TEXT / ARTICLE 07',10,'#d4d1af','letter-spacing="2"')+text(1108,202,'Who reviews a serious incident?',23,'#e8eadc','font-family="Georgia,serif"')+text(1108,225,'Verification and access remain bracketed.',12,'#b8cdca');
  s+=tag(87,554,'UNITED STATES','DELEGATION',225)+tag(437,552,'KENYA','DELEGATION',205)+tag(843,550,'SWITZERLAND','SESSION CHAIR',230)+tag(1284,548,'CHINA','DELEGATION',218);
  return s+dialogue('Switzerland','SESSION CHAIR',['“A joint statement is not the same as a working safeguard.','What can every delegation commit to—and let others verify?”'],[['Table a shared verification protocol','Seek agreement on evidence and review rights.'],['Agree a narrower, testable pilot','Name the owners, the deadline and the remedy.'],['Record the remaining disagreement','Publish the open question; preserve the talks.']],1);
}
const index=Math.max(0,Math.min(3,Number(new URLSearchParams(location.search).get('scene'))||0));
const scene=scenes[index];
document.title=`Before Geneva · ${scene.id}`;
document.getElementById('frame').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${scene.id}"><style>text{font-family:Arial,Helvetica,sans-serif}</style>${definitions}<image href="art/${scene.art}" x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/>${[council,bilateral,disputed,geneva][index]()}${hud(scene)}${footer()}</svg>`;
