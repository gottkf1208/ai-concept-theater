/* test/toss-info.html 카드 4장을 2배 해상도 PNG로. 사용: node test/toss-info.mjs <출력폴더> */
import { chromium } from 'playwright'; import fs from 'node:fs';
const OUT = process.argv[2] || 'C:/Users/dumok/Downloads/블로그_E10_인포그래픽_토스'; fs.mkdirSync(OUT, { recursive: true });
const names = ['01_같은_질문_다른_방식', '02_생각의_사슬_타임라인', '03_큰_모델_대신_긴_생각', '04_언제_켜고_언제_끌까'];
const b = await chromium.launch();
for (let i = 1; i <= 4; i++) {
  const p = await b.newPage({ viewport: { width: 1344, height: 752 }, deviceScaleFactor: 2 });
  await p.goto(`http://localhost:5310/test/toss-info.html?card=${i}`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.__ready); await p.waitForTimeout(200);
  const over = await p.evaluate(() => [...document.querySelectorAll('.card.on *')].filter(el => el.getBoundingClientRect().bottom > 752 || el.getBoundingClientRect().right > 1344).length);
  if (over) console.log('card', i, '넘침', over);
  await p.screenshot({ path: `${OUT}/${names[i - 1]}.png`, clip: { x: 0, y: 0, width: 1344, height: 752 } });
  await p.close(); console.log('card', i);
}
await b.close();
