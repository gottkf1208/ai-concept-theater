/* S777-55 실시간 자막은 왜 썼다 지웠다 할까: 스트리밍 음성인식·부분 결과와 확정 결과·지연 시간 */
export default {
  slug: 't7-streaming-stt',
  track: 'S777',
  title: '실시간 자막은 왜 썼다 지웠다 할까',
  subtitle: '스트리밍 음성인식·부분 결과와 확정 결과·지연 시간',
  summary: '10월 1일 Microsoft가 첫 스트리밍 음성인식 모델 MAI-Transcribe-2-Streaming을 공개하며 "첫 결과까지 100밀리초 남짓"을 내세웠어요. 말이 끝나기 전에 글자를 내놓는 스트리밍 인식, 먼저 띄우고 고쳐 가는 부분 결과와 확정 결과, 빨리 내면 자주 고치고 늦게 내면 정확해지는 맞바꿈, 언어 자동 감지까지 짚어요.',
  keywords: ['스트리밍 음성인식', 'STT', '실시간 자막', '부분 결과', 'partial', '확정 결과', 'final', '지연 시간', '첫 결과 시간', '청크', 'LocalAgreement', 'RNN-T', '언어 자동 감지', 'MAI-Transcribe-2-Streaming'],

  scenes: [
    {
      title: '10월 1일, 100밀리초', dur: 13,
      captions: [
        { t: 0, text: '10월 1일 Microsoft가 첫 <em>스트리밍 음성인식</em> 모델을 공개했어요. 말이 끝나기 전에 글자를 내놓는 인식이에요.' },
        { t: 5, text: '소리를 받은 지 100밀리초 남짓, 곧 0.1초 만에 첫 짐작 글자를 내놓는대요.' },
        { t: 9.5, text: '그런데 실시간 자막은 왜 썼다 지웠다 할까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 350, size: 300, pose: 'wave' });
        stage.append(q.el);
        const news = P.chip({ x: 330, y: 92, text: '10/1 Microsoft · MAI-Transcribe-2-Streaming', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(news.el), .3, { from: 'left' });
        const big = P.text({ x: 330, y: 160, w: 400, text: '0.1초', size: 64, weight: 800, color: '#F2812D' });
        tl.at(stage.appendChild(big.el), 5.2, { from: 'pop' });
        const sub = P.text({ x: 560, y: 186, w: 600, text: '소리를 받은 뒤 첫 결과까지', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(sub.el), 5.6, { from: 'left' });
        const facts = [['첫 결과 100ms 남짓', 330, 'orange'], ['60개 언어 자동 감지', 560, 'gray'], ['1시간 0.54달러(연말까지)', 798, 'gray']].map(([text, x, color], i) => {
          const c = P.chip({ x, y: 300, text, color, size: 20 });
          tl.at(stage.appendChild(c.el), 6.4 + i * .6, { from: 'pop' });
          return c;
        });
        const ask = P.text({ x: 330, y: 420, w: 860, text: '그런데 왜 <em>썼다 지웠다</em> 할까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(ask.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9.4);
          }
        };
      }
    },
    {
      title: '다 듣고 쓰기 vs 들으면서 쓰기', dur: 14,
      captions: [
        { t: 0, text: '녹음 파일 자막은 말이 다 끝난 뒤 전체를 보고 글자를 정해요.' },
        { t: 4.5, text: '실시간 자막은 소리를 잘게 나눈 <em>청크</em>를 받을 때마다 지금까지 들은 것으로 글자를 내놔요.' },
        { t: 9.5, text: '2018년 연구는 처음부터 소리가 들어오는 대로 받아 쓰도록 만든 구조로 휴대폰에서 실시간 인식을 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const HS = [22, 40, 30, 52, 36, 26, 46, 32, 50, 28, 42, 24, 38, 48, 30, 44, 26, 36, 50, 34, 28, 44, 32, 40];
        const barsIn = (wrap, arr, col) => arr.map(hh => { const b = P.h('div', { style: `width:8px;height:${hh}px;border-radius:4px;background:${col}` }); wrap.append(b); return b; });
        const lab1 = P.text({ x: 330, y: 88, w: 400, text: '녹음 자막', size: 22, weight: 800 });
        tl.at(stage.appendChild(lab1.el), .2, { from: 'left' });
        const full = P.h('div', { style: 'left:330px;top:126px;width:560px;height:90px;border-radius:16px;border:2px solid #9AA5AF;background:#fff;display:flex;align-items:center;justify-content:center;gap:12px;box-sizing:border-box' });
        barsIn(full, HS, '#9AA5AF');
        stage.append(full);
        tl.at(full, .3, { from: 'left' });
        const once = P.box({ x: 950, y: 121, w: 250, h: 100, label: '끝에서 한 번에', accent: 'ink' });
        tl.at(stage.appendChild(once.el), 2, { from: 'right' });
        const a1 = P.arrow(lines, { x1: 896, y1: 171, x2: 944, y2: 171, width: 4, color: '#1B1F24' });
        const lab2 = P.text({ x: 330, y: 254, w: 400, text: '<i>실시간 자막</i>', size: 22, weight: 800 });
        tl.at(stage.appendChild(lab2.el), 4.6, { from: 'left' });
        const chunks = [0, 1, 2, 3].map(i => {
          const c = P.h('div', { style: `left:${330 + i * 143}px;top:292px;width:131px;height:90px;border-radius:14px;border:2px solid #127E90;background:#fff;display:flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;opacity:.35` });
          barsIn(c, HS.slice(i * 6, i * 6 + 6), '#127E90');
          stage.append(c);
          tl.at(c, 4.7, { from: 'pop' });
          return c;
        });
        const live = P.box({ x: 950, y: 287, w: 250, h: 100, label: '조각마다 글자', accent: 'aqua' });
        tl.at(stage.appendChild(live.el), 5.2, { from: 'right' });
        const a2 = P.arrow(lines, { x1: 902, y1: 337, x2: 944, y2: 337, width: 4, color: '#127E90' });
        const WORDS = ['오늘', '오늘 사회', '오늘 사회 시간에', '오늘 사회 시간에는'];
        const sent = P.text({ x: 330, y: 404, w: 860, text: '', size: 28, weight: 800 });
        tl.at(stage.appendChild(sent.el), 5.6, { from: 'up' });
        const study = P.chip({ x: 330, y: 490, text: '2018년 연구: 휴대폰에서 실시간 스트리밍 인식', color: 'gray', size: 20 });
        tl.at(stage.appendChild(study.el), 9.7, { from: 'pop' });
        let lastK = -2;
        return {
          tick(t) {
            q.tick(t, t < 4.3 || t > 9.3);
            a1.draw(P.clamp((t - 1.6) / .5, 0, 1));
            a2.draw(P.clamp((t - 5) / .5, 0, 1));
            const k = Math.min(3, Math.floor((t - 5.6) / .9));
            chunks.forEach((c, i) => { c.style.opacity = i <= k ? '1' : '.35'; });
            if (k !== lastK) { sent.set(k < 0 ? '' : `자막: "${WORDS[k]}"`); lastK = k; }
            live.on(t > 5.2 && t < 9.5);
          }
        };
      }
    },
    {
      title: '먼저 띄우고, 고쳐서 굳혀요', dur: 14,
      captions: [
        { t: 0, text: '먼저 띄우는 글자를 <em>부분 결과</em>라고 해요. 뒤 소리가 들어오면 앞 글자를 고쳐요.' },
        { t: 7, text: '충분히 확실해지면 <em>확정 결과</em>로 굳혀요. 2023년 연구는 연달아 두 번 똑같이 나온 앞부분만 확정했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'point' });
        stage.append(q.el);
        const row = (y, html, final) => {
          const r = P.h('div', { style: `left:330px;top:${y}px;width:620px;height:72px;border-radius:14px;border:2px solid ${final ? '#1B1F24' : '#9AA5AF'};background:#fff;box-sizing:border-box;display:flex;align-items:center;padding:0 22px;font-size:28px;font-weight:800;color:${final ? '#1B1F24' : '#9AA5AF'}`, html: `<span>${html}</span>` });
          stage.append(r);
          return r;
        };
        const r1 = row(96, '오늘 사회 시가', false);
        const r2 = row(196, '오늘 사회 <span style="color:#F2812D;text-decoration:underline;text-underline-offset:6px">시간에</span>', false);
        const r3 = row(296, '오늘 사회 시간에는', true);
        tl.at(r1, .4, { from: 'left' });
        tl.at(r2, 3, { from: 'left' });
        tl.at(r3, 7.2, { from: 'left' });
        const p1 = P.chip({ x: 990, y: 113, text: '부분 결과 partial', color: 'gray', size: 20 });
        const p2 = P.chip({ x: 990, y: 213, text: '고침', color: 'orange', size: 20 });
        const f3 = P.chip({ x: 990, y: 313, text: '확정 결과 final', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(p1.el), .8, { from: 'pop' });
        tl.at(stage.appendChild(p2.el), 3.4, { from: 'pop' });
        tl.at(stage.appendChild(f3.el), 7.6, { from: 'pop' });
        const rule = P.text({ x: 330, y: 420, w: 870, text: '연달아 두 번 똑같이 나온 <em>앞부분</em>만 확정해요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(rule.el), 9.6, { from: 'up' });
        const study = P.chip({ x: 330, y: 490, text: '2023년 연구의 확정 규칙', color: 'gray', size: 20 });
        tl.at(stage.appendChild(study.el), 10.2, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 6.6 || t > 7.1);
          }
        };
      }
    },
    {
      title: '빠름과 정확함의 맞바꿈', dur: 13,
      captions: [
        { t: 0, text: '청크를 길게 받으면 맥락이 많아 정확하지만 그만큼 <em>늦게</em> 떠요. 짧게 받으면 빨리 뜨지만 자주 고쳐요.' },
        { t: 5.5, text: '100밀리초는 이 맞바꿈을 아주 빠른 쪽으로 밀어붙인 숫자예요.' },
        { t: 9, text: 'Microsoft 모델은 60개 언어를 <em>자동 감지</em>해서 말하는 사람이 언어를 바꿔도 자막이 따라가요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 300, pose: 'think' });
        stage.append(q.el);
        const base = 360;
        const groups = [['짧게', 30, 150], ['중간', 90, 90], ['길게', 160, 24]].map(([name, lat, fix], i) => {
          const gx = 380 + i * 200;
          const bl = P.h('div', { style: `left:${gx}px;top:${base}px;width:56px;height:0px;border-radius:8px 8px 3px 3px;background:#F2812D` });
          const bf = P.h('div', { style: `left:${gx + 66}px;top:${base}px;width:56px;height:0px;border-radius:8px 8px 3px 3px;background:#9AA5AF` });
          stage.append(bl, bf);
          const lab = P.text({ x: gx, y: base + 12, w: 122, text: name, size: 22, weight: 800, align: 'center' });
          tl.at(stage.appendChild(lab.el), .3 + i * .4, { from: 'up' });
          return { bl, bf, lat, fix, i };
        });
        const axis = P.h('div', { style: `left:360px;top:${base}px;width:600px;height:3px;border-radius:2px;background:#1B1F24` });
        stage.append(axis);
        const axisLab = P.text({ x: 380, y: base + 52, w: 560, text: '한 번에 받는 소리 길이(청크) →', size: 20, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(axisLab.el), .5, { from: 'up' });
        const lg1 = P.chip({ x: 1000, y: 160, text: '늦게 뜸', color: 'orange', size: 20 });
        const lg2 = P.chip({ x: 1000, y: 214, text: '고침 횟수', color: 'gray', size: 20 });
        tl.at(stage.appendChild(lg1.el), .6, { from: 'pop' });
        tl.at(stage.appendChild(lg2.el), .9, { from: 'pop' });
        const study = P.chip({ x: 330, y: 480, text: '2023년 연구: 1초씩 받으면 영어 평균 3.3초 늦음', color: 'orange', size: 20 });
        tl.at(stage.appendChild(study.el), 5.7, { from: 'pop' });
        const lang = P.text({ x: 330, y: 545, w: 870, text: '60개 언어 <i>자동 감지</i>: 언어를 바꿔도 따라가요.', size: 25, weight: 800 });
        tl.at(stage.appendChild(lang.el), 9.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.2 || t > 8.8);
            groups.forEach(g => {
              const k = P.easeOut(P.clamp((t - (.6 + g.i * .4)) / .8, 0, 1));
              const hl = g.lat * k, hf = g.fix * k;
              g.bl.style.height = `${hl.toFixed(1)}px`; g.bl.style.top = `${(base - hl).toFixed(1)}px`;
              g.bf.style.height = `${hf.toFixed(1)}px`; g.bf.style.top = `${(base - hf).toFixed(1)}px`;
            });
          }
        };
      }
    },
    {
      title: '교실에서 쓰는 법', dur: 12,
      captions: [
        { t: 0, text: '청각장애 학생이나 다문화 학생에게 실시간 자막을 띄울 때는 글자가 바뀌는 게 정상이라고 <em>미리 알려</em> 줘요.' },
        { t: 6, text: '배포하는 회의록·수업 기록은 <em>확정 결과</em>를 한 번 읽고 고쳐서 내보내요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 320, pose: 'point' });
        stage.append(q.el);
        const steps = [
          ['① 띄우는 자막', '빠른 부분 결과로'],
          ['② 남기는 기록', '확정 결과를 사람이 검수'],
          ['③ 미리 알리기', '녹음·전사 전에 안내']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 400 + i * 280, y: 140, w: 250, h: 150, label, sub, accent: i === 1 ? 'aqua' : (i === 2 ? 'orange' : '') });
          tl.at(stage.appendChild(b.el), .3 + i * 2.6, { from: 'up' });
          return b;
        });
        const arrows = [0, 1].map(i => P.arrow(lines, { x1: 652 + i * 280, y1: 215, x2: 678 + i * 280, y2: 215, width: 4, color: '#1B1F24' }));
        const last = P.text({ x: 400, y: 400, w: 780, text: '회색 글자는 <em>바뀔 수 있어요</em>.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 8.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.6 || t > 6);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 2.6)) / .5, 0, 1)));
            steps.forEach((s, i) => s.on(t > .3 + i * 2.6));
          }
        };
      }
    }
  ],

  interaction: {
    title: '청크 다이얼',
    desc: '한 문장을 말하는 동안 자막이 언제 뜨는지 보는 다이얼이에요. <b>한 번에 받는 소리</b>를 늘리면 글자가 늦게 뜨는 대신 고칠 일이 줄어요. <b>확정만 보기</b>를 누르면 두 번 연달아 같게 나와 굳은 글자만 보여 줘요.',
    mount(el, P) {
      const WORDS = [['오늘', 400], ['사회', 850], ['시간에는', 1500], ['지도', 1950], ['읽는', 2350], ['법을', 2750], ['배워요', 3400]];
      const PROC = 80, SPAN = 6200;
      let chunk = 300, finalOnly = false;
      const range = P.h('input', { type: 'range', id: 'ss-chunk', min: '100', max: '2000', step: '100', value: '300' });
      const lab = P.h('label', { for: 'ss-chunk' }, '한 번에 받는 소리(ms)');
      const val = P.h('b', { class: 'ss-val' }, '300ms');
      const btn = P.h('button', { class: 'btn', type: 'button' }, '확정만 보기');
      const status = P.h('div', { class: 'ss-status' });
      const legend = P.h('div', { class: 'ss-legend' },
        P.h('span', {}, P.h('i', { class: 'ss-dot ss-said' }), '말한 시각'),
        P.h('span', { class: 'ss-lp' }, P.h('i', { class: 'ss-dot ss-part' }), '부분 결과'),
        P.h('span', {}, P.h('i', { class: 'ss-dot ss-fin' }), '확정 결과'));
      const list = P.h('div', { class: 'ss-list' });
      const subLine = P.h('div', { class: 'ss-sub' });
      el.append(P.h('div', { class: 'ss-wrap' },
        P.h('div', { class: 'ss-row' }, lab, range, val),
        P.h('div', {}, btn),
        status, legend, list, subLine,
        P.h('p', { class: 'ss-note' }, '숫자는 원리를 보여 주는 예시 값이에요. 실제 모델의 지연 시간과는 달라요.')));
      el.append(P.h('style', { html: `
        .ss-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .ss-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:14px;font-weight:700}
        .ss-row input[type=range]{flex:1 1 180px;min-width:0;max-width:100%}
        .ss-val{font-family:var(--mono);font-size:13px;min-width:62px}
        .ss-status{border:2px solid #127E90;border-radius:12px;padding:12px 14px;font-weight:800;font-size:15px;background:#fff;word-break:keep-all}
        .ss-status.slow{border-color:#F2812D}
        .ss-legend{display:flex;flex-wrap:wrap;gap:12px;font-size:12.5px;color:var(--muted)}
        .ss-legend span{display:flex;align-items:center;gap:5px}
        .ss-dot{display:inline-block;width:10px;height:10px;border-radius:50%}
        .ss-said{background:#9AA5AF}
        .ss-part{background:#fff;border:2px solid #F2812D;box-sizing:border-box}
        .ss-fin{background:#1B1F24}
        .ss-list{display:flex;flex-direction:column;gap:6px}
        .ss-w{display:flex;align-items:center;gap:8px;font-size:13px}
        .ss-w b{flex:none;width:58px}
        .ss-track{position:relative;flex:1 1 auto;min-width:0;height:16px;border-radius:8px;background:var(--line);overflow:hidden}
        .ss-track .ss-dot{position:absolute;top:3px;transform:translateX(-50%)}
        .ss-gap{position:absolute;top:7px;height:2px;background:#F2812D}
        .ss-wrap.fin-only .ss-part, .ss-wrap.fin-only .ss-lp{display:none}
        .ss-sub{border-radius:10px;background:#1B1F24;color:#fff;padding:10px 12px;font-size:15px;font-weight:700;word-break:keep-all}
        .ss-sub .p{color:#9AA5AF}
        .ss-note{font-size:12px;color:var(--muted);margin:0}
      ` }));
      const wrap = el.querySelector('.ss-wrap');
      const fixesFor = c => c <= 300 ? 3 : c <= 900 ? 2 : c <= 1500 ? 1 : 0;
      function render() {
        val.textContent = `${chunk}ms`;
        btn.textContent = finalOnly ? '부분 결과도 보기' : '확정만 보기';
        wrap.classList.toggle('fin-only', finalOnly);
        list.innerHTML = '';
        let sumPart = 0, sumFin = 0;
        const rows = WORDS.map(([w, end]) => {
          const part = Math.ceil(end / chunk) * chunk + PROC;
          const fin = part + chunk;
          sumPart += part - end; sumFin += fin - end;
          return { w, end, part, fin };
        });
        rows.forEach(r => {
          const pct = v => `${Math.min(98, (v / SPAN) * 100).toFixed(1)}%`;
          const show = finalOnly ? r.fin : r.part;
          list.append(P.h('div', { class: 'ss-w' }, P.h('b', {}, r.w),
            P.h('div', { class: 'ss-track' },
              P.h('i', { class: 'ss-gap', style: `left:${pct(r.end)};width:${(Math.min(98, (show / SPAN) * 100) - Math.min(98, (r.end / SPAN) * 100)).toFixed(1)}%` }),
              P.h('i', { class: 'ss-dot ss-said', style: `left:${pct(r.end)}` }),
              P.h('i', { class: 'ss-dot ss-part', style: `left:${pct(r.part)}` }),
              P.h('i', { class: 'ss-dot ss-fin', style: `left:${pct(r.fin)}` }))));
        });
        const avg = ((finalOnly ? sumFin : sumPart) / rows.length / 1000).toFixed(1);
        const fixes = fixesFor(chunk);
        status.classList.toggle('slow', chunk >= 1000);
        status.textContent = finalOnly
          ? `확정 글자는 평균 ${avg}초 늦게 굳어요. 굳은 글자는 다시 바뀌지 않아요.`
          : `평균 ${avg}초 늦게 뜨고, 앞 글자를 ${fixes}번 고쳐요.`;
        /* 말을 다 마친 3.4초 시점의 자막 모습 */
        const at = 3400;
        const finWords = rows.filter(r => r.fin <= at).map(r => r.w).join(' ');
        const partWords = rows.filter(r => r.fin > at && r.part <= at).map(r => r.w).join(' ');
        subLine.innerHTML = '';
        subLine.append(P.h('span', {}, '말이 끝난 순간 자막: '), P.h('span', {}, finWords || ''), finalOnly ? '' : P.h('span', { class: 'p' }, (finWords && partWords ? ' ' : '') + partWords));
        if (!finWords && (finalOnly || !partWords)) subLine.append(P.h('span', { class: 'p' }, '(아직 없음)'));
      }
      range.addEventListener('input', () => { chunk = +range.value; render(); });
      btn.addEventListener('click', () => { finalOnly = !finalOnly; render(); });
      render();
    }
  },

  teacherLines: [
    '실시간 자막은 <b>먼저 짐작해서 띄우고, 더 들으면서 고쳐요</b>. 글자가 바뀌는 건 고장이 아니에요.',
    '빨리 띄우면 자주 고치고, 늦게 띄우면 정확해져요. <b>기록으로 남길 때는 확정된 자막</b>을 다시 읽어요.'
  ],
  tip: {
    body: '수업에 실시간 자막을 띄울 때는 학생들에게 "<b>회색 글자는 바뀔 수 있어요</b>"라고 먼저 알려 주세요. 녹화본 자막이나 회의록은 확정 결과를 한 번 읽고 고쳐서 내보내요.',
    extra: '말을 문장 단위로 끊어 주면 확정 결과가 빨리 굳어요. 학생 목소리를 녹음·전사하는 활동은 시작 전에 알리고, 전사본 보관 기간을 정해 둬요.'
  },
  myth: {
    myth: '실시간 자막에서 글자가 바뀌는 건 인식이 불안정해서다.',
    fact: '실시간 인식은 일부러 먼저 짐작한 부분 결과를 띄우고, 뒤 소리가 들어오면 고쳐서 확정해요. 기다렸다 띄우면 정확하지만 늦고, 빨리 띄우면 고칠 일이 생기는 맞바꿈이에요.'
  },
  sources: [
    { title: 'Microsoft AI: Our first streaming transcription model (2026-10-01)', url: 'https://microsoft.ai/news/our-first-streaming-transcription-model/', note: '첫 부분 결과(partials)가 소리를 받은 지 100ms 남짓, 맥락이 들어오면 고쳐서 확정, 60개 언어 자동 감지.' },
    { title: 'Microsoft AI: MAI-Transcribe-2', url: 'https://microsoft.ai/models/mai-transcribe-2/', note: '스트리밍 변형, 화자 구분·타임스탬프·키워드 바이어싱, 자동 언어 감지.' },
    { title: 'Turning Whisper into Real-Time Transcription System (arXiv, 2023)', url: 'https://arxiv.org/abs/2307.14743', note: '연속 두 추정의 공통 앞부분만 확정, 청크가 길수록 늦지만 정확, 1초 청크에서 영어 평균 지연 3.3초.' },
    { title: 'Streaming End-to-end Speech Recognition For Mobile Devices (arXiv, 2018)', url: 'https://arxiv.org/abs/1811.06621', note: 'RNN-T 기반 종단간 인식으로 휴대폰에서 실시간 스트리밍.' }
  ],
  script: `10월 1일 Microsoft가 첫 스트리밍 음성인식 모델을 공개했어요. 소리를 받은 지 100밀리초 남짓에 첫 글자를 내놓는대요. 그런데 실시간 자막은 왜 썼다 지웠다 할까요.

녹음 파일 자막은 말이 다 끝난 뒤 전체를 보고 글자를 정해요. 실시간 자막은 소리를 잘게 나눈 청크를 받을 때마다 지금까지 들은 것으로 글자를 내놔요. 먼저 띄우는 글자가 부분 결과이고, 뒤 소리가 들어오면 고쳐서 확정 결과로 굳혀요. 2023년 연구는 연달아 두 번 똑같이 나온 앞부분만 확정했어요.

청크를 길게 받으면 맥락이 많아 정확하지만 늦게 뜨고, 짧게 받으면 빨리 뜨지만 자주 고쳐요. 그래서 글자가 바뀌는 건 원래 그렇게 만든 거예요.

수업에서는 회색 글자가 바뀔 수 있다고 미리 알려 주고, 남기는 기록은 확정 결과를 한 번 읽고 고쳐서 내보내요.`
};
