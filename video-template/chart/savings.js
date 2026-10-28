// Preset: compound interest vs. keeping cash. Pure math, so every number is exact for the inputs.
const P = { monthly: 200, rate: 0.07, years: 40 };
window.CONFIG = {
  title: "THE POWER OF COMPOUNDING",
  tags: `${+(P.rate * 100).toFixed(2)}% A YEAR  ·  ${P.years} YEARS`,
  subtitle: `Save $${P.monthly} a month and invest it...`,
  period: l => "YEAR " + l, axis: "money", pointsPerSecond: 1.5, hold: 4,
  rows: () => {
    const out = [{ label: 0, invested: 0, cash: 0 }]; let bal = 0;
    for (let m = 1; m <= P.years * 12; m++) {
      bal = bal * (1 + P.rate / 12) + P.monthly;
      if (m % 12 === 0) out.push({ label: m / 12, invested: bal, cash: P.monthly * m });
    }
    return out;
  },
  tick: r => r.label % 5 === 0 ? "Yr " + r.label : null,
  series: [
    { key: "invested", label: "Invested", color: "#2ee59d", fill: true },
    { key: "cash", label: "Under the mattress", color: "#f2b544" },
  ],
  cards: [
    { label: "YOU PUT IN", value: c => c.cash, format: "money", color: "#f2b544" },
    { label: "YOU HAVE", value: c => c.invested, format: "money", color: "#2ee59d" },
    { label: "FREE MONEY", value: c => c.invested - c.cash, format: "money", sign: true },
    { label: "MULTIPLIER", value: c => c.cash ? c.invested / c.cash : 1, format: { suffix: "×", decimals: 2 } },
  ],
  footer: `Assumes ${+(P.rate * 100).toFixed(2)}% yearly return, compounded monthly · Not financial advice`,
  handle: "@yourchannel",
};
