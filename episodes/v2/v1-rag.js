/* v1-rag [S1] 자료를 붙여 주면 왜 덜 틀릴까: RAG, 청크, 임베딩 검색 */
export default {
  slug: 'v1-rag',
  track: 'S1',
  title: '자료를 붙여 주면 왜 덜 틀릴까?',
  subtitle: 'RAG, 청크와 임베딩 검색',
  summary: '규정 문서를 붙여 주면 AI가 덜 틀려요. 문서를 조각(청크)으로 자르고, 뜻을 숫자 좌표(임베딩)로 바꿔 질문과 가까운 조각을 찾아 함께 넣는 RAG의 원리와, 그래도 출처를 눌러 봐야 하는 이유를 담았어요.',
  keywords: ['RAG', '검색 증강 생성', '청크', '임베딩', '벡터', '의미 검색', '인용', '근거', '출처 확인'],

  scenes: [
    {
      title: '자료 없이 물으면', dur: 13,
      captions: [
        { t: 0, text: '"우리 학교 현장체험학습 규정에서 <em>인솔 교사 비율</em>이 어떻게 되죠?"' },
        { t: 5, text: '자료 없이 물으면 AI는 <em>그럴듯한 숫자를 지어낼 수 있어요</em>. 4편에서 본 할루시네이션이에요.' },
        { t: 9.5, text: '확신에 찬 말투라고 맞는 답은 아니에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 300, y: 100, w: 540, text: '"현장체험학습 규정에서<br><b>인솔 교사 비율</b>이 어떻게 되죠?"', tail: 'left' });
        tl.at(stage.appendChild(ask.el), .4, { from: 'left' });
        const model = P.box({ x: 340, y: 300, w: 280, h: 110, label: 'AI 모델', sub: '자료 없이, 기억만으로', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), 1.6, { from: 'pop' });
        const arrowIn = P.arrow(lines, { x1: 620, y1: 190, x2: 500, y2: 300, color: '#1B1F24', width: 4 });
        const answer = P.box({ x: 680, y: 290, w: 460, h: 130, label: '"학생 20명당 교사 1명 정도예요"', sub: '출처 없음 · 확인 안 됨', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(answer.el), 3, { from: 'pop' });
        const arrowOut = P.arrow(lines, { x1: 620, y1: 350, x2: 680, y2: 355, color: '#F2812D', width: 4 });
        const chip = P.chip({ x: 340, y: 460, text: '할루시네이션', color: 'orange', size: 26 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const note = P.text({ x: 340, y: 520, w: 700, text: '4편에서 본 그 이유, <em>그럴듯하지만 사실이 아닌</em> 답이에요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 6.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 6.2 && t < 9.5));
            arrowIn.draw(P.clamp((t - 1.2) / .6, 0, 1));
            arrowOut.draw(P.clamp((t - 2.7) / .6, 0, 1));
            answer.on(t > 3);
          }
        };
      }
    },
    {
      title: 'RAG의 흐름', dur: 14,
      captions: [
        { t: 0, text: '그래서 쓰는 방법이 <em>RAG</em>, 검색 증강 생성이에요. 질문이 오면 먼저 자료에서 관련 조각을 찾아요.' },
        { t: 5.5, text: '찾은 조각을 질문과 함께 책상(컨텍스트 창)에 올리면, 모델은 기억 대신 그 조각을 보고 답하고 <em>출처</em>를 달아요.' },
        { t: 11, text: '2020년 연구가 이 구조를 처음 제안했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 480, size: 230, pose: 'point' });
        stage.append(q.el);
        const steps = [
          { l: '질문', s: '"인솔 교사 비율은?"', acc: 'ink', icon: P.ICON.doc },
          { l: '검색', s: '관련 조각 찾기', acc: 'aqua', icon: P.ICON.search },
          { l: '조각 + 질문', s: '컨텍스트 창에 함께', acc: 'aqua', icon: P.ICON.plug },
          { l: '답변 + 출처', s: '근거를 달아 답하기', acc: 'orange', icon: P.ICON.check }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 90, w: 260, h: 120, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.5, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 150, x2: 360 + i * 300, y2: 150, width: 5, color: '#1B1F24' }));
        const label = P.text({ x: 60, y: 260, w: 1160, text: '질문 → 검색 → 조각과 함께 투입 → 근거 있는 답', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label.el), 6.4, { from: 'up' });
        const paper = P.chip({ x: 60, y: 330, text: 'Lewis 외, 2020년 연구', color: 'gray', size: 20 });
        tl.at(stage.appendChild(paper.el), 11.2, { from: 'pop' });
        const final = P.text({ x: 60, y: 400, w: 900, text: '모델은 <em>기억</em> 대신 눈앞의 <em>조각</em>을 보고 답해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 7.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 11);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.5 + i * 1.5)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.5));
          }
        };
      }
    },
    {
      title: '조각 찾기: 청크와 임베딩', dur: 14,
      captions: [
        { t: 0, text: '문서는 먼저 <em>청크</em>라는 문단 조각으로 잘려요. 각 조각은 뜻을 담은 숫자 좌표, <em>임베딩</em>으로 바뀌어요.' },
        { t: 5.5, text: '질문도 좌표로 바꾸고, 가장 가까운 조각을 골라요. 단어가 같지 않아도 뜻이 비슷하면 가까워요.' },
        { t: 10.5, text: '실제로는 숫자가 수천 개인 공간이에요. 한 임베딩 모델은 기본 3072차원을 써요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const chunkLabels = ['① 인솔 인원', '② 위험 활동', '③ AI 활용 동의', '④ 영상 공유', '⑤ 모자이크', '⑥ 기타 조항'];
        const chunks = chunkLabels.map((t, i) => {
          const c = P.chip({ x: 380, y: 90 + i * 44, text: t, color: i < 2 ? 'aqua' : 'gray', size: 19 });
          tl.at(stage.appendChild(c.el), .3 + i * .4, { from: 'left' });
          return c;
        });
        const plane = P.h('div', { style: 'left:740px;top:90px;width:380px;height:380px;position:absolute;border:2px solid #9AA5AF;border-radius:16px;background:#fff' });
        stage.append(plane);
        const dots = [
          [60, 290, 'aqua'], [95, 250, 'aqua'],
          [300, 60, 'gray'], [330, 110, 'gray'], [310, 150, 'gray'], [255, 95, 'gray']
        ].map(([x, y, c], i) => {
          const d = P.h('div', { style: `position:absolute;left:${x}px;top:${y}px;width:18px;height:18px;border-radius:50%;background:${c === 'aqua' ? '#127E90' : '#9AA5AF'}` });
          plane.append(d);
          tl.at(d, .6 + i * .3, { from: 'pop' });
          return d;
        });
        const star = P.h('div', { style: 'position:absolute;left:70px;top:330px;width:0;height:0;color:#F2812D;font-size:30px;font-weight:800', html: '★' });
        plane.append(star);
        tl.at(star, 5.6, { from: 'pop' });
        const ring = P.h('div', { style: 'position:absolute;left:48px;top:230px;width:90px;height:90px;border-radius:50%;border:3px dashed #F2812D' });
        plane.append(ring);
        tl.at(ring, 6.6, { from: 'pop' });
        const planeLab = P.text({ x: 740, y: 480, w: 380, text: '★ 질문, <i>가까운 점</i>일수록 뜻이 비슷해요', size: 18, weight: 600, cls: 'muted', align: 'center' });
        tl.at(stage.appendChild(planeLab.el), 6.8, { from: 'up' });
        const dim = P.chip({ x: 740, y: 540, text: '예: 기본 3072차원', color: 'orange', size: 20 });
        tl.at(stage.appendChild(dim.el), 10.8, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
          }
        };
      }
    },
    {
      title: '조각이 맥락을 잃으면', dur: 13,
      captions: [
        { t: 0, text: '그런데 "15명당 1명"이라는 조각만 떼어 놓으면, 어느 학교의 무슨 규정인지가 사라져요. 그래서 검색이 놓쳐요.' },
        { t: 5.5, text: '2024년 한 실험은 조각마다 짧은 머리말을 붙여 검색 실패를 크게 줄였어요.' },
        { t: 10, text: '자료가 작으면 아예 통째로 넣는 편이 더 간단해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const before = P.box({ x: 340, y: 100, w: 420, h: 130, label: '청크: "15명당 1명을 기준으로 한다"', sub: '어느 학교? 무슨 조항인지 없음', accent: '', icon: P.ICON.x });
        tl.at(stage.appendChild(before.el), .4, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 1120, y1: 165, x2: 1120, y2: 330, curve: -200, dashed: true, width: 3, color: '#F2812D' });
        const after = P.box({ x: 340, y: 300, w: 480, h: 130, label: '제3조(인솔 인원) 15명당 1명을 기준으로 한다', sub: '머리말이 붙어 조항이 분명해짐', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(after.el), 5.8, { from: 'up' });
        const stat = P.chip({ x: 340, y: 460, text: '검색 실패 5.7% → 2.9%', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(stat.el), 7.8, { from: 'pop' });
        const small = P.text({ x: 340, y: 520, w: 820, text: '지식 베이스가 작으면(약 20만 토큰 이하) 통째로 넣는 편이 간단해요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            arrow.draw(P.clamp((t - 4.4) / .9, 0, 1));
            before.on(t > .4 && t < 5.8);
            after.on(t > 5.8);
          }
        };
      }
    },
    {
      title: '그래도 줄어들 뿐: 출처를 눌러요', dur: 13,
      captions: [
        { t: 0, text: '찾은 자료가 틀렸거나 엉뚱한 조각을 찾으면 답도 틀려요. RAG는 실수를 <em>줄일 뿐</em> 없애지 않아요.' },
        { t: 5, text: '2026년엔 지난 대화를 찾아 주는 기능도 같은 원리로 돌아가요.' },
        { t: 9, text: '그래서 답에 달린 <em>인용을 눌러</em> 원문과 대조하는 습관이 핵심이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const case1 = P.box({ x: 380, y: 100, w: 400, h: 120, label: '자료 자체가 틀렸을 때', sub: '틀린 자료를 그대로 따라가요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(case1.el), .5, { from: 'left' });
        const case2 = P.box({ x: 380, y: 250, w: 400, h: 120, label: '엉뚱한 조각을 찾았을 때', sub: '검색이 빗나가면 답도 빗나가요', accent: 'orange', icon: P.ICON.search });
        tl.at(stage.appendChild(case2.el), 3, { from: 'left' });
        const memo = P.chip({ x: 380, y: 400, text: '지난 대화 검색도 같은 원리', color: 'gray', size: 20 });
        tl.at(stage.appendChild(memo.el), 5.2, { from: 'pop' });
        const cite = P.box({ x: 380, y: 450, w: 400, h: 90, label: '인용 [1] 눌러 원문 확인', sub: '확인은 여전히 우리 몫', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(cite.el), 9.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            case1.on(t > .5 && t < 3);
            case2.on(t > 3 && t < 9.2);
            cite.on(t > 9.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '규정 조각 찾기',
    desc: '질문을 고르고 <b>조각에 머리말 붙이기</b>를 눌러 보세요. 오른쪽 평면의 점은 조각, 별은 질문이에요. 질문과 <b>가까운 조각 2개</b>가 결정적으로 뽑혀 답에 쓰여요. 규정은 실제가 아닌 예시예요.',
    mount(el, P) {
      const QUESTIONS = [
        { label: '체험학습 몇 명당 선생님 한 명?', x: 48, y: 50 },
        { label: 'AI 활용 동의는 누구에게?', x: 77, y: 20 },
        { label: '영상 공유시 초상권 처리는?', x: 82, y: 60 }
      ];
      const CHUNKS = [
        { text: '15명당 1명을 기준으로 한다.', header: '［제3조 인솔 인원］ ', before: { x: 20, y: 75 }, after: { x: 46, y: 52 } },
        { text: '위험도가 높은 활동(수상·설상 등)은 10명당 1명으로 한다.', header: '［제3조 인솔 인원］ ', before: { x: 30, y: 85 }, after: { x: 40, y: 58 } },
        { text: '학생의 학습 결과물에 생성형 AI를 활용하려면 사전에 보호자 동의를 받아야 한다.', header: '', before: { x: 75, y: 15 }, after: { x: 75, y: 15 } },
        { text: '영상·사진을 외부에 공유할 때는 사전 동의를 받은 학생만 노출한다.', header: '', before: { x: 80, y: 55 }, after: { x: 80, y: 55 } },
        { text: '얼굴이 식별되면 모자이크 처리를 원칙으로 한다.', header: '', before: { x: 85, y: 65 }, after: { x: 85, y: 65 } },
        { text: '이 규정에서 정하지 않은 사항은 학교장이 협의회를 거쳐 정한다.', header: '［제9조 기타］ ', before: { x: 45, y: 48 }, after: { x: 15, y: 85 } }
      ];
      let qi = 0, attached = false, hl = -1;

      const qSel = P.h('div', { class: 'sim-qs', role: 'radiogroup', 'aria-label': '질문 고르기' });
      const bar = P.h('div', { class: 'sim-bar' });
      const toggleBtn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '조각에 머리말 붙이기');
      bar.append(toggleBtn);
      const wrap = P.h('div', { class: 'sim-wrap' });
      const plane = P.h('div', { class: 'sim-plane' });
      const answerCard = P.h('div', { class: 'sim-answer' });
      const planeCol = P.h('div', { class: 'sim-planecol' }, plane, P.h('p', { class: 'sim-hint' }, '● 조각 · ★ 질문 · 점선 원 = 가까운 조각 2개'));
      const cols = P.h('div', { class: 'sim-cols' }, answerCard, planeCol);
      const cmp = P.h('p', { class: 'sim-cmp' }, '');
      const srcLabel = P.h('p', { class: 'sim-src-label' }, '예시 자료 — ', P.h('b', {}, '○○초등학교 현장체험학습 운영 규정(예시)'), ' · 실제 규정이 아니에요.');
      const paraList = P.h('ol', { class: 'sim-paras' });
      wrap.append(qSel, bar, cols, cmp, srcLabel, paraList);
      el.append(wrap);
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-qs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-qs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-qs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-cols{display:flex;gap:16px;flex-wrap:wrap}
        .sim-answer{flex:1 1 260px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper)}
        .sim-answer h4{margin:0 0 8px;font-size:14px;color:var(--muted)}
        .sim-answer p{margin:0;font-size:16px;line-height:1.6}
        .sim-foot{border:none;background:none;color:var(--orange-strong,#B3520F);font-weight:800;cursor:pointer;padding:0 2px;font-size:15px}
        .sim-foot:hover, .sim-foot:focus-visible{text-decoration:underline}
        .sim-planecol{flex:1 1 220px;min-width:0;max-width:100%}
        .sim-plane{position:relative;width:100%;aspect-ratio:1;border:2px solid var(--line);border-radius:14px;background:#fff;max-width:280px}
        .sim-hint{margin:6px 0 0;font-size:12.5px;color:var(--muted)}
        .sim-dot{position:absolute;width:14px;height:14px;border-radius:50%;background:var(--muted);transform:translate(-50%,-50%);transition:left .4s,top .4s}
        .sim-dot.ring{box-shadow:0 0 0 4px var(--orange-pale,#FBE7D6);outline:2px dashed var(--orange)}
        .sim-star{position:absolute;color:var(--orange);font-size:22px;font-weight:800;transform:translate(-50%,-50%)}
        .sim-cmp{margin:0;font-size:14.5px;font-weight:700;color:var(--muted)}
        .sim-src-label{margin:0;font-size:13.5px;color:var(--muted)}
        .sim-paras{margin:0;padding-left:20px;display:grid;gap:8px}
        .sim-paras li{font-size:14.5px;line-height:1.6;padding:8px 10px;border-radius:10px}
        .sim-paras li.hl{background:var(--orange-pale,#FBE7D6);outline:1px solid var(--orange)}
      ` }));

      function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
      function render() {
        qSel.replaceChildren(...QUESTIONS.map((v, k) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': k === qi ? 'true' : 'false' }, v.label);
          b.addEventListener('click', () => { qi = k; hl = -1; render(); });
          return b;
        }));
        toggleBtn.textContent = attached ? '머리말 떼기' : '조각에 머리말 붙이기';
        toggleBtn.setAttribute('aria-pressed', attached ? 'true' : 'false');

        const query = QUESTIONS[qi];
        const pos = CHUNKS.map(c => attached ? c.after : c.before);
        const order = pos.map((p, i) => i).sort((i, j) => dist(pos[i], query) - dist(pos[j], query));
        const top2 = order.slice(0, 2);

        plane.replaceChildren();
        pos.forEach((p, i) => {
          const d = P.h('div', { class: 'sim-dot' + (top2.includes(i) ? ' ring' : ''), style: `left:${p.x}%;top:${p.y}%` }, String(i + 1));
          d.style.color = '#fff'; d.style.fontSize = '10px'; d.style.display = 'flex'; d.style.alignItems = 'center'; d.style.justifyContent = 'center';
          plane.append(d);
        });
        plane.append(P.h('div', { class: 'sim-star', style: `left:${query.x}%;top:${query.y}%` }, '★'));

        const ansP = P.h('p', {});
        top2.forEach((idx, k) => {
          const c = CHUNKS[idx];
          const txt = attached ? c.header + c.text : c.text;
          ansP.append(txt + ' ');
          const foot = P.h('button', { class: 'sim-foot', type: 'button' }, `[${idx + 1}]`);
          foot.addEventListener('click', () => { hl = idx; render(); });
          ansP.append(foot, ' ');
        });
        answerCard.replaceChildren(P.h('h4', {}, '예시 답변 — "' + query.label + '"'), ansP);

        cmp.textContent = attached
          ? '머리말이 있을 때: 같은 조항끼리 모여서 정확히 찾아요.'
          : '머리말이 없을 때: 조각이 외로워져서 다른 조항과 섞일 수 있어요.';

        paraList.replaceChildren(...CHUNKS.map((c, i) => P.h('li', { class: i === hl ? 'hl' : '' }, `${attached ? c.header : ''}${c.text}`)));
      }
      toggleBtn.addEventListener('click', () => { attached = !attached; hl = -1; render(); });
      render();
    }
  },

  teacherLines: [
    'AI에게 자료를 같이 주는 건 <b>교과서를 펴 놓고 시험 보는 것</b>과 같아요. 훨씬 덜 틀려요.',
    '그래도 교과서가 틀렸으면 답도 틀려요. <b>인용을 눌러 원문을 확인</b>하는 게 우리 일이에요.'
  ],
  tip: {
    body: '공문·규정처럼 짧은 자료는 통째로 붙이고, "답의 각 문장에 근거 조항을 [1]처럼 달아 줘"라고 요청하세요. 인용이 없는 숫자는 쓰지 않아요.',
    extra: '여러 문서를 올릴 땐 파일 이름을 "2026_○○초_현장체험학습규정"처럼 학교·연도·주제가 드러나게 붙이세요. 조각이 맥락을 잃는 문제를 사람이 먼저 줄이는 방법이에요.'
  },
  myth: {
    myth: '자료를 붙여 주면 AI는 절대 틀리지 않는다.',
    fact: '검색이 엉뚱한 조각을 찾거나 자료 자체가 틀리면 답도 틀려요. RAG는 실수를 줄이는 방법이고, 인용을 눌러 원문과 대조하는 확인은 여전히 필요해요.'
  },
  sources: [
    { title: 'Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv 2020, NeurIPS)', url: 'https://arxiv.org/abs/2005.11401', note: 'RAG 원논문. 검색한 문서를 생성에 함께 넣고 출처를 제공.' },
    { title: 'Anthropic — Introducing Contextual Retrieval (2024)', url: 'https://www.anthropic.com/news/contextual-retrieval', note: '청크가 맥락을 잃는 문제와 머리말을 붙여 검색 실패를 줄인 결과, 작은 자료는 통째로.' },
    { title: 'Gemini API — Embeddings', url: 'https://ai.google.dev/gemini-api/docs/embeddings', note: '임베딩이 뜻을 숫자 벡터로 바꿔 의미 검색과 RAG에 쓰인다는 설명.' },
    { title: 'Claude 용어집 — RAG', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: '정확도는 자료 품질과 검색된 내용에 달려 있다는 한계.' }
  ],
  script: `"우리 학교 현장체험학습 규정에서 인솔 교사 비율이 어떻게 되죠?" 자료 없이 물으면 AI가 그럴듯한 숫자를 지어낼 수 있어요. 4편에서 본 할루시네이션이에요.

그래서 쓰는 방법이 RAG, 검색 증강 생성이에요. 질문이 오면 먼저 자료에서 관련 조각을 찾아 질문과 함께 컨텍스트 창에 올려요. 모델은 기억 대신 그 조각을 보고 답하고 출처를 달아요.

조각은 문서를 자른 청크, 뜻은 숫자 좌표인 임베딩으로 바뀌어요. 그런데 "15명당 1명"만 떼어 놓으면 어느 규정인지 사라져 검색이 놓쳐요. 머리말을 붙이면 실패가 크게 줄고, 자료가 작으면 통째로 넣는 편이 간단해요.

그래도 RAG는 실수를 줄일 뿐이에요. 자료가 틀렸거나 검색이 엉뚱한 조각을 찾으면 답도 틀려요. 그래서 인용을 눌러 원문과 대조하는 습관이 핵심이에요.`
};
