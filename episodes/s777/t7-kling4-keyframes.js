/* S777-56 영상 중간중간에 정답 그림을 박아 두면: 키프레임·참조 조건·사이 채우기 */
export default {
  slug: 't7-kling4-keyframes',
  track: 'S777',
  title: '영상 중간중간에 정답 그림을 박아 두면',
  subtitle: '키프레임·참조 조건·사이 채우기',
  summary: '9월 30일 Kling이 Kling 4.0의 세부를 공개했어요. 3~30초 영상에 키프레임은 최대 10개, 참조 자료는 최대 15개까지 넣어요. 시간 축 위에 "이 순간은 이 그림"이라는 고정점을 박고 그 사이만 모델이 채우는 원리, 인물·소품 같은 참조 자료가 맡는 역할, 고정점을 몇 개 둘지 정하는 판단까지 짚어요.',
  keywords: ['키프레임', '시간 축', '사이 채우기', '인비트위닝', '첫 프레임', '끝 프레임', '참조 조건', '참조-영상 생성', '피사체 참조', '스토리보드', 'Kling 4.0'],

  scenes: [
    {
      title: '9월 30일, 키프레임 10개', dur: 13,
      captions: [
        { t: 0, text: '9월 30일 Kling이 영상 생성 모델 <em>Kling 4.0</em>의 세부를 공개했어요. 조기 접근은 9월 28일부터, 정식 모델은 10월이에요.' },
        { t: 5, text: '3초에서 30초 영상에 <em>키프레임</em>을 10개까지, 참조 자료를 15개까지 넣을 수 있어요.' },
        { t: 9.5, text: '키프레임이 뭐길래 이 숫자를 앞세웠을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const date = P.chip({ x: 330, y: 96, text: '9/30 Kling · Kling 4.0', color: 'ink', size: 22 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const when = P.text({ x: 330, y: 146, w: 760, text: '조기 접근 9월 28일 · 정식 모델 10월', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(when.el), 1, { from: 'up' });
        const axis = P.arrow(lines, { x1: 380, y1: 300, x2: 1222, y2: 300, width: 4, color: '#1B1F24', head: false });
        const flags = Array.from({ length: 10 }, (_, i) => {
          const x = 380 + i * (840 / 9);
          const g = P.s('g', {},
            P.s('line', { x1: x, y1: 300, x2: x, y2: 232, stroke: '#1B1F24', 'stroke-width': 3, 'stroke-linecap': 'round' }),
            P.s('path', { d: `M${x} 232 L${x + 32} 244 L${x} 256 Z`, fill: '#127E90' }));
          g.style.opacity = 0;
          lines.append(g);
          return g;
        });
        const l0 = P.text({ x: 366, y: 316, w: 70, text: '0초', size: 18, weight: 700, cls: 'muted' });
        const l1 = P.text({ x: 1196, y: 316, w: 70, text: '30초', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(l0.el), 2, { from: 'up' });
        tl.at(stage.appendChild(l1.el), 2.4, { from: 'up' });
        const chips = [
          [380, '3~30초 영상', 'aqua'],
          [590, '키프레임 최대 10개', 'aqua'],
          [850, '참조 자료 최대 15개', 'orange']
        ].map(([x, text, color], i) => {
          const c = P.chip({ x, y: 380, text, color, size: 22 });
          tl.at(stage.appendChild(c.el), 5.3 + i * .7, { from: 'pop' });
          return c;
        });
        const final = P.text({ x: 380, y: 460, w: 840, text: '키프레임이 뭐길래 이 숫자를 앞세웠을까요?', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            axis.draw(P.clamp((t - 1.6) / .8, 0, 1));
            flags.forEach((g, i) => { g.style.opacity = P.clamp((t - (5.6 + i * .25)) / .3, 0, 1); });
          }
        };
      }
    },
    {
      title: '"몇 초에 어떤 모습"은 글로 어려워요', dur: 13,
      captions: [
        { t: 0, text: '글 프롬프트는 무엇이 일어나는지는 말해 줘도, <em>몇 초에 어떤 모습</em>인지는 정하기 어려워요.' },
        { t: 6, text: '<em>키프레임</em>은 애니메이션 용어예요. 시간 축 위 특정 순간의 정답 그림을 말해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const prompt = P.box({ x: 330, y: 100, w: 440, h: 170, label: '글 프롬프트', sub: '"쿼카가 문을 열고 들어와<br>칠판 앞에서 인사한다"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(prompt.el), .3, { from: 'up' });
        const axis = P.arrow(lines, { x1: 820, y1: 230, x2: 1220, y2: 230, width: 4, color: '#1B1F24', head: false });
        const l0 = P.text({ x: 806, y: 246, w: 60, text: '0초', size: 18, weight: 700, cls: 'muted' });
        const l1 = P.text({ x: 1196, y: 246, w: 60, text: '8초', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(l0.el), 1.4, { from: 'up' });
        tl.at(stage.appendChild(l1.el), 1.6, { from: 'up' });
        const qa = P.chip({ x: 830, y: 140, text: '문 열기는 몇 초?', color: 'orange', size: 20 });
        const qb = P.chip({ x: 1010, y: 276, text: '인사는 언제?', color: 'orange', size: 20 });
        tl.at(stage.appendChild(qa.el), 2.6, { from: 'pop' });
        tl.at(stage.appendChild(qb.el), 3.4, { from: 'pop' });
        const def = P.box({ x: 330, y: 340, w: 890, h: 110, label: '키프레임', sub: '시간 축 위 특정 순간의 정답 그림', accent: 'aqua' });
        tl.at(stage.appendChild(def.el), 6.2, { from: 'up' });
        const final = P.text({ x: 330, y: 490, w: 890, text: '글은 <em>무엇</em>을, 키프레임은 <em>언제 어떤 모습</em>을 정해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            prompt.on(t > .3 && t < 6);
            axis.draw(P.clamp((t - 1) / .6, 0, 1));
            def.on(t > 6.2);
          }
        };
      }
    },
    {
      title: '고정점 사이만 채워요', dur: 14,
      captions: [
        { t: 0, text: '키프레임을 박아 두면 모델은 고정점과 고정점 <em>사이</em>만 채우면 돼요.' },
        { t: 4.5, text: '2024년 연구는 첫 그림에서 앞으로 가는 모델과 끝 그림에서 뒤로 가는 모델을 함께 돌려 가운데서 만나게 했어요.' },
        { t: 9.5, text: '공식 영상 API 문서도 첫 프레임은 주 입력, 끝 프레임은 <em>생성 제약</em>으로 넣는다고 적어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const k0 = P.box({ x: 330, y: 110, w: 240, h: 130, label: '0초 · 문 앞', sub: '첫 키프레임', accent: 'aqua' });
        const mid = P.box({ x: 610, y: 110, w: 330, h: 130, label: '사이 구간', sub: '모델이 채워요' });
        const k1 = P.box({ x: 980, y: 110, w: 240, h: 130, label: '8초 · 칠판 앞', sub: '끝 키프레임', accent: 'aqua' });
        tl.at(stage.appendChild(k0.el), .3, { from: 'up' });
        tl.at(stage.appendChild(k1.el), .9, { from: 'up' });
        tl.at(stage.appendChild(mid.el), 2, { from: 'pop' });
        const fwd = P.arrow(lines, { x1: 450, y1: 266, x2: 770, y2: 266, width: 4, color: '#127E90' });
        const back = P.arrow(lines, { x1: 1100, y1: 296, x2: 790, y2: 296, width: 4, color: '#F2812D' });
        const cf = P.chip({ x: 330, y: 330, text: '앞으로 가는 모델', color: 'aqua', size: 20 });
        const cm = P.chip({ x: 690, y: 330, text: '가운데서 만나요', color: 'gray', size: 20 });
        const cb = P.chip({ x: 1000, y: 330, text: '뒤로 가는 모델', color: 'orange', size: 20 });
        tl.at(stage.appendChild(cf.el), 5, { from: 'pop' });
        tl.at(stage.appendChild(cb.el), 6, { from: 'pop' });
        tl.at(stage.appendChild(cm.el), 7.2, { from: 'pop' });
        const research = P.text({ x: 330, y: 400, w: 890, text: '2024년 연구: 두 키프레임에서 각각 출발한 영상을 겹쳐 합쳐요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(research.el), 7.8, { from: 'up' });
        const api = P.box({ x: 330, y: 470, w: 890, h: 110, label: '공식 영상 API 문서', sub: '첫 프레임은 주 입력, 끝 프레임은 생성 제약', accent: 'ink', });
        tl.at(stage.appendChild(api.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9.5);
            k0.on(t > .3); k1.on(t > .9);
            fwd.draw(P.clamp((t - 5) / .9, 0, 1));
            back.draw(P.clamp((t - 6) / .9, 0, 1));
            mid.on(t > 7.2);
          }
        };
      }
    },
    {
      title: '참조는 누구, 키프레임은 언제', dur: 13,
      captions: [
        { t: 0, text: '<em>참조 자료</em>는 누가, 무엇이, 어떤 느낌인지를 붙잡아요. 시간은 키프레임 몫이에요. 얼굴 붙잡기는 v2 일관성 편에서 봤죠.' },
        { t: 6.5, text: '2025년 연구는 참조 그림, 편집할 영상, 가릴 영역을 한 묶음 조건으로 넣었어요. 키프레임과 참조는 서로 다른 칸을 맡아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const refs = [
          ['인물', '얼굴·머리·옷', 'aqua'],
          ['소품', '모양·색', 'orange'],
          ['분위기', '빛·색감', 'ink']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 330 + i * 220, y: 100, w: 200, h: 120, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const cRef = P.chip({ x: 330, y: 236, text: '참조 = 누가·무엇이', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(cRef.el), 2, { from: 'pop' });
        const axis = P.arrow(lines, { x1: 330, y1: 342, x2: 975, y2: 342, width: 4, color: '#1B1F24', head: false });
        const flags = [420, 650, 880].map(x => {
          const g = P.s('g', {},
            P.s('line', { x1: x, y1: 342, x2: x, y2: 290, stroke: '#1B1F24', 'stroke-width': 3, 'stroke-linecap': 'round' }),
            P.s('path', { d: `M${x} 290 L${x + 30} 301 L${x} 312 Z`, fill: '#F2812D' }));
          g.style.opacity = 0;
          lines.append(g);
          return g;
        });
        const cKey = P.chip({ x: 330, y: 362, text: '키프레임 = 언제', color: 'orange', size: 20 });
        tl.at(stage.appendChild(cKey.el), 3.4, { from: 'pop' });
        const video = P.box({ x: 1010, y: 150, w: 220, h: 200, label: '영상', sub: '두 조건을<br>함께 받아요', accent: 'aqua', icon: P.ICON.video });
        tl.at(stage.appendChild(video.el), 4.4, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 975, y1: 160, x2: 1004, y2: 205, width: 3, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 980, y1: 342, x2: 1004, y2: 305, width: 3, color: '#1B1F24' });
        const kling = P.chip({ x: 330, y: 430, text: 'Kling 4.0 참조 최대: 이미지 10 · 영상 5 · 피사체 7 (합계 15)', color: 'gray', size: 20 });
        tl.at(stage.appendChild(kling.el), 5.4, { from: 'pop' });
        const vace = P.text({ x: 330, y: 490, w: 890, text: '2025년 연구: 참조 그림·편집할 영상·가릴 영역을 <i>한 묶음 조건</i>으로 넣어요.', size: 22, weight: 700 });
        tl.at(stage.appendChild(vace.el), 6.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            refs.forEach((b, i) => b.on(t > .3 + i * .5 && t < 3));
            axis.draw(P.clamp((t - 2.6) / .6, 0, 1));
            flags.forEach((g, i) => { g.style.opacity = P.clamp((t - (3 + i * .3)) / .3, 0, 1); });
            a1.draw(P.clamp((t - 4.8) / .5, 0, 1));
            a2.draw(P.clamp((t - 5) / .5, 0, 1));
            video.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '전환점에만 깃발을', dur: 13,
      captions: [
        { t: 0, text: '키프레임을 촘촘히 박으면 원하는 대로 가지만 고정점끼리 안 맞으면 모델이 <em>억지로 이어요</em>.' },
        { t: 6, text: '학생 영상은 등장, 전환, 마무리처럼 <em>이야기가 꺾이는 순간</em>에만 키프레임을 두게 해요. 긴 영상이 무너지는 이유는 v4 긴 영상 편에서 다뤘어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const head = P.text({ x: 330, y: 96, w: 600, text: '좋은 예: 이야기 전환점 4곳', size: 22, weight: 800 });
        tl.at(stage.appendChild(head.el), 6.2, { from: 'up' });
        const axis = P.arrow(lines, { x1: 330, y1: 212, x2: 1212, y2: 212, width: 4, color: '#1B1F24', head: false });
        const marks = [[0, '등장'], [9, '전환'], [19, '공개'], [30, '마무리']].map(([sec, label], i) => {
          const x = 330 + sec / 30 * 880;
          const g = P.s('g', {},
            P.s('line', { x1: x, y1: 212, x2: x, y2: 152, stroke: '#1B1F24', 'stroke-width': 3, 'stroke-linecap': 'round' }),
            P.s('path', { d: `M${x} 152 L${x + 30} 163 L${x} 174 Z`, fill: '#127E90' }));
          g.style.opacity = 0;
          lines.append(g);
          const c = P.chip({ x: Math.min(x - 8, 1170), y: 228, text: label, color: 'aqua', size: 18 });
          tl.at(stage.appendChild(c.el), 6.6 + i * .5, { from: 'pop' });
          return g;
        });
        const bad = P.box({ x: 330, y: 300, w: 400, h: 140, label: '1초마다 깃발', sub: '서로 안 맞으면 억지로 이어요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(bad.el), .4, { from: 'up' });
        const steps = P.box({ x: 770, y: 300, w: 440, h: 160, label: '세 단계', sub: '① 전환점 고르기<br>② 그 순간만 키프레임<br>③ 인물·소품은 참조로', accent: 'aqua' });
        tl.at(stage.appendChild(steps.el), 8.4, { from: 'up' });
        const final = P.text({ x: 330, y: 500, w: 880, text: '깃발은 <em>이야기가 꺾이는 순간</em>에만 꽂아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            bad.on(t > .4 && t < 6);
            axis.draw(P.clamp((t - 5.8) / .6, 0, 1));
            marks.forEach((g, i) => { g.style.opacity = P.clamp((t - (6.6 + i * .5)) / .3, 0, 1); });
            steps.on(t > 8.4);
          }
        };
      }
    }
  ],

  interaction: {
    title: '키프레임 타임라인',
    desc: '30초짜리 학급 영상의 시간 축이에요. 처음엔 0초와 30초에만 깃발(키프레임)이 있어요. <b>키프레임 추가</b>를 누를 때마다 깃발이 하나씩 꽂히고, 모델이 혼자 채워야 하는 <b>빈 구간</b>이 줄어들어요. <b>참조 자료 붙이기</b>를 켜면 깃발과 달리 전 구간에 걸치는 띠가 생겨요. 빈 구간 규칙은 원리를 보여 주는 예시 값이에요.',
    mount(el, P) {
      const SCENES = { 0: '문 앞', 4: '문 열기', 8: '칠판 앞', 11: '인사', 15: '지도 펼치기', 18: '가리키기', 21: '질문', 24: '웃기', 27: '손 흔들기', 30: '나가기' };
      const ORDER = [15, 8, 24, 4, 18, 27, 11, 21];
      let keys = [0, 30];
      let step = 0;

      const addBtn = P.h('button', { class: 'btn primary', type: 'button' }, '키프레임 추가');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 처음');
      const refCb = P.h('input', { type: 'checkbox', id: 'sim-kf-ref' });
      const refLab = P.h('label', { for: 'sim-kf-ref', class: 'sim-kf-check' }, refCb, ' 참조 자료 붙이기(인물·소품)');
      const band = P.h('div', { class: 'sim-kf-band' }, '인물·소품 모습 유지 (전 구간)');
      const flagsEl = P.h('div', { class: 'sim-kf-flags' });
      const segsEl = P.h('div', { class: 'sim-kf-segs' });
      const track = P.h('div', { class: 'sim-kf-track' }, band, flagsEl, P.h('div', { class: 'sim-kf-line' }), segsEl);
      const status = P.h('div', { class: 'sim-kf-status' });
      const rule = P.h('div', { class: 'sim-kf-rule' });
      const list = P.h('div', { class: 'sim-kf-list' });

      el.append(P.h('div', { class: 'sim-kf' },
        P.h('div', { class: 'sim-kf-bar' }, addBtn, resetBtn, refLab),
        track, status, list, rule,
        P.h('div', { class: 'sim-kf-note' }, '원리를 보여 주는 예시예요. 실제 모델의 키프레임 처리 방식은 공개되지 않았어요.')
      ));
      el.append(P.h('style', { html: `
        .sim-kf{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-kf-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
        .sim-kf-check{font-size:14px;display:flex;align-items:center;gap:6px;cursor:pointer}
        .sim-kf-track{position:relative;background:var(--paper);border-radius:14px;padding:12px 18px 14px;max-width:100%;box-sizing:border-box}
        .sim-kf-band{font-size:12px;font-weight:700;color:var(--muted);border:1px dashed #9AA5AF;border-radius:8px;padding:4px 8px;margin-bottom:8px;text-align:center}
        .sim-kf-band.on{color:#fff;background:var(--acc1,#127E90);border:1px solid var(--acc1,#127E90)}
        .sim-kf-flags{position:relative;height:34px}
        .sim-kf-flag{position:absolute;bottom:0;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;font-size:11px;font-weight:700;color:var(--ink-soft,#1B1F24)}
        .sim-kf-flag i{display:block;width:3px;height:16px;background:var(--ink-soft,#1B1F24);border-radius:2px}
        .sim-kf-flag.new{color:var(--acc2,#F2812D)}
        .sim-kf-line{height:4px;background:var(--ink-soft,#1B1F24);border-radius:2px}
        .sim-kf-segs{display:flex;margin-top:8px;height:26px;border-radius:8px;overflow:hidden}
        .sim-kf-seg{display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;border-right:2px solid var(--paper);box-sizing:border-box;min-width:0;overflow:hidden}
        .sim-kf-seg:last-child{border-right:0}
        .sim-kf-status{font-size:15px;font-weight:700;word-break:keep-all}
        .sim-kf-status b{color:var(--acc2,#F2812D)}
        .sim-kf-list{display:flex;flex-wrap:wrap;gap:6px}
        .sim-kf-item{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:3px 10px;background:#fff}
        .sim-kf-rule{font-size:14px;line-height:1.5;word-break:keep-all;min-height:1em}
        .sim-kf-rule.on{border:1px solid var(--acc2,#F2812D);border-radius:10px;padding:10px 12px;background:#fff}
        .sim-kf-note{font-size:12px;color:var(--muted)}
      ` }));

      function segColor(len) {
        if (len >= 10) return 'var(--acc2,#F2812D)';
        if (len >= 6) return 'color-mix(in srgb,var(--acc2,#F2812D) 55%,var(--acc1,#127E90))';
        return 'var(--acc1,#127E90)';
      }
      function render() {
        const sorted = [...keys].sort((a, b) => a - b);
        const last = step > 0 ? ORDER[step - 1] : null;
        flagsEl.innerHTML = '';
        sorted.forEach(sec => {
          flagsEl.append(P.h('div', { class: 'sim-kf-flag' + (sec === last ? ' new' : ''), style: `left:${sec / 30 * 100}%` }, `${sec}`, P.h('i', {})));
        });
        segsEl.innerHTML = '';
        let maxGap = 0;
        for (let i = 0; i < sorted.length - 1; i++) {
          const len = sorted[i + 1] - sorted[i];
          maxGap = Math.max(maxGap, len);
          segsEl.append(P.h('div', { class: 'sim-kf-seg', style: `width:${len / 30 * 100}%;background:${segColor(len)}` }, `${len}초`));
        }
        status.innerHTML = `키프레임 ${sorted.length}개 · 가장 긴 빈 구간 <b>${maxGap}초</b>(모델이 혼자 채우는 시간)`;
        list.innerHTML = '';
        sorted.forEach(sec => list.append(P.h('span', { class: 'sim-kf-item' }, `${sec}초 ${SCENES[sec]}`)));
        if (sorted.length >= 10) {
          rule.className = 'sim-kf-rule on';
          rule.textContent = '예시 규칙: 빈 구간 최대 4초. 원하는 대로 가지만 장면끼리 안 맞으면 억지로 이어져요. 등장·전환·마무리 같은 전환점만 남겨 보세요.';
          addBtn.disabled = true;
          addBtn.textContent = '키프레임 10개 (최대)';
        } else {
          rule.className = 'sim-kf-rule';
          rule.textContent = maxGap >= 10 ? '빈 구간이 길면 그 사이 움직임은 모델이 알아서 정해요.' : '빈 구간이 짧아질수록 원하는 순간에 원하는 모습이 나와요.';
          addBtn.disabled = false;
          addBtn.textContent = '키프레임 추가';
        }
        band.classList.toggle('on', refCb.checked);
        band.textContent = refCb.checked ? '참조 자료: 인물·소품 모습 유지 (전 구간)' : '참조 자료 없음';
      }
      addBtn.addEventListener('click', () => {
        if (step >= ORDER.length) return;
        keys.push(ORDER[step]);
        step++;
        render();
      });
      resetBtn.addEventListener('click', () => { keys = [0, 30]; step = 0; render(); });
      refCb.addEventListener('change', render);
      render();
    }
  },

  teacherLines: [
    '키프레임은 <b>몇 초에 어떤 모습인지</b> 박아 두는 정답 그림이에요. AI는 그 사이를 채워요.',
    '참조 그림은 <b>누가·무엇이</b>를, 키프레임은 <b>언제</b>를 맡아요. 깃발은 이야기가 바뀌는 순간에만 꽂아요.'
  ],
  tip: {
    body: '학생 영상 프로젝트는 먼저 종이에 <b>시간 축을 그리고 전환점 3~4개</b>만 표시하게 해요. 그 순간의 그림이 키프레임, 주인공·소품 그림은 참조 자료가 돼요.',
    extra: '키프레임끼리 인물 옷·배경이 다르면 AI가 사이를 억지로 이어요. 키프레임 그림은 같은 참조 그림으로 만들어 서로 맞춰 두면 덜 흔들려요.'
  },
  myth: {
    myth: '키프레임을 많이 넣을수록 영상이 무조건 좋아진다.',
    fact: '키프레임은 그 순간의 모습을 고정할 뿐, 사이의 움직임은 모델이 채워요. 고정점끼리 서로 안 맞거나 너무 촘촘하면 사이가 어색해져요. 이야기 전환점에만 두고, 인물·소품은 참조 자료로 붙잡아요.'
  },
  sources: [
    { title: 'Kling: Kling 4.0', url: 'https://kling.ai/blog/kling-4-ai-video-model', note: '2026-09-30, 3~30초 영상, 키프레임 최대 10개, 참조 자료 최대 15개, 조기 접근 9/28·정식 모델 10월.' },
    { title: 'Generative Inbetweening: Adapting Image-to-Video Models for Keyframe Interpolation (arXiv, 2024)', url: 'https://arxiv.org/abs/2408.15239', note: '정방향·역방향 모델을 함께 돌려 두 키프레임 사이를 채우는 방법이에요.' },
    { title: 'VACE: All-in-One Video Creation and Editing (arXiv, 2025)', url: 'https://arxiv.org/abs/2503.07598', note: '참조·편집·마스크 입력을 한 조건 묶음으로 넣는 구조예요.' },
    { title: 'Gemini API: Generate videos with Veo 3.1', url: 'https://ai.google.dev/gemini-api/docs/veo', note: '첫 프레임은 주 입력, 끝 프레임은 생성 제약, 참조 이미지 3장으로 모습 유지.' }
  ],
  script: `9월 30일 Kling이 영상 생성 모델 Kling 4.0의 세부를 공개했어요. 3초에서 30초 영상에 키프레임을 10개까지, 참조 자료를 15개까지 넣을 수 있어요. 정식 모델은 10월에 나와요.

글 프롬프트는 무엇이 일어나는지는 말해도 몇 초에 어떤 모습인지는 정하기 어려워요. 키프레임은 애니메이션 용어로, 시간 축 위 특정 순간의 정답 그림이에요. 키프레임을 박으면 모델은 고정점 사이만 채우면 돼요. 2024년 연구는 첫 그림에서 앞으로, 끝 그림에서 뒤로 가는 모델을 함께 돌려 가운데서 만나게 했어요.

참조 자료는 누가, 무엇이, 어떤 느낌인지를 붙잡아요. 키프레임이 언제를, 참조가 누구를 맡는 셈이에요.

고정점끼리 안 맞으면 모델이 사이를 억지로 이어요. 그래서 학생 영상은 등장, 전환, 마무리처럼 이야기가 꺾이는 순간에만 키프레임을 두게 해요.`
};
