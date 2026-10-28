// Starter for ANY topic: paste your own numbers into rows (label + one field per line).
// Example values are placeholders: replace them with real data and cite the source in footer.
window.CONFIG = {
  title: "YOUR TITLE HERE",
  tags: "TOPIC  ·  PLACE",
  subtitle: "One line that hooks the viewer...",
  axis: { suffix: "" },          // "money", "percent", or { prefix, suffix }
  pointsPerSecond: 2, hold: 4,
  rows: [
    { label: 2000, a: 10, b: 8 }, { label: 2005, a: 14, b: 9 }, { label: 2010, a: 21, b: 11 },
    { label: 2015, a: 30, b: 12 }, { label: 2020, a: 44, b: 14 }, { label: 2025, a: 60, b: 15 },
  ],
  series: [
    { key: "a", label: "Series A", color: "#2ee59d", fill: true },
    { key: "b", label: "Series B", color: "#f2b544" },
  ],
  cards: [
    { label: "SERIES A", value: c => c.a, format: "number", color: "#2ee59d" },
    { label: "SERIES B", value: c => c.b, format: "number", color: "#f2b544" },
    { label: "GAP", value: c => c.a - c.b, format: "number", sign: true },
    { label: "A VS START", value: c => (c.a / 10 - 1) * 100, format: "percent", sign: true },
  ],
  footer: "Source: add your source here",
  handle: "@yourchannel",
};
