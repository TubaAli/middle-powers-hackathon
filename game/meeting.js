// Meeting scene: anime-style diplomats talk, you pick a leverage point, and their government answers by letter.
// Diplomats are original SVG drawings in a Japanese anime style (fictional people), animated with CSS.
// game.js supplies all numbers; this file only stages them.

// skin/shade: face tones; hair/hairS: hair and its shadow; eye: iris colour; style: hair shape;
// outfit: suit colour; neck: tie | blouse | mandarin | scarf | thobe; acc: pin colour; glasses: true for spectacles.
const CAST = {
  US:   { name: 'Ambassador Jake Mercer',      skin: '#f8dcc6', shade: '#e9b99c', hair: '#f4cf5a', hairS: '#c8952c', eye: '#3d7bd9', style: 'spiky',    outfit: '#1e2f57', neck: 'tie',      tie: '#c7303c', acc: '#c7303c' },
  CN:   { name: 'Minister Chen Wei',         skin: '#f8dfca', shade: '#e8bea2', hair: '#1d1a22', hairS: '#0b0a0e', eye: '#7a3b2a', style: 'ponytail', outfit: '#b3262f', neck: 'mandarin', tie: '#f2c94c', acc: '#f2c94c' },
  JP:   { name: 'Minister Kaito Shirane',      skin: '#f9e0cb', shade: '#ebc1a4', hair: '#22253a', hairS: '#101220', eye: '#5a4a8c', style: 'neat',     outfit: '#23283a', neck: 'tie',      tie: '#c23a3a', acc: '#e04848', glasses: true },
  TW:   { name: 'Envoy Chen Yuting',           skin: '#f6dbc2', shade: '#e5b99a', hair: '#3b2a24', hairS: '#1f1512', eye: '#2f7a66', style: 'bob',      outfit: '#2f8f78', neck: 'blouse',   tie: '#f2f4f0', acc: '#a8fff0' },
  KR:   { name: 'Minister Han Seojun',         skin: '#fae3d0', shade: '#ecc4a8', hair: '#2b2140', hairS: '#140e22', eye: '#6a46a8', style: 'swept',    outfit: '#4b3f86', neck: 'tie',      tie: '#d9d2ff', acc: '#ff7ae0' },
  NL:   { name: 'Minister Pieter de Vries',        skin: '#f9dfcd', shade: '#ebbfa6', hair: '#e8925a', hairS: '#b8602e', eye: '#3a9fd0', style: 'braid',    outfit: '#24324a', neck: 'scarf',    tie: '#f08a3c', acc: '#f08a3c' },
  DE:   { name: 'Minister Lukas Brandt',       skin: '#f4d4bf', shade: '#e2b39a', hair: '#8c745e', hairS: '#5c4a3a', eye: '#4f8a4a', style: 'short',    outfit: '#5d6672', neck: 'tie',      tie: '#2b2f36', acc: '#ffcf3d', glasses: true },
  UK:   { name: 'Envoy Eleanor Ashford',       skin: '#f8d8c4', shade: '#e8b69e', hair: '#a8452c', hairS: '#702a18', eye: '#2f8a6a', style: 'updo',     outfit: '#1f3f6e', neck: 'blouse',   tie: '#f6f2ea', acc: '#e3c46b' },
  GULF: { name: 'Minister Khalid Al-Mansoori', skin: '#d9a77f', shade: '#bb8660', hair: '#1f1712', hairS: '#0e0a08', eye: '#6a4426', style: 'ghutra',   outfit: '#2a2420', neck: 'thobe',    tie: '#f4f2ec', acc: '#d9a441' },
  AUCA: { name: 'Envoy Isla Brennan',          skin: '#efc6a6', shade: '#d9a582', hair: '#b07a4a', hairS: '#7a4e2a', eye: '#4f9a5a', style: 'waves',    outfit: '#2f5f3a', neck: 'scarf',    tie: '#d0343c', acc: '#d0343c', freckles: true },
  AIDE: { name: 'Mira, your chief of staff',   skin: '#f7dcc8', shade: '#e6b99c', hair: '#3a2f4a', hairS: '#1c1626', eye: '#3f8fbf', style: 'bob',      outfit: '#2b3a55', neck: 'blouse',   tie: '#f2c96b', acc: '#f2c96b' },
  PROD: { name: 'Minister Amani Kabeya',       skin: '#8a5a3e', shade: '#6e452e', hair: '#17110e', hairS: '#050403', eye: '#b8742a', style: 'puffs',    outfit: '#8a4a2a', neck: 'blouse',   tie: '#e8b04a', acc: '#2f9a6a' },
};

// Hair: [back layer, front layer]; drawn behind and over the face.
const HAIR = {
  spiky: ['M88 168 C80 92 116 60 150 60 C186 60 222 92 212 168 L204 150 L96 150 Z',
    'M90 152 C86 94 116 62 150 60 C188 60 216 92 210 152 L200 126 L194 146 L182 110 L172 140 L160 104 L148 134 L138 102 L128 138 L116 110 L108 146 L102 124 Z M150 60 L140 36 L162 54 L176 30 L178 62 Z'],
  ponytail: ['M90 170 C82 94 116 62 150 62 C186 62 218 94 210 170 Z M196 92 C246 96 262 170 244 270 C236 236 226 186 204 140 Z',
    'M92 166 C88 98 116 64 150 64 C184 64 212 98 208 166 L200 132 C190 124 110 124 100 132 Z M92 132 L94 236 L106 214 L106 134 Z M208 132 L206 236 L194 214 L194 134 Z'],
  neat: ['M90 166 C84 92 118 62 150 62 C184 62 216 92 210 166 Z',
    'M92 160 C88 96 118 64 154 64 C192 66 216 100 208 158 L202 118 C186 114 170 106 158 96 C150 116 122 130 104 128 Z'],
  bob: ['M84 236 C74 120 108 60 150 60 C192 60 226 120 216 236 C202 246 190 240 186 224 L114 224 C110 240 98 246 84 236 Z',
    'M94 158 C90 98 116 64 150 62 C184 64 210 98 206 158 C202 138 196 128 190 122 L180 136 L172 118 L158 132 L150 114 L140 132 L128 118 L120 136 L110 122 C104 128 100 138 94 158 Z'],
  swept: ['M90 168 C82 92 118 60 152 60 C188 60 220 94 210 168 Z',
    'M92 156 C86 96 118 62 152 62 C192 62 216 98 208 152 L202 130 C190 152 170 170 142 182 C152 162 158 142 154 124 C138 136 114 136 100 130 Z'],
  braid: ['M88 240 C76 124 110 62 150 62 C190 62 224 124 212 240 Z',
    'M94 160 C90 98 116 64 150 64 C184 64 210 98 206 160 C198 132 178 112 158 104 C140 118 116 126 100 130 Z'],
  short: ['M92 160 C86 94 118 64 150 64 C182 64 214 94 208 160 Z',
    'M94 150 C88 96 116 66 150 64 C184 66 212 96 206 150 L200 124 L190 128 L182 110 L170 120 L158 106 L146 118 L134 106 L124 122 L112 112 L104 128 Z'],
  updo: ['M90 168 C82 94 116 62 150 62 C184 62 218 94 210 168 Z M150 60 m-26 0 a26 22 0 1 0 52 0 a26 22 0 1 0 -52 0',
    'M94 160 C90 98 118 66 150 64 C184 64 210 98 206 160 C200 130 184 112 164 104 C150 118 124 128 104 128 C100 136 96 146 94 160 Z M96 140 C92 170 96 200 104 214 C104 186 104 160 108 140 Z'],
  ghutra: ['M78 166 C74 86 112 52 150 52 C188 52 226 86 222 166 L240 336 C214 326 198 296 194 254 L190 170 C186 132 114 132 110 170 L106 254 C102 296 86 326 60 336 Z',
    'M98 136 C116 118 184 118 202 136 L204 110 C184 92 116 92 96 110 Z'],
  waves: ['M86 250 C70 220 84 200 78 170 C70 100 112 60 150 60 C188 60 230 100 222 170 C216 200 230 220 214 250 C200 262 190 250 184 236 L116 236 C110 250 100 262 86 250 Z',
    'M92 162 C88 98 116 64 150 64 C184 64 212 98 208 162 C202 132 178 108 152 100 C126 108 104 130 92 162 Z'],
  puffs: ['M104 74 m-34 0 a34 32 0 1 0 68 0 a34 32 0 1 0 -68 0 M196 74 m-34 0 a34 32 0 1 0 68 0 a34 32 0 1 0 -68 0 M92 160 C86 96 116 70 150 70 C184 70 214 96 208 160 Z',
    'M96 142 C94 100 120 76 150 76 C180 76 206 100 204 142 C190 118 170 108 150 108 C130 108 110 118 96 142 Z'],
};
const FACE = 'M98 150 C98 104 122 92 150 92 C178 92 202 104 202 150 C202 182 198 206 186 222 C174 238 162 250 150 252 C138 250 126 238 114 222 C102 206 98 182 98 150 Z';

function eyeSVG(c, id, cx, side) {
  const cy = 174, flick = side === 'l' ? `M${cx - 17} ${cy - 8} L${cx - 22} ${cy - 13}` : `M${cx + 17} ${cy - 8} L${cx + 22} ${cy - 13}`;
  return `<g class="eye ${side}">
    <ellipse cx="${cx}" cy="${cy}" rx="16" ry="19" fill="#fff"/>
    <g class="iris"><ellipse cx="${cx}" cy="${cy + 2}" rx="12" ry="16" fill="url(#iris-${id})"/>
      <ellipse cx="${cx}" cy="${cy + 3}" rx="5" ry="7.5" fill="#120c14"/>
      <circle cx="${cx - 4}" cy="${cy - 4}" r="4.2" fill="#fff"/><circle cx="${cx + 5}" cy="${cy + 8}" r="2" fill="#fff" opacity=".85"/></g>
    <path d="M${cx - 17} ${cy - 6} Q${cx} ${cy - 23} ${cx + 17} ${cy - 8}" stroke="#1a1018" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="${flick}" stroke="#1a1018" stroke-width="3" stroke-linecap="round"/>
    <path d="M${cx - 11} ${cy + 17} Q${cx} ${cy + 20} ${cx + 11} ${cy + 16}" stroke="${c.shade}" stroke-width="2" fill="none"/></g>`;
}

function bodySVG(c, id, ink) {
  if (c.neck === 'thobe') return `
    <path d="M40 400 C44 330 80 300 124 290 L176 290 C220 300 256 330 260 400 Z" fill="${c.tie}" ${ink}/>
    <path d="M40 400 C44 330 76 304 112 294 L132 400 Z M260 400 C256 330 224 304 188 294 L168 400 Z" fill="${c.outfit}" ${ink}/>
    <path d="M112 294 L132 400 M188 294 L168 400" stroke="${c.acc}" stroke-width="5"/>
    <path d="M136 290 L150 312 L164 290" fill="none" stroke="#c9c5b8" stroke-width="2"/>`;
  const v = `<path d="M40 400 C44 330 80 300 124 290 L150 334 L176 290 C220 300 256 330 260 400 Z" fill="${c.outfit}" ${ink}/>
    <path d="M40 400 C44 330 80 300 124 290 L150 334 L176 290 C220 300 256 330 260 400 Z" fill="url(#sh-${id})"/>
    <path d="M124 290 L138 360 L112 330 L118 304 Z M176 290 L162 360 L188 330 L182 304 Z" fill="#000" opacity=".22"/>
    <circle cx="206" cy="336" r="6" fill="${c.acc}" stroke="#fff" stroke-width="1.5"/>`;
  if (c.neck === 'tie') return `${v}
    <path d="M124 290 L150 334 L176 290 L166 282 L150 300 L134 282 Z" fill="#f6f6f2" ${ink}/>
    <path d="M144 302 L156 302 L159 312 L155 362 L150 370 L145 362 L141 312 Z" fill="${c.tie}" ${ink}/>`;
  if (c.neck === 'mandarin') return `
    <path d="M40 400 C44 330 80 300 124 290 L176 290 C220 300 256 330 260 400 Z" fill="${c.outfit}" ${ink}/>
    <path d="M40 400 C44 330 80 300 124 290 L176 290 C220 300 256 330 260 400 Z" fill="url(#sh-${id})"/>
    <path d="M128 280 L172 280 L176 298 L124 298 Z" fill="${c.outfit}" ${ink}/><path d="M126 292 H174" stroke="${c.tie}" stroke-width="2"/>
    <path d="M150 298 L150 400" stroke="${c.tie}" stroke-width="2.5"/><circle cx="150" cy="318" r="3.5" fill="${c.tie}"/><circle cx="150" cy="344" r="3.5" fill="${c.tie}"/>`;
  if (c.neck === 'scarf') return `${v}
    <path d="M124 290 L150 334 L176 290 L166 282 L150 300 L134 282 Z" fill="#f6f6f2" ${ink}/>
    <path d="M122 282 C134 300 166 300 178 282 L182 296 C166 316 134 316 118 296 Z" fill="${c.tie}" ${ink}/>
    <path d="M160 306 L176 360 L162 356 L152 312 Z" fill="${c.tie}" ${ink}/>`;
  return `${v}
    <path d="M124 290 L150 334 L176 290 L166 282 L150 300 L134 282 Z" fill="${c.tie}" ${ink}/>
    <path d="M134 282 L150 300 L166 282 L172 290 L150 312 L128 290 Z" fill="#fff" opacity=".55"/>
    <path d="M132 304 Q150 318 168 304" stroke="#f5f1e6" stroke-width="2.5" fill="none" stroke-dasharray="0.5 5" stroke-linecap="round"/>`;
}

function envoySVG(k, side) {
  const c = CAST[k], id = `${k}-${side}`, [back, front] = HAIR[c.style];
  const ink = 'stroke="#1a1018" stroke-width="2.2" stroke-linejoin="round"';
  const braid = c.style === 'braid' ? `<g class="braid">${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${196 + i * 4}" cy="${232 + i * 24}" rx="13" ry="15" fill="${c.hair}" ${ink}/>`).join('')}<path d="M210 342 l6 14 l-12 0 Z" fill="${c.tie}"/></g>` : '';
  const ghutra = c.style === 'ghutra';
  return `<svg class="envoy ${side}" viewBox="0 0 300 400" aria-hidden="true">
    <defs>
      <linearGradient id="iris-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c18"/><stop offset=".45" stop-color="${c.eye}"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient>
      <linearGradient id="sh-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    </defs>
    <g class="body">
      <g class="hair-back"><path d="${back}" fill="${ghutra ? c.tie : c.hair}" ${ink}/></g>
      <g class="part torso">
        <path d="M134 230 L166 230 L168 292 L132 292 Z" fill="${c.skin}" ${ink}/><path d="M134 236 Q150 262 166 236 L166 252 Q150 270 134 252 Z" fill="${c.shade}"/>
        ${bodySVG(c, id, ink)}
      </g>
      ${braid}
      <g class="part hd"><g class="head">
        <ellipse cx="99" cy="176" rx="8" ry="14" fill="${c.skin}" ${ink}/><ellipse cx="201" cy="176" rx="8" ry="14" fill="${c.skin}" ${ink}/>
        <path d="${FACE}" fill="${c.skin}" ${ink}/>
        ${c.freckles ? `<g fill="${c.shade}">${[[116, 204], [122, 210], [111, 210], [184, 204], [178, 210], [189, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>` : ''}
        <ellipse class="cheek" cx="117" cy="206" rx="12" ry="6" fill="#ff7a8a"/><ellipse class="cheek" cx="183" cy="206" rx="12" ry="6" fill="#ff7a8a"/>
        <g class="eyes">${eyeSVG(c, id, 126, 'l')}${eyeSVG(c, id, 174, 'r')}</g>
        <g class="happy-eyes" stroke="#1a1018" stroke-width="4.5" fill="none" stroke-linecap="round"><path d="M111 178 Q126 160 141 178"/><path d="M159 178 Q174 160 189 178"/></g>
        <g class="brows" stroke="${c.hairS}" stroke-width="4" stroke-linecap="round" fill="none"><path class="brow l" d="M110 146 Q124 139 138 143"/><path class="brow r" d="M162 143 Q176 139 190 146"/></g>
        ${c.glasses ? `<g class="glasses" fill="#cfe6ff22" stroke="#20222c" stroke-width="2.5"><rect x="106" y="156" width="40" height="34" rx="9"/><rect x="154" y="156" width="40" height="34" rx="9"/><path d="M146 170 Q150 166 154 170 M106 166 L98 162 M194 166 L202 162"/><path d="M112 162 L120 158" stroke="#fff" stroke-width="2" opacity=".7"/></g>` : ''}
        <path d="M151 194 L148 204 L152 205" stroke="${c.shade}" stroke-width="2" fill="none" stroke-linecap="round"/>
        ${ghutra ? `<path d="M112 214 C118 246 138 260 150 260 C162 260 182 246 188 214 C178 232 166 238 150 238 C134 238 122 232 112 214 Z M132 218 C140 212 160 212 168 218 C160 216 140 216 132 218 Z" fill="${c.hair}" ${ink}/>` : ''}
        <g class="mouth">
          <path class="mc" d="M141 224 Q150 228 159 224" stroke="#7a2a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path class="ms" d="M137 220 Q150 236 163 220 Q150 228 137 220 Z" fill="#7a2a2a" stroke="#7a2a2a" stroke-width="2" stroke-linejoin="round"/>
          <path class="mf" d="M141 229 Q150 221 159 229" stroke="#7a2a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse class="mO" cx="150" cy="226" rx="6" ry="8" fill="#5a1a22" stroke="#1a1018" stroke-width="1.5"/>
          <path class="mo" d="M140 221 Q150 219 160 221 Q158 236 150 237 Q142 236 140 221 Z" fill="#5a1a22" stroke="#1a1018" stroke-width="1.5"/>
        </g>
        <path class="sweat" d="M200 120 C206 130 210 136 210 141 C210 147 200 147 200 141 C200 136 196 130 200 120 Z" fill="#9fd8ff" stroke="#3a7ab0" stroke-width="1.5"/>
        <g class="hair-front"><path d="${front}" fill="${ghutra ? c.tie : c.hair}" ${ink}/>
          ${ghutra ? `<ellipse cx="150" cy="96" rx="58" ry="13" fill="none" stroke="#141414" stroke-width="7"/><ellipse cx="150" cy="88" rx="56" ry="12" fill="none" stroke="#141414" stroke-width="5"/>`
            : `<path d="M114 96 C130 84 170 84 186 96" stroke="#fff" stroke-opacity=".38" stroke-width="6" fill="none" stroke-linecap="round"/>`}
        </g>
      </g></g>
    </g>
  </svg>`;
}

const flagRow = (codes = []) => `<span class="m-flags">${codes.map((c) => `<img src="flags/${c}.svg" alt="">`).join('')}</span>`;

// Painted stills in Before Geneva's art style (orbit-art/, made from that game's scenes; see orbit-art/README.md).
// Each country uses one delegate in four expressions; your side is always Mira, your chief of staff and envoy.
const ART = { US: 'us', CN: 'cn', JP: 'eam', KR: 'eam', TW: 'eaw', NL: 'eu', DE: 'eu', UK: 'uk', GULF: 'gulf', AUCA: 'auca', PROD: 'prod', AIDE: 'envoy', ME: 'envoy' };
const FLIP = { cn: true };   // turn delegates to face the table
const EXPR = { flat: 'neutral', happy: 'happy', sad: 'sad', think: 'think', surprised: 'think' };
const stillSrc = (who, mood) => `orbit-art/${who}-${EXPR[mood] ?? 'neutral'}.webp`;
function stillHTML(who, side) {
  for (const m of ['neutral', 'happy', 'sad', 'think']) new Image().src = `orbit-art/${who}-${m}.webp`;   // preload expressions
  return `<img class="still ${side}${FLIP[who] ? ' flip' : ''}" data-art="${who}" src="${stillSrc(who, 'flat')}" alt="" draggable="false">`;
}
const ROOM = { dusk: 'geneva', winter: 'snow', rain: 'rain', summer: 'geneva' };

const Meeting = (() => {
  let ctx = null, queue = [], typing = null, waiting = null, el = null;
  const q = (s) => el.querySelector(s);

  // City skyline seen from the meeting room window (deterministic, so it does not jump between meetings).
  function skyline() {
    let d = 'M0 300 L0 220', x = 0, i = 0;
    while (x < 1600) {
      const w = 50 + ((i * 37) % 70), h = 110 + ((i * 53) % 150);
      d += ` L${x} ${300 - h}${i % 4 === 1 ? ` L${x + w / 2} ${270 - h}` : ''} L${x + w} ${300 - h}`;
      x += w; i++;
    }
    return `${d} L1600 300 Z`;
  }

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
      if (!ctx || performance.now() - ctx.t0 < 300) return;   // the key that opened the meeting must not also skip its first line
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (el.classList.contains('letter-open')) close(); else advance(); }
      else if (/^[1-3]$/.test(e.key) && waiting === 'choice') choose(Number(e.key) - 1);
      else if (e.key === 'Escape' && !ctx.chosen && !el.classList.contains('letter-open')) leave();
    });
  }

  function open(c) {
    if (!el) build();
    ctx = c; ctx.t0 = performance.now(); queue = []; waiting = null; clearInterval(typing);
    el.className = `season-${season(c.month)}`;
    el.innerHTML = `
      <div class="m-room" style="background-image:url('orbit-art/room-${ROOM[season(c.month)]}.webp')"></div><div class="m-shade"></div><div class="m-fx"></div>
      <header class="m-head"><span class="m-brand">ORBIT ACCORD<small>Bilateral room</small></span><b>${c.month}</b></header>
      <div class="m-title"><p class="m-eyebrow">Bilateral room · ${flagRow(c.them.flags)} ${c.them.name}</p><h2>${c.them.name} × ${c.me.name}</h2></div>
      <aside class="m-facts"><p class="m-eyebrow">On the table</p>${c.facts.map((f) => `<span>${f}</span>`).join('')}</aside>
      <div class="m-chars">
        <div class="slot left" data-who="them" data-art="${ART[c.them.k]}">${stillHTML(ART[c.them.k], 'left')}<span class="m-plate">${flagRow(c.them.flags)}${c.them.name}<small>${c.them.envoy}</small></span><div class="pop"></div></div>
        <div class="slot right" data-who="me" data-art="envoy">${stillHTML('envoy', 'right')}<span class="m-plate">${flagRow(c.me.flags)}${c.me.name}<small>${c.me.envoy}</small></span><div class="pop"></div></div>
      </div>
      <div class="m-choices" hidden></div>
      <div class="m-box">
        <div class="m-name"></div>
        <p class="m-text"></p>
        <span class="m-next">▼</span>
      </div>
      <button class="m-leave" id="m-leave" type="button">Leave<span class="kb"> · Esc</span></button>
      <div class="m-flash"></div>
      <div class="m-letter" hidden></div>`;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('in'));
    face('me', 'flat'); face('them', 'flat');
    queue = c.script.slice();
    setTimeout(() => { if (ctx === c && waiting === null) advance(); }, 650);
  }

  function face(who, mood) {
    const s = q(`.slot[data-who="${who}"]`);
    s.dataset.mood = mood;
    const img = s.querySelector('.still');
    if (img) img.src = stillSrc(s.dataset.art, mood);
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
    box.style.setProperty("--above", `${q(".m-box").offsetHeight + 46}px`);
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
          <header><span class="seal flag-seal">${flagRow(ctx.them.flags)}</span><div><b>Government of ${ctx.them.say}</b><small>Official reply · ${ctx.month}</small></div></header>
          <p>To the delegation of ${ctx.me.say},</p>
          ${L.body.map((p) => `<p>${p}</p>`).join('')}
          <p class="sign">On behalf of the ${ctx.them.title}<br><small>delivered via ${ctx.them.envoy}</small></p>
          <div class="stamp ${ok ? 'ok' : 'no'}">${ok ? 'Approved' : 'Declined'}</div>
          <footer><small>${L.foot}</small><button type="button" class="btn" id="m-continue">Continue<span class="kb"> · Space</span></button></footer>
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
