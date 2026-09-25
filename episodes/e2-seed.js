/* E2 [A] 같은 프롬프트, 다른 영상: 확률과 시드 */
export default {
  slug: 'e2-seed',
  track: 'A',
  title: '같은 프롬프트, 다른 영상',
  subtitle: '확률과 시드',
  summary: '브루에 똑같은 프롬프트를 두 번 넣었는데 다른 영상이 나온 이유. 시드·잡음·확률·온도로 3분 안에 풀고, 무엇을 기록해야 하는지까지.',
  keywords: ['시드', '확률', '온도', '샘플링', '확산모델', '재현성', '랜덤', '브루'],

  scenes: [
    {
      title: '같은 프롬프트, 다른 영상', dur: 13,
      captions: [
        { t: 0, text: '오늘 브루에 <em>같은 프롬프트</em>를 두 번 넣었어요.' },
        { t: 5, text: '그런데 나온 영상이 <em>조금씩 달랐어요</em>. 배경도, 움직임도요.' },
        { t: 9.5, text: '똑같은 말을 했는데, 왜 다른 그림이 나올까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 310, size: 340, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 150, w: 460, text: '쿼카가 우산 쓰고 걷는 영상 만들어 줘.', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const box1 = P.box({ x: 830, y: 130, w: 380, h: 190, label: '결과 1', sub: '비 오는 밤 거리', accent: 'aqua', icon: P.ICON.video });
        const box2 = P.box({ x: 830, y: 350, w: 380, h: 190, label: '결과 2', sub: '맑은 낮 거리', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(box1.el), 1.6, { from: 'right' });
        tl.at(stage.appendChild(box2.el), 2.4, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 560, y1: 225, x2: 830, y2: 210, curve: -20, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 560, y1: 245, x2: 830, y2: 445, curve: 20, width: 4, color: '#B3520F' });
        const note = P.chip({ x: 830, y: 560, text: '똑같은 프롬프트인데 달라요', color: 'ink', size: 22 });
        tl.at(stage.appendChild(note.el), 6.5, { from: 'pop' });
        const qq = P.text({ x: 830, y: 606, w: 400, text: '다시 눌러도 <em>매번 조금씩</em> 달라요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(qq.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4);
            a1.draw(P.clamp((t - 1.8) / .7, 0, 1));
            a2.draw(P.clamp((t - 2.6) / .7, 0, 1));
            box1.on(t > 1.6 && t < 6.5); box2.on(t > 2.4 && t < 6.5);
          }
        };
      }
    },
    {
      title: '잡음에서 그림으로', dur: 14,
      captions: [
        { t: 0, text: '생성은 <em>무작위 시작점</em>, 시드에서 출발해요. 주사위를 던지는 것과 비슷해요.' },
        { t: 5.5, text: '많은 이미지·영상 모델이 <em>잡음</em>에서 출발해 조금씩 그림을 만들어요. (모델마다 방식은 달라요)' },
        { t: 10.5, text: '시드가 다르면 잡음도 달라서, 결과도 달라져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const seedBox = P.box({ x: 70, y: 150, w: 240, h: 120, label: '시드 82', sub: '오늘 뽑힌 시작값', accent: 'ink', icon: P.ICON.dice });
        tl.at(stage.appendChild(seedBox.el), .3, { from: 'left' });
        const noiseEl = P.noise({ x: 460, y: 110, w: 340, h: 340, seed: 82 });
        tl.at(stage.appendChild(noiseEl.el), 1.4, { from: 'pop' });
        const arr = P.arrow(lines, { x1: 320, y1: 210, x2: 460, y2: 250, width: 4, color: '#1B1F24' });
        const label = P.text({ x: 460, y: 470, w: 340, text: '잡음이 줄면서 그림이 드러나요.<br><span class="p-text muted" style="position:static;display:inline">(모델마다 방식은 달라요)</span>', size: 20, weight: 600, align: 'center' });
        tl.at(stage.appendChild(label.el), 5.7, { from: 'up' });
        const scopeChip = P.chip({ x: 850, y: 150, text: '확산 모델 등', color: 'gray', size: 20 });
        tl.at(stage.appendChild(scopeChip.el), 6.2, { from: 'pop' });
        const q = P.quokka({ x: 60, y: 400, size: 240, pose: 'dice' });
        tl.at(stage.appendChild(q.el), .2, { from: 'up' });
        const diffText = P.text({ x: 260, y: 520, w: 760, text: '시드가 다르면 잡음도, 결과도 달라져요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(diffText.el), 10.8, { from: 'up' });
        const img = new Image();
        img.src = 'assets/char/idea.webp';
        img.onload = () => noiseEl.source(img);
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arr.draw(P.clamp((t - .8) / .5, 0, 1));
            const lvl = 1 - P.easeOut(P.clamp((t - .8) / 7.5, 0, 1)) * 0.94;
            noiseEl.set(lvl);
          }
        };
      }
    },
    {
      title: '다음 단어는 확률로', dur: 13,
      captions: [
        { t: 0, text: '글자 쪽은 조금 달라요. 모델이 <em>다음 단어를 확률로</em> 골라요.' },
        { t: 5, text: '이 확률표는 <em>창의성(온도)</em>로 조절해요. 온도를 올리면 확률이 평평해져요.' },
        { t: 9.5, text: '평평하면 다양한 말이, 뾰족하면 비슷한 말이 나와요. 대략적인 예시예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const prompt = P.text({ x: 90, y: 92, w: 1100, text: '오늘 급식은 정말 <em>___</em>', size: 34, weight: 800 });
        tl.at(stage.appendChild(prompt.el), .2, { from: 'up' });
        const words = ['맛있어요', '기대돼요', '특별해요', '궁금해요'];
        const logits = [2.4, 1.6, 1.0, 0.6];
        const baseX = 250, gap = 250, barW = 150, floorY = 480, maxH = 300;
        const bars = words.map((wd, i) => {
          const wrap = P.h('div', { style: `position:absolute;left:${baseX + i * gap}px;top:${floorY - maxH}px;width:${barW}px;height:${maxH}px` });
          const fill = P.h('div', { style: 'position:absolute;left:0;bottom:0;width:100%;background:#2BB3C9;border-radius:10px 10px 0 0;height:0%' });
          const pct = P.h('div', { style: 'position:absolute;left:0;top:-30px;width:100%;text-align:center;font-weight:800;font-family:var(--mono);font-size:18px;color:#127E90' }, '0%');
          wrap.append(fill, pct);
          stage.appendChild(wrap);
          tl.at(wrap, .8 + i * .15, { from: 'up' });
          const lab = P.text({ x: baseX + i * gap - 20, y: floorY + 14, w: barW + 40, text: wd, size: 20, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), .8 + i * .15, { from: 'up' });
          return { fill, pct };
        });
        const dialTrack = P.h('div', { style: 'position:absolute;left:220px;top:600px;width:840px;height:8px;background:#E4E8EC;border-radius:4px' });
        const dialFill = P.h('div', { style: 'position:absolute;left:0;top:0;height:100%;width:0%;background:#F2812D;border-radius:4px' });
        dialTrack.append(dialFill);
        tl.at(stage.appendChild(dialTrack), 4.6, { from: 'up' });
        const lo = P.text({ x: 220, y: 612, w: 160, text: '차분(낮음)', size: 18, weight: 700, cls: 'muted' });
        const hi = P.text({ x: 900, y: 612, w: 160, text: '다양(높음)', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lo.el), 4.6, { from: 'up' });
        tl.at(stage.appendChild(hi.el), 4.6, { from: 'up' });
        const dialLbl = P.text({ x: 490, y: 552, w: 300, text: '창의성(온도)', size: 22, weight: 800, align: 'center', color: '#B3520F' });
        tl.at(stage.appendChild(dialLbl.el), 4.6, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 360, size: 200, pose: 'think' });
        tl.at(stage.appendChild(q.el), .1, { from: 'left' });
        return {
          tick(t) {
            q.tick(t, t > .5 && t < 5);
            let T;
            if (t < 5) T = 0.6;
            else if (t < 9.5) T = P.lerp(0.6, 1.8, P.easeOut(P.clamp((t - 5) / 4.5, 0, 1)));
            else T = 1.8;
            const ex = logits.map(l => Math.exp(l / T));
            const sum = ex.reduce((a, v) => a + v, 0);
            const probs = ex.map(v => v / sum);
            probs.forEach((p, i) => { bars[i].fill.style.height = `${p * 100}%`; bars[i].pct.textContent = `${Math.round(p * 100)}%`; });
            dialFill.style.width = `${P.clamp((T - 0.4) / (2.0 - 0.4), 0, 1) * 100}%`;
          }
        };
      }
    },
    {
      title: '대체로 같아요, 하지만', dur: 12,
      captions: [
        { t: 0, text: '시드와 설정이 같으면, <em>대체로 같은 결과</em>가 나와요.' },
        { t: 5, text: '그런데 브루처럼 <em>시드 항목이 아예 없는 도구</em>도 있고, 하드웨어·버전이 달라도 결과가 바뀔 수 있어요.' },
        { t: 9, text: '온도를 0으로 둬도 완전히 똑같지는 않을 수 있어요. 도구마다 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const a = P.box({ x: 90, y: 100, w: 330, h: 150, label: '설정 A', sub: '프롬프트·시드·모델 <b>동일</b>', icon: P.ICON.doc });
        const b = P.box({ x: 460, y: 100, w: 330, h: 150, label: '설정 B', sub: '프롬프트·시드·모델 <b>동일</b>', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .2, { from: 'left' });
        tl.at(stage.appendChild(b.el), .5, { from: 'right' });
        const q = P.quokka({ x: 880, y: 110, size: 230, pose: 'point' });
        tl.at(stage.appendChild(q.el), .2, { from: 'up' });
        const result = P.box({ x: 210, y: 290, w: 460, h: 110, label: '대체로 같은 결과', sub: '시드+설정이 같으면요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(result.el), 1.8, { from: 'pop' });
        const ar1 = P.arrow(lines, { x1: 255, y1: 250, x2: 350, y2: 290, width: 4, color: '#127E90' });
        const ar2 = P.arrow(lines, { x1: 625, y1: 250, x2: 530, y2: 290, width: 4, color: '#127E90' });
        const hedges = [
          ['시드가 없는 도구도 있어요', '예: 브루처럼 시드를 못 정하는 도구도 있어요'],
          ['하드웨어·버전 차이', '같은 시드라도 결과가 달라질 수 있어요'],
          ['온도 0이어도', '완전히 똑같진 않을 수 있어요(Claude 문서)']
        ].map(([label, sub], i) => {
          const box = P.box({ x: 70 + i * 400, y: 440, w: 370, h: 170, label, sub, accent: 'orange' });
          tl.at(stage.appendChild(box.el), 5.2 + i * .5, { from: 'up' });
          return box;
        });
        return {
          tick(t) {
            q.tick(t, t > 5 && t < 9.5);
            ar1.draw(P.clamp((t - .7) / .6, 0, 1));
            ar2.draw(P.clamp((t - 1) / .6, 0, 1));
            result.on(t > 1.8 && t < 5);
            hedges.forEach((hbox, i) => hbox.on(t > 9 && Math.floor((t - 9) * 2) % 3 === i));
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 13,
      captions: [
        { t: 0, text: '그래서 할 일은 간단해요. <em>설정을 기록</em>하고, 두세 번 만들어요.' },
        { t: 5, text: '그중에서 마음에 드는 걸 고르는 눈이 <em>우리 역량</em>이에요.' },
        { t: 9, text: '다르게 나오는 건 고장이 아니에요. <em>확률로 뽑기</em> 때문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const steps = ['설정 기록', '두세 번 만들기', '마음에 드는 것 고르기'].map((label, i) => {
          const box = P.box({ x: 430 + i * 290, y: 150, w: 260, h: 120, label, accent: i === 2 ? 'aqua' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .6, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 690 + i * 290, y1: 210, x2: 720 + i * 290, y2: 210, width: 4, color: '#1B1F24' }));
        const chips = ['프롬프트', '시드', '모델', '비율'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 430 + i * 170, y: 320, text: c, color: i % 2 ? 'orange' : 'aqua', size: 22 }).el), 2.4 + i * .3, { from: 'pop' }));
        const final = P.text({ x: 430, y: 420, w: 790, text: 'AI 그림은 <em>주사위</em>를 던지고 시작해요.<br>다르게 나오는 건 고장이 아니라, <i>확률로 뽑기</i> 때문이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.5, { from: 'up' });
        const last = P.text({ x: 430, y: 560, w: 790, text: '고르는 눈이 우리 역량이에요.', size: 30, weight: 800, color: '#B3520F' });
        tl.at(stage.appendChild(last.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .6 && t < 5.5));
          }
        };
      }
    }
  ],

  interaction: {
    title: '시드 풍경 & 확률 뽑기',
    desc: '왼쪽은 <b>시드 슬라이더</b>로 그리는 쿼카 풍경이에요. 같은 시드면 늘 같은 장면이 나와요. 오른쪽은 <b>창의성(온도)</b>를 올리고 내리며 다음 단어 확률이 어떻게 바뀌는지, "뽑기"로 어떤 단어가 골라지는지 확인해 보세요.',
    mount(el, P) {
      const WORDS = [
        { w: '맛있어요', logit: 2.5 },
        { w: '기대돼요', logit: 1.8 },
        { w: '특별해요', logit: 1.2 },
        { w: '궁금해요', logit: 0.9 },
        { w: '수상해요', logit: 0.4 }
      ];
      const softmax = (logits, temp) => {
        const t = Math.max(0.05, temp);
        const ex = logits.map(l => Math.exp(l / t));
        const sum = ex.reduce((a, v) => a + v, 0);
        return ex.map(v => v / sum);
      };

      const img = new Image();
      let imgReady = false;
      img.onload = () => { imgReady = true; drawScene(); };
      img.src = 'assets/char/idea.webp';

      /* 왼쪽: 시드 풍경 */
      const canvas = P.h('canvas', { class: 'sim-canvas', width: '600', height: '340' });
      const seedOut = P.h('output', { id: 'seedOut' }, '42');
      const seedRange = P.h('input', { type: 'range', id: 'seedRange', min: '0', max: '99', value: '42', 'aria-label': '시드' });
      const seedRow = P.h('div', { class: 'sim-row' }, P.h('label', { for: 'seedRange' }, '시드 ', seedOut), seedRange);
      const seedBtn = P.h('button', { type: 'button', class: 'btn' }, '시드 42로 다시');
      const colA = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '① 시드로 그리는 쿼카 풍경'),
        P.h('p', { class: 'muted sim-desc' }, '시드가 같으면 늘 같은 장면이 나와요.'),
        canvas, seedRow,
        P.h('div', { class: 'sim-actions' }, seedBtn)
      );

      /* 오른쪽: 온도 · 확률 뽑기 */
      const bars = P.h('div', { class: 'sim-bars' });
      const barEls = WORDS.map(o => {
        const fill = P.h('div', { class: 'fill', style: 'height:2%' });
        const track = P.h('div', { class: 'track' }, fill);
        const pct = P.h('div', { class: 'pct' }, '0%');
        const wd = P.h('div', { class: 'wd' }, o.w);
        const bar = P.h('div', { class: 'sim-bar' }, pct, track, wd);
        bars.append(bar);
        return { bar, fill, pct };
      });
      const tempOut = P.h('output', { id: 'tempOut' }, '1.0');
      const tempRange = P.h('input', { type: 'range', id: 'tempRange', min: '0.1', max: '2.0', step: '0.1', value: '1.0', 'aria-label': '창의성(온도)' });
      const tempRow = P.h('div', { class: 'sim-row' }, P.h('label', { for: 'tempRange' }, '창의성(온도) ', tempOut), tempRange);
      const pickBtn = P.h('button', { type: 'button', class: 'btn primary' }, '뽑기');
      const pickResult = P.h('span', { class: 'sim-result' }, '');
      const colB = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '② "오늘 급식은 정말 ___"'),
        P.h('p', { class: 'muted sim-desc' }, '다음 단어를 확률로 골라요.'),
        bars, tempRow,
        P.h('div', { class: 'sim-actions' }, pickBtn, pickResult),
        P.h('p', { class: 'muted sim-note' }, '대략적인 예시예요. 실제 서비스의 확률표는 아니에요.')
      );

      const wrap = P.h('div', { class: 'sim-wrap' }, colA, colB);
      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:28px;max-width:100%}
        .sim-col{flex:1 1 300px;min-width:0;max-width:100%}
        .sim-col h4{font-size:16px;margin:0 0 4px}
        .sim-desc{font-size:13.5px;margin:0 0 10px}
        .sim-note{font-size:12px;margin-top:10px}
        .sim-canvas{width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:14px;background:#EAF7FA}
        .sim-row{display:flex;align-items:center;gap:10px;margin-top:12px;font-weight:700;font-size:13.5px;flex-wrap:wrap}
        .sim-row label{display:flex;align-items:center;gap:6px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 120px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:32px;display:inline-block}
        .sim-actions{margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-bars{display:flex;align-items:flex-end;gap:8px;height:190px}
        .sim-bar{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}
        .sim-bar .pct{font-family:var(--mono);font-size:12px;color:var(--aqua-deep);margin-bottom:4px}
        .sim-bar .track{width:100%;max-width:44px;height:120px;display:flex;align-items:flex-end}
        .sim-bar .fill{width:100%;background:var(--aqua);border-radius:8px 8px 0 0;transition:height .25s}
        .sim-bar.chosen .fill{background:var(--orange)}
        .sim-bar.chosen .pct{color:#B3520F}
        .sim-bar .wd{font-size:12.5px;margin-top:6px;text-align:center;word-break:keep-all;line-height:1.25}
        .sim-result{font-weight:800;color:#B3520F}
      ` });
      el.append(wrap, style);

      const ctx = canvas.getContext('2d');
      const W = 600, H = 340;
      function drawScene() {
        const seed = +seedRange.value;
        const r = P.rng(seed);
        const day = r() < 0.65;
        ctx.fillStyle = day ? '#EAF7FA' : '#1B1F24';
        ctx.fillRect(0, 0, W, H);
        const sx = 60 + r() * (W - 120), sy = 40 + r() * 40;
        ctx.beginPath(); ctx.arc(sx, sy, 24, 0, Math.PI * 2);
        ctx.fillStyle = day ? '#F2812D' : '#9AA5AF'; ctx.fill();
        if (day) {
          const cx = r() * W, cy = 30 + r() * 40;
          ctx.fillStyle = '#ffffff';
          [0, 1, 2].forEach(i => { ctx.beginPath(); ctx.arc(cx + i * 22 - 22, cy, 16, 0, Math.PI * 2); ctx.fill(); });
        }
        const baseY = H * 0.66;
        const hillCount = 2 + Math.floor(r() * 3);
        for (let i = 0; i < hillCount; i++) {
          const hx = (W / hillCount) * i + r() * 60;
          const hw = 150 + r() * 130, hh = 40 + r() * 70;
          ctx.beginPath();
          ctx.ellipse(hx, baseY + hh * .4, hw, hh, 0, 0, Math.PI * 2);
          ctx.globalAlpha = .85;
          ctx.fillStyle = i % 2 ? '#6B4A2E' : '#127E90';
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = '#EDEFE7';
        ctx.fillRect(0, baseY, W, H - baseY);
        const treeCount = 3 + Math.floor(r() * 5);
        for (let i = 0; i < treeCount; i++) {
          const tx = r() * W, ty = baseY + r() * (H - baseY - 20);
          ctx.fillStyle = '#6B4A2E'; ctx.fillRect(tx - 3, ty - 18, 6, 18);
          ctx.beginPath(); ctx.arc(tx, ty - 24, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#127E90'; ctx.fill();
        }
        const qw = 60 + r() * 50, qh = qw / 0.66;
        const qx = 20 + r() * (W - qw - 40), qy = H - qh - 6;
        if (imgReady) ctx.drawImage(img, qx, qy, qw, qh);
      }
      function updateBars() {
        const temp = +tempRange.value;
        tempOut.textContent = temp.toFixed(1);
        const probs = softmax(WORDS.map(o => o.logit), temp);
        probs.forEach((p, i) => { barEls[i].fill.style.height = `${Math.max(3, p * 100)}%`; barEls[i].pct.textContent = `${Math.round(p * 100)}%`; });
        return probs;
      }
      function pick() {
        const probs = updateBars();
        const seed = +seedRange.value, temp = +tempRange.value;
        const r = P.rng(Math.round(seed * 977 + temp * 131) + 1);
        const u = r();
        let acc = 0, chosen = probs.length - 1;
        for (let i = 0; i < probs.length; i++) { acc += probs[i]; if (u <= acc) { chosen = i; break; } }
        barEls.forEach((b, i) => b.bar.classList.toggle('chosen', i === chosen));
        pickResult.textContent = `→ "${WORDS[chosen].w}"`;
      }
      seedRange.addEventListener('input', () => { seedOut.textContent = seedRange.value; drawScene(); });
      seedBtn.addEventListener('click', () => { seedRange.value = '42'; seedOut.textContent = '42'; drawScene(); });
      tempRange.addEventListener('input', updateBars);
      pickBtn.addEventListener('click', pick);

      updateBars();
      drawScene();
    }
  },

  teacherLines: [
    'AI 그림은 <b>주사위를 던져서</b> 시작해요. 그래서 같은 말을 해도 매번 조금씩 달라요.',
    '다르게 나오는 건 고장이 아니에요. <b>마음에 드는 걸 고르는 게</b> 우리 역량이에요.'
  ],
  tip: {
    body: '마음에 드는 결과가 나오면 <b>프롬프트·시드·모델·비율</b> 같은 설정을 적어 두세요. 두세 번 만들어서 비교하고 고르는 게 실력이에요.',
    extra: '시드를 정할 수 없는 도구라면, 같은 프롬프트로 여러 번 만들어서 비교해 보세요.'
  },
  myth: {
    myth: '매번 다르게 나오면 고장이다.',
    fact: '확률로 하나를 뽑기 때문에 원래 그래요. 시드·온도 같은 설정이 그 확률을 조절할 뿐이에요.'
  },
  sources: [
    { title: 'Diffusers — Reusing seeds for deterministic generation', url: 'https://huggingface.co/docs/diffusers/using-diffusers/reusing_seeds', note: '같은 시드+Generator면 같은 결과가 나오지만, 하드웨어·설정에 따라 달라질 수 있고 보장되지는 않아요.' },
    { title: 'Claude 용어집 — Temperature', url: 'https://platform.claude.com/docs/en/about-claude/glossary', note: '온도가 낮으면 보수적인 답, 높으면 다양한 답이 나와요. 온도 0이어도 완전히 결정적이지 않을 수 있어요.' },
    { title: 'Holtzman et al. 2020 — The Curious Case of Neural Text Degeneration', url: 'https://arxiv.org/abs/1904.09751', note: '같은 모델도 다음 단어를 고르는 방식(샘플링)에 따라 글이 달라진다는 연구예요.' },
    { title: 'Ho et al. 2020 — Denoising Diffusion Probabilistic Models', url: 'https://arxiv.org/abs/2006.11239', note: '잡음에서 출발해 점점 그림을 만들어 가는 확산 모델의 원리를 제시한 논문이에요.' }
  ],
  script: `
오늘 브루에 똑같은 프롬프트를 두 번 넣었는데, 나온 영상이 조금씩 달랐어요. 배경도 다르고 움직임도 달랐죠. 왜 이런 일이 생길까요?

생성은 무작위 시작점, 시드에서 출발해요. 많은 이미지·영상 모델은 잡음에서 시작해서 조금씩 그림을 만들어 가요. 물론 모델마다 방식은 달라요. 글을 쓰는 모델은 다음에 올 단어를 확률로 골라요. '창의성(온도)'을 올리면 확률이 평평해져서 다양한 말이 나오고, 내리면 뾰족해져서 비슷한 말이 나와요.

시드와 설정이 같으면 대체로 비슷한 결과가 나와요. 하지만 브루처럼 시드 항목이 아예 없는 도구도 있고, 하드웨어나 버전이 달라지면 같은 시드라도 결과가 바뀔 수 있어요. 온도를 0으로 둬도 완전히 똑같지는 않을 수 있다고 해요.

그러니 마음에 드는 결과가 나오면 프롬프트·시드·모델·비율 같은 설정을 기록해 두고, 두세 번 만들어서 골라 보세요. 다르게 나오는 건 고장이 아니라 확률로 뽑기 때문이에요. 고르는 눈이 우리의 역량이에요.
`
};
