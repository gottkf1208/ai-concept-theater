/* V2 S2-4 [시즌 2] 캐릭터 얼굴은 왜 장면마다 바뀔까: 일관성과 레퍼런스 이미지 */
export default {
  slug: 'v2-consistency',
  track: 'S2',
  title: '캐릭터 얼굴은 왜 장면마다 바뀔까',
  subtitle: '일관성과 레퍼런스 이미지',
  summary: '영상 속 인물이 장면마다 다른 사람처럼 보였던 이유와, 레퍼런스 이미지로 얼굴을 붙잡아 두는 원리를 짚어요. 2026년 영상 모델이 얼굴에 이어 목소리까지 붙잡기 시작한 흐름도 다뤄요.',
  keywords: ['일관성', '레퍼런스 이미지', '캐릭터 고정', 'IP-Adapter', 'DreamBooth', '교차 어텐션', '멀티샷', '목소리 일관성'],

  scenes: [
    {
      title: '장면마다 달라진 얼굴', dur: 13,
      captions: [
        { t: 0, text: '영상 속 인물이 장면마다 <em>다른 사람처럼</em> 보였어요.' },
        { t: 5, text: '귀 크기도 털색도 장면마다 조금씩 달랐죠.' },
        { t: 9.5, text: '같은 인물을 그려 달라고 했는데, 왜 이럴까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 120, w: 440, text: '이 인물, 계속 <b>같은 사람</b> 맞아?', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const labels = [['장면 1', '둥근 얼굴 · 짧은 털'], ['장면 2', '갸름한 얼굴 · 긴 털'], ['장면 3', '동그란 눈 · 짧은 귀']];
        const cards = labels.map(([label, sub], i) => {
          const box = P.box({ x: 470 + i * 260, y: 300, w: 230, h: 150, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : '') });
          tl.at(stage.appendChild(box.el), 1.6 + i * .9, { from: 'up' });
          return box;
        });
        const note = P.text({ x: 470, y: 480, w: 740, text: '<em>같은 인물</em>을 그려 달라고 했는데, 세부가 자꾸 달라져요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            cards.forEach((c, i) => c.on(t > 1.6 + i * .9));
          }
        };
      }
    },
    {
      title: '왜 자꾸 달라질까', dur: 14,
      captions: [
        { t: 0, text: 'AI가 <em>장면마다 새로</em> 그려서 그래요.' },
        { t: 5.5, text: '장면마다 <em>새 시드</em>에서 출발하니, 같은 설명이라도 세부가 달라져요.' },
        { t: 10, text: '똑같은 프롬프트를 넣어도 얼굴은 매번 새로 뽑혀요.' }
      ],
      build({ stage, lines, P, tl }) {
        const prompt = P.box({ x: 60, y: 260, w: 300, h: 140, label: '설명(프롬프트)', sub: '"갈색 털 쿼카, 둥근 안경"', accent: 'ink' });
        tl.at(stage.appendChild(prompt.el), .2, { from: 'left' });
        const q = P.quokka({ x: 40, y: 430, size: 220, pose: 'think' });
        tl.at(stage.appendChild(q.el), .2, { from: 'up' });
        const rows = [['시드 12', '귀 큼 · 털색 진함'], ['시드 47', '귀 작음 · 털색 연함'], ['시드 83', '안경 두꺼움 · 눈 큼']];
        const cards = rows.map(([label, sub], i) => {
          const box = P.box({ x: 470 + i * 260, y: 140, w: 230, h: 150, label, sub, accent: 'aqua' });
          tl.at(stage.appendChild(box.el), 1.6 + i * 1.6, { from: 'pop' });
          return box;
        });
        const arr = P.arrow(lines, { x1: 360, y1: 300, x2: 470, y2: 250, curve: -20, width: 4, color: '#127E90' });
        const final = P.text({ x: 430, y: 460, w: 760, text: '설명은 <em>같아도</em>, 시드가 다르니 세부는 <i>매번 달라져요</i>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > .3 && t < 5.5);
            arr.draw(P.clamp((t - .9) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '레퍼런스 이미지 넣기', dur: 14,
      captions: [
        { t: 0, text: '글자 대신 <em>그림으로 조건</em>을 주면 모델이 그 그림의 특징을 붙잡아 둬요.' },
        { t: 5, text: '이런 방식을 연구에서는 <em>IP-Adapter</em>, <em>DreamBooth</em> 같은 이름으로 불러요.' },
        { t: 9.5, text: '사진 몇 장만으로 같은 얼굴을 여러 장면에 유지하는 기술이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 320, size: 320, pose: 'tablet' });
        stage.append(q.el);
        const left = P.box({ x: 400, y: 120, w: 330, h: 170, label: '설명만 있을 때', sub: '매번 다른 얼굴', accent: 'orange' });
        const right = P.box({ x: 760, y: 120, w: 330, h: 170, label: '레퍼런스 이미지가 있을 때', sub: '같은 얼굴 유지', accent: 'aqua' });
        tl.at(stage.appendChild(left.el), .3, { from: 'up' });
        tl.at(stage.appendChild(right.el), 1.4, { from: 'up' });
        const arr = P.arrow(lines, { x1: 730, y1: 205, x2: 760, y2: 205, width: 4, color: '#1B1F24' });
        const chip = P.chip({ x: 400, y: 340, text: 'IP-Adapter · DreamBooth', color: 'gray', size: 22 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const final = P.text({ x: 400, y: 400, w: 700, text: '사진 <em>몇 장</em>으로 같은 인물을 여러 장면에 유지하는 방법이에요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.6);
            arr.draw(P.clamp((t - 1.6) / .5, 0, 1));
            left.on(t > .3); right.on(t > 1.4);
          }
        };
      }
    },
    {
      title: '레퍼런스는 어디로 들어갈까', dur: 13,
      captions: [
        { t: 0, text: '레퍼런스 이미지는 글과 <em>다른 통로</em>로 들어가요. 글은 "무엇을", 사진은 "어떻게 생겼는지"를 전해요.' },
        { t: 5, text: '2026년 영상 연구는 여러 샷에 걸쳐 <em>얼굴과 목소리</em>를 같은 인물에 묶어 두려고 해요.' },
        { t: 9.5, text: '그래도 완벽하진 않아서 장면마다 <i>같은 정면 사진</i>을 다시 넣는 게 가장 확실해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 260, pose: 'tablet' });
        stage.append(q.el);
        const prompt = P.box({ x: 360, y: 90, w: 300, h: 130, label: '프롬프트', sub: '"무엇을" 그릴지', accent: 'ink', icon: P.ICON.doc });
        const ref = P.box({ x: 360, y: 260, w: 300, h: 130, label: '레퍼런스 사진', sub: '"어떻게 생겼는지"', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(prompt.el), .3, { from: 'left' });
        tl.at(stage.appendChild(ref.el), 1.2, { from: 'left' });
        const model = P.box({ x: 800, y: 170, w: 280, h: 140, label: '모델', sub: '교차 어텐션으로 결합', accent: 'orange', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), 2.4, { from: 'pop' });
        const arr1 = P.arrow(lines, { x1: 660, y1: 150, x2: 800, y2: 215, curve: -10, width: 4, color: '#1B1F24' });
        const arr2 = P.arrow(lines, { x1: 660, y1: 320, x2: 800, y2: 265, curve: 10, width: 4, color: '#127E90' });
        const lab1 = P.chip({ x: 680, y: 118, text: '글 통로', color: 'ink', size: 18 });
        const lab2 = P.chip({ x: 680, y: 345, text: '그림 통로', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(lab1.el), .9, { from: 'pop' });
        tl.at(stage.appendChild(lab2.el), 1.8, { from: 'pop' });
        const chip2026 = P.chip({ x: 800, y: 340, text: '2026: 얼굴 + 목소리', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip2026.el), 5.2, { from: 'pop' });
        const final = P.text({ x: 360, y: 430, w: 720, text: '완벽하진 않아서 장면마다 <i>같은 정면 사진</i>을 다시 넣는 게 가장 확실해요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            arr1.draw(P.clamp((t - .9) / .6, 0, 1));
            arr2.draw(P.clamp((t - 1.8) / .6, 0, 1));
            prompt.on(t > .3); ref.on(t > 1.2); model.on(t > 2.4);
          }
        };
      }
    },
    {
      title: '레퍼런스 이미지로 붙잡기', dur: 13,
      captions: [
        { t: 0, text: '<em>정면 레퍼런스 이미지 한 장</em>을 먼저 만들어 두세요.' },
        { t: 5, text: '그 사진을 장면마다 함께 넣어 주세요.' },
        { t: 9, text: '결과는 나란히 비교해 보면 좋아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const steps = ['① 레퍼런스 이미지 만들기', '② 장면마다 넣기', '③ 결과 비교하기'].map((label, i) => {
          const box = P.box({ x: 430 + i * 230, y: 150, w: 210, h: 140, label, accent: i === 2 ? 'aqua' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .7, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 640 + i * 230, y1: 220, x2: 660 + i * 230, y2: 220, width: 4, color: '#1B1F24' }));
        const final = P.text({ x: 430, y: 360, w: 700, text: 'AI가 그린 얼굴은 매번 달라질 수 있어요. <em>레퍼런스 이미지</em>로 붙잡아 두세요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.4, { from: 'up' });
        const last = P.text({ x: 430, y: 500, w: 700, text: '어느 쪽이 나은지는 나란히 놓고 봐야 보여요.', size: 26, weight: 700, color: '#B3520F' });
        tl.at(stage.appendChild(last.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .7)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .7));
          }
        };
      }
    }
  ],

  interaction: {
    title: '레퍼런스 켜고 끄기',
    desc: '아래 장면 카드 4장은 같은 캐릭터를 담고 있어요. 토글이 꺼져 있으면 장면마다 <b>시드</b>에 따라 색·크기·각도가 조금씩 달라져서 매번 다른 얼굴처럼 보여요. <b>레퍼런스 이미지 넣기</b>를 켜면 4장 모두 참조 이미지와 같은 모습이 돼요. "다른 시드로 다시"를 눌러 매번 얼마나 달라지는지 비교해 보세요.',
    mount(el, P) {
      const EARS = ['귀 작음', '귀 보통', '귀 큼'];
      const FUR = ['털색 연함', '털색 보통', '털색 진함'];
      let seed = 7, on = false;

      const cardEls = Array.from({ length: 4 }, (_, i) => {
        const img = P.h('img', { src: 'assets/char/base.webp', alt: `장면 ${i + 1}의 캐릭터`, draggable: 'false' });
        const frame = P.h('div', { class: 'sim-frame' }, img);
        const tag = P.h('div', { class: 'sim-tag' }, '');
        const card = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, `장면 ${i + 1}`), frame, tag);
        return { card, img, tag };
      });
      const cardsWrap = P.h('div', { class: 'sim-cards' }, ...cardEls.map(c => c.card));

      const toggleBtn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '레퍼런스 이미지 넣기');
      const reseedBtn = P.h('button', { class: 'btn', type: 'button' }, '다른 시드로 다시');
      const seedOut = P.h('span', { class: 'sim-seed' }, `시드 ${seed}`);
      const bar = P.h('div', { class: 'sim-bar' }, toggleBtn, reseedBtn, seedOut);

      el.append(P.h('div', { class: 'sim-wrap' }, bar, cardsWrap));
      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-seed{font-family:var(--mono);font-size:13px;color:var(--muted);margin-left:auto}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:14px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:10px;background:#fff;text-align:center}
        .sim-card-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px}
        .sim-frame{position:relative;aspect-ratio:3/4;border-radius:10px;background:var(--paper);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .sim-frame img{width:80%;height:80%;object-fit:contain;display:block;transition:filter .25s,transform .25s}
        .sim-tag{margin-top:8px;font-size:12px;color:var(--muted);word-break:keep-all;min-height:2.6em;line-height:1.3}
      ` });
      el.append(style);

      function render() {
        toggleBtn.textContent = on ? '레퍼런스 이미지 빼기' : '레퍼런스 이미지 넣기';
        toggleBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        seedOut.textContent = `시드 ${seed}`;
        cardEls.forEach((c, i) => {
          if (on) {
            c.img.style.filter = 'none';
            c.img.style.transform = 'none';
            c.tag.textContent = '참조와 동일';
          } else {
            const r = P.rng(seed * 97 + i * 31 + 1);
            const hue = Math.round((r() * 2 - 1) * 25);
            const sat = (0.8 + r() * 0.5).toFixed(2);
            const bri = (0.9 + r() * 0.2).toFixed(2);
            const scale = (0.85 + r() * 0.25).toFixed(2);
            const rot = Math.round((r() * 2 - 1) * 6);
            c.img.style.filter = `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bri})`;
            c.img.style.transform = `scale(${scale}) rotate(${rot}deg)`;
            const fur = FUR[Math.floor(r() * FUR.length)];
            const ear = EARS[Math.floor(r() * EARS.length)];
            c.tag.textContent = `${fur} · ${ear}`;
          }
        });
      }
      toggleBtn.addEventListener('click', () => { on = !on; render(); });
      reseedBtn.addEventListener('click', () => { seed = (seed * 13 + 7) % 97 + 1; render(); });
      render();
    }
  },

  teacherLines: [
    'AI는 장면마다 얼굴을 <b>새로</b> 그려요. 그래서 같은 설명이어도 다른 사람처럼 보일 수 있어요.',
    '얼굴을 붙잡고 싶으면 <b>레퍼런스 이미지</b>를 넣어 주세요. 오늘 여러분이 만져 본 방법이 바로 그거예요.'
  ],
  tip: {
    body: '정면이 잘 보이는 레퍼런스 사진 1~3장을 먼저 만들어 두고, <b>장면마다 같은 사진</b>을 넣어요. 한 영상 모델 공식 문서는 참조 이미지를 3장까지 받고, 그때 길이는 8초로 정해 둬요.',
    extra: '레퍼런스를 넣을 수 없는 화면이라면 인물 설명 문장(털색·옷·안경·소품)을 한 글자도 바꾸지 말고 장면마다 똑같이 붙여 넣어요. 조금은 덜 달라져요.'
  },
  myth: {
    myth: '설명(프롬프트)만 똑같이 쓰면 같은 얼굴이 나온다.',
    fact: '프롬프트가 같아도 장면마다 새 시드에서 다시 그리기 때문에 얼굴이 달라져요. 같은 얼굴을 유지하려면 레퍼런스 이미지처럼 <b>그림으로 된 추가 정보</b>가 필요해요.'
  },
  sources: [
    { title: 'IP-Adapter: Text Compatible Image Prompt Adapter for Text-to-Image Diffusion Models (arXiv, 2023)', url: 'https://arxiv.org/abs/2308.06721', note: '글·그림 교차 어텐션을 분리해 그림을 조건으로 넣는 작은 부품.' },
    { title: 'DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation (arXiv, 2022)', url: 'https://arxiv.org/abs/2208.12242', note: '사진 몇 장으로 대상을 고유 이름표에 묶는 미세조정.' },
    { title: 'FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space (arXiv, 2025)', url: 'https://arxiv.org/abs/2506.15742', note: '여러 번 편집해도 인물을 보존하는 방향.' },
    { title: 'MAVIN: Multi-Shot Audio-Visual Generation with Customized Narrative Control (arXiv, 2026)', url: 'https://arxiv.org/abs/2606.29473', note: '여러 샷에서 인물의 외모와 목소리를 함께 묶는 연구.' }
  ],
  script: `만든 영상에서 같은 인물인데 장면마다 얼굴이 조금씩 달랐어요. 귀 크기도 털색도 매번 바뀌었죠. 왜 이럴까요?

AI는 장면마다 새 시드에서 다시 그려요. 매번 다른 출발점에서 확률로 그림을 뽑다 보니, 같은 설명이라도 세부가 달라져요.

레퍼런스 이미지는 글과 다른 통로로 들어가요. 글은 "무엇을", 사진은 "어떻게 생겼는지"를 전하고, 모델은 이 둘을 교차 어텐션으로 합쳐요. IP-Adapter는 이 통로를 분리한 작은 부품이고, DreamBooth는 사진 몇 장으로 대상을 고유 이름표에 묶는 미세조정이에요.

2026년 영상 연구는 여러 샷에 걸쳐 얼굴과 목소리를 같은 인물에 묶어 두려 하지만, 공식 모델 카드도 완전한 일관성 유지를 한계로 적어요. 정면 레퍼런스 사진을 먼저 만들고 장면마다 같은 사진을 넣어, 결과를 나란히 비교해 보세요.`
};
