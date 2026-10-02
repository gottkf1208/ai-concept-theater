/* 글자가 칸 밖으로 밀리는 곳 찾기: 상자(.p-box) 안 글자가 상자 밖으로 나가거나, 말풍선·텍스트·칩이 자기 칸보다 넓거나 높은 경우.
   사용: node test/overflow.mjs [slug,slug] → test/overflow.json */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
globalThis.Image = class { }; globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) }; globalThis.AudioContext = class { };
const { EPISODES } = await import('../engine/registry.js');
const only = process.argv[2] ? process.argv[2].split(',') : null;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];
for (const e of EPISODES) {
  if (only && !only.includes(e.slug)) continue;
  const ep = (await import('../' + e.file)).default;
  await page.goto(`http://localhost:5310/watch.html?ep=${e.slug}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__theater);
  for (let i = 0; i < ep.scenes.length; i++) {
    const dur = ep.scenes[i].dur;
    await page.evaluate(([i, t]) => window.__theater.goto(i, t), [i, Math.max(0.5, dur - 1.5)]);
    await page.waitForTimeout(450);
    const found = await page.evaluate(() => {
      const stage = document.querySelector('.stage'); const sr = stage.getBoundingClientRect(); const k = 1280 / sr.width;
      const vis = el => { let n = el; while (n && n !== stage) { const cs = getComputedStyle(n); if (+cs.opacity < .12 || cs.visibility === 'hidden' || cs.display === 'none') return false; n = n.parentElement; } return true; };
      const out = [];
      const lab = el => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 22);
      stage.querySelectorAll('.p-box, .p-bubble, .p-text, .p-chip').forEach(el => {
        if (!vis(el)) return;
        const r = el.getBoundingClientRect(); if (r.width < 2) return;
        const cls = el.className.split(' ')[0];
        /* 1) 요소 자체가 자기 칸보다 넓거나 높음 */
        if (cls !== 'p-bubble' && (el.scrollWidth > el.clientWidth + 3 || el.scrollHeight > el.clientHeight + 3)) out.push({ kind: 'scroll', cls, a: lab(el), dw: Math.round((el.scrollWidth - el.clientWidth) * k), dh: Math.round((el.scrollHeight - el.clientHeight) * k) });
        /* 2) 글자 범위가 요소 밖으로 */
        const rg = document.createRange(); rg.selectNodeContents(el); const rects = rg.getClientRects();
        let maxR = -1e9, maxB = -1e9, minL = 1e9, minT = 1e9; for (const q of rects) { if (q.width < 1) continue; maxR = Math.max(maxR, q.right); maxB = Math.max(maxB, q.bottom); minL = Math.min(minL, q.left); minT = Math.min(minT, q.top); }
        if (maxR > -1e8) { const over = { r: Math.round((maxR - r.right) * k), b: Math.round((maxB - r.bottom) * k), l: Math.round((r.left - minL) * k), t: Math.round((r.top - minT) * k) };
          if (cls !== 'p-text' && (over.r > 3 || over.b > 3 || over.l > 3 || over.t > 3)) out.push({ kind: 'spill', cls, a: lab(el), ...over }); }
        /* 3) 상자 안 자식 요소가 상자 밖으로 */
        if (cls === 'p-box') el.querySelectorAll('*').forEach(c => { if (!vis(c)) return; const cr = c.getBoundingClientRect(); if (cr.width < 2 || cr.height < 2) return; const dr = Math.round((cr.right - r.right) * k), db = Math.round((cr.bottom - r.bottom) * k); if (dr > 3 || db > 3) out.push({ kind: 'child', cls, a: lab(el), c: lab(c) || c.className, dr, db }); });
      });
      /* 4) 무대 하단 한계(y 660) 넘는 요소 */
      stage.querySelectorAll('.p-box, .p-bubble, .p-text, .p-chip').forEach(el => { if (!vis(el)) return; const r = el.getBoundingClientRect(); const b = (r.bottom - sr.top) * k; if (b > 700) out.push({ kind: 'low', cls: el.className.split(' ')[0], a: lab(el), b: Math.round(b) }); });
      return out;
    });
    const seen = new Set();
    found.forEach(f => { const key = JSON.stringify(f); if (seen.has(key)) return; seen.add(key); report.push({ ep: `E${e.no} ${e.slug}`, scene: i + 1, ...f }); });
  }
  console.log('checked', e.slug);
}
await browser.close();
writeFileSync('test/overflow.json', JSON.stringify(report, null, 1));
for (const r of report) console.log(`[${r.kind}] ${r.ep} s${r.scene} (${r.cls}) "${r.a}" ${r.c ? '→ "' + r.c + '" ' : ''}${JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k]) => ['dw','dh','r','b','l','t','dr','db'].includes(k))))}`);
console.log('total', report.length);
