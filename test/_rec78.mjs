import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const FF = 'C:/Users/dumok/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffmpeg.exe';
const OUT = 'C:/Users/dumok/Downloads/AI개념극장_통합(1005)/05_영상_무음마스터'; const TMP = 'C:/Users/dumok/AppData/Local/Temp/claude/C--Users-dumok-OneDrive--------------/5a21959d-433e-4416-ba9d-d8537b3c6458/scratchpad/rec';
fs.mkdirSync(TMP, { recursive: true });
const br = await chromium.launch();
for (const [fmt, w, h, name] of [['', 720, 1280, 'E78_세로_9x16_무음마스터'], ['&fmt=wide', 1280, 720, 'E78_가로_16x9_무음마스터']]) {
  const ctx = await br.newContext({ viewport: { width: w, height: h }, recordVideo: { dir: TMP, size: { width: w, height: h } } });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5310/watch.html?ep=v8-php2shell&mode=rec${fmt}`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  const t0 = Date.now(); await page.keyboard.press('Space');
  await page.waitForFunction(() => window.__theater && window.__theater.ended, null, { timeout: 200000, polling: 500 });
  await page.waitForTimeout(1500); const dur = (Date.now() - t0) / 1000;
  const vid = page.video(); await page.close(); const src = await vid.path(); await ctx.close();
  const dst = path.join(OUT, name + '.mp4');
  execFileSync(FF, ['-y', '-i', src, '-r', '30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', '-an', dst], { stdio: 'ignore' });
  console.log(name, 'play', dur.toFixed(1) + 's', 'size', (fs.statSync(dst).size / 1e6).toFixed(1) + 'MB');
}
await br.close();
