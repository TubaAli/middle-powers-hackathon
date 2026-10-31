// Orbit Accord: a negotiation game on top of the Leverage Map data.
// AI shares and stage weights come unchanged from ../data/layers.json (gszep's model);
// conditions and law windows from ../data/conditions.json and ../data/windows.json.
// Non-AI powers and the acceptance formula are illustrative game mechanics, shown to the player.

const MONTHS = ['Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027'];
const MONTH_KEYS = ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06'];
const GAME_END = '2027-06-30';
const DECAY_FROM = 5; // April: short-lived chokepoints start to fade
const DECAY = 0.8;
const PRICE = { need: 12, other: 4, promise: 15 };
const MAX_GOALS = 3, GOAL_POINTS = 400;

let L, C, W, P;
const g = {
  me: null, goals: [], era: null,
  turn: 0, coalition: [], tokens: {}, refused: {}, promised: {},
  target: null, offer: {}, offerPromise: false,
  log: [], penalty: 0, pendingEvent: null, eventsDone: {},
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const planet = (k) => P.planets.find((p) => p.k === k);
const country = (k) => L.countries.find((c) => c.k === k)?.name ?? k;
const stage = (k) => L.stages.find((s) => s.k === k);
const powerName = (k) => P._meta.powers[k];
const goalOf = (id) => P.goals.find((x) => x.id === id);
const condOf = (n) => C.conditions.find((c) => c.n === n);

// ---- Model (same maths as the Leverage Map) ----
function weight(st, s) {
  const [a, b, c] = st.w;
  return s <= 0.5 ? a + (b - a) * (s / 0.5) : b + (c - b) * ((s - 0.5) / 0.5);
}
const decays = (st) => g.turn >= DECAY_FROM && st.replicate_years[1] <= 3;
function share(st, keys, withDecay = false) {
  const v = keys.reduce((t, k) => t + (st.share[k] ?? 0), 0);
  return withDecay && decays(st) ? v * DECAY : v;
}
function weighted(keys, withDecay = false) {
  let n = 0, d = 0;
  for (const st of L.stages) { const w = weight(st, g.era.s); d += w; n += w * share(st, keys, withDecay); }
  return d ? n / d : 0;
}

function goalProgress(id, keys = g.coalition) {
  const cond = condOf(goalOf(id).cond);
  let best = { v: 0, stage: null };
  for (const lever of cond.levers) for (const k of lever.stages) {
    const v = share(stage(k), keys, true);
    if (v > best.v) best = { v, stage: k };
  }
  const law = W.windows.filter((w) => w.who !== 'All participants' && w.date && w.date <= GAME_END &&
    w.conditions.includes(cond.n) && w.countries.some((k) => keys.includes(k)));
  const raw = Math.min(1, best.v / C._meta.thresholds.strong);
  return { ...best, raw, law, achieved: law.length ? raw : raw * 0.75 };
}

// ---- Negotiation odds (illustrative; every term is shown to the player) ----
function promiseStage(target) {
  return L.stages
    .filter((st) => (st.share[g.me] ?? 0) >= 25 && (st.share[target] ?? 0) < 10)
    .sort((a, b) => (b.share[g.me] ?? 0) - (a.share[g.me] ?? 0))[0];
}
const needs = (k) => Object.entries(planet(k).powers).filter(([, v]) => v <= 1).map(([p]) => p);

function odds(target) {
  const tp = planet(target), conds = g.goals.map((id) => goalOf(id).cond);
  const terms = [];
  terms.push([tp.super ? 12 : 45, tp.super ? 'A superpower: hard to persuade' : 'A middle power: open to coalitions']);
  const need = needs(target);
  for (const [p, n] of Object.entries(g.offer)) if (n > 0) {
    const each = need.includes(p) ? PRICE.need : PRICE.other;
    terms.push([each * n, `${n} × ${powerName(p)} (${need.includes(p) ? 'they need it' : 'nice to have'})`]);
  }
  const ps = promiseStage(target);
  if (g.offerPromise && ps) terms.push([PRICE.promise, `Promise of ${ps.name} supply (you hold ${Math.round(ps.share[g.me])}%, they hold ${Math.round(ps.share[target] ?? 0)}%)`]);
  const lev = Math.round(weighted([g.me]) / 2);
  if (lev) terms.push([lev, `Your weight: ${Math.round(weighted([g.me]))}% of the system's AI depends on you`]);
  if (W.windows.some((w) => w.conditions.some((n) => conds.includes(n)) && w.countries.includes(target) && w.who !== 'All participants'))
    terms.push([10, 'Shared interest: their own law is open on one of your goals']);
  if (target === 'US' && conds.some((n) => [1, 5, 6].includes(n))) terms.push([-10, 'Titanis resists rules that bind its own engines']);
  if (target === 'CN' && conds.some((n) => n !== 2)) terms.push([-20, 'Magnor distrusts a coalition it does not lead']);
  if (g.refused[target]) terms.push([-10 * g.refused[target], `Already refused you ${g.refused[target]}×`]);
  const total = Math.max(3, Math.min(92, terms.reduce((t, [v]) => t + v, 0)));
  return { total, terms };
}

// ---- Setup ----
function orb(p) { return `<span class="orb" style="background: radial-gradient(circle at 35% 35%, #fff8 0, ${p.color} 35%, #0008 100%)"></span>`; }

function renderSetup() {
  $('#pick-planet').innerHTML = P.planets.map((p) => `
    <button class="pcard" data-k="${p.k}" aria-pressed="${g.me === p.k}">${orb(p)}
      <div><b>${esc(p.name)}</b><span>${esc(country(p.k))}${p.super ? ' · superpower' : ''}</span></div></button>`).join('');
  $('#pick-goal').innerHTML = P.goals.map((x) => `
    <button class="gcard" data-id="${x.id}" aria-pressed="${g.goals.includes(x.id)}"><b>${esc(x.name)}</b>
      <span>Condition ${x.cond}: ${esc(condOf(x.cond).name)}. Risk: ${esc(x.risk)}</span></button>`).join('');
  $('#pick-era').innerHTML = P.eras.map((e) => `
    <button class="gcard" data-era="${e.id}" aria-pressed="${g.era?.id === e.id}"><b>${esc(e.name)}</b><span>${esc(e.text)}</span></button>`).join('');
  $('#start').disabled = !(g.me && g.goals.length);
  $('#start-hint').textContent = g.me && g.goals.length ? `${planet(g.me).name} seeks: ${g.goals.map((id) => goalOf(id).name).join('; ')}.` : `Pick a planet and 1–${MAX_GOALS} goals. More goals, more points, harder accord.`;
}

function start() {
  g.coalition = [g.me];
  g.tokens = { ...planet(g.me).powers };
  addLog(`${planet(g.me).title} takes the throne and sets ${g.goals.length > 1 ? 'goals' : 'a goal'}: ${g.goals.map((id) => goalOf(id).name).join('; ')}.`);
  $('#setup').hidden = true; $('#play').hidden = false;
  beginTurn();
}

// ---- Turns and events ----
function beginTurn() {
  if (g.turn >= MONTHS.length) return finish();
  const mk = MONTH_KEYS[g.turn];
  for (const w of W.windows.filter((w) => w.date?.startsWith(mk) || (g.turn === 0 && w.date && w.date < mk)))
    addLog(`${w.who}: ${w.label}${w.approx ? ' (rough date)' : ''}.`);
  if (g.turn === DECAY_FROM) addLog('Rivals finish new data centres and models. Leverage from short-lived chokepoints (≤3 years to replace) now counts 20% less.');
  g.pendingEvent = makeEvent();
  render();
}

function makeEvent() {
  if (g.turn === 1 && !g.eventsDone.squeeze && !g.coalition.includes('CN')) {
    const refining = share(stage('mine'), g.coalition);
    if (refining < 10) return {
      id: 'squeeze', title: 'Magnor squeezes refined metals',
      text: `Magnor refines ~70% of the system's critical minerals and restricts exports. Your coalition refines only ${Math.round(refining)}%. Your forges stall unless you buy stockpiles.`,
      choices: [{ label: 'Spend 1 token on stockpiles', cost: 1 }, { label: 'Absorb the shock (−40 points)', penalty: 40 }],
    };
    addLog(`Magnor squeezes refined metals, but your coalition refines ${Math.round(refining)}% and rides it out.`);
  }
  if (g.turn === 3 && !g.eventsDone.pressure && !g.coalition.includes('US')) {
    const allies = g.coalition.filter((k) => k !== g.me && !planet(k).super);
    if (allies.length) {
      const ally = allies.sort((a, b) => (stage('design').share[a] ?? 0) - (stage('design').share[b] ?? 0) || weighted([a]) - weighted([b]))[0];
      const want = needs(ally).find((p) => (g.tokens[p] ?? 0) > 0);
      return {
        id: 'pressure', title: 'Titanis leans on your allies',
        text: `Titanis designs ~95% of AI chips and hosts most AI computing. It warns ${planet(ally).name} that joining your accord could cost it access. ${planet(ally).name} wavers.`,
        choices: [
          want ? { label: `Reassure them: give 1 ${powerName(want)}`, give: want, ally } : { label: 'You have nothing they need', disabled: true },
          { label: `Let ${planet(ally).name} leave`, drop: ally },
        ],
      };
    }
  }
  return null;
}

function resolveEvent(i) {
  const ev = g.pendingEvent, ch = ev.choices[i];
  if (ch.disabled) return;
  if (ch.cost) { const p = Object.keys(g.tokens).filter((k) => g.tokens[k] > 0).sort((a, b) => g.tokens[b] - g.tokens[a])[0]; if (p) { g.tokens[p]--; addLog(`You spend 1 ${powerName(p)} on stockpiles.`); } else { g.penalty += 40; addLog('No tokens left: you absorb the shock (−40).'); } }
  if (ch.penalty) { g.penalty += ch.penalty; addLog(`You absorb the shock (−${ch.penalty}).`); }
  if (ch.give) { g.tokens[ch.give]--; addLog(`You give ${planet(ch.ally).name} 1 ${powerName(ch.give)}; it stays in the accord.`); }
  if (ch.drop) { g.coalition = g.coalition.filter((k) => k !== ch.drop); addLog(`${planet(ch.drop).name} leaves the accord under pressure from Titanis.`); }
  g.eventsDone[ev.id] = true; g.pendingEvent = null;
  render();
}

function propose() {
  const t = g.target, o = odds(t);
  for (const [p, n] of Object.entries(g.offer)) if (n > 0 && (g.tokens[p] ?? 0) < n) return;
  const roll = Math.random() * 100;
  const offerText = Object.entries(g.offer).filter(([, n]) => n > 0).map(([p, n]) => `${n} ${powerName(p)}`).concat(g.offerPromise ? ['a supply promise'] : []).join(', ') || 'nothing but words';
  if (roll < o.total) {
    for (const [p, n] of Object.entries(g.offer)) g.tokens[p] -= n;
    if (g.offerPromise) g.promised[t] = true;
    g.coalition.push(t);
    addLog(`<b class="ok">${esc(planet(t).name)} joins</b> the accord (chance ${o.total}%; you offered ${esc(offerText)}).`, true);
  } else {
    g.refused[t] = (g.refused[t] ?? 0) + 1;
    addLog(`<b class="no">${esc(planet(t).name)} refuses</b> (chance ${o.total}%). Your offer was ${esc(offerText)}; you keep it.`, true);
  }
  g.target = null; g.offer = {}; g.offerPromise = false;
  nextTurn();
}

function nextTurn() { g.turn++; beginTurn(); }

function addLog(html, raw = false) { g.log.unshift({ m: MONTHS[Math.min(g.turn, MONTHS.length - 1)], html: raw ? html : esc(html) }); }

// ---- Rendering ----
function renderHud() {
  $('#hud').innerHTML = `
    <span class="chip">Month <b>${MONTHS[Math.min(g.turn, 7)]}</b> <span class="months">${MONTHS.map((_, i) => `<i class="${i < g.turn ? 'done' : i === g.turn ? 'now' : ''}"></i>`).join('')}</span></span>
    <span class="chip">Age: <b>${esc(g.era.name)}</b></span>
    ${g.goals.map((id) => `<span class="chip">${esc(goalOf(id).name)} · <b>${Math.round(goalProgress(id).achieved * 100)}%</b></span>`).join('')}
    <span class="chip">Accord holds <b>${Math.round(weighted(g.coalition, true))}%</b> of AI supply</span>`;
}

function renderSystem() {
  const R = { 1: 115, 2: 195, 3: 268 }, cx = 300, cy = 300;
  const pos = {};
  for (const p of P.planets) {
    const a = (p.angle * Math.PI) / 180;
    pos[p.k] = { x: cx + R[p.orbit] * Math.cos(a), y: cy + R[p.orbit] * Math.sin(a), r: 9 + Math.sqrt(weighted([p.k])) * 3.4 };
  }
  const asteroids = Array.from({ length: 70 }, (_, i) => {
    const a = (i / 70) * Math.PI * 2 + (i % 3) * 0.03, rr = R[3] + ((i * 37) % 17) - 8;
    return `<circle class="asteroid" cx="${(cx + rr * Math.cos(a)).toFixed(1)}" cy="${(cy + rr * Math.sin(a)).toFixed(1)}" r="${1 + (i % 3) * 0.5}"/>`;
  }).join('');
  const me = pos[g.me];
  const bonds = g.coalition.filter((k) => k !== g.me).map((k) => `<line class="bond" x1="${me.x}" y1="${me.y}" x2="${pos[k].x}" y2="${pos[k].y}"/>`).join('');
  const planets = P.planets.map((p) => {
    const q = pos[p.k], ally = g.coalition.includes(p.k), isMe = p.k === g.me;
    return `<g class="planet" data-k="${p.k}" tabindex="${isMe ? -1 : 0}" role="button" aria-label="${esc(p.name)} (${esc(country(p.k))})${ally ? ', in your accord' : ''}">
      <circle class="body" cx="${q.x}" cy="${q.y}" r="${q.r}" fill="url(#g-${p.k})"/>
      ${ally ? `<circle class="ally-ring" cx="${q.x}" cy="${q.y}" r="${q.r + 5}"/>` : ''}
      ${g.target === p.k ? `<circle class="sel-ring" cx="${q.x}" cy="${q.y}" r="${q.r + 9}"/>` : ''}
      ${isMe ? `<text class="you" x="${q.x}" y="${q.y - q.r - 8}">YOU</text>` : ''}
      <text class="label" x="${q.x}" y="${q.y + q.r + 14}">${esc(p.name)}</text>
      <text class="label country" x="${q.x}" y="${q.y + q.r + 26}">${esc(country(p.k))}</text></g>`;
  }).join('');
  const grads = P.planets.map((p) => `<radialGradient id="g-${p.k}" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".3" stop-color="${p.color}"/><stop offset="1" stop-color="#05060c"/></radialGradient>`).join('');
  $('#system').innerHTML = `<defs><radialGradient id="sunGrad"><stop offset="0" stop-color="#fff6d5"/><stop offset=".4" stop-color="#f2c96b"/><stop offset="1" stop-color="#f2c96b" stop-opacity="0"/></radialGradient>${grads}</defs>
    ${[1, 2, 3].map((o) => `<circle class="orbit" cx="${cx}" cy="${cy}" r="${R[o]}"/>`).join('')}
    ${asteroids}
    <circle class="sun" cx="${cx}" cy="${cy}" r="58"/>
    <text class="label" x="${cx}" y="${cy - 2}" style="fill:#2a1f05;font-weight:700">The Frontier</text>
    <text class="label" x="${cx}" y="${cy + 12}" style="fill:#2a1f05;font-size:10px">thinking-engines</text>
    ${bonds}${planets}`;
}

function topStages(k, min = 10) {
  return L.stages.filter((st) => (st.share[k] ?? 0) >= min).sort((a, b) => (b.share[k] ?? 0) - (a.share[k] ?? 0));
}
function dependsOn(k) {
  return L.stages.filter((st) => (st.share[k] ?? 0) < 10).map((st) => {
    const [top, v] = Object.entries(st.share).filter(([c]) => c !== 'OTH').sort((a, b) => b[1] - a[1])[0];
    return { st, top, v };
  }).filter((d) => d.top !== k).sort((a, b) => weight(b.st, g.era.s) - weight(a.st, g.era.s)).slice(0, 4);
}
const tokenList = (obj, k) => Object.entries(obj).map(([p, n]) => `<span class="tok${k && needs(k).includes(p) ? ' need' : ''}">${powerName(p)} <b>${n}</b></span>`).join('');

function renderMe() {
  const p = planet(g.me);
  const goalRows = g.goals.map((id) => {
    const goal = goalOf(id), pr = goalProgress(id);
    return `<div class="label-s">Goal: ${esc(goal.name)} · ${Math.round(pr.achieved * 100)}%</div>
    <div class="progress"><i style="width:${Math.round(pr.achieved * 100)}%"></i></div>
    <div class="muted small">Best lever: ${pr.stage ? `${esc(stage(pr.stage).name)} at ${Math.round(pr.v)}%` : 'none yet'} (50% needed).
      ${pr.law.length ? `<span class="ok">Law vehicle: ${esc(pr.law[0].who)}, ${esc(pr.law[0].date)}.</span>` : '<span class="no">No member has a law window for this before July: capped at 75%.</span>'}</div>`;
  }).join('');
  $('#me').innerHTML = `
    <div class="head">${orb(p)}<div><h3>${esc(p.name)} <span class="muted small">(${esc(country(p.k))})</span></h3><div class="title">You are the ${esc(p.title)}</div></div></div>
    <div class="label-s">World AI that depends on you</div>
    <div class="big">${Math.round(weighted([g.me]))}%</div>
    <div class="muted small">Your weighted share of the AI supply chain in the ${esc(g.era.name)}.</div>
    <div class="label-s">Your AI powers</div>
    <div class="kv">${topStages(g.me).map((st) => `<span>${esc(st.name)}</span><span>${Math.round(st.share[g.me])}%</span>`).join('') || '<span class="muted">No stage above 10%</span><span></span>'}</div>
    <div class="label-s">You depend on</div>
    <div class="kv">${dependsOn(g.me).map((d) => `<span>${esc(d.st.name)}</span><span>${esc(planet(d.top)?.name ?? country(d.top))} ${Math.round(d.v)}%</span>`).join('')}</div>
    <div class="label-s">Other powers to trade (illustrative)</div>
    <div class="tokens">${tokenList(g.tokens)}</div>
    ${goalRows}
    <div class="actions"><button class="btn ghost" id="pass">Let the month pass</button></div>`;
}

function renderTarget() {
  const el = $('#target');
  if (!g.target || g.pendingEvent) { el.hidden = true; return; }
  const t = g.target, p = planet(t), inAcc = g.coalition.includes(t);
  el.hidden = false;
  if (inAcc) {
    el.innerHTML = `<div class="head">${orb(p)}<div><h3>${esc(p.name)}</h3><div class="title">${esc(p.title)} · ${esc(country(t))}</div></div></div>
      <p class="ok">Already in your accord.</p><p class="muted small">${esc(p.flavor)}</p>`;
    return;
  }
  const o = odds(t), ps = promiseStage(t);
  const tokenInputs = Object.entries(g.tokens).filter(([, n]) => n > 0).map(([pw, n]) => `
    <label><input type="number" min="0" max="${n}" value="${g.offer[pw] ?? 0}" data-p="${pw}" style="width:52px"> ${powerName(pw)} <span class="muted small">(you have ${n}${needs(t).includes(pw) ? ', they need it' : ''})</span></label>`).join('');
  el.innerHTML = `
    <div class="head">${orb(p)}<div><h3>${esc(p.name)} <span class="muted small">(${esc(country(t))})</span></h3><div class="title">${esc(p.title)}</div></div></div>
    <p class="muted small">${esc(p.flavor)}</p>
    <div class="kv"><span>World AI that depends on them</span><span>${Math.round(weighted([t]))}%</span>
      ${topStages(t, 15).slice(0, 3).map((st) => `<span>${esc(st.name)}</span><span>${Math.round(st.share[t])}%</span>`).join('')}</div>
    <div class="label-s">They need</div>
    <div class="tokens">${needs(t).map((pw) => `<span class="tok need">${powerName(pw)}</span>`).join('') || '<span class="muted small">Little; they are self-sufficient.</span>'}</div>
    <div class="label-s">Your offer: join your accord</div>
    <div class="offer">${tokenInputs || '<span class="muted small">You have no tokens left to offer.</span>'}
      ${ps ? `<label><input type="checkbox" id="promise" ${g.offerPromise ? 'checked' : ''}> Promise them ${esc(ps.name)} supply <span class="muted small">(use your AI leverage)</span></label>` : '<span class="muted small">You hold no stage they lack, so no supply promise to make.</span>'}
    </div>
    <div class="odds"><span class="big">${o.total}%</span><span class="muted">chance they accept</span></div>
    <ul class="why">${o.terms.map(([v, t2]) => `<li class="${v >= 0 ? 'plus' : 'minus'}">${v >= 0 ? '+' : ''}${v} ${esc(t2)}</li>`).join('')}</ul>
    <div class="actions"><button class="btn primary" id="send">Send envoy (uses this month)</button><button class="btn ghost" id="cancel">Cancel</button></div>`;
}

function renderEvent() {
  const el = $('#event'), ev = g.pendingEvent;
  el.hidden = !ev;
  if (!ev) return;
  el.innerHTML = `<h3>${esc(ev.title)}</h3><p>${esc(ev.text)}</p>
    <div class="actions">${ev.choices.map((c, i) => `<button class="btn" data-choice="${i}" ${c.disabled ? 'disabled' : ''}>${esc(c.label)}</button>`).join('')}</div>`;
}

function renderLog() {
  $('#log').innerHTML = `<div class="label-s" style="margin-top:0">Chronicle</div>` + g.log.map((l) => `<p><span class="m">${l.m}</span>${l.html}</p>`).join('');
}

function render() {
  renderHud(); renderSystem(); renderEvent(); renderMe(); renderTarget(); renderLog();
}

// ---- Debrief ----
function finish() {
  g.turn = MONTHS.length;
  const res = g.goals.map((id) => ({ goal: goalOf(id), pr: goalProgress(id) }));
  const acc = weighted(g.coalition, true);
  const tokensLeft = Object.values(g.tokens).reduce((t, n) => t + n, 0);
  const parts = [
    ...res.map((r) => [`Goal: ${r.goal.name}`, Math.round(r.pr.achieved * GOAL_POINTS)]),
    ['Accord leverage (share of AI supply × 4)', Math.round(acc * 4)],
    ['Tokens kept (× 10)', tokensLeft * 10],
    ['Shocks absorbed', -g.penalty],
  ];
  const score = parts.reduce((t, [, v]) => t + v, 0);
  const ratio = score / (GOAL_POINTS * res.length + 200);
  const rank = ratio >= 0.9 ? 'Architect of the Accord' : ratio >= 0.65 ? 'Trusted Broker' : ratio >= 0.4 ? 'Hopeful Envoy' : 'Lone Orbit';
  $('#play').hidden = true;
  const end = $('#end'); end.hidden = false;
  end.innerHTML = `
    <h2>The eight months are over</h2>
    <div class="score">${score}</div><div class="rank">${rank}</div>
    <div class="card">
      <h3>Your result</h3>
      <div class="kv">${parts.map(([k, v]) => `<span>${esc(k)}</span><span>${v}</span>`).join('')}</div>
      <div class="label-s">Your accord</div>
      <p>${g.coalition.map((k) => `${esc(planet(k).name)} (${esc(country(k))})`).join(', ')}</p>
    </div>
    <h2>What each goal would mean in the real world</h2>
    <div class="cols">${res.map(({ goal, pr }) => `
      <div class="card">
        <h3>${esc(goal.name)} · ${Math.round(pr.achieved * 100)}%</h3>
        <p class="muted small">Best lever ${pr.stage ? `${esc(stage(pr.stage).name)} at ${Math.round(pr.v)}%` : 'none'}${pr.law.length ? `; law vehicle: ${esc(pr.law[0].who)} (${esc(pr.law[0].label)})` : '; no member had a law window, so capped at 75%'}.</p>
        <div class="label-s">Risk addressed</div><p>${esc(goal.risk)}</p>
        <div class="label-s">Assumed causal route</div><p>${esc(goal.route)}</p>
        <div class="label-s">Whose consent is needed</div><p>${esc(goal.consent)}</p>
        <div class="label-s">Evidence gap</div><p>${esc(goal.gap)}</p>
        <p class="muted small">Condition ${goal.cond} from <a href="${C._meta.source_url}" target="_blank" rel="noopener">gszep, Six safety conditions</a>.</p>
      </div>`).join('')}
    </div>
    <div class="card">
      <h3>What this game does not prove</h3>
      <ul>
        <li><b>Winning a mission is not real-world safety impact.</b> It shows how leverage could add up, not that any government would act.</li>
        <li><b>AI shares are rough averages</b> from <a href="${L._meta.source_url}" target="_blank" rel="noopener">gszep's leverage model</a>; holding a share is not the legal authority to attach a condition.</li>
        <li><b>Other powers (food, medicine, energy…) are illustrative tokens</b>, not measured trade data.</li>
        <li><b>Acceptance chances are a teaching formula</b> (every term was shown to you), not a model of real diplomacy. Retaliation, domestic politics and treaty law are missing.</li>
        <li><b>Law windows are openings, not delivery plans</b>; only the EuroHPC dates are independently checked.</li>
      </ul>
      <p class="muted small">Built with help from Claude (Anthropic). See the full <a href="../index.html#about">data and limits page</a>.</p>
    </div>
    <div class="actions"><button class="btn primary" id="again">Play again</button></div>`;
}

// ---- Wiring ----
function wire() {
  $('#pick-planet').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) { g.me = b.dataset.k; renderSetup(); } });
  $('#pick-goal').addEventListener('click', (e) => {
    const b = e.target.closest('[data-id]'); if (!b) return;
    const id = b.dataset.id;
    if (g.goals.includes(id)) g.goals = g.goals.filter((x) => x !== id);
    else if (g.goals.length < MAX_GOALS) g.goals.push(id);
    renderSetup();
  });
  $('#pick-era').addEventListener('click', (e) => { const b = e.target.closest('[data-era]'); if (b) { g.era = P.eras.find((x) => x.id === b.dataset.era); renderSetup(); } });
  $('#start').addEventListener('click', start);
  const pick = (e) => {
    const pl = e.target.closest('.planet'); if (!pl || g.pendingEvent) return;
    const k = pl.dataset.k; if (k === g.me) return;
    g.target = k; g.offer = {}; g.offerPromise = false; render();
  };
  $('#system').addEventListener('click', pick);
  $('#system').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(e); } });
  $('#event').addEventListener('click', (e) => { const b = e.target.closest('[data-choice]'); if (b) resolveEvent(Number(b.dataset.choice)); });
  document.addEventListener('click', (e) => {
    if (e.target.id === 'send') propose();
    if (e.target.id === 'cancel') { g.target = null; render(); }
    if (e.target.id === 'pass' && !g.pendingEvent) { addLog('The month passes quietly.'); g.target = null; nextTurn(); }
    if (e.target.id === 'again') location.reload();
  });
  $('#target').addEventListener('input', (e) => {
    if (e.target.dataset.p) { g.offer[e.target.dataset.p] = Math.max(0, Math.min(g.tokens[e.target.dataset.p], Number(e.target.value) || 0)); }
    if (e.target.id === 'promise') g.offerPromise = e.target.checked;
    const o = odds(g.target);
    $('#target .odds .big').textContent = `${o.total}%`;
    $('#target .why').innerHTML = o.terms.map(([v, t2]) => `<li class="${v >= 0 ? 'plus' : 'minus'}">${v >= 0 ? '+' : ''}${v} ${esc(t2)}</li>`).join('');
  });
}

Promise.all(['../data/layers.json', '../data/conditions.json', '../data/windows.json', 'planets.json'].map((u) => fetch(u).then((r) => r.json())))
  .then(([l, c, w, p]) => {
    L = l; C = c; W = w; P = p;
    g.era = P.eras.find((e) => e.id === 'today');
    wire(); renderSetup();
  })
  .catch((err) => { document.querySelector('main').innerHTML = `<p class="muted">Could not load game data: ${esc(err.message)}. Serve the repository folder over HTTP.</p>`; });
