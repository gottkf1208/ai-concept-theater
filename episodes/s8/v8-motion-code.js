/* S8-76 손이 없는데 모션그래픽은 어떻게 만들까: 세로 무대(720×1280), 6장면 90초
   본론: 움직임은 숫자 표 → 표는 글로 적을 수 있음 → 클로드는 설명과 코드가 짝지어진 글을 엄청나게 읽음 → 말을 낱말로 쪼개 외운 코드 조각을 붙임 → 못 보니 찍어서 확인 */
const EO = p => 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 3);
const SM = p => { p = Math.max(0, Math.min(1, p)); return p * p * (3 - 2 * p); };
const SP = p => { p = Math.max(0, Math.min(1, p)) - 1; return 1 + 2.70158 * p * p * p + 1.70158 * p * p; };
const WPOS = p => -40 + 90 * p; /* 글자 중심: -40%(왼쪽 밖) → 50%(가운데) */
const CODE = ['@keyframes in {', '  from { left: -100% }', '  to   { left: 50% }', '}', 'animation: in 1s ease-out;'];

const CSS = `
.mc-panel{position:absolute;border-radius:28px;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.9);box-shadow:0 20px 50px -30px rgba(27,31,36,.35)}
.mc-say{position:absolute;font-size:24px;font-weight:700;line-height:1.4;color:var(--ink)}
.mc-big{position:absolute;font-size:44px;font-weight:800;line-height:1.2;color:var(--ink);letter-spacing:-.02em;text-align:center}
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
.mc-tr b{font-family:var(--mono);color:var(--acc1)}
.mc-tr.hot{background:var(--acc2-pale);border-radius:8px}
.mc-card{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:14px 18px;box-shadow:0 14px 30px -22px rgba(27,31,36,.5)}
.mc-card h5{margin:0 0 6px;font-size:16px;font-weight:800;color:var(--muted2)}
.mc-card p{margin:0;font-size:22px;font-weight:700;line-height:1.35}
.mc-card .mono{font-family:var(--mono);font-size:18px;line-height:1.5;white-space:pre}
.mc-card .hl{border-radius:6px;padding:0 4px;transition:background .25s}
.mc-rain{position:absolute;left:0;top:0;width:250px;height:92px;border-radius:12px;background:#fff;border:1px solid rgba(27,31,36,.1);box-sizing:border-box;padding:10px 12px;box-shadow:0 8px 16px -12px rgba(27,31,36,.6);will-change:transform;opacity:0}
.mc-rain em{display:block;font-style:normal;font-size:15px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden}
.mc-rain code{display:block;font-family:var(--mono);font-size:13px;color:var(--acc1);white-space:nowrap;overflow:hidden;margin-top:4px}
.mc-chip{position:absolute;font-size:24px;font-weight:800;padding:8px 16px;border-radius:999px;background:#fff;border:2px solid rgba(27,31,36,.1);color:var(--ink);white-space:nowrap;box-sizing:border-box;transition:border-color .2s,background .2s,color .2s}
.mc-chip.on{border-color:var(--acc2);background:var(--acc2-pale);color:var(--acc2)}
.mc-frag{position:absolute;left:0;top:0;font-family:var(--mono);font-size:20px;font-weight:700;color:#fff;background:var(--acc2);padding:4px 10px;border-radius:8px;white-space:nowrap;will-change:transform;opacity:0}
.mc-slot{display:inline-block;min-width:60px;border-bottom:2px dashed rgba(255,255,255,.4);color:rgba(255,255,255,.35)}
.mc-slot.on{border-bottom-color:transparent;color:var(--acc2)}
.mc-col{position:absolute;border-radius:20px;background:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.9);box-sizing:border-box;padding:16px 18px}
.mc-col h4{margin:0 0 10px;font-size:24px;font-weight:800}
.mc-col ul{margin:0;padding:0}
.mc-col li{list-style:none;font-size:21px;font-weight:700;line-height:1.5;opacity:0;transition:opacity .25s}
.mc-col li.on{opacity:1}
.mc-col.bad h4{color:var(--acc2)}
.mc-ask{position:absolute;font-size:24px;font-weight:700;line-height:1.4;color:var(--ink);background:rgba(255,255,255,.9);border-radius:16px;padding:12px 16px;box-sizing:border-box;border:1px solid rgba(27,31,36,.08)}
.mc-ask b{color:var(--acc1)}
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

export default {
  slug: 'v8-motion-code',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  title: '손이 없는데 모션그래픽은 어떻게 만들까',
  subtitle: '움직임은 숫자 표고, 표는 글로 적어요',
  summary: '제목 글자가 미끄러져 들어오게 해 달라고 하면 클로드는 영상을 상상하지 않아요. 움직임은 몇 초에 어디 있는지 적은 숫자 표고, 그 표는 글로 적을 수 있어요. 클로드는 인터넷에서 설명과 코드가 짝으로 붙은 글을 엄청나게 읽어서, 부탁 속 낱말마다 어떤 코드 조각이 따라오는지 외우고 있어요. 그 조각을 이어 붙인 글을 브라우저가 읽어 움직임으로 그려요. 쓴 글이 맞는지는 사진을 찍어 확인해요.',
  keywords: ['모션그래픽', '키프레임', '숫자 표', '코드', '학습 데이터', '패턴', '이징', '천천히 멈춤', '확인'],

  scenes: [
    /* 1 ── 부탁 한 줄, 그리고 질문 */
    {
      title: '부탁 한 줄', dur: 12,
      captions: [
        { t: 0, text: '부탁은 한 줄이에요.' },
        { t: 4, text: '클로드는 손도 눈도 없어요.' },
        { t: 8, text: '그런데 영상이 와요. 어떻게요?' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        stage.append(P.h('div', { class: 'mc-panel', style: 'left:60px;top:110px;width:600px;height:690px' }));
        const ask = P.bubble({ x: 90, y: 140, w: 540, text: '제목 글자가 <b>왼쪽에서 들어와</b> 가운데 서게 해 줘', tail: 'none', size: 26, tone: 'soft' });
        tl.at(stage.appendChild(ask.el), .3, { from: 'up' });
        const q1 = P.h('div', { class: 'mc-big', style: 'left:90px;top:330px;width:540px' }, '손도 눈도 없는데?');
        stage.append(q1); tl.at(q1, 4.2, { from: 'pop' });
        const got = P.chip({ x: 90, y: 480, text: '1분 뒤, 영상이 왔어요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(got.el), 8.2, { from: 'pop' });
        const prev = P.h('div', { class: 'mc-screen', style: 'left:90px;top:560px;width:540px;height:200px;opacity:0' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        prev.append(P.h('div', { class: 'mc-mid' }), word); stage.append(prev);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'oops' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t > 3.5 && t < 11);
            prev.style.opacity = t > 8.4 ? 1 : 0;
            word.style.left = `${WPOS(t > 8.6 ? EO(((t - 8.6) % 2.5) / 1) : 0)}%`;
          }
        };
      }
    },
    /* 2 ── 움직임의 정체: 숫자 표 */
    {
      title: '움직임의 정체', dur: 16,
      captions: [
        { t: 0, text: '움직임은 사실 숫자 표예요.' },
        { t: 4.5, text: '몇 초에 어디 있는지, 한 줄씩.' },
        { t: 9, text: '편집 프로그램 속도 이 표로 움직여요.' },
        { t: 12.5, text: '표만 있으면 움직임은 다시 그릴 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const scr = P.h('div', { class: 'mc-screen', style: 'left:60px;top:110px;width:600px;height:200px' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        const mark = P.h('div', { style: 'position:absolute;top:0;width:3px;height:100%;background:var(--acc2);opacity:0;margin-left:-1px' });
        scr.append(P.h('div', { class: 'mc-mid' }), word, mark); stage.append(scr); tl.at(scr, .2, { from: 'up' });
        const TS = [0, .2, .4, .6, .8, 1];
        const tbl = P.h('div', { class: 'mc-tbl', style: 'left:60px;top:340px;width:600px;height:330px' });
        tbl.append(P.h('div', { class: 'mc-tr hd' }, P.h('span', {}, '시간'), P.h('span', {}, '글자 자리 (0 = 가운데)')));
        const rows = TS.map(s => { const r = P.h('div', { class: 'mc-tr' }, P.h('span', {}, `${s.toFixed(1)}초`), P.h('b', {}, '')); tbl.append(r); return r; });
        stage.append(tbl); tl.at(tbl, .5, { from: 'up' });
        const note = P.text({ x: 60, y: 700, w: 600, text: '', size: 24, weight: 700, align: 'center', color: '#9AA5AF' });
        tl.at(stage.appendChild(note.el), 9.2, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            /* 1초부터 4초 주기: 2.4초 동안 천천히 움직이고 1.6초 멈춤 */
            const cyc = Math.max(0, t - 1) % 4, p = Math.min(1, cyc / 2.4), loops = Math.floor(Math.max(0, t - 1) / 4);
            const e = EO(p);
            word.style.left = `${WPOS(e)}%`;
            rows.forEach((r, i) => {
              const s = TS[i], on = loops > 0 || p >= s - .001;
              r.classList.toggle('on', on);
              if (on) { const v = Math.round(-100 + 150 * EO(s)); r.querySelector('b').textContent = (v > 0 ? '+' : '') + v; }
              const next = TS[i + 1] ?? 9;
              r.classList.toggle('hot', on && p < 1 && p >= s && p < next);
            });
            mark.style.opacity = p < 1 ? .9 : 0; mark.style.left = `${WPOS(e)}%`;
            if (t > 9.2) note.set(t < 12.5 ? '편집 프로그램의 키프레임 창이 이 표예요' : '표 → 그림 30장 → 영상');
          }
        };
      }
    },
    /* 3 ── 표는 글로 적을 수 있어요 */
    {
      title: '표는 글이에요', dur: 14,
      captions: [
        { t: 0, text: '같은 움직임을 세 가지로 적을 수 있어요.' },
        { t: 4, text: '사람 말로, 숫자 표로, 컴퓨터 글로.' },
        { t: 8, text: '컴퓨터 글은 브라우저가 읽고 그대로 그려요.' },
        { t: 11, text: '그러니까 움직임 만들기는 글쓰기예요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const c1 = P.h('div', { class: 'mc-card', style: 'left:60px;top:110px;width:600px;height:120px' }, P.h('h5', {}, '사람 말'), P.h('p', {}, P.h('span', { class: 'hl' }, '왼쪽 밖'), '에서 ', P.h('span', { class: 'hl' }, '가운데'), '로, ', P.h('span', { class: 'hl' }, '1초'), ' 동안, ', P.h('span', { class: 'hl' }, '천천히 멈추게')));
        const c2 = P.h('div', { class: 'mc-card', style: 'left:60px;top:260px;width:600px;height:150px' }, P.h('h5', {}, '숫자 표'), P.h('p', { class: 'mono' }, '0.0초  -100     0.6초  +37\n0.2초   -22     0.8초  +47\n0.4초   +17     1.0초  +50'));
        const c3 = P.h('div', { class: 'mc-card', style: 'left:60px;top:440px;width:600px;height:230px' }, P.h('h5', {}, '컴퓨터 글'), P.h('p', { class: 'mono' }, CODE.join('\n')));
        [c1, c2, c3].forEach((c, i) => { stage.append(c); tl.at(c, .3 + i * 1.6, { from: 'up' }); });
        const a1 = P.arrow(lines, { x1: 360, y1: 232, x2: 360, y2: 258, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 360, y1: 412, x2: 360, y2: 438, width: 4, color: '#127E90' });
        const same = P.chip({ x: 60, y: 700, text: '셋 다 같은 움직임', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(same.el), 8.3, { from: 'pop' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        const hls = [...c1.querySelectorAll('.hl')];
        return {
          tick(t) {
            q.tick(t, t < 13);
            a1.draw((t - 1.8) / .5); a2.draw((t - 3.4) / .5);
            hls.forEach((h, i) => { h.style.background = t > 11 + i * .5 ? 'var(--acc2-pale)' : 'transparent'; });
          }
        };
      }
    },
    /* 4 ── 클로드가 읽은 것: 설명과 코드의 짝 */
    {
      title: '클로드가 읽은 것', dur: 16,
      captions: [
        { t: 0, text: '클로드는 인터넷의 코드를 엄청나게 읽었어요.' },
        { t: 4.5, text: '설명과 코드가 짝으로 붙은 글들이에요.' },
        { t: 9, text: '"왼쪽에서 들어와" 옆엔 늘 같은 코드가 있었어요.' },
        { t: 13, text: '그 짝을 외운 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const PAIRS = [
          ['slide in from left', 'from { left: -100% }'], ['fade in softly', 'from { opacity: 0 }'], ['bounce on landing', 'ease: bounce'],
          ['왼쪽에서 들어오기', 'translateX(-100%)'], ['slow stop', 'ease-out'], ['pop in', 'scale(0) → scale(1)'],
          ['typing text', 'steps(20)'], ['천천히 멈춤', 'ease-out'], ['slide in from left', 'translateX(-100%) → 0'],
          ['spin once', 'rotate(360deg)'], ['fade out', 'to { opacity: 0 }'], ['왼쪽에서 들어와', 'left: -100% → 50%']
        ];
        const N = 36;
        const rain = Array.from({ length: N }, (_, i) => {
          const [d, c] = PAIRS[i % PAIRS.length];
          const el = P.h('div', { class: 'mc-rain' }, P.h('em', {}, d), P.h('code', {}, c));
          stage.append(el); const col = i % 2; return { el, x0: 60 + col * 320 + ((i * 37) % 60) - 30, x1: 60 + col * 320, y1: 700 - Math.floor(i / 2) * 5, delay: i * .22, rot: ((i * 7) % 11 - 5) * 1.2, rot1: ((i * 5) % 7 - 3) * 1.5 };
        });
        const cnt = P.text({ x: 60, y: 120, w: 600, text: '', size: 30, weight: 800, align: 'center' });
        stage.append(cnt.el);
        const big = P.h('div', { class: 'mc-card', style: 'left:60px;top:170px;width:600px;height:150px;opacity:0;transform-origin:50% 50%' }, P.h('h5', {}, '늘 같이 나오던 짝'), P.h('p', {}, P.h('span', { class: 'hl', style: 'background:var(--acc2-pale)' }, '왼쪽에서 들어와'), '  ↔  ', P.h('span', { class: 'mono', style: 'display:inline' }, 'from { left: -100% }')));
        stage.append(big);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            rain.forEach(r => {
              const u = (t - .4 - r.delay) / 2.2;
              if (u < 0) { r.el.style.opacity = 0; return; }
              const p = Math.min(1, u), y = 40 + (r.y1 - 40) * SM(p), x = r.x0 + (r.x1 - r.x0) * p;
              r.el.style.opacity = p < 1 ? 1 : (t > 9 ? .3 : 1);
              r.el.style.transform = `translate(${x}px, ${y}px) rotate(${r.rot * (1 - p) + r.rot1 * p}deg)`;
            });
            cnt.set(t > 9.2 ? '이런 짝을 수백만 개' : ''); cnt.el.style.opacity = t > 9.2 ? 1 : 0;
            big.style.opacity = t > 9.2 ? 1 : 0; big.style.transform = `scale(${SP((t - 9.2) / .5)})`;
          }
        };
      }
    },
    /* 5 ── 말이 코드가 되는 순간 */
    {
      title: '말이 코드가 돼요', dur: 18,
      captions: [
        { t: 0, text: '부탁을 낱말로 쪼개요.' },
        { t: 4, text: '낱말마다 외워 둔 코드 조각이 붙어요.' },
        { t: 10, text: '조각을 이어 붙이면 글 한 편이에요.' },
        { t: 14, text: '브라우저가 읽으면 움직임이 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const WORDS = [['왼쪽 밖에서', 'from', 'left: -100%'], ['가운데로', 'to', 'left: 50%'], ['1초 동안', 'dur', '1s'], ['천천히 멈추게', 'ease', 'ease-out']];
        const CX = i => (i % 2 ? 380 : 60), CY = i => 110 + Math.floor(i / 2) * 64;
        const chips = WORDS.map(([w], i) => { const c = P.h('div', { class: 'mc-chip', style: `left:${CX(i)}px;top:${CY(i)}px;width:280px;text-align:center` }, w); stage.append(c); tl.at(c, .3 + i * .4, { from: 'pop' }); return c; });
        const { el: code, slots } = codeBlock(P, 'left:60px;top:260px;width:600px;height:230px');
        stage.append(code); tl.at(code, 2.2, { from: 'up' });
        const frags = WORDS.map(([, k, v]) => { const f = P.h('div', { class: 'mc-frag' }, v); stage.append(f); return { el: f, k }; });
        const prev = P.h('div', { class: 'mc-screen', style: 'left:60px;top:520px;width:600px;height:200px;opacity:0' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        prev.append(P.h('div', { class: 'mc-mid' }), word); stage.append(prev);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        const T0 = 4.2, STEP = 1.5;
        return {
          tick(t) {
            q.tick(t, t < 17);
            frags.forEach(({ el, k }, i) => {
              const u = (t - T0 - i * STEP) / .9;
              chips[i].classList.toggle('on', u >= 0 && u < 1.3);
              if (u < 0) { el.style.opacity = 0; slots[k].classList.remove('on'); slots[k].textContent = ''; return; }
              if (u >= 1) { el.style.opacity = 0; slots[k].classList.add('on'); slots[k].textContent = WORDS[i][2]; return; }
              const p = SM(u), sx = CX(i) + 70, sy = CY(i) + 8;
              /* 도착 자리: 코드 칸의 무대 좌표 (무대가 축소돼 있어도 같은 값이 나오게 비율로 되돌려요) */
              const sr = slots[k].getBoundingClientRect(), st = stage.getBoundingClientRect(), kk = 720 / st.width;
              const ex = (sr.left - st.left) * kk, ey = (sr.top - st.top) * kk - 4;
              el.style.opacity = 1; el.style.transform = `translate(${sx + (ex - sx) * p}px, ${sy + (ey - sy) * p}px) scale(${1.1 - .1 * p})`;
            });
            prev.style.opacity = t > 13.8 ? 1 : 0;
            word.style.left = `${WPOS(t > 14 ? EO(((t - 14) % 2.5) / 1) : 0)}%`;
          }
        };
      }
    },
    /* 6 ── 잘하는 것, 어려운 것, 확인 */
    {
      title: '잘하는 것, 어려운 것', dur: 14,
      captions: [
        { t: 0, text: '많이 본 움직임은 잘해요.' },
        { t: 4, text: '처음 보는 복잡한 동작은 숫자가 틀려요.' },
        { t: 8, text: '쓴 글이 맞는지는 사진을 찍어 확인해요.' },
        { t: 11, text: '시킬 땐 흔한 말과 숫자로 적어 주세요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const good = P.h('div', { class: 'mc-col', style: 'left:60px;top:110px;width:290px;height:250px' }, P.h('h4', {}, '많이 봤어요'), P.h('ul', {}, ...['들어오기', '사라지기', '통통 튀기', '글자 타이핑'].map(s => P.h('li', {}, s))));
        const bad = P.h('div', { class: 'mc-col bad', style: 'left:370px;top:110px;width:290px;height:250px' }, P.h('h4', {}, '처음 봐요'), P.h('ul', {}, ...['셋이 얽히는 춤', '손그림 같은 떨림', '물결치는 글자'].map(s => P.h('li', {}, s))));
        stage.append(good, bad); tl.at(good, .3, { from: 'left' }); tl.at(bad, 4.2, { from: 'right' });
        const chk = P.h('div', { class: 'mc-screen', style: 'left:60px;top:400px;width:600px;height:140px;opacity:0;transform-origin:50% 50%' });
        const word = P.h('div', { class: 'mc-word sm', style: `left:${WPOS(EO(.5))}%` }, '2026 가을 체육대회');
        chk.append(P.h('div', { class: 'mc-mid' }), word, P.h('span', { style: 'position:absolute;right:12px;top:10px;font-size:16px;font-weight:800;color:#fff;background:var(--acc2);border-radius:999px;padding:2px 10px' }, '0.5초 사진')); stage.append(chk);
        const ok = P.chip({ x: 60, y: 560, text: '절반 넘게 왔네요. 맞아요', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(ok.el), 9.6, { from: 'pop' });
        const ask = P.h('div', { class: 'mc-ask', style: 'left:60px;top:640px;width:600px', html: '제목이 <b>왼쪽 밖</b>에서 <b>가운데</b>로, <b>1초</b> 동안, <b>천천히 멈추게</b>' });
        stage.append(ask); tl.at(ask, 11.2, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'wave' });
        stage.append(q.el);
        const gl = [...good.querySelectorAll('li')], bl = [...bad.querySelectorAll('li')];
        return {
          tick(t) {
            q.tick(t, t < 13);
            gl.forEach((li, i) => li.classList.toggle('on', t > .8 + i * .5));
            bl.forEach((li, i) => li.classList.toggle('on', t > 4.7 + i * .5));
            chk.style.opacity = t > 8.2 ? 1 : 0; chk.style.transform = `scale(${SP((t - 8.2) / .5)})`;
          }
        };
      }
    }
  ],

  interaction: {
    title: '말을 코드로 바꿔 보기',
    desc: '부탁을 낱말 세 개로 고르면 클로드가 외워 둔 코드 조각이 붙어 글 한 편이 되고, 그 글대로 글자가 움직여요. 낱말을 바꿔 보면 어느 조각이 바뀌는지 보여요.',
    mount(el, P) {
      const FROM = { '왼쪽 밖에서': ['left: -100%', 'left: 50%', p => ({ x: -40 + 90 * p, o: 1, s: 1 })], '오른쪽 밖에서': ['left: 140%', 'left: 50%', p => ({ x: 140 - 90 * p, o: 1, s: 1 })], '투명하게': ['opacity: 0', 'opacity: 1', p => ({ x: 50, o: p, s: 1 })], '작게': ['scale(0)', 'scale(1)', p => ({ x: 50, o: 1, s: p })] };
      const DUR = { '0.5초 동안': '0.5s', '1초 동안': '1s', '2초 동안': '2s' };
      const bounce = p => { p = Math.max(0, Math.min(1, p)); const n = 7.5625, d = 2.75; return p < 1 / d ? n * p * p : p < 2 / d ? n * (p -= 1.5 / d) * p + .75 : p < 2.5 / d ? n * (p -= 2.25 / d) * p + .9375 : n * (p -= 2.625 / d) * p + .984375; };
      const EASE = { '천천히 멈추게': ['ease-out', EO], '똑같은 속도로': ['linear', p => p], '천천히 출발하게': ['ease-in', p => p * p * p], '통통 튀게': ['bounce', bounce] };
      let from = '왼쪽 밖에서', dur = '1초 동안', ease = '천천히 멈추게', run = 0;
      const sel = (opts, cur, on, label) => { const s = P.h('select', { class: 'sim-mc-sel', 'aria-label': label }, ...Object.keys(opts).map(o => P.h('option', { value: o, selected: o === cur ? '' : null }, o))); s.addEventListener('change', () => { on(s.value); draw(); play(); }); return s; };
      const code = P.h('pre', { class: 'sim-mc-code' });
      const scr = P.h('div', { class: 'sim-mc-scr' });
      const word = P.h('div', { class: 'sim-mc-w' }, '2026 가을 체육대회');
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
    '움직임은 <b>몇 초에 어디 있는지 적은 숫자 표</b>예요. 그 표는 글로 적을 수 있어요.',
    '클로드는 설명과 코드가 짝으로 붙은 글을 엄청나게 읽어서, <b>말 옆에 어떤 코드가 따라오는지</b> 외우고 있어요.'
  ],
  tip: {
    body: '클로드에게 모션그래픽을 시킬 때는 흔한 말과 숫자로 적어 주세요. "왼쪽 밖에서 가운데로, 1초 동안, 천천히 멈추게"처럼요. 많이 본 말일수록 외워 둔 코드 조각이 정확해요. "느낌 있게", "세련되게" 같은 말엔 붙는 코드가 없어요.',
    extra: '처음 보는 복잡한 동작을 시킬 땐 두 동작으로 나눠 주세요. "들어온 다음, 한 번 통통 튀게"처럼 흔한 동작 둘을 이으면 숫자가 덜 틀려요. 결과는 영상을 다 보는 대신 0.5초 사진 한 장을 달라고 해서 확인하면 돼요.'
  },
  myth: {
    myth: '클로드가 영상을 머릿속에 그려 보고 만든다.',
    fact: '클로드는 영상을 떠올리지 못해요. 움직임을 적은 글(코드)을 수없이 읽어서, 부탁 속 낱말 옆에 어떤 코드 조각이 오는지 외운 거예요. 그 조각을 이어 붙인 글을 브라우저가 읽고 그려요. 그래서 많이 본 움직임은 잘하고, 처음 보는 동작은 숫자가 틀려요.'
  },
  sources: [
    { title: 'MDN, Using CSS animations', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations', note: '처음 모양과 끝 모양을 글로 적으면 브라우저가 사이를 그려 주는 방식의 공식 설명.' },
    { title: 'W3C, CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/', note: '"천천히 멈춤" 같은 속도 곡선의 표준 정의.' },
    { title: 'Anthropic, Claude Code 공식 문서', url: 'https://docs.claude.com/en/docs/claude-code/overview', note: '클로드가 파일을 쓰고 명령을 돌리고 결과 그림을 읽어 확인하는 작업 방식.' },
    { title: 'FFmpeg 공식 문서', url: 'https://ffmpeg.org/ffmpeg.html', note: '그림 묶음을 영상으로 만들고 특정 시각의 그림을 꺼내는 도구의 설명서.' }
  ],
  script: `제목 글자가 왼쪽에서 들어오게 해 달라고 부탁하면, 손도 눈도 없는 클로드에게서 1분 뒤 영상이 와요. 어떻게 된 걸까요.

움직임은 사실 숫자 표예요. 0초엔 왼쪽 밖, 0.5초엔 중간을 지나, 1초엔 가운데. 몇 초에 어디 있는지 한 줄씩 적은 표요. 편집 프로그램 속도 이 표로 움직여요. 그리고 이 표는 글로 적을 수 있어요. 사람 말로도, 숫자 표로도, 컴퓨터 글로도요. 컴퓨터 글은 브라우저가 읽고 그대로 그려요. 그러니까 움직임 만들기는 글쓰기예요.

클로드는 인터넷에 있는 코드를 엄청나게 읽었어요. 설명과 코드가 짝으로 붙은 글들이요. "왼쪽에서 들어와"라는 설명 옆엔 늘 같은 코드가 있었어요. 그 짝을 외운 거예요. 그래서 부탁을 낱말로 쪼개고, 낱말마다 외워 둔 코드 조각을 붙여요. 조각을 이어 붙이면 글 한 편이 되고, 브라우저가 읽으면 움직임이 돼요.

많이 본 움직임은 잘하고, 처음 보는 복잡한 동작은 숫자가 틀려요. 쓴 글이 맞는지는 사진을 찍어 확인해요. 시킬 땐 흔한 말과 숫자로 적어 주세요.`
};
