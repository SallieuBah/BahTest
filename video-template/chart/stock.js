// Preset: "if you invested X every month in a stock". Prices come from prep.js.
const STOCK = { monthly: 100, start: "1997-01", end: null };
window.CONFIG = {
  scripts: ["demo-prices.js"],   // made by: node chart/prep.js prices.csv chart/prices.js
  title: "DEMO HOLDING",
  tags: "DEMO  ·  EXAMPLE EXCHANGE",
  subtitle: `If you invested $${STOCK.monthly} every month...`,
  currency: "$", axis: "money", pointsPerSecond: 7.5, hold: 4,
  rows: () => {
    let shares = 0;
    return PRICES.filter(([m]) => (!STOCK.start || m >= STOCK.start) && (!STOCK.end || m <= STOCK.end))
      .map(([label, p], i) => (shares += STOCK.monthly / p, { label, value: shares * p, invested: STOCK.monthly * (i + 1), shares }));
  },
  series: [
    { key: "value", label: "Portfolio value", color: "#2ee59d", fill: true },
    { key: "invested", label: "Total invested", color: "#f2b544" },
  ],
  cards: [
    { label: "TOTAL INVESTED", value: c => c.invested, format: "money", color: "#f2b544" },
    { label: "PORTFOLIO", value: c => c.value, format: "money", color: "#2ee59d" },
    { label: "NET GAIN", value: c => c.value - c.invested, format: "money", sign: true },
    { label: "RETURN", value: c => (c.value / c.invested - 1) * 100, format: "percent", sign: true },
  ],
  extra: { label: "SHARES ACCUMULATED", value: c => c.shares, format: { suffix: " shares" } },
  footer: "Dividends reinvested · Source: Yahoo Finance",
  handle: "@yourchannel",
};
