/* S5-33 [판단] AI가 AI가 쓴 글만 먹고 자라면 어떻게 될까: 모델 붕괴와 합성 데이터 */
export default {
  slug: 'v5-model-collapse',
  track: 'S5',
  title: 'AI가 AI가 쓴 글만 먹고 자라면 어떻게 될까',
  subtitle: '모델 붕괴와 합성 데이터',
  summary: '인터넷에 AI가 쓴 글이 늘면 다음 AI는 그 글로 배우게 돼요. AI 생성물로만 거듭 학습하면 드문 것부터 잊고 한 가지 말만 반복하는 "모델 붕괴"의 원리와, 사람이 쓴 원본 데이터를 지키면 피할 수 있다는 연구를 정리해요.',
  keywords: ['모델 붕괴', '합성 데이터', '재귀 학습', '분포의 꼬리', '다양성', '데이터 출처', 'MAD', '실제 데이터 누적'],

  scenes: [
    {
      title: '복사본의 복사본', dur: 13,
      captions: [
        { t: 0, text: 'AI가 쓴 글로 다음 AI를 가르치고, 그 AI가 쓴 글로 또 다음 AI를 가르쳤어요.' },
        { t: 5, text: '9세대를 거쳤더니 <em>건축 이야기</em>로 시작한 글이 <em>꼬리 색깔만 다른 산토끼</em> 이름을 줄줄이 반복했어요.' },
        { t: 9, text: '2024년 <em>네이처</em>에 실린 실험 결과예요. 연구자들은 이 퇴행을 <em>모델 붕괴</em>라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const cards = [
          ['1세대', '건축 이야기로 시작<br>자연스러운 문장', ''],
          ['5세대', '비슷한 표현이<br>자꾸 반복돼요', 'orange'],
          ['9세대', '꼬리 색깔만 다른<br>산토끼 이름 나열', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 300, y: 110, w: 270, h: 150, label, sub, accent: acc, icon: i === 2 ? P.ICON.x : P.ICON.doc });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 300, text: '2024년 네이처: 이 퇴행을 모델 붕괴라고 불러요', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        const note = P.text({ x: 330, y: 360, w: 880, text: 'AI가 쓴 글로 다음 AI를 가르치는 걸 거듭하면, 자연스러운 글이 점점 <em>비슷한 말만 반복하는 글</em>로 바뀌어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
            cards.forEach((c, i) => c.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: '드문 것부터 사라져요', dur: 13,
      captions: [
        { t: 0, text: 'AI는 배운 분포에서 표현을 <em>표본으로 뽑아</em> 문장을 만들어요.' },
        { t: 5, text: '표본은 늘 <em>유한</em>해서, 드물게 나오는 표현(<i>분포의 꼬리</i>)은 이번엔 안 뽑힐 수 있어요.' },
        { t: 9, text: '안 뽑히면 다음 세대는 그 표현을 <em>아예 몰라요</em>. 꼬리부터, 조용히 사라져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'point' });
        stage.append(q.el);
        const H0 = [20, 45, 70, 95, 100, 95, 70, 45, 20, 10, 6, 3];
        const H9 = [0, 0, 35, 85, 100, 85, 35, 0, 0, 0, 0, 0];
        const mkChart = (x0, heights) => heights.map((hv, i) => {
          const bh = Math.round(hv * 1.2);
          const tail = i < 2 || i > 9;
          const bar = P.h('div', { style: `left:${x0 + i * 28}px;top:${400 - bh}px;width:22px;height:${bh}px;border-radius:6px 6px 2px 2px;background:${hv === 0 ? '#9AA5AF' : (tail ? '#F2812D' : '#127E90')}` });
          tl.at(stage.appendChild(bar), .3 + i * .05, { from: 'up' });
          return bar;
        });
        mkChart(340, H0);
        mkChart(760, H9);
        const lab0 = P.text({ x: 340, y: 410, w: 330, text: '세대 0', size: 16, weight: 700, align: 'center', cls: 'muted' });
        const lab9 = P.text({ x: 760, y: 410, w: 330, text: '세대 9(예시)', size: 16, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lab0.el), .3, { from: 'up' });
        tl.at(stage.appendChild(lab9.el), .3, { from: 'up' });
        const chip1 = P.chip({ x: 600, y: 240, text: '세대마다 표본 뽑기 → 다시 학습', color: 'ink', size: 18 });
        tl.at(stage.appendChild(chip1.el), 5.4, { from: 'pop' });
        const chip2 = P.chip({ x: 340, y: 460, text: '분포의 꼬리 = 드물게 나오는 표현·사례', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chip2.el), 7.0, { from: 'pop' });
        const final = P.text({ x: 340, y: 510, w: 880, text: '드문 표현부터, <em>조용히 사라져요</em>.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        const small = P.text({ x: 340, y: 568, w: 880, text: '막대는 원리를 보여 주는 그림이에요. 실제 측정값이 아니에요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9);
          }
        };
      }
    },
    {
      title: '초기 붕괴, 후기 붕괴', dur: 13,
      captions: [
        { t: 0, text: '이 퇴행은 두 단계로 나타나요. <em>초기 붕괴</em>에서는 드물게 나오는 표현부터 사라져요.' },
        { t: 5, text: '<em>후기 붕괴</em>에서는 다양성 자체가 줄어서, 원본과 거의 닮지 않은 좁은 결과로 수렴해요.' },
        { t: 9.5, text: '언어 모델, 압축 모델(VAE), 통계 모델(GMM) 모두에서 같은 패턴이 확인됐어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 110, w: 400, h: 140, label: '초기 붕괴', sub: '드물게 나오는 표현<br>(분포의 꼬리)이 먼저 사라져요', accent: 'aqua', icon: P.ICON.doc });
        const b = P.box({ x: 800, y: 110, w: 400, h: 140, label: '후기 붕괴', sub: '다양성이 쪼그라들어<br>원본과 거의 안 닮게 돼요', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 5.2, { from: 'up' });
        const bars = [100, 82, 66, 52, 40].map((hv, i) => {
          const bar = P.h('div', { style: `left:${380 + i * 70}px;top:${420 - hv * 1.2}px;width:44px;height:${hv * 1.2}px;border-radius:10px 10px 4px 4px;background:${i === 0 ? '#127E90' : '#9AA5AF'}` });
          tl.at(stage.appendChild(bar), 9.6 + i * .25, { from: 'up' });
          return bar;
        });
        const lab = P.text({ x: 380, y: 430, w: 340, text: '원본 → 1세대 → 2세대 → 3세대 → 4세대', size: 16, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 9.8, { from: 'up' });
        const final = P.text({ x: 760, y: 300, w: 460, text: '초기엔 <em>꼬리</em>가, 후기엔 <em>폭 전체</em>가 사라져요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 760, y: 380, w: 460, text: '막대는 원리를 보여 주는 그림이에요. 언어 모델·VAE·GMM에서 같은 경향을 확인했어요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || (t > 5.2 && t < 9.4));
            a.on(t > .3); b.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '원본을 지키면 버텨요', dur: 14,
      captions: [
        { t: 0, text: '같은 네이처 실험에서, 원본 데이터를 <em>하나도 남기지 않으면</em> 성능이 크게 나빠졌어요.' },
        { t: 5, text: '세대마다 원본 데이터를 <em>10%만 남겨도</em> 성능 저하가 훨씬 작았어요.' },
        { t: 9.5, text: '실제 데이터를 합성 데이터로 <em>갈아 끼우면</em> 붕괴로 가지만, <em>쌓아 가면</em> 붕괴를 피했어요(2024년 연구).' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const box1 = P.box({ x: 340, y: 100, w: 380, h: 130, label: '원본 0% 남김', sub: '세대마다 전부 버리면<br>성능이 크게 나빠졌어요', accent: 'orange', icon: P.ICON.x });
        const box2 = P.box({ x: 760, y: 100, w: 380, h: 130, label: '원본 10% 남김', sub: '세대마다 10%씩 남기면<br>성능 저하가 작았어요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(box1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(box2.el), 1.1, { from: 'up' });
        const bar1 = P.h('div', { style: `left:495px;top:${380 - 45 * 1.4}px;width:70px;height:${45 * 1.4}px;border-radius:10px 10px 4px 4px;background:#F2812D` });
        const bar2 = P.h('div', { style: `left:915px;top:${380 - 90 * 1.4}px;width:70px;height:${90 * 1.4}px;border-radius:10px 10px 4px 4px;background:#127E90` });
        tl.at(stage.appendChild(bar1), 2.6, { from: 'up' });
        tl.at(stage.appendChild(bar2), 2.9, { from: 'up' });
        const chip1 = P.chip({ x: 340, y: 430, text: '갈아 끼우면 붕괴, 쌓아 가면 피함(2024년 연구)', color: 'orange', size: 18 });
        const chip2 = P.chip({ x: 760, y: 430, text: '잘 고른 합성 데이터는 도움이 되기도(2023년 연구)', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(chip1.el), 5.4, { from: 'pop' });
        tl.at(stage.appendChild(chip2.el), 6.2, { from: 'pop' });
        const final = P.text({ x: 340, y: 500, w: 880, text: '합성 데이터가 문제가 아니라, 실제 데이터를 <em>버리고 갈아 끼우는</em> 게 문제예요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.5);
            box1.on(t > .3); box2.on(t > 1.1);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '<em>사람이 쓴 원본</em>은 따로 보관하고, AI로 만든 자료에는 표시를 남겨요.' },
        { t: 4.5, text: '우리 반, 우리 동네처럼 <em>드문 이야기</em>를 기록해 두는 것도 소중해요.' },
        { t: 8.5, text: 'AI 생성물이 늘수록, 사람이 직접 쓴 글의 가치는 <em>더 커져요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 원본 따로 보관', '사람이 쓴 글은<br>따로 폴더에 보관해요', '', P.ICON.save],
          ['② AI 생성물에는 표시', '파일 이름이나 첫 줄에<br>표시를 남겨요', 'aqua', P.ICON.doc],
          ['③ 드문 이야기 기록', '우리 반, 우리 동네처럼<br>흔치 않은 이야기를 적어요', 'orange', P.ICON.check]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340 + i * 310, y: 200, w: 290, h: 150, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 430, w: 900, text: 'AI 생성물이 늘수록, 사람이 직접 쓴 글의 가치가 <em>더 커져요</em>.', size: 27, weight: 800 });
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
    title: '세대 복사기',
    desc: '호주 동물 12종의 처음 등장 빈도를 막대로 보여줘요. <b>한 세대 더</b>를 누르면 그 분포에서 100번 표본을 뽑아 다음 세대 분포를 만들고, 드문 종류(오렌지 막대)부터 사라지는 걸 볼 수 있어요. 아래쪽 "원본 10% 섞기" 줄은 매 세대 표본 10개를 처음 분포에서 다시 뽑아, 사라지는 속도가 어떻게 느려지는지 나란히 비교해요. 표본추출을 단순하게 흉내 낸 예시 값이에요. 실제 연구는 언어 모델·VAE·GMM으로 같은 경향을 확인했어요.',
    mount(el, P) {
      const NAMES = ['쿼카', '코알라', '웜뱃', '오리너구리', '캥거루', '에뮤', '딩고', '주머니쥐', '포섬', '바늘두더지', '태즈메이니아데빌', '쿠올'];
      const ORIGINAL = [30, 20, 14, 10, 8, 6, 4, 3, 2, 1, 1, 1];
      const TAIL_START = 6;
      const MAXG = 10;

      function cumulative(arr) { let acc = 0; return arr.map(c => (acc += c / 100)); }

      function sampleGen(prevCounts, g, mix) {
        const prevCum = cumulative(prevCounts);
        const origCum = cumulative(ORIGINAL);
        const pick = P.rng(1000 + g);
        const mixPick = P.rng(2000 + g);
        const counts = new Array(NAMES.length).fill(0);
        for (let i = 0; i < 100; i++) {
          const useOrig = mix && mixPick() < .1;
          const cum = useOrig ? origCum : prevCum;
          const r = pick();
          let idx = cum.findIndex(c => r <= c);
          if (idx === -1) idx = NAMES.length - 1;
          counts[idx]++;
        }
        return counts;
      }

      /* 결정적 계산: 같은 시드로 미리 두 사슬(섞기 없음/섞기)을 만들어 둬요. */
      const chainNo = [ORIGINAL.slice()];
      const chainMix = [ORIGINAL.slice()];
      for (let g = 1; g <= MAXG; g++) {
        chainNo.push(sampleGen(chainNo[g - 1], g, false));
        chainMix.push(sampleGen(chainMix[g - 1], g, true));
      }

      function mkRow(title) {
        const bars = NAMES.map(() => P.h('div', { class: 'sim-bar-fill' }));
        const cols = bars.map(b => P.h('div', { class: 'sim-bar-col' }, b));
        const chart = P.h('div', { class: 'sim-chart' }, cols);
        const left = P.h('div', { class: 'sim-left' },
          P.h('div', { class: 'sim-left-k' }, '남은 종류'), P.h('div', { class: 'sim-left-v' }, ''));
        const gone = P.h('div', { class: 'sim-gone' }, '');
        const card = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, title), chart, left, gone);
        return { card, bars, left, gone };
      }

      const rowNo = mkRow('섞기 없음 (수정본 위에 수정)');
      const rowMix = mkRow('원본 10% 섞기');
      const more = P.h('button', { class: 'btn primary', type: 'button' }, '한 세대 더');
      const reset = P.h('button', { class: 'btn', type: 'button' }, '처음 세대로');
      const range = P.h('input', { type: 'range', id: 'sim-n', min: '0', max: String(MAXG), step: '1', value: '0' });
      const rangeLab = P.h('label', { for: 'sim-n', class: 'sim-rl' }, '세대 ', P.h('b', {}, '0'));
      const bar = P.h('div', { class: 'sim-bar' }, more, reset, rangeLab, range);
      el.append(P.h('div', { class: 'sim-wrap' }, bar, P.h('div', { class: 'sim-cards' }, rowNo.card, rowMix.card)));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-rl{font-size:13px;color:var(--muted);margin-left:auto}
        .sim-bar input[type=range]{width:160px;max-width:100%}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff}
        .sim-card-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px;text-align:center;word-break:keep-all}
        .sim-chart{display:flex;align-items:flex-end;gap:3px;height:110px;padding:0 2px}
        .sim-bar-col{flex:1;min-width:0;height:100%;display:flex;align-items:flex-end}
        .sim-bar-fill{width:100%;min-height:2px;border-radius:3px 3px 1px 1px;background:var(--acc1);transition:height .3s,background .3s}
        .sim-left{display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--muted)}
        .sim-left-v{font-family:var(--mono);font-weight:700;color:var(--ink)}
        .sim-gone{margin-top:4px;font-size:11px;color:var(--muted);min-height:14px;word-break:keep-all}
      ` }));

      function renderRow(row, counts) {
        const max = Math.max(...ORIGINAL);
        counts.forEach((c, i) => {
          const h = Math.max(2, Math.round((c / max) * 100));
          row.bars[i].style.height = h + 'px';
          row.bars[i].style.background = c === 0 ? '#9AA5AF' : (i >= TAIL_START ? '#F2812D' : '#127E90');
        });
        const left = counts.filter(c => c > 0).length;
        row.left.lastChild.textContent = `${left}/12`;
        const gone = NAMES.filter((n, i) => counts[i] === 0);
        row.gone.textContent = gone.length ? `사라진 단어: ${gone.join('·')}` : '사라진 단어: 없음';
      }

      let n = 0;
      function render() {
        rangeLab.querySelector('b').textContent = String(n);
        range.value = String(n);
        renderRow(rowNo, chainNo[n]);
        renderRow(rowMix, chainMix[n]);
      }
      more.addEventListener('click', () => { n = Math.min(MAXG, n + 1); render(); });
      reset.addEventListener('click', () => { n = 0; render(); });
      range.addEventListener('input', () => { n = +range.value; render(); });
      render();
    }
  },

  teacherLines: [
    'AI가 쓴 글만 먹고 자란 AI는 <b>드문 것부터 잊어버려요</b>. 결국 비슷한 말만 반복해요.',
    '여러분이 <b>직접 쓴 글</b>은 앞으로 AI에게도 더 귀한 자료가 돼요.'
  ],
  tip: {
    body: '학급 자료실에 AI로 만든 자료를 넣을 때는 파일 이름이나 첫 줄에 "AI 생성"을 표시하고, 사람이 쓴 원본은 따로 폴더를 두세요. AI 초안을 고쳐 쓰는 활동이라면 원본(학생 문장)과 AI 문장을 색으로 구분해 남기게 하세요.',
    extra: 'AI가 만든 예시문을 다음 해 예시문으로 다시 쓰는 일이 반복되면 학급 안에서도 "복사본의 복사본"이 생겨요. 매년 학생 원본 글을 한 편 이상 새로 모아 예시로 쓰세요.'
  },
  myth: {
    myth: '인터넷에 AI가 쓴 글이 많아질수록 AI는 더 많이 배워서 똑똑해진다.',
    fact: 'AI 생성물로 거듭 학습하면 드문 표현부터 사라지는 모델 붕괴가 일어나요. 사람이 쓴 실제 데이터를 버리지 않고 함께 쌓아야 버텨요.'
  },
  sources: [
    { title: 'AI models collapse when trained on recursively generated data (Nature, 2024)', url: 'https://www.nature.com/articles/s41586-024-07566-y', note: 'AI 생성물로 AI를 거듭 학습시키면 세대가 지날수록 무너진다는 연구. 초기 붕괴·후기 붕괴를 정의했어요.' },
    { title: 'Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data (arXiv, 2024)', url: 'https://arxiv.org/abs/2404.01413', note: '실제 데이터를 합성 데이터로 갈아 끼우면 붕괴로 가지만, 곁에 쌓아 가면 붕괴를 피할 수 있다는 연구.' },
    { title: 'Self-Consuming Generative Models Go MAD (arXiv, 2023)', url: 'https://arxiv.org/abs/2307.01850', note: '자기 소비 고리에서 새 실제 데이터가 충분하지 않으면 품질이나 다양성이 떨어진다는 분석(모델 자가포식 장애).' },
    { title: 'Textbooks Are All You Need (arXiv, 2023)', url: 'https://arxiv.org/abs/2306.11644', note: '잘 골라 만든 합성 데이터가 오히려 도움이 된 사례. 핵심은 데이터 품질과 큐레이션.' }
  ],
  script: `AI가 쓴 글로 다음 AI를 가르치고, 그 AI가 쓴 글로 또 다음 AI를 가르치면 어떻게 될까요. 2024년 네이처 실험에서는 건축 이야기로 시작한 글이 9세대를 거치자 꼬리 색깔만 다른 산토끼 이름을 줄줄이 반복하는 글로 무너졌어요. 연구자들은 이 퇴행을 모델 붕괴라고 불러요.

AI는 배운 분포에서 표본을 뽑아 문장을 만드는데, 표본은 유한해서 드문 표현은 이번엔 안 뽑힐 수 있어요. 안 뽑히면 다음 세대는 그 표현을 아예 몰라요. 초기엔 이런 꼬리가 먼저 사라지고, 후기엔 다양성 자체가 쪼그라들어 원본과 거의 닮지 않은 결과로 수렴해요. 언어 모델뿐 아니라 VAE, GMM 같은 통계 모델에서도 같은 패턴이 확인됐어요.

해법도 같은 실험에서 나왔어요. 원본 데이터를 하나도 남기지 않으면 성능이 크게 나빠졌지만, 10%만 남겨도 저하가 훨씬 작았어요. 실제 데이터를 합성 데이터로 갈아 끼우면 붕괴로 가지만, 곁에 쌓아 가면 붕괴를 피했다는 연구도 있고, 잘 골라 만든 합성 데이터가 도움이 된 사례도 있어요.

교실에서는 사람이 쓴 원본을 따로 보관하고, AI로 만든 자료에는 표시를 남기세요. 우리 반, 우리 동네 같은 흔치 않은 이야기도 기록해 두세요. AI 생성물이 늘수록 사람이 직접 쓴 글의 가치는 더 커지니까요.`
};
