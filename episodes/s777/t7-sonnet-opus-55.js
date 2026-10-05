/* S777-41 같은 값에 더 빠른 새 모델, 뭐가 달라졌을까: 발표문 숫자 읽기(벤치마크·가격·속도) */
export default {
  slug: 't7-sonnet-opus-55',
  track: 'S777',
  title: '같은 값에 더 빠른 새 모델, 뭐가 달라졌을까',
  subtitle: '발표문 숫자 읽기: 벤치마크·가격·속도',
  summary: '9월 22일 Claude Opus 5.5, 9월 28일 Claude Sonnet 5.5가 나왔어요. "40% 저렴", "30% 넘게 빠름", "70.6%" 같은 숫자는 누가, 어떤 설정으로 쟀을까요? 토큰 단가와 작업당 비용이 왜 다른지, 오차 범위 안의 2점 차이를 어떻게 읽을지 발표문과 외부 평가 표로 직접 읽어 봐요.',
  keywords: ['Claude Opus 5.5', 'Claude Sonnet 5.5', 'Anthropic', '벤치마크', 'Terminal-Bench', 'GDPval-AA', 'Elo', '신뢰구간', '오차 범위', '토큰 단가', '작업당 비용', '회사 자체 시험', '노력 수준', 'Artificial Analysis', '평가 카드'],

  scenes: [
    {
      title: '9월의 두 발표', dur: 13,
      captions: [
        { t: 0, text: '9월 22일 Anthropic이 <em>Claude Opus 5.5</em>를, 9월 28일엔 <em>Claude Sonnet 5.5</em>를 발표했어요.' },
        { t: 5, text: '발표문에는 "흔한 작업에서 40% 저렴", "출력 30% 넘게 빠름", "Sonnet 5와 같은 값" 같은 숫자가 붙어 있어요.' },
        { t: 9.5, text: '이 숫자들은 <em>누가, 어떤 설정으로</em> 쟀을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const opus = P.box({ x: 380, y: 100, w: 380, h: 140, label: 'Opus 5.5', sub: '9월 22일 · 입력 $4·출력 $20', accent: 'aqua', icon: P.ICON.brain });
        const sonnet = P.box({ x: 800, y: 100, w: 380, h: 140, label: 'Sonnet 5.5', sub: '9월 28일 · 입력 $2·출력 $10', accent: 'orange', icon: P.ICON.brain });
        tl.at(stage.appendChild(opus.el), .3, { from: 'up' });
        tl.at(stage.appendChild(sonnet.el), 1.6, { from: 'up' });
        const unit = P.text({ x: 380, y: 258, w: 800, text: '가격 단위: 100만 토큰당 달러', size: 19, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(unit.el), 2.2, { from: 'none' });
        const chips = [
          ['작업당 40%↓', 380, 'aqua'],
          ['출력 30%+ 빠름', 570, 'aqua'],
          ['Sonnet 5와 같은 값', 800, 'orange']
        ].map(([text, x, color], i) => {
          const c = P.chip({ x, y: 320, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), 5.2 + i * .6, { from: 'pop' });
          return c;
        });
        const ask = P.text({ x: 380, y: 420, w: 800, text: '이 숫자, <em>누가</em> 쟀을까요?', size: 34, weight: 800 });
        tl.at(stage.appendChild(ask.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.4);
            opus.on(t > .3 && t < 5);
            sonnet.on(t > 1.6 && t < 5);
          }
        };
      }
    },
    {
      title: '단가와 작업당 비용은 달라요', dur: 14,
      captions: [
        { t: 0, text: 'AI 요금은 <em>토큰 수 × 토큰 단가</em>예요. 토큰은 지난 편에서 봤듯 AI가 글을 잘라 세는 단위예요.' },
        { t: 5, text: 'Opus 5.5는 단가가 20% 내렸는데 회사 자체 시험에서 흔한 작업 비용은 40% 줄었어요. 같은 일을 <em>더 적은 토큰</em>으로 끝낸 효과까지 합친 값이에요.' },
        { t: 10, text: 'Sonnet 5.5는 단가가 그대로인데 대부분의 일에서 최대 30% 싸다고 해요. 단가가 같으니 차이는 <em>쓰는 토큰 수</em>에서 나와요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const parts = [
          ['토큰 수', '얼마나 썼나', 'ink'],
          ['토큰 단가', '100만 토큰당 값', 'aqua'],
          ['작업당 비용', '일 하나에 든 돈', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + i * 290, y: 110, w: 240, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const ops = ['×', '='].map((s, i) => {
          const o = P.text({ x: 604 + i * 290, y: 146, w: 42, text: s, size: 36, weight: 800, align: 'center' });
          tl.at(stage.appendChild(o.el), .8 + i * .7, { from: 'pop' });
          return o;
        });
        const l1 = P.text({ x: 360, y: 290, w: 860, text: 'Opus 5.5: 단가 <em>20%↓</em> + 토큰↓ → 작업당 <em>40%↓</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(l1.el), 5.3, { from: 'left' });
        const l2 = P.text({ x: 360, y: 370, w: 860, text: 'Sonnet 5.5: 단가 그대로 + 토큰↓ → 최대 <i>30%↓</i>', size: 28, weight: 800 });
        tl.at(stage.appendChild(l2.el), 10.2, { from: 'left' });
        const note = P.text({ x: 360, y: 460, w: 860, text: '40%와 30%는 회사가 흔한 작업으로 직접 시험해 잰 값이에요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 11.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 4.8);
            parts.forEach((b, i) => b.on(t > .3 + i * .7 && t < 5));
          }
        };
      }
    },
    {
      title: '누가, 어떤 설정으로 쟀나', dur: 14,
      captions: [
        { t: 0, text: '터미널 코딩 시험 Terminal-Bench는 <em>회사가 직접</em> 쟀고, 실무 과제 시험 GDPval-AA는 <em>외부 기관</em> Artificial Analysis가 돌렸어요.' },
        { t: 5, text: 'Opus 5.5 발표 점수는 <em>높은 노력 수준</em>(max·xhigh)에서 쟀어요. 노력 수준은 지난 편에서 봤듯 얼마나 깊게 생각할지 정하는 설정이에요.' },
        { t: 9.8, text: '10월 5일 기준 공개 표에서 같은 Opus 5.5도 노력 수준에 따라 <em>1236점부터 1867점</em>까지 벌어져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'point' });
        stage.append(q.el);
        const c1 = P.chip({ x: 360, y: 92, text: 'Terminal-Bench · 회사 자체 시험', color: 'ink', size: 20 });
        const c2 = P.chip({ x: 760, y: 92, text: 'GDPval-AA · 외부 기관', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(c1.el), .3, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 2.4, { from: 'pop' });
        const cap = P.text({ x: 400, y: 160, w: 800, text: 'Opus 5.5, 같은 모델 · 설정만 다름 (10월 5일 공개 표)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(cap.el), 5.2, { from: 'none' });
        const DATA = [['Low', 1236], ['Medium', 1586], ['High', 1707], ['Xhigh', 1837], ['Max', 1867]];
        const BASE = 600, SCALE = 300 / 900;
        const bars = DATA.map(([name, v], i) => {
          const x = 420 + i * 150;
          const full = Math.round((v - 1000) * SCALE);
          const bar = P.h('div', { style: `position:absolute;left:${x}px;top:${BASE}px;width:110px;height:0px;border-radius:10px 10px 0 0;background:${i === 4 ? '#F2812D' : '#127E90'};opacity:${i === 4 ? 1 : .75}` });
          stage.append(bar);
          const val = P.text({ x, y: BASE - full - 38, w: 110, text: String(v), size: 22, weight: 800, align: 'center' });
          const lab = P.text({ x, y: BASE + 8, w: 110, text: name, size: 18, weight: 700, align: 'center', cls: 'muted' });
          tl.at(stage.appendChild(lab.el), 5.4, { from: 'none' });
          tl.at(stage.appendChild(val.el), 5.9 + i * .5, { from: 'pop' });
          return { bar, full, start: 5.4 + i * .5 };
        });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.6);
            bars.forEach(b => {
              const k = P.easeOut(P.clamp((t - b.start) / .8, 0, 1));
              const hgt = Math.round(b.full * k);
              b.bar.style.height = hgt + 'px';
              b.bar.style.top = (BASE - hgt) + 'px';
            });
          }
        };
      }
    },
    {
      title: '2점 차이와 오차 범위', dur: 13,
      captions: [
        { t: 0, text: '실무 과제 시험 발표 점수는 Opus 5.5가 1846점, Sonnet 5.5가 1844점이에요. 2점 차이예요.' },
        { t: 4.5, text: '그런데 이 표의 <em>신뢰구간</em>, 즉 점수가 흔들릴 수 있는 폭이 ±25점 안팎이에요. 2점으로 순위를 말하긴 어려워요.' },
        { t: 9, text: '터미널 코딩 시험에선 오히려 Sonnet 5.5가 <em>70.6%</em>로 Opus 5.5(66.4%)보다 높았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'think' });
        stage.append(q.el);
        const X = v => 380 + (v - 1800) * 6.25;
        const rows = [['Opus 5.5 · 1846점', 1846, 120], ['Sonnet 5.5 · 1844점', 1844, 240]].map(([label, v, y], i) => {
          const lab = P.text({ x: 360, y, w: 480, text: label, size: 22, weight: 800 });
          tl.at(stage.appendChild(lab.el), .3 + i * .8, { from: 'left' });
          const band = P.h('div', { style: `position:absolute;left:${X(v - 25)}px;top:${y + 48}px;width:${X(v + 25) - X(v - 25)}px;height:16px;border-radius:8px;background:#127E90;opacity:0` });
          const dot = P.h('div', { style: `position:absolute;left:${X(v) - 11}px;top:${y + 45}px;width:22px;height:22px;border-radius:50%;background:${i === 0 ? '#1B1F24' : '#F2812D'};opacity:0` });
          stage.append(band, dot);
          return { band, dot, t0: .3 + i * .8 };
        });
        const legend = P.text({ x: 360, y: 330, w: 520, text: '점 = 발표 점수, 띠 = ±25점 안팎(신뢰구간)', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(legend.el), 4.8, { from: 'none' });
        const tb = P.box({ x: 920, y: 110, w: 300, h: 190, label: '터미널 코딩 시험', sub: 'Terminal-Bench 4.0<br>Sonnet 5.5 70.6%<br>Opus 5.5 66.4%', accent: 'orange' });
        tl.at(stage.appendChild(tb.el), 9.2, { from: 'right' });
        const final = P.text({ x: 360, y: 430, w: 860, text: '비슷한 점수도 <em>다른 조건</em>에서 나올 수 있어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.6, { from: 'up' });
        const card = P.chip({ x: 360, y: 500, text: '9월 22일 공개된 평가 카드가 짚은 문제', color: 'gray', size: 18 });
        tl.at(stage.appendChild(card.el), 11.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 4.3);
            rows.forEach(r => {
              r.dot.style.opacity = t > r.t0 + .2 ? 1 : 0;
              r.band.style.opacity = P.clamp((t - 4.8) / .6, 0, 1) * .35;
            });
            tb.on(t > 9.2);
          }
        };
      }
    },
    {
      title: '교실 판단: 네 가지 질문', dur: 13,
      captions: [
        { t: 0, text: '새 모델 발표를 볼 땐 먼저 <em>누가</em> 쟀는지, <em>어떤 설정</em>이었는지 물어요.' },
        { t: 4.5, text: '그리고 <em>오차 범위보다 큰</em> 차이인지, 그 시험 과제가 <em>우리 일과 닮았는지</em> 봐요.' },
        { t: 9, text: '마지막은 우리 업무 과제 몇 개로 옛 모델과 새 모델을 <em>나란히 돌려</em> 보는 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const qs = ['① 누가 쟀나', '② 어떤 설정', '③ 오차보다 큰 차이?', '④ 우리 일과 닮았나'].map((text, i) => {
          const c = P.chip({ x: 380, y: 110 + i * 90, text, color: i < 2 ? 'aqua' : 'orange', size: 26 });
          tl.at(stage.appendChild(c.el), (i < 2 ? .4 : 4.6) + (i % 2) * .8, { from: 'left' });
          return c;
        });
        const box = P.box({ x: 800, y: 400, w: 400, h: 150, label: '우리 과제 5개로', sub: '옛 모델 · 새 모델 나란히', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(box.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            box.on(t > 9.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '발표문 숫자 해독기',
    desc: '위는 <b>작업당 비용 계산기</b>예요. 비교할 짝을 고르고, 새 모델이 같은 일에 쓰는 토큰 비율을 정한 뒤 "새 모델로 바꿔 계산"을 눌러 보세요. 아래 <b>숫자 카드</b>는 "누가 쟀나"를 눌러 꼬리표를 열어 보세요.',
    mount(el, P) {
      const PRICE = {
        'opus5': { name: 'Opus 5', in: 5, out: 25 },
        'opus55': { name: 'Opus 5.5', in: 4, out: 20 },
        'sonnet5': { name: 'Sonnet 5', in: 2, out: 10 },
        'sonnet55': { name: 'Sonnet 5.5', in: 2, out: 10 }
      };
      const PAIRS = {
        opus: { from: 'opus5', to: 'opus55', label: 'Opus 5 → Opus 5.5', match: 75, claim: '작업당 40%↓' },
        sonnet: { from: 'sonnet5', to: 'sonnet55', label: 'Sonnet 5 → Sonnet 5.5', match: 70, claim: '최대 30%↓' }
      };
      const TASK = { in: 2, out: .5 };
      let pair = 'opus';
      let ratio = 80;
      let computed = false;

      const sel = P.h('select', { id: 'sim-t41-pair' }, ...Object.entries(PAIRS).map(([k, v]) => P.h('option', { value: k }, v.label)));
      const selLab = P.h('label', { for: 'sim-t41-pair', class: 'sim-t41-l' }, '비교할 짝');
      const range = P.h('input', { type: 'range', id: 'sim-t41-ratio', min: '50', max: '100', step: '5', value: String(ratio) });
      const rangeVal = P.h('b', {}, `${ratio}%`);
      const rangeLab = P.h('label', { for: 'sim-t41-ratio', class: 'sim-t41-l' }, '새 모델이 같은 일에 쓰는 토큰(옛 모델 대비) ', rangeVal);
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '새 모델로 바꿔 계산');
      const result = P.h('div', { class: 'sim-t41-res' });

      const CARDS = [
        { num: 'Terminal-Bench 4.0 66.4%', tag: '회사 자체 시험 · xhigh 노력 수준' },
        { num: 'GDPval-AA 1846', tag: '외부 기관 Artificial Analysis · max 노력 수준' },
        { num: '작업당 40% 저렴', tag: '회사 자체 시험("Our tests show") · 기본 설정' },
        { num: '$4 / $20', tag: '공식 가격표 · 100만 토큰당 입력·출력' },
        { num: '10월 5일 표 1867 ±26', tag: '외부 공개 표 · 10월 5일 열람, 실시간으로 바뀌어요' }
      ];
      const cardEls = CARDS.map((c, i) => {
        const tag = P.h('div', { class: 'sim-t41-tag', hidden: '' }, c.tag);
        const b = P.h('button', { class: 'btn small', type: 'button', 'aria-expanded': 'false' }, '누가 쟀나');
        b.addEventListener('click', () => {
          const open = tag.hasAttribute('hidden');
          if (open) tag.removeAttribute('hidden'); else tag.setAttribute('hidden', '');
          b.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        return P.h('div', { class: 'sim-t41-card' }, P.h('div', { class: 'sim-t41-num' }, c.num), b, tag);
      });

      el.append(P.h('div', { class: 'sim-t41' },
        P.h('div', { class: 'sim-t41-task' }, '고정 과제(예시 값): 연수 자료 묶음 요약·질문 만들기 · 입력 200만 토큰, 출력 50만 토큰'),
        P.h('div', { class: 'sim-t41-row' }, selLab, sel),
        P.h('div', { class: 'sim-t41-row' }, rangeLab, range),
        P.h('div', { class: 'sim-t41-row' }, runBtn),
        result,
        P.h('h4', { class: 'sim-t41-h' }, '숫자 카드 분류'),
        P.h('div', { class: 'sim-t41-cards' }, ...cardEls),
        P.h('p', { class: 'sim-t41-note' }, '가격은 2026-10-05 공식 가격표 기준. 과제 토큰 수와 토큰 비율은 예시 값이에요.')
      ));
      el.append(P.h('style', { html: `
        .sim-t41{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-t41-task{font-size:13.5px;color:var(--muted);line-height:1.5}
        .sim-t41-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;max-width:100%}
        .sim-t41-l{font-size:13.5px;color:var(--muted)}
        .sim-t41-row select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:#fff;max-width:100%}
        .sim-t41-row input[type=range]{flex:1 1 160px;max-width:100%;accent-color:#127E90}
        .sim-t41-res{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff;display:flex;flex-direction:column;gap:8px;font-size:14px;line-height:1.5}
        .sim-t41-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-t41-bar span.n{flex:0 0 92px;font-weight:700}
        .sim-t41-bar span.track{flex:1 1 120px;height:14px;border-radius:7px;background:var(--paper);overflow:hidden;min-width:80px}
        .sim-t41-bar span.fill{display:block;height:100%;border-radius:7px}
        .sim-t41-bar span.v{font-family:var(--mono);font-size:13px;font-weight:800}
        .sim-t41-big{font-family:var(--mono);font-size:22px;font-weight:800}
        .sim-t41-match{border-left:4px solid #F2812D;padding:6px 10px;background:var(--paper);border-radius:6px}
        .sim-t41-h{margin:6px 0 0;font-size:13.5px;color:var(--muted)}
        .sim-t41-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}
        .sim-t41-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#fff;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
        .sim-t41-num{font-weight:800;font-size:14.5px}
        .sim-t41-tag{font-size:13px;color:#127E90;font-weight:700;line-height:1.45}
        .sim-t41-note{font-size:12.5px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px;margin:0;line-height:1.6}
      ` }));

      const cost = (m, k) => (TASK.in * PRICE[m].in + TASK.out * PRICE[m].out) * k;
      const money = v => `$${v.toFixed(2)}`;
      function bar(name, v, max, color) {
        return P.h('div', { class: 'sim-t41-bar' },
          P.h('span', { class: 'n' }, name),
          P.h('span', { class: 'track' }, P.h('span', { class: 'fill', style: `width:${(100 * v / max).toFixed(1)}%;background:${color}` })),
          P.h('span', { class: 'v' }, money(v)));
      }
      function render() {
        rangeVal.textContent = `${ratio}%`;
        if (!computed) {
          result.replaceChildren(P.h('div', {}, '"새 모델로 바꿔 계산"을 누르면 옛 모델과 새 모델의 작업당 비용이 나와요.'));
          return;
        }
        const pr = PAIRS[pair];
        const oldC = cost(pr.from, 1);
        const samePrice = cost(pr.to, 1);
        const newC = cost(pr.to, ratio / 100);
        const save = 100 * (1 - newC / oldC);
        const priceEff = oldC - samePrice;
        const tokenEff = samePrice - newC;
        const kids = [
          bar(PRICE[pr.from].name, oldC, oldC, '#9AA5AF'),
          bar(PRICE[pr.to].name, newC, oldC, '#127E90'),
          P.h('div', {}, '절감률 ', P.h('span', { class: 'sim-t41-big' }, `${Math.round(save)}%`)),
          P.h('div', {}, `분해: 단가 효과 ${money(priceEff)} · 토큰 효과 ${money(tokenEff)}`)
        ];
        if (ratio === 100) kids.push(P.h('div', { class: 'sim-t41-match' }, priceEff > 0 ? '토큰을 똑같이 쓰면 단가만 바뀐 경우예요. 절감은 단가 효과뿐이에요.' : '토큰을 똑같이 쓰면 단가가 같아서 비용도 같아요.'));
        if (ratio === pr.match) kids.push(P.h('div', { class: 'sim-t41-match' }, `발표문 숫자(${pr.claim})와 같아지는 지점이에요. 분해 비율은 예시 가정이에요.`));
        result.replaceChildren(...kids);
      }
      sel.addEventListener('change', () => { pair = sel.value; render(); });
      range.addEventListener('input', () => { ratio = +range.value; render(); });
      runBtn.addEventListener('click', () => { computed = true; render(); });
      render();
    }
  },

  teacherLines: [
    '새 모델 발표의 숫자는 <b>누가, 어떤 설정으로</b> 쟀는지까지 읽어야 해요.',
    'AI 요금은 <b>토큰 수 × 단가</b>예요. 단가가 같아도 같은 일을 더 적은 토큰으로 끝내면 싸져요.'
  ],
  tip: {
    body: '새 모델을 학교 업무에 쓸지 정할 때는 발표문 점수 대신 <b>우리 업무 과제 5개</b>로 옛 모델과 새 모델을 나란히 돌려, 결과물과 사용 토큰을 함께 비교해 보세요.',
    extra: '비교할 때는 노력 수준 같은 설정을 똑같이 맞추고 날짜를 같이 적어 두세요. 10월 5일 기준 공개 표에서 같은 Opus 5.5도 설정에 따라 600점 넘게 차이 났어요.'
  },
  myth: {
    myth: '점수가 더 높은 모델이 모든 일에서 더 낫다.',
    fact: '시험이 바뀌면 순위도 바뀌어요. 9월 발표에서 실무 과제 시험은 Opus 5.5가 2점 앞섰지만 그 차이는 오차 범위(±25 안팎)보다 작았고, 터미널 코딩 시험은 Sonnet 5.5가 4.2%p 앞섰어요.'
  },
  sources: [
    { title: 'Anthropic: Introducing Claude Opus 5.5 (2026-09-22)', url: 'https://www.anthropic.com/news/claude-opus-5-5', note: '입력 $4·출력 $20, 흔한 작업에서 40% 저렴, 출력 30% 넘게 빠름, 벤치마크 각주의 노력 수준.' },
    { title: 'Anthropic: Claude Sonnet 5.5 (2026-09-28)', url: 'https://www.anthropic.com/claude-sonnet-5-5', note: 'Sonnet 5와 같은 가격, 대부분의 일에서 최대 30% 저렴, Terminal-Bench 4.0 70.6%, GDPval-AA는 외부 기관이 출시 전 배포본으로 실행.' },
    { title: 'Artificial Analysis: GDPval-AA v2.1 Leaderboard (2026-10-05 열람)', url: 'https://artificialanalysis.ai/evaluations/gdpval-aa', note: '익명 1:1 비교를 모은 Elo 점수, 노력 수준별 점수와 ± 범위. 실시간으로 바뀌는 표.' },
    { title: 'Hugging Face: EvalEval × UK AISI Evaluation Cards (2026-09-22)', url: 'https://huggingface.co/blog/evaleval-aisi', note: '비슷한 점수가 다른 조건에서 나올 수 있다는 재현성 문제, 모델 버전·설정·오차를 적는 평가 카드.' }
  ],
  script: `9월 22일 Anthropic이 Claude Opus 5.5를, 28일엔 Sonnet 5.5를 발표했어요. "40% 저렴" 같은 숫자를 어떻게 읽을까요.

AI 요금은 토큰 수 곱하기 단가예요. Opus 5.5는 단가가 20% 내렸는데 회사 자체 시험에서 작업 비용은 40% 줄었어요. 더 적은 토큰으로 끝낸 효과까지 합친 값이에요. Sonnet 5.5는 단가가 그대로라 차이는 토큰 수에서 나와요.

터미널 코딩 시험은 회사가 직접, 실무 과제 시험은 외부 기관이 돌렸고, 발표 점수는 높은 노력 수준에서 나왔어요. 10월 5일 기준 공개 표에서 같은 Opus 5.5도 설정에 따라 1236점부터 1867점까지 벌어져요. 실무 과제 시험의 2점 차이는 ±25점 안팎인 오차 범위 안이에요.

누가 쟀나, 어떤 설정인가, 오차보다 큰가, 우리 일과 닮았나를 묻고, 우리 과제로 나란히 돌려 보세요.`
};
