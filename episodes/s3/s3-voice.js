/* 시즌 3 [A] E13 목소리는 어떻게 만들어질까 — TTS와 음성 복제 */
export default {
  slug: 's3-voice',
  track: 'A',
  title: '목소리는 어떻게 만들어질까',
  subtitle: 'TTS와 음성 복제',
  summary: '자막 프로그램이 붙여 준 AI 목소리가 사람 목소리랑 구분이 안 됐어요. 글자가 소리가 되는 과정과, 목소리 복제 전에 꼭 챙겨야 할 동의까지 3분에.',
  keywords: ['TTS', '음성합성', '음성복제', 'VALL-E', 'Web Speech API', '개인정보', '동의'],

  scenes: [
    {
      title: '이 목소리, 사람인가요?', dur: 13,
      captions: [
        { t: 0, text: '영상 편집 사이트에 자막을 넣었더니 <em>AI 목소리</em>가 읽어 줬어요.' },
        { t: 5, text: '그런데 사람 목소리랑 <em>구분이 안 됐어요</em>.' },
        { t: 9.5, text: '이 목소리는 대체 어떻게 만들어진 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 310, size: 340, pose: 'oops' });
        stage.append(q.el);
        const b = P.bubble({ x: 300, y: 140, w: 470, text: '자막: "3교시는 과학실에서 진행합니다."', tail: 'left' });
        tl.at(stage.appendChild(b.el), .3, { from: 'left' });
        const screen = P.box({ x: 830, y: 130, w: 380, h: 190, label: '자막 프로그램', sub: '자동으로 읽어 줘요', accent: 'aqua', icon: P.ICON.video });
        tl.at(stage.appendChild(screen.el), 1.6, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 590, y1: 205, x2: 830, y2: 220, curve: -10, width: 4, color: '#127E90' });
        const chip = P.chip({ x: 830, y: 360, text: '사람 목소리 같아요', color: 'gray', size: 22 });
        tl.at(stage.appendChild(chip.el), 6.2, { from: 'pop' });
        const qq = P.text({ x: 830, y: 410, w: 400, text: '<em>구분이 잘 안 돼요</em>.<br>어떻게 만든 걸까요?', size: 26, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            a1.draw(P.clamp((t - 1.8) / .7, 0, 1));
            screen.on(t > 1.6 && t < 9.5);
          }
        };
      }
    },
    {
      title: '글자에서 소리까지', dur: 14,
      captions: [
        { t: 0, text: '글자는 먼저 <em>발음 단위(음소)</em>로 쪼개지고, 억양·길이(운율)가 붙어요.' },
        { t: 5.5, text: '옛날 TTS는 녹음 조각을 <em>이어 붙였어요</em>. 그래서 말이 딱딱했죠.' },
        { t: 10, text: '요즘은 <em>신경망</em>이 소리 파형을 통째로 새로 그려요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 400, size: 240, pose: 'think' });
        tl.at(stage.appendChild(q.el), .1, { from: 'up' });
        const box1 = P.box({ x: 340, y: 90, w: 250, h: 120, label: '글자', sub: '"과학실로 이동"', accent: 'ink', icon: P.ICON.doc });
        const box2 = P.box({ x: 630, y: 90, w: 290, h: 120, label: '발음·운율', sub: '음소 + 억양·길이', accent: 'aqua', icon: P.ICON.brain });
        const box3 = P.box({ x: 960, y: 90, w: 250, h: 120, label: '소리 파형', sub: '스피커로 재생', accent: 'orange', icon: P.ICON.check });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        tl.at(stage.appendChild(box2.el), .9, { from: 'up' });
        tl.at(stage.appendChild(box3.el), 1.5, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 590, y1: 150, x2: 630, y2: 150, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 920, y1: 150, x2: 960, y2: 150, width: 4, color: '#1B1F24' });
        const oldBox = P.box({ x: 340, y: 300, w: 400, h: 150, label: '옛날 TTS', sub: '녹음 조각을 <b>이어 붙여요</b><br>그래서 말이 딱딱해요', accent: 'brown', icon: P.ICON.doc });
        const newBox = P.box({ x: 770, y: 300, w: 440, h: 150, label: '요즘 TTS', sub: '신경망이 파형을 <b>통째로</b> 새로 그려요', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(oldBox.el), 5.7, { from: 'up' });
        tl.at(stage.appendChild(newBox.el), 6.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > .5 && t < 10.5);
            a1.draw(P.clamp((t - .6) / .5, 0, 1));
            a2.draw(P.clamp((t - 1.2) / .5, 0, 1));
            oldBox.on(t > 5.5 && t < 10);
            newBox.on(t > 10);
          }
        };
      }
    },
    {
      title: '몇 초면 흉내 낼 수 있어요', dur: 13,
      captions: [
        { t: 0, text: '몇 초 녹음만 있으면 그 목소리를 <em>흉내</em> 낼 수 있어요.' },
        { t: 5, text: '한 연구(VALL-E)는 <em>3초 녹음</em>만으로 시연했어요.' },
        { t: 9.5, text: '서비스에 따라 <em>가능 여부와 품질</em>이 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        tl.at(stage.appendChild(q.el), .2, { from: 'left' });
        const box1 = P.box({ x: 420, y: 120, w: 320, h: 150, label: '원본 녹음', sub: '단 3초', accent: 'ink', icon: P.ICON.eye });
        const box2 = P.box({ x: 850, y: 120, w: 330, h: 150, label: '복제된 목소리', sub: '비슷하게 흉내 내요', accent: 'orange', icon: P.ICON.brain });
        tl.at(stage.appendChild(box1.el), .5, { from: 'up' });
        tl.at(stage.appendChild(box2.el), 2.4, { from: 'right' });
        const arr = P.arrow(lines, { x1: 740, y1: 195, x2: 850, y2: 195, width: 4, color: '#B3520F' });
        const chip = P.chip({ x: 420, y: 320, text: '복제 여부는 서비스마다 달라요', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.8, { from: 'pop' });
        const warn = P.text({ x: 420, y: 400, w: 760, text: '누구 목소리든 <em>허락 없이</em> 복제하면 안 돼요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(warn.el), 5.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5);
            arr.draw(P.clamp((t - 2.6) / .6, 0, 1));
            box2.on(t > 2.4);
          }
        };
      }
    },
    {
      title: '목소리도 개인정보예요', dur: 13,
      captions: [
        { t: 0, text: '목소리는 <em>개인정보</em>예요. 생체정보에 가까워요.' },
        { t: 5, text: '학생·동료 목소리를 복제하려면 <em>본인 동의</em>가 필요해요. 미성년자는 보호자 동의도요.' },
        { t: 9.5, text: '학교 방송·수업 영상엔 <em>기본 제공 목소리</em>를 쓰세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'oops' });
        tl.at(stage.appendChild(q.el), .1, { from: 'left' });
        const noBox = P.box({ x: 420, y: 100, w: 380, h: 150, label: '동의 없이 복제', sub: '학생·동료 목소리도 마찬가지예요', accent: 'orange', icon: P.ICON.x });
        const yesBox = P.box({ x: 420, y: 300, w: 380, h: 150, label: '동의 받고 사용', sub: '미성년자는 보호자 동의도요', accent: 'aqua', icon: P.ICON.check });
        const schoolBox = P.box({ x: 860, y: 200, w: 330, h: 170, label: '학교 방송·수업 영상', sub: '<b>기본 제공 목소리</b>를 쓰세요', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(noBox.el), .4, { from: 'up' });
        tl.at(stage.appendChild(yesBox.el), 4.8, { from: 'up' });
        tl.at(stage.appendChild(schoolBox.el), 9.3, { from: 'right' });
        return {
          tick(t) {
            q.tick(t, t < 9.5);
            noBox.on(t < 4.8);
            yesBox.on(t > 4.8 && t < 9.3);
            schoolBox.on(t > 9.3);
          }
        };
      }
    },
    {
      title: '그래서 할 일', dur: 13,
      captions: [
        { t: 0, text: '브라우저에도 <em>무료 낭독 기능</em>이 있어요(Web Speech API).' },
        { t: 5, text: '짧은 안내 음성은 이걸로도 <em>충분</em>해요.' },
        { t: 9.5, text: 'AI 목소리를 썼다면 그것도 꼭 <em>표시</em>해 주세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const steps = ['브라우저 낭독 기능 쓰기', '짧은 안내는 이걸로 충분', '썼다면 표시하기'].map((label, i) => {
          const box = P.box({ x: 430 + i * 290, y: 150, w: 260, h: 120, label, accent: i === 2 ? 'aqua' : '' });
          tl.at(stage.appendChild(box.el), .3 + i * .6, { from: 'up' });
          return box;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 690 + i * 290, y1: 210, x2: 720 + i * 290, y2: 210, width: 4, color: '#1B1F24' }));
        const chips = ['Web Speech API', '무료', 'AI 목소리 표시'].map((c, i) => tl.at(stage.appendChild(P.chip({ x: 430 + i * 260, y: 320, text: c, color: i === 2 ? 'orange' : 'aqua', size: 20 }).el), 2.4 + i * .3, { from: 'pop' }));
        const final = P.text({ x: 430, y: 420, w: 790, text: '짧은 안내 음성은 <em>브라우저 낭독</em>만으로도 충분해요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 5.3, { from: 'up' });
        const last = P.text({ x: 430, y: 560, w: 790, text: 'AI 목소리를 썼다면 꼭 표시해 주세요.', size: 30, weight: 800, color: '#B3520F' });
        tl.at(stage.appendChild(last.el), 9.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            arrows.forEach((ar, i) => ar.draw(P.clamp((t - (1 + i * .6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * .6 && t < 5.3));
          }
        };
      }
    }
  ],

  interaction: {
    title: '브라우저 낭독기',
    desc: '아래 문장을 <b>속도</b>·<b>높낮이</b>를 바꿔 가며 브라우저 목소리로 들어 보세요. 이건 이 브라우저(운영체제)에 내장된 목소리예요. 아래 체크리스트로 목소리 복제 전에 무엇을 챙겨야 하는지도 확인해 보세요.',
    mount(el, P) {
      const DEFAULT_TEXT = '3교시 수업은 과학실에서 진행합니다. 실험복을 챙겨 오세요.';
      const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

      const textarea = P.h('textarea', { class: 'sim-textarea', rows: '3', 'aria-label': '읽을 문장' }, DEFAULT_TEXT);
      const speedOut = P.h('output', {}, '1.0');
      const speedRange = P.h('input', { type: 'range', min: '0.6', max: '1.6', step: '0.1', value: '1.0', 'aria-label': '속도' });
      const pitchOut = P.h('output', {}, '1.0');
      const pitchRange = P.h('input', { type: 'range', min: '0.6', max: '1.6', step: '0.1', value: '1.0', 'aria-label': '높낮이' });
      const voiceSelect = P.h('select', { class: 'sim-voice', 'aria-label': '목소리 선택' }, P.h('option', { value: '' }, '기본 목소리'));
      const playBtn = P.h('button', { type: 'button', class: 'btn primary' }, '읽어 주기');
      const status = P.h('p', { class: 'sim-status' }, supported ? '문장을 다듬고 읽어 주기를 눌러 보세요.' : '이 브라우저는 음성을 지원하지 않아요.');
      const note = P.h('p', { class: 'muted sim-note' }, '들었나요? 이건 이 브라우저(운영체제)에 내장된 목소리예요. 도구마다 목소리와 품질이 달라요.');

      const checkLabels = ['본인 동의를 받았나요', '미성년자면 보호자 동의', '어디에 쓸지 알렸나요'];
      const checkboxes = checkLabels.map((lbl, i) => P.h('input', { type: 'checkbox', id: `s3voiceChk${i}` }));
      const checkRows = checkLabels.map((lbl, i) => P.h('div', { class: 'sim-check-row' }, checkboxes[i], P.h('label', { for: `s3voiceChk${i}` }, lbl)));
      const checkResult = P.h('p', { class: 'sim-check-result' }, '아직이에요.');

      const colA = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '① 브라우저로 읽어 보기'),
        textarea,
        P.h('div', { class: 'sim-row' }, P.h('label', {}, '속도 ', speedOut), speedRange),
        P.h('div', { class: 'sim-row' }, P.h('label', {}, '높낮이 ', pitchOut), pitchRange),
        P.h('div', { class: 'sim-row' }, P.h('label', {}, '목소리 '), voiceSelect),
        P.h('div', { class: 'sim-actions' }, playBtn),
        status, note
      );
      const colB = P.h('div', { class: 'sim-col' },
        P.h('h4', {}, '② 목소리 복제 전 체크'),
        P.h('p', { class: 'muted sim-desc' }, '누군가의 목소리를 흉내 내려면 셋 다 확인하세요.'),
        ...checkRows,
        checkResult
      );
      const wrap = P.h('div', { class: 'sim-wrap' }, colA, colB);
      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-wrap:wrap;gap:28px;max-width:100%}
        .sim-col{flex:1 1 300px;min-width:0;max-width:100%}
        .sim-col h4{font-size:16px;margin:0 0 10px}
        .sim-desc{font-size:13.5px;margin:0 0 10px}
        .sim-textarea{width:100%;max-width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font:inherit;font-size:15px;resize:vertical;min-height:64px}
        .sim-row{display:flex;align-items:center;gap:10px;margin-top:12px;font-weight:700;font-size:13.5px;flex-wrap:wrap}
        .sim-row label{display:flex;align-items:center;gap:6px;white-space:nowrap}
        .sim-row input[type=range]{flex:1 1 120px;min-width:100px;max-width:100%}
        .sim-row output{font-family:var(--mono);color:var(--aqua-deep);min-width:32px;display:inline-block}
        .sim-voice{flex:1 1 160px;min-width:0;max-width:100%;height:36px;border-radius:10px;border:1px solid var(--line);padding:0 8px;font-size:13.5px}
        .sim-actions{margin-top:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-status{margin-top:12px;font-weight:700;font-size:14px;color:var(--ink)}
        .sim-note{font-size:12.5px;margin-top:2px}
        .sim-check-row{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:14px}
        .sim-check-row input{width:18px;height:18px;flex:none}
        .sim-check-row label{cursor:pointer}
        .sim-check-result{margin-top:14px;font-weight:800;color:#9AA5AF}
        .sim-check-result.ok{color:#127E90}
      ` });
      el.append(wrap, style);

      /* 목소리 목록 채우기 */
      function populateVoices() {
        if (!supported) return;
        const voices = window.speechSynthesis.getVoices() || [];
        const keep = voiceSelect.value;
        while (voiceSelect.options.length > 1) voiceSelect.remove(1);
        const ko = voices.filter(v => (v.lang || '').toLowerCase().startsWith('ko'));
        const list = ko.length ? ko : voices;
        list.forEach(v => voiceSelect.append(P.h('option', { value: v.name }, `${v.name}${v.lang ? ' (' + v.lang + ')' : ''}`)));
        if (keep) voiceSelect.value = keep;
      }
      if (supported) {
        populateVoices();
        if ('onvoiceschanged' in window.speechSynthesis) window.speechSynthesis.onvoiceschanged = populateVoices;
      } else {
        playBtn.disabled = true;
        voiceSelect.disabled = true;
      }

      speedRange.addEventListener('input', () => { speedOut.textContent = (+speedRange.value).toFixed(1); });
      pitchRange.addEventListener('input', () => { pitchOut.textContent = (+pitchRange.value).toFixed(1); });

      playBtn.addEventListener('click', () => {
        if (!supported) { status.textContent = '이 브라우저는 음성을 지원하지 않아요.'; return; }
        const text = (textarea.value || DEFAULT_TEXT).trim() || DEFAULT_TEXT;
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = 'ko-KR';
          utter.rate = +speedRange.value;
          utter.pitch = +pitchRange.value;
          const voices = window.speechSynthesis.getVoices() || [];
          const chosen = voices.find(v => v.name === voiceSelect.value);
          if (chosen) utter.voice = chosen;
          utter.onend = () => { status.textContent = '다 읽었어요. 다시 눌러 보세요.'; };
          utter.onerror = () => { status.textContent = '읽기에 실패했어요. 다른 브라우저에서 해 보세요.'; };
          window.speechSynthesis.speak(utter);
          status.textContent = '읽는 중…';
        } catch (e) {
          status.textContent = '이 브라우저는 음성을 지원하지 않아요.';
        }
      });

      function updateCheck() {
        const allOn = checkboxes.every(c => c.checked);
        checkResult.textContent = allOn ? '복제해도 괜찮아요.' : '아직이에요.';
        checkResult.classList.toggle('ok', allOn);
      }
      checkboxes.forEach(c => c.addEventListener('change', updateCheck));
      updateCheck();
    }
  },

  teacherLines: [
    'AI 목소리는 글자를 소리 파형으로 <b>새로 그려 내는</b> 거예요. 녹음을 틀어 주는 게 아니에요.',
    '내 목소리도 개인정보예요. <b>누가 흉내 내려면</b> 꼭 허락을 받아야 해요.'
  ],
  tip: {
    body: '학교 방송이나 수업 영상에는 <b>기본 제공 목소리</b>를 쓰고, AI 목소리를 썼다면 그 사실을 표시하세요.',
    extra: '짧은 안내 음성이라면 브라우저 내장 낭독 기능(Web Speech API)만으로도 충분해요.'
  },
  myth: {
    myth: 'AI 목소리는 녹음 파일을 이어 붙인 것이다.',
    fact: '요즘은 신경망이 소리 파형을 통째로 새로 만들어요. 몇 초 샘플만으로 흉내도 가능해서, 그래서 동의가 더 중요해요.'
  },
  sources: [
    { title: 'Wang et al. 2023 — Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (VALL-E)', url: 'https://arxiv.org/abs/2301.02111', note: '3초 녹음만으로 그 사람 목소리를 흉내 내는 제로샷 음성 합성을 시연한 논문이에요.' },
    { title: 'MDN — Web Speech API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API', note: '브라우저에 내장된 음성 합성·인식 기능이에요. 별도 설치나 API 키 없이 쓸 수 있어요.' },
    { title: '개인정보보호위원회', url: 'https://www.pipc.go.kr/', note: '목소리 등 생체·개인정보 보호에 관한 안내는 이 기관 자료를 확인하세요.' }
  ],
  script: `
영상 편집 사이트에 자막을 넣었더니 AI 목소리가 읽어 줬는데, 사람 목소리랑 거의 구분이 안 됐어요. 이 목소리는 어떻게 만들어질까요?

글자는 먼저 음소로 쪼개지고, 억양과 길이 같은 운율이 붙어요. 옛날 TTS는 녹음 조각을 이어 붙여서 말이 딱딱했지만, 요즘은 신경망이 소리 파형을 통째로 새로 그려요. 몇 초 녹음만 있으면 그 목소리를 흉내 낼 수도 있어요. 한 연구는 3초 녹음만으로 시연했어요. 다만 서비스에 따라 가능 여부와 품질은 달라요.

목소리는 개인정보예요. 생체정보에 가까워서, 학생이나 동료 목소리를 복제하려면 본인 동의가 필요하고 미성년자는 보호자 동의도 있어야 해요. 학교 방송·수업 영상에는 기본 제공 목소리가 안전해요.

다행히 브라우저에도 무료 낭독 기능이 있어요. 짧은 안내 음성은 이걸로 충분해요. AI 목소리를 썼다면 꼭 표시해 주세요.
`
};
