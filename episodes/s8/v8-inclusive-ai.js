/* S8-77 포용적 AI란 무엇일까: 세로 무대(720×1280), 7장면 104초
   1차 출처: 세계은행 GADS 2026 행사 페이지(네 바탕·Small AI), 과기정통부 보도자료 기반 기사(10.19), Lehdonvirta·Wú·Hawkins 2024 AIES(클라우드 GPU 센서스), Ahia 외 2023(언어별 토큰 비용) */
import { clamp, seg, EO, SM, EXPO, INTO, SP, typer, riser, odo, frame, quokka, track } from './kit.js';

const STEPS = [['뜻', '빠지는 사람 없이'], ['요금', '언어마다 토큰 수'], ['창고', 'GPU 있는 나라 39'], ['작은 AI', '일상 문제 푸는 도구'], ['서울', '10.19~22 · 60여 개국'], ['교실', '뒷줄 아이부터']];
const CSS = `
.ia-def{position:absolute;left:60px;top:300px;width:600px;text-align:center}
.ia-def .k-big{position:static;display:block;font-size:52px;line-height:1.25;white-space:normal}
.ia-tile{position:absolute;width:290px;height:120px;border-radius:20px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:16px 18px;box-shadow:0 14px 30px -22px rgba(27,31,36,.5);opacity:0;transform-origin:50% 50%}
.ia-tile b{display:block;font-size:26px;font-weight:800;color:var(--acc1)}
.ia-tile span{display:block;font-size:18px;font-weight:700;color:var(--muted2);margin-top:4px}
.ia-sent{position:absolute;left:60px;width:600px;height:64px;display:flex;align-items:center;gap:12px}
.ia-sent b{width:110px;font-size:22px;font-weight:800;color:var(--ink);white-space:nowrap}
.ia-bar{position:relative;flex:1;height:44px;border-radius:12px;background:rgba(255,255,255,.7);overflow:hidden}
.ia-bar i{position:absolute;left:0;top:0;height:100%;width:0;background:var(--acc1);border-radius:12px;display:flex;gap:3px;align-items:center;padding:0 8px;box-sizing:border-box}
.ia-bar i u{display:block;width:14px;height:24px;border-radius:4px;background:rgba(255,255,255,.75);flex:none}
.ia-bar em{position:absolute;right:10px;top:0;height:100%;display:flex;align-items:center;font-style:normal;font-size:18px;font-weight:800;color:var(--ink)}
.ia-quote{position:absolute;border-radius:16px;background:var(--acc2-pale);border:1px solid rgba(27,31,36,.06);padding:14px 18px;box-sizing:border-box;font-size:22px;font-weight:700;line-height:1.45;color:var(--ink)}
.ia-quote small{display:block;font-size:16px;color:var(--muted2);margin-top:6px;font-weight:700}
.ia-grid{position:absolute;left:60px;top:120px;width:600px;display:grid;grid-template-columns:repeat(19,1fr);gap:6px}
.ia-dot{aspect-ratio:1;border-radius:50%;background:rgba(27,31,36,.12);transform:scale(.6);transition:background .25s,transform .25s}
.ia-dot.on{background:var(--acc1);transform:scale(1)}
.ia-dot.top{background:var(--acc2);transform:scale(1.25)}
.ia-leg{position:absolute;left:60px;width:600px;display:flex;gap:10px;flex-wrap:wrap}
.ia-leg span{font-size:20px;font-weight:800;padding:6px 12px;border-radius:999px;background:#fff;border:1px solid rgba(27,31,36,.08);opacity:0}
.ia-leg span::before{content:'';display:inline-block;width:14px;height:14px;border-radius:50%;margin-right:8px;vertical-align:-1px;background:var(--c)}
.ia-pkt{position:absolute;width:18px;height:18px;border-radius:50%;background:var(--acc2);box-shadow:0 0 0 6px rgba(27,31,36,.08);opacity:0}
.ia-bigbox{position:absolute;left:60px;top:120px;width:600px;height:260px;border-radius:26px;background:var(--ink-soft);color:#fff;display:grid;place-items:center;font-size:40px;font-weight:800;transform-origin:50% 50%}
.ia-small{position:absolute;width:140px;height:140px;border-radius:22px;background:#fff;border:1px solid rgba(27,31,36,.08);box-shadow:0 14px 30px -22px rgba(27,31,36,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transform-origin:50% 50%}
.ia-small b{font-size:22px;font-weight:800;color:var(--ink)}
.ia-small span{font-size:15px;font-weight:700;color:var(--muted2)}
.ia-small i{font-style:normal;font-size:34px;line-height:1}
.ia-ev{position:absolute;left:60px;top:120px;width:600px;border-radius:24px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:22px 26px;box-shadow:0 16px 36px -24px rgba(27,31,36,.5)}
.ia-ev small{display:block;font-size:16px;font-weight:800;color:var(--muted2);letter-spacing:.04em}
.ia-ev h4{margin:6px 0 10px;font-size:34px;font-weight:800;line-height:1.2;color:var(--ink)}
.ia-ev p{margin:0;font-size:21px;font-weight:700;line-height:1.5;color:var(--ink)}
.ia-ev .row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.ia-ev .row span{font-size:18px;font-weight:800;padding:6px 12px;border-radius:999px;background:var(--acc1-pale);color:var(--acc1);opacity:0}
.ia-say{position:absolute;left:60px;width:600px;font-size:24px;font-weight:700;line-height:1.5;color:var(--ink);background:rgba(255,255,255,.9);border-radius:16px;padding:14px 18px;box-sizing:border-box;border:1px solid rgba(27,31,36,.08)}
.ia-chk{position:absolute;left:60px;width:600px;height:86px;border-radius:18px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;display:flex;align-items:center;gap:14px;padding:0 18px;opacity:0;transform-origin:0 50%}
.ia-chk i{width:36px;height:36px;border-radius:10px;border:2px solid var(--acc1);display:grid;place-items:center;color:var(--acc1);font-style:normal;font-weight:900;font-size:22px;flex:none}
.ia-chk i::after{content:'✓';opacity:0}
.ia-chk.done i::after{opacity:1}
.ia-chk b{font-size:24px;font-weight:800;color:var(--ink)}
.ia-chk span{font-size:18px;font-weight:700;color:var(--muted2);margin-left:auto;white-space:nowrap}
.ia-ringbox{position:absolute;left:60px;top:178px;width:600px;height:600px;border-radius:26px;overflow:hidden;background:#f5f5f7;box-shadow:0 28px 60px -30px rgba(27,31,36,.6);opacity:0;transform-origin:50% 50%;will-change:transform}
.ia-ringbox iframe{display:block;width:600px;height:600px;border:0;pointer-events:none}
.ia-marq{position:absolute;overflow:hidden;border-radius:20px}
.ia-marq-in{position:absolute;left:0;top:12px;display:flex;gap:14px;will-change:transform}
.ia-mtile{flex:none;width:240px;height:240px;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 16px 36px -22px rgba(27,31,36,.55)}
.ia-mtile iframe{display:block;width:240px;height:240px;border:0;pointer-events:none}
`;

export default {
  slug: 'v8-inclusive-ai',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  stageWide: { w: 1280, h: 720 },
  title: '포용적 AI란 무엇일까',
  subtitle: '빠지는 사람 없이, AI의 쓸모가 닿게',
  summary: '10월 19일부터 22일까지 서울에서 세계은행과 과기정통부가 60여 개국 장·차관을 모아 글로벌 AI·디지털 서밋을 열었어요. 첫 의제가 "AI를 활용한 디지털 포용"이에요. 포용적 AI는 AI의 쓸모가 돈 많은 나라, 영어 쓰는 사람, 큰 회사에서 멈추지 않게 하자는 말이에요. 지금 어디서 빠지는지 세 군데를 봐요. 같은 문장인데 언어마다 토큰 수가 달라 더 내는 요금, AI용 컴퓨터 창고가 있는 나라 39개국과 나머지 "컴퓨트 사막", 그리고 가장 큰 모델보다 일상 문제를 푸는 "작은 AI". 마지막은 우리 교실 뒷줄 이야기예요.',
  keywords: ['포용적 AI', '디지털 포용', '세계은행', '글로벌 AI·디지털 서밋', '컴퓨트 사막', '작은 AI', '토큰 비용', 'AI 격차', 'AI 기본사회'],

  scenes: [
    /* 1 ── 뜻부터 */
    {
      title: '뜻부터', dur: 13,
      captions: [
        { t: 0, text: '포용적 AI, 요즘 자주 들리는 말이에요.' },
        { t: 3.5, text: '포용은 빠지는 사람 없이 끼워 준다는 뜻이에요.' },
        { t: 7, text: '세계은행은 바탕을 넷으로 적었어요.' },
        { t: 10, text: '연결, 요금, 생태계, 쓸 준비.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const word = P.h('div', { class: 'k-big', style: 'left:60px;top:130px;width:600px;font-size:64px' }); stage.append(word);
        const rw = riser(P, word, '포용적 AI');
        const def = P.h('div', { class: 'ia-def' }); stage.append(def);
        const d1 = P.h('div', { class: 'k-big', style: 'font-size:44px;color:var(--muted2)' }); def.append(d1); const r1 = riser(P, d1, '빠지는 사람 없이');
        const d2 = P.h('div', { class: 'k-big', style: 'font-size:44px' }); def.append(d2); const r2 = riser(P, d2, 'AI의 쓸모가 닿게');
        const TILES = [['연결', '접속할 수 있는가'], ['요금', '쓸 만한 값인가'], ['생태계', '곁에 쓸 판이 있는가'], ['준비', '사람과 제도가 됐는가']];
        const tiles = TILES.map(([b, s], i) => { const el = P.h('div', { class: 'ia-tile', style: `left:${60 + (i % 2) * 310}px;top:${500 + Math.floor(i / 2) * 136}px` }, P.h('b', {}, b), P.h('span', {}, s)); stage.append(el); return el; });
        const src = P.h('div', { class: 'k-big', style: 'left:60px;top:780px;width:600px;font-size:18px;color:var(--muted2)' }, '세계은행, 글로벌 AI·디지털 서밋 2026 소개문'); stage.append(src); src.style.opacity = 0;
        const q = quokka(stage, P, 'wave'); const tr = track(stage, P, STEPS, [0]);
        return {
          tick(t) {
            q.tick(t, t < 12); tr.at(t, .3); rw.at(t, .3); r1.at(t, 3.6); r2.at(t, 4.4);
            tiles.forEach((el, i) => { const c = SP(seg(t, 7.2 + i * .45, 7.8 + i * .45)); el.style.opacity = c > 0 ? 1 : 0; el.style.transform = `scale(${c})`; });
            src.style.opacity = seg(t, 9.5, 10);
          }
        };
      }
    },
    /* 2 ── 요금: 같은 뜻, 다른 토큰 수 */
    {
      title: '요금이 달라요', dur: 16,
      captions: [
        { t: 0, text: 'AI 회사는 토큰 수로 돈을 받아요.' },
        { t: 3.5, text: '같은 뜻인데 언어마다 토큰 수가 달라요.' },
        { t: 8, text: '2023년 22개 언어로 재 본 연구가 있어요.' },
        { t: 12, text: '많은 언어 사용자가 더 내고 더 나쁜 답을 받아요.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:120px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, '"내일 비 와?" 한 문장의 값');
        /* 막대: 토큰 한 칸씩. 길이는 연구가 말한 "언어마다 크게 다르다"를 보여 주는 보기 값이에요 */
        const ROWS = [['영어', 5], ['한국어', 8], ['다른 언어 A', 13], ['다른 언어 B', 19]];
        const bars = ROWS.map(([k, n], i) => {
          const bar = P.h('div', { class: 'ia-bar' }), fill = P.h('i'), cnt = P.h('em', {}, '');
          for (let j = 0; j < n; j++) fill.append(P.h('u'));
          bar.append(fill, cnt);
          const row = P.h('div', { class: 'ia-sent', style: `top:${200 + i * 76}px` }, P.h('b', {}, k), bar); stage.append(row);
          return { row, fill, cnt, n };
        });
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:520px;width:600px;opacity:0' }, '같은 내용을 전하는 데 드는 토큰 수가 언어마다 크게 달라요.', P.h('small', {}, 'Ahia 외 2023, OpenAI API 22개 언어 비용·성능 분석')); stage.append(note);
        const q2 = P.h('div', { class: 'ia-quote', style: 'left:60px;top:650px;width:600px;opacity:0;background:#fff' }, '지원 언어 상당수의 화자는 더 내고 더 나쁜 결과를 받아요.', P.h('small', {}, '같은 논문 초록')); stage.append(q2);
        const q = quokka(stage, P, 'think'); const tr = track(stage, P, STEPS, [1]);
        return {
          tick(t) {
            q.tick(t, t < 15); tr.at(t); rh.at(t, .2);
            bars.forEach((b, i) => { const p = EO(seg(t, 1 + i * .5, 2.4 + i * .5)); b.row.style.opacity = t > .8 + i * .5 ? 1 : 0; b.fill.style.width = `${(b.n / 19) * 100 * p}%`; const n = Math.round(b.n * p); if (b.cnt.textContent !== `${n}`) b.cnt.textContent = `${n}`; });
            note.style.opacity = EO(seg(t, 8.2, 8.8)); note.style.transform = `translateY(${(1 - EO(seg(t, 8.2, 8.8))) * 20}px)`;
            q2.style.opacity = EO(seg(t, 12.2, 12.8)); q2.style.transform = `translateY(${(1 - EO(seg(t, 12.2, 12.8))) * 20}px)`;
          }
        };
      }
    },
    /* 3 ── 창고: GPU 있는 나라 39, 컴퓨트 사막 */
    {
      title: 'AI는 어디서 돌까', dur: 18,
      captions: [
        { t: 0, text: 'AI는 큰 컴퓨터 창고에서 돌아요.' },
        { t: 4, text: '2023년 조사: 그 창고가 있는 나라는 39개국.' },
        { t: 8.5, text: '최신 칩이 있는 나라는 둘뿐이었어요.' },
        { t: 12.5, text: '나머지는 빌려 써요. 바다 건너서.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const grid = P.h('div', { class: 'ia-grid' }); stage.append(grid);
        const N = 190, dots = Array.from({ length: N }, () => { const d = P.h('div', { class: 'ia-dot' }); grid.append(d); return d; });
        /* 39개가 켜지고, 그중 2개가 최신 칩(주황). 자리는 고정 난수 */
        const pick = []; let x = 7; for (let i = 0; i < 39; i++) { x = (x * 1103515245 + 12345) % 2147483648; let k = x % N; while (pick.includes(k)) k = (k + 1) % N; pick.push(k); }
        const top = [pick[3], pick[21]];
        const leg = P.h('div', { class: 'ia-leg', style: 'top:470px' }, P.h('span', { style: '--c:var(--acc1)' }, '창고 있음 39'), P.h('span', { style: '--c:var(--acc2)' }, '최신 칩 2'), P.h('span', { style: '--c:rgba(27,31,36,.2)' }, '컴퓨트 사막')); stage.append(leg);
        const legs = [...leg.children];
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:560px;width:600px;opacity:0' }, '컴퓨트 사막에는 세계의 저소득·중저소득 나라가 전부 들어 있어요.', P.h('small', {}, 'Lehdonvirta·Wú·Hawkins 2024, AIES. 6개 클라우드 회사 187개 지역 조사(2023년 10월 기준)')); stage.append(note);
        const pkt = P.h('div', { class: 'ia-pkt' }); stage.append(pkt);
        const path = P.arrow(lines, { x1: 120, y1: 420, x2: 560, y2: 160, curve: 90, width: 3, color: '#F2812D', dashed: true, head: false });
        const q = quokka(stage, P, 'oops'); const tr = track(stage, P, STEPS, [2]);
        return {
          tick(t) {
            q.tick(t, t < 17); tr.at(t);
            dots.forEach((d, i) => { const k = pick.indexOf(i); const on = k >= 0 && t > 4.2 + k * .09; d.classList.toggle('on', on && !top.includes(i)); d.classList.toggle('top', top.includes(i) && t > 8.8); });
            legs.forEach((l, i) => { l.style.opacity = seg(t, [4.4, 9, 12.6][i], [4.9, 9.5, 13.1][i]); });
            note.style.opacity = EO(seg(t, 13, 13.6));
            /* 사막의 점에서 창고로 갔다 돌아오는 요청 */
            const u = (t - 12.8) % 2.6, p = u < 1.1 ? SM(u / 1.1) : u < 1.3 ? 1 : 1 - SM((u - 1.3) / 1.1);
            path.draw(seg(t, 12.6, 13.2));
            const P0 = [120, 420], P2 = [560, 160], C = [340 + 90, 290 - 90];
            const px = (1 - p) * (1 - p) * P0[0] + 2 * (1 - p) * p * (420) + p * p * P2[0], py = (1 - p) * (1 - p) * P0[1] + 2 * (1 - p) * p * (180) + p * p * P2[1];
            pkt.style.opacity = t > 12.8 ? 1 : 0; pkt.style.transform = `translate(${px - 9}px, ${py - 9}px)`;
          }
        };
      }
    },
    /* 4 ── 작은 AI */
    {
      title: '작은 AI', dur: 15,
      captions: [
        { t: 0, text: '그래서 세계은행이 내건 말이 작은 AI예요.' },
        { t: 4, text: '가장 큰 모델보다 일상 문제를 푸는 도구.' },
        { t: 8, text: '농부, 교사, 작은 가게가 바로 쓰는 AI.' },
        { t: 11.5, text: '서울 세션 이름도 "작은 AI, 큰 영향"이에요.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const big = P.h('div', { class: 'ia-bigbox' }, '가장 큰 모델'); stage.append(big);
        const SM4 = [['🌾', '농업', '작물·날씨 알림'], ['🏥', '보건', '진료소 기록'], ['📚', '교육', '교실 보조'], ['🧭', '관광', '동네 안내']];
        const smalls = SM4.map(([ic, b, s], i) => { const el = P.h('div', { class: 'ia-small', style: `left:${60 + i * 153}px;top:420px` }, P.h('i', {}, ic), P.h('b', {}, b), P.h('span', {}, s)); stage.append(el); return el; });
        const qt = P.h('div', { class: 'ia-quote', style: 'left:60px;top:600px;width:600px;opacity:0' }, '가장 큰 모델이 아닌, 일상의 어려움을 푸는 실용적 도구에서 온다.', P.h('small', {}, '세계은행 "Small AI. Big Impact" 세션 소개(2026.10.20, 서울)')); stage.append(qt);
        const q = quokka(stage, P, 'point'); const tr = track(stage, P, STEPS, [3]);
        return {
          tick(t) {
            q.tick(t, t < 14); tr.at(t);
            const sh = SM(seg(t, 3.8, 5)); big.style.transform = `scale(${1 - .45 * sh}) translateY(${-40 * sh}px)`; big.style.opacity = 1 - .6 * sh;
            smalls.forEach((el, i) => { const c = SP(seg(t, 5 + i * .35, 5.6 + i * .35)); el.style.opacity = c > 0 ? 1 : 0; el.style.transform = `scale(${c})`; });
            qt.style.opacity = EO(seg(t, 8.2, 8.8));
          }
        };
      }
    },
    /* 5 ── 서울에서 무슨 일 */
    {
      title: '서울에 모인 60개국', dur: 14,
      captions: [
        { t: 0, text: '10월 19일부터 22일까지 서울 그랜드하얏트.' },
        { t: 3.5, text: '세계은행이 미국 밖에서 처음 연 AI 서밋이에요.' },
        { t: 7, text: '첫 의제가 디지털 포용과 접근성 확대.' },
        { t: 10.5, text: '혜택이 인류 전체에 고루 돌아가게, 배경훈 부총리.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const ev = P.h('div', { class: 'ia-ev' }, P.h('small', {}, 'GLOBAL AI & DIGITAL SUMMIT 2026'), P.h('h4', {}, '글로벌 AI·디지털 서밋'), P.h('p', {}, '2026.10.19 ~ 22 · 서울 그랜드하얏트', P.h('br'), '세계은행 + 과기정통부 · 60여 개국 장·차관'),
          P.h('div', { class: 'row' }, P.h('span', {}, '디지털 포용과 접근성 확대'), P.h('span', {}, 'AI로 공공서비스 혁신'), P.h('span', {}, '혁신적 AI·디지털 생태계')));
        stage.append(ev); tl.at(ev, .2, { from: 'up' });
        const rows = [...ev.querySelectorAll('.row span')];
        const cnt = P.h('div', { class: 'k-big', style: 'left:60px;top:430px;width:600px;font-size:84px' }); stage.append(cnt);
        const o = odo(P, cnt, '60', 100); cnt.append(P.h('span', { style: 'font-size:34px;margin-left:8px;color:var(--muted2)' }, '여 개국'));
        const say = P.h('div', { class: 'ia-say', style: 'top:580px' }); stage.append(say); say.style.opacity = 0;
        const ty = typer(P, say, '"책임 있는 AI 활용을 통해 그 혜택이 인류 전체에 고루 돌아갈 수 있도록 국제사회와 협력하겠다"', .045);
        const who = P.h('div', { class: 'k-big', style: 'left:60px;top:735px;width:600px;font-size:18px;color:var(--muted2);text-align:right' }, '배경훈 부총리 겸 과기정통부 장관, 10월 19일'); stage.append(who); who.style.opacity = 0;
        const q = quokka(stage, P, 'point'); const tr = track(stage, P, STEPS, [4]);
        return {
          tick(t) {
            q.tick(t, t < 13); tr.at(t);
            o.at(seg(t, 3.6, 5)); cnt.style.opacity = t > 3.4 ? 1 : 0;
            rows.forEach((r, i) => { r.style.opacity = seg(t, 7.2 + i * .4, 7.6 + i * .4); });
            say.style.opacity = t > 10.4 ? 1 : 0; ty.at(t - 10.6); who.style.opacity = seg(t, 13, 13.5);
          }
        };
      }
    },
    /* 6 ── 교실에선 */
    {
      title: '교실 뒷줄부터', dur: 14,
      captions: [
        { t: 0, text: '포용적 AI는 먼 나라 얘기만은 아니에요.' },
        { t: 3.5, text: '우리 반에서 AI 수업에 빠지는 아이가 있어요.' },
        { t: 7.5, text: '기기 없는 아이, 한국어 서툰 아이, 눈 불편한 아이.' },
        { t: 11, text: '셋을 먼저 세는 것이 교실의 포용적 AI예요.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:120px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, '우리 반 포용 점검 셋');
        const ITEMS = [['기기가 없는 아이', '학교 기기·오프라인 활동'], ['한국어가 서툰 아이', '모국어로 묻게 하기'], ['눈·손이 불편한 아이', '음성 입력·읽어 주기']];
        const chks = ITEMS.map(([b, s], i) => { const el = P.h('div', { class: 'ia-chk', style: `top:${200 + i * 104}px` }, P.h('i'), P.h('b', {}, b), P.h('span', {}, s)); stage.append(el); return el; });
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:540px;width:600px;opacity:0' }, '포용적 AI는 교실 뒷줄에서 시작해요. 빠진 아이를 먼저 세고, 그 아이가 쓸 길을 하나 더 열어 두면 돼요.'); stage.append(note);
        const q = quokka(stage, P, 'wave'); const tr = track(stage, P, STEPS, [5]);
        return {
          tick(t) {
            q.tick(t, t < 13); tr.at(t); rh.at(t, .2);
            chks.forEach((el, i) => { const c = EXPO(seg(t, 3.6 + i * .5, 4.3 + i * .5)); el.style.opacity = c; el.style.transform = `translateX(${(1 - c) * -40}px)`; el.classList.toggle('done', t > 7.6 + i * .6); });
            note.style.opacity = EO(seg(t, 11.2, 11.8));
          }
        };
      }
    },
    /* 7 ── 오늘의 정리: 탭 넘기기 + 쿼카 옆 모션 */
    {
      title: '오늘의 정리', dur: 14,
      captions: [
        { t: 0, text: '오늘 나온 말 셋만 정리할게요.' },
        { t: 1.6, text: '포용적 AI는 빠지는 사람 없이 쓸모가 닿게.' },
        { t: 5.6, text: '컴퓨트 사막은 AI 창고가 하나도 없는 나라.' },
        { t: 10.2, text: '작은 AI는 일상 문제를 푸는 실용적 도구.' }
      ],
      build({ stage: st0, lines, P, tl, base }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:112px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, '오늘의 AI 개념극장 · 용어 셋');
        const box = P.h('div', { class: 'ia-ringbox' }, P.h('iframe', { src: `${base || ''}assets/motions/browser-tabs-e77.html`, title: '용어 정리', tabindex: '-1' })); stage.append(box);
        const q = quokka(stage, P, 'wave');
        const root = stage.__root || stage, wide = !!stage.__root, MW = wide ? 360 : 330;
        const marq = P.h('div', { class: 'ia-marq', style: wide ? 'left:640px;top:96px;width:360px;height:290px' : 'left:60px;top:842px;width:330px;height:270px' });
        const inner = P.h('div', { class: 'ia-marq-in' }, ...['ring-type', 'odometer', 'wave-type', 'char-rise', 'word-punch', 'slice-shift'].map(id => P.h('div', { class: 'ia-mtile' }, P.h('iframe', { src: `${base || ''}assets/motions/${id}.html`, title: id, tabindex: '-1' }))));
        marq.append(inner); root.append(marq);
        return {
          tick(t) {
            q.tick(t, t < 13); rh.at(t, .2);
            const come = SP(seg(t, .6, 1.2)); box.style.opacity = come > 0 ? 1 : 0; box.style.transform = `translateY(${(1 - come) * 50}px) scale(${.9 + .1 * come})`;
            inner.style.transform = `translateX(${MW - Math.max(0, t - .4) * 105}px)`;
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 반 포용 점검표',
    desc: '학급 상황을 세 칸으로 고르면 지금 AI 수업에서 빠질 수 있는 아이가 몇 명인지, 어떤 길을 먼저 열어 두면 되는지 나와요. 숫자는 선생님이 넣는 값이고, 저장되지 않아요.',
    mount(el, P) {
      const Q = [['집에 쓸 기기가 없는 아이', '학교 기기 대여, 오프라인으로 같은 활동 준비'], ['한국어가 서툰 아이', '모국어로 질문하고 한국어로 답 받기, 번역 짝꿍'], ['눈·손이 불편한 아이', '음성 입력, 화면 읽어 주기, 큰 글자 설정'], ['AI 쓰기를 집에서 반대하는 아이', '학교 계정만 쓰기, 가정 안내문']];
      const inputs = Q.map(([k]) => P.h('input', { type: 'number', min: '0', max: '40', value: '0', class: 'sim-ia-num', 'aria-label': k }));
      const out = P.h('div', { class: 'sim-ia-out' });
      const bSample = P.h('button', { class: 'btn primary', type: 'button' }, '보기 값 넣기'), bClear = P.h('button', { class: 'btn', type: 'button' }, '비우기');
      const draw = () => {
        const rows = Q.map(([k, v], i) => ({ k, v, n: Math.max(0, parseInt(inputs[i].value) || 0) })).filter(r => r.n > 0);
        const total = rows.reduce((a, r) => a + r.n, 0);
        out.innerHTML = total === 0 ? '<p>숫자를 넣으면 빠질 수 있는 아이와 먼저 열어 둘 길이 나와요.</p>' : `<p><b>${total}명</b>이 지금 수업 설계에서 빠질 수 있어요.</p>` + rows.map(r => `<p>· ${r.k} ${r.n}명 → ${r.v}</p>`).join('');
      };
      el.append(P.h('style', {}, `
        .sim-ia-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:14px;font-weight:700;color:#4E5968}
        .sim-ia-num{width:72px;height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:700}
        .sim-ia-out{margin-top:12px;background:#F2F4F6;border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.6}
        .sim-ia-out p{margin:0 0 4px}
        .sim-ia-out b{color:#127E90}
      `), ...Q.map(([k], i) => P.h('div', { class: 'sim-ia-row' }, inputs[i], P.h('span', {}, k))), P.h('div', { class: 'sim-ia-row' }, bSample, bClear), out);
      inputs.forEach(i => i.addEventListener('input', draw));
      bSample.addEventListener('click', () => { [2, 1, 1, 0].forEach((v, i) => { inputs[i].value = String(v); }); draw(); });
      bClear.addEventListener('click', () => { inputs.forEach(i => { i.value = '0'; }); draw(); });
      draw();
    }
  },

  teacherLines: [
    '포용적 AI는 <b>빠지는 사람 없이</b> AI의 쓸모가 닿게 하자는 말이에요. 세계은행은 그 바탕을 연결, 요금, 생태계, 준비 넷으로 적었어요.',
    'AI는 큰 컴퓨터 창고에서 돌아요. 2023년 조사로 그 창고가 있는 나라는 <b>39개국</b>이었고, 없는 나라는 빌려 써요.'
  ],
  tip: {
    body: '포용적 AI를 수업에 들일 때는 숫자 하나로 시작하면 쉬워요. "우리 반에서 이 활동에 빠질 수 있는 아이가 몇 명일까." 기기, 언어, 신체 세 칸만 세어도 활동 설계가 달라져요.',
    extra: '세계 쪽 이야기는 서울 서밋 자료와 옥스퍼드 조사 표를 그대로 보여 주면 돼요. 특히 "최신 칩이 있는 나라가 둘"이라는 표는 아이들이 금방 알아봐요. 다만 2023년 10월 기준 조사라는 점을 꼭 같이 말해 주세요.'
  },
  myth: {
    myth: 'AI는 인터넷만 되면 누구나 똑같이 쓸 수 있다.',
    fact: '같은 문장도 언어마다 토큰 수가 달라 요금이 다르고, AI가 도는 컴퓨터 창고는 2023년 조사 기준 39개국에만 있었어요. 저소득 나라는 전부 창고가 없는 쪽이에요. 그래서 세계은행과 60여 개국이 서울에 모여 포용을 첫 의제로 올린 거예요.'
  },
  sources: [
    { title: 'World Bank, Global AI & Digital Summit 2026 (Seoul, Oct 19–22)', url: 'https://www.worldbank.org/en/events/2026/10/19/global-ai-and-digital-summit-2026', note: '행사 소개문. 포용적 AI의 바탕을 "digital access, affordability, ecosystems and AI readiness"로 적음. 10.20 "Small AI. Big Impact" 세션 소개(live.worldbank.org)에 "not from the largest models, but from practical tools designed to solve everyday challenges".' },
    { title: '과기정통부 보도자료 기반 기사(디지털투데이·MTN, 2026.10.19)', url: 'https://www.digitaltoday.co.kr/news/articleView.html?idxno=708002', note: '일정·장소·60여 개국·공동의장·3대 의제·배경훈 부총리 발언. 과기정통부 누리집은 점검 중이라 원문 링크 대신 보도자료 인용 기사.' },
    { title: 'Lehdonvirta, Wú & Hawkins (2024). Compute North vs. Compute South. AIES 2024', url: 'https://ojs.aaai.org/index.php/AIES/article/view/31683', note: '6개 클라우드 회사 187개 지역 조사(2023.10 기준). GPU 지역이 있는 나라 39개국, H100 지역 9곳(미국 8·네덜란드 1). 컴퓨트 사막 정의.' },
    { title: 'Ahia et al. (2023). Do All Languages Cost the Same? arXiv:2305.13707', url: 'https://arxiv.org/abs/2305.13707', note: '22개 언어로 OpenAI API 비용·성능 분석. "overcharged while obtaining poorer results".' }
  ],
  script: `포용적 AI, 요즘 자주 들리는 말이죠. 포용은 빠지는 사람 없이 끼워 준다는 뜻이에요. AI의 쓸모가 돈 많은 나라, 영어 쓰는 사람, 큰 회사에서 멈추지 않게 하자는 거예요. 세계은행은 그 바탕을 넷으로 적었어요. 연결할 수 있는가, 쓸 만한 값인가, 곁에 쓸 판이 있는가, 사람과 제도가 준비됐는가.

지금 어디서 빠지는지 세 군데만 볼게요. 첫째는 요금이에요. AI 회사는 토큰 수로 돈을 받는데, 같은 뜻의 문장도 언어마다 토큰 수가 달라요. 2023년에 22개 언어로 재 본 연구는 지원 언어 상당수의 화자가 더 내고 더 나쁜 답을 받는다고 적었어요. 둘째는 창고예요. AI는 큰 컴퓨터 창고에서 도는데, 2023년 10월 기준으로 여섯 클라우드 회사를 조사하니 그 창고가 있는 나라는 39개국이었고 최신 칩이 있는 나라는 둘뿐이었어요. 나머지 나라는 바다 건너 빌려 써요. 연구자들은 이쪽을 컴퓨트 사막이라고 불렀고, 저소득 나라는 전부 여기 들어 있어요. 셋째는 그래서 나온 답, 작은 AI예요. 세계은행은 가장 큰 모델보다 일상 문제를 푸는 실용적 도구에서 답이 온다고 썼어요. 농부, 교사, 작은 가게가 바로 쓰는 AI요.

이 이야기를 하러 10월 19일부터 22일까지 60여 개국 장·차관이 서울에 모였어요. 세계은행이 미국 밖에서 처음 연 AI 서밋이고, 첫 의제가 디지털 포용과 접근성 확대예요. 배경훈 부총리는 책임 있는 AI 활용으로 그 혜택이 인류 전체에 고루 돌아가게 국제사회와 협력하겠다고 했어요.

교실로 돌아올게요. 우리 반에도 AI 수업에서 빠지는 아이가 있어요. 기기가 없는 아이, 한국어가 서툰 아이, 눈이 불편한 아이. 이 셋을 먼저 세고 길을 하나 더 열어 두는 것, 그게 교실의 포용적 AI예요.`
};
