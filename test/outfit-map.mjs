/* V2_OUTFITS.md 표대로 기존 의상 세트를 새 slug로 복사하고 manifest에 등록해요. */
import fs from 'node:fs';
const rows = fs.readFileSync('V2_OUTFITS.md', 'utf8').split('\n').filter(l => /^\| \d+ \|/.test(l)).map(l => l.split('|').map(s => s.trim()));
let man = fs.readFileSync('assets/manifest.js', 'utf8');
const keyRe = /key: \{([\s\S]*?)\n  \},/, outRe = /outfits: \{([\s\S]*?)\n  \}/;
let keys = man.match(keyRe)[1], outs = man.match(outRe)[1];
let done = 0;
for (const r of rows) {
  const [, no, slug, src] = r;
  if (!src || src.startsWith('(')) { console.log('skip', slug, src); continue; }
  if (!fs.existsSync(`assets/key/${src}.webp`)) { console.log('missing key', src); continue; }
  fs.copyFileSync(`assets/key/${src}.webp`, `assets/key/${slug}.webp`);
  fs.mkdirSync(`assets/char/${slug}`, { recursive: true });
  const poses = fs.readdirSync(`assets/char/${src}`).filter(f => f.endsWith('.webp'));
  for (const p of poses) fs.copyFileSync(`assets/char/${src}/${p}`, `assets/char/${slug}/${p}`);
  if (!keys.includes(`'${slug}'`)) keys += `,\n    '${slug}': 'webp'`;
  const list = poses.map(p => `'${p.replace('.webp', '')}'`).join(', ');
  if (!outs.includes(`'${slug}'`)) outs += `,\n    '${slug}': [${list}]`;
  done++;
}
man = man.replace(keyRe, `key: {${keys}\n  },`).replace(outRe, `outfits: {${outs}\n  }`);
fs.writeFileSync('assets/manifest.js', man);
console.log('mapped', done);
