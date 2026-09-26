/* 모든 편의 자막을 subtitles/srt(시각 포함), subtitles/txt(한 줄 한 자막)로 뽑아요.
   사용: node test/subs.mjs   → 0초 = 애니메이션 첫 장면 시작 */
import fs from 'node:fs';
globalThis.Image = class { };
globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) };
globalThis.AudioContext = class { };
const { EPISODES } = await import('../engine/registry.js');

const strip = t => t.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ts = s => { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = Math.floor(s % 60), ms = Math.round((s - Math.floor(s)) * 1000); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(ms).padStart(3, '0')}`; };
const safe = t => t.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');
const season = n => n > 18 ? 'S4' : n > 12 ? 'S3' : n > 6 ? 'S2' : 'S1';

fs.rmSync('subtitles', { recursive: true, force: true });
fs.mkdirSync('subtitles/srt', { recursive: true }); fs.mkdirSync('subtitles/txt', { recursive: true });
let index = '| 파일 | 편 | 시즌 | 길이 | 자막 수 |\n|---|---|---|---|---|\n';
for (const e of EPISODES) {
  const m = (await import('../' + e.file)).default;
  let off = 0; const srt = [], lines = [];
  m.scenes.forEach(sc => {
    sc.captions.forEach((c, i) => { const st = off + c.t, en = off + (i + 1 < sc.captions.length ? sc.captions[i + 1].t : sc.dur); srt.push({ st, en, t: strip(c.text) }); lines.push(strip(c.text)); });
    off += sc.dur;
  });
  const name = `E${String(e.no).padStart(2, '0')}_${season(e.no)}_${safe(m.title)}`;
  fs.writeFileSync(`subtitles/srt/${name}.srt`, '﻿' + srt.map((s, i) => `${i + 1}\n${ts(s.st)} --> ${ts(s.en)}\n${s.t}\n`).join('\n'), 'utf8');
  fs.writeFileSync(`subtitles/txt/${name}.txt`, '﻿' + lines.join('\n') + '\n', 'utf8');
  index += `| ${name} | ${m.title} | ${season(e.no)} | ${Math.floor(off / 60)}:${String(off % 60).padStart(2, '0')} | ${srt.length} |\n`;
}
fs.writeFileSync('subtitles/README.md', `# 쿼카의 AI 개념극장 — 자막 파일

- \`srt/\`: 시각이 들어간 자막(SRT). 0초 = 애니메이션 첫 장면 시작. 녹화 모드에서 Space로 바로 재생한 영상이면 재생을 누른 순간이 0초예요. 클릭으로 시작해 3초 카운트다운이 들어갔으면 영상 앞 3초를 잘라 내거나 자막을 3초 뒤로 밀어 주세요.
- \`txt/\`: 한 줄에 한 자막. 편집 앱의 '원고 불러오기'(클립 나누기: 줄바꿈)용.
- 파일 이름: E번호_시즌_제목. 원본은 \`episodes/\` 안의 captions이고, 자막을 고친 뒤 \`node test/subs.mjs\`를 돌리면 다시 뽑혀요.

${index}`, 'utf8');
console.log('subtitles:', EPISODES.length, '편');
