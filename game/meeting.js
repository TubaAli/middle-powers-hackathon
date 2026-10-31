// Meeting scene: mecha-alien envoys talk, you pick a leverage point, and the court answers by letter.
// Envoys are original SVG mecha drawings (anime robot style), animated with CSS.
// game.js supplies all numbers; this file only stages them.

// armor: main plate, trim: secondary plate, glow: eyes/core light.
// eyes: twin | mono | tri; crest: vfin | horns | blade | antenna | crown | fins; head: angular | round | tall
const CAST = {
  US:   { name: 'Regent-Unit TITAN-01',   armor: '#e9edf5', trim: '#2a4f9a', glow: '#58e1ff', eyes: 'twin', crest: 'vfin',    head: 'angular' },
  CN:   { name: 'Steward-Frame MAGNOR-K', armor: '#9e2f3c', trim: '#2b2b33', glow: '#ffd25a', eyes: 'mono', crest: 'blade',   head: 'round' },
  JP:   { name: 'Envoy KAIGEN Mk-II',     armor: '#f3efe4', trim: '#c23a3a', glow: '#7cf7c8', eyes: 'twin', crest: 'crown',   head: 'tall' },
  TW:   { name: 'Warden FABRION-7',       armor: '#2f8f78', trim: '#e6efe9', glow: '#a8fff0', eyes: 'tri',  crest: 'antenna', head: 'angular' },
  KR:   { name: 'Archive-Unit MNEMOS',    armor: '#5b4aa8', trim: '#d9d2ff', glow: '#ff7ae0', eyes: 'twin', crest: 'fins',    head: 'round' },
  NL:   { name: 'Lens-Frame LITHOS',      armor: '#f08a3c', trim: '#24324a', glow: '#8fd8ff', eyes: 'mono', crest: 'antenna', head: 'tall' },
  DE:   { name: 'Forge-Unit FERRUM-9',    armor: '#7d8794', trim: '#2b2f36', glow: '#ffb347', eyes: 'twin', crest: 'horns',   head: 'angular' },
  UK:   { name: 'Crown-Frame ALBION',     armor: '#1f3f6e', trim: '#e3c46b', glow: '#9cf0ff', eyes: 'tri',  crest: 'crown',   head: 'round' },
  GULF: { name: 'Sun-Emir SOLARA',        armor: '#efe0b0', trim: '#b8862e', glow: '#ff9b3d', eyes: 'twin', crest: 'fins',    head: 'tall' },
  AUCA: { name: 'Twin-Core BOREAL',       armor: '#4f8a52', trim: '#e8d9a8', glow: '#c6ff6a', eyes: 'mono', crest: 'horns',   head: 'round' },
  PROD: { name: 'Belt-Council ORE-X',     armor: '#8a5a3c', trim: '#2f2620', glow: '#ff6a3d', eyes: 'tri',  crest: 'blade',   head: 'angular' },
};

const HEADS = {
  angular: 'M150 62 L196 80 L214 138 L206 196 L184 232 L150 246 L116 232 L94 196 L86 138 L104 80 Z',
  round: 'M150 64 C192 64 214 100 214 148 C214 198 192 236 150 246 C108 236 86 198 86 148 C86 100 108 64 150 64 Z',
  tall: 'M150 48 L192 72 L208 148 L198 206 L176 238 L150 248 L124 238 L102 206 L92 148 L108 72 Z',
};
const CRESTS = {
  vfin: (c) => `<path d="M150 112 L84 34 L98 30 L150 94 L202 30 L216 34 Z" fill="#f2c94c" stroke="#3a2a08" stroke-width="2"/><circle cx="150" cy="104" r="7" fill="${c.glow}" class="lamp"/>`,
  horns: (c) => `<path d="M112 96 C86 74 80 44 90 18 C100 48 114 66 130 82 Z M188 96 C214 74 220 44 210 18 C200 48 186 66 170 82 Z" fill="${c.trim}" stroke="#14141a" stroke-width="2"/>`,
  blade: (c) => `<path d="M144 70 L150 2 L156 70 Z M126 78 L112 40 L134 70 Z M174 78 L188 40 L166 70 Z" fill="${c.trim}" stroke="#14141a" stroke-width="2"/><path d="M150 14 L150 60" stroke="${c.glow}" stroke-width="2" class="lamp"/>`,
  antenna: (c) => `<path d="M122 76 L96 18 M178 76 L204 18" stroke="${c.trim}" stroke-width="5" stroke-linecap="round"/><circle cx="96" cy="16" r="6" fill="${c.glow}" class="lamp"/><circle cx="204" cy="16" r="6" fill="${c.glow}" class="lamp b"/>`,
  crown: (c) => `<path d="M112 80 L118 40 L134 64 L150 28 L166 64 L182 40 L188 80 Z" fill="#f2c94c" stroke="#3a2a08" stroke-width="2"/><circle cx="150" cy="58" r="6" fill="${c.glow}" class="lamp"/>`,
  fins: (c) => `<path d="M100 120 L52 70 L60 120 L92 146 Z M200 120 L248 70 L240 120 L208 146 Z" fill="${c.trim}" stroke="#14141a" stroke-width="2"/><path d="M60 82 L88 120 M240 82 L212 120" stroke="${c.glow}" stroke-width="2" class="lamp"/>`,
};

function eyesSVG(c, id) {
  const glow = `fill="${c.glow}" filter="url(#glow-${id})"`;
  const arcs = (xs) => xs.map(([a, b]) => `<path d="M${a} 182 Q${(a + b) / 2} 164 ${b} 182" stroke="${c.glow}" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#glow-${id})"/>`).join('');
  if (c.eyes === 'mono') return `
    <rect x="106" y="166" width="88" height="14" rx="7" fill="#05070d"/>
    <g class="eye mono"><circle cx="150" cy="173" r="10" ${glow}/><circle cx="147" cy="170" r="3" fill="#fff"/></g>
    <g class="happy-eyes">${arcs([[138, 162]])}</g>`;
  const twin = `<g class="eye l"><path d="M108 164 L144 172 L142 184 L112 180 Z" ${glow}/></g><g class="eye r"><path d="M192 164 L156 172 L158 184 L188 180 Z" ${glow}/></g>`;
  const tri = c.eyes === 'tri' ? `<g class="eye t"><path d="M146 116 L154 116 L152 136 L148 136 Z" ${glow}/></g>` : '';
  return `${twin}${tri}<g class="happy-eyes">${arcs([[110, 142], [158, 190]])}</g>`;
}

function envoySVG(k, side) {
  const c = CAST[k], id = `${k}-${side}`;
  const ink = 'stroke="#10121a" stroke-width="2.2" stroke-linejoin="round"';
  return `<svg class="envoy ${side}" viewBox="0 0 300 400" aria-hidden="true">
    <defs><filter id="glow-${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="sh-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
    <g class="body">
      <g class="part torso">
        <path d="M128 236 L172 236 L176 296 L124 296 Z" fill="#2a2e38" ${ink}/>
        <path d="M128 252 H172 M127 266 H173 M126 280 H174" stroke="#4a5060" stroke-width="3"/>
        <path d="M66 400 L76 318 L118 288 L182 288 L224 318 L234 400 Z" fill="${c.armor}" ${ink}/>
        <path d="M66 400 L76 318 L118 288 L182 288 L224 318 L234 400 Z" fill="url(#sh-${id})"/>
        <path d="M116 290 L150 316 L184 290 L178 280 L150 300 L122 280 Z" fill="${c.trim}" ${ink}/>
        <path d="M150 316 L150 400 M96 340 L130 360 M204 340 L170 360" stroke="#10121a" stroke-opacity=".35" stroke-width="2"/>
        <path class="core" d="M150 326 L168 336 L168 356 L150 366 L132 356 L132 336 Z" fill="${c.glow}" filter="url(#glow-${id})" stroke="#10121a" stroke-width="2"/>
      </g>
      <g class="part pl"><path d="M14 400 L12 328 L38 292 L104 286 L118 320 L100 400 Z" fill="${c.armor}" ${ink}/><path d="M14 400 L12 328 L38 292 L104 286 L118 320 L100 400 Z" fill="url(#sh-${id})"/><path d="M26 330 L104 322 L100 340 L24 348 Z" fill="${c.trim}" ${ink}/><circle cx="60" cy="372" r="5" fill="${c.glow}" class="lamp"/></g>
      <g class="part pr"><path d="M286 400 L288 328 L262 292 L196 286 L182 320 L200 400 Z" fill="${c.armor}" ${ink}/><path d="M286 400 L288 328 L262 292 L196 286 L182 320 L200 400 Z" fill="url(#sh-${id})"/><path d="M274 330 L196 322 L200 340 L276 348 Z" fill="${c.trim}" ${ink}/><circle cx="240" cy="372" r="5" fill="${c.glow}" class="lamp b"/></g>
      <g class="part hd"><g class="head">
        ${CRESTS[c.crest](c)}
        <circle cx="86" cy="160" r="17" fill="${c.trim}" ${ink}/><circle cx="86" cy="160" r="6" fill="${c.glow}" class="lamp"/>
        <circle cx="214" cy="160" r="17" fill="${c.trim}" ${ink}/><circle cx="214" cy="160" r="6" fill="${c.glow}" class="lamp b"/>
        <path d="${HEADS[c.head]}" fill="${c.armor}" ${ink}/><path d="${HEADS[c.head]}" fill="url(#sh-${id})"/>
        <path d="M122 98 L178 98 L170 140 L130 140 Z" fill="${c.trim}" ${ink}/>
        <path d="M98 152 L202 152 L196 194 L104 194 Z" fill="#070a12" ${ink}/>
        <g class="eyes">${eyesSVG(c, id)}</g>
        <path class="scan" d="M104 160 L196 160" stroke="${c.glow}" stroke-width="2" opacity="0"/>
        <path d="M112 196 L188 196 L178 228 L150 242 L122 228 Z" fill="${c.trim}" ${ink}/>
        <g class="grill" stroke="${c.glow}" stroke-width="3" stroke-linecap="round"><path d="M134 206 H166 M136 215 H164 M139 224 H161"/></g>
        <path class="cheek" d="M104 204 L116 214 M100 212 L112 222 M196 204 L184 214 M200 212 L188 222" stroke="${c.glow}" stroke-width="3" stroke-linecap="round"/>
        <g class="steam" fill="#dfe8f0"><circle cx="86" cy="134" r="7"/><circle cx="214" cy="134" r="7"/></g>
      </g></g>
    </g>
  </svg>`;
}

const Meeting = (() => {
  let ctx = null, queue = [], typing = null, waiting = null, el = null;
  const q = (s) => el.querySelector(s);

  function season(month) {
    if (/Nov|Oct/.test(month)) return 'dusk';
    if (/Dec|Jan|Feb/.test(month)) return 'winter';
    if (/Mar|Apr/.test(month)) return 'rain';
    return 'summer';
  }

  function build() {
    el = document.createElement('div');
    el.id = 'meeting';
    el.hidden = true;
    document.body.appendChild(el);
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b?.dataset.choice) return choose(Number(b.dataset.choice));
      if (b?.id === 'm-leave') return leave();
      if (b?.id === 'm-continue') return close();
      if (!b) advance();
    });
    window.addEventListener('keydown', (e) => {
      if (!ctx) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (el.classList.contains('letter-open')) close(); else advance(); }
      else if (/^[1-3]$/.test(e.key) && waiting === 'choice') choose(Number(e.key) - 1);
      else if (e.key === 'Escape' && !ctx.chosen && !el.classList.contains('letter-open')) leave();
    });
  }

  function open(c) {
    if (!el) build();
    ctx = c; queue = []; waiting = null; clearInterval(typing);
    el.className = `season-${season(c.month)}`;
    el.innerHTML = `
      <div class="m-sky"><div class="m-moon" style="--moon:${c.them.color}"></div><div class="m-fx"></div></div>
      <svg class="m-land" viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 210 L180 120 L300 170 L460 80 L640 180 L820 110 L980 190 L1160 90 L1340 170 L1600 120 L1600 300 L0 300 Z" class="far"/>
        <path d="M0 250 L220 190 L420 240 L700 200 L940 250 L1220 205 L1600 245 L1600 300 L0 300 Z" class="near"/>
        <rect y="262" width="1600" height="38" class="lake"/>
      </svg>
      <div class="m-window"></div>
      <div class="m-table"></div>
      <div class="m-top"><b>${c.month}</b> · Meeting room · ${c.me.name} × ${c.them.name}</div>
      <div class="m-facts">${c.facts.map((f) => `<span>${f}</span>`).join('')}</div>
      <div class="m-chars">
        <div class="slot left" data-who="me">${envoySVG(c.me.k, 'left')}<div class="pop"></div></div>
        <div class="slot right" data-who="them">${envoySVG(c.them.k, 'right')}<div class="pop"></div></div>
      </div>
      <div class="m-choices" hidden></div>
      <div class="m-box">
        <div class="m-name"></div>
        <p class="m-text"></p>
        <span class="m-next">▼</span>
      </div>
      <button class="m-leave" id="m-leave" type="button">Leave · Esc</button>
      <div class="m-flash"></div>
      <div class="m-letter" hidden></div>`;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('in'));
    face('me', 'flat'); face('them', 'flat');
    queue = c.script.slice();
    setTimeout(advance, 650);
  }

  function face(who, mood) {
    const s = q(`.slot[data-who="${who}"]`);
    s.dataset.mood = mood;
  }
  function pop(who, sym) {
    const p = q(`.slot[data-who="${who}"] .pop`);
    p.textContent = sym; p.classList.remove('show'); void p.offsetWidth; p.classList.add('show');
  }

  function say(line) {
    const who = line.who, s = q(`.slot[data-who="${who}"]`), other = q(`.slot[data-who="${who === 'me' ? 'them' : 'me'}"]`);
    s.classList.add('speaking'); other.classList.remove('speaking');
    if (line.mood) face(who, line.mood);
    if (line.pop) pop(who, line.pop);
    if (line.other) face(who === 'me' ? 'them' : 'me', line.other);
    q('.m-name').textContent = who === 'me' ? ctx.me.envoy : ctx.them.envoy;
    q('.m-name').style.setProperty('--tag', who === 'me' ? ctx.me.color : ctx.them.color);
    q('.m-box').classList.toggle('mine', who === 'me');
    const t = q('.m-text'), full = line.text;
    let i = 0; t.textContent = ''; s.classList.add('talking');
    clearInterval(typing);
    waiting = 'type';
    typing = setInterval(() => {
      i += 2; t.textContent = full.slice(0, i);
      if (i >= full.length) finishType();
    }, 22);
    t.dataset.full = full;
  }
  function finishType() {
    clearInterval(typing); typing = null;
    const t = q('.m-text'); t.textContent = t.dataset.full;
    el.querySelectorAll('.slot').forEach((s) => s.classList.remove('talking'));
    waiting = queue.length ? 'next' : 'end';
    q('.m-next').hidden = false;
  }

  function advance() {
    if (!ctx || waiting === 'choice' || waiting === 'think') return;
    if (waiting === 'type') return finishType();
    q('.m-next').hidden = true;
    const next = queue.shift();
    if (!next) { if (waiting === 'end') return ctx.letter ? showLetter() : leave(); return; }
    if (next.choice) return showChoices();
    if (next.think) return think();
    say(next);
  }

  function showChoices() {
    waiting = 'choice';
    q('.m-text').textContent = ctx.ask;
    q('.m-name').textContent = 'Your leverage';
    q('.m-box').classList.add('mine');
    const box = q('.m-choices');
    box.innerHTML = ctx.deals.map((d, i) => `<button type="button" data-choice="${i}" style="--d:${i * 80}ms"><kbd>${i + 1}</kbd><span><b>${d.label}</b><small>${d.sub}</small></span><em>${d.pct}%</em></button>`).join('');
    box.hidden = false;
  }
  function choose(i) {
    if (waiting !== 'choice') return;
    const d = ctx.deals[i]; if (!d) return;
    q('.m-choices').hidden = true;
    ctx.chosen = d;
    q('#m-leave').hidden = true;
    const res = ctx.onChoose(i);
    ctx.result = res;
    queue = ctx.afterChoice(i, res);
    waiting = 'next';
    advance();
  }
  function think() {
    waiting = 'think';
    const s = q('.slot[data-who="them"]');
    s.classList.add('speaking'); q('.slot[data-who="me"]').classList.remove('speaking');
    face('them', 'think');
    q('.m-name').textContent = ctx.them.envoy;
    q('.m-box').classList.remove('mine');
    const t = q('.m-text'); t.innerHTML = '<span class="dots"><i>•</i><i>•</i><i>•</i></span>';
    setTimeout(() => {
      q('.m-flash').classList.remove('go'); void q('.m-flash').offsetWidth; q('.m-flash').classList.add('go');
      waiting = 'next'; advance();
    }, 1500);
  }

  function showLetter() {
    const L = ctx.letter, ok = ctx.result.ok;
    const box = q('.m-letter');
    box.innerHTML = `
      <div class="env"><div class="flap"></div>
        <article class="paper">
          <header><span class="seal" style="--seal:${ctx.them.color}">${ctx.them.name[0]}</span><div><b>The Court of ${ctx.them.name}</b><small>${ctx.month}</small></div></header>
          <p>To the Envoy of ${ctx.me.name},</p>
          ${L.body.map((p) => `<p>${p}</p>`).join('')}
          <p class="sign">${ctx.them.envoy}<br><small>for the ${ctx.them.title}</small></p>
          <div class="stamp ${ok ? 'ok' : 'no'}">${ok ? 'Approved' : 'Declined'}</div>
          <footer><small>${L.foot}</small><button type="button" class="btn" id="m-continue">Continue · Space</button></footer>
        </article>
      </div>`;
    box.hidden = false;
    el.classList.add('letter-open');
  }

  function leave() { close(true); }
  function close(early = false) {
    if (!ctx) return;
    const c = ctx; ctx = null; clearInterval(typing);
    el.classList.remove('in');
    setTimeout(() => { el.hidden = true; el.innerHTML = ''; }, 250);
    c.onClose(early && !c.chosen ? null : c.result);
  }

  return { open, isOpen: () => !!ctx };
})();
