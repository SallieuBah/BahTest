# Notebook-style explainer video template

Makes 1080×1920 (9:16) Reels/TikTok/Shorts videos: graph-paper background, title question,
label boxes, notebook source cards, self-drawing connector lines, and word-by-word captions
with a yellow highlighter.

## Make a new video
1. Edit `config.js` (title, labels, cards, links, captions, timings).
2. Preview: open `index.html` in a browser (it loops).
3. Render: `node render.js my-video.mp4`

Needs Node, Playwright (`npm i playwright`) and ffmpeg.

## Tips
- Record your voiceover first, then set each caption's `start`/`end` to match it.
- Put the voiceover in this folder and set `audio: "voice.mp3"` to merge it, or add it later in CapCut.
- `hl` words must match exactly as written in the caption text (including punctuation).
- Icons available: `ear`, `book`, `scale`, `mosque`, or `null`.

## Multi-scene videos with an automatic voiceover
See `motors.js`: a `scenes` array where each scene has its own board and `narration` sentences.
- `*word*` highlights a word in the captions.
- `{shown|spoken}` shows one text but speaks another, e.g. `{75 kW|seventy-five kilowatts}`.

```
pip install piper-tts        # offline neural TTS
node narrate.js motors.js path/to/en-us-ryan-high.onnx   # makes motors.voice.wav + motors.timings.js
node render.js motors.mp4 motors.js
```
Voices: https://github.com/rhasspy/piper/releases/tag/v0.0.2 (e.g. voice-en-us-ryan-high.tar.gz).
Preview a config in the browser with `index.html?config=motors.js`.

## Animated data-chart videos (any topic)
`chart/index.html` turns numbers into a Shorts-style video: big title, a counter (month/year), lines that draw
themselves with a rescaling axis, 4 stat cards and an optional extra row. Each video is one config file:

| Preset | What it shows |
|---|---|
| `chart/stock.js` | "If you invested $100 every month" in a stock (prices from a CSV, see below) |
| `chart/savings.js` | Compound interest vs. cash under the mattress |
| `chart/habit.js` | What a daily habit costs, vs. investing that money |
| `chart/custom.js` | Blank starter: paste your own numbers for any topic |

Make a new one: copy a preset, then edit
- `title`, `tags`, `subtitle`, `footer` (always cite your source), `handle`
- `rows`: `[{ label, key1: number, key2: number }]`, or a function that computes them
- `series`: which keys to draw (first is the glowing main line; `fill: true` adds the gradient)
- `cards` / `extra`: `{ label, value: cur => number, format: "money" | "percent" | "number" | {prefix, suffix, decimals}, sign }`
  (`cur` holds the current, smoothly interpolated value of every key, plus `index`)
- `pointsPerSecond`, `hold`, `axis`, `currency`, `locale` (e.g. `"tr-TR"`), optional `period(label)` / `tick(row)`

Preview: open `chart/index.html?config=savings.js`. Render: `node render.js savings.mp4 savings.js chart/index.html`

Stock data: download price history as CSV (e.g. Yahoo Finance → Historical Data; `Adj Close` = dividends reinvested),
run `node chart/prep.js SAHOL.IS.csv chart/sahol.js`, and set `scripts: ["sahol.js"]` in `chart/stock.js`.
`chart/demo-prices.js` is made-up data so the preset runs as-is; don't publish it as real.
Returns are in the price's own currency.
