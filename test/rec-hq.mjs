/* 고화질 무음 마스터 녹화. 사용: node test/rec-hq.mjs <slug> <out.mp4> [wide]
   CDP 스크린캐스트로 1.5배 스케일(세로 1080×1920 / 가로 1920×1080) 프레임을 받아 ffmpeg libx264 crf16 30fps로 인코딩. */
import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const [slug, out, fmt] = process.argv.slice(2); const wide = fmt === 'wide';
const FF = 'C:/Users/dumok/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffmpeg.exe';
const W = wide ? 1280 : 720, H = wide ? 720 : 1280, SCALE = 1.5;
const tmp = path.join(process.env.TEMP || '.', `rec-${slug}-${wide ? 'w' : 'v'}`); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
const p = await ctx.newPage();
await p.goto(`http://localhost:5310/watch.html?ep=${slug}&mode=rec${wide ? '&fmt=wide' : ''}`, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const cdp = await ctx.newCDPSession(p);
const frames = []; let n = 0, t0 = 0;
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  const ts = metadata.timestamp; if (!t0) t0 = ts;
  const f = path.join(tmp, `f${String(n++).padStart(5, '0')}.jpg`); fs.writeFileSync(f, Buffer.from(data, 'base64')); frames.push({ f, t: ts - t0 });
  try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch {}
});
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: Math.round(W * SCALE), maxHeight: Math.round(H * SCALE), everyNthFrame: 2 });
await p.waitForTimeout(300);
const tStart = await p.evaluate(() => performance.now() / 1000); const nAtStart = frames.length;
await p.keyboard.press('Space');
await p.waitForFunction(() => window.__theater?.ended, null, { timeout: 300000, polling: 250 });
await p.waitForTimeout(2500);
await cdp.send('Page.stopScreencast'); await b.close();
/* 시작 카드 이후 프레임부터(키 누르기 직전 프레임 수 기준) */
const use = frames.slice(nAtStart + 1); const base = use[0].t;
const list = use.map((fr, i) => `file '${fr.f.split(String.fromCharCode(92)).join('/')}'\nduration ${Math.max(0.001, ((use[i + 1]?.t ?? fr.t + 1 / 30) - fr.t)).toFixed(4)}`).join('\n') + `\nfile '${use.at(-1).f.split(String.fromCharCode(92)).join('/')}'\n`;
const lf = path.join(tmp, 'list.txt'); fs.writeFileSync(lf, list);
console.log('frames', frames.length, 'used', use.length, 'secs', (use.at(-1).t - base).toFixed(1));
execFileSync(FF, ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lf, '-vf', `scale=${Math.round(W * SCALE)}:${Math.round(H * SCALE)}:flags=lanczos,format=yuv420p`, '-fps_mode', 'cfr', '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-movflags', '+faststart', out], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true }); console.log('saved', out);
