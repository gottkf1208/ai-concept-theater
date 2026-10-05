/* S777-57 카메라 없는 AI 안경, 시험장에서는?: 음성 인터페이스·웨이크 워드·평가 공정성 */
const GLASSES = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="8" height="6" rx="2.5"/><rect x="14" y="9" width="8" height="6" rx="2.5"/><path d="M10 11.5c1.2-1 2.8-1 4 0M2 10L1 7M22 10l1-3"/></svg>';

export default {
  slug: 't7-audio-glasses-exam',
  track: 'S777',
  title: '카메라 없는 AI 안경, 시험장에서는?',
  subtitle: '음성 인터페이스·웨이크 워드·평가 공정성',
  summary: '9월 23일 Meta가 카메라 없이 귀와 입으로만 쓰는 AI 안경 Ray-Ban Meta Audio를 공개했어요. 같은 달 29일 우리나라에서는 국가자격시험장이 스마트안경 부정행위 모의 훈련을 했고, 교육부는 토픽 개편안에 AI 안경 탐지를 넣었어요. 화면 없는 음성 인터페이스가 어떻게 움직이는지, 시험장은 무엇으로 찾아내는지, 학교 평가에서는 무엇을 미리 정해 둘지 짚어요.',
  keywords: ['음성 인터페이스', '오디오 전용 웨어러블', '웨이크 워드', '키워드 검출', '개방형 스피커', '마이크 배열', 'AI 에이전트', 'Muse', 'Ray-Ban Meta Audio', '전파탐지기', '블루투스', '시험 공정성', '수행평가', '토픽'],

  scenes: [
    {
      title: '카메라 없는 AI 안경', dur: 13,
      captions: [
        { t: 0, text: '9월 23일 Meta가 <em>카메라 없는</em> AI 안경 Ray-Ban Meta Audio를 공개했어요.' },
        { t: 4.5, text: '마이크 6개로 듣고 귀를 막지 않는 스피커로 말해요. 안경용 개인 AI 에이전트 Muse도 함께 발표했어요.' },
        { t: 9.5, text: '이렇게 귀와 입만 쓰는 안경, 시험장에서는 어떻게 될까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const date = P.chip({ x: 330, y: 96, text: '9/23 Meta · Ray-Ban Meta Audio', color: 'ink', size: 22 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const glass = P.box({ x: 330, y: 160, w: 400, h: 170, label: 'AI 안경', sub: 'Ray-Ban Meta Audio', accent: 'aqua', icon: GLASSES });
        tl.at(stage.appendChild(glass.el), 1, { from: 'up' });
        const nocam = P.box({ x: 770, y: 160, w: 420, h: 170, label: '카메라 없음', sub: '듣고 말하기만 해요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(nocam.el), 2.2, { from: 'right' });
        const chips = [
          [330, '마이크 6개', 'aqua'],
          [500, '귀를 막지 않는 스피커', 'aqua'],
          [800, '43g', 'gray']
        ].map(([x, text, color], i) => {
          const c = P.chip({ x, y: 370, text, color, size: 22 });
          tl.at(stage.appendChild(c.el), 4.8 + i * .6, { from: 'pop' });
          return c;
        });
        const muse = P.text({ x: 330, y: 440, w: 880, text: 'Meta는 개인 AI 에이전트 <i>Muse</i>도 함께 발표했어요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(muse.el), 7, { from: 'up' });
        const final = P.text({ x: 330, y: 510, w: 880, text: '귀와 입만 쓰는 안경, <em>시험장에서는?</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            glass.on(t > 1 && t < 4.5);
            nocam.on(t > 2.2);
          }
        };
      }
    },
    {
      title: '화면 대신 말로', dur: 14,
      captions: [
        { t: 0, text: '화면이 없으니 시작 신호는 <em>웨이크 워드</em>, 곧 기기를 깨우는 부름말이에요.' },
        { t: 4.5, text: '부름말 하나만 늘 기다리는 일을 <em>키워드 검출</em>이라고 해요. 2017년 연구는 전력을 아주 적게 쓰는 칩에서 작은 신경망으로 95% 넘게 알아들었어요.' },
        { t: 10, text: '듣고 답해서 귀로만 들려주니 <em>겉으로는 거의 티가 안 나요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const steps = [
          ['웨이크 워드', '"Hey Meta"', 'aqua'],
          ['질문 듣기', '마이크 6개', ''],
          ['답 만들기', 'AI가 처리', ''],
          ['귀로 답', '개방형 스피커', 'ink']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 330 + i * 230, y: 100, w: 200, h: 120, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 533 + i * 230, y1: 160, x2: 557 + i * 230, y2: 160, width: 4, color: '#1B1F24' }));
        const small = P.chip({ x: 330, y: 238, text: '늘 듣는 작은 모델', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(small.el), 4.6, { from: 'pop' });
        const kws = P.box({ x: 330, y: 300, w: 600, h: 110, label: '키워드 검출', sub: '부름말 하나만 기다리는 작은 신경망', accent: 'ink' });
        tl.at(stage.appendChild(kws.el), 5.2, { from: 'up' });
        const research = P.text({ x: 330, y: 432, w: 890, text: '2017년 연구: 전력을 아주 적게 쓰는 칩에서 정확도 95.4%', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(research.el), 7.2, { from: 'up' });
        const final = P.text({ x: 330, y: 500, w: 890, text: '듣고 답해서 귀로만 들려주니 <em>겉으로는 거의 티가 안 나요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            steps.forEach((b, i) => b.on(t > .3 + i * .7 && (i > 0 || t < 4.5)));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (.8 + i * .7)) / .4, 0, 1)));
            kws.on(t > 5.2 && t < 10);
          }
        };
      }
    },
    {
      title: '9월 29일, 시험장 모의 훈련', dur: 13,
      captions: [
        { t: 0, text: '같은 달 29일, 한국산업인력공단은 울산 국가자격시험장에서 <em>스마트안경 부정행위</em>를 가정한 모의 훈련을 했어요.' },
        { t: 6.5, text: '시험 전 소지품을 전부 확인하고 시험 중에는 <em>전파탐지기</em>로 현장을 점검하는 순서를 맞춰 봤어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const date = P.chip({ x: 330, y: 96, text: '9/29 한국산업인력공단 · 울산 국가자격시험장', color: 'ink', size: 20 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const steps = [
          ['시험위원 교육', '스마트안경 상황 가정', '', P.ICON.doc],
          ['소지품 전수조사', '시험 전 수험자 안내', '', P.ICON.search],
          ['전파탐지기 점검', '시험 중 현장 점검', 'orange', P.ICON.check]
        ].map(([label, sub, accent, icon], i) => {
          const b = P.box({ x: 330 + i * 300, y: 170, w: 270, h: 150, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), 1.6 + i * 1.4, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 603 + i * 300, y1: 245, x2: 627 + i * 300, y2: 245, width: 4, color: '#1B1F24' }));
        const tf = P.chip({ x: 330, y: 360, text: "8월: 'AI 활용 부정행위 대응체계 고도화 TF' 구성", color: 'gray', size: 20 });
        tl.at(stage.appendChild(tf.el), 6.8, { from: 'pop' });
        const final = P.text({ x: 330, y: 430, w: 880, text: '스마트안경 부정행위를 가정하고 <em>단계별 대응 절차</em>를 점검했어요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            steps.forEach((b, i) => b.on(t > 1.6 + i * 1.4));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (2.4 + i * 1.4)) / .4, 0, 1)));
          }
        };
      }
    },
    {
      title: '탐지기는 신호를 찾아요', dur: 14,
      captions: [
        { t: 0, text: '같은 날 교육부는 국가 공인 한국어시험 토픽 개편안에서 AI 안경의 <em>블루투스·와이파이 신호</em>를 감지하는 전파탐지기를 국내 시험장에 다 보급했다고 밝혔어요.' },
        { t: 7, text: '겉모양이 평범해도 통신을 하면 신호가 나와요. 규정에도 <em>AI 안경 등 AI 이용 금지</em>를 글로 적어 뒀어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const glass = P.box({ x: 330, y: 130, w: 300, h: 160, label: '평범한 안경?', sub: '겉모양으로는 몰라요', icon: GLASSES });
        tl.at(stage.appendChild(glass.el), .3, { from: 'up' });
        const waves = [26, 50, 74].map(r => {
          const p = P.s('path', { d: `M670 ${210 - r} A${r} ${r} 0 0 1 670 ${210 + r}`, fill: 'none', stroke: '#F2812D', 'stroke-width': 4, 'stroke-linecap': 'round' });
          p.style.opacity = 0;
          lines.append(p);
          return p;
        });
        const sig = P.chip({ x: 640, y: 310, text: '블루투스 · 와이파이', color: 'orange', size: 20 });
        tl.at(stage.appendChild(sig.el), 2.4, { from: 'pop' });
        const det = P.box({ x: 880, y: 130, w: 320, h: 160, label: '전파탐지기', sub: '무선 신호를 감지해요', accent: 'aqua', icon: P.ICON.search });
        tl.at(stage.appendChild(det.el), 3.4, { from: 'right' });
        const topik = P.chip({ x: 330, y: 390, text: '토픽: 국내 시험장 보급 완료, 2027년 국외 보급', color: 'gray', size: 20 });
        tl.at(stage.appendChild(topik.el), 5, { from: 'pop' });
        const final = P.text({ x: 330, y: 460, w: 880, text: '규정에도 <em>AI 안경 등 AI 이용 금지</em>를 글로 적어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            waves.forEach((p, i) => {
              if (t < 1.6) { p.style.opacity = 0; return; }
              const ph = ((t - 1.6) * 1.2 - i * .33) % 1;
              p.style.opacity = ph < 0 ? 0 : (0.25 + 0.75 * (1 - ph)).toFixed(2);
            });
            det.on(t > 3.4);
          }
        };
      }
    },
    {
      title: '우리 학교 평가는', dur: 12,
      captions: [
        { t: 0, text: '학교 평가도 같아요. <em>평가 전에</em> 쓰면 안 되는 기기를 이름으로 알려 주고, 무선 기기는 미리 모아 둬요.' },
        { t: 6, text: '꼭 필요한 보조기기는 <em>미리 신청</em>받아 따로 확인하면 공정함과 배려를 함께 지킬 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['① 평가 전 알리기', '허용·금지 기기를 이름으로 적어요', 'aqua'],
          ['② 무선 기기 보관', '평가 전에 미리 모아 둬요', ''],
          ['③ 보조기기 미리 신청', '꼭 필요한 기기는 따로 확인해요', 'orange']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 400, y: 100 + i * 120, w: 800, h: 100, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 480, w: 800, text: '공정함은 <em>미리 알린 규칙</em>에서 시작해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 11);
            items.forEach((b, i) => b.on(t > .3 + i * 1.6));
          }
        };
      }
    }
  ],

  interaction: {
    title: '시험장 점검 시뮬레이터',
    desc: '책상 6개에 물건이 하나씩 놓여 있어요. <b>전파탐지기로 점검</b>과 <b>눈으로만 점검</b>을 번갈아 눌러 찾아내는 개수를 비교해 보세요. <b>평가 전 보관</b>을 누르면 무선 기기를 보관함으로 옮겨요.',
    mount(el, P) {
      const ICONS = {
        glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="8" height="6" rx="2.5"/><rect x="14" y="9" width="8" height="6" rx="2.5"/><path d="M10 11.5c1.2-1 2.8-1 4 0"/></svg>',
        cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="8" height="6" rx="2.5"/><rect x="14" y="9" width="8" height="6" rx="2.5"/><path d="M10 11.5c1.2-1 2.8-1 4 0"/><circle cx="4" cy="6" r="1.6"/></svg>',
        bud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><path d="M8 12v7"/><circle cx="16" cy="9" r="3"/><path d="M16 12v7"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
        book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5z"/></svg>'
      };
      const DESKS = [
        { n: '①', name: '일반 안경', icon: 'glass', signal: false, camera: false },
        { n: '②', name: '카메라 있는 AI 안경', icon: 'cam', signal: true, camera: true },
        { n: '③', name: '카메라 없는 오디오 AI 안경', icon: 'glass', signal: true, camera: false },
        { n: '④', name: '무선 이어폰', icon: 'bud', signal: true, camera: false },
        { n: '⑤', name: '전원 끈 휴대폰(가방 보관)', icon: 'phone', signal: false, camera: false },
        { n: '⑥', name: '종이 사전', icon: 'book', signal: false, camera: false }
      ];
      let mode = 'none';
      let stored = false;

      const radioBtn = P.h('button', { class: 'btn primary', type: 'button' }, '전파탐지기로 점검');
      const eyeBtn = P.h('button', { class: 'btn', type: 'button' }, '눈으로만 점검');
      const storeBtn = P.h('button', { class: 'btn', type: 'button' }, '평가 전 보관');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 처음');
      const grid = P.h('div', { class: 'sim-ex-grid' });
      const box = P.h('div', { class: 'sim-ex-store' });
      const status = P.h('div', { class: 'sim-ex-status', 'aria-live': 'polite' });

      el.append(P.h('div', { class: 'sim-ex' },
        P.h('div', { class: 'sim-ex-bar' }, radioBtn, eyeBtn, storeBtn, resetBtn),
        grid, box, status,
        P.h('div', { class: 'sim-ex-note' }, '원리를 보여 주는 예시예요. 실제 시험장 절차는 각 시험 공고를 따르세요.')
      ));
      el.append(P.h('style', { html: `
        .sim-ex{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-ex-bar{display:flex;gap:8px;flex-wrap:wrap}
        .sim-ex-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;max-width:100%}
        .sim-ex-desk{position:relative;border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px;display:flex;flex-direction:column;gap:6px;min-width:0;min-height:96px}
        .sim-ex-desk .ic{width:30px;height:30px;color:var(--ink-soft,#1B1F24)}
        .sim-ex-desk .ic svg{width:100%;height:100%}
        .sim-ex-name{font-size:13px;font-weight:700;word-break:keep-all;line-height:1.35}
        .sim-ex-tag{align-self:flex-start;font-size:12px;font-weight:700;border-radius:999px;padding:2px 9px}
        .sim-ex-desk.hit{border-color:var(--acc2,#F2812D);box-shadow:0 0 0 4px color-mix(in srgb,var(--acc2,#F2812D) 22%,transparent)}
        .sim-ex-desk.hit .sim-ex-tag{background:var(--acc2,#F2812D);color:#fff}
        .sim-ex-desk.seen{border-color:var(--acc1,#127E90);box-shadow:0 0 0 4px color-mix(in srgb,var(--acc1,#127E90) 20%,transparent)}
        .sim-ex-desk.seen .sim-ex-tag{background:var(--acc1,#127E90);color:#fff}
        .sim-ex-desk.away{opacity:.45;border-style:dashed}
        .sim-ex-store{border:1px dashed #9AA5AF;border-radius:12px;padding:10px 12px;font-size:13px;color:var(--muted);word-break:keep-all}
        .sim-ex-store b{color:var(--ink-soft,#1B1F24)}
        .sim-ex-status{font-size:15px;font-weight:700;line-height:1.5;word-break:keep-all}
        .sim-ex-note{font-size:12px;color:var(--muted)}
      ` }));

      function render() {
        grid.innerHTML = '';
        let hits = 0;
        DESKS.forEach(d => {
          const away = stored && d.signal;
          let cls = 'sim-ex-desk';
          let tag = '';
          if (away) { cls += ' away'; tag = '보관함으로 옮김'; }
          else if (mode === 'radio' && d.signal) { cls += ' hit'; tag = '신호 감지'; hits++; }
          else if (mode === 'eye' && d.camera) { cls += ' seen'; tag = '카메라 보임'; hits++; }
          const kids = [P.h('span', { class: 'ic', html: ICONS[d.icon] }), P.h('div', { class: 'sim-ex-name' }, `${d.n} ${d.name}`)];
          if (tag) kids.push(P.h('span', { class: 'sim-ex-tag' }, tag));
          grid.append(P.h('div', { class: cls }, ...kids));
        });
        const awayNames = DESKS.filter(d => d.signal).map(d => d.n).join(' ');
        box.innerHTML = stored ? `보관함: <b>${awayNames}</b> (무선 기기 3개)` : '보관함: 비어 있어요';
        if (mode === 'radio' && !stored) status.textContent = `6개 중 ${hits}개에서 무선 신호가 잡혔어요. ③은 카메라가 없어도 신호로 찾았어요.`;
        else if (mode === 'radio' && stored) status.textContent = '무선 기기를 평가 전에 보관해서, 책상 위에서 잡힌 신호는 0개예요.';
        else if (mode === 'eye' && !stored) status.textContent = `눈으로는 ${hits}개만 찾았어요. 카메라가 보이는 ②뿐이에요.`;
        else if (mode === 'eye' && stored) status.textContent = '무선 기기를 미리 보관해서, 눈으로 볼 것도 남지 않았어요.';
        else if (stored) status.textContent = '무선 기기 3개를 보관함으로 옮겼어요. 이제 점검해 보세요.';
        else status.textContent = '책상 6개예요. 점검 방법을 골라 보세요.';
      }
      radioBtn.addEventListener('click', () => { mode = 'radio'; render(); });
      eyeBtn.addEventListener('click', () => { mode = 'eye'; render(); });
      storeBtn.addEventListener('click', () => { stored = true; render(); });
      resetBtn.addEventListener('click', () => { mode = 'none'; stored = false; render(); });
      render();
    }
  },

  teacherLines: [
    '카메라가 없어도 <b>듣고 말하는 AI</b>는 귀로 답을 줄 수 있어요. 그래서 시험장은 겉모양이 아니라 <b>무선 신호</b>를 찾아요.',
    '평가의 공정함은 <b>미리 알린 규칙</b>에서 시작해요. 쓸 수 있는 것과 없는 것을 시험 전에 정해요.'
  ],
  tip: {
    body: '수행평가 안내문에 <b>"AI 안경·무선 이어폰·스마트워치는 평가 전 보관"</b>처럼 허용·금지 기기를 이름으로 적어 두세요. 규정이 글로 있어야 학생도 억울하지 않아요.',
    extra: '청각 보조기기처럼 꼭 필요한 기기는 평가 전에 신청받아 따로 확인해요. 학생들과 "AI 안경을 쓰면 왜 불공정한가"를 토론하면, 기기 금지를 벌칙이 아니라 공정의 문제로 받아들여요.'
  },
  myth: {
    myth: '카메라가 없는 안경이면 시험장에서 써도 문제없다.',
    fact: '카메라가 없어도 마이크와 스피커로 AI에게 묻고 귀로 답을 들을 수 있어요. 그래서 토픽 개편안은 AI 안경 이용 금지를 명시하고, 블루투스·와이파이 신호를 감지하는 전파탐지기를 시험장에 보급했어요.'
  },
  sources: [
    { title: 'Meta: Introducing Ray-Ban Meta Audio, new styles, plus Muse', url: 'https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/', note: '2026-09-23, 카메라 없는 오디오 전용 안경, 마이크 6개, "Hey Meta", 개인 AI 에이전트 Muse.' },
    { title: '정책브리핑: 국가자격시험 인공지능(AI) 활용 부정행위 대응 역량 강화', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156783497', note: '2026-09-29, 울산 시험장 스마트안경 모의 훈련, 소지품 전수조사·전파탐지기, 8월 TF.' },
    { title: '정책브리핑: 국가 공인 한국어시험 토픽, 2029년 평가 개편 및 인공지능·디지털 기반 체제로 전환', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156783460', note: '2026-09-29, AI 안경 등의 블루투스·와이파이 신호를 감지하는 전파탐지기, AI 안경 등 AI 이용 금지 명시.' },
    { title: 'Hello Edge: Keyword Spotting on Microcontrollers (arXiv, 2017)', url: 'https://arxiv.org/abs/1711.07128', note: '늘 켜진 키워드 검출을 작은 칩에서 돌리는 연구예요.' }
  ],
  script: `9월 23일 Meta가 카메라 없는 AI 안경 Ray-Ban Meta Audio를 공개했어요. 마이크 6개로 듣고 귀를 막지 않는 스피커로 말해요. 화면이 없으니 시작 신호는 웨이크 워드, 곧 기기를 깨우는 부름말이에요. 이 부름말만 기다리는 키워드 검출은 아주 작은 칩에서도 돌 수 있어요. 그래서 겉으로는 거의 티가 안 나요.

같은 달 29일 한국산업인력공단은 울산 국가자격시험장에서 스마트안경 부정행위를 가정한 모의 훈련을 했어요. 같은 날 교육부 토픽 개편안은 AI 안경의 블루투스·와이파이 신호를 감지하는 전파탐지기를 국내 시험장에 다 보급했다고 밝혔고, AI 안경 이용 금지도 규정에 적었어요.

학교 평가도 같아요. 쓰면 안 되는 기기는 평가 전에 이름으로 알리고, 무선 기기는 미리 모아 둬요. 꼭 필요한 보조기기는 미리 신청받아 따로 확인해요.`
};
