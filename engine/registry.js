/* 에피소드 목록. 새 편은 episodes/에 파일을 만들고 여기에 한 줄 추가하면 끝이에요. */
export const TRACKS = {
  A: { label: '트랙 A', desc: 'AI 영상을 만들다 생기는 "왜?"' },
  B: { label: '트랙 B', desc: '요즘 AI를 따라잡는 필수 개념' }
};

export const EPISODES = [
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
  { no: 24, slug: 's4-choose', file: 'episodes/s4/s4-choose.js', status: 'ready' }
];

export async function loadEpisode(slug, base = '') {
  const e = EPISODES.find(x => x.slug === slug);
  if (!e) return null;
  const mod = await import(new URL('../' + e.file, import.meta.url).href);
  return Object.assign({ no: e.no, status: e.status }, mod.default);
}
export async function loadAll(base = '') {
  const out = [];
  for (const e of EPISODES) {
    try { const mod = await import(new URL('../' + e.file, import.meta.url).href); out.push(Object.assign({ no: e.no, status: e.status, slug: e.slug }, mod.default)); }
    catch (err) { out.push({ no: e.no, status: 'soon', slug: e.slug, title: e.slug, missing: true }); }
  }
  return out;
}
