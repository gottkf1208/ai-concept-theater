/* v2 S1-2 [트랙 S1] 긴 대화에서 AI는 왜 앞 내용을 잊을까: 토큰·컨텍스트 창·컴팩션 */
export default {
  slug: 'v1-context',
  track: 'S1',
  title: '긴 대화에서 AI는 왜 앞 내용을 잊을까?',
  subtitle: '토큰, 컨텍스트 창, 컴팩션',
  summary: '대화가 길어지면 AI가 학년을 되물어요. 토큰이 쌓이는 "책상" 컨텍스트 창, 넘칠 때 앞부분을 요약본으로 바꾸는 컴팩션, 그리고 대화 밖에 따로 적어 두는 메모리까지 3분에.',
  keywords: ['토큰', '컨텍스트 창', 'context window', '작업 기억', '컨텍스트 로트', '컴팩션', 'compaction', '메모리', 'Lost in the Middle'],

  scenes: [
    {
      title: '아까 말한 학년이 뭐였죠?', dur: 13,
      captions: [
        { t: 0, text: '연수 자료를 만들다가 AI랑 대화를 서른 번쯤 주고받았어요.' },
        { t: 5, text: '그런데 AI가 갑자기 되물어요. <em>"아까 말씀하신 학년이 뭐였죠?"</em>' },
        { t: 9.5, text: '방금 전에 분명히 말했는데, 왜 잊어버릴까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 360, pose: 'think' });
        stage.append(q.el);
        const chat = P.box({ x: 470, y: 90, w: 720, h: 60, label: '연수 자료 대화창', sub: '', accent: 'ink' });
        tl.at(stage.appendChild(chat.el), .3, { from: 'up' });
        const rows = ['5학년 대상 AI 영상 수업 계획해 줘', '3차시로 나눠 볼까요?', '평가 기준표도 같이 만들어 줘', '학습지 초안도 부탁해', '(… 대화 26개 더 …)'];
        rows.forEach((r, i) => tl.at(stage.appendChild(P.text({ x: 500, y: 175 + i * 40, w: 640, text: r, size: 19, weight: 600, cls: 'muted' }).el), .8 + i * .5, { from: 'left', dist: 14 }));
        const counter = P.text({ x: 500, y: 395, w: 300, text: '', size: 22, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(counter.el), .8, { from: 'none' });
        const b = P.bubble({ x: 470, y: 440, w: 620, text: '"<b>아까 말씀하신 학년</b>이 뭐였죠? 다시 한 번 알려 주세요."', tail: 'left', tone: 'aqua' });
        tl.at(stage.appendChild(b.el), 5, { from: 'up' });
        const qq = P.text({ x: 470, y: 590, w: 620, text: '방금 말한 것도 잊어버리는 AI?', size: 30, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
            const n = Math.min(30, Math.round(P.clamp(t / 5, 0, 1) * 30));
            counter.set(`대화 ${n}번째 메시지`);
          }
        };
      }
    },
    {
      title: '토큰과 책상', dur: 13,
      captions: [
        { t: 0, text: 'AI에게 글은 <em>토큰</em>이라는 조각으로 들어가요. 영어는 대략 서너 글자에 하나예요.' },
        { t: 5, text: '토큰 수는 언어마다 비율이 달라져요. 이 토큰이 쌓이는 곳이 <em>컨텍스트 창</em>, AI의 작업 기억이에요.' },
        { t: 9.5, text: '책상이라고 생각하면 쉬워요. 토큰 칩이 책상 위로 쌓여 들어가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const sentence = P.text({ x: 300, y: 90, w: 680, text: 'AI 영상 만들기 수업을 계획해요.', size: 32, weight: 800, align: 'center' });
        tl.at(stage.appendChild(sentence.el), .3, { from: 'up' });
        const down = P.arrow(lines, { x1: 640, y1: 150, x2: 640, y2: 215, width: 4, color: '#1B1F24' });
        const chipData = [
          ['AI', 'ink'], ['영상', 'aqua'], ['만들', 'aqua'], ['기', 'aqua'], ['수업', 'aqua'], ['을', 'orange'], ['계획', 'aqua'], ['해요', 'aqua'], ['.', 'gray']
        ];
        const chips = chipData.map((c, i) => {
          const el = P.chip({ x: 300 + i * 78, y: 230, text: c[0], color: c[1], size: 24 });
          tl.at(stage.appendChild(el.el), 1.4 + i * .3, { from: 'pop' });
          return el;
        });
        const desk = P.box({ x: 430, y: 330, w: 420, h: 150, label: '컨텍스트 창', sub: '= 책상(작업 기억)', accent: '', icon: P.ICON.desk });
        tl.at(stage.appendChild(desk.el), 4.4, { from: 'pop' });
        const note = P.text({ x: 300, y: 510, w: 680, text: '토큰 수는 언어마다 비율이 달라져요. 정확한 개수는 모델의 토크나이저가 정해요.', size: 20, weight: 600, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(note.el), 6.2, { from: 'up' });
        const big = P.text({ x: 300, y: 580, w: 680, text: '책상이라고 생각하면 쉬워요.', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(big.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            down.draw(P.clamp((t - .8) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '책상에 올라가는 것은 대화만이 아니에요', dur: 13,
      captions: [
        { t: 0, text: '책상에는 내 질문만 올라가지 않아요. 앱이 미리 넣은 지시문, 올린 파일과 사진도 함께 올라가요.' },
        { t: 4.5, text: 'AI의 답과 AI가 속으로 한 생각까지, 전부 이 책상을 차지해요.' },
        { t: 9, text: '2026년엔 책상이 100만 토큰까지 커졌지만, 많이 쌓일수록 정확히 떠올리는 힘은 떨어져요. 이걸 <em>컨텍스트 로트</em>라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 280, pose: 'base' });
        stage.append(q.el);
        const desk = P.box({ x: 300, y: 90, w: 420, h: 480, label: '컨텍스트 창', sub: '이번 턴에 들어가는 모든 것', accent: '', icon: P.ICON.desk });
        desk.el.style.justifyContent = 'flex-start'; desk.el.style.paddingTop = '14px';
        tl.at(stage.appendChild(desk.el), .3, { from: 'pop' });
        const items = [
          ['지시문 (system)', 'ink'], ['올린 파일', 'aqua'], ['올린 사진', 'aqua'], ['지금까지 대화', 'orange'], ['AI의 생각', 'aqua']
        ].map((it, i) => {
          const c = P.chip({ x: 330, y: 230 + i * 62, text: it[0], color: it[1], size: 22 });
          tl.at(stage.appendChild(c.el), 1.2 + i * .7, { from: 'left', dist: 18 });
          return c;
        });
        const barLabel = P.text({ x: 760, y: 90, w: 430, text: '100만 토큰까지 커졌어요', size: 22, weight: 700, align: 'center' });
        tl.at(stage.appendChild(barLabel.el), 5.2, { from: 'up' });
        const bars = [1, .8, .6, .4, .25].map((op, i) => {
          const h = 36 + i * 30;
          const bar = P.h('div', { style: `left:${800 + i * 80}px;top:${500 - h}px;width:44px;height:${h}px;border-radius:10px 10px 4px 4px;background:#1B1F24;opacity:${op}` });
          tl.at(stage.appendChild(bar), 5.6 + i * .25, { from: 'up' });
          return bar;
        });
        const barNote = P.text({ x: 760, y: 520, w: 430, text: '많이 쌓일수록 흐려져요', size: 18, weight: 600, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(barNote.el), 7.2, { from: 'up' });
        const rotChip = P.chip({ x: 850, y: 560, text: '컨텍스트 로트', color: 'orange', size: 20 });
        tl.at(stage.appendChild(rotChip.el), 9.2, { from: 'pop' });
        const final = P.text({ x: 300, y: 610, w: 880, text: '책상이 커도 <em>정확히 떠올리는 힘</em>은 떨어져요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
          }
        };
      }
    },
    {
      title: '넘치면: 밀어내기와 컴팩션', dur: 14,
      captions: [
        { t: 0, text: '책상이 차면 오래된 것부터 밀어내거나, 앞부분을 <em>요약본으로 바꿔 끼워요</em>. 이걸 <em>컴팩션</em>이라고 해요.' },
        { t: 5.5, text: '채팅 화면에 "생각을 정리하는 중"이 뜨면 이 요약이 돌아가는 중이에요.' },
        { t: 10, text: '다만 요약에서 빠진 세부는 다시 볼 수 없고, 가운데 놓인 내용은 원래도 놓치기 쉬워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 300, pose: 'oops' });
        stage.append(q.el);
        const oldTurns = ['안녕하세요', '5학년', '3차시로', '나눠요', '평가표', '학습지', '회의록'];
        const keptTurns = ['출처정리', '안내문', '완료'];
        oldTurns.forEach((t, i) => {
          const c = P.chip({ x: 60 + i * 118, y: 140, text: t, color: i % 2 ? 'orange' : 'aqua', size: 19 });
          tl.at(stage.appendChild(c.el), .3 + i * .15, { from: 'pop', until: 4.5 });
        });
        keptTurns.forEach((t, i) => {
          const c = P.chip({ x: 60 + (7 + i) * 118, y: 140, text: t, color: 'ink', size: 19 });
          tl.at(stage.appendChild(c.el), 1.5 + i * .15, { from: 'pop' });
        });
        const summary = P.chip({ x: 60, y: 140, text: '요약: 이전 7턴', color: 'gray', size: 20 });
        tl.at(stage.appendChild(summary.el), 4.6, { from: 'pop' });
        const lost = P.chip({ x: 280, y: 140, text: '5학년(대상)', color: 'gray', size: 19 });
        tl.at(stage.appendChild(lost.el), 4.7, { from: 'pop', until: 9.2 });
        const lostNote = P.text({ x: 60, y: 210, w: 540, text: '요약에서 빠진 것: <em>5학년</em>. 다시 볼 수 없어요.', size: 22, weight: 700 });
        tl.at(stage.appendChild(lostNote.el), 9.4, { from: 'up' });
        const midRow = ['앞', '중간', '중간', '중간', '뒤'];
        const midChips = midRow.map((t, i) => {
          const c = P.chip({ x: 760 + i * 90, y: 280, text: t, color: i === 2 ? 'orange' : (i === 0 || i === 4 ? 'aqua' : 'gray'), size: 20 });
          tl.at(stage.appendChild(c.el), 10 + i * .2, { from: 'pop' });
          return c;
        });
        const midLabel = P.text({ x: 760, y: 340, w: 430, text: '가운데는 놓치기 쉬워요', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(midLabel.el), 11, { from: 'up' });
        const final = P.text({ x: 320, y: 560, w: 760, text: '컴팩션은 책상을 지키지만, 빠진 세부는 되돌릴 수 없어요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
          }
        };
      }
    },
    {
      title: '메모리는 책상 옆 메모장이에요', dur: 13,
      captions: [
        { t: 0, text: '<em>메모리</em>는 책상과 따로 있는 메모장이에요. "5학년 담임" 같은 항목을 적어 둬요.' },
        { t: 5, text: '설정에서 보고 지울 수 있고, 건강 같은 민감한 주제는 기본으로 적지 않아요.' },
        { t: 9, text: '그래도 지금 작업의 핵심 조건은 <em>마지막 메시지에 한 번 더</em> 적고, 긴 작업은 요약 메모를 만들어 새 대화에서 이어 가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 300, pose: 'wave' });
        stage.append(q.el);
        const desk = P.box({ x: 100, y: 100, w: 430, h: 250, label: '컨텍스트 창', sub: '지금 하고 있는 대화', accent: '', icon: P.ICON.desk });
        tl.at(stage.appendChild(desk.el), .3, { from: 'pop' });
        const memo = P.box({ x: 560, y: 100, w: 430, h: 250, label: '메모리', sub: '"5학년 담임" · "AI 영상 수업"<br>건강 정보는 기본으로 안 적어요', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(memo.el), 2.4, { from: 'pop' });
        const arrow1 = P.arrow(lines, { x1: 530, y1: 225, x2: 560, y2: 225, width: 4, color: '#9AA5AF', dashed: true });
        const bubble = P.bubble({ x: 300, y: 390, w: 680, text: '"5학년 담임" 같은 <b>핵심 조건</b>은 마지막 메시지에 한 번 더 적어요.', tail: 'none', tone: 'soft' });
        tl.at(stage.appendChild(bubble.el), 9.2, { from: 'up' });
        const final = P.text({ x: 300, y: 520, w: 680, text: '컨텍스트 창과 메모리는 <em>서로 다른 장치</em>예요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            arrow1.draw(P.clamp((t - 2.6) / .5, 0, 1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '책상과 컴팩션 시뮬레이터',
    desc: '위 칸에 문장을 치면 <b>토큰 칩</b>으로 쪼개져요(대략적인 예시). 아래에서는 책상(컨텍스트 창) 크기를 바꾸고, 넘칠 때 방식을 <b>밀려남 / 컴팩션 하기 / 오류로 보기</b> 중에서 골라 보세요. "메모리에 적기"를 누르면 컴팩션 뒤에도 학년 정보가 남는 걸 볼 수 있어요.',
    mount(el, P) {
      const PARTICLES = ['은', '는', '이', '가', '을', '를', '과', '와', '에', '의', '로', '도'];
      const DEFAULT_SENT = '우리 반 5학년 아이들과 AI 영상 만들기 수업을 3차시로 계획해 주세요.';

      function tokenize(sentence) {
        const words = sentence.trim().split(/\s+/).filter(Boolean);
        const chips = [];
        for (const raw of words) {
          const m = raw.match(/^([\s\S]*?)([.,!?~]*)$/);
          const core = (m && m[1]) || raw, punct = (m && m[2]) || '';
          if (!core) { if (punct) chips.push({ t: punct, c: 'gray' }); continue; }
          if (/^[A-Za-z0-9]+$/.test(core)) {
            chips.push({ t: core, c: 'ink' });
          } else {
            let stem = core, particle = '';
            for (const p of PARTICLES) {
              if (stem.length > p.length && stem.endsWith(p)) { particle = p; stem = stem.slice(0, -p.length); break; }
            }
            let i = 0;
            while (i < stem.length) { chips.push({ t: stem.slice(i, i + 3), c: 'aqua' }); i += 3; }
            if (particle) chips.push({ t: particle, c: 'orange' });
          }
          if (punct) chips.push({ t: punct, c: 'gray' });
        }
        return chips;
      }

      /* ── 부품 A: 문장 → 토큰 칩 ─────────────────── */
      const secA = P.h('div', { class: 'sim-sec' },
        P.h('h4', {}, '1. 문장을 토큰 칩으로 쪼개 보기'),
        (() => { const t = P.h('textarea', { class: 'sim-ta', rows: '2', 'aria-label': '문장 입력(직접 바꿔 보세요)' }); t.value = DEFAULT_SENT; return t; })()
      );
      const ta = secA.querySelector('textarea');
      const chipWrap = P.h('div', { class: 'sim-chipwrap', 'aria-live': 'polite' });
      const chipNote = P.h('p', { class: 'sim-note' });
      secA.append(chipWrap, chipNote);
      const renderChips = () => {
        const chips = tokenize(ta.value);
        chipWrap.replaceChildren(...chips.map(c => P.h('span', { class: `p-chip c-${c.c}`, style: 'position:static;margin:3px' }, c.t)));
        chipNote.innerHTML = `칩 <b>${chips.length}개</b> · 대략적인 예시예요. 실제 토큰 수는 모델의 토크나이저가 정해요.`;
      };
      ta.addEventListener('input', renderChips);

      /* ── 부품 B: 책상 넘침 + 컴팩션 ─────────────── */
      const TURNS = [
        { who: '교사', chips: ['5학년', '대상', 'AI', '영상', '수업', '계획', '해줘'] },
        { who: 'AI', chips: ['3차시', '로', '나눠', '볼까요'] },
        { who: '교사', chips: ['좋아요', '1차시', '는', '기획', '2차시', '는', '촬영'] },
        { who: 'AI', chips: ['3차시', '는', '편집', '과', '발표', '로', '할게요'] },
        { who: '교사', chips: ['평가', '기준표', '도', '같이', '만들어', '줘'] },
        { who: 'AI', chips: ['채점', '기준', '4가지', '정리', '했어요'] },
        { who: '교사', chips: ['학습지', '초안', '도', '부탁', '해'] },
        { who: 'AI', chips: ['학습지', '초안', '완성', '했어요'] },
        { who: '교사', chips: ['자료', '출처', '도', '표', '로', '정리', '해줘'] },
        { who: 'AI', chips: ['출처', '5개', '표', '로', '정리', '했어요'] },
        { who: '교사', chips: ['안내문', '초안', '도', '써', '줘'] },
        { who: 'AI', chips: ['아까', '말씀', '하신', '학년', '이', '뭐', '였죠'] }
      ];
      let capacity = 24, mode = 'evict', memoryPinned = false;

      const secB = P.h('div', { class: 'sim-sec' },
        P.h('h4', {}, '2. 책상(컨텍스트 창) 크기와 컴팩션 바꿔 보기')
      );
      const rangeBar = P.h('div', { class: 'sim-rangebar' });
      const capLabel = P.h('label', { for: 'sim-desk-range', class: 'sim-cap' });
      const slider = P.h('input', { id: 'sim-desk-range', type: 'range', min: '8', max: '60', step: '1', value: String(capacity), class: 'sim-range' });
      rangeBar.append(capLabel, slider);
      const btnBar = P.h('div', { class: 'sim-btnbar' });
      const compactBtn = P.h('button', { class: 'btn primary', type: 'button' }, '컴팩션 하기');
      const evictBtn = P.h('button', { class: 'btn', type: 'button' }, '밀려남 보기');
      const errorBtn = P.h('button', { class: 'btn', type: 'button' }, '오류로 보기');
      const memoBtn = P.h('button', { class: 'btn', type: 'button' }, '메모리에 적기');
      btnBar.append(compactBtn, evictBtn, errorBtn, memoBtn);
      const desk = P.h('div', { class: 'sim-desk', 'aria-live': 'polite' });
      const errBanner = P.h('p', { class: 'sim-err', role: 'alert', hidden: '' }, '책상 용량을 넘었어요 — 오류가 나요. (컨텍스트 창 초과)');
      const lostBanner = P.h('p', { class: 'sim-lost', hidden: '' });
      const memoBox = P.h('div', { class: 'sim-memo', hidden: '' }, P.h('b', {}, '메모리(책상 밖)'), P.h('span', { class: 'p-chip c-aqua', style: 'position:static;margin:4px' }, '5학년 담임'));
      secB.append(rangeBar, btnBar, desk, errBanner, lostBanner, memoBox);

      function renderDesk() {
        capLabel.textContent = `책상 크기: ${capacity} 토큰`;
        let cutoff = 0, running = 0;
        const fit = new Array(TURNS.length).fill(false);
        for (let i = TURNS.length - 1; i >= 0; i--) {
          const n = TURNS[i].chips.length;
          if (running + n <= capacity) { fit[i] = true; running += n; } else break;
        }
        while (cutoff < TURNS.length && !fit[cutoff]) cutoff++;
        desk.replaceChildren();
        if (mode === 'compact' && cutoff > 0) {
          const row = P.h('div', { class: 'sim-turn' }, P.h('b', {}, '요약'), P.h('span', { class: 'p-chip c-gray', style: 'position:static;margin:2px' }, `요약: 이전 ${cutoff}턴`));
          desk.append(row);
        }
        TURNS.forEach((turn, i) => {
          const evicted = i < cutoff;
          if (mode === 'compact' && evicted) return;
          const row = P.h('div', { class: `sim-turn${evicted ? ' evicted' : ''}${mode === 'error' && evicted ? ' err' : ''}` });
          row.append(P.h('b', {}, turn.who));
          turn.chips.forEach(t => row.append(P.h('span', { class: 'p-chip c-' + (evicted ? 'gray' : (turn.who === 'AI' ? 'aqua' : 'orange')), style: 'position:static;margin:2px' }, t)));
          if (evicted) row.append(P.h('span', { class: 'sim-flag' }, mode === 'error' ? '오류 위험' : (mode === 'compact' ? '요약 안에' : '밀려남')));
          desk.append(row);
        });
        errBanner.hidden = !(mode === 'error' && cutoff > 0);
        lostBanner.hidden = !(mode === 'compact' && cutoff > 0);
        if (!lostBanner.hidden) lostBanner.innerHTML = '요약에서 빠진 것: <b>5학년</b> — 다시 불러올 수 없어요.';
        memoBox.hidden = !memoryPinned;
      }
      slider.addEventListener('input', () => { capacity = +slider.value; renderDesk(); });
      compactBtn.addEventListener('click', () => { mode = 'compact'; renderDesk(); });
      evictBtn.addEventListener('click', () => { mode = 'evict'; renderDesk(); });
      errorBtn.addEventListener('click', () => { mode = 'error'; renderDesk(); });
      memoBtn.addEventListener('click', () => { memoryPinned = true; renderDesk(); });

      const style = P.h('style', { html: `
        .sim-sec{margin-top:20px}
        .sim-sec:first-child{margin-top:0}
        .sim-sec h4{font-size:15px;font-weight:800;margin-bottom:8px}
        .sim-ta{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:15px;font-family:inherit;resize:vertical;min-height:56px;max-width:100%}
        .sim-chipwrap{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px;padding:10px;border:1px dashed var(--line);border-radius:12px;min-height:44px;background:var(--paper)}
        .sim-note{font-size:12.5px;color:var(--muted);margin-top:6px}
        .sim-rangebar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:4px}
        .sim-cap{font-weight:700;font-family:var(--mono);font-size:13px;white-space:nowrap}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        .sim-btnbar{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
        .sim-desk{margin-top:12px;border:2px solid var(--line);background:var(--paper);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:6px;max-height:320px;overflow:auto}
        .sim-turn{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:4px 6px;border-radius:10px;transition:opacity .2s}
        .sim-turn b{font-size:12px;color:var(--muted);width:34px;flex:0 0 auto}
        .sim-turn.evicted{opacity:.42}
        .sim-turn.evicted.err b{color:#B3520F}
        .sim-flag{font-size:11px;font-weight:800;color:var(--muted);margin-left:4px}
        .sim-turn.evicted.err .sim-flag{color:#B3520F}
        .sim-err{margin-top:10px;color:#B3520F;font-weight:700;font-size:13.5px;background:var(--orange-pale);border:1px solid #F9D3B8;border-radius:10px;padding:8px 12px}
        .sim-err[hidden]{display:none}
        .sim-lost{margin-top:10px;color:#B3520F;font-weight:700;font-size:13.5px;background:var(--orange-pale);border:1px solid #F9D3B8;border-radius:10px;padding:8px 12px}
        .sim-lost[hidden]{display:none}
        .sim-memo{margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13.5px;border:1px dashed var(--line);border-radius:10px;padding:8px 12px}
        .sim-memo[hidden]{display:none}
      ` });

      el.append(style, secA, secB);
      renderChips();
      renderDesk();
    }
  },

  teacherLines: [
    'AI는 <b>책상 위에 올라온 것만</b> 봐요. 대화가 길어지면 앞부분이 밀려나거나 요약본으로 바뀌어요.',
    '정말 중요한 조건은 <b>마지막 메시지에 한 번 더</b> 적어 줘요.'
  ],
  tip: {
    body: '긴 작업은 학년·차시·분량 같은 핵심 조건을 마지막 메시지에 다시 적거나, "지금까지 정한 것 다섯 줄로 요약해 줘"로 요약 메모를 받아 새 대화에서 이어 가세요.',
    extra: '메모리 기능을 쓴다면 설정에서 무엇이 적혀 있는지 가끔 열어 보고, 학생 관련 항목은 지워 두세요.'
  },
  myth: {
    myth: '컨텍스트 창이 100만 토큰이니 긴 대화도 처음 내용을 다 기억한다.',
    fact: '넣을 수 있는 양과 정확히 떠올리는 힘은 달라요. 토큰이 많을수록 회상이 떨어지고(컨텍스트 로트), 가운데 놓인 내용은 특히 놓치기 쉬우며, 컴팩션된 부분은 요약본만 남아요.'
  },
  sources: [
    { title: 'Claude 문서 — Context windows', url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', note: '작업 기억 비유, 창에 들어가는 것들(지시문·파일·대화·출력), 100만/20만 토큰, context rot, 채팅 화면의 FIFO 각주.' },
    { title: 'Claude 문서 — Compaction overview', url: 'https://platform.claude.com/docs/en/build-with-claude/compaction', note: '오래된 턴을 요약으로 바꿔 끼우는 컴팩션의 동작과, 기본 요약이 빠뜨릴 수 있는 내용.' },
    { title: 'Anthropic Engineering — Effective context engineering for AI agents (2025)', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', note: '길수록 회상이 떨어지는 context rot, 지나친 컴팩션이 미묘한 맥락을 잃는 위험, 외부 메모(NOTES.md).' },
    { title: 'Liu et al., Lost in the Middle (arXiv, TACL 2023)', url: 'https://arxiv.org/abs/2307.03172', note: '긴 문맥에서 정보가 가운데 있을 때 성능이 크게 떨어진다는 연구.' }
  ],
  script: `연수 자료를 만들며 AI와 서른 번쯤 주고받았는데, AI가 갑자기 "아까 말씀하신 학년이 뭐였죠?" 되물었어요. 방금 말했는데 왜 잊어버릴까요.

AI에게 글은 토큰이라는 조각으로 들어가요. 토큰이 쌓이는 곳이 컨텍스트 창, AI의 작업 기억이에요. 책상이라고 생각하면 쉬워요. 질문만 올라가지 않고, 지시문과 올린 파일, AI의 답과 생각까지 다 올라가요. 2026년엔 책상이 100만 토큰까지 커졌지만, 쌓일수록 정확히 떠올리는 힘은 떨어져요. 컨텍스트 로트라고 불러요.

책상이 차면 오래된 것부터 밀어내거나, 앞부분을 요약본으로 바꿔 끼워요. 컴팩션이에요. 요약에서 빠진 세부는 다시 볼 수 없고, 가운데 내용은 원래도 놓치기 쉬워요.

그러니 긴 작업은 핵심 조건을 마지막 메시지에 다시 적으세요. 메모리는 책상과 따로 있는 메모장이라, 설정에서 보고 지울 수 있어요.`
};
