/* S3-23 AI가 나를 기억한다는 것: 메모리 기능과 컨텍스트 엔지니어링 */
export default {
  slug: 'v3-memory',
  track: 'S3',
  title: 'AI가 나를 기억한다는 것',
  subtitle: '메모리 기능과 컨텍스트 엔지니어링',
  summary: '새 대화인데 AI가 지난주에 말한 우리 반 인원을 기억하고 있었어요. 모델이 새로 배운 건 없어요. "옆에 둔 메모장"을 새 대화 앞에 다시 넣어 줄 뿐이에요. 무엇을 넣고 뺄지 고르는 컨텍스트 엔지니어링과, 메모리를 내가 관리하는 법.',
  keywords: ['메모리', 'memory', '컨텍스트 엔지니어링', 'context engineering', '컴팩션', '요약 저장', '컨텍스트 부패', '시크릿 대화', '기억 오염'],

  scenes: [
    {
      title: '지난주 얘기를 기억하네?', dur: 13,
      captions: [
        { t: 0, text: '새 대화에서 "체육대회 조 편성 짜 줘"라고 했는데, AI가 <em>"26명 기준으로 짰어요"</em>라고 답했어요.' },
        { t: 5, text: '26명은 지난주 <em>다른</em> 대화에서 딱 한 번 말한 숫자예요. 모델이 다시 배운 게 아니에요.' },
        { t: 9.5, text: '그런데 어떻게 기억했을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '체육대회 조 편성 짜 줘', tail: 'left', size: 24 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const a1 = P.box({ x: 330, y: 230, w: 420, h: 120, label: '지난주 대화', sub: '"우리 반은 26명이에요"', accent: 'ink' });
        const a2 = P.box({ x: 790, y: 230, w: 420, h: 120, label: '오늘, 새 대화', sub: '같은 대화창이 아니에요', accent: 'aqua' });
        tl.at(stage.appendChild(a1.el), 3.2, { from: 'up' });
        tl.at(stage.appendChild(a2.el), 4.0, { from: 'up' });
        const reply = P.bubble({ x: 650, y: 400, w: 540, text: '<b>26명</b> 기준으로 짰어요', tail: 'bottom', size: 24, tone: 'orange' });
        tl.at(stage.appendChild(reply.el), 5.4, { from: 'pop' });
        const chip = P.chip({ x: 330, y: 540, text: '모델이 그 자리에서 배운 걸까?', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 8.2, { from: 'pop' });
        const note = P.text({ x: 330, y: 590, w: 880, text: '어떻게 지난주 숫자를 <em>오늘</em> 다시 꺼냈을까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            a1.on(t > 3.2); a2.on(t > 4.0);
          }
        };
      }
    },
    {
      title: '메모장을 다시 읽어요', dur: 14,
      captions: [
        { t: 0, text: '모델 자체는 대화가 끝나도 <em>바뀌지</em> 않아요. 대신 대화 중 중요한 내용을 <em>주제별 메모</em>로 따로 저장해 둬요.' },
        { t: 5, text: '새 대화를 시작하면 그 메모를 맥락 맨 앞에 다시 넣어 줘요. AI는 그 <em>메모를 다시 읽고</em> 답해요.' },
        { t: 10, text: '기억은 머릿속이 아니라 <em>옆에 둔 메모장</em>에 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const boxes = [
          ['지난주 대화', '"우리 반은 26명"'], ['주제별 메모 저장', '대화별이 아니라 주제별'], ['오늘 새 대화', '모델은 처음 보는 창'], ['메모를 맥락 앞에 삽입', '질문보다 먼저 들어가요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 225, y: 110, w: 200, h: 120, label, sub, accent: i === 1 ? 'orange' : (i === 3 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 225, y1: 170, x2: 565 + i * 225, y2: 170, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1120, y1: 240, x2: 400, y2: 250, curve: 90, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 600, y: 300, text: '새 대화마다 이 과정을 다시 거쳐요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(loopLab.el), 5.2, { from: 'pop' });
        const gen = P.text({ x: 340, y: 400, w: 880, text: '모델 대신 <i>메모장</i>이 기억해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(gen.el), 10.2, { from: 'up' });
        const small = P.text({ x: 340, y: 460, w: 880, text: '소비자용 메모리는 대화를 요약하지 않고, 대화하는 동안 주제별로 하나씩 저장해요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .9)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.4) / .9, 0, 1));
            boxes.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '넣는다고 다 기억하진 않아요', dur: 14,
      captions: [
        { t: 0, text: '창에 넣는 토큰이 많아질수록, 그 안의 정보를 정확히 꺼내 쓰는 힘은 떨어져요. 이걸 <em>컨텍스트 부패</em>라고 불러요.' },
        { t: 5, text: '2023년 연구는 맥락 <em>가운데</em>에 놓인 정보를 특히 덜 쓴다는 걸 보였어요. 처음이나 끝에 있어야 더 잘 떠올려요.' },
        { t: 9.5, text: '그래서 무엇을 넣고 뺄지 고르는 일을 <em>컨텍스트 엔지니어링</em>이라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const win = P.box({ x: 340, y: 100, w: 880, h: 90, label: '맥락 창 (토큰이 꽉 차 있어요)', sub: '', accent: 'ink' });
        tl.at(stage.appendChild(win.el), .3, { from: 'up' });
        const spots = [['처음', 92], ['가운데', 38], ['끝', 88]].map(([label, h], i) => {
          const bar = P.h('div', { style: `left:${400 + i * 300}px;top:${430 - h * 2}px;width:150px;height:${h * 2}px;border-radius:10px 10px 4px 4px;background:${i === 1 ? '#F2812D' : '#127E90'}` });
          tl.at(stage.appendChild(bar), 2.4 + i * .5, { from: 'up' });
          const lab = P.text({ x: 400 + i * 300, y: 440, w: 150, text: `${label} · ${h}%`, size: 16, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), 2.6 + i * .5, { from: 'up' });
          return bar;
        });
        const axisLab = P.text({ x: 340, y: 240, w: 880, text: '정보가 놓인 자리에 따라 <em>정확히 꺼내 쓰는 비율</em>이 달라요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(axisLab.el), 5.2, { from: 'up' });
        const chip = P.chip({ x: 340, y: 500, text: '"Lost in the Middle" (2023)', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 7.6, { from: 'pop' });
        const final = P.text({ x: 340, y: 560, w: 880, text: '그래서 <em>무엇을 넣고 뺄지</em> 고르는 일, 컨텍스트 엔지니어링이 필요해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
          }
        };
      }
    },
    {
      title: '세 가지 기술', dur: 13,
      captions: [
        { t: 0, text: '긴 대화는 <em>요약해서 새 창</em>으로 옮겨요(컴팩션). 창을 작게 유지해 줘요.' },
        { t: 4.5, text: '꼭 남겨야 할 정보는 <em>창 밖 메모</em>로 저장해요(구조화된 메모). 컴팩션 뒤에도 살아남아요.' },
        { t: 9, text: '큰 작업은 <em>창이 깨끗한 작은 에이전트</em>들에게 나눠 맡겨요(하위 에이전트).' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const a = P.box({ x: 340, y: 100, w: 260, h: 150, label: '컴팩션', sub: '긴 대화를 <br>요약해 새 창으로', accent: 'ink', icon: P.ICON.doc });
        const b = P.box({ x: 640, y: 100, w: 260, h: 150, label: '구조화된 메모', sub: '꼭 남길 건<br>창 밖에 저장', accent: 'aqua', icon: P.ICON.save });
        const c = P.box({ x: 940, y: 100, w: 260, h: 150, label: '하위 에이전트', sub: '깨끗한 창의<br>작은 에이전트들', accent: 'orange', icon: P.ICON.plug });
        [a, b, c].forEach((x, i) => tl.at(stage.appendChild(x.el), .3 + i * .8, { from: 'up' }));
        const final = P.text({ x: 340, y: 340, w: 880, text: '셋 다 <i>맥락 창을 작고 또렷하게</i> 지키려는 기법이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10, { from: 'up' });
        const small = P.text({ x: 340, y: 400, w: 880, text: '운영체제가 빠른 기억과 느린 기억 사이로 데이터를 옮기는 방식을 흉내 낸 설계예요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || (t > 4.5 && t < 9) || t > 9);
            [a, b, c].forEach((x, i) => x.on(t > .3 + i * .8));
          }
        };
      }
    },
    {
      title: '메모장의 주인은 나', dur: 13,
      captions: [
        { t: 0, text: '틀린 메모는 고치지 않으면 계속 따라와요. 보안 위험 목록에도 <em>기억 오염</em>이 올라 있어요.' },
        { t: 4.5, text: '설정의 메모리 목록에서 보고 고치고 지워요. 학생 정보가 오가면 <em>시크릿 대화</em>로 해요.' },
        { t: 9, text: '업무와 수업을 <em>프로젝트별로</em> 나누면 기억도 따로 저장돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 메모리 목록 보기', '설정에서 저장된 메모를 확인'],
          ['② 고치고 지우기', '틀린 정보는 바로 바로잡기'],
          ['③ 시크릿 대화', '학생 정보가 오가는 대화는 저장 안 함'],
          ['④ 프로젝트로 분리', '수업·업무·개인을 따로']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '메모장은 <em>내가 관리</em>해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '메모리 수첩',
    desc: '왼쪽은 AI가 저장해 둔 <b>메모 카드</b>예요. 체크된 카드만 새 대화 앞에 다시 들어가요. "새 대화 시작"을 누르면 오른쪽에 그 메모가 질문 앞에 삽입된 모습과, 답변이 어떻게 달라지는지 미리 보여 줘요. 틀린 메모가 있으면 "메모 고치기"로 바로잡아 보세요.',
    mount(el, P) {
      const CARDS = [
        { id: 'size', text: '우리 반은 26명', weight: 8 },
        { id: 'table', text: '표 형식을 좋아함', weight: 6 },
        { id: 'date', text: '체육대회는 10월 5일', weight: 7, wrong: true },
        { id: 'sensitive', text: '민지 상담 내용', weight: 9, sensitive: true },
        { id: 'grade', text: '4학년 담임', weight: 5 },
        { id: 'subject', text: '영어 교과 전담 아님', weight: 6 }
      ];
      const state = { checked: { size: true, table: true, date: true, sensitive: false, grade: true, subject: true }, secret: false, fixed: false };

      const cardEls = {};
      const cardsWrap = P.h('div', { class: 'sim-cards' });
      CARDS.forEach(c => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-c-${c.id}` });
        cb.checked = state.checked[c.id];
        const label = P.h('label', { for: `sim-c-${c.id}`, class: 'sim-card' + (c.sensitive ? ' sim-card-sens' : '') }, cb, P.h('span', { class: 'sim-card-t' }, c.text));
        cb.addEventListener('change', () => { state.checked[c.id] = cb.checked; renderMeter(); });
        cardEls[c.id] = { cb, label };
        cardsWrap.append(label);
      });

      const secretCb = P.h('input', { type: 'checkbox', id: 'sim-secret' });
      const secretRow = P.h('div', { class: 'sim-toggle' }, secretCb, P.h('label', { for: 'sim-secret' }, '시크릿 대화 (이번 대화는 기억에 추가 안 함)'));
      secretCb.addEventListener('change', () => { state.secret = secretCb.checked; renderPreview(); });

      const startBtn = P.h('button', { class: 'btn primary', type: 'button' }, '새 대화 시작');
      const fixBtn = P.h('button', { class: 'btn', type: 'button' }, '메모 고치기');
      const clearBtn = P.h('button', { class: 'btn', type: 'button' }, '모두 지우기');
      const btnRow = P.h('div', { class: 'sim-btnrow' }, startBtn, fixBtn, clearBtn);

      const meter = P.h('div', { class: 'sim-token' }, '메모 블록 토큰: 0');
      const preview = P.h('div', { class: 'sim-preview' }, P.h('div', { class: 'sim-ph' }, '"새 대화 시작"을 누르면 여기에 메모가 질문 앞에 삽입된 모습이 보여요.'));

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-left' }, P.h('div', { class: 'sim-h' }, '저장된 메모'), cardsWrap, secretRow, btnRow, meter),
        P.h('div', { class: 'sim-right' }, P.h('div', { class: 'sim-h' }, '새 대화 미리보기'), preview)
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:16px;max-width:100%}
        .sim-left,.sim-right{flex:1 1 280px;min-width:0}
        .sim-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px}
        .sim-cards{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
        .sim-card{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:#fff;cursor:pointer;font-size:14px}
        .sim-card-sens{border-color:#F2812D}
        .sim-card-t{word-break:keep-all}
        .sim-toggle{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-bottom:10px;flex-wrap:wrap}
        .sim-btnrow{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
        .sim-token{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-preview{border:1px solid var(--line);border-radius:12px;padding:12px;background:var(--paper);min-height:160px;font-size:14px;line-height:1.6}
        .sim-ph{color:var(--muted)}
        .sim-block{background:#fff;border:1px dashed var(--line);border-radius:8px;padding:8px;margin-bottom:8px;font-size:13px}
        .sim-q{font-weight:700;margin-bottom:8px}
        .sim-a{border-top:1px solid var(--line);padding-top:8px}
        .sim-wrong{color:#F2812D;font-weight:700}
        .sim-warn{margin-top:8px;color:#F2812D;font-size:13px;font-weight:700}
        .sim-sec-note{margin-top:8px;color:var(--muted);font-size:12px}
      ` }));

      function renderMeter() {
        const total = CARDS.filter(c => state.checked[c.id]).reduce((s, c) => s + c.weight, 0);
        meter.textContent = `메모 블록 토큰: ${total}`;
      }

      let started = false;
      function renderPreview() {
        if (!started) return;
        const checkedCards = CARDS.filter(c => state.checked[c.id]);
        const memoText = checkedCards.length
          ? checkedCards.map(c => (c.wrong && !state.fixed) ? `${c.text}` : (c.id === 'date' && state.fixed ? '체육대회는 10월 12일(고쳐짐)' : c.text)).join(' · ')
          : '(저장된 메모 없음)';
        const wrongOn = state.checked.date && !state.fixed;
        const dateForAnswer = state.fixed ? '10월 12일' : '10월 5일';
        const answerHtml = state.checked.date
          ? `체육대회 안내문: 모두 모여요. 날짜는 <span class="${wrongOn ? 'sim-wrong' : ''}">${dateForAnswer}</span>이에요.${wrongOn ? ' (틀린 날짜가 그대로 반영됐어요)' : ''}`
          : '체육대회 안내문: 날짜 메모가 없어서 날짜를 비워 뒀어요.';
        preview.innerHTML = '';
        preview.append(
          P.h('div', { class: 'sim-block' }, '[메모 블록] ' + memoText),
          P.h('div', { class: 'sim-q' }, '질문: "체육대회 안내문 써 줘"'),
          P.h('div', { class: 'sim-a', html: answerHtml })
        );
        if (state.checked.sensitive) preview.append(P.h('div', { class: 'sim-warn' }, '민감 정보가 기억에 있어요.'));
        if (state.secret) preview.append(P.h('div', { class: 'sim-sec-note' }, '시크릿 모드: 이번 대화 내용은 기억에 추가되지 않아요.'));
      }

      startBtn.addEventListener('click', () => { started = true; renderPreview(); });
      fixBtn.addEventListener('click', () => { state.fixed = true; cardEls.date.cb.checked = true; state.checked.date = true; renderMeter(); renderPreview(); });
      clearBtn.addEventListener('click', () => {
        CARDS.forEach(c => { state.checked[c.id] = false; cardEls[c.id].cb.checked = false; });
        state.fixed = false; started = true; renderMeter(); renderPreview();
      });

      renderMeter();
      renderPreview();
    }
  },

  teacherLines: [
    'AI의 기억은 머릿속이 아니라 <b>옆에 둔 메모장</b>이에요. 새 대화마다 그 메모를 먼저 읽어요.',
    '메모장에 적힌 건 <b>우리가 보고 고칠 수 있어요</b>. 틀린 기억은 지워요.'
  ],
  tip: {
    body: '학기 초와 학기 말에 설정의 <b>메모리 목록</b>을 열어 틀린 정보·지난 학년 정보를 지우고, 학생 개인정보가 오가는 대화는 <b>시크릿 모드</b>로 해요.',
    extra: '수업 준비, 업무, 개인 용도를 프로젝트로 나누면 기억도 따로 저장돼서 섞이지 않아요.'
  },
  myth: {
    myth: 'AI는 나와 대화할수록 그 자리에서 배워 똑똑해진다.',
    fact: '메모리 기능은 모델을 다시 학습시키는 게 아니라, 따로 저장한 메모를 새 대화에 다시 넣어 주는 방식이에요. 그래서 메모를 고치면 기억도 바뀌어요.'
  },
  sources: [
    { title: 'Claude 도움말 — Use Claude\'s chat search and memory', url: 'https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context', note: '대화 중 주제별로 메모를 저장하고, 설정의 메모리 목록에서 편집·삭제·일시 중지할 수 있다는 설명.' },
    { title: 'Anthropic Engineering — Effective context engineering for AI agents (2025-09-29)', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', note: '컨텍스트 부패와 "최소한의 고신호 토큰" 원칙, 컴팩션·구조화된 메모·하위 에이전트 기법.' },
    { title: 'Mei 외, A Survey of Context Engineering for Large Language Models (arXiv 2507.13334, 2025)', url: 'https://arxiv.org/abs/2507.13334', note: '컨텍스트 엔지니어링을 체계적으로 정리한 학술 서베이.' },
    { title: 'Liu 외, Lost in the Middle (arXiv 2307.03172, 2023)', url: 'https://arxiv.org/abs/2307.03172', note: '맥락 가운데에 놓인 정보를 모델이 덜 활용한다는 연구.' }
  ],
  script: `새 대화에서 "체육대회 조 편성 짜 줘"라고 했더니 AI가 "26명 기준으로 짰어요"라고 답했어요. 26명은 지난주 다른 대화에서 딱 한 번 말한 숫자인데, 모델이 그 자리에서 다시 배운 건 아니에요. 어떻게 기억했을까요.

모델 자체는 대화가 끝나도 바뀌지 않아요. 대신 대화 중 중요한 내용을 주제별 메모로 따로 저장해 두고, 새 대화를 시작할 때 그 메모를 맥락 맨 앞에 다시 넣어 줘요. AI는 그 메모를 다시 읽고 답해요. 그런데 넣는다고 다 기억하는 건 아니에요. 창에 들어간 토큰이 많아질수록 그 안의 정보를 정확히 꺼내 쓰는 힘이 떨어지는데, 이걸 컨텍스트 부패라고 불러요. 2023년 연구는 맥락 가운데에 놓인 정보를 특히 덜 쓴다는 것도 보였어요. 그래서 무엇을 넣고 뺄지 고르는 일을 컨텍스트 엔지니어링이라고 해요. 대표적인 기법이 세 가지예요. 긴 대화는 요약해서 새 창으로 옮기는 컴팩션, 꼭 남길 정보는 창 밖 메모로 저장하는 구조화된 메모, 큰 작업은 창이 깨끗한 작은 에이전트들에게 나눠 맡기는 하위 에이전트예요.

메모장은 우리가 관리해요. 틀린 메모는 고치지 않으면 계속 따라오고, 보안 위험 목록에도 기억 오염이 올라 있어요. 설정의 메모리 목록에서 보고 고치고 지우고, 학생 정보가 오가는 대화는 시크릿 모드로 하고, 수업·업무·개인 용도는 프로젝트로 나눠서 기억도 따로 저장되게 해요.`
};
