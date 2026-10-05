/* S777-60 큰 모델을 베끼는 법과 막는 법: 지식 증류와 적대적 증류 방어 */
export default {
  slug: 't7-distillation-defense',
  track: 'S777',
  title: '큰 AI를 베껴 작은 AI를 만들 수 있을까?',
  subtitle: '지식 증류와 적대적 증류 방어',
  summary: '큰 모델의 답과 확률을 보고 작은 모델을 가르치는 "지식 증류"는 2015년에 정리된 표준 기술이에요. 그런데 허락 없이 남의 모델 풀이를 대량으로 빼내 내 모델을 가르치면 "적대적 증류"가 돼요. 9월에 나온 두 회사 발표를 따라 증류가 어떻게 돌아가는지, 어떤 장치들로 막는지 짚어요.',
  keywords: ['지식 증류', '교사 모델', '학생 모델', '소프트 타깃', '온도', '적대적 증류', '추론 과정', '보호된 추론', '약관', '이용 정책', '계정 차단', 'preserved thinking', 'Frontier Model Forum'],

  scenes: [
    {
      title: '9월, 두 회사의 발표', dur: 13,
      captions: [
        { t: 0, text: '9월 30일, 한 AI 회사가 자기 모델의 숨겨진 풀이를 빼내려던 <em>조직적 시도</em>를 막았다고 발표했어요.' },
        { t: 4.5, text: '7월 24~25일 이틀 동안 사용자 4,000명 이상이 요청 16,000건을 보냈고, 관련 사용자 1만 5,000명 이상을 7월 28일까지 모두 차단했어요.' },
        { t: 9.5, text: '9월 22일에 나온 다른 회사의 새 모델도 같은 걸 막는 장치를 달았어요. 오늘 주제는 <em>증류</em>예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'oops' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 100, w: 390, h: 130, label: '9.22 새 모델', sub: 'Anthropic · 증류 방지 장치', accent: 'ink', icon: P.ICON.key });
        const b = P.box({ x: 810, y: 100, w: 390, h: 130, label: '9.30 시도 차단', sub: 'OpenAI · 풀이 빼내기 차단', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(b.el), .3, { from: 'up' });
        tl.at(stage.appendChild(a.el), 9.5, { from: 'up' });
        const link = P.arrow(lines, { x1: 755, y1: 165, x2: 805, y2: 165, width: 3, color: '#9AA5AF', dashed: true, head: false });
        const nums = [
          ['1만 6천 건', '7.24~25 요청(시도)'],
          ['4천 명+', '같은 이틀의 사용자'],
          ['1만 5천 명+', '7.28까지 모두 차단']
        ].map(([label, sub], i) => {
          const n = P.box({ x: 360 + i * 285, y: 270, w: 270, h: 120, label, sub, accent: i === 2 ? 'aqua' : '' });
          tl.at(stage.appendChild(n.el), 4.7 + i * 1.1, { from: 'up' });
          return n;
        });
        const note = P.text({ x: 360, y: 405, w: 840, text: '요청 수는 시도한 횟수예요. 성공한 수는 아니에요.', size: 17, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 6, { from: 'up' });
        const topic = P.text({ x: 360, y: 470, w: 840, text: '오늘 주제: <em>증류</em>', size: 34, weight: 800 });
        tl.at(stage.appendChild(topic.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.4 || t > 9.4);
            link.draw(P.clamp((t - 9.8) / .5, 0, 1));
            b.on(t > .3 && t < 4.5);
            a.on(t > 9.5);
            nums.forEach((n, i) => n.on(t > 4.7 + i * 1.1 && t < 9.5));
          }
        };
      }
    },
    {
      title: '지식 증류란', dur: 14,
      captions: [
        { t: 0, text: '<em>지식 증류</em>는 큰 모델의 답을 보고 작은 모델을 가르치는 방법이에요. 2015년 연구에서 정리됐어요.' },
        { t: 5, text: '정답 하나만 배우지 않고 "트럭과는 좀 헷갈리고 당근과는 전혀 안 헷갈린다"는 확률까지 따라 배워요. 이 확률 분포를 <em>소프트 타깃</em>이라고 해요.' },
        { t: 10, text: '그 연구에서는 숫자 3을 하나도 안 보여 주고 가르쳤는데도 학생 모델이 시험에 나온 3을 대부분 맞혔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const teacher = P.box({ x: 340, y: 130, w: 280, h: 260, label: '선생님 모델', sub: '큰 모델', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(teacher.el), .3, { from: 'left' });
        const student = P.box({ x: 980, y: 180, w: 220, h: 160, label: '학생 모델', sub: '작은 모델', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(student.el), 1.4, { from: 'right' });
        const probs = [['BMW 0.90', 'ink'], ['쓰레기 트럭 0.08', 'orange'], ['버스 0.019', 'gray'], ['당근 0.001', 'gray']].map(([tx, c], i) => {
          const ch = P.chip({ x: 680, y: 150 + i * 56, text: tx, color: c, size: 20 });
          tl.at(stage.appendChild(ch.el), 5.2 + i * .4, { from: 'pop' });
          return ch;
        });
        const ex = P.text({ x: 680, y: 380, w: 280, text: '원리 설명용 예시 값', size: 16, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(ex.el), 5.6, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 625, y1: 260, x2: 670, y2: 260, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 925, y1: 260, x2: 972, y2: 260, width: 4, color: '#127E90' });
        const vs = P.chip({ x: 340, y: 430, text: '정답만 vs 확률까지', color: 'orange', size: 22 });
        tl.at(stage.appendChild(vs.el), 6.5, { from: 'pop' });
        const three = P.text({ x: 340, y: 500, w: 860, text: '숫자 3을 안 보여 줘도 <em>3을 대부분 맞힘</em> (2015년 연구)', size: 26, weight: 800 });
        tl.at(stage.appendChild(three.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            a1.draw(P.clamp((t - 4.8) / .5, 0, 1));
            a2.draw(P.clamp((t - 7) / .5, 0, 1));
            teacher.on(t > .3 && t < 7);
            student.on(t > 7);
          }
        };
      }
    },
    {
      title: '정답보다 풀이가 비싸요', dur: 14,
      captions: [
        { t: 0, text: '요즘 모델은 답을 내기 전에 풀이 과정을 거쳐요. 회사는 이 <em>보호된 추론</em>을 최종 답에서 빼 두는데 여기엔 정답보다 배울 게 훨씬 많아요.' },
        { t: 5, text: '남의 모델 풀이를 허락 없이 체계적으로 빼내 내 모델을 가르치는 걸 <em>적대적 증류</em>라고 해요. 이번엔 암호는 그대로 둔 채 대화를 조작해 풀이를 다시 꺼냈어요.' },
        { t: 10, text: '이렇게 옮긴 능력에는 원래 모델의 <em>안전장치</em>가 따라오지 않을 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 260, pose: 'think' });
        stage.append(q.el);
        const ask = P.box({ x: 340, y: 120, w: 220, h: 120, label: '질문', accent: 'ink', icon: P.ICON.doc });
        const think = P.box({ x: 620, y: 100, w: 320, h: 160, label: '보호된 추론', sub: '숨겨진 풀이 기록', accent: 'orange', icon: P.ICON.key });
        const ans = P.box({ x: 1000, y: 120, w: 200, h: 120, label: '최종 답', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(ask.el), .3, { from: 'up' });
        tl.at(stage.appendChild(think.el), 1, { from: 'up' });
        tl.at(stage.appendChild(ans.el), 1.7, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 565, y1: 180, x2: 614, y2: 180, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 945, y1: 180, x2: 994, y2: 180, width: 4, color: '#1B1F24' });
        const rich = P.chip({ x: 620, y: 280, text: '정답보다 배울 게 많은 자료', color: 'gray', size: 20 });
        tl.at(stage.appendChild(rich.el), 3, { from: 'pop' });
        const adv = P.chip({ x: 340, y: 360, text: '허락 없이 · 체계적으로 = 적대적 증류', color: 'orange', size: 24 });
        tl.at(stage.appendChild(adv.el), 5.3, { from: 'pop' });
        const how = P.text({ x: 340, y: 430, w: 860, text: '암호는 그대로 둔 채 <em>대화를 조작해</em> 풀이를 다시 꺼냈어요', size: 24, weight: 700 });
        tl.at(stage.appendChild(how.el), 7.4, { from: 'up' });
        const safe = P.chip({ x: 340, y: 510, text: '옮긴 능력에 안전장치는 따라오지 않을 수 있어요', color: 'ink', size: 22 });
        tl.at(stage.appendChild(safe.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.8);
            a1.draw(P.clamp((t - .8) / .5, 0, 1));
            a2.draw(P.clamp((t - 1.5) / .5, 0, 1));
            think.on(t > 1 && t < 10);
          }
        };
      }
    },
    {
      title: '막는 장치를 겹쳐 둬요', dur: 13,
      captions: [
        { t: 0, text: '회사는 막는 장치를 여러 개 함께 써요. 수상한 계정을 막고 다른 대화의 풀이를 되살리는 길을 닫고, 풀이가 새어 나올 만한 출력은 잡아 둬요.' },
        { t: 6, text: '9월 22일에 나온 새 모델은 이전 대화 내용을 고쳐 풀이를 빼내려는 시도를 막는 장치를 달았어요.' },
        { t: 10, text: '다른 곳에서도 비슷한 시도를 찾아낼 수 있게 업계 모임과 정부 채널로 정보를 나눠요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 280, pose: 'point' });
        stage.append(q.el);
        const layers = [
          ['① 수상한 계정 막기', '차단·제한 · 가입 통제 강화', 'ink'],
          ['② 되살리는 길 닫기', '다른 대화의 풀이 재생 차단', 'ink'],
          ['③ 새는 출력 잡아 두기', '스트리밍 출력 검사 추가', 'ink'],
          ['④ 맥락 편집 막기', '9.22 새 모델 · 이전 맥락 편집 차단', 'aqua']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + (i % 2) * 420, y: 100 + Math.floor(i / 2) * 150, w: 400, h: 130, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), [.4, 1.6, 2.8, 6.2][i], { from: 'up' });
          return b;
        });
        const share = P.chip({ x: 360, y: 420, text: '업계 모임·정부 채널과 정보 공유', color: 'orange', size: 22 });
        tl.at(stage.appendChild(share.el), 10.2, { from: 'pop' });
        const fin = P.text({ x: 360, y: 490, w: 820, text: '장치 <em>여러 개를 함께</em> 쓰고 계속 고쳐 나가요', size: 30, weight: 800 });
        tl.at(stage.appendChild(fin.el), 11, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 9.8);
            layers.forEach((b, i) => b.on(i === 3 ? (t > 6.2 && t < 10) : (t > [.4, 1.6, 2.8][i] && t < 6)));
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '증류 자체는 정상 기술이에요. 라이선스가 허락했는지, 약관을 지켰는지에 따라 괜찮은지가 갈려요.' },
        { t: 6, text: '친구 풀이를 보고 배우는 일과 친구 공책을 몰래 통째로 베끼는 일이 다른 것처럼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const ok = P.box({ x: 360, y: 130, w: 400, h: 200, label: '괜찮은 증류', sub: '라이선스가 허락 · 허락받은 학습', accent: 'aqua', icon: P.ICON.check });
        const bad = P.box({ x: 800, y: 130, w: 400, h: 200, label: '문제가 되는 증류', sub: '약관 위반 · 몰래 · 대량', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(ok.el), .3, { from: 'left' });
        tl.at(stage.appendChild(bad.el), 1.3, { from: 'right' });
        const beam = P.arrow(lines, { x1: 400, y1: 365, x2: 1160, y2: 365, width: 4, color: '#9AA5AF', head: false });
        const link = P.chip({ x: 360, y: 395, text: '라이선스 읽는 법: "공개된 모델과 닫힌 모델" 편', color: 'gray', size: 18 });
        tl.at(stage.appendChild(link.el), 3.4, { from: 'pop' });
        const fin = P.text({ x: 360, y: 470, w: 840, text: '보고 배우기 vs <em>몰래 통째로 베끼기</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(fin.el), 6.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.6 || t > 6.2);
            beam.draw(P.clamp((t - 2) / .6, 0, 1));
            ok.on(t > .3 && t < 6);
            bad.on(t > 6);
          }
        };
      }
    }
  ],

  interaction: {
    title: '선생님 모델, 학생 모델',
    desc: '그림 카드를 고르면 <b>선생님 모델</b>이 네 가지 이름에 확률을 매겨요. <b>온도</b>를 올리면 확률이 부드럽게 펴지면서 "어떤 것끼리 헷갈리는지"가 드러나요. 가르치는 방식을 고르고 <b>한 번 가르치기</b>를 눌러 학생 모델이 따라오는 모습을 보세요. 로짓과 학습 비율은 원리를 보여 주려고 정한 예시 값이에요.',
    mount(el, P) {
      const NAMES = ['고양이', '호랑이', '자동차', '당근'];
      const CARDS = [
        { id: 0, label: '고양이 사진', logits: [9, 6, 1, 0] },
        { id: 1, label: '호랑이 사진', logits: [6, 9, .5, 0] },
        { id: 2, label: '자동차 사진', logits: [.5, 0, 9, 1] },
        { id: 3, label: '당근 사진', logits: [0, .5, 1.5, 9] }
      ];
      const RATE = 0.3;
      let card = 0, temp = 1, mode = 'soft', steps = 0;
      let student = [.25, .25, .25, .25];
      const softmax = (z, T) => { const m = Math.max(...z); const e = z.map(v => Math.exp((v - m) / T)); const s = e.reduce((a, b) => a + b, 0); return e.map(v => v / s); };
      const teacherP = () => softmax(CARDS[card].logits, temp);
      const target = () => mode === 'soft' ? teacherP() : NAMES.map((_, i) => i === card ? 1 : 0);
      const bat = w => { const c = w.charCodeAt(w.length - 1) - 0xAC00; return c >= 0 && c % 28 !== 0 ? c % 28 : 0; };
      const ro = w => w + (bat(w) && bat(w) !== 8 ? '으로' : '로');
      const gwa = w => w + (bat(w) ? '과' : '와');
      const pct = v => (v * 100 < 0.1 ? (v * 100).toFixed(2) : (v * 100).toFixed(1)) + '%';

      const cardSel = P.h('select', { id: 'sim-ds-card' }, ...CARDS.map(c => P.h('option', { value: String(c.id) }, c.label)));
      const modeSel = P.h('select', { id: 'sim-ds-mode' }, P.h('option', { value: 'soft' }, '확률까지'), P.h('option', { value: 'hard' }, '정답만'));
      const temp_ = P.h('input', { type: 'range', id: 'sim-ds-temp', min: '1', max: '5', step: '1', value: '1' });
      const tempLab = P.h('label', { for: 'sim-ds-temp', class: 'sim-ds-l' }, '온도 1');
      const teachBtn = P.h('button', { class: 'btn primary', type: 'button' }, '한 번 가르치기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');
      const tBars = P.h('div', { class: 'sim-ds-bars' });
      const sBars = P.h('div', { class: 'sim-ds-bars' });
      const hint = P.h('p', { class: 'sim-ds-hint' });
      const stat = P.h('div', { class: 'sim-ds-stat' });

      el.append(P.h('div', { class: 'sim-ds' },
        P.h('div', { class: 'sim-ds-ctl' }, P.h('label', { for: 'sim-ds-card', class: 'sim-ds-l' }, '그림 카드'), cardSel),
        P.h('div', { class: 'sim-ds-ctl' }, tempLab, temp_),
        P.h('div', { class: 'sim-ds-ctl' }, P.h('label', { for: 'sim-ds-mode', class: 'sim-ds-l' }, '가르치는 방식'), modeSel),
        P.h('div', { class: 'sim-ds-ctl' }, teachBtn, resetBtn),
        P.h('div', { class: 'sim-ds-cols' },
          P.h('div', { class: 'sim-ds-col' }, P.h('h5', {}, '선생님 모델'), tBars),
          P.h('div', { class: 'sim-ds-col' }, P.h('h5', {}, '학생 모델 · 크기는 선생님의 1/10'), sBars)
        ),
        hint, stat
      ));
      el.append(P.h('style', { html: `
        .sim-ds{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-ds-ctl{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-ds-ctl input[type=range]{flex:1 1 160px;max-width:100%}
        .sim-ds-l{font-size:13.5px;color:var(--muted);min-width:6.5em}
        .sim-ds-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:100%}
        @media (max-width:560px){.sim-ds-cols{grid-template-columns:1fr}}
        .sim-ds-col{border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff;min-width:0}
        .sim-ds-col h5{margin:0 0 8px;font-size:13px;color:var(--muted)}
        .sim-ds-bars{display:flex;flex-direction:column;gap:6px}
        .sim-ds-row{display:grid;grid-template-columns:4.5em 1fr 4.2em;align-items:center;gap:8px;font-size:13.5px}
        .sim-ds-track{height:12px;border-radius:6px;background:var(--line);overflow:hidden}
        .sim-ds-fill{height:100%;border-radius:6px;background:var(--acc1,#127E90)}
        .sim-ds-fill.t{background:var(--ink)}
        .sim-ds-v{font-family:var(--mono);font-size:12px;text-align:right}
        .sim-ds-hint{margin:0;font-size:14px;line-height:1.6}
        .sim-ds-stat{font-family:var(--mono);font-size:13px;color:var(--muted)}
      ` }));

      const bars = (box, p, cls) => box.replaceChildren(...p.map((v, i) => P.h('div', { class: 'sim-ds-row' },
        P.h('span', {}, NAMES[i]),
        P.h('div', { class: 'sim-ds-track' }, P.h('div', { class: 'sim-ds-fill ' + cls, style: `width:${(v * 100).toFixed(2)}%` })),
        P.h('span', { class: 'sim-ds-v' }, pct(v)))));
      const render = () => {
        const tp = teacherP(), tg = target();
        bars(tBars, tp, 't');
        bars(sBars, student, '');
        const order = [0, 1, 2, 3].filter(i => i !== card).sort((a, b) => tp[b] - tp[a]);
        const near = order[0], far = order[order.length - 1];
        hint.innerHTML = `온도 ${temp}에서 선생님은 ${CARDS[card].label}을 <b>${ro(NAMES[near])}</b> 볼 확률 ${pct(tp[near])}, <b>${ro(NAMES[far])}</b> 볼 확률 ${pct(tp[far])}로 봐요. ${gwa(NAMES[near])}는 헷갈리고 ${gwa(NAMES[far])}는 거의 안 헷갈린다는 정보예요.`;
        const match = tg.reduce((a, v, i) => a + Math.min(v, student[i]), 0);
        stat.textContent = `학습 ${steps}번 · 목표(${mode === 'soft' ? '선생님 확률' : '정답 하나'})와 일치도 ${Math.round(match * 100)}%`;
        tempLab.textContent = `온도 ${temp}`;
      };
      const reset = () => { student = [.25, .25, .25, .25]; steps = 0; };
      teachBtn.addEventListener('click', () => { const tg = target(); student = student.map((v, i) => v + RATE * (tg[i] - v)); steps++; render(); });
      resetBtn.addEventListener('click', () => { reset(); render(); });
      cardSel.addEventListener('change', () => { card = +cardSel.value; reset(); render(); });
      modeSel.addEventListener('change', () => { mode = modeSel.value; reset(); render(); });
      temp_.addEventListener('input', () => { temp = +temp_.value; render(); });
      render();
    }
  },

  teacherLines: [
    '큰 AI의 답을 보고 작은 AI를 가르치는 걸 <b>지식 증류</b>라고 해요. 허락받고 하면 정상 기술이에요.',
    '남의 AI 풀이를 <b>몰래, 대량으로</b> 빼내 내 AI를 가르치면 약관 위반이고, 원래 AI의 안전장치는 따라오지 않을 수 있어요.'
  ],
  tip: {
    body: '"AI끼리 베끼면 왜 안 돼요?"라는 질문에는 두 가지로 답해요. ① 약관과 라이선스가 허락하는 범위인가 ② 빼낸 능력에 원래 모델의 안전장치가 함께 옮겨 가는가. 오픈 웨이트 모델은 라이선스 칸에 증류 허용 여부가 적혀 있기도 해요.',
    extra: '모둠 과제에서 "다른 모둠 결과물을 AI에 넣고 비슷하게 만들어 줘"도 작은 증류예요. 같은 원리로 출처를 밝히고 허락을 받는 습관까지 이야기해 보세요.'
  },
  myth: {
    myth: 'AI 답을 복사해 다른 AI를 학습시키는 건 공개된 답을 쓰는 거라 문제없다.',
    fact: '증류는 허락받으면 정상 기술이지만, 이용 약관을 어기고 숨겨진 풀이까지 대량으로 빼내는 건 적대적 증류예요. 회사들은 계정 차단·출력 검사·맥락 편집 차단 같은 장치를 여러 개 함께 써서 막아요.'
  },
  sources: [
    { title: 'OpenAI: Disrupting a coordinated model-distillation campaign', url: 'https://openai.com/index/disrupting-a-coordinated-model-distillation-campaign', note: '2026-09-30, 보호된 추론 빼내기 시도, 7월 24~25일 사용자 4,000명+·요청 16,000건(시도), 7월 28일까지 1만 5,000명+ 차단, 여러 겹 대응.' },
    { title: 'Anthropic: Introducing Claude Opus 5.5', url: 'https://www.anthropic.com/news/claude-opus-5-5', note: '2026-09-22, 증류 방지 안전장치 preserved thinking, 이전 맥락 편집으로 추론을 빼내려는 시도 차단.' },
    { title: 'Distilling the Knowledge in a Neural Network (Hinton·Vinyals·Dean)', url: 'https://arxiv.org/abs/1503.02531', note: '2015-03-09, 소프트 타깃과 온도, BMW·쓰레기 트럭·당근 예, 숫자 3을 뺀 MNIST 실험.' }
  ],
  script: `9월 30일, 한 AI 회사가 자기 모델의 숨겨진 풀이를 빼내려던 조직적 시도를 막았다고 발표했어요. 9월 22일에 나온 다른 회사의 새 모델도 같은 걸 막는 장치를 달았고요.

지식 증류는 큰 모델의 답을 보고 작은 모델을 가르치는 방법이에요. 정답 하나만 배우지 않고 무엇과 헷갈리고 무엇과는 안 헷갈리는지 그 확률까지 따라 배워요. 2015년 연구에선 숫자 3을 안 보여 주고도 3을 대부분 맞혔어요.

요즘 모델은 답을 내기 전에 풀이를 거치고, 회사는 그 풀이를 보호해 둬요. 이걸 허락 없이 대량으로 빼내 내 모델을 가르치면 적대적 증류예요. 옮긴 능력에 원래 안전장치는 따라오지 않을 수 있어요. 그래서 계정 차단, 풀이 되살리기 차단, 출력 검사, 맥락 편집 차단을 겹쳐 막아요.

증류 자체는 정상 기술이에요. 허락을 받았는지에 따라 갈려요.`
};
