/* S777-66 공공 AI 윤리기준 여섯 가지: 공정성·투명성·책임성과 자율점검 */
export default {
  slug: 't7-public-ai-ethics',
  track: 'S777',
  title: '공공 AI 윤리기준 여섯 가지',
  subtitle: '공정성·투명성·책임성과 자율점검',
  summary: '10월 1일 행정안전부가 공공부문 인공지능 윤리기준을 확정했어요. 핵심가치 여섯 개를 68개 세부 점검 사항으로 풀고, AI가 결정에 얼마나 깊이 들어가는지에 따라 3단계 자율점검을 골라 쓰게 했어요. 편향된 데이터가 차별을 되풀이하는 구조와 "최종 책임은 사람"을 실제 절차로 만드는 방법을 학교 눈으로 봐요.',
  keywords: ['공공부문 인공지능 윤리기준', '행정안전부', '6대 핵심가치', '공공성', '형평성', '투명성', '책임성', '안전성', '프라이버시 보호', '68개 점검 사항', '3단계 자율점검', '인적 감독', '피해구제', '알고리즘 편향', 'CAIO', '입법 프레임워크', '고영향 인공지능', '교육분야 AI 윤리원칙'],

  scenes: [
    {
      title: '공공 AI에 붙는 점검표', dur: 13,
      captions: [
        { t: 0, text: '10월 1일 행정안전부가 <em>공공부문 인공지능 윤리기준</em>을 확정했어요.' },
        { t: 4.5, text: '핵심가치 여섯 개를 <em>68개 세부 점검 사항</em>으로 풀고, AI 활용 수준에 맞춘 <em>3단계 자율점검</em>으로 쓰게 했어요.' },
        { t: 9.5, text: '다음 날 42개 중앙행정기관의 인공지능책임관(CAIO) 협의회에서는 AI 입법의 4대 기본방향도 다뤘어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const d1 = P.chip({ x: 330, y: 92, text: '10.1 행정안전부 · 윤리기준 확정', color: 'ink', size: 22 });
        tl.at(stage.appendChild(d1.el), .3, { from: 'pop' });
        const nums = [
          ['6가지', '핵심가치', 'aqua'],
          ['68개', '세부 점검 사항', 'ink'],
          ['3단계', '자율점검', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 295, y: 160, w: 270, h: 140, label, sub, accent: acc, icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), 4.6 + i * .8, { from: 'up' });
          return b;
        });
        const line = P.text({ x: 330, y: 340, w: 880, text: '여섯 가치를 <em>점검표</em>로 풀었어요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(line.el), 7, { from: 'up' });
        const d2 = P.chip({ x: 330, y: 430, text: '10.2 CAIO 협의회 · 42개 중앙행정기관', color: 'gray', size: 21 });
        const d3 = P.chip({ x: 330, y: 486, text: '「대한민국 인공지능 입법 프레임워크(안)」 4대 기본방향', color: 'gray', size: 21 });
        tl.at(stage.appendChild(d2.el), 9.7, { from: 'pop' });
        tl.at(stage.appendChild(d3.el), 10.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9.5);
            nums.forEach((b, i) => b.on(t > 4.6 + i * .8));
          }
        };
      }
    },
    {
      title: '여섯 가지를 세 관점으로', dur: 14,
      captions: [
        { t: 0, text: '여섯 가치는 국민·행정·기술 세 관점에서 나왔어요. 국민 쪽은 <em>공공성</em>과, 모두에게 차별 없이 돌아가게 하는 <em>형평성</em>이에요.' },
        { t: 5, text: '행정 쪽은 도입·활용 과정을 공개하는 <em>투명성</em>, 책임 주체를 정해 두는 <em>책임성</em>이에요.' },
        { t: 10, text: '기술 쪽은 피해를 막는 <em>안전성</em>과 개인정보를 지키는 <em>프라이버시 보호</em>예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const COLS = [
          ['국민 관점', [['공공성', '공공 이익과 삶의 질'], ['형평성', '모두에게 차별 없이']], 0.3],
          ['행정 관점', [['투명성', '도입·활용 과정 공개'], ['책임성', '책임 주체를 명확히']], 5.2],
          ['기술 관점', [['안전성', '피해 없이 안전하게'], ['프라이버시 보호', '개인정보 보호장치']], 10.2]
        ];
        const all = [];
        COLS.forEach(([head, vals, t0], c) => {
          const x = 90 + c * 380;
          const chip = P.chip({ x, y: 92, text: head, color: 'ink', size: 22 });
          tl.at(stage.appendChild(chip.el), t0, { from: 'pop' });
          vals.forEach(([label, sub], r) => {
            const b = P.box({ x, y: 150 + r * 170, w: 340, h: 140, label, sub, accent: c === 0 ? 'aqua' : (c === 1 ? 'orange' : '') });
            tl.at(stage.appendChild(b.el), t0 + .4 + r * .6, { from: 'up' });
            all.push([b, t0 + .4 + r * .6]);
          });
        });
        const note = P.chip({ x: 90, y: 520, text: '2025년 11월 초안 → 관계기관·학계 검토와 의견 수렴 → 확정', color: 'gray', size: 20 });
        tl.at(stage.appendChild(note.el), 11.6, { from: 'pop' });
        return {
          tick(t) {
            all.forEach(([b, t0]) => b.on(t > t0));
          }
        };
      }
    },
    {
      title: '편향은 데이터를 타고 와요', dur: 14,
      captions: [
        { t: 0, text: 'AI는 <em>지난 기록</em>에서 배워요. 기록이 한쪽으로 기울어 있으면 그 기울기가 판단에 그대로 실려요.' },
        { t: 5.5, text: '이렇게 데이터의 치우침이 판단으로 옮겨 가는 걸 <em>알고리즘 편향</em>이라고 해요. 교육부 2022년 자료도 2020년 영국 대입시험 알고리즘 차별 논쟁을 사례로 들었어요.' },
        { t: 10.5, text: '그래서 공정한지 보려면 결과만 보지 말고 <em>학습에 쓴 데이터</em>부터 물어야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const nodes = [
          ['지난 기록', '학습 데이터', 'ink', P.ICON.doc],
          ['학습', '기록 속 패턴 익히기', '', P.ICON.brain],
          ['판단', '새 사례에 적용', 'orange', P.ICON.check]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 330 + i * 310, y: 92, w: 250, h: 130, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * .9, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 585 + i * 310, y1: 157, x2: 635 + i * 310, y2: 157, width: 4, color: '#1B1F24' }));
        const mkBars = (x0, t0) => [[0, 110, '#127E90'], [1, 40, '#F2812D']].map(([k, hgt, col]) => {
          const el = P.h('div', { style: `position:absolute;left:${x0 + k * 80}px;top:${370 - hgt}px;width:56px;height:${hgt}px;border-radius:8px 8px 3px 3px;background:${col};transform-origin:50% 100%` });
          tl.at(stage.appendChild(el), t0, { from: 'none' });
          return { el, t0 };
        });
        const bars = [...mkBars(415, 1.2), ...mkBars(1035, 3.2)];
        const lab1 = P.text({ x: 330, y: 382, w: 250, text: '한쪽이 적은 기록', size: 20, weight: 700, align: 'center' });
        const lab2 = P.text({ x: 950, y: 382, w: 250, text: '한쪽에 불리한 판단', size: 20, weight: 700, align: 'center', color: '#F2812D' });
        tl.at(stage.appendChild(lab1.el), 1.6, { from: 'up' });
        tl.at(stage.appendChild(lab2.el), 3.6, { from: 'up' });
        const ex = P.chip({ x: 330, y: 450, text: '교육부 2022 자료 사례: 2020년 영국 대입시험 알고리즘 차별 논쟁', color: 'gray', size: 19 });
        tl.at(stage.appendChild(ex.el), 7.4, { from: 'pop' });
        const final = P.text({ x: 330, y: 515, w: 880, text: '공정한지 보려면 <em>데이터부터</em> 물어요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10.5);
            nodes.forEach((b, i) => b.on(t > .3 + i * .9));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (.8 + i * .9)) / .5, 0, 1)));
            bars.forEach(b => { b.el.style.transform = `scaleY(${P.easeOut(P.clamp((t - b.t0) / .9, 0, 1))})`; });
          }
        };
      }
    },
    {
      title: '책임은 절차로 만들어요', dur: 13,
      captions: [
        { t: 0, text: '자율점검은 3단계예요. AI가 <em>기초 활용</em>인지, <em>의사결정 지원</em>인지, <em>자율결정 기반</em>인지에 맞춰 기준을 골라요.' },
        { t: 5.5, text: '복지대상자 선정이나 인허가처럼 국민 권리에 닿는 일이라면, 틀렸을 때 누가 확인하고 바로잡는지가 먼저예요.' },
        { t: 9.5, text: '그래서 <em>책임 주체</em>, 사람이 검토·개입하는 <em>인적 감독</em>, <em>피해구제</em> 절차를 미리 정해 두게 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const steps = [
          ['1단계 적용', '기초 활용', ''],
          ['2단계 응용', '의사결정 지원', 'aqua'],
          ['3단계 융합', '자율결정 기반', 'ink']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 90 + i * 140, y: 400 - i * 130, w: 260, h: 110, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * 1.2, { from: 'up' });
          return b;
        });
        const guards = [
          ['책임 주체 지정', '기획부터 제공까지', P.ICON.hand],
          ['사람이 검토·개입', '인적 감독 체계', P.ICON.eye],
          ['사후관리·피해구제', '틀렸을 때 바로잡기', P.ICON.check]
        ].map(([label, sub, icon], i) => {
          const b = P.box({ x: 700, y: 130 + i * 135, w: 500, h: 122, label, sub, accent: 'orange', icon });
          tl.at(stage.appendChild(b.el), 9.6 + i * .8, { from: 'right' });
          return b;
        });
        const arrow = P.arrow(lines, { x1: 635, y1: 195, x2: 695, y2: 195, width: 4, color: '#1B1F24' });
        const where = P.chip({ x: 90, y: 560, text: '국민 권리에 닿는 일: 복지대상자 선정 · 인허가 · 위험예측', color: 'orange', size: 20 });
        tl.at(stage.appendChild(where.el), 5.7, { from: 'pop' });
        return {
          tick(t) {
            steps.forEach((b, i) => b.on(t > .3 + i * 1.2));
            guards.forEach((b, i) => b.on(t > 9.6 + i * .8));
            arrow.draw(P.clamp((t - 9.3) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '학교도 공공이에요', dur: 12,
      captions: [
        { t: 0, text: '학교에 AI를 들일 때도 같은 질문이에요. 누가 책임지고, 사람이 어디서 보고, 학생과 학부모에게 무엇을 알릴까요?' },
        { t: 6, text: '교육부도 2022년에 <em>교육분야 AI 윤리원칙</em> 열 가지를 냈어요. 학생 평가가 왜 고영향인지는 AI 법 편에 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const head = P.chip({ x: 340, y: 92, text: '교육분야 인공지능 윤리원칙(2022) 세부원칙에서', color: 'ink', size: 20 });
        tl.at(stage.appendChild(head.el), 6.2, { from: 'pop' });
        const items = [
          ['교수자의 전문성 존중', '세부원칙 3', 'aqua', P.ICON.hand],
          ['기회균등과 공정성', '세부원칙 5', 'orange', P.ICON.check],
          ['투명성과 설명 가능', '세부원칙 9 · 데이터 처리', '', P.ICON.eye]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 340, y: 150 + i * 132, w: 860, h: 120, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.3, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 340, y: 562, w: 860, text: '학생 평가는 AI 기본법이 정한 <em>고영향</em> 영역이에요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 8.5, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.6 || t > 6);
            items.forEach((b, i) => b.on(t > .4 + i * 1.3));
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 학교 AI 자율점검 7',
    desc: '위 슬라이더로 <b>AI가 맡는 일의 단계</b>를 고르세요. 1 적용은 가정통신문 초안 쓰기, 2 응용은 상담 우선순위 추천, 3 융합은 방과후 강좌 자동 배정이에요. 단계가 올라갈수록 필수 문항이 늘고, 3단계에서는 "이의 신청 창구" 문항이 더해져요. 필수인데 비어 있는 문항은 오렌지 테두리로 보여요. <b>예시 학교 점검</b>을 누르면 예시 학교의 체크 상태와 현재 단계에서 할 일이 나와요. 단계 이름과 여섯 가치는 행정안전부 윤리기준에서 가져왔고, 문항과 단계별 필수 규칙은 연구회 예시예요. 공식 68개 점검 항목의 문구는 보도자료에 실리지 않았어요.',
    mount(el, P) {
      const LEVELS = {
        1: '1 적용: 가정통신문 초안 쓰기',
        2: '2 응용: 상담 우선순위 추천',
        3: '3 융합: 방과후 강좌 자동 배정'
      };
      const ITEMS = [
        { tag: '공공성', text: '학생에게 이익이 되는 목적이 적혀 있다', from: 1 },
        { tag: '형평성', text: '특정 학년·성별·지역 학생에게 불리한 데이터가 없는지 봤다', from: 2 },
        { tag: '투명성', text: '학생·학부모에게 AI를 쓴다고 알렸다', from: 1 },
        { tag: '책임성 A', text: '담당자 이름이 정해져 있다', from: 2 },
        { tag: '책임성 B', text: '사람이 결과를 보고 바꿀 수 있다', from: 2 },
        { tag: '안전성', text: '오류가 나면 멈추는 방법이 있다', from: 3 },
        { tag: '프라이버시 보호', text: '학생 개인정보를 넣지 않거나 최소화했다', from: 1 },
        { tag: '책임성 C', text: '이의 신청 창구가 있다', from: 3, only3: true }
      ];
      const EXAMPLE = [true, false, true, true, false, false, true, false];
      const ADVICE = {
        1: '초안을 보내기 전에 비어 있는 필수 문항부터 채우세요.',
        2: '추천 결과를 학년·성별로 나눠 보고, 담당자가 결과를 바꿀 수 있게 하세요.',
        3: '자동 배정 전에 사람 검토와 이의 신청 창구부터 만드세요.'
      };
      let level = 1;

      const range = P.h('input', { type: 'range', id: 'sim-pa-level', min: '1', max: '3', step: '1', value: '1' });
      const rangeLab = P.h('label', { for: 'sim-pa-level', class: 'sim-pa-rl' }, 'AI가 맡는 일의 단계');
      const levelOut = P.h('div', { class: 'sim-pa-level' }, '');
      const status = P.h('div', { class: 'sim-pa-status' }, '');
      const result = P.h('div', { class: 'sim-pa-result' }, '예시 학교 점검을 누르거나 직접 체크해 보세요.');
      const rows = ITEMS.map((it, i) => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-pa-${i}` });
        const lab = P.h('label', { for: `sim-pa-${i}`, class: 'sim-pa-text' }, it.text);
        const tag = P.h('span', { class: 'sim-pa-tag' }, it.tag);
        const req = P.h('span', { class: 'sim-pa-req' }, '');
        const row = P.h('div', { class: 'sim-pa-row' }, cb, lab, tag, req);
        cb.addEventListener('change', () => render(true));
        return { cb, row, req };
      });
      const exBtn = P.h('button', { class: 'btn primary', type: 'button' }, '예시 학교 점검');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '초기화');

      el.append(P.h('div', { class: 'sim-pa-wrap' },
        P.h('div', { class: 'sim-pa-top' }, rangeLab, range, levelOut),
        P.h('div', { class: 'sim-pa-bar' }, exBtn, resetBtn, status),
        P.h('div', { class: 'sim-pa-list' }, ...rows.map(r => r.row)),
        result
      ));
      el.append(P.h('style', { html: `
        .sim-pa-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-pa-top{display:flex;flex-direction:column;gap:6px}
        .sim-pa-top input[type=range]{width:100%;max-width:420px}
        .sim-pa-rl{font-size:13px;color:var(--muted)}
        .sim-pa-level{font-weight:700;font-size:15px}
        .sim-pa-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-pa-status{font-family:var(--mono);font-size:13px;font-weight:700}
        .sim-pa-list{display:flex;flex-direction:column;gap:6px}
        .sim-pa-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border:2px solid var(--line);border-radius:12px;padding:8px 10px;background:#fff;min-width:0}
        .sim-pa-row.miss{border-color:var(--acc2)}
        .sim-pa-text{flex:1 1 200px;font-size:14px;word-break:keep-all;min-width:0}
        .sim-pa-tag{font-size:12px;font-weight:700;color:var(--acc1);border:1px solid var(--line);border-radius:999px;padding:2px 8px}
        .sim-pa-req{font-size:12px;font-weight:700;color:var(--acc2)}
        .sim-pa-result{font-size:14px;font-weight:700;border-left:3px solid var(--acc1);padding:8px 12px;background:#fff;border-radius:6px;word-break:keep-all}
      ` }));

      function render(touched) {
        levelOut.textContent = LEVELS[level];
        let miss = 0;
        const missNames = [];
        rows.forEach((r, i) => {
          const it = ITEMS[i];
          const shown = !it.only3 || level === 3;
          r.row.style.display = shown ? '' : 'none';
          const required = shown && level >= it.from;
          r.req.textContent = required ? '필수' : '';
          const isMiss = required && !r.cb.checked;
          r.row.classList.toggle('miss', isMiss);
          if (isMiss) { miss++; missNames.push(it.tag); }
        });
        status.textContent = `필수 미충족 ${miss}개`;
        if (touched) {
          result.textContent = miss === 0
            ? `${level}단계 필수 점검을 모두 채웠어요. 결과는 담당자가 계속 살펴보세요.`
            : `비어 있는 필수: ${missNames.join(', ')}. ${ADVICE[level]}`;
        }
      }
      range.addEventListener('input', () => { level = +range.value; render(result.dataset.on === '1'); });
      exBtn.addEventListener('click', () => {
        rows.forEach((r, i) => { r.cb.checked = EXAMPLE[i]; });
        result.dataset.on = '1';
        render(true);
      });
      resetBtn.addEventListener('click', () => {
        rows.forEach(r => { r.cb.checked = false; });
        delete result.dataset.on;
        result.textContent = '예시 학교 점검을 누르거나 직접 체크해 보세요.';
        render(false);
      });
      rows.forEach(r => r.cb.addEventListener('change', () => { result.dataset.on = '1'; }));
      render(false);
    }
  },

  teacherLines: [
    'AI가 정한 결과라도 <b>틀렸을 때 고쳐 줄 사람</b>이 정해져 있어야 공정해요.',
    'AI는 지난 기록에서 배워서, <b>기록이 기울어 있으면 판단도 기울어요.</b>'
  ],
  tip: {
    body: '학교에서 AI 도구를 새로 쓰기 전에 세 줄을 기안 문서에 넣으세요. ① 이 도구가 하는 일이 초안 쓰기(적용)인지, 추천(응용)인지, 결정(융합)인지 ② 결과를 보고 고칠 담당자 이름 ③ 학생·학부모에게 알리는 방법. 결정 단계라면 이의 신청 창구를 먼저 만드세요.',
    extra: '형평성은 결과를 몇 개 뽑아 학년·성별·반별로 나눠 보면 바로 점검할 수 있어요. 한쪽에만 몰린 결과가 보이면 도구를 멈추고 데이터부터 확인하세요.'
  },
  myth: {
    myth: '사람이 아니라 AI가 정하면 감정이 없으니 저절로 공정하다.',
    fact: 'AI는 지난 기록에서 배워서 기록 속 편향을 그대로 옮겨요. 그래서 공공 AI 윤리기준은 형평성 점검과 함께, 사람이 검토·개입하고 피해를 구제하는 절차를 요구해요.'
  },
  sources: [
    { title: "행정안전부 보도자료: '공공부문 AI 윤리기준' 최종 확정, 공공분야 인공지능 신뢰성 확보한다 (2026-10-01)", url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156784032', note: '6대 핵심가치(공공성·형평성·투명성·책임성·안전성·프라이버시 보호), 68개 세부 점검 사항, 3단계(적용·응용·융합) 자율점검, 인적 감독·피해구제.' },
    { title: '국가인공지능전략위원회 보도자료: 제5차 인공지능책임관(CAIO) 협의회 개최 (2026-10-02)', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156784206', note: '42개 중앙행정기관 참석, 「대한민국 인공지능 입법 프레임워크(안)」 4대 기본방향 논의.' },
    { title: '인공지능기본법 제2조(정의) (국가법령정보센터)', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=282791&joNo=0002&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR', note: '고영향 인공지능에 국가기관등의 의사결정, 유아·초등·중등교육의 학생 평가가 들어가요.' },
    { title: '교육부 보도자료: 인공지능, 교육현장에서 안전하게 활용해요! (교육분야 인공지능 윤리원칙, 2022-08-11)', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156520749', note: '대원칙 "사람의 성장을 지원하는 인공지능"과 10대 세부원칙, 2020년 영국 대입시험 알고리즘 차별 논쟁 사례.' }
  ],
  script: `10월 1일 행정안전부가 공공부문 인공지능 윤리기준을 확정했어요. 공공성, 형평성, 투명성, 책임성, 안전성, 프라이버시 보호, 여섯 가치를 68개 세부 점검 사항으로 풀었고, AI가 기초 활용인지, 의사결정 지원인지, 자율결정인지에 맞춰 3단계로 자율점검하게 했어요.

형평성이 왜 중요할까요? AI는 지난 기록에서 배워요. 기록이 한쪽으로 기울어 있으면 판단도 같은 쪽으로 기울어요. 그래서 공정한지 보려면 학습 데이터부터 물어야 해요.

책임성은 절차로 만들어요. 복지대상자 선정처럼 국민 권리에 닿는 일이라면 책임 주체를 정하고, 사람이 검토하고 개입하는 인적 감독과 피해구제 절차를 미리 마련해요.

학교도 공공이에요. AI를 들이기 전에 누가 책임지고, 사람이 어디서 보고, 학생과 학부모에게 무엇을 알릴지 먼저 정해요.`
};
