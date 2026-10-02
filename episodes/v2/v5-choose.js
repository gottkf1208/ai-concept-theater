/* S5-40 [트랙 S5] 우리 학교 AI 도구, 2026년엔 무엇을 보고 고를까: 모델 카드·데이터 처리·위험 관리 체크리스트 (시즌 5·40편 마무리) */
export default {
  slug: 'v5-choose',
  track: 'S5',
  title: '우리 학교 AI 도구, 2026년엔 무엇을 보고 고를까',
  subtitle: '모델 카드, 데이터 처리, 위험 관리 체크리스트(2026판)',
  summary: '2학기 연구회에서 AI 도구 후보 세 개를 놓고 골라야 해요. 광고 대신 모델 카드·데이터 처리 위치·위험 관리 틀·2026년 법과 지침으로 만든 체크리스트로 판단해요. 시즌 5와 40편 전체를 마무리하는 편이에요.',
  keywords: ['AI 도구 선택', '모델 카드', '라이선스', '데이터 처리 위치', '개인정보 처리 안내서', 'NIST AI RMF', '생성형 AI 프로파일', '사전 고지', '고영향 AI', '체크리스트'],

  scenes: [
    {
      title: '후보 세 개, 뭘 보고 고를까', dur: 13,
      captions: [
        { t: 0, text: '2학기 연구회 과제예요. AI 도구 후보 셋 중 하나를 골라야 해요.' },
        { t: 5, text: '후보마다 광고 문구는 그럴듯해요. "제일 빠르다", "다들 쓴다", "평생 무료".' },
        { t: 9, text: '이번엔 광고 대신 <em>문서 네 장</em>으로 골라 볼게요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const req = P.box({ x: 330, y: 70, w: 580, h: 110, label: '2학기 연구회 과제', sub: 'AI 도구 후보 셋 중 하나를 정해야 해요', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(req.el), .3, { from: 'down' });
        const ads = [
          ['도구 A', '"제일 빠르다!"'],
          ['도구 B', '"다들 쓴다!"'],
          ['도구 C', '"평생 무료!"']
        ];
        const adBoxes = ads.map(([label, sub], i) => {
          const b = P.box({ x: 330 + i * 300, y: 220, w: 270, h: 110, label, sub, accent: '', icon: P.ICON.eye });
          tl.at(stage.appendChild(b.el), 1.4 + i * .5, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 380, text: '광고 문구만으론 알 수 없어요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip.el), 5.2, { from: 'pop' });
        const final = P.text({ x: 330, y: 440, w: 860, text: '이번엔 <em>문서 네 장</em>으로 판단해 볼게요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, (t > .3 && t < 4.5) || t > 9);
            adBoxes.forEach(b => b.on(t > 1.4 && t < 9));
          }
        };
      }
    },
    {
      title: '문서 1: 모델 카드', dur: 14,
      captions: [
        { t: 0, text: '첫째 문서는 <em>모델 카드</em>예요. 모델에 붙이는 설명서로, 2019년에 제안됐어요.' },
        { t: 5, text: '학습 데이터, 써도 되는 곳과 안 되는 곳, <em>집단별 성능</em>까지 적어요.' },
        { t: 10, text: '성별·연령처럼 특성이 겹치는 <em>교차 집단</em>까지 보라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 250, pose: 'point' });
        stage.append(q.el);
        const title = P.box({ x: 340, y: 80, w: 600, h: 110, label: '모델 카드', sub: '모델에 붙이는 설명서 · 2019년 제안', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(title.el), .3, { from: 'down' });
        const cells = [
          ['학습 데이터', '무엇으로 학습했나', 'aqua', P.ICON.brain],
          ['써도 되는 곳·안 되는 곳', '의도된 사용 범위', 'orange', P.ICON.eye],
          ['집단별 성능', '성별·연령 등 교차 집단까지', '', P.ICON.search],
          ['라이선스', '오픈 웨이트면 Apache·MIT·커스텀', 'ink', P.ICON.key]
        ];
        const boxes = cells.map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 100 + i * 290, y: 260, w: 260, h: 150, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), 1.6 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = boxes.map((b, i) => P.arrow(lines, { x1: 640, y1: 190, x2: 230 + i * 290, y2: 260, width: 3, color: '#9AA5AF', curve: (i - 1.5) * 14 }));
        const note = P.text({ x: 260, y: 460, w: 920, text: '집단별 성능까지 밝히는 문서를 공개하는 도구를 먼저 눈여겨봐요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.2);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.3 + i * .7)) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '문서 2: 내 글은 어디로', dur: 14,
      captions: [
        { t: 0, text: '둘째 문서는 <em>내 글이 가는 길</em>이에요.' },
        { t: 5, text: '기기 안에서 끝나는지, 서버로 가는지, 가서 <em>저장되거나 학습에 쓰이는지</em> 확인해요.' },
        { t: 10, text: '2025년 개인정보위 안내서는 생성형 AI를 목적·전략·학습개발·적용관리 네 단계로 보고, <em>개인정보 보호책임자</em> 중심으로 관리하라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 250, pose: 'base' });
        stage.append(q.el);
        const input = P.box({ x: 70, y: 200, w: 220, h: 110, label: '학생이 쓴 글', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(input.el), .3, { from: 'left' });
        const cols = [
          ['기기 안', '서버 호출 없이 바로 처리', 'aqua'],
          ['서버 · 저장 안 함 명시', '처리 뒤 바로 지운다고 밝혀요', 'ink'],
          ['서버 · 정보 부족', '학습에 쓰는지 알 수 없어요', 'orange']
        ];
        const boxes = cols.map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + i * 300, y: 130, w: 270, h: 150, label, sub, accent: acc, icon: P.ICON.search });
          tl.at(stage.appendChild(b.el), 1.4 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = boxes.map((b, i) => P.arrow(lines, { x1: 300, y1: 255, x2: 360 + i * 300, y2: 205, width: 3, color: '#1B1F24', curve: (i - 1) * 16 }));
        const chip = P.chip({ x: 360, y: 320, text: '2025년 안내서: 목적 → 전략 → 학습·개발 → 적용·관리, CPO 중심', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chip.el), 9.6, { from: 'pop' });
        const final = P.text({ x: 360, y: 380, w: 860, text: '내 글이 <em>어디서 끝나는지</em>부터 확인해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 12, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 12);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.1 + i * .7)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '문서 3·4: 위험 관리와 법', dur: 13,
      captions: [
        { t: 0, text: '셋째·넷째 문서는 <em>위험 관리 틀</em>과 <em>법</em>이에요.' },
        { t: 5, text: 'NIST AI RMF는 <em>다스리기·파악·측정·관리</em> 네 가지를 돌며 보라고 해요. 2024년엔 생성형 AI만 다루는 프로파일도 나왔어요.' },
        { t: 9.5, text: '한국 법은 AI로 운용된다는 사실을 <em>미리 알리고</em>, 학생 평가에 쓰면 <em>고영향 영역</em>이라고 정해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 400, size: 250, pose: 'point' });
        stage.append(q.el);
        const cx = 540, cy = 300, R = 150;
        const nodes = [
          { label: '다스리기', sub: '책임자 정하기', a: -90, acc: 'ink', icon: P.ICON.hand },
          { label: '파악', sub: '쓰임새 보기', a: 0, acc: 'aqua', icon: P.ICON.eye },
          { label: '측정', sub: '효과 재기', a: 90, acc: 'orange', icon: P.ICON.search },
          { label: '관리', sub: '문제 대응', a: 180, acc: 'aqua', icon: P.ICON.check }
        ];
        const boxes = nodes.map((n, i) => {
          const x = cx + Math.cos(n.a * Math.PI / 180) * R - 100, y = cy + Math.sin(n.a * Math.PI / 180) * R * .78 - 48;
          const b = P.box({ x, y, w: 200, h: 96, label: n.label, sub: n.sub, accent: n.acc, icon: n.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.1, { from: 'pop' });
          return b;
        });
        const pt = a => [cx + Math.cos(a * Math.PI / 180) * R, cy + Math.sin(a * Math.PI / 180) * R * .78];
        const ringArrows = [[-90, 0], [0, 90], [90, 180], [180, 270]].map(([a1, a2]) => {
          const [x1, y1] = pt(a1 + 28), [x2, y2] = pt(a2 - 28);
          return P.arrow(lines, { x1, y1, x2, y2, curve: -30, width: 3, color: '#9AA5AF' });
        });
        const centerLbl = P.text({ x: 450, y: 278, w: 180, text: 'NIST AI RMF', size: 20, weight: 800, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(centerLbl.el), 4.6, { from: 'pop' });
        const profChip = P.chip({ x: 430, y: 480, text: '2024년 생성형 AI 프로파일', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(profChip.el), 4.8, { from: 'pop' });
        const lawA = P.box({ x: 900, y: 110, w: 330, h: 130, label: '사전 고지', sub: 'AI로 운용된다는 사실을 미리 알려요', accent: 'orange', icon: P.ICON.doc });
        const lawB = P.box({ x: 900, y: 270, w: 330, h: 130, label: '고영향 영역', sub: '학생 평가에 쓰면 해당돼요', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(lawA.el), 9.7, { from: 'left' });
        tl.at(stage.appendChild(lawB.el), 10.5, { from: 'left' });
        const final = P.text({ x: 60, y: 560, w: 1160, text: '<em>책임·쓰임새·효과·대응</em>을 묻고, 평가에 쓰면 사람 검토가 꼭 필요해요.', size: 24, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            ringArrows.forEach((a, i) => a.draw(P.clamp((t - (1.1 + i * 1.1)) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '정리: 체크리스트로 고르기', dur: 12,
      captions: [
        { t: 0, text: '마지막은 <em>체크리스트</em>예요. 문서 네 장에서 본 걸 점수로 모아요.' },
        { t: 4.5, text: '점수로 <em>도입·조건부·보류</em>를 정하고, <em>한 학기 뒤 다시</em> 점검해요.' },
        { t: 8.5, text: '모델 붕괴부터 전기·물까지, 마흔 편에서 본 원리가 이 한 장에 모여요. 함께해 줘서 고마워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const rows = ['모델 카드 공개?', '처리 위치 확인?', '위험 관리·법 확인?', '평가용이면 사람 검토?'];
        const rowBoxes = rows.map((label, i) => {
          const b = P.box({ x: 400, y: 90 + i * 85, w: 440, h: 72, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const arrow1 = P.arrow(lines, { x1: 860, y1: 220, x2: 950, y2: 220, width: 4, color: '#1B1F24' });
        const gradeBox = P.box({ x: 950, y: 120, w: 250, h: 190, label: '도입 / 조건부 / 보류', sub: '점수와 상황에 따라', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(gradeBox.el), 2.6, { from: 'pop' });
        const cycleNote = P.text({ x: 400, y: 450, w: 820, text: '한 학기 뒤 <em>다시</em> 점검해요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(cycleNote.el), 5.2, { from: 'up' });
        const recap = ['모델 붕괴', '오픈 웨이트', '온디바이스', 'AI 채점', 'AI 리터러시', 'AI 법', '전기·물'];
        const chips = recap.map((text, i) => {
          const c = P.chip({ x: 300 + i * 135, y: 590, text, color: i % 2 ? 'aqua' : 'ink', size: 15 });
          tl.at(stage.appendChild(c.el), 8.6 + i * .12, { from: 'pop' });
          return c;
        });
        const finalLine = P.text({ x: 400, y: 510, w: 820, text: '원리를 짚을수록 도구를 보는 눈이 생겨요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(finalLine.el), 8.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.5);
            arrow1.draw(P.clamp((t - 2.2) / .5, 0, 1));
            rowBoxes.forEach((b, i) => b.on(t > .3 + i * .5));
          }
        };
      }
    }
  ],

  interaction: {
    title: '2026 도구 고르기 점수판',
    desc: '항목 10개를 체크하고, <b>실제 처리 위치</b>를 고르고, <b>평가(채점)에 쓸 예정</b>인지 켜 보세요. 처리 위치가 "서버(정보 없음)"이면 등급이 조건부를 넘지 못하고, 평가용인데 사람 최종 검토가 빠지면 등급이 바로 보류가 돼요. <b>도구 A로 채우기</b>를 눌러 가상 예시를 보세요. 가중치와 등급 기준, 도구 A·B는 연구회 예시예요.',
    mount(el, P) {
      const ITEMS = [
        { id: 'card', label: '모델 카드·한계 문서 공개', weight: 1 },
        { id: 'license', label: '라이선스 확인 (오픈 웨이트일 때)', weight: 1 },
        { id: 'locdoc', label: '처리 위치 명시', weight: 2, priv: true },
        { id: 'notrain', label: '입력을 학습에 쓰지 않는 설정', weight: 2, priv: true },
        { id: 'retention', label: '보관 기간 명시', weight: 2, priv: true },
        { id: 'age', label: '연령·학생 사용 조건 명시', weight: 2, priv: true },
        { id: 'notice', label: 'AI 기반임을 사전 고지', weight: 1 },
        { id: 'label', label: 'AI 생성물 표시 기능', weight: 1 },
        { id: 'report', label: '문제 신고 창구', weight: 1 },
        { id: 'energy', label: '에너지 큰 기능(영상) 사용 조절 가능', weight: 1 }
      ];
      const MAX = ITEMS.reduce((s, it) => s + it.weight, 0);

      const EXAMPLES = {
        A: { checks: { card: true, license: true, locdoc: true, notrain: true, retention: true, age: true, notice: true, label: true, report: true, energy: false }, location: 'device', evalOn: false, review: false },
        B: { checks: { card: true, license: false, locdoc: false, notrain: false, retention: false, age: true, notice: false, label: true, report: false, energy: false }, location: 'unknown', evalOn: true, review: false }
      };

      let checks = Object.fromEntries(ITEMS.map(it => [it.id, false]));
      let location = 'device';
      let evalOn = false;
      let review = false;

      const list = P.h('div', { class: 'sim-choose-list' });
      const locSel = P.h('select', { id: 'sim-choose-loc', 'aria-label': '실제 처리 위치' });
      ['device', 'safe', 'unknown'].forEach(v => locSel.append(P.h('option', { value: v }, v === 'device' ? '기기 안' : v === 'safe' ? '서버 (저장 안 함 명시)' : '서버 (정보 없음)')));
      const locLab = P.h('label', { for: 'sim-choose-loc', class: 'sim-choose-loclab' }, '실제 처리 위치 ', locSel);
      const evalBtn = P.h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, '평가(채점)에 쓸 예정: 아님');
      const reviewRow = P.h('div', { class: 'sim-choose-review' });
      const scoreNum = P.h('div', { class: 'sim-choose-score' });
      const gradeChip = P.h('div', { class: 'sim-choose-grade' });
      const lackWrap = P.h('div', { class: 'sim-choose-lack' });
      const resultCard = P.h('div', { class: 'sim-choose-card' },
        P.h('div', { class: 'sim-choose-scorewrap' }, scoreNum, gradeChip),
        lackWrap
      );
      const aBtn = P.h('button', { class: 'btn primary', type: 'button' }, '도구 A로 채우기');
      const bBtn = P.h('button', { class: 'btn', type: 'button' }, '도구 B');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const note = P.h('p', { class: 'sim-choose-note' }, '처리 위치·학습 미사용·보관 기간·연령 조건(개인정보 항목)은 가중치 2배예요. 가중치와 등급 기준, 도구 A·B는 연구회 예시예요.');

      const wrap = P.h('div', { class: 'sim-choose' },
        P.h('h4', { class: 'sim-choose-h' }, '체크리스트 (10개 항목)'),
        list,
        P.h('div', { class: 'sim-choose-ctrl' }, locLab, evalBtn),
        reviewRow,
        P.h('div', { class: 'sim-choose-bar' }, aBtn, bBtn, resetBtn),
        resultCard,
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
        .sim-choose-ctrl{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:14px}
        .sim-choose-loclab{font-size:13.5px;color:var(--muted);display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .sim-choose-loclab select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:#fff;max-width:100%}
        .sim-choose-ctrl button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-choose-review{margin-top:10px}
        .sim-choose-review .sim-choose-row{border-color:#F9D3B8;background:#FFF8F1}
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
        const pct = score / MAX;
        let g = pct >= .75 ? { text: '도입 권장', cls: 'go' } : pct >= .45 ? { text: '조건부 도입', cls: 'cond' } : { text: '보류', cls: 'hold' };
        if (location === 'unknown' && g.cls === 'go') g = { text: '조건부 도입', cls: 'cond' };
        if (evalOn && !review) g = { text: '보류', cls: 'hold', hard: true };
        return g;
      }

      function renderResult() {
        const score = ITEMS.reduce((s, it) => s + (checks[it.id] ? it.weight : 0), 0);
        const g = grade(score);
        scoreNum.textContent = `${score} / ${MAX}점`;
        gradeChip.textContent = g.text;
        gradeChip.className = `sim-choose-grade ${g.cls}`;
        const missing = ITEMS.filter(it => !checks[it.id]);
        const bits = [];
        if (missing.length) bits.push(P.h('p', {}, P.h('b', {}, '부족한 항목: '), missing.map(it => it.label).join(', ')));
        else bits.push(P.h('p', {}, '체크리스트 10개 항목을 모두 갖췄어요.'));
        if (location === 'unknown') bits.push(P.h('p', {}, '처리 위치 정보가 없어서 등급이 조건부를 넘지 못해요.'));
        if (evalOn && !review) bits.push(P.h('p', {}, P.h('b', {}, '학생 평가'), '에 쓰려면 사람 최종 검토가 꼭 있어야 해요. 법이 정한 고영향 영역이에요.'));
        lackWrap.replaceChildren(...bits);
      }

      function render() {
        list.replaceChildren(...ITEMS.map(it => {
          const cb = P.h('input', { type: 'checkbox', id: `sim-choose-${it.id}` });
          cb.checked = !!checks[it.id];
          cb.addEventListener('change', () => { checks[it.id] = cb.checked; renderResult(); });
          return P.h('label', { class: `sim-choose-row${it.priv ? ' priv' : ''}`, for: `sim-choose-${it.id}` },
            cb,
            P.h('span', { class: 'lbl' }, it.label),
            P.h('span', { class: 'w' }, `${it.weight}점`)
          );
        }));
        locSel.value = location;
        evalBtn.textContent = `평가(채점)에 쓸 예정: ${evalOn ? '맞음' : '아님'}`;
        evalBtn.setAttribute('aria-pressed', evalOn ? 'true' : 'false');
        if (evalOn) {
          const cb = P.h('input', { type: 'checkbox', id: 'sim-choose-review' });
          cb.checked = review;
          cb.addEventListener('change', () => { review = cb.checked; renderResult(); });
          reviewRow.replaceChildren(P.h('label', { class: 'sim-choose-row', for: 'sim-choose-review' },
            cb, P.h('span', { class: 'lbl' }, '사람 최종 검토 절차 (필수)'), P.h('span', { class: 'w' }, '필수')
          ));
        } else {
          reviewRow.replaceChildren();
        }
        renderResult();
      }

      aBtn.addEventListener('click', () => { const e = EXAMPLES.A; checks = { ...e.checks }; location = e.location; evalOn = e.evalOn; review = e.review; render(); });
      bBtn.addEventListener('click', () => { const e = EXAMPLES.B; checks = { ...e.checks }; location = e.location; evalOn = e.evalOn; review = e.review; render(); });
      resetBtn.addEventListener('click', () => { checks = Object.fromEntries(ITEMS.map(it => [it.id, false])); location = 'device'; evalOn = false; review = false; render(); });
      locSel.addEventListener('change', () => { location = locSel.value; renderResult(); });
      evalBtn.addEventListener('click', () => { evalOn = !evalOn; if (!evalOn) review = false; render(); });

      render();
    }
  },

  teacherLines: [
    '좋은 AI 도구는 <b>못 하는 것</b>과 <b>내 글이 가는 곳</b>을 문서로 밝혀요.',
    'AI 도구는 한 번 고르고 끝이 아니라 <b>한 학기 써 보고 다시 점검</b>해요.'
  ],
  tip: {
    body: '후보마다 문서 네 장(모델 카드·개인정보 처리방침·이용약관의 연령 조건·AI 사용 고지 화면)을 캡처해 한 폴더에 모으고, 점수판으로 채점하세요. 평가에 쓸 도구는 "사람 최종 검토" 절차를 먼저 정한 뒤에만 도입해요.',
    extra: '가중치는 학교 상황에 맞게 바꿔도 돼요. 다만 처리 위치·보관 기간·연령 조건(개인정보 세 항목)은 낮추지 마세요.'
  },
  myth: {
    myth: '유명하고 많이 쓰는 도구면 학교에서 써도 안전하다.',
    fact: '유명함과 데이터 처리 위치·보관·연령 조건은 별개예요. 문서로 확인하고, 평가에 쓰면 법이 정한 고영향 영역이라 사람 검토가 필요해요.'
  },
  sources: [
    { title: 'Model Cards for Model Reporting (arXiv/FAT*, 2019)', url: 'https://arxiv.org/abs/1810.03993', note: '모델이 무엇으로 학습했고, 어디에 적합하며, 집단별 성능과 한계는 무엇인지 적는 모델 카드를 제안한 논문.' },
    { title: 'AI Risk Management Framework — NIST', url: 'https://www.nist.gov/itl/ai-risk-management-framework', note: 'AI 위험을 다스리기·파악·측정·관리 네 기능으로 보는 자율 프레임워크. 2024년 생성형 AI 프로파일도 포함.' },
    { title: "개인정보위, 생성형 AI 개발·활용 '개인정보 처리 기준' 공개 (정책브리핑, 2025-08-06)", url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148947194', note: '생성형 AI 생애주기를 목적 설정·전략 수립·학습 및 개발·적용 및 관리 네 단계로 나눈 안내서.' },
    { title: '인공지능 발전과 신뢰 기반 조성 등에 관한 기본법 제31조 (국가법령정보센터)', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=282791&joNo=0031&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR', note: '고영향·생성형 AI는 AI 기반 운용 사실을 사전 고지하고 생성형 AI 결과물을 표시해야 한다는 조문.' }
  ],
  script: `2학기 연구회에서 "AI 도구 후보 셋 중 하나만 정해 주세요"라는 과제를 받았어요. 후보마다 광고 문구는 그럴듯하죠. 이번엔 광고 대신 문서 네 장으로 판단해 보기로 했어요.

첫째는 모델 카드예요. 2019년에 제안된, 모델에 붙이는 설명서로 학습 데이터, 써도 되는 곳과 안 되는 곳, 성별·연령처럼 특성이 겹치는 집단까지 포함한 성능을 적어요. 둘째는 내 글이 가는 길이에요. 기기 안에서 끝나는지, 서버로 가서 저장되거나 학습에 쓰이는지 확인해요. 2025년 개인정보위 안내서는 생성형 AI를 목적·전략·학습개발·적용관리 네 단계로 보고 개인정보 보호책임자 중심으로 관리하라고 해요.

셋째는 위험 관리 틀이에요. NIST AI RMF는 다스리기·파악·측정·관리를 돌며 보라고 하고, 2024년엔 생성형 AI만 다루는 프로파일도 나왔어요. 넷째는 법이에요. AI로 운용된다는 사실을 미리 알리고, 학생 평가에 쓰면 고영향 영역이라 사람 검토가 필요해요.

문서 네 장을 체크리스트로 점수 매기고 도입·조건부·보류를 정한 뒤, 한 학기 써 보고 다시 점검하세요. 원리를 짚을수록 도구를 보는 눈이 생겨요. 마흔 편 함께해 줘서 고마워요.`
};
