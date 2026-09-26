/* 생성 이미지의 한 줄 글자를 지우고 다시 얹기. 사용: node test/fixtext.mjs <png> <y0> <h> <text> <fontSize> <weight> <color> <left|center> [x0] */
import sharp from 'sharp'; import { chromium } from 'playwright';
const [src, y0s, hs, text, fs, fw, color, align, x0s] = process.argv.slice(2);
const y0 = +y0s, h = +hs, x0 = +(x0s || 0);
const { width } = await sharp(src).metadata();
const strip = await sharp(src).extract({ left: 0, top: y0, width, height: h }).blur(40).toBuffer();
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width, height: h }, deviceScaleFactor: 1 });
await p.setContent(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"><body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:${align === 'center' ? 'center' : 'flex-start'};padding-left:${x0}px;width:${width}px;height:${h}px;box-sizing:border-box;font-family:'Pretendard Variable',Pretendard,sans-serif;font-size:${fs}px;font-weight:${fw};color:${color};letter-spacing:-.02em;white-space:nowrap">${text}</body>`);
await p.waitForTimeout(800); await p.evaluate(() => document.fonts.ready);
const txt = await p.screenshot({ omitBackground: true }); await b.close();
const out = src.replace(/\.png$/, '_fix.png');
await sharp(src).composite([{ input: strip, left: 0, top: y0 }, { input: txt, left: 0, top: y0 }]).png().toFile(out);
console.log('ok', out);
