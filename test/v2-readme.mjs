/* README.md의 시즌 표를 v2 40편 기준으로 다시 써요. 사용: node test/v2-readme.mjs */
import fs from 'node:fs';
globalThis.Image = class { }; globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) }; globalThis.AudioContext = class { };
const { EPISODES, TRACKS } = await import('../engine/registry.js');
const season = n => n > 70 ? 'S8' : n > 40 ? 'S777' : n > 32 ? 'S5' : n > 24 ? 'S4' : n > 16 ? 'S3' : n > 8 ? 'S2' : 'S1';
let md = fs.readFileSync('README.md', 'utf8');
const start = md.indexOf('## 시즌 1'); const end = md.indexOf('## 디자인');
let out = '', cur = '';
for (const e of (process.env.SEASON ? EPISODES.filter(x => season(x.no) === process.env.SEASON) : EPISODES)) {
  const ep = (await import('../' + e.file)).default;
  const s = season(e.no);
  if (s !== cur) { cur = s; out += `## ${TRACKS[s].label} — ${TRACKS[s].desc}\n\n| 편 | 제목 | 만져 보기 |\n|---|---|---|\n`; }
  out += `| E${e.no} | ${ep.title} | ${(ep.interaction && ep.interaction.title) || ''} |\n`;
  if (e.no % 8 === 0) out += '\n';
}
out += '2026-10-02에 40편으로 전면 개편했어요(v2). 시즌 1 입문 → 시즌 2 기본(이미지·영상) → 시즌 3 활용(에이전트) → 시즌 4 심화(원리) → 시즌 5 판단(2026년의 AI와 교실). 모든 수치·날짜는 1차 출처(법령·공식 문서·논문)로 확인한 것만 썼고, 편별 리서치 브리프는 `test/briefs/V2_S*_BRIEFS.md`에 있어요. 옛 30편 파일은 `episodes/`에 남아 있지만 목록(`EPISODES_V1`)에서만 참조돼요.\n\n';
md = md.slice(0, start) + out + md.slice(end);
md = md.replace(/episodes\/\*\.js         한 편 = 파일 하나\n[\s\S]*?episodes\/s5\/\*\.js      시즌 5 심화 \(E25~\)\n/, 'episodes/v2/*.js      v2 40편 (v1-~v5- slug, 시즌별 8편). 한 편 = 파일 하나\nepisodes/{,next,s3,s4,s5}/  옛 30편(v1, 목록에서 빠짐)\ntest/briefs/          시즌별 리서치 브리프·집필 규칙\n');
md = md.replace('subtitles/            24편 자막(srt·txt)', 'subtitles/            40편 자막(srt·txt)');
md = md.replace('watch.html?ep=slug    시청 화면 (&mode=train 연수, &mode=rec 녹화)', 'watch.html?ep=slug    시청 화면 (&mode=train 연수, &mode=rec 녹화, &solo=1 이 편만 보기)');
md = md.replace(/watch\.html\?ep=e1-agent-mcp/g, 'watch.html?ep=v1-next-token');
fs.writeFileSync('README.md', md); console.log('README updated');
