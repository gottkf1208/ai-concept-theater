/* S5-2 공개된 모델과 닫힌 모델, 무엇이 다를까: 오픈 웨이트·라이선스·MoE */
export default {
  slug: 'v5-open-weight',
  track: 'S5',
  title: '공개된 모델과 닫힌 모델, 무엇이 다를까',
  subtitle: '오픈 웨이트, 라이선스, 전문가 혼합(MoE)',
  summary: '"무료로 내려받는 AI 모델, 학교에서 써도 되나요?" 모델 카드의 라이선스 칸(Apache-2.0·MIT·커스텀)이 정하는 조건과, 전체 파라미터와 활성 파라미터가 다른 전문가 혼합(MoE) 구조를 공식 모델 카드로 짚어요.',
  keywords: ['오픈 웨이트', '가중치', '라이선스', 'Apache-2.0', 'MIT', '커스텀 라이선스', '금지 용도 정책', '전문가 혼합', 'MoE', '라우터', '활성 파라미터', '양자화', '오픈 소스 AI 정의'],

  scenes: [
    {
      title: '내려받아도 되나요?', dur: 14,
      captions: [
        { t: 0, text: '연구회 단체 대화방에 "무료로 내려받는 모델, 학교 서버에 올려도 되나요?"라는 질문이 올라왔어요.' },
        { t: 5, text: '답은 모델 카드 맨 위, <em>라이선스</em> 칸에 있어요. apache-2.0 · mit · 커스텀, 세 갈래로 갈려요.' },
        { t: 10, text: '같은 "무료 다운로드"인데 쓸 수 있는 조건은 서로 많이 달라요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 340, size: 300, pose: 'think' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 60, w: 560, text: '무료로 내려받는 모델, 학교 서버에 올려도 돼요?', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const cards = [
          ['gpt-oss-20b', 'license: apache-2.0<br>"자유롭게 빌드"', 'aqua'],
          ['DeepSeek-R1', 'license: mit<br>상업적 사용 허용', 'ink'],
          ['Llama 3.1 8B', 'license: llama3.1(커스텀)<br>조건 따로 있음', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 320, y: 190, w: 280, h: 170, label, sub, accent: acc, icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), 5.2 + i * 1.3, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 400, text: '라이선스 칸부터 확인해요', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.2, { from: 'pop' });
        const note = P.text({ x: 330, y: 450, w: 900, text: '같은 "무료 다운로드"인데 조건은 서로 <em>달라요</em>.', size: 28, weight: 800 });
        tl.at(stage.appendChild(note.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 10);
            cards.forEach((c, i) => c.on(t > 5.2 + i * 1.3));
          }
        };
      }
    },
    {
      title: '오픈 웨이트란', dur: 13,
      captions: [
        { t: 0, text: '닫힌 모델은 질문을 회사 서버로 보내고 답만 받아요. <em>가중치</em>(학습으로 정해진 수십억 개의 숫자)는 안 보여요.' },
        { t: 5, text: '오픈 웨이트는 이 가중치 파일을 통째로 내려받아 내 컴퓨터에서 돌려요.' },
        { t: 9, text: '오픈 소스 정의를 만드는 단체는 오픈 소스 AI라면 <em>데이터 정보 · 코드 · 가중치</em> 셋을 다 공개하라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const closed = P.box({ x: 330, y: 100, w: 390, h: 150, label: '닫힌 모델', sub: '질문 → 회사 서버 → 답<br>가중치는 안 보여요', accent: 'ink', icon: P.ICON.x });
        const open = P.box({ x: 760, y: 100, w: 390, h: 150, label: '오픈 웨이트', sub: '가중치 파일 다운로드<br>내 컴퓨터·학교 서버에서 실행', accent: 'aqua', icon: P.ICON.save });
        tl.at(stage.appendChild(closed.el), .3, { from: 'up' });
        tl.at(stage.appendChild(open.el), 1.2, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 725, y1: 175, x2: 755, y2: 175, width: 4, color: '#1B1F24' });
        const chip = P.chip({ x: 330, y: 280, text: '가중치 공개 ≠ 학습 데이터 공개', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 4.2, { from: 'pop' });
        const parts = [
          ['데이터 정보', '학습 데이터를 거의 그대로<br>재현할 만한 상세 정보', 'orange'],
          ['코드', '학습 · 실행 전체 코드', 'ink'],
          ['가중치', '파라미터 파일 공개<br>(여기가 오픈 웨이트)', 'aqua']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 270, y: 360, w: 240, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), 8.2 + i * .6, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 330, y: 500, w: 900, text: '오픈 웨이트는 이 셋 중 <em>가중치 하나만</em> 공개해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            arrow.draw(P.clamp((t - .9) / .5, 0, 1));
            parts.forEach((b, i) => b.on(t > 8.2 + i * .6));
          }
        };
      }
    },
    {
      title: '라이선스 세 갈래', dur: 14,
      captions: [
        { t: 0, text: 'gpt-oss-20b · Qwen3-30B-A3B · Gemma 4가 쓰는 Apache-2.0은 사용 · 수정 · 배포가 자유롭고 특허 조항도 있어요.' },
        { t: 5, text: 'DeepSeek-R1이 쓰는 MIT는 짧고 자유로워요. 이 모델은 다른 모델을 가르치는 <em>증류</em>까지 허용한다고 카드에 적었어요.' },
        { t: 9.5, text: 'Llama 3.1 같은 커스텀 약관에는 이용자 수 조건과 표시 의무가 붙어요. 같은 Gemma도 3까지는 커스텀, 4부터는 Apache 2.0이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 420, size: 260, pose: 'base' });
        stage.append(q.el);
        const cards = [
          ['Apache-2.0', 'gpt-oss-20b · Qwen3-30B-A3B<br>Gemma 4<br>사용 · 수정 · 배포 자유<br>특허 조항 있음', 'aqua'],
          ['MIT', 'DeepSeek-R1<br>짧고 자유<br>증류까지 명시적으로 허용', 'ink'],
          ['커스텀 약관', 'Llama 3.1 · Gemma 3까지<br>이용자 7억 명 넘으면<br>별도 라이선스 필요<br>"Built with Llama" 표시', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 310, y: 90, w: 280, h: 300, label, sub, accent: acc, icon: P.ICON.check });
          tl.at(stage.appendChild(b.el), .3 + i * 1.3, { from: 'up' });
          return b;
        });
        const chip = P.chip({ x: 330, y: 440, text: '같은 Gemma, 3까지 커스텀 → 4부터 Apache 2.0', color: 'orange', size: 20 });
        tl.at(stage.appendChild(chip.el), 9.8, { from: 'pop' });
        const final = P.text({ x: 330, y: 500, w: 900, text: '버전마다 라이선스 칸을 <em>다시</em> 봐요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
            cards.forEach((c, i) => c.on(t > .3 + i * 1.3));
          }
        };
      }
    },
    {
      title: '전문가 혼합(MoE)', dur: 14,
      captions: [
        { t: 0, text: '전문가 혼합(MoE)은 층마다 전문가를 여러 개 두고, <em>라우터</em>가 토큰마다 몇 명만 골라 계산해요.' },
        { t: 5, text: 'Mixtral은 전문가 8개 중 2개를 골라요. 전체 47B 중 일하는 건 13B뿐이에요.' },
        { t: 9.5, text: 'Qwen3-30B-A3B는 전문가 128개 중 8개가 활성이에요. 이름의 <em>A3B</em>는 활성 파라미터가 약 3B라는 뜻이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const cells = Array.from({ length: 8 }, (_, i) => {
          const on = i === 2 || i === 5;
          const cell = P.h('div', { style: `left:${400 + i * 70}px;top:${110}px;width:56px;height:56px;border-radius:12px;position:absolute;background:${on ? 'var(--acc2)' : 'var(--paper)'};border:2px solid ${on ? 'var(--acc2)' : 'var(--line)'}` });
          tl.at(stage.appendChild(cell), .3 + i * .15, { from: 'pop' });
          return cell;
        });
        const routLab = P.text({ x: 400, y: 180, w: 560, text: '라우터가 토큰마다 2개만 선택', size: 18, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(routLab.el), 2.2, { from: 'up' });
        const a = P.box({ x: 400, y: 320, w: 330, h: 130, label: 'Mixtral', sub: '전체 47B / 활성 13B<br>전문가 8개 중 2개', accent: 'orange', icon: P.ICON.doc });
        const b = P.box({ x: 760, y: 320, w: 330, h: 130, label: 'Qwen3-30B-A3B', sub: '전체 30.5B / 활성 3.3B<br>전문가 128개 중 8개', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(a.el), 5.2, { from: 'up' });
        tl.at(stage.appendChild(b.el), 9.7, { from: 'up' });
        const final = P.text({ x: 400, y: 480, w: 700, text: '이름의 <em>A3B</em>는 활성 파라미터 약 3B라는 뜻이에요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 11.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.4);
            a.on(t > 5.2); b.on(t > 9.7);
          }
        };
      }
    },
    {
      title: '학교에서 쓴다면', dur: 13,
      captions: [
        { t: 0, text: '오픈 웨이트를 학교 기기에 내려받으면 좋은 점과 책임이 같이 따라와요.' },
        { t: 5, text: 'gpt-oss-20b는 양자화 덕분에 <em>16GB 메모리 안에서</em> 돌아가요. 학교 컴퓨터실 사양으로도 노려볼 만해요.' },
        { t: 9, text: '좋은 점은 저절로 오지만, 책임은 학교가 직접 챙겨야 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 320, size: 320, pose: 'wave' });
        stage.append(q.el);
        const good = P.box({ x: 330, y: 130, w: 390, h: 180, label: '장점', sub: '학교 기기에서 돌리면<br>글이 밖으로 안 나가요<br>버전을 고정해 둘 수 있어요', accent: 'aqua', icon: P.ICON.check });
        const resp = P.box({ x: 760, y: 130, w: 390, h: 180, label: '책임', sub: '라이선스 · 금지 용도 지키기<br>안전 필터 · 업데이트는<br>학교가 직접 챙겨요', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(good.el), .3, { from: 'up' });
        tl.at(stage.appendChild(resp.el), 1.1, { from: 'up' });
        const chip = P.chip({ x: 330, y: 360, text: 'gpt-oss-20b: 16GB 메모리 안에서(양자화)', color: 'gray', size: 20 });
        tl.at(stage.appendChild(chip.el), 5.2, { from: 'pop' });
        const final = P.text({ x: 330, y: 420, w: 900, text: '내려받는 순간 <em>운영 책임</em>도 함께 내려받아요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9);
            good.on(t > .3); resp.on(t > 1.1);
          }
        };
      }
    }
  ],

  interaction: {
    title: '모델 카드 읽기와 라우터 체험',
    desc: '위쪽에서 모델 카드를 고르고 체크박스로 하려는 일을 골라 보세요. 라이선스 칸이 정한 규칙에 따라 "가능 / 조건 있음 / 카드에서 확인 필요"가 바로 바뀌어요. 아래쪽은 전문가 혼합(MoE) 라우터예요. <b>"다음 토큰 보내기"</b>를 누르면 토큰마다 전문가 몇 명이 켜지는지 보여 줘요. 라우터 선택은 예시 값이에요. 라이선스 · 파라미터는 2026-10-02 공식 모델 카드 기준이에요.',
    mount(el, P) {
      const MODELS = [
        { key: 'gpt-oss-20b', label: 'gpt-oss-20b', license: 'apache', total: '21B', active: '3.6B', experts: 0, note: '전문가 수는 카드에 없어요' },
        { key: 'qwen3-30b-a3b', label: 'Qwen3-30B-A3B', license: 'apache', total: '30.5B', active: '3.3B', experts: 128, activeExperts: 8, shared: 0 },
        { key: 'deepseek-r1', label: 'DeepSeek-R1', license: 'mit', total: '671B', active: '37B', experts: 8, activeExperts: 2, shared: 0, example: true },
        { key: 'llama-3.1-8b', label: 'Llama 3.1 8B Instruct', license: 'custom', total: '8B', active: '8B(조밀)', experts: 0, dense: true },
        { key: 'gemma-4-26b-a4b', label: 'Gemma-4-26B-A4B', license: 'apache', total: '25.2B', active: '3.8B', experts: 128, activeExperts: 8, shared: 1 }
      ];
      const LICENSE_RULE = {
        apache: {
          deploy: ['가능', 'Apache-2.0은 특허 위험 없이 자유롭게 빌드할 수 있어요.'],
          rename: ['가능', '수정 · 재배포가 자유로워요. 새 이름으로 공개해도 돼요.'],
          distill: ['가능', '사용 · 수정이 자유로운 라이선스라 증류도 막지 않아요.']
        },
        mit: {
          deploy: ['가능', 'MIT는 상업적 사용을 명시적으로 허용해요.'],
          rename: ['가능', '수정 · 파생물 공개가 자유로워요.'],
          distill: ['가능', 'DeepSeek-R1 카드가 증류까지 명시적으로 허용한다고 적어 뒀어요.']
        },
        custom: {
          deploy: ['조건 있음', '금지 용도 정책 준수, 월간 이용자 7억 명 넘으면 Meta에 별도 라이선스, 재배포 시 라이선스 동봉.'],
          rename: ['조건 있음', '이름 앞에 "Llama"를 붙이고 "Built with Llama"를 표시해야 해요.'],
          distill: ['카드에서 확인 필요', 'Llama 3.1 카드에는 증류를 따로 다룬 문장이 없어요. 직접 확인하세요.']
        }
      };
      const CHECKS = [
        ['deploy', '수업용 앱에 넣어 배포'],
        ['rename', '고쳐서 새 이름으로 공개'],
        ['distill', '이 모델 답으로 작은 모델 학습(증류)']
      ];
      const select = P.h('select', { id: 'sim-model', class: 'sim-select' }, ...MODELS.map(m => P.h('option', { value: m.key }, m.label)));
      const selLab = P.h('label', { for: 'sim-model', class: 'sim-lab' }, '모델 카드');
      const boxes = { deploy: P.h('input', { type: 'checkbox', id: 'c-deploy' }), rename: P.h('input', { type: 'checkbox', id: 'c-rename' }), distill: P.h('input', { type: 'checkbox', id: 'c-distill' }) };
      const checkRow = P.h('div', { class: 'sim-checks' }, ...CHECKS.map(([k, label]) => P.h('label', { class: 'sim-check' }, boxes[k], label)));
      const results = P.h('div', { class: 'sim-results' });
      const licenseCard = P.h('div', { class: 'sim-lic' });
      const top = P.h('div', { class: 'sim-top' }, P.h('div', { class: 'sim-row' }, selLab, select), licenseCard, checkRow, results);

      const tokens = ['쿼카가', '교실에서', '웃어요'];
      let tokenIdx = -1;
      const tokenLab = P.h('div', { class: 'sim-token' }, '토큰: 아직 없음');
      const grid = P.h('div', { class: 'sim-grid' });
      const routerMsg = P.h('div', { class: 'sim-rmsg' });
      const activeLab = P.h('div', { class: 'sim-active' }, '');
      const next = P.h('button', { class: 'btn primary', type: 'button' }, '다음 토큰 보내기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');
      const bottom = P.h('div', { class: 'sim-bottom' }, P.h('div', { class: 'sim-row' }, next, resetBtn, tokenLab), routerMsg, grid, activeLab);

      el.append(P.h('div', { class: 'sim-wrap' }, top, P.h('hr', { class: 'sim-hr' }), bottom));
      el.append(P.h('style', {
        html: `
        .sim-wrap{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-hr{border:none;border-top:1px solid var(--line);margin:0;width:100%}
        .sim-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-lab{font-size:13px;color:var(--muted);font-weight:700}
        .sim-select{max-width:100%;padding:7px 10px;border-radius:8px;border:1px solid var(--line);font-size:14px}
        .sim-lic{font-size:13px;color:var(--muted);background:var(--paper);border-radius:10px;padding:8px 12px;word-break:keep-all}
        .sim-lic b{color:var(--ink)}
        .sim-checks{display:flex;flex-direction:column;gap:6px;max-width:100%}
        .sim-check{display:flex;align-items:center;gap:8px;font-size:14px;word-break:keep-all}
        .sim-results{display:flex;flex-direction:column;gap:8px;max-width:100%}
        .sim-res-row{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13px}
        .sim-res-tag{font-weight:800;border-radius:999px;padding:2px 10px;font-size:12px;white-space:nowrap}
        .sim-res-tag.ok{background:color-mix(in srgb,var(--acc1) 16%,white);color:var(--acc1)}
        .sim-res-tag.cond{background:color-mix(in srgb,var(--acc2) 18%,white);color:var(--acc2)}
        .sim-res-tag.check{background:var(--paper);color:var(--muted)}
        .sim-res-note{color:var(--muted);word-break:keep-all}
        .sim-token{font-size:13px;color:var(--muted);margin-left:auto}
        .sim-grid{display:grid;grid-template-columns:repeat(16,1fr);gap:3px;max-width:100%;margin-top:10px}
        .sim-grid.g8{grid-template-columns:repeat(8,1fr)}
        .sim-cell{aspect-ratio:1;border-radius:3px;background:var(--paper);border:1px solid var(--line)}
        .sim-cell.on{background:var(--acc2);border-color:var(--acc2)}
        .sim-cell.shared{background:var(--acc1);border-color:var(--acc1)}
        .sim-rmsg{font-size:13px;color:var(--muted);word-break:keep-all}
        .sim-active{font-family:var(--mono);font-size:13px;color:var(--muted);margin-top:4px}
      ` }));

      function current() { return MODELS.find(m => m.key === select.value); }
      function pickActive(total, count, seed) {
        const idx = Array.from({ length: total }, (_, i) => i);
        const r = P.rng(seed);
        for (let i = idx.length - 1; i > 0 && idx.length - i <= count * 3; i--) {
          const j = Math.floor(r() * (i + 1));
          [idx[i], idx[j]] = [idx[j], idx[i]];
        }
        return new Set(idx.slice(idx.length - count));
      }
      function renderLicense() {
        const m = current();
        const names = { apache: 'apache-2.0', mit: 'mit', custom: m.key === 'llama-3.1-8b' ? 'llama3.1(커스텀)' : '커스텀' };
        licenseCard.innerHTML = `<b>${m.label}</b> · license: ${names[m.license]} · 전체 ${m.total} / 활성 ${m.active}`;
        results.replaceChildren(...CHECKS.map(([k, label]) => {
          const [tag, note] = LICENSE_RULE[m.license][k];
          const cls = tag === '가능' ? 'ok' : (tag === '조건 있음' ? 'cond' : 'check');
          return P.h('div', { class: 'sim-res-row' }, P.h('span', {}, label), P.h('span', { class: `sim-res-tag ${cls}` }, tag), P.h('span', { class: 'sim-res-note' }, note));
        }));
      }
      function renderRouter() {
        const m = current();
        if (m.dense) {
          grid.replaceChildren(); grid.className = 'sim-grid';
          routerMsg.textContent = 'MoE 아님 · 조밀 모델이라 전문가가 없어요.';
          activeLab.textContent = `활성 ${m.active} (모델 전체가 항상 계산에 참여)`;
          return;
        }
        if (!m.experts) {
          grid.replaceChildren(); grid.className = 'sim-grid';
          routerMsg.textContent = '카드에 전문가 수가 없어서 라우터를 보여 줄 수 없어요.';
          activeLab.textContent = `전체 ${m.total} / 활성 ${m.active}`;
          return;
        }
        grid.className = m.experts > 16 ? 'sim-grid' : 'sim-grid g8';
        const activeSet = tokenIdx < 0 ? new Set() : pickActive(m.experts, m.activeExperts, (tokenIdx + 1) * 97 + m.experts);
        const cells = Array.from({ length: m.experts }, (_, i) => P.h('div', { class: `sim-cell ${activeSet.has(i) ? 'on' : ''}` }));
        if (m.shared) cells.push(P.h('div', { class: 'sim-cell shared' }));
        grid.replaceChildren(...cells);
        routerMsg.textContent = m.example
          ? `Mixtral 구조(전문가 8, 활성 2)로 원리만 보여 드려요 · 실제 전문가 수는 ${m.label} 카드에 없어요.`
          : (m.shared ? '진한 칸: 토큰마다 바뀌는 전문가 · 파란 칸: 항상 켜지는 공유 전문가' : '진한 칸이 이 토큰에서 켜진 전문가예요.');
        activeLab.textContent = `전체 ${m.total} / 활성 ${m.active} · 전문가 ${m.experts}개 중 ${m.activeExperts}개(${tokenIdx < 0 ? '아직 선택 전' : '선택됨'})`;
      }
      function renderToken() {
        tokenLab.textContent = tokenIdx < 0 ? '토큰: 아직 없음' : `토큰 ${tokenIdx + 1}/${tokens.length}: "${tokens[tokenIdx]}"`;
      }
      function renderAll() { renderLicense(); renderToken(); renderRouter(); }

      select.addEventListener('change', renderAll);
      Object.values(boxes).forEach(b => b.addEventListener('change', renderLicense));
      next.addEventListener('click', () => { tokenIdx = (tokenIdx + 1) % tokens.length; renderToken(); renderRouter(); });
      resetBtn.addEventListener('click', () => { tokenIdx = -1; renderToken(); renderRouter(); });
      select.value = 'qwen3-30b-a3b';
      renderAll();
    }
  },

  teacherLines: [
    '오픈 웨이트는 <b>모델 파일을 내려받을 수 있다</b>는 뜻이지, 아무 조건 없이 써도 된다는 뜻은 아니에요. 라이선스 칸부터 읽어요.',
    '전문가 혼합 모델은 <b>전문가 몇 명만 골라 일을 시켜서</b> 크기에 비해 빨라요.'
  ],
  tip: {
    body: '모델을 내려받기 전에 모델 카드에서 세 가지를 적어 두세요. ① license 칸(Apache-2.0 · MIT · 커스텀) ② 금지 용도 정책 링크가 있는지 ③ 전체 파라미터와 활성 파라미터. 커스텀이면 표시 의무 · 이름 규칙 · 이용자 수 조건을 따로 읽어요.',
    extra: '학생 이름이 들어가는 실습이라면 오픈 웨이트 모델을 학교 기기에서 돌리면 글이 외부 서버로 나가지 않아요. 대신 유해 답변을 거르는 안전 장치와 업데이트는 학교가 직접 챙겨야 해요.'
  },
  myth: {
    myth: '오픈 웨이트 모델은 오픈 소스라서 학습 데이터까지 다 공개돼 있고, 누구나 마음대로 써도 된다.',
    fact: '대부분은 가중치만 공개해요. 오픈 소스 AI 정의는 데이터 정보 · 코드 · 가중치 셋을 다 요구해요. 쓰는 조건은 라이선스 칸이 정하고, 커스텀 라이선스에는 금지 용도와 표시 의무가 붙어요.'
  },
  sources: [
    { title: 'Qwen3-30B-A3B 공식 모델 카드 (Hugging Face)', url: 'https://huggingface.co/Qwen/Qwen3-30B-A3B', note: '라이선스 apache-2.0, 전체 30.5B · 활성 3.3B, 전문가 128개 중 8개 활성.' },
    { title: 'DeepSeek-R1 공식 모델 카드 (Hugging Face)', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1', note: '코드와 가중치 모두 MIT, 상업적 사용 · 증류까지 허용을 명시. 전체 671B · 활성 37B MoE.' },
    { title: 'Llama 3.1 8B Instruct 공식 모델 카드 (Hugging Face)', url: 'https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct', note: '커스텀 커뮤니티 라이선스. 이용자 7억 명 조건, "Built with Llama" 표시, 금지 용도 정책.' },
    { title: 'Mixtral of Experts (arXiv, 2024)', url: 'https://arxiv.org/abs/2401.04088', note: '전문가 8개 중 라우터가 토큰마다 2개를 고르는 MoE 구조. 전체 47B 중 추론 시 13B만 활성.' }
  ],
  script: `무료로 내려받는 모델, 학교 서버에 올려도 되나요? 답은 모델 카드의 라이선스 칸에 있어요. gpt-oss-20b, Qwen3-30B-A3B, Gemma 4는 Apache-2.0이라 사용·수정·배포가 자유로워요. DeepSeek-R1은 MIT라서 증류까지 허용하고요. Llama 3.1은 커스텀 약관이라 이용자 7억 명을 넘으면 별도 라이선스가 필요해요.

가중치를 공개했다고 오픈 소스 AI가 되지는 않아요. 오픈 소스 정의는 데이터 정보·코드·가중치를 다 요구하는데, 대부분은 가중치만 공개해서 오픈 웨이트라고 불러요.

구조도 달라요. Qwen3-30B-A3B는 전문가 128개 중 라우터가 토큰마다 8개만 골라요. 전체 30.5B 중 활성은 3.3B고, 이름의 A3B가 그 뜻이에요. 학교 기기에서 돌리면 글이 밖으로 안 나가지만, 라이선스와 안전 장치는 학교가 챙겨야 해요.`
};
