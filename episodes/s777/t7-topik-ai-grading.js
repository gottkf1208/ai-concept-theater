/* S777-67 AI가 문제를 내고 채점하는 시험: 자동 출제·채점과 사람 검토 고리, 홈테스트 */
export default {
  slug: 't7-topik-ai-grading',
  track: 'S777',
  title: 'AI가 문제를 내고 채점하는 시험',
  subtitle: '자동 출제·채점과 사람 검토 고리, 홈테스트',
  summary: '9월 29일 교육부가 한국어능력시험(토픽)을 2029년부터 AI·디지털 기반으로 바꾸겠다고 발표했어요. 문제은행으로 학습한 AI가 문항을 만들고 쓰기·말하기를 1차 채점하지만, 전문가가 반드시 검토하고 그 결과로 AI를 다시 가르쳐요. 이 구조가 "사람 검토 고리"예요. 집에서 보는 시험을 왜 낮은 등급부터 시작하는지도 봐요.',
  keywords: ['토픽', 'TOPIK', '한국어능력시험', '교육부', '국립국제교육원', 'AI 자동 출제', 'AI 자동 채점', '문제은행', '기출 유사도', '난이도 예측', 'human-in-the-loop', '사람 검토 고리', '이중 채점', '드리프트', '홈테스트', '원격 감독', 'TOEFL'],

  scenes: [
    {
      title: '토픽이 AI 시험으로', dur: 13,
      captions: [
        { t: 0, text: '9월 29일 교육부가 한국어능력시험 <em>토픽</em>을 2029년부터 AI·디지털 기반으로 바꾸겠다고 발표했어요.' },
        { t: 5, text: '2025년 지원자가 56만 명을 넘었고, 2030년에는 100만 명을 목표로 해요.' },
        { t: 9, text: 'AI가 문제를 만들고 채점도 돕는데, 맨 앞에 둔 원칙은 <em>전문가가 반드시 검토</em>한다는 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const date = P.chip({ x: 330, y: 92, text: '2026. 9. 29. 교육부 · 국립국제교육원', color: 'ink', size: 22 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const plan = [
          ['2026.10', '개편위원회', ''],
          ['2027.6', '개편안 발표', ''],
          ['2028', '시범 시행', ''],
          ['2029', '개편 체제 적용', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 225, y: 150, w: 195, h: 110, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .8 + i * .6, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 528 + i * 225, y1: 205, x2: 552 + i * 225, y2: 205, width: 3, color: '#1B1F24' }));
        const now = P.box({ x: 330, y: 300, w: 420, h: 115, label: '56만 6,665명', sub: '2025년 지원자', accent: 'aqua' });
        const goal = P.box({ x: 790, y: 300, w: 420, h: 115, label: '100만 명', sub: '2030년 목표', accent: 'ink' });
        tl.at(stage.appendChild(now.el), 5.2, { from: 'up' });
        tl.at(stage.appendChild(goal.el), 6, { from: 'up' });
        const a2 = P.arrow(lines, { x1: 754, y1: 357, x2: 786, y2: 357, width: 4, color: '#F2812D' });
        const final = P.text({ x: 330, y: 460, w: 880, text: '맨 앞 원칙: <em>전문가가 반드시 검토</em>해요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            plan.forEach((b, i) => b.on(t > .8 + i * .6 && i === 3));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.2 + i * .6)) / .4, 0, 1)));
            a2.draw(P.clamp((t - 6) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '문제를 만드는 고리', dur: 14,
      captions: [
        { t: 0, text: '문제은행으로 학습한 언어 모델이 등급별 문항을 만들어요. 그다음 AI가 <em>기출과 너무 닮았는지</em>, <em>난이도</em>는 맞는지 먼저 걸러요.' },
        { t: 5.5, text: '이어서 전문가가 검증하고, 그 검수 의견과 시행 통계를 AI가 <em>다시 배워요</em>.' },
        { t: 9.5, text: '사람이 고리 한가운데 들어간 이 구조를 <em>사람 검토 고리</em>(human-in-the-loop)라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const NODES = [
          ['AI 생성', '등급별 문항 만들기', 'ink', P.ICON.brain, 220, 100, .3],
          ['AI 검증', '기출 유사도 · 난이도 예측', 'aqua', P.ICON.search, 720, 100, 2.6],
          ['전문가 검증', '반드시 사람이 검토', 'orange', P.ICON.eye, 720, 330, 5.7],
          ['재학습', '검수 의견 · 시행 통계 반영', '', P.ICON.save, 220, 330, 7.6]
        ];
        const boxes = NODES.map(([label, sub, acc, icon, x, y, t0]) => {
          const b = P.box({ x, y, w: 380, h: 130, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), t0, { from: 'up' });
          return [b, t0];
        });
        const arrows = [
          [P.arrow(lines, { x1: 605, y1: 165, x2: 715, y2: 165, width: 4, color: '#1B1F24' }), 2.2],
          [P.arrow(lines, { x1: 910, y1: 235, x2: 910, y2: 325, width: 4, color: '#1B1F24' }), 5.3],
          [P.arrow(lines, { x1: 715, y1: 395, x2: 605, y2: 395, width: 4, color: '#1B1F24' }), 7.2],
          [P.arrow(lines, { x1: 410, y1: 325, x2: 410, y2: 235, width: 4, dashed: true, color: '#F2812D' }), 8.4]
        ];
        const bank = P.chip({ x: 220, y: 505, text: '문제은행 연 4,000문항', color: 'gray', size: 20 });
        tl.at(stage.appendChild(bank.el), 1, { from: 'pop' });
        const hitl = P.chip({ x: 540, y: 505, text: '사람 검토 고리 = human-in-the-loop', color: 'orange', size: 20 });
        tl.at(stage.appendChild(hitl.el), 9.7, { from: 'pop' });
        return {
          tick(t) {
            boxes.forEach(([b, t0]) => b.on(t > t0 && t < t0 + 2.4));
            arrows.forEach(([a, t0]) => a.draw(P.clamp((t - t0) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '채점은 둘이 함께', dur: 14,
      captions: [
        { t: 0, text: '쓰기·말하기는 손글씨와 음성을 글자로 바꾼 뒤 AI가 문법·어휘·논리 전개 항목별로 <em>1차 점수</em>를 내요. 최종 검증은 전문 채점위원이 해요.' },
        { t: 6, text: '토플은 모든 답을 AI와 사람이 함께 채점하고, 둘이 다르면 <em>두 번째 사람</em>이 봐요.' },
        { t: 10, text: '운영하면서 AI 채점 기준이 처음과 조금씩 달라지는 <em>드리프트</em>도 상시 점검해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const flow = [
          ['손글씨·음성', '쓰기·말하기 답안', ''],
          ['텍스트 변환', '글자로 바꾸기', ''],
          ['AI 1차 점수', '문법·어휘·논리', 'aqua'],
          ['채점위원', '최종 검증', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 225, y: 92, w: 195, h: 115, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * 1, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 528 + i * 225, y1: 150, x2: 552 + i * 225, y2: 150, width: 3, color: '#1B1F24' }));
        const lab = P.text({ x: 330, y: 250, w: 600, text: '해외 시험 사례 · TOEFL', size: 21, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 6, { from: 'up' });
        const both = P.box({ x: 330, y: 295, w: 320, h: 120, label: 'AI + 사람', sub: '모든 답을 함께 채점', accent: 'ink', icon: P.ICON.check });
        const diff = P.box({ x: 710, y: 295, w: 360, h: 120, label: '둘이 다르면', sub: '두 번째 사람이 검토', accent: 'orange', icon: P.ICON.eye });
        tl.at(stage.appendChild(both.el), 6.3, { from: 'up' });
        tl.at(stage.appendChild(diff.el), 7.5, { from: 'right' });
        const a2 = P.arrow(lines, { x1: 655, y1: 355, x2: 705, y2: 355, width: 4, color: '#1B1F24' });
        const drift = P.chip({ x: 330, y: 455, text: '드리프트: 운영 중 AI 채점 기준이 조금씩 달라지는 것 → 상시 점검', color: 'gray', size: 19 });
        tl.at(stage.appendChild(drift.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 10);
            flow.forEach((b, i) => b.on(t > .3 + i * 1 && t < 6));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (.8 + i * 1)) / .4, 0, 1)));
            a2.draw(P.clamp((t - 7.2) / .5, 0, 1));
            diff.on(t > 7.5);
          }
        };
      }
    },
    {
      title: '집에서 보는 시험은 낮은 등급부터', dur: 13,
      captions: [
        { t: 0, text: '홈테스트는 집에서 자기 컴퓨터로 보는 시험이에요. AI 감독 시스템이 <em>얼굴</em>을 확인하고 <em>시선</em>을 따라가요.' },
        { t: 5, text: '그래도 유학·체류 같은 행정 절차에 쓰이지 않는 <em>낮은 등급부터</em> 시작하고, 전면 시행 전까지 충분히 검증해요.' },
        { t: 9.5, text: '토플 홈에디션도 감독관이 지켜보고 시험 뒤 이상 보고서를 검토해요. 시험장 AI 안경 대책은 57편에서 다뤘어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'oops' });
        stage.append(q.el);
        const home = P.box({ x: 330, y: 92, w: 380, h: 150, label: 'TOPIK 홈테스트', sub: '자택 · 개인 컴퓨터', accent: 'ink', icon: P.ICON.desk });
        tl.at(stage.appendChild(home.el), .3, { from: 'up' });
        const watch = [
          ['안면 인식', 'aqua', 2.2],
          ['시선 추적', 'aqua', 2.9],
          ['토플 홈에디션: 감독관 + 이상 보고서 검토', 'gray', 9.7]
        ].map(([text, color, t0], i) => {
          const c = P.chip({ x: 750, y: 100 + i * 52, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), t0, { from: 'pop' });
          return c;
        });
        const low = P.box({ x: 330, y: 420, w: 380, h: 120, label: '낮은 등급부터', sub: '유학·체류 절차에 안 쓰임', accent: 'aqua', icon: P.ICON.check });
        const high = P.box({ x: 750, y: 300, w: 440, h: 120, label: '행정 절차용 등급', sub: '전면 시행 전 충분히 검증', accent: '', icon: P.ICON.key });
        tl.at(stage.appendChild(low.el), 5.2, { from: 'up' });
        tl.at(stage.appendChild(high.el), 6.4, { from: 'up' });
        const step = P.arrow(lines, { x1: 715, y1: 470, x2: 820, y2: 425, curve: 20, dashed: true, width: 3, color: '#9AA5AF' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            home.on(t > .3 && t < 5);
            low.on(t > 5.2);
            step.draw(P.clamp((t - 6.8) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '학교 평가로 옮기면', dur: 12,
      captions: [
        { t: 0, text: '2025년 종합 연구에서 AI와 사람 점수의 일치도는 상황에 따라 크게 달랐어요. 그래서 고리를 빼면 오류가 그대로 점수가 돼요.' },
        { t: 6, text: '학교에서 AI 채점을 써 본다면 국가 시험처럼 <em>AI는 1차, 최종은 선생님</em>이에요. 편향 실험은 AI 채점 편에 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const study = P.chip({ x: 340, y: 92, text: '2025년 종합 연구 · 65편 · 일치도는 상황 따라 크게 달라요', color: 'gray', size: 19 });
        tl.at(stage.appendChild(study.el), .4, { from: 'pop' });
        const items = [
          ['AI 점수 = 1차 점수', '최종 점수는 선생님', 'orange', P.ICON.check],
          ['차이 큰 답부터 다시', 'AI와 내 점수가 크게 다른 답', 'aqua', P.ICON.search],
          ['기준표 다듬기', '고친 결과를 기준표 문장에 반영', 'ink', P.ICON.doc]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340, y: 150 + i * 136, w: 860, h: 124, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), 6.2 + i * 1.2, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 565, w: 860, text: 'AI는 <i>1차</i>, 최종은 <em>선생님</em>이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.6 || t > 6);
            items.forEach((b, i) => b.on(t > 6.2 + i * 1.2));
          }
        };
      }
    }
  ],

  interaction: {
    title: '사람 검토 스위치',
    desc: '쓰기 1문항(10점 만점) 예시 답안 10개예요. 처음에는 <b>AI 1차 점수만</b>으로 확정돼요. <b>사람 검토 켜기</b>를 누르면 채점위원 점수가 드러나고, 두 점수 차이가 기준 이상인 답에 "두 번째 채점자"가 붙어 사람 점수로 확정돼요. <b>불일치 기준</b>을 낮추면 다시 보는 답이 늘고, 높이면 놓치는 큰 오차(2점 이상)가 생겨요. <b>재학습 반영</b>은 사람이 다시 본 결과로 다음 회차 AI가 얼마나 나아지는지 보여 줘요. 점수는 원리를 보여 주는 예시 값이에요. "다르면 두 번째 사람"은 ETS의 TOEFL 채점 절차, "생성→검증→전문가→재학습"은 토픽 개편 방안의 원칙이에요.',
    mount(el, P) {
      const AI = [7, 5, 9, 4, 8, 6, 3, 9, 5, 7];
      const HUM = [7, 6, 9, 2, 8, 6, 6, 8, 5, 4];
      const AI2 = [7, 6, 9, 3, 8, 6, 4, 8, 5, 5];
      const BIG = 2;
      let reviewOn = false;
      let thr = 2;
      let retrained = false;

      const toggle = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '사람 검토 켜기');
      const retrainBtn = P.h('button', { class: 'btn', type: 'button' }, '재학습 반영');
      const range = P.h('input', { type: 'range', id: 'sim-tk-thr', min: '1', max: '3', step: '1', value: '2' });
      const rangeLab = P.h('label', { for: 'sim-tk-thr', class: 'sim-tk-rl' }, '불일치 기준(점)');
      const thrOut = P.h('span', { class: 'sim-tk-thr' }, '');
      const method = P.h('div', { class: 'sim-tk-method' }, '');
      const summary = P.h('div', { class: 'sim-tk-sum' }, '');
      const next = P.h('div', { class: 'sim-tk-next' }, '');
      const grid = P.h('div', { class: 'sim-tk-grid' });
      const cards = AI.map((a, i) => {
        const aiEl = P.h('div', { class: 'sim-tk-ai' }, `AI 1차: ${a}`);
        const humEl = P.h('div', { class: 'sim-tk-hum' }, '');
        const finEl = P.h('div', { class: 'sim-tk-fin' }, '');
        const flag = P.h('span', { class: 'sim-tk-flag' }, '두 번째 채점자');
        const card = P.h('div', { class: 'sim-tk-card' }, P.h('div', { class: 'sim-tk-h' }, `답안 ${i + 1}`), aiEl, humEl, finEl, flag);
        grid.append(card);
        return { card, humEl, finEl, flag };
      });

      el.append(P.h('div', { class: 'sim-tk-wrap' },
        P.h('div', { class: 'sim-tk-bar' }, toggle, retrainBtn),
        P.h('div', { class: 'sim-tk-range' }, rangeLab, range, thrOut),
        method, summary,
        grid,
        next
      ));
      el.append(P.h('style', { html: `
        .sim-tk-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-tk-bar{display:flex;gap:10px;flex-wrap:wrap}
        .sim-tk-range{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-tk-range input{flex:1 1 160px;max-width:320px;min-width:0}
        .sim-tk-rl{font-size:13px;color:var(--muted)}
        .sim-tk-thr{font-family:var(--mono);font-size:13px;font-weight:700}
        .sim-tk-method{font-size:15px;font-weight:800}
        .sim-tk-sum{font-family:var(--mono);font-size:13px;color:var(--muted);word-break:keep-all}
        .sim-tk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:100%}
        .sim-tk-card{min-width:0;border:2px solid var(--line);border-radius:12px;padding:10px;background:#fff;display:flex;flex-direction:column;gap:3px;font-size:13px}
        .sim-tk-card.flagged{border-color:var(--acc2)}
        .sim-tk-card.bad{background:color-mix(in srgb,var(--acc2) 8%,white)}
        .sim-tk-h{font-size:12px;font-weight:700;color:var(--muted)}
        .sim-tk-hum{color:var(--muted)}
        .sim-tk-fin{font-weight:800}
        .sim-tk-flag{display:none;align-self:flex-start;font-size:11px;font-weight:700;color:#fff;background:var(--acc2);border-radius:999px;padding:2px 8px;margin-top:2px}
        .sim-tk-card.flagged .sim-tk-flag{display:inline-block}
        .sim-tk-next{font-size:14px;font-weight:700;border-left:3px solid var(--acc1);padding:8px 12px;background:#fff;border-radius:6px;word-break:keep-all}
        .sim-tk-next:empty{display:none}
      ` }));

      const bigErrors = arr => arr.filter((a, i) => Math.abs(a - HUM[i]) >= BIG).length;
      function render() {
        thrOut.textContent = `${thr}점`;
        toggle.textContent = reviewOn ? '사람 검토 끄기' : '사람 검토 켜기';
        toggle.setAttribute('aria-pressed', String(reviewOn));
        let reviewed = 0, missed = 0;
        cards.forEach((c, i) => {
          const d = Math.abs(AI[i] - HUM[i]);
          const flagged = reviewOn && d >= thr;
          const final = flagged ? HUM[i] : AI[i];
          if (flagged) reviewed++;
          const bad = Math.abs(final - HUM[i]) >= BIG;
          if (bad) missed++;
          c.humEl.textContent = reviewOn ? `채점위원: ${HUM[i]}` : '채점위원: ?';
          c.finEl.textContent = `확정: ${final}`;
          c.card.classList.toggle('flagged', flagged);
          c.card.classList.toggle('bad', bad && reviewOn);
        });
        method.textContent = reviewOn ? '확정 방식: AI + 사람' : '확정 방식: AI만';
        summary.textContent = reviewOn
          ? `사람이 다시 본 답 ${reviewed}개 / 그대로 확정된 큰 오차(2점 이상) ${missed}건`
          : `사람이 다시 본 답 0개 / 그대로 확정된 큰 오차(2점 이상) ${missed}건 (채점위원 점수는 가려져 있어요)`;
        if (!retrained) next.textContent = '';
        else if (!reviewOn) next.textContent = '사람 검토를 켜야 재학습에 쓸 사람 점수가 생겨요.';
        else next.textContent = `다음 회차 AI(재학습 반영) 1차 점수: ${AI2.join(' · ')} / 큰 오차 ${bigErrors(AI)}건 → ${bigErrors(AI2)}건. 그래도 사람 검토는 계속해요.`;
      }
      toggle.addEventListener('click', () => { reviewOn = !reviewOn; render(); });
      range.addEventListener('input', () => { thr = +range.value; render(); });
      retrainBtn.addEventListener('click', () => { retrained = true; render(); });
      render();
    }
  },

  teacherLines: [
    '국가 시험도 AI 점수는 <b>1차 점수</b>예요. 최종 점수는 사람이 확인해요.',
    'AI와 사람의 점수가 다르면 <b>한 번 더 봐야</b> 공정한 채점이 돼요.'
  ],
  tip: {
    body: '서술형 피드백에 AI를 써 본다면 국가 시험의 고리를 작게 옮기세요. ① 기준표를 먼저 정하고 ② 몇 개 답은 선생님이 먼저 채점해 AI 점수와 비교하고 ③ 차이가 큰 답만 다시 보고 ④ 그 결과로 기준표 문장을 고쳐요. 최종 점수는 선생님이 정해요.',
    extra: '다문화 학생이 토픽을 준비한다면 2027년에는 지금처럼 PBT·IBT·말하기 평가로 총 15회 시행되고, AI·디지털 개편 체제는 2029년 적용 예정이에요. 일정은 토픽 누리집 공지를 기준으로 안내하세요.'
  },
  myth: {
    myth: 'AI가 채점하면 사람 손을 안 거치니 실수가 없다.',
    fact: 'AI와 사람 채점의 일치도는 상황에 따라 크게 달라요. 그래서 토픽 개편은 전문가 검토를 필수로 넣었고, 토플은 둘이 다르면 두 번째 사람이 다시 봐요.'
  },
  sources: [
    { title: '교육부 보도자료: 국가 공인 한국어시험 토픽, 2029년 평가 개편 및 인공지능·디지털 기반 체제로 전환 (2026-09-29)', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156783460', note: '개편 일정, 지원자 수, 기본 원칙 "AI 생성 → AI 검증 → 전문가 검증 → 재학습", AI 1차 채점과 채점위원 최종 검증, 낮은 등급부터 홈테스트.' },
    { title: 'ETS, Using AI for faster and better scoring (TOEFL iBT, 2024)', url: 'https://www.in.ets.org/content/dam/ets-india/pdfs/toefl/toefl-human-ai-scoring.pdf', note: '모든 답을 AI와 사람이 함께 채점하고, 둘이 다르면 두 번째 사람이 검토. 공정성과 드리프트 상시 점검.' },
    { title: 'ETS, Using AI to Craft Even Better Assessments (2024)', url: 'https://www.in.ets.org/content/dam/ets-india/pdfs/toefl/toefl-human-ai-assessment.pdf', note: '사람 전문가가 정의·검토·수정하고 AI는 빠르게 생성하는 9단계 출제 절차.' },
    { title: 'Agreement Between Large Language Models and Human Raters in Essay Scoring: A Research Synthesis (arXiv, 2025)', url: 'https://arxiv.org/abs/2512.14561', note: '연구 65편 종합. LLM 점수와 사람 점수의 일치도는 연구 간·연구 안에서 크게 달랐어요.' }
  ],
  script: `9월 29일 교육부가 한국어능력시험 토픽을 2029년부터 AI·디지털 기반으로 바꾸겠다고 발표했어요. 2025년 지원자가 56만 명을 넘었고, 2030년 100만 명이 목표예요.

문항은 문제은행으로 학습한 언어 모델이 만들고, AI가 기출 유사도와 난이도를 먼저 걸러요. 그다음 전문가가 검증하고, 그 의견을 AI가 다시 배워요. 사람이 고리 안에 들어간 이 구조를 사람 검토 고리라고 해요.

쓰기·말하기는 손글씨와 음성을 글자로 바꿔 AI가 1차 점수를 내고, 최종 검증은 전문 채점위원이 해요. 토플은 AI와 사람이 함께 채점하고, 둘이 다르면 두 번째 사람이 봐요. 집에서 보는 홈테스트는 행정 절차에 쓰이지 않는 낮은 등급부터 시작해요.

학교에서 AI 채점을 써 본다면 국가 시험처럼 AI는 1차, 최종 점수는 선생님이 정해요.`
};
