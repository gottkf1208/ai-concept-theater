/* 각 편 장면 중간(약 10초) 프레임 캡처(디자인 점검용) — 장면 칩 클릭은 자동 재생을 시작해요 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('test/mid', { recursive: true });
const BASE = 'http://localhost:5310/';
const want = { 's3-voice': [2], 's3-avatar': [3], 's3-music': [2], 's3-subtitle': [3], 's3-vision': [2], 's3-role': [4], 's4-grading': [3], 's4-sycophancy': [3], 's4-privacy': [4], 's4-calc': [3], 's4-search': [2], 's4-choose': [4] };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [slug, scenes] of Object.entries(want)) {
  await page.goto(`${BASE}watch.html?ep=${slug}`, { waitUntil: 'networkidle' });
  for (const sc of scenes) {
    await page.locator('.scene-list button').nth(sc - 1).click();
    await page.waitForTimeout(10500);
    await page.locator('.controls .btn.primary').click();
    await page.locator('.stage-wrap').screenshot({ path: `test/mid/${slug}-s${sc}.png` });
  }
}
await browser.close(); console.log('ok');
