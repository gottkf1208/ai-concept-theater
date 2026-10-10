/* S8-76 손이 없는데 모션그래픽은 어떻게 만들까: 세로 무대(720×1280), 강의식 3분 30초 */
export default {
  slug: 'v8-motion-code',
  track: 'S8',
  format: 'lecture',
  stage: { w: 720, h: 1280 },
  title: '손이 없는데 모션그래픽은 어떻게 만들까',
  subtitle: '처음 그림, 끝 그림, 그리고 속도표',
  summary: '체육대회 영상 맨 앞에 제목 글자가 미끄러져 들어오게 해 달라고 하면, 클로드는 마우스로 글자를 끌지 않아요. "0초엔 왼쪽 밖, 1초엔 가운데"라고 글로 적어요. 처음 그림과 끝 그림만 정하면 중간은 컴퓨터가 계산하고, 그 사이를 어떤 속도로 지날지는 속도표 한 줄이 정해요. 이 글이 어떻게 영상이 되는지 끝까지 따라가 봐요.',
  keywords: ['모션그래픽', '키프레임', '이징', '속도표', '보간', '사이 채우기', '코드로 그리는 애니메이션', '렌더', '프레임', 'FFmpeg'],

  scenes: [
    {
      title: '선생님의 부탁 한 줄', dur: 20,
      captions: [
        { t: 0, text: '체육대회 영상 맨 앞에 제목을 넣고 싶어요. 글자가 왼쪽에서 미끄러져 들어와 가운데 멈추면 좋겠고요.' },
        { t: 7, text: '이걸 클로드에게 부탁하면 어떻게 될까요? 클로드에겐 마우스를 잡을 손이 없어요.' },
        { t: 13.5, text: '그런데도 결과물은 나와요. 손 대신 <em>글</em>로 움직임을 적기 때문이에요.' }
      ],
      build({ stage, lines, P, tl }) {
        const ask = P.bubble({ x: 60, y: 120, w: 600, text: '영상 맨 앞에 <b>2026 가을 체육대회</b> 글자가 왼쪽에서 들어와서 가운데 서게 해 줘', tail: 'bottom', size: 27, tone: 'soft' });
        tl.at(stage.appendChild(ask.el), .4, { from: 'up' });
        const screen = P.box({ x: 60, y: 400, w: 600, h: 300, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(screen.el), 2.2, { from: 'pop' });
        const title = P.text({ x: 60, y: 520, w: 600, text: '2026 가을 체육대회', size: 44, weight: 800, align: 'center', color: '#127E90' });
        stage.append(title.el);
        const noHands = P.chip({ x: 60, y: 760, text: '마우스를 잡을 손이 없어요', color: 'orange', size: 24 });
        tl.at(stage.appendChild(noHands.el), 7.4, { from: 'pop' });
        const yesWords = P.chip({ x: 60, y: 820, text: '대신 글로 적어요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(yesWords.el), 13.8, { from: 'pop' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t > 7 && t < 19);
            /* 글자가 왼쪽 밖에서 가운데로 미끄러져 들어와요(장면 2.6~3.6초) */
            const p = P.clamp((t - 2.6) / 1, 0, 1);
            const e = 1 - Math.pow(1 - p, 3);
            title.el.style.transform = `translateX(${(-720 + 720 * e).toFixed(1)}px)`;
            title.el.style.opacity = t > 2.4 ? 1 : 0;
          }
        };
      }
    },
    {
      title: '손으로 끄는 편집, 글로 적는 편집', dur: 24,
      captions: [
        { t: 0, text: '편집 프로그램에서는 글자를 마우스로 끌어다 놓고, 시간 자리마다 점을 찍어요. 손으로 하는 일이에요.' },
        { t: 8, text: '같은 일을 글로도 적을 수 있어요. "0초에는 왼쪽 밖, 1초에는 가운데." 이 두 줄이면 끝이에요.' },
        { t: 16, text: '클로드가 하는 편집은 늘 이쪽이에요. 글을 쓰면 컴퓨터가 그 글대로 그림을 그려요.' }
      ],
      build({ stage, lines, P, tl }) {
        const a = P.box({ x: 60, y: 110, w: 600, h: 250, label: '손으로 끄는 편집', sub: '글자를 집어서 옮기고<br>시간 자리마다 점을 찍어요', accent: 'orange', icon: P.ICON.hand });
        tl.at(stage.appendChild(a.el), .4, { from: 'up' });
        const b = P.box({ x: 60, y: 410, w: 600, h: 250, label: '글로 적는 편집', sub: '0초에는 왼쪽 밖<br>1초에는 가운데', accent: 'aqua', icon: P.ICON.doc });
        tl.at(stage.appendChild(b.el), 8.3, { from: 'up' });
        const same = P.text({ x: 60, y: 700, w: 600, text: '둘 다 같은 영상이 나와요', size: 30, weight: 800, align: 'center' });
        tl.at(stage.appendChild(same.el), 12, { from: 'up' });
        const who = P.chip({ x: 60, y: 770, text: '클로드는 늘 아래쪽', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(who.el), 16.4, { from: 'pop' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'point' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 23); a.on(t > .4 && t < 8); b.on(t > 8.3); } };
      }
    },
    {
      title: '처음 그림과 끝 그림', dur: 26,
      captions: [
        { t: 0, text: '1초짜리 움직임은 사실 그림 30장이에요. 1초에 30장을 넘기면 눈에는 움직임으로 보여요.' },
        { t: 8, text: '그 30장 가운데 사람이 정하는 건 두 장뿐이에요. 처음 그림과 끝 그림. 이걸 <em>키프레임</em>이라고 불러요.' },
        { t: 17, text: '나머지 28장은 컴퓨터가 두 그림 사이를 재서 채워요. 그래서 두 줄만 적어도 영상이 돼요.' }
      ],
      build({ stage, lines, P, tl }) {
        const strip = P.box({ x: 60, y: 110, w: 600, h: 170, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(strip.el), .3, { from: 'up' });
        const stripT = P.text({ x: 60, y: 126, w: 600, text: '1초 = 그림 30장', size: 26, weight: 800, align: 'center' });
        tl.at(stage.appendChild(stripT.el), .5, { from: 'up' });
        /* 30칸 필름 눈금 */
        const cells = Array.from({ length: 30 }, (_, i) => {
          const x = 76 + i * 19.2;
          const r = P.s('rect', { x, y: 196, width: 15, height: 60, rx: 3, fill: i === 0 || i === 29 ? '#127E90' : '#9AA5AF' });
          r.style.opacity = 0; lines.append(r); return r;
        });
        const k0 = P.box({ x: 60, y: 300, w: 285, h: 230, label: '처음 그림', sub: '0초<br>글자는 왼쪽 밖', accent: 'aqua' });
        const k1 = P.box({ x: 375, y: 300, w: 285, h: 230, label: '끝 그림', sub: '1초<br>글자는 가운데', accent: 'aqua' });
        tl.at(stage.appendChild(k0.el), 8.4, { from: 'left' });
        tl.at(stage.appendChild(k1.el), 9.2, { from: 'right' });
        const kf = P.chip({ x: 60, y: 560, text: '이 두 장이 키프레임', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(kf.el), 12.5, { from: 'pop' });
        const fill = P.text({ x: 60, y: 640, w: 600, text: '사이 28장은 컴퓨터가 재서 채워요', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(fill.el), 17.4, { from: 'up' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'think' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 25);
            cells.forEach((r, i) => { r.style.opacity = P.clamp((t - (1.2 + i * .08)) / .25, 0, 1); if (t > 17.4 && i > 0 && i < 29) r.setAttribute('fill', '#F2812D'); });
          }
        };
      }
    },
    {
      title: '사이는 어떻게 채울까', dur: 22,
      captions: [
        { t: 0, text: '0.5초에 글자는 어디 있을까요? 처음과 끝의 딱 중간이에요. 컴퓨터는 이걸 뺄셈과 곱셈으로 구해요.' },
        { t: 9, text: '위치 = 처음 위치 + (끝 위치 − 처음 위치) × 진행도. 진행도는 0에서 1까지 올라가는 숫자예요.' },
        { t: 16.5, text: '그림 한 장마다 이 식을 한 번씩 계산해요. 이 일을 <em>사이 채우기</em>라고 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const track = P.box({ x: 60, y: 120, w: 600, h: 170, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(track.el), .3, { from: 'up' });
        const word = P.text({ x: 210, y: 175, w: 300, text: '체육대회', size: 40, weight: 800, align: 'center', color: '#127E90' });
        stage.append(word.el);
        const marks = [['0초', 60], ['0.5초', 330], ['1초', 600]].map(([t, x], i) => {
          const c = P.chip({ x: x, y: 310, text: t, color: i === 1 ? 'orange' : 'gray', size: 20 });
          tl.at(stage.appendChild(c.el), .8 + i * .3, { from: 'pop' }); return c;
        });
        const formula = P.box({ x: 60, y: 400, w: 600, h: 200, label: '위치 = 처음 + (끝 − 처음) × 진행도', sub: '진행도는 0에서 1까지<br>0.5초면 진행도 0.5, 딱 중간', accent: 'aqua' });
        tl.at(stage.appendChild(formula.el), 9.3, { from: 'up' });
        const per = P.text({ x: 60, y: 640, w: 600, text: '그림 한 장마다 한 번씩 계산해요', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(per.el), 16.8, { from: 'up' });
        const name = P.chip({ x: 60, y: 700, text: '사이 채우기', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(name.el), 18.5, { from: 'pop' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 21);
            /* 글자가 천천히 왔다 갔다 하며 0.5초 자리에서 멈춰 보여요 */
            const cycle = (t % 6) / 6;
            const p = t < 9 ? Math.min(cycle * 2, 1) : 0.5;
            word.el.style.transform = `translateX(${(-250 + 250 * p).toFixed(1)}px)`;
            marks[1].el.style.transform = t >= 9 ? 'scale(1.12)' : '';
          }
        };
      }
    },
    {
      title: '잠깐, 여기서 생각해 보기', dur: 14,
      captions: [
        { t: 0, text: '글자가 처음부터 끝까지 똑같은 속도로 오면 자연스러울까요? 10초만 떠올려 보세요.' },
        { t: 10, text: '공을 굴려 보면 알 수 있어요. 빠르게 오다가 멈추기 직전에 느려져요.' }
      ],
      build({ stage, lines, P, tl }) {
        const qbox = P.box({ x: 60, y: 160, w: 600, h: 260, label: '똑같은 속도로 오면', sub: '자연스러울까요?', accent: 'orange' });
        tl.at(stage.appendChild(qbox.el), .3, { from: 'pop' });
        const timer = P.text({ x: 60, y: 480, w: 600, text: '10', size: 120, weight: 800, align: 'center', color: '#9AA5AF' });
        tl.at(stage.appendChild(timer.el), .6, { from: 'none' });
        const hint = P.text({ x: 60, y: 660, w: 600, text: '공을 굴려 보면 알 수 있어요', size: 28, weight: 800, align: 'center' });
        tl.at(stage.appendChild(hint.el), 10.2, { from: 'up' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'think' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t > 10); timer.set(String(Math.max(0, Math.ceil(10 - t)))); } };
      }
    },
    {
      title: '속도표, 이징', dur: 28,
      captions: [
        { t: 0, text: '같은 1초, 같은 거리인데 두 글자가 달라 보여요. 위는 똑같은 속도, 아래는 빠르게 왔다가 천천히 멈춰요.' },
        { t: 9, text: '이 차이를 정하는 게 <em>속도표</em>예요. 영어로는 이징이라고 해요. 진행도를 어떻게 나눠 쓸지 적은 표예요.' },
        { t: 18, text: '표준 문서에 이름이 정해져 있어요. 똑같이 가면 linear, 천천히 멈추면 ease-out. 글자 한 단어로 느낌이 바뀌어요.' }
      ],
      build({ stage, lines, P, tl }) {
        const laneA = P.box({ x: 60, y: 110, w: 600, h: 150, label: '', sub: '', accent: '' });
        const laneB = P.box({ x: 60, y: 300, w: 600, h: 150, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(laneA.el), .2, { from: 'up' });
        tl.at(stage.appendChild(laneB.el), .5, { from: 'up' });
        const wA = P.text({ x: 60, y: 160, w: 600, text: '체육대회', size: 40, weight: 800, align: 'center', color: '#9AA5AF' });
        const wB = P.text({ x: 60, y: 350, w: 600, text: '체육대회', size: 40, weight: 800, align: 'center', color: '#127E90' });
        stage.append(wA.el, wB.el);
        const tagA = P.chip({ x: 60, y: 470, text: '똑같은 속도 · linear', color: 'gray', size: 22 });
        const tagB = P.chip({ x: 380, y: 470, text: '천천히 멈춤 · ease-out', color: 'aqua', size: 22 });
        tl.at(stage.appendChild(tagA.el), 18.3, { from: 'pop' });
        tl.at(stage.appendChild(tagB.el), 18.8, { from: 'pop' });
        const def = P.box({ x: 60, y: 540, w: 600, h: 190, label: '속도표 = 이징', sub: '진행도를 어떻게 나눠 쓸지 적은 표<br>거리와 시간은 그대로, 속도만 달라요', accent: 'aqua' });
        tl.at(stage.appendChild(def.el), 9.3, { from: 'up' });
        const std = P.text({ x: 60, y: 760, w: 600, text: '이름은 표준 문서에 정해져 있어요', size: 24, weight: 700, align: 'center', cls: 'muted' });
        tl.at(stage.appendChild(std.el), 21, { from: 'up' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 27);
            const cycle = (t % 3) / 3;           /* 3초마다 다시 출발, 앞 1초 동안 이동 */
            const p = P.clamp(cycle * 3, 0, 1);
            const eo = 1 - Math.pow(1 - p, 3);
            wA.el.style.transform = `translateX(${(-560 + 560 * p).toFixed(1)}px)`;
            wB.el.style.transform = `translateX(${(-560 + 560 * eo).toFixed(1)}px)`;
          }
        };
      }
    },
    {
      title: '글로 적으면 이렇게 생겼어요', dur: 26,
      captions: [
        { t: 0, text: '실제로 적힌 글을 볼게요. 웹 화면에 쓰는 글이에요. 어렵게 보여도 뜻은 네 줄이에요.' },
        { t: 8, text: '처음에는 왼쪽으로 300만큼 밀려 있다가, 끝에는 제자리. 1초 동안, 천천히 멈추는 속도표로.' },
        { t: 17, text: '클로드는 이 네 줄을 적을 수 있어요. 손은 없어도 글은 쓸 수 있으니까요.' }
      ],
      build({ stage, lines, P, tl }) {
        const code = P.box({ x: 60, y: 110, w: 600, h: 300, label: '', sub: '', accent: '' });
        tl.at(stage.appendChild(code.el), .3, { from: 'up' });
        const l1 = P.text({ x: 90, y: 135, w: 540, text: '처음 { 왼쪽으로 300 }', size: 26, weight: 700, cls: 'mono' });
        const l2 = P.text({ x: 90, y: 200, w: 540, text: '끝 { 제자리 }', size: 26, weight: 700, cls: 'mono' });
        const l3 = P.text({ x: 90, y: 265, w: 540, text: '시간 1초', size: 26, weight: 700, cls: 'mono' });
        const l4 = P.text({ x: 90, y: 330, w: 540, text: '속도표 ease-out', size: 26, weight: 700, cls: 'mono', color: '#127E90' });
        [l1, l2, l3, l4].forEach((l, i) => tl.at(stage.appendChild(l.el), 1 + i * .5, { from: 'left' }));
        const real = P.box({ x: 60, y: 450, w: 600, h: 230, label: '진짜 글은 영어예요', sub: 'from { transform: translateX(-300px) }<br>to { transform: translateX(0) }<br>animation: 1s ease-out', accent: 'aqua' });
        tl.at(stage.appendChild(real.el), 8.4, { from: 'up' });
        const can = P.chip({ x: 60, y: 720, text: '손은 없어도 글은 써요', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(can.el), 17.4, { from: 'pop' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 25); } };
      }
    },
    {
      title: '글이 영상이 되기까지', dur: 26,
      captions: [
        { t: 0, text: '글만 있으면 아직 영상이 아니에요. 그림으로 바꿔 줄 일꾼이 필요해요. 첫 일꾼은 브라우저예요.' },
        { t: 8, text: '브라우저가 글대로 한 장씩 그리면, 그 화면을 1초에 30번 사진으로 찍어요. 그림 30장이 생겨요.' },
        { t: 17, text: '마지막 일꾼 FFmpeg가 그림 30장을 한 줄로 묶어 mp4로 만들어요. 클로드는 이 세 일꾼에게 글로 부탁만 해요.' }
      ],
      build({ stage, lines, P, tl }) {
        const s1 = P.box({ x: 60, y: 110, w: 600, h: 150, label: '1 · 글', sub: '처음 그림, 끝 그림, 시간, 속도표', accent: 'aqua', icon: P.ICON.doc });
        const s2 = P.box({ x: 60, y: 320, w: 600, h: 150, label: '2 · 브라우저가 그려요', sub: '글대로 화면을 그리고 1초에 30번 찍어요', accent: 'aqua', icon: P.ICON.eye });
        const s3 = P.box({ x: 60, y: 530, w: 600, h: 150, label: '3 · FFmpeg가 묶어요', sub: '그림 30장을 한 줄로 이어 mp4', accent: 'orange', icon: P.ICON.video });
        tl.at(stage.appendChild(s1.el), .3, { from: 'up' });
        tl.at(stage.appendChild(s2.el), 8.3, { from: 'up' });
        tl.at(stage.appendChild(s3.el), 17.3, { from: 'up' });
        const a1 = P.arrow(lines, { x1: 360, y1: 262, x2: 360, y2: 318, width: 4, color: '#127E90' });
        const a2 = P.arrow(lines, { x1: 360, y1: 472, x2: 360, y2: 528, width: 4, color: '#F2812D' });
        const role = P.text({ x: 60, y: 720, w: 600, text: '클로드는 세 일꾼에게 글로 부탁만 해요', size: 26, weight: 800, align: 'center' });
        tl.at(stage.appendChild(role.el), 21, { from: 'up' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'point' });
        stage.append(q.el);
        return {
          tick(t) {
            q.tick(t, t < 25);
            a1.draw(P.clamp((t - 8) / .6, 0, 1));
            a2.draw(P.clamp((t - 17) / .6, 0, 1));
          }
        };
      }
    },
    {
      title: '교실에서 시킬 때는', dur: 24,
      captions: [
        { t: 0, text: '이제 부탁하는 말이 달라져요. "처음엔 어디, 끝엔 어디, 몇 초, 어떤 속도표." 이 네 가지만 적어 주면 돼요.' },
        { t: 9, text: '확인은 중간 그림을 몇 장 뽑아 보는 걸로 해요. 0.5초 자리에 글자가 어디쯤 있는지 보면 속도표가 맞았는지 알아요.' },
        { t: 18, text: '학생들과는 공 굴리기로 속도표를 몸으로 먼저 느껴 보고, 그다음에 글로 적어 보세요.' }
      ],
      build({ stage, lines, P, tl }) {
        const items = [['처음엔 어디', '왼쪽 밖'], ['끝엔 어디', '가운데'], ['몇 초', '1초'], ['어떤 속도표', '천천히 멈춤']].map(([k, v], i) => {
          const b = P.box({ x: 60, y: 110 + i * 130, w: 600, h: 110, label: k, sub: v, accent: i === 3 ? 'orange' : 'aqua' });
          tl.at(stage.appendChild(b.el), .3 + i * .5, { from: 'up' }); return b;
        });
        const check = P.chip({ x: 60, y: 660, text: '확인은 중간 그림 몇 장으로', color: 'aqua', size: 24 });
        tl.at(stage.appendChild(check.el), 9.4, { from: 'pop' });
        const play = P.text({ x: 60, y: 730, w: 600, text: '공 굴리기로 먼저 느끼고, 글로 적기', size: 26, weight: 800, align: 'center' });
        tl.at(stage.appendChild(play.el), 18.3, { from: 'up' });
        const q = P.quokka({ x: 400, y: 900, size: 340, pose: 'wave' });
        stage.append(q.el);
        return { tick(t) { q.tick(t, t < 23); items.forEach((b, i) => b.on(t > .3 + i * .5)); } };
      }
    }
  ],

  interaction: {
    title: '처음 그림, 끝 그림',
    desc: '글자가 어디서 출발해 어디서 멈출지, 몇 초 동안 갈지 고르고 속도표를 눌러 보세요. 아래 표에는 0초·0.25초·0.5초·0.75초·1초에 글자가 어디 있는지 숫자로 나와요. 거리와 시간이 같아도 속도표에 따라 중간 숫자가 달라져요.',
    mount(el, P) {
      const POS = { '왼쪽 밖': -100, '왼쪽': -50, '가운데': 0, '오른쪽': 50 };
      const EASE = {
        linear: p => p,
        'ease-out': p => 1 - Math.pow(1 - p, 3),
        'ease-in': p => p * p * p,
        'ease-in-out': p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
      };
      const KO = { linear: '똑같은 속도', 'ease-out': '천천히 멈춤', 'ease-in': '천천히 출발', 'ease-in-out': '양쪽 다 천천히' };
      let start = '왼쪽 밖', end = '가운데', dur = 1, ease = null, run = 0;

      const sel = (id, opts, cur, on) => {
        const s = P.h('select', { id, class: 'sim-mc-sel' }, opts.map(o => P.h('option', { value: o, selected: o === cur ? '' : null }, o)));
        s.addEventListener('change', () => on(s.value)); return s;
      };
      const sStart = sel('sim-mc-start', Object.keys(POS), start, v => { start = v; draw(); });
      const sEnd = sel('sim-mc-end', Object.keys(POS), end, v => { end = v; draw(); });
      const sDur = sel('sim-mc-dur', ['0.5초', '1초', '2초'], '1초', v => { dur = parseFloat(v); draw(); });
      const bLinear = P.h('button', { class: 'btn primary', type: 'button' }, '똑같은 속도로 보기');
      const bOut = P.h('button', { class: 'btn', type: 'button' }, '천천히 멈추기');
      const bIn = P.h('button', { class: 'btn', type: 'button' }, '천천히 출발하기');
      const bBoth = P.h('button', { class: 'btn', type: 'button' }, '양쪽 다 천천히');
      const lane = P.h('div', { class: 'sim-mc-lane' });
      const word = P.h('div', { class: 'sim-mc-word' }, '2026 가을 체육대회');
      lane.append(word);
      const tbl = P.h('table', { class: 'sim-mc-tbl' });
      const note = P.h('p', { class: 'sim-mc-note' }, '속도표를 누르면 글자가 움직이고, 표의 중간 숫자가 바뀌어요.');
      const code = P.h('pre', { class: 'sim-mc-code' });

      el.append(
        P.h('style', {}, `
          .sim-mc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
          .sim-mc-row label{font-size:13px;font-weight:700;color:#4E5968}
          .sim-mc-sel{height:36px;border:1px solid #E5E8EB;border-radius:10px;padding:0 10px;font:inherit;font-weight:600;max-width:100%}
          .sim-mc-lane{position:relative;height:84px;border-radius:14px;background:#F2F4F6;overflow:hidden;margin:10px 0}
          .sim-mc-word{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-weight:800;font-size:clamp(16px,4vw,24px);color:#127E90;white-space:nowrap;will-change:transform}
          .sim-mc-tbl{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
          .sim-mc-tbl th,.sim-mc-tbl td{border-bottom:1px solid #E5E8EB;padding:6px 4px;text-align:center}
          .sim-mc-tbl th{color:#8B95A1;font-weight:700}
          .sim-mc-tbl td.sim-mc-mid{color:#F2812D;font-weight:800}
          .sim-mc-code{margin-top:10px;background:#1B1F24;color:#fff;border-radius:12px;padding:12px;font-size:12.5px;line-height:1.6;white-space:pre-wrap;word-break:break-all}
          .sim-mc-note{font-size:13px;color:#4E5968;margin-top:8px}
        `),
        P.h('div', { class: 'sim-mc-row' }, P.h('label', { for: 'sim-mc-start' }, '처음'), sStart, P.h('label', { for: 'sim-mc-end' }, '끝'), sEnd, P.h('label', { for: 'sim-mc-dur' }, '시간'), sDur),
        P.h('div', { class: 'sim-mc-row' }, bLinear, bOut, bIn, bBoth),
        lane, tbl, code, note
      );

      function pct(v) { return v; } /* 위치 값은 글자 폭 기준 퍼센트 */
      function place(p) {
        const a = POS[start], b = POS[end];
        const x = a + (b - a) * p;
        word.style.transform = `translate(calc(-50% + ${x}%), -50%)`;
      }
      function draw() {
        const fn = ease ? EASE[ease] : null;
        const a = POS[start], b = POS[end];
        const rows = [0, .25, .5, .75, 1].map(p => {
          const v = fn ? fn(p) : p;
          return { t: (p * dur).toFixed(2).replace(/\.?0+$/, ''), prog: fn ? v : p, pos: a + (b - a) * (fn ? v : p) };
        });
        tbl.innerHTML = '';
        tbl.append(P.h('tr', {}, P.h('th', {}, '시간(초)'), ...rows.map(r => P.h('th', {}, r.t))));
        tbl.append(P.h('tr', {}, P.h('td', {}, '진행도'), ...rows.map((r, i) => P.h('td', { class: i === 2 ? 'sim-mc-mid' : '' }, r.prog.toFixed(2)))));
        tbl.append(P.h('tr', {}, P.h('td', {}, '위치'), ...rows.map((r, i) => P.h('td', { class: i === 2 ? 'sim-mc-mid' : '' }, (r.pos > 0 ? '+' : '') + Math.round(r.pos)))));
        code.textContent = ease
          ? `처음 { 위치 ${a} }\n끝 { 위치 ${b} }\n시간 ${dur}초\n속도표 ${ease} (${KO[ease]})`
          : `처음 { 위치 ${a} }\n끝 { 위치 ${b} }\n시간 ${dur}초\n속도표 (아직 안 골랐어요)`;
        place(ease ? 1 : 0);
      }
      function play(kind) {
        ease = kind; run += 1; const my = run; draw();
        const fn = EASE[kind]; const t0 = performance.now();
        const step = now => {
          if (my !== run) return;
          const p = Math.min(1, (now - t0) / (dur * 1000));
          place(fn(p));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        [bLinear, bOut, bIn, bBoth].forEach(b => b.setAttribute('aria-pressed', 'false'));
        ({ linear: bLinear, 'ease-out': bOut, 'ease-in': bIn, 'ease-in-out': bBoth })[kind].setAttribute('aria-pressed', 'true');
        note.textContent = `${KO[kind]}: 0.5초 자리의 위치가 ${Math.round(POS[start] + (POS[end] - POS[start]) * fn(.5))}예요. 거리와 시간은 그대로예요.`;
      }
      bLinear.addEventListener('click', () => play('linear'));
      bOut.addEventListener('click', () => play('ease-out'));
      bIn.addEventListener('click', () => play('ease-in'));
      bBoth.addEventListener('click', () => play('ease-in-out'));
      draw();
    }
  },

  teacherLines: [
    '움직임은 <b>처음 그림과 끝 그림</b>만 정하면 돼요. 사이는 컴퓨터가 계산해서 채워요.',
    '같은 거리, 같은 시간이어도 <b>속도표</b>가 다르면 느낌이 달라져요. 천천히 멈추는 쪽이 더 자연스러워요.'
  ],
  tip: {
    body: '클로드에게 모션그래픽을 시킬 때는 네 가지를 한 줄에 적어 주세요. 처음 위치, 끝 위치, 시간, 속도표. 예: "제목이 왼쪽 밖에서 가운데로, 1초 동안, 천천히 멈추게." 그러면 되묻는 일이 줄고 한 번에 비슷하게 나와요.',
    extra: '결과 확인은 영상을 다 보는 대신 0.25초·0.5초·0.75초 자리의 그림 세 장을 뽑아 달라고 하세요. 0.5초 그림에서 글자가 중간보다 오른쪽에 있으면 천천히 멈추는 속도표가 들어간 거예요.'
  },
  myth: {
    myth: '클로드는 손이 없으니 모션그래픽처럼 움직이는 건 못 만든다.',
    fact: '움직임을 글로 적는 방식이 있어서 만들 수 있어요. 처음 그림과 끝 그림, 시간, 속도표를 적으면 브라우저가 그림을 그리고 FFmpeg가 영상으로 묶어요. 다만 결과를 눈으로 보는 건 사람 몫이에요.'
  },
  sources: [
    { title: 'W3C, CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/', note: '이징(속도표)의 표준 정의. linear·ease-in·ease-out·ease-in-out 이름이 여기서 정해져요.' },
    { title: 'MDN, Web Animations API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API', note: '키프레임과 타이밍을 글(코드)로 적어 브라우저가 움직임을 만드는 방식 설명.' },
    { title: 'Remotion 공식 문서, The fundamentals', url: 'https://www.remotion.dev/docs/the-fundamentals', note: '코드로 적은 화면을 프레임마다 그려 영상으로 만드는 도구의 기본 개념.' },
    { title: 'FFmpeg 공식 문서', url: 'https://ffmpeg.org/ffmpeg.html', note: '그림 묶음을 영상 파일로 만들고 자르는 명령줄 도구의 설명서.' }
  ],
  script: `체육대회 영상 맨 앞에 제목 글자가 미끄러져 들어오게 해 달라고 해 볼게요. 클로드에겐 마우스를 잡을 손이 없는데, 결과물은 나와요. 손 대신 글로 움직임을 적기 때문이에요.

1초짜리 움직임은 그림 30장이에요. 그중 사람이 정하는 건 처음 그림과 끝 그림, 두 장뿐이에요. 이걸 키프레임이라고 불러요. 사이 28장은 컴퓨터가 처음과 끝 사이를 재서 채워요. 0.5초면 딱 중간, 이렇게요.

그런데 똑같은 속도로 오면 어색해요. 빠르게 오다가 천천히 멈추는 쪽이 자연스럽죠. 이 속도 나누기를 적은 표가 이징, 우리말로 속도표예요. 글 한 단어로 느낌이 바뀌어요.

이 네 줄을 적으면 브라우저가 그림을 그리고, FFmpeg가 그림을 묶어 영상으로 만들어요. 교실에서 시킬 때는 처음 위치, 끝 위치, 시간, 속도표 네 가지를 적어 주고, 중간 그림 몇 장으로 확인하면 돼요.`
};
