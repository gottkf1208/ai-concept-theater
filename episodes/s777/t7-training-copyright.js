/* S777-61 AI 학습은 공정이용일까: 공정이용 4요소와 생성형·비생성형 AI의 구분 */
export default {
  slug: 't7-training-copyright',
  track: 'S777',
  title: 'AI 학습은 공정이용일까?',
  subtitle: '공정이용 4요소와 생성형·비생성형 AI의 구분',
  summary: '9월 29일 미국 항소법원이 판례 요지를 AI 학습에 쓴 사건에서 "공정이용이 아니다"라고 판단했어요. 판결문이 공정이용 네 요소를 하나씩 어떻게 따졌는지 살펴봐요. 이 AI는 새 글을 만들지 않는 "비생성형"이라 판결문은 생성형 AI 사건과 선을 그었어요. 같은 시기 음악·EU·한국 소식도 함께 정리해요.',
  keywords: ['공정이용', '공정한 이용', '4요소', '변형적 이용', '판례 요지', '헤드노트', '학습 데이터', '라이선스', '생성형 AI', '비생성형 AI', '저작권법 제35조의5', '17 U.S.C. §107', '신탁', '의견수렴'],

  scenes: [
    {
      title: '열흘 사이 저작권 소식 넷', dur: 14,
      captions: [
        { t: 0, text: '9월 18일부터 29일 사이 AI와 저작권 소식이 네 개 나왔어요. 미국 소송, 한국 토론회, 미국 판결, EU 의견수렴이에요.' },
        { t: 5.5, text: '음반사들이 AI 음악 회사를 상대로 소장을 냈고, 문체부는 AI 활용 음악에서 <em>인간의 창작적 기여</em>를 어떻게 판단할지 논의하는 토론회를 알렸어요.' },
        { t: 10, text: '오늘은 9월 29일 판결문 하나를 열어 봐요. 법원이 <em>공정이용</em>을 어떻게 따지는지 그대로 보여 주거든요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'think' });
        stage.append(q.el);
        const cards = [
          ['9.18 음반사 소장', 'AI 음악 회사 상대 · 미국 법원', ''],
          ['9.21 문체부 안내', '9.22 국회 AI 음악 신탁 토론회', ''],
          ['9.29 항소법원 판결', '판례 요지 학습 · 공정이용 아님', 'aqua'],
          ['9.29 EU 의견수렴', 'AI와 저작권 · 11.3까지', '']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 360 + (i % 2) * 430, y: 100 + Math.floor(i / 2) * 150, w: 410, h: 130, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .4 + i * 1, { from: 'up' });
          return b;
        });
        const open = P.text({ x: 360, y: 430, w: 840, text: '오늘은 <em>판결문 하나</em>를 열어 봐요', size: 30, weight: 800 });
        tl.at(stage.appendChild(open.el), 10.2, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.4 || t > 9.8);
            cards.forEach((b, i) => b.on(i === 2 ? t > 10 : (i < 2 ? (t > 5.5 && t < 10) : false)));
          }
        };
      }
    },
    {
      title: '공정이용의 네 요소', dur: 13,
      captions: [
        { t: 0, text: '<em>공정이용</em>은 허락 없이 써도 저작권 침해가 아닌 경우예요. 법원은 네 가지를 함께 따져요.' },
        { t: 5, text: '이용의 목적과 성격, 저작물의 성격, 쓴 양과 중요성, 시장에 미치는 영향이에요.' },
        { t: 9, text: '우리 저작권법 제35조의5도 같은 네 가지를 봐요.' }
      ],
      build({ stage, lines, P, tl }) {
        const rows = ['① 이용의 목적과 성격', '② 저작물의 성격', '③ 쓴 양과 중요성', '④ 시장에 미치는 영향'].map((label, i) => {
          const b = P.box({ x: 340, y: 100 + i * 88, w: 860, h: 74, label, accent: i === 0 ? 'aqua' : '' });
          tl.at(stage.appendChild(b.el), 5.2 + i * .8, { from: 'left' });
          return b;
        });
        const head = P.text({ x: 340, y: 470, w: 860, text: '허락 없이 써도 <em>침해가 아닌</em> 경우를 가리는 네 질문', size: 26, weight: 800 });
        tl.at(stage.appendChild(head.el), .4, { from: 'up' });
        const us = P.chip({ x: 340, y: 540, text: '미국 저작권법 제107조', color: 'ink', size: 20 });
        const kr = P.chip({ x: 620, y: 540, text: '한국 저작권법 제35조의5도 같은 네 가지', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(us.el), 2, { from: 'pop' });
        tl.at(stage.appendChild(kr.el), 9.2, { from: 'pop' });
        return {
          tick(t) {
            rows.forEach((b, i) => b.on(t > 5.2 + i * .8 && t < 5.2 + (i + 1) * .8 + .4));
          }
        };
      }
    },
    {
      title: '판결문은 이렇게 봤어요', dur: 15,
      captions: [
        { t: 0, text: '이 회사는 법률 검색 AI를 학습시키려고 <em>판례 요지</em>(판결의 법리를 편집자가 간추린 주석) 2,243개로 질문을 만들었어요.' },
        { t: 4, text: '법원은 같은 목적의 상업적 이용이고, 판결문을 바로 쓸 수 있었는데 "쉬워서" 요지를 썼다고 봤어요. 사실적 성격이 강하다는 점만 약간 유리했어요.' },
        { t: 8, text: '회사는 전체의 0.08%뿐이라고 했지만, 법원은 요지 하나하나가 저작물이라 통째로 베낀 셈이라고 봤어요.' },
        { t: 11.5, text: 'AI 학습용 라이선스 시장도 해친다고 봐서 네 요소를 함께 따져 공정이용이 아니라고 했어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const F = [
          ['① 목적과 성격', '불리', '같은 목적의 상업적 이용', 'ink', 4.3],
          ['② 저작물의 성격', '약간 유리', '공표된 사실적 성격', 'aqua', 6.3],
          ['③ 쓴 양과 중요성', '불리', '0.08%라도 하나하나 통째로', 'ink', 8.3],
          ['④ 시장 영향', '불리', '학습 데이터 라이선스 시장', 'ink', 11.7]
        ];
        const rows = F.map(([name, v, why, acc, at], i) => {
          const y = 95 + i * 108;
          const n = P.box({ x: 340, y, w: 340, h: 100, label: name, accent: '' });
          tl.at(stage.appendChild(n.el), .3 + i * .3, { from: 'left' });
          const j = P.box({ x: 700, y, w: 500, h: 100, label: v, sub: why, accent: acc });
          tl.at(stage.appendChild(j.el), at, { from: 'right' });
          return j;
        });
        const fin = P.text({ x: 340, y: 545, w: 860, text: '판례 요지 <em>2,243개</em> → 공정이용 아님', size: 30, weight: 800 });
        tl.at(stage.appendChild(fin.el), 12.6, { from: 'up' });
        return {
          tick(t) {
            rows.forEach((b, i) => b.on(t > F[i][4] && t < (F[i + 1] ? F[i + 1][4] : 15)));
          }
        };
      }
    },
    {
      title: '생성형과 비생성형', dur: 13,
      captions: [
        { t: 0, text: '판결문은 이 AI가 새 표현을 만들지 않고 기존 판결문 구절만 돌려주는 <em>비생성형 AI</em>라고 짚었어요.' },
        { t: 5, text: '각주에서는 생성형 AI 학습을 다투는 다른 사건의 우려가 이 사건에는 해당하지 않는다고 선을 그었어요.' },
        { t: 9.5, text: '그래서 이 판결을 "AI 학습은 다 안 된다"로 읽으면 안 돼요. 음악 AI 소송은 이제 소장이 들어간 단계예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 280, pose: 'point' });
        stage.append(q.el);
        const non = P.box({ x: 360, y: 110, w: 390, h: 220, label: '비생성형 AI', sub: '기존 판결문 구절을 찾아 돌려줌', accent: 'ink', icon: P.ICON.search });
        const gen = P.box({ x: 810, y: 110, w: 390, h: 220, label: '생성형 AI', sub: '새 문장을 만들어 냄', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(non.el), .3, { from: 'left' });
        tl.at(stage.appendChild(gen.el), 5.2, { from: 'right' });
        const div = P.arrow(lines, { x1: 780, y1: 110, x2: 780, y2: 400, width: 3, color: '#9AA5AF', dashed: true, head: false });
        const c1 = P.chip({ x: 360, y: 350, text: '이 사건', color: 'orange', size: 20 });
        const c2 = P.chip({ x: 810, y: 350, text: '다른 사건들 · 이번엔 판단 안 함', color: 'gray', size: 20 });
        tl.at(stage.appendChild(c1.el), 1.2, { from: 'pop' });
        tl.at(stage.appendChild(c2.el), 6, { from: 'pop' });
        const foot = P.text({ x: 360, y: 440, w: 840, text: '각주: 다른 사건의 우려는 <em>여기 해당 안 됨</em>', size: 26, weight: 800 });
        tl.at(stage.appendChild(foot.el), 7, { from: 'up' });
        const music = P.chip({ x: 360, y: 510, text: '음악 AI 소송은 소장 단계', color: 'gray', size: 20 });
        tl.at(stage.appendChild(music.el), 10.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.3);
            div.draw(P.clamp((t - 4.8) / .6, 0, 1));
            non.on(t > .3 && t < 5);
            gen.on(t > 5.2 && t < 9.5);
          }
        };
      }
    },
    {
      title: '교실에서는', dur: 12,
      captions: [
        { t: 0, text: '수업 자료에 남의 글이나 그림을 넣을 때도 같은 네 질문을 던져 보세요.' },
        { t: 5.5, text: '학생 작품을 AI 학습이나 공유에 쓰려면 공정이용을 따지기 전에 허락부터 받는 게 제일 깔끔해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 360, size: 300, pose: 'wave' });
        stage.append(q.el);
        const cards = [
          ['목적', '수업용인가, 원래 것을 대신하나', 'aqua', P.ICON.search],
          ['양', '꼭 필요한 만큼인가', 'ink', P.ICON.doc],
          ['허락', '라이선스·이용 조건이 있나', 'orange', P.ICON.check]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 360 + i * 280, y: 140, w: 260, h: 220, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 1, { from: 'up' });
          return b;
        });
        const fin = P.text({ x: 360, y: 420, w: 820, text: '학생 작품은 <em>먼저 허락</em>받기', size: 32, weight: 800 });
        tl.at(stage.appendChild(fin.el), 5.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 5.4);
            cards.forEach((b, i) => b.on(i === 2 ? t > 5.6 : (t > .3 + i * 1 && t < 5.6)));
          }
        };
      }
    }
  ],

  interaction: {
    title: '공정이용 네 요소 저울',
    desc: '네 요소마다 <b>공정이용 쪽 / 중간 / 반대 쪽</b>을 골라 보면 저울이 기울어요. <b>9.29 판결문 대입</b>을 누르면 판결문이 요소마다 어떻게 봤는지 근거와 함께 채워져요. 저울은 생각을 정리하는 도구예요. 법원은 점수를 더하지 않고 네 요소를 함께 따져요. \'판결문 대입\' 값만 실제 판결문 내용이에요.',
    mount(el, P) {
      const FACTORS = [
        { name: '① 이용의 목적과 성격', ruling: 1, why: '상업적이고 원래 서비스와 같은 목적(법률 검색)이라 변형성이 거의 없어요. 판결문을 쓸 수 있었는데 "쉬워서" 요지를 썼고, 쉬움은 필요가 아니라고 봤어요.' },
        { name: '② 저작물의 성격', ruling: -0.5, why: '요지는 공표됐고 사실적 성격이 강해서 공정이용 쪽으로 약간 유리했어요.' },
        { name: '③ 쓴 양과 중요성', ruling: 1, why: '전체의 0.08%라는 주장이 있었지만, 요지 하나하나가 독립 저작물이라 하나마다 전체를 베낀 셈이라고 봤어요.' },
        { name: '④ 시장에 미치는 영향', ruling: 1, why: '경쟁 검색 서비스를 만들어 원래 시장을 해치고, 요지를 AI 학습 데이터로 라이선스하는 시장의 기회도 빼앗았다고 봤어요.' }
      ];
      const CHOICES = [[-1, '공정이용 쪽'], [0, '중간'], [1, '반대 쪽']];
      let vals = [0, 0, 0, 0];
      let ruling = false;

      const btnRule = P.h('button', { class: 'btn primary', type: 'button' }, '9.29 판결문 대입');
      const btnMine = P.h('button', { class: 'btn', type: 'button' }, '내 사례로 해 보기');
      const rowsBox = P.h('div', { class: 'sim-fu-rows' });
      const beam = P.h('div', { class: 'sim-fu-beam' }, P.h('span', { class: 'sim-fu-pan l' }, '공정이용'), P.h('span', { class: 'sim-fu-pan r' }, '공정이용 아님'));
      const scale = P.h('div', { class: 'sim-fu-scale', 'aria-hidden': 'true' }, beam, P.h('div', { class: 'sim-fu-post' }));
      const result = P.h('p', { class: 'sim-fu-result', 'aria-live': 'polite' });

      el.append(P.h('div', { class: 'sim-fu' },
        P.h('div', { class: 'sim-fu-ctl' }, btnRule, btnMine),
        P.h('div', { class: 'sim-fu-cols' }, rowsBox, P.h('div', { class: 'sim-fu-side' }, scale, result))
      ));
      el.append(P.h('style', { html: `
        .sim-fu{display:flex;flex-direction:column;gap:14px;max-width:100%}
        .sim-fu-ctl{display:flex;gap:10px;flex-wrap:wrap}
        .sim-fu-cols{display:grid;grid-template-columns:3fr 2fr;gap:16px;max-width:100%}
        @media (max-width:640px){.sim-fu-cols{grid-template-columns:1fr}}
        .sim-fu-rows{display:flex;flex-direction:column;gap:10px;min-width:0}
        .sim-fu-row{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#fff;display:flex;flex-direction:column;gap:8px;min-width:0}
        .sim-fu-row h5{margin:0;font-size:14px}
        .sim-fu-opts{display:flex;gap:6px;flex-wrap:wrap}
        .sim-fu-opts button{border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:13px;font-weight:700;background:#fff;color:var(--muted);max-width:100%}
        .sim-fu-opts button[aria-checked="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
        .sim-fu-why{margin:0;font-size:13px;line-height:1.55;color:var(--muted)}
        .sim-fu-why.real{color:var(--ink)}
        .sim-fu-side{display:flex;flex-direction:column;gap:12px;min-width:0}
        .sim-fu-scale{position:relative;height:150px;border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden}
        .sim-fu-beam{position:absolute;left:8%;right:8%;top:60px;height:8px;border-radius:4px;background:var(--ink);transition:transform .35s;transform-origin:50% 50%}
        .sim-fu-pan{position:absolute;top:14px;font-size:12.5px;font-weight:700;white-space:nowrap;padding:4px 8px;border-radius:8px}
        .sim-fu-pan.l{left:0;background:color-mix(in srgb,var(--acc1,#127E90) 14%,white);color:var(--acc1,#127E90)}
        .sim-fu-pan.r{right:0;background:color-mix(in srgb,var(--acc2,#F2812D) 14%,white);color:var(--acc2,#F2812D)}
        .sim-fu-post{position:absolute;left:calc(50% - 4px);top:64px;width:8px;height:70px;background:#9AA5AF;border-radius:4px}
        .sim-fu-result{margin:0;font-size:14.5px;line-height:1.6;font-weight:700}
      ` }));

      const render = () => {
        rowsBox.replaceChildren(...FACTORS.map((f, i) => {
          const opts = P.h('div', { class: 'sim-fu-opts', role: 'radiogroup', 'aria-label': f.name },
            ...CHOICES.map(([v, label]) => {
              const sel = Math.sign(vals[i]) === v;
              const b = P.h('button', { type: 'button', role: 'radio', 'aria-checked': sel ? 'true' : 'false' }, (ruling && sel && Math.abs(vals[i]) === .5) ? `${label}(약간)` : label);
              b.addEventListener('click', () => { vals[i] = v; ruling = false; render(); });
              return b;
            }));
          const why = P.h('p', { class: 'sim-fu-why' + (ruling ? ' real' : '') }, ruling ? `판결문: ${f.why}` : '직접 고른 값이에요.');
          return P.h('div', { class: 'sim-fu-row' }, P.h('h5', {}, f.name), opts, why);
        }));
        const sum = vals.reduce((a, b) => a + b, 0);
        const deg = Math.max(-24, Math.min(24, sum * 7));
        beam.style.transform = `rotate(${deg}deg)`;
        if (ruling) {
          result.textContent = '판결문 결론: 공정이용 아님(네 요소를 함께 따짐). 1·3·4요소 불리, 2요소 약간 유리.';
        } else {
          const side = sum > 0 ? '"공정이용 아님"' : (sum < 0 ? '"공정이용"' : '어느 쪽도 아닌 가운데');
          result.textContent = `저울이 ${side} 쪽으로 기울어요. 실제 판단은 법원이 네 요소를 함께 봐요.`;
          if (sum === 0) result.textContent = '저울이 가운데에 있어요. 실제 판단은 법원이 네 요소를 함께 봐요.';
        }
      };
      btnRule.addEventListener('click', () => { vals = FACTORS.map(f => f.ruling); ruling = true; render(); });
      btnMine.addEventListener('click', () => { vals = [0, 0, 0, 0]; ruling = false; render(); });
      render();
    }
  },

  teacherLines: [
    '공정이용은 <b>목적, 저작물의 성격, 쓴 양, 시장에 주는 영향</b> 네 가지를 함께 따져서 정해요.',
    '9월 판결은 <b>새 글을 만들지 않는 AI</b>를 두고 내린 판단이에요. 생성형 AI 학습은 다른 사건들에서 따지는 중이에요.'
  ],
  tip: {
    body: '수업 자료를 만들 때 남의 글·그림·음악을 넣기 전에 네 질문을 메모해 보세요. ① 수업 목적인가, 원래 것을 대신하는가 ② 사실 정보인가, 창작물인가 ③ 꼭 필요한 만큼만인가 ④ 원래 작품을 살 사람이 줄어드나. 걸리는 게 있으면 허락이나 라이선스를 먼저 찾아요.',
    extra: '학생 그림·글을 AI 서비스에 넣어 새 작품을 만드는 활동이라면 저작권(학생이 저작자)과 개인정보가 함께 걸려요. 학생 정보 입력 기준은 \'학생 이름, AI에 넣어도 될까?\' 편을 함께 보세요.'
  },
  myth: {
    myth: '교육 목적이면 무엇이든 공정이용이다.',
    fact: '교육 목적은 첫째 요소에 유리할 뿐이고, 저작물의 성격·쓴 양·시장 영향을 함께 따져요. 같은 목적의 상업적 이용이면 AI 학습용이라도 공정이용이 아니라고 본 판결도 나왔어요.'
  },
  sources: [
    { title: 'Thomson Reuters v. ROSS Intelligence, No. 25-2153 (3d Cir. Sept. 29, 2026) 판결문', url: 'https://www2.ca3.uscourts.gov/opinarch/252153p.pdf', note: '2026-09-29 선고, 원심 부분 약식판결 유지, 판례 요지 2,243개, 네 요소 판단, 비생성형 AI와 각주 7.' },
    { title: '17 U.S. Code §107: Fair use (Cornell LII)', url: 'https://www.law.cornell.edu/uscode/text/17/107', note: '공정이용의 목적 예시와 네 가지 고려 요소.' },
    { title: '저작권법 제35조의5(저작물의 공정한 이용) (국가법령정보센터)', url: 'https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=283335&joNo=0035&joBrNo=05&docCls=jo&urlMode=lsScJoRltInfoR', note: '한국 공정이용 조항, 같은 네 가지 고려 요소, 2011-12-02 신설.' },
    { title: 'UMG Recordings, Inc. v. Suno, Inc., 1:26-cv-14275 (D. Mass.) 사건 기록', url: 'https://www.courtlistener.com/docket/74812464/umg-recordings-inc-v-suno-inc/', note: '2026-09-18 소장 접수, 저작권 침해, 아직 소장 단계.' }
  ],
  script: `9월 18일부터 29일 사이 AI와 저작권 소식이 넷 나왔어요. 미국 음반사들의 소장, 문체부의 AI 음악 토론회, 미국 항소법원 판결, EU 의견수렴이에요. 오늘은 판결문을 열어 봐요.

공정이용은 허락 없이 써도 침해가 아닌 경우예요. 법원은 목적과 성격, 저작물의 성격, 쓴 양, 시장 영향을 함께 따져요. 우리 저작권법 제35조의5도 같아요.

이 사건의 회사는 판례 요지 2,243개로 법률 검색 AI를 학습시켰어요. 법원은 같은 목적의 상업적 이용이고, 요지 하나하나를 통째로 베꼈고, 학습 데이터 라이선스 시장을 해친다고 봐서 공정이용이 아니라고 했어요. 다만 이 AI는 새 글을 만들지 않는 비생성형이라서 판결문은 각주에서 생성형 AI 사건과 선을 그었어요.

수업 자료에도 같은 네 질문을 던져 보고, 학생 작품은 먼저 허락을 받아요.`
};
