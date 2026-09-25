# SOURCES — 에피소드별 출처

1차 자료(공식 문서, 원 논문, 표준 문서)를 우선했어요. 링크는 `node test/links.mjs`로 열림을 확인했어요(2026-09-25).

## E1 AI는 어떻게 브루를 직접 눌렀을까 — AI 에이전트와 MCP

- [Model Context Protocol — 공식 소개 (modelcontextprotocol.io)](https://modelcontextprotocol.io/docs/getting-started/intro) — "AI 앱을 외부 시스템에 연결하는 오픈 표준", USB-C 비유가 여기서 나와요.
- [MCP Architecture overview — 호스트·클라이언트·서버, 도구·리소스·프롬프트](https://modelcontextprotocol.io/docs/learn/architecture) — 도구(tools)는 AI 앱이 부를 수 있는 실행 함수라고 정의해요.
- [Tool use with Claude — Claude Developer Platform 문서](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — 모델이 도구 호출을 정하고, 앱이 실행해 결과를 돌려주는 왕복 과정.
- [Building effective agents — Anthropic Engineering (2024)](https://www.anthropic.com/engineering/building-effective-agents) — 에이전트는 도구 결과를 보며 스스로 다음 행동을 정하고, 관문에서 사람의 피드백을 받아요.

## E2 같은 프롬프트, 다른 영상 — 확률과 시드

- [Diffusers — Reusing seeds for deterministic generation](https://huggingface.co/docs/diffusers/using-diffusers/reusing_seeds) — 같은 시드+Generator면 같은 결과가 나오지만, 하드웨어·설정에 따라 달라질 수 있고 보장되지는 않아요.
- [Claude 용어집 — Temperature](https://platform.claude.com/docs/en/about-claude/glossary) — 온도가 낮으면 보수적인 답, 높으면 다양한 답이 나와요. 온도 0이어도 완전히 결정적이지 않을 수 있어요.
- [Holtzman et al. 2020 — The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751) — 같은 모델도 다음 단어를 고르는 방식(샘플링)에 따라 글이 달라진다는 연구예요.
- [Ho et al. 2020 — Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) — 잡음에서 출발해 점점 그림을 만들어 가는 확산 모델의 원리를 제시한 논문이에요.

## E3 글자와 손가락은 왜 뭉개질까 — 확산 모델

- [Denoising Diffusion Probabilistic Models — Ho, Jain, Abbeel (2020)](https://arxiv.org/abs/2006.11239) — 잡음을 조금씩 더하고(순방향), 거꾸로 걷어 내며(역방향) 그림을 만드는 확산 모델의 기본 논문.
- [High-Resolution Image Synthesis with Latent Diffusion Models — Rombach et al. (2022)](https://arxiv.org/abs/2112.10752) — Stable Diffusion의 바탕이 된 잠재 확산(latent diffusion) 논문.
- [Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (Stable Diffusion 3) — Esser et al. (2024)](https://arxiv.org/abs/2403.03206) — 글자 표현(typography) 개선을 다룬 부분이 있어요.
- [오늘 사례 영상 — 브루 특강 강의안](https://gottkf1208.github.io/vrew-talk/) — v1.mp4 7초 부근에서 제목 자막이 뭉개진 장면을 볼 수 있어요.

## E4 AI는 왜 없는 숫자를 그려 넣을까 — 그럴듯함과 사실

- [A Survey on Hallucination in Large Language Models (arXiv 2311.05232)](https://arxiv.org/abs/2311.05232) — Huang et al. — 할루시네이션을 "그럴듯하지만 사실이 아닌 내용을 만드는 것"으로 정의해요.
- [Survey of Hallucination in Natural Language Generation (arXiv 2202.03629)](https://arxiv.org/abs/2202.03629) — Ji et al. — 생성 모델이 사실에 근거하지 않은 내용을 만들어 내는 현상을 폭넓게 정리해요.
- [오늘 사례 영상 — 브루 특강 강의안 (vrew-talk)](https://gottkf1208.github.io/vrew-talk/) — v1.mp4의 7초·11초 부근 장면. 423ppm → 420ppm 변화와 뭉개진 제목을 직접 확인할 수 있어요.

## E5 긴 대화에서 AI가 앞 내용을 잊는 이유 — 토큰과 컨텍스트 창

- [Claude 문서 — Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — 컨텍스트 창을 작업 기억에 비유해요. claude.ai는 넘치면 먼저 들어온 것부터 밀어낸다고 각주로 설명하고, 넘치면 compaction(요약)이나 오류가 날 수 있다고 안내해요.
- [Claude 용어집 — Tokens / Context window](https://platform.claude.com/docs/en/about-claude/glossary) — Claude 기준 영어는 약 3.5자에 토큰 1개, 언어에 따라 달라진다고 설명해요.
- [Liu et al., 2023 — Lost in the Middle](https://arxiv.org/abs/2307.03172) — 긴 문맥에서 가운데에 놓인 정보를 모델이 잘 놓친다는 연구 결과예요.
- [Anthropic Engineering — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — 컨텍스트가 길어질수록 회상 성능이 떨어지는 "context rot"과, 요약해서 새 컨텍스트로 넘기는 compaction을 다뤄요.

## E6 자료를 붙여 주면 왜 덜 틀릴까 — 할루시네이션과 RAG

- [Lewis et al. 2020 — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — RAG 원논문. 검색한 문서를 생성 과정에 함께 넣는 구조를 처음 제안했어요.
- [Gao et al. 2023 — Retrieval-Augmented Generation for Large Language Models: A Survey](https://arxiv.org/abs/2312.10997) — 할루시네이션·오래된 지식·추적 불가 문제를 검색으로 보완하는 방식을 정리했어요.
- [NotebookLM 소개 — Google Blog](https://blog.google/technology/ai/notebooklm-google-ai/) — 올린 자료에 근거(grounding)해 답하고 인용을 다는 방식을 설명해요.
- [Claude 용어집 — RAG (Retrieval-Augmented Generation)](https://platform.claude.com/docs/en/about-claude/glossary) — 정확성을 높이지만, 자료의 품질과 검색 결과에 달려 있다고 밝혀요.

## 다음 시즌 · 캐릭터 얼굴이 장면마다 바뀌는 이유 — 일관성과 레퍼런스 이미지 (준비 중)

- [IP-Adapter: Text Compatible Image Prompt Adapter (arXiv, 2023)](https://arxiv.org/abs/2308.06721) — 이미지 한두 장을 프롬프트처럼 넣어 원하는 인물·스타일을 조건으로 주는 방법.
- [DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation (arXiv, 2022)](https://arxiv.org/abs/2208.12242) — 몇 장의 사진만으로 같은 대상(인물·사물)을 여러 장면에 유지하는 방법.

## 다음 시즌 · 영상이 이미지보다 훨씬 비싼 이유 — 연산량 (준비 중)

- [Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets (arXiv, 2023)](https://arxiv.org/abs/2311.15127) — 영상 생성이 프레임과 시간 축을 함께 다뤄야 하는 이유를 보여주는 연구.
- [High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)](https://arxiv.org/abs/2112.10752) — 원본 화면 대신 압축된 잠재 공간에서 계산해 비용을 줄이는 방법(Stable Diffusion의 바탕).

## 다음 시즌 · 영어 프롬프트가 조금 더 정확했던 이유 — 학습 데이터의 언어 비중 (준비 중)

- [Learning Transferable Visual Models From Natural Language Supervision (CLIP, arXiv 2021)](https://arxiv.org/abs/2103.00020) — 인터넷의 이미지-텍스트 쌍으로 학습한다는 것을 보여준 연구.
- [Common Crawl — 언어별 통계](https://commoncrawl.github.io/cc-crawl-statistics/plots/languages) — 웹 텍스트에서 영어 비중이 다른 언어보다 훨씬 크다는 걸 보여주는 통계.
- [오늘의 사례 — 브루 대본 비교(vrew-talk)](https://gottkf1208.github.io/vrew-talk/) — 같은 장면을 한국어·영어 프롬프트로 만들어 본 오늘 기록.

## 다음 시즌 · "생각하는 시간"이 있는 AI — 추론 모델 (준비 중)

- [Claude Docs — Extended thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) — Claude의 확장 사고 기능을 설명하는 공식 문서.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., arXiv 2022)](https://arxiv.org/abs/2201.11903) — 단계별로 생각하게 하는 프롬프트가 추론 능력을 끌어올린다는 걸 보인 연구.

## 다음 시즌 · 말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리 — 바이브코딩 (준비 중)

- [GitHub Pages — 공식 문서](https://docs.github.com/en/pages) — 저장소 내용을 그대로 인터넷에 띄우는 정적 호스팅 서비스.
- [GitHub REST API — Repository contents](https://docs.github.com/en/rest/repos/contents) — 화면에서 고친 내용을 저장소 파일에 다시 저장할 때 쓰는 API.
- [Managing your personal access tokens (fine-grained)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) — 저장소·권한 범위를 좁게 설정하는 fine-grained 토큰 안내.

## 다음 시즌 · AI가 만들었다고 표시하는 법 — AI 생성 표시와 워터마크 (준비 중)

- [C2PA — Coalition for Content Provenance and Authenticity](https://c2pa.org/) — 파일 안에 제작 출처 정보를 심어 두는 보이지 않는 표시 표준.
- [국가법령정보센터](https://www.law.go.kr/) — "인공지능 발전과 신뢰 기반 조성 등에 관한 기본법"으로 검색해 제31조(AI 생성물 표시)를 확인하세요.

## 첫 화면의 숫자

- 43%(OECD 평균 36%), 76%: OECD TALIS 2024 — [AI 영상 미디어교육 2026 대시보드](https://gottkf1208.github.io/ai-video-media-edu/)의 출처 섹션을 따름
- 62.9%: 한국교육과정평가원 2026 — 같은 대시보드
- AI 선도교사 연수 모집 10,963명·신청 10,268명(2026) — 같은 대시보드
- AI 아바타 영상과 강사 영상의 학습 효과에 유의한 차이가 없었다는 근거: Leiker et al., 2023 — 같은 대시보드

## 사례 영상

- [브루 연수 전 40분 특강 강의안](https://gottkf1208.github.io/vrew-talk/) — E3·E4의 프레임은 이 강의안의 v1.mp4(7초·11초)에서 뽑았어요.
