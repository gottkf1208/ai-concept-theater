/* S1-4 [입문] AI는 왜 그럴듯하게 틀릴까: 할루시네이션과 '찍기' 보상 */
export default {
  slug: 'v1-hallucination',
  track: 'S1',
  title: 'AI는 왜 그럴듯하게 틀릴까?',
  subtitle: '할루시네이션과 \'찍기\'를 보상하는 채점',
  summary: 'AI는 모르는 것도 자신 있게 답해요. 2025년 연구가 꼽은 이유는 두 가지예요. 한 번만 본 사실은 맞힐 수 없고, 채점 방식이 "모르겠다"보다 찍기를 더 높이 쳐 줘요.',
  keywords: ['할루시네이션', '환각', '그럴듯함', '사전학습', '싱글턴', '평가', '벤치마크', '찍기', '기권', '확신 임계값'],

  scenes: [
    {
      title: '세 번 물으니 세 번 다른 생일', dur: 13,
      captions: [
        { t: 0, text: '한 연구자가 AI에게 자기 생일을 물었더니 7월 3일, 6월 15일, 1월 1일로 매번 다르게 답했어요.' },
        { t: 5, text: '셋 다 틀렸는데, 말투는 늘 자신 있었어요.' },
        { t: 9, text: '왜 "모르겠어요"라고 하지 않을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const ask = P.box({ x: 330, y: 70, w: 560, h: 70, label: '"생일이 언제예요?"', sub: '', accent: 'ink' });
        tl.at(stage.appendChild(ask.el), .3, { from: 'up' });
        const answers = ['7월 3일', '6월 15일', '1월 1일'].map((d, i) => {
          const c = P.chip({ x: 330 + i * 200, y: 180, text: d, color: 'orange', size: 24 });
          tl.at(stage.appendChild(c.el), 1.3 + i * .8, { from: 'pop' });
          return c;
        });
        const real = P.chip({ x: 330, y: 260, text: '실제 생일: 가을', color: 'gray', size: 22 });
        tl.at(stage.appendChild(real.el), 4.0, { from: 'pop' });
        const note = P.text({ x: 330, y: 340, w: 880, text: '셋 다 <em>틀렸는데</em>, 말투는 늘 자신 있었어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 5.2, { from: 'up' });
        const q2 = P.text({ x: 330, y: 410, w: 880, text: '왜 "모르겠어요"라고 하지 않을까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(q2.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
          }
        };
      }
    },
    {
      title: '한 번 본 사실은 맞힐 수 없어요', dur: 14,
      captions: [
        { t: 0, text: 'AI는 여러 번 본 패턴은 잘 맞혀요.' },
        { t: 5, text: '생일처럼 규칙 없이 외워야 하는 사실이 데이터에 <em>딱 한 번</em>만 나온 걸 <em>싱글턴</em>이라고 해요.' },
        { t: 9.5, text: '2025년 연구는 그 비율만큼은 틀린다고 계산했어요. 예를 들어 그런 생일이 20%면, 적어도 20%는 지어내요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const title = P.text({ x: 340, y: 70, w: 880, text: '학습 데이터 안의 사실들', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(title.el), .3, { from: 'up' });
        const boxA = P.box({ x: 340, y: 140, w: 420, h: 140, label: '여러 번 나온 사실', sub: '패턴이 있어 잘 맞혀요', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(boxA.el), 1.2, { from: 'up' });
        const boxB = P.box({ x: 800, y: 140, w: 420, h: 140, label: '딱 한 번만 나온 사실(싱글턴)', sub: '생일처럼 외워야만 해요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(boxB.el), 2.1, { from: 'up' });
        const stat = P.text({ x: 340, y: 330, w: 880, text: '그 비율만큼은 <em>지어내요</em>.', size: 34, weight: 800 });
        tl.at(stage.appendChild(stat.el), 9.6, { from: 'up' });
        const example = P.text({ x: 340, y: 400, w: 880, text: '예: 한 번만 나온 생일이 20%라면, 적어도 20%는 지어내요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(example.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            boxA.on(t > 1.2); boxB.on(t > 2.1);
          }
        };
      }
    },
    {
      title: '채점이 찍기를 보상해요', dur: 13,
      captions: [
        { t: 0, text: '학습이 끝난 뒤에도 이 습관이 안 사라지는 이유가 있어요.' },
        { t: 4.5, text: 'AI를 평가하는 시험 대부분은 맞으면 1점, 틀려도 "모르겠어요"라고 해도 <em>0점</em>이에요.' },
        { t: 9, text: '그러면 찍는 쪽이 늘 점수가 높아요. 객관식에서 답을 비워 내는 학생이 없는 것과 같은 이치예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const title = P.text({ x: 340, y: 70, w: 880, text: '10문항 시험 · 이진 채점(맞으면 1점, 아니면 0점)', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(title.el), .3, { from: 'up' });
        const guess = P.box({ x: 340, y: 140, w: 420, h: 170, label: '항상 찍는 AI', sub: '10문항 모두 답함<br>정답 7 · 오답 3 → <b>총 7점</b>', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(guess.el), 1.2, { from: 'up' });
        const honest = P.box({ x: 800, y: 140, w: 420, h: 170, label: '확신 낮으면 "모르겠어요"', sub: '5문항만 답함, 나머지는 기권<br>정답 5 · 기권 5 → <b>총 5점</b>', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(honest.el), 2.1, { from: 'up' });
        const chip = P.chip({ x: 340, y: 350, text: '이진 채점에서는 늘 찍는 쪽이 유리해요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 4.8, { from: 'pop' });
        const final = P.text({ x: 340, y: 420, w: 880, text: '답을 비워 내는 학생이 없는 것과 같아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            guess.on(t > 1.2); honest.on(t > 2.1);
          }
        };
      }
    },
    {
      title: '해법 제안: 틀리면 감점', dur: 13,
      captions: [
        { t: 0, text: '연구진은 채점 규칙을 바꾸자고 제안해요.' },
        { t: 4.5, text: '확신이 일정 기준 이상일 때만 답하게 하고, 틀리면 <em>t/(1−t)</em>점 감점하자는 거예요.' },
        { t: 9, text: '그러면 확신이 낮을 때는 "모르겠어요"가 오히려 이득이 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const formula = P.box({ x: 340, y: 70, w: 880, h: 100, label: '틀리면 t/(1−t)점 감점', sub: '맞으면 +1점 · "모르겠어요"는 0점 (예: t=0.5 → 감점 1, t=0.9 → 감점 9)', accent: 'ink', icon: P.ICON.x });
        tl.at(stage.appendChild(formula.el), .3, { from: 'up' });
        const guess = P.box({ x: 340, y: 190, w: 420, h: 150, label: '항상 찍는 AI', sub: '정답 7 · 오답 3(감점 적용)<br>→ <b>총 0점</b>', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(guess.el), 2.2, { from: 'up' });
        const honest = P.box({ x: 800, y: 190, w: 420, h: 150, label: '확신 낮으면 "모르겠어요"', sub: '정답 5 · 기권 5(감점 없음)<br>→ <b>총 5점</b>', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(honest.el), 3.1, { from: 'up' });
        const chip = P.chip({ x: 340, y: 390, text: '순위가 뒤집혀요: 솔직한 쪽이 1등', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.0, { from: 'pop' });
        const final = P.text({ x: 340, y: 450, w: 880, text: '모를 때는 "모르겠어요"가 <em>이득</em>이 돼요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            guess.on(t > 2.2); honest.on(t > 3.1);
          }
        };
      }
    },
    {
      title: '확률과 채점이 만든 실수, 그래서 할 일', dur: 14,
      captions: [
        { t: 0, text: '할루시네이션은 속이려는 거짓말이 아니라, 확률로 빈칸을 채우고 찍기가 보상받은 결과예요.' },
        { t: 5, text: '숫자·날짜·사람 이름은 1차 출처로 확인하세요.' },
        { t: 9.5, text: '질문할 땐 "확실하지 않으면 모른다고 답해 줘, 근거도 붙여 줘"라고 먼저 말해 줘요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 1차 출처로 확인', '숫자·날짜·사람 이름은 꼭'],
          ['② "모르면 모른다고" 요청', '질문 끝에 덧붙이기'],
          ['③ 근거 요구', '"출처를 붙여 줘"']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 300, y: 140, w: 280, h: 160, label, sub, accent: i === 1 ? 'aqua' : (i === 2 ? 'orange' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 420, w: 880, text: '확신에 찬 말투가 <em>정답의 신호</em>는 아니에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '채점 규칙 바꾸기',
    desc: '같은 10문항을 두 AI가 풀어요. <b>항상 찍는 AI</b>는 전부 답하고, <b>솔직한 AI</b>는 확신이 임계값 t보다 낮으면 "모르겠어요"라고 해요. 슬라이더로 t를 올리고, 버튼으로 채점을 <b>이진 채점</b>에서 <b>감점 채점</b>으로 바꿔 순위가 어떻게 뒤집히는지 보세요. 예시 문항이에요.',
    mount(el, P) {
      const CONF = [.95, .9, .85, .8, .7, .6, .5, .4, .3, .2];
      const CORRECT = CONF.map(c => c >= .5);
      let mode = 'binary', t = .7;

      function compute(answerIf) {
        let score = 0; const marks = [];
        CONF.forEach((c, i) => {
          if (!answerIf(c)) { marks.push('abst'); return; }
          if (CORRECT[i]) { score += 1; marks.push('ok'); }
          else {
            if (mode === 'penalty') score -= t / (1 - t);
            marks.push('x');
          }
        });
        return { score, marks };
      }
      const row = marks => {
        const wrap = P.h('div', { class: 'sim-marks' });
        marks.forEach((m, i) => wrap.append(P.h('div', { class: `sim-mark sim-${m}`, title: `확신 ${Math.round(CONF[i] * 100)}%` })));
        return wrap;
      };

      const guessCard = P.h('div', { class: 'sim-card' },
        P.h('div', { class: 'sim-card-h' }, '항상 찍는 AI (10문항 모두 답함)'));
      const honestCard = P.h('div', { class: 'sim-card' },
        P.h('div', { class: 'sim-card-h' }, '솔직한 AI (확신 < t면 "모르겠어요")'));
      const modeLab = P.h('div', { class: 'sim-mode' }, '현재 채점: 이진');
      const tLab = P.h('label', { for: 'sim-t', class: 'sim-rl' }, '확신 임계값 t = ', P.h('b', {}, '0.70'), P.h('span', { class: 'sim-pen' }, ' (틀리면 2.33점 감점)'));
      const tRange = P.h('input', { type: 'range', id: 'sim-t', min: '.5', max: '.9', step: '.05', value: '.7' });
      const penBtn = P.h('button', { class: 'btn primary', type: 'button' }, '감점 채점으로 바꾸기');
      const binBtn = P.h('button', { class: 'btn', type: 'button' }, '이진 채점으로');
      const bar = P.h('div', { class: 'sim-bar' }, penBtn, binBtn, modeLab);
      const rangeRow = P.h('div', { class: 'sim-range-row' }, tLab, tRange);

      el.append(P.h('div', { class: 'sim-wrap' }, bar, rangeRow, P.h('div', { class: 'sim-cards' }, guessCard, honestCard)));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-mode{margin-left:auto;font-size:13px;color:var(--muted);font-weight:700}
        .sim-range-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-rl{font-size:13px;color:var(--muted)}
        .sim-pen{font-family:var(--mono);color:var(--muted)}
        .sim-range-row input[type=range]{width:200px;max-width:100%}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
        .sim-card-h{font-size:14px;font-weight:700;color:var(--ink,#1B1F24);margin-bottom:10px;word-break:keep-all}
        .sim-card.sim-lead{border-color:var(--acc1);box-shadow:0 0 0 2px var(--acc1) inset}
        .sim-marks{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}
        .sim-mark{width:22px;height:22px;border-radius:5px;background:var(--line)}
        .sim-mark.sim-ok{background:var(--acc1)}
        .sim-mark.sim-x{background:var(--acc2)}
        .sim-mark.sim-abst{background:var(--paper);border:2px dashed var(--line)}
        .sim-score{font-family:var(--mono);font-size:20px;font-weight:700}
        .sim-rank{display:inline-block;margin-left:8px;font-size:12px;font-weight:700;color:var(--acc1)}
      ` }));

      function render() {
        tLab.querySelector('b').textContent = t.toFixed(2);
        tLab.querySelector('.sim-pen').textContent = ` (틀리면 ${(t / (1 - t)).toFixed(2)}점 감점)`;
        tRange.value = String(t);
        modeLab.textContent = '현재 채점: ' + (mode === 'binary' ? '이진' : '감점');

        const g = compute(() => true);
        const hres = compute(c => c >= t);

        guessCard.querySelectorAll('.sim-marks,.sim-score,.sim-rank').forEach(n => n.remove());
        honestCard.querySelectorAll('.sim-marks,.sim-score,.sim-rank').forEach(n => n.remove());
        const lead = g.score === hres.score ? null : (g.score > hres.score ? 'guess' : 'honest');
        guessCard.append(row(g.marks), P.h('div', { class: 'sim-score' }, `총점 ${g.score.toFixed(2)}`, lead === 'guess' ? P.h('span', { class: 'sim-rank' }, '1등') : ''));
        honestCard.append(row(hres.marks), P.h('div', { class: 'sim-score' }, `총점 ${hres.score.toFixed(2)}`, lead === 'honest' ? P.h('span', { class: 'sim-rank' }, '1등') : ''));
        guessCard.classList.toggle('sim-lead', lead === 'guess');
        honestCard.classList.toggle('sim-lead', lead === 'honest');
      }
      penBtn.addEventListener('click', () => { mode = 'penalty'; render(); });
      binBtn.addEventListener('click', () => { mode = 'binary'; render(); });
      tRange.addEventListener('input', () => { t = +tRange.value; render(); });
      render();
    }
  },

  teacherLines: [
    'AI는 모를 때도 <b>찍는 쪽이 점수를 더 받도록</b> 배워 왔어요. 그래서 자신 있게 틀려요.',
    "AI에게 물을 땐 <b>'확실하지 않으면 모른다고 해 줘'</b>라고 먼저 말해 줘요."
  ],
  tip: {
    body: '숫자·날짜·사람 이름·법 조항은 1차 출처로 다시 확인하세요. 질문 끝에 "확실하지 않은 부분은 모른다고 표시하고, 근거가 있는 문장에는 출처를 붙여 줘"를 붙이면 지어낸 답이 눈에 띄게 드러나요.',
    extra: '생일, 개교일, 특정인의 논문 제목처럼 규칙 없이 외워야 하는 사실에서 할루시네이션이 가장 잦아요. 이런 질문은 검색이나 자료 첨부와 함께 하세요.'
  },
  myth: {
    myth: 'AI가 일부러 거짓말을 한다.',
    fact: '속이려는 의도는 없어요. 한 번만 본 사실을 확률로 채우고, "모르겠다"보다 찍기가 점수를 더 받아 온 결과예요. 그래서 확신에 찬 말투는 정답의 신호가 아니에요.'
  },
  sources: [
    { title: 'Kalai, Nachum, Vempala, Zhang — Why Language Models Hallucinate (arXiv, 2025)', url: 'https://arxiv.org/abs/2509.04664', note: '사전학습의 통계적 오류, 싱글턴 비율, 이진 채점이 찍기를 보상한다는 분석과 확신 임계값 채점 제안.' },
    { title: 'Huang et al. — A Survey on Hallucination in Large Language Models (arXiv, 2023)', url: 'https://arxiv.org/abs/2311.05232', note: '할루시네이션을 "그럴듯하지만 사실이 아닌 내용"으로 정의.' },
    { title: 'Claude 용어집 — HHH', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: '정직한 AI는 불확실성을 인정해야 한다는 학습 목표.' }
  ],
  script: `한 연구자가 AI에게 자기 생일을 물었더니 7월 3일, 6월 15일, 1월 1일로 매번 다르게, 그것도 자신 있게 답했어요. 셋 다 틀렸는데 왜 "모르겠어요"라고 안 했을까요.

2025년 연구는 이유를 둘로 꼽아요. AI는 여러 번 본 패턴은 잘 맞히지만, 생일처럼 규칙 없이 외워야 하는 사실이 데이터에 딱 한 번만 나왔다면 그 비율만큼은 지어내요. 또 평가 시험 대부분이 맞으면 1점, "모르겠어요"도 0점이라 찍는 쪽이 늘 점수가 높아요.

연구진은 채점을 바꾸자고 제안해요. 확신이 기준 이상일 때만 답하게 하고 틀리면 감점하면, 모를 땐 "모르겠어요"가 오히려 이득이 돼요.

할루시네이션은 거짓말이 아니라 확률과 채점이 만든 행동이에요. 숫자·날짜·사람 이름은 1차 출처로 확인하고, "확실하지 않으면 모른다고, 근거도 붙여 줘"라고 먼저 말해 주세요.`
};
