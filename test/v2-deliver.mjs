/* 납품 폴더 채우기: README.txt, 01_썸네일, 04_자막 복사, 구글 시트용 CSV. 사용: node test/v2-deliver.mjs */
import fs from 'node:fs'; import path from 'node:path';
globalThis.Image = class { }; globalThis.document = { createElement: () => ({ getContext: () => null, style: {} }) }; globalThis.AudioContext = class { };
const { EPISODES, TRACKS } = await import('../engine/registry.js');
const OUT = process.env.OUT || 'C:/Users/dumok/Downloads/AI개념극장_통합(1005)';
const BASE = 'https://gottkf1208.github.io/ai-concept-theater/';
const season = n => n > 70 ? 'S8' : n > 40 ? 'S777' : n > 32 ? 'S5' : n > 24 ? 'S4' : n > 16 ? 'S3' : n > 8 ? 'S2' : 'S1';
const rows = [];
for (const e of (process.env.SEASON ? EPISODES.filter(x => season(x.no) === process.env.SEASON) : EPISODES)) {
  const ep = (await import('../' + e.file)).default;
  rows.push({ no: e.no, slug: e.slug, s: season(e.no), label: TRACKS[season(e.no)].label, title: ep.title, solo: `${BASE}watch.html?ep=${e.slug}&solo=1`, full: `${BASE}watch.html?ep=${e.slug}` });
}
// 썸네일·자막 복사
const cp = (src, dst) => { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); };
const keep = f => !process.env.SEASON || f.includes(`_${process.env.SEASON}_`);
for (const d of ['youtube', 'instagram-feed', 'instagram-reels']) for (const f of fs.readdirSync(`thumbnails/${d}`)) if (keep(f)) cp(`thumbnails/${d}/${f}`, `${OUT}/01_썸네일/${d}/${f}`);
cp('thumbnails/README.md', `${OUT}/01_썸네일/README.md`);
for (const d of ['srt', 'txt']) for (const f of fs.readdirSync(`subtitles/${d}`)) if (keep(f)) cp(`subtitles/${d}/${f}`, `${OUT}/04_자막/${d}/${f}`);
// 캐릭터 에셋
for (const r of rows) { const dir = `${OUT}/02_캐릭터_에셋/E${String(r.no).padStart(2, '0')}_${r.slug}`; if (fs.existsSync(`assets/key/${r.slug}.webp`)) cp(`assets/key/${r.slug}.webp`, `${dir}/key.webp`); if (fs.existsSync(`assets/char/${r.slug}`)) for (const f of fs.readdirSync(`assets/char/${r.slug}`)) cp(`assets/char/${r.slug}/${f}`, `${dir}/${f}`); }
cp('subtitles/README.md', `${OUT}/04_자막/README.md`);
// 시트 CSV
const csv = ['편,시즌,제목,단독 링크(이 편만 보임),전체 링크,블로그 폴더'];
for (const r of rows) csv.push([`E${String(r.no).padStart(2, '0')}`, r.label, `"${r.title.replace(/"/g, '""')}"`, r.solo, r.full, `03_블로그_포스팅/E${String(r.no).padStart(2, '0')}_${r.slug}`].join(','));
fs.writeFileSync(`${OUT}/링크목록.csv`, '\uFEFF' + csv.join('\n'), 'utf8');
// README
const HEAD = process.env.HEAD ? process.env.HEAD : process.env.SEASON === 'S777' ? '쿼카의 AI 개념극장 · 시즌 777 추가 (2026-10-05) — 2026년 9월 말~10월 초 AI 소식으로 배우는 30편(E41~E70)' : '쿼카의 AI 개념극장 업데이트 (2026-10-02) — 40편 전면 개편';
const lines = [HEAD, '',
  `전체 사이트: ${BASE}`, `(단독 링크·전체 링크 목록은 링크목록.csv, 구글 시트에도 같은 내용)`, '',
  '폴더 구성', '  01_썸네일/        youtube(1920×1080) · instagram-feed(1080×1350) · instagram-reels(1080×1920), 편마다 같은 파일 이름',
  '  02_캐릭터_에셋/   편별 의상 세트(key.webp + point/think/oops/wave 포즈, 투명 배경 webp)',
  (process.env.SEASON === 'S777' || process.env.HEAD) ? '  03_블로그_포스팅/ E번호_slug/포스팅.txt(네이버 블로그 본문) + 인포그래픽_스펙.json + 인포그래픽_1~4.png(E01~E40은 완성본, E41~E70은 인포그래픽_의뢰서.md의 프롬프트로 GPT에서 생성)' : '  03_블로그_포스팅/ E번호_slug/포스팅.txt(네이버 블로그 본문) + 인포그래픽_1~4.png(개념·근거·원리·교실) + 인포그래픽_스펙.json',
  '  04_자막/          srt(시각 포함) · txt(한 줄 한 자막)', '',
  '편 목록'];
let cur = '';
for (const r of rows) { if (r.s !== cur) { cur = r.s; lines.push('', `[${r.label}]`); } lines.push(`  E${String(r.no).padStart(2, '0')}  ${r.title}`); lines.push(`        단독: ${r.solo}`); }
fs.writeFileSync(`${OUT}/README.txt`, '\uFEFF' + lines.join('\n') + '\n', 'utf8');
console.log('rows', rows.length);
