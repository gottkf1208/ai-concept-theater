# v2 납품 계획 (2026-10-02, 사용자 지시)

최종 산출물: **한 폴더** `C:\Users\dumok\Downloads\AI개념극장업데이트(1002)\` 에 전부 넣어 zip으로도 묶어 줌.

```
AI개념극장업데이트(1002)/
  README.txt            ← 새 배포 링크(전체 + 40편 단독 링크), 폴더 설명, 구글 시트 링크
  01_썸네일/            ← E01~E40 × youtube(1920×1080)·instagram-feed(1080×1350)·instagram-reels(1080×1920)
  02_캐릭터_에셋/       ← 40편 의상 세트: {E번호_slug}/key.webp + point/think/oops/wave.webp
  03_블로그_포스팅/     ← E01_{slug}/포스팅.txt + 인포그래픽_1~4.png
  04_자막/              ← E01~E40 .srt + .txt
```

## 블로그 포스팅 40편 규칙
- 사용자 네이버 블로그 문체: 참고 원고 3편 `C:\Users\dumok\Downloads\블로그_E09_영어프롬프트가_조금더_정확했던_이유.txt`, `블로그_E07_캐릭터_얼굴이_장면마다_바뀌는_이유.txt`, `블로그_E10_생각하는_시간이_있는_AI.txt` (첫 줄 "안녕하세요! : ) 씨그램마신쿼카입니다." / ■ 소제목 / 학술 근거 단락 / "■ 학생들과 수업할 때는 이렇게" / 극장 solo 링크 / "■ 참고한 자료" 서지 / 해시태그 줄).
- 근거: 해당 편 브리프(`test/briefs/V2_S{n}_BRIEFS.md`)의 확인된 사실·출처만. 블로그에는 논문·공식 문서를 저자·연도·제목·URL로 서지 표기. 확인 불가 항목 금지.
- humanizer 규칙 적용: not X but Y 금지, 한 줄 마무리 금지, 대시(—) 금지, 억지 3항 나열 금지, 굵게 장식 금지, "도구마다 달라요" 회피 금지, 이모지 금지, 챗봇 잔재 금지. 해요체.
- 단독 링크: `https://gottkf1208.github.io/ai-concept-theater/watch.html?ep={slug}&solo=1`
- 해시태그: #씨그램마신쿼카쌤 #쿼카의AI개념극장 #AI공부 + 편 키워드 3~5개 + #AI리터러시 #AI융합교육연구회

## 인포그래픽 (사용자 승인: 4장 × 40편 = 240크레딧, 잔액 947.5 → 약 707.5)
- 힉스필드 `gpt_image_2_5`, quality high, 16:9, 1.5크레딧/장. 한국어는 프롬프트에 직접 표기(유니코드 이스케이프 금지).
- 스타일 템플릿(기존 승인 스타일): "Premium editorial infographic, 16:9, sophisticated Korean fintech-app aesthetic. Background: smooth diagonal gradient from pale periwinkle #EEF2FF to soft mint #E6FBF6 with faint fine grain. Big bold Korean headline top-left, exactly this text: … . frosted-glass cards (white 70% opacity, 1px white border, 28px radius, soft shadow), deep-blue #1D4ED8 / orange #EA580C pills, small 3D clay icons. No other text, no logos. All Korean text spelled exactly as given, crisp and legible."
- 4종: ① 핵심 개념 한 장 ② 연구·공식 문서 근거(수치·연도) ③ 원리/비교(전·후, A vs B, 단계) ④ 교실 적용 체크리스트.
- 각 편 포스팅 작성 에이전트가 `인포그래픽_스펙.json`(4장: headline + 카드 구성 텍스트)을 포스팅과 함께 내놓고, 메인 세션이 그걸로 생성. 생성 후 오타 검수(`test/fixtext.mjs`).

## 순서
1. 40편 집필 완료 → `node test/run.mjs` 전체, overlap 전체, links, sweep 시각 검토
2. 자막 `node test/subs.mjs`, 썸네일 `node test/thumbs.mjs` → 폴더 복사
3. 커밋(`-c user.name=gottkf1208 -c user.email=gottkf12087@gmail.com`) + push + 라이브 확인
4. 구글 시트 40행 재생성, 옛 시트(15IMYHHw5…) 휴지통
5. 블로그 40편(에이전트, 브리프+에피소드 파일 기반) → 인포그래픽 160장 → 폴더 정리 → zip → 메모리·CREDITS 갱신

## 진행 메모 (자동 갱신)
- 2026-10-02 17:5x: 에피소드 40편 집필 에이전트 전부 투입 완료(동시 20개 제한, 완료 순 투입). 누락 포즈 9장 생성(4.5크레딧) → manifest 병합 완료. 02_캐릭터_에셋 복사 완료(40세트).
- 블로그 에이전트(opus) 투입 순서: 완성된 편부터. 투입됨: E01 E02 E03 E04 E05 E07 E08 E09 E14 E16 E17 E18 E19 E20 E21 E22 E23 E24 E25 E26 E27 E28 E29 E12 E13 E30 E32 E35 E15 E37 E38 E39 E40 E31 E36 E34 E33 E06 E10 | 인포그래픽 160장 전부 완료(E01 푸터 fixtext 보정)
