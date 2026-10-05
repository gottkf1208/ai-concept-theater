/* S777-63 "안전하다"를 증거로 보여 주는 법: 안전성 논증과 제3자 평가 */
export default {
  slug: 't7-safety-case',
  track: 'S777',
  title: '"안전하다"는 무엇으로 증명할까',
  subtitle: '안전성 논증과 제3자 평가',
  summary: '"우리 AI는 안전합니다"라는 말 대신, 주장마다 근거를 붙이고 남은 위험까지 적어 내는 문서를 안전성 논증이라고 해요. 9월에 나온 학습 단계 안전성 논증 지침, 회사 안에 들어가 지켜보는 외부 평가, 한국의 AI 안전 종합계획 협의체 소식으로 "누가, 무엇으로 안전을 증명하나"를 짚어요.',
  keywords: ['안전성 논증', 'safety case', '안전 주장', '근거', '잔여 위험', '프리모템', '반대 의견서', '거부권', '레드팀', '제3자 평가', '임베디드 평가', '정렬', '격리', '감시', 'AI 안전'],

  scenes: [
    {
      title: '2주 사이 세 소식', dur: 13,
      captions: [
        { t: 0, text: '9월 18일부터 30일 사이, AI가 안전하다는 걸 <em>어떻게 증명하나</em>를 다룬 소식이 셋 나왔어요.' },
        { t: 4.5, text: 'Anthropic은 Accenture와 함께 회사 안에 들어가 지켜보는 외부 평가를, OpenAI는 학습 단계의 <em>안전성 논증</em> 지침을 발표했어요.' },
        { t: 9, text: '9월 30일에는 과학기술정보통신부가 민·관이 함께 국가 AI 안전 종합계획을 세운다고 발표했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const head = P.text({ x: 360, y: 80, w: 840, text: "'안전합니다' 말고, <em>증거로</em>", size: 34, weight: 800 });
        tl.at(stage.appendChild(head.el), .2, { from: 'up' });
        const news = [
          ['9.18 내장형 평가', 'Anthropic·Accenture', 'aqua', P.ICON.eye, 4.6],
          ['9.28 안전성 논증', 'OpenAI 학습 단계 지침', 'ink', P.ICON.doc, 6.4],
          ['9.30 민·관 협의체', '과기정통부 AI 안전 계획', 'orange', P.ICON.desk, 9.2]
        ].map(([label, sub, accent, icon, at], i) => {
          const b = P.box({ x: 360 + i * 285, y: 180, w: 265, h: 200, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), at, { from: 'up' });
          return b;
        });
        const line = P.arrow(lines, { x1: 370, y1: 420, x2: 1200, y2: 420, width: 3, color: '#9AA5AF' });
        const chip = P.chip({ x: 360, y: 450, text: '누가, 무엇으로 안전을 증명하나', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 1.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
            line.draw(P.clamp((t - .6) / 1.2, 0, 1));
            news.forEach((b, i) => b.on(t > [4.6, 6.4, 9.2][i]));
          }
        };
      }
    },
    {
      title: '안전성 논증의 뼈대', dur: 14,
      captions: [
        { t: 0, text: '<em>안전성 논증</em>은 "안전하다"는 큰 주장을 작은 주장으로 나누고, 작은 주장마다 증거를 붙인 문서예요. 항공이나 원자력처럼 안전이 중요한 산업에서 쓰는 방식이에요.' },
        { t: 5.5, text: '9월 28일 지침은 학습을 계속하기 전에 <em>정렬, 격리, 감시</em> 세 축의 근거를 갖추자고 해요. OpenAI는 아직은 지향하는 목표라고 밝혔어요.' },
        { t: 10, text: '아직 막지 못한 <em>잔여 위험</em>도 목록으로 적어요. 숨기지 않아야 그 위험을 받아들일지 판단할 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const top = P.box({ x: 560, y: 90, w: 400, h: 100, label: '학습 위험은 관리된다', sub: '맨 위의 큰 주장', accent: 'ink' });
        tl.at(stage.appendChild(top.el), .3, { from: 'up' });
        const subs = [
          ['정렬', '의도대로 행동해요'],
          ['격리', '어긋나도 갇혀 있어요'],
          ['감시', '이상하면 바로 멈춰요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 360 + i * 290, y: 240, w: 260, h: 110, label, sub, accent: 'aqua' });
          tl.at(stage.appendChild(b.el), 5.6 + i * .5, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 760, y1: 192, x2: 490 + i * 290, y2: 236, curve: (i - 1) * -8, width: 3, color: '#1B1F24' }));
        const ev = [['평가 결과', 395], ['레드팀 보고서', 668], ['경보·정지 기록', 950]].map(([text, x], i) => {
          const c = P.chip({ x, y: 380, text, color: 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), 7.4 + i * .4, { from: 'pop' });
          return c;
        });
        const risk = P.box({ x: 360, y: 470, w: 840, h: 100, label: '남은 위험 목록', sub: '아직 못 막은 위험도 적어요', accent: 'orange', icon: '' });
        tl.at(stage.appendChild(risk.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            top.on(t > .3 && t < 5.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (5.2 + i * .5)) / .5, 0, 1)));
            subs.forEach((b, i) => b.on(t > 5.6 + i * .5 && t < 10));
            risk.on(t > 10.2);
          }
        };
      }
    },
    {
      title: '주장은 네 갈래', dur: 13,
      captions: [
        { t: 0, text: '2024년 연구는 안전 주장을 네 갈래로 나눴어요. <em>할 수 없다, 해도 막힌다, 하지 않는다</em>, 그리고 더 믿을 만한 판단에 맡긴다예요.' },
        { t: 6.5, text: '이 갈래를 엮어 배포해도 되는지 판단할 근거로 써요. 모델이 강해질수록 "할 수 없다"는 못 쓰니, 막는 장치와 믿을 근거를 더 보여 줘야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 280, pose: 'point' });
        stage.append(q.el);
        const cards = [
          ['능력 없음', '할 수 없다', 'ink'],
          ['통제', '해도 막힌다', 'aqua'],
          ['신뢰', '하지 않는다', 'aqua'],
          ['위임', '믿을 판단에 맡김<br>먼 미래 이야기', '']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 340 + i * 218, y: 120, w: 200, h: 200, label, sub, accent });
          tl.at(stage.appendChild(b.el), .4 + i * 1.1, { from: 'up' });
          return b;
        });
        const grow = P.arrow(lines, { x1: 350, y1: 360, x2: 1190, y2: 360, width: 4, color: '#F2812D' });
        const chip = P.chip({ x: 340, y: 390, text: '모델이 강해질수록 "할 수 없다"는 못 써요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 7.6, { from: 'pop' });
        const final = P.text({ x: 340, y: 470, w: 860, text: '그래서 <em>통제</em>와 <em>신뢰</em>의 증거가 더 필요해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 9);
            cards.forEach((b, i) => b.on(t > .4 + i * 1.1 && t < 6.5 ? true : (t > 9.4 && (i === 1 || i === 2))));
            grow.draw(P.clamp((t - 6.8) / .8, 0, 1));
          }
        };
      }
    },
    {
      title: '누가 검사하나', dur: 14,
      captions: [
        { t: 0, text: '문서를 쓴 팀이 스스로 채점하면 믿기 어렵죠. 그래서 다른 팀이 실패를 가정하고 원인을 적는 <em>반대 의견서(프리모템)</em>를 쓰고, 책임자마다 거부권을 줘요.' },
        { t: 5, text: '9월 18일 발표에서는 외부 평가자가 <em>직원과 비슷한 접근권</em>으로 회사 안에서 학습을 지켜보고 레드팀 시험을 해요. <em>레드팀</em>은 공격자 역할을 맡아 일부러 약점을 찾는 시험이에요.' },
        { t: 10, text: '9월 22일 OpenAI 글도 제3자 평가에서 가장 먼저 할 일로 안전성 논증 독립 평가를 꼽았어요. 다만 독립 평가 비용을 누가 댈지 정한 제도는 아직 없어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 280, pose: 'base' });
        stage.append(q.el);
        const ring = (x, y, w, hh, dashed) => P.h('div', { class: 'sc-ring', style: `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${hh}px;border-radius:50%;border:3px ${dashed ? 'dashed' : 'solid'} #9AA5AF;box-sizing:border-box;pointer-events:none` });
        const outer = ring(380, 100, 820, 460, true);
        const mid = ring(500, 170, 580, 320, false);
        const inner = ring(625, 245, 330, 170, false);
        tl.at(stage.appendChild(outer), 10.2, { from: 'pop' });
        tl.at(stage.appendChild(mid), 5.2, { from: 'pop' });
        tl.at(stage.appendChild(inner), .3, { from: 'pop' });
        const tIn = P.text({ x: 640, y: 296, w: 300, text: '반대 의견서<br><i>책임자 거부권</i>', size: 22, weight: 800, align: 'center' });
        const tMid = P.text({ x: 560, y: 190, w: 460, text: '회사 안에 들어온 외부 평가자', size: 20, weight: 700, align: 'center' });
        const tOut = P.text({ x: 590, y: 116, w: 400, text: '제3자 평가 · 독립 평가', size: 20, weight: 700, align: 'center' });
        tl.at(stage.appendChild(tIn.el), .5, { from: 'up' });
        tl.at(stage.appendChild(tMid.el), 5.4, { from: 'up' });
        tl.at(stage.appendChild(tOut.el), 10.4, { from: 'up' });
        const red = P.chip({ x: 640, y: 590, text: '레드팀 = 일부러 약점을 찾는 공격 역할', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(red.el), 7.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '학교에 AI 도구를 들일 때도 이 세 칸을 물어보세요. 무엇이 안전하다는 건지, 누가 시험했는지, 무엇은 못 막는지예요.' },
        { t: 6.5, text: '"안전합니다" 한 줄보다 <em>"이건 못 막아요"</em>를 솔직히 적은 문서가 더 믿을 만해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['주장', '무엇이 안전하다는 건가', 'ink', P.ICON.doc],
          ['근거', '누가, 무엇으로 시험했나', 'aqua', P.ICON.search],
          ['남은 위험', '무엇은 못 막나', 'orange', P.ICON.x]
        ].map(([label, sub, accent, icon], i) => {
          const b = P.box({ x: 370 + i * 270, y: 170, w: 250, h: 220, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 370, y: 450, w: 790, text: '<em>"이건 못 막아요"</em>를 적은 문서가 더 믿을 만해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            items.forEach((b, i) => b.on(t > .4 + i * 1.6));
          }
        };
      }
    }
  ],

  interaction: {
    title: '안전성 논증 짓기',
    desc: '맨 위 주장은 <b>"우리 반 글쓰기 도우미 AI는 5학년이 쓰기에 안전하다"</b>예요. 아래 카드를 눌러 논증 나무의 칸에 붙이거나 떼고, <b>반대 의견서 받기(프리모템)</b>를 눌러 구멍을 찾아보세요. 반론이 0개가 되면 통과예요. 가상의 학급 도구로 만든 예시예요. 실제 안전성 논증은 훨씬 길고, 외부 평가자가 근거를 직접 확인해요.',
    mount(el, P) {
      const SLOTS = ['행동', '울타리', '감시', '남은 위험'];
      const CARDS = [
        { id: 0, text: '외부 기관 레드팀 결과 보고서', kind: '증거', slot: '행동' },
        { id: 1, text: '학년별 설정을 미리 시험한 기록', kind: '증거', slot: '울타리' },
        { id: 2, text: '교사가 2주 시범 사용한 기록', kind: '증거', slot: '행동' },
        { id: 3, text: '대화 기록 보관과 사고 신고 절차', kind: '증거', slot: '감시' },
        { id: 4, text: "'안전 인증' 홍보 배지", kind: '주장뿐', slot: '울타리' },
        { id: 5, text: "대표의 '안전합니다' 인터뷰", kind: '주장뿐', slot: '행동' },
        { id: 6, text: '다른 학교도 쓴다는 소문', kind: '주장뿐', slot: '감시' },
        { id: 7, text: '못 막는 위험 목록(예: 사실과 다른 답)', kind: '증거', slot: '남은 위험' }
      ];
      const on = new Set();
      let checked = false;

      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '반대 의견서 받기(프리모템)');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');
      const count = P.h('span', { class: 'sim-count' });
      const claim = P.h('div', { class: 'sim-claim' }, '주장: 우리 반 글쓰기 도우미 AI는 5학년이 쓰기에 안전하다');
      const tree = P.h('div', { class: 'sim-tree' });
      const deck = P.h('div', { class: 'sim-deck' });
      const out = P.h('div', { class: 'sim-out' }, P.h('div', { class: 'sim-ph' }, '반대 의견서를 받으면 반론이 여기 나와요.'));

      const cardEls = CARDS.map(c => {
        const b = P.h('button', { class: 'sim-card', type: 'button', 'aria-pressed': 'false' },
          P.h('span', { class: 'sim-card-t' }, c.text),
          P.h('span', { class: 'sim-card-tag' }, `${c.slot} 칸`));
        b.addEventListener('click', () => { if (on.has(c.id)) on.delete(c.id); else on.add(c.id); render(); });
        deck.append(b);
        return b;
      });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-bar' }, runBtn, resetBtn, count),
        claim, tree,
        P.h('div', { class: 'sim-h' }, '근거 카드 (눌러서 붙이기·떼기)'), deck,
        P.h('div', { class: 'sim-h' }, '반대 의견서'), out
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-count{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-claim{border:1px solid var(--line);border-left:5px solid var(--ink,#1B1F24);border-radius:12px;padding:10px 12px;font-weight:700;font-size:14px;background:var(--paper);word-break:keep-all}
        .sim-tree{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;max-width:100%}
        .sim-slot{border:1px dashed var(--line);border-radius:12px;padding:8px 10px;min-height:64px;font-size:12px;word-break:keep-all}
        .sim-slot.fill{border-style:solid;border-color:var(--acc1,#127E90)}
        .sim-slot-h{font-weight:700;font-size:13px;margin-bottom:4px}
        .sim-slot-i{margin:2px 0;color:var(--muted)}
        .sim-h{font-size:13px;font-weight:700;color:var(--muted)}
        .sim-deck{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;max-width:100%}
        .sim-card{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:var(--paper);font:inherit;font-size:13px;cursor:pointer;word-break:keep-all;min-width:0}
        .sim-card[aria-pressed=true]{border-color:var(--acc1,#127E90);box-shadow:0 0 0 2px color-mix(in srgb,var(--acc1,#127E90) 25%,transparent)}
        .sim-card-tag{font-size:11px;color:var(--muted)}
        .sim-out{display:flex;flex-direction:column;gap:6px;min-height:40px}
        .sim-ph{color:var(--muted);font-size:13px}
        .sim-obj{border:1px solid var(--acc2,#F2812D);border-radius:10px;padding:8px 10px;font-size:13px;word-break:keep-all}
        .sim-pass{border:1px solid var(--acc1,#127E90);border-radius:10px;padding:8px 10px;font-size:13px;font-weight:700;color:var(--acc1,#127E90)}
      ` }));

      function objections() {
        const list = [];
        SLOTS.forEach(s => {
          const ev = CARDS.filter(c => on.has(c.id) && c.slot === s && c.kind === '증거');
          if (!ev.length) list.push(s === '남은 위험' ? '못 막는 위험을 적지 않았어요.' : `${s} 칸에 근거가 없어요.`);
        });
        CARDS.filter(c => on.has(c.id) && c.kind === '주장뿐').forEach(c => list.push(`"${c.text}"는 증거가 아니라 말이에요.`));
        return list;
      }
      function render() {
        count.textContent = `붙인 카드 ${on.size}장`;
        cardEls.forEach((b, i) => b.setAttribute('aria-pressed', on.has(CARDS[i].id) ? 'true' : 'false'));
        tree.innerHTML = '';
        SLOTS.forEach(s => {
          const items = CARDS.filter(c => on.has(c.id) && c.slot === s);
          const box = P.h('div', { class: 'sim-slot' + (items.length ? ' fill' : '') }, P.h('div', { class: 'sim-slot-h' }, s + ' 칸'));
          if (!items.length) box.append(P.h('div', { class: 'sim-slot-i' }, '비어 있어요'));
          items.forEach(c => box.append(P.h('div', { class: 'sim-slot-i' }, '· ' + c.text)));
          tree.append(box);
        });
        if (!checked) return;
        out.innerHTML = '';
        const list = objections();
        if (!list.length) out.append(P.h('div', { class: 'sim-pass' }, '논증 통과: 이제 바깥 평가자에게 보내요.'));
        else list.forEach((m, i) => out.append(P.h('div', { class: 'sim-obj' }, `반론 ${i + 1}. ${m}`)));
      }
      runBtn.addEventListener('click', () => { checked = true; render(); });
      resetBtn.addEventListener('click', () => { on.clear(); checked = false; out.innerHTML = ''; out.append(P.h('div', { class: 'sim-ph' }, '반대 의견서를 받으면 반론이 여기 나와요.')); render(); });
      render();
    }
  },

  teacherLines: [
    '"안전합니다"는 주장일 뿐이에요. <b>누가, 무엇으로 시험했는지</b>가 붙어야 증거예요.',
    '믿을 만한 안전 문서는 <b>"이건 못 막아요"</b>도 솔직하게 적어요.'
  ],
  tip: {
    body: 'AI 에듀테크 도입을 검토할 때 업체 자료에서 세 가지를 찾아 표시해 보세요. ① 안전 주장이 무엇인지(대상 학년·용도) ② 그 근거를 누가 만들었는지(자체 시험/외부 기관) ③ 남은 위험과 사고 대응 절차가 적혀 있는지. <b>셋째 칸이 비어 있으면</b> 질문 목록에 올려요.',
    extra: '학생 토론에서 "주장, 근거, 반론" 구조를 가르칠 때 안전성 논증을 실제 예로 써 보세요. 다른 모둠이 반대 의견서를 써 주는 "프리모템" 활동으로 바꾸면 비판적 읽기 연습이 돼요.'
  },
  myth: {
    myth: '회사가 자체 시험을 많이 했다고 하면 안전한 것이다.',
    fact: '안전성 논증은 주장마다 증거를 붙이고, 다른 팀의 반론과 외부 평가를 거쳐요. 회사 안에 외부 평가자를 들이는 방식도 나왔지만, 독립 평가 비용을 대는 제도는 아직 정해지지 않았어요.'
  },
  sources: [
    { title: 'Towards safety cases for frontier AI training (OpenAI, 2026-09-28)', url: 'https://openai.com/index/towards-safety-cases-for-frontier-ai-training', note: '학습을 계속하기 전 안전성 논증을 지향점으로 제시. 정렬·격리·감시, 프리모템, 거부권, 일시정지, 감사인 접근, 잔여 위험 목록.' },
    { title: 'Priorities and principles for effective third party assessments (OpenAI, 2026-09-22)', url: 'https://openai.com/index/priorities-principles-third-party-assessments', note: '안전 주장·안전성 논증 용어 정의. 제3자 평가의 첫 우선순위는 안전성 논증의 독립 평가.' },
    { title: 'Anthropic × Accenture embedded evaluation (Anthropic, 2026-09-18)', url: 'https://www.anthropic.com/news/accenture-embedded-evaluation', note: '평가자가 직원과 비슷한 접근권으로 회사 안에서 학습을 지켜보는 내장형 평가. 독립 평가 재원 제도는 아직 없다고 밝힘.' },
    { title: 'Safety Cases: How to Justify the Safety of Advanced AI Systems (arXiv 2403.10462, 2024)', url: 'https://arxiv.org/abs/2403.10462', note: '안전성 논증의 네 갈래: 능력 없음, 통제, 신뢰성, 위임.' }
  ],
  script: `9월 18일부터 30일 사이, AI 안전을 증명하는 방법을 다룬 소식이 셋 나왔어요. Anthropic은 Accenture와 함께 회사 안에 들어가 지켜보는 외부 평가를, OpenAI는 학습 단계의 안전성 논증 지침을 발표했고, 과학기술정보통신부는 민·관이 함께 국가 AI 안전 종합계획을 세운다고 했어요.

안전성 논증은 큰 주장을 작은 주장으로 나누고 주장마다 증거를 붙인 문서예요. 지침은 정렬, 격리, 감시 세 축의 근거를 갖추고, 못 막은 위험도 적자고 해요. 2024년 연구는 주장을 할 수 없다, 해도 막힌다, 하지 않는다, 믿을 판단에 맡긴다의 네 갈래로 나눴어요.

검사는 바깥으로 넓혀 가요. 다른 팀이 반대 의견서를 쓰고, 외부 평가자가 회사 안에서 레드팀 시험을 해요. 다만 독립 평가 비용을 대는 제도는 아직 없어요.

학교에서도 주장, 근거, 남은 위험 세 칸을 물어보세요.`
};
