/* S777-68 확인템 장착이 국룰: 생성형 AI 가짜정보 판별 체크리스트와 딥페이크 단서 */
export default {
  slug: 't7-fact-check-campaign',
  track: 'S777',
  title: '확인템 장착이 국룰',
  subtitle: '생성형 AI 가짜정보 판별 체크리스트와 딥페이크 단서',
  summary: '10월 1일 방송미디어통신위원회가 SNS에서 "인공지능(AI) 시대, 확인템 장착이 국룰!" 캠페인을 시작했어요. 가짜 얼굴이 만들어지는 구조(인코더 하나·디코더 둘)와 픽셀에서 찾는 단서, 그 한계를 보고, 픽셀 밖 맥락을 묻는 여덟 가지 확인 질문으로 판별 퀴즈를 수업에 옮겨 봐요.',
  keywords: ['확인템 캠페인', '방송미디어통신위원회', '거짓 정보 판별 점검표', '딥페이크', '얼굴 바꾸기', '인코더', '디코더', '재연', '교체', '편집', '합성', '확산 모델', '픽셀 단서', '맥락 단서', 'IFLA', '팩트체크', '생성형AI 이용자 참여 플랫폼'],

  scenes: [
    {
      title: '확인템, 장착했나요', dur: 13,
      captions: [
        { t: 0, text: '10월 1일 방송미디어통신위원회가 SNS에서 <em>"AI 시대, 확인템 장착이 국룰!"</em> 캠페인을 시작했어요.' },
        { t: 4.5, text: '10월엔 진짜와 가짜를 나란히 놓고 고르는 퀴즈, 11월엔 나만의 확인 방법을 소개하는 챌린지예요.' },
        { t: 9, text: '생성형 AI 이용률은 2년 새 12.3%에서 38.9%로 늘었어요. 목표는 정답 맞히기보다 <em>스스로 확인하고 의심하는 습관</em>이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 330, size: 310, pose: 'point' });
        stage.append(q.el);
        const date = P.chip({ x: 340, y: 80, text: '2026. 10. 1. 방송미디어통신위원회', color: 'ink', size: 20 });
        tl.at(stage.appendChild(date.el), .3, { from: 'pop' });
        const head = P.text({ x: 340, y: 135, w: 880, text: '"인공지능(AI) 시대, <em>확인템 장착이 국룰!</em>"', size: 34, weight: 800 });
        tl.at(stage.appendChild(head.el), 1, { from: 'up' });
        const months = [
          ['10월 퀴즈', '진짜 대 가짜, 나란히 놓고 고르기', 'aqua'],
          ['11월 챌린지', '나만의 확인 방법 소개하기', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 340 + i * 440, y: 215, w: 410, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), 4.7 + i * 1.4, { from: 'up' });
          return b;
        });
        const rate = P.chip({ x: 340, y: 370, text: '국민 생성형 AI 이용률 12.3% → 38.9% (2023 → 2025)', color: 'gray', size: 20 });
        tl.at(stage.appendChild(rate.el), 9.2, { from: 'pop' });
        const goal = P.text({ x: 340, y: 440, w: 880, text: '목표는 <em>스스로 확인하고 의심하는 습관</em>이에요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(goal.el), 10.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 4.5 || t > 9);
            months.forEach((b, i) => b.on(t > 4.7 + i * 1.4));
          }
        };
      }
    },
    {
      title: '가짜 얼굴은 이렇게 만들어져요', dur: 14,
      captions: [
        { t: 0, text: '얼굴 바꾸기의 원조 구조는 <em>인코더 하나, 디코더 둘</em>이에요. 인코더(얼굴을 숫자로 요약하는 부분)가 두 얼굴의 표정과 각도를 같은 숫자 공간에 옮겨요.' },
        { t: 5.5, text: '디코더는 숫자를 다시 얼굴로 그려요. A의 디코더로 B의 표정을 그리면 <em>B처럼 움직이는 A 얼굴</em>이 나와요.' },
        { t: 10, text: '2020년 조사 논문은 얼굴 딥페이크를 재연·교체·편집·합성 넷으로 나눴어요. 없는 사람을 그리는 원리는 확산 편에 있어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'think' });
        stage.append(q.el);
        const faceA = P.box({ x: 330, y: 105, w: 140, h: 90, label: '얼굴 A', accent: 'ink' });
        const faceB = P.box({ x: 330, y: 245, w: 140, h: 90, label: '얼굴 B', accent: 'ink' });
        tl.at(stage.appendChild(faceA.el), .3, { from: 'left' });
        tl.at(stage.appendChild(faceB.el), .6, { from: 'left' });
        const enc = P.box({ x: 510, y: 150, w: 190, h: 140, label: '공통 인코더', sub: '표정·각도를<br>숫자로 요약', accent: 'aqua' });
        tl.at(stage.appendChild(enc.el), 1.4, { from: 'up' });
        const latent = P.box({ x: 740, y: 150, w: 170, h: 140, label: '표현 공간', sub: '같은 숫자 자리', accent: '' });
        tl.at(stage.appendChild(latent.el), 2.6, { from: 'up' });
        const decA = P.box({ x: 950, y: 85, w: 270, h: 120, label: '디코더 A', sub: 'A 얼굴로 다시 그리기', accent: 'orange' });
        const decB = P.box({ x: 950, y: 235, w: 270, h: 120, label: '디코더 B', sub: 'B 얼굴로 다시 그리기', accent: '' });
        tl.at(stage.appendChild(decA.el), 5.6, { from: 'right' });
        tl.at(stage.appendChild(decB.el), 5.9, { from: 'right' });
        const arrows = [
          P.arrow(lines, { x1: 472, y1: 150, x2: 506, y2: 200, width: 3, color: '#1B1F24' }),
          P.arrow(lines, { x1: 472, y1: 290, x2: 506, y2: 245, width: 3, color: '#1B1F24' }),
          P.arrow(lines, { x1: 702, y1: 220, x2: 736, y2: 220, width: 4, color: '#1B1F24' })
        ];
        const toA = P.arrow(lines, { x1: 912, y1: 200, x2: 946, y2: 150, width: 4, color: '#F2812D' });
        const toB = P.arrow(lines, { x1: 912, y1: 240, x2: 946, y2: 290, width: 3, dashed: true, color: '#9AA5AF' });
        const result = P.chip({ x: 950, y: 385, text: 'B처럼 움직이는 A 얼굴', color: 'orange', size: 20 });
        tl.at(stage.appendChild(result.el), 7.4, { from: 'pop' });
        const kinds = P.chip({ x: 330, y: 470, text: '얼굴 딥페이크 네 갈래: 재연 · 교체 · 편집 · 합성', color: 'ink', size: 20 });
        tl.at(stage.appendChild(kinds.el), 10.2, { from: 'pop' });
        const note = P.text({ x: 330, y: 540, w: 880, text: '없는 사람을 통째로 그리는 확산 모델 원리는 확산 편에서 봤어요.', size: 22, weight: 700, cls: 'muted' });
        tl.at(stage.appendChild(note.el), 11.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 10);
            arrows.forEach((a, i) => a.draw(P.clamp((t - (1.2 + i * 1.2)) / .5, 0, 1)));
            toA.draw(P.clamp((t - 6.4) / .6, 0, 1));
            toB.draw(P.clamp((t - 6.6) / .6, 0, 1));
            enc.on(t > 1.4 && t < 5.5); latent.on(t > 2.6 && t < 5.5); decA.on(t > 6.4);
          }
        };
      }
    },
    {
      title: '픽셀 단서, 그리고 그 수명', dur: 14,
      captions: [
        { t: 0, text: '바꾼 얼굴은 <em>피부결</em>, 눈썹 그림자와 <em>안경 반사</em>, 깜빡임, 입술 움직임에서 틈이 나기 쉬워요. MIT 미디어랩이 정리한 여덟 질문이에요.' },
        { t: 5.5, text: '2024년 연구는 AI 이미지의 흔적을 해부학·스타일·기능·물리 법칙·사회문화 다섯 범주로 나눴어요.' },
        { t: 9.5, text: '그런데 연구진도 사람 눈에 보이는 흔적이 <em>없을 때가 많다</em>고 해요. 픽셀만 보고 진짜인지 결론 내리긴 어려워요.' }
      ],
      build({ stage, lines, P, tl }) {
        const face = P.s('ellipse', { cx: 300, cy: 300, rx: 130, ry: 170, fill: 'none', stroke: '#1B1F24', 'stroke-width': 3, opacity: 0 });
        const eyeL = P.s('ellipse', { cx: 250, cy: 260, rx: 26, ry: 12, fill: 'none', stroke: '#1B1F24', 'stroke-width': 3, opacity: 0 });
        const eyeR = P.s('ellipse', { cx: 350, cy: 260, rx: 26, ry: 12, fill: 'none', stroke: '#1B1F24', 'stroke-width': 3, opacity: 0 });
        const mouth = P.s('path', { d: 'M255 380 Q300 405 345 380', fill: 'none', stroke: '#1B1F24', 'stroke-width': 3, opacity: 0 });
        lines.append(face, eyeL, eyeR, mouth);
        const spots = [[300, 160], [215, 320], [250, 232], [350, 260], [300, 440], [372, 330], [250, 262], [300, 388]];
        const dots = spots.map(([cx, cy]) => { const d = P.s('circle', { cx, cy, r: 9, fill: '#F2812D', opacity: 0 }); lines.append(d); return d; });
        const names = ['① 얼굴 전체', '② 볼·이마 피부결', '③ 눈·눈썹 그림자', '④ 안경 반사', '⑤ 수염', '⑥ 점', '⑦ 눈 깜빡임', '⑧ 입술 움직임'];
        const chips = names.map((text, i) => {
          const c = P.chip({ x: 520 + (i % 2) * 330, y: 90 + Math.floor(i / 2) * 66, text, color: i === 1 || i === 3 ? 'orange' : 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), .4 + i * .6, { from: 'pop' });
          return c;
        });
        const five = P.chip({ x: 520, y: 380, text: '이미지 흔적 5범주: 해부학 · 스타일 · 기능 · 물리 · 사회문화', color: 'aqua', size: 20 });
        tl.at(stage.appendChild(five.el), 5.7, { from: 'pop' });
        const limit = P.text({ x: 180, y: 520, w: 1000, text: '사람 눈에 보이는 흔적이 <em>늘 있는 건 아니에요</em>.', size: 32, weight: 800 });
        tl.at(stage.appendChild(limit.el), 9.7, { from: 'up' });
        return {
          tick(t) {
            const o = P.clamp(t / .5, 0, 1);
            [face, eyeL, eyeR, mouth].forEach(el => el.setAttribute('opacity', String(o)));
            dots.forEach((d, i) => d.setAttribute('opacity', String(P.clamp((t - (.4 + i * .6)) / .3, 0, 1) * (t > 9.5 ? .35 : 1))));
          }
        };
      }
    },
    {
      title: '픽셀 밖에서 확인해요', dur: 13,
      captions: [
        { t: 0, text: '그래서 확인 습관의 중심은 <em>맥락</em>이에요. 누가 올렸는지, 날짜는 언제인지, 링크가 정말 그 말을 뒷받침하는지 봐요.' },
        { t: 5.5, text: '국제도서관연맹이 정리한 여덟 단계에는 <em>내 편향 점검</em>도 들어 있어요. 믿고 싶은 소식일수록 한 번 더 봐요.' },
        { t: 9.5, text: '날짜 확인은 옛 사진이나 기사를 오늘 일처럼 다시 올린 경우를 걸러 줘요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 350, size: 290, pose: 'oops' });
        stage.append(q.el);
        const cards = [
          ['① 출처', '누가 올렸나'], ['② 제목 너머', '본문 끝까지'], ['③ 작성자', '실존·신뢰'], ['④ 근거 링크', '정말 뒷받침하나'],
          ['⑤ 날짜', '옛 글 재게시'], ['⑥ 풍자인가', '농담·풍자'], ['⑦ 내 편향', '믿고 싶은가'], ['⑧ 전문가', '사서·팩트체크']
        ].map(([label, sub], i) => {
          const acc = i === 4 ? 'orange' : (i === 6 ? 'aqua' : '');
          const b = P.box({ x: 330 + (i % 4) * 225, y: 90 + Math.floor(i / 4) * 140, w: 205, h: 120, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), .3 + i * .45, { from: 'up' });
          return b;
        });
        const dateChip = P.chip({ x: 330, y: 395, text: '⑤ 날짜: 몇 년 전 사진을 오늘 일처럼 올리기', color: 'orange', size: 20 });
        tl.at(stage.appendChild(dateChip.el), 9.7, { from: 'pop' });
        const final = P.text({ x: 330, y: 465, w: 880, text: '믿고 싶은 소식일수록 <em>한 번 더</em> 봐요.', size: 28, weight: 800 });
        tl.at(stage.appendChild(final.el), 6.4, { from: 'up' });
        return {
          tick(t) {
            q.tick(t, t < 5.5 || t > 9.5);
            cards.forEach((b, i) => b.on((i === 6 && t > 5.6 && t < 9.5) || (i === 4 && t > 9.6) || (i < 4 && t > 1 && t < 5.5)));
          }
        };
      }
    },
    {
      title: '퀴즈를 수업으로', dur: 12,
      captions: [
        { t: 0, text: '진짜 대 가짜 퀴즈를 쓰면 정답보다 <em>어떻게 확인했는지</em>를 말하게 해 주세요. 맞힌 이유가 픽셀이면 다음엔 틀릴 수 있어요.' },
        { t: 6.5, text: '통계·인용·법률·의학은 다른 출처와 비교해요. 의심되면 공유를 멈추고 <em>생성형 AI 이용자 참여 플랫폼</em>이나 신고 기능으로 알려요.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 50, y: 310, size: 330, pose: 'wave' });
        stage.append(q.el);
        const at = [.3, 6.6, 8.2];
        const steps = [
          ['① 확인 과정 말하기', '정답보다 어떻게 확인했는지', 'aqua'],
          ['② 다른 출처와 비교', '통계·인용·법률·의학 정보', 'ink'],
          ['③ 공유 멈추고 제보', '이용자 참여 플랫폼·신고 기능', 'orange']
        ].map(([label, sub, acc], i) => {
          const b = P.box({ x: 400, y: 80 + i * 125, w: 800, h: 105, label, sub, accent: acc });
          tl.at(stage.appendChild(b.el), at[i], { from: 'up' });
          return b;
        });
        const why = P.text({ x: 400, y: 460, w: 800, text: '맞힌 이유가 픽셀이면 <em>다음엔 틀릴 수 있어요</em>.', size: 27, weight: 800 });
        tl.at(stage.appendChild(why.el), 3, { from: 'up' });
        const url = P.chip({ x: 400, y: 530, text: '생성형 AI 이용자 참여 플랫폼 · ai.wiseuser.go.kr', color: 'gray', size: 20 });
        tl.at(stage.appendChild(url.el), 8.6, { from: 'pop' });
        return {
          tick(t) {
            q.tick(t, true);
            steps.forEach((b, i) => b.on(t > at[i]));
          }
        };
      }
    }
  ],

  interaction: {
    title: '확인템 체크리스트 채점기',
    desc: '연습용 게시물 하나를 고르고, 여덟 단계 가운데 확인할 항목에 표시한 뒤 <b>"확인 결과 열기"</b>를 눌러 보세요. 표시한 항목만 결과가 펼쳐지고 공유해도 될지 판단이 나와요. <b>"픽셀만 보기"</b>는 얼굴·그림자 같은 픽셀 단서만 볼 때 무엇을 놓치는지 보여 줘요. 게시물과 확인 결과는 연습용 예시예요. 여덟 단계는 국제도서관연맹(IFLA)의 \'How To Spot Fake News\'를 따랐어요.',
    mount(el, P) {
      const STEPS = [
        { id: 'src', label: '출처' }, { id: 'read', label: '제목 너머' }, { id: 'author', label: '작성자' }, { id: 'link', label: '근거 링크' },
        { id: 'date', label: '날짜' }, { id: 'joke', label: '풍자 여부' }, { id: 'bias', label: '내 편향' }, { id: 'expert', label: '전문가' }
      ];
      const POSTS = {
        A: {
          title: 'A. 구름 위로 솟은 학교 사진, "오늘 아침"', fake: true,
          r: {
            src: ['처음 올린 계정이 사진을 어디서 가져왔는지 밝히지 않았어요.', true],
            read: ['본문에 언제 어디서 찍었는지 설명이 없어요.', false],
            author: ['사진을 모아 올리는 계정이에요. 직접 찍은 사람이 아니에요.', true],
            link: ['원본으로 이어지는 링크가 없어요.', true],
            date: ['원본은 2년 전 다른 나라 게시물이에요. "오늘 아침"이 아니에요.', true],
            joke: ['풍자 계정은 아니에요.', false],
            bias: ['"멋지다, 퍼뜨리고 싶다"는 마음이 먼저 들었는지 점검해요.', false],
            expert: ['사진 검증 기사를 찾아보면 원본 날짜가 나와요.', true]
          }
        },
        B: {
          title: 'B. "교육청 발표"라는 캡처 이미지', fake: true,
          r: {
            src: ['캡처만 있고 원문이 실린 곳이 없어요.', true],
            read: ['캡처 아래쪽이 잘려 전체 문장을 볼 수 없어요.', true],
            author: ['올린 계정은 교육청 공식 계정이 아니에요.', true],
            link: ['함께 붙은 링크가 교육청 공식 누리집으로 이어지지 않아요.', true],
            date: ['캡처에 날짜가 보이지 않아요.', true],
            joke: ['풍자 표시는 없어요.', false],
            bias: ['바라던 소식이라 반가운 마음이 먼저 드는지 점검해요.', false],
            expert: ['교육청 누리집 공지 목록에서 같은 글을 찾을 수 없어요.', true]
          }
        },
        C: {
          title: 'C. 과학관 주말 행사 안내', fake: false,
          r: {
            src: ['과학관 공식 계정이 올렸어요.', false],
            read: ['본문의 일정과 장소가 제목과 같아요.', false],
            author: ['담당 부서가 밝혀져 있어요.', false],
            link: ['링크가 과학관 공식 누리집 공지로 이어져요.', false],
            date: ['게시 날짜와 행사 날짜가 맞아요.', false],
            joke: ['풍자 게시물이 아니에요.', false],
            bias: ['반가운 소식이어도 확인 습관은 그대로 지켜요.', false],
            expert: ['필요하면 과학관에 직접 물어볼 수 있어요.', false]
          }
        }
      };
      let postId = 'A';
      let mode = 'idle';

      const tabs = Object.keys(POSTS).map(id => {
        const b = P.h('button', { type: 'button', class: 'btn sim-tab', 'aria-pressed': id === postId ? 'true' : 'false' }, `게시물 ${id}`);
        b.addEventListener('click', () => { postId = id; tabs.forEach((t, i) => t.setAttribute('aria-pressed', Object.keys(POSTS)[i] === id ? 'true' : 'false')); mode = 'idle'; render(); });
        return b;
      });
      const postCard = P.h('div', { class: 'sim-post' });
      const checks = STEPS.map((s, i) => {
        const cb = P.h('input', { type: 'checkbox', id: `sim-chk-${s.id}` });
        cb.checked = i === 0;
        cb.addEventListener('change', () => { if (mode !== 'idle') { mode = 'ctx'; render(); } });
        return { ...s, cb, row: P.h('label', { class: 'sim-chk', for: `sim-chk-${s.id}` }, cb, `${i + 1}. ${s.label}`) };
      });
      const openBtn = P.h('button', { type: 'button', class: 'btn primary' }, '확인 결과 열기');
      const pixelBtn = P.h('button', { type: 'button', class: 'btn' }, '픽셀만 보기');
      const out = P.h('div', { class: 'sim-out', 'aria-live': 'polite' });

      el.append(P.h('div', { class: 'sim-wrap' },
        P.h('div', { class: 'sim-tabs' }, ...tabs),
        postCard,
        P.h('div', { class: 'sim-grid' }, ...checks.map(c => c.row)),
        P.h('div', { class: 'sim-btns' }, openBtn, pixelBtn),
        out
      ));
      el.append(P.h('style', { html: `
        .sim-wrap{display:flex;flex-direction:column;gap:12px;max-width:100%}
        .sim-tabs,.sim-btns{display:flex;gap:8px;flex-wrap:wrap}
        .sim-tab[aria-pressed=true]{border-color:var(--acc1);color:var(--acc1);font-weight:800}
        .sim-post{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:#fff;font-weight:700;font-size:14.5px;word-break:keep-all}
        .sim-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px 10px;max-width:100%}
        .sim-chk{display:flex;align-items:center;gap:6px;font-size:13.5px;min-width:0}
        .sim-out{display:flex;flex-direction:column;gap:6px;min-height:40px}
        .sim-line{border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13.5px;background:#fff;word-break:keep-all}
        .sim-line.bad{border-color:var(--acc2);background:color-mix(in srgb,var(--acc2) 8%,white)}
        .sim-line.px{border-style:dashed}
        .sim-sum{font-weight:800;font-size:14px;word-break:keep-all}
      ` }));

      function render() {
        const p = POSTS[postId];
        postCard.textContent = p.title;
        out.innerHTML = '';
        if (mode === 'idle') {
          out.append(P.h('div', { class: 'sim-line' }, '확인할 항목에 표시하고 "확인 결과 열기"를 눌러 보세요.'));
          return;
        }
        if (mode === 'pixel') {
          out.append(P.h('div', { class: 'sim-line px' }, '픽셀 단서 · 얼굴과 피부결: 어색한 곳이 보이지 않아요.'));
          out.append(P.h('div', { class: 'sim-line px' }, '픽셀 단서 · 그림자와 빛: 어색한 곳이 보이지 않아요.'));
          out.append(P.h('div', { class: 'sim-sum' }, p.fake
            ? `픽셀 단서로는 게시물 ${postId}의 문제를 찾지 못했어요. 맥락 단서에 표시해 보세요.`
            : '픽셀 단서만으로는 진짜라고 결론 내릴 수도 없어요. 맥락 단서에 표시해 보세요.'));
          return;
        }
        const on = checks.filter(c => c.cb.checked);
        let bad = 0;
        on.forEach(c => { const [txt, isBad] = p.r[c.id]; if (isBad) bad++; out.append(P.h('div', { class: `sim-line${isBad ? ' bad' : ''}` }, `${c.label}: ${txt}`)); });
        const verdict = bad > 0 ? '공유 보류' : (on.length >= 3 ? '공유해도 됨' : '더 확인하기');
        out.append(P.h('div', { class: 'sim-sum' }, `확인한 항목 ${on.length}/8, 드러난 문제 ${bad}개 → 판단: ${verdict}`));
      }
      openBtn.addEventListener('click', () => { mode = 'ctx'; render(); });
      pixelBtn.addEventListener('click', () => { checks.forEach(c => { c.cb.checked = false; }); mode = 'pixel'; render(); });
      render();
    }
  },

  teacherLines: [
    '가짜인지 알아볼 때는 <b>얼굴만 보지 말고 날짜와 출처</b>도 함께 봐요.',
    '믿고 싶은 소식일수록 <b>공유 버튼 전에 한 번 더</b> 확인해요.'
  ],
  tip: {
    body: '판별 퀴즈를 할 때는 "진짜/가짜"만 고르지 말고 이유 칸을 두 개로 나누세요. ① 픽셀 단서(피부결·그림자·깜빡임·입술 등) ② 맥락 단서(출처·날짜·근거 링크·작성자). 맥락 단서를 하나 이상 쓴 답에 점수를 더 주면 확인 습관이 남아요.',
    extra: '수업 자료로 쓸 가짜 이미지는 실존 인물·실제 사건을 피하고, 수업 뒤에는 "연습용으로 만든 이미지" 표시를 붙여 교실 밖으로 퍼지지 않게 하세요. 표시 방법은 AI 표시 편을 참고하세요.'
  },
  myth: {
    myth: '딥페이크는 눈 깜빡임이나 손가락만 보면 다 알아챌 수 있다.',
    fact: '결정적인 단서 하나는 없고, 연구진도 사람 눈에 보이는 흔적이 늘 있지는 않다고 해요. 출처·날짜·근거 링크 같은 맥락 확인을 함께 해야 해요.'
  },
  sources: [
    { title: '방송미디어통신위원회 보도자료: 생성형 인공지능, 확인하고 살펴보세요 (확인템 캠페인, 2026-10-01)', url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156783902', note: '10~11월 SNS 캠페인, 10월 진짜 대 가짜 퀴즈·11월 확인템 장착 챌린지, 생성형 AI 이용률 12.3% → 38.9%.' },
    { title: 'MIT Media Lab, Detect DeepFakes: How to counteract misinformation created by AI', url: 'https://www.media.mit.edu/projects/detect-fakes/overview/', note: '결정적 단서 하나는 없다며 정리한 여덟 질문(피부결·그림자·안경 반사·깜빡임·입술 등).' },
    { title: 'How to Distinguish AI-Generated Images from Authentic Photographs (arXiv, 2024)', url: 'https://arxiv.org/abs/2406.08651', note: '흔적 다섯 범주(해부학·스타일·기능·물리 법칙·사회문화), 사람이 알아챌 흔적이 늘 있지는 않다는 한계.' },
    { title: 'IFLA, How To Spot Fake News (2017)', url: 'https://www.ifla.org/news/how-to-spot-fake-news-ifla-in-the-post-truth-society/', note: '출처·제목 너머·작성자·근거·날짜·풍자·내 편향·전문가의 여덟 단계.' }
  ],
  script: `10월 1일 방송미디어통신위원회가 SNS에서 "AI 시대, 확인템 장착이 국룰!" 캠페인을 시작했어요. 10월엔 진짜와 가짜를 고르는 퀴즈, 11월엔 나만의 확인 방법을 소개하는 챌린지예요. 목표는 스스로 확인하고 의심하는 습관이에요.

가짜 얼굴의 원조 구조는 인코더 하나, 디코더 둘이에요. 인코더가 두 얼굴의 표정과 각도를 같은 숫자 공간에 옮기고, A의 디코더로 B의 표정을 그리면 B처럼 움직이는 A 얼굴이 나와요. 피부결·그림자·깜빡임에 틈이 나기 쉽지만, 연구진도 사람 눈에 보이는 흔적이 없을 때가 많다고 해요.

그래서 확인 습관의 중심은 맥락이에요. 누가 올렸는지, 날짜는 언제인지, 내가 믿고 싶은 소식은 아닌지 봐요. 퀴즈를 할 때는 정답보다 어떻게 확인했는지를 말하게 해 주세요. 의심되면 공유를 멈추고 생성형 AI 이용자 참여 플랫폼이나 서비스 신고 기능으로 알려요.`
};
