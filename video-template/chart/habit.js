// Preset: what a daily habit really costs (here: a $12 pack a day). Change the numbers for coffee, takeaway, etc.
const H = { name: "A PACK A DAY", perDay: 12, years: 20, rate: 0.07 };
window.CONFIG = {
  title: "WHAT " + H.name + " COSTS",
  tags: `$${H.perDay} A DAY  ·  ${H.years} YEARS`,
  subtitle: "Spent vs. invested instead...",
  period: l => "YEAR " + l, axis: "money", pointsPerSecond: 1.2, hold: 4,
  rows: () => {
    const out = [{ label: 0, spent: 0, invested: 0 }]; let bal = 0;
    for (let m = 1; m <= H.years * 12; m++) {
      bal = bal * (1 + H.rate / 12) + H.perDay * 365 / 12;
      if (m % 12 === 0) out.push({ label: m / 12, spent: H.perDay * 365 * m / 12, invested: bal });
    }
    return out;
  },
  tick: r => r.label % 5 === 0 ? "Yr " + r.label : null,
  series: [
    { key: "invested", label: "If invested", color: "#2ee59d", fill: true },
    { key: "spent", label: "Money spent", color: "#ff5c6c" },
  ],
  cards: [
    { label: "MONEY SPENT", value: c => c.spent, format: "money", color: "#ff5c6c" },
    { label: "IF INVESTED", value: c => c.invested, format: "money", color: "#2ee59d" },
    { label: "PER YEAR", value: () => H.perDay * 365, format: "money" },
    { label: "PACKS", value: c => c.index * 365, format: "number" },
  ],
  footer: `Invested at ${+(H.rate * 100).toFixed(2)}% a year · Not financial advice`,
  handle: "@yourchannel",
};
