/* 24편 썸네일을 유튜브(1920×1080)·인스타 피드 4:5(1080×1350)·인스타 릴스/스토리 9:16(1080×1920)으로 뽑아요.
   사용: node test/thumbs.mjs [slug,slug]  → thumbnails/{youtube,instagram-feed,instagram-reels}/ */
import { chromium } from 'playwright';
import fs from 'node:fs';
globalThis.Image = class { }; globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) }; globalThis.AudioContext = class { };
const { EPISODES } = await import('../engine/registry.js');
const only = process.argv[2] ? process.argv[2].split(',') : null;
const FMTS = { yt: ['youtube', 1920, 1080], ig: ['instagram-feed', 1080, 1350], rl: ['instagram-reels', 1080, 1920] };
for (const d of Object.values(FMTS)) fs.mkdirSync(`thumbnails/${d[0]}`, { recursive: true });
const safe = t => t.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');
const season = n => n > 18 ? 'S4' : n > 12 ? 'S3' : n > 6 ? 'S2' : 'S1';
const browser = await chromium.launch();
let index = '| 파일 이름(세 폴더 공통) | 편 | 시즌 |\n|---|---|---|\n';
for (const e of EPISODES) {
  if (only && !only.includes(e.slug)) continue;
  const ep = (await import('../' + e.file)).default;
  const name = `E${String(e.no).padStart(2, '0')}_${season(e.no)}_${safe(ep.title)}`;
  for (const [fmt, [dir, w, h]] of Object.entries(FMTS)) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:5310/test/thumb.html?ep=${e.slug}&fmt=${fmt}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `thumbnails/${dir}/${name}.png`, clip: { x: 0, y: 0, width: w, height: h } });
    await page.close();
  }
  index += `| ${name}.png | ${ep.title} | ${season(e.no)} |\n`;
  console.log('thumb', e.slug);
}
await browser.close();
const readme = [
  '# 쿼카의 AI 개념극장 — 썸네일 24편',
  '',
  '- `youtube/`: 1920×1080 (16:9). 유튜브 썸네일·커뮤니티 글에 그대로.',
  '- `instagram-feed/`: 1080×1350 (4:5). 인스타 피드 세로형(피드에서 가장 크게 보이는 비율).',
  '- `instagram-reels/`: 1080×1920 (9:16). 릴스·스토리 표지, 세로 영상 첫 화면.',
  '- 파일 이름은 세 폴더 모두 같아요: E번호_시즌_제목.png',
  '- 다시 뽑기: `node test/thumbs.mjs` (로컬 서버 5310 필요). 디자인은 `test/thumb.html`.',
  '- 캐릭터 이미지는 AI 생성(힉스필드)이고, 편별 색은 `engine/palette.js`의 의상 팔레트를 그대로 써요.',
  '',
  index
].join('\n');
fs.writeFileSync('thumbnails/README.md', readme, 'utf8');
console.log('done');
