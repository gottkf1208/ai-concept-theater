/* S1-7 [입문] AI로 만든 건 어떻게 표시할까: AI 기본법 제31조와 C2PA */
export default {
  slug: 'v1-ai-label',
  track: 'S1',
  title: 'AI로 만든 건 어떻게 표시할까?',
  subtitle: 'AI 기본법 제31조와 C2PA 콘텐츠 자격증명',
  summary: '2026년 1월 22일 시행된 AI 기본법 제31조가 무엇을 표시하라고 하는지, 그리고 파일 안에 출처를 서명해 담는 C2PA와 보이지 않는 워터마크가 실제로 어떻게 쓰이는지 짚어요.',
  keywords: ['AI 기본법', '제31조', '투명성', '생성형 AI 표시', '딥페이크', '워터마크', 'C2PA', '콘텐츠 자격증명', 'SynthID'],

  scenes: [
    {
      title: '업로드 버튼 앞에서', dur: 13,
      captions: [
        { t: 0, text: 'AI로 만든 1분짜리 수업 영상을 학교 유튜브에 올리려던 참이에요.' },
        { t: 5, text: '문득 손이 멈춰요. <em>"이거 AI로 만들었다고 표시해야 하나?"</em>' },
        { t: 9.5, text: '이 질문, 답을 한번 찾아볼게요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 300, pose: 'think' });
        stage.append(q.el);
        const videoBox = P.box({ x: 380, y: 90, w: 380, h: 130, label: '오늘 만든 AI 영상', sub: '1분짜리 수업 영상', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(videoBox.el), .3, { from: 'down' });
        const arrow1 = P.arrow(lines, { x1: 760, y1: 155, x2: 900, y2: 155, width: 4, color: '#1B1F24' });
        const uploadBox = P.box({ x: 900, y: 90, w: 340, h: 130, label: '학교 유튜브', sub: '지금 올리려는 중', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(uploadBox.el), 1.6, { from: 'right' });
        const b = P.bubble({ x: 380, y: 470, w: 620, text: '"이거 AI로 만든 거<br><b>표시</b>해야 하나?"', tail: 'left', size: 26, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 6 && t < 9.5);
            arrow1.draw(P.clamp((t - 1) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '표시는 두 겹이에요', dur: 14,
      captions: [
        { t: 0, text: '표시는 두 겹이에요. 하나는 <em>눈에 보이는 표시</em>, 화면 라벨·자막·설명란 문구예요.' },
        { t: 5, text: '다른 하나는 <em>기계가 읽는 표시</em>예요. 파일 안에 출처를 서명해 담는 C2PA와, 픽셀·소리에 숨기는 워터마크가 있어요.' },
        { t: 10, text: '둘 다 같은 <em>AI 생성 표시</em>의 방법이에요. 상황에 맞게 같이 써요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const box1 = P.box({ x: 340, y: 130, w: 380, h: 170, label: '눈에 보이는 표시', sub: '화면 라벨 · 자막 · 설명란 문구', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        const box2 = P.box({ x: 780, y: 130, w: 380, h: 170, label: '기계가 읽는 표시', sub: '파일 속 서명 정보 · 보이지 않는 워터마크', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(box2.el), 1.8, { from: 'right' });
        const chip1 = P.chip({ x: 780, y: 320, text: 'C2PA 매니페스트', color: 'ink', size: 18 });
        const chip2 = P.chip({ x: 980, y: 320, text: '워터마크', color: 'ink', size: 18 });
        tl.at(stage.appendChild(chip1.el), 5.3, { from: 'pop' });
        tl.at(stage.appendChild(chip2.el), 5.6, { from: 'pop' });
        const note = P.text({ x: 340, y: 420, w: 820, text: '둘 다 같은 <em>AI 생성 표시</em>의 방법이에요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 10, { from: 'up' });
        return { tick(t) { q.tick(t, t > 10); } };
      }
    },
    {
      title: 'AI 기본법 제31조, 2026.1.22 시행', dur: 14,
      captions: [
        { t: 0, text: '2026년 1월 22일 시행된 AI 기본법 제31조는 AI사업자에게 세 가지를 요구해요.' },
        { t: 5, text: 'AI를 쓴다고 미리 알리기, 생성형 AI 결과물에 표시하기, 구분하기 어려운 소리·사진·영상은 <em>명확하게</em> 알리기예요.' },
        { t: 9.5, text: '딥페이크가 아닌 결과물에는 보이지 않는 워터마크도 허용했고, 과태료는 최소 1년 이상 계도기간을 둬요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 280, pose: 'point' });
        stage.append(q.el);
        const cards = [
          ['① 사전 고지', 'AI 기반 서비스라는 사실을 미리 알려요'],
          ['② 결과물 표시', '생성형 AI로 만들었다는 사실을 표시해요'],
          ['③ 딥페이크는 명확히', '구분하기 어려운 합성 결과물은 분명하게 알려요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 310, y: 90, w: 290, h: 150, label, sub, accent: i === 1 ? 'aqua' : (i === 2 ? 'orange' : 'ink'), icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const dateChip = P.chip({ x: 340, y: 280, text: '2026.1.22 시행', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(dateChip.el), 3.4, { from: 'pop' });
        const graceChip = P.chip({ x: 540, y: 280, text: '과태료 계도기간 최소 1년', color: 'ink', size: 22 });
        tl.at(stage.appendChild(graceChip.el), 9.8, { from: 'pop' });
        const note = P.text({ x: 340, y: 360, w: 920, text: '딥페이크가 아닌 결과물엔 <em>보이지 않는 워터마크</em>도 허용했어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.9, { from: 'up' });
        const small = P.text({ x: 340, y: 430, w: 920, text: '구체적인 표시 방법과 예외는 대통령령(시행령)으로 정해요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            cards.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: 'C2PA: 파일 안의 영양성분표', dur: 14,
      captions: [
        { t: 0, text: 'C2PA는 "언제, 어떤 도구로 만들고 고쳤는지"를 파일 안에 <em>서명</em>해 넣는 공개 표준이에요.' },
        { t: 5, text: '내용을 바꾸면 서명이 깨져서 변조를 알 수 있어요.' },
        { t: 9.5, text: '2026년엔 휴대폰 카메라 사진, AI 이미지, 동영상 라벨까지 쓰이는 곳이 늘었어요. 다만 <em>출처를 보여 줄 뿐 참·거짓은 판정하지 않아요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 260, pose: 'think' });
        stage.append(q.el);
        const fileBox = P.box({ x: 80, y: 120, w: 260, h: 120, label: '사진 · 영상 파일', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(fileBox.el), .3, { from: 'left' });
        const arrow1 = P.arrow(lines, { x1: 340, y1: 180, x2: 460, y2: 180, width: 4, color: '#1B1F24' });
        const manifestBox = P.box({ x: 460, y: 90, w: 400, h: 180, label: 'C2PA 매니페스트', sub: '만든 도구 · AI 생성 여부<br>편집 이력 · 서명', accent: 'aqua', icon: P.ICON.key });
        tl.at(stage.appendChild(manifestBox.el), 1.8, { from: 'pop' });
        const arrow2 = P.arrow(lines, { x1: 860, y1: 180, x2: 960, y2: 180, width: 4, color: '#127E90' });
        const checkBox = P.box({ x: 960, y: 120, w: 260, h: 120, label: '확인', sub: '서명 · 이력을 검증', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(checkBox.el), 5.2, { from: 'right' });
        const chips = ['카메라 사진', 'AI 이미지', '동영상 플랫폼 라벨'].map((t, i) => {
          const c = P.chip({ x: 80 + i * 240, y: 330, text: t, color: i === 1 ? 'orange' : 'aqua', size: 18 });
          tl.at(stage.appendChild(c.el), 9.6 + i * .3, { from: 'pop' });
          return c;
        });
        const note = P.text({ x: 80, y: 420, w: 1120, text: '다만 C2PA는 <em>출처를 보여 줄 뿐</em>, 내용이 참인지는 판정하지 않아요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.3);
            arrow1.draw(P.clamp((t - 1) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 4.6) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '우리 학교는 이렇게', dur: 13,
      captions: [
        { t: 0, text: '법의 의무 주체는 AI 서비스를 제공하는 사업자예요.' },
        { t: 4.5, text: '그래도 학교 유튜브는 사실적인 합성 장면이면 업로드할 때 공개를 체크해야 하는 플랫폼 규칙이 있어요.' },
        { t: 8.5, text: '그래서 먼저 표시해요. 화면 라벨, 설명란 문구, 제작 기록을 남기고, 도구가 넣어 준 출처 정보는 지우지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['화면 라벨 넣기', '영상 처음이나 끝에'],
          ['설명란에 문구 쓰기', '사용한 도구 · 확인한 교사'],
          ['제작 기록 남기기', '날짜 · 도구 · 검수자']
        ];
        const boxes = rows.map(([label, sub], i) => {
          const b = P.box({ x: 300, y: 90 + i * 110, w: 900, h: 90, label, sub, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), .4 + i * 1.3, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 300, y: 440, text: '출처 정보(C2PA)는 지우지 않고 그대로 올리기', color: 'ink', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 460, size: 220, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 540, w: 700, text: '의무 주체는 AI사업자지만, 학교는 <b>먼저 표시</b>해요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 8.5, { from: 'up' });
        return { tick(t) { q.tick(t, t > 8.5); } };
      }
    }
  ],

  interaction: {
    title: '표시 방법 고르기',
    desc: '무엇을 만들었고, 사실적인 장면인지, 어디까지 공개하는지 골라 보세요. 권장 표시가 바뀌어요. <b>라벨 문구 만들기</b>를 누르면 화면에 넣을 문구가 만들어져요.',
    mount(el, P) {
      const OUTPUTS = [
        { id: 'video', label: '수업용 AI 영상', noun: '영상' },
        { id: 'notice', label: 'AI 이미지가 들어간 학급 안내문', noun: '안내문 속 이미지' },
        { id: 'blog', label: 'AI 도움을 받아 쓴 블로그 글', noun: '글' }
      ];
      const SCOPES = [
        {
          id: 'class', label: '학급 안에서만',
          labelTpl: n => `${n} 일부는 AI로 만들었어요. (교사 확인함)`,
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 교사 확인"`
        },
        {
          id: 'school', label: '학교 · 학부모 공개',
          labelTpl: n => `${n} 일부는 생성형 AI로 제작했어요.`,
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 담당 교사 확인 완료"`
        },
        {
          id: 'public', label: '인터넷 공개',
          labelTpl: n => `이 ${n}의 일부는 생성형 AI로 제작되었습니다.`,
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 담당 교사 검수 완료 · 학교명"`
        }
      ];

      let outputId = 'video', scopeId = 'class', realistic = false, generated = null;
      const curOutput = () => OUTPUTS.find(o => o.id === outputId);
      const curScope = () => SCOPES.find(s => s.id === scopeId);

      const wrap = P.h('div', { class: 'sim-n6' });
      const outGroup = P.h('div', { class: 'sim-n6-group', role: 'radiogroup', 'aria-label': '무엇을 만들었나요' });
      const realGroup = P.h('div', { class: 'sim-n6-group', role: 'radiogroup', 'aria-label': '사실적인 장면인가요' });
      const scopeGroup = P.h('div', { class: 'sim-n6-group', role: 'radiogroup', 'aria-label': '어디까지 공개하나요' });
      const genBtn = P.h('button', { class: 'btn primary', type: 'button' }, '라벨 문구 만들기');
      const card = P.h('div', { class: 'sim-n6-card' });
      const labelRow = P.h('div', { class: 'sim-n6-row' });
      const realRow = P.h('div', { class: 'sim-n6-row' });
      const c2paRow = P.h('div', { class: 'sim-n6-row' });
      const recordRow = P.h('div', { class: 'sim-n6-row' });
      card.append(labelRow, realRow, c2paRow, recordRow);
      const lawNote = P.h('p', { class: 'sim-n6-note' }, '법 조문은 AI사업자의 의무예요. 학교 기준이 있으면 그 기준을 따르세요.');
      wrap.append(
        P.h('h4', { class: 'sim-n6-h' }, '무엇을 만들었나요?'), outGroup,
        P.h('h4', { class: 'sim-n6-h' }, '사실적인 장면인가요?'), realGroup,
        P.h('h4', { class: 'sim-n6-h' }, '어디까지 공개하나요?'), scopeGroup,
        P.h('div', { class: 'sim-n6-bar' }, genBtn),
        card, lawNote
      );
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-n6-h{margin:14px 0 8px;font-size:13.5px;color:var(--muted)}
        .sim-n6-h:first-child{margin-top:0}
        .sim-n6-group{display:flex;gap:8px;flex-wrap:wrap}
        .sim-n6-group button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-n6-group button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-n6-bar{margin-top:14px}
        .sim-n6-card{margin-top:16px;border:1px solid var(--line);border-radius:14px;padding:16px;background:var(--paper);display:grid;gap:14px}
        .sim-n6-row h5{margin:0 0 6px;font-size:13px;color:var(--muted);text-transform:none}
        .sim-n6-row p{margin:0;font-size:15.5px;line-height:1.6}
        .sim-n6-label-box{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}
        .sim-n6-label-box p{flex:1 1 220px;min-width:0}
        .sim-n6-placeholder{color:var(--faint);font-size:14.5px}
        .sim-n6-note{margin:16px 0 0;font-size:13px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px;line-height:1.6}
      ` });
      el.append(style);

      const copyText = t => { try { navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {}); } catch (e) {} };

      const realisticNote = () => {
        if (!realistic) return '사실적인 장면이 아니면(애니메이션 등) 설명란 표시로 충분해요.';
        if (scopeId === 'public') return 'YouTube에 올릴 때는 "변경되거나 합성된 콘텐츠" 공개를 체크해요.';
        return '사실적인 장면이면 이용자가 명확히 알 수 있게 더 분명하게 표시해요.';
      };

      const render = () => {
        outGroup.replaceChildren(...OUTPUTS.map(o => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': o.id === outputId ? 'true' : 'false' }, o.label);
          b.addEventListener('click', () => { outputId = o.id; generated = null; render(); });
          return b;
        }));
        realGroup.replaceChildren(...[['아니오', false], ['예', true]].map(([label, val]) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': realistic === val ? 'true' : 'false' }, label);
          b.addEventListener('click', () => { realistic = val; generated = null; render(); });
          return b;
        }));
        scopeGroup.replaceChildren(...SCOPES.map(s => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': s.id === scopeId ? 'true' : 'false' }, s.label);
          b.addEventListener('click', () => { scopeId = s.id; generated = null; render(); });
          return b;
        }));

        const scope = curScope(), output = curOutput();

        labelRow.replaceChildren(
          P.h('h5', {}, '보이는 라벨 문구'),
          generated
            ? P.h('div', { class: 'sim-n6-label-box' },
                P.h('p', {}, `"${generated}"`),
                P.h('button', { class: 'btn small', type: 'button', onclick: () => copyText(generated) }, '복사'))
            : P.h('p', { class: 'sim-n6-placeholder' }, '위에서 고르고 "라벨 문구 만들기"를 눌러 보세요.')
        );
        realRow.replaceChildren(P.h('h5', {}, '실제처럼 보이나요'), P.h('p', {}, realisticNote()));
        c2paRow.replaceChildren(P.h('h5', {}, '기계가 읽는 표시 (C2PA)'), P.h('p', {}, '도구가 넣어 준 콘텐츠 자격증명을 지우지 않고 올려요.'));
        recordRow.replaceChildren(P.h('h5', {}, '제작 기록'), P.h('p', {}, scope.record(output.noun)));
      };
      genBtn.addEventListener('click', () => { generated = curScope().labelTpl(curOutput().noun); render(); });
      render();
    }
  },

  teacherLines: [
    'AI로 만든 걸 알리는 방법은 <b>눈에 보이는 라벨</b>과 <b>파일 안의 출처 정보</b>, 두 겹이에요.',
    '진짜처럼 보이는 AI 사진이나 영상일수록 <b>더 분명하게</b> 알려야 해요.'
  ],
  tip: {
    body: '학급·학교 채널에 올리는 AI 영상은 화면 첫 장면이나 끝 장면에 "이 영상의 일부는 생성형 AI로 만들었어요"를 넣고, 설명란에 사용한 도구와 확인한 교사를 적어 두세요. 사실적인 장면이 있으면 업로드 화면의 합성 콘텐츠 공개도 체크해요.',
    extra: 'AI 도구가 내보낸 원본 파일에는 출처 정보(C2PA)가 들어 있을 수 있어요. 화면 캡처로 다시 저장하지 말고 원본 파일을 편집·업로드하면 출처 정보가 남을 가능성이 커요.'
  },
  myth: {
    myth: '워터마크는 그림 위에 비치는 로고나 글씨를 말한다.',
    fact: '눈에 보이는 표시 말고도, 파일 안에 서명된 출처 정보(C2PA)나 픽셀·소리에 숨긴 보이지 않는 워터마크가 있어요. AI 기본법 시행 내용도 딥페이크가 아닌 결과물에는 보이지 않는 워터마크를 허용했어요.'
  },
  sources: [
    { title: '국가법령정보센터 — 인공지능 발전과 신뢰 기반 조성 등에 관한 기본법 제31조', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=282791&joNo=0031&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR', note: '사전 고지·결과물 표시·딥페이크 명확 표시 조문 원문.' },
    { title: "정책브리핑 — '인공지능기본법' 22일 시행…생성형 AI 결과물 '워터마크' 표시 의무 (2026)", url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148958380', note: '비가시 워터마크 허용 범위와 최소 1년 이상 계도기간.' },
    { title: 'C2PA 기술 명세 2.2', url: 'https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html', note: '매니페스트·하드/소프트 바인딩 정의, 출처 데이터는 참·거짓을 판정하지 않는다는 원칙.' },
    { title: 'YouTube 고객센터 — 변경되거나 합성된 콘텐츠 공개', url: 'https://support.google.com/youtube/answer/14328491', note: '공개 대상과 예외, C2PA 메타데이터가 있으면 라벨을 자동으로 붙일 수 있음.' }
  ],
  script: `AI로 만든 1분짜리 수업 영상을 올리려다 손이 멈췄어요. 이거 AI로 만들었다고 표시해야 하나 싶었거든요.

표시는 두 겹이에요. 화면 라벨·자막·설명란 같은 눈에 보이는 표시, 그리고 파일 안에 출처를 서명하는 C2PA와 보이지 않는 워터마크예요. 2026년 1월 22일 시행된 AI 기본법 제31조는 AI사업자에게 미리 알리기, 결과물 표시하기, 구분하기 어려운 소리·사진·영상은 명확히 알리기를 요구해요.

C2PA는 언제 어떤 도구로 만들고 고쳤는지를 파일에 서명해 담는 표준이에요. 내용을 바꾸면 서명이 깨져 변조를 알 수 있지만, 출처를 보여 줄 뿐 참·거짓은 판정하지 않아요.

법의 의무 주체는 AI사업자지만, 학교 유튜브는 사실적인 합성 장면이면 공개를 체크해야 해요. 그래서 먼저 화면 라벨과 설명란에 표시하고, 출처 정보는 지우지 않고 올려요.`
};
