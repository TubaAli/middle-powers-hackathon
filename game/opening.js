// Opening scene: a breaking-news trigger, your chief of staff calls you to act, then you pick a middle power and a first goal.
// Uses the painted stills from meeting.js (Before Geneva art style); game.js supplies the countries, facts and goals.

const Opening = (() => {
  let el = null, ctx = null, queue = [], typing = null, waiting = null;
  const q = (s) => el.querySelector(s);

  function start(c) {
    ctx = c;
    el = document.createElement('div');
    el.id = 'opening';
    el.innerHTML = `
      <div class="op-news"><span class="op-live">● Breaking</span><div class="op-ticker"><span>The US and China race to build ever-stronger AI · No shared safety rules · Laws close in eight months · </span><span>The US and China race to build ever-stronger AI · No shared safety rules · Laws close in eight months · </span></div></div>
      <div class="op-stage">
        <div class="op-aide" data-art="envoy">${stillHTML('envoy', 'left')}</div>
        <div class="op-pick" hidden></div>
      </div>
      <div class="op-box"><div class="op-name">${CAST.AIDE.name}</div><p class="op-text"></p><span class="op-next">▼</span></div>
      <button class="op-skip" type="button">Skip intro ›</button>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('in'));
    el.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    queue = [
      { mood: 'surprised', text: 'Minister, wake up! The giants are racing to build AI with no brakes.' },
      { mood: 'sad', text: 'The rules are being written now. In eight months, the window closes.' },
      { mood: 'think', text: 'They think we are too small to matter.' },
      { mood: 'happy', text: 'But they need parts of the AI supply chain that we make.' },
      { pick: 'country', mood: 'flat', text: 'Which country do you lead?' },
    ];
    setTimeout(advance, 900);
  }

  function mood(m) { const a = q('.op-aide'); a.dataset.mood = m || 'flat'; a.querySelector('.still').src = stillSrc('envoy', m || 'flat'); }
  function say(line) {
    mood(line.mood);
    const t = q('.op-text'), full = line.text;
    let i = 0; t.textContent = ''; q('.op-aide').classList.add('talking'); q('.op-next').hidden = true;
    clearInterval(typing); waiting = 'type';
    typing = setInterval(() => { i += 2; t.textContent = full.slice(0, i); if (i >= full.length) done(); }, 24);
    function done() {
      clearInterval(typing); typing = null; t.textContent = full; q('.op-aide').classList.remove('talking');
      if (line.pick) { waiting = 'pick'; showPick(line.pick); }
      else { waiting = 'next'; q('.op-next').hidden = false; }
    }
    say.finish = done;
  }
  function advance() {
    if (waiting === 'type') return say.finish();
    if (waiting === 'pick') return;
    const next = queue.shift();
    if (!next) return finish();
    say(next);
  }

  function showPick(kind) {
    const box = q('.op-pick');
    box.className = `op-pick ${kind}`;
    box.innerHTML = kind === 'country'
      ? ctx.countries.map((c, i) => `<button type="button" data-k="${c.k}" style="--d:${i * 50}ms">${c.flags}<b>${c.name}</b><small>${c.fact}</small></button>`).join('')
      : ctx.goals.map((x, i) => `<button type="button" data-goal="${x.id}" style="--d:${i * 50}ms"><span class="op-ic">${x.icon}</span><b>${x.short}</b><small>Stops: ${x.risk_s.replace(/^([A-Z])([a-z])/, (m, a, b) => a.toLowerCase() + b)}</small></button>`).join('');
    box.hidden = false;
    el.classList.add('picking');
  }
  function hidePick() { q('.op-pick').hidden = true; el.classList.remove('picking'); }

  function pickCountry(k) {
    const c = ctx.countries.find((x) => x.k === k); if (!c) return;
    ctx.onCountry(k); hidePick();
    queue = [
      { mood: 'happy', text: `${c.name}. ${c.fact}. That is our leverage.` },
      { mood: 'flat', text: 'Alone, it is not enough. Together with others, they have to listen.' },
      { pick: 'goal', mood: 'think', text: 'What safety rule do we fight for first?' },
    ];
    waiting = 'next'; advance();
  }
  function pickGoal(id) {
    const x = ctx.goals.find((g) => g.id === id); if (!x) return;
    ctx.onGoal(id); hidePick();
    queue = [{ mood: 'happy', text: `${x.short}. Good. Now fly out and win allies before the laws close.` }];
    waiting = 'next'; advance();
  }

  function onClick(e) {
    const b = e.target.closest('button');
    if (b?.classList.contains('op-skip')) return skip();
    if (b?.dataset.k) return pickCountry(b.dataset.k);
    if (b?.dataset.goal) return pickGoal(b.dataset.goal);
    if (!b) advance();
  }
  function onKey(e) {
    if (!el) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advance(); }
  }
  // Skipping still needs a country and a goal: jump straight to the next unanswered pick.
  function skip() {
    clearInterval(typing); queue = [];
    if (!ctx.hasCountry()) { say({ pick: 'country', mood: 'flat', text: 'Which country do you lead?' }); say.finish(); return; }
    if (!ctx.hasGoal()) { say({ pick: 'goal', mood: 'think', text: 'What safety rule do we fight for first?' }); say.finish(); return; }
    finish();
  }
  function finish() {
    if (!el) return;
    window.removeEventListener('keydown', onKey);
    const node = el; el = null;
    node.classList.remove('in');
    setTimeout(() => node.remove(), 300);
    ctx.onDone();
  }

  return { start, isOpen: () => !!el };
})();
