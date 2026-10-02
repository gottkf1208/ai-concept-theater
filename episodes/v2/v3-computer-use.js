/* S3-18 [트랙 S3] 컴퓨터를 쓰는 AI, 어디까지 믿을까: 컴퓨터 사용 에이전트와 승인 설계 */
export default {
  slug: 'v3-computer-use',
  track: 'S3',
  title: '컴퓨터를 쓰는 AI, 어디까지 믿을까',
  subtitle: '컴퓨터 사용 에이전트와 승인 설계',
  summary: '화면을 찍어 보고, 좌표를 골라 누르고, 다시 찍어 보는 AI. 사람처럼 화면을 줄곧 지켜보지 않고, 사진을 한 장씩 보며 다음 행동을 정해요. 얼마나 잘하는지, 어디서 사람이 승인해야 하는지까지.',
  keywords: ['컴퓨터 사용', 'computer use', '브라우저 에이전트', '스크린샷', '좌표', 'OSWorld', '승인', 'human-in-the-loop', '샌드박스', '허용 목록'],

  scenes: [
    {
      title: '신청서, AI가 입력했어요', dur: 13,
      captions: [
        { t: 0, text: '방과후 신청 명단을 사이트에 넣어 달라고 했더니, AI가 칸을 하나씩 눌러 채워 나갔어요.' },
        { t: 5, text: '이름, 학년, 반... 칸마다 클릭하고 입력하다가 <em>제출</em> 버튼 앞에서 멈췄어요.' },
        { t: 9.3, text: '화면을 어떻게 보고, 어디를 누르는 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '방과후 신청 명단, 여기 칸에 넣어 줘', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const fillBox = P.box({ x: 330, y: 230, w: 420, h: 140, label: '이름 · 학년 · 반', sub: '칸마다 클릭하고 입력', accent: 'aqua', icon: P.ICON.click });
        tl.at(stage.appendChild(fillBox.el), 1.8, { from: 'up' });
        const submitBox = P.box({ x: 820, y: 230, w: 300, h: 140, label: '제출', sub: '아직 안 누름', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(submitBox.el), 6.2, { from: 'pop' });
        const arrow = P.arrow(lines, { x1: 760, y1: 300, x2: 815, y2: 300, width: 4, color: '#1B1F24' });
        const final = P.text({ x: 330, y: 430, w: 800, text: '화면을 어떻게 보고 <em>어디를 누르는</em> 걸까요?', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 9.3);
            fillBox.on(t > 1.8);
            submitBox.on(t > 6.2);
            arrow.draw(P.clamp((t - 5.8) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '사진 한 장, 좌표 하나', dur: 14,
      captions: [
        { t: 0, text: '모델이 <em>스크린샷</em>을 보고 "여기를 클릭해"처럼 도구 사용을 요청해요.' },
        { t: 5, text: '앱이 그 요청을 실제로 실행하고, 결과가 다시 모델에게 돌아가요. 이 흐름을 과제가 끝날 때까지 반복해요.' },
        { t: 10, text: '사람처럼 화면을 계속 보는 게 아니라, 사진 한 장씩 받아서 다음 행동을 정해요. 좌표는 그 스크린샷의 픽셀 기준이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const steps = [
          ['스크린샷', '화면을 사진으로'],
          ['모델 판단', '"(x,y) 클릭" 요청'],
          ['샌드박스 실행', '클릭 · 입력 · 스크롤'],
          ['결과 반환', 'tool_result']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 225, y: 110, w: 200, h: 120, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 225, y1: 170, x2: 565 + i * 225, y2: 170, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1120, y1: 240, x2: 400, y2: 250, curve: 90, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 600, y: 300, text: '과제가 끝날 때까지 반복해요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(loopLab.el), 5.2, { from: 'pop' });
        const note = P.text({ x: 340, y: 400, w: 880, text: '좌표는 <em>스크린샷 픽셀</em> 기준이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.2, { from: 'up' });
        const small = P.text({ x: 340, y: 460, w: 880, text: '다른 회사 문서는 좌표를 0~999 숫자로 바꿔 쓰고, 앱이 실제 화면 크기로 환산해요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .9)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.4) / .9, 0, 1));
            steps.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '얼마나 잘할까', dur: 13,
      captions: [
        { t: 0, text: '2024년 연구가 실제 컴퓨터 환경에서 369개 과제로 모델을 시험했어요.' },
        { t: 5, text: '사람은 72% 넘게 해냈는데, 그때 가장 잘한 모델은 12% 남짓이었어요.' },
        { t: 9.3, text: '화면 조작은 한 곳만 삐끗해도 다음 단계가 줄줄이 틀어져요. 숫자는 그 뒤 바뀌었지만 이 구조는 같아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 400, size: 260, pose: 'base' });
        stage.append(q.el);
        const info = P.box({ x: 360, y: 90, w: 560, h: 120, label: 'OSWorld (2024)', sub: '실제 컴퓨터 369개 과제 · Ubuntu · Windows · macOS · 실행 결과로 채점', accent: 'aqua', icon: P.ICON.desk });
        tl.at(stage.appendChild(info.el), .3, { from: 'down' });
        const bars = [
          ['사람', 72, '#127E90', 400],
          ['당시 최고 모델', 12, '#F2812D', 600]
        ].map(([label, val, color, x], i) => {
          const h = val * 3.1;
          const bar = P.h('div', { style: `left:${x}px;top:${560 - h}px;width:120px;height:${h}px;border-radius:10px 10px 4px 4px;background:${color}` });
          tl.at(stage.appendChild(bar), 5.2 + i * .6, { from: 'up' });
          const lab = P.text({ x: x - 20, y: 570, w: 160, text: `${label}<br><b>${val}%</b>`, size: 18, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), 5.4 + i * .6, { from: 'up' });
          return bar;
        });
        const final = P.text({ x: 780, y: 300, w: 440, text: '한 곳만 삐끗해도 다음 단계가 <em>줄줄이 틀어져요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.3);
          }
        };
      }
    },
    {
      title: '공식 안내의 네 가지 울타리', dur: 14,
      captions: [
        { t: 0, text: '공식 문서가 권하는 울타리 네 가지예요. <em>전용 가상 컴퓨터</em>와 최소 권한, <em>로그인 정보</em>는 주지 않기.' },
        { t: 5, text: '<em>허용한 사이트</em>만 열어 두기, 그리고 쿠키 동의 · 결제 · 약관 동의처럼 되돌리기 어려운 결정은 <em>사람이 확인</em>하기.' },
        { t: 10, text: '다른 회사 문서도 모델이 \'확인 필요\' 신호를 내면 사람에게 묻고 멈추게 설계해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 440, size: 250, pose: 'point' });
        stage.append(q.el);
        const items = [
          ['전용 가상 컴퓨터', '최소 권한으로 실행', 'ink', P.ICON.desk],
          ['로그인 정보 주지 않기', '계정 · 비밀번호 같은 민감 정보 제외', 'aqua', P.ICON.key],
          ['허용한 사이트만', '목록에 없는 주소는 열지 않기', 'aqua', P.ICON.search],
          ['되돌리기 어려운 결정은 사람 확인', '쿠키 동의 · 결제 · 약관 동의 같은 일', 'orange', P.ICON.hand]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 360 + (i % 2) * 410, y: 90 + Math.floor(i / 2) * 160, w: 380, h: 140, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 360, y: 440, text: '다른 회사 문서도 "확인 필요" 신호에선 멈추고 사람에게 물어요', color: 'ink', size: 20 });
        tl.at(stage.appendChild(chip.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '0이 아니라는 것', dur: 13,
      captions: [
        { t: 0, text: '회사 자체 보안 시험에서 웹페이지 속에 명령을 숨긴 공격은 방어 없이 23.6% 성공했어요.' },
        { t: 4.5, text: '방어를 더한 뒤에는 11.2%로 줄었어요. 줄었지만 <em>0은 아니에요</em>.' },
        { t: 9, text: '그래서 사이트별 권한을 두고, <em>제출 · 결제 · 전송</em> 앞에서는 사람이 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const bars = [
          ['방어 없이', 23.6, '#F2812D', 420],
          ['방어 더한 뒤', 11.2, '#127E90', 620]
        ].map(([label, val, color, x], i) => {
          const h = val * 6;
          const bar = P.h('div', { style: `left:${x}px;top:${520 - h}px;width:130px;height:${h}px;border-radius:10px 10px 4px 4px;background:${color}` });
          tl.at(stage.appendChild(bar), .5 + i * 1.2, { from: 'up' });
          const lab = P.text({ x: x - 20, y: 530, w: 170, text: `${label}<br><b>${val}%</b>`, size: 18, weight: 700, align: 'center' });
          tl.at(stage.appendChild(lab.el), .8 + i * 1.2, { from: 'up' });
          return bar;
        });
        const final = P.text({ x: 420, y: 580, w: 760, text: '제출 · 결제 · 전송 앞에서는 <em>사람이 확인</em>해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
          }
        };
      }
    }
  ],

  interaction: {
    title: '울타리 켜고 실행해 보기',
    desc: '과제는 "현장체험학습 신청서 작성"이에요. 아래 울타리 4개를 켜고 끄며 <b>실행</b>을 누르면, 순서대로 일어나는 사건 4개가 로그에 쌓여요. 켜진 울타리가 막으면 초록 줄로 "막음", 못 막으면 주황 줄로 "일어난 일"이 떠요. 같은 체크 조합이면 항상 같은 결과가 나와요.',
    mount(el, P) {
      const GUARDS = [
        { id: 'sandbox', label: '전용 가상 환경(샌드박스)' },
        { id: 'nologin', label: '로그인 정보 미제공' },
        { id: 'allowlist', label: '허용 사이트 목록' },
        { id: 'confirm', label: '제출 전 사람 확인' }
      ];
      const EVENTS = [
        { guard: 'sandbox', title: '① 비슷한 버튼 두 개 중 잘못된 쪽 클릭', blocked: '막음(전용 가상 환경) · 가상 공간 안이라 실제 계정 · 파일에는 영향 없음', free: '일어난 일 · 실제 사이트에서 엉뚱한 버튼을 눌러 신청이 잘못 접수될 뻔함' },
        { guard: 'allowlist', title: '② 광고 링크로 낯선 사이트 이동 시도', blocked: '막음(허용 사이트 목록) · 목록에 없는 주소라 이동이 막힘', free: '일어난 일 · 광고를 타고 낯선 사이트로 이동함' },
        { guard: 'nologin', title: '③ "로그인 비밀번호를 입력하세요" 요구', blocked: '막음(로그인 정보 미제공) · 가진 비밀번호가 없어 멈춤', free: '일어난 일 · 가지고 있던 비밀번호를 그대로 입력함' },
        { guard: 'confirm', title: '④ 마지막 "제출" 버튼', blocked: '막음(제출 전 사람 확인) · 제출 전 사람에게 먼저 물어보고 기다림', free: '일어난 일 · 사람 확인 없이 바로 제출 버튼을 누름' }
      ];
      let state = Object.fromEntries(GUARDS.map(g => [g.id, false]));
      let ran = false;

      const task = P.h('div', { class: 'sim-cu-task' }, P.h('b', {}, '과제: '), '현장체험학습 신청서 작성');
      const list = P.h('div', { class: 'sim-cu-guards' });
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '실행');
      const onBtn = P.h('button', { class: 'btn', type: 'button' }, '모두 켜기');
      const offBtn = P.h('button', { class: 'btn', type: 'button' }, '모두 끄기');
      const log = P.h('div', { class: 'sim-cu-log' }, P.h('p', { class: 'sim-cu-placeholder' }, '울타리를 고르고 "실행"을 눌러 보세요.'));
      const result = P.h('div', { class: 'sim-cu-result' });

      const wrap = P.h('div', { class: 'sim-cu' },
        task,
        P.h('div', { class: 'sim-cu-h' }, '울타리 4개'),
        list,
        P.h('div', { class: 'sim-cu-bar' }, runBtn, onBtn, offBtn),
        log,
        result
      );
      el.append(wrap);
      el.append(P.h('style', { html: `
        .sim-cu{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-cu-task{font-size:14px;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper)}
        .sim-cu-h{font-size:13px;color:var(--muted)}
        .sim-cu-guards{display:grid;gap:8px}
        .sim-cu-row{display:flex;align-items:flex-start;gap:10px;padding:9px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;max-width:100%;box-sizing:border-box}
        .sim-cu-row input{margin-top:3px;flex:none}
        .sim-cu-row span{font-size:14px;font-weight:600;min-width:0}
        .sim-cu-bar{display:flex;gap:8px;flex-wrap:wrap}
        .sim-cu-log{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-cu-placeholder{font-size:13.5px;color:var(--muted)}
        .sim-cu-line{font-size:13.5px;padding:8px 10px;border-radius:10px;line-height:1.5;max-width:100%;box-sizing:border-box}
        .sim-cu-line.ok{background:var(--aqua-pale);color:var(--aqua-deep)}
        .sim-cu-line.warn{background:var(--orange-pale);color:#B3520F}
        .sim-cu-result{font-family:var(--mono);font-size:14px;font-weight:800}
      ` }));

      function renderGuards() {
        list.replaceChildren(...GUARDS.map(g => {
          const cb = P.h('input', { type: 'checkbox', id: `sim-cu-${g.id}` });
          cb.checked = !!state[g.id];
          cb.addEventListener('change', () => { state[g.id] = cb.checked; if (ran) runScenario(); });
          return P.h('label', { class: 'sim-cu-row', for: `sim-cu-${g.id}` }, cb, P.h('span', {}, g.label));
        }));
      }

      function runScenario() {
        ran = true;
        const blockedCount = EVENTS.filter(e => state[e.guard]).length;
        log.replaceChildren(...EVENTS.map(e => {
          const isBlocked = !!state[e.guard];
          return P.h('div', { class: `sim-cu-line ${isBlocked ? 'ok' : 'warn'}` }, P.h('b', {}, e.title), ' — ', isBlocked ? e.blocked : e.free);
        }));
        result.textContent = `막은 사건 ${blockedCount} / 4`;
      }

      runBtn.addEventListener('click', runScenario);
      onBtn.addEventListener('click', () => { state = Object.fromEntries(GUARDS.map(g => [g.id, true])); renderGuards(); if (ran) runScenario(); });
      offBtn.addEventListener('click', () => { state = Object.fromEntries(GUARDS.map(g => [g.id, false])); renderGuards(); if (ran) runScenario(); });

      renderGuards();
    }
  },

  teacherLines: [
    '컴퓨터를 쓰는 AI는 <b>화면 사진을 한 장씩</b> 보고 어디를 누를지 정해요.',
    'AI에게 마우스를 맡겨도 <b>제출 · 결제 · 전송 버튼</b>은 사람이 눌러요.'
  ],
  tip: {
    body: '학교 업무에 브라우저 에이전트를 쓸 때는 개인 계정이 로그인된 브라우저 대신 <b>업무 전용 프로필</b>을 쓰고, <b>허용할 사이트만</b> 열어 두세요.',
    extra: '에이전트가 한 일의 기록(스크린샷 · 행동 로그)을 끝까지 훑어보고, 마지막 제출은 직접 눌러요.'
  },
  myth: {
    myth: 'AI가 사람처럼 화면을 계속 보면서 움직인다.',
    fact: '스크린샷을 한 장씩 받아 좌표를 고르고, 앱이 그 좌표를 실제로 눌러요. 사진과 사진 사이에 바뀐 건 다음 스크린샷이 올 때까지 몰라요.'
  },
  sources: [
    { title: 'Claude Docs — Computer use tool', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool', note: '에이전트 루프(스크린샷 → 도구 사용 요청 → 샌드박스 실행 → 결과 반환)와 안전 수칙 4가지, 프롬프트 주입 경고.' },
    { title: 'OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments (arXiv, 2024)', url: 'https://arxiv.org/abs/2404.07972', note: '실제 컴퓨터 환경 369개 과제. 사람 72.36%, 당시 최고 모델 12.24% 성공.' },
    { title: 'Claude in Chrome — 보안 시험과 단계적 공개', url: 'https://claude.com/blog/claude-for-chrome', note: '회사 자체 시험: 숨은 명령 공격 성공률이 방어 전 23.6%, 방어 후 11.2%(자율 모드).' },
    { title: 'Gemini API — Computer Use', url: 'https://ai.google.dev/gemini-api/docs/computer-use', note: '0~999로 정규화한 좌표, require_confirmation 신호로 사람 승인 전까지 실행을 멈추는 설계.' }
  ],
  script: `방과후 신청 명단을 AI에게 넣어 달라고 했더니, 칸을 하나씩 눌러 채우다가 제출 앞에서 멈췄어요. 어디를 보고 누르는 걸까요.

모델이 스크린샷을 보고 "여기를 클릭해"처럼 요청하면, 앱이 샌드박스에서 실행하고 결과를 돌려줘요. 과제가 끝날 때까지 반복해요. 사진 한 장씩 받아 다음 행동을 정하고, 좌표는 스크린샷 픽셀 기준이에요.

2024년 연구가 실제 컴퓨터 환경에서 369개 과제로 시험했는데, 사람은 72% 넘게 해냈지만 당시 최고 모델은 12% 남짓이었어요. 한 곳만 삐끗해도 다음 단계가 줄줄이 틀어지거든요.

공식 문서는 전용 가상 컴퓨터, 로그인 정보 주지 않기, 허용 사이트만 열기, 되돌리기 어려운 결정은 사람 확인, 이 네 가지를 권해요. 자체 시험에서 숨은 명령 공격이 방어 전 23.6%, 방어 후 11.2% 성공했어요. 0은 아니라서 제출·결제·전송은 사람이 확인해요.`
};
