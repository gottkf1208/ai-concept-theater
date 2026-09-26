/* E17 [트랙 B] AI는 이미지를 어떻게 '읽을까' — 멀티모달 모델 */
export default {
  slug: 's3-vision',
  track: 'B',
  title: 'AI는 이미지를 어떻게 읽을까',
  subtitle: '멀티모달 모델',
  summary: '학생 활동지 사진을 올렸더니 AI가 내용을 읽고 피드백까지 해 줘서 놀란 적 있으시죠. 이미지를 조각내 토큰처럼 읽는 원리와, 작은 글자·개수 세기 같은 한계를 3분에.',
  keywords: ['멀티모달', 'multimodal', '비전', 'vision', '패치', 'patch', '시각 토큰', 'CLIP', 'ViT'],

  scenes: [
    {
      title: '활동지 사진, 읽어 봤더니', dur: 13,
      captions: [
        { t: 0, text: '학생 활동지 사진을 AI에게 올려 봤어요.' },
        { t: 5, text: 'AI가 글씨를 읽고, 잘된 점과 <em>고칠 점</em>까지 짚어 줬어요.' },
        { t: 9.5, text: '사진 한 장을 AI는 어떻게 <em>읽었을까요</em>?' }
      ],
      build({ stage, lines, P, tl, base }) {
        const q = P.quokka({ x: 50, y: 340, size: 320, pose: 'oops' });
        stage.append(q.el);
        const chip = P.chip({ x: 340, y: 44, text: '학생 활동지 사진', color: 'ink' });
        tl.at(stage.appendChild(chip.el), .3, { from: 'up', dist: 12 });
        const photo = P.h('img', { src: `${base}assets/frames/v1-07s.webp`, alt: '학생 활동지 사진(예시)', style: 'left:340px;top:86px;width:380px;height:214px;object-fit:cover;border-radius:14px;border:2px solid var(--line);background:#fff' });
        tl.at(stage.appendChild(photo), .5, { from: 'up' });
        const arr = P.arrow(lines, { x1: 720, y1: 193, x2: 790, y2: 150, curve: 20, width: 4, color: '#1B1F24' });
        const b = P.bubble({ x: 790, y: 90, w: 430, text: '"글씨를 읽어 봤어요. <b>2번 문항 계산</b>을 다시 확인해 보세요."', tail: 'left', tone: 'aqua' });
        tl.at(stage.appendChild(b.el), 4.6, { from: 'up' });
        const qq = P.text({ x: 340, y: 560, w: 860, text: '사진 한 장을 어떻게 <em>읽었을까요</em>?', size: 32, weight: 800 });
        tl.at(stage.appendChild(qq.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 4.6 && t < 9.5);
            arr.draw(P.clamp((t - 1) / .7, 0, 1));
          }
        };
      }
    },
    {
      title: '조각으로 잘라 읽어요', dur: 14,
      captions: [
        { t: 0, text: '사진을 통째로 보는 게 아니에요. 작은 조각, <em>패치</em>로 잘라서 봐요.' },
        { t: 5.5, text: 'Claude 문서 기준 <em>28×28픽셀</em> 한 조각이 토큰 하나예요. ViT 논문은 이걸 "이미지는 16×16 단어"라고 불러요.' },
        { t: 10.5, text: '그래서 이미지도 글처럼 <em>토큰 열</em>이 돼요.' }
      ],
      build({ stage, lines, P, tl, base }) {
        const q = P.quokka({ x: 960, y: 330, size: 320, pose: 'point', flip: true });
        stage.append(q.el);
        const photo = P.h('img', { src: `${base}assets/char/base.webp`, alt: '쿼카 캐릭터 사진', style: 'left:110px;top:70px;width:230px;height:350px;object-fit:cover;border-radius:10px;background:#F2F5F7' });
        tl.at(stage.appendChild(photo), .3, { from: 'up' });
        const grid = P.h('div', { style: 'left:110px;top:70px;width:230px;height:350px;border:2px solid #1B1F24;border-radius:10px;overflow:hidden' });
        for (let i = 1; i < 4; i++) {
          grid.append(P.h('div', { style: `position:absolute;left:${Math.round(i * 57.5)}px;top:0;width:2px;height:350px;background:rgba(27,31,36,.5)` }));
          grid.append(P.h('div', { style: `position:absolute;left:0;top:${Math.round(i * 87.5)}px;width:230px;height:2px;background:rgba(27,31,36,.5)` }));
        }
        tl.at(stage.appendChild(grid), .6, { from: 'pop' });
        const arr = P.arrow(lines, { x1: 340, y1: 245, x2: 430, y2: 245, width: 4, color: '#127E90' });
        const chipData = ['조각1', '조각2', '조각3', '조각4', '조각5', '조각6'];
        const chips = chipData.map((c, i) => {
          const el = P.chip({ x: 460, y: 110 + i * 46, text: c, color: i % 2 ? 'orange' : 'aqua', size: 20 });
          tl.at(stage.appendChild(el.el), 2 + i * .4, { from: 'left', dist: 14 });
          return el;
        });
        const arrow2 = P.arrow(lines, { x1: 590, y1: 300, x2: 660, y2: 300, width: 4, color: '#127E90' });
        const tokenLbl = P.text({ x: 680, y: 260, w: 220, text: '토큰 열', size: 26, weight: 800, color: '#127E90' });
        tl.at(stage.appendChild(tokenLbl.el), 5, { from: 'right' });
        const note1 = P.text({ x: 110, y: 450, w: 900, text: 'Claude 문서 기준: <em>28×28픽셀</em> 한 조각 = 토큰 1개', size: 24, weight: 700 });
        tl.at(stage.appendChild(note1.el), 5.8, { from: 'up' });
        const note2 = P.text({ x: 110, y: 500, w: 900, text: 'ViT 논문: "이미지는 16×16 단어"', size: 22, weight: 600, cls: 'muted' });
        tl.at(stage.appendChild(note2.el), 6.6, { from: 'up' });
        const note3 = P.text({ x: 110, y: 570, w: 900, text: '이미지도 글처럼 <em>토큰 열</em>이 돼요. E5에서 본 그 토큰과 같아요.', size: 26, weight: 800 });
        tl.at(stage.appendChild(note3.el), 10.7, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 13.5);
            arr.draw(P.clamp((t - 1.6) / .6, 0, 1));
            arrow2.draw(P.clamp((t - 4.6) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '글과 그림, 같은 공간에서', dur: 13,
      captions: [
        { t: 0, text: '사진과 그 사진을 설명하는 글을 <em>짝지어</em> 배운 모델이 바탕이에요. CLIP이라는 방법이에요.' },
        { t: 5, text: '사진과 글이 <em>같은 공간</em> 안에서 가까운 자리에 놓이도록 학습해요.' },
        { t: 9, text: '그래서 "이 그림에 뭐가 있어?"라고 물으면 답할 수 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 480, size: 210, pose: 'think' });
        stage.append(q.el);
        const photoBox = P.box({ x: 130, y: 90, w: 260, h: 150, label: '사진', sub: '안경 쓴 쿼카', accent: 'ink', icon: P.ICON.video });
        tl.at(stage.appendChild(photoBox.el), .3, { from: 'left' });
        const capBox = P.box({ x: 130, y: 280, w: 260, h: 130, label: '설명 글', sub: '"안경 쓴 쿼카"', accent: 'orange', icon: P.ICON.doc });
        tl.at(stage.appendChild(capBox.el), 1, { from: 'left' });
        const central = P.box({ x: 520, y: 170, w: 300, h: 170, label: '같은 공간', sub: '사진과 글을 가깝게 두고 배워요(CLIP)', accent: 'aqua', icon: P.ICON.brain });
        tl.at(stage.appendChild(central.el), 2.2, { from: 'pop' });
        const a1 = P.arrow(lines, { x1: 390, y1: 165, x2: 520, y2: 230, curve: -20, width: 4, color: '#9AA5AF' });
        const a2 = P.arrow(lines, { x1: 390, y1: 345, x2: 520, y2: 290, curve: 20, width: 4, color: '#9AA5AF' });
        const outB = P.bubble({ x: 900, y: 150, w: 340, text: '"이 그림에 뭐가 있어?" → <b>답할 수 있어요</b>', tail: 'left', tone: 'aqua' });
        tl.at(stage.appendChild(outB.el), 9.1, { from: 'up' });
        const a3 = P.arrow(lines, { x1: 820, y1: 240, x2: 900, y2: 210, width: 4, color: '#127E90' });
        return {
          tick(t) {
            q.tick(t, t < 12.5);
            a1.draw(P.clamp((t - 1.2) / .7, 0, 1));
            a2.draw(P.clamp((t - 1.8) / .7, 0, 1));
            a3.draw(P.clamp((t - 8.8) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '한계도 있어요', dur: 14,
      captions: [
        { t: 0, text: '한계도 있어요. Claude 공식 문서 기준으로 정리해 봤어요.' },
        { t: 5.2, text: '<em>작은 글자</em>(200픽셀 미만)나 <em>회전된 사진</em>은 실수하기 쉽고, 개수·위치는 <em>대략적</em>이에요.' },
        { t: 10.5, text: 'AI 생성 이미지인지 판정은 못 하고, <em>사람 신원 식별</em>은 정책상 하지 않아요.' }
      ],
      build({ stage, lines, P, tl }) {
        const title = P.text({ x: 70, y: 80, w: 900, text: '한계 (Claude 공식 문서 기준)', size: 26, weight: 800, cls: 'muted' });
        tl.at(stage.appendChild(title.el), .2, { from: 'up' });
        const row1 = ['작은 글자(200px 미만) 실수', '회전된 사진 실수', '개수는 대략적'];
        const row2 = ['위치 좌표는 근사치', 'AI 생성 여부 판정 불가', '사람 신원 식별 거부'];
        const chips1 = row1.map((t, i) => {
          const c = P.chip({ x: 70 + i * 390, y: 190, text: t, color: 'orange', size: 21 });
          tl.at(stage.appendChild(c.el), .8 + i * .5, { from: 'pop' });
          return c;
        });
        const chips2 = row2.map((t, i) => {
          const c = P.chip({ x: 70 + i * 390, y: 280, text: t, color: 'orange', size: 21 });
          tl.at(stage.appendChild(c.el), 6 + i * .5, { from: 'pop' });
          return c;
        });
        const q = P.quokka({ x: 60, y: 400, size: 260, pose: 'oops' });
        tl.at(stage.appendChild(q.el), 10.8, { from: 'up' });
        const note = P.text({ x: 400, y: 430, w: 800, text: '판정 불가·식별 거부는 <em>못 하는 게 아니라 안 하는 것</em>도 있어요.', size: 24, weight: 700 });
        tl.at(stage.appendChild(note.el), 10.8, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t > 10.5);
          }
        };
      }
    },
    {
      title: '그래서 이렇게 해요', dur: 13,
      captions: [
        { t: 0, text: '활동지 사진은 <em>크게, 똑바로</em> 찍어 주세요.' },
        { t: 5, text: '학생 얼굴은 <em>가려서</em> 올려요. 개인정보 이야기는 E21에서 더 다뤄요.' },
        { t: 9.5, text: '개수·점수처럼 <em>정확해야 하는 건</em> 사람이 한 번 더 확인해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 40, y: 460, size: 250, pose: 'wave' });
        stage.append(q.el);
        const b1 = P.box({ x: 330, y: 110, w: 280, h: 160, label: '크고 똑바로 찍기', sub: '작은 글자·회전 실수를 줄여요', accent: 'aqua', icon: P.ICON.eye });
        tl.at(stage.appendChild(b1.el), .3, { from: 'up' });
        const b2 = P.box({ x: 650, y: 110, w: 280, h: 160, label: '학생 얼굴 가리기', sub: '개인정보 보호를 위해', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(b2.el), 4.6, { from: 'up' });
        const b3 = P.box({ x: 970, y: 110, w: 260, h: 160, label: '사람이 확인', sub: '개수·점수처럼 정확해야 하는 것', accent: 'ink', icon: P.ICON.check });
        tl.at(stage.appendChild(b3.el), 9.2, { from: 'up' });
        const last = P.text({ x: 330, y: 320, w: 900, text: 'AI는 사진을 조각내 <em>대략 읽어요</em>. 중요한 건 사람이 다시 봐요.', size: 30, weight: 800 });
        tl.at(stage.appendChild(last.el), 9.6, { from: 'up' });
        return {
          tick(t) { q.tick(t, true); }
        };
      }
    }
  ],

  interaction: {
    title: '패치 격자 탐색기',
    desc: '쿼카 사진 위에 격자를 올려 <b>패치</b>(조각)로 나눠 봐요. 격자 크기를 바꾸면 조각 수 = "토큰" 수가 달라져요. 조각을 클릭하면 확대되고 설명이 떠요. 아래에서는 작은 글자 예시도 볼 수 있어요.',
    mount(el, P) {
      const img = new Image();
      let loaded = false;
      img.onload = () => { loaded = true; drawAll(); };
      img.src = 'assets/char/base.webp';

      const CW = 260, CH = 380;
      let gridN = 8;
      let sel = { col: Math.floor(8 / 2), row: Math.floor(8 * 0.32) };

      const wrap = P.h('div', { class: 'sim-wrap' });
      const sizeRow = P.h('div', { class: 'sim-sizerow' });
      const sizeLabel = P.h('label', { for: 'sim-grid-range', class: 'sim-sizelabel' });
      const range = P.h('input', { id: 'sim-grid-range', type: 'range', min: '4', max: '16', step: '4', value: String(gridN), class: 'sim-range' });
      sizeRow.append(sizeLabel, range);
      const countLine = P.h('p', { class: 'sim-count', 'aria-live': 'polite' });

      const stageRow = P.h('div', { class: 'sim-stagerow' });
      const canvasWrap = P.h('div', { class: 'sim-canvaswrap' });
      const canvas = P.h('canvas', { width: String(CW), height: String(CH), class: 'sim-canvas', tabindex: '0', role: 'img', 'aria-label': '쿼카 사진 위 패치 격자. 클릭해서 조각을 살펴보세요.' });
      canvasWrap.append(canvas);
      const zoomWrap = P.h('div', { class: 'sim-zoomwrap' });
      const zoomCanvas = P.h('canvas', { width: '120', height: '120', class: 'sim-zoomcanvas' });
      const desc = P.h('p', { class: 'sim-desc', 'aria-live': 'polite' });
      zoomWrap.append(P.h('div', { class: 'sim-zoomtitle' }, '확대'), zoomCanvas, desc);
      stageRow.append(canvasWrap, zoomWrap);

      const smallToggle = P.h('button', { class: 'btn', type: 'button' }, '작은 글자 예시 보기');
      const smallBlock = P.h('div', { class: 'sim-smallblock', hidden: '' });
      const smallImg = P.h('img', { src: 'assets/frames/v1-07s.webp', alt: '작게 표시한 화면 예시', class: 'sim-smallimg' });
      const smallCap = P.h('p', { class: 'sim-smallcap' }, '이 정도 크기면 숫자를 잘못 읽을 수 있어요(Claude 문서 기준 200픽셀 미만).');
      smallBlock.append(smallImg, smallCap);

      const style = P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:18px}
        .sim-sizerow{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .sim-sizelabel{font-weight:700;font-family:var(--mono);font-size:13px;white-space:nowrap}
        .sim-range{flex:1;min-width:140px;max-width:100%}
        .sim-count{font-size:13.5px;color:var(--muted);margin:0}
        .sim-count b{color:var(--ink)}
        .sim-stagerow{display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start}
        .sim-canvaswrap{max-width:260px;width:100%}
        .sim-canvas{width:100%;height:auto;display:block;border-radius:14px;border:1px solid var(--line);background:#F2F5F7;cursor:pointer;max-width:100%}
        .sim-zoomwrap{flex:1;min-width:150px;max-width:100%}
        .sim-zoomtitle{font-size:13px;font-weight:800;color:var(--muted);margin-bottom:8px}
        .sim-zoomcanvas{width:120px;height:120px;border-radius:10px;border:2px solid var(--orange);background:#F2F5F7;image-rendering:pixelated;max-width:100%}
        .sim-desc{margin-top:10px;font-size:14.5px;font-weight:700;max-width:280px}
        .sim-smallblock{margin-top:4px}
        .sim-smallimg{width:240px;max-width:100%;height:auto;display:block;border-radius:10px;border:1px solid var(--line)}
        .sim-smallcap{font-size:13px;color:var(--muted);margin-top:8px;max-width:400px}
      ` });

      el.append(style, wrap);
      wrap.append(sizeRow, countLine, stageRow, smallToggle, smallBlock);

      const ctx = canvas.getContext('2d');
      const zctx = zoomCanvas.getContext('2d');
      const off = document.createElement('canvas');
      off.width = CW; off.height = CH;
      const octx = off.getContext('2d');

      function describePatch(fx, fy) {
        if (fy < 0.06 || fx < 0.1 || fx > 0.9) return '배경 조각이에요. 특징이 거의 없어요.';
        if (fy < 0.22) return '귀 조각이에요.';
        if (fy < 0.42 && fx > 0.26 && fx < 0.74) return '눈·얼굴 조각이에요.';
        if (fy < 0.72) return '몸통(스웨터) 조각이에요.';
        return '아래쪽(다리·바닥) 조각이에요.';
      }

      function drawImageLayer() {
        if (loaded) {
          const scale = Math.max(CW / img.naturalWidth, CH / img.naturalHeight);
          const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
          octx.fillStyle = '#F2F5F7'; octx.fillRect(0, 0, CW, CH);
          octx.drawImage(img, (CW - dw) / 2, (CH - dh) / 2, dw, dh);
        } else {
          octx.fillStyle = '#F2F5F7'; octx.fillRect(0, 0, CW, CH);
        }
      }

      function drawAll() {
        drawImageLayer();
        ctx.clearRect(0, 0, CW, CH);
        ctx.drawImage(off, 0, 0);
        const cw = CW / gridN, ch = CH / gridN;
        ctx.strokeStyle = 'rgba(27,31,36,.4)';
        ctx.lineWidth = 1;
        for (let i = 1; i < gridN; i++) {
          ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, CH); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i * ch); ctx.lineTo(CW, i * ch); ctx.stroke();
        }
        ctx.strokeStyle = '#1B1F24'; ctx.lineWidth = 2; ctx.strokeRect(1, 1, CW - 2, CH - 2);
        const sx = sel.col * cw, sy = sel.row * ch;
        ctx.fillStyle = 'rgba(242,129,45,.35)';
        ctx.fillRect(sx, sy, cw, ch);
        ctx.strokeStyle = '#F2812D'; ctx.lineWidth = 2.5;
        ctx.strokeRect(sx + 1, sy + 1, cw - 2, ch - 2);

        zctx.imageSmoothingEnabled = false;
        zctx.clearRect(0, 0, 120, 120);
        zctx.drawImage(off, sx, sy, cw, ch, 0, 0, 120, 120);

        const total = gridN * gridN;
        countLine.innerHTML = `격자 <b>${gridN}×${gridN}</b> = 패치 <b>${total}개</b> = "토큰" <b>${total}개</b>(ViT 계열은 보통 14~16px 패치를 써요)`;
        sizeLabel.textContent = `격자 크기: ${gridN}×${gridN}`;
        const fx = (sel.col + .5) / gridN, fy = (sel.row + .5) / gridN;
        desc.textContent = describePatch(fx, fy);
      }

      function pick(clientX, clientY) {
        const r = canvas.getBoundingClientRect();
        const x = (clientX - r.left) / r.width * CW;
        const y = (clientY - r.top) / r.height * CH;
        const cw = CW / gridN, ch = CH / gridN;
        sel.col = P.clamp(Math.floor(x / cw), 0, gridN - 1);
        sel.row = P.clamp(Math.floor(y / ch), 0, gridN - 1);
        drawAll();
      }
      canvas.addEventListener('click', (e) => pick(e.clientX, e.clientY));
      canvas.addEventListener('keydown', (e) => {
        let moved = true;
        if (e.key === 'ArrowRight') sel.col = P.clamp(sel.col + 1, 0, gridN - 1);
        else if (e.key === 'ArrowLeft') sel.col = P.clamp(sel.col - 1, 0, gridN - 1);
        else if (e.key === 'ArrowDown') sel.row = P.clamp(sel.row + 1, 0, gridN - 1);
        else if (e.key === 'ArrowUp') sel.row = P.clamp(sel.row - 1, 0, gridN - 1);
        else moved = false;
        if (moved) { e.preventDefault(); drawAll(); }
      });
      range.addEventListener('input', () => {
        const oldN = gridN;
        gridN = +range.value;
        const fx = (sel.col + .5) / oldN, fy = (sel.row + .5) / oldN;
        sel.col = P.clamp(Math.floor(fx * gridN), 0, gridN - 1);
        sel.row = P.clamp(Math.floor(fy * gridN), 0, gridN - 1);
        drawAll();
      });
      smallToggle.addEventListener('click', () => {
        const willShow = smallBlock.hidden;
        smallBlock.hidden = !willShow;
        smallToggle.textContent = willShow ? '작은 글자 예시 접기' : '작은 글자 예시 보기';
      });

      drawAll();
    }
  },

  teacherLines: [
    'AI는 사진을 통째로 보는 게 아니라, <b>작은 조각(패치)</b>으로 잘라 글자처럼 읽어요.',
    '그래서 <b>작은 글씨나 개수 세기</b>는 약해요. 중요한 건 사람이 다시 봐요.'
  ],
  tip: {
    body: '활동지 사진은 <b>크게, 똑바로</b> 찍고 <b>학생 얼굴은 가려서</b> 올리세요.',
    extra: '개수·점수처럼 정확해야 하는 건 AI 답을 그대로 쓰지 말고 사람이 한 번 더 확인하세요.'
  },
  myth: {
    myth: 'AI가 사진을 사람처럼 본다.',
    fact: '사진을 작은 조각으로 나눠 토큰처럼 처리해요. 작은 글자·개수·위치는 근사치예요.'
  },
  sources: [
    { title: 'Dosovitskiy et al., 2020 — An Image is Worth 16x16 Words (ViT)', url: 'https://arxiv.org/abs/2010.11929', note: '이미지를 16×16 픽셀 조각으로 잘라 토큰처럼 다루는 Vision Transformer 논문이에요.' },
    { title: 'Claude 문서 — Vision', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', note: '28×28픽셀 한 조각이 시각 토큰 하나이며, 작은 글자·회전·개수·위치 인식의 한계를 안내해요.' },
    { title: 'Radford et al., 2021 — CLIP', url: 'https://arxiv.org/abs/2103.00020', note: '사진과 설명 글을 짝지어 같은 공간에서 학습하는 CLIP 논문이에요.' }
  ],
  script: `
학생 활동지 사진을 올렸더니 AI가 글씨를 읽고 고칠 점까지 짚어 줘서 놀란 적 있으시죠. 사진 한 장을 AI는 어떻게 읽는 걸까요.

AI는 사진을 통째로 보지 않아요. 작은 조각, 패치로 잘라서 봐요. Claude 문서 기준 28×28픽셀 한 조각이 토큰 하나가 되고, 이미지도 글처럼 토큰 열이 돼요. ViT 논문은 이걸 '이미지는 16×16 단어'라 불러요. 사진과 설명 글을 짝지어 배운 CLIP 덕분에 "이 그림에 뭐가 있어?"에도 답할 수 있어요.

한계도 있어요. Claude 문서에 따르면 200픽셀보다 작은 글자나 회전된 사진은 실수하기 쉽고, 개수·위치는 대략적이에요. AI 생성 판정이나 사람 신원 식별은 하지 않아요. 활동지는 크고 똑바로 찍고, 학생 얼굴은 가리고, 개수·점수는 사람이 한 번 더 확인해 주세요.
`
};
