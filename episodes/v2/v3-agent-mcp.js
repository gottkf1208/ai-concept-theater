/* S3-17 AI는 어떻게 다른 프로그램을 직접 쓸까: 에이전트 루프와 MCP */
export default {
  slug: 'v3-agent-mcp',
  track: 'S3',
  title: 'AI는 어떻게 다른 프로그램을 직접 쓸까',
  subtitle: '에이전트 루프와 MCP',
  summary: 'AI가 파일을 읽고 캘린더에 일정을 넣는 건 "도구 목록"을 보고 고른 뒤 앱에 실행을 맡기기 때문이에요. 계획·도구·관찰로 도는 에이전트 루프와, AI 앱과 프로그램을 잇는 공개 규격 MCP가 2025년 말 리눅스 재단 산하로 옮겨 간 이야기까지.',
  keywords: ['에이전트', 'agent', '에이전트 루프', 'MCP', 'Model Context Protocol', '도구', 'tools/call', '호스트', '서버', 'AAIF', '리눅스 재단', '승인'],

  scenes: [
    {
      title: '연수 일정, AI가 등록했어요', dur: 13,
      captions: [
        { t: 0, text: '"연수 안내 PDF 읽고 일정을 캘린더에 넣어 줘"라고 했어요.' },
        { t: 5, text: 'AI가 <em>파일 읽기</em> 도구로 PDF를 열고, <em>캘린더 등록</em> 도구를 세 번 불렀어요.' },
        { t: 9.5, text: '"참석자에게 초대 보내기" 앞에서는 멈추고 저한테 물어봐요. 어떻게 다른 프로그램을 직접 썼을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '연수 안내 PDF 읽고 일정을 <b>캘린더</b>에 넣어 줘', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const steps = [
          ['파일 읽기', 'PDF 열기', 'ink', P.ICON.doc],
          ['캘린더 등록 ×3', '일정 넣기', 'aqua', P.ICON.save],
          ['초대 보내기', '멈춤 · 승인 대기', 'orange', P.ICON.x]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 330 + i * 300, y: 230, w: 270, h: 140, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), 4.6 + i * 1.6, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 420, text: '어떻게 다른 프로그램을 직접 썼을까?', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.7, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            steps.forEach((b, i) => b.on(t > 4.6 + i * 1.6));
          }
        };
      }
    },
    {
      title: '에이전트의 고리', dur: 14,
      captions: [
        { t: 0, text: '요청 → <em>계획</em> → <em>도구 호출</em> → <em>결과 관찰</em> → 다음 행동. 이렇게 도는 걸 <em>에이전트 루프</em>라고 해요.' },
        { t: 6, text: '단계마다 도구가 돌려준 실제 결과를 보고 다음 행동을 고쳐 가요.' },
        { t: 10.5, text: '목표를 이루거나 <em>최대 반복 횟수</em>에 닿으면 멈춰요. 2024년 말 공개된 에이전트 설계 안내에 나온 방식이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const nodes = [
          ['요청', ''], ['계획', ''], ['도구 호출', ''], ['결과 관찰', '']
        ].map(([label], i) => {
          const b = P.box({ x: 340 + i * 220, y: 110, w: 190, h: 110, label, accent: i === 2 ? 'aqua' : 'ink' });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 530 + i * 220, y1: 165, x2: 560 + i * 220, y2: 165, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1120, y1: 230, x2: 400, y2: 240, curve: 90, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 620, y: 290, text: '결과를 보고 다음 행동을 다시 정해요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(loopLab.el), 5.6, { from: 'pop' });
        const stop = P.box({ x: 600, y: 400, w: 400, h: 110, label: '멈춤 조건', sub: '목표 달성 또는 최대 반복 횟수', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(stop.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.1 + i * .8)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.8) / .9, 0, 1));
            nodes.forEach((b, i) => b.on(t > .3 + i * .8));
            stop.on(t > 10.6);
          }
        };
      }
    },
    {
      title: '도구는 이름표 붙은 함수', dur: 13,
      captions: [
        { t: 0, text: '도구마다 <em>이름</em>·<em>설명</em>·<em>입력 형식</em>(JSON 스키마)이 붙어 있어요.' },
        { t: 5, text: 'AI는 설명을 읽고 "이 도구를 이 값으로 불러 줘"라는 <em>구조화된 호출문</em>을 써요. 실제 실행은 앱이 해요.' },
        { t: 9.5, text: '결과가 대화로 돌아와서 다음 행동으로 이어져요. 호출 내용 자체는 다른 편에서 더 자세히 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const card = P.box({ x: 330, y: 100, w: 400, h: 220, label: '도구 정의', sub: 'name: create_event<br>description: 일정 등록<br>inputSchema: 날짜·제목', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(card.el), .3, { from: 'up' });
        const call = P.box({ x: 790, y: 130, w: 320, h: 150, label: '구조화된 호출문', sub: '"이 도구를 이 값으로 불러 줘"', accent: 'aqua', icon: P.ICON.click });
        tl.at(stage.appendChild(call.el), 5.3, { from: 'right' });
        const arrow = P.arrow(lines, { x1: 735, y1: 205, x2: 785, y2: 205, width: 4, color: '#1B1F24' });
        const exec = P.chip({ x: 790, y: 310, text: '실제 실행은 앱이 해요', color: 'gray', size: 20 });
        tl.at(stage.appendChild(exec.el), 7.2, { from: 'pop' });
        const final = P.text({ x: 330, y: 400, w: 780, text: '결과가 대화로 돌아와 <em>다음 행동</em>으로 이어져요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            card.on(t > .3); call.on(t > 5.3);
            arrow.draw(P.clamp((t - 5.6) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: 'MCP는 공통 단자', dur: 14,
      captions: [
        { t: 0, text: '예전엔 AI 앱과 프로그램을 잇는 코드를 짝마다 따로 짰어요. <em>MCP</em>는 이 연결 방식을 맞춘 공개 표준이에요.' },
        { t: 5.5, text: '호스트(AI 앱)가 서버마다 <em>클라이언트</em>를 하나씩 붙이고, 서버는 도구·리소스·프롬프트를 내놔요.' },
        { t: 10, text: '앱은 <em>tools/list</em>로 목록을 받고 <em>tools/call</em>로 실행해요. 공식 문서는 이걸 "AI 앱의 USB-C 단자"라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'base' });
        stage.append(q.el);
        const host = P.box({ x: 320, y: 140, w: 260, h: 130, label: 'MCP 호스트', sub: 'AI 앱', accent: 'ink', icon: P.ICON.desk });
        tl.at(stage.appendChild(host.el), .3, { from: 'up' });
        const servers = [
          ['파일 서버', 'read_file'], ['캘린더 서버', 'create_event'], ['메일 서버', 'send_mail']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 780, y: 60 + i * 150, w: 300, h: 120, label, sub, accent: 'aqua', icon: P.ICON.plug });
          tl.at(stage.appendChild(b.el), 5.8 + i * .7, { from: 'right' });
          return b;
        });
        const arrows = servers.map((_, i) => P.arrow(lines, { x1: 585, y1: 205, x2: 775, y2: 120 + i * 150, curve: 10, width: 3, color: '#1B1F24' }));
        const lab = P.chip({ x: 320, y: 320, text: 'tools/list → 목록 받기, tools/call → 실행', color: 'orange', size: 20 });
        tl.at(stage.appendChild(lab.el), 10.2, { from: 'pop' });
        const usb = P.text({ x: 320, y: 400, w: 700, text: '공식 문서 비유: <i>"AI 앱의 USB-C 단자"</i>.', size: 26, weight: 700 });
        tl.at(stage.appendChild(usb.el), 11.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5);
            host.on(t > .3);
            servers.forEach((b, i) => b.on(t > 5.8 + i * .7));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (6.2 + i * .7)) / .6, 0, 1)));
          }
        };
      }
    },
    {
      title: '누가 관리하고, 어디서 멈추나', dur: 13,
      captions: [
        { t: 0, text: '2025년 12월 MCP는 <em>리눅스 재단</em> 산하 Agentic AI Foundation으로 옮겨 갔어요(공동 설립 Anthropic·Block·OpenAI).' },
        { t: 5, text: '최신 사양은 2026년 7월 28일판이고, "도구를 실행하기 전 <em>사용자 명시 동의</em>"를 요구해요.' },
        { t: 9, text: '믿을 수 없는 서버가 내놓은 도구 설명은 그대로 믿지 말라고도 해요. 그래서 연결은 필요한 것만, 실행은 사람이 승인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 중립 관리', '2025-12, 리눅스 재단 산하 AAIF'],
          ['② 최신 사양', '2026-07-28판'],
          ['③ 실행 전 동의', '사용자가 명시적으로 승인'],
          ['④ 서버 설명 의심', '믿을 수 없는 서버는 그대로 믿지 않기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 2 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '연결은 <em>필요한 것만</em>, 실행은 <em>사람이 승인</em>해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.8);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: 'MCP 연결판',
    desc: '왼쪽은 <b>AI 앱(호스트)</b>, 오른쪽은 <b>MCP 서버</b> 3개예요. 연결할 서버를 고르고 요청을 선택한 뒤 "실행"을 눌러 보세요. 쓰기 도구(캘린더 등록·메일 보내기)는 <b>승인 관문</b>에서 멈춰요. 필요한 서버가 연결 안 돼 있으면 사람에게 물어봐요.',
    mount(el, P) {
      const SERVERS = [
        { id: 'file', label: '파일 서버', tool: 'read_file', write: false },
        { id: 'cal', label: '캘린더 서버', tool: 'create_event', write: true },
        { id: 'mail', label: '메일 서버', tool: 'send_mail', write: true }
      ];
      const REQUESTS = [
        { id: 'cal', label: '연수 PDF 일정 캘린더에 넣기', need: ['file', 'cal'], steps: [
          { tool: 'read_file', write: false },
          { tool: 'create_event', write: true },
          { tool: 'create_event', write: true },
          { tool: 'create_event', write: true }
        ] },
        { id: 'sum', label: '이번 주 일정 요약', need: ['cal'], steps: [
          { tool: 'list_events', write: false }
        ] },
        { id: 'mail', label: '학부모에게 안내 메일 보내기', need: ['mail'], steps: [
          { tool: 'send_mail', write: true }
        ] }
      ];
      const connected = new Set(['file', 'cal', 'mail']);
      let reqId = 'cal';
      let approvals = {};
      let ran = false;

      const host = P.h('div', { class: 'sim-host' }, P.h('div', { class: 'sim-host-h' }, 'MCP 호스트 · AI 앱'), P.h('div', { class: 'sim-host-sub' }, '연결된 서버의 도구만 쓸 수 있어요'));
      const serverEls = SERVERS.map(s => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-srv-${s.id}`, checked: true });
        const lab = P.h('label', { for: `sim-srv-${s.id}` }, P.h('b', {}, s.label), P.h('span', { class: 'sim-srv-tool' }, s.tool));
        const row = P.h('div', { class: 'sim-srv' }, cb, lab);
        cb.addEventListener('change', () => { if (cb.checked) connected.add(s.id); else connected.delete(s.id); ran = false; render(); });
        return { ...s, cb, row };
      });
      const reqSel = P.h('select', { id: 'sim-req' }, ...REQUESTS.map(r => P.h('option', { value: r.id }, r.label)));
      reqSel.value = reqId;
      reqSel.addEventListener('change', () => { reqId = reqSel.value; approvals = {}; ran = false; render(); });
      const reqLab = P.h('label', { for: 'sim-req', class: 'sim-req-l' }, '요청');
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '실행');
      const log = P.h('div', { class: 'sim-log' });
      const counter = P.h('div', { class: 'sim-counter' }, '');

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-top' }, reqLab, reqSel, runBtn),
        P.h('div', { class: 'sim-cols' },
          host,
          P.h('div', { class: 'sim-servers' }, ...serverEls.map(s => s.row))
        ),
        counter,
        log
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-req-l{font-size:13px;color:var(--muted)}
        .sim-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:100%}
        @media (max-width:540px){.sim-cols{grid-template-columns:1fr}}
        .sim-host{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
        .sim-host-h{font-weight:700;margin-bottom:6px}
        .sim-host-sub{font-size:13px;color:var(--muted)}
        .sim-servers{display:flex;flex-direction:column;gap:8px}
        .sim-srv{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff}
        .sim-srv label{display:flex;flex-direction:column;gap:2px;font-size:13px}
        .sim-srv-tool{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-counter{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-log{display:flex;flex-direction:column;gap:8px;min-height:40px}
        .sim-step{border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:13px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .sim-step.gate{border-color:var(--acc2);background:#fff7ef}
        .sim-step.blocked{border-color:#9AA5AF;background:#f4f4f4}
        .sim-mono{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-gate-btns{display:flex;gap:6px}
        .sim-gate-btns button{font-size:12px;padding:4px 10px}
      ` }));

      function renderLog() {
        const req = REQUESTS.find(r => r.id === reqId);
        const missing = req.need.filter(id => !connected.has(id));
        log.innerHTML = '';
        if (missing.length) {
          const names = missing.map(id => SERVERS.find(s => s.id === id).label).join(', ');
          log.append(P.h('div', { class: 'sim-step blocked' }, `쓸 수 있는 도구가 없어요 (${names} 연결 꺼짐) → 사람에게 질문`));
          counter.textContent = '단계 0 / 최대 8';
          return;
        }
        const listed = SERVERS.filter(s => connected.has(s.id)).map(s => s.tool).join(', ');
        log.append(P.h('div', { class: 'sim-step' }, P.h('span', {}, '① tools/list'), P.h('span', { class: 'sim-mono' }, listed)));
        let n = 1;
        for (let i = 0; i < req.steps.length; i++) {
          const st = req.steps[i];
          n++;
          const preview = `{"name":"${st.tool}","arguments":{...}}`;
          log.append(P.h('div', { class: 'sim-step' }, P.h('span', {}, '② 호출 미리보기'), P.h('span', { class: 'sim-mono' }, preview)));
          if (st.write) {
            const key = `${reqId}-${i}`;
            const approved = approvals[key];
            if (approved === undefined) {
              const ok = P.h('button', { class: 'btn primary', type: 'button' }, '승인');
              const no = P.h('button', { class: 'btn', type: 'button' }, '거부');
              ok.addEventListener('click', () => { approvals[key] = true; renderLog(); });
              no.addEventListener('click', () => { approvals[key] = false; renderLog(); });
              log.append(P.h('div', { class: 'sim-step gate' }, P.h('span', {}, `쓰기 도구 ${st.tool} → 승인 관문`), P.h('div', { class: 'sim-gate-btns' }, ok, no)));
              counter.textContent = `단계 ${Math.min(n, 8)} / 최대 8`;
              return;
            }
            if (approved === false) {
              log.append(P.h('div', { class: 'sim-step blocked' }, `${st.tool} 거부됨 → 다음 행동으로`));
              n++;
              continue;
            }
          }
          log.append(P.h('div', { class: 'sim-step' }, `③ 결과 관찰 · ${st.tool} 완료`));
          n++;
        }
        log.append(P.h('div', { class: 'sim-step' }, '④ 다음 행동 · 완료'));
        counter.textContent = `단계 ${Math.min(n, 8)} / 최대 8`;
      }
      function render() {
        if (!ran) {
          log.innerHTML = '';
          log.append(P.h('div', { class: 'sim-step' }, '실행을 누르면 단계가 쌓여요. 연결·요청을 먼저 골라 보세요.'));
          counter.textContent = '단계 0 / 최대 8';
          return;
        }
        renderLog();
      }
      runBtn.addEventListener('click', () => { ran = true; renderLog(); });
      render();
    }
  },

  teacherLines: [
    'AI가 다른 프로그램을 쓸 때는 <b>도구 목록</b>을 보고 하나를 고른 다음, 앱에 대신 실행해 달라고 부탁해요.',
    'MCP는 AI와 프로그램을 잇는 <b>공통 단자</b>예요. 우리가 꽂아 준 것만 쓸 수 있어요.'
  ],
  tip: {
    body: '커넥터(MCP 서버)는 <b>필요한 것만</b> 연결하고, 일정 등록·메일 보내기처럼 바깥에 흔적이 남는 도구는 <b>실행 전 승인</b>을 켜 두세요.',
    extra: '처음 연결하는 서버는 도구 목록(이름과 설명)을 먼저 열어 보고 무엇을 할 수 있는지 확인해요. 사양도 믿을 수 없는 서버의 도구 설명은 그대로 믿지 말라고 해요.'
  },
  myth: {
    myth: 'MCP는 한 회사의 전용 기능이다.',
    fact: '공개 사양이에요. 2025년 12월부터는 리눅스 재단 산하 Agentic AI Foundation이 맡아 어느 한 회사에 치우치지 않게 관리해요. 여러 회사의 AI 앱이 같은 규격으로 도구를 연결해요.'
  },
  sources: [
    { title: 'Model Context Protocol — What is MCP?', url: 'https://modelcontextprotocol.io/docs/getting-started/intro', note: '공식 정의, "AI 앱의 USB-C 단자" 비유.' },
    { title: 'MCP Architecture overview', url: 'https://modelcontextprotocol.io/docs/learn/architecture', note: '호스트·클라이언트·서버 구조, tools/list·tools/call, 사양 2026-07-28 기준.' },
    { title: 'Anthropic — Donating the Model Context Protocol and establishing the Agentic AI Foundation', url: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation', note: '2025-12-09, AAIF는 리눅스 재단 산하 directed fund, Anthropic·Block·OpenAI 공동 설립.' },
    { title: 'Anthropic Engineering — Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: '2024-12-19, 에이전트는 매 단계 환경의 결과를 보고 다음 행동을 스스로 정한다는 정의.' }
  ],
  script: `연수 안내 PDF를 주고 "읽고 일정을 캘린더에 넣어 줘"라고 한 적이 있어요. AI가 파일 읽기 도구로 PDF를 열고, 캘린더 등록 도구를 세 번 불러서 일정을 넣었어요. 그런데 "참석자에게 초대 보내기" 앞에서는 멈추고 저한테 물어봤어요. 어떻게 다른 프로그램을 직접 썼을까요.

AI가 이렇게 일하는 방식을 에이전트 루프라고 해요. 요청이 들어오면 계획을 세우고, 도구를 부르고, 그 결과를 관찰해서 다음 행동을 고쳐 가요. 목표를 이루거나 최대 반복 횟수에 닿으면 멈춰요. 도구는 이름표 붙은 함수예요. 이름·설명·입력 형식이 정해져 있고, AI는 설명을 읽고 구조화된 호출문을 쓰기만 해요. 실제 실행은 앱이 맡아요.

예전엔 AI 앱과 프로그램을 잇는 코드를 짝마다 따로 짰는데, MCP는 이걸 공개 표준으로 만들었어요. 호스트인 AI 앱이 서버마다 클라이언트를 하나씩 붙이고, 서버는 도구·리소스·프롬프트를 내놓고, 앱은 tools/list로 목록을 받아 tools/call로 실행해요. 공식 문서는 이걸 AI 앱의 USB-C 단자라고 불러요. 2025년 12월에는 Anthropic·Block·OpenAI가 함께 세운 리눅스 재단 산하 Agentic AI Foundation으로 옮겨 갔고, 최신 사양은 2026년 7월 28일판이에요. 사양은 도구를 실행하기 전 사용자의 명시적 동의를 요구하고, 믿을 수 없는 서버의 도구 설명은 그대로 믿지 말라고 해요. 그래서 연결은 필요한 것만, 실행은 사람이 승인하는 게 안전해요.`
};
