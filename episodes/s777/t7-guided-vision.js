/* S777-58 카메라를 비추면 말로 길잡이를 해 주는 AI: 실시간 영상 안내·구도 안내·접근성 */
export default {
  slug: 't7-guided-vision',
  track: 'S777',
  title: '카메라를 비추면 말로 길잡이를 해 주는 AI',
  subtitle: '실시간 영상 안내·구도 안내·접근성',
  summary: '10월 1일 Google이 Gemini Live에 시각장애인·저시력인을 위한 Guided Vision을 내놨어요. 카메라 화면을 실시간으로 보며 말로 설명하고 카메라를 어디로 옮길지도 안내해요. 실시간 영상이 AI에게 어떻게 전달되는지, 왜 구도 안내가 먼저인지, 무엇을 맡기면 안 되는지 짚어요.',
  keywords: ['Guided Vision', 'Gemini Live', '멀티모달', '실시간 영상', '프레임 샘플링', '끼어들기', 'barge-in', '구도 안내', '접근성', '시각장애', '저시력', 'TalkBack', 'VizWiz', 'Aira'],

  scenes: [
    {
      title: '10월 1일, 보고 말해 주는 AI', dur: 13,
      captions: [
        { t: 0, text: '10월 1일 Google이 Gemini Live에 시각장애인·저시력인을 위한 <em>Guided Vision</em>을 내놨어요.' },
        { t: 5, text: '카메라를 비추면 보이는 걸 말로 설명하고 카메라를 <em>어디로 옮길지</em>도 안내해요.' },
        { t: 9.5, text: 'AI는 카메라 화면을 어떻게 보고 있을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const date = P.chip({ x: 330, y: 96, text: '10/1 Google · Gemini Live Guided Vision', color: 'ink', size: 22 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const phone = P.s('g', {},
          P.s('rect', { x: 340, y: 160, width: 220, height: 380, rx: 28, fill: 'none', stroke: '#1B1F24', 'stroke-width': 4 }),
          P.s('rect', { x: 358, y: 196, width: 184, height: 300, rx: 10, fill: 'none', stroke: '#9AA5AF', 'stroke-width': 2 }),
          P.s('rect', { x: 490, y: 250, width: 110, height: 84, rx: 8, fill: 'none', stroke: '#F2812D', 'stroke-width': 3, 'stroke-dasharray': '8 6' }),
          P.s('path', { d: 'M504 278 H584 M504 302 H568', stroke: '#F2812D', 'stroke-width': 3, 'stroke-linecap': 'round' }));
        phone.style.opacity = 0;
        lines.append(phone);
        const lab = P.chip({ x: 372, y: 440, text: '라벨이 반쯤 걸림', color: 'gray', size: 16 });
        tl.at(stage.appendChild(lab.el), 1.8, { from: 'pop' });
        const say = P.bubble({ x: 640, y: 170, w: 540, text: '조금 <b>오른쪽으로</b> 옮겨 보세요', tail: 'left', size: 26 });
        tl.at(stage.appendChild(say.el), 5.4, { from: 'left' });
        const c1 = P.chip({ x: 640, y: 300, text: 'Android 9 이상', color: 'aqua', size: 20 });
        const c2 = P.chip({ x: 640, y: 350, text: 'TalkBack 세 손가락 탭으로 실행', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(c1.el), 7, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 7.6, { from: 'pop' });
        const final = P.text({ x: 640, y: 420, w: 580, text: '보이는 걸 설명하고 카메라를 <em>어디로 옮길지</em>도 말해요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            phone.style.opacity = P.clamp((t - 1) / .5, 0, 1);
          }
        };
      }
    },
    {
      title: '영상은 사진 묶음으로 흘러가요', dur: 14,
      captions: [
        { t: 0, text: '실시간 대화형 AI는 영상을 파일로 통째로 받지 않아요. 장면을 일정 간격으로 떼어 낸 사진, 곧 <em>프레임</em>과 소리를 계속 흘려 보내요.' },
        { t: 5.5, text: 'Gemini 개발자용 문서 기준으로 사진은 1초에 한 장 이하, 소리는 끊김 없이 들어가요.' },
        { t: 10, text: '말로 끼어들면 대답을 멈추고 새 말을 들어요. 이걸 <em>끼어들기</em>라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const cam = P.box({ x: 330, y: 100, w: 180, h: 140, label: '카메라', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(cam.el), .3, { from: 'up' });
        const frames = [0, 1, 2, 3].map(i => {
          const b = P.box({ x: 540 + i * 105, y: 120, w: 90, h: 100, label: '사진', sub: `${i}초` });
          tl.at(stage.appendChild(b.el), 1.2 + i, { from: 'left' });
          return b;
        });
        const toAi = P.arrow(lines, { x1: 950, y1: 170, x2: 1003, y2: 170, width: 4, color: '#1B1F24' });
        const ai = P.box({ x: 1010, y: 100, w: 200, h: 140, label: 'AI', sub: '실시간 응답', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(ai.el), .6, { from: 'up' });
        const mic = P.box({ x: 330, y: 270, w: 180, h: 90, label: '마이크', accent: 'ink' });
        tl.at(stage.appendChild(mic.el), .9, { from: 'up' });
        let d = 'M530 315';
        for (let x = 534; x <= 990; x += 4) d += ` L${x} ${(315 + Math.sin((x - 530) / 9) * 14 * (0.55 + 0.45 * Math.sin((x - 530) / 47))).toFixed(1)}`;
        const wave = P.s('path', { d, fill: 'none', stroke: '#127E90', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
        lines.append(wave);
        const waveLen = wave.getTotalLength();
        wave.setAttribute('stroke-dasharray', waveLen);
        const toAi2 = P.arrow(lines, { x1: 995, y1: 315, x2: 1100, y2: 248, curve: -20, width: 3, color: '#127E90' });
        const rule = P.chip({ x: 330, y: 392, text: '개발자용 Live API 문서: 사진 초당 1장 이하 + 소리 계속', color: 'gray', size: 20 });
        tl.at(stage.appendChild(rule.el), 5.8, { from: 'pop' });
        const barge = P.box({ x: 330, y: 456, w: 620, h: 110, label: '끼어들기(barge-in)', sub: '말을 걸면 대답을 멈추고 새 말을 들어요', accent: 'orange' });
        tl.at(stage.appendChild(barge.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            frames.forEach((b, i) => b.on(t > 1.2 + i && t < 2.2 + i));
            toAi.draw(P.clamp((t - 1.8) / .5, 0, 1));
            wave.setAttribute('stroke-dashoffset', waveLen * (1 - P.clamp((t - 1.2) / 4, 0, 1)));
            wave.style.opacity = t > 1.2 ? 1 : 0;
            toAi2.draw(P.clamp((t - 5.2) / .5, 0, 1));
            ai.on(t > 5.5 && t < 10);
            barge.on(t > 10.2);
          }
        };
      }
    },
    {
      title: '잘 보이게 돕는 게 먼저예요', dur: 13,
      captions: [
        { t: 0, text: '시각장애인이 찍은 사진은 초점이 흐리거나 대상이 화면 밖에 걸리기 쉬워요.' },
        { t: 4.5, text: '2018년 연구도 시각장애인의 질문 3만 1천여 건을 모았는데, 사진 품질이 낮고 <em>답할 수 없는 질문</em>이 섞여 있었어요.' },
        { t: 9.5, text: '그래서 설명보다 <em>카메라를 고쳐 잡게 돕는 말</em>이 먼저예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const shots = [
          ['흐린 사진', '초점이 안 맞아요', 'orange', P.ICON.x],
          ['반쯤 잘린 사진', '대상이 화면 밖에', 'orange', P.ICON.x],
          ['바로 잡힌 사진', '읽을 수 있어요', 'aqua', P.ICON.check]
        ].map(([label, sub, accent, icon], i) => {
          const b = P.box({ x: 330 + i * 290, y: 100, w: 260, h: 150, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1.2, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 593 + i * 290, y1: 175, x2: 617 + i * 290, y2: 175, width: 4, color: '#1B1F24' }));
        const g1 = P.chip({ x: 512, y: 272, text: '"잠깐 멈춰 주세요"', color: 'aqua', size: 18 });
        const g2 = P.chip({ x: 806, y: 272, text: '"왼쪽으로 조금"', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(g1.el), 1.4, { from: 'pop' });
        tl.at(stage.appendChild(g2.el), 2.6, { from: 'pop' });
        const viz = P.chip({ x: 330, y: 340, text: '2018년 연구: 시각장애인 질문 3만 1천여 건', color: 'gray', size: 20 });
        tl.at(stage.appendChild(viz.el), 4.8, { from: 'pop' });
        const res = P.text({ x: 330, y: 398, w: 880, text: '사진 품질이 낮고, 답할 수 없는 질문도 섞여 있었어요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(res.el), 6.4, { from: 'up' });
        const final = P.text({ x: 330, y: 470, w: 880, text: '설명보다 <em>카메라를 고쳐 잡게 돕는 말</em>이 먼저예요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            shots.forEach((b, i) => b.on(t > .3 + i * 1.2 && t < 1.5 + i * 1.2 || (i === 2 && t > 2.7)));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * 1.2)) / .4, 0, 1)));
          }
        };
      }
    },
    {
      title: '함께 만들고, 한계를 적어요', dur: 13,
      captions: [
        { t: 0, text: 'Google은 시각장애인 통역 서비스 Aira의 테스터 1,000명 이상과 함께 이 기능을 다듬었어요.' },
        { t: 6, text: '또 이 기능은 의료기기도 <em>이동 보조기구</em>도 아니고, 길 안내나 장애물 감지용이 아니라고 분명히 적었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const left = P.box({ x: 330, y: 110, w: 420, h: 200, label: '함께 다듬은 사람들', sub: 'Aira 신뢰 테스터 1,000명 이상<br>수만 시간의 시각 해석 경험', accent: 'aqua', icon: P.ICON.hand });
        tl.at(stage.appendChild(left.el), .3, { from: 'up' });
        const right = P.box({ x: 790, y: 110, w: 420, h: 200, label: '맡기면 안 되는 일', sub: '길 안내 · 장애물 감지<br>흰 지팡이 대신 쓰기', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(right.el), 6.2, { from: 'right' });
        const use = P.text({ x: 330, y: 350, w: 880, text: '쓰임: 작은 글씨 읽기 · 물건 찾기 · 세부 묘사 · 주변 탐색', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(use.el), 2.6, { from: 'up' });
        const final = P.text({ x: 330, y: 420, w: 880, text: '의료기기도, <em>이동 보조기구</em>도 아니라고 직접 적었어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            left.on(t > .3 && t < 6);
            right.on(t > 6.2);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 13,
      captions: [
        { t: 0, text: '저시력 학생에게는 학습지 작은 글씨 읽기, 실험 도구 찾기처럼 <em>다시 확인할 수 있는 일</em>부터 권해요.' },
        { t: 6.5, text: '카메라를 공유하면 친구 얼굴도 담기니, 쓰기 전에 <em>공유 범위</em>를 함께 정해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['① 확인할 수 있는 일부터', '학습지 글씨 읽기 · 실험 도구 찾기', 'aqua'],
          ['② 이동 안전은 맡기지 않기', '길 건너기는 사람과 지팡이로', 'orange'],
          ['③ 공유 전에 알리기', '친구 얼굴도 화면에 담겨요', '']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 400, y: 100 + i * 120, w: 800, h: 100, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * 1.8, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 480, w: 800, text: '보는 일은 돕고, <em>안전은 사람이</em> 지켜요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 12);
            items.forEach((b, i) => b.on(t > .3 + i * 1.8));
          }
        };
      }
    }
  ],

  interaction: {
    title: '카메라 안내 받기',
    desc: '3×3 칸 가운데 카메라가 비추는 칸(굵은 테두리)이 있고, 약병 라벨은 오른쪽 위 칸에 있어요. <b>안내 받기</b>를 누르면 카메라와 라벨의 칸 차이로 안내 문장이 만들어져요. 화살표 버튼으로 카메라를 옮겨 가며 라벨을 가운데로 잡아 보세요. <b>흐린 사진 섞기</b>를 켜면 안내 전에 멈춤 요청이 먼저 나와요.',
    mount(el, P) {
      const TARGET = { c: 2, r: 0 };
      const START = { c: 1, r: 1 };
      let cam = { ...START };
      let blurPending = false;
      let said = [];

      const askBtn = P.h('button', { class: 'btn primary', type: 'button' }, '안내 받기');
      const moves = [['← 왼쪽', -1, 0], ['→ 오른쪽', 1, 0], ['↑ 위', 0, -1], ['↓ 아래', 0, 1]].map(([label, dc, dr]) => {
        const b = P.h('button', { class: 'btn', type: 'button' }, label);
        b.addEventListener('click', () => { cam = { c: Math.max(0, Math.min(2, cam.c + dc)), r: Math.max(0, Math.min(2, cam.r + dr)) }; render(); });
        return b;
      });
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 처음');
      const blurCb = P.h('input', { type: 'checkbox', id: 'sim-gv-blur' });
      const blurLab = P.h('label', { for: 'sim-gv-blur', class: 'sim-gv-check' }, blurCb, ' 흐린 사진 섞기');
      const grid = P.h('div', { class: 'sim-gv-grid', role: 'img', 'aria-label': '3×3 카메라 화면' });
      const status = P.h('div', { class: 'sim-gv-status', 'aria-live': 'polite' });
      const log = P.h('div', { class: 'sim-gv-log' });

      el.append(P.h('div', { class: 'sim-gv' },
        P.h('div', { class: 'sim-gv-bar' }, askBtn, ...moves, resetBtn, blurLab),
        P.h('div', { class: 'sim-gv-main' }, grid, P.h('div', { class: 'sim-gv-side' }, status, log)),
        P.h('div', { class: 'sim-gv-note' }, '원리를 보여 주는 예시예요. 실제 기능은 길 안내·장애물 감지용이 아니에요.')
      ));
      el.append(P.h('style', { html: `
        .sim-gv{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-gv-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
        .sim-gv-check{font-size:14px;display:flex;align-items:center;gap:6px;cursor:pointer}
        .sim-gv-main{display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:16px;align-items:start;max-width:100%}
        @media (max-width:560px){.sim-gv-main{grid-template-columns:1fr}}
        .sim-gv-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:6px;width:100%;max-width:260px;aspect-ratio:1/1}
        .sim-gv-cell{position:relative;border:1px solid var(--line);border-radius:10px;background:var(--paper);display:flex;align-items:center;justify-content:center;min-width:0}
        .sim-gv-cell.cam{border:4px solid var(--ink-soft,#1B1F24);background:#fff}
        .sim-gv-label{font-size:12px;font-weight:700;color:#fff;background:var(--acc2,#F2812D);border-radius:8px;padding:6px 6px;text-align:center;line-height:1.3;word-break:keep-all}
        .sim-gv-cell.cam .sim-gv-label{background:var(--acc1,#127E90)}
        .sim-gv-camtag{position:absolute;left:6px;top:4px;font-size:11px;font-weight:700;color:var(--muted)}
        .sim-gv-side{display:flex;flex-direction:column;gap:10px;min-width:0}
        .sim-gv-status{font-size:15px;font-weight:700;line-height:1.5;word-break:keep-all}
        .sim-gv-log{display:flex;flex-direction:column;gap:8px}
        .sim-gv-msg{align-self:flex-start;max-width:100%;border:1px solid var(--line);border-radius:14px 14px 14px 4px;background:#fff;padding:8px 12px;font-size:14px;line-height:1.45;word-break:keep-all}
        .sim-gv-msg.warn{border-color:var(--acc2,#F2812D)}
        .sim-gv-msg.done{border-color:var(--acc1,#127E90);font-weight:700}
        .sim-gv-note{font-size:12px;color:var(--muted)}
      ` }));

      function dirWords(dc, dr) {
        const h = dc > 0 ? '오른쪽' : dc < 0 ? '왼쪽' : '';
        const v = dr < 0 ? '위' : dr > 0 ? '아래' : '';
        return [h, v].filter(Boolean).join(' ');
      }
      function render() {
        grid.innerHTML = '';
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
          const isCam = cam.c === c && cam.r === r;
          const kids = [];
          if (isCam) kids.push(P.h('span', { class: 'sim-gv-camtag' }, '카메라'));
          if (TARGET.c === c && TARGET.r === r) kids.push(P.h('span', { class: 'sim-gv-label' }, '약병 라벨'));
          grid.append(P.h('div', { class: 'sim-gv-cell' + (isCam ? ' cam' : '') }, ...kids));
        }
        const dc = TARGET.c - cam.c, dr = TARGET.r - cam.r;
        if (!dc && !dr) status.textContent = '라벨이 화면 가운데에 있어요.';
        else if (Math.abs(dc) <= 1 && Math.abs(dr) <= 1) status.textContent = `라벨이 화면 ${dirWords(dc, dr)}에 반쯤 걸려 있어요.`;
        else status.textContent = `라벨이 화면 ${dirWords(dc, dr)} 밖에 있어요.`;
        log.innerHTML = '';
        said.slice(-6).forEach(m => log.append(P.h('div', { class: 'sim-gv-msg ' + m.cls }, m.text)));
      }
      askBtn.addEventListener('click', () => {
        if (blurPending) { said.push({ text: '사진이 흐려요. 잠깐 멈춰 주세요.', cls: 'warn' }); blurPending = false; }
        const dc = TARGET.c - cam.c, dr = TARGET.r - cam.r;
        if (!dc && !dr) said.push({ text: "좋아요, 라벨이 가운데예요. 읽어 드릴게요: '하루 두 번, 식후'", cls: 'done' });
        else said.push({ text: `카메라를 ${dirWords(dc, dr)}로 조금 옮겨 보세요.`, cls: '' });
        render();
      });
      blurCb.addEventListener('change', () => { blurPending = blurCb.checked; });
      resetBtn.addEventListener('click', () => { cam = { ...START }; said = []; blurPending = blurCb.checked; render(); });
      render();
    }
  },

  teacherLines: [
    '이 AI는 카메라 화면을 <b>일정 간격의 사진으로</b> 받아 보면서 잘 보이도록 <b>카메라를 옮기라고</b> 말해 줘요.',
    '글씨 읽기, 물건 찾기는 도움을 받아도 돼요. 하지만 <b>길을 건너는 일은 AI에게 맡기지 않아요</b>.'
  ],
  tip: {
    body: '저시력 학생과 쓸 때는 <b>라벨·학습지 글씨 읽기, 실험 도구 찾기</b>처럼 틀려도 다시 확인할 수 있는 일부터 시작하세요. 이동과 안전은 기존 보조 수단을 그대로 써요.',
    extra: '반 친구들과는 "카메라 공유 전에 주변 사람에게 알리기"를 약속으로 정해요. 접근성 도구는 함께 있는 친구들까지 이해해야 편하게 쓸 수 있어요.'
  },
  myth: {
    myth: '카메라로 보고 말해 주는 AI면 시각장애인의 길 안내도 맡길 수 있다.',
    fact: 'Google은 Guided Vision이 의료기기·이동 보조기구가 아니고 길 안내·장애물 감지용이 아니라고 밝혔어요. 실시간 AI는 장면을 띄엄띄엄 사진으로 받아 보고 답해서 순간의 위험을 놓칠 수 있어요.'
  },
  sources: [
    { title: 'Google: Guided Vision in Gemini Live', url: 'https://blog.google/innovation-and-ai/products/gemini-app/guided-vision-gemini-live/', note: '2026-10-01, 실시간 설명과 구도 안내, Aira 테스터 1,000명 이상, Android 9 이상·TalkBack, 길 안내·장애물 감지용 아님.' },
    { title: 'Gemini API: Live API', url: 'https://ai.google.dev/gemini-api/docs/live', note: '오디오 연속 스트림 + 이미지 초당 1장 이하, 끼어들기(barge-in).' },
    { title: 'VizWiz Grand Challenge: Answering Visual Questions from Blind People (arXiv, 2018)', url: 'https://arxiv.org/abs/1802.08218', note: '시각장애인 시각 질문 3만 1천여 건, 낮은 사진 품질, 답할 수 없는 질문.' }
  ],
  script: `10월 1일 Google이 Gemini Live에 시각장애인·저시력인을 위한 Guided Vision을 내놨어요. 카메라를 비추면 보이는 걸 말로 설명하고 카메라를 어디로 옮길지도 안내해요.

실시간 AI는 영상을 통째로 받지 않고 장면을 일정 간격으로 떼어 낸 프레임과 소리를 계속 흘려 보내요. Gemini 개발자용 문서 기준으로 사진은 1초에 한 장 이하예요. 시각장애인이 찍은 사진은 흐리거나 대상이 잘리기 쉬워요. 2018년 연구도 사진 품질이 낮고 답할 수 없는 질문이 섞여 있다고 했어요. 그래서 설명보다 카메라를 고쳐 잡게 돕는 말이 먼저예요.

Google은 이 기능이 의료기기도 이동 보조기구도 아니고, 길 안내나 장애물 감지용이 아니라고 적었어요. 교실에서는 글씨 읽기, 물건 찾기처럼 다시 확인할 수 있는 일부터 쓰고, 카메라를 켜기 전에 공유 범위를 함께 정해요.`
};
