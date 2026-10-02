/* V2 S2-8 [시즌 2] 자막은 왜 가끔 엉뚱할까: 음성 인식, 커스텀 보캐뷸러리, 번역 파이프라인 */
export default {
  slug: 'v2-subtitle',
  track: 'S2',
  title: '자막은 왜 가끔 엉뚱할까',
  subtitle: '음성 인식, 커스텀 보캐뷸러리, 번역 파이프라인',
  summary: '자동 자막에서 "사회 시간"이 "사회시장"으로, 친구 이름이 엉뚱한 낱말로 나온 이유를 풀어요. 단어장(커스텀 보캐뷸러리)이 인식을 끌어당기는 원리와 너무 세게 당기면 생기는 일, 인식 뒤에 번역이 붙을 때 오류가 어떻게 번지는지까지 파고들어요.',
  keywords: ['자막', '음성 인식', 'STT', 'Whisper', '커스텀 보캐뷸러리', '컨텍스트 바이어싱', '가산점', '번역 파이프라인', '캐스케이드', '고유명사'],

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
      title: '단어장은 후보에 가산점을 줘요', dur: 14,
      captions: [
        { t: 0, text: '"한소리 학생"이라고 했는데 후보는 <em>한소라</em> 0.46, <em>한소리</em> 0.41, <em>한솔이</em> 0.13(예시 값)이었어요.' },
        { t: 5, text: '<em>커스텀 보캐뷸러리</em>(단어장)에 "한소리"를 등록하면 그 후보에 <em>가산점</em>이 붙어서 1등으로 올라가요.' },
        { t: 9.5, text: '그런데 "한 소리로 맞춰요"처럼 실제로 안 쓴 줄에서도 가산점이 크면 "한소리"가 끼어들어요. 공식 문서도 이 <em>거짓 양성</em>을 경고해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);

        const head1 = P.text({ x: 340, y: 92, w: 860, text: '발화: "한소리 학생" · 후보 점수(예시 값)', size: 19, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(head1.el), .3, { from: 'up' });
        const head2 = P.text({ x: 340, y: 392, w: 860, text: '다른 줄의 발화: "한 소리로 맞춰요" · 후보 점수(예시 값)', size: 19, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(head2.el), 9.5, { from: 'up' });

        const mkRow = (y, label) => {
          const lab = P.text({ x: 340, y: y + 6, w: 140, text: label, size: 19, weight: 700 });
          const track = P.h('div', { style: `left:490px;top:${y}px;width:300px;height:30px;border-radius:8px;background:#E4E8EC` });
          const fill = P.h('div', { style: `left:490px;top:${y}px;width:0px;height:30px;border-radius:8px;background:#9AA5AF` });
          const val = P.text({ x: 802, y: y + 6, w: 90, text: '', size: 17, weight: 800, cls: 'mono' });
          stage.appendChild(track); stage.appendChild(fill);
          tl.at(stage.appendChild(lab.el), .5, { from: 'left', dist: 10 });
          tl.at(val.el, .5, { from: 'none' });
          stage.appendChild(val.el);
          return { lab, fill, val };
        };
        const r1a = mkRow(138, '한소라');
        const r1b = mkRow(180, '한소리');
        const r1c = mkRow(222, '한솔이');
        const r2a = mkRow(438, '한 소리');
        const r2b = mkRow(480, '한소리');
        const r2c = mkRow(522, '한소라');

        const regChip = P.chip({ x: 340, y: 266, text: '단어장 등록: "한소리"', color: 'aqua', size: 19 });
        tl.at(stage.appendChild(regChip.el), 5, { from: 'pop' });
        const warnChip = P.chip({ x: 340, y: 566, text: '거짓 양성: 안 한 말이 끼어들었어요', color: 'orange', size: 19 });
        tl.at(stage.appendChild(warnChip.el), 11.6, { from: 'pop' });
        const final = P.text({ x: 340, y: 608, w: 860, text: '가산점은 효과가 있지만, <em>너무 크면 위험</em>해요.', size: 25, weight: 800 });
        tl.at(stage.appendChild(final.el), 12.1, { from: 'up' });

        const paint = (row, score, isTop, warn) => {
          row.fill.style.width = Math.round(score * 300) + 'px';
          row.fill.style.background = warn ? '#F2812D' : (isTop ? '#127E90' : '#9AA5AF');
          row.lab.el.style.fontWeight = isTop ? '800' : '600';
          row.lab.el.style.color = warn ? '#F2812D' : (isTop ? '#1B1F24' : '#9AA5AF');
          row.val.set(Math.round(score * 100) + '%');
        };

        return {
          tick(t) {
            q.tick(t, t < 9.5);
            const b1 = P.clamp((t - 5) / 3, 0, 1) * .3;
            const g1 = [{ row: r1a, s: .46 }, { row: r1b, s: .41 + b1 }, { row: r1c, s: .13 }];
            const top1 = g1.reduce((a, c) => c.s > a.s ? c : a, g1[0]);
            g1.forEach(c => paint(c.row, c.s, c.row === top1.row, false));

            const b2 = P.clamp((t - 9.5) / 3, 0, 1) * .45;
            const g2 = [{ row: r2a, s: .62 }, { row: r2b, s: .3 + b2, inject: true }, { row: r2c, s: .08 }];
            const top2 = g2.reduce((a, c) => c.s > a.s ? c : a, g2[0]);
            g2.forEach(c => paint(c.row, c.s, c.row === top2.row, c.row === top2.row && !!c.inject));
          }
        };
      }
    },
    {
      title: '번역은 한 단계 더', dur: 13,
      captions: [
        { t: 0, text: '자막을 다른 언어로 옮기는 <em>번역</em>에는 단계가 하나 더 있어요.' },
        { t: 5, text: '번역 자막은 보통 인식 다음에 번역을 <em>따로</em> 붙이는 <em>캐스케이드</em> 방식이에요. 그래서 앞 단계 오타가 그대로 번역돼요.' },
        { t: 9, text: '2023년 연구에서는 한 번에 처리하는 통합 모델이 캐스케이드보다 조금 나았고, 2026년 연구는 언어 모델로 고치는 단계가 <em>그럴듯하게 틀린 교정</em>을 만들 수 있다고 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const box1 = P.box({ x: 60, y: 260, w: 300, h: 140, label: '음성', sub: '원래 말소리', accent: 'ink' });
        tl.at(stage.appendChild(box1.el), .3, { from: 'left' });
        const a1 = P.arrow(lines, { x1: 370, y1: 330, x2: 450, y2: 330, width: 4, color: '#1B1F24' });
        const box2 = P.box({ x: 460, y: 260, w: 300, h: 140, label: '자막(한국어)', sub: '"사회 시간"(바로잡은 뒤)', accent: 'aqua' });
        tl.at(stage.appendChild(box2.el), 1.4, { from: 'up' });
        const a2 = P.arrow(lines, { x1: 770, y1: 330, x2: 850, y2: 330, width: 4, color: '#1B1F24' });
        const box3 = P.box({ x: 860, y: 260, w: 320, h: 140, label: '번역 결과', sub: '캐스케이드: 따로 번역', accent: 'orange' });
        tl.at(stage.appendChild(box3.el), 4.8, { from: 'right' });
        const chip1 = P.chip({ x: 60, y: 430, text: '2023년 연구: 통합 모델이 조금 더 나음', color: 'aqua', size: 18 });
        tl.at(stage.appendChild(chip1.el), 7, { from: 'pop' });
        const chip2 = P.chip({ x: 640, y: 430, text: '2026년 연구: 과잉 교정 주의', color: 'orange', size: 18 });
        tl.at(stage.appendChild(chip2.el), 8, { from: 'pop' });
        const q = P.quokka({ x: 40, y: 480, size: 170, pose: 'think' });
        stage.append(q.el);
        const finalNote = P.text({ x: 230, y: 560, w: 980, text: '그래서 번역 전에 <em>자막을 먼저</em> 고치는 게 순서예요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(finalNote.el), 9.2, { from: 'up' });
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
      title: '이렇게 확인해요', dur: 14,
      captions: [
        { t: 0, text: '검수 순서는 <em>고유명사 → 숫자 → 동음이의어</em>예요. 여기가 제일 잘 틀려요.' },
        { t: 5, text: '단어장(커스텀 보캐뷸러리)은 꼭 필요한 낱말만 넣고, 가산점은 <em>작게부터</em> 올려요.' },
        { t: 9.5, text: '한 클라우드 공식 문서는 단어장에 <em>개인정보를 넣지 말라</em>고 적어요. 학생 실명은 검수 때 고치는 편이 안전해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const box1 = P.box({ x: 140, y: 100, w: 1000, h: 100, label: '① 검수 순서', sub: '고유명사 → 숫자 → 동음이의어', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(box1.el), .3, { from: 'up' });
        const box2 = P.box({ x: 140, y: 230, w: 1000, h: 100, label: '② 단어장은 꼭 필요한 낱말만', sub: '가산점은 작게부터 올려요', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(box2.el), 2, { from: 'up' });
        const box3 = P.box({ x: 140, y: 360, w: 1000, h: 100, label: '③ 학생 이름은 조심', sub: '클라우드 단어장에 개인정보를 넣지 말라는 공식 경고가 있어요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(box3.el), 5, { from: 'up' });
        const q = P.quokka({ x: 40, y: 480, size: 180, pose: 'wave' });
        stage.append(q.el);
        const b = P.bubble({ x: 220, y: 500, w: 900, text: '교실에 트는 안내 자막은 <b>사람이 한 번</b> 읽어 보고 내보내요.', tail: 'left', tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.5, { from: 'up' });
        return { tick(t) { q.tick(t, t > 9.5); } };
      }
    }
  ],

  interaction: {
    title: '단어장 가산점 다이얼',
    desc: '네 줄의 음성 인식 결과예요. <b>단어장에 등록</b> 버튼으로 "한소리"·"사회 시간"을 커스텀 보캐뷸러리에 넣고, <b>가산점</b> 슬라이더를 올려 보세요. 처음 두 줄은 가산점을 조금만 올려도 바로잡히지만, 가산점을 너무 크게 주면 실제로 말하지 않은 "한소리"가 끼어드는 <b>거짓 양성</b>이 생겨요. "정답 보기"로 실제 발화를 확인할 수 있어요.',
    mount(el, P) {
      const LINES = [
        { say: '한소리 학생', cands: [{ w: '한소라', s: .46 }, { w: '한소리', s: .41, boost: true, right: true }, { w: '한솔이', s: .13 }] },
        { say: '사회 시간', cands: [{ w: '사회시장', s: .52 }, { w: '사회 시간', s: .48, boost: true, right: true }] },
        { say: '한 소리로 맞춰요', cands: [{ w: '한 소리', s: .62, right: true }, { w: '한소리', s: .3, boost: true }, { w: '한소라', s: .08 }] },
        { say: '미술 시간', cands: [{ w: '미술', s: .7, right: true }, { w: '미슬', s: .3 }] }
      ];
      let registered = false, boost = 0, showAnswer = false;

      const wrap = P.h('div', { class: 'sim-voc' });
      const regBtn = P.h('button', { class: 'btn primary', type: 'button' }, '단어장에 등록');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');
      const revealBtn = P.h('button', { class: 'btn', type: 'button' }, '정답 보기');
      const chips = P.h('span', { class: 'sim-voc-chips' });
      const range = P.h('input', { type: 'range', id: 'sim-boost', min: '0', max: '20', step: '1', value: '0', disabled: '' });
      const rangeLab = P.h('label', { for: 'sim-boost', class: 'sim-voc-rl' }, '가산점 ', P.h('b', {}, '0'));
      const bar = P.h('div', { class: 'sim-voc-bar' }, regBtn, resetBtn, revealBtn, chips, rangeLab, range);
      const list = P.h('div', { class: 'sim-voc-list' });
      wrap.append(bar, list);
      el.append(wrap);
      el.append(P.h('style', { html: `
        .sim-voc{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-voc-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .sim-voc-chips{display:flex;gap:6px;flex-wrap:wrap}
        .sim-voc-rl{font-size:13px;color:var(--muted);margin-left:auto}
        .sim-voc-bar input[type=range]{width:140px;max-width:100%}
        .sim-voc-list{display:grid;gap:12px;max-width:100%}
        .sim-voc-line{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:#fff;min-width:0}
        .sim-voc-say{font-size:13px;color:var(--muted);margin-bottom:6px}
        .sim-voc-cap{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap;word-break:keep-all}
        .sim-voc-cap .p-chip{position:static}
        .sim-voc-bars{display:flex;flex-direction:column;gap:6px;margin-top:10px}
        .sim-voc-cand{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);min-width:0}
        .sim-voc-cand.top{color:var(--ink);font-weight:800}
        .sim-voc-w{width:84px;flex:0 0 auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .sim-voc-track{flex:1;min-width:0;height:10px;border-radius:999px;background:var(--paper);overflow:hidden}
        .sim-voc-track i{display:block;height:100%;background:var(--acc1);transition:width .25s}
        .sim-voc-cand.warn .sim-voc-track i{background:var(--orange)}
        .sim-voc-pct{width:38px;text-align:right;flex:0 0 auto;font-family:var(--mono)}
      ` }));

      const rows = LINES.map(ln => {
        const row = P.h('div', { class: 'sim-voc-line' });
        const sayEl = P.h('div', { class: 'sim-voc-say', hidden: '' });
        const cap = P.h('div', { class: 'sim-voc-cap' }, '자막: ', P.h('b', {}), P.h('span', { class: 'p-chip c-gray' }, ''));
        const bars = P.h('div', { class: 'sim-voc-bars' });
        row.append(sayEl, cap, bars);
        list.append(row);
        return { ln, row, sayEl, capWord: cap.querySelector('b'), badge: cap.querySelector('.p-chip'), bars };
      });

      const scoreOf = c => c.s + (registered && c.boost ? boost * boost * .001 : 0);

      function render() {
        range.disabled = !registered;
        rangeLab.querySelector('b').textContent = String(boost);
        chips.replaceChildren(...(registered ? [
          P.h('span', { class: 'p-chip c-aqua' }, '한소리'),
          P.h('span', { class: 'p-chip c-aqua' }, '사회 시간')
        ] : []));
        revealBtn.textContent = showAnswer ? '정답 숨기기' : '정답 보기';
        rows.forEach(r => {
          const scored = r.ln.cands.map(c => ({ ...c, sc: scoreOf(c) }));
          const top = scored.reduce((a, c) => c.sc > a.sc ? c : a, scored[0]);
          const isRight = !!top.right;
          const isFalsePos = !isRight && registered && !!top.boost;
          r.sayEl.hidden = !showAnswer;
          r.sayEl.textContent = `실제 발화: "${r.ln.say}"`;
          r.capWord.textContent = top.w;
          r.badge.textContent = isRight ? '정답' : (isFalsePos ? '거짓 양성' : '오인식');
          r.badge.className = 'p-chip ' + (isRight ? 'c-aqua' : (isFalsePos ? 'c-orange' : 'c-gray'));
          r.bars.replaceChildren(...scored.map(c => {
            const isTop = c === top;
            const cand = P.h('div', { class: 'sim-voc-cand' + (isTop ? ' top' : '') + (isTop && isFalsePos ? ' warn' : '') });
            const track = P.h('div', { class: 'sim-voc-track' }, P.h('i', { style: `width:${Math.min(100, Math.round(c.sc * 100))}%` }));
            cand.append(P.h('span', { class: 'sim-voc-w' }, c.w), track, P.h('span', { class: 'sim-voc-pct' }, Math.round(c.sc * 100) + '%'));
            return cand;
          }));
        });
      }
      regBtn.addEventListener('click', () => { registered = true; render(); });
      resetBtn.addEventListener('click', () => { registered = false; boost = 0; showAnswer = false; range.value = '0'; render(); });
      revealBtn.addEventListener('click', () => { showAnswer = !showAnswer; render(); });
      range.addEventListener('input', () => { boost = +range.value; render(); });
      render();
    }
  },

  teacherLines: [
    '자막 AI는 소리를 듣고 <b>가장 그럴듯한 글자</b>를 골라요. 그래서 처음 듣는 이름은 잘 틀려요.',
    '단어장에 이름을 넣으면 그 이름이 더 잘 나오지만, <b>너무 세게</b> 넣으면 안 한 말도 끼어들어요.'
  ],
  tip: {
    body: '자막 검수는 <b>고유명사 → 숫자 → 동음이의어</b> 순서로 보면 놓치는 게 줄어요. 번역 자막은 한국어 자막을 먼저 고친 다음에 번역해요. 앞 오타가 그대로 번역되거든요.',
    extra: '단어장(커스텀 보캐뷸러리)에는 자주 틀리는 낱말만 넣고, 세기를 조절할 수 있으면 작게 시작해요. 학생 실명은 클라우드 단어장에 넣지 말고 검수 단계에서 고치는 편이 개인정보 면에서 안전해요.'
  },
  myth: {
    myth: '단어장에 많이 넣을수록, 세게 넣을수록 자막이 정확해진다.',
    fact: '단어장은 등록한 낱말 후보에 가산점을 주는 방식이라, 너무 크면 말하지 않은 낱말이 자막에 끼어들어요. 꼭 필요한 낱말만, 작은 세기부터 시작해요.'
  },
  sources: [
    { title: 'Radford et al., 2022 — Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)', url: 'https://arxiv.org/abs/2212.04356', note: '68만 시간의 다국어 음성 데이터를 약지도 학습해, 잡음과 억양에 강한 음성 인식 모델을 만든 연구예요.' },
    { title: 'Google Cloud Speech-to-Text — Improve transcription results with model adaptation', url: 'https://docs.cloud.google.com/speech-to-text/docs/adaptation-model', note: '구문 집합과 가산점(boost)의 원리, 실용 상한 20, 값이 높으면 거짓 양성이 늘 수 있다는 안내예요.' },
    { title: 'Amazon Transcribe — Custom vocabularies', url: 'https://docs.aws.amazon.com/transcribe/latest/dg/custom-vocabulary.html', note: '브랜드명·고유명사용 단어장 기능과, 개인정보를 넣지 말라는 주의 사항이에요.' },
    { title: 'SeamlessM4T: Massively Multilingual & Multimodal Machine Translation (arXiv, 2023)', url: 'https://arxiv.org/abs/2308.11596', note: '인식 뒤에 번역을 붙이는 캐스케이드 방식과, 한 번에 처리하는 통합 모델을 비교한 연구예요.' }
  ],
  script: `자동 자막에서 "사회 시간"이 "사회시장"으로, 친구 이름이 엉뚱한 낱말로 나온 적 있으세요? 음성 인식이 왜 가끔 헛짚는지, 단어장을 쓰면 왜 또 다른 문제가 생기는지 알아봐요.

음성 인식은 소리를 짧은 조각으로 잘라 특징을 뽑고, 문맥과 함께 가장 그럴듯한 글자를 확률로 골라요. 처음 듣는 이름은 아는 낱말로 바꿔 쓰고요. 커스텀 보캐뷸러리라는 단어장에 낱말을 등록하면 그 후보에 가산점이 붙어 더 자주 골라지는데, 이걸 컨텍스트 바이어싱이라고 해요. 다만 가산점을 너무 크게 주면 말하지 않은 낱말까지 끼어드는 오인식이 늘어난다고 공식 문서들이 경고해요.

번역 자막은 보통 인식 다음에 번역을 따로 붙이는 캐스케이드 방식이라 앞 단계 오타가 그대로 번역돼요. 2023년 연구에서는 한 번에 처리하는 통합 모델이 조금 나았고, 2026년 연구는 언어 모델로 고치는 단계가 그럴듯하게 틀린 과잉 교정을 만들 수 있다고 했어요.

그러니 자막은 고유명사, 숫자, 동음이의어 순서로 검수하고 번역 전에 한국어 자막을 먼저 고쳐요. 단어장에는 꼭 필요한 낱말만, 가산점은 작게부터 올리고, 학생 실명은 클라우드 단어장 대신 검수 단계에서 고치는 편이 안전해요.`
};
