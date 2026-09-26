/* S5-2 [트랙 C] 업스케일은 없는 픽셀을 어디서 가져올까: 초해상도 */
export default {
  slug: 's5-upscale',
  track: 'C',
  title: '업스케일은 없는 픽셀을 어디서 가져올까',
  subtitle: '초해상도',
  summary: '학급 사진을 4배로 키웠더니 선명해졌는데 이름표 글자가 다른 글자로 바뀌었어요. 보간과 생성형 업스케일이 없는 픽셀을 채우는 서로 다른 방식과, 업스케일이 복원이 아니라 추정인 이유를 파고들어요.',
  keywords: ['업스케일', '초해상도', '보간', '생성형 업스케일', 'SRGAN', 'SR3', 'Real-ESRGAN', '픽셀', '추정'],

  scenes: [
    {
      title: '이름표 글자가 바뀌었어요', dur: 13,
      captions: [
        { t: 0, text: '학급 사진을 <em>4배</em>로 키웠더니 선명해졌어요.' },
        { t: 5, text: '그런데 확대해서 보니 이름표 <em>글자가 다른 글자로</em> 바뀌었어요.' },
        { t: 9.5, text: '화질은 좋아졌는데, 왜 없던 글자가 생겼을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const before = P.box({ x: 340, y: 120, w: 260, h: 190, label: '학급 사진(작게)', sub: '이름표 글자가 작아서<br>잘 안 보여요', accent: 'ink' });
        const after = P.box({ x: 690, y: 90, w: 300, h: 250, label: '4배로 키운 사진', sub: '선명해 보여요', accent: 'orange' });
        tl.at(stage.appendChild(before.el), .3, { from: 'up' });
        tl.at(stage.appendChild(after.el), 1.4, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 610, y1: 210, x2: 670, y2: 210, width: 4, color: '#1B1F24' });
        const chipBefore = P.chip({ x: 340, y: 330, text: '이름표: 도윤', color: 'ink', size: 18 });
        const chipAfter = P.chip({ x: 690, y: 360, text: '이름표: 도훈 (다른 글자)', color: 'orange', size: 18 });
        tl.at(stage.appendChild(chipBefore.el), 4.6, { from: 'pop' });
        tl.at(stage.appendChild(chipAfter.el), 5.4, { from: 'pop' });
        const note = P.text({ x: 340, y: 460, w: 650, text: '화질은 좋아졌는데, <em>없던 글자</em>가 생겼어요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrow.draw(P.clamp((t - 1.7) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '보간: 이웃끼리 평균 내기', dur: 14,
      captions: [
        { t: 0, text: '작은 그림을 키우면 <em>없던 픽셀</em>이 필요해요. 옛 방식은 <em>보간</em>이에요.' },
        { t: 5, text: '2×2 칸을 4×4로 늘리면, 새 칸은 <em>이웃 색의 평균</em>으로 채워져요.' },
        { t: 10, text: '평균을 내면 경계가 <em>흐려지고</em> 뭉개져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const swatches = ['#F2812D', '#127E90', '#1B1F24', '#9AA5AF'];
        const gridBox = (x, y, size, blur) => P.h('div', {
          style: `left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:14px;overflow:hidden;border:3px solid #1B1F24;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;${blur ? `filter:blur(${blur}px);` : ''}`
        }, ...swatches.map(c => P.h('div', { style: `background:${c}` })));
        const small = gridBox(340, 110, 180, 0);
        const big = gridBox(640, 70, 340, 14);
        tl.at(stage.appendChild(small), .3, { from: 'up' });
        tl.at(stage.appendChild(big), 4.4, { from: 'up' });
        const smallLab = P.text({ x: 340, y: 300, w: 180, text: '원본 2×2', size: 18, weight: 800, align: 'center' });
        const bigLab = P.text({ x: 640, y: 420, w: 340, text: '보간 4×4 (경계가 흐려요)', size: 18, weight: 800, align: 'center' });
        tl.at(stage.appendChild(smallLab.el), .6, { from: 'up' });
        tl.at(stage.appendChild(bigLab.el), 4.7, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 530, y1: 200, x2: 630, y2: 200, width: 4, color: '#1B1F24' });
        const gen = P.text({ x: 340, y: 470, w: 640, text: '그래서 보간으로 키운 사진은 <em>선이 흐릿하고 뭉개져요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(gen.el), 10.2, { from: 'up' });
        const small2 = P.text({ x: 340, y: 525, w: 640, text: '이웃 2개면 이중선형, 4개면 이중삼차 보간이에요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small2.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.4 || t > 10);
            arrow.draw(P.clamp((t - 2.2) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '생성형 업스케일: 그럴듯하게 그려 넣어요', dur: 13,
      captions: [
        { t: 0, text: '다른 방식은 <em>생성형 업스케일</em>이에요. "이런 무늬는 보통 이렇게 생겼다"는 학습된 패턴으로 세부를 <em>그려 넣어요</em>.' },
        { t: 5, text: '2017년 연구는 진짜 같은 질감을 만드는 법을 제안했고, 2021년 연구들은 확산 모델과 실제 흐림까지 흉내 낸 학습으로 이어졌어요.' },
        { t: 9.5, text: '그래서 선명하지만, <em>없던 세부</em>가 생길 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 100, w: 280, h: 170, label: 'SRGAN', sub: '적대적 학습으로<br>진짜 같은 질감을 만들어요', accent: 'orange', icon: P.ICON.doc });
        const b = P.box({ x: 660, y: 100, w: 280, h: 170, label: 'SR3', sub: '확산 모델로<br>세부를 반복해서 그려요', accent: 'aqua', icon: P.ICON.doc });
        const c = P.box({ x: 360, y: 290, w: 280, h: 170, label: 'Real-ESRGAN', sub: '실제 흐림·잡음까지<br>흉내 낸 데이터로 학습해요', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 1.1, { from: 'up' });
        tl.at(stage.appendChild(c.el), 5.2, { from: 'up' });
        const final = P.text({ x: 360, y: 480, w: 580, text: '선명해졌지만 그 세부는 <i>추정</i>이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 360, y: 540, w: 580, text: '학습 사진에 많던 무늬를 우선해서 채워요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.5);
            a.on(t > .3); b.on(t > 1.1); c.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '어디서 틀리나', dur: 13,
      captions: [
        { t: 0, text: '특히 조심할 곳은 <em>정답이 정해진 곳</em>이에요.' },
        { t: 5, text: '글자·숫자·얼굴·로고는 추정이 틀리면 <em>바로 드러나요</em>.' },
        { t: 9, text: '풀잎이나 머리결, 구름처럼 <em>정답이 없는 곳</em>은 그럴듯하면 문제가 적어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const ans = P.box({ x: 360, y: 110, w: 380, h: 220, label: '정답이 있는 곳', sub: '글자·숫자<br>얼굴·로고', accent: 'orange', icon: P.ICON.doc });
        const free = P.box({ x: 800, y: 110, w: 380, h: 220, label: '정답이 없는 곳', sub: '풀잎·머리결<br>구름', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(ans.el), .3, { from: 'up' });
        tl.at(stage.appendChild(free.el), 1.1, { from: 'up' });
        const chipWarn = P.chip({ x: 360, y: 360, text: '추정이 틀리면 바로 보여요', color: 'orange', size: 20 });
        const chipOk = P.chip({ x: 800, y: 360, text: '그럴듯하면 문제 적어요', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chipWarn.el), 5.2, { from: 'pop' });
        tl.at(stage.appendChild(chipOk.el), 9.2, { from: 'pop' });
        const final = P.text({ x: 360, y: 430, w: 820, text: '확대한 사진은 <em>글자와 얼굴</em>부터 확인하세요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, (t > 4.8 && t < 9) || t > 9.6);
            ans.on(t > .3); free.on(t > 1.1);
          }
        };
      }
    },
    {
      title: '정리: 복원이 아니라 추정이에요', dur: 13,
      captions: [
        { t: 0, text: '원본이 더 큰 파일로 남아 있는지 <em>먼저</em> 찾아보세요.' },
        { t: 4.5, text: '가능하면 원본 해상도에서 <em>다시 만드는</em> 게 낫고, 키운 뒤엔 확대해서 확인해요.' },
        { t: 8.5, text: '업스케일은 복원이 아니라 <em>추정</em>이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 원본부터 찾기', '더 큰 파일이 남아 있는지 먼저'],
          ['② 가능하면 재생성', '원본 해상도에서 다시 만들기'],
          ['③ 확대 확인', '글자·숫자·얼굴·로고부터'],
          ['④ 정답 없는 곳은 안심', '풀·머리결·구름은 대체로 무해']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '업스케일은 복원이 아니라 <i>추정</i>이에요.', size: 27, weight: 800 });
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
    title: '보간 vs 생성 업스케일 비교',
    desc: '왼쪽은 <b>보간</b>으로, 오른쪽은 <b>생성형 업스케일</b>로 그림을 키운 결과예요. 배율을 올리면 왼쪽은 점점 흐려지고, 오른쪽은 세부가 생기지만 몇 곳은 <b>틀린 세부</b>예요. "틀린 세부 표시"를 눌러 어디가 틀렸는지 확인해 보세요. 실제 도구의 결과는 이보다 다를 수 있어요.',
    mount(el, P) {
      const N = 8, CELL = 36, SIZE = N * CELL;
      const GRID = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 2, 1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 3, 3, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0]
      ];
      const COLORS = { 0: '#EAF7FA', 1: '#F2812D', 2: '#1B1F24', 3: '#1B1F24' };
      const FUR = [];
      GRID.forEach((row, y) => row.forEach((v, x) => { if (v === 1) FUR.push([x, y]); }));
      /* 결정적으로 섞어 둔 순서에서 앞에서부터 골라 "틀린 세부"로 삼아요. 배율이 오를수록 개수가 늘어요. */
      const shuffled = (() => { const r = P.rng(77); return FUR.map(cell => ({ cell, k: r() })).sort((a, b) => a.k - b.k).map(o => o.cell); })();
      const wrongCells = scale => shuffled.slice(0, Math.max(0, Math.min(3, scale - 1)));

      let scale = 1, showWrong = false;

      const leftCanvas = P.h('canvas', { class: 'sim-canvas', width: String(SIZE), height: String(SIZE) });
      const rightCanvas = P.h('canvas', { class: 'sim-canvas', width: String(SIZE), height: String(SIZE) });
      const lctx = leftCanvas.getContext('2d'), rctx = rightCanvas.getContext('2d');

      const range = P.h('input', { type: 'range', id: 'sim-scale', min: '1', max: '4', step: '1', value: '1', 'aria-label': '배율' });
      const rangeLab = P.h('label', { for: 'sim-scale', class: 'sim-rl' }, '배율 ', P.h('b', {}, '1배'));
      const toggleBtn = P.h('button', { class: 'btn primary', type: 'button' }, '틀린 세부 표시');
      const bar = P.h('div', { class: 'sim-bar' }, rangeLab, range, toggleBtn);

      const rightNote = P.h('div', { class: 'sim-note' }, '아직 틀린 세부가 없어요');
      const leftCard = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, '보간(이웃 평균)'), leftCanvas, P.h('div', { class: 'sim-note' }, '배율이 오를수록 경계가 흐려져요'));
      const rightCard = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, '생성형 업스케일'), rightCanvas, rightNote);

      el.append(P.h('div', { class: 'sim-wrap' }, bar, P.h('div', { class: 'sim-cards' }, leftCard, rightCard)));
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .sim-rl{font-size:14px;font-weight:700;color:var(--muted);display:flex;align-items:center;gap:6px;white-space:nowrap}
        .sim-bar input[type=range]{flex:1 1 140px;max-width:220px}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff;text-align:center}
        .sim-card-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px;word-break:keep-all}
        .sim-canvas{width:100%;height:auto;display:block;border-radius:10px;background:#EAF7FA}
        .sim-note{margin-top:8px;font-size:12.5px;color:var(--muted);word-break:keep-all}
      `
      }));

      function drawLeft() {
        lctx.clearRect(0, 0, SIZE, SIZE);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          lctx.fillStyle = COLORS[GRID[y][x]];
          lctx.fillRect(x * CELL, y * CELL, CELL, CELL);
        }
        /* 보간: 배율이 오를수록 이웃 평균이 더 많이 섞여 경계가 흐려짐 */
        leftCanvas.style.filter = scale > 1 ? `blur(${(scale - 1) * 3.2}px) saturate(${(1 - (scale - 1) * 0.08).toFixed(2)})` : 'none';
      }

      function drawRight() {
        rctx.clearRect(0, 0, SIZE, SIZE);
        const wc = wrongCells(scale);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const v = GRID[y][x];
          const isWrong = wc.some(([wx, wy]) => wx === x && wy === y);
          rctx.fillStyle = isWrong ? '#127E90' : COLORS[v];
          rctx.fillRect(x * CELL, y * CELL, CELL, CELL);
          if (scale > 1 && v === 1 && !isWrong) {
            rctx.strokeStyle = 'rgba(178,82,15,.4)';
            rctx.lineWidth = 1.5;
            rctx.beginPath();
            rctx.moveTo(x * CELL + 5, y * CELL + CELL - 5);
            rctx.lineTo(x * CELL + CELL - 5, y * CELL + 5);
            rctx.stroke();
          }
          if (showWrong && isWrong) {
            rctx.strokeStyle = '#F2812D';
            rctx.lineWidth = 3;
            rctx.strokeRect(x * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4);
          }
        }
        rightNote.textContent = wc.length ? `틀린 세부 ${wc.length}곳 · 표시 ${showWrong ? '켬' : '꺼짐'}` : '아직 틀린 세부가 없어요';
      }

      function render() {
        rangeLab.querySelector('b').textContent = scale + '배';
        range.value = String(scale);
        drawLeft();
        drawRight();
      }
      range.addEventListener('input', () => { scale = +range.value; render(); });
      toggleBtn.addEventListener('click', () => {
        showWrong = !showWrong;
        toggleBtn.textContent = showWrong ? '틀린 세부 숨기기' : '틀린 세부 표시';
        render();
      });
      render();
    }
  },

  teacherLines: [
    '업스케일은 <b>없던 픽셀을 그럴듯하게 그려 넣는</b> 거예요. 복원이 아니라 추정이에요.',
    '키운 사진의 <b>글자와 얼굴</b>은 꼭 확대해서 확인해요.'
  ],
  tip: {
    body: '사진을 키우기 전에 원본이 더 큰 파일로 남아 있는지 먼저 찾아보세요. 키운 뒤에는 글자·얼굴·로고를 원본과 대조하세요.',
    extra: '인쇄용은 배율을 낮게 두 번 나눠 키우는 편이 덜 망가질 때가 있어요. 한 번에 4배보다 2배씩 두 번이 세부를 덜 지어내요.'
  },
  myth: {
    myth: '업스케일하면 원래 화질이 돌아온다.',
    fact: '사라진 정보는 돌아오지 않아요. 학습된 패턴으로 그럴듯하게 채운 <b>추정</b>일 뿐이에요.'
  },
  sources: [
    { title: 'Photo-Realistic Single Image Super-Resolution Using a Generative Adversarial Network (SRGAN, arXiv 2016)', url: 'https://arxiv.org/abs/1609.04802', note: '적대적 학습으로 진짜 사진 같은 질감을 만드는 초해상도 방법을 제안했어요.' },
    { title: 'Image Super-Resolution via Iterative Refinement (SR3, arXiv 2021)', url: 'https://arxiv.org/abs/2104.07636', note: '확산 모델로 저해상도 이미지를 반복해서 다듬어 초해상도를 만드는 방법이에요.' },
    { title: 'Real-ESRGAN: Training Real-World Blind Super-Resolution with Pure Synthetic Data (arXiv 2021)', url: 'https://arxiv.org/abs/2107.10833', note: '실제 사진의 흐림·잡음·압축 손상까지 흉내 낸 합성 데이터로 학습했어요.' }
  ],
  script: `학급 사진을 4배로 키웠더니 선명해졌는데, 이름표 글자가 다른 글자로 바뀐 적 있으시죠. 왜 없던 글자가 생길까요.

작은 사진을 키우면 없던 픽셀이 필요해요. 옛 방식인 보간은 2×2 칸을 4×4로 늘릴 때 새 칸을 이웃 색의 평균으로 채워서 경계가 흐려져요. 생성형 업스케일은 흐린 입력을 보고 "보통 이렇게 생겼다"는 학습된 패턴으로 세부를 그려 넣어요. 2017년 연구가 진짜 같은 질감을 만드는 법을 제안했고, 2021년 연구들이 확산 모델과 실제 흐림까지 흉내 낸 학습으로 이어졌어요. 선명하지만 없던 세부가 생길 수 있어요.

조심할 곳은 정답이 정해진 곳이에요. 글자·숫자·얼굴·로고는 추정이 틀리면 바로 드러나요. 풀잎이나 머리결은 그럴듯하면 괜찮아요. 업스케일은 복원이 아니라 추정이에요. 원본이 더 큰 파일로 남아 있는지 먼저 찾고, 키운 뒤엔 글자와 얼굴부터 확대해서 확인하세요.`
};
