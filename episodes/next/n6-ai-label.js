/* N6 [B] AI가 만들었다고 표시하는 법: AI 생성 표시와 워터마크 */
export default {
  slug: 'n6-ai-label',
  track: 'B',
  title: 'AI가 만들었다고 표시하는 법',
  subtitle: 'AI 생성 표시와 워터마크',
  summary: '눈에 보이는 라벨과 보이지 않는 워터마크·출처 정보, 그리고 2026년 1월에 시행된 국내 법 조항까지 AI 생성물 표시 방법을 짚어봐요.',
  keywords: ['AI 생성 표시', '워터마크', 'C2PA', 'AI 기본법'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '오늘 AI로 짧은 영상을 만들어서, 학교 유튜브에 올리려던 참이에요.' },
        { t: 5, text: '업로드 버튼 앞에서 문득, <em>"이거 AI로 만든 거 표시해야 하나?"</em> 싶었어요.' },
        { t: 9.5, text: '오늘은 그 답을 같이 찾아봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 300, pose: 'think' });
        stage.append(q.el);
        const videoBox = P.box({ x: 380, y: 90, w: 380, h: 130, label: '오늘 만든 AI 영상', sub: '짧은 수업 영상', accent: 'ink', icon: P.ICON.video });
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
      title: '두 가지 표시', dur: 14,
      captions: [
        { t: 0, text: 'AI 생성 표시에는 크게 두 가지 방법이 있어요.' },
        { t: 5, text: '<em>눈에 보이는 표시</em> — 화면 라벨, 자막, 설명란 문구예요.' },
        { t: 10, text: '<em>보이지 않는 표시</em> — 파일 안에 출처 정보나 워터마크를 심는 방식이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const box1 = P.box({ x: 340, y: 130, w: 380, h: 170, label: '눈에 보이는 표시', sub: '화면 라벨 · 자막 · 설명란 문구', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        const box2 = P.box({ x: 780, y: 130, w: 380, h: 170, label: '보이지 않는 표시', sub: '파일 속 출처 정보 · 워터마크', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(box2.el), 1.8, { from: 'right' });
        const note = P.text({ x: 340, y: 350, w: 820, text: '둘 다 <em>AI 생성 표시</em>의 방법이에요. 상황에 맞게 같이 써요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 10, { from: 'up' });
        return { tick(t) { q.tick(t, t > 10); } };
      }
    },
    {
      title: 'C2PA', dur: 14,
      captions: [
        { t: 0, text: '보이지 않는 표시의 대표적인 방법이 <em>C2PA</em>예요.' },
        { t: 5, text: '언제, 어떤 도구로 만들고 편집했는지 <em>출처와 이력</em>을 파일에 서명해 담는 공개 표준이에요.' },
        { t: 10, text: '지원하는 도구·플랫폼에서 확인할 수 있어요. <em>모든 곳이 지원하진 않아요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 260, pose: 'tablet' });
        stage.append(q.el);
        const fileBox = P.box({ x: 80, y: 120, w: 280, h: 120, label: '사진 · 영상 파일', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(fileBox.el), .3, { from: 'left' });
        const arrow1 = P.arrow(lines, { x1: 360, y1: 180, x2: 460, y2: 180, width: 4, color: '#1B1F24' });
        const c2paBox = P.box({ x: 460, y: 110, w: 360, h: 150, label: 'C2PA 서명', sub: '출처 + 편집 이력을 파일에 담아요', accent: 'aqua', icon: P.ICON.key });
        tl.at(stage.appendChild(c2paBox.el), 1.8, { from: 'pop' });
        const arrow2 = P.arrow(lines, { x1: 820, y1: 185, x2: 920, y2: 185, width: 4, color: '#127E90' });
        const platBox = P.box({ x: 920, y: 110, w: 280, h: 150, label: '지원 플랫폼에서 확인', sub: '도구마다 달라요', accent: 'orange', icon: P.ICON.eye });
        tl.at(stage.appendChild(platBox.el), 5.2, { from: 'right' });
        const note = P.text({ x: 80, y: 320, w: 1120, text: '공개 표준이지만, <em>모든 도구 · 플랫폼이 지원하진 않아요</em>.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            arrow1.draw(P.clamp((t - 1) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 4.4) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '법: 확인해요', dur: 13,
      captions: [
        { t: 0, text: '우리나라는 <em>AI 기본법</em> 제31조에서 AI 생성물 표시를 정하고 있어요.' },
        { t: 5, text: '2026년 1월 22일부터 <em>시행</em> 중이에요.' },
        { t: 9.5, text: '<em>무엇을 어떻게</em> 표시할지 세부 기준은 시행령 · 고시로 정해요. 최신 고시를 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const lawBox = P.box({ x: 340, y: 110, w: 600, h: 140, label: 'AI 기본법 제31조', sub: '생성형 AI 결과물에 AI 생성 사실 표시', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(lawBox.el), .3, { from: 'down' });
        const dateChip = P.chip({ x: 340, y: 270, text: '2026.1.22 시행', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(dateChip.el), 3, { from: 'pop' });
        const ruleBox = P.box({ x: 340, y: 340, w: 600, h: 130, label: '세부 기준: 시행령 · 고시', sub: '무엇을 어떻게 표시할지는 여기서 정해요', accent: 'orange', icon: P.ICON.search });
        tl.at(stage.appendChild(ruleBox.el), 6, { from: 'up' });
        const b = P.bubble({ x: 340, y: 500, w: 600, text: '단정하지 말고, <b>최신 고시</b>를 확인해요.', tail: 'left', size: 24, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.5, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9.5); } };
      }
    },
    {
      title: '할 일', dur: 13,
      captions: [
        { t: 0, text: '그래서 우리는 <em>먼저 표시하기</em>로 했어요.' },
        { t: 5, text: '화면 라벨 + 설명란 문구 + <em>제작 기록</em>(CREDITS.md 같은 파일), 이 세 가지예요.' },
        { t: 9, text: '이 극장도 사이트 하단과 <em>CREDITS.md</em>에 표시해 두었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['화면 라벨 넣기', 110],
          ['설명란에 문구 쓰기', 250],
          ['제작 기록 남기기 (CREDITS.md처럼)', 390]
        ];
        const boxes = rows.map(([label, y], i) => {
          const bx = P.box({ x: 300, y, w: 900, h: 110, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(bx.el), .4 + i * 1.6, { from: 'up' });
          return bx;
        });
        const q = P.quokka({ x: 40, y: 460, size: 220, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 540, w: 640, text: '이 극장도 사이트 하단과 <b>CREDITS.md</b>에 표시해 뒀어요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9); } };
      }
    }
  ],

  interaction: {
    title: '표시 방법 고르기',
    desc: '무엇을 만들었고, 어디까지 공개하는지 골라 보세요. 권장 표시가 바뀌어요. <b>라벨 문구 만들기</b>를 누르면 화면에 넣을 문구가 만들어져요.',
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
          c2pa: '선택 사항이에요 — 도구가 지원하면 켜 둬도 좋아요.',
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 교사 확인"`
        },
        {
          id: 'school', label: '학교 · 학부모 공개',
          labelTpl: n => `${n} 일부는 생성형 AI로 제작했어요.`,
          c2pa: '켜기를 권장해요 — 지원하는 도구라면요.',
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 담당 교사 확인 완료"`
        },
        {
          id: 'public', label: '인터넷 공개',
          labelTpl: n => `이 ${n}의 일부는 생성형 AI로 제작되었습니다.`,
          c2pa: '켜기를 권장해요 — 지원하는 도구 · 플랫폼에서 확인해요.',
          record: n => `제작 기록 예시: "2026-00-00 · ${n} 제작에 OO 도구 사용 · 담당 교사 검수 완료 · 학교명"`
        }
      ];

      let outputId = 'video', scopeId = 'class', generated = null;
      const curOutput = () => OUTPUTS.find(o => o.id === outputId);
      const curScope = () => SCOPES.find(s => s.id === scopeId);

      const wrap = P.h('div', { class: 'sim-n6' });
      const outGroup = P.h('div', { class: 'sim-n6-group', role: 'radiogroup', 'aria-label': '무엇을 만들었나요' });
      const scopeGroup = P.h('div', { class: 'sim-n6-group', role: 'radiogroup', 'aria-label': '어디까지 공개하나요' });
      const genBtn = P.h('button', { class: 'btn primary', type: 'button' }, '라벨 문구 만들기');
      const card = P.h('div', { class: 'sim-n6-card' });
      const labelRow = P.h('div', { class: 'sim-n6-row' });
      const c2paRow = P.h('div', { class: 'sim-n6-row' });
      const recordRow = P.h('div', { class: 'sim-n6-row' });
      card.append(labelRow, c2paRow, recordRow);
      const lawNote = P.h('p', { class: 'sim-n6-note' }, '법 조항이 실제로 적용되는지는 상황마다 달라요. 문구를 정하기 전에 국가법령정보센터에서 최신 고시를 확인하세요.');
      wrap.append(
        P.h('h4', { class: 'sim-n6-h' }, '무엇을 만들었나요?'), outGroup,
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

      const render = () => {
        outGroup.replaceChildren(...OUTPUTS.map(o => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': o.id === outputId ? 'true' : 'false' }, o.label);
          b.addEventListener('click', () => { outputId = o.id; generated = null; render(); });
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
        c2paRow.replaceChildren(P.h('h5', {}, '보이지 않는 표시 (C2PA)'), P.h('p', {}, scope.c2pa));
        recordRow.replaceChildren(P.h('h5', {}, '제작 기록'), P.h('p', {}, scope.record(output.noun)));
      };
      genBtn.addEventListener('click', () => { generated = curScope().labelTpl(curOutput().noun); render(); });
      render();
    }
  },

  teacherLines: [
    'AI로 만든 콘텐츠라는 걸 알리는 방법에는 <b>눈에 보이는 표시</b>와 <b>보이지 않는 표시</b> 두 가지가 있어요.',
    '2026년 1월부터 이런 표시를 <b>법으로도</b> 요구하고 있어요. 세부 기준은 고시를 확인해요.'
  ],
  tip: {
    body: '우리 산출물에는 CREDITS.md와 사이트 하단에 "AI로 생성했다"는 표시를 먼저 넣어 두었어요. 세부 기준은 시행령·고시로 정해지니 최신 공지를 확인하는 습관이 필요해요.',
    extra: '공개 범위가 넓어질수록(학급 안 → 학교·학부모 → 인터넷) 표시는 더 분명하게 하는 편이 안전해요.'
  },
  myth: {
    myth: '워터마크는 그림에 비치는 글씨나 로고만을 뜻한다.',
    fact: '눈에 보이는 표시 말고도, 파일 안에 "이 이미지는 AI로 만들었다"는 정보를 심어 두는 보이지 않는 방식(C2PA 같은 출처 표준)도 있어요. 둘 다 AI 생성 표시의 한 방법이에요.'
  },
  sources: [
    { title: 'C2PA — Coalition for Content Provenance and Authenticity', url: 'https://c2pa.org/', note: '파일 안에 제작 출처 정보를 심어 두는 보이지 않는 표시 표준.' },
    { title: '국가법령정보센터', url: 'https://www.law.go.kr/', note: '"인공지능 발전과 신뢰 기반 조성 등에 관한 기본법"으로 검색해 제31조(AI 생성물 표시)를 확인하세요.' }
  ],
  script: `AI로 영상이나 이미지를 만들었을 때, 그걸 어떻게 표시해야 할까요. 크게 두 가지 방법이 있어요.

하나는 눈에 보이는 표시예요. 화면 한쪽에 "AI로 생성함"이라는 글자나 로고를 넣는 방식이죠. 다른 하나는 보이지 않는 표시예요. 파일 안에 이 콘텐츠가 AI로 만들어졌다는 출처와 편집 이력을 심어 두는 거예요. C2PA라는 공개 표준이 이런 역할을 해요. 다만 지원하는 도구·플랫폼에서만 확인할 수 있고, 모든 곳이 지원하진 않아요.

우리나라는 2026년 1월 22일 시행된 AI 기본법 제31조에서, 생성형 AI 결과물에 AI로 만들었다는 사실을 표시하도록 정하고 있어요. 다만 무엇을 어떻게 표시할지 세부 기준은 시행령과 고시로 정해지니, 단정하기보다 국가법령정보센터에서 최신 내용을 확인하는 게 좋아요.

그래서 우리는 일단 먼저 표시하기로 했어요. 화면 라벨과 설명란 문구, 그리고 CREDITS.md 같은 제작 기록까지요. 이 극장도 사이트 하단과 CREDITS.md에 표시를 넣어 두었어요.`
};
