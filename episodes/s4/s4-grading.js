/* 시즌 4 [B] E19 AI 채점은 믿을 수 있을까 — 루브릭과 AI 평가 (교실의 판단) */
export default {
  slug: 's4-grading',
  track: 'B',
  title: 'AI 채점은 믿을 수 있을까',
  subtitle: '루브릭과 AI 평가',
  summary: '같은 학생 글을 두 번 채점시켰더니 점수가 달라졌어요. 왜 그런지, 루브릭으로 어떻게 잡는지 짧게 정리했어요.',
  keywords: ['AI 채점', 'LLM-as-a-judge', '루브릭', 'G-Eval', '장황함 편향', '위치 편향'],

  scenes: [
    {
      title: '같은 글, 다른 점수', dur: 13,
      captions: [
        { t: 0, text: '학생 글 30편을 AI에게 채점시켜 봤어요.' },
        { t: 4.5, text: '그런데 <em>같은 글</em>을 두 번 넣었더니 점수가 <em>달랐어요</em>.' },
        { t: 9, text: '6점과 9점. 왜 이런 일이 생길까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'oops' });
        stage.append(q.el);
        const essay1 = P.box({ x: 340, y: 90, w: 340, h: 110, label: '학생 글 A', sub: '"환경 보호가 중요한 이유는…"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(essay1.el), .3, { from: 'left' });
        const score1 = P.box({ x: 800, y: 90, w: 260, h: 110, label: '6점', sub: '1차 채점', accent: 'orange' });
        tl.at(stage.appendChild(score1.el), 2, { from: 'pop' });
        const arrow1 = P.arrow(lines, { x1: 680, y1: 145, x2: 800, y2: 145, width: 4, color: '#1B1F24' });
        const essay2 = P.box({ x: 340, y: 300, w: 340, h: 110, label: '학생 글 A (같은 글)', sub: '"환경 보호가 중요한 이유는…"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(essay2.el), 4.6, { from: 'left' });
        const score2 = P.box({ x: 800, y: 300, w: 260, h: 110, label: '9점', sub: '2차 채점', accent: 'aqua' });
        tl.at(stage.appendChild(score2.el), 6.3, { from: 'pop' });
        const arrow2 = P.arrow(lines, { x1: 680, y1: 355, x2: 800, y2: 355, width: 4, color: '#1B1F24' });
        const q2 = P.text({ x: 340, y: 470, w: 720, text: '점수가 <em>다르네요</em>. 왜 이런 일이 생길까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(q2.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrow1.draw(P.clamp((t - 1.4) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 5.6) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: 'AI를 심판으로 쓰는 것', dur: 13,
      captions: [
        { t: 0, text: 'AI 채점은 <em>사람 대신 AI를 심판으로</em> 쓰는 방법이에요. 이걸 <em>LLM-as-a-judge</em>라고 불러요.' },
        { t: 5.5, text: 'AI는 확률로 답을 만들어요. 기준 없이 "채점해 줘"라고만 시키면 <em>흔들려요</em>.' },
        { t: 10, text: '심판에게 기준표가 없으면, 판정도 매번 달라질 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const judge = P.box({ x: 380, y: 130, w: 420, h: 140, label: 'AI = 심판(judge)', sub: 'LLM-as-a-judge', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(judge.el), .3, { from: 'up' });
        const chip = P.chip({ x: 500, y: 300, text: '확률로 답을 만들어요', color: 'ink', size: 22 });
        tl.at(stage.appendChild(chip.el), 5.8, { from: 'pop' });
        const noRule = P.box({ x: 380, y: 380, w: 420, h: 130, label: '기준 없이 시키면', sub: '판정이 매번 흔들려요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(noRule.el), 8, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 590, y1: 270, x2: 590, y2: 380, width: 4, color: '#1B1F24' });
        return {
          tick(t) {
            q.tick(t, true);
            arrow.draw(P.clamp((t - 8.3) / .5, 0, 1));
            noRule.on(t > 8);
          }
        };
      }
    },
    {
      title: '연구가 밝힌 편향', dur: 14,
      captions: [
        { t: 0, text: '연구자들이 밝혀낸 AI 채점의 특징적인 <em>편향</em>도 있어요.' },
        { t: 5, text: '긴 답을 좋아하는 <em>장황함 편향</em>, 순서에 따라 달라지는 <em>위치 편향</em>, 자기 문체를 선호하는 편향이에요.' },
        { t: 10.5, text: '그래도 잘 설계하면 사람 평가와 <em>80% 넘게 일치</em>하기도 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 430, size: 260, pose: 'point' });
        stage.append(q.el);
        const items = [
          { label: '장황함 편향', sub: '긴 답을 더 좋게 봐요', icon: P.ICON.doc },
          { label: '위치 편향', sub: '순서에 따라 판정이 달라져요', icon: P.ICON.search },
          { label: '자기 선호 편향', sub: '자기 문체를 더 좋게 봐요', icon: P.ICON.brain }
        ];
        const boxes = items.map((it, i) => {
          const b = P.box({ x: 380, y: 80 + i * 145, w: 800, h: 115, label: it.label, sub: it.sub, accent: 'orange', icon: it.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.5, { from: 'right' });
          return b;
        });
        const chip = P.chip({ x: 380, y: 560, text: '잘 설계하면 사람과 80%+ 일치', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(chip.el), 10.7, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            if (t > 1.2) { const k = Math.floor((t - 1.2) * .8) % boxes.length; boxes.forEach((b, i) => b.on(i === k)); }
          }
        };
      }
    },
    {
      title: '루브릭이 열쇠', dur: 13,
      captions: [
        { t: 0, text: '이걸 잡는 열쇠는 <em>루브릭</em>이에요.' },
        { t: 4.5, text: '기준·수준별 설명·예시 답안을 주고, <em>채점 이유를 먼저 쓰게</em> 하면(G-Eval 방식) 일관성이 올라가요.' },
        { t: 9.5, text: '기준표가 있으면 심판도 흔들리지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 400, size: 290, pose: 'point' });
        stage.append(q.el);
        const rubric = P.box({ x: 400, y: 90, w: 780, h: 150, label: '루브릭', sub: '기준 · 수준별 설명 · 예시 답안', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(rubric.el), .3, { from: 'up' });
        const reason = P.box({ x: 400, y: 290, w: 380, h: 130, label: '채점 이유 먼저', sub: 'G-Eval 방식', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(reason.el), 5, { from: 'left' });
        const arrow1 = P.arrow(lines, { x1: 590, y1: 240, x2: 590, y2: 290, width: 4, color: '#1B1F24' });
        const consist = P.box({ x: 830, y: 290, w: 350, h: 130, label: '일정한 점수', sub: '흔들리지 않아요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(consist.el), 7.2, { from: 'right' });
        const arrow2 = P.arrow(lines, { x1: 780, y1: 355, x2: 830, y2: 355, width: 4, color: '#127E90' });
        const note = P.text({ x: 400, y: 470, w: 780, text: '기준표가 있으면 심판도 <em>흔들리지 않아요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrow1.draw(P.clamp((t - 5.3) / .5, 0, 1));
            arrow2.draw(P.clamp((t - 7.5) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '할 일: 초벌로만', dur: 13,
      captions: [
        { t: 0, text: 'AI 채점은 <em>초벌 피드백</em>으로만 쓰고, 성적 반영은 <em>선생님</em>이 정하세요.' },
        { t: 5, text: '같은 글을 <em>두 번 채점</em>해서 흔들리는지 먼저 확인해 보세요.' },
        { t: 9.5, text: '학생 이름은 빼고 채점하세요. 개인정보 이야기는 다음 편에서 더 풀게요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          { label: '초벌 피드백으로만', sub: '성적 반영은 선생님이', icon: P.ICON.check },
          { label: '두 번 채점해 비교', sub: '흔들리는지 확인', icon: P.ICON.search },
          { label: '학생 이름은 빼고', sub: '개인정보는 다음 편에서', icon: P.ICON.x }
        ];
        const boxes = items.map((it, i) => {
          const b = P.box({ x: 420, y: 90 + i * 165, w: 780, h: 130, label: it.label, sub: it.sub, accent: 'aqua', icon: it.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.8, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 420, y: 610, w: 780, text: 'AI 점수는 <em>초벌</em>이에요. 마지막 결정은 우리 몫이에요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.8));
          }
        };
      }
    }
  ],

  interaction: {
    title: '루브릭 켜고 끄기',
    desc: '학생 글을 고르고 <b>루브릭 붙이기</b>를 눌러 보세요. 꺼져 있으면 기준 없이 채점해서 시도마다 점수가 흔들리고 긴 글이 높게 나와요. 켜면 루브릭과 채점 이유가 먼저 나오고, 세 번 다 같은 점수가 나와요.',
    mount(el, P) {
      const ESSAYS = [
        {
          label: '짧고 알찬 글', len: '약 80자',
          text: '"급식 잔반을 줄이려면 반별 확인표를 도입해야 한다. 옆 반은 이 방법으로 잔반이 30% 줄었다."',
          without: [6, 4, 8],
          rubric: [['주장 명확성', '상'], ['근거', '상'], ['구성', '중']],
          reason: '주장이 분명하고 실제 사례(옆 반 30% 감소)를 근거로 들었어요. 짧지만 앞뒤 구성이 갖춰져 있어요.',
          score: 9
        },
        {
          label: '길지만 산만한 글', len: '약 320자',
          text: '"급식은 중요하다. 나는 급식을 좋아한다. 어제는 카레가 나왔다. 잔반도 있었고 우유도 남았다. 환경도 중요하고 건강도 중요하다. 그래서 급식을 잘 먹어야 한다고 생각한다. 여러 가지로 급식에 대해 생각해볼 점이 많다."',
          without: [9, 7, 10],
          rubric: [['주장 명확성', '중'], ['근거', '하'], ['구성', '하']],
          reason: '분량은 많지만 주장이 흐릿하고 근거가 거의 없어요. 여러 이야기가 섞여 구성도 흐트러져 있어요.',
          score: 5
        },
        {
          label: '중간 길이 글', len: '약 180자',
          text: '"학교 앞 교통사고를 줄이려면 등굣길에 안전 지킴이를 늘려야 한다. 다른 학교 사례를 보면 사고가 줄었다고 한다. 우리 학교도 검토해 볼 필요가 있다."',
          without: [7, 9, 5],
          rubric: [['주장 명확성', '중'], ['근거', '중'], ['구성', '중']],
          reason: '주장과 근거가 있지만 사례가 구체적이지 않고, 구성은 평범한 수준이에요.',
          score: 7
        }
      ];
      let idx = 0, rubricOn = false, attempt = 0;

      const essaySel = P.h('div', { class: 'sim-qs', role: 'radiogroup', 'aria-label': '학생 글 고르기' });
      const toggleBtn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '루브릭 붙이기');
      const attemptSel = P.h('div', { class: 'sim-attempts', role: 'radiogroup', 'aria-label': '채점 시도 고르기' });
      const essayBox = P.h('div', { class: 'sim-essay' });
      const resultBox = P.h('div', { class: 'sim-result', 'aria-live': 'polite' });
      const wobbleWrap = P.h('div', { class: 'sim-wobble' });
      const disclaimer = P.h('p', { class: 'sim-disclaimer' }, '예시 점수예요. 실제 모델 출력이 아니에요.');

      el.append(
        essaySel,
        essayBox,
        P.h('div', { class: 'sim-bar' }, toggleBtn),
        attemptSel,
        resultBox,
        wobbleWrap,
        disclaimer
      );

      const style = P.h('style', { html: `
        .sim-qs{display:flex;gap:8px;flex-wrap:wrap}
        .sim-qs button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted);max-width:100%}
        .sim-qs button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-essay{margin-top:12px;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--paper);font-size:14.5px;line-height:1.6}
        .sim-essay .sim-len{display:block;color:var(--muted);font-size:12.5px;font-weight:700;margin-bottom:4px}
        .sim-bar{margin-top:14px}
        .sim-attempts{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
        .sim-attempts button{border:1px solid var(--line);border-radius:999px;padding:7px 14px;font-weight:700;font-size:13px;background:#fff;color:var(--muted)}
        .sim-attempts button[aria-checked="true"]{background:#127E90;color:#fff;border-color:#127E90}
        .sim-result{margin-top:16px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);display:flex;flex-direction:column;gap:10px;max-width:100%;box-sizing:border-box}
        .sim-score{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-score b{font-size:26px;font-weight:800}
        .sim-flag{font-size:11.5px;font-weight:800;border-radius:999px;padding:3px 9px;background:#F2812D;color:#fff}
        .sim-flag.good{background:#127E90}
        .sim-table{width:100%;border-collapse:collapse;font-size:13.5px}
        .sim-table th,.sim-table td{border:1px solid var(--line);padding:6px 8px;text-align:left}
        .sim-table th{background:#f4f6f7;font-weight:700}
        .sim-reason{font-size:14px;line-height:1.6;background:#fff;border:1px dashed var(--line);border-radius:10px;padding:10px 12px}
        .sim-note{font-size:13px;color:var(--muted);margin:0}
        .sim-wobble{margin-top:16px;display:flex;flex-direction:column;gap:8px}
        .sim-wobble-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-wobble-lbl{font-size:12.5px;color:var(--muted);width:110px;flex:0 0 auto}
        .sim-wobble-track{flex:1;min-width:100px;height:10px;border-radius:6px;background:#eee;overflow:hidden}
        .sim-wobble-fill{height:100%;border-radius:6px}
        .sim-wobble-fill.no{background:#F2812D}
        .sim-wobble-fill.yes{background:#2BB3C9}
        .sim-disclaimer{margin-top:14px;font-size:12px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px}
      ` });
      el.append(style);

      function render() {
        const cur = ESSAYS[idx];
        essaySel.replaceChildren(...ESSAYS.map((v, k) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': k === idx ? 'true' : 'false' }, v.label);
          b.addEventListener('click', () => { idx = k; attempt = 0; render(); });
          return b;
        }));
        essayBox.replaceChildren(P.h('span', { class: 'sim-len' }, `${cur.label} · ${cur.len}`), P.h('p', { style: 'margin:0' }, cur.text));

        toggleBtn.textContent = rubricOn ? '루브릭 떼기' : '루브릭 붙이기';
        toggleBtn.setAttribute('aria-pressed', rubricOn ? 'true' : 'false');

        attemptSel.replaceChildren(...['1차 채점', '2차 채점', '3차 채점'].map((lbl, k) => {
          const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': k === attempt ? 'true' : 'false' }, lbl);
          b.addEventListener('click', () => { attempt = k; render(); });
          return b;
        }));

        if (rubricOn) {
          const rows = cur.rubric.map(([name, lv]) => P.h('tr', {}, P.h('td', {}, name), P.h('td', {}, lv)));
          resultBox.replaceChildren(
            P.h('table', { class: 'sim-table' },
              P.h('thead', {}, P.h('tr', {}, P.h('th', {}, '기준'), P.h('th', {}, '수준'))),
              P.h('tbody', {}, ...rows)
            ),
            P.h('p', { class: 'sim-reason' }, cur.reason),
            P.h('div', { class: 'sim-score' },
              P.h('span', { class: 'sim-flag good' }, '루브릭 적용'),
              P.h('span', {}, '점수:'), P.h('b', {}, `${cur.score}점`)
            ),
            P.h('p', { class: 'sim-note' }, '3번 모두 같은 점수예요.')
          );
        } else {
          const s = Math.min(10, cur.without[attempt]);
          const isLong = idx === 1;
          resultBox.replaceChildren(
            P.h('div', { class: 'sim-score' },
              isLong ? P.h('span', { class: 'sim-flag' }, '장황함 편향') : null,
              P.h('span', {}, '점수:'), P.h('b', {}, `${s}점`)
            ),
            P.h('p', { class: 'sim-note' }, '기준 없이 채점해서 시도마다 점수가 흔들려요. 다른 시도 버튼도 눌러 보세요.')
          );
        }

        const noSpread = Math.max(...cur.without) - Math.min(...cur.without);
        wobbleWrap.replaceChildren(
          P.h('div', { class: 'sim-wobble-row' }, P.h('span', { class: 'sim-wobble-lbl' }, `없이 ±${(noSpread / 2)}점`), P.h('div', { class: 'sim-wobble-track' }, P.h('div', { class: 'sim-wobble-fill no', style: `width:${Math.min(100, noSpread * 20)}%` }))),
          P.h('div', { class: 'sim-wobble-row' }, P.h('span', { class: 'sim-wobble-lbl' }, '있이 ±0점'), P.h('div', { class: 'sim-wobble-track' }, P.h('div', { class: 'sim-wobble-fill yes', style: 'width:0%' })))
        );
      }
      toggleBtn.addEventListener('click', () => { rubricOn = !rubricOn; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 채점은 <b>"기준표를 준 심판"</b>일 때만 믿을 만해요. 기준이 없으면 긴 글을 더 좋아해요.',
    'AI 점수는 <b>초벌</b>이에요. 마지막 점수는 선생님이 정해요.'
  ],
  tip: {
    body: '루브릭(기준·수준별 설명·예시 답안)을 주고, 채점 이유를 먼저 쓰게 하세요. 같은 글을 두 번 채점해 흔들리는지 비교하고, 성적 반영은 선생님이 최종 결정하세요.',
    extra: '학생 이름은 빼고 채점을 맡기세요. 개인정보 이야기는 다음 편에서 더 다뤄요.'
  },
  myth: {
    myth: 'AI는 공정하게 채점한다.',
    fact: '기준이 없으면 길이·순서에 따라 흔들려요. 루브릭과 사람의 검토가 함께 있어야 믿을 만해요.'
  },
  sources: [
    { title: 'Zheng et al. 2023 — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena', url: 'https://arxiv.org/abs/2306.05685', note: '강한 모델을 심판으로 쓰면 사람 평가와 80% 이상 일치하지만, 위치·장황함·자기 선호 편향이 있다고 밝혀요.' },
    { title: 'Liu et al. 2023 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment', url: 'https://arxiv.org/abs/2303.16634', note: '평가 기준과 단계적 채점 이유(chain-of-thought)를 먼저 쓰게 하면 사람 평가와 더 잘 맞는다고 보여요.' }
  ],
  script: `학생 글 30편을 AI에게 채점시켰는데, 같은 글을 두 번 넣었더니 점수가 달랐던 적 있으실 거예요. AI 채점은 AI를 심판으로 쓰는 방법, 이른바 LLM-as-a-judge예요. 확률로 답을 만들기 때문에 기준 없이 시키면 판정이 흔들려요.

이런 채점에는 특징적인 편향이 있어요. 긴 답을 더 좋게 보는 장황함 편향, 순서에 따라 판정이 달라지는 위치 편향, 자기 문체를 선호하는 편향이에요. 그래도 잘 설계하면 사람 평가와 80퍼센트 넘게 일치하기도 해요.

열쇠는 루브릭이에요. 기준과 수준별 설명, 예시 답안을 주고 채점 이유를 먼저 쓰게 하면(G-Eval 방식) 일관성이 크게 올라가요.

그러니 AI 채점은 초벌 피드백으로만 쓰고, 성적 반영은 선생님이 정하세요. 같은 글을 두 번 채점해 흔들리는지 확인하고, 학생 이름은 빼고 채점하세요.`
};
