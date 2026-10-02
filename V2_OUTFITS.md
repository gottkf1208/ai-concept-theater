# v2 의상 배정 (기존 세트 재사용)

| 편 | 새 slug | 의상 세트(assets/char/…) | 비고 |
|---|---|---|---|
| 1 | v1-next-token | s3-role | 줄무늬 셔츠·확성기 |
| 2 | v1-context | e5-context | 카디건·서류 더미 |
| 3 | v1-prompt-parts | w2-reindeer | 순록 스웨터(겨울) |
| 4 | v1-hallucination | e4-plausible | 탐정 코트 |
| 5 | v1-rag | e6-rag | 조끼·넥타이 |
| 6 | v1-reasoning | n4-reasoning | 초록 조끼·모래시계 |
| 7 | v1-ai-label | n6-ai-label | 앞치마·도장 |
| 8 | v1-student-privacy | s4-privacy | 형광 조끼·자물쇠 |
| 9 | v2-seed | e2-seed | 노란 우비·주사위 |
| 10 | v2-text-render | e3-diffusion | 화가 앞치마 |
| 11 | v2-english-prompt | n3-english-prompt | 데님·지구본 |
| 12 | v2-consistency | n1-consistency | 사진사 조끼 |
| 13 | v2-motion-prompt | s5-motion-prompt | 모션 디자이너 후드 |
| 14 | v2-video-cost | n2-video-cost | 검은 터틀넥·클래퍼 |
| 15 | v2-voice | s3-voice | 헤드셋 |
| 16 | v2-subtitle | s3-subtitle | 연두 셔츠·클립보드 |
| 17 | v3-agent-mcp | e1-agent-mcp | 아쿠아 후드·태블릿 |
| 18 | v3-computer-use | s4-choose | 남색 재킷 |
| 19 | v3-prompt-injection | w4-elf | 엘프(겨울) |
| 20 | v3-tool-use | s4-calc | 하늘색 셔츠·계산기 |
| 21 | v3-vibecoding | n5-vibecoding | 개발자 후드·노트북 |
| 22 | v3-multimodal | s3-vision | 실험 가운 |
| 23 | v3-memory | w6-skater | 더플코트(겨울) |
| 24 | v3-companion | s3-avatar | 보라 스카프·셀카봉 |
| 25 | v4-degradation | s5-degradation | 복원가 앞치마 |
| 26 | v4-upscale | s5-upscale | 픽셀 머플러 가운 |
| 27 | v4-guidance | s5-guidance | 지휘자 |
| 28 | v4-controlnet | s5-controlnet | 인형극 조끼 |
| 29 | v4-long-video | s5-long-video | 마라톤 러너 |
| 30 | v4-attention | w3-snow | 패딩(겨울) |
| 31 | v4-embedding | s4-search | 기자 조끼 |
| 32 | v4-rlhf | s4-sycophancy | 노란 스웨터·폼폼 |
| 33 | v5-model-collapse | w5-baker | 진저브레드(겨울) |
| 34 | v5-open-weight | w1-santa | 산타(겨울) |
| 35 | v5-on-device | s3-music | DJ 헤드폰 |
| 36 | v5-grading | s4-grading | 심판 셔츠 |
| 37 | v5-ai-literacy | w7-librarian | 겨울 신규 |
| 38 | v5-law-timeline | w8-overcoat | 겨울 신규 |
| 39 | v5-energy | w9-lineman | 겨울 신규 |
| 40 | v5-choose | w10-ski | 겨울 신규 |

복사: `node test/outfit-map.mjs` 가 위 표대로 `assets/key/{new}.webp`, `assets/char/{new}/` 를 만들고 manifest를 갱신해요.
