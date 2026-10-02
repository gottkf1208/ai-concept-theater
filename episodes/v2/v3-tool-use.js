/* S3-20 [트랙 S3] 계산과 검색은 왜 도구에 맡길까: 도구 호출과 지식 마감 */
export default {
  slug: 'v3-tool-use',
  track: 'S3',
  title: '계산과 검색은 왜 도구에 맡길까',
  subtitle: '도구 호출(function calling)과 지식 마감',
  summary: '학급비 나눗셈은 끝자리에서 틀리고, 공문 마감일은 작년 날짜로 답하는 AI. 숫자와 최신 정보를 다루는 한계와, 계산기·검색을 "호출"해 맡기는 왕복 구조를 3분에 담아요.',
  keywords: ['도구 호출', 'function calling', 'tool use', '계산기', '코드 실행', '웹 검색', '지식 마감', 'knowledge cutoff', 'JSON 스키마'],

  scenes: [
    {
      title: '두 개의 틀린 답', dur: 13,
      captions: [
        { t: 0, text: '학급비 <em>1,284,500원</em>을 27명이 나누면? AI가 끝자리를 바꿔 틀렸어요.' },
        { t: 5, text: '"이번 학기 공문 마감일은?"엔 <em>작년 날짜</em>로 자신 있게 답했어요.' },
        { t: 9.5, text: '숫자도 날짜도 틀렸는데, 둘 다 같은 이유일까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 70, w: 560, text: '학급비 1,284,500원을 27명이 나누면 <b>얼마씩</b>이야?', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const cards = [
          ['나눗셈 질문', 'AI 답: 47,547.07원<br>자릿수가 바뀌었어요', 'orange'],
          ['마감일 질문', 'AI 답: "2025년 10월 15일"<br>작년 날짜예요', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 460, y: 250, w: 430, h: 140, label, sub, accent: acc, icon: P.ICON.x });
          tl.at(stage.appendChild(b.el), 5.2 + i * 2.2, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 420, text: '"숫자도 날짜도 자신 있게 틀렸어요"', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 7.6, { from: 'pop' });
        const note = P.text({ x: 330, y: 480, w: 880, text: '둘 다 <em>비슷한 이유</em>로 흔들리고 있어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 10, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            cards.forEach((c, i) => c.on(t > 5.2 + i * 2.2));
          }
        };
      }
    },
    {
      title: '글자 기계의 한계 두 가지', dur: 14,
      captions: [
        { t: 0, text: '언어모델은 다음 <em>토큰</em>을 고르는 기계예요. 자릿수가 큰 계산은 패턴으로 풀다가 어긋나기 쉬워요.' },
        { t: 5, text: '그리고 아는 건 <em>학습한 시점</em>까지예요. 공식 문서는 이 날짜를 <em>신뢰할 수 있는 지식 마감</em>이라고 불러요.' },
        { t: 9.5, text: '예를 들어 한 모델은 신뢰 지식 마감과 학습 데이터 마감이 몇 달씩 차이 나요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const a = P.box({ x: 340, y: 100, w: 440, h: 150, label: '패턴으로 계산', sub: '다음 토큰을 고르는 방식<br>자릿수가 클수록 어긋나기 쉬워요', accent: 'aqua', icon: P.ICON.brain });
        const b = P.box({ x: 820, y: 100, w: 400, h: 150, label: '신뢰할 수 있는 지식 마감', sub: '모델의 지식이 가장 정확한 날짜<br>예: 신뢰 마감 2025년 2월 · 학습 마감 2025년 7월', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 5.2, { from: 'up' });
        const final = P.text({ x: 340, y: 420, w: 880, text: '계산도 날짜도, 모델 <em>혼자서는</em> 한계가 있어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 340, y: 480, w: 880, text: '학습 데이터 마감은 더 넓은 범위, 신뢰 지식 마감은 답이 가장 정확한 범위예요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            a.on(t > .3); b.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '호출문을 쓰고 멈춰요', dur: 14,
      captions: [
        { t: 0, text: '도구 호출(function calling)은 모델이 <em>calculator</em> 같은 구조화된 호출문을 쓰고 멈추는 거예요.' },
        { t: 5, text: '앱이 실제로 실행해서 결과를 <em>tool_result</em>로 돌려주면, 모델이 그걸로 답해요.' },
        { t: 9.5, text: '도구마다 이름·설명·입력 형식(<em>JSON 스키마</em>)이 미리 정해져 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'point' });
        stage.append(q.el);
        const boxes = [
          ['모델', 'stop_reason: tool_use'], ['tool_use 블록', 'name + input<br>(JSON 스키마)'], ['앱이 실행', '클라이언트 도구: 앱<br>서버 도구: 회사 서버'], ['tool_result', '결과를 대화에 추가']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 225, y: 100, w: 200, h: 130, label, sub, accent: i === 1 ? 'orange' : (i === 2 ? 'aqua' : 'ink') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 540 + i * 225, y1: 165, x2: 565 + i * 225, y2: 165, width: 4, color: '#1B1F24' }));
        const loop = P.arrow(lines, { x1: 1120, y1: 230, x2: 400, y2: 240, curve: 90, dashed: true, width: 3, color: '#F2812D' });
        const loopLab = P.chip({ x: 620, y: 290, text: '모델은 직접 계산하지 않고, 호출문만 써요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(loopLab.el), 5.4, { from: 'pop' });
        const final = P.text({ x: 340, y: 400, w: 880, text: '도구마다 이름·설명·입력 형식이 <em>미리 정해져</em> 있어요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.7, { from: 'up' });
        const small = P.text({ x: 340, y: 460, w: 880, text: '그 형식이 JSON 스키마예요. 모델은 그 틀에 맞춰 호출문을 채워요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 10.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.2 + i * .9)) / .5, 0, 1)));
            loop.draw(P.clamp((t - 4.4) / .9, 0, 1));
            boxes.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    },
    {
      title: '언제 무엇을 부르나', dur: 13,
      captions: [
        { t: 0, text: '최근 뉴스·가격·일정처럼 바뀌는 정보는 <em>검색</em>을 불러요. 결과엔 출처가 항상 붙어요.' },
        { t: 5, text: '정확한 계산·통계는 <em>코드 실행</em>, 인터넷 연결이 없는 격리된 상자 안에서 돌아가요.' },
        { t: 9, text: '확립된 사실·수학 기초·창작은 도구 없이 <em>바로 답</em>해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'wave' });
        stage.append(q.el);
        const boxes = [
          ['검색', '최근 사건·가격·일정<br>인용이 항상 켜져 있어요', 'aqua', P.ICON.search],
          ['코드 실행', '정확한 계산·통계<br>인터넷 없는 샌드박스', 'ink', P.ICON.check],
          ['바로 답', '확립된 사실·창작·인사<br>도구 없이 즉시', '', P.ICON.doc]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340 + i * 300, y: 110, w: 270, h: 160, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 450, w: 880, text: '무엇을 부를지는 질문의 <em>성격</em>이 정해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8);
            boxes.forEach((b, i) => b.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: '흔적을 확인해요', dur: 13,
      captions: [
        { t: 0, text: '검색을 썼다면 <em>출처 링크</em>와 <em>페이지 갱신 날짜</em>가 같이 붙어요.' },
        { t: 4.5, text: '계산을 썼다면 식이나 코드 블록 같은 흔적이 보여요.' },
        { t: 8.5, text: '흔적 없이 나온 큰 숫자와 최신 날짜는 한 번 더 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 출처 링크 확인', '검색 답이면 링크가 있는지'],
          ['② 페이지 날짜 확인', 'page_age로 최신인지'],
          ['③ 식·코드 블록 확인', '계산 답이면 과정이 보이는지'],
          ['④ 큰 숫자 검산', '흔적 없으면 계산기로']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: i === 0 ? 'aqua' : (i === 3 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 430, w: 770, text: '흔적이 없는 숫자와 날짜는 <em>한 번 더</em> 확인해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.4);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '도구 호출 왕복 보기',
    desc: '질문을 고르고 "도구 켜기"를 켠 채 <b>보내기</b>를 눌러 보세요. 모델 판단 → 호출 미리보기 → 실행 결과 → 최종 답이 차례로 쌓여요. 도구를 끄면 추정 오답이나 "흔적 없음" 배지가 나와요. 같은 입력은 항상 같은 결과예요.',
    mount(el, P) {
      const QUESTIONS = [
        { id: 'div', label: '1,284,500 ÷ 27 (학급비 나누기)', kind: 'calc', expr: '1284500/27', correct: '47,574.07', wrong: '47,547.07' },
        { id: 'deadline', label: '이번 주 교육청 연수 신청 마감일', kind: 'search' },
        { id: 'photo', label: '광합성을 초3 수준으로 설명', kind: 'direct' },
        { id: 'mul', label: '37,489 × 6,213', kind: 'calc', expr: '37489*6213', correct: '232,919,157', wrong: '232,918,157' }
      ];
      let qId = QUESTIONS[0].id;
      let toolOn = true;

      const sel = P.h('select', { id: 'sim-q' }, ...QUESTIONS.map(q => P.h('option', { value: q.id }, q.label)));
      sel.value = qId;
      sel.addEventListener('change', () => { qId = sel.value; render(); });
      const selLab = P.h('label', { for: 'sim-q', class: 'sim-l' }, '질문');
      const toggle = P.h('input', { type: 'checkbox', id: 'sim-tool', checked: true });
      const toggleLab = P.h('label', { for: 'sim-tool', class: 'sim-toggle' }, toggle, ' 도구 켜기');
      toggle.addEventListener('change', () => { toolOn = toggle.checked; render(); });
      const sendBtn = P.h('button', { class: 'btn primary', type: 'button' }, '보내기');
      const log = P.h('div', { class: 'sim-log' });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-top' }, selLab, sel, toggleLab, sendBtn),
        log
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-l{font-size:13px;color:var(--muted)}
        .sim-top select{max-width:100%}
        .sim-toggle{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
        .sim-log{display:flex;flex-direction:column;gap:8px;min-height:40px}
        .sim-step{border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:13px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .sim-step .sim-mono{font-family:var(--mono);font-size:12px;color:var(--muted);word-break:break-all}
        .sim-step.final{border-color:var(--acc1);background:#f3fbfc}
        .sim-badge{font-size:11px;padding:2px 8px;border-radius:999px;background:var(--paper);color:var(--muted);white-space:nowrap}
        .sim-badge.ok{background:#eafaf4;color:#0d7a53}
        .sim-badge.warn{background:#fff2e6;color:#b25400}
      ` }));

      function run() {
        const q = QUESTIONS.find(x => x.id === qId);
        log.innerHTML = '';
        /* ① 모델 판단 */
        let judge;
        if (q.kind === 'direct') judge = '안정된 지식이에요 → 바로 답';
        else if (q.kind === 'calc') judge = toolOn ? '계산이 필요해요 → calculator' : '계산이 필요해요 (도구 꺼짐)';
        else judge = toolOn ? '최신 정보가 필요해요 → web_search' : '최신 정보가 필요해요 (도구 꺼짐)';
        log.append(P.h('div', { class: 'sim-step' }, P.h('span', {}, '① 모델 판단'), P.h('span', { class: 'sim-mono' }, judge)));

        if (q.kind === 'direct') {
          log.append(P.h('div', { class: 'sim-step final' }, P.h('span', {}, '④ 최종 답 · 광합성은 빛·물·이산화탄소로 양분과 산소를 만드는 과정이에요'), P.h('span', { class: 'sim-badge' }, '도구 없음 · 안정 지식')));
          return;
        }
        if (!toolOn) {
          const badge = q.kind === 'calc' ? '추정 · 흔적 없음' : '출처 없음 · 학습 시점 기준';
          const answer = q.kind === 'calc' ? q.wrong : '"마감일은 지난번과 같을 거예요"(최신 아님)';
          log.append(P.h('div', { class: 'sim-step final' }, P.h('span', {}, `④ 최종 답 · ${answer}`), P.h('span', { class: 'sim-badge warn' }, badge)));
          return;
        }
        /* ② 호출 미리보기 */
        const toolName = q.kind === 'calc' ? 'calculator' : 'web_search';
        const preview = q.kind === 'calc' ? `{"name":"calculator","input":{"expression":"${q.expr}"}}` : `{"name":"web_search","input":{"query":"교육청 연수 신청 마감일"}}`;
        log.append(P.h('div', { class: 'sim-step' }, P.h('span', {}, '② 호출 미리보기'), P.h('span', { class: 'sim-mono' }, preview)));
        /* ③ 실행 결과 */
        let execResult;
        if (q.kind === 'calc') {
          const val = Function(`"use strict"; return (${q.expr});`)();
          execResult = `${toolName} 실행 → ${val.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}`;
        } else {
          execResult = 'web_search 실행 → 교육청 공지 1건 (page_age: 2일 전)';
        }
        log.append(P.h('div', { class: 'sim-step' }, P.h('span', {}, '③ 실행 결과'), P.h('span', { class: 'sim-mono' }, execResult)));
        /* ④ 최종 답 */
        const finalAnswer = q.kind === 'calc' ? `한 명당 약 ${q.correct}원` : '이번 주 금요일까지예요';
        const badge = q.kind === 'calc' ? '코드 실행 흔적' : '출처 링크 1개 · page_age 2일 전';
        log.append(P.h('div', { class: 'sim-step final' }, P.h('span', {}, `④ 최종 답 · ${finalAnswer}`), P.h('span', { class: 'sim-badge ok' }, badge)));
      }
      function render() {
        log.innerHTML = '';
        log.append(P.h('div', { class: 'sim-step' }, '질문과 도구 상태를 고른 뒤 "보내기"를 눌러 보세요.'));
      }
      sendBtn.addEventListener('click', run);
      render();
    }
  },

  teacherLines: [
    'AI는 계산과 최신 정보를 <b>도구에게 시켜요</b>. 시킨 흔적이 없으면 한 번 더 확인해요.',
    'AI의 지식에는 <b>마감 날짜</b>가 있어요. 그 뒤에 생긴 일은 검색해야 알아요.'
  ],
  tip: {
    body: '정산·통계는 "<b>코드로 계산해 줘</b>"라고 콕 집어 말하고, 일정·공문처럼 바뀌는 정보는 검색을 켠 뒤 <b>출처 페이지의 날짜</b>까지 확인해요.',
    extra: '답에 출처 링크나 코드 블록이 하나도 없으면 도구를 쓰지 않은 답일 가능성이 커요. 그런 숫자는 계산기로 검산해요.'
  },
  myth: {
    myth: 'AI 안에 계산기가 들어 있어서 계산은 늘 정확하다.',
    fact: '모델은 계산기를 부르는 호출문을 쓸 뿐이고, 실제 계산은 앱이나 서버가 해요. 도구를 안 부르면 숫자도 글자 패턴으로 다뤄서 틀릴 수 있어요.'
  },
  sources: [
    { title: 'Claude Docs — Tool use with Claude', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', note: '도구 호출의 정의와 왕복 구조(tool_use → 앱 실행 → tool_result), 도구 정의 형식(name·description·input_schema).' },
    { title: 'Claude Docs — Web search tool', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool', note: '검색을 부르는 경우와 바로 답하는 경우의 기준, 인용·page_age가 항상 붙는다는 설명.' },
    { title: 'Claude Docs — Code execution tool', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool', note: '코드 실행 도구가 인터넷 연결 없는 격리된 환경(샌드박스)에서 돌아간다는 설명.' },
    { title: 'Claude Docs — Models overview', url: 'https://platform.claude.com/docs/en/about-claude/models/overview', note: '신뢰할 수 있는 지식 마감과 학습 데이터 마감의 정의, 두 날짜가 서로 다를 수 있다는 예시.' }
  ],
  script: `학급비 1,284,500원을 27명이 나누면 끝자리가 바뀐 답이, 공문 마감일엔 작년 날짜가 자신 있게 돌아온 적 있어요. 숫자도 날짜도 틀렸는데 이유는 비슷해요.

언어모델은 다음 토큰을 고르는 기계라서 자릿수가 큰 계산은 패턴으로 풀다가 어긋나기 쉬워요. 아는 건 학습한 시점까지라, 공식 문서는 이 날짜를 신뢰할 수 있는 지식 마감이라고 불러요.

그래서 계산과 최신 정보는 도구 호출로 맡겨요. 모델이 calculator나 web_search 같은 호출문을 쓰고 멈추면, 앱이 실행해 결과를 tool_result로 돌려주고 모델이 그걸로 답해요. 바뀌는 정보는 검색(출처 붙음), 계산·통계는 인터넷 없는 상자 속 코드 실행, 확립된 사실·창작은 바로 답해요.

그러니 답에 출처 링크나 식·코드 블록 같은 흔적이 있는지 보세요. 흔적 없는 큰 숫자·날짜는 검산하거나 검색으로 확인하세요.`
};
