// Preset: lifetime cost of an industrial motor. Pure math from the inputs below.
// Efficiencies: IEC 60034-30-1 minimums for a 75 kW, 4-pole, 50 Hz motor (IE2 94.7%, IE4 96.0%).
// Price, hours and electricity rate are example assumptions: change them for your case.
const M = { kw: 75, hours: 6000, rate: 0.12, price: 6000, years: 15, ie2: 0.947, ie4: 0.960 };
const perYear = eff => M.kw / eff * M.hours * M.rate; // full-load electricity cost per year
window.CONFIG = {
  title: "THE REAL COST OF A MOTOR",
  tags: `${M.kw} KW  ·  ${M.hours.toLocaleString("en-US")} H/YEAR  ·  $${M.rate}/KWH`,
  subtitle: "Buying it is the cheap part...",
  period: l => l === 0 ? "DAY 1" : "YEAR " + (l / 12).toFixed(1).replace(".0", ""),
  axis: "money", pointsPerSecond: 8, hold: 5,
  rows: () => Array.from({ length: M.years * 12 + 1 }, (_, m) => ({
    label: m, energy: perYear(M.ie2) * m / 12, price: M.price,
    saved: (perYear(M.ie2) - perYear(M.ie4)) * m / 12, kwh: M.kw / M.ie2 * M.hours * m / 12,
  })),
  tick: r => r.label % 36 === 0 ? "Yr " + r.label / 12 : null,
  series: [
    { key: "energy", label: "Electricity cost", color: "#ff8a3d", fill: true },
    { key: "price", label: "Purchase price", color: "#4cc3ff" },
  ],
  cards: [
    { label: "PURCHASE PRICE", value: c => c.price, format: "money", color: "#4cc3ff" },
    { label: "ELECTRICITY", value: c => c.energy, format: "money", color: "#ff8a3d" },
    { label: "ENERGY SHARE", value: c => c.energy / (c.energy + c.price) * 100, format: "percent" },
    { label: "IE4 SAVES YOU", value: c => c.saved, format: "money", sign: true },
  ],
  extra: { label: "ENERGY USED", value: c => c.kwh / 1000, format: { suffix: " MWh" } },
  footer: "IE2 motor at full load · Saving = IE4 vs IE2 (IEC 60034-30-1) · Example prices",
  handle: "@yourchannel",
};
