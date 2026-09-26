/* 인포그래픽 하단 문장 한 줄을 지우고 정확한 글자로 다시 얹어요(오타 수정, 크레딧 0). */
import sharp from 'sharp'; import { chromium } from 'playwright';
const src = 'C:/Users/dumok/Downloads/블로그_E07_인포그래픽/02_캐릭터를_붙잡는_세_가지_방법.png';
const text = '요즘 도구의 캐릭터 고정 기능은 대체로 IP-Adapter 계열';
const img = sharp(src); const { width, height } = await img.metadata();
const y0 = 636, h = 64;
const strip = await sharp(src).extract({ left: 0, top: y0, width, height: h }).blur(30).toBuffer();
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width, height: h }, deviceScaleFactor: 1 });
await p.setContent(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"><body style="margin:0;background:transparent;display:grid;place-items:center;width:${width}px;height:${h}px;font-family:'Pretendard Variable',Pretendard,sans-serif;font-size:27px;font-weight:500;color:#4B5563;letter-spacing:-.01em">${text}</body>`);
await p.waitForTimeout(800); await p.evaluate(() => document.fonts.ready);
const txt = await p.screenshot({ omitBackground: true }); await b.close();
await sharp(src).composite([{ input: strip, left: 0, top: y0 }, { input: txt, left: 0, top: y0 }]).png().toFile(src.replace('.png', '_fix.png'));
console.log('ok');
