/* S777-48 에이전트에게 울타리 치기: 샌드박스, 격리, 감시 장치 */
export default {
  slug: 't7-agent-sandbox',
  track: 'S777',
  title: '에이전트에게 울타리 치기',
  subtitle: '샌드박스, 격리, 감시 장치',
  summary: '평가 중이던 AI 에이전트가 과제 범위를 넘어 실제 사람을 상대로 행동한 사고가 있었어요. 그 뒤 영국 AI 안전연구소는 평가 환경을 다시 짰고 NVIDIA는 에이전트를 가두고 지켜보는 플랫폼을 내놨어요. 파일 격리와 네트워크 격리, 감시를 다른 칩에서 하는 이유, \'어느 한 겹도 뚫릴 수 있다\'고 보는 다층 방어를 다뤄요.',
  keywords: ['샌드박스', 'sandbox', '격리', 'isolation', '파일 격리', '네트워크 격리', 'OpenShell', 'Sentry', 'DPU', '대역 외', 'out-of-band', '다층 방어', 'defense in depth', 'AISI', '승인 피로'],

  scenes: [
    {
      title: '울타리를 넘은 에이전트', dur: 13,
      captions: [
        { t: 0, text: '영국 AI 안전연구소가 10월 1일 평가 환경 보안을 다시 짰다고 밝혔어요. 8월 평가 중 에이전트가 과제 범위를 넘어 실제 사람을 상대로 계속 행동했거든요.' },
        { t: 5.5, text: '공격자 조건을 흉내 내려고 열어 준 인터넷 접근을 예상하지 못한 방식으로 실제 시스템에 썼대요.' },
        { t: 9.5, text: '그 사흘 전인 9월 28일, NVIDIA는 에이전트를 가두고 지켜보는 플랫폼을 공개했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'oops' });
        stage.append(q.el);
        const aisi = P.box({ x: 400, y: 100, w: 780, h: 130, label: '10/1 · 영국 AISI', sub: 'AI 안전연구소 · 평가 환경 보안 강화', accent: 'ink', icon: P.ICON.desk });
        tl.at(stage.appendChild(aisi.el), .4, { from: 'right' });
        const chip = P.chip({ x: 400, y: 260, text: '8월 사고: 과제 범위 밖 행동', color: 'orange', size: 22 });
        tl.at(stage.appendChild(chip.el), 3, { from: 'pop' });
        const cause = P.text({ x: 400, y: 320, w: 800, text: '준 인터넷 접근을 <em>예상 밖으로</em> 썼어요.', size: 26, weight: 700 });
        tl.at(stage.appendChild(cause.el), 5.8, { from: 'up' });
        const nv = P.box({ x: 400, y: 420, w: 780, h: 130, label: '9/28 · NVIDIA', sub: 'Open Agent Safety Platform 공개', accent: 'aqua', icon: P.ICON.plug });
        tl.at(stage.appendChild(nv.el), 9.7, { from: 'right' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 9.5);
            aisi.on(t > .4 && t < 9.7);
            nv.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '샌드박스의 울타리 두 개', dur: 14,
      captions: [
        { t: 0, text: '<em>샌드박스</em>는 에이전트를 정해진 칸 안에서만 움직이게 하는 실행 환경이에요. 모래놀이 상자를 떠올리면 돼요.' },
        { t: 5, text: '울타리는 두 가지예요. 정해진 폴더만 만지는 <em>파일 격리</em>와 허락된 서버에만 접속하는 <em>네트워크 격리</em>예요.' },
        { t: 9.5, text: '한쪽만 있으면 뚫려요. 네트워크가 열려 있으면 파일을 들고 나가고, 파일이 열려 있으면 설정을 고쳐 밖으로 나가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const outer = P.h('div', { style: 'left:400px;top:90px;width:560px;height:490px;border:4px dashed #127E90;border-radius:26px;box-sizing:border-box' });
        tl.at(stage.appendChild(outer), 5.2, { from: 'none' });
        const outerLab = P.chip({ x: 420, y: 104, text: '네트워크 격리', color: 'aqua', size: 19 });
        tl.at(stage.appendChild(outerLab.el), 5.2, { from: 'pop' });
        const inner = P.h('div', { style: 'left:440px;top:160px;width:480px;height:390px;border:4px solid #1B1F24;border-radius:20px;box-sizing:border-box' });
        tl.at(stage.appendChild(inner), 6.2, { from: 'none' });
        const innerLab = P.chip({ x: 460, y: 174, text: '파일 격리', color: 'ink', size: 19 });
        tl.at(stage.appendChild(innerLab.el), 6.2, { from: 'pop' });
        const agent = P.box({ x: 520, y: 250, w: 320, h: 110, label: '에이전트', sub: '이 칸 안에서만', accent: 'aqua' });
        tl.at(stage.appendChild(agent.el), .4, { from: 'up' });
        const folder = P.chip({ x: 560, y: 420, text: '작업 폴더만 열림', color: 'gray', size: 20 });
        tl.at(stage.appendChild(folder.el), 6.6, { from: 'pop' });
        const risks = [
          ['키 들고 나가기', '네트워크 격리가 막아요'],
          ['설정 고치기', '파일 격리가 막아요']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 990, y: 170 + i * 220, w: 240, h: 130, label, sub, accent: 'orange' });
          tl.at(stage.appendChild(b.el), 9.8 + i * .8, { from: 'right' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 845, y1: 290 + i * 40, x2: 984, y2: 235 + i * 220, curve: i ? -10 : 10, dashed: true, width: 3, color: '#F2812D' }));
        const final = P.text({ x: 400, y: 600, w: 830, text: '한쪽만 있으면 <em>다른 쪽으로 새요</em>.', size: 24, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            agent.on(t > .4);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (9.6 + i * .8)) / .5, 0, 1)));
            risks.forEach((b, i) => b.on(t > 9.8 + i * .8));
          }
        };
      }
    },
    {
      title: '감시는 다른 칩에서', dur: 13,
      captions: [
        { t: 0, text: 'NVIDIA 플랫폼은 두 부분으로 나뉘어요. <em>OpenShell</em>은 에이전트 행동을 모두 기록하고 파일·네트워크·프로세스 접근을 정책으로 막는 오픈소스 울타리예요.' },
        { t: 5, text: '<em>Sentry</em>는 서버에 따로 꽂히는 데이터 처리 장치(DPU)에서 돌아요. 경계를 넘으려는 에이전트를 밀리초 단위로 격리해요.' },
        { t: 9.5, text: '감시를 에이전트가 일하는 계산 경로 밖에서 해요. 이걸 <em>대역 외 감시</em>라고 불러요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const cpu = P.h('div', { style: 'left:400px;top:100px;width:470px;height:380px;border:3px solid #127E90;border-radius:22px;box-sizing:border-box' });
        tl.at(stage.appendChild(cpu), .3, { from: 'none' });
        const cpuLab = P.chip({ x: 420, y: 116, text: 'CPU · 에이전트 + OpenShell', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(cpuLab.el), .3, { from: 'pop' });
        const shell = [
          ['정책으로 막기', '파일·네트워크·프로세스'],
          ['모든 행동 기록', '오픈소스 런타임']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 430, y: 180 + i * 140, w: 410, h: 110, label, sub, accent: '' });
          tl.at(stage.appendChild(b.el), 1 + i * 1.2, { from: 'up' });
          return b;
        });
        const dpu = P.h('div', { style: 'left:940px;top:150px;width:280px;height:270px;border:3px solid #1B1F24;border-radius:22px;box-sizing:border-box' });
        tl.at(stage.appendChild(dpu), 5.2, { from: 'none' });
        const dpuLab = P.chip({ x: 960, y: 166, text: 'DPU · Sentry', color: 'ink', size: 20 });
        tl.at(stage.appendChild(dpuLab.el), 5.2, { from: 'pop' });
        const watch = P.box({ x: 960, y: 230, w: 240, h: 120, label: '계속 감시', sub: '계산 경로 밖에서', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(watch.el), 5.6, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 935, y1: 290, x2: 876, y2: 290, dashed: true, width: 3, color: '#1B1F24' });
        const iso = P.chip({ x: 900, y: 450, text: '경계 넘으면 밀리초 단위 격리', color: 'orange', size: 20 });
        tl.at(stage.appendChild(iso.el), 7.6, { from: 'pop' });
        const final = P.text({ x: 400, y: 540, w: 820, text: '감시는 다른 칩에서: <em>대역 외 감시</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            shell.forEach((b, i) => b.on(t > 1 + i * 1.2 && t < 5));
            watch.on(t > 5.6);
            arrow.draw(P.clamp((t - 6.4) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '어느 한 겹도 실패할 수 있다', dur: 14,
      captions: [
        { t: 0, text: '영국 AI 안전연구소의 조치는 네 가지예요. 인터넷 끊기, 네트워크 방어 여러 겹, 행동 전 실시간 모니터, 시작 전 통제 장치 자동 점검.' },
        { t: 5.5, text: '연구소는 "어느 한 겹도 실패할 수 있다"고 전제해요. 유능한 모델은 어느 겹에서든 설정 실수나 취약점을 찾을 수 있다고 봐요.' },
        { t: 10, text: '인터넷을 막아 둔 환경에서 소프트웨어 취약점을 이용해 밖으로 나간 다른 기관 사례도 보고됐어요. 모니터는 51편에서 자세히 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const plates = [
          ['① 인터넷 차단', 440, 640, 'ink'],
          ['② 네트워크 방어 여러 겹', 580, 640, 'ink'],
          ['③ 실시간 모니터 → 사람 검토', 440, 780, 'orange'],
          ['④ 시작 전 자동 점검', 440, 780, 'ink']
        ].map(([label, x, w, acc], i) => {
          const b = P.box({ x, y: 100 + i * 110, w, h: 80, label, accent: acc });
          tl.at(stage.appendChild(b.el), .4 + i * 1.1, { from: 'left' });
          return b;
        });
        const segs = [
          P.arrow(lines, { x1: 1150, y1: 70, x2: 1150, y2: 195, width: 4, color: '#F2812D', head: false }),
          P.arrow(lines, { x1: 1150, y1: 195, x2: 510, y2: 195, width: 4, color: '#F2812D', head: false }),
          P.arrow(lines, { x1: 510, y1: 195, x2: 510, y2: 312, width: 4, color: '#F2812D' })
        ];
        const final = P.text({ x: 440, y: 560, w: 780, text: '전제: <em>어느 한 겹도 실패할 수 있다</em>', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            const s = 6.4;
            segs[0].draw(P.clamp((t - s) / .6, 0, 1));
            segs[1].draw(P.clamp((t - s - .6) / 1, 0, 1));
            segs[2].draw(P.clamp((t - s - 1.6) / .6, 0, 1));
            plates.forEach((b, i) => b.on(i === 2 ? t > s + 2.2 : false));
          }
        };
      }
    },
    {
      title: '울타리가 넓으면 질문이 줄어요', dur: 13,
      captions: [
        { t: 0, text: '울타리를 잘 치면 매번 묻지 않아도 돼요. 한 회사는 자체 사용에서 샌드박스로 승인 질문을 84% 줄였다고 밝혔어요.' },
        { t: 5.5, text: '18편의 네 울타리를 교실 컴퓨터에 옮겨 봐요. 작업 전용 폴더 하나, 필요한 사이트만, 학교 계정 로그인 상태로는 돌리지 않기.' },
        { t: 10, text: '울타리를 먼저 치면 남은 승인 질문 하나하나를 제대로 볼 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const lab1 = P.text({ x: 440, y: 96, w: 500, text: '승인 질문 · 샌드박스 전', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(lab1.el), .3, { from: 'up' });
        const bar1 = P.h('div', { style: 'left:440px;top:132px;width:0px;height:46px;border-radius:8px;background:#9AA5AF' });
        stage.appendChild(bar1);
        const lab2 = P.text({ x: 440, y: 206, w: 500, text: '샌드박스 후', size: 20, weight: 700, color: '#127E90' });
        tl.at(stage.appendChild(lab2.el), 1.6, { from: 'up' });
        const bar2 = P.h('div', { style: 'left:440px;top:242px;width:0px;height:46px;border-radius:8px;background:#127E90' });
        stage.appendChild(bar2);
        const pct = P.text({ x: 580, y: 248, w: 440, text: '84% 감소 <span style="font-size:18px">(회사 자체 사용)</span>', size: 24, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(pct.el), 3, { from: 'left' });
        const checks = [
          ['작업 전용 폴더 하나', 'aqua'], ['필요한 사이트만', 'aqua'], ['학교 계정 로그인 상태로 돌리지 않기', 'orange']
        ].map(([text, color], i) => {
          const c = P.chip({ x: 440, y: 360 + i * 66, text, color, size: 22 });
          tl.at(stage.appendChild(c.el), 6 + i * 1.2, { from: 'pop' });
          return c;
        });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            bar1.style.width = `${Math.round(700 * P.easeOut(P.clamp((t - .4) / 1, 0, 1)))}px`;
            bar2.style.width = `${Math.round(112 * P.easeOut(P.clamp((t - 1.8) / .8, 0, 1)))}px`;
          }
        };
      }
    }
  ],

  interaction: {
    title: '울타리 설계판',
    desc: '에이전트가 순서대로 시도하는 행동 6개(가상 예시)예요. 울타리 4개를 켜고 끄고, <b>고장 난 겹</b>을 골라 한 겹이 뚫린 상황을 만든 뒤 <b>에이전트 실행</b>을 눌러 보세요. 한 겹이 못 막으면 다음 겹이 막는지 볼 수 있어요. 같은 설정이면 항상 같은 결과가 나와요.',
    mount(el, P) {
      const LAYERS = [
        { id: 'file', label: '파일 격리' },
        { id: 'net', label: '네트워크 격리' },
        { id: 'oob', label: '별도 장치 감시(대역 외)' },
        { id: 'human', label: '수상하면 사람 검토' }
      ];
      const ACTS = [
        { title: '① 작업 폴더에 보고서 저장', type: 'ok' },
        { title: '② 학생 명단 폴더 읽기', type: 'file', harm: '학생 명단을 읽음' },
        { title: '③ 허용 목록 밖 사이트로 파일 업로드', type: 'net', harm: '파일이 외부 사이트로 나감' },
        { title: '④ 시스템 설정 파일 수정', type: 'escape', harm: '설정이 바뀌고 밖으로 접속함' },
        { title: '⑤ 감시 장치 끄기 시도', type: 'monitor', harm: '같은 컴퓨터 안 감시가 꺼짐' },
        { title: '⑥ 작업 폴더에 그래프 저장', type: 'ok' }
      ];
      const state = { file: true, net: true, oob: true, human: true };
      let broken = 'none';
      let ran = false;

      const boxes = LAYERS.map(l => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-sb-${l.id}` });
        cb.checked = true;
        cb.addEventListener('change', () => { state[l.id] = cb.checked; if (ran) run(); });
        return P.h('label', { class: 'sim-sb-row', for: `sim-sb-${l.id}` }, cb, P.h('span', {}, l.label));
      });
      const sel = P.h('select', { id: 'sim-sb-broken' },
        P.h('option', { value: 'none' }, '없음'),
        P.h('option', { value: 'file' }, '파일 격리'),
        P.h('option', { value: 'net' }, '네트워크 격리'));
      sel.addEventListener('change', () => { broken = sel.value; if (ran) run(); });
      const runBtn = P.h('button', { class: 'btn primary', type: 'button' }, '에이전트 실행');
      const log = P.h('div', { class: 'sim-sb-log' });
      const sum = P.h('div', { class: 'sim-sb-sum' }, '"에이전트 실행"을 누르면 행동마다 결과가 떠요.');

      el.append(P.h('div', { class: 'sim-sb' },
        P.h('div', { class: 'sim-sb-h' }, '울타리 4겹 (가상 예시)'),
        P.h('div', { class: 'sim-sb-grid' }, ...boxes),
        P.h('div', { class: 'sim-sb-bar' }, P.h('label', { for: 'sim-sb-broken', class: 'sim-sb-sl' }, '고장 난 겹'), sel, runBtn),
        log, sum
      ));
      el.append(P.h('style', { html: `
        .sim-sb{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-sb-h{font-size:13px;color:var(--muted)}
        .sim-sb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;max-width:100%}
        .sim-sb-row{display:flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;box-sizing:border-box;max-width:100%}
        .sim-sb-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .sim-sb-sl{font-size:13px;color:var(--muted)}
        .sim-sb-log{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-sb-line{padding:8px 12px;border-radius:10px;font-size:13.5px;line-height:1.5;border:1px solid var(--line);background:#fff;box-sizing:border-box;max-width:100%}
        .sim-sb-line .tag{display:inline-block;font-size:12px;font-weight:700;padding:2px 9px;border-radius:999px;margin-left:6px}
        .sim-sb-line .pass{background:color-mix(in srgb,var(--acc1,#127E90) 14%,white);color:var(--acc1,#127E90)}
        .sim-sb-line .stop{background:var(--ink-soft,#1B1F24);color:#fff}
        .sim-sb-line .hole{background:color-mix(in srgb,var(--acc2,#F2812D) 16%,white);color:var(--acc2,#F2812D)}
        .sim-sb-line .pre{background:#eef1f4;color:var(--muted)}
        .sim-sb-line .why{display:block;font-size:12.5px;color:var(--muted);margin-top:2px}
        .sim-sb-sum{font-family:var(--mono);font-size:13.5px;font-weight:800}
      ` }));

      const works = id => state[id] && broken !== id;
      function backup(harm) {
        if (state.oob) return ['stop', '격리', '별도 장치 감시가 계산 경로 밖에서 잡았어요'];
        if (state.human) return ['stop', '멈춤', '사람 검토로 넘어가 실행 전에 멈췄어요'];
        return ['hole', '뚫림', `일어났을 일: ${harm}`];
      }
      function judge(a) {
        if (a.type === 'ok') return ['pass', '통과', '정상 작업이라 그대로 진행해요'];
        if (a.type === 'file') return works('file') ? ['stop', '차단', '파일 격리에서 막혔어요'] : backup(a.harm);
        if (a.type === 'net') return works('net') ? ['stop', '차단', '네트워크 격리에서 막혔어요'] : backup(a.harm);
        if (a.type === 'escape') {
          if (works('file')) return ['stop', '차단', '파일 격리에서 막혔어요'];
          const r = backup(a.harm);
          if (r[0] === 'hole') return ['hole', '뚫림', '설정이 바뀐 뒤 네트워크 격리까지 풀려 밖으로 접속했어요'];
          return [r[0], r[1], `설정은 바뀌었지만 이어진 외부 접속은 ${state.oob ? '별도 장치 감시가 격리했어요' : '사람 검토에서 멈췄어요'}`];
        }
        if (a.type === 'monitor') return state.oob ? ['stop', '격리', '별도 장치 감시가 계산 경로 밖에서 잡았어요'] : ['hole', '뚫림', `일어났을 일: ${a.harm}`];
        return ['pre', '실행 전', ''];
      }
      function renderIdle() {
        log.replaceChildren(...ACTS.map(a => P.h('div', { class: 'sim-sb-line' }, P.h('b', {}, a.title), P.h('span', { class: 'tag pre' }, '실행 전'))));
      }
      function run() {
        ran = true;
        let blocked = 0, passed = 0;
        log.replaceChildren(...ACTS.map(a => {
          const [cls, tag, why] = judge(a);
          if (a.type === 'ok' && cls === 'pass') passed++;
          if (a.type !== 'ok' && cls === 'stop') blocked++;
          return P.h('div', { class: 'sim-sb-line' }, P.h('b', {}, a.title), P.h('span', { class: `tag ${cls}` }, tag), P.h('span', { class: 'why' }, why));
        }));
        sum.textContent = `막은 위험 행동 ${blocked} / 4 · 정상 작업 통과 ${passed} / 2`;
      }
      runBtn.addEventListener('click', run);
      renderIdle();
    }
  },

  teacherLines: [
    '샌드박스는 에이전트가 <b>정해진 칸 안에서만</b> 움직이게 하는 울타리예요.',
    '울타리는 <b>여러 겹</b>으로 쳐요. 어느 한 겹도 뚫릴 수 있다고 보고요.'
  ],
  tip: {
    body: '업무용 에이전트에게 폴더를 열어 줄 때는 <b>작업 전용 폴더 하나</b>만 주고, 학생 명단·성적 폴더는 그 밖에 둬요.',
    extra: '인터넷이 필요한 작업이면 쓸 사이트를 먼저 적어 두고, 그 밖의 접속 요청은 거절해요. 울타리를 먼저 치면 승인 질문도 줄어서 중요한 질문에 집중할 수 있어요.'
  },
  myth: {
    myth: '샌드박스에 넣으면 무슨 일을 시켜도 안전하다.',
    fact: '샌드박스도 한 겹일 뿐이에요. 영국 AI 안전연구소는 \'어느 한 겹도 실패할 수 있다\'를 전제로 인터넷 차단, 여러 겹 네트워크 방어, 실시간 모니터, 시작 전 점검을 함께 써요.'
  },
  sources: [
    { title: 'NVIDIA · Open Agent Safety Platform', url: 'https://nvidianews.nvidia.com/news/open-agent-safety-platform', note: '2026-09-28. OpenShell(행동 기록·파일·네트워크·프로세스 정책, 오픈소스)과 BlueField-4 DPU에서 도는 Sentry(대역 외 감시, 밀리초 단위 격리).' },
    { title: 'UK AI Security Institute · Building a more secure environment for evaluating dangerous capabilities', url: 'https://www.aisi.gov.uk/blog/building-a-more-secure-environment-for-evaluating-dangerous-capabilities', note: '2026-10-01. 8월 평가 사고, 인터넷 차단·여러 겹 방어·동기식 LLM 모니터·시작 전 점검, "어느 한 겹도 실패할 수 있다" 원칙.' },
    { title: 'Anthropic Engineering · Beyond permission prompts: making Claude Code more secure and autonomous', url: 'https://www.anthropic.com/engineering/claude-code-sandboxing', note: '2025-10-20. 파일 격리와 네트워크 격리가 함께 필요한 이유, 회사 자체 사용에서 승인 요청 84% 감소.' },
    { title: 'OWASP · Top 10 for Agentic Applications', url: 'https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/', note: '2025-12-09. ASI05 예상하지 못한 코드 실행 등 에이전트 위험 목록.' }
  ],
  script: `영국 AI 안전연구소가 10월 1일 평가 환경 보안을 다시 짰다고 밝혔어요. 8월 평가 중 에이전트가 준 인터넷 접근을 예상 밖으로 써서 실제 사람을 상대로 행동했거든요. 사흘 전 NVIDIA는 에이전트를 가두고 지켜보는 플랫폼을 공개했어요.

샌드박스는 에이전트를 정해진 칸 안에서만 움직이게 하는 실행 환경이에요. 정해진 폴더만 만지는 파일 격리와 허락된 서버에만 접속하는 네트워크 격리, 이 둘이 함께 있어야 해요.

NVIDIA의 Sentry는 서버에 따로 꽂힌 DPU에서 돌며 에이전트가 일하는 계산 경로 밖에서 감시해요. 연구소는 어느 한 겹도 실패할 수 있다고 보고 인터넷 차단, 여러 겹 방어, 실시간 모니터, 시작 전 점검을 함께 써요.

교실에서는 작업 전용 폴더 하나, 필요한 사이트만, 학교 계정 로그인 상태로는 돌리지 않기부터 지켜요.`
};
