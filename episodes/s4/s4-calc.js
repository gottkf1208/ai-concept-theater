/* E22 [B] AI는 왜 계산을 틀릴까: 토큰과 도구 사용 (시즌 4) */
export default {
  slug: 's4-calc',
  track: 'B',
  title: 'AI는 왜 계산을 틀릴까',
  subtitle: '토큰과 도구 사용',
  summary: '학급비 정산을 AI에게 시켰더니 자릿수 큰 곱셈에서 살짝 틀렸어요. 언어모델이 숫자를 다루는 방식과, 계산을 도구에 맡겨야 하는 이유를 3분에 담았어요.',
  keywords: ['계산', '토큰', '곱셈', '할루시네이션', 'Toolformer', '도구 사용', '정산'],

  scenes: [
    {
      title: '학급비 정산, 어디가 틀렸을까', dur: 13,
      captions: [
        { t: 0, text: '학급비 정산을 AI에게 시켰는데, 합계가 <em>살짝 틀렸어요</em>.' },
        { t: 5, text: '작은 곱셈은 다 맞았는데, <em>자릿수가 큰 곱셈</em>에서 어긋났어요.' },
        { t: 9.5, text: '똑같은 <em>곱하기</em>인데, 왜 어떤 건 맞고 어떤 건 틀릴까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'oops' });
        stage.append(q.el);
        const title = P.text({ x: 430, y: 78, w: 760, text: '학급비 정산표', size: 26, weight: 800 });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const rows = [
          { calc: '간식비 · 3 × 1,200원', val: '3,600원', ok: true },
          { calc: '미술 재료 · 8 × 2,500원', val: '20,000원', ok: true },
          { calc: '체험학습비 · 47 × 15,800원', val: '732,600원', ok: false }
        ];
        const rowEls = rows.map((r, i) => {
          const y = 156 + i * 88;
          const lbl = P.text({ x: 430, y, w: 460, text: r.calc, size: 22, weight: 600, cls: 'muted' });
          tl.at(stage.appendChild(lbl.el), .5 + i * .5, { from: 'left' });
          const val = P.text({ x: 900, y, w: 220, text: r.val, size: 24, weight: 800, color: r.ok ? '' : '#B3520F' });
          tl.at(stage.appendChild(val.el), .7 + i * .5, { from: 'right' });
          const tag = P.chip({ x: 1140, y: y - 3, text: r.ok ? '정답' : '오차', color: r.ok ? 'aqua' : 'orange', size: 16 });
          tl.at(stage.appendChild(tag.el), .9 + i * .5, { from: 'pop' });
          return { lbl, val, tag };
        });
        const note = P.text({ x: 430, y: 452, w: 760, text: '실제로는 <em>742,600원</em>이에요. 10,000원 차이가 났어요.', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 5.2, { from: 'up' });
        const qq = P.text({ x: 430, y: 560, w: 760, text: '똑같은 <em>곱하기</em>인데, 왜 다를까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
          }
        };
      }
    },
    {
      title: '숫자도 그냥 글자예요', dur: 14,
      captions: [
        { t: 0, text: '글을 쓰는 AI(언어모델)는 숫자도 <em>글자 토큰</em>으로 봐요.' },
        { t: 5, text: '계산 규칙을 <em>실행</em>하는 게 아니라, "이런 숫자열 뒤엔 이런 숫자열이 자주 왔다"는 <em>패턴</em>을 맞혀요.' },
        { t: 10, text: '조합이 많은 여러 자릿수 곱셈일수록 <em>패턴이 부족</em>해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 440, size: 250, pose: 'think' });
        stage.append(q.el);
        const tokens = ['4', '7', '×', '1', '5', '8', '0', '0'];
        const tokChips = tokens.map((c, i) => {
          const chip = P.chip({ x: 340 + i * 62, y: 90, text: c, color: 'gray', size: 20 });
          tl.at(stage.appendChild(chip.el), .2 + i * .12, { from: 'pop' });
          return chip;
        });
        const model = P.box({ x: 470, y: 220, w: 340, h: 140, label: '언어 모델', sub: '다음 토큰을 예측해요', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), 1.6, { from: 'pop' });
        const toModel = P.arrow(lines, { x1: 640, y1: 130, x2: 640, y2: 220, width: 4, color: '#1B1F24' });

        const ruleBox = P.box({ x: 250, y: 440, w: 280, h: 110, label: '계산 규칙 실행', sub: '이 방식이 아니에요', accent: '', icon: P.ICON.x });
        tl.at(stage.appendChild(ruleBox.el), 5.4, { from: 'left' });
        const toRule = P.arrow(lines, { x1: 500, y1: 300, x2: 400, y2: 440, color: '#9AA5AF', width: 3, dashed: true, curve: -20 });

        const outBox = P.box({ x: 900, y: 400, w: 320, h: 150, label: '다음 토큰 예측', sub: '"이런 숫자 뒤엔 이런 숫자"', accent: 'orange', icon: P.ICON.search });
        tl.at(stage.appendChild(outBox.el), 6.4, { from: 'right' });
        const toOut = P.arrow(lines, { x1: 810, y1: 300, x2: 950, y2: 400, color: '#F2812D', width: 4, curve: 20 });

        const capLbl = P.text({ x: 250, y: 610, w: 970, text: '조합이 많을수록 <i>본 적 있는 패턴</i>이 부족해져요.', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(capLbl.el), 10, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > 4.9);
            toModel.draw(P.clamp((t - 1.5) / .6, 0, 1));
            toRule.draw(P.clamp((t - 5.2) / .6, 0, 1));
            toOut.draw(P.clamp((t - 6.2) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '자릿수가 커질수록 그럴듯한 오답', dur: 13,
      captions: [
        { t: 0, text: '자릿수가 <em>작을 때</em>는 비슷한 예를 많이 봐서 잘 맞혀요.' },
        { t: 5, text: '자릿수가 <em>커질수록</em> 조합이 폭발적으로 늘어서, 그럴듯하지만 <em>틀린 답</em>이 나오기 쉬워요.' },
        { t: 9.5, text: '그럴듯하지만 틀린 답, 숫자에서도 똑같이 나타나요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 420, size: 260, pose: 'point' });
        stage.append(q.el);
        const heading = P.text({ x: 340, y: 78, w: 860, text: '흉내 낸 답의 정답률(예시)', size: 24, weight: 800 });
        tl.at(stage.appendChild(heading.el), .2, { from: 'up' });
        const accVals = [100, 95, 70, 35, 10];
        const baseline = 560, maxH = 300;
        const bars = accVals.map((v, i) => {
          const hgt = 24 + v * (maxH - 24) / 100;
          const x = 340 + i * 175;
          const bar = P.box({ x, y: baseline - hgt, w: 130, h: hgt, label: '', sub: '', accent: v >= 70 ? 'aqua' : (v >= 40 ? '' : 'orange') });
          tl.at(stage.appendChild(bar.el), .5 + i * .5, { from: 'up', dist: 40 });
          const capt = P.text({ x, y: baseline + 16, w: 130, text: `${i + 1}자리<br><em>${v}%</em>`, size: 19, weight: 700, align: 'center' });
          tl.at(stage.appendChild(capt.el), .7 + i * .5, { from: 'up' });
          return { bar, capt };
        });
        const last = P.text({ x: 340, y: 640, w: 860, text: '<em>그럴듯함</em>은 숫자에서도 똑같이 나타나요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
          }
        };
      }
    },
    {
      title: '해법은 도구예요', dur: 13,
      captions: [
        { t: 0, text: '계산은 <em>계산기·코드</em>에 맡기면 해결돼요.' },
        { t: 5, text: '모델은 "언제 무엇을 계산할지"만 <em>정하고</em>, 실제 계산은 도구가 해요.' },
        { t: 9.5, text: 'E1에서 본 <em>도구 호출</em>과 똑같은 원리예요. 계산도 도구를 불러서 시켜요.' }
      ],
      build({ stage, lines, P, tl }) {
        const model = P.box({ x: 80, y: 130, w: 300, h: 150, label: 'AI 모델', sub: '언제·무엇을 계산할지 정해요', accent: 'ink', icon: P.ICON.brain });
        tl.at(stage.appendChild(model.el), .3, { from: 'left' });
        const tool = P.box({ x: 560, y: 130, w: 300, h: 150, label: '계산기 · 코드 실행', sub: '실제 계산을 해요', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(tool.el), 1.2, { from: 'up' });
        const call = P.arrow(lines, { x1: 380, y1: 190, x2: 560, y2: 190, color: '#F2812D', width: 5 });
        const ret = P.arrow(lines, { x1: 560, y1: 240, x2: 380, y2: 240, color: '#127E90', width: 5 });
        const lblCall = P.text({ x: 380, y: 100, w: 180, text: '도구 호출', size: 18, weight: 700, align: 'center', color: '#B3520F' });
        tl.at(stage.appendChild(lblCall.el), 5.2, { from: 'up', dist: 10 });
        const lblRet = P.text({ x: 380, y: 250, w: 180, text: '정확한 결과', size: 18, weight: 700, align: 'center', color: '#127E90' });
        tl.at(stage.appendChild(lblRet.el), 9.4, { from: 'down', dist: 10 });

        const q = P.quokka({ x: 60, y: 380, size: 300, pose: 'base' });
        stage.append(q.el);
        const b = P.bubble({ x: 400, y: 400, w: 780, text: '"47×15,800 계산해 줘" → (도구가 계산) → "742,600원이었네요."', tail: 'left', size: 22, tone: 'soft' });
        tl.at(stage.appendChild(b.el), 9.8, { from: 'up' });
        const same = P.text({ x: 400, y: 560, w: 780, text: 'E1에서 본 <em>도구 호출</em>과 같은 원리예요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(same.el), 10.4, { from: 'up' });

        return {
          tick(t) {
            q.tick(t, t > 9.5);
            call.draw(P.clamp((t - 5) / .7, 0, 1));
            ret.draw(P.clamp((t - 9) / .7, 0, 1));
            tool.on(t > 5.7 && t < 9);
          }
        };
      }
    },
    {
      title: '표로 만들어 검산해요', dur: 13,
      captions: [
        { t: 0, text: '정산·통계는 <em>표로 만들어</em> 계산기(스프레드시트)로 검산하세요.' },
        { t: 5, text: '또는 <em>코드 실행 기능</em>이 있는 도구를 골라, 계산은 도구에게 맡기세요.' },
        { t: 9.5, text: 'AI는 <em>외운 패턴</em>으로 풀고, 계산기는 <em>규칙</em>대로 풀어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 320, size: 340, pose: 'wave' });
        stage.append(q.el);
        const chips = ['표로 정리하기', '스프레드시트로 검산', '코드 실행 도구 사용'].map((c, i) => {
          const chip = P.chip({ x: 420, y: 150 + i * 74, text: c, color: i === 1 ? 'orange' : 'aqua', size: 24 });
          tl.at(stage.appendChild(chip.el), .4 + i * .8, { from: 'right' });
          return chip;
        });
        const last = P.text({ x: 400, y: 440, w: 800, text: '"AI는 수학을 <em>외운 패턴</em>으로 풀어.<br>계산기는 <i>규칙</i>으로 풀어."', size: 32, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.6, { from: 'up' });
        return {
          tick(t) { q.tick(t, t < 5 || t > 9.5); }
        };
      }
    }
  ],

  interaction: {
    title: '자릿수 곱셈 대결',
    desc: '자릿수 슬라이더를 움직여 보세요. <b>패턴 흉내</b> 카드와 <b>계산기 도구</b> 카드가 같은 곱셈 문제를 어떻게 다르게 답하는지, 자릿수가 커질수록 정답률이 어떻게 바뀌는지 비교해요.',
    mount(el, P) {
      const ACC = { 1: 100, 2: 95, 3: 70, 4: 35, 5: 10 };
      const fmt = n => n.toLocaleString('ko-KR');

      function range(d) {
        return d === 1 ? { min: 1, max: 9 } : { min: 10 ** (d - 1), max: 10 ** d - 1 };
      }

      /* 시드 기반 결정적 문제 생성: 같은 자릿수 → 항상 같은 문제와 같은 흉내 오답 */
      function makeProblem(d) {
        const r = P.rng(4000 + d * 131);
        const { min, max } = range(d);
        const a = min + Math.floor(r() * (max - min + 1));
        const b = min + Math.floor(r() * (max - min + 1));
        const correct = a * b;
        let mimic = correct;
        if (d >= 3) {
          const digits = String(correct).split('');
          const mid = Math.floor(digits.length / 2);
          const deltaAbs = 1 + Math.floor(r() * 3);
          const sign = r() < .5 ? -1 : 1;
          let nd = (parseInt(digits[mid], 10) + sign * deltaAbs) % 10;
          if (nd < 0) nd += 10;
          if (nd === parseInt(digits[mid], 10)) nd = (nd + 1) % 10;
          digits[mid] = String(nd);
          mimic = parseInt(digits.join(''), 10);
        }
        return { a, b, correct, mimic, wrong: mimic !== correct };
      }

      let digits = 2;

      const dialSec = P.h('div', { class: 'sim-sec' }, P.h('h4', {}, '자릿수'));
      const capLabel = P.h('label', { for: 'sim-digits', class: 'sim-cap' });
      dialSec.append(capLabel);
      const slider = P.h('input', { id: 'sim-digits', type: 'range', min: '1', max: '5', step: '1', value: '2', class: 'sim-range', 'aria-label': '곱셈 문제 자릿수(1~5)' });
      dialSec.append(slider);

      const probText = P.h('p', { class: 'sim-problem' });
      const cardsWrap = P.h('div', { class: 'sim-cards' });
      const mimicCard = P.h('div', { class: 'sim-card' });
      const calcCard = P.h('div', { class: 'sim-card' });
      cardsWrap.append(mimicCard, calcCard);

      const barsSec = P.h('div', { class: 'sim-sec' }, P.h('h4', {}, '자릿수별 흉내 정답률(예시)'));
      const barsWrap = P.h('div', { class: 'sim-bars', 'aria-hidden': 'true' });
      const barEls = [1, 2, 3, 4, 5].map(d => {
        const fill = P.h('div', { class: 'sim-bar-fill' });
        const track = P.h('div', { class: 'sim-bar-track' }, fill);
        const cap = P.h('div', { class: 'sim-bar-cap' }, `${d}자리 · ${ACC[d]}%`);
        const col = P.h('div', { class: 'sim-bar-col' }, track, cap);
        barsWrap.append(col);
        return { col, fill, track };
      });
      barsSec.append(barsWrap);

      const disclaimer = P.h('p', { class: 'sim-disclaimer' }, '정답률은 연구 경향을 단순화한 예시예요. 실제 모델·문제마다 달라요. "패턴 흉내" 카드의 오답은 이해를 돕기 위해 만든 예시이며 실제 모델 출력이 아니에요.');

      function render() {
        capLabel.textContent = `자릿수: ${digits}자리`;
        const p = makeProblem(digits);
        probText.innerHTML = `<span class="sim-q-num">${fmt(p.a)} × ${fmt(p.b)} = ?</span>`;

        mimicCard.replaceChildren(
          P.h('div', { class: 'sim-card-head' },
            P.h('span', { class: 'sim-card-title' }, '패턴 흉내'),
            P.h('span', { class: `sim-flag ${p.wrong ? 'bad' : 'good'}` }, p.wrong ? '오답' : '정답')
          ),
          P.h('p', { class: 'sim-card-sub' }, '"이런 숫자열 뒤엔 이런 숫자열이 자주 왔어요"'),
          P.h('p', { class: 'sim-card-val' }, fmt(p.mimic) + '원')
        );
        calcCard.replaceChildren(
          P.h('div', { class: 'sim-card-head' },
            P.h('span', { class: 'sim-card-title' }, '계산기 도구'),
            P.h('span', { class: 'sim-flag good' }, '항상 정확')
          ),
          P.h('p', { class: 'sim-card-sub' }, '규칙대로 정확히 계산해요'),
          P.h('p', { class: 'sim-card-val' }, fmt(p.correct) + '원')
        );

        barEls.forEach((b, i) => {
          const d = i + 1;
          b.fill.style.height = `${ACC[d]}%`;
          b.col.classList.toggle('current', d === digits);
        });
      }

      slider.addEventListener('input', () => { digits = +slider.value; render(); });

      const style = P.h('style', { html: `
        .sim-sec{margin-top:20px}
        .sim-sec:first-child{margin-top:0}
        .sim-sec h4{font-size:15px;font-weight:800;margin-bottom:8px}
        .sim-cap{display:block;font-weight:700;font-family:var(--mono);font-size:13.5px;margin-bottom:6px}
        .sim-range{width:100%;max-width:100%}
        .sim-problem{margin:18px 0 10px;font-weight:800;font-size:20px;font-family:var(--mono);word-break:break-word}
        .sim-cards{display:flex;gap:14px;flex-wrap:wrap}
        .sim-card{flex:1 1 220px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper);box-sizing:border-box;display:flex;flex-direction:column;gap:8px}
        .sim-card-head{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
        .sim-card-title{font-weight:800;font-size:14.5px}
        .sim-flag{font-size:11.5px;font-weight:800;border-radius:999px;padding:3px 9px;flex:0 0 auto}
        .sim-flag.bad{background:#F2812D;color:#fff}
        .sim-flag.good{background:#127E90;color:#fff}
        .sim-card-sub{font-size:12.5px;color:var(--muted);margin:0}
        .sim-card-val{font-size:20px;font-weight:800;font-family:var(--mono);margin:0;word-break:break-word}
        .sim-bars{display:flex;gap:6px;align-items:flex-end;flex-wrap:nowrap;margin-top:6px;max-width:100%}
        .sim-bar-col{flex:1 1 0;min-width:0;max-width:100px;display:flex;flex-direction:column;align-items:center;gap:6px}
        .sim-bar-track{width:100%;height:120px;border-radius:8px;background:#eee;overflow:hidden;display:flex;align-items:flex-end;box-sizing:border-box;border:2px solid transparent}
        .sim-bar-col.current .sim-bar-track{border-color:var(--aqua)}
        .sim-bar-fill{width:100%;background:#9AA5AF;border-radius:6px 6px 0 0;transition:height .2s}
        .sim-bar-col.current .sim-bar-fill{background:var(--aqua)}
        .sim-bar-cap{font-size:11px;color:var(--muted);font-weight:700;text-align:center;line-height:1.3;word-break:keep-all}
        .sim-bar-col.current .sim-bar-cap{color:var(--aqua-deep)}
        .sim-disclaimer{margin-top:16px;font-size:12px;color:var(--muted);border-top:1px dashed var(--line);padding-top:10px}
      ` });

      el.append(style, dialSec, probText, cardsWrap, barsSec, disclaimer);
      render();
    }
  },

  teacherLines: [
    'AI는 계산을 <b>"규칙"</b>이 아니라 <b>"본 적 있는 패턴"</b>으로 해요. 그래서 큰 수는 틀리기 쉬워요.',
    '계산은 계산기에게, 판단은 사람에게. AI는 그 <b>둘 사이를 잇는 역할</b>이에요.'
  ],
  tip: {
    body: '정산·통계를 시킬 때는 숫자를 <b>표로 만들어</b> 스프레드시트 같은 계산기로 검산하거나, <b>코드 실행 기능</b>이 있는 도구를 골라 계산 자체를 도구에게 맡기세요.',
    extra: '자릿수가 큰 곱셈·나눗셈, 여러 단계 합산일수록 사람의 검산이 더 필요해요.'
  },
  myth: {
    myth: '컴퓨터니까 계산은 당연히 맞다.',
    fact: '글을 쓰는 AI(언어모델)는 계산기가 아니에요. 숫자도 글자 패턴으로 다뤄서 큰 수 계산은 틀릴 수 있어요. 계산기·코드 같은 도구를 붙여야 정확해져요.'
  },
  sources: [
    { title: 'Faith and Fate: Limits of Transformers on Compositionality (arXiv 2305.18654)', url: 'https://arxiv.org/abs/2305.18654', note: 'Dziri 외(2023) — 여러 자릿수 곱셈 등 조합 문제에서 트랜스포머가 패턴 매칭의 한계를 보인다는 연구.' },
    { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools (arXiv 2302.04761)', url: 'https://arxiv.org/abs/2302.04761', note: 'Schick 외(2023) — 모델이 계산기 등 도구를 언제·어떻게 호출할지 스스로 학습하는 방법.' },
    { title: 'Claude Docs — Tool use overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', note: '모델이 어떤 도구를 쓸지 정하고, 실제 실행은 앱이 맡는 도구 사용 구조를 설명하는 공식 문서.' }
  ],
  script: `학급비 정산을 AI에게 맡겼는데 합계가 살짝 틀렸던 적 있으신가요? 작은 곱셈은 다 맞는데, 자릿수가 큰 곱셈에서만 어긋나요.

이유는 이래요. 언어모델은 숫자도 글자 토큰으로 봐요. 계산 규칙을 실행하는 게 아니라 "이런 숫자열 뒤엔 이런 숫자열이 자주 왔다"는 패턴을 맞히는 거예요. 자릿수가 커질수록 조합이 늘어나, 그럴듯하지만 틀린 답이 나오기 쉬워요.

물론 요즘 모델은 많이 좋아졌고, 도구를 붙이면 훨씬 정확해져요. 계산은 계산기·코드에 맡기고 모델은 언제 무엇을 계산할지만 정하는 방식이에요. 앞서 본 도구 호출과 같은 원리예요.

그러니 정산·통계는 표로 만들어 스프레드시트로 검산하거나, 코드 실행 기능이 있는 도구를 골라 주세요. 계산기는 규칙대로 풀고, AI는 외운 패턴으로 푼다는 차이만 기억해두면 충분해요.`
};
