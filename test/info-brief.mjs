/* 인포그래픽 GPT 의뢰서: 납품 폴더의 모든 E##/인포그래픽_스펙.json → 프롬프트 4개씩 → 의뢰서 한 파일(.md + .txt)
   사용: OUT=C:/Users/dumok/Downloads/AI개념극장_시즌777(1005) node test/info-brief.mjs */
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const OUT = process.env.OUT || 'C:/Users/dumok/Downloads/AI개념극장_시즌777(1005)';
const BLOG = `${OUT}/03_블로그_포스팅`;
const dirs = fs.readdirSync(BLOG).filter(d => /^E\d+_/.test(d) && fs.existsSync(`${BLOG}/${d}/인포그래픽_스펙.json`)).sort();
let md = `# 쿼카 AI 개념극장 시즌 777 · 블로그 인포그래픽 의뢰서\n\n`;
md += `작성 2026-10-05 · 편당 4장(개념·근거·원리·교실) · 총 ${dirs.length}편 ${dirs.length * 4}장\n\n`;
md += `## 공통 지시(모든 장에 그대로 적용)\n- 비율 16:9, 가로 1920px 이상, PNG.\n- 스타일: 프리미엄 에디토리얼 인포그래픽, 한국 핀테크 앱 느낌. 배경은 연보라(#EEF2FF)→민트(#E6FBF6) 대각선 그라데이션에 아주 옅은 입자. 카드는 프로스티드 글라스(흰색 70% 불투명, 1px 흰 테두리, 모서리 28px, 부드러운 그림자). 알약(pill)은 진파랑 #1D4ED8 또는 오렌지 #EA580C 바탕에 흰 글씨. 아이콘은 작은 3D 클레이 느낌.\n- 글자는 아래 적힌 한국어를 한 글자도 바꾸지 말고 그대로. 지정된 글자 외의 글자·로고·워터마크 금지. 제목은 왼쪽 위에 크고 굵게, 여백 넉넉히, 글자가 잘리거나 겹치지 않게.\n- 각 장은 아래 "프롬프트" 한 덩어리를 그대로 붙여 넣어 생성. 결과에서 한글 오타가 있으면 그 장만 다시 생성.\n- 파일 이름: 편 폴더 안에 인포그래픽_1.png ~ 인포그래픽_4.png 로 저장.\n\n`;
for (const d of dirs) {
  const spec = JSON.parse(fs.readFileSync(`${BLOG}/${d}/인포그래픽_스펙.json`, 'utf8'));
  const prompts = JSON.parse(execFileSync('node', ['test/info-prompt.mjs', `${BLOG}/${d}`], { encoding: 'utf8' }));
  fs.writeFileSync(`${BLOG}/${d}/_prompts.json`, JSON.stringify(prompts, null, 1), 'utf8');
  const post = fs.existsSync(`${BLOG}/${d}/포스팅.txt`) ? fs.readFileSync(`${BLOG}/${d}/포스팅.txt`, 'utf8') : '';
  const title = (post.match(/^1\. (.+)$/m) || [, d])[1];
  md += `## ${d}\n제목 후보: ${title}\n\n`;
  for (const s of spec) {
    const p = prompts.find(x => x.n === s.n);
    md += `### 인포그래픽_${s.n} · ${s.type} · 「${s.headline}」\n레이아웃: ${s.layout} · 카드 ${s.cards.length}개 · 바닥글: ${s.footer || ''}\n\n프롬프트:\n\n\`\`\`\n${p.prompt}\n\`\`\`\n\n`;
  }
}
fs.writeFileSync(`${OUT}/인포그래픽_의뢰서.md`, md, 'utf8');
fs.writeFileSync(`${OUT}/인포그래픽_의뢰서.txt`, '\uFEFF' + md.replace(/```/g, '').replace(/^#+ /gm, ''), 'utf8');
console.log('의뢰서', dirs.length, '편');
