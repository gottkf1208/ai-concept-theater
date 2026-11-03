#!/bin/bash
# 날짜별 발행 폴더 묶기. 사용: bash test/date-pack.sh
# 06_날짜별_발행/YYYY-MM-DD_E번호_제목/ 에 포스팅·인포그래픽·썸네일·자막·(E78) 캡처·무음마스터를 모은다.
OUT="${OUT:-C:/Users/dumok/Downloads/AI개념극장_통합(1005)}"
D="$OUT/06_날짜별_발행"; mkdir -p "$D"
pack() { # date ep slug
  local date=$1 ep=$2 slug=$3
  local th=$(ls "$OUT/01_썸네일/youtube" | grep "^${ep}_" | head -1); local title="${th#*_S8_}"; title="${title%.png}"
  local dst="$D/${date}_${ep}_${title}"; mkdir -p "$dst/썸네일" "$dst/자막"
  local src="$OUT/03_블로그_포스팅/${ep}_${slug}"
  cp "$src/포스팅.txt" "$dst/블로그_포스팅.txt"
  for i in 1 2 3 4; do [ -f "$src/인포그래픽_$i.png" ] && cp "$src/인포그래픽_$i.png" "$dst/인포그래픽_$i.png"; done
  for f in "$src"/캡처_*; do [ -f "$f" ] && cp "$f" "$dst/"; done
  for k in youtube instagram-feed instagram-reels; do cp "$OUT/01_썸네일/$k/$th" "$dst/썸네일/${k}_${title}.png"; done
  cp "$OUT/04_자막/srt/${th%.png}.srt" "$dst/자막/"; cp "$OUT/04_자막/txt/${th%.png}.txt" "$dst/자막/" 2>/dev/null
  for f in "$OUT/05_영상_무음마스터/${ep}_"*; do [ -f "$f" ] && cp "$f" "$dst/"; done
  printf '%s %s %s\n세로: https://gottkf1208.github.io/ai-concept-theater/watch.html?ep=%s&solo=1\n가로(유튜브): https://gottkf1208.github.io/ai-concept-theater/watch.html?ep=%s&solo=1&fmt=wide\n' "$date" "$ep" "$title" "$slug" "$slug" > "$dst/링크.txt"
  echo "$dst"; ls "$dst"
}
pack 2026-10-11 E76 v8-motion-code
pack 2026-10-20 E77 v8-inclusive-ai
pack 2026-11-01 E78 v8-php2shell
