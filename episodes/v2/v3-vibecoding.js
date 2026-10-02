/* S3-21 [트랙 S3] 말로 만든 웹앱이 깃허브에 올라가는 원리: 바이브코딩과 토큰 권한 */
export default {
  slug: 'v3-vibecoding',
  track: 'S3',
  title: '말로 만든 웹앱이 깃허브에 올라가는 원리',
  subtitle: '바이브코딩과 토큰 권한',
  summary: '"학급 퀴즈 앱 만들어 줘" 한마디 뒤에 생긴 주소. 그 사이에 AI가 파일을 쓰고, 저장소에 커밋하고, 정적 호스팅이 그 파일을 그대로 웹에 띄웠어요. 화면에서 고친 글이 저장되는 원리와, 그때 쓰는 열쇠(토큰)를 좁게 만드는 법.',
  keywords: ['바이브코딩', 'GitHub', 'GitHub Pages', '저장소', '커밋', '정적 호스팅', 'Contents API', 'fine-grained 토큰', '권한', 'push protection'],

  scenes: [
    {
      title: '한마디 뒤에 생긴 주소', dur: 13,
      captions: [
        { t: 0, text: '"학급 퀴즈 웹앱 만들어 줘"라고 말했더니, 잠시 뒤 <em>주소 하나</em>가 생겼어요.' },
        { t: 5, text: '이 개념극장도 같은 방식으로 만들어졌어요. 그 사이에 무슨 일이 있었을까요?' },
        { t: 9, text: '파일이 쓰이고, 저장소에 올라가고, 누군가 그 파일을 웹에 띄웠어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'point' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 60, w: 600, text: '여기서 <b>학급 퀴즈 웹앱</b> 만들어 줘', tail: 'left', size: 22 });
        tl.at(stage.appendChild(ask.el), .3, { from: 'left' });
        const steps = [
          ['요청', '말로 부탁', ''],
          ['파일 쓰기', 'HTML·CSS·JS', 'ink'],
          ['저장소 커밋', '깃허브에 저장', 'ink'],
          ['웹 주소', '누구나 열람', 'aqua']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 330 + i * 220, y: 220, w: 195, h: 130, label, sub, accent: acc });
          const at = i === 0 ? .3 : 5.1 + (i - 1) * 1.1;
          tl.at(stage.appendChild(b.el), at, { from: 'up' });
          return { box: b, at };
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 525 + i * 220, y1: 285, x2: 550 + i * 220, y2: 285, width: 4, color: '#1B1F24' }));
        const addr = P.chip({ x: 330, y: 400, text: 'quiz-app.github.io 생성됨', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(addr.el), 9.4, { from: 'pop' });
        const note = P.text({ x: 330, y: 460, w: 880, text: '파일이 쓰이고, 저장소에 올라가고, 누군가 웹에 <em>띄웠어요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(note.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || (t > 9 && t < 12));
            steps.forEach(s => s.box.on(t > s.at));
            arrows.forEach((a, i) => a.draw(P.clamp((t - (5.1 + i * 1.1 + .2)) / .5, 0, 1)));
          }
        };
      }
    },
    {
      title: '말이 파일이 돼요', dur: 14,
      captions: [
        { t: 0, text: 'AI가 <em>HTML·CSS·JS 파일</em>을 쓰고, 깃허브 저장소(repository)에 <em>커밋</em>해요.' },
        { t: 5.5, text: '커밋은 "무엇을 왜 바꿨는지 적은 메시지 + 바뀐 내용"을 남기는 저장 기록이에요.' },
        { t: 10.5, text: '파일 하나가 바뀔 때마다 커밋 하나가 쌓여요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 360, size: 290, pose: 'think' });
        stage.append(q.el);
        const files = [
          ['index.html', '화면 구조'], ['style.css', '모양'], ['quiz.js', '퀴즈 동작']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 340 + i * 235, y: 90, w: 210, h: 110, label, sub, accent: 'ink', icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), .3 + i * .7, { from: 'up' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 440 + i * 235, y1: 200, x2: 760, y2: 300, curve: i === 1 ? 0 : (i === 0 ? 20 : -20), width: 3, color: '#9AA5AF' }));
        const commit = P.box({ x: 340, y: 300, w: 660, h: 150, label: '커밋', sub: '메시지: "퀴즈 문항 3개 추가"<br>+ 바뀐 파일 내용', accent: 'aqua', icon: P.ICON.save });
        tl.at(stage.appendChild(commit.el), 5.9, { from: 'pop' });
        const final = P.text({ x: 340, y: 490, w: 880, text: '파일 하나가 바뀔 때마다 <em>커밋</em> 하나가 쌓여요.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.3 || (t > 5.5 && t < 10.3));
            files.forEach((b, i) => b.on(t > .3 + i * .7));
            arrows.forEach(a => a.draw(P.clamp((t - 2.6) / .8, 0, 1)));
            commit.on(t > 5.9);
          }
        };
      }
    },
    {
      title: '파일이 주소가 돼요', dur: 13,
      captions: [
        { t: 0, text: 'GitHub Pages는 저장소의 파일을 그대로 웹사이트로 띄우는 <em>정적 호스팅</em>이에요.' },
        { t: 5, text: '서버에서 프로그램이 도는 게 아니라, 저장된 파일을 <em>그대로</em> 보여 줘요.' },
        { t: 9, text: '공식 문서 경고: 저장소가 비공개여도 사이트는 인터넷에 <em>공개</em>될 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 300, pose: 'tablet' });
        stage.append(q.el);
        const repo = P.box({ x: 330, y: 130, w: 300, h: 140, label: '저장소', sub: 'HTML·CSS·JS 파일 보관', accent: 'ink', icon: P.ICON.doc });
        const pages = P.box({ x: 740, y: 130, w: 400, h: 140, label: 'GitHub Pages', sub: '파일을 그대로 웹사이트로<br>띄우는 정적 호스팅', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(repo.el), .3, { from: 'up' });
        tl.at(stage.appendChild(pages.el), 5.2, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 640, y1: 200, x2: 730, y2: 200, width: 4, color: '#127E90' });
        const warn = P.chip({ x: 330, y: 340, text: '비공개 저장소여도 사이트는 공개될 수 있어요', color: 'orange', size: 20 });
        tl.at(stage.appendChild(warn.el), 9.2, { from: 'pop' });
        const final = P.text({ x: 330, y: 400, w: 880, text: '올리기 전에 민감한 내용은 <em>미리 빼 두세요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.8 || t > 9);
            repo.on(t > .3); pages.on(t > 5.2);
            arrow.draw(P.clamp((t - 5.6) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '화면에서 고친 글이 저장되는 길', dur: 14,
      captions: [
        { t: 0, text: '편집 버튼을 누르면 앱이 깃허브 API에 "이 파일을 이 내용으로, 이 메시지로 바꿔 줘"라고 보내요.' },
        { t: 5.5, text: '바꿀 파일의 번호(sha)도 같이 보내요. 이 문을 여는 열쇠가 <em>토큰</em>이에요.' },
        { t: 10.5, text: 'fine-grained 토큰은 저장소 하나, <em>Contents 쓰기</em> 권한 하나만 줄 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 320, pose: 'oops' });
        stage.append(q.el);
        const parts = [
          ['PUT 요청', 'contents/edits.json'],
          ['content', 'Base64로 바뀐 내용'],
          ['message · sha', '저장 메시지 + 바꿀 번호']
        ].map(([label, sub], i) => {
          const b = P.box({ x: 330 + i * 300, y: 90, w: 275, h: 120, label, sub, accent: 'ink', icon: P.ICON.doc });
          tl.at(stage.appendChild(b.el), .3 + i * .8, { from: 'up' });
          return b;
        });
        const token = P.box({ x: 330, y: 300, w: 500, h: 150, label: 'fine-grained 토큰', sub: '저장소 1개 + Contents 쓰기만<br>열 수 있는 좁은 열쇠', accent: 'orange', icon: P.ICON.key });
        tl.at(stage.appendChild(token.el), 5.9, { from: 'pop' });
        const arrow = P.arrow(lines, { x1: 480, y1: 300, x2: 470, y2: 210, dashed: true, width: 3, color: '#F2812D' });
        const final = P.text({ x: 870, y: 340, w: 360, text: '저장소 <em>하나</em>, 권한 <em>하나</em>만.', size: 26, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.3 || (t > 5.5 && t < 10.3));
            parts.forEach((b, i) => b.on(t > .3 + i * .8));
            token.on(t > 5.9);
            arrow.draw(P.clamp((t - 6.3) / .5, 0, 1));
          }
        };
      }
    },
    {
      title: '열쇠 관리', dur: 13,
      captions: [
        { t: 0, text: '토큰은 비밀번호예요. <em>코드·화면·채팅</em>에 붙여 두지 않아요.' },
        { t: 4.5, text: '깃허브는 공개 저장소에 비밀값이 올라가는 걸 기본으로 막아요. <em>푸시 보호</em>예요.' },
        { t: 8.5, text: 'Pages에는 비밀번호·카드 번호 같은 <em>민감한 거래</em> 금지, 학생 개인정보도 올리지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 300, size: 340, pose: 'wave' });
        stage.append(q.el);
        const items = [
          ['① 토큰은 비밀번호', '코드·화면·채팅에 붙이지 않기', '', P.ICON.key],
          ['② 푸시 보호', '공개 저장소에 비밀값이 올라가는 걸 기본으로 막아요', 'aqua', P.ICON.check],
          ['③ 민감한 내용 금지', '비밀번호·카드번호 거래, 학생 개인정보 모두 올리지 않기', 'orange', P.ICON.x]
        ].map(([label, sub, acc, icon], i) => {
          const b = P.box({ x: 400, y: 100 + i * 135, w: 760, h: 115, label, sub, accent: acc, icon });
          tl.at(stage.appendChild(b.el), .3 + i * 2.1, { from: 'up' });
          return b;
        });
        const final = P.text({ x: 400, y: 520, w: 760, text: '열쇠는 <em>좁게</em>, 비밀은 <em>숨겨서</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(final.el), 10.6, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.4);
            items.forEach((b, i) => b.on(t > .3 + i * 2.1));
          }
        };
      }
    }
  ],

  interaction: {
    title: '토큰 권한 설계기',
    desc: '왼쪽에서 토큰이 열 수 있는 <b>저장소</b>와 <b>권한</b>을 고르고, "편집 저장 시도"를 눌러 보세요. 편집 대상은 늘 <code>quiz-app</code> 저장소예요. quiz-app이 선택되어 있고 Contents가 쓰기여야만 저장돼요. 오른쪽 막대는 이 토큰이 새면 얼마나 위험한지를 저장소 수 × 권한 무게로 어림한 그림이에요.',
    mount(el, P) {
      const repos = [
        { key: 'quiz-app', label: 'quiz-app (편집 대상)', checked: true },
        { key: 'class-anthology', label: 'class-anthology', checked: false },
        { key: 'private-notes', label: 'private-notes', checked: false }
      ];
      const repoBoxes = repos.map(r => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-repo-${r.key}`, checked: r.checked ? 'checked' : null });
        const lab = P.h('label', { for: `sim-repo-${r.key}`, class: 'sim-chk' }, cb, ' ' + r.label);
        return { r, cb, lab };
      });
      const mkSel = (id, labelText, opts) => {
        const sel = P.h('select', { id, 'aria-label': labelText }, ...opts.map(([v, t]) => P.h('option', { value: v }, t)));
        const lab = P.h('label', { for: id, class: 'sim-sl' }, labelText, sel);
        return { sel, lab };
      };
      const contentsSel = mkSel('sim-contents', 'Contents', [['none', '없음'], ['read', '읽기'], ['write', '쓰기']]);
      const pagesSel = mkSel('sim-pages', 'Pages', [['none', '없음'], ['read', '읽기'], ['write', '쓰기']]);
      const adminSel = mkSel('sim-admin', 'Administration', [['none', '없음'], ['write', '쓰기']]);

      const preview = P.h('pre', { class: 'sim-pre' }, '');
      const tryBtn = P.h('button', { class: 'btn primary', type: 'button' }, '편집 저장 시도');
      const result = P.h('div', { class: 'sim-result' }, '아직 시도하지 않았어요.');
      const riskMeter = P.h('div', { class: 'sim-rmeter' }, P.h('i', {}));
      const riskLab = P.h('div', { class: 'sim-rlab' }, '');

      const left = P.h('div', { class: 'sim-col' },
        P.h('div', { class: 'sim-h' }, '저장소 (토큰이 열 수 있는 곳)'),
        ...repoBoxes.map(x => x.lab),
        P.h('div', { class: 'sim-h' }, '권한'),
        contentsSel.lab, pagesSel.lab, adminSel.lab,
        tryBtn
      );
      const right = P.h('div', { class: 'sim-col' },
        P.h('div', { class: 'sim-h' }, '요청 미리보기'),
        preview,
        result,
        P.h('div', { class: 'sim-h' }, '토큰이 새면?'),
        riskMeter, riskLab
      );
      el.append(P.h('div', { class: 'sim-wrap' }, left, right));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;gap:18px;flex-wrap:wrap;max-width:100%}
        .sim-col{flex:1 1 260px;min-width:0;display:flex;flex-direction:column;gap:8px}
        .sim-h{font-size:13px;font-weight:700;color:var(--muted);margin-top:6px}
        .sim-chk{display:flex;align-items:center;gap:8px;font-size:14px}
        .sim-sl{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--muted)}
        .sim-sl select{width:100%;max-width:100%;padding:7px;border-radius:8px;border:1px solid var(--line);font-size:14px;background:#fff}
        .sim-pre{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:10px;font-family:var(--mono);font-size:12px;white-space:pre-wrap;word-break:break-all;max-width:100%;margin:0}
        .sim-result{border-radius:10px;padding:10px 12px;font-size:14px;font-weight:700;background:var(--paper);border:1px solid var(--line)}
        .sim-result.ok{background:#E7F5F3;border-color:#127E90;color:#0B5A66}
        .sim-result.err{background:#FDEEE3;border-color:#F2812D;color:#8A3E0B}
        .sim-rmeter{height:10px;border-radius:999px;background:var(--paper);overflow:hidden}
        .sim-rmeter i{display:block;height:100%;background:var(--acc2,#F2812D);transition:width .3s}
        .sim-rlab{font-size:13px;color:var(--muted)}
      ` }));

      const WEIGHT = { none: 0, read: 1, write: 2 };
      function state() {
        const checked = repoBoxes.filter(x => x.cb.checked).map(x => x.r.key);
        return { checked, contents: contentsSel.sel.value, pages: pagesSel.sel.value, admin: adminSel.sel.value };
      }
      function render() {
        const s = state();
        preview.textContent = `PUT /repos/me/quiz-app/contents/edits.json\n{\n  "message": "퀴즈 문항 3개 추가",\n  "content": "eyJxdWl6IjogdHJ1ZX0=...",\n  "sha": "a1b2c3d"\n}\n\n열린 저장소: ${s.checked.length ? s.checked.join(', ') : '(없음)'}\nContents: ${label(s.contents)} · Pages: ${label(s.pages)} · Administration: ${label(s.admin)}`;
        const adminW = s.admin === 'write' ? 5 : 0;
        const score = s.checked.length * (WEIGHT[s.contents] + WEIGHT[s.pages] + adminW);
        const pct = Math.min(100, Math.round(score / 27 * 100));
        riskMeter.firstChild.style.width = pct + '%';
        const tier = score === 0 ? '거의 없음' : score <= 3 ? '작음' : score <= 10 ? '중간' : '큼';
        riskLab.textContent = `위험 범위: ${tier} (저장소 ${s.checked.length}개 × 권한 무게)`;
      }
      function label(v) { return v === 'write' ? '쓰기' : v === 'read' ? '읽기' : '없음'; }
      function attempt() {
        const s = state();
        if (!s.checked.includes('quiz-app')) {
          result.className = 'sim-result err';
          result.textContent = '403 권한 없음 — quiz-app 저장소가 선택되지 않았어요.';
        } else if (s.contents !== 'write') {
          result.className = 'sim-result err';
          result.textContent = '403 권한 없음 — Contents 쓰기 권한이 없어요.';
        } else {
          result.className = 'sim-result ok';
          result.textContent = '201 저장됨 — quiz-app/edits.json이 업데이트됐어요.';
        }
      }
      repoBoxes.forEach(x => x.cb.addEventListener('change', render));
      [contentsSel.sel, pagesSel.sel, adminSel.sel].forEach(s => s.addEventListener('change', render));
      tryBtn.addEventListener('click', () => { render(); attempt(); });
      render();
    }
  },

  teacherLines: [
    '말로 만든 웹앱도 결국 <b>파일</b>이에요. 깃허브에 저장되고, 그 파일이 그대로 웹사이트가 돼요.',
    '토큰은 <b>집 열쇠</b>예요. 필요한 방 하나만 여는 열쇠로 만들어요.'
  ],
  tip: {
    body: '웹앱 편집 저장용 토큰은 <b>fine-grained 토큰</b>으로, 그 앱의 <b>저장소 하나</b>와 <b>Contents 읽기·쓰기</b>만 주고 만료일을 정해 두세요.',
    extra: '깃허브 페이지스 사이트는 저장소가 비공개여도 공개될 수 있어요. 학생 이름·연락처·사진은 넣지 않아요.'
  },
  myth: {
    myth: '저장소를 비공개로 하면 웹사이트도 비공개다.',
    fact: '공식 문서에 따르면 GitHub Pages 사이트는 저장소가 비공개여도 인터넷에 공개될 수 있어요. 올리기 전에 민감한 내용을 빼야 해요.'
  },
  sources: [
    { title: 'GitHub Docs — About GitHub Pages', url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages', note: 'GitHub Pages는 저장소 파일을 그대로 웹사이트로 띄우는 정적 호스팅이라는 정의.' },
    { title: 'GitHub Docs — Creating a GitHub Pages site', url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site', note: '저장소가 비공개여도 Pages 사이트는 인터넷에 공개될 수 있다는 경고.' },
    { title: 'GitHub REST API — Repository contents', url: 'https://docs.github.com/en/rest/repos/contents', note: '파일을 만들고 고치는 PUT 요청의 message·content(Base64)·sha 구조.' },
    { title: 'GitHub Docs — Managing your personal access tokens', url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens', note: 'fine-grained 토큰이 저장소와 권한을 좁게 지정할 수 있다는 안내와 토큰을 비밀번호처럼 다루라는 권고.' }
  ],
  script: `학급 퀴즈 웹앱을 만들어 달라고 말 한마디만 했는데, 잠시 뒤 주소 하나가 생겼어요. 이 개념극장도 같은 방식으로 만들어졌고요. 그 사이에 AI는 HTML, CSS, JS 파일을 쓰고 깃허브 저장소에 커밋했어요. 커밋은 무엇을 왜 바꿨는지 적은 메시지와 바뀐 내용을 함께 남기는 저장 기록이에요.

그 저장소를 웹사이트로 띄우는 게 GitHub Pages예요. 공식 문서에 따르면 저장소의 파일을 그대로 가져다 보여 주는 정적 호스팅이라 서버에서 프로그램이 도는 게 아니에요. 그런데 저장소가 비공개여도 사이트는 인터넷에 공개될 수 있다고 공식 문서가 경고해요. 올리기 전에 민감한 내용은 미리 빼야 해요.

화면에서 글을 고쳐 저장을 누르면, 앱은 깃허브 API에 이 파일을 이 내용으로, 이 메시지로 바꿔 달라고 보내요. 바꿀 파일의 번호인 sha도 같이 보내고, 이 문을 여는 열쇠가 토큰이에요. fine-grained 토큰은 저장소 하나와 Contents 쓰기 권한 하나만 줄 수 있어요. 토큰은 비밀번호처럼 다루고 코드나 채팅에 붙여 두지 마세요. 깃허브는 공개 저장소에 비밀값이 올라가는 걸 기본으로 막는 푸시 보호도 갖고 있어요. 민감한 거래와 학생 개인정보는 애초에 올리지 않는 게 안전해요.`
};
