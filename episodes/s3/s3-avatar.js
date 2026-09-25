/* E14 [A] 아바타 영상은 진짜일까 — 립싱크와 판별 (시즌 3) */
export default {
  slug: 's3-avatar',
  track: 'A',
  title: '아바타 영상은 진짜일까',
  subtitle: '립싱크와 판별',
  summary: 'AI 아바타가 강의하는 영상, 입 모양이 소리에 딱 맞아서 진짜 사람 같았어요. 왜 그렇게 잘 맞는지, 사람 눈으로 얼마나 가려낼 수 있는지, 그래서 무엇부터 봐야 하는지 3분에 담았어요.',
  keywords: ['아바타', '립싱크', '딥페이크', 'Wav2Lip', '판별', 'AI영상'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 14,
      captions: [
        { t: 0, text: 'AI 아바타가 강의하는 영상, 정말 사람이 가르치는 걸까요?' },
        { t: 5, text: '입 모양이 소리에 <em>딱 맞아서</em> 진짜 사람처럼 보였거든요.' },
        { t: 10, text: '설명은 영상에 맡기고, 판단과 관계는 교사가 맡으면 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const screen = P.box({ x: 130, y: 100, w: 520, h: 260, label: 'AI 아바타 강의 영상', sub: '입 모양이 소리와 딱 맞음', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(screen.el), .3, { from: 'up' });
        const chip = P.chip({ x: 700, y: 90, text: '립싱크 일치', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip.el), 1.2, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 420, size: 240, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 390, w: 500, text: '와, 진짜 선생님인 줄 알았어요!', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 3.2, { from: 'up' });
        const cite = P.box({ x: 250, y: 490, w: 760, h: 110, label: 'Leiker 외 2023 · 성인 대상', sub: '아바타 영상과 강사 영상, 학습 효과에 유의한 차이 없음', accent: 'aqua' });
        tl.at(stage.appendChild(cite.el), 7, { from: 'up' });
        const note = P.text({ x: 250, y: 620, w: 760, text: '설명은 영상에 맡기고, <em>판단과 관계는 교사</em>가 맡아요.', size: 24, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.5, { from: 'up', dist: 10 });
        return { tick(t) { q.tick(t, t > 3 && t < 6.5); } };
      }
    },
    {
      title: '원리: 소리에서 입 모양으로', dur: 14,
      captions: [
        { t: 0, text: '소리를 듣고 <em>입 모양을 예측</em>한 뒤, 원래 얼굴 영상에 입만 바꿔 붙여요.' },
        { t: 5.5, text: 'Wav2Lip처럼 <em>립싱크 판별기</em>가 맞는지 감시하며 학습해요.' },
        { t: 10.5, text: '판별기를 속일 만큼 자연스러워질 때까지 반복해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const s1 = P.box({ x: 90, y: 130, w: 300, h: 130, label: '소리(음성)', accent: 'ink' });
        tl.at(stage.appendChild(s1.el), .3, { from: 'left' });
        const s2 = P.box({ x: 490, y: 130, w: 300, h: 130, label: '입 모양 예측', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(s2.el), 1.6, { from: 'up' });
        const s3 = P.box({ x: 890, y: 130, w: 300, h: 130, label: '얼굴 영상에 입 교체', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(s3.el), 3, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 390, y1: 195, x2: 490, y2: 195, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 790, y1: 195, x2: 890, y2: 195, width: 4, color: '#1B1F24' });
        const judge = P.box({ x: 490, y: 340, w: 300, h: 120, label: '립싱크 판별기', sub: 'Wav2Lip처럼 겨루며 학습', accent: 'ink' });
        tl.at(stage.appendChild(judge.el), 6, { from: 'pop' });
        const a3 = P.arrow(lines, { x1: 1040, y1: 260, x2: 700, y2: 340, curve: 30, dashed: true, width: 3, color: '#F2812D' });
        const lbl = P.text({ x: 470, y: 480, w: 340, text: '판별기를 속일수록 더 자연스러워져요', size: 18, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lbl.el), 9, { from: 'up', dist: 10 });
        const q = P.quokka({ x: 60, y: 440, size: 220, pose: 'think' });
        stage.append(q.el);
        const b = P.bubble({ x: 250, y: 570, w: 560, text: '입만 새로 그려 붙이는 거예요. <b>목소리만 있으면</b> 가능해요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            a1.draw(P.clamp((t - 1) / .6, 0, 1));
            a2.draw(P.clamp((t - 2.4) / .6, 0, 1));
            a3.draw(P.clamp((t - 5.4) / .8, 0, 1));
          }
        };
      }
    },
    {
      title: '사람 눈으로는 구분이 어려워요', dur: 13,
      captions: [
        { t: 0, text: '딥페이크를 사람 눈으로 가려내는 정확도는 평균 <em>55.5%</em>예요.' },
        { t: 5, text: '동전 던지기(50%)랑 비슷한 수준이에요.' },
        { t: 9, text: '단서를 훈련받아도 <em>65.1%</em> 정도예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const title = P.text({ x: 140, y: 90, w: 1000, text: '사람의 딥페이크 판별 정확도', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(title.el), .2, { from: 'down', dist: 10 });
        const trackW = 760, trackX = 250;
        const line50 = P.h('div', { style: `left:${trackX + trackW * .5}px;top:225px;width:2px;height:220px;background:#9AA5AF` });
        tl.at(stage.appendChild(line50), .6, { from: 'down', dist: 10 });
        const line50Lbl = P.text({ x: trackX + trackW * .5 - 90, y: 452, w: 180, text: '동전 던지기 50%', size: 16, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(line50Lbl.el), .8, { from: 'up', dist: 10 });

        const sub1 = P.text({ x: trackX, y: 200, w: trackW, text: '평균(훈련 없음)', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(sub1.el), 1, { from: 'up', dist: 10 });
        const track1 = P.h('div', { style: `left:${trackX}px;top:232px;width:${trackW}px;height:56px;border-radius:14px;background:#EEF1F4;position:relative` });
        const fill1 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0px;border-radius:14px;background:#2BB3C9' });
        track1.append(fill1);
        tl.at(stage.appendChild(track1), 1, { from: 'left' });
        const val1 = P.text({ x: trackX, y: 298, w: trackW, text: '', size: 22, weight: 800, align: 'right', color: '#127E90' });
        stage.appendChild(val1.el);

        const sub2 = P.text({ x: trackX, y: 350, w: trackW, text: '단서 훈련 후 (Diel 외 2024)', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(sub2.el), 5.4, { from: 'up', dist: 10 });
        const track2 = P.h('div', { style: `left:${trackX}px;top:382px;width:${trackW}px;height:56px;border-radius:14px;background:#EEF1F4;position:relative` });
        const fill2 = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0px;border-radius:14px;background:#F2812D' });
        track2.append(fill2);
        tl.at(stage.appendChild(track2), 5.4, { from: 'left' });
        const val2 = P.text({ x: trackX, y: 448, w: trackW, text: '', size: 22, weight: 800, align: 'right', color: '#B3520F' });
        stage.appendChild(val2.el);

        const q = P.quokka({ x: 40, y: 490, size: 180, pose: 'base' });
        stage.append(q.el);
        const b = P.bubble({ x: 210, y: 510, w: 560, text: '단서보다 <b>동전 던지기</b>에 더 가까워요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.8);
            const p1 = P.easeOut(P.clamp((t - 1.4) / 1.6, 0, 1));
            fill1.style.width = `${trackW * .555 * p1}px`;
            val1.set(p1 > .05 ? `${(55.5 * p1).toFixed(1)}%` : '');
            const p2 = P.easeOut(P.clamp((t - 5.8) / 1.6, 0, 1));
            fill2.style.width = `${trackW * .651 * p2}px`;
            val2.set(p2 > .05 ? `${(65.1 * p2).toFixed(1)}%` : '');
          }
        };
      }
    },
    {
      title: '그래도 볼 단서는 있어요', dur: 14,
      captions: [
        { t: 0, text: '살펴볼 단서는 있어요. <em>입 안쪽·치아</em>, <em>눈 깜빡임 리듬</em>부터 볼까요.' },
        { t: 5, text: '<em>손이나 소품</em>, 배경 경계나 소리-입 어긋남도 봐요.' },
        { t: 10, text: '다만 AI 모델도 <em>AI가 만든 이미지인지</em>는 스스로 판정하지 못해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const chipDefs = [
          ['입 안쪽·치아', 90, 140], ['눈 깜빡임 리듬', 350, 140], ['손·소품 디테일', 650, 140],
          ['배경과의 경계', 150, 220], ['소리-입 어긋남', 460, 220]
        ];
        const chips = chipDefs.map(([txt, x, y], i) => {
          const c = P.chip({ x, y, text: txt, color: 'aqua', size: 24 });
          tl.at(stage.appendChild(c.el), .3 + i * .5, { from: 'pop' });
          return c;
        });
        const note = P.text({ x: 90, y: 300, w: 900, text: '다만 최신 모델은 이 단서들도 점점 잘 흉내 내요.', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 3.2, { from: 'up', dist: 10 });
        const cite = P.box({ x: 190, y: 380, w: 950, h: 110, label: 'AI도 스스로는 몰라요', sub: '"AI가 만든 이미지인지"는 공식 문서도 판정 못 한다고 밝혀요', accent: 'ink' });
        tl.at(stage.appendChild(cite.el), 9.6, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 470, size: 190, pose: 'point' });
        stage.append(q.el);
        const b = P.bubble({ x: 260, y: 500, w: 540, text: '단서는 있지만, 점점 <b>약해지고</b> 있어요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 11.5, { from: 'up' });
        return { tick(t) { q.tick(t, t > 11.3); } };
      }
    },
    {
      title: '할 일', dur: 12,
      captions: [
        { t: 0, text: '<em>진짜 같음</em>이 <em>진짜</em>는 아니에요.' },
        { t: 4, text: '출처, 그러니까 누가 어디에 올렸는지부터 봐요.' },
        { t: 8.5, text: '학교 영상에는 <em>AI 아바타</em>라고 표시해 주세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['진짜 같음 ≠ 진짜', 110],
          ['출처(누가·어디에 올렸나)부터 보기', 240],
          ["학교 영상엔 'AI 아바타'라고 표시하기", 370]
        ];
        const boxes = rows.map(([label, y], i) => {
          const bx = P.box({ x: 170, y, w: 1020, h: 100, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(bx.el), .4 + i * 1.5, { from: 'up' });
          return bx;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680, y1: 210 + i * 130, x2: 680, y2: 240 + i * 130, width: 4, color: '#127E90' }));
        const q = P.quokka({ x: 30, y: 460, size: 200, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 190, y: 540, w: 560, text: '확인은 늘 <b>사람 몫</b>이에요.', tail: 'left', size: 24, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 6);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.5 + i * 1.5)) / .5, 0, 1)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '판별 단서 카드 뒤집기',
    desc: '카드 6장을 눌러 단서를 뒤집어 보세요. 그리고 위 미니 퀴즈로 <b>내 판별력</b>도 점검해 보세요.',
    mount(el, P) {
      const QUESTIONS = [
        { text: '입 모양이 소리에 딱 맞고, 화질도 아주 선명해요.' },
        { text: '눈을 깜빡이는 간격이 이상하리만치 일정하게 느껴져요.' },
        { text: '학교 공식 채널이 아니라 처음 보는 계정이 올린 영상이에요.' }
      ];
      const CLUES = [
        { id: 'mouth', label: '입 안쪽 · 치아', watch: '입을 크게 벌릴 때 치아나 혀 안쪽이 뭉개지거나 뿌옇게 보이는지 봐요.', limit: '한계: 최근 모델은 치아까지 또렷하게 그려서 이 단서가 점점 약해지고 있어요.' },
        { id: 'blink', label: '눈 깜빡임 리듬', watch: '깜빡이는 간격이 너무 규칙적이거나, 거의 안 깜빡이는지 확인해요.', limit: '한계: 최신 영상은 자연스러운 불규칙 깜빡임까지 흉내 내요.' },
        { id: 'hands', label: '손과 소품', watch: '손가락 수, 반지·귀걸이 같은 소품이 장면마다 똑같이 유지되는지 봐요.', limit: '한계: 얼굴 위주로 편집한 영상은 손이 아예 안 나와서 못 쓰는 단서예요.' },
        { id: 'edge', label: '배경과의 경계', watch: '얼굴과 배경, 목과 옷깃 사이 경계선이 흐릿하거나 깜빡이는지 봐요.', limit: '한계: 원본 화질이 낮으면 진짜 영상도 경계가 흐려서 헷갈려요.' },
        { id: 'sync', label: '소리와 입의 어긋남', watch: 'ㅁ·ㅂ·ㅍ처럼 입술이 붙는 소리에서 입이 살짝 늦거나 빠른지 들어봐요.', limit: '한계: 사람은 이 어긋남을 수십 밀리초 단위로는 거의 못 느껴요.' },
        { id: 'source', label: '출처 확인', watch: '누가, 언제, 어디에 올렸는지 원출처가 있는지부터 봐요.', limit: '한계이라기보다 출발점이에요. 화면 속 단서보다 늘 먼저 봐야 해요.' }
      ];

      const wrap = P.h('div', { class: 'sim-avt' });
      const quiz = P.h('div', { class: 'sim-avt-quiz' });
      const fields = QUESTIONS.map((q, i) => {
        const fs = P.h('fieldset', { class: 'sim-avt-q' }, P.h('legend', {}, `${i + 1}. ${q.text}`));
        const opts = P.h('div', { class: 'sim-avt-opts' });
        ['진짜', 'AI', '모름'].forEach(v => {
          const id = `s3av-q${i}-${v}`;
          const label = P.h('label', { for: id },
            P.h('input', { type: 'radio', name: `q${i}`, id, value: v }), v);
          opts.append(label);
        });
        fs.append(opts);
        return fs;
      });
      const revealBtn = P.h('button', { class: 'btn primary', type: 'button' }, '정답 공개');
      const result = P.h('div', { class: 'sim-avt-result', hidden: '' });
      quiz.append(...fields, revealBtn, result);

      const cards = P.h('div', { class: 'sim-avt-cards' });
      const cardEls = CLUES.map(c => {
        const btn = P.h('button', { class: 'sim-card', type: 'button', 'aria-pressed': 'false' },
          P.h('span', { class: 'front' }, c.label),
          P.h('span', { class: 'back' },
            P.h('b', {}, c.label),
            P.h('p', {}, `무엇을 보나: ${c.watch}`),
            P.h('p', { class: 'lim' }, c.limit)
          )
        );
        btn.addEventListener('click', () => {
          const on = !btn.classList.contains('flipped');
          btn.classList.toggle('flipped', on);
          btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        cards.append(btn);
        return btn;
      });

      wrap.append(quiz, cards);
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-avt-quiz{border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);margin-bottom:16px}
        .sim-avt-q{border:0;padding:0;margin:0 0 12px}
        .sim-avt-q legend{font-weight:700;font-size:14.5px;padding:0 0 8px;white-space:normal}
        .sim-avt-opts{display:flex;gap:14px;flex-wrap:wrap}
        .sim-avt-opts label{display:inline-flex;align-items:center;gap:6px;font-size:14px;cursor:pointer}
        .sim-avt-result{margin-top:12px;border:1px solid var(--orange);background:var(--orange-pale);border-radius:12px;padding:12px 14px;font-size:14.5px;line-height:1.6}
        .sim-avt-result p{margin:0 0 6px}
        .sim-avt-result p:last-child{margin-bottom:0}
        .sim-avt-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        @media (max-width:640px){ .sim-avt-cards{grid-template-columns:repeat(2,1fr)} }
        .sim-card{position:relative;min-height:140px;border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff;text-align:left;cursor:pointer;font-size:14px;line-height:1.55;display:flex;align-items:center}
        .sim-card .front{font-weight:800;font-size:16px}
        .sim-card .back{display:none}
        .sim-card.flipped{align-items:flex-start;border-color:var(--orange);background:var(--orange-pale)}
        .sim-card.flipped .front{display:none}
        .sim-card.flipped .back{display:block}
        .sim-card .back b{display:block;color:#B3520F;margin-bottom:6px;font-size:14.5px}
        .sim-card .back p{margin:0 0 6px}
        .sim-card .back p.lim{color:var(--muted)}
        .sim-card:focus-visible{outline:2px solid var(--aqua);outline-offset:2px}
      ` });
      el.append(style);

      revealBtn.addEventListener('click', () => {
        const picks = QUESTIONS.map((_, i) => {
          const checked = quiz.querySelector(`input[name="q${i}"]:checked`);
          return checked ? checked.value : '무응답';
        });
        result.hidden = false;
        result.innerHTML = `<p><b>내 답:</b> ${picks.join(' · ')}</p><p>사람 평균은 <b>55.5%</b>예요. 단서보다 <b>출처</b>가 먼저예요.</p>`;
      });
    }
  },

  teacherLines: [
    '입 모양이 딱 맞아도 진짜라는 뜻은 아니에요. 요즘은 소리에 맞춰 입만 새로 그려요.',
    '진짜인지 볼 때는 화면보다 먼저 <b>누가 올렸는지</b>를 봐요.'
  ],
  tip: {
    body: '학교 아바타 영상에는 <b>\'AI 아바타\'</b>라고 표시하고, 학생 얼굴로 아바타를 만들지 않아요.',
    extra: '설명이 필요한 영상은 아바타에게 맡기고, 판단이 필요한 관계와 피드백은 교사가 직접 맡는 편이 안전해요.'
  },
  myth: {
    myth: '눈으로 보면 딥페이크를 가려낼 수 있다.',
    fact: '사람의 평균 판별 정확도는 55.5%로 동전 던지기 수준이에요. 단서보다 출처와 맥락을 먼저 봐요.'
  },
  sources: [
    { title: 'Wav2Lip: A Lip Sync Expert Is All You Need (arXiv 2008.10010)', url: 'https://arxiv.org/abs/2008.10010', note: '소리에 맞춰 입 모양을 만들고, 립싱크 판별기와 겨루며 학습하는 방식을 제시해요.' },
    { title: 'Vision — Claude Developer Platform 문서', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', note: 'AI 모델도 이미지가 AI로 생성됐는지 판정할 수 없다고 명시해요.' },
    { title: 'AI 영상 미디어교육 2026 대시보드', url: 'https://gottkf1208.github.io/ai-video-media-edu/', note: 'Diel 외 2024 메타분석(55.5%→65.1%)과 Leiker 외 2023 아바타 영상 효과 연구를 정리해요.' }
  ],
  script: `
AI 아바타가 강의하는 영상, 입 모양이 소리에 딱 맞아 진짜 같았어요. 성인 대상 실험에서는 아바타 영상과 강사 영상의 학습 효과에 차이가 없었어요. 설명은 영상에, 판단과 관계는 교사가 맡아요.

원리는 간단해요. 소리로 입 모양을 예측해 얼굴 영상에 입만 바꿔 붙여요. Wav2Lip처럼 립싱크 판별기와 겨루며 학습해요.

문제는 사람 눈으로 가려내기 어렵다는 거예요. 정확도는 평균 55.5퍼센트, 동전 던지기 수준이에요. 훈련 후에도 65.1퍼센트예요.

단서는 있어요. 입 안쪽이나 치아, 눈 깜빡임 리듬부터 살펴보고, 손·소품이나 배경 경계, 소리와 입이 어긋나는지도 봐요. 다만 AI도 자기가 만든 이미지인지는 스스로 판정 못 해요.

진짜 같다고 진짜는 아니에요. 누가 올렸는지부터 보고, 학교 영상엔 AI라고 표시해요.
`
};
