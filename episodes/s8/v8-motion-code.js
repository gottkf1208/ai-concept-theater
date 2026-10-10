/* S8-76 손이 없는데 모션그래픽은 어떻게 만들까: 세로 무대(720×1280), 6장면 90초
   원리: 코드는 't초일 때의 한 장면'을 그리는 글 → 브라우저가 시간을 멈춰 30장 찍음 → FFmpeg가 묶음 → 그림 한 장으로 확인 → 되풀이 */
const EO = p => 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 3);           // 천천히 멈춤
const SM = p => { p = Math.max(0, Math.min(1, p)); return p * p * (3 - 2 * p); }; // 양쪽 다 천천히
const SP = p => { p = Math.max(0, Math.min(1, p)) - 1; return 1 + 2.70158 * p * p * p + 1.70158 * p * p; }; // 살짝 넘쳤다가 제자리
const typed = (el, full, p) => { el.textContent = full.slice(0, Math.round(Math.max(0, Math.min(1, p)) * full.length)); };
const CODE = ['@keyframes in {', '  from { left: -100% }  /* 0초 */', '  to   { left: 50% }    /* 1초 */', '}', 'animation: in 1s ease-out;'];

/* 장면 전용 스타일: 장면을 지을 때마다 무대 안에 넣어요(무대는 장면마다 비워지니까) */
const CSS = `
.mc-panel{position:absolute;border-radius:28px;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.9);box-shadow:0 20px 50px -30px rgba(27,31,36,.35)}
.mc-say{position:absolute;font-size:24px;font-weight:700;line-height:1.4;color:var(--ink);min-height:34px}
.mc-say.ask{background:rgba(255,255,255,.9);border-radius:16px;padding:12px 16px;border:1px solid rgba(27,31,36,.08);box-sizing:border-box}
.mc-say b{color:var(--acc1)}
.mc-code{position:absolute;border-radius:18px;background:var(--ink-soft);color:#fff;padding:16px 20px;font-family:var(--mono);font-size:20px;line-height:1.7;opacity:0;transition:opacity .3s;box-sizing:border-box}
.mc-code.mini{opacity:1;line-height:1.5;padding:12px 18px}
.mc-file{font-size:16px;color:var(--muted2);margin-bottom:4px}
.mc-line{white-space:pre;min-height:1.7em}
.mc-screen{position:absolute;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);overflow:hidden;opacity:0;transition:opacity .3s;box-sizing:border-box}
.mc-screen.big,.mc-screen.mini{opacity:1;transform-origin:50% 50%}
.mc-mid{position:absolute;left:50%;top:10%;height:80%;border-left:2px dashed var(--muted2);opacity:.7}
.mc-zone{position:absolute;left:5%;top:0;width:45%;height:100%;background:var(--acc2-pale);opacity:0;transition:opacity .3s}
.mc-half{position:absolute;left:5%;top:10%;height:80%;border-left:2px dashed var(--acc2);opacity:0;transition:opacity .3s}
.mc-lab{position:absolute;bottom:8px;font-size:16px;font-weight:800;color:var(--muted2);transform:translateX(-50%)}
.mc-word{position:absolute;top:50%;left:-40%;transform:translate(-50%,-50%);width:auto;text-align:center;font-weight:800;font-size:38px;color:var(--acc1);white-space:nowrap;letter-spacing:-.02em}
.mc-screen.mini .mc-word{font-size:26px}
.mc-ghost{position:absolute;top:78%;width:5px;height:14%;margin-left:-2px;border-radius:3px;background:var(--acc2);opacity:0;transition:opacity .4s}
.mc-tag{position:absolute;right:12px;top:10px;font-size:18px;font-weight:800;color:#fff;background:var(--acc2);border-radius:999px;padding:2px 12px}
.mc-row{position:absolute;display:flex;align-items:center;gap:14px;height:56px;border-radius:16px;background:rgba(255,255,255,.75);padding:0 16px;box-sizing:border-box;border:2px solid transparent;transition:border-color .2s,background .2s}
.mc-row.on{border-color:var(--acc1);background:#fff}
.mc-k{font-weight:800;font-size:24px;color:var(--ink);width:70px}
.mc-c{font-family:var(--mono);font-size:24px;font-weight:700;color:var(--acc1);flex:1}
.mc-v{font-size:22px;font-weight:700;color:var(--muted2)}
.mc-browser{position:absolute;border-radius:20px;background:#fff;border:1px solid rgba(27,31,36,.1);overflow:hidden;box-sizing:border-box}
.mc-bbar{height:44px;background:#F2F4F6;display:flex;align-items:center;gap:8px;padding:0 16px;font-size:16px;color:var(--muted2);font-family:var(--mono)}
.mc-bbar i{width:12px;height:12px;border-radius:50%;background:var(--muted2);opacity:.5}
.mc-view{position:absolute;left:0;top:44px;right:0;bottom:0;overflow:hidden}
.mc-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
.mc-card{position:absolute;left:0;top:0;width:150px;height:84px;border-radius:10px;background:#fff;border:1px solid rgba(27,31,36,.12);box-shadow:0 8px 18px -10px rgba(27,31,36,.5);overflow:hidden;transform-origin:0 0;will-change:transform}
.mc-cw{position:absolute;top:50%;transform:translate(-50%,-50%);width:auto;text-align:center;font-weight:800;font-size:18px;color:var(--acc1);white-space:nowrap}
.mc-cn{position:absolute;right:6px;bottom:4px;font-family:var(--mono);font-size:11px;color:var(--muted2)}
.mc-term{position:absolute;border-radius:18px;background:var(--ink-soft);color:#fff;padding:18px 22px;font-family:var(--mono);font-size:19px;line-height:1.7;box-sizing:border-box;overflow-wrap:anywhere}
.mc-term.mini{font-size:20px;padding:10px 18px}
.mc-ps{color:var(--acc2)}
.mc-cmd{display:inline}
.mc-term.mini .mc-cmd{display:block}
.mc-strip{position:absolute;display:flex;gap:4px;padding:18px 10px;box-sizing:border-box;background:var(--ink-soft);border-radius:14px;background-image:radial-gradient(circle,#fff 2.5px,transparent 3px),radial-gradient(circle,#fff 2.5px,transparent 3px);background-size:20px 8px;background-position:0 4px,0 98px;background-repeat:repeat-x;transform-origin:50% 50%}
.mc-cell{position:relative;flex:1;height:74px;background:#fff;border-radius:3px;overflow:hidden;opacity:0;transition:opacity .15s}
.mc-cell b{position:absolute;top:50%;width:60%;height:6px;margin-top:-3px;border-radius:3px;background:var(--acc1)}
.mc-file-ic{position:absolute;border-radius:22px;background:#fff;border:2px solid var(--acc2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transform-origin:50% 50%;box-sizing:border-box;box-shadow:0 20px 40px -24px rgba(27,31,36,.5)}
.mc-fname{font-family:var(--mono);font-weight:800;font-size:30px;color:var(--ink)}
.mc-fsub{font-size:18px;font-weight:700;color:var(--muted2);text-align:center;padding:0 12px}
`;
const sty = (stage, P) => stage.append(P.h('style', {}, CSS));

export default {
  slug: 'v8-motion-code',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  title: '손이 없는데 모션그래픽은 어떻게 만들까',
  subtitle: '시간을 멈춰서 사진으로 찍는 편집',
  summary: '제목 글자가 미끄러져 들어오게 해 달라고 하면 클로드는 코드 몇 줄을 써요. 그 코드는 "t초일 때 화면이 어떤 모양인지"를 적은 글이에요. 클로드는 영상을 볼 수 없어서 브라우저에게 시간을 0.033초씩 멈춰 사진 30장을 찍게 하고, FFmpeg에 명령 한 줄을 보내 묶고, 그중 한 장을 꺼내 보고 고쳐요. 그 되풀이를 90초에 보여줘요.',
  keywords: ['모션그래픽', '키프레임', '이징', '프레임', '시간 멈춰 찍기', 'seek', 'Playwright', 'FFmpeg', '렌더', '확인 루프'],

  scenes: [
    /* 1 ── 부탁 한 줄 → 클로드가 파일을 써요 */
    {
      title: '부탁 한 줄', dur: 12,
      captions: [
        { t: 0, text: '부탁은 한 줄이에요.' },
        { t: 3.5, text: '클로드는 마우스 대신 파일을 써요.' },
        { t: 7.5, text: '코드 다섯 줄이 움직임 전부예요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        stage.append(P.h('div', { class: 'mc-panel', style: 'left:60px;top:110px;width:600px;height:690px' }));
        const ask = P.bubble({ x: 90, y: 140, w: 540, text: '제목 글자가 <b>왼쪽에서 들어와</b> 가운데 서게 해 줘', tail: 'none', size: 26, tone: 'soft' });
        tl.at(stage.appendChild(ask.el), .3, { from: 'up' });
        const who = P.chip({ x: 90, y: 290, text: '클로드', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(who.el), 2, { from: 'pop' });
        const say = P.h('div', { class: 'mc-say', style: 'left:200px;top:292px;width:430px' });
        stage.append(say);
        const code = P.h('div', { class: 'mc-code', style: 'left:90px;top:350px;width:540px;height:230px' });
        const rows = CODE.map(() => P.h('div', { class: 'mc-line' }));
        code.append(P.h('div', { class: 'mc-file' }, 'title.html'), ...rows);
        stage.append(code);
        const prev = P.h('div', { class: 'mc-screen', style: 'left:90px;top:610px;width:540px;height:160px' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        prev.append(P.h('div', { class: 'mc-mid' }), word); stage.append(prev);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t > 1.5 && t < 11);
            typed(say, '파일을 하나 만들게요.', (t - 2) / 1.2);
            code.style.opacity = t > 3.6 ? 1 : 0;
            rows.forEach((r, i) => typed(r, CODE[i], (t - 4 - i * .8) / .7));
            prev.style.opacity = t > 8.4 ? 1 : 0;
            const p = EO(((t - 8.6) % 3) / 1);
            word.style.left = `${-40 + 90 * (t > 8.6 ? p : 0)}%`;
          }
        };
      }
    },
    /* 2 ── 코드 = 't초일 때의 그림' */
    {
      title: '시간을 넣으면 그림이 나와요', dur: 16,
      captions: [
        { t: 0, text: '이 코드는 시간표예요.' },
        { t: 4, text: 't에 0.3초를 넣으면 0.3초 그림이 나와요.' },
        { t: 8.5, text: '0.7초를 넣으면 0.7초 그림.' },
        { t: 12, text: '시간을 넣으면 그 순간 그림이 나오는 식이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const rows = [['처음', 'left: -100%', '0초'], ['끝', 'left: 50%', '1초'], ['속도', 'ease-out', '천천히 멈춤']].map(([k, c, v], i) => {
          const r = P.h('div', { class: 'mc-row', style: `left:60px;top:${110 + i * 68}px;width:600px` },
            P.h('span', { class: 'mc-k' }, k), P.h('span', { class: 'mc-c' }, c), P.h('span', { class: 'mc-v' }, v));
          tl.at(stage.appendChild(r), .2 + i * .3, { from: 'up' }); return r;
        });
        /* 시간 다이얼 */
        lines.append(P.s('rect', { x: 100, y: 394, width: 520, height: 10, rx: 5, fill: '#9AA5AF', opacity: .45 }));
        const fillR = P.s('rect', { x: 100, y: 394, width: 0, height: 10, rx: 5, fill: '#127E90' }); lines.append(fillR);
        const knob = P.s('circle', { cx: 100, cy: 399, r: 18, fill: '#fff', stroke: '#127E90', 'stroke-width': 6 }); lines.append(knob);
        const t0 = P.text({ x: 60, y: 420, w: 100, text: '0초', size: 22, weight: 700, color: '#9AA5AF' });
        const t1 = P.text({ x: 560, y: 420, w: 100, text: '1초', size: 22, weight: 700, align: 'right', color: '#9AA5AF' });
        const read = P.text({ x: 160, y: 420, w: 400, text: '', size: 30, weight: 800, align: 'center', cls: 'mono' });
        tl.at(stage.appendChild(t0.el), 1.2, { from: 'up' }); tl.at(stage.appendChild(t1.el), 1.2, { from: 'up' }); tl.at(stage.appendChild(read.el), 1.2, { from: 'up' });
        const scr = P.h('div', { class: 'mc-screen big', style: 'left:60px;top:490px;width:600px;height:170px' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        scr.append(P.h('div', { class: 'mc-mid' }), word); stage.append(scr);
        const ghosts = Array.from({ length: 6 }, () => { const g = P.h('div', { class: 'mc-ghost' }); scr.append(g); return g; });
        const pos = P.text({ x: 60, y: 690, w: 600, text: '', size: 24, weight: 700, align: 'center', color: '#9AA5AF' });
        tl.at(stage.appendChild(pos.el), 1.5, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            /* 1.5초부터 3초마다 한 바퀴: 2초 동안 0→1, 1초 멈춤 */
            const dial = Math.min(1, (Math.max(0, t - 1.5) % 3) / 2);
            knob.setAttribute('cx', 100 + 520 * dial); fillR.setAttribute('width', 520 * dial);
            read.set(`t = ${dial.toFixed(2)}초`);
            const p = EO(dial);
            word.style.left = `${-40 + 90 * p}%`;
            pos.set(`글자 위치 ${Math.round(p * 100)}%  (0% 왼쪽 밖, 100% 가운데)`);
            rows[0].classList.toggle('on', dial < .05); rows[1].classList.toggle('on', dial > .95); rows[2].classList.toggle('on', dial >= .05 && dial <= .95);
            /* 12초부터 잔상: 같은 간격의 시간인데 자리는 점점 촘촘해져요 */
            ghosts.forEach((g, i) => { g.style.left = `${-40 + 90 * EO((i + 1) / 7)}%`; g.style.opacity = t > 12 ? 1 : 0; });
          }
        };
      }
    },
    /* 3 ── 시간을 멈춰서 찍어요 (핵심) */
    {
      title: '시간을 멈춰서 찍어요', dur: 18,
      captions: [
        { t: 0, text: '클로드는 영상을 못 봐요. 그림만 봐요.' },
        { t: 4.5, text: '그래서 시간을 멈춰요. 0.000초, 찰칵.' },
        { t: 9, text: '0.033초 넘기고 또 찰칵. 30번.' },
        { t: 14, text: '1초짜리 영상이 사진 30장이 됐어요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const br = P.h('div', { class: 'mc-browser', style: 'left:60px;top:110px;width:600px;height:230px' });
        const view = P.h('div', { class: 'mc-view' });
        const word = P.h('div', { class: 'mc-word' }, '2026 가을 체육대회');
        const flash = P.h('div', { class: 'mc-flash' });
        view.append(P.h('div', { class: 'mc-mid' }), word, flash);
        br.append(P.h('div', { class: 'mc-bbar' }, P.h('i'), P.h('i'), P.h('i'), P.h('span', {}, 'title.html')), view);
        stage.append(br); tl.at(br, .2, { from: 'up' });
        const seek = P.text({ x: 60, y: 356, w: 600, text: 'seek(0.000)', size: 30, weight: 800, align: 'center', cls: 'mono', color: '#127E90' });
        tl.at(stage.appendChild(seek.el), 4.2, { from: 'pop' });
        const cnt = P.text({ x: 400, y: 520, w: 260, text: '', size: 64, weight: 800, align: 'center' });
        const cntL = P.text({ x: 400, y: 600, w: 260, text: '장 찍음', size: 24, weight: 700, align: 'center', color: '#9AA5AF' });
        tl.at(stage.appendChild(cnt.el), 4.4, { from: 'pop' }); tl.at(stage.appendChild(cntL.el), 4.4, { from: 'pop' });
        /* 사진 30장: 브라우저 화면에서 왼쪽 아래 더미로 날아가요 */
        const cards = Array.from({ length: 30 }, (_, i) => {
          const c = P.h('div', { class: 'mc-card' }, P.h('div', { class: 'mc-cw', style: `left:${-40 + 90 * EO(i / 29)}%` }, '체육대회'), P.h('span', { class: 'mc-cn' }, String(i + 1).padStart(3, '0')));
          c.style.opacity = 0; stage.append(c); return c;
        });
        const done = P.chip({ x: 60, y: 740, text: '사진 30장 = 1초', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(done.el), 14.2, { from: 'pop' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'oops' });
        stage.append(q.el);
        const T0 = 4.5, STEP = .32;
        return {
          tick(t) {
            q.tick(t, t < 4 || (t > 13.5 && t < 17));
            const k = t < T0 ? 0 : Math.min(30, Math.floor((t - T0) / STEP) + 1);
            const cur = Math.max(0, k - 1), frac = cur / 30;
            word.style.left = `${-40 + 90 * EO(frac)}%`;
            seek.set(`seek(${frac.toFixed(3)})`);
            const since = t - (T0 + cur * STEP);
            flash.style.opacity = t >= T0 && t < T0 + 30 * STEP ? Math.max(0, 1 - since / .18) * .9 : 0;
            cnt.set(t >= T0 ? `${k} / 30` : '');
            cards.forEach((c, i) => {
              if (i >= k) { c.style.opacity = 0; return; }
              const p = SP((t - (T0 + i * STEP) - .05) / .45);
              const sx = 285, sy = 190, ex = 80 + i * 1.6, ey = 640 - i * 1.4, rot = ((i % 5) - 2) * 2.5;
              c.style.opacity = 1;
              c.style.transform = `translate(${sx + (ex - sx) * p}px, ${sy + (ey - sy) * p}px) rotate(${rot * p}deg) scale(${1.6 - .6 * p})`;
            });
          }
        };
      }
    },
    /* 4 ── FFmpeg 한 줄로 묶어요 */
    {
      title: '한 줄로 묶어요', dur: 14,
      captions: [
        { t: 0, text: '사진 30장은 아직 영상이 아니에요.' },
        { t: 4, text: 'FFmpeg에 명령 한 줄. 이것도 글이에요.' },
        { t: 8.5, text: '30장이 이어 붙어 1초짜리 mp4가 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const term = P.h('div', { class: 'mc-term', style: 'left:60px;top:110px;width:600px;height:90px' });
        const cmd = P.h('span', { class: 'mc-cmd' }); term.append(P.h('span', { class: 'mc-ps' }, '$ '), cmd); stage.append(term);
        tl.at(term, .3, { from: 'up' });
        const CMD = 'ffmpeg -framerate 30 -i frame_%03d.png out.mp4';
        [['1초에 30장', 60], ['frame_001 ~ 030', 250], ['out.mp4', 500]].forEach(([s, x], i) => {
          const c = P.chip({ x, y: 222, text: s, color: i === 2 ? 'orange' : 'aqua', size: 22 });
          tl.at(stage.appendChild(c.el), 4.6 + i * .5, { from: 'pop' });
        });
        /* 필름 띠: 30칸 */
        const strip = P.h('div', { class: 'mc-strip', style: 'left:60px;top:300px;width:600px;height:110px' });
        const cells = Array.from({ length: 30 }, (_, i) => { const d = P.h('div', { class: 'mc-cell' }, P.h('b', { style: `left:${-60 + 80 * EO(i / 29)}%` })); strip.append(d); return d; });
        stage.append(strip);
        const file = P.h('div', { class: 'mc-file-ic', style: 'left:210px;top:450px;width:300px;height:150px' },
          P.h('div', { class: 'mc-fname' }, 'out.mp4'), P.h('div', { class: 'mc-fsub' }, '1초 · 30장 · 글자가 들어오는 영상'));
        stage.append(file);
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 13);
            typed(cmd, CMD, (t - .6) / 3);
            cells.forEach((c, i) => { c.style.opacity = t > 5.2 + i * .07 ? 1 : 0; });
            /* 9초: 띠가 가운데로 모여 파일 하나가 돼요 */
            const g = SM((t - 9) / 1.2);
            strip.style.transform = `translateY(${150 * g}px) scaleX(${1 - .85 * g}) scaleY(${1 - .3 * g})`;
            strip.style.opacity = 1 - g;
            file.style.opacity = t > 9.9 ? 1 : 0;
            file.style.transform = `scale(${SP((t - 9.9) / .5)})`;
          }
        };
      }
    },
    /* 5 ── 그림 한 장으로 확인하고, 틀리면 되풀이 */
    {
      title: '그림 한 장으로 확인해요', dur: 16,
      captions: [
        { t: 0, text: 'mp4도 못 봐요. 그래서 한 장만 꺼내요.' },
        { t: 4, text: '0.5초 그림. 글자가 길의 절반을 넘었으면 맞아요.' },
        { t: 8.5, text: '틀리면 코드를 고치고 다시 찍어요.' },
        { t: 12.5, text: '쓰고, 찍고, 묶고, 보고. 이걸 되풀이해요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        const cmd = P.text({ x: 60, y: 110, w: 600, text: 'ffmpeg -ss 0.5 -frames:v 1 check.png', size: 22, weight: 700, cls: 'mono', color: '#9AA5AF' });
        tl.at(stage.appendChild(cmd.el), .3, { from: 'up' });
        const fr = P.h('div', { class: 'mc-screen big', style: 'left:110px;top:160px;width:500px;height:200px' });
        const zone = P.h('div', { class: 'mc-zone' });
        const word = P.h('div', { class: 'mc-word', style: `left:${-40 + 90 * EO(.5)}%` }, '2026 가을 체육대회');
        const half = P.h('div', { class: 'mc-half' });
        fr.append(zone, half, P.h('div', { class: 'mc-mid' }), P.h('span', { class: 'mc-lab', style: 'left:5%' }, '절반'), P.h('span', { class: 'mc-lab', style: 'left:50%' }, '도착'), word, P.h('span', { class: 'mc-tag' }, '0.5초')); stage.append(fr);
        const ok = P.chip({ x: 60, y: 380, text: '절반 넘게 왔어요. 천천히 멈추는 중. 맞아요', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(ok.el), 6, { from: 'pop' });
        /* 되풀이 고리 */
        const B = [['쓰기', '코드 몇 줄', 60, 460], ['찍기', '시간 멈춰 30장', 380, 460], ['묶기', 'FFmpeg 한 줄', 380, 640], ['보기', '그림 한 장', 60, 640]].map(([l, s, x, y], i) => {
          const b = P.box({ x, y, w: 280, h: 110, label: l, sub: s, accent: i === 3 ? 'orange' : 'aqua' });
          tl.at(stage.appendChild(b.el), 8.8 + i * .35, { from: 'pop' }); return b;
        });
        const A = [
          P.arrow(lines, { x1: 345, y1: 515, x2: 375, y2: 515, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 520, y1: 575, x2: 520, y2: 635, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 375, y1: 695, x2: 345, y2: 695, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 200, y1: 635, x2: 200, y2: 575, width: 4, color: '#F2812D', dashed: true })
        ];
        const wrong = P.chip({ x: 215, y: 588, text: '틀리면', color: 'orange', size: 20 });
        tl.at(stage.appendChild(wrong.el), 12.6, { from: 'pop' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            fr.style.opacity = t > .8 ? 1 : 0;
            fr.style.transform = `scale(${.6 + .4 * SP((t - 1) / .5)})`;
            zone.style.opacity = t > 4 ? 1 : 0; half.style.opacity = t > 4 ? 1 : 0;
            A.forEach((a, i) => a.draw((t - 10.2 - i * .6) / .5));
            B.forEach((b, i) => b.on((t > 10.2 + i * .6 && t < 10.9 + i * .6) || (t > 13.5 && Math.floor((t - 13.5) * 2) % 4 === i)));
          }
        };
      }
    },
    /* 6 ── 채팅창에서 실제로 보이는 순서 */
    {
      title: '채팅창에서 보이는 것', dur: 14,
      captions: [
        { t: 0, text: '그래서 채팅창엔 이 순서로 보여요.' },
        { t: 4, text: '코드, 명령, 그림 한 장, 확인했어요.' },
        { t: 8.5, text: '시킬 땐 처음, 끝, 시간, 속도표를 적어 주세요.' }
      ],
      build({ stage, lines, P, tl }) {
        sty(stage, P);
        stage.append(P.h('div', { class: 'mc-panel', style: 'left:60px;top:110px;width:600px;height:560px' }));
        const items = [
          P.h('div', { class: 'mc-code mini', style: 'left:90px;top:140px;width:540px;height:90px' }, P.h('div', { class: 'mc-file' }, 'title.html'), P.h('div', { class: 'mc-line' }, 'animation: in 1s ease-out;')),
          P.h('div', { class: 'mc-term mini', style: 'left:90px;top:250px;width:540px;height:90px' }, P.h('div', { class: 'mc-cmd' }, '$ 사진 30장 찍기'), P.h('div', { class: 'mc-cmd' }, '$ ffmpeg … out.mp4')),
          P.h('div', { class: 'mc-screen mini', style: 'left:90px;top:360px;width:260px;height:110px' }, P.h('div', { class: 'mc-mid' }), P.h('div', { class: 'mc-word', style: `left:${-40 + 90 * EO(.5)}%` }, '체육대회'), P.h('span', { class: 'mc-tag' }, '0.5초')),
          P.h('div', { class: 'mc-say', style: 'left:370px;top:372px;width:260px;font-size:22px' }, '확인했어요. 0.5초에 글자가 길의 절반을 넘었어요.')
        ];
        items.forEach((el, i) => { stage.append(el); tl.at(el, .6 + i * 1.3, { from: 'up' }); });
        ['코드', '명령', '그림 한 장', '확인'].forEach((s, i) => {
          const c = P.chip({ x: 90 + i * 135, y: 500, text: s, color: 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), 4.3 + i * .25, { from: 'pop' });
        });
        const ask = P.h('div', { class: 'mc-say ask', style: 'left:90px;top:560px;width:540px', html: '제목이 <b>왼쪽 밖</b>에서 <b>가운데</b>로, <b>1초</b> 동안, <b>천천히 멈추게</b>' });
        stage.append(ask); tl.at(ask, 8.8, { from: 'up' });
        ['처음', '끝', '시간', '속도표'].forEach((s, i) => {
          const c = P.chip({ x: 60 + i * 150, y: 700, text: s, color: i === 3 ? 'orange' : 'aqua', size: 24 });
          tl.at(stage.appendChild(c.el), 9.6 + i * .3, { from: 'pop' });
        });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 13); } };
      }
    }
  ],

  interaction: {
    title: '시간을 멈춰서 찍어 보기',
    desc: '시간 슬라이더를 움직이면 그 순간의 그림이 나와요. "찍기"를 누르면 그 자리의 사진이 아래 줄에 쌓이고, 30장을 채우면 "묶기"가 켜져요. 클로드가 영상을 만들 때 브라우저와 FFmpeg에게 시키는 일을 손으로 해 보는 거예요.',
    mount(el, P) {
      let t = 0, shots = [], timer = null;
      const EASE = { 'ease-out': EO, linear: p => p, 'ease-in': p => p * p * p };
      let ease = 'ease-out';
      const slider = P.h('input', { type: 'range', min: '0', max: '1', step: '0.001', value: '0', class: 'sim-mc-range', 'aria-label': '시간(초)' });
      const read = P.h('div', { class: 'sim-mc-read' }, 't = 0.000초');
      const scr = P.h('div', { class: 'sim-mc-scr' });
      const word = P.h('div', { class: 'sim-mc-w' }, '2026 가을 체육대회');
      scr.append(P.h('div', { class: 'sim-mc-m' }), word);
      const bShot = P.h('button', { class: 'btn primary', type: 'button' }, '찍기');
      const bAuto = P.h('button', { class: 'btn', type: 'button' }, '30장 자동으로 찍기');
      const bPack = P.h('button', { class: 'btn', type: 'button', disabled: '' }, '묶기 (FFmpeg)');
      const bReset = P.h('button', { class: 'btn', type: 'button' }, '비우기');
      const NAMES = { 'ease-out': 'ease-out · 천천히 멈춤', linear: 'linear · 똑같은 속도', 'ease-in': 'ease-in · 천천히 출발' };
      const selE = P.h('select', { class: 'sim-mc-sel', 'aria-label': '속도표' }, ...Object.keys(EASE).map(k => P.h('option', { value: k, selected: k === ease ? '' : null }, NAMES[k])));
      const roll = P.h('div', { class: 'sim-mc-roll' });
      const out = P.h('div', { class: 'sim-mc-out' });
      const note = P.h('p', { class: 'sim-mc-note' }, '슬라이더를 끌어 시간을 고르고 "찍기"를 눌러 보세요.');
      el.append(
        P.h('style', {}, `
          .sim-mc-range{width:100%;accent-color:#127E90}
          .sim-mc-read{font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:800;font-size:18px;margin:4px 0 8px}
          .sim-mc-scr{position:relative;height:90px;border-radius:14px;background:#fff;border:1px solid #E5E8EB;overflow:hidden}
          .sim-mc-m{position:absolute;left:50%;top:10%;height:80%;border-left:2px dashed #9AA5AF}
          .sim-mc-w{position:absolute;top:50%;left:-40%;width:auto;text-align:center;transform:translate(-50%,-50%);font-weight:800;font-size:clamp(16px,4vw,24px);color:#127E90;white-space:nowrap}
          .sim-mc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0}
          .sim-mc-sel{height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:600;max-width:100%}
          .sim-mc-roll{display:flex;gap:3px;flex-wrap:wrap;min-height:34px;padding:6px;border-radius:12px;background:#1B1F24}
          .sim-mc-f{position:relative;width:calc((100% - 87px)/30);min-width:14px;height:30px;border-radius:3px;background:#fff;overflow:hidden}
          .sim-mc-f b{position:absolute;top:50%;width:60%;height:4px;margin-top:-2px;border-radius:2px;background:#127E90}
          .sim-mc-out{margin-top:10px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;background:#F2F4F6;border-radius:12px;padding:10px 12px;white-space:pre-wrap;min-height:48px}
          .sim-mc-note{font-size:13px;color:#4E5968;margin-top:8px}
        `),
        slider, read, scr,
        P.h('div', { class: 'sim-mc-row' }, bShot, bAuto, bPack, bReset, selE),
        roll, out, note
      );
      function place(v) { t = v; read.textContent = `t = ${t.toFixed(3)}초`; word.style.left = `${-40 + 90 * EASE[ease](t)}%`; }
      function shoot(v) {
        if (shots.length >= 30) return;
        shots.push(v);
        roll.append(P.h('div', { class: 'sim-mc-f', title: `frame_${String(shots.length).padStart(3, '0')}.png (t=${v.toFixed(3)})` }, P.h('b', { style: `left:${-60 + 80 * EASE[ease](v)}%` })));
        out.textContent = `frame_${String(shots.length).padStart(3, '0')}.png  ←  seek(${v.toFixed(3)})\n찍은 사진 ${shots.length} / 30`;
        bPack.disabled = shots.length < 30;
        if (shots.length === 30) note.textContent = '30장이 다 찼어요. "묶기"를 누르면 FFmpeg 명령이 나와요.';
      }
      function reset() { shots = []; roll.textContent = ''; out.textContent = ''; bPack.disabled = true; if (timer) { clearInterval(timer); timer = null; } }
      slider.addEventListener('input', () => place(parseFloat(slider.value)));
      selE.addEventListener('change', () => { ease = selE.value; place(t); });
      bShot.addEventListener('click', () => shoot(t));
      bAuto.addEventListener('click', () => {
        if (timer) return; reset(); let i = 0;
        timer = setInterval(() => { const v = i / 30; slider.value = v; place(v); shoot(v); i += 1; if (i >= 30) { clearInterval(timer); timer = null; } }, 90);
      });
      bPack.addEventListener('click', () => {
        out.textContent = `$ ffmpeg -framerate 30 -i frame_%03d.png -c:v libx264 -pix_fmt yuv420p out.mp4\n→ out.mp4 (1초, 30장, 속도표 ${ease})\n\n확인: $ ffmpeg -ss 0.5 -i out.mp4 -frames:v 1 check.png\n→ 0.5초 그림에서 글자 위치 ${Math.round(EASE[ease](.5) * 100)}%`;
        note.textContent = 'FFmpeg는 사진을 이어 붙이기만 해요. 움직임의 느낌은 찍기 전, 코드의 속도표가 정해요.';
      });
      bReset.addEventListener('click', () => { reset(); note.textContent = '슬라이더를 끌어 시간을 고르고 "찍기"를 눌러 보세요.'; });
      place(0);
    }
  },

  teacherLines: [
    '클로드는 영상을 보지 못해요. 그래서 <b>시간을 멈춰 사진 30장</b>을 찍고, 그중 한 장을 보고 확인해요.',
    '코드는 <b>t초일 때의 그림</b>을 적은 글이에요. 처음, 끝, 시간, 속도표를 적으면 사이는 브라우저가 그려요.'
  ],
  tip: {
    body: '클로드에게 모션그래픽을 시킬 때는 네 가지를 한 줄에 적어 주세요. 처음 위치, 끝 위치, 시간, 속도표. 예: "제목이 왼쪽 밖에서 가운데로, 1초 동안, 천천히 멈추게." 되묻는 일이 줄고 한 번에 비슷하게 나와요.',
    extra: '채팅창에 코드 블록, 명령 몇 줄, 그림 한 장이 차례로 지나가면 지금 쓰고 찍고 묶고 보는 중이에요. 확인용으로는 "0.5초 그림 한 장만 보여 줘"라고 하면 돼요. 천천히 멈추는 속도표면 그 그림에서 글자가 길의 절반을 넘어 있어요.'
  },
  myth: {
    myth: '클로드가 영상을 보면서 편집 프로그램처럼 직접 만진다.',
    fact: '클로드는 영상을 재생해서 보지 못해요. 화면을 그리는 코드를 쓰고, 브라우저가 시간을 멈춰 한 장씩 찍고, FFmpeg가 이어 붙여요. 결과는 그중 몇 장을 사진으로 꺼내 확인해요. 그래서 "처음·중간·끝 세 장을 먼저 보여 줘"가 잘 통해요.'
  },
  sources: [
    { title: 'MDN, Using CSS animations (@keyframes)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations', note: '처음 모양과 끝 모양을 글로 적으면 브라우저가 사이를 그리는 방식.' },
    { title: 'W3C, CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/', note: '속도표(이징)의 표준 정의. ease-out 같은 이름이 여기서 정해져요.' },
    { title: 'Playwright 공식 문서, Screenshots', url: 'https://playwright.dev/docs/screenshots', note: '브라우저 화면을 프로그램으로 찍는 방법. 시간을 멈춰 한 장씩 찍을 때 써요.' },
    { title: 'FFmpeg 공식 문서', url: 'https://ffmpeg.org/ffmpeg.html', note: '그림 묶음을 영상으로 만들고, 영상에서 특정 시각의 그림을 꺼내는 명령줄 도구.' }
  ],
  script: `제목 글자가 왼쪽에서 들어오게 해 달라고 하면 클로드는 파일을 하나 써요. 코드 다섯 줄이에요. 처음 자리, 끝 자리, 1초, 천천히 멈춤. 이 코드는 시간표라서 t에 0.3초를 넣으면 0.3초 그림이, 0.7초를 넣으면 0.7초 그림이 나와요.

그런데 클로드는 영상을 못 봐요. 그림만 봐요. 그래서 브라우저에게 시간을 멈추라고 해요. 0초에서 찰칵, 0.033초에서 찰칵. 서른 번 찍으면 1초짜리 영상이 사진 30장이 돼요.

사진은 아직 영상이 아니죠. FFmpeg에 명령 한 줄을 보내면 30장이 이어 붙어 mp4가 돼요. mp4도 못 보니까 0.5초 그림 한 장을 꺼내 봐요. 글자가 길의 절반을 넘어 있으면 천천히 멈추는 중이니 맞은 거예요. 틀리면 코드를 고치고 다시 찍어요. 쓰고, 찍고, 묶고, 보고. 이걸 되풀이해요.

그래서 채팅창엔 코드, 명령, 그림 한 장, 확인했어요 순서로 보여요. 시킬 땐 처음, 끝, 시간, 속도표 네 가지를 적어 주세요.`
};
