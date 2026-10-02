/* V2-S5-39 AI는 전기와 물을 얼마나 쓸까: 데이터센터 전력과 질문 한 번의 에너지 */
export default {
  slug: 'v5-energy',
  track: 'S5',
  title: 'AI는 전기와 물을 얼마나 쓸까',
  subtitle: '데이터센터 전력과 질문 한 번의 에너지',
  summary: '"AI한테 질문 하나 하면 물 한 병을 쓴대요." 정말일까요? 2026년 IEA 보고서와 2025년 실측 연구로 질문 한 번의 전기·물, 작업 종류별 차이, 데이터센터 전체 전력까지 숫자로 따라가요.',
  keywords: ['데이터센터', '전력 소비', 'TWh', 'IEA', '질문당 에너지', 'Wh', '물 사용', 'PUE', '제번스 역설', '추론 모델', '에이전트'],

  scenes: [
    {
      title: '질문 하나에 물 한 병?', dur: 13,
      captions: [
        { t: 0, text: '학생이 이렇게 물었어요. "AI한테 질문 하나 하면 물 한 병 쓴다던데, 진짜예요?"' },
        { t: 5, text: '소문이 아니라 공식 측정값으로 확인해 볼게요.' },
        { t: 9, text: '2025년 실측 연구와 2026년 국제에너지기구 보고서 숫자예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 340, y: 90, w: 560, text: 'AI한테 질문 하나 하면 <b>물 한 병</b>을 쓴다던데, 진짜예요?', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const bottle = P.box({ x: 420, y: 270, w: 200, h: 220, label: '물 한 병', sub: '약 500 mL<br>정말 이만큼 쓸까요?', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(bottle.el), 5.2, { from: 'pop' });
        const vs = P.text({ x: 660, y: 350, w: 60, text: 'vs', size: 28, weight: 800, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(vs.el), 6.2, { from: 'pop' });
        const checkBox = P.box({ x: 760, y: 270, w: 300, h: 220, label: '공식 측정값', sub: '2025년 구글 실측 연구<br>2026년 IEA 보고서', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(checkBox.el), 7, { from: 'pop' });
        const note = P.text({ x: 340, y: 560, w: 880, text: '숫자 하나씩, 바로 비교해 봐요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            bottle.on(t > 5.2);
            checkBox.on(t > 7);
          }
        };
      }
    },
    {
      title: '질문 한 번의 크기', dur: 13,
      captions: [
        { t: 0, text: '2025년 구글 실측에서 텍스트 질문 한 번은 전기 <em>0.24 Wh</em>, 물 <em>0.26 mL</em>(약 다섯 방울)였어요.' },
        { t: 5, text: '같은 시간 텔레비전을 <em>9초</em> 켜 두는 것보다 전기를 덜 써요. 물 한 병과는 거리가 멀어요.' },
        { t: 9.5, text: '게다가 12개월 사이 질문 한 번의 전기는 <em>33배</em> 줄었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'base' });
        stage.append(q.el);
        const cards = [
          ['전기', '0.24 Wh', 'aqua'],
          ['물', '0.26 mL<br>(약 다섯 방울)', 'aqua'],
          ['비교', 'TV 9초<br>시청보다 적어요', '']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + i * 290, y: 110, w: 260, h: 160, label, sub, accent: acc, icon: i === 2 ? P.ICON.eye : P.ICON.check });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 360, y: 330, text: '12개월 사이 질문당 전기 33배 감소', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.5, { from: 'pop' });
        const final = P.text({ x: 360, y: 400, w: 880, text: '질문 한 번은 작아요. 다만 <em>종류가 달라지면</em> 이야기가 달라져요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 9.5 && t < 11.5));
            cards.forEach((c, i) => c.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: '그런데 종류가 달라지면', dur: 14,
      captions: [
        { t: 0, text: '같은 텍스트 질문이어도 모델 크기와 방식에 따라 전기 사용량이 크게 달라져요.' },
        { t: 5, text: '추론 모델처럼 <em>오래 생각</em>하거나 여러 단계를 도는 <em>에이전트</em>는 질문 한 번이 훨씬 커요.' },
        { t: 10, text: '이미지는 약 <em>10배</em>, 영상 생성은 길이·해상도에 따라 <em>수백에서 수천 배</em>까지 가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 150, size: 260, pose: 'think' });
        stage.append(q.el);
        const data = [
          ['중형 모델', .05, 56], ['대형 모델', .31, 80], ['에이전트', 1.14, 120], ['추론 모델', 7.6, 170], ['추론+에이전트', 50, 220]
        ];
        const bars = data.map(([label, val, h], i) => {
          const x = 360 + i * 170;
          const bar = P.h('div', { style: `left:${x}px;top:${560 - h}px;width:120px;height:${h}px;border-radius:10px 10px 4px 4px;background:${i >= 3 ? '#F2812D' : '#127E90'}` });
          const lab = P.text({ x: x - 10, y: 568, w: 140, text: label, size: 15, weight: 700, align: 'center', cls: 'muted' });
          const num = P.text({ x: x - 10, y: 594, w: 140, text: `${val} Wh`, size: 16, weight: 800, align: 'center' });
          tl.at(stage.appendChild(bar), .4 + i * .9, { from: 'up' });
          tl.at(stage.appendChild(lab.el), .4 + i * .9, { from: 'up' });
          tl.at(stage.appendChild(num.el), .6 + i * .9, { from: 'up' });
          return bar;
        });
        const c1 = P.chip({ x: 400, y: 130, text: '이미지 약 10배', color: 'ink', size: 20 });
        const c2 = P.chip({ x: 680, y: 130, text: '영상 수백~수천 배', color: 'orange', size: 20 });
        tl.at(stage.appendChild(c1.el), 10.2, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 10.8, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 10 && t < 13));
          }
        };
      }
    },
    {
      title: '다 합치면', dur: 14,
      captions: [
        { t: 0, text: '한 번은 작아도 횟수가 엄청나서, 데이터센터 전력은 2024년 <em>415</em>에서 2025년 <em>485 TWh</em>(세계 전력의 약 1.5%)로 늘었어요.' },
        { t: 5.5, text: '2030년에는 약 <em>950 TWh</em>, 세계 전력 수요의 약 <em>3%</em>까지 늘 전망이에요.' },
        { t: 10, text: '효율이 10배씩 좋아져도 더 많이 쓰게 되는 <em>제번스 역설</em> 때문에 총 전력은 계속 늘어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 1010, y: 340, size: 280, pose: 'base', flip: true });
        stage.append(q.el);
        const data = [['2024', 415, 90], ['2025', 485, 105], ['2030(전망)', 950, 200]];
        const bars = data.map(([label, val, h], i) => {
          const x = 100 + i * 230;
          const bar = P.h('div', { style: `left:${x}px;top:${540 - h}px;width:160px;height:${h}px;border-radius:10px 10px 4px 4px;background:${i === 2 ? '#F2812D' : '#127E90'}` });
          const lab = P.text({ x: x - 20, y: 548, w: 200, text: label, size: 16, weight: 700, align: 'center', cls: 'muted' });
          const num = P.text({ x: x - 20, y: 574, w: 200, text: `${val} TWh`, size: 18, weight: 800, align: 'center' });
          tl.at(stage.appendChild(bar), .4 + i * 1.4, { from: 'up' });
          tl.at(stage.appendChild(lab.el), .4 + i * 1.4, { from: 'up' });
          tl.at(stage.appendChild(num.el), .6 + i * 1.4, { from: 'up' });
          return bar;
        });
        const chips = [
          ['AI 전용 센터 2025년 +50%', 'ink', 100, 130],
          ['몰린 지역은 전력의 20~30%', 'orange', 100, 180]
        ].map(([text, color, x, y]) => {
          const c = P.chip({ x, y, text, color, size: 20 });
          return c;
        });
        tl.at(stage.appendChild(chips[0].el), 5.6, { from: 'pop' });
        tl.at(stage.appendChild(chips[1].el), 6.4, { from: 'pop' });
        const final = P.text({ x: 100, y: 240, w: 450, text: '효율이 좋아져도 더 많이 써서 전력은 <em>늘어요</em>. <i>제번스 역설</i>이에요.', size: 24, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
          }
        };
      }
    },
    {
      title: '교실 판단', dur: 12,
      captions: [
        { t: 0, text: 'AI 전기는 <em>한 번의 양 × 쓰는 횟수</em>예요.' },
        { t: 4.5, text: '글로 되는 일은 글로 하고, 영상은 <em>스토리보드를 먼저 확정</em>해서 한 번에 만들어요.' },
        { t: 8.5, text: '같은 영상을 무한히 다시 뽑는 대신, <em>시드와 프롬프트를 기록</em>해 둬요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['① 글은 글로', '텍스트로 되는 일은 이미지·영상으로 키우지 않기'],
          ['② 스토리보드 먼저', '영상은 장면·프롬프트를 확정한 뒤 생성'],
          ['③ 재생성 줄이기', '마음에 든 시드·프롬프트 기록해 두기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400, y: 100 + i * 150, w: 780, h: 120, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * 1.1, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 560, w: 780, text: '작업의 <em>크기</em>와 <em>횟수</em>를 같이 보는 게 교실의 판단이에요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.8);
            items.forEach((b, i) => b.on(t > .3 + i * 1.1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 반 AI 전기 계산기',
    desc: '학생 수와 1인당 텍스트 질문·이미지 수를 슬라이더로 바꾸고, <b>"영상 1편 추가"</b>를 눌러 반 전체 영상 생성을 더해 보세요. 텍스트는 질문 1회 0.24 Wh, 이미지는 텍스트의 10배, 영상은 텍스트의 300배(수백~수천 배 중 낮은 쪽 가정)로 계산해요. 이미지·영상 배수는 IEA 범위에서 고른 예시 값이에요.',
    mount(el, P) {
      const TEXT_WH = 0.24;
      const state = { students: 20, perText: 5, perImg: 2, videos: 0 };
      const studentsR = P.h('input', { type: 'range', id: 'sim-students', min: '1', max: '30', step: '1', value: String(state.students) });
      const perTextR = P.h('input', { type: 'range', id: 'sim-text', min: '0', max: '50', step: '1', value: String(state.perText) });
      const perImgR = P.h('input', { type: 'range', id: 'sim-img', min: '0', max: '20', step: '1', value: String(state.perImg) });
      const studentsLab = P.h('label', { for: 'sim-students', class: 'sim-rl' }, '학생 수 ', P.h('b', {}, String(state.students)));
      const perTextLab = P.h('label', { for: 'sim-text', class: 'sim-rl' }, '1인당 텍스트 질문 ', P.h('b', {}, String(state.perText)));
      const perImgLab = P.h('label', { for: 'sim-img', class: 'sim-rl' }, '1인당 이미지 ', P.h('b', {}, String(state.perImg)));
      const videoLab = P.h('div', { class: 'sim-rl' }, '반 전체 영상 ', P.h('b', {}, String(state.videos)), '편');
      const addVideo = P.h('button', { class: 'btn primary', type: 'button' }, '영상 1편 추가');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '영상 초기화');

      const rows = [
        P.h('div', { class: 'sim-row' }, studentsLab, studentsR),
        P.h('div', { class: 'sim-row' }, perTextLab, perTextR),
        P.h('div', { class: 'sim-row' }, perImgLab, perImgR),
        P.h('div', { class: 'sim-row' }, videoLab, addVideo, resetBtn)
      ];

      const barText = P.h('i', { style: 'background:#127E90' });
      const barImg = P.h('i', { style: 'background:#F2812D' });
      const barVideo = P.h('i', { style: 'background:#1B1F24' });
      const meterText = P.h('div', { class: 'sim-meter' }, barText);
      const meterImg = P.h('div', { class: 'sim-meter' }, barImg);
      const meterVideo = P.h('div', { class: 'sim-meter' }, barVideo);
      const totalVal = P.h('div', { class: 'sim-val sim-total' }, '');
      const tvVal = P.h('div', { class: 'sim-val' }, '');

      const result = P.h('div', { class: 'sim-result' },
        P.h('div', { class: 'sim-lab' }, '텍스트 질문'), meterText,
        P.h('div', { class: 'sim-lab' }, '이미지'), meterImg,
        P.h('div', { class: 'sim-lab' }, '영상'), meterVideo,
        totalVal, tvVal
      );

      el.append(P.h('div', { class: 'sim-wrap' }, ...rows, result));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-row input[type=range]{width:200px;max-width:60%}
        .sim-rl{font-size:14px;color:var(--ink);min-width:150px}
        .sim-result{margin-top:8px;border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
        .sim-lab{font-size:13px;color:var(--muted);margin-top:8px}
        .sim-meter{height:14px;border-radius:999px;background:var(--paper);overflow:hidden;margin-top:4px}
        .sim-meter i{display:block;height:100%;width:0;transition:width .3s}
        .sim-val{font-family:var(--mono);font-size:13px;color:var(--muted);margin-top:6px}
        .sim-total{font-size:16px;font-weight:800;color:var(--ink)}
      ` }));

      function render() {
        studentsLab.querySelector('b').textContent = String(state.students);
        perTextLab.querySelector('b').textContent = String(state.perText);
        perImgLab.querySelector('b').textContent = String(state.perImg);
        videoLab.querySelector('b').textContent = String(state.videos);

        const textWh = state.students * state.perText * TEXT_WH;
        const imgWh = state.students * state.perImg * TEXT_WH * 10;
        const vidWh = state.videos * TEXT_WH * 300;
        const total = textWh + imgWh + vidWh;
        const maxBar = Math.max(textWh, imgWh, vidWh, 1);
        barText.style.width = `${Math.round((textWh / maxBar) * 100)}%`;
        barImg.style.width = `${Math.round((imgWh / maxBar) * 100)}%`;
        barVideo.style.width = `${Math.round((vidWh / maxBar) * 100)}%`;
        totalVal.textContent = `합계 약 ${total.toFixed(1)} Wh`;
        const tvSeconds = (total / TEXT_WH) * 9;
        tvVal.textContent = tvSeconds >= 60 ? `TV 환산 약 ${(tvSeconds / 60).toFixed(1)}분 시청과 비슷해요` : `TV 환산 약 ${Math.round(tvSeconds)}초 시청과 비슷해요`;
      }
      studentsR.addEventListener('input', () => { state.students = +studentsR.value; render(); });
      perTextR.addEventListener('input', () => { state.perText = +perTextR.value; render(); });
      perImgR.addEventListener('input', () => { state.perImg = +perImgR.value; render(); });
      addVideo.addEventListener('click', () => { state.videos = Math.min(10, state.videos + 1); render(); });
      resetBtn.addEventListener('click', () => { state.videos = 0; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 질문 한 번은 생각보다 작지만, <b>영상 한 편은 질문 수백~수천 번</b>만큼 전기를 써요.',
    'AI 전기는 <b>한 번의 양 × 쓰는 횟수</b>예요. 둘 다 봐야 해요.'
  ],
  tip: {
    body: '영상 생성 수업은 스토리보드·프롬프트를 글로 먼저 확정하고, 장면당 생성 횟수를 정해 두세요(예: 장면당 2회). 마음에 든 결과의 시드와 프롬프트를 기록하면 같은 걸 다시 뽑느라 쓰는 전기가 줄어요.',
    extra: '이 편의 수치는 2025~2026년 공식 측정·전망이에요. 학생에게 보여 줄 때는 숫자 옆에 몇 년 측정인지를 같이 적어 주세요. 작업당 에너지는 해마다 크게 줄고 있어요.'
  },
  myth: {
    myth: 'AI에게 질문 하나 할 때마다 물 한 병을 쓴다.',
    fact: '2025년 실측에서 텍스트 질문 한 번은 물 약 0.26 mL(다섯 방울), 전기 0.24 Wh였어요. 다만 영상·추론 작업은 훨씬 크고, 데이터센터 전체 전력은 2030년까지 두 배로 늘 전망이에요.'
  },
  sources: [
    { title: 'Key Questions on Energy and AI (IEA, World Energy Outlook Special Report, 2026)', url: 'https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf', note: '데이터센터 전력 전망(2024~2030), 작업 종류별 에너지, PUE, 제번스 역설, 지역 집중도.' },
    { title: 'Measuring the environmental impact of delivering AI at Google Scale (arXiv, 2025)', url: 'https://arxiv.org/abs/2508.15734', note: 'Gemini 텍스트 프롬프트 한 번의 실측 전기·물·탄소, 12개월 변화.' },
    { title: 'Making AI Less "Thirsty": Uncovering and Addressing the Secret Water Footprint of AI Models (arXiv, 2023)', url: 'https://arxiv.org/abs/2304.03271', note: 'AI 학습·사용의 물 발자국과 세계 취수량 전망.' },
    { title: 'IEA Activities on Energy and AI, 2025-2026 (IEA)', url: 'https://iea.blob.core.windows.net/assets/7e263c7b-8dd2-4db3-bfe1-9a439f8a7e34/IEAActivitiesonEnergyandAI.pdf', note: '2025년 "Energy and AI" 보고서 발간 시점과 후속 작업 확인.' }
  ],
  script: `"AI한테 질문 하나 하면 물 한 병을 쓴대요." 학생이 이렇게 물으면 뭐라고 답해야 할까요. 2025년 구글의 실측 연구를 보면 텍스트 질문 한 번은 전기 0.24 와트시, 물은 0.26밀리리터, 다섯 방울 정도였어요. 같은 시간 텔레비전을 9초 켜 두는 것보다 적어요. 물 한 병과는 거리가 멀고, 12개월 사이 질문당 전기는 33배나 줄었어요.

다만 종류가 달라지면 이야기가 달라져요. 오래 생각하는 추론 모델이나 여러 단계를 도는 에이전트는 질문 한 번이 훨씬 커요. 이미지는 텍스트의 약 10배, 영상 생성은 길이와 해상도에 따라 수백에서 수천 배까지 가요. 한 번은 작아도 횟수가 쌓이면 전체가 커져요. 2026년 IEA 보고서를 보면 데이터센터 전력은 2024년 415테라와트시에서 2025년 485테라와트시로, 2030년에는 950테라와트시까지 늘 전망이에요. 효율이 좋아져도 더 많이 쓰게 되는 제번스 역설 때문에 총량은 계속 늘어요.

그러니 교실에서는 작업의 크기와 횟수를 같이 봐야 해요. 글로 되는 일은 글로 하고, 영상은 스토리보드와 프롬프트를 먼저 확정해서 한 번에 만들어요. 마음에 든 결과의 시드와 프롬프트를 기록해 두면 같은 걸 다시 뽑느라 쓰는 전기를 줄일 수 있어요.`
};
