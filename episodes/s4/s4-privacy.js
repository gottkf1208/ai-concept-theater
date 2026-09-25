/* E21 [B] 학생 이름, AI에 넣어도 될까 — 개인정보와 학습 데이터 */
export default {
  slug: 's4-privacy',
  track: 'B',
  title: '학생 이름, AI에 넣어도 될까',
  subtitle: '개인정보와 학습 데이터',
  summary: '생활기록부 문구를 AI에게 다듬어 달라고 하다가 손이 멈칫해요. 이름·성적 같은 학생 정보, AI에 넣기 전에 뭘 확인해야 할지 정리해봤어요.',
  keywords: ['개인정보', '학생 정보', '생활기록부', '비식별화', '학습에 사용 안 함', '개인정보보호법'],

  scenes: [
    {
      title: '이름이랑 성적, 넣어도 되나?', dur: 13,
      captions: [
        { t: 0, text: '학생 생활기록부 문구를 AI에게 다듬어 달라고 하려던 참이에요.' },
        { t: 5, text: '그런데 손이 멈칫해요. <em>"이름이랑 성적, 넣어도 되나?"</em>' },
        { t: 9.5, text: '그 답, 하나씩 짚어볼게요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 360, pose: 'oops' });
        stage.append(q.el);
        const box = P.box({ x: 380, y: 80, w: 760, h: 100, label: '생활기록부 문구 다듬기', sub: 'AI에게 부탁하려는 중', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(box.el), .3, { from: 'up' });
        const preview = P.text({ x: 380, y: 210, w: 760, text: '"한소리 학생은 수학 78점, 알레르기 있음. 문구를 다듬어 줘"', size: 21, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(preview.el), 1.2, { from: 'up' });
        const b = P.bubble({ x: 380, y: 320, w: 620, text: '"<b>이름이랑 성적</b>, 넣어도 되나?"', tail: 'left', tone: 'orange', size: 27 });
        tl.at(stage.appendChild(b.el), 5, { from: 'up' });
        const qq = P.text({ x: 380, y: 560, w: 760, text: '그 답, 하나씩 짚어볼게요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
          }
        };
      }
    },
    {
      title: '내가 넣은 글, 서버로 가요', dur: 13,
      captions: [
        { t: 0, text: '채팅창에 넣은 글은 <em>내 컴퓨터 안</em>에만 머무르지 않아요.' },
        { t: 5, text: '서비스 <em>서버</em>로 가서, 약관에 따라 저장·검토·학습에 쓰일 수도 있어요.' },
        { t: 9.5, text: '서비스나 요금제에 따라 갈려요. <em>"학습에 사용 안 함"</em> 설정이 있는 곳도 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const box1 = P.box({ x: 380, y: 100, w: 300, h: 130, label: '내 채팅창', sub: '내가 쓴 프롬프트', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        const arrow1 = P.arrow(lines, { x1: 690, y1: 165, x2: 780, y2: 165, width: 4, color: '#1B1F24' });
        const box2 = P.box({ x: 780, y: 80, w: 400, h: 170, label: '서비스 서버', sub: '', accent: 'aqua', icon: P.ICON.plug });
        tl.at(stage.appendChild(box2.el), 1.6, { from: 'right' });
        const note1 = P.text({ x: 780, y: 270, w: 460, text: '저장 · 검토 · 학습에 쓰일 수도 있어요', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note1.el), 5, { from: 'up' });
        const note2 = P.text({ x: 380, y: 400, w: 800, text: '서비스마다 조금씩 달라요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note2.el), 6.4, { from: 'up' });
        const chip = P.chip({ x: 380, y: 470, text: '"학습에 사용 안 함" 설정도 있어요', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(chip.el), 9.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 0 && t < 9.5);
            arrow1.draw(P.clamp((t - 1) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '학생 정보는 개인정보', dur: 13,
      captions: [
        { t: 0, text: '이름·사진·학번·성적·건강·가정 사정 — 이런 정보는 <em>개인정보</em>예요.' },
        { t: 5, text: '개인정보 보호법이 지키고 있고, <em>개인정보보호위원회</em>가 공공·교육 분야 안내를 하고 있어요.' },
        { t: 9.5, text: '학교가 이런 정보를 쓰려면 <em>처리 근거와 동의</em>가 필요해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 260, pose: 'think' });
        stage.append(q.el);
        const labels = ['이름', '사진', '학번', '성적', '건강', '가정 사정'];
        const chips = labels.map((t, i) => {
          const c = P.chip({ x: 340 + i * 150, y: 140, text: t, color: i % 2 ? 'orange' : 'aqua', size: 21 });
          tl.at(stage.appendChild(c.el), .5 + i * .35, { from: 'pop' });
          return c;
        });
        const lawBox = P.box({ x: 340, y: 250, w: 900, h: 130, label: '개인정보 보호법', sub: '개인정보보호위원회 — 공공 · 교육 분야 안내', accent: 'brown', icon: P.ICON.doc });
        tl.at(stage.appendChild(lawBox.el), 3, { from: 'up' });
        const b = P.bubble({ x: 340, y: 420, w: 900, text: '학교가 쓰려면 <b>처리 근거와 동의</b>가 필요해요.', tail: 'left', tone: 'soft', size: 26 });
        tl.at(stage.appendChild(b.el), 9.6, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9.5); } };
      }
    },
    {
      title: '그래서 원칙: 가리고, 최소로', dur: 13,
      captions: [
        { t: 0, text: '그래서 원칙은 이래요. AI에 넣기 전에 먼저 <em>가려요</em>.' },
        { t: 5, text: '이름은 <em>학생A</em>로, 학번은 <em>삭제</em>, 사진은 <em>얼굴 가리기</em>예요.' },
        { t: 9.5, text: '꼭 필요한 정보만, <em>학교가 승인한 도구</em>를 써요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['가리기: 이름 → 학생A · 학번 삭제 · 얼굴 가리기', 100],
          ['꼭 필요한 정보만 넣기', 260],
          ['학교가 승인한 도구 쓰기', 420]
        ];
        const boxes = rows.map(([label, y], i) => {
          const bx = P.box({ x: 300, y, w: 900, h: 120, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(bx.el), .4 + i * 3.1, { from: 'up' });
          return bx;
        });
        const q = P.quokka({ x: 40, y: 460, size: 240, pose: 'point' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, true); } };
      }
    },
    {
      title: '넣기 전 3초 점검', dur: 14,
      captions: [
        { t: 0, text: '프롬프트를 넣기 전, <em>3초만</em> 점검해요. 이름? 사진? 민감정보?' },
        { t: 5.5, text: '설정에서 <em>"학습에 사용 안 함"</em>을 확인해요.' },
        { t: 10, text: '학생에게도 알려 줘요. <em>"네 이름 · 사진은 AI에 넣지 않아."</em>' }
      ],
      build({ stage, lines, P, tl }) {
        const title = P.text({ x: 300, y: 90, w: 700, text: '넣기 전 3초 점검', size: 32, weight: 800 });
        tl.at(stage.appendChild(title.el), .3, { from: 'up' });
        const qs = ['이름?', '사진?', '민감정보?'];
        const chips = qs.map((t, i) => {
          const c = P.chip({ x: 300 + i * 200, y: 190, text: t, color: 'orange', size: 26 });
          tl.at(stage.appendChild(c.el), .8 + i * .4, { from: 'pop' });
          return c;
        });
        const settingBox = P.box({ x: 300, y: 280, w: 620, h: 100, label: '"학습에 사용 안 함" 확인', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(settingBox.el), 5.6, { from: 'up' });
        const b = P.bubble({ x: 300, y: 410, w: 620, text: '"네 이름 · 사진은 AI에 넣지 않아."', tail: 'left', tone: 'soft', size: 25 });
        tl.at(stage.appendChild(b.el), 10, { from: 'up' });
        const q = P.quokka({ x: 40, y: 440, size: 260, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t > 10); } };
      }
    }
  ],

  interaction: {
    title: '프롬프트 가리기 시뮬레이터',
    desc: '아래 예시 문장에서 "<b>가리기</b>"를 눌러 이름 · 학번 · 점수 · 민감정보가 어떻게 바뀌는지 보세요. 규칙 기반 <b>대략적인 예시</b>예요 — 실제 비식별화는 더 꼼꼼해야 해요.',
    mount(el, P) {
      const DEFAULT_TEXT = '5학년 3반 한소리(학번 20513) 학생은 수학 78점, 알레르기 있음. 생활기록부 문구를 다듬어 줘';
      const HEALTH_WORDS = ['알레르기', '질환', '장애', '병력', '우울증', '불안장애', '정신질환', '지병'];

      function maskText(src) {
        let out = src;
        const changes = [];

        // 1) 이름: 한글 2~4자 + 괄호 앞
        out = out.replace(/([가-힣]{2,4})(\()/g, (m, name, paren) => {
          changes.push({ type: '이름', original: name, replaced: '[이름]' });
          return '[이름]' + paren;
        });
        // 2) 이름: 한글 2~4자 + '학생' 바로 앞
        out = out.replace(/([가-힣]{2,4})(\s?학생)/g, (m, name, tail) => {
          changes.push({ type: '이름', original: name, replaced: '[이름]' });
          return '[이름]' + tail;
        });
        // 3) 학번: 숫자 5자리
        out = out.replace(/\b\d{5}\b/g, (m) => {
          changes.push({ type: '학번', original: m, replaced: '[학번 삭제]' });
          return '[학번 삭제]';
        });
        // 4) 점수: 숫자+점
        out = out.replace(/\d+점/g, (m) => {
          changes.push({ type: '점수', original: m, replaced: '[점수]' });
          return '[점수]';
        });
        // 5) 건강 등 민감정보 키워드
        for (const w of HEALTH_WORDS) {
          if (out.includes(w)) {
            out = out.split(w).join('[민감정보 삭제]');
            changes.push({ type: '민감정보', original: w, replaced: '[민감정보 삭제]' });
          }
        }
        return { out, changes };
      }

      const wrap = P.h('div', { class: 'sim-priv' });
      const ta = P.h('textarea', { class: 'sim-priv-ta', rows: '3', 'aria-label': '프롬프트 예시(직접 바꿔 보세요)' });
      ta.value = DEFAULT_TEXT;
      const maskBtn = P.h('button', { class: 'btn primary', type: 'button' }, '가리기');
      const resultBox = P.h('div', { class: 'sim-priv-result', 'aria-live': 'polite' },
        P.h('p', { class: 'sim-priv-placeholder' }, '"가리기"를 누르면 바뀐 문장이 여기에 나와요.')
      );
      const approxNote = P.h('p', { class: 'sim-priv-approx' }, '대략적인 예시예요. 실제 비식별화는 더 꼼꼼하게 확인해야 해요.');

      const checklistTitle = P.h('h4', { class: 'sim-priv-h' }, '넣기 전 3초 점검');
      const CHECKS = [
        { id: 'name', label: '이름 · 사진 없음' },
        { id: 'min', label: '꼭 필요한 정보만' },
        { id: 'tool', label: '학교 승인 도구 · "학습에 사용 안 함" 설정 확인' }
      ];
      const checkState = { name: false, min: false, tool: false };
      const checkList = P.h('div', { class: 'sim-priv-checks' });
      const okMsg = P.h('p', { class: 'sim-priv-ok', hidden: '' }, '이제 넣어도 괜찮아요.');

      function renderChecks() {
        checkList.replaceChildren(...CHECKS.map(c => {
          const id = 'sim-priv-' + c.id;
          const cb = P.h('input', { type: 'checkbox', id, checked: checkState[c.id] ? '' : null });
          cb.checked = checkState[c.id];
          cb.addEventListener('change', () => { checkState[c.id] = cb.checked; okMsg.hidden = !(checkState.name && checkState.min && checkState.tool); });
          return P.h('label', { for: id, class: 'sim-priv-check' }, cb, c.label);
        }));
      }

      function renderResult() {
        const { out, changes } = maskText(ta.value);
        if (!changes.length) {
          resultBox.replaceChildren(P.h('p', { class: 'sim-priv-placeholder' }, '바뀐 항목이 없어요. 이름 · 학번 · 점수 · 건강 정보가 담긴 문장으로 다시 시도해 보세요.'));
          return;
        }
        const tags = P.h('div', { class: 'sim-priv-tags' },
          ...changes.map(c => P.h('span', { class: 'p-chip c-orange', style: 'position:static;margin:3px' }, `${c.type} → ${c.replaced}`))
        );
        resultBox.replaceChildren(
          P.h('p', { class: 'sim-priv-out' }, out),
          P.h('p', { class: 'sim-priv-count' }, `바뀐 항목 ${changes.length}개`),
          tags
        );
      }

      maskBtn.addEventListener('click', renderResult);

      wrap.append(
        P.h('h4', { class: 'sim-priv-h' }, '문장 넣기'),
        ta,
        P.h('div', { class: 'sim-priv-bar' }, maskBtn),
        resultBox,
        approxNote,
        checklistTitle,
        checkList,
        okMsg
      );
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-priv-h{margin:16px 0 8px;font-size:13.5px;color:var(--muted)}
        .sim-priv-h:first-child{margin-top:0}
        .sim-priv-ta{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:15px;font-family:inherit;resize:vertical;min-height:64px;max-width:100%}
        .sim-priv-bar{margin-top:10px}
        .sim-priv-result{margin-top:14px;border:1px solid var(--line);border-radius:14px;padding:14px;background:var(--paper);min-height:44px}
        .sim-priv-placeholder{margin:0;color:var(--faint);font-size:14.5px}
        .sim-priv-out{margin:0 0 8px;font-size:15.5px;line-height:1.6;word-break:break-word}
        .sim-priv-count{margin:0 0 6px;font-weight:800;font-size:14px;color:var(--aqua-deep)}
        .sim-priv-tags{display:flex;flex-wrap:wrap;gap:4px}
        .sim-priv-approx{margin:8px 0 0;font-size:12.5px;color:var(--muted)}
        .sim-priv-checks{display:flex;flex-direction:column;gap:8px;margin-top:6px}
        .sim-priv-check{display:flex;align-items:center;gap:8px;font-size:14.5px;cursor:pointer}
        .sim-priv-ok{margin-top:10px;color:var(--aqua-deep);font-weight:800;font-size:14.5px;background:var(--aqua-pale);border:1px solid var(--aqua);border-radius:10px;padding:8px 12px}
        .sim-priv-ok[hidden]{display:none}
      ` });
      el.append(style);

      ta.addEventListener('input', () => { resultBox.replaceChildren(P.h('p', { class: 'sim-priv-placeholder' }, '"가리기"를 누르면 바뀐 문장이 여기에 나와요.')); });

      renderChecks();
    }
  },

  teacherLines: [
    'AI에 넣는 글은 회사 서버로 가요. 그래서 친구 이름이나 사진은 넣지 않아요.',
    '필요한 것만, 가리고 넣기. 이게 AI 시대의 예의예요.'
  ],
  tip: {
    body: '이름은 <b>학생A</b>로, 학번은 <b>삭제</b>, 사진은 <b>얼굴 가리기</b>부터 시작하세요. 설정에서 "학습에 사용 안 함"도 확인해요.',
    extra: '학교가 승인한 도구를 쓰고, 정말 필요한 정보만 최소로 넣는 습관을 들이면 좋아요.'
  },
  myth: {
    myth: '내 계정에서만 쓰니까 괜찮다.',
    fact: '입력은 서비스 서버로 가고, 약관에 따라 저장·학습될 수 있어요. 학생 정보는 법으로 보호돼요.'
  },
  sources: [
    { title: '개인정보보호위원회', url: 'https://www.pipc.go.kr/', note: '공공 · 교육 분야를 포함한 개인정보 처리 기준과 안내를 확인할 수 있어요.' },
    { title: '국가법령정보센터', url: 'https://www.law.go.kr/', note: '"개인정보 보호법"으로 검색하면 조문과 최신 개정 내용을 확인할 수 있어요.' },
    { title: 'Claude 문서 — Vision', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', note: '예시로, 서비스 문서에는 업로드한 이미지를 어떻게 처리하는지가 적혀 있어요. 도구마다 방침이 다르니 확인해요.' }
  ],
  script: `생활기록부 문구를 AI에게 다듬어 달라고 하려다가 손이 멈칫해요. 이름이랑 성적, 넣어도 될까요?

AI 채팅창에 넣은 글은 내 컴퓨터 안에만 머무르지 않아요. 서비스 서버로 가서, 약관에 따라 저장되거나 검토·학습에 쓰일 수도 있어요. 서비스와 요금제에 따라 다르고, '학습에 사용 안 함' 설정이 있는 곳도 있어요.

이름·사진·학번·성적·건강·가정 사정 같은 정보는 개인정보예요. 개인정보 보호법이 지키고 있고, 학교가 이런 정보를 쓰려면 처리 근거와 동의가 필요해요.

그래서 원칙은 간단해요. 넣기 전에 먼저 가려요. 이름은 학생A로, 학번은 삭제, 사진은 얼굴 가리기예요. 꼭 필요한 정보만, 학교가 승인한 도구로요.

프롬프트를 넣기 전 3초만 점검해요. 이름? 사진? 민감정보? 설정에서 '학습에 사용 안 함'도 확인해요. 학생에게도 네 이름과 사진은 AI에 넣지 않는다고 알려 주세요.
`
};
