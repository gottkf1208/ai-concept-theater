/* E23 [B] 검색을 켜면 뭐가 달라질까: 웹 검색 도구와 출처 (시즌 4) */
export default {
  slug: 's4-search',
  track: 'B',
  title: '검색을 켜면 뭐가 달라질까',
  subtitle: '웹 검색 도구와 출처',
  summary: '지식 마감 때문에 AI가 작년 숫자를 확신에 차 답할 수 있어요. 검색을 켜면 무엇이 달라지고, 그래도 왜 링크를 눌러야 하는지까지 짚어봤어요.',
  keywords: ['웹 검색', '검색 도구', '출처', '지식 마감', 'RAG', '1차 자료'],

  scenes: [
    {
      title: '작년 숫자, 확신에 찬 답', dur: 13,
      captions: [
        { t: 0, text: '"올해 학교 안전 교육 의무 시수가 몇 시간이죠?" 물었더니...' },
        { t: 5, text: 'AI가 <em>작년 숫자</em>를 확신에 찬 말투로 답했어요. (가상의 예)' },
        { t: 9, text: '검색 기능을 켜니 <em>출처 링크</em>가 달린 답이 왔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 300, y: 90, w: 540, text: '"올해 학교 안전 교육 의무 시수가<br>몇 시간이죠?"', tail: 'left' });
        tl.at(stage.appendChild(ask.el), .4, { from: 'left' });
        const offBox = P.box({ x: 330, y: 240, w: 380, h: 130, label: '검색 꺼짐', sub: '"작년처럼 OO시간이에요"<br>(가상의 예)', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(offBox.el), 1.8, { from: 'pop' });
        const onBox = P.box({ x: 760, y: 240, w: 430, h: 150, label: '검색 켜짐', sub: '"올해 기준 △△시간이에요"', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(onBox.el), 4.6, { from: 'right' });
        const cite = P.chip({ x: 800, y: 410, text: '출처 [1] 교육청 공문', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(cite.el), 6.2, { from: 'pop' });
        const arrow = P.arrow(lines, { x1: 940, y1: 390, x2: 900, y2: 408, width: 3, color: '#127E90' });
        const note = P.text({ x: 330, y: 560, w: 820, text: '실제 시수는 학교급·연도마다 달라요. 여기선 예시예요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 8, { from: 'up' });
        let curPose = 'oops';
        return {
          tick(t) {
            const want = t > 9 ? 'point' : 'oops';
            if (want !== curPose) { curPose = want; q.pose(want); }
            q.tick(t, t < 5 || t > 9);
            offBox.on(t > 1.8 && t < 4.6 && Math.floor(t * 2) % 2 === 0);
            arrow.draw(P.clamp((t - 6.4) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '검색이 필요하다는 판단', dur: 14,
      captions: [
        { t: 0, text: '모델은 <em>학습이 끝난 시점</em>까지의 지식만 갖고 있어요. 이걸 <em>지식 마감</em>이라고 해요.' },
        { t: 5, text: '검색 도구를 켜면 모델이 <em>"검색이 필요하다"</em>고 판단해서 검색을 실행해요.' },
        { t: 10, text: '결과를 읽고 <em>출처</em>를 달아 답해요 — <i>6화 RAG</i>의 실시간 판이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'think' });
        stage.append(q.el);
        const know = P.box({ x: 60, y: 100, w: 300, h: 110, label: '학습한 지식', sub: '특정 시점까지만(지식 마감)', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(know.el), .4, { from: 'up' });
        const steps = [
          { l: '판단', s: '"검색이 필요해"', acc: 'ink', icon: P.ICON.eye },
          { l: '검색 실행', s: '자료를 찾아요', acc: 'aqua', icon: P.ICON.search },
          { l: '결과 읽기', s: '찾은 자료를 읽어요', acc: 'aqua', icon: P.ICON.doc },
          { l: '출처 달아 답', s: '근거를 밝혀요', acc: 'orange', icon: P.ICON.check }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 290, w: 260, h: 110, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), 2 + i * 1.6, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 345, x2: 360 + i * 300, y2: 345, width: 5, color: '#1B1F24' }));
        const link = P.text({ x: 300, y: 470, w: 900, text: '자료를 찾아 답하는 방식 — <i>6화 RAG</i>의 실시간 판이에요.', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(link.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (2.6 + i * 1.6)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > 2 + i * 1.6 && t < 3.8 + i * 1.6));
          }
        };
      }
    },
    {
      title: '언제 검색하나', dur: 13,
      captions: [
        { t: 0, text: '늘 검색하는 건 아니에요. <em>최신·변하는 정보</em>(공문·일정·가격)는 검색해요.' },
        { t: 5, text: '<em>안정된 지식</em>(수학 개념 같은 것)은 바로 답해요. 공식 문서가 그렇게 안내해요.' },
        { t: 9.5, text: '이 기준, <em>서비스마다 조금씩 갈려요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 280, pose: 'point' });
        stage.append(q.el);
        const leftBox = P.box({ x: 330, y: 120, w: 380, h: 130, label: '최신·변하는 정보', sub: '공문 · 학사일정 · 가격', accent: 'aqua', icon: P.ICON.search });
        tl.at(stage.appendChild(leftBox.el), .5, { from: 'left' });
        const rightBox = P.box({ x: 330, y: 320, w: 380, h: 130, label: '안정된 지식', sub: '수학 개념 같은 것', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(rightBox.el), 3, { from: 'left' });
        const searchOut = P.box({ x: 790, y: 120, w: 400, h: 130, label: '검색해서 답해요', sub: '', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(searchOut.el), 1.4, { from: 'right' });
        const directOut = P.box({ x: 790, y: 320, w: 400, h: 130, label: '바로 답해요', sub: '', accent: '', icon: P.ICON.check });
        tl.at(stage.appendChild(directOut.el), 3.9, { from: 'right' });
        const arrow1 = P.arrow(lines, { x1: 710, y1: 185, x2: 790, y2: 185, width: 5, color: '#127E90' });
        const arrow2 = P.arrow(lines, { x1: 710, y1: 385, x2: 790, y2: 385, width: 5, color: '#1B1F24' });
        const note = P.text({ x: 330, y: 560, w: 860, text: '이 기준, <em>서비스마다 갈려요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            arrow1.draw(P.clamp((t - .9) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 3.4) / .5, 0, 1));
            leftBox.on(t < 5);
            rightBox.on(t >= 5 && t < 9.5);
          }
        };
      }
    },
    {
      title: '검색을 켜도 남는 문제', dur: 13,
      captions: [
        { t: 0, text: '검색을 켜도 문제는 남아요. 검색 결과 자체가 <em>광고</em>이거나 <em>오래된 글</em>일 수 있어요.' },
        { t: 5, text: '심지어 <em>잘못된 글</em>이 검색될 수도 있어요.' },
        { t: 9.5, text: '그래서 출처의 <em>누가·언제·1차인가</em>를 봐야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 280, pose: 'oops' });
        stage.append(q.el);
        const resultBox = P.box({ x: 340, y: 130, w: 440, h: 130, label: '검색 결과', sub: '"학원 이벤트, 지금 등록하세요!"', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(resultBox.el), .5, { from: 'up' });
        const problems = ['광고', '오래된 글', '잘못된 글'].map((c, i) => {
          const chip = P.chip({ x: 340 + i * 190, y: 300, text: c, color: 'orange', size: 24 });
          tl.at(stage.appendChild(chip.el), 2 + i * 1.3, { from: 'pop' });
          return chip;
        });
        const checks = ['누가', '언제', '1차인가'].map((c, i) => {
          const chip = P.chip({ x: 340 + i * 190, y: 420, text: c, color: 'aqua', size: 24 });
          tl.at(stage.appendChild(chip.el), 7.4 + i * .6, { from: 'pop' });
          return chip;
        });
        const arrow = P.arrow(lines, { x1: 500, y1: 340, x2: 500, y2: 410, width: 3, color: '#9AA5AF', dashed: true, head: true });
        const note = P.text({ x: 340, y: 500, w: 800, text: '출처의 <em>누가·언제·1차인가</em>를 확인하는 습관이 필요해요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrow.draw(P.clamp((t - 6.6) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '할 일: 1차 출처와 확인', dur: 13,
      captions: [
        { t: 0, text: '<em>교육청·법령·학교 공문</em>처럼 1차 출처를 우선하세요.' },
        { t: 5, text: '인용 <em>링크를 눌러</em> 원문을 확인하고, <em>날짜</em>를 보세요.' },
        { t: 9.5, text: 'AI가 찾아 준 링크도 <em>눌러서 봐야</em> 진짜 확인이 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 300, pose: 'wave' });
        stage.append(q.el);
        const items = [
          { l: '1차 출처 우선', s: '교육청 · 법령 · 학교 공문', acc: 'aqua', icon: P.ICON.doc },
          { l: '링크 눌러 원문 확인', s: '요약만 보고 믿지 않기', acc: 'ink', icon: P.ICON.click },
          { l: '날짜 확인', s: '지금도 유효한 정보인지', acc: 'orange', icon: P.ICON.check }
        ];
        const boxes = items.map((it, i) => {
          const b = P.box({ x: 380, y: 100 + i * 150, w: 460, h: 120, label: it.l, sub: it.s, accent: it.acc, icon: it.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.5, { from: 'right' });
          return b;
        });
        const line = P.bubble({ x: 380, y: 570, w: 700, text: '"AI가 찾아 준 링크도 <b>눌러서 봐야</b> 진짜 확인이야."', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(line.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.5 && t < 5.5));
          }
        };
      }
    }
  ],

  interaction: {
    title: '검색 결과 신뢰 등급 매기기',
    desc: '가상의 검색 결과 카드 6장을 보고 <b>신뢰 등급</b>(높음/중간/낮음)을 골라 보세요. 골라 보고 이유를 확인해요. <b>기준 보기</b>를 누르면 판단 기준 4가지가 펼쳐져요.',
    mount(el, P) {
      const CARDS = [
        { domain: '교육청 공식 사이트', label: '교육청 공문', date: '2026년', kind: '1차(발행 기관 본인)', grade: 'high', reason: '교육청이 직접 낸 공문이에요. 발행 기관 본인 글(1차)이고, 날짜도 올해예요.' },
        { domain: '학교 홈페이지', label: '학교 홈페이지 공지', date: '2024년', kind: '1차(학교 본인)', grade: 'mid', reason: '학교가 직접 올린 1차 자료지만 2년 지났어요. 지금도 유효한지 최신 공지와 대조해 보세요.' },
        { domain: '개인 블로그', label: '학부모 블로그 후기', date: '표시 없음', kind: '2차(경험담)', grade: 'low', reason: '작성자와 시점을 알기 어려운 개인 후기예요. 참고는 되어도 근거로 쓰기엔 약해요.' },
        { domain: '언론사 보도', label: '뉴스 기사', date: '2025년', kind: '2차(취재)', grade: 'mid', reason: '취재를 거친 2차 자료예요. 기사 속 원 발표(공문·보도자료)를 다시 확인하면 더 좋아요.' },
        { domain: '학원 홍보 페이지', label: '학원 이벤트 안내', date: '2026년', kind: '2차(홍보)', grade: 'low', reason: '날짜는 최신이지만 목적이 홍보예요. "왜 썼나"를 보면 판매·유치가 목적이에요.' },
        { domain: '위키 사이트', label: '위키 항목', date: '수시 수정', kind: '2차(집단 편집)', grade: 'low', reason: '누구나 고칠 수 있어 작성자를 특정하기 어려워요. 출발점으로만 쓰고 원 출처를 따로 확인하세요.' }
      ];
      const GRADES = [['high', '높음'], ['mid', '중간'], ['low', '낮음']];
      const CRITERIA = [
        { t: '누가', d: '기관·전문가인지, 개인인지, 작성자를 알 수 없는지 봐요.' },
        { t: '언제', d: '오늘 기준으로 최신인지, 오래돼 바뀌었을 수 있는지 날짜를 봐요.' },
        { t: '1차인가', d: '발행 기관이 직접 낸 글인지, 남이 옮기거나 요약한 글인지 봐요.' },
        { t: '왜 썼나', d: '정보를 알리려는 글인지, 광고·홍보가 목적인 글인지 봐요.' }
      ];
      let showCriteria = false;
      const answers = new Array(CARDS.length).fill(null);

      const critBtn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '기준 보기');
      const scoreEl = P.h('p', { class: 'sim-score', 'aria-live': 'polite' });
      const critPanel = P.h('div', { class: 'sim-crit', hidden: '' });
      const grid = P.h('div', { class: 'sim-grid' });
      el.append(P.h('div', { class: 'sim-bar' }, critBtn, scoreEl), critPanel, grid);
      const style = P.h('style', { html: `
        .sim-bar{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
        .sim-score{margin:0;font-weight:800;font-family:var(--mono);font-size:14px;color:var(--muted)}
        .sim-crit{margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
        .sim-crit .c{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--paper)}
        .sim-crit .c b{display:block;color:var(--aqua-strong,#127E90);font-size:14.5px;margin-bottom:4px}
        .sim-crit .c span{font-size:13.5px;color:var(--muted);line-height:1.5}
        .sim-grid{margin-top:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
        .sim-card{border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);min-width:0;max-width:100%}
        .sim-card.done.right{border-color:var(--aqua)}
        .sim-card.done.wrong{border-color:var(--orange)}
        .sim-card .meta{display:flex;flex-wrap:wrap;gap:6px;font-size:12.5px;color:var(--muted);margin-bottom:8px}
        .sim-card .meta span{border:1px solid var(--line);border-radius:999px;padding:2px 8px}
        .sim-card h4{margin:0 0 10px;font-size:16px}
        .sim-grades{display:flex;gap:6px;flex-wrap:wrap}
        .sim-grades button{border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-weight:700;font-size:13px;background:#fff;color:var(--muted);max-width:100%}
        .sim-grades button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-fb{margin:10px 0 0;font-size:13.5px;line-height:1.6;min-height:1.6em}
        .sim-fb.right{color:var(--aqua-strong,#127E90)}
        .sim-fb.wrong{color:var(--orange-strong,#B3520F)}
      ` });
      el.append(style);

      const render = () => {
        critBtn.textContent = showCriteria ? '기준 숨기기' : '기준 보기';
        critBtn.setAttribute('aria-pressed', showCriteria ? 'true' : 'false');
        critPanel.hidden = !showCriteria;
        critPanel.replaceChildren(...CRITERIA.map(c => P.h('div', { class: 'c' }, P.h('b', {}, c.t), P.h('span', {}, c.d))));
        const correct = answers.filter((a, i) => a === CARDS[i].grade).length;
        scoreEl.textContent = `맞힌 개수: ${correct} / ${CARDS.length}`;
        grid.replaceChildren(...CARDS.map((card, i) => {
          const chosen = answers[i];
          const isRight = chosen === card.grade;
          const gradeBtns = GRADES.map(([val, label]) => {
            const b = P.h('button', { type: 'button', 'aria-pressed': chosen === val ? 'true' : 'false' }, label);
            b.addEventListener('click', () => { answers[i] = val; render(); });
            return b;
          });
          const cardEl = P.h('div', { class: `sim-card ${chosen ? 'done ' + (isRight ? 'right' : 'wrong') : ''}` },
            P.h('div', { class: 'meta' }, P.h('span', {}, card.domain), P.h('span', {}, card.date), P.h('span', {}, card.kind)),
            P.h('h4', {}, card.label),
            P.h('div', { class: 'sim-grades' }, ...gradeBtns)
          );
          if (chosen) cardEl.append(P.h('p', { class: `sim-fb ${isRight ? 'right' : 'wrong'}` }, isRight ? `정답이에요. ${card.reason}` : `다시 볼까요. ${card.reason}`));
          return cardEl;
        }));
      };
      critBtn.addEventListener('click', () => { showCriteria = !showCriteria; render(); });
      render();
    }
  },

  teacherLines: [
    '<b>AI가 검색을 켜면</b> 찾아 읽고 출처를 달아 답해요. 그래도 링크는 꼭 눌러 봐요.',
    '출처를 볼 땐 <b>누가, 언제, 처음 쓴 글인가</b>를 봐요.'
  ],
  tip: {
    body: '공문·일정·가격처럼 <b>최신·변하는 정보</b>는 검색을 켜고, 답에 달린 출처 중 <b>1차 자료(교육청·법령·학교 공문)</b>를 우선 확인하세요.',
    extra: '링크를 눌러 원문의 날짜까지 보는 습관이 검색 기능보다 더 중요해요.'
  },
  myth: {
    myth: '검색을 켜면 항상 최신·정확하다.',
    fact: '검색 결과 자체가 틀리거나 오래됐을 수 있어요. 출처의 누가·언제·1차 여부를 봐야 해요.'
  },
  sources: [
    { title: 'Claude 문서 — Web search tool', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool', note: '모델이 언제 검색을 실행하는지, 결과에 인용(출처)을 붙이는 방식을 설명해요.' },
    { title: 'Gao et al. 2023 — Retrieval-Augmented Generation for Large Language Models: A Survey', url: 'https://arxiv.org/abs/2312.10997', note: '모델의 지식 마감·오래된 지식 문제를 검색으로 보완하는 방식을 정리한 서베이예요.' }
  ],
  script: `
"올해 학교 안전 교육 의무 시수가 몇 시간이죠?" 이렇게 물었는데, AI가 작년 숫자를 확신에 찬 말투로 답한 적 있으실 거예요. 검색 기능을 켜면 답이 달라져요. 링크가 달린 출처와 함께 와요.

모델은 학습이 끝난 시점까지의 지식만 갖고 있어요. 이걸 지식 마감이라고 해요. 검색 도구를 켜면 모델이 "지금은 검색이 필요하다"고 판단해서 검색을 실행하고, 결과를 읽은 뒤 출처를 달아 답해요. 6화에서 본 RAG, 자료를 붙여 답하는 방식의 실시간 판이에요.

그렇다고 늘 검색하는 건 아니에요. 공문·일정·가격처럼 최신·변하는 정보는 검색하고, 수학 개념처럼 안정된 지식은 바로 답해요. 판단 기준은 서비스마다 조금씩 달라요.

검색을 켜도 문제는 남아요. 검색 결과 자체가 광고나 오래된 글, 심지어 잘못된 글일 수 있거든요. 그래서 출처를 볼 때 누가, 언제, 원문(1차)인지를 봐야 해요.

교육청 공문이나 법령처럼 1차 출처를 먼저 확인하고, 인용 링크를 눌러 원문과 날짜를 확인하세요. 링크까지 눌러 봐야 진짜 확인이 되는 거니까요.
`
};
