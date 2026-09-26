/* 모든 편·모든 장면에서 겹치는 요소·잘린 요소를 찾아요. 장면 끝 1.5초 전 + 중간(dur/2) 두 시점.
   사용: node test/overlap.mjs [slug,slug]  → 콘솔에 표로 출력, test/overlap.json 저장 */
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
    for (const t of [Math.max(0.5, dur / 2), Math.max(0.5, dur - 1.5)]) {
      await page.evaluate(([i, t]) => window.__theater.goto(i, t), [i, t]);
      await page.waitForTimeout(450);
      const found = await page.evaluate(() => {
        const stage = document.querySelector('.stage');
        const sr = stage.getBoundingClientRect(); const k = 1280 / sr.width;
        const toS = r => ({ x: (r.left - sr.left) * k, y: (r.top - sr.top) * k, w: r.width * k, h: r.height * k, r: (r.right - sr.left) * k, b: (r.bottom - sr.top) * k });
        const vis = el => { let n = el; while (n && n !== stage) { const cs = getComputedStyle(n); if (+cs.opacity < .12 || cs.visibility === 'hidden' || cs.display === 'none') return false; n = n.parentElement; } return true; };
        const items = [];
        const sel = '.p-quokka, .p-bubble, .p-box, .p-text, .p-chip, .p-noise, .stage > img, .stage > canvas';
        stage.querySelectorAll(sel).forEach(el => {
          if (el.classList.contains('scene-title')) return;
          if (!vis(el)) return;
          let rect;
          if (el.classList.contains('p-quokka')) { const im = el.querySelector('img'); rect = toS(im.getBoundingClientRect()); /* 웹피 여백 */ rect.x += rect.w * .12; rect.w *= .76; rect.y += rect.h * .06; rect.h *= .9; rect.r = rect.x + rect.w; rect.b = rect.y + rect.h; }
          else if (el.classList.contains('p-text')) { const rg = document.createRange(); rg.selectNodeContents(el); const rr = rg.getBoundingClientRect(); if (!rr.width) return; rect = toS(rr); }
          else rect = toS(el.getBoundingClientRect());
          if (rect.w < 2 || rect.h < 2) return;
          const label = (el.classList.contains('p-quokka') ? '쿼카' : el.textContent.replace(/\s+/g, ' ').trim().slice(0, 18)) || el.className;
          items.push({ el, rect, label, cls: el.className.split(' ')[0] });
          /* 상자 안에 다른 요소를 넣는 '화면' 패턴: 상자 자체가 아니라 상자의 글자(라벨·부제·아이콘)와만 비교 */
          if (el.classList.contains('p-box')) {
            let u = null;
            el.querySelectorAll('.p-box-t, .p-box-s, .p-box-icon').forEach(c => { const rr = c.getBoundingClientRect(); if (!rr.width) return; u = u ? { left: Math.min(u.left, rr.left), top: Math.min(u.top, rr.top), right: Math.max(u.right, rr.right), bottom: Math.max(u.bottom, rr.bottom) } : { left: rr.left, top: rr.top, right: rr.right, bottom: rr.bottom }; });
            if (u) { const lr = toS({ left: u.left, top: u.top, right: u.right, bottom: u.bottom, width: u.right - u.left, height: u.bottom - u.top }); items.push({ el, rect: lr, label: label + '(글자)', cls: 'p-box-label', owner: rect }); }
          }
        });
        const out = [];
        items.forEach(a => { const r = a.rect; if (r.x < -2 || r.y < -2 || r.r > 1282 || r.b > 722) out.push({ kind: 'clip', a: a.label, cls: a.cls, rect: [r.x, r.y, r.r, r.b].map(Math.round) }); });
        for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
          const A = items[i], B = items[j];
          const ra = A.rect, rb = B.rect;
          const inside = (p, q) => p.x >= q.x - 2 && p.y >= q.y - 2 && p.r <= q.r + 2 && p.b <= q.b + 2;
          if (A.el === B.el) continue;
          if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
          /* 상자 라벨 항목은 그 상자 안에 완전히 들어온 요소하고만 비교 */
          if (A.owner && !inside(rb, A.owner)) continue;
          if (B.owner && !inside(ra, B.owner)) continue;
          /* 상자 안에 완전히 들어온 요소는 상자 자체와는 비교하지 않음(라벨과 비교) */
          if (A.cls === 'p-box' && !A.owner && inside(rb, ra)) continue;
          if (B.cls === 'p-box' && !B.owner && inside(ra, rb)) continue;
          const iw = Math.min(ra.r, rb.r) - Math.max(ra.x, rb.x), ih = Math.min(ra.b, rb.b) - Math.max(ra.y, rb.y);
          if (iw <= 4 || ih <= 4) continue;
          const area = iw * ih, small = Math.min(ra.w * ra.h, rb.w * rb.h);
          if (area < 300 || area / small < .06) continue;
          out.push({ kind: 'overlap', a: A.label, b: B.label, ca: A.cls, cb: B.cls, area: Math.round(area), pct: Math.round(100 * area / small) });
        }
        return out;
      });
      found.forEach(f => report.push({ ep: `E${e.no} ${e.slug}`, scene: i + 1, t: +t.toFixed(1), ...f }));
    }
  }
  console.log('checked', e.slug);
}
await browser.close();
writeFileSync('test/overlap.json', JSON.stringify(report, null, 1));
const key = r => `${r.ep}|${r.scene}|${r.kind}|${r.a}|${r.b || ''}`;
const seen = new Set();
for (const r of report) { const k = key(r); if (seen.has(k)) continue; seen.add(k);
  console.log(r.kind === 'clip' ? `[잘림] ${r.ep} s${r.scene} t${r.t}: "${r.a}" (${r.cls}) ${r.rect.join(',')}` : `[겹침] ${r.ep} s${r.scene} t${r.t}: "${r.a}" (${r.ca}) × "${r.b}" (${r.cb}) ${r.pct}%`); }
console.log('total', seen.size);
