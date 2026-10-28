// Usage: node render.js [output.mp4] [config.js] [page.html]
// Stock videos: node render.js out.mp4 config.js stock/index.html  (config path is relative to the page)
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");

const FPS = 30, out = path.resolve(process.argv[2] || "output.mp4");
const cfg = process.argv[3] || "config.js", html = process.argv[4] || "index.html", frames = path.join(__dirname, ".frames");

(async () => {
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.addInitScript(() => { window.RENDER_MODE = true; });
  await page.goto("file://" + path.resolve(__dirname, html) + "?config=" + encodeURIComponent(cfg));
  await page.evaluate(() => document.fonts.ready);
  const { duration, audio } = await page.evaluate(() => ({ duration: window.DURATION, audio: window.CONFIG.audio }));
  const total = Math.ceil(duration * FPS);
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => render(t), i / FPS);
    await page.screenshot({ path: path.join(frames, String(i).padStart(5, "0") + ".png") });
    if (i % FPS === 0) process.stdout.write(`\rRendering ${i}/${total}`);
  }
  await browser.close();
  const args = ["-y", "-framerate", String(FPS), "-i", path.join(frames, "%05d.png")];
  if (audio) args.push("-i", path.resolve(__dirname, path.dirname(html), audio), "-c:a", "aac", "-shortest");
  args.push("-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out);
  execFileSync("ffmpeg", args, { stdio: "ignore" });
  fs.rmSync(frames, { recursive: true, force: true });
  console.log(`\nDone: ${out} (${duration.toFixed(1)}s)`);
})();
