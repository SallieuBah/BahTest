// Renders CONFIG (single board or multiple `scenes`) as a time-driven animation: render(t).
const C = window.CONFIG, NS = "http://www.w3.org/2000/svg", svg = document.getElementById("svg");
const el = (tag, attrs, parent = svg) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
const clamp = x => Math.max(0, Math.min(1, x)), ease = x => 1 - Math.pow(1 - clamp(x), 3);
document.getElementById("handle").textContent = C.handle || "";

const ICONS = {
  ear: '<path d="M-30 40 C-60 -20 -10 -70 30 -40 C60 -15 40 20 20 40 C5 55 15 75 -5 85 C-25 95 -40 80 -40 70" fill="none" stroke="#1d1d1d" stroke-width="7" stroke-linecap="round"/><path d="M65 -10 Q75 15 65 40 M85 -20 Q98 15 85 50 M105 -28 Q120 15 105 58" fill="none" stroke="#1d1d1d" stroke-width="4" stroke-linecap="round"/>',
  book: '<path d="M-95 -40 L0 -25 L95 -40 L95 50 L0 65 L-95 50 Z" fill="#2f5d46" stroke="#1d1d1d" stroke-width="5"/><path d="M-82 -48 L0 -33 L82 -48 L82 40 L0 55 L-82 40 Z" fill="#fff" stroke="#1d1d1d" stroke-width="4"/><path d="M0 -33 V55 M-65 -20 L-15 -12 M-65 0 L-15 8 M-65 20 L-15 28 M15 -12 L65 -20 M15 8 L65 0 M15 28 L65 20" stroke="#1d1d1d" stroke-width="3"/>',
  scale: '<path d="M0 -60 V60 M-40 60 H40 M-80 -40 H80 M-80 -40 L-105 15 H-55 Z M80 -40 L55 15 H105 Z" fill="none" stroke="#1d1d1d" stroke-width="6" stroke-linejoin="round"/>',
  mosque: '<path d="M-60 60 V0 Q0 -70 60 0 V60 Z M-100 60 V-50 M100 60 V-50 M-110 60 H110" fill="none" stroke="#1d1d1d" stroke-width="6" stroke-linejoin="round"/><path d="M-100 -50 L-100 -70 M100 -50 L100 -70" stroke="#1d1d1d" stroke-width="10" stroke-linecap="round"/>',
  bolt: '<path d="M15 -75 L-45 10 H0 L-15 75 L45 -10 H0 Z" fill="#f2c94c" stroke="#1d1d1d" stroke-width="6" stroke-linejoin="round"/>',
  motor: '<rect x="-80" y="-45" width="120" height="90" rx="12" fill="#2f5d46" stroke="#1d1d1d" stroke-width="6"/><path d="M-60 -45 V45 M-35 -45 V45 M-10 -45 V45 M15 -45 V45" stroke="#1d1d1d" stroke-width="3"/><rect x="40" y="-10" width="50" height="20" fill="#ccc" stroke="#1d1d1d" stroke-width="5"/><path d="M-70 45 L-80 65 H30 L20 45" fill="none" stroke="#1d1d1d" stroke-width="6" stroke-linejoin="round"/>',
  coin: '<ellipse cx="0" cy="25" rx="70" ry="22" fill="#f2c94c" stroke="#1d1d1d" stroke-width="5"/><path d="M-70 0 V25 M70 0 V25" stroke="#1d1d1d" stroke-width="5"/><ellipse cx="0" cy="0" rx="70" ry="22" fill="#f2c94c" stroke="#1d1d1d" stroke-width="5"/><ellipse cx="0" cy="-30" rx="70" ry="22" fill="#f7dc85" stroke="#1d1d1d" stroke-width="5"/><text x="0" y="-21" text-anchor="middle" font-family="Josefin Sans" font-weight="700" font-size="30" fill="#1d1d1d">€</text>',
  fire: '<path d="M0 70 C-55 70 -70 25 -45 -15 C-35 10 -20 10 -20 -5 C-25 -40 0 -60 10 -80 C20 -45 70 -20 60 25 C55 55 30 70 0 70 Z" fill="#e9825a" stroke="#1d1d1d" stroke-width="6" stroke-linejoin="round"/><path d="M0 70 C-20 70 -30 50 -15 25 C-5 40 10 30 5 10 C25 30 30 60 0 70 Z" fill="#f2c94c" stroke="#1d1d1d" stroke-width="4"/>',
  gauge: '<path d="M-90 40 A90 90 0 1 1 90 40" fill="none" stroke="#1d1d1d" stroke-width="7" stroke-linecap="round"/><path d="M-90 40 A90 90 0 0 1 -60 -35" fill="none" stroke="#e9825a" stroke-width="14"/><path d="M40 -45 A90 90 0 0 1 90 40" fill="none" stroke="#2f5d46" stroke-width="14"/><path d="M0 30 L55 -30" stroke="#1d1d1d" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="30" r="12" fill="#1d1d1d"/>',
  leaf: '<path d="M-60 60 C-80 -20 -10 -80 75 -70 C80 10 20 75 -60 60 Z" fill="#2f5d46" stroke="#1d1d1d" stroke-width="6"/><path d="M-60 60 C-20 20 20 -20 55 -50" fill="none" stroke="#f7f4ec" stroke-width="5" stroke-linecap="round"/>',
  fan: '<circle r="14" fill="#1d1d1d"/><path d="M0 -14 C-10 -60 30 -80 40 -50 C45 -30 20 -20 0 -14 Z M12 7 C55 20 55 65 25 65 C5 62 5 35 12 7 Z M-12 7 C-50 30 -85 5 -65 -18 C-50 -32 -30 -10 -12 7 Z" fill="#2f5d46" stroke="#1d1d1d" stroke-width="5"/>'
};

// Normalise to scenes, taking timings (from narrate.py) when present
const T = window.TIMINGS;
const scenes = (C.scenes || [{ title: C.title, labels: C.labels, cards: C.cards, links: C.links, captions: C.captions, boardStart: C.boardStart, step: C.step }])
  .map((s, i) => Object.assign({}, s, T ? { start: T.scenes[i].start, end: T.scenes[i].end, captions: T.scenes[i].captions } : {}));
scenes.forEach((s, i) => {
  if (s.start == null) s.start = 0;
  if (s.end == null) s.end = scenes[i + 1] ? scenes[i + 1].start : Math.max(...(s.captions || [{ end: 0 }]).map(c => c.end)) + 1.5;
});

const anims = [];
function buildScene(S) {
  const root = el("g", {}), A = []; S.root = root;
  const L = S.labels.length, N = S.cards.length, items = L + N + S.links.length;
  const step = S.step || Math.min(0.6, Math.max(0.25, (S.end - S.start) * 0.55 / items));
  let t0 = S.start + (S.boardStart ?? 0.6);
  const title = el("text", { x: 540, y: 300, "text-anchor": "middle", class: "title" }, root); title.textContent = S.title;
  const tw = title.getComputedTextLength(); if (tw > 980) title.style.fontSize = (66 * 980 / tw) + "px";
  A.push({ node: title, at: S.start + 0.05, kind: "fade" });

  const lw = Math.min(230, (1000 - (L - 1) * 18) / L), lgap = L > 1 ? (1000 - L * lw) / (L - 1) : 0;
  const labelPos = S.labels.map((txt, i) => {
    const x = L > 1 ? 40 + i * (lw + lgap) : 540 - lw / 2, g = el("g", {}, root);
    el("rect", { x: x + 4, y: 636, width: lw, height: 84, rx: 6, fill: "#2a2a2a", opacity: .85, filter: "url(#rough)" }, g);
    el("rect", { x, y: 630, width: lw, height: 84, rx: 6, fill: "#ece4d3", stroke: "#2a2a2a", "stroke-width": 4, filter: "url(#rough)" }, g);
    const tx = el("text", { x: x + lw / 2, y: 685, "text-anchor": "middle", class: "label" }, g); tx.textContent = txt;
    const w = tx.getComputedTextLength(); if (w > lw - 24) tx.style.fontSize = (34 * (lw - 24) / w) + "px";
    A.push({ node: g, at: t0 + i * step * .5, kind: "pop" });
    return { cx: x + lw / 2, y: 714 };
  });
  t0 += L * step * .5 + step;

  const cgap = 40, cw = (1040 - (N - 1) * cgap) / N, ctop = 850, ch = 690;
  const cardPos = S.cards.map((c, i) => {
    const x = 20 + i * (cw + cgap), g = el("g", {}, root);
    el("rect", { x: x + 6, y: ctop + 8, width: cw, height: ch, rx: 8, fill: "#e6e1d4" }, g);
    el("rect", { x, y: ctop, width: cw, height: ch, rx: 8, fill: "#fbfaf6", stroke: "#1d1d1d", "stroke-width": 5, filter: "url(#rough)" }, g);
    for (let y = ctop + 180; y < ctop + ch - 20; y += 90) el("line", { x1: x + 8, x2: x + cw - 8, y1: y, y2: y, stroke: "#dedad0", "stroke-width": 2 }, g);
    el("line", { x1: x + 75, x2: x + 75, y1: ctop + 8, y2: ctop + ch - 8, stroke: "#e8b7b7", "stroke-width": 2 }, g);
    const st = el("text", { x: x + cw / 2, y: ctop + 90, "text-anchor": "middle", class: "source" }, g); st.textContent = c.source;
    const sw = st.getComputedTextLength(); if (sw > cw - 60) st.style.fontSize = (32 * (cw - 60) / sw) + "px";
    el("path", { d: `M${x + 40} ${ctop + 115} Q${x + cw / 2} ${ctop + 110} ${x + cw - 40} ${ctop + 117}`, stroke: "#2f5d46", "stroke-width": 6, fill: "none", "stroke-linecap": "round" }, g);
    const lines = c.quote.split("\n"), qs = lines.map((ln, j) => { const q = el("text", { x: x + cw / 2 + 20, y: ctop + 245 + j * 90, "text-anchor": "middle", class: "quote" }, g); q.textContent = ln; return q; });
    const maxW = Math.max(...qs.map(q => q.getComputedTextLength())), qfs = Math.min(52, 52 * (cw - 120) / maxW);
    qs.forEach(q => q.style.fontSize = qfs + "px");
    if (c.icon && ICONS[c.icon]) { const ic = el("g", { transform: `translate(${x + cw / 2 + 20} ${ctop + ch - 120}) scale(${lines.length > 3 ? .75 : 1})` }, g); ic.innerHTML = ICONS[c.icon]; }
    A.push({ node: g, at: t0 + i * step, kind: "rise" });
    return { cx: x + cw / 2 };
  });
  t0 += N * step + step * .5;

  const perCard = {}, used = {};
  S.links.forEach(([, ci]) => perCard[ci] = (perCard[ci] || 0) + 1);
  S.links.forEach(([li, ci], k) => {
    const a = labelPos[li], m = perCard[ci], idx = used[ci] = (used[ci] ?? -1) + 1;
    const ex = cardPos[ci].cx + (idx - (m - 1) / 2) * 40, ey = ctop + 150 + (idx % 2) * 6;
    const g = el("g", {}, root);
    const p = el("path", { d: `M${a.cx} ${a.y} C${a.cx} ${a.y + 120} ${ex} ${ey - 160} ${ex} ${ey}`, fill: "none", stroke: "#2a2a2a", "stroke-width": 4, "stroke-linecap": "round" }, g);
    const dot = el("circle", { cx: ex, cy: ey, r: 9, fill: "#1d1d1d" }, g);
    const len = p.getTotalLength(); p.style.strokeDasharray = len;
    A.push({ node: g, at: t0 + k * step * .7, kind: "draw", path: p, len, dot });
  });
  anims.push(...A);
}
scenes.forEach(buildScene);

const cap = document.getElementById("cap");
const allCaps = scenes.flatMap(s => s.captions || []);
window.DURATION = C.duration || scenes[scenes.length - 1].end;

window.render = function (t) {
  scenes.forEach((s, i) => {
    const last = i === scenes.length - 1;
    const vis = scenes.length === 1 ? 1 : Math.min(i === 0 ? 1 : clamp((t - s.start) / 0.4), last ? 1 : clamp((s.end - t) / 0.4));
    s.root.style.display = vis > 0 ? "" : "none"; s.root.style.opacity = vis;
  });
  for (const a of anims) {
    const p = ease((t - a.at) / 0.6);
    if (a.kind === "fade") a.node.style.opacity = p;
    if (a.kind === "pop") { a.node.style.opacity = p; a.node.style.transformOrigin = "center"; a.node.style.transformBox = "fill-box"; a.node.style.transform = `scale(${0.7 + 0.3 * p})`; }
    if (a.kind === "rise") { a.node.style.opacity = p; a.node.style.transform = `translateY(${(1 - p) * 60}px)`; }
    if (a.kind === "draw") { const q = ease((t - a.at) / 0.9); a.node.style.opacity = q > 0 ? 1 : 0; a.path.style.strokeDashoffset = a.len * (1 - q); a.dot.style.opacity = q > .95 ? 1 : 0; }
  }
  const c = allCaps.find(c => t >= c.start && t < c.end);
  if (!c) { cap.innerHTML = ""; return; }
  const words = c.text.split(/\s+/), hl = c.hl || [], per = Math.min(0.35, (c.end - c.start) * 0.85 / words.length);
  const shown = Math.min(words.length, Math.floor((t - c.start) / per) + 1);
  cap.innerHTML = words.slice(0, shown).map(w => `<span class="${hl.includes(w) ? "hl" : ""}">${w.replace(/</g, "&lt;")}</span>`).join("");
};

if (!window.RENDER_MODE) { const s0 = performance.now(); (function loop() { render((performance.now() - s0) / 1000 % window.DURATION); requestAnimationFrame(loop); })(); }
