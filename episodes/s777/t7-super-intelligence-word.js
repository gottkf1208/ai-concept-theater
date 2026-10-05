/* S777-70 AI를 SI라고 부르라는 행정명령: AI·AGI·초지능의 구분, 말이 생각을 바꾸는 방식 */
export default {
  slug: 't7-super-intelligence-word',
  track: 'S777',
  title: 'AI를 SI라고 부르라는 행정명령',
  subtitle: 'AI·AGI·초지능의 구분, 말이 생각을 바꾸는 방식',
  summary: '9월 29일 미국 백악관 행정명령 14434는 연방 행정부 문서에서 "Artificial Intelligence(AI)" 대신 "Super Intelligence(SI)"를 쓰게 했어요. 그런데 같은 명령이 SI의 뜻을 기존 법의 \'AI 정의\'로 정했어요. 이름표와 정의는 어떻게 다른지, AGI와 초지능은 무엇을 가리키는지, 이름만 바꿔도 사람들의 판단이 달라진다는 연구까지 1차 문서로 읽어요.',
  keywords: ['행정명령 14434', 'Super Intelligence', 'SI', '초지능', 'AGI', '범용 인공지능', 'ASI', 'AGI 단계', '성능', '일반성', '법적 정의', '15 U.S.C. 9401', '인공지능기본법 제2조', '용어 효과', '프레이밍', '캘리포니아 행정명령 N-10-26'],

  scenes: [
    {
      title: 'AI 대신 SI', dur: 13,
      captions: [
        { t: 0, text: '9월 29일 미국 백악관이 행정명령 14434를 냈어요. 연방 행정부의 서신·웹사이트·보고서에서 AI 대신 <em>슈퍼 인텔리전스(SI)</em>라고 쓰라는 내용이에요.' },
        { t: 6, text: '다음 날 캘리포니아는 주 기관에 계속 AI라고 부르라는 행정명령을 냈어요.' },
        { t: 9.5, text: '오늘은 두 문서가 무엇을 바꾸고 무엇을 안 바꿨는지 나란히 읽어 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const doc = P.box({ x: 340, y: 80, w: 560, h: 140, label: '행정명령 14434', sub: '2026. 9. 29. 미국 백악관', accent: 'ink', icon: P.ICON.doc });
        tl.at(stage.appendChild(doc.el), .3, { from: 'up' });
        const old = P.text({ x: 340, y: 260, w: 700, text: 'Artificial Intelligence (AI)', size: 34, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(old.el), 1.2, { from: 'up' });
        const neu = P.text({ x: 340, y: 320, w: 700, text: '<i>Super Intelligence (SI)</i>', size: 40, weight: 800 });
        tl.at(stage.appendChild(neu.el), 3.6, { from: 'up' });
        const ca = P.chip({ x: 340, y: 420, text: '9. 30. 캘리포니아 행정명령 N-10-26: 주 기관은 계속 AI로', color: 'orange', size: 20 });
        tl.at(stage.appendChild(ca.el), 6.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 6 || t > 9.5);
            doc.on(t > .3 && t < 6);
            old.el.style.textDecoration = t > 3.2 ? 'line-through' : 'none';
          }
        };
      }
    },
    {
      title: '이름표는 바꿨고, 정의는 그대로', dur: 14,
      captions: [
        { t: 0, text: '명령 제3조를 보면 SI의 뜻은 기존 미국 법에 적힌 <em>AI 정의 그대로</em>예요. 사람이 정한 목표에 대해 예측·추천·결정을 하는 기계 기반 시스템이요.' },
        { t: 6, text: '바꾸는 곳도 서신·보고서 같은 비법령 문서예요. 이미 나온 규정·계약은 고칠 필요가 없다고 적었어요.' },
        { t: 10, text: '새 정의는 60일 안에 입법안으로 내라고 했어요. 지금은 <em>이름표만</em> 바뀐 상태예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'think' });
        stage.append(q.el);
        const tag = P.box({ x: 330, y: 110, w: 200, h: 140, label: '이름표', sub: 'AI → SI', accent: 'orange' });
        tl.at(stage.appendChild(tag.el), .3, { from: 'left' });
        const def = P.box({ x: 600, y: 80, w: 620, h: 200, label: '법의 AI 정의 (그대로)', sub: '15 U.S.C. 9401(3)<br>사람이 정한 목표에 대해<br>예측·추천·결정을 하는 기계 기반 시스템', accent: 'aqua' });
        tl.at(stage.appendChild(def.el), 1.6, { from: 'right' });
        const link = P.arrow(lines, { x1: 535, y1: 180, x2: 594, y2: 180, width: 4, color: '#1B1F24' });
        const scope = P.chip({ x: 330, y: 320, text: '비법령 문서만 · 기존 규정·계약은 그대로', color: 'gray', size: 20 });
        tl.at(stage.appendChild(scope.el), 6.2, { from: 'pop' });
        const due = P.chip({ x: 330, y: 380, text: '60일 안에 새 정의 입법안 제출', color: 'ink', size: 20 });
        tl.at(stage.appendChild(due.el), 10.2, { from: 'pop' });
        const kr = P.chip({ x: 330, y: 440, text: '한국 AI 기본법 제2조도 "예측·추천·결정"', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(kr.el), 4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
            link.draw(P.clamp((t - 1.2) / .5, 0, 1));
            tag.on(t > .3 && t < 1.6); def.on(t > 1.6 && t < 6);
          }
        };
      }
    },
    {
      title: 'AGI와 초지능은 무엇을 가리키나', dur: 14,
      captions: [
        { t: 0, text: '2023년 Google DeepMind 연구는 AI를 <em>성능</em>(얼마나 잘하나)과 <em>일반성</em>(얼마나 여러 일을 하나) 두 축으로 나눴어요.' },
        { t: 5, text: '단백질 구조처럼 좁은 일에서는 이미 모든 사람을 넘는 AI가 있어요. 표에서는 AlphaFold가 그 칸에 있어요.' },
        { t: 9.5, text: '하지만 거의 모든 분야에서 가장 뛰어난 사람을 넘는 <em>초지능, ASI</em> 칸은 "아직 없음"이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const heads = [['성능 단계', 80, 'gray'], ['좁은 일', 330, 'aqua'], ['일반적인 일', 750, 'orange']].map(([text, x, color]) => {
          const c = P.chip({ x, y: 78, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), .3, { from: 'pop' });
          return c;
        });
        const ROWS = [
          ['5 Superhuman', 'AlphaFold 등', 'ASI · 아직 없음'],
          ['4 Exceptional', 'AlphaGo 등', '아직 없음'],
          ['3 Expert', '문법 검사기 등', '아직 없음'],
          ['2 Competent', 'Siri 등', '아직 없음'],
          ['1 Emerging', 'SHRDLU 등', 'Emerging AGI']
        ];
        const cells = ROWS.map((row, r) => row.map((label, c) => {
          const x = [80, 330, 750][c], w = [230, 400, 450][c];
          const acc = c === 0 ? 'ink' : (r === 0 && c === 1 ? 'aqua' : (r === 0 && c === 2 ? 'orange' : ''));
          const b = P.box({ x, y: 125 + r * 80, w, h: 66, label, accent: acc });
          tl.at(stage.appendChild(b.el), .6 + (4 - r) * .35 + c * .15, { from: 'up' });
          return b;
        }));
        const final = P.text({ x: 80, y: 540, w: 1120, text: '좁은 일의 초인은 있어도, <em>모든 일의 초인(ASI)</em>은 아직 없어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            cells[0][1].on(t > 5.2);
            cells[4][2].on(t > 2.5 && t < 5);
            cells[0][2].on(t > 9.6);
            cells[0][2].el.style.borderStyle = t > 9.6 ? 'dashed' : '';
          }
        };
      }
    },
    {
      title: '이름이 판단을 움직여요', dur: 13,
      captions: [
        { t: 0, text: '2021년 연구에서 같은 시스템을 <em>컴퓨터 프로그램</em>, <em>알고리즘</em>, <em>AI</em>처럼 이름만 바꿔 소개했어요.' },
        { t: 5, text: '그랬더니 사람들이 느끼는 복잡성과 신뢰가 달라졌어요.' },
        { t: 8.5, text: '연구진은 용어가 판단을 움직이는 데 전략적으로 쓰일 수 있다고 했어요. 이름은 중립적이지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'oops' });
        stage.append(q.el);
        const NAMES = ['컴퓨터 프로그램', '알고리즘', 'AI'];
        const CHANGE = [.3, 2.2, 4.1];
        const sys = P.box({ x: 340, y: 90, w: 420, h: 180, label: NAMES[0], sub: '같은 의사결정 시스템', accent: 'aqua', icon: P.ICON.desk });
        tl.at(stage.appendChild(sys.el), .3, { from: 'up' });
        const tags = NAMES.map((label, i) => {
          const b = P.box({ x: 340 + i * 145, y: 300, w: 130, h: 66, label: i === 0 ? '프로그램' : label, accent: '' });
          tl.at(stage.appendChild(b.el), CHANGE[i], { from: 'pop' });
          return b;
        });
        const gauges = [['느끼는 복잡성', 90], ['신뢰', 250]].map(([label, y]) => {
          const b = P.box({ x: 820, y, w: 380, h: 100, label, sub: '이름에 따라 달라짐', accent: 'ink' });
          tl.at(stage.appendChild(b.el), 5.2, { from: 'right' });
          const track = P.s('line', { x1: 850, y1: y + 122, x2: 1170, y2: y + 122, stroke: '#9AA5AF', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 });
          const dot = P.s('circle', { cx: 1010, cy: y + 122, r: 10, fill: '#F2812D', opacity: 0 });
          lines.append(track, dot);
          return { b, track, dot };
        });
        const final = P.text({ x: 340, y: 450, w: 860, text: '이름은 <em>중립적이지 않아요</em>.', size: 32, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 8.5);
            let idx = 0; CHANGE.forEach((c, i) => { if (t > c) idx = i; });
            sys.set(NAMES[idx]);
            tags.forEach((b, i) => b.on(i === idx));
            const show = t > 5.2 ? 1 : 0;
            const since = ((t - CHANGE[idx]) % 1.9 + 1.9) % 1.9;
            gauges.forEach(({ track, dot }, g) => {
              track.setAttribute('opacity', String(show));
              dot.setAttribute('opacity', String(show));
              const wob = Math.sin(t * 6 + g * 1.7) * 60 * Math.exp(-since * 1.2) + Math.sin(t * 1.3 + g) * 25;
              dot.setAttribute('cx', String(1010 + wob));
            });
          }
        };
      }
    },
    {
      title: '낱말 앞에서 던질 세 질문', dur: 12,
      captions: [
        { t: 0, text: '"초지능" 같은 말을 만나면 세 가지를 물어요. 정의는 어디 적혀 있는지, 증거는 무엇인지, 이 이름이 우리 기대를 어떻게 바꾸는지요.' },
        { t: 6.5, text: '학생들과 같은 도구를 서로 다른 이름으로 소개해 보면 말의 힘을 바로 느껴요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 310, size: 330, pose: 'wave' });
        stage.append(q.el);
        const at = [.5, 2.3, 4.1];
        const qs = [
          ['① 정의는 어디에?', '법·논문·회사 설명 중 어디에 적혀 있나', 'aqua'],
          ['② 증거는?', '좁은 일인가, 일반적인 일인가', 'ink'],
          ['③ 무엇을 기대하게 되나', '이 이름이 우리 기대를 바꾸나', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 400, y: 80 + i * 125, w: 800, h: 105, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), at[i], { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 465, w: 800, text: '같은 도구를 다른 이름으로 소개해 보면 <em>말의 힘</em>이 보여요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            qs.forEach((b, i) => b.on(t > at[i]));
          }
        };
      }
    }
  ],

  interaction: {
    title: '이름표와 단계표',
    desc: '위에서는 <b>성능 단계</b> 슬라이더와 <b>좁은 일 / 일반적인 일</b> 버튼으로 단계표의 칸을 골라 보세요. 아래 시스템 카드에서 <b>"이름표 바꾸기"</b>를 누르면 이름표만 바뀌고, 단계표 위치와 정의는 그대로인 걸 볼 수 있어요. 단계 이름과 예시는 2023년 Google DeepMind 논문의 표(작성 시점 기준)에서 가져왔어요. 받아쓰기 도우미는 연습용 예시예요.',
    mount(el, P) {
      const LV = [
        { name: 'Level 0 · No AI', desc: 'AI가 아닌 단계', narrow: 'AI가 아닌 단계예요.', general: 'AI가 아닌 단계예요.' },
        { name: 'Level 1 · Emerging', desc: '숙련되지 않은 사람과 같거나 조금 나음', narrow: 'GOFAI, SHRDLU', general: 'Emerging AGI: ChatGPT, Bard, Llama 2, Gemini (논문 작성 시점)' },
        { name: 'Level 2 · Competent', desc: '숙련된 성인의 50번째 백분위 이상', narrow: '독성 탐지기, Siri·Alexa·Google Assistant, 일부 과제의 최신 LLM', general: '아직 없음' },
        { name: 'Level 3 · Expert', desc: '숙련된 성인의 90번째 백분위 이상', narrow: 'Grammarly(문법 검사기), Imagen·Dall-E 2(이미지 생성 모델)', general: '아직 없음' },
        { name: 'Level 4 · Exceptional', desc: '숙련된 성인의 99번째 백분위 이상', narrow: 'Deep Blue, AlphaGo', general: '아직 없음' },
        { name: 'Level 5 · Superhuman', desc: '모든 사람보다 뛰어남', narrow: 'AlphaFold, AlphaZero, StockFish', general: '인공 초지능(ASI) · 아직 없음' }
      ];
      const TAGS = ['컴퓨터 프로그램', '알고리즘', 'AI', 'SI (Super Intelligence)'];
      let level = 3, general = false, tagIdx = 0;

      const range = P.h('input', { type: 'range', id: 'sim-lv', min: '0', max: '5', step: '1', value: String(level) });
      const lvOut = P.h('output', { for: 'sim-lv' }, String(level));
      const narrowBtn = P.h('button', { type: 'button', class: 'btn', 'aria-pressed': 'true' }, '좁은 일');
      const generalBtn = P.h('button', { type: 'button', class: 'btn', 'aria-pressed': 'false' }, '일반적인 일');
      const cell = P.h('div', { class: 'sim-cell', 'aria-live': 'polite' });

      const tagEl = P.h('div', { class: 'sim-tag' });
      const swap = P.h('button', { type: 'button', class: 'btn primary' }, '이름표 바꾸기');
      const fixed = P.h('div', { class: 'sim-fixed' },
        P.h('div', {}, '단계표 위치: 좁은 일 · 3단계 (그대로)'),
        P.h('div', {}, '정의: 예측·추천·결정을 하는 기계 기반 시스템 (그대로)'));
      const note = P.h('div', { class: 'sim-note', 'aria-live': 'polite' });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-row' }, P.h('label', { for: 'sim-lv' }, '성능 단계 ', lvOut), range),
        P.h('div', { class: 'sim-row' }, narrowBtn, generalBtn),
        cell,
        P.h('div', { class: 'sim-sys' },
          P.h('div', { class: 'sim-sys-h' }, '받아쓰기 맞춤법 도우미 (예시)'),
          P.h('div', { class: 'sim-row' }, P.h('span', { class: 'sim-lab' }, '이름표'), tagEl, swap),
          fixed, note)
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;font-size:13.5px}
        .sim-row input[type=range]{flex:1 1 160px;min-width:120px;max-width:100%}
        .sim-row .btn[aria-pressed=true]{border-color:var(--acc1);color:var(--acc1);font-weight:800}
        output{font-family:var(--mono);color:var(--acc1);min-width:16px;display:inline-block}
        .sim-cell{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:#fff;display:flex;flex-direction:column;gap:4px;word-break:keep-all}
        .sim-cell b{font-size:15px}
        .sim-cell .sim-d{font-size:13px;color:var(--muted)}
        .sim-cell .sim-ex{font-size:14px;font-weight:700}
        .sim-sys{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:#fff;display:flex;flex-direction:column;gap:8px}
        .sim-sys-h{font-weight:800;font-size:14.5px}
        .sim-lab{font-size:12.5px;color:var(--muted)}
        .sim-tag{padding:4px 10px;border-radius:10px;border:1px solid var(--acc2);color:var(--acc2);font-weight:800;font-size:14px;word-break:keep-all}
        .sim-fixed{font-size:13px;color:var(--muted);display:flex;flex-direction:column;gap:2px;word-break:keep-all}
        .sim-note{font-size:14px;font-weight:800;min-height:20px;word-break:keep-all}
      ` }));

      function renderCell() {
        const L = LV[level];
        lvOut.textContent = String(level);
        narrowBtn.setAttribute('aria-pressed', general ? 'false' : 'true');
        generalBtn.setAttribute('aria-pressed', general ? 'true' : 'false');
        cell.innerHTML = '';
        cell.append(
          P.h('b', {}, `${general ? '일반적인 일' : '좁은 일'} · ${L.name}`),
          P.h('span', { class: 'sim-d' }, L.desc),
          P.h('span', { class: 'sim-ex' }, `논문 표의 예시: ${general ? L.general : L.narrow}`)
        );
      }
      function renderTag() {
        tagEl.textContent = TAGS[tagIdx];
        note.textContent = tagIdx === 3 ? '이름표만 바뀌었어요. 능력의 증거는 단계표에서 확인해요.' : '';
      }
      range.addEventListener('input', () => { level = +range.value; renderCell(); });
      narrowBtn.addEventListener('click', () => { general = false; renderCell(); });
      generalBtn.addEventListener('click', () => { general = true; renderCell(); });
      swap.addEventListener('click', () => { tagIdx = (tagIdx + 1) % TAGS.length; renderTag(); });
      renderCell(); renderTag();
    }
  },

  teacherLines: [
    '이름이 커진다고 <b>능력이 커지는 건 아니에요.</b> 정의와 증거를 같이 봐요.',
    '좁은 일에서 사람을 이기는 AI는 이미 있지만, <b>모든 일에서 사람을 넘는 초지능은 아직 없어요.</b>'
  ],
  tip: {
    body: '기사나 광고에서 "초지능", "AGI" 같은 말이 나오면 학생들과 표 하나를 채워 보세요. ① 이 말의 정의는 어디에 적혀 있나(법·논문·회사 설명) ② 무엇을 할 수 있다는 증거가 있나(좁은 일/일반적인 일) ③ 이 이름을 들으면 무엇을 기대하게 되나. 같은 도구를 \'프로그램\', \'AI\', \'초지능\'으로 바꿔 소개하는 짧은 역할극도 좋아요.',
    extra: '정부 문서끼리도 용어가 달라질 수 있어요. 수업에서 다룰 때는 어느 쪽이 옳다고 평가하기보다 두 문서의 해당 조항을 나란히 읽고, "정의가 바뀌었나, 이름표만 바뀌었나"를 학생이 직접 찾게 하세요.'
  },
  myth: {
    myth: '미국 정부가 AI를 초지능(SI)이라고 부르기로 했으니 이제 AI가 초지능 수준이 됐다는 뜻이다.',
    fact: '행정명령은 SI의 뜻을 기존 법의 AI 정의 그대로 두었어요. 연구에서 쓰는 초지능(ASI)은 모든 분야에서 가장 뛰어난 사람을 넘는 수준이고, 2023년 연구 표에서는 아직 없는 칸이에요.'
  },
  sources: [
    { title: 'The White House, Executive Order 14434: Inaugurating The Era Of Super Intelligence (2026-09-29)', url: 'https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/', note: '비법령 문서에서 SI 사용(제2조), SI의 뜻은 15 U.S.C. 9401(3)의 AI 정의, 60일 안에 새 정의 입법안 제출(제3조).' },
    { title: 'The White House, Fact Sheet: President Donald J. Trump Inaugurates The Era of Super Intelligence (2026-09-29)', url: 'https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/', note: '이름을 바꾸는 이유에 대한 백악관 설명.' },
    { title: 'Levels of AGI for Operationalizing Progress on the Path to AGI (arXiv, 2023)', url: 'https://arxiv.org/abs/2311.02462', note: '성능·일반성 두 축의 AGI 단계표, 일반 5단계 ASI는 "not yet achieved".' },
    { title: '"Look! It\'s a Computer Program! It\'s an Algorithm! It\'s AI!": Does Terminology Affect Human Perceptions and Evaluations of Algorithmic Decision-Making Systems? (arXiv, 2021)', url: 'https://arxiv.org/abs/2108.11486', note: '용어만 바꿔도 느끼는 복잡성·신뢰 같은 평가가 달라졌다는 사전등록 연구.' }
  ],
  script: `9월 29일 미국 백악관이 행정명령 14434를 냈어요. 연방 행정부 문서에서 AI 대신 슈퍼 인텔리전스, SI라고 쓰라는 내용이에요. 다음 날 캘리포니아는 주 기관에 계속 AI라고 부르라는 행정명령을 냈어요.

그런데 명령 제3조를 보면 SI의 뜻은 기존 법의 AI 정의 그대로예요. 새 정의는 60일 안에 입법안으로 내라고 했으니, 지금은 이름표만 바뀐 상태예요. 2023년 Google DeepMind의 단계표를 보면, 좁은 일에서 모든 사람을 넘는 AI는 있지만 모든 분야에서 사람을 넘는 초지능 칸은 아직 없음으로 적혀 있어요.

이름은 중립적이지 않아요. 2021년 연구에서는 같은 시스템을 프로그램, 알고리즘, AI로 바꿔 부르기만 해도 사람들이 느끼는 복잡성과 신뢰가 달라졌어요. 그래서 낯선 말을 만나면 정의는 어디 적혀 있는지, 증거는 무엇인지 먼저 물어요.`
};
