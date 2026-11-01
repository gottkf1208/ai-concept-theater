import { chromium } from 'playwright'; import { mkdirSync } from 'node:fs';
const OUT = process.argv[2]; mkdirSync(OUT, { recursive: true });
const SHOTS = [[0, 9, 's1'], [1, 12, 's2'], [2, 11, 's3'], [3, 13, 's4'], [4, 8, 's5'], [5, 11, 's6'], [6, 13, 's7'], [7, 9, 's8']];
const br = await chromium.launch();
for (const fmt of ['', '&fmt=wide']) {
  const page = await br.newPage({ viewport: fmt ? { width: 1400, height: 900 } : { width: 800, height: 1400 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`http://localhost:5310/watch.html?ep=v8-php2shell&solo=1${fmt}`, { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  for (const [i, t, name] of SHOTS) { await page.evaluate(([i]) => window.__theater.goto(i, 0, true), [i]); await page.waitForTimeout(t * 1000); await page.locator('.theater').first().screenshot({ path: `${OUT}/${name}${fmt ? '-wide' : ''}.png` }); }
  console.log(fmt || 'vertical', 'errors', errs.slice(0, 2)); await page.close();
}
await br.close();
