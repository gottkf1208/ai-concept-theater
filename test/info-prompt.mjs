// 인포그래픽_스펙.json → 힉스필드 프롬프트 4개 (JSON 배열 출력)
import fs from 'node:fs';
const dir = process.argv[2];
const spec = JSON.parse(fs.readFileSync(`${dir}/인포그래픽_스펙.json`, 'utf8'));
const STYLE = 'Premium editorial infographic, 16:9, sophisticated Korean fintech-app aesthetic. Background: smooth diagonal gradient from pale periwinkle #EEF2FF to soft mint #E6FBF6 with faint fine grain. Frosted-glass cards (white 70% opacity, 1px white border, 28px radius, soft shadow). Pills: deep-blue #1D4ED8 or orange #EA580C with white text. Small 3D clay icons. No other text, no logos, no watermark. All Korean text spelled exactly as given, crisp and legible, generous margins.';
const layoutDesc = { 'two-cards': 'Two frosted-glass cards side by side', 'three-steps': 'Three frosted-glass step cards in a row connected by thin arrows, numbered pills', 'list': 'A 2x2 grid of frosted-glass cards', 'compare': 'Two frosted-glass columns side by side, left with blue pill, right with orange pill' };
const out = spec.map(s => {
  const cards = s.cards.map((c, i) => `Card ${i + 1}: pill text ${c.pill} , title ${c.title} , lines: ${c.lines.join(' / ')} (icon: ${c.icon})`).join('. ');
  const lay = layoutDesc[s.layout] || layoutDesc['list'];
  return { n: s.n, prompt: `${STYLE} Big bold Korean headline top-left, exactly this text: ${s.headline} (no punctuation after it). ${lay}. ${cards}. One line at the bottom in medium gray, exactly this text and no punctuation after it: ${s.footer}` };
});
console.log(JSON.stringify(out, null, 1));
