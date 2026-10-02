/* V2 S5-36 AI 채점, 2026년 교실에서는 어디까지 믿을까 — LLM 심판의 편향과 수행평가 AI 관리 방안 */
export default {
  slug: 'v5-grading',
  track: 'S5',
  title: 'AI 채점, 2026년 교실에서는 어디까지 믿을까',
  subtitle: 'LLM 심판의 편향과 수행평가 AI 관리 방안',
  summary: '두 학생 답을 비교시켰더니 순서만 바꿔도 판정이 뒤집혔어요. AI를 심판으로 쓸 때 생기는 위치·장황함·자기 선호 편향을 잡는 방법과, 2026학년도부터 적용되는 교육부·교육청 수행평가 AI 관리 방안, 그리고 학생 평가를 고영향 AI로 둔 법까지 정리해요.',
  keywords: ['AI 채점', 'LLM-as-a-judge', '위치 편향', '장황함 편향', '자기 선호 편향', '루브릭', 'G-Eval', '수행평가', 'AI 활용 관리 방안', '고영향 인공지능', '고위험 AI'],

  scenes: [
    {
      title: '순서만 바꿨는데', dur: 14,
      captions: [
        { t: 0, text: '"급식 잔반을 줄이는 방법은?" 학생 답 A·B를 AI 심판에게 비교시켰어요.' },
        { t: 5, text: '1차는 A가 먼저, B가 나중이었어요. 결과는 <em>A 승</em>.' },
        { t: 9.5, text: '내용은 그대로 두고 <em>자리만 바꿔</em> 다시 물었더니 판정이 <em>뒤집혔어요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const head = P.text({ x: 330, y: 60, w: 900, text: '같은 두 학생 답 A·B를 AI 심판에게 두 번 비교시켰어요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(head.el), .3, { from: 'up' });

        const r1a = P.box({ x: 330, y: 140, w: 250, h: 110, label: '1번 자리: A', sub: '짧고 근거 있음', accent: 'ink' });
        const r1b = P.box({ x: 600, y: 140, w: 250, h: 110, label: '2번 자리: B', sub: '길지만 근거 약함', accent: 'ink' });
        const w1 = P.box({ x: 900, y: 140, w: 310, h: 110, label: '판정: A 승', sub: '1차 질문', accent: 'orange' });
        [r1a, r1b, w1].forEach((b, i) => tl.at(stage.appendChild(b.el), .4 + i * .9, { from: 'up' }));
        const arrow1 = P.arrow(lines, { x1: 850, y1: 195, x2: 900, y2: 195, width: 4, color: '#1B1F24' });

        const r2a = P.box({ x: 330, y: 300, w: 250, h: 110, label: '1번 자리: B', sub: '똑같은 B 답', accent: 'ink' });
        const r2b = P.box({ x: 600, y: 300, w: 250, h: 110, label: '2번 자리: A', sub: '똑같은 A 답', accent: 'ink' });
        const w2 = P.box({ x: 900, y: 300, w: 310, h: 110, label: '판정: B 승', sub: '2차 질문 · 자리만 바꿈', accent: 'orange' });
        [r2a, r2b, w2].forEach((b, i) => tl.at(stage.appendChild(b.el), 5.2 + i * .9, { from: 'up' }));
        const arrow2 = P.arrow(lines, { x1: 850, y1: 355, x2: 900, y2: 355, width: 4, color: '#1B1F24' });

        const note = P.text({ x: 330, y: 460, w: 900, text: '내용은 그대로인데, <em>자리만 바꿔도</em> 판정이 뒤집혔어요.', size: 29, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            arrow1.draw(P.clamp((t - 1.6) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 6.4) / .5, 0, 1));
            [r1a, r1b, w1].forEach((b, i) => b.on(t > .4 + i * .9));
            [r2a, r2b, w2].forEach((b, i) => b.on(t > 5.2 + i * .9));
          }
        };
      }
    },
    {
      title: 'AI 심판의 버릇', dur: 13,
      captions: [
        { t: 0, text: '2023년 연구가 LLM을 심판으로 쓸 때 생기는 버릇 세 가지를 밝혔어요.' },
        { t: 5, text: '먼저 나온 답을 미는 <em>위치 편향</em>, 긴 답을 미는 <em>장황함 편향</em>, AI 문체를 미는 <em>자기 선호 편향</em>이에요.' },
        { t: 10, text: '그래도 잘 설계한 심판은 사람 선호와 <em>80% 넘게</em> 일치해요. 사람끼리 맞추는 수준이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const items = [
          ['위치 편향', '먼저 나온 답을 더 좋게 봐요', P.ICON.eye],
          ['장황함 편향', '길기만 해도 더 좋게 봐요', P.ICON.doc],
          ['자기 선호 편향', 'AI가 쓴 듯한 문체를 더 좋게 봐요', P.ICON.brain]
        ].map(([label, sub, icon], i) => {
          const b = P.box({ x: 380, y: 80 + i * 140, w: 800, h: 112, label, sub, accent: 'orange', icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.5, { from: 'right' });
          return b;
        });
        const chip = P.chip({ x: 380, y: 530, text: '잘 설계하면 사람끼리 맞추는 수준(80%+) 일치', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chip.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            items.forEach((b, i) => b.on(t > .4 + i * 1.5));
          }
        };
      }
    },
    {
      title: '버릇을 잡는 세 가지', dur: 14,
      captions: [
        { t: 0, text: '잡는 방법 첫째, <em>루브릭</em>이에요. 기준·수준·예시 답안을 미리 줘요.' },
        { t: 5, text: '둘째, 점수보다 <em>이유를 먼저</em> 쓰게 해요(G-Eval 방식). 사람 평가와 더 잘 맞았어요.' },
        { t: 10, text: '셋째, 순서를 바꿔 <em>두 번</em> 물어요. 결과가 다르면 <em>무승부</em>로 두고 사람이 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 290, pose: 'point' });
        stage.append(q.el);
        const a = P.box({ x: 380, y: 90, w: 820, h: 120, label: '① 루브릭', sub: '기준 · 수준별 설명 · 예시 답안', accent: 'aqua', icon: P.ICON.doc });
        const b = P.box({ x: 380, y: 250, w: 820, h: 120, label: '② 이유 먼저, 점수는 나중', sub: 'G-Eval 방식 · 단계별 사고 후 채점', accent: 'ink', icon: P.ICON.check });
        const c = P.box({ x: 380, y: 410, w: 820, h: 130, label: '③ 순서 바꿔 두 번 묻기', sub: '결과가 다르면 무승부 → 사람 검토', accent: 'orange', icon: P.ICON.search });
        [a, b, c].forEach((bx, i) => tl.at(stage.appendChild(bx.el), .3 + i * 2.3, { from: 'up' }));
        const arrow1 = P.arrow(lines, { x1: 790, y1: 210, x2: 790, y2: 250, width: 4, color: '#1B1F24' });
        const arrow2 = P.arrow(lines, { x1: 790, y1: 370, x2: 790, y2: 410, width: 4, color: '#1B1F24' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            [a, b, c].forEach((bx, i) => bx.on(t > .3 + i * 2.3));
            arrow1.draw(P.clamp((t - 2.6) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 4.9) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '2026학년도 학교 규칙', dur: 14,
      captions: [
        { t: 0, text: '2025년 12월, 교육부와 교육청이 <em>수행평가 AI 활용 관리 방안</em>을 함께 마련했어요.' },
        { t: 5, text: 'AI를 일률 금지하지 않고 <em>활용 범위</em>부터 정하고 <em>사용한 AI와 프롬프트를 표기</em>하게 해요.' },
        { t: 10, text: '출처 없이 제출하면 <em>부정행위</em>예요. 수업 중 <em>직접 관찰</em>로 신뢰성도 높여요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 280, pose: 'base' });
        stage.append(q.el);
        const items = [
          ['① 범위 설정', 'AI 활용 범위부터 정해요', ''],
          ['② 과정 표기', 'AI 종류·프롬프트 표기', 'aqua'],
          ['③ 사전교육', '학생 유의 사항 안내', ''],
          ['④ 평가 설계', '수업 중 직접 관찰 중심', 'orange'],
          ['⑤ 개인정보', '프롬프트에 넣지 않기', '']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 370 + (i % 3) * 300, y: 90 + Math.floor(i / 3) * 170, w: 280, h: 140, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const chip1 = P.chip({ x: 370, y: 450, text: '출처 없이 제출 = 부정행위', color: 'orange', size: 20 });
        const chip2 = P.chip({ x: 740, y: 450, text: '2026학년도 시행지침에 반영', color: 'ink', size: 20 });
        tl.at(stage.appendChild(chip1.el), 10.2, { from: 'pop' });
        tl.at(stage.appendChild(chip2.el), 11, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            items.forEach((b, i) => b.on(t > .3 + i * .8));
          }
        };
      }
    },
    {
      title: '법이 보는 학생 평가', dur: 13,
      captions: [
        { t: 0, text: '학생 평가에 쓰는 AI는 법에서도 <em>특히 조심할 영역</em>이에요.' },
        { t: 5, text: '한국 AI 기본법은 <em>고영향 인공지능</em>으로, EU AI법은 <em>고위험</em>으로 둬요.' },
        { t: 9, text: 'AI 점수는 <em>피드백 초안</em>이고 점수를 확정하는 건 언제나 <em>선생님</em>이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const c1 = P.chip({ x: 340, y: 110, text: '한국 AI 기본법: 학생 평가 = 고영향 인공지능', color: 'aqua', size: 21 });
        const c2 = P.chip({ x: 340, y: 180, text: 'EU AI법: 학습 결과 평가 = 고위험(2027-12-02부터 의무)', color: 'ink', size: 21 });
        tl.at(stage.appendChild(c1.el), .4, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 2, { from: 'pop' });
        const box = P.box({ x: 340, y: 280, w: 880, h: 140, label: 'AI 점수 = 피드백 초안', sub: '점수 확정 = 선생님', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(box.el), 5.2, { from: 'up' });
        const final = P.text({ x: 340, y: 460, w: 880, text: '마지막 결정은 언제나 <em>사람</em>이 해요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            box.on(t > 5.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '심판 편향 실험실',
    desc: '"급식 잔반을 줄이는 방법은?"이라는 같은 질문에 학생이 쓴 답 A(짧고 근거 있음)·B(길지만 근거 약함)를 AI 심판에게 비교시켜요. <b>순서 바꾸기</b>를 누르면 두 답의 자리가 바뀌고, <b>B에 군더더기 문장 추가</b>를 누르면 B가 점점 길어져요. 판정 규칙이 자리와 길이에 점수를 더해 주기 때문에 승자가 뒤집혀요. <b>루브릭 + 이유 먼저 켜기</b>를 누르면 자리·길이를 무시하고 내용 기준표로만 채점해 결과가 흔들리지 않아요. 판정 규칙은 연구에서 밝힌 편향을 흉내 낸 예시 값이에요. 실제 모델 출력이 아니에요.',
    mount(el, P) {
      let order = ['A', 'B'];
      let bAdds = 0;
      let rubricOn = false;
      let flipCount = 0;
      let lastWinner = null;

      const TEXT = {
        A: '배식 전에 학생이 스스로 먹을 양을 정하게 하면 잔반이 줄어요. 작년에 이 방법을 쓴 학급은 잔반이 눈에 띄게 줄었다는 기록이 있어요.',
        B: '잔반을 줄이려면 모두 다 같이 노력해야 해요. 급식실 환경도 중요하고 선생님 지도도 필요하고 학생 습관도 바뀌어야 해요.'
      };
      const FILLERS = [
        ' 그리고 분위기가 더 좋아질 것 같아요.',
        ' 다 같이 노력하면 틀림없이 좋아질 거예요.',
        ' 결국 모두가 조금씩 바뀌면 되는 문제예요.'
      ];
      const CONTENT = { A: 6, B: 5 };
      const RUBRIC = { A: { claim: 3, evidence: 3, structure: 2 }, B: { claim: 2, evidence: 1, structure: 1 } };

      const textOf = key => {
        let t = TEXT[key];
        if (key === 'B') for (let i = 0; i < bAdds; i++) t += FILLERS[i];
        return t;
      };
      const lenBonus = key => Math.floor((key === 'A' ? 100 : 100 + 40 * bAdds) / 40);
      const rubricSum = key => RUBRIC[key].claim + RUBRIC[key].evidence + RUBRIC[key].structure;
      const scoreOf = (key, slotIdx) => rubricOn ? rubricSum(key) : CONTENT[key] + (slotIdx === 0 ? 2 : 0) + lenBonus(key);
      const winnerFor = ord => {
        const s0 = scoreOf(ord[0], 0), s1 = scoreOf(ord[1], 1);
        if (s0 === s1) return '무승부';
        return s0 > s1 ? ord[0] : ord[1];
      };

      const slots = [0, 1].map(i => {
        const nameEl = P.h('div', { class: 'sim-slot-name' }, '');
        const textEl = P.h('div', { class: 'sim-slot-text' }, '');
        const scoreEl = P.h('div', { class: 'sim-slot-score' }, '');
        const card = P.h('div', { class: 'sim-slot' }, P.h('div', { class: 'sim-slot-h' }, `${i + 1}번 자리`), nameEl, textEl, scoreEl);
        return { card, nameEl, textEl, scoreEl };
      });
      const verdictEl = P.h('div', { class: 'sim-verdict' }, '');
      const matchEl = P.h('div', { class: 'sim-match' }, '');
      const logEl = P.h('div', { class: 'sim-log' }, '');
      const swapBtn = P.h('button', { class: 'btn', type: 'button' }, '순서 바꾸기');
      const padBtn = P.h('button', { class: 'btn', type: 'button' }, 'B에 군더더기 문장 추가');
      const rubricBtn = P.h('button', { class: 'btn primary', type: 'button' }, '루브릭 + 이유 먼저 켜기');

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-q' }, '질문: "급식 잔반을 줄이는 방법은?" — 학생 답 A·B를 비교시켜요.'),
        P.h('div', { class: 'sim-slots' }, slots[0].card, slots[1].card),
        verdictEl, matchEl,
        P.h('div', { class: 'sim-bar' }, swapBtn, padBtn, rubricBtn),
        logEl
      ));
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-q{font-size:14px;color:var(--muted)}
        .sim-slots{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;max-width:100%}
        .sim-slot{min-width:0;border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
        .sim-slot-h{font-size:12px;font-weight:700;color:var(--muted);margin-bottom:6px}
        .sim-slot-name{font-size:14px;font-weight:700;margin-bottom:6px;word-break:keep-all}
        .sim-slot-text{font-size:13px;line-height:1.5;color:#1B1F24;margin-bottom:10px;word-break:keep-all}
        .sim-slot-score{font-family:var(--mono);font-size:12px;color:var(--muted);word-break:keep-all}
        .sim-verdict{font-size:18px;font-weight:800}
        .sim-match{font-size:13px;color:var(--acc1);font-weight:700}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-log{font-family:var(--mono);font-size:12px;color:var(--muted)}
      `
      }));

      function render() {
        const winner = winnerFor(order);
        if (lastWinner !== null && winner !== lastWinner) flipCount++;
        lastWinner = winner;

        [0, 1].forEach(i => {
          const key = order[i];
          slots[i].nameEl.textContent = key === 'A' ? '학생 답 A (짧고 근거 있음)' : '학생 답 B (길지만 근거 약함)';
          slots[i].textEl.textContent = textOf(key);
          const sc = scoreOf(key, i);
          slots[i].scoreEl.textContent = rubricOn
            ? `루브릭 점수 ${sc} (주장${RUBRIC[key].claim}·근거${RUBRIC[key].evidence}·구성${RUBRIC[key].structure})`
            : `점수 ${sc} = 내용${CONTENT[key]} + 자리보너스${i === 0 ? 2 : 0} + 길이보너스${lenBonus(key)}`;
        });

        verdictEl.textContent = winner === '무승부' ? '판정: 무승부' : `판정: 학생 답 ${winner} 승`;

        if (rubricOn) {
          const w1 = winnerFor(order);
          const w2 = winnerFor([order[1], order[0]]);
          matchEl.textContent = `순서 바꿔 두 번 묻기 결과: ${w1 === w2 ? '일치' : '불일치'}`;
          matchEl.style.display = '';
        } else {
          matchEl.style.display = 'none';
        }

        padBtn.disabled = bAdds >= 3;
        padBtn.textContent = bAdds >= 3 ? 'B에 군더더기 문장 추가 (최대)' : 'B에 군더더기 문장 추가';
        rubricBtn.textContent = rubricOn ? '루브릭 끄기' : '루브릭 + 이유 먼저 켜기';
        logEl.textContent = `판정 뒤집힘 ${flipCount}회`;
      }

      swapBtn.addEventListener('click', () => { order = [order[1], order[0]]; render(); });
      padBtn.addEventListener('click', () => { if (bAdds < 3) { bAdds++; render(); } });
      rubricBtn.addEventListener('click', () => { rubricOn = !rubricOn; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 심판은 <b>먼저 나온 답, 긴 답</b>을 더 좋게 보는 버릇이 있어요. 그래서 순서를 바꿔 두 번 물어봐요.',
    'AI가 준 점수는 <b>피드백 초안</b>이에요. 점수를 정하는 사람은 선생님이에요.'
  ],
  tip: {
    body: '수행평가 전에 "AI를 써도 되는 단계와 안 되는 단계"를 평가 요소별로 정해 안내하고, 제출물 끝에 "사용한 AI 종류 / 넣은 프롬프트 / 어떻게 고쳤는지" 세 칸 표기 양식을 붙이세요. AI로 피드백 초안을 받을 때는 루브릭을 함께 주고 이유부터 쓰게 해요. 순서도 바꿔 두 번 물어요.',
    extra: '학생 결과물을 AI에 넣어야 한다면 주소·연락처 같은 개인정보를 지운 사본으로 하세요. 최종 점수와 학생부 기록은 수업 중 직접 관찰한 근거로 선생님이 정해요.'
  },
  myth: {
    myth: 'AI는 기계라서 사람보다 공정하게 채점한다.',
    fact: 'AI 심판은 순서·길이·AI 문체에 끌리는 편향이 있어요. 한국 AI 기본법은 학생 평가에 쓰는 AI를 고영향 영역으로, EU AI법은 고위험으로 둬요. 편향이 있는 만큼 사람 검토가 따라야 해요.'
  },
  sources: [
    { title: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (arXiv/NeurIPS 2023)', url: 'https://arxiv.org/abs/2306.05685', note: 'LLM 심판의 위치 편향·장황함 편향·자기 선호 편향을 밝히고, 강한 심판은 사람 선호와 80% 넘게 일치한다고 보고했어요.' },
    { title: 'G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment (arXiv, 2023)', url: 'https://arxiv.org/abs/2303.16634', note: '단계별 사고 후 채점하는 방식이 사람 평가와의 상관을 끌어올렸고, LLM이 LLM의 글을 더 좋게 보는 편향 가능성도 지적했어요.' },
    { title: '교육부 보도자료: 수행평가 시, 인공지능(AI) 활용 관리 방안 (2025-12-23)', url: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=104984&lev=0&searchType=null&statusYN=W&page=1&s=moe&m=020402&opType=N', note: '수행평가에서 AI 활용 범위·과정 표기·사전교육·평가 설계·개인정보 보호를 다루는 5개 영역 관리 방안이에요.' },
    { title: '인공지능 발전과 신뢰 기반 조성 등에 관한 기본법 제2조 (국가법령정보센터)', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=282791&joNo=0002&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR', note: '유아·초등·중등교육에서의 학생 평가에 쓰이는 AI를 고영향 인공지능으로 규정해요.' }
  ],
  script: `급식 잔반을 줄이는 방법을 묻고 학생 답 두 개를 AI 심판에게 비교시켰어요. 내용은 그대로인데 순서만 바꿔 다시 물었더니 판정이 뒤집혔어요.

2023년 연구가 이런 버릇을 밝혔어요. 먼저 나온 답을 미는 위치 편향, 긴 답을 미는 장황함 편향, AI 문체를 미는 자기 선호 편향이에요. 그래도 잘 설계한 심판 모델은 사람 평가와 80% 넘게 일치해요. 순서를 바꿔 두 번 물어 결과가 다르면 무승부로 두고 사람이 봐요.

2025년 12월 교육부와 교육청도 수행평가 AI 활용 관리 방안을 마련했어요. 금지보다 활용 범위와 채점 기준을 먼저 정하게 했어요. 사용한 AI와 프롬프트는 표기하게 하고 수업 중 직접 관찰로 신뢰성을 높이도록 했어요.

학생 평가에 쓰는 AI는 한국 AI 기본법에서 고영향 인공지능으로, EU AI법에서는 고위험으로 둬요. AI 점수는 피드백 초안이고, 최종 점수는 언제나 선생님이 정해요.`
};
