/* S4-24 [B] 우리 학교 AI 도구, 무엇을 보고 고를까: 모델 카드와 데이터 처리 (시즌 4 마무리 편) */
export default {
  slug: 's4-choose',
  track: 'B',
  title: '우리 학교 AI 도구, 무엇을 보고 고를까',
  subtitle: '모델 카드와 데이터 처리',
  summary: '광고 문구 대신 모델 카드, 데이터 처리, 위험 관리 틀 세 가지 기준으로 학교 AI 도구를 고르는 법을 체크리스트로 정리해요. 시즌 4를 마무리하는 편이에요.',
  keywords: ['모델 카드', '데이터 처리', 'NIST AI RMF', 'AI 도구 선택', '체크리스트'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '<em>"학교에서 쓸 AI 도구, 하나만 정해 주세요."</em> 연구회 문자를 받았어요.' },
        { t: 5, text: '광고 문구만 보고 고를 순 없잖아요. 뭔가 기준이 있어야겠죠.' },
        { t: 9.5, text: '그 기준, 같이 짚어볼게요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 300, pose: 'think' });
        stage.append(q.el);
        const reqBox = P.box({ x: 360, y: 90, w: 560, h: 130, label: '연구회 요청', sub: '"학교에서 쓸 AI 도구, 하나만 정해 주세요"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(reqBox.el), .3, { from: 'down' });
        const ads = ['도구 A · "최고의 AI!"', '도구 B · "모두가 써요"', '도구 C · "완전 무료!"'];
        const adBoxes = ads.map((label, i) => {
          const b = P.box({ x: 360 + i * 210, y: 270, w: 180, h: 100, label, accent: '', icon: P.ICON.eye });
          tl.at(stage.appendChild(b.el), 1.4 + i * .5, { from: 'up' });
          return b;
        });
        const noteChip = P.chip({ x: 360, y: 400, text: '광고 문구만으로는 알 수 없어요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(noteChip.el), 5, { from: 'pop' });
        const q2 = P.text({ x: 360, y: 470, w: 780, text: '그럼 <em>무엇을 보고</em> 골라야 할까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(q2.el), 9.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, (t > .3 && t < 4.5) || t > 9.5);
            adBoxes.forEach(b => b.on(t > 5 && t < 9.5));
          }
        };
      }
    },
    {
      title: '첫째, 모델 카드', dur: 14,
      captions: [
        { t: 0, text: '첫째 기준은 <em>모델 카드</em>예요.' },
        { t: 5, text: '무엇으로 학습했고, 어디에 잘 맞고, 어떤 한계·편향이 있는지 적어 둔 문서예요.' },
        { t: 10, text: '좋은 도구는 이런 문서를 <em>공개</em>해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 250, pose: 'point' });
        stage.append(q.el);
        const card = P.box({ x: 460, y: 90, w: 360, h: 110, label: '모델 카드', sub: 'Mitchell 외, 2019 제안', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(card.el), .3, { from: 'down' });
        const items = [
          ['학습 데이터', '무엇으로 학습했나'],
          ['적합한 상황', '어디에 잘 맞나'],
          ['한계 · 편향', '무엇을 못 하나']
        ];
        const boxes = items.map(([label, sub], i) => {
          const b = P.box({ x: 130 + i * 350, y: 300, w: 300, h: 120, label, sub, accent: i === 2 ? 'orange' : 'aqua' });
          tl.at(stage.appendChild(b.el), 1.6 + i * .8, { from: 'up' });
          return b;
        });
        const arrows = boxes.map((b, i) => P.arrow(lines, { x1: 640, y1: 200, x2: 280 + i * 350, y2: 300, width: 3, color: '#9AA5AF', curve: (i - 1) * 20 }));
        const note = P.chip({ x: 130, y: 460, text: '공개하는 도구를 먼저 눈여겨봐요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(note.el), 10, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.4 + i * .8)) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '둘째, 데이터 처리', dur: 14,
      captions: [
        { t: 0, text: '둘째 기준은 <em>데이터 처리</em>예요.' },
        { t: 5, text: '입력한 내용이 저장되나요? 학습에 쓰이나요? 어느 서버에 있나요?' },
        { t: 10, text: '학생이 쓴다면 <em>연령 조건</em>도 봐요. 약관과 개인정보 처리방침에서 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 250, pose: 'base' });
        stage.append(q.el);
        const inputBox = P.box({ x: 110, y: 140, w: 240, h: 110, label: '내가 입력한 글', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(inputBox.el), .3, { from: 'left' });
        const arrow1 = P.arrow(lines, { x1: 350, y1: 195, x2: 460, y2: 195, width: 4, color: '#1B1F24' });
        const serverBox = P.box({ x: 460, y: 100, w: 440, h: 190, label: '도구 서버', sub: '저장되나? · 학습에 쓰이나? · 어디 서버?', accent: 'aqua', icon: P.ICON.search });
        tl.at(stage.appendChild(serverBox.el), 1.6, { from: 'up' });
        const ageBox = P.box({ x: 460, y: 330, w: 440, h: 120, label: '학생이 쓴다면 연령 조건도', sub: '몇 살부터 쓸 수 있나요', accent: 'orange', icon: P.ICON.eye });
        tl.at(stage.appendChild(ageBox.el), 9.5, { from: 'up' });
        const note = P.text({ x: 300, y: 500, w: 700, text: '<em>약관</em>과 <em>개인정보 처리방침</em>에서 확인해요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 12, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 12);
            arrow1.draw(P.clamp((t - 1) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '셋째, 위험 관리의 틀', dur: 13,
      captions: [
        { t: 0, text: '셋째 기준은 <em>위험 관리의 틀</em>이에요.' },
        { t: 5, text: 'NIST AI RMF는 위험을 <em>다스리기 · 파악 · 측정 · 관리</em>, 네 단계로 보라고 해요.' },
        { t: 9, text: '학교판으로 줄이면 — 누가 책임지나, 어디에 쓰나, 어떻게 재나, 문제 생기면 어떻게, 이 네 가지예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 260, pose: 'point' });
        stage.append(q.el);
        const cx = 780, cy = 340, R = 190;
        const nodes = [
          { label: '다스리기', sub: '누가 책임지나', a: -90, acc: 'ink', icon: P.ICON.hand },
          { label: '파악', sub: '어디에 쓰나', a: 0, acc: 'aqua', icon: P.ICON.eye },
          { label: '측정', sub: '어떻게 재나', a: 90, acc: 'orange', icon: P.ICON.search },
          { label: '관리', sub: '문제 생기면', a: 180, acc: 'aqua', icon: P.ICON.check }
        ];
        const boxes = nodes.map((n, i) => {
          const x = cx + Math.cos(n.a * Math.PI / 180) * R - 110, y = cy + Math.sin(n.a * Math.PI / 180) * R * .78 - 52;
          const b = P.box({ x, y, w: 220, h: 104, label: n.label, sub: n.sub, accent: n.acc, icon: n.icon });
          tl.at(stage.appendChild(b.el), .5 + i * 1.3, { from: 'pop' });
          return b;
        });
        const pt = a => [cx + Math.cos(a * Math.PI / 180) * R, cy + Math.sin(a * Math.PI / 180) * R * .78];
        const arrows = [[-90, 0], [0, 90], [90, 180], [180, 270]].map(([a1, a2]) => {
          const [x1, y1] = pt(a1 + 28), [x2, y2] = pt(a2 - 28);
          return P.arrow(lines, { x1, y1, x2, y2, curve: -36, width: 4, color: '#1B1F24' });
        });
        const centerLbl = P.text({ x: 680, y: 318, w: 200, text: 'NIST AI RMF', size: 22, weight: 800, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(centerLbl.el), 5, { from: 'pop' });
        const note = P.text({ x: 300, y: 580, w: 900, text: '학교판으로 줄이면 — <em>누가 책임지나 · 어디에 쓰나 · 어떻게 재나 · 문제 생기면 어떻게</em>.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1.3 + i * .9)) / .7, 0, 1)));
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 14,
      captions: [
        { t: 0, text: '체크리스트로 점수를 매겨 보세요.' },
        { t: 5, text: '점수로 <em>도입 권장 · 조건부 · 보류</em>를 정하고, 한 학기 시범 써 본 뒤 다시 봐요.' },
        { t: 9, text: '<em>원리를 알면 고를 수 있고, 고를 수 있으면 가르칠 수 있어요.</em>' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 320, pose: 'wave' });
        stage.append(q.el);
        const rows = ['모델 카드 공개?', '데이터 처리 확인?', '위험 관리 틀 확인?'];
        const rowBoxes = rows.map((label, i) => {
          const b = P.box({ x: 420, y: 100 + i * 110, w: 420, h: 90, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), .3 + i * .6, { from: 'up' });
          return b;
        });
        const arrow1 = P.arrow(lines, { x1: 860, y1: 250, x2: 960, y2: 250, width: 4, color: '#1B1F24' });
        const gradeBox = P.box({ x: 960, y: 160, w: 240, h: 180, label: '도입 권장', sub: '점수 합산 결과', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(gradeBox.el), 3.4, { from: 'pop' });
        const cycleNote = P.text({ x: 420, y: 450, w: 780, text: '한 학기 시범 후 <em>다시</em> 봐요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(cycleNote.el), 6.5, { from: 'up' });
        const finalLine = P.text({ x: 420, y: 540, w: 800, text: '<em>원리를 알면 고를 수 있고,</em><br><em>고를 수 있으면 가르칠 수 있어요.</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(finalLine.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrow1.draw(P.clamp((t - 3) / .5, 0, 1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '도구 고르기 체크리스트 점수판',
    desc: '항목을 체크하면 점수와 등급이 바로 바뀌어요. 개인정보 관련 항목은 <b>가중치 2배</b>예요. <b>예시로 채워 보기</b>를 누르면 가상의 "도구 A" 체크 상태를 볼 수 있어요. 실제 제품 이름은 쓰지 않았고, 점수는 연구회 예시 기준이에요.',
    mount(el, P) {
      const ITEMS = [
        { id: 'card', label: '모델·한계 문서 공개', weight: 1 },
        { id: 'notrain', label: '입력을 학습에 쓰지 않는 설정', weight: 2, priv: true },
        { id: 'storage', label: '데이터 저장 위치·보관 기간 명시', weight: 2, priv: true },
        { id: 'age', label: '연령·학생 사용 조건 명시', weight: 2, priv: true },
        { id: 'label', label: 'AI 생성 표시 기능', weight: 1 },
        { id: 'cite', label: '출처·인용 표시 기능', weight: 1 },
        { id: 'cost', label: '비용·무료 범위 명확', weight: 1 },
        { id: 'support', label: '문제 신고·지원 창구', weight: 1 }
      ];
      const MAX = ITEMS.reduce((s, it) => s + it.weight, 0);
      const EXAMPLE = { card: true, notrain: false, storage: true, age: false, label: true, cite: false, cost: true, support: false };
      let state = Object.fromEntries(ITEMS.map(it => [it.id, false]));

      const list = P.h('div', { class: 'sim-choose-list' });
      const scoreNum = P.h('div', { class: 'sim-choose-score' });
      const gradeChip = P.h('div', { class: 'sim-choose-grade' });
      const lackWrap = P.h('div', { class: 'sim-choose-lack' });
      const card = P.h('div', { class: 'sim-choose-card' },
        P.h('div', { class: 'sim-choose-scorewrap' }, scoreNum, gradeChip),
        lackWrap
      );
      const exBtn = P.h('button', { class: 'btn primary', type: 'button' }, '예시로 채워 보기 (도구 A)');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const note = P.h('p', { class: 'sim-choose-note' }, '개인정보 관련 항목(입력 학습 미사용 · 저장 위치 · 연령 조건)은 가중치 2배예요. 점수는 연구회 예시 기준이고, 실제 제품 이름은 쓰지 않았어요.');

      const wrap = P.h('div', { class: 'sim-choose' },
        P.h('h4', { class: 'sim-choose-h' }, '체크리스트 (8개 항목)'),
        list,
        P.h('div', { class: 'sim-choose-bar' }, exBtn, resetBtn),
        card,
        note
      );
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-choose{max-width:100%}
        .sim-choose-h{margin:0 0 10px;font-size:13.5px;color:var(--muted)}
        .sim-choose-list{display:grid;gap:8px}
        .sim-choose-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;max-width:100%;box-sizing:border-box}
        .sim-choose-row input{margin-top:3px;flex:none}
        .sim-choose-row span.lbl{flex:1 1 auto;font-size:14.5px;font-weight:600;line-height:1.4;min-width:0}
        .sim-choose-row span.w{flex:none;font-family:var(--mono);font-size:12px;font-weight:800;color:#B3520F;background:var(--orange-pale);border-radius:999px;padding:2px 8px;white-space:nowrap}
        .sim-choose-row.priv{border-color:#F9D3B8}
        .sim-choose-bar{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
        .sim-choose-card{margin-top:16px;border:1px solid var(--line);border-radius:14px;padding:16px;background:var(--paper)}
        .sim-choose-scorewrap{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
        .sim-choose-score{font-family:var(--mono);font-size:28px;font-weight:800}
        .sim-choose-grade{font-size:14px;font-weight:800;padding:6px 14px;border-radius:999px;background:#EEF1F4;color:var(--muted)}
        .sim-choose-grade.go{background:var(--aqua-pale);color:var(--aqua-deep)}
        .sim-choose-grade.cond{background:var(--orange-pale);color:#B3520F}
        .sim-choose-grade.hold{background:#EEF1F4;color:var(--muted)}
        .sim-choose-lack{margin-top:12px;font-size:13.5px;color:var(--muted);line-height:1.6}
        .sim-choose-lack b{color:var(--ink)}
        .sim-choose-note{margin-top:14px;font-size:12.5px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px;line-height:1.6}
      ` });
      el.append(style);

      function grade(score) {
        if (score >= 9) return { text: '도입 권장', cls: 'go' };
        if (score >= 5) return { text: '조건부 도입', cls: 'cond' };
        return { text: '보류', cls: 'hold' };
      }

      function renderResult() {
        const score = ITEMS.reduce((s, it) => s + (state[it.id] ? it.weight : 0), 0);
        const g = grade(score);
        scoreNum.textContent = `${score} / ${MAX}점`;
        gradeChip.textContent = g.text;
        gradeChip.className = `sim-choose-grade ${g.cls}`;
        const missing = ITEMS.filter(it => !state[it.id]);
        lackWrap.replaceChildren(
          missing.length
            ? P.h('p', {}, P.h('b', {}, '부족한 항목: '), missing.map(it => it.label).join(', '))
            : P.h('p', {}, '모든 항목을 갖췄어요.')
        );
      }

      function render() {
        list.replaceChildren(...ITEMS.map(it => {
          const cb = P.h('input', { type: 'checkbox', id: `sim-choose-${it.id}` });
          cb.checked = !!state[it.id];
          cb.addEventListener('change', () => { state[it.id] = cb.checked; renderResult(); });
          return P.h('label', { class: `sim-choose-row${it.priv ? ' priv' : ''}`, for: `sim-choose-${it.id}` },
            cb,
            P.h('span', { class: 'lbl' }, it.label),
            P.h('span', { class: 'w' }, `${it.weight}점`)
          );
        }));
        renderResult();
      }

      exBtn.addEventListener('click', () => { state = { ...EXAMPLE }; render(); });
      resetBtn.addEventListener('click', () => { state = Object.fromEntries(ITEMS.map(it => [it.id, false])); render(); });

      render();
    }
  },

  teacherLines: [
    '좋은 AI 도구는 <b>무엇을 못 하는지</b>도 적어 둬요. 그 문서를 먼저 찾아봐요.',
    'AI 도구를 고를 땐 <b>내 글이 어디로 가는지</b>부터 물어봐요.'
  ],
  tip: {
    body: '체크리스트로 점수를 매기고, 한 학기 시범 써 본 뒤 다시 살펴보는 흐름이 안전해요. 개인정보 관련 항목(입력 학습 미사용 · 저장 위치 · 연령 조건)은 가중치를 2배로 둬요.',
    extra: '점수는 절대적인 기준이 아니에요. 우리 학교 상황에 맞게 항목과 가중치를 바꿔서 써도 좋아요.'
  },
  myth: {
    myth: '유명한 도구면 학교에서 써도 안전하다.',
    fact: '유명함과 데이터 처리·연령 조건은 별개예요. 모델 카드와 약관, 개인정보 처리방침을 직접 확인해요.'
  },
  sources: [
    { title: 'Model Cards for Model Reporting (Mitchell et al., 2019)', url: 'https://arxiv.org/abs/1810.03993', note: '모델이 무엇으로 학습했고, 어디에 적합하며, 어떤 한계·편향이 있는지 적어 두는 모델 카드를 제안한 논문.' },
    { title: 'AI Risk Management Framework — NIST', url: 'https://www.nist.gov/itl/ai-risk-management-framework', note: 'AI 위험을 다스리기(Govern)·파악(Map)·측정(Measure)·관리(Manage) 네 기능으로 보는 프레임워크.' }
  ],
  script: `연구회에서 "학교에서 쓸 AI 도구, 하나만 정해 주세요"라는 요청이 왔어요. 광고 문구만 보고 고를 순 없으니, 기준 세 가지를 정해 봤어요.

첫째는 모델 카드예요. 무엇으로 학습했고, 어디에 잘 맞고, 어떤 한계·편향이 있는지 적어 둔 문서예요. 미첼 외 연구진이 2019년에 제안했고, 좋은 도구는 이런 문서를 공개해요.

둘째는 데이터 처리예요. 입력이 저장되나요, 학습에 쓰이나요, 어느 서버에 있나요. 학생이 쓴다면 연령 조건까지 약관과 개인정보 처리방침에서 확인해요.

셋째는 위험 관리의 틀이에요. NIST AI RMF는 위험을 다스리기·파악·측정·관리, 네 단계로 보라고 해요. 학교판으로 줄이면 책임·용도·측정·대응, 이 네 가지예요.

체크리스트로 점수 매기고, 한 학기 시범 써 본 뒤 다시 봐요. 원리를 알면 고를 수 있고, 고를 수 있으면 가르칠 수 있어요.`
};
