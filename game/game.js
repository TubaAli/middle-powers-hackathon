// Orbit Accord: fly your planet, meet the others, build an accord before the laws close.
// AI shares and stage weights come unchanged from ../data/layers.json (gszep's model);
// conditions and law windows from ../data/conditions.json and ../data/windows.json.
// Non-AI tokens, move effects and acceptance odds are illustrative game mechanics, shown to the player.

const MONTHS = ['Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027'];
const MONTH_KEYS = ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06'];
const GAME_END = '2027-06-30';
const MONTH_SECONDS = 30;
const DECAY_FROM = 5, DECAY = 0.8;           // April: short-lived chokepoints fade
const CHOKE_BOOST = 1.25;                    // licensing your chokepoint makes it count more
const BUILD = { power: 2, compute: 1 };      // share points a data-centre campus adds
const PRICE = { need: 15, other: 5, promise: 15, tour: 10 };
const MAX_GOALS = 3, GOAL_POINTS = 400;
const ORBIT_R = { 1: 115, 2: 195, 3: 268 }, ORBIT_SPEED = { 1: 0.05, 2: 0.03, 3: 0.018 };

let L, C, W, P;
const g = {
  phase: 'setup', me: null, goals: [], era: null,
  turn: 0, timeLeft: MONTH_SECONDS, coalition: [], tokens: {}, bonus: {}, tabled: [], choke: null,
  shield: {}, tour: false, asked: new Set(), penalty: 0, near: null,
};
const keys = {};
const world = { w: 0, h: 0, cx: 0, cy: 0, u: 1, dpr: 1, stars: [], ang: {}, pos: {}, player: { x: 0, y: 0, vx: 0, vy: 0, trail: [] }, aim: null };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const planet = (k) => P.planets.find((p) => p.k === k);
const country = (k) => L.countries.find((c) => c.k === k)?.name ?? k;
const stage = (k) => L.stages.find((s) => s.k === k);
const goalOf = (id) => P.goals.find((x) => x.id === id);
const condOf = (n) => C.conditions.find((c) => c.n === n);
const icon = (p) => P._meta.icons[p];
const pname = (p) => P._meta.powers[p];
const pct = (x) => (x > 0 && x < 0.5 ? '<1%' : `${Math.round(x)}%`);

// ---------- Model (same maths as the Leverage Map) ----------
function weight(st) {
  const [a, b, c] = st.w, s = g.era.s;
  return s <= 0.5 ? a + (b - a) * (s / 0.5) : b + (c - b) * ((s - 0.5) / 0.5);
}
function share(st, keys2, live = true) {
  let v = 0;
  for (const k of keys2) {
    let x = st.share[k] ?? 0;
    if (live && k === g.me) { x += g.bonus[st.k] ?? 0; if (g.choke === st.k) x *= CHOKE_BOOST; }
    v += x;
  }
  if (live && g.turn >= DECAY_FROM && st.replicate_years[1] <= 3) v *= DECAY;
  return Math.min(100, v);
}
function weighted(keys2, live = true) {
  let n = 0, d = 0;
  for (const st of L.stages) { const w = weight(st); d += w; n += w * share(st, keys2, live); }
  return d ? n / d : 0;
}
function goalProgress(id) {
  const cond = condOf(goalOf(id).cond);
  let best = { v: 0, stage: null };
  for (const lever of cond.levers) for (const k of lever.stages) {
    const v = share(stage(k), g.coalition);
    if (v > best.v) best = { v, stage: k };
  }
  const law = W.windows.filter((w, i) => w.who !== 'All participants' && w.date && w.date <= GAME_END && w.conditions.includes(cond.n) &&
    (w.countries.some((k) => k !== g.me && g.coalition.includes(k)) || g.tabled.includes(i)));
  const raw = Math.min(1, best.v / C._meta.thresholds.strong);
  return { ...best, raw, law, achieved: law.length ? raw : raw * 0.75 };
}
function dependsOn(k) {
  return L.stages.filter((st) => (st.share[k] ?? 0) < 10).map((st) => {
    const [top, v] = Object.entries(st.share).filter(([c]) => c !== 'OTH').sort((a, b) => b[1] - a[1])[0];
    return { st, top, v };
  }).filter((d) => d.top !== k).sort((a, b) => weight(b.st) * b.v - weight(a.st) * a.v);
}
const needs = (k) => Object.entries(planet(k).powers).filter(([, v]) => v <= 1).map(([p]) => p);
const richest = () => Object.keys(g.tokens).filter((p) => g.tokens[p] > 0).sort((a, b) => g.tokens[b] - g.tokens[a])[0];
const goalConds = () => g.goals.map((id) => goalOf(id).cond);

// ---------- Negotiation ----------
function promiseStage(t) {
  return L.stages.filter((st) => (st.share[g.me] ?? 0) >= 25 && (st.share[t] ?? 0) < 10)
    .sort((a, b) => (b.share[g.me] ?? 0) - (a.share[g.me] ?? 0))[0];
}
function odds(t, offer) {
  const tp = planet(t), conds = goalConds();
  let v = tp.super ? 10 : 40;
  if (offer.token) v += needs(t).includes(offer.token) ? PRICE.need : PRICE.other;
  if (offer.promise) v += PRICE.promise;
  v += Math.round(weighted([g.me]) / 2);
  if (W.windows.some((w) => w.who !== 'All participants' && w.countries.includes(t) && w.conditions.some((n) => conds.includes(n)))) v += 10;
  if (g.tour && !tp.super) v += PRICE.tour;
  if (g.rally) v += 5;
  if (t === 'US' && conds.some((n) => [1, 5, 6].includes(n))) v -= 10;
  if (t === 'CN' && conds.some((n) => n !== 2)) v -= 15;
  return Math.max(3, Math.min(92, v));
}
function deals(t) {
  const out = [];
  for (const p of needs(t).filter((p) => (g.tokens[p] ?? 0) > 0).slice(0, 2)) out.push({ token: p, label: `Offer ${icon(p)} ${pname(p)}`, sub: 'They need it' });
  const ps = promiseStage(t);
  if (ps) out.push({ promise: ps.k, label: `Promise ${ps.name}`, sub: `You hold ${Math.round(ps.share[g.me])}%, they hold ${Math.round(ps.share[t] ?? 0)}%` });
  if (!out.length && richest()) { const p = richest(); out.push({ token: p, label: `Offer ${icon(p)} ${pname(p)}`, sub: 'Nice to have' }); }
  out.push({ label: 'Just ask', sub: 'Words only' });
  return out.slice(0, 3);
}
function rollDeal(t, offer) {
  const pct = odds(t, offer), ok = Math.random() * 100 < pct;
  g.asked.add(t);
  if (ok) { if (offer.token) g.tokens[offer.token]--; g.coalition.push(t); }
  return { ok, pct };
}

// ---------- Monthly council: 3–4 moves built from the data ----------
function councilMoves() {
  const moves = [], mk = MONTH_KEYS[g.turn], conds = goalConds();
  const wi = W.windows.findIndex((w, i) => !g.tabled.includes(i) && w.countries.includes(g.me) && w.who !== 'All participants' &&
    w.date && w.date.slice(0, 7) <= mk && w.date <= GAME_END && w.conditions.some((n) => conds.includes(n)));
  if (wi >= 0) {
    const w = W.windows[wi];
    moves.push({ id: 'law', ic: '⚖️', t: 'Table a bill', s: `${w.who}'s window is open. Your goals get a law vehicle.`, run: () => { g.tabled.push(wi); toast(`Bill tabled in ${w.who}.`, 'good'); } });
  }
  const top = L.stages.filter((st) => (st.share[g.me] ?? 0) >= 25).sort((a, b) => b.share[g.me] - a.share[g.me])[0];
  if (top && g.choke !== top.k) {
    const dep = dependsOn(g.me).find((d) => d.top === 'US' || d.top === 'CN');
    const rival = dep?.top ?? 'CN', risk = Math.round(weighted([rival], false));
    moves.push({ id: 'choke', ic: '🔒', t: `License your ${top.name}`, s: `${Math.round(top.share[g.me])}% counts 25% more. ${planet(rival).name} may retaliate (${risk}%).`,
      run: () => { g.choke = top.k; if (Math.random() * 100 < risk) { const p = richest(); if (p) g.tokens[p]--; toast(`${planet(rival).name} retaliates: −1 ${icon(p ?? 'capital')}`, 'bad'); } else toast(`${top.name} licences now carry your conditions.`, 'good'); } });
  }
  const dep = dependsOn(g.me)[0];
  if (dep && !g.shield[dep.top] && richest()) {
    moves.push({ id: 'stock', ic: '📦', t: `Stockpile ${dep.st.name}`, s: `${planet(dep.top)?.name ?? country(dep.top)} supplies ${Math.round(dep.v)}%. Costs 1 token; shields you from their squeeze.`,
      run: () => { const p = richest(); g.tokens[p]--; g.shield[dep.top] = true; toast(`Stockpiled against ${planet(dep.top)?.name ?? country(dep.top)}.`, 'good'); } });
  }
  const cost = ['energy', 'capital'].filter((p) => (g.tokens[p] ?? 0) > 0);
  if (cost.length === 2) {
    moves.push({ id: 'build', ic: '🏗️', t: 'Approve a data-centre campus', s: `−1 ⚡ −1 💰. Hosting is the one stage you can grow fast (1–3 yrs): +${BUILD.power} pts power, +${BUILD.compute} compute.`,
      run: () => { g.tokens.energy--; g.tokens.capital--; for (const [k, v] of Object.entries(BUILD)) g.bonus[k] = (g.bonus[k] ?? 0) + v; toast('Campus approved: your hosting share grows.', 'good'); } });
  }
  if ((g.tokens.market ?? 0) > 0) {
    moves.push({ id: 'tour', ic: '🤝', t: 'Summit tour', s: '−1 🛒. Middle powers +10% to accept this month.', run: () => { g.tokens.market--; g.tour = true; toast('Summit tour: middle powers are listening.', 'good'); } });
  }
  if (dep) {
    const [lo, hi] = dep.st.replicate_years;
    moves.push({ id: 'seed', ic: '🔬', t: `Seed your own ${dep.st.name}`, s: `Free. +1 pt now; real replacement takes ${lo}–${hi} years.`,
      run: () => { g.bonus[dep.st.k] = (g.bonus[dep.st.k] ?? 0) + 1; toast(`A small ${dep.st.name} programme starts.`, 'good'); } });
  }
  moves.push({ id: 'rally', ic: '📣', t: 'Rally support at home', s: 'Free. Every planet +5% to accept this month.', run: () => { g.rally = true; toast('Your people back the accord.', 'good'); } });
  const best = Object.entries(planet(g.me).powers).sort((a, b) => b[1] - a[1])[0][0];
  moves.push({ id: 'trade', ic: icon(best), t: 'Trade season', s: `+1 ${icon(best)} ${pname(best)} to bargain with.`, run: () => { g.tokens[best] = (g.tokens[best] ?? 0) + 1; toast(`+1 ${icon(best)}`, 'good'); } });
  // Law first when open, then costly moves (more interesting), then free fallbacks; trade always last.
  const law = moves.filter((m) => m.id === 'law');
  const rest = moves.filter((m) => !['law', 'trade', 'seed', 'rally'].includes(m.id)).sort(() => Math.random() - 0.5)
    .concat(moves.filter((m) => ['seed', 'rally'].includes(m.id)).sort(() => Math.random() - 0.5));
  return [...law, ...rest].slice(0, 3).concat(moves.find((m) => m.id === 'trade'));
}

function monthEvents() {
  const lines = [];
  if (g.turn === 1 && !g.coalition.includes('CN')) {
    const refining = share(stage('mine'), g.coalition);
    if (g.shield.CN) lines.push('⛏️ Magnor squeezes refined metals. Your stockpiles hold.');
    else if (refining >= 10) lines.push(`⛏️ Magnor squeezes refined metals. Your accord refines ${Math.round(refining)}% and copes.`);
    else { const p = richest(); if (p) g.tokens[p]--; else g.penalty += 40; lines.push(`⛏️ Magnor (70% of refining) squeezes metals: ${p ? `−1 ${icon(p)}` : '−40 points'}.`); }
  }
  if (g.turn === 3 && !g.coalition.includes('US')) {
    const allies = g.coalition.filter((k) => k !== g.me && !planet(k).super).sort((a, b) => weighted([a], false) - weighted([b], false));
    if (allies.length) {
      const a = allies[0], give = needs(a).find((p) => (g.tokens[p] ?? 0) > 0);
      if (g.shield.US) lines.push(`🛰️ Titanis leans on ${planet(a).name}; your stockpiles reassure it.`);
      else if (give) { g.tokens[give]--; lines.push(`🛰️ Titanis leans on ${planet(a).name}. You keep it with ${icon(give)}.`); }
      else { g.coalition = g.coalition.filter((k) => k !== a); lines.push(`🛰️ Titanis leans on ${planet(a).name}. It leaves your accord.`); }
    }
  }
  if (g.turn === DECAY_FROM) lines.push('⏳ Rivals catch up: hosting, compute and models (≤3 yrs to replace) now count 20% less.');
  for (const w of W.windows.filter((w) => w.date?.slice(0, 7) === MONTH_KEYS[g.turn] && (w.countries.some((k) => g.coalition.includes(k)) || !w.countries.length)))
    lines.push(`📜 ${w.who}: ${w.label}.`);
  return lines;
}

// ---------- Flow ----------
function openCouncil() {
  g.phase = 'council'; g.tour = false; g.rally = false; g.asked = new Set();
  const ev = monthEvents(), moves = councilMoves();
  g.moves = moves;
  showOverlay(`
    <h2>${MONTHS[g.turn]} · Council of ${esc(planet(g.me).name)}</h2>
    <p class="lede">Choose one move this month. Then fly out and meet other planets.</p>
    ${ev.map((l) => `<div class="event">${esc(l)}</div>`).join('')}
    <div class="moves">${moves.map((m, i) => `<button class="move" data-move="${i}"><span class="ic">${m.ic}</span><div><span class="k">${i + 1}</span><b>${esc(m.t)}</b><span>${esc(m.s)}</span></div></button>`).join('')}</div>`);
}
function pickMove(i) {
  const m = g.moves?.[i]; if (!m) return;
  m.run(); closeOverlay(); g.phase = 'fly'; g.timeLeft = MONTH_SECONDS;
}
function endMonth() {
  g.turn++;
  if (g.turn >= MONTHS.length) return finish();
  openCouncil();
}
// ---------- Meeting: mecha envoys talk, you pick a leverage point, the court answers by letter (meeting.js) ----------
function openTalk(t) {
  g.phase = 'talk';
  const p = planet(t), me = planet(g.me), inAcc = g.coalition.includes(t), asked = g.asked.has(t);
  const tops = L.stages.filter((st) => (st.share[t] ?? 0) >= 15).sort((a, b) => b.share[t] - a.share[t]).slice(0, 2);
  const ds = inAcc || asked ? [] : deals(t);
  const goal = goalOf(g.goals[0]), need = needs(t);
  const withThem = pct(weighted([...g.coalition, t])), now = pct(weighted(g.coalition));
  const actor = (q) => ({ k: q.k, name: q.name, title: q.title, color: q.color, envoy: CAST[q.k].name });
  const facts = [`${esc(p.name)}: <b>${pct(weighted([t], false))}</b> of AI supply`,
    ...tops.map((st) => `${esc(st.name)} <b>${Math.round(st.share[t])}%</b>`),
    `Needs ${need.map(icon).join(' ') || '—'}`, `Your accord <b>${now}</b> → with them <b>${withThem}</b>`];
  const script = [];
  if (inAcc) script.push({ who: 'them', mood: 'happy', pop: '♪', text: `Partner! ${p.name} stands with your accord. Go win the others.` });
  else if (asked) script.push({ who: 'them', mood: 'flat', pop: '…', text: 'We already gave you our answer this month. Come back next month, envoy.' });
  else {
    script.push({ who: 'them', mood: p.super ? 'flat' : 'happy', text: p.super
      ? `${p.name} carries ${pct(weighted([t], false))} of the world's AI. Speak quickly, envoy of ${me.name}.`
      : `Welcome to ${p.name}.${tops[0] ? ` We make ${Math.round(tops[0].share[t])}% of the world's ${tops[0].name}.` : ''} What brings you here?` });
    script.push({ who: 'me', mood: 'happy', text: `I'm building an accord for ${goal.short.toLowerCase()}. With you in it, we'd hold ${withThem} of AI supply, up from ${now}.` });
    const conds = goalConds();
    script.push({ who: 'them', mood: p.super ? 'think' : 'flat', pop: '?', text:
      t === 'US' && conds.some((n) => [1, 5, 6].includes(n)) ? 'Rules like that slow our labs, and our labs lead. Why should we tie our own hands?'
      : t === 'CN' && conds.some((n) => n !== 2) ? 'Your accord looks like a club against us. Convince me it is not.'
      : need.length ? `Our people are short of ${need.map((n) => `${icon(n)} ${pname(n).toLowerCase()}`).join(' and ')}. What do you bring to the table?`
      : 'We hold strong cards already. What would we gain?' });
    script.push({ choice: true });
  }
  Meeting.open({
    month: MONTHS[g.turn], me: actor(me), them: actor(p), facts, script,
    ask: `How do you persuade ${p.name}? Pick your leverage (1–${ds.length}).`,
    deals: ds.map((d) => ({ label: esc(d.label), sub: esc(d.sub), pct: odds(t, d) })),
    onChoose: (i) => rollDeal(t, ds[i]),
    afterChoice: (i) => {
      const d = ds[i];
      const line = d.token ? `We'll send ${icon(d.token)} ${pname(d.token).toLowerCase()}. ${need.includes(d.token) ? 'You need it more than we do.' : 'Take it as goodwill.'}`
        : d.promise ? `We make ${Math.round(stage(d.promise).share[g.me])}% of the world's ${stage(d.promise).name}. Join us, and it stays open to you.`
        : 'No trade. Join because it is the safe thing to do.';
      return [
        { who: 'me', mood: 'flat', text: line },
        { think: true },
        { who: 'them', mood: 'flat', pop: '✉', text: `Offer logged. The court of ${p.name} will deliberate. Its answer comes by letter, not from me.` },
      ];
    },
    get letter() {
      if (!this.result) return null;
      const d = this.chosen, ok = this.result.ok;
      return {
        body: ok
          ? [`On your proposal for <b>${esc(goal.short.toLowerCase())}</b>: ${esc(p.name)} <b>joins your accord</b>.`,
             `Together our worlds now hold <b>${pct(weighted(g.coalition))}</b> of the AI supply chain. ${d.label === 'Just ask' ? 'You asked plainly, and we respect that.' : `Your offer (${d.label.replace(/^(Offer|Promise) /, '')}) answered what we needed.`}`]
          : [`On your proposal for <b>${esc(goal.short.toLowerCase())}</b>: ${esc(p.name)} <b>declines</b> for now.`,
             p.super ? 'A superpower gives up freedom of action slowly. Bring a stronger accord, or stronger leverage.' : 'Your offer did not yet outweigh our own interests. Our door stays open next month.'],
        foot: `Chance was ${this.result.pct}%. Odds are illustrative game rules; AI shares from gszep's model.`,
      };
    },
    onClose: (res) => {
      g.phase = 'fly';
      if (res) toast(res.ok ? `${p.name} joins your accord! (${res.pct}%)` : `${p.name} declines (${res.pct}%). Try next month.`, res.ok ? 'good' : 'bad');
    },
  });
}

function finish() {
  g.phase = 'end'; $('#toasts').innerHTML = '';
  const res = g.goals.map((id) => ({ goal: goalOf(id), pr: goalProgress(id) }));
  const acc = weighted(g.coalition);
  const kept = Object.values(g.tokens).reduce((t, n) => t + n, 0);
  const parts = [...res.map((r) => [r.goal.short, Math.round(r.pr.achieved * GOAL_POINTS)]), ['Accord leverage', Math.round(acc * 4)], ['Tokens kept', kept * 10], ['Shocks', -g.penalty]];
  const score = parts.reduce((t, [, v]) => t + v, 0);
  const ratio = score / (GOAL_POINTS * res.length + 200);
  const rank = ratio >= 0.9 ? 'Architect of the Accord' : ratio >= 0.65 ? 'Trusted Broker' : ratio >= 0.4 ? 'Hopeful Envoy' : 'Lone Orbit';
  showOverlay(`
    <div class="foot" style="margin-top:0"><div><h2>The eight months are over</h2><div class="muted">${rank}</div></div><div class="score">${score}</div></div>
    <p class="small">${parts.map(([k, v]) => `${esc(k)} <b>${v}</b>`).join(' · ')}</p>
    <p class="small muted">Accord: ${g.coalition.map((k) => `${esc(planet(k).name)} (${esc(country(k))})`).join(', ')}</p>
    <div class="dgrid">${res.map(({ goal, pr }) => `<div class="dcard"><h3>${esc(goal.short)} · ${Math.round(pr.achieved * 100)}%</h3><dl>
      <dt>Risk</dt><dd>${esc(goal.risk_s)}</dd><dt>Route</dt><dd>${esc(goal.route_s)}</dd><dt>Needs</dt><dd>${esc(goal.consent_s)}</dd><dt>Gap</dt><dd>${esc(goal.gap_s)}</dd>
      <dt>Law</dt><dd>${pr.law.length ? esc(pr.law[0].who) : 'none (capped 75%)'}</dd></dl></div>`).join('')}</div>
    <p class="limits">Not proof of real-world impact. AI shares: <a href="${L._meta.source_url}" target="_blank" rel="noopener">gszep's model</a> (rough). Tokens, odds and move effects are illustrative game rules. Law dates are openings, not plans. <a href="../index.html#about">Full limits</a> · Built with Claude.</p>
    <div class="foot"><span></span><button class="btn" id="again">Play again</button></div>`);
}

// ---------- Setup screen ----------
const orbBg = (p) => `background: radial-gradient(circle at 35% 35%, #fff9 0, ${p.color} 35%, #000a 100%)`;
function renderSetup() {
  showOverlay(`
    <h1>Orbit Accord</h1>
    <p class="lede">Planets are countries. Fly yours, win allies, and turn AI leverage into safety rules before the laws close.</p>
    <div class="step">1 · Your planet</div>
    <div class="grid g-planets">${P.planets.map((p) => `<button class="opt" data-k="${p.k}" aria-pressed="${g.me === p.k}"><b><span class="orb" style="${orbBg(p)}"></span>${esc(p.name)}</b><span>${esc(country(p.k))} · ${pct(weighted([p.k], false))}</span></button>`).join('')}</div>
    <div class="step">2 · Goals (pick 1–3)</div>
    <div class="grid g-goals">${P.goals.map((x) => `<button class="opt" data-id="${x.id}" aria-pressed="${g.goals.includes(x.id)}"><b>${esc(x.short)}</b><span>Stops: ${esc(x.risk_s)}</span></button>`).join('')}</div>
    <div class="step">3 · Age</div>
    <div class="grid g-eras">${P.eras.map((e) => `<button class="opt" data-era="${e.id}" aria-pressed="${g.era.id === e.id}"><b>${esc(e.name)}</b><span>${Math.round(e.s * 100)}% of progress needs chips &amp; power</span></button>`).join('')}</div>
    <div class="foot"><span class="muted small">% = share of the world's AI supply chain that depends on that planet.</span><button class="btn" id="start" ${g.me && g.goals.length ? '' : 'disabled'}>Launch ▸</button></div>`);
}
function start() {
  g.coalition = [g.me]; g.tokens = { ...planet(g.me).powers };
  const pp = world.pos[g.me];
  Object.assign(world.player, { x: pp.x, y: pp.y, vx: 0, vy: 0, trail: [] });
  $('#hud').hidden = false;
  openCouncil();
}

// ---------- Overlay, HUD, toasts ----------
function showOverlay(html) { $('#panel').innerHTML = html; $('#overlay').hidden = false; }
function closeOverlay() { $('#overlay').hidden = true; if (g.phase === 'talk') g.phase = 'fly'; }
function toast(text, kind = '') {
  const el = document.createElement('div'); el.className = `toast ${kind}`; el.textContent = text;
  const box = $('#toasts'); box.appendChild(el); setTimeout(() => el.remove(), 4000);
  while (box.children.length > 3) box.firstChild.remove();
}
let hudTick = 0;
function renderHud() {
  if (!g.me) return;
  $('#h-month').textContent = MONTHS[Math.min(g.turn, 7)];
  $('#h-timer').textContent = `${Math.min(g.turn + 1, 8)}/8 · ${Math.ceil(g.timeLeft)}s`;
  $('#h-time').style.width = `${(g.timeLeft / MONTH_SECONDS) * 100}%`;
  $('#h-goals').innerHTML = g.goals.map((id) => {
    const pr = goalProgress(id);
    return `<div class="goal"><div class="row"><span>${esc(goalOf(id).short)}</span><b>${Math.round(pr.achieved * 100)}%</b></div>
      <div class="pb"><i style="width:${pr.achieved * 100}%"></i></div>
      <div class="law ${pr.law.length ? 'ok' : ''}">${pr.law.length ? `⚖️ law via ${esc(pr.law[0].who)}` : 'no law vehicle yet (max 75%)'}</div></div>`;
  }).join('');
  $('#h-accord').textContent = `${Math.round(weighted(g.coalition))}%`;
  const p = planet(g.me), dep = dependsOn(g.me).slice(0, 2);
  $('#h-me').innerHTML = `<div class="nm">${esc(p.name)} <span class="sub">${esc(country(g.me))}</span></div>
    <div class="sub">AI that depends on you</div><div class="big">${pct(weighted([g.me]))}</div>
    <div class="sub">You depend on: ${dep.map((d) => `${esc(d.st.name)} ← ${esc(planet(d.top)?.name ?? country(d.top))} ${Math.round(d.v)}%`).join('; ')}</div>
    <div class="toks">${Object.entries(g.tokens).map(([k, n]) => `<span class="tok" title="${pname(k)}">${icon(k)} ${n}</span>`).join('')}</div>`;
}

// ---------- World ----------
function resize() {
  const c = $('#world');
  world.dpr = Math.min(2, window.devicePixelRatio || 1);
  world.w = window.innerWidth; world.h = window.innerHeight;
  c.width = world.w * world.dpr; c.height = world.h * world.dpr;
  world.cx = world.w / 2; world.cy = world.h / 2 + 6;
  world.u = Math.max(0.55, Math.min((world.w - 470) / 600, (world.h - 70) / 600, 1.4));
  if (world.w < 760) world.u = Math.min((world.w - 20) / 600, (world.h - 140) / 600);
  world.stars = Array.from({ length: 160 }, () => ({ x: Math.random() * world.w, y: Math.random() * world.h, r: Math.random() * 1.3, t: Math.random() * 6 }));
}
const pr = (k) => (9 + Math.sqrt(weighted([k], false)) * 3.4) * world.u;

function step(dt) {
  for (const p of P.planets) {
    world.ang[p.k] = (world.ang[p.k] ?? (p.angle * Math.PI) / 180) + (g.phase === 'setup' || g.phase === 'fly' ? ORBIT_SPEED[p.orbit] * dt : 0);
    world.pos[p.k] = { x: world.cx + ORBIT_R[p.orbit] * world.u * Math.cos(world.ang[p.k]), y: world.cy + ORBIT_R[p.orbit] * world.u * Math.sin(world.ang[p.k]) };
  }
  if (g.phase !== 'fly') return;
  const pl = world.player, acc = 900 * world.u, max = 260 * world.u;
  let ax = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0);
  let ay = (keys.ArrowDown || keys.s ? 1 : 0) - (keys.ArrowUp || keys.w ? 1 : 0);
  if (!ax && !ay && world.aim) { const dx = world.aim.x - pl.x, dy = world.aim.y - pl.y, d = Math.hypot(dx, dy); if (d > 6) { ax = dx / d; ay = dy / d; } else world.aim = null; }
  const n = Math.hypot(ax, ay) || 1;
  pl.vx += (ax / n) * acc * dt; pl.vy += (ay / n) * acc * dt;
  pl.vx *= 1 - Math.min(1, 2.6 * dt); pl.vy *= 1 - Math.min(1, 2.6 * dt);
  const sp = Math.hypot(pl.vx, pl.vy); if (sp > max) { pl.vx *= max / sp; pl.vy *= max / sp; }
  pl.x = Math.max(16, Math.min(world.w - 16, pl.x + pl.vx * dt)); pl.y = Math.max(16, Math.min(world.h - 16, pl.y + pl.vy * dt));
  const sx = pl.x - world.cx, sy = pl.y - world.cy, sd = Math.hypot(sx, sy), minD = 62 * world.u + pr(g.me);
  if (sd < minD) { pl.x = world.cx + (sx / (sd || 1)) * minD; pl.y = world.cy + (sy / (sd || 1)) * minD; }
  pl.trail.push({ x: pl.x, y: pl.y }); if (pl.trail.length > 24) pl.trail.shift();
  g.near = null; let best = Infinity;
  for (const p of P.planets) {
    if (p.k === g.me) continue;
    const q = world.pos[p.k], d = Math.hypot(q.x - pl.x, q.y - pl.y);
    if (d < pr(p.k) + pr(g.me) + 34 * world.u && d < best) { best = d; g.near = p.k; }
  }
  g.timeLeft -= dt;
  if (g.timeLeft <= 0) { g.timeLeft = 0; endMonth(); }
}

function draw(t) {
  const ctx = $('#world').getContext('2d'), u = world.u;
  ctx.setTransform(world.dpr, 0, 0, world.dpr, 0, 0);
  ctx.fillStyle = '#070a16'; ctx.fillRect(0, 0, world.w, world.h);
  for (const s of world.stars) { ctx.globalAlpha = 0.4 + 0.4 * Math.sin(t / 900 + s.t); ctx.fillStyle = '#dfe6ff'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#26305a'; ctx.setLineDash([2, 6]);
  for (const r of Object.values(ORBIT_R)) { ctx.beginPath(); ctx.arc(world.cx, world.cy, r * u, 0, 7); ctx.stroke(); }
  ctx.setLineDash([]);
  for (let i = 0; i < 90; i++) {
    const a = (i / 90) * Math.PI * 2 + t / 60000, rr = (ORBIT_R[3] + ((i * 37) % 19) - 9) * u;
    ctx.fillStyle = '#8a7560'; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(world.cx + rr * Math.cos(a), world.cy + rr * Math.sin(a), (1 + (i % 3) * 0.5) * u, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const sun = ctx.createRadialGradient(world.cx, world.cy, 0, world.cx, world.cy, 70 * u);
  sun.addColorStop(0, '#fff6d5'); sun.addColorStop(0.45, '#f2c96b'); sun.addColorStop(1, 'rgba(242,201,107,0)');
  ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(world.cx, world.cy, 70 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#2a1f05'; ctx.font = `700 ${Math.max(10, 12 * u)}px system-ui`; ctx.textAlign = 'center'; ctx.fillText('The Frontier', world.cx, world.cy + 4);

  const meXY = g.me && g.phase !== 'setup' ? world.player : null;
  if (meXY) {
    ctx.strokeStyle = 'rgba(242,201,107,.7)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5;
    for (const k of g.coalition) if (k !== g.me) { const q = world.pos[k]; ctx.beginPath(); ctx.moveTo(meXY.x, meXY.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    ctx.setLineDash([]); ctx.lineWidth = 1;
  }
  for (const p of P.planets) {
    if (meXY && p.k === g.me) continue;
    drawPlanet(ctx, p, world.pos[p.k], { ally: g.coalition.includes(p.k), near: g.near === p.k });
  }
  if (meXY) {
    const pl = world.player, p = planet(g.me);
    pl.trail.forEach((q, i) => { ctx.globalAlpha = i / pl.trail.length * 0.35; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(q.x, q.y, pr(g.me) * (i / pl.trail.length) * 0.7, 0, 7); ctx.fill(); });
    ctx.globalAlpha = 1;
    const glow = ctx.createRadialGradient(pl.x, pl.y, 0, pl.x, pl.y, pr(g.me) * 2.2);
    glow.addColorStop(0, 'rgba(242,201,107,.35)'); glow.addColorStop(1, 'rgba(242,201,107,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(pl.x, pl.y, pr(g.me) * 2.2, 0, 7); ctx.fill();
    drawPlanet(ctx, p, pl, { me: true });
  }
  const prm = $('#prompt');
  if (g.phase === 'fly' && g.near) {
    const q = world.pos[g.near]; prm.hidden = false;
    prm.style.left = `${q.x}px`; prm.style.top = `${q.y - pr(g.near) - 8}px`;
    prm.textContent = g.coalition.includes(g.near) ? `${planet(g.near).name} · ally` : g.asked.has(g.near) ? `${planet(g.near).name} · asked` : `Space · talk to ${planet(g.near).name}`;
  } else prm.hidden = true;
}
function drawPlanet(ctx, p, q, o) {
  const r = pr(p.k), u = world.u;
  const grd = ctx.createRadialGradient(q.x - r * 0.35, q.y - r * 0.35, r * 0.1, q.x, q.y, r);
  grd.addColorStop(0, 'rgba(255,255,255,.75)'); grd.addColorStop(0.3, p.color); grd.addColorStop(1, '#05060c');
  ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 7); ctx.fill();
  if (o.ally || o.me) { ctx.strokeStyle = '#f2c96b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(q.x, q.y, r + 4, 0, 7); ctx.stroke(); ctx.lineWidth = 1; }
  if (o.near) { ctx.strokeStyle = '#8fc7ff'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(q.x, q.y, r + 8, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
  ctx.textAlign = 'center';
  ctx.fillStyle = o.me ? '#f2c96b' : '#eef0fb'; ctx.font = `${o.me ? 700 : 600} ${Math.max(10, 12 * u)}px system-ui`;
  ctx.fillText(o.me ? `${p.name} (you)` : p.name, q.x, q.y + r + 13 * Math.max(1, u));
  ctx.fillStyle = '#9ea5c4'; ctx.font = `${Math.max(9, 10 * u)}px system-ui`;
  ctx.fillText(country(p.k), q.x, q.y + r + 25 * Math.max(1, u));
}

let last = 0;
function loop(t) {
  const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
  step(dt); draw(t);
  if (g.phase !== 'setup' && (hudTick++ % 6 === 0)) renderHud();
  requestAnimationFrame(loop);
}

// ---------- Input ----------
function wire() {
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    keys[k] = true;
    if (g.phase === 'fly' && (k === ' ' || k === 'Enter') && g.near) openTalk(g.near);
    else if (g.phase === 'fly' && k === 'n') { g.timeLeft = 0; }
    else if (g.phase === 'council' && /^[1-4]$/.test(k)) pickMove(Number(k) - 1);
  });
  window.addEventListener('keyup', (e) => { keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false; });
  $('#world').addEventListener('pointerdown', (e) => { if (g.phase === 'fly') world.aim = { x: e.clientX, y: e.clientY }; });
  $('#panel').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.k) { g.me = b.dataset.k; renderSetup(); }
    else if (b.dataset.id) { const id = b.dataset.id; g.goals = g.goals.includes(id) ? g.goals.filter((x) => x !== id) : g.goals.length < MAX_GOALS ? [...g.goals, id] : g.goals; renderSetup(); }
    else if (b.dataset.era) { g.era = P.eras.find((x) => x.id === b.dataset.era); renderSetup(); }
    else if (b.id === 'start') start();
    else if (b.dataset.move) pickMove(Number(b.dataset.move));
    else if (b.id === 'again') location.reload();
  });
}

Promise.all(['../data/layers.json', '../data/conditions.json', '../data/windows.json', 'planets.json'].map((u) => fetch(u).then((r) => r.json())))
  .then(([l, c, w, p]) => {
    L = l; C = c; W = w; P = p;
    g.era = P.eras.find((e) => e.id === 'today');
    resize(); wire(); step(0); renderSetup(); requestAnimationFrame(loop);
  })
  .catch((err) => { document.body.innerHTML = `<p style="padding:20px">Could not load game data: ${esc(err.message)}. Serve the repository folder over HTTP.</p>`; });
