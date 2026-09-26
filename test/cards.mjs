/* 카드뉴스 렌더: test/cards.html의 카드 4장을 1080×1350 PNG로. 사용: node test/cards.mjs → cards/E09/ */
import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = 'cards/E09'; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
for (let i = 1; i <= 4; i++) {
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto(`http://localhost:5310/test/cards.html?card=${i}`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.__ready);
  await p.waitForTimeout(250);
  /* 잘림 검사: 카드 안 요소가 아래로 넘치면 알림 */
  const over = await p.evaluate(() => [...document.querySelectorAll('.card.on > *:not(.blob):not(.halo):not(.char)')].filter(el => el.getBoundingClientRect().bottom > 1350 - 60).map(el => el.className || el.tagName));
  if (over.length) console.log(`card ${i} 아래로 넘침:`, over);
  await p.screenshot({ path: `${OUT}/E09_카드뉴스_${i}of4.png`, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await p.close();
  console.log('card', i);
}
await b.close();
