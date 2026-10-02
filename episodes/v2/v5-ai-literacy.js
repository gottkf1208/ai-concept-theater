/* S5-37 [v5-ai-literacy] AI 리터러시, 교실에서 무엇부터 가르칠까 */
export default {
  slug: 'v5-ai-literacy',
  track: 'S5',
  title: 'AI 리터러시, 교실에서 무엇부터 가르칠까',
  subtitle: 'UNESCO AI 역량틀과 OECD·EC AILit 프레임워크',
  summary: '학교 AI 교육 계획이 "도구 사용법"으로만 채워져 있다면 무엇이 빠졌을까요? UNESCO 학생·교사 AI 역량틀과 2026년 6월 확정된 OECD·EC AILit 프레임워크의 네 영역(Engage·Create·Manage·Shape)으로 수업 지도를 그려 봐요.',
  keywords: ['AI 리터러시', 'AI 역량', 'UNESCO', '학생 AI 역량틀', '교사 AI 역량틀', 'AILit', 'OECD', '유럽연합 집행위원회', 'Engage with AI', 'Create with AI', 'Manage AI', 'Shape AI', 'PISA 2029'],

  scenes: [
    {
      title: '사용법으로만 채워진 계획표', dur: 14,
      captions: [
        { t: 0, text: '우리 학교 AI 교육 계획표를 보면 1차시는 챗봇 가입, 2차시는 프롬프트 쓰기, 3차시는 그림 만들기로 채워져 있어요.' },
        { t: 5.5, text: '그런데 <em>판단</em>은 언제 가르치고, <em>윤리</em>는 언제 다루고, AI를 <em>안 써야 할 때</em>는 언제 가르칠까요?' },
        { t: 10, text: '계획표가 사용법으로만 채워졌다면, 무엇이 빠진 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const steps = [
          ['1차시', '챗봇 가입'],
          ['2차시', '프롬프트 쓰기'],
          ['3차시', '그림 만들기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 300, y: 110, w: 270, h: 130, label, sub, accent: '', icon: P.ICON.desk });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const qs = [
          ['판단은?', 330], ['윤리는?', 560], ['언제 안 쓰지?', 790]
        ].map(([t, x], i) => {
          const c = P.chip({ x, y: 300, text: t, color: 'orange', size: 22 });
          tl.at(stage.appendChild(c.el), 4.6 + i * .5, { from: 'pop' });
          return c;
        });
        const final = P.text({ x: 340, y: 380, w: 860, text: '계획표가 <em>사용법</em>으로만 채워졌어요. 무엇이 빠졌을까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            steps.forEach((b, i) => b.on(t > .3 + i * .8));
          }
        };
      }
    },
    {
      title: 'UNESCO 학생 역량틀', dur: 14,
      captions: [
        { t: 0, text: '2024년 유네스코는 학생용 AI 역량틀을 발표했어요. 네 차원을 세 단계로 키워요.' },
        { t: 5.5, text: '인간 중심 사고방식, AI 윤리, AI 기법과 응용, AI 시스템 설계를 <em>이해</em> → <em>적용</em> → <em>창조</em> 순으로 키워요.' },
        { t: 10, text: '기술만이 아니라 사람 중심과 윤리가 같은 무게로 들어가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const dims = [
          ['인간 중심 사고방식', '이해 → 적용 → 창조', 'aqua'],
          ['AI 윤리', '이해 → 적용 → 창조', 'orange'],
          ['AI 기법과 응용', '이해 → 적용 → 창조', ''],
          ['AI 시스템 설계', '이해 → 적용 → 창조', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340, y: 110 + i * 105, w: 860, h: 90, label, sub, accent: acc, icon: P.ICON.brain });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'left' });
          return b;
        });
        const counter = P.text({ x: 1040, y: 660, w: 1, text: '', size: 1 });
        const final = P.text({ x: 340, y: 590, w: 860, text: '네 차원 × 세 단계 = <em>12개 역량</em>이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 5.5 && t < 10));
            dims.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '선생님에게도 틀이 있어요', dur: 13,
      captions: [
        { t: 0, text: '교사용 틀은 다섯 차원이에요. <em>AI 교수법</em>과 <em>전문성 학습</em>이 따로 들어 있어요.' },
        { t: 5, text: '단계는 <em>습득</em> → <em>심화</em> → <em>창조</em>예요. AI로 가르치는 법과 교사 자신의 배움이 같이 들어가요.' },
        { t: 9, text: '다섯 차원을 세 단계로 키우면 열다섯 역량이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 310, pose: 'oops' });
        stage.append(q.el);
        const dims = [
          ['인간 중심 사고방식', '습득 → 심화 → 창조', ''],
          ['AI 윤리', '습득 → 심화 → 창조', ''],
          ['AI 기초와 응용', '습득 → 심화 → 창조', ''],
          ['AI 교수법', '습득 → 심화 → 창조', 'orange'],
          ['전문성 학습을 위한 AI', '습득 → 심화 → 창조', 'aqua']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340, y: 100 + i * 100, w: 860, h: 86, label, sub, accent: acc, icon: P.ICON.brain });
          tl.at(stage.appendChild(b.el), .3 + i * .75, { from: 'left' });
          return b;
        });
        const final = P.text({ x: 340, y: 600, w: 860, text: '다섯 차원 × 세 단계 = <em>15개 역량</em>이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            dims.forEach((b, i) => b.on(t > .3 + i * .75));
          }
        };
      }
    },
    {
      title: '2026년 AILit 네 영역', dur: 14,
      captions: [
        { t: 0, text: '2026년 6월 유럽연합 집행위원회와 OECD가 AILit 틀 확정판을 내놨어요.' },
        { t: 5, text: '<em>Engage</em>(알아보고 판단하기) · <em>Create</em>(함께 만들기) · <em>Manage</em>(쓸지 말지 관리하기) · <em>Shape</em>(사람 가치로 더 낫게 만들기)예요.' },
        { t: 10, text: '100개국 넘는 곳에서 2,000명 넘게 의견을 모았고, PISA 2029 평가에도 연결돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const quads = [
          ['Engage with AI', 'AI 알아보고 판단하기', 'aqua', P.ICON.eye],
          ['Create with AI', 'AI와 함께 만들기', 'ink', P.ICON.doc],
          ['Manage AI', 'AI 사용을 결정·관리하기', 'orange', P.ICON.key],
          ['Shape AI', '사람 가치로 AI를 더 낫게', '', P.ICON.brain]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340 + (i % 2) * 450, y: 100 + Math.floor(i / 2) * 170, w: 420, h: 150, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'pop' });
          return b;
        });
        const chips = [
          ['2026-06-18 확정', 340], ['100개국 넘는 곳, 2,000명 넘게 의견', 560], ['PISA 2029와 연결', 940]
        ].map(([t, x], i) => {
          const c = P.chip({ x, y: 600, text: t, color: i === 2 ? 'aqua' : 'gray', size: 19 });
          tl.at(stage.appendChild(c.el), 4.2 + i * .5, { from: 'pop' });
          return c;
        });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 10);
            quads.forEach((b, i) => b.on(t > .3 + i * .8));
          }
        };
      }
    },
    {
      title: '이 극장을 지도에 꽂으면', dur: 13,
      captions: [
        { t: 0, text: '이 극장의 편들을 네 영역에 꽂아 보면, 사용법은 <em>Create</em> 한 칸뿐이에요.' },
        { t: 4.5, text: 'Engage는 할루시네이션·업스케일 편, Manage는 학생 개인정보·AI 채점 편, Shape는 모델 붕괴·AI 법 편이에요.' },
        { t: 8.5, text: '네 칸을 고루 채우는 게 AI 리터러시예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const quads = [
          ['Engage', '4편 할루시네이션 · 26편 업스케일', 'aqua', P.ICON.eye],
          ['Create', '3편 질문의 네 조각 · 13편 모션 프롬프트', 'ink', P.ICON.doc],
          ['Manage', '8편 학생 개인정보 · 36편 AI 채점', 'orange', P.ICON.key],
          ['Shape', '33편 모델 붕괴 · 38편 AI 법', '', P.ICON.brain]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 100 + Math.floor(i / 2) * 160, w: 370, h: 140, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 440, w: 770, text: '사용법은 <em>Create</em> 한 칸이에요. 네 칸을 고루 채워요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            quads.forEach((b, i) => b.on(t > .3 + i * .8));
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 수업 AILit 지도',
    desc: '수업 활동 10개 중 하는 것을 체크해 보세요. 각 활동은 <b>Engage·Create·Manage·Shape</b> 네 영역 중 하나에 연결돼요. "예시 학기 채우기"를 누르면 네 영역을 고르게 채운 예시가 들어가요. 활동과 영역 연결은 연구회 예시예요. 영역 이름은 2026년 확정판 기준이에요.',
    mount(el, P) {
      const ACTS = [
        { t: 'AI 답에서 틀린 곳 찾기', area: 'engage', stage: '적용' },
        { t: 'AI 그림 프롬프트 고쳐 쓰기', area: 'create', stage: '적용' },
        { t: 'AI 써도 되는 단계 정하기', area: 'manage', stage: '이해' },
        { t: 'AI 생성물 표시 붙이기', area: 'manage', stage: '적용' },
        { t: '데이터 편향 실험해 보기', area: 'shape', stage: '창조' },
        { t: 'AI 없이 먼저 써 보고 비교하기', area: 'engage', stage: '이해' },
        { t: '챗봇과 대화해 글쓰기 연습', area: 'create', stage: '이해' },
        { t: 'AI 답변 출처 확인하기', area: 'engage', stage: '적용' },
        { t: 'AI 사용 후기 학급 회의로 정리', area: 'shape', stage: '적용' },
        { t: '교실 AI 사용 규칙 함께 만들기', area: 'manage', stage: '창조' }
      ];
      const AREA_LABEL = { engage: 'Engage', create: 'Create', manage: 'Manage', shape: 'Shape' };
      const AREAS = ['engage', 'create', 'manage', 'shape'];
      const PRESET = [0, 1, 2, 4, 5, 9]; // 예시 학기: 네 영역을 고르게

      const checked = ACTS.map(() => false);

      const list = P.h('div', { class: 'sim-list' });
      const rows = ACTS.map((a, i) => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-a${i}` });
        const tag = P.h('span', { class: `sim-tag sim-${a.area}` }, AREA_LABEL[a.area]);
        const stageTag = P.h('span', { class: 'sim-stage' }, a.stage);
        const row = P.h('label', { class: 'sim-row', for: `sim-a${i}` }, cb, P.h('span', { class: 'sim-row-t' }, a.t), tag, stageTag);
        list.append(row);
        return { cb, row, stageTag };
      });

      const bars = {};
      const barWrap = P.h('div', { class: 'sim-bars' });
      AREAS.forEach(a => {
        const fill = P.h('i', {});
        const meter = P.h('div', { class: 'sim-bmeter' }, fill);
        const val = P.h('div', { class: 'sim-bval' }, '0');
        const card = P.h('div', { class: `sim-bcard sim-${a}` }, P.h('div', { class: 'sim-bh' }, AREA_LABEL[a]), meter, val);
        barWrap.append(card);
        bars[a] = { fill, val };
      });

      const miss = P.h('div', { class: 'sim-miss' }, '');
      const warn = P.h('div', { class: 'sim-warn' }, '');
      const stageRow = P.h('div', { class: 'sim-stagerow' }, '');

      const presetBtn = P.h('button', { class: 'btn primary', type: 'button' }, '예시 학기 채우기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const bar = P.h('div', { class: 'sim-toolbar' }, presetBtn, resetBtn);

      el.append(P.h('div', { class: 'sim-wrap' },
        bar,
        list,
        barWrap,
        miss,
        warn,
        P.h('div', { class: 'sim-stagelab' }, '고른 활동의 UNESCO 학생 틀 단계'),
        stageRow
      ));

      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-toolbar{display:flex;gap:10px;flex-wrap:wrap}
        .sim-list{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:#fff;cursor:pointer;max-width:100%}
        .sim-row-t{flex:1 1 160px;min-width:0;font-size:14px;word-break:keep-all}
        .sim-tag{font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;white-space:nowrap}
        .sim-tag.sim-engage{background:color-mix(in srgb,#127E90 14%,white);color:#127E90}
        .sim-tag.sim-create{background:#1B1F24;color:#fff}
        .sim-tag.sim-manage{background:color-mix(in srgb,#F2812D 16%,white);color:#F2812D}
        .sim-tag.sim-shape{background:#E9ECEF;color:#495057}
        .sim-stage{font-size:11px;color:var(--muted);white-space:nowrap}
        .sim-bars{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;max-width:100%}
        .sim-bcard{border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff;min-width:0}
        .sim-bh{font-size:13px;font-weight:700;margin-bottom:6px}
        .sim-bmeter{height:8px;border-radius:999px;background:var(--paper);overflow:hidden}
        .sim-bmeter i{display:block;height:100%;width:0%;background:var(--acc1);transition:width .3s}
        .sim-bcard.sim-engage .sim-bmeter i{background:#127E90}
        .sim-bcard.sim-create .sim-bmeter i{background:#1B1F24}
        .sim-bcard.sim-manage .sim-bmeter i{background:#F2812D}
        .sim-bcard.sim-shape .sim-bmeter i{background:#9AA5AF}
        .sim-bval{font-family:var(--mono);font-size:12px;color:var(--muted);margin-top:4px}
        .sim-miss{font-size:13px;color:var(--muted)}
        .sim-warn{font-size:13px;font-weight:700;color:#F2812D;min-height:18px}
        .sim-stagelab{font-size:12px;color:var(--muted);margin-top:4px}
        .sim-stagerow{display:flex;gap:6px;flex-wrap:wrap;min-height:22px}
        .sim-schip{font-size:11px;padding:3px 8px;border-radius:999px;background:var(--paper);color:var(--muted)}
        `
      }));

      function render() {
        const counts = { engage: 0, create: 0, manage: 0, shape: 0 };
        ACTS.forEach((a, i) => { if (checked[i]) counts[a.area]++; });
        AREAS.forEach(a => {
          const pct = Math.round((counts[a] / ACTS.length) * 100);
          bars[a].fill.style.width = pct + '%';
          bars[a].val.textContent = `${counts[a]}개`;
        });
        const empty = AREAS.filter(a => counts[a] === 0);
        miss.textContent = empty.length ? `빠진 영역: ${empty.map(a => AREA_LABEL[a]).join(', ')}` : '네 영역을 모두 채웠어요.';
        warn.textContent = empty.length >= 2 ? '사용법 위주예요.' : '';
        stageRow.innerHTML = '';
        ACTS.forEach((a, i) => {
          if (!checked[i]) return;
          stageRow.append(P.h('span', { class: 'sim-schip' }, `${a.t.length > 10 ? a.t.slice(0, 10) + '…' : a.t} · ${a.stage}`));
        });
      }
      rows.forEach((r, i) => r.cb.addEventListener('change', () => { checked[i] = r.cb.checked; render(); }));
      presetBtn.addEventListener('click', () => {
        checked.forEach((_, i) => { checked[i] = false; rows[i].cb.checked = false; });
        PRESET.forEach(i => { checked[i] = true; rows[i].cb.checked = true; });
        render();
      });
      resetBtn.addEventListener('click', () => {
        checked.forEach((_, i) => { checked[i] = false; rows[i].cb.checked = false; });
        render();
      });
      render();
    }
  },

  teacherLines: [
    'AI 리터러시는 <b>쓰는 법</b>만이 아니라 <b>언제 안 쓸지 정하는 힘</b>까지예요.',
    'AI를 <b>알아보고, 함께 만들고, 관리하고, 더 낫게 바꾸는</b> 네 가지를 골고루 해 봐요.'
  ],
  tip: {
    body: '학기 수업 계획표에 Engage·Create·Manage·Shape 네 열을 만들고, 차시마다 해당 칸에 표시해 보세요. 빈 열이 바로 보강할 곳이에요. 사용법 차시 하나마다 "AI 없이 먼저 해 보기"나 "AI 답 검증하기" 차시를 짝지으면 균형이 맞아요.',
    extra: '교사 연수 계획은 UNESCO 교사용 틀의 다섯 차원(특히 AI 교수법·전문성 학습)으로 점검하면 빠진 영역이 보여요.'
  },
  myth: {
    myth: 'AI 리터러시는 프롬프트를 잘 쓰는 능력이다.',
    fact: '프롬프트는 Create 영역의 일부예요. 2026년 AILit 틀은 AI를 알아보고 판단하기, 쓸지 말지 결정하기, 더 낫게 만들기까지 네 영역을 함께 요구해요.'
  },
  sources: [
    { title: 'AI competency framework for students (UNESCO, 2024)', url: 'https://www.unesco.org/en/articles/ai-competency-framework-students', note: '학생용 AI 역량틀. 인간 중심 사고방식·AI 윤리·AI 기법과 응용·AI 시스템 설계 네 차원을 이해·적용·창조 세 단계로 키워 12개 역량.' },
    { title: 'AI competency framework for teachers (UNESCO, 2024)', url: 'https://www.unesco.org/en/articles/ai-competency-framework-teachers', note: '교사용 AI 역량틀. 다섯 차원(AI 교수법·전문성 학습 포함)을 습득·심화·창조 세 단계로 키워 15개 역량.' },
    { title: 'Empowering Learners for the Age of AI: Presenting the Finalised AI Literacy Framework (AILit, 2026-06-18)', url: 'https://ailiteracyframework.org/blog/empowering-learners-for-the-age-of-ai-literacy-framework/', note: '2026년 6월 18일 공개된 AILit 확정판. Engage·Create·Manage·Shape 네 영역.' },
    { title: 'Launch of the EU-OECD AI Literacy Framework for primary and secondary education (European Commission, 2026-06-19)', url: 'https://ec.europa.eu/newsroom/eacea_oep/items/944140/', note: '100개국 넘는 곳의 2,000명 넘는 의견 수렴, PISA 2029 혁신 영역 연계를 알리는 유럽연합 집행위원회 발표.' }
  ],
  script: `우리 학교 AI 교육 계획표는 챗봇 가입, 프롬프트 쓰기, 그림 만들기처럼 사용법 위주예요. 판단과 윤리, AI를 안 써야 할 때는 언제 가르칠까요.

2024년 유네스코 학생용 틀은 인간 중심, AI 윤리, 기법과 응용, 시스템 설계 네 차원을 이해·적용·창조로 키워 12개 역량이에요. 교사용 틀은 다섯 차원 열다섯 역량으로, AI 교수법과 전문성 학습이 따로 있어요.

2026년 6월 유럽연합과 OECD가 내놓은 AILit 확정판은 Engage·Create·Manage·Shape 네 영역이에요. 알아보고 판단하고, 함께 만들고, 쓸지 관리하고, 더 낫게 만드는 힘이죠. 100개국 넘는 곳의 의견을 모았고 PISA 2029에도 연결돼요.

우리 수업을 네 영역에 꽂아 보면 사용법은 Create 한 칸뿐이에요. 나머지 세 칸도 골고루 채워야 AI 리터러시가 완성돼요.`
};
