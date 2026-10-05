/* S777-43 위험한 능력은 먼저 누구에게 주나: 단계적 공개와 위험 능력 평가 */
export default {
  slug: 't7-argon-staged',
  track: 'S777',
  title: '위험한 능력은 먼저 누구에게 주나',
  subtitle: '단계적 공개와 위험 능력 평가',
  summary: '9월 30일 Google이 Gemini 4 Argon을 발표하면서 일반 공개보다 먼저 검증된 사이버 방어자에게 줬어요. 취약점을 찾아 고치는 능력은 공격에도 쓰일 수 있어요. 그런 능력을 어떻게 재고(위험 능력 평가), 누구에게 어떤 순서로 여는지(단계적 공개)를 공식 발표와 안전 프레임워크로 짚어요.',
  keywords: ['Gemini 4 Argon', 'Google DeepMind', 'Fairwind', '단계적 공개', 'staged release', '위험 능력 평가', 'dangerous capability evaluation', '이중 용도', 'Frontier Safety Framework', '임계 능력 수준', 'CCL', '레드팀', '사전 평가', '신뢰 접근', 'METR'],

  scenes: [
    {
      title: '먼저 받은 사람들', dur: 13,
      captions: [
        { t: 0, text: '9월 30일 Google이 <em>Gemini 4 Argon</em>을 발표했어요. 소프트웨어 공학, 기업 지식 업무, 사이버 보안 방어를 겨냥한 모델이에요.' },
        { t: 5, text: '그런데 모두에게 바로 열지 않고 <em>Fairwind 프로그램</em>으로 검증된 사이버 방어자에게 먼저 주기 시작했어요.' },
        { t: 9.2, text: '유료 API 고객과 Google AI Ultra 구독자에게도 "가능한 한 빨리" 넓힌다고 했어요. 왜 <em>순서</em>를 정했을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const news = P.chip({ x: 360, y: 92, text: '9월 30일 · Gemini 4 Argon 발표', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(news.el), .3, { from: 'pop' });
        const steps = [
          ['검증된 방어자', '1단계 · Fairwind, 지금', 'orange'],
          ['유료 고객', '2단계 · API · AI Ultra', 'aqua'],
          ['더 넓게', '그다음 · 점차 확대', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + i * 300, y: 170, w: 260, h: 130, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), (i === 0 ? 5.2 : 9.4) + (i === 2 ? .8 : 0), { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 624 + i * 300, y1: 235, x2: 656 + i * 300, y2: 235, width: 4, color: '#1B1F24' }));
        const ask = P.text({ x: 360, y: 400, w: 840, text: '왜 <em>순서</em>를 정했을까요?', size: 34, weight: 800 });
        tl.at(stage.appendChild(ask.el), 10.9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            steps[0].on(t > 5.2);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (9.6 + i * .8)) / .4, 0, 1)));
          }
        };
      }
    },
    {
      title: '같은 능력, 두 방향', dur: 14,
      captions: [
        { t: 0, text: '발표문은 Argon이 중요한 소프트웨어 취약점을 <em>스스로 찾고, 검증하고, 고칠 수</em> 있다고 해요. 취약점은 프로그램의 보안 구멍이에요.' },
        { t: 5.5, text: '찾는 능력은 고치는 쪽에도, 악용하는 쪽에도 쓰여요. 이렇게 양쪽에 다 쓰일 수 있는 걸 <em>이중 용도</em>라고 해요.' },
        { t: 10, text: 'Fairwind는 방어자가 먼저 시스템을 단단히 하도록 <em>적응 기간</em>을 주는 장치예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'think' });
        stage.append(q.el);
        const find = P.box({ x: 600, y: 90, w: 340, h: 120, label: '취약점 찾기', sub: '찾고 · 검증하고 · 고치기', accent: 'ink', icon: P.ICON.search });
        tl.at(stage.appendChild(find.el), .3, { from: 'down' });
        const fix = P.box({ x: 380, y: 340, w: 340, h: 120, label: '고치기 (방어)', sub: '보안 구멍을 막아요', accent: 'aqua', icon: P.ICON.check });
        const abuse = P.box({ x: 820, y: 340, w: 340, h: 120, label: '악용하기 (공격)', sub: '같은 구멍을 노려요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(fix.el), 5.8, { from: 'up' });
        tl.at(stage.appendChild(abuse.el), 6.6, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 720, y1: 215, x2: 560, y2: 335, curve: 12, width: 3, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 820, y1: 215, x2: 980, y2: 335, curve: -12, width: 3, color: '#1B1F24' });
        const dual = P.chip({ x: 720, y: 262, text: '이중 용도', color: 'gray', size: 20 });
        tl.at(stage.appendChild(dual.el), 7.6, { from: 'pop' });
        const win = P.chip({ x: 380, y: 520, text: 'Fairwind: 방어자에게 적응 기간 먼저', color: 'ink', size: 22 });
        tl.at(stage.appendChild(win.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.8);
            a1.draw(P.clamp((t - 5.6) / .5, 0, 1));
            a2.draw(P.clamp((t - 6.4) / .5, 0, 1));
            fix.on(t > 10);
            find.on(t > .3 && t < 5.5);
          }
        };
      }
    },
    {
      title: '위험한 능력은 어떻게 재나', dur: 14,
      captions: [
        { t: 0, text: '2024년 연구는 모델을 설득·기만, 사이버 보안, 자기 복제, 자기 추론 <em>네 영역</em>에서 따로 시험했어요. 이걸 <em>위험 능력 평가</em>라고 해요.' },
        { t: 5.5, text: 'Google 안전 프레임워크는 안전장치 없이는 심각한 해를 줄 수 있는 선을 <em>임계 능력 수준</em>이라고 불러요. 그 선에 닿으면 외부 출시 전에 안전성을 검토해요.' },
        { t: 10.5, text: '2026년 4월에는 덜 극단적인 위험을 더 일찍 잡으려고 <em>추적 능력 수준</em>도 새로 넣었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'think' });
        stage.append(q.el);
        const areas = [['설득·기만', 380], ['사이버 보안', 560], ['자기 복제', 760], ['자기 추론', 940]].map(([text, x], i) => {
          const c = P.chip({ x, y: 100, text, color: 'aqua', size: 22 });
          tl.at(stage.appendChild(c.el), .4 + i * .5, { from: 'pop' });
          return c;
        });
        const capLab = P.text({ x: 380, y: 196, w: 300, text: '능력 →', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(capLab.el), 5.6, { from: 'none' });
        const gauge = P.h('div', { style: 'position:absolute;left:380px;top:240px;width:800px;height:40px;border-radius:20px;border:2px solid #9AA5AF;box-sizing:border-box;opacity:0' });
        const mkTick = (x, color) => { const d = P.h('div', { style: `position:absolute;left:${x - 3}px;top:226px;width:6px;height:68px;border-radius:3px;background:${color};opacity:0` }); return d; };
        const tcl = mkTick(800, '#127E90');
        const ccl = mkTick(1040, '#F2812D');
        stage.append(gauge, tcl, ccl);
        const cclLab = P.text({ x: 960, y: 304, w: 160, text: '임계 능력 수준', size: 19, weight: 800, align: 'center' });
        const tclLab = P.text({ x: 720, y: 304, w: 160, text: '추적 능력 수준', size: 19, weight: 800, align: 'center' });
        const tclNote = P.text({ x: 720, y: 334, w: 160, text: '2026년 4월 추가', size: 16, weight: 600, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(cclLab.el), 6.4, { from: 'up' });
        tl.at(stage.appendChild(tclLab.el), 10.7, { from: 'up' });
        tl.at(stage.appendChild(tclNote.el), 11, { from: 'up' });
        const rule = P.text({ x: 380, y: 410, w: 820, text: '선에 닿으면 → <em>출시 전 안전성 검토</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(rule.el), 8, { from: 'up' });
        const note = P.text({ x: 380, y: 470, w: 820, text: '특정 모델의 위치가 아니라 기준선을 그린 그림이에요.', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 8.4, { from: 'none' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10.3);
            gauge.style.opacity = P.clamp((t - 5.6) / .5, 0, 1);
            ccl.style.opacity = P.clamp((t - 6.4) / .4, 0, 1);
            tcl.style.opacity = P.clamp((t - 10.7) / .4, 0, 1);
          }
        };
      }
    },
    {
      title: '문을 여는 장치들', dur: 13,
      captions: [
        { t: 0, text: '<em>단계적 공개</em>는 접근을 단계마다 조금씩 넓히는 방식이에요. Argon은 안팎의 <em>레드팀</em>, 즉 일부러 공격해 보며 약점을 찾는 시험팀이 검사했다고 밝혔어요.' },
        { t: 5.5, text: '생각 과정과 행동을 감시하다 필요하면 <em>실행을 멈추는</em> 장치를 두고 미국 정부의 출시 전 자발적 접근 절차에도 참여한다고 했어요.' },
        { t: 9.5, text: '앞서 9월 22일 Anthropic은 Opus 5.5의 사이버 작업 대부분을 이전 모델로 돌리고, 방어자용 신뢰 접근을 <em>3단계</em>로 열기로 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['레드팀 시험', '안팎 · 수동과 자동 공격', P.ICON.search, 2.4],
          ['생각·행동 감시', '필요하면 실행 멈춤', P.ICON.eye, 5.7],
          ['정부 사전 접근', '미국 정부 자발적 절차 참여', P.ICON.doc, 7.2]
        ].map(([label, sub, icon, t0], i) => {
          const b = P.box({ x: 360, y: 90 + i * 140, w: 460, h: 120, label, sub, accent: 'aqua', icon });
          tl.at(stage.appendChild(b.el), t0, { from: 'left' });
          return b;
        });
        const other = P.box({ x: 870, y: 160, w: 360, h: 200, label: '9월 22일 Anthropic', sub: 'Opus 5.5 사이버 작업은<br>대부분 이전 모델로<br>방어자 신뢰 접근 3단계', accent: 'orange' });
        tl.at(stage.appendChild(other.el), 9.7, { from: 'right' });
        const final = P.text({ x: 360, y: 545, w: 860, text: '문은 <em>지켜보면서</em> 조금씩 넓혀요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            items.forEach((b, i) => b.on(t > [2.4, 5.7, 7.2][i] && t < 9.5));
            other.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '교실 판단: 누구에게 먼저', dur: 13,
      captions: [
        { t: 0, text: '학생이 "그 기능은 왜 아직 못 써요?" 하고 물을 수 있어요.' },
        { t: 4, text: '공격에도 쓰일 수 있는 능력은 <em>검증된 사람에게 먼저</em>, 감시와 함께 열린다고 설명해 주세요.' },
        { t: 8.5, text: '새 모델 발표에선 성능만큼 <em>누구에게 먼저, 어떤 조건으로</em> 여는지도 읽어요. 막혀 있으면 우회하지 말고 학교 정보 담당 절차로 요청해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const ask = P.bubble({ x: 340, y: 100, w: 560, text: '그 기능은 왜 <b>아직</b> 못 써요?', tail: 'left', size: 28 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const c1 = P.chip({ x: 360, y: 270, text: '누구에게 먼저', color: 'aqua', size: 26 });
        const c2 = P.chip({ x: 600, y: 270, text: '어떤 조건으로', color: 'orange', size: 26 });
        tl.at(stage.appendChild(c1.el), 4.2, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 5.2, { from: 'pop' });
        const box = P.box({ x: 760, y: 400, w: 440, h: 130, label: '막혀 있으면', sub: '우회 말고 학교 정보 담당 절차로', accent: 'ink', icon: P.ICON.hand });
        tl.at(stage.appendChild(box.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 3.8);
          }
        };
      }
    }
  ],

  interaction: {
    title: '공개 단계 설계판',
    desc: '가상의 모델 X를 단계별로 공개해 봐요. 안전장치를 고르고 "다음 단계 열기"를 누르면 한 칸씩 나아가요. <b>임계선을 넘은 영역</b>이 있으면 안전장치가 갖춰져야만 다음 문이 열려요.',
    mount(el, P) {
      const AREAS = [['사이버', 72], ['생물', 40], ['설득', 35]];
      const TRACK = 50, CRIT = 70;
      const STAGES = ['내부 시험', '외부 기관 사전 평가', '검증된 방어자', '유료 API', '일반 사용자'];
      const GUARDS = [
        { id: 'red', label: '안팎 레드팀 시험 완료' },
        { id: 'mon', label: '생각 과정·행동 감시' },
        { id: 'idv', label: '신원 검증 프로그램' },
        { id: 'gov', label: '정부 사전 접근 절차' }
      ];
      const on = { red: false, mon: false, idv: false, gov: false };
      let cur = 0;
      let log = [];
      const overCrit = AREAS.some(([, v]) => v > CRIT);

      const bars = P.h('div', { class: 'sim-t43-bars' }, ...AREAS.map(([name, v]) => P.h('div', { class: 'sim-t43-bar' },
        P.h('span', { class: 'n' }, name),
        P.h('span', { class: 'track' },
          P.h('span', { class: `fill${v > CRIT ? ' hot' : ''}`, style: `width:${v}%` }),
          P.h('span', { class: 'mk t', style: `left:${TRACK}%` }),
          P.h('span', { class: 'mk c', style: `left:${CRIT}%` })),
        P.h('span', { class: 'v' }, String(v)))));
      const legend = P.h('div', { class: 'sim-t43-legend' }, P.h('span', { class: 'lt' }, '추적선 50'), P.h('span', { class: 'lc' }, '임계선 70'), '사이버만 임계선 위예요.');
      const guards = GUARDS.map(g => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-t43-${g.id}` });
        cb.addEventListener('change', () => { on[g.id] = cb.checked; });
        return P.h('label', { class: 'sim-t43-g', for: `sim-t43-${g.id}` }, cb, g.label);
      });
      const track = P.h('ol', { class: 'sim-t43-steps' });
      const logEl = P.h('div', { class: 'sim-t43-log' });
      const nextBtn = P.h('button', { class: 'btn primary', type: 'button' }, '다음 단계 열기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');

      el.append(P.h('div', { class: 'sim-t43' },
        P.h('p', { class: 'sim-t43-warn' }, '가상의 모델 X와 예시 값이에요. 실제 회사의 기준이나 점수가 아니에요.'),
        P.h('h4', { class: 'sim-t43-h' }, '위험 능력 평가 결과 (0~100, 예시 값)'),
        bars, legend,
        P.h('h4', { class: 'sim-t43-h' }, '안전장치'),
        P.h('div', { class: 'sim-t43-gs' }, ...guards),
        P.h('div', { class: 'sim-t43-btns' }, nextBtn, resetBtn),
        track,
        logEl
      ));
      el.append(P.h('style', { html: `
        .sim-t43{display:flex;flex-direction:column;gap:10px;max-width:100%}
        .sim-t43-warn{margin:0;font-size:13px;color:#F2812D;font-weight:700;line-height:1.5}
        .sim-t43-h{margin:4px 0 0;font-size:13.5px;color:var(--muted)}
        .sim-t43-bars{display:flex;flex-direction:column;gap:8px}
        .sim-t43-bar{display:flex;align-items:center;gap:10px}
        .sim-t43-bar .n{flex:0 0 52px;font-weight:700;font-size:14px}
        .sim-t43-bar .track{position:relative;flex:1 1 auto;min-width:0;height:18px;border-radius:9px;background:var(--paper)}
        .sim-t43-bar .fill{position:absolute;left:0;top:0;bottom:0;border-radius:9px;background:#127E90}
        .sim-t43-bar .fill.hot{background:#F2812D}
        .sim-t43-bar .mk{position:absolute;top:-4px;bottom:-4px;width:3px;margin-left:-1px;border-radius:2px}
        .sim-t43-bar .mk.t{background:#9AA5AF}
        .sim-t43-bar .mk.c{background:#1B1F24}
        .sim-t43-bar .v{flex:0 0 28px;font-family:var(--mono);font-size:13px;font-weight:800;text-align:right}
        .sim-t43-legend{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:12.5px;color:var(--muted)}
        .sim-t43-legend .lt{border-left:3px solid #9AA5AF;padding-left:6px}
        .sim-t43-legend .lc{border-left:3px solid #1B1F24;padding-left:6px}
        .sim-t43-gs{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px}
        .sim-t43-g{display:flex;align-items:center;gap:8px;padding:9px 11px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:13.5px;line-height:1.4}
        .sim-t43-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-t43-steps{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
        .sim-t43-steps li{font-size:12.5px;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--muted)}
        .sim-t43-steps li.done{background:#127E90;border-color:#127E90;color:#fff}
        .sim-t43-steps li.now{background:#1B1F24;border-color:#1B1F24;color:#fff;font-weight:800}
        .sim-t43-log{display:flex;flex-direction:column;gap:6px}
        .sim-t43-log div{font-size:13px;padding:8px 11px;border-radius:10px;border:1px solid var(--line);background:#fff;line-height:1.45}
        .sim-t43-log div.stop{border-color:#F2812D;background:var(--paper)}
      ` }));

      function render() {
        track.replaceChildren(...STAGES.map((s, i) => P.h('li', { class: i < cur ? 'done' : i === cur ? 'now' : '' }, `${i} ${s}`)));
        logEl.replaceChildren(...(log.length ? log : [{ text: `지금: 단계 0 ${STAGES[0]}. "다음 단계 열기"를 눌러 보세요.` }]).map(l => P.h('div', { class: l.stop ? 'stop' : '' }, l.text)));
      }
      function next() {
        if (cur >= STAGES.length - 1) { log.push({ text: '모든 단계가 열렸어요. 열린 뒤에도 감시는 계속돼요.' }); render(); return; }
        const s = cur + 1;
        if (s >= 2 && overCrit && !(on.red && on.mon)) { log.push({ stop: true, text: `멈춤: 단계 ${s} ${STAGES[s]} 전에 안전장치 먼저 (임계선을 넘은 영역이 있어 레드팀+감시가 필요해요)` }); render(); return; }
        if (s >= 3 && !on.idv) { log.push({ stop: true, text: `멈춤: 단계 ${s} ${STAGES[s]} 전에 신원 검증 프로그램이 필요해요` }); render(); return; }
        cur = s;
        if (s === 1) {
          log.push({ text: '단계 1 통과: 외부 기관이 출시 전에 평가해요' });
          if (on.gov) log.push({ text: '정부 사전 접근 절차: 출시 전에 정부에 모델을 먼저 열어 줘요' });
        } else if (s === 2) {
          log.push({ text: `단계 2 통과: 검증된 방어자에게 먼저${on.mon ? ', 감시 켜짐' : ''}` });
        } else {
          log.push({ text: `단계 ${s} 통과: ${STAGES[s]}에게 공개${overCrit ? ', 사이버 작업은 검증된 사용자만' : ''}` });
        }
        render();
      }
      nextBtn.addEventListener('click', next);
      resetBtn.addEventListener('click', () => { cur = 0; log = []; render(); });
      render();
    }
  },

  teacherLines: [
    '공격에도 쓰일 수 있는 능력은 <b>검증된 방어자에게 먼저</b> 주고, 지켜보면서 문을 넓혀요.',
    '새 AI 발표에서는 성능만큼 <b>누구에게 먼저, 어떤 조건으로</b> 주는지도 읽어요.'
  ],
  tip: {
    body: '새 모델 발표문에서 <b>공개 범위</b> 문단을 찾아, 학교에서 쓰는 계정 등급(무료·유료·기업)이 몇 단계에 해당하는지 확인해 보세요.',
    extra: '보안 점검 같은 기능이 학교 계정에서 막혀 있다면 우회하지 말고 학교 정보 담당 절차로 요청하세요. 막혀 있는 이유가 바로 이 단계적 공개예요.'
  },
  myth: {
    myth: '단계적 공개는 큰 고객에게 먼저 파는 마케팅이다.',
    fact: 'Argon은 정부 기관·주요 기반시설 같은 검증된 방어자에게 먼저 갔고, 보안팀 직원만 쓰고 다중 인증을 켜는 조건이 붙었어요. 방어자가 먼저 시스템을 단단히 하도록 적응 기간을 주는 장치예요.'
  },
  sources: [
    { title: 'Google: Gemini 4 Argon (2026-09-30)', url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/', note: 'Fairwind로 검증된 방어자에게 먼저 공개, 안팎 레드팀, 생각 과정·행동 감시, 정부 사전 접근 절차.' },
    { title: 'Google: Fairwind Program (2026-09-02)', url: 'https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/', note: '참여 기관, 보안팀 한정·다중 인증 같은 운영 조건, 방어자의 적응 기간.' },
    { title: 'Google DeepMind: Strengthening our Frontier Safety Framework (2025-09-22, 2026-04-17 갱신)', url: 'https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/', note: '임계 능력 수준 정의, 외부 출시 전 안전성 검토, 추적 능력 수준 도입.' },
    { title: 'Evaluating Frontier Models for Dangerous Capabilities (arXiv 2403.13793, 2024)', url: 'https://arxiv.org/abs/2403.13793', note: '설득·기만, 사이버 보안, 자기 복제, 자기 추론 네 영역의 위험 능력 평가.' }
  ],
  script: `9월 30일 Google이 Gemini 4 Argon을 발표했어요. 그런데 모두에게 바로 열지 않고 Fairwind 프로그램으로 검증된 사이버 방어자에게 먼저 줬어요. 유료 고객에게는 가능한 한 빨리 넓힌다고 했어요.

Argon은 소프트웨어 취약점을 스스로 찾고 고칠 수 있다고 해요. 찾는 능력은 방어에도 공격에도 쓰이는 이중 용도예요. 그래서 방어자에게 먼저 적응 기간을 줘요.

2024년 연구는 설득, 사이버, 자기 복제, 자기 추론 네 영역의 위험 능력을 따로 시험했어요. Google 안전 프레임워크는 임계 능력 수준에 닿으면 출시 전에 안전성을 검토해요. Argon은 레드팀 시험과 생각 과정·행동 감시도 밝혔어요.

학생이 왜 아직 못 쓰냐고 물으면, 공격에도 쓰일 능력은 검증된 사람에게 먼저 열린다고 말해 주세요. 발표문에선 성능만큼 누구에게 먼저, 어떤 조건으로 여는지도 읽어요.`
};
