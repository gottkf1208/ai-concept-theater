# 새 에피소드 만들기

연구회 선생님이 대본 파일 하나로 한 편을 추가하는 방법이에요. 코딩이 낯설면 AI(Claude, ChatGPT)에게 이 문서와 `episodes/e1-agent-mcp.js`를 주고 "이 규격대로 ○○ 편을 써 줘"라고 해도 돼요.

## 3단계

1. `episodes/` 에 `{slug}.js` 파일을 만들어요(아래 템플릿).
2. `engine/registry.js` 의 `EPISODES` 배열에 한 줄 추가해요.
   ```js
   { no: 13, slug: 'e7-my-topic', file: 'episodes/e7-my-topic.js', status: 'ready' },
   ```
   대본만 있고 아직 완성이 아니면 `status: 'soon'`으로 두면 목록에 '준비 중'으로 나와요.
3. 로컬 서버로 열어 확인하고(`npx -y http-server . -p 5310 -c-1`), `SLUGS=e7-my-topic node test/run.mjs`로 검사해요.

## 한 편의 규격(약 3분)

1. 1분 애니메이션: 5장면 안팎, 합계 60~70초. 자막 항상 켜짐.
2. 직접 만져 보기 1개: 브라우저 안에서만 도는 결정적 시뮬레이션. 외부 API 없음.
3. 학생에게는 이렇게 말해요: 1~2문장
4. 업무·수업에서는 이렇게: 팁 하나
5. 흔한 오해: 오해 → 실제
6. 더 깊이: 1차 자료 2~4개(공식 문서, 원 논문, 표준 문서 우선)
7. 강사 대본: 1분 분량(350~450자)

부품(P) API와 화면 원칙은 [EPISODE_SPEC.md](EPISODE_SPEC.md)에 있어요.

## 템플릿

```js
/* E7 [A|B] 제목: 부제 */
export default {
  slug: 'e7-my-topic',
  track: 'A',                    // A: AI 영상을 만들다 생기는 "왜?", B: 요즘 AI 필수 개념
  title: '질문형 제목',
  subtitle: '개념 이름',
  summary: '목록 카드에 보일 한두 문장.',
  keywords: ['검색어', '키워드'],

  scenes: [
    {
      title: '장면 제목', dur: 13,
      captions: [
        { t: 0, text: '첫 자막. <em>강조</em>는 이렇게.' },
        { t: 6, text: '두 번째 자막.' }
      ],
      build({ stage, lines, P, tl }) {
        const q = P.quokka({ x: 60, y: 330, size: 340, pose: 'base' });
        stage.append(q.el);
        const b = P.bubble({ x: 320, y: 200, w: 480, text: '말풍선 <b>강조</b>' });
        tl.at(stage.appendChild(b.el), .5, { from: 'left' });          // 0.5초에 나타나요
        const box = P.box({ x: 820, y: 200, w: 300, h: 110, label: '상자', sub: '설명', accent: 'aqua' });
        tl.at(stage.appendChild(box.el), 2, { from: 'pop' });
        const ar = P.arrow(lines, { x1: 800, y1: 255, x2: 820, y2: 255 });
        return {
          tick(t) {                                                    // t = 장면 안 시간(초)
            q.tick(t, t < 6);                                          // 두 번째 인자: 말하는 중
            ar.draw(P.clamp((t - 1.5) / .6, 0, 1));
          }
        };
      }
    }
    // 장면을 4개쯤 더
  ],

  interaction: {
    title: '만져 보기 제목',
    desc: '무엇을 해 보면 되는지 한두 문장.',
    mount(el, P) {
      const out = P.h('p', {}, '결과가 여기 나와요');
      const btn = P.h('button', { class: 'btn primary', type: 'button' }, '해 보기');
      btn.addEventListener('click', () => { out.textContent = '바뀌었어요'; });
      el.append(btn, out);
    }
  },

  teacherLines: ['학생에게 그대로 말할 문장 1.', '문장 2.'],
  tip: { body: '업무·수업 팁 하나.', extra: '(선택) 덧붙임' },
  myth: { myth: '흔한 오해', fact: '실제로는 이래요.' },
  sources: [
    { title: '자료 제목 — 기관/저자, 연도', url: 'https://…', note: '어떤 근거인지 한 줄' }
  ],
  script: `
강사 대본. 문단 3~4개, 해요체, 1분 분량.
`
};
```

## 글쓰기 규칙

- 해요체. 옆자리 동료 교사가 설명해 주는 톤("~더라고요", "~해 보세요").
- 전문 용어는 처음 나올 때 한 번 풀어 주세요.
- 확실하지 않으면 단정하지 말고 "도구마다 달라요"처럼 범위를 밝히세요.
- 이모지 남발, 원색 그라데이션, 형광 네온, 카드 속 카드 겹치기는 피해요.
- 숫자·날짜·고유명사는 1차 출처로 확인하고 `sources`에 넣어요. 링크가 열리는지 `node test/links.mjs`로 확인해요.

## 이미지를 쓰고 싶다면

- 쿼카 포즈나 키비주얼을 새로 만들었다면 `assets/char/`, `assets/key/`에 넣고 `assets/manifest.js`에 이름을 추가해요. 프롬프트 세트는 [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md)에 있어요.
- 새 편에 전용 의상을 입히려면: `assets/key/{slug}.webp`(기본 포즈)와 `assets/char/{slug}/{pose}.webp`(point·think·oops·wave 등)를 넣고 manifest의 `key`와 `outfits`에 등록해요. 없는 포즈는 자동으로 기본 포즈 → 공용 포즈 순서로 대체돼요.
- AI로 만든 이미지는 [CREDITS.md](CREDITS.md)에 'AI 생성'으로 한 줄 적어 주세요.
- 캐릭터는 쿼카연구회 오리지널 쿼카만 써요. 유명 캐릭터를 닮게 만들지 않아요.

## 보내는 법

GitHub에서 저장소를 fork → 파일 추가 → Pull Request. 또는 파일을 연구회 단톡방에 올려 주시면 두목쿼카가 올릴게요.
