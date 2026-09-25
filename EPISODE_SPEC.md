# 에피소드 파일 규격 (제작자용)

한 편 = `episodes/{slug}.js` 파일 하나. `export default { ... }` 객체 하나예요. 파일럿 `episodes/e1-agent-mcp.js`가 완성 예시이니 먼저 읽으세요.

## 필드

| 필드 | 형식 | 설명 |
|---|---|---|
| slug | string | 파일명과 같게 |
| track | 'A' \| 'B' | A: AI 영상을 만들다 생기는 "왜?", B: 요즘 AI 필수 개념 |
| title / subtitle | string | 제목(질문형), 부제(개념 이름) |
| summary | string | 목록 카드용 한두 문장 |
| keywords | string[] | 검색용 |
| scenes | Scene[] | 5장면 안팎, 합계 60~70초 |
| interaction | { title, desc, mount(el, P) } | 만져 보기 1개. 외부 API 없음. 같은 입력 → 같은 결과 |
| teacherLines | string[] | 학생에게 그대로 말할 1~2문장. `<b>` 강조 가능 |
| tip | { body, extra? } | 업무·수업 팁 하나(+덧붙임) |
| myth | { myth, fact } | 오해 → 실제 |
| sources | { title, url, note }[] | 1차 자료 2~4개. **아래 검증된 URL만** 쓰세요 |
| script | string | 강사 대본 1분(약 350~450자, 문단 3~4개, 해요체) |

## Scene

```js
{
  title: '장면 제목', dur: 13,               // 초
  captions: [ { t: 0, text: '자막. <em>강조</em> 가능' }, { t: 5, text: '...' } ],  // 항상 켜짐. 한 자막은 2문장 이하
  build({ stage, lines, P, tl, dur, reduced }) {
    // stage: 1280×720 좌표계의 div. P.*로 만든 부품의 .el을 stage.append
    // lines: 화살표용 SVG 레이어. P.arrow(lines, {...})
    // tl.at(el, t0, {from:'up'|'down'|'left'|'right'|'pop'|'none', dur, until, dist}) : t0초에 나타나기(되감기 가능)
    return { tick(t) { /* t = 장면 안 시간(초). 모든 움직임은 t로 계산(결정적) */ } };
  }
}
```

## 부품(P) API — engine/parts.js

- `P.quokka({x, y, size, flip, pose})` → `{el, tick(t, talking), pose(p)}`. 포즈: base, point, think, oops, tablet, wave, dice, glass, idea, globe (없는 포즈는 기본 스티커로 대체). **매 tick마다 `q.tick(t, 말하는중)`을 부르세요.**
- `P.bubble({x, y, w, text, tail:'left'|'right'|'bottom'|'none', size, tone:''|'aqua'|'orange'|'soft'})` → `{el, set(html)}`. `<b>`는 오렌지 강조
- `P.box({x, y, w, h, label, sub, accent:''|'aqua'|'orange'|'ink'|'brown', icon})` → `{el, set(label, sub), on(bool)}`
- `P.text({x, y, w, text, size, weight, color, align, cls:'muted'|'big'|'mono'})` → `{el, set(html)}`. `<em>`오렌지, `<i>`아쿠아
- `P.chip({x, y, text, color:'aqua'|'orange'|'ink'|'gray', size})` → `{el}`
- `P.arrow(lines, {x1,y1,x2,y2, curve, dashed, color, width, head})` → `{el, draw(0~1)}`. tick에서 `draw(P.clamp((t-시작)/0.6,0,1))`
- `P.noise({x, y, w, h, seed})` → `{el, source(img), set(level 0~1)}` 잡음 캔버스(1=완전 잡음)
- `P.ICON.{eye,click,key,doc,save,hand,search,plug,brain,check,x,dice,video,desk}` 선 아이콘 SVG 문자열
- `P.h(tag, attrs, ...kids)` / `P.s(svgTag, attrs)` DOM 헬퍼. `P.rng(seed)` 결정적 난수. `P.clamp`, `P.lerp`, `P.easeOut`
- 무대 배경은 거의 흰색. 색은 아쿠아 `#2BB3C9`/`#127E90`, 오렌지 `#F2812D`/`#B3520F`, 잉크 `#1B1F24`, 브라운 `#6B4A2E`, 회색 `#9AA5AF`만.

## 화면 구성 원칙

- 한 장면에 요소 3~6개. 여백을 남기고, 카드 안에 카드를 겹치지 마세요. 이모지 금지, 그라데이션·네온 금지.
- 쿼카는 장면마다 1마리(없어도 됨). 보통 왼쪽 아래(x 40~90, y 300~440, size 260~380). 이미지 폭은 size×0.66.
- 글자 크기: 본문 22~28px, 큰 문장 30~36px, 라벨 18~20px. 자막에 다 말하므로 무대 글자는 짧게.
- 무대 위 요소가 1280×720을 넘지 않게(y 최대 ~660).
- 자막: 해요체, 옆자리 동료 교사 톤. 전문 용어는 처음 나올 때 한 번 풀기. "도구마다 달라요"처럼 범위를 밝히기.

## 만져 보기(interaction.mount)

- `mount(el, P)`에서 el 안에 DOM을 만들고, `<style>`은 el 안에 넣어도 돼요(클래스 이름은 `sim-` 접두어).
- 버튼은 `class="btn primary"`(주 동작), `class="btn"`(보조). 슬라이더는 `<input type="range">`에 `<label>` 연결.
- 키보드로 모두 조작 가능해야 해요(버튼/입력만 쓰면 자동으로 됨).
- 휴대폰(390px)에서 가로로 넘치지 않게: 고정 폭 금지, `flex-wrap`, `max-width:100%`, 캔버스는 `width:100%;height:auto`.
- 첫 상태에서 이미 무언가 보이고, 첫 조작에서 바로 바뀌어야 해요(자동 검사가 첫 `button.primary` 클릭 또는 첫 range를 최대로 올려 변화를 확인해요).

## 검사

서버가 http://localhost:5310/ 에 떠 있어요. 프로젝트 폴더에서:

```
SLUGS=e2-seed node test/run.mjs
```

콘솔 오류 0(다른 편 파일이 아직 없어서 나는 index 404는 무시), 가로 넘침 0, 재생·장면 이동·만져 보기·연수·녹화·N 키 통과가 목표예요. `test/screens/{slug}-*.png` 스크린샷을 직접 열어 겹침·잘림·빈 공간을 고치세요.
