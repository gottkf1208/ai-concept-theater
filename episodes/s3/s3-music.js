/* E15 [A] 배경음악은 어떻게 만들어질까: 음악 생성과 저작권 */
export default {
  slug: 's3-music',
  track: 'A',
  title: '배경음악은 어떻게 만들어질까',
  subtitle: '음악 생성과 저작권',
  summary: "브루 영상에 배경음악을 넣으려다 '저작권 무료'가 헷갈렸던 경험에서 시작해, 소리를 토큰으로 바꿔 음악을 만드는 원리와 약관 확인·기록 습관까지 살펴봐요.",
  keywords: ['음악 생성', '코덱 토큰', 'MusicGen', '저작권', '약관', '상업적 이용', '출처 표시', 'CREDITS'],

  scenes: [
    {
      title: '이 곡, 써도 될까요', dur: 13,
      captions: [
        { t: 0, text: '오늘 브루 영상에 <em>배경음악</em>을 넣으려 했어요.' },
        { t: 5, text: '그런데 <em>저작권 무료</em>라는 말이 정확히 뭔지 헷갈렸어요.' },
        { t: 9.5, text: '이 곡, 그냥 써도 될까요? 오늘은 <em>음악 생성</em> 원리부터 살펴봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 320, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 100, w: 480, text: '브루 영상에 배경음악을 넣고 싶은데...', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const videoBox = P.box({ x: 830, y: 100, w: 380, h: 160, label: '브루 영상', sub: '배경음악 없음', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(videoBox.el), 1.4, { from: 'right' });
        const qBox = P.box({ x: 830, y: 310, w: 380, h: 160, label: '저작권 무료?', sub: '이 곡, 써도 될까요', accent: 'orange' });
        tl.at(stage.appendChild(qBox.el), 3.0, { from: 'right' });
        const arr = P.arrow(lines, { x1: 560, y1: 180, x2: 830, y2: 180, width: 4, color: '#1B1F24' });
        const chip = P.chip({ x: 830, y: 500, text: "'저작권 무료'가 정확히 뭘까요", color: 'ink', size: 22 });
        tl.at(stage.appendChild(chip.el), 9.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            arr.draw(P.clamp((t - 1.6) / .6, 0, 1));
            qBox.on(t > 3 && t < 13);
          }
        };
      }
    },
    {
      title: '소리도 토큰으로 이어 붙여요', dur: 14,
      captions: [
        { t: 0, text: '소리도 텍스트처럼 <em>작은 조각(토큰)</em>으로 잘게 나눌 수 있어요.' },
        { t: 5.5, text: 'AI는 소리를 압축한 <em>코덱 토큰</em>으로 바꾸고, 다음 소리 토큰을 확률로 이어 붙여요(MusicGen).' },
        { t: 10.5, text: '전에 본 <em>다음 단어를 확률로 고르는</em> 원리랑 똑같아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 430, size: 240, pose: 'think' });
        stage.append(q.el);
        const single = P.box({ x: 320, y: 150, w: 200, h: 150, label: '원본 소리', sub: '이어진 파형', accent: 'ink' });
        tl.at(stage.appendChild(single.el), .3, { from: 'left' });
        const arr1 = P.arrow(lines, { x1: 520, y1: 225, x2: 600, y2: 190, width: 4, color: '#1B1F24' });

        const cell = 44, gap = 8, cols = 10, stripX = 610, stripY = 140;
        const tokens = [];
        for (let i = 0; i < cols; i++) {
          const fx = stripX + i * (cell + gap);
          const f = P.box({ x: fx, y: stripY, w: cell, h: cell, accent: i % 2 ? 'aqua' : 'orange' });
          tl.at(stage.appendChild(f.el), 1.0 + i * .15, { from: 'pop' });
          tokens.push(f);
        }
        const tokLabel = P.text({ x: 610, y: 210, w: 500, text: '코덱 토큰(압축된 소리 조각)', size: 20, weight: 700, color: '#127E90' });
        tl.at(stage.appendChild(tokLabel.el), 2.6, { from: 'up' });

        const arr2 = P.arrow(lines, { x1: 840, y1: 245, x2: 840, y2: 320, width: 4, color: '#1B1F24' });
        const nextBox = P.box({ x: 610, y: 320, w: 460, h: 150, label: '다음 토큰?', sub: '확률로 이어 붙여요(MusicGen)', accent: 'orange' });
        tl.at(stage.appendChild(nextBox.el), 4.2, { from: 'up' });

        const linkChip = P.chip({ x: 610, y: 500, text: '글 쓰는 AI의 다음 단어 고르기와 같은 원리', color: 'gray', size: 20 });
        tl.at(stage.appendChild(linkChip.el), 10.8, { from: 'pop' });

        return {
          tick(t) {
            q.tick(t, t > 1 && t < 6);
            arr1.draw(P.clamp((t - .8) / .5, 0, 1));
            arr2.draw(P.clamp((t - 3.2) / .5, 0, 1));
            nextBox.on(t > 4.2 && t < 14);
          }
        };
      }
    },
    {
      title: '말로 시키면 그럴듯한 곡이', dur: 13,
      captions: [
        { t: 0, text: '텍스트로 <em>"잔잔한 피아노, 90 BPM"</em>처럼 시키면, 그럴듯한 곡이 나와요.' },
        { t: 5, text: '그런데 <em>특정 가수의 스타일</em>을 콕 집어 시키면, 학습 자료를 <em>닮을 위험</em>이 있어요.' },
        { t: 9.5, text: '그래서 장르·분위기·템포로 설명하는 게 <em>더 안전해요</em>.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 380, size: 280, pose: 'point' });
        stage.append(q.el);
        const promptGood = P.box({ x: 340, y: 90, w: 420, h: 130, label: '프롬프트', sub: '"잔잔한 피아노, 90 BPM"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(promptGood.el), .3, { from: 'left' });
        const arrGood = P.arrow(lines, { x1: 760, y1: 155, x2: 850, y2: 155, width: 4, color: '#127E90' });
        const resultGood = P.box({ x: 850, y: 90, w: 340, h: 130, label: '그럴듯한 곡', sub: '장르·분위기·템포로 설명', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(resultGood.el), 1.4, { from: 'right' });

        const promptBad = P.box({ x: 340, y: 280, w: 420, h: 130, label: '프롬프트', sub: '"OO 가수처럼"', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(promptBad.el), 5.1, { from: 'left' });
        const arrBad = P.arrow(lines, { x1: 760, y1: 345, x2: 850, y2: 345, curve: -12, dashed: true, width: 4, color: '#B3520F' });
        const resultBad = P.box({ x: 850, y: 280, w: 340, h: 130, label: '닮을 위험', sub: '학습 자료를 닮을 수 있어요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(resultBad.el), 6.2, { from: 'right' });

        const noteText = P.text({ x: 340, y: 460, w: 850, text: '장르·분위기·템포로 설명하면 <em>더 안전해요</em>.', size: 26, weight: 800 });
        tl.at(stage.appendChild(noteText.el), 9.7, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 9.5 && t < 13));
            arrGood.draw(P.clamp((t - .8) / .5, 0, 1));
            arrBad.draw(P.clamp((t - 5.6) / .5, 0, 1));
            resultGood.on(t > 1.4 && t < 5);
            resultBad.on(t > 6.2 && t < 13);
          }
        };
      }
    },
    {
      title: '약관은 나라마다, 도구마다', dur: 13,
      captions: [
        { t: 0, text: '학습 자료와 생성물의 권리는 <em>나라마다, 도구마다</em> 약관이 달라요.' },
        { t: 5, text: '그래서 <em>한국저작권위원회</em> 같은 곳의 안내를 확인해요.' },
        { t: 9, text: "학교 영상에 쓸 땐 <em>'상업적 이용 가능'</em>과 <em>'출처 표시'</em> 조건을 읽고 써요." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 380, size: 280, pose: 'think' });
        stage.append(q.el);
        const boxA = P.box({ x: 340, y: 100, w: 330, h: 150, label: '도구 A 약관', sub: '상업적 이용 가능', accent: 'aqua', icon: P.ICON.doc });
        const boxB = P.box({ x: 710, y: 100, w: 330, h: 150, label: '도구 B 약관', sub: '비상업적만 허용', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(boxA.el), .2, { from: 'left' });
        tl.at(stage.appendChild(boxB.el), .5, { from: 'right' });
        const arrA = P.arrow(lines, { x1: 505, y1: 250, x2: 560, y2: 320, width: 4, color: '#127E90' });
        const arrB = P.arrow(lines, { x1: 875, y1: 250, x2: 820, y2: 320, width: 4, color: '#B3520F' });
        const resultBox = P.box({ x: 490, y: 320, w: 340, h: 120, label: '나라마다, 도구마다 달라요', accent: 'ink' });
        tl.at(stage.appendChild(resultBox.el), 1.8, { from: 'pop' });

        const chip1 = P.chip({ x: 340, y: 480, text: '한국저작권위원회 안내 확인', color: 'ink', size: 22 });
        tl.at(stage.appendChild(chip1.el), 5.3, { from: 'pop' });
        const chip2 = P.chip({ x: 340, y: 540, text: "상업적 이용 가능?", color: 'aqua', size: 20 });
        const chip3 = P.chip({ x: 650, y: 540, text: "출처 표시 조건?", color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip2.el), 9.3, { from: 'pop' });
        tl.at(stage.appendChild(chip3.el), 9.6, { from: 'pop' });

        return {
          tick(t) {
            q.tick(t, t > 4.6 && t < 9);
            arrA.draw(P.clamp((t - 1) / .5, 0, 1));
            arrB.draw(P.clamp((t - 1.3) / .5, 0, 1));
            resultBox.on(t > 1.8 && t < 13);
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 13,
      captions: [
        { t: 0, text: '그래서 할 일은 간단해요.' },
        { t: 5, text: '도구 <em>약관을 스크린샷</em>으로 남기고, 생성한 곡도 <em>CREDITS에 기록</em>해요.' },
        { t: 9.5, text: '약관 확인과 기록, 이 두 가지만 <em>습관</em>으로 만들면 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 330, pose: 'wave' });
        stage.append(q.el);
        const steps = ['약관 스크린샷 남기기', 'CREDITS에 기록하기', '확인 후 사용하기'].map((label, i) => {
          const box = P.box({ x: 430 + i * 270, y: 140, w: 250, h: 130, label, accent: i === 2 ? 'aqua' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .6, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 680 + i * 270, y1: 205, x2: 700 + i * 270, y2: 205, width: 4, color: '#1B1F24' }));
        const chips = ['상업적 이용', '출처 표시', '권리 귀속'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 430 + i * 170, y: 320, text: c, color: i % 2 ? 'orange' : 'aqua', size: 22 }).el), 2.4 + i * .3, { from: 'pop' }));
        const final = P.text({ x: 430, y: 420, w: 790, text: 'AI 음악도 <em>약관을 읽고</em>,<br>어디서 만들었는지 <i>기록</i>해 두는 게 예의예요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.5, { from: 'up' });
        const last = P.text({ x: 430, y: 570, w: 790, text: 'CREDITS에 남기면 나중에도 확인할 수 있어요.', size: 28, weight: 800, color: '#B3520F' });
        tl.at(stage.appendChild(last.el), 9.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .6 && t < 5.5));
          }
        };
      }
    }
  ],

  interaction: {
    title: '코드 진행 반주기',
    desc: '<b>코드 진행·템포·음색</b>을 고르고 재생 버튼을 누르면 4마디 반주가 나와요. 같은 설정이면 늘 같은 소리가 나요. 아래 <b>약관 체크</b> 3개를 모두 체크하면 학교 영상에 써도 되는지 확인할 수 있어요.',
    mount(el, P) {
      const CHORDS = {
        C: [261.63, 329.63, 392.00],
        G: [196.00, 246.94, 293.66],
        Am: [220.00, 261.63, 329.63],
        F: [174.61, 220.00, 261.63]
      };
      const PROGS = {
        'C-G-Am-F': { label: 'C–G–Am–F', chords: ['C', 'G', 'Am', 'F'] },
        'C-Am-F-G': { label: 'C–Am–F–G', chords: ['C', 'Am', 'F', 'G'] },
        'Am-F-C-G': { label: 'Am–F–C–G', chords: ['Am', 'F', 'C', 'G'] }
      };
      let progKey = 'C-G-Am-F';
      let timbre = 'sine';
      let ctx = null;
      let barTimer = null;

      /* ① 코드 진행 */
      const progWrap = P.h('div', { class: 'sim-group', role: 'radiogroup', 'aria-label': '코드 진행' });
      Object.keys(PROGS).forEach((key, i) => {
        const id = `sim-prog-${i}`;
        const radio = P.h('input', { type: 'radio', name: 'sim-prog', id, value: key, checked: i === 0 ? '' : null });
        radio.addEventListener('change', () => { if (radio.checked) progKey = key; });
        progWrap.append(P.h('label', { for: id }, radio, PROGS[key].label));
      });

      /* 템포 */
      const tempoRange = P.h('input', { type: 'range', id: 'sim-tempo', min: '70', max: '140', step: '1', value: '100', 'aria-label': '템포' });
      const tempoOut = P.h('output', { for: 'sim-tempo' }, '100 BPM');
      const tempoRow = P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-tempo' }, '템포'), tempoRange, tempoOut);
      tempoRange.addEventListener('input', () => { tempoOut.textContent = `${tempoRange.value} BPM`; });

      /* ② 음색 */
      const timbreWrap = P.h('div', { class: 'sim-group', role: 'radiogroup', 'aria-label': '음색' });
      [['sine', '사인파(부드럽게)'], ['triangle', '삼각파(또렷하게)']].forEach(([val, label], i) => {
        const id = `sim-timbre-${i}`;
        const radio = P.h('input', { type: 'radio', name: 'sim-timbre', id, value: val, checked: i === 0 ? '' : null });
        radio.addEventListener('change', () => { if (radio.checked) timbre = val; });
        timbreWrap.append(P.h('label', { for: id }, radio, label));
      });

      const statusOut = P.h('output', { class: 'sim-status' }, '대기 중');
      const playBtn = P.h('button', { type: 'button', class: 'btn primary' }, '재생');
      const actions = P.h('div', { class: 'sim-actions' }, playBtn, statusOut);

      const ruleNote = P.h('p', { class: 'sim-rulenote' }, "이건 규칙으로 만든 반주예요. AI 음악 생성은 확률로 '다음 소리 토큰'을 고른다는 점이 달라요.");

      /* 약관 체크 */
      const CHECKS = ['상업적 이용 가능', '출처 표시 조건', '생성물 권리 귀속 확인'];
      const checkWrap = P.h('div', { class: 'sim-checks' }, P.h('h4', {}, '약관 체크'));
      const checkboxes = CHECKS.map((label, i) => {
        const id = `sim-check-${i}`;
        const box = P.h('input', { type: 'checkbox', id });
        box.addEventListener('change', updateChecks);
        checkWrap.append(P.h('label', { class: 'sim-checklabel', for: id }, box, label));
        return box;
      });
      const okBanner = P.h('p', { class: 'sim-ok', hidden: '' }, '학교 영상에 써도 괜찮아요(약관 저장해 두기)');
      checkWrap.append(okBanner);
      function updateChecks() {
        const all = checkboxes.every(b => b.checked);
        okBanner.hidden = !all;
      }

      const controlsCol = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '① 코드 진행'), progWrap,
        tempoRow,
        P.h('h4', {}, '② 음색'), timbreWrap,
        actions,
        ruleNote
      );
      const wrap = P.h('div', { class: 'sim-wrap' }, controlsCol, checkWrap);
      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:24px;max-width:100%}
        .sim-col{flex:1 1 320px;min-width:0;max-width:100%}
        .sim-col h4{font-size:15px;margin:16px 0 8px}
        .sim-col h4:first-child{margin-top:0}
        .sim-group{display:flex;gap:14px;flex-wrap:wrap;font-size:14px;margin-bottom:4px}
        .sim-group label{display:flex;align-items:center;gap:6px;cursor:pointer}
        .sim-row{display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap;font-weight:700;font-size:13.5px}
        .sim-row input[type=range]{flex:1 1 140px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:70px}
        .sim-actions{margin-top:16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
        .sim-status{font-weight:800;font-family:var(--mono);color:var(--aqua-deep)}
        .sim-rulenote{margin-top:14px;font-size:13px;color:var(--muted);line-height:1.5;padding:10px 12px;background:var(--paper);border-radius:12px}
        .sim-checks{flex:1 1 260px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:#fff;align-self:flex-start}
        .sim-checks h4{font-size:15px;margin:0 0 10px}
        .sim-checklabel{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;margin-bottom:8px;cursor:pointer;line-height:1.4}
        .sim-checklabel input{margin-top:3px;flex:none}
        .sim-ok{margin-top:10px;font-weight:800;color:#127E90;background:var(--aqua-pale);border-radius:10px;padding:8px 12px;font-size:13.5px}
        .sim-ok[hidden]{display:none}
      ` });
      el.append(wrap, style);

      function stopAll() {
        if (barTimer) { clearInterval(barTimer); barTimer = null; }
      }

      function play() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        stopAll();
        const bpm = +tempoRange.value;
        const beatSec = 60 / bpm;
        const barSec = beatSec * 4;
        const chordSeq = PROGS[progKey].chords;
        const now = ctx.currentTime + 0.05;
        chordSeq.forEach((name, i) => {
          const freqs = CHORDS[name];
          const t0 = now + i * barSec;
          freqs.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = timbre;
            osc.frequency.value = f;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.0001, t0);
            gain.gain.linearRampToValueAtTime(0.16, t0 + 0.04);
            gain.gain.setValueAtTime(0.16, t0 + barSec - 0.12);
            gain.gain.linearRampToValueAtTime(0.0001, t0 + barSec - 0.02);
            osc.connect(gain).connect(ctx.destination);
            osc.start(t0);
            osc.stop(t0 + barSec);
          });
        });
        /* 첫 클릭에 바로 보이는 변화 */
        statusOut.textContent = '재생 중 · 1마디';
        playBtn.disabled = true;
        let bar = 1;
        barTimer = setInterval(() => {
          bar++;
          if (bar > 4) {
            stopAll();
            statusOut.textContent = '재생 끝';
            playBtn.disabled = false;
            return;
          }
          statusOut.textContent = `재생 중 · ${bar}마디`;
        }, barSec * 1000);
      }
      playBtn.addEventListener('click', play);
    }
  },

  teacherLines: [
    'AI 음악은 <b>다음 소리 조각</b>을 확률로 이어 붙여 만들어요. 글 쓰는 AI랑 원리가 비슷해요.',
    'AI가 만든 곡도 <b>약관을 읽고, 어디서 만들었는지 적어 두는 게</b> 예의이자 규칙이에요.'
  ],
  tip: {
    body: '생성 음악을 쓰기 전에는 도구 약관에서 <b>상업적 이용·출처 표시·생성물 권리</b> 항목을 확인하고 스크린샷으로 남겨 두세요.',
    extra: '수업 영상에 쓴 곡은 CREDITS 문서에 도구 이름·생성일·약관 링크를 함께 적어 두면 나중에 확인하기 편해요.'
  },
  myth: {
    myth: 'AI가 만든 곡은 아무 데나 써도 된다.',
    fact: '도구마다, 나라마다 약관과 법이 달라요. 약관을 확인하고, 어디서 만들었는지 기록해 두세요.'
  },
  sources: [
    { title: 'MusicGen: Simple and Controllable Music Generation (arXiv, 2023)', url: 'https://arxiv.org/abs/2306.05284', note: '소리를 압축된 토큰으로 바꾸고, 트랜스포머로 다음 토큰을 이어 붙여 음악을 만드는 방식을 보여주는 연구예요.' },
    { title: '한국저작권위원회', url: 'https://www.copyright.or.kr/', note: 'AI 학습 자료와 생성물의 저작권 관련 안내 자료를 확인할 수 있어요.' }
  ],
  script: `오늘 브루로 만든 영상에 배경음악을 넣으려다가, '저작권 무료'라는 말이 정확히 뭔지 헷갈렸어요. 이 곡, 그냥 써도 될까요?

음악을 만드는 AI는 소리를 잘게 압축한 코덱 토큰으로 바꾸고, 글 쓰는 모델처럼 다음 소리 토큰을 확률로 이어 붙여요. MusicGen 같은 연구가 이 방식을 보여줘요. 그래서 '잔잔한 피아노, 90 BPM'처럼 장르·분위기·템포로 시키면 그럴듯한 곡이 나와요. 다만 특정 가수의 스타일을 콕 집어 시키면 학습 자료를 닮을 위험이 있어요.

학습 자료와 생성물의 권리는 나라마다, 도구마다 약관이 달라요. 한국저작권위원회 같은 곳의 안내를 확인해요. 학교 영상에 쓸 땐 '상업적 이용 가능'과 '출처 표시' 조건을 꼭 읽어요.

그러니 도구 약관은 스크린샷으로 남기고, 생성한 곡도 CREDITS에 기록해 두세요. 확인하고 기록하는 습관, 그게 전부예요.`
};
