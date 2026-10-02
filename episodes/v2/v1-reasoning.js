/* S1-6 [살리는 편] "생각하는 시간"이 있는 AI: 추론 모델과 노력 수준(effort) */
export default {
  slug: 'v1-reasoning',
  track: 'S1',
  title: '"생각하는 시간"이 있는 AI는 무엇이 다를까?',
  subtitle: '추론 모델과 노력 수준(effort)',
  summary: '답하기 전에 중간 단계를 풀어 보는 추론 모델이 무엇이고, 2026년 최신 모델처럼 생각이 기본으로 켜진 뒤에는 "얼마나 깊이"를 어떻게 조절하는지 짚어봐요.',
  keywords: ['추론 모델', '확장 사고', '적응형 사고', 'adaptive thinking', 'Chain-of-Thought', '노력 수준', 'effort', '테스트 시점 연산', '생각 토큰', '과잉 사고'],

  scenes: [
    {
      title: '왜 어떤 답은 한참 걸릴까', dur: 13,
      captions: [
        { t: 0, text: '같은 질문인데, AI가 <em>바로</em> 답할 때도 있고 몇 초 <em>"생각 중…"</em>이 뜰 때도 있어요.' },
        { t: 5, text: '"학생 27명을 4명씩 모둠으로 나누면 남는 학생은?" — 바로 답한 AI는 <em>4명</em>이라고 했어요. 틀렸어요.' },
        { t: 9.5, text: '몇 초 뒤 다시 물으니 <em>3명</em>이라고, 이유까지 붙여 답해요. 왜 다를까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 360, pose: 'think' });
        stage.append(q.el);
        const qbox = P.box({ x: 460, y: 90, w: 730, h: 60, label: '학생 27명을 4명씩 모둠으로 나누면 남는 학생은?', sub: '', accent: 'ink' });
        tl.at(stage.appendChild(qbox.el), .3, { from: 'up' });

        const wrongB = P.bubble({ x: 460, y: 190, w: 420, text: '"정답: <b>4명</b>이 남아요."', tail: 'left', tone: 'orange' });
        tl.at(stage.appendChild(wrongB.el), 1.4, { from: 'up' });
        const wrongChip = P.chip({ x: 900, y: 200, text: '오답 · 즉답', color: 'orange', size: 20 });
        tl.at(stage.appendChild(wrongChip.el), 1.9, { from: 'pop' });

        const thinking = P.text({ x: 460, y: 300, w: 420, text: '', size: 22, weight: 700, cls: 'mono', color: '#127E90' });
        tl.at(stage.appendChild(thinking.el), 5.2, { from: 'none' });

        const rightB = P.bubble({ x: 460, y: 350, w: 700, text: '"27÷4=6모둠, 6×4=24명. <b>3명</b>이 남아요."', tail: 'left', tone: 'aqua' });
        tl.at(stage.appendChild(rightB.el), 7.5, { from: 'up' });
        const rightChip = P.chip({ x: 1180 - 150, y: 435, text: '정답 · 몇 초 걸림', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(rightChip.el), 8, { from: 'pop' });

        const qq = P.text({ x: 460, y: 560, w: 730, text: '왜 어떤 답은 빠르고, 어떤 답은 <em>느릴까요</em>?', size: 32, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.6, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, (t > 1.4 && t < 4) || (t > 7.5 && t < 9.5));
            if (t > 5.2 && t < 7.5) {
              const n = 1 + Math.floor(t * 2.4) % 3;
              thinking.set('생각 중' + '.'.repeat(n));
            } else if (t >= 7.5) {
              thinking.set('생각 중··· (다 생각했어요)');
            }
          }
        };
      }
    },
    {
      title: '사람이 시키던 방법이 모델 안으로', dur: 14,
      captions: [
        { t: 0, text: '원래는 사람이 프롬프트에 <em>"단계별로 생각해 보자"</em>라고 써 주던 방법이었어요. 2022년 연구가 이걸 <em>생각의 사슬</em>이라고 불렀어요.' },
        { t: 5, text: '2025년에는 풀이 예시 없이 <em>강화학습만으로</em> 이 습관을 익힌 모델이 나왔어요.' },
        { t: 10.5, text: '문제를 여러 단계로 쪼개 풀고, 스스로 <em>검토</em>한 뒤에 답해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const quoteB = P.bubble({ x: 320, y: 100, w: 620, text: '"단계별로 생각해 보자" — 사람이 프롬프트에 직접 썼던 말', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(quoteB.el), .4, { from: 'up', until: 5.6 });

        const nodes = [
          { label: '문제', sub: '', icon: P.ICON.doc, acc: 'ink' },
          { label: '단계 1', sub: '', icon: P.ICON.brain, acc: 'aqua' },
          { label: '단계 2', sub: '', icon: P.ICON.brain, acc: 'aqua' },
          { label: '검토', sub: '', icon: P.ICON.eye, acc: 'orange' },
          { label: '답', sub: '', icon: P.ICON.check, acc: 'aqua' }
        ];
        const bw = 190, gap = 40, x0 = 60, y0 = 340;
        const boxes = nodes.map((n, i) => {
          const b = P.box({ x: x0 + i * (bw + gap), y: y0, w: bw, h: 100, label: n.label, sub: n.sub, accent: n.acc, icon: n.icon });
          tl.at(stage.appendChild(b.el), 5.9 + i * .6, { from: 'pop' });
          return b;
        });
        const arrows = nodes.slice(1).map((_, i) => {
          const x1 = x0 + i * (bw + gap) + bw, x2 = x1 + gap;
          return P.arrow(lines, { x1, y1: y0 + 50, x2, y2: y0 + 50, width: 4, color: '#1B1F24' });
        });
        const capLbl = P.text({ x: 60, y: 240, w: 1160, text: '생각의 사슬(2022년 연구) → 2025년엔 강화학습만으로 이 습관을 <i>익힌 모델</i>이 나왔어요', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(capLbl.el), 5.5, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, true);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (6.4 + i * .6)) / .5, 0, 1)));
            if (t > 10.5) { const k = Math.floor((t - 10.5) * 1.6) % nodes.length; boxes.forEach((b, i) => b.on(i === k)); }
          }
        };
      }
    },
    {
      title: '이런 문제에 강해요', dur: 13,
      captions: [
        { t: 0, text: '중간에 <em>여러 단계를 거치고 검토</em>가 필요한 일에 특히 강해요.' },
        { t: 5, text: '수학 문장제, 여러 단계짜리 계획, 코드 디버깅 — 모두 <em>중간에 확인할 게 많은</em> 일이에요.' },
        { t: 9.5, text: '풀이 과정을 길게 써 보면서 스스로 <em>틀린 부분을 고쳐요</em>. 2024년 연구에서는 연산을 더 쓴 작은 모델이 <em>14배 큰 모델</em>과 맞먹기도 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 300, pose: 'glass' });
        stage.append(q.el);
        const items = [
          { label: '수학 문장제', sub: '여러 단계 계산이 필요할 때', icon: P.ICON.brain, acc: 'aqua' },
          { label: '여러 단계 계획', sub: '순서를 여러 개 정할 때', icon: P.ICON.doc, acc: 'orange' },
          { label: '코드 디버깅', sub: '오류를 찾고 고칠 때', icon: P.ICON.search, acc: 'aqua' }
        ];
        const boxes = items.map((it, i) => {
          const b = P.box({ x: 420, y: 110 + i * 165, w: 780, h: 130, label: it.label, sub: it.sub, accent: it.acc, icon: it.icon });
          tl.at(stage.appendChild(b.el), .4 + i * .8, { from: 'right' });
          return b;
        });
        const note = P.text({ x: 420, y: 610, w: 780, text: '공통점: <em>중간 검토</em>가 필요한 일', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            if (t > 1.2) { const k = Math.floor(t * .9) % boxes.length; boxes.forEach((b, i) => b.on(i === k)); }
          }
        };
      }
    },
    {
      title: '대신 느리고 비싸요', dur: 13,
      captions: [
        { t: 0, text: '생각에 쓴 글도 토큰이라서, 화면에 안 보여도 <em>출력 토큰으로 과금</em>되고 시간이 늘어요.' },
        { t: 5.5, text: '인사말이나 2+3 같은 쉬운 질문에 길게 생각하는 걸 <em>과잉 사고</em>라고 불러요.' },
        { t: 10, text: '답은 <em>같은데</em> 느려지기만 해요. 문제 <em>난이도</em>를 보고 켤지 말지 정하는 게 좋아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const hard = P.box({ x: 60, y: 100, w: 560, h: 190, label: '복잡한 문제 (수학·계획·디버깅)', sub: '확장 사고를 켜면 정확도가 올라가요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(hard.el), .3, { from: 'left' });
        const hardStat = P.text({ x: 90, y: 250, w: 500, text: '시간·토큰이 <em>크게 늘어요</em> (대략)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(hardStat.el), 1, { from: 'up' });

        const easy = P.box({ x: 60, y: 350, w: 560, h: 190, label: '간단한 질문 (인사말 등)', sub: '켜도 답은 똑같아요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(easy.el), 5.8, { from: 'left' });
        const easyStat = P.text({ x: 90, y: 500, w: 500, text: '시간·토큰만 늘고 답은 <i>그대로</i>예요', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(easyStat.el), 6.4, { from: 'up' });

        const q = P.quokka({ x: 700, y: 340, size: 340, pose: 'oops' });
        tl.at(stage.appendChild(q.el), 5.5, { from: 'right' });
        const lastTxt = P.text({ x: 680, y: 120, w: 540, text: '쉬운 질문에서는 <em>느려지기만</em> 해요', size: 30, weight: 800 });
        tl.at(stage.appendChild(lastTxt.el), 10.1, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > 10);
            hard.on(t < 5.5);
            easy.on(t >= 5.5);
          }
        };
      }
    },
    {
      title: '2026년: 생각은 켜져 있고, 깊이를 고르는 시대', dur: 14,
      captions: [
        { t: 0, text: '2026년 최신 모델은 생각이 <em>기본으로 켜져</em> 있어요. 문제를 보고 얼마나 생각할지 모델이 스스로 정해요.' },
        { t: 5.5, text: '이걸 <em>적응형 사고</em>라고 해요. 사람이 고르는 건 <em>노력 수준</em>이에요.' },
        { t: 10.5, text: '낮음에선 쉬운 문제는 생각을 건너뛰고, 높음에선 더 깊이 생각해요. 화면에 보이는 생각은 요약본이라 판단 근거를 다 보여 주진 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 340, pose: 'wave' });
        stage.append(q.el);

        const headline = P.text({ x: 400, y: 90, w: 820, text: '생각은 <em>기본으로 켜져</em> 있어요', size: 32, weight: 800 });
        tl.at(stage.appendChild(headline.el), .3, { from: 'up' });
        const sub = P.text({ x: 400, y: 150, w: 820, text: '사람이 고르는 건 <i>노력 수준(effort)</i>이에요', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(sub.el), 5.6, { from: 'up' });

        const levelData = [
          ['낮음', 'gray', 400],
          ['보통', 'aqua', 610],
          ['높음', 'aqua', 790],
          ['최대', 'orange', 970]
        ];
        const chips = levelData.map(([text, color, x], i) => {
          const c = P.chip({ x, y: 230, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), 6.2 + i * .35, { from: 'pop' });
          return c;
        });
        const dialArrow = P.arrow(lines, { x1: 400, y1: 280, x2: 1190, y2: 280, width: 4, color: '#9AA5AF' });

        const skipNote = P.text({ x: 400, y: 320, w: 820, text: '<em>낮음</em>: 쉬운 문제는 생각을 건너뛰어요 · <em>높음·최대</em>: 더 깊이 생각해요', size: 19, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(skipNote.el), 10.8, { from: 'up' });

        const summaryBox = P.box({ x: 400, y: 410, w: 820, h: 150, label: '화면에 보이는 "생각"', sub: '실제 판단 근거를 다 보여 주는 게 아니라 요약이에요', accent: 'orange', icon: P.ICON.eye });
        tl.at(stage.appendChild(summaryBox.el), 11.4, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > 10.5);
            dialArrow.draw(P.clamp((t - 6.1) / 1.6, 0, 1));
            summaryBox.on(t > 11.4);
          }
        };
      }
    }
  ],

  interaction: {
    title: '노력 수준 다이얼',
    desc: '문제를 고르고 <b>노력 수준 다이얼</b>을 낮음부터 높음까지 옮겨 보세요. 걸린 시간과 토큰 비용(대략적인 예시)이 함께 바뀌어요. 수학 문장제의 낮음에서는 모델이 짧게 생각해 정답을 맞히는 걸 볼 수 있어요. 보조 버튼으로 옛날 방식(생각 꺼짐)과 비교해 보세요.',
    mount(el, P) {
      const PROBLEMS = [
        {
          label: '인사말',
          q: '"안녕하세요, 오늘 기분 어때요?"',
          levels: [
            { think: false, skip: true, sec: 0.6, tok: 15, ok: null, body: '"안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' },
            { think: true, sec: 3.2, tok: 140, ok: null, body: '(생각을 거쳤지만) "안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' },
            { think: true, sec: 7.5, tok: 420, ok: null, body: '(오래 생각했지만) "안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' }
          ],
          legacy0: null,
          note: '세 단계 모두 답은 <b>똑같아요</b>. <b>낮음</b>에서는 생각을 건너뛰어 더 빨라요.'
        },
        {
          label: '수학 문장제',
          q: '"학생 27명을 4명씩 모둠으로 나누면 남는 학생은?"',
          levels: [
            { think: true, sec: 2, tok: 90, ok: true, body: '27÷4=6 나머지 3. "정답: 3명이 남아요."' },
            { think: true, sec: 4, tok: 220, ok: true, body: '27을 4로 나누면 6모둠에 3명이 남아요. "정답: 3명"' },
            { think: true, sec: 8, tok: 500, ok: true, body: '27÷4=6 나머지 3. 6모둠(24명)을 만들고 27-24=3. "정답: 3명"' }
          ],
          legacy0: { think: false, sec: 0.5, tok: 10, ok: false, body: '"정답: 4명이 남아요."' },
          note: '<b>낮음</b>에서도 짧게 생각해 정답을 맞혀요. 옛날 방식(생각 꺼짐) 비교 버튼을 눌러 보세요.'
        },
        {
          label: '수업 계획',
          q: '"5학년 AI 영상 수업 3차시 계획을 짜 주세요"',
          levels: [
            { think: false, sec: 0.7, tok: 40, ok: null, body: '1차시 기획, 2차시 촬영, 3차시 편집으로 하면 될 것 같아요.' },
            { think: true, sec: 4, tok: 220, ok: null, body: '1차시(주제 정하기·콘티), 2차시(역할 나누기·촬영), 3차시(편집 도구 안내·학급 발표)로 나눴어요.' },
            { think: true, sec: 9, tok: 600, ok: null, body: '1차시(주제·콘티, 준비물 안내), 2차시(역할 분담·촬영·안전 지도), 3차시(편집 실습·평가 기준 안내·학급 발표)까지 세부 활동과 확인 지점을 넣었어요.' }
          ],
          legacy0: null,
          note: '복잡한 계획일수록 <b>더 깊이 생각할수록</b> 자세해져요.'
        }
      ];
      const LEVEL_NAMES = ['낮음', '보통', '높음'];
      let probIdx = 0, level = 0, legacyOn = false;

      const dialSec = P.h('div', { class: 'sim-sec' },
        P.h('h4', {}, '노력 수준 다이얼'),
        (() => { const lb = P.h('label', { for: 'sim-effort-range', class: 'sim-cap' }); return lb; })()
      );
      const capLabel = dialSec.querySelector('label');
      const slider = P.h('input', { id: 'sim-effort-range', type: 'range', min: '0', max: '2', step: '1', value: '0', class: 'sim-range', 'aria-label': '노력 수준(0=낮음, 2=높음)' });
      dialSec.append(slider);

      const legacyBtn = P.h('button', { class: 'btn small sim-legacy-btn', type: 'button', 'aria-pressed': 'false' }, '옛날 방식과 비교');
      dialSec.append(legacyBtn);

      const probSec = P.h('div', { class: 'sim-sec' }, P.h('h4', {}, '문제 고르기'));
      const probWrap = P.h('div', { class: 'sim-probs', role: 'radiogroup', 'aria-label': '문제 고르기' });
      PROBLEMS.forEach((p, i) => {
        const b = P.h('button', { class: 'btn', type: 'button', role: 'radio', 'aria-checked': i === 0 ? 'true' : 'false' }, p.label);
        b.addEventListener('click', () => { probIdx = i; render(); });
        probWrap.append(b);
      });
      probSec.append(probWrap);

      const out = P.h('div', { class: 'sim-out', 'aria-live': 'polite' });

      function render() {
        capLabel.textContent = `노력 수준: ${LEVEL_NAMES[level]} (${level}/2)`;
        [...probWrap.children].forEach((b, i) => b.setAttribute('aria-checked', i === probIdx ? 'true' : 'false'));
        const p = PROBLEMS[probIdx];
        const useLegacy = legacyOn && level === 0 && !!p.legacy0;
        const lv = useLegacy ? p.legacy0 : p.levels[level];
        const secPct = Math.min(100, Math.round((lv.sec / 9) * 100));
        const tokPct = Math.min(100, Math.round((lv.tok / 600) * 100));
        out.replaceChildren(
          P.h('p', { class: 'sim-q' }, p.q),
          useLegacy ? P.h('p', { class: 'sim-legacy-flag' }, '지금은 옛날 방식(생각 꺼짐)과 비교 중이에요.') : null,
          lv.think ? P.h('p', { class: 'sim-thinking' }, `생각 중… (${LEVEL_NAMES[level]})`) : (lv.skip ? P.h('p', { class: 'sim-thinking skip' }, '(생각 건너뜀)') : null),
          P.h('div', { class: `sim-ans${lv.ok === false ? ' bad' : lv.ok === true ? ' good' : ''}` },
            lv.ok === true ? P.h('span', { class: 'sim-flag good' }, '정답') : lv.ok === false ? P.h('span', { class: 'sim-flag bad' }, '오답') : null,
            P.h('span', {}, lv.body)
          ),
          P.h('div', { class: 'sim-bars' },
            P.h('div', { class: 'sim-bar-row' }, P.h('span', { class: 'sim-bar-lbl' }, `걸린 시간 약 ${lv.sec}초`), P.h('div', { class: 'sim-bar-track' }, P.h('div', { class: 'sim-bar-fill time', style: `width:${secPct}%` }))),
            P.h('div', { class: 'sim-bar-row' }, P.h('span', { class: 'sim-bar-lbl' }, `토큰 비용 약 ${lv.tok}개`), P.h('div', { class: 'sim-bar-track' }, P.h('div', { class: 'sim-bar-fill cost', style: `width:${tokPct}%` })))
          ),
          P.h('p', { class: 'sim-note', html: p.note })
        );
      }
      slider.addEventListener('input', () => { level = +slider.value; render(); });
      legacyBtn.addEventListener('click', () => {
        legacyOn = !legacyOn;
        legacyBtn.setAttribute('aria-pressed', String(legacyOn));
        render();
      });

      const disclaimer = P.h('p', { class: 'sim-disclaimer' }, '예시 답변이며 실제 모델 출력이 아니에요. 시간·토큰 수치는 이해를 돕기 위한 대략적인 예시예요.');

      const style = P.h('style', { html: `
        .sim-sec{margin-top:20px}
        .sim-sec:first-child{margin-top:0}
        .sim-sec h4{font-size:15px;font-weight:800;margin-bottom:8px}
        .sim-cap{display:block;font-weight:700;font-family:var(--mono);font-size:13.5px;margin-bottom:6px}
        .sim-range{width:100%;max-width:100%}
        .sim-legacy-btn{margin-top:10px}
        .sim-legacy-btn[aria-pressed="true"]{background:var(--orange-pale);border-color:#F2812D;color:#F2812D}
        .sim-probs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-probs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted)}
        .sim-probs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-out{margin-top:18px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);display:flex;flex-direction:column;gap:10px;max-width:100%;box-sizing:border-box}
        .sim-q{font-weight:800;font-size:15px;margin:0}
        .sim-legacy-flag{font-family:var(--mono);color:#F2812D;font-weight:700;margin:0;font-size:13px}
        .sim-thinking{font-family:var(--mono);color:#127E90;font-weight:700;margin:0;font-size:13.5px}
        .sim-thinking.skip{color:#9AA5AF}
        .sim-ans{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;border-radius:10px;background:#fff;border:1px solid var(--line);font-size:14.5px;line-height:1.5}
        .sim-ans.bad{border-color:#F9D3B8;background:var(--orange-pale)}
        .sim-ans.good{border-color:#bfe3e9}
        .sim-flag{font-size:11.5px;font-weight:800;border-radius:999px;padding:2px 8px;flex:0 0 auto}
        .sim-flag.bad{background:#F2812D;color:#fff}
        .sim-flag.good{background:#127E90;color:#fff}
        .sim-bars{display:flex;flex-direction:column;gap:8px;margin-top:4px}
        .sim-bar-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-bar-lbl{font-size:12.5px;color:var(--muted);width:140px;flex:0 0 auto}
        .sim-bar-track{flex:1;min-width:100px;height:10px;border-radius:6px;background:#eee;overflow:hidden}
        .sim-bar-fill{height:100%;border-radius:6px;transition:width .2s}
        .sim-bar-fill.time{background:#2BB3C9}
        .sim-bar-fill.cost{background:#F2812D}
        .sim-note{font-size:12.5px;color:var(--muted);margin:0}
        .sim-disclaimer{margin-top:14px;font-size:12px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px}
      ` });

      el.append(style, dialSec, probSec, out, disclaimer);
      render();
    }
  },

  teacherLines: [
    '어떤 AI는 답을 바로 내지 않고 <b>풀이를 먼저 써 보고</b> 답해요. 어려운 문제일수록 효과가 커요.',
    '쉬운 질문엔 오래 생각해도 답이 같아요. <b>문제 난이도에 맞춰</b> 깊이를 고르는 게 똑똑한 사용법이에요.'
  ],
  tip: {
    body: '성적 처리 수식 점검, 여러 조건이 걸린 시간표 짜기처럼 단계가 많은 일은 노력 수준을 높여 맡기고, 안내 문구 다듬기 같은 일은 낮은 수준이나 빠른 모델로 충분해요.',
    extra: '화면에 보이는 "생각"은 요약본이고 판단 근거를 다 밝히지 않을 수 있어요. 결론은 생각 과정이 아니라 결과물과 출처로 확인하세요.'
  },
  myth: {
    myth: '오래 생각할수록 언제나 더 똑똑한 답이 나온다.',
    fact: '단계가 많은 문제에는 도움이 되지만, 쉬운 문제에서는 답은 같고 시간과 토큰만 늘어나요(과잉 사고). 그래서 2026년 최신 모델은 문제를 보고 생각할 양을 스스로 정하고, 사람은 노력 수준으로 상한을 조절해요.'
  },
  sources: [
    { title: 'Claude 문서 — Thinking', url: 'https://platform.claude.com/docs/en/build-with-claude/thinking', note: '생각이 하는 일, 생각 토큰 과금, 보이는 생각은 요약, 최신 모델의 적응형 사고.' },
    { title: 'Claude 문서 — Effort', url: 'https://platform.claude.com/docs/en/build-with-claude/effort', note: '노력 수준 다섯 단계와 기본값, 낮은 수준에서 쉬운 문제는 생각을 건너뜀.' },
    { title: 'Wei et al. — Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (arXiv, 2022)', url: 'https://arxiv.org/abs/2201.11903', note: '중간 단계를 쓰게 하면 복잡한 추론이 좋아진다는 걸 보인 연구.' },
    { title: 'DeepSeek-AI — DeepSeek-R1 (arXiv 2025, Nature 2025)', url: 'https://arxiv.org/abs/2501.12948', note: '강화학습만으로 자기 검증·성찰 같은 추론 습관을 익힌 연구.' }
  ],
  script: `요즘 AI 중엔 바로 답하지 않고 중간 단계를 풀어 보고 답하는 추론 모델이 있어요. "27명을 4명씩 모둠으로 나누면?"에 바로 답하면 틀리기 쉬운데, 몇 초 생각한 쪽은 풀이까지 붙여 정확히 답해요.

원래는 사람이 "단계별로 생각해 보자"라고 써 주던 방법(2022년 연구)이었는데, 2025년엔 강화학습만으로 이 습관을 익힌 모델이 나왔어요. 그래서 수학 문제나 여러 단계 계획, 코드 디버깅처럼 중간 검토가 필요한 일에 강해요.

다만 생각에 쓴 글도 출력 토큰으로 과금되고 시간이 늘어요. 인사말 같은 쉬운 질문에 길게 생각하는 과잉 사고는 느려지기만 해요. 2026년 최신 모델은 생각이 기본으로 켜져 있고 모델이 스스로 깊이를 정하는데, 사람은 노력 수준으로 상한을 골라요. 화면의 생각은 요약본이라 판단 근거를 다 보여 주진 않으니, 결론은 결과물과 출처로 확인하세요.`
};
