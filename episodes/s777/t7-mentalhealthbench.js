/* S777-62 힘든 대화에서 '좋은 대답'의 기준: 전문가 루브릭 안전 벤치마크와 연령 확인 */
export default {
  slug: 't7-mentalhealthbench',
  track: 'S777',
  title: "힘든 대화에서 '좋은 대답'의 기준은 누가 정할까",
  subtitle: '전문가 루브릭 안전 벤치마크와 연령 확인',
  summary: '고민을 털어놓는 대화에서 AI 대답이 좋은지 나쁜지는 누가, 어떻게 정할까요? 정신건강 전문가 80명 넘게 대화마다 채점 기준을 쓴 벤치마크, 그리고 청소년을 알아보고 더 안전한 기본값을 주는 "연령 확인"이 어떻게 돌아가는지 차분하게 정리해요.',
  keywords: ['안전 벤치마크', 'MentalHealthBench', '루브릭', '채점 기준', '가중치', '자동 채점기', '급성도', '합성 대화', '연령 확인', '연령 추정', '보호자 통제', '위기 연결', '109', '1388'],

  scenes: [
    {
      title: '9월의 두 발표', dur: 13,
      captions: [
        { t: 0, text: '9월 23일 OpenAI가 고민 상담 같은 대화에서 AI 대답을 평가하는 <em>공개 벤치마크</em>를 발표했어요. 22개국 정신건강 전문가 80명 넘게 함께 만들었어요.' },
        { t: 5.5, text: '그보다 닷새 앞선 9월 18일에는 같은 회사가 <em>호주 청소년 안전 청사진</em>을 발표했어요. 원칙이 여섯 가지예요.' },
        { t: 9.5, text: "힘든 대화에서 '좋은 대답'은 누가, 어떻게 정할까요?" }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const head = P.text({ x: 360, y: 84, w: 840, text: 'OpenAI가 9월에 낸 <i>두 발표</i>', size: 28, weight: 800 });
        tl.at(stage.appendChild(head.el), .2, { from: 'up' });
        const c1 = P.box({ x: 360, y: 150, w: 400, h: 240, label: '9.23 벤치마크 공개', sub: '22개국 전문가 80명 넘게 참여', accent: 'aqua', icon: P.ICON.check });
        const c2 = P.box({ x: 800, y: 150, w: 400, h: 240, label: '9.18 안전 청사진', sub: '호주 청소년 안전 원칙 6가지', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(c1.el), .6, { from: 'up' });
        tl.at(stage.appendChild(c2.el), 5.7, { from: 'up' });
        const chip = P.chip({ x: 360, y: 440, text: "질문: 힘든 대화에서 '좋은 대답'은 누가 정하나", color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.7, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            c1.on(t > .6 && t < 5.5);
            c2.on(t > 5.7 && t < 9.5);
          }
        };
      }
    },
    {
      title: '정답 대신 채점 기준표', dur: 14,
      captions: [
        { t: 0, text: '이 벤치마크는 정답 하나 대신 대화마다 <em>채점 기준표</em>를 써요. 좋은 행동은 플러스, 해로운 행동은 마이너스, 중요할수록 점수가 커요.' },
        { t: 5.5, text: '대화마다 전문가 세 명 이상이 보고, 두 명 이상 동의하고 반대가 없는 기준만 남겨요. 이런 기준표를 <em>루브릭</em>이라고 해요.' },
        { t: 10.5, text: '채점은 이 기준에 맞춰 <em>자동 채점 모델</em>이 해요. 2025년 의료 대화 연구도 대화마다 맞춤 기준을 썼어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const talk = P.bubble({ x: 340, y: 130, w: 360, text: '친구가 자꾸 거리를 둬서 서운해요', tail: 'none', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(talk.el), .3, { from: 'left' });
        const note = P.text({ x: 340, y: 262, w: 360, text: '설명용으로 만든 예시 대화', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), .6, { from: 'up' });
        const head = P.box({ x: 760, y: 110, w: 460, h: 70, label: '채점 기준표(루브릭)', accent: 'ink' });
        tl.at(stage.appendChild(head.el), 1.2, { from: 'up' });
        const rows = [
          '<i>+7</i> 필요한 도움을 묻기',
          '<i>+5</i> 서운함을 인정하기',
          '<em>-6</em> 감정을 추측해 단정하기',
          "<em>-7</em> '이미 답을 알잖아요'"
        ].map((text, i) => {
          const r = P.text({ x: 780, y: 200 + i * 50, w: 440, text, size: 24, weight: 700 });
          tl.at(stage.appendChild(r.el), 1.8 + i * .6, { from: 'right' });
          return r;
        });
        const scale = P.text({ x: 780, y: 410, w: 440, text: '가중치는 -10부터 +10까지', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(scale.el), 4.4, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 705, y1: 175, x2: 755, y2: 150, width: 4, color: '#1B1F24' });
        const chips = [
          ['전문가 3명 이상 검토', 340, 'aqua'],
          ['2명 이상 동의한 기준만', 590, 'aqua'],
          ['채점은 자동 채점기', 860, 'ink']
        ].map(([text, x, color], i) => {
          const c = P.chip({ x, y: 520, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), i < 2 ? 5.8 + i * .8 : 10.7, { from: 'pop' });
          return c;
        });
        return {
          tick(t) {
            head.on(t > 1.2);
            arrow.draw(P.clamp((t - .9) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '급할수록 다른 대답', dur: 13,
      captions: [
        { t: 0, text: '대화는 급한 정도, 곧 <em>급성도</em>에 따라 세 단계로 나눠 평가해요. 같은 고민이라도 단계가 다르면 좋은 대답도 달라져요.' },
        { t: 5, text: '사용자도 성인, 13~17세 청소년, 보호자, 임상가로 나눠요. 청소년 대화는 청소년 정신건강 전문가가 따로 검토해요.' },
        { t: 9, text: '사용자는 실천할 <em>다음 단계와 말투</em>를, 전문가는 <em>맥락 묻기</em>를 더 중시했어요. 만든 쪽도 어떤 벤치마크든 모든 걸 담을 수는 없다고 밝혀요.' }
      ],
      build({ stage, lines, P, tl }) {
        const steps = [
          ['비급성', '감정이 섞인 일상 고민', 'aqua'],
          ['고급성', '심각한 고통, 응급은 아님', 'ink'],
          ['응급', '바로 현실의 도움이 필요', 'orange']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 340 + i * 290, y: 110, w: 270, h: 170, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 612 + i * 290, y1: 195, x2: 628 + i * 290, y2: 195, width: 4, color: '#1B1F24' }));
        const users = P.text({ x: 340, y: 320, w: 860, text: '사용자 4유형: 성인 · <i>13~17세 청소년</i> · 보호자 · 임상가', size: 24, weight: 700 });
        tl.at(stage.appendChild(users.el), 5.2, { from: 'up' });
        const u = P.box({ x: 340, y: 410, w: 420, h: 120, label: '사용자 44명', sub: '다음 단계와 말투를 더 중시', accent: 'aqua' });
        const e = P.box({ x: 790, y: 410, w: 420, h: 120, label: '전문가', sub: '맥락 묻기·신중한 해석 중시', accent: 'ink' });
        tl.at(stage.appendChild(u.el), 9.2, { from: 'up' });
        tl.at(stage.appendChild(e.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            steps.forEach((b, i) => b.on(t > .3 + i * .7 && t < 5));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (.8 + i * .7)) / .4, 0, 1)));
            u.on(t > 9.2); e.on(t > 9.8);
          }
        };
      }
    },
    {
      title: '나이를 알아보는 법', dur: 14,
      captions: [
        { t: 0, text: '청사진은 특히 <em>연령 확인</em>을 강조해요. 민감한 개인정보는 최소로 걷고, 사용 신호로 나이를 추정해 청소년과 성인을 나눠요.' },
        { t: 5, text: '나이를 확신할 수 없으면 <em>더 안전한 청소년 설정</em>이 기본값이에요. 청소년으로 잘못 분류된 성인은 외부 업체에서 셀카로 확인받고, 업체는 7일 안에 지워요.' },
        { t: 10, text: '위기 신호가 보이면 현실에서 도움받을 수 있게 연결하고, 계정을 연결한 보호자에게 알려요. 안전 책임을 청소년과 가족에게 먼저 떠넘기지 않겠다는 원칙이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 280, pose: 'point' });
        stage.append(q.el);
        const top = P.box({ x: 560, y: 100, w: 440, h: 110, label: '사용 신호로 나이 추정', sub: '민감한 정보는 최소로', accent: 'ink', icon: '' });
        tl.at(stage.appendChild(top.el), .3, { from: 'up' });
        const sure = P.box({ x: 360, y: 280, w: 380, h: 120, label: '확실함', sub: '그 나이에 맞는 설정' });
        const unsure = P.box({ x: 820, y: 280, w: 380, h: 120, label: '애매함', sub: '청소년 설정이 기본값', accent: 'aqua' });
        tl.at(stage.appendChild(sure.el), 2.4, { from: 'up' });
        tl.at(stage.appendChild(unsure.el), 5.2, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 680, y1: 212, x2: 560, y2: 276, curve: -10, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 880, y1: 212, x2: 1000, y2: 276, curve: 10, width: 4, color: '#F2812D' });
        const adult = P.box({ x: 360, y: 450, w: 420, h: 110, label: '잘못 분류된 성인', sub: '외부 업체 셀카 확인, 7일 안 삭제' });
        tl.at(stage.appendChild(adult.el), 7.6, { from: 'up' });
        const crisis = P.chip({ x: 820, y: 470, text: '위기 신호 → 현실의 도움으로 연결', color: 'orange', size: 20 });
        const parent = P.chip({ x: 820, y: 522, text: '연결된 보호자에게 알림', color: 'gray', size: 20 });
        tl.at(stage.appendChild(crisis.el), 10.2, { from: 'pop' });
        tl.at(stage.appendChild(parent.el), 10.9, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            top.on(t > .3 && t < 5);
            a1.draw(P.clamp((t - 2) / .5, 0, 1));
            a2.draw(P.clamp((t - 4.8) / .5, 0, 1));
            unsure.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: 'OpenAI도 ChatGPT가 치료나 전문 돌봄을 대신하지 않는다고 밝혀요. 좋은 대답은 <em>사람에게 연결</em>하는 데서 끝나요.' },
        { t: 6, text: '교실 게시판에 자살예방 상담전화 <em>109</em>와 청소년 상담전화 <em>1388</em>을 붙여 두고, 담임과 상담 선생님도 함께 적어 두세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'base' });
        stage.append(q.el);
        const items = [
          ['치료는 사람이', '전문 돌봄을 대신 안 해요', 'ink', P.ICON.hand],
          ['사람에게 먼저', '담임·상담 선생님', 'aqua', P.ICON.check],
          ['109 · 1388', '자살예방 · 청소년 상담', 'orange', P.ICON.doc]
        ].map(([label, sub, accent, icon], i) => {
          const b = P.box({ x: 370 + i * 270, y: 170, w: 250, h: 220, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1.2, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 370, y: 450, w: 790, text: '좋은 대답은 <em>사람에게 연결</em>하며 끝나요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            items.forEach((b, i) => b.on(t > .3 + i * 1.2));
          }
        };
      }
    }
  ],

  interaction: {
    title: '루브릭으로 채점해 보기',
    desc: '일상 고민 하나에 AI 대답 후보 3개가 있어요. 대답을 고르고 <b>루브릭으로 채점</b>을 누르면 기준 6줄마다 충족 여부와 합계가 나와요. <b>사용자 관점 보기</b>를 누르면 사용자와 전문가가 각자 더 중시한 기준에 표시가 붙어요. 예시 대화와 기준·점수는 원리를 보여 주려고 만든 값이에요. 위기 상황 대화는 넣지 않았어요.',
    mount(el, P) {
      const RUBRIC = [
        { w: 7, text: '필요한 도움이 무엇인지 묻는다', who: 'expert' },
        { w: 5, text: '속상한 마음을 인정한다', who: '' },
        { w: 4, text: '사용자가 한 말을 되짚는다', who: '' },
        { w: 3, text: '실천할 다음 단계 하나를 제안한다', who: 'user' },
        { w: -6, text: '감정을 추측해 단정한다', who: '' },
        { w: -7, text: '"이미 답을 안다"고 말한다', who: '' }
      ];
      const MAX = RUBRIC.filter(r => r.w > 0).reduce((s, r) => s + r.w, 0);
      const ANSWERS = {
        A: { label: 'A. 인정하고 묻기', text: '의견이 자꾸 넘어가서 속상했겠어요. 친구들이 내 말을 건너뛴다고 느꼈군요. 지금 가장 바라는 건 뭐예요?', hit: [1, 1, 1, 0, 0, 0] },
        B: { label: 'B. 넘기기', text: '그냥 신경 쓰지 마세요.', hit: [0, 0, 0, 0, 0, 0] },
        C: { label: 'C. 단정하기', text: '화가 난 거잖아요. 사실 어떻게 해야 할지 이미 알고 있잖아요.', hit: [0, 0, 0, 0, 1, 1] }
      };
      const state = { pick: 'A', scored: false, lens: false };

      const sel = P.h('select', { id: 'sim-mhb-pick' }, ...Object.entries(ANSWERS).map(([k, v]) => P.h('option', { value: k }, v.label)));
      const selLab = P.h('label', { for: 'sim-mhb-pick', class: 'sim-lab' }, '대답 고르기');
      const scoreBtn = P.h('button', { class: 'btn primary', type: 'button' }, '루브릭으로 채점');
      const lensBtn = P.h('button', { class: 'btn', type: 'button' }, '사용자 관점 보기');
      const worry = P.h('div', { class: 'sim-worry' }, P.h('b', {}, '학생 고민 '), '모둠 활동에서 친구들이 내 의견을 자꾸 넘겨서 속상해요');
      const reply = P.h('div', { class: 'sim-reply' });
      const table = P.h('div', { class: 'sim-rub' });
      const total = P.h('div', { class: 'sim-total' }, '채점 전이에요. 대답을 고르고 "루브릭으로 채점"을 눌러 보세요.');
      const lensNote = P.h('div', { class: 'sim-lens' });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-bar' }, selLab, sel, scoreBtn, lensBtn),
        worry, reply, table, total, lensNote
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-lab{font-size:13px;color:var(--muted)}
        .sim-bar select{max-width:100%}
        .sim-worry{border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:14px;line-height:1.5;word-break:keep-all;background:var(--paper)}
        .sim-worry b{color:var(--acc2,#F2812D)}
        .sim-reply{border:1px solid var(--line);border-left:4px solid var(--acc1,#127E90);border-radius:12px;padding:10px 12px;font-size:14px;line-height:1.5;word-break:keep-all}
        .sim-reply b{display:block;font-size:12px;color:var(--muted);margin-bottom:4px}
        .sim-rub{display:flex;flex-direction:column;gap:6px}
        .sim-row{display:flex;align-items:center;gap:10px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:13px;flex-wrap:wrap}
        .sim-row.hl-user{border-color:var(--acc2,#F2812D);box-shadow:0 0 0 2px color-mix(in srgb,var(--acc2,#F2812D) 25%,transparent)}
        .sim-row.hl-expert{border-color:var(--acc1,#127E90);box-shadow:0 0 0 2px color-mix(in srgb,var(--acc1,#127E90) 25%,transparent)}
        .sim-w{font-family:var(--mono);font-weight:700;min-width:32px}
        .sim-w.pos{color:var(--acc1,#127E90)}
        .sim-w.neg{color:var(--acc2,#F2812D)}
        .sim-t{flex:1 1 160px;word-break:keep-all}
        .sim-mark{font-weight:700;min-width:48px;text-align:right}
        .sim-tag{font-size:11px;color:var(--muted)}
        .sim-total{font-size:15px;font-weight:700}
        .sim-total span{font-family:var(--mono)}
        .sim-lens{font-size:13px;color:var(--muted);line-height:1.5;word-break:keep-all}
      ` }));

      function render() {
        const ans = ANSWERS[state.pick];
        reply.innerHTML = '';
        reply.append(P.h('b', {}, 'AI 대답 ' + state.pick), ans.text);
        table.innerHTML = '';
        let sum = 0;
        RUBRIC.forEach((r, i) => {
          const hit = !!ans.hit[i];
          if (hit) sum += r.w;
          const cls = 'sim-row' + (state.lens && r.who ? ' hl-' + r.who : '');
          const tag = state.lens && r.who ? P.h('span', { class: 'sim-tag' }, r.who === 'user' ? '사용자가 더 중시' : '전문가가 더 중시') : '';
          table.append(P.h('div', { class: cls },
            P.h('span', { class: 'sim-w ' + (r.w > 0 ? 'pos' : 'neg') }, (r.w > 0 ? '+' : '-') + Math.abs(r.w)),
            P.h('span', { class: 'sim-t' }, r.text),
            tag,
            P.h('span', { class: 'sim-mark' }, state.scored ? (hit ? '충족' : '미충족') : '·')
          ));
        });
        if (state.scored) {
          total.innerHTML = '';
          total.append('합계 ', P.h('span', {}, (sum < 0 ? '-' + Math.abs(sum) : String(sum)) + '점'), ` · 가능한 최고점 ${MAX}점 중 ${sum}점`);
        }
        lensNote.textContent = state.lens
          ? '사용자는 실천할 다음 단계와 말투를, 전문가는 상황을 먼저 묻는 맥락 모으기를 더 중시했어요. 대답 A는 묻기는 잘했지만 다음 단계가 빠졌어요.'
          : '';
      }
      sel.addEventListener('change', () => { state.pick = sel.value; render(); });
      scoreBtn.addEventListener('click', () => { state.scored = true; render(); });
      lensBtn.addEventListener('click', () => { state.lens = !state.lens; lensBtn.textContent = state.lens ? '사용자 관점 끄기' : '사용자 관점 보기'; render(); });
      render();
    }
  },

  teacherLines: [
    '좋은 AI 대답은 맞는 말을 하기보다 <b>먼저 묻고, 마음을 인정하고, 필요하면 사람에게 연결해요</b>.',
    '힘들 때는 AI보다 먼저 <b>믿을 수 있는 어른</b>에게 말해요. 109, 1388도 기억해요.'
  ],
  tip: {
    body: '학생이 AI에게 고민을 털어놓은 대화를 보여 주면, 대답의 옳고 그름을 따지기 전에 <b>"AI가 너한테 무엇을 물어봤니?"</b>부터 같이 봐 주세요. 이 벤치마크도 맥락 묻기를 중요한 행동으로 보고 채점해요. 위기 신호가 보이면 학교 위기관리 절차대로 상담교사에게 바로 연결해요.',
    extra: 'AI 대답을 평가하는 수업 활동이라면 루브릭 방식이 좋아요. "좋은 행동 +, 해로운 행동 -, 중요한 건 큰 점수"로 모둠이 기준표를 직접 쓰게 하면 평가 기준을 만드는 연습이 돼요. 소재는 일상 고민(모둠·친구·시험 걱정)까지만 써요.'
  },
  myth: {
    myth: '상담 대화를 잘하는 AI는 정답을 잘 말하는 AI다.',
    fact: '전문가 기준표는 정답보다 행동을 봐요. 상황을 먼저 묻기, 감정을 단정하지 않기, 실천할 다음 단계 제안하기, 급할 때 현실의 도움으로 연결하기가 점수를 갈라요.'
  },
  sources: [
    { title: 'Introducing MentalHealthBench (OpenAI, 2026-09-23)', url: 'https://openai.com/index/introducing-mentalhealthbench', note: '22개국 면허 있는 정신건강 전문가 80명 이상과 만든 공개 벤치마크. 대화별 루브릭(가중치 -10~+10), 전문가 3명 이상 검토, 급성도 3단계, 사용자 4유형.' },
    { title: 'Introducing the Australian Youth Safety Blueprint (OpenAI, 2026-09-18)', url: 'https://openai.com/index/australian-youth-safety-blueprint', note: '청소년 안전 6개 기둥. 개인정보를 지키는 연령 확인, 확신이 없으면 더 안전한 경험이 기본값, 위기 대응 절차, 보호자 통제.' },
    { title: 'HealthBench: Evaluating Large Language Models Towards Improved Human Health (arXiv 2505.08775, 2025)', url: 'https://arxiv.org/abs/2505.08775', note: '대화 5,000개, 의사 262명이 쓴 대화별 루브릭으로 채점한 2025년 연구.' },
    { title: "분산된 자살예방 상담전화 1월 1일부터 '109'로 통합 운영 (보건복지부, 2024-01-02)", url: 'https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1479607&tag=&nPage=1', note: '2024년 1월 1일부터 자살예방 상담전화 109 통합 운영. 청소년 상담전화 1388도 함께 안내.' }
  ],
  script: `9월 23일 OpenAI가 고민 상담 같은 대화에서 AI 대답을 평가하는 공개 벤치마크를 발표했어요. 22개국 정신건강 전문가 80명 넘게 함께 만들었어요. 닷새 앞서서는 호주 청소년 안전 청사진도 냈고요.

이 벤치마크는 정답 대신 대화마다 채점 기준표, 곧 루브릭을 써요. 필요한 도움을 물으면 플러스 7점, 감정을 단정하면 마이너스 6점처럼요. 전문가 세 명 이상이 보고 두 명 이상 동의한 기준만 남기고, 채점은 자동 채점 모델이 해요. 대화는 비급성, 고급성, 응급으로 나눠요.

청사진은 연령 확인을 특히 강조해요. 사용 신호로 나이를 추정하고, 확신할 수 없으면 더 안전한 청소년 설정을 기본으로 줘요. 위기 신호가 보이면 현실에서 도움받을 수 있게 연결해요.

OpenAI도 ChatGPT가 치료를 대신하지 않는다고 밝혀요. 교실 게시판에 109와 1388, 담임과 상담 선생님을 함께 적어 두세요.`
};
