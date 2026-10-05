/* S777-47 시키기 전에 일하는 비서: 능동형 에이전트와 승인 단계 */
export default {
  slug: 't7-dots-autopilot',
  track: 'S777',
  title: '시키기 전에 일하는 비서',
  subtitle: '능동형 에이전트와 승인 단계',
  summary: '9월 마지막 주, 자리를 비워도 계속 일하는 개인 에이전트가 잇따라 발표됐어요. 묻는 말에 답하던 AI가 목표를 받아 들고 먼저 움직이기 시작하면, 사람은 \'조작자\'에서 \'승인자\'로 자리가 바뀌어요. 승인 관문은 어디에 두고 승인 버튼은 어떻게 눌러야 하는지 다뤄요.',
  keywords: ['능동형 에이전트', 'proactive agent', 'dots', 'Copilot Autopilot', '승인', 'approval', '자율 수준', 'levels of autonomy', '승인 피로', 'approval fatigue', 'human-in-the-loop', 'Agents API', '컴퓨터 사용'],

  scenes: [
    {
      title: '자리를 비워도 일하는 비서', dur: 13,
      captions: [
        { t: 0, text: '9월 25일 Microsoft가 Copilot의 <em>Autopilot</em>을 발표했어요. 클라우드에서 돌아서 내가 자는 동안에도 계속 일한다고 소개했어요.' },
        { t: 5, text: '나흘 뒤 9월 29일, OpenAI는 복잡한 프로젝트와 일상 업무를 이어서 처리하는 능동형 비서 <em>dots</em>를 공개했어요.' },
        { t: 9.5, text: '시키기 전에 먼저 움직이는 AI예요. 그럼 어디서 멈춰야 할까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const cards = [
          ['9/25 · Microsoft', 'Copilot Autopilot 발표', 'aqua', .4],
          ['9/29 · OpenAI', '능동형 비서 dots 공개', 'aqua', 5.2]
        ].map(([label, sub, acc, at], i) => {
          const b = P.box({ x: 400, y: 110 + i * 160, w: 780, h: 130, label, sub, accent: acc, icon: P.ICON.desk });
          tl.at(stage.appendChild(b.el), at, { from: 'right' });
          return b;
        });
        const chip = P.chip({ x: 400, y: 440, text: '능동형 에이전트', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip.el), 8.4, { from: 'pop' });
        const final = P.text({ x: 400, y: 510, w: 800, text: '시키기 전에 일하는 AI, <em>어디서 멈출까요?</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            cards[0].on(t > .4 && t < 5.2);
            cards[1].on(t > 5.2);
          }
        };
      }
    },
    {
      title: '대답형에서 능동형으로', dur: 14,
      captions: [
        { t: 0, text: '지금까지 챗봇은 물어야 한 번 답하고 멈췄어요.' },
        { t: 4.5, text: '능동형 에이전트는 <em>목표와 경계</em>를 받아 두고, 17편에서 본 에이전트 고리를 내가 자리에 없을 때도 계속 돌려요.' },
        { t: 9.5, text: 'Microsoft 발표문은 목표와 경계는 사용자가 정하고 나머지는 Autopilot이 처리하고 알려 준다고 해요. 신원·메모리·컴퓨터·작업 공간도 자기 것이 따로 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const topLab = P.text({ x: 400, y: 86, w: 300, text: '대답형 챗봇', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(topLab.el), .2, { from: 'up' });
        const top = ['질문', '답', '멈춤'].map((label, i) => {
          const b = P.box({ x: 400 + i * 220, y: 122, w: 180, h: 84, label, accent: '' });
          tl.at(stage.appendChild(b.el), .3 + i * .6, { from: 'up' });
          return b;
        });
        const topArrows = [0, 1].map(i => P.arrow(lines, { x1: 584 + i * 220, y1: 164, x2: 616 + i * 220, y2: 164, width: 4, color: '#9AA5AF' }));
        const botLab = P.text({ x: 400, y: 266, w: 400, text: '능동형 에이전트', size: 20, weight: 700, color: '#127E90' });
        tl.at(stage.appendChild(botLab.el), 4.6, { from: 'up' });
        const loop = [
          ['목표·경계', 'orange'], ['다음 할 일', 'aqua'], ['실행', 'aqua'], ['보고', 'aqua']
        ].map(([label, acc], i) => {
          const b = P.box({ x: 400 + i * 205, y: 302, w: 175, h: 84, label, accent: acc });
          tl.at(stage.appendChild(b.el), 4.8 + i * .5, { from: 'up' });
          return b;
        });
        const botArrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 579 + i * 205, y1: 344, x2: 601 + i * 205, y2: 344, width: 4, color: '#1B1F24' }));
        const back = P.arrow(lines, { x1: 1100, y1: 394, x2: 700, y2: 396, curve: -60, dashed: true, width: 3, color: '#127E90' });
        const final = P.text({ x: 400, y: 520, w: 820, text: '목표와 경계는 <em>사람이</em> 정해요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9.5);
            top.forEach((b, i) => b.on(t > .3 + i * .6 && t < 4.5));
            topArrows.forEach((a, i) => a.draw(P.clamp((t - (.7 + i * .6)) / .4, 0, 1)));
            botArrows.forEach((a, i) => a.draw(P.clamp((t - (5.1 + i * .5)) / .4, 0, 1)));
            back.draw(P.clamp((t - 6.6) / .8, 0, 1));
            const k = t > 7.4 ? 1 + Math.floor((t - 7.4) * 1.4) % 3 : -1;
            loop.forEach((b, i) => b.on(i === 0 ? t > 4.8 : i === k));
          }
        };
      }
    },
    {
      title: '자율의 다섯 단계', dur: 13,
      captions: [
        { t: 0, text: '2025년 연구는 사람이 맡는 역할로 <em>자율 수준</em>을 다섯 단계로 나눴어요.' },
        { t: 4.5, text: '직접 조종하는 조작자, 함께 하는 협업자, 조언하는 자문자, 결정을 허가하는 승인자, 지켜보기만 하는 관찰자예요.' },
        { t: 9, text: '능동형 비서를 쓰면 우리 자리는 대개 <em>승인자</em>예요. 이 자리는 능력과 별개로 설계해서 정하는 값이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const head = P.text({ x: 400, y: 90, w: 820, text: '자율 = <em>설계로 정하는 값</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(head.el), 9.2, { from: 'up' });
        const steps = [
          ['조작자', '직접 조종'], ['협업자', '함께 하기'], ['자문자', '조언하기'], ['승인자', '결정 허가'], ['관찰자', '지켜보기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + i * 162, y: 520 - i * 78, w: 150, h: 96, label, sub, accent: i === 3 ? 'orange' : (i === 4 ? 'ink' : '') });
          tl.at(stage.appendChild(b.el), .4 + i * 1, { from: 'up' });
          return b;
        });
        const axis = P.arrow(lines, { x1: 400, y1: 640, x2: 1200, y2: 640, width: 3, color: '#9AA5AF' });
        const axisLab = P.text({ x: 1000, y: 596, w: 200, text: '사람 손이 줄어요', size: 18, weight: 700, cls: 'muted', align: 'right' });
        tl.at(stage.appendChild(axisLab.el), 5.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            axis.draw(P.clamp((t - 5) / .8, 0, 1));
            steps.forEach((b, i) => b.on(i === 3 ? t > 9 : (t > .4 + i && t < 9)));
          }
        };
      }
    },
    {
      title: '승인 관문은 어디에 두나', dur: 14,
      captions: [
        { t: 0, text: '9월 29일 OpenAI Agents API에 <em>컴퓨터 사용</em>이 추가됐어요. 개발자 문서를 보면 에이전트가 새 웹사이트로 갈 때마다 사용자 승인을 받아요.' },
        { t: 5, text: '로그인 값은 앱이 따로 받아서 모델 입력 밖에 둬요. 화면을 누르는 원리는 18편에서 봤죠.' },
        { t: 9.5, text: '그런데 문서는 사이트 승인이 개별 행동 확인을 대신하지 않는다고 적어요. 결제·삭제 앞에는 관문을 따로 둬야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const news = P.chip({ x: 400, y: 96, text: '9/29 · OpenAI Agents API에 컴퓨터 사용 추가', color: 'ink', size: 20 });
        tl.at(stage.appendChild(news.el), .3, { from: 'pop' });
        const flow = [
          ['에이전트', '브라우저 작업', 'ink', 1],
          ['관문 ①', '새 사이트 승인', 'aqua', 2.4],
          ['관문 ②', '로그인은 앱이 받기', 'aqua', 5.2],
          ['결제·삭제', '따로 확인 필요', 'orange', 9.8]
        ].map(([label, sub, acc, at], i) => {
          const b = P.box({ x: 400 + i * 205, y: 180, w: 180, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), at, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 584 + i * 205, y1: 240, x2: 601 + i * 205, y2: 240, width: 4, color: i === 2 ? '#F2812D' : '#1B1F24', dashed: i === 2 }));
        const note = P.text({ x: 400, y: 350, w: 800, text: '로그인 값은 <i>모델 입력 밖</i>에 둬요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 5.6, { from: 'up' });
        const final = P.text({ x: 400, y: 430, w: 800, text: '사이트 승인이 <em>개별 행동 확인</em>까지<br>대신해 주진 않아요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            flow.forEach((b, i) => b.on(t > [1, 2.4, 5.2, 9.8][i]));
            arrows.forEach((a, i) => a.draw(P.clamp((t - [2.2, 5, 9.6][i]) / .4, 0, 1)));
          }
        };
      }
    },
    {
      title: '승인 버튼을 누르는 사람', dur: 13,
      captions: [
        { t: 0, text: '승인 요청이 너무 잦으면 내용을 안 보고 누르게 돼요. 이걸 <em>승인 피로</em>라고 불러요.' },
        { t: 4.5, text: '보안 단체 OWASP의 에이전트 위험 목록에도 그럴듯한 설명에 속아 해로운 행동을 승인하는 일이 올라 있어요.' },
        { t: 9, text: '읽기와 초안은 맡기고, 보내기·결제·삭제는 <em>무엇을·누구에게·되돌릴 수 있는지</em> 읽고 눌러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'oops' });
        stage.append(q.el);
        const fatigue = P.text({ x: 400, y: 96, w: 800, text: '너무 잦은 승인 → <em>안 보고 누르기</em>', size: 30, weight: 800 });
        tl.at(stage.appendChild(fatigue.el), .4, { from: 'up' });
        const checks = [
          ['무엇을', '보내기·결제·삭제?'], ['누구에게', '받는 사람·사이트'], ['되돌릴 수 있나', '취소 가능 여부']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + i * 270, y: 200, w: 250, h: 120, label, sub, accent: i === 2 ? 'orange' : 'ink', icon: '' });
          tl.at(stage.appendChild(b.el), 9.2 + i * .5, { from: 'up' });
          return b;
        });
        const c1 = P.chip({ x: 400, y: 380, text: '읽기·초안 → 맡기기', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(c1.el), 9.6, { from: 'pop' });
        const c2 = P.chip({ x: 700, y: 380, text: '보내기·결제·삭제 → 승인', color: 'orange', size: 22 });
        tl.at(stage.appendChild(c2.el), 10.2, { from: 'pop' });
        const owasp = P.text({ x: 400, y: 460, w: 800, text: 'OWASP 위험 목록: 그럴듯한 설명에 속은 승인', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(owasp.el), 4.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            checks.forEach((b, i) => b.on(t > 9.2 + i * .5));
          }
        };
      }
    }
  ],

  interaction: {
    title: '밤사이 비서 승인 관문',
    desc: '과제(가상 예시)는 "내일 아침까지 현장체험학습 준비 마무리"예요. <b>자율 수준</b>을 고르고 승인 규칙 두 개를 켜고 끈 뒤 <b>밤사이 실행</b>을 눌러 보세요. 비서가 시도할 행동 6개가 "자동 실행 · 승인 대기 · 제안만 · 사람이 직접"으로 나뉘어요. 같은 설정이면 항상 같은 결과가 나와요.',
    mount(el, P) {
      const ACTIONS = [
        { label: '① 안내문 초안 작성', kind: '초안', safe: true, site: false, irrev: false },
        { label: '② 회신 설문 결과 집계', kind: '읽기', safe: true, site: false, irrev: false },
        { label: '③ 체험처 예약 사이트 접속', kind: '새 사이트', safe: false, site: true, irrev: false },
        { label: '④ 학부모 단체 문자 발송', kind: '외부 전송', safe: false, site: false, irrev: true },
        { label: '⑤ 체험 재료비 38,000원 결제', kind: '결제', safe: false, site: false, irrev: true },
        { label: '⑥ 지난 학기 안내문 파일 삭제', kind: '삭제', safe: false, site: false, irrev: true }
      ];
      const LEVELS = ['', '1 조작자', '2 협업자', '3 자문자', '4 승인자', '5 관찰자'];
      let ran = false;

      const range = P.h('input', { type: 'range', id: 'sim-dt-level', min: '1', max: '5', step: '1', value: '4' });
      const levelOut = P.h('b', { class: 'sim-dt-out' }, LEVELS[4]);
      const rangeLab = P.h('label', { for: 'sim-dt-level', class: 'sim-dt-rl' }, '자율 수준 ', levelOut);
      const cbSite = P.h('input', { type: 'checkbox', id: 'sim-dt-site' }); cbSite.checked = true;
      const cbIrrev = P.h('input', { type: 'checkbox', id: 'sim-dt-irrev' }); cbIrrev.checked = true;
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '밤사이 실행');
      const log = P.h('div', { class: 'sim-dt-log' });
      const summary = P.h('div', { class: 'sim-dt-sum' }, '"밤사이 실행"을 누르면 행동마다 판정이 붙어요.');
      const warn = P.h('div', { class: 'sim-dt-warn' });

      el.append(P.h('div', { class: 'sim-dt' },
        P.h('div', { class: 'sim-dt-task' }, P.h('b', {}, '과제(가상 예시): '), '내일 아침까지 현장체험학습 준비 마무리'),
        P.h('div', { class: 'sim-dt-ctrl' }, rangeLab, range, P.h('div', { class: 'sim-dt-scale' }, '1 조작자 · 2 협업자 · 3 자문자 · 4 승인자 · 5 관찰자')),
        P.h('div', { class: 'sim-dt-rules' },
          P.h('label', { class: 'sim-dt-rule', for: 'sim-dt-site' }, cbSite, P.h('span', {}, '새 사이트는 승인 받기')),
          P.h('label', { class: 'sim-dt-rule', for: 'sim-dt-irrev' }, cbIrrev, P.h('span', {}, '되돌릴 수 없는 행동은 승인 받기'))
        ),
        P.h('div', { class: 'sim-dt-bar' }, runBtn),
        log, summary, warn
      ));
      el.append(P.h('style', { html: `
        .sim-dt{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-dt-task{font-size:14px;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper)}
        .sim-dt-ctrl{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-dt-rl{font-size:14px}
        .sim-dt-out{color:var(--acc1,#127E90)}
        .sim-dt-ctrl input[type=range]{width:100%;max-width:420px}
        .sim-dt-scale{font-size:12px;color:var(--muted)}
        .sim-dt-rules{display:flex;flex-wrap:wrap;gap:8px}
        .sim-dt-rule{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:14px;max-width:100%;box-sizing:border-box;cursor:pointer}
        .sim-dt-bar{display:flex;gap:8px;flex-wrap:wrap}
        .sim-dt-log{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-dt-row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:#fff;font-size:13.5px;max-width:100%;box-sizing:border-box}
        .sim-dt-kind{font-size:12px;color:var(--muted);margin-left:6px}
        .sim-dt-badge{font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap}
        .sim-dt-badge.auto{background:color-mix(in srgb,var(--acc1,#127E90) 14%,white);color:var(--acc1,#127E90)}
        .sim-dt-badge.wait{background:var(--ink-soft,#1B1F24);color:#fff}
        .sim-dt-badge.sug,.sim-dt-badge.man,.sim-dt-badge.pre{background:#eef1f4;color:var(--muted)}
        .sim-dt-badge.danger{background:color-mix(in srgb,var(--acc2,#F2812D) 16%,white);color:var(--acc2,#F2812D)}
        .sim-dt-sum{font-family:var(--mono);font-size:13px;font-weight:700;line-height:1.5}
        .sim-dt-sum .hot{color:var(--acc2,#F2812D)}
        .sim-dt-warn{font-size:13.5px;color:var(--acc2,#F2812D);font-weight:700}
      ` }));

      function judge(a, level) {
        if (level <= 2) return ['man', '사람이 직접'];
        if (level === 3) return a.safe ? ['auto', '자동 실행'] : ['sug', '제안만'];
        if (level === 4) {
          if ((a.site && cbSite.checked) || (a.irrev && cbIrrev.checked)) return ['wait', '승인 대기'];
          return a.irrev ? ['danger', '되돌릴 수 없는 자동 실행'] : ['auto', '자동 실행'];
        }
        return a.irrev ? ['danger', '되돌릴 수 없는 자동 실행'] : ['auto', '자동 실행'];
      }
      function render() {
        const level = +range.value;
        levelOut.textContent = LEVELS[level];
        if (!ran) {
          log.replaceChildren(...ACTIONS.map(a => P.h('div', { class: 'sim-dt-row' }, P.h('span', {}, a.label, P.h('span', { class: 'sim-dt-kind' }, a.kind)), P.h('span', { class: 'sim-dt-badge pre' }, '실행 전'))));
          warn.textContent = '';
          return;
        }
        let nWait = 0, nAuto = 0, nDanger = 0;
        log.replaceChildren(...ACTIONS.map(a => {
          const [cls, txt] = judge(a, level);
          if (cls === 'wait') nWait++;
          if (cls === 'auto') nAuto++;
          if (cls === 'danger') { nAuto++; nDanger++; }
          return P.h('div', { class: 'sim-dt-row' }, P.h('span', {}, a.label, P.h('span', { class: 'sim-dt-kind' }, a.kind)), P.h('span', { class: `sim-dt-badge ${cls}` }, txt));
        }));
        summary.replaceChildren(
          `승인 요청 ${nWait}건 · 자동 ${nAuto}건 · `,
          P.h('span', { class: nDanger ? 'hot' : '' }, `되돌릴 수 없는 자동 실행 ${nDanger}건`)
        );
        warn.textContent = nWait >= 4 ? `아침에 승인 요청 ${nWait}건, 다 읽을 수 있을까요? (승인 피로)` : (nDanger ? '되돌릴 수 없는 일이 사람 확인 없이 지나갔어요.' : '');
      }
      runBtn.addEventListener('click', () => { ran = true; render(); });
      range.addEventListener('input', render);
      cbSite.addEventListener('change', render);
      cbIrrev.addEventListener('change', render);
      render();
    }
  },

  teacherLines: [
    '능동형 AI에게는 <b>목표와 경계</b>를 함께 줘요. 어디서 멈출지도 우리가 정해요.',
    '보내기·결제·삭제처럼 <b>되돌릴 수 없는 일</b>은 승인 버튼을 사람이 눌러요.'
  ],
  tip: {
    body: '능동형 비서를 처음 쓸 때는 1~2주 동안 <b>초안까지만</b> 맡기고, 승인 요청이 오면 <b>무엇을·누구에게·되돌릴 수 있는지</b> 세 가지를 읽고 눌러요.',
    extra: '승인 요청이 너무 많이 오면 규칙을 다시 짜요. 읽기·초안처럼 안전한 일은 자동으로 두고 바깥으로 나가는 일만 승인으로 남겨야 승인 하나하나를 제대로 볼 수 있어요.'
  },
  myth: {
    myth: '승인 단계만 있으면 에이전트는 안전하다.',
    fact: '승인은 사람이 내용을 읽을 때만 효과가 있어요. 너무 잦으면 안 보고 누르게 되고(승인 피로), 사이트 접근 승인이 결제·삭제 같은 개별 행동 확인을 대신하지도 않아요.'
  },
  sources: [
    { title: 'OpenAI · Introducing dots', url: 'https://openai.com/index/introducing-dots', note: '2026-09-29 게시(공식 RSS 확인). 복잡한 프로젝트와 일상 업무를 이어서 처리하는 능동형 비서.' },
    { title: 'Microsoft · Introducing the new Copilot with Home, Code and Autopilot', url: 'https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/', note: '2026-09-25. 클라우드에서 돌아 사용자가 자는 동안에도 일함, 목표와 경계는 사용자가 정함, 자기 신원·메모리·컴퓨터·작업 공간.' },
    { title: 'OpenAI Developers · Agents API: Computer use', url: 'https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use', note: '새 사이트(오리진)마다 사용자 승인, 로그인 값은 모델 입력 밖, 사이트 승인은 개별 행동 확인을 대신하지 않음.' },
    { title: 'Feng, McDonald, Zhang · Levels of Autonomy for AI Agents (arXiv 2506.12469, 2025)', url: 'https://arxiv.org/abs/2506.12469', note: '사용자 역할로 본 자율 5단계(조작자·협업자·자문자·승인자·관찰자). 자율은 능력과 별개인 설계 결정.' }
  ],
  script: `9월 25일 Microsoft가 내가 자는 동안에도 클라우드에서 일하는 Copilot Autopilot을 발표했어요. 나흘 뒤 OpenAI는 능동형 비서 dots를 공개했어요.

챗봇은 물어야 한 번 답하고 멈췄어요. 능동형 에이전트는 목표와 경계를 받아 두고 내가 없을 때도 계속 움직여요. 2025년 연구는 사람의 역할로 자율을 다섯 단계로 나눴는데, 이런 비서를 쓰면 우리 자리는 대개 승인자예요.

OpenAI Agents API 문서를 보면 새 웹사이트마다 사용자 승인을 받고, 로그인 값은 모델 입력 밖에 둬요. 그런데 사이트 승인이 개별 행동 확인을 대신하지는 않아요. 결제·삭제 앞에는 관문을 따로 둬요.

승인이 너무 잦으면 안 보고 누르게 돼요. 읽기와 초안은 맡기고, 보내기·결제·삭제는 무엇을, 누구에게, 되돌릴 수 있는지 읽고 눌러요.`
};
