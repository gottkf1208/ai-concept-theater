/* S777-53 실시간으로 말하는 아바타는 어떻게 만들어질까: 실시간 영상 생성·립싱크·SynthID 워터마크 */
export default {
  slug: 't7-live-avatar',
  track: 'S777',
  title: '실시간으로 말하는 아바타는 어떻게 만들어질까',
  subtitle: '실시간 영상 생성·립싱크·SynthID 워터마크',
  summary: '9월 24일 Google이 Gemini 3.8 Live에 실시간으로 말하는 아바타를 붙였고, 하루 전 Meta는 목소리만으로 표정을 추론하는 통화용 홀로그램을 발표했어요. 영상을 미리 다 만들어 두지 않고 한 프레임씩 바로 만드는 인과적 생성, 입 모양을 소리에 맞추는 립싱크, 보이지 않는 워터마크가 하는 일과 못 하는 일까지 짚어요.',
  keywords: ['Live Avatar', 'Gemini 3.8 Live', '실시간 영상 생성', '인과적 생성', 'causal', '자기회귀', '증류', '립싱크', '판별기', '아바타', '홀로그램', 'SynthID', '워터마크', '딥페이크'],

  scenes: [
    {
      title: '9월 24일, 말하는 아바타', dur: 13,
      captions: [
        { t: 0, text: '9월 24일 Google이 Gemini 3.8 Live에 <em>실시간으로 말하는 아바타</em>를 붙였다고 발표했어요.' },
        { t: 5, text: '하루 전 Meta는 통화 중 얼굴 대신 나오는 홀로그램을 공개했어요. 표정을 <em>목소리만으로</em> 추론해요.' },
        { t: 9.5, text: '영상을 어떻게 대화 속도로 만들까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 350, size: 300, pose: 'wave' });
        stage.append(q.el);
        const c1 = P.chip({ x: 330, y: 92, text: '9/24 Google · Gemini 3.8 Live + Live Avatar', color: 'aqua', size: 20 });
        const c2 = P.chip({ x: 330, y: 144, text: '9/23 Meta · Ray-Ban Display 홀로그램', color: 'ink', size: 20 });
        tl.at(stage.appendChild(c1.el), .3, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 5.2, { from: 'pop' });
        const avatar = P.box({ x: 330, y: 220, w: 400, h: 170, label: 'Live Avatar', sub: '97개 언어 · 입 모양·표정 실시간', accent: 'aqua', icon: P.ICON.video });
        const holo = P.box({ x: 770, y: 220, w: 400, h: 170, label: '홀로그램', sub: '목소리로 표정 추론', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(avatar.el), 1, { from: 'up' });
        tl.at(stage.appendChild(holo.el), 5.6, { from: 'up' });
        const ask = P.text({ x: 330, y: 450, w: 840, text: '영상을 어떻게 <em>대화 속도</em>로 만들까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(ask.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.4);
            avatar.on(t > 1 && t < 5);
            holo.on(t > 5.6 && t < 9.5);
          }
        };
      }
    },
    {
      title: '한꺼번에 vs 한 장씩', dur: 14,
      captions: [
        { t: 0, text: '보통 영상 모델은 클립 전체를 한꺼번에 보며 다듬어요. 그래서 끝 장면이 정해져야 첫 장면도 끝나요.' },
        { t: 5, text: '대화형 아바타는 지난 프레임만 보고 다음 프레임을 바로 만드는 <em>인과적 생성</em>이 필요해요.' },
        { t: 9.5, text: '2024년 연구는 50단계로 하던 일을 4단계로 따라 하게 가르치는 <em>증류</em>로 GPU 한 장에서 초당 9.4프레임을 만들었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const lab1 = P.text({ x: 330, y: 92, w: 400, text: '보통 영상 생성', size: 22, weight: 800 });
        const lab2 = P.text({ x: 330, y: 282, w: 400, text: '<i>인과적 생성</i>', size: 22, weight: 800 });
        tl.at(stage.appendChild(lab1.el), .2, { from: 'left' });
        tl.at(stage.appendChild(lab2.el), 5.1, { from: 'left' });
        const mk = (x, y) => {
          const fill = P.h('div', { style: 'position:absolute;inset:6px;border-radius:8px;background:#127E90;opacity:0' });
          const f = P.h('div', { style: `left:${x}px;top:${y}px;width:76px;height:76px;border-radius:12px;border:2px solid #9AA5AF;background:#fff;box-sizing:border-box` }, fill);
          stage.append(f);
          return { f, fill };
        };
        const top = Array.from({ length: 8 }, (_, i) => mk(330 + i * 100, 132));
        const bot = Array.from({ length: 8 }, (_, i) => mk(330 + i * 100, 322));
        top.forEach(o => tl.at(o.f, .4, { from: 'pop' }));
        bot.forEach(o => tl.at(o.f, 5.2, { from: 'pop' }));
        const both = P.arrow(lines, { x1: 340, y1: 228, x2: 1096, y2: 228, width: 3, color: '#9AA5AF', dashed: true, head: false });
        const steps = Array.from({ length: 7 }, (_, i) => P.arrow(lines, { x1: 409 + i * 100, y1: 360, x2: 427 + i * 100, y2: 360, width: 3, color: '#1B1F24' }));
        const chip = P.chip({ x: 330, y: 460, text: '2024년 연구: 50단계 → 4단계, 초당 9.4프레임', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.8, { from: 'pop' });
        const note = P.text({ x: 330, y: 530, w: 840, text: '지난 프레임만 보고 <em>다음 프레임</em>을 바로 그려요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(note.el), 7.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            const a = P.clamp((t - 1.2) / 2.8, 0, 1);
            top.forEach(o => { o.fill.style.opacity = (a * .9).toFixed(2); });
            both.draw(P.clamp((t - .8) / .8, 0, 1));
            bot.forEach((o, i) => { o.fill.style.opacity = (P.clamp((t - (5.8 + i * .45)) / .35, 0, 1) * .9).toFixed(2); });
            steps.forEach((s, i) => s.draw(P.clamp((t - (6 + i * .45)) / .3, 0, 1)));
          }
        };
      }
    },
    {
      title: '입은 소리를 따라가요', dur: 13,
      captions: [
        { t: 0, text: '<em>립싱크</em>는 소리를 입력으로 받아 얼굴의 입 주변만 다시 그리는 일이에요.' },
        { t: 4.5, text: '2020년 연구는 입과 소리가 맞는지만 따지는 채점용 신경망, 곧 <em>판별기</em>를 붙여 실제 영상과 거의 비슷한 수준으로 맞췄어요.' },
        { t: 9, text: 'Meta 홀로그램은 여기서 더 나가 말투에서 <em>표정</em>까지 추론해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const HS = [30, 62, 44, 90, 70, 38, 82, 56, 96, 48, 66, 34];
        const wave = P.h('div', { style: 'left:330px;top:140px;width:240px;height:150px;border-radius:16px;border:2px solid #9AA5AF;background:#fff;display:flex;align-items:center;justify-content:center;gap:6px;box-sizing:border-box' });
        const bars = HS.map(hh => { const b = P.h('div', { style: `width:10px;height:${hh}px;border-radius:5px;background:#127E90` }); wave.append(b); return b; });
        stage.append(wave);
        tl.at(wave, .3, { from: 'left' });
        const wl = P.chip({ x: 330, y: 310, text: '소리', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(wl.el), .5, { from: 'pop' });
        const face = P.h('div', { style: 'left:660px;top:110px;width:200px;height:240px;border-radius:50% 50% 46% 46%;border:3px solid #1B1F24;background:#fff;box-sizing:border-box' });
        const eyeL = P.h('div', { style: 'position:absolute;left:52px;top:84px;width:16px;height:16px;border-radius:50%;background:#1B1F24' });
        const eyeR = P.h('div', { style: 'position:absolute;left:126px;top:84px;width:16px;height:16px;border-radius:50%;background:#1B1F24' });
        const mouthZone = P.h('div', { style: 'position:absolute;left:40px;top:140px;width:114px;height:70px;border-radius:40px;border:3px dashed #F2812D;box-sizing:border-box' });
        const mouth = P.h('div', { style: 'position:absolute;left:72px;top:164px;width:50px;height:12px;border-radius:12px;background:#F2812D' });
        face.append(eyeL, eyeR, mouthZone, mouth);
        stage.append(face);
        tl.at(face, 1.2, { from: 'up' });
        const fl = P.chip({ x: 664, y: 380, text: '입 주변만 다시 그리기', color: 'orange', size: 20 });
        tl.at(stage.appendChild(fl.el), 2, { from: 'pop' });
        const judge = P.box({ x: 960, y: 140, w: 240, h: 170, label: '판별기', sub: '입과 소리가 맞나?', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(judge.el), 4.7, { from: 'right' });
        const iconEl = judge.el.querySelector('.p-box-icon');
        const a1 = P.arrow(lines, { x1: 575, y1: 215, x2: 652, y2: 225, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 868, y1: 225, x2: 954, y2: 225, width: 4, color: '#1B1F24' });
        const meta = P.text({ x: 330, y: 470, w: 860, text: 'Meta 홀로그램: 말투에서 <em>표정</em>까지 추론해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(meta.el), 9.2, { from: 'up' });
        let lastOk = null;
        return {
          tick(t) {
            q.tick(t, t < 4.4 || t > 8.8);
            bars.forEach((b, i) => { b.style.transform = `scaleY(${(0.55 + 0.45 * Math.abs(Math.sin(t * 3 + i * .7))).toFixed(3)})`; });
            mouth.style.height = `${Math.round(8 + 22 * Math.abs(Math.sin(t * 6)))}px`;
            a1.draw(P.clamp((t - 1.6) / .5, 0, 1));
            a2.draw(P.clamp((t - 5) / .5, 0, 1));
            const ok = t < 5 || Math.floor(t * 1.2) % 2 === 0;
            if (ok !== lastOk) { iconEl.innerHTML = ok ? P.ICON.check : P.ICON.x; lastOk = ok; }
            judge.on(t > 4.7 && t < 9);
          }
        };
      }
    },
    {
      title: '보이지 않는 표식, SynthID', dur: 13,
      captions: [
        { t: 0, text: 'Google은 아바타의 모든 소리와 영상에 <em>SynthID</em>라는 보이지 않는 워터마크를 넣었다고 밝혔어요.' },
        { t: 4.5, text: '워터마크는 만든 쪽이 결과물에 심어 두는 흔적이에요. 압축하거나 잘라도 남게 만들어요.' },
        { t: 9, text: '다만 흔적을 <em>심지 않은</em> 생성물은 이 검사로 잡히지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const frame = P.box({ x: 330, y: 100, w: 420, h: 250, label: '아바타 영상', sub: '소리 + 영상 출력', accent: '', icon: P.ICON.video });
        let grid = '';
        for (let i = 1; i < 14; i++) grid += `<line x1="${i * 30}" y1="0" x2="${i * 30}" y2="250" />`;
        for (let j = 1; j < 9; j++) grid += `<line x1="0" y1="${j * 28}" x2="420" y2="${j * 28}" />`;
        const mark = P.h('div', { style: 'position:absolute;inset:0;border-radius:20px;overflow:hidden;opacity:0;pointer-events:none', html: `<svg viewBox="0 0 420 250" width="100%" height="100%" preserveAspectRatio="none"><g stroke="#9AA5AF" stroke-width="1.5">${grid}</g></svg>` });
        frame.el.append(mark);
        tl.at(stage.appendChild(frame.el), .3, { from: 'up' });
        const det = P.box({ x: 830, y: 140, w: 370, h: 170, label: '검출', sub: 'Google AI로 만든 것인지 확인', accent: 'aqua', icon: P.ICON.search });
        tl.at(stage.appendChild(det.el), 2.4, { from: 'right' });
        const arr = P.arrow(lines, { x1: 756, y1: 225, x2: 824, y2: 225, width: 4, color: '#127E90' });
        const chips = [['압축해도', 330], ['잘라도', 470], ['프레임레이트 바꿔도', 590]].map(([text, x], i) => {
          const c = P.chip({ x, y: 390, text, color: 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), 5.2 + i * .6, { from: 'pop' });
          return c;
        });
        const last = P.text({ x: 330, y: 480, w: 870, text: '흔적을 <em>심지 않은</em> 생성물은 이 검사로 잡히지 않아요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.3 || t > 8.8);
            mark.style.opacity = (P.clamp((t - 1) / 1.2, 0, 1) * .55).toFixed(2);
            arr.draw(P.clamp((t - 2.6) / .5, 0, 1));
            det.on(t > 2.4 && t < 9);
          }
        };
      }
    },
    {
      title: '교실에서는 이렇게', dur: 13,
      captions: [
        { t: 0, text: '학급 안내 영상에 아바타를 쓴다면 시작할 때 <em>AI 아바타</em>라고 먼저 밝혀요. 친구나 선생님 얼굴로 만들려면 본인 동의가 먼저예요.' },
        { t: 7, text: '워터마크가 없다고 진짜라는 뜻은 아니에요. <em>누가 올렸는지</em>까지 같이 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const steps = [
          ['① AI 아바타 밝히기', '시작 화면에 먼저 알려요'],
          ['② 얼굴은 동의 먼저', '친구·선생님 얼굴이면'],
          ['③ 올린 사람 확인', '워터마크 검사와 함께']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + i * 280, y: 140, w: 250, h: 150, label, sub, accent: i === 2 ? 'aqua' : (i === 1 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * 2.2, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 652 + i * 280, y1: 215, x2: 678 + i * 280, y2: 215, width: 4, color: '#1B1F24' }));
        const last = P.text({ x: 400, y: 400, w: 780, text: '표식이 없다고 <em>진짜</em>라는 뜻은 아니에요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 7.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6.5 || t > 7);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 2.2)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * 2.2));
          }
        };
      }
    }
  ],

  interaction: {
    title: '실시간 아바타 예산 계산기',
    desc: '화면은 1초에 정해진 장수만큼 프레임을 보여 줘야 해요. <b>한 프레임 만드는 시간</b>을 올려 보고, 예산을 넘으면 입 모양이 소리보다 얼마나 밀리는지 보세요. <b>단계 줄이기(증류)</b>를 누르면 50단계를 4단계로 줄인 시간으로 다시 계산해요.',
    mount(el, P) {
      let gen = 30, fps = 30, distilled = false;
      const range = P.h('input', { type: 'range', id: 'la-gen', min: '10', max: '120', step: '1', value: '30' });
      const rangeLab = P.h('label', { for: 'la-gen' }, '한 프레임 만드는 시간(ms)');
      const rangeVal = P.h('b', { class: 'la-val' }, '30ms');
      const fpsSel = P.h('select', { id: 'la-fps' }, ...[24, 25, 30].map(v => P.h('option', { value: String(v) }, `${v}fps`)));
      fpsSel.value = '30';
      const fpsLab = P.h('label', { for: 'la-fps' }, '화면 프레임레이트');
      const distBtn = P.h('button', { class: 'btn', type: 'button' }, '단계 줄이기(증류)');
      const status = P.h('div', { class: 'la-status' });
      const detail = P.h('div', { class: 'la-detail' });
      const barA = P.h('div', { class: 'la-fill la-a' });
      const barV = P.h('div', { class: 'la-fill la-v' });
      const barALab = P.h('span', { class: 'la-bl' });
      const barVLab = P.h('span', { class: 'la-bl' });
      const note = P.h('p', { class: 'la-note' }, '숫자는 원리를 보여 주는 예시 값이에요. 실제 제품의 속도와는 달라요.');
      el.append(P.h('div', { class: 'la-wrap' },
        P.h('div', { class: 'la-row' }, rangeLab, range, rangeVal),
        P.h('div', { class: 'la-row' }, fpsLab, fpsSel, distBtn),
        status,
        detail,
        P.h('div', { class: 'la-bars' },
          P.h('div', { class: 'la-bh' }, '10초 대화를 내보내는 데 걸리는 시간'),
          P.h('div', { class: 'la-bar' }, P.h('span', { class: 'la-bn' }, '소리'), P.h('div', { class: 'la-track' }, barA), barALab),
          P.h('div', { class: 'la-bar' }, P.h('span', { class: 'la-bn' }, '영상'), P.h('div', { class: 'la-track' }, barV), barVLab)
        ),
        note
      ));
      el.append(P.h('style', { html: `
        .la-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .la-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:14px;font-weight:700}
        .la-row input[type=range]{flex:1 1 180px;min-width:0;max-width:100%}
        .la-row select{height:34px;border-radius:10px;border:1px solid var(--line);padding:0 8px;font-size:14px}
        .la-val{font-family:var(--mono);font-size:13px;min-width:56px}
        .la-status{border:2px solid #127E90;border-radius:12px;padding:12px 14px;font-weight:800;font-size:15px;background:#fff;word-break:keep-all}
        .la-status.late{border-color:#F2812D}
        .la-detail{font-family:var(--mono);font-size:12.5px;color:var(--muted);word-break:keep-all}
        .la-bars{display:flex;flex-direction:column;gap:8px}
        .la-bh{font-size:12.5px;font-weight:700;color:var(--muted)}
        .la-bar{display:flex;align-items:center;gap:8px;font-size:13px}
        .la-bn{flex:none;width:34px;font-weight:700}
        .la-track{flex:1 1 auto;min-width:0;height:14px;border-radius:7px;background:var(--line);overflow:hidden}
        .la-fill{height:100%;border-radius:7px}
        .la-a{background:#127E90}
        .la-v{background:#1B1F24}
        .la-v.late{background:#F2812D}
        .la-bl{flex:none;font-family:var(--mono);font-size:12px;min-width:52px;text-align:right}
        .la-note{font-size:12px;color:var(--muted);margin:0}
      ` }));
      const r1 = v => Math.round(v * 10) / 10;
      function render() {
        const eff = distilled ? r1(gen * 4 / 50) : gen;
        const budget = r1(1000 / fps);
        const videoSec = r1(eff * fps * 10 / 1000);
        rangeVal.textContent = `${gen}ms`;
        distBtn.textContent = distilled ? '원래대로' : '단계 줄이기(증류)';
        detail.textContent = `프레임 예산 1000 ÷ ${fps} = ${budget}ms · 지금 한 프레임 ${eff}ms${distilled ? ` (${gen} × 4 ÷ 50)` : ''}`;
        const late = eff > budget;
        status.classList.toggle('late', late);
        barV.classList.toggle('late', late);
        if (!late) {
          status.textContent = '제때 나와요. 한 프레임을 예산 안에 만들어서 입 모양이 소리를 따라가요.';
        } else {
          const lagSec = r1((eff - budget) * fps * 10 / 1000);
          status.textContent = `10초 대화 뒤 입 모양이 소리보다 약 ${lagSec}초 늦어요.`;
        }
        const span = Math.max(10, videoSec);
        barA.style.width = `${(10 / span) * 100}%`;
        barV.style.width = `${(Math.max(videoSec, .1) / span) * 100}%`;
        barALab.textContent = '10초';
        barVLab.textContent = `${videoSec}초`;
      }
      range.addEventListener('input', () => { gen = +range.value; render(); });
      fpsSel.addEventListener('change', () => { fps = +fpsSel.value; render(); });
      distBtn.addEventListener('click', () => { distilled = !distilled; render(); });
      render();
    }
  },

  teacherLines: [
    '실시간 아바타는 영상을 미리 만들어 두는 게 아니라 <b>방금 만든 장면을 보고 다음 장면을 바로</b> 그려요.',
    'AI 영상에는 보이지 않는 표식이 들어 있을 수 있지만, <b>표식이 없다고 진짜라는 뜻은 아니에요</b>.'
  ],
  tip: {
    body: '수업 안내·학부모 공지에 아바타 영상을 쓴다면 첫 화면에 <b>"AI 아바타가 안내해요"</b>라고 밝히고, 실제 사람 얼굴을 쓰려면 그 사람의 동의를 먼저 받아요.',
    extra: '출처가 불분명한 인물 영상은 Gemini 앱처럼 워터마크를 검사하는 도구를 한 번 쓰되, 그보다 먼저 <b>누가 어디에 올렸는지</b>를 확인해요. 이 검사는 Google AI로 만들었는지를 확인해요.'
  },
  myth: {
    myth: '실시간으로 대답하는 아바타 영상은 미리 녹화해 둔 영상을 골라 틀어 주는 것이다.',
    fact: '소리를 받는 동안 입 모양과 표정을 프레임마다 새로 만들어요. 그래서 한 프레임을 만드는 시간이 화면에 보여 줄 시간보다 짧아야 하고, 연구는 지난 프레임만 보고 다음 프레임을 만드는 방식과 단계 줄이기로 이 속도를 맞춰요.'
  },
  sources: [
    { title: 'Google: Gemini 3.8 Live with Live Avatar (2026-09-24)', url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/', note: '97개 언어 립싱크 아바타, 허용 목록 기업만 맞춤 아바타, 모든 음성·영상 출력에 SynthID.' },
    { title: 'Meta: New features for Meta Ray-Ban Display (2026-09-23)', url: 'https://about.fb.com/news/2026/09/new-features-for-meta-ray-ban-display-navigation-hologram/', note: '목소리와 말투로 표정을 추론하는 통화용 홀로그램.' },
    { title: 'From Slow Bidirectional to Fast Autoregressive Video Diffusion Models (CausVid, arXiv, 2024)', url: 'https://arxiv.org/abs/2412.07772', note: '양방향 모델을 인과적 생성으로 바꾸고, 50단계를 4단계로 증류해 GPU 한 장에서 초당 9.4프레임 스트리밍.' },
    { title: 'Google DeepMind: SynthID', url: 'https://deepmind.google/models/synthid/', note: '사람이 알아채지 못하는 워터마크, 자르기·압축·프레임레이트 변경에 견디는 설계, Gemini 앱 검증.' }
  ],
  script: `9월 24일 Google이 Gemini 3.8 Live에 실시간으로 말하는 아바타를 붙였다고 발표했어요. 하루 전 Meta는 목소리만으로 표정을 추론하는 통화용 홀로그램을 공개했고요.

보통 영상 모델은 클립 전체를 한꺼번에 다듬어서, 끝 장면이 정해져야 첫 장면도 끝나요. 대화형 아바타는 지난 프레임만 보고 다음 프레임을 바로 만드는 인과적 생성이 필요해요. 2024년 연구는 50단계 일을 4단계로 줄이는 증류로 초당 9.4프레임을 만들었어요.

립싱크는 소리를 받아 입 주변만 다시 그리는 일이고, 2020년 연구는 입과 소리가 맞는지 채점하는 판별기를 붙였어요. Google은 아바타 출력에 SynthID 워터마크를 넣었다고 밝혔는데, 흔적을 심지 않은 생성물은 이 검사로 안 잡혀요.

그러니 AI 아바타라고 먼저 밝히고, 실제 얼굴은 동의부터 받고, 낯선 영상은 누가 올렸는지 확인해요.`
};
