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

## "If you invested $100 every month" stock videos
Animated DCA chart (portfolio value vs. total invested, month counter, stat cards) for any stock, in `stock/`.
1. Download monthly (or daily) price history as CSV, e.g. Yahoo Finance → Historical Data → Download.
   With an `Adj Close` column, dividends count as reinvested.
2. `node stock/prep.js SAHOL.IS.csv stock/sahol.js`
3. Edit `stock/config.js`: `name`, `ticker`, `exchange`, `data: "sahol.js"`, `monthly`, `start`, `handle`.
   For Turkish labels use `stock/config.tr.js` (or copy its `text` block for any language).
4. Preview: open `stock/index.html` (or `stock/index.html?config=config.tr.js`).
5. Render: `node render.js sahol.mp4 config.js stock/index.html`

`stock/demo-data.js` holds made-up prices so the template runs as-is; don't publish it as real data.
Returns are in the price's own currency: use USD-priced data (or convert first) if you want USD results.
