/* 대표 화면 캡처: 아카이브 썸네일(800×500 webp), og.png(1200×630), 보고용 스크린샷 3장 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const BASE = process.argv[2] || 'http://localhost:5310/';
mkdirSync('test/shots', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(BASE, { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
await page.screenshot({ path: 'test/shots/home.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
await sharp('test/shots/home.png').resize(800, 500, { fit: 'cover', position: 'top' }).webp({ quality: 84 }).toFile('test/shots/thumb.webp');
await sharp('test/shots/home.png').resize(1200, 630, { fit: 'cover', position: 'top' }).png().toFile('assets/og.png');
/* 시청 화면(장면 2, 5초 지점) */
await page.goto(`${BASE}watch.html?ep=e1-agent-mcp`, { waitUntil: 'networkidle' });
await page.locator('.scene-list button').nth(1).click(); await page.click('.controls .btn.primary'); await page.waitForTimeout(6500); await page.click('.controls .btn.primary');
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(200);
await page.screenshot({ path: 'test/shots/watch-e1.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
/* 연수 모드 극장 슬라이드 */
await page.goto(`${BASE}watch.html?ep=e2-seed&mode=train`, { waitUntil: 'networkidle' });
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(5000); await page.keyboard.press('Space');
await page.screenshot({ path: 'test/shots/train-e2.png' });
await browser.close();
console.log('ok');
