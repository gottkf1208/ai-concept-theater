import { chromium } from 'playwright';
const OUT = process.env.OUT; const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
pg.on('pageerror', e => console.log('pageerror', e.message));
await pg.goto('http://localhost:5310/watch.html?ep=v8-motion-code&mode=rec', { waitUntil: 'networkidle' });
await pg.waitForTimeout(400); await pg.keyboard.press('Space'); await pg.waitForTimeout(300);
await pg.evaluate(() => window.__theater.goto(7, 0));
for (const k of [1, 2, 3, 4, 5, 6]) { await pg.waitForTimeout(1300); await pg.screenshot({ path: `${OUT}/w-${k}.png` }); }
await b.close();
