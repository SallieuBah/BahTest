// Edit this file to make a new video. Times are in seconds.
window.CONFIG = {
  title: "Fâtiha okunur mu?",
  handle: "@tarihvekuran",

  // Top row boxes (any number, 2–5 fit best)
  labels: ["HANEFÎ", "MÂLİKÎ", "ŞÂFİÎ", "HANBELÎ"],

  // Notebook cards (1–3). icon: "ear", "book", "scale", "mosque" or null
  cards: [
    { source: "A'RÂF 7:204", quote: "dinleyin\nve susun", icon: "ear" },
    { source: "BUHÂRÎ · EZÂN · 756", quote: "Fâtiha'yı\nokumayanın\nnamazı yoktur", icon: "book" }
  ],

  // Which label connects to which card: [labelIndex, cardIndex]
  links: [[0, 0], [1, 0], [2, 1], [3, 0]],

  // Subtitles. Words appear one by one; "hl" words get the yellow marker.
  captions: [
    { start: 0.5, end: 3.0, text: "Cemaatle namazda imamın arkasında Fâtiha okunur mu?" },
    { start: 3.2, end: 6.5, text: "Hanefî ve Mâlikî mezhepleri bu ayeti esas alır;", hl: ["esas", "alır;"] },
    { start: 6.7, end: 9.5, text: "Kur'an okunduğu zaman dinleyin ve susun.", hl: ["dinleyin", "susun."] },
    { start: 9.7, end: 13.0, text: "Şâfiî mezhebi ise bu hadisi delil alır;", hl: ["hadisi"] },
    { start: 13.2, end: 16.5, text: "Fâtiha'yı okumayanın namazı yoktur.", hl: ["namazı", "yoktur."] }
  ],

  // Animation pacing: when the board starts building and seconds between steps
  boardStart: 0.8,
  step: 0.5,

  // Optional: voiceover file next to this folder, e.g. "voice.mp3" (or null)
  audio: null,

  // Optional: total length; defaults to last caption end + 1.5s
  duration: null
};
