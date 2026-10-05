/* S777-69 디지털 성범죄 대응, 기술은 어디까지: 해시 필터링·AI 탐지 파이프라인·공식 신고 경로 */
export default {
  slug: 't7-deepfake-response',
  track: 'S777',
  title: '디지털 성범죄 대응, 기술은 어디까지',
  subtitle: '해시 필터링·AI 탐지 파이프라인·공식 신고 경로',
  summary: '9월 22일 범정부 디지털 성범죄 대응 협의체가 불법사이트 대응 실적을 점검했고, 9월 29일 국제 콘퍼런스에서는 AI 기반 탐지·삭제 기술을 논의하기로 했어요. 이미 알려진 피해물을 지문(해시)으로 막는 원리, 새로 만들어진 합성물을 잡는 AI 탐지의 한계, 미국 캘리포니아 법은 무엇이 다른지, 학교에서 교사가 밟을 공식 절차는 무엇인지 차례로 봐요.',
  keywords: ['디지털 성범죄', '딥페이크', '허위영상물', '범정부 협의체', '성평등가족부', '해시', '디지털 지문', 'PhotoDNA', '지각 해시', 'AI 필터', '문맥 분석', '탐지 파이프라인', 'AUC', '중앙디지털성범죄피해자지원센터', '1366', 'ECRM', '신고의무', '학교폭력예방법', '캘리포니아 SB 1111', 'AB 2713', '출처 데이터'],

  scenes: [
    {
      title: '협의체가 점검한 숫자', dur: 13,
      captions: [
        { t: 0, text: '9월 22일 범정부 디지털 성범죄 대응 협의체가 불법사이트 대응 실적을 점검했어요. 활성 불법사이트는 29% 줄었고, 도메인을 바꾼 새 사이트는 계속 추적한다고 했어요.' },
        { t: 5.5, text: '경찰청은 운영자 32명을 검거하고 66개 사이트 운영을 중단시켰어요. 과기정통부는 2027년부터 AI로 불법사이트를 탐지·추적하는 기술을 개발할 계획이에요.' },
        { t: 10, text: '9월 29일 국제 콘퍼런스에서는 AI 기반 자동 탐지·삭제 기술을 소개할 예정이라고 밝혔어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 290, pose: 'think' });
        stage.append(q.el);
        const d1 = P.chip({ x: 340, y: 80, text: '2026. 9. 22. 범정부 디지털 성범죄 대응 협의체', color: 'ink', size: 20 });
        tl.at(stage.appendChild(d1.el), .3, { from: 'pop' });
        const nums = [
          ['29% 감소', '활성 불법사이트<br>6,683개 → 4,736개'],
          ['32명 검거', '운영자 검거<br>66개 사이트 운영 중단'],
          ['380개 접근제한', 'CDN 단계에서<br>접근 제한'],
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 300, y: 150, w: 270, h: 140, label, sub, accent: 'ink' });
          tl.at(stage.appendChild(b.el), 1.2 + i * 2.2, { from: 'up' });
          return b;
        });
        const plan = P.text({ x: 340, y: 330, w: 870, text: '과기정통부: 2027~2030년 <i>에이전틱 AI 기반</i> 불법사이트 탐지·추적 기술 개발 계획', size: 24, weight: 700 });
        tl.at(stage.appendChild(plan.el), 7.6, { from: 'up' });
        const d2 = P.chip({ x: 340, y: 395, text: '9. 29. 제2회 디지털 성범죄 대응 국제 콘퍼런스', color: 'gray', size: 20 });
        tl.at(stage.appendChild(d2.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
          }
        };
      }
    },
    {
      title: '이미 알려진 것은 지문으로', dur: 14,
      captions: [
        { t: 0, text: '<em>해시</em>는 파일에서 뽑은 디지털 지문이에요. 이미 신고된 피해물의 지문을 목록에 두고, 올라오는 파일의 지문과 맞춰 보면 사본을 바로 막을 수 있어요.' },
        { t: 6.5, text: '지문에서 원래 이미지를 되살릴 수는 없어서, 지문만 주고받으면 원본을 다시 퍼뜨리지 않아요.' },
        { t: 10.5, text: '대신 목록에 없는 <em>새 합성물</em>은 못 잡아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const flow = [
          ['올라온 파일', '', '', P.ICON.doc, 80, 200],
          ['디지털 지문', 'a3f9 07c1 e24b', 'aqua', P.ICON.key, 360, 260],
          ['신고 목록과 대조', '지문끼리 비교', 'ink', P.ICON.search, 700, 260],
          ['일치하면 차단', '', 'orange', P.ICON.x, 1040, 200]
        ].map(([label, sub, acc, icon, x, w], i) => {
          const b = P.box({ x, y: 110, w, h: 150, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1.3, { from: 'up' });
          return b;
        });
        const arrows = [[282, 356], [622, 696], [962, 1036]].map(([x1, x2]) => P.arrow(lines, { x1, y1: 185, x2, y2: 185, width: 4, color: '#1B1F24' }));
        const irrev = P.chip({ x: 360, y: 300, text: '지문에서 원래 이미지를 되살릴 수 없어요', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(irrev.el), 6.7, { from: 'pop' });
        const miss = P.box({ x: 80, y: 400, w: 560, h: 120, label: '목록에 없는 새 합성물', sub: '일치하는 지문이 없어 그대로 통과', accent: '', icon: '' });
        tl.at(stage.appendChild(miss.el), 10.6, { from: 'up' });
        const pass = P.arrow(lines, { x1: 645, y1: 460, x2: 900, y2: 460, width: 3, dashed: true, color: '#9AA5AF' });
        const next = P.text({ x: 910, y: 440, w: 320, text: '새 체가 <em>필요해요</em>', size: 26, weight: 800 });
        tl.at(stage.appendChild(next.el), 11.6, { from: 'up' });
        return {
          tick(t) {
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.2 + i * 1.3)) / .5, 0, 1)));
            pass.draw(P.clamp((t - 11) / .6, 0, 1));
            flow.forEach((b, i) => b.on(t > .3 + i * 1.3 && t < 10.5));
            miss.on(t > 10.6);
          }
        };
      }
    },
    {
      title: '새로 만든 것은 체 여러 겹으로', dur: 14,
      captions: [
        { t: 0, text: '새 합성물은 <em>AI 필터</em>(합성인지 가려내는 분류기)가 표시하고, 함께 올라온 글을 읽는 <em>문맥 분석</em>이 한 번 더 걸러요.' },
        { t: 5, text: '국내 포털은 DNA 필터링·AI 필터·문맥분석 3중 탐지를 콘퍼런스에서 소개할 예정이라고 밝혔어요.' },
        { t: 9, text: '2025년 연구에서 실제로 퍼진 딥페이크로 시험하자 공개 탐지 모델의 <em>AUC</em>(진짜와 가짜를 가르는 점수)가 절반 가까이 떨어졌어요. 그래서 마지막 칸은 사람의 확인이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'point' });
        stage.append(q.el);
        const at = [.3, .9, 1.5, 9.4];
        const sieve = ['① 해시 대조', '② AI 필터(분류기)', '③ 문맥 분석', '④ 사람 확인'].map((label, i) => {
          const b = P.box({ x: 330, y: 80 + i * 92, w: 380, h: 76, label, accent: i === 3 ? 'orange' : (i === 1 ? 'aqua' : '') });
          tl.at(stage.appendChild(b.el), at[i], { from: 'left' });
          return b;
        });
        const out = P.chip({ x: 330, y: 470, text: '삭제 요청 · 차단', color: 'ink', size: 20 });
        tl.at(stage.appendChild(out.el), 10.4, { from: 'pop' });
        const down = P.arrow(lines, { x1: 520, y1: 440, x2: 520, y2: 466, width: 3, color: '#1B1F24' });
        const perf = P.box({ x: 780, y: 80, w: 440, h: 110, label: '실제 유통물 앞 성능', sub: '기존 벤치마크 대비 AUC 하락', accent: 'ink' });
        tl.at(stage.appendChild(perf.el), 9.2, { from: 'right' });
        const rows = [['영상', 50], ['음성', 48], ['이미지', 45]];
        const chips = rows.map(([k, v], i) => {
          const c = P.chip({ x: 780, y: 225 + i * 62, text: `${k} ${v}% 하락`, color: 'orange', size: 20 });
          tl.at(stage.appendChild(c.el), 9.8 + i * .4, { from: 'pop' });
          return c;
        });
        const bars = rows.map(([, v], i) => { const r = P.s('rect', { x: 960, y: 233 + i * 62, width: 0, height: 20, rx: 6, fill: '#F2812D', opacity: .8 }); lines.append(r); return { r, v }; });
        return {
          tick(t) {
            q.tick(t, true);
            sieve.forEach((b, i) => b.on(t > at[i] && (i !== 1 || t < 9) && (i !== 2 || t < 9)));
            down.draw(P.clamp((t - 10.1) / .4, 0, 1));
            bars.forEach(({ r, v }, i) => r.setAttribute('width', String(v * 5 * P.clamp((t - (9.8 + i * .4)) / .7, 0, 1))));
          }
        };
      }
    },
    {
      title: '법은 어디를 막나', dur: 13,
      captions: [
        { t: 0, text: '한국 법은 합성과 유포뿐 아니라 <em>소지·저장·시청</em>까지 처벌해요. 학생을 대상으로 한 딥페이크 제작·반포는 <em>학교폭력</em>에도 들어가요.' },
        { t: 6, text: '미국 캘리포니아는 9월 30일 서명한 법으로 초상권 소송과 허위 사칭 규정에 <em>디지털 복제물</em>을 넣었어요. 플랫폼이 <em>출처 데이터</em>(누가 무엇으로 만들었는지 담은 기록)를 화면에 보여 주게도 했어요.' },
        { t: 10.5, text: '출처 데이터 원리는 AI 표시 편에서 봤어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const kr = P.chip({ x: 100, y: 80, text: '한국', color: 'ink', size: 20 });
        const ca = P.chip({ x: 680, y: 80, text: '미국 캘리포니아 · 9. 30. 서명', color: 'orange', size: 20 });
        tl.at(stage.appendChild(kr.el), .3, { from: 'pop' });
        tl.at(stage.appendChild(ca.el), 6, { from: 'pop' });
        const left = [
          ['합성·유포 처벌', '소지·저장·시청도 처벌 대상'],
          ['학교폭력에 포함', '학생 대상 딥페이크 제작·반포'],
          ['불법사이트 차단', 'CDN 단계 접근제한까지']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 100, y: 135 + i * 130, w: 520, h: 110, label, sub, accent: i === 0 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), .5 + i * 1.6, { from: 'left' });
          return b;
        });
        const right = [
          ['디지털 복제물', 'SB 1111 · 초상권·사칭에 포함'],
          ['출처 데이터 표시', 'AB 2713 · 플랫폼 화면에 보이기']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 680, y: 135 + i * 130, w: 520, h: 110, label, sub, accent: 'orange' });
          tl.at(stage.appendChild(b.el), 6.3 + i * 1.8, { from: 'right' });
          return b;
        });
        const note = P.text({ x: 680, y: 415, w: 520, text: '출처 데이터 원리는 <i>AI 표시 편</i>에서 봤어요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            left.forEach((b, i) => b.on(t > .5 + i * 1.6 && t < 6));
            right.forEach((b, i) => b.on(t > 6.3 + i * 1.8));
          }
        };
      }
    },
    {
      title: '교사의 다음 단계', dur: 12,
      captions: [
        { t: 0, text: '학교 종사자는 아동·청소년 대상 성범죄를 직무상 알게 되면 <em>즉시 수사기관에 신고</em>해야 해요. 피해 학생은 중앙디지털성범죄피해자지원센터나 여성긴급전화 1366으로 상담·삭제 지원을 연결해요.' },
        { t: 6.5, text: '영상을 확인하겠다고 내려받거나 돌려 보면 그것도 처벌 대상이 될 수 있어요. 증거 확보는 지원센터의 채증 지원을 받아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 300, pose: 'base' });
        stage.append(q.el);
        const at = [.3, 3.2, 5];
        const steps = [
          ['① 즉시 수사기관 신고', '112 · 사이버범죄 신고시스템', 'ink'],
          ['② 피해 지원 연결', '지원센터 02-735-8994 · 1366', 'aqua'],
          ['③ 학교폭력 절차', '피해 학생 보호 조치', '']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360, y: 80 + i * 125, w: 860, h: 105, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), at[i], { from: 'up' });
          return b;
        });
        const warn = P.text({ x: 360, y: 470, w: 860, text: '확인한다며 <em>내려받거나 전달하지 않아요</em>. 채증은 센터가 도와요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(warn.el), 6.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, true);
            steps.forEach((b, i) => b.on(t > at[i]));
          }
        };
      }
    }
  ],

  interaction: {
    title: '탐지 파이프라인 체',
    desc: '파일 카드 12장이 네 겹의 체를 차례로 지나가요. <b>"해시 대조 켜기"</b>부터 눌러 한 겹씩 켜 보세요. 겹마다 무엇을 잡고 무엇을 놓치는지, 잘못 걸린 일반 사진이 어디서 풀려나는지 볼 수 있어요. 카드와 걸러지는 개수는 원리를 보여 주는 예시 값이에요. 실제 탐지 시스템의 성능 수치가 아니에요.',
    mount(el, P) {
      const CARDS = [
        ...[1, 2, 3, 4].map(n => ({ id: `copy${n}`, label: `신고 목록 파일의 사본 ${n}`, bad: true, by: 1 })),
        { id: 'crop1', label: '사본을 조금 자른 것 1', bad: true, by: 1, note: '지각 해시' },
        { id: 'crop2', label: '사본을 조금 자른 것 2', bad: true, by: 3 },
        ...[1, 2, 3].map(n => ({ id: `new${n}`, label: `새로 만든 합성 이미지 ${n}`, bad: true, by: 2 })),
        { id: 'new4', label: '새로 만든 합성 이미지 4', bad: true, by: 3 },
        { id: 'land1', label: '일반 풍경 사진 1', bad: false, falseAt: 2, release: 4 },
        { id: 'land2', label: '일반 풍경 사진 2', bad: false }
      ];
      const STAGES = [
        { name: '해시 대조', desc: '알려진 파일의 지문만 맞춰요. 조금 자른 사본은 지각 해시(비슷한 이미지끼리 비슷한 지문)로 일부만 잡아요.' },
        { name: 'AI 필터', desc: '새 합성물도 잡지만, 일반 사진이 잘못 걸리기도 해요.' },
        { name: '문맥 분석', desc: '함께 올라온 글과 주변 정보를 읽어 남은 것을 걸러요.' },
        { name: '사람 확인', desc: '사람이 최종 판단해요. 잘못 걸린 일반 사진은 풀어 줘요.' }
      ];
      const NAMES = ['', '해시', 'AI 필터', '문맥 분석'];
      let k = 0;

      const btns = STAGES.map((s, i) => {
        const b = P.h('button', { type: 'button', class: i === 0 ? 'btn primary' : 'btn' }, `${s.name} 켜기`);
        b.addEventListener('click', () => { if (i === k) { k = i + 1; render(); } });
        return b;
      });
      const reset = P.h('button', { type: 'button', class: 'btn' }, '처음부터');
      reset.addEventListener('click', () => { k = 0; render(); });
      const stageList = P.h('ol', { class: 'sim-stages' });
      const grid = P.h('div', { class: 'sim-cards' });
      const sum = P.h('div', { class: 'sim-sum', 'aria-live': 'polite' });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-btns' }, ...btns, reset),
        stageList, sum, grid
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-btns .btn[disabled]{opacity:.45}
        .sim-stages{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px;font-size:13.5px;word-break:keep-all}
        .sim-stages li.off{color:var(--muted)}
        .sim-stages li b{margin-right:6px}
        .sim-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:100%}
        .sim-card{min-width:0;border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff;font-size:13px;display:flex;flex-direction:column;gap:4px;word-break:keep-all}
        .sim-card .sim-tag{font-size:12px;font-weight:800;color:var(--muted)}
        .sim-card.caught{border-color:var(--acc1);background:color-mix(in srgb,var(--acc1) 8%,white)}
        .sim-card.caught .sim-tag{color:var(--acc1)}
        .sim-card.miss{border-color:var(--acc2);background:color-mix(in srgb,var(--acc2) 8%,white)}
        .sim-card.miss .sim-tag{color:var(--acc2)}
        .sim-card.fp{border-style:dashed;border-color:var(--acc2)}
        .sim-card.fp .sim-tag{color:var(--acc2)}
        .sim-sum{font-weight:800;font-size:14px;font-family:var(--mono)}
      ` }));

      function status(c) {
        if (c.bad) {
          if (k >= c.by) return { cls: 'caught', tag: `걸러짐 · ${NAMES[c.by]}${c.note ? '(' + c.note + ')' : ''}` };
          return { cls: 'miss', tag: k === 0 ? '체 꺼짐 · 통과' : '놓침' };
        }
        if (c.falseAt && k >= c.falseAt && k < c.release) return { cls: 'fp', tag: '잘못 걸림(오탐)' };
        if (c.falseAt && k >= c.release) return { cls: '', tag: '사람 확인 뒤 풀려남' };
        return { cls: '', tag: '통과(일반 사진)' };
      }
      function render() {
        btns.forEach((b, i) => { b.disabled = i !== k; });
        stageList.innerHTML = '';
        STAGES.forEach((s, i) => stageList.append(P.h('li', { class: i < k ? '' : 'off' }, P.h('b', {}, `${s.name}${i < k ? ' 켜짐' : ' 꺼짐'}`), s.desc)));
        grid.innerHTML = '';
        let caught = 0, miss = 0, fp = 0;
        CARDS.forEach(c => {
          const st = status(c);
          if (st.cls === 'caught') caught++; else if (st.cls === 'miss') miss++; else if (st.cls === 'fp') fp++;
          grid.append(P.h('div', { class: `sim-card ${st.cls}` }, P.h('span', {}, c.label), P.h('span', { class: 'sim-tag' }, st.tag)));
        });
        sum.textContent = `걸러짐 ${caught} · 놓침 ${miss} · 잘못 걸린 일반 사진 ${fp}`;
      }
      render();
    }
  },

  teacherLines: [
    '이런 사진이나 영상을 받으면 <b>다시 보내지도, 저장하지도 말고</b> 바로 선생님께 알려 주세요. 혼날 일이 아니라 도움받을 일이에요.',
    '장난으로 만든 합성 사진도 <b>학교폭력이고 범죄</b>예요. 친구 얼굴은 허락 없이 합성하지 않아요.'
  ],
  tip: {
    body: '사안을 알게 되면 순서를 지키세요. ① 학교 종사자는 직무상 알게 된 아동·청소년대상 성범죄를 즉시 수사기관에 신고해요(112, 사이버범죄 신고시스템 ECRM). ② 피해 학생과 보호자에게 중앙디지털성범죄피해자지원센터(02-735-8994)와 여성긴급전화 1366(24시간)을 안내해 상담·삭제지원을 연결해요. ③ 학교폭력 절차로 보호 조치를 진행해요.',
    extra: '확인한다며 파일을 내려받거나 다른 교사에게 전달하지 마세요. 합성물의 소지·저장·시청도 처벌 대상이에요. 증거는 지원센터의 채증 지원을 받고, 신고한 학생의 이름·사진이 퍼지지 않게 주의해요(신고자 신원 공개 금지).'
  },
  myth: {
    myth: 'AI 탐지 기술이 알아서 다 걸러 주니 학교는 지켜보면 된다.',
    fact: '해시는 이미 알려진 파일만 잡아요. AI 필터는 새것도 잡지만 실제 유통물 앞에서는 성능이 크게 떨어져요. 학교 종사자에게는 즉시 신고 의무가 있고, 피해 지원은 공식 센터로 바로 연결해야 해요.'
  },
  sources: [
    { title: '성평등가족부 등 보도자료: 정부, 성착취물 유통 불법사이트 전방위 압박 (제3차 범정부 디지털 성범죄 대응 협의체, 2026-09-22)', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156782929', note: '활성 불법사이트 29% 감소, 운영자 32명 검거·66개 운영 중단, CDN 단계 접근제한 380개, 2027~2030년 AI 기반 탐지 기술 개발 계획.' },
    { title: '중앙디지털성범죄피해자지원센터 공식 누리집', url: 'https://d4u.stop.or.kr/ko/main', note: '딥페이크 등 피해 상담·삭제지원·채증지원, 상담전화 02-735-8994, 여성긴급전화 1366, 제3자 신고 안내(ECRM).' },
    { title: '아동·청소년의 성보호에 관한 법률 제34조 (국가법령정보센터)', url: 'https://www.law.go.kr/법령/아동ㆍ청소년의성보호에관한법률/제34조', note: '학교의 장과 종사자의 즉시 신고 의무, 신고자 신원 공개 금지.' },
    { title: 'Deepfake-Eval-2024: A Multi-Modal In-the-Wild Benchmark of Deepfakes Circulated in 2024 (arXiv, 2025)', url: 'https://arxiv.org/abs/2503.02857', note: '실제 유통 딥페이크 앞에서 공개 탐지 모델 AUC가 영상 50%, 음성 48%, 이미지 45% 하락.' }
  ],
  script: `9월 22일 범정부 디지털 성범죄 대응 협의체가 불법사이트 대응 실적을 점검했어요. 활성 불법사이트는 29% 줄었고, 과기정통부는 2027년부터 AI로 불법사이트를 탐지·추적하는 기술을 개발할 계획이에요.

플랫폼 쪽 기술은 두 가지예요. 해시는 파일의 디지털 지문이라, 이미 신고된 피해물의 지문과 맞춰 보면 사본을 바로 막아요. 하지만 목록에 없는 새 합성물은 못 잡아서 AI 필터와 문맥 분석이 빈칸을 맡아요. 2025년 연구에서는 실제 유통된 딥페이크 앞에서 공개 탐지 모델 성능이 절반 가까이 떨어졌어요. 그래서 마지막은 사람의 확인이에요.

교사가 할 일은 따로 있어요. 직무상 알게 되면 즉시 수사기관에 신고하고, 피해 학생은 중앙디지털성범죄피해자지원센터나 1366으로 연결해요. 확인한다며 내려받거나 돌려 보지 말고, 증거는 센터의 채증 지원을 받아요.`
};
