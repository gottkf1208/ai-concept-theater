/* 모든 편·모든 장면을 장면 끝 1.5초 전에 캡처해 시즌별 컨택트 시트로 만들어요. 사용: node test/sweep.mjs [slug,slug] */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
globalThis.Image = class { }; globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) }; globalThis.AudioContext = class { };
const { EPISODES } = await import('../engine/registry.js');
const only = process.argv[2] ? process.argv[2].split(',') : null;
mkdirSync('test/sweep', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const groups = {};
for (const e of EPISODES) {
  if (only && !only.includes(e.slug)) continue;
  const ep = (await import('../' + e.file)).default;
  await page.goto(`http://localhost:5310/watch.html?ep=${e.slug}`, { waitUntil: 'networkidle' });
  const tiles = [];
  for (let i = 0; i < ep.scenes.length; i++) {
    const dur = ep.scenes[i].dur;
    await page.locator('.scene-list button').nth(i).click();
    await page.waitForTimeout(Math.max(500, (dur - 1.5) * 1000));
    await page.locator('.controls .btn.primary').click();
    const buf = await page.locator('.stage-wrap').screenshot();
    tiles.push(await sharp(buf).resize(560, 315).png().toBuffer());
  }
  const season = e.no > 18 ? 'S4' : e.no > 12 ? 'S3' : e.no > 6 ? 'S2' : 'S1';
  (groups[season] ??= []).push({ slug: e.slug, no: e.no, tiles });
  console.log('captured', e.slug);
}
for (const [season, eps] of Object.entries(groups)) {
  const rows = eps.length, cols = 5;
  const comp = [];
  eps.forEach((ep, r) => ep.tiles.forEach((b, c) => comp.push({ input: b, left: c * 570, top: r * 330 })));
  await sharp({ create: { width: cols * 570, height: rows * 330, channels: 3, background: '#ffffff' } }).composite(comp).png().toFile(`test/sweep/${season}.png`);
  console.log('sheet', season, eps.map(e => 'E' + e.no).join(' '));
}
await browser.close();
