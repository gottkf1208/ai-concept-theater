/* S5-5 [트랙 C] 포즈를 지정하면 왜 말을 잘 들을까: 컨트롤넷과 조건부 생성 */

/* 뼈대 그림(3가지 자세) — 장면 1과 만져 보기에서 함께 써요.
   mode: 생략(장면용, 헥스 색 → 팔레트로 자동 치환) / 'css'(만져 보기용, 클래스 색) */
function skeletonSVG(P, poseKey, w, h, mode) {
  const POSES = {
    left: { head: [0, -64], torso: [[0, -46], [0, 10]], armL: [[0, -38], [-34, -64]], armR: [[0, -38], [24, -6]], legL: [[0, 10], [-16, 58]], legR: [[0, 10], [16, 58]] },
    wide: { head: [0, -64], torso: [[0, -46], [0, 10]], armL: [[0, -38], [-44, -38]], armR: [[0, -38], [44, -38]], legL: [[0, 10], [-16, 58]], legR: [[0, 10], [16, 58]] },
    crouch: { head: [0, -40], torso: [[0, -24], [0, 18]], armL: [[0, -16], [-28, 10]], armR: [[0, -16], [28, 10]], legL: [[0, 18], [-24, 32]], legR: [[0, 18], [24, 32]] }
  };
  const p = POSES[poseKey] || POSES.left;
  const svg = P.s('svg', { viewBox: '-60 -90 120 170', width: w, height: h });
  const headAttr = mode === 'css' ? { class: 'sim-sk-head' } : { stroke: '#1B1F24', fill: 'none' };
  const lineAttr = mode === 'css' ? { class: 'sim-sk-line' } : { stroke: '#1B1F24' };
  svg.append(P.s('circle', Object.assign({ cx: p.head[0], cy: p.head[1], r: 13, 'stroke-width': 5 }, headAttr)));
  [p.torso, p.armL, p.armR, p.legL, p.legR].forEach(seg => {
    svg.append(P.s('line', Object.assign({ x1: seg[0][0], y1: seg[0][1], x2: seg[1][0], y2: seg[1][1], 'stroke-width': 6, 'stroke-linecap': 'round' }, lineAttr)));
  });
  return svg;
}

export default {
  slug: 's5-controlnet',
  track: 'C',
  title: '포즈를 지정하면 왜 말을 잘 들을까',
  subtitle: '컨트롤넷과 조건부 생성',
  summary: '"왼손 들고 오른쪽을 보는 쿼카"를 글로 열 번 써도 매번 다르게 나와요. 포즈 뼈대 그림 한 장을 조건으로 더하면 한 번에 맞아요. 조건이 원래 그림 실력을 해치지 않는 이유와, 누구·어디에·무엇을 나눠 주는 법을 파고들어요.',
  keywords: ['컨트롤넷', '조건부 생성', '포즈 뼈대', '캐니 윤곽선', '깊이 조건', 'zero conv', 'T2I-어댑터', 'OpenPose'],

  scenes: [
    {
      title: '글로는 자세가 안 맞아요', dur: 13,
      captions: [
        { t: 0, text: '"왼손을 들고 오른쪽을 보는 쿼카"를 프롬프트로 <em>열 번</em> 써도 매번 다른 자세가 나와요.' },
        { t: 5, text: '포즈 <em>뼈대</em> 그림 한 장을 같이 넣으니 한 번에 그 자세가 나와요.' },
        { t: 9.5, text: '글은 "무엇"은 잘 전해도 <em>"어디에 어떤 자세로"</em>는 잘 안 전해지나 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const promptText = P.text({ x: 330, y: 60, w: 870, text: '같은 문장 — <em>"왼손 들고 오른쪽을 보는 쿼카"</em>', size: 24, weight: 800 });
        tl.at(stage.appendChild(promptText.el), .2, { from: 'up' });
        const attempts = [
          ['A안', '오른손을 든 자세'],
          ['B안', '두 손을 다 든 자세'],
          ['C안', '정면만 보는 자세']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 330 + i * 280, y: 110, w: 250, h: 120, label, sub });
          tl.at(stage.appendChild(b.el), .5 + i * .6, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 330, y: 250, w: 870, text: '열 번 써도 <em>매번 다른 자세</em>가 나와요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 3.0, { from: 'up' });
        const skelWrap = P.h('div', { style: 'left:330px;top:330px;width:220px;height:230px;display:flex;flex-direction:column;align-items:center;gap:6px' },
          skeletonSVG(P, 'left', 160, 170), P.h('div', { style: 'font-size:19px;font-weight:800' }, '포즈 뼈대 추가'));
        tl.at(stage.appendChild(skelWrap), 5.4, { from: 'pop' });
        const arrow = P.arrow(lines, { x1: 560, y1: 430, x2: 650, y2: 430, width: 4, color: '#1B1F24' });
        const result = P.box({ x: 660, y: 350, w: 340, h: 170, label: '결과', sub: '자세가 뼈대와 정확히 일치', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(result.el), 6.6, { from: 'pop' });
        const final = P.text({ x: 330, y: 590, w: 870, text: '뼈대 <em>한 장</em>이면, 자세가 한 번에 맞아요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrow.draw(P.clamp((t - 6.0) / .6, 0, 1));
            result.on(t > 6.6);
          }
        };
      }
    },
    {
      title: '조건 그림이 함께 들어가요', dur: 13,
      captions: [
        { t: 0, text: '조건 그림(뼈대·윤곽·깊이 같은 것)이 프롬프트와 함께 매 단계 들어가요.' },
        { t: 5, text: '모델은 이 조건 그림을 보면서 그리기 때문에 배치와 자세가 그림을 <em>따라가요</em>.' },
        { t: 9, text: '이 방식을 <em>컨트롤넷</em>이라고 불러요. <em>2023년 연구</em>예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const b1 = P.box({ x: 330, y: 110, w: 260, h: 130, label: '프롬프트', sub: '"쿼카가 교실에 서 있다"', accent: 'ink', icon: P.ICON.doc });
        const b2 = P.box({ x: 330, y: 280, w: 260, h: 130, label: '조건 그림', sub: '포즈 뼈대 한 장' });
        const b3 = P.box({ x: 680, y: 195, w: 230, h: 140, label: '모델', sub: '조건 그림을 보면서 그려요', icon: P.ICON.brain });
        const b4 = P.box({ x: 980, y: 195, w: 250, h: 140, label: '결과', sub: '자세가 뼈대와 일치', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(b1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b2.el), .9, { from: 'up' });
        tl.at(stage.appendChild(b3.el), 2.0, { from: 'up' });
        tl.at(stage.appendChild(b4.el), 4.6, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 590, y1: 175, x2: 680, y2: 230, curve: 20, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 590, y1: 345, x2: 680, y2: 300, curve: -20, width: 4, color: '#1B1F24' });
        const a3 = P.arrow(lines, { x1: 910, y1: 265, x2: 980, y2: 265, width: 4, color: '#1B1F24' });
        const final = P.text({ x: 330, y: 460, w: 900, text: '조건 그림이 매 단계 함께 들어가서 <em>배치를 붙잡아요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        const small = P.text({ x: 330, y: 520, w: 900, text: '2023년 컨트롤넷 연구가 제안한 방식이에요. 조건을 따르는 세기는 컨트롤 가중치로 조절해요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9);
            a1.draw(P.clamp((t - 2.4) / .5, 0, 1));
            a2.draw(P.clamp((t - 3.0) / .5, 0, 1));
            a3.draw(P.clamp((t - 4.2) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '왜 그림 실력은 안 망가질까', dur: 13,
      captions: [
        { t: 0, text: '조건을 배우면서 원래 그림 실력이 망가지면 곤란해요.' },
        { t: 5, text: '그래서 원본은 <em>얼려 두고</em>, 복사한 가지에서 조건만 따로 배워요.' },
        { t: 9.5, text: '비유하면 숙련된 화가 옆에 <em>자세 코치</em>를 붙인 것과 같아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const b1 = P.box({ x: 330, y: 140, w: 330, h: 150, label: '원본 가중치', sub: '얼려 둠 · 그대로 유지', accent: 'ink' });
        const b2 = P.box({ x: 760, y: 140, w: 330, h: 150, label: '복사 가지', sub: '조건만 새로 배워요' });
        tl.at(stage.appendChild(b1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b2.el), .9, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 660, y1: 215, x2: 760, y2: 215, width: 4, color: '#1B1F24' });
        const chip = P.chip({ x: 560, y: 310, text: '0에서 시작하는 연결(zero conv)', color: 'ink', size: 18 });
        tl.at(stage.appendChild(chip.el), 2.2, { from: 'pop' });
        const analogy = P.text({ x: 330, y: 380, w: 760, text: '비유하면 숙련된 화가 옆에 <em>자세 코치</em>를 붙인 것과 같아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(analogy.el), 5.4, { from: 'up' });
        const small = P.text({ x: 330, y: 460, w: 760, text: '가벼운 방식인 T2I-어댑터(2023)도 비슷한 원리예요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.5);
            arrow.draw(P.clamp((t - 1.4) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '조건 그림 종류', dur: 14,
      captions: [
        { t: 0, text: '조건 그림에는 여러 종류가 있어요. <em>포즈 뼈대</em>부터 볼까요.' },
        { t: 5, text: '윤곽선(캐니), <em>깊이</em>, 낙서도 조건으로 쓸 수 있어요.' },
        { t: 10, text: '각각 무엇을 <em>고정</em>하는지가 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'tablet' });
        stage.append(q.el);
        const items = [
          ['① 포즈 뼈대', '관절 위치를 고정 · OpenPose(2018)로 뽑아요'],
          ['② 윤곽선(캐니)', '형태의 경계선을 고정'],
          ['③ 깊이', '앞뒤 거리·입체감을 고정'],
          ['④ 낙서', '대략의 구도만 고정']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 0 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '조건마다 <em>고정하는 것</em>이 달라요. 자세는 뼈대가 가장 정확해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.3);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '정리: 누구·어디에·무엇을 나누기', dur: 12,
      captions: [
        { t: 0, text: '<em>누구</em>는 레퍼런스 이미지, <em>어디에 어떻게</em>는 조건 그림, <em>무엇</em>은 프롬프트예요.' },
        { t: 4.5, text: '셋을 나눠서 주면 손가락 개수·자세 문제의 <em>절반</em>은 풀려요.' },
        { t: 8.5, text: '앱에서는 <em>구조 참조</em>, <em>포즈 참조</em>, <em>스케치 모드</em>라는 이름으로 이 기능이 들어 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['레퍼런스 이미지 (누구)', '얼굴·의상 같은 정체성을 고정', 'aqua'],
          ['조건 그림 (어디에 어떻게)', '자세·구도·깊이를 고정', 'orange'],
          ['프롬프트 (무엇)', '분위기·소재·색을 지정', 'ink']
        ].map(([label, sub, accent], i) => {
          const b = P.box({ x: 340 + i * 300, y: 150, w: 270, h: 150, label, sub, accent });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 360, w: 850, text: '셋을 나눠서 주면 손가락 개수·자세 문제의 <em>절반</em>은 풀려요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.0, { from: 'up' });
        const small = P.text({ x: 340, y: 420, w: 850, text: '앱에서는 <i>구조 참조</i>, <i>포즈 참조</i>, <i>스케치 모드</i>라는 이름으로 들어 있어요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > .3 + i * .7));
          }
        };
      }
    }
  ],

  interaction: {
    title: '조건 켜고 끄기',
    desc: '왼쪽에서 자세를 고르면 뼈대가 바뀌어요. <b>조건 켜기</b>를 누르면 오른쪽 쿼카가 그 자세에 맞춰 회전·기울기를 바꿔요. 끄면 시드로 정해진 무작위 자세가 나오고, "다른 시드"로 그 무작위 자세를 바꿀 수 있어요. 실제로는 팔다리 위치까지 정확히 맞지만, 여기서는 회전·기울기로 흉내만 냈어요.',
    mount(el, P) {
      const POSES = [['left', '왼손 들고 오른쪽 보기'], ['wide', '두 팔 벌리기'], ['crouch', '몸 낮춰 앉기']];
      const XFORM = {
        left: { rot: 10, skew: -6, ty: -6, sx: 1, sy: 1 },
        wide: { rot: 0, skew: 0, ty: 0, sx: 1.16, sy: 1 },
        crouch: { rot: 0, skew: 0, ty: 24, sx: 1, sy: .82 }
      };
      let poseKey = 'left', on = false, seed = 3;

      const select = P.h('select', { id: 'sim-pose', class: 'sim-select' }, ...POSES.map(([v, label]) => P.h('option', { value: v }, label)));
      const selLab = P.h('label', { for: 'sim-pose', class: 'sim-lab2' }, '자세 선택');
      const skelBox = P.h('div', { class: 'sim-skel' });
      const toggle = P.h('button', { class: 'btn primary', type: 'button' }, '조건 켜기');
      const reseed = P.h('button', { class: 'btn', type: 'button' }, '다른 시드');
      const img = P.h('img', { src: P.charSrc('point'), alt: '결과 쿼카', draggable: 'false' });
      const frame = P.h('div', { class: 'sim-rframe' }, img);
      const status = P.h('div', { class: 'sim-status' }, '');
      const left = P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-h' }, '조건 그림(뼈대)'), selLab, select, skelBox);
      const right = P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-h' }, '결과'), frame, status);
      const bar = P.h('div', { class: 'sim-bar2' }, toggle, reseed);
      el.append(P.h('div', { class: 'sim-wrap2' }, P.h('div', { class: 'sim-cols' }, left, right), bar));
      el.append(P.h('style', {
        html: `
        .sim-wrap2{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-cols{display:flex;gap:14px;flex-wrap:wrap}
        .sim-col{flex:1 1 220px;min-width:0;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff}
        .sim-h{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:8px}
        .sim-lab2{display:block;font-size:13px;color:var(--muted);margin-bottom:4px}
        .sim-select{width:100%;max-width:100%;padding:7px;border-radius:8px;border:1px solid var(--line);margin-bottom:10px;font-size:14px}
        .sim-skel{display:flex;justify-content:center;padding:4px 0}
        .sim-skel svg{max-width:100%;height:auto}
        .sim-sk-line,.sim-sk-head{stroke:var(--ink);fill:none}
        .sim-skel.on .sim-sk-line,.sim-skel.on .sim-sk-head{stroke:var(--orange)}
        .sim-rframe{aspect-ratio:1;border-radius:10px;background:var(--paper);display:flex;align-items:center;justify-content:center;overflow:hidden}
        .sim-rframe img{width:60%;height:60%;object-fit:contain;display:block;transition:transform .3s}
        .sim-status{margin-top:10px;font-size:13px;color:var(--muted);text-align:center}
        .sim-bar2{display:flex;gap:10px;flex-wrap:wrap}
      ` }));

      function drawSkel() {
        skelBox.replaceChildren(skeletonSVG(P, poseKey, 140, 160, 'css'));
        skelBox.classList.toggle('on', on);
      }
      function render() {
        drawSkel();
        if (on) {
          const x = XFORM[poseKey];
          img.style.transform = `rotate(${x.rot}deg) skewX(${x.skew}deg) translateY(${x.ty}px) scale(${x.sx},${x.sy})`;
          status.textContent = '조건 켜짐 · 뼈대와 자세가 일치해요';
          toggle.textContent = '조건 끄기';
        } else {
          const r = P.rng(seed * 97 + 11);
          const rot = ((r() * 2 - 1) * 16).toFixed(1), sk = ((r() * 2 - 1) * 8).toFixed(1), ty = ((r() * 2 - 1) * 12).toFixed(1);
          img.style.transform = `rotate(${rot}deg) skewX(${sk}deg) translateY(${ty}px)`;
          status.textContent = `조건 꺼짐 · 무작위 자세(시드 ${seed})`;
          toggle.textContent = '조건 켜기';
        }
      }
      select.addEventListener('change', () => { poseKey = select.value; render(); });
      toggle.addEventListener('click', () => { on = !on; render(); });
      reseed.addEventListener('click', () => { seed += 1; render(); });
      render();
    }
  },

  teacherLines: [
    '글은 "무엇"을 전하고, <b>조건 그림</b>은 "어디에 어떤 자세로"를 전해요.',
    '누구는 레퍼런스 사진, 자세는 <b>뼈대 그림</b>, 나머지는 글로 나눠서 줘요.'
  ],
  tip: {
    body: '학급 캐릭터 포스터는 포즈 뼈대 1장을 미리 만들어 두고 여러 번 재사용하세요. 조건 강도 슬라이더가 있으면 <b>0.6~0.8 근처</b>부터 시작해요.',
    extra: '조건 그림과 프롬프트가 서로 다른 말을 하면(뼈대는 앉았는데 글은 달린다) 이상하게 나와요. 둘을 맞추세요. 조건을 얼마나 세게 따를지는 컨트롤 가중치(0~1)로 정해요.'
  },
  myth: {
    myth: '자세는 프롬프트를 자세히 쓰면 해결된다.',
    fact: '글은 공간 배치를 정확히 전하기 어려워요. 뼈대·스케치 같은 <b>조건 그림</b>을 함께 넣어야 자세가 정확히 맞아요.'
  },
  sources: [
    { title: 'Adding Conditional Control to Text-to-Image Diffusion Models (ControlNet, arXiv 2023)', url: 'https://arxiv.org/abs/2302.05543', note: '스케치·포즈·깊이 같은 조건 그림을 생성 과정에 한 겹 더 넣는 방식. 원본 가중치는 얼리고 복사 가지에서 조건만 배워요.' },
    { title: 'T2I-Adapter: Learning Adapters to Dig out More Controllable Ability for Text-to-Image Diffusion Models (arXiv 2023)', url: 'https://arxiv.org/abs/2302.08453', note: '더 가벼운 어댑터로 비슷한 조건부 생성을 구현하는 방식.' },
    { title: 'OpenPose: Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields (arXiv 2018)', url: 'https://arxiv.org/abs/1812.08008', note: '사진에서 관절 위치(포즈 뼈대)를 뽑아내는 자세 추정 방법.' }
  ],
  script: `AI로 캐릭터 그림을 만들 때 "왼손을 들고 오른쪽을 보는 쿼카"를 열 번 써도 매번 자세가 달라진 적 있으시죠. 글은 "무엇"은 잘 전해도 "어디에 어떤 자세로"는 잘 안 전해지기 때문이에요.

포즈 뼈대 그림 한 장을 조건으로 같이 넣으면 한 번에 그 자세가 나와요. 프롬프트와 조건 그림이 생성 단계마다 함께 들어가서 배치를 붙잡아 주거든요. 이 방식을 컨트롤넷이라고 부르고 2023년 연구에서 나왔어요. 원본 모델은 얼려 두고 복사한 가지에서 조건만 새로 배우기 때문에 그림 실력은 그대로예요. 숙련된 화가 옆에 자세 코치를 붙인 것과 같고, 더 가벼운 T2I-어댑터도 비슷한 원리예요.

조건 그림에는 뼈대 말고도 윤곽선, 깊이, 낙서가 있고 각각 고정하는 게 달라요. 누구는 레퍼런스 이미지, 어디에 어떻게는 조건 그림, 무엇은 프롬프트로 나눠서 주세요. 앱에서는 구조 참조, 포즈 참조라는 이름으로 이 기능을 써요.`
};
