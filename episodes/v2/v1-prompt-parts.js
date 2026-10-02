/* V1-3 [B] 좋은 질문은 무엇으로 이루어질까: 역할·맥락·형식·예시(퓨샷) */
export default {
  slug: 'v1-prompt-parts',
  track: 'S1',
  title: '좋은 질문은 무엇으로 이루어질까?',
  subtitle: '역할, 맥락, 형식, 예시(퓨샷)',
  summary: '"가정통신문 써 줘" 한 줄과, 역할·맥락·형식·예시 네 조각을 갖춘 질문은 결과가 달라요. 각 조각이 무슨 일을 하는지 공식 가이드와 연구로 짚어요.',
  keywords: ['프롬프트', '역할', 'system 메시지', '맥락', '형식', '예시', '퓨샷', 'few-shot', '인컨텍스트 학습'],

  scenes: [
    {
      title: '한 줄 프롬프트', dur: 13,
      captions: [
        { t: 0, text: '"가정통신문 써 줘." 한 줄로 부탁했더니, 결과는 <em>어느 학교, 어느 학년</em>에도 붙일 수 있는 밋밋한 글이었어요.' },
        { t: 5, text: 'AI가 모르는 게 너무 많았던 거예요.' },
        { t: 9.5, text: '공식 가이드는 AI를 <em>"맥락을 모르는 똑똑한 신입"</em>이라고 생각하라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const promptBox = P.box({ x: 330, y: 90, w: 430, h: 110, label: '"가정통신문 써 줘."', sub: '프롬프트 한 줄', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(promptBox.el), .3, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 760, y1: 145, x2: 860, y2: 145, width: 4, color: '#1B1F24' });
        const resultBox = P.box({ x: 860, y: 90, w: 380, h: 110, label: '밋밋한 안내문', sub: '어느 학교·학년에도 붙일 수 있는 글', accent: '', icon: P.ICON.x });
        tl.at(stage.appendChild(resultBox.el), 1.6, { from: 'up' });
        const quoteB = P.bubble({ x: 330, y: 270, w: 700, text: '공식 가이드: "AI를 <b>맥락을 모르는 똑똑한 신입</b>이라고 생각하라."', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(quoteB.el), 5.2, { from: 'up' });
        const final = P.text({ x: 330, y: 430, w: 780, text: 'AI가 모르는 게 <em>너무 많았던</em> 거예요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            arrow.draw(P.clamp((t - 1) / .6, 0, 1));
            resultBox.on(t > 1.6);
          }
        };
      }
    },
    {
      title: '조각 1: 역할', dur: 13,
      captions: [
        { t: 0, text: '첫 조각은 <em>역할</em>이에요.' },
        { t: 4.5, text: '"너는 초등 3학년 담임이야" 한 문장이면 단어 고르는 기준이 바뀌어요.' },
        { t: 9, text: '앱 뒤에서는 이 문장이 <em>system 메시지</em>라는 칸에 들어가요. 대화 맨 앞에 깔리는 지시문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'point' });
        stage.append(q.el);
        const systemBox = P.box({ x: 340, y: 90, w: 580, h: 110, label: 'system 메시지', sub: '"너는 초등학교 3학년 담임교사야."', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(systemBox.el), .3, { from: 'up' });
        const userBox = P.box({ x: 340, y: 230, w: 580, h: 110, label: 'user 메시지', sub: '"가정통신문 써 줘."', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(userBox.el), 1.4, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 630, y1: 200, x2: 630, y2: 230, width: 4, color: '#1B1F24' });
        const note = P.text({ x: 340, y: 380, w: 680, text: '대화 <em>맨 앞</em>에 깔리는 지시문이에요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 4.6, { from: 'up' });
        const chip1 = P.chip({ x: 340, y: 450, text: '역할 없음 · 건조한 공문체', color: 'gray', size: 20 });
        const chip2 = P.chip({ x: 700, y: 450, text: '역할 있음 · 친근한 담임 말투', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chip1.el), 6.6, { from: 'pop' });
        tl.at(stage.appendChild(chip2.el), 7.1, { from: 'pop' });
        const final = P.text({ x: 340, y: 520, w: 780, text: '한 문장만으로도 <em>말투와 단어 선택 기준</em>이 바뀌어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            arrow.draw(P.clamp((t - 1.1) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '조각 2: 맥락과 이유', dur: 13,
      captions: [
        { t: 0, text: '두 번째는 <em>맥락</em>이에요.' },
        { t: 4.5, text: '날짜, 대상, 준비물처럼 AI가 알 수 없는 사실을 넣어요.' },
        { t: 9, text: '이유까지 쓰면 더 좋아요. "휴대폰으로 읽으니 세 줄로" 하면, 세 줄 규칙을 다른 데에도 알아서 적용해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'think' });
        stage.append(q.el);
        const label = P.text({ x: 340, y: 70, w: 880, text: 'AI가 알 수 없는 <em>맥락</em>', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label.el), .3, { from: 'up' });
        const chipData = [
          ['10월 17일', 340, 130], ['3학년', 560, 130], ['도시락 지참', 740, 130], ['우천 시 실내 활동', 950, 130]
        ];
        const chips = chipData.map(([text, x, y], i) => {
          const c = P.chip({ x, y, text, color: 'aqua', size: 20 });
          tl.at(stage.appendChild(c.el), 1 + i * .4, { from: 'pop' });
          return c;
        });
        const whyB = P.bubble({ x: 340, y: 280, w: 780, text: '"학부모 대부분이 휴대폰으로 읽으니 <b>세 줄로</b> 써 줘." → 세 줄 규칙을 다른 데에도 알아서 적용해요.', tail: 'left' });
        tl.at(stage.appendChild(whyB.el), 4.6, { from: 'up' });
        const final = P.text({ x: 340, y: 480, w: 780, text: '<em>이유</em>까지 알려 주면 더 잘 통해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
          }
        };
      }
    },
    {
      title: '조각 3: 형식', dur: 13,
      captions: [
        { t: 0, text: '세 번째는 <em>형식</em>이에요.' },
        { t: 4.5, text: '"길게 쓰지 마"보다 "세 문장, 첫 문장은 날짜와 장소"가 더 잘 먹혀요.' },
        { t: 9, text: '하지 말라는 말은 무엇을 하라는지 알려 주지 않거든요. 긴 자료는 위에, 질문은 맨 끝에 두는 것도 형식이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 270, pose: 'point' });
        stage.append(q.el);
        const wrongBox = P.box({ x: 340, y: 100, w: 420, h: 150, label: '"길게 쓰지 마"', sub: '무엇을 하라는지 안 알려줘요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(wrongBox.el), .3, { from: 'up' });
        const rightBox = P.box({ x: 800, y: 100, w: 420, h: 150, label: '"세 문장: 날짜·장소 → 준비물 → 문의"', sub: '할 일을 직접 말해줘요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(rightBox.el), 1.4, { from: 'up' });
        const orderNote = P.text({ x: 340, y: 300, w: 880, text: '긴 자료는 <em>위</em>에, 질문은 <em>맨 끝</em>에 두는 것도 형식이에요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(orderNote.el), 4.6, { from: 'up' });
        const final = P.text({ x: 340, y: 420, w: 880, text: '<em>"하지 마"</em>보다 <em>"이렇게 해"</em>가 잘 먹혀요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
          }
        };
      }
    },
    {
      title: '조각 4: 예시, 그리고 네 조각', dur: 14,
      captions: [
        { t: 0, text: '마지막은 <em>예시</em>예요. 작년 안내문 한두 편을 붙이면 말투와 구조가 가장 확실히 잡혀요.' },
        { t: 4.5, text: '이걸 <em>퓨샷</em>이라고 불러요. 2022년 연구에서는 예시 내용이 틀려도 성능이 크게 안 떨어졌어요.' },
        { t: 9.5, text: '모델이 예시에서 주로 배우는 건 <em>형식과 범위</em>예요. 역할, 맥락, 형식, 예시 — 네 조각을 채워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 320, pose: 'wave' });
        stage.append(q.el);
        const cards = [
          ['① 역할', 'system 메시지 한 문장', 'ink', 340, 80],
          ['② 맥락', '날짜·대상·이유', 'aqua', 730, 80],
          ['③ 형식', '"하지 마" 대신 "이렇게"', 'orange', 340, 220],
          ['④ 예시(퓨샷)', '작년 안내문 한두 편', 'aqua', 730, 220]
        ].map(([label, sub, acc, x, y], i) => {
          const b = P.box({ x, y, w: 370, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'pop' });
          return b;
        });
        const final = P.text({ x: 340, y: 380, w: 760, text: '<em>역할, 맥락, 형식, 예시.</em> 네 조각을 채워요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        const small = P.text({ x: 340, y: 440, w: 760, text: '예시는 정답 여부보다 <i>형식과 범위</i>를 보여 주는 효과가 커요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            cards.forEach((c, i) => c.on(t > .3 + i * .7));
          }
        };
      }
    }
  ],

  interaction: {
    title: '네 조각 프롬프트 조립기',
    desc: '<b>역할·맥락·형식·예시</b> 체크박스를 켜고 꺼서 프롬프트가 어떻게 조립되는지, 결과가 어떻게 달라지는지 보세요. "네 조각 다 넣기"를 누르면 네 개가 한 번에 켜져요. 결과는 미리 정해 둔 예시 답변이에요.',
    mount(el, P) {
      const PIECES = [
        { id: 'role', label: '역할', phrase: '너는 초등학교 3학년 담임교사야.' },
        { id: 'context', label: '맥락', phrase: '10월 17일 현장학습, 3학년, 도시락 지참, 우천 시 실내 활동으로 변경돼요.' },
        { id: 'format', label: '형식', phrase: '세 문장으로 써 줘: 날짜·장소 → 준비물 → 문의처 순서로.' },
        { id: 'example', label: '예시(퓨샷)', phrase: '<example>작년 안내문: "10월 18일 가을 현장학습을 갑니다. 도시락과 편한 복장을 준비해 주세요. 문의는 담임에게 부탁드립니다."</example>' }
      ];
      const CHANGE_MSG = {
        role: { on: '역할 켬 → 말투가 "담임교사"에 맞게 바뀌었어요.', off: '역할 끔 → 말투가 다시 밋밋해졌어요.' },
        context: { on: '맥락 켬 → 날짜·준비물 같은 구체적 사실이 들어갔어요.', off: '맥락 끔 → 구체적 사실이 빠졌어요.' },
        format: { on: '형식 켬 → 세 문장 구조가 생겼어요.', off: '형식 끔 → 문장 구조가 다시 자유로워졌어요.' },
        example: { on: '예시 켬 → 작년 안내문처럼 마무리 문장이 붙었어요.', off: '예시 끔 → 마무리 문장이 평범해졌어요.' }
      };
      let state = { role: false, context: false, format: false, example: false };
      let lastChanged = null;

      function buildPrompt() {
        const sys = state.role ? '너는 초등학교 3학년 담임교사야.' : '(비어 있음)';
        const userParts = ['가정통신문 써 줘.'];
        if (state.context) userParts.push('10월 17일 현장학습, 3학년, 도시락 지참, 우천 시 실내 활동으로 변경돼요.');
        if (state.format) userParts.push('세 문장으로 써 줘: 날짜·장소 → 준비물 → 문의처 순서로.');
        if (state.example) userParts.push('&lt;example&gt;작년 안내문 1편&lt;/example&gt;');
        return { sys, user: userParts.join(' ') };
      }

      function buildOutput() {
        if (!state.role && !state.context && !state.format && !state.example) {
          return '학부모님께 안내 말씀 드립니다. 참고해 주시기 바랍니다.';
        }
        const greet = state.role ? '안녕하세요, 3학년 1반 학부모님.' : '학부모님께 안내드립니다.';
        if (state.format) {
          const line1 = state.context ? '10월 17일 금요일, 현장학습을 가요.' : '이번 주 행사 일정을 안내드려요.';
          const line2 = state.context ? '도시락을 준비해 주시고, 비가 오면 실내 활동으로 바뀌어요.' : '자세한 사항은 추후 안내드릴게요.';
          const line3 = state.example ? '궁금한 점은 담임에게 연락 주세요.' : '문의 사항은 학교로 연락 주세요.';
          return `${greet} ${line1} ${line2} ${line3}`;
        }
        const factsText = state.context
          ? '10월 17일 금요일 현장학습을 가요. 도시락을 준비해 주시고, 비가 오면 실내 활동으로 바뀌어요.'
          : '행사 일정이 있어 안내드려요.';
        const closing = state.example ? '궁금한 점은 담임에게 연락 주세요.' : '잘 부탁드립니다.';
        return `${greet} ${factsText} ${closing}`;
      }

      const promptSys = P.h('div', { class: 'sim-pp-row sys' }, P.h('span', { class: 'sim-pp-tag' }, 'system'), P.h('span', { class: 'sim-pp-txt' }, ''));
      const promptUser = P.h('div', { class: 'sim-pp-row user' }, P.h('span', { class: 'sim-pp-tag' }, 'user'), P.h('span', { class: 'sim-pp-txt' }, ''));
      const promptBox = P.h('div', { class: 'sim-pp-prompt' }, P.h('h4', {}, '조립된 프롬프트'), promptSys, promptUser);

      const outText = P.h('p', { class: 'sim-pp-out-txt' }, '');
      const changeLine = P.h('p', { class: 'sim-pp-change' }, '');
      const outBox = P.h('div', { class: 'sim-pp-out' }, P.h('h4', {}, '예시 결과'), outText, P.h('p', { class: 'sim-pp-disclaimer' }, '예시 답변이에요.'), changeLine);

      const list = P.h('div', { class: 'sim-pp-checks' });
      PIECES.forEach(p => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-pp-${p.id}` });
        cb.checked = state[p.id];
        cb.addEventListener('change', () => {
          state[p.id] = cb.checked;
          lastChanged = p.id;
          render();
        });
        list.append(P.h('label', { class: 'sim-pp-row-cb', for: `sim-pp-${p.id}` }, cb, P.h('span', { class: 'lbl' }, p.label), P.h('span', { class: 'phrase' }, p.phrase)));
      });

      const allBtn = P.h('button', { class: 'btn primary', type: 'button' }, '네 조각 다 넣기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const bar = P.h('div', { class: 'sim-pp-bar' }, allBtn, resetBtn);

      el.append(P.h('div', { class: 'sim-pp-wrap' },
        P.h('div', { class: 'sim-pp-left' }, P.h('h4', {}, '체크박스'), list, bar),
        P.h('div', { class: 'sim-pp-right' }, promptBox, outBox)
      ));
      el.append(P.h('style', { html: `
        .sim-pp-wrap{display:flex;flex-wrap:wrap;gap:20px;max-width:100%}
        .sim-pp-left{flex:1 1 260px;min-width:0}
        .sim-pp-right{flex:1 1 320px;min-width:0;display:flex;flex-direction:column;gap:14px}
        .sim-pp-checks{display:flex;flex-direction:column;gap:8px}
        .sim-pp-row-cb{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;max-width:100%;box-sizing:border-box}
        .sim-pp-row-cb input{margin-top:3px;flex:none}
        .sim-pp-row-cb .lbl{flex:0 0 auto;font-weight:800;font-size:14px;color:var(--ink)}
        .sim-pp-row-cb .phrase{flex:1 1 auto;font-size:13px;color:var(--muted);min-width:0;word-break:keep-all}
        .sim-pp-bar{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
        .sim-pp-prompt,.sim-pp-out{border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);max-width:100%;box-sizing:border-box}
        .sim-pp-prompt h4,.sim-pp-out h4{margin:0 0 10px;font-size:13.5px;color:var(--muted)}
        .sim-pp-row{display:flex;gap:10px;padding:8px 10px;border-radius:10px;background:#fff;margin-bottom:8px;align-items:flex-start;border:1px solid var(--line)}
        .sim-pp-row.sys{border-color:#D8DEE6}
        .sim-pp-row.user{border-color:#bfe3e9}
        .sim-pp-tag{flex:none;font-family:var(--mono);font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;background:#EEF1F4;color:var(--muted);text-transform:uppercase}
        .sim-pp-txt{flex:1 1 auto;font-size:13.5px;line-height:1.5;min-width:0;word-break:keep-all}
        .sim-pp-out-txt{font-size:14.5px;line-height:1.6;background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:0}
        .sim-pp-disclaimer{font-size:11.5px;color:var(--muted);margin:6px 0 0}
        .sim-pp-change{font-size:13px;font-weight:700;color:#127E90;margin:4px 0 0}
      ` }));

      function render() {
        const { sys, user } = buildPrompt();
        promptSys.querySelector('.sim-pp-txt').textContent = sys;
        promptUser.querySelector('.sim-pp-txt').textContent = user;
        outText.textContent = buildOutput();
        PIECES.forEach(p => { list.querySelector(`#sim-pp-${p.id}`).checked = state[p.id]; });
        if (lastChanged === 'all') {
          changeLine.textContent = '네 조각 다 켬 → 역할·맥락·형식·예시가 모두 반영됐어요.';
        } else if (lastChanged) {
          const on = state[lastChanged];
          changeLine.textContent = CHANGE_MSG[lastChanged][on ? 'on' : 'off'];
        } else {
          changeLine.textContent = '';
        }
      }

      allBtn.addEventListener('click', () => {
        state = { role: true, context: true, format: true, example: true };
        lastChanged = 'all';
        render();
      });
      resetBtn.addEventListener('click', () => {
        state = { role: false, context: false, format: false, example: false };
        lastChanged = null;
        render();
      });

      render();
    }
  },

  teacherLines: [
    'AI는 우리 반 사정을 몰라요. <b>역할, 맥락, 형식, 예시</b> 네 조각을 채워 주면 훨씬 정확해져요.',
    "'하지 마'보다 <b>'이렇게 써'</b>라고 말해 주는 게 더 잘 통해요."
  ],
  tip: {
    body: '자주 쓰는 안내문은 "역할 한 문장 + 이번 맥락 + 형식 + 작년 예시 한두 편"을 메모장에 틀로 저장해 두고 맥락만 바꿔 붙이세요.',
    extra: '예시를 두 편 이상 넣을 땐 서로 형식을 같게 맞추고, 내용은 조금씩 다르게 해야 AI가 엉뚱한 공통점(같은 날짜 등)을 따라 하지 않아요.'
  },
  myth: {
    myth: '프롬프트는 길고 화려할수록 좋다.',
    fact: '길이보다 빠진 조각이 문제예요. AI가 모르는 맥락, 원하는 형식, 형식을 보여 주는 예시가 있으면 짧아도 잘 통해요.'
  },
  sources: [
    { title: 'Claude Docs — Prompting best practices', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices', note: '신입 직원 비유, 이유 설명, 예시 3~5개, system 역할, "하지 말 것 대신 할 것", 질문은 끝에.' },
    { title: 'Gemini API — Prompt design strategies', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies', note: '퓨샷 예시를 항상 넣으라는 권고와 형식 일관성.' },
    { title: 'Brown et al., Language Models are Few-Shot Learners (arXiv, 2020)', url: 'https://arxiv.org/abs/2005.14165', note: '예시 몇 개만으로 새 과제를 수행하는 인컨텍스트 학습.' },
    { title: 'Min et al., Rethinking the Role of Demonstrations (EMNLP, 2022)', url: 'https://arxiv.org/abs/2202.12837', note: '예시의 정답 여부보다 형식·범위가 중요하다는 연구.' }
  ],
  script: `"가정통신문 써 줘." 한 줄로 부탁했더니, 어느 학교 어느 학년에도 붙일 수 있는 밋밋한 글이 나왔어요. AI가 모르는 게 너무 많았던 거예요. Claude 문서는 AI를 "맥락을 모르는 똑똑한 신입"이라고 생각하라고 해요.

첫 조각은 역할이에요. "너는 초등 3학년 담임이야" 한 문장을 system 메시지에 넣으면 말투가 바뀌어요. 둘째는 맥락과 이유예요. 날짜·대상·준비물을 넣고, "휴대폰으로 읽으니 세 줄로"처럼 이유까지 쓰면 AI가 그 규칙을 다른 데도 적용해요.

셋째는 형식이에요. "길게 쓰지 마"보다 "세 문장, 첫 문장은 날짜와 장소"가 더 잘 먹혀요. 넷째는 예시, 퓨샷이에요. 작년 안내문 한두 편을 붙이면 구조가 가장 확실히 잡혀요. 2022년 연구에서는 예시 속 정답이 틀려도 성능이 거의 안 떨어졌어요. 역할, 맥락, 형식, 예시. 네 조각을 채워 보세요.`
};
