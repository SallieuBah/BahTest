// "Why High-Efficiency Motors?" — multi-scene video with voiceover.
// Same video narrated with Mohamed's own recording (timings made from the cleaned recording).
// Build: node render.js motors-myvoice.mp4 motors-myvoice.js
window.CONFIG = {
  handle: "ENERGY EFFICIENCY ENGINEERING",
  timings: "motors-myvoice.timings.js",
  audio: "motors-myvoice.voice.wav",
  voiceSpeed: 0.93,
  scenes: [
    {
      title: "Hi, I'm Mohamed",
      labels: ["ELECTRICAL", "ELECTRONICS"],
      cards: [{ source: "MOHAMED SALLIEU BAH", quote: "Electrical &\nElectronics\nEngineer", icon: "bolt" }],
      links: [[0, 0], [1, 0]],
      narration: []
    },
    {
      title: "Why High-Efficiency Motors?",
      labels: ["PUMPS", "FANS", "COMPRESSORS", "CONVEYORS"],
      cards: [
        { source: "SHARE OF POWER", quote: "≈ 2/3 of\nindustrial\nelectricity", icon: "bolt" },
        { source: "LIFETIME COST", quote: "energy is\n> 90% of the\ntotal cost", icon: "coin" }
      ],
      links: [[0, 0], [1, 0], [2, 1], [3, 1]],
      narration: [
        "Why do *high-efficiency* motors matter?",
        "Pumps, fans, compressors and conveyors are all driven by electric motors.",
        "Together, they use about *two thirds* of all industrial electricity.",
        "And over a motor's life, the purchase price is small. *Energy* is more than *ninety percent* of the total cost."
      ]
    },
    {
      title: "Where does the energy go?",
      labels: ["COPPER", "IRON CORE", "FRICTION", "STRAY"],
      cards: [
        { source: "STANDARD · IE1", quote: "losses\nbecome\nwasted heat", icon: "fire" },
        { source: "PREMIUM · IE3 / IE4", quote: "more copper,\nlow-loss steel,\nbetter fan", icon: "motor" }
      ],
      links: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1]],
      narration: [
        "So where does the energy go?",
        "Every motor loses power in its *copper* windings, its *iron* core, through *friction*, and as stray losses.",
        "In a standard motor, all of that turns into *heat*.",
        "High-efficiency designs use more copper, thinner low-loss steel and a better fan, cutting losses by a *third* or more."
      ]
    },
    {
      title: "Efficiency classes",
      labels: ["IE1", "IE2", "IE3", "IE4"],
      cards: [
        { source: "IEC 60034-30-1", quote: "one global\nefficiency\nscale", icon: "gauge" },
        { source: "EU ECODESIGN", quote: "IE3 minimum\nIE4 for\n75–200 kW", icon: "scale" }
      ],
      links: [[0, 0], [1, 0], [2, 1], [3, 1]],
      narration: [
        "Motors are graded on one international scale, from {IE1|I E one}, standard, up to {IE4|I E four}, *super premium*.",
        "In Europe, {IE3|I E three} has been the *minimum* for most motors since {2021,|twenty twenty-one,}",
        "and {IE4|I E four} is now required from {75 to 200 kW.|seventy-five to two hundred kilowatts.}"
      ]
    },
    {
      title: "The savings math",
      labels: ["OUTPUT kW", "HOURS / YR", "LOAD %", "EFFICIENCY"],
      cards: [
        { source: "THE FORMULA", quote: "ΔP = P ×\n(1/η₁ − 1/η₂)", icon: "gauge" },
        { source: "EXAMPLE · 75 kW", quote: "IE1 93% → IE4 96%\n≈ 11,300 kWh/yr\n≈ €1,700 / yr", icon: "coin" }
      ],
      links: [[0, 0], [3, 0], [1, 1], [2, 1]],
      narration: [
        "So how much can you actually save?",
        "Divide the shaft power by each motor's efficiency. The difference is the power you *stop wasting*.",
        "Multiply it by your *running hours* and your *energy price*.",
        "A {75 kW|seventy-five kilowatt} motor at {75%|seventy-five percent} load, running {6,000|six thousand} hours a year,",
        "upgraded from {IE1|I E one} to {IE4,|I E four,} saves about *{11,300|eleven thousand three hundred}* kilowatt hours.",
        "At {€0.15|fifteen euro cents} per kilowatt hour, that is around *{€1,700|seventeen hundred euros}* every year."
      ]
    },
    {
      title: "Make every kW count",
      labels: ["RIGHT-SIZE", "VFD", "TRANSMISSION", "MAINTENANCE"],
      cards: [
        { source: "PAYBACK", quote: "often\n1 – 3 years", icon: "coin" },
        { source: "BONUS", quote: "cooler, longer\nlife, less CO₂", icon: "leaf" }
      ],
      links: [[0, 0], [1, 0], [2, 1], [3, 1]],
      narration: [
        "To get the most out of it, size the motor correctly, and add a *variable speed drive* on pumps and fans.",
        "Cutting their speed by just {20%|twenty percent} can cut power by nearly *half*.",
        "Pair it with efficient belts or direct drive, and good maintenance.",
        "The result: payback often within *one to three years*, cooler motors that last longer, and *lower emissions*."
      ]
    }
  ]
};
