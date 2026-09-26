/* Playwright 자동 검사: 콘솔 오류 0, 가로 넘침 0, 재생·멈춤·장면 이동·만져 보기·연수·녹화·N 키, 스크린샷.
   사용: node test/run.mjs [baseURL]  (기본 http://localhost:5310/) */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:5310/';
const OUT = 'test/screens';
mkdirSync(OUT, { recursive: true });
const SLUGS = (process.env.SLUGS || 'e1-agent-mcp,e2-seed,e3-diffusion,e4-plausible,e5-context,e6-rag,n1-consistency,n2-video-cost,n3-english-prompt,n4-reasoning,n5-vibecoding,n6-ai-label,s3-voice,s3-avatar,s3-music,s3-subtitle,s3-vision,s3-role,s4-grading,s4-sycophancy,s4-privacy,s4-calc,s4-search,s4-choose,s5-degradation').split(',');
const VIEWPORTS = [{ name: 'desk', width: 1440, height: 900 }, { name: 'phone', width: 390, height: 844 }];
let fails = 0;
const ok = (cond, msg) => { if (cond) console.log('  ✓', msg); else { fails++; console.log('  ✗', msg); } };

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const errors = [];
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${page.url()}] ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${page.url()}] pageerror ${e.message}`));
  const overflow = async () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

  console.log(`\n== ${vp.name} ${vp.width}×${vp.height} ==`);
  /* 첫 화면 */
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  ok((await overflow()) <= 0, 'index: 가로 넘침 없음');
  ok((await page.locator('.ep').count()) >= 6, 'index: 에피소드 카드 6개 이상');
  ok((await page.locator('#todayLine').innerText()).length > 5, 'index: 오늘의 한 토막');
  await page.fill('#q', '시드');
  await page.waitForTimeout(150);
  const vis = await page.locator('.ep:not(.hide)').count();
  ok(vis >= 1 && vis < 6, `index: 검색 필터 동작(${vis}개)`);
  await page.fill('#q', '');
  await page.screenshot({ path: `${OUT}/index-${vp.name}.png`, fullPage: true });

  for (const slug of SLUGS) {
    console.log(`-- ${slug}`);
    await page.goto(`${BASE}watch.html?ep=${slug}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    ok((await overflow()) <= 0, 'watch: 가로 넘침 없음');
    const th = page.locator('.theater');
    ok(await th.count() === 1, 'watch: 극장 마운트');
    /* 재생 → 멈춤 */
    await page.click('.controls .btn.primary');
    await page.waitForTimeout(1500);
    const t1 = await page.locator('.controls .time').innerText();
    await page.click('.controls .btn.primary');
    await page.waitForTimeout(300);
    const t2 = await page.locator('.controls .time').innerText();
    await page.waitForTimeout(600);
    const t3 = await page.locator('.controls .time').innerText();
    ok(t1 !== '0:00 / 0:00' && t2 === t3, `watch: 재생·멈춤 (${t2})`);
    ok((await page.locator('.caption-bar').innerText()).length > 0, 'watch: 자막 표시');
    /* 장면 이동 */
    const n = await page.locator('.scene-list button').count();
    await page.locator('.scene-list button').nth(n - 1).click();
    await page.waitForTimeout(300);
    ok(await page.locator('.scene-list button').nth(n - 1).getAttribute('aria-current') === 'true', `watch: 장면 이동(${n}장면)`);
    await page.locator('.scene-list button').nth(1).click();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    ok(await page.locator('.scene-list button').nth(2).getAttribute('aria-current') === 'true', 'watch: → 키 장면 이동');
    await page.screenshot({ path: `${OUT}/${slug}-scene3-${vp.name}.png` });
    /* 끝까지 재생(시간 대신 마지막 장면으로 이동 후 재생) */
    await page.locator('.scene-list button').nth(n - 1).click();
    await page.click('.controls .btn.primary');
    const dur = await page.evaluate(() => { const t = document.querySelector('.controls .time').textContent.split('/')[1].trim().split(':'); return +t[0] * 60 + +t[1]; });
    ok(dur >= 55 && dur <= 90, `watch: 애니메이션 길이 ${dur}s (55~90)`);
    /* 만져 보기 */
    const panel = page.locator('#iPanel');
    const before = await panel.innerHTML();
    const btn = (await panel.locator('button.primary').count()) ? panel.locator('button.primary').first() : panel.locator('button, input[type=range], input[type=text], textarea').first();
    if (await btn.count()) {
      const tag = await btn.evaluate(e => e.tagName);
      if (tag === 'BUTTON') await btn.click(); else if (tag === 'INPUT') { const type = await btn.getAttribute('type'); if (type === 'range') await btn.evaluate(e => { e.value = e.max; e.dispatchEvent(new Event('input', { bubbles: true })); }); else await btn.fill('테스트 문장입니다'); } else await btn.fill('테스트 문장입니다');
      await page.waitForTimeout(300);
    }
    ok((await panel.innerHTML()) !== before, 'watch: 만져 보기 반응');
    await page.screenshot({ path: `${OUT}/${slug}-full-${vp.name}.png`, fullPage: true });
    /* 출처 */
    const links = await page.locator('#srcList a').evaluateAll(a => a.map(x => x.href));
    ok(links.length >= 2 && links.length <= 4, `watch: 출처 ${links.length}개`);
    /* 연수 모드 */
    await page.goto(`${BASE}watch.html?ep=${slug}&mode=train`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    ok(await page.locator('.slide.active.s-title').count() === 1, 'train: 제목 슬라이드');
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(600);
    ok(await page.locator('.slide.active#theaterSlide').count() === 1, 'train: → 극장 슬라이드');
    ok(await page.locator('.theater.playing').count() === 1, 'train: 자동 재생');
    await page.keyboard.press('Space'); await page.waitForTimeout(200);
    ok(await page.locator('.theater.playing').count() === 0, 'train: Space 멈춤');
    await page.keyboard.press('n'); await page.waitForTimeout(200);
    ok(await page.locator('#scriptOverlay.open').count() === 1, 'train: N 키 강사 대본');
    ok((await page.locator('#scriptOverlayBody').innerText()).length > 100, 'train: 대본 내용');
    await page.screenshot({ path: `${OUT}/${slug}-train-script-${vp.name}.png` });
    await page.keyboard.press('n'); await page.waitForTimeout(100);
    for (let k = 0; k < 8; k++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(80); }
    ok(await page.locator('.slide.active#sources').count() === 1, 'train: 끝까지 넘김');
    ok((await overflow()) <= 0, 'train: 가로 넘침 없음');
    await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}/${slug}-train-${vp.name}.png` });
    /* 녹화 모드 */
    await page.goto(`${BASE}watch.html?ep=${slug}&mode=rec`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    ok(await page.locator('.start-card').count() === 1, 'rec: 시작 카드');
    ok(await page.locator('.controls').isHidden(), 'rec: 조작 버튼 숨김');
    await page.click('.start-card');
    await page.waitForTimeout(3600);
    ok(await page.locator('.theater.playing').count() === 1, 'rec: 카운트다운 후 자동 재생');
    await page.goto(`${BASE}watch.html?ep=${slug}&mode=rec`, { waitUntil: 'networkidle' }); await page.waitForTimeout(300);
    await page.keyboard.press('Space'); await page.waitForTimeout(400);
    ok(await page.locator('.theater.playing').count() === 1 && await page.locator('.start-card').count() === 0, 'rec: Space 즉시 재생');
    await page.screenshot({ path: `${OUT}/${slug}-rec-${vp.name}.png` });
  }
  ok(errors.length === 0, `콘솔 오류 ${errors.length}개`);
  errors.slice(0, 20).forEach(e => console.log('    ', e));
  await ctx.close();
}
await browser.close();
console.log(fails ? `\n실패 ${fails}개` : '\n모두 통과');
process.exit(fails ? 1 : 0);
