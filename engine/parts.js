/* 장면 부품: 쿼카 해설자, 말풍선, 화살표, 상자, 토큰 칩, 노이즈 캔버스, 글자.
   무대는 1280×720 좌표계. 모든 부품은 절대 위치 HTML 또는 SVG 선 레이어에 올라가요. */

const SVG_NS = 'http://www.w3.org/2000/svg';
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = t => (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
export const easeOut = t => 1 - Math.pow(1 - t, 3);
/* 결정적 난수(시드 고정) */
export function rng(seed) {
  let s = (seed >>> 0) || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
}

/* 예전 브랜드 색을 편별 팔레트 변수로 바꿔요. 에피소드 파일을 고치지 않고 색을 갈아입히기 위한 매핑. */
const COLOR_MAP = {
  '#127e90': 'var(--acc1)', '#2bb3c9': 'var(--acc1)', '#bfe3e9': 'var(--acc1-pale)', '#eaf7fa': 'var(--acc1-pale)',
  '#f2812d': 'var(--acc2)', '#b3520f': 'var(--acc2)', '#f9d3b8': 'var(--acc2-pale)', '#7a3b10': 'var(--acc2)',
  '#1b1f24': 'var(--ink-soft)', '#9aa5af': 'var(--muted2)', '#6b4a2e': 'var(--acc2)'
};
export function mapColor(c) {
  if (!c || typeof c !== 'string') return c;
  const k = c.trim().toLowerCase();
  return COLOR_MAP[k] || c;
}
const mapStyle = css => css.replace(/#[0-9a-fA-F]{6}/g, m => mapColor(m));
/* 장면을 다 만든 뒤, 코드가 직접 박아 넣은 인라인 색까지 팔레트 변수로 바꿔요. */
export function remapInlineColors(root) {
  root.querySelectorAll('[style]').forEach(el => { const c = el.style.cssText; if (/#[0-9a-fA-F]{6}/.test(c)) { const m = mapStyle(c); if (m !== c) el.style.cssText = m; } });
  root.querySelectorAll('[fill],[stroke]').forEach(el => { for (const a of ['fill', 'stroke']) { const v = el.getAttribute(a); if (v && /^#[0-9a-fA-F]{6}$/.test(v)) { const m = mapColor(v); if (m !== v) el.setAttribute(a, m); } } });
}

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'style') el.style.cssText = mapStyle(v);
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
}
export function s(tag, attrs = {}, ...kids) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== undefined) el.setAttribute(k, v);
  for (const kid of kids.flat()) if (kid != null) el.append(kid);
  return el;
}

/* ── 쿼카 해설자(연구회 캐릭터 이미지) ─────────
   assets/char/{pose}.webp|png 가 있으면 그 포즈를, 없으면 기본 스티커를 써요.
   어떤 파일이 있는지는 assets/manifest.js 에 적어요(404 콘솔 오류를 남기지 않으려고). */
export const POSES = ['base', 'point', 'think', 'oops', 'tablet', 'wave', 'dice', 'glass', 'idea', 'globe'];
const charMap = new Map();
export let KEYS = {};
let charReadyP = null;
export function charReady(base = '') {
  if (charReadyP) return charReadyP;
  charReadyP = (async () => {
    try {
      const m = (await import(new URL('../assets/manifest.js', import.meta.url).href)).default;
      for (const [pose, ext] of Object.entries(m.char || {})) charMap.set(pose, `${base}assets/char/${pose}.${ext}`);
      KEYS = m.key || {}; OUTFITS = m.outfits || {};
    } catch (e) { charMap.set('idea', `${base}assets/char/idea.webp`); }
  })();
  return charReadyP;
}
export function keySrc(name, base = '') { return KEYS[name] ? `${base}assets/key/${name}.${KEYS[name]}` : null; }
/* 편별 의상: setOutfit(slug) 뒤에는 assets/char/{slug}/{pose}.webp 를 먼저 찾고, 'base'는 그 편 키비주얼을 써요. */
let OUTFIT = null, OUTFITS = {};
export function setOutfit(slug) { OUTFIT = slug; }
export function outfitSrc(pose, base = '') {
  if (!OUTFIT) return null;
  const list = OUTFITS[OUTFIT] || [];
  if (list.includes(pose)) return `${base}assets/char/${OUTFIT}/${pose}.webp`;
  if (pose === 'base' || pose === 'idea') return keySrc(OUTFIT, base);
  return null;
}
const FALLBACK = { idea: 'base', globe: 'base', think: 'base', oops: 'base', tablet: 'base', wave: 'base', dice: 'base', glass: 'point', point: 'base' };
export function charSrc(pose = 'base', base = '') {
  const o = outfitSrc(pose, base) || (FALLBACK[pose] ? outfitSrc(FALLBACK[pose], base) : null);
  if (o) return o;
  return charMap.get(pose) || charMap.get(FALLBACK[pose] || 'base') || charMap.get('base') || `${base}assets/char/base.webp`;
}

export function quokka({ x = 80, y = 380, size = 240, flip = false, pose = 'base', base = '' } = {}) {
  const el = h('div', { class: 'p-quokka', style: `left:${x}px;top:${y}px;height:${size}px;width:${Math.round(size * 0.66)}px` });
  const img = h('img', { src: charSrc(pose, base), alt: '', draggable: 'false' });
  el.append(img);
  if (flip) el.classList.add('flip');
  const api = {
    el,
    /* t: 장면 시간. 숨쉬기와 말하기 흔들림을 시간으로 계산해 되감기해도 같아요. */
    tick(t, talking = false) {
      const breathe = Math.sin(t * 2.2) * 1.5;
      const talk = talking ? Math.sin(t * 16) * 1.2 : 0;
      img.style.transform = `translateY(${breathe + talk}px) rotate(${talking ? Math.sin(t * 8) * 1.2 : 0}deg)`;
    },
    pose(p) { img.src = charSrc(p, base); },
    mood(m) { el.dataset.mood = m; }
  };
  return api;
}

/* ── 말풍선 ───────────────────────────────── */
export function bubble({ x, y, w = 420, text = '', tail = 'left', size = 26, tone = '' } = {}) {
  const el = h('div', { class: `p-bubble tail-${tail} ${tone}`, style: `left:${x}px;top:${y}px;width:${w}px;font-size:${size}px` });
  el.innerHTML = text;
  return { el, set(t) { el.innerHTML = t; } };
}

/* ── 도식 상자 ─────────────────────────────── */
export function box({ x, y, w = 220, h: hh = 90, label = '', sub = '', accent = '', icon = '' } = {}) {
  const el = h('div', { class: `p-box ${accent ? 'acc-' + accent : ''}`, style: `left:${x}px;top:${y}px;width:${w}px;height:${hh}px` });
  if (icon) el.append(h('span', { class: 'p-box-icon', html: icon }));
  const t = h('div', { class: 'p-box-t' }, label);
  el.append(t);
  if (sub) el.append(h('div', { class: 'p-box-s', html: sub }));
  return { el, set(l, sb) { t.textContent = l; if (sb != null) { const sEl = el.querySelector('.p-box-s'); if (sEl) sEl.innerHTML = sb; } }, on(v = true) { el.classList.toggle('on', v); } };
}

/* ── 글자 ─────────────────────────────────── */
export function text({ x, y, w = 600, text = '', size = 28, weight = 600, color = '', align = 'left', cls = '' } = {}) {
  const el = h('div', { class: `p-text ${cls}`, style: `left:${x}px;top:${y}px;width:${w}px;font-size:${size}px;font-weight:${weight};text-align:${align};${color ? 'color:' + mapColor(color) : ''}` });
  el.innerHTML = text;
  return { el, set(t) { el.innerHTML = t; } };
}

/* ── 토큰 칩 ───────────────────────────────── */
export function chip({ x, y, text = '', color = 'aqua', size = 24 } = {}) {
  const el = h('span', { class: `p-chip c-${color}`, style: `left:${x}px;top:${y}px;font-size:${size}px` }, text);
  return { el };
}

/* ── 화살표(SVG 선 레이어) ─────────────────── */
export function arrow(lines, { x1, y1, x2, y2, curve = 0, dashed = false, color = 'currentColor', width = 4, head = true } = {}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len * curve, ny = dx / len * curve;
  const d = curve ? `M${x1} ${y1} Q${mx + nx} ${my + ny} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
  color = mapColor(color);
  const path = s('path', { d, fill: 'none', stroke: color, 'stroke-width': width, 'stroke-linecap': 'round', class: 'p-arrow' });
  if (dashed) path.setAttribute('stroke-dasharray', '10 10');
  const g = s('g', { class: 'p-arrow-g' }, path);
  let headEl = null;
  if (head) {
    headEl = s('path', { d: 'M-14 -9 L0 0 L-14 9', fill: 'none', stroke: color, 'stroke-width': width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    g.append(headEl);
  }
  lines.append(g);
  const total = path.getTotalLength();
  const api = {
    el: g,
    draw(p) {
      p = clamp(p, 0, 1);
      if (!dashed) { path.setAttribute('stroke-dasharray', total); path.setAttribute('stroke-dashoffset', total * (1 - p)); }
      g.style.opacity = p > 0 ? 1 : 0;
      if (headEl) {
        const pt = path.getPointAtLength(total * p), pt2 = path.getPointAtLength(Math.max(0, total * p - 2));
        const a = Math.atan2(pt.y - pt2.y, pt.x - pt2.x) * 180 / Math.PI;
        headEl.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${a})`);
        headEl.style.opacity = p > .05 ? 1 : 0;
      }
    }
  };
  api.draw(0);
  return api;
}

/* ── 노이즈 캔버스(확산 모델용) ────────────── */
export function noise({ x, y, w = 320, h: hh = 320, seed = 7 } = {}) {
  const c = h('canvas', { class: 'p-noise', width: w, height: hh, style: `left:${x}px;top:${y}px;width:${w}px;height:${hh}px` });
  const ctx = c.getContext('2d');
  const r = rng(seed);
  const base = new Float32Array(w * hh);
  for (let i = 0; i < base.length; i++) base[i] = r();
  const img = ctx.createImageData(w, hh);
  let src = null;
  return {
    el: c,
    /* source: 이미지 요소(같은 크기로 그려짐). 없으면 순수 잡음. */
    source(imgEl) { src = imgEl; },
    /* level 1 = 완전 잡음, 0 = 원본 */
    set(level) {
      level = clamp(level, 0, 1);
      if (src) { ctx.drawImage(src, 0, 0, w, hh); }
      else { ctx.fillStyle = '#e9eef2'; ctx.fillRect(0, 0, w, hh); }
      const d = ctx.getImageData(0, 0, w, hh);
      const px = d.data;
      const amp = 255 * level;
      const keep = 1 - level;
      for (let i = 0, j = 0; i < px.length; i += 4, j++) {
        const n = (base[j] - .5) * 2 * amp;
        px[i] = px[i] * keep + 128 * level + n;
        px[i + 1] = px[i + 1] * keep + 128 * level + n;
        px[i + 2] = px[i + 2] * keep + 128 * level + n;
      }
      ctx.putImageData(d, 0, 0);
    }
  };
}

/* ── 아이콘(간단 라인) ─────────────────────── */
export const ICON = {
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  click: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l7 17 2.5-7.5L21 11z"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h8l6 6v14H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h12l4 4v12H4z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5a2 2 0 1 1 4 0v6M12 11V4a2 2 0 1 1 4 0v7M16 11V6a2 2 0 1 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L3.6 14a2 2 0 0 1 3.4-2l1 1.3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a3 3 0 0 0-3 3v10a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3z"/><path d="M9 8H7a3 3 0 0 0 0 6h2M15 8h2a3 3 0 0 1 0 6h-2M9 14H8a3 3 0 0 0 0 6h1M15 14h1a3 3 0 0 1 0 6h-1"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/><circle cx="16" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="8" cy="16" r="1.4" fill="currentColor"/><circle cx="16" cy="16" r="1.4" fill="currentColor"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
  desk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9h18M5 9v10M19 9v10M3 9l2-4h14l2 4"/></svg>'
};

/* 시간표대로 나타나기: theater가 tick마다 update(t)를 불러요. */
export function timeline() {
  const items = [];
  return {
    at(el, t0, { from = 'up', dur = .5, until = Infinity, dist = 24 } = {}) {
      const node = el.el || el;
      node.classList.add('p-timed');
      items.push({ node, t0, dur, until, from, dist });
      return el;
    },
    update(t, reduced) {
      for (const it of items) {
        let p = clamp((t - it.t0) / it.dur, 0, 1);
        if (t > it.until) p = clamp(1 - (t - it.until) / .35, 0, 1);
        if (reduced) p = p > 0 ? 1 : 0;
        if (t < it.t0) p = 0;
        const e = easeOut(p);
        it.node.style.opacity = e;
        const d = (1 - e) * it.dist;
        const tr = it.from === 'up' ? `translateY(${d}px)` : it.from === 'down' ? `translateY(${-d}px)` : it.from === 'left' ? `translateX(${-d}px)` : it.from === 'right' ? `translateX(${d}px)` : it.from === 'pop' ? `scale(${.85 + .15 * e})` : '';
        it.node.style.transform = tr;
        it.node.style.visibility = p === 0 ? 'hidden' : 'visible';
      }
    }
  };
}
