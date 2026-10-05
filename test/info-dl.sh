#!/bin/bash
# usage: info-dl.sh E03_v1-prompt-parts url1 url2 url3 url4  → 인포그래픽_1..4.png 저장 + 컨택트시트
D="${OUT:-C:/Users/dumok/Downloads/AI개념극장업데이트(1002)}/03_블로그_포스팅/$1"; shift; i=1
for u in "$@"; do curl -s -o "$D/인포그래픽_$i.png" "$u"; i=$((i+1)); done
ls -la "$D"/*.png | awk '{print $5, $9}'
cd /c/Users/dumok/dev/ai-concept-theater && node -e '
const sharp=require("sharp");const d=process.argv[1]+"/";
(async()=>{const imgs=[];for(let i=1;i<=4;i++){imgs.push(await sharp(d+`인포그래픽_${i}.png`).resize(800).toBuffer());}
const comp=imgs.map((b,i)=>({input:b,top:Math.floor(i/2)*460,left:(i%2)*810}));
await sharp({create:{width:1620,height:920,channels:3,background:"#fff"}}).composite(comp).png().toFile("test/shots/info-"+process.argv[2]+".png");console.log("sheet test/shots/info-"+process.argv[2]+".png")})()' "$D" "${D##*/}"
