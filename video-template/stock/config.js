// Edit this for each stock video. Prices come from the data file (make it with prep.js).
window.CONFIG = {
  name: "DEMO HOLDING",          // big title
  ticker: "DEMO",
  exchange: "EXAMPLE EXCHANGE",
  data: "demo-data.js",          // made by: node stock/prep.js prices.csv stock/data.js
  monthly: 100,                  // amount invested each month
  currency: "$",
  start: "1997-01",              // first month to invest (optional, defaults to first data month)
  end: null,                     // last month (optional)
  secondsPerYear: 1.6,           // animation speed
  hold: 4,                       // seconds to hold the final frame
  handle: "@yourchannel",
  footer: "Dividends reinvested · Source: Yahoo Finance",
  locale: "en-US",               // number/month formatting, e.g. "tr-TR"
  text: {                        // translate these for other languages
    subtitle: "If you invested {amount} every month...",
    value: "Portfolio value", invested: "Total invested",
    totalInvested: "TOTAL INVESTED", portfolio: "PORTFOLIO",
    gain: "NET GAIN", ret: "RETURN", shares: "SHARES ACCUMULATED", sharesUnit: "shares",
  },
  audio: null,                   // optional music/voiceover file merged at render
};
