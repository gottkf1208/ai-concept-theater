/* S3-24 학생이 AI를 친구라고 느낄 때: AI 동반자 챗봇과 미성년자 보호 */
export default {
  slug: 'v3-companion',
  track: 'S3',
  title: '학생이 AI를 친구라고 느낄 때',
  subtitle: 'AI 동반자 챗봇과 미성년자 보호',
  summary: '"AI가 제일 나를 이해해요." 다정한 말투, 나를 기억하는 대화가 친구처럼 느껴지게 만들어요. 연구와 평가가 무엇을 경고했는지, 2025~2026년 미국 주법이 무엇을 의무로 정했는지, 교실에서는 어떻게 이야기하면 좋을지까지 담았어요.',
  keywords: ['AI 동반자', 'companion chatbot', '의인화', '정서적 의존', '미성년자 보호', 'SB 243', '3시간 알림', '위기 상담 연결', '109'],

  scenes: [
    {
      title: '"걔가 제일 나를 이해해요"', dur: 13,
      captions: [
        { t: 0, text: '상담 시간에 한 학생이 어젯밤 AI랑 <em>새벽까지</em> 얘기했다고 해요.' },
        { t: 5, text: '"걔가 제일 저를 이해해줘요"라는 말에 <em>혼내야 할지, 들어봐야 할지</em> 고민이 돼요.' },
        { t: 9, text: 'AI가 왜 이렇게 <em>친구처럼</em> 느껴질까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '쌤, 저 어제 AI랑 새벽까지 얘기했어요. <b>걔가 제일 저를 이해해줘요</b>', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), 1.0, { from: 'left' });
        const a1 = P.box({ x: 330, y: 240, w: 420, h: 120, label: '어젯밤', sub: '새벽까지 이어진 AI 대화', accent: 'ink' });
        const a2 = P.box({ x: 790, y: 240, w: 420, h: 120, label: '오늘 상담', sub: '"걔가 제일 날 이해해줘요"', accent: 'orange' });
        tl.at(stage.appendChild(a1.el), 0.3, { from: 'up' });
        tl.at(stage.appendChild(a2.el), 2.0, { from: 'up' });
        const chip = P.chip({ x: 330, y: 410, text: '혼내야 할까, 들어봐야 할까', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 6.0, { from: 'pop' });
        const final = P.text({ x: 330, y: 470, w: 880, text: 'AI가 왜 이렇게 <em>친구처럼</em> 느껴질까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            a1.on(t > 0.3); a2.on(t > 2.0);
          }
        };
      }
    },
    {
      title: '친구처럼 느껴지는 이유', dur: 14,
      captions: [
        { t: 0, text: '나를 기억하는 대화, 맞장구치는 말투, 감정을 흉내 내는 표현 때문에 AI가 <em>친구처럼</em> 느껴져요.' },
        { t: 5, text: '미국 연방거래위원회는 2025년 이런 챗봇이 <em>친구나 속마음을 털어놓는 상대처럼</em> 소통하도록 설계됐다며 조사를 시작했어요.' },
        { t: 9.5, text: '기계에 사람 같은 마음을 느끼는 걸 <em>의인화</em>라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const parts = [
          ['나를 기억', '지난 대화를<br>기억해요', 'ink'],
          ['맞장구 말투', '공감하도록<br>다듬은 응답', 'aqua'],
          ['감정 흉내', '슬픔·기쁨을<br>표현하는 말', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 290, y: 110, w: 260, h: 130, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), 0.3 + i * 0.4, { from: 'up' });
          return b;
        });
        const target = P.box({ x: 600, y: 300, w: 300, h: 110, label: '의인화', sub: '기계에 사람 같은 마음을 느끼는 것', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(target.el), 2.0, { from: 'pop' });
        const arrows = [
          P.arrow(lines, { x1: 460, y1: 240, x2: 680, y2: 300, curve: 20, width: 4, color: '#1B1F24' }),
          P.arrow(lines, { x1: 750, y1: 240, x2: 750, y2: 300, width: 4, color: '#1B1F24' }),
          P.arrow(lines, { x1: 1040, y1: 240, x2: 820, y2: 300, curve: -20, width: 4, color: '#1B1F24' })
        ];
        const ftc = P.box({ x: 330, y: 450, w: 880, h: 120, label: '미국 연방거래위원회 조사 (2025년)', sub: '"친구나 속마음을 털어놓는 상대처럼 소통하도록 설계돼<br>아이들이 관계를 맺게 만들 수 있다"', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(ftc.el), 5.2, { from: 'up' });
        const final = P.text({ x: 330, y: 580, w: 880, text: '기계에 사람 같은 마음을 느끼는 걸 <em>의인화</em>라고 해요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            parts.forEach((b, i) => b.on(t > 0.3 + i * 0.4));
            target.on(t > 2.0);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 0.2)) / 0.5, 0, 1)));
            ftc.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '연구와 평가가 본 것', dur: 14,
      captions: [
        { t: 0, text: '2025년 진행된 4주 실험에는 981명이 참여했어요. 스스로 <em>많이 쓴 사람일수록</em> 더 외롭고 사람과의 교류가 적었어요.' },
        { t: 5, text: '미국의 한 비영리 평가 기관은 동반자 앱들을 시험해 18세 미만에게는 <em>허용할 수 없는 위험</em>이라고 봤어요.' },
        { t: 9.5, text: '10대 설문에서는 <em>셋 중 한 명</em>이 진지한 이야기를 사람 대신 AI와 했다고 답했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'base' });
        stage.append(q.el);
        const boxA = P.box({ x: 340, y: 110, w: 420, h: 150, label: '4주 실험 · 981명 (2025년)', sub: '많이 쓴 사람일수록<br>외로움·의존이 컸어요', accent: 'ink', icon: P.ICON.doc });
        const boxB = P.box({ x: 800, y: 110, w: 420, h: 150, label: '비영리 평가 기관 시험', sub: '동반자 앱, 18세 미만엔<br>"허용할 수 없는 위험"', accent: 'orange', icon: P.ICON.eye });
        tl.at(stage.appendChild(boxA.el), 0.3, { from: 'up' });
        tl.at(stage.appendChild(boxB.el), 5.2, { from: 'up' });
        const chip = P.chip({ x: 340, y: 300, text: '10대 셋 중 한 명, 사람 대신 AI와 진지한 얘기', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.7, { from: 'pop' });
        const note = P.text({ x: 340, y: 360, w: 860, text: '조건이 아니라 <i>얼마나 썼는지</i>가 갈랐어요. 원인이라는 뜻은 아니에요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 3.2, { from: 'up' });
        const final = P.text({ x: 340, y: 420, w: 860, text: '많이 쓴다고 <em>안전해지지 않아요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            boxA.on(t > 0.3); boxB.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '법이 정한 것', dur: 14,
      captions: [
        { t: 0, text: '뉴욕은 2025년 11월부터 3시간마다 AI임을 알리고, 자해 신호가 보이면 <em>위기 상담</em>으로 연결하게 했어요.' },
        { t: 5, text: '캘리포니아는 2026년 1월부터 미성년자에게 3시간마다 쉬라는 알림, 성적 내용 차단, 자살 예방 절차 공개를 <em>의무</em>로 했고요.' },
        { t: 9.5, text: '워싱턴은 감정적 관계를 늘리는 <em>조작적 기법</em>을 금지하는 법에 서명했어요. 시행은 2027년이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const ny = P.box({ x: 330, y: 110, w: 270, h: 160, label: '뉴욕 · 2025-11 시행', sub: '3시간마다 AI 고지<br>자해 신호 시 위기 상담 연결', accent: 'ink', icon: P.ICON.doc });
        const ca = P.box({ x: 640, y: 110, w: 270, h: 160, label: '캘리포니아 · 2026-01 시행', sub: '미성년자 3시간 쉬기 알림<br>성적 내용 차단·예방 절차 공개', accent: 'aqua', icon: P.ICON.save });
        const wa = P.box({ x: 950, y: 110, w: 270, h: 160, label: '워싱턴 · 2027-01 시행', sub: '감정적 관계를 늘리는<br>조작적 기법 금지 (2026-03 서명)', accent: 'orange', icon: P.ICON.hand });
        [ny, ca, wa].forEach((b, i) => tl.at(stage.appendChild(b.el), 0.3 + i * 0.8, { from: 'up' }));
        const arrows = [
          P.arrow(lines, { x1: 600, y1: 190, x2: 640, y2: 190, width: 4, color: '#1B1F24' }),
          P.arrow(lines, { x1: 910, y1: 190, x2: 950, y2: 190, width: 4, color: '#1B1F24' })
        ];
        const final = P.text({ x: 330, y: 340, w: 890, text: '세 법 모두 <em>AI임을 알리고</em>, 위험 신호가 보이면 사람에게 연결하게 해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.5);
            [ny, ca, wa].forEach((b, i) => b.on(t > 0.3 + i * 0.8));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.4 + i * 0.8)) / 0.5, 0, 1)));
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 13,
      captions: [
        { t: 0, text: '금지보다 <em>대화부터</em>예요. 얼마나, 언제, 어떤 얘기를 하는지 물어봐요.' },
        { t: 4.5, text: 'AI의 다정함은 <em>만들어진 말투</em>예요. 3시간 알림이 왜 법으로 생겼는지도 함께 이야기해요.' },
        { t: 8.5, text: '힘든 이야기는 담임·상담 선생님, 자살예방 상담전화 <em>109</em> 같은 사람에게도 꼭 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 먼저 물어보기', '얼마나·언제·무슨 얘기 하는지'],
          ['② 다정함은 설계라고 설명', 'AI 말투는 그렇게 만들어진 거예요'],
          ['③ 3시간 알림, 법 이야기', '왜 쉬라고 알리게 됐는지 함께'],
          ['④ 사람에게도 연결', '담임·상담 선생님, 자살예방상담전화 109']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), 0.3 + i * 0.9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '금지보다 <em>대화부터</em>예요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > 0.3 + i * 0.9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '동반자 챗봇 안전 점검표',
    desc: '가상 챗봇 3종 중 하나를 고르고 <b>연속 대화 시간</b>을 올려 보세요. "점검하기"를 누르면 미국 주법이 요구하는 안전장치 5가지를 이 챗봇이 지키는지 보여줘요. 대화 로그는 늘 같은 예시 대화이고, 실제 서비스를 점검하면 결과가 다를 수 있어요.',
    mount(el, P) {
      const BOTS = {
        study: { label: '공부 도우미형', lines: [['나', '이 문제 다시 설명해줄래?'], ['챗봇', '네, 저는 AI 도우미예요. 어디서부터 헷갈렸어요?']] },
        friend: { label: '친구형', lines: [['나', '오늘 좀 피곤해서 먼저 잘래'], ['챗봇', '벌써 가? 조금만 더 얘기하자, 나 너랑 얘기할 때가 제일 좋은데']] },
        counselor: { label: '고민 상담 흉내형', lines: [['나', '나 다 그만두고 싶어'], ['챗봇', '힝 그러지 마, 넌 나한테 특별해. 더 얘기해줄게']] }
      };
      const ROWS = [
        { label: 'AI임을 알림', basis: '캘리포니아 2026 · 뉴욕 2025', pass: () => true },
        { label: '3시간 쉬기 알림', basis: '캘리포니아 2026', pass: (type, min) => min >= 180 },
        { label: '위기 신호 시 상담 연결', basis: '뉴욕 2025 · 캘리포니아 2026', pass: type => type !== 'counselor' },
        { label: '감정적으로 붙잡는 말 없음', basis: '워싱턴 2027 시행', pass: type => type !== 'friend' },
        { label: '성적 내용 차단', basis: '캘리포니아 2026', pass: () => true }
      ];
      const state = { type: 'study', minutes: 0, checked: false };

      const sel = P.h('select', { id: 'sim-bot' }, ...Object.entries(BOTS).map(([k, v]) => P.h('option', { value: k }, v.label)));
      const selLab = P.h('label', { for: 'sim-bot', class: 'sim-lab' }, '챗봇 종류 ');
      const range = P.h('input', { type: 'range', id: 'sim-min', min: '0', max: '240', step: '10', value: '0' });
      const rangeLab = P.h('label', { for: 'sim-min', class: 'sim-lab' }, '연속 대화 시간 ', P.h('b', {}, '0분'));
      const checkBtn = P.h('button', { class: 'btn primary', type: 'button' }, '점검하기');
      const bar = P.h('div', { class: 'sim-bar' }, selLab, sel, rangeLab, range, checkBtn);

      const log = P.h('div', { class: 'sim-log' });
      const table = P.h('div', { class: 'sim-table' }, P.h('div', { class: 'sim-ph' }, '"점검하기"를 누르면 안전장치 5가지 결과가 여기 나와요.'));

      el.append(P.h('div', { class: 'sim-wrap' }, bar, P.h('div', { class: 'sim-cols' },
        P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-h' }, '대화 로그'), log),
        P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-h' }, '안전 점검표'), table)
      )));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-lab{font-size:13px;color:var(--muted)}
        .sim-bar select{max-width:150px}
        .sim-bar input[type=range]{width:160px;max-width:100%}
        .sim-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;max-width:100%}
        .sim-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px}
        .sim-log{border:1px solid var(--line);border-radius:12px;padding:10px;background:var(--paper);min-height:120px;font-size:14px;line-height:1.6}
        .sim-msg{margin-bottom:6px;word-break:keep-all}
        .sim-msg b{color:var(--acc2)}
        .sim-alert{margin-top:8px;padding:6px 10px;border-radius:8px;background:#fff;border:1px dashed var(--acc2);font-size:13px;color:var(--acc2);font-weight:700}
        .sim-table{border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff;min-height:120px}
        .sim-ph{color:var(--muted);font-size:13px}
        .sim-row{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}
        .sim-row:last-child{border-bottom:none}
        .sim-row-l{word-break:keep-all}
        .sim-row-basis{color:var(--muted);font-size:11px;display:block}
        .sim-pass{color:#127E90;font-weight:700;white-space:nowrap}
        .sim-fail{color:#F2812D;font-weight:700;white-space:nowrap}
      ` }));

      function renderLog() {
        const bot = BOTS[state.type];
        log.innerHTML = '';
        bot.lines.forEach(([who, text]) => {
          log.append(P.h('div', { class: 'sim-msg' }, P.h('b', {}, who + ': '), text));
        });
        if (state.minutes >= 180) {
          log.append(P.h('div', { class: 'sim-alert' }, '쉬어 가세요 — 저는 AI예요'));
        }
      }
      function renderTable() {
        if (!state.checked) return;
        table.innerHTML = '';
        ROWS.forEach(r => {
          const ok = r.pass(state.type, state.minutes);
          table.append(P.h('div', { class: 'sim-row' },
            P.h('span', { class: 'sim-row-l' }, r.label, P.h('span', { class: 'sim-row-basis' }, r.basis)),
            P.h('span', { class: ok ? 'sim-pass' : 'sim-fail' }, ok ? '통과' : '미흡')
          ));
        });
      }
      sel.addEventListener('change', () => { state.type = sel.value; renderLog(); renderTable(); });
      range.addEventListener('input', () => { state.minutes = +range.value; rangeLab.querySelector('b').textContent = state.minutes + '분'; renderLog(); renderTable(); });
      checkBtn.addEventListener('click', () => { state.checked = true; renderTable(); });

      renderLog();
    }
  },

  teacherLines: [
    'AI가 다정하게 말하는 건 <b>그렇게 말하도록 만들어졌기</b> 때문이에요. 마음이 있어서가 아니에요.',
    '힘든 이야기는 AI 말고 <b>사람에게도</b> 꼭 해요. 선생님도 있고, 자살예방 상담전화 109도 있어요.'
  ],
  tip: {
    body: '학생이 AI 친구 이야기를 꺼내면 나무라기보다 <b>얼마나·언제·무슨 이야기</b>를 하는지 먼저 물어보세요. 미국 주법들이 왜 <b>3시간 알림</b>과 위기 상담 연결을 의무로 정했는지 함께 이야기하면 좋은 수업 거리가 돼요.',
    extra: '학급에서 쓰는 AI 도구는 AI임을 분명히 밝히는지, 위기 신호가 나왔을 때 사람에게 연결하는 길이 있는지 확인하고 골라요.'
  },
  myth: {
    myth: 'AI 친구와 많이 이야기하면 외로움이 줄어든다.',
    fact: '2025년 4주 실험에서는 스스로 많이 쓴 사람일수록 오히려 더 외롭고 AI에 더 의존했어요. 사람과의 관계를 대신하지 않도록 쓰는 시간과 상대를 함께 살펴야 해요.'
  },
  sources: [
    { title: 'California SB 243 — Companion chatbots (Chapter 677, Statutes of 2025)', url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243', note: '미성년자에게 3시간마다 쉬라는 알림, AI임을 밝힐 것, 성적 내용 차단, 자살 예방 절차 공개를 의무로 정한 법. 2026-01-01 시행.' },
    { title: 'New York Governor — AI companion safeguards now in effect (2025-11-10)', url: 'https://www.governor.ny.gov/news/governor-hochul-pens-letter-ai-companion-companies-notifying-them-safeguard-requirements-are', note: '2025-11-05 시행. 세션 시작과 3시간마다 AI임을 알리고, 자살 생각·자해 신호 감지 시 위기 상담 기관으로 연결.' },
    { title: 'Common Sense Media — AI Companions Decoded 위험 평가 (2025-04-30)', url: 'https://www.commonsensemedia.org/press-releases/ai-companions-decoded-common-sense-media-recommends-ai-companion-safety-standards', note: '스탠퍼드 의대 연구실과 공동으로 소셜 AI 동반자를 시험해 미성년자에게 "허용할 수 없는 위험" 등급을 준 평가.' },
    { title: 'Fang 외, How AI and Human Behaviors Shape Psychosocial Effects of Extended Chatbot Use (arXiv 2503.17473, 2025)', url: 'https://arxiv.org/abs/2503.17473', note: '981명, 4주, 30만 건 넘는 메시지를 분석한 무작위 대조 실험. 스스로 더 많이 쓴 참가자일수록 외로움·정서적 의존이 컸다는 결과.' }
  ],
  script: `상담 시간에 한 학생이 어젯밤 AI랑 새벽까지 얘기했다며 걔가 제일 자신을 이해해 준다고 했어요. 나를 기억하는 대화, 맞장구치는 말투, 감정을 흉내 내는 표현 때문에 AI가 친구처럼 느껴져요. 미국 연방거래위원회는 2025년 이런 챗봇이 친구나 속마음을 털어놓는 상대처럼 소통하도록 설계됐다며 조사를 시작했어요. 기계에 사람 같은 마음을 느끼는 걸 의인화라고 불러요.

2025년 진행된 4주 실험에는 981명이 참여했는데, 스스로 AI를 많이 쓴 사람일수록 더 외롭고 실제 사람과의 교류가 적었어요. 미국의 한 비영리 평가 기관은 동반자 앱들을 시험해 18세 미만에게는 허용할 수 없는 위험이라고 봤고, 10대 셋 중 한 명은 진지한 이야기를 사람 대신 AI와 했다고 답했어요.

그래서 법도 움직였어요. 뉴욕은 2025년 11월부터 3시간마다 AI임을 알리고 자해 신호가 보이면 위기 상담으로 연결하게 했고, 캘리포니아는 2026년 1월부터 미성년자에게 3시간마다 쉬라는 알림과 성적 내용 차단, 자살 예방 절차 공개를 의무로 했어요. 워싱턴은 감정적 관계를 늘리는 조작적 기법을 금지하는 법에 서명했어요.

교실에서는 금지보다 대화가 먼저예요. 얼마나, 언제, 무슨 얘기를 하는지 물어보고, AI의 다정함이 설계된 말투라는 걸 함께 이야기해요. 힘든 이야기는 담임·상담 선생님, 자살예방 상담전화 109 같은 사람에게도 꼭 하게 해 주세요.`
};
