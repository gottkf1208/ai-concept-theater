/* S5-1 [트랙 C] 고칠수록 이상해지는 그림: 편집 사슬과 열화 */
export default {
  slug: 's5-degradation',
  track: 'C',
  title: '고칠수록 이상해지는 그림, 왜 그럴까',
  subtitle: '편집 사슬과 열화',
  summary: '해커톤 로고에서 "왼쪽 원형 A만 빼고 초고화질로" 부탁했더니 얼룩이 생기고 4K도 아니었어요. 다시 시켰더니 글자가 뭉툭해졌고요. 편집을 거듭할수록 정보가 깎이는 원리와, 원본에서 다시 시작하는 해소법을 실제 사례로 파고들어요.',
  keywords: ['열화', '편집 사슬', '세대 손실', 'img2img', 'SDEdit', '잠재 공간', '재생성', '모델 붕괴', '레퍼런스'],

  scenes: [
    {
      title: '원형 A만 빼 달랬는데', dur: 14,
      captions: [
        { t: 0, text: '해커톤 로고를 주고 "왼쪽 원형 A만 빼고 <em>초고화질</em>로 뽑아 줘"라고 했어요.' },
        { t: 5, text: '돌아온 건 <em>얼룩덜룩한</em> 배경에, 크기는 4K가 아니라 1749×899. 다시 시켰더니 이번엔 글자가 <em>뭉툭</em>해졌어요.' },
        { t: 10, text: '뺀 건 동그라미 하나인데, 왜 배경과 글자까지 달라질까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '여기서 왼쪽 원형 A는 빼고 <b>초고화질</b>로 이미지 뽑아봐', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const cards = [
          ['1차 결과', '배경 얼룩 · 1749×899<br>4K 아님', 'orange'],
          ['2차 결과', '벡터로 다시 그림 · 3840×1976<br>글자 윤곽이 둥글고 뭉툭', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 460, y: 250, w: 430, h: 140, label, sub, accent: acc, icon: P.ICON.x });
          tl.at(stage.appendChild(b.el), 5.2 + i * 2.2, { from: 'up' });
          return b;
        });
        /* 얼룩 시연: 원본과 다시 그린 결과를 나란히. 그 편 의상 쿼카 그림을 쓰고, 결과 쪽에만 잡음을 얹어요 */
        const srcImg = new Image(); srcImg.src = P.charSrc('base');
        const pair = [['원본', 0], ['결과 · 얼룩', .28]].map(([label, lv], i) => {
          const n = P.noise({ x: 930 + i * 150, y: 50, w: 130, h: 130, seed: 23 + i });
          n.set(lv);
          const draw = () => { n.source(srcImg); n.set(lv); };
          srcImg.addEventListener('load', draw, { once: true });
          if (srcImg.complete && srcImg.naturalWidth) draw();
          tl.at(stage.appendChild(n.el), 5.2 + i * .6, { from: 'pop' });
          const lab = P.text({ x: 920 + i * 150, y: 184, w: 150, text: label, size: 16, weight: 700, align: 'center', color: i ? '#F2812D' : '#1B1F24' });
          tl.at(stage.appendChild(lab.el), 5.4 + i * .6, { from: 'up' });
          return n;
        });
        const chip = P.chip({ x: 330, y: 420, text: '"4K도 아닌데 왜 얼룩덜룩하지?"', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 7.2, { from: 'pop' });
        const note = P.text({ x: 330, y: 480, w: 880, text: '뺀 건 <em>동그라미 하나</em>인데, 배경과 글자까지 달라졌어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            cards.forEach((c, i) => c.on(t > 5.2 + i * 2.2));
          }
        };
      }
    },
    {
      title: '복사본의 복사본', dur: 14,
      captions: [
        { t: 0, text: '"여기만 빼 줘", "더 크게"는 사실 <em>다시 그리기</em>예요. 이전 결과에 잡음을 섞고 통째로 새로 그려요.' },
        { t: 5, text: '게다가 그림은 매번 <em>압축</em>됐다가 <em>복원</em>돼요. 복사기로 복사본을 또 복사하는 것과 같아요.' },
        { t: 10, text: '한 번은 티가 안 나도, 사슬처럼 이어지면 손실이 <em>쌓여요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const boxes = [
          ['이전 결과', '입력'], ['잡음 섞기', '조금 흐리게'], ['압축·복원', '잠재 공간 왕복'], ['다시 그리기', '새 결과']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 225, y: 110, w: 200, h: 120, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 225, y1: 170, x2: 565 + i * 225, y2: 170, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1120, y1: 240, x2: 400, y2: 250, curve: 90, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 620, y: 300, text: '새 결과가 다음 편집의 입력이 돼요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(loopLab.el), 5.2, { from: 'pop' });
        const gen = P.text({ x: 340, y: 400, w: 880, text: '한 바퀴마다 조금씩 깎여요. 이걸 <i>세대 손실</i>이라고 불러요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(gen.el), 10.2, { from: 'up' });
        const small = P.text({ x: 340, y: 460, w: 880, text: '압축·복원은 VAE라는 부품이 맡아요. 한 번 왕복할 때마다 미세한 정보가 깎여요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .9)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.4) / .9, 0, 1));
            boxes.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '연구가 말해 주는 것', dur: 13,
      captions: [
        { t: 0, text: '이런 편집 방식을 연구에서는 <em>SDEdit</em>이라고 불러요. 잡음을 얼마나 섞느냐가 <em>얼마나 새로 그리느냐</em>예요.' },
        { t: 5, text: 'AI가 만든 결과를 다시 AI에 먹이면 망가진다는 연구도 있어요. 2024년 <em>네이처</em>에 실린 <em>모델 붕괴</em> 연구예요.' },
        { t: 9.5, text: '학습과 편집은 다르지만 원리는 같아요. <em>원본에서 멀어질수록</em> 정보가 사라져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 110, w: 400, h: 140, label: 'SDEdit (2022)', sub: '잡음을 섞어 되그리는 편집의 원리<br>잡음이 많을수록 원본과 멀어져요', accent: 'aqua', icon: P.ICON.doc });
        const b = P.box({ x: 800, y: 110, w: 400, h: 140, label: '모델 붕괴 (네이처, 2024)', sub: 'AI 결과물로 AI를 다시 학습시키면<br>세대가 지날수록 무너져요', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 5.2, { from: 'up' });
        const bars = [100, 82, 66, 52, 40].map((h, i) => {
          const bar = P.h('div', { style: `left:${380 + i * 70}px;top:${420 - h * 1.2}px;width:44px;height:${h * 1.2}px;border-radius:10px 10px 4px 4px;background:${i === 0 ? '#127E90' : '#9AA5AF'}` });
          tl.at(stage.appendChild(bar), 9.6 + i * .25, { from: 'up' });
          return bar;
        });
        const lab = P.text({ x: 380, y: 430, w: 340, text: '원본 → 1세대 → 2세대 → 3세대 → 4세대', size: 16, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 9.8, { from: 'up' });
        const final = P.text({ x: 760, y: 300, w: 460, text: '원본에서 멀어질수록 <em>정보가 사라져요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 760, y: 380, w: 460, text: '막대는 원리를 보여 주는 그림이에요. 세대가 지날수록 드물던 특징부터 사라져요.', size: 18, weight: 600, cls: 'muted' });
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
      title: '해소법: 원본으로 돌아가기', dur: 14,
      captions: [
        { t: 0, text: '해법은 사슬을 끊는 거예요. 로고라면 <em>원본 파일</em>에서 고치고, 그림이라면 <em>원본 레퍼런스</em>에서 매번 새로 만들어요.' },
        { t: 5, text: '바꿀 점은 프롬프트에 <em>전부</em> 적어요. "모자, 배경, 표정을 이렇게"처럼 한 번에요.' },
        { t: 9.5, text: '<em>시드</em>를 같이 적어 두면 마음에 든 결과를 다시 불러올 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const src = P.box({ x: 340, y: 100, w: 260, h: 150, label: '원본 파일·레퍼런스', sub: '로고는 벡터 원본에서<br>그림은 처음 이미지에서', accent: 'aqua', icon: P.ICON.save });
        const pr = P.box({ x: 640, y: 100, w: 260, h: 150, label: '프롬프트', sub: '"원형 A 제거, 나머지 유지,<br>3840px" 한 번에', accent: 'ink', icon: P.ICON.doc });
        const sd = P.box({ x: 940, y: 100, w: 260, h: 150, label: '시드', sub: '재현용 번호<br>기록해 두기', accent: '', icon: P.ICON.dice });
        [src, pr, sd].forEach((b, i) => tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' }));
        const out = P.box({ x: 640, y: 330, w: 260, h: 120, label: '새로 생성', sub: '매번 원본에서 출발', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(out.el), 3.2, { from: 'pop' });
        const arrows = [
          P.arrow(lines, { x1: 470, y1: 250, x2: 700, y2: 330, curve: 20, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 770, y1: 250, x2: 770, y2: 330, width: 4, color: '#1B1F24' }),
          P.arrow(lines, { x1: 1070, y1: 250, x2: 840, y2: 330, curve: -20, width: 4, color: '#9AA5AF' })
        ];
        const x = P.chip({ x: 340, y: 480, text: '수정본 → 수정본 → 수정본 (사슬)', color: 'orange', size: 20 });
        const o = P.chip({ x: 760, y: 480, text: '원본 → 새 결과, 원본 → 새 결과', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(x.el), 5.4, { from: 'pop' });
        tl.at(stage.appendChild(o.el), 6.2, { from: 'pop' });
        const final = P.text({ x: 340, y: 540, w: 880, text: '고칠 때마다 <i>원본에서 다시</i>. 사슬이 길어지지 않게요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (2.4 + i * .3)) / .6, 0, 1)));
            [src, pr, sd].forEach((b, i) => b.on(t > .3 + i * .8));
            out.on(t > 3.2);
          }
        };
      }
    },
    {
      title: '정리: 편집 사슬 끊기', dur: 12,
      captions: [
        { t: 0, text: '원본은 <em>마스터</em>로 따로 보관해요. 수정본 위에 수정하지 않아요.' },
        { t: 4.5, text: '두 번 이상 고쳤다 싶으면 <em>원본에서 다시</em> 만들고, 결과를 나란히 비교해요.' },
        { t: 8.5, text: '글자와 손처럼 잘 무너지는 곳은 <em>확대해서</em> 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 원본 보관', '로고는 벡터 파일, 그림은 마스터 + 프롬프트 + 시드'],
          ['② 원본에서 재생성', '수정 2회부터는 사슬 끊기'],
          ['③ 나란히 비교', '원본과 결과를 같이 놓고'],
          ['④ 확대 확인', '글자·손·눈부터']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '열화는 고장이 아니라 <em>쌓인 손실</em>이에요. 원본으로 돌아가면 사라져요.', size: 27, weight: 800 });
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
    title: '편집 사슬 vs 원본 재생성',
    desc: '왼쪽은 <b>수정본을 또 수정</b>하는 사슬 편집, 오른쪽은 <b>매번 원본에서 새로</b> 만드는 방식이에요. "한 번 더 고치기"를 누르거나 슬라이더를 올리면 편집 횟수가 늘어나요. 왼쪽만 점점 흐려지고 색이 탁해지는 걸 보세요. 실제 도구의 열화 정도는 이보다 크거나 작을 수 있어요.',
    mount(el, P) {
      let n = 0;
      const SRC = P.charSrc('base');
      const mk = title => {
        const img = P.h('img', { src: SRC, alt: title, draggable: 'false' });
        const frame = P.h('div', { class: 'sim-frame' }, img);
        const meter = P.h('div', { class: 'sim-meter' }, P.h('i', {}));
        const val = P.h('div', { class: 'sim-val' }, '');
        const card = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, title), frame, P.h('div', { class: 'sim-lab' }, '선명도'), meter, val);
        return { card, img, meter, val };
      };
      const chain = mk('사슬 편집 (수정본 위에 수정)');
      const fresh = mk('원본 재생성 (원본 + 프롬프트 + 시드)');
      const more = P.h('button', { class: 'btn primary', type: 'button' }, '한 번 더 고치기');
      const reset = P.h('button', { class: 'btn', type: 'button' }, '원본으로');
      const range = P.h('input', { type: 'range', id: 'sim-n', min: '0', max: '8', step: '1', value: '0' });
      const rangeLab = P.h('label', { for: 'sim-n', class: 'sim-rl' }, '편집 횟수 ', P.h('b', {}, '0'));
      const bar = P.h('div', { class: 'sim-bar' }, more, reset, rangeLab, range);
      el.append(P.h('div', { class: 'sim-wrap' }, bar, P.h('div', { class: 'sim-cards' }, chain.card, fresh.card)));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-rl{font-size:13px;color:var(--muted);margin-left:auto}
        .sim-bar input[type=range]{width:160px;max-width:100%}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff;text-align:center}
        .sim-card-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px;word-break:keep-all}
        .sim-frame{aspect-ratio:1;border-radius:10px;background:var(--paper);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .sim-frame img{width:78%;height:78%;object-fit:contain;display:block;transition:filter .3s,transform .3s}
        .sim-lab{margin-top:10px;font-size:12px;color:var(--muted)}
        .sim-meter{height:8px;border-radius:999px;background:var(--paper);overflow:hidden;margin-top:4px}
        .sim-meter i{display:block;height:100%;background:var(--acc1);transition:width .3s}
        .sim-val{font-family:var(--mono);font-size:12px;color:var(--muted);margin-top:4px}
      ` }));
      function render() {
        rangeLab.querySelector('b').textContent = String(n);
        range.value = String(n);
        /* 사슬: 횟수마다 흐림·채도 저하·색 틀어짐이 누적 */
        const blur = (n * 0.55).toFixed(2), sat = Math.max(.35, 1 - n * .08).toFixed(2), hue = n * 4, con = Math.max(.7, 1 - n * .035).toFixed(2);
        chain.img.style.filter = `blur(${blur}px) saturate(${sat}) hue-rotate(${hue}deg) contrast(${con})`;
        chain.img.style.transform = `scale(${(1 + n * .01).toFixed(3)})`;
        const cs = Math.max(8, Math.round(100 - n * 11));
        chain.meter.firstChild.style.width = cs + '%'; chain.val.textContent = `${cs}% · ${n}회 누적`;
        /* 원본 재생성: 매번 원본에서 출발하니 선명도는 그대로, 세부만 조금 다름 */
        const r = P.rng(41 + n);
        const rot = n ? ((r() * 2 - 1) * 2).toFixed(1) : 0;
        fresh.img.style.filter = 'none';
        fresh.img.style.transform = `rotate(${rot}deg)`;
        fresh.meter.firstChild.style.width = '100%'; fresh.val.textContent = n ? `100% · ${n}번째도 원본에서` : '100% · 원본';
      }
      more.addEventListener('click', () => { n = Math.min(8, n + 1); render(); });
      reset.addEventListener('click', () => { n = 0; render(); });
      range.addEventListener('input', () => { n = +range.value; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 그림을 고칠 때마다 <b>복사본을 또 복사</b>하는 것과 같아요. 여러 번 고치면 점점 흐려져요.',
    '고치고 싶으면 수정본 말고 <b>처음 그림</b>을 다시 넣고 바꿀 점을 한 번에 말해 줘요.'
  ],
  tip: {
    body: '로고처럼 정확해야 하는 건 AI에게 "빼 줘·키워 줘"를 시키지 말고 <b>원본 파일(벡터·원본 PNG)</b>에서 고치세요. 캐릭터 그림은 처음 만든 <b>원본, 프롬프트, 시드</b>를 한 폴더에 같이 보관하고, 수정은 그 원본에서 다시 시작해요.',
    extra: '부분만 바꾸고 싶으면 그 부분만 마스크로 지정하는 편집 기능을 찾으세요. 전체를 다시 그리는 편집보다 원본이 덜 깎여요. 이걸 인페인팅이라고 불러요.'
  },
  myth: {
    myth: '"여기만 빼 줘"라고 하면 그 부분만 바뀐다.',
    fact: '대부분의 편집은 이전 결과에 잡음을 섞어 그림 전체를 다시 그려요. 그래서 고치지 않은 부분도 조금씩 달라지고, 반복하면 손실이 <b>누적</b>돼요.'
  },
  sources: [
    { title: 'SDEdit: Guided Image Synthesis and Editing with Stochastic Differential Equations (arXiv, 2021)', url: 'https://arxiv.org/abs/2108.01073', note: '잡음을 섞은 뒤 되그리는 방식으로 이미지를 편집하는 원리. 잡음 양이 원본과의 거리를 정해요.' },
    { title: 'High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)', url: 'https://arxiv.org/abs/2112.10752', note: '이미지를 압축한 잠재 공간에서 생성·복원하는 구조. 편집마다 이 압축·복원을 왕복해요.' },
    { title: 'AI models collapse when trained on recursively generated data (Nature, 2024)', url: 'https://www.nature.com/articles/s41586-024-07566-y', note: 'AI 생성물로 AI를 거듭 학습시키면 세대가 지날수록 무너진다는 연구.' },
    { title: 'Self-Consuming Generative Models Go MAD (arXiv, 2023)', url: 'https://arxiv.org/abs/2307.01850', note: '생성물을 다시 먹이는 자기 소비 고리에서 품질과 다양성이 함께 떨어진다는 분석.' }
  ],
  script: `해커톤 로고를 AI에게 주고 "왼쪽 원형 A만 빼고 초고화질로 뽑아 줘"라고 한 적이 있어요. 돌아온 건 얼룩덜룩한 배경에, 크기도 4K가 아니라 1749×899였어요. 다시 시켰더니 이번엔 벡터로 새로 그려서 4K는 맞췄는데 글자 윤곽이 원본보다 둥글고 뭉툭해졌고요. 뺀 건 동그라미 하나인데 왜 배경과 글자까지 달라졌을까요.

"여기만 빼 줘"도 "더 크게"도 사실 다시 그리기예요. 도구는 이전 결과에 잡음을 조금 섞고 그림 전체를 새로 그려요. 게다가 그림은 매번 압축됐다가 복원돼요. 복사기로 복사본을 또 복사하는 것과 같아서 한 번은 티가 안 나도 사슬처럼 이어지면 손실이 쌓여요. 연구에서는 이런 편집 방식을 SDEdit이라고 부르고, AI 결과물로 AI를 거듭 학습시키면 무너진다는 모델 붕괴 연구도 2024년 네이처에 실렸어요. 원본에서 멀어질수록 정보가 사라진다는 점은 같아요.

해법은 사슬을 끊는 거예요. 로고처럼 정확해야 하는 건 원본 파일에서 고치고, 그림은 원본 레퍼런스에서 매번 새로 만들어요. 바꿀 점은 프롬프트에 한 번에 다 적고 시드를 같이 적어 두면 마음에 든 결과를 다시 불러올 수 있어요. 결과는 나란히 비교하고, 글자와 손은 확대해서 확인하세요.`
};
