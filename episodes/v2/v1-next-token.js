/* V2-S1-1 [S1] AI는 글을 어떻게 만들까?: 다음 토큰 예측과 온도 */
export default {
  slug: 'v1-next-token',
  track: 'S1',
  title: 'AI는 글을 어떻게 만들까?',
  subtitle: '다음 토큰 예측과 온도',
  summary: '같은 질문에도 AI의 답이 매번 조금씩 다른 이유는 고장이 아니라 "다음 조각을 확률로 뽑는" 방식 때문이에요. 온도와 샘플링, 그리고 2026년에 온도 손잡이가 잠긴 이야기까지 담았어요.',
  keywords: ['다음 토큰 예측', '토큰', '확률 분포', '온도', 'temperature', '샘플링', 'top-p', '뉴클리어스 샘플링', '사전학습'],

  scenes: [
    {
      title: '사례: 같은 질문, 세 가지 답', dur: 13,
      captions: [
        { t: 0, text: '"가을 소풍 안내문 첫 문장 써 줘." 같은 질문을 세 번 했더니, 세 번 다 다른 문장이 나왔어요.' },
        { t: 6, text: '하나는 "가을 하늘 아래", 하나는 "설레는 소풍 날". <em>고장</em> 난 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'think' });
        stage.append(q.el);
        const qbox = P.box({ x: 380, y: 60, w: 820, h: 70, label: '"가을 소풍 안내문 첫 문장 써 줘."', accent: 'ink' });
        tl.at(stage.appendChild(qbox.el), .3, { from: 'up' });
        const answers = [
          '가을 하늘 아래, 우리 반 친구들과 즐거운 소풍을 떠나요.',
          '설레는 소풍 날, 가을바람과 함께 떠나볼까요?',
          '청명한 가을날, 다 같이 즐거운 소풍을 준비해요.'
        ].map((txt, i) => {
          const b = P.bubble({ x: 380, y: 160 + i * 115, w: 820, text: `${i + 1}차: "${txt}"`, tail: 'left', size: 21 });
          tl.at(stage.appendChild(b.el), 1.4 + i * 2.4, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 950, y: 15, w: 310, text: '예시 답변이에요', size: 15, weight: 700, align: 'right', cls: 'muted' });
        tl.at(stage.appendChild(note.el), 1.6, { from: 'none' });
        const q2 = P.text({ x: 380, y: 560, w: 820, text: '문장만 다르고 형식은 비슷해요. <em>고장</em> 난 걸까요?', size: 30, weight: 800 });
        tl.at(stage.appendChild(q2.el), 9.8, { from: 'up' });
        return {
          tick(t) { q.tick(t, t > 1.4 && t < 9.5); }
        };
      }
    },
    {
      title: '원리: 한 조각씩 확률로 이어 붙여요', dur: 14,
      captions: [
        { t: 0, text: 'AI는 문장을 통째로 쓰지 않아요. 앞 문맥을 보고 <em>다음 토큰</em>(글 조각) 후보마다 확률을 매겨요.' },
        { t: 6, text: '그중 하나를 뽑아 붙이고, 그 문장을 다시 보고 또 다음 조각을 뽑아요.' },
        { t: 11, text: '사전학습에서 배운 일이 바로 이 "다음 조각 맞히기"예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const sentence = P.box({ x: 330, y: 60, w: 860, h: 70, label: '우리 반 소풍은 ___', accent: 'ink' });
        tl.at(stage.appendChild(sentence.el), .3, { from: 'up' });
        const note = P.text({ x: 330, y: 140, w: 500, text: '예시 확률이에요', size: 15, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note.el), .6, { from: 'none' });

        const row1 = [['내일', '40%'], ['다음', '25%'], ['가을', '15%'], ['비', '12%'], ['취소', '8%']].map(([tok, pct], i) => {
          const b = P.box({ x: 330 + i * 175, y: 190, w: 155, h: 110, label: tok, sub: pct, accent: i === 0 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), .6 + i * .5, { from: 'up' });
          return b;
        });
        const arrow1 = P.arrow(lines, { x1: 407, y1: 190, x2: 420, y2: 130, width: 4, color: '#127E90' });

        const row2 = [['가요', '35%'], ['는', '22%'], ['소풍', '18%'], ['이', '15%'], ['참', '10%']].map(([tok, pct], i) => {
          const b = P.box({ x: 330 + i * 175, y: 440, w: 155, h: 110, label: tok, sub: pct, accent: i === 0 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), 6.4 + i * .5, { from: 'up' });
          return b;
        });
        const arrow2 = P.arrow(lines, { x1: 407, y1: 440, x2: 460, y2: 130, curve: -40, width: 4, color: '#127E90' });

        const final = P.text({ x: 330, y: 330, w: 860, text: '사전학습에서 배운 일이 바로 이 <i>"다음 조각 맞히기"</i>예요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t < 5.5 || (t > 6.4 && t < 11));
            arrow1.draw(P.clamp((t - 3.4) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 9.2) / .6, 0, 1));
            sentence.set(t > 9.8 ? '우리 반 소풍은 내일 가요' : (t > 3.9 ? '우리 반 소풍은 내일 ___' : '우리 반 소풍은 ___'));
          }
        };
      }
    },
    {
      title: '온도: 분포를 뾰족하게, 평평하게', dur: 13,
      captions: [
        { t: 0, text: '<em>온도</em>는 이 확률 막대의 모양을 바꾸는 손잡이예요. 낮추면 1등만 커지고, 높이면 낮은 후보도 뽑힐 기회가 생겨요.' },
        { t: 6, text: '늘 1등만 고르면 글이 단조롭고 같은 말이 반복되기 쉬워서, 상위 후보 안에서 뽑는 방식(<em>top-p</em>)을 써요. 2019년 연구가 이걸 보였어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'base' });
        stage.append(q.el);
        const tokens = ['내일', '다음', '가을', '비', '취소'];
        const base = [.40, .25, .15, .12, .08];
        const logits = base.map(Math.log);
        const bars = tokens.map((tok, i) => {
          const bar = P.h('div', { style: `position:absolute;left:${400 + i * 150}px;top:560px;width:90px;height:10px;border-radius:8px 8px 3px 3px;background:#127E90` });
          const lab = P.text({ x: 390 + i * 150, y: 580, w: 110, text: tok, size: 18, weight: 700, align: 'center' });
          stage.append(bar); tl.at(lab.el, .3, { from: 'none' }); stage.append(lab.el);
          return bar;
        });
        const lowChip = P.chip({ x: 400, y: 150, text: '온도 낮음: 늘 비슷', color: 'aqua', size: 20 });
        const highChip = P.chip({ x: 400, y: 210, text: '온도 높음: 다양하지만 엉뚱할 수도', color: 'orange', size: 20 });
        tl.at(stage.appendChild(lowChip.el), .6, { from: 'pop' });
        tl.at(stage.appendChild(highChip.el), 6.3, { from: 'pop' });
        const final = P.text({ x: 400, y: 320, w: 760, text: '1등만 고르면 반복되기 쉬워서, 상위 후보에서 뽑는 <em>top-p</em>를 써요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, true);
            const temp = .35 + (Math.sin(t * .9) * .5 + .5) * 1.45; // 0.35 ~ 1.8 오감
            const scaled = logits.map(l => l / temp);
            const m = Math.max(...scaled);
            const exps = scaled.map(v => Math.exp(v - m));
            const sum = exps.reduce((a, b) => a + b, 0);
            const dist = exps.map(v => v / sum);
            bars.forEach((bar, i) => {
              const h = Math.max(6, Math.round(dist[i] * 420));
              bar.style.height = h + 'px';
              bar.style.top = (560 - h) + 'px';
            });
          }
        };
      }
    },
    {
      title: '2026년: 손잡이가 잠기는 중', dur: 13,
      captions: [
        { t: 0, text: '그런데 2026년의 최신 모델들은 이 손잡이를 잠그는 쪽으로 가고 있어요. 한 쪽은 기본값 말고는 요청을 거부하고, 다른 쪽은 1.0 아래로 내리면 같은 말을 되풀이할 수 있다며 기본값을 권해요.' },
        { t: 7, text: '그래서 "늘 같은 형식"이 필요하면 온도 대신 <em>형식과 예시</em>를 프롬프트에 적어요. 온도 0도 완전히 같은 답을 보장하진 않았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const dial = P.box({ x: 380, y: 110, w: 320, h: 190, label: '온도 손잡이', sub: '0 → 2, 지금은 <b>잠기는 중</b>', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(dial.el), .3, { from: 'left' });
        const target = P.box({ x: 800, y: 110, w: 380, h: 190, label: '형식 + 예시', sub: '"세 문장, 첫 문장은 날짜와 장소"처럼 지시와 예시 한 편', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(target.el), 7.4, { from: 'right' });
        const arrow = P.arrow(lines, { x1: 700, y1: 205, x2: 800, y2: 205, width: 5, color: '#1B1F24' });
        const chip = P.chip({ x: 380, y: 420, text: '온도 0 ≠ 항상 같은 답', color: 'gray', size: 22 });
        tl.at(stage.appendChild(chip.el), 9.6, { from: 'pop' });
        const final = P.text({ x: 380, y: 480, w: 800, text: '"늘 같은 형식"이 필요하면 <em>형식과 예시</em>로 잡아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6.8 || t > 9.5);
            arrow.draw(P.clamp((t - 7.6) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '정리: 뽑기지만, 앞을 내다보기도 해요', dur: 13,
      captions: [
        { t: 0, text: '한 조각씩 뽑는다고 아무 생각 없이 이어 붙이는 건 아니에요. 2025년 해석 연구에서는 시를 쓸 때 줄 끝의 운 단어를 먼저 정해 두는 모습이 관찰됐어요.' },
        { t: 6, text: '같은 질문에 답이 다르게 나오는 건 고장이 아니라 확률로 뽑기 때문이에요. 형식이 정해진 글은 형식과 예시로 고정해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const rhyme1 = P.chip({ x: 900, y: 110, text: '좋아요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(rhyme1.el), .3, { from: 'pop' });
        const line1 = P.text({ x: 400, y: 170, w: 800, text: '가을바람이 선선해서 <em>좋아요</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(line1.el), 1.8, { from: 'up' });
        const rhyme2 = P.chip({ x: 900, y: 250, text: '떠나요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(rhyme2.el), 4.2, { from: 'pop' });
        const line2 = P.text({ x: 400, y: 310, w: 800, text: '우리 반 친구들과 소풍을 <em>떠나요</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(line2.el), 5.6, { from: 'up' });
        const note = P.text({ x: 400, y: 380, w: 800, text: '줄 끝 단어를 먼저 정해 두고 거기에 닿도록 줄을 써요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 6.3, { from: 'up' });
        const final = P.text({ x: 400, y: 470, w: 800, text: '답이 다른 건 <em>고장</em>이 아니라 <i>확률로 뽑기</i> 때문이에요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) { q.tick(t, t < 6 || t > 9); }
        };
      }
    }
  ],

  interaction: {
    title: '다음 토큰 뽑기 기계',
    desc: '"우리 반 소풍은 ___"에 올 다음 토큰 후보 6개의 확률을 보여줘요. <b>온도</b> 슬라이더를 움직이면 확률 막대가 즉시 바뀌고, <b>top-p</b>를 켜면 누적 확률 90%를 넘는 후보는 회색으로 빠져요. "다섯 번 뽑기"를 누르면 지금 분포에서 문장 다섯 개를 뽑아요.',
    mount(el, P) {
      const TOKENS = ['내일', '다음 주', '가을에', '비 오면', '취소', '아직 몰라'];
      const BASE = [.37, .23, .14, .11, .08, .07];
      const LOGITS = BASE.map(Math.log);
      let temp = 1, topP = false, presses = 0;

      function softmax(t) {
        if (t <= .05) {
          let mi = 0; LOGITS.forEach((l, i) => { if (l > LOGITS[mi]) mi = i; });
          return LOGITS.map((_, i) => i === mi ? 1 : 0);
        }
        const scaled = LOGITS.map(l => l / t);
        const m = Math.max(...scaled);
        const exps = scaled.map(v => Math.exp(v - m));
        const sum = exps.reduce((a, b) => a + b, 0);
        return exps.map(v => v / sum);
      }
      function topPMask(dist) {
        const order = dist.map((p, i) => i).sort((a, b) => dist[b] - dist[a]);
        let acc = 0; const keep = new Array(dist.length).fill(false);
        for (const i of order) { acc += dist[i]; keep[i] = true; if (acc >= .9) break; }
        return keep;
      }
      function sampleOne(rand, dist, mask) {
        let total = 0; const w = dist.map((p, i) => (mask[i] ? p : 0));
        w.forEach(v => total += v);
        if (total <= 0) return dist.indexOf(Math.max(...dist));
        let r = rand() * total, acc = 0;
        for (let i = 0; i < w.length; i++) { acc += w[i]; if (r <= acc) return i; }
        return w.length - 1;
      }

      const sentEl = P.h('p', { class: 'sim-sent' }, '우리 반 소풍은 ___');
      const tempLab = P.h('label', { for: 'sim-temp', class: 'sim-cap' }, '온도: 1.0');
      const tempRange = P.h('input', { id: 'sim-temp', type: 'range', min: '0', max: '2', step: '.1', value: '1', class: 'sim-range', 'aria-label': '온도 (0~2)' });
      const topPWrap = P.h('label', { class: 'sim-chk' });
      const topPBox = P.h('input', { type: 'checkbox', id: 'sim-topp' });
      topPWrap.append(topPBox, P.h('span', {}, ' 상위 후보만(top-p 0.9)'));
      const barsWrap = P.h('div', { class: 'sim-bars' });
      const barRows = TOKENS.map(tok => {
        const fill = P.h('div', { class: 'sim-bfill' });
        const track = P.h('div', { class: 'sim-btrack' }, fill);
        const val = P.h('span', { class: 'sim-bval' }, '0%');
        const row = P.h('div', { class: 'sim-brow' }, P.h('span', { class: 'sim-blab' }, tok), track, val);
        return { row, fill, val };
      });
      barRows.forEach(r => barsWrap.append(r.row));

      const moreBtn = P.h('button', { class: 'btn primary', type: 'button' }, '다섯 번 뽑기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const resultWrap = P.h('div', { class: 'sim-results', 'aria-live': 'polite' });
      const disclaimer = P.h('p', { class: 'sim-disclaimer' }, '예시 확률이에요. 실제 모델은 수만 개 토큰에 확률을 매겨요.');

      function render() {
        tempLab.textContent = `온도: ${temp.toFixed(1)}`;
        const dist = softmax(temp);
        const mask = topP ? topPMask(dist) : dist.map(() => true);
        barRows.forEach((r, i) => {
          const pct = Math.round(dist[i] * 100);
          r.fill.style.width = pct + '%';
          r.val.textContent = pct + '%';
          r.row.classList.toggle('excluded', !mask[i]);
        });
      }
      tempRange.addEventListener('input', () => { temp = +tempRange.value; render(); });
      topPBox.addEventListener('change', () => { topP = topPBox.checked; render(); });
      moreBtn.addEventListener('click', () => {
        presses++;
        const rand = P.rng(42 + presses);
        const dist = softmax(temp);
        const mask = topP ? topPMask(dist) : dist.map(() => true);
        const lines = [];
        for (let i = 0; i < 5; i++) { lines.push(TOKENS[sampleOne(rand, dist, mask)]); }
        resultWrap.replaceChildren(...lines.map(w => P.h('p', { class: 'sim-result' }, `우리 반 소풍은 `, P.h('b', {}, w))));
      });
      resetBtn.addEventListener('click', () => { presses = 0; temp = 1; topP = false; tempRange.value = '1'; topPBox.checked = false; resultWrap.replaceChildren(); render(); });

      el.append(
        sentEl,
        P.h('div', { class: 'sim-row' }, tempLab, tempRange),
        topPWrap,
        barsWrap,
        P.h('div', { class: 'sim-btns' }, moreBtn, resetBtn),
        resultWrap,
        disclaimer
      );
      el.append(P.h('style', { html: `
        .sim-sent{font-weight:800;font-size:18px;margin:0 0 10px}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}
        .sim-cap{font-family:var(--mono);font-size:13.5px;font-weight:700;flex:0 0 auto}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        .sim-chk{display:flex;align-items:center;gap:6px;font-size:13.5px;margin-bottom:12px}
        .sim-bars{display:flex;flex-direction:column;gap:8px;max-width:100%}
        .sim-brow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;transition:opacity .2s}
        .sim-brow.excluded{opacity:.35}
        .sim-blab{width:62px;flex:0 0 auto;font-size:13.5px;font-weight:700}
        .sim-btrack{flex:1;min-width:80px;height:14px;border-radius:8px;background:#eee;overflow:hidden}
        .sim-bfill{height:100%;background:#127E90;border-radius:8px;transition:width .2s}
        .sim-bval{width:46px;flex:0 0 auto;font-family:var(--mono);font-size:12.5px;color:var(--muted);text-align:right}
        .sim-btns{display:flex;gap:10px;margin:14px 0;flex-wrap:wrap}
        .sim-results{min-height:20px;display:flex;flex-direction:column;gap:4px}
        .sim-result{margin:0;font-size:14.5px}
        .sim-disclaimer{margin-top:10px;font-size:12px;color:var(--muted);border-top:1px dashed var(--line);padding-top:8px}
      ` }));
      render();
    }
  },

  teacherLines: [
    'AI는 문장을 한 번에 쓰지 않고, <b>다음에 올 조각을 확률로 골라</b> 하나씩 이어 붙여요.',
    '같은 질문에 답이 매번 다른 건 고장이 아니라 <b>뽑기를 하기 때문</b>이에요. 형식이 중요하면 예시를 같이 줘요.'
  ],
  tip: {
    body: '가정통신문·공문처럼 형식이 정해진 글은 "세 문장, 첫 문장은 날짜와 장소" 같은 형식 지시와 예시 한 편을 같이 주세요. 온도를 못 바꾸는 최신 모델에서도 결과가 안정돼요.',
    extra: '반대로 아이디어가 여러 개 필요하면 "서로 다른 안 다섯 개"를 한 번에 요청해 보세요. 뽑기를 여러 번 돌린 효과가 나요.'
  },
  myth: {
    myth: '온도를 0으로 하면 언제나 똑같은 답이 나온다.',
    fact: '온도 0은 늘 가장 확률 높은 조각을 고르게 하지만, 실제 서비스에서는 같은 입력에도 출력이 달라질 수 있다고 공식 문서가 밝혀요. 2026년 최신 모델 일부는 온도 자체를 바꿀 수 없어요.'
  },
  sources: [
    { title: 'Claude 용어집 — Pretraining / Temperature / Tokens', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: '다음 단어 예측으로 사전학습한다는 설명, 온도 정의, 온도 0도 완전히 결정적이지 않다는 안내.' },
    { title: 'Gemini API — Prompt design strategies', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies', note: '온도·topK·topP 정의와 A·B·C 예시, Gemini 3.x는 기본값 유지 권장.' },
    { title: 'Holtzman et al., The Curious Case of Neural Text Degeneration (arXiv 2019, ICLR 2020)', url: 'https://arxiv.org/abs/1904.09751', note: '1등만 고르면 반복·단조로워지고, 상위 핵에서 뽑는 top-p가 낫다는 연구.' },
    { title: 'Migrating to Claude Opus 5.5', url: 'https://platform.claude.com/docs/en/models/opus-5-5/migration-guide', note: 'temperature·top_p·top_k를 기본값 외로 설정하면 거부, 프롬프팅으로 이끌라는 안내.' }
  ],
  script: `같은 질문을 세 번 했는데 답이 매번 다르게 나온 적 있으신가요? AI는 문장을 통째로 쓰지 않아요. 사전학습에서 앞 문맥이 주어졌을 때 다음 토큰(글 조각)을 맞히도록 배웠고, 답을 만들 때도 다음 토큰 후보마다 확률을 매겨 하나를 뽑아 붙이고, 그 문장을 다시 보고 또 다음 조각을 뽑아요.

온도는 이 확률 분포의 모양을 바꾸는 손잡이예요. 낮추면 1등 후보만 커지고, 높이면 낮은 후보도 뽑힐 기회가 생겨요. 늘 1등만 고르면 글이 단조롭고 반복되기 쉬워서, 상위 후보 안에서 뽑는 top-p 샘플링을 써요. 2019년 연구가 이걸 보였어요.

그런데 2026년 최신 모델들은 이 손잡이를 잠그는 쪽으로 가요. 한쪽은 기본값 외엔 요청을 거부하고, 다른 쪽은 1.0 아래로 내리면 반복이 생길 수 있다며 기본값을 권해요. 온도 0도 완전히 같은 답을 보장하진 않는다고 밝혀요. "늘 같은 형식"이 필요하면 온도 대신 형식과 예시를 프롬프트에 적어 주세요.

뽑기라고 아무 생각이 없는 건 아니에요. 2025년 해석 연구에서는 시를 쓸 때 줄 끝 운 단어를 먼저 정해 두는 모습이 관찰됐어요. 답이 매번 다른 건 고장이 아니라 확률로 뽑기 때문이에요.`
};
