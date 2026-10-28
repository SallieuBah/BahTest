// Usage: node stock/prep.js prices.csv chart/prices.js
// Turns a monthly price CSV into a data file for chart/index.html.
// Accepts Yahoo-style "Date,Open,High,Low,Close,Adj Close,Volume" (uses Adj Close, so
// dividends count as reinvested) or a simple "Date,Close" file. Daily data is reduced to month-end.
const fs = require("fs");
const [src, out = "chart/prices.js"] = process.argv.slice(2);
if (!src) { console.error("Usage: node stock/prep.js prices.csv [out.js]"); process.exit(1); }
const rows = fs.readFileSync(src, "utf8").trim().split(/\r?\n/);
const head = rows.shift().split(",").map(h => h.trim().toLowerCase());
const di = head.indexOf("date");
let ci = head.indexOf("adj close"); if (ci < 0) ci = head.indexOf("close");
if (di < 0 || ci < 0) { console.error("CSV needs Date and Close (or Adj Close) columns"); process.exit(1); }
const byMonth = new Map();
for (const r of rows) {
  const c = r.split(","), price = parseFloat(c[ci]);
  if (!isFinite(price) || price <= 0) continue;
  byMonth.set(c[di].trim().slice(0, 7), price); // last row of each month wins
}
const data = [...byMonth].sort(([a], [b]) => a.localeCompare(b)).map(([m, p]) => [m, +p.toPrecision(6)]);
fs.writeFileSync(out, "window.PRICES = " + JSON.stringify(data) + ";\n");
console.log(`Wrote ${data.length} months (${data[0][0]} → ${data.at(-1)[0]}) to ${out}`);
