/* solo=1 링크 검사: 이 편 밖으로 나가는 링크·강사 대본이 없는지, 일반 모드는 그대로인지 */
import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
let bad = 0;
for (const mode of ['', '&mode=train']) {
  await p.goto(`http://localhost:5310/watch.html?ep=n3-english-prompt&solo=1${mode}`, { waitUntil: 'networkidle' });
  const links = await p.$$eval('a[href]', as => as.filter(a => a.offsetParent !== null || getComputedStyle(a).position === 'fixed').map(a => a.getAttribute('href')));
  const leak = links.filter(h => /^\.\/|#list|#lines|github\.com\/gottkf1208\/ai-concept-theater(\/blob\/main\/(CONTRIBUTING|CREDITS))?$|index\.html/.test(h) || (/watch\.html/.test(h) && !/solo=1/.test(h)));
  const script = await p.$eval('details.script', d => getComputedStyle(d).display);
  const nav = await p.$('#epnav');
  const brand = await p.$eval('.brand', a => a.hasAttribute('href'));
  console.log(`solo${mode || ' watch'}: 보이는 링크 ${links.length}개, 새는 링크 ${leak.length}개 ${JSON.stringify(leak)}, 대본 ${script}, epnav ${nav ? '있음' : '없음'}, 브랜드 링크 ${brand}`);
  if (leak.length || script !== 'none' || nav || brand) bad++;
  if (mode) { await p.keyboard.press('n'); const open = await p.$eval('#scriptOverlay', o => o.classList.contains('open')); console.log('  N키 대본 열림:', open); if (open) bad++; }
}
await p.goto('http://localhost:5310/watch.html?ep=n3-english-prompt', { waitUntil: 'networkidle' });
const normal = await p.$$eval('.top nav a, #epnav a, .to-list', as => as.length);
console.log('일반 모드 내비 링크', normal, '개 (0이면 문제)'); if (!normal) bad++;
console.log('콘솔 오류', errs.length); if (errs.length) bad++;
await b.close(); process.exit(bad ? 1 : 0);
