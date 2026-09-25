/* E16 [A] 자막은 왜 가끔 엉뚱할까: 음성 인식과 번역 */
export default {
  slug: 's3-subtitle',
  track: 'A',
  title: '자막은 왜 가끔 엉뚱할까',
  subtitle: '음성 인식과 번역',
  summary: '자막 프로그램이 낸 자동 자막에서 "사회 시간"이 "사회시장"으로, 친구 이름이 엉뚱한 낱말로 나온 적 있으세요? 소리를 글자로 바꾸는 음성 인식이 왜 가끔 헛짚는지 3분에 담았어요.',
  keywords: ['자막', '음성인식', 'STT', '번역', 'Whisper', '고유명사', '동음이의어', 'Web Speech API'],

  scenes: [
    {
      title: '자막이 이상해요', dur: 13,
      captions: [
        { t: 0, text: '자막 프로그램이 "사회 시간"을 <em>"사회시장"</em>으로 잘못 썼어요.' },
        { t: 4.5, text: '친구 이름도 <em>엉뚱한 낱말</em>로 바뀌어 있었고요.' },
        { t: 9, text: '소리를 글자로 바꾸는 이 과정, 왜 가끔 헛짚을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const frame = P.box({ x: 70, y: 90, w: 560, h: 230, label: '학급 영상', sub: '자동 자막 켜짐', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(frame.el), .3, { from: 'left' });
        const capBg1 = P.h('div', { style: 'left:70px;top:340px;width:560px;height:60px;border-radius:12px;background:#1B1F24' });
        tl.at(stage.appendChild(capBg1), .8, { from: 'up' });
        const capTxt1 = P.text({ x: 70, y: 355, w: 560, text: '오늘은 <em>사회시장</em>에 지도를 그렸어요.', size: 20, weight: 700, align: 'center', color: '#fff' });
        tl.at(stage.appendChild(capTxt1.el), .8, { from: 'up' });
        const capBg2 = P.h('div', { style: 'left:70px;top:414px;width:560px;height:60px;border-radius:12px;background:#1B1F24' });
        tl.at(stage.appendChild(capBg2), 5, { from: 'up' });
        const capTxt2 = P.text({ x: 70, y: 429, w: 560, text: '오늘 발표는 <em>한소라</em> 학생이 맡았어요.', size: 20, weight: 700, align: 'center', color: '#fff' });
        tl.at(stage.appendChild(capTxt2.el), 5, { from: 'up' });
        const q = P.quokka({ x: 740, y: 300, size: 320, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 690, y: 110, w: 480, text: '"사회시장"이 뭐지? <b>친구 이름도 다르게</b> 나왔어요.', tail: 'bottom', tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9, { from: 'pop' });
        return { tick(t) { q.tick(t, t > 9); } };
      }
    },
    {
      title: '소리를 글자로 추정해요', dur: 14,
      captions: [
        { t: 0, text: '자막 AI는 소리 파형을 아주 짧은 조각으로 잘라요.' },
        { t: 5, text: '조각마다 특징을 뽑아서, <em>문맥과 함께</em> "이 소리는 어떤 글자일까"를 확률로 추정해요.' },
        { t: 10, text: 'Whisper 같은 모델은 <em>68만 시간</em>의 인터넷 음성으로 배워서 잡음과 억양에 꽤 강해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const waveWrap = P.h('div', { style: 'left:120px;top:90px;width:1040px;height:130px;border-radius:16px;border:2px solid #E4E8EC;background:#fff;display:flex;align-items:center;gap:4px;padding:0 16px;box-sizing:border-box' });
        const rnd = P.rng(3);
        for (let i = 0; i < 40; i++) {
          const hgt = Math.round(14 + rnd() * 86);
          waveWrap.append(P.h('div', { style: `width:14px;height:${hgt}px;background:${i % 2 ? '#2BB3C9' : '#127E90'};border-radius:6px` }));
        }
        tl.at(stage.appendChild(waveWrap), .3, { from: 'up' });
        const waveLbl = P.text({ x: 120, y: 232, w: 1040, text: '아주 짧은 조각으로 잘라요', size: 18, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(waveLbl.el), 1.2, { from: 'up', dist: 10 });
        const down1 = P.arrow(lines, { x1: 640, y1: 250, x2: 640, y2: 300, width: 4, color: '#1B1F24' });
        const featureBox = P.box({ x: 460, y: 305, w: 360, h: 90, label: '특징 뽑기', sub: '조각마다 소리 특징을 계산해요', accent: 'aqua' });
        tl.at(stage.appendChild(featureBox.el), 3, { from: 'pop' });
        const down2 = P.arrow(lines, { x1: 640, y1: 400, x2: 640, y2: 440, width: 4, color: '#1B1F24' });
        const probBox = P.box({ x: 390, y: 445, w: 500, h: 100, label: '확률로 추정', sub: '문맥과 함께 "어떤 글자일까"', accent: 'orange' });
        tl.at(stage.appendChild(probBox.el), 5.8, { from: 'pop' });
        const cand1 = P.chip({ x: 400, y: 570, text: '사회 시간', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(cand1.el), 8, { from: 'pop' });
        const cand2 = P.chip({ x: 610, y: 570, text: '사회시장', color: 'gray', size: 24 });
        tl.at(stage.appendChild(cand2.el), 8.4, { from: 'pop' });
        const q = P.quokka({ x: 30, y: 470, size: 210, pose: 'point' });
        stage.append(q.el);
        const note = P.text({ x: 260, y: 623, w: 900, text: 'Whisper: <em>68만 시간</em>의 인터넷 음성으로 학습(잡음·억양에 강해요)', size: 19, weight: 700 });
        tl.at(stage.appendChild(note.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10);
            down1.draw(P.clamp((t - 1) / .6, 0, 1));
            down2.draw(P.clamp((t - 4.4) / .6, 0, 1));
            if (t > 8.6) {
              cand1.el.style.transform = 'scale(1.15)'; cand1.el.style.boxShadow = '0 0 0 3px #BFE8EF';
              cand2.el.style.opacity = .45;
            }
          }
        };
      }
    },
    {
      title: '왜 헷갈릴까', dur: 14,
      captions: [
        { t: 0, text: '<em>동음이의어</em>는 헷갈리기 쉬워요. "사회 시간"과 "회사 시간"처럼 소리가 비슷하거든요.' },
        { t: 5, text: '<em>고유명사</em>도 어려워요. 학생 이름이나 학교 이름은 학습 자료에 없어서, 들어본 적 있는 그럴듯한 낱말로 바꿔 써요.' },
        { t: 10, text: '잡음, 겹치는 말, 사투리도 자막 AI를 힘들게 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const homoBox = P.box({ x: 60, y: 90, w: 520, h: 150, label: '동음이의어', sub: '소리는 같은데 뜻이 달라요', accent: 'aqua' });
        tl.at(stage.appendChild(homoBox.el), .3, { from: 'left' });
        const chip1 = P.chip({ x: 130, y: 258, text: '사회 시간 ↔ 회사 시간', color: 'aqua', size: 21 });
        tl.at(stage.appendChild(chip1.el), 1.6, { from: 'pop' });
        const properBox = P.box({ x: 640, y: 90, w: 520, h: 150, label: '고유명사', sub: '학습 자료에 없는 이름·지명', accent: 'orange' });
        tl.at(stage.appendChild(properBox.el), 5.2, { from: 'right' });
        const chip2 = P.chip({ x: 720, y: 258, text: '한소리 → 한소라', color: 'orange', size: 21 });
        tl.at(stage.appendChild(chip2.el), 6.4, { from: 'pop' });
        const noisy = [
          { x: 60, label: '잡음', sub: '배경 소리가 섞여요' },
          { x: 460, label: '겹치는 말', sub: '여러 명이 동시에 말해요' },
          { x: 860, label: '사투리', sub: '표준어와 소리가 달라요' }
        ];
        const boxes = noisy.map((n, i) => {
          const bx = P.box({ x: n.x, y: 330, w: i === 2 ? 340 : 360, h: 100, label: n.label, sub: n.sub, accent: '', icon: P.ICON.x });
          tl.at(stage.appendChild(bx.el), 9.6 + i * .3, { from: 'up' });
          return bx;
        });
        const q = P.quokka({ x: 40, y: 460, size: 200, pose: 'think' });
        stage.append(q.el);
        const note = P.text({ x: 200, y: 492, w: 1020, text: '모두 <em>그럴듯한 낱말</em>로 바꿔 쓰는 같은 원리예요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.4, { from: 'up' });
        return { tick(t) { q.tick(t, t > 10); } };
      }
    },
    {
      title: '번역도 한 번 더', dur: 13,
      captions: [
        { t: 0, text: '자막을 다른 언어로 옮기는 <em>번역</em>도 한 단계 더 있어요.' },
        { t: 5, text: '문장을 통째로 안 보고 <em>짧게 끊어서</em> 번역하면 뜻이 엉뚱해지기 쉬워요.' },
        { t: 9, text: '번역 방식은 <em>도구마다 달라요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const box1 = P.box({ x: 60, y: 260, w: 300, h: 140, label: '음성', sub: '원래 말소리', accent: 'ink' });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        const a1 = P.arrow(lines, { x1: 370, y1: 330, x2: 450, y2: 330, width: 4, color: '#1B1F24' });
        const box2 = P.box({ x: 460, y: 260, w: 300, h: 140, label: '자막(한국어)', sub: '"사회 시간"', accent: 'aqua' });
        tl.at(stage.appendChild(box2.el), 1.4, { from: 'up' });
        const a2 = P.arrow(lines, { x1: 770, y1: 330, x2: 850, y2: 330, width: 4, color: '#1B1F24' });
        const box3 = P.box({ x: 860, y: 260, w: 320, h: 140, label: '번역 결과', sub: '문맥 없이 끊어 번역', accent: 'orange' });
        tl.at(stage.appendChild(box3.el), 4.8, { from: 'right' });
        const ex = P.text({ x: 60, y: 430, w: 1120, text: '예시: "사회 시간"을 짧게 끊어 보면 "society"+"time"으로 번역될 수 있어요.', size: 21, weight: 700, align: 'center' });
        tl.at(stage.appendChild(ex.el), 6, { from: 'up' });
        const q = P.quokka({ x: 40, y: 480, size: 180, pose: 'think' });
        stage.append(q.el);
        const finalNote = P.text({ x: 210, y: 560, w: 1000, text: '번역 방식은 <em>도구마다 달라요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(finalNote.el), 9, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            a1.draw(P.clamp((t - .9) / .5, 0, 1));
            a2.draw(P.clamp((t - 4.3) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '이렇게 확인해요', dur: 13,
      captions: [
        { t: 0, text: '<em>고유명사, 숫자, 날짜</em>는 자막에서 제일 먼저 확인해요.' },
        { t: 5, text: '브라우저에도 음성 인식 기능이 있어요. <em>Web Speech API</em>라고 불러요.' },
        { t: 9.5, text: '교실에 트는 안내 자막은 <em>사람이 한 번</em> 읽어 보고 내보내요.' }
      ],
      build({ stage, lines, P, tl }) {
        const box1 = P.box({ x: 140, y: 100, w: 1000, h: 100, label: '1) 고유명사 확인', sub: '이름·지명이 맞는지', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(box1.el), .3, { from: 'up' });
        const box2 = P.box({ x: 140, y: 230, w: 1000, h: 100, label: '2) 숫자·날짜 확인', sub: '자릿수가 맞는지', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(box2.el), 2, { from: 'up' });
        const box3 = P.box({ x: 140, y: 360, w: 1000, h: 100, label: '브라우저 음성 인식도 있어요', sub: 'Web Speech API(브라우저마다 지원이 달라요)', accent: 'ink', icon: P.ICON.search });
        tl.at(stage.appendChild(box3.el), 5, { from: 'up' });
        const q = P.quokka({ x: 40, y: 480, size: 180, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 220, y: 500, w: 900, text: '안내 자막은 <b>사람이 한 번</b> 읽고 내보내요.', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.5, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9.5); } };
      }
    }
  ],

  interaction: {
    title: '오인식 자막 고치기',
    desc: '자막 프로그램이 만든 자동 자막 5줄이에요. 이상한 낱말을 눌러 보세요. <b>정답 모두 보기</b>로 한 번에 확인할 수도 있어요.',
    mount(el, P) {
      const LINES = [
        { before: '오늘은 ', wrong: '사회시장', after: '에 세계 지도를 그렸어요.', right: '사회 시간', tag: '동음이의어', tagColor: 'aqua', note: '소리가 비슷한 다른 낱말로 들었어요' },
        { before: '오늘 발표는 ', wrong: '한소라', after: ' 학생이 맡았어요.', right: '한소리', tag: '고유명사', tagColor: 'orange', note: '처음 듣는 이름이라 비슷한 낱말로 바꿨어요' },
        { before: '이번 줄넘기 기록은 ', wrong: '70회', after: '예요.', right: '17회', tag: '숫자', tagColor: 'ink', note: '자릿수를 반대로 들었어요' },
        { before: '받아쓰기 문장은 "', wrong: '아버지가방에', after: ' 들어가신다"였어요.', right: '아버지가 방에', tag: '잡음', tagColor: 'gray', note: '쉬는 순간이 짧아서 띄어쓰기를 놓쳤어요' },
        { before: '쉬는 시간 안내 방송, 다음 시간은 ', wrong: '미슬', after: ' 시간입니다.', right: '미술', tag: '잡음', tagColor: 'gray', note: '배경 소음 때문에 낱말 끝이 뭉개져 들렸어요' }
      ];
      const found = new Set();

      const wrap = P.h('div', { class: 'sim-sub' });
      const bar = P.h('div', { class: 'sim-sub-bar' });
      const counter = P.h('span', { class: 'sim-sub-counter' });
      const revealBtn = P.h('button', { class: 'btn primary', type: 'button' }, '정답 모두 보기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '다시 찾기');
      bar.append(counter, revealBtn, resetBtn);
      const list = P.h('div', { class: 'sim-sub-list', 'aria-live': 'polite' });
      wrap.append(bar, list);
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-sub-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-sub-counter{font-weight:800;font-family:var(--mono);color:var(--ink);margin-right:auto}
        .sim-sub-list{display:grid;gap:12px;margin-top:16px}
        .sim-sub-line{border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper)}
        .sim-cap{font-size:17px;line-height:1.6;word-break:keep-all}
        .sim-wrongbtn{display:inline;border:0;border-bottom:3px dashed var(--orange);background:transparent;color:#B3520F;font:inherit;font-weight:800;padding:0 2px;cursor:pointer;border-radius:4px}
        .sim-wrongbtn:hover{background:var(--orange-pale)}
        .sim-wrongbtn:focus-visible{outline:2px solid var(--aqua);outline-offset:2px}
        .sim-wrongbtn.found{border-bottom-style:solid;background:var(--orange-pale)}
        .sim-fix{margin-top:10px;padding-top:10px;border-top:1px dashed var(--line);font-size:14.5px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;color:var(--muted)}
        .sim-fix b{color:var(--ink);font-size:15.5px}
        .sim-fix .p-chip{position:static}
        .sim-fix .sim-note{width:100%;font-size:13px}
      ` });
      el.append(style);

      const lineEls = LINES.map((ln, i) => {
        const row = P.h('div', { class: 'sim-sub-line' });
        const cap = P.h('p', { class: 'sim-cap' });
        cap.append(ln.before);
        const btn = P.h('button', { class: 'sim-wrongbtn', type: 'button', 'aria-pressed': 'false', 'aria-label': `틀린 낱말: ${ln.wrong}` }, ln.wrong);
        btn.addEventListener('click', () => toggle(i));
        cap.append(btn, ln.after);
        row.append(cap);
        const fix = P.h('div', { class: 'sim-fix', hidden: '' });
        row.append(fix);
        list.append(row);
        return { row, btn, fix };
      });

      function render() {
        counter.textContent = `${LINES.length}개 중 ${found.size}개 찾음`;
        LINES.forEach((ln, i) => {
          const on = found.has(i);
          lineEls[i].btn.classList.toggle('found', on);
          lineEls[i].btn.setAttribute('aria-pressed', on ? 'true' : 'false');
          lineEls[i].fix.hidden = !on;
          if (on) {
            lineEls[i].fix.replaceChildren(
              P.h('span', {}, ln.wrong, ' → '),
              P.h('b', {}, ln.right),
              P.h('span', { class: `p-chip c-${ln.tagColor}` }, ln.tag),
              P.h('span', { class: 'sim-note' }, ln.note)
            );
          }
        });
      }
      const toggle = i => { found.has(i) ? found.delete(i) : found.add(i); render(); };
      revealBtn.addEventListener('click', () => { LINES.forEach((_, i) => found.add(i)); render(); });
      resetBtn.addEventListener('click', () => { found.clear(); render(); });
      render();
    }
  },

  teacherLines: [
    '자막 AI는 소리를 듣고 <b>가장 그럴듯한 글자</b>를 고르는 거예요. 그래서 처음 듣는 이름은 잘 틀려요.',
    '자막은 <b>이름, 숫자, 날짜</b>부터 확인해요. 거기가 제일 잘 틀리거든요.'
  ],
  tip: {
    body: '자막 검수는 <b>고유명사 → 숫자 → 동음이의어</b> 순서로 보면 놓치는 게 줄어요.',
    extra: '낯선 이름을 미리 단어장으로 등록해 두는 도구도 있어요. 다만 있고 없고는 서비스마다 갈려요.'
  },
  myth: {
    myth: '자막 AI는 소리를 그대로 받아 적는다.',
    fact: '소리를 문맥과 함께 "추정"해요. 그래서 처음 듣는 말은 아는 말로 바꿔 써요.'
  },
  sources: [
    { title: 'Radford et al., 2022 — Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)', url: 'https://arxiv.org/abs/2212.04356', note: '68만 시간의 다국어 음성 데이터를 약지도 학습해, 잡음과 억양에 강한 음성 인식 모델을 만든 연구예요.' },
    { title: 'MDN Web Docs — Web Speech API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API', note: '브라우저에 내장된 음성 인식(SpeechRecognition) API를 설명해요. 지원 범위는 브라우저마다 달라요.' }
  ],
  script: `
자막 프로그램으로 학급 영상을 만들고 자동 자막을 넣었는데, "사회 시간"이 "사회시장"으로 나온 적이 있어요. 친구 이름도 전혀 다른 낱말로 바뀌어 있었고요.

자막 AI는 소리 파형을 짧은 조각으로 잘라 특징을 뽑고, 문맥과 함께 "이 소리는 어떤 글자일까"를 확률로 추정해요. Whisper 같은 모델은 68만 시간의 인터넷 음성으로 배워서 잡음과 억양에 꽤 강해요.

그런데 동음이의어나 처음 듣는 고유명사는 여전히 약해요. 학습 자료에 없던 이름은 들어본 적 있는 그럴듯한 낱말로 바꿔 쓰거든요. 잡음, 겹치는 말, 사투리도 힘들고, 번역까지 더해지면 짧게 끊어 옮기다 뜻이 엉뚱해지기도 해요.

그러니 고유명사, 숫자, 날짜부터 먼저 확인해요. 브라우저에도 음성 인식 기능인 Web Speech API가 있으니 한번 써 보고요. 교실 안내 자막은 꼭 사람이 한 번 읽어 보고 내보내요.
`
};
