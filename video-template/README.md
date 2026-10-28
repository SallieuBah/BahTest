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
