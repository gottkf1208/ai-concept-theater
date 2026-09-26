/* N5 [B] 말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리: 바이브코딩 */
export default {
  slug: 'n5-vibecoding',
  track: 'B',
  title: '말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리',
  subtitle: '바이브코딩',
  summary: '말 한마디로 만든 웹앱이 어떻게 깃허브에 저장되고, 화면에서 고친 글자가 모두에게 반영되는지 그 흐름을 짚어봐요.',
  keywords: ['바이브코딩', 'GitHub Pages', 'Contents API', '토큰', '정적 호스팅'],

  scenes: [
    {
      title: '프롬프트 한 장으로 생긴 일', dur: 13,
      captions: [
        { t: 0, text: '이 개념극장도 <em>프롬프트 한 장</em>으로 만들어졌어요.' },
        { t: 5, text: '말로 요청하고 나서 몇 분 뒤, <em>주소</em>가 하나 생겼어요.' },
        { t: 9.5, text: '그 사이에 무슨 일이 있었던 걸까요?' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 300, size: 380, pose: 'tablet' });
        stage.append(q.el);
        const ask = P.bubble({ x: 330, y: 140, w: 480, text: '"개념극장 만들어줘. 이 규격 파일들처럼."', tail: 'left' });
        tl.at(stage.appendChild(ask.el), .4, { from: 'left' });
        const wait = P.box({ x: 850, y: 200, w: 340, h: 100, label: '몇 분 기다리기', sub: '', accent: '' });
        tl.at(stage.appendChild(wait.el), 2, { from: 'up' });
        const arrow = P.arrow(lines, { x1: 780, y1: 300, x2: 850, y2: 250, color: '#1B1F24', width: 4 });
        const result = P.box({ x: 800, y: 380, w: 400, h: 120, label: '주소가 생겼어요', sub: 'ai-concept-theater(.)pages.dev', accent: 'aqua', icon: P.ICON.check });
        tl.at(stage.appendChild(result.el), 5.4, { from: 'pop' });
        const qq = P.text({ x: 330, y: 560, w: 700, text: '이 안에서 <em>무슨 일</em>이 있었던 걸까요?', size: 32, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            arrow.draw(P.clamp((t - 2.4) / .6, 0, 1));
            wait.on(t > 2 && t < 5.4);
          }
        };
      }
    },
    {
      title: '말이 파일이 되는 흐름', dur: 14,
      captions: [
        { t: 0, text: '말이 먼저 <em>코드 파일</em>(HTML·CSS·JS)로 바뀌어요.' },
        { t: 5, text: '그 파일이 <em>저장소(GitHub)</em>에 저장되고, <em>GitHub Pages</em>라는 서비스가 저장소 내용을 그대로 인터넷에 띄워요.' },
        { t: 10.5, text: '따로 서버 프로그램을 켜 두지 않아도 돼요. <em>정적 사이트</em>라서요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 240, pose: 'point' });
        stage.append(q.el);
        const steps = [
          { l: '말', s: '"만들어줘"', acc: 'ink', icon: P.ICON.doc },
          { l: '코드 파일', s: 'HTML · CSS · JS', acc: 'aqua', icon: P.ICON.doc },
          { l: '저장소', s: 'GitHub', acc: 'aqua', icon: P.ICON.save },
          { l: '정적 호스팅', s: 'GitHub Pages', acc: 'orange', icon: P.ICON.plug }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 150, w: 260, h: 120, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.6, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 210, x2: 360 + i * 300, y2: 210, width: 5, color: '#1B1F24' }));
        const note = P.text({ x: 60, y: 330, w: 1160, text: '저장소 내용을 <i>그대로</i> 인터넷에 띄우는 방식이에요 — 서버 프로그램 없이도 돼요.', size: 24, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 6.8, { from: 'up' });
        const chip = P.chip({ x: 60, y: 400, text: '정적 사이트', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(chip.el), 10.8, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 1.6)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.6 && t < 2.2 + i * 1.6));
          }
        };
      }
    },
    {
      title: '화면 편집이 반영되는 원리', dur: 14,
      captions: [
        { t: 0, text: '브라우저에서 글자를 고치면, 바로 그 자리에서 저장되는 게 <em>아니에요</em>.' },
        { t: 5, text: 'GitHub API(Contents)로 <em>edits.json</em> 파일을 저장하고, Pages가 <em>다시 배포</em>해요.' },
        { t: 10.5, text: '1~2분 뒤에야 모두에게 보여요. <em>"파일이 바뀌는"</em> 거예요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 250, pose: 'think' });
        stage.append(q.el);
        const steps = [
          { l: '글자 고치기', s: '브라우저 화면에서', acc: 'ink', icon: P.ICON.key },
          { l: 'Contents API', s: 'edits.json 저장', acc: 'orange', icon: P.ICON.save },
          { l: 'Pages 재배포', s: '저장소 내용 다시 빌드', acc: 'aqua', icon: P.ICON.plug },
          { l: '모두에게 반영', s: '1~2분 뒤', acc: 'aqua', icon: P.ICON.check }
        ];
        const boxes = steps.map((st, i) => {
          const b = P.box({ x: 60 + i * 300, y: 150, w: 260, h: 120, label: st.l, sub: st.s, accent: st.acc, icon: st.icon });
          tl.at(stage.appendChild(b.el), .4 + i * 1.6, { from: 'pop' });
          return b;
        });
        const arrows = [0, 1, 2].map(i => P.arrow(lines, { x1: 320 + i * 300, y1: 210, x2: 360 + i * 300, y2: 210, width: 5, color: '#1B1F24' }));
        const line = P.text({ x: 340, y: 560, w: 820, text: '<em>"즉시 저장"</em>이 아니라, <i>파일이 바뀌는</i> 거예요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(line.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.6 + i * 1.6)) / .8, 0, 1)));
            boxes.forEach((b, i) => b.on(t > .4 + i * 1.6 && t < 2.2 + i * 1.6));
          }
        };
      }
    },
    {
      title: '토큰 이야기', dur: 13,
      captions: [
        { t: 0, text: '저장하려면 <em>접근 토큰</em>이 필요해요. 아무 토큰이나 쓰면 위험해요.' },
        { t: 5, text: 'fine-grained 토큰으로 저장소 <em>1개</em>, Contents <em>쓰기 권한만</em> 좁게 줘요.' },
        { t: 9.5, text: '오늘은 저장소를 선택하지 않아서 처음 저장이 <em>실패</em>했어요. 토큰은 <em>비밀번호처럼</em> 다뤄요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 420, size: 280, pose: 'oops' });
        stage.append(q.el);
        const wide = P.box({ x: 380, y: 130, w: 420, h: 130, label: '넓은 권한 토큰', sub: '모든 저장소 · 읽기+쓰기', accent: '', icon: P.ICON.key });
        tl.at(stage.appendChild(wide.el), .4, { from: 'left' });
        const narrow = P.box({ x: 380, y: 300, w: 420, h: 130, label: 'fine-grained 토큰', sub: '저장소 1개 · Contents 쓰기만', accent: 'aqua', icon: P.ICON.key });
        tl.at(stage.appendChild(narrow.el), 2.6, { from: 'left' });
        const vs = P.text({ x: 300, y: 250, w: 70, text: 'vs', size: 24, weight: 800, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(vs.el), 3.4, { from: 'pop' });
        const fail = P.box({ x: 860, y: 300, w: 340, h: 130, label: '404 Not Found', sub: '저장소를 선택 안 해서 실패', accent: 'orange', icon: P.ICON.x });
        tl.at(stage.appendChild(fail.el), 5.8, { from: 'right' });
        const line = P.text({ x: 380, y: 480, w: 800, text: '토큰은 <em>비밀번호처럼</em> 다뤄요. 아무 데나 붙여넣지 않기.', size: 28, weight: 800 });
        tl.at(stage.appendChild(line.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5 || t > 9.5);
            wide.on(t > .4 && t < 2.6);
            narrow.on(t > 2.6);
            fail.on(t > 5.8 && Math.floor(t * 1.5) % 2 === 0 && t < 9.5);
          }
        };
      }
    },
    {
      title: '파일로 남는다는 것', dur: 13,
      captions: [
        { t: 0, text: '말로 만들되, 결과는 <em>파일로 남는다</em>는 걸 기억해요.' },
        { t: 5, text: '저장소와 권한은 <em>좁게</em>, 실수해도 <em>되돌릴 수 있게</em> 해요.' },
        { t: 9.5, text: '커밋 기록이 남아 있으면, 언제든 이전으로 돌아갈 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'wave' });
        stage.append(q.el);
        const chips = ['파일로 남아요', '권한은 좁게', '되돌릴 수 있게'].map((c, i) =>
          tl.at(stage.appendChild(P.chip({ x: 380, y: 200 + i * 80, text: c, color: i === 1 ? 'orange' : 'aqua', size: 28 }).el), .6 + i * 1.6, { from: 'pop' })
        );
        const sub = P.text({ x: 380, y: 470, w: 780, text: '커밋 기록이 있으면 <i>언제든 이전으로</i> 돌아갈 수 있어요.', size: 26, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(sub.el), 6, { from: 'up' });
        const last = P.text({ x: 380, y: 560, w: 800, text: '말은 시작일 뿐, <em>파일과 기록</em>이 결과를 지켜 줘요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 9.5);
          }
        };
      }
    }
  ],

  interaction: {
    title: '편집 → 저장 → 반영 시뮬레이터',
    desc: '왼쪽 강의안 화면의 제목을 고치고, 아래 토큰 설정 체크박스를 맞춘 뒤 <b>저장(GitHub API)</b>을 눌러 보세요. 권한이 부족하면 실패 메시지가, 둘 다 갖춰지면 저장소에 edits.json이 쌓이고 배포가 진행돼요. 실제 네트워크 요청은 하지 않아요.',
    mount(el, P) {
      let title = '바이브코딩: 말로 웹앱 만들기';
      let repoSelected = false;   // 오늘처럼 처음엔 저장소를 선택하지 않은 상태
      let permGranted = true;
      let commits = [];
      let deployTimers = [];

      const wrap = P.h('div', { class: 'sim-vc' });
      const screen = P.h('div', { class: 'sim-screen' },
        P.h('h4', {}, '강의안 화면'),
        P.h('div', { class: 'sim-screen-bar' }, '미리보기')
      );
      const titleInput = P.h('input', { type: 'text', class: 'sim-title-input', value: title, 'aria-label': '강의안 제목 수정' });
      screen.append(titleInput);

      const tokenBox = P.h('div', { class: 'sim-tokenbox' },
        P.h('h4', {}, '토큰 설정')
      );
      const chkRepo = P.h('input', { type: 'checkbox', id: 'sim-chk-repo' });
      const chkPerm = P.h('input', { type: 'checkbox', id: 'sim-chk-perm', checked: '' });
      chkRepo.checked = repoSelected;
      chkPerm.checked = permGranted;
      const lblRepo = P.h('label', {}, chkRepo, ' 저장소 선택함');
      const lblPerm = P.h('label', {}, chkPerm, ' Contents 쓰기 권한');
      tokenBox.append(lblRepo, lblPerm);

      const saveBtn = P.h('button', { class: 'btn primary', type: 'button' }, '저장(GitHub API)');
      const bar = P.h('div', { class: 'sim-bar' }, saveBtn);
      const status = P.h('p', { class: 'sim-status', 'aria-live': 'polite' }, '아직 저장하지 않았어요.');

      const repoCard = P.h('div', { class: 'sim-repo' },
        P.h('h4', {}, '저장소 — edits.json')
      );
      const jsonView = P.h('pre', { class: 'sim-json' }, '(아직 파일이 없어요)');
      const commitList = P.h('ol', { class: 'sim-commits' });
      const deployLine = P.h('p', { class: 'sim-deploy' }, '');
      repoCard.append(jsonView, commitList, deployLine);

      wrap.append(
        P.h('div', { class: 'sim-cols' }, screen, repoCard),
        tokenBox, bar, status
      );
      el.append(wrap);

      const style = P.h('style', { html: `
        .sim-vc{max-width:100%}
        .sim-cols{display:flex;gap:14px;flex-wrap:wrap}
        .sim-screen,.sim-repo{flex:1 1 260px;min-width:0;max-width:100%;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--paper)}
        .sim-repo{border-color:var(--aqua)}
        .sim-screen h4,.sim-repo h4,.sim-tokenbox h4{margin:0 0 8px;font-size:14px;color:var(--muted)}
        .sim-screen-bar{font-size:12.5px;color:var(--muted);margin-bottom:8px}
        .sim-title-input{width:100%;max-width:100%;box-sizing:border-box;font-size:17px;font-weight:700;padding:10px 12px;border:1px solid var(--line);border-radius:10px}
        .sim-tokenbox{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center;border:1px solid var(--line);border-radius:14px;padding:12px 16px;background:#fff}
        .sim-tokenbox h4{width:100%;margin-bottom:4px}
        .sim-tokenbox label{display:flex;align-items:center;gap:8px;font-size:14.5px;font-weight:600}
        .sim-bar{margin-top:14px}
        .sim-status{margin-top:12px;font-weight:700;min-height:1.5em;font-size:14.5px}
        .sim-status.fail{color:var(--orange-strong,#B3520F)}
        .sim-status.ok{color:#127E90}
        .sim-json{margin:0 0 10px;padding:10px 12px;border-radius:10px;background:#f4f6f8;font-family:var(--mono);font-size:13px;white-space:pre-wrap;word-break:break-all}
        .sim-commits{margin:0 0 10px;padding-left:20px;display:grid;gap:6px;font-size:13.5px}
        .sim-deploy{margin:0;font-weight:700;font-size:14px;color:#127E90;min-height:1.4em}
      ` });
      el.append(style);

      titleInput.addEventListener('input', () => { title = titleInput.value; });
      chkRepo.addEventListener('change', () => { repoSelected = chkRepo.checked; });
      chkPerm.addEventListener('change', () => { permGranted = chkPerm.checked; });

      const clearDeployTimers = () => { deployTimers.forEach(id => clearTimeout(id)); deployTimers = []; };

      saveBtn.addEventListener('click', () => {
        clearDeployTimers();
        if (!repoSelected) {
          status.className = 'sim-status fail';
          status.textContent = '404 Not Found — 저장소가 선택되지 않았어요. fine-grained 토큰에서 저장소를 골라 주세요.';
          deployLine.textContent = '';
          return;
        }
        if (!permGranted) {
          status.className = 'sim-status fail';
          status.textContent = '403 Forbidden — Contents 쓰기 권한이 없어요. 토큰 권한을 다시 확인해 주세요.';
          deployLine.textContent = '';
          return;
        }
        status.className = 'sim-status ok';
        status.textContent = '저장 요청을 보냈어요.';
        const n = commits.length + 1;
        const json = `{"title":"${title.replace(/"/g, '\\"')}","commit":${n}}`;
        jsonView.textContent = json;
        commits.unshift(`#${n} edits.json 수정 — "${title}"`);
        commitList.replaceChildren(...commits.map(c => P.h('li', {}, c)));
        deployLine.textContent = '배포 중…';
        deployTimers.push(setTimeout(() => { deployLine.textContent = '배포 중… (거의 다 됐어요)'; }, 700));
        deployTimers.push(setTimeout(() => {
          deployLine.textContent = '반영 완료 — 1~2분 뒤 모두에게 보여요.';
          status.textContent = '저장소 파일이 바뀌었어요. 화면은 곧 새로고침돼요.';
        }, 1600));
      });
    }
  },

  teacherLines: [
    '말로 만든 웹앱도 결국 <b>코드 파일</b>이 되어 저장소에 저장돼요.',
    '화면에서 글자를 고치면 <b>저장소의 파일이 바뀌고</b>, 잠시 뒤 모두에게 보여요.'
  ],
  tip: {
    body: '깃허브 토큰을 만들 때는 fine-grained 토큰을 쓰고, 꼭 필요한 저장소와 권한만 선택하세요. 오늘처럼 저장소를 선택하지 않으면 저장이 실패할 수 있어요.',
    extra: '토큰은 비밀번호처럼 다루고, 화면이나 채팅에 그대로 붙여넣지 마세요.'
  },
  myth: {
    myth: '화면에서 글자를 고치면 그 자리에서 바로 저장된다.',
    fact: '실제로는 그 순간 깃허브 API로 파일(예: edits.json)을 저장하고, 정적 호스팅이 새 내용을 반영하는 데 1~2분 정도 걸릴 수 있어요(깃허브 페이지스는 빌드 큐를 거쳐요).'
  },
  sources: [
    { title: 'GitHub Pages — 공식 문서', url: 'https://docs.github.com/en/pages', note: '저장소 내용을 그대로 인터넷에 띄우는 정적 호스팅 서비스.' },
    { title: 'GitHub REST API — Repository contents', url: 'https://docs.github.com/en/rest/repos/contents', note: '화면에서 고친 내용을 저장소 파일에 다시 저장할 때 쓰는 API.' },
    { title: 'Managing your personal access tokens (fine-grained)', url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens', note: '저장소·권한 범위를 좁게 설정하는 fine-grained 토큰 안내.' }
  ],
  script: `말 한마디로 웹앱을 만들었는데, 그게 어떻게 깃허브에 올라가고 화면에서 편집까지 될까요. 순서를 따라가 볼게요.

먼저 말이 코드(HTML, CSS, JS 파일)로 바뀌고, 그 코드가 깃허브라는 저장소에 저장돼요. 그다음 깃허브 페이지스라는 서비스가 그 저장소 내용을 그대로 인터넷에 띄워요. 그래서 별도의 서버 프로그램 없이도, 정적 사이트만으로 누구나 그 주소로 들어갈 수 있어요.

화면에서 글자를 고치는 것도 원리는 비슷해요. 그 자리에서 바로 저장되는 게 아니라, 고친 내용을 깃허브 API로 저장소의 파일(예: edits.json)에 다시 저장해요. 그러면 정적 호스팅이 다시 배포하고, 1~2분 뒤 모두에게 바뀐 내용이 보여요.

이때 쓰는 접근 토큰은 fine-grained 방식으로, 저장소와 권한을 좁게 선택해야 해요. 오늘 처음에 저장소를 고르지 않아서 저장이 안 됐던 것도 이 때문이었어요. 토큰은 비밀번호처럼 다루고, 되돌릴 수 있게 커밋 기록을 남겨 두세요.`
};
