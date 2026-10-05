/* S777-59 AI가 만든 단백질과 영상, 어떻게 알아볼까: 생성형 워터마크의 삽입·탐지, 그리고 라벨과 C2PA */
export default {
  slug: 't7-synthid-bio-labels',
  track: 'S777',
  title: 'AI가 만든 단백질과 영상, 어떻게 알아볼까?',
  subtitle: '생성형 워터마크의 삽입·탐지, 그리고 라벨과 C2PA',
  summary: '9월 30일, AI가 설계한 단백질에 보이지 않는 표시를 넣는 기술과 AI 라벨이 붙은 영상 30억 개라는 숫자가 같은 날 나왔어요. 생성형 워터마크는 낱말·아미노산을 고르는 순간에 비밀 키로 표시를 섞고, 나중에 점수를 세어 찾아내요. 그 원리와 함께 라벨·C2PA·워터마크가 서로의 빈틈을 어떻게 메우는지 짚어요.',
  keywords: ['워터마크', 'SynthID', 'SynthID Bio', '토너먼트 샘플링', '비밀 키', '탐지 점수', '엔트로피', '단백질 설계', '아미노산', 'C2PA', '매니페스트', '소프트 바인딩', 'AI 라벨', 'AIGC', '출처'],

  scenes: [
    {
      title: '9월 30일, 두 소식', dur: 13,
      captions: [
        { t: 0, text: '9월 30일, Google DeepMind가 AI가 설계한 단백질에 보이지 않는 표시, 곧 <em>워터마크</em>를 넣는 SynthID Bio를 공개했어요.' },
        { t: 5, text: '같은 날 TikTok은 AI 라벨이 붙은 영상이 <em>30억 개</em>를 넘었다고 밝혔어요.' },
        { t: 9.5, text: '두 소식 모두 "AI가 만든 걸 어떻게 알아보나"를 다뤄요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const bio = P.box({ x: 360, y: 120, w: 400, h: 200, label: 'SynthID Bio', sub: 'Google DeepMind · 9.30', accent: 'aqua', icon: P.ICON.key });
        tl.at(stage.appendChild(bio.el), .3, { from: 'up' });
        const bioChip = P.chip({ x: 360, y: 340, text: '단백질에 보이지 않는 표시', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(bioChip.el), 1.4, { from: 'pop' });
        const tt = P.box({ x: 800, y: 120, w: 400, h: 200, label: 'AI 라벨 영상 30억 개+', sub: 'TikTok · 9.30', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(tt.el), 5.2, { from: 'up' });
        const ttChip = P.chip({ x: 800, y: 340, text: '선거 대비 안내에서 발표', color: 'gray', size: 20 });
        tl.at(stage.appendChild(ttChip.el), 6.2, { from: 'pop' });
        const ask = P.text({ x: 360, y: 450, w: 840, text: '같은 날, 같은 질문: <em>AI가 만든 걸 어떻게 알아볼까</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(ask.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.4);
            bio.on(t > .3 && t < 5);
            tt.on(t > 5.2 && t < 9.5);
          }
        };
      }
    },
    {
      title: '고르는 순간에 표시를 섞어요', dur: 14,
      captions: [
        { t: 0, text: 'AI는 다음 낱말을 확률에 따라 골라요. 워터마크는 바로 이 <em>고르는 순간</em>에 표시를 섞어요.' },
        { t: 5, text: '<em>비밀 키</em>(만든 쪽만 아는 열쇠값)와 앞 낱말로 후보마다 0이나 1의 점수를 매기고, 둘씩 겨뤄 점수 높은 쪽을 올려요.' },
        { t: 10, text: '이걸 <em>토너먼트 샘플링</em>이라고 해요. 그럴듯한 후보끼리만 겨루니 글의 질은 그대로예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const key = P.box({ x: 60, y: 110, w: 250, h: 150, label: '비밀 키', sub: '앞 낱말 + 키 → 씨앗', accent: 'ink', icon: P.ICON.key });
        tl.at(stage.appendChild(key.el), 4.8, { from: 'left' });
        const sent = P.text({ x: 360, y: 100, w: 840, text: '오늘 우리 반은 <i>______</i>', size: 30, weight: 800 });
        tl.at(stage.appendChild(sent.el), .2, { from: 'up' });
        const ROWS = [['운동장에서', .30, 1], ['교실에서', .28, 0], ['강당에서', .22, 1], ['복도에서', .20, 0]];
        const rows = ROWS.map(([word, p, g], i) => {
          const y = 190 + i * 72;
          const w = P.text({ x: 360, y: y - 2, w: 180, text: word, size: 24, weight: 700 });
          const bar = P.h('div', { style: `left:560px;top:${y + 2}px;width:${Math.round(p * 1000)}px;height:30px;border-radius:8px;background:#9AA5AF` });
          const pr = P.text({ x: 880, y: y, w: 80, text: p.toFixed(2), size: 20, weight: 700, cls: 'muted' });
          const chip = P.chip({ x: 970, y: y, text: `점수 ${g}`, color: g ? 'aqua' : 'gray', size: 20 });
          stage.append(w.el, bar, pr.el);
          tl.at(w.el, .6 + i * .3, { from: 'left' });
          tl.at(bar, .6 + i * .3, { from: 'left' });
          tl.at(pr.el, .6 + i * .3, { from: 'left' });
          tl.at(stage.appendChild(chip.el), 5.8 + i * .4, { from: 'pop' });
          return { bar, g };
        });
        const cy = i => 190 + i * 72 + 17;
        const br = [
          P.arrow(lines, { x1: 1085, y1: cy(0), x2: 1125, y2: (cy(0) + cy(1)) / 2, width: 3, color: '#1B1F24', head: false }),
          P.arrow(lines, { x1: 1085, y1: cy(1), x2: 1125, y2: (cy(0) + cy(1)) / 2, width: 3, color: '#1B1F24', head: false }),
          P.arrow(lines, { x1: 1085, y1: cy(2), x2: 1125, y2: (cy(2) + cy(3)) / 2, width: 3, color: '#1B1F24', head: false }),
          P.arrow(lines, { x1: 1085, y1: cy(3), x2: 1125, y2: (cy(2) + cy(3)) / 2, width: 3, color: '#1B1F24', head: false })
        ];
        const fin = [
          P.arrow(lines, { x1: 1125, y1: (cy(0) + cy(1)) / 2, x2: 1180, y2: (cy(1) + cy(2)) / 2, width: 3, color: '#F2812D' }),
          P.arrow(lines, { x1: 1125, y1: (cy(2) + cy(3)) / 2, x2: 1180, y2: (cy(1) + cy(2)) / 2, width: 3, color: '#F2812D' })
        ];
        const res = P.text({ x: 360, y: 500, w: 840, text: '점수 높은 쪽이 올라가요. 결승은 새 점수로 → <em>운동장에서</em>', size: 26, weight: 800 });
        tl.at(stage.appendChild(res.el), 9.6, { from: 'up' });
        const ex = P.text({ x: 360, y: 560, w: 600, text: '확률·점수는 예시 값이에요.', size: 17, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(ex.el), 1.6, { from: 'up' });
        let lastWin = null;
        return {
          tick(t) {
            br.forEach((a, i) => a.draw(P.clamp((t - (7.6 + (i >> 1) * .4)) / .5, 0, 1)));
            fin.forEach(a => a.draw(P.clamp((t - 9) / .5, 0, 1)));
            rows.forEach((r, i) => {
              const c = t > 9.4 && i === 0 ? 'var(--acc2,#F2812D)' : (t > 8 && r.g ? 'var(--acc1,#127E90)' : 'var(--muted2,#9AA5AF)');
              r.bar.style.background = c;
            });
            const win = t > 9.6;
            if (win !== lastWin) { sent.set(win ? '오늘 우리 반은 <em>운동장에서</em>' : '오늘 우리 반은 <i>______</i>'); lastWin = win; }
            key.on(t > 4.8);
          }
        };
      }
    },
    {
      title: '찾을 때는 점수를 세요', dur: 14,
      captions: [
        { t: 0, text: '검사할 때는 같은 비밀 키로 낱말마다 점수를 다시 매겨요. 원래 AI 모델 없이 글과 키만 있으면 돼요.' },
        { t: 5, text: '우연보다 점수 높은 낱말이 많으면 워터마크가 있다고 봐요. 글이 짧거나 답이 하나뿐이거나 바꿔 쓴 글이면 증거가 줄어요.' },
        { t: 9.5, text: '단백질도 아미노산을 고를 때 같은 방법을 썼어요. 결합 성능은 그대로였고 표시에는 "있다/없다"만 담겨요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 260, pose: 'think' });
        stage.append(q.el);
        const A = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1];
        const B = [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0];
        const mkRow = (y, label, pat, t0) => {
          const lab = P.text({ x: 360, y, w: 500, text: label, size: 21, weight: 800 });
          tl.at(stage.appendChild(lab.el), t0 - .3, { from: 'left' });
          const dots = pat.map((v, i) => {
            const d = P.h('div', { style: `left:${360 + i * 44}px;top:${y + 44}px;width:32px;height:32px;border-radius:50%;box-sizing:border-box;border:3px solid #9AA5AF;background:#fff` });
            stage.append(d);
            return { d, v, at: t0 + i * .22 };
          });
          return dots;
        };
        const r1 = mkRow(110, '워터마크 넣어 쓴 글', A, .8);
        const r2 = mkRow(240, '키 없이 쓴 글', B, 4.2);
        const g1 = P.box({ x: 920, y: 100, w: 300, h: 115, label: '10 / 12', sub: '같은 키 → 워터마크 있음', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(g1.el), 3.6, { from: 'right' });
        const g2 = P.box({ x: 920, y: 230, w: 300, h: 115, label: '6 / 12', sub: '우연 수준 → 판단 보류', accent: '' });
        tl.at(stage.appendChild(g2.el), 7, { from: 'right' });
        const ex = P.text({ x: 920, y: 352, w: 300, text: '예시 값이에요.', size: 16, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(ex.el), 7.2, { from: 'up' });
        const chips = [['길수록 확실', 'aqua'], ['답이 하나뿐인 글은 약함', 'gray'], ['바꿔 쓰면 약해짐', 'gray']].map(([tx, c], i) => {
          const ch = P.chip({ x: [360, 530, 830][i], y: 395, text: tx, color: c, size: 20 });
          tl.at(stage.appendChild(ch.el), 6.2 + i * .5, { from: 'pop' });
          return ch;
        });
        const bio = P.box({ x: 360, y: 465, w: 860, h: 110, label: '단백질: 아미노산 고르기', sub: '결합력 그대로 · 있다/없다만 표시', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(bio.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.4);
            [...r1, ...r2].forEach(o => {
              const lit = t > o.at;
              const bg = lit && o.v ? 'var(--acc1,#127E90)' : '#fff';
              const bc = lit ? (o.v ? 'var(--acc1,#127E90)' : 'var(--muted2,#9AA5AF)') : 'var(--line,#9AA5AF)';
              o.d.style.background = bg;
              o.d.style.borderColor = bc;
            });
            g1.on(t > 3.6 && t < 9.5);
            bio.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '라벨 붙이는 세 가지 방법', dur: 13,
      captions: [
        { t: 0, text: '라벨은 세 가지 방법으로 붙여요. 만든 사람이 직접 다는 표시, 파일 안에 서명해 둔 출처 기록인 <em>C2PA</em>, 보이지 않는 워터마크예요.' },
        { t: 5.5, text: 'C2PA 기록은 파일을 고치면 해시가 깨져 들통나지만 기록을 통째로 떼어 내면 사라져요. 이때 워터마크가 따로 보관해 둔 기록과 파일을 다시 이어 줘요(소프트 바인딩).' },
        { t: 10, text: 'TikTok은 이 셋을 함께 써서 라벨을 붙여요. 라벨이 있어도 오해를 부르는 AI 영상은 삭제한다고 밝혔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 280, pose: 'point' });
        stage.append(q.el);
        const layers = [
          ['① 만든 사람의 표시', '업로드할 때 토글 · 빠뜨리면 그만', 'ink', P.ICON.click],
          ['② C2PA 출처 기록', '파일 속 서명 · 고치면 해시가 깨짐', 'aqua', P.ICON.doc],
          ['③ 보이지 않는 워터마크', '기록이 떨어져도 다시 이어 줌', 'orange', P.ICON.key]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 360, y: 100 + i * 128, w: 820, h: 110, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.4, { from: 'right' });
          return b;
        });
        const link = P.chip({ x: 360, y: 500, text: 'C2PA 자세히: "AI로 만든 건 어떻게 표시할까?" 편', color: 'gray', size: 18 });
        tl.at(stage.appendChild(link.el), 6, { from: 'pop' });
        const rule = P.text({ x: 360, y: 560, w: 820, text: '라벨이 있어도 <em>오해를 부르면 삭제</em>', size: 26, weight: 800 });
        tl.at(stage.appendChild(rule.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 9.8);
            layers.forEach((b, i) => b.on(i === 0 ? (t > .4 && t < 5.5) : (i === 1 ? (t > 5.5 && t < 8) : (t > 8 && t < 10))));
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '워터마크가 안 나온다고 사람이 만든 건 아니에요. 키를 가진 쪽만 확인할 수 있고, 바꿔 쓰면 약해지거든요.' },
        { t: 6, text: '그래서 학생 작품에는 우리가 먼저 "AI 사용" 표시를 붙이는 습관이 제일 확실해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'wave' });
        stage.append(q.el);
        const cards = [
          ['표시 없음', '사람이 만들었다는 뜻은 아님', 'ink', P.ICON.x],
          ['워터마크', '증거 하나, 판결은 아님', 'aqua', P.ICON.search],
          ['우리 작품', '우리가 먼저 AI 사용 표시', 'orange', P.ICON.check]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 360 + i * 280, y: 160, w: 260, h: 200, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1.1, { from: 'up' });
          return b;
        });
        const line = P.text({ x: 360, y: 420, w: 820, text: '탐지 결과 하나로 <em>결론 내지 않기</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(line.el), 6.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 6);
            cards.forEach((b, i) => b.on(i === 2 ? t > 6 : (t > .3 + i * 1.1 && t < 6)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '워터마크 낱말 고르기',
    desc: '열 칸짜리 문장을 AI처럼 한 칸씩 골라 써요. <b>워터마크 넣어 쓰기</b>를 켜면 칸마다 비밀 키로 점수 1이 나오는 후보를 골라요. <b>바꿔 쓰기</b>를 올리거나 <b>검사 키</b>를 바꾸면 점수가 어떻게 되는지 보세요. 토너먼트 샘플링과 키 검사를 아주 단순하게 흉내 낸 예시 값이에요. 실제 워터마크는 글이 길수록 더 정확해요.',
    mount(el, P) {
      const SLOTS = [
        ['오늘', '오늘은', '이날'],
        ['우리 반은', '우리 학급은', '우리 반 아이들은'],
        ['운동장에서', '강당에서', '체육관에서'],
        ['줄넘기를', '단체 줄넘기를', '긴 줄넘기를'],
        ['신나게', '열심히', '즐겁게'],
        ['했어요.', '연습했어요.', '해 봤어요.'],
        ['쉬는 시간에도', '점심시간에도', '끝나고도'],
        ['모두', '다 같이', '아이들 모두'],
        ['기록을', '횟수를', '넘은 수를'],
        ['셌어요.', '세었어요.', '세어 봤어요.']
      ];
      const KEYS = { make: 17, other: 29 };
      const g = (prev, cand, key) => {
        let h = (key * 2654435761) >>> 0;
        const s = prev + '|' + cand;
        for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
        return (h >>> 9) & 1;
      };
      let on = false, para = 0, checkKey = 'make';
      const write = () => {
        const words = []; let prev = '^';
        for (let i = 0; i < SLOTS.length; i++) {
          let idx = 0;
          if (on) { const f = SLOTS[i].findIndex(c => g(prev, c, KEYS.make) === 1); idx = f < 0 ? 0 : f; }
          if (i < para) idx = (idx + 1) % 3;
          words.push({ w: SLOTS[i][idx], changed: i < para }); prev = SLOTS[i][idx];
        }
        return words;
      };

      const btn = P.h('button', { class: 'btn primary', type: 'button', 'aria-pressed': 'false' }, '워터마크 넣어 쓰기: 끔');
      const range = P.h('input', { type: 'range', id: 'sim-wm-para', min: '0', max: '10', step: '1', value: '0' });
      const rangeLab = P.h('label', { for: 'sim-wm-para', class: 'sim-wm-l' }, '바꿔 쓰기 0칸');
      const sel = P.h('select', { id: 'sim-wm-key' }, P.h('option', { value: 'make' }, '만든 키'), P.h('option', { value: 'other' }, '다른 키'));
      const selLab = P.h('label', { for: 'sim-wm-key', class: 'sim-wm-l' }, '검사 키');
      const words = P.h('div', { class: 'sim-wm-words' });
      const count = P.h('div', { class: 'sim-wm-count' });
      const verdict = P.h('div', { class: 'sim-wm-verdict' });
      el.append(P.h('div', { class: 'sim-wm' },
        P.h('div', { class: 'sim-wm-ctl' }, btn),
        P.h('div', { class: 'sim-wm-ctl' }, rangeLab, range),
        P.h('div', { class: 'sim-wm-ctl' }, selLab, sel),
        words,
        P.h('div', { class: 'sim-wm-res' }, count, verdict)
      ));
      el.append(P.h('style', { html: `
        .sim-wm{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-wm-ctl{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-wm-ctl input[type=range]{flex:1 1 160px;max-width:100%}
        .sim-wm-l{font-size:13.5px;color:var(--muted);min-width:7em}
        .sim-wm-words{display:flex;flex-wrap:wrap;gap:8px;max-width:100%}
        .sim-wm-w{display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:#fff;font-size:14.5px;font-weight:700;max-width:100%}
        .sim-wm-w.chg{border-style:dashed}
        .sim-wm-dot{font-size:14px;line-height:1;color:#9AA5AF}
        .sim-wm-dot.hit{color:var(--acc1,#127E90)}
        .sim-wm-res{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
        .sim-wm-count{font-family:var(--mono);font-size:14px}
        .sim-wm-verdict{font-weight:800;padding:6px 12px;border-radius:999px;background:var(--line);color:var(--muted)}
        .sim-wm-verdict.yes{background:color-mix(in srgb,var(--acc1,#127E90) 14%,white);color:var(--acc1,#127E90)}
      ` }));

      const render = () => {
        const ws = write();
        const key = KEYS[checkKey];
        let prev = '^', n = 0;
        words.replaceChildren(...ws.map(o => {
          const s = g(prev, o.w, key); prev = o.w; n += s;
          return P.h('div', { class: 'sim-wm-w' + (o.changed ? ' chg' : '') }, P.h('span', {}, o.w), P.h('span', { class: 'sim-wm-dot' + (s ? ' hit' : ''), 'aria-label': s ? '점수 1' : '점수 0' }, s ? '●' : '○'));
        }));
        count.textContent = `점수 높은 낱말 ${n}/10`;
        const yes = n >= 8;
        verdict.textContent = yes ? '워터마크 있음 (8/10 이상)' : '판단 보류';
        verdict.className = 'sim-wm-verdict' + (yes ? ' yes' : '');
        btn.textContent = `워터마크 넣어 쓰기: ${on ? '켬' : '끔'}`;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        rangeLab.textContent = `바꿔 쓰기 ${para}칸`;
      };
      btn.addEventListener('click', () => { on = !on; render(); });
      range.addEventListener('input', () => { para = +range.value; render(); });
      sel.addEventListener('change', () => { checkKey = sel.value; render(); });
      render();
    }
  },

  teacherLines: [
    'AI 워터마크는 <b>낱말을 고르는 순간에 섞어 넣은 규칙</b>이에요. 그림 위에 찍는 도장과는 달라요. 비밀 키를 가진 쪽만 찾아낼 수 있어요.',
    '표시가 안 나온다고 사람이 만든 건 아니에요. 그래서 <b>내가 먼저 "AI 사용"이라고 밝히는 것</b>이 제일 확실해요.'
  ],
  tip: {
    body: '학생이 "이거 AI가 쓴 거 맞아요?"라고 물으면 판정기 결과 하나로 답하지 말고 세 가지(작성자 표시·파일 출처 기록·워터마크)를 차례로 같이 확인해 보세요. 워터마크 검사 결과는 "증거 하나"로만 다뤄요.',
    extra: '워터마크는 짧은 글, 답이 정해진 글(정의 쓰기·계산 결과), 다른 말로 바꿔 쓴 글에서 약해져요. 학생 글을 의심할 때 탐지 결과만으로 판단하면 억울한 학생이 생길 수 있어요.'
  },
  myth: {
    myth: '워터마크 검사기에 넣어서 안 나오면 사람이 쓴 글이다.',
    fact: '생성형 워터마크로는 키를 가진 쪽이 자기 모델로 만든 것만 찾을 수 있고, 글이 짧거나 바꿔 쓰면 약해져요. 안 나왔다는 건 "증거가 부족하다"는 뜻이에요.'
  },
  sources: [
    { title: 'Google DeepMind: Introducing SynthID Bio', url: 'https://deepmind.google/blog/introducing-synthid-bio/', note: '2026-09-30, 서열·구조 워터마크, 실제 합성 단백질에서도 확인, 세 표적에서 결합 성능 유지, 변조 강건성은 남은 과제.' },
    { title: 'Nature: Function-preserving watermarking of AI-generated proteins', url: 'https://www.nature.com/articles/s41586-026-10965-y', note: '2026-09-30 온라인, ProteinMPNN에 토너먼트 샘플링 적용, 0비트 방식, 재서열화로 지워질 수 있음.' },
    { title: 'Nature: Scalable watermarking for identifying large language model outputs', url: 'https://www.nature.com/articles/s41586-024-08025-4', note: '2024-10-23, 씨앗·토너먼트 샘플링·점수 함수, 원래 모델 없이 탐지, 낮은 엔트로피·바꿔 쓰기에 약함.' },
    { title: 'TikTok Newsroom: Protecting our community\'s experience on TikTok during upcoming elections', url: 'https://newsroom.tiktok.com/protecting-our-communitys-experience-on-tiktok-during-upcoming-elections-in-latvia-bosnia-herzegovina-bulgaria-and-serbia?lang=en-150', note: '2026-09-30, 토글·C2PA·보이지 않는 워터마크로 30억 개 넘는 영상에 라벨, 오해를 부르는 AI 콘텐츠 삭제.' }
  ],
  script: `9월 30일, Google DeepMind가 AI가 설계한 단백질에 워터마크를 넣는 SynthID Bio를 공개했어요. 같은 날 TikTok은 AI 라벨이 붙은 영상이 30억 개를 넘었다고 밝혔어요.

AI는 다음 낱말을 확률로 골라요. 워터마크는 이때 비밀 키와 앞 낱말로 후보마다 점수를 매기고, 둘씩 겨뤄 높은 쪽을 올려요. 이걸 토너먼트 샘플링이라고 해요. 검사는 같은 키로 점수를 세서 우연보다 높으면 있다고 봐요. 글이 짧거나 바꿔 쓰면 약해져요. 단백질도 아미노산을 고를 때 같은 방법을 썼고, 결합 성능은 그대로였어요.

라벨을 붙이는 방법은 세 가지예요. 만든 사람의 표시, 파일 속 C2PA 기록, 그리고 기록이 떨어져도 다시 이어 주는 워터마크예요.

그래서 표시가 안 나온다고 사람이 만든 건 아니에요. 학생 작품에는 우리가 먼저 AI 사용 표시를 붙여요.`
};
