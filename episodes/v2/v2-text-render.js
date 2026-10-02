/* V2 S2-2 [시즌 2] 글자와 손가락은 왜 뭉개질까: 확산 모델과 텍스트 렌더링 학습 */
export default {
  slug: 'v2-text-render',
  track: 'S2',
  title: '글자와 손가락은 왜 뭉개질까',
  subtitle: '확산 모델과 텍스트 렌더링 학습',
  summary: '영상 제목의 TEMPERATURE가 뭉개진 이유와, 요즘 모델의 글자가 왜 좋아졌는지를 풀어요. 텍스트 인코더가 글자를 "덩어리"로 봤던 문제와, 이를 푼 글자를 보는 인코더·합성 글자 데이터·작은 글자를 살리는 디코더를 차례로 짚어요. 한글이 아직 더 어려운 이유도 다뤄요.',
  keywords: ['텍스트 렌더링', '확산 모델', '텍스트 인코더', '문자 인식(character-aware)', '토큰', '합성 데이터', '커리큘럼 학습', 'VAE 디코더', '한글 음절'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '오늘 만든 영상 제목 자막을 확대해 봤어요.' },
        { t: 5, text: '<em>TEMPERATURE</em> 부분만 유독 뭉개졌어요.' },
        { t: 9.5, text: '다른 글자는 멀쩡한데, 왜 여기만 뭉개졌을까요?' }
      ],
      build({ stage, lines, P, tl, base }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const tag = P.chip({ x: 340, y: 46, text: 'AI로 만든 영상', color: 'ink' });
        tl.at(stage.appendChild(tag.el), .3, { from: 'up', dist: 12 });
        const frame = P.h('img', { src: `${base}assets/frames/v1-07s.webp`, alt: 'AI 영상 도구로 만든 영상 한 장면', style: 'left:340px;top:86px;width:300px;height:169px;object-fit:cover;border-radius:14px;border:2px solid #9AA5AF;background:#fff' });
        tl.at(stage.appendChild(frame), .5, { from: 'up' });
        const crop = P.h('img', { src: `${base}assets/frames/v1-07s-title.webp`, alt: '제목 자막 확대. TEMPERATURE 부분이 뭉개져 보임', style: 'left:330px;top:350px;width:820px;height:143px;object-fit:cover;border-radius:12px;border:3px solid #F2812D;background:#000' });
        tl.at(stage.appendChild(crop), 3.6, { from: 'up' });
        const hl = P.h('div', { style: 'left:576px;top:361px;width:279px;height:120px;border:3px dashed #F2812D;border-radius:8px;background:rgba(242,129,45,.1)' });
        tl.at(stage.appendChild(hl), 5, { from: 'pop' });
        const chip2 = P.chip({ x: 660, y: 306, text: '여기만 뭉개졌어요', color: 'orange' });
        tl.at(stage.appendChild(chip2.el), 5, { from: 'pop' });
        const ar = P.arrow(lines, { x1: 490, y1: 255, x2: 740, y2: 350, curve: -30, width: 4, color: '#F2812D' });
        const qq = P.text({ x: 330, y: 522, w: 760, text: '다른 글자는 멀쩡한데, <em>왜 여기만</em> 뭉개졌을까요?', size: 30, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.6);
            ar.draw(P.clamp((t - 1) / .9, 0, 1));
          }
        };
      }
    },
    {
      title: '대충 맞으면 되는 것, 정확해야 하는 것', dur: 13,
      captions: [
        { t: 0, text: '확산 모델은 잡음을 걷어 내며 <em>그럴듯한 패턴</em>을 그려요. 나무는 조금 틀려도 티가 안 나요.' },
        { t: 5, text: '손가락은 자세마다 모양이 바뀌고 서로 가려져서 배우기 어렵고, 글자는 획 하나만 틀려도 티가 나요.' },
        { t: 9, text: '그래서 유독 <em>손가락</em>과 <em>글자</em>에서 자주 틀려요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const left = P.box({ x: 330, y: 140, w: 430, h: 160, label: '나무·구름·표정', sub: '조금 틀려도 티가 안 나요', accent: 'aqua', icon: P.ICON.check });
        const right = P.box({ x: 790, y: 140, w: 430, h: 160, label: '손가락·글자', sub: '자세·획이 조금만 어긋나도 바로 티가 나요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(left.el), .3, { from: 'up' });
        tl.at(stage.appendChild(right.el), 1.2, { from: 'up' });
        const why = P.text({ x: 330, y: 340, w: 890, text: '손가락은 자세마다 모양이 바뀌고 서로 <em>가려져서</em> 배우기 어려워요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(why.el), 5.1, { from: 'up' });
        const final = P.text({ x: 330, y: 420, w: 890, text: '그래서 AI는 유독 <em>손가락</em>과 <em>글자</em>에서 자주 틀려요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            left.on(t > .3); right.on(t > 1.2);
          }
        };
      }
    },
    {
      title: 'AI는 글자를 덩어리로 봤어요', dur: 13,
      captions: [
        { t: 0, text: '그림 모델에 글을 전하는 <em>텍스트 인코더</em>는 글을 낱글자가 아니라 <em>토큰 덩어리</em>로 받아요.' },
        { t: 5, text: '그래서 그 단어가 어떤 글자로 이루어졌는지 몰랐어요. 2022년 연구가 이걸 짚었어요.' },
        { t: 9.5, text: '글자를 보는 인코더로 바꾸니 희귀한 단어의 철자가 크게 좋아졌어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const word = P.text({ x: 330, y: 60, w: 880, text: '"TEMPERATURE"', size: 26, weight: 700, cls: 'mono' });
        tl.at(stage.appendChild(word.el), .2, { from: 'up' });
        const tokLabel = P.text({ x: 330, y: 110, w: 880, text: '텍스트 인코더가 받는 <i>토큰 덩어리</i>(예시 분할)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(tokLabel.el), .6, { from: 'up' });
        const toks = ['TEMP', 'ERA', 'TURE'].map((tk, i) => {
          const c = P.chip({ x: 330 + i * 160, y: 150, text: tk, color: 'orange', size: 24 });
          tl.at(stage.appendChild(c.el), .9 + i * .3, { from: 'pop' });
          return c;
        });
        const letLabel = P.text({ x: 330, y: 330, w: 880, text: '실제로 필요한 <i>낱글자</i> 11개', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(letLabel.el), 5.3, { from: 'up' });
        const letters = [...'TEMPERATURE'].map((ch, i) => {
          const b = P.box({ x: 330 + i * 78, y: 370, w: 64, h: 64, label: ch, sub: '' });
          tl.at(stage.appendChild(b.el), 5.5 + i * .12, { from: 'pop' });
          return b;
        });
        const final = P.text({ x: 330, y: 480, w: 890, text: '글자를 보는 인코더로 바꾸니 희귀한 단어의 <em>철자</em>가 크게 좋아졌어요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            letters.forEach((b, i) => b.on(t > 5.5 + i * .12));
          }
        };
      }
    },
    {
      title: '글자가 좋아진 네 가지 이유', dur: 14,
      captions: [
        { t: 0, text: '2024년 연구에서는 글을 읽는 인코더를 빼자 글자 실력이 눈에 띄게 떨어졌어요.' },
        { t: 5, text: '그림 토큰과 글 토큰이 양방향으로 섞이는 구조도 한몫했어요.' },
        { t: 9.5, text: '2025년 보고서는 글자 그림을 일부러 만들어 쉬운 배경부터 문단까지 순서대로 가르쳤어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'think' });
        stage.append(q.el);
        const items = [
          ['① 글자를 보는 인코더', '더 크고, 낱글자를 보는 인코더'],
          ['② 양방향으로 섞기', '그림 토큰과 글 토큰이 서로 영향'],
          ['③ 합성 글자 데이터', '쉬운 배경 → 문단까지 순서대로'],
          ['④ 디코더 다듬기', '작은 글자를 살리도록 미세조정']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 0 ? 'aqua' : (i === 2 ? 'orange' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '네 가지가 겹치면서 글자 실력이 <em>크게</em> 좋아졌어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '한글은 아직 더 조심', dur: 13,
      captions: [
        { t: 0, text: '한글은 자모를 모아 쓰는 음절이 <em>11,172자</em>나 돼요.' },
        { t: 5, text: '2026년 다국어 평가에서도 글자 그리기는 한국어가 뒤처졌어요.' },
        { t: 9, text: '그래서 안내문·자막처럼 틀리면 안 되는 글자는 <em>편집 단계</em>에서 넣고, 생성한 글자는 꼭 확대해서 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const chip1 = P.chip({ x: 400, y: 90, text: '한글 음절 11,172자', color: 'ink', size: 24 });
        tl.at(stage.appendChild(chip1.el), .3, { from: 'pop' });
        const chip2 = P.chip({ x: 400, y: 150, text: '2026년 평가: 한국어 글자 그리기 뒤처짐', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip2.el), 5.1, { from: 'pop' });
        const steps = [
          ['① 편집 단계에서 넣기', '안내문·자막은 그림을 만든 뒤 텍스트로'],
          ['② 확대해서 확인', 'AI가 그린 글자는 획까지 꼭 확인']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + i * 400, y: 250, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), 9.1 + i * .6, { from: 'up' });
          return b;
        });
        return {
          tick(t) {
            q.tick(t, t > 8.8);
            steps.forEach((b, i) => b.on(t > 9.1 + i * .6));
          }
        };
      }
    }
  ],

  interaction: {
    title: 'AI 눈으로 글자 보기',
    desc: '단어를 골라 보세요. 위 줄은 텍스트 인코더가 보는 <b>토큰 덩어리</b>(예시 분할)예요. "낱글자로 펼치기"를 누르면 아래 줄에 실제로 정확히 맞혀야 하는 <b>낱글자·자모</b>가 하나씩 드러나요. 토큰 몇 개로 본 단어를 그리려면 글자를 몇 개나 정확히 알아야 하는지 비교해 보세요.',
    mount(el, P) {
      const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
      const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      /* 음절 하나를 초성·중성·종성 자모로 쪼개요(유니코드 계산, 결정적). 한글 음절이 아니면 null. */
      function decompose(ch) {
        const code = ch.codePointAt(0) - 0xAC00;
        if (code < 0 || code > 11171) return null;
        const L = Math.floor(code / 588), V = Math.floor((code % 588) / 28), T = code % 28;
        const jamo = [CHO[L], JUNG[V]];
        if (T) jamo.push(JONG[T]);
        return jamo;
      }
      /* 예시 분할이에요 — 실제 토크나이저의 분할과는 다를 수 있어요. */
      const PRESETS = [
        { label: 'TEMPERATURE', word: 'TEMPERATURE', tokens: ['TEMP', 'ERA', 'TURE'] },
        { label: '과학실', word: '과학실', tokens: ['과학', '실'] },
        { label: '안녕하세요', word: '안녕하세요', tokens: ['안녕', '하세요'] },
        { label: '2026년 10월', word: '2026년 10월', tokens: ['2026', '년', '10월'] }
      ];
      let idx = 0, revealed = false;

      const select = P.h('select', { class: 'sim-sel', 'aria-label': '단어 고르기' },
        ...PRESETS.map((p, i) => P.h('option', { value: String(i) }, p.label)));
      const tokRow = P.h('div', { class: 'sim-row sim-tokrow' });
      const tokNote = P.h('p', { class: 'sim-note' }, '위 줄은 토큰 덩어리예요(예시 분할이에요).');
      const cellRow = P.h('div', { class: 'sim-row sim-cellrow' });
      const status = P.h('p', { class: 'sim-status' }, '');
      const openBtn = P.h('button', { class: 'btn primary', type: 'button' }, '낱글자로 펼치기');
      const closeBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 접기');
      el.append(
        P.h('div', { class: 'sim-top' }, P.h('label', { class: 'sim-lab' }, '단어 ', select)),
        P.h('div', { class: 'sim-group' }, P.h('div', { class: 'sim-glab' }, '토큰으로 볼 때'), tokRow, tokNote),
        P.h('div', { class: 'sim-group' }, P.h('div', { class: 'sim-glab' }, '낱글자·자모로 볼 때'), cellRow),
        status,
        P.h('div', { class: 'sim-bar' }, openBtn, closeBtn)
      );
      el.append(P.h('style', {
        html: `
        .sim-sel{font-size:14px;padding:6px 10px;border:1px solid var(--line);border-radius:10px;background:#fff;max-width:100%}
        .sim-lab{font-size:14px;font-weight:700;color:var(--muted);display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap}
        .sim-group{margin-top:14px}
        .sim-glab{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px}
        .sim-row{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}
        .sim-tokrow .sim-tok{border-radius:999px;padding:7px 14px;font-weight:700;font-size:14px;background:var(--acc2-pale,#FDEFE3);color:var(--acc2,#B3520F);border:1px solid color-mix(in srgb,var(--acc2) 30%,white)}
        .sim-cellrow{min-height:56px;transition:filter .3s,opacity .3s}
        .sim-cellrow.blurred{filter:blur(7px);opacity:.55;pointer-events:none}
        .sim-cell{border:1px solid var(--line);border-radius:10px;background:#fff;min-width:40px;padding:8px 6px;text-align:center;font-family:var(--mono);font-weight:700;font-size:16px}
        .sim-syll{display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--line);border-radius:10px;background:#fff;padding:8px 8px 6px;min-width:52px}
        .sim-syll b{font-size:17px}
        .sim-syll span{font-size:12px;color:var(--muted);letter-spacing:1px}
        .sim-note{font-size:12.5px;color:var(--muted);margin-top:6px}
        .sim-status{margin-top:12px;font-size:15px;font-weight:700;background:var(--paper);border-radius:12px;padding:10px 14px;max-width:100%}
        .sim-bar{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}
      ` }));

      function render() {
        const cur = PRESETS[idx];
        select.value = String(idx);
        tokRow.replaceChildren(...cur.tokens.map(tk => P.h('span', { class: 'sim-tok' }, tk)));

        const groups = [];
        for (const ch of cur.word) {
          if (ch === ' ') { groups.push({ type: 'space' }); continue; }
          const jamo = decompose(ch);
          if (jamo) groups.push({ type: 'syll', ch, jamo });
          else groups.push({ type: 'plain', ch });
        }
        cellRow.replaceChildren(...groups.map(g => {
          if (g.type === 'space') return P.h('span', { style: 'width:10px;display:inline-block' });
          if (g.type === 'syll') return P.h('div', { class: 'sim-syll' }, P.h('b', {}, g.ch), P.h('span', {}, g.jamo.join('·')));
          return P.h('div', { class: 'sim-cell' }, g.ch);
        }));
        cellRow.classList.toggle('blurred', !revealed);

        const syllCount = groups.filter(g => g.type === 'syll').length;
        const jamoCount = groups.filter(g => g.type === 'syll').reduce((n, g) => n + g.jamo.length, 0);
        const letterCount = groups.filter(g => g.type === 'plain' && /[A-Za-z]/.test(g.ch)).length;
        status.textContent = syllCount > 0
          ? `음절 ${syllCount}개 = 자모 ${jamoCount}개를 정확한 자리에 모아야 해요.`
          : `토큰 ${cur.tokens.length}개로 본 단어를 그림으로 그리려면 글자 ${letterCount}개를 정확히 알아야 해요.`;
      }
      select.addEventListener('change', () => { idx = +select.value; revealed = false; render(); });
      openBtn.addEventListener('click', () => { revealed = true; render(); });
      closeBtn.addEventListener('click', () => { revealed = false; render(); });
      render();
    }
  },

  teacherLines: [
    'AI는 글을 <b>낱글자가 아니라 덩어리</b>로 받아서, 글자를 정확히 그리는 게 원래 어려웠어요.',
    '그림 속 글자는 <b>꼭 확대해서</b> 확인하고, 중요한 글자는 나중에 따로 넣어요.'
  ],
  tip: {
    body: '포스터·안내문처럼 틀리면 안 되는 글자는 그림을 만든 뒤 <b>편집 단계에서 텍스트로</b> 넣어요. AI가 그린 글자는 확대해서 획 하나까지 확인해요.',
    extra: '그림에 꼭 글자를 넣어야 하면 짧게, 한 줄로, 큰 글씨로 요청해요. 한글은 음절 조합이 많아서 영어보다 틀리기 쉬워요.'
  },
  myth: {
    myth: '요즘 AI는 글자도 사람처럼 정확히 쓴다.',
    fact: '글자를 보는 인코더, 합성 글자 데이터, 작은 글자를 살리는 디코더 덕분에 많이 좋아졌어요. 그래도 2026년 다국어 평가에서 한국어 글자 그리기는 뒤처졌어요. 정확해야 하는 글자는 꼭 확인해요.'
  },
  sources: [
    { title: 'Character-Aware Models Improve Visual Text Rendering (arXiv, 2022)', url: 'https://arxiv.org/abs/2212.10562', note: '텍스트 인코더가 글자를 못 보는 것이 글자 깨짐의 주요 원인임을 보인 연구.' },
    { title: 'Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (SD3, arXiv, 2024)', url: 'https://arxiv.org/abs/2403.03206', note: '그림·글 토큰의 양방향 흐름, 텍스트 인코더가 글자 생성에 미치는 영향.' },
    { title: 'Qwen-Image Technical Report (arXiv, 2025)', url: 'https://arxiv.org/abs/2508.02324', note: '합성 글자 데이터, 커리큘럼 학습, 글자 많은 이미지로 디코더 미세조정.' },
    { title: 'On the Limitations of Cross-Lingual Consistency in Multilingual Text-to-image Generation (arXiv, 2026)', url: 'https://arxiv.org/abs/2608.11002v1', note: '10개 언어 평가에서 한국어 글자 그리기가 뒤처짐.' }
  ],
  script: `오늘 만든 영상 제목 자막을 확대해 보니 TEMPERATURE 부분만 유독 뭉개져 있었어요. 다른 글자는 멀쩡한데 왜 여기만 이럴까요.

확산 모델은 잡음을 걷어 내며 그럴듯한 패턴을 그리는 데 강해요. 나무나 구름은 조금 틀려도 티가 안 나지만, 손가락과 글자는 조금만 어긋나도 티가 나요. 글자가 약했던 이유는 텍스트 인코더가 글을 낱글자가 아니라 토큰 덩어리로 받았기 때문이에요. 2022년 연구가 이 문제를 짚었고, 글자를 보는 인코더와 그림·글 토큰이 섞이는 구조, 글자 그림 학습, 작은 글자를 살리는 디코더로 많이 좋아졌어요.

그래도 한글은 더 조심해야 해요. 음절이 11,172자나 되고, 2026년 평가에서도 한국어 글자 그리기는 뒤처졌어요. 안내문·자막처럼 틀리면 안 되는 글자는 편집 단계에서 넣고, AI가 그린 글자는 확대해서 확인하세요.`
};
