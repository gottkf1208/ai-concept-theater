/* E5 [B] 긴 대화에서 AI가 앞 내용을 잊는 이유: 토큰과 컨텍스트 창 */
export default {
  slug: 'e5-context',
  track: 'B',
  title: '긴 대화에서 AI가 앞 내용을 잊는 이유',
  subtitle: '토큰과 컨텍스트 창',
  summary: '연수 자료를 만들다 30번째 대화쯤 AI가 학년을 되물어요. 문장을 잘게 쪼갠 토큰과, 그 토큰이 쌓이는 "책상" 컨텍스트 창 이야기를 3분에.',
  keywords: ['토큰', 'token', '컨텍스트 창', 'context window', '기억', '요약', 'compaction'],

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
        const rowEls = rows.map((r, i) => tl.at(stage.appendChild(P.text({ x: 500, y: 175 + i * 40, w: 640, text: r, size: 19, weight: 600, cls: 'muted' }).el), .8 + i * .5, { from: 'left', dist: 14 }));
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
      title: '토큰: 조각으로 쪼개요', dur: 13,
      captions: [
        { t: 0, text: 'AI에게는 글이 통째로 들어가지 않아요. <em>토큰</em>이라는 조각으로 쪼개져 들어가요.' },
        { t: 5, text: '영어는 대략 3~4글자에 토큰 하나예요(Claude 용어집 기준 약 3.5자). 한국어는 도구마다 다르고, 보통 더 잘게 쪼개져요.' },
        { t: 9.5, text: '이건 <em>대략적인 예시</em>예요. 실제로 쪼개는 방식은 도구마다 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const sentence = P.text({ x: 300, y: 90, w: 760, text: 'AI 영상 만들기 수업을 계획해요.', size: 32, weight: 800, align: 'center' });
        tl.at(stage.appendChild(sentence.el), .3, { from: 'up' });
        const down = P.arrow(lines, { x1: 680, y1: 150, x2: 680, y2: 210, width: 4, color: '#1B1F24' });
        const chipData = [
          ['AI', 'ink'], ['영상', 'aqua'], ['만들', 'aqua'], ['기', 'aqua'], ['수업', 'aqua'], ['을', 'orange'], ['계획', 'aqua'], ['해요', 'aqua'], ['.', 'gray']
        ];
        const chips = chipData.map((c, i) => {
          const el = P.chip({ x: 330 + i * 78, y: 260, text: c[0], color: c[1], size: 24 });
          tl.at(stage.appendChild(el.el), 2.2 + i * .35, { from: 'pop' });
          return el;
        });
        const countTxt = P.text({ x: 300, y: 360, w: 760, text: '', size: 24, weight: 700, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(countTxt.el), 6.2, { from: 'up' });
        const noteTxt = P.text({ x: 300, y: 430, w: 760, text: '영어: 약 3.5자에 토큰 1개(대략) · 한국어: 도구마다 다르고 더 잘게', size: 20, weight: 600, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(noteTxt.el), 6.9, { from: 'up' });
        const bigNote = P.text({ x: 300, y: 560, w: 760, text: '<em>대략적인 예시</em>예요. 실제 방식은 도구마다 달라요.', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(bigNote.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            down.draw(P.clamp((t - .8) / .6, 0, 1));
            if (t > 6.2) countTxt.set(`토큰 ${chipData.length}개로 쪼개졌어요`);
          }
        };
      }
    },
    {
      title: '컨텍스트 창 = 책상 크기', dur: 13,
      captions: [
        { t: 0, text: '컨텍스트 창은 AI의 <em>작업 기억</em>이에요. "책상 크기"라고 생각하면 쉬워요.' },
        { t: 5, text: '대화가 이어질수록 책상 위에 토큰 칩이 계속 <em>쌓여요</em>.' },
        { t: 9.5, text: '모델은 <em>책상 위에 있는 것만</em> 볼 수 있어요. 책상 밖은 못 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const desk = P.box({ x: 260, y: 110, w: 820, h: 420, label: '컨텍스트 창', sub: '= 책상', accent: 'brown', icon: P.ICON.desk });
        desk.el.style.justifyContent = 'flex-start'; desk.el.style.paddingTop = '14px';
        tl.at(stage.appendChild(desk.el), .3, { from: 'pop' });
        const rowsData = [
          ['5학년', '대상', '수업', '계획'],
          ['3차시', '로', '나눠', '요'],
          ['평가', '기준표', '도', '필요'],
          ['학습지', '초안', '부탁'],
          ['자료', '출처', '표', '로']
        ];
        const chipEls = [];
        rowsData.forEach((row, ri) => row.forEach((t, ci) => {
          const el = P.chip({ x: 330 + ci * 150, y: 222 + ri * 60, text: t, color: ri % 2 ? 'orange' : 'aqua', size: 20 });
          tl.at(stage.appendChild(el.el), 1.6 + (ri * row.length + ci) * .25, { from: 'pop' });
          chipEls.push(el);
        }));
        const eyeQ = P.quokka({ x: 40, y: 360, size: 280, pose: 'point' });
        tl.at(stage.appendChild(eyeQ.el), 9.6, { from: 'left' });
        const seeTxt = P.text({ x: 260, y: 590, w: 820, text: '책상 위에 있는 것만 <em>보여요</em>. 책상 밖은 안 보여요.', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(seeTxt.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            eyeQ.tick(t, t > 9.5);
          }
        };
      }
    },
    {
      title: '넘치면 생기는 일', dur: 14,
      captions: [
        { t: 0, text: '책상이 넘치면 <em>앞부분이 밀려나거나</em>(채팅 앱에서는 먼저 들어온 것부터 밀어내기도 해요), <em>요약되거나</em>(compaction), <em>오류</em>가 나요.' },
        { t: 6, text: '이 처리 방식은 <em>제품마다 달라요</em>.' },
        { t: 10.5, text: '책상이 커도 <em>가운데 있는 내용</em>은 놓치기 쉽다는 연구도 있어요 — "Lost in the Middle".' }
      ],
      build({ stage, lines, P, tl }) {
        const desk = P.box({ x: 70, y: 260, w: 300, h: 160, label: '책상 넘침', sub: '토큰이 더 못 들어가요', accent: 'brown', icon: P.ICON.desk });
        tl.at(stage.appendChild(desk.el), .3, { from: 'left' });
        const outs = [
          { x: 470, y: 90, label: '밀려남', sub: '먼저 들어온 것부터(채팅 앱 등)', acc: 'orange', icon: P.ICON.x },
          { x: 470, y: 280, label: '요약(compaction)', sub: '앞부분을 짧게 줄여요', acc: 'aqua', icon: P.ICON.doc },
          { x: 470, y: 470, label: '오류', sub: '더 못 넣는다고 알려요', acc: '', icon: P.ICON.x }
        ];
        const boxes = outs.map((o, i) => {
          const b = P.box({ x: o.x, y: o.y, w: 320, h: 120, label: o.label, sub: o.sub, accent: o.acc, icon: o.icon });
          tl.at(stage.appendChild(b.el), 1 + i * 1.6, { from: 'right' });
          return b;
        });
        const arrows = outs.map((o, i) => P.arrow(lines, { x1: 370, y1: 340, x2: o.x, y2: o.y + 60, curve: (i - 1) * -40, width: 4, color: '#1B1F24' }));
        const midRow = ['앞', '중간', '중간', '중간', '뒤'];
        const midChips = midRow.map((t, i) => {
          const c = P.chip({ x: 860 + i * 76, y: 220, text: t, color: i === 2 ? 'orange' : (i === 0 || i === 4 ? 'aqua' : 'gray'), size: 20 });
          tl.at(stage.appendChild(c.el), 7 + i * .2, { from: 'pop' });
          return c;
        });
        const lbl = P.text({ x: 840, y: 300, w: 380, text: '가운데는 놓치기 쉬워요', size: 20, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lbl.el), 10.7, { from: 'up' });
        const q = P.quokka({ x: 850, y: 400, size: 250, pose: 'oops' });
        tl.at(stage.appendChild(q.el), 10.6, { from: 'up' });
        const note = P.text({ x: 60, y: 590, w: 500, text: '처리 방식은 <em>제품마다 달라요</em>.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 6.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - .8 - i * 1.6) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '그래서 이렇게 해요', dur: 13,
      captions: [
        { t: 0, text: '긴 작업을 할 때는 <em>핵심 조건을 새 메시지에 다시</em> 적어 주세요. 학년, 차시, 분량처럼요.' },
        { t: 5.5, text: '또는 <em>요약 메모</em>를 만들어 두고, 새 대화에서 이어 가요.' },
        { t: 10, text: 'AI가 나를 계속 기억하는 게 아니라, <em>지금 대화 안에 있는 만큼</em>, 켜 둔 <em>메모리 기능</em>만큼만 기억해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 340, pose: 'idea' });
        stage.append(q.el);
        const chips = ['학년', '차시', '분량'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 400 + i * 170, y: 120, text: c, color: i % 2 ? 'orange' : 'aqua', size: 26 }).el), .6 + i * .4, { from: 'pop' }));
        const b1 = P.bubble({ x: 400, y: 190, w: 620, text: '"<b>5학년</b> 대상, <b>3차시</b>, 학습지 <b>2쪽</b>으로 다시 정리해 줘"', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(b1.el), 1.4, { from: 'up' });
        const memo = P.box({ x: 400, y: 320, w: 340, h: 110, label: '요약 메모', sub: '핵심만 짧게 적어 둬요', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(memo.el), 5.8, { from: 'up' });
        const newChat = P.box({ x: 820, y: 320, w: 340, h: 110, label: '새 대화', sub: '메모를 붙여넣고 이어 가요', accent: 'ink' });
        tl.at(stage.appendChild(newChat.el), 6.6, { from: 'right' });
        const ar = P.arrow(lines, { x1: 740, y1: 375, x2: 820, y2: 375, width: 4, color: '#127E90' });
        const last = P.text({ x: 400, y: 490, w: 760, text: '지금 대화 안에 있는 만큼, 켜 둔 <em>메모리 기능</em>만큼만 기억해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(last.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            ar.draw(P.clamp((t - 6.9) / .6, 0, 1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '토큰 칩 분해기 + 책상 크기 슬라이더',
    desc: '위 칸에 문장을 치면 <b>토큰 칩</b>으로 쪼개져요(대략적인 예시). 아래 슬라이더로 책상(컨텍스트 창) 크기를 바꾸며, 대화 12턴 중 어디까지 책상에 남는지 확인해 보세요. 넘칠 때 방식도 바꿔 볼 수 있어요.',
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
        chipNote.innerHTML = `칩 <b>${chips.length}개</b> · 대략적인 예시예요. 실제 토큰 수는 도구마다 달라요.`;
      };
      ta.addEventListener('input', renderChips);

      /* ── 부품 B: 책상 크기 슬라이더 ─────────────── */
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
      let capacity = 24, mode = 'evict';

      const secB = P.h('div', { class: 'sim-sec' },
        P.h('h4', {}, '2. 책상(컨텍스트 창) 크기 바꿔 보기')
      );
      const rangeBar = P.h('div', { class: 'sim-rangebar' });
      const capLabel = P.h('label', { for: 'sim-desk-range', class: 'sim-cap' });
      const slider = P.h('input', { id: 'sim-desk-range', type: 'range', min: '8', max: '60', step: '1', value: String(capacity), class: 'sim-range' });
      rangeBar.append(capLabel, slider);
      const modeWrap = P.h('div', { class: 'sim-modes', role: 'radiogroup', 'aria-label': '넘칠 때 방식' });
      const MODES = [['evict', '밀려남'], ['summary', '요약'], ['error', '오류']];
      MODES.forEach(([val, label], idx) => {
        const id = `sim-mode-${val}`;
        const radio = P.h('input', { type: 'radio', name: 'sim-mode', id, value: val, checked: idx === 0 ? '' : null });
        const lab = P.h('label', { for: id }, radio, label);
        modeWrap.append(lab);
        radio.addEventListener('change', () => { if (radio.checked) { mode = val; renderDesk(); } });
      });
      const desk = P.h('div', { class: 'sim-desk', 'aria-live': 'polite' });
      const errBanner = P.h('p', { class: 'sim-err', role: 'alert', hidden: '' }, '책상 용량을 넘었어요 — 오류가 나요. (제품마다 처리 방식이 달라요)');
      secB.append(rangeBar, modeWrap, desk, errBanner);

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
        if (mode === 'summary' && cutoff > 0) {
          const row = P.h('div', { class: 'sim-turn' }, P.h('b', {}, '요약'), P.h('span', { class: 'p-chip c-gray', style: 'position:static;margin:2px' }, `요약: 이전 ${cutoff}턴`));
          desk.append(row);
        }
        TURNS.forEach((turn, i) => {
          const evicted = i < cutoff;
          if (mode === 'summary' && evicted) return;
          const row = P.h('div', { class: `sim-turn${evicted ? ' evicted' : ''}${mode === 'error' && evicted ? ' err' : ''}` });
          row.append(P.h('b', {}, turn.who));
          turn.chips.forEach(t => row.append(P.h('span', { class: 'p-chip c-' + (evicted ? 'gray' : (turn.who === 'AI' ? 'aqua' : 'orange')), style: 'position:static;margin:2px' }, t)));
          if (evicted) row.append(P.h('span', { class: 'sim-flag' }, mode === 'error' ? '오류 위험' : '밀려남'));
          desk.append(row);
        });
        errBanner.hidden = !(mode === 'error' && cutoff > 0);
      }
      slider.addEventListener('input', () => { capacity = +slider.value; renderDesk(); });

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
        .sim-modes{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:13.5px}
        .sim-modes label{display:flex;align-items:center;gap:5px;cursor:pointer}
        .sim-desk{margin-top:12px;border:2px solid var(--brown);background:#F5EEE7;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:6px;max-height:340px;overflow:auto}
        .sim-turn{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:4px 6px;border-radius:10px;transition:opacity .2s}
        .sim-turn b{font-size:12px;color:var(--muted);width:34px;flex:0 0 auto}
        .sim-turn.evicted{opacity:.42}
        .sim-turn.evicted.err b{color:#B3520F}
        .sim-flag{font-size:11px;font-weight:800;color:var(--muted);margin-left:4px}
        .sim-turn.evicted.err .sim-flag{color:#B3520F}
        .sim-err{margin-top:10px;color:#B3520F;font-weight:700;font-size:13.5px;background:var(--orange-pale);border:1px solid #F9D3B8;border-radius:10px;padding:8px 12px}
        .sim-err[hidden]{display:none}
      ` });

      el.append(style, secA, secB);
      renderChips();
      renderDesk();
    }
  },

  teacherLines: [
    'AI는 책상 위에 올려 둔 것만 볼 수 있어요. <b>대화가 길어지면 앞장이 책상 밖으로 밀려나요.</b>',
    'AI가 나를 기억하는 게 아니라, <b>지금 대화창에 있는 만큼만</b> 보는 거예요.'
  ],
  tip: {
    body: '긴 작업은 학년·차시·분량 같은 <b>핵심 조건을 새 메시지에 다시 적어 주거나</b>, 요약 메모를 만든 뒤 새 대화에서 이어 가세요.',
    extra: '중간에 넣은 내용은 놓치기 쉬우니, 정말 중요한 조건은 맨 마지막 메시지에 한 번 더 적어 주면 좋아요.'
  },
  myth: {
    myth: 'AI가 나를 계속 기억한다.',
    fact: '대화 안의 맥락과, 따로 켜 둔 메모리 기능만큼만 기억해요. 새 대화를 열면 그 기억도 거의 사라져요.'
  },
  sources: [
    { title: 'Claude 문서 — Context windows', url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', note: '컨텍스트 창을 작업 기억에 비유해요. claude.ai는 넘치면 먼저 들어온 것부터 밀어낸다고 각주로 설명하고, 넘치면 compaction(요약)이나 오류가 날 수 있다고 안내해요.' },
    { title: 'Claude 용어집 — Tokens / Context window', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: 'Claude 기준 영어는 약 3.5자에 토큰 1개, 언어에 따라 달라진다고 설명해요.' },
    { title: 'Liu et al., 2023 — Lost in the Middle', url: 'https://arxiv.org/abs/2307.03172', note: '긴 문맥에서 가운데에 놓인 정보를 모델이 잘 놓친다는 연구 결과예요.' },
    { title: 'Anthropic Engineering — Effective context engineering for AI agents', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', note: '컨텍스트가 길어질수록 회상 성능이 떨어지는 "context rot"과, 요약해서 새 컨텍스트로 넘기는 compaction을 다뤄요.' }
  ],
  script: `
연수 자료를 만들다가 대화를 서른 번쯤 주고받았는데, AI가 갑자기 "아까 말씀하신 학년이 뭐였죠?" 하고 되물어요. 방금 말했는데 왜 잊어버릴까요?

AI에게 글은 통째로 들어가지 않고 '토큰'이라는 조각으로 쪼개져요. 영어는 대략 서너 글자에 토큰 하나(Claude 기준 약 3.5자), 한국어는 도구마다 다르고 보통 더 잘게 쪼개져요. 컨텍스트 창은 이 토큰이 쌓이는 '책상'이에요. 모델은 책상 위에 있는 것만 봐요.

책상이 넘치면 앞부분이 밀려나거나, 요약되거나, 오류가 나요. 방식은 제품마다 달라요. 책상이 커도 가운데 내용은 놓치기 쉽다는 연구도 있어요.

그러니 긴 작업은 학년·차시·분량 같은 핵심 조건을 새 메시지에 다시 적어 주거나, 요약 메모를 만들고 새 대화에서 이어 가세요. AI가 나를 기억하는 게 아니라, 지금 대화 안에 있는 만큼만 기억한다는 걸 알아 두면 덜 답답해요.
`
};
