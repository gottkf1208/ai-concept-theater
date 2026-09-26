/* E3 [트랙 A] 글자와 손가락은 왜 뭉개질까: 확산 모델 */

/* 노이즈 데모(장면2·만져 보기)에서 쓸 원본 그림을 미리 한 번만 로드해요.
   img.onload 전에는 P.noise가 잡음만 보여 주고(안전), 로드되면 source()로 바꿔 끼워요. */
const ideaImg = new Image();
let ideaLoaded = false;
ideaImg.onload = () => { ideaLoaded = true; };
ideaImg.src = 'assets/char/idea.webp';

export default {
  slug: 'e3-diffusion',
  track: 'A',
  title: '글자와 손가락은 왜 뭉개질까',
  subtitle: '확산 모델',
  summary: '오늘 만든 영상 제목의 TEMPERATURE가 뭉개진 이유를 확산 모델로 풀어 봐요. 잡음을 더하고 걷어 내는 원리부터, 글자·손가락이 유독 틀리기 쉬운 까닭까지.',
  keywords: ['확산 모델', 'diffusion', '노이즈', '이미지 생성', '글자 깨짐', 'Stable Diffusion'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '영상 제목 자막, 확대해 보면 뭐가 보일까요?' },
        { t: 5, text: '<em>TEMPERATURE</em> 부분만 뭉개졌어요. 다른 글자는 멀쩡한데 말이죠.' },
        { t: 9.5, text: '글자가 왜 이럴까요?' }
      ],
      build({ stage, lines, P, tl, base }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const tag = P.chip({ x: 340, y: 46, text: 'AI로 만든 영상', color: 'ink' });
        tl.at(stage.appendChild(tag.el), .3, { from: 'up', dist: 12 });
        const frame = P.h('img', { src: `${base}assets/frames/v1-07s.webp`, alt: 'AI 영상 도구로 만든 영상 한 장면', style: 'left:340px;top:86px;width:300px;height:169px;object-fit:cover;border-radius:14px;border:2px solid var(--line);background:#fff' });
        tl.at(stage.appendChild(frame), .5, { from: 'up' });
        const crop = P.h('img', { src: `${base}assets/frames/v1-07s-title.webp`, alt: '제목 자막 확대. TEMPERATURE 부분이 뭉개져 보임', style: 'left:330px;top:350px;width:820px;height:143px;object-fit:cover;border-radius:12px;border:3px solid var(--orange);background:#000' });
        tl.at(stage.appendChild(crop), 3.6, { from: 'up' });
        const hl = P.h('div', { style: 'left:576px;top:361px;width:279px;height:120px;border:3px dashed var(--orange);border-radius:8px;background:rgba(242,129,45,.08)' });
        tl.at(stage.appendChild(hl), 5, { from: 'pop' });
        const chip2 = P.chip({ x: 570, y: 306, text: '여기, 글자가 뭉개졌어요', color: 'orange' });
        tl.at(stage.appendChild(chip2.el), 5, { from: 'pop' });
        const ar = P.arrow(lines, { x1: 490, y1: 255, x2: 740, y2: 350, curve: -30, width: 4, color: '#F2812D' });
        const qq = P.text({ x: 330, y: 522, w: 700, text: '글자가 <em>왜</em> 이럴까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.8);
            ar.draw(P.clamp((t - 1) / .9, 0, 1));
          }
        };
      }
    },
    {
      title: '확산 모델의 원리', dur: 15,
      captions: [
        { t: 0, text: '학습할 때는 그림에 잡음을 아주 조금씩 더해서, 완전한 잡음으로 만들어요.' },
        { t: 5.5, text: '생성할 때는 거꾸로예요. 잡음 덩어리에서 잡음을 조금씩 <em>걷어 내며</em> 그림이 나타나요.' },
        { t: 11, text: '다섯 칸은 그 사이 단계예요. 오른쪽으로 갈수록 원본에 가까워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 470, size: 200, pose: 'think' });
        stage.append(q.el);
        const startX = 230, size = 150, gap = 195;
        const targets = [1, .75, .5, .25, 0];
        const boxes = targets.map((tgt, i) => {
          const nz = P.noise({ x: startX + i * gap, y: 250, w: size, h: size, seed: 20 + i });
          nz.set(1);
          tl.at(stage.appendChild(nz.el), .4 + i * .15, { from: 'pop' });
          return { nz, tgt };
        });
        if (ideaLoaded) boxes.forEach(b => b.nz.source(ideaImg));
        else ideaImg.addEventListener('load', () => boxes.forEach(b => b.nz.source(ideaImg)), { once: true });
        const lbl0 = P.text({ x: startX - 10, y: 410, w: 170, text: '잡음', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lbl0.el), .4, { from: 'up', dist: 10 });
        const lbl4 = P.text({ x: startX + 4 * gap - 10, y: 410, w: 170, text: '원본에 가까움', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lbl4.el), 1.6, { from: 'up', dist: 10 });
        const arr = P.arrow(lines, { x1: startX + 4, y1: 205, x2: startX + 4 * gap + size - 4, y2: 205, width: 4, color: '#127E90' });
        const arrLbl = P.text({ x: startX, y: 160, w: 700, text: '생성: 잡음 <i>→</i> 그림', size: 22, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(arrLbl.el), 6, { from: 'up' });
        const trainNote = P.text({ x: startX, y: 490, w: 780, text: '학습 때는 반대로 <em>그림 → 잡음</em>이에요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(trainNote.el), 1.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 14);
            boxes.forEach((b, i) => {
              const start = 6.4 + i * .8, dur2 = 1.3;
              const k = P.clamp((t - start) / dur2, 0, 1);
              b.nz.set(P.lerp(1, b.tgt, k));
            });
            arr.draw(P.clamp((t - 6) / 5, 0, 1));
          }
        };
      }
    },
    {
      title: '통계적 패턴을 배워요', dur: 13,
      captions: [
        { t: 0, text: '모델은 사진을 오려 붙이는 게 아니에요. 수많은 그림에서 <em>통계적 패턴</em>(선·색·구도의 규칙)을 배워요.' },
        { t: 5, text: '그 패턴으로 완전히 새로운 그림을 그려요. 어디에도 없던 조합이에요.' },
        { t: 9, text: '다만 가끔은 학습 자료를 <em>닮게</em> 나오는 경우도 있어요. 공정하게 봐야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 440, size: 230, pose: 'think' });
        stage.append(q.el);
        const grid = [];
        for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) grid.push({ x: 70 + c * 140, y: 90 + r * 110 });
        grid.forEach((g, i) => {
          const b = P.box({ x: g.x, y: g.y, w: 110, h: 90, icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), .3 + i * .15, { from: 'pop' });
        });
        const central = P.box({ x: 520, y: 110, w: 260, h: 160, label: '통계적 패턴', sub: '선·색·구도의 규칙', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(central.el), 2.2, { from: 'pop' });
        const output = P.box({ x: 900, y: 130, w: 260, h: 130, label: '새로 그린 그림', sub: '새로운 조합', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(output.el), 7, { from: 'pop' });
        const toCentral = grid.map((g, i) => P.arrow(lines, { x1: g.x + 110, y1: g.y + 45, x2: 520, y2: 130 + i * 20, color: '#9AA5AF', width: 2.5, curve: (i - 2.5) * 8 }));
        const toOutput = P.arrow(lines, { x1: 780, y1: 190, x2: 900, y2: 195, color: '#F2812D', width: 5 });
        const caution = P.text({ x: 520, y: 330, w: 640, text: '가끔은 학습 자료를 <em>닮게</em> 나오는 경우도 있어요. 공정하게 봐야 해요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(caution.el), 9.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 12);
            toCentral.forEach((a, i) => a.draw(P.clamp((t - 1 - i * .2) / .6, 0, 1)));
            toOutput.draw(P.clamp((t - 6.5) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '글자·손가락이 어려운 이유', dur: 13,
      captions: [
        { t: 0, text: '대략적인 패턴만으로는 나무나 표정 정도는 충분히 그럴듯해요.' },
        { t: 5, text: '그런데 글자와 손가락은 <em>정확한 구조</em>가 필요해요. 손가락 5개, 글자 획순처럼요. 조금만 어긋나도 티가 나요.' },
        { t: 9.5, text: '한글은 학습 자료가 영어보다 적고 자모를 조합하는 구조라 더 어려워요. 글자를 따로 배운 <em>텍스트 렌더링</em> 모델이 나오며 많이 나아졌어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 30, y: 470, size: 190, pose: 'point' });
        stage.append(q.el);
        const left1 = P.box({ x: 60, y: 90, w: 520, h: 170, label: '대략적인 모양이면 충분해요', sub: '나무·구름·표정 같은 것', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(left1.el), .3, { from: 'left' });
        const right1 = P.box({ x: 700, y: 90, w: 520, h: 170, label: '정확한 구조가 필요해요', sub: '글자 획순, 손가락 5개 같은 것', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(right1.el), 1, { from: 'right' });
        const handBox = P.box({ x: 160, y: 310, w: 430, h: 150, label: '손가락', sub: '5개가 정확해야 해요', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(handBox.el), 5, { from: 'pop' });
        const letterBox = P.box({ x: 690, y: 310, w: 430, h: 150, label: '글자', sub: '획순이 정확해야 해요', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(letterBox.el), 5.6, { from: 'pop' });
        const a1 = P.arrow(lines, { x1: 960, y1: 260, x2: 375, y2: 310, color: '#1B1F24', width: 3, curve: 40 });
        const a2 = P.arrow(lines, { x1: 960, y1: 260, x2: 905, y2: 310, color: '#1B1F24', width: 3, curve: -10 });
        const note = P.text({ x: 160, y: 480, w: 980, text: '한글은 학습 자료가 영어보다 적은 편이고, 자모를 <em>조합</em>하는 구조라 더 어렵다고 해요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });
        const chip = P.chip({ x: 160, y: 578, text: '텍스트 렌더링 학습으로 개선 중', color: 'gray' });
        tl.at(stage.appendChild(chip.el), 10.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 12);
            a1.draw(P.clamp((t - 4.6) / .7, 0, 1));
            a2.draw(P.clamp((t - 5.2) / .7, 0, 1));
            handBox.on(t > 5 && t < 9.5 && Math.floor(t * 1.5) % 2 === 0);
            letterBox.on(t > 5.6 && t < 9.5 && Math.floor(t * 1.5) % 2 === 1);
          }
        };
      }
    },
    {
      title: '요즘은 많이 좋아졌어요', dur: 12,
      captions: [
        { t: 0, text: '요즘 모델은 글꼴 표현이 많이 좋아졌어요. Stable Diffusion 3 논문도 이 부분 개선을 밝혔어요.' },
        { t: 5, text: '그래도 자막·안내문처럼 정확해야 하는 글자는 영상 편집 단계에서 넣는 게 안전해요.' },
        { t: 8.5, text: "이미지 프롬프트에 <em>'no text'</em>라고 적어 보는 것도 방법이에요. 안 통하는 도구도 있고요." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 20, y: 500, size: 170, pose: 'wave' });
        stage.append(q.el);
        const title = P.text({ x: 80, y: 92, w: 850, text: '요즘 모델은 글꼴 표현이 많이 좋아졌어요', size: 30, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const before = P.box({ x: 120, y: 270, w: 280, h: 140, label: '예전', sub: '글자가 자주 깨졌어요', accent: 'brown', icon: P.ICON.x });
        tl.at(stage.appendChild(before.el), 1.4, { from: 'left' });
        const after = P.box({ x: 560, y: 150, w: 320, h: 150, label: '요즘 (SD3 등)', sub: '글자 표현이 개선됐어요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(after.el), 2.4, { from: 'right' });
        const arr = P.arrow(lines, { x1: 400, y1: 270, x2: 560, y2: 300, curve: 30, width: 4, color: '#127E90' });
        const arrChip = P.chip({ x: 410, y: 315, text: 'SD3 논문: 개선 확인', color: 'aqua' });
        tl.at(stage.appendChild(arrChip.el), 3.6, { from: 'pop' });
        const tipA = P.box({ x: 200, y: 430, w: 430, h: 150, label: '자막은 편집 단계에서', sub: '영상 편집 사이트에서 텍스트로 넣기', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(tipA.el), 5.2, { from: 'up' });
        const tipB = P.box({ x: 680, y: 430, w: 430, h: 150, label: "프롬프트에 'no text'", sub: '이미지 생성 요청에 적어 보기', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(tipB.el), 8.5, { from: 'up' });
        const bottom = P.text({ x: 200, y: 610, w: 900, text: '그래도 자막처럼 정확해야 하는 글자는 편집 단계에서 넣는 게 안전해요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(bottom.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 11.5);
            arr.draw(P.clamp((t - 1.4) / .8, 0, 1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '잡음 제거 단계 슬라이더',
    desc: '단계를 <b>0~20</b>으로 올리면서 잡음이 걷히는 걸 직접 보세요. 0은 완전한 잡음, 20은 원본이에요. 아래에서는 오늘 뭉개진 제목 글자를 확대해 볼 수 있어요.',
    mount(el, P) {
      const STEPS = 20;
      const wrap = P.h('div', { class: 'sim-wrap' });
      const secA = P.h('div', {});
      const noiseWrap = P.h('div', { class: 'sim-noisewrap' });
      const nz = P.noise({ x: 0, y: 0, w: 320, h: 320, seed: 13 });
      nz.set(1);
      if (ideaLoaded) { nz.source(ideaImg); nz.set(1); }
      else ideaImg.addEventListener('load', () => { nz.source(ideaImg); nz.set(1 - Number(range.value) / STEPS); }, { once: true });
      noiseWrap.append(nz.el);
      const range = P.h('input', { type: 'range', min: '0', max: String(STEPS), value: '0', 'aria-label': '잡음 제거 단계' });
      const rangeRow = P.h('div', { class: 'sim-rangerow' }, P.h('span', {}, '0 잡음'), range, P.h('span', {}, `${STEPS} 원본`));
      const stepLabel = P.h('div', { class: 'sim-steplabel' });
      const stepDesc = P.h('p', { class: 'sim-desc' });
      secA.append(P.h('div', { class: 'sim-sectiontitle' }, '① 잡음 제거 단계'), noiseWrap, rangeRow, stepLabel, stepDesc);

      const secB = P.h('div', { class: 'sim-divider2' });
      const frameImg = P.h('img', { src: 'assets/frames/v1-07s.webp', alt: 'AI 영상 도구로 만든 영상 한 장면', class: 'sim-frame' });
      const zoomBtn = P.h('button', { class: 'btn primary', type: 'button' }, '제목 확대');
      const titleImg = P.h('img', { src: 'assets/frames/v1-07s-title.webp', alt: '제목 글자 확대. TEMPERATURE 부분이 뭉개짐', class: 'sim-title', hidden: '' });
      const zoomNote = P.h('p', { class: 'sim-zoomnote', hidden: '' }, 'TEMPERATURE의 가운데 글자들이 서로 겹치고 뭉개졌어요.');
      secB.append(P.h('div', { class: 'sim-sectiontitle' }, '② 뭉개진 글자 확대해 보기'), frameImg, P.h('div', { class: 'sim-btnrow' }, zoomBtn), titleImg, zoomNote);

      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:26px}
        .sim-sectiontitle{font-weight:800;font-size:15px;color:var(--muted);margin-bottom:12px}
        .sim-noisewrap{max-width:320px;width:100%}
        .sim-noisewrap .p-noise{position:static!important;left:auto!important;top:auto!important;width:100%!important;height:auto!important;display:block;border-radius:16px;border:1px solid var(--line);background:#e9eef2}
        .sim-rangerow{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;color:var(--muted);flex-wrap:wrap;margin-top:14px;max-width:420px}
        .sim-rangerow input[type=range]{flex:1;min-width:140px}
        .sim-steplabel{font-weight:800;font-size:17px;margin-top:12px}
        .sim-desc{color:var(--muted);font-size:14.5px;margin-top:4px}
        .sim-divider2{border-top:1px solid var(--line);padding-top:24px}
        .sim-frame,.sim-title{max-width:100%;width:100%;height:auto;display:block;border-radius:14px;border:1px solid var(--line);box-sizing:border-box}
        .sim-btnrow{margin-top:12px}
        .sim-title{margin-top:16px;border-color:var(--orange)}
        .sim-zoomnote{margin-top:10px;font-size:14.5px;font-weight:700;color:#B3520F}
      ` });
      el.append(style, wrap);
      wrap.append(secA, secB);

      const update = () => {
        const step = Number(range.value);
        const level = 1 - step / STEPS;
        nz.set(level);
        stepLabel.textContent = `${step} / ${STEPS} 단계`;
        stepDesc.textContent = step < 7 ? '아직 형태만 보여요' : step < 14 ? '윤곽이 보여요' : '거의 완성이에요';
      };
      range.addEventListener('input', update);
      update();

      zoomBtn.addEventListener('click', () => {
        const willShow = titleImg.hidden;
        titleImg.hidden = !willShow;
        zoomNote.hidden = !willShow;
        zoomBtn.textContent = willShow ? '접기' : '제목 확대';
      });
    }
  },

  teacherLines: [
    'AI는 사진을 오려 붙이는 게 아니라, <b>잡음 속에서 그림을 조금씩 꺼내요</b>.',
    '글자랑 손가락은 정확해야 해서, <b>대충 그리면 금방 티가 나요</b>.'
  ],
  tip: {
    body: '글자는 이미지 안에 넣지 말고 영상 편집 단계에서 <b>자막·텍스트</b>로 넣어요. 이미지 프롬프트에는 <b>"no text"</b>라고 적어 보세요.',
    extra: '요즘 모델은 글꼴 표현이 좋아졌지만, 그래도 편집 전에 한 번 확대해서 확인하는 습관이 안전해요.'
  },
  myth: {
    myth: '인터넷 사진을 오려 붙인다.',
    fact: '수많은 그림에서 배운 통계적 패턴으로 새로 그려요. 다만 학습 자료를 닮게 나오는 경우도 있어요.'
  },
  sources: [
    { title: 'Denoising Diffusion Probabilistic Models — Ho, Jain, Abbeel (2020)', url: 'https://arxiv.org/abs/2006.11239', note: '잡음을 조금씩 더하고(순방향), 거꾸로 걷어 내며(역방향) 그림을 만드는 확산 모델의 기본 논문.' },
    { title: 'High-Resolution Image Synthesis with Latent Diffusion Models — Rombach et al. (2022)', url: 'https://arxiv.org/abs/2112.10752', note: 'Stable Diffusion의 바탕이 된 잠재 확산(latent diffusion) 논문.' },
    { title: 'Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (Stable Diffusion 3) — Esser et al. (2024)', url: 'https://arxiv.org/abs/2403.03206', note: '글자 표현(typography) 개선을 다룬 부분이 있어요.' },
    { title: '오늘 사례 영상 — 브루 특강 강의안', url: 'https://gottkf1208.github.io/vrew-talk/', note: 'v1.mp4 7초 부근에서 제목 자막이 뭉개진 장면을 볼 수 있어요.' }
  ],
  script: `
오늘 아침에 만든 영상 제목 자막을 확대해 봤더니 'TEMPERATURE' 부분이 뭉개져 있었어요. 왜 이런 일이 생길까요?

확산 모델이라는 방식 때문이에요. 학습 때는 그림에 잡음을 조금씩 더해 완전한 잡음으로 만들고, 생성 때는 거꾸로 잡음을 걷어 내며 그림이 나타나게 해요. 사진을 오려 붙이는 게 아니라, 수많은 그림에서 배운 통계적 패턴으로 새로 그려요. 다만 학습 자료를 닮게 나올 때도 있으니 공정하게 봐요.

문제는 글자와 손가락이에요. 대략적인 패턴만으로도 나무나 표정은 그럴듯한데, 획순이나 손가락 5개 같은 정확한 구조는 조금만 어긋나도 티가 나요. 한글은 자료가 영어보다 적고 자모 조합 구조라 더 어려워요. 요즘 모델은 글자를 따로 학습하는 텍스트 렌더링 기법으로 많이 나아졌어요.

다행히 요즘 모델은 글꼴 표현이 좋아졌어요. 그래도 자막처럼 정확한 글자는 편집 단계에서 넣는 게 안전해요.
`
};
