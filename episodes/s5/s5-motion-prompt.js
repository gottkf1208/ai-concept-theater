/* S5-2 [트랙 C] 움직임은 글로 어떻게 쓸까: 모션 프롬프트의 여섯 축 */
export default {
  slug: 's5-motion-prompt',
  track: 'C',
  title: '움직임은 글로 어떻게 쓸까',
  subtitle: '모션 프롬프트의 여섯 축',
  summary: '"쿼카가 교실에 서 있다"로 영상을 만들었더니 거의 안 움직였어요. 영상 모델이 프레임을 시간 축으로 묶어 배우는 원리와, 움직임을 문장으로 채우는 여섯 축을 파고들어요.',
  keywords: ['모션 프롬프트', '시공간 패치', '시간 축', '카메라 무빙', '여섯 축', 'Make-A-Video', 'dolly in'],

  scenes: [
    {
      title: '거의 안 움직였어요', dur: 13,
      captions: [
        { t: 0, text: '"쿼카가 교실에 서 있다"로 5초 영상을 만들어 봤어요.' },
        { t: 5, text: '그런데 거의 안 움직이거나 카메라만 살짝 흔들렸어요.' },
        { t: 9.5, text: '뭘 어떻게 움직이라는 <em>말이 없었기</em> 때문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const prompt = P.box({ x: 340, y: 110, w: 600, h: 110, label: '입력 프롬프트', sub: '"쿼카가 교실에 서 있다"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(prompt.el), .3, { from: 'up' });
        const down = P.arrow(lines, { x1: 640, y1: 220, x2: 640, y2: 268, width: 4, color: '#1B1F24' });
        const frames = ['0.0s', '2.5s', '5.0s'].map((label, i) => {
          const b = P.box({ x: 340 + i * 220, y: 270, w: 190, h: 160, label, sub: '같은 자세', accent: i === 2 ? 'orange' : '' });
          tl.at(stage.appendChild(b.el), 1.6 + i * .8, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 340, y: 452, text: '카메라만 살짝 흔들렸어요', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chip.el), 4.6, { from: 'pop' });
        const final = P.text({ x: 340, y: 500, w: 880, text: '뭘 어떻게 움직이라는 말이 없었기 때문이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            down.draw(P.clamp((t - .9) / .5, 0, 1));
            frames.forEach((b, i) => b.on(t > 1.6 + i * .8));
          }
        };
      }
    },
    {
      title: '프레임을 시공간 조각으로', dur: 13,
      captions: [
        { t: 0, text: '영상 모델은 프레임 여러 장을 한 번에 묶어서 <em>시공간 조각</em>으로 잘라요.' },
        { t: 5, text: '조각들 사이의 관계, 즉 <em>시간 축</em>을 배워서 다음 장면을 예측해요.' },
        { t: 9, text: '문장에 움직임이 없으면 학습 데이터에서 <em>가장 흔한 움직임</em>을 골라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const frames = ['프레임 1', '프레임 2', '프레임 3'].map((label, i) => {
          const b = P.box({ x: 340 + i * 220, y: 100, w: 190, h: 120, label, sub: '입력 영상 조각', accent: 'ink' });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const merge = [0, 1, 2].map(i => P.arrow(lines, { x1: 340 + i * 220 + 95, y1: 220, x2: 660, y2: 278, width: 3, color: '#1B1F24' }));
        const chunk = P.box({ x: 380, y: 280, w: 560, h: 110, label: '시공간 조각', sub: '조각들을 함께 잘라서 봐요', accent: 'aqua' });
        tl.at(stage.appendChild(chunk.el), 2.2, { from: 'up' });
        const across = P.arrow(lines, { x1: 940, y1: 335, x2: 978, y2: 335, width: 4, color: '#F2812D' });
        const axis = P.box({ x: 980, y: 280, w: 260, h: 110, label: '시간 축', sub: '조각 사이의 순서·관계', accent: 'orange' });
        tl.at(stage.appendChild(axis.el), 4, { from: 'up' });
        const final = P.text({ x: 340, y: 430, w: 880, text: '텍스트에 움직임이 없으면 흔한 움직임을 골라요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.7, { from: 'up' });
        const small = P.text({ x: 340, y: 490, w: 880, text: '조각으로 나누는 정확한 방식은 모델마다 달라요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            merge.forEach(a => a.draw(P.clamp((t - 1.7) / .6, 0, 1)));
            chunk.on(t > 2.2);
            across.draw(P.clamp((t - 3.5) / .5, 0, 1));
            axis.on(t > 4);
          }
        };
      }
    },
    {
      title: '연구가 말해 주는 것', dur: 13,
      captions: [
        { t: 0, text: '이런 원리는 텍스트-영상 확산 모델 연구에서 나와요. <em>2022년 연구</em> Make-A-Video는 텍스트 없는 영상으로도 움직임을 배웠어요.' },
        { t: 5, text: '2023년 Stable Video Diffusion과 2024년 OpenAI 기술 보고서는 프레임을 <em>시공간 패치</em>로 다룬다고 설명해요.' },
        { t: 9.5, text: '방식은 달라도 원리는 같아요. <em>문장으로 정하지 않으면</em> 흔한 움직임을 골라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const a = P.box({ x: 300, y: 100, w: 280, h: 150, label: 'Make-A-Video (2022년 연구)', sub: '이미지-텍스트 쌍 + 텍스트 없는<br>영상으로 움직임을 배워요', accent: 'aqua', icon: P.ICON.doc });
        const b = P.box({ x: 600, y: 100, w: 280, h: 150, label: 'Stable Video Diffusion (2023)', sub: '대규모 영상으로 확산 모델을<br>학습시켜 움직임을 만들어요', accent: 'ink', icon: P.ICON.doc });
        const c = P.box({ x: 900, y: 100, w: 280, h: 150, label: 'OpenAI 기술 보고서 (2024)', sub: '영상을 시공간 패치로<br>잘라서 학습해요', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 4.8, { from: 'up' });
        tl.at(stage.appendChild(c.el), 5.2, { from: 'up' });
        const final = P.text({ x: 300, y: 300, w: 880, text: '방식은 달라도 원리는 같아요. 문장으로 정하지 않으면 <em>흔한 움직임</em>을 골라요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 300, y: 360, w: 880, text: '조각으로 나누는 방식과 학습 데이터는 도구마다 달라요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || (t > 5.2 && t < 9.4));
            a.on(t > .3); b.on(t > 4.8); c.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '움직임의 여섯 축', dur: 15,
      captions: [
        { t: 0, text: '움직임을 정할 때는 <em>여섯 축</em>을 채워요. 주체의 동작과 카메라 무빙부터예요.' },
        { t: 5, text: '속도·리듬, 시작→끝 상태, 길이·루프 여부, 고정할 것까지 넣어요.' },
        { t: 10, text: '"교실에 서 있다"가 여섯 축을 채우면 이렇게 바뀌어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['① 주체의 동작', '걷는다, 돌아본다'],
          ['② 카메라 무빙', 'dolly in, pan, orbit, tilt'],
          ['③ 속도·리듬', '천천히, 일정하게, ease'],
          ['④ 시작→끝 상태', '처음 모습 → 마지막 모습'],
          ['⑤ 길이·루프 여부', '몇 초, 반복 여부'],
          ['⑥ 고정할 것', '배경 고정, 얼굴 유지']
        ].map(([label, sub], i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const b = P.box({ x: 380 + col * 300, y: 95 + row * 130, w: 280, h: 100, label, sub, accent: i === 5 ? 'orange' : '' });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const before = P.text({ x: 340, y: 370, w: 900, text: '전: "쿼카가 교실에 서 있다"', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(before.el), 10.2, { from: 'up' });
        const after = P.text({ x: 340, y: 415, w: 900, text: '후: "칠판을 향해 천천히 걸어가고, 카메라는 낮은 각도에서 뒤따라가며(<i>dolly in</i>), 5초, 배경은 고정, 마지막에 뒤돌아 웃는다"', size: 22, weight: 800 });
        tl.at(stage.appendChild(after.el), 11, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            items.forEach((b, i) => b.on(t > .3 + i * .5));
          }
        };
      }
    },
    {
      title: '정리: 움직임도 문장으로', dur: 12,
      captions: [
        { t: 0, text: '움직임 한 문장 없이는 <em>정지 사진</em>과 같아요.' },
        { t: 4.5, text: '여섯 축을 채웠는데 안 되면 도구 탓이 아니라 <em>문장 탓</em>일 때가 많아요.' },
        { t: 8.5, text: '카메라 용어는 도구마다 지원 범위가 <em>달라요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 움직임을 문장으로', '동작 + 카메라 + 속도까지 적기'],
          ['② 시작 → 끝 상태', '처음 모습과 마지막 모습을 적기'],
          ['③ 길이·고정 정하기', '몇 초인지, 무엇을 고정할지'],
          ['④ 안 되면 문장부터', '도구 탓이 아니라 문장 탓일 때가 많아요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '움직임은 사진 프롬프트에 <em>한 문장</em>을 더하는 거예요. 안 움직이는 게 목표면 그것도 <i>문장으로</i> 적어요.', size: 27, weight: 800 });
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
    title: '모션 프롬프트 조립기',
    desc: '여섯 축을 하나씩 골라 보세요. 고른 값이 <b>문장으로 조립</b>되고, 오른쪽 미리보기에서 쿼카가 그 선택대로 움직여요. <b>예시로 채우기</b>를 누르면 여섯 축이 한 번에 채워져요. 미리보기는 원리를 보여 주는 그림일 뿐, 실제 영상과는 달라요.',
    mount(el, P) {
      const AXES = [
        { id: 'act', label: '① 주체의 동작', options: ['가만히 서 있어요', '천천히 걸어가요', '뒤돌아봐요'] },
        { id: 'cam', label: '② 카메라 무빙', options: ['가만히 고정돼 있어요', '천천히 다가가요(dolly in)', '좌우로 돌아요(pan)'] },
        { id: 'spd', label: '③ 속도·리듬', options: ['천천히', '일정한 속도로', '점점 빠르게(ease)'] },
        { id: 'arc', label: '④ 시작 → 끝 상태', options: ['처음 모습 그대로예요', '서 있다가 뒤돌아 웃어요', '걷다가 멈춰 서요'] },
        { id: 'len', label: '⑤ 길이·루프 여부', options: ['3초, 한 번이에요', '5초, 한 번이에요', '4초, 반복(루프)돼요'] },
        { id: 'fix', label: '⑥ 고정할 것', options: ['배경을 고정해요', '얼굴을 유지해요', '배경과 얼굴을 모두 유지해요'] }
      ];
      const EXAMPLE = { act: '1', cam: '1', spd: '0', arc: '1', len: '1', fix: '2' };
      const selects = {};
      const axisEls = AXES.map(ax => {
        const sel = P.h('select', { id: `sim-${ax.id}`, 'aria-label': ax.label },
          ...ax.options.map((t, i) => P.h('option', { value: String(i) }, t)));
        selects[ax.id] = sel;
        const lab = P.h('label', { for: `sim-${ax.id}` }, ax.label);
        return P.h('div', { class: 'sim-axis' }, lab, sel);
      });
      const fillBtn = P.h('button', { class: 'btn primary', type: 'button' }, '예시로 채우기');
      const sentence = P.h('div', { class: 'sim-sentence' }, '');
      const actor = P.h('img', { class: 'sim-actor', src: P.charSrc('base'), alt: '', draggable: 'false' });
      const frame = P.h('div', { class: 'sim-frame' }, actor);
      const stageBox = P.h('div', { class: 'sim-stage' }, frame);
      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-axes' }, ...axisEls),
        P.h('div', { class: 'sim-bar' }, fillBtn),
        P.h('div', { class: 'sim-preview' }, sentence, stageBox)
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-axes{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;max-width:100%}
        .sim-axis{display:flex;flex-direction:column;gap:4px;min-width:0}
        .sim-axis label{font-size:13px;color:var(--muted);word-break:keep-all}
        .sim-axis select{width:100%;max-width:100%;font-size:14px;padding:6px;border-radius:8px;border:1px solid var(--line);background:#fff}
        .sim-bar{display:flex;gap:10px;flex-wrap:wrap}
        .sim-preview{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}
        .sim-sentence{flex:1 1 220px;min-width:0;font-size:16px;line-height:1.6;background:var(--paper);border-radius:12px;padding:14px;word-break:keep-all}
        .sim-stage{flex:0 0 auto;width:180px;height:180px;border-radius:14px;background:var(--paper);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .sim-frame{width:88%;height:88%;display:flex;align-items:center;justify-content:center;transition:transform .3s}
        .sim-actor{height:70%;display:block;transition:transform .3s}
      ` }));
      function speed(v) {
        return v === '0' ? { dur: 1.6, ease: 'ease' } : v === '1' ? { dur: .9, ease: 'linear' } : { dur: .6, ease: 'ease-in' };
      }
      function render() {
        const v = {}; AXES.forEach(ax => { v[ax.id] = selects[ax.id].value; });
        const text = (ax) => AXES.find(a => a.id === ax).options[+v[ax]];
        sentence.textContent = `쿼카가 ${text('act')}. 카메라는 ${text('cam')}. 속도는 ${text('spd')}. ${text('arc')}. 길이는 ${text('len')}. ${text('fix')}.`;
        const sp = speed(v.spd);
        const actX = v.act === '1' ? 34 : 0;
        const actFlip = v.act === '2' ? -1 : 1;
        const camScale = v.cam === '1' ? 1.18 : 1;
        const camX = v.cam === '2' ? 20 : 0;
        actor.style.transition = `transform ${sp.dur}s ${sp.ease}`;
        actor.style.transform = `translateX(${actX}px) scaleX(${actFlip})`;
        frame.style.transition = `transform ${sp.dur}s ${sp.ease}`;
        frame.style.transform = `scale(${camScale}) translateX(${camX}px)`;
      }
      AXES.forEach(ax => selects[ax.id].addEventListener('change', render));
      fillBtn.addEventListener('click', () => {
        AXES.forEach(ax => { selects[ax.id].value = EXAMPLE[ax.id]; });
        render();
      });
      render();
    }
  },

  teacherLines: [
    '영상 AI에게는 <b>무엇이 어떻게 움직이는지</b>를 꼭 말해 줘요. 안 말하면 가만히 있거나 카메라만 흔들려요.',
    '사진 프롬프트에 <b>움직임 한 문장</b>을 더하면 영상 프롬프트가 돼요.'
  ],
  tip: {
    body: '학급 영상은 <b>주체 동작 + 카메라 + 길이</b> 세 가지만 채워도 훨씬 나아져요. 카메라 용어는 영어를 함께 적어요(dolly in, pan).',
    extra: '안 움직이는 게 목표면 그것도 문장으로 적어야 해요. "카메라 고정, 배경 고정"처럼요. 지원하는 카메라 용어는 도구마다 달라요.'
  },
  myth: {
    myth: '이미지 프롬프트를 그대로 넣으면 영상도 잘 나온다.',
    fact: '이미지 프롬프트에는 <b>시간</b>이 없어요. 무엇이 어떻게 움직이는지, 카메라는 어떻게 움직이는지, 길이는 얼마인지를 더해야 해요.'
  },
  sources: [
    { title: 'Make-A-Video: Text-to-Video Generation without Text-Video Data (arXiv, 2022)', url: 'https://arxiv.org/abs/2209.14792', note: '이미지-텍스트 쌍과 텍스트 없는 영상으로 움직임을 배우는 방식을 제안한 연구예요.' },
    { title: 'Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets (arXiv, 2023)', url: 'https://arxiv.org/abs/2311.15127', note: '대규모 영상 데이터로 확산 모델을 학습시켜 움직임을 만드는 구조를 설명해요.' },
    { title: 'Video generation models as world simulators (OpenAI, 2024)', url: 'https://openai.com/index/video-generation-models-as-world-simulators/', note: '영상을 시공간 패치로 잘라 학습한다는 점을 설명한 기술 보고서예요.' },
    { title: 'Imagen Video: High Definition Video Generation with Diffusion Models (arXiv, 2022)', url: 'https://arxiv.org/abs/2210.02303', note: '고해상도 영상을 만드는 확산 모델 구조를 다룬 연구예요.' }
  ],
  script: `"쿼카가 교실에 서 있다"라고만 하고 5초 영상을 만들면 거의 안 움직이거나 카메라만 흔들리는 경우가 많아요. 뭘 어떻게 움직이라는 말이 없었기 때문이에요.

영상 모델은 프레임 여러 장을 시공간 조각으로 묶어 자르고, 조각들 사이의 시간 축 관계를 배워요. 문장에 움직임이 없으면 가장 흔한 움직임을 골라요. 2022년 연구 Make-A-Video, 2023년 Stable Video Diffusion, 2024년 OpenAI 기술 보고서도 이런 처리 방식을 다뤄요.

그래서 움직임은 여섯 축으로 적어요. 동작, 카메라 무빙, 속도·리듬, 시작→끝 상태, 길이·루프 여부, 고정할 것까지요. "교실에 서 있다"를 "칠판을 향해 걸어가고, 카메라는 뒤따라가며(dolly in), 5초, 배경은 고정, 마지막에 뒤돌아 웃는다"로 바꾸면 훨씬 잘 움직여요. 안 되면 문장부터 점검해요.`
};
