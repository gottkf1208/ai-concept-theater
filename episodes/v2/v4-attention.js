/* 30 [S4] AI는 문장의 어디를 보고 있을까: 트랜스포머 어텐션 */

/* 문장을 칩으로 나열할 때 쓰는 보조 함수. 글자 수 기반으로 넉넉하게 간격을 잡아서
   실제 렌더 폭이 추정보다 커도 겹치지 않게 해요(결정적, 같은 입력 → 같은 배치). */
function rowLayout(words, { y, size = 22, padX = 16, gap = 18, centerX = 640, charW = 24 } = {}) {
  const widths = words.map(w => Math.round(padX * 2 + w.length * charW));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  let x = Math.round(centerX - total / 2);
  return words.map((w, i) => { const item = { x, y, w: widths[i], text: w }; x += widths[i] + gap; return item; });
}

const SENT_A = ['쿼카가', '공책을', '가방에', '넣었는데', '그게', '너무', '컸다'];
const SENT_B = ['쿼카가', '공책을', '가방에', '넣었는데', '그게', '찢어져', '있었다'];
/* 미리 정한 가중치 표(결정적). 기준 낱말 위치(인덱스) → 7개 낱말에 대한 비중, 합 100 */
const W_A = { 4: [5, 18, 47, 16, 6, 3, 5], 3: [10, 30, 35, 8, 5, 4, 8], 6: [4, 10, 50, 8, 14, 8, 6] };
const W_B = { 4: [4, 52, 15, 10, 6, 8, 5], 3: [10, 32, 33, 8, 5, 4, 8], 6: [4, 14, 35, 10, 20, 12, 5] };

export default {
  slug: 'v4-attention',
  track: 'S4',
  title: 'AI는 문장의 어디를 보고 있을까',
  subtitle: '트랜스포머 어텐션',
  summary: '"쿼카가 공책을 가방에 넣었는데 그게 너무 컸다"에서 \'그게\'는 공책일까 가방일까요. AI는 낱말마다 다른 낱말을 얼마나 볼지 점수를 매겨 뜻을 정해요. 어텐션의 원리와, 긴 자료의 중간을 놓치는 이유를 파고들어요.',
  keywords: ['어텐션', '셀프 어텐션', '트랜스포머', '쿼리·키·값', '소프트맥스', '멀티헤드', '위치 인코딩', '긴 문맥', 'Lost in the Middle', '위치 편향'],

  scenes: [
    {
      title: "'그게'는 뭘 가리킬까", dur: 13,
      captions: [
        { t: 0, text: "'쿼카가 공책을 가방에 넣었는데 그게 너무 컸다.' 여기서 <em>그게</em>는 뭘까요?" },
        { t: 5, text: "사람은 '넣었는데 컸다'를 보고 <em>가방</em>이라고 금방 알아요." },
        { t: 9.5, text: "AI도 '그게'를 읽을 때 문장의 <em>다른 낱말을 얼마나 볼지</em> 정해서 알아내요." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'think' });
        stage.append(q.el);
        const row = rowLayout(SENT_A, { y: 100 });
        const chips = row.map((it, i) => {
          const c = P.chip({ x: it.x, y: it.y, text: it.text, color: i === 4 ? 'orange' : 'ink', size: 22 });
          tl.at(stage.appendChild(c.el), .15 + i * .12, { from: 'pop' });
          return c;
        });
        const ask = P.text({ x: 300, y: 230, w: 700, text: "<em>그게</em>는 공책일까요, 가방일까요?", size: 32, weight: 800 });
        tl.at(stage.appendChild(ask.el), 2.4, { from: 'up' });
        const note = P.text({ x: 300, y: 420, w: 700, text: 'AI는 낱말을 읽을 때마다 <i>다른 낱말을 얼마나 볼지</i> 점수를 매겨요.', size: 24, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return { tick(t) { q.tick(t, t < 5 || t > 9.5); } };
      }
    },
    {
      title: '질문·이름표·내용', dur: 14,
      captions: [
        { t: 0, text: '낱말마다 <em>질문</em>, <em>이름표</em>, <em>내용</em> 세 가지 숫자 묶음을 만들어요.' },
        { t: 5, text: '질문과 이름표가 잘 맞을수록 큰 점수를 주고, 점수 합이 100%가 되게 나눠요. 이걸 <em>소프트맥스</em>라고 해요.' },
        { t: 10, text: "그 비율대로 내용을 섞은 게 '그게'의 새 뜻이에요. 이걸 <em>어텐션</em>이라고 불러요." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 500, size: 230, pose: 'point' });
        stage.append(q.el);
        const cards = [
          ['질문(Query)', "내가 찾는 것:<br>'그게'가 무엇을 가리킬까?", 'aqua', P.ICON.search],
          ['이름표(Key)', '각 낱말이 내건<br>자기 정체 표시', 'ink', P.ICON.key],
          ['내용(Value)', '그 낱말이 실제로<br>담고 있는 뜻', 'orange', P.ICON.doc]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 170 + i * 340, y: 90, w: 300, h: 130, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const row = rowLayout(SENT_A, { y: 300 });
        const chips = row.map((it, i) => {
          const c = P.chip({ x: it.x, y: it.y, text: it.text, color: i === 4 ? 'orange' : 'ink', size: 22 });
          tl.at(stage.appendChild(c.el), 2.6 + i * .08, { from: 'pop' });
          return { chip: c, box: it };
        });
        const baseBox = row[4];
        const cx0 = baseBox.x + baseBox.w / 2, cy0 = baseBox.y + 40;
        const W = [5, 18, 47, 16, 0, 3, 5];
        const arrows = row.map((it, i) => {
          if (i === 4) return null;
          const cx1 = it.x + it.w / 2, cy1 = it.y + 40;
          const w = W[i];
          const color = w >= 40 ? '#F2812D' : (w >= 10 ? '#1B1F24' : '#9AA5AF');
          const width = w >= 40 ? 9 : (w >= 10 ? 4.5 : 2);
          const curve = cx1 > cx0 ? 55 : -55;
          const a = P.arrow(lines, { x1: cx0, y1: cy0, x2: cx1, y2: cy1, curve, width, color });
          return a;
        });
        const lab = P.text({ x: 300, y: 470, w: 680, text: '화살표가 굵을수록 <em>더 많이 보는</em> 낱말이에요. 점수 합은 100%예요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 6.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            cards.forEach(c => c.on(t > .3));
            arrows.forEach((a, i) => { if (a) a.draw(P.clamp((t - (5.3 + i * .25)) / .6, 0, 1)); });
          }
        };
      }
    },
    {
      title: '2017년 연구가 바꾼 것', dur: 13,
      captions: [
        { t: 0, text: '2017년 연구는 차례로 읽는 구조를 버리고 <em>어텐션만</em>으로 번역 모델을 만들었어요.' },
        { t: 5, text: '한꺼번에 계산하니 빨라졌고, 지금 쓰는 대화형 AI 대부분이 이 <em>트랜스포머</em> 구조 위에 있어요.' },
        { t: 9.5, text: '어텐션은 순서를 모르니 <em>위치 정보</em>를 따로 더해 줘요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const cards = [
          ['어텐션만으로', '차례로 읽지 않고<br>한꺼번에 계산해요', 'aqua', P.ICON.brain],
          ['헤드 8개', '여러 관점으로 동시에<br>누가·무엇을·어디에', 'orange', P.ICON.eye],
          ['위치 표시', '순서 정보를<br>따로 더해 줘요', 'ink', P.ICON.key]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 170 + i * 340, y: 120, w: 300, h: 150, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const fact = P.chip({ x: 340, y: 340, text: '영→독 BLEU 28.4 · GPU 8대·3.5일', color: 'gray', size: 20 });
        tl.at(stage.appendChild(fact.el), 5.4, { from: 'pop' });
        const final = P.text({ x: 340, y: 420, w: 760, text: '지금 대화형 AI 대부분이 이 <em>트랜스포머</em> 구조 위에 있어요.', size: 26, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            cards.forEach((c, i) => c.on(t > .3 + i * .8));
          }
        };
      }
    },
    {
      title: '긴 자료의 가운데', dur: 14,
      captions: [
        { t: 0, text: '자료가 길어지면 함정이 있어요. 정답이 <em>맨 앞이나 맨 끝</em>에 있으면 잘 찾는데, <em>가운데</em>에 있으면 놓치기 쉬워요.' },
        { t: 5, text: '2023년 연구에서는 문서 20개 중 정답이 가운데 있을 때, 자료를 <em>아예 안 줬을 때</em>보다 정답률이 낮은 모델도 있었어요.' },
        { t: 10, text: '앞쪽으로 기우는 구조 탓이라는 분석, 학습 습관에 적응한 결과라는 분석이 2025년에 나왔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const note = P.text({ x: 340, y: 110, w: 760, text: '그림은 <i>원리</i>를 보여줘요. 실제 정답률 수치는 아니에요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), .3, { from: 'up' });
        const heights = [88, 70, 54, 40, 54, 70, 88];
        const baseY = 560, barW = 56, gap = 20;
        const totalW = heights.length * barW + (heights.length - 1) * gap;
        const startX = 340 + (760 - totalW) / 2;
        const bars = heights.map((hh, i) => {
          const x = startX + i * (barW + gap);
          const hpx = hh * 2.1;
          const topY = baseY - hpx;
          const bar = P.h('div', { style: `position:absolute;left:${x}px;top:${topY}px;width:${barW}px;height:${hpx}px;border-radius:10px 10px 4px 4px;background:${i === 3 ? '#F2812D' : '#9AA5AF'}` });
          tl.at(stage.appendChild(bar), 5.3 + i * .15, { from: 'up' });
          return bar;
        });
        const c0 = startX + barW / 2, c3 = startX + 3 * (barW + gap) + barW / 2, c6 = startX + 6 * (barW + gap) + barW / 2;
        const lab1 = P.text({ x: c0 - 75, y: baseY + 14, w: 150, text: '맨 앞', size: 16, weight: 700, align: 'center', cls: 'muted' });
        const lab2 = P.text({ x: c3 - 75, y: baseY + 14, w: 150, text: '가운데', size: 16, weight: 700, align: 'center', color: '#F2812D' });
        const lab3 = P.text({ x: c6 - 75, y: baseY + 14, w: 150, text: '맨 끝', size: 16, weight: 700, align: 'center', cls: 'muted' });
        [lab1, lab2, lab3].forEach(l => tl.at(stage.appendChild(l.el), 6.0, { from: 'up' }));
        const callout = P.chip({ x: c3 - 90, y: baseY - heights[3] * 2.1 - 60, text: '여기를 놓치기 쉬워요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(callout.el), 10.3, { from: 'pop' });
        return { tick(t) { q.tick(t, t < 5 || t > 10); } };
      }
    },
    {
      title: '정리: 어디에 둘까', dur: 12,
      captions: [
        { t: 0, text: 'AI는 모든 글자를 똑같이 보지 않아요. <em>어디에 두느냐</em>가 답을 바꿔요.' },
        { t: 4.5, text: '긴 자료는 <em>나눠서</em> 묻고, 근거 문장을 인용하게 해서 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 맨 앞에 지시', '중요한 지시는 자료보다 먼저 적어요'],
          ['② 질문은 뒤에 한 번 더', '자료 끝에 질문을 다시 적어요'],
          ['③ 나눠서 묻기', '긴 자료는 쪼개서 같은 질문을'],
          ['④ 근거 인용 확인', '"근거 문장을 그대로 인용해 줘"']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 380 + (i % 2) * 420, y: 110 + Math.floor(i / 2) * 170, w: 380, h: 140, label, sub, accent: i === 3 ? 'orange' : (i === 1 ? 'aqua' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 380, y: 480, w: 760, text: 'AI는 모든 글자를 <i>똑같이</i> 보지 않아요. <em>어디에 두느냐</em>가 답을 바꿔요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.0, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 4.4);
            items.forEach((b, i) => b.on(t > .3 + i * .7));
          }
        };
      }
    }
  ],

  interaction: {
    title: '어텐션 손전등',
    desc: '문장 속 한 낱말을 고르면, 그 낱말이 <b>다른 낱말을 얼마나 보는지</b> 가중치로 보여줘요. "손전등 켜기"를 누르면 가장 많이 보는 낱말이 가장 진하게 빛나요. 문장을 바꾸면 같은 \'그게\'도 가중치가 다른 낱말로 옮겨가요. 아래 슬라이더는 긴 자료에서 정답 위치에 따라 찾기 쉬운 정도가 달라지는 걸 보여주는 원리 그림이에요(실제 논문 수치가 아니에요).',
    mount(el, P) {
      const SENT = { A: { tokens: SENT_A, weights: W_A }, B: { tokens: SENT_B, weights: W_B } };
      const BASE_POS = [4, 3, 6];
      let cur = 'A', basePos = 4, lit = false;

      const sentLine = P.h('div', { class: 'sim-sentline' }, '');
      const chipsRow = P.h('div', { class: 'sim-chips' });
      const baseSel = P.h('select', { id: 'sim-base', 'aria-label': '기준 낱말' });
      const baseLab = P.h('label', { for: 'sim-base' }, '기준 낱말 ', baseSel);
      const litBtn = P.h('button', { class: 'btn primary', type: 'button' }, "'그게' 손전등 켜기");
      const swapBtn = P.h('button', { class: 'btn', type: 'button' }, '문장 바꾸기');
      const rows = Array.from({ length: 7 }, () => {
        const word = P.h('div', { class: 'sim-wword' }, '');
        const fill = P.h('i', {});
        const track = P.h('div', { class: 'sim-wtrack' }, fill);
        const pct = P.h('div', { class: 'sim-wpct' }, '');
        const row = P.h('div', { class: 'sim-wrow' }, word, track, pct);
        return { row, word, fill, pct };
      });

      const posRange = P.h('input', { type: 'range', id: 'sim-pos', min: '1', max: '20', step: '1', value: '10' });
      const posB = P.h('b', {}, '10');
      const posLab = P.h('label', { for: 'sim-pos' }, '정답 문서 위치 ', posB, ' / 20');
      const uWrap = P.h('div', { class: 'sim-u' });
      const uNote = P.h('div', { class: 'sim-unote' }, '');

      el.append(
        P.h('div', { class: 'sim-wrap' },
          P.h('div', { class: 'sim-card' },
            sentLine,
            chipsRow,
            P.h('div', { class: 'sim-ctrl' }, baseLab, litBtn, swapBtn),
            P.h('div', { class: 'sim-wlist' }, ...rows.map(r => r.row))
          ),
          P.h('div', { class: 'sim-card' },
            P.h('div', { class: 'sim-u-head' }, posLab, posRange),
            uWrap,
            uNote
          )
        )
      );
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
        .sim-sentline{font-size:14px;color:var(--muted);margin-bottom:8px;word-break:keep-all}
        .sim-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
        .sim-chip{display:inline-flex;padding:6px 12px;border-radius:10px;font-weight:700;font-size:15px;background:var(--paper);color:var(--ink);border:2px dashed transparent;transition:opacity .25s,background .25s,color .25s;word-break:keep-all}
        .sim-chip.is-base{border-color:var(--orange)}
        .sim-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}
        .sim-ctrl label{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:6px}
        .sim-ctrl select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:#fff}
        .sim-wlist{display:flex;flex-direction:column;gap:7px;max-width:100%}
        .sim-wrow{display:flex;align-items:center;gap:8px;max-width:100%}
        .sim-wword{flex:0 0 68px;width:68px;font-size:13px;color:var(--ink);word-break:keep-all}
        .sim-wtrack{flex:1 1 auto;min-width:0;height:10px;border-radius:999px;background:var(--paper);overflow:hidden}
        .sim-wtrack i{display:block;height:100%;width:4%;background:var(--faint);transition:width .35s,background .35s}
        .sim-wrow.is-top .sim-wtrack i{background:var(--orange)}
        .sim-wpct{flex:0 0 46px;width:46px;text-align:right;font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-u-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}
        .sim-u-head label{font-size:13px;color:var(--muted)}
        .sim-u-head input[type=range]{flex:1 1 160px;max-width:100%}
        .sim-u{display:flex;align-items:flex-end;gap:4px;height:70px;max-width:100%}
        .sim-ubar{flex:1 1 auto;min-width:0;background:var(--paper);border-radius:4px 4px 2px 2px;transition:height .25s,background .25s}
        .sim-ubar.is-cur{background:var(--aqua-deep)}
        .sim-unote{margin-top:8px;font-size:13px;color:var(--muted);word-break:keep-all}
      ` }));

      function rebuildSelect() {
        baseSel.innerHTML = '';
        BASE_POS.forEach(p => baseSel.append(P.h('option', { value: String(p) }, SENT[cur].tokens[p])));
        baseSel.value = String(basePos);
      }
      function renderSentence() {
        chipsRow.innerHTML = '';
        SENT[cur].tokens.forEach((w, i) => {
          const chip = P.h('span', { class: 'sim-chip' + (i === basePos ? ' is-base' : '') }, w);
          chipsRow.append(chip);
        });
        sentLine.textContent = '현재 문장: "' + SENT[cur].tokens.join(' ') + '"';
      }
      function renderWeights() {
        const w = lit ? SENT[cur].weights[basePos] : null;
        const max = w ? Math.max(...w) : 0;
        rows.forEach((r, i) => {
          r.word.textContent = SENT[cur].tokens[i];
          if (w) {
            r.fill.style.width = w[i] + '%';
            r.pct.textContent = w[i] + '%';
            r.row.classList.toggle('is-top', w[i] === max);
          } else {
            r.fill.style.width = '4%';
            r.pct.textContent = '—';
            r.row.classList.remove('is-top');
          }
        });
        Array.from(chipsRow.children).forEach((c, i) => {
          if (!w) { c.style.opacity = ''; c.style.background = ''; c.style.color = ''; return; }
          const ratio = w[i] / max;
          const isTop = w[i] === max;
          c.style.opacity = (0.4 + 0.6 * ratio).toFixed(2);
          c.style.background = isTop ? 'var(--aqua-deep)' : 'var(--paper)';
          c.style.color = isTop ? '#fff' : 'var(--ink)';
        });
        litBtn.textContent = `'${SENT[cur].tokens[basePos]}' 손전등 켜기`;
      }
      function renderU() {
        const HEIGHTS = [92, 88, 82, 74, 65, 56, 48, 42, 38, 36, 36, 38, 42, 48, 56, 65, 74, 82, 88, 92];
        const pos = +posRange.value;
        uWrap.innerHTML = '';
        HEIGHTS.forEach((h, i) => {
          const bar = P.h('div', { class: 'sim-ubar' + (i + 1 === pos ? ' is-cur' : ''), style: `height:${h}%` });
          uWrap.append(bar);
        });
        posB.textContent = String(pos);
        let label;
        if (pos <= 3 || pos >= 18) label = '맨 앞/맨 끝: 정답을 잘 찾아요(높음)';
        else if (pos >= 9 && pos <= 12) label = '가운데: 놓치기 쉬워요(낮음)';
        else label = '중간 지대: 보통이에요';
        uNote.textContent = `${pos}번째 위치 — ${label}`;
      }

      baseSel.addEventListener('change', () => { basePos = +baseSel.value; lit = false; renderSentence(); renderWeights(); });
      litBtn.addEventListener('click', () => { lit = true; renderWeights(); });
      swapBtn.addEventListener('click', () => {
        cur = cur === 'A' ? 'B' : 'A';
        lit = false;
        rebuildSelect();
        renderSentence();
        renderWeights();
      });
      posRange.addEventListener('input', renderU);

      rebuildSelect();
      renderSentence();
      renderWeights();
      renderU();
    }
  },

  teacherLines: [
    'AI는 낱말 하나를 읽을 때 <b>다른 낱말을 얼마나 볼지</b> 점수를 매겨서 뜻을 정해요.',
    '긴 자료를 줄 때는 <b>중요한 건 맨 앞이나 맨 끝</b>에 두고, 가운데는 나눠서 물어봐요.'
  ],
  tip: {
    body: '가정통신문·규정집처럼 긴 자료를 붙여 넣을 때는 지시와 질문을 자료 <b>앞에 쓰고 끝에 한 번 더</b> 적으세요. 답에는 "근거 문장을 그대로 인용해 줘"를 붙여 실제로 찾았는지 확인해요.',
    extra: '30쪽짜리 자료라면 10쪽씩 나눠 같은 질문을 하고 답을 합치는 편이 가운데를 덜 놓쳐요.'
  },
  myth: {
    myth: '자료를 길게 많이 넣어 줄수록 AI가 더 정확해진다.',
    fact: '정답이 긴 자료의 <b>가운데</b>에 있으면 오히려 놓치기 쉬워요. 2023년 연구에서는 자료를 안 줬을 때보다 정답률이 낮아진 경우도 있었어요.'
  },
  sources: [
    { title: 'Attention Is All You Need (arXiv, 2017)', url: 'https://arxiv.org/abs/1706.03762', note: '트랜스포머와 어텐션(질의·키·값, 멀티헤드, 위치 인코딩)을 제안.' },
    { title: 'Lost in the Middle: How Language Models Use Long Contexts (arXiv, 2023, TACL)', url: 'https://arxiv.org/abs/2307.03172', note: '긴 입력의 가운데 정보를 놓치는 U자 성능 곡선.' },
    { title: 'On the Emergence of Position Bias in Transformers (arXiv, 2025, ICML 2025)', url: 'https://arxiv.org/abs/2502.01951', note: '인과 마스킹이 앞쪽 위치로 어텐션을 기울게 한다는 이론 분석.' },
    { title: 'Lost in the Middle: An Emergent Property from Information Retrieval Demands in LLMs (arXiv, 2025)', url: 'https://arxiv.org/abs/2510.10276', note: '중간 손실을 사전학습 과제 요구에 대한 적응으로 설명.' }
  ],
  script: `"쿼카가 공책을 가방에 넣었는데 그게 너무 컸다." 여기서 '그게'가 가방인지 공책인지, AI는 다른 낱말을 얼마나 볼지 점수를 매겨서 정해요.

낱말마다 질문·이름표·내용이라는 숫자 묶음을 만들고, 질문과 이름표가 맞을수록 큰 점수를 줘요. 점수 합이 100퍼센트가 되게 나누는 걸 소프트맥스, 그 비율로 내용을 섞는 걸 어텐션이라고 해요. 2017년 연구는 이 어텐션만으로 번역 모델을 만들었고, 지금 대화형 AI 대부분이 이 트랜스포머 구조 위에 있어요.

그런데 자료가 길면 함정이 있어요. 정답이 맨 앞이나 끝에 있으면 잘 찾지만 가운데면 놓치기 쉬워요. 2023년 연구에서는 문서 20개 중 정답이 가운데 있을 때 아예 안 준 것보다 정답률이 낮은 모델도 있었어요.

그러니 지시는 자료 앞에, 질문은 끝에 한 번 더 적고, 길면 나눠서 묻고 "근거 문장을 그대로 인용해 줘"로 확인하세요.`
};
