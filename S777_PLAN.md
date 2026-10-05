# 쿼카 AI 개념극장 · 시즌 트리플777 — 30편 추가 계획 (확정 2026-10-05)

기존 40편(시즌 1~5)은 그대로 두고 **시즌 777(트리플777) 30편(E41~E70)을 추가**해요. 축은 **2026년 9월 18일~10월 5일에 실제로 있었던 AI 소식**이에요. 각 편은 장면 1에서 그 소식(무엇을·언제·누가)을 열고, 장면 2~4에서 그 소식을 이해하는 데 필요한 개념을 설명하고, 장면 5에서 교실의 판단으로 닫아요. 캐릭터·엔진·형식(5장면 3분 극장 + 만져 보기 + 학생에게 한 문장 + 팁 + 오해 + 출처 + 대본)은 그대로. 집필·윤문·칸 맞춤 규칙은 v2와 같아요(`V2_PLAN.md` 글쓰기 철칙, `test/briefs/S777_WRITER_RULES.md`, `V2_POLISH_RULES.md`).

- track: `'S777'`, 파일: `episodes/s777/{slug}.js`, slug 접두 `t7-`.
- 소식의 1차 출처는 세 조사 파일에 있어요(오늘 WebFetch로 확인한 것만): `test/briefs/S777_NEWS_GLOBAL.md`, `S777_NEWS_PRODUCT_CULTURE.md`, `S777_NEWS_KR_POLICY.md`. 브리프는 여기 적힌 URL을 다시 열어 사실을 확정하고, 개념 설명에 필요한 배경 자료(arXiv·공식 문서)를 추가로 확인해요.
- 의상: E41~E60 = 파리지앵 2026 가을 세트 paris01~20, E61~E70 = 새 세트 new21~30 (`assets/gen/s777/`, 배정은 `S777_OUTFITS.md`).

## 블록 A · 새 모델이 쏟아진 2주 (E41~E46)
| 편 | slug | 제목(가제) | 축이 되는 소식(날짜) | 개념 |
|---|---|---|---|---|
| 41 | t7-sonnet-opus-55 | 같은 값에 더 빠른 새 모델, 뭐가 달라졌을까 | Claude Opus 5.5(9/22)·Sonnet 5.5(9/28) 출시 | 벤치마크·가격·속도 읽는 법, 성능 대비 비용 |
| 42 | t7-gpt6-sol-luna | 큰 모델과 작은 모델을 함께 내놓는 이유 | GPT-6 Sol·Luna(9/22), GPT-6.1 Sol(9/29) | 모델 크기 티어, 토큰 단가 20배 차이, 작업에 맞는 모델 고르기 |
| 43 | t7-argon-staged | 위험한 능력은 먼저 누구에게 주나 | Gemini 4 Argon 단계적 공개·Fairwind(9/30) | 단계적 공개(staged release), 사이버 능력 평가 |
| 44 | t7-prompt-caching | 같은 앞부분을 다시 계산하지 않는 트릭 | GPT-6 프롬프트 캐싱 개선(9/22), Kimi K3 명시적 캐싱(9/18), Opus 5.5 캐시 읽기 가격 | KV 캐시·프롬프트 캐싱, 비용 절감 |
| 45 | t7-model-retirement | 어제 쓰던 AI가 사라지는 이유 | Sora 2 API 종료(9/24), Claude Sonnet 4.5·GPT-5.x 은퇴 공지(9/30·10/1) | 모델 수명주기, 사전 고지, 데이터 내보내기 |
| 46 | t7-solar-mini4-moe | 350억인데 30억만 일하는 모델 | 업스테이지 Solar Mini 4(10/1) | 전문가 혼합(MoE), 활성 파라미터, 컨텍스트 길이 |

## 블록 B · 에이전트가 진짜 일하기 시작했다 (E47~E52)
| 편 | slug | 제목(가제) | 축이 되는 소식(날짜) | 개념 |
|---|---|---|---|---|
| 47 | t7-dots-autopilot | 시키기 전에 일하는 비서 | OpenAI dots(9/29), Copilot Autopilot(9/25) | 능동형 에이전트, 승인 단계, 통제권 |
| 48 | t7-agent-sandbox | 에이전트에게 울타리 치기 | NVIDIA Open Agent Safety Platform(9/28), 영국 AISI 평가 환경 강화(10/1) | 샌드박스, 격리, 감시 장치 |
| 49 | t7-gemini-skills | 잘 쓴 지시문을 도구로 만들기 | Gemini Gems→Skills(9/30) | 재사용 프롬프트, 스킬 겹쳐 쓰기, 참고자료 첨부 |
| 50 | t7-whale-ai-chat | 브라우저 안으로 들어온 AI | 네이버 웨일 AI Chat 정식 출시(10/1) | 페이지 요약·질의응답, 작업 자동 제안, 간접 주입 위험 |
| 51 | t7-ai-monitor | AI가 AI를 감시하기 | METR 행동 모니터(9/27), 영국 AISI GPT-6 Astra 시뮬레이션 평가(9/28) | LLM 판정자 모니터, 정렬 평가, 시뮬레이션 인식 |
| 52 | t7-agentic-privacy | 에이전트에게 준 권한은 어디까지 | 개인정보위 AI 프라이버시 민·관 정책협의회 에이전틱 AI 논의(9/23) | 과도한 권한, 프롬프트 인젝션, 메모리·로그 |

## 블록 C · 보고 듣고 말하는 AI (E53~E58)
| 편 | slug | 제목(가제) | 축이 되는 소식(날짜) | 개념 |
|---|---|---|---|---|
| 53 | t7-live-avatar | 실시간으로 말하는 아바타 | Gemini 3.8 Live Avatar(9/24), Meta Ray-Ban Display 홀로그램 아바타(9/23) | 실시간 영상 생성·립싱크, SynthID 워터마크 |
| 54 | t7-voice-design | 말로 설계하는 목소리, 10초면 되는 복제 | Gemini 3.8 TTS(9/23), Eleven v4(9/28), MAI-Voice-2.1(10/1) | 음성 합성, 음성 복제, 동의 장치, 보이스피싱 예방 |
| 55 | t7-streaming-stt | 실시간 자막의 100밀리초 | MAI-Transcribe-2-Streaming(10/1) | 스트리밍 음성인식, 지연 시간, 언어 자동 감지 |
| 56 | t7-kling4-keyframes | 키프레임 열 개로 영상 붙잡기 | Kling 4.0(9/30) | 키프레임, 참조 자료, 길이·해상도·오디오 |
| 57 | t7-audio-glasses-exam | 카메라 없는 AI 안경과 시험장 | Ray-Ban Meta Audio·Muse(9/23), 국가자격시험 AI 기기 부정행위 모의훈련(9/29), 토픽 개편의 부정행위 대책(9/29) | 음성 인터페이스, 웨어러블과 평가 공정성 |
| 58 | t7-guided-vision | 카메라로 보고 말로 안내하는 AI | Gemini Live Guided Vision(10/1) | 멀티모달, 접근성, 실시간 안내 |

## 블록 D · 안전·신뢰·저작권 (E59~E64)
| 편 | slug | 제목(가제) | 축이 되는 소식(날짜) | 개념 |
|---|---|---|---|---|
| 59 | t7-synthid-bio-labels | 단백질에도 워터마크, 영상 30억 개엔 라벨 | SynthID Bio(9/30), TikTok AI 라벨 30억 개(9/30) | 워터마크 삽입·탐지 원리, 라벨과 C2PA |
| 60 | t7-distillation-defense | 큰 모델을 베끼는 법과 막는 법 | OpenAI 모델 증류 캠페인 차단(9/30), Opus 5.5 증류 방지 안전장치(9/22) | 지식 증류, 적대적 증류 |
| 61 | t7-training-copyright | AI 학습은 공정이용일까 | Thomson Reuters v. ROSS 항소심(9/29), 음반사 대 Suno 소송(9/18), 문체부 AI 음악 신탁 토론회(9/21), EU 저작권 의견수렴(9/29) | 공정이용 4요소, 학습 데이터 라이선스 |
| 62 | t7-mentalhealthbench | 힘든 대화에서 '좋은 대답'의 기준 | MentalHealthBench(9/23), OpenAI 호주 청소년 안전 청사진(9/18) | 안전 벤치마크, 연령 확인, 위기 연결 |
| 63 | t7-safety-case | "안전하다"를 증거로 보여 주는 법 | OpenAI 안전성 논증 지침(9/28), Anthropic·Accenture 임베디드 평가(9/18), 과기정통부 AI 안전 종합계획 협의체(9/30) | 안전성 논증, 제3자 평가, 레드팀 |
| 64 | t7-open-weight-jailbreak | 공개 모델의 안전장치가 쉽게 풀리는 이유 | Anthropic의 GLM-5.3 분석(9/29) | 오픈 웨이트, 탈옥·미세조정 우회, 이중 용도 |

## 블록 E · 한국과 교실 (E65~E70)
| 편 | slug | 제목(가제) | 축이 되는 소식(날짜) | 개념 |
|---|---|---|---|---|
| 65 | t7-research-ethics-guide | 연구에 AI를 쓸 때 지켜야 할 일곱 가지 | 국가연구개발 AI 연구 윤리 기준(9/20) | 사실 검증, AI 활용 표기, 은닉 프롬프트 금지 (학생 탐구보고서에 적용) |
| 66 | t7-public-ai-ethics | 공공 AI 윤리기준 여섯 가지 | 행안부 공공부문 AI 윤리기준(10/1), 국가AI전략위 입법 프레임워크(10/2) | 공정성·투명성·책임성, 자율점검 |
| 67 | t7-topik-ai-grading | AI가 문제를 내고 채점하는 시험 | 토픽 AI·디지털 개편안(9/29) | 자동 출제·채점과 사람 검토(human-in-the-loop), 홈테스트 |
| 68 | t7-fact-check-campaign | 확인템 장착이 국룰 | 방송미디어통신위원회 캠페인(10/1) | 생성형 AI 가짜정보 판별 체크리스트, 딥페이크 식별 습관 |
| 69 | t7-deepfake-response | 디지털 성범죄 대응, 기술은 어디까지 | 범정부 디지털성범죄 대응 협의체(9/22), 국제 콘퍼런스(9/28), 캘리포니아 AI 법안 13건 서명(9/30) | 해시 필터링, AI 탐지, 신고 경로 |
| 70 | t7-super-intelligence-word | AI를 SI라고 부르라는 행정명령 | 미국 백악관 행정명령 14434(9/29) | 용어와 개념: AI·AGI·초지능의 구분, 말이 생각을 바꾸는 방식 |

## 제작 순서
1. 블록별 리서치 브리프 `test/briefs/S777_B{A~E}_BRIEFS.md`
2. 의상 등록(`test/outfit-pack.mjs s777`), `engine/palette.js`·`assets/manifest.js`
3. 편별 집필 → `episodes/s777/{slug}.js`, 검사 run·overlap·overflow 전부 0
4. 윤문·칸 맞춤 패스 → 썸네일·자막 → 블로그 원고·인포그래픽 → 납품 폴더 `Downloads\AI개념극장_시즌777(1005)\`
5. registry·index.html·README 갱신, push 배포, 아카이브 카드 갱신
