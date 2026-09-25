/* 브라우저 음성 합성(ko-KR). 선택 기능이에요. 외부 API를 쓰지 않아요. */
const KEY = 'act_voice';
let enabled = false;
let voice = null;
const ok = typeof window !== 'undefined' && 'speechSynthesis' in window;

function pickVoice() {
  if (!ok) return null;
  const vs = speechSynthesis.getVoices();
  return vs.find(v => /ko[-_]KR/i.test(v.lang) && /Google|Microsoft|Yuna|Heami|SunHi/i.test(v.name))
    || vs.find(v => /ko/i.test(v.lang)) || null;
}
if (ok) { voice = pickVoice(); speechSynthesis.addEventListener?.('voiceschanged', () => { voice = pickVoice(); }); }

export const tts = {
  supported: ok,
  get enabled() { return enabled; },
  init() { try { enabled = localStorage.getItem(KEY) === '1'; } catch (e) { enabled = false; } return enabled; },
  set(v) { enabled = !!v && ok; try { localStorage.setItem(KEY, enabled ? '1' : '0'); } catch (e) { } if (!enabled) this.stop(); return enabled; },
  toggle() { return this.set(!enabled); },
  speak(txt) {
    if (!enabled || !ok || !txt) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt.replace(/<[^>]+>/g, ''));
    u.lang = 'ko-KR'; u.rate = 1.05; u.pitch = 1.05;
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  },
  stop() { if (ok) speechSynthesis.cancel(); }
};
