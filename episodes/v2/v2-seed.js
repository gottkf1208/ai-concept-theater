/* V2 S2-1 [시즌 2] 같은 프롬프트인데 왜 다른 영상이 나올까: 시드와 확산 모델 */
export default {
  slug: 'v2-seed',
  track: 'S2',
  title: '같은 프롬프트인데 왜 다른 영상이 나올까',
  subtitle: '시드와 확산 모델',
  summary: '같은 프롬프트를 두 번 넣었는데 영상이 다르게 나온 이유를 "첫 잡음"으로 풀어요. 시드는 첫 잡음을 정하는 번호예요. 시드를 고정해도 완전히 같지는 않은 이유와 무엇을 적어 둬야 하는지도 짚어요.',
  keywords: ['시드', '초기 잡음', '확산 모델', '흐름 매칭', '재현성', '결정성', '샘플링'],

  scenes: [
    {
      title: '똑같이 말했는데 왜 다를까', dur: 13,
      captions: [
        { t: 0, text: '"쿼카가 우산 쓰고 걷는 영상 만들어 줘"를 <em>똑같이</em> 두 번 넣었어요.' },
        { t: 5, text: '결과 1은 비 오는 밤거리, 결과 2는 맑은 낮거리로 나왔어요.' },
        { t: 9.5, text: '똑같이 말했는데, 왜 다른 영상이 나올까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 310, size: 340, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 130, w: 460, text: '쿼카가 우산 쓰고 걷는 영상 만들어 줘.', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const box1 = P.box({ x: 830, y: 120, w: 380, h: 170, label: '결과 1', sub: '비 오는 밤거리', accent: 'aqua', icon: P.ICON.video });
        const box2 = P.box({ x: 830, y: 320, w: 380, h: 170, label: '결과 2', sub: '맑은 낮거리', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(box1.el), 1.6, { from: 'right' });
        tl.at(stage.appendChild(box2.el), 2.4, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 560, y1: 220, x2: 830, y2: 205, curve: -20, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 560, y1: 250, x2: 830, y2: 405, curve: 20, width: 4, color: '#F2812D' });
        const chip = P.chip({ x: 830, y: 510, text: '같은 프롬프트인데 달라요', color: 'ink', size: 20 });
        tl.at(stage.appendChild(chip.el), 6.6, { from: 'pop' });
        const note = P.text({ x: 300, y: 570, w: 910, text: '똑같이 말했는데, 왜 <em>다른 영상</em>이 나올까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            a1.draw(P.clamp((t - 1.8) / .7, 0, 1));
            a2.draw(P.clamp((t - 2.6) / .7, 0, 1));
            box1.on(t > 1.6); box2.on(t > 2.4);
          }
        };
      }
    },
    {
      title: '출발점은 잡음이에요', dur: 14,
      captions: [
        { t: 0, text: '이미지·영상 모델은 <em>무작위 잡음</em>(초기 잡음 텐서)에서 출발해 여러 단계에 걸쳐 잡음을 걷어 내요.' },
        { t: 5.5, text: '<em>시드</em>는 그 첫 잡음을 만드는 번호예요. 번호가 다르면 출발점이 달라요.' },
        { t: 10.5, text: '2024년 이후 많이 쓰는 흐름 매칭 방식도 출발점은 잡음이라 원리는 같아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const seedBox = P.box({ x: 70, y: 150, w: 240, h: 120, label: '시드 82', sub: '첫 잡음의 시작 번호', accent: 'ink', icon: P.ICON.dice });
        tl.at(stage.appendChild(seedBox.el), .3, { from: 'left' });
        const noiseEl = P.noise({ x: 460, y: 110, w: 340, h: 340, seed: 82 });
        tl.at(stage.appendChild(noiseEl.el), 1.4, { from: 'pop' });
        const arr = P.arrow(lines, { x1: 320, y1: 210, x2: 460, y2: 250, width: 4, color: '#1B1F24' });
        const img = new Image(); img.src = P.charSrc('base');
        img.addEventListener('load', () => noiseEl.source(img), { once: true });
        if (img.complete && img.naturalWidth) noiseEl.source(img);
        const label = P.text({ x: 460, y: 470, w: 340, text: '잡음이 줄면서 그림이 드러나요.', size: 20, weight: 600, align: 'center' });
        tl.at(stage.appendChild(label.el), 5.9, { from: 'up' });
        const scopeChip = P.chip({ x: 850, y: 150, text: '흐름 매칭 방식도 원리는 같아요', color: 'gray', size: 18 });
        tl.at(stage.appendChild(scopeChip.el), 10.7, { from: 'pop' });
        const q = P.quokka({ x: 60, y: 400, size: 240, pose: 'dice' });
        tl.at(stage.appendChild(q.el), .2, { from: 'up' });
        const diffText = P.text({ x: 260, y: 540, w: 760, text: '시드가 다르면 첫 잡음도, 결과도 달라져요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(diffText.el), 11.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arr.draw(P.clamp((t - .8) / .5, 0, 1));
            const lvl = 1 - P.easeOut(P.clamp((t - .8) / 8, 0, 1)) * 0.94;
            noiseEl.set(lvl);
          }
        };
      }
    },
    {
      title: '같은 시드면 같은 길', dur: 13,
      captions: [
        { t: 0, text: '프롬프트·시드·모델·설정이 같으면 <em>같은 잡음</em>에서 같은 길을 걸어요.' },
        { t: 5, text: '시드 42로 두 번 만들면 거의 같은 결과, 시드 43 하나만 바꾸면 다른 결과가 나와요.' },
        { t: 9.5, text: '그래서 시드를 적어 두면 <em>거의 같은 결과</em>를 다시 만들 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const cards = [
          ['시드 42', '첫 번째'], ['시드 42', '두 번째 · 같은 결과'], ['시드 43', '다른 결과']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 360 + i * 300, y: 110, w: 270, h: 140, label, sub, accent: i === 2 ? 'orange' : 'aqua', icon: i === 2 ? P.ICON.x : P.ICON.check });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const eq = P.chip({ x: 360, y: 300, text: '시드 42 = 시드 42 → 같은 길', color: 'aqua', size: 20 });
        const neq = P.chip({ x: 360, y: 364, text: '시드 42 ≠ 시드 43 → 다른 길', color: 'orange', size: 20 });
        tl.at(stage.appendChild(eq.el), 3.4, { from: 'pop' });
        tl.at(stage.appendChild(neq.el), 4.2, { from: 'pop' });
        const final = P.text({ x: 360, y: 450, w: 870, text: '시드를 적어 두면 <em>거의 같은 결과</em>를 다시 만들 수 있어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            cards.forEach((c, i) => c.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '그래도 완전히 같진 않아요', dur: 13,
      captions: [
        { t: 0, text: '같은 시드라도 계산하는 <em>칩이나 버전</em>이 바뀌면 숫자가 아주 조금 달라져요.' },
        { t: 5, text: 'CPU와 GPU의 난수 발생기가 다르고, 그 차이가 단계마다 쌓여요.' },
        { t: 9.5, text: '공식 영상 API 문서도 시드는 결정성을 "약간 높여 줄 뿐"이라고 적어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 350, size: 290, pose: 'think' });
        stage.append(q.el);
        const cards = [
          ['CPU와 GPU가 달라요', '난수 발생기 자체가 달라요'],
          ['버전·계산 순서 차이', '숫자가 아주 조금 달라져요'],
          ['공식 문서의 말', '시드는 결정성을 "약간 높일 뿐"']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 100 + Math.floor(i / 2) * 170, w: 380, h: 140, label, sub, accent: i === 2 ? 'orange' : '' });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 460, w: 790, text: '차이가 단계마다 쌓여서 <em>완전히 같다는 보장은 없어요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.4);
            cards.forEach((c, i) => c.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: '적어 두고, 여러 번 만들어 고르기', dur: 12,
      captions: [
        { t: 0, text: '마음에 든 결과가 나오면 <em>설정을 기록</em>해 두세요.' },
        { t: 4.5, text: '프롬프트·시드·모델·비율을 함께 적으면 거의 같은 결과를 다시 만들 수 있어요.' },
        { t: 8.5, text: '다르게 나오는 건 고장이 아니라 <em>출발점이 달라서</em>예요. 그중에서 잘 고르는 게 우리 몫이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const chips = ['프롬프트', '시드', '모델', '비율'].map((c, i) => {
          const chip = P.chip({ x: 430 + i * 170, y: 160, text: c, color: i % 2 ? 'orange' : 'aqua', size: 22 });
          tl.at(stage.appendChild(chip.el), .3 + i * .4, { from: 'pop' });
          return chip;
        });
        const step = P.box({ x: 430, y: 260, w: 790, h: 110, label: '두세 번 만들고, 마음에 드는 것 고르기', accent: 'ink' });
        tl.at(stage.appendChild(step.el), 2.4, { from: 'up' });
        const final = P.text({ x: 430, y: 420, w: 790, text: '다르게 나오는 건 고장이 아니라 <em>출발점이 달라서</em>예요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        const last = P.text({ x: 430, y: 480, w: 790, text: '그중에서 잘 고르는 게 우리 몫이에요.', size: 28, weight: 800, color: '#F2812D' });
        tl.at(stage.appendChild(last.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            step.on(t > 2.4);
          }
        };
      }
    }
  ],

  interaction: {
    title: '시드 고정 실험실',
    desc: '왼쪽은 <b>시드</b>로 그리는 쿼카 풍경이에요. 같은 시드면 늘 같은 장면이 나와요. "같은 시드로 한 번 더"를 누르면 오른쪽에 같은 그림이 다시 그려져요. "다른 칩에서 계산한 셈 치기"를 켜면 계산 환경이 바뀌었을 때처럼 아주 작은 차이가 생겨요.',
    mount(el, P) {
      let seed = 42;
      const img = new Image();
      let imgReady = false;
      img.addEventListener('load', () => { imgReady = true; drawLeft(); });
      img.src = P.charSrc('base');
      if (img.complete && img.naturalWidth) imgReady = true;

      const left = P.h('canvas', { class: 'sim-canvas', width: '480', height: '300' });
      const right = P.h('canvas', { class: 'sim-canvas', width: '480', height: '300' });
      const seedOut = P.h('output', {}, String(seed));
      const seedRange = P.h('input', { type: 'range', id: 'sim-seed', min: '0', max: '99', value: String(seed), 'aria-label': '시드' });
      const seedRow = P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-seed' }, '시드 ', seedOut), seedRange);
      const diffBtn = P.h('button', { class: 'btn', type: 'button' }, '시드 바꾸기');
      const colA = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '① 시드로 그리는 쿼카 풍경'),
        left, seedRow,
        P.h('div', { class: 'sim-actions' }, diffBtn)
      );

      const sameBtn = P.h('button', { class: 'btn primary', type: 'button' }, '같은 시드로 한 번 더');
      const matchOut = P.h('div', { class: 'sim-match' }, '아직 만들지 않았어요');
      const diffChk = P.h('input', { type: 'checkbox', id: 'sim-diffchip' });
      const diffLab = P.h('label', { for: 'sim-diffchip', class: 'sim-chk' }, diffChk, ' 다른 칩에서 계산한 셈 치기');
      const note = P.h('p', { class: 'muted sim-note' }, '같은 시드라도 계산 환경이 바뀌면 아주 조금 달라질 수 있어요.');
      const colB = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '② 같은 시드로 다시 만들기'),
        right,
        P.h('div', { class: 'sim-actions' }, sameBtn),
        diffLab, matchOut, note
      );

      const wrap = P.h('div', { class: 'sim-wrap' }, colA, colB);
      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:24px;max-width:100%}
        .sim-col{flex:1 1 300px;min-width:0;max-width:100%}
        .sim-col h4{font-size:16px;margin:0 0 8px}
        .sim-canvas{width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:14px;background:#EAF7FA}
        .sim-row{display:flex;align-items:center;gap:10px;margin-top:12px;font-weight:700;font-size:13.5px;flex-wrap:wrap}
        .sim-row label{display:flex;align-items:center;gap:6px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 120px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:28px;display:inline-block}
        .sim-actions{margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-chk{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13.5px;font-weight:600}
        .sim-match{margin-top:10px;font-weight:800;font-family:var(--mono);color:#127E90}
        .sim-note{font-size:12px;margin-top:8px}
      ` });
      el.append(wrap, style);

      const ctxL = left.getContext('2d');
      const ctxR = right.getContext('2d');
      const W = 480, H = 300;
      function scene(ctx, s, offset) {
        const r = P.rng(s);
        const day = r() < 0.65;
        ctx.fillStyle = day ? '#EAF7FA' : '#1B1F24';
        ctx.fillRect(0, 0, W, H);
        const ox = offset || 0;
        const sx = 50 + r() * (W - 100) + ox, sy = 32 + r() * 34;
        ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2);
        ctx.fillStyle = day ? '#F2812D' : '#9AA5AF'; ctx.fill();
        const baseY = H * 0.66;
        const hillCount = 2 + Math.floor(r() * 3);
        for (let i = 0; i < hillCount; i++) {
          const hx = (W / hillCount) * i + r() * 50 + ox;
          const hw = 120 + r() * 100, hh = 32 + r() * 54;
          ctx.beginPath();
          ctx.ellipse(hx, baseY + hh * .4, hw, hh, 0, 0, Math.PI * 2);
          ctx.globalAlpha = .85;
          ctx.fillStyle = i % 2 ? '#6B4A2E' : '#127E90';
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = '#EDEFE7';
        ctx.fillRect(0, baseY, W, H - baseY);
        const treeCount = 3 + Math.floor(r() * 4);
        for (let i = 0; i < treeCount; i++) {
          const tx = r() * W + ox, ty = baseY + r() * (H - baseY - 18);
          ctx.fillStyle = '#6B4A2E'; ctx.fillRect(tx - 2, ty - 14, 4, 14);
          ctx.beginPath(); ctx.arc(tx, ty - 18, 11, 0, Math.PI * 2);
          ctx.fillStyle = '#127E90'; ctx.fill();
        }
        const qw = 48 + r() * 38, qh = qw / 0.66;
        const qx = 16 + r() * (W - qw - 32) + ox, qy = H - qh - 4;
        if (imgReady) ctx.drawImage(img, qx, qy, qw, qh);
      }
      function drawLeft() { scene(ctxL, seed, 0); }
      function drawRight(made) {
        if (!made) { ctxR.fillStyle = '#F5F6F2'; ctxR.fillRect(0, 0, W, H); return; }
        const off = diffChk.checked ? (P.rng(seed * 7 + 3)() * 2 - 1) * 2 : 0;
        scene(ctxR, seed, off);
      }
      let madeOnce = false;
      function render() {
        seedOut.textContent = String(seed);
        seedRange.value = String(seed);
        drawLeft();
        drawRight(madeOnce);
        matchOut.textContent = madeOnce ? (diffChk.checked ? '일치 97%' : '일치 100%') : '아직 만들지 않았어요';
      }
      seedRange.addEventListener('input', () => { seed = +seedRange.value; madeOnce = false; render(); });
      diffBtn.addEventListener('click', () => { seed = (seed * 13 + 7) % 100; madeOnce = false; render(); });
      sameBtn.addEventListener('click', () => { madeOnce = true; render(); });
      diffChk.addEventListener('change', () => { render(); });
      render();
    }
  },

  teacherLines: [
    'AI 그림·영상은 <b>무작위 잡음</b>에서 출발해요. 시드는 그 출발점을 정하는 번호예요.',
    '같은 말을 해도 매번 다른 건 고장이 아니에요. <b>출발점이 달라서</b>예요.'
  ],
  tip: {
    body: '마음에 드는 결과가 나오면 <b>프롬프트·시드·모델·비율</b>을 함께 적어 두세요. 같은 시드로 다시 만들면 거의 같은 결과가 나와요.',
    extra: '시드 칸이 안 보이는 화면에서는 같은 프롬프트로 서너 번 만들어 고르는 게 시드를 고르는 것과 같은 일이에요. 시드를 적어 둬도 모델 버전이 바뀌면 결과가 달라질 수 있으니 버전도 함께 적어요.'
  },
  myth: {
    myth: '시드만 같으면 언제 어디서나 똑같은 그림이 나온다.',
    fact: '시드는 첫 잡음을 정할 뿐이에요. 계산하는 칩(CPU·GPU), 라이브러리 버전이 바뀌면 아주 작은 차이가 단계마다 쌓여 결과가 달라질 수 있어요. 공식 영상 API 문서도 시드가 결정성을 "약간 높여 줄 뿐"이라고 적어요.'
  },
  sources: [
    { title: 'Denoising Diffusion Probabilistic Models (arXiv, 2020)', url: 'https://arxiv.org/abs/2006.11239', note: '잡음에서 출발해 단계별로 걷어 내는 확산 모델의 기본 원리를 제시한 논문이에요.' },
    { title: 'Diffusers — Reproducibility (reusing seeds)', url: 'https://huggingface.co/docs/diffusers/using-diffusers/reusing_seeds', note: '첫 잡음 텐서와 Generator 시드, CPU·GPU 난수 발생기 차이, "같은 시드로도 보장되지 않음"을 밝혀요.' },
    { title: 'PyTorch — Reproducibility', url: 'https://docs.pytorch.org/docs/2.14/notes/randomness.html', note: '릴리스·플랫폼·CPU/GPU가 다르면 같은 시드라도 완전한 재현은 보장되지 않는다고 적어요.' },
    { title: 'Gemini API — Generate videos with Veo 3.1', url: 'https://ai.google.dev/gemini-api/docs/veo', note: '영상 모델의 seed 파라미터는 결정성을 "약간 높일 뿐" 보장하지 않는다고 밝혀요.' }
  ],
  script: `"쿼카가 우산 쓰고 걷는 영상 만들어 줘"를 똑같이 두 번 넣었는데, 결과 1은 비 오는 밤거리였고 결과 2는 맑은 낮거리로 나왔어요. 똑같이 말했는데 왜 다른 영상이 나올까요.

이미지·영상 모델은 무작위 잡음, 정확히는 초기 잡음 텐서에서 출발해 여러 단계에 걸쳐 잡음을 걷어 내요. 시드는 그 첫 잡음을 만드는 난수 발생기의 시작 번호예요. 시드가 다르면 출발점이 달라서 같은 프롬프트라도 다른 영상이 나와요. 2024년 이후 주류가 된 흐름 매칭 방식도 출발점은 잡음이라 원리는 같아요. 프롬프트·시드·모델·설정이 같으면 같은 잡음에서 같은 길을 걸으니, 시드를 적어 두면 거의 같은 결과를 다시 만들 수 있어요.

그래도 완전히 같다는 보장은 없어요. 같은 시드라도 계산하는 CPU와 GPU의 난수 발생기가 다르고, 라이브러리 버전이나 계산 순서가 바뀌면 숫자가 아주 조금 달라지는데, 그 차이가 단계마다 쌓여요. 공식 영상 API 문서도 시드는 결정성을 보장하지 않고 "약간 높여 줄 뿐"이라고 적어요.

그러니 마음에 든 결과가 나오면 프롬프트·시드·모델·비율을 함께 기록해 두고, 두세 번 만들어서 고르세요. 다르게 나오는 건 고장이 아니라 출발점이 달라서예요. 그중에서 잘 고르는 게 우리 몫이에요.`
};
