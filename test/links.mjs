/* 모든 에피소드의 출처 링크가 열리는지 확인해요(HEAD → 실패 시 GET, 브라우저 UA). */
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const files = ['episodes','episodes/next','episodes/s3','episodes/s4'].flatMap(d => readdirSync(d).filter(f => f.endsWith('.js')).map(f => d + '/' + f));
/* 브라우저 전용 전역이 모듈 최상위에서 쓰여도 Node에서 import되게 */
globalThis.Image ??= class { };
globalThis.document ??= { createElement: () => ({ getContext: () => null, style: {} }) };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
let bad = 0;
for (const f of files) {
  const mod = await import(pathToFileURL(f).href);
  const ep = mod.default;
  for (const s of ep.sources || []) {
    let code = 0;
    try { const r = await fetch(s.url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': UA, accept: 'text/html,*/*' } }); code = r.status; } catch (e) { code = -1; }
    const good = code >= 200 && code < 400;
    if (!good) bad++;
    console.log(`${good ? '✓' : '✗'} ${code} ${ep.slug} ${s.url}`);
  }
}
console.log(bad ? `\n열리지 않는 링크 ${bad}개` : '\n모든 링크 정상');
process.exit(bad ? 1 : 0);
