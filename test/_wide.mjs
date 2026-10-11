import { chromium } from 'playwright';
const OUT = process.env.OUT; const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => console.log('pageerror', e.message));
await pg.goto('http://localhost:5310/watch.html?ep=v8-motion-code&mode=rec&fmt=wide', { waitUntil: 'networkidle' });
await pg.waitForTimeout(500); await pg.keyboard.press('Space'); await pg.waitForTimeout(300);
for (const [i, t] of [[0, 6], [3, 12], [5, 9], [7, 6.5]]) { await pg.evaluate(([i, t]) => window.__theater.goto(i, t), [i, t]); await pg.waitForTimeout(600); await pg.screenshot({ path: `${OUT}/wide-${i + 1}.png` }); }
await b.close();
