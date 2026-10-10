/* 에피소드 목록. 새 편은 episodes/에 파일을 만들고 여기에 한 줄 추가하면 끝이에요. */
export const TRACKS = {
  A: { label: '트랙 A', desc: 'AI 영상을 만들다 생기는 "왜?"' },
  B: { label: '트랙 B', desc: '요즘 AI를 따라잡는 필수 개념' },
  C: { label: '트랙 C', desc: '원리를 끝까지 파고드는 심화편' },
  /* v2 (2026-10): 시즌이 곧 트랙 */
  S1: { label: '시즌 1 · 입문', desc: 'AI와 첫 대화' },
  S2: { label: '시즌 2 · 기본', desc: '이미지·영상을 만들며 배우는 원리' },
  S3: { label: '시즌 3 · 활용', desc: '에이전트의 시대' },
  S4: { label: '시즌 4 · 심화', desc: '원리를 끝까지 파고들기' },
  S5: { label: '시즌 5 · 판단', desc: '2026년의 AI, 교실의 판단' },
  S777: { label: '시즌 777 · 지금', desc: '2026년 9월 말~10월 초, 지금 화제인 AI 소식으로 배우는 개념' },
  S8: { label: '시즌 8 · 편집실', desc: '손이 없는 편집자: 클로드가 영상을 만지는 법 (세로·강의식)' }
};

export const EPISODES_V1 = [
  { no: 1, slug: 'e1-agent-mcp', file: 'episodes/e1-agent-mcp.js', status: 'ready' },
  { no: 2, slug: 'e2-seed', file: 'episodes/e2-seed.js', status: 'ready' },
  { no: 3, slug: 'e3-diffusion', file: 'episodes/e3-diffusion.js', status: 'ready' },
  { no: 4, slug: 'e4-plausible', file: 'episodes/e4-plausible.js', status: 'ready' },
  { no: 5, slug: 'e5-context', file: 'episodes/e5-context.js', status: 'ready' },
  { no: 6, slug: 'e6-rag', file: 'episodes/e6-rag.js', status: 'ready' },
  /* 시즌 2 */
  { no: 7, slug: 'n1-consistency', file: 'episodes/next/n1-consistency.js', status: 'ready' },
  { no: 8, slug: 'n2-video-cost', file: 'episodes/next/n2-video-cost.js', status: 'ready' },
  { no: 9, slug: 'n3-english-prompt', file: 'episodes/next/n3-english-prompt.js', status: 'ready' },
  { no: 10, slug: 'n4-reasoning', file: 'episodes/next/n4-reasoning.js', status: 'ready' },
  { no: 11, slug: 'n5-vibecoding', file: 'episodes/next/n5-vibecoding.js', status: 'ready' },
  { no: 12, slug: 'n6-ai-label', file: 'episodes/next/n6-ai-label.js', status: 'ready' },
  /* 시즌 3: AI 영상과 소리, 한 걸음 더 */
  { no: 13, slug: 's3-voice', file: 'episodes/s3/s3-voice.js', status: 'ready' },
  { no: 14, slug: 's3-avatar', file: 'episodes/s3/s3-avatar.js', status: 'ready' },
  { no: 15, slug: 's3-music', file: 'episodes/s3/s3-music.js', status: 'ready' },
  { no: 16, slug: 's3-subtitle', file: 'episodes/s3/s3-subtitle.js', status: 'ready' },
  { no: 17, slug: 's3-vision', file: 'episodes/s3/s3-vision.js', status: 'ready' },
  { no: 18, slug: 's3-role', file: 'episodes/s3/s3-role.js', status: 'ready' },
  /* 시즌 4: 교실의 판단 */
  { no: 19, slug: 's4-grading', file: 'episodes/s4/s4-grading.js', status: 'ready' },
  { no: 20, slug: 's4-sycophancy', file: 'episodes/s4/s4-sycophancy.js', status: 'ready' },
  { no: 21, slug: 's4-privacy', file: 'episodes/s4/s4-privacy.js', status: 'ready' },
  { no: 22, slug: 's4-calc', file: 'episodes/s4/s4-calc.js', status: 'ready' },
  { no: 23, slug: 's4-search', file: 'episodes/s4/s4-search.js', status: 'ready' },
  { no: 24, slug: 's4-choose', file: 'episodes/s4/s4-choose.js', status: 'ready' },
  /* 시즌 5: 깊이 파기(심화) */
  { no: 25, slug: 's5-degradation', file: 'episodes/s5/s5-degradation.js', status: 'ready' },
  { no: 26, slug: 's5-motion-prompt', file: 'episodes/s5/s5-motion-prompt.js', status: 'ready' },
  { no: 27, slug: 's5-upscale', file: 'episodes/s5/s5-upscale.js', status: 'ready' },
  { no: 28, slug: 's5-guidance', file: 'episodes/s5/s5-guidance.js', status: 'ready' },
  { no: 29, slug: 's5-controlnet', file: 'episodes/s5/s5-controlnet.js', status: 'ready' },
  { no: 30, slug: 's5-long-video', file: 'episodes/s5/s5-long-video.js', status: 'ready' }
];

/* v2 전면 개편(2026-10): 40편. 완성되면 위 목록을 대체해요. */
export const EPISODES = [
  { no: 1, slug: 'v1-next-token', file: 'episodes/v2/v1-next-token.js', status: 'ready', track: 'S1' },
  { no: 2, slug: 'v1-context', file: 'episodes/v2/v1-context.js', status: 'ready', track: 'S1' },
  { no: 3, slug: 'v1-prompt-parts', file: 'episodes/v2/v1-prompt-parts.js', status: 'ready', track: 'S1' },
  { no: 4, slug: 'v1-hallucination', file: 'episodes/v2/v1-hallucination.js', status: 'ready', track: 'S1' },
  { no: 5, slug: 'v1-rag', file: 'episodes/v2/v1-rag.js', status: 'ready', track: 'S1' },
  { no: 6, slug: 'v1-reasoning', file: 'episodes/v2/v1-reasoning.js', status: 'ready', track: 'S1' },
  { no: 7, slug: 'v1-ai-label', file: 'episodes/v2/v1-ai-label.js', status: 'ready', track: 'S1' },
  { no: 8, slug: 'v1-student-privacy', file: 'episodes/v2/v1-student-privacy.js', status: 'ready', track: 'S1' },
  { no: 9, slug: 'v2-seed', file: 'episodes/v2/v2-seed.js', status: 'ready', track: 'S2' },
  { no: 10, slug: 'v2-text-render', file: 'episodes/v2/v2-text-render.js', status: 'ready', track: 'S2' },
  { no: 11, slug: 'v2-english-prompt', file: 'episodes/v2/v2-english-prompt.js', status: 'ready', track: 'S2' },
  { no: 12, slug: 'v2-consistency', file: 'episodes/v2/v2-consistency.js', status: 'ready', track: 'S2' },
  { no: 13, slug: 'v2-motion-prompt', file: 'episodes/v2/v2-motion-prompt.js', status: 'ready', track: 'S2' },
  { no: 14, slug: 'v2-video-cost', file: 'episodes/v2/v2-video-cost.js', status: 'ready', track: 'S2' },
  { no: 15, slug: 'v2-voice', file: 'episodes/v2/v2-voice.js', status: 'ready', track: 'S2' },
  { no: 16, slug: 'v2-subtitle', file: 'episodes/v2/v2-subtitle.js', status: 'ready', track: 'S2' },
  { no: 17, slug: 'v3-agent-mcp', file: 'episodes/v2/v3-agent-mcp.js', status: 'ready', track: 'S3' },
  { no: 18, slug: 'v3-computer-use', file: 'episodes/v2/v3-computer-use.js', status: 'ready', track: 'S3' },
  { no: 19, slug: 'v3-prompt-injection', file: 'episodes/v2/v3-prompt-injection.js', status: 'ready', track: 'S3' },
  { no: 20, slug: 'v3-tool-use', file: 'episodes/v2/v3-tool-use.js', status: 'ready', track: 'S3' },
  { no: 21, slug: 'v3-vibecoding', file: 'episodes/v2/v3-vibecoding.js', status: 'ready', track: 'S3' },
  { no: 22, slug: 'v3-multimodal', file: 'episodes/v2/v3-multimodal.js', status: 'ready', track: 'S3' },
  { no: 23, slug: 'v3-memory', file: 'episodes/v2/v3-memory.js', status: 'ready', track: 'S3' },
  { no: 24, slug: 'v3-companion', file: 'episodes/v2/v3-companion.js', status: 'ready', track: 'S3' },
  { no: 25, slug: 'v4-degradation', file: 'episodes/v2/v4-degradation.js', status: 'ready', track: 'S4' },
  { no: 26, slug: 'v4-upscale', file: 'episodes/v2/v4-upscale.js', status: 'ready', track: 'S4' },
  { no: 27, slug: 'v4-guidance', file: 'episodes/v2/v4-guidance.js', status: 'ready', track: 'S4' },
  { no: 28, slug: 'v4-controlnet', file: 'episodes/v2/v4-controlnet.js', status: 'ready', track: 'S4' },
  { no: 29, slug: 'v4-long-video', file: 'episodes/v2/v4-long-video.js', status: 'ready', track: 'S4' },
  { no: 30, slug: 'v4-attention', file: 'episodes/v2/v4-attention.js', status: 'ready', track: 'S4' },
  { no: 31, slug: 'v4-embedding', file: 'episodes/v2/v4-embedding.js', status: 'ready', track: 'S4' },
  { no: 32, slug: 'v4-rlhf', file: 'episodes/v2/v4-rlhf.js', status: 'ready', track: 'S4' },
  { no: 33, slug: 'v5-model-collapse', file: 'episodes/v2/v5-model-collapse.js', status: 'ready', track: 'S5' },
  { no: 34, slug: 'v5-open-weight', file: 'episodes/v2/v5-open-weight.js', status: 'ready', track: 'S5' },
  { no: 35, slug: 'v5-on-device', file: 'episodes/v2/v5-on-device.js', status: 'ready', track: 'S5' },
  { no: 36, slug: 'v5-grading', file: 'episodes/v2/v5-grading.js', status: 'ready', track: 'S5' },
  { no: 37, slug: 'v5-ai-literacy', file: 'episodes/v2/v5-ai-literacy.js', status: 'ready', track: 'S5' },
  { no: 38, slug: 'v5-law-timeline', file: 'episodes/v2/v5-law-timeline.js', status: 'ready', track: 'S5' },
  { no: 39, slug: 'v5-energy', file: 'episodes/v2/v5-energy.js', status: 'ready', track: 'S5' },
  { no: 40, slug: 'v5-choose', file: 'episodes/v2/v5-choose.js', status: 'ready', track: 'S5' },
  { no: 41, slug: 't7-sonnet-opus-55', file: 'episodes/s777/t7-sonnet-opus-55.js', status: 'ready', track: 'S777' },
  { no: 42, slug: 't7-gpt6-sol-luna', file: 'episodes/s777/t7-gpt6-sol-luna.js', status: 'ready', track: 'S777' },
  { no: 43, slug: 't7-argon-staged', file: 'episodes/s777/t7-argon-staged.js', status: 'ready', track: 'S777' },
  { no: 44, slug: 't7-prompt-caching', file: 'episodes/s777/t7-prompt-caching.js', status: 'ready', track: 'S777' },
  { no: 45, slug: 't7-model-retirement', file: 'episodes/s777/t7-model-retirement.js', status: 'ready', track: 'S777' },
  { no: 46, slug: 't7-solar-mini4-moe', file: 'episodes/s777/t7-solar-mini4-moe.js', status: 'ready', track: 'S777' },
  { no: 47, slug: 't7-dots-autopilot', file: 'episodes/s777/t7-dots-autopilot.js', status: 'ready', track: 'S777' },
  { no: 48, slug: 't7-agent-sandbox', file: 'episodes/s777/t7-agent-sandbox.js', status: 'ready', track: 'S777' },
  { no: 49, slug: 't7-gemini-skills', file: 'episodes/s777/t7-gemini-skills.js', status: 'ready', track: 'S777' },
  { no: 50, slug: 't7-whale-ai-chat', file: 'episodes/s777/t7-whale-ai-chat.js', status: 'ready', track: 'S777' },
  { no: 51, slug: 't7-ai-monitor', file: 'episodes/s777/t7-ai-monitor.js', status: 'ready', track: 'S777' },
  { no: 52, slug: 't7-agentic-privacy', file: 'episodes/s777/t7-agentic-privacy.js', status: 'ready', track: 'S777' },
  { no: 53, slug: 't7-live-avatar', file: 'episodes/s777/t7-live-avatar.js', status: 'ready', track: 'S777' },
  { no: 54, slug: 't7-voice-design', file: 'episodes/s777/t7-voice-design.js', status: 'ready', track: 'S777' },
  { no: 55, slug: 't7-streaming-stt', file: 'episodes/s777/t7-streaming-stt.js', status: 'ready', track: 'S777' },
  { no: 56, slug: 't7-kling4-keyframes', file: 'episodes/s777/t7-kling4-keyframes.js', status: 'ready', track: 'S777' },
  { no: 57, slug: 't7-audio-glasses-exam', file: 'episodes/s777/t7-audio-glasses-exam.js', status: 'ready', track: 'S777' },
  { no: 58, slug: 't7-guided-vision', file: 'episodes/s777/t7-guided-vision.js', status: 'ready', track: 'S777' },
  { no: 59, slug: 't7-synthid-bio-labels', file: 'episodes/s777/t7-synthid-bio-labels.js', status: 'ready', track: 'S777' },
  { no: 60, slug: 't7-distillation-defense', file: 'episodes/s777/t7-distillation-defense.js', status: 'ready', track: 'S777' },
  { no: 61, slug: 't7-training-copyright', file: 'episodes/s777/t7-training-copyright.js', status: 'ready', track: 'S777' },
  { no: 62, slug: 't7-mentalhealthbench', file: 'episodes/s777/t7-mentalhealthbench.js', status: 'ready', track: 'S777' },
  { no: 63, slug: 't7-safety-case', file: 'episodes/s777/t7-safety-case.js', status: 'ready', track: 'S777' },
  { no: 64, slug: 't7-open-weight-jailbreak', file: 'episodes/s777/t7-open-weight-jailbreak.js', status: 'ready', track: 'S777' },
  { no: 65, slug: 't7-research-ethics-guide', file: 'episodes/s777/t7-research-ethics-guide.js', status: 'ready', track: 'S777' },
  { no: 66, slug: 't7-public-ai-ethics', file: 'episodes/s777/t7-public-ai-ethics.js', status: 'ready', track: 'S777' },
  { no: 67, slug: 't7-topik-ai-grading', file: 'episodes/s777/t7-topik-ai-grading.js', status: 'ready', track: 'S777' },
  { no: 68, slug: 't7-fact-check-campaign', file: 'episodes/s777/t7-fact-check-campaign.js', status: 'ready', track: 'S777' },
  { no: 69, slug: 't7-deepfake-response', file: 'episodes/s777/t7-deepfake-response.js', status: 'ready', track: 'S777' },
  { no: 70, slug: 't7-super-intelligence-word', file: 'episodes/s777/t7-super-intelligence-word.js', status: 'ready', track: 'S777' },
  { no: 76, slug: 'v8-motion-code', file: 'episodes/s8/v8-motion-code.js', status: 'ready', track: 'S8' }
];

export async function loadEpisode(slug, base = '') {
  const e = EPISODES.find(x => x.slug === slug);
  if (!e) return null;
  const mod = await import(new URL('../' + e.file, import.meta.url).href);
  return Object.assign({ no: e.no, status: e.status }, mod.default, e.track ? { track: e.track } : {});
}
export async function loadAll(base = '') {
  const out = [];
  for (const e of EPISODES) {
    try { const mod = await import(new URL('../' + e.file, import.meta.url).href); out.push(Object.assign({ no: e.no, status: e.status, slug: e.slug }, mod.default, e.track ? { track: e.track } : {})); }
    catch (err) { out.push({ no: e.no, status: 'soon', slug: e.slug, title: e.slug, missing: true }); }
  }
  return out;
}
