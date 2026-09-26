/* N2 [A] 영상이 이미지보다 훨씬 비싼 이유: 연산량 */
export default {
  slug: 'n2-video-cost',
  track: 'A',
  title: '영상이 이미지보다 훨씬 비싼 이유',
  subtitle: '연산량',
  summary: '같은 도구인데 이미지 한 장보다 영상 몇 초가 훨씬 많은 크레딧을 쓰는 이유를, 초당 프레임 수와 시간 축 계산으로 풀어봐요.',
  keywords: ['연산량', '크레딧', '프레임', '잠재 공간', 'Stable Video Diffusion'],

  scenes: [
    {
      title: '크레딧 창을 보고 놀랐어요', dur: 13,
      captions: [
        { t: 0, text: '이미지 한 장과 영상 5초, 크레딧 창을 보고 눈이 커졌어요.' },
        { t: 5, text: '<em>영상 쪽이 훨씬 많이</em> 깎여 있었거든요.' },
        { t: 9.5, text: '똑같은 도구인데, 왜 이렇게 차이가 날까요? 답은 <em>프레임 수와 해상도</em>예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 340, size: 280, pose: 'oops' });
        stage.append(q.el);
        const title = P.text({ x: 360, y: 60, w: 860, text: '이미지 1장 만들기 <em>vs</em> 영상 5초 만들기', size: 28, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });

        const barX = 380, barW = 780, row1Y = 190, row2Y = 350;
        const lab1 = P.text({ x: 360, y: row1Y - 40, w: 400, text: '이미지 1장', size: 22, weight: 700 });
        const lab2 = P.text({ x: 360, y: row2Y - 40, w: 400, text: '영상 5초', size: 22, weight: 700 });
        tl.at(stage.appendChild(lab1.el), .6, { from: 'left' });
        tl.at(stage.appendChild(lab2.el), .9, { from: 'left' });

        const track1 = P.h('div', { style: `position:absolute;left:${barX}px;top:${row1Y}px;width:${barW}px;height:44px;background:#E4E8EC;border-radius:10px` });
        const fill1 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0%;background:#2BB3C9;border-radius:10px' });
        track1.append(fill1); tl.at(stage.appendChild(track1), .6, { from: 'left' });

        const track2 = P.h('div', { style: `position:absolute;left:${barX}px;top:${row2Y}px;width:${barW}px;height:44px;background:#E4E8EC;border-radius:10px` });
        const fill2 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0%;background:#F2812D;border-radius:10px' });
        track2.append(fill2); tl.at(stage.appendChild(track2), .9, { from: 'left' });

        const noteChip = P.chip({ x: barX, y: row2Y + 70, text: '차이 = 프레임 수 × 해상도', color: 'ink', size: 20 });
        tl.at(stage.appendChild(noteChip.el), 9.8, { from: 'pop' });

        return {
          tick(t) {
            q.tick(t, t < 4);
            fill1.style.width = `${P.easeOut(P.clamp((t - 1.0) / .8, 0, 1)) * 10}%`;
            fill2.style.width = `${P.easeOut(P.clamp((t - 1.3) / 1.0, 0, 1)) * 92}%`;
          }
        };
      }
    },
    {
      title: '영상은 초당 수십 장', dur: 13,
      captions: [
        { t: 0, text: '영상 5초라고 해서 짧은 게 아니에요.' },
        { t: 5, text: '초당 수십 장의 <em>정지 이미지</em>가 필름 띠처럼 쭉 이어져 있어요.' },
        { t: 9.5, text: '한 장 그리던 걸 수십 배로 그려야 하니, 그만큼 계산량도 늘어나요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 430, size: 240, pose: 'point' });
        stage.append(q.el);
        const single = P.box({ x: 320, y: 150, w: 190, h: 150, label: '이미지 1장', accent: 'aqua', icon: P.ICON.video });
        tl.at(stage.appendChild(single.el), .3, { from: 'left' });
        const arr1 = P.arrow(lines, { x1: 520, y1: 225, x2: 600, y2: 190, width: 4, color: '#1B1F24' });

        const cell = 34, gap = 6, cols = 12, stripX = 610, row1Y = 130, row2Y = row1Y + cell + gap;
        const frames = [];
        for (let i = 0; i < cols * 2; i++) {
          const row = i < cols ? 0 : 1, col = i % cols;
          const fx = stripX + col * (cell + gap), fy = row === 0 ? row1Y : row2Y;
          const f = P.box({ x: fx, y: fy, w: cell, h: cell, accent: i % 2 ? 'aqua' : 'orange' });
          tl.at(stage.appendChild(f.el), 1.0 + i * .13, { from: 'pop' });
          frames.push(f);
        }
        const moreChip = P.chip({ x: stripX, y: row2Y + 56, text: '초당 수십 장 중 24장만 표시', color: 'gray', size: 18 });
        tl.at(stage.appendChild(moreChip.el), 4.4, { from: 'up' });
        const counter = P.text({ x: 320, y: 400, w: 860, text: '', size: 26, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(counter.el), 4.6, { from: 'up' });
        const note = P.text({ x: 320, y: 470, w: 860, text: '한 장 그리던 걸 <em>수십 배</em>로 그려야 해요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arr1.draw(P.clamp((t - .8) / .5, 0, 1));
            const n = Math.min(24, Math.round(P.clamp((t - 1.0) / (24 * .13), 0, 1) * 24));
            if (t > 4.6) counter.set(`프레임 ${n}장`);
          }
        };
      }
    },
    {
      title: '시간 축까지 함께 계산해요', dur: 13,
      captions: [
        { t: 0, text: '그런데 장 수만 많은 게 아니에요.' },
        { t: 5, text: '앞뒤 프레임이 <em>자연스럽게 이어지도록</em> 함께 계산해야 해요.' },
        { t: 9.5, text: '중간에 옷이 갑자기 바뀌면 어색하잖아요. 그래서 <em>시간 축</em>까지 계산해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const w = 170, h = 110, gap = 40, xs = [80, 290, 500, 710];
        const topY = 130, botY = 400;

        const labTop = P.text({ x: 80, y: topY - 46, w: 500, text: '프레임을 <em>따로</em> 계산하면', size: 22, weight: 800, color: '#B3520F' });
        tl.at(stage.appendChild(labTop.el), .2, { from: 'up' });
        const topBoxes = xs.map((x, i) => {
          const bad = i === 2;
          const b = P.box({ x, y: topY, w, h, label: `프레임 ${i + 1}`, sub: bad ? '옷이 빨강으로 바뀜' : '파란 옷', accent: bad ? 'orange' : '' });
          tl.at(stage.appendChild(b.el), .6 + i * .4, { from: 'up' });
          return b;
        });
        const topArrows = [0, 1, 2].map(i => P.arrow(lines, {
          x1: xs[i] + w + 4, y1: topY + h / 2, x2: xs[i + 1] - 4, y2: topY + h / 2,
          width: 4, dashed: i === 1, color: i === 1 ? '#B3520F' : '#9AA5AF'
        }));
        const oopsChip = P.chip({ x: xs[2] - 40, y: topY - 46, text: '이어 보면 어색해요', color: 'orange', size: 18 });
        tl.at(stage.appendChild(oopsChip.el), 3.0, { from: 'pop' });

        const labBot = P.text({ x: 80, y: botY - 46, w: 600, text: '시간 축까지 <em>함께</em> 계산하면', size: 22, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(labBot.el), 5.6, { from: 'up' });
        const botBoxes = xs.map((x, i) => {
          const last = i === 3;
          const b = P.box({ x, y: botY, w, h, label: `프레임 ${i + 1}`, sub: '파란 옷 그대로', accent: 'aqua', icon: last ? P.ICON.check : '' });
          tl.at(stage.appendChild(b.el), 6.0 + i * .4, { from: 'up' });
          return b;
        });
        const botArrows = [0, 1, 2].map(i => P.arrow(lines, {
          x1: xs[i] + w + 4, y1: botY + h / 2, x2: xs[i + 1] - 4, y2: botY + h / 2, width: 4, color: '#127E90'
        }));
        const goodChip = P.chip({ x: xs[3] - 30, y: botY - 46, text: '자연스러워요', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(goodChip.el), 9.6, { from: 'pop' });

        const q = P.quokka({ x: 990, y: 270, size: 220, pose: 'oops' });
        tl.at(stage.appendChild(q.el), .2, { from: 'right' });

        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 9.5 && t < 12));
            topArrows.forEach((a, i) => a.draw(P.clamp((t - (.9 + i * .4)) / .5, 0, 1)));
            botArrows.forEach((a, i) => a.draw(P.clamp((t - (6.3 + i * .4)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '비용을 줄이는 방법', dur: 13,
      captions: [
        { t: 0, text: '비용을 줄이는 방법도 있어요.' },
        { t: 5, text: '원본 화면 그대로 대신, <em>압축된 잠재 공간</em>에서 계산해요(LDM).' },
        { t: 9.5, text: '짧게·낮은 해상도로 먼저 시도하고, 마음에 들면 그때 <em>최종만 크게</em> 만들어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 30, y: 440, size: 210, pose: 'tablet' });
        stage.append(q.el);

        const boxA = P.box({ x: 260, y: 110, w: 230, h: 140, label: '원본 해상도', sub: '픽셀 그대로', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(boxA.el), .2, { from: 'left' });
        const arrAB = P.arrow(lines, { x1: 490, y1: 180, x2: 570, y2: 180, width: 4, color: '#1B1F24' });
        const boxB = P.box({ x: 570, y: 145, w: 150, h: 90, label: '잠재 공간', sub: '압축됨', accent: 'aqua' });
        tl.at(stage.appendChild(boxB.el), 1.6, { from: 'pop' });
        const arrBC = P.arrow(lines, { x1: 720, y1: 190, x2: 800, y2: 190, width: 4, color: '#1B1F24' });
        const boxC = P.box({ x: 800, y: 110, w: 220, h: 140, label: '여기서 계산', sub: '더 빠르고 저렴해요', accent: 'orange' });
        tl.at(stage.appendChild(boxC.el), 3.4, { from: 'pop' });

        const boxD = P.box({ x: 230, y: 390, w: 300, h: 130, label: '시험판', sub: '짧게·저해상도로 여러 번', accent: 'aqua', icon: P.ICON.dice });
        tl.at(stage.appendChild(boxD.el), 6.0, { from: 'up' });
        const arrDE = P.arrow(lines, { x1: 530, y1: 455, x2: 780, y2: 455, width: 4, color: '#127E90' });
        const boxE = P.box({ x: 780, y: 390, w: 300, h: 130, label: '최종판', sub: '마음에 들면 길고 고화질로', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(boxE.el), 8.0, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > .5 && t < 5);
            arrAB.draw(P.clamp((t - 1.0) / .5, 0, 1));
            arrBC.draw(P.clamp((t - 2.8) / .5, 0, 1));
            arrDE.draw(P.clamp((t - 7.0) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '짧게 여러 번, 마지막만 크게', dur: 13,
      captions: [
        { t: 0, text: '짧게 여러 번 시도해서 마음에 드는 걸 고르세요.' },
        { t: 5, text: '<em>최종 한 편만</em> 고화질로 만들면 크레딧을 아낄 수 있어요.' },
        { t: 9.5, text: '길이·해상도 제한은 <em>연산량과 메모리</em>의 한계예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const steps = ['짧게 여러 번 시도', '마음에 드는 것 고르기', '최종 1편만 고화질로'].map((label, i) => {
          const box = P.box({ x: 430 + i * 270, y: 140, w: 250, h: 130, label, accent: i === 2 ? 'orange' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .6, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680 + i * 270, y1: 205, x2: 700 + i * 270, y2: 205, width: 4, color: '#1B1F24' }));
        const chips = ['해상도', '길이', '프레임률'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 430 + i * 170, y: 320, text: c, color: i % 2 ? 'orange' : 'aqua', size: 22 }).el), 2.4 + i * .3, { from: 'pop' }));
        const final = P.text({ x: 430, y: 420, w: 790, text: '<em>짧게 여러 번</em> 시도하고,<br>마음에 드는 걸 골라 <i>최종 한 편만</i> 크게 만들어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.4, { from: 'up' });
        const last = P.text({ x: 430, y: 570, w: 790, text: '길이·해상도 제한은 연산량과 메모리의 한계예요.', size: 28, weight: 800, color: '#B3520F' });
        tl.at(stage.appendChild(last.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .6 && t < 5.4));
          }
        };
      }
    }
  ],

  interaction: {
    title: '연산량 비교기',
    desc: '해상도·길이·초당 프레임 수를 바꿔서 <b>이미지 1장(1024×1024)을 1로 뒀을 때 지금 설정한 영상이 몇 배</b>인지 견줘 봐요. 상대 연산량 = (가로×세로 픽셀 수) × (길이×프레임률)로 어림잡은 값이에요. <b>실제 요금·시간이 아니라 프레임 수 기반의 대략적인 비교</b>예요.',
    mount(el, P) {
      const RES = [512, 768, 1024, 1536, 2048];
      const FPS = [8, 12, 24, 30];
      const BASE_RES = 1024;

      const resRange = P.h('input', { type: 'range', id: 'sim-res', min: '0', max: String(RES.length - 1), step: '1', value: '2', 'aria-label': '해상도' });
      const resOut = P.h('output', { for: 'sim-res' }, `${RES[2]}×${RES[2]}`);
      const lenRange = P.h('input', { type: 'range', id: 'sim-len', min: '1', max: '10', step: '1', value: '3', 'aria-label': '길이(초)' });
      const lenOut = P.h('output', { for: 'sim-len' }, '3초');
      const fpsRange = P.h('input', { type: 'range', id: 'sim-fps', min: '0', max: String(FPS.length - 1), step: '1', value: '2', 'aria-label': '초당 프레임 수' });
      const fpsOut = P.h('output', { for: 'sim-fps' }, `${FPS[2]}fps`);
      const latentBox = P.h('input', { type: 'checkbox', id: 'sim-latent' });

      const row = (labelEl, input, out) => P.h('div', { class: 'sim-row' }, labelEl, input, out);
      const controls = P.h('div', { class: 'sim-controls' },
        row(P.h('label', { for: 'sim-res' }, '해상도'), resRange, resOut),
        row(P.h('label', { for: 'sim-len' }, '길이'), lenRange, lenOut),
        row(P.h('label', { for: 'sim-fps' }, '초당 프레임 수'), fpsRange, fpsOut),
        P.h('label', { class: 'sim-check', for: 'sim-latent' }, latentBox, ' 잠재 공간에서 계산(LDM) — 켜면 1/8 배수로 줄어들어요. 흔히 쓰는 VAE 압축 비율이에요.')
      );

      const barImg = P.h('div', { class: 'fill img', style: 'width:0%' });
      const barVid = P.h('div', { class: 'fill vid', style: 'width:0%' });
      const numImg = P.h('span', { class: 'sim-num' }, '1배');
      const numVid = P.h('span', { class: 'sim-num' }, '');
      const bars = P.h('div', { class: 'sim-bars' },
        P.h('div', { class: 'sim-barrow' }, P.h('div', { class: 'sim-barlabel' }, '이미지 1장(1024×1024)'), P.h('div', { class: 'track' }, barImg), numImg),
        P.h('div', { class: 'sim-barrow' }, P.h('div', { class: 'sim-barlabel' }, '지금 설정 영상'), P.h('div', { class: 'track' }, barVid), numVid)
      );
      const note = P.h('p', { class: 'sim-note' }, '프레임 수 기반의 대략적인 비교예요. 실제 요금·처리 시간과는 달라요.');

      const wrap = P.h('div', { class: 'sim-wrap' }, controls, bars, note);
      const style = P.h('style', { html: `
        .sim-wrap{max-width:100%}
        .sim-controls{display:flex;flex-direction:column;gap:12px}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;font-size:14px}
        .sim-row label{min-width:110px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 140px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:70px;text-align:right}
        .sim-check{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;font-weight:600;line-height:1.4;cursor:pointer}
        .sim-check input{margin-top:3px;flex:none}
        .sim-bars{margin-top:18px;display:flex;flex-direction:column;gap:14px}
        .sim-barrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-barlabel{flex:0 0 190px;font-size:13.5px;font-weight:700}
        .sim-barrow .track{flex:1 1 140px;min-width:100px;max-width:100%;height:28px;background:#E4E8EC;border-radius:8px;overflow:hidden}
        .sim-barrow .fill{height:100%;border-radius:8px;transition:width .2s}
        .sim-barrow .fill.img{background:#2BB3C9}
        .sim-barrow .fill.vid{background:#F2812D}
        .sim-num{flex:0 0 auto;font-family:var(--mono);font-weight:800;min-width:60px;text-align:right}
        .sim-note{font-size:12.5px;color:var(--muted);margin-top:10px}
      ` });
      el.append(wrap, style);

      const fmtMult = x => x >= 100 ? `${Math.round(x)}배` : x >= 10 ? `${x.toFixed(1)}배` : `${x.toFixed(2)}배`;
      const barPct = x => P.clamp(15 + 20 * Math.log10(Math.max(x, 0.001)), 4, 100);

      function update() {
        const resIdx = +resRange.value, lenVal = +lenRange.value, fpsIdx = +fpsRange.value, latent = latentBox.checked;
        const res = RES[resIdx], fps = FPS[fpsIdx];
        resOut.textContent = `${res}×${res}`;
        lenOut.textContent = `${lenVal}초`;
        fpsOut.textContent = `${fps}fps`;
        let mult = (res * res) / (BASE_RES * BASE_RES) * (lenVal * fps);
        if (latent) mult /= 8;
        barImg.style.width = `${barPct(1)}%`;
        barVid.style.width = `${barPct(mult)}%`;
        numImg.textContent = '1배';
        numVid.textContent = fmtMult(mult);
      }
      [resRange, lenRange, fpsRange].forEach(r => r.addEventListener('input', update));
      latentBox.addEventListener('change', update);
      update();
    }
  },

  teacherLines: [
    '영상은 이미지 한 장이 아니라 <b>초당 수십 장</b>을 이어 붙인 거예요.',
    '게다가 장면 사이가 <b>자연스럽게 이어지도록</b>까지 계산해야 해서 비용이 훨씬 커요.'
  ],
  tip: {
    body: '영상 생성은 이미지보다 크레딧이 많이 드는 게 보통이에요(프레임 수 × 해상도 × 단계 수만큼 연산이 늘어요). 짧게 여러 번 나눠 만들고 마음에 드는 것만 이어 붙이는 방식이 비용을 아끼는 데 도움이 돼요.',
    extra: '해상도·길이를 낮춰 먼저 시험해 보고, 마음에 드는 설정을 찾은 뒤에만 최종본을 고화질로 만들면 크레딧을 아낄 수 있어요.'
  },
  myth: {
    myth: '영상도 이미지 생성기를 한 번 더 돌리는 정도다.',
    fact: '영상은 프레임 수만큼 그림을 그리고, 그 사이의 움직임(시간 축)까지 자연스럽게 이어지도록 계산해요. 연산량이 이미지 한 장보다 훨씬 많이 늘어나요(잠재 공간 압축을 써도 프레임 수만큼은 줄지 않아요).'
  },
  sources: [
    { title: 'Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets (arXiv, 2023)', url: 'https://arxiv.org/abs/2311.15127', note: '영상 생성이 프레임과 시간 축을 함께 다뤄야 하는 이유를 보여주는 연구.' },
    { title: 'High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)', url: 'https://arxiv.org/abs/2112.10752', note: '원본 화면 대신 압축된 잠재 공간에서 계산해 비용을 줄이는 방법(Stable Diffusion의 바탕).' }
  ],
  script: `이미지 한 장 만들 때랑 영상 몇 초 만들 때, 크레딧 차이를 보고 놀란 적 있으시죠. 영상은 이미지 한 장이 아니라 초당 수십 장의 그림을 이어 붙인 거예요. 그것만 해도 연산량이 훨씬 늘어나요.

거기다 영상은 장면과 장면 사이가 자연스럽게 이어져야 해요. 사람이 움직이는데 갑자기 옷이 바뀌면 어색하잖아요. 그래서 시간 축까지 함께 계산하는 모델(Stable Video Diffusion 같은 연구)을 써요. 계산량이 이미지보다 수십 배 이상 늘어날 수 있어요.

도구들은 비용을 줄이려고 원본 화면 그대로가 아니라 압축된 '잠재 공간'에서 계산해요. 그래도 영상은 이미지보다 비싸고, 만들 수 있는 길이에도 제한이 있어요. 비용은 프레임 수와 해상도에 비례하니, 짧고 작게 여러 번 시도해 보는 게 좋아요.`
};
