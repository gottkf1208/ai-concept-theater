/* S2-14 [트랙 S2] 영상이 이미지보다 훨씬 비싼 이유: 프레임 × 해상도 × 단계, 그리고 VAE 압축 */
export default {
  slug: 'v2-video-cost',
  track: 'S2',
  title: '영상은 왜 이미지보다 훨씬 비쌀까',
  subtitle: '프레임 × 해상도 × 단계, 그리고 VAE 압축',
  summary: '이미지 한 장보다 영상 몇 초가 훨씬 많은 크레딧을 쓰는 이유를 프레임 수·해상도·단계 수와 VAE 압축으로 계산해 봐요. 영상 길이와 해상도에 상한이 있는 이유도 공식 문서 숫자로 확인해요.',
  keywords: ['연산량', '크레딧', '프레임', '잠재 공간', 'VAE', '토큰', '어텐션', '시공간 압축', '단계 수', '해상도 상한'],

  scenes: [
    {
      title: '크레딧 창을 보고 놀랐어요', dur: 13,
      captions: [
        { t: 0, text: '이미지 한 장과 영상 몇 초, 크레딧 창을 보고 눈이 커졌어요.' },
        { t: 5, text: '<em>영상 쪽이 훨씬 많이</em> 깎여 있었거든요.' },
        { t: 9.5, text: '<em>프레임 수 × 해상도 × 단계 수</em> 때문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const title = P.text({ x: 340, y: 50, w: 860, text: '이미지 한 장과 영상 <em>몇 초</em>, 크레딧 차이가 왜 이렇게 클까요', size: 26, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const barX = 360, barW = 800, row1Y = 190, row2Y = 350;
        const lab1 = P.text({ x: 360, y: row1Y - 40, w: 400, text: '이미지 1장', size: 22, weight: 700 });
        const lab2 = P.text({ x: 360, y: row2Y - 40, w: 400, text: '영상 8초', size: 22, weight: 700 });
        tl.at(stage.appendChild(lab1.el), .6, { from: 'left' });
        tl.at(stage.appendChild(lab2.el), .9, { from: 'left' });
        const track1 = P.h('div', { style: `position:absolute;left:${barX}px;top:${row1Y}px;width:${barW}px;height:44px;background:var(--paper);border-radius:10px` });
        const fill1 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0%;background:#127E90;border-radius:10px' });
        track1.append(fill1); tl.at(stage.appendChild(track1), .6, { from: 'left' });
        const track2 = P.h('div', { style: `position:absolute;left:${barX}px;top:${row2Y}px;width:${barW}px;height:44px;background:var(--paper);border-radius:10px` });
        const fill2 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0%;background:#F2812D;border-radius:10px' });
        track2.append(fill2); tl.at(stage.appendChild(track2), .9, { from: 'left' });
        const chip = P.chip({ x: 360, y: 430, text: '차이 = 프레임 수 × 해상도 × 단계 수', color: 'ink', size: 22 });
        tl.at(stage.appendChild(chip.el), 9.8, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            fill1.style.width = `${P.easeOut(P.clamp((t - 1.0) / .8, 0, 1)) * 10}%`;
            fill2.style.width = `${P.easeOut(P.clamp((t - 1.3) / 1.0, 0, 1)) * 92}%`;
          }
        };
      }
    },
    {
      title: '8초면 그림 192장', dur: 13,
      captions: [
        { t: 0, text: '영상 8초면 그림이 몇 장이나 될까요?' },
        { t: 5, text: '공식 문서 기준으로 영상은 1초에 <em>24장</em>, 8초면 <em>192장</em>이에요.' },
        { t: 9.5, text: '게다가 앞뒤 장면이 자연스럽게 이어지도록 <em>시간 축</em>까지 함께 계산해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'point' });
        stage.append(q.el);
        const lab = P.text({ x: 330, y: 70, w: 600, text: '1초 분량의 프레임', size: 22, weight: 700 });
        tl.at(stage.appendChild(lab.el), .2, { from: 'left' });
        const cell = 34, gap = 6, cols = 12, stripX = 330, row1Y = 120, row2Y = row1Y + cell + gap;
        const frames = [];
        for (let i = 0; i < cols * 2; i++) {
          const row = i < cols ? 0 : 1, col = i % cols;
          const fx = stripX + col * (cell + gap), fy = row === 0 ? row1Y : row2Y;
          const f = P.box({ x: fx, y: fy, w: cell, h: cell, accent: i % 2 ? 'aqua' : 'orange' });
          tl.at(stage.appendChild(f.el), .6 + i * .09, { from: 'pop' });
          frames.push(f);
        }
        const secLab = P.chip({ x: 330, y: row2Y + 50, text: '1초 = 24장', color: 'ink', size: 20 });
        tl.at(stage.appendChild(secLab.el), 3.2, { from: 'pop' });
        const mul = P.text({ x: 330, y: row2Y + 100, w: 700, text: '× 8초 = <b>0</b>장', size: 30, weight: 800 });
        tl.at(stage.appendChild(mul.el), 5.0, { from: 'up' });
        const note = P.text({ x: 330, y: row2Y + 160, w: 860, text: '게다가 앞뒤 장면이 자연스럽게 이어지도록 <em>시간 축</em>까지 함께 계산해요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            frames.forEach((f, i) => f.on(t > .6 + i * .09));
            const n = Math.round(P.easeOut(P.clamp((t - 5.0) / 3.0, 0, 1)) * 192);
            mul.set(`× 8초 = <b>${n}</b>장`);
          }
        };
      }
    },
    {
      title: '압축해서 계산해요: VAE', dur: 14,
      captions: [
        { t: 0, text: '이대로 계산하면 숫자가 너무 커요.' },
        { t: 5, text: '그래서 <em>VAE</em>라는 압축기로 줄인 뒤 계산해요. 가로·세로를 각각 8분의 1로 줄이니 넓이는 <em>64분의 1</em>이에요.' },
        { t: 9.8, text: '영상은 시간도 4분의 1로 줄여요. 압축을 더 세게 하면 더 싸지지만 2024년 연구는 <em>세부가 사라지는</em> 대가가 있다고 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const a = P.box({ x: 340, y: 110, w: 250, h: 140, label: '원본 화면', sub: '가로×세로 픽셀 그대로', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(a.el), .2, { from: 'left' });
        const arrAB = P.arrow(lines, { x1: 590, y1: 180, x2: 660, y2: 180, width: 4, color: '#1B1F24' });
        const vae = P.box({ x: 660, y: 145, w: 150, h: 90, label: 'VAE', sub: '압축기', accent: 'aqua' });
        tl.at(stage.appendChild(vae.el), 1.6, { from: 'pop' });
        const arrBC = P.arrow(lines, { x1: 810, y1: 180, x2: 880, y2: 180, width: 4, color: '#1B1F24' });
        const c = P.box({ x: 880, y: 110, w: 280, h: 140, label: '잠재 공간', sub: '가로·세로 각 1/8 · 넓이 1/64<br>채널은 늘어요(3 → 16)', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(c.el), 3.4, { from: 'pop' });
        const t1 = P.text({ x: 340, y: 300, w: 800, text: '영상은 <em>시간 축</em>도 압축해요', size: 24, weight: 800 });
        tl.at(stage.appendChild(t1.el), 6.0, { from: 'up' });
        const fcell = 70, fgap = 14, fx0 = 340, fy = 360;
        const frameBoxes = [0, 1, 2, 3].map(i => {
          const b = P.box({ x: fx0 + i * (fcell + fgap), y: fy, w: fcell, h: fcell, label: String(i + 1), accent: '' });
          tl.at(stage.appendChild(b.el), 6.4 + i * .2, { from: 'pop' });
          return b;
        });
        const arrT = P.arrow(lines, { x1: fx0 + 4 * (fcell + fgap) + 10, y1: fy + fcell / 2, x2: fx0 + 4 * (fcell + fgap) + 90, y2: fy + fcell / 2, width: 4, color: '#1B1F24' });
        const outFrame = P.box({ x: fx0 + 4 * (fcell + fgap) + 100, y: fy, w: fcell, h: fcell, label: '1', accent: 'orange' });
        tl.at(stage.appendChild(outFrame.el), 7.6, { from: 'pop' });
        const t2 = P.text({ x: fx0, y: fy + fcell + 30, w: 800, text: '4프레임 → <em>1</em>, 시간은 <i>4분의 1</i>로 줄어요', size: 22, weight: 700 });
        tl.at(stage.appendChild(t2.el), 8.0, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.8);
            arrAB.draw(P.clamp((t - 1.0) / .5, 0, 1));
            arrBC.draw(P.clamp((t - 2.8) / .5, 0, 1));
            arrT.draw(P.clamp((t - 7.2) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '토큰의 제곱, 그리고 단계마다 반복', dur: 14,
      captions: [
        { t: 0, text: '압축해도 영상은 조각이 훨씬 많아요. 계산해 보면 1024 이미지가 약 4천 조각, 720p 81프레임 영상은 약 7만 6천 조각이에요.' },
        { t: 5.5, text: '조각끼리 서로 비교하는 <em>어텐션</em>은 조각 수의 <em>제곱</em>으로 늘고, 잡음 걷기 단계마다 반복돼요.' },
        { t: 10, text: '그래서 한 공식 영상 API는 1080p·4K를 <em>8초 길이로만</em> 열어 둬요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const smallSq = P.h('div', { style: 'position:absolute;left:700px;top:460px;width:20px;height:20px;background:#127E90;border-radius:4px' });
        const bigSq = P.h('div', { style: 'position:absolute;left:750px;top:110px;width:370px;height:370px;background:#F2812D;opacity:.16;border:3px solid #F2812D;border-radius:12px;box-sizing:border-box' });
        tl.at(stage.appendChild(smallSq), 1.6, { from: 'pop' });
        tl.at(stage.appendChild(bigSq), 1.9, { from: 'pop' });
        const smallLab = P.text({ x: 640, y: 485, w: 160, text: '이미지<br>≈ 4,096 조각', size: 15, weight: 700, align: 'center' });
        const bigLab = P.text({ x: 750, y: 485, w: 370, text: '영상 ≈ 75,600 조각(약 18.5배)<br>넓이로 보면 <em>약 340배</em>', size: 17, weight: 800, align: 'center' });
        tl.at(stage.appendChild(smallLab.el), 2.0, { from: 'up' });
        tl.at(stage.appendChild(bigLab.el), 2.2, { from: 'up' });
        const textAtt = P.text({ x: 340, y: 110, w: 620, text: '조각끼리 비교하는 <em>어텐션</em>은 조각 수의 <em>제곱</em>으로 늘고,<br>잡음 걷기 단계마다 이 계산을 반복해요.', size: 23, weight: 800 });
        tl.at(stage.appendChild(textAtt.el), 5.8, { from: 'up' });
        const apiBox = P.box({ x: 340, y: 230, w: 380, h: 120, label: '공식 영상 API', sub: '1080p·4K는 <b>8초 길이로만</b> 열려 있어요', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(apiBox.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            apiBox.on(t > 10.2);
          }
        };
      }
    },
    {
      title: '초안은 작게, 최종만 크게', dur: 12,
      captions: [
        { t: 0, text: '그래서 비용을 줄이는 방법도 있어요.' },
        { t: 5, text: '2026년 영상 모델 공식 안내도 <em>360p는 초안용</em>, 고른 것만 크게 키우라고 해요.' },
        { t: 8.5, text: '긴 영상은 <em>짧은 조각을 이어</em> 만들어요. 길이·해상도에 상한이 있는 건 계산량과 메모리 때문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const steps = ['360p로 짧게 여러 번', '마음에 드는 것 고르기', '최종만 크게·이어붙이기'].map((label, i) => {
          const box = P.box({ x: 430 + i * 270, y: 140, w: 250, h: 130, label, accent: i === 2 ? 'orange' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .6, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680 + i * 270, y1: 205, x2: 700 + i * 270, y2: 205, width: 4, color: '#1B1F24' }));
        const chips = ['해상도', '길이', '단계 수'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 430 + i * 170, y: 300, text: c, color: i % 2 ? 'orange' : 'aqua', size: 22 }).el), 2.4 + i * .3, { from: 'pop' }));
        const final = P.text({ x: 430, y: 400, w: 790, text: '짧게 여러 번 시도하고, 마음에 드는 것만 <em>크게 키우거나 이어붙여요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.4, { from: 'up' });
        const last = P.text({ x: 430, y: 460, w: 790, text: '길이·해상도에 상한이 있는 건 <em>계산량과 메모리</em> 때문이에요.', size: 25, weight: 700 });
        tl.at(stage.appendChild(last.el), 8.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.6);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .6 && t < 5.4));
          }
        };
      }
    }
  ],

  interaction: {
    title: '연산량 계산기',
    desc: '해상도·길이·초당 프레임·잡음 걷기 단계 수를 바꿔서 <b>픽셀 칸 수 → 토큰 수 → 상대 계산량</b>이 어떻게 달라지는지 봐요. 기준은 1024×1024 이미지 1장이에요(=1배). <b>VAE로 압축</b>하면 토큰 수가 줄고, <b>조각 2×2로 묶기</b>를 더하면 더 줄어요. 공개 논문 사양으로 계산한 대략값이에요.',
    mount(el, P) {
      const RES = [
        { label: '360p', h: 360, w: 640 },
        { label: '480p', h: 480, w: 854 },
        { label: '720p', h: 720, w: 1280 },
        { label: '1080p', h: 1080, w: 1920 }
      ];
      const FPS = [12, 24];
      const STEPS = [4, 8, 20, 50];

      const resRange = P.h('input', { type: 'range', id: 'sim-res', min: '0', max: String(RES.length - 1), step: '1', value: '2', 'aria-label': '해상도' });
      const resOut = P.h('output', { for: 'sim-res' }, RES[2].label);
      const lenRange = P.h('input', { type: 'range', id: 'sim-len', min: '1', max: '8', step: '1', value: '4', 'aria-label': '길이(초)' });
      const lenOut = P.h('output', { for: 'sim-len' }, '4초');
      const fpsRange = P.h('input', { type: 'range', id: 'sim-fps', min: '0', max: '1', step: '1', value: '1', 'aria-label': '초당 프레임' });
      const fpsOut = P.h('output', { for: 'sim-fps' }, `${FPS[1]}fps`);
      const stepRange = P.h('input', { type: 'range', id: 'sim-step', min: '0', max: String(STEPS.length - 1), step: '1', value: '1', 'aria-label': '잡음 걷기 단계' });
      const stepOut = P.h('output', { for: 'sim-step' }, `${STEPS[1]}단계`);

      const vaeBox = P.h('input', { type: 'checkbox', id: 'sim-vae' });
      const patchBox = P.h('input', { type: 'checkbox', id: 'sim-patch' });

      const row = (labelEl, input, out) => P.h('div', { class: 'sim-row' }, labelEl, input, out);
      const controls = P.h('div', { class: 'sim-controls' },
        row(P.h('label', { for: 'sim-res' }, '해상도'), resRange, resOut),
        row(P.h('label', { for: 'sim-len' }, '길이'), lenRange, lenOut),
        row(P.h('label', { for: 'sim-fps' }, '초당 프레임'), fpsRange, fpsOut),
        row(P.h('label', { for: 'sim-step' }, '잡음 걷기 단계'), stepRange, stepOut),
        P.h('label', { class: 'sim-check', for: 'sim-vae' }, vaeBox, ' VAE로 압축(가로·세로 1/8, 영상은 시간도 1/4)'),
        P.h('label', { class: 'sim-check', for: 'sim-patch' }, patchBox, ' 조각 2×2로 묶기')
      );

      const btnVae = P.h('button', { class: 'btn primary', type: 'button' }, 'VAE 압축 켜기');
      const btnReset = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const btnBar = P.h('div', { class: 'sim-btnbar' }, btnVae, btnReset);

      const pxLine = P.h('div', { class: 'sim-line' }, P.h('span', { class: 'sim-k' }, '① 픽셀 칸 수'), P.h('b', { class: 'sim-v' }, ''));
      const tkLine = P.h('div', { class: 'sim-line' }, P.h('span', { class: 'sim-k' }, '② 토큰 수'), P.h('b', { class: 'sim-v' }, ''));
      const relLine = P.h('div', { class: 'sim-line' }, P.h('span', { class: 'sim-k' }, '③ 상대 계산량(이미지 1장 = 1배)'), P.h('b', { class: 'sim-v' }, ''));
      const barFill = P.h('i', {});
      const barTrack = P.h('div', { class: 'sim-relbar' }, barFill);
      const note = P.h('p', { class: 'sim-note' }, '공개 논문 사양으로 계산한 대략값이에요. 실제 요금·시간과는 달라요.');

      const wrap = P.h('div', { class: 'sim-wrap' }, controls, btnBar, P.h('div', { class: 'sim-out' }, pxLine, tkLine, relLine, barTrack), note);
      el.append(wrap, P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-controls{display:flex;flex-direction:column;gap:10px}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;font-size:14px}
        .sim-row label{min-width:110px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 140px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--acc1);min-width:62px;text-align:right}
        .sim-check{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;font-weight:600;line-height:1.4;cursor:pointer}
        .sim-check input{margin-top:3px;flex:none}
        .sim-btnbar{display:flex;gap:10px;flex-wrap:wrap}
        .sim-out{display:flex;flex-direction:column;gap:8px;padding:12px;border:1px solid var(--line);border-radius:12px;background:#fff}
        .sim-line{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:14px}
        .sim-k{color:var(--muted)}
        .sim-v{font-family:var(--mono);font-size:15px}
        .sim-relbar{height:10px;border-radius:999px;background:var(--paper);overflow:hidden;margin-top:2px}
        .sim-relbar i{display:block;height:100%;width:0%;background:var(--acc2);transition:width .2s}
        .sim-note{font-size:12.5px;color:var(--muted);margin:0}
      ` }));

      function tokensFor(frames, H, W, vaeOn, patchOn) {
        const divisor = (vaeOn ? 8 : 1) * (patchOn ? 2 : 1);
        const effFrames = vaeOn ? (1 + Math.floor((frames - 1) / 4)) : frames;
        return effFrames * Math.ceil(H / divisor) * Math.ceil(W / divisor);
      }
      const fmt = n => Math.round(n).toLocaleString('ko-KR');
      const barPct = x => P.clamp(6 + 16 * Math.log10(Math.max(x, 0.01)), 3, 100);

      function render() {
        const resIdx = +resRange.value, len = +lenRange.value, fpsIdx = +fpsRange.value, stepIdx = +stepRange.value;
        const vaeOn = vaeBox.checked, patchOn = patchBox.checked;
        const { h: H, w: W, label } = RES[resIdx];
        const fps = FPS[fpsIdx], steps = STEPS[stepIdx];
        resOut.textContent = label; lenOut.textContent = `${len}초`; fpsOut.textContent = `${fps}fps`; stepOut.textContent = `${steps}단계`;

        const frames = len * fps;
        const pixels = frames * H * W;
        const tokens = tokensFor(frames, H, W, vaeOn, patchOn);
        const baseTokens = tokensFor(1, 1024, 1024, vaeOn, patchOn);
        const rel = Math.pow(tokens / baseTokens, 2);

        pxLine.querySelector('.sim-v').textContent = `${fmt(pixels)}칸 (${frames}프레임 × ${H} × ${W})`;
        tkLine.querySelector('.sim-v').textContent = `${fmt(tokens)}개`;
        relLine.querySelector('.sim-v').textContent = `약 ${rel >= 10 ? fmt(rel) : rel.toFixed(1)}배`;
        barFill.style.width = `${barPct(rel)}%`;
      }
      [resRange, lenRange, fpsRange, stepRange].forEach(r => r.addEventListener('input', render));
      [vaeBox, patchBox].forEach(c => c.addEventListener('change', render));
      btnVae.addEventListener('click', () => { vaeBox.checked = true; render(); });
      btnReset.addEventListener('click', () => {
        resRange.value = '2'; lenRange.value = '4'; fpsRange.value = '1'; stepRange.value = '1';
        vaeBox.checked = false; patchBox.checked = false; render();
      });
      render();
    }
  },

  teacherLines: [
    '영상은 그림 한 장이 아니라 <b>1초에 24장</b>이에요. 8초면 192장을 이어서 그려요.',
    'AI는 그림을 <b>압축해서</b> 계산하는데도, 영상은 조각끼리 비교할 게 너무 많아서 비싸요.'
  ],
  tip: {
    body: '영상은 <b>360p·짧게</b> 여러 번 만들어 보고, 마음에 드는 것 하나만 고화질로 키우거나 이어 붙여요. 크레딧을 가장 많이 아끼는 순서예요.',
    extra: '한 공식 영상 API는 1080p·4K를 8초 길이로만 열어 두고, 더 길게는 7초씩 이어 붙이게 해요. 긴 영상이 필요하면 8초 안팎 조각을 여러 개 만들어 편집 프로그램에서 이어요(29편 긴 영상과 연결).'
  },
  myth: {
    myth: '영상도 이미지 생성기를 프레임 수만큼 돌리는 것뿐이다.',
    fact: '영상은 프레임 사이 시간 관계까지 함께 계산해요. 조각 수가 많아지면 어텐션 계산은 그 <b>제곱</b>으로 늘고, 잡음 걷기 단계마다 반복돼요. 압축(VAE)으로 줄여도 이미지보다 훨씬 커요.'
  },
  sources: [
    { title: 'High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)', url: 'https://arxiv.org/abs/2112.10752', note: '잠재 공간에서 계산해 비용을 줄이는 방법.' },
    { title: 'Wan: Open and Advanced Large-Scale Video Generative Models (arXiv, 2025)', url: 'https://arxiv.org/abs/2503.20314', note: '영상 VAE 시공간 압축(시간 1/4, 가로·세로 1/8), 어텐션 계산량이 토큰 수의 제곱으로 증가.' },
    { title: 'LTX-Video: Realtime Video Latent Diffusion (arXiv, 2024)', url: 'https://arxiv.org/abs/2501.00103', note: '1:192 고압축의 효율과 세부 손실 맞바꿈.' },
    { title: 'Gemini API — Generate videos with Veo 3.1', url: 'https://ai.google.dev/gemini-api/docs/veo', note: '4·6·8초, 24fps, 1080p·4K는 8초만, 7초씩 최대 148초 연장.' }
  ],
  script: `이미지 한 장과 영상 몇 초, 크레딧 차이에 눈이 커진 적 있으시죠. 프레임 수, 해상도, 단계 수 때문이에요. 공식 문서 기준으로 영상은 1초에 24장, 8초면 192장이고, 앞뒤 장면이 이어지도록 시간 축까지 계산해요.

그대로는 너무 커서 VAE라는 압축기로 줄인 잠재 공간에서 계산해요. 가로·세로 각 8분의 1이라 넓이는 64분의 1, 영상은 시간도 4분의 1로 줄여요. 그래도 1024 이미지는 약 4천 조각, 720p 81프레임 영상은 약 7만 6천 조각이에요. 어텐션은 조각 수의 제곱으로 늘고, 단계마다 반복돼요.

그래서 한 공식 영상 API는 1080p·4K를 8초만 열어 두고, 2026년 영상 모델 안내도 360p는 초안용이라고 해요. 짧고 작게 여러 번 시도해 고른 것만 키우거나 이어 붙이면 크레딧을 아낄 수 있어요.`
};
