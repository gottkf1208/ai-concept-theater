/* 각 편 장면 중간(약 10초) 프레임 캡처(디자인 점검용) — 장면 칩 클릭은 자동 재생을 시작해요 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('test/mid', { recursive: true });
const BASE = 'http://localhost:5310/';
const want = { 'e1-agent-mcp': [2, 4], 'e3-diffusion': [4], 'e5-context': [4], 'n4-reasoning': [4], 's3-avatar': [3], 's4-grading': [3], 's4-choose': [4], 'e6-rag': [2] };
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
