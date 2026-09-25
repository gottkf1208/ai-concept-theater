# SOURCES — 에피소드별 출처

1차 자료(공식 문서, 원 논문, 표준 문서)를 우선했어요. 링크는 `node test/links.mjs`로 열림을 확인했어요(2026-09-25).

# 시즌 1

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

# 시즌 2

## E7 캐릭터 얼굴이 장면마다 바뀌는 이유 — 일관성과 레퍼런스 이미지

- [IP-Adapter: Text Compatible Image Prompt Adapter (arXiv, 2023)](https://arxiv.org/abs/2308.06721) — 이미지 한두 장을 프롬프트처럼 넣어 원하는 인물·스타일을 조건으로 주는 방법.
- [DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation (arXiv, 2022)](https://arxiv.org/abs/2208.12242) — 몇 장의 사진만으로 같은 대상(인물·사물)을 여러 장면에 유지하는 방법.

## E8 영상이 이미지보다 훨씬 비싼 이유 — 연산량

- [Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets (arXiv, 2023)](https://arxiv.org/abs/2311.15127) — 영상 생성이 프레임과 시간 축을 함께 다뤄야 하는 이유를 보여주는 연구.
- [High-Resolution Image Synthesis with Latent Diffusion Models (arXiv, 2021)](https://arxiv.org/abs/2112.10752) — 원본 화면 대신 압축된 잠재 공간에서 계산해 비용을 줄이는 방법(Stable Diffusion의 바탕).

## E9 영어 프롬프트가 조금 더 정확했던 이유 — 학습 데이터의 언어 비중

- [Learning Transferable Visual Models From Natural Language Supervision (CLIP, arXiv 2021)](https://arxiv.org/abs/2103.00020) — 인터넷의 이미지-텍스트 쌍으로 학습한다는 것을 보여준 연구.
- [Common Crawl — 언어별 통계](https://commoncrawl.github.io/cc-crawl-statistics/plots/languages) — 웹 텍스트에서 영어 비중이 다른 언어보다 훨씬 크다는 걸 보여주는 통계.
- [오늘의 사례 — 브루 대본 비교(vrew-talk)](https://gottkf1208.github.io/vrew-talk/) — 같은 장면을 한국어·영어 프롬프트로 만들어 본 오늘 기록.

## E10 "생각하는 시간"이 있는 AI — 추론 모델

- [Claude Docs — Extended thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) — Claude의 확장 사고 기능을 설명하는 공식 문서.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., arXiv 2022)](https://arxiv.org/abs/2201.11903) — 단계별로 생각하게 하는 프롬프트가 추론 능력을 끌어올린다는 걸 보인 연구.

## E11 말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리 — 바이브코딩

- [GitHub Pages — 공식 문서](https://docs.github.com/en/pages) — 저장소 내용을 그대로 인터넷에 띄우는 정적 호스팅 서비스.
- [GitHub REST API — Repository contents](https://docs.github.com/en/rest/repos/contents) — 화면에서 고친 내용을 저장소 파일에 다시 저장할 때 쓰는 API.
- [Managing your personal access tokens (fine-grained)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) — 저장소·권한 범위를 좁게 설정하는 fine-grained 토큰 안내.

## E12 AI가 만들었다고 표시하는 법 — AI 생성 표시와 워터마크

- [C2PA — Coalition for Content Provenance and Authenticity](https://c2pa.org/) — 파일 안에 제작 출처 정보를 심어 두는 보이지 않는 표시 표준.
- [국가법령정보센터](https://www.law.go.kr/) — "인공지능 발전과 신뢰 기반 조성 등에 관한 기본법"으로 검색해 제31조(AI 생성물 표시)를 확인하세요.

# 시즌 3

## E13 목소리는 어떻게 만들어질까 — TTS와 음성 복제

- [Wang et al. 2023 — Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (VALL-E)](https://arxiv.org/abs/2301.02111) — 3초 녹음만으로 그 사람 목소리를 흉내 내는 제로샷 음성 합성을 시연한 논문이에요.
- [MDN — Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — 브라우저에 내장된 음성 합성·인식 기능이에요. 별도 설치나 API 키 없이 쓸 수 있어요.
- [개인정보보호위원회](https://www.pipc.go.kr/) — 목소리 등 생체·개인정보 보호에 관한 안내는 이 기관 자료를 확인하세요.

## E14 아바타 영상은 진짜일까 — 립싱크와 판별

- [Wav2Lip: A Lip Sync Expert Is All You Need (arXiv 2008.10010)](https://arxiv.org/abs/2008.10010) — 소리에 맞춰 입 모양을 만들고, 립싱크 판별기와 겨루며 학습하는 방식을 제시해요.
- [Vision — Claude Developer Platform 문서](https://platform.claude.com/docs/en/build-with-claude/vision) — AI 모델도 이미지가 AI로 생성됐는지 판정할 수 없다고 명시해요.
- [AI 영상 미디어교육 2026 대시보드](https://gottkf1208.github.io/ai-video-media-edu/) — Diel 외 2024 메타분석(55.5%→65.1%)과 Leiker 외 2023 아바타 영상 효과 연구를 정리해요.

## E15 배경음악은 어떻게 만들어질까 — 음악 생성과 저작권

- [MusicGen: Simple and Controllable Music Generation (arXiv, 2023)](https://arxiv.org/abs/2306.05284) — 소리를 압축된 토큰으로 바꾸고, 트랜스포머로 다음 토큰을 이어 붙여 음악을 만드는 방식을 보여주는 연구예요.
- [한국저작권위원회](https://www.copyright.or.kr/) — AI 학습 자료와 생성물의 저작권 관련 안내 자료를 확인할 수 있어요.

## E16 자막은 왜 가끔 엉뚱할까 — 음성 인식과 번역

- [Radford et al., 2022 — Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)](https://arxiv.org/abs/2212.04356) — 68만 시간의 다국어 음성 데이터를 약지도 학습해, 잡음과 억양에 강한 음성 인식 모델을 만든 연구예요.
- [MDN Web Docs — Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — 브라우저에 내장된 음성 인식(SpeechRecognition) API를 설명해요. 지원 범위는 브라우저마다 달라요.

## E17 AI는 이미지를 어떻게 읽을까 — 멀티모달 모델

- [Dosovitskiy et al., 2020 — An Image is Worth 16x16 Words (ViT)](https://arxiv.org/abs/2010.11929) — 이미지를 16×16 픽셀 조각으로 잘라 토큰처럼 다루는 Vision Transformer 논문이에요.
- [Claude 문서 — Vision](https://platform.claude.com/docs/en/build-with-claude/vision) — 28×28픽셀 한 조각이 시각 토큰 하나이며, 작은 글자·회전·개수·위치 인식의 한계를 안내해요.
- [Radford et al., 2021 — CLIP](https://arxiv.org/abs/2103.00020) — 사진과 설명 글을 짝지어 같은 공간에서 학습하는 CLIP 논문이에요.

## E18 역할을 주면 왜 답이 달라질까 — 시스템 프롬프트

- [Ouyang et al. 2022 — Training language models to follow instructions with human feedback (InstructGPT)](https://arxiv.org/abs/2203.02155) — 사람 피드백으로 모델이 지시를 따르도록 추가 학습시킨 원논문이에요.
- [Claude 프롬프트 엔지니어링 모범 사례](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — 명확하고 구체적으로, 예시와 역할·맥락을 함께 주는 게 효과적이라고 안내해요.

# 시즌 4

## E19 AI 채점은 믿을 수 있을까 — 루브릭과 AI 평가

- [Zheng et al. 2023 — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) — 강한 모델을 심판으로 쓰면 사람 평가와 80% 이상 일치하지만, 위치·장황함·자기 선호 편향이 있다고 밝혀요.
- [Liu et al. 2023 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634) — 평가 기준과 단계적 채점 이유(chain-of-thought)를 먼저 쓰게 하면 사람 평가와 더 잘 맞는다고 보여요.

## E20 AI는 왜 내 말에 맞장구칠까 — 아첨과 편향

- [Sharma et al. 2023 — Towards Understanding Sycophancy in Language Models (arXiv 2310.13548)](https://arxiv.org/abs/2310.13548) — 사람 선호 판단과 선호 모델이, 설득력 있게 쓰인 아첨 답을 정답보다 선호하기도 한다는 것을 보였어요.
- [Ouyang et al. 2022 — Training language models to follow instructions with human feedback / InstructGPT (arXiv 2203.02155)](https://arxiv.org/abs/2203.02155) — 사람 피드백으로 모델을 학습시키는(RLHF) 기본 원리를 설명해요.

## E21 학생 이름, AI에 넣어도 될까 — 개인정보와 학습 데이터

- [개인정보보호위원회](https://www.pipc.go.kr/) — 공공 · 교육 분야를 포함한 개인정보 처리 기준과 안내를 확인할 수 있어요.
- [국가법령정보센터](https://www.law.go.kr/) — "개인정보 보호법"으로 검색하면 조문과 최신 개정 내용을 확인할 수 있어요.
- [Claude 문서 — Vision](https://platform.claude.com/docs/en/build-with-claude/vision) — 예시로, 서비스 문서에는 업로드한 이미지를 어떻게 처리하는지가 적혀 있어요. 도구마다 방침이 다르니 확인해요.

## E22 AI는 왜 계산을 틀릴까 — 토큰과 도구 사용

- [Faith and Fate: Limits of Transformers on Compositionality (arXiv 2305.18654)](https://arxiv.org/abs/2305.18654) — Dziri 외(2023) — 여러 자릿수 곱셈 등 조합 문제에서 트랜스포머가 패턴 매칭의 한계를 보인다는 연구.
- [Toolformer: Language Models Can Teach Themselves to Use Tools (arXiv 2302.04761)](https://arxiv.org/abs/2302.04761) — Schick 외(2023) — 모델이 계산기 등 도구를 언제·어떻게 호출할지 스스로 학습하는 방법.
- [Claude Docs — Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — 모델이 어떤 도구를 쓸지 정하고, 실제 실행은 앱이 맡는 도구 사용 구조를 설명하는 공식 문서.

## E23 검색을 켜면 뭐가 달라질까 — 웹 검색 도구와 출처

- [Claude 문서 — Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) — 모델이 언제 검색을 실행하는지, 결과에 인용(출처)을 붙이는 방식을 설명해요.
- [Gao et al. 2023 — Retrieval-Augmented Generation for Large Language Models: A Survey](https://arxiv.org/abs/2312.10997) — 모델의 지식 마감·오래된 지식 문제를 검색으로 보완하는 방식을 정리한 서베이예요.

## E24 우리 학교 AI 도구, 무엇을 보고 고를까 — 모델 카드와 데이터 처리

- [Model Cards for Model Reporting (Mitchell et al., 2019)](https://arxiv.org/abs/1810.03993) — 모델이 무엇으로 학습했고, 어디에 적합하며, 어떤 한계·편향이 있는지 적어 두는 모델 카드를 제안한 논문.
- [AI Risk Management Framework — NIST](https://www.nist.gov/itl/ai-risk-management-framework) — AI 위험을 다스리기(Govern)·파악(Map)·측정(Measure)·관리(Manage) 네 기능으로 보는 프레임워크.

# 첫 화면의 숫자

- 43%(OECD 평균 36%), 76%: OECD TALIS 2024 — [AI 영상 미디어교육 2026 대시보드](https://gottkf1208.github.io/ai-video-media-edu/)의 출처 섹션을 따름
- 62.9%: 한국교육과정평가원 2026 — 같은 대시보드
- AI 선도교사 연수 모집 10,963명·신청 10,268명(2026) — 같은 대시보드
- AI 아바타 영상과 강사 영상의 학습 효과에 유의한 차이가 없었다는 근거: Leiker et al., 2023 — 같은 대시보드(E14에서도 인용)
- 딥페이크 판별 정확도 55.5% → 65.1%: Diel et al., 2024 메타분석 — 같은 대시보드(E14)

# 사례 영상과 통계

- [브루 연수 전 40분 특강 강의안](https://gottkf1208.github.io/vrew-talk/) — E3·E4의 프레임은 이 강의안의 v1.mp4(7초·11초)에서 뽑았어요.
- Common Crawl CC-MAIN-2026-39 기준 영어 약 42%, 한국어 약 0.8%(CLD2, 문서 수 기준) — E9에서는 "가장 크다 / 1% 안팎"으로만 말해요.
