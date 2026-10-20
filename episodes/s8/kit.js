/* 시즌 8 공용 도구: 세로 무대(720×1280) 장면을 짓는 이징·글자 모션·길잡이·가로 틀.
   E76(v8-motion-code)은 같은 도구를 파일 안에 따로 갖고 있어요. 새 편은 여기서 가져다 써요. */
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const EO = p => 1 - Math.pow(1 - clamp(p), 3);                 /* 천천히 멈춤 */
export const SM = p => { p = clamp(p); return p * p * (3 - 2 * p); }; /* 양쪽 다 천천히 */
export const EXPO = p => (p = clamp(p)) >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
export const INTO = p => { p = clamp(p); return p * p * p; };
export const SP = p => { p = clamp(p) - 1; return 1 + 2.70158 * p * p * p + 1.70158 * p * p; };

/* 한글을 자판 누르는 순서대로 풀기: 한 → [ㅎ, 하, 한] (모션랩 typewriter에서) */
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', VOWEL = { 9: 8, 10: 8, 11: 8, 14: 13, 15: 13, 16: 13, 19: 18 }, TAIL = { 3: 1, 5: 4, 6: 4, 9: 8, 10: 8, 11: 8, 12: 8, 13: 8, 14: 8, 15: 8, 18: 17 };
const jamo = ch => {
  const code = ch.charCodeAt(0) - 0xac00;
  if (ch.length !== 1 || code < 0 || code > 11171) return [ch];
  const cho = Math.floor(code / 588), jung = Math.floor(code % 588 / 28), jong = code % 28, at = (j, k) => String.fromCharCode(0xac00 + cho * 588 + j * 28 + k);
  const list = [CHO[cho]];
  if (VOWEL[jung] !== undefined) list.push(at(VOWEL[jung], 0));
  list.push(at(jung, 0));
  if (jong) { if (TAIL[jong] !== undefined) list.push(at(jung, TAIL[jong])); list.push(ch); }
  return list;
};
export function typer(P, el, text, KEY = .06) {
  const chars = [], keys = [];
  Array.from(text).forEach(ch => {
    const span = P.h('span', { style: 'display:none' }, ch); el.append(span);
    chars.push({ el: span, full: ch, first: keys.length });
    jamo(ch).forEach(s => keys.push({ c: chars.length - 1, s, d: KEY * (ch === ' ' ? 1.3 : 1) * (0.75 + ((keys.length * 7) % 5) * .12) }));
    if (/[,.!?]/.test(ch)) keys[keys.length - 1].d += KEY * 3;
  });
  let at = 0; keys.forEach(k => { at += k.d; k.at = at; });
  chars.forEach((c, i) => { c.last = keys.length - 1 - [...keys].reverse().findIndex(k => k.c === i); });
  const caret = P.h('span', { class: 'k-caret' }); el.append(caret);
  return {
    total: at,
    at(age) {
      let n = 0; while (n < keys.length && keys[n].at <= age) n++;
      chars.forEach(c => { const on = n > c.first; c.el.style.display = on ? 'inline' : 'none'; const s = on ? keys[Math.min(n - 1, c.last)].s : c.full; if (c.el.textContent !== s) c.el.textContent = s; });
      caret.style.opacity = age < 0 ? 0 : (n < keys.length || (age % 1.06) < .53) ? 1 : 0;
    }
  };
}
/* 글자 올라오기: 글자마다 가림막 안에서 아래→제자리 */
export function riser(P, el, text) {
  const spans = Array.from(text).map(ch => { const m = P.h('span', { class: 'k-mask' }, P.h('span', { class: 'k-core' }, ch === ' ' ? ' ' : ch)); el.append(m); return m.firstChild; });
  return { at(t, T0, GAP = .035, RISE = .7) { spans.forEach((s, i) => { const p = EXPO(seg(t, T0 + i * GAP, T0 + i * GAP + RISE)); s.style.transform = `translateY(${(1 - p) * 110}%)`; s.style.opacity = p > 0 ? 1 : 0; }); } };
}
/* 숫자 롤링: 자리수마다 0~9가 굴러 올라가 목표 숫자에 멈춰요 */
export function odo(P, el, target, H = 30) {
  el.innerHTML = '';
  const cols = [];
  String(target).split('').forEach(ch => {
    const d = ch >= '0' && ch <= '9';
    const c = P.h('span', { class: 'k-odo', style: `height:${H}px;line-height:${H}px` });
    if (d) { const col = P.h('span', { class: 'k-odo-col' }, ...'01234567890123456789'.split('').map(x => P.h('span', { style: `height:${H}px;line-height:${H}px` }, x))); c.append(col); el.append(c); cols.push({ el: col, d: +ch }); }
    else { c.textContent = ch; el.append(c); }
  });
  return { at(p) { cols.forEach((c, i) => { c.el.style.transform = `translateY(${-(10 + c.d) * SM(seg(p, i * .08, 1)) * H}px)`; }); } };
}
/* 되풀이 미리보기 자리: period마다 1초 동안 들어와 멈췄다가 끝 0.35초에 흐려져요 */
export const WPOS = p => -40 + 90 * p;
export const loopIn = (el, t, T0, period = 2.5) => { if (t < T0) { el.style.left = `${WPOS(0)}%`; el.style.opacity = 0; return; } const c = (t - T0) % period; el.style.left = `${WPOS(EO(c / 1))}%`; el.style.opacity = c > period - .35 ? (period - c) / .35 : Math.min(1, c / .15 + .3); };

/* 공용 스타일(무대 안에 넣어요). 편마다 자기 CSS를 extra로 덧붙여요 */
export const KIT_CSS = `
.k-caret{display:inline-block;width:3px;height:1em;background:var(--acc2);vertical-align:-.12em;margin-left:2px}
.k-mask{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.1em .02em 0;margin:-.1em -.02em 0}
.k-core{display:inline-block;will-change:transform}
.k-odo{display:inline-block;overflow:hidden;vertical-align:top}
.k-odo-col{display:block;will-change:transform}
.k-odo-col span{display:block;text-align:center}
.k-big{position:absolute;font-size:46px;font-weight:800;line-height:1.2;color:var(--ink);letter-spacing:-.02em;text-align:center;white-space:nowrap}
.k-panel{position:absolute;border-radius:28px;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.9);box-shadow:0 20px 50px -30px rgba(27,31,36,.35)}
.k-card{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:14px 18px;box-shadow:0 14px 30px -22px rgba(27,31,36,.5);overflow:hidden}
.k-card h5{margin:0 0 6px;font-size:16px;font-weight:800;color:var(--muted2)}
.k-card p{margin:0;font-size:22px;font-weight:700;line-height:1.35;color:var(--ink)}
.k-track{position:absolute;left:60px;top:842px;width:330px;display:flex;flex-direction:column;gap:8px}
.k-step{display:flex;align-items:center;gap:12px;height:48px;padding:0 14px;border-radius:14px;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.8);opacity:0;will-change:transform}
.k-step b{font-size:22px;font-weight:800;color:var(--muted2);width:64px;white-space:nowrap}
.k-step span{font-size:17px;font-weight:700;color:var(--muted2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.k-step.on{background:#fff;border-color:var(--acc1);box-shadow:0 10px 24px -18px rgba(27,31,36,.5)}
.k-step.on b{color:var(--acc1)}
.k-step.on span{color:var(--ink)}
.k-wide{position:absolute;left:40px;top:22px;width:720px;height:1280px;transform:scale(.74);transform-origin:0 0}
`;
/* 가로 무대(1280×720)일 때: 세로 장면 전체를 왼쪽에 0.74배로 담은 틀을 돌려줘요. 세로 무대면 무대 그대로 */
export function frame(st, P, extraCss = '') {
  st.append(P.h('style', {}, KIT_CSS + extraCss));
  if (parseInt(st.style.width) <= parseInt(st.style.height)) return st;
  const g = P.h('div', { class: 'k-wide' }); st.append(g);
  const ln = st.querySelector('svg.lines'); if (ln) g.append(ln);
  g.__root = st; return g;
}
/* 쿼카: 세로면 아래 오른쪽, 가로면 오른쪽 아래 */
export function quokka(stage, P, pose) {
  const root = stage.__root || stage, wide = !!stage.__root;
  const q = P.quokka(wide ? { x: 1030, y: 380, size: 300, pose } : { x: 410, y: 820, size: 300, pose }); root.append(q.el); return q;
}
/* 쿼카 옆 길잡이: steps = [[이름, 설명], ...], lit = 켜 둘 줄 번호 */
export function track(stage, P, steps, lit) {
  const root = stage.__root || stage, wide = !!stage.__root;
  const el = P.h('div', { class: 'k-track', style: wide ? 'left:640px;top:96px' : '' });
  const rows = steps.map(([k, v], i) => { const r = P.h('div', { class: 'k-step' + (lit.includes(i) ? ' on' : '') }, P.h('b', {}, k), P.h('span', {}, v)); el.append(r); return r; });
  root.append(el);
  return { el, at(t, T0 = .4) { rows.forEach((r, i) => { const c = EXPO(seg(t, T0 + i * .12, T0 + i * .12 + .5)); r.style.opacity = c; r.style.transform = `translateX(${(1 - c) * -30}px)`; }); } };
}
