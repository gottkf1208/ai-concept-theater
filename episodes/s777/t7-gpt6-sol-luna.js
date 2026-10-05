/* S777-42 큰 모델과 작은 모델을 함께 내놓는 이유: 모델 티어와 토큰 단가 계산 */
export default {
  slug: 't7-gpt6-sol-luna',
  track: 'S777',
  title: '큰 모델과 작은 모델을 함께 내놓는 이유',
  subtitle: '모델 티어와 토큰 단가 계산',
  summary: '9월 22일 OpenAI가 GPT-6 Sol과 GPT-6 Luna를 함께 내놓았고, 29일엔 GPT-6.1 Sol이 나왔어요. 토큰 단가가 정확히 20배 차이 나는 두 모델을 왜 같이 낼까요? 100만 토큰당 가격으로 학교 업무 비용을 직접 계산하고, 작은 모델부터 쓰고 어려운 것만 넘기는 계단식 선택법까지 짚어요.',
  keywords: ['GPT-6 Sol', 'GPT-6 Luna', 'GPT-6.1 Sol', 'GPT-6 Astra', 'OpenAI', '모델 티어', '토큰 단가', '100만 토큰당 가격', '입력 토큰', '출력 토큰', '긴 컨텍스트 가격', '배치 할인', '계단식 선택', '캐스케이드', 'FrugalGPT'],

  scenes: [
    {
      title: '같은 날 나온 두 모델', dur: 13,
      captions: [
        { t: 0, text: '9월 22일 OpenAI가 <em>GPT-6 Sol</em>과 <em>GPT-6 Luna</em>를 함께 내놓았어요. 공식 요약은 "능력과 비용의 균형이 서로 다른 두 모델"이에요.' },
        { t: 6, text: '100만 토큰당 값을 보면 Sol이 Luna의 <em>정확히 20배</em>예요.' },
        { t: 9.3, text: '일주일 뒤 29일엔 최상위 Astra 단가의 <em>5분의 1</em>인 GPT-6.1 Sol도 나왔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const unit = P.text({ x: 360, y: 88, w: 840, text: '100만 토큰당 달러 · 입력 / 출력', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(unit.el), .3, { from: 'none' });
        const boxes = [
          ['GPT-6 Luna', '$0.10 / $0.50', 'aqua'],
          ['GPT-6 Sol', '$2 / $10', 'orange'],
          ['GPT-6 Astra', '$10 / $50', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + i * 290, y: 130, w: 260, h: 130, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .5 + i * .7, { from: 'up' });
          return b;
        });
        const twenty = P.chip({ x: 360, y: 300, text: 'Sol ÷ Luna = 입력·출력 모두 정확히 20배', color: 'orange', size: 22 });
        tl.at(stage.appendChild(twenty.el), 6.2, { from: 'pop' });
        const s61 = P.chip({ x: 360, y: 360, text: '9월 29일 GPT-6.1 Sol: Astra 단가의 1/5', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(s61.el), 9.5, { from: 'pop' });
        const ask = P.text({ x: 360, y: 450, w: 840, text: '왜 <em>여러 등급</em>을 함께 낼까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(ask.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.6 || t > 9.2);
            boxes[0].on(t > 6 && t < 9.3);
            boxes[1].on(t > 6 && t < 9.3);
            boxes[2].on(t > 9.3);
          }
        };
      }
    },
    {
      title: '100만 토큰당 가격 읽는 법', dur: 14,
      captions: [
        { t: 0, text: '가격표의 MTok은 <em>100만 토큰</em>이에요. 보내는 글(입력)과 받는 글(출력)은 단가를 따로 매기는데 출력이 입력의 5배예요.' },
        { t: 5.5, text: '예시로 학생 소감문 1,000편(입력 150만·출력 30만 토큰)을 계산하면 Luna는 <em>0.30달러</em>, Sol은 <em>6달러</em>예요.' },
        { t: 10.3, text: '한 번에 <em>27.2만 토큰</em>보다 많이 넣으면 긴 컨텍스트 가격이 붙어 입력 단가가 두 배가 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const inB = P.box({ x: 360, y: 90, w: 380, h: 110, label: '입력 토큰', sub: '보내는 글 · 기준 단가', accent: 'aqua' });
        const outB = P.box({ x: 780, y: 90, w: 380, h: 110, label: '출력 토큰', sub: '받는 글 · 입력 단가의 5배', accent: 'orange' });
        tl.at(stage.appendChild(inB.el), .4, { from: 'up' });
        tl.at(stage.appendChild(outB.el), 2.2, { from: 'up' });
        const ex = P.text({ x: 360, y: 235, w: 840, text: '예시: 소감문 1,000편 = 입력 150만 · 출력 30만 토큰', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(ex.el), 5.6, { from: 'none' });
        const l1 = P.text({ x: 360, y: 285, w: 840, text: 'Luna: 1.5 × $0.10 + 0.3 × $0.50 = <i>$0.30</i>', size: 28, weight: 800 });
        const l2 = P.text({ x: 360, y: 345, w: 840, text: 'Sol: 1.5 × $2 + 0.3 × $10 = <em>$6.00</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(l1.el), 6.3, { from: 'left' });
        tl.at(stage.appendChild(l2.el), 7.6, { from: 'left' });
        const long = P.chip({ x: 360, y: 440, text: '한 번에 27.2만 토큰 넘게 넣으면 입력 단가 2배', color: 'ink', size: 22 });
        tl.at(stage.appendChild(long.el), 10.5, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10.2);
            inB.on(t > .4 && t < 5.5);
            outB.on(t > 2.2 && t < 5.5);
          }
        };
      }
    },
    {
      title: '왜 여러 등급으로 내나', dur: 13,
      captions: [
        { t: 0, text: '공식 안내는 가장 어려운 추론엔 <em>Astra</em>, 능력과 비용의 균형엔 <em>Sol</em>, 비용이 중요한 대량 처리엔 <em>Luna</em>를 권해요.' },
        { t: 6.5, text: 'Anthropic 가격 문서도 단순한 일은 Haiku, 대부분의 일은 Sonnet, 가장 복잡한 추론은 Opus로 똑같이 나눠요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'think' });
        stage.append(q.el);
        const ax = P.arrow(lines, { x1: 400, y1: 520, x2: 1190, y2: 520, width: 3, color: '#9AA5AF' });
        const ay = P.arrow(lines, { x1: 400, y1: 520, x2: 400, y2: 100, width: 3, color: '#9AA5AF' });
        const xl = P.text({ x: 1060, y: 532, w: 130, text: '일의 양', size: 20, weight: 700, align: 'right', cls: 'muted' });
        const yl = P.text({ x: 416, y: 92, w: 140, text: '난이도', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(xl.el), .4, { from: 'none' });
        tl.at(stage.appendChild(yl.el), .4, { from: 'none' });
        const tiers = [
          ['Astra · 가장 어려운 추론', 440, 150, 'ink'],
          ['Sol · 능력과 비용의 균형', 620, 300, 'orange'],
          ['Luna · 비용 중요한 대량 처리', 800, 440, 'aqua']
        ].map(([text, x, y, color], i) => {
          const c = P.chip({ x, y, text, color, size: 22 });
          tl.at(stage.appendChild(c.el), 1.2 + i * 1.4, { from: 'pop' });
          return c;
        });
        const claude = P.text({ x: 420, y: 585, w: 780, text: 'Claude 가격 문서도: Haiku · Sonnet · Opus', size: 22, weight: 700 });
        tl.at(stage.appendChild(claude.el), 6.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 6.5);
            ax.draw(P.clamp((t - .2) / .6, 0, 1));
            ay.draw(P.clamp((t - .2) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '점수 차이와 값 차이', dur: 14,
      captions: [
        { t: 0, text: '10월 5일 기준 외부 실무 과제 표(GDPval-AA)에서 최고 노력 수준끼리 보면 Sol 1509점, Luna 1438점이에요.' },
        { t: 5, text: '단가는 20배인데 점수 차이는 <em>71점</em>이에요. 다만 시험 하나로 잰 결과예요.' },
        { t: 9.5, text: 'GPT-6.1 Sol은 Astra 단가의 5분의 1인데, 같은 표에서 Astra(1542점)보다 높은 <em>1575점</em>이었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'point' });
        stage.append(q.el);
        const g1 = P.text({ x: 360, y: 84, w: 840, text: '출력 단가 (100만 토큰당)', size: 22, weight: 800 });
        const g2 = P.text({ x: 360, y: 250, w: 840, text: '점수 (GDPval-AA, 10월 5일 공개 표)', size: 22, weight: 800 });
        tl.at(stage.appendChild(g1.el), .3, { from: 'none' });
        tl.at(stage.appendChild(g2.el), 1.8, { from: 'none' });
        const ROWS = [
          { name: 'Luna', y: 130, w: 20, val: '$0.50', t0: .6, color: '#127E90' },
          { name: 'Sol', y: 175, w: 400, val: '$10', t0: 1.0, color: '#F2812D' },
          { name: 'Luna', y: 296, w: 381, val: '1438', t0: 2.1, color: '#127E90' },
          { name: 'Sol', y: 341, w: 400, val: '1509', t0: 2.5, color: '#F2812D' }
        ];
        const rows = ROWS.map(r => {
          const lab = P.text({ x: 360, y: r.y - 2, w: 80, text: r.name, size: 20, weight: 700 });
          tl.at(stage.appendChild(lab.el), r.t0, { from: 'none' });
          const bar = P.h('div', { style: `position:absolute;left:450px;top:${r.y}px;width:0px;height:28px;border-radius:6px;background:${r.color}` });
          stage.append(bar);
          const val = P.text({ x: 450 + r.w + 14, y: r.y - 2, w: 110, text: r.val, size: 20, weight: 800 });
          tl.at(stage.appendChild(val.el), r.t0 + .6, { from: 'pop' });
          return { ...r, bar };
        });
        const box = P.box({ x: 360, y: 410, w: 420, h: 120, label: '6.1 Sol 1575점', sub: 'Astra 1542점 · 단가 5분의 1', accent: 'aqua' });
        tl.at(stage.appendChild(box.el), 9.7, { from: 'up' });
        const final = P.text({ x: 360, y: 560, w: 860, text: '비싼 등급이 늘 <em>값만큼</em> 더 잘하는 건 아니에요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.4);
            rows.forEach(r => { r.bar.style.width = Math.round(r.w * P.easeOut(P.clamp((t - r.t0) / .7, 0, 1))) + 'px'; });
            box.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '교실 판단: 계단식으로 고르기', dur: 13,
      captions: [
        { t: 0, text: '2023년 연구는 싼 모델로 먼저 해 보고 필요한 것만 비싼 모델로 넘기는 <em>계단식 선택</em>을 시험했어요.' },
        { t: 4.8, text: '실험에서는 GPT-4와 비슷한 성능을 내면서 <em>비용을 최대 98%</em> 줄였어요.' },
        { t: 8.5, text: '분류·요약·형식 바꾸기는 <em>작은 등급으로 먼저</em>, 평가 기준 설계나 긴 추론은 큰 등급에 맡겨요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const head = P.text({ x: 380, y: 92, w: 820, text: '쉬운 일은 <em>작은 등급부터</em>', size: 32, weight: 800 });
        tl.at(stage.appendChild(head.el), .3, { from: 'up' });
        const low = P.box({ x: 380, y: 400, w: 340, h: 130, label: 'Luna로 먼저', sub: '분류 · 요약 · 형식 바꾸기', accent: 'aqua' });
        const high = P.box({ x: 820, y: 200, w: 380, h: 130, label: '어려운 것만 위로', sub: 'Sol · Astra: 기준 설계, 긴 추론', accent: 'orange' });
        tl.at(stage.appendChild(low.el), 1.2, { from: 'up' });
        tl.at(stage.appendChild(high.el), 2.6, { from: 'up' });
        const step = P.arrow(lines, { x1: 725, y1: 450, x2: 815, y2: 300, curve: -20, dashed: true, width: 3, color: '#1B1F24' });
        const res = P.chip({ x: 820, y: 400, text: '연구 실험: 비용 최대 98%↓', color: 'gray', size: 22 });
        tl.at(stage.appendChild(res.el), 5, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            step.draw(P.clamp((t - 2.2) / .6, 0, 1));
            low.on(t > 8.5);
            high.on(t > 10);
          }
        };
      }
    }
  ],

  interaction: {
    title: '학교 업무 토큰 계산기',
    desc: '업무와 건수를 고르고 "네 모델로 계산"을 눌러 보세요. 모델별 비용과 <b>가장 싼 것 대비 몇 배</b>인지 나와요. <b>배치 할인</b>과 <b>계단식(80%는 Luna, 20%만 Sol)</b>도 켜 보세요.',
    mount(el, P) {
      const MODELS = [
        { id: 'luna', name: 'GPT-6 Luna', in: .10, out: .50, color: '#127E90' },
        { id: 'sol', name: 'GPT-6 Sol', in: 2, out: 10, color: '#F2812D' },
        { id: 'sol61', name: 'GPT-6.1 Sol', in: 2, out: 10, color: '#F2812D' },
        { id: 'astra', name: 'GPT-6 Astra', in: 10, out: 50, color: '#1B1F24' }
      ];
      const TASKS = [
        { id: 'reflect', label: '학생 소감문 분류 (편당 입력 1,500 · 출력 300 토큰)', in: 1500, out: 300 },
        { id: 'summary', label: '연수 자료 요약 (건당 입력 40,000 · 출력 2,000 토큰)', in: 40000, out: 2000 },
        { id: 'rubric', label: '루브릭 초안 고쳐 쓰기 (회당 입력 8,000 · 출력 2,000 토큰)', in: 8000, out: 2000 }
      ];
      let task = 'reflect', count = 1000, batch = false, cascade = false, computed = false;

      const sel = P.h('select', { id: 'sim-t42-task' }, ...TASKS.map(t => P.h('option', { value: t.id }, t.label)));
      const selLab = P.h('label', { for: 'sim-t42-task', class: 'sim-t42-l' }, '업무(예시 값)');
      const range = P.h('input', { type: 'range', id: 'sim-t42-n', min: '100', max: '2000', step: '100', value: String(count) });
      const nVal = P.h('b', {}, '');
      const rangeLab = P.h('label', { for: 'sim-t42-n', class: 'sim-t42-l' }, '건수 ', nVal);
      const batchCb = P.h('input', { type: 'checkbox', id: 'sim-t42-batch' });
      const cascadeCb = P.h('input', { type: 'checkbox', id: 'sim-t42-cas' });
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '네 모델로 계산');
      const result = P.h('div', { class: 'sim-t42-res' });

      el.append(P.h('div', { class: 'sim-t42' },
        P.h('div', { class: 'sim-t42-row' }, selLab, sel),
        P.h('div', { class: 'sim-t42-row' }, rangeLab, range),
        P.h('div', { class: 'sim-t42-row' },
          P.h('label', { for: 'sim-t42-batch', class: 'sim-t42-cb' }, batchCb, '급하지 않음(Batch 50% 할인)'),
          P.h('label', { for: 'sim-t42-cas', class: 'sim-t42-cb' }, cascadeCb, '계단식: 80%는 Luna, 20%만 Sol로')),
        P.h('div', { class: 'sim-t42-row' }, runBtn),
        result,
        P.h('p', { class: 'sim-t42-note' }, '가격은 2026-10-05 OpenAI 공식 가격표(입력 27.2만 토큰 이하) 기준. 업무별 토큰 수와 80:20 비율은 예시 값이에요.')
      ));
      el.append(P.h('style', { html: `
        .sim-t42{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-t42-row{display:flex;align-items:center;gap:10px 16px;flex-wrap:wrap;max-width:100%}
        .sim-t42-l{font-size:13.5px;color:var(--muted)}
        .sim-t42-row select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:#fff;max-width:100%;min-width:0}
        .sim-t42-row input[type=range]{flex:1 1 160px;max-width:100%;accent-color:#127E90}
        .sim-t42-cb{display:flex;align-items:center;gap:6px;font-size:13.5px;line-height:1.4}
        .sim-t42-res{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff;display:flex;flex-direction:column;gap:9px;font-size:14px;line-height:1.5}
        .sim-t42-bar{display:flex;align-items:center;gap:8px 10px;flex-wrap:wrap}
        .sim-t42-bar .n{flex:0 0 100px;font-weight:700}
        .sim-t42-bar .track{flex:1 1 110px;height:14px;border-radius:7px;background:var(--paper);overflow:hidden;min-width:80px}
        .sim-t42-bar .fill{display:block;height:100%;border-radius:7px}
        .sim-t42-bar .v{font-family:var(--mono);font-size:13px;font-weight:800}
        .sim-t42-bar .x{font-size:12.5px;color:var(--muted)}
        .sim-t42-mix{border-left:4px solid #127E90;padding:6px 10px;background:var(--paper);border-radius:6px}
        .sim-t42-note{font-size:12.5px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px;margin:0;line-height:1.6}
      ` }));

      const money = v => v < 1 ? `$${v.toFixed(3)}` : `$${v.toFixed(2)}`;
      const costOf = (m, tk) => count * (tk.in * m.in + tk.out * m.out) / 1e6 * (batch ? .5 : 1);
      function render() {
        nVal.textContent = `${count.toLocaleString('ko-KR')}건`;
        if (!computed) {
          result.replaceChildren(P.h('div', {}, '"네 모델로 계산"을 누르면 모델별 비용이 나와요.'));
          return;
        }
        const tk = TASKS.find(t => t.id === task);
        const costs = MODELS.map(m => ({ m, c: costOf(m, tk) }));
        const min = Math.min(...costs.map(x => x.c));
        const max = Math.max(...costs.map(x => x.c));
        const kids = costs.map(({ m, c }) => P.h('div', { class: 'sim-t42-bar' },
          P.h('span', { class: 'n' }, m.name),
          P.h('span', { class: 'track' }, P.h('span', { class: 'fill', style: `width:${Math.max(1, 100 * c / max).toFixed(1)}%;background:${m.color}` })),
          P.h('span', { class: 'v' }, money(c)),
          P.h('span', { class: 'x' }, `가장 싼 것의 ${Math.round(c / min)}배`)));
        if (cascade) {
          const luna = costs[0].c, sol = costs[1].c;
          const mix = .8 * luna + .2 * sol;
          kids.push(P.h('div', { class: 'sim-t42-mix' }, `계단식 혼합: 0.8 × ${money(luna)} + 0.2 × ${money(sol)} = `, P.h('b', {}, money(mix)), ` (모두 Sol일 때의 ${Math.round(100 * mix / sol)}%)`));
        }
        result.replaceChildren(...kids);
      }
      sel.addEventListener('change', () => { task = sel.value; render(); });
      range.addEventListener('input', () => { count = +range.value; render(); });
      batchCb.addEventListener('change', () => { batch = batchCb.checked; render(); });
      cascadeCb.addEventListener('change', () => { cascade = cascadeCb.checked; render(); });
      runBtn.addEventListener('click', () => { computed = true; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 값은 <b>100만 토큰당 가격</b>으로 매겨요. 같은 일도 모델 등급에 따라 20배까지 차이 나요.',
    '쉬운 일은 <b>작은 등급으로 먼저</b>, 어려운 일만 큰 등급으로 넘겨요.'
  ],
  tip: {
    body: '학교 업무에 API를 쓸 때는 같은 과제 20건을 작은 등급과 큰 등급으로 각각 돌려 결과를 비교하고, <b>작은 등급으로 충분한 업무 목록</b>을 만들어 두세요.',
    extra: '비용은 입력과 출력을 따로 계산해요. 출력 단가가 입력의 5배라 긴 답을 받는 일이 더 비싸요. 결과가 당장 필요 없으면 배치 처리로 50% 할인을 받을 수 있어요.'
  },
  myth: {
    myth: '작은 등급 모델은 기능을 줄인 체험판이다.',
    fact: '대량·반복 업무용으로 따로 내놓은 정식 모델이에요. 10월 5일 기준 외부 표에서 Luna는 단가가 Sol의 20분의 1인데, 최고 노력 수준끼리 점수 차이는 71점이었어요.'
  },
  sources: [
    { title: 'OpenAI API Changelog', url: 'https://developers.openai.com/api/docs/changelog', note: '9월 22일 GPT-6 Sol·Luna 가격, 9월 29일 GPT-6.1 Sol 가격, 입력 27.2만 토큰 기준.' },
    { title: 'OpenAI API Models', url: 'https://developers.openai.com/api/docs/models', note: 'Astra·Sol·Luna 용도 설명과 고르기 안내.' },
    { title: 'OpenAI: Introducing GPT-6 Sol and Luna (2026-09-22, 공식 RSS 요약 확인)', url: 'https://openai.com/index/introducing-gpt-6-sol-and-luna', note: '능력과 비용의 균형이 서로 다른 두 모델이라는 공식 요약.' },
    { title: 'FrugalGPT (arXiv 2305.05176, 2023)', url: 'https://arxiv.org/abs/2305.05176', note: 'LLM API 요금이 100배 수준까지 차이 나고, 싼 모델부터 쓰는 계단식 선택으로 비용을 크게 줄인 연구.' }
  ],
  script: `9월 22일 OpenAI가 GPT-6 Sol과 Luna를 함께 내놓았어요. 100만 토큰당 값은 Sol이 Luna의 정확히 20배예요. 29일엔 Astra 단가의 5분의 1인 GPT-6.1 Sol도 나왔어요.

입력과 출력 단가는 따로이고 출력이 입력의 5배예요. 예시로 소감문 1,000편을 계산하면 Luna는 0.30달러, Sol은 6달러예요.

공식 안내는 가장 어려운 추론엔 Astra, 균형엔 Sol, 대량 처리엔 Luna를 권해요. 10월 5일 기준 외부 실무 과제 표에서 최고 노력 수준끼리 보면 Sol 1509점, Luna 1438점이에요. 값은 20배인데 점수 차이는 71점이에요.

2023년 연구는 싼 모델로 먼저 해 보고 필요한 것만 비싼 모델로 넘기는 계단식 선택으로 비용을 크게 줄였어요. 분류와 요약은 작은 등급으로 먼저, 어려운 일만 큰 등급으로 넘겨 보세요.`
};
