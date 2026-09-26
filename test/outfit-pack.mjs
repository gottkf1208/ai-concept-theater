/* assets/gen/${GEN}/{slug}-key.png, {slug}-{pose}.png → 투명 여백 잘라 높이 900 webp로 assets/key, assets/char/{slug}/ 에 넣고 manifest 갱신 */
import sharp from 'sharp'; import fs from 'node:fs';
const GEN = process.argv[2] || 's5';
const slugs = process.argv[3] ? process.argv[3].split(',') : ['s5-degradation','s5-motion-prompt','s5-upscale','s5-guidance','s5-controlnet','s5-long-video'];
const poses = ['point','think','oops','wave'];
const conv = async (src, dst) => { await sharp(src).trim({ threshold: 8 }).resize({ height: 900 }).webp({ quality: 90, alphaQuality: 90 }).toFile(dst); };
let man = fs.readFileSync('assets/manifest.js', 'utf8');
for (const s of slugs) {
  if (fs.existsSync(`assets/gen/${GEN}/${s}-key.png`)) { await conv(`assets/gen/${GEN}/${s}-key.png`, `assets/key/${s}.webp`); if (!man.includes(`'${s}': 'webp'`)) man = man.replace("    's4-choose': 'webp'", `    's4-choose': 'webp',\n    '${s}': 'webp'`); }
  const have = [];
  for (const p of poses) if (fs.existsSync(`assets/gen/${GEN}/${s}-${p}.png`)) { fs.mkdirSync(`assets/char/${s}`, { recursive: true }); await conv(`assets/gen/${GEN}/${s}-${p}.png`, `assets/char/${s}/${p}.webp`); have.push(p); }
  if (have.length) { const line = `    '${s}': [${have.map(p => `'${p}'`).join(', ')}]`; man = man.includes(`    '${s}': [`) ? man.replace(new RegExp(`    '${s}': \[[^\]]*\]`), line) : man.replace("    's4-choose': ['point', 'think', 'oops', 'wave']", `    's4-choose': ['point', 'think', 'oops', 'wave'],\n${line}`); }
  console.log(s, 'key', fs.existsSync(`assets/key/${s}.webp`), 'poses', have.join(','));
}
fs.writeFileSync('assets/manifest.js', man);
