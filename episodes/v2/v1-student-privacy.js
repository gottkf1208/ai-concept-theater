/* V1-8 [S1] 학생 이름, AI에 넣어도 될까: 개인정보와 2026 평가·기록 기준 */
export default {
  slug: 'v1-student-privacy',
  track: 'S1',
  title: '학생 이름, AI에 넣어도 될까?',
  subtitle: '학생 개인정보, 학생부 기록, 수행평가 AI 관리',
  summary: '생활기록부 문구를 AI에게 다듬어 달라고 하려다 손이 멈춰요. 입력이 어디로 가는지, 2026년 수행평가 AI 관리 방안이 무엇을 요구하는지, 넣기 전에 무엇을 가려야 하는지 정리했어요.',
  keywords: ['개인정보', '학생 정보', '비식별화', '가명', '학습 사용 설정', '학교생활기록부', '기재요령', '수행평가', 'AI 활용 관리 방안', '개인정보보호위원회'],

  scenes: [
    {
      title: '이름이랑 성적, 넣어도 되나?', dur: 13,
      captions: [
        { t: 0, text: '학생 생활기록부 문구를 AI에게 다듬어 달라고 하려던 참이에요.' },
        { t: 5, text: '그런데 손이 멈칫해요. <em>"이름이랑 성적, 넣어도 되나?"</em>' },
        { t: 9.5, text: '넣어도 되는 것과 가려야 하는 것, 어떻게 나눌까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 360, pose: 'oops' });
        stage.append(q.el);
        const box = P.box({ x: 380, y: 80, w: 760, h: 100, label: '생활기록부 문구 다듬기', sub: 'AI에게 부탁하려는 중', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(box.el), .3, { from: 'up' });
        const preview = P.text({ x: 380, y: 210, w: 760, text: '"한 학생은 수학 78점, 알레르기 있음. 문구를 다듬어 줘"', size: 21, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(preview.el), 1.2, { from: 'up' });
        const b = P.bubble({ x: 380, y: 320, w: 620, text: '"<b>이름이랑 성적</b>, 넣어도 되나?"', tail: 'left', tone: 'orange', size: 27 });
        tl.at(stage.appendChild(b.el), 5, { from: 'up' });
        const qq = P.text({ x: 380, y: 560, w: 760, text: '넣어도 되는 것, 가려야 하는 것은?', size: 30, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
          }
        };
      }
    },
    {
      title: '내가 넣은 글은 어디로 가나', dur: 14,
      captions: [
        { t: 0, text: '채팅창에 넣은 글은 서비스 <em>서버</em>로 가요.' },
        { t: 5, text: '한 서비스는 학습에 쓰도록 허용하면 <em>5년</em>, 아니면 <em>30일</em> 보관해요.' },
        { t: 9.5, text: '다른 서비스는 일부 대화를 <em>사람이 검토</em>하고, 검토된 대화는 최대 <em>3년</em> 보관해요. 설정의 학습 사용과 활동 저장을 꼭 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'point' });
        stage.append(q.el);
        const chatBox = P.box({ x: 360, y: 90, w: 280, h: 120, label: '내 채팅창', sub: '내가 쓴 프롬프트', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(chatBox.el), .3, { from: 'left' });
        const arrow = P.arrow(lines, { x1: 640, y1: 150, x2: 720, y2: 150, width: 4, color: '#1B1F24' });
        const serverBox = P.box({ x: 720, y: 70, w: 460, h: 160, label: '서비스 서버', sub: '설정과 요금제에 따라 보관 기간이 정해져요', accent: 'aqua', icon: P.ICON.plug });
        tl.at(stage.appendChild(serverBox.el), 1.6, { from: 'right' });
        const boxA = P.box({ x: 360, y: 290, w: 400, h: 120, label: '한 서비스', sub: '학습 동의 시 5년 · 미동의 시 30일 보관', accent: 'ink' });
        tl.at(stage.appendChild(boxA.el), 5.2, { from: 'up' });
        const boxB = P.box({ x: 780, y: 290, w: 400, h: 120, label: '다른 서비스', sub: '일부 대화 사람이 검토 · 최대 3년 보관', accent: 'orange' });
        tl.at(stage.appendChild(boxB.el), 6, { from: 'up' });
        const final = P.text({ x: 360, y: 440, w: 820, text: '설정의 <em>학습 사용</em>과 <em>활동 저장</em>을 꼭 확인해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            arrow.draw(P.clamp((t - 1) / .6, 0, 1));
            boxA.on(t > 5.2); boxB.on(t > 6);
          }
        };
      }
    },
    {
      title: '학생 정보는 개인정보, 2025년 12월 기준', dur: 14,
      captions: [
        { t: 0, text: '이름·사진·학번·성적·건강·가정 사정은 <em>개인정보</em>예요.' },
        { t: 5, text: '개인정보보호위원회는 2025년에 생성형 AI <em>개인정보 처리 안내서</em>를 냈어요.' },
        { t: 9.5, text: '2025년 12월 수행평가 AI 관리 방안도 다섯 영역에 <em>개인정보 보호</em>를 넣고, 입력에 각별히 주의하라고 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 260, pose: 'think' });
        stage.append(q.el);
        const labels = ['이름', '사진', '학번', '성적', '건강', '가정 사정'];
        const chips = labels.map((t, i) => {
          const c = P.chip({ x: 340 + i * 150, y: 130, text: t, color: i % 2 ? 'orange' : 'aqua', size: 20 });
          tl.at(stage.appendChild(c.el), .4 + i * .3, { from: 'pop' });
          return c;
        });
        const box1 = P.box({ x: 340, y: 230, w: 900, h: 100, label: '개인정보 처리 안내서', sub: '개인정보보호위원회 · 2025년 공개', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(box1.el), 2.8, { from: 'up' });
        const box2 = P.box({ x: 340, y: 350, w: 900, h: 140, label: '수행평가 AI 활용 관리 방안 (2025.12)', sub: '①범위 설정 ②과정 표기 ③사전교육<br>④평가 설계 ⑤<b>개인정보 보호</b>', accent: 'orange' });
        tl.at(stage.appendChild(box2.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            box1.on(t > 2.8); box2.on(t > 9.6);
          }
        };
      }
    },
    {
      title: '수행평가와 기록: 규칙부터 알려요', dur: 14,
      captions: [
        { t: 0, text: '관리 방안은 AI를 <em>일률적으로 막지 않아요</em>.' },
        { t: 5, text: '평가 전에 허용 범위와 금지 행위를 미리 알리고, 학생이 쓴 AI 종류와 프롬프트를 <em>출처로 밝히게</em> 해요.' },
        { t: 9.5, text: '결과물만 받지 않고 수업 시간에 과정을 직접 보는 평가로 바꿔요. 기록도 <em>교사가 직접 본 것</em>을 바탕으로 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'point' });
        stage.append(q.el);
        const notice = P.box({ x: 340, y: 90, w: 900, h: 140, label: '공지문 예시', sub: '"AI로 생성한 글이나 이미지 출처를 밝히지 않고<br>창작물로 제출하는 행위는 부정행위"', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(notice.el), .3, { from: 'up' });
        const srcChip = P.chip({ x: 340, y: 260, text: '사용한 AI · 프롬프트를 출처로 밝혀요', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(srcChip.el), 5.2, { from: 'pop' });
        const observe = P.box({ x: 340, y: 330, w: 620, h: 120, label: '수업 중 과정 관찰', sub: '교사가 직접 본 것이 기록의 바탕이에요', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(observe.el), 9.6, { from: 'up' });
        const final = P.text({ x: 340, y: 480, w: 900, text: '<em>금지가 아니라 규칙</em>이 먼저예요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            observe.on(t > 9.6);
          }
        };
      }
    },
    {
      title: '넣기 전 3초 점검', dur: 13,
      captions: [
        { t: 0, text: '넣기 전에 <em>3초만</em> 점검해요. 이름? 사진? 건강 같은 민감정보?' },
        { t: 5.5, text: '이름은 <em>학생A</em>로, 학번은 <em>지우고</em>, 사진은 <em>얼굴을 가려요</em>.' },
        { t: 10, text: '학교가 승인한 도구인지, <em>학습 사용</em> 설정이 꺼져 있는지 보고 학생에게도 말해 줘요.' }
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
        const settingBox = P.box({ x: 300, y: 280, w: 620, h: 100, label: '"학습 사용" 끔 · "활동 저장" 확인', accent: 'aqua', icon: P.ICON.check });
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
    desc: '아래 예시 문장에서 "<b>가리기</b>"를 눌러 이름 · 학번 · 점수 · 민감정보가 어떻게 바뀌는지 보세요. 그래도 <b>학년·반</b>처럼 남는 정보가 있으면 "남은 위험"으로 알려줘요. 규칙 기반 <b>대략적인 예시</b>예요 — 실제 비식별화는 더 꼼꼼해야 해요.',
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

      // 남은 위험: 가려도 학년+반이 함께 남으면 특징 묘사만으로 식별될 수 있어요(결정적 규칙).
      function remainingRisk(out) {
        const grade = out.match(/(\d)\s*학년/);
        const cls = out.match(/(\d)\s*반/);
        if (grade && cls) {
          return `남은 위험: <b>${grade[0]} ${cls[0]}</b>처럼 학년·반 정보가 함께 남으면, 특징 묘사만으로도 누군지 알 수 있어요.`;
        }
        return '';
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
        { id: 'tool', label: '학교 승인 도구 · 학습 사용 끔 · 활동 저장 확인' }
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
          resultBox.replaceChildren(P.h('p', { class: 'sim-priv-placeholder' }, '바뀐 항목이 없어요. 이름 · 학번 · 점수 · 건강 정보가 담긴 문장으로 다시 해 보세요.'));
          return;
        }
        const tags = P.h('div', { class: 'sim-priv-tags' },
          ...changes.map(c => P.h('span', { class: 'p-chip c-orange', style: 'position:static;margin:3px' }, `${c.type} → ${c.replaced}`))
        );
        const riskText = remainingRisk(out);
        const children = [
          P.h('p', { class: 'sim-priv-out' }, out),
          P.h('p', { class: 'sim-priv-count' }, `바뀐 항목 ${changes.length}개`),
          tags
        ];
        if (riskText) children.push(P.h('p', { class: 'sim-priv-risk', html: riskText }));
        resultBox.replaceChildren(...children);
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
        .sim-priv-risk{margin:10px 0 0;font-size:13px;font-weight:700;color:#F2812D;background:#FDF1E7;border:1px solid #F2C9A0;border-radius:10px;padding:8px 10px}
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
    'AI에 넣은 글은 <b>회사 서버로 가요</b>. 그래서 친구 이름이나 사진은 넣지 않아요.',
    'AI를 썼으면 <b>어떤 AI에 무엇을 물었는지</b> 출처처럼 적어 둬요. 숨기면 부정행위가 돼요.'
  ],
  tip: {
    body: '학생 관련 문구를 AI로 다듬을 땐 이름은 학생A, 학번은 삭제, 건강·가정 정보는 빼고, 교사가 직접 관찰한 사실만 짧게 넣으세요. 결과 문장은 내가 본 사실과 맞는지 한 줄씩 대조한 뒤 내 문장으로 고쳐 써요.',
    extra: '수행평가 공지문에는 허용 범위(아이디어 찾기만 허용 등)와 금지 행위, 출처 적는 칸(사용한 AI·프롬프트)을 함께 넣어 두면 학생도 교사도 헷갈리지 않아요.'
  },
  myth: {
    myth: '내 계정에서만 쓰니까 학생 정보를 넣어도 괜찮다.',
    fact: '입력은 서비스 서버로 가고, 설정에 따라 수년간 보관되거나 사람이 검토하거나 학습에 쓰일 수 있어요. 학생 정보는 개인정보라서 넣기 전에 가리고, 꼭 필요한 만큼만 넣어야 해요.'
  },
  sources: [
    { title: '교육부 보도자료 — 수행평가 시, 인공지능(AI) 활용 관리 방안', url: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=104984&lev=0&m=020402', note: '일률 금지가 아닌 관리, 5개 영역, 출처 표기와 개인정보 주의.' },
    { title: '정책브리핑 — 올해부터 바뀌는 중고등학교 수행평가 AI 활용 지침', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148957866', note: '금지 행위 공지 예시, AI 종류·프롬프트를 출처로 제시.' },
    { title: "정책브리핑 — 개인정보위, 생성형 AI 개발·활용 '개인정보 처리 기준' 공개", url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148947194', note: '생성형 AI 개인정보 처리 안내서 4단계.' },
    { title: 'Gemini 앱 개인정보 허브', url: 'https://support.google.com/gemini/answer/13594961', note: '사람 검토, 기밀 정보 입력 자제 권고, 보관 기간(72시간·최대 3년).' }
  ],
  script: `생활기록부 문구를 AI에게 다듬어 달라고 하려다가 손이 멈칫했어요. 이름이랑 성적, 넣어도 될까요?

채팅창에 넣은 글은 서비스 서버로 가요. 한 서비스는 학습 동의 시 5년, 미동의 시 30일 보관하고, 다른 서비스는 일부 대화를 사람이 검토하며 최대 3년 보관해요. 학습 사용과 활동 저장 설정을 꼭 확인해요.

이름·사진·학번·성적·건강·가정 사정은 개인정보예요. 2025년 12월 교육부와 교육청의 수행평가 AI 관리 방안은 AI를 막지 않는 대신, 쓴 AI와 프롬프트를 출처로 밝히게 하고 개인정보 입력에 각별히 주의하도록 했어요. 평가도 수업 중 과정을 직접 보는 쪽으로 바뀌어요.

넣기 전 3초만 점검하세요. 이름은 학생A로, 학번은 지우고, 사진은 얼굴을 가려요. 학교 승인 도구인지, 학습 사용이 꺼져 있는지도 함께 봐요.`
};
