# 시즌 6 후보 — 용어집에서 고른 주제 (2026-09-26)

의뢰인이 알려 준 FlowHunt 용어집(352개)을 훑어서, 이미 다룬 것(할루시네이션·RAG·시드·네거티브·바이브코딩·딥페이크·음성인식·멀티모달·모델 붕괴)과 너무 마이너한 것(개별 라이브러리·마케팅 도구·통계 지표)을 빼고, 교사가 교실에서 부딪히는 순서로 12편을 골랐어요. 각 편은 시즌 5와 같은 형식(5장면·만져 보기·학생에게 한 문장·팁·오해·출처·대본).

| 편 | 제목(가제) | 용어집 키워드 | 한 줄 원리 | 트랙 |
|---|---|---|---|---|
| E31 | AI는 언제까지의 세상을 알까 — 학습 마감일 | cutoff-date, training-data | 학습 데이터가 끊긴 날짜 이후는 모름. 검색을 켜야 하는 이유(E23 연결) | B |
| E32 | 예시 두 개면 왜 확 좋아질까 — 퓨샷 | few-shot-learning, zero-shot-learning, prompt | 예시가 "이런 형식으로"를 가르치는 원리. 교사 프롬프트에 예시 넣기 | B |
| E33 | AI는 비슷한 뜻을 어떻게 찾을까 — 임베딩 | embedding-vector, semantic-analysis, information-retrieval | 문장을 좌표로 바꿔 가까운 것을 찾음. 학교 자료 검색·RAG의 뼈대 | C |
| E34 | AI는 문장의 어디를 보고 있을까 — 어텐션 | transformer, attention | 단어끼리 서로 얼마나 참고하는지. 긴 문장에서 앞말을 잊는 이유(E5 연결) | C |
| E35 | 외운 것과 이해한 것 — 과적합 | overfitting, generalization-error, training-data | 문제집만 외운 학생처럼, 학습 데이터에만 맞춘 모델. 교사에게 익숙한 비유 | B |
| E36 | AI는 칭찬으로 배운다 — 사람 피드백 강화학습 | rlhf, reinforcement-learning, constitutional-ai | 좋다/나쁘다 평가로 다듬는 단계. 아첨(E20)의 뿌리 | C |
| E37 | 우리 학교에 맞춘 AI, 세 가지 길 — 프롬프트·RAG·파인튜닝 | fine-tuning, peft, instruction-tuning | 비용·난이도·효과 비교. 학교가 실제로 고를 수 있는 선택지 | B |
| E38 | 학생이 AI를 속이는 법이 있다 — 프롬프트 주입 | indirect-prompt-injection, jailbreaking-ai, prompt-leaking | 문서·웹페이지에 숨긴 지시를 AI가 따르는 문제. 에이전트(E1) 안전 | C |
| E39 | AI는 왜 그렇게 답했을까 — 설명 가능성 | xai-explainable-ai, model-interpretability, algorithmic-transparency | "이유를 말해 줘"의 한계와 쓸모. 채점(E19)·평가에 연결 | B |
| E40 | AI 편향은 어디서 올까 — 데이터 편향 | bias, discrimination, ai-ethics | 학습 데이터의 쏠림이 답에 남는 원리. 학급 사례 만들기 | B |
| E41 | AI가 읽기 수준을 맞추는 법 — 가독성 지표 | readability, grade-level, lexile-framework, flesch-reading-ease | "3학년 수준으로"가 실제로 하는 일. 지표의 한계 | B |
| E42 | AI에게 마음이 있다고 느끼는 이유 — 의인화 | anthropomorphism, turing-test, chatbot | 학생이 AI를 친구로 느끼는 원리와 지도 포인트 | B |

예비: 사진 속 글자 읽기(ocr, scene-text-recognition), 쓰레기를 넣으면 쓰레기가 나온다(garbage-in-garbage-out, data-cleaning), 사람이 끼어드는 자리(human-in-the-loop), AGI가 뭐길래(agi, singularity).

## 겨울 의상(낙엽 없음)
시즌 6부터는 머리 낙엽을 빼고 겨울·크리스마스 의상으로 가요. 미리 만들어 둔 세트: `assets/char/w1-santa` … `w6-skater`(키비주얼 + point·think·oops·wave). 새 편에 붙일 때는 `assets/key/{slug}.webp`와 `assets/char/{slug}/`로 복사하고 `assets/manifest.js`에 등록하면 돼요.

## 만드는 순서
`SEASON_5_PLAN.md`의 "새 편 만드는 순서"와 같아요. 브리프는 `test/briefs/S5_BRIEFS.md` 형식으로 쓰고, 출처는 arXiv·공식 문서 위주로 먼저 확정한 뒤 집필해요.
