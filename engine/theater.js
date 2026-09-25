/* 타임라인 플레이어: 장면 목록을 순서대로 재생하고, 자막·음성·조작을 담당해요. */
import * as P from './parts.js';
import { tts } from './tts.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = sec => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
const SVG_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>';
const SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
const SVG_PREV = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h2v16H6zM20 4L9 12l11 8z"/></svg>';
const SVG_NEXT = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4h2v16h-2zM4 4l11 8-11 8z"/></svg>';
const SVG_VOICE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h4l5 4V6L7 10zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>';
const SVG_REPLAY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg>';

export function mountTheater(container, ep, { mode = 'watch', base = '' } = {}) {
  const scenes = ep.scenes;
  const total = scenes.reduce((a, sc) => a + sc.dur, 0);
  const offsets = scenes.map((_, i) => scenes.slice(0, i).reduce((a, sc) => a + sc.dur, 0));

  /* DOM */
  const stage = P.h('div', { class: 'stage', 'aria-hidden': 'true' });
  const lines = P.s('svg', { class: 'lines', viewBox: '0 0 1280 720' });
  const stageWrap = P.h('div', { class: 'stage-wrap' }, stage);
  const caption = P.h('div', { class: 'caption-bar', role: 'status', 'aria-live': 'polite' });
  const scrub = P.h('div', { class: 'scrub', role: 'group', 'aria-label': '장면 진행' });
  const controls = P.h('div', { class: 'controls' });
  const sceneList = P.h('div', { class: 'scene-list', role: 'group', 'aria-label': '장면 이동' });
  const root = P.h('div', { class: `theater mode-${mode}`, tabindex: '0', 'aria-label': `${ep.title} 애니메이션` }, stageWrap, caption, scrub, controls, sceneList);
  container.append(root);

  const btnPlay = P.h('button', { class: 'btn primary', type: 'button', 'aria-label': '재생', html: SVG_PLAY + '<span>재생</span>' });
  const btnPrev = P.h('button', { class: 'btn', type: 'button', 'aria-label': '이전 장면', html: SVG_PREV });
  const btnNext = P.h('button', { class: 'btn', type: 'button', 'aria-label': '다음 장면', html: SVG_NEXT });
  const btnVoice = P.h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false', 'aria-label': '음성 켜기', html: SVG_VOICE + '<span>음성</span>' });
  const time = P.h('span', { class: 'time' }, `0:00 / ${fmt(total)}`);
  controls.append(btnPlay, btnPrev, btnNext, btnVoice, P.h('span', { class: 'sp' }), time);
  if (!tts.supported) { btnVoice.disabled = true; btnVoice.title = '이 브라우저는 음성 합성을 지원하지 않아요'; }

  const segs = scenes.map((sc, i) => {
    const b = P.h('button', { type: 'button', 'aria-label': `${i + 1}. ${sc.title}`, title: sc.title }, P.h('i'));
    b.addEventListener('click', () => goto(i, 0, true));
    scrub.append(b); return b;
  });
  const chips = scenes.map((sc, i) => {
    const b = P.h('button', { type: 'button' }, `${i + 1} ${sc.title}`);
    b.addEventListener('click', () => goto(i, 0, true));
    sceneList.append(b); return b;
  });

  /* 크기 맞춤 */
  const fit = () => { const w = stageWrap.clientWidth; stage.style.transform = `scale(${w / 1280})`; };
  new ResizeObserver(fit).observe(stageWrap); fit();

  /* 상태 */
  let idx = -1, localT = 0, playing = false, raf = 0, last = 0, tick = null, tl = null, curCap = -1, ended = false;
  const listeners = { end: [], scene: [], play: [] };
  const emit = (k, ...a) => listeners[k].forEach(f => f(...a));

  function build(i) {
    idx = i; const sc = scenes[i];
    stage.replaceChildren(lines); lines.replaceChildren();
    tl = P.timeline();
    stage.append(P.h('div', { class: 'scene-title p-timed' }, P.h('b', {}, `${i + 1}/${scenes.length}`), sc.title));
    tl.at(stage.lastElementChild, 0, { from: 'none', dur: .3 });
    const r = sc.build({ stage, lines, P, tl, dur: sc.dur, reduced: REDUCED, base }) || {};
    tick = r.tick || null;
    curCap = -1;
    segs.forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
    chips.forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
    emit('scene', i);
  }

  function render() {
    const sc = scenes[idx];
    tl.update(localT, REDUCED);
    if (tick) tick(localT);
    /* 자막 */
    let ci = -1;
    for (let k = 0; k < sc.captions.length; k++) if (sc.captions[k].t <= localT) ci = k;
    if (ci !== curCap) {
      curCap = ci;
      const txt = ci >= 0 ? sc.captions[ci].text : '';
      caption.innerHTML = txt ? `<span>${txt}</span>` : '';
      if (playing) tts.speak(txt);
    }
    segs.forEach((b, j) => { b.firstElementChild.style.width = j < idx ? '100%' : j === idx ? `${(localT / sc.dur) * 100}%` : '0'; });
    time.textContent = `${fmt(offsets[idx] + localT)} / ${fmt(total)}`;
  }

  function loop(now) {
    if (!playing) return;
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    localT += dt;
    if (localT >= scenes[idx].dur) {
      if (idx + 1 < scenes.length) { build(idx + 1); localT = 0; }
      else { localT = scenes[idx].dur; render(); finish(); return; }
    }
    render();
    raf = requestAnimationFrame(loop);
  }

  function play() {
    if (ended) { ended = false; endCard?.remove(); endCard = null; build(0); localT = 0; }
    if (playing) return;
    playing = true; last = performance.now();
    btnPlay.innerHTML = SVG_PAUSE + '<span>멈춤</span>'; btnPlay.setAttribute('aria-label', '멈춤');
    root.classList.add('playing');
    /* 현재 자막을 다시 읽어 주기 */
    curCap = -1; render();
    raf = requestAnimationFrame(loop); emit('play', true);
  }
  function pause() {
    if (!playing) return;
    playing = false; cancelAnimationFrame(raf); tts.stop();
    btnPlay.innerHTML = SVG_PLAY + '<span>재생</span>'; btnPlay.setAttribute('aria-label', '재생');
    root.classList.remove('playing'); emit('play', false);
  }
  function goto(i, t = 0, keepPlaying = false) {
    i = P.clamp(i, 0, scenes.length - 1);
    const wasPlaying = playing || keepPlaying;
    if (playing) { playing = false; cancelAnimationFrame(raf); tts.stop(); }
    if (ended) { ended = false; endCard?.remove(); endCard = null; }
    build(i); localT = t; render();
    if (wasPlaying && mode !== 'idle') { playing = false; play(); }
  }
  let endCard = null;
  function finish() {
    playing = false; ended = true; cancelAnimationFrame(raf);
    btnPlay.innerHTML = SVG_REPLAY + '<span>다시</span>'; btnPlay.setAttribute('aria-label', '다시 보기');
    root.classList.remove('playing');
    endCard = P.h('div', { class: 'end-card' },
      P.h('h3', {}, ep.title),
      P.h('p', {}, mode === 'rec' ? '경기 AI융합교육연구회 Q.U.O.K.A · 쿼카 AI 개념극장' : '아래에서 직접 만져 보고, 학생에게 할 한 문장을 챙겨 가세요.'),
      mode === 'rec' ? null : P.h('button', { class: 'btn', type: 'button', onclick: () => play() }, '다시 보기'));
    stageWrap.append(endCard);
    emit('end');
  }

  btnPlay.addEventListener('click', () => playing ? pause() : play());
  btnPrev.addEventListener('click', () => goto(localT > 1.5 ? idx : idx - 1, 0));
  btnNext.addEventListener('click', () => goto(idx + 1, 0));
  const syncVoice = () => { btnVoice.setAttribute('aria-pressed', tts.enabled ? 'true' : 'false'); btnVoice.setAttribute('aria-label', tts.enabled ? '음성 끄기' : '음성 켜기'); };
  btnVoice.addEventListener('click', () => { tts.toggle(); syncVoice(); if (tts.enabled && playing) { curCap = -1; render(); } });
  tts.init(); syncVoice();

  /* 키보드 */
  root.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); playing ? pause() : play(); }
    else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goto(idx + 1, 0); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goto(localT > 1.5 ? idx : idx - 1, 0); }
    else if (e.key === 'v' || e.key === 'V') { tts.toggle(); syncVoice(); }
    else if (e.key === 'Home') { goto(0, 0); }
  });

  build(0); render();
  const api = {
    root, stage, play, pause, goto, toggle: () => playing ? pause() : play(),
    next: () => { if (idx + 1 < scenes.length) { goto(idx + 1, 0); return true; } return false; },
    prev: () => { if (idx > 0) { goto(idx - 1, 0); return true; } return false; },
    get index() { return idx; }, get playing() { return playing; }, get ended() { return ended; }, get count() { return scenes.length; },
    on(k, f) { listeners[k].push(f); return api; },
    startCard(label = '재생') {
      const card = P.h('div', { class: 'start-card', role: 'button', tabindex: '0', 'aria-label': label }, P.h('div', { class: 'play', html: SVG_PLAY }));
      const go = () => { card.remove(); api.play(); };
      card.addEventListener('click', go); card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(); });
      stageWrap.append(card); return card;
    }
  };
  return api;
}
