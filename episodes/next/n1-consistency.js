/* N1 [트랙 A] 캐릭터 얼굴이 장면마다 바뀌는 이유: 일관성과 레퍼런스 이미지 */
export default {
  slug: 'n1-consistency',
  track: 'A',
  title: '캐릭터 얼굴이 장면마다 바뀌는 이유',
  subtitle: '일관성과 레퍼런스 이미지',
  summary: '오늘 브루 영상 속 인물이 장면마다 다른 사람처럼 보였던 이유와, 레퍼런스 이미지로 얼굴을 붙잡아 두는 방법을 짚어봐요.',
  keywords: ['일관성', '레퍼런스 이미지', '캐릭터 고정', 'IP-Adapter', 'DreamBooth'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '오늘 브루 영상 속 인물이 장면마다 <em>다른 사람처럼</em> 보였어요.' },
        { t: 5, text: '귀 크기도, 털색도, 표정도 장면마다 조금씩 달랐죠.' },
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
        { t: 0, text: '이유는 간단해요. AI는 <em>장면마다 새로</em> 그려요.' },
        { t: 5.5, text: '지난번에 본 <em>시드</em>가 매번 바뀌니, 같은 설명이라도 세부가 달라져요.' },
        { t: 10, text: '똑같은 프롬프트를 넣어도, 얼굴은 매번 다시 뽑히는 거예요.' }
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
        { t: 0, text: '글자 대신 <em>그림으로 조건</em>을 주면, 모델이 그 그림의 특징을 붙잡아 둬요.' },
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
        const final = P.text({ x: 400, y: 400, w: 700, text: '사진 <em>몇 장</em>으로 같은 인물을 여러 장면에 유지하는 방법들이에요.', size: 24, weight: 700 });
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
      title: "도구의 '캐릭터 고정'", dur: 13,
      captions: [
        { t: 0, text: '요즘 영상 도구들에는 <em>캐릭터 고정</em> 기능이 있어요. 참조 이미지를 넣는 원리는 같아요.' },
        { t: 5, text: '다만 도구마다 <em>이름과 사용법</em>이 달라요. 정확도도 도구마다 달라요.' },
        { t: 9, text: '중요한 캐릭터라면 <i>내가 쓰는 도구</i>에서 먼저 한 번 테스트해 보세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const tools = ['AI 영상 도구 A', 'AI 영상 도구 B', 'AI 영상 도구 C'].map((label, i) => {
          const box = P.box({ x: 400 + i * 260, y: 150, w: 230, h: 170, label, sub: '캐릭터 고정 기능', accent: i === 0 ? 'aqua' : (i === 1 ? 'orange' : '') });
          tl.at(stage.appendChild(box.el), .4 + i * .8, { from: 'up' });
          return box;
        });
        const chip = P.chip({ x: 400, y: 360, text: '정확도는 도구마다 달라요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const final = P.text({ x: 400, y: 420, w: 720, text: '중요한 캐릭터는 <i>내 도구에서 먼저 테스트</i>해 보세요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 4.6 && t < 9);
            tools.forEach((tbox, i) => tbox.on(t > .4 + i * .8));
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 13,
      captions: [
        { t: 0, text: '그래서 할 일은 이거예요. <em>정면 레퍼런스 이미지 한 장</em>을 먼저 만들어요.' },
        { t: 5, text: '그 사진을 <em>장면마다 함께</em> 넣어 주세요.' },
        { t: 9, text: '그리고 결과를 <i>나란히 비교</i>해 보면 좋아요.' }
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
        const last = P.text({ x: 430, y: 500, w: 700, text: '결과를 비교해 보는 눈이 우리 실력이에요.', size: 26, weight: 700, color: '#B3520F' });
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
    desc: '아래 장면 카드 4장은 같은 캐릭터를 담고 있어요. 토글이 꺼져 있으면 장면마다 <b>시드 기반</b>으로 색·크기·각도가 조금씩 달라져서 매번 다른 얼굴처럼 보여요. <b>레퍼런스 이미지 넣기</b>를 켜면 4장 모두 참조 이미지 그대로 유지돼요. "다른 시드로 다시"를 눌러 매번 얼마나 달라지는지 비교해 보세요.',
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
    body: '도구마다 <b>캐릭터 고정</b> 또는 "레퍼런스 이미지" 기능 이름이 달라요. 정면 사진 1~3장을 넣고 같은 얼굴로 여러 장면을 만들어 보세요. 결과는 도구·설정마다 다르니 몇 번 다시 만들어 비교해 보는 게 좋아요.',
    extra: '레퍼런스 기능이 없는 도구라면, 같은 설명 문장을 최대한 자세히·똑같이 반복해서 쓰는 것만으로도 조금은 덜 달라져요.'
  },
  myth: {
    myth: '설명(프롬프트)만 똑같이 쓰면 같은 얼굴이 나온다.',
    fact: '프롬프트가 같아도 매번 새로 그리기 때문에 얼굴이 달라져요. 같은 얼굴을 유지하려면 레퍼런스 이미지나 캐릭터 고정 기능처럼 <b>추가 정보</b>가 필요해요.'
  },
  sources: [
    { title: 'IP-Adapter: Text Compatible Image Prompt Adapter (arXiv, 2023)', url: 'https://arxiv.org/abs/2308.06721', note: '이미지 한두 장을 프롬프트처럼 넣어 원하는 인물·스타일을 조건으로 주는 방법.' },
    { title: 'DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation (arXiv, 2022)', url: 'https://arxiv.org/abs/2208.12242', note: '몇 장의 사진만으로 같은 대상(인물·사물)을 여러 장면에 유지하는 방법.' }
  ],
  script: `오늘 브루로 만든 영상에서 같은 인물인데 장면마다 얼굴이 조금씩 다르게 보였죠. 귀 크기도, 털색도, 표정도 장면마다 살짝 달랐어요. 왜 이럴까요?

이유는 간단해요. AI 이미지 생성 도구는 장면 하나하나를 완전히 새로 그려요. 지난번에 본 것처럼 매번 다른 시드에서 시작해 확률로 그림을 뽑기 때문에, 같은 설명을 써도 세부가 달라져요.

이걸 붙잡는 방법이 레퍼런스 이미지예요. 글 대신 그림으로 조건을 주면 모델이 그 특징을 붙잡아 둬요. 연구에서는 이 방식을 IP-Adapter, DreamBooth 같은 이름으로 불러요. 사진 몇 장으로 같은 인물을 여러 장면에 유지하는 기술이에요.

요즘 영상 도구들도 '캐릭터 고정'이라는 이름으로 이 기능을 넣어 뒀어요. 다만 도구마다 정확도와 사용법이 달라요. 중요한 캐릭터는 정면 레퍼런스 이미지를 먼저 만들고, 장면마다 넣어 결과를 비교해 보세요.`,

  draftScenes: [
    '오늘 사례: 브루 영상 속 인물이 장면마다 달라진 카드 3장을 나란히 보여주기',
    '왜 달라질까: 매 장면을 새로 그린다는 원리를 쿼카가 설명 (시드별 얼굴 카드가 순서대로 등장)',
    '레퍼런스 이미지 원리: 설명만 있을 때 vs 레퍼런스 이미지가 있을 때 비교, IP-Adapter·DreamBooth 한 줄 소개',
    "도구 소개: 요즘 영상 도구들의 '캐릭터 고정' 기능, 도구마다 정확도·사용법이 다르다는 점",
    '정리: 정면 레퍼런스 이미지를 먼저 만들고, 장면마다 넣고, 결과를 비교하자는 할 일'
  ]
};
