/* S777-64 공개 모델의 안전장치가 쉽게 풀리는 이유: 오픈 웨이트의 안전장치, 탈옥·미세조정 우회, 이중 용도 */
export default {
  slug: 't7-open-weight-jailbreak',
  track: 'S777',
  title: '공개 모델의 안전장치는 왜 쉽게 풀릴까',
  subtitle: '오픈 웨이트의 안전장치, 탈옥·미세조정 우회, 이중 용도',
  summary: '가중치를 공개한 모델은 내려받은 사람이 모델 속까지 손댈 수 있어요. 9월 29일 나온 분석에서 한 공개 모델은 거짓 상황 설정, 생각 미리 채우기, 거절 방향 지우기를 쓰자 해로운 요청에 응한 비율이 64~100%까지 올라갔어요. 안전장치가 모델 안과 밖 어디에 있는지, 왜 공개 모델에서는 바깥 겹이 사라지는지, 같은 능력이 방어에도 쓰이는 이중 용도까지 짚어요.',
  keywords: ['오픈 웨이트', '안전장치', '거절', '탈옥', '프리필', '생각 토큰', 'abliteration', '거절 방향', '미세조정', '이중 용도', '사이버 보안', '레드팀', 'CAISI'],

  scenes: [
    {
      title: '0%에서 100%까지', dur: 13,
      captions: [
        { t: 0, text: '9월 29일 Anthropic의 레드팀이 다른 회사가 공개한 <em>오픈 웨이트</em> 모델을 분석해 발표했어요. 해로운 사이버 공격 요청을 그냥 했을 때 응한 비율은 0%였어요.' },
        { t: 5, text: '그런데 간단한 우회 방법을 쓰자 <em>64%, 92%, 100%</em>까지 올라갔어요. 같은 방법은 안전장치를 갖춘 닫힌 모델에서는 통하지 않았다고 해요.' },
        { t: 10, text: '차이는 어디서 날까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'oops' });
        stage.append(q.el);
        const head = P.text({ x: 360, y: 76, w: 560, text: '9.29 · 공개 모델 분석', size: 30, weight: 800 });
        tl.at(stage.appendChild(head.el), .2, { from: 'up' });
        const BASE = 450, MAXH = 250;
        const DATA = [['그냥 요청', 0, 1], ['거짓 상황 설정', 64, 5.2], ['생각 미리 채우기', 92, 6.2], ['거절 제거본', 100, 7.2]];
        const bars = DATA.map(([name, v, at], i) => {
          const x = 400 + i * 200;
          const bar = P.h('div', { style: `position:absolute;left:${x}px;top:${BASE}px;width:140px;height:0px;border-radius:10px 10px 0 0;background:${i === 0 ? '#9AA5AF' : '#F2812D'}` });
          stage.appendChild(bar);
          const pct = P.text({ x: x - 20, y: BASE - 40, w: 180, text: '0%', size: 28, weight: 800, align: 'center' });
          stage.appendChild(pct.el);
          const lab = P.text({ x: x - 25, y: BASE + 12, w: 190, text: name, size: 19, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), at - .2, { from: 'up' });
          return { bar, pct, v, at };
        });
        const base = P.arrow(lines, { x1: 380, y1: BASE, x2: 1180, y2: BASE, width: 3, color: '#1B1F24', head: false });
        const note = P.text({ x: 400, y: 520, w: 800, text: '해로운 공격 명령에 응한 비율 · 칸마다 50번 시험', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 1.2, { from: 'up' });
        const closed = P.chip({ x: 400, y: 570, text: '안전장치를 갖춘 닫힌 모델: 같은 방법이 통하지 않음', color: 'gray', size: 20 });
        tl.at(stage.appendChild(closed.el), 8.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 9.8 || t > 10);
            bars.forEach(b => {
              const k = P.easeOut(P.clamp((t - b.at) / 1.2, 0, 1));
              const hgt = (b.v / 100) * MAXH * k;
              b.bar.style.height = hgt + 'px';
              b.bar.style.top = (BASE - hgt) + 'px';
              b.pct.el.style.top = (BASE - hgt - 42) + 'px';
              b.pct.set(Math.round(b.v * k) + '%');
              b.pct.el.style.opacity = t > b.at - .2 ? 1 : 0;
            });
          }
        };
      }
    },
    {
      title: '안전장치는 어디에 있나', dur: 14,
      captions: [
        { t: 0, text: '닫힌 모델은 안전장치가 여러 겹이에요. 회사 서버에서 요청을 검사하고, API 규칙으로 막고, 모델 속에도 거절하도록 훈련돼 있어요.' },
        { t: 6, text: '가중치를 내려받으면 바깥 겹은 사라지고 <em>모델 속 거절</em>만 남아요. 그 마지막 겹도 내 컴퓨터 안에 있으니 손댈 수 있어요.' },
        { t: 10.5, text: '오픈 웨이트가 무엇인지는 앞 편에서 다뤘어요. 여기서는 안전장치가 어디에 있는지만 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const cols = [
          { x: 340, head: '닫힌 모델(API)', layers: [['요청 검사', 'aqua'], ['생각 미리 채우기 불가', 'aqua'], ['모델 속 거절 훈련', 'ink'], ['가중치는 회사 서버에', '']], at: .3 },
          { x: 800, head: '오픈 웨이트', layers: [['바깥 겹 없음', null], ['바깥 겹 없음', null], ['모델 속 거절 훈련', 'ink'], ['가중치는 내 컴퓨터에', 'orange']], at: 6.2 }
        ];
        const boxes = [];
        cols.forEach(c => {
          const hd = P.text({ x: c.x, y: 92, w: 420, text: c.head, size: 26, weight: 800, align: 'center' });
          tl.at(stage.appendChild(hd.el), c.at, { from: 'up' });
          c.layers.forEach(([label, acc], i) => {
            const b = P.box({ x: c.x, y: 150 + i * 88, w: 420, h: 72, label, accent: acc || '' });
            if (acc === null) { b.el.style.background = 'transparent'; b.el.style.border = '2px dashed #9AA5AF'; b.el.style.boxShadow = 'none'; b.el.style.color = '#9AA5AF'; }
            tl.at(stage.appendChild(b.el), c.at + .3 + i * .5, { from: 'up' });
            boxes.push({ b, on: acc === 'ink', at: c.at + .3 + i * .5 });
          });
        });
        const chip = P.chip({ x: 340, y: 530, text: "오픈 웨이트 기본: '공개된 모델과 닫힌 모델' 편", color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 10.6, { from: 'pop' });
        return {
          tick(t) {
            boxes.forEach(o => o.b.on(o.on && t > 7.4 && t > o.at));
          }
        };
      }
    },
    {
      title: '세 가지 우회, 건너뛰는 겹', dur: 14,
      captions: [
        { t: 0, text: '<em>탈옥</em>은 상황을 꾸며 모델의 거절을 말로 속이는 방법이에요. <em>생각 미리 채우기</em>는 모델이 이미 하기로 정한 것처럼 이어 쓰게 해요.' },
        { t: 5.5, text: '가장 확실한 건 <em>거절 방향 지우기</em>예요. 2024년 연구에서 거절은 모델 속 한 방향에 모여 있었고, 그걸 지우면 다른 능력은 거의 그대로인 채 거절만 사라졌어요.' },
        { t: 10.5, text: '2023년 연구에서는 해로운 예시 10개로 <em>미세조정</em>해도 안전장치가 무너졌어요. 평범한 데이터로 미세조정해도 약해질 수 있었고요.' }
      ],
      build({ stage, lines, P, tl }) {
        const methods = [
          ['거짓 상황 설정', '상황을 꾸며 거절을 속여요', 'aqua', .4],
          ['생각 미리 채우기', '이미 하기로 한 듯 시작', 'aqua', 3.4],
          ['거절 방향 지우기', '거절 맡은 방향을 삭제', 'orange', 5.8]
        ].map(([label, sub, accent, at], i) => {
          const b = P.box({ x: 340, y: 100 + i * 135, w: 400, h: 110, label, sub, accent });
          tl.at(stage.appendChild(b.el), at, { from: 'left' });
          return { b, at };
        });
        const model = P.box({ x: 860, y: 140, w: 340, h: 280, label: '모델 속 거절 훈련', sub: '오픈 웨이트에 남은 마지막 겹', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), .2, { from: 'right' });
        const arrows = [
          P.arrow(lines, { x1: 745, y1: 155, x2: 855, y2: 200, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 745, y1: 290, x2: 855, y2: 280, width: 4, color: '#127E90' }),
          P.arrow(lines, { x1: 745, y1: 425, x2: 855, y2: 370, width: 5, color: '#F2812D' })
        ];
        const c1 = P.chip({ x: 340, y: 530, text: '2024년 연구: 거절은 한 방향에 모여 있었어요', color: 'orange', size: 20 });
        const c2 = P.chip({ x: 340, y: 584, text: '2023년 연구: 예시 10개 미세조정으로도 풀렸어요', color: 'gray', size: 20 });
        tl.at(stage.appendChild(c1.el), 7.6, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 10.7, { from: 'pop' });
        return {
          tick(t) {
            methods.forEach((m, i) => m.b.on(t > m.at && t < [3.4, 5.8, 14][i]));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (methods[i].at + .4)) / .6, 0, 1)));
            model.on(t > 5.8);
          }
        };
      }
    },
    {
      title: '같은 능력, 두 얼굴', dur: 13,
      captions: [
        { t: 0, text: '소프트웨어 약점을 찾는 능력은 공격에도, 방어에도 쓰여요. 이런 걸 <em>이중 용도</em>라고 해요.' },
        { t: 4.5, text: '분석한 팀도 이 능력이 방어자에게 도움이 될 수 있다고 썼어요. 그래서 방어자가 이런 모델을 더 쉽게 쓰게 하고, 정부가 강력한 모델을 충분히 시험하자고 권했어요.' },
        { t: 9, text: '그런데 거절을 지우는 비용이 낮아요. 출시 며칠 만에 거절 제거본이 여럿 공개됐고, 지워도 일반 능력 점수는 같았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 280, pose: 'think' });
        stage.append(q.el);
        const atk = P.box({ x: 360, y: 110, w: 400, h: 180, label: '공격자', sub: '약점을 찾아 침입', accent: 'orange', icon: P.ICON.key });
        const def = P.box({ x: 800, y: 110, w: 400, h: 180, label: '방어자', sub: '약점을 먼저 찾아 고침', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(atk.el), .4, { from: 'left' });
        tl.at(stage.appendChild(def.el), 1.6, { from: 'right' });
        const dual = P.chip({ x: 712, y: 320, text: '이중 용도', color: 'ink', size: 22 });
        tl.at(stage.appendChild(dual.el), 3, { from: 'pop' });
        const cost = P.box({ x: 360, y: 400, w: 840, h: 110, label: '직접 지워 본 비용', sub: '2,200 GPU시간 · 4,400달러쯤', accent: 'ink', icon: '' });
        tl.at(stage.appendChild(cost.el), 9.2, { from: 'up' });
        const same = P.text({ x: 360, y: 540, w: 840, text: '지운 뒤에도 <em>일반 과학 능력 점수는 그대로</em>였어요.', size: 24, weight: 800 });
        tl.at(stage.appendChild(same.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            atk.on(t > .4 && t < 4.5);
            def.on(t > 4.5 && t < 9);
            cost.on(t > 9.2);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '공개 모델이 한 번 거절했다고 안전한 건 아니에요. 학교에서 직접 돌린다면 바깥 겹, 곧 입력 검사와 사용 규칙은 학교가 만들어야 해요.' },
        { t: 6.5, text: '학생들과는 <em>할 수 있다</em>와 <em>해도 된다</em>를 나눠 생각하는 연습으로 이어 가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'point' });
        stage.append(q.el);
        const items = [
          ["'거절' ≠ '안전'", '한 번 거절은 마지막 겹뿐', 'ink', P.ICON.x],
          ['바깥 겹은 학교 몫', '입력 검사·사용 규칙·기록', 'aqua', P.ICON.desk],
          ['할 수 있음 ≠ 해도 됨', '학생과 나눠 생각하기', 'orange', P.ICON.hand]
        ].map(([label, sub, accent, icon], i) => {
          const b = P.box({ x: 370 + i * 270, y: 170, w: 250, h: 220, label, sub, accent, icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.8, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 370, y: 450, w: 790, text: '<em>할 수 있는 것</em>과 <em>해도 되는 것</em>을 나눠요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            items.forEach((b, i) => b.on(t > .4 + i * 1.8));
          }
        };
      }
    }
  ],

  interaction: {
    title: '안전장치 겹 쌓기',
    desc: '왼쪽은 <b>닫힌 모델(API)</b>, 오른쪽은 <b>오픈 웨이트(내 컴퓨터)</b>예요. 우회 방법을 고르고 <b>우회 시도</b>를 누르면 열마다 어느 겹에서 막히는지 보여 줘요. 닫힌 모델 열에서 겹을 하나씩 꺼 보며 어떤 겹이 무엇을 막는지 확인해 보세요. 원리만 보여 주는 예시라서 실제 공격 방법은 담지 않았어요.',
    mount(el, P) {
      const LAYERS = [
        { id: 'check', label: '요청 검사', pos: '바깥' },
        { id: 'noprefill', label: '생각 미리 채우기 금지', pos: '바깥' },
        { id: 'refusal', label: '모델 속 거절 훈련', pos: '안' },
        { id: 'closedw', label: '가중치 비공개', pos: '바닥' }
      ];
      const METHODS = {
        context: '거짓 상황 설정',
        prefill: '생각 미리 채우기',
        ablate: '거절 방향 지우기',
        finetune: '소량 미세조정'
      };
      const state = {
        closed: { check: true, noprefill: true, refusal: true, closedw: true },
        open: { check: false, noprefill: false, refusal: true, closedw: false },
        method: 'context', tried: false
      };
      const OPEN_LOCKED = new Set(['check', 'noprefill', 'closedw']);

      function judge(L, m) {
        if (m === 'context') {
          if (L.check) return { ok: false, text: '"요청 검사" 겹에서 막힘' };
          if (L.refusal) return { ok: 'maybe', text: '모델 속 거절만 남음: 뚫릴 수 있음' };
          return { ok: true, text: '막는 겹이 없어 통과' };
        }
        if (m === 'prefill') {
          if (L.noprefill) return { ok: false, text: '"생각 미리 채우기 금지" 겹에서 막힘' };
          return { ok: true, text: '모델이 "하기로 정했다"에서 출발해 통과' };
        }
        if (L.closedw) return { ok: false, text: '"가중치 비공개" 겹에서 막힘: 가중치가 있어야 할 수 있어요' };
        return { ok: true, text: m === 'ablate' ? '가중치를 가진 사람이 거절 방향을 지워 통과' : '가중치를 가진 사람이 다시 학습시켜 통과' };
      }

      const methodSel = P.h('select', { id: 'sim-ow-method' }, ...Object.entries(METHODS).map(([k, v]) => P.h('option', { value: k }, v)));
      const methodLab = P.h('label', { for: 'sim-ow-method', class: 'sim-lab' }, '우회 방법');
      const tryBtn = P.h('button', { class: 'btn primary', type: 'button' }, '우회 시도');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '겹 되돌리기');

      const colEls = {};
      const mkCol = (key, title, note) => {
        const list = P.h('div', { class: 'sim-layers' });
        const result = P.h('div', { class: 'sim-res' }, P.h('span', { class: 'sim-ph' }, '아직 시도 전이에요.'));
        LAYERS.forEach(L => {
          const id = `sim-ow-${key}-${L.id}`;
          const locked = key === 'open' && OPEN_LOCKED.has(L.id);
          const cb = P.h('input', { type: 'checkbox', id });
          cb.checked = state[key][L.id];
          cb.disabled = locked;
          cb.addEventListener('change', () => { state[key][L.id] = cb.checked; if (state.tried) renderResults(); });
          list.append(P.h('div', { class: 'sim-layer' + (locked ? ' off' : '') }, cb,
            P.h('label', { for: id }, L.label, P.h('span', { class: 'sim-pos' }, ` (${L.pos})`))));
        });
        const col = P.h('div', { class: 'sim-col' }, P.h('div', { class: 'sim-h' }, title), note ? P.h('div', { class: 'sim-note' }, note) : '', list, result);
        colEls[key] = { col, list, result };
        return col;
      };

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-bar' }, methodLab, methodSel, tryBtn, resetBtn),
        P.h('div', { class: 'sim-cols' },
          mkCol('closed', '닫힌 모델(API)', ''),
          mkCol('open', '오픈 웨이트(내 컴퓨터)', '바깥 겹과 가중치 비공개는 없어요. 내려받은 사람이 직접 운영해요.')
        ),
        P.h('div', { class: 'sim-foot' })
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-bar select{max-width:100%}
        .sim-lab{font-size:13px;color:var(--muted)}
        .sim-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-width:100%}
        .sim-col{border:1px solid var(--line);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;min-width:0}
        .sim-h{font-weight:700;font-size:14px}
        .sim-note{font-size:12px;color:var(--muted);word-break:keep-all}
        .sim-layers{display:flex;flex-direction:column;gap:6px}
        .sim-layer{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:13px;word-break:keep-all}
        .sim-layer.off{border-style:dashed;color:var(--faint,#9AA5AF)}
        .sim-pos{font-size:11px;color:var(--muted)}
        .sim-res{border-radius:10px;padding:8px 10px;font-size:13px;font-weight:700;word-break:keep-all;border:1px solid var(--line)}
        .sim-res.block{border-color:var(--acc1,#127E90);color:var(--acc1,#127E90)}
        .sim-res.pass{border-color:var(--acc2,#F2812D);color:var(--acc2,#F2812D)}
        .sim-res.maybe{border-color:var(--acc2,#F2812D);color:var(--acc2,#F2812D);border-style:dashed}
        .sim-ph{color:var(--muted);font-weight:400}
        .sim-foot{font-size:12px;color:var(--muted);line-height:1.5;word-break:keep-all}
      ` }));

      function renderResults() {
        ['closed', 'open'].forEach(key => {
          const r = judge(state[key], state.method);
          const box = colEls[key].result;
          box.className = 'sim-res ' + (r.ok === false ? 'block' : (r.ok === 'maybe' ? 'maybe' : 'pass'));
          box.textContent = `${METHODS[state.method]} → ${r.text}`;
        });
        const foot = el.querySelector('.sim-foot');
        foot.textContent = state.method === 'finetune'
          ? '직접 미세조정은 가중치가 있어야 해요. 2023년 연구에서는 회사가 연 미세조정 창구로도 안전장치가 풀렸어요.'
          : (state.method === 'ablate' ? '2024년 연구에서 거절은 모델 속 한 방향에 모여 있었어요. 가중치를 가진 사람만 그 방향을 지울 수 있어요.' : '');
      }
      methodSel.addEventListener('change', () => { state.method = methodSel.value; if (state.tried) renderResults(); });
      tryBtn.addEventListener('click', () => { state.tried = true; renderResults(); });
      resetBtn.addEventListener('click', () => {
        Object.assign(state.closed, { check: true, noprefill: true, refusal: true, closedw: true });
        Object.assign(state.open, { refusal: true });
        colEls.closed.list.querySelectorAll('input').forEach(cb => { cb.checked = true; });
        const openRef = colEls.open.list.querySelector('#sim-ow-open-refusal'); if (openRef) openRef.checked = true;
        if (state.tried) renderResults();
      });
    }
  },

  teacherLines: [
    '공개 모델은 안전장치의 <b>마지막 겹까지 내 컴퓨터 안</b>에 있어서 마음먹으면 지울 수 있어요.',
    '같은 능력이 공격에도 방어에도 쓰여요. 그래서 <b>할 수 있는 것과 해도 되는 것</b>을 나눠 생각해야 해요.'
  ],
  tip: {
    body: '학교 서버나 노트북에 공개 모델을 깔아 수업에 쓸 계획이라면, 모델의 거절 기능만 믿지 말고 <b>바깥 겹을 따로</b> 만드세요. ① 학생 입력을 거르는 단계 ② 사용 규칙과 시간 제한 ③ 대화 기록 보관. 커뮤니티에 올라온 "수정판" 모델은 거절 기능이 지워졌을 수 있으니 원래 개발사가 올린 모델만 써요.',
    extra: '정보 수업에서 "탈옥 문장을 찾아보자"는 활동은 피하고, 이 편의 겹 도식으로 "어느 겹이 무엇을 막는가"를 토론하게 하세요. 이중 용도 기술은 방어 관점(어떻게 막을까)으로 질문을 바꿔 가르치는 편이 안전해요.'
  },
  myth: {
    myth: '공개 모델도 해로운 요청을 거절하도록 훈련돼 있으니 학교에서 그대로 써도 안전하다.',
    fact: '공개 모델의 거절은 모델 속 한 겹뿐이고, 가중치를 가진 사람은 그 겹을 낮은 비용으로 지울 수 있어요. 9월 분석에서 거절 제거본은 해로운 요청에 100% 응했고, 출시 며칠 만에 공개됐어요.'
  },
  sources: [
    { title: 'GLM-5.3 and the spread of advanced cyber capabilities (Anthropic, 2026-09-29)', url: 'https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities', note: 'Frontier Red Team 분석. 그냥 요청 0%, 거짓 상황 설정 64%, 생각 미리 채우기 92%, 거절 제거본 100%(칸당 50표본, 격리된 오프라인 표적). 거절 제거 약 2,200 GPU시간·약 4,400달러, 일반 능력 점수 유지. 방어자에게도 도움이 되는 이중 용도.' },
    { title: 'Refusal in Language Models Is Mediated by a Single Direction (arXiv 2406.11717, 2024)', url: 'https://arxiv.org/abs/2406.11717', note: '공개 채팅 모델 13개에서 거절이 내부 활성값의 한 방향에 모여 있고, 그 방향을 지우면 다른 능력은 거의 그대로인 채 거절이 사라짐.' },
    { title: 'Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To! (arXiv 2310.03693, 2023)', url: 'https://arxiv.org/abs/2310.03693', note: '해로운 예시 10개 미세조정(0.2달러 미만)으로 안전장치가 무너지고, 평범한 데이터 미세조정으로도 안전 정렬이 약해질 수 있음.' }
  ],
  script: `9월 29일 Anthropic의 레드팀이 다른 회사가 공개한 오픈 웨이트 모델을 분석해 발표했어요. 해로운 사이버 공격 요청을 그냥 했을 때는 0%였는데, 간단한 우회로 64%, 92%, 100%까지 응했어요. 같은 방법은 안전장치를 갖춘 닫힌 모델에서는 통하지 않았어요.

닫힌 모델은 요청 검사, API 규칙, 모델 속 거절 훈련까지 여러 겹이에요. 가중치를 내려받으면 모델 속 거절만 남아요. 탈옥은 상황을 꾸며 그 거절을 속이고, 생각 미리 채우기는 이미 하기로 정한 것처럼 시작하게 해요. 거절 방향 지우기는 거절 자체를 없애요.

약점을 찾는 능력은 공격에도 방어에도 쓰이는 이중 용도예요. 그런데 거절을 지우는 비용이 낮고, 지워도 능력은 그대로예요.

학교에서 공개 모델을 돌린다면 바깥 겹은 학교가 만들어야 해요. 학생들과는 할 수 있는 것과 해도 되는 것을 나눠 생각해 봐요.`
};
