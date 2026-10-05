/* S777-44 같은 앞부분을 다시 계산하지 않는 트릭: KV 캐시와 프롬프트 캐싱 */
export default {
  slug: 't7-prompt-caching',
  track: 'S777',
  title: '같은 앞부분을 다시 계산하지 않는 트릭',
  subtitle: 'KV 캐시와 프롬프트 캐싱',
  summary: '9월 셋째 주 Kimi K3(9/18), GPT-6(9/22), Claude Opus 5.5(9/22)가 잇따라 \'캐시\' 기능과 가격을 내세웠어요. 모델이 앞부분을 읽으며 만든 계산 결과를 저장했다가 다음 요청에서 다시 쓰는 원리, 앞부분이 한 글자만 달라도 캐시가 깨지는 이유, 학교 업무에서 순서만 바꿔 비용을 줄이는 법까지 짚어요.',
  keywords: ['프롬프트 캐싱', 'prompt caching', 'KV 캐시', '키·값', '어텐션', '접두사 일치', '캐시 적중', '캐시 쓰기', '캐시 읽기', 'TTL', '유효 시간', 'cache_control', 'cached_tokens', 'Kimi K3', 'GPT-6', 'Claude Opus 5.5', 'Gemini 4 Argon'],

  scenes: [
    {
      title: '9월에 쏟아진 캐시 가격', dur: 13,
      captions: [
        { t: 0, text: '9월 18일 Kimi K3가 Amazon Bedrock에서 <em>명시적 프롬프트 캐싱</em>을 지원했어요. 22일엔 OpenAI가 GPT-6의 캐싱 개선을 발표했어요.' },
        { t: 5, text: '같은 날 나온 Claude Opus 5.5는 캐시 읽기가 <em>입력 단가의 5%</em>예요. 30일 Gemini 4 Argon도 캐시 입력을 95% 깎았어요.' },
        { t: 9.5, text: '캐시가 뭐길래 값이 20분의 1일까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const news = [
          ['9/18 Kimi K3 · 명시적 캐싱', 'ink', 340, 92, .3],
          ['9/22 GPT-6 · 캐싱 개선', 'ink', 780, 92, 2.6],
          ['9/22 Opus 5.5 · 캐시 읽기 $0.20', 'aqua', 340, 150, 5.2],
          ['9/30 Argon · 캐시 95%↓', 'orange', 780, 150, 7.4]
        ].map(([text, color, x, y, t0]) => {
          const c = P.chip({ x, y, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), t0, { from: 'pop' });
          return c;
        });
        const head = P.text({ x: 340, y: 228, w: 820, text: 'Claude Opus 5.5 · 100만 토큰당', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(head.el), 5.4, { from: 'up' });
        const l1 = P.text({ x: 340, y: 270, w: 400, text: '입력 $4', size: 22, weight: 800 });
        tl.at(stage.appendChild(l1.el), 5.6, { from: 'left' });
        const bar1 = P.h('div', { style: 'left:340px;top:306px;width:0px;height:40px;border-radius:10px;background:#1B1F24' });
        stage.append(bar1);
        const l2 = P.text({ x: 340, y: 366, w: 600, text: '캐시 읽기 $0.20 · 입력가의 5%', size: 22, weight: 800, color: '#F2812D' });
        tl.at(stage.appendChild(l2.el), 6.6, { from: 'left' });
        const bar2 = P.h('div', { style: 'left:340px;top:402px;width:0px;height:40px;border-radius:10px;background:#F2812D' });
        stage.append(bar2);
        const ask = P.text({ x: 340, y: 500, w: 840, text: '캐시가 뭐길래 값이 <em>20분의 1</em>일까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(ask.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.4);
            bar1.style.width = `${Math.round(800 * P.easeOut(P.clamp((t - 5.8) / .8, 0, 1)))}px`;
            bar2.style.width = `${Math.round(40 * P.easeOut(P.clamp((t - 6.8) / .5, 0, 1)))}px`;
          }
        };
      }
    },
    {
      title: '앞 글자를 읽으며 쌓는 메모, KV 캐시', dur: 14,
      captions: [
        { t: 0, text: '모델은 글을 토큰 단위로 읽으며 층마다 <em>키(K)</em>와 <em>값(V)</em>이라는 숫자 묶음을 만들어요.' },
        { t: 5, text: '다음 토큰을 만들 땐 <em>어텐션</em>, 곧 앞 토큰 중 무엇을 참고할지 정하는 계산으로 앞의 키·값을 다시 봐요.' },
        { t: 9.5, text: '앞 토큰의 키·값은 뒤 토큰 때문에 바뀌지 않아서 저장해 두면 새 토큰 것만 계산하면 돼요. 이게 <em>KV 캐시</em>예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const toks = ['학교', '규정', '제', '3', '조', '?'];
        const boxes = toks.map((label, i) => {
          const b = P.box({ x: 360 + i * 135, y: 130, w: 115, h: 90, label, accent: i === 5 ? 'orange' : '' });
          tl.at(stage.appendChild(b.el), .3 + i * .35, { from: 'up' });
          return b;
        });
        const kv = toks.map((_, i) => {
          const k = P.chip({ x: 360 + i * 135 + 10, y: 236, text: 'K', color: 'gray', size: 20 });
          const v = P.chip({ x: 360 + i * 135 + 62, y: 236, text: 'V', color: 'gray', size: 20 });
          tl.at(stage.appendChild(k.el), 1.4 + i * .3, { from: 'pop' });
          tl.at(stage.appendChild(v.el), 1.5 + i * .3, { from: 'pop' });
          return [k, v];
        });
        const att = [0, 1, 2, 3, 4].map(i => P.arrow(lines, { x1: 1092, y1: 126, x2: 418 + i * 135, y2: 126, curve: 34 + (4 - i) * 6, width: 3, dashed: true, color: '#F2812D' }));
        const attLab = P.text({ x: 360, y: 312, w: 820, text: '어텐션: 앞 토큰 중 무엇을 참고할지 정하는 계산', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(attLab.el), 5.4, { from: 'up' });
        const saved = P.chip({ x: 360, y: 380, text: '저장된 K·V를 꺼내 써요', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(saved.el), 9.7, { from: 'pop' });
        const fresh = P.chip({ x: 1020, y: 380, text: '새로 계산', color: 'orange', size: 22 });
        tl.at(stage.appendChild(fresh.el), 10.1, { from: 'pop' });
        const final = P.text({ x: 360, y: 470, w: 820, text: '저장한 K·V는 <em>다시 계산하지 않아요</em>.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.4);
            att.forEach((a, i) => a.draw(P.clamp((t - (5.6 + i * .3)) / .6, 0, 1)));
            const savedOn = t > 9.6;
            kv.forEach(([k, v], i) => {
              const c = !savedOn ? 'gray' : (i === 5 ? 'orange' : 'aqua');
              [k, v].forEach(ch => { ch.el.classList.remove('c-gray', 'c-aqua', 'c-orange'); ch.el.classList.add('c-' + c); });
            });
            boxes.forEach((b, i) => b.on(savedOn && i < 5));
          }
        };
      }
    },
    {
      title: '요청 사이에 다시 쓰기, 프롬프트 캐싱', dur: 14,
      captions: [
        { t: 0, text: '다음 질문도 앞부분이 똑같다면, 그 계산 결과를 서버에 잠깐 남겨 두었다가 다시 써요. 이게 <em>프롬프트 캐싱</em>이에요.' },
        { t: 5, text: '앞부분이 처음부터 그 지점까지 <em>정확히 같아야</em> 해요. 이렇게 일치하는 앞부분을 <em>접두사</em>라고 불러요.' },
        { t: 9.5, text: '최소 길이(Claude 최신 모델 512토큰, OpenAI 최신 모델 1,024토큰)와 <em>유효 시간</em>(Claude 기본 5분, OpenAI 최소 30분)도 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const segs = [['지시문 1천', 190], ['규정집 2.9만', 360]];
        const mkRow = (y, qLabel, t0, second) => {
          let x = 360;
          const out = [];
          segs.forEach(([label, w]) => {
            const b = P.box({ x, y, w, h: 90, label, accent: second ? 'aqua' : '' });
            tl.at(stage.appendChild(b.el), t0, { from: 'left' });
            out.push(b); x += w + 15;
          });
          const qb = P.box({ x, y, w: 200, h: 90, label: qLabel, accent: second ? 'orange' : '' });
          tl.at(stage.appendChild(qb.el), t0 + .3, { from: 'left' });
          out.push(qb);
          return out;
        };
        const r1l = P.text({ x: 360, y: 92, w: 300, text: '요청 1', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(r1l.el), .3, { from: 'up' });
        const row1 = mkRow(124, '질문 A', .4, false);
        const r2l = P.text({ x: 360, y: 236, w: 300, text: '요청 2', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(r2l.el), 2.2, { from: 'up' });
        const row2 = mkRow(268, '질문 B', 2.4, true);
        const hit = P.chip({ x: 520, y: 378, text: '적중: 다시 씀', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(hit.el), 5.3, { from: 'pop' });
        const fresh = P.chip({ x: 960, y: 378, text: '새로 계산', color: 'orange', size: 22 });
        tl.at(stage.appendChild(fresh.el), 5.8, { from: 'pop' });
        const c1 = P.chip({ x: 360, y: 450, text: '앞부분 정확히 일치', color: 'ink', size: 20 });
        const c2 = P.chip({ x: 600, y: 450, text: '유효 시간 안에', color: 'ink', size: 20 });
        tl.at(stage.appendChild(c1.el), 6.6, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 9.7, { from: 'pop' });
        const n1 = P.text({ x: 360, y: 520, w: 820, text: '최소 길이: 512토큰(Claude) · 1,024토큰(OpenAI)', size: 20, weight: 700, cls: 'muted' });
        const n2 = P.text({ x: 360, y: 560, w: 820, text: '유효 시간: 기본 5분(Claude) · 최소 30분(OpenAI)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(n1.el), 10, { from: 'up' });
        tl.at(stage.appendChild(n2.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.3);
            row2.forEach((b, i) => b.on(t > 5.2 && i < 2));
            row1.forEach(b => b.on(false));
          }
        };
      }
    },
    {
      title: '한 글자만 달라도 깨져요', dur: 13,
      captions: [
        { t: 0, text: '맨 앞에 오늘 시각을 넣으면 앞부분이 매번 달라져서 캐시가 <em>한 번도</em> 맞지 않아요.' },
        { t: 4.5, text: '고정된 것(도구 정의·지시문·참고자료)은 앞에, 바뀌는 것(질문·날짜)은 <em>뒤에</em> 둬요.' },
        { t: 9, text: '캐시 쓰기는 입력가의 1.25배, 읽기는 0.1배예요. 그래서 5분 캐시는 <em>한 번만</em> 다시 읽어도 이득이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'oops' });
        stage.append(q.el);
        const mk = (y, order, t0, accents) => {
          let x = 360;
          return order.map(([label, w], i) => {
            const b = P.box({ x, y, w, h: 90, label, accent: accents[i] });
            tl.at(stage.appendChild(b.el), t0 + i * .15, { from: 'up' });
            x += w + 15;
            return b;
          });
        };
        const TIME = ['시각 14:02', 180], INS = ['지시문', 160], DOC = ['규정집', 200], QQ = ['질문', 150];
        mk(100, [TIME, INS, DOC, QQ], .3, ['orange', '', '', '']);
        const miss = P.chip({ x: 360, y: 208, text: '앞부분이 매번 달라요 → 매번 실패', color: 'orange', size: 20 });
        tl.at(stage.appendChild(miss.el), 1.6, { from: 'pop' });
        const down = P.arrow(lines, { x1: 640, y1: 262, x2: 640, y2: 300, width: 4, color: '#1B1F24' });
        const row2 = mk(306, [INS, DOC, QQ, TIME], 4.8, ['aqua', 'aqua', '', 'orange']);
        const hit = P.chip({ x: 360, y: 414, text: '고정 자료가 앞에 → 적중', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(hit.el), 6.4, { from: 'pop' });
        const rate = P.box({ x: 360, y: 488, w: 380, h: 110, label: '캐시 단가 배율', sub: '쓰기 1.25배 · 읽기 0.1배', accent: 'ink' });
        tl.at(stage.appendChild(rate.el), 9.2, { from: 'up' });
        const pay = P.text({ x: 780, y: 506, w: 420, text: '5분 캐시는 <em>한 번만</em> 다시 읽어도 이득이에요.', size: 24, weight: 800 });
        tl.at(stage.appendChild(pay.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.4 || t > 8.8);
            down.draw(P.clamp((t - 4.4) / .5, 0, 1));
            row2.forEach((b, i) => b.on(t > 6.3 && i < 2));
          }
        };
      }
    },
    {
      title: '교실 판단: 순서만 바꿔요', dur: 13,
      captions: [
        { t: 0, text: '규정집이나 교육과정 문서로 질문을 여러 개 할 땐, 같은 자료를 <em>같은 순서로 앞에</em> 둬요.' },
        { t: 4.5, text: '질문만 바꿔서 유효 시간 안에 이어서 보내면, 앞부분은 캐시에서 읽어요.' },
        { t: 9, text: 'OpenAI 문서는 캐시를 <em>다른 조직과 공유하지 않는다</em>고 밝혀요. 답은 매번 새로 만들고, 다시 쓰는 건 앞부분 계산뿐이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const checks = ['1. 고정 자료는 앞에', '2. 질문·날짜는 뒤에', '3. 유효 시간 안에 이어서'].map((text, i) => {
          const c = P.chip({ x: 380, y: 130 + i * 84, text, color: i === 2 ? 'orange' : 'aqua', size: 24 });
          tl.at(stage.appendChild(c.el), .4 + i * 2.2, { from: 'left' });
          return c;
        });
        const org = P.box({ x: 820, y: 130, w: 360, h: 140, label: '조직 안에서만', sub: '다른 조직과 공유 안 됨', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(org.el), 9.2, { from: 'right' });
        const final = P.text({ x: 380, y: 440, w: 800, text: '답은 매번 새로, 다시 쓰는 건 <em>앞부분 계산</em>뿐이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.4 || t > 8.8);
            org.on(t > 9.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '캐시 적중 시뮬레이터',
    desc: '지시문 1,000토큰 + 학교 규정집 29,000토큰에 질문 200토큰을 붙여 <b>질문 10개</b>를 보내요. 블록 순서와 질문 사이 간격을 바꾸고 "질문 10개 보내기"를 눌러 보세요. 유효 시간(5분) 안에 같은 앞부분이 오면 <b>캐시 읽기</b>, 아니면 <b>캐시 쓰기</b>가 돼요.',
    mount(el, P) {
      const FIXED = 30000, QTOK = 200;
      const PRICE = { input: 2, write: 2.5, read: 0.2 }; /* Claude Sonnet 5.5, 100만 토큰당 달러 */
      const TTL = 5;
      const ORDERS = [
        { id: 'fixed', label: '① 고정 자료 먼저', blocks: [['지시문 1천', 'a'], ['규정집 2.9만', 'a'], ['질문', 'o']] },
        { id: 'qfirst', label: '② 질문을 맨 앞에', blocks: [['질문', 'o'], ['지시문 1천', 'g'], ['규정집 2.9만', 'g']] },
        { id: 'time', label: '③ 맨 앞에 시각 넣기', blocks: [['시각 14:02', 'o'], ['지시문 1천', 'g'], ['규정집 2.9만', 'g'], ['질문', 'o']] }
      ];
      let order = 'fixed', gap = 2, sent = false;
      const money = v => '$' + v.toFixed(4);

      const radios = P.h('fieldset', { class: 'sim-fs' }, P.h('legend', {}, '블록 순서'),
        ...ORDERS.map(o => {
          const r = P.h('input', { type: 'radio', name: 'sim-order', id: `sim-o-${o.id}`, value: o.id });
          if (o.id === order) r.checked = true;
          r.addEventListener('change', () => { order = o.id; render(); });
          return P.h('label', { class: 'sim-radio', for: `sim-o-${o.id}` }, r, o.label);
        }));
      const gapLab = P.h('label', { for: 'sim-gap', class: 'sim-gap-l' });
      const range = P.h('input', { type: 'range', id: 'sim-gap', min: '1', max: '10', step: '1', value: String(gap), class: 'sim-range' });
      range.addEventListener('input', () => { gap = +range.value; render(); });
      const sendBtn = P.h('button', { class: 'btn primary', type: 'button' }, '질문 10개 보내기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '지우기');
      sendBtn.addEventListener('click', () => { sent = true; render(); });
      resetBtn.addEventListener('click', () => { sent = false; render(); });
      const preview = P.h('div', { class: 'sim-preview', 'aria-live': 'polite' });
      const log = P.h('div', { class: 'sim-log', 'aria-live': 'polite' });
      const sum = P.h('div', { class: 'sim-sum' });
      const foot = P.h('p', { class: 'sim-foot' }, '단가는 2026-10-05 Claude 공식 가격표 기준(Claude Sonnet 5.5: 입력 $2, 5분 캐시 쓰기 $2.50, 캐시 읽기 $0.20, 100만 토큰당). 블록 길이와 질문 수는 예시 값이에요.');

      el.append(P.h('div', { class: 'sim-wrap' },
        radios,
        P.h('div', { class: 'sim-rangebar' }, gapLab, range),
        P.h('div', { class: 'sim-btns' }, sendBtn, resetBtn),
        preview, log, sum, foot
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-fs{border:1px solid var(--line);border-radius:12px;padding:10px 12px;display:flex;flex-wrap:wrap;gap:8px 16px;margin:0;min-width:0}
        .sim-fs legend{font-size:13px;font-weight:800;padding:0 4px}
        .sim-radio{display:flex;align-items:center;gap:6px;font-size:14px}
        .sim-rangebar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .sim-gap-l{font-weight:700;font-size:14px;white-space:nowrap}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        .sim-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-preview{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:13px}
        .sim-blk{border-radius:10px;padding:5px 10px;font-weight:700;border:1px solid var(--line);background:#fff}
        .sim-blk.a{background:var(--aqua-pale);color:var(--aqua-deep);border-color:var(--aqua-pale)}
        .sim-blk.o{background:var(--orange-pale);color:#B3520F;border-color:var(--orange-pale)}
        .sim-blk.g{background:var(--paper);color:var(--muted)}
        .sim-log{display:flex;flex-direction:column;gap:6px}
        .sim-row{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13px;background:#fff}
        .sim-row b{min-width:84px}
        .sim-row .st{font-weight:800}
        .sim-row.hit .st{color:var(--aqua-deep)}
        .sim-row.write .st{color:#B3520F}
        .sim-row .mono{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-sum{border-radius:12px;padding:12px 14px;background:var(--paper);font-size:14px;line-height:1.55}
        .sim-sum b{font-family:var(--mono)}
        .sim-sum .good{color:var(--aqua-deep);font-weight:800}
        .sim-sum .bad{color:#B3520F;font-weight:800}
        .sim-foot{font-size:12.5px;color:var(--muted);margin:0}
      ` }));

      function simulate() {
        const rows = [];
        let last = null;
        for (let i = 0; i < 10; i++) {
          const time = i * gap;
          const qCost = QTOK * PRICE.input / 1e6;
          if (order === 'fixed' && last !== null && time - last <= TTL) {
            rows.push({ i, time, kind: 'hit', st: '적중 · 캐시 읽기', readTok: FIXED, cost: FIXED * PRICE.read / 1e6 + qCost });
          } else {
            let st;
            if (order !== 'fixed') st = i === 0 ? '캐시 쓰기(처음)' : '앞부분 불일치 → 다시 쓰기';
            else st = i === 0 ? '캐시 쓰기(처음)' : '만료 → 다시 쓰기';
            rows.push({ i, time, kind: 'write', st, readTok: 0, cost: FIXED * PRICE.write / 1e6 + qCost });
          }
          last = time;
        }
        return rows;
      }
      function render() {
        gapLab.textContent = `질문 사이 간격: ${gap}분`;
        const o = ORDERS.find(x => x.id === order);
        preview.replaceChildren(P.h('span', { class: 'sim-pl' }, '보내는 순서:'), ...o.blocks.map(([t, c]) => P.h('span', { class: `sim-blk ${c}` }, t)));
        if (!sent) {
          log.replaceChildren(P.h('div', { class: 'sim-row' }, '"질문 10개 보내기"를 누르면 요청마다 캐시 적중 여부와 비용이 쌓여요.'));
          sum.innerHTML = `캐시 없이 10개를 보내면 <b>$${(10 * (FIXED + QTOK) * PRICE.input / 1e6).toFixed(3)}</b>예요.`;
          return;
        }
        const rows = simulate();
        log.replaceChildren(...rows.map(r => P.h('div', { class: `sim-row ${r.kind}` },
          P.h('b', {}, `${r.i + 1}번 · ${r.time}분`),
          P.h('span', { class: 'st' }, r.st),
          P.h('span', { class: 'mono' }, `캐시에서 읽은 토큰 ${r.readTok.toLocaleString('ko-KR')}`),
          P.h('span', { class: 'mono' }, money(r.cost))
        )));
        const total = rows.reduce((a, r) => a + r.cost, 0);
        const none = 10 * (FIXED + QTOK) * PRICE.input / 1e6;
        const hits = rows.filter(r => r.kind === 'hit').length;
        const diff = Math.round(Math.abs(1 - total / none) * 100);
        const verdict = total < none
          ? `<span class="good">약 ${diff}% 절감</span> · 10개 중 ${hits}개가 캐시에서 읽었어요.`
          : `<span class="bad">약 ${diff}% 더 비싸요</span> · 쓰기 값만 내고 한 번도 못 읽었어요.`;
        sum.innerHTML = `합계 <b>$${total.toFixed(3)}</b> · 캐시 없이 보냈다면 <b>$${none.toFixed(3)}</b><br>${verdict}`;
      }
      render();
    }
  },

  teacherLines: [
    'AI는 같은 앞부분을 <b>한 번만 계산</b>해 두고, 다음 질문 때 꺼내 써요.',
    '고정된 자료는 <b>앞에</b>, 바뀌는 질문은 <b>뒤에</b> 두면 더 빠르고 싸져요.'
  ],
  tip: {
    body: '학교 업무용 챗봇이나 자동화를 만들 때는 지시문·규정집·교육과정 문서 같은 고정 자료를 <b>프롬프트 맨 앞</b>에 두고, 날짜·질문처럼 바뀌는 내용은 맨 뒤에 붙이세요.',
    extra: '응답의 사용량 기록에서 캐시로 읽은 토큰 수(<code>cached_tokens</code>, <code>cache_read_input_tokens</code>)가 0이 아닌지 보면 실제로 적중했는지 알 수 있어요.'
  },
  myth: {
    myth: '캐시가 되면 AI가 예전 답을 저장해 두었다가 그대로 돌려준다.',
    fact: '답은 매번 새로 만들어요. 다시 쓰는 건 같은 앞부분을 읽으며 만든 계산 결과뿐이고, 앞부분이 한 글자라도 다르면 그 지점부터 다시 계산해요.'
  },
  sources: [
    { title: 'Claude Docs: Prompt caching', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', note: '접두사와 cache_control 중단점, 기본 5분·선택 1시간, 쓰기 1.25배·읽기 0.1배, 무효화 예.' },
    { title: 'OpenAI API: Prompt caching guide', url: 'https://developers.openai.com/api/docs/guides/prompt-caching', note: '기본 활성, 앞부분 전체 일치 조건, 1,024토큰·최소 30분, 조직 간 공유 안 됨, 최대 95% 할인.' },
    { title: 'Hugging Face Transformers: How caching works', url: 'https://huggingface.co/docs/transformers/cache_explanation', note: 'KV 캐시: 앞 토큰의 키·값을 층마다 저장해 다시 계산하지 않는 원리.' },
    { title: 'AWS: Moonshot AI Kimi K3 on Amazon Bedrock (2026-09-18)', url: 'https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/', note: 'Bedrock의 오픈 웨이트 모델 중 처음으로 명시적 프롬프트 캐싱 지원.' }
  ],
  script: `9월 셋째 주에 '캐시' 소식이 몰렸어요. 18일 Kimi K3가 Amazon Bedrock에서 명시적 프롬프트 캐싱을 지원했고, 22일 OpenAI는 GPT-6의 캐싱 개선을 발표했어요. 같은 날 나온 Claude Opus 5.5는 캐시 읽기가 입력 단가의 5%예요.

원리는 이래요. 모델은 글을 토큰 단위로 읽으며 층마다 키와 값이라는 숫자 묶음을 만들어요. 다음 토큰을 만들 때 어텐션으로 앞의 키·값을 다시 보는데, 앞 토큰 것은 바뀌지 않으니 저장해 두면 새 토큰 것만 계산하면 돼요. 이게 KV 캐시예요.

프롬프트 캐싱은 이 계산 결과를 요청 사이에서도 다시 쓰는 거예요. 앞부분이 처음부터 정확히 같고 유효 시간 안이어야 해요. 맨 앞에 시각을 넣으면 매번 깨져요.

그러니 규정집 같은 고정 자료는 앞에, 질문은 뒤에 두세요. 답은 매번 새로 만들어요.`
};
