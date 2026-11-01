// Orbit Accord: fly your delegation around the world map, meet other countries, build an accord before the laws close.
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
const GOAL_POINTS = 400;

let L, C, W, P, W2, G;   // G: data/geopolitics.json (sourced recent foreign policy)
const g = {
  phase: 'setup', me: null, goals: [], era: null,
  turn: 0, timeLeft: MONTH_SECONDS, coalition: [], tokens: {}, bonus: {}, tabled: [], choke: null,
  shield: {}, tour: false, asked: new Set(), penalty: 0, near: null, history: [],
};
const keys = {};
const world = { w: 0, h: 0, k: 1, u: 1, dpr: 1, mw: 0, mh: 0, pos: {}, real: {}, out: {}, paths: {}, map: null, cam: { x: 0, y: 0 }, player: { x: 0, y: 0, vx: 0, vy: 0, trail: [] }, aim: null };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const planet = (k) => P.planets.find((p) => p.k === k);
const country = (k) => L.countries.find((c) => c.k === k)?.name ?? k;
const say = (p) => p.say ?? p.name, Say = (p) => say(p)[0].toUpperCase() + say(p).slice(1);   // "the Netherlands" mid-sentence
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

// ---------- Geopolitics: real relations shape how countries receive you ----------
// Each game country group maps to the real governments in data/geopolitics.json.
const MEMBERS = { US: ['US'], CN: ['CN'], JP: ['JP'], TW: ['TW'], KR: ['KR'], NL: ['NL'], DE: ['DE'], UK: ['UK'], GULF: ['SA', 'AE', 'QA'], AUCA: ['AU', 'CA'], PROD: ['CD', 'ID', 'CL', 'PE'] };
const POLE = { US: 'toUS', CN: 'toChina', EU: 'toEU' };
const pairOf = (a, b) => G.pairs.find((p) => (p.a === a && p.b === b) || (p.a === b && p.b === a));
function aff(a, b) {
  if (a === b) return 2;
  const p = pairOf(a, b); if (p) return p.score;
  const A = G.countries[a], B = G.countries[b];
  if (POLE[b] && A) return A[POLE[b]];
  if (POLE[a] && B) return B[POLE[a]];
  if (G.euMembers?.includes(a) && G.euMembers.includes(b)) return 1;   // shared EU membership
  return 0;   // no sourced relation: neutral, never guessed from similar stances
}
// Group-to-group affinity (-2..2) and the strongest real pair behind it, for the explanation.
function gaff(x, y) {
  let sum = 0, n = 0, best = null;
  for (const a of MEMBERS[x]) for (const b of MEMBERS[y]) {
    const v = aff(a, b); sum += v; n++;
    const p = pairOf(a, b);
    if (p && (!best || Math.abs(p.score) > Math.abs(best.score))) best = p;
  }
  return { v: n ? sum / n : 0, pair: best };
}
// Trust starts from real relations with you, then moves with who you allied with and gave to.
function trust(t) {
  const base = gaff(t, g.me);
  let v = base.v, top = { w: base.v, kind: 'base', pair: base.pair };
  for (const h of g.history) {
    if (h.k === t) continue;
    const r = gaff(t, h.k), w = r.v * (h.kind === 'ally' ? 0.6 : 0.3);
    v += w;
    if (Math.abs(w) > Math.abs(top.w) * 0.9 && Math.abs(w) >= 0.3) top = { w, kind: h.kind, k: h.k, pair: r.pair };
  }
  return { v: Math.max(-3, Math.min(3, v)), top };
}
const trustPts = (t) => Math.round(trust(t).v * 7);
function moodText(t) {
  const { v, top } = trust(t), p = planet(t);
  const why = top.pair?.why ? ` ${top.pair.why}` : '';
  if (top.kind === 'base') return v >= 0.5 ? `Our governments are close.${why}` : v <= -0.5 ? `Our governments are at odds.${why}` : '';
  const other = planet(top.k);
  return top.w > 0 ? `You stood with ${say(other)}. We are close to them.${why}` : `You sided with ${say(other)}. ${Say(p)} sees them as a rival.${why}`;
}

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
  v += trustPts(t);
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
  if (ok) { if (offer.token) { g.tokens[offer.token]--; g.history.push({ k: t, kind: 'gift', turn: g.turn }); } g.coalition.push(t); g.history.push({ k: t, kind: 'ally', turn: g.turn }); }
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
  moves.push({ id: 'rally', ic: '📣', t: 'Rally support at home', s: 'Free. Every country +5% to accept this month.', run: () => { g.rally = true; toast('Your people back the accord.', 'good'); } });
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
    if (g.shield.CN) lines.push('⛏️ China squeezes refined metals. Your stockpiles hold.');
    else if (refining >= 10) lines.push(`⛏️ China squeezes refined metals. Your accord refines ${Math.round(refining)}% and copes.`);
    else { const p = richest(); if (p) g.tokens[p]--; else g.penalty += 40; lines.push(`⛏️ China (70% of refining) squeezes metals: ${p ? `−1 ${icon(p)}` : '−40 points'}.`); }
  }
  if (g.turn === 3 && !g.coalition.includes('US')) {
    const allies = g.coalition.filter((k) => k !== g.me && !planet(k).super).sort((a, b) => weighted([a], false) - weighted([b], false));
    if (allies.length) {
      const a = allies[0], give = needs(a).find((p) => (g.tokens[p] ?? 0) > 0);
      if (g.shield.US) lines.push(`🛰️ The United States leans on ${planet(a).name}; your stockpiles reassure it.`);
      else if (give) { g.tokens[give]--; lines.push(`🛰️ The United States leans on ${planet(a).name}. You keep it with ${icon(give)}.`); }
      else { g.coalition = g.coalition.filter((k) => k !== a); lines.push(`🛰️ The United States leans on ${planet(a).name}. It leaves your accord.`); }
    }
  }
  // Realistic reactions to last month's new allies, then one real dated headline involving you or your partners.
  const fresh = g.history.filter((h) => h.kind === 'ally' && h.turn === g.turn - 1);
  const reacts = [];
  for (const h of fresh) for (const p of P.planets) {
    if (p.k === g.me || g.coalition.includes(p.k)) continue;
    const r = gaff(p.k, h.k);
    if (r.v <= -1) reacts.push({ v: r.v, line: `🥶 ${Say(p)} cools on you: you allied with ${say(planet(h.k))}.${r.pair?.why ? ` (${r.pair.why})` : ''}` });
    else if (r.v >= 1.5) reacts.push({ v: r.v, line: `😊 ${Say(p)} warms to you: you allied with ${say(planet(h.k))}.` });
  }
  reacts.sort((a, b) => Math.abs(b.v) - Math.abs(a.v)).slice(0, 2).forEach((x) => lines.push(x.line));
  const mine = new Set([g.me, ...g.coalition].flatMap((k) => MEMBERS[k]));
  const news = G.events.filter((e) => e.countries.some((c) => mine.has(c))).sort((a, b) => b.date.localeCompare(a.date));
  if (news.length) { const e = news[g.turn % news.length]; lines.push({ news: e }); }
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
    <h2>${MONTHS[g.turn]} · Cabinet of ${esc(planet(g.me).name)}</h2>
    <p class="lede">Choose one move this month. Then fly out and meet other countries.</p>
    ${ev.map((l) => l.news ? `<div class="event news"><b>📰 Real news · ${esc(l.news.date)}</b> ${esc(l.news.headline)} ${/^https:\/\//.test(l.news.url) ? `<a href="${esc(l.news.url)}" target="_blank" rel="noopener">source ↗</a>` : ''}</div>` : `<div class="event">${esc(l)}</div>`).join('')}
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
// ---------- Meeting: anime diplomats talk, you pick a leverage point, the government answers by letter (meeting.js) ----------
function openTalk(t) {
  g.phase = 'talk';
  const p = planet(t), me = planet(g.me), inAcc = g.coalition.includes(t), asked = g.asked.has(t);
  const tops = L.stages.filter((st) => (st.share[t] ?? 0) >= 15).sort((a, b) => b.share[t] - a.share[t]).slice(0, 2);
  const ds = inAcc || asked ? [] : deals(t);
  const goal = goalOf(g.goals[0]), need = needs(t);
  const withThem = pct(weighted([...g.coalition, t])), now = pct(weighted(g.coalition));
  const actor = (q) => ({ k: q.k, name: q.name, say: say(q), flags: allFlags(q), title: q.title, color: q.color, envoy: CAST[q.k].name });
  const facts = [`${esc(p.name)}: <b>${pct(weighted([t], false))}</b> of AI supply`,
    ...tops.map((st) => `${esc(st.name)} <b>${Math.round(st.share[t])}%</b>`),
    `Needs ${need.map(icon).join(' ') || '—'}`, `Your accord <b>${now}</b> → with them <b>${withThem}</b>`];
  const tp = trustPts(t), mt = moodText(t);
  if (tp) facts.push(`Mood ${tp > 0 ? '😊 warm' : '🥶 cold'} <b>${tp > 0 ? '+' : '−'}${Math.abs(tp)}%</b>`);
  const script = [];
  if (inAcc) script.push({ who: 'them', mood: 'happy', pop: '♪', text: `Partner! We stand with your accord. Go win the others.` });
  else if (asked) script.push({ who: 'them', mood: 'flat', pop: '…', text: 'We already gave you our answer this month. Come back next month, envoy.' });
  else {
    script.push({ who: 'them', mood: p.super ? 'flat' : 'happy', text: p.super
      ? `${Say(p)} carries ${pct(weighted([t], false))} of the world's AI. Speak quickly, envoy from ${me.name}.`
      : `Welcome to ${say(p)}.${tops[0] ? ` We make ${Math.round(tops[0].share[t])}% of the world's ${tops[0].name}.` : ''} What brings you here?` });
    if (mt) script.push({ who: 'them', mood: tp >= 0 ? 'happy' : 'sad', pop: tp >= 0 ? '♪' : '…', text: mt });
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
    ask: `How do you persuade ${say(p)}? Pick your leverage (1–${ds.length}).`,
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
        { who: 'them', mood: 'flat', pop: '✉', text: `Offer logged. My government will deliberate. Its answer comes by official letter, not from me.` },
      ];
    },
    get letter() {
      if (!this.result) return null;
      const d = this.chosen, ok = this.result.ok;
      return {
        body: ok
          ? [`On your proposal for <b>${esc(goal.short.toLowerCase())}</b>: ${esc(Say(p))} <b>will join your accord</b>.`,
             `Together our countries now hold <b>${pct(weighted(g.coalition))}</b> of the AI supply chain. ${d.label === 'Just ask' ? 'You asked plainly, and we respect that.' : `Your offer (${d.label.replace(/^(Offer|Promise) /, '')}) answered what we needed.`}`]
          : [`On your proposal for <b>${esc(goal.short.toLowerCase())}</b>: ${esc(Say(p))} <b>will not join</b> for now.`,
             p.super ? 'A superpower gives up freedom of action slowly. Bring a stronger accord, or stronger leverage.' : 'Your offer did not yet outweigh our own interests. Our door stays open next month.'],
        foot: `Chance was ${this.result.pct}%. Odds are illustrative game rules; AI shares from gszep's model.`,
      };
    },
    onClose: (res) => {
      g.phase = 'fly';
      if (res) toast(res.ok ? `${Say(p)} joined your accord! (${res.pct}%)` : `${Say(p)} said no (${res.pct}%). Try next month.`, res.ok ? 'good' : 'bad');
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
  const rank = ratio >= 0.9 ? 'Architect of the Accord' : ratio >= 0.65 ? 'Trusted Broker' : ratio >= 0.4 ? 'Hopeful Envoy' : 'Lone Voice';
  showOverlay(`
    <div class="foot" style="margin-top:0"><div><h2>The eight months are over</h2><div class="muted">${rank}</div></div><div class="score">${score}</div></div>
    <p class="small">${parts.map(([k, v]) => `${esc(k)} <b>${v}</b>`).join(' · ')}</p>
    <p class="small muted">Accord: ${g.coalition.map((k) => `${esc(planet(k).name)}`).join(', ')}</p>
    <div class="dgrid">${res.map(({ goal, pr }) => `<div class="dcard"><h3>${esc(goal.short)} · ${Math.round(pr.achieved * 100)}%</h3><dl>
      <dt>Risk</dt><dd>${esc(goal.risk_s)}</dd><dt>Route</dt><dd>${esc(goal.route_s)}</dd><dt>Needs</dt><dd>${esc(goal.consent_s)}</dd><dt>Gap</dt><dd>${esc(goal.gap_s)}</dd>
      <dt>Law</dt><dd>${pr.law.length ? esc(pr.law[0].who) : 'none (capped 75%)'}</dd></dl></div>`).join('')}</div>
    <p class="limits">Not proof of real-world impact. AI shares: <a href="${L._meta.source_url}" target="_blank" rel="noopener">gszep's model</a> (rough). Tokens, odds and move effects are illustrative game rules. Law dates are openings, not plans. <a href="../index.html#about">Full limits</a> · Built with Claude.</p>
    <div class="foot"><span></span><button class="btn" id="again">Play again</button></div>`);
}

// Flags (flag-icons, MIT): a country group shows every member's flag; badges on the map show one per location.
const allFlags = (p) => [...p.flags, ...(p.outpostFlags ?? []).flat()];
const flagsHTML = (p, cls = 'flags') => `<span class="${cls}">${allFlags(p).map((c) => `<img src="flags/${c}.svg" alt="">`).join('')}</span>`;
const FLAG = {};
const flagImg = (c) => FLAG[c] ?? (FLAG[c] = Object.assign(new Image(), { src: `flags/${c}.svg` }));

// ---------- Opening: a trigger event, then pick a middle power and one goal (opening.js) ----------
const GOAL_ICON = { test: '🧪', incident: '🚨', weights: '🔐', continuity: '🏥', chips: '🔎', offswitch: '⏻' };
const lowerFirst = (t) => t.replace(/^([A-Z])([a-z])/, (m, a, b) => a.toLowerCase() + b);
function topFact(k) {
  const st = L.stages.filter((x) => (x.share[k] ?? 0) > 0).sort((a, b) => b.share[k] - a.share[k])[0];
  return st ? `We hold ${pct(st.share[k])} of the world's ${lowerFirst(st.name)}` : 'We hold a piece of the AI supply chain';
}
function openIntro() {
  Opening.start({
    countries: P.planets.filter((p) => !p.super).map((p) => ({ k: p.k, name: p.name, flags: flagsHTML(p), fact: topFact(p.k) })),
    goals: P.goals.map((x) => ({ ...x, icon: GOAL_ICON[x.id] ?? '★' })),
    onCountry: (k) => { g.me = k; },
    onGoal: (id) => { g.goals = [id]; },
    hasCountry: () => !!g.me, hasGoal: () => g.goals.length > 0,
    onDone: start,
  });
}
function start() {
  if (!g.me || !g.goals.length) return;
  g.coalition = [g.me]; g.tokens = { ...planet(g.me).powers };
  const pp = world.real[g.me] ?? world.pos[g.me];
  Object.assign(world.player, { x: pp.x, y: pp.y + 14 * world.u, vx: 0, vy: 0, trail: [], hd: -Math.PI / 2 });
  world.player.lon = world.player.x / world.k + LON0; world.player.lat = LAT1 - world.player.y / world.k;
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
  $('#h-me').innerHTML = `<div class="nm">${flagsHTML(p, 'flags sm')} ${esc(p.name)}</div>
    <div class="sub">AI that depends on you</div><div class="big">${pct(weighted([g.me]))}</div>
    <div class="sub">You depend on: ${dep.map((d) => `${esc(d.st.name)} ← ${esc(planet(d.top)?.name ?? country(d.top))} ${Math.round(d.v)}%`).join('; ')}</div>
    <div class="toks">${Object.entries(g.tokens).map(([k, n]) => `<span class="tok" title="${pname(k)}">${icon(k)} ${n}</span>`).join('')}</div>`;
}

// ---------- World map (Natural Earth 1:110m, equirectangular; the camera follows your delegation's jet) ----------
const LON0 = -178, LON1 = 205, LAT0 = -56, LAT1 = 80;   // margins so the camera can centre on any country
function resize() {
  const c = $('#world');
  world.dpr = Math.min(2, window.devicePixelRatio || 1);
  world.w = window.innerWidth; world.h = window.innerHeight;
  c.width = world.w * world.dpr; c.height = world.h * world.dpr;
  world.k = world.w < 760   // phones see more of the world at once
    ? Math.max(world.w / (LON1 - LON0) * 2.2, world.h / (LAT1 - LAT0) * 0.8, 3.2)
    : Math.max(world.w / (LON1 - LON0) * 1.45, world.h / (LAT1 - LAT0) * 1.1, 3.2);
  world.u = Math.max(0.75, Math.min(1.3, world.k / 6));
  world.mw = (LON1 - LON0) * world.k; world.mh = (LAT1 - LAT0) * world.k;
  for (const p of P.planets) {
    world.pos[p.k] = xy(p.at);
    world.real[p.k] = p.real ? xy(p.real) : null;
    world.out[p.k] = (p.outposts ?? []).map(xy);
  }
  if (world.player.lon != null) Object.assign(world.player, xy([world.player.lon, world.player.lat]));
  bakeMap();
}
const xy = ([lon, lat]) => ({ x: (lon - LON0) * world.k, y: (LAT1 - lat) * world.k });
const pr = (k) => (11 + Math.sqrt(weighted([k], false)) * 1.5) * world.u;

function bakeMap() {
  const k = world.k, s = world.dpr;
  const cv = document.createElement('canvas'); cv.width = world.mw * s; cv.height = world.mh * s;
  const ctx = cv.getContext('2d'); ctx.scale(s, s);
  const sea = ctx.createLinearGradient(0, 0, 0, world.mh);
  sea.addColorStop(0, '#0b1a36'); sea.addColorStop(0.5, '#0f2547'); sea.addColorStop(1, '#0a1730');
  ctx.fillStyle = sea; ctx.fillRect(0, 0, world.mw, world.mh);
  ctx.strokeStyle = 'rgba(143,199,255,.08)'; ctx.lineWidth = 1;
  for (let lon = -165; lon <= LON1; lon += 15) { const x = (lon - LON0) * k; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, world.mh); ctx.stroke(); }
  for (let lat = -45; lat <= LAT1; lat += 15) { const y = (LAT1 - lat) * k; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(world.mw, y); ctx.stroke(); }
  world.paths = {};
  for (const c of W2.countries) {
    const path = new Path2D();
    for (const r of c.r) {
      let prev = null;
      for (let i = 0; i < r.length; i += 2) {
        let lon = r[i];
        if (prev != null && Math.abs(lon - prev) > 180) lon += lon < prev ? 360 : -360;   // keep rings that cross the date line whole
        prev = lon;
        const x = (lon - LON0) * k, y = (LAT1 - r[i + 1]) * k;
        i ? path.lineTo(x, y) : path.moveTo(x, y);
      }
      path.closePath();
    }
    const col = c.g ? planet(c.g).color : null;
    ctx.fillStyle = col ? col + 'b0' : '#22304d'; ctx.fill(path);
    ctx.strokeStyle = col ? '#ffffffaa' : '#33476d'; ctx.lineWidth = col ? 1.2 : 0.7; ctx.stroke(path);
    if (c.g) { const gp = world.paths[c.g] ?? new Path2D(); gp.addPath(path); world.paths[c.g] = gp; }
  }
  world.map = cv;
}

function step(dt) {
  if (g.phase !== 'fly') return;
  const pl = world.player, k = world.k, acc = 150 * k, max = 42 * k;
  let ax = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0);
  let ay = (keys.ArrowDown || keys.s ? 1 : 0) - (keys.ArrowUp || keys.w ? 1 : 0);
  if (!ax && !ay && world.aim) { const dx = world.aim.x - pl.x, dy = world.aim.y - pl.y, d = Math.hypot(dx, dy); if (d > 6) { ax = dx / d; ay = dy / d; } else world.aim = null; }
  const n = Math.hypot(ax, ay) || 1;
  pl.vx += (ax / n) * acc * dt; pl.vy += (ay / n) * acc * dt;
  pl.vx *= 1 - Math.min(1, 2.6 * dt); pl.vy *= 1 - Math.min(1, 2.6 * dt);
  const sp = Math.hypot(pl.vx, pl.vy); if (sp > max) { pl.vx *= max / sp; pl.vy *= max / sp; }
  if (sp > 8) pl.hd = Math.atan2(pl.vy, pl.vx);
  pl.x = Math.max(10, Math.min(world.mw - 10, pl.x + pl.vx * dt)); pl.y = Math.max(10, Math.min(world.mh - 10, pl.y + pl.vy * dt));
  pl.lon = pl.x / k + LON0; pl.lat = LAT1 - pl.y / k;
  pl.trail.push({ x: pl.x, y: pl.y }); if (pl.trail.length > 40) pl.trail.shift();
  g.near = null; let best = Infinity;
  for (const p of P.planets) {
    if (p.k === g.me) continue;
    for (const q of [world.pos[p.k], ...world.out[p.k]]) {
      const d = Math.hypot(q.x - pl.x, q.y - pl.y);
      if (d < pr(p.k) + 40 * world.u && d < best) { best = d; g.near = p.k; }
    }
  }
  g.timeLeft -= dt;
  if (g.timeLeft <= 0) { g.timeLeft = 0; endMonth(); }
}

function camera() {
  const f = g.me && g.phase !== 'setup' ? world.player : xy([10, 25]);
  const cx = world.mw <= world.w ? (world.mw - world.w) / 2 : Math.max(0, Math.min(world.mw - world.w, f.x - world.w / 2));
  const cy = world.mh <= world.h ? (world.mh - world.h) / 2 : Math.max(0, Math.min(world.mh - world.h, f.y - world.h / 2));
  world.cam.x += (cx - world.cam.x) * (world.camSet ? 0.12 : 1); world.cam.y += (cy - world.cam.y) * (world.camSet ? 0.12 : 1);
  world.camSet = true;
}

function draw(t) {
  const ctx = $('#world').getContext('2d'), u = world.u;
  camera();
  ctx.setTransform(world.dpr, 0, 0, world.dpr, 0, 0);
  ctx.fillStyle = '#070d1d'; ctx.fillRect(0, 0, world.w, world.h);
  ctx.translate(-world.cam.x, -world.cam.y);
  ctx.drawImage(world.map, 0, 0, world.mw, world.mh);

  // Accord members glow gold; the country in range pulses blue.
  ctx.lineJoin = 'round';
  for (const k of g.coalition) if (world.paths[k]) {
    ctx.shadowColor = '#f2c96b'; ctx.shadowBlur = 12; ctx.strokeStyle = '#f2c96b'; ctx.lineWidth = 2.2; ctx.stroke(world.paths[k]);
  }
  ctx.shadowBlur = 0;
  if (g.phase === 'fly' && g.near && world.paths[g.near]) {
    ctx.strokeStyle = `rgba(143,199,255,${0.55 + 0.45 * Math.sin(t / 180)})`; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke(world.paths[g.near]); ctx.setLineDash([]);
  }

  const meXY = g.me && g.phase !== 'setup' ? world.player : null;
  if (meXY) {
    ctx.strokeStyle = 'rgba(242,201,107,.75)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.6; ctx.lineDashOffset = -t / 60;
    for (const k of g.coalition) if (k !== g.me) arc(ctx, meXY, world.pos[k]);
    ctx.setLineDash([]); ctx.lineDashOffset = 0; ctx.lineWidth = 1;
  }
  for (const p of P.planets) drawBadge(ctx, p, { ally: g.coalition.includes(p.k), near: g.near === p.k, home: p.k === g.me && !!meXY });
  if (meXY) drawJet(ctx, world.player, planet(g.me), t);

  const prm = $('#prompt');
  if (g.phase === 'fly' && g.near) {
    const q = world.pos[g.near]; prm.hidden = false;
    prm.style.left = `${q.x - world.cam.x}px`; prm.style.top = `${q.y - world.cam.y - pr(g.near) - 8}px`;
    prm.textContent = g.coalition.includes(g.near) ? `${planet(g.near).name} · ally` : g.asked.has(g.near) ? `${planet(g.near).name} · asked` : `Meet ${planet(g.near).name}`;
  } else prm.hidden = true;
  const mb = $('#t-meet'), label = g.phase === 'fly' && g.near ? `Meet ${planet(g.near).name}` : '';
  if (mb.dataset.label !== label) { mb.dataset.label = label; mb.hidden = !label; mb.textContent = label; }
}
function arc(ctx, a, b) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.18;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y); ctx.stroke();
}
function drawBadge(ctx, p, o) {
  const r = pr(p.k), u = world.u, q = world.pos[p.k], real = world.real[p.k];
  ctx.strokeStyle = '#ffffff70'; ctx.lineWidth = 1;
  if (real) { ctx.beginPath(); ctx.moveTo(real.x, real.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(real.x, real.y, 2.2, 0, 7); ctx.fill(); }
  world.out[p.k].forEach((s, i) => flagDisc(ctx, p.outpostFlags?.[i] ?? p.flags, s.x, s.y, r * 0.7, o.ally ? '#f2c96b' : '#ffffffcc', o.ally ? 2 : 1.2));
  flagDisc(ctx, p.flags, q.x, q.y, r, o.ally || o.home ? '#f2c96b' : '#ffffffdd', o.ally || o.home ? 2.6 : 1.4);
  if (o.near) { ctx.strokeStyle = '#8fc7ff'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(q.x, q.y, r + 6, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
  ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = '#070d1dd0';
  ctx.font = `${o.home ? 700 : 600} ${Math.round(12 * u)}px system-ui`; ctx.fillStyle = o.home ? '#f2c96b' : '#eef0fb';
  const label = o.home ? `${p.name} (home)` : p.name, ly = q.y + r + 13 * u;
  ctx.strokeText(label, q.x, ly); ctx.fillText(label, q.x, ly);
  ctx.font = `${Math.round(10 * u)}px system-ui`; ctx.fillStyle = '#b6bfdc';
  const sub = `${pct(weighted([p.k], false))} of AI supply`;
  ctx.strokeText(sub, q.x, ly + 12 * u); ctx.fillText(sub, q.x, ly + 12 * u);
}
// A flag clipped to a circle; two codes split it in half (e.g. the Gulf states).
function flagDisc(ctx, codes, x, y, r, ring, lw) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
  ctx.fillStyle = '#0a0e1c'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  codes.forEach((c, i) => {
    const img = flagImg(c), w = 2 * r / codes.length, sx = x - r + i * w, fh = 2 * r, fw = fh * 4 / 3;
    if (!img.complete || !img.naturalWidth) return;
    ctx.save(); ctx.beginPath(); ctx.rect(sx, y - r, w, 2 * r); ctx.clip();
    ctx.drawImage(img, sx + (w - fw) / 2, y - r, fw, fh); ctx.restore();
  });
  const shine = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
  shine.addColorStop(0, '#ffffff55'); shine.addColorStop(0.6, '#ffffff00'); shine.addColorStop(1, '#00000055');
  ctx.fillStyle = shine; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.restore();
  ctx.strokeStyle = ring; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.lineWidth = 1;
}
function drawJet(ctx, pl, p, t) {
  pl.trail.forEach((q, i) => { ctx.globalAlpha = (i / pl.trail.length) * 0.5; ctx.fillStyle = '#e8f0ff'; ctx.beginPath(); ctx.arc(q.x, q.y, 1.6 * world.u, 0, 7); ctx.fill(); });
  ctx.globalAlpha = 1;
  const s = 1.25 * world.u, bob = Math.sin(t / 300) * 1.5;
  ctx.save(); ctx.translate(pl.x, pl.y + bob); ctx.rotate(pl.hd ?? -Math.PI / 2);
  ctx.shadowColor = '#f2c96b'; ctx.shadowBlur = 14;
  ctx.fillStyle = '#f7f4ea'; ctx.strokeStyle = '#1b1606'; ctx.lineWidth = 1.2;
  ctx.beginPath();   // nose points along +x
  ctx.moveTo(14 * s, 0); ctx.lineTo(6 * s, -2 * s); ctx.lineTo(1 * s, -12 * s); ctx.lineTo(-3 * s, -12 * s); ctx.lineTo(-1 * s, -2.5 * s);
  ctx.lineTo(-9 * s, -2.5 * s); ctx.lineTo(-12 * s, -6 * s); ctx.lineTo(-14 * s, -6 * s); ctx.lineTo(-12 * s, 0);
  ctx.lineTo(-14 * s, 6 * s); ctx.lineTo(-12 * s, 6 * s); ctx.lineTo(-9 * s, 2.5 * s); ctx.lineTo(-1 * s, 2.5 * s);
  ctx.lineTo(-3 * s, 12 * s); ctx.lineTo(1 * s, 12 * s); ctx.lineTo(6 * s, 2 * s); ctx.closePath();
  ctx.fill(); ctx.shadowBlur = 0; ctx.stroke();
  ctx.fillStyle = p.color; ctx.fillRect(-12 * s, -1.2 * s, 18 * s, 2.4 * s);
  ctx.restore();
  ctx.textAlign = 'center'; ctx.font = `700 ${Math.round(11 * world.u)}px system-ui`; ctx.lineWidth = 3; ctx.strokeStyle = '#070d1dd0'; ctx.fillStyle = '#f2c96b';
  ctx.strokeText('Your delegation', pl.x, pl.y - 20 * world.u); ctx.fillText('Your delegation', pl.x, pl.y - 20 * world.u);
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
  $('#world').addEventListener('pointerdown', (e) => { if (g.phase === 'fly') world.aim = { x: e.clientX + world.cam.x, y: e.clientY + world.cam.y }; });
  // Touch and mouse controls: the meet prompt and buttons do what Space and N do.
  const meet = () => { if (g.phase === 'fly' && g.near) openTalk(g.near); };
  $('#prompt').addEventListener('click', meet);
  $('#t-meet').addEventListener('click', meet);
  $('#t-end').addEventListener('click', () => { if (g.phase === 'fly') g.timeLeft = 0; });
  $('#t-info').addEventListener('click', () => $('#hud').classList.toggle('details'));
  $('#panel').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.move) pickMove(Number(b.dataset.move));
    else if (b.id === 'again') location.reload();
  });
}

Promise.all(['../data/layers.json', '../data/conditions.json', '../data/windows.json', 'planets.json', 'world.json', '../data/geopolitics.json'].map((u) => fetch(u).then((r) => r.json())))
  .then(([l, c, w, p, m, geo]) => {
    L = l; C = c; W = w; P = p; W2 = m; G = geo;
    g.era = P.eras.find((e) => e.id === 'today');
    resize(); wire(); $('#overlay').hidden = true; openIntro(); requestAnimationFrame(loop);
  })
  .catch((err) => { document.body.innerHTML = `<p style="padding:20px">Could not load game data: ${esc(err.message)}. Serve the repository folder over HTTP.</p>`; });
