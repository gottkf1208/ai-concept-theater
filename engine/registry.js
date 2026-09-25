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
  /* 다음 시즌: 대본 초안만 있어요. */
  { no: 7, slug: 'n1-consistency', file: 'episodes/next/n1-consistency.js', status: 'soon' },
  { no: 8, slug: 'n2-video-cost', file: 'episodes/next/n2-video-cost.js', status: 'soon' },
  { no: 9, slug: 'n3-english-prompt', file: 'episodes/next/n3-english-prompt.js', status: 'soon' },
  { no: 10, slug: 'n4-reasoning', file: 'episodes/next/n4-reasoning.js', status: 'soon' },
  { no: 11, slug: 'n5-vibecoding', file: 'episodes/next/n5-vibecoding.js', status: 'soon' },
  { no: 12, slug: 'n6-ai-label', file: 'episodes/next/n6-ai-label.js', status: 'soon' }
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
