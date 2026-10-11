/* S8-76 손이 없는데 모션그래픽은 어떻게 만들까: 세로 무대(720×1280), 6장면 95초
   본론: 움직임은 숫자 표 → 표는 글로 적을 수 있음 → 클로드는 설명과 코드가 짝지어진 글을 엄청나게 읽음 → 말을 낱말로 쪼개 외운 코드 조각을 붙임 → 못 보니 찍어서 확인
   모션 기법은 쿼카 모션랩(gottkf1208.github.io/quoka-motion-lab)에서 가져왔어요: 자모 타이핑, 글자 올라오기, 숫자 롤링, 돋보기, 스포트라이트, 형광펜, 색종이 */
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const EO = p => 1 - Math.pow(1 - clamp(p), 3);                 /* 천천히 멈춤 */
const SM = p => { p = clamp(p); return p * p * (3 - 2 * p); }; /* 양쪽 다 천천히 */
const EXPO = p => (p = clamp(p)) >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
const INTO = p => { p = clamp(p); return p * p * p; };
const SP = p => { p = clamp(p) - 1; return 1 + 2.70158 * p * p * p + 1.70158 * p * p; };
const BOUNCE = p => { p = clamp(p); const n = 7.5625, d = 2.75; return p < 1 / d ? n * p * p : p < 2 / d ? n * (p -= 1.5 / d) * p + .75 : p < 2.5 / d ? n * (p -= 2.25 / d) * p + .9375 : n * (p -= 2.625 / d) * p + .984375; };
const WPOS = p => -40 + 90 * p; /* 글자 중심: -40%(왼쪽 밖) → 50%(가운데) */
/* 되풀이 미리보기: period마다 1초 동안 들어와 멈췄다가 끝 0.35초에 흐려져요 */
const loopIn = (el, t, T0, period = 2.5) => { if (t < T0) { el.style.left = `${WPOS(0)}%`; el.style.opacity = 0; return; } const c = (t - T0) % period; el.style.left = `${WPOS(EO(c / 1))}%`; el.style.opacity = c > period - .35 ? (period - c) / .35 : Math.min(1, c / .15 + .3); };
const CODE = ['@keyframes in {', '  from { left: -100% }', '  to   { left: 50% }', '}', 'animation: in 1s ease-out;'];
const TITLE = '2026 가을 체육대회';

/* ── 모션랩에서 가져온 기법 ───────────────────────────── */
/* 한글을 자판 누르는 순서대로 풀기: 한 → [ㅎ, 하, 한] */
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
/* 자모 타이핑기: el 안에 글자 span을 만들고, at(age)로 그 시각까지 친 모양을 보여줘요 */
function typer(P, el, text, KEY = .06) {
  const chars = [], keys = [];
  Array.from(text).forEach(ch => {
    const span = P.h('span', { style: 'display:none' }, ch); el.append(span);
    chars.push({ el: span, full: ch, first: keys.length });
    jamo(ch).forEach(s => keys.push({ c: chars.length - 1, s, d: KEY * (ch === ' ' ? 1.3 : 1) * (0.75 + ((keys.length * 7) % 5) * .12) }));
    if (/[,.!?]/.test(ch)) keys[keys.length - 1].d += KEY * 3;
  });
  let at = 0; keys.forEach(k => { at += k.d; k.at = at; });
  chars.forEach((c, i) => { c.last = keys.length - 1 - [...keys].reverse().findIndex(k => k.c === i); });
  const caret = P.h('span', { class: 'mc-caret' }); el.append(caret);
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
function riser(P, el, text) {
  const spans = Array.from(text).map(ch => { const m = P.h('span', { class: 'mc-mask' }, P.h('span', { class: 'mc-core' }, ch === ' ' ? ' ' : ch)); el.append(m); return m.firstChild; });
  return { at(t, T0, GAP = .035, RISE = .7) { spans.forEach((s, i) => { const p = EXPO(seg(t, T0 + i * GAP, T0 + i * GAP + RISE)); s.style.transform = `translateY(${(1 - p) * 110}%)`; s.style.opacity = p > 0 ? 1 : 0; }); } };
}
/* 숫자 롤링: 자리수마다 0~9가 굴러 올라가 목표 숫자에 멈춰요 */
function odo(P, el, target) {
  el.innerHTML = '';
  const cols = [];
  String(target).split('').forEach(ch => {
    const d = ch >= '0' && ch <= '9';
    const c = P.h('span', { class: 'mc-odo' }); if (d) { const col = P.h('span', { class: 'mc-odo-col' }, ...'01234567890123456789'.split('').map(x => P.h('span', {}, x))); c.append(col); el.append(c); cols.push({ el: col, d: +ch }); } else { c.textContent = ch; el.append(c); }
  });
  return { at(p) { cols.forEach((c, i) => { c.el.style.transform = `translateY(${-(10 + c.d) * SM(seg(p, i * .08, 1)) * 30}px)`; }); } };
}

const CSS = `
.mc-panel{position:absolute;border-radius:28px;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.9);box-shadow:0 20px 50px -30px rgba(27,31,36,.35)}
.mc-say{position:absolute;font-size:26px;font-weight:700;line-height:1.45;color:var(--ink)}
.mc-caret{display:inline-block;width:3px;height:1em;background:var(--acc2);vertical-align:-.12em;margin-left:2px}
.mc-big{position:absolute;font-size:46px;font-weight:800;line-height:1.2;color:var(--ink);letter-spacing:-.02em;text-align:center;white-space:nowrap}
.mc-mask{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.1em .02em 0;margin:-.1em -.02em 0}
.mc-core{display:inline-block;will-change:transform}
.mc-code{position:absolute;border-radius:18px;background:var(--ink-soft);color:#fff;padding:14px 20px;font-family:var(--mono);font-size:20px;line-height:1.7;box-sizing:border-box}
.mc-file{font-size:15px;color:var(--muted2);margin-bottom:2px}
.mc-line{white-space:pre;min-height:1.7em}
.mc-screen{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);overflow:hidden;box-sizing:border-box}
.mc-mid{position:absolute;left:50%;top:10%;height:80%;border-left:2px dashed var(--muted2);opacity:.7}
.mc-word{position:absolute;top:50%;left:-40%;transform:translate(-50%,-50%);font-weight:800;font-size:36px;color:var(--acc1);white-space:nowrap;letter-spacing:-.02em}
.mc-word.sm{font-size:24px}
.mc-tbl{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:10px 18px;font-size:22px;font-weight:700}
.mc-tr{display:flex;justify-content:space-between;height:40px;align-items:center;border-bottom:1px solid rgba(27,31,36,.06);opacity:0;transition:opacity .25s;padding:0 8px}
.mc-tr.on{opacity:1}
.mc-tr.hd{opacity:1;color:var(--muted2);font-size:18px}
.mc-tr b{font-family:var(--mono);color:var(--acc1);height:30px;line-height:30px;display:inline-flex;align-items:flex-start}
.mc-odo{display:inline-block;height:30px;overflow:hidden;line-height:30px;vertical-align:top}
.mc-odo-col{display:block;will-change:transform}
.mc-odo-col span{display:block;height:30px;line-height:30px;text-align:center}
.mc-tr.hot{background:var(--acc2-pale);border-radius:8px}
.mc-card{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:14px 18px;box-shadow:0 14px 30px -22px rgba(27,31,36,.5);overflow:hidden}
.mc-card h5{margin:0 0 6px;font-size:16px;font-weight:800;color:var(--muted2)}
.mc-card p{margin:0;font-size:22px;font-weight:700;line-height:1.35}
.mc-card .mono{font-family:var(--mono);font-size:18px;line-height:1.5;white-space:pre}
.mc-card .hl{position:relative;padding:0 3px}
.mc-punch{position:absolute;left:60px;top:690px;width:600px;text-align:center;font-size:60px;font-weight:900;letter-spacing:-.04em;color:var(--ink);white-space:nowrap;transform-origin:50% 50%;opacity:0}
.mc-punch i{display:block;height:8px;border-radius:4px;background:var(--acc2);margin:4px auto 0;transform-origin:0 50%}
.mc-rain{position:absolute;left:0;top:0;width:250px;height:92px;border-radius:12px;background:#fff;border:1px solid rgba(27,31,36,.1);box-sizing:border-box;padding:10px 12px;box-shadow:0 8px 16px -12px rgba(27,31,36,.6);will-change:transform;opacity:0}
.mc-rain em{display:block;font-style:normal;font-size:15px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden}
.mc-rain code{display:block;font-family:var(--mono);font-size:13px;color:var(--acc1);white-space:nowrap;overflow:hidden;margin-top:4px}
.mc-lens{position:absolute;left:0;top:0;width:240px;height:240px;border-radius:50%;overflow:hidden;background:#fff;border:6px solid var(--ink);box-shadow:0 24px 50px -20px rgba(27,31,36,.6);opacity:0;will-change:transform}
.mc-lens .mc-rain{opacity:1;box-shadow:none;border:0;transform-origin:0 0}
.mc-handle{position:absolute;left:0;top:0;width:120px;height:18px;border-radius:9px;background:var(--ink);transform-origin:0 50%;opacity:0}
.mc-chip{position:absolute;font-size:24px;font-weight:800;padding:8px 16px;border-radius:999px;background:#fff;border:2px solid rgba(27,31,36,.1);color:var(--ink);white-space:nowrap;box-sizing:border-box;transition:border-color .2s,background .2s,color .2s}
.mc-chip.on{border-color:var(--acc2);background:var(--acc2-pale);color:var(--acc2)}
.mc-spot{position:absolute;left:0;top:0;width:300px;height:56px;border-radius:999px;box-shadow:0 0 0 2000px rgba(27,31,36,.42);pointer-events:none;opacity:0}
.mc-frag{position:absolute;left:0;top:0;font-family:var(--mono);font-size:20px;font-weight:700;color:#fff;background:var(--acc2);padding:4px 10px;border-radius:8px;white-space:nowrap;will-change:transform;opacity:0}
.mc-slot{display:inline-block;min-width:60px;border-bottom:2px dashed rgba(255,255,255,.4);color:rgba(255,255,255,.35)}
.mc-slot.on{border-bottom-color:transparent;color:var(--acc2)}
.mc-col{position:absolute;border-radius:20px;background:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.9);box-sizing:border-box;padding:16px 18px}
.mc-col h4{margin:0 0 10px;font-size:24px;font-weight:800}
.mc-col ul{margin:0;padding:0}
.mc-col li{list-style:none;font-size:21px;font-weight:700;line-height:1.5;overflow:hidden}
.mc-col li span{display:block;will-change:transform}
.mc-col.bad h4{color:var(--acc2)}
.mc-ask{position:absolute;font-size:24px;font-weight:700;line-height:1.4;color:var(--ink);background:rgba(255,255,255,.9);border-radius:16px;padding:12px 16px;box-sizing:border-box;border:1px solid rgba(27,31,36,.08)}
.mc-ask b{color:var(--acc1);display:inline-block;will-change:transform,filter}
.mc-conf{position:absolute;left:0;top:0;width:10px;height:16px;border-radius:2px;opacity:0;will-change:transform}
.mc-count{position:absolute;left:0;top:0;width:260px;height:260px;border-radius:50%;display:grid;place-items:center;font-size:120px;font-weight:800;color:var(--ink);letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.mc-count i{position:absolute;inset:0;border-radius:50%;border:2px solid var(--ink);opacity:.5}
.mc-count b{position:absolute;inset:14px;border-radius:50%}
.mc-count span{position:absolute;inset:0;display:grid;place-items:center}
`;
const sty = (stage, P) => stage.append(P.h('style', {}, CSS));
const codeBlock = (P, style) => {
  const el = P.h('div', { class: 'mc-code', style });
  el.append(P.h('div', { class: 'mc-file' }, 'title.html'));
  const slots = {};
  const mk = (k, w) => { const s = P.h('span', { class: 'mc-slot', style: `min-width:${w}px` }, ''); slots[k] = s; return s; };
  el.append(P.h('div', { class: 'mc-line' }, '@keyframes in {'));
  el.append(P.h('div', { class: 'mc-line' }, '  from { ', mk('from', 130), ' }'));
  el.append(P.h('div', { class: 'mc-line' }, '  to   { ', mk('to', 130), ' }'));
  el.append(P.h('div', { class: 'mc-line' }, '}'));
  el.append(P.h('div', { class: 'mc-line' }, 'animation: in ', mk('dur', 40), ' ', mk('ease', 110), ';'));
  return { el, slots };
};
const PAIRS = [
  ['slide in from left', 'from { left: -100% }'], ['fade in softly', 'from { opacity: 0 }'], ['bounce on landing', 'ease: bounce'],
  ['왼쪽에서 들어오기', 'translateX(-100%)'], ['slow stop', 'ease-out'], ['pop in', 'scale(0) → scale(1)'],
  ['typing text', 'steps(20)'], ['천천히 멈춤', 'ease-out'], ['slide in from left', 'translateX(-100%) → 0'],
  ['spin once', 'rotate(360deg)'], ['fade out', 'to { opacity: 0 }'], ['왼쪽에서 들어와', 'from { left: -100% }']
];
const pairCard = (P, i) => { const [d, c] = PAIRS[(i + 1) % PAIRS.length]; return P.h('div', { class: 'mc-rain' }, P.h('em', {}, d), P.h('code', {}, c)); };

export default {
  slug: 'v8-motion-code',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  title: '손이 없는데 모션그래픽은 어떻게 만들까',
  subtitle: '움직임은 숫자 표, 그 표는 글로 적어요',
  summary: '제목 글자가 미끄러져 들어오게 해 달라고 하면 클로드는 영상을 상상하지 않아요. 움직임은 숫자 표거든요. 몇 초에 어디 있는지 적어 둔 표인데 이 표는 글로 옮겨 적을 수도 있고요. 클로드는 설명과 코드가 짝을 이룬 글을 인터넷에서 엄청나게 읽었어요. 그래서 부탁 속 낱말마다 어떤 코드 조각이 따라오는지 외워 두고 있죠. 그 조각들을 이어 붙여 글을 쓰면 브라우저가 그 글을 읽고 움직임으로 그려 내요. 글이 맞게 쓰였는지는 사진을 찍어 확인하고요.',
  keywords: ['모션그래픽', '키프레임', '숫자 표', '코드', '학습 데이터', '패턴', '이징', '천천히 멈춤', '확인'],

  scenes: [
    /* 1 ── 카운트다운, 부탁 한 줄(자모 타이핑), 질문(글자 올라오기) */
    {
      title: '부탁 한 줄', dur: 13,
      captions: [
        { t: 1.5, text: '부탁은 한 줄이에요.' },
        { t: 5.5, text: '클로드는 손도 눈도 없어요.' },
        { t: 9, text: '그런데도 영상을 만들어 내요. 어떻게요?' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const cd = P.h('div', { class: 'mc-count', style: 'left:230px;top:300px' }, P.h('i'), P.h('b'), P.h('span', {}, '3'));
        stage.append(cd);
        const panel = P.h('div', { class: 'mc-panel', style: 'left:60px;top:110px;width:600px;height:690px;opacity:0' }); stage.append(panel);
        const ask = P.h('div', { class: 'mc-say', style: 'left:90px;top:150px;width:540px;opacity:0' }); stage.append(ask);
        const ty = typer(P, ask, '제목 글자가 왼쪽에서 들어와 가운데 서게 해 줘', .055);
        const q1 = P.h('div', { class: 'mc-big', style: 'left:60px;top:330px;width:600px' }); stage.append(q1);
        const rq = riser(P, q1, '손도 눈도 없는데?');
        const got = P.chip({ x: 90, y: 480, text: '1분 뒤, 영상이 왔어요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(got.el), 9.2, { from: 'pop' });
        const prev = P.h('div', { class: 'mc-screen', style: 'left:90px;top:560px;width:540px;height:200px;opacity:0' });
        const word = P.h('div', { class: 'mc-word' }, TITLE);
        prev.append(P.h('div', { class: 'mc-mid' }), word); stage.append(prev);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'oops' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 12);
            /* 0~1.5초: 필름 카운트다운 3·2·1 */
            const n = 3 - Math.floor(t / .5), turn = (t % .5) / .5;
            cd.style.opacity = t < 1.5 ? 1 : 0; cd.lastChild.textContent = String(Math.max(1, n));
            cd.querySelector('b').style.background = `conic-gradient(var(--acc2-pale) ${turn * 360}deg, transparent 0)`;
            panel.style.opacity = SM(seg(t, 1.4, 1.9)); ask.style.opacity = t > 1.6 ? 1 : 0;
            ty.at(t - 1.8);
            rq.at(t, 5.6);
            prev.style.opacity = t > 9.4 ? 1 : 0;
            loopIn(word, t, 9.6);
          }
        };
      }
    },
    /* 2 ── 움직임의 정체: 숫자 표(숫자 롤링) */
    {
      title: '움직임의 정체', dur: 16,
      captions: [
        { t: 0, text: '움직임은 사실 숫자 표로 되어 있어요.' },
        { t: 4.5, text: '몇 초에 어디 있는지, 한 줄씩.' },
        { t: 9, text: '편집 프로그램 속도 이 표로 움직여요.' },
        { t: 12.5, text: '표만 있으면 움직임은 다시 그려져요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const scr = P.h('div', { class: 'mc-screen', style: 'left:60px;top:110px;width:600px;height:200px' });
        const word = P.h('div', { class: 'mc-word' }, TITLE);
        const mark = P.h('div', { style: 'position:absolute;top:0;width:3px;height:100%;background:var(--acc2);opacity:0;margin-left:-1px' });
        scr.append(P.h('div', { class: 'mc-mid' }), word, mark); stage.append(scr); tl.at(scr, .2, { from: 'up' });
        const TS = [0, .2, .4, .6, .8, 1];
        const tbl = P.h('div', { class: 'mc-tbl', style: 'left:60px;top:340px;width:600px;height:330px' });
        tbl.append(P.h('div', { class: 'mc-tr hd' }, P.h('span', {}, '시간'), P.h('span', {}, '글자 자리 (0 = 가운데)')));
        const rows = TS.map(s => { const v = Math.round(-100 + 150 * EO(s)); const b = P.h('b'); const r = P.h('div', { class: 'mc-tr' }, P.h('span', {}, `${s.toFixed(1)}초`), b); tbl.append(r); return { r, o: odo(P, b, (v > 0 ? '+' : '') + v), s }; });
        stage.append(tbl); tl.at(tbl, .5, { from: 'up' });
        const note = P.h('div', { class: 'mc-big', style: 'left:60px;top:700px;width:600px;font-size:30px' }); stage.append(note);
        const rn = riser(P, note, '표 → 그림 30장 → 영상');
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            /* 1초부터 4초 주기: 2.4초 동안 천천히 움직이고 1.6초 멈춤 */
            const cyc = Math.max(0, t - 1) % 4, p = Math.min(1, cyc / 2.4), loops = Math.floor(Math.max(0, t - 1) / 4);
            const e = EO(p);
            word.style.left = `${WPOS(e)}%`; word.style.opacity = t < 1 ? 0 : cyc > 3.65 ? (4 - cyc) / .35 : Math.min(1, cyc / .15 + .3);
            rows.forEach(({ r, o, s }, i) => {
              const on = loops > 0 || p >= s - .001;
              r.classList.toggle('on', on);
              o.at(loops > 0 ? 1 : seg(p, s, s + .14) * (on ? 1 : 0));
              const next = TS[i + 1] ?? 9;
              r.classList.toggle('hot', on && p < 1 && p >= s && p < next);
            });
            mark.style.opacity = p < 1 ? .9 : 0; mark.style.left = `${WPOS(e)}%`;
            rn.at(t, 12.6);
          }
        };
      }
    },
    /* 3 ── 표는 글이에요: 세 모습(가림막 올라오기), 형광펜, 한 낱말 펀치 */
    {
      title: '표는 글이에요', dur: 15,
      captions: [
        { t: 0, text: '같은 움직임을 세 가지로 적을 수 있어요.' },
        { t: 4, text: '사람 말로, 숫자 표로, 컴퓨터 글로.' },
        { t: 8, text: '컴퓨터 글은 브라우저가 읽고 그대로 그려요.' },
        { t: 11.5, text: '움직임을 만든다는 건 글을 쓰는 거랑 같아요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const hl = s => P.h('span', { class: 'hl' }, s);
        const c1 = P.h('div', { class: 'mc-card', style: 'left:60px;top:110px;width:600px;height:120px' }, P.h('h5', {}, '사람 말'), P.h('p', {}, hl('왼쪽 밖'), '에서 ', hl('가운데'), '로, ', hl('1초'), ' 동안, ', hl('천천히 멈추게')));
        const c2 = P.h('div', { class: 'mc-card', style: 'left:60px;top:260px;width:600px;height:150px' }, P.h('h5', {}, '숫자 표'), P.h('p', { class: 'mono' }, '0.0초  -100     0.6초  +37\n0.2초   -22     0.8초  +47\n0.4초   +17     1.0초  +50'));
        const c3 = P.h('div', { class: 'mc-card', style: 'left:60px;top:440px;width:600px;height:230px' }, P.h('h5', {}, '컴퓨터 글'), P.h('p', { class: 'mono' }, CODE.join('\n')));
        const cards = [c1, c2, c3];
        cards.forEach(c => stage.append(c));
        const a1 = P.arrow(lines, { x1: 360, y1: 232, x2: 360, y2: 258, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 360, y1: 412, x2: 360, y2: 438, width: 4, color: '#127E90' });
        /* 형광펜: 사람 말의 낱말 아래에 굵은 선을 긋는 SVG 길. 글꼴이 자리를 정하니 첫 tick에서 재요 */
        let pens = null;
        const mkPens = () => {
          const st = stage.getBoundingClientRect(), k = 720 / st.width;
          pens = [...c1.querySelectorAll('.hl')].map(el => {
            const r = el.getBoundingClientRect(); const x0 = (r.left - st.left) * k - 3, x1 = (r.right - st.left) * k + 3, y = (r.bottom - st.top) * k - 9, w = 3;
            const d = `M${x0} ${y + w} C${x0 + (x1 - x0) * .3} ${y - w * 1.6} ${x0 + (x1 - x0) * .62} ${y + w * 1.6} ${x1} ${y - w}`;
            const path = P.s('path', { d, fill: 'none', stroke: '#F2812D', 'stroke-width': 16, 'stroke-linecap': 'butt', opacity: .38 });
            lines.append(path); const L = path.getTotalLength() || 1; path.setAttribute('stroke-dasharray', L); path.setAttribute('stroke-dashoffset', L); return { path, L };
          });
        };
        const punch = P.h('div', { class: 'mc-punch' }, '= 글쓰기', P.h('i', { style: 'width:200px' })); stage.append(punch);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 14);
            cards.forEach((c, i) => { const p = EXPO(seg(t, .3 + i * 1.6, 1.1 + i * 1.6)); c.style.opacity = p > 0 ? 1 : 0; c.style.transform = `translateY(${(1 - p) * 60}px)`; });
            a1.draw(seg(t, 1.9, 2.4)); a2.draw(seg(t, 3.5, 4));
            if (!pens && t > .5) mkPens();
            if (pens) pens.forEach(({ path, L }, i) => { const p = EO(seg(t, 11.6 + i * .45, 12.2 + i * .45)); path.setAttribute('stroke-dashoffset', L * (1 - p)); });
            const come = EO(seg(t, 13.3, 13.8));
            punch.style.opacity = come; punch.style.transform = `scale(${1.25 - .25 * come})`;
            punch.lastChild.style.transform = `scaleX(${EO(seg(t, 13.7, 14.3))})`;
          }
        };
      }
    },
    /* 4 ── 클로드가 읽은 것: 짝 카드 비, 돋보기 */
    {
      title: '클로드가 읽은 것', dur: 17,
      captions: [
        { t: 0, text: '클로드는 인터넷에 있는 코드를 잔뜩 읽었어요.' },
        { t: 4.5, text: '설명 옆에 코드가 짝지어 붙은 글들이요.' },
        { t: 9.5, text: '"왼쪽에서 들어와" 옆엔 늘 같은 코드가 있었어요.' },
        { t: 14, text: '그 짝을 외워 둔 셈이죠.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const N = 36;
        const rain = Array.from({ length: N }, (_, i) => {
          const el = pairCard(P, i); stage.append(el); const col = i % 2;
          return { el, x0: 60 + col * 320 + ((i * 37) % 60) - 30, x1: 60 + col * 320, y1: 700 - Math.floor(i / 2) * 5, delay: i * .22, rot: ((i * 7) % 11 - 5) * 1.2, rot1: ((i * 5) % 7 - 3) * 1.5 };
        });
        const top = rain[N - 2]; /* 왼쪽 더미 맨 위 카드: '왼쪽에서 들어와' */
        /* 돋보기: 맨 위 카드를 2.4배로 비춰요 */
        const Z = 1.9, R = 120;
        const lens = P.h('div', { class: 'mc-lens' }); const inner = pairCard(P, N - 2); lens.append(inner);
        const handle = P.h('div', { class: 'mc-handle' });
        stage.append(handle, lens);
        const cnt = P.h('div', { class: 'mc-big', style: 'left:60px;top:120px;width:600px;font-size:34px' }); stage.append(cnt);
        const rc = riser(P, cnt, '이런 짝을 수백만 개');
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 16);
            rain.forEach(r => {
              const u = (t - .4 - r.delay) / 2.2;
              if (u < 0) { r.el.style.opacity = 0; return; }
              const p = Math.min(1, u), y = 40 + (r.y1 - 40) * SM(p), x = r.x0 + (r.x1 - r.x0) * p;
              r.el.style.opacity = p < 1 ? Math.min(1, p * 6) : (t > 9.5 && r !== top ? .3 : 1);
              r.el.style.transform = `translate(${x}px, ${y}px) rotate(${r.rot * (1 - p) + r.rot1 * p}deg)`;
            });
            /* 돋보기: 9.5초에 오른쪽 아래에서 들어와 설명 줄 → 코드 줄로 내려가요 */
            const come = EXPO(seg(t, 9.5, 10.6)), down = SM(seg(t, 12, 13.2));
            const px = 64 + 10 * down, py = 19 + 21 * down; /* 카드 안에서 비출 점: 설명 줄 → 코드 줄 */
            const cx = top.x1 + px, cy = top.y1 + py; /* 무대 좌표 */
            const lx = 760 + (cx - R - 760) * come, ly = 900 + (cy - R - 900) * come;
            lens.style.opacity = come > 0 ? 1 : 0; lens.style.transform = `translate(${lx}px, ${ly}px)`;
            inner.style.transform = `translate(${R - px * Z}px, ${R - py * Z}px) scale(${Z})`;
            handle.style.opacity = come > 0 ? 1 : 0; handle.style.transform = `translate(${lx + R * 1.7}px, ${ly + R * 1.7}px) rotate(45deg)`;
            rc.at(t, 14.2);
          }
        };
      }
    },
    /* 5 ── 말이 코드가 되는 순간: 스포트라이트, 조각 날아가 꽂히기 */
    {
      title: '말이 코드가 돼요', dur: 19,
      captions: [
        { t: 0, text: '부탁을 낱말로 쪼개요.' },
        { t: 4, text: '낱말마다 외워 둔 코드 조각을 갖다 붙여요.' },
        { t: 11, text: '조각을 이어 붙이면 글 한 편이 완성돼요.' },
        { t: 15, text: '브라우저가 읽으면 움직임이 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const WORDS = [['왼쪽 밖에서', 'from', 'left: -100%'], ['가운데로', 'to', 'left: 50%'], ['1초 동안', 'dur', '1s'], ['천천히 멈추게', 'ease', 'ease-out']];
        const CX = i => (i % 2 ? 380 : 60), CY = i => 110 + Math.floor(i / 2) * 64;
        const chips = WORDS.map(([w], i) => { const c = P.h('div', { class: 'mc-chip', style: `left:${CX(i)}px;top:${CY(i)}px;width:280px;text-align:center` }, w); stage.append(c); tl.at(c, .3 + i * .4, { from: 'pop' }); return c; });
        const { el: code, slots } = codeBlock(P, 'left:60px;top:260px;width:600px;height:230px');
        stage.append(code); tl.at(code, 2.2, { from: 'up' });
        const spot = P.h('div', { class: 'mc-spot' }); stage.append(spot);
        const frags = WORDS.map(([, k, v]) => { const f = P.h('div', { class: 'mc-frag' }, v); stage.append(f); return { el: f, k }; });
        const prev = P.h('div', { class: 'mc-screen', style: 'left:60px;top:520px;width:600px;height:200px;opacity:0' });
        const word = P.h('div', { class: 'mc-word' }, TITLE);
        prev.append(P.h('div', { class: 'mc-mid' }), word); stage.append(prev);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        const T0 = 4.3, STEP = 1.6;
        return {
          tick(t) {
            q.tick(t, t < 18);
            frags.forEach(({ el, k }, i) => {
              const u = (t - T0 - i * STEP) / 1;
              const on = u >= 0 && u < 1.25; chips[i].classList.toggle('on', on);
              if (u < 0) { el.style.opacity = 0; slots[k].classList.remove('on'); slots[k].textContent = ''; return; }
              if (u >= 1) { el.style.opacity = 0; slots[k].classList.add('on'); const full = WORDS[i][2]; slots[k].textContent = full.slice(0, Math.ceil(full.length * seg(u, 1, 1.3))); return; }
              const p = SP(u), sx = CX(i) + 70, sy = CY(i) + 8;
              const sr = slots[k].getBoundingClientRect(), st = stage.getBoundingClientRect(), kk = 720 / st.width;
              const ex = (sr.left - st.left) * kk, ey = (sr.top - st.top) * kk - 4;
              el.style.opacity = 1; el.style.transform = `translate(${sx + (ex - sx) * p}px, ${sy + (ey - sy) * p}px) scale(${1.15 - .15 * clamp(p)})`;
            });
            /* 스포트라이트: 켜진 낱말만 밝게. 다음 낱말로 0.3초 동안 미끄러져 가요 */
            const idx = clamp(Math.floor((t - T0) / STEP), 0, 3), prv = Math.max(0, idx - 1), m = SM(seg(t - (T0 + idx * STEP), 0, .3));
            spot.style.opacity = t >= T0 - .2 && t < T0 + 3 * STEP + 1.1 ? 1 : 0;
            spot.style.transform = `translate(${CX(prv) + (CX(idx) - CX(prv)) * m - 10}px, ${CY(prv) + (CY(idx) - CY(prv)) * m - 2}px)`;
            prev.style.opacity = t > 14.8 ? 1 : 0;
            loopIn(word, t, 15);
          }
        };
      }
    },
    /* 6 ── 잘하는 것, 어려운 것, 사진 확인, 색종이 */
    {
      title: '잘하는 것, 어려운 것', dur: 15,
      captions: [
        { t: 0, text: '많이 본 움직임은 잘 만들어요.' },
        { t: 4, text: '처음 보는 복잡한 동작에선 숫자가 어긋나요.' },
        { t: 8, text: '쓴 글이 맞는지는 사진을 찍어 보면 알아요.' },
        { t: 11.5, text: '시킬 땐 어디서, 몇 초, 어떻게. 셋이면 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const li = s => P.h('li', {}, P.h('span', {}, s));
        const good = P.h('div', { class: 'mc-col', style: 'left:60px;top:110px;width:290px;height:250px' }, P.h('h4', {}, '많이 봤어요'), P.h('ul', {}, ...['들어오기', '사라지기', '통통 튀기', '글자 타이핑'].map(li)));
        const bad = P.h('div', { class: 'mc-col bad', style: 'left:370px;top:110px;width:290px;height:250px' }, P.h('h4', {}, '처음 봐요'), P.h('ul', {}, ...['셋이 얽히는 춤', '손그림 같은 떨림', '물결치는 글자'].map(li)));
        stage.append(good, bad); tl.at(good, .3, { from: 'left' }); tl.at(bad, 4.2, { from: 'right' });
        const chk = P.h('div', { class: 'mc-screen', style: 'left:60px;top:400px;width:600px;height:140px;opacity:0;transform-origin:50% 50%' });
        const word = P.h('div', { class: 'mc-word sm', style: `left:${WPOS(EO(.5))}%` }, TITLE);
        chk.append(P.h('div', { class: 'mc-mid' }), word, P.h('span', { style: 'position:absolute;right:12px;top:10px;font-size:16px;font-weight:800;color:#fff;background:var(--acc2);border-radius:999px;padding:2px 10px' }, '0.5초 사진')); stage.append(chk);
        const ok = P.chip({ x: 60, y: 560, text: '절반 넘게 왔네요. 맞아요', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(ok.el), 9.6, { from: 'pop' });
        const ask = P.h('div', { class: 'mc-ask', style: 'left:60px;top:640px;width:600px;opacity:0', html: '제목이 <b>왼쪽 밖</b>에서 <b>가운데</b>로, <b>1초</b> 동안, <b>천천히 멈추게</b>' });
        stage.append(ask);
        const bolds = [...ask.querySelectorAll('b')];
        /* 색종이 */
        const COLS = ['#127E90', '#F2812D', '#1B1F24', '#9AA5AF'];
        const conf = Array.from({ length: 28 }, (_, i) => { const c = P.h('div', { class: 'mc-conf', style: `background:${COLS[i % 4]}` }); stage.append(c); return { el: c, x: 40 + (i * 131) % 640, d: (i * 29) % 100 / 100, sp: .8 + (i * 17) % 50 / 100, rot: (i * 53) % 360 }; });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'wave' });
        stage.append(q.el);
        const gl = [...good.querySelectorAll('li span')], bl = [...bad.querySelectorAll('li span')];
        return {
          tick(t) {
            q.tick(t, t < 14);
            gl.forEach((s, i) => { const p = EXPO(seg(t, .8 + i * .3, 1.5 + i * .3)); s.style.transform = `translateY(${(1 - p) * 110}%)`; });
            bl.forEach((s, i) => { const p = EXPO(seg(t, 4.7 + i * .3, 5.4 + i * .3)); s.style.transform = `translateY(${(1 - p) * 110}%)`; });
            chk.style.opacity = t > 8.2 ? 1 : 0; chk.style.transform = `scale(${SP(seg(t, 8.2, 8.7))})`;
            ask.style.opacity = t > 11.3 ? 1 : 0;
            bolds.forEach((b, i) => { const p = EO(seg(t, 11.5 + i * .35, 12.2 + i * .35)); b.style.filter = p < 1 ? `blur(${(1 - p) * 8}px)` : 'none'; b.style.opacity = p; b.style.transform = `translateY(${(1 - p) * 10}px)`; });
            conf.forEach(c => { const u = (t - 12.8 - c.d) / (1.6 * c.sp); if (u < 0 || u > 1.2) { c.el.style.opacity = 0; return; } c.el.style.opacity = u < 1 ? 1 : 1 - (u - 1) * 5; c.el.style.transform = `translate(${c.x + Math.sin(u * 6 + c.rot) * 30}px, ${80 + u * 760}px) rotate(${c.rot + u * 540}deg)`; });
          }
        };
      }
    }
  ],

  interaction: {
    title: '말을 코드로 바꿔 보기',
    desc: '부탁할 낱말 세 개를 고르면 클로드가 외워 둔 코드 조각을 붙여 글 한 편을 만들고 글자가 그 글대로 움직여요. 낱말을 바꿔 보면 어느 조각이 달라지는지 바로 보여요.',
    mount(el, P) {
      const FROM = { '왼쪽 밖에서': ['left: -100%', 'left: 50%', p => ({ x: -40 + 90 * p, o: 1, s: 1 })], '오른쪽 밖에서': ['left: 140%', 'left: 50%', p => ({ x: 140 - 90 * p, o: 1, s: 1 })], '투명하게': ['opacity: 0', 'opacity: 1', p => ({ x: 50, o: p, s: 1 })], '작게': ['scale(0)', 'scale(1)', p => ({ x: 50, o: 1, s: p })] };
      const DUR = { '0.5초 동안': '0.5s', '1초 동안': '1s', '2초 동안': '2s' };
      const EASE = { '천천히 멈추게': ['ease-out', EO], '똑같은 속도로': ['linear', p => p], '천천히 출발하게': ['ease-in', INTO], '통통 튀게': ['bounce', BOUNCE] };
      let from = '왼쪽 밖에서', dur = '1초 동안', ease = '천천히 멈추게', run = 0;
      const sel = (opts, cur, on, label) => { const s = P.h('select', { class: 'sim-mc-sel', 'aria-label': label }, ...Object.keys(opts).map(o => P.h('option', { value: o, selected: o === cur ? '' : null }, o))); s.addEventListener('change', () => { on(s.value); draw(); play(); }); return s; };
      const code = P.h('pre', { class: 'sim-mc-code' });
      const scr = P.h('div', { class: 'sim-mc-scr' });
      const word = P.h('div', { class: 'sim-mc-w' }, TITLE);
      scr.append(P.h('div', { class: 'sim-mc-m' }), word);
      const bPlay = P.h('button', { class: 'btn primary', type: 'button' }, '다시 움직이기');
      const note = P.h('p', { class: 'sim-mc-note' }, '');
      el.append(
        P.h('style', {}, `
          .sim-mc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
          .sim-mc-row span{font-weight:700;font-size:14px;color:#4E5968}
          .sim-mc-sel{height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:600;max-width:100%}
          .sim-mc-code{margin:0 0 10px;background:#1B1F24;color:#fff;border-radius:12px;padding:12px;font-size:12.5px;line-height:1.7;white-space:pre-wrap;word-break:break-all}
          .sim-mc-code b{color:#F2812D;font-weight:700}
          .sim-mc-scr{position:relative;height:90px;border-radius:14px;background:#fff;border:1px solid #E5E8EB;overflow:hidden}
          .sim-mc-m{position:absolute;left:50%;top:10%;height:80%;border-left:2px dashed #9AA5AF}
          .sim-mc-w{position:absolute;top:50%;left:-40%;transform:translate(-50%,-50%);font-weight:800;font-size:clamp(16px,4vw,24px);color:#127E90;white-space:nowrap}
          .sim-mc-note{font-size:13px;color:#4E5968;margin-top:8px}
        `),
        P.h('div', { class: 'sim-mc-row' }, P.h('span', {}, '제목이'), sel(FROM, from, v => from = v, '어디서'), sel(DUR, dur, v => dur = v, '얼마 동안'), sel(EASE, ease, v => ease = v, '어떻게')),
        code, scr, P.h('div', { class: 'sim-mc-row', style: 'margin-top:10px' }, bPlay), note
      );
      function draw() {
        code.innerHTML = `@keyframes in {\n  from { <b>${FROM[from][0]}</b> }\n  to   { ${FROM[from][1]} }\n}\nanimation: in <b>${DUR[dur]}</b> <b>${EASE[ease][0]}</b>;`;
        note.textContent = `"${from}", "${dur}", "${ease}"가 각각 코드 한 조각씩이 됐어요. 낱말을 바꾸면 그 조각만 바뀌어요.`;
      }
      function play() {
        run += 1; const my = run, ms = parseFloat(DUR[dur]) * 1000, t0 = performance.now(), fn = EASE[ease][1], mv = FROM[from][2];
        const step = now => { if (my !== run) return; const p = Math.min(1, (now - t0) / ms), s = mv(fn(p)); word.style.left = `${s.x}%`; word.style.opacity = s.o; word.style.transform = `translate(-50%,-50%) scale(${s.s})`; if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
      bPlay.addEventListener('click', play);
      draw(); play();
    }
  },

  teacherLines: [
    '움직임은 <b>숫자 표</b>예요. 몇 초에 어디 있는지 적은 표인데 이걸 글로 옮겨 적을 수도 있어요.',
    '클로드는 설명 옆에 코드가 짝으로 붙은 글을 아주 많이 읽었어요. 그래서 <b>어떤 말 옆에 어떤 코드가 따라오는지</b> 외우고 있어요.'
  ],
  tip: {
    body: '클로드에게 모션그래픽을 시킬 때는 세 가지만 적어 주세요. 어디서 어디로, 몇 초 동안, 어떻게 멈추는지. "왼쪽 밖에서 가운데로, 1초 동안, 천천히 멈추게"처럼요. 많이 쓰는 말일수록 외워 둔 코드 조각도 정확하거든요. "느낌 있게", "세련되게" 같은 말엔 따라붙는 코드가 없어요.',
    extra: '처음 보는 복잡한 동작을 시킬 땐 두 동작으로 나눠 주세요. "들어온 다음, 한 번 통통 튀게"처럼 흔한 동작 둘을 이으면 숫자 실수가 줄어요. 결과를 확인할 땐 영상을 다 보는 대신 0.5초 사진 한 장을 달라고 하면 돼요.'
  },
  myth: {
    myth: '클로드가 영상을 머릿속에 그려 보고 만든다.',
    fact: '클로드는 영상을 떠올리지 못해요. 대신 움직임을 적은 글(코드)을 수없이 읽으면서 부탁 속 낱말 옆에 어떤 코드 조각이 붙는지 외워 뒀어요. 그 조각들을 이어 붙여 글을 쓰면 브라우저가 그걸 읽고 그려 내죠. 그래서 많이 본 움직임은 잘 만들어 내는데 처음 보는 동작에선 숫자가 어긋나요.'
  },
  sources: [
    { title: 'MDN, Using CSS animations', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations', note: '처음 모양과 끝 모양을 글로 적으면 브라우저가 사이를 그려 주는 방식의 공식 설명.' },
    { title: 'W3C, CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/', note: '"천천히 멈춤" 같은 속도 곡선의 표준 정의.' },
    { title: 'Anthropic, Claude Code 공식 문서', url: 'https://docs.claude.com/en/docs/claude-code/overview', note: '클로드가 파일을 쓰고 명령을 돌리고 결과 그림을 읽어 확인하는 작업 방식.' },
    { title: 'FFmpeg 공식 문서', url: 'https://ffmpeg.org/ffmpeg.html', note: '그림 묶음을 영상으로 만들고 특정 시각의 그림을 꺼내는 도구의 설명서.' }
  ],
  script: `제목 글자가 왼쪽에서 들어오게 해 달라고 부탁하면 1분 뒤 영상이 만들어져 나와요. 클로드에겐 손도 눈도 없는데 말이죠. 어떻게 된 걸까요.

움직임은 사실 숫자 표로 되어 있어요. 0초엔 왼쪽 밖, 0.5초엔 중간을 지나, 1초엔 가운데. 몇 초에 어디 있는지 한 줄씩 적은 표요. 편집 프로그램 속도 이 표로 움직이는데 이 표는 글로도 옮겨 적을 수 있어요. 사람 말로도, 숫자 표로도, 컴퓨터 글로도요. 컴퓨터 글은 브라우저가 읽고 그대로 그려 주거든요. 움직임을 만드는 일이 곧 글을 쓰는 일이죠.

클로드는 인터넷에 있는 코드를 엄청나게 읽었어요. 설명과 코드가 짝으로 붙은 글들이요. "왼쪽에서 들어와"라는 설명 옆엔 늘 같은 코드가 있었어요. 클로드는 바로 그 짝을 외워 뒀어요. 부탁이 들어오면 낱말로 쪼갠 다음 낱말마다 외워 둔 코드 조각을 갖다 붙여요. 조각을 이어 붙여 글 한 편을 만들면 브라우저가 그걸 읽고 움직임으로 그려요.

많이 본 움직임은 잘 만들지만 처음 보는 복잡한 동작에선 숫자를 잘못 적어요. 쓴 글이 맞는지는 사진을 찍어 보고 확인해요. 시킬 땐 어디서 어디로, 몇 초 동안, 어떻게 멈추는지. 이 세 가지만 적어 주면 돼요.`
};
