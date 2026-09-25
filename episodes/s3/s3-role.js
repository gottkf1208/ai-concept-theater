/* E18 [B] 역할을 주면 왜 답이 달라질까: 시스템 프롬프트 */
export default {
  slug: 's3-role',
  track: 'B',
  title: '역할을 주면 왜 답이 달라질까',
  subtitle: '시스템 프롬프트',
  summary: '"초등 담임 교사로서 답해 줘" 한 문장이 답의 말투·길이·예시를 어떻게 바꾸는지, 그 뒤에 있는 원리와 잘 쓰는 법을 3분에.',
  keywords: ['시스템 프롬프트', '역할 지정', 'InstructGPT', '프롬프트 엔지니어링', '지시 따르기'],

  scenes: [
    {
      title: '같은 질문, 다른 답', dur: 13,
      captions: [
        { t: 0, text: '"초등 5학년 담임 교사로서 답해 줘"라고 붙였더니, 같은 질문인데 <em>말투·길이·예시</em>가 확 달라진 적 있으신가요?' },
        { t: 5, text: '질문은 똑같았어요. 앞에 붙인 <em>한 문장</em>이 답을 이렇게 바꿔요.' },
        { t: 9.5, text: '똑같은 질문인데 왜 <em>이렇게</em> 달라졌을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 400, size: 280, pose: 'oops' });
        stage.append(q.el);
        const qText = P.text({ x: 340, y: 60, w: 900, text: '"급식 잔반 줄이기 방법 알려 줘"', size: 30, weight: 800 });
        tl.at(stage.appendChild(qText.el), .3, { from: 'up' });
        const bareB = P.bubble({ x: 340, y: 150, w: 540, text: '급식 잔반을 줄이려면 배식량을 조절하고, 잔반이 많은 학생에게는 청소 당번을 맡기는 방법도 있습니다.', tail: 'left' });
        tl.at(stage.appendChild(bareB.el), 1.2, { from: 'left' });
        const chip = P.chip({ x: 340, y: 330, text: '+ "초등 5학년 담임 교사로서 답해 줘"', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const roleB = P.bubble({ x: 650, y: 400, w: 580, text: '얘들아, 잔반 줄이는 법 3가지! ① 먹을 수 있는 만큼만 담기 ② 반찬 골고루 맛보기 ③ 남기면 이유 말해보기', tail: 'left', tone: 'aqua' });
        tl.at(stage.appendChild(roleB.el), 6.6, { from: 'right' });
        const qq = P.text({ x: 340, y: 610, w: 860, text: '똑같은 질문인데, 왜 <em>이렇게</em> 달라졌을까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
          }
        };
      }
    },
    {
      title: '원리: 지시를 따르도록 학습', dur: 14,
      captions: [
        { t: 0, text: '모델은 원래 다음에 올 말을 잇는, <em>다음 말 잇기</em> 프로그램이었어요.' },
        { t: 5, text: '사람 피드백으로 <em>지시를 따르도록</em> 추가 학습을 시켰어요.' },
        { t: 10.5, text: '그래서 앞에 놓인 지시(역할·규칙)를 <em>강하게</em> 따라가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 420, size: 260, pose: 'think' });
        stage.append(q.el);
        const steps = [
          { l: '원래 모델', s: '다음 말 잇기만 했어요', acc: 'ink', icon: P.ICON.doc },
          { l: '사람 피드백', s: '"이 답이 더 좋아요" 평가', acc: 'aqua', icon: P.ICON.hand },
          { l: '추가 학습', s: '지시를 따르도록 훈련', acc: 'aqua', icon: P.ICON.brain },
          { l: '지시 따르는 모델', s: '앞에 놓인 지시를 강하게 따라가요', acc: 'orange', icon: P.ICON.check }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 150, w: 260, h: 130, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.7, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 215, x2: 360 + i * 300, y2: 215, width: 5, color: '#1B1F24' }));
        const label = P.text({ x: 60, y: 340, w: 1160, text: 'InstructGPT(2022) — 사람 피드백으로 <i>지시 따르기</i>를 학습했어요', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label.el), 6.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.7 + i * 1.7)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.7 && t < 2.4 + i * 1.7));
          }
        };
      }
    },
    {
      title: '시스템 프롬프트란', dur: 13,
      captions: [
        { t: 0, text: '대화 맨 앞에 놓이는 \'무대 지시문\'이 있어요. 이걸 <em>시스템 프롬프트</em>라고 불러요.' },
        { t: 5, text: '역할·독자·형식·금지 사항을 적어 두면, <em>이후 모든 답</em>에 영향을 줘요.' },
        { t: 9.5, text: '앱마다 \'지침\'이나 \'맞춤 설정\'처럼 <em>다른 이름</em>을 써요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 280, pose: 'point' });
        stage.append(q.el);
        const sys = P.box({ x: 340, y: 70, w: 600, h: 120, label: '시스템 프롬프트', sub: '역할 · 독자 · 형식 · 금지 사항', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(sys.el), .4, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 640, y1: 190, x2: 640, y2: 290, width: 5, color: '#1B1F24' });
        const answers = ['답변 1', '답변 2', '답변 3'].map((t, i) => {
          const b = P.box({ x: 340 + i * 280, y: 300, w: 250, h: 110, label: t, sub: '영향을 받아요', accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), 2.2 + i * .6, { from: 'pop' });
          return b;
        });
        const names = P.text({ x: 340, y: 470, w: 820, text: '앱마다 <em>\'지침\'</em>, <em>\'맞춤 설정\'</em> 같은 다른 이름으로 불러요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(names.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            arrow.draw(P.clamp((t - 1) / .6, 0, 1));
            answers.forEach((b, i) => b.on(t > 2.2 + i * .6));
          }
        };
      }
    },
    {
      title: '잘 쓰는 법', dur: 13,
      captions: [
        { t: 0, text: '역할만 주고 끝내지 마세요. <em>독자·목적·형식·제약</em>을 같이 적을 때 효과가 커요.' },
        { t: 5, text: '명확하고 구체적으로, <em>예시</em>까지 넣어 주면 더 좋아요.' },
        { t: 9.5, text: '"전문가처럼 답해"보다 "5학년 학생에게 세 문장으로"가 <em>더 힘이 세요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 420, size: 280, pose: 'point' });
        stage.append(q.el);
        const weak = P.box({ x: 380, y: 120, w: 420, h: 140, label: '역할만', sub: '"전문가처럼 답해 줘"', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(weak.el), .4, { from: 'left' });
        const strong = P.box({ x: 380, y: 320, w: 420, h: 170, label: '독자·목적·형식·제약', sub: '"5학년 학생에게, 세 문장으로, 예시 하나 넣어서"', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(strong.el), 2.4, { from: 'left' });
        const vs = P.text({ x: 250, y: 260, w: 100, text: 'vs', size: 24, weight: 800, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(vs.el), 3.2, { from: 'pop' });
        const note = P.text({ x: 380, y: 540, w: 820, text: '<em>명확·구체적</em>으로, <em>예시</em>까지 넣어 주면 더 좋아요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 5.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            weak.on(t < 2.4);
            strong.on(t >= 2.4);
          }
        };
      }
    },
    {
      title: '할 일: 저장해 두기', dur: 13,
      captions: [
        { t: 0, text: '자주 쓰는 지시문은 <em>저장</em>해 두세요. 학급 안내문용, 평가 피드백용처럼요.' },
        { t: 5, text: '즐겨찾기나 메모장에 모아 두면 <em>다음에 또</em> 바로 쓸 수 있어요.' },
        { t: 9.5, text: '"질문 앞에 <em>상황을 먼저 말해 주면</em> AI가 더 잘 알아들어요."' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 300, pose: 'wave' });
        stage.append(q.el);
        const saved1 = P.box({ x: 380, y: 120, w: 380, h: 120, label: '학급 안내문용', sub: '저장해 둔 지시문', accent: 'aqua', icon: P.ICON.save });
        tl.at(stage.appendChild(saved1.el), .4, { from: 'up' });
        const saved2 = P.box({ x: 800, y: 120, w: 380, h: 120, label: '평가 피드백용', sub: '저장해 둔 지시문', accent: 'aqua', icon: P.ICON.save });
        tl.at(stage.appendChild(saved2.el), 1.6, { from: 'up' });
        const bubble = P.bubble({ x: 380, y: 300, w: 800, text: '"질문 앞에 <b>상황을 먼저 말해 주면</b> AI가 더 잘 알아들어."', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(bubble.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            saved1.on(t > .4);
            saved2.on(t > 1.6);
          }
        };
      }
    }
  ],

  interaction: {
    title: '지시문 토글 비교기',
    desc: '질문은 고정이에요. 토글 세 개를 켜고 꺼서 <b>지시문</b>이 바뀔 때 답이 어떻게 달라지는지 비교해 보세요. 오른쪽엔 지금 조합된 지시문이 나타나고, 복사할 수 있어요.',
    mount(el, P) {
      const QUESTION = '우리 반 급식 잔반 줄이기 방법 알려 줘';
      const ANSWERS = {
        '000': '급식 잔반을 줄이는 방법은 여러 가지가 있습니다. 배식량을 조절하고, 잔반이 많은 학생에게는 청소 당번을 맡기는 방법도 있고, 잔반량을 매일 측정해 게시하는 방법도 효과적입니다.',
        '100': '초등학교 5학년 담임 교사의 입장에서 답할게요. 배식 단계에서 적당량을 담도록 지도하고, 잔반이 많은 날엔 청소 당번을 정해 책임감을 갖게 하는 것도 방법이에요. 잔반량을 매주 측정해 학급에 안내해 보세요.',
        '010': '얘들아, 잔반 줄이는 방법 3가지! ① 먹을 수 있는 만큼만 담기 ② 반찬을 골고루 먹어보기 ③ 많이 남기면 청소 당번하기. 이렇게 하면 잔반이 훨씬 줄어들 거야!',
        '001': '급식 잔반을 줄이는 방법에는 여러 가지가 있습니다. 벌점이나 청소 당번 같은 벌칙보다는, 학급회의를 열어 학생들이 함께 규칙을 정하도록 하는 방식을 추천합니다. 스스로 정한 규칙일수록 잘 지켜지는 경향이 있습니다.',
        '110': '얘들아, 선생님이 잔반 줄이는 법 3가지를 알려줄게! ① 먹을 수 있는 만큼만 담기 ② 반찬을 골고루 맛보기 ③ 많이 남기면 청소 당번 정하기. 우리 반 잔반, 같이 줄여보자!',
        '101': '초등학교 5학년 담임 교사의 입장에서 답할게요. 벌점이나 청소 당번 같은 벌칙은 쓰지 않는 게 좋아요. 대신 학급회의를 열어 잔반 줄이기 규칙을 학생들이 직접 정하게 하면, 담임이 일방적으로 정하는 것보다 훨씬 잘 지켜져요.',
        '011': '얘들아, 잔반 줄이는 방법 3가지! ① 먹을 만큼만 담기 ② 골고루 맛보기 ③ 남기면 벌점 대신 학급회의에서 같이 이야기하기. 벌 받는 게 아니라 우리가 정하는 규칙이라서 더 잘 지켜질 거야!',
        '111': '얘들아, 선생님이 잔반 줄이는 법 3가지를 알려줄게! ① 먹을 수 있는 만큼만 담기 ② 반찬을 골고루 맛보기 ③ 남기면 벌점 대신, 학급회의에서 우리가 같이 규칙을 정하기. 벌 주는 게 아니라 우리가 정하는 거니까 훨씬 잘 지켜질 거야!'
      };
      const TOGGLES = [
        { on: false, label: '역할: 초등 담임', sys: '당신은 초등학교 5학년 담임 교사입니다.' },
        { on: false, label: '독자·형식: 5학년 학생용 · 3가지 · 짧게', sys: '독자는 5학년 학생이에요. 답은 3가지로 나누고, 각각 한 문장 정도로 짧게 써 주세요.' },
        { on: false, label: '제약: 벌칙 금지 · 학급회의로 정하기', sys: '벌점이나 청소 당번 같은 벌칙은 제안하지 마세요. 학급회의에서 다 함께 정하는 방식으로 안내해 주세요.' }
      ];

      const qBox = P.h('p', { class: 'sim-q' }, '질문(고정): ', P.h('b', {}, `"${QUESTION}"`));
      const toggleWrap = P.h('div', { class: 'sim-toggles' });
      const btns = TOGGLES.map((tg, i) => {
        const b = P.h('button', { class: i === 0 ? 'btn primary' : 'btn', type: 'button', 'aria-pressed': 'false' }, tg.label);
        b.addEventListener('click', () => {
          tg.on = !tg.on;
          b.setAttribute('aria-pressed', tg.on ? 'true' : 'false');
          render();
        });
        toggleWrap.append(b);
        return b;
      });

      const cardsWrap = P.h('div', { class: 'sim-role-cards' });
      const answerCard = P.h('div', { class: 'sim-answer-card' });
      const previewCard = P.h('div', { class: 'sim-preview-card' });
      const previewHead = P.h('div', { class: 'sim-preview-head' },
        P.h('h4', {}, '지금 지시문'),
        (() => { const b = P.h('button', { class: 'btn', type: 'button' }, '복사'); return b; })()
      );
      const copyBtn = previewHead.querySelector('button');
      const previewText = P.h('pre', { class: 'sim-preview-text', 'aria-live': 'polite' });
      previewCard.append(previewHead, previewText);
      cardsWrap.append(answerCard, previewCard);

      el.append(qBox, toggleWrap, cardsWrap);
      const style = P.h('style', { html: `
        .sim-q{font-size:16px;margin:0 0 4px}
        .sim-toggles{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
        .sim-toggles .btn{flex:1 1 220px;min-width:0;max-width:100%;white-space:normal;text-align:left;justify-content:flex-start;line-height:1.35;height:auto;padding:10px 14px}
        .sim-toggles .btn[aria-pressed="true"]{background:var(--aqua-pale);border-color:var(--aqua);color:var(--aqua-deep)}
        .sim-toggles .btn.primary[aria-pressed="false"]{background:#fff;color:var(--ink);border-color:var(--line)}
        .sim-toggles .btn.primary[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-role-cards{display:flex;gap:14px;flex-wrap:wrap;margin-top:16px}
        .sim-answer-card,.sim-preview-card{flex:1 1 280px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper)}
        .sim-answer-card h4{margin:0 0 8px;font-size:14px;color:var(--muted)}
        .sim-answer-card p{margin:0 0 8px;font-size:16px;line-height:1.6}
        .sim-note{font-size:12.5px;color:var(--muted);margin:0}
        .sim-preview-card{background:#fff;border-color:var(--aqua)}
        .sim-preview-head{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
        .sim-preview-head h4{margin:0;font-size:14px;color:var(--muted)}
        .sim-preview-text{white-space:pre-wrap;word-break:keep-all;font-size:14px;line-height:1.6;background:var(--paper);border-radius:10px;padding:12px;margin:10px 0 0;max-width:100%;overflow-wrap:break-word}
      ` });
      el.append(style);

      function render() {
        const code = TOGGLES.map(t => t.on ? '1' : '0').join('');
        const ans = ANSWERS[code];
        answerCard.replaceChildren(
          P.h('h4', {}, '예시 답변'),
          P.h('p', {}, ans),
          P.h('p', { class: 'sim-note' }, '예시 답변이며 실제 모델 출력이 아니에요.')
        );
        const sysLines = TOGGLES.filter(t => t.on).map(t => t.sys);
        previewText.textContent = (sysLines.length ? sysLines.join(' ') : '(지시문 없음 — 질문만 있어요)') + '\n\n' + QUESTION;
      }
      copyBtn.addEventListener('click', () => {
        const text = previewText.textContent;
        const done = () => { copyBtn.textContent = '복사됨'; setTimeout(() => { copyBtn.textContent = '복사'; }, 1200); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          done();
        }
      });
      render();
    }
  },

  teacherLines: [
    'AI에게 질문할 땐 "누구에게, 무엇 때문에, 어떤 형식으로"를 먼저 말해 줘요. 그게 <b>무대 지시문</b>이에요.',
    '역할 이름보다 <b>독자와 목적</b>을 말해 주는 게 더 큰 힘이 있어요.'
  ],
  tip: {
    body: '자주 쓰는 지시문은 저장해 두고 다시 써 보세요. 학급 안내문용, 평가 피드백용처럼 상황별로 모아 두면 편해요.',
    extra: '앱마다 부르는 이름이 달라요 — 지침, 맞춤 설정, 시스템 프롬프트처럼요. 하는 역할은 비슷해요.'
  },
  myth: {
    myth: '"전문가 역할"만 주면 답이 정확해진다.',
    fact: '말투는 바뀌지만 사실 확인은 되지 않아요. 독자·목적·형식·제약을 함께 주고, 사실은 따로 확인하세요.'
  },
  sources: [
    { title: 'Ouyang et al. 2022 — Training language models to follow instructions with human feedback (InstructGPT)', url: 'https://arxiv.org/abs/2203.02155', note: '사람 피드백으로 모델이 지시를 따르도록 추가 학습시킨 원논문이에요.' },
    { title: 'Claude 프롬프트 엔지니어링 모범 사례', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices', note: '명확하고 구체적으로, 예시와 역할·맥락을 함께 주는 게 효과적이라고 안내해요.' }
  ],
  script: `
"초등 5학년 담임 교사로서 답해 줘"라고 앞에 붙였더니, 같은 질문인데 말투와 길이, 예시까지 확 달라진 경험 있으실 거예요. 모델은 원래 다음에 올 말을 잇는 것뿐이었는데, 사람 피드백으로 지시를 따르도록 추가 학습을 시켰어요. 그래서 앞에 놓인 지시를 강하게 따라가요.

이렇게 대화 맨 앞에 놓이는 지시문을 시스템 프롬프트라고 불러요. 역할과 독자, 형식, 금지 사항을 적어 두면 이후 모든 답에 영향을 줘요. 앱마다 지침이나 맞춤 설정처럼 이름이 달라요.

역할만 정해 주고 끝내지 마세요. 독자와 목적, 형식과 제약을 함께 적어 줄 때 효과가 훨씬 커요. 자주 쓰는 지시문은 학급 안내문용, 평가 피드백용처럼 저장해 두면 다음에 편해요.

질문 앞에 상황을 먼저 말해 주면, AI가 그만큼 더 잘 알아들어요.
`
};
