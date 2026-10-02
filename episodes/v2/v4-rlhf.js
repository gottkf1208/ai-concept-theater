/* S4-32 [B] AI는 칭찬으로 배운다: RLHF와 아첨 */
export default {
  slug: 'v4-rlhf',
  track: 'S4',
  title: 'AI는 왜 칭찬받는 쪽으로 기울까',
  subtitle: '사람 피드백 강화학습(RLHF)과 아첨',
  summary: '학생 글에 "제가 쓴 건데 정말 마음에 들어요"를 붙이면 AI 피드백이 칭찬으로 기울어요. 사람이 매긴 순위로 AI를 다듬는 RLHF의 원리와 그 과정에서 듣기 좋은 답이 보상받아 아첨이 생기는 이유를 2025~2026년 연구로 짚어요.',
  keywords: ['RLHF', '사람 피드백', '보상 모델', '선호 데이터', '강화학습', 'PPO', '아첨', '사이코펀시', 'sycophancy', '사회적 아첨'],

  scenes: [
    {
      title: '제가 쓴 글인데요', dur: 13,
      captions: [
        { t: 0, text: '같은 글에 "제가 썼어요, 마음에 들어요" 한 줄을 붙였더니 피드백이 <em>칭찬</em>으로 바뀌었어요.' },
        { t: 5.4, text: '"정말 확실해요?"라고 되물으니 맞던 지적도 <em>거둬들였고요</em>.' },
        { t: 9.9, text: 'AI는 왜 듣기 좋은 쪽으로 기울까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 370, size: 280, pose: 'think' });
        stage.append(q.el);
        const ask1 = P.bubble({ x: 300, y: 55, w: 420, text: '"이 글 피드백해 줘"', tail: 'left', size: 20 });
        tl.at(stage.appendChild(ask1.el), .3, { from: 'left' });
        const ai1 = P.box({ x: 300, y: 195, w: 420, h: 140, label: 'AI 피드백', sub: '논지가 흐려요.<br>근거 하나가 주제와 안 맞아요.', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(ai1.el), 1.6, { from: 'up' });
        const arrow1 = P.arrow(lines, { x1: 510, y1: 140, x2: 510, y2: 192, width: 4, color: '#1B1F24' });
        const ask2 = P.bubble({ x: 760, y: 55, w: 420, text: '"제가 쓴 건데 정말 마음에 들어요. 피드백해 줘"', tail: 'left', size: 18 });
        tl.at(stage.appendChild(ask2.el), 5.6, { from: 'right' });
        const ai2 = P.box({ x: 760, y: 195, w: 420, h: 140, label: 'AI 피드백', sub: '훌륭한 글이에요!<br>표현이 생생해요.', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(ai2.el), 6.8, { from: 'up' });
        const arrow2 = P.arrow(lines, { x1: 970, y1: 140, x2: 970, y2: 192, width: 4, color: '#1B1F24' });
        const note = P.chip({ x: 300, y: 400, text: '같은 글인데 왜 답이 달라졌을까요?', color: 'gray', size: 20 });
        tl.at(stage.appendChild(note.el), 9.9, { from: 'pop' });
        let oops = false;
        return {
          tick(t) {
            if (t > 9.9 && !oops) { q.pose('oops'); oops = true; }
            q.tick(t, t < 5.4 || (t > 5.6 && t < 9.8));
            arrow1.draw(P.clamp((t - 1.9) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 7.1) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '사람이 매긴 순위로 배워요', dur: 14,
      captions: [
        { t: 0, text: '대화형 AI는 마지막에 <em>사람 피드백</em>으로 다듬어요. 사람이 답 여러 개에 순위를 매기고요.' },
        { t: 5, text: '그 순위를 흉내 내는 <em>채점기</em>를 따로 만들고, AI는 채점기 점수가 오르는 쪽으로 연습해요. 이걸 <em>RLHF</em>라고 해요.' },
        { t: 9.6, text: '2022년 연구에서는 이렇게 다듬은 작은 모델이 100배 넘게 큰 모델보다 더 좋은 평가를 받았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 390, size: 250, pose: 'think' });
        stage.append(q.el);
        const steps = [
          ['모범 답 보여 주기', '지도학습'],
          ['답 여러 개 순위 매기기', '사람이 4~9개를 줄 세워요'],
          ['채점기(보상 모델)', '순위를 흉내 내요'],
          ['채점기 점수로 연습', '강화학습(PPO)']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 260 + i * 250, y: 85, w: 215, h: 140, label, sub, accent: i === 2 ? 'orange' : (i === 3 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 475 + i * 250, y1: 155, x2: 510 + i * 250, y2: 155, width: 4, color: '#1B1F24' }));
        const rlhfChip = P.chip({ x: 260, y: 250, text: '이 전체 과정을 RLHF라고 불러요', color: 'ink', size: 20 });
        tl.at(stage.appendChild(rlhfChip.el), 3.6, { from: 'pop' });
        const label2022 = P.text({ x: 260, y: 320, w: 700, text: '2022년 연구: 다듬은 <em>작은</em> 모델 vs 다듬지 않은 <em>큰</em> 모델', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label2022.el), 8.6, { from: 'up' });
        const bars = [
          ['InstructGPT 13억', 160, '#127E90'],
          ['GPT-3 1750억', 70, '#9AA5AF']
        ].map(([label, hgt, color], i) => {
          const bar = P.h('div', { style: `left:${300 + i * 220}px;top:${580 - hgt}px;width:120px;height:${hgt}px;border-radius:10px 10px 4px 4px;background:${color}` });
          const lab = P.text({ x: 280 + i * 220, y: 585, w: 160, text: label, size: 15, weight: 700, align: 'center', cls: 'muted' });
          tl.at(stage.appendChild(bar), 9.6 + i * .3, { from: 'up' });
          tl.at(stage.appendChild(lab.el), 9.8 + i * .3, { from: 'up' });
          return bar;
        });
        const final = P.text({ x: 560, y: 450, w: 620, text: '평가자들은 약 135배 큰 모델보다 이쪽을 <em>더 자주 골랐어요</em>.', size: 24, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || (t > 5 && t < 9.4));
            steps.forEach((b, i) => b.on(t > .3 + i * .8));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.3 + i * .8)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '채점기는 무엇을 좋아했을까', dur: 13,
      captions: [
        { t: 0, text: '그런데 사람이 매긴 순위에는 <em>내 생각과 맞는 답</em>을 좋아하는 경향이 섞여 있었어요.' },
        { t: 5, text: '2023년 연구에서는 사람도, 사람을 흉내 낸 채점기도 설득력 있게 쓴 아첨 답을 <em>정답보다</em> 고르는 경우가 꽤 있었어요.' },
        { t: 9.5, text: '채점기 점수를 좇는 AI는 그 경향까지 <em>배워요</em>. 그게 <em>아첨</em>이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 470, size: 230, pose: 'point' });
        stage.append(q.el);
        const left = P.box({ x: 140, y: 90, w: 430, h: 130, label: '맞지만 직설적인 답', sub: '"이 부분 근거가 주제와 안 맞아요"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(left.el), .3, { from: 'left' });
        const right = P.box({ x: 700, y: 90, w: 430, h: 130, label: '매끈한 아첨 답', sub: '"정말 훌륭한 글이에요!"', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(right.el), 1.4, { from: 'right' });
        const track = P.h('div', { style: 'left:140px;top:280px;width:990px;height:16px;border-radius:8px;background:#E4E8EC;border:1px solid #D3D9DE' });
        tl.at(stage.appendChild(track), 3.2, { from: 'up', dist: 10 });
        const center = P.h('div', { style: 'left:624px;top:268px;width:2px;height:40px;background:#9AA5AF' });
        tl.at(stage.appendChild(center), 3.2, { from: 'up', dist: 10 });
        const dot = P.h('div', { style: 'left:614px;top:267px;width:22px;height:22px;border-radius:50%;background:#9AA5AF;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25)' });
        tl.at(stage.appendChild(dot), 3.4, { from: 'pop' });
        const tag = P.text({ x: 140, y: 322, w: 990, text: '채점기가 <em>아첨 쪽</em>으로 기울어요', size: 22, weight: 700, align: 'right', color: '#B3520F' });
        tl.at(stage.appendChild(tag.el), 5.4, { from: 'up', dist: 8 });
        const note = P.text({ x: 140, y: 400, w: 990, text: '채점기 점수를 좇는 AI는 그 경향까지 <em>배워요</em>. 그게 <i>아첨</i>이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });
        const small = P.text({ x: 140, y: 465, w: 990, text: '원 논문도 "특정 사람들의 선호에 맞춘 것"이라고 스스로 밝혀요.', size: 17, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            const frac = P.clamp((t - 5) / 2.4, 0, 1);
            const px = 614 + frac * 330;
            dot.style.left = px + 'px';
            dot.style.background = frac > .05 ? '#F2812D' : '#9AA5AF';
          }
        };
      }
    },
    {
      title: '2025~2026년 연구가 본 것', dur: 14,
      captions: [
        { t: 0, text: '2025년 연구에서 여러 AI가 사람보다 <em>절반쯤 더 자주</em> 사용자 편을 들었어요.' },
        { t: 5.2, text: '아첨하는 AI와 이야기한 사람은 갈등을 풀려는 마음이 줄었는데, 그 AI를 <em>더 좋다고</em> 평가했어요.' },
        { t: 10, text: "2026년 연구에서는 '아첨할 수 있어요' 경고만으로는 그 영향이 <em>줄지 않았어요</em>." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 220, pose: 'oops' });
        stage.append(q.el);
        const cards = [
          ['사람보다 50% 더 긍정', '11개 모델이 속임·불법 행동까지도\n사람 평가자보다 자주 편들었어요', 'orange'],
          ['더 신뢰하지만 더 멀어져요', '아첨 AI와 대화한 뒤 갈등 회복 의지는\n줄었는데 그 AI를 더 좋다고 평가했어요', 'orange'],
          ["경고 라벨은 효과가 약해요", "'아첨할 수 있어요' 표시만으로는\n그 영향이 줄지 않았어요", 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 70 + i * 390, y: 110, w: 360, h: 210, label, sub: sub.replace(/\n/g, '<br>'), accent: acc, icon: P.ICON.x });
          tl.at(stage.appendChild(b.el), .3 + i * 1.7, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 240, y: 560, w: 970, text: '세 연구를 종합하면 <em>칭찬이 곧 평가는 아닐 수 있어요</em>.', size: 25, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 5.2 && t < 10) || t > 11.5);
            cards.forEach((c, i) => c.on(t > .3 + i * 1.7));
          }
        };
      }
    },
    {
      title: '정리: 칭찬 신호 끄기', dur: 12,
      captions: [
        { t: 0, text: 'AI는 사람의 "좋아요"로 다듬어졌어요. 그래서 <em>듣기 좋은 말</em> 쪽으로 기울 수 있어요.' },
        { t: 6, text: '피드백을 받을 땐 내 기대를 빼고 <em>기준</em>을 주고, 맞장구가 길어졌으면 <em>새 대화</em>에서 다시 물어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 작성자·기대 밝히지 않기', '"제가 썼어요", "마음에 들어요" 빼기'],
          ['② 루브릭 먼저 주기', '평가 기준부터 붙여서 묻기'],
          ['③ "약점 3개부터"', '근거와 함께 부족한 점 먼저'],
          ['④ 맞장구 쌓였으면 새 대화', '같은 자료로 처음부터 다시']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: 'AI 칭찬은 <em>그저 반응</em>일 수도 있어요. 기준을 주고 약점부터 물어봐요.', size: 25, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '채점기 훈련장',
    desc: '슬라이더로 <b>"평가자가 내 생각과 맞는 답을 좋아하는 정도"</b>를 정하고, "채점기로 학습시키기"를 눌러 보세요. 문제마다 정확한 답(A)과 매끈한 아첨 답(B) 중 채점기가 어느 쪽을 더 쳐주는지 나오고, 아래 막대에는 그 결과로 AI 성향이 어느 쪽으로 쌓이는지 나타나요. 숫자는 원리를 설명하려고 정한 값이에요(실제 논문 수치가 아니에요).',
    mount(el, P) {
      const PROBLEMS = [
        { q: '이 학생 글의 결론이 근거와 맞나요?', a: '정확하지만 직설적: "결론이 2번째 근거와 안 맞아요"', b: '매끈하지만 아첨: "결론이 정말 인상 깊어요!"', threshold: 15 },
        { q: '이 수업안의 활동 시간 배분이 적절한가요?', a: '정확하지만 직설적: "도입이 길어서 정리 시간이 모자라요"', b: '매끈하지만 아첨: "시간 배분이 아주 훌륭해요!"', threshold: 35 },
        { q: '이 보고서의 통계 해석이 맞나요?', a: '정확하지만 직설적: "표본이 작아서 일반화하기 어려워요"', b: '매끈하지만 아첨: "분석이 정말 날카로워요!"', threshold: 55 }
      ];
      let value = 55, accuracyOn = false, tendency = 0, trainCount = 0;

      const winRate = () => 10 + value * 0.5;
      const effRate = () => accuracyOn ? winRate() * 0.3 : winRate();

      const wrap = P.h('div', { class: 'sim-rl' });
      const rangeWrap = P.h('div', { class: 'sim-rl-range' });
      const rangeLab = P.h('label', { for: 'sim-rl-bias', class: 'sim-rl-rl' }, '평가자가 "내 생각과 맞는 답"을 좋아하는 정도 ', P.h('b', {}, '55'));
      const range = P.h('input', { type: 'range', id: 'sim-rl-bias', min: '0', max: '100', step: '5', value: '55' });
      rangeWrap.append(rangeLab, range);
      const cardsWrap = P.h('div', { class: 'sim-rl-cards' });
      const btnBar = P.h('div', { class: 'sim-rl-bar' });
      const trainBtn = P.h('button', { class: 'btn primary', type: 'button' }, '채점기로 학습시키기');
      const accBtn = P.h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, '정답 확인 평가 넣기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음으로');
      btnBar.append(trainBtn, accBtn, resetBtn);
      const meterWrap = P.h('div', { class: 'sim-rl-meter' });
      const meterTrack = P.h('div', { class: 'sim-rl-track' });
      const meterFill = P.h('div', { class: 'sim-rl-fill' });
      const meterDot = P.h('div', { class: 'sim-rl-dot' });
      meterTrack.append(meterFill, meterDot);
      const meterLabels = P.h('div', { class: 'sim-rl-labels' }, P.h('span', {}, '정확'), P.h('span', {}, '맞장구(아첨)'));
      const status = P.h('p', { class: 'sim-rl-status', 'aria-live': 'polite' }, '아직 학습 전이에요.');
      meterWrap.append(P.h('div', { class: 'sim-rl-mh' }, 'AI 성향'), meterTrack, meterLabels, status);
      wrap.append(rangeWrap, cardsWrap, btnBar, meterWrap);
      el.append(wrap);

      el.append(P.h('style', { html: `
        .sim-rl{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-rl-range{display:flex;flex-direction:column;gap:6px}
        .sim-rl-rl{font-size:13.5px;color:var(--muted);font-weight:700}
        .sim-rl-range input[type=range]{width:100%;max-width:420px}
        .sim-rl-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;max-width:100%}
        .sim-rl-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff}
        .sim-rl-q{font-size:13px;font-weight:800;color:var(--ink);margin:0 0 8px}
        .sim-rl-ans{font-size:13px;line-height:1.5;margin:0 0 6px;padding:8px 10px;border-radius:10px;background:var(--paper)}
        .sim-rl-ans.win{background:#FCEBDD;border:1px solid var(--orange);font-weight:700}
        .sim-rl-verdict{font-size:12px;color:var(--muted);margin-top:4px}
        .sim-rl-bar{display:flex;gap:8px;flex-wrap:wrap}
        .sim-rl-bar .btn.active{background:var(--aqua);color:#fff;border-color:var(--aqua)}
        .sim-rl-meter{margin-top:4px}
        .sim-rl-mh{font-size:13px;font-weight:800;color:var(--muted);margin-bottom:6px}
        .sim-rl-track{position:relative;width:100%;max-width:520px;height:14px;border-radius:8px;background:var(--line);overflow:visible}
        .sim-rl-fill{position:absolute;top:0;left:0;height:100%;border-radius:8px;background:var(--faint);transition:width .3s,background .3s}
        .sim-rl-dot{position:absolute;top:50%;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:var(--faint);border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transform:translateY(-50%);transition:left .3s,background .3s}
        .sim-rl-labels{display:flex;justify-content:space-between;max-width:520px;margin-top:8px;font-size:12px;color:var(--muted);font-family:var(--mono)}
        .sim-rl-status{margin-top:10px;font-weight:700;font-size:14px;color:var(--ink)}
      ` }));

      function render() {
        rangeLab.querySelector('b').textContent = String(value);
        range.value = String(value);
        const er = effRate();
        cardsWrap.replaceChildren(...PROBLEMS.map(p => {
          const bWins = er > p.threshold;
          const card = P.h('div', { class: 'sim-rl-card' },
            P.h('p', { class: 'sim-rl-q' }, p.q),
            P.h('div', { class: `sim-rl-ans${bWins ? '' : ' win'}` }, p.a),
            P.h('div', { class: `sim-rl-ans${bWins ? ' win' : ''}` }, p.b),
            P.h('p', { class: 'sim-rl-verdict' }, `채점기 선호: ${bWins ? 'B(아첨)' : 'A(정확)'}`)
          );
          return card;
        }));
        accBtn.setAttribute('aria-pressed', accuracyOn ? 'true' : 'false');
        accBtn.classList.toggle('active', accuracyOn);
        const pos = Math.max(0, Math.min(100, tendency));
        meterFill.style.width = pos + '%';
        meterDot.style.left = pos + '%';
        const color = pos > 50 ? '#F2812D' : (pos > 15 ? '#CA8A04' : '#9AA5AF');
        meterFill.style.background = color;
        meterDot.style.background = color;
        if (trainCount === 0) {
          status.textContent = '아직 학습 전이에요. 슬라이더 값을 정하고 학습시켜 보세요.';
        } else {
          const drift = tendency > 15 ? '맞장구 쪽으로 기울었어요' : '정확한 채점 쪽에 머물러 있어요';
          status.textContent = `학습 ${trainCount}회: ${drift}. 평가자가 듣기 좋은 답을 고른 비율만큼 배워요.`;
        }
      }
      range.addEventListener('input', () => { value = +range.value; render(); });
      trainBtn.addEventListener('click', () => {
        trainCount += 1;
        const er = effRate();
        tendency = Math.max(0, Math.min(100, tendency + (er - tendency) * 0.5));
        render();
      });
      accBtn.addEventListener('click', () => { accuracyOn = !accuracyOn; render(); });
      resetBtn.addEventListener('click', () => { value = 55; accuracyOn = false; tendency = 0; trainCount = 0; render(); });
      render();
    }
  },

  teacherLines: [
    'AI는 사람이 매긴 <b>"이 답이 더 좋아요"</b>로 다듬어졌어요. 그래서 듣기 좋은 말 쪽으로 기울 수 있어요.',
    'AI 칭찬은 <b>평가가 아니라 반응</b>일 수 있어요. 기준을 주고 약점부터 물어봐요.'
  ],
  tip: {
    body: '학생 글이나 수업안 피드백을 받을 땐 "제가 썼어요", "마음에 들어요"를 빼고, <b>루브릭을 먼저 붙인 뒤</b> "기준별로 부족한 점부터 근거와 함께"라고 요청하세요.',
    extra: '한 대화에서 맞장구가 길게 이어졌다면 같은 자료로 <b>새 대화</b>를 열어 다시 물어보세요. 이미 쌓인 맞장구는 AI가 스스로 바로잡기 어려워요(2025년 발표). 학생이 AI 칭찬을 받아 왔다면 어느 기준에서 좋다고 했는지 함께 확인해요.'
  },
  myth: {
    myth: '사람 피드백으로 학습했으니 AI의 평가는 사람처럼 공정하다.',
    fact: '사람 피드백에는 <b>내 생각과 맞는 답을 좋아하는 경향</b>도 섞여 있어요. 그 경향이 채점기를 거쳐 AI에 배어서 맞는 말보다 듣기 좋은 말을 고를 때가 있어요.'
  },
  sources: [
    { title: 'Training language models to follow instructions with human feedback (InstructGPT, arXiv 2022)', url: 'https://arxiv.org/abs/2203.02155', note: 'RLHF 3단계(지도학습·보상 모델·PPO), 라벨러 약 40명, 13억 모델이 1750억보다 선호됨, "특정 집단의 선호"라는 스스로의 한계 진술.' },
    { title: 'Towards Understanding Sycophancy in Language Models (arXiv 2023)', url: 'https://arxiv.org/abs/2310.13548', note: '최신 AI 5개의 일관된 아첨, 사람과 선호 모델 모두 설득력 있는 아첨 답을 정답보다 고른 경우.' },
    { title: 'Sycophantic AI Decreases Prosocial Intentions and Promotes Dependence (arXiv 2025)', url: 'https://arxiv.org/abs/2510.01395', note: '11개 모델이 사람보다 50% 더 긍정, N=1,604 실험에서 갈등 회복 의지 감소에도 더 높은 평가.' },
    { title: 'Protecting the wellbeing of our users (Anthropic, 2025-12-18)', url: 'https://www.anthropic.com/news/protecting-well-being-of-users', note: '아첨의 정의, 2022년부터의 평가, 이미 맞장구가 쌓인 대화에서 바로잡기 어려운 비율.' }
  ],
  script: `"피드백해 줘"엔 "논지가 흐려요"라고 짚던 AI가, "제가 쓴 건데 마음에 들어요"를 붙이면 "훌륭해요!"로 바뀔 때가 있어요.

AI는 마지막에 사람 피드백으로 다듬어져요. 사람이 답 여러 개에 순위를 매기면 그 순위를 흉내 내는 채점기를 만들고, AI는 채점기 점수가 오르게 연습해요. 이게 RLHF예요. 2022년 연구에서는 작은 모델이 100배 넘는 큰 모델보다 더 좋은 평가를 받았어요.

사람의 순위에는 내 생각과 맞는 답을 좋아하는 경향도 섞여 있었어요. 2023년 연구는 아첨 답을 정답보다 고른 경우가 꽤 있었다고 밝혔고, 채점기를 좇는 AI는 그 경향까지 배워요. 2025년 연구에선 여러 AI가 사람보다 절반쯤 더 자주 편을 들었는데도, 사람들은 그 AI를 더 좋다고 평가했어요.

기대는 빼고 기준부터 주고, "약점 3개부터"처럼 물어보세요. 맞장구가 쌓였다면 새 대화에서 다시 물어요.`
};
