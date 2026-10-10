/* S8-76 손이 없는데 모션그래픽은 어떻게 만들까: 세로 무대(720×1280), 6장면 90초 */
export default {
  slug: 'v8-motion-code',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  title: '손이 없는데 모션그래픽은 어떻게 만들까',
  subtitle: '처음 그림, 끝 그림, 그리고 속도표',
  summary: '제목 글자가 미끄러져 들어오게 해 달라고 하면 클로드는 마우스로 끌지 않아요. "0초엔 왼쪽 밖, 1초엔 가운데"라고 글로 적어요. 처음 그림과 끝 그림만 정하면 사이는 컴퓨터가 채우고, 어떤 속도로 지날지는 속도표 한 줄이 정해요. 그 글이 영상이 되는 길을 90초에 따라가요.',
  keywords: ['모션그래픽', '키프레임', '이징', '속도표', '사이 채우기', '코드로 그리는 애니메이션', '렌더', '프레임', 'FFmpeg'],

  scenes: [
    {
      title: '부탁 한 줄', dur: 12,
      captions: [
        { t: 0, text: '제목 글자가 왼쪽에서 들어와 가운데 서게 해 줘.' },
        { t: 4.5, text: '클로드는 손이 없어요.' },
        { t: 8, text: '그런데 돼요. 손 대신 <em>글</em>로 적으니까요.' }
      ],
      build({ stage, lines, P, tl }) {
        const ask = P.bubble({ x: 60, y: 130, w: 600, text: '제목 글자가 <b>왼쪽에서 들어와</b> 가운데 서게 해 줘', tail: 'bottom', size: 30, tone: 'soft' });
        tl.at(stage.appendChild(ask.el), .3, { from: 'up' });
        const screen = P.box({ x: 60, y: 380, w: 600, h: 280, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(screen.el), 1.6, { from: 'pop' });
        const title = P.text({ x: 60, y: 492, w: 600, text: '2026 가을 체육대회', size: 46, weight: 800, align: 'center', color: '#127E90' });
        stage.append(title.el);
        const no = P.chip({ x: 60, y: 710, text: '마우스를 잡을 손이 없어요', color: 'orange', size: 26 });
        tl.at(stage.appendChild(no.el), 4.8, { from: 'pop' });
        const yes = P.chip({ x: 60, y: 772, text: '대신 글로 적어요', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(yes.el), 8.3, { from: 'pop' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t > 4 && t < 11.5);
            const p = P.clamp((t - 2) / 1, 0, 1), e = 1 - Math.pow(1 - p, 3);
            title.el.style.transform = `translateX(${(-720 + 720 * e).toFixed(1)}px)`;
            title.el.style.opacity = t > 1.9 ? 1 : 0;
          }
        };
      }
    },
    {
      title: '손 대신 글', dur: 14,
      captions: [
        { t: 0, text: '편집 프로그램은 마우스로 끌어다 놓아요.' },
        { t: 4.5, text: '클로드는 같은 일을 글로 적어요.' },
        { t: 8.5, text: '0초엔 왼쪽 밖, 1초엔 가운데. 두 줄이면 끝.' }
      ],
      build({ stage, lines, P, tl }) {
        const a = P.box({ x: 60, y: 120, w: 600, h: 230, label: '손으로 끄는 편집', sub: '글자를 집어서 옮기고<br>시간 자리마다 점을 찍어요', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        const b = P.box({ x: 60, y: 400, w: 600, h: 230, label: '글로 적는 편집', sub: '0초에는 왼쪽 밖<br>1초에는 가운데', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(b.el), 4.8, { from: 'up' });
        const same = P.text({ x: 60, y: 680, w: 600, text: '결과는 같은 영상', size: 32, weight: 800, align: 'center' });
        tl.at(stage.appendChild(same.el), 9, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 13); a.on(t > .3 && t < 4.5); b.on(t > 4.8); } };
      }
    },
    {
      title: '처음 그림, 끝 그림', dur: 16,
      captions: [
        { t: 0, text: '1초짜리 움직임은 그림 30장이에요.' },
        { t: 4.5, text: '사람이 정하는 건 처음과 끝, 두 장.' },
        { t: 8.5, text: '이게 <em>키프레임</em>이에요.' },
        { t: 11.5, text: '사이 28장은 컴퓨터가 재서 채워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const strip = P.box({ x: 60, y: 110, w: 600, h: 170, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(strip.el), .2, { from: 'up' });
        const stripT = P.text({ x: 60, y: 126, w: 600, text: '1초 = 그림 30장', size: 26, weight: 800, align: 'center' });
        tl.at(stage.appendChild(stripT.el), .4, { from: 'up' });
        const cells = Array.from({ length: 30 }, (_, i) => {
          const r = P.s('rect', { x: 76 + i * 19.2, y: 196, width: 15, height: 60, rx: 3, fill: i === 0 || i === 29 ? '#127E90' : '#9AA5AF' });
          r.style.opacity = 0; lines.append(r); return r;
        });
        const k0 = P.box({ x: 60, y: 320, w: 285, h: 220, label: '처음 그림', sub: '0초<br>왼쪽 밖', accent: 'aqua' });
        const k1 = P.box({ x: 375, y: 320, w: 285, h: 220, label: '끝 그림', sub: '1초<br>가운데', accent: 'aqua' });
        tl.at(stage.appendChild(k0.el), 4.8, { from: 'left' });
        tl.at(stage.appendChild(k1.el), 5.4, { from: 'right' });
        const kf = P.chip({ x: 60, y: 575, text: '이 두 장이 키프레임', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(kf.el), 8.8, { from: 'pop' });
        const fill = P.text({ x: 60, y: 660, w: 600, text: '사이 28장은 컴퓨터가 채워요', size: 30, weight: 800, align: 'center' });
        tl.at(stage.appendChild(fill.el), 11.8, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 15);
            cells.forEach((r, i) => { r.style.opacity = P.clamp((t - (.8 + i * .06)) / .25, 0, 1); if (t > 11.8 && i > 0 && i < 29) r.setAttribute('fill', '#F2812D'); });
          }
        };
      }
    },
    {
      title: '속도표', dur: 18,
      captions: [
        { t: 0, text: '같은 거리, 같은 1초인데 느낌이 달라요.' },
        { t: 4.5, text: '위는 똑같은 속도, 아래는 천천히 멈춰요.' },
        { t: 9, text: '속도를 어떻게 나눌지 적은 표, <em>이징</em>이에요.' },
        { t: 13.5, text: '공 굴리듯 천천히 멈추는 쪽이 자연스러워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const laneA = P.box({ x: 60, y: 110, w: 600, h: 140, label: '', sub: '', accent: '' });
        const laneB = P.box({ x: 60, y: 280, w: 600, h: 140, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(laneA.el), .2, { from: 'up' });
        tl.at(stage.appendChild(laneB.el), .4, { from: 'up' });
        const wA = P.text({ x: 80, y: 155, w: 300, text: '체육대회', size: 40, weight: 800, align: 'center', color: '#9AA5AF' });
        const wB = P.text({ x: 80, y: 325, w: 300, text: '체육대회', size: 40, weight: 800, align: 'center', color: '#127E90' });
        stage.append(wA.el, wB.el);
        const tagA = P.chip({ x: 60, y: 440, text: '똑같은 속도 · linear', color: 'gray', size: 24 });
        const tagB = P.chip({ x: 60, y: 496, text: '천천히 멈춤 · ease-out', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(tagA.el), 4.8, { from: 'pop' });
        tl.at(stage.appendChild(tagB.el), 5.4, { from: 'pop' });
        const def = P.box({ x: 60, y: 570, w: 600, h: 170, label: '속도표 = 이징', sub: '거리와 시간은 그대로<br>속도 나누기만 달라요', accent: 'aqua' });
        tl.at(stage.appendChild(def.el), 9.3, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 17);
            const p = P.clamp(((t % 3) / 3) * 3, 0, 1), eo = 1 - Math.pow(1 - p, 3);
            wA.el.style.transform = `translateX(${(280 * p).toFixed(1)}px)`;
            wB.el.style.transform = `translateX(${(280 * eo).toFixed(1)}px)`;
          }
        };
      }
    },
    {
      title: '글이 영상이 되기까지', dur: 16,
      captions: [
        { t: 0, text: '네 줄을 적으면 브라우저가 그림을 그려요.' },
        { t: 5, text: '1초에 30번 찍고, FFmpeg가 한 줄로 묶어요.' },
        { t: 10.5, text: '클로드는 이 둘에게 글로 부탁만 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const s1 = P.box({ x: 60, y: 110, w: 600, h: 150, label: '1 · 글 네 줄', sub: '처음, 끝, 시간, 속도표', accent: 'aqua', icon: P.ICON.doc });
        const s2 = P.box({ x: 60, y: 320, w: 600, h: 150, label: '2 · 브라우저가 그려요', sub: '글대로 그리고 1초에 30번 찍어요', accent: 'aqua', icon: P.ICON.eye });
        const s3 = P.box({ x: 60, y: 530, w: 600, h: 150, label: '3 · FFmpeg가 묶어요', sub: '그림 30장을 이어 mp4로', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(s1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(s2.el), 2.2, { from: 'up' });
        tl.at(stage.appendChild(s3.el), 5.3, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 360, y1: 262, x2: 360, y2: 318, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 360, y1: 472, x2: 360, y2: 528, width: 4, color: '#F2812D' });
        const role = P.text({ x: 60, y: 715, w: 600, text: '손은 조수 둘, 글은 클로드', size: 30, weight: 800, align: 'center' });
        tl.at(stage.appendChild(role.el), 10.8, { from: 'up' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 15); a1.draw(P.clamp((t - 2) / .6, 0, 1)); a2.draw(P.clamp((t - 5) / .6, 0, 1)); } };
      }
    },
    {
      title: '시킬 때는', dur: 14,
      captions: [
        { t: 0, text: '처음 어디, 끝 어디, 몇 초, 어떤 속도표.' },
        { t: 4.5, text: '이 네 가지만 적어 주면 돼요.' },
        { t: 8.5, text: '확인은 0.5초 자리 그림 한 장이면 충분해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const items = [['처음', '왼쪽 밖'], ['끝', '가운데'], ['시간', '1초'], ['속도표', '천천히 멈춤']].map(([k, v], i) => {
          const b = P.box({ x: 60, y: 110 + i * 125, w: 600, h: 105, label: k, sub: v, accent: i === 3 ? 'orange' : 'aqua' });
          tl.at(stage.appendChild(b.el), .3 + i * .4, { from: 'up' }); return b;
        });
        const check = P.chip({ x: 60, y: 640, text: '확인은 0.5초 그림 한 장', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(check.el), 8.8, { from: 'pop' });
        const q = P.quokka({ x: 410, y: 820, size: 300, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 13); items.forEach((b, i) => b.on(t > .3 + i * .4)); } };
      }
    }
  ],

  interaction: {
    title: '처음 그림, 끝 그림',
    desc: '글자가 어디서 출발해 어디서 멈출지, 몇 초 동안 갈지 고르고 속도표 버튼을 눌러 보세요. 표에는 0초·0.25초·0.5초·0.75초·1초에 글자가 어디 있는지 숫자로 나와요. 거리와 시간이 같아도 속도표에 따라 중간 숫자가 달라져요.',
    mount(el, P) {
      const POS = { '왼쪽 밖': -100, '왼쪽': -50, '가운데': 0, '오른쪽': 50 };
      const EASE = {
        linear: p => p,
        'ease-out': p => 1 - Math.pow(1 - p, 3),
        'ease-in': p => p * p * p,
        'ease-in-out': p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
      };
      const KO = { linear: '똑같은 속도', 'ease-out': '천천히 멈춤', 'ease-in': '천천히 출발', 'ease-in-out': '양쪽 다 천천히' };
      let start = '왼쪽 밖', end = '가운데', dur = 1, ease = null, run = 0;

      const sel = (id, opts, cur, on) => {
        const s = P.h('select', { id, class: 'sim-mc-sel' }, opts.map(o => P.h('option', { value: o, selected: o === cur ? '' : null }, o)));
        s.addEventListener('change', () => on(s.value)); return s;
      };
      const sStart = sel('sim-mc-start', Object.keys(POS), start, v => { start = v; draw(); });
      const sEnd = sel('sim-mc-end', Object.keys(POS), end, v => { end = v; draw(); });
      const sDur = sel('sim-mc-dur', ['0.5초', '1초', '2초'], '1초', v => { dur = parseFloat(v); draw(); });
      const bLinear = P.h('button', { class: 'btn primary', type: 'button' }, '똑같은 속도로 보기');
      const bOut = P.h('button', { class: 'btn', type: 'button' }, '천천히 멈추기');
      const bIn = P.h('button', { class: 'btn', type: 'button' }, '천천히 출발하기');
      const bBoth = P.h('button', { class: 'btn', type: 'button' }, '양쪽 다 천천히');
      const lane = P.h('div', { class: 'sim-mc-lane' });
      const word = P.h('div', { class: 'sim-mc-word' }, '2026 가을 체육대회');
      lane.append(word);
      const tbl = P.h('table', { class: 'sim-mc-tbl' });
      const note = P.h('p', { class: 'sim-mc-note' }, '속도표를 누르면 글자가 움직이고, 표의 중간 숫자가 바뀌어요.');
      const code = P.h('pre', { class: 'sim-mc-code' });

      el.append(
        P.h('style', {}, `
          .sim-mc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
          .sim-mc-row label{font-size:13px;font-weight:700;color:#4E5968}
          .sim-mc-sel{height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:600;max-width:100%}
          .sim-mc-lane{position:relative;height:84px;border-radius:14px;background:#F2F4F6;overflow:hidden;margin:10px 0}
          .sim-mc-word{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-weight:800;font-size:clamp(16px,4vw,24px);color:#127E90;white-space:nowrap;will-change:transform}
          .sim-mc-tbl{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
          .sim-mc-tbl th,.sim-mc-tbl td{border-bottom:1px solid #E5E8EB;padding:6px 4px;text-align:center}
          .sim-mc-tbl th{color:#8B95A1;font-weight:700}
          .sim-mc-tbl td.sim-mc-mid{color:#F2812D;font-weight:800}
          .sim-mc-code{margin-top:10px;background:#1B1F24;color:#fff;border-radius:12px;padding:12px;font-size:12.5px;line-height:1.6;white-space:pre-wrap;word-break:break-all}
          .sim-mc-note{font-size:13px;color:#4E5968;margin-top:8px}
        `),
        P.h('div', { class: 'sim-mc-row' }, P.h('label', { for: 'sim-mc-start' }, '처음'), sStart, P.h('label', { for: 'sim-mc-end' }, '끝'), sEnd, P.h('label', { for: 'sim-mc-dur' }, '시간'), sDur),
        P.h('div', { class: 'sim-mc-row' }, bLinear, bOut, bIn, bBoth),
        lane, tbl, code, note
      );

      function place(p) {
        const a = POS[start], b = POS[end];
        word.style.transform = `translate(calc(-50% + ${a + (b - a) * p}%), -50%)`;
      }
      function draw() {
        const fn = ease ? EASE[ease] : null;
        const a = POS[start], b = POS[end];
        const rows = [0, .25, .5, .75, 1].map(p => { const v = fn ? fn(p) : p; return { t: (p * dur).toFixed(2).replace(/\.?0+$/, ''), prog: v, pos: a + (b - a) * v }; });
        tbl.innerHTML = '';
        tbl.append(P.h('tr', {}, P.h('th', {}, '시간(초)'), ...rows.map(r => P.h('th', {}, r.t))));
        tbl.append(P.h('tr', {}, P.h('td', {}, '진행도'), ...rows.map((r, i) => P.h('td', { class: i === 2 ? 'sim-mc-mid' : '' }, r.prog.toFixed(2)))));
        tbl.append(P.h('tr', {}, P.h('td', {}, '위치'), ...rows.map((r, i) => P.h('td', { class: i === 2 ? 'sim-mc-mid' : '' }, (r.pos > 0 ? '+' : '') + Math.round(r.pos)))));
        code.textContent = ease
          ? `처음 { 위치 ${a} }\n끝 { 위치 ${b} }\n시간 ${dur}초\n속도표 ${ease} (${KO[ease]})`
          : `처음 { 위치 ${a} }\n끝 { 위치 ${b} }\n시간 ${dur}초\n속도표 (아직 안 골랐어요)`;
        place(ease ? 1 : 0);
      }
      function play(kind) {
        ease = kind; run += 1; const my = run; draw();
        const fn = EASE[kind]; const t0 = performance.now();
        const step = now => { if (my !== run) return; const p = Math.min(1, (now - t0) / (dur * 1000)); place(fn(p)); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
        [bLinear, bOut, bIn, bBoth].forEach(b => b.setAttribute('aria-pressed', 'false'));
        ({ linear: bLinear, 'ease-out': bOut, 'ease-in': bIn, 'ease-in-out': bBoth })[kind].setAttribute('aria-pressed', 'true');
        note.textContent = `${KO[kind]}: 0.5초 자리의 위치가 ${Math.round(POS[start] + (POS[end] - POS[start]) * fn(.5))}예요. 거리와 시간은 그대로예요.`;
      }
      bLinear.addEventListener('click', () => play('linear'));
      bOut.addEventListener('click', () => play('ease-out'));
      bIn.addEventListener('click', () => play('ease-in'));
      bBoth.addEventListener('click', () => play('ease-in-out'));
      draw();
    }
  },

  teacherLines: [
    '움직임은 <b>처음 그림과 끝 그림</b>만 정하면 돼요. 사이는 컴퓨터가 채워요.',
    '같은 거리, 같은 시간이어도 <b>속도표</b>가 다르면 느낌이 달라요. 천천히 멈추는 쪽이 자연스러워요.'
  ],
  tip: {
    body: '클로드에게 모션그래픽을 시킬 때는 네 가지를 한 줄에 적어 주세요. 처음 위치, 끝 위치, 시간, 속도표. 예: "제목이 왼쪽 밖에서 가운데로, 1초 동안, 천천히 멈추게." 되묻는 일이 줄고 한 번에 비슷하게 나와요.',
    extra: '결과 확인은 영상을 다 보는 대신 0.5초 자리 그림 한 장을 뽑아 달라고 하세요. 글자가 중간보다 오른쪽에 있으면 천천히 멈추는 속도표가 들어간 거예요.'
  },
  myth: {
    myth: '클로드는 손이 없으니 움직이는 그래픽은 못 만든다.',
    fact: '움직임을 글로 적는 방식이 있어서 만들 수 있어요. 처음 그림, 끝 그림, 시간, 속도표를 적으면 브라우저가 그림을 그리고 FFmpeg가 영상으로 묶어요. 결과를 눈으로 보는 건 사람 몫이에요.'
  },
  sources: [
    { title: 'W3C, CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/', note: '이징(속도표)의 표준 정의. linear·ease-in·ease-out·ease-in-out 이름이 여기서 정해져요.' },
    { title: 'MDN, Web Animations API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API', note: '키프레임과 타이밍을 글(코드)로 적어 브라우저가 움직임을 만드는 방식.' },
    { title: 'Remotion 공식 문서, The fundamentals', url: 'https://www.remotion.dev/docs/the-fundamentals', note: '코드로 적은 화면을 프레임마다 그려 영상으로 만드는 도구의 기본 개념.' },
    { title: 'FFmpeg 공식 문서', url: 'https://ffmpeg.org/ffmpeg.html', note: '그림 묶음을 영상 파일로 만들고 자르는 명령줄 도구의 설명서.' }
  ],
  script: `제목 글자가 왼쪽에서 미끄러져 들어오게 해 달라고 해 볼게요. 클로드는 손이 없는데 결과물은 나와요. 손 대신 글로 움직임을 적기 때문이에요.

1초짜리 움직임은 그림 30장이에요. 그중 사람이 정하는 건 처음 그림과 끝 그림, 두 장뿐이에요. 이걸 키프레임이라고 불러요. 사이 28장은 컴퓨터가 처음과 끝 사이를 재서 채워요.

그런데 똑같은 속도로 오면 어색해요. 공 굴리듯 천천히 멈추는 쪽이 자연스럽죠. 속도를 어떻게 나눌지 적은 표가 이징, 우리말로 속도표예요. 한 단어로 느낌이 바뀌어요.

이 네 줄을 적으면 브라우저가 그림을 그리고, FFmpeg가 그림을 묶어 영상으로 만들어요. 교실에서 시킬 때는 처음 위치, 끝 위치, 시간, 속도표 네 가지를 적어 주고, 0.5초 그림 한 장으로 확인하면 돼요.`
};
