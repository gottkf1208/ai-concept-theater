/* S777-54 목소리를 글로 주문하고, 10초로 복제하는 시대: 음성 설계·즉시 음성 복제·동의 녹음 */
export default {
  slug: 't7-voice-design',
  track: 'S777',
  title: '목소리를 글로 주문하고, 10초로 복제하는 시대',
  subtitle: '음성 설계·즉시 음성 복제·동의 녹음',
  summary: '9월 23일 Gemini 3.8 Flash TTS, 9월 28일 Eleven v4, 10월 1일 MAI-Voice-2.1이 잇달아 나왔어요. "60대 천문학자, 부드러운 억양"처럼 글로 목소리를 설계하는 원리와 짧은 녹음으로 목소리를 복제하는 원리를 나눠 보고, 회사들이 동의를 녹음과 심사로 확인하는 방식, 그리고 가족 목소리 전화를 확인하는 습관까지 짚어요.',
  keywords: ['TTS', '음성 합성', '음성 설계', '보이스 디자인', '자연어 조건', '즉시 음성 복제', '참조 음성', '동의 녹음', '제한된 접근', '오디오 태그', '보이스피싱', 'Gemini 3.8 Flash TTS', 'Eleven v4', 'MAI-Voice-2.1'],

  scenes: [
    {
      title: '열흘 사이 세 번', dur: 13,
      captions: [
        { t: 0, text: '9월 23일 Google, 28일 ElevenLabs, 10월 1일 Microsoft가 새 <em>음성 합성</em>(글을 소리로 읽어 주는 TTS) 모델을 잇달아 발표했어요.' },
        { t: 5, text: '세 모델 모두 목소리를 <em>글로 설계</em>하고 짧은 녹음으로 <em>복제</em>해요.' },
        { t: 9.5, text: '둘은 원리도, 지켜야 할 선도 서로 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 350, size: 300, pose: 'wave' });
        stage.append(q.el);
        const chips = [
          ['9/23 Google · Gemini 3.8 Flash TTS', 'aqua'],
          ['9/28 ElevenLabs · Eleven v4', 'ink'],
          ['10/1 Microsoft · MAI-Voice-2.1', 'orange']
        ].map(([text, color], i) => {
          const c = P.chip({ x: 330, y: 92 + i * 56, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), .3 + i * 1.3, { from: 'left' });
          return c;
        });
        const design = P.box({ x: 330, y: 300, w: 400, h: 150, label: '음성 설계', sub: '글로 적은 설명이 조건', accent: 'aqua', icon: P.ICON.doc });
        const clone = P.box({ x: 770, y: 300, w: 400, h: 150, label: '음성 복제', sub: '실제 사람의 짧은 녹음이 조건', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(design.el), 5.3, { from: 'up' });
        tl.at(stage.appendChild(clone.el), 6.3, { from: 'up' });
        const last = P.text({ x: 330, y: 500, w: 840, text: '원리도, 지켜야 할 <em>선</em>도 달라요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.4);
            design.on(t > 5.3 && t < 9.5);
            clone.on(t > 6.3 && t < 9.5);
          }
        };
      }
    },
    {
      title: '글로 주문하는 목소리', dur: 14,
      captions: [
        { t: 0, text: '<em>음성 설계</em>는 나이, 억양, 음색을 글로 적으면 그런 목소리를 새로 만드는 거예요.' },
        { t: 5, text: '2024년 연구는 4만 5천 시간 음성에 말투·억양 설명을 자동으로 달아 학습시켰어요. 그래서 녹음 없이 설명만으로 목소리를 골라요.' },
        { t: 10, text: '감정은 줄마다 따로 지시해요. 웃음, 한숨 같은 <em>오디오 태그</em>를 문장 사이에 넣어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const desc = P.box({ x: 330, y: 100, w: 380, h: 200, label: '설명문', sub: '60대 후반 천문학자<br>부드러운 영국 억양<br>조용한 경이감', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(desc.el), .3, { from: 'left' });
        const arr = P.arrow(lines, { x1: 716, y1: 200, x2: 784, y2: 200, width: 4, color: '#1B1F24' });
        const card = P.h('div', { style: 'left:790px;top:100px;width:400px;height:200px;border-radius:20px;border:2px solid #127E90;background:#fff;box-sizing:border-box;padding:22px 26px;display:flex;flex-direction:column;justify-content:center;gap:16px' });
        const rows = [['음색', 78], ['억양', 64], ['말투', 42]].map(([name, pct]) => {
          const fill = P.h('div', { style: 'height:100%;width:0%;border-radius:8px;background:#127E90' });
          const row = P.h('div', { style: 'display:flex;align-items:center;gap:14px;font-size:20px;font-weight:800;color:#1B1F24' },
            P.h('span', { style: 'flex:none;width:48px' }, name),
            P.h('div', { style: 'flex:1;height:16px;border-radius:8px;background:rgba(154,165,175,.25);overflow:hidden' }, fill));
          card.append(row);
          return { fill, pct };
        });
        stage.append(card);
        tl.at(card, 1.4, { from: 'right' });
        const real = P.chip({ x: 790, y: 322, text: '실존 인물 아님', color: 'orange', size: 20 });
        tl.at(stage.appendChild(real.el), 3, { from: 'pop' });
        const study = P.chip({ x: 330, y: 322, text: '2024년 연구: 4만 5천 시간 + 자동 설명', color: 'gray', size: 20 });
        tl.at(stage.appendChild(study.el), 5.3, { from: 'pop' });
        const tags = P.text({ x: 330, y: 430, w: 860, text: '줄마다 감정 지시: <i>&lt;laughs&gt;</i> <i>&lt;sigh&gt;</i> <i>&lt;gasp&gt;</i>', size: 28, weight: 800 });
        tl.at(stage.appendChild(tags.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.6);
            arr.draw(P.clamp((t - 1.2) / .5, 0, 1));
            rows.forEach((r, i) => { r.fill.style.width = `${(P.clamp((t - (1.8 + i * .4)) / .7, 0, 1) * r.pct).toFixed(1)}%`; });
            desc.on(t > .3 && t < 5);
          }
        };
      }
    },
    {
      title: '10초 녹음이 하는 일', dur: 13,
      captions: [
        { t: 0, text: '<em>즉시 음성 복제</em>는 짧은 녹음에서 그 사람 목소리의 특징을 뽑아 새 문장에 입혀요. 따로 다시 학습시키지 않아요.' },
        { t: 7, text: 'Eleven v4는 10초 녹음이면 된다고 밝혔어요. 그만큼 실존 인물을 흉내 내는 건 설계와 전혀 다른 문제예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const HS = [26, 50, 38, 70, 58, 30, 64, 44, 76, 40, 54, 28];
        const wave = P.h('div', { style: 'left:330px;top:100px;width:250px;height:150px;border-radius:20px;border:2px solid #9AA5AF;background:#fff;display:flex;align-items:center;justify-content:center;gap:7px;box-sizing:border-box' });
        const bars = HS.map(hh => { const b = P.h('div', { style: `width:10px;height:${hh}px;border-radius:5px;background:#F2812D` }); wave.append(b); return b; });
        stage.append(wave);
        tl.at(wave, .3, { from: 'left' });
        const feat = P.box({ x: 650, y: 100, w: 250, h: 150, label: '목소리 특징', sub: '녹음에서 뽑아내요', accent: 'ink', icon: P.ICON.eye });
        tl.at(stage.appendChild(feat.el), 1.6, { from: 'up' });
        const out = P.box({ x: 970, y: 100, w: 230, h: 150, label: '새 문장', sub: '같은 목소리로 읽기', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(out.el), 3.2, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 586, y1: 175, x2: 644, y2: 175, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 906, y1: 175, x2: 964, y2: 175, width: 4, color: '#1B1F24' });
        const lens = [['Eleven v4 10초', 330], ['Gemini API 10~30초', 514], ['MAI-Voice 5~60초', 756]].map(([text, x], i) => {
          const c = P.chip({ x, y: 300, text, color: i === 0 ? 'orange' : 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), 5.4 + i * .5, { from: 'pop' });
          return c;
        });
        const last = P.text({ x: 330, y: 400, w: 870, text: '실존 인물을 흉내 내는 건 <em>설계와 다른 문제</em>예요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 7.3, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 6.6 || t > 7.1);
            bars.forEach((b, i) => { b.style.transform = `scaleY(${(0.6 + 0.4 * Math.abs(Math.sin(t * 2.6 + i * .8))).toFixed(3)})`; });
            a1.draw(P.clamp((t - 1.8) / .5, 0, 1));
            a2.draw(P.clamp((t - 3.4) / .5, 0, 1));
            feat.on(t > 1.6 && t < 7); out.on(t > 3.2 && t < 7);
          }
        };
      }
    },
    {
      title: '동의를 녹음으로 확인해요', dur: 14,
      captions: [
        { t: 0, text: 'Gemini API는 목소리 주인이 동의 문장을 직접 읽게 해요. 그 녹음이 참조 녹음과 <em>같은 사람</em>인지 확인해요.' },
        { t: 5.5, text: 'Microsoft는 복제 기능을 신청·심사를 거쳐야 열어 주는 <em>제한된 접근</em>으로 묶고, 동의 음성을 올리게 해요.' },
        { t: 10.5, text: '학생 목소리 동의 원칙은 v2 목소리 편에서 본 그대로예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const ref = P.box({ x: 330, y: 100, w: 240, h: 150, label: '참조 녹음', sub: '10~30초 목소리', accent: 'ink', icon: P.ICON.doc });
        const same = P.box({ x: 645, y: 100, w: 240, h: 150, label: '같은 사람?', sub: '같은 성인 화자 확인', accent: 'aqua', icon: P.ICON.check });
        const cons = P.box({ x: 960, y: 100, w: 240, h: 150, label: '동의 녹음', sub: '주인이 동의 문장 낭독', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(ref.el), .3, { from: 'left' });
        tl.at(stage.appendChild(cons.el), 1.3, { from: 'right' });
        tl.at(stage.appendChild(same.el), 2.6, { from: 'pop' });
        const a1 = P.arrow(lines, { x1: 576, y1: 175, x2: 639, y2: 175, width: 4, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 954, y1: 175, x2: 891, y2: 175, width: 4, color: '#1B1F24' });
        const ms = P.chip({ x: 330, y: 300, text: 'Microsoft: 심사 통과 후에만 복제 기능', color: 'gray', size: 20 });
        tl.at(stage.appendChild(ms.el), 5.8, { from: 'pop' });
        const flow = P.text({ x: 330, y: 370, w: 870, text: '신청 → 심사 승인 → <i>동의 음성 업로드</i> → 합성', size: 26, weight: 800 });
        tl.at(stage.appendChild(flow.el), 7, { from: 'up' });
        const v2 = P.text({ x: 330, y: 440, w: 870, text: '학생 목소리 동의 원칙은 v2 목소리 편 그대로예요.', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(v2.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.2 || t > 10.3);
            a1.draw(P.clamp((t - 2.8) / .5, 0, 1));
            a2.draw(P.clamp((t - 3.1) / .5, 0, 1));
            same.on(t > 3.4 && t < 5.5);
          }
        };
      }
    },
    {
      title: '목소리는 신분증이 아니에요', dur: 12,
      captions: [
        { t: 0, text: '짧은 녹음으로 복제되니 <em>익숙한 목소리</em>라는 이유만으로 믿으면 안 돼요.' },
        { t: 5.5, text: '돈이나 개인정보를 요구하는 전화는 끊고, 내가 아는 번호로 <em>다시 걸어</em> 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'oops' });
        stage.append(q.el);
        const call = P.box({ x: 330, y: 110, w: 300, h: 200, label: '엄마 목소리 전화', sub: '"급해, 지금 송금해 줘"', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(call.el), .3, { from: 'left' });
        const steps = ['① 일단 끊기', '② 아는 번호로 다시 걸기', '③ 가족 확인 질문'].map((label, i) => {
          const b = P.box({ x: 700, y: 92 + i * 110, w: 480, h: 90, label, accent: i === 1 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), 5.6 + i * .8, { from: 'right' });
          return b;
        });
        const arr = P.arrow(lines, { x1: 636, y1: 210, x2: 694, y2: 210, width: 4, color: '#F2812D' });
        const last = P.text({ x: 330, y: 470, w: 860, text: '익숙한 목소리라도 <em>다시 걸어</em> 확인해요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 8.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.2 || t > 5.5);
            arr.draw(P.clamp((t - 5.4) / .5, 0, 1));
            steps.forEach((s, i) => s.on(t > 5.6 + i * .8));
          }
        };
      }
    }
  ],

  interaction: {
    title: '설계할까, 복제할까',
    desc: '위 칸에서 나이·억양·분위기를 골라 <b>설명문으로 설계하기</b>를 눌러 보세요. 녹음 없이 설명문만으로 목소리 카드가 만들어져요. 아래 칸에서는 누구 목소리를 복제할지 고르고 체크한 뒤 <b>복제 요청</b>을 눌러 동의 절차를 확인해요.',
    mount(el, P) {
      const AGE = { '10대': 30, '30대': 55, '60대': 82 };
      const ACC = { '표준어': 38, '부드러운 영국 억양': 76, '빠른 아나운서 말투': 60 };
      const MOOD = { '차분한': 34, '밝은': 80, '진지한': 56 };
      const sel = (id, obj, val) => { const s = P.h('select', { id, class: 'vd-sel' }, ...Object.keys(obj).map(k => P.h('option', { value: k }, k))); s.value = val; return s; };
      const ageSel = sel('vd-age', AGE, '60대');
      const accSel = sel('vd-acc', ACC, '부드러운 영국 억양');
      const moodSel = sel('vd-mood', MOOD, '차분한');
      const designBtn = P.h('button', { class: 'btn primary', type: 'button' }, '설명문으로 설계하기');
      const descOut = P.h('div', { class: 'vd-desc' }, '고른 뒤 설계하기를 누르면 설명문과 목소리 카드가 나와요.');
      const card = P.h('div', { class: 'vd-card' });
      const field = (id, lab, ctl) => P.h('div', { class: 'vd-field' }, P.h('label', { for: id }, lab), ctl);

      const whoSel = P.h('select', { id: 'vd-who', class: 'vd-sel' },
        P.h('option', { value: 'me' }, '내 목소리'),
        P.h('option', { value: 'col' }, '동료 선생님'),
        P.h('option', { value: 'celeb' }, '유명인'));
      const c1 = P.h('input', { type: 'checkbox', id: 'vd-c1' });
      const c2 = P.h('input', { type: 'checkbox', id: 'vd-c2' });
      const cloneBtn = P.h('button', { class: 'btn', type: 'button' }, '복제 요청');
      const cloneOut = P.h('div', { class: 'vd-res' }, '체크한 뒤 복제 요청을 눌러 보세요.');

      el.append(P.h('div', { class: 'vd-wrap' },
        P.h('section', { class: 'vd-sec' },
          P.h('h4', {}, '목소리 설계'),
          P.h('div', { class: 'vd-row' }, field('vd-age', '나이', ageSel), field('vd-acc', '억양', accSel), field('vd-mood', '분위기', moodSel)),
          P.h('div', {}, designBtn),
          descOut, card),
        P.h('section', { class: 'vd-sec' },
          P.h('h4', {}, '목소리 복제'),
          P.h('div', { class: 'vd-row' }, field('vd-who', '누구 목소리', whoSel)),
          P.h('div', { class: 'vd-chk' }, c1, P.h('label', { for: 'vd-c1' }, '목소리 주인이 동의 문장을 직접 녹음함')),
          P.h('div', { class: 'vd-chk' }, c2, P.h('label', { for: 'vd-c2' }, '어디에 쓸지 알렸음')),
          P.h('div', {}, cloneBtn),
          cloneOut),
        P.h('p', { class: 'vd-note' }, '법률 자문이 아니라 수업용 점검표예요. 학생 목소리 규칙은 v2 목소리 편을 함께 보세요.')
      ));
      el.append(P.h('style', { html: `
        .vd-wrap{display:flex;flex-direction:column;gap:16px;max-width:100%}
        .vd-sec{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff;display:flex;flex-direction:column;gap:10px;min-width:0}
        .vd-sec h4{margin:0;font-size:16px}
        .vd-row{display:flex;flex-wrap:wrap;gap:10px}
        .vd-field{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:700;flex:1 1 140px;min-width:0}
        .vd-sel{height:36px;border-radius:10px;border:1px solid var(--line);padding:0 8px;font-size:14px;max-width:100%;min-width:0}
        .vd-desc{font-size:14px;font-weight:700;word-break:keep-all}
        .vd-card{display:flex;flex-direction:column;gap:8px}
        .vd-bar{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700}
        .vd-bar span{flex:none;width:72px}
        .vd-track{flex:1 1 auto;min-width:0;height:12px;border-radius:6px;background:var(--line);overflow:hidden}
        .vd-fill{height:100%;border-radius:6px;background:#127E90}
        .vd-tags{display:flex;flex-wrap:wrap;gap:6px}
        .vd-tag{font-size:12px;font-weight:800;border-radius:8px;padding:3px 8px;border:1px solid #F2812D;color:#F2812D}
        .vd-chk{display:flex;align-items:center;gap:8px;font-size:14px}
        .vd-chk input{width:18px;height:18px;flex:none}
        .vd-res{border:2px solid var(--line);border-radius:12px;padding:10px 12px;font-weight:800;font-size:14px;word-break:keep-all}
        .vd-res.ok{border-color:#127E90}
        .vd-res.warn{border-color:#9AA5AF}
        .vd-res.bad{border-color:#F2812D}
        .vd-note{font-size:12px;color:var(--muted);margin:0}
      ` }));

      designBtn.addEventListener('click', () => {
        const age = ageSel.value, acc = accSel.value, mood = moodSel.value;
        descOut.textContent = `설명문: "${age}, ${acc}, ${mood} 목소리"`;
        card.innerHTML = '';
        [['음색 깊이', AGE[age]], ['억양 개성', ACC[acc]], ['말투 에너지', MOOD[mood]]].forEach(([n, v]) => {
          card.append(P.h('div', { class: 'vd-bar' }, P.h('span', {}, n), P.h('div', { class: 'vd-track' }, P.h('div', { class: 'vd-fill', style: `width:${v}%` }))));
        });
        card.append(P.h('div', { class: 'vd-tags' }, P.h('span', { class: 'vd-tag' }, '실존 인물 아님'), P.h('span', { class: 'vd-tag' }, '녹음 필요 없음')));
      });
      cloneBtn.addEventListener('click', () => {
        let text, cls;
        if (whoSel.value === 'celeb') { text = '멈춰요. 본인 동의 녹음을 받을 수 없어요.'; cls = 'bad'; }
        else if (!c1.checked) { text = '아직이에요. 목소리 주인이 동의 문장을 직접 읽어야 해요.'; cls = 'warn'; }
        else if (!c2.checked) { text = '아직이에요. 어디에 쓸지 먼저 알려요.'; cls = 'warn'; }
        else { text = '진행 가능. 결과물에 AI 목소리라고 표시해요.'; cls = 'ok'; }
        cloneOut.textContent = text;
        cloneOut.className = 'vd-res ' + cls;
      });
    }
  },

  teacherLines: [
    'AI 목소리는 <b>글로 설계</b>할 수도, <b>10초 녹음으로 복제</b>할 수도 있어요. 복제는 꼭 그 사람의 허락이 있어야 해요.',
    '익숙한 목소리가 돈을 보내 달라고 하면, 끊고 <b>내가 아는 번호로 다시 걸어</b> 확인해요.'
  ],
  tip: {
    body: '학교 방송·수업 영상에 새 목소리가 필요하면 실제 사람을 복제하지 말고 <b>음성 설계</b>로 만들어요. "30대, 차분한 표준어, 또박또박"처럼 나이·억양·말투를 글로 적으면 돼요.',
    extra: '동료 목소리를 복제해야 한다면 목소리 주인이 <b>동의 문장을 직접 녹음</b>하는 절차가 있는 서비스를 쓰고, 어디에 언제까지 쓰는지 적어 둬요. 학생과는 "가족끼리 정한 확인 질문" 만들기를 보이스피싱 예방 활동으로 해 보세요.'
  },
  myth: {
    myth: '목소리를 글로 설계하는 것도 결국 누군가의 목소리를 몰래 복제한 것이다.',
    fact: '음성 설계는 나이·억양·음색 설명을 조건으로 새 목소리를 만드는 거라 특정 인물의 녹음이 들어가지 않아요. 실제 사람의 녹음을 넣는 건 복제이고, 그래서 동의 녹음과 심사 같은 장치가 따로 붙어요.'
  },
  sources: [
    { title: 'Google: Gemini 3.8 Text-to-Speech (2026-09-23)', url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/', note: '자연어 프롬프트로 목소리 설계, 오디오 태그, 목소리 주인의 동의 녹음, 모든 오디오에 SynthID.' },
    { title: 'Gemini API: Voice replication', url: 'https://ai.google.dev/gemini-api/docs/voice-replication', note: '10~30초 참조 음성, 목소리 주인의 동의 문장 낭독, 참조 녹음과 같은 성인 화자인지 확인.' },
    { title: 'ElevenLabs: Eleven v4 (2026-09-28)', url: 'https://elevenlabs.io/blog/eleven-v4', note: '10초 녹음으로 즉시 음성 복제, 인라인 오디오 태그, v4 Turbo 첫 음성까지 약 150ms.' },
    { title: 'Microsoft Learn: MAI-Voice-2.1 and MAI-Voice-2.1-Flash', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-voices', note: '권장 참조 5~60초, 제한된 접근 심사 후 동의 음성 업로드, 허가된 목소리만 합성.' }
  ],
  script: `9월 23일 Google, 28일 ElevenLabs, 10월 1일 Microsoft가 새 음성 합성 모델을 발표했어요. 세 모델 모두 목소리를 글로 설계하고 짧은 녹음으로 복제해요.

음성 설계는 나이, 억양, 음색을 글로 적어 새 목소리를 만드는 방식이에요. 2024년 연구는 4만 5천 시간 음성에 말투 설명을 자동으로 달아 설명만으로 목소리를 조절하게 했어요. 감정은 웃음, 한숨 같은 오디오 태그로 줄마다 지시해요.

즉시 음성 복제는 짧은 녹음에서 목소리 특징을 뽑아 새 문장에 입혀요. Eleven v4는 10초면 된다고 밝혔어요. 그래서 동의를 절차로 확인해요. Gemini API는 목소리 주인이 동의 문장을 직접 읽게 하고, Microsoft는 심사를 통과해야 복제 기능을 열어 줘요.

목소리는 신분증이 아니에요. 돈을 요구하는 전화는 끊고 아는 번호로 다시 걸어 확인해요.`
};
