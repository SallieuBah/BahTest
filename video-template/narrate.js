// Usage: node narrate.js <config.js> <piper-voice.onnx>
// Speaks every scene's `narration` sentences with Piper, then writes the voiceover WAV and a
// timings file so scenes and captions line up with the voice. Wrap words in *stars* to highlight them.
const fs = require("fs"), path = require("path"), vm = require("vm");
const { execFileSync } = require("child_process");

const cfgFile = path.resolve(process.argv[2] || "config.js"), voice = process.argv[3];
const sandbox = { window: {} }; vm.runInNewContext(fs.readFileSync(cfgFile, "utf8"), sandbox);
const C = sandbox.window.CONFIG, base = path.basename(cfgFile, ".js");
const tmp = path.join(__dirname, ".voice"); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp);

const RATE = 22050, LEAD = 0.8, GAP = 0.35, SCENE_GAP = 0.9, TAIL = 2.0, WORDS_PER_CAPTION = 7;
const dur = f => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
const silence = (s, name) => { const f = path.join(tmp, name); execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `anullsrc=r=${RATE}:cl=mono`, "-t", s.toFixed(3), f]); return f; };

const parts = [], timings = { scenes: [] };
let t = 0, n = 0;
C.scenes.forEach((S, si) => {
  const scene = { start: t, captions: [] };
  parts.push(silence(LEAD, `s${si}.wav`)); t += LEAD;
  S.narration.forEach((raw, li) => {
    let line = raw;
    // {shown|spoken} lets captions show "75 kW" while the voice says "seventy-five kilowatts"
    const spoken = line.replace(/\{([^|}]*)\|([^}]*)\}/g, "$2").replace(/\*/g, "");
    line = line.replace(/\{([^|}]*)\|([^}]*)\}/g, "$1");
    const f = path.join(tmp, `n${n++}.wav`);
    execFileSync("piper", ["-m", voice, "-f", f, "--length_scale", String(C.voiceSpeed || 1.0), "--sentence_silence", "0"], { input: spoken, stdio: ["pipe", "ignore", "ignore"] });
    const d = dur(f); parts.push(f);
    // Split the sentence into caption chunks timed by character share
    const words = line.split(/\s+/), chunks = [];
    for (let i = 0; i < words.length; i += WORDS_PER_CAPTION) chunks.push(words.slice(i, i + WORDS_PER_CAPTION));
    if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) chunks[chunks.length - 2].push(...chunks.pop());
    const total = line.length; let ct = t;
    chunks.forEach(ws => {
      const text = ws.join(" "), cd = d * (text.length + 1) / (total + 1);
      scene.captions.push({ start: ct, end: ct + cd, text: text.replace(/\*/g, ""), hl: ws.filter(w => w.includes("*")).map(w => w.replace(/\*/g, "")) });
      ct += cd;
    });
    t += d;
    const pause = li < S.narration.length - 1 ? GAP : (si < C.scenes.length - 1 ? SCENE_GAP : TAIL);
    parts.push(silence(pause, `p${n}.wav`)); t += pause;
  });
  scene.end = t; timings.scenes.push(scene);
});

const list = path.join(tmp, "list.txt");
fs.writeFileSync(list, parts.map(p => `file '${p}'`).join("\n"));
const wav = path.join(__dirname, `${base}.voice.wav`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", list, "-ar", String(RATE), "-ac", "1", wav]);
fs.writeFileSync(path.join(__dirname, `${base}.timings.js`), "window.TIMINGS = " + JSON.stringify(timings, null, 1) + ";\n");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Voice: ${wav} (${t.toFixed(1)}s), timings: ${base}.timings.js`);
