/* S777-45 어제 쓰던 AI가 사라지는 이유: 모델 수명주기, 사전 고지, 데이터 내보내기 */
export default {
  slug: 't7-model-retirement',
  track: 'S777',
  title: '어제 쓰던 AI가 사라지는 이유',
  subtitle: '모델 수명주기, 사전 고지, 데이터 내보내기',
  summary: '9월 24일 Sora 2 API가 문을 닫았고, 9월 30일과 10월 1일에는 Claude Sonnet 4.5와 GPT-5.x 일부의 은퇴 날짜가 공지됐어요. 모델이 \'현역 → 레거시 → 지원 중단 예고 → 은퇴\'로 가는 수명주기, 몇 달 전에 알려 주는 규칙, 수업 자료와 대화 기록을 지키는 내보내기까지 공식 문서로 짚어요.',
  keywords: ['모델 은퇴', '지원 중단', 'deprecation', 'retirement', 'shutdown', '수명주기', 'Active', 'Legacy', 'Deprecated', 'Retired', '사전 고지', '스냅샷', '모델 ID', 'Sora 2', 'Claude Sonnet 4.5', 'GPT-5.1', '데이터 내보내기', '가중치 보존'],

  scenes: [
    {
      title: '9월 24일, 문을 닫은 영상 API', dur: 13,
      captions: [
        { t: 0, text: '9월 24일 OpenAI의 <em>Sora 2 API</em>가 종료됐어요. 3월 24일에 미리 공지한 날이에요.' },
        { t: 5, text: '9월 30일 Anthropic은 Claude Sonnet 4.5를 11월 30일에 은퇴시킨다고 알렸어요. 10월 1일 OpenAI도 GPT-5.1 등을 2027년 4월 1일에 종료한다고 공지했어요.' },
        { t: 9.5, text: '모두 <em>API에서</em> 적용되는 일정이에요. 쓰던 모델은 왜, 어떻게 사라질까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'oops' });
        stage.append(q.el);
        const marks = [
          ['9/24 종료', 'Sora 2 API', 'orange', 360, .4],
          ['11/30 은퇴 예정', 'Claude Sonnet 4.5', 'aqua', 650, 5.2],
          ['2027-04-01', 'GPT-5.1 등 종료 예정', 'ink', 940, 6.6]
        ].map(([label, sub, accent, x, t0]) => {
          const b = P.box({ x, y: 100, w: 260, h: 110, label, sub, accent });
          tl.at(stage.appendChild(b.el), t0, { from: 'up' });
          return b;
        });
        const line = P.h('div', { style: 'left:360px;top:258px;width:840px;height:4px;border-radius:2px;background:#9AA5AF' });
        stage.append(line);
        tl.at(line, .2, { from: 'left' });
        const dots = [490, 780, 1070].map((cx, i) => {
          const d = P.h('div', { style: `left:${cx - 10}px;top:250px;width:20px;height:20px;border-radius:50%;background:${i === 0 ? '#F2812D' : (i === 1 ? '#127E90' : '#1B1F24')}` });
          stage.append(d);
          tl.at(d, [.5, 5.3, 6.7][i], { from: 'pop' });
          return d;
        });
        const big = P.text({ x: 360, y: 320, w: 840, text: '쓰던 모델이 <em>사라지는 날</em>이 있어요.', size: 32, weight: 800 });
        tl.at(stage.appendChild(big.el), 9.7, { from: 'up' });
        const scope = P.chip({ x: 360, y: 400, text: '모두 API 기준 일정', color: 'gray', size: 20 });
        tl.at(stage.appendChild(scope.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.3);
            marks.forEach((b, i) => b.on(t > [.4, 5.2, 6.6][i] && t < 9.5));
          }
        };
      }
    },
    {
      title: '모델의 일생 네 칸', dur: 14,
      captions: [
        { t: 0, text: 'Anthropic 문서는 모델의 일생을 네 칸으로 나눠요. <em>현역</em>은 완전 지원, <em>레거시</em>는 업데이트가 끝난 상태예요.' },
        { t: 5, text: '<em>지원 중단(deprecated)</em>은 아직 돌아가지만 대체 모델과 은퇴일이 정해진 상태라서 "은퇴 예고"라고 보면 돼요.' },
        { t: 10, text: '<em>은퇴(retired)</em>하면 그 모델로 보낸 요청은 실패해요. Claude Sonnet 4.5는 지금 셋째 칸이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const stages = [
          ['현역', 'Active<br>완전 지원', ''],
          ['레거시', 'Legacy<br>업데이트 끝', ''],
          ['지원 중단', 'Deprecated<br>대체·날짜 지정', 'aqua'],
          ['은퇴', 'Retired<br>요청 실패', 'orange']
        ];
        const t0s = [.3, 2.2, 5.2, 10.2];
        const boxes = stages.map(([label, sub, accent], i) => {
          const b = P.box({ x: 340 + i * 220, y: 140, w: 190, h: 160, label, sub, accent, icon: i === 3 ? P.ICON.x : '' });
          tl.at(stage.appendChild(b.el), t0s[i], { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 534 + i * 220, y1: 220, x2: 556 + i * 220, y2: 220, width: 4, color: '#1B1F24' }));
        const now = P.chip({ x: 560, y: 340, text: 'Claude Sonnet 4.5: 지금 셋째 칸', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(now.el), 11.2, { from: 'pop' });
        const final = P.text({ x: 340, y: 440, w: 840, text: '지원 중단은 <em>은퇴 예고</em>라고 보면 돼요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 7.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.6);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (t0s[i + 1] - .2)) / .5, 0, 1)));
            boxes.forEach((b, i) => b.on(i === 2 ? t > 5.2 : false));
          }
        };
      }
    },
    {
      title: '몇 달 전에 알려 줄까', dur: 13,
      captions: [
        { t: 0, text: 'OpenAI는 정식 모델은 <em>최소 6개월</em>, 특화 변형은 최소 3개월 전에 알린다고 정해 뒀어요. 미리보기 모델은 약 2주로 훨씬 짧을 수 있어요.' },
        { t: 5.5, text: 'Anthropic은 공개 모델을 은퇴시키기 <em>최소 60일</em> 전에 이메일과 문서로 알려요.' },
        { t: 9.5, text: '실제로 Sora 2는 6개월 전에, Sonnet 4.5는 계산하면 61일 전에 공지됐어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const PX = 3;
        const rows = [
          ['OpenAI 정식 · 6개월', 180, '#1B1F24', .4],
          ['OpenAI 특화 · 3개월', 90, '#1B1F24', 1.6],
          ['OpenAI 미리보기 · 약 2주', 14, '#F2812D', 2.8],
          ['Anthropic 공개 · 60일', 60, '#127E90', 5.7]
        ].map(([label, days, color, t0], i) => {
          const y = 100 + i * 70;
          const lab = P.text({ x: 340, y: y + 4, w: 270, text: label, size: 19, weight: 700 });
          tl.at(stage.appendChild(lab.el), t0, { from: 'left' });
          const bar = P.h('div', { style: `left:620px;top:${y}px;width:0px;height:34px;border-radius:8px;background:${color}` });
          stage.append(bar);
          return { bar, w: days * PX, t0 };
        });
        const scale = P.text({ x: 620, y: 384, w: 540, text: '막대 길이 = 공지부터 은퇴까지 최소 기간', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(scale.el), 1, { from: 'up' });
        const c1 = P.chip({ x: 340, y: 450, text: 'Sora 2: 3/24 공지 → 9/24 종료 (6개월)', color: 'ink', size: 20 });
        const c2 = P.chip({ x: 340, y: 512, text: 'Sonnet 4.5: 9/30 공지 → 11/30 은퇴 (계산하면 61일)', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(c1.el), 9.7, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 10.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            rows.forEach(r => { r.bar.style.width = `${Math.round(r.w * P.easeOut(P.clamp((t - r.t0) / .8, 0, 1)))}px`; });
          }
        };
      }
    },
    {
      title: '왜 은퇴시키고, 무엇이 남나', dur: 14,
      captions: [
        { t: 0, text: 'Anthropic 문서는 새 모델을 위한 <em>처리 용량</em>을 확보하려고 은퇴시킨다고 밝혀요. 사용자가 모델을 옮기는 부담, 비교 연구가 끊기는 점 같은 단점도 적었어요.' },
        { t: 5, text: '그래서 2025년 11월, 공개 출시한 모든 모델의 <em>가중치를 보존</em>하겠다고 약속했어요. 가중치는 학습으로 정해진 모델의 숫자들이에요.' },
        { t: 10, text: '모델 ID는 그 시점 그대로 얼려 둔 <em>고정 스냅샷</em>이에요. 은퇴하면 그 ID로 보낸 요청은 실패해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const cards = [
          ['이유', '새 모델 처리 용량 확보', 'ink', .3],
          ['단점도 인정', '이전 부담 · 연구 단절', '', 2.6],
          ['약속', '가중치 보존(2025-11)', 'aqua', 5.2]
        ].map(([label, sub, accent, t0], i) => {
          const b = P.box({ x: 340 + i * 280, y: 100, w: 260, h: 150, label, sub, accent });
          tl.at(stage.appendChild(b.el), t0, { from: 'up' });
          return b;
        });
        const id = P.chip({ x: 340, y: 320, text: 'claude-sonnet-4-5-20250929', color: 'ink', size: 22 });
        id.el.style.fontFamily = 'var(--mono)';
        tl.at(stage.appendChild(id.el), 10.2, { from: 'left' });
        const eq = P.text({ x: 760, y: 322, w: 420, text: '= <i>고정 스냅샷</i>', size: 28, weight: 800 });
        tl.at(stage.appendChild(eq.el), 10.6, { from: 'left' });
        const final = P.text({ x: 340, y: 430, w: 840, text: '은퇴하면 그 ID로 보낸 <em>요청은 실패</em>해요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.6);
            cards.forEach((b, i) => b.on(i === 2 && t > 5.2 && t < 10));
          }
        };
      }
    },
    {
      title: '교실 판단: 기록 남기고 갈아탈 준비', dur: 13,
      captions: [
        { t: 0, text: '수업 자료에 AI 결과를 쓸 땐 <em>날짜와 모델 이름</em>을 같이 적어요.' },
        { t: 4.5, text: '은퇴 공지가 오면 은퇴일 전에 대체 모델로 같은 과제를 돌려 보고, 아끼는 대화 기록은 미리 내보내요.' },
        { t: 9, text: 'Claude는 설정의 개인정보 메뉴에서 내보내고, 메일 링크는 24시간 뒤 만료돼요. 학교 팀 계정은 소유자만 내보낼 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        ['1. 날짜 · 모델 이름 기록', '2. 은퇴일 전 대체 모델 시험', '3. 대화 기록 내보내기'].forEach((text, i) => {
          const c = P.chip({ x: 380, y: 130 + i * 84, text, color: i === 2 ? 'orange' : 'aqua', size: 24 });
          tl.at(stage.appendChild(c.el), [.4, 4.7, 6.6][i], { from: 'left' });
        });
        const exp = P.box({ x: 820, y: 120, w: 380, h: 150, label: '데이터 내보내기', sub: '설정 → 개인정보 → 내보내기', accent: 'ink', icon: P.ICON.save });
        tl.at(stage.appendChild(exp.el), 9.2, { from: 'right' });
        const link = P.chip({ x: 820, y: 296, text: '메일 링크는 24시간 뒤 만료', color: 'orange', size: 20 });
        tl.at(stage.appendChild(link.el), 9.8, { from: 'pop' });
        const final = P.text({ x: 380, y: 450, w: 820, text: '학교 팀 계정은 <em>소유자만</em> 내보낼 수 있어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.3 || t > 8.8);
            exp.on(t > 9.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '은퇴 달력 점검표',
    desc: '기준 날짜를 옮기면 모델마다 상태가 <b>현역 → 지원 중단 예고 → 은퇴</b>로 바뀌어요. "오늘(2026-10-05)로 점검"을 누르고, 점검할 모델을 골라 체크리스트도 따라가 보세요.',
    mount(el, P) {
      const D = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) / 86400000; };
      const fmt = n => new Date(n * 86400000).toISOString().slice(0, 10);
      const START = D('2026-09-01'), END = D('2027-10-01'), TODAY = D('2026-10-05');
      const MODELS = [
        { id: 'sora-2', who: 'OpenAI', notice: '2026-03-24', retire: '2026-09-24', repl: '대체 모델 표기 없음' },
        { id: 'claude-sonnet-4-5-20250929', who: 'Anthropic', notice: '2026-09-30', retire: '2026-11-30', repl: 'claude-sonnet-5-5' },
        { id: 'gpt-5.1', who: 'OpenAI', notice: '2026-10-01', retire: '2027-04-01', repl: 'gpt-6-sol' },
        { id: 'gpt-5.4-nano', who: 'OpenAI', notice: '2026-10-01', retire: '2027-04-01', repl: 'gpt-6-luna' },
        { id: 'claude-sonnet-5-5', who: 'Anthropic', notice: null, earliest: '2027-09-28', repl: '' }
      ];
      let day = START, pick = MODELS[1].id;

      const dateLab = P.h('label', { for: 'sim-day', class: 'sim-day-l' });
      const range = P.h('input', { type: 'range', id: 'sim-day', min: '0', max: String(END - START), step: '1', value: '0', class: 'sim-range' });
      range.addEventListener('input', () => { day = START + +range.value; render(); });
      const todayBtn = P.h('button', { class: 'btn primary', type: 'button' }, '오늘(2026-10-05)로 점검');
      todayBtn.addEventListener('click', () => { day = TODAY; range.value = String(TODAY - START); render(); });
      const table = P.h('div', { class: 'sim-table', 'aria-live': 'polite' });
      const sel = P.h('select', { id: 'sim-pick' }, ...MODELS.map(m => P.h('option', { value: m.id }, m.id)));
      sel.value = pick;
      sel.addEventListener('change', () => { pick = sel.value; renderChecks(); });
      const checks = P.h('div', { class: 'sim-checks' });
      const foot = P.h('p', { class: 'sim-foot' }, '날짜는 2026-10-05 기준 OpenAI·Anthropic의 API 지원 중단 문서에서 가져왔어요. 앱 화면의 일정은 각 회사 공지에서 따로 확인하세요.');

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-rangebar' }, dateLab, range),
        P.h('div', { class: 'sim-btns' }, todayBtn),
        table,
        P.h('div', { class: 'sim-pickbar' }, P.h('label', { for: 'sim-pick', class: 'sim-pick-l' }, '점검할 모델'), sel),
        checks, foot
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-rangebar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .sim-day-l{font-weight:800;font-size:14px;font-family:var(--mono);white-space:nowrap}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        .sim-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-table{display:flex;flex-direction:column;gap:6px}
        .sim-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#fff;font-size:13px}
        .sim-id{font-family:var(--mono);font-size:12.5px;font-weight:700;word-break:break-all;min-width:0;flex:1 1 200px}
        .sim-who{color:var(--muted);font-size:12px}
        .sim-st{border-radius:999px;padding:3px 10px;font-weight:800;font-size:12px;white-space:nowrap}
        .sim-st.live{background:var(--aqua-pale);color:var(--aqua-deep)}
        .sim-st.dep{background:var(--orange-pale);color:#B3520F}
        .sim-st.ret{background:#1B1F24;color:#fff}
        .sim-st.maybe{background:var(--paper);color:var(--muted)}
        .sim-d{font-family:var(--mono);font-size:12px;color:var(--muted)}
        .sim-pickbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-pick-l{font-weight:700;font-size:14px}
        #sim-pick{max-width:100%;min-width:0}
        .sim-checks{display:flex;flex-direction:column;gap:6px;border:1px dashed var(--line);border-radius:12px;padding:10px 12px;font-size:13.5px}
        .sim-checks .sim-ck{display:flex;align-items:center;gap:8px}
        .sim-checks .sim-repl{font-size:12.5px;color:var(--muted)}
        .sim-foot{font-size:12.5px;color:var(--muted);margin:0}
      ` }));

      function status(m) {
        if (!m.notice) {
          return day >= D(m.earliest)
            ? { cls: 'maybe', text: '은퇴 가능 시기, 공지 확인', d: `빨라도 ${m.earliest} 이후` }
            : { cls: 'live', text: '현역', d: `은퇴는 빨라도 ${m.earliest}` };
        }
        const n = D(m.notice), r = D(m.retire);
        if (day < n) return { cls: 'live', text: '현역', d: `공지 ${m.notice}` };
        if (day < r) return { cls: 'dep', text: '지원 중단 예고', d: `은퇴까지 D-${r - day} (${m.retire})` };
        return { cls: 'ret', text: '은퇴', d: `${m.retire}부터 요청 실패` };
      }
      function render() {
        dateLab.textContent = `기준 날짜: ${fmt(day)}`;
        table.replaceChildren(...MODELS.map(m => {
          const s = status(m);
          return P.h('div', { class: 'sim-row' },
            P.h('span', { class: 'sim-id' }, m.id),
            P.h('span', { class: 'sim-who' }, m.who),
            P.h('span', { class: `sim-st ${s.cls}` }, s.text),
            P.h('span', { class: 'sim-d' }, s.d));
        }));
        renderChecks();
      }
      function renderChecks() {
        const m = MODELS.find(x => x.id === pick);
        const s = status(m);
        const items = ['대체 모델로 같은 과제 미리 돌리기', '수업 자료의 모델 이름 고치기', '대화 기록 내보내기'];
        checks.replaceChildren(
          P.h('div', { class: 'sim-repl' }, `${m.id} · 지금 상태: ${s.text}${m.repl ? ' · 대체: ' + m.repl : ''}`),
          ...items.map((t, i) => {
            const id = `sim-ck-${i}`;
            return P.h('label', { class: 'sim-ck', for: id }, P.h('input', { type: 'checkbox', id }), t);
          })
        );
      }
      render();
    }
  },

  teacherLines: [
    'AI 모델에도 <b>은퇴 날짜</b>가 있어요. 정식 모델은 보통 몇 달 전에 미리 알려 줘요.',
    '수업에 AI 결과를 쓸 땐 <b>날짜와 모델 이름</b>을 같이 적어 두면, 모델이 바뀌어도 다시 확인할 수 있어요.'
  ],
  tip: {
    body: '업무에 쓰는 AI의 공지 메일과 \'지원 중단\' 문서를 학기마다 한 번 확인하고, 은퇴 예고가 뜨면 <b>은퇴일 전에 대체 모델로 같은 과제</b>를 미리 돌려 보세요.',
    extra: '아끼는 대화 기록은 미리 내보내 두세요. Claude는 설정 → 개인정보 → 데이터 내보내기로 받고, 메일로 온 링크는 24시간 뒤 만료돼요. 학교 팀 계정은 소유자만 내보낼 수 있어요.'
  },
  myth: {
    myth: '돈 내고 쓰는 정식 모델은 언제까지나 그대로 쓸 수 있다.',
    fact: '정식 모델도 은퇴해요. 회사들은 최소 60일(Anthropic)에서 6개월(OpenAI 정식 모델) 전에 알리고, 은퇴일이 지나면 그 모델 ID로 보낸 요청은 실패해요.'
  },
  sources: [
    { title: 'OpenAI API: Deprecations', url: 'https://developers.openai.com/api/docs/deprecations', note: '고지 기간 정책(정식 6개월·특화 3개월·미리보기 약 2주), Sora 2 API 2026-03-24 공지 → 09-24 종료, 10-01 공지.' },
    { title: 'Claude Docs: Model deprecations', url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations', note: '수명주기 4단계, 공개 모델 최소 60일 고지, Sonnet 4.5 → 2026-11-30 은퇴, 은퇴 이유와 단점.' },
    { title: 'Claude Help: Export your Claude data (2026-07-08 갱신)', url: 'https://support.claude.com/en/articles/9450526-export-your-claude-data', note: '설정 → 개인정보 → 내보내기, 링크 24시간 만료, 팀은 Primary Owner만.' },
    { title: 'Anthropic: Commitments on model deprecation and preservation (2025-11-04)', url: 'https://www.anthropic.com/research/deprecation-commitments', note: '공개 출시한 모든 모델의 가중치 보존 약속.' }
  ],
  script: `9월 24일 OpenAI의 Sora 2 API가 6개월 전 공지대로 종료됐어요. 9월 30일엔 Anthropic이 Claude Sonnet 4.5를 11월 30일에, 10월 1일엔 OpenAI가 GPT-5.1 등을 내년 4월 1일에 API에서 은퇴시킨다고 알렸어요.

모델에도 일생이 있어요. 현역, 업데이트가 끝난 레거시, 대체 모델과 은퇴일이 정해진 지원 중단, 그리고 요청이 실패하는 은퇴예요. 지원 중단은 은퇴 예고라고 보면 돼요.

고지 기간도 정해져 있어요. OpenAI는 정식 모델 최소 6개월, Anthropic은 공개 모델 최소 60일이에요. Anthropic은 새 모델을 위한 처리 용량 때문에 은퇴시킨다고 밝히고, 가중치는 보존하겠다고 약속했어요.

그러니 수업 자료엔 날짜와 모델 이름을 적고, 은퇴일 전에 대체 모델로 같은 과제를 돌려 보세요. 아끼는 대화 기록은 미리 내보내요.`
};
