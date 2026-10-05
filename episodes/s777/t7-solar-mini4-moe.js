/* S777-46 350억인데 30억만 일하는 모델: 전문가 혼합(MoE)의 라우터와 활성 파라미터 */
export default {
  slug: 't7-solar-mini4-moe',
  track: 'S777',
  title: '350억인데 30억만 일하는 모델',
  subtitle: '전문가 혼합(MoE)의 라우터와 활성 파라미터',
  summary: '10월 1일 업스테이지가 처음부터 직접 사전학습한 에이전트용 소형 모델 Solar Mini 4를 공개했어요. 전체 350억(35B) 파라미터 중 토큰마다 30억(3B)만 일해요. 라우터가 점수를 매겨 전문가를 고르는 방식, 일이 한쪽에 몰리지 않게 하는 장치, \'계산은 작지만 메모리는 전부 필요하다\'는 점까지 짚어요.',
  keywords: ['Solar Mini 4', '업스테이지', 'Upstage', '전문가 혼합', 'MoE', 'Mixture of Experts', '라우터', '게이트', '소프트맥스', '상위 k', 'top-k', '활성 파라미터', '전체 파라미터', '부하 균형', '보조 손실', 'Switch Transformer', '메모리', '512K 컨텍스트'],

  scenes: [
    {
      title: '10월 1일, 국내에서 나온 작은 모델', dur: 13,
      captions: [
        { t: 0, text: '10월 1일 업스테이지가 처음부터 직접 사전학습한 에이전트용 모델 <em>Solar Mini 4</em>를 공개했어요.' },
        { t: 5, text: '전체 파라미터는 350억(35B) 개인데, 글자 조각(토큰) 하나를 만들 때는 <em>30억(3B) 개만</em> 일해요.' },
        { t: 9.5, text: '입력은 51.2만 토큰까지 받고 출력은 12.8만 토큰까지 내요. 어떻게 일부만 일할 수 있을까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 300, pose: 'point' });
        stage.append(q.el);
        const who = P.chip({ x: 360, y: 88, text: '10월 1일 · 업스테이지 · Solar Mini 4', color: 'ink', size: 20 });
        tl.at(stage.appendChild(who.el), .3, { from: 'pop' });
        const all = P.box({ x: 360, y: 150, w: 520, h: 300, label: '전체 35B', accent: '' });
        all.el.style.justifyContent = 'flex-start'; all.el.style.paddingTop = '16px';
        tl.at(stage.appendChild(all.el), .8, { from: 'up' });
        const cells = [];
        for (let i = 0; i < 35; i++) {
          const c = P.h('div', { style: `left:${394 + (i % 7) * 66}px;top:${226 + Math.floor(i / 7) * 42}px;width:56px;height:30px;border-radius:8px;background:#9AA5AF;opacity:.35;z-index:4` });
          stage.append(c);
          tl.at(c, 1 + i * .03, { from: 'pop' });
          cells.push(c);
        }
        const LIT = [9, 17, 30];
        const act = P.chip({ x: 640, y: 466, text: '활성 3B', color: 'orange', size: 22 });
        tl.at(stage.appendChild(act.el), 5.4, { from: 'pop' });
        const specs = [['컨텍스트 512K', 'aqua'], ['출력 최대 128K', 'aqua'], ['입력 $0.10 · 출력 $0.40', 'gray']].map(([text, color], i) => {
          const c = P.chip({ x: 920, y: 160 + i * 66, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), 9.6 + i * .3, { from: 'right' });
          return c;
        });
        const per = P.text({ x: 920, y: 360, w: 300, text: '가격: 100만 토큰당', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(per.el), 10.4, { from: 'up' });
        const ask = P.text({ x: 360, y: 540, w: 840, text: '어떻게 <em>일부만</em> 일할 수 있을까요?', size: 30, weight: 800 });
        tl.at(stage.appendChild(ask.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.3);
            const on = t > 5.2;
            cells.forEach((c, i) => {
              const lit = on && LIT.includes(i);
              c.style.background = lit ? 'var(--acc2)' : 'var(--muted2)';
              c.style.opacity = lit ? '1' : '.35';
            });
          }
        };
      }
    },
    {
      title: '전문가 혼합, 한 번 더', dur: 13,
      captions: [
        { t: 0, text: '지난 편에서 본 <em>전문가 혼합(MoE)</em>이에요. 층마다 작은 신경망(전문가)을 여러 개 두고, 토큰마다 몇 개만 불러요.' },
        { t: 5, text: '누구를 부를지는 함께 학습되는 <em>라우터</em>(게이트)가 정해요. 고른 전문가의 결과를 합쳐 다음으로 넘겨요.' },
        { t: 9, text: '2017년 연구는 이 방식으로 모델 용량을 <em>1,000배 넘게</em> 키우면서도 계산 효율은 조금만 잃었어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const tok = P.chip({ x: 340, y: 292, text: '토큰', color: 'ink', size: 22 });
        tl.at(stage.appendChild(tok.el), .3, { from: 'left' });
        const router = P.box({ x: 470, y: 260, w: 190, h: 110, label: '라우터', sub: '= 게이트', accent: 'aqua' });
        tl.at(stage.appendChild(router.el), 5.2, { from: 'pop' });
        const head = P.text({ x: 760, y: 82, w: 300, text: '전문가 8개(예시)', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(head.el), .6, { from: 'up' });
        const LIT = [1, 4];
        const ex = Array.from({ length: 8 }, (_, i) => {
          const c = P.chip({ x: 760, y: 124 + i * 56, text: `전문가 ${i + 1}`, color: 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), .8 + i * .15, { from: 'right' });
          return c;
        });
        const a0 = P.arrow(lines, { x1: 410, y1: 314, x2: 462, y2: 314, width: 4, color: '#1B1F24' });
        const aIn = LIT.map(i => P.arrow(lines, { x1: 666, y1: 315, x2: 752, y2: 143 + i * 56, curve: 8, width: 3, color: '#127E90' }));
        const sumBox = P.box({ x: 1000, y: 250, w: 200, h: 110, label: '합치기', sub: '다음으로', accent: 'ink' });
        tl.at(stage.appendChild(sumBox.el), 7, { from: 'right' });
        const aOut = LIT.map(i => P.arrow(lines, { x1: 880, y1: 143 + i * 56, x2: 994, y2: 305, curve: -8, width: 3, color: '#127E90' }));
        const big = P.chip({ x: 340, y: 600, text: '2017년 연구: 용량 1,000배 넘게, 효율 손실은 조금', color: 'orange', size: 20 });
        tl.at(stage.appendChild(big.el), 9.3, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 8.8);
            a0.draw(P.clamp((t - 5.4) / .4, 0, 1));
            aIn.forEach((a, k) => a.draw(P.clamp((t - (5.9 + k * .3)) / .5, 0, 1)));
            aOut.forEach((a, k) => a.draw(P.clamp((t - (7.3 + k * .3)) / .5, 0, 1)));
            ex.forEach((c, i) => { const on = t > 5.9 && LIT.includes(i); c.el.classList.toggle('c-aqua', on); c.el.classList.toggle('c-gray', !on); });
            router.on(t > 5.2);
          }
        };
      }
    },
    {
      title: '라우터는 점수를 매겨 고른다', dur: 14,
      captions: [
        { t: 0, text: '라우터는 토큰마다 전문가별 <em>점수</em>를 계산해요. 그다음 <em>소프트맥스</em>, 곧 점수들을 합이 100%인 비율로 바꾸는 계산을 해요.' },
        { t: 5.5, text: '비율이 높은 <em>상위 k개</em>만 실행하고, 결과는 그 비율대로 섞어요. 나머지 전문가는 이 토큰에선 쉬어요.' },
        { t: 10, text: '2021년 연구는 아예 <em>1개만</em> 고르게 단순화해서 같은 계산 자원으로 사전학습을 최대 7배 빠르게 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const formula = P.chip({ x: 380, y: 92, text: '점수 → 소프트맥스 → 상위 k만 실행', color: 'ink', size: 22 });
        tl.at(stage.appendChild(formula.el), .3, { from: 'pop' });
        const SC = [0.4, 2.1, -0.3, 0.9, 1.6, -0.8, 0.2, 0.0];
        const ex = SC.map(Math.exp); const tot = ex.reduce((a, b) => a + b, 0);
        const pct = ex.map(v => v / tot * 100);
        const top2 = pct.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]).slice(0, 2).map(x => x[1]);
        const bars = pct.map((p, i) => {
          const hgt = Math.round(p * 6.5);
          const b = P.h('div', { style: `left:${400 + i * 92}px;top:${470 - hgt}px;width:60px;height:${hgt}px;border-radius:10px 10px 4px 4px;background:#9AA5AF;transform-origin:bottom` });
          stage.append(b);
          tl.at(b, .8 + i * .12, { from: 'up' });
          const lab = P.text({ x: 384 + i * 92, y: 440 - hgt, w: 92, text: `${Math.round(p)}%`, size: 18, weight: 800, align: 'center' });
          tl.at(stage.appendChild(lab.el), 4.6, { from: 'up' });
          const num = P.text({ x: 384 + i * 92, y: 480, w: 92, text: String(i + 1), size: 18, weight: 700, align: 'center', cls: 'muted' });
          tl.at(stage.appendChild(num.el), .8 + i * .12, { from: 'up' });
          return b;
        });
        const note = P.text({ x: 380, y: 530, w: 400, text: '전문가 번호 · 예시 점수예요', size: 18, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 1.6, { from: 'up' });
        const sw = P.chip({ x: 820, y: 560, text: '2021년: 상위 1개만', color: 'orange', size: 22 });
        tl.at(stage.appendChild(sw.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.6);
            const k = t > 10 ? 1 : 2;
            bars.forEach((b, i) => {
              const sel = t > 5.6 && top2.slice(0, k).includes(i);
              b.style.background = sel ? 'var(--acc2)' : 'var(--muted2)';
              b.style.opacity = t > 5.6 && !sel ? '.45' : '1';
            });
          }
        };
      }
    },
    {
      title: '쏠림은 막고, 메모리는 다 올린다', dur: 14,
      captions: [
        { t: 0, text: '그냥 두면 라우터가 몇몇 전문가만 계속 골라요. 그래서 학습 때 골고루 쓰라는 <em>보조 손실</em>, 곧 추가 벌점을 줘요.' },
        { t: 5, text: '함정도 있어요. 계산은 3B만큼이지만, 어떤 전문가든 고를 수 있으려면 <em>35B 전부</em>가 메모리에 올라가 있어야 해요.' },
        { t: 10, text: '가중치를 16비트로 저장한다고 치고 계산하면 약 70GB예요. 업스테이지는 저장 정밀도를 밝히지 않았어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const mkGroup = (x0, hs, t0) => hs.map((hh, i) => {
          const b = P.h('div', { style: `left:${x0 + i * 40}px;top:${300 - hh}px;width:28px;height:${hh}px;border-radius:6px 6px 2px 2px;background:#1B1F24` });
          stage.append(b);
          tl.at(b, t0 + i * .1, { from: 'up' });
          return b;
        });
        mkGroup(360, [150, 30, 24, 36], .3);
        mkGroup(580, [76, 70, 82, 72], 2.4);
        const l1 = P.text({ x: 340, y: 316, w: 180, text: '쏠림', size: 22, weight: 800, align: 'center' });
        const l2 = P.text({ x: 560, y: 316, w: 180, text: '골고루', size: 22, weight: 800, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(l1.el), .5, { from: 'up' });
        tl.at(stage.appendChild(l2.el), 2.6, { from: 'up' });
        const arr = P.arrow(lines, { x1: 524, y1: 230, x2: 566, y2: 230, width: 4, color: '#1B1F24' });
        const aux = P.chip({ x: 360, y: 380, text: '보조 손실 = 골고루 쓰라는 벌점', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(aux.el), 2.8, { from: 'pop' });
        const g1 = P.text({ x: 820, y: 130, w: 380, text: '토큰당 계산 · 3B', size: 22, weight: 800 });
        const g2 = P.text({ x: 820, y: 240, w: 380, text: '메모리 · 35B 전부', size: 22, weight: 800 });
        tl.at(stage.appendChild(g1.el), 5.2, { from: 'up' });
        tl.at(stage.appendChild(g2.el), 6.4, { from: 'up' });
        const track = y => { const tr = P.h('div', { style: `left:820px;top:${y}px;width:380px;height:34px;border-radius:10px;background:#9AA5AF;opacity:.3` }); stage.append(tr); return tr; };
        const tr1 = track(172), tr2 = track(282);
        tl.at(tr1, 5.2, { from: 'none' }); tl.at(tr2, 6.4, { from: 'none' });
        const f1 = P.h('div', { style: 'left:820px;top:172px;width:0px;height:34px;border-radius:10px;background:#127E90' });
        const f2 = P.h('div', { style: 'left:820px;top:282px;width:0px;height:34px;border-radius:10px;background:#F2812D' });
        stage.append(f1, f2);
        const gb = P.chip({ x: 820, y: 346, text: '16비트로 친다면 약 70GB', color: 'orange', size: 22 });
        tl.at(stage.appendChild(gb.el), 10.2, { from: 'pop' });
        const lab = P.text({ x: 360, y: 470, w: 840, text: '사내 시험: H100 2장, 동시 요청 32개에서 요청당 초당 70토큰 넘게', size: 20, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(lab.el), 11, { from: 'up' });
        const final = P.text({ x: 360, y: 530, w: 840, text: '계산은 <i>3B</i>, 메모리는 <em>35B 전부</em>.', size: 30, weight: 800 });
        tl.at(stage.appendChild(final.el), 7.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.6 || t > 9.6);
            arr.draw(P.clamp((t - 2) / .4, 0, 1));
            f1.style.width = `${Math.round(380 * 3 / 35 * P.easeOut(P.clamp((t - 5.4) / .6, 0, 1)))}px`;
            f2.style.width = `${Math.round(380 * P.easeOut(P.clamp((t - 6.6) / .9, 0, 1)))}px`;
          }
        };
      }
    },
    {
      title: '교실 판단: \'작다\'의 기준 읽기', dur: 13,
      captions: [
        { t: 0, text: '"작은 모델"이라는 말이 <em>활성 파라미터</em> 기준인지 <em>전체 파라미터</em> 기준인지 나눠 읽어요.' },
        { t: 4.5, text: 'API로 쓸 땐 활성 쪽이 속도와 값에, 학교 서버에 직접 올릴 땐 전체 쪽이 메모리에 영향을 줘요.' },
        { t: 9, text: '발표의 한국어 시험은 회사 내부 초기 시험이에요. 우리 학교 문서로 직접 돌려 보고 판단해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const a = P.box({ x: 380, y: 130, w: 380, h: 200, label: '활성 3B', sub: 'API로 쓸 때 속도 · 값', accent: 'aqua', icon: P.ICON.click });
        const b = P.box({ x: 800, y: 130, w: 380, h: 200, label: '전체 35B', sub: '직접 설치할 때 메모리', accent: 'orange', icon: P.ICON.desk });
        tl.at(stage.appendChild(a.el), .4, { from: 'up' });
        tl.at(stage.appendChild(b.el), 1, { from: 'up' });
        const t1 = P.text({ x: 380, y: 400, w: 800, text: '발표의 한국어 시험은 <em>회사 내부 초기 시험</em>이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(t1.el), 9.2, { from: 'up' });
        const c1 = P.chip({ x: 380, y: 480, text: '우리 학교 문서로 나란히 돌려 보기', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(c1.el), 10.4, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 4.3 || t > 8.8);
            a.on(t > 4.6 && t < 6.8);
            b.on(t > 6.8 && t < 9);
          }
        };
      }
    }
  ],

  interaction: {
    title: '라우터 점수판과 메모리 저울',
    desc: '"토큰 하나 라우터에 넣기"를 누를 때마다 라우터가 전문가 8개에 점수를 매기고, 소프트맥스 비율이 높은 <b>상위 k개</b>만 일해요. 부하 균형 보조 손실을 끄고 켜며 누적 사용 막대를 비교해 보세요. 아래 저울에서는 저장 정밀도를 바꿔 <b>메모리</b>와 <b>토큰당 계산</b>을 견줘 봐요.',
    mount(el, P) {
      const TOKENS = ['광합성', '은', '빛', '에너지', ',', '학생', '2026', '년', 'def', '(', '서울', '.'];
      const N = 8;
      const r = P.rng(46);
      const BASE = TOKENS.map(() => Array.from({ length: N }, () => +(r() * 2.4 - 1).toFixed(2)));
      const SKEW = BASE.map(row => row.map((v, j) => j === 2 ? +(v + 2.6).toFixed(2) : v));
      let k = 2, balance = false, idx = -1, usage = new Array(N).fill(0);

      const notice = P.h('p', { class: 'sim-notice' }, '전문가 8개와 점수는 예시 값이에요. Solar Mini 4의 실제 전문가 수와 라우팅 방식은 공개되지 않았어요.');
      const kLab = P.h('label', { for: 'sim-k', class: 'sim-k-l' });
      const kRange = P.h('input', { type: 'range', id: 'sim-k', min: '1', max: '4', step: '1', value: String(k), class: 'sim-range' });
      kRange.addEventListener('input', () => { k = +kRange.value; renderRouter(); });
      const bal = P.h('input', { type: 'checkbox', id: 'sim-bal' });
      bal.addEventListener('change', () => { balance = bal.checked; usage = new Array(N).fill(0); idx = -1; renderRouter(); });
      const balLab = P.h('label', { for: 'sim-bal', class: 'sim-bal-l' }, bal, '부하 균형 보조 손실 켜기');
      const goBtn = P.h('button', { class: 'btn primary', type: 'button' }, '토큰 하나 라우터에 넣기');
      const resetBtn = P.h('button', { class: 'btn', type: 'button' }, '처음부터');
      goBtn.addEventListener('click', () => { idx++; const res = route(idx % TOKENS.length); res.chosen.forEach(j => usage[j]++); renderRouter(); });
      resetBtn.addEventListener('click', () => { idx = -1; usage = new Array(N).fill(0); renderRouter(); });
      const workLine = P.h('div', { class: 'sim-work', 'aria-live': 'polite' });
      const board = P.h('div', { class: 'sim-board' });
      const useHead = P.h('div', { class: 'sim-sub' }, '전문가별 누적 사용');
      const useBars = P.h('div', { class: 'sim-use' });

      const precSel = P.h('select', { id: 'sim-prec' },
        P.h('option', { value: '2' }, '16비트(2바이트)'), P.h('option', { value: '1' }, '8비트(1바이트)'), P.h('option', { value: '0.5' }, '4비트(0.5바이트)'));
      precSel.addEventListener('change', renderScale);
      const scale = P.h('div', { class: 'sim-scale' });

      el.append(P.h('div', { class: 'sim-wrap' },
        notice,
        P.h('h4', {}, '1. 라우터 점수판'),
        P.h('div', { class: 'sim-ctrl' }, kLab, kRange),
        P.h('div', { class: 'sim-ctrl' }, balLab),
        P.h('div', { class: 'sim-btns' }, goBtn, resetBtn),
        workLine, board, useHead, useBars,
        P.h('h4', {}, '2. 메모리 저울'),
        P.h('div', { class: 'sim-ctrl' }, P.h('label', { for: 'sim-prec', class: 'sim-k-l' }, '저장 정밀도(가정)'), precSel),
        scale,
        P.h('p', { class: 'sim-foot' }, '전체 35B · 활성 3B는 업스테이지 발표값이에요. 저장 정밀도는 업스테이지가 밝히지 않아서 가정한 값이에요.')
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:10px;max-width:100%}
        .sim-wrap h4{font-size:15px;font-weight:800;margin:8px 0 0}
        .sim-notice{margin:0;font-size:13px;color:#B3520F;background:var(--orange-pale);border-radius:10px;padding:8px 12px}
        .sim-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .sim-k-l{font-weight:700;font-size:14px;white-space:nowrap}
        .sim-bal-l{display:flex;align-items:center;gap:8px;font-size:14px}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        #sim-prec{max-width:100%}
        .sim-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-work{font-size:14px;font-weight:700}
        .sim-work .tok{font-family:var(--mono);background:var(--paper);border-radius:8px;padding:2px 8px;margin:0 4px}
        .sim-board{display:flex;flex-direction:column;gap:4px}
        .sim-br{display:grid;grid-template-columns:62px minmax(0,1fr) 92px;align-items:center;gap:8px;font-size:12.5px}
        .sim-br .nm{font-weight:700;color:var(--muted)}
        .sim-br .tr{height:16px;border-radius:6px;background:var(--paper);overflow:hidden}
        .sim-br .fl{height:100%;border-radius:6px;background:var(--faint)}
        .sim-br.on .fl{background:var(--orange)}
        .sim-br.on .nm{color:#B3520F}
        .sim-br .vl{font-family:var(--mono);font-size:12px;text-align:right}
        .sim-sub{font-size:13px;font-weight:800;margin-top:4px}
        .sim-use{display:flex;align-items:flex-end;gap:6px;height:110px;border-bottom:1px solid var(--line);max-width:100%}
        .sim-uc{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:2px;font-size:11px}
        .sim-uc .ub{width:100%;max-width:34px;background:var(--aqua-deep);border-radius:5px 5px 2px 2px}
        .sim-uc .un{color:var(--muted);font-weight:700}
        .sim-scale{display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);border-radius:12px;padding:12px;font-size:13.5px}
        .sim-sr{display:flex;flex-direction:column;gap:4px}
        .sim-sr .tr{height:18px;border-radius:6px;background:var(--paper);overflow:hidden}
        .sim-sr .fl{height:100%;border-radius:6px}
        .sim-sr.mem .fl{background:var(--orange)}
        .sim-sr.cmp .fl{background:var(--aqua-deep)}
        .sim-foot{font-size:12.5px;color:var(--muted);margin:0}
      ` }));

      function route(i) {
        const sc = (balance ? BASE : SKEW)[i];
        const ex = sc.map(Math.exp); const tot = ex.reduce((a, b) => a + b, 0);
        const pct = ex.map(v => v / tot * 100);
        const chosen = pct.map((p, j) => [p, j]).sort((a, b) => b[0] - a[0] || a[1] - b[1]).slice(0, k).map(x => x[1]);
        return { sc, pct, chosen };
      }
      function renderRouter() {
        kLab.textContent = `상위 k(고르는 전문가 수): ${k}`;
        if (idx < 0) {
          workLine.textContent = `전문가 8개 중 ${k}개가 일해요. 아직 토큰을 넣지 않았어요.`;
          board.replaceChildren(...Array.from({ length: N }, (_, j) => P.h('div', { class: 'sim-br' },
            P.h('span', { class: 'nm' }, `전문가 ${j + 1}`), P.h('span', { class: 'tr' }, P.h('span', { class: 'fl', style: 'display:block;width:0%' })), P.h('span', { class: 'vl' }, '-'))));
        } else {
          const ti = idx % TOKENS.length;
          const res = route(ti);
          workLine.replaceChildren(document.createTextNode(`${idx + 1}번째 토큰`), P.h('span', { class: 'tok' }, TOKENS[ti]), document.createTextNode(`→ 전문가 8개 중 ${k}개가 일해요 (${res.chosen.map(j => j + 1).join(', ')}번)`));
          board.replaceChildren(...res.pct.map((p, j) => P.h('div', { class: `sim-br${res.chosen.includes(j) ? ' on' : ''}` },
            P.h('span', { class: 'nm' }, `전문가 ${j + 1}`),
            P.h('span', { class: 'tr' }, P.h('span', { class: 'fl', style: `display:block;width:${p.toFixed(1)}%` })),
            P.h('span', { class: 'vl' }, `${res.sc[j].toFixed(2)} · ${p.toFixed(0)}%`))));
        }
        const max = Math.max(1, ...usage);
        useBars.replaceChildren(...usage.map((u, j) => P.h('div', { class: 'sim-uc' },
          P.h('span', {}, String(u)),
          P.h('span', { class: 'ub', style: `height:${Math.round(u / max * 80)}px` }),
          P.h('span', { class: 'un' }, String(j + 1)))));
      }
      function renderScale() {
        const bytes = +precSel.value;
        const mem = 35 * bytes, cmp = 3 * bytes;
        scale.replaceChildren(
          P.h('div', { class: 'sim-sr mem' }, P.h('span', {}, `메모리에 올릴 가중치: 35B × ${bytes}바이트 = 약 ${mem}GB`), P.h('span', { class: 'tr' }, P.h('span', { class: 'fl', style: `display:block;width:${mem / 70 * 100}%` }))),
          P.h('div', { class: 'sim-sr cmp' }, P.h('span', {}, `토큰당 계산에 쓰는 파라미터: 3B 그대로 (같은 정밀도면 약 ${cmp}GB 분량)`), P.h('span', { class: 'tr' }, P.h('span', { class: 'fl', style: `display:block;width:${cmp / 70 * 100}%` })))
        );
      }
      renderRouter();
      renderScale();
    }
  },

  teacherLines: [
    '이 모델은 350억 개 파라미터를 다 갖고 있지만, 글자 조각 하나를 만들 때는 <b>30억 개만</b> 일해요.',
    '라우터가 점수를 매겨 <b>그 토큰에 맞는 전문가 몇 개</b>만 불러요.'
  ],
  tip: {
    body: '모델 설명에서 <b>전체 파라미터와 활성 파라미터</b>를 나눠 읽으세요. API로 쓸 땐 활성 쪽이 속도와 값에, 학교 서버에 직접 올릴 땐 전체 쪽이 필요한 메모리에 영향을 줘요.',
    extra: '새 국내 모델은 가정통신문·교육과정 문서처럼 우리 학교 실제 문서로 같은 과제를 기존 모델과 나란히 돌려 비교해 보세요. 발표문의 한국어 시험은 회사 내부 초기 시험이에요.'
  },
  myth: {
    myth: '전문가 혼합의 \'전문가\'는 수학 전문가, 국어 전문가처럼 과목별로 나뉜다.',
    fact: '사람이 과목을 정해 주지 않아요. 라우터와 함께 학습되면서 나뉘고, 연구를 보면 전문가가 구두점·고유명사 같은 토큰 무리에 특화되는 경향이 있었어요.'
  },
  sources: [
    { title: 'Upstage: Solar Mini 4 (2026-10-01)', url: 'https://www.upstage.ai/blog/en/solar-mini-4', note: '처음부터 직접 사전학습, 전체 35B 중 토큰당 3B 활성, 512K 컨텍스트·128K 출력, 가격, 사내 시험.' },
    { title: 'Shazeer et al., Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer (arXiv, 2017)', url: 'https://arxiv.org/abs/1701.06538', note: '학습되는 게이트가 전문가 몇 개만 골라 쓰는 층, 용량 1,000배 이상과 적은 효율 손실.' },
    { title: 'Fedus, Zoph, Shazeer, Switch Transformers (arXiv, 2021)', url: 'https://arxiv.org/abs/2101.03961', note: '전문가 1개만 고르는 라우팅, 같은 계산 자원으로 사전학습 최대 7배.' },
    { title: 'Hugging Face: Mixture of Experts Explained (2023-12-11)', url: 'https://huggingface.co/blog/moe', note: '전체 파라미터가 메모리에 필요, 소프트맥스·상위 k 게이트, 부하 균형 보조 손실, 전문가 특화.' }
  ],
  script: `10월 1일 업스테이지가 처음부터 직접 사전학습한 에이전트용 모델 Solar Mini 4를 공개했어요. 전체 파라미터는 350억 개인데, 토큰 하나를 만들 때는 30억 개만 일해요.

비결은 전문가 혼합이에요. 층마다 작은 신경망인 전문가를 여러 개 두고, 라우터가 토큰마다 전문가별 점수를 매겨요. 소프트맥스로 점수를 합이 100%인 비율로 바꾼 뒤 상위 몇 개만 실행하고, 결과를 그 비율대로 섞어요. 그냥 두면 몇몇 전문가에게 일이 몰려서 학습 때 골고루 쓰라는 보조 손실을 줘요.

함정도 있어요. 계산은 30억만큼이지만, 어떤 전문가든 고를 수 있으려면 350억 전부가 메모리에 있어야 해요.

그러니 '작은 모델'이라는 말은 활성 기준인지 전체 기준인지 나눠 읽으세요. 한국어 성능은 우리 학교 문서로 직접 돌려 보고 판단해요.`
};
