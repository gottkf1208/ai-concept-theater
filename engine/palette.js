/* 편별 색 팔레트: 그 편 쿼카 의상에서 뽑은 두 가지 강조색.
   a1 = 주 강조(도식·아이콘·강조어), a2 = 보조 강조. 글자로도 쓰이니 흰 바탕에서 읽히는 진한 톤으로. */
export const PALETTES = {
  'e1-agent-mcp':     { a1: '#2563EB', a2: '#0D9488', name: '아쿠아 후드' },
  'e2-seed':          { a1: '#CA8A04', a2: '#2563EB', name: '노란 우비' },
  'e3-diffusion':     { a1: '#DB2777', a2: '#7C3AED', name: '화가 앞치마' },
  'e4-plausible':     { a1: '#B45309', a2: '#DC2626', name: '탐정 코트' },
  'e5-context':       { a1: '#7C3AED', a2: '#D97706', name: '카디건' },
  'e6-rag':           { a1: '#1E40AF', a2: '#0891B2', name: '조끼와 넥타이' },
  'n1-consistency':   { a1: '#4D7C0F', a2: '#EA580C', name: '사진사 조끼' },
  'n2-video-cost':    { a1: '#DC2626', a2: '#374151', name: '검은 터틀넥' },
  'n3-english-prompt':{ a1: '#1D4ED8', a2: '#0D9488', name: '데님 재킷' },
  'n4-reasoning':     { a1: '#15803D', a2: '#A16207', name: '초록 조끼' },
  'n5-vibecoding':    { a1: '#4F46E5', a2: '#0891B2', name: '개발자 후드' },
  'n6-ai-label':      { a1: '#EA580C', a2: '#4B5563', name: '앞치마' },
  's3-voice':         { a1: '#DB2777', a2: '#7C3AED', name: '성우 헤드셋' },
  's3-avatar':        { a1: '#7C3AED', a2: '#DB2777', name: '보라 스카프' },
  's3-music':         { a1: '#9333EA', a2: '#E11D48', name: 'DJ 헤드폰' },
  's3-subtitle':      { a1: '#16A34A', a2: '#0284C7', name: '연두 셔츠' },
  's3-vision':        { a1: '#0284C7', a2: '#475569', name: '실험 가운' },
  's3-role':          { a1: '#1D4ED8', a2: '#D97706', name: '줄무늬 셔츠' },
  's4-grading':       { a1: '#1F2937', a2: '#CA8A04', name: '심판 셔츠' },
  's4-sycophancy':    { a1: '#CA8A04', a2: '#0891B2', name: '노란 스웨터' },
  's4-privacy':       { a1: '#EA580C', a2: '#1E40AF', name: '형광 조끼' },
  's4-calc':          { a1: '#0369A1', a2: '#475569', name: '하늘색 셔츠' },
  's4-search':        { a1: '#92400E', a2: '#0284C7', name: '기자 조끼' },
  's4-choose':        { a1: '#1E3A8A', a2: '#059669', name: '남색 재킷' }
};
export const DEFAULT_PALETTE = { a1: '#2563EB', a2: '#EA580C', name: '기본' };

export function applyPalette(el, slug) {
  const p = PALETTES[slug] || DEFAULT_PALETTE;
  el.style.setProperty('--acc1', p.a1);
  el.style.setProperty('--acc2', p.a2);
  el.dataset.palette = slug;
  return p;
}
