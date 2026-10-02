/* V2-S5-35 내 기기 안에서 도는 AI는 무엇이 다를까: 소형 모델과 온디바이스 추론 */
export default {
  slug: 'v5-on-device',
  track: 'S5',
  title: '내 기기 안에서 도는 AI는 무엇이 다를까',
  subtitle: '소형 모델과 온디바이스 추론',
  summary: '비행기 모드인데도 받아쓰기와 요약이 돼요. 휴대폰·노트북 안에서 돌아가는 소형 모델이 어떻게 작아졌는지(양자화·희소 활성화·플래시 저장), 그리고 글이 기기 밖으로 나가지 않는다는 개인정보 이점을 공식 문서로 짚어요.',
  keywords: ['온디바이스 AI', '엣지 컴퓨팅', '소형 언어 모델', '양자화', '희소 활성화', 'NPU', '오프라인', '개인정보', 'Gemma', 'Gemini Nano'],

  scenes: [
    {
      title: '비행기 모드인데도 돼요', dur: 13,
      captions: [
        { t: 0, text: '비행기 모드로 인터넷을 끊었는데, <em>받아쓰기</em>와 <em>요약</em>은 되고 오늘 뉴스는 못 찾아요.' },
        { t: 5, text: '휴대폰 안에서 도는 작은 AI 모델이 이 차이를 만들어요.' },
        { t: 9.3, text: '오늘은 이 모델이 어떻게 작아졌는지, 무엇이 다른지 살펴봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 320, pose: 'oops' });
        stage.append(q.el);
        const chip = P.chip({ x: 340, y: 90, text: '비행기 모드 켜짐', color: 'ink', size: 20 });
        tl.at(stage.appendChild(chip.el), .3, { from: 'up' });
        const cards = [
          ['받아쓰기', '됨', 'aqua', P.ICON.check],
          ['요약', '됨', 'aqua', P.ICON.check],
          ['오늘 뉴스 질문', '안 됨', 'orange', P.ICON.x]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340 + i * 300, y: 180, w: 270, h: 130, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), 1.4 + i * 1.1, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 340, y: 420, w: 880, text: '같은 휴대폰인데, 어떤 일은 인터넷 없이도 되고 어떤 일은 안 돼요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 7.6, { from: 'up' });
        const small = P.text({ x: 340, y: 480, w: 880, text: '기기 안에서 끝나는 처리와, 서버가 있어야 되는 처리가 나뉘어 있어서예요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(small.el), 8.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            cards.forEach((c, i) => c.on(t > 1.4 + i * 1.1));
          }
        };
      }
    },
    {
      title: '두 갈래 길', dur: 14,
      captions: [
        { t: 0, text: '질문을 서버로 보내면 인터넷을 거쳐 데이터센터까지 가서 답이 와요.' },
        { t: 5, text: '온디바이스 AI는 질문이 기기 안의 NPU(인공지능 계산 전용 칩)에서 바로 처리돼요.' },
        { t: 9.5, text: '2026년 안드로이드 공식 문서는 이 방식이 서버 호출을 없애고 민감한 데이터를 기기 안에 둔다고 설명해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 290, pose: 'think' });
        stage.append(q.el);
        const cloud = [
          ['질문', '', 'ink'], ['인터넷', '', ''], ['데이터센터', '', 'orange'], ['답', '', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340 + i * 230, y: 70, w: 190, h: 90, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' });
          return b;
        });
        const device = [
          ['질문', '', 'ink'], ['기기 안 칩(NPU)', '', 'aqua'], ['답', '', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340 + i * 300, y: 230, w: 260, h: 100, label, sub, accent: acc, icon: i === 1 ? P.ICON.plug : '' });
          tl.at(stage.appendChild(b.el), 4.6 + i * .5, { from: 'up' });
          return b;
        });
        const arrowsCloud = [0, 1, 2].map(i => P.arrow(lines, { x1: 530 + i * 230, y1: 115, x2: 570 + i * 230, y2: 115, width: 4, color: '#9AA5AF' }));
        const arrowsDevice = [0, 1].map(i => P.arrow(lines, { x1: 600 + i * 300, y1: 280, x2: 640 + i * 300, y2: 280, width: 4, color: '#127E90' }));
        const chips = [
          ['서버 호출 없음', 340], ['글이 기기 밖으로 안 나가요', 580], ['오프라인 가능', 940]
        ].map(([t2, x], i) => {
          const c = P.chip({ x, y: 370, text: t2, color: 'aqua', size: 20 });
          tl.at(stage.appendChild(c.el), 9.8 + i * .4, { from: 'pop' });
          return c;
        });
        const final = P.text({ x: 340, y: 440, w: 880, text: '프롬프트가 기기에서 끝나면, 추론 비용과 지연도 함께 줄어요.', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, (t > .3 && t < 4.4) || (t > 4.6 && t < 9.3));
            cloud.forEach((b, i) => b.on(t > .3 + i * .5));
            device.forEach((b, i) => b.on(t > 4.6 + i * .5));
            arrowsCloud.forEach((a, i) => a.draw(P.clamp((t - (1 + i * .5)) / .5, 0, 1)));
            arrowsDevice.forEach((a, i) => a.draw(P.clamp((t - (5.3 + i * .5)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '작게 만드는 세 가지 방법', dur: 14,
      captions: [
        { t: 0, text: '숫자 하나를 16비트 대신 2비트로 줄이는 <em>양자화</em>예요. 2025년 애플 기기 내 모델이 이 방식으로 압축됐어요.' },
        { t: 5, text: '2026년 애플 3세대 모델은 20B 중 <em>1~4B만 깨우고</em> 나머지는 플래시(저장소)에 보관해요.' },
        { t: 9.5, text: 'Gemma 3n은 마트료시카 구조와 층별 임베딩 캐시로, 전체 파라미터는 더 많아도 <em>유효 파라미터 약 2B</em>로 돌아가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const cards = [
          ['양자화', '숫자 하나를 16비트 → 2비트로<br>애플 기기 내 모델(2025)', 'aqua'],
          ['희소 활성화', '20B 중 1~4B만 활성<br>나머지는 플래시에 보관(2026)', 'orange'],
          ['마트료시카 구조', '필요할 때 일부 파라미터만 켜고<br>층별 임베딩은 캐시(Gemma 3n)', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340 + i * 300, y: 110, w: 270, h: 180, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * 1.6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 440, w: 880, text: '작은 모델은 숫자를 줄이고, 필요할 때 일부만 깨워서 휴대폰에 들어가요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 11, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            cards.forEach((c, i) => c.on(t > .3 + i * 1.6));
          }
        };
      }
    },
    {
      title: '2026년 지금', dur: 13,
      captions: [
        { t: 0, text: '2026년 4월, 구글 Gemma 4의 E2B·E4B가 AICore 개발자 프리뷰로 나왔어요. 이전보다 최대 4배 빠르고 배터리를 최대 60% 덜 써요.' },
        { t: 5.5, text: '2026년 6월, 애플 3세대 모델은 기기 안에 3B 조밀 모델과, 요청에 따라 1~4B만 켜는 20B 희소 모델을 함께 올렸어요.' },
        { t: 9.8, text: '모바일 칩과 작은 모델이 같이 좋아지면서, 기기 안에서 할 수 있는 일이 늘고 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'wave' });
        stage.append(q.el);
        const a = P.box({ x: 360, y: 110, w: 400, h: 160, label: '2026-04 · Gemma 4', sub: 'E2B·E4B, AICore 개발자 프리뷰<br>이전보다 최대 4배 빨라요<br>배터리 최대 60% 덜 써요', accent: 'aqua' });
        const b = P.box({ x: 800, y: 110, w: 400, h: 160, label: '2026-06 · 애플 3세대', sub: '기기 안 3B 조밀 모델 +<br>20B 중 1~4B만 켜는 희소 모델<br>전체는 플래시에 저장', accent: 'orange' });
        tl.at(stage.appendChild(a.el), .3, { from: 'up' });
        tl.at(stage.appendChild(b.el), 5.8, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 760, y1: 190, x2: 800, y2: 190, width: 4, color: '#1B1F24' });
        const final = P.text({ x: 360, y: 400, w: 840, text: '모바일 칩과 작은 모델이 같이 좋아지면서, 기기 안에서 할 수 있는 일이 늘어요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 9.8);
            a.on(t > .3); b.on(t > 5.8);
            arrow.draw(P.clamp((t - 6.2) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '교실 판단', dur: 13,
      captions: [
        { t: 0, text: '학생 이름이 들어간 문장 다듬기, 받아쓰기, 맞춤법은 기기 내 처리 기능을 먼저 써요.' },
        { t: 5, text: '최신 정보 찾기, 긴 추론, 영상 만들기는 서버 모델이 필요해요. 그때는 이름·학번을 지우고 보내요.' },
        { t: 9, text: '같은 휴대폰에서도 기기 처리와 서버 처리가 나뉘어 있어요. "기기 내 처리" 표시를 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'point' });
        stage.append(q.el);
        const left = P.box({ x: 360, y: 90, w: 400, h: 230, label: '기기 안이 맞는 일', sub: '학생 이름 들어간 문장 다듬기<br>받아쓰기<br>맞춤법 확인', accent: 'aqua', icon: P.ICON.check });
        const right = P.box({ x: 800, y: 90, w: 400, h: 230, label: '서버가 맞는 일', sub: '최신 정보 찾기<br>긴 추론<br>영상 만들기', accent: 'orange', icon: P.ICON.search });
        tl.at(stage.appendChild(left.el), .3, { from: 'up' });
        tl.at(stage.appendChild(right.el), 1.2, { from: 'up' });
        const final = P.text({ x: 360, y: 400, w: 840, text: '개인정보가 들어간 일은 기기 안으로, 최신 정보가 필요한 일은 이름을 빼고 서버로.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 8.6);
            left.on(t > .3); right.on(t > 1.2);
          }
        };
      }
    }
  ],

  interaction: {
    title: '어디서 처리될까 — 경로와 메모리 계산기',
    desc: '위에서 <b>할 일</b>과 <b>비행기 모드</b>를 고르고 "보내기"를 눌러 보세요. 기기 안에서 끝나는 길과 서버로 가는 길 중 하나가 밝아지고, 기기 밖으로 나간 글자 수가 나와요. 아래 계산기는 파라미터 수와 가중치 비트를 바꾸면 모델이 차지하는 메모리가 어떻게 달라지는지 보여줘요. 경로 규칙과 휴대폰 메모리 기준선은 예시 값이에요. 메모리 식은 가중치만 센 단순 계산이에요.',
    mount(el, P) {
      const TASKS = [
        { label: '학생 이름 들어간 문장 다듬기', cat: 'device', chars: 46 },
        { label: '받아쓰기', cat: 'device', chars: 128 },
        { label: '오늘 뉴스 질문', cat: 'server', chars: 16 },
        { label: '긴 수학 풀이', cat: 'server', chars: 72 }
      ];
      const sel = P.h('select', { id: 'od-task' }, TASKS.map((t, i) => P.h('option', { value: String(i) }, t.label)));
      const selLab = P.h('label', { for: 'od-task', class: 'sim-rl' }, '할 일');
      const airInput = P.h('input', { type: 'checkbox', id: 'od-air' });
      const toggleWrap = P.h('label', { class: 'od-toggle', for: 'od-air' }, airInput, '비행기 모드');
      const sendBtn = P.h('button', { class: 'btn primary', type: 'button' }, '보내기');
      const topBar = P.h('div', { class: 'sim-bar' }, selLab, sel, toggleWrap, sendBtn);

      const deviceNode = P.h('span', { class: 'od-node' }, '기기 안 칩');
      const cloudNode = P.h('span', { class: 'od-node' }, '데이터센터');
      const pathWrap = P.h('div', { class: 'od-path' },
        P.h('div', { class: 'od-lane' }, '질문', P.h('span', { class: 'od-arrow' }, '→'), deviceNode, P.h('span', { class: 'od-arrow' }, '→'), '답'),
        P.h('div', { class: 'od-lane' }, '질문', P.h('span', { class: 'od-arrow' }, '→'), cloudNode, P.h('span', { class: 'od-arrow' }, '→'), '답')
      );
      const resultText = P.h('div', { class: 'od-result' }, '아직 보내지 않았어요.');

      const pRange = P.h('input', { type: 'range', id: 'od-params', min: '1', max: '20', step: '1', value: '3' });
      const pLab = P.h('label', { for: 'od-params', class: 'sim-rl' }, '파라미터(B) ', P.h('b', {}, '3'));
      const BITS = [2, 4, 8, 16];
      const bRange = P.h('input', { type: 'range', id: 'od-bits', min: '0', max: '3', step: '1', value: '0' });
      const bLab = P.h('label', { for: 'od-bits', class: 'sim-rl' }, '가중치 비트 ', P.h('b', {}, '2'));
      const memBar = P.h('div', { class: 'od-membar' }, P.h('i', {}));
      const memText = P.h('div', { class: 'od-memtext' }, '');
      const calcWrap = P.h('div', { class: 'od-calc' },
        P.h('div', { class: 'sim-bar' }, pLab, pRange),
        P.h('div', { class: 'sim-bar' }, bLab, bRange),
        memBar, memText
      );

      el.append(P.h('div', { class: 'sim-wrap' }, topBar, pathWrap, resultText, calcWrap));
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .sim-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-rl{font-size:13px;color:var(--muted)}
        .sim-bar select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);max-width:100%}
        .sim-bar input[type=range]{width:160px;max-width:100%}
        .od-toggle{display:flex;align-items:center;gap:6px;font-size:14px;cursor:pointer}
        .od-path{display:flex;flex-direction:column;gap:10px;max-width:100%}
        .od-lane{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:14px;font-weight:700}
        .od-arrow{color:var(--muted);font-weight:400}
        .od-node{padding:7px 14px;border-radius:10px;border:2px solid var(--line);background:#fff;transition:background .25s,border-color .25s,color .25s}
        .od-node.on{background:var(--acc1);border-color:var(--acc1);color:#fff}
        .od-result{font-family:var(--mono);font-size:14px;padding:10px 12px;border-radius:10px;background:var(--paper);word-break:keep-all}
        .od-calc{display:flex;flex-direction:column;gap:10px;max-width:100%;border-top:1px solid var(--line);padding-top:12px}
        .od-membar{height:10px;border-radius:999px;background:var(--paper);overflow:hidden}
        .od-membar i{display:block;height:100%;width:2%;background:var(--acc2);transition:width .3s}
        .od-memtext{font-family:var(--mono);font-size:13px;color:var(--muted)}
      `
      }));

      function send() {
        const t = TASKS[+sel.value];
        deviceNode.classList.remove('on'); cloudNode.classList.remove('on');
        if (airInput.checked && t.cat === 'server') {
          resultText.textContent = '인터넷 없음: 처리 불가';
          return;
        }
        if (t.cat === 'device') {
          deviceNode.classList.add('on');
          resultText.textContent = '기기 밖으로 나간 글자: 0자';
        } else {
          cloudNode.classList.add('on');
          resultText.textContent = `${t.chars}자(서버로 전송)`;
        }
      }
      sendBtn.addEventListener('click', send);

      function renderMem() {
        const params = +pRange.value;
        const bits = BITS[+bRange.value];
        pLab.querySelector('b').textContent = String(params);
        bLab.querySelector('b').textContent = String(bits);
        const gb = params * bits / 8;
        const pct = P.clamp(gb / 8 * 100, 2, 100);
        memBar.firstChild.style.width = pct + '%';
        memText.textContent = `${params}B × ${bits}비트 = ${gb.toFixed(2)}GB (휴대폰 메모리 예시 8GB 기준)`;
      }
      pRange.addEventListener('input', renderMem);
      bRange.addEventListener('input', renderMem);
      renderMem();
    }
  },

  teacherLines: [
    '온디바이스 AI는 <b>내 글이 기기 밖으로 나가지 않고</b> 처리돼요. 그래서 인터넷이 없어도 돼요.',
    '작은 모델은 <b>숫자를 줄이고 필요한 부분만 깨워서</b> 휴대폰에 들어가요.'
  ],
  tip: {
    body: '학생 이름·상담 메모처럼 민감한 문장을 다듬을 때는 기기 내 처리 기능을 먼저 쓰세요. 기능 설명에 "기기 내 처리" 또는 "오프라인 사용 가능" 표시가 있는지 보고, 비행기 모드에서 한 번 실행해 보면 확실해요.',
    extra: '최신 정보 검색이나 긴 추론은 서버 모델이 필요해요. 그때는 이름·학번 같은 식별 정보를 지운 뒤 보내요.'
  },
  myth: {
    myth: '휴대폰 안의 AI 기능은 전부 휴대폰 안에서 처리된다.',
    fact: '기기 내 모델이 처리하는 기능과 서버(예: 애플의 Private Cloud Compute)로 보내는 기능이 나뉘어 있어요. 비행기 모드에서 되는지로 처리 위치를 가늠할 수 있어요.'
  },
  sources: [
    { title: 'Gemini Nano: on-device generative AI (Android Developers, 2026 갱신)', url: 'https://developer.android.com/ai/gemini-nano', note: '온디바이스 생성형 AI는 서버 호출 없이 기기에서 프롬프트를 실행해 개인정보를 지키고 오프라인으로 동작해요.' },
    { title: "Introducing the Third Generation of Apple's Foundation Models (Apple Machine Learning Research, 2026)", url: 'https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models', note: '기기 내 3B 조밀 모델과, 1~4B만 활성화하는 20B 희소 모델을 플래시에 저장하는 구조를 설명해요.' },
    { title: 'Gemma 3n overview (Google AI for Developers)', url: 'https://ai.google.dev/gemma/docs/gemma-3n', note: '마트료시카 구조와 층별 임베딩 캐시로 유효 파라미터를 약 2B까지 줄이는 방법을 설명해요.' },
    { title: 'Announcing Gemma 4 in the AICore Developer Preview (Android Developers Blog, 2026)', url: 'https://android-developers.googleblog.com/2026/04/AI-Core-Developer-Preview.html', note: 'Gemma 4의 E2B·E4B가 이전보다 최대 4배 빠르고 배터리를 최대 60% 덜 쓴다고 밝혔어요.' }
  ],
  script: `비행기 모드인데도 받아쓰기와 요약은 되고 오늘 뉴스는 못 찾은 적 있으시죠. 휴대폰 안에서 도는 작은 AI가 이 차이를 만들어요. 서버로 보내면 데이터센터까지 다녀와야 답이 오지만, 온디바이스 AI는 기기 안 NPU에서 바로 처리돼요. 안드로이드 공식 문서는 이 방식이 서버 호출을 없애고 민감한 데이터를 기기 안에 둔다고 밝혀요.

작은 모델은 숫자 하나를 16비트 대신 2비트로 줄이는 양자화, 모델 일부만 깨우는 희소 활성화로 줄어요. 2026년 애플 3세대는 20B 중 1~4B만 켜고 나머지는 플래시에 두고, Gemma 3n은 유효 파라미터를 약 2B로 줄여요. 같은 해 4월 Gemma 4는 이전보다 최대 4배 빠르고 배터리를 최대 60% 덜 써요.

그래서 이름 다듬기나 받아쓰기처럼 개인정보 섞인 일은 기기 내 처리를 먼저 쓰고, 최신 검색이나 긴 추론은 이름을 지우고 서버로 보내요.`
};
