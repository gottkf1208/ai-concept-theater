/* V2 S2-7 [시즌 2] 목소리는 어떻게 만들어질까: TTS·음성 복제·동의 */
export default {
  slug: 'v2-voice',
  track: 'S2',
  title: '목소리는 어떻게 만들어질까',
  subtitle: 'TTS·음성 복제·동의',
  summary: '자막 프로그램이 붙여 준 AI 목소리가 사람 목소리랑 구분이 안 됐어요. 글자가 소리가 되는 과정과 몇 초 녹음으로 목소리를 흉내 내는 원리를 풀고, 2026년에 바뀐 표시·동의 규칙도 짚어요.',
  keywords: ['TTS', '음성 합성', '음성 복제', '제로샷', '운율', '동의', '법정대리인', '생체정보', 'AI 기본법', 'EU AI법 제50조'],

  scenes: [
    {
      title: '이 목소리, 사람인가요?', dur: 13,
      captions: [
        { t: 0, text: '영상 편집 사이트에 자막을 넣었더니 <em>AI 목소리</em>가 읽어 줬어요.' },
        { t: 5, text: '그런데 사람 목소리랑 <em>구분이 안 됐어요</em>.' },
        { t: 9.5, text: '이 목소리는 대체 어떻게 만들어진 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 310, size: 340, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 140, w: 470, text: '자막: "3교시는 과학실에서 진행합니다."', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const screen = P.box({ x: 830, y: 130, w: 380, h: 190, label: '자막 프로그램', sub: '자동으로 읽어 줘요', accent: 'aqua', icon: P.ICON.video });
        tl.at(stage.appendChild(screen.el), 1.6, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 590, y1: 205, x2: 830, y2: 220, curve: -10, width: 4, color: '#127E90' });
        const chip = P.chip({ x: 830, y: 360, text: '사람 목소리 같아요', color: 'gray', size: 22 });
        tl.at(stage.appendChild(chip.el), 6.2, { from: 'pop' });
        const qq = P.text({ x: 830, y: 410, w: 400, text: '<em>구분이 잘 안 돼요</em>.<br>어떻게 만든 걸까요?', size: 26, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            a1.draw(P.clamp((t - 1.8) / .7, 0, 1));
            screen.on(t > 1.6 && t < 9.5);
          }
        };
      }
    },
    {
      title: '글자에서 소리까지', dur: 14,
      captions: [
        { t: 0, text: '글자는 먼저 <em>발음 단위(음소)</em>로 쪼개지고 억양·길이(운율)가 붙어요.' },
        { t: 5.5, text: '옛날 TTS는 녹음 조각을 <em>이어 붙였어요</em>. 그래서 말이 딱딱했죠.' },
        { t: 10, text: '요즘은 <em>신경망</em>이 소리 파형을 통째로 새로 그려요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 400, size: 240, pose: 'think' });
        tl.at(stage.appendChild(q.el), .1, { from: 'up' });
        const box1 = P.box({ x: 340, y: 90, w: 250, h: 120, label: '글자', sub: '"과학실로 이동"', accent: 'ink', icon: P.ICON.doc });
        const box2 = P.box({ x: 630, y: 90, w: 290, h: 120, label: '발음·운율', sub: '음소 + 억양·길이', accent: 'aqua', icon: P.ICON.brain });
        const box3 = P.box({ x: 960, y: 90, w: 250, h: 120, label: '소리 파형', sub: '스피커로 재생', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        tl.at(stage.appendChild(box2.el), .9, { from: 'up' });
        tl.at(stage.appendChild(box3.el), 1.5, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 590, y1: 150, x2: 630, y2: 150, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 920, y1: 150, x2: 960, y2: 150, width: 4, color: '#1B1F24' });
        const oldBox = P.box({ x: 340, y: 300, w: 400, h: 150, label: '옛날 TTS', sub: '녹음 조각을 <b>이어 붙여요</b><br>그래서 말이 딱딱해요', accent: 'ink', icon: P.ICON.doc });
        const newBox = P.box({ x: 770, y: 300, w: 440, h: 150, label: '요즘 TTS', sub: '신경망이 파형을 <b>통째로</b> 새로 그려요', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(oldBox.el), 5.7, { from: 'up' });
        tl.at(stage.appendChild(newBox.el), 6.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > .5 && t < 10.5);
            a1.draw(P.clamp((t - .6) / .5, 0, 1));
            a2.draw(P.clamp((t - 1.2) / .5, 0, 1));
            oldBox.on(t > 5.5 && t < 10);
            newBox.on(t > 10);
          }
        };
      }
    },
    {
      title: '3초면 흉내 내요', dur: 14,
      captions: [
        { t: 0, text: '2023년 연구는 영어 음성 <em>6만 시간</em>으로 모델을 학습시켰어요.' },
        { t: 5, text: '그 모델은 처음 듣는 사람의 <em>3초 녹음</em>만으로 목소리를 흉내 냈어요.' },
        { t: 9.5, text: '2026년 영상 모델도 목소리 참고를 받는데, 한 대형 모델은 <em>말을 바꾸는 기능</em>을 일부러 막아 뒀어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const box1 = P.box({ x: 340, y: 90, w: 300, h: 140, label: '학습 데이터', sub: '영어 음성 6만 시간<br>2023년 연구', accent: 'ink', icon: P.ICON.doc });
        const box2 = P.box({ x: 700, y: 90, w: 300, h: 140, label: '처음 듣는 목소리', sub: '녹음 <b>3초</b>만 있으면', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        tl.at(stage.appendChild(box2.el), 2.1, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 640, y1: 160, x2: 700, y2: 160, width: 4, color: '#1B1F24' });
        const box3 = P.box({ x: 520, y: 290, w: 360, h: 130, label: '복제된 목소리', sub: '그 사람 목소리로 새 문장을 말해요', accent: 'orange', icon: P.ICON.brain });
        tl.at(stage.appendChild(box3.el), 4.6, { from: 'pop' });
        const a2 = P.arrow(lines, { x1: 850, y1: 230, x2: 760, y2: 290, curve: -30, width: 4, color: '#F2812D' });
        const final = P.text({ x: 520, y: 460, w: 600, text: '목소리 특징을 짧은 녹음에서 뽑아 <em>새 문장</em>에 입혀요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        const small = P.text({ x: 520, y: 530, w: 620, text: '2026년 영상 모델은 목소리 참고까지 받지만, 한 대형 모델은 사람의 말을 바꾸는 기능을 일부러 막아 뒀어요.', size: 19, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            a1.draw(P.clamp((t - 2.3) / .5, 0, 1));
            a2.draw(P.clamp((t - 4.8) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '목소리는 개인정보, 표시가 의무예요', dur: 14,
      captions: [
        { t: 0, text: '목소리는 <em>개인정보</em>예요. 지문·얼굴처럼 생체정보 범주에 들어가요.' },
        { t: 5, text: '학생·동료 목소리를 복제하려면 <em>본인 동의</em>, 만 14세 미만이면 <em>법정대리인 동의</em>가 필요해요.' },
        { t: 9.5, text: '한국 AI 기본법은 생성형 AI 결과물에 <em>표시</em>를 하라고 해요. 유럽은 올해 8월부터 가짜 목소리에 고지를 의무로 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 310, size: 320, pose: 'oops' });
        stage.append(q.el);
        const box1 = P.box({ x: 380, y: 90, w: 280, h: 150, label: '목소리 = 개인정보', sub: '생체정보 범주에 들어가요', accent: 'ink', icon: P.ICON.eye });
        const box2 = P.box({ x: 700, y: 90, w: 280, h: 150, label: '만 14세 미만', sub: '법정대리인 동의가 필요해요', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(box1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(box2.el), 1.1, { from: 'up' });
        const box3 = P.box({ x: 380, y: 280, w: 600, h: 150, label: '표시 의무, 2026년부터', sub: '한국 AI 기본법: 생성형 AI 결과물 표시<br>유럽: 8월부터 가짜 목소리 고지 의무', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(box3.el), 5.3, { from: 'up' });
        const chip = P.chip({ x: 380, y: 470, text: '미국: 목소리 복제 연방 법안, 상원 위원회 통과 단계', color: 'gray', size: 19 });
        tl.at(stage.appendChild(chip.el), 9.8, { from: 'pop' });
        const final = P.text({ x: 380, y: 530, w: 600, text: '허락 없이 복제하면 안 되고, AI 목소리는 <em>표시</em>해야 해요.', size: 25, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.3);
            box1.on(t > .3); box2.on(t > 1.1); box3.on(t > 5.3);
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 12,
      captions: [
        { t: 0, text: '학교 방송·수업 영상엔 <em>기본 제공 목소리</em>를 써요.' },
        { t: 4.5, text: '목소리를 복제하고 싶으면 <em>동의서</em>를 먼저 받아요. 학생이면 법정대리인 동의도요.' },
        { t: 8.5, text: 'AI 목소리를 썼다면 영상 끝이나 설명란에 <em>꼭 표시</em>해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const steps = [
          ['① 기본 제공 목소리', '학교 방송·수업 영상엔 이걸로'],
          ['② 동의서 먼저', '복제는 본인·법정대리인 동의부터'],
          ['③ AI 목소리 표시', '영상 끝이나 설명란에']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 420 + i * 280, y: 140, w: 250, h: 140, label, sub, accent: i === 2 ? 'aqua' : (i === 1 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 670 + i * 280, y1: 210, x2: 700 + i * 280, y2: 210, width: 4, color: '#1B1F24' }));
        const last = P.text({ x: 420, y: 480, w: 760, text: 'AI 목소리를 썼다면 영상 끝이나 설명란에 <em>꼭 표시</em>해요.', size: 29, weight: 800, color: '#F2812D' });
        tl.at(stage.appendChild(last.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .7)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .7));
          }
        };
      }
    }
  ],

  interaction: {
    title: '목소리 복제, 해도 될까?',
    desc: '누구 목소리를, 어디에 쓸지 고르고 체크리스트를 채운 뒤 <b>판정하기</b>를 눌러 보세요. 조건에 따라 "써도 돼요", "아직이에요", "쓰지 않아요" 중 하나와 표시 문구 예시를 보여 줘요. 법률 자문이 아니라 수업용 점검표예요.',
    mount(el, P) {
      const whoSel = P.h('select', { id: 'vv-who', class: 'sim-select', 'aria-label': '누구 목소리' },
        P.h('option', { value: 'me' }, '내 목소리'),
        P.h('option', { value: 'colleague' }, '동료 선생님'),
        P.h('option', { value: 'student' }, '우리 반 학생(만 12세)'),
        P.h('option', { value: 'celeb' }, '유명인')
      );
      const whereSel = P.h('select', { id: 'vv-where', class: 'sim-select', 'aria-label': '어디에 쓸까' },
        P.h('option', { value: 'class' }, '우리 반 수업 영상'),
        P.h('option', { value: 'site' }, '학교 누리집 공개'),
        P.h('option', { value: 'contest' }, '외부 대회 출품')
      );
      const chkSelf = P.h('input', { type: 'checkbox', id: 'vv-c0' });
      const chkGuardian = P.h('input', { type: 'checkbox', id: 'vv-c1' });
      const chkInform = P.h('input', { type: 'checkbox', id: 'vv-c2' });
      const chkLabelPlan = P.h('input', { type: 'checkbox', id: 'vv-c3' });
      const rows = [
        [chkSelf, '본인 동의 받음'],
        [chkGuardian, '법정대리인 동의 받음'],
        [chkInform, '어디에 쓸지 알림'],
        [chkLabelPlan, '결과물에 AI 표시 계획 있음']
      ].map(([box, lbl], i) => P.h('div', { class: 'sim-check-row' }, box, P.h('label', { for: box.id || `vv-c${i}` }, lbl)));

      const judgeBtn = P.h('button', { type: 'button', class: 'btn primary' }, '판정하기');
      const resultCard = P.h('div', { class: 'sim-result' }, '왼쪽을 채우고 판정하기를 눌러 보세요.');
      const footer = P.h('p', { class: 'muted sim-foot' }, '법률 자문이 아니라 수업용 점검표예요.');

      const colA = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '① 상황 고르기'),
        P.h('div', { class: 'sim-row' }, P.h('label', { for: 'vv-who' }, '누구 목소리'), whoSel),
        P.h('div', { class: 'sim-row' }, P.h('label', { for: 'vv-where' }, '어디에 쓸까'), whereSel),
        P.h('h4', {}, '② 체크리스트'),
        ...rows
      );
      const colB = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '③ 판정'),
        P.h('div', { class: 'sim-actions' }, judgeBtn),
        resultCard,
        footer
      );
      const wrap = P.h('div', { class: 'sim-wrap' }, colA, colB);
      const style = P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:28px;max-width:100%}
        .sim-col{flex:1 1 280px;min-width:0;max-width:100%}
        .sim-col h4{font-size:16px;margin:16px 0 10px}
        .sim-col h4:first-child{margin-top:0}
        .sim-row{display:flex;align-items:center;gap:10px;margin-top:10px;font-weight:700;font-size:13.5px;flex-wrap:wrap}
        .sim-row label{white-space:nowrap}
        .sim-select{flex:1 1 160px;min-width:0;max-width:100%;height:36px;border-radius:10px;border:1px solid var(--line);padding:0 8px;font-size:13.5px}
        .sim-check-row{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:14px}
        .sim-check-row input{width:18px;height:18px;flex:none}
        .sim-check-row label{cursor:pointer}
        .sim-actions{margin-top:4px}
        .sim-result{margin-top:14px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);font-weight:800;font-size:14.5px;background:var(--paper);min-height:1.4em}
        .sim-result.ok{border-color:var(--aqua-deep);color:var(--aqua-deep)}
        .sim-result.warn{border-color:#9AA5AF;color:#5B6572}
        .sim-result.bad{border-color:#F2812D;color:#B3520F}
        .sim-foot{font-size:12px;margin-top:10px}
      `
      });
      el.append(wrap, style);

      function judge() {
        const who = whoSel.value, where = whereSel.value;
        const self = chkSelf.checked, guardian = chkGuardian.checked, inform = chkInform.checked, labelPlan = chkLabelPlan.checked;
        let text, cls;
        if (who === 'celeb') {
          text = '쓰지 않아요. 본인 동의를 받을 수 없으면 기본 제공 목소리를 써요.';
          cls = 'bad';
        } else {
          const missing = [];
          if (!self) missing.push('본인 동의');
          if (who === 'student' && !guardian) missing.push('법정대리인 동의');
          if (!inform) missing.push('어디에 쓸지 알리기');
          if (!labelPlan) missing.push('AI 표시 계획');
          if (missing.length) {
            text = `아직이에요. ${missing.join('·')}가 필요해요.`;
            cls = 'warn';
          } else {
            const whoLabel = who === 'me' ? '나' : (who === 'colleague' ? '동료 선생님' : '학생 보호자');
            text = `써도 돼요. 표시 문구 예시: "이 영상의 목소리는 AI로 만들었어요(${whoLabel} 동의)."`;
            if (where === 'contest') text += ' 외부 대회라면 대회 규정도 같이 확인하세요.';
            cls = 'ok';
          }
        }
        resultCard.textContent = text;
        resultCard.className = 'sim-result ' + cls;
      }
      judgeBtn.addEventListener('click', judge);
    }
  },

  teacherLines: [
    'AI 목소리는 녹음을 틀어 주지 않고 <b>소리를 새로 만들어요</b>. 3초 녹음으로도 흉내 낼 수 있어요.',
    '목소리도 내 개인정보예요. 누가 흉내 내려면 <b>꼭 허락</b>을 받아야 하고, AI 목소리를 썼다면 <b>표시</b>해야 해요.'
  ],
  tip: {
    body: '학교 방송·수업 영상에는 <b>기본 제공 목소리</b>를 쓰고, AI 목소리를 썼다면 영상 끝이나 설명란에 표시해요. 2026년부터 한국 AI 기본법에도 생성형 AI 결과물 표시 의무가 있어요.',
    extra: '학생 목소리를 복제하는 활동은 만 14세 미만이면 법정대리인 동의가 먼저예요. 동의서에는 누구 목소리를, 어디에, 언제까지 쓰는지와 표시 방법을 적어 둬요.'
  },
  myth: {
    myth: '목소리는 얼굴 사진이 아니니 허락 없이 따라 해도 괜찮다.',
    fact: '목소리는 개인정보이고 생체정보 범주에 들어가요. 몇 초 녹음으로 흉내 낼 수 있어서 더 조심해야 하고, 2026년부터는 한국과 유럽 모두 AI로 만든 결과물에 표시를 요구해요.'
  },
  sources: [
    { title: 'Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (VALL-E, arXiv, 2023)', url: 'https://arxiv.org/abs/2301.02111', note: '영어 음성 6만 시간으로 학습한 모델이 처음 듣는 화자의 3초 녹음만으로 목소리를 흉내 낸 제로샷 음성 합성 논문이에요.' },
    { title: 'EU AI Act Service Desk — Article 50: Transparency obligations', url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50', note: '합성 오디오를 기계가 읽을 수 있게 표시하고, 딥페이크 음성은 AI로 만들었다고 고지하라는 조항이에요. 2026년 8월 2일부터 적용돼요.' },
    { title: '국가법령정보센터 — 인공지능기본법 제31조(인공지능 투명성 확보 의무)', url: 'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1031810729', note: '생성형 AI 또는 그 결과물을 제공할 때 AI로 생성됐다는 사실을 표시해야 한다는 조문이에요.' },
    { title: '국가법령정보센터 — 개인정보 보호법 제22조의2(아동의 개인정보 보호)', url: 'https://www.law.go.kr/LSW//lsLinkCommonInfo.do?lsJoLnkSeq=1029334873&chrClsCd=010202&ancYnChk=', note: '만 14세 미만 아동의 개인정보를 처리할 때 법정대리인의 동의를 받아야 한다는 조문이에요.' }
  ],
  script: `영상 편집 사이트에 자막을 넣었더니 AI 목소리가 읽어 줬는데, 사람 목소리랑 거의 구분이 안 됐어요. 이 목소리는 어떻게 만들어질까요.

글자는 먼저 음소로 쪼개지고 억양·길이 같은 운율이 붙어요. 옛날 TTS는 녹음 조각을 이어 붙여서 말이 딱딱했지만, 요즘은 신경망이 소리 파형을 통째로 새로 그려요. 2023년 연구에서는 영어 음성 6만 시간으로 배운 모델이 처음 듣는 사람의 3초 녹음만으로 그 목소리를 흉내 냈어요. 2026년 영상 모델은 목소리 참고까지 받기 시작했는데, 한 대형 모델은 사람의 말을 바꾸는 기능을 일부러 막아 뒀어요.

목소리는 개인정보이고 생체정보 범주에 들어가요. 학생·동료 목소리를 복제하려면 본인 동의가 필요하고, 만 14세 미만이면 법정대리인 동의도 받아야 해요. 2026년부터는 표시도 의무예요. 한국 AI 기본법은 생성형 AI 결과물에 표시를 하라고 하고, 유럽은 올해 8월부터 딥페이크 음성에 고지를 의무로 했어요.

그러니 학교 방송·수업 영상엔 기본 제공 목소리를 쓰고, 복제하고 싶으면 동의서부터 받으세요. AI 목소리를 썼다면 영상 끝이나 설명란에 꼭 표시해요.`
};
