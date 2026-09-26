/* S5-4 [트랙 C] 네거티브 프롬프트는 정말 빼 줄까: 안내 강도(CFG) */
export default {
  slug: 's5-guidance',
  track: 'C',
  title: '네거티브 프롬프트는 정말 빼 줄까',
  subtitle: '안내 강도(CFG)',
  summary: '"손가락 여섯 개 빼 줘"를 네거티브에 넣었는데 그대로였고, 강도를 15로 올렸더니 색이 타 버렸어요. 확산 모델이 두 번 예측하고 그 차이를 미는 원리와, 네거티브·강도를 다루는 법을 파고들어요.',
  keywords: ['안내 강도', 'CFG', '네거티브 프롬프트', '분류기 없는 안내', '과포화', '확산 모델'],

  scenes: [
    {
      title: '네거티브도, 강도도?', dur: 13,
      captions: [
        { t: 0, text: '"손가락 여섯 개는 빼 줘"를 <em>네거티브</em>에 넣었는데, 여전히 여섯 개였어요.' },
        { t: 5, text: '그래서 안내 강도를 <em>15</em>까지 올렸더니, 이번엔 색이 타 버렸어요.' },
        { t: 9.5, text: '네거티브도 강도도, 생각한 대로 움직이지 않았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 330, y: 90, w: 430, text: '"손가락 여섯 개, 네거티브로 빼 줘"', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const boxA = P.box({ x: 330, y: 210, w: 270, h: 120, label: '네거티브 프롬프트', sub: '손가락 여섯 개', accent: 'ink', icon: P.ICON.doc });
        const boxB = P.box({ x: 660, y: 210, w: 280, h: 120, label: '결과', sub: '그래도 손가락 여섯 개', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(boxA.el), .3, { from: 'up' });
        tl.at(stage.appendChild(boxB.el), 1.6, { from: 'right' });
        const arrow1 = P.arrow(lines, { x1: 610, y1: 270, x2: 650, y2: 270, width: 4, color: '#1B1F24' });
        const boxC = P.box({ x: 330, y: 380, w: 270, h: 110, label: '강도 15로 올림', sub: '안내 강도를 세게' });
        const boxD = P.box({ x: 660, y: 380, w: 280, h: 110, label: '결과', sub: '색이 과포화·타버림', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(boxC.el), 5.3, { from: 'up' });
        tl.at(stage.appendChild(boxD.el), 6.6, { from: 'right' });
        const arrow2 = P.arrow(lines, { x1: 610, y1: 435, x2: 650, y2: 435, width: 4, color: '#1B1F24' });
        const note = P.text({ x: 330, y: 540, w: 760, text: '네거티브도 강도도, <em>생각과 다르게</em> 움직여요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrow1.draw(P.clamp((t - 1.4) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 6.7) / .5, 0, 1));
            boxA.on(t > .3); boxB.on(t > 1.6);
            boxC.on(t > 5.3); boxD.on(t > 6.6);
          }
        };
      }
    },
    {
      title: '두 번 예측하고, 그 차이를 밀어요', dur: 14,
      captions: [
        { t: 0, text: '확산 모델은 매 단계 그림을 <em>두 번</em> 예측해요. 프롬프트가 있을 때와 없을 때예요.' },
        { t: 5.5, text: '그 둘의 차이만큼, <em>안내 강도</em>가 정한 크기로 프롬프트 방향으로 밀어요.' },
        { t: 10, text: '이 방법을 제안한 <em>2022년 연구</em>라 <em>분류기 없는 안내</em>라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const boxA = P.box({ x: 330, y: 110, w: 280, h: 130, label: '조건부 예측', sub: '프롬프트 있음', accent: 'aqua', icon: P.ICON.eye });
        const boxB = P.box({ x: 670, y: 110, w: 280, h: 130, label: '무조건부 예측', sub: '프롬프트 없음', accent: 'ink', icon: P.ICON.x });
        tl.at(stage.appendChild(boxA.el), .3, { from: 'up' });
        tl.at(stage.appendChild(boxB.el), .9, { from: 'up' });
        const diff = P.arrow(lines, { x1: 470, y1: 260, x2: 790, y2: 260, curve: 40, dashed: true, width: 3, color: '#F2812D' });
        const diffChip = P.chip({ x: 560, y: 292, text: '차이 벡터', color: 'orange', size: 20 });
        tl.at(stage.appendChild(diffChip.el), 2.0, { from: 'pop' });
        const arrow2 = P.arrow(lines, { x1: 610, y1: 318, x2: 650, y2: 375, width: 4, color: '#1B1F24' });
        const boxC = P.box({ x: 500, y: 380, w: 320, h: 110, label: '안내 강도 × 차이', sub: '이 크기만큼 프롬프트 쪽으로 밀어요', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(boxC.el), 6.0, { from: 'pop' });
        const final = P.text({ x: 330, y: 540, w: 760, text: '2022년 연구가 제안해서 <em>분류기 없는 안내</em>라고 불러요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > .3 && t < 10);
            diff.draw(P.clamp((t - 1.5) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 5.5) / .5, 0, 1));
            boxA.on(t > .3); boxB.on(t > .9); boxC.on(t > 6.0);
          }
        };
      }
    },
    {
      title: '네거티브는 반대로 미는 힘', dur: 13,
      captions: [
        { t: 0, text: '네거티브 프롬프트는 <em>무조건부</em> 자리에 들어가서, 그 방향에서 멀어지게 밀어요.' },
        { t: 5, text: '그런데 그 개념이 모델 안에 <em>뚜렷해야</em> 하고, <em>초반 단계</em>에서 효과가 커요.' },
        { t: 9.5, text: '늦게 넣으면 <em>거의 안 먹혀요</em>. 2024년 분석 연구에서 확인됐어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const boxA = P.box({ x: 330, y: 100, w: 280, h: 120, label: '네거티브 프롬프트', sub: '예: 흐릿함', accent: 'ink', icon: P.ICON.doc });
        const boxB = P.box({ x: 660, y: 100, w: 280, h: 120, label: '무조건부 자리', sub: '반대 방향으로 밀어요', accent: 'orange', icon: P.ICON.plug });
        tl.at(stage.appendChild(boxA.el), .3, { from: 'up' });
        tl.at(stage.appendChild(boxB.el), 1.5, { from: 'up' });
        const arrow1 = P.arrow(lines, { x1: 610, y1: 160, x2: 650, y2: 160, width: 4, color: '#1B1F24' });
        const heights = [95, 72, 46, 22, 6];
        const bars = heights.map((hgt, i) => {
          const bar = P.h('div', { style: `position:absolute;left:${380 + i * 70}px;top:${460 - hgt * 1.6}px;width:44px;height:${hgt * 1.6}px;border-radius:10px 10px 4px 4px;background:${i < 2 ? '#F2812D' : '#9AA5AF'}` });
          tl.at(stage.appendChild(bar), 5.3 + i * .25, { from: 'up' });
          return bar;
        });
        const lab = P.text({ x: 380, y: 470, w: 340, text: '초반 단계 → 후반 단계', size: 16, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 5.5, { from: 'up' });
        const final = P.text({ x: 760, y: 290, w: 460, text: '늦게 넣으면 <em>거의 안 먹혀요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 760, y: 390, w: 460, text: '효과 크기는 도구·설정마다 달라요(2024년 분석).', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
            arrow1.draw(P.clamp((t - 1.2) / .5, 0, 1));
            boxA.on(t > .3); boxB.on(t > 1.5);
          }
        };
      }
    },
    {
      title: '강도 스펙트럼: 낮음·적당·높음', dur: 14,
      captions: [
        { t: 0, text: '강도를 낮게 두면 <em>프롬프트를 잘 안 따르고</em> 다양하게 나와요.' },
        { t: 5.5, text: '적당히(보통 <em>5~9</em> 근처, 도구마다 달라요) 두면 따르면서도 다양해요.' },
        { t: 10.5, text: '너무 높이면 색이 <em>타고 과포화</em>되고, 그림이 <em>경직</em>돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const card1 = P.box({ x: 330, y: 150, w: 260, h: 190, label: '낮음 (1~3)', sub: '프롬프트 무시<br>다양해요' });
        const card2 = P.box({ x: 610, y: 150, w: 260, h: 190, label: '적당 (5~9 근처)', sub: '따르면서<br>다양해요', accent: 'aqua' });
        const card3 = P.box({ x: 890, y: 150, w: 260, h: 190, label: '높음 (15 이상)', sub: '과포화·경직<br>타 버려요', accent: 'orange' });
        tl.at(stage.appendChild(card1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(card2.el), 5.6, { from: 'up' });
        tl.at(stage.appendChild(card3.el), 10.6, { from: 'up' });
        const final = P.text({ x: 330, y: 390, w: 830, text: '적당한 강도는 도구마다 달라요. <em>기본값 근처</em>에서 시작하세요.', size: 25, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.0, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10.5);
            card1.on(t > .3); card2.on(t > 5.6); card3.on(t > 10.6);
          }
        };
      }
    },
    {
      title: '정리: 방향 하나 더, 지우개 아님', dur: 12,
      captions: [
        { t: 0, text: '네거티브는 <em>지우개</em>가 아니라, <em>반대로 미는 힘</em> 하나예요.' },
        { t: 4.5, text: '강도는 <em>기본값 근처</em>에서 조금씩만 조절해요.' },
        { t: 8.5, text: '손가락 개수처럼 <em>정답이 있는 문제</em>는 레퍼런스나 포즈 조건이 나아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 강도는 기본값 근처', '숫자보다 결과를 보면서 ±2씩'],
          ['② 네거티브는 뚜렷한 개념만', '흐림·워터마크·글자 같은 것'],
          ['③ 손가락·개수는 한계', '네거티브로 잘 안 잡혀요'],
          ['④ 자세·포즈는 다음 편', '조건부 생성(컨트롤넷)으로']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '네거티브는 마법이 아니라 <em>방향 하나 더</em>예요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '안내 강도 다이얼',
    desc: '점들은 <b>프롬프트 방향</b>(과녁)을 향해 얼마나 세게 밀리는지를 보여 줘요. 슬라이더로 <b>안내 강도</b>를 올리면 점들이 과녁으로 모이고, 15 이상이면 색이 과포화되고 한 덩어리로 뭉쳐요. "네거티브 켜기"를 누르면 반대쪽 원(네거티브 개념)에서 점들이 밀려나요. 그림은 원리를 보여 주는 것이고, 실제 도구의 정도는 다를 수 있어요.',
    mount(el, P) {
      const W = 600, H = 340;
      const TX = 440, TY = 165, NX = 150, NY = 165;
      const N = 16;
      const rBase = P.rng(9);
      const dots = Array.from({ length: N }, () => ({ x: 70 + rBase() * 300, y: 30 + rBase() * 260 }));

      const canvas = P.h('canvas', { class: 'sim-canvas', width: String(W), height: String(H) });
      const range = P.h('input', { type: 'range', id: 'sim-cfg', min: '0', max: '20', step: '1', value: '0', 'aria-label': '안내 강도' });
      const rangeOut = P.h('output', { for: 'sim-cfg' }, '0');
      const rangeRow = P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-cfg' }, '안내 강도 ', rangeOut), range);
      const negBtn = P.h('button', { type: 'button', class: 'btn primary' }, '네거티브 켜기');
      const status = P.h('div', { class: 'sim-status' }, '');
      const negStatus = P.h('div', { class: 'sim-neg' }, '네거티브: 꺼짐');
      const wrap = P.h('div', { class: 'sim-wrap' },
        canvas,
        rangeRow,
        P.h('div', { class: 'sim-actions' }, negBtn, negStatus),
        status
      );
      el.append(wrap, P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-canvas{width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:14px;background:#EEF1F4}
        .sim-row{display:flex;align-items:center;gap:10px;font-weight:700;font-size:13.5px;flex-wrap:wrap}
        .sim-row label{display:flex;align-items:center;gap:6px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 160px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:28px;display:inline-block}
        .sim-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .sim-neg{font-size:13px;color:var(--muted);font-weight:700}
        .sim-status{font-size:14.5px;font-weight:700;color:var(--ink)}
      ` }));

      let negOn = false;

      function draw() {
        const n = +range.value;
        const t = n / 20;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#EEF1F4';
        ctx.fillRect(0, 0, W, H);
        const hot = n >= 15;
        if (hot) { ctx.fillStyle = 'rgba(242,129,45,0.14)'; ctx.fillRect(0, 0, W, H); }

        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#127E90';
        ctx.beginPath(); ctx.arc(TX, TY, 26, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#127E90';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('프롬프트 방향', TX, TY - 36);

        if (negOn) {
          ctx.save();
          ctx.setLineDash([6, 6]);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#F2812D';
          ctx.beginPath(); ctx.arc(NX, NY, 26, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
          ctx.fillStyle = '#F2812D';
          ctx.fillText('네거티브', NX, NY - 36);
        }

        dots.forEach(d => {
          let px = P.lerp(d.x, TX, t * .82);
          let py = P.lerp(d.y, TY, t * .82);
          if (negOn) {
            const dx = px - NX, dy = py - NY;
            const dist = Math.hypot(dx, dy) || 1;
            const push = 44 * Math.min(1, t * 1.3 + .15);
            px += (dx / dist) * push;
            py += (dy / dist) * push;
          }
          px = P.clamp(px, 14, W - 14);
          py = P.clamp(py, 14, H - 14);
          ctx.beginPath();
          ctx.arc(px, py, hot ? 9 : 6, 0, Math.PI * 2);
          ctx.fillStyle = hot ? '#F2812D' : '#127E90';
          ctx.fill();
        });

        rangeOut.textContent = String(n);
        status.textContent = n <= 3
          ? `강도 ${n}: 프롬프트를 잘 안 따르고 다양해요.`
          : n <= 9
            ? `강도 ${n}: 프롬프트를 따르면서 다양해요.`
            : n <= 14
              ? `강도 ${n}: 프롬프트를 강하게 따라요.`
              : `강도 ${n}: 색이 타고 한 덩어리로 뭉쳐요.`;
        negStatus.textContent = negOn ? '네거티브: 켜짐 · 반대 방향으로 밀려나요' : '네거티브: 꺼짐';
        negBtn.textContent = negOn ? '네거티브 끄기' : '네거티브 켜기';
      }

      range.addEventListener('input', draw);
      negBtn.addEventListener('click', () => { negOn = !negOn; draw(); });
      draw();
    }
  },

  teacherLines: [
    'AI 그림은 <b>프롬프트 방향으로 얼마나 세게 미느냐</b>를 정하는 손잡이가 있어요. 너무 세면 색이 타요.',
    '네거티브 프롬프트는 <b>반대로 미는 힘</b>이지, 지우개가 아니에요.'
  ],
  tip: {
    body: '강도는 도구 기본값에서 시작해 <b>±2씩</b> 조절하세요. 네거티브에는 흐림·워터마크·글자처럼 뚜렷한 개념만 넣어요. 손가락·개수는 네거티브로 잘 안 잡혀요.',
    extra: '도구가 강도 슬라이더를 안 보여 주면 이미 적당히 잡혀 있는 경우가 많아요. 이름과 기본값은 도구마다 달라요.'
  },
  myth: {
    myth: '네거티브에 쓰면 무조건 사라진다.',
    fact: '반대 방향으로 밀 뿐이고, 모델이 그 개념을 뚜렷이 알아야 하고, 초반 단계에서 주로 효과가 있어요.'
  },
  sources: [
    { title: 'Classifier-Free Diffusion Guidance (arXiv, 2022)', url: 'https://arxiv.org/abs/2207.12598', note: '프롬프트가 있을 때와 없을 때의 예측 차이를 안내 강도만큼 키워 미는 방법을 제안한 연구예요.' },
    { title: 'Understanding the Impact of Negative Prompts: When and How Do They Take Effect? (arXiv, 2024)', url: 'https://arxiv.org/abs/2406.02965', note: '네거티브 프롬프트가 초반 단계에서 주로 효과를 내고, 개념이 뚜렷해야 작동한다는 분석이에요.' },
    { title: 'High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)', url: 'https://arxiv.org/abs/2112.10752', note: '이 확산 모델 구조 위에서 안내 강도와 조건부/무조건부 예측이 적용돼요.' }
  ],
  script: `손가락 여섯 개를 네거티브 프롬프트에 넣었는데 여전히 여섯 개였고, 안내 강도를 15까지 올렸더니 이번엔 색이 타 버린 적 있으시죠.

확산 모델은 매 단계 프롬프트가 있을 때와 없을 때, 두 번 예측해요. 그 차이를 안내 강도만큼 키워 프롬프트 방향으로 밀어요. 2022년 연구가 제안한 방법이라 분류기 없는 안내라고 불러요.

네거티브 프롬프트는 '없음' 자리에서 반대로 밀 뿐이라, 개념이 뚜렷해야 하고 초반 단계에서만 효과가 커요. 강도도 너무 낮으면 안 따르고 너무 높으면 과포화되는데, 보통 5에서 9 근처가 적당해요.

네거티브는 지우개가 아니라 방향 하나 더예요. 손가락처럼 정답이 있는 문제는 레퍼런스나 포즈 조건이 낫고, 강도는 기본값 근처에서 조금씩 조절하세요.`
};
