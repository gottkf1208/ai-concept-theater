/* S5-30 [트랙 C] 긴 영상은 왜 뒤로 갈수록 무너질까: 시간 일관성 */
export default {
  slug: 's5-long-video',
  track: 'C',
  title: '긴 영상은 왜 뒤로 갈수록 무너질까',
  subtitle: '시간 일관성',
  summary: '30초 영상을 한 번에 만들었더니 10초부터 색이 바래고 20초엔 얼굴이 달라졌어요. 영상 모델이 짧은 조각을 이어 붙이며 오차가 쌓이는 드리프트의 원리와, 짧게 나누고 레퍼런스를 다시 넣는 해소법을 파고들어요.',
  keywords: ['드리프트', '시간 일관성', '시간창', '자기회귀 확장', '키프레임', '레퍼런스 리셋', '장면 전환', 'Lumiere', 'StreamingT2V'],

  scenes: [
    {
      title: '한 번에 30초 만들었더니', dur: 13,
      captions: [
        { t: 0, text: '쿼카가 교실에서 발표하는 30초 영상을 <em>한 번에</em> 만들었어요.' },
        { t: 5, text: '10초부터 스웨터 색이 바래고, 20초엔 <em>얼굴</em>까지 달라졌어요.' },
        { t: 9.5, text: '고친 곳은 없는데, 왜 뒤로 갈수록 달라질까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const labels = ['0~10초', '10~20초', '20~30초'];
        labels.forEach((label, i) => {
          const img = P.h('img', { src: P.charSrc('base'), alt: '', style: `width:78%;height:78%;object-fit:contain;filter:hue-rotate(${i * 46}deg) saturate(${(1 - i * .3).toFixed(2)}) contrast(${(1 - i * .08).toFixed(2)})` });
          const frame = P.h('div', { class: 'p-box', style: `left:${330 + i * 240}px;top:110px;width:200px;height:200px;background:#fff` }, img);
          tl.at(stage.appendChild(frame), .3 + i * 1.5, { from: 'up' });
          const lab = P.text({ x: 330 + i * 240, y: 322, w: 200, text: label, size: 20, weight: 800, align: 'center', color: i === 2 ? '#F2812D' : '#1B1F24' });
          tl.at(stage.appendChild(lab.el), .3 + i * 1.5, { from: 'up' });
        });
        const chip1 = P.chip({ x: 330, y: 360, text: '스웨터 색이 바래요', color: 'gray', size: 17 });
        tl.at(stage.appendChild(chip1.el), 3.0, { from: 'pop' });
        const chip2 = P.chip({ x: 810, y: 360, text: '딴 쿼카 같아요', color: 'orange', size: 17 });
        tl.at(stage.appendChild(chip2.el), 6.0, { from: 'pop' });
        const note = P.text({ x: 330, y: 420, w: 880, text: '고친 곳은 없는데, <em>뒤로 갈수록</em> 달라졌어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9.5); } };
      }
    },
    {
      title: '조각을 이어 붙여요', dur: 14,
      captions: [
        { t: 0, text: '영상 모델은 한 번에 다룰 수 있는 <em>시간창</em>이 정해져 있어요. 짧은 조각을 이어 붙여요.' },
        { t: 5, text: '다음 조각을 만들 때 <em>앞 조각의 끝</em>을 참고해서 이어 그려요.' },
        { t: 10, text: '조각마다 작은 오차가 생기고, 이어질수록 오차가 <em>쌓여요</em>. 이걸 드리프트라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const boxes = [
          ['조각 1', '0~10초, 새로 시작'],
          ['조각 2', '10~20초, 조각 1의 끝을 참고'],
          ['조각 3', '20~30초, 조각 2의 끝을 참고']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 380 + i * 280, y: 110, w: 250, h: 130, label, sub, accent: i === 0 ? 'ink' : (i === 2 ? 'orange' : 'aqua') });
          tl.at(stage.appendChild(b.el), .3 + i * 1.4, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 630 + i * 280, y1: 175, x2: 665 + i * 280, y2: 175, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1000, y1: 250, x2: 500, y2: 260, curve: 80, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 620, y: 300, text: '앞 조각의 끝을 다음 조각의 입력으로', color: 'orange', size: 19 });
        tl.at(stage.appendChild(loopLab.el), 5.6, { from: 'pop' });
        const gen = P.text({ x: 380, y: 400, w: 800, text: '조각마다 조금씩 어긋나요. 쌓이면 <i>드리프트</i>예요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(gen.el), 10.3, { from: 'up' });
        const small = P.text({ x: 380, y: 460, w: 800, text: '편집을 거듭할 때 그림이 흐려지는 것과 같은 원리예요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.4);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * 1.4)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.6) / .9, 0, 1));
            boxes.forEach((b, i) => b.on(t > .3 + i * 1.4));
          }
        };
      }
    },
    {
      title: '연구가 말해 주는 것', dur: 13,
      captions: [
        { t: 0, text: '긴 영상을 통째로 만들려는 시도도 있어요. 2024년 연구 <em>루미에르</em>는 시간 전체를 한 번에 다루려고 해요.' },
        { t: 5, text: '조각을 이어가며 <em>기억</em>을 유지하려는 시도도 있어요. 2024년 연구 <em>스트리밍T2V</em>예요.' },
        { t: 9.5, text: '방식은 다르지만 목표는 같아요. 조각이 길어질수록 <em>원본에서 멀어지지 않게</em> 하는 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 110, w: 400, h: 140, label: '루미에르 (2024)', sub: '영상 전체를 한 번에 다루려는 시도<br>시간 축까지 함께 다뤄요', accent: 'aqua', icon: P.ICON.video });
        const b = P.box({ x: 800, y: 110, w: 400, h: 140, label: '스트리밍T2V (2024)', sub: '조각을 이어가며<br>장기 기억을 넣는 시도', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 5.2, { from: 'up' });
        const bars = [100, 78, 58, 40].map((hh, i) => {
          const bar = P.h('div', { style: `position:absolute;left:${380 + i * 70}px;top:${420 - hh * 1.2}px;width:44px;height:${hh * 1.2}px;border-radius:10px 10px 4px 4px;background:${i === 0 ? '#127E90' : '#9AA5AF'}` });
          tl.at(stage.appendChild(bar), 9.6 + i * .25, { from: 'up' });
          return bar;
        });
        const lab = P.text({ x: 380, y: 430, w: 340, text: '조각 1 → 조각 2 → 조각 3 → 조각 4', size: 16, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 9.8, { from: 'up' });
        const final = P.text({ x: 760, y: 300, w: 460, text: '조각이 길어질수록 <em>원본에서 멀어져요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 760, y: 380, w: 460, text: '막대는 원리를 보여 주는 그림이에요. 드리프트는 조각을 이어 붙인 횟수만큼 쌓여요.', size: 18, weight: 600, cls: 'muted' });
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
      title: '해소법: 짧게 나누고 레퍼런스 다시', dur: 14,
      captions: [
        { t: 0, text: '해법은 <em>짧게 나누는</em> 거예요. 5~10초 조각으로 만들어요.' },
        { t: 5, text: '조각마다 <em>정면 레퍼런스</em>를 다시 넣어서, 앞 조각의 흐트러진 부분을 그대로 잇지 않아요.' },
        { t: 9.5, text: '이어서 만들기는 두세 번까지만 쓰고, 그다음엔 <em>레퍼런스로 리셋</em>해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const a = P.box({ x: 340, y: 100, w: 260, h: 150, label: '조각 나누기', sub: '5~10초씩<br>짧게 여러 번', accent: 'aqua', icon: P.ICON.video });
        const b = P.box({ x: 640, y: 100, w: 260, h: 150, label: '레퍼런스 다시 넣기', sub: '조각마다<br>정면 이미지 새로', accent: 'ink', icon: P.ICON.doc });
        const c = P.box({ x: 940, y: 100, w: 260, h: 150, label: '리셋 시점', sub: '이어서 만들기<br>2~3번까지만', accent: '', icon: P.ICON.check });
        [a, b, c].forEach((box, i) => tl.at(stage.appendChild(box.el), .3 + i * .8, { from: 'up' }));
        const out = P.box({ x: 640, y: 330, w: 260, h: 120, label: '장면 전환은 편집에서', sub: '조각끼리 잇는 건 편집 프로그램', accent: 'orange', icon: P.ICON.desk });
        tl.at(stage.appendChild(out.el), 3.2, { from: 'pop' });
        const arrows = [
          P.arrow(lines, { x1: 470, y1: 250, x2: 700, y2: 330, curve: 20, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 770, y1: 250, x2: 770, y2: 330, width: 4, color: '#1B1F24' }),
          P.arrow(lines, { x1: 1070, y1: 250, x2: 840, y2: 330, curve: -20, width: 4, color: '#9AA5AF' })
        ];
        const x = P.chip({ x: 340, y: 480, text: '한 번에 30초 (드리프트 누적)', color: 'orange', size: 20 });
        const o = P.chip({ x: 760, y: 480, text: '조각 + 레퍼런스, 조각 + 레퍼런스', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(x.el), 5.4, { from: 'pop' });
        tl.at(stage.appendChild(o.el), 6.2, { from: 'pop' });
        const final = P.text({ x: 340, y: 540, w: 880, text: '길게 <i>한 방</i>보다 짧게 <i>여러 방</i>이 더 안정적이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.5);
            arrows.forEach((arr, i) => arr.draw(P.clamp((t - (2.4 + i * .3)) / .6, 0, 1)));
            [a, b, c].forEach((box, i) => box.on(t > .3 + i * .8));
            out.on(t > 3.2);
          }
        };
      }
    },
    {
      title: '정리: 짧게, 같은 레퍼런스로', dur: 12,
      captions: [
        { t: 0, text: '원본은 <em>레퍼런스</em>로 따로 챙겨 둬요. 조각마다 다시 꺼내 써요.' },
        { t: 4.5, text: '이어서 만들기는 두세 번까지만 쓰고, 그다음엔 <em>레퍼런스로 리셋</em>해요.' },
        { t: 8.5, text: '장면이 바뀌는 부분은 AI가 아니라 <em>편집 프로그램</em>에서 붙여요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 5~10초로 나누기', '조각마다 새로 시작'],
          ['② 레퍼런스 다시 넣기', '조각마다 정면 이미지'],
          ['③ 리셋은 두세 번마다', '그 이상은 흐트러져요'],
          ['④ 장면 전환은 편집', '이어붙이지 않기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '긴 영상은 <em>긴 한 방</em>이 아니라 <em>짧은 여러 방</em>이에요.', size: 27, weight: 800 });
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
    title: '드리프트 누적 시뮬레이터',
    desc: '왼쪽은 <b>이어붙이기만</b> 하는 사슬(조각마다 앞 조각을 그대로 참고), 오른쪽은 <b>레퍼런스 리셋</b>을 켠 방식이에요. 시간 슬라이더를 올리면 두 쪽 다 시간이 지나요. "레퍼런스 리셋 켜기"를 누르면 오른쪽은 10초마다 원본으로 돌아가 드리프트가 작게 유지돼요. 실제 도구의 드리프트 정도는 이보다 크거나 작을 수 있어요.',
    mount(el, P) {
      let t = 0, resetOn = false;
      const SRC = P.charSrc('base');
      const mk = title => {
        const img = P.h('img', { src: SRC, alt: title, draggable: 'false' });
        const frame = P.h('div', { class: 'sim-frame' }, img);
        const meter = P.h('div', { class: 'sim-meter' }, P.h('i', {}));
        const val = P.h('div', { class: 'sim-val' }, '');
        const card = P.h('div', { class: 'sim-card' }, P.h('div', { class: 'sim-card-h' }, title), frame, P.h('div', { class: 'sim-lab' }, '일치도'), meter, val);
        return { card, img, meter, val };
      };
      const chain = mk('이어붙이기만 (조각마다 앞 조각 참고)');
      const fresh = mk('레퍼런스 리셋 (10초마다 원본으로)');
      const toggle = P.h('button', { class: 'btn primary', type: 'button' }, '레퍼런스 리셋 켜기');
      const rewind = P.h('button', { class: 'btn', type: 'button' }, '처음으로');
      const range = P.h('input', { type: 'range', id: 'sim-t', min: '0', max: '30', step: '1', value: '0' });
      const rangeLab = P.h('label', { for: 'sim-t', class: 'sim-rl' }, '재생 위치(초) ', P.h('b', {}, '0'));
      const bar = P.h('div', { class: 'sim-bar' }, toggle, rewind, rangeLab, range);
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
        rangeLab.querySelector('b').textContent = String(t);
        range.value = String(t);
        toggle.textContent = resetOn ? '레퍼런스 리셋 끄기' : '레퍼런스 리셋 켜기';
        /* 이어붙이기만: 시간이 지날수록 흐림·채도 저하·색 틀어짐이 누적 */
        const blurC = (t * .09).toFixed(2), satC = Math.max(.32, 1 - t * .024).toFixed(2), hueC = (t * 3.4).toFixed(1), conC = Math.max(.65, 1 - t * .012).toFixed(2);
        chain.img.style.filter = `blur(${blurC}px) saturate(${satC}) hue-rotate(${hueC}deg) contrast(${conC})`;
        const matchC = Math.max(6, Math.round(100 - t * 3.1));
        chain.meter.firstChild.style.width = matchC + '%'; chain.val.textContent = `${matchC}% 일치 · ${t}초 누적`;
        /* 레퍼런스 리셋: 켜면 10초마다 원본으로 돌아가 유효 경과 시간이 짧아짐 */
        const te = resetOn ? (t % 10) : t;
        const blurR = (te * .09).toFixed(2), satR = Math.max(.32, 1 - te * .024).toFixed(2), hueR = (te * 3.4).toFixed(1), conR = Math.max(.65, 1 - te * .012).toFixed(2);
        fresh.img.style.filter = `blur(${blurR}px) saturate(${satR}) hue-rotate(${hueR}deg) contrast(${conR})`;
        const matchR = Math.max(6, Math.round(100 - te * 3.1));
        fresh.meter.firstChild.style.width = matchR + '%';
        fresh.val.textContent = resetOn ? `${matchR}% 일치 · 리셋 적용 중` : `${matchR}% 일치 · 리셋 꺼짐(왼쪽과 동일)`;
      }
      toggle.addEventListener('click', () => { resetOn = !resetOn; render(); });
      rewind.addEventListener('click', () => { t = 0; render(); });
      range.addEventListener('input', () => { t = +range.value; render(); });
      render();
    }
  },

  teacherLines: [
    '영상 AI는 <b>짧은 조각</b>을 이어 붙여 긴 영상을 만들어요. 그래서 뒤로 갈수록 조금씩 달라져요.',
    '긴 영상은 <b>짧게 여러 번</b> 만들고, 조각마다 같은 레퍼런스를 넣어요.'
  ],
  tip: {
    body: '학급 영상은 <b>5~10초 조각</b>으로 여러 번 만들고 편집 프로그램에서 이어 붙이세요. 조각마다 <b>정면 레퍼런스</b>를 다시 넣어요.',
    extra: '"이어서 생성" 기능은 두세 번까지만 쓰고, 그다음엔 레퍼런스로 리셋하세요. "이어서 생성"은 마지막 프레임을 다음 조각의 조건 이미지로 넣는 자기회귀 확장이라 오차가 그대로 넘어가요.'
  },
  myth: {
    myth: '최대 길이까지 한 번에 뽑는 게 제일 자연스럽다.',
    fact: '뒤로 갈수록 <b>드리프트</b>가 쌓여요. 짧은 조각으로 나누고 같은 레퍼런스를 다시 넣는 편이 더 안정적이에요.'
  },
  sources: [
    { title: 'Lumiere: A Space-Time Diffusion Model for Video Generation (arXiv, 2024)', url: 'https://arxiv.org/abs/2401.12945', note: '영상의 시공간 전체를 한 번에 다루려는 생성 모델 연구.' },
    { title: 'StreamingT2V: Consistent, Dynamic, and Extendable Long Video Generation from Text (arXiv, 2024)', url: 'https://arxiv.org/abs/2403.14773', note: '조각을 이어가며 장기 기억을 넣어 긴 영상을 만드는 방식 연구.' },
    { title: 'FreeNoise: Tuning-Free Longer Video Diffusion via Noise Rescheduling (arXiv, 2023)', url: 'https://arxiv.org/abs/2310.15169', note: '잡음 스케줄을 바꾸어 튜닝 없이 긴 영상을 이어 붙이는 방식 연구.' },
    { title: 'Video generation models as world simulators (OpenAI, 2024)', url: 'https://openai.com/index/video-generation-models-as-world-simulators/', note: '영상 생성 모델이 시공간을 패치 단위로 다룬다는 기술 보고서.' }
  ],
  script: `쿼카가 교실에서 발표하는 30초 영상을 한 번에 만들었는데, 10초부터 스웨터 색이 바래고 20초엔 얼굴까지 달라진 적 있으시죠. 고친 곳은 없는데 왜 뒤로 갈수록 달라질까요.

영상 모델은 한 번에 다룰 수 있는 시간창이 정해져 있어서 짧은 조각을 이어 붙여 영상을 만들어요. 다음 조각을 만들 때 앞 조각의 끝을 참고하는데, 조각마다 작은 오차가 생기고 쌓이면 드리프트가 돼요. 그림을 여러 번 편집할 때 손실이 쌓이는 것과 같은 원리예요. 영상 전체를 한 번에 다루거나 기억을 유지하며 이어 붙이는 연구도 2024년에 나왔지만, 조각이 길어질수록 원본에서 멀어진다는 점은 같아요.

해법은 짧게 나누는 거예요. 5~10초 조각으로 만들고 조각마다 정면 레퍼런스를 다시 넣어요. 이어서 만들기는 두세 번까지만 쓰고 그다음엔 레퍼런스로 리셋해요. 장면 전환은 편집 프로그램에서 붙이세요.`
};
