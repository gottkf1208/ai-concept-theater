/* S2-13 움직임은 글로 어떻게 쓸까: 모션 프롬프트의 여섯 축과 소리 한 줄 */
export default {
  slug: 'v2-motion-prompt',
  track: 'S2',
  title: '움직임은 글로 어떻게 쓸까',
  subtitle: '모션 프롬프트의 여섯 축과 소리 한 줄',
  summary: '"쿼카가 교실에 서 있다"로 영상을 만들었더니 거의 안 움직였어요. 영상 모델이 프레임을 시공간 조각으로 묶어 배우는 원리와 움직임을 채우는 여섯 축을 짚고, 2026년 영상 모델이 대사·효과음까지 한 번에 만들면서 필요해진 "소리 한 줄"과 멀티샷 쓰는 법도 다뤄요.',
  keywords: ['모션 프롬프트', '시공간 패치', '시간 축', '카메라 무빙', '여섯 축', '네이티브 오디오', '대사', '효과음', '멀티샷', 'dolly in'],

  scenes: [
    {
      title: '거의 안 움직였어요', dur: 13,
      captions: [
        { t: 0, text: '"쿼카가 교실에 서 있다"로 5초 영상을 만들어 봤어요.' },
        { t: 5, text: '그런데 거의 안 움직이고, 소리도 엉뚱하게 나왔어요.' },
        { t: 9.5, text: '뭘 어떻게 움직이고, 무슨 소리가 나는지 <em>말이 없었기</em> 때문이에요.' }
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
        const chip1 = P.chip({ x: 340, y: 452, text: '카메라만 살짝 흔들렸어요', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chip1.el), 4.6, { from: 'pop' });
        const chip2 = P.chip({ x: 340, y: 490, text: '소리도 엉뚱했어요(교실인데 바람 소리)', color: 'gray', size: 18 });
        tl.at(stage.appendChild(chip2.el), 5.3, { from: 'pop' });
        const final = P.text({ x: 340, y: 535, w: 900, text: '뭘 어떻게 움직이고, 무슨 소리가 나는지 말이 없었기 때문이에요.', size: 27, weight: 800 });
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
      title: '프레임도 소리도 조각으로', dur: 13,
      captions: [
        { t: 0, text: '영상 모델은 프레임 묶음을 <em>시공간 조각</em>으로 잘라 시간 축 관계를 배워요.' },
        { t: 5, text: '2026년 모델은 <em>소리 조각</em>도 함께 만들어요. 영상과 소리를 서로 맞춰 가며 같이 다듬어요.' },
        { t: 9, text: '글에 움직임과 소리가 없으면 가장 흔한 쪽을 골라요.' }
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
        const down = P.arrow(lines, { x1: 620, y1: 390, x2: 620, y2: 420, width: 3, color: '#1B1F24' });
        const up = P.arrow(lines, { x1: 700, y1: 420, x2: 700, y2: 390, width: 3, color: '#F2812D' });
        const sound = P.box({ x: 380, y: 420, w: 560, h: 100, label: '소리 조각', sub: '대사·효과음·배경음을 함께 잘라요', accent: 'orange' });
        tl.at(stage.appendChild(sound.el), 5.6, { from: 'up' });
        const final = P.text({ x: 340, y: 560, w: 900, text: '글에 움직임과 소리가 없으면 가장 흔한 쪽을 골라요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.7, { from: 'up' });
        const small = P.text({ x: 340, y: 615, w: 900, text: '2026년 모델은 소리 조각과 시공간 조각을 같은 잡음 제거 과정에서 함께 다듬어요.', size: 17, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            merge.forEach(a => a.draw(P.clamp((t - 1.7) / .6, 0, 1)));
            chunk.on(t > 2.2);
            across.draw(P.clamp((t - 3.5) / .5, 0, 1));
            axis.on(t > 4);
            sound.on(t > 5.6);
            down.draw(P.clamp((t - 5) / .5, 0, 1));
            up.draw(P.clamp((t - 5) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '연구가 말해 주는 것', dur: 13,
      captions: [
        { t: 0, text: '이런 원리는 영상 생성 모델 연구에서 나와요. <em>2022년 연구</em> Make-A-Video는 텍스트 없는 영상으로도 움직임을 배웠어요.' },
        { t: 5, text: '2023년 연구는 <em>이미지 모델에 시간 층</em>을 끼워 넣어 학습했고, 2026년 모델은 영상과 소리를 <em>함께</em> 만들어요.' },
        { t: 9.5, text: '그런데 2026년 평가 연구는 19개 모델 모두 <em>여러 샷 연출과 소리 맞춤</em>은 아직 약하다고 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const a = P.box({ x: 300, y: 100, w: 280, h: 150, label: 'Make-A-Video (2022년 연구)', sub: '이미지-텍스트 쌍 + 텍스트 없는<br>영상으로 움직임을 배워요', accent: 'aqua', icon: P.ICON.doc });
        const b = P.box({ x: 600, y: 100, w: 280, h: 150, label: 'Stable Video Diffusion (2023)', sub: '사전학습된 이미지 모델에<br>시간 층을 끼워 넣어 학습해요', accent: 'ink', icon: P.ICON.doc });
        const c = P.box({ x: 900, y: 100, w: 280, h: 150, label: '2026년 영상 모델', sub: '영상과 소리를 함께 만들어요<br>(네이티브 오디오)', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 4.8, { from: 'up' });
        tl.at(stage.appendChild(c.el), 5.2, { from: 'up' });
        const final = P.text({ x: 300, y: 300, w: 880, text: '그런데 <em>여러 샷 연출</em>과 <em>소리-영상 맞춤</em>은 19개 모델 모두 아직 약했어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 300, y: 360, w: 880, text: '2026년 MSAVBench 평가 결과예요.', size: 18, weight: 600, cls: 'muted' });
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
      title: '움직임의 여섯 축 + 소리 한 줄', dur: 15,
      captions: [
        { t: 0, text: '움직임을 정할 때는 <em>여섯 축</em>을 채워요. 주체의 동작과 카메라 무빙부터예요.' },
        { t: 5, text: '속도·리듬, 시작→끝 상태, 길이·루프 여부, 고정할 것까지 넣어요.' },
        { t: 10, text: '"교실에 서 있다"에 여섯 축을 채우면 이렇게 바뀌어요.' }
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
        const sound = P.box({ x: 380, y: 345, w: 880, h: 80, label: '⑦ 소리', sub: '대사는 "따옴표"로, 효과음은 구체적인 소리로, 배경은 공간 묘사로', accent: 'aqua' });
        tl.at(stage.appendChild(sound.el), 3.2, { from: 'up' });
        const before = P.text({ x: 340, y: 455, w: 900, text: '전: "쿼카가 교실에 서 있다"', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(before.el), 10.2, { from: 'up' });
        const after = P.text({ x: 340, y: 495, w: 900, text: '후: "칠판을 향해 천천히 걸어가고, 카메라는 낮은 각도에서 뒤따라가며(<i>dolly in</i>), 5초, 배경은 고정, 마지막에 뒤돌아 웃으며 “안녕, 얘들아!”라고 말한다. 분필 소리와 조용한 교실 소음."', size: 20, weight: 800 });
        tl.at(stage.appendChild(after.el), 11, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            items.forEach((b, i) => b.on(t > .3 + i * .5));
            sound.on(t > 3.2);
          }
        };
      }
    },
    {
      title: '샷마다, 소리까지 문장으로', dur: 13,
      captions: [
        { t: 0, text: '움직임 한 문장 없이는 <em>정지 사진</em>과 같아요.' },
        { t: 4.5, text: '여러 샷을 한 번에 만들 땐 <em>샷 1, 샷 2</em>로 나눠 샷마다 여섯 축을 채워요.' },
        { t: 8.5, text: '카메라 용어는 공식 가이드도 예로 드는 <em>영어 촬영 용어</em>(dolly, pan, aerial view)를 함께 써요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 움직임을 문장으로', '동작 + 카메라 + 속도까지 적기'],
          ['② 소리도 문장으로', '대사는 "따옴표"로 적기'],
          ['③ 여러 샷이면', '샷마다 나눠 쓰기'],
          ['④ 안 되면 문장부터', '도구 탓이 아니라 문장 탓일 때가 많아요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 1 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '움직임과 소리는 사진 프롬프트에 <em>문장 두어 줄</em>만 더하면 돼요. 샷이 여러 개면 샷마다 나눠 적어요.', size: 26, weight: 800 });
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
    title: '모션·소리 프롬프트 조립기',
    desc: '여덟 축(움직임 여섯 개 + 소리 + 샷 수)을 하나씩 골라 보세요. 고른 값이 <b>문장으로 조립</b>되고, 미리보기에서 쿼카가 그 선택대로 움직여요. 샷을 <b>두 샷</b>으로 늘리면 문장과 미리보기가 샷 1·샷 2로 나뉘어요. <b>예시로 채우기</b>를 누르면 여덟 칸이 한 번에 채워져요. 미리보기는 원리를 보여 주는 그림일 뿐, 실제 영상 품질과는 달라요.',
    mount(el, P) {
      const AXES = [
        { id: 'act', label: '① 주체의 동작', options: ['가만히 서 있어요', '천천히 걸어가요', '뒤돌아봐요'] },
        { id: 'cam', label: '② 카메라 무빙', options: ['가만히 고정돼 있어요', '천천히 다가가요(dolly in)', '좌우로 돌아요(pan)'] },
        { id: 'spd', label: '③ 속도·리듬', options: ['천천히', '일정한 속도로', '점점 빠르게(ease)'] },
        { id: 'arc', label: '④ 시작 → 끝 상태', options: ['처음 모습 그대로예요', '서 있다가 뒤돌아 웃어요', '걷다가 멈춰 서요'] },
        { id: 'len', label: '⑤ 길이·루프 여부', options: ['3초, 한 번이에요', '5초, 한 번이에요', '4초, 반복(루프)돼요'] },
        { id: 'fix', label: '⑥ 고정할 것', options: ['배경을 고정해요', '얼굴을 유지해요', '배경과 얼굴을 모두 유지해요'] },
        { id: 'snd', label: '⑦ 소리', options: ['소리 지시 없음', '대사 "안녕, 얘들아!"', '발소리와 조용한 교실 소음'] },
        { id: 'shots', label: '⑧ 샷 수', options: ['한 샷', '두 샷'] }
      ];
      const EXAMPLE = { act: '1', cam: '1', spd: '0', arc: '1', len: '1', fix: '2', snd: '1', shots: '1' };
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

      const actor1 = P.h('img', { class: 'sim-actor', src: P.charSrc('base'), alt: '', draggable: 'false' });
      const frame1 = P.h('div', { class: 'sim-frame' }, actor1);
      const stage1 = P.h('div', { class: 'sim-stage' }, frame1);
      const shot1Label = P.h('div', { class: 'sim-shot-label' }, '샷 1');
      const previewBox1 = P.h('div', { class: 'sim-preview-box' }, shot1Label, stage1);

      const actor2 = P.h('img', { class: 'sim-actor sim-actor-flip', src: P.charSrc('base'), alt: '', draggable: 'false' });
      const frame2 = P.h('div', { class: 'sim-frame' }, actor2);
      const stage2 = P.h('div', { class: 'sim-stage' }, frame2);
      const shot2Label = P.h('div', { class: 'sim-shot-label' }, '샷 2');
      const previewBox2 = P.h('div', { class: 'sim-preview-box' }, shot2Label, stage2);

      const soundBits = [0, 1, 2, 3, 4].map(() => P.h('span', { class: 'sim-sound-bit' }));
      const soundBar = P.h('div', { class: 'sim-sound-bar' }, ...soundBits);
      const previewRow = P.h('div', { class: 'sim-preview-row' }, previewBox1, previewBox2);

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-axes' }, ...axisEls),
        P.h('div', { class: 'sim-bar' }, fillBtn),
        P.h('div', { class: 'sim-preview' }, sentence, previewRow, soundBar)
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-axes{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;max-width:100%}
        .sim-axis{display:flex;flex-direction:column;gap:4px;min-width:0}
        .sim-axis label{font-size:13px;color:var(--muted);word-break:keep-all}
        .sim-axis select{width:100%;max-width:100%;font-size:14px;padding:6px;border-radius:8px;border:1px solid var(--line);background:#fff}
        .sim-bar{display:flex;gap:10px;flex-wrap:wrap}
        .sim-preview{display:flex;flex-direction:column;gap:10px;max-width:100%}
        .sim-sentence{min-width:0;font-size:16px;line-height:1.6;background:var(--paper);border-radius:12px;padding:14px;word-break:keep-all}
        .sim-preview-row{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}
        .sim-preview-box{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto}
        .sim-shot-label{font-size:13px;color:var(--muted);font-weight:700}
        .sim-stage{flex:0 0 auto;width:150px;height:150px;border-radius:14px;background:var(--paper);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .sim-frame{width:88%;height:88%;display:flex;align-items:center;justify-content:center;transition:transform .3s}
        .sim-actor{height:70%;display:block;transition:transform .3s}
        .sim-actor-flip{transform:scaleX(-1)}
        .sim-sound-bar{display:flex;gap:6px;align-items:flex-end;height:54px}
        .sim-sound-bit{display:block;width:14px;border-radius:4px 4px 0 0;background:#127E90;transition:height .25s}
      ` }));
      function speed(v) {
        return v === '0' ? { dur: 1.6, ease: 'ease' } : v === '1' ? { dur: .9, ease: 'linear' } : { dur: .6, ease: 'ease-in' };
      }
      function soundLine(v) {
        if (v === '1') return '대사 "안녕, 얘들아!"라고 말해요';
        if (v === '2') return '발소리와 조용한 교실 소음이 들려요';
        return '소리 지시가 없어요';
      }
      const SOUND_PATTERN = { '0': [10, 10, 10, 10, 10], '1': [18, 46, 28, 50, 22], '2': [14, 26, 15, 30, 16] };
      function render() {
        const v = {}; AXES.forEach(ax => { v[ax.id] = selects[ax.id].value; });
        const text = (ax) => AXES.find(a => a.id === ax).options[+v[ax]];
        const isTwo = v.shots === '1';
        const core = `쿼카가 ${text('act')}. 카메라는 ${text('cam')}. 속도는 ${text('spd')}. ${text('arc')}. 길이는 ${text('len')}. ${text('fix')}. 소리는 ${soundLine(v.snd)}.`;
        sentence.textContent = isTwo
          ? `샷 1: ${core} 샷 2: 같은 쿼카가 칠판 앞에서 뒤돌아, ${text('cam')} 카메라로 이어져요.`
          : core;
        const sp = speed(v.spd);
        const actX = v.act === '1' ? 34 : 0;
        const actFlip = v.act === '2' ? -1 : 1;
        const camScale = v.cam === '1' ? 1.18 : 1;
        const camX = v.cam === '2' ? 20 : 0;
        actor1.style.transition = `transform ${sp.dur}s ${sp.ease}`;
        actor1.style.transform = `translateX(${actX}px) scaleX(${actFlip})`;
        frame1.style.transition = `transform ${sp.dur}s ${sp.ease}`;
        frame1.style.transform = `scale(${camScale}) translateX(${camX}px)`;
        frame2.style.transition = `transform ${sp.dur}s ${sp.ease}`;
        frame2.style.transform = `scale(${camScale}) translateX(${camX}px)`;
        previewBox2.style.display = isTwo ? 'flex' : 'none';
        shot1Label.style.display = isTwo ? 'block' : 'none';
        const bar = SOUND_PATTERN[v.snd] || SOUND_PATTERN['0'];
        soundBits.forEach((bit, i) => { bit.style.height = `${bar[i]}px`; });
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
    '요즘 영상 AI는 소리도 같이 만들어요. <b>대사는 따옴표로</b>, 소리도 글로 적어 줘요.'
  ],
  tip: {
    body: '학급 영상은 <b>주체 동작 + 카메라 + 길이</b> 세 가지에 <b>소리 한 줄</b>만 더해도 훨씬 나아져요. 카메라 용어는 영어를 함께 적어요(dolly in, pan).',
    extra: '대사는 큰따옴표 안에 짧게, 효과음은 "분필 긁는 소리"처럼 구체적인 소리로 적어요. 안 움직이는 게 목표면 "카메라 고정, 배경 고정", 소리가 필요 없으면 "대사 없음, 잔잔한 교실 소리만"처럼 그것도 문장으로 적어요.'
  },
  myth: {
    myth: '이미지 프롬프트를 그대로 넣으면 영상도 잘 나온다.',
    fact: '이미지 프롬프트에는 <b>시간</b>도 <b>소리</b>도 없어요. 무엇이 어떻게 움직이는지, 카메라는 어떻게 움직이는지, 길이는 얼마인지, 무슨 소리가 나는지를 더해야 해요.'
  },
  sources: [
    { title: 'Make-A-Video: Text-to-Video Generation without Text-Video Data (arXiv, 2022)', url: 'https://arxiv.org/abs/2209.14792', note: '설명 없는 영상으로 움직임을 배우는 방식이에요.' },
    { title: 'LTX-2: Efficient Joint Audio-Visual Foundation Model (arXiv, 2026)', url: 'https://arxiv.org/abs/2601.03233', note: '영상 흐름과 소리 흐름이 교차 어텐션으로 함께 생성되는 구조예요.' },
    { title: 'Gemini API — Generate videos with Veo 3.1', url: 'https://ai.google.dev/gemini-api/docs/veo', note: '네이티브 오디오, 대사는 따옴표·효과음·소리 풍경 묘사 요령, 카메라 용어 예시예요.' },
    { title: 'MSAVBench: Towards Comprehensive and Reliable Evaluation of Multi-Shot Audio-Video Generation (arXiv, 2026)', url: 'https://arxiv.org/abs/2605.20183', note: '19개 모델 평가, 멀티샷 연출과 소리-영상 동기화의 한계예요.' }
  ],
  script: `"쿼카가 교실에 서 있다"로 5초 영상을 만들면 거의 안 움직이고 소리도 엉뚱하게 나올 때가 많아요. 뭘 어떻게 움직이고 무슨 소리가 나는지 말이 없었기 때문이에요.

영상 모델은 프레임을 시공간 조각으로 잘라 시간 축 관계를 배우고, 2026년 모델은 소리 조각도 함께 만들어요. 움직임과 소리가 없으면 흔한 쪽을 골라요. 다만 2026년 평가 연구는 19개 모델 모두 여러 샷 연출과 소리 맞춤은 아직 약하다고 했어요.

그래서 움직임은 여섯 축(동작·카메라·속도·시작→끝·길이·고정할 것)으로 적고, 소리 한 줄을 더해요. 대사는 따옴표로, 효과음은 구체적인 소리로, 배경은 공간 묘사로 적어요.

여러 샷이면 샷 1, 샷 2로 나눠 샷마다 여섯 축을 채우고, 카메라 용어는 공식 가이드도 예로 드는 영어 촬영 용어(dolly, pan, aerial view)를 함께 써요.`
};
