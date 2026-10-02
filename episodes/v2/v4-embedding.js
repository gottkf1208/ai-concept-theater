/* 31 [S4] AI는 비슷한 뜻을 어떻게 찾을까: 임베딩과 의미 검색 */

/* 만져 보기용 데이터(결정적). 4개 주제군 × 3개 항목, 3차원 벡터(지도에는 앞 2차원만 그림).
   벡터는 4개 주제군이 서로 멀어지도록 미리 손으로 정했어요(실제 모델 수치가 아니라 원리를 보여주는 값). */
const WORDS = [
  { name: '휴대폰', group: 'device', vec: [1.00, 1.00, 1.00] },
  { name: '스마트기기 보관', group: 'device', vec: [1.10, 0.90, 1.05] },
  { name: '태블릿 충전', group: 'device', vec: [0.95, 1.05, 0.90] },
  { name: '급식 시간', group: 'food', vec: [1.00, -1.00, -1.00] },
  { name: '점심 메뉴', group: 'food', vec: [1.05, -0.95, -1.10] },
  { name: '식단표', group: 'food', vec: [0.90, -1.10, -0.95] },
  { name: '현장체험학습', group: 'trip', vec: [-1.00, 1.00, -1.00] },
  { name: '소풍', group: 'trip', vec: [-1.05, 0.95, -1.10] },
  { name: '버스 탑승', group: 'trip', vec: [-0.90, 1.10, -0.95] },
  { name: '학부모 상담', group: 'counsel', vec: [-1.00, -1.00, 1.00] },
  { name: '면담 신청', group: 'counsel', vec: [-1.05, -0.90, 1.10] },
  { name: '상담 주간', group: 'counsel', vec: [-0.95, -1.10, 0.95] }
];
const QUERIES = [
  { label: "'휴대폰 걷는 시간'", vec: [1.02, 0.98, 1.03], literal: '걷는 시간' },
  { label: "'소풍 가는 날'", vec: [-1.02, 0.98, -1.03], literal: '가는 날' },
  { label: "'상담 예약하고 싶어요'", vec: [-0.98, -1.03, 0.97], literal: '예약' }
];
const GROUP_COLOR = { device: '#2BB3C9', food: '#F2812D', trip: '#6B4A2E', counsel: '#1B1F24' };
const GROUP_LABEL = { device: '기기', food: '급식', trip: '현장학습', counsel: '상담' };
function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function norm(a) { return Math.sqrt(dot(a, a)); }
function cosine(a, b) { return dot(a, b) / (norm(a) * norm(b)); }

export default {
  slug: 'v4-embedding',
  track: 'S4',
  title: 'AI는 비슷한 뜻을 어떻게 찾을까',
  subtitle: '임베딩과 의미 검색',
  summary: "학교 규정집에서 '휴대폰'으로 찾으면 안 나오는데 AI는 '스마트기기 보관' 조항을 찾아 줘요. 낱말과 문장을 숫자 좌표(벡터)로 바꿔 가까운 뜻을 찾는 임베딩의 원리와, 자료를 붙여 주는 RAG가 이걸로 돌아가는 방식을 파고들어요.",
  keywords: ['임베딩', '벡터', '의미 검색', '코사인 유사도', 'word2vec', 'Sentence-BERT', '벡터 검색', 'RAG', '청크', '임베딩 편향'],

  scenes: [
    {
      title: "'휴대폰'이 없는데 찾았어요", dur: 13,
      captions: [
        { t: 0, text: "학교 규정집에서 '휴대폰'을 찾으니 <em>0건</em>이었어요. 규정에는 '스마트기기'라고 적혀 있었거든요." },
        { t: 5, text: '그런데 AI에게 물으니 그 조항을 <em>바로</em> 찾아 줬어요.' },
        { t: 10, text: '같은 글자가 없는데 어떻게 찾았을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'oops' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 60, w: 460, text: "학교 규정집에서 '휴대폰'을 찾아봤어요", tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const boxA = P.box({ x: 330, y: 220, w: 330, h: 130, label: '글자 찾기 "휴대폰"', sub: '검색 결과 <b>0건</b>', accent: '', icon: P.ICON.x });
        tl.at(stage.appendChild(boxA.el), 1.0, { from: 'up' });
        const boxB = P.box({ x: 700, y: 220, w: 380, h: 170, label: 'AI에게 "휴대폰 걷는 시간"', sub: '제12조: 스마트기기는<br>1교시 전 보관함에…', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(boxB.el), 5.2, { from: 'up' });
        const final = P.text({ x: 330, y: 440, w: 860, text: '같은 <em>글자</em>가 없는데 어떻게 찾았을까요?', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            boxA.on(t > 1.0); boxB.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '뜻을 좌표로', dur: 14,
      captions: [
        { t: 0, text: 'AI는 낱말과 문장을 <em>숫자 목록</em>으로 바꿔요. 이걸 <em>임베딩</em>이라고 해요.' },
        { t: 5, text: '숫자 목록은 지도 위 좌표 같아서, 뜻이 비슷하면 <em>가까이</em> 놓여요.' },
        { t: 9.5, text: '실제로는 2차원이 아니라 수백~수천 개 축이 있는 지도예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const frame = P.h('div', { style: 'position:absolute;left:400px;top:90px;width:820px;height:420px;border:2px solid #9AA5AF;border-radius:20px;background:rgba(255,255,255,.55)' });
        tl.at(stage.appendChild(frame), .2, { from: 'pop' });
        const label = P.text({ x: 420, y: 104, w: 780, text: '뜻 지도(단순화한 그림, 실제로는 더 많은 축이 있어요)', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(label.el), .5, { from: 'up' });
        const clusterA = [
          ['휴대폰', 460, 160], ['스마트기기 보관', 430, 222], ['태블릿 충전', 480, 284]
        ].map(([t, x, y], i) => {
          const c = P.chip({ x, y, text: t, color: 'aqua', size: 20 });
          tl.at(stage.appendChild(c.el), .8 + i * .3, { from: 'pop' });
          return c;
        });
        const clusterB = [
          ['급식 시간', 950, 330], ['점심 메뉴', 1000, 392], ['식단표', 930, 454]
        ].map(([t, x, y], i) => {
          const c = P.chip({ x, y, text: t, color: 'orange', size: 20 });
          tl.at(stage.appendChild(c.el), 1.8 + i * .3, { from: 'pop' });
          return c;
        });
        const note = P.text({ x: 400, y: 525, w: 820, text: '실제로는 2차원이 아니라 <em>수백~수천 개 축</em>이 있는 지도예요.', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 9.7, { from: 'up' });
        return {
          tick(t) { q.tick(t, t < 5 || t > 9.4); }
        };
      }
    },
    {
      title: '왕 − 남자 + 여자', dur: 13,
      captions: [
        { t: 0, text: '2013년 연구에서는 16억 단어로 배운 지도에서 <em>왕 − 남자 + 여자</em>를 계산하면 <em>여왕</em> 근처에 닿았어요.' },
        { t: 5, text: '가까운지는 두 화살표가 <em>얼마나 같은 방향</em>인지로 재요. 이걸 <em>코사인 유사도</em>라고 해요.' },
        { t: 9.5, text: '2019년에는 문장 단위로 확장돼서, 1만 문장 비교가 65시간에서 5초로 줄었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const chips = [
          ['왕', 380, 'ink'], ['− 남자', 530, 'gray'], ['+ 여자', 680, 'gray'], ['≈ 여왕', 830, 'orange']
        ].map(([t, x, c], i) => {
          const chip = P.chip({ x, y: 150, text: t, color: c, size: 24 });
          tl.at(stage.appendChild(chip.el), .3 + i * .5, { from: 'pop' });
          return chip;
        });
        const a1 = P.arrow(lines, { x1: 460, y1: 168, x2: 525, y2: 168, width: 3, color: '#1B1F24' });
        const a2 = P.arrow(lines, { x1: 610, y1: 168, x2: 675, y2: 168, width: 3, color: '#1B1F24' });
        const a3 = P.arrow(lines, { x1: 760, y1: 168, x2: 825, y2: 168, width: 3, dashed: true, color: '#9AA5AF' });
        const note = P.text({ x: 380, y: 232, w: 760, text: '<em>코사인 유사도</em> = 두 화살표가 같은 방향일수록 가까움', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 4.6, { from: 'up' });
        const boxA = P.box({ x: 380, y: 300, w: 430, h: 130, label: 'word2vec (2013)', sub: '16억 단어로 배운 지도에서 계산', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(boxA.el), .2, { from: 'up' });
        const boxB = P.box({ x: 840, y: 300, w: 370, h: 130, label: 'Sentence-BERT (2019)', sub: '문장 1만 개 비교: 65시간 → 5초', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(boxB.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            a1.draw(P.clamp((t - .9) / .5, 0, 1));
            a2.draw(P.clamp((t - 1.4) / .5, 0, 1));
            a3.draw(P.clamp((t - 1.9) / .5, 0, 1));
            boxA.on(t > .2); boxB.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '자료 붙이기(RAG)의 엔진', dur: 14,
      captions: [
        { t: 0, text: '자료를 붙여 주는 AI(RAG)는 이렇게 돌아가요. 질문도 좌표로 바꾸고, 자료 조각 중 <em>가장 가까운 몇 개</em>를 골라 읽혀요.' },
        { t: 5.5, text: '그런데 가깝다고 다 맞는 건 아니에요. 2025년 연구는 벡터 하나로는 담을 수 없는 <em>조합의 한계</em>가 있다고 보였어요.' },
        { t: 10.5, text: '학습 글에 있던 <em>고정관념</em>도 지도에 함께 담겨요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const boxes = [
          ['질문', '학생이 입력', '', P.ICON.search],
          ['임베딩', '숫자 좌표로 변환', 'aqua', P.ICON.brain],
          ['거리 재기', '자료 조각과 비교', '', P.ICON.eye],
          ['가까운 3개 → 답', 'AI가 읽고 답변', 'orange', P.ICON.check]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 330 + i * 220, y: 170, w: 195, h: 130, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 330 + i * 220 + 195 + 3, y1: 235, x2: 330 + (i + 1) * 220 - 3, y2: 235, width: 3, color: '#1B1F24' }));
        const note1 = P.text({ x: 330, y: 430, w: 900, text: '가깝다고 <em>다 맞는 건 아니에요</em>. 2025년 연구는 벡터 하나로 담을 수 없는 <em>조합의 한계</em>를 보였어요.', size: 23, weight: 700 });
        tl.at(stage.appendChild(note1.el), 5.8, { from: 'up' });
        const note2 = P.text({ x: 330, y: 480, w: 900, text: '학습 글에 있던 <em>고정관념</em>도 지도에 함께 담겨요.', size: 19, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note2.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10.5);
            boxes.forEach((b, i) => b.on(t > .3 + i * .7));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * .7)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '정리: 뜻으로 찾고, 눈으로 확인', dur: 12,
      captions: [
        { t: 0, text: '임베딩 덕분에 AI는 <em>글자</em>가 아니라 <em>뜻</em>으로 찾아요.' },
        { t: 6, text: "다만 '가깝다'와 '맞다'는 달라요. 가져온 조각은 꼭 <em>직접</em> 확인해요." }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 다른 말로도 찾아줘요', '의미 검색의 힘', 'aqua'],
          ['② 번호·이름은 글자 검색도', '학번·조항 번호는 Ctrl+F', ''],
          ['③ 가져온 조각 직접 확인', '가깝다고 다 맞진 않아요', 'orange'],
          ['④ 직업·성별 연상은 의심', '학습 글의 고정관념일 수 있어요', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 400 + (i % 2) * 400, y: 110 + Math.floor(i / 2) * 150, w: 370, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 420, w: 770, text: '임베딩 덕분에 AI는 <em>글자</em>가 아니라 <em>뜻</em>으로 찾아요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.1, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5.5);
            items.forEach((b, i) => b.on(t > .3 + i * .9));
          }
        };
      }
    }
  ],

  interaction: {
    title: '뜻 지도 검색기',
    desc: "학교 맥락 낱말·문장 12개를 미리 정한 좌표(벡터)로 지도 위에 찍었어요. 질문을 고르고 <b>가까운 조각 찾기</b>를 누르면 코사인 유사도로 가장 가까운 것부터 선으로 이어요. 가져올 개수(k)를 늘리면 관련 없는 항목도 섞여 들어오는 걸 볼 수 있어요. <b>글자 검색으로 비교</b>를 누르면 같은 낱말이 그대로 들어간 것만 찾는 방식과 비교돼요. 지도는 실제 비교에 쓰는 벡터 중 앞 2차원만 보여주는 단순화한 그림이에요.",
    mount(el, P) {
      const CW = 460, CH = 360, PAD = 24;
      function toXY(vec) {
        const x = PAD + (vec[0] + 1.3) / 2.6 * (CW - PAD * 2);
        const y = PAD + (1.3 - vec[1]) / 2.6 * (CH - PAD * 2);
        return [x, y];
      }

      let qi = 0, k = 3, mode = 'semantic', searched = false;

      const querySel = P.h('select', { id: 'sim-q', 'aria-label': '질문 고르기' },
        ...QUERIES.map((q, i) => P.h('option', { value: String(i) }, q.label)));
      const queryLab = P.h('label', { for: 'sim-q' }, '질문 ', querySel);
      const findBtn = P.h('button', { class: 'btn primary', type: 'button' }, '가까운 조각 찾기');
      const litBtn = P.h('button', { class: 'btn', type: 'button' }, '글자 검색으로 비교');

      const kRange = P.h('input', { type: 'range', id: 'sim-k', min: '1', max: '5', step: '1', value: '3' });
      const kB = P.h('b', {}, '3');
      const kLab = P.h('label', { for: 'sim-k' }, '가져올 개수 k ', kB);

      const canvas = P.h('canvas', { width: String(CW), height: String(CH), class: 'sim-canvas', role: 'img', 'aria-label': '낱말·문장을 좌표로 찍은 지도' });
      const legend = P.h('div', { class: 'sim-legend' },
        ...Object.keys(GROUP_LABEL).map(g => P.h('span', { class: 'sim-lg' }, P.h('i', { style: `background:${GROUP_COLOR[g]}` }), GROUP_LABEL[g])));
      const list = P.h('ol', { class: 'sim-list' });
      const status = P.h('p', { class: 'sim-status', 'aria-live': 'polite' }, '질문을 고르고 "가까운 조각 찾기"를 눌러 보세요.');

      el.append(
        P.h('div', { class: 'sim-wrap' },
          P.h('div', { class: 'sim-ctrl' }, queryLab, findBtn, litBtn),
          P.h('div', { class: 'sim-ctrl' }, kLab, kRange),
          P.h('div', { class: 'sim-stage' },
            P.h('div', { class: 'sim-canvaswrap' }, canvas, legend),
            P.h('div', { class: 'sim-result' }, list, status)
          )
        )
      );
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-ctrl label{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .sim-ctrl select{font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:#fff;max-width:100%}
        .sim-ctrl input[type=range]{flex:1 1 140px;max-width:100%}
        .sim-stage{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;max-width:100%}
        .sim-canvaswrap{flex:1 1 260px;min-width:0;max-width:460px}
        .sim-canvas{width:100%;height:auto;display:block;border-radius:14px;border:1px solid var(--line);background:#F2F5F7;max-width:100%}
        .sim-legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;font-size:12px;color:var(--muted)}
        .sim-lg{display:inline-flex;align-items:center;gap:5px}
        .sim-lg i{width:10px;height:10px;border-radius:50%;display:inline-block}
        .sim-result{flex:1 1 220px;min-width:0;max-width:100%}
        .sim-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-list li{display:flex;justify-content:space-between;gap:8px;font-size:13.5px;padding:6px 10px;border-radius:8px;background:var(--paper);word-break:keep-all}
        .sim-list li b{font-family:var(--mono);color:var(--ink)}
        .sim-list li.is-off{opacity:.62}
        .sim-status{font-size:13px;color:var(--muted);margin:8px 0 0;word-break:keep-all}
      ` }));

      const ctx = canvas.getContext('2d');

      function drawCanvas(highlightIdxs, markerVec) {
        ctx.clearRect(0, 0, CW, CH);
        ctx.fillStyle = '#F2F5F7'; ctx.fillRect(0, 0, CW, CH);
        ctx.strokeStyle = '#E4E8EC'; ctx.lineWidth = 1;
        ctx.strokeRect(1, 1, CW - 2, CH - 2);
        const hi = new Set(highlightIdxs || []);
        if (markerVec && hi.size) {
          const [qx, qy] = toXY(markerVec);
          ctx.strokeStyle = '#1B1F24'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
          WORDS.forEach((w, i) => {
            if (!hi.has(i)) return;
            const [wx, wy] = toXY(w.vec);
            ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(wx, wy); ctx.stroke();
          });
          ctx.setLineDash([]);
        }
        WORDS.forEach((w, i) => {
          const [x, y] = toXY(w.vec);
          const on = hi.has(i);
          ctx.beginPath();
          ctx.arc(x, y, on ? 8 : 6, 0, Math.PI * 2);
          ctx.fillStyle = GROUP_COLOR[w.group];
          ctx.globalAlpha = (on || !markerVec) ? 1 : .35;
          ctx.fill();
          if (on) { ctx.lineWidth = 2.4; ctx.strokeStyle = '#1B1F24'; ctx.stroke(); }
          ctx.globalAlpha = 1;
        });
        if (markerVec) {
          const [x, y] = toXY(markerVec);
          ctx.save();
          ctx.translate(x, y); ctx.rotate(Math.PI / 4);
          ctx.fillStyle = '#F2812D';
          ctx.fillRect(-7, -7, 14, 14);
          ctx.restore();
        }
      }

      function renderList() {
        list.innerHTML = '';
        if (!searched) {
          status.textContent = '질문을 고르고 "가까운 조각 찾기"를 눌러 보세요.';
          drawCanvas([], null);
          return;
        }
        const q = QUERIES[qi];
        if (mode === 'literal') {
          const hits = WORDS.filter(w => w.name.includes(q.literal));
          if (!hits.length) list.append(P.h('li', {}, `글자 "${q.literal}"가 들어간 항목`, P.h('b', {}, '0건')));
          else hits.forEach(w => list.append(P.h('li', {}, w.name, P.h('b', {}, '일치'))));
          status.textContent = `글자 검색: "${q.literal}"가 그대로 들어간 항목만 찾아요. 뜻이 같아도 글자가 다르면 못 찾아요.`;
          drawCanvas(hits.map(w => WORDS.indexOf(w)), q.vec);
          return;
        }
        const ranked = WORDS.map((w, i) => ({ ...w, i, score: cosine(w.vec, q.vec) })).sort((a, b) => b.score - a.score);
        const top = ranked.slice(0, k);
        const topGroup = ranked[0].group;
        top.forEach((w, rank) => {
          const offTopic = w.group !== topGroup;
          list.append(P.h('li', { class: offTopic ? 'is-off' : '' }, `${rank + 1}. ${w.name} (${GROUP_LABEL[w.group]})`, P.h('b', {}, w.score.toFixed(2))));
        });
        const offCount = top.filter(w => w.group !== topGroup).length;
        status.textContent = offCount
          ? `k=${k}: 다른 주제가 ${offCount}개 섞여 들어왔어요. 가깝다고 다 맞는 건 아니에요.`
          : `k=${k}: 전부 같은 주제예요.`;
        drawCanvas(top.map(w => w.i), q.vec);
      }

      querySel.addEventListener('change', () => { qi = +querySel.value; if (searched) renderList(); });
      kRange.addEventListener('input', () => { k = +kRange.value; kB.textContent = String(k); if (searched && mode === 'semantic') renderList(); });
      findBtn.addEventListener('click', () => { searched = true; mode = 'semantic'; renderList(); });
      litBtn.addEventListener('click', () => {
        searched = true; mode = mode === 'semantic' ? 'literal' : 'semantic';
        litBtn.textContent = mode === 'literal' ? '뜻 검색으로 돌아가기' : '글자 검색으로 비교';
        renderList();
      });

      renderList();
    }
  },

  teacherLines: [
    'AI는 낱말과 문장을 <b>숫자 좌표</b>로 바꿔서, 뜻이 가까운 것끼리 찾아요.',
    '가깝다고 <b>다 맞는 건 아니에요</b>. AI가 가져온 근거는 꼭 직접 읽어 봐요.'
  ],
  tip: {
    body: '학교 규정·공문을 AI에 붙여 놓고 찾을 때는 "근거 조항 번호와 문장을 같이 보여 줘"라고 하세요. 가져온 조각을 직접 읽으면 엉뚱한 조항을 잡았는지 바로 보여요.',
    extra: '학번·조항 번호·사람 이름처럼 글자가 정확히 맞아야 하는 건 뜻 검색보다 찾기(Ctrl+F) 같은 글자 검색이 더 확실해요. 둘을 같이 쓰세요.'
  },
  myth: {
    myth: 'AI 검색은 내가 쓴 낱말이 들어간 문서를 찾는 것이다.',
    fact: '낱말과 문장을 좌표로 바꿔 <b>뜻이 가까운</b> 것을 찾아요. 그래서 다른 말로 쓰인 조항도 찾지만, 가까울 뿐 틀린 조각을 가져올 수도 있어요.'
  },
  sources: [
    { title: 'Efficient Estimation of Word Representations in Vector Space (word2vec, arXiv 2013)', url: 'https://arxiv.org/abs/1301.3781', note: '낱말을 벡터로 바꾸는 방법. 왕 − 남자 + 여자가 여왕과 가장 가깝다는 것을 코사인 거리로 확인.' },
    { title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks (arXiv 2019, EMNLP 2019)', url: 'https://arxiv.org/abs/1908.10084', note: '문장을 벡터로 미리 만들어 코사인 유사도로 비교. 문장 1만 개 비교가 65시간에서 5초로 줄어요.' },
    { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv 2020, NeurIPS 2020)', url: 'https://arxiv.org/abs/2005.11401', note: '생성 모델에 밀집 벡터 색인 검색을 붙인 RAG. 더 구체적이고 사실에 맞는 글을 만들어요.' },
    { title: 'On the Theoretical Limitations of Embedding-Based Retrieval (arXiv 2025)', url: 'https://arxiv.org/abs/2508.21038', note: '벡터 하나로 문서를 표현하는 검색의 이론적 한계와 LIMIT 과제.' }
  ],
  script: `학교 규정집에서 '휴대폰'을 찾으면 0건이에요. 규정엔 '스마트기기'라고 적혀 있거든요. AI에게 물으면 바로 찾아요. 같은 글자가 없는데 어떻게 찾을까요.

AI는 낱말과 문장을 숫자 좌표로 바꿔요. 이걸 임베딩이라고 하고, 뜻이 비슷하면 가까이 놓여요. 가까운 정도는 두 좌표가 얼마나 같은 방향인지로 재는데, 이게 코사인 유사도예요. 2013년엔 왕 − 남자 + 여자를 계산하면 여왕 근처에 닿았고, 2019년엔 문장 비교가 65시간에서 5초로 줄었어요.

자료를 붙여 주는 RAG도 이 원리로 돌아가요. 질문도 좌표로 바꿔 가장 가까운 조각 몇 개를 골라 읽혀요. 가깝다고 다 맞는 건 아니에요. 2025년 연구는 벡터 하나의 한계를 보였고, 고정관념도 함께 담겨요.

그러니 AI 검색은 뜻으로 찾는다는 걸 기억하고, 학번·조항 번호는 글자 검색도 같이 쓰세요. 가져온 조각은 직접 확인하세요.`
};
