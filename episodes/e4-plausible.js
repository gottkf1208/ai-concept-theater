/* E4 [A] AI는 왜 없는 숫자를 그려 넣을까: 그럴듯함과 사실 */
export default {
  slug: 'e4-plausible',
  track: 'A',
  title: 'AI는 왜 없는 숫자를 그려 넣을까',
  subtitle: '그럴듯함과 사실',
  summary: '브루가 기후변화 영상에 그린 계기판 숫자가 4초 만에 423ppm에서 420ppm으로 바뀌었어요. 생성 AI가 왜 없는 숫자를 그럴듯하게 채워 넣는지, 그리고 무엇을 확인해야 하는지 3분에 담았어요.',
  keywords: ['할루시네이션', '환각', '사실확인', '그럴듯함', '생성AI', '팩트체크', '브루'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: '오늘 브루가 \'기후변화\' 한 단어로 만든 AI 영상, 두 장면이에요.' },
        { t: 5, text: '<em>4초 사이</em>에 계기판 숫자가 423ppm에서 420ppm으로 바뀌었어요.' },
        { t: 9.5, text: '어느 쪽 숫자를 믿어야 할까요?' }
      ],
      build({ stage, lines, P, tl, base }) {
        const img1 = P.h('img', { src: `${base}assets/frames/v1-07s.webp`, alt: '브루가 만든 기후 계기판 영상 7초 장면. CO2 423ppm', draggable: 'false', style: 'left:70px;top:100px;width:480px;height:270px;object-fit:cover;border-radius:14px;border:2px solid #E4E8EC' });
        tl.at(stage.appendChild(img1), .2, { from: 'left' });
        const img2 = P.h('img', { src: `${base}assets/frames/v1-11s.webp`, alt: '같은 영상 11초 장면. CO2 420 PPM', draggable: 'false', style: 'left:730px;top:100px;width:480px;height:270px;object-fit:cover;border-radius:14px;border:2px solid #E4E8EC' });
        tl.at(stage.appendChild(img2), .6, { from: 'right' });
        const lb1 = P.text({ x: 70, y: 378, w: 480, text: '7초', size: 20, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lb1.el), .3, { from: 'up', dist: 10 });
        const lb2 = P.text({ x: 730, y: 378, w: 480, text: '11초', size: 20, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lb2.el), .7, { from: 'up', dist: 10 });
        const arrow1 = P.arrow(lines, { x1: 560, y1: 235, x2: 720, y2: 235, curve: -20, width: 4, color: '#F2812D' });
        const midLbl = P.text({ x: 560, y: 195, w: 160, text: '4초 뒤', size: 20, weight: 800, align: 'center', color: '#B3520F' });
        tl.at(stage.appendChild(midLbl.el), 2, { from: 'down', dist: 10 });
        const chip1 = P.chip({ x: 220, y: 404, text: '423 ppm', color: 'orange', size: 28 });
        tl.at(stage.appendChild(chip1.el), 4, { from: 'pop' });
        const chip2 = P.chip({ x: 880, y: 404, text: '420 ppm', color: 'orange', size: 28 });
        tl.at(stage.appendChild(chip2.el), 4.6, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 440, size: 220, pose: 'think' });
        stage.append(q.el);
        const b = P.bubble({ x: 200, y: 470, w: 560, text: '같은 계기판인데 <b>4초 만에</b> 숫자가 바뀌었어요?', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 6);
            arrow1.draw(P.clamp((t - 1.6) / .8, 0, 1));
          }
        };
      }
    },
    {
      title: '왜? 다음 조각을 잇는 기계', dur: 14,
      captions: [
        { t: 0, text: '생성 AI는 (검색이나 자료 연결을 따로 켜지 않으면) 사실을 확인해 주는 기계가 아니에요.' },
        { t: 5, text: '<em>다음 말·다음 모양</em>을 확률로 이어 붙이는 기계예요.' },
        { t: 10, text: '계기판을 그리라고 하면, 빈칸에 그럴듯한 숫자를 채워 넣어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const prompt = P.box({ x: 140, y: 90, w: 1000, h: 84, label: '"대기 중 이산화탄소는 ___ ppm"', accent: 'ink' });
        tl.at(stage.appendChild(prompt.el), .3, { from: 'down' });
        const down = P.arrow(lines, { x1: 640, y1: 174, x2: 640, y2: 214, width: 4, color: '#1B1F24' });
        const candTexts = ['418 ppm', '420 ppm', '425 ppm', '409 ppm'];
        const cx = [190, 430, 670, 910];
        const cands = candTexts.map((txt, i) => {
          const c = P.chip({ x: cx[i], y: 232, text: txt, color: 'gray', size: 26 });
          tl.at(stage.appendChild(c.el), 2 + i * .5, { from: 'pop' });
          return c;
        });
        const lbl = P.text({ x: 140, y: 296, w: 1000, text: '그럴듯한 다음 조각 후보들', size: 18, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(lbl.el), 4.4, { from: 'up', dist: 10 });
        const down2 = P.arrow(lines, { x1: 490, y1: 262, x2: 560, y2: 348, width: 4, color: '#F2812D', curve: 20 });
        const out = P.box({ x: 480, y: 350, w: 320, h: 130, label: '420 ppm', sub: '계기판에 쏙!', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(out.el), 8.6, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 440, size: 220, pose: 'idea' });
        stage.append(q.el);
        const b = P.bubble({ x: 200, y: 470, w: 640, text: '그럴듯한 다음 조각을 고르는 거예요. <b>맞는지는 안 봐요</b>.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            down.draw(P.clamp((t - 1) / .6, 0, 1));
            down2.draw(P.clamp((t - 7.6) / .8, 0, 1));
            if (t > 4.5) {
              cands.forEach((c, i) => {
                const chosen = i === 1 && t > 7.2;
                c.el.style.transform = chosen ? 'scale(1.18)' : 'scale(1)';
                c.el.style.boxShadow = chosen ? '0 0 0 3px #F9D3B8' : 'none';
                c.el.style.opacity = (t > 7.2 && i !== 1) ? .45 : 1;
              });
            }
          }
        };
      }
    },
    {
      title: '그럴듯함 ≠ 사실', dur: 13,
      captions: [
        { t: 0, text: '그럴듯함과 사실은 <em>겹치는 부분</em>이 많아요.' },
        { t: 5, text: '하지만 전부는 아니에요. 안 겹치는 자리도 있어요.' },
        { t: 9, text: '맞아 보이는 숫자도, AI가 자료를 <em>본 건 아니에요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const c1 = P.h('div', { style: 'left:300px;top:150px;width:360px;height:360px;border-radius:50%;border:3px solid #2BB3C9;background:rgba(43,179,201,.12)' });
        tl.at(stage.appendChild(c1), .3, { from: 'left' });
        const c2 = P.h('div', { style: 'left:560px;top:150px;width:360px;height:360px;border-radius:50%;border:3px solid #F2812D;background:rgba(242,129,45,.12)' });
        tl.at(stage.appendChild(c2), .8, { from: 'right' });
        const l1 = P.text({ x: 320, y: 300, w: 200, text: '그럴듯함', size: 28, weight: 800, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(l1.el), 2, { from: 'pop' });
        const l2 = P.text({ x: 760, y: 300, w: 200, text: '사실', size: 28, weight: 800, align: 'center', color: '#B3520F' });
        tl.at(stage.appendChild(l2.el), 2.4, { from: 'pop' });
        const ov = P.text({ x: 610, y: 175, w: 100, text: '겹침', size: 16, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(ov.el), 4.5, { from: 'down', dist: 10 });
        const mark = P.chip({ x: 380, y: 430, text: '423ppm · 420ppm', color: 'gray', size: 22 });
        tl.at(stage.appendChild(mark.el), 7, { from: 'pop' });
        const note = P.text({ x: 300, y: 480, w: 300, text: '맞아 보여도 근거는 못 봤어요', size: 18, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(note.el), 8, { from: 'up', dist: 10 });
        const q = P.quokka({ x: 40, y: 430, size: 220, pose: 'think' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 570, w: 620, text: '겹치는 게 많다고 <b>다 사실</b>은 아니에요.', tail: 'none', size: 24, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 10, { from: 'up' });
        return { tick(t) { q.tick(t, t > 10); } };
      }
    },
    {
      title: '거짓말이 아니라 패턴', dur: 13,
      captions: [
        { t: 0, text: '이건 <em>거짓말</em>이 아니에요. 속이려는 의도가 없거든요.' },
        { t: 5, text: '그럴듯하지만 사실이 아닌 내용을 만드는 걸 <em>할루시네이션</em>이라고 불러요.' },
        { t: 9.5, text: '의도가 없으니 더 조심해서 확인해야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const b1 = P.box({ x: 90, y: 170, w: 340, h: 150, label: '거짓말', sub: '일부러 속이려는 의도', accent: 'ink', icon: P.ICON.x });
        tl.at(stage.appendChild(b1.el), .3, { from: 'left' });
        const b2 = P.box({ x: 560, y: 170, w: 340, h: 150, label: '패턴 채우기', sub: '의도 없이 그럴듯하게 지어냄', accent: 'orange', icon: P.ICON.dice });
        tl.at(stage.appendChild(b2.el), 1.4, { from: 'right' });
        const midT = P.text({ x: 430, y: 220, w: 130, text: '아니라', size: 26, weight: 800, align: 'center' });
        tl.at(stage.appendChild(midT.el), 2.2, { from: 'pop' });
        const a1 = P.arrow(lines, { x1: 260, y1: 340, x2: 480, y2: 400, width: 4, color: '#1B1F24', curve: -20 });
        const a2 = P.arrow(lines, { x1: 730, y1: 340, x2: 560, y2: 400, width: 4, color: '#1B1F24', curve: 20 });
        const b3 = P.box({ x: 270, y: 400, w: 740, h: 140, label: '할루시네이션', sub: '그럴듯하지만 사실이 아닌 내용을 만드는 것', accent: 'aqua' });
        tl.at(stage.appendChild(b3.el), 6.6, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 440, size: 220, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 200, y: 560, w: 620, text: '거짓말이 아니라, 빈칸을 그럴듯하게 채운 거예요.', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            a1.draw(P.clamp((t - 4.6) / .7, 0, 1));
            a2.draw(P.clamp((t - 5.2) / .7, 0, 1));
          }
        };
      }
    },
    {
      title: '할 일', dur: 13,
      captions: [
        { t: 0, text: '숫자·날짜·고유명사는 꼭 <em>1차 출처</em>로 확인해요.' },
        { t: 5, text: '이미지 속 숫자는 그대로 쓰지 마세요.' },
        { t: 9, text: '필요한 숫자는 편집 단계에서 <em>자막으로</em> 새로 넣어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = [
          ['숫자·날짜·고유명사는 1차 출처로 확인', 120],
          ['이미지 속 숫자는 쓰지 않기', 260],
          ['필요한 숫자는 편집 단계에서 자막으로', 400]
        ];
        const boxes = rows.map(([label, y], i) => {
          const bx = P.box({ x: 170, y, w: 1020, h: 110, label, accent: 'aqua', icon: P.ICON.check });
          tl.at(stage.appendChild(bx.el), .4 + i * 1.6, { from: 'up' });
          return bx;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680, y1: 230 + i * 140, x2: 680, y2: 260 + i * 140, width: 4, color: '#127E90' }));
        const q = P.quokka({ x: 30, y: 460, size: 200, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 190, y: 550, w: 560, text: '확인은 늘 <b>사람 몫</b>이에요.', tail: 'left', size: 24, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 6.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 6.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 1.6)) / .5, 0, 1)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '가짜 단서 찾기',
    desc: '오늘 브루가 만든 두 장면 위에 숨은 <b>가짜 단서 5개</b>를 찾아보세요. 눌러 보면 원이 표시되고 설명 카드가 열려요.',
    mount(el, P) {
      const CLUES = [
        { id: 'f1-co2', frame: 1, x: 80.2, y: 11.1, w: 13.5, h: 16.7, label: '423ppm 패널',
          desc: '오른쪽 위 "CO₂ CONCENTRATION 423 ppm". 4초 뒤 다음 장면에서는 420ppm으로 바뀌어요. 자료를 본 게 아니라 그때그때 그럴듯하게 채운 숫자라서 그래요.' },
        { id: 'f1-title', frame: 1, x: 36.5, y: 15, w: 25, h: 8, label: '뭉개진 제목 글자',
          desc: '"GLOBAL TEMPERATURE ANOMALY" 중 TEMPERATURE 글자가 뭉개졌어요. 그림 그리듯 글자를 그리다 보니 생기는 흔한 흔적이에요.' },
        { id: 'f1-range', frame: 1, x: 42, y: 47, w: 14, h: 8, label: '"1880 – 2024" 그래프 라벨',
          desc: '그래프에 연도 범위까지 그럴듯하게 붙어 있어요. 곡선 모양은 그럴싸하지만, 이 값들이 실제 관측치라는 근거는 이 장면 안에 없어요.' },
        { id: 'f2-420', frame: 2, x: 17, y: 22, w: 23, h: 22, label: '420 PPM 큰 숫자',
          desc: '4초 전 화면은 423ppm이었는데 여기선 420ppm이에요. 두 장면이 각각 따로 "그럴듯하게" 그려졌다는 증거예요.' },
        { id: 'f2-2030', frame: 2, x: 57, y: 55, w: 22, h: 26, label: '2030년까지 이어진 x축',
          desc: '"HISTORICAL(지난) CO2 TREND" 그래프인데 x축이 2030까지 그려져 있어요. 아직 오지 않은 미래까지 그럴듯하게 이어 그린 거예요.' }
      ];
      const found = new Set();
      const wrap = P.h('div', { class: 'sim-e4' });
      const bar = P.h('div', { class: 'sim-e4-bar' });
      const counter = P.h('span', { class: 'sim-e4-counter' });
      const revealBtn = P.h('button', { class: 'btn primary', type: 'button' }, '정답 모두 보기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 찾기');
      bar.append(counter, revealBtn, resetBtn);
      const frames = P.h('div', { class: 'sim-e4-frames' });
      const cards = P.h('div', { class: 'sim-e4-cards', 'aria-live': 'polite' });
      wrap.append(bar, frames, cards);
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-e4-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-e4-counter{font-weight:800;font-family:var(--mono);color:var(--ink);margin-right:auto}
        .sim-e4-frames{display:grid;gap:16px;margin-top:16px}
        .sim-e4-frame{position:relative;width:100%;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#000;line-height:0}
        .sim-e4-frame img{width:100%;height:auto;display:block}
        .sim-hotspot{position:absolute;padding:0;margin:0;background:transparent;border:0;cursor:pointer}
        .sim-hotspot .ring{position:absolute;inset:0;border-radius:50%;border:3px dashed rgba(255,255,255,.35);opacity:.7;transform:scale(.9);transition:opacity .25s,transform .25s,border-color .25s}
        .sim-hotspot.found .ring{border:3px solid var(--orange);background:rgba(242,129,45,.16);opacity:1;transform:scale(1.06)}
        .sim-hotspot:focus-visible .ring{outline:2px solid var(--aqua);outline-offset:3px}
        .sim-e4-cards{display:grid;gap:10px;margin-top:16px}
        .sim-e4-card{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--paper);font-size:14.5px;line-height:1.55}
        .sim-e4-card b{display:block;color:#B3520F;margin-bottom:4px;font-size:14px}
        .sim-e4-empty{color:var(--faint);font-size:14px}
      ` });
      el.append(style);

      const frameImgs = {
        1: { src: 'assets/frames/v1-07s.webp', alt: '브루가 만든 기후 계기판 영상 7초 장면' },
        2: { src: 'assets/frames/v1-11s.webp', alt: '같은 영상 11초 장면' }
      };
      const hotspotEls = {};
      [1, 2].forEach(fn => {
        const box = P.h('div', { class: 'sim-e4-frame' });
        box.append(P.h('img', { src: frameImgs[fn].src, alt: frameImgs[fn].alt, draggable: 'false' }));
        CLUES.filter(c => c.frame === fn).forEach(c => {
          const btn = P.h('button', {
            class: 'sim-hotspot', type: 'button', 'aria-pressed': 'false', 'aria-label': `단서: ${c.label}`,
            style: `left:${c.x}%;top:${c.y}%;width:${c.w}%;height:${c.h}%`
          }, P.h('span', { class: 'ring', 'aria-hidden': 'true' }));
          btn.addEventListener('click', () => toggle(c.id));
          box.append(btn);
          hotspotEls[c.id] = btn;
        });
        frames.append(box);
      });

      const render = () => {
        counter.textContent = `${CLUES.length}개 중 ${found.size}개 찾음`;
        cards.replaceChildren(...(found.size ? CLUES.filter(c => found.has(c.id)).map(c =>
          P.h('div', { class: 'sim-e4-card' }, P.h('b', {}, c.label), c.desc)
        ) : [P.h('p', { class: 'sim-e4-empty' }, '아직 못 찾았어요. 화면을 눌러 보세요.')]));
        for (const c of CLUES) {
          const on = found.has(c.id);
          hotspotEls[c.id].classList.toggle('found', on);
          hotspotEls[c.id].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
      };
      const toggle = id => { found.has(id) ? found.delete(id) : found.add(id); render(); };
      revealBtn.addEventListener('click', () => { CLUES.forEach(c => found.add(c.id)); render(); });
      resetBtn.addEventListener('click', () => { found.clear(); render(); });
      render();
    }
  },

  teacherLines: [
    "AI는 '맞는 것'이 아니라 <b>'그럴듯한 것'</b>을 만들어요. 그래서 숫자는 꼭 다시 찾아봐야 해요.",
    'AI가 거짓말한 게 아니라, 빈칸을 그럴듯하게 채운 거예요. <b>확인은 사람 몫</b>이에요.'
  ],
  tip: {
    body: '숫자, 날짜, 고유명사는 <b>1차 출처</b>로 확인하고, 이미지 속 숫자는 쓰지 마세요. 필요한 숫자는 편집 단계에서 자막으로 넣어요.',
    extra: '브루 같은 도구가 만든 계기판·표·그래프 속 숫자는 전부 "확인 대상"이라고 생각하면 안전해요.'
  },
  myth: {
    myth: 'AI가 거짓말을 한다.',
    fact: '의도가 있는 게 아니라 그럴듯한 패턴을 만든 거예요. 그래서 더 조심해야 해요.'
  },
  sources: [
    { title: 'A Survey on Hallucination in Large Language Models (arXiv 2311.05232)', url: 'https://arxiv.org/abs/2311.05232', note: 'Huang et al. — 할루시네이션을 "그럴듯하지만 사실이 아닌 내용을 만드는 것"으로 정의해요.' },
    { title: 'Survey of Hallucination in Natural Language Generation (arXiv 2202.03629)', url: 'https://arxiv.org/abs/2202.03629', note: 'Ji et al. — 생성 모델이 사실에 근거하지 않은 내용을 만들어 내는 현상을 폭넓게 정리해요.' },
    { title: '오늘 사례 영상 — 브루 특강 강의안 (vrew-talk)', url: 'https://gottkf1208.github.io/vrew-talk/', note: 'v1.mp4의 7초·11초 부근 장면. 423ppm → 420ppm 변화와 뭉개진 제목을 직접 확인할 수 있어요.' }
  ],
  script: `
오늘 브루로 만든 기후변화 영상을 보다가 이상한 걸 발견했어요. 7초 장면에서는 이산화탄소가 423ppm이었는데, 11초 장면에서는 420ppm으로 바뀌어 있었어요. 겨우 4초 사이에 숫자가 달라진 거예요.

이유는 간단해요. 생성 AI는 사실을 확인해 주는 기계가 아니라, '다음 말·다음 모양'을 확률로 이어 붙이는 기계예요. 계기판을 그리라고 하면 빈칸에 그럴듯한 숫자를 채워 넣어요. 두 장면이 각각 따로 그려졌으니 숫자가 달라도 이상할 게 없어요.

그렇다고 이게 거짓말은 아니에요. 속이려는 의도가 없거든요. 그럴듯하지만 사실이 아닌 내용을 만드는 걸 '할루시네이션'이라고 불러요. 의도가 없다는 게 오히려 더 조심해야 할 이유예요.

그러니 숫자, 날짜, 고유명사는 꼭 1차 출처로 다시 확인하고, 이미지 속 숫자는 그대로 쓰지 마세요. 필요한 숫자는 편집 단계에서 자막으로 새로 넣어 주세요.
`
};
