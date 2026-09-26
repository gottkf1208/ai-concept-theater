/* E1 [B] AI는 어떻게 화면을 직접 눌렀을까: AI 에이전트와 MCP (파일럿) */
export default {
  slug: 'e1-agent-mcp',
  track: 'B',
  title: 'AI는 어떻게 화면을 직접 눌렀을까',
  subtitle: 'AI 에이전트와 MCP',
  summary: 'AI가 크롬 확장으로 영상 편집 사이트를 직접 눌러 영상 여섯 편을 만든 날 이야기. 요청, 계획, 도구, 관찰로 도는 고리와 AI와 도구를 잇는 규격 MCP.',
  keywords: ['에이전트', 'agent', 'MCP', '도구', '자동화', '승인', '크롬 확장'],

  scenes: [
    {
      title: '오늘 있었던 일', dur: 13,
      captions: [
        { t: 0, text: 'AI가 크롬 확장으로 영상 편집 사이트를 <em>직접 눌러서</em> 영상 여섯 편을 만들었어요.' },
        { t: 5, text: '제가 한 건 프롬프트 한 줄. <em>파일 저장 창</em>이 뜰 때만 제가 눌렀고요.' },
        { t: 9.5, text: 'AI가 화면을 보고, 누르고, 글자까지 친다는 게 어떻게 되는 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 70, y: 300, size: 380, pose: 'tablet' });
        stage.append(q.el);
        const b = P.bubble({ x: 330, y: 180, w: 470, text: '<b>영상 여섯 편</b> 만들어 줘. 대본은 이 파일대로.', tail: 'left' });
        tl.at(stage.appendChild(b.el), .4, { from: 'left' });
        const screen = P.box({ x: 820, y: 130, w: 380, h: 470, label: '영상 편집 사이트', sub: '', accent: '' });
        screen.el.style.justifyContent = 'flex-start'; screen.el.style.paddingTop = '18px';
        tl.at(stage.appendChild(screen.el), 1.2, { from: 'up' });
        const rows = ['영상 1 · 기후변화', '영상 2 · 검증 편', '영상 3 · 생성 편', '영상 4 · 편집 편', '영상 5 · 공유 편', '영상 6 · 9:16 판'];
        const rowEls = rows.map((r, i) => tl.at(stage.appendChild(P.text({ x: 850, y: 200 + i * 40, w: 320, text: r, size: 19, weight: 600, cls: 'muted' }).el), 1.8 + i * 1.05, { from: 'left', dist: 16 }));
        const cursor = P.h('div', { class: 'p-box-icon', style: 'position:absolute;width:38px;height:38px;color:#F2812D;z-index:3', html: P.ICON.click });
        tl.at(stage.appendChild(cursor), 1.6, { from: 'pop' });
        const gate = P.box({ x: 840, y: 460, w: 340, h: 120, label: '파일 저장 창', sub: '사람이 직접 눌러요', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(gate.el), 6.2, { from: 'pop' });
        const qq = P.text({ x: 330, y: 470, w: 460, text: '화면을 <i>보고</i> · <i>누르고</i> · <i>글자를 치는</i> AI?', size: 30, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            const k = P.clamp((t - 1.8) / 6.3, 0, 1);
            const i = Math.min(5, Math.floor(k * 6));
            cursor.style.left = `${1150 - (t * 40 % 20)}px`; cursor.style.top = `${196 + i * 40}px`;
            rowEls.forEach((r, j) => r.style.color = j <= i && t > 1.8 ? '#127E90' : '');
          }
        };
      }
    },
    {
      title: '에이전트의 고리', dur: 15,
      captions: [
        { t: 0, text: '에이전트는 한 방에 답을 내놓지 않아요. <em>계획</em>을 세우고, <em>도구</em>를 쓰고, <em>결과</em>를 보고, 그다음 행동을 정해요.' },
        { t: 6, text: '목표에 닿을 때까지 이 고리를 <em>돌아요</em>. 실수해도 결과를 보고 고쳐요.' },
        { t: 11, text: '스스로 다음 걸음을 정하니까 "에이전트"라고 부르죠.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 340, pose: 'point' });
        stage.append(q.el);
        const cx = 780, cy = 380, R = 210;
        const nodes = [
          { label: '요청', sub: '"영상 6편 만들어 줘"', a: -90, acc: 'ink', icon: P.ICON.doc },
          { label: '계획', sub: '순서를 세워요', a: 0, acc: 'aqua', icon: P.ICON.brain },
          { label: '도구 사용', sub: '보기·클릭·입력', a: 90, acc: 'orange', icon: P.ICON.click },
          { label: '결과 관찰', sub: '화면이 어떻게 됐지?', a: 180, acc: 'aqua', icon: P.ICON.eye }
        ];
        const boxes = nodes.map((n, i) => {
          const x = cx + Math.cos(n.a * Math.PI / 180) * R - 110, y = cy + Math.sin(n.a * Math.PI / 180) * R * .78 - 52;
          const b = P.box({ x, y, w: 220, h: 104, label: n.label, sub: n.sub, accent: n.acc, icon: n.icon });
          tl.at(stage.appendChild(b.el), .5 + i * 1.4, { from: 'pop' });
          return b;
        });
        const pt = a => [cx + Math.cos(a * Math.PI / 180) * R, cy + Math.sin(a * Math.PI / 180) * R * .78];
        const arrows = [[-90, 0], [0, 90], [90, 180], [180, 270]].map(([a1, a2]) => {
          const [x1, y1] = pt(a1 + 28), [x2, y2] = pt(a2 - 28);
          return P.arrow(lines, { x1, y1, x2, y2, curve: -40, width: 4, color: '#1B1F24' });
        });
        const loopLbl = P.text({ x: cx - 90, y: cy - 22, w: 180, text: '다음 행동', size: 22, weight: 800, align: 'center', color: '#F2812D' });
        tl.at(stage.appendChild(loopLbl.el), 6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1.6 + i * 1.4)) / .8, 0, 1)));
            if (t > 6) { const k = Math.floor(((t - 6) * 1.2) % 4); boxes.forEach((b, i) => b.on(i === k)); }
          }
        };
      }
    },
    {
      title: '도구는 함수예요', dur: 13,
      captions: [
        { t: 0, text: '도구는 모델이 부를 수 있는 <em>함수</em>예요. "화면 찍어 줘", "여기 눌러 줘" 같은 것들이요.' },
        { t: 5, text: '어떤 도구를 쓸지는 모델이 <em>정하고</em>, 실제로 누르는 건 앱(크롬 확장)이에요.' },
        { t: 9.5, text: '결과가 모델한테 돌아오니까 다음 행동으로 이어져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const model = P.box({ x: 90, y: 250, w: 260, h: 150, label: 'AI 모델', sub: '어떤 도구를 쓸지 정해요', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), .3, { from: 'left' });
        const app = P.box({ x: 500, y: 250, w: 260, h: 150, label: '앱 · 크롬 확장', sub: '도구를 실제로 실행해요', accent: 'aqua', icon: P.ICON.plug });
        tl.at(stage.appendChild(app.el), 1.2, { from: 'up' });
        const tools = [['화면 보기', P.ICON.eye], ['클릭', P.ICON.click], ['글자 입력', P.ICON.key]].map(([l, ic], i) => {
          const b = P.box({ x: 900, y: 150 + i * 150, w: 260, h: 110, label: l, sub: '', accent: 'orange', icon: ic });
          tl.at(stage.appendChild(b.el), 2 + i * .5, { from: 'right' }); return b;
        });
        const call = P.arrow(lines, { x1: 350, y1: 300, x2: 500, y2: 300, color: '#F2812D', width: 5 });
        const ret = P.arrow(lines, { x1: 500, y1: 350, x2: 350, y2: 350, color: '#127E90', width: 5 });
        const toTools = tools.map((_, i) => P.arrow(lines, { x1: 760, y1: 325, x2: 900, y2: 205 + i * 150, color: '#1B1F24', width: 3, curve: 10 }));
        const lblCall = P.text({ x: 340, y: 205, w: 180, text: '도구 호출', size: 18, weight: 700, align: 'center', color: '#B3520F' });
        const lblRet = P.text({ x: 340, y: 365, w: 180, text: '결과 돌려주기', size: 18, weight: 700, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(lblCall.el), 5.2, { from: 'up', dist: 10 });
        tl.at(stage.appendChild(lblRet.el), 9.7, { from: 'down', dist: 10 });
        const q = P.quokka({ x: 40, y: 430, size: 270, pose: 'base' });
        stage.append(q.el);
        const b = P.bubble({ x: 250, y: 470, w: 560, text: '"화면 찍어 줘" → (스크린샷) → "저장 버튼이 오른쪽 위에 있네, 눌러야지"', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            call.draw(P.clamp((t - 5) / .7, 0, 1));
            toTools.forEach((a, i) => a.draw(P.clamp((t - 6 - i * .4) / .6, 0, 1)));
            ret.draw(P.clamp((t - 9.5) / .7, 0, 1));
            tools.forEach((tb, i) => tb.on(t > 6.5 + i * .4 && t < 9.5));
          }
        };
      }
    },
    {
      title: 'MCP는 연결 규격', dur: 13,
      captions: [
        { t: 0, text: '도구가 많아지면 골치 아파요. AI 앱마다, 도구마다 <em>연결 방식이 제각각</em>이었거든요.' },
        { t: 4.5, text: 'MCP(Model Context Protocol)는 AI 앱과 도구를 잇는 <em>공개 표준 규격</em>이에요. 공식 문서 표현으로는 AI의 USB-C 단자.' },
        { t: 9.5, text: '규격이 같으면 도구를 한 번 만들어 여러 AI 앱에 <em>꽂아</em> 쓸 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const apps = ['Claude', 'ChatGPT', 'VS Code'].map((l, i) => { const b = P.box({ x: 90, y: 150 + i * 150, w: 240, h: 110, label: l, sub: 'AI 앱(호스트)', accent: 'ink' }); tl.at(stage.appendChild(b.el), .3 + i * .3, { from: 'left' }); return b; });
        const tools = ['브라우저', '캘린더', '파일'].map((l, i) => { const b = P.box({ x: 950, y: 150 + i * 150, w: 240, h: 110, label: l, sub: '도구(서버)', accent: 'orange' }); tl.at(stage.appendChild(b.el), .6 + i * .3, { from: 'right' }); return b; });
        /* 제각각 연결선 */
        const messy = [];
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) messy.push(P.arrow(lines, { x1: 330, y1: 205 + i * 150, x2: 950, y2: 205 + j * 150, color: '#9AA5AF', width: 2, dashed: true, head: false, curve: (i - j) * 30 }));
        const mcp = P.box({ x: 520, y: 260, w: 240, h: 200, label: 'MCP', sub: '표준 연결 규격<br>"AI의 USB-C"', accent: 'aqua', icon: P.ICON.plug });
        tl.at(stage.appendChild(mcp.el), 4.6, { from: 'pop' });
        const left = apps.map((_, i) => P.arrow(lines, { x1: 330, y1: 205 + i * 150, x2: 520, y2: 360, color: '#127E90', width: 4, head: false }));
        const right = tools.map((_, i) => P.arrow(lines, { x1: 760, y1: 360, x2: 950, y2: 205 + i * 150, color: '#127E90', width: 4 }));
        const note = P.text({ x: 360, y: 612, w: 560, text: '한 번 만든 도구, 여러 앱에 꽂기', size: 26, weight: 800, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        const q = P.quokka({ x: 800, y: 478, size: 180, pose: 'globe' });
        tl.at(stage.appendChild(q.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            messy.forEach((m, i) => { m.draw(P.clamp((t - 1.2 - i * .12) / .5, 0, 1)); m.el.style.opacity = t > 4.6 ? P.clamp(1 - (t - 4.6) / .6, 0, 1) : m.el.style.opacity; });
            left.forEach((a, i) => a.draw(P.clamp((t - 5.4 - i * .25) / .6, 0, 1)));
            right.forEach((a, i) => a.draw(P.clamp((t - 6.2 - i * .25) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '멈추는 지점이 있어요', dur: 14,
      captions: [
        { t: 0, text: '에이전트는 <em>우리가 준 권한</em> 안에서만 움직여요. 파일 저장 창을 <em>사람이 눌러야</em> 했던 것도 그래서예요.' },
        { t: 5.5, text: '일을 시킬 땐 <em>목표, 범위, 예산, 멈출 조건</em>을 적어 줘요. 이 사이트를 만든 프롬프트도 그렇게 썼어요.' },
        { t: 10.5, text: 'AI가 제멋대로 컴퓨터를 조종하는 게 아니라, 우리가 그어 둔 선 안에서 도는 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const steps = ['화면 보기', '대본 붙여넣기', '자막 생성', '내보내기 클릭'].map((l, i) => { const b = P.box({ x: 80 + i * 250, y: 130, w: 220, h: 90, label: l, accent: i === 3 ? 'aqua' : '' }); tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' }); return b; });
        const ars = steps.slice(1).map((_, i) => P.arrow(lines, { x1: 300 + i * 250, y1: 175, x2: 330 + i * 250, y2: 175, width: 4, color: '#1B1F24' }));
        const gate = P.box({ x: 440, y: 290, w: 400, h: 120, label: '파일 저장 창', sub: '사람 승인 필요 → 멈춤', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(gate.el), 3, { from: 'pop' });
        const down = P.arrow(lines, { x1: 640, y1: 220, x2: 640, y2: 290, width: 4, color: '#F2812D' });
        const q = P.quokka({ x: 60, y: 420, size: 280, pose: 'point' });
        tl.at(stage.appendChild(q.el), 5.4, { from: 'up' });
        const chips = ['목표', '범위', '예산', '멈출 조건'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 290 + i * 200, y: 470, text: c, color: i % 2 ? 'orange' : 'aqua', size: 26 }).el), 6 + i * .5, { from: 'pop' }));
        const sub = P.text({ x: 290, y: 540, w: 900, text: '"영상 6편 · 이 폴더만 · 크레딧 100 이하 · 저장 창이 뜨면 멈추기"', size: 24, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(sub.el), 8.2, { from: 'up' });
        const last = P.text({ x: 290, y: 610, w: 900, text: '우리가 그어 둔 <i>선</i> 안에서, 목표에 닿을 때까지 돌아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(last.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5.4);
            ars.forEach((a, i) => a.draw(P.clamp((t - .9 - i * .5) / .5, 0, 1)));
            down.draw(P.clamp((t - 2.6) / .5, 0, 1));
            steps.forEach((s, i) => s.on(t > .9 + i * .5 && t < 3));
            gate.on(t > 3 && t < 5.5 && Math.floor(t * 2) % 2 === 0);
          }
        };
      }
    }
  ],

  interaction: {
    title: '에이전트 루프 시뮬레이터',
    desc: '목표를 고르고 <b>다음 단계</b>를 눌러 보세요. 계획, 도구, 관찰이 한 걸음씩 진행되다가 사람 승인이 필요한 자리에서 멈춰요. 예산(최대 단계 수)을 넘겨도 멈추고요.',
    mount(el, P) {
      const GOALS = {
        vrew: {
          label: '영상 편집 사이트에서 영상 1편', budget: 8,
          steps: [
            { tool: '화면 보기', obs: '편집 사이트 첫 화면. "새로 만들기" 버튼이 보여요.' },
            { tool: '클릭 · 새로 만들기', obs: '텍스트 입력창이 열렸어요.' },
            { tool: '글자 입력 · 대본 붙여넣기', obs: '대본 12줄이 들어갔어요.' },
            { tool: '클릭 · AI 이미지 생성', obs: '장면 4개에 이미지가 붙었어요. 1장에 글자가 뭉개져 있어요.' },
            { tool: '클릭 · 이미지 다시 생성(장면 2)', obs: '이번엔 글자가 없는 그림으로 바뀌었어요.' },
            { tool: '클릭 · 내보내기', obs: '파일 저장 창이 떴어요.', gate: '파일 저장' },
            { tool: '(사람이 저장 버튼 클릭)', obs: 'video1.mp4 저장 완료.' }
          ],
          done: '목표 달성: 영상 1편이 저장됐어요.'
        },
        folder: {
          label: '연수 자료 폴더 정리', budget: 6,
          steps: [
            { tool: '폴더 목록 읽기', obs: '파일 23개. 이름이 뒤죽박죽이에요.' },
            { tool: '이름 규칙 세우기', obs: '"날짜_주제_버전" 규칙으로 정했어요.' },
            { tool: '파일 이름 바꾸기(복사본)', obs: '23개 복사본 이름 변경 완료. 원본은 그대로예요.' },
            { tool: '원본 파일 삭제', obs: '삭제는 되돌릴 수 없어요.', gate: '파일 삭제' },
            { tool: '(사람이 확인 후 승인)', obs: '원본 23개 삭제. 정리 끝.' }
          ],
          done: '목표 달성: 폴더가 규칙대로 정리됐어요.'
        },
        letter: {
          label: '학급 안내문 초안 쓰기', budget: 5,
          steps: [
            { tool: '지난 안내문 읽기', obs: '작년 현장체험학습 안내문 형식을 찾았어요.' },
            { tool: '초안 작성', obs: '날짜·장소·준비물이 들어간 초안 완성.' },
            { tool: '날짜 확인(학사일정 읽기)', obs: '초안의 날짜가 학사일정과 하루 달라요. 고쳤어요.' },
            { tool: '학부모에게 메일 발송', obs: '보내면 되돌릴 수 없어요.', gate: '메일 보내기' },
            { tool: '(사람이 검토 후 승인)', obs: '발송 완료.' }
          ],
          done: '목표 달성: 안내문이 나갔어요. 발송 전 사람이 읽은 게 핵심이에요.'
        }
      };
      let goal = 'vrew', i = 0, waiting = false, log = [];
      const sel = P.h('div', { class: 'sim-goals', role: 'radiogroup', 'aria-label': '목표 고르기' });
      const stepBtn = P.h('button', { class: 'btn primary', type: 'button' }, '다음 단계');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');
      const okBtn = P.h('button', { class: 'btn orange', type: 'button', hidden: '' }, '승인');
      const noBtn = P.h('button', { class: 'btn', type: 'button', hidden: '' }, '거부');
      const meter = P.h('div', { class: 'sim-meter' });
      const list = P.h('ol', { class: 'sim-log', 'aria-live': 'polite' });
      const status = P.h('p', { class: 'sim-status' });
      el.append(sel, P.h('div', { class: 'sim-bar' }, stepBtn, okBtn, noBtn, resetBtn, meter), list, status);
      const style = P.h('style', { html: `
        .sim-goals{display:flex;gap:8px;flex-wrap:wrap}
        .sim-goals button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-weight:700;font-size:13.5px;background:#fff;color:var(--muted)}
        .sim-goals button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:16px}
        .sim-meter{margin-left:auto;font-family:var(--mono);font-size:12.5px;color:var(--muted)}
        .sim-log{list-style:none;margin-top:16px;display:grid;gap:8px}
        .sim-log li{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:var(--paper);font-size:14.5px;line-height:1.5}
        .sim-log li b{display:block}
        .sim-log li .k{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:800;color:#fff;background:var(--aqua)}
        .sim-log li.gate{border-color:var(--orange);background:var(--orange-pale)}
        .sim-log li.gate .k{background:var(--orange)}
        .sim-log li.plan .k{background:var(--ink)}
        .sim-log li .o{color:var(--muted)}
        .sim-status{margin-top:14px;font-weight:700;min-height:1.5em}
      ` });
      el.append(style);
      const render = () => {
        const g = GOALS[goal];
        sel.replaceChildren(...Object.entries(GOALS).map(([k, v]) => { const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': k === goal ? 'true' : 'false' }, v.label); b.addEventListener('click', () => { goal = k; reset(); }); return b; }));
        meter.textContent = `단계 ${Math.min(i, g.budget)} / 예산 ${g.budget}`;
        list.replaceChildren(...log.map(item => P.h('li', { class: item.cls }, P.h('span', { class: 'k' }, item.k), P.h('span', {}, P.h('b', {}, item.t), P.h('span', { class: 'o' }, item.o)))));
        okBtn.hidden = noBtn.hidden = !waiting; stepBtn.hidden = waiting;
      };
      const reset = () => { i = 0; waiting = false; log = [{ cls: 'plan', k: '계획', t: `목표: ${GOALS[goal].label}`, o: `예산 ${GOALS[goal].budget}단계 · 승인 관문에서 멈춤 · 되돌릴 수 없는 일은 사람에게` }]; status.textContent = ''; stepBtn.disabled = false; render(); };
      const step = () => {
        const g = GOALS[goal];
        if (i >= g.steps.length) { status.textContent = g.done; stepBtn.disabled = true; render(); return; }
        if (i >= g.budget) { status.textContent = `예산 ${g.budget}단계를 다 썼어요. 멈추고 사람에게 보고해요.`; stepBtn.disabled = true; render(); return; }
        const st = g.steps[i];
        if (st.gate) { waiting = true; log.push({ cls: 'gate', k: '멈춤', t: `${st.tool} → 관문: ${st.gate}`, o: `${st.obs} 사람의 승인을 기다려요.` }); status.textContent = '승인하면 계속, 거부하면 다른 길을 찾거나 멈춰요.'; render(); return; }
        log.push({ cls: '', k: String(i + 1), t: `도구: ${st.tool}`, o: `관찰: ${st.obs}` }); i++;
        if (i >= g.steps.length) status.textContent = g.done;
        render();
      };
      stepBtn.addEventListener('click', step);
      okBtn.addEventListener('click', () => { const g = GOALS[goal]; waiting = false; log.push({ cls: '', k: '승인', t: '사람이 승인했어요', o: g.steps[i].obs }); i += 2; if (i > g.steps.length) i = g.steps.length; status.textContent = i >= g.steps.length ? g.done : ''; if (i >= g.steps.length) stepBtn.disabled = true; render(); });
      noBtn.addEventListener('click', () => { waiting = false; log.push({ cls: 'gate', k: '거부', t: '사람이 거부했어요', o: '되돌릴 수 없는 일은 하지 않고, 여기까지 한 결과를 정리해 보고해요.' }); status.textContent = '멈춤. 지금까지의 결과만 남기고 끝났어요.'; stepBtn.disabled = true; render(); });
      resetBtn.addEventListener('click', reset);
      reset();
    }
  },

  teacherLines: [
    'AI 에이전트는 로봇 청소기 같아요. 목표를 주면 스스로 움직이지만, <b>우리가 정한 방 안에서만</b> 움직여요.',
    'AI가 뭔가를 대신 눌러 준다면, 어디까지 눌러도 되는지 정하는 건 <b>사람 몫</b>이에요.'
  ],
  tip: {
    body: '에이전트한테 일을 시킬 땐 <b>목표, 범위, 예산, 멈출 조건</b>을 적어 줘요. "이 폴더만", "크레딧 100 이하", "저장 창이 뜨면 멈추기"처럼요. 이 사이트를 만든 프롬프트도 그렇게 썼어요.',
    extra: '삭제, 발송, 결제처럼 되돌릴 수 없는 일은 마지막 버튼을 사람이 누르게 두세요.'
  },
  myth: {
    myth: 'AI가 컴퓨터를 마음대로 조종한다.',
    fact: '권한을 준 만큼만 움직이고, 중간중간 사람이 승인하는 자리가 있어요. 파일 저장 창을 사람이 눌러야 했던 것처럼요.'
  },
  sources: [
    { title: 'Model Context Protocol — 공식 소개 (modelcontextprotocol.io)', url: 'https://modelcontextprotocol.io/docs/getting-started/intro', note: '"AI 앱을 외부 시스템에 연결하는 오픈 표준", USB-C 비유가 여기서 나와요.' },
    { title: 'MCP Architecture overview — 호스트·클라이언트·서버, 도구·리소스·프롬프트', url: 'https://modelcontextprotocol.io/docs/learn/architecture', note: '도구(tools)는 AI 앱이 부를 수 있는 실행 함수라고 정의해요.' },
    { title: 'Tool use with Claude — Claude Developer Platform 문서', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', note: '모델이 도구 호출을 정하고, 앱이 실행해 결과를 돌려주는 왕복 과정.' },
    { title: 'Building effective agents — Anthropic Engineering (2024)', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: '에이전트는 도구 결과를 보며 스스로 다음 행동을 정하고, 관문에서 사람의 피드백을 받아요.' }
  ],
  script: `
AI한테 "영상 여섯 편 만들어 줘" 한 줄 써 놓고 커피 마시고 왔어요. 돌아오니 크롬 확장이 영상 편집 사이트를 혼자 눌러서 여섯 편을 다 만들어 놨더라고요. 제가 손댄 건 파일 저장 창 하나였어요.

이게 되는 건 에이전트라는 구조 덕분이에요. 한 방에 답을 내는 게 아니라 계획을 세우고, 도구를 쓰고, 결과를 보고, 다음 행동을 정하는 고리를 돌아요. 도구는 "화면 찍어 줘", "여기 눌러 줘" 같은 함수고요. 어떤 도구를 쓸지는 모델이 정하고, 실제로 누르는 건 앱이에요.

도구가 많아지면 연결 방식이 제각각이라 곤란해지죠. 그래서 나온 게 MCP, 공개 표준 연결 규격이에요. 공식 문서는 AI의 USB-C라고 불러요. 한 번 만든 도구를 여러 AI 앱에 꽂을 수 있어요.

하나만 기억하면 돼요. 에이전트는 우리가 준 권한 안에서만 움직이고, 되돌릴 수 없는 일은 사람이 눌러요. 그러니 시킬 땐 목표, 범위, 예산, 멈출 조건을 적어 주세요. 로봇 청소기한테 방 문을 닫아 주는 것과 같아요.
`
};
