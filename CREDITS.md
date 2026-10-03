# CREDITS — 자산과 크레딧 기록

## AI 생성 표시

이 사이트의 애니메이션과 시뮬레이션은 전부 코드(SVG/CSS/Canvas/JS)로 만들었어요. 쿼카 해설자 캐릭터 이미지와 편별 의상 변형, 첫 화면 히어로는 AI로 생성했어요(아래 표). 캐릭터 디자인은 쿼카연구회 오리지널 쿼카를 바탕으로 해요. AI로 만든 이미지·영상을 추가하면 이 표에 'AI 생성'으로 적고, 사이트 하단 문구가 이 파일을 가리켜요(AI 기본법 제31조의 취지를 먼저 지키려는 거예요).

| 파일 | 출처 | AI 생성 여부 | 비고 |
|---|---|---|---|
| assets/char/idea.webp | 쿼카연구회 캐릭터 "보라 전구를 든 쿼카.png" | 연구회 오리지널 캐릭터 자산(연구회가 보유한 원본을 webp로 변환) | 해설자 기본 포즈 |
| assets/char/globe.webp | 쿼카연구회 캐릭터 "글로벌 쿼카.png" | 연구회 오리지널 캐릭터 자산(webp 변환) | 해설자 보조 포즈 |
| assets/frames/v1-07s.webp, v1-11s.webp, v1-07s-title.webp | https://gottkf1208.github.io/vrew-talk/v1.mp4 의 7초·11초 프레임 | **AI 생성**(브루 AI 이미지 기능으로 만든 영상의 정지 화면) | E3·E4에서 '뭉개진 글자', '없는 숫자' 사례로 씀. 화면 속 숫자는 근거 없는 생성 값이에요 |
| assets/favicon.png | assets/char/base.webp의 얼굴 부분을 잘라 만듦 | **AI 생성**(원본이 AI 생성) | 브라우저 탭 아이콘 |
| assets/favicon.svg | 직접 그림(코드) | 아니요 | 예전 아이콘, 지금은 안 씀 |
| assets/char/base.webp, dice.webp, glass.webp, oops.webp, point.webp | 의뢰인이 GPT(이미지 생성)로 만들어 전달한 쿼카 캐릭터 5종 | **AI 생성**(GPT) | 2026-09-25 교체. 해설자 기본 포즈 |
| assets/char/think.webp, tablet.webp, wave.webp | Higgsfield · GPT Image 2.5, 위 base를 참조 이미지로 | **AI 생성** | 생각·태블릿·인사 포즈 |
| assets/key/e1-agent-mcp.webp … s4-choose.webp (24장) | Higgsfield · GPT Image 2.5, base 참조 | **AI 생성** | 편별 의상 변형(기본 포즈). 시즌 1·2 12종 + 시즌 3·4 12종(성우·촬영 스태프·DJ·통역사·연구원·연출가·심판·치어리더·보안 요원·회계사·기자·심사위원) |
| assets/char/{slug}/{pose}.webp (96장) | Higgsfield · GPT Image 2.5, 각 편 의상 키비주얼을 참조 | **AI 생성** | 그 편 의상을 입은 포즈 세트(point·think·oops·wave·tablet·dice·glass 중 편마다 쓰는 것). 극장 안 해설자가 헤더와 같은 옷을 입도록 |
| assets/key/hero.webp, hero-wide.webp, assets/og.png | Higgsfield · GPT Image 2.5(high), base 참조 | **AI 생성** | 첫 화면 히어로(극장 의자·팝콘), 공유용 OG |
| assets/char/idea.webp, globe.webp | 연구회 스티커(이전 버전, 대체용으로 보관) | 연구회 자산 | 현재 화면에는 쓰이지 않음 |

추가 포즈·키비주얼을 GPT 등으로 만들어 넣을 때는 [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md)의 규칙을 따르고 여기 한 줄씩 적어 주세요.

## 힉스필드(Higgsfield) 크레딧 사용 내역

예산 상한: 처음 100, 이후 의뢰인이 120으로 올림. 생성 전 잔액 확인, 상한의 80%에서 멈추고 보고하는 규칙.

| 일시 | 모델 | 용도 | 쓴 크레딧 | 누적 |
|---|---|---|---|---|
| 2026-09-25 19:45 | — | 잔액 확인(1082.5). 1차 제작에서는 생성하지 않음 | 0 | 0 |
| 2026-09-25 22:20 | gpt_image_2_5 (medium, 투명 배경) | 시험 1장: think 포즈 | 0.5 | 0.5 |
| 2026-09-25 22:24 | gpt_image_2_5 (medium, 투명 배경) ×14 | tablet·wave 포즈 2장 + 편별 의상 변형 12장 | 7.0 | 7.5 |
| 2026-09-25 22:25 | gpt_image_2_5 (high, 16:9) | 첫 화면 히어로 1장 | 1.5 | 9.0 |
| 2026-09-25 22:55 | gpt_image_2_5 (medium, 투명) ×60 | 시즌 1·2 의상별 포즈 48장 + 시즌 3·4 의상 키비주얼 12장 | 30.0 | 39.0 |
| 2026-09-25 23:10 | gpt_image_2_5 (medium, 투명) ×48 | 시즌 3·4 의상별 포즈 48장(point·think·oops·wave) | 24.0 | 63.0 |
| 2026-09-26 15:30 | gpt_image_2_5 (medium, 투명) ×6 | 시즌 5(E25~E30) 의상 키비주얼 6장 | 3.0 | 66.0 |
| 2026-09-26 15:33 | gpt_image_2_5 (medium, 투명) ×24 | 시즌 5 의상별 포즈 24장(point·think·oops·wave) | 12.0 | 78.0 |
| 2026-09-26 15:46 | gpt_image_2_5 (medium, 투명) ×6 | 겨울·크리스마스 의상 키비주얼 6장(낙엽 없음, 시즌 6용 비축) | 3.0 | 81.0 |
| 2026-09-26 15:49 | gpt_image_2_5 (medium, 투명) ×24 | 겨울 의상별 포즈 24장 | 12.0 | 93.0 |
| 2026-10-02 17:05 | gpt_image_2_5 (medium, 투명) ×4 | v2 개편용 겨울 의상 4종 키비주얼(사서·코트·전기작업·스키) | 2.0 | 95.0 |
| 2026-10-02 17:08 | gpt_image_2_5 (medium, 투명) ×16 | 위 4종 포즈 16장 | 8.0 | 103.0 |
| 2026-10-02 17:36 | gpt_image_2_5 (medium, 투명) ×9 | v2 재사용 세트에 빠져 있던 포즈 9장(v1-context wave, v1-hallucination point, v1-rag think·wave, v1-ai-label oops, v2-video-cost think, v3-agent-mcp think·oops·wave) | 4.5 | 107.5 |
| 2026-10-04 | gpt_image_2_5 (medium, 투명) ×20 | 파리지앵 가을 의상 키비주얼 20종(낙엽 없음, 10·11월용 비축; assets/gen/paris/) | 10.0 | 117.5 |
| 2026-10-04 | gpt_image_2_5 (high, 16:9, opaque) ×4 | 공식 캐릭터 시트 4장(턴어라운드·표정·포즈·색 견본) — quoka-character 사이트용 | 6.0 | 123.5 |
| 2026-10-04 | gpt_image_2_5 (high, 9:16) ×10 | 2027 붉은 양의 해 새해 장면 5 + 설빔 한복 5 (1차, 홍등·금박 처마가 섞여 중국풍 → 보관 폴더로 이동) | 15.0 | 138.5 |
| 2026-10-04 | gpt_image_2_5 (high, 9:16) ×10 | 같은 10장 한국 요소로 재생성(청사초롱·기와·솟대·방패연·떡국·색동·호건·당의, 중국풍 금지문) | 15.0 | 153.5 |
| 2026-10-04 | gpt_image_2_5 (high, 9:16) ×5 | 세배 시퀀스 5프레임(양03 장면 job_id + 앵커 이중 참조, 영상 소스용) | 7.5 | 161.0 |

- 합계: **161.0 크레딧** (극장 자산 + 공식 캐릭터 키트 기준). 블로그용 인포그래픽은 극장 자산이 아니라 별도예요: 2026-09-26 8장 12크레딧 + 2026-10-02 v2 40편×4장=160장 240크레딧(gpt_image_2_5 high 16:9, 1.5/장, 의뢰인 사전 승인). 2026-10-02 작업 후 잔액 652 안팎.
- 시즌 5 의상 6종은 의뢰인이 2026-09-26에 별도로 허용했어요.
- 참고 이미지 업로드는 크레딧을 쓰지 않아요. 영상 생성은 하지 않았어요.

## 글꼴

- Pretendard Variable (SIL Open Font License) — jsdelivr CDN
