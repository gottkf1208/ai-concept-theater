# 쿼카 AI 개념극장

**선생님을 위한 AI 원리 3분 극장.** AI를 쓰다가 "이거 왜 이래?", "이거 무슨 원리야?" 하는 순간을 3분 안에 풀어 줘요. 설명을 읽는 게 아니라 **보고(코드로 그린 1분 애니메이션), 만져 보고(브라우저 안 시뮬레이션), 바로 쓰는(학생에게 할 한 문장, 업무 팁)** 경험이에요.

- 사이트: https://gottkf1208.github.io/ai-concept-theater/
- 만든 곳: 경기 AI융합교육연구회 Q.U.O.K.A(쿼카연구회) · 두목쿼카(김햇살)
- 대상: 교사(학생용이 아니에요). 연수 도입, 연구회 월례회, 출근길 3분

## 시즌 1

| 편 | 트랙 | 제목 | 만져 보기 |
|---|---|---|---|
| E1 | B | AI는 어떻게 브루를 직접 눌렀을까 — AI 에이전트와 MCP | 에이전트 루프 시뮬레이터 |
| E2 | A | 같은 프롬프트, 다른 영상 — 확률과 시드 | 시드 슬라이더 + 창의성(온도) 다이얼 |
| E3 | A | 글자와 손가락은 왜 뭉개질까 — 확산 모델 | 잡음 제거 단계 슬라이더 |
| E4 | A | AI는 왜 없는 숫자를 그려 넣을까 — 그럴듯함과 사실 | 가짜 단서 찾기 |
| E5 | B | 긴 대화에서 AI가 앞 내용을 잊는 이유 — 토큰과 컨텍스트 창 | 토큰 칩 분해기 + 책상 크기 |
| E6 | B | 자료를 붙여 주면 왜 덜 틀릴까 — 할루시네이션과 RAG | 자료 없이 vs 붙여서 답 비교 |

트랙 A는 "AI 영상을 만들다 생기는 왜?", 트랙 B는 "요즘 AI를 따라잡는 필수 개념"이에요. 다음 시즌 6편은 대본 초안만 있고 목록에 '준비 중'으로 나와요.

## 사용법

- **혼자 3분:** `watch.html?ep=e1-agent-mcp`. 자막은 항상 켜져 있어요. 음성(브라우저 음성 합성, ko-KR)은 `V` 또는 '음성' 버튼.
- **연수 모드:** `watch.html?ep=e1-agent-mcp&mode=train`. 큰 글씨 슬라이드. 제목 → 애니메이션 → 만져 보기 → 학생에게 이렇게 → 팁·오해 → 출처 순서로 넘어가요.
- **녹화 모드:** `watch.html?ep=e1-agent-mcp&mode=rec`. 조작 버튼을 숨기고 16:9로 3초 카운트다운 뒤 자동 재생. 화면 녹화(Windows `Win+Alt+R`, macOS `Shift+Cmd+5`)나 브루로 영상 파일을 뜨세요.

### 단축키

| 키 | 동작 |
|---|---|
| `Space` | 재생 · 멈춤 |
| `←` `→` | 이전 · 다음 장면(연수 모드에서는 슬라이드) |
| `V` | 음성 켜기 · 끄기 |
| `N` | 강사 대본 열기 · 닫기(연수 모드) |
| `Esc` | 연수 모드 나가기 |
| `Home` | 첫 장면 |

## 구조

```
index.html            첫 화면: 오늘의 한 토막, 트랙별 목록, 검색, '학생에게 이렇게' 모아 보기
watch.html?ep=slug    시청 화면 (&mode=train 연수, &mode=rec 녹화)
engine/theater.js     타임라인 플레이어(재생·멈춤·장면 이동·자막·음성)
engine/parts.js       장면 부품(쿼카, 말풍선, 화살표, 상자, 토큰 칩, 노이즈 캔버스)
engine/tts.js         브라우저 음성 합성
engine/registry.js    에피소드 목록
episodes/*.js         한 편 = 파일 하나
episodes/next/*.js    다음 시즌 대본 초안
assets/               캐릭터·프레임·매니페스트
test/run.mjs          Playwright 자동 검사 / test/links.mjs 출처 링크 검사
```

빌드 없는 정적 사이트예요. HTML, CSS, ES 모듈만 쓰고 외부 라이브러리는 Pretendard 글꼴(jsdelivr) 하나예요. 로그인·분석·추적·개인정보 수집이 없어요.

## 로컬에서 보기

```bash
npx -y http-server . -p 5310 -c-1
```

`file://`로 열면 ES 모듈이 막히니 꼭 서버로 여세요.

## 검사

```bash
npm i -D playwright && npx playwright install chromium
node test/run.mjs            # 데스크톱 1440×900, 휴대폰 390×844 스크린샷 + 기능 검사
node test/links.mjs          # 출처 링크 열림 확인
```

## 새 에피소드 만들기

[CONTRIBUTING.md](CONTRIBUTING.md)에 템플릿과 절차가 있어요. 파일 하나 만들고 `engine/registry.js`에 한 줄 추가하면 끝이에요.

## 접근성

키보드로 모두 조작할 수 있고, 자막이 항상 켜져 있고, `prefers-reduced-motion`을 지원해요. 휴대폰 세로 화면에서도 가로 스크롤 없이 보여요.

## 출처와 AI 생성 표시

- 에피소드별 1차 자료: [SOURCES.md](SOURCES.md)
- AI 생성 자산과 크레딧 사용 내역: [CREDITS.md](CREDITS.md)
- 캐릭터는 쿼카연구회 오리지널 쿼카예요.
