# 시즌 777 집필 규칙 (에피소드 파일 작성 에이전트용)

1. 먼저 읽기: `EPISODE_SPEC.md`(규격), `episodes/s5/s5-degradation.js`(완성 예시 — 구조·문체·길이 그대로), 그리고 담당 편의 브리프(`test/briefs/S777_B{블록}_BRIEFS.md`의 해당 절).
2. 파일: `episodes/s777/{slug}.js` 하나만. `export default {...}`. `slug`는 브리프의 slug, `track`은 `'S777'`. 장면 5개(합 60~70초), 만져 보기 1개(결정적·외부 API 없음·첫 primary 버튼 클릭 또는 첫 range 최대값에서 DOM 변화·390px 가로 넘침 없음), teacherLines 2개, tip(body+extra), myth, sources(브리프의 확인된 URL만, 2~4개), script(350~450자 해요체).
3. 내용은 **브리프의 '확인된 사실'만** 쓰세요. 브리프에 없는 수치·날짜·제품명·주장은 넣지 않습니다. 브리프에 "확인 불가"로 표시된 것은 쓰지 않습니다.
4. 문장 철칙: 해요체, 옆자리 동료 교사 톤. 전문 용어는 처음 나올 때 한 번 풀기. **"도구마다/서비스마다/모델마다 달라요", "이름은 달라요" 같은 회피 문장 금지** — 실제 메커니즘과 용어로 말하기. 사투리 어미 금지. 이모지 금지. 자막 한 개는 2문장 이하. 자막에 논문 괄호 인용 금지("2025년 연구" 정도로, 서지는 sources에).
5. 무대: 1280×720, 요소는 y 660 이하. 쿼카 포즈는 base·point·think·oops·wave 중에서(이 편 의상 세트에 다 있어요). 쿼카는 보통 왼쪽 아래(x 40~90, y 300~440, size 260~380). 글자와 쿼카가 겹치지 않게. 색은 `accent: 'aqua'|'orange'|'ink'`와 `'#127E90'`·`'#F2812D'`·`'#1B1F24'`·`'#9AA5AF'`만. `P.noise(...).source()`에는 이미지 요소만(URL 금지).
6. 검사(서버 http://localhost:5310 이미 떠 있음, 프로젝트 폴더에서): `SLUGS={slug} node test/run.mjs` → 이 편 항목이 전부 ✓ (index의 404·검색 필터 실패는 다른 편 파일이 아직 없어서 나는 것이니 무시), `node test/overlap.mjs {slug}` → total 0. 실패하면 고쳐서 다시.
7. 건드리지 말 것: engine/, index.html, watch.html, README, registry, palette, manifest, 다른 episodes 파일, test/ 스크립트, git. 자기 파일 하나만.
8. 끝나면 파일 경로, 테스트 결과, 장면 제목 5개, 사용한 출처 URL을 보고하세요.

9. 시즌 777은 **2026년 9월 말~10월 초 실제 AI 소식**이 축이에요. 장면 1은 그 소식(무엇이, 언제, 누가 발표했는지 — 브리프의 1차 출처 날짜 그대로)으로 열고, 장면 2~4에서 그 소식을 이해하는 데 필요한 개념을 설명하고, 장면 5는 교실에서의 판단으로 닫아요. 소식의 날짜·주체·수치는 브리프 확인분만. 제품명은 브리프에 확인된 공식 명칭만 쓰고, 홍보처럼 들리지 않게 "발표했어요/공개했어요" 수준으로.
10. 완성 예시로 `episodes/v2/v3-agent-mcp.js`(v2 완성본)도 함께 읽고 구조·길이를 맞추세요. 검사는 `SLUGS={slug} node test/run.mjs`, `node test/overlap.mjs {slug}`, `node test/overflow.mjs {slug}` 세 가지 모두 total 0 / 전부 ✓.
