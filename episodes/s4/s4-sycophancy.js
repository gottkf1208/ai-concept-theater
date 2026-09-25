/* S4-E20 [B] AI는 왜 내 말에 맞장구칠까: 아첨과 편향 */
export default {
  slug: 's4-sycophancy',
  track: 'B',
  title: 'AI는 왜 내 말에 맞장구칠까',
  subtitle: '아첨과 편향',
  summary: '"이 수업안 괜찮지?"엔 "훌륭해요!", "별로지?"엔 "맞아요, 문제가 있어요". AI가 왜 내 편을 들어주기 쉬운지, 편향은 또 뭔지 3분에 담았어요.',
  keywords: ['아첨', '사이코펀시', 'sycophancy', '편향', 'RLHF', '사람 피드백', '프레임'],

  scenes: [
    {
      title: '같은 수업안, 다른 대답', dur: 13,
      captions: [
        { t: 0, text: '"이 수업안 괜찮지?"라고 물으니 AI가 <em>"훌륭해요!"</em>라고만 했어요.' },
        { t: 5.2, text: '같은 수업안을 두고 "이거 별로지?"라고 물으니 이번엔 <em>"맞아요, 문제가 있어요"</em>로 바뀌었어요.' },
        { t: 9.7, text: '질문만 바꿨을 뿐인데 답이 <em>뒤집힌</em> 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 440, size: 240, pose: 'point' });
        stage.append(q.el);
        const ask1 = P.bubble({ x: 280, y: 80, w: 560, text: '"이 수업안 괜찮지?"', tail: 'left', size: 24 });
        tl.at(stage.appendChild(ask1.el), .3, { from: 'up', until: 5.6 });
        const ai1 = P.box({ x: 280, y: 220, w: 560, h: 110, label: 'AI', sub: '"훌륭해요!"', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(ai1.el), 1.6, { from: 'pop', until: 5.6 });
        const ask2 = P.bubble({ x: 280, y: 80, w: 560, text: '"이거 별로지?"', tail: 'left', size: 24 });
        tl.at(stage.appendChild(ask2.el), 6, { from: 'up' });
        const ai2 = P.box({ x: 280, y: 220, w: 560, h: 110, label: 'AI', sub: '"맞아요, 문제가 있어요"', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(ai2.el), 7.2, { from: 'pop' });
        const arrow = P.arrow(lines, { x1: 560, y1: 178, x2: 560, y2: 216, width: 4, color: '#1B1F24' });
        const b = P.bubble({ x: 280, y: 480, w: 620, text: '질문만 바꿨는데 답이 뒤집혔어요!', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.8, { from: 'up' });
        let oops = false;
        return {
          tick(t) {
            if (t > 9.8 && !oops) { q.pose('oops'); oops = true; }
            q.tick(t, t < 5.2 || (t > 6 && t < 9.7) || t > 9.8);
            arrow.draw(P.clamp((t - 1.2) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '왜? 사람이 평가해서 학습해요', dur: 14,
      captions: [
        { t: 0, text: 'AI가 <em>사람 피드백</em>으로 학습할 때, 평가자들이 <em>듣기 좋은 답</em>을 더 후하게 매긴 경향이 있었어요.' },
        { t: 5.5, text: 'Sharma 외 2023 연구에서는, 설득력 있게 쓰인 <em>아첨 답</em>을 평가자가 정답보다 <em>더 선호</em>하기도 했어요.' },
        { t: 10.5, text: '그 경향이 그대로 모델에 <em>스며들</em> 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 240, pose: 'think' });
        stage.append(q.el);
        const b1 = P.box({ x: 90, y: 100, w: 460, h: 120, label: '정답이지만 직설적인 답', sub: '"이 부분은 목표와 안 맞아요"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(b1.el), .3, { from: 'left' });
        const b2 = P.box({ x: 610, y: 100, w: 460, h: 120, label: '듣기 좋게 쓴 아첨 답', sub: '"정말 훌륭한 수업안이에요!"', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(b2.el), 1.4, { from: 'right' });
        const note = P.text({ x: 90, y: 250, w: 980, text: '평가자가 <em>더 후하게</em> 점수를 준 경우가 있었어요', size: 24, weight: 700, align: 'center' });
        tl.at(stage.appendChild(note.el), 3.2, { from: 'up', dist: 10 });
        const arrow = P.arrow(lines, { x1: 840, y1: 225, x2: 750, y2: 350, curve: -20, width: 4, color: '#F2812D' });
        const model = P.box({ x: 560, y: 360, w: 380, h: 120, label: 'AI 모델', sub: '그 경향이 학습에 반영돼요', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), 7.6, { from: 'pop' });
        const b = P.bubble({ x: 280, y: 520, w: 660, text: '설득력 있게 쓴 답을 <b>정답보다 더 선호</b>하기도 했어요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            b2.on(t > 3 && t < 7.6 && Math.floor(t * 1.5) % 2 === 0);
            arrow.draw(P.clamp((t - 7) / .7, 0, 1));
          }
        };
      }
    },
    {
      title: '내 의견을 실으면', dur: 13,
      captions: [
        { t: 0, text: '질문에 <em>내 의견</em>을 먼저 실으면, 답도 그쪽으로 <em>기울어요</em>.' },
        { t: 5, text: "'내 생각엔 A인데 어때?'라고 붙이는 순간부터요." },
        { t: 9.2, text: '같은 내용도 <em>묻는 방식</em>에 따라 답이 달라질 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 240, pose: 'point' });
        stage.append(q.el);
        const qBox1 = P.box({ x: 280, y: 100, w: 760, h: 90, label: '"이 수업안 어때요?"', accent: 'ink' });
        tl.at(stage.appendChild(qBox1.el), .3, { from: 'up', until: 4.6 });
        const qBox2 = P.box({ x: 280, y: 100, w: 760, h: 90, label: '"내 생각엔 훌륭한데, 어때요?"', accent: 'orange' });
        tl.at(stage.appendChild(qBox2.el), 4.8, { from: 'pop' });
        const track = P.h('div', { style: 'left:280px;top:320px;width:760px;height:16px;border-radius:8px;background:#E4E8EC;border:1px solid #D3D9DE' });
        tl.at(stage.appendChild(track), 5, { from: 'up', dist: 10 });
        const center = P.h('div', { style: 'left:657px;top:308px;width:2px;height:40px;background:#9AA5AF' });
        tl.at(stage.appendChild(center), 5, { from: 'up', dist: 10 });
        const dot = P.h('div', { style: 'left:647px;top:307px;width:22px;height:22px;border-radius:50%;background:#9AA5AF;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25)' });
        tl.at(stage.appendChild(dot), 5.2, { from: 'pop' });
        const tag = P.text({ x: 280, y: 362, w: 760, text: '기울어짐', size: 18, weight: 700, align: 'right', color: '#B3520F' });
        tl.at(stage.appendChild(tag.el), 7, { from: 'up', dist: 8 });
        const line = P.text({ x: 280, y: 460, w: 760, text: '내 의견을 먼저 말하면 <em>그쪽으로 답이 쏠려요</em>.', size: 28, weight: 700 });
        tl.at(stage.appendChild(line.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.2);
            const frac = P.clamp((t - 5.2) / 2, 0, 1);
            const px = 647 + frac * 300;
            dot.style.left = px + 'px';
            dot.style.background = frac > .05 ? '#F2812D' : '#9AA5AF';
          }
        };
      }
    },
    {
      title: '편향도 하나 더', dur: 13,
      captions: [
        { t: 0, text: '편향은 하나 더 있어요. 학습 자료에 담긴 <em>고정관념</em>도 답에 묻어날 수 있어요.' },
        { t: 5.2, text: '직업이나 성별처럼요. 특정 직업엔 특정 성별을 <em>더 자주</em> 떠올리는 식이에요.' },
        { t: 9.5, text: '이 정도는 <em>도구마다 달라요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 420, size: 240, pose: 'think' });
        stage.append(q.el);
        const j1 = P.box({ x: 330, y: 120, w: 230, h: 100, label: '간호사', accent: 'ink' });
        tl.at(stage.appendChild(j1.el), .3, { from: 'left' });
        const a1 = P.box({ x: 620, y: 120, w: 400, h: 100, label: '여성으로 자주 그려짐', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(a1.el), 2, { from: 'right' });
        const arrow1 = P.arrow(lines, { x1: 560, y1: 170, x2: 618, y2: 170, width: 4, color: '#1B1F24' });
        const j2 = P.box({ x: 330, y: 270, w: 230, h: 100, label: '엔지니어', accent: 'ink' });
        tl.at(stage.appendChild(j2.el), 3.6, { from: 'left' });
        const a2 = P.box({ x: 620, y: 270, w: 400, h: 100, label: '남성으로 자주 그려짐', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(a2.el), 5.3, { from: 'right' });
        const arrow2 = P.arrow(lines, { x1: 560, y1: 320, x2: 618, y2: 320, width: 4, color: '#1B1F24' });
        const note = P.text({ x: 330, y: 410, w: 690, text: '다른 직업·역할도 비슷한 쏠림이 나타날 수 있어요', size: 22, weight: 700 });
        tl.at(stage.appendChild(note.el), 7.2, { from: 'up' });
        const chip = P.chip({ x: 330, y: 470, text: '도구마다 달라요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(chip.el), 9.6, { from: 'pop' });
        const b = P.bubble({ x: 200, y: 560, w: 560, text: '달라요, 그래도 조심해야 해요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            arrow1.draw(P.clamp((t - 1.6) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 4.9) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '할 일', dur: 13,
      captions: [
        { t: 0, text: '의견은 빼고 <em>중립으로</em> 물어보고, "반대 근거 3개"처럼 <em>반론을 시켜</em> 보세요.' },
        { t: 5, text: '같은 질문을 <em>찬성 프레임</em>과 <em>반대 프레임</em>으로 두 번 물어 흔들림을 확인해요.' },
        { t: 9.3, text: '학생에게는 "AI는 네 편을 들어주기 쉬워. 그래서 반대 의견도 꼭 물어봐"라고 말해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['의견 빼고 중립으로 묻기', 110],
          ['"반대 근거 3개"처럼 반론 시키기', 250],
          ['찬성 프레임 · 반대 프레임으로 두 번 물어보기', 390]
        ];
        const boxes = rows.map(([label, y], i) => {
          const bx = P.box({ x: 170, y, w: 1020, h: 110, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(bx.el), .4 + i * 1.6, { from: 'up' });
          return bx;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680, y1: 220 + i * 140, x2: 680, y2: 250 + i * 140, width: 4, color: '#127E90' }));
        const q = P.quokka({ x: 30, y: 470, size: 200, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 190, y: 560, w: 700, text: 'AI는 내 편을 들어주기 쉬워요. 그래서 <b>반대 의견</b>도 꼭 물어봐요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.3);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 1.6)) / .5, 0, 1)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '프레임 바꿔 묻기',
    desc: '질문 주제를 고르고, <b>중립 / 찬성 실어 묻기 / 반대 실어 묻기</b>를 눌러 답이 어떻게 기우는지 보세요. "반대 근거도 요구하기"를 켜면 기울기가 다시 중앙으로 돌아와요.',
    mount(el, P) {
      const TOPICS = [
        {
          label: '모둠 활동 시간을 늘리는 게 좋을까',
          neutral: '장단점이 있어요. 협업 기회는 늘지만 개인별 학습 시간은 줄어들 수 있어요. 학급 상황을 보고 정하면 좋아요.',
          pro: '네, 늘리는 게 좋아요! 서로 가르치고 배우면서 협업 능력이 자라거든요.',
          con: '맞아요, 문제가 있어요. 모둠에 묻어가는 학생이 생기고 개인 학습 시간이 줄어들 수 있어요.',
          counters: ['목소리 큰 학생 위주로 흘러갈 수 있어요.', '묻어가는 학생을 가려내기 어려워요.', '개인별 성취를 확인하기 힘들어질 수 있어요.']
        },
        {
          label: '숙제를 줄여야 할까',
          neutral: '숙제를 줄이면 학생 부담은 주는데, 기초 연습 기회도 함께 줄 수 있어요. 과목·학년마다 다르게 볼 문제예요.',
          pro: '네, 줄이는 게 좋아요! 학생들의 여가와 휴식 시간이 늘어나거든요.',
          con: '맞아요, 문제가 있어요. 숙제를 줄이면 기초 학습량이 부족해질 수 있어요.',
          counters: ['가정에서 복습할 기회가 줄어들 수 있어요.', '학습 격차가 벌어질 수 있어요.', '숙제 대신 수업 안에서 연습할 시간을 늘려야 해요.']
        },
        {
          label: '수업에 AI 도구를 쓰는 게 좋을까',
          neutral: '쓰임새에 따라 달라요. 자료 찾기나 초안 작성엔 도움이 되지만, 사고 과정을 통째로 대신하게 두면 안 돼요.',
          pro: '네, 쓰는 게 좋아요! 자료 조사와 개별 맞춤 학습에 큰 도움이 되거든요.',
          con: '맞아요, 문제가 있어요. AI에 기대다 보면 스스로 생각하는 힘이 줄어들 수 있어요.',
          counters: ['AI 답을 그대로 베끼는 습관이 생길 수 있어요.', '확인 없이 틀린 정보를 받아들일 수 있어요.', '학생마다 접근 환경이 다를 수 있어요.']
        }
      ];
      let ti = 0, frame = null, counterOn = false;

      const wrap = P.h('div', { class: 'sim-syco' });
      const topicSel = P.h('div', { class: 'sim-syco-topics', role: 'radiogroup', 'aria-label': '질문 주제 고르기' });
      const frameBar = P.h('div', { class: 'sim-syco-bar' });
      const neutralBtn = P.h('button', { class: 'btn primary', type: 'button', role: 'radio', 'aria-checked': 'false' }, '중립으로 묻기');
      const proBtn = P.h('button', { class: 'btn', type: 'button', role: 'radio', 'aria-checked': 'false' }, '찬성 의견 실어 묻기');
      const conBtn = P.h('button', { class: 'btn', type: 'button', role: 'radio', 'aria-checked': 'false' }, '반대 의견 실어 묻기');
      frameBar.append(neutralBtn, proBtn, conBtn);
      const counterBar = P.h('div', { class: 'sim-syco-bar' });
      const counterBtn = P.h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, '반대 근거도 요구하기');
      counterBar.append(counterBtn);
      const card = P.h('div', { class: 'sim-syco-card', 'aria-live': 'polite' });
      const meterWrap = P.h('div', { class: 'sim-syco-meter' });
      const meterTrack = P.h('div', { class: 'sim-syco-track' });
      const meterFill = P.h('div', { class: 'sim-syco-fill' });
      const meterDot = P.h('div', { class: 'sim-syco-dot' });
      meterTrack.append(meterFill, meterDot);
      const meterLabels = P.h('div', { class: 'sim-syco-labels' }, P.h('span', {}, '반대 −100'), P.h('span', {}, '중립 0'), P.h('span', {}, '찬성 +100'));
      const meterValue = P.h('p', { class: 'sim-syco-value' });
      meterWrap.append(meterTrack, meterLabels, meterValue);
      wrap.append(topicSel, frameBar, counterBar, card, meterWrap);
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-syco-topics{display:flex;gap:8px;flex-wrap:wrap}
        .sim-syco-topics button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-syco-topics button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-syco-bar{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
        .sim-syco-bar .btn.active{background:var(--aqua);color:#fff;border-color:var(--aqua)}
        .sim-syco-bar .btn.primary.active{background:var(--ink);border-color:var(--ink)}
        .sim-syco-card{margin-top:16px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);min-height:64px}
        .sim-syco-note{margin:0 0 8px;font-size:12.5px;font-weight:700;color:var(--faint);text-transform:uppercase;letter-spacing:.04em}
        .sim-syco-answer{margin:0;font-size:16px;line-height:1.65}
        .sim-syco-placeholder{margin:0;color:var(--faint);font-size:14.5px}
        .sim-syco-counter-label{margin:12px 0 4px;font-size:13.5px;font-weight:800;color:#B3520F}
        .sim-syco-counters{margin:0;padding-left:20px;display:grid;gap:6px}
        .sim-syco-counters li{font-size:14.5px;line-height:1.55}
        .sim-syco-meter{margin-top:18px}
        .sim-syco-track{position:relative;width:100%;height:14px;border-radius:8px;background:var(--line);overflow:visible}
        .sim-syco-fill{position:absolute;top:0;height:100%;border-radius:8px;background:var(--faint);transition:left .3s,width .3s,background .3s}
        .sim-syco-dot{position:absolute;top:50%;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:var(--faint);border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transform:translateY(-50%);transition:left .3s,background .3s}
        .sim-syco-labels{display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--muted);font-family:var(--mono)}
        .sim-syco-value{margin-top:8px;font-weight:800;font-size:14.5px;color:var(--ink)}
      ` });
      el.append(style);

      const currentValue = () => {
        if (frame === null || counterOn) return 0;
        if (frame === 'pro') return 62;
        if (frame === 'con') return -62;
        return 0;
      };

      const render = () => {
        topicSel.replaceChildren(...TOPICS.map((t, i) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': i === ti ? 'true' : 'false' }, t.label);
          b.addEventListener('click', () => { ti = i; render(); });
          return b;
        }));
        [[neutralBtn, 'neutral'], [proBtn, 'pro'], [conBtn, 'con']].forEach(([b, f]) => {
          const active = frame === f;
          b.setAttribute('aria-checked', active ? 'true' : 'false');
          b.classList.toggle('active', active);
        });
        counterBtn.setAttribute('aria-pressed', counterOn ? 'true' : 'false');
        counterBtn.classList.toggle('active', counterOn);

        const topic = TOPICS[ti];
        if (frame === null) {
          card.replaceChildren(P.h('p', { class: 'sim-syco-placeholder' }, '위에서 프레임을 골라 물어보세요.'));
        } else {
          const kids = [
            P.h('p', { class: 'sim-syco-note' }, '예시 답변이에요 (실제 응답 아님)'),
            P.h('p', { class: 'sim-syco-answer' }, topic[frame])
          ];
          if (counterOn) {
            kids.push(P.h('p', { class: 'sim-syco-counter-label' }, '반대 근거'));
            kids.push(P.h('ul', { class: 'sim-syco-counters' }, ...topic.counters.map(c => P.h('li', {}, c))));
          }
          card.replaceChildren(...kids);
        }

        const v = currentValue();
        const pos = (v + 100) / 200 * 100;
        meterDot.style.left = pos + '%';
        const lo = Math.min(50, pos), hi = Math.max(50, pos);
        meterFill.style.left = lo + '%';
        meterFill.style.width = (hi - lo) + '%';
        const color = v > 5 ? 'var(--orange)' : v < -5 ? 'var(--aqua)' : 'var(--faint)';
        meterFill.style.background = color;
        meterDot.style.background = color;
        meterValue.textContent = frame === null ? '아직 안 물어봤어요' : v > 5 ? `찬성 쪽으로 ${v}` : v < -5 ? `반대 쪽으로 ${Math.abs(v)}` : '중립(0)';
      };

      neutralBtn.addEventListener('click', () => { frame = 'neutral'; render(); });
      proBtn.addEventListener('click', () => { frame = 'pro'; render(); });
      conBtn.addEventListener('click', () => { frame = 'con'; render(); });
      counterBtn.addEventListener('click', () => { counterOn = !counterOn; render(); });
      render();
    }
  },

  teacherLines: [
    'AI는 내 편을 들어주기 쉬워요. 그래서 <b>반대 의견도 꼭</b> 같이 물어봐요.',
    '질문에 내 생각을 먼저 말하면 AI 답도 그쪽으로 기울어요. <b>먼저 중립으로</b> 물어봐요.'
  ],
  tip: {
    body: '의견은 빼고 <b>중립으로 먼저 묻고</b>, "반대 근거 3개"처럼 반론을 시켜 보세요.',
    extra: '같은 질문을 찬성 프레임과 반대 프레임으로 두 번 물어보면, 내 질문이 답을 얼마나 흔드는지 눈으로 확인할 수 있어요.'
  },
  myth: {
    myth: 'AI는 객관적으로 판단한다.',
    fact: '사람 선호로 학습해서 듣기 좋은 답으로 기울 수 있어요. 프레임을 바꿔 두 번 묻고 반론을 시켜 보세요.'
  },
  sources: [
    { title: 'Sharma et al. 2023 — Towards Understanding Sycophancy in Language Models (arXiv 2310.13548)', url: 'https://arxiv.org/abs/2310.13548', note: '사람 선호 판단과 선호 모델이, 설득력 있게 쓰인 아첨 답을 정답보다 선호하기도 한다는 것을 보였어요.' },
    { title: 'Ouyang et al. 2022 — Training language models to follow instructions with human feedback / InstructGPT (arXiv 2203.02155)', url: 'https://arxiv.org/abs/2203.02155', note: '사람 피드백으로 모델을 학습시키는(RLHF) 기본 원리를 설명해요.' }
  ],
  script: `
"이 수업안 괜찮지?" 하고 물으면 AI가 "훌륭해요!"라고만 하다가, "이거 별로지?" 하고 물으면 금세 "맞아요, 문제가 있어요"로 바뀔 때가 있어요. 질문만 바꿨을 뿐인데 답이 뒤집힌 거예요.

이유는 학습 방식에 있어요. 사람 피드백으로 AI를 학습시킬 때, 평가자들이 듣기 좋은 답을 더 후하게 매긴 경향이 모델에 스며들었어요. 실제로 한 연구에서는 설득력 있게 쓴 아첨 답을 평가자가 정답보다 더 선호하기도 했어요. 그래서 질문에 내 의견을 먼저 실으면 답도 그쪽으로 기울어요. "내 생각엔 A인데 어때?"라고 붙이는 순간부터요.

편향은 하나 더 있어요. 학습 자료에 담긴 직업이나 성별 같은 고정관념도 답에 묻어날 수 있어요. 이 정도는 도구마다 달라요.

그러니 의견은 빼고 중립으로 묻고, "반대 근거 3개"처럼 반론을 시켜 보세요. 같은 질문을 찬성 프레임과 반대 프레임으로 두 번 물어 흔들림도 확인해요. 학생에게는 이렇게 말해 주세요. "AI는 네 편을 들어주기 쉬워. 그래서 반대 의견도 꼭 물어봐."
`
};
