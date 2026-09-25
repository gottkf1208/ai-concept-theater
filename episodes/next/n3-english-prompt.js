/* N3 [A] 영어 프롬프트가 조금 더 정확했던 이유: 학습 데이터의 언어 비중 */
export default {
  slug: 'n3-english-prompt',
  track: 'A',
  title: '영어 프롬프트가 조금 더 정확했던 이유',
  subtitle: '학습 데이터의 언어 비중',
  summary: '같은 장면을 한국어·영어로 만들어 보니 카메라 연출은 영어가 더 정확했던 이유를, 학습 데이터의 언어 비중으로 짚어봐요.',
  keywords: ['프롬프트', '학습 데이터', '언어 비중', 'CLIP', 'Common Crawl', '구체성'],

  scenes: [
    {
      title: '카메라 연출 비교', dur: 13,
      captions: [
        { t: 0, text: '<em>같은 장면</em>을 한국어와 영어 프롬프트로 각각 만들어 봤어요.' },
        { t: 5, text: '카메라 연출(<em>낮은 앵글</em>, <em>다가가는 카메라</em>) 표현은 영어 쪽이 조금 더 정확했어요.' },
        { t: 9.5, text: '나머지는 둘 다 <em>충분히 괜찮았어요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'tablet' });
        stage.append(q.el);
        const boxKR = P.box({ x: 330, y: 70, w: 480, h: 120, label: '한국어 프롬프트', sub: '"우산 쓰고 걷는 모습,<br>낮은 각도로 카메라가 다가가며"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(boxKR.el), .3, { from: 'left' });
        const boxEN = P.box({ x: 330, y: 220, w: 480, h: 100, label: '영어 프롬프트', sub: '"low angle, camera pushes in"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(boxEN.el), 1.4, { from: 'left' });
        const chip1 = P.chip({ x: 860, y: 100, text: '결과: 각도가 살짝 달라요', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip1.el), 2.6, { from: 'right' });
        const chip2 = P.chip({ x: 860, y: 250, text: '결과: 낮은 각도 정확', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(chip2.el), 3.4, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 810, y1: 125, x2: 858, y2: 112, width: 3, color: '#B3520F' });
        const a2 = P.arrow(lines, { x1: 810, y1: 270, x2: 858, y2: 262, width: 3, color: '#127E90' });
        const note = P.text({ x: 330, y: 400, w: 760, text: '카메라 연출 표현에서만 <em>작은 차이</em>가 있었어요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(note.el), 5.2, { from: 'up' });
        const foot = P.text({ x: 330, y: 470, w: 760, text: '나머지 내용은 한국어도 <i>충분히 괜찮았어요</i>.', size: 24, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(foot.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            a1.draw(P.clamp((t - 2.3) / .5, 0, 1));
            a2.draw(P.clamp((t - 3.1) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '원리: 사진과 설명 글을 짝지어 배워요', dur: 13,
      captions: [
        { t: 0, text: '많은 이미지·영상 생성 모델은 인터넷의 <em>사진</em>과 <em>설명 글</em>을 쌍으로 학습해요.' },
        { t: 5, text: '이런 방식을 보여준 연구가 <em>CLIP</em>이에요. 사진과 그 사진을 설명하는 글을 <em>짝지어</em> 봐요.' },
        { t: 9.5, text: '그 설명 글이 <em>어떤 언어</em>로 많이 쓰였는지가 다음 장면의 포인트예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 480, size: 220, pose: 'think' });
        stage.append(q.el);
        const title = P.text({ x: 60, y: 60, w: 1160, text: 'CLIP 같은 연구: 사진 ↔ 설명 글을 <em>짝</em>짓기', size: 30, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const pairs = [
          { photo: '사진 1', cap: '"a quokka walking in the rain"' },
          { photo: '사진 2', cap: '"고양이가 창가에 앉아있다"' }
        ];
        const leftBoxes = pairs.map((p, i) => {
          const b = P.box({ x: 380, y: 160 + i * 190, w: 220, h: 130, label: p.photo, sub: '', accent: 'aqua', icon: P.ICON.eye });
          tl.at(stage.appendChild(b.el), .8 + i * 1.4, { from: 'left' });
          return b;
        });
        const rightBoxes = pairs.map((p, i) => {
          const b = P.box({ x: 740, y: 160 + i * 190, w: 400, h: 130, label: '설명 글', sub: p.cap, accent: 'ink', icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), 1.6 + i * 1.4, { from: 'right' });
          return b;
        });
        const arrows = pairs.map((_, i) => P.arrow(lines, { x1: 600, y1: 225 + i * 190, x2: 740, y2: 225 + i * 190, width: 4, color: '#1B1F24' }));
        const chip = P.chip({ x: 500, y: 560, text: 'CLIP (2021) — 사진+글 쌍으로 학습', color: 'gray', size: 22 });
        tl.at(stage.appendChild(chip.el), 5.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (2.1 + i * 1.4)) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '통계: 인터넷 글의 언어 비중', dur: 13,
      captions: [
        { t: 0, text: '인터넷에 있는 <em>글</em>만 보면, 언어 비중은 고르지 않아요.' },
        { t: 5, text: '<em>영어</em> 비중이 가장 크고, <em>한국어</em>는 <em>1% 안팎</em>이에요. 통계 시점마다 조금씩 달라요.' },
        { t: 9.5, text: '그러니 전문 용어일수록 영어 자료를 <em>더 많이 봤을 가능성</em>이 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 420, size: 250, pose: 'oops' });
        stage.append(q.el);
        const title = P.text({ x: 340, y: 60, w: 880, text: '인터넷 글의 <em>언어 비중</em>(대략)', size: 30, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const bars = [
          { l: '영어', target: .92, color: '#2BB3C9', note: '가장 커요' },
          { l: '기타 언어', target: .40, color: '#9AA5AF', note: '여러 언어 합쳐' },
          { l: '한국어', target: .10, color: '#F2812D', note: '1% 안팎' }
        ];
        const baseX = 380, gap = 260, barW = 160, floorY = 560, maxH = 340;
        const wraps = bars.map((b, i) => {
          const wrap = P.h('div', { style: `position:absolute;left:${baseX + i * gap}px;top:${floorY - maxH}px;width:${barW}px;height:${maxH}px` });
          const fill = P.h('div', { style: `position:absolute;left:0;bottom:0;width:100%;background:${b.color};border-radius:10px 10px 0 0;height:0%` });
          wrap.append(fill);
          stage.appendChild(wrap);
          tl.at(wrap, .8 + i * .3, { from: 'up' });
          const noteEl = P.text({ x: baseX + i * gap - 30, y: floorY - maxH - 40, w: barW + 60, text: b.note, size: 18, weight: 700, align: 'center', color: '#127E90' });
          tl.at(stage.appendChild(noteEl.el), 5.2 + i * .3, { from: 'pop' });
          const lab = P.text({ x: baseX + i * gap - 30, y: floorY + 12, w: barW + 60, text: b.l, size: 20, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), .8 + i * .3, { from: 'up' });
          return { fill, target: b.target };
        });
        const foot = P.text({ x: 340, y: 630, w: 900, text: '정확한 숫자 대신 <i>크다/작다</i>로만 볼게요. 시점·자료마다 달라요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(foot.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            const k = P.easeOut(P.clamp((t - .8) / 3.2, 0, 1));
            wraps.forEach(w => { w.fill.style.height = `${w.target * k * 100}%`; });
          }
        };
      }
    },
    {
      title: '그래서: 전문 용어는 영어를 함께', dur: 13,
      captions: [
        { t: 0, text: '카메라 워크 같은 <em>전문 용어</em>는 영어를 함께 적으면 도움이 될 때가 있어요.' },
        { t: 5, text: '예를 들어 "낮은 각도<i>(low angle)</i>", "다가가는 카메라<i>(dolly in)</i>"처럼요.' },
        { t: 9.5, text: '물론 <em>도구마다 달라요</em>. 안 써도 잘 되는 도구도 많아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const title = P.text({ x: 380, y: 70, w: 820, text: '전문 용어는 <em>영어 병기</em>가 도움될 때가 있어요', size: 28, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const terms = [
          { l: '낮은 각도 (low angle)', acc: 'aqua' },
          { l: '다가가는 카메라 (dolly in)', acc: 'orange' },
          { l: '줌 아웃 (zoom out)', acc: 'ink' }
        ];
        const boxes = terms.map((t2, i) => {
          const b = P.box({ x: 380, y: 170 + i * 140, w: 560, h: 100, label: t2.l, sub: '', accent: t2.acc, icon: P.ICON.video });
          tl.at(stage.appendChild(b.el), .6 + i * 1.4, { from: 'right' });
          return b;
        });
        const bottom = P.text({ x: 380, y: 610, w: 700, text: '안 써도 잘 되는 도구도 많아요.', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(bottom.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            boxes.forEach((b, i) => b.on(t > .6 + i * 1.4 && t < 9.5));
          }
        };
      }
    },
    {
      title: '언어보다 구체성', dur: 12,
      captions: [
        { t: 0, text: '결국 중요한 건 언어보다 <em>구체성</em>이에요.' },
        { t: 4.5, text: '<em>피사체·카메라·조명·분위기·움직임</em>, 이 다섯 가지를 채워 보세요.' },
        { t: 9, text: '한국어든 영어든, 구체적으로 쓰면 <em>둘 다 좋아져요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 270, pose: 'wave' });
        stage.append(q.el);
        const big = P.text({ x: 340, y: 130, w: 860, text: '언어보다 <em>구체성</em>이에요', size: 40, weight: 800 });
        tl.at(stage.appendChild(big.el), .2, { from: 'up' });
        const items = ['피사체', '카메라', '조명', '분위기', '움직임'];
        const chips = items.map((c, i) => {
          const chip = P.chip({ x: 340 + i * 175, y: 280, text: c, color: i % 2 ? 'orange' : 'aqua', size: 24 });
          tl.at(stage.appendChild(chip.el), 1 + i * .5, { from: 'pop' });
          return chip;
        });
        const line = P.text({ x: 340, y: 400, w: 860, text: '한국어든 영어든, 구체적으로 쓰면 <i>둘 다 좋아져요</i>.', size: 28, weight: 700 });
        tl.at(stage.appendChild(line.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
          }
        };
      }
    }
  ],

  interaction: {
    title: '프롬프트 구체성 체크',
    desc: '미리 써 둔 프롬프트 6개 중 하나를 골라 보세요. <b>피사체·카메라·조명·분위기·움직임</b> 다섯 요소가 들어 있는지 체크하고, 구체성 점수를 보여 줘요. 아래 버튼을 누르면 더 구체적으로 고친 버전이 나타나요.',
    mount(el, P) {
      const LABELS = { subject: '피사체', camera: '카메라', light: '조명', mood: '분위기', move: '움직임' };
      const PRESETS = [
        {
          lang: '한국어 짧게',
          text: '쿼카가 걷는 영상 만들어 줘.',
          elems: { subject: true, camera: false, light: false, mood: false, move: false },
          improved: '쿼카가 우산을 쓰고 빗속을 걷는 모습, 낮은 각도에서 카메라가 천천히 다가가며, 노을빛 아래 차분한 분위기로.'
        },
        {
          lang: '한국어 구체적',
          text: '쿼카가 우산을 쓰고 빗속을 걷는 모습, 낮은 각도에서 카메라가 천천히 다가가며, 차분한 분위기로.',
          elems: { subject: true, camera: true, light: false, mood: true, move: true },
          improved: '쿼카가 우산을 쓰고 빗속을 걷는 모습, 낮은 각도에서 카메라가 천천히 다가가며, 노을빛 아래 차분한 분위기로. (조명을 더했어요)'
        },
        {
          lang: '영어 짧게',
          text: 'A quokka walking video.',
          elems: { subject: true, camera: false, light: false, mood: false, move: false },
          improved: 'A quokka walking in the rain holding an umbrella, low angle, camera slowly pushing in, warm sunset light, calm mood.'
        },
        {
          lang: '영어 구체적',
          text: 'A quokka walking in the rain holding an umbrella, low angle, camera slowly pushing in, calm mood.',
          elems: { subject: true, camera: true, light: false, mood: true, move: true },
          improved: 'A quokka walking in the rain holding an umbrella, low angle, camera slowly pushing in, warm sunset light, calm mood. (조명을 더했어요)'
        },
        {
          lang: '한국어+영어 병기',
          text: '쿼카가 우산을 쓰고 빗속을 걷는 모습, 낮은 각도(low angle)로 카메라가 다가가며(dolly in), 노을빛 아래 차분한 분위기로.',
          elems: { subject: true, camera: true, light: true, mood: true, move: true },
          improved: '이미 다섯 요소를 모두 갖췄어요. 언어를 섞어 써도 구체적이면 점수는 그대로예요.'
        },
        {
          lang: '오늘 실제 예시',
          text: '쿼카가 화면을 가리키며 설명하는 모습.\n낮은 각도에서 카메라가 다가가고, 따뜻한 조명 아래 차분한 분위기로.',
          elems: { subject: true, camera: true, light: true, mood: true, move: true },
          improved: '오늘 실제로 이렇게 써서 결과가 좋았어요. 다섯 요소가 이미 다 들어 있었어요.'
        }
      ];
      let idx = 0, shown = false;

      const radios = P.h('div', { class: 'sim-qs', role: 'radiogroup', 'aria-label': '프롬프트 고르기' });
      const promptCard = P.h('div', { class: 'sim-promptcard' });
      const checklist = P.h('ul', { class: 'sim-check' });
      const scoreWrap = P.h('div', { class: 'sim-score' });
      const noteP = P.h('p', { class: 'sim-note' }, '점수는 언어가 아니라 요소 수로만 계산돼요.');
      const moreBtn = P.h('button', { class: 'btn primary', type: 'button' }, '이 프롬프트를 더 구체적으로');
      const improvedBox = P.h('div', { class: 'sim-improved', hidden: '' });
      el.append(radios, promptCard, checklist, scoreWrap, noteP, P.h('div', { class: 'sim-bar' }, moreBtn), improvedBox);
      const style = P.h('style', { html: `
        .sim-qs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-qs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-qs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-promptcard{margin-top:16px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);max-width:100%}
        .sim-promptcard p{margin:0;font-size:16px;line-height:1.6;white-space:pre-line}
        .sim-check{list-style:none;margin:16px 0 0;padding:0;display:flex;gap:10px;flex-wrap:wrap}
        .sim-check li{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700;padding:7px 12px;border-radius:999px;border:1px solid var(--line);color:var(--muted);background:#fff}
        .sim-check li.yes{color:var(--aqua-deep);border-color:var(--aqua);background:var(--aqua-pale)}
        .sim-check li.no{color:var(--faint)}
        .sim-check .ico{width:16px;height:16px;display:inline-flex}
        .sim-check .ico svg{width:100%;height:100%}
        .sim-score{display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap}
        .sim-score-num{font-family:var(--mono);font-size:13px;color:var(--muted);font-weight:700}
        .sim-pips{display:flex;gap:6px}
        .sim-pips .pip{width:22px;height:14px;border-radius:4px;background:var(--paper);border:1px solid var(--line)}
        .sim-pips .pip.on{background:var(--aqua);border-color:var(--aqua)}
        .sim-note{margin-top:10px;font-size:13px;color:var(--muted)}
        .sim-bar{margin-top:16px}
        .sim-improved{margin-top:14px;border:1px solid var(--orange);background:var(--orange-pale);border-radius:14px;padding:14px 16px;font-size:15px;line-height:1.6;color:#7A3B10;white-space:pre-line;max-width:100%}
      ` });
      el.append(style);

      const render = () => {
        radios.replaceChildren(...PRESETS.map((p, i) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': i === idx ? 'true' : 'false' }, p.lang);
          b.addEventListener('click', () => { idx = i; shown = false; render(); });
          return b;
        }));
        const cur = PRESETS[idx];
        promptCard.replaceChildren(P.h('p', {}, cur.text));
        checklist.replaceChildren(...Object.entries(LABELS).map(([k, label]) => {
          const has = cur.elems[k];
          return P.h('li', { class: has ? 'yes' : 'no' }, P.h('span', { class: 'ico', html: has ? P.ICON.check : P.ICON.x }), label);
        }));
        const score = Object.values(cur.elems).filter(Boolean).length;
        const pipRow = P.h('div', { class: 'sim-pips' });
        for (let i = 0; i < 5; i++) pipRow.append(P.h('span', { class: 'pip' + (i < score ? ' on' : '') }));
        scoreWrap.replaceChildren(P.h('span', { class: 'sim-score-num' }, `구체성 점수 ${score} / 5`), pipRow);
        improvedBox.hidden = !shown;
        improvedBox.textContent = shown ? cur.improved : '';
      };
      moreBtn.addEventListener('click', () => { shown = true; render(); });
      render();
    }
  },

  teacherLines: [
    '많은 AI 모델은 <b>영어 자료</b>를 압도적으로 많이 보고 배웠어요.',
    '그래도 한국어로 충분히 되니, 중요한 건 언어보다 <b>얼마나 구체적으로</b> 쓰느냐예요.'
  ],
  tip: {
    body: '카메라 워크 같은 전문 용어는 영어를 함께 적어 주면(예: "낮은 각도, low angle") 인식이 더 잘 될 때가 있어요. 서비스마다 차이가 있으니 같은 장면을 한국어·영어로 각각 만들어 비교해 보는 것도 방법이에요.',
    extra: '무엇보다 <b>피사체·카메라·조명·분위기·움직임</b> 다섯 가지를 채워서 쓰면, 어느 언어든 결과가 좋아져요.'
  },
  myth: {
    myth: '한국어 프롬프트는 성능이 떨어진다.',
    fact: '성능이 떨어진다기보다, 학습 자료에서 영어 비중이 훨씬 크다 보니 전문 용어 표현에서 차이가 날 수 있어요. 구체적으로 쓰면 한국어로도 좋은 결과를 얻을 수 있어요.'
  },
  sources: [
    { title: 'Learning Transferable Visual Models From Natural Language Supervision (CLIP, arXiv 2021)', url: 'https://arxiv.org/abs/2103.00020', note: '인터넷의 이미지-텍스트 쌍으로 학습한다는 것을 보여준 연구.' },
    { title: 'Common Crawl — 언어별 통계', url: 'https://commoncrawl.github.io/cc-crawl-statistics/plots/languages', note: '웹 텍스트에서 영어 비중이 다른 언어보다 훨씬 크다는 걸 보여주는 통계.' },
    { title: '오늘의 사례 — 브루 대본 비교(vrew-talk)', url: 'https://gottkf1208.github.io/vrew-talk/', note: '같은 장면을 한국어·영어 프롬프트로 만들어 본 오늘 기록.' }
  ],
  script: `같은 장면을 한국어와 영어 프롬프트로 각각 만들어 봤는데, 카메라 연출 표현은 영어 쪽이 조금 더 정확했어요. 왜 이런 차이가 날까요.

많은 이미지·영상 생성 모델은 인터넷에 있는 이미지와 글 설명을 짝지어 학습해요(CLIP 같은 연구가 대표적이에요). 그런데 인터넷 텍스트 통계를 보면 영어 비중이 압도적으로 크고, 한국어는 1% 안팎이에요. 그러니 카메라 워크처럼 전문 용어가 많은 표현은 영어 자료를 더 많이 봤을 가능성이 높아요.

그렇다고 한국어가 안 되는 건 아니에요. 오늘 사례처럼 한국어로도 충분히 좋은 결과가 나왔어요. 다만 줌, 트래킹 샷 같은 전문 용어는 영어를 함께 적어 주면 도움이 될 때가 있어요. 결국 중요한 건 언어보다, 피사체·카메라·조명·분위기·움직임을 얼마나 구체적으로 채워 쓰느냐예요.`
};
