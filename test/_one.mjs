import { chromium } from 'playwright';
const OUT = process.env.OUT; const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 620, height: 620 } });
await pg.goto('http://localhost:5310/test/_one.html', { waitUntil: 'networkidle' });
for (const k of [1, 2, 3, 4]) { await pg.waitForTimeout(1100); await pg.screenshot({ path: `${OUT}/ring-${k}.png` }); }
await b.close();
