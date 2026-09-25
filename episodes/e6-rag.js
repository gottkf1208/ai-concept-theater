/* E6 [B] 자료를 붙여 주면 왜 덜 틀릴까: 할루시네이션과 RAG */
export default {
  slug: 'e6-rag',
  track: 'B',
  title: '자료를 붙여 주면 왜 덜 틀릴까',
  subtitle: '할루시네이션과 RAG',
  summary: '자료 없이 물으면 그럴듯한 숫자를 지어낼 수 있어요. RAG(검색 증강 생성)가 어떻게 그 실수를 줄이는지, 그래도 왜 확인은 필요한지 3분에.',
  keywords: ['RAG', '할루시네이션', '검색 증강 생성', 'NotebookLM', '출처', '근거'],

  scenes: [
    {
      title: '자료 없이 물으면', dur: 13,
      captions: [
        { t: 0, text: '"우리 학교 현장체험학습 규정에서 <em>인솔 교사 비율</em>이 어떻게 되죠?"' },
        { t: 5, text: '자료 없이 물으면 AI가 <em>그럴듯한 숫자를 지어낼 수 있어요</em>. 이런 걸 <em>할루시네이션</em>이라고 해요: 그럴듯하지만 사실이 아닌 내용.' },
        { t: 9.5, text: '확신에 찬 말투라고 해서 맞는 답은 아니에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 300, y: 110, w: 520, text: '"우리 학교 현장체험학습 규정에서<br><b>인솔 교사 비율</b>이 어떻게 되죠?"', tail: 'left' });
        tl.at(stage.appendChild(ask.el), .4, { from: 'left' });
        const model = P.box({ x: 340, y: 300, w: 280, h: 110, label: 'AI 모델', sub: '자료 없이, 기억만으로', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), 1.6, { from: 'pop' });
        const arrowIn = P.arrow(lines, { x1: 620, y1: 200, x2: 520, y2: 300, color: '#1B1F24', width: 4 });
        const answer = P.box({ x: 680, y: 300, w: 440, h: 130, label: '"학생 20명당 교사 1명 정도예요"', sub: '출처 없음 · 확인 안 됨', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(answer.el), 3, { from: 'pop' });
        const arrowOut = P.arrow(lines, { x1: 620, y1: 350, x2: 680, y2: 355, color: '#F2812D', width: 4 });
        const chip = P.chip({ x: 340, y: 470, text: '할루시네이션', color: 'orange', size: 26 });
        tl.at(stage.appendChild(chip.el), 5.2, { from: 'pop' });
        const note = P.text({ x: 340, y: 530, w: 620, text: '그럴듯하지만 <em>사실이 아닌</em> 내용, 한 번은 짚고 갈게요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 6 && t < 9.5));
            arrowIn.draw(P.clamp((t - 1.2) / .6, 0, 1));
            arrowOut.draw(P.clamp((t - 2.7) / .6, 0, 1));
            answer.on(t > 3 && Math.floor(t * 2) % 2 === 0 && t < 5.5);
          }
        };
      }
    },
    {
      title: 'RAG의 흐름', dur: 14,
      captions: [
        { t: 0, text: '이때 쓰는 방법이 <em>RAG(검색 증강 생성)</em>예요. 질문이 오면 바로 답하지 않아요.' },
        { t: 5, text: '먼저 <em>관련 자료를 찾고(검색)</em>, 찾은 자료를 질문과 <em>함께</em> 모델에 넣어요.' },
        { t: 10, text: '모델은 그 자료에 <em>근거</em>해서 답하고, <em>출처</em>를 달아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 240, pose: 'point' });
        stage.append(q.el);
        const steps = [
          { l: '질문', s: '"인솔 교사 비율은?"', acc: 'ink', icon: P.ICON.doc },
          { l: '검색', s: '관련 자료 찾기', acc: 'aqua', icon: P.ICON.search },
          { l: '자료 + 질문', s: '함께 모델에 넣기', acc: 'aqua', icon: P.ICON.plug },
          { l: '답변 + 출처', s: '근거를 달아 답하기', acc: 'orange', icon: P.ICON.check }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 150, w: 260, h: 120, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.6, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 210, x2: 360 + i * 300, y2: 210, width: 5, color: '#1B1F24' }));
        const label = P.text({ x: 60, y: 330, w: 1160, text: 'RAG(검색 증강 생성)의 흐름 — 질문 → 검색 → 자료와 함께 투입 → 근거 있는 답', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label.el), 6.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 1.6)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.6 && t < 2.2 + i * 1.6));
          }
        };
      }
    },
    {
      title: '왜 덜 틀리나', dur: 13,
      captions: [
        { t: 0, text: '모델이 <em>기억</em>에 기대지 않고, 눈앞에 놓인 <em>자료를 보고</em> 답해서 덜 틀려요.' },
        { t: 5, text: '시험 볼 때 <em>교과서를 펴 주는 것</em>과 비슷해요. 답을 외운 게 아니라, 펼쳐 놓고 확인하며 쓰는 거예요.' },
        { t: 9.5, text: '핵심은 <em>근거(출처)를 눌러 확인</em>할 수 있다는 점이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 280, pose: 'idea' });
        stage.append(q.el);
        const memBox = P.box({ x: 350, y: 130, w: 380, h: 140, label: '모델의 기억', sub: '오래됐거나 희미할 수 있어요', accent: '', icon: P.ICON.brain });
        tl.at(stage.appendChild(memBox.el), .5, { from: 'left' });
        const dataBox = P.box({ x: 350, y: 320, w: 380, h: 140, label: '눈앞의 자료', sub: '보면서 그대로 답해요', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(dataBox.el), 2.4, { from: 'left' });
        const vs = P.text({ x: 240, y: 240, w: 110, text: 'vs', size: 26, weight: 800, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(vs.el), 3.2, { from: 'pop' });
        const cite = P.box({ x: 790, y: 320, w: 380, h: 140, label: '출처 [1]', sub: '눌러서 원문 확인', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(cite.el), 5.6, { from: 'right' });
        const arrow = P.arrow(lines, { x1: 730, y1: 390, x2: 790, y2: 390, width: 4, color: '#127E90' });
        const line = P.text({ x: 350, y: 500, w: 820, text: '근거를 눌러 확인할 수 있다는 게 <em>핵심</em>이에요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(line.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            memBox.on(t > .5 && t < 2.4);
            dataBox.on(t > 2.4);
            arrow.draw(P.clamp((t - 5.9) / .6, 0, 1));
            cite.on(t > 5.6 && Math.floor(t * 1.5) % 2 === 0);
          }
        };
      }
    },
    {
      title: '도구 예: NotebookLM', dur: 13,
      captions: [
        { t: 0, text: 'NotebookLM 같은 도구가 이런 원리로 자료에 근거해 답해요.' },
        { t: 4.5, text: '내가 올린 자료(공문, 교육과정 문서 등)에 <em>근거해서 답</em>하고, <em>인용</em>을 달아 줘요.' },
        { t: 9.5, text: '다만 도구마다 <em>방식과 정확도는 달라요</em>. 다 같지는 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 390, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const upload = P.box({ x: 380, y: 140, w: 300, h: 120, label: '내가 올린 자료', sub: '공문 · 교육과정 문서', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(upload.el), .4, { from: 'up' });
        const tool = P.box({ x: 380, y: 320, w: 300, h: 150, label: 'NotebookLM 같은 도구', sub: '자료에 근거해 답해요', accent: 'aqua', icon: P.ICON.search });
        tl.at(stage.appendChild(tool.el), 2, { from: 'pop' });
        const arrow1 = P.arrow(lines, { x1: 530, y1: 260, x2: 530, y2: 320, width: 4, color: '#1B1F24' });
        const cites = ['[1]', '[2]'].map((c, i) => {
          const b = P.box({ x: 780, y: 260 + i * 140, w: 320, h: 110, label: `인용 ${c}`, sub: '눌러서 원문 확인', accent: 'orange', icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), 5.2 + i * .8, { from: 'right' });
          return b;
        });
        const arrow2 = [0, 1].map(i => P.arrow(lines, { x1: 680, y1: 395, x2: 780, y2: 315 + i * 140, width: 3, color: '#127E90', curve: (i - .5) * 30 }));
        const note = P.text({ x: 380, y: 540, w: 720, text: '도구마다 방식과 정확도는 <em>달라요</em>. 표시가 다 같지는 않아요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 4.5 && t < 9.5);
            arrow1.draw(P.clamp((t - 2.4) / .5, 0, 1));
            arrow2.forEach((a, i) => a.draw(P.clamp((t - (5.6 + i * .8)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '그래도 줄어들 뿐', dur: 13,
      captions: [
        { t: 0, text: '그래도 <em>줄어들 뿐</em>이에요. 없어지는 건 아니에요.' },
        { t: 5, text: '찾은 자료가 <em>틀렸거나</em>, 검색이 <em>엉뚱한 자료를 찾으면</em> 여전히 틀려요.' },
        { t: 10, text: '그래서 출처를 눌러 확인하는 <em>습관</em>이 필요해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 290, pose: 'point' });
        stage.append(q.el);
        const case1 = P.box({ x: 380, y: 150, w: 400, h: 130, label: '자료 자체가 틀렸을 때', sub: '틀린 자료를 그대로 따라가요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(case1.el), .5, { from: 'left' });
        const case2 = P.box({ x: 380, y: 320, w: 400, h: 130, label: '엉뚱한 자료를 찾았을 때', sub: '검색이 빗나가면 답도 빗나가요', accent: 'orange', icon: P.ICON.search });
        tl.at(stage.appendChild(case2.el), 3.2, { from: 'left' });
        const chip = P.chip({ x: 380, y: 480, text: '출처를 눌러 확인', color: 'aqua', size: 26 });
        tl.at(stage.appendChild(chip.el), 6.2, { from: 'pop' });
        const line = P.text({ x: 380, y: 540, w: 780, text: '"자료를 주면 절대 안 틀린다"는 <em>오해</em>예요. 확인은 여전히 우리 몫이에요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(line.el), 9.9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            case1.on(t > .5 && t < 3.2);
            case2.on(t > 3.2 && t < 6.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '같은 질문, 두 가지 답 비교',
    desc: '질문을 고르고 <b>자료 붙이기</b>를 눌러 보세요. 왼쪽은 자료 없이 지어낸 답, 오른쪽은 예시 규정을 붙였을 때의 답이에요. 각주를 누르면 아래 자료에서 근거 문단이 표시돼요.',
    mount(el, P) {
      const QUESTIONS = [
        {
          q: '현장체험학습 인솔 교사 비율은?',
          noData: '음, 일반적으로 학생 20명 정도에 교사 1명이면 충분하다고들 해요.',
          withData: '학생 15명당 교사 1명이 원칙이고, 위험도가 높은 활동은 10명당 1명이에요.',
          cite: [0]
        },
        {
          q: '학생 AI 활용 동의는 누구에게 받나요?',
          noData: '보통 학교장 결재만 받아 두면 충분해요.',
          withData: '보호자 동의가 필요해요. 담임 교사가 가정통신문으로 미리 받아요.',
          cite: [1]
        },
        {
          q: '영상 공유 시 초상권 처리는?',
          noData: '학교 홈페이지에만 올리면 초상권 문제는 따로 없어요.',
          withData: '사전 동의를 받은 학생만 노출하고, 얼굴이 보이면 모자이크 처리가 원칙이에요.',
          cite: [2]
        }
      ];
      const PARAGRAPHS = [
        '제3조(인솔 인원) 현장체험학습 인솔 교사는 학생 15명당 1명을 기준으로 하며, 위험도가 높은 활동(수상·설상 등)은 10명당 1명으로 한다.',
        '제5조(AI 활용 동의) 학생의 학습 결과물에 생성형 AI를 활용하고자 할 때는 사전에 보호자 동의를 받아야 하며, 담임 교사가 가정통신문을 통해 수합한다.',
        '제7조(영상 및 사진 공유) 촬영한 영상·사진을 외부에 공유할 때는 사전 동의를 받은 학생만 노출하고, 얼굴이 식별되는 경우 모자이크 처리를 원칙으로 한다.',
        '제9조(기타) 이 규정에서 정하지 않은 사항은 학교장이 협의회를 거쳐 정한다.'
      ];
      let qi = 0, attached = false, hl = -1;

      const qSel = P.h('div', { class: 'sim-qs', role: 'radiogroup', 'aria-label': '질문 고르기' });
      const toggleBtn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '자료 붙이기');
      const cards = P.h('div', { class: 'sim-cards' });
      const leftCard = P.h('div', { class: 'sim-card sim-left' });
      const rightCard = P.h('div', { class: 'sim-card sim-right', hidden: '' });
      cards.append(leftCard, rightCard);
      const srcLabel = P.h('p', { class: 'sim-src-label' }, '붙인 자료 — ', P.h('b', {}, '○○초등학교 현장체험학습 운영 규정(예시)'), ' · 실제 규정이 아닌 예시예요.');
      const paraList = P.h('ol', { class: 'sim-paras' });
      el.append(qSel, P.h('div', { class: 'sim-bar' }, toggleBtn), cards, srcLabel, paraList);
      const style = P.h('style', { html: `
        .sim-qs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-qs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-qs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-bar{margin-top:14px}
        .sim-cards{display:flex;gap:14px;flex-wrap:wrap;margin-top:16px}
        .sim-card{flex:1 1 260px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper)}
        .sim-card h4{margin:0 0 8px;font-size:14px;color:var(--muted)}
        .sim-card p{margin:0;font-size:16px;line-height:1.6}
        .sim-left{border-color:var(--line)}
        .sim-right{border-color:var(--aqua)}
        .sim-foot{border:none;background:none;color:var(--orange-strong,#B3520F);font-weight:800;cursor:pointer;padding:0 2px;font-size:15px}
        .sim-foot:hover, .sim-foot:focus-visible{text-decoration:underline}
        .sim-src-label{margin-top:18px;font-size:13.5px;color:var(--muted)}
        .sim-paras{margin:8px 0 0;padding-left:20px;display:grid;gap:8px}
        .sim-paras li{font-size:14.5px;line-height:1.6;padding:8px 10px;border-radius:10px}
        .sim-paras li.hl{background:var(--orange-pale,#FBE7D6);outline:1px solid var(--orange)}
      ` });
      el.append(style);

      const render = () => {
        qSel.replaceChildren(...QUESTIONS.map((v, k) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': k === qi ? 'true' : 'false' }, v.q);
          b.addEventListener('click', () => { qi = k; hl = -1; render(); });
          return b;
        }));
        toggleBtn.textContent = attached ? '자료 떼기' : '자료 붙이기';
        toggleBtn.setAttribute('aria-pressed', attached ? 'true' : 'false');
        const cur = QUESTIONS[qi];
        leftCard.replaceChildren(P.h('h4', {}, '자료 없이'), P.h('p', {}, cur.noData));
        rightCard.hidden = !attached;
        if (attached) {
          const p = P.h('p', {});
          p.append(cur.withData + ' ');
          cur.cite.forEach(ci => {
            const foot = P.h('button', { class: 'sim-foot', type: 'button' }, `[${ci + 1}]`);
            foot.addEventListener('click', () => { hl = ci; render(); });
            p.append(foot, ' ');
          });
          rightCard.replaceChildren(P.h('h4', {}, '교육과정·규정 자료를 붙여서'), p);
        }
        paraList.replaceChildren(...PARAGRAPHS.map((t, i) => P.h('li', { class: i === hl ? 'hl' : '' }, t)));
      };
      toggleBtn.addEventListener('click', () => { attached = !attached; if (!attached) hl = -1; render(); });
      render();
    }
  },

  teacherLines: [
    'AI한테 자료를 같이 주는 건, 시험 볼 때 <b>교과서를 펴 주는 것</b>과 같아요. 훨씬 덜 틀려요.',
    '그래도 교과서가 틀렸으면 답도 틀려요. <b>출처를 눌러 확인</b>하는 게 우리 일이에요.'
  ],
  tip: {
    body: '공문이나 교육과정 문서를 올리고 질문하세요. 답에 달린 <b>출처를 눌러 원문</b>을 확인하고, 출처가 없는 숫자는 쓰지 마세요.',
    extra: '자료가 오래됐거나 잘못됐으면 답도 그대로 틀려요. "근거 있음"이 "무조건 맞음"은 아니에요.'
  },
  myth: {
    myth: '자료를 주면 절대 안 틀린다.',
    fact: '줄어들 뿐이라서 확인은 여전히 필요해요. 자료가 틀렸거나 엉뚱한 자료를 찾으면 답도 틀려요.'
  },
  sources: [
    { title: 'Lewis et al. 2020 — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401', note: 'RAG 원논문. 검색한 문서를 생성 과정에 함께 넣는 구조를 처음 제안했어요.' },
    { title: 'Gao et al. 2023 — Retrieval-Augmented Generation for Large Language Models: A Survey', url: 'https://arxiv.org/abs/2312.10997', note: '할루시네이션·오래된 지식·추적 불가 문제를 검색으로 보완하는 방식을 정리했어요.' },
    { title: 'NotebookLM 소개 — Google Blog', url: 'https://blog.google/technology/ai/notebooklm-google-ai/', note: '올린 자료에 근거(grounding)해 답하고 인용을 다는 방식을 설명해요.' },
    { title: 'Claude 용어집 — RAG (Retrieval-Augmented Generation)', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: '정확성을 높이지만, 자료의 품질과 검색 결과에 달려 있다고 밝혀요.' }
  ],
  script: `
"우리 학교 현장체험학습 규정에서 인솔 교사 비율이 어떻게 되죠?" 이렇게 자료 없이 물으면, AI가 그럴듯한 숫자를 지어낼 수 있어요. 확신에 찬 말투로요. 이런 걸 할루시네이션, 그럴듯하지만 사실이 아닌 내용이라고 불러요.

이걸 줄이는 방법이 RAG, 검색 증강 생성이에요. 질문이 오면 바로 답하지 않고, 먼저 관련 자료를 찾아요. 그 자료를 질문과 함께 모델에 넣고, 모델은 자료에 근거해서 답하고 출처를 달아요. 기억이 아니라 눈앞의 자료를 보고 답하니까 덜 틀려요. 시험 볼 때 교과서를 펴 주는 것과 같아요.

NotebookLM 같은 도구가 이런 원리로 자료에 근거해 답해요. 내가 올린 공문이나 교육과정 문서에 근거해 답하고 인용을 달아 줘요. 다만 도구마다 방식과 정확도는 달라요.

그래도 줄어들 뿐이에요. 자료 자체가 틀렸거나, 검색이 엉뚱한 자료를 찾으면 답도 여전히 틀려요. 답에 달린 출처를 눌러 원문을 확인하는 습관을 들이세요. 교과서를 펴고 봐도, 교과서가 틀렸으면 답도 틀리니까요.
`
};
