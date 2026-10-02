# v2 집필 규칙 (에피소드 파일 작성 에이전트용)

1. 먼저 읽기: `EPISODE_SPEC.md`(규격), `episodes/s5/s5-degradation.js`(완성 예시 — 구조·문체·길이 그대로), 그리고 담당 편의 브리프(`test/briefs/V2_S{n}_BRIEFS.md`의 해당 절).
2. 파일: `episodes/v2/{slug}.js` 하나만. `export default {...}`. `slug`는 브리프의 slug, `track`은 시즌 코드(`'S1'`~`'S5'`). 장면 5개(합 60~70초), 만져 보기 1개(결정적·외부 API 없음·첫 primary 버튼 클릭 또는 첫 range 최대값에서 DOM 변화·390px 가로 넘침 없음), teacherLines 2개, tip(body+extra), myth, sources(브리프의 확인된 URL만, 2~4개), script(350~450자 해요체).
3. 내용은 **브리프의 '확인된 사실'만** 쓰세요. 브리프에 없는 수치·날짜·제품명·주장은 넣지 않습니다. 브리프에 "확인 불가"로 표시된 것은 쓰지 않습니다.
4. 문장 철칙: 해요체, 옆자리 동료 교사 톤. 전문 용어는 처음 나올 때 한 번 풀기. **"도구마다/서비스마다/모델마다 달라요", "이름은 달라요" 같은 회피 문장 금지** — 실제 메커니즘과 용어로 말하기. 사투리 어미 금지. 이모지 금지. 자막 한 개는 2문장 이하. 자막에 논문 괄호 인용 금지("2025년 연구" 정도로, 서지는 sources에).
5. 무대: 1280×720, 요소는 y 660 이하. 쿼카 포즈는 base·point·think·oops·wave 중에서(이 편 의상 세트에 다 있어요). 쿼카는 보통 왼쪽 아래(x 40~90, y 300~440, size 260~380). 글자와 쿼카가 겹치지 않게. 색은 `accent: 'aqua'|'orange'|'ink'`와 `'#127E90'`·`'#F2812D'`·`'#1B1F24'`·`'#9AA5AF'`만. `P.noise(...).source()`에는 이미지 요소만(URL 금지).
6. 검사(서버 http://localhost:5310 이미 떠 있음, 프로젝트 폴더에서): `SLUGS={slug} node test/run.mjs` → 이 편 항목이 전부 ✓ (index의 404·검색 필터 실패는 다른 편 파일이 아직 없어서 나는 것이니 무시), `node test/overlap.mjs {slug}` → total 0. 실패하면 고쳐서 다시.
7. 건드리지 말 것: engine/, index.html, watch.html, README, registry, palette, manifest, 다른 episodes 파일, test/ 스크립트, git. 자기 파일 하나만.
8. 끝나면 파일 경로, 테스트 결과, 장면 제목 5개, 사용한 출처 URL을 보고하세요.
