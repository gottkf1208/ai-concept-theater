/* N4 [B] "생각하는 시간"이 있는 AI: 추론 모델 */
export default {
  slug: 'n4-reasoning',
  track: 'B',
  title: '"생각하는 시간"이 있는 AI',
  subtitle: '추론 모델',
  summary: '답하기 전에 중간 단계를 길게 풀어 보는 "확장 사고" 방식이 무엇이고, 언제 필요한지 짚어봐요.',
  keywords: ['추론 모델', '확장 사고', 'Chain-of-Thought', '생각하는 시간', '추론 모드'],

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
        { t: 0, text: '원래는 사람이 프롬프트에 <em>"단계별로 생각해 보자"</em>라고 직접 써 주던 방법이었어요.' },
        { t: 5, text: '이 방식을 Chain-of-Thought(생각의 사슬)라고 불러요(Wei 외, 2022). 지금은 이 과정을 <em>모델 안에 넣은</em> 모델들이 나왔어요.' },
        { t: 10.5, text: '문제를 여러 단계로 쪼개 풀고, 한 번 <em>검토</em>한 뒤에 답해요.' }
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
        const capLbl = P.text({ x: 60, y: 240, w: 1160, text: 'Chain-of-Thought Prompting (Wei et al., 2022) → 지금은 이 과정을 <i>안에 넣은 모델</i>들이 나왔어요', size: 22, weight: 700, cls: 'muted' });
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
        { t: 9.5, text: '풀이 과정을 길게 써 보면서 스스로 <em>틀린 부분을 고쳐요</em>.' }
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
        { t: 0, text: '대신 시간이 더 걸리고, 토큰도 더 많이 써서 <em>비용</em>이 늘어요.' },
        { t: 5.5, text: '인사말이나 짧은 사실 확인처럼 <em>쉬운 질문엔 차이가 거의 없어요</em>. 느려지기만 해요.' },
        { t: 10, text: '그러니 <em>문제 난이도</em>를 보고 켤지 말지 정하는 게 좋아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const hard = P.box({ x: 60, y: 100, w: 560, h: 190, label: '복잡한 문제 (수학·계획·디버깅)', sub: '확장 사고를 켜면 정확도가 올라가요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(hard.el), .3, { from: 'left' });
        const hardStat = P.text({ x: 90, y: 250, w: 500, text: '시간 <em>약 1초 → 9초</em> · 토큰 <em>약 30개 → 500개</em>(대략)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(hardStat.el), 1, { from: 'up' });

        const easy = P.box({ x: 60, y: 350, w: 560, h: 190, label: '간단한 질문 (인사말 등)', sub: '켜도 답은 똑같아요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(easy.el), 5.8, { from: 'left' });
        const easyStat = P.text({ x: 90, y: 500, w: 500, text: '시간 <em>약 1초 → 7초</em> · 답 내용은 <i>그대로</i>', size: 20, weight: 700, cls: 'muted' });
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
      title: '난이도에 맞춰 켜고 꺼요', dur: 13,
      captions: [
        { t: 0, text: '학생에게는 <em>"답을 말하기 전에 풀이를 적어 보는 것"</em>에 비유해 설명해 줄 수 있어요.' },
        { t: 5, text: '도구마다 이름이 달라요 — 확장 사고, 추론 모드처럼요. <em>부르는 이름과 방식은 도구마다 달라요</em>.' },
        { t: 9.5, text: '어려운 문제엔 켜고, 간단한 질문엔 꺼 두는 게 좋아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 340, pose: 'wave' });
        stage.append(q.el);
        const b1 = P.bubble({ x: 400, y: 130, w: 700, text: '"답을 말하기 전에, <b>풀이를 적어 보는 것</b>"과 비슷해요.', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(b1.el), .4, { from: 'up' });

        const chipData = [
          ['확장 사고', 'aqua', 400, 300],
          ['Extended thinking', 'orange', 720, 300],
          ['추론 모드', 'aqua', 400, 366],
          ['Reasoning', 'orange', 720, 366]
        ];
        const chips = chipData.map(([c, color, x, y], i) => {
          const el = P.chip({ x, y, text: c, color, size: 19 });
          tl.at(stage.appendChild(el.el), 5.3 + i * .35, { from: 'pop' });
          return el;
        });
        const noteTxt = P.text({ x: 400, y: 440, w: 700, text: '도구마다 이름과 방식이 <em>달라요</em>', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(noteTxt.el), 6.8, { from: 'up' });

        const last = P.text({ x: 400, y: 500, w: 700, text: '문제 <em>난이도</em>에 맞춰 켜고 꺼요.', size: 32, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.6, { from: 'up' });
        return {
          tick(t) { q.tick(t, t < 5 || t > 9.5); }
        };
      }
    }
  ],

  interaction: {
    title: '생각 시간 다이얼',
    desc: '문제를 고르고 <b>생각 시간 다이얼</b>을 0(바로 답)부터 2(길게 생각)까지 옮겨 보세요. 걸린 시간과 토큰 비용(대략적인 예시)이 함께 바뀌어요. 산수 문제는 "바로 답"에서 틀리는 걸 확인해 보세요.',
    mount(el, P) {
      const PROBLEMS = [
        {
          label: '인사말',
          q: '"안녕하세요, 오늘 기분 어때요?"',
          levels: [
            { think: false, sec: 0.6, tok: 15, ok: null, body: '"안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' },
            { think: true, sec: 3.2, tok: 140, ok: null, body: '(생각 중을 거쳤지만) "안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' },
            { think: true, sec: 7.5, tok: 420, ok: null, body: '(오래 생각했지만) "안녕하세요! 오늘도 좋은 하루 보내고 계신가요?"' }
          ],
          note: '세 단계 모두 답은 <b>똑같아요</b>. 시간과 비용만 늘어나요.'
        },
        {
          label: '수학 문장제',
          q: '"학생 27명을 4명씩 모둠으로 나누면 남는 학생은?"',
          levels: [
            { think: false, sec: 0.5, tok: 10, ok: false, body: '"정답: 4명이 남아요."' },
            { think: true, sec: 3, tok: 150, ok: true, body: '27을 4로 나누면 6모둠에 3명이 남아요. "정답: 3명"' },
            { think: true, sec: 8, tok: 500, ok: true, body: '27÷4=6 나머지 3. 6모둠(24명)을 만들고 27-24=3. "정답: 3명"' }
          ],
          note: '<b>바로 답</b>에서는 틀렸다가, <b>짧게 생각</b>부터 맞혀요.'
        },
        {
          label: '수업 계획',
          q: '"5학년 AI 영상 수업 3차시 계획을 짜 주세요"',
          levels: [
            { think: false, sec: 0.7, tok: 40, ok: null, body: '1차시 기획, 2차시 촬영, 3차시 편집으로 하면 될 것 같아요.' },
            { think: true, sec: 4, tok: 220, ok: null, body: '1차시(주제 정하기·콘티), 2차시(역할 나누기·촬영), 3차시(편집 도구 안내·학급 발표)로 나눴어요.' },
            { think: true, sec: 9, tok: 600, ok: null, body: '1차시(주제·콘티, 준비물 안내), 2차시(역할 분담·촬영·안전 지도), 3차시(편집 실습·평가 기준 안내·학급 발표)까지 세부 활동과 확인 지점을 넣었어요.' }
          ],
          note: '복잡한 계획일수록 <b>더 길게 생각할수록</b> 자세해져요.'
        }
      ];
      const LEVEL_NAMES = ['바로 답', '짧게 생각', '길게 생각'];
      let probIdx = 0, level = 0;

      const dialSec = P.h('div', { class: 'sim-sec' },
        P.h('h4', {}, '생각 시간 다이얼'),
        (() => { const lb = P.h('label', { for: 'sim-think-range', class: 'sim-cap' }); return lb; })()
      );
      const capLabel = dialSec.querySelector('label');
      const slider = P.h('input', { id: 'sim-think-range', type: 'range', min: '0', max: '2', step: '1', value: '0', class: 'sim-range', 'aria-label': '생각 시간(0=바로 답, 2=길게 생각)' });
      dialSec.append(slider);

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
        capLabel.textContent = `생각 시간: ${LEVEL_NAMES[level]} (${level}/2)`;
        [...probWrap.children].forEach((b, i) => b.setAttribute('aria-checked', i === probIdx ? 'true' : 'false'));
        const p = PROBLEMS[probIdx], lv = p.levels[level];
        const secPct = Math.min(100, Math.round((lv.sec / 9) * 100));
        const tokPct = Math.min(100, Math.round((lv.tok / 600) * 100));
        out.replaceChildren(
          P.h('p', { class: 'sim-q' }, p.q),
          lv.think ? P.h('p', { class: 'sim-thinking' }, `생각 중… (${LEVEL_NAMES[level]})`) : null,
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

      const disclaimer = P.h('p', { class: 'sim-disclaimer' }, '예시 답변이며 실제 모델 출력이 아니에요. 시간·토큰 수치는 이해를 돕기 위한 대략적인 예시예요.');

      const style = P.h('style', { html: `
        .sim-sec{margin-top:20px}
        .sim-sec:first-child{margin-top:0}
        .sim-sec h4{font-size:15px;font-weight:800;margin-bottom:8px}
        .sim-cap{display:block;font-weight:700;font-family:var(--mono);font-size:13.5px;margin-bottom:6px}
        .sim-range{width:100%;max-width:100%}
        .sim-probs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-probs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted)}
        .sim-probs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-out{margin-top:18px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);display:flex;flex-direction:column;gap:10px;max-width:100%;box-sizing:border-box}
        .sim-q{font-weight:800;font-size:15px;margin:0}
        .sim-thinking{font-family:var(--mono);color:#127E90;font-weight:700;margin:0;font-size:13.5px}
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
    '어떤 AI는 답을 바로 내놓지 않고 <b>중간 과정을 길게 써 보고</b> 나서 답해요.',
    '수학이나 계획처럼 복잡한 문제에 강하지만, 간단한 질문엔 <b>느리고 비쌀 뿐</b>이에요.'
  ],
  tip: {
    body: '복잡한 계산이나 여러 단계를 거쳐야 하는 질문에는 "확장 사고"가 있는 모델을 써 보세요. 인사말이나 간단한 사실 확인처럼 쉬운 질문에는 굳이 켤 필요가 없어요(속도·비용에서 손해예요).',
    extra: '도구마다 이 기능을 부르는 이름이 달라요(확장 사고, 추론 모드 등). 화면에서 이름을 찾기 어려우면 도움말을 검색해 보세요.'
  },
  myth: {
    myth: '생각하는 시간이 길수록 항상 더 똑똑한 답이 나온다.',
    fact: '어려운 문제에는 도움이 되지만, 간단한 질문에서는 차이가 크지 않으면서 시간과 비용만 늘어날 수 있어요. 문제 난이도에 맞춰 켜고 끄는 게 좋아요.'
  },
  sources: [
    { title: 'Claude Docs — Extended thinking', url: 'https://platform.claude.com/docs/en/build-with-claude/thinking', note: 'Claude의 확장 사고 기능을 설명하는 공식 문서.' },
    { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., arXiv 2022)', url: 'https://arxiv.org/abs/2201.11903', note: '단계별로 생각하게 하는 프롬프트가 추론 능력을 끌어올린다는 걸 보인 연구.' }
  ],
  script: `요즘 AI 중엔 질문을 받자마자 답하지 않고, 먼저 중간 단계를 길게 써 보는 것들이 있어요. "확장 사고" 또는 추론 모델이라고 불러요. "학생 27명을 4명씩 모둠으로 나누면?"이라고 물으면, 바로 답하는 쪽은 틀리기 쉬운데 몇 초 생각한 쪽은 풀이까지 붙여 정확히 답해요.

이 방식은 원래 사람이 프롬프트에 "단계별로 생각해 보자"라고 써 주던 방법(Chain-of-Thought, Wei 외 2022)이었어요. 지금은 이 과정이 모델 안에 들어가, 문제를 단계별로 쪼개 풀고 검토해요. 그래서 수학 문제, 여러 단계 계획, 코드 디버깅처럼 중간 확인이 필요한 일에서 정확도가 올라가요.

다만 시간도 더 걸리고 비용도 더 들어요. 인사말 같은 간단한 질문엔 답은 똑같이 나오면서 느려지기만 할 수 있어요. 난이도를 보고 켤지 말지 정하세요. 학생에겐 "답을 말하기 전에 풀이를 적어 보는 것"에 비유해 주시고, 도구마다 이름과 방식이 다르다는 것도 알려 주세요.`
};
