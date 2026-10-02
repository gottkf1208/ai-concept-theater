/* S5-38 AI 법은 지금 어디까지 왔을까: 한국 AI 기본법과 EU AI법의 2026년 시간표 */
export default {
  slug: 'v5-law-timeline',
  track: 'S5',
  title: 'AI 법은 지금 어디까지 왔을까',
  subtitle: '한국 AI 기본법과 EU AI법의 2026년 시간표',
  summary: '학급 홍보 영상에 AI 목소리와 AI 그림을 넣었다면 표시해야 할까요? 2026년 1월 22일 시행된 한국 AI 기본법 제31조(투명성 의무)와 2026년 8월 2일 적용된 EU AI법 제50조, 그리고 2027년 12월로 미뤄진 고위험 의무까지 시간표로 정리해요.',
  keywords: ['인공지능기본법', 'AI 기본법', '제31조', '투명성 확보 의무', '사전 고지', 'AI 생성물 표시', '딥페이크', '워터마크', '계도기간', '고영향 인공지능', 'EU AI법', '제50조', '고위험 AI', '디지털 옴니버스'],

  scenes: [
    {
      title: '학급 영상에 AI가 들어갔어요', dur: 13,
      captions: [
        { t: 0, text: '학급 홍보 영상에 <em>AI 목소리 내레이션</em>과 <em>AI 그림 배경</em>을 넣었어요.' },
        { t: 5, text: '교장 선생님처럼 보이는 합성 인사말까지 넣었다면, 이 중 무엇을 표시해야 할까요?' },
        { t: 9, text: '2026년에 시행된 법이 그 답을 정해 두었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'think' });
        stage.append(q.el);
        const b = P.box({
          x: 340, y: 110, w: 620, h: 220, label: '학급 홍보 영상 초안',
          sub: 'AI 목소리 내레이션<br>AI 그림 배경<br><em>실제 같은 교장 선생님 합성 인사(?)</em>',
          accent: 'ink', icon: P.ICON.video
        });
        tl.at(stage.appendChild(b.el), .3, { from: 'up' });
        const chip = P.chip({ x: 340, y: 360, text: '"이거 그냥 올려도 되나?"', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.2, { from: 'pop' });
        const note = P.text({ x: 340, y: 430, w: 700, text: '2026년부터 한국과 유럽 모두 <em>AI로 만든 결과물</em>에 규칙을 정했어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            b.on(t > .3);
          }
        };
      }
    },
    {
      title: '한국 시간표', dur: 14,
      captions: [
        { t: 0, text: '한국 <em>인공지능기본법</em>은 2025년 1월 21일 공포됐고, <em>2026년 1월 22일</em>부터 시행 중이에요.' },
        { t: 5.5, text: '시행 뒤 <em>최소 1년 이상</em>은 계도 기간이라, 사실조사는 인명사고 같은 극히 예외적인 경우에만 해요.' },
        { t: 10.5, text: '2026년 7월 21일부터는 일부개정된 조문도 함께 시행됐어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'point' });
        stage.append(q.el);
        const steps = [
          ['2025-01-21', '공포', '법률 제20676호'],
          ['2026-01-22', '시행', '제31조 투명성 의무 포함'],
          ['최소 1년 이상', '계도 기간', '사실조사는 예외적인 경우만'],
          ['2026-07-21', '일부개정 시행', '법률 제21311호']
        ].map(([top, label, sub], i) => {
          const b = P.box({ x: 340 + i * 220, y: 140, w: 200, h: 150, label: `${top}`, sub: `<b>${label}</b><br>${sub}`, accent: i === 1 ? 'aqua' : (i === 2 ? 'orange' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * 1.1, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 220, y1: 215, x2: 565 + i * 220, y2: 215, width: 4, color: '#1B1F24' }));
        const final = P.text({ x: 340, y: 450, w: 900, text: '법은 올해 1월 22일부터 <em>시행 중</em>이에요. 처음 1년 넘게는 계도 기간이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10.5);
            steps.forEach((b, i) => b.on(t > .3 + i * 1.1));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.1 + i * 1.1)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '제31조 세 단계', dur: 13,
      captions: [
        { t: 0, text: '제31조(투명성 확보 의무)는 세 단계예요. <em>미리 알리기</em>, <em>결과물 표시</em>, <em>헷갈리는 합성물은 눈에 보이게</em>.' },
        { t: 5.5, text: '실제와 구분하기 어려운 딥페이크는 <em>가시적 워터마크</em>가 의무예요. 웹툰·애니메이션은 <em>디지털 워터마크</em>(파일에 안 보이게 심는 표시)도 허용해요.' },
        { t: 10, text: '의무를 지는 쪽은 AI 사업자예요. 그래도 같은 원칙을 수업 결과물에 적용하면 좋아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const cards = [
          ['① 사전 고지', 'AI 기반으로 운용된다는 사실을<br>이용자에게 미리 알리기', 'ink'],
          ['② 결과물 표시', '생성형 AI로 만들었다는 사실을<br>결과물에 표시하기', 'aqua'],
          ['③ 눈에 보이게', '실제 같은 합성 음향·이미지·영상은<br><em>가시적 워터마크</em>로 고지', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340 + i * 300, y: 120, w: 270, h: 160, label, sub, accent: acc, icon: P.ICON.eye });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 340, y: 450, w: 900, text: '웹툰·애니메이션처럼 창작물이면 <i>디지털 워터마크</i>와 알림창 안내도 허용돼요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 9, { from: 'up' });
        const final = P.text({ x: 340, y: 500, w: 900, text: '의무를 지는 쪽은 AI 사업자예요. 수업에서도 같은 원칙을 따르면 좋아요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            cards.forEach((b, i) => b.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: 'EU 시간표', dur: 14,
      captions: [
        { t: 0, text: 'EU AI법은 2024년 8월 1일 발효됐고, 올해 <em>8월 2일</em>부터 제50조 투명성 의무가 적용됐어요.' },
        { t: 5.5, text: '시험 채점 같은 <em>고위험 AI</em> 규칙은 2026년 7월 디지털 옴니버스라는 개정 절차로 2027년 12월까지 미뤄졌어요.' },
        { t: 10.5, text: '학생 평가에 쓰는 AI는 교육 분야 고위험 의무에 들어가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'think' });
        stage.append(q.el);
        const steps = [
          ['2024-08', '발효', ''],
          ['2025-02', '금지·AI 리터러시', ''],
          ['2025-08', '범용 AI 의무', ''],
          ['2026-08-02', '제50조 투명성', ''],
          ['2027-12', '고위험(교육 포함)', '지연']
        ].map(([top, label, tag], i) => {
          const b = P.box({ x: 320 + i * 185, y: 130, w: 170, h: 150, label: top, sub: `<b>${label}</b>${tag ? `<br><em>${tag}</em>` : ''}`, accent: i === 3 ? 'aqua' : (i === 4 ? 'orange' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .95, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2, 3].map(i => P.arrow(lines, { x1: 490 + i * 185, y1: 205, x2: 505 + i * 185, y2: 205, width: 4, color: '#1B1F24' }));
        const note = P.text({ x: 320, y: 450, w: 950, text: '유럽도 올해 8월부터 AI 생성물 표시 의무가 시작됐어요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 9, { from: 'up' });
        const final = P.text({ x: 320, y: 495, w: 950, text: '시험 채점 같은 고위험 의무는 <em>2027년 12월</em>로 미뤄졌어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10.5);
            steps.forEach((b, i) => b.on(t > .3 + i * .95));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.25 + i * .95)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '두 법의 공통점', dur: 13,
      captions: [
        { t: 0, text: '두 법은 원칙이 같아요. <em>AI가 만들었다고 알리고</em>, <em>결과물에 표시</em>하기.' },
        { t: 5, text: 'AI와 대화 중이라는 것도 알려야 하고 <em>학생 평가</em>는 한국은 고영향, EU는 고위험으로 특별 관리해요.' },
        { t: 9.5, text: '두 법 다 "알리고, 표시하고, 평가는 조심"이에요. 교실 습관으로 먼저 시작해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 310, size: 330, pose: 'wave' });
        stage.append(q.el);
        const left = P.box({ x: 340, y: 110, w: 320, h: 140, label: '한국 AI 기본법', sub: '제31조 투명성 확보 의무<br>고영향 AI: 학생 평가 포함', accent: 'aqua' });
        const right = P.box({ x: 760, y: 110, w: 320, h: 140, label: 'EU AI법', sub: '제50조 투명성 의무<br>고위험 AI: 학생 평가 포함', accent: 'orange' });
        tl.at(stage.appendChild(left.el), .3, { from: 'left' });
        tl.at(stage.appendChild(right.el), 1.1, { from: 'right' });
        const mid = P.box({ x: 540 + 10, y: 300, w: 480, h: 150, label: '공통 원칙', sub: 'AI 생성물 표시 · AI와 대화 중임을 알리기<br>학생 평가 AI는 특별 관리', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(mid.el), 3.2, { from: 'pop' });
        const arrows = [
          P.arrow(lines, { x1: 500, y1: 250, x2: 650, y2: 300, curve: 10, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 920, y1: 250, x2: 790, y2: 300, curve: -10, width: 4, color: '#F2812D' })
        ];
        const final = P.text({ x: 340, y: 500, w: 900, text: '두 법 다 "알리고, 표시하고, 평가는 조심"이에요. 교실 습관으로 먼저 시작해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.4);
            left.on(t > .3); right.on(t > 1.1); mid.on(t > 3.2);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (2.6 + i * .3)) / .6, 0, 1)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '법 시계',
    desc: '슬라이더로 <b>날짜</b>를 옮기면 그 시점에 한국과 EU에서 각각 적용 중인 항목이 바뀌어요. "오늘로(2026-10-02)" 버튼을 누르면 바로 오늘 기준으로 이동해요. 아래 "표시 고르기"에서 만든 것을 고르면 한국 시행령 보도에 나온 표시 방식을 보여 줘요. 이건 사업자 의무 기준이고 수업에서는 같은 원칙으로 표시하면 좋아요.',
    mount(el, P) {
      const KR_STEPS = [
        { at: '2025-01', text: '공포(법률 제20676호, 2025-01-21)' },
        { at: '2026-01', text: '시행 · 제31조 투명성 의무 시작(계도 기간, 최소 1년 이상)' },
        { at: '2026-07', text: '일부개정 조문 시행(2026-07-21)' }
      ];
      const EU_STEPS = [
        { at: '2024-08', text: '발효' },
        { at: '2025-02', text: '금지 관행 · AI 리터러시 조항' },
        { at: '2025-08', text: '범용 AI(GPAI) 의무' },
        { at: '2026-08', text: '제50조 투명성 의무' },
        { at: '2027-12', text: '고위험 AI 규칙(교육 포함, 디지털 옴니버스로 연기)' },
        { at: '2028-08', text: '제품 내장 고위험(부속서 I)' }
      ];
      const toIdx = s => { const [y, m] = s.split('-').map(Number); return (y - 2024) * 12 + (m - 8); };
      const MIN = 0, MAX = toIdx('2028-12'), TODAY = toIdx('2026-10');
      const idxToLabel = i => { const total = i + 8; const y = 2024 + Math.floor((total - 1) / 12); const m = ((total - 1) % 12) + 1; return `${y}-${String(m).padStart(2, '0')}`; };

      const range = P.h('input', { type: 'range', id: 'sim-month', min: String(MIN), max: String(MAX), step: '1', value: '0', 'aria-label': '날짜' });
      const dateOut = P.h('output', { for: 'sim-month' }, idxToLabel(0));
      const todayBtn = P.h('button', { type: 'button', class: 'btn primary' }, '오늘로(2026-10-02)');
      const krCard = P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-col-h' }, '한국 인공지능기본법'), P.h('div', { class: 'sim-col-b' }, ''));
      const euCard = P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-col-h' }, 'EU AI법'), P.h('div', { class: 'sim-col-b' }, ''));

      const kind = P.h('select', { id: 'sim-kind', 'aria-label': '만든 것' },
        P.h('option', { value: 'deepfake' }, '실제 인물처럼 보이는 합성 영상'),
        P.h('option', { value: 'webtoon' }, 'AI 웹툰 컷'),
        P.h('option', { value: 'chatbot' }, '학교 안내 챗봇')
      );
      const kindOut = P.h('div', { class: 'sim-kind-out' }, '');
      const fixed = P.h('div', { class: 'sim-fixed' }, '사업자 의무 기준이에요. 수업에서는 같은 원칙으로 표시해요.');

      const wrap = P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-month' }, '날짜 ', dateOut), range, todayBtn),
        P.h('div', { class: 'sim-cols' }, krCard, euCard),
        P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-kind' }, '표시 고르기 — 만든 것'), kind),
        kindOut,
        fixed
      );
      el.append(wrap, P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;font-size:13.5px}
        .sim-row label{white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 140px;min-width:100px;max-width:100%}
        .sim-row select{max-width:100%}
        output{font-family:var(--mono);color:var(--acc1);min-width:64px;display:inline-block}
        .sim-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;max-width:100%}
        .sim-col{min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff}
        .sim-col-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:6px;word-break:keep-all}
        .sim-col-b{font-size:14.5px;font-weight:700;line-height:1.5;word-break:keep-all}
        .sim-kind-out{font-size:14.5px;font-weight:700;color:var(--ink-soft);min-height:22px;word-break:keep-all}
        .sim-fixed{font-size:12.5px;color:var(--muted);font-weight:700}
      ` }));

      function render() {
        const i = +range.value;
        dateOut.textContent = idxToLabel(i);
        const krActive = KR_STEPS.filter(s => toIdx(s.at) <= i);
        const euActive = EU_STEPS.filter(s => toIdx(s.at) <= i);
        krCard.querySelector('.sim-col-b').innerHTML = krActive.length ? krActive.map(s => s.text).join('<br>') : '시행 전';
        euCard.querySelector('.sim-col-b').innerHTML = euActive.length ? euActive.map(s => s.text).join('<br>') : '발효 전';
      }
      function renderKind() {
        const v = kind.value;
        kindOut.textContent = v === 'deepfake'
          ? '가시적 워터마크 의무 — 실제와 구분하기 어려운 합성물이에요.'
          : v === 'webtoon'
            ? '디지털 워터마크(안 보이게 심는 표시) 허용 + 알림창·UI 안내도 가능해요.'
            : '사전 고지 — AI 기반으로 운용된다는 사실을 이용자에게 미리 알려야 해요.';
      }
      range.addEventListener('input', render);
      todayBtn.addEventListener('click', () => { range.value = String(TODAY); render(); });
      kind.addEventListener('change', renderKind);
      render(); renderKind();
    }
  },

  teacherLines: [
    'AI로 만든 결과물에는 <b>AI가 만들었다는 표시</b>를 붙이는 게 이제 한국과 유럽의 공통 원칙이에요.',
    '학생 평가에 쓰는 AI는 법에서 <b>특히 조심해야 할 영역</b>으로 정해 두었어요.'
  ],
  tip: {
    body: '학급 결과물(영상·포스터·글) 끝에 "AI 사용: 종류 / 쓴 곳(목소리·배경 그림 등)" 한 줄을 붙이는 습관을 들이세요. 실제 인물처럼 보이는 합성(선생님·친구 얼굴·목소리)은 수업 결과물에서 만들지 않는 편이 안전해요.',
    extra: '계도 기간은 조사·과태료를 미루는 기간이에요. 조문 자체는 2026년 1월 22일부터 시행 중이니 학교에서 쓰는 AI 서비스가 "AI 기반"임을 미리 알리는지 확인해 보세요.'
  },
  myth: {
    myth: 'AI 법은 아직 먼 이야기다.',
    fact: '한국 AI 기본법은 2026년 1월 22일부터 시행 중이고, EU AI법의 표시 의무는 2026년 8월 2일부터 적용됐어요. 미뤄진 것은 고위험 의무(EU 2027년 12월)예요.'
  },
  sources: [
    { title: '인공지능기본법 22일 시행 핵심 내용 (정책브리핑, 과학기술정보통신부, 2026-01-21)', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148958380', note: '고영향·생성형 AI 사업자의 사전 고지 의무, 딥페이크 가시적 워터마크, 최소 1년 이상의 계도 기간을 밝힌 정부 발표.' },
    { title: '인공지능 발전과 신뢰 기반 조성 등에 관한 기본법 제31조 (국가법령정보센터)', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=282791&joNo=0031&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR', note: '투명성 확보 의무 조문 원문. 사전 고지·결과물 표시·실감 합성물 고지를 규정.' },
    { title: 'Navigating the AI Act — FAQ (European Commission, 2026-08-07 갱신)', url: 'https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act', note: 'EU AI법 조항별 적용 시점(제50조 2026-08-02, 고위험 2027-12-02 등)을 정리한 집행위 공식 FAQ.' },
    { title: 'AI Act — Regulatory framework for AI (European Commission, 2026-08-03 갱신)', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', note: 'EU AI법 발효일과 전체 규제 체계를 설명하는 집행위 공식 정책 페이지.' }
  ],
  script: `학급 홍보 영상에 AI 목소리와 AI 그림, 교장 선생님처럼 보이는 합성 인사말까지 넣었다면 뭘 표시해야 할까요. 2026년부터 한국과 유럽 모두 이 답을 정해 두었어요.

한국 인공지능기본법은 2025년 1월 21일 공포, 2026년 1월 22일 시행이에요. 시행 뒤 최소 1년 이상은 계도 기간이라 사실조사는 인명사고 같은 예외적인 경우에만 하고, 7월 21일부터는 일부개정 조문도 함께 시행됐어요. 제31조 투명성 확보 의무는 미리 알리기·결과물 표시·헷갈리는 합성물은 가시적 워터마크로 고지하기의 세 단계예요. 웹툰·애니메이션 같은 창작물은 안 보이게 심는 디지털 워터마크와 알림창 안내도 허용해요. 의무를 지는 쪽은 교사가 아니라 AI 사업자예요.

유럽도 비슷해요. EU AI법은 2024년 8월 발효, 올해 8월 2일부터 제50조 투명성 의무가 적용돼서 AI와 대화 중임을 알리고 생성형 AI 결과물에 기계가 읽는 표시를 해야 해요. 시험 채점 같은 고위험 규칙은 디지털 옴니버스 개정으로 2027년 12월로 미뤄졌어요. 두 법 다 알리고, 표시하고, 학생 평가는 조심히 다루자는 같은 원칙이에요. 교실에서 먼저 같은 습관을 들이면 좋겠어요.`
};
