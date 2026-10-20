/* S8-77 포용적 AI란 무엇일까: 세로 무대(720×1280), 8장면 133초
   1차 출처: 세계은행 GADS 2026 행사 페이지(네 바탕·Small AI), 과기정통부 보도자료 기반 기사(10.19), Lehdonvirta·Wú·Hawkins 2024 AIES(클라우드 GPU 센서스), Ahia 외 2023(언어별 토큰 비용), CAST UDL 가이드라인 3.0(2024) */
import { clamp, seg, EO, SM, EXPO, INTO, SP, typer, riser, odo, frame, quokka, track } from './kit.js';

const STEPS = [['뜻', '빠지는 사람 없이'], ['요금', '언어마다 토큰 수'], ['GPU', 'AI 칩 클라우드 39개국'], ['작은 AI', '일상 문제 푸는 도구'], ['서울', '10.19~22 · 60여 개국'], ['교실', '사각지대부터 챙기기'], ['UDL', '처음부터 모두에게']];
const CSS = `
.k-track{gap:6px}
.k-step{height:42px}
.ia-def{position:absolute;left:60px;top:300px;width:600px;text-align:center}
.ia-def .k-big{position:static;display:block;font-size:52px;line-height:1.25;white-space:normal}
.ia-tile{position:absolute;width:290px;height:120px;border-radius:20px;background:#fff;border:1px solid rgba(27,31,36,.08);box-sizing:border-box;padding:16px 18px;box-shadow:0 14px 30px -22px rgba(27,31,36,.5);opacity:0;transform-origin:50% 50%}
.ia-tile b{display:block;font-size:26px;font-weight:800;color:var(--acc1)}
.ia-tile span{display:block;font-size:18px;font-weight:700;color:var(--muted2);margin-top:4px}
.ia-tile.three{width:190px;height:150px;padding:16px 14px}
.ia-tile.three b{font-size:24px}
.ia-tile.three span{font-size:16px;line-height:1.35}
.ia-sent{position:absolute;left:60px;width:600px;height:64px;display:flex;align-items:center;gap:12px}
.ia-sent b{width:110px;font-size:22px;font-weight:800;color:var(--ink);white-space:nowrap}
.ia-bar{position:relative;flex:1;height:44px;border-radius:12px;background:rgba(255,255,255,.7);overflow:hidden}
.ia-bar i{position:absolute;left:0;top:0;height:100%;width:0;background:var(--acc1);border-radius:12px;display:flex;gap:3px;align-items:center;padding:0 8px;box-sizing:border-box}
.ia-bar i u{display:block;width:14px;height:24px;border-radius:4px;background:rgba(255,255,255,.75);flex:none}
.ia-bar em{position:absolute;right:10px;top:0;height:100%;display:flex;align-items:center;font-style:normal;font-size:18px;font-weight:800;color:var(--ink)}
.ia-quote{position:absolute;border-radius:16px;background:var(--acc2-pale);border:1px solid rgba(27,31,36,.06);padding:14px 18px;box-sizing:border-box;font-size:22px;font-weight:700;line-height:1.45;color:var(--ink)}
.ia-quote small{display:block;font-size:16px;color:var(--muted2);margin-top:6px;font-weight:700}
.ia-nest{position:absolute;left:60px;top:120px;width:600px;height:400px}
.ia-lv{position:absolute;border-radius:22px;box-sizing:border-box;border:2px solid var(--acc1);background:rgba(255,255,255,.78);opacity:0;transform-origin:50% 50%}
.ia-lv b{position:absolute;left:20px;top:16px;font-size:28px;font-weight:800;color:var(--acc1)}
.ia-lv span{position:absolute;left:20px;top:54px;font-size:18px;font-weight:700;color:var(--muted2);white-space:nowrap}
.ia-lv.gpu{border-color:var(--acc2);background:var(--acc2-pale)}
.ia-lv.gpu b{color:var(--acc2)}
.ia-kr{position:absolute;left:60px;top:545px;width:600px;border-radius:14px;background:#fff;border:1px solid rgba(27,31,36,.08);padding:12px 18px;box-sizing:border-box;font-size:21px;font-weight:700;color:var(--ink);opacity:0}
.ia-grid{position:absolute;left:60px;top:120px;width:600px;display:grid;grid-template-columns:repeat(19,1fr);gap:6px;opacity:0}
.ia-dot{aspect-ratio:1;border-radius:50%;background:rgba(27,31,36,.12);transform:scale(.6);transition:background .25s,transform .25s;position:relative}
.ia-dot.on{background:var(--acc1);transform:scale(1)}
.ia-dot.top{background:var(--acc2);transform:scale(1.25)}
.ia-dot.kr::after{content:'한국';position:absolute;left:50%;top:-30px;transform:translateX(-50%);font-size:16px;font-weight:800;color:var(--acc1);background:#fff;border:1px solid var(--acc1);border-radius:999px;padding:2px 8px;white-space:nowrap;opacity:var(--kr,0)}
.ia-leg{position:absolute;left:60px;width:600px;display:flex;gap:10px;flex-wrap:wrap}
.ia-leg span{font-size:19px;font-weight:800;padding:6px 12px;border-radius:999px;background:#fff;border:1px solid rgba(27,31,36,.08);opacity:0}
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
.ia-chk b{font-size:23px;font-weight:800;color:var(--ink);white-space:nowrap}
.ia-chk span{font-size:17px;font-weight:700;color:var(--muted2);margin-left:auto;white-space:nowrap}
.ia-hub{position:absolute;left:60px;top:390px;width:600px;height:70px;border-radius:18px;background:var(--ink-soft);color:#fff;display:grid;place-items:center;font-size:26px;font-weight:800;opacity:0;transform-origin:50% 50%}
.ia-pill{position:absolute;width:190px;height:64px;border-radius:999px;background:#fff;border:2px solid var(--acc1);box-sizing:border-box;display:grid;place-items:center;font-size:22px;font-weight:800;color:var(--acc1);opacity:0;transform-origin:50% 50%}
.ia-ringbox{position:absolute;left:60px;top:178px;width:600px;height:600px;border-radius:26px;overflow:hidden;background:#f5f5f7;box-shadow:0 28px 60px -30px rgba(27,31,36,.6);opacity:0;transform-origin:50% 50%;will-change:transform}
.ia-ringbox iframe{display:block;width:600px;height:600px;border:0;pointer-events:none}
.ia-msg{position:absolute;left:60px;top:400px;width:600px;text-align:center}
.ia-msg .k-big{position:static;display:block;font-size:46px;line-height:1.3;white-space:normal}
.ia-marq{position:absolute;overflow:hidden;border-radius:20px}
.ia-marq-in{position:absolute;left:0;top:12px;display:flex;gap:14px;will-change:transform}
.ia-mtile{flex:none;width:240px;height:240px;border-radius:18px;background:#fff;box-shadow:0 16px 36px -22px rgba(27,31,36,.55);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;box-sizing:border-box;padding:16px}
.ia-mtile small{font-size:16px;font-weight:800;color:var(--muted2);letter-spacing:.04em}
.ia-mtile b{font-size:40px;font-weight:900;letter-spacing:-.03em;color:var(--ink);text-align:center;line-height:1.1}
.ia-mtile span{font-size:18px;font-weight:700;color:var(--muted2)}
.ia-mtile.big{background:var(--ink-soft)}
.ia-mtile.big b,.ia-mtile.big small,.ia-mtile.big span{color:#fff}
.ia-mtile.big small,.ia-mtile.big span{opacity:.7}
.ia-mtile.small{border:2px solid var(--acc1)}
.ia-mtile.small small{color:var(--acc1)}
`;

export default {
  slug: 'v8-inclusive-ai',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  stageWide: { w: 1280, h: 720 },
  title: '포용적 AI란 무엇일까',
  subtitle: '빠지는 사람 없이, AI의 쓸모가 닿게',
  summary: '10월 19일부터 22일까지 서울에서 세계은행과 과기정통부가 60여 개국 장·차관을 모아 글로벌 AI·디지털 서밋을 열었어요. 첫 의제는 "디지털 포용과 접근성 확대"였죠. 포용적 AI는 AI의 쓸모가 돈 많은 나라, 영어 쓰는 사람, 큰 회사에서 멈추지 않게 하자는 말이에요. 지금 어디서 빠지는지부터 짚어요. 같은 문장이어도 언어마다 토큰 수가 달라서 요금을 더 내는 쪽이 생기고, AI를 돌리는 GPU를 둔 큰 클라우드는 2023년 조사 기준 39개국에만 있었어요. 데이터센터와 서버와 GPU가 어떻게 다른지도 같이 봐요. 그래서 세계은행이 내건 답이 "작은 AI"고요. 교실로 오면 할 일이 둘이에요. 디지털 리터러시가 부족하거나 AI 사각지대에 놓일 아이를 수업 전에 미리 찾아 챙기는 일, 그리고 처음부터 모든 아이가 쓸 수 있게 짜는 UDL(보편적 학습 설계)이에요. AI 교육을 무조건 넓히기보다 이런 포용적 AI 교육으로 가자는 게 이 편의 결론이에요.',
  keywords: ['포용적 AI', '디지털 포용', '세계은행', '글로벌 AI·디지털 서밋', '컴퓨트 사막', '작은 AI', '토큰 비용', 'AI 격차', 'UDL', '보편적 학습 설계', '디지털 리터러시', 'AI 사각지대'],

  scenes: [
    /* 1 ── 뜻부터 */
    {
      title: '뜻부터', dur: 13,
      captions: [
        { t: 0, text: '포용적 AI, 요즘 자주 듣는 말이죠.' },
        { t: 3.5, text: '포용은 빠지는 사람 없이 끼워 준다는 뜻이에요.' },
        { t: 7, text: '세계은행은 바탕을 넷으로 적었어요.' },
        { t: 10, text: '연결, 요금, 생태계, 쓸 준비예요.' }
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
        { t: 3.5, text: '그런데 같은 뜻도 언어마다 토큰 수가 다르죠.' },
        { t: 8, text: '2023년에 22개 언어로 재 본 연구가 있거든요.' },
        { t: 12, text: '많은 언어 사용자가 더 내고도 더 나쁜 답을 받아요.' }
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
    /* 3 ── 데이터센터 → 서버 → GPU, 그리고 GPU 클라우드가 있는 나라 39 */
    {
      title: 'AI는 어디서 돌까', dur: 22,
      captions: [
        { t: 0, text: 'AI는 데이터센터라는 건물 안에서 돌아요.' },
        { t: 3.5, text: '건물 안에 서버, 서버 안에 GPU라는 칩이 있죠.' },
        { t: 7.5, text: '데이터센터는 세계 곳곳에, 한국에도 많아요.' },
        { t: 11, text: '여섯 큰 클라우드 회사의 AI용 GPU 지역은 39개국.' },
        { t: 15, text: '한국도 그 안에 있고, 최신 칩은 두 나라뿐.' },
        { t: 18.5, text: '없는 나라는 바다 건너 빌려 쓰는 컴퓨트 사막.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        /* 1) 세 겹 상자: 건물 > 컴퓨터 > 칩 */
        const nest = P.h('div', { class: 'ia-nest' }); stage.append(nest);
        const LV = [['데이터센터', '서버를 많이 모아 둔 건물. 전기·냉각·통신 시설까지', 'left:0;top:0;width:600px;height:400px', ''], ['서버', 'GPU 같은 부품을 넣은 컴퓨터', 'left:34px;top:104px;width:532px;height:262px', ''], ['GPU', '계산 전담 칩. 많은 계산을 한꺼번에 잘해서 AI를 돌려요', 'left:68px;top:212px;width:464px;height:118px', 'gpu']];
        const lvs = LV.map(([b, s, st, c]) => { const el = P.h('div', { class: 'ia-lv ' + c, style: st }, P.h('b', {}, b), P.h('span', {}, s)); nest.append(el); return el; });
        const kr = P.h('div', { class: 'ia-kr' }, '데이터센터는 세계 곳곳에 있고 한국에도 많아요. AI용 GPU를 둔 곳도 있고요.'); stage.append(kr);
        /* 2) 점 190개: 여섯 클라우드 회사의 GPU 지역이 있는 나라 39, 최신 칩 2, 한국 표시 */
        const grid = P.h('div', { class: 'ia-grid' }); stage.append(grid);
        const N = 190, dots = Array.from({ length: N }, () => { const d = P.h('div', { class: 'ia-dot' }); grid.append(d); return d; });
        const pick = []; let x = 7; for (let i = 0; i < 39; i++) { x = (x * 1103515245 + 12345) % 2147483648; let k = x % N; while (pick.includes(k)) k = (k + 1) % N; pick.push(k); }
        const top = [pick[3], pick[21]], krDot = pick[30];
        dots[krDot].classList.add('kr');
        const leg = P.h('div', { class: 'ia-leg', style: 'top:500px' }, P.h('span', { style: '--c:var(--acc1)' }, 'GPU 클라우드 39개국'), P.h('span', { style: '--c:var(--acc2)' }, '최신 칩 2'), P.h('span', { style: '--c:rgba(27,31,36,.2)' }, '컴퓨트 사막')); stage.append(leg);
        const legs = [...leg.children];
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:565px;width:600px;opacity:0' }, '컴퓨트 사막에는 세계의 저소득·중저소득 나라가 전부 들어 있어요.', P.h('small', {}, 'Lehdonvirta·Wú·Hawkins 2024, AIES. 6개 클라우드 회사 187개 지역 조사(2023년 10월 기준). 한국은 5개 지역 중 4곳에 GPU')); stage.append(note);
        const pkt = P.h('div', { class: 'ia-pkt' }); stage.append(pkt);
        const path = P.arrow(lines, { x1: 120, y1: 420, x2: 560, y2: 160, curve: 90, width: 3, color: '#F2812D', dashed: true, head: false });
        const q = quokka(stage, P, 'oops'); const tr = track(stage, P, STEPS, [2]);
        return {
          tick(t) {
            q.tick(t, t < 21); tr.at(t);
            lvs.forEach((el, i) => { const c = SP(seg(t, .3 + i * 1.7, 1 + i * 1.7)); const out = 1 - seg(t, 10.2, 10.8); el.style.opacity = c > 0 ? out : 0; el.style.transform = `scale(${c})`; });
            kr.style.opacity = EO(seg(t, 7.6, 8.2)) * (1 - seg(t, 10.2, 10.8));
            grid.style.opacity = seg(t, 10.8, 11.3);
            dots.forEach((d, i) => { const k = pick.indexOf(i); const on = k >= 0 && t > 11.2 + k * .09; d.classList.toggle('on', on && !top.includes(i)); d.classList.toggle('top', top.includes(i) && t > 16.2); });
            dots[krDot].style.setProperty('--kr', seg(t, 15.2, 15.6));
            legs.forEach((l, i) => { l.style.opacity = seg(t, [11.4, 16.3, 18.6][i], [11.9, 16.8, 19.1][i]); });
            note.style.opacity = EO(seg(t, 18.8, 19.4));
            /* 사막의 점에서 GPU 지역으로 갔다 돌아오는 요청 */
            const u = (t - 18.9) % 2.6, p = u < 1.1 ? SM(u / 1.1) : u < 1.3 ? 1 : 1 - SM((u - 1.3) / 1.1);
            path.draw(seg(t, 18.7, 19.3));
            const P0 = [120, 420], P2 = [560, 160];
            const px = (1 - p) * (1 - p) * P0[0] + 2 * (1 - p) * p * (420) + p * p * P2[0], py = (1 - p) * (1 - p) * P0[1] + 2 * (1 - p) * p * (180) + p * p * P2[1];
            pkt.style.opacity = t > 18.9 ? 1 : 0; pkt.style.transform = `translate(${px - 9}px, ${py - 9}px)`;
          }
        };
      }
    },
    /* 4 ── 작은 AI */
    {
      title: '작은 AI', dur: 15,
      captions: [
        { t: 0, text: '그래서 세계은행은 작은 AI를 내걸었어요.' },
        { t: 4, text: '가장 큰 모델보다 일상 문제를 푸는 도구죠.' },
        { t: 8, text: '농부, 교사, 작은 가게가 바로 쓰는 AI요.' },
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
        { t: 0, text: '10월 19일부터 22일까지 서울 그랜드하얏트예요.' },
        { t: 3.5, text: '세계은행이 미국 밖에서 처음 연 AI 서밋이죠.' },
        { t: 7, text: '첫 의제로 디지털 포용과 접근성 확대를 올렸어요.' },
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
    /* 6 ── 교실: AI 사각지대부터 미리 챙기기 */
    {
      title: 'AI 사각지대부터', dur: 17,
      captions: [
        { t: 0, text: '포용적 AI는 교실에도 그대로 적용돼요.' },
        { t: 3.5, text: 'AI 수업에서 빠질 아이를 미리 찾는 거죠.' },
        { t: 7, text: '기기, 언어, 신체, 그리고 디지털 리터러시.' },
        { t: 10.5, text: '검색과 AI 답 구분이 서툰 아이도 사각지대예요.' },
        { t: 14, text: '수업 전에 이 아이들부터 챙기는 게 먼저예요.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:120px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, '우리 반 AI 사각지대 넷');
        const ITEMS = [['기기가 없는 아이', '학교 기기·오프라인 활동'], ['한국어가 서툰 아이', '모국어로 묻게 하기'], ['눈·손이 불편한 아이', '음성 입력·읽어 주기'], ['디지털 리터러시가 약한 아이', '답을 함께 확인하기']];
        const chks = ITEMS.map(([b, s], i) => { const el = P.h('div', { class: 'ia-chk', style: `top:${196 + i * 96}px` }, P.h('i'), P.h('b', {}, b), P.h('span', {}, s)); stage.append(el); return el; });
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:600px;width:600px;opacity:0' }, 'AI 사각지대에 놓일 아이를 수업 전에 미리 찾아 챙기는 것, 그게 교실 포용적 AI의 첫걸음이에요.'); stage.append(note);
        const q = quokka(stage, P, 'think'); const tr = track(stage, P, STEPS, [5]);
        return {
          tick(t) {
            q.tick(t, t < 16); tr.at(t); rh.at(t, .2);
            chks.forEach((el, i) => { const c = EXPO(seg(t, 3.6 + i * .5, 4.3 + i * .5)); el.style.opacity = c; el.style.transform = `translateX(${(1 - c) * -40}px)`; el.classList.toggle('done', t > 7.2 + i * .9); });
            note.style.opacity = EO(seg(t, 14.2, 14.8));
          }
        };
      }
    },
    /* 7 ── UDL: 처음부터 모든 아이가 쓰게 */
    {
      title: '모두를 위한 설계, UDL', dur: 17,
      captions: [
        { t: 0, text: '그다음은 설계예요. UDL, 보편적 학습 설계.' },
        { t: 3.8, text: '처음부터 모든 아이가 쓸 수 있게 짜는 틀이에요.' },
        { t: 7.6, text: '참여, 표상, 행동과 표현, 세 갈래로 길을 여럿 둬요.' },
        { t: 12, text: 'AI 활동도 글, 음성, 그림 어느 길로든 되게요.' }
      ],
      build({ stage: st0, lines, P, tl }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:120px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, 'UDL, 보편적 학습 설계');
        const TILES = [['참여', '관심을 끄는 길을 여럿'], ['표상', '보여 주는 길을 여럿'], ['행동·표현', '답하는 길을 여럿']];
        const tiles = TILES.map(([b, s], i) => { const el = P.h('div', { class: 'ia-tile three', style: `left:${60 + i * 205}px;top:200px` }, P.h('b', {}, b), P.h('span', {}, s)); stage.append(el); return el; });
        const hub = P.h('div', { class: 'ia-hub' }, 'AI 활동 하나'); stage.append(hub);
        const WAYS = ['글로', '음성으로', '그림으로'];
        const pills = WAYS.map((w, i) => { const el = P.h('div', { class: 'ia-pill', style: `left:${60 + i * 205}px;top:540px` }, w); stage.append(el); return el; });
        const arrows = WAYS.map((w, i) => P.arrow(lines, { x1: 360, y1: 460, x2: 155 + i * 205, y2: 540, width: 3, color: '#F2812D', head: true }));
        const src = P.h('div', { class: 'k-big', style: 'left:60px;top:624px;width:600px;font-size:18px;color:var(--muted2)' }, 'CAST, UDL 가이드라인 3.0 (2024)'); stage.append(src); src.style.opacity = 0;
        const note = P.h('div', { class: 'ia-quote', style: 'left:60px;top:665px;width:600px;opacity:0' }, '처음부터 길을 여럿 두면 따로 예외를 만들 일이 줄어요. AI 도구는 그 길을 늘리기에 좋고요.'); stage.append(note);
        const q = quokka(stage, P, 'point'); const tr = track(stage, P, STEPS, [6]);
        return {
          tick(t) {
            q.tick(t, t < 16); tr.at(t); rh.at(t, .2);
            tiles.forEach((el, i) => { const c = SP(seg(t, 7.8 + i * .5, 8.4 + i * .5)); el.style.opacity = c > 0 ? 1 : 0; el.style.transform = `scale(${c})`; });
            const hc = SP(seg(t, 4, 4.6)); hub.style.opacity = hc > 0 ? 1 : 0; hub.style.transform = `scale(${hc})`;
            arrows.forEach((a, i) => a.draw(seg(t, 12.2 + i * .4, 12.8 + i * .4)));
            pills.forEach((el, i) => { const c = SP(seg(t, 12.7 + i * .4, 13.3 + i * .4)); el.style.opacity = c > 0 ? 1 : 0; el.style.transform = `scale(${c})`; });
            src.style.opacity = seg(t, 9.6, 10.1);
            note.style.opacity = EO(seg(t, 14.2, 14.8));
          }
        };
      }
    },
    /* 8 ── 오늘의 정리: 탭 넘기기 + 쿼카 옆 모션 + 마무리 메시지 */
    {
      title: '오늘의 정리', dur: 19,
      captions: [
        { t: 0, text: '오늘 나온 말을 정리해 볼게요.' },
        { t: 1.6, text: '포용적 AI는 빠지는 사람 없이 쓸모가 닿게요.' },
        { t: 5.2, text: '컴퓨트 사막은 AI용 GPU 클라우드가 없는 나라.' },
        { t: 8.8, text: '작은 AI는 일상 문제를 푸는 실용적 도구예요.' },
        { t: 12.4, text: 'UDL은 처음부터 모두가 쓰게 짜는 수업 설계예요.' },
        { t: 15.4, text: 'AI 교육을 무조건 넓히기보다 포용적 AI 교육으로.' }
      ],
      build({ stage: st0, lines, P, tl, base }) {
        const stage = frame(st0, P, CSS);
        const head = P.h('div', { class: 'k-big', style: 'left:60px;top:112px;width:600px;font-size:34px;text-align:left' }); stage.append(head);
        const rh = riser(P, head, '오늘의 AI 개념극장 · 용어 넷');
        const box = P.h('div', { class: 'ia-ringbox' }, P.h('iframe', { src: `${base || ''}assets/motions/browser-tabs-e77.html`, title: '용어 정리', tabindex: '-1' })); stage.append(box);
        const msg = P.h('div', { class: 'ia-msg' }); stage.append(msg);
        const m1 = P.h('div', { class: 'k-big', style: 'color:var(--muted2)' }); msg.append(m1); const rm1 = riser(P, m1, 'AI 교육을 무조건 넓히기보다');
        const m2 = P.h('div', { class: 'k-big', style: 'color:var(--acc1)' }); msg.append(m2); const rm2 = riser(P, m2, '포용적 AI 교육으로');
        const q = quokka(stage, P, 'wave');
        const root = stage.__root || stage, wide = !!stage.__root, MW = wide ? 360 : 330;
        const marq = P.h('div', { class: 'ia-marq', style: wide ? 'left:640px;top:96px;width:360px;height:290px' : 'left:60px;top:842px;width:330px;height:270px' });
        const CARDS = [['큰 모델', 'ChatGPT', 'OpenAI', 'big'], ['큰 모델', 'Claude', 'Anthropic', 'big'], ['큰 모델', 'Gemini', 'Google', 'big'], ['작은 AI', '작물 알림', '농부의 밭', 'small'], ['작은 AI', '진료 기록', '동네 진료소', 'small'], ['작은 AI', '교실 보조', '우리 반', 'small'], ['UDL', '글·음성·그림', '길을 여럿', 'small']];
        const inner = P.h('div', { class: 'ia-marq-in' }, ...CARDS.map(([k, n, w, c]) => P.h('div', { class: `ia-mtile ${c}` }, P.h('small', {}, k), P.h('b', {}, n), P.h('span', {}, w))));
        marq.append(inner); root.append(marq);
        return {
          tick(t) {
            q.tick(t, t < 18); rh.at(t, .2);
            const come = SP(seg(t, .6, 1.2)), gone = seg(t, 15, 15.5); box.style.opacity = come > 0 ? 1 - .9 * gone : 0; box.style.transform = `translateY(${(1 - come) * 50}px) scale(${.9 + .1 * come - .06 * gone})`;
            rm1.at(t, 15.3); rm2.at(t, 15.9);
            inner.style.transform = `translateX(${MW - Math.max(0, t - .4) * 100}px)`;
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 반 포용 점검표',
    desc: '학급 상황을 다섯 칸으로 적으면 지금 AI 수업에서 빠질 수 있는 아이가 몇 명인지, 어떤 길을 먼저 열어 두면 되는지 나와요. 숫자는 선생님이 넣는 값이고 저장되지 않아요.',
    mount(el, P) {
      const Q = [['집에 쓸 기기가 없는 아이', '학교 기기 대여, 오프라인으로 같은 활동 준비'], ['한국어가 서툰 아이', '모국어로 질문하고 한국어로 답 받기, 번역 짝꿍'], ['눈·손이 불편한 아이', '음성 입력, 화면 읽어 주기, 큰 글자 설정'], ['디지털 리터러시가 부족한 아이', 'AI 답을 교과서·검색과 맞춰 보는 짝 활동, 질문 쓰기 연습'], ['AI 쓰기를 집에서 반대하는 아이', '학교 계정만 쓰기, 가정 안내문']];
      const inputs = Q.map(([k]) => P.h('input', { type: 'number', min: '0', max: '40', value: '0', class: 'sim-ia-num', 'aria-label': k }));
      const out = P.h('div', { class: 'sim-ia-out' });
      const bSample = P.h('button', { class: 'btn primary', type: 'button' }, '보기 값 넣기'), bClear = P.h('button', { class: 'btn', type: 'button' }, '비우기');
      const draw = () => {
        const rows = Q.map(([k, v], i) => ({ k, v, n: Math.max(0, parseInt(inputs[i].value) || 0) })).filter(r => r.n > 0);
        const total = rows.reduce((a, r) => a + r.n, 0);
        out.innerHTML = total === 0 ? '<p>숫자를 넣으면 빠질 수 있는 아이와 먼저 열어 둘 길이 나와요.</p>' : `<p><b>${total}명</b>이 지금 수업 설계에서 빠질 수 있어요. UDL로 길을 여럿 두면 이 숫자가 줄어요.</p>` + rows.map(r => `<p>· ${r.k} ${r.n}명 → ${r.v}</p>`).join('');
      };
      el.append(P.h('style', {}, `
        .sim-ia-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:14px;font-weight:700;color:#4E5968}
        .sim-ia-num{width:72px;height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:700}
        .sim-ia-out{margin-top:12px;background:#F2F4F6;border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.6}
        .sim-ia-out p{margin:0 0 4px}
        .sim-ia-out b{color:#127E90}
      `), ...Q.map(([k], i) => P.h('div', { class: 'sim-ia-row' }, inputs[i], P.h('span', {}, k))), P.h('div', { class: 'sim-ia-row' }, bSample, bClear), out);
      inputs.forEach(i => i.addEventListener('input', draw));
      bSample.addEventListener('click', () => { [2, 1, 1, 2, 0].forEach((v, i) => { inputs[i].value = String(v); }); draw(); });
      bClear.addEventListener('click', () => { inputs.forEach(i => { i.value = '0'; }); draw(); });
      draw();
    }
  },

  teacherLines: [
    '포용적 AI는 <b>빠지는 사람 없이</b> AI의 쓸모가 닿게 하자는 말이에요. 세계은행은 그 바탕을 연결, 요금, 생태계, 준비 넷으로 적었어요.',
    'AI는 데이터센터 건물 안의 서버, 그 안의 GPU라는 칩에서 돌아요. 여섯 큰 클라우드 회사의 AI용 GPU 지역은 2023년 조사로 <b>39개국</b>에 있었고 한국도 그 안이에요.',
    '교실에서는 디지털 리터러시가 부족하거나 AI 사각지대에 놓일 아이를 미리 찾아 챙기고, <b>UDL</b>로 처음부터 길을 여럿 두는 게 포용적 AI 교육이에요.'
  ],
  tip: {
    body: '포용적 AI를 수업에 들일 때는 숫자 하나로 시작하면 쉬워요. "우리 반에서 이 활동에 빠질 수 있는 아이가 몇 명일까." 기기, 언어, 신체, 디지털 리터러시 네 칸만 세어도 활동 설계가 달라져요. 그다음 UDL의 세 원리(참여, 표상, 행동과 표현)로 활동마다 길을 두 개 이상 두면 돼요.',
    extra: '데이터센터, 서버, GPU는 학생들이 자주 섞어 쓰는 말이에요. 건물, 컴퓨터, 칩 순서로 그려 주면 금방 정리돼요. 39개국이라는 숫자는 세계의 데이터센터 수가 아니라 여섯 큰 클라우드 회사의 AI용 GPU 지역이 있는 나라 수예요. 2023년 10월 기준 조사라는 점도 꼭 같이 말해 주세요.'
  },
  myth: {
    myth: 'AI는 인터넷만 되면 누구나 똑같이 쓸 수 있다.',
    fact: '같은 문장도 언어마다 토큰 수가 다르니 요금도 달라요. 여섯 큰 클라우드 회사의 AI용 GPU 지역은 2023년 조사 기준 39개국에만 있었고 저소득 나라는 전부 그 밖이에요. 교실에서도 기기, 언어, 신체, 디지털 리터러시 때문에 빠지는 아이가 생겨요. 그래서 수업 전에 사각지대를 찾고 UDL로 길을 여럿 두는 거예요.'
  },
  sources: [
    { title: 'World Bank, Global AI & Digital Summit 2026 (Seoul, Oct 19–22)', url: 'https://www.worldbank.org/en/events/2026/10/19/global-ai-and-digital-summit-2026', note: '행사 소개문. 포용적 AI의 바탕을 "digital access, affordability, ecosystems and AI readiness"로 적음. 10.20 "Small AI. Big Impact" 세션 소개(live.worldbank.org)에 "not from the largest models, but from practical tools designed to solve everyday challenges".' },
    { title: '과기정통부 보도자료 기반 기사(디지털투데이·MTN, 2026.10.19)', url: 'https://www.digitaltoday.co.kr/news/articleView.html?idxno=708002', note: '일정·장소·60여 개국·공동의장·3대 의제·배경훈 부총리 발언. 과기정통부 누리집은 점검 중이라 원문 링크 대신 보도자료 인용 기사.' },
    { title: 'Lehdonvirta, Wú & Hawkins (2024). Compute North vs. Compute South. AIES 2024', url: 'https://ojs.aaai.org/index.php/AIES/article/view/31683', note: '6개 클라우드 회사(아마존·마이크로소프트·구글·알리바바·화웨이·텐센트) 187개 지역 조사(2023.10 기준). GPU 지역이 있는 나라 39개국(한국 포함, 5개 지역 중 4곳), H100 지역 9곳(미국 8·네덜란드 1). 컴퓨트 사막 정의.' },
    { title: 'Ahia et al. (2023). Do All Languages Cost the Same? arXiv:2305.13707', url: 'https://arxiv.org/abs/2305.13707', note: '22개 언어로 OpenAI API 비용·성능 분석. "overcharged while obtaining poorer results".' },
    { title: 'CAST (2024). Universal Design for Learning Guidelines 3.0', url: 'https://udlguidelines.cast.org/', note: '세 원리: Engagement(참여), Representation(표상), Action & Expression(행동과 표현). 2024년 3.0판.' }
  ],
  script: `포용적 AI, 요즘 자주 들리는 말이죠. 포용은 빠지는 사람 없이 끼워 준다는 뜻이에요. AI의 쓸모가 돈 많은 나라, 영어 쓰는 사람, 큰 회사에서 멈추지 않게 하자는 거죠. 세계은행은 그 바탕을 넷으로 적었어요. 연결할 수 있는가, 쓸 만한 값인가, 곁에 쓸 판이 있는가, 사람과 제도가 준비됐는가.

지금 어디서 빠지는지 하나씩 볼게요. 먼저 요금부터요. AI 회사는 토큰 수로 돈을 받는데 같은 뜻의 문장도 언어마다 토큰 수가 달라요. 2023년에 22개 언어로 재 본 연구는 지원 언어 가운데 상당수에서 화자가 더 내고도 더 나쁜 답을 받는다고 적었어요.

다음은 AI가 도는 자리예요. AI는 데이터센터라는 건물 안에서 돌아요. 건물 안에는 서버라는 컴퓨터가 잔뜩 있고, 서버 안에 GPU라는 칩이 들어 있어요. GPU는 많은 계산을 한꺼번에 잘하는 칩이라 AI를 돌리는 데 써요. 데이터센터 자체는 세계 곳곳에 있고 한국에도 많아요. 그런데 여섯 큰 클라우드 회사의 AI용 GPU 지역을 2023년 10월 기준으로 세어 보니 39개국에만 있었어요. 한국도 그 안에 있고, 최신 칩이 있는 나라는 미국과 네덜란드 둘뿐이었죠. GPU 클라우드가 없는 나라는 바다 건너에서 빌려 써요. 연구자들은 이쪽을 컴퓨트 사막이라고 불렀고 저소득 나라는 전부 여기 들어 있어요. 그래서 나온 답이 작은 AI예요. 세계은행은 가장 큰 모델보다 일상 문제를 푸는 실용적 도구에서 답이 온다고 썼어요. 농부, 교사, 작은 가게가 바로 쓰는 AI요.

이 이야기를 하러 10월 19일부터 22일까지 60여 개국 장·차관이 서울에 모였어요. 세계은행이 미국 밖에서 처음 연 AI 서밋이고 첫 의제로 디지털 포용과 접근성 확대를 올렸죠. 배경훈 부총리는 책임 있는 AI 활용으로 그 혜택이 인류 전체에 고루 돌아가게 국제사회와 협력하겠다고 했어요.

교실로 돌아올게요. 포용적 AI는 교실에도 그대로 적용돼요. 할 일은 둘이에요. 하나는 AI 수업에서 빠질 아이를 수업 전에 미리 찾는 거예요. 기기가 없는 아이, 한국어가 서툰 아이, 눈이나 손이 불편한 아이, 그리고 디지털 리터러시가 약해서 검색 결과와 AI 답을 구분하지 못하는 아이요. 이 아이들이 AI 사각지대에 놓이기 전에 먼저 챙기는 게 순서예요. 다른 하나는 설계예요. UDL, 보편적 학습 설계는 처음부터 모든 아이가 쓸 수 있게 수업을 짜는 틀이에요. 참여, 표상, 행동과 표현 세 갈래로 길을 여럿 두는 거죠. AI 활동도 글로, 음성으로, 그림으로 어느 길로든 할 수 있게요. AI 교육을 무조건 넓히기보다 이런 포용적 AI 교육으로 가는 게 이 편의 결론이에요.`
};
