/* S3-22 한 모델이 보고 듣고 말하는 법: 멀티모달·옴니 모델과 시각 토큰 */
export default {
  slug: 'v3-multimodal',
  track: 'S3',
  title: '한 모델이 보고 듣고 말하는 법',
  subtitle: '멀티모달·옴니 모델과 시각 토큰',
  summary: '사진, 목소리, 영상까지 한 모델이 받아 바로 대답해요. 비결은 모든 입력을 작은 조각(토큰)으로 바꿔 글과 같은 줄에 세우는 것. 사진 한 장, 영상 30초가 토큰 몇 개인지 공식 문서 숫자로 따져 봐요.',
  keywords: ['멀티모달', '옴니 모델', 'omni', '시각 토큰', '패치', '오디오 토큰', '영상 토큰', 'end-to-end', '비전 트랜스포머', '컨텍스트'],

  scenes: [
    {
      title: '실험 영상을 보여 줬더니', dur: 13,
      captions: [
        { t: 0, text: '30초짜리 과학 실험 영상을 올리고 <em>"무슨 일이 일어났어?"</em>라고 물었어요.' },
        { t: 5, text: '소리와 장면을 같이 설명하고, 말을 걸면 <em>바로 끼어들어</em> 대답도 했어요.' },
        { t: 9.5, text: '사진도 소리도 영상도, 어떻게 한 모델이 한 번에 받아 바로 답할까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const up = P.box({ x: 330, y: 80, w: 300, h: 130, label: '실험 영상 업로드', sub: '소리 + 장면, 30초', accent: 'aqua', icon: P.ICON.video });
        tl.at(stage.appendChild(up.el), .3, { from: 'up' });
        const ask = P.bubble({ x: 660, y: 90, w: 480, text: '이 영상에서 무슨 일이 일어났어?', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), 1.4, { from: 'left' });
        const arrow = P.arrow(lines, { x1: 630, y1: 145, x2: 660, y2: 150, width: 4, color: '#1B1F24' });
        const reply = P.bubble({ x: 440, y: 280, w: 620, text: '폭발음이 나고 <b>거품이 넘쳤어요</b>. 색도 같이 변했네요.', tail: 'bottom', size: 24, tone: 'orange' });
        tl.at(stage.appendChild(reply.el), 5.2, { from: 'pop' });
        const chip = P.chip({ x: 440, y: 440, text: '말을 걸면 바로 끼어들어요', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chip.el), 7.6, { from: 'pop' });
        const note = P.text({ x: 330, y: 500, w: 880, text: '사진·소리·영상을, 한 모델이 <em>어떻게 한 번에</em> 받아 바로 답할까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
            arrow.draw(P.clamp((t - 1.2) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '사진도 토큰이 돼요', dur: 14,
      captions: [
        { t: 0, text: '사진을 <em>28×28 픽셀</em> 조각으로 잘라, 조각 하나를 시각 토큰 하나로 다뤄요.' },
        { t: 5, text: '1000×1000 사진이면 <em>1,296개</em>. 이 조각들이 글자 토큰과 같은 줄에 나란히 놓여요.' },
        { t: 10, text: '2020년 연구가 이미지를 <em>단어 같은 조각</em>으로 읽는 길을 열었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const boxes = [
          ['사진 1장', '1000×1000px'], ['28×28 조각으로 자르기', '픽셀 블록 하나'], ['조각 = 시각 토큰', '36×36 = 1,296개'], ['글 토큰과 같은 줄', '나란히 배치']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 225, y: 110, w: 200, h: 120, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 225, y1: 170, x2: 565 + i * 225, y2: 170, width: 4, color: '#1B1F24' }));
        const grid = P.h('div', {
          style: 'left:360px;top:280px;width:200px;height:200px;position:absolute;border:2px solid #127E90;' +
            'background-image:linear-gradient(#127E9055 1px,transparent 1px),linear-gradient(90deg,#127E9055 1px,transparent 1px);' +
            'background-size:16.6px 16.6px;'
        });
        tl.at(stage.appendChild(grid), 5.4, { from: 'pop' });
        const gridLab = P.text({ x: 360, y: 490, w: 200, text: '36×36 조각', size: 16, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(gridLab.el), 5.6, { from: 'up' });
        const gen = P.text({ x: 620, y: 300, w: 600, text: '1000×1000 사진 = <em>1,296개</em> 시각 토큰(공식 문서 계산).', size: 27, weight: 800 });
        tl.at(stage.appendChild(gen.el), 6.0, { from: 'up' });
        const small = P.text({ x: 620, y: 370, w: 600, text: '이 조각들이 글자 토큰과 <i>같은 줄</i>에 나란히 놓여요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 7.4, { from: 'up' });
        const chip = P.chip({ x: 620, y: 440, text: '2020년 연구: 이미지를 조각 토큰으로', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            boxes.forEach((b, i) => b.on(t > .3 + i * .9));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .9)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '소리와 영상도 토큰', dur: 13,
      captions: [
        { t: 0, text: '공식 문서 기준으로 오디오는 1초에 <em>32토큰</em>, 영상은 1초에 <em>263토큰</em>이에요.' },
        { t: 5, text: '30초 영상이면 263 × 30 = <em>약 7,900토큰</em>. 사진 한 장보다 훨씬 많아요.' },
        { t: 9.5, text: '길게 넣을수록 <em>컨텍스트 창</em>을 빨리 채워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const a = P.box({ x: 340, y: 100, w: 380, h: 130, label: '오디오', sub: '1초 = <b>32토큰</b>', accent: 'aqua', icon: P.ICON.eye });
        const b = P.box({ x: 780, y: 100, w: 380, h: 130, label: '영상', sub: '1초 = <b>263토큰</b>', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 1.2, { from: 'up' });
        const bars = [['오디오 30초', 960, '#127E90'], ['영상 30초', 7890, '#F2812D'], ['사진 1장', 1296, '#9AA5AF']].map(([label, v, color], i) => {
          const hpx = Math.max(10, v / 7890 * 220);
          const bar = P.h('div', { style: `left:${400 + i * 230}px;top:${480 - hpx}px;width:140px;height:${hpx}px;border-radius:10px 10px 4px 4px;background:${color}` });
          tl.at(stage.appendChild(bar), 5.4 + i * .3, { from: 'up' });
          const lab = P.text({ x: 400 + i * 230, y: 490, w: 140, text: `${label}<br>${v.toLocaleString()}토큰`, size: 15, weight: 700, align: 'center', cls: 'muted' });
          tl.at(stage.appendChild(lab.el), 5.6 + i * .3, { from: 'up' });
          return bar;
        });
        const final = P.text({ x: 340, y: 560, w: 880, text: '길게 넣을수록 <em>컨텍스트 창</em>을 빨리 채워요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            a.on(t > .3); b.on(t > 1.2);
          }
        };
      }
    },
    {
      title: '한 신경망이 끝까지', dur: 14,
      captions: [
        { t: 0, text: '여러 모델을 이어 붙이는 방식이라면, 말을 글로 바꾸는 순간 억양 같은 정보는 글자에 담기지 않아요.' },
        { t: 5, text: '옴니 모델은 글·그림·소리를 <em>같은 신경망 하나</em>가 처음부터 끝까지 학습해요.' },
        { t: 9.5, text: '2024년 공개 문서: 음성에 평균 0.32초 만에 응답. 2025년 연구: 생각하는 부분과 말하는 부분을 나누고 영상·소리의 시각을 맞춰요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'base' });
        stage.append(q.el);
        const chainBoxes = [['소리→글', ''], ['글 처리', ''], ['글→소리', '']].map(([label], i) => {
          const b = P.box({ x: 360 + i * 230, y: 100, w: 190, h: 90, label, sub: i === 0 ? '억양 정보가 빠져요' : '', accent: 'ink' });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const chainArrows = [0, 1].map(i => P.arrow(lines, { x1: 550 + i * 230, y1: 145, x2: 585 + i * 230, y2: 145, width: 3, color: '#9AA5AF' }));
        const chainLab = P.chip({ x: 360, y: 210, text: '여러 모델을 이어 붙이는 방식', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chainLab.el), 2.2, { from: 'pop' });
        const omni = P.box({ x: 360, y: 300, w: 560, h: 130, label: '옴니 모델: 신경망 하나', sub: '글 · 그림 · 소리를 <b>처음부터 끝까지</b> 같이 학습', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(omni.el), 5.4, { from: 'up' });
        const fact1 = P.chip({ x: 360, y: 450, text: '2024년 공개 문서: 음성 평균 응답 0.32초', color: 'aqua', size: 18 });
        const fact2 = P.chip({ x: 360, y: 500, text: '2025년 연구: 생각하는 부분·말하는 부분을 나눠 영상·소리 시각을 맞춰요', color: 'orange', size: 18 });
        tl.at(stage.appendChild(fact1.el), 9.8, { from: 'pop' });
        tl.at(stage.appendChild(fact2.el), 11.0, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, (t > 5 && t < 9.5));
            chainArrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .5)) / .4, 0, 1)));
          }
        };
      }
    },
    {
      title: '한계와 할 일', dur: 13,
      captions: [
        { t: 0, text: '큰 사진은 <em>줄인 뒤</em> 읽어서 작은 글자가 흐려지고, 개수·위치는 <em>근사치</em>예요.' },
        { t: 4.5, text: '영상은 <em>필요한 구간만</em> 잘라서, 사진은 <em>글자 부분을 크게</em> 찍어서 보여 줘요.' },
        { t: 9, text: '한 모델이 보고 듣고 말해도, 다루는 건 결국 <em>조각난 토큰</em>이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 큰 사진은 축소', '너무 작은 글자는 흐려져요'],
          ['② 개수·위치는 근사', '정확한 좌표가 아니에요'],
          ['③ 영상은 구간만 자르기', '필요한 10~30초만'],
          ['④ 글자는 크게 찍기', '확대해서 올려요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '한 모델이 보고 듣고 말해도, 다루는 건 <em>조각난 토큰</em>이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '멀티모달 토큰 계산기',
    desc: '입력 종류를 고르고 슬라이더를 움직이면 <b>시각·오디오·영상 토큰</b>이 공식 문서 숫자로 계산돼요. 사진은 28×28 픽셀 조각 하나가 토큰 하나(고해상도 한도를 넘으면 비율을 유지해 축소돼요), 음성·영상은 1초마다 정해진 토큰 수예요. 아래 막대로 20만·100만 토큰 컨텍스트 창에서 차지하는 비율도 봐요. "예시: 30초 실험 영상" 버튼을 누르면 1편의 실험 영상 예시로 바로 바뀌어요.',
    mount(el, P) {
      const CAP_SIDE = 2576, CAP_TOKENS = 4784;
      const sel = P.h('select', { id: 'sim-type' },
        P.h('option', { value: 'photo' }, '사진'),
        P.h('option', { value: 'audio' }, '음성'),
        P.h('option', { value: 'video' }, '영상')
      );
      const selLab = P.h('label', { for: 'sim-type' }, '입력 종류 ');
      const range = P.h('input', { type: 'range', id: 'sim-v', min: '200', max: '4000', step: '10', value: '1000' });
      const rangeLab = P.h('label', { for: 'sim-v', class: 'sim-rl' }, '긴 변(정사각형 가정) ', P.h('b', {}, '1000'), 'px');
      const exBtn = P.h('button', { class: 'btn primary', type: 'button' }, '예시: 30초 실험 영상');
      const bar = P.h('div', { class: 'sim-bar' }, selLab, sel, rangeLab, range, exBtn);

      const note = P.h('div', { class: 'sim-note' }, '공식 문서 예시 값(사진: 28px 조각 / 음성·영상: 초당 토큰)');
      const canvasWrap = P.h('div', { class: 'sim-canvas-wrap' });
      const canvas = P.h('canvas', { class: 'sim-canvas', width: '280', height: '280' });
      canvasWrap.append(canvas);
      const resultBig = P.h('div', { class: 'sim-result' }, '');
      const scaledNote = P.h('div', { class: 'sim-scaled' }, '');
      const barsWrap = P.h('div', { class: 'sim-barswrap' },
        P.h('div', { class: 'sim-barrow' }, P.h('div', { class: 'sim-barlab' }, '20만 토큰 창 중 차지 비율'), P.h('div', { class: 'sim-meter' }, P.h('i', { id: 'sim-m1' })), P.h('div', { class: 'sim-mval', id: 'sim-mv1' }, '')),
        P.h('div', { class: 'sim-barrow' }, P.h('div', { class: 'sim-barlab' }, '100만 토큰 창 중 차지 비율'), P.h('div', { class: 'sim-meter' }, P.h('i', { id: 'sim-m2' })), P.h('div', { class: 'sim-mval', id: 'sim-mv2' }, ''))
      );

      el.append(P.h('div', { class: 'sim-wrap' }, bar, note, P.h('div', { class: 'sim-body' }, canvasWrap, P.h('div', { class: 'sim-side' }, resultBig, scaledNote, barsWrap))));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-bar select{font-size:14px;padding:4px 6px}
        .sim-rl{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:4px}
        .sim-bar input[type=range]{width:160px;max-width:100%}
        .sim-note{font-size:12px;color:var(--muted)}
        .sim-body{display:flex;flex-wrap:wrap;gap:16px;max-width:100%}
        .sim-canvas-wrap{width:160px;max-width:100%;flex:0 0 auto}
        .sim-canvas{width:100%;height:auto;aspect-ratio:1/1;border:1px solid var(--line);border-radius:10px;background:#fff;display:block}
        .sim-side{flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:8px}
        .sim-result{font-size:22px;font-weight:800}
        .sim-scaled{font-size:13px;color:var(--acc2);min-height:1.2em}
        .sim-barswrap{display:flex;flex-direction:column;gap:8px;margin-top:4px}
        .sim-barlab{font-size:12px;color:var(--muted)}
        .sim-meter{height:8px;border-radius:999px;background:var(--paper);overflow:hidden;margin-top:2px}
        .sim-meter i{display:block;height:100%;width:0;background:var(--acc1);transition:width .3s}
        .sim-mval{font-family:var(--mono);font-size:12px;color:var(--muted)}
      ` }));

      function photoTokens(v) {
        let side = Math.min(v, CAP_SIDE);
        let cols = Math.ceil(side / 28);
        if (cols * cols > CAP_TOKENS) {
          cols = Math.floor(Math.sqrt(CAP_TOKENS));
          side = cols * 28;
        }
        return { side, cols, tokens: cols * cols, scaled: side !== v };
      }

      function drawGrid(cols) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#eef3f6';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#127E90';
        ctx.lineWidth = 1;
        const cell = W / cols;
        for (let i = 0; i <= cols; i++) {
          const p = Math.round(i * cell) + .5;
          ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, H); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(W, p); ctx.stroke();
        }
      }

      function render() {
        const type = sel.value;
        if (type === 'photo') {
          const v = +range.value;
          range.min = '200'; range.max = '4000'; range.step = '10';
          rangeLab.innerHTML = ''; rangeLab.append('긴 변(정사각형 가정) ', P.h('b', {}, String(v)), 'px');
          const r = photoTokens(v);
          canvasWrap.style.display = '';
          drawGrid(r.cols);
          resultBig.textContent = `시각 토큰 ${r.tokens.toLocaleString()}개`;
          scaledNote.textContent = r.scaled ? `고해상도 한도를 넘어 ${r.side}px로 축소해 계산해요.` : '';
          updateBars(r.tokens);
        } else if (type === 'audio') {
          const v = +range.value;
          if (range.max !== '600') { range.min = '1'; range.max = '600'; range.step = '1'; }
          rangeLab.innerHTML = ''; rangeLab.append('길이 ', P.h('b', {}, String(v)), '초');
          canvasWrap.style.display = 'none';
          const tokens = v * 32;
          resultBig.textContent = `오디오 토큰 ${tokens.toLocaleString()}개`;
          scaledNote.textContent = '';
          updateBars(tokens);
        } else {
          const v = +range.value;
          if (range.max !== '600') { range.min = '1'; range.max = '600'; range.step = '1'; }
          rangeLab.innerHTML = ''; rangeLab.append('길이 ', P.h('b', {}, String(v)), '초');
          canvasWrap.style.display = 'none';
          const tokens = v * 263;
          resultBig.textContent = `영상 토큰 ${tokens.toLocaleString()}개`;
          scaledNote.textContent = '';
          updateBars(tokens);
        }
      }

      function updateBars(tokens) {
        const p1 = Math.min(100, tokens / 200000 * 100);
        const p2 = Math.min(100, tokens / 1000000 * 100);
        el.querySelector('#sim-m1').style.width = p1 + '%';
        el.querySelector('#sim-m2').style.width = p2 + '%';
        el.querySelector('#sim-mv1').textContent = `${tokens.toLocaleString()} / 200,000 (${p1.toFixed(1)}%)`;
        el.querySelector('#sim-mv2').textContent = `${tokens.toLocaleString()} / 1,000,000 (${p2.toFixed(1)}%)`;
      }

      sel.addEventListener('change', () => {
        if (sel.value === 'photo') { range.min = '200'; range.max = '4000'; range.step = '10'; range.value = '1000'; }
        else { range.min = '1'; range.max = '600'; range.step = '1'; range.value = '30'; }
        render();
      });
      range.addEventListener('input', render);
      exBtn.addEventListener('click', () => {
        sel.value = 'video';
        range.min = '1'; range.max = '600'; range.step = '1'; range.value = '30';
        render();
      });

      render();
    }
  },

  teacherLines: [
    'AI는 사진도 소리도 <b>작은 조각(토큰)</b>으로 잘라 글처럼 읽어요.',
    '긴 영상은 토큰이 아주 많아요. <b>필요한 부분만 잘라서</b> 보여 줘요.'
  ],
  tip: {
    body: '사진은 <b>글자 부분을 크게</b>, 영상은 <b>질문과 관련된 10~30초 구간</b>만 잘라서 넣으면 토큰도 아끼고 답도 정확해져요.',
    extra: '학생 얼굴·목소리가 담긴 파일은 올리기 전에 가리거나 동의를 받아요.'
  },
  myth: {
    myth: 'AI는 영상을 사람처럼 처음부터 끝까지 이어서 본다.',
    fact: '영상과 소리를 초당 정해진 수의 토큰으로 바꿔 읽어요(공식 문서 예: 영상 1초 263토큰). 길어질수록 토큰이 쌓여 컨텍스트를 빨리 채워요.'
  },
  sources: [
    { title: 'OpenAI, GPT-4o System Card (arXiv 2410.21276, 2024)', url: 'https://arxiv.org/abs/2410.21276', note: '글·소리·그림·영상을 한 신경망이 처음부터 끝까지 처리하는 옴니 모델, 음성 평균 응답 0.32초.' },
    { title: 'Claude Docs — Vision', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', note: '28×28 픽셀 조각 하나 = 시각 토큰 하나라는 공식 계산식과 고해상도 한도.' },
    { title: 'Gemini API — Understand and count tokens', url: 'https://ai.google.dev/gemini-api/docs/tokens', note: '이미지·영상·오디오의 초당·타일당 토큰 수를 밝힌 공식 문서.' },
    { title: 'Qwen2.5-Omni Technical Report (arXiv 2503.20215, 2025)', url: 'https://arxiv.org/abs/2503.20215', note: '생각하는 부분과 말하는 부분을 나누고 영상·소리의 시각을 맞추는 옴니 모델 구조.' }
  ],
  script: `30초짜리 과학 실험 영상을 올리고 "무슨 일이 일어났어?"라고 물었더니, AI가 소리와 장면을 같이 설명하고 말을 걸면 바로 끼어들어 대답까지 했어요. 사진도 소리도 영상도 어떻게 한 모델이 한 번에 받아 답할까요.

비결은 모든 입력을 작은 조각, 토큰으로 바꾸는 거예요. 사진은 28×28 픽셀 조각 하나가 시각 토큰 하나가 돼요. 1000×1000 사진이면 1,296개고, 2020년 연구가 이미지를 이렇게 조각으로 읽는 길을 열었어요. 소리와 영상도 공식 문서 기준으로 1초에 각각 32토큰, 263토큰씩 토큰이 돼요. 30초 영상이면 약 7,900토큰이라 길게 넣을수록 컨텍스트 창을 빨리 채워요. 이 조각들이 글자 토큰과 같은 줄에 나란히 놓이고, 옴니 모델은 이 전부를 신경망 하나가 처음부터 끝까지 같이 학습해요.

다만 큰 사진은 줄인 뒤 읽어서 작은 글자가 흐려지고, 개수나 위치는 근사치예요. 영상은 꼭 필요한 구간만 잘라서, 사진은 글자 부분을 크게 찍어서 올리면 토큰도 아끼고 답도 정확해져요.`
};
