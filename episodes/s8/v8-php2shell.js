/* S8-78 AI가 버그를 찾으면 무슨 일이 생길까: 세로 무대(720×1280) + 가로 전용 배치(1280×720), 8장면 122초
   모션은 쿼카 모션랩에서 뽑은 파일(assets/motions/e78-*.html, 포인트 #2563EB)을 iframe으로 얹어요. 자체 모션 코드 없음.
   가로 무대는 kit.frame의 축소 틀을 쓰지 않고 장면마다 가로 좌표로 따로 놓아요(왼쪽 모션 상자 560, 오른쪽 설명·길잡이·쿼카).
   1차 출처: CISA 경보(10.21), Wiz 블로그(발견 경위·일정), Amazon 위협정보(공개 전 시도·AI와 공격 비용), 대한민국 정책브리핑(10.22 주의 격상·권고), CNBC(각국 사이트 중단·AI 속도 인용) */
import { clamp, seg, EO, SM, EXPO, INTO, SP, typer, riser, odo, KIT_CSS, track } from './kit.js';

const STEPS = [['휴업', '10.29 ~ 1.31'], ['발견', 'AI가 8월 19일에'], ['PHP', '페이지 만드는 언어'], ['원리', '메모리 뒷정리 실패'], ['속도', '45분, 수만 건'], ['결정', '못 고치면 끄기'], ['할 일', '다섯 가지']];
const CSS = `
.k-track{gap:6px}
.k-step{height:42px}
.ps-box{position:absolute;left:90px;top:160px;width:540px;height:540px;border-radius:26px;overflow:hidden;background:#f5f5f7;box-shadow:0 28px 60px -30px rgba(27,31,36,.6);opacity:0;transform-origin:50% 50%;will-change:transform}
.ps-box iframe{display:block;width:540px;height:540px;border:0;pointer-events:none}
.ps-box.big{left:60px;top:178px;width:600px;height:600px}
.ps-box.big iframe{width:600px;height:600px}
.ps-box.w{left:60px;top:112px;width:560px;height:560px}
.ps-box.w iframe{width:560px;height:560px}
.ps-box.shot{background:#fff;border:1px solid rgba(27,31,36,.08)}
.ps-note{position:absolute;left:60px;top:712px;width:600px;max-height:120px;border-radius:16px;background:var(--acc2-pale);border:1px solid rgba(27,31,36,.06);padding:11px 16px;box-sizing:border-box;font-size:20px;font-weight:700;line-height:1.38;color:var(--ink);opacity:0;overflow:hidden}
.ps-note.w{left:660px;top:112px;width:560px;max-height:124px}
.ps-note small{display:block;font-size:14px;color:var(--muted2);margin-top:4px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ps-head{position:absolute;left:60px;top:112px;width:600px;font-size:34px;font-weight:800;line-height:1.2;color:var(--ink);letter-spacing:-.02em;white-space:nowrap}
.ps-head.w{top:70px;width:1160px}
.ia-marq{position:absolute;overflow:hidden;border-radius:20px}
.ia-marq-in{position:absolute;left:0;top:12px;display:flex;gap:14px;will-change:transform}
.ia-mtile{flex:none;width:240px;height:240px;border-radius:18px;background:#fff;box-shadow:0 16px 36px -22px rgba(27,31,36,.55);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;box-sizing:border-box;padding:16px}
.ia-mtile small{font-size:16px;font-weight:800;color:var(--muted2);letter-spacing:.04em}
.ia-mtile b{font-size:34px;font-weight:900;letter-spacing:-.03em;color:var(--ink);text-align:center;line-height:1.1}
.ia-mtile span{font-size:18px;font-weight:700;color:var(--muted2)}
.ia-mtile.big{background:var(--ink-soft)}
.ia-mtile.big b,.ia-mtile.big small,.ia-mtile.big span{color:#fff}
.ia-mtile.big small,.ia-mtile.big span{opacity:.7}
.ia-mtile.small{border:2px solid var(--acc1)}
.ia-mtile.small small{color:var(--acc1)}
`;

/* 무대 준비: 세로는 그대로, 가로는 축소 틀 없이 가로 좌표로 */
function setup(st, P) { st.append(P.h('style', {}, KIT_CSS + CSS)); return { stage: st, wide: parseInt(st.style.width) > parseInt(st.style.height) }; }
function head(S, P, text) { const el = P.h('div', { class: 'ps-head' + (S.wide ? ' w' : '') }); S.stage.append(el); return riser(P, el, text); }
function motionBox(S, P, base, id, big) {
  const box = P.h('div', { class: 'ps-box' + (S.wide ? ' w' : big ? ' big' : '') }, P.h('iframe', { src: `${base || ''}assets/motions/e78-${id}.html`, title: id, tabindex: '-1' })); S.stage.append(box);
  return { el: box, at(t, T0 = .4) { const c = SP(seg(t, T0, T0 + .6)); box.style.opacity = c > 0 ? 1 : 0; box.style.transform = `translateY(${(1 - c) * 50}px) scale(${.9 + .1 * c})`; } };
}
/* 캡처 이미지 상자: 들어온 뒤 T1까지 천천히 내려가며 살짝 확대, OUT에 사라짐 */
function shotBox(S, P, base, name, big) {
  const img = P.h('img', { src: `${base || ''}assets/shots/${name}.webp`, alt: name, style: 'position:absolute;left:0;top:0;width:100%;transform-origin:50% 0;will-change:transform' });
  const box = P.h('div', { class: 'ps-box shot' + (S.wide ? ' w' : big ? ' big' : '') }, img); S.stage.append(box);
  return { el: box, img, at(t, T0 = .4, T1 = 99, OUT = 99) { const c = SP(seg(t, T0, T0 + .6)), o = 1 - seg(t, OUT, OUT + .5); box.style.opacity = c > 0 ? o : 0; box.style.transform = `translateY(${(1 - c) * 50}px) scale(${.9 + .1 * c})`; const p = seg(t, T0, T1); img.style.transform = `translateY(${-p * 24}%) scale(${1 + .05 * p})`; } };
}
function note(S, P, text, small) {
  const el = P.h('div', { class: 'ps-note' + (S.wide ? ' w' : '') }, text, small ? P.h('small', {}, small) : ''); S.stage.append(el);
  return { el, at(t, T0) { const c = EO(seg(t, T0, T0 + .6)); el.style.opacity = c; el.style.transform = `translateY(${(1 - c) * 16}px)`; } };
}
function quokka(S, P, pose) { const q = P.quokka(S.wide ? { x: 960, y: 340, size: 300, pose } : { x: 410, y: 820, size: 300, pose }); S.stage.append(q.el); return q; }
function steps(S, P, lit) { const tr = track(S.stage, P, STEPS, lit); if (S.wide) { tr.el.style.left = '660px'; tr.el.style.top = '250px'; } return tr; }

export default {
  slug: 'v8-php2shell',
  track: 'S8',
  stage: { w: 720, h: 1280 },
  stageWide: { w: 1280, h: 720 },
  title: 'AI가 버그를 찾으면 무슨 일이 생길까',
  subtitle: '지식샘터가 석 달 문을 닫은 이유',
  summary: '10월 29일부터 1월 31일까지 석 달 동안 지식샘터가 서비스를 전면 중단해요. 이유는 웹페이지를 만드는 언어 PHP에서 나온 치명 등급 취약점 두 건이에요. 이 취약점을 찾은 건 사람이 아니고 AI였어요. 보안회사 Wiz가 Gemini 4 Argon과 GPT-5.6 Sol로 8월 19일에 찾았고, 10월 21일에 패치가 나왔죠. 그런데 같은 AI가 공격 쪽에서도 일해요. 패치 내용을 읽고 몇 시간 안에 공격 코드를 만들어서, 공개 45분 만에 수만 건, 다음 날 수백만 건의 공격 시도가 들어왔어요. 고칠 시간이 몇 주에서 몇 시간으로 줄자 미국 CISA와 NSA는 바로 못 고치면 서버를 끄라고 했고, 유럽 정부 사이트들과 지식샘터가 그 길을 택했어요. 이 편은 PHP가 뭔지, 취약점이 어떻게 뚫리는지, AI가 보안의 시간을 어떻게 바꿨는지, 그리고 선생님이 할 일 다섯 가지를 2분에 담았어요.',
  keywords: ['PHP2Shell', 'PHP', '취약점', '패치', 'AI 버그 헌팅', '사이버위기 경보', '지식샘터', 'CISA', 'Wiz', 'Patch the Planet', '보안 업데이트', 'AI 보안'],

  scenes: [
    /* 1 ── 훅: 지식샘터 공지 */
    {
      title: '지식샘터, 석 달 휴업?', dur: 13,
      captions: [
        { t: 0, text: '선생님, 지식샘터가 석 달 동안 문을 닫아요.' },
        { t: 3.5, text: '10월 29일부터 1월 31일까지, 연수가 전부 멈춰요.' },
        { t: 7, text: '이유는 PHP라는 언어의 보안 취약점이래요.' },
        { t: 10, text: '그런데 이걸 찾아낸 게 AI예요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '지식샘터, 석 달 휴업?');
        const box = shotBox(S, P, base, 'e78-notice');
        const n = note(S, P, '전환 기간(\'26.10.29 ~ \'27.1) 동안 서비스를 전면 중단하여 세계적인 보안 권고 수준에 맞추기로 긴급 결정', '지식샘터 공지, educator.edunet.net (2026.11.1 캡처)');
        const q = quokka(S, P, 'oops'); const tr = steps(S, P, [0]);
        return { tick(t) { q.tick(t, t < 12); tr.at(t, .3); rh.at(t, .2); box.at(t, .5, 13); n.at(t, 6.8); } };
      }
    },
    /* 2 ── 누가 찾았나 */
    {
      title: '찾은 건 AI', dur: 15,
      captions: [
        { t: 0, text: '8월 19일, 보안회사 Wiz가 PHP에서 취약점을 찾았어요.' },
        { t: 4, text: '찾은 도구는 Gemini 4 Argon과 GPT-5.6 Sol이에요.' },
        { t: 8, text: '사람이 여러 해 못 본 걸 AI가 일주일 만에 봤죠.' },
        { t: 11.5, text: '8월 24일 신고, 10월 21일에 패치가 나왔어요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '취약점을 찾은 건 AI');
        const box = motionBox(S, P, base, 'timeline');
        const n = note(S, P, '연구자 한 명이 일주일 만에, 예전 같으면 세계급 팀이 몇 달 걸릴 일을 해냈어요.', 'Wiz 블로그 2026.10.21 · Calif도 GPT-5.6 Sol로 따로 찾음(OpenAI)');
        const q = quokka(S, P, 'point'); const tr = steps(S, P, [1]);
        return { tick(t) { q.tick(t, t < 14); tr.at(t); rh.at(t, .2); box.at(t, .4); n.at(t, 8.2); } };
      }
    },
    /* 3 ── PHP가 뭔데 */
    {
      title: 'PHP가 뭐냐면', dur: 15,
      captions: [
        { t: 0, text: 'PHP가 뭐냐고요? 웹페이지를 만드는 언어예요.' },
        { t: 3.5, text: '선생님이 로그인하면 서버가 페이지를 그때 조립하죠.' },
        { t: 7.5, text: '그 조립을 PHP가 해요. 전 세계 사이트 대부분이요.' },
        { t: 11, text: '언어 자체가 뚫리면 사이트 전부가 흔들려요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, 'PHP: 서버에서 페이지를 조립하는 언어');
        const box = motionBox(S, P, base, 'form-fill');
        const n = note(S, P, 'Wiz 기준 전 세계 웹사이트의 70%가 PHP로 돌아가요. 워드프레스도 PHP예요.', '1995년생 언어 · 취약점은 5.4~8.5.11 전 버전');
        const q = quokka(S, P, 'think'); const tr = steps(S, P, [2]);
        return { tick(t) { q.tick(t, t < 14); tr.at(t); rh.at(t, .2); box.at(t, .4); n.at(t, 7.7); } };
      }
    },
    /* 4 ── 원리 */
    {
      title: '어떻게 뚫리나', dur: 17,
      captions: [
        { t: 0, text: '요청 하나로 서버 메모리를 일부러 모자라게 해요.' },
        { t: 4, text: '그러면 PHP가 뒷정리를 제대로 못 해요.' },
        { t: 7.5, text: '다음 요청이 앞 손님의 메모리를 그대로 읽죠.' },
        { t: 11, text: '거기서 비밀번호도 보고, 명령도 내려요.' },
        { t: 14, text: '로그인 없이요. 그래서 9.2점 치명 등급이에요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, 'PHP2Shell: 메모리 뒷정리가 꼬이면');
        const box = motionBox(S, P, base, 'flow-chart');
        const n = note(S, P, 'CVE-2026-109618 · 109619. 메모리 부족 뒤 정리가 안 돼 다음 요청이 남의 메모리를 읽고 코드를 실행해요.', 'CISA 경보 2026.10.21 · CVSS 9.2 치명');
        const q = quokka(S, P, 'oops'); const tr = steps(S, P, [3]);
        return { tick(t) { q.tick(t, t < 16); tr.at(t); rh.at(t, .2); box.at(t, .4); n.at(t, 11.2); } };
      }
    },
    /* 5 ── 공격 쪽도 AI */
    {
      title: '공격도 AI, 몇 시간이면', dur: 15,
      captions: [
        { t: 0, text: '패치가 나오면 공격자도 그걸 읽어요.' },
        { t: 3, text: 'AI가 패치 내용을 공격 코드로 바꿔 주거든요.' },
        { t: 6.5, text: '공개 45분 만에 수만 건, 다음 날 수백만 건.' },
        { t: 10, text: '예전엔 몇 주, 이젠 몇 시간이에요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '공격 쪽도 AI를 써요');
        const box = motionBox(S, P, base, 'big-stat');
        const n = note(S, P, 'AI 분석 덕에 패치 차이점이나 권고문을 작동하는 공격 코드로 바꾸는 비용이 싸졌어요.', 'Amazon 위협정보 2026.10 · 공개 4일 전 10.17에 첫 시도');
        const q = quokka(S, P, 'oops'); const tr = steps(S, P, [4]);
        return { tick(t) { q.tick(t, t < 14); tr.at(t); rh.at(t, .2); box.at(t, .4); n.at(t, 3.2); } };
      }
    },
    /* 6 ── 그래서 끈다 */
    {
      title: '못 고치면 끄기', dur: 16,
      captions: [
        { t: 0, text: '그래서 각국이 말했어요. 못 고치면 끄라고.' },
        { t: 3.5, text: '핀란드, 독일, 프랑스가 정부 사이트를 내렸어요.' },
        { t: 7, text: '일본은 총리가 SNS로 긴급 업데이트를 부탁했고요.' },
        { t: 10.5, text: '한국은 10월 22일 경보를 주의로 올렸어요.' },
        { t: 13, text: '지식샘터는 석 달 동안 문을 닫기로 했죠.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '고칠 시간이 없으면 끈다');
        const box = motionBox(S, P, base, 'pull-quote');
        const jp = shotBox(S, P, base, 'e78-japan'); jp.el.style.zIndex = 2;
        const n = note(S, P, '일본 다카이치 총리가 SNS에 "대단히 긴급한 부탁"이라며 PHP 업데이트를 요청했어요. 10.22 한국 민간 경보 주의, 10.29 지식샘터 중단.', '위키트리 2026.10.22 · 대한민국 정책브리핑 2026.10.22');
        const q = quokka(S, P, 'point'); const tr = steps(S, P, [5]);
        return { tick(t) { q.tick(t, t < 15); tr.at(t); rh.at(t, .2); box.at(t, .4); jp.at(t, 7, 10, 12.6); n.at(t, 7.2); } };
      }
    },
    /* 7 ── 선생님이 할 일 */
    {
      title: '할 일 다섯 가지', dur: 15,
      captions: [
        { t: 0, text: '우리가 할 일은 다섯 가지예요.' },
        { t: 3, text: '학교 홈페이지 담당자에게 PHP 버전을 물어보세요.' },
        { t: 6.5, text: '워드프레스 블로그면 호스팅 패치 공지를 확인하고요.' },
        { t: 10, text: '출처 모르는 공격 코드 파일은 열지 마세요.' },
        { t: 12.5, text: '연수 일정은 지금 옮기고, 기기 업데이트는 미루지 않기.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '선생님이 할 일 다섯 가지');
        const box = motionBox(S, P, base, 'tag-checklist');
        const n = note(S, P, '공격 코드라며 도는 파일에 악성코드가 섞인 사례가 있어요. 호스팅 사이트는 호스팅사에 패치 여부를 물으면 돼요.', '대한민국 정책브리핑 2026.10.22');
        const q = quokka(S, P, 'wave'); const tr = steps(S, P, [6]);
        return { tick(t) { q.tick(t, t < 14); tr.at(t); rh.at(t, .2); box.at(t, .4); n.at(t, 10.2); } };
      }
    },
    /* 8 ── 오늘의 정리 */
    {
      title: '오늘의 정리', dur: 16,
      captions: [
        { t: 0, text: '오늘 나온 말을 정리해 볼게요.' },
        { t: 1.6, text: '취약점은 공격자가 파고들 수 있는 프로그램의 허점.' },
        { t: 5.2, text: '패치는 그걸 메운 새 버전이에요.' },
        { t: 8.8, text: 'AI 버그 헌팅은 AI로 취약점을 먼저 찾는 일이고요.' },
        { t: 12.4, text: '사이버위기 경보는 관심·주의·경계·심각 네 단계예요.' }
      ],
      build({ stage: st0, P, base }) {
        const S = setup(st0, P);
        const rh = head(S, P, '오늘의 AI 개념극장 · 용어 넷');
        const box = P.h('div', { class: 'ps-box' + (S.wide ? ' w' : ' big') }, P.h('iframe', { src: `${base || ''}assets/motions/browser-tabs-e78.html`, title: '용어 정리', tabindex: '-1' })); S.stage.append(box);
        const q = quokka(S, P, 'wave');
        const MW = S.wide ? 560 : 330;
        const marq = P.h('div', { class: 'ia-marq', style: S.wide ? 'left:660px;top:112px;width:560px;height:270px' : 'left:60px;top:842px;width:330px;height:270px' });
        const CARDS = [['찾는 AI', 'Gemini 4 Argon', 'Wiz', 'big'], ['찾는 AI', 'GPT-5.6 Sol', 'Calif · OpenAI', 'big'], ['찾는 AI', 'Wiz Atlas', '보안 에이전트', 'big'], ['막는 쪽', '패치', '10월 21일', 'small'], ['막는 쪽', '경보 주의', '10월 22일', 'small'], ['막는 쪽', '오프라인', '지식샘터 10.29', 'small']];
        const inner = P.h('div', { class: 'ia-marq-in' }, ...CARDS.map(([k, n, w, c]) => P.h('div', { class: `ia-mtile ${c}` }, P.h('small', {}, k), P.h('b', {}, n), P.h('span', {}, w))));
        marq.append(inner); S.stage.append(marq);
        return {
          tick(t) {
            q.tick(t, t < 15); rh.at(t, .2);
            const come = SP(seg(t, .6, 1.2)); box.style.opacity = come > 0 ? 1 : 0; box.style.transform = `translateY(${(1 - come) * 50}px) scale(${.9 + .1 * come})`;
            inner.style.transform = `translateX(${MW - Math.max(0, t - .4) * 100}px)`;
          }
        };
      }
    }
  ],

  interaction: {
    title: '우리 사이트 패치 시계',
    desc: '우리 학교나 내 블로그가 돌아가는 PHP 버전과, 취약점 공개 뒤 지난 시간을 넣으면 지금 어느 쪽에 서 있는지와 해야 할 일이 나와요. 값은 저장되지 않아요.',
    mount(el, P) {
      const sel = P.h('select', { class: 'sim-ps-sel', 'aria-label': 'PHP 버전' }, P.h('option', { value: 'old' }, 'PHP 8.1 이하 (지원 끝남)'), P.h('option', { value: 'mid' }, 'PHP 8.2 ~ 8.5, 패치 전'), P.h('option', { value: 'ok' }, '패치본 (8.5.12 / 8.4.27 / 8.3.36 / 8.2.35)'), P.h('option', { value: 'unknown' }, '모름 (호스팅·외주)'));
      const hours = P.h('input', { type: 'number', min: '0', max: '720', value: '0', class: 'sim-ps-num', 'aria-label': '공개 뒤 지난 시간' });
      const out = P.h('div', { class: 'sim-ps-out' });
      const bSample = P.h('button', { class: 'btn primary', type: 'button' }, '보기 값 넣기'), bClear = P.h('button', { class: 'btn', type: 'button' }, '비우기');
      const draw = () => {
        const v = sel.value, h = Math.max(0, parseInt(hours.value) || 0);
        const speed = h === 0 ? '공개 전이라면 지금이 가장 조용한 때예요.' : h < 1 ? '공개 45분 안에 수만 건 시도가 들어온 사건이에요. 이미 늦지 않았어요.' : h < 24 ? '하루 안에 수백만 건이 들어왔어요. 오늘 안에 해야 해요.' : '패치 공개 뒤 하루가 지났어요. 이미 공격 코드가 널리 퍼져 있어요.';
        const act = v === 'ok' ? '패치본이면 됐어요. 그래도 접속 기록과 웹셸 흔적은 한 번 확인하세요.' : v === 'old' ? '8.1 이하는 패치가 안 나와요. 지원되는 버전으로 올리거나, 올릴 때까지 서비스를 내리는 게 CISA 권고예요.' : v === 'mid' ? '같은 줄의 패치본으로 바로 올리면 돼요. 올린 뒤 웹서버를 재시작하세요.' : '호스팅사나 외주 업체에 "PHP2Shell 패치했나요"라고 물어보면 돼요. 답이 없으면 내리는 쪽이 안전해요.';
        out.innerHTML = `<p><b>${speed}</b></p><p>${act}</p>`;
      };
      el.append(P.h('style', {}, `
        .sim-ps-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:14px;font-weight:700;color:#4E5968;flex-wrap:wrap}
        .sim-ps-sel,.sim-ps-num{height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:700}
        .sim-ps-num{width:84px}
        .sim-ps-out{margin-top:12px;background:#F2F4F6;border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.6}
        .sim-ps-out p{margin:0 0 4px}
        .sim-ps-out b{color:#1F3460}
      `), P.h('div', { class: 'sim-ps-row' }, P.h('span', {}, '우리 사이트 PHP'), sel), P.h('div', { class: 'sim-ps-row' }, P.h('span', {}, '취약점 공개 뒤 지난 시간'), hours, P.h('span', {}, '시간')), P.h('div', { class: 'sim-ps-row' }, bSample, bClear), out);
      sel.addEventListener('change', draw); hours.addEventListener('input', draw);
      bSample.addEventListener('click', () => { sel.value = 'old'; hours.value = '30'; draw(); });
      bClear.addEventListener('click', () => { sel.value = 'unknown'; hours.value = '0'; draw(); });
      sel.value = 'unknown'; draw();
    }
  },

  teacherLines: [
    'PHP는 서버에서 웹페이지를 조립하는 언어예요. 이번에 그 언어 자체에서 <b>치명 등급 취약점 두 건</b>이 나왔고, 찾은 건 AI였어요.',
    '패치가 나오면 공격 쪽 AI가 몇 시간 안에 공격 코드를 만들어요. 그래서 바로 못 고치는 서비스는 <b>끄는 게 권고</b>이고, 지식샘터가 석 달을 닫은 이유예요.',
    '선생님이 할 일은 학교 홈페이지 PHP 버전 묻기, 호스팅 패치 확인, 출처 모르는 공격 코드 안 열기, 연수 일정 옮기기, <b>기기 업데이트 미루지 않기</b>예요.'
  ],
  tip: {
    body: '수업에서는 "식당" 비유가 잘 먹혀요. 손님(브라우저)이 주문서(요청)를 내면 주방(서버)에서 PHP가 요리(페이지)를 만들어 내보내요. 이번 취약점은 주방 문이 잠기지 않아서 아무 손님이나 주문서 한 장으로 주방에 들어가 명령을 내릴 수 있게 된 거예요.',
    extra: 'AI 이야기는 양쪽을 같이 보여 주세요. 찾은 쪽도 AI, 공격 코드를 빨리 만드는 쪽도 AI예요. 그래서 보안의 시간 단위가 몇 주에서 몇 시간으로 줄었다는 게 이 편의 개념이에요. 지식샘터 공지의 유럽·NSA 이야기는 CNBC와 NSA 권고문으로 확인됐어요.'
  },
  myth: {
    myth: '큰 기관 사이트는 보안팀이 있으니 해킹 걱정은 없다.',
    fact: '이번 취약점은 사이트가 아니고 PHP 언어 본체에 있었어요. PHP로 돌아가는 사이트는 전부 같은 취약점을 갖고 있었고, 패치 공개 45분 만에 수만 건의 공격 시도가 들어왔어요. 그래서 핀란드·독일·프랑스 정부 사이트와 지식샘터처럼 바로 못 고치는 곳은 아예 서비스를 내렸어요.'
  },
  sources: [
    { title: 'CISA. Critical Vulnerabilities in PHP Require Immediate Patching (2026.10.21, 10.26 갱신)', url: 'https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching', note: 'CVE-2026-109618·109619 "php2shell", 로그인 없는 원격 코드 실행, 고친 버전 8.5.12/8.4.27/8.3.36/8.2.35. "바로 업데이트할 수 없으면 PHP 시스템을 오프라인으로". 10.26 KEV 등재.' },
    { title: 'Wiz. PHP2Shell: PHP RCE (2026.10.21)', url: 'https://www.wiz.io/blog/php2shell-php-rce', note: '8.19 발견, 8.24 PHP 보안팀 신고, 10.21 패치. Wiz Atlas·Gemini 4 Argon·GPT-5.6 Sol 사용. "연구자 한 명이 일주일 만에 세계급 팀이 몇 달 걸릴 일을". PHP가 전 세계 웹의 70%. OpenAI Patch the Planet 쪽은 Calif가 GPT-5.6 Sol로 따로 발견.' },
    { title: 'Amazon Threat Intelligence. PHP2Shell exploitation prior to public disclosure in MadPot (2026.10)', url: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/', note: '공개 4일 전 10.17 첫 시도. "AI-assisted analysis makes it cheaper to turn a patch diff or advisory into a working exploit". 패치 시간을 시간 단위로.' },
    { title: '대한민국 정책브리핑. PHP 보안 취약점, 민간 사이버위기 경보 주의 격상 (2026.10.22)', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148974113', note: '10.22 12시 관심→주의. PHP 8.1 이하 지원 종료. 호스팅 이용 사이트는 호스팅사에 패치 여부 확인. 출처 불명 공격 실증 코드 실행 금지.' },
    { title: 'CNBC. Why governments pulled websites offline over the decades-old PHP programming language (2026.10.22)', url: 'https://www.cnbc.com/2026/10/22/php2shell-vulnerability-what-is-it-and-is-your-data-at-risk.html', note: '각국 정부 사이트 중단, NSA "패치하거나 서버를 내리라". 보안업체 인용: 공격 코드까지 몇 주 → 며칠 → 몇 시간. 클라우드플레어 집계 공개 45분 만에 수만 건.' }
  ],
  script: `선생님, 지식샘터가 10월 29일부터 1월 31일까지 석 달 동안 문을 닫아요. 연수가 전부 멈추는 거죠. 이유는 PHP라는 언어의 보안 취약점이래요. 그런데 이 취약점을 찾아낸 게 사람이 아니고 AI예요.

8월 19일, 보안회사 Wiz가 PHP에서 취약점을 찾았어요. 찾은 도구는 Gemini 4 Argon과 GPT-5.6 Sol이고요. 여러 해 동안 사람이 못 본 걸 AI가 일주일 만에 봤어요. Wiz는 연구자 한 명이 일주일 만에, 예전 같으면 세계급 팀이 몇 달 걸릴 일을 해냈다고 썼어요. 8월 24일에 PHP 보안팀에 신고했고, 10월 21일에 패치가 나왔어요.

PHP가 뭐냐고요? 웹페이지를 만드는 언어예요. 선생님이 지식샘터에 로그인하면 서버가 그때 페이지를 조립해서 보내요. 누가 로그인했는지, 신청한 연수가 뭔지 확인해서요. 그 조립을 PHP가 해요. Wiz 기준으로 전 세계 웹사이트의 70%가 PHP로 돌아가요. 그러니 언어 자체가 뚫리면 사이트 하나가 아니고 전부가 흔들려요.

어떻게 뚫리냐면요. 요청 하나로 서버 메모리를 일부러 모자라게 만들어요. 그러면 PHP가 뒷정리를 제대로 못 해요. 다음 요청이 앞 손님의 메모리를 그대로 읽게 되죠. 거기서 비밀번호도 보고, 명령도 내릴 수 있어요. 로그인 없이요. 그래서 10점 만점에 9.2점, 치명 등급이에요.

여기서 AI가 한 번 더 나와요. 패치가 나오면 공격자도 그걸 읽어요. AI가 패치 내용을 공격 코드로 바꿔 주거든요. 아마존 위협정보팀은 AI 분석 덕에 패치 차이점을 공격 코드로 바꾸는 비용이 싸졌다고 썼어요. 실제로 공개 45분 만에 수만 건, 다음 날 수백만 건의 공격 시도가 들어왔어요. 예전엔 공격 코드가 나오기까지 몇 주 걸렸는데 이젠 몇 시간이에요.

그래서 각국이 말했어요. 바로 못 고치면 서버를 끄라고. 미국 CISA와 NSA 권고예요. 핀란드, 독일, 프랑스가 정부 사이트를 내렸고, 한국은 10월 22일에 민간 사이버위기 경보를 관심에서 주의로 올렸어요. 일본은 총리가 직접 SNS로 긴급 업데이트를 부탁했고요. 지식샘터는 PHP를 새 버전으로 바꾸는 석 달 동안 문을 닫기로 했죠.

우리가 할 일은 다섯 가지예요. 학교 홈페이지 담당자에게 PHP 버전을 물어보세요. 워드프레스 블로그를 쓰면 호스팅 패치 공지를 확인하고요. 출처 모르는 공격 코드 파일은 열지 마세요. 악성코드가 섞인 게 돌아다녀요. 연수 일정은 지금 옮기고, 내 기기 업데이트는 미루지 마세요.

오늘 나온 말 넷이에요. 취약점은 공격자가 파고들 수 있는 프로그램의 허점. 패치는 그걸 메운 새 버전. AI 버그 헌팅은 AI로 취약점을 먼저 찾는 일. 사이버위기 경보는 관심, 주의, 경계, 심각 네 단계예요.`
};
