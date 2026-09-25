/* 이미지 자산 목록. 새 그림을 넣으면 여기에 이름을 한 줄 추가해요(확장자 빼고).
   char: assets/char/{이름}.webp|png  — 쿼카 포즈
   key : assets/key/{이름}.webp|png   — 편별 의상 변형(slug)과 첫 화면 히어로 */
export default {
  char: { base: 'webp', point: 'webp', think: 'webp', oops: 'webp', tablet: 'webp', wave: 'webp', dice: 'webp', glass: 'webp', idea: 'webp', globe: 'webp' },
  key: {
    hero: 'webp', 'hero-wide': 'webp',
    'e1-agent-mcp': 'webp', 'e2-seed': 'webp', 'e3-diffusion': 'webp', 'e4-plausible': 'webp', 'e5-context': 'webp', 'e6-rag': 'webp',
    'n1-consistency': 'webp', 'n2-video-cost': 'webp', 'n3-english-prompt': 'webp', 'n4-reasoning': 'webp', 'n5-vibecoding': 'webp', 'n6-ai-label': 'webp'
  }
};
