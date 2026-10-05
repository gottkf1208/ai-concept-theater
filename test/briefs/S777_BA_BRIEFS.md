# 시즌 777 · 블록 A 「새 모델이 쏟아진 2주」 제작 브리프 — E41~E46

작성 기준일: 2026-10-05. 아래 "확인된 사실"은 전부 2026-10-05에 WebFetch로 원문을 직접 다시 열어 확인한 1차 출처예요(회사 공식 발표·개발자 문서·가격표·지원 문서, arXiv, 평가 기관 공식 페이지). 날짜는 **원문 게시일(또는 문서 최종 갱신일)** 이고, 날짜 표기가 없는 문서는 "날짜 표기 없음"으로 적었어요.

- OpenAI 기사 본문(openai.com/index/...)과 OpenAI 도움말(help.openai.com)은 오늘도 403이었어요. 그래서 OpenAI 소식은 **공식 RSS(https://openai.com/news/rss.xml)의 제목·게시일·요약문**과 **developers.openai.com의 changelog·deprecations·models·pricing·prompt caching 문서**로 확인했어요. "RSS 확인"이라고 적은 항목은 본문이 아니라 공식 요약문만 읽은 것이니, 요약문에 없는 내용은 쓰지 않아요.
- Artificial Analysis 리더보드 값은 **2026-10-05 열람값**이에요. 실시간으로 바뀌는 표라서 자막·팁에서는 반드시 "10월 5일 기준 공개 표"라고 밝혀요. 같은 행을 따로 여러 번 열어 일치한 값만 적었어요.

## 공통 규칙 (집필 에이전트용)
- 규격: `EPISODE_SPEC.md`, 집필 규칙: `test/briefs/S777_WRITER_RULES.md`(완성 예시 `episodes/s5/s5-degradation.js`, `episodes/v2/v3-agent-mcp.js`). 파일은 `episodes/s777/{slug}.js` 하나. `track: 'S777'`.
- **장면 1 = 소식**(무엇이, 언제, 누가 — 아래 1차 출처 날짜 그대로). **장면 2~4 = 그 소식을 이해하는 데 필요한 개념.** **장면 5 = 교실에서의 판단.** 장면 5개 합 60~70초.
- 쿼카 포즈는 base, point, think, oops, wave 중에서. 쿼카는 보통 왼쪽 아래(x 40~90, y 300~440, size 260~380). 글자와 겹치지 않게 본문 요소는 x 340 이후에 두세요. 색은 `accent: 'aqua'|'orange'|'ink'`와 `'#127E90'`, `'#F2812D'`, `'#1B1F24'`, `'#9AA5AF'`만. 요소는 y 660 이하.
- **내용은 이 브리프의 "확인된 사실"만** 쓰세요. "확인 불가"로 표시된 항목은 자막·팁·오해·대본·만져 보기 어디에도 쓰지 않아요. "계산값"으로 표시한 숫자는 "계산하면", "예시로" 같은 말을 붙여 출처의 수치와 구분해요.
- 문장 철칙: 해요체, 옆자리 동료 교사 톤. **"도구마다/서비스마다/모델마다 달라요", "이름은 달라요" 류 회피 문장 금지.** 실제 메커니즘과 용어(토큰 단가, 입력·출력 토큰, 노력 수준, 신뢰구간, Elo, 키·값 벡터, 접두사 일치, 캐시 쓰기·읽기, 지원 중단·은퇴, 스냅샷 ID, 라우터, 소프트맥스, 상위 k, 활성 파라미터…)로 말하고, 용어는 처음 나올 때 한 번 풀어요. 사투리·이모지 금지. 자막 한 개 2문장 이하. 논문은 자막에서 "2021년 연구"처럼, 서지는 sources에.
- 제품명은 아래에 확인된 공식 명칭만(Claude Opus 5.5, Claude Sonnet 5.5, GPT-6 Sol, GPT-6 Luna, GPT-6.1 Sol, GPT-6 Astra, Gemini 4 Argon, Kimi K3, Sora 2, Solar Mini 4). 톤은 중립: "출시했어요/공개했어요/발표했어요". "혁신적", "압도적" 같은 홍보 말투 금지. 회사가 직접 잰 수치는 "회사 자체 시험에서", 외부 기관 수치는 기관명을 밝혀요.
- 가격 단위는 "100만 토큰당 달러"(MTok = 100만 토큰). 입력·출력 단가를 섞지 말 것.
- **기존 편과 겹치지 않게**: 노력 수준(effort)의 원리는 `v1-reasoning`, 토큰·컨텍스트 창은 `v1-context`, MoE 기본·모델 카드 라이선스는 `v5-open-weight`, 온디바이스 희소 모델·양자화는 `v5-on-device`, 도구 고르기 체크리스트는 `v5-choose`가 이미 다뤘어요. 이 블록에서는 "지난 편에서 본 것처럼" 한 줄로 잇고 다시 설명하지 않아요.
- 블록 안 편끼리 경계: 41편은 **발표문 숫자 읽기(누가·어떤 설정·오차·작업당 비용)**, 42편은 **티어와 토큰 단가 계산, 계단식 고르기**, 43편은 **위험 능력 평가와 단계적 공개**, 44편은 **KV 캐시·프롬프트 캐싱 원리**(41·42에서는 캐시 단가를 숫자로만 언급하고 원리는 44로 넘김), 45편은 **수명주기·사전 고지·내보내기**, 46편은 **MoE 라우터 심화(점수·상위 k·부하 균형·메모리)**.
- 만져 보기: 결정적(같은 입력 → 같은 결과), 외부 API 없음, 첫 `button.primary` 클릭 또는 첫 range 최대값에서 DOM 변화, 390px 가로 넘침 없음(`flex-wrap`, `max-width:100%`). 가격은 아래 확인된 공식 단가를 상수로 박아 두고, 화면에 "2026-10-05 공식 가격표 기준"이라고 적어요. 가상의 값은 화면에 "예시 값"이라고 적어요.

## 이번 조사에서 바로잡은 것 (뉴스 목록과 다른 점)
- `S777_NEWS_GLOBAL.md` 31번(Gemini 4 Argon)의 "컨텍스트 100만 토큰"은 원문 확인 결과 **출력 토큰 한도**예요: "we are significantly expanding the model's output token limit to an industry-leading 1M tokens, up from the previous 64K tokens." 컨텍스트 창 크기는 원문에 없어서 쓰지 않아요.
- `S777_NEWS_PRODUCT_CULTURE.md` 19번(Sora 웹·앱 종료일 4/26, 내보내기 주소, 영구 삭제)은 출처가 help.openai.com이라 오늘 403으로 재확인하지 못했어요. 45편에서 쓰지 않아요.
- Opus 5.5의 "40% 저렴"은 토큰 단가 인하(20%)만이 아니라 "typical workloads" 기준 작업당 비용이에요. 단가와 작업당 비용을 구분해서 써요(41편).

---

## 41편 `t7-sonnet-opus-55`

- **제목**: 같은 값에 더 빠른 새 모델, 뭐가 달라졌을까
- **부제**: 발표문 숫자 읽기 — 벤치마크·가격·속도
- **summary**: 9월 22일 Claude Opus 5.5, 9월 28일 Claude Sonnet 5.5가 나왔어요. "40% 저렴", "30% 넘게 빠름", "70.6%" 같은 숫자는 누가, 어떤 설정으로 쟀을까요? 토큰 단가와 작업당 비용이 왜 다른지, 오차 범위 안의 2점 차이를 어떻게 읽을지 발표문과 외부 평가 표로 직접 읽어 봐요.
- **keywords**: Claude Opus 5.5, Claude Sonnet 5.5, Anthropic, 벤치마크, Terminal-Bench, GDPval-AA, Elo, 신뢰구간, 오차 범위, 토큰 단가, 작업당 비용, 회사 자체 시험, 노력 수준, Artificial Analysis, 평가 카드

### 확인된 사실
1. **Opus 5.5 출시(2026-09-22)**: "We're introducing Claude Opus 5.5, the first model in our new Claude 5.5 family." 모델 ID `claude-opus-5-5`. 가격 문장: "Input and output tokens are $4 and $20 per million, 20% less than Opus 5." 캐시 쓰기 $5, 캐시 읽기 $0.20. 비용: "Our tests show that at default settings it will cost 40% less than Opus 5 on typical workloads." 속도: "Opus 5.5 also generates output more than 30% faster than Opus 5."(측정 지표는 원문에 없음). 토큰 효율 사례: 초기 사용자가 20만 줄 코드베이스 점검·수정을 3시간 안에 끝냈고 "Opus 5 took over 20 hours and used 2.5x as many tokens." "On knowledge work evaluations, Opus 5.5 outperforms other models while also using fewer tokens." 제공처: Claude Platform과 AWS·Google Cloud·Microsoft Azure. — https://www.anthropic.com/news/claude-opus-5-5 (2026-09-22)
2. **Opus 5.5 벤치마크와 설정(같은 글 각주)**: Terminal-Bench 4.0 66.4%(표준오차 ±2.6%p), GDPval-AA v2.1 1846 Elo, CursorBench 4.0 57.8%. 각주: "All Claude Opus 5.5 results use adaptive thinking at max effort", Terminal-Bench는 xhigh 노력 수준으로 실행. GDPval-AA는 외부 기관 시험: "Artificial Analysis's GDPval-AA v2.1 evaluates agents on real-world professional work across 44 occupations." 나머지(Terminal-Bench 등)는 회사가 직접 돌린 결과. — 같은 URL
3. **Sonnet 5.5 출시(2026-09-28)**: 모델 ID `claude-sonnet-5-5`. "Sonnet 5.5 is priced the same as Sonnet 5 at $2 per million input tokens, $10 per million output tokens, and $0.20 per million tokens for cache reads." "Sonnet 5.5 runs 30%+ faster, and costs up to 30% less for most work." "Sonnet 5.5 scores 70.6% on Terminal-Bench 4.0, an agentic coding evaluation, compared to Sonnet 5's 10.3%." "It scores two points below Opus 5.5 on GDPval-AA"(1844 대 1846). GDPval-AA는 Artificial Analysis가 "a pre-release deployment of Sonnet 5.5 on the Claude Platform"에서 실행. — https://www.anthropic.com/claude-sonnet-5-5 (2026-09-28)
4. **공식 가격표**: Opus 5 입력 $5 / 출력 $25 / 캐시 읽기 $0.50, Opus 5.5 $4 / $20 / $0.20(입력가의 0.05배), Sonnet 5와 Sonnet 5.5 모두 $2 / $10 / $0.20. — https://platform.claude.com/docs/en/about-claude/pricing (날짜 표기 없음, 2026-10-05 확인)
5. **모델 개요 문서**: Opus 5.5·Sonnet 5.5 컨텍스트 창 100만 토큰, 최대 출력 12.8만 토큰. 기본 노력 수준 Opus 5.5 `medium`, Sonnet 5.5 `high`. 상대 지연 Opus 5.5 "Moderate", Sonnet 5.5 "Fast". Sonnet 5.5 설명 "The best combination of speed and intelligence". — https://platform.claude.com/docs/en/about-claude/models/overview (날짜 표기 없음, 2026-10-05 확인)
6. **외부 평가 표(Artificial Analysis GDPval-AA v2.1, 2026-10-05 열람)**: OpenAI가 산업 전문가와 만든 과제 220개, 44개 직업·9개 산업. 에이전트가 셸·웹 검색을 쓰며 과제를 풀고, "For each matchup, the two outputs are anonymized and an LLM judge picks a winner" — 익명 1:1 비교를 모아 Elo 점수로 환산. 기준점 "Anchored to DeepSeek V4.1 Flash (max) at 1600." 같은 Opus 5.5의 노력 수준별 행: Max 1867 ±26, Xhigh 1837 ±25, High 1707 ±23, Medium 1586 ±22, Low 1236 ±23. Sonnet 5.5(Max) 1840 ±24. — https://artificialanalysis.ai/evaluations/gdpval-aa (2026-10-05 열람, 실시간 표)
7. **평가 재현성(평가 카드)**: 2026-09-22, EvalEval 연합과 영국 AI 안전연구소(AISI)가 평가 결과를 'Evaluation Card'로 공개. 카드에는 모델 버전, 평가 도구(harness), 설정, 실행 횟수, 불확실성(오차)을 적어요. 문제의식: 결과가 "often without enough information to reproduce them" 흩어져 있고, "apparently similar scores can be produced under meaningfully different conditions." — https://huggingface.co/blog/evaleval-aisi (2026-09-22)

### 확인 불가 (쓰지 않기)
- Opus 5.5 "30% 넘게 빠름"의 측정 단위(초당 토큰인지 등): 원문에 없음. "출력이 30% 넘게 빨라졌다고 발표했어요"까지만.
- "40%"를 단가 효과와 토큰 효과로 나눈 회사 계산식: 원문에 없음. 만져 보기에서는 "예시 가정"으로만 분해해 보여 주기.
- 발표문의 GDPval-AA 1846과 10월 5일 공개 표의 1867이 다른 이유: 원문에 설명 없음. "같은 시험인데 숫자가 달라요 → 날짜와 설정을 같이 봐야 해요"까지만, 원인을 단정하지 않기.
- Claude Haiku 5.5: 발표문은 "will follow in the coming weeks"라고만 했고 10/5 현재 출시 미확인.

### 장면 5개 초안
1. **9월의 두 발표** (13초): 9월 22일 Opus 5.5, 9월 28일 Sonnet 5.5. 발표문 머리에 붙은 숫자 — "작업당 40% 저렴", "출력 30% 넘게 빠름", "Sonnet 5와 같은 값". 이 숫자, 어떻게 읽어야 할까요?
   - 무대: 쿼카 point(x 60, y 330, size 300). 오른쪽에 box 2개 나란히(x 380·800, y 110, w 380, h 150): "Claude Opus 5.5 · 9월 22일 / $4 · $20"(accent aqua), "Claude Sonnet 5.5 · 9월 28일 / $2 · $10"(accent orange). 아래 chip 3개(y 300): "작업당 40%↓", "출력 30%+ 빠름", "Sonnet 5와 같은 값". 맨 아래 큰 글씨(y 420): "이 숫자, <em>누가</em> 쟀을까요?"
2. **단가와 작업당 비용은 달라요** (14초): AI 요금 = 토큰 수 × 토큰 단가. Opus 5.5는 단가가 20% 내려갔는데 "흔한 작업 40% 절감"은 같은 일을 더 적은 토큰으로 끝낸 효과까지 합친 값이에요. Sonnet 5.5는 단가가 그대로인데 "최대 30% 절감" — 토큰을 덜 써서예요.
   - 무대: 쿼카 think. 곱셈식 box 3개 가로(x 360·640·920, y 150, w 240): "토큰 수" × "단가" = "작업당 비용", P.arrow로 연결. 아래 두 줄 비교 텍스트(y 360·420): "Opus 5.5: 단가 <em>20%↓</em> + 토큰↓ → 작업당 40%↓", "Sonnet 5.5: 단가 그대로 + 토큰↓ → 최대 30%↓". 토큰 개념은 `v1-context` 참조로만.
3. **누가, 어떤 설정으로 쟀나** (14초): 터미널 코딩 시험은 회사가 직접 쟀고, 실무 과제 시험 GDPval-AA는 외부 기관이 돌렸어요. 그리고 Opus 5.5 발표 점수는 모두 최고 노력 수준이에요. 10월 5일 기준 외부 표에서 같은 Opus 5.5도 노력 수준에 따라 1236부터 1867까지 벌어져요.
   - 무대: 쿼카 point. 왼쪽 위 chip 2개(y 100): "Terminal-Bench · 회사 자체 시험"(ink), "GDPval-AA · 외부 기관"(aqua). 오른쪽에 막대 5개 계단(x 420~1180, 바닥 y 600): Low 1236 / Medium 1586 / High 1707 / Xhigh 1837 / Max 1867, 막대 위 숫자 라벨. 아래 muted 라벨 "같은 모델, 설정만 다름 (10월 5일 공개 표)". 노력 수준 원리는 `v1-reasoning`으로 넘기고 설명하지 않기.
4. **2점 차이와 오차 범위** (13초): 실무 과제 시험에서 Opus 5.5가 Sonnet 5.5보다 2점 높았어요. 그런데 이 표의 오차 범위(신뢰구간)는 ±25 안팎이라, 2점 차이로 순위를 말하긴 어려워요. 터미널 코딩 시험에선 오히려 Sonnet 5.5가 70.6%로 Opus 5.5(66.4%)보다 높았어요.
   - 무대: 쿼카 think. 막대 2개(Opus 1846, Sonnet 1844)에 오차 막대(±25 안팎) 겹쳐 그리기 — 범위가 거의 포개짐. 오른쪽 box(accent orange): "Terminal-Bench 4.0 / Sonnet 5.5 70.6% · Opus 5.5 66.4%". 맨 아래 텍스트(y 560): "비슷한 점수도 <em>다른 조건</em>에서 나올 수 있어요"(9월 22일 공개된 평가 카드의 문제의식). 신뢰구간은 "점수가 이 정도 범위 안에서 흔들릴 수 있다는 폭"으로 한 번 풀기.
5. **교실 판단: 네 가지 질문** (13초): 새 모델 발표를 볼 때 ① 누가 쟀나(회사 자체·외부 기관) ② 어떤 설정(노력 수준) ③ 오차 범위보다 큰 차이인가 ④ 그 시험 과제가 우리 일과 닮았나. 마지막엔 우리 업무 과제 몇 개로 직접 나란히 돌려 봐요.
   - 무대: 쿼카 wave. chip 4개 세로(x 380, y 120~420, 간격 90): "누가 쟀나", "어떤 설정", "오차보다 큰 차이?", "우리 일과 닮았나". 오른쪽 아래 box(accent aqua): "우리 과제 5개로 나란히".

### 만져 보기 "발표문 숫자 해독기"
- 위: **작업당 비용 계산기**. 고정 과제 "연수 자료 묶음 요약·질문 만들기"(예시 값: 입력 200만 토큰, 출력 50만 토큰). select "비교할 짝": Opus 5 → Opus 5.5 / Sonnet 5 → Sonnet 5.5. range "새 모델이 같은 일에 쓰는 토큰(옛 모델 대비)" 50~100%, 기본 80%. 공식 단가 상수: Opus 5 $5/$25, Opus 5.5 $4/$20, Sonnet 5·5.5 $2/$10.
- primary 버튼 "새 모델로 바꿔 계산": 옛 모델 비용, 새 모델 비용, 절감률, 분해("단가 효과 / 토큰 효과")를 표시. 계산값: Opus 5 = 2×5 + 0.5×25 = $22.50. Opus 5.5 토큰 100% → $18.00(20%↓, 단가 효과만), 80% → $14.40(36%↓), 75% → $13.50(40%↓). Sonnet 5 = $9.00, Sonnet 5.5 토큰 70% → $6.30(30%↓). 75%·70% 지점에 "발표문 숫자와 같아지는 지점(분해 비율은 예시 가정)" 표시. range를 최대(100%)로 올리면 "단가만 바뀐 경우"로 수치가 바뀜.
- 아래: **숫자 카드 분류**. 카드 5장 — "Terminal-Bench 4.0 66.4%", "GDPval-AA 1846", "작업당 40% 저렴", "$4 / $20", "10월 5일 표 1867 ±26". 카드마다 보조 버튼 "누가 쟀나"를 누르면 꼬리표가 열림: 회사 자체 시험(xhigh 노력) / 외부 기관 Artificial Analysis(max 노력) / 회사 자체 시험("Our tests show", 기본 설정) / 공식 가격표 / 외부 공개 표(10월 5일 열람, 실시간 변동).
- 화면 하단 고정 문구: "가격은 2026-10-05 공식 가격표 기준. 과제 토큰 수와 토큰 비율은 예시 값이에요."

### teacherLines
- "새 모델 발표의 숫자는 <b>누가, 어떤 설정으로</b> 쟀는지까지 읽어야 해요."
- "AI 요금은 <b>토큰 수 × 단가</b>예요. 단가가 같아도 같은 일을 더 적은 토큰으로 끝내면 싸져요."

### tip
- body: 새 모델을 학교 업무에 쓸지 정할 때는 발표문 점수 대신 <b>우리 업무 과제 5개</b>로 옛 모델과 새 모델을 나란히 돌려, 결과물과 사용 토큰을 함께 비교해 보세요.
- extra: 비교할 때는 노력 수준 같은 설정을 똑같이 맞추고 날짜를 같이 적어 두세요. 10월 5일 공개 표에서 같은 Opus 5.5도 설정에 따라 600점 넘게 차이 났어요.

### myth
- myth: 점수가 더 높은 모델이 모든 일에서 더 낫다.
- fact: 시험이 바뀌면 순위도 바뀌어요. 9월 발표에서 실무 과제 시험은 Opus 5.5가 2점 앞섰지만 그 차이는 오차 범위(±25 안팎)보다 작았고, 터미널 코딩 시험은 Sonnet 5.5가 4.2%p 앞섰어요.

### sources (4)
- Anthropic — Introducing Claude Opus 5.5 (2026-09-22) https://www.anthropic.com/news/claude-opus-5-5 (가격·"40% less"·"30% faster"·벤치마크 각주의 노력 수준)
- Anthropic — Claude Sonnet 5.5 (2026-09-28) https://www.anthropic.com/claude-sonnet-5-5 (같은 가격, "costs up to 30% less", Terminal-Bench 70.6%, GDPval-AA를 외부 기관이 출시 전 배포본으로 실행)
- Artificial Analysis — GDPval-AA v2.1 Leaderboard (2026-10-05 열람) https://artificialanalysis.ai/evaluations/gdpval-aa (익명 1:1 비교 Elo, 노력 수준별 점수와 ± 범위)
- Hugging Face — EvalEval × UK AISI Evaluation Cards (2026-09-22) https://huggingface.co/blog/evaleval-aisi (비슷한 점수가 다른 조건에서 나올 수 있다는 재현성 문제)
- (대체 가능) Claude 가격표 https://platform.claude.com/docs/en/about-claude/pricing / 모델 개요 https://platform.claude.com/docs/en/about-claude/models/overview

---

## 42편 `t7-gpt6-sol-luna`

- **제목**: 큰 모델과 작은 모델을 함께 내놓는 이유
- **부제**: 모델 티어와 토큰 단가 계산
- **summary**: 9월 22일 OpenAI가 GPT-6 Sol과 GPT-6 Luna를 함께 내놓았고, 29일엔 GPT-6.1 Sol이 나왔어요. 토큰 단가가 정확히 20배 차이 나는 두 모델을 왜 같이 낼까요? 100만 토큰당 가격으로 학교 업무 비용을 직접 계산하고, 작은 모델부터 쓰고 어려운 것만 넘기는 '계단식' 선택법까지 짚어요.
- **keywords**: GPT-6 Sol, GPT-6 Luna, GPT-6.1 Sol, GPT-6 Astra, OpenAI, 모델 티어, 토큰 단가, 100만 토큰당 가격, 입력 토큰, 출력 토큰, 긴 컨텍스트 가격, 배치 할인, 계단식 선택, 캐스케이드, FrugalGPT

### 확인된 사실
1. **Sol·Luna 출시(RSS 확인)**: 제목 "Introducing GPT-6 Sol and Luna", 게시 2026-09-22 18:00 GMT, 요약 "Meet GPT-6 Sol and Luna, two models that bring frontier intelligence to everyday work with different balances of capability and cost." 본문은 403. — https://openai.com/index/introducing-gpt-6-sol-and-luna (RSS: https://openai.com/news/rss.xml)
2. **개발자 changelog 2026-09-22**: 텍스트·이미지 입력을 받는 추론 모델 두 개, Responses·Chat Completions API. 표준 가격(입력 27.2만 토큰까지, 100만 토큰당): GPT-6 Sol "$2 input, $0.20 cached input, and $10 output", GPT-6 Luna "$0.10 input, $0.01 cached input, and $0.50 output". 2026-09-25: 두 모델의 이미지 이해 저하 버그 수정. — https://developers.openai.com/api/docs/changelog (2026-10-05 확인)
3. **GPT-6.1 Sol(RSS 확인 + changelog)**: RSS 게시 2026-09-29 10:00 GMT, 요약 "Meet GPT-6.1 Sol: near-Astra intelligence for coding, computer use, and professional work at one-fifth of Astra's standard API input and output token prices." changelog 2026-09-29: "$2 input, $0.10 cached input, $2.50 cache write, and $10 output"(27.2만 토큰 기준), Responses API에서 다중 에이전트 베타. — https://openai.com/index/introducing-gpt-6-1-sol (RSS), https://developers.openai.com/api/docs/changelog
4. **모델 안내 문서**: GPT-6 Astra "Our most capable model for the most demanding work." / GPT-6.1 Sol "Near-Astra performance for complex work at a lower cost." / GPT-6 Luna "Our most efficient model for focused, high-volume tasks." 세 모델 모두 컨텍스트 105만 토큰, 최대 출력 12.8만 토큰. 고르기 안내: "Start with Astra for complex reasoning, choose Sol to balance capability and cost, or use Luna for cost-sensitive applications requiring high volume processing." — https://developers.openai.com/api/docs/models (날짜 표기 없음, 2026-10-05 확인)
5. **공식 가격표(100만 토큰당, 짧은 컨텍스트 / 긴 컨텍스트)**: Astra 입력 $10/$20, 캐시 입력 $1/$2, 출력 $50/$75. GPT-6.1 Sol 입력 $2/$4, 캐시 $0.10/$0.20, 캐시 쓰기 $2.50/$5, 출력 $10/$15. GPT-6 Sol 입력 $2/$4, 캐시 $0.20/$0.40, 출력 $10/$15. Luna 입력 $0.10/$0.20, 캐시 $0.01/$0.02, 출력 $0.50/$0.75. Batch·Flex는 모두 50% 할인. (짧은/긴 경계는 changelog의 입력 27.2만 토큰) — https://developers.openai.com/api/docs/pricing (날짜 표기 없음, 2026-10-05 확인)
   - 계산값: Sol ÷ Luna = 입력 20배, 출력 20배. Astra ÷ GPT-6.1 Sol = 5배(RSS의 "one-fifth"와 일치). 출력 단가 ÷ 입력 단가 = 5배(네 모델 공통).
6. **다른 회사도 같은 티어 구조**: Claude 가격 문서의 비용 절약 전략 "Choose Haiku for simple tasks, Sonnet for most production workloads, and Opus for the most complex reasoning". — https://platform.claude.com/docs/en/about-claude/pricing (2026-10-05 확인)
7. **외부 평가 표(Artificial Analysis GDPval-AA v2.1, 2026-10-05 열람)**: GPT-6 Sol(Max) 1509 ±25, GPT-6 Luna(Max) 1438 ±22, GPT-6 Sol(Medium) 1350 ±25, GPT-6 Luna(Medium) 1262 ±23, GPT-6.1 Sol(Max) 1575 ±20, GPT-6 Astra(Max) 1542 ±25. — https://artificialanalysis.ai/evaluations/gdpval-aa (실시간 표)
8. **계단식 선택 연구(FrugalGPT)**: LLM API 요금이 "fees that can differ by two orders of magnitude"(100배 수준) 차이. 싼 모델부터 쓰고 필요할 때만 비싼 모델로 넘기는 LLM 캐스케이드로, 연구 실험에서 GPT-4와 비슷한 성능을 최대 98% 낮은 비용으로 내거나 같은 비용으로 정확도를 4% 높였어요. — Chen, Zaharia, Zou, https://arxiv.org/abs/2305.05176 (2023-05-09 제출)
9. **크기와 성능의 관계(배경)**: 언어 모델의 손실(오차)은 모델 크기·데이터 양·계산량에 대해 거듭제곱 법칙으로 예측 가능하게 줄어들어요("The loss scales as a power-law with model size, dataset size, and the amount of compute used for training"). — Kaplan 외, https://arxiv.org/abs/2001.08361 (2020-01-23 제출)
10. **같은 소식의 꼬리(45편으로 넘김)**: 10/1 OpenAI 지원 중단 공지에서 `gpt-5.4-nano`의 대체가 `gpt-6-luna`, `gpt-5.1`·`gpt-5.3-codex`의 대체가 `gpt-6-sol`. — https://developers.openai.com/api/docs/deprecations

### 확인 불가 (쓰지 않기)
- Sol·Luna·Astra의 파라미터 수와 구조: 공식 문서에 없고 기사 본문은 403. **"Luna는 몇 B짜리" 같은 크기 수치 금지.** '큰/작은'은 가격·용도 등급(티어)으로만 말해요.
- OpenAI 발표 본문의 벤치마크 수치: 403으로 미확인.
- GPT-6 Sol(6.1 아님)의 컨텍스트 창: 모델 안내 문서 목록에 GPT-6 Sol이 따로 없어 미확인(105만은 Astra·6.1 Sol·Luna만).
- 각 모델의 실제 응답 속도 수치: 미확인.

### 장면 5개 초안
1. **같은 날 나온 두 모델** (13초): 9월 22일 OpenAI가 GPT-6 Sol과 Luna를 함께 내놓았어요. 공식 요약은 "능력과 비용의 균형이 서로 다른 두 모델". 일주일 뒤 29일엔 최상위 Astra 단가의 5분의 1인 GPT-6.1 Sol이 나왔어요.
   - 무대: 쿼카 point(x 60, y 330). 가격표 box 3개 가로(x 360·640·920, y 130, w 250, h 160): "GPT-6 Luna / $0.10 · $0.50"(aqua), "GPT-6 Sol / $2 · $10"(orange), "GPT-6 Astra / $10 · $50"(ink). 위에 muted 라벨 "100만 토큰당, 입력 · 출력". Luna와 Sol 사이 화살표 + chip "정확히 20배". 아래 chip "9/29 GPT-6.1 Sol: Astra 단가의 1/5".
2. **100만 토큰당 가격 읽는 법** (14초): MTok은 100만 토큰이에요. 입력(보내는 글)과 출력(받는 글)은 단가가 따로이고, 출력이 입력의 5배예요. 학생 소감문 1,000편 분류(입력 150만, 출력 30만 토큰)면 계산하면 Luna로 약 0.3달러, Sol로 약 6달러예요.
   - 무대: 쿼카 think. 계산식 텍스트 2줄(x 360, y 140·220, size 26): "Luna: 1.5 × $0.10 + 0.3 × $0.50 = <em>$0.30</em>", "Sol: 1.5 × $2 + 0.3 × $10 = <em>$6.00</em>". 아래 chip(y 330): "한 번에 27.2만 토큰 넘게 넣으면 입력 단가 2배". 토큰 개념은 `v1-context` 참조.
3. **왜 여러 등급으로 내나** (13초): 공식 안내는 이렇게 나눠요. 가장 어려운 추론은 Astra, 능력과 비용의 균형은 Sol, 정해진 일을 대량으로 할 땐 Luna. 다른 회사 가격 문서도 단순한 일·대부분의 일·가장 복잡한 일로 똑같이 나눠요.
   - 무대: 쿼카 think. 2×2 판(x 380~1180, y 110~520): 가로축 "일의 양", 세로축 "난이도". 칸에 chip: 오른쪽 아래 "대량·단순 → Luna", 가운데 "균형 → Sol", 왼쪽 위 "가장 어려움 → Astra". 아래 muted "Claude 문서도: Haiku · Sonnet · Opus".
4. **점수 차이와 값 차이** (14초): 10월 5일 기준 외부 실무 과제 표에서 최고 노력 수준끼리 비교하면 Sol 1509점, Luna 1438점이에요. 값은 20배인데 점수 차이는 71점이에요. GPT-6.1 Sol은 Astra 단가의 5분의 1로 Astra(1542)보다 높은 1575점이었어요.
   - 무대: 쿼카 point. 왼쪽 막대 쌍 "단가"(Luna 1칸, Sol 20칸 길이), 오른쪽 막대 쌍 "점수"(1438 vs 1509, 거의 같은 길이). 아래 텍스트(y 540): "비싼 등급이 늘 <em>값만큼</em> 더 잘하는 건 아니에요". muted 각주 "GDPval-AA v2.1, 10월 5일 공개 표, 한 가지 시험 기준".
5. **교실 판단: 계단식으로 고르기** (13초): 2023년 연구는 싼 모델로 먼저 해 보고 필요한 것만 비싼 모델로 넘기는 '계단식'으로 비용을 크게 줄였어요. 분류·요약·형식 바꾸기는 작은 등급으로, 평가 기준 설계나 긴 추론은 큰 등급으로 나눠 맡겨요.
   - 무대: 쿼카 wave. 계단 box 2개(x 400 y 380 "Luna로 먼저", x 760 y 220 "어려운 것만 Sol·Astra"), 사이 화살표 dashed. 오른쪽 chip "연구 실험: 비용 최대 98%↓".

### 만져 보기 "학교 업무 토큰 계산기"
- select "업무"(예시 값): ① 학생 소감문 분류(편당 입력 1,500 · 출력 300 토큰) ② 연수 자료 요약(건당 입력 40,000 · 출력 2,000) ③ 루브릭 초안 고쳐 쓰기(회당 입력 8,000 · 출력 2,000).
- range "건수" 100~2,000(기본 1,000).
- 공식 단가 상수(짧은 컨텍스트): Luna $0.10/$0.50, GPT-6 Sol $2/$10, GPT-6.1 Sol $2/$10, Astra $10/$50. 체크박스 "급하지 않음(Batch 50% 할인)".
- primary 버튼 "네 모델로 계산": 모델별 비용 막대 4개와 숫자, "가장 싼 것 대비 몇 배" 표시. 계산값 예: ① 1,000편 → Luna $0.30, Sol $6.00, 6.1 Sol $6.00, Astra $30.00.
- 체크박스 "계단식: 80%는 Luna, 20%만 Sol로 넘기기" → 혼합 비용 표시(① 1,000편 = 0.8×$0.30 + 0.2×$6.00 = $1.44).
- range 최대(2,000)에서 모든 숫자가 두 배로 바뀜. 하단 문구: "가격은 2026-10-05 OpenAI 공식 가격표(입력 27.2만 토큰 이하) 기준. 업무별 토큰 수와 80:20 비율은 예시 값이에요."

### teacherLines
- "AI 값은 <b>100만 토큰당 가격</b>으로 매겨요. 같은 일도 모델 등급에 따라 20배까지 차이 나요."
- "쉬운 일은 <b>작은 등급으로 먼저</b>, 어려운 일만 큰 등급으로 넘겨요."

### tip
- body: 학교 업무에 API를 쓸 때는 같은 과제 20건을 작은 등급과 큰 등급으로 각각 돌려 결과를 비교하고, <b>작은 등급으로 충분한 업무 목록</b>을 만들어 두세요.
- extra: 비용은 입력과 출력을 따로 계산해요. 출력 단가가 입력의 5배라 긴 답을 받는 일이 더 비싸요. 결과가 당장 필요 없으면 배치 처리로 50% 할인을 받을 수 있어요.

### myth
- myth: 작은 등급 모델은 기능을 줄인 체험판이다.
- fact: 대량·반복 업무용으로 따로 내놓은 정식 모델이에요. 10월 5일 외부 표에서 Luna는 단가가 Sol의 20분의 1인데, 최고 노력 수준끼리 점수 차이는 71점이었어요.

### sources (4)
- OpenAI API Changelog https://developers.openai.com/api/docs/changelog (9/22 Sol·Luna 가격, 9/29 GPT-6.1 Sol 가격, 27.2만 토큰 기준)
- OpenAI API Models https://developers.openai.com/api/docs/models (Astra·Sol·Luna 용도 설명과 고르기 안내)
- OpenAI — Introducing GPT-6 Sol and Luna (2026-09-22, RSS 요약 확인) https://openai.com/index/introducing-gpt-6-sol-and-luna
- FrugalGPT (arXiv 2305.05176, 2023) https://arxiv.org/abs/2305.05176 (요금 100배 차이, 계단식 선택)
- (대체 가능) OpenAI Pricing https://developers.openai.com/api/docs/pricing / Artificial Analysis GDPval-AA https://artificialanalysis.ai/evaluations/gdpval-aa

---

## 43편 `t7-argon-staged`

- **제목**: 위험한 능력은 먼저 누구에게 주나
- **부제**: 단계적 공개와 위험 능력 평가
- **summary**: 9월 30일 Google이 Gemini 4 Argon을 발표하면서 일반 공개보다 먼저 검증된 사이버 방어자에게 줬어요. 취약점을 찾아 고치는 능력은 공격에도 쓰일 수 있어요. 그런 능력을 어떻게 재고(위험 능력 평가), 누구에게 어떤 순서로 여는지(단계적 공개)를 공식 발표와 안전 프레임워크로 짚어요.
- **keywords**: Gemini 4 Argon, Google DeepMind, Fairwind, 단계적 공개, staged release, 위험 능력 평가, dangerous capability evaluation, 이중 용도, Frontier Safety Framework, 임계 능력 수준, CCL, 레드팀, 사전 평가, 신뢰 접근, METR

### 확인된 사실
1. **Argon 발표(2026-09-30, Google DeepMind 수석 부사장 Koray Kavukcuoglu)**: 소프트웨어 공학, 법률·금융 같은 기업 지식 업무, 사이버 보안 방어용 프런티어 모델. "Gemini 4 Argon, which is rolling out to a set of trusted cyber defenders through our Fairwind Program." "We are actively engaged in the U.S. government's voluntary process for pre-release model access while we gradually expand access." 더 넓은 공개는 "as soon as possible", "starting with paid API customers and Google AI Ultra subscribers". "For trusted defenders and our own internal teams at Google, we'll be releasing Argon without cyber guardrails so they can leverage its full frontier-level cybersecurity defense capabilities." 능력: "Argon can autonomously find, validate, and patch critical software vulnerabilities." CWE-bench v1(취약점 수정) 68%로 공동 1위, DeepSWE v1.1 77.9%. 안전: "These safeguards underwent robustness testing by internal and external red teams using a combination of manual and automated attack methods." "We are deploying misalignment mitigations that monitor Argon's chain-of-thought and actions and stop execution when necessary." Frontier Safety Framework에 따라 해로운 요청은 거절하되 이중 용도 과학 연구는 지원하도록 설계. 출력 토큰 한도 100만(이전 6.4만). 도입가 100만 토큰당 $2/$10, 이후 $4/$20, 캐시 입력 95% 할인. — https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ (2026-09-30)
2. **Fairwind 프로그램(2026-09-02, Google 보안·개인정보 부사장 Four Flynn)**: "A limited access program for governments and trusted partners to use our most advanced cyber defense capabilities." 참여: Google Cloud 고객, 정부 기관·국가 사이버 당국, 의료·통신·에너지·금융 같은 주요 기반시설 운영자, 핵심 기술 플랫폼, 보안 협력사 — 전 세계 650곳 이상. 발표 당시 제공 도구는 Gemini 3.8 Flash Cyber와 CodeMender. 운영 조건: "limiting access to employees within their internal cybersecurity, incident response, or penetration testing teams and deploying protections like multi-factor authentication." 취지: 먼저 주면 "gives trusted defenders a vital adaptation window to harden their systems before bad actors have a chance to exploit new capabilities." — https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/ (2026-09-02)
3. **Frontier Safety Framework 3판(2025-09-22 게시, 2026-04-17 갱신)**: 임계 능력 수준(CCL) 정의 "Capability levels at which, absent mitigation measures, frontier AI models or systems may pose heightened risk of severe harm." "We conduct safety case reviews prior to external launches when relevant CCLs are reached." 2026년 4월 갱신에서 추적 능력 수준(TCL) 도입: "Introducing a new capability level to help us spot and evaluate potential less extreme risks sooner." — https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/
4. **위험 능력 평가 연구**: Gemini 1.0 모델을 설득·기만, 사이버 보안, 자기 복제(self-proliferation), 자기 추론(self-reasoning) 네 영역에서 시험. 강한 위험 능력은 없었지만 초기 경고 신호를 찾았고, 목적은 "to help advance a rigorous science of dangerous capability evaluation, in preparation for future models." — Phuong 외, https://arxiv.org/abs/2403.13793 (2024-03-20 제출)
5. **같은 주 다른 회사의 방식(Opus 5.5, 2026-09-22)**: "Because Opus 5.5 has extremely strong cyber capabilities, ... most cybersecurity tasks will be re-routed to Opus 4.8." 일상적인 코드 버그 찾기·고치기는 허용. "For cyberdefenders, we'll soon be expanding our Cyber Verification Program to include Opus 5.5. The new program will include three tiers for increasingly permissive trusted access". 생물 분야는 검증된 기관(대학 연구실·스타트업·제약사)이 신청하는 Life Sciences Verification Program. — https://www.anthropic.com/news/claude-opus-5-5 (2026-09-22)
6. **외부 기관의 출시 전 평가(METR, 2026-09-22)**: Claude Opus 5.5를 출시 전에 AI 연구개발 능력 관점에서 과제 5개로 평가, "API access granted over a period of 10 business days". 결론은 이전 모델보다 "modest improvement". 요약문 작성 과정: "We drafted the initial summary, and then Anthropic had the opportunity to review and edit the text." — https://metr.org/blog/2026-09-22-claude-opus-5-5/ (2026-09-22)

### 확인 불가 (쓰지 않기)
- Argon이 Frontier Safety Framework의 CCL(또는 TCL)에 도달했는지: 원문에 없음. **"임계 수준에 도달해서 단계적으로 공개했다"고 단정 금지.** "능력이 공격에도 쓰일 수 있어 검증된 방어자에게 먼저"까지만.
- Fairwind 참여 자격 심사의 세부 절차, Argon 일반 공개 날짜, 미국 정부 사전 접근 절차의 담당 기관명: 원문에 없음.
- Argon 컨텍스트 창 크기와 모델 카드 URL: 발표문에 없음(100만은 출력 한도).
- 언론의 "guardrail-free version" 해석: 원문 문장("without cyber guardrails" — 신뢰할 수 있는 방어자와 Google 내부팀 대상) 범위만 사용.

### 장면 5개 초안
1. **먼저 받은 사람들** (13초): 9월 30일 Google이 Gemini 4 Argon을 발표했어요. 그런데 모두에게 바로 열지 않고, Fairwind 프로그램으로 검증된 사이버 방어자에게 먼저 줬어요. 유료 API 고객과 상위 구독자에게는 "가능한 한 빨리" 넓힌다고 했어요.
   - 무대: 쿼카 point(x 60, y 330). 시간 순 box 3개 가로(x 360·660·960, y 160, w 270, h 140) + 화살표: "1단계 · 검증된 방어자(지금)"(accent orange, on), "2단계 · 유료 API · 상위 구독자"(aqua), "그다음 · 더 넓게"(ink). 위 chip "9월 30일 · Gemini 4 Argon". 아래 텍스트(y 420): "왜 <em>순서</em>를 정했을까요?"
2. **같은 능력, 두 방향** (14초): Argon은 소프트웨어 취약점을 스스로 찾고, 검증하고, 고칠 수 있다고 발표됐어요. 찾는 능력은 고치는 쪽에도, 악용하는 쪽에도 쓰여요. 이걸 '이중 용도'라고 해요. 그래서 방어자가 먼저 시스템을 단단히 할 '적응 기간'을 주는 거예요.
   - 무대: 쿼카 think. 가운데 box "취약점 찾기"(x 560, y 120), 아래로 갈라지는 화살표 2개 → box "고치기(방어)"(x 380, y 380, aqua) / box "악용하기(공격)"(x 820, y 380, orange). 오른쪽 아래 chip "Fairwind: 방어자에게 적응 기간 먼저". 이중 용도는 처음 나올 때 풀기.
3. **위험한 능력은 어떻게 재나** (14초): 2024년 연구는 모델을 설득, 사이버 보안, 스스로 복제하기, 자기 상황 추론 네 영역에서 따로 시험했어요. Google의 안전 프레임워크는 '안전장치 없이는 심각한 해를 줄 수 있는 능력선'을 임계 능력 수준으로 정하고, 그 선에 닿으면 외부 출시 전에 안전성 논증을 검토해요.
   - 무대: 쿼카 think. 가로 게이지(x 380~1180, y 300, 높이 40)에 눈금 2개: "추적 수준(2026년 4월 추가)"(gray), "임계 능력 수준"(orange). 게이지 위 chip 4개(y 160): "설득", "사이버", "자기 복제", "자기 추론". 아래 텍스트(y 440): "선에 닿으면 → <em>출시 전 안전성 검토</em>". 특정 모델이 선을 넘었다고 표시하지 않기.
4. **문을 여는 장치들** (13초): 단계적 공개는 접근을 단계마다 넓히며 의견을 듣고 안전장치를 고치는 방식이에요. Argon은 안팎의 레드팀 시험, 생각 과정·행동 감시, 정부 사전 접근 절차를 함께 밝혔어요. 같은 주 Anthropic도 Opus 5.5의 사이버 작업 대부분을 이전 모델로 돌리고, 검증 단계 3개로 신뢰 접근을 열기로 했어요.
   - 무대: 쿼카 point. box 3개(y 130~): "레드팀(안팎, 수동·자동 공격)", "생각 과정 · 행동 감시 → 필요하면 멈춤", "정부 사전 접근 절차"(모두 accent aqua). 오른쪽 chip(orange) "같은 주: Opus 5.5 사이버 작업은 이전 모델로 · 검증 3단계". 레드팀은 "일부러 공격해 보며 약점을 찾는 시험팀"으로 한 번 풀기.
5. **교실 판단** (13초): 학생이 "그 기능은 왜 아직 못 써요?" 하고 물으면, 공격에도 쓰일 수 있는 능력은 검증된 사람에게 먼저, 감시와 함께 열린다고 설명해요. 새 모델 발표에서는 성능만큼 "누구에게 먼저, 어떤 조건으로"를 읽어요.
   - 무대: 쿼카 wave. 말풍선(tail left, x 340, y 120, w 560): "그 기능은 왜 아직 못 써요?". 아래 chip 2개: "누구에게 먼저", "어떤 조건으로". 오른쪽 아래 box(ink): "막혀 있으면 우회 말고 학교 정보 담당 절차로".

### 만져 보기 "공개 단계 설계판"
- 화면 위 고지: "가상의 모델 X와 예시 값이에요. 실제 회사의 기준이나 점수가 아니에요."
- 고정 평가 결과(예시 값): 사이버 72 / 생물 40 / 설득 35 (0~100), 각 영역의 추적선 50, 임계선 70. 막대와 두 선을 그려 보여 줌(사이버만 임계선 위).
- 체크박스 안전장치 4개: "안팎 레드팀 시험 완료", "생각 과정·행동 감시", "신원 검증 프로그램", "정부 사전 접근 절차".
- primary 버튼 "다음 단계 열기": 단계 0(내부 시험) → 1(외부 기관 사전 평가) → 2(검증된 방어자) → 3(유료 API) → 4(일반 사용자)로 한 칸씩 진행. 각 단계의 관문 규칙(결정적): 임계선을 넘은 영역이 있으면 단계 2 이상은 "레드팀+감시"가 켜져 있어야 통과(아니면 "멈춤: 안전장치 먼저" 로그), 단계 3 이상은 "신원 검증 프로그램"이 켜져 있으면 "사이버 작업은 검증된 사용자만" 제한을 붙인 채 통과, 꺼져 있으면 멈춤. 단계 1에서 "정부 사전 접근 절차"가 켜져 있으면 로그 한 줄 추가. 첫 클릭에 단계 표시와 로그 한 줄이 바로 바뀜.
- 보조 버튼 "처음부터". 로그는 단계별 한 줄(예: "단계 2 통과: 검증된 방어자에게 먼저, 감시 켜짐").

### teacherLines
- "공격에도 쓰일 수 있는 능력은 <b>검증된 방어자에게 먼저</b> 주고, 지켜보면서 문을 넓혀요."
- "새 AI 발표에서는 성능만큼 <b>누구에게 먼저, 어떤 조건으로</b> 주는지도 읽어요."

### tip
- body: 새 모델 발표문에서 '공개 범위' 문단을 찾아, 학교에서 쓰는 계정 등급(무료·유료·기업)이 몇 단계에 해당하는지 확인해 보세요.
- extra: 보안 점검 같은 기능이 학교 계정에서 막혀 있다면 우회하지 말고 학교 정보 담당 절차로 요청하세요. 막혀 있는 이유가 바로 이 단계적 공개예요.

### myth
- myth: 단계적 공개는 큰 고객에게 먼저 파는 마케팅이다.
- fact: Argon은 정부 기관·주요 기반시설 같은 검증된 방어자에게 먼저 갔고, 보안팀 직원만 쓰고 다중 인증을 켜는 조건이 붙었어요. 방어자가 먼저 시스템을 단단히 할 적응 기간을 주려는 장치예요.

### sources (4)
- Google — Gemini 4 Argon (2026-09-30) https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ (Fairwind 우선 공개, 방어자용 설정, 레드팀, 생각 과정 감시)
- Google — Fairwind Program (2026-09-02) https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/ (참여 기관, 운영 조건, 적응 기간)
- Google DeepMind — Strengthening our Frontier Safety Framework (2025-09-22, 2026-04-17 갱신) https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/ (CCL 정의, 출시 전 안전성 검토, TCL)
- Evaluating Frontier Models for Dangerous Capabilities (arXiv 2403.13793, 2024) https://arxiv.org/abs/2403.13793 (네 영역 위험 능력 평가)
- (대체 가능) Anthropic Opus 5.5 https://www.anthropic.com/news/claude-opus-5-5 / METR 사전 평가 https://metr.org/blog/2026-09-22-claude-opus-5-5/

---

## 44편 `t7-prompt-caching`

- **제목**: 같은 앞부분을 다시 계산하지 않는 트릭
- **부제**: KV 캐시와 프롬프트 캐싱
- **summary**: 9월 셋째 주 Kimi K3(9/18), GPT-6(9/22), Claude Opus 5.5(9/22)가 잇따라 '캐시' 기능과 가격을 내세웠어요. 모델이 앞부분을 읽으며 만든 계산 결과를 저장했다가 다음 요청에서 다시 쓰는 원리, 앞부분이 한 글자만 달라도 캐시가 깨지는 이유, 학교 업무에서 순서만 바꿔 비용을 줄이는 법까지.
- **keywords**: 프롬프트 캐싱, prompt caching, KV 캐시, 키·값, 어텐션, 접두사 일치, 캐시 적중, 캐시 쓰기, 캐시 읽기, TTL, 유효 시간, cache_control, cached_tokens, Kimi K3, GPT-6, Claude Opus 5.5, Gemini 4 Argon

### 확인된 사실
1. **Kimi K3(2026-09-18, AWS)**: Moonshot AI의 Kimi K3가 Amazon Bedrock에서 정식 제공. 파라미터 2.8조, 컨텍스트 100만 토큰. "Kimi K3 is the first open weight model on Amazon Bedrock to support explicit prompt caching, helping reduce latency and input costs when reusing context across model calls." — https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/ (2026-09-18)
2. **GPT-6 캐싱 개선(RSS 확인)**: 제목 "Better prompt caching for GPT-6", 게시 2026-09-22 21:00 GMT, 요약 "Learn how GPT-6 improves prompt caching with higher cache hit rates, new diagnostics, explicit breakpoints, and controls that reduce latency and costs." 본문 403. — https://openai.com/index/better-prompt-caching-for-gpt-6 (RSS: https://openai.com/news/rss.xml)
3. **OpenAI 프롬프트 캐싱 문서**: "Prompt caching reuses work when requests share the same prompt prefix." 이점은 계산 절약, "Cheaper input tokens (discounted up to 95%)", 더 빠름. "Prompt caching is enabled by default for supported OpenAI models." "Cache reuse requires the entire rendered prefix to match. If content or a relevant setting changes before a breakpoint, the prefix after that change cannot match the existing cache entry." GPT-5.6 이후 모델은 보이는 입력 1,024토큰 이상부터 캐싱, 최소 30분 유지(`ttl: "30m"`), 명시적 중단점 `prompt_cache_breakpoint`(요청당 캐시 쓰기 최대 4개). 요청은 앞부분 토큰의 해시(와 선택적 `prompt_cache_key`)로 보내지고, 저장된 상태는 개별 기계에 있어요. "Caches are not shared across organizations and cannot be reused across regional processing boundaries." 사용량의 `cached_tokens`로 재사용 토큰 확인. 캐시 쓰기 1.25배, 읽기 0.1배(GPT-6.1 Sol 0.05배). 권장: 고정 지시문과 공유 참고자료를 앞에. — https://developers.openai.com/api/docs/guides/prompt-caching (날짜 표기 없음, 2026-10-05 확인)
4. **OpenAI 가격표(100만 토큰당)**: GPT-6 Sol 입력 $2 / 캐시 입력 $0.20 / 캐시 쓰기 $2.50, GPT-6.1 Sol 캐시 입력 $0.10, Luna 입력 $0.10 / 캐시 $0.01. — https://developers.openai.com/api/docs/pricing (2026-10-05 확인)
5. **Claude 프롬프트 캐싱 문서**: 과정 — 지정한 캐시 중단점까지의 접두사(앞부분)가 최근 요청에서 캐시돼 있으면 그걸 쓰고, 없으면 전체를 처리한 뒤 접두사를 캐시해요. 접두사 순서는 `tools` → `system` → `messages`. `cache_control` 중단점 최대 4개. 기본 유효 시간 5분, 1시간 선택 가능(쓰기 2배). "The lifetime is measured from the start of the request that writes or reads the cache entry." 쓰기 1.25배, 읽기 0.1배(Opus 5.5는 0.05배). 최소 길이: Opus 5.5·Sonnet 5.5는 512토큰. 무효화 예: 도구 정의가 바뀌면 tools·system·messages 캐시가 모두 무효. 흔한 실수: 매번 바뀌는 블록(시각 등)에 중단점을 두는 것. 사용량 필드 `cache_creation_input_tokens`, `cache_read_input_tokens`, `input_tokens`(마지막 중단점 뒤). 자동 캐싱은 대화가 길어지면 중단점을 앞으로 옮겨요. 권장: "Place cached content at the prompt's beginning for best performance". — https://platform.claude.com/docs/en/build-with-claude/prompt-caching (날짜 표기 없음, 2026-10-05 확인)
6. **Claude 가격표**: Opus 5.5 입력 $4, 5분 캐시 쓰기 $5, 캐시 읽기 $0.20(입력가의 5%). Sonnet 5.5 입력 $2, 쓰기 $2.50, 읽기 $0.20. "caching pays off after one cache read for the 5-minute duration (1.25x write), or after two cache reads for the 1-hour duration (2x write)." 캐시 읽기는 유효 시간도 새로 고침("Cache hits and refreshes"). — https://platform.claude.com/docs/en/about-claude/pricing (2026-10-05 확인)
7. **Gemini 4 Argon(2026-09-30)**: 캐시 입력 토큰은 표준 단가에서 95% 할인. — https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
8. **KV 캐시 원리(Hugging Face Transformers 문서 "How caching works")**: 1000번째 토큰을 예측하려면 앞 999개 토큰의 정보가 필요해요. KV 캐시는 "storing kv pairs derived from the attention layers of previously processed tokens"로 다시 계산하지 않게 해요. 인과적 어텐션에서는 한 번 처리한 토큰의 표현이 뒤 토큰 때문에 바뀌지 않으므로 과거 키(K)·값(V)을 저장해 재사용할 수 있고, 매 단계 새 토큰의 k·v만 계산해 붙여요. 캐시는 층마다 따로. 캐시 없으면 매 단계 앞의 K·V를 모두 다시 계산하고, 캐시가 있으면 메모리는 길이에 비례해 늘지만 토큰당 계산은 적어요. — https://huggingface.co/docs/transformers/cache_explanation (날짜 표기 없음, 2026-10-05 확인)
9. **요청 사이의 KV 캐시 공유(서빙 연구)**: 요청마다 KV 캐시 메모리가 "huge and grows and shrinks dynamically", 제안한 시스템(vLLM)은 "flexible sharing of KV cache within and across requests". — Kwon 외, https://arxiv.org/abs/2309.06180 (2023-09-12 제출)

### 확인 불가 (쓰지 않기)
- "Better prompt caching for GPT-6" 본문의 수치(적중률이 몇 % 올랐는지 등): RSS 요약만 확인.
- Kimi K3의 캐시 가격: AWS 공지에 없음.
- **회사 문서가 프롬프트 캐싱을 "KV 캐시를 서버에 저장하는 것"이라고 명시했는지**: OpenAI·Anthropic 문서는 "reuses work", "cached states", "resume from specific prefixes"라고만 써요. 자막에서 "OpenAI가 KV 캐시를 저장한다고 밝혔다"처럼 회사 발언으로 만들지 말고, "앞부분을 읽은 계산 결과(KV 캐시 같은 중간 상태)를 다시 쓰는 원리"로, 근거는 HF 문서와 2023년 서빙 연구로 말해요.

### 장면 5개 초안
1. **9월에 쏟아진 '캐시' 가격** (13초): 9월 18일 Kimi K3가 클라우드에서 명시적 프롬프트 캐싱을 지원했고, 22일 OpenAI는 GPT-6의 캐싱 개선을, 같은 날 Anthropic은 Opus 5.5 캐시 읽기를 입력 단가의 5%로 발표했어요. 30일 Gemini 4 Argon도 캐시 입력 95% 할인이에요. 캐시가 뭐길래 값이 20분의 1일까요?
   - 무대: 쿼카 point(x 60, y 330). 날짜 줄(x 360~1200, y 140)에 chip 4개: "9/18 Kimi K3 · 명시적 캐싱", "9/22 GPT-6 · 캐싱 개선", "9/22 Opus 5.5 · 캐시 읽기 $0.20", "9/30 Argon · 캐시 95%↓". 아래 막대 비교(y 380): "입력 $4" 긴 막대 vs "캐시 읽기 $0.20" 짧은 막대(Opus 5.5).
2. **앞 글자를 읽으며 쌓는 메모, KV 캐시** (14초): 모델은 글을 토큰 단위로 읽으며 층마다 '키'와 '값'이라는 숫자 묶음을 만들어요. 다음 토큰을 만들 땐 앞 토큰들의 키·값을 다시 봐야 해요. 이걸 저장해 두면 새 토큰 것만 계산하면 돼요. 이게 KV 캐시예요.
   - 무대: 쿼카 think. 토큰 칸 6개 가로(x 380~1080, y 160, 각 w 100): "학교", "규정", "제", "3", "조", "?"(마지막은 orange). 각 칸 아래 작은 chip 2개 "K" "V"(앞 5개는 aqua '저장됨', 마지막만 새로 계산). 아래 텍스트(y 420): "저장한 K·V는 <em>다시 계산하지 않아요</em>". 어텐션은 "앞 토큰 중 무엇을 참고할지 정하는 계산"으로 한 줄 풀기.
3. **요청 사이에 다시 쓰기, 프롬프트 캐싱** (14초): 다음 질문도 앞부분이 똑같다면, 그 계산 결과를 서버에 잠깐 남겨 두었다가 다시 써요. 조건은 앞부분이 처음부터 그 지점까지 정확히 같을 것. 최소 길이(512~1,024토큰)와 유효 시간(5분, 1시간, 최소 30분)이 있어요.
   - 무대: 쿼카 point. 요청 막대 2줄(x 360~1200, y 150·280): [지시 1천][규정집 2.9만][질문 A] / [지시][규정집][질문 B]. 앞 두 칸은 aqua 테두리 + chip "적중: 다시 씀", 마지막 칸 orange "새로 계산". 아래 chip 2개(y 430): "앞부분 정확히 일치", "유효 시간 안에".
4. **한 글자만 달라도 깨져요** (13초): 맨 앞에 오늘 날짜나 시각을 넣으면 앞부분이 매번 달라져 캐시가 한 번도 맞지 않아요. 고정된 것(도구 정의·지시문·참고자료)은 앞에, 바뀌는 것(질문·날짜)은 뒤에 둬요. 캐시 쓰기는 입력가의 1.25배, 읽기는 0.1배라서, 5분 캐시는 한 번만 다시 읽어도 이득이에요.
   - 무대: 쿼카 oops. 윗줄 막대 [시각 14:02][지시][규정집][질문] → 첫 칸 orange, 나머지 회색 + chip "매번 실패". 아래 줄(화살표로 순서 바꿈) [지시][규정집][질문][시각] → 앞 두 칸 aqua + chip "적중". 오른쪽 아래 작은 표: "쓰기 1.25배 / 읽기 0.1배".
5. **교실 판단** (13초): 학교 규정집이나 교육과정 문서를 바탕으로 질문을 여러 개 할 때는 같은 자료를 같은 순서로 앞에 두고, 질문만 바꿔 유효 시간 안에 이어서 보내요. 캐시는 우리 조직 안에서만 다시 쓰이고 다른 조직과 섞이지 않아요.
   - 무대: 쿼카 wave. 체크 chip 3개 세로(x 380, y 140·230·320): "고정 자료는 앞에", "질문·날짜는 뒤에", "유효 시간 안에 이어서". 오른쪽 box(ink, x 820, y 160): "캐시는 우리 조직 안에서만".

### 만져 보기 "캐시 적중 시뮬레이터"
- 고정 프롬프트 블록(예시 값): 지시문 1,000토큰 + 학교 규정집 29,000토큰(고정 접두사 3만) + 질문 200토큰. 단가 상수는 Claude Sonnet 5.5 공식가: 입력 $2, 5분 캐시 쓰기 $2.50, 캐시 읽기 $0.20(100만 토큰당), 유효 시간 5분(읽을 때마다 새로 고침).
- 라디오 "블록 순서": ① 고정 자료 먼저(기본) ② 질문을 맨 앞에 ③ 맨 앞에 시각 넣기.
- range "질문 사이 간격(분)" 1~10, 기본 2.
- primary 버튼 "질문 10개 보내기": 요청 10줄 로그(적중/쓰기/실패, 캐시에서 읽은 토큰, 요청 비용)와 합계, "캐시 없이 보냈다면" 비교 표시.
  - 계산값: 캐시 없음 = 10 × 30,200 × $2/100만 = $0.604. ① + 간격 5분 이하: 1번 = 쓰기 3만×$2.50 + 질문 200×$2 = $0.0754, 2~10번 = 읽기 3만×$0.20 + 200×$2 = 각 $0.0064 → 합계 약 $0.133(약 78% 절감). ② 또는 ③, 또는 간격 6분 이상: 매번 쓰기만 반복 → 10 × $0.0754 = $0.754(캐시 없음보다 약 25% 비쌈 → "쓰기 값만 내고 한 번도 못 읽었어요").
- range를 최대(10분)로 올리면 로그가 전부 "만료 → 다시 쓰기"로 바뀜.
- 하단 문구: "단가는 2026-10-05 Claude 공식 가격표 기준. 블록 길이와 질문 수는 예시 값이에요."

### teacherLines
- "AI는 같은 앞부분을 <b>한 번만 계산</b>해 두고, 다음 질문 때 꺼내 써요."
- "고정된 자료는 <b>앞에</b>, 바뀌는 질문은 <b>뒤에</b> 두면 더 빠르고 싸져요."

### tip
- body: 학교 업무용 챗봇이나 자동화를 만들 때는 지시문·규정집·교육과정 문서 같은 고정 자료를 <b>프롬프트 맨 앞</b>에 두고, 날짜·질문처럼 바뀌는 내용은 맨 뒤에 붙이세요.
- extra: 응답의 사용량 기록에서 캐시로 읽은 토큰 수(`cached_tokens`, `cache_read_input_tokens`)가 0이 아닌지 보면 실제로 적중했는지 알 수 있어요.

### myth
- myth: 캐시가 되면 AI가 예전 답을 저장해 두었다가 그대로 돌려준다.
- fact: 답은 매번 새로 만들어요. 다시 쓰는 건 같은 앞부분을 읽으며 만든 계산 결과뿐이고, 앞부분이 한 글자라도 다르면 그 지점부터 다시 계산해요.

### sources (4)
- Claude Docs — Prompt caching https://platform.claude.com/docs/en/build-with-claude/prompt-caching (접두사·중단점·5분/1시간·쓰기 1.25배·읽기 0.1배·무효화)
- OpenAI API — Prompt caching guide https://developers.openai.com/api/docs/guides/prompt-caching (기본 활성, 접두사 전체 일치, 조직 간 공유 안 됨, 최대 95% 할인)
- Hugging Face Transformers — How caching works https://huggingface.co/docs/transformers/cache_explanation (KV 캐시: 앞 토큰의 키·값 저장과 재사용)
- AWS — Kimi K3 on Amazon Bedrock (2026-09-18) https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/ (오픈 웨이트 첫 명시적 캐싱)
- (대체 가능) vLLM / PagedAttention (arXiv 2309.06180, 2023) https://arxiv.org/abs/2309.06180 / OpenAI RSS "Better prompt caching for GPT-6" https://openai.com/index/better-prompt-caching-for-gpt-6

---

## 45편 `t7-model-retirement`

- **제목**: 어제 쓰던 AI가 사라지는 이유
- **부제**: 모델 수명주기, 사전 고지, 데이터 내보내기
- **summary**: 9월 24일 Sora 2 API가 문을 닫았고, 9월 30일과 10월 1일에는 Claude Sonnet 4.5와 GPT-5.x 일부의 은퇴 날짜가 공지됐어요. 모델이 '현역 → 레거시 → 지원 중단 예고 → 은퇴'로 가는 수명주기, 몇 달 전에 알려 주는 규칙, 수업 자료와 대화 기록을 지키는 내보내기까지 공식 문서로 짚어요.
- **keywords**: 모델 은퇴, 지원 중단, deprecation, retirement, shutdown, 수명주기, Active, Legacy, Deprecated, Retired, 사전 고지, 스냅샷, 모델 ID, Sora 2, Claude Sonnet 4.5, GPT-5.1, 데이터 내보내기, 가중치 보존

### 확인된 사실
1. **OpenAI 지원 중단 문서 — 정책**: "Deprecation"은 모델·엔드포인트를 은퇴시키는 과정으로 공지 즉시 효력, "Sunset"·"shut down"은 더 이상 쓸 수 없는 상태, "Legacy"는 업데이트가 끝난 모델. 최소 고지 기간: 정식(GA) 모델 "at least 6 months", 특화 변형 "at least 3 months", 미리보기(preview) 모델은 "much shorter notice, such as 2 weeks". 영향받는 고객에게 이메일과 문서로 알리고, 큰 변화는 블로그로도. — https://developers.openai.com/api/docs/deprecations (2026-10-05 확인)
2. **Sora 2 API 종료**: 공지 2026-03-24, 종료 2026-09-24. 대상 Videos API, `sora-2`, `sora-2-pro`, `sora-2-2025-10-06`, `sora-2-2025-12-08`, `sora-2-pro-2025-10-06`. 대체 모델 표기 없음. — 같은 URL
3. **OpenAI 2026-10-01 공지**: 종료 2027-04-01(6개월 고지). `gpt-5.3-codex` → `gpt-6-sol`, `gpt-5.1` → `gpt-6-sol`, `gpt-5.4-nano` → `gpt-6-luna`. — 같은 URL
4. **Anthropic 지원 중단 문서**: 수명주기 4단계 — "**Active:** The model is fully supported and recommended for use." / "**Legacy:** The model will no longer receive updates and may be deprecated in the future." / "**Deprecated:** The model is still functional but no longer recommended. Anthropic provides a recommended replacement and assigns a retirement date." / "**Retired:** The model is no longer available for use. Requests to retired models will fail." 고지: 공개 모델은 은퇴 "at least 60 days' notice", 이메일과 문서. 2026-09-30 공지: `claude-sonnet-4-5-20250929` 은퇴 2026-11-30, 대체 `claude-sonnet-5-5`. 현역 모델 표의 "Not sooner than" 날짜: Opus 5.5 2027-09-22, Sonnet 5.5 2027-09-28(빨라도 그 이후). 이유: "Anthropic currently deprecates and retires models to ensure capacity for new model releases." 인정한 단점: 특정 모델을 아끼는 사용자의 이전 부담, 연구자의 비교 연구 중단, 안전·모델 복지 관련 위험. 점검법: 콘솔 Usage에서 Export → API 키·모델별 사용 CSV. 권장: 은퇴일 훨씬 전에 새 모델로 시험. 날짜는 Anthropic이 운영하는 플랫폼 기준(Bedrock·Google Cloud는 자체 일정). — https://platform.claude.com/docs/en/about-claude/model-deprecations (2026-10-05 확인)
5. **모델 ID = 고정 스냅샷**: "Every Claude model ID is a pinned snapshot, including the dateless IDs used from the 4.6 generation on." — https://platform.claude.com/docs/en/about-claude/models/overview (2026-10-05 확인)
6. **가중치 보존 약속(2025-11-04)**: 공개 출시한 모든 모델의 가중치를 회사가 존속하는 동안 보존("preserving the weights of all publicly released models"). 은퇴 때 보존 보고서와 모델 인터뷰 진행. — https://www.anthropic.com/research/deprecation-commitments (2025-11-04)
7. **대화 기록 내보내기(Claude 지원 문서, 2026-07-08 갱신)**: 개인 Free·Pro·Max 사용자는 웹·데스크톱 앱에서 설정 → 개인정보(Privacy) → "Export data". 처리되면 메일로 다운로드 링크, "The download link will expire 24 hours after delivery." 모바일 앱에서는 불가. 대화 데이터와 계정 정보 포함. Team·Enterprise는 조직의 Primary Owner만 내보내기 가능. 내보낸 데이터는 다른 개인 계정으로 가져오기 불가. — https://support.claude.com/en/articles/9450526-export-your-claude-data (2026-07-08 갱신)

### 확인 불가 (쓰지 않기)
- Sora 웹·앱 종료일(4/26), sora.chatgpt.com/sunset 내보내기, 기간 후 영구 삭제, 남은 크레딧 처리: 출처 help.openai.com이 오늘 403. **쓰지 않기.** Sora는 "API 종료"만.
- OpenAI가 Sora 2 API를 종료한 이유: 문서에 없음.
- ChatGPT·Claude 앱 화면에서 해당 모델이 언제 사라지는지: 확인한 문서는 API 기준. "API에서" 은퇴라고 범위를 밝혀요.
- OpenAI 대화 기록 내보내기 절차: help.openai.com 403으로 미확인. 내보내기 예시는 Claude 문서만.

### 장면 5개 초안
1. **9월 24일, 문을 닫은 영상 API** (13초): 9월 24일 OpenAI의 Sora 2 API가 종료됐어요. 3월 24일에 미리 공지한 날이에요. 이어서 9월 30일 Anthropic은 Claude Sonnet 4.5를 11월 30일에, 10월 1일 OpenAI는 GPT-5.1 등을 내년 4월 1일에 API에서 은퇴시킨다고 알렸어요.
   - 무대: 쿼카 oops(x 60, y 330). 달력 줄(x 360~1200, y 170) 위 표식 3개: "9/24 Sora 2 API 종료"(orange, on), "11/30 Claude Sonnet 4.5 은퇴 예정"(aqua), "2027-04-01 GPT-5.1 등 종료 예정"(ink). 아래 텍스트(y 430): "쓰던 모델이 <em>사라지는 날</em>이 있어요".
2. **모델의 일생 네 칸** (14초): 현역(완전 지원) → 레거시(업데이트 끝) → 지원 중단 예고(아직 돌아가지만 대체 모델과 은퇴일이 정해짐) → 은퇴(요청하면 실패). 지원 중단(deprecation)은 '은퇴 예고'라고 생각하면 돼요.
   - 무대: 쿼카 think. box 4개 가로(x 340·560·780·1000, y 180, w 200, h 150) + 화살표: "현역 Active", "레거시 Legacy", "지원 중단 Deprecated", "은퇴 Retired"(마지막 orange, icon x). 각 box sub 한 줄("완전 지원", "업데이트 끝", "대체·날짜 지정", "요청 실패"). 아래 chip(y 420) "Claude Sonnet 4.5: 지금 셋째 칸".
3. **몇 달 전에 알려 줄까** (13초): OpenAI는 정식 모델 최소 6개월, 특화 모델 3개월, 미리보기는 2주 정도로 짧을 수 있다고 정해 뒀어요. Anthropic은 공개 모델 최소 60일이에요. 실제로 Sora 2는 6개월, Sonnet 4.5는 계산하면 61일 전에 공지됐어요.
   - 무대: 쿼카 point. 가로 막대 4개(x 400 시작, y 140~440): "정식 6개월"(긴 막대), "특화 3개월", "미리보기 약 2주"(아주 짧게, orange), "Anthropic 최소 60일". 오른쪽 chip 2개: "Sora 2: 3/24 → 9/24", "Sonnet 4.5: 9/30 → 11/30".
4. **왜 은퇴시키고, 무엇이 남나** (14초): Anthropic 문서는 새 모델을 위한 처리 용량을 확보하려고 은퇴시킨다고 밝히고, 사용자 이전 부담과 연구 단절 같은 단점도 적었어요. 그래서 공개 모델 가중치는 회사가 있는 동안 보존한다고 약속했어요. 모델 ID는 '고정된 스냅샷'이라 같은 ID면 같은 모델이고, 은퇴하면 그 ID로 보낸 요청은 실패해요.
   - 무대: 쿼카 think. box 3개(y 130): "이유: 새 모델 처리 용량", "단점도 인정: 이전 부담 · 연구 단절", "약속: 가중치 보존(2025년 11월)". 아래 mono chip(y 400): "claude-sonnet-4-5-20250929 = 고정 스냅샷". 스냅샷은 "그 시점 그대로 얼려 둔 모델 버전"으로 한 번 풀기.
5. **교실 판단: 기록 남기고 갈아탈 준비** (13초): 수업 자료에 AI 결과를 쓸 땐 날짜와 모델 이름을 같이 적어요. 은퇴 공지가 오면 은퇴일 전에 대체 모델로 같은 과제를 돌려 보고, 아끼는 대화 기록은 미리 내보내요. 학교 팀 계정은 소유자만 내보낼 수 있어요.
   - 무대: 쿼카 wave. 체크 chip 3개 세로(x 380, y 140·230·320): "날짜 · 모델 이름 기록", "은퇴일 전 대체 모델 시험", "대화 기록 내보내기". 오른쪽 box(ink): "Claude: 설정 → 개인정보 → 데이터 내보내기 / 링크 24시간".

### 만져 보기 "은퇴 달력 점검표"
- 고정 표(모두 확인된 값): `sora-2`(공지 2026-03-24, 종료 2026-09-24, 대체 없음) / `claude-sonnet-4-5-20250929`(공지 2026-09-30, 은퇴 2026-11-30, 대체 `claude-sonnet-5-5`) / `gpt-5.1`(공지 2026-10-01, 종료 2027-04-01, 대체 `gpt-6-sol`) / `gpt-5.4-nano`(같은 날, 대체 `gpt-6-luna`) / `claude-sonnet-5-5`(현역, 은퇴는 빨라도 2027-09-28).
- range "기준 날짜" 2026-09-01 ~ 2027-10-01(하루 단위), 기본 2026-09-01. 각 행에 상태 chip(현역 / 지원 중단 예고 / 은퇴)과 "은퇴까지 D-n" 표시. 공지일 전이면 현역, 공지일~은퇴일 전이면 예고, 은퇴일 이후면 은퇴. `claude-sonnet-5-5`는 2027-09-28 이후에도 "은퇴 가능 시기 — 공지 확인"으로만 표시('빨라도'는 은퇴 확정이 아님).
- primary 버튼 "오늘(2026-10-05)로 점검": 기준 날짜를 10월 5일로 바꿔 상태가 바로 바뀜(Sora 2 은퇴, Sonnet 4.5·GPT-5.1·5.4-nano 예고).
- 행을 고르면 아래 체크리스트(체크박스): "대체 모델로 같은 과제 미리 돌리기", "수업 자료의 모델 이름 고치기", "대화 기록 내보내기". 체크 상태는 저장하지 않음.
- range 최대(2027-10-01)에서 Sora 2·Sonnet 4.5·GPT-5.1·5.4-nano 모두 은퇴로 바뀜.
- 하단 문구: "날짜는 2026-10-05 기준 OpenAI·Anthropic의 API 지원 중단 문서예요. 앱 화면의 일정은 각 회사 공지에서 따로 확인하세요."

### teacherLines
- "AI 모델에도 <b>은퇴 날짜</b>가 있어요. 정식 모델은 보통 몇 달 전에 미리 알려 줘요."
- "수업에 AI 결과를 쓸 땐 <b>날짜와 모델 이름</b>을 같이 적어 두면, 모델이 바뀌어도 다시 확인할 수 있어요."

### tip
- body: 업무에 쓰는 AI의 공지 메일과 '지원 중단' 문서를 학기마다 한 번 확인하고, 은퇴 예고가 뜨면 <b>은퇴일 전에 대체 모델로 같은 과제</b>를 미리 돌려 보세요.
- extra: 아끼는 대화 기록은 미리 내보내 두세요. Claude는 설정 → 개인정보 → 데이터 내보내기로 받고, 메일로 온 링크는 24시간 뒤 만료돼요. 학교 팀 계정은 소유자만 내보낼 수 있어요.

### myth
- myth: 돈 내고 쓰는 정식 모델은 언제까지나 그대로 쓸 수 있다.
- fact: 정식 모델도 은퇴해요. 회사들은 최소 60일(Anthropic)에서 6개월(OpenAI 정식 모델) 전에 알리고, 은퇴일이 지나면 그 모델 ID로 보낸 요청은 실패해요.

### sources (4)
- OpenAI API — Deprecations https://developers.openai.com/api/docs/deprecations (고지 기간 정책, Sora 2 API 2026-03-24 공지 → 09-24 종료, 10-01 공지)
- Claude Docs — Model deprecations https://platform.claude.com/docs/en/about-claude/model-deprecations (수명주기 4단계, 최소 60일, Sonnet 4.5 → 11-30)
- Claude Help — Export your Claude data (2026-07-08 갱신) https://support.claude.com/en/articles/9450526-export-your-claude-data
- Anthropic — Commitments on model deprecation and preservation (2025-11-04) https://www.anthropic.com/research/deprecation-commitments
- (대체 가능) Claude 모델 개요(고정 스냅샷) https://platform.claude.com/docs/en/about-claude/models/overview

---

## 46편 `t7-solar-mini4-moe`

- **제목**: 350억인데 30억만 일하는 모델
- **부제**: 전문가 혼합(MoE)의 라우터와 활성 파라미터
- **summary**: 10월 1일 업스테이지가 처음부터 직접 사전학습한 에이전트용 소형 모델 Solar Mini 4를 공개했어요. 전체 350억(35B) 파라미터 중 토큰마다 30억(3B)만 일해요. 라우터가 점수를 매겨 전문가를 고르는 방식, 일이 한쪽에 몰리지 않게 하는 장치, '계산은 작지만 메모리는 전부 필요하다'는 점까지 짚어요.
- **keywords**: Solar Mini 4, 업스테이지, Upstage, 전문가 혼합, MoE, Mixture of Experts, 라우터, 게이트, 소프트맥스, 상위 k, top-k, 활성 파라미터, 전체 파라미터, 부하 균형, 보조 손실, Switch Transformer, 메모리, 512K 컨텍스트

### 확인된 사실
1. **Solar Mini 4 공개(2026-10-01, 업스테이지 공식 블로그)**: "an agent-optimized model pretrained from the ground up by Upstage" — 정보 검색, 정해진 형식의 출력, 도구 사용 같은 반복 작업용. "The model has 35B total parameters while activating only 3B per token." "Supports up to 512K tokens of context and up to 128K output tokens." "Solar Mini 4 scored 24.1 on the Artificial Analysis Intelligence Index v4.3.2." 비교에 넣은 활성 3B 모델 중 가장 높은 점수라고 밝힘. "Compared with Gemma 4 31B, which has 31B active parameters, Solar Mini 4 activates roughly one-tenth as many parameters while scoring 9.1 points higher on the AA Index." 세부: AA-LCR(긴 문맥 추론) 83.3%, SciCode 47.6%, Humanity's Last Exam 25.8%, AutomationBench-AA 22.3%, τ³-Banking 47.2. 속도(사내 시험): "In internal testing, Solar Mini 4 sustained more than 70 tokens per second per request while processing 32 concurrent requests on two H100 GPUs." 한국어: "This was an initial internal test consisting of three Korean-language tasks, each run three times per model with temperature=0." 가격(100만 토큰당) 입력 $0.10, 캐시 입력 $0.01, 출력 $0.40, 10월 10일(UTC)까지 70% 할인. 제공: Upstage Console API, Solar Chat, OpenRouter, 온프레미스(자체 서버 설치) 지원. — https://www.upstage.ai/blog/en/solar-mini-4 (2026-10-01)
   - 같은 소식은 `S777_NEWS_KR_POLICY.md` 45행과 일치.
2. **희소 게이트 MoE의 출발(2017)**: 수천 개의 피드포워드 하위 신경망(전문가)과 학습되는 게이트 신경망이 예시마다 전문가 몇 개의 조합만 골라 쓰는 층. "greater than 1000x improvements in model capacity with only minor losses in computational efficiency", 최대 1,370억 파라미터 모델로 언어 모델링·번역 실험. — Shazeer 외, https://arxiv.org/abs/1701.06538 (2017-01-23 제출)
3. **Switch Transformer(2021)**: 기존 모델은 "reuse the same parameters for all inputs"인데, MoE는 "selects different parameters for each incoming example". 라우팅을 전문가 1개(top-1)만 고르는 방식으로 단순화해 계산량은 일정하게 유지하면서 파라미터를 키움. "up to 7x increases in pre-training speed with the same computational resources", 1조 파라미터 모델까지 학습, 학습 불안정 문제와 bfloat16 저정밀 학습 해결. — Fedus, Zoph, Shazeer, https://arxiv.org/abs/2101.03961 (2021-01-11 제출, 2022-06-16 v3)
4. **MoE 해설(Hugging Face, 2023-12-11)**: 메모리 — "all parameters need to be loaded in RAM, so memory requirements are high"(토큰마다 일부만 쓰더라도 전체가 메모리에 있어야 함). 라우터(게이트) — 학습되는 가중치로 토큰을 전문가에게 보내며, 소프트맥스 게이팅 G(x) = Softmax(x·Wg)와 잡음을 더한 뒤 상위 k개만 남기는 방식. 부하 균형 — 학습 중 라우터가 같은 몇 전문가만 고르는 쪽으로 쏠리기 쉬워 "giving all experts equal importance"를 위한 보조 손실을 둠. 전문가의 특화 — 연구에서 인코더 전문가가 "specialize in a group of tokens or shallow concepts"(구두점, 고유명사 등)에 특화되고, 과목·언어 단위로 나뉘지 않음. Mixtral 8x7B는 추론 속도가 12B 모델과 비슷. — https://huggingface.co/blog/moe (2023-12-11)
5. **계산값(집필 시 "계산하면"으로 표기)**: 3B ÷ 35B ≈ 8.6% → "열에 하나 정도만 일해요". 가중치를 16비트(2바이트)로 저장한다고 치면 35B × 2바이트 ≈ 70GB, 같은 조건의 3B 모델은 약 6GB. (업스테이지는 저장 정밀도를 밝히지 않았으므로 반드시 "16비트로 친다면"을 붙임)

### 확인 불가 (쓰지 않기)
- Solar Mini 4의 전문가 수, 토큰당 고르는 전문가 수, 라우팅 방식, 층 수: 원문에 없음. **만져 보기의 전문가 8개·상위 2개는 "예시"로 표시.**
- 가중치 공개 여부·라이선스: 원문에 없음. **"오픈 웨이트", "내려받아 쓸 수 있다" 금지.** 온프레미스 지원까지만.
- 사전학습 데이터 양(토큰 수): 원문에 없음.
- 한국어 내부 시험의 세부 점수: 이번 확인에서 수치를 확보하지 못함. "회사 내부 초기 시험으로 한국어 과제 3개를 3번씩 돌렸다"까지만.
- 실제 필요한 메모리: 정밀도 미공개라 70GB는 가정 계산일 뿐.

### 장면 5개 초안
1. **10월 1일, 국내에서 나온 작은 모델** (13초): 업스테이지가 처음부터 직접 사전학습한 에이전트용 모델 Solar Mini 4를 공개했어요. 전체 350억 개 파라미터 중 글자 조각(토큰) 하나를 만들 때 30억 개만 일해요. 입력은 51.2만 토큰, 출력은 12.8만 토큰까지 받아요.
   - 무대: 쿼카 point(x 60, y 330). 큰 box(x 380, y 110, w 520, h 300) "전체 35B" 안쪽 오른편에 작은 강조 막대(accent orange, 높이의 약 1/10) "활성 3B" — 카드 안에 카드를 겹치지 말고 막대(P.h div)로. 오른쪽 chip 3개 세로(x 940, y 130·210·290): "입력 512K", "출력 128K", "$0.10 · $0.40". 위 chip "10월 1일 · 업스테이지".
2. **전문가 혼합, 한 번 더** (13초): `v5-open-weight`에서 본 것처럼, 전문가 혼합은 층마다 작은 신경망(전문가)을 여러 개 두고 토큰마다 몇 개만 불러요. 2017년 연구가 학습되는 '게이트'로 전문가를 골라, 모델 용량을 1,000배 넘게 키우면서도 계산 효율은 거의 잃지 않는다는 걸 보였어요.
   - 무대: 쿼카 think. 흐름도: 왼쪽 chip "토큰"(x 360, y 300) → box "라우터"(x 480, y 270) → 전문가 칸 8개(x 700~1180, y 160~460), 그중 2개만 aqua로 켜짐 → 오른쪽 "합치기" 화살표. 아래 muted "전문가 수는 예시예요".
3. **라우터는 점수를 매겨 고른다** (14초): 라우터는 토큰마다 전문가별 점수를 계산하고, 소프트맥스로 비율을 만든 뒤 상위 몇 개(상위 k)만 실행해요. 결과는 그 비율대로 섞어요. 2021년 연구는 아예 1개만 고르게 단순화해서, 같은 계산 자원으로 사전학습을 최대 7배 빠르게 했어요.
   - 무대: 쿼카 point. 막대 그래프 8개(x 400~1100, 바닥 y 500, 예시 점수), 상위 2개는 orange로 강조 + 막대 위 비율 "%" 라벨. 위 수식 chip(y 110): "점수 → 소프트맥스 → 상위 k만 실행". 오른쪽 아래 chip "2021년: 상위 1개(Switch)". 소프트맥스는 "점수들을 합이 100%인 비율로 바꾸는 계산"으로 한 번 풀기.
4. **쏠림은 막고, 메모리는 다 올린다** (14초): 그냥 두면 라우터가 몇 전문가만 계속 골라서, 학습할 때 '골고루 쓰라'는 보조 벌점(보조 손실)을 줘요. 그리고 함정이 하나 있어요. 계산은 3B만큼이지만, 어떤 전문가든 고를 수 있으려면 35B 전부 메모리에 올라가 있어야 해요. 16비트로 친다면 약 70GB예요.
   - 무대: 쿼카 think. 왼쪽 작은 막대 묶음 두 개(x 380, y 140): "쏠림"(한 막대만 높음) → 화살표 → "골고루"(비슷한 높이). 오른쪽 게이지 2개(x 760, y 140~460): "토큰당 계산: 3B"(짧음, aqua), "메모리: 35B 전부"(김, orange) + chip "16비트로 친다면 약 70GB". 아래 muted(y 560) "회사 사내 시험: H100 2장으로 동시 요청 32개, 요청당 초당 70토큰 넘게".
5. **교실 판단: '작다'의 기준 읽기** (13초): '작은 모델'이라는 말이 활성 파라미터 기준인지 전체 기준인지 나눠 읽어요. API로 쓸 땐 활성 쪽이 속도와 값에, 학교 서버에 직접 올릴 땐 전체 쪽이 메모리에 영향을 줘요. 한국어 업무는 우리 학교 문서로 직접 시험해 보고 판단해요.
   - 무대: 쿼카 wave. 2열 비교 box(x 380·800, y 150, w 380, h 220): "활성 3B → API 속도 · 값"(aqua), "전체 35B → 직접 설치 메모리"(orange). 아래 텍스트(y 440): "발표의 한국어 시험은 <em>회사 내부 초기 시험</em>이에요". 컨텍스트 창 자체 설명은 `v1-context`로 넘김.

### 만져 보기 "라우터 점수판과 메모리 저울"
- 화면 위 고지: "전문가 8개와 점수는 예시 값이에요. Solar Mini 4의 실제 전문가 수와 라우팅 방식은 공개되지 않았어요." (`v5-open-weight`의 라우터 체험과 달리, 여기서는 **점수·비율·쏠림·메모리**를 보여 주는 데 집중)
- 위: **라우터 점수판**. 고정 토큰 12개 순서열(예: "광합성", "은", "빛", "에너지", ",", "학생", "2026", "년", "def", "(", "서울", "."). 토큰마다 전문가 8개에 대한 고정 점수표 2벌: (a) 균형 장치 끔 — 전문가 3번 점수가 늘 높음 (b) 균형 장치 켬 — 고르게 퍼짐.
- range "상위 k(고르는 전문가 수)" 1~4, 기본 2. 체크박스 "부하 균형 보조 손실 켜기"(기본 끔).
- primary 버튼 "토큰 하나 라우터에 넣기": 다음 토큰의 점수 막대 8개, 소프트맥스 비율(%), 고른 상위 k개 강조, 아래 '전문가별 누적 사용' 막대가 한 칸씩 쌓임. 균형 끔이면 3번 막대만 치솟고, 켬이면 고르게 쌓임. 보조 버튼 "처음부터".
- range 최대(k=4)에서 켜지는 전문가 수와 "전문가 8개 중 k개가 일해요" 문구가 바로 바뀜.
- 아래: **메모리 저울**. 고정값 전체 35B · 활성 3B(공식). select "저장 정밀도(가정)" 16비트 / 8비트 / 4비트 → 메모리 35B × 2·1·0.5바이트 = 약 70 / 35 / 17.5GB, 토큰당 계산은 3B 그대로. 문구: "정밀도는 가정이에요. 업스테이지는 저장 정밀도를 밝히지 않았어요." 양자화 원리는 `v5-on-device` 참조.
- 390px에서 막대 영역은 `width:100%` 캔버스 또는 flex 막대로.

### teacherLines
- "이 모델은 350억 개 파라미터를 다 갖고 있지만, 글자 조각 하나를 만들 때는 <b>30억 개만</b> 일해요."
- "라우터가 점수를 매겨 <b>그 토큰에 맞는 전문가 몇 개</b>만 불러요."

### tip
- body: 모델 설명에서 <b>전체 파라미터와 활성 파라미터</b>를 나눠 읽으세요. API로 쓸 땐 활성 쪽이 속도와 값에, 학교 서버에 직접 올릴 땐 전체 쪽이 필요한 메모리에 영향을 줘요.
- extra: 새 국내 모델은 가정통신문·교육과정 문서처럼 우리 학교 실제 문서로 같은 과제를 기존 모델과 나란히 돌려 비교해 보세요. 발표문의 한국어 시험은 회사 내부 초기 시험이에요.

### myth
- myth: 전문가 혼합의 '전문가'는 수학 전문가, 국어 전문가처럼 과목별로 나뉜다.
- fact: 사람이 과목을 정해 주지 않아요. 라우터와 함께 학습되면서 나뉘고, 연구에서는 구두점·고유명사 같은 토큰 무리에 특화되는 경향이 관찰됐어요.

### sources (4)
- Upstage — Solar Mini 4 (2026-10-01) https://www.upstage.ai/blog/en/solar-mini-4 (처음부터 사전학습, 35B 중 3B 활성, 512K/128K, 가격, 사내 시험)
- Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer (arXiv 1701.06538, 2017) https://arxiv.org/abs/1701.06538
- Switch Transformers (arXiv 2101.03961, 2021) https://arxiv.org/abs/2101.03961 (상위 1개 라우팅, 같은 계산으로 사전학습 최대 7배)
- Hugging Face — Mixture of Experts Explained (2023-12-11) https://huggingface.co/blog/moe (전체 파라미터 메모리, 소프트맥스·상위 k 게이트, 부하 균형 보조 손실, 전문가 특화)

---

## 검증 기록 (2026-10-05)

| 편 | 확인된 사실에 쓴 URL 수 | sources 필드(본 4 + 대체) | 소식 1차 출처 | 배경 1차 출처 |
|---|---|---|---|---|
| 41 `t7-sonnet-opus-55` | 6 | 4 + 2 | Anthropic Opus 5.5(9/22)·Sonnet 5.5(9/28) | Claude 가격표·모델 개요, Artificial Analysis GDPval-AA, HF EvalEval×AISI |
| 42 `t7-gpt6-sol-luna` | 10 | 4 + 2 | OpenAI RSS(9/22·9/29), developers changelog | OpenAI models·pricing·deprecations, Claude 가격표, Artificial Analysis, FrugalGPT, Kaplan 2020 |
| 43 `t7-argon-staged` | 6 | 4 + 2 | Google Gemini 4 Argon(9/30) | Fairwind(9/2), DeepMind FSF, Phuong 2024, Anthropic Opus 5.5, METR(9/22) |
| 44 `t7-prompt-caching` | 10 | 4 + 2 | AWS Kimi K3(9/18), OpenAI RSS(9/22), Opus 5.5 가격, Argon(9/30) | OpenAI·Claude 캐싱 문서, 가격표 2종, HF Transformers 캐시 문서, vLLM 2023 |
| 45 `t7-model-retirement` | 5 | 4 + 1 | OpenAI deprecations(Sora 2 9/24, 10/1 공지), Claude deprecations(9/30 공지) | Claude 모델 개요, 가중치 보존 약속, Claude 내보내기 문서 |
| 46 `t7-solar-mini4-moe` | 4 | 4 | Upstage Solar Mini 4(10/1) | Shazeer 2017, Switch Transformer 2021, HF MoE 해설 |

- 403으로 본문을 못 읽은 곳: openai.com/index/* (RSS로 대신 확인), help.openai.com(Sora 종료 도움말 — 사용 안 함).
- 뉴스 목록과 다르게 바로잡은 것: Gemini 4 Argon "100만 토큰"은 컨텍스트가 아니라 출력 한도.
