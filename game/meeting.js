// Meeting scene: anime-style envoys talk, you pick a leverage point, a letter brings the answer.
// Characters are original SVG drawings (fictional adult envoys), animated with CSS.
// game.js supplies all numbers; this file only stages them.

const CAST = {
  US:   { name: 'Envoy Rowan Hale',     hair: '#8a8f99', back: 'short', bangs: 'part',  skin: '#efcfb4', eyes: '#3d6fb6', suit: '#1f2f52', neck: 'tie',    tie: '#a33b3b', glasses: false },
  CN:   { name: 'Envoy Lian Voss',      hair: '#1d1a22', back: 'short', bangs: 'part',  skin: '#efd2b6', eyes: '#5a3a2c', suit: '#2a3f45', neck: 'tie',    tie: '#7a2f3a', glasses: true },
  JP:   { name: 'Envoy Aya Kirisame',   hair: '#24202a', back: 'bob',   bangs: 'swept', skin: '#f6dcc8', eyes: '#4b3a5a', suit: '#efe9da', neck: 'blouse', tie: '#1f5a5f', glasses: false },
  TW:   { name: 'Envoy Mei Tarrow',     hair: '#2b2230', back: 'ponytail', bangs: 'spiky', skin: '#f3d6bf', eyes: '#2f6b5c', suit: '#20463f', neck: 'blouse', tie: '#e6efe9', glasses: false },
  KR:   { name: 'Envoy Jun Arden',      hair: '#2a2433', back: 'short', bangs: 'spiky', skin: '#f2d4bd', eyes: '#5b4a8a', suit: '#2e2a4a', neck: 'tie',    tie: '#9b7fe0', glasses: false },
  NL:   { name: 'Envoy Sanne Vellum',   hair: '#d9a35a', back: 'long',  bangs: 'swept', skin: '#f4d9c6', eyes: '#3f7cb0', suit: '#31435a', neck: 'blouse', tie: '#f08a3c', glasses: false },
  DE:   { name: 'Envoy Konrad Ferris',  hair: '#6b4a32', back: 'short', bangs: 'part',  skin: '#eccbb0', eyes: '#5d6b7a', suit: '#3d4450', neck: 'tie',    tie: '#9aa4b2', glasses: true },
  UK:   { name: 'Envoy Imogen Ashby',   hair: '#7a3b28', back: 'bun',   bangs: 'swept', skin: '#f5dccb', eyes: '#3e7a52', suit: '#1e3550', neck: 'blouse', tie: '#6fa8dc', glasses: false },
  GULF: { name: 'Envoy Samir Qadan',    hair: '#1f1814', back: 'short', bangs: 'part',  skin: '#c9946b', eyes: '#4a3020', suit: '#efe6d2', neck: 'tie',    tie: '#c9a646', glasses: false },
  AUCA: { name: 'Envoy Tess Calloway',  hair: '#c98a3e', back: 'ponytail', bangs: 'spiky', skin: '#e9c2a0', eyes: '#3f8a5a', suit: '#35503a', neck: 'blouse', tie: '#e8efe0', glasses: false },
  PROD: { name: 'Envoy Amara Okafor',   hair: '#15100e', back: 'bun',   bangs: 'none',  skin: '#8a5a3c', eyes: '#3a2418', suit: '#6b4a32', neck: 'blouse', tie: '#e0c48a', glasses: false },
};

const HAIR_BACK = {
  short: 'M95 150 C92 82 122 58 150 58 C178 58 208 82 205 150 L206 182 L94 182 Z',
  bob: 'M90 150 C85 80 120 55 150 55 C180 55 215 80 210 150 L213 246 C196 256 182 248 176 238 L124 238 C118 248 104 256 87 246 Z',
  long: 'M88 140 C85 75 120 52 150 52 C180 52 215 75 212 140 L224 352 C204 366 184 356 172 330 L128 330 C116 356 96 366 76 352 Z',
  bun: 'M95 150 C92 82 122 58 150 58 C178 58 208 82 205 150 L206 190 L94 190 Z M126 42 a24 22 0 1 1 48 0 a24 22 0 1 1 -48 0 Z',
  ponytail: 'M95 150 C92 82 122 58 150 58 C178 58 208 82 205 150 L206 182 L94 182 Z M196 92 C236 110 240 190 222 262 C214 230 210 180 190 140 Z',
};
const BANGS = {
  spiky: 'M98 152 C94 96 120 66 150 66 C182 66 206 96 202 152 C196 128 188 114 180 106 C176 126 164 134 152 136 C156 120 150 104 143 98 C134 120 120 134 104 142 Z',
  swept: 'M98 156 C94 94 124 62 156 64 C186 66 206 94 202 146 C192 120 178 104 160 100 C150 118 128 132 98 156 Z',
  part: 'M98 148 C95 92 125 62 155 64 C185 66 205 92 202 140 C190 112 170 98 140 100 C126 110 110 128 98 148 Z',
  none: 'M100 128 C104 86 126 66 150 66 C174 66 196 86 200 128 C186 104 170 94 150 94 C130 94 114 104 100 128 Z',
};

function envoySVG(k, side) {
  const c = CAST[k];
  const id = `${k}-${side}`;
  const eye = (cx) => `
    <g class="eye">
      <ellipse cx="${cx}" cy="181" rx="15" ry="17" fill="#fff"/>
      <ellipse cx="${cx}" cy="184" rx="11" ry="14" fill="url(#iris-${id})"/>
      <ellipse cx="${cx}" cy="186" rx="5" ry="7" fill="#140d14"/>
      <circle cx="${cx - 4}" cy="176" r="4" fill="#fff"/><circle cx="${cx + 5}" cy="191" r="2" fill="#fff" opacity=".85"/>
      <path d="M${cx - 18} 173 Q${cx} 159 ${cx + 18} 171" stroke="#231520" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    </g>`;
  const neck = c.neck === 'tie'
    ? `<path d="M133 292 L150 336 L167 292 Z" fill="#f4f1ea"/><path d="M146 302 L154 302 L158 362 L150 375 L142 362 Z" fill="${c.tie}"/>
       <path d="M133 290 L118 302 L150 380 Z M167 290 L182 302 L150 380 Z" fill="#000" opacity=".22"/>`
    : `<path d="M128 288 C135 300 165 300 172 288 L172 304 C165 314 135 314 128 304 Z" fill="${c.tie}"/>
       <path d="M128 296 L112 306 L146 372 Z M172 296 L188 306 L154 372 Z" fill="#000" opacity=".16"/>`;
  return `<svg class="envoy ${side}" viewBox="0 0 300 400" aria-hidden="true">
    <defs><radialGradient id="iris-${id}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".35" stop-color="${c.eyes}"/><stop offset="1" stop-color="#140d14"/></radialGradient></defs>
    <g class="body">
      <path d="${HAIR_BACK[c.back]}" fill="${c.hair}" stroke="#231520" stroke-width="2"/>
      <path d="M134 236 L166 236 L168 296 L132 296 Z" fill="${c.skin}"/><path d="M134 250 C145 262 155 262 166 250 L166 236 L134 236 Z" fill="#000" opacity=".12"/>
      <path d="M36 400 C42 334 88 302 132 290 L168 290 C212 302 258 334 264 400 Z" fill="${c.suit}" stroke="#231520" stroke-width="2"/>
      ${neck}
      <g class="head">
        <ellipse cx="101" cy="182" rx="8" ry="14" fill="${c.skin}" stroke="#231520" stroke-width="1.5"/>
        <ellipse cx="199" cy="182" rx="8" ry="14" fill="${c.skin}" stroke="#231520" stroke-width="1.5"/>
        <path d="M102 140 C102 202 120 242 150 264 C180 242 198 202 198 140 C198 95 175 75 150 75 C125 75 102 95 102 140 Z" fill="${c.skin}" stroke="#231520" stroke-width="2"/>
        <ellipse class="blush" cx="117" cy="210" rx="11" ry="4.5" fill="#ff8a9a"/><ellipse class="blush" cx="183" cy="210" rx="11" ry="4.5" fill="#ff8a9a"/>
        <g class="eyes">${eye(127)}${eye(173)}</g>
        ${c.glasses ? '<g fill="none" stroke="#2b2b33" stroke-width="2.5"><rect x="106" y="164" width="42" height="34" rx="9"/><rect x="152" y="164" width="42" height="34" rx="9"/><path d="M148 178 L152 178"/></g>' : ''}
        <path class="brow l" d="M110 154 Q127 145 143 152" stroke="#231520" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path class="brow r" d="M157 152 Q173 145 190 154" stroke="#231520" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M150 203 L147 214 L152 215" stroke="#b77d68" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path class="m m-flat" d="M142 230 Q150 233 158 230" stroke="#6b2a34" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path class="m m-smile" d="M137 226 Q150 241 163 226 Q150 232 137 226 Z" fill="#7a2f3a" stroke="#6b2a34" stroke-width="2"/>
        <path class="m m-frown" d="M141 234 Q150 226 159 234" stroke="#6b2a34" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse class="m m-open" cx="150" cy="231" rx="7" ry="6.5" fill="#7a2f3a" stroke="#6b2a34" stroke-width="2"/>
        <path d="${BANGS[c.bangs]}" fill="${c.hair}" stroke="#231520" stroke-width="2"/>
        <path d="M116 96 Q150 80 184 96" stroke="#fff" stroke-width="5" fill="none" opacity=".22" stroke-linecap="round"/>
        <path class="sweat" d="M206 128 C214 142 216 152 208 156 C200 152 202 142 206 128 Z" fill="#9fd8ff" stroke="#2a5a80" stroke-width="1.5"/>
      </g>
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
      el.classList.add(ctx.result.ok ? 'flash-good' : 'flash-bad');
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
