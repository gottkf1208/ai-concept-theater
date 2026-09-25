/* N5 [B] 말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리: 바이브코딩 (대본 초안) */
export default {
  slug: 'n5-vibecoding',
  track: 'B',
  title: '말로 만든 웹앱이 깃허브에 올라가 편집까지 되는 원리',
  subtitle: '바이브코딩',
  summary: '말 한마디로 만든 웹앱이 어떻게 깃허브에 저장되고, 화면에서 고친 글자가 모두에게 반영되는지 그 흐름을 짚어봐요.',
  keywords: ['바이브코딩', 'GitHub Pages', 'Contents API', '토큰', '정적 호스팅'],

  scenes: [],
  interaction: null,

  teacherLines: [
    '말로 만든 웹앱도 결국 <b>코드 파일</b>이 되어 저장소에 저장돼요.',
    '화면에서 글자를 고치면 <b>저장소의 파일이 바뀌고</b>, 잠시 뒤 모두에게 보여요.'
  ],
  tip: {
    body: '깃허브 토큰을 만들 때는 fine-grained 토큰을 쓰고, 꼭 필요한 저장소와 권한만 선택하세요. 오늘처럼 저장소를 선택하지 않으면 저장이 실패할 수 있어요.'
  },
  myth: {
    myth: '화면에서 글자를 고치면 그 자리에서 바로 저장된다.',
    fact: '실제로는 그 순간 깃허브 API로 파일(예: edits.json)을 저장하고, 정적 호스팅이 새 내용을 반영하는 데 1~2분 정도 걸릴 수 있어요(서비스마다 달라요).'
  },
  sources: [
    { title: 'GitHub Pages — 공식 문서', url: 'https://docs.github.com/en/pages', note: '저장소 내용을 그대로 인터넷에 띄우는 정적 호스팅 서비스.' },
    { title: 'GitHub REST API — Repository contents', url: 'https://docs.github.com/en/rest/repos/contents', note: '화면에서 고친 내용을 저장소 파일에 다시 저장할 때 쓰는 API.' },
    { title: 'Managing your personal access tokens (fine-grained)', url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens', note: '저장소·권한 범위를 좁게 설정하는 fine-grained 토큰 안내.' }
  ],
  script: `말 한마디로 웹앱을 만들었는데, 그게 어떻게 깃허브에 올라가고 화면에서 편집까지 될까요. 순서를 따라가 볼게요.

먼저 말이 코드(HTML, JS 파일)로 바뀌고, 그 코드가 깃허브라는 저장소에 저장돼요. 그다음 깃허브 페이지스라는 서비스가 그 저장소 내용을 그대로 인터넷에 띄워요. 그래서 별도의 서버 없이도 누구나 그 주소로 들어갈 수 있어요.

화면에서 글자를 고치는 것도 원리는 비슷해요. 고친 내용을 깃허브 API로 저장소의 파일(예: edits.json)에 다시 저장해요. 그러면 1~2분 뒤 모두에게 바뀐 내용이 보여요.

이때 쓰는 접근 토큰은 fine-grained 방식으로, 저장소와 권한을 좁게 선택해야 해요. 오늘 처음에 저장소를 고르지 않아서 저장이 안 됐던 것도 이 때문이었어요.`,

  draftScenes: [
    '출발: "말 한 줄"이 프롬프트 말풍선으로 들어오는 장면',
    '변환: 말 → 코드(HTML/JS) → 저장소(GitHub)로 이어지는 파이프라인',
    '호스팅: GitHub Pages가 저장소 내용을 그대로 화면에 띄우는 원리',
    '편집 흐름: 화면에서 글자 고치기 → Contents API로 edits.json 저장 → 1~2분 뒤 반영',
    '주의점: fine-grained 토큰에서 저장소를 선택하지 않아 실패했던 오늘의 사례로 마무리'
  ]
};
