# STLP Tech Bowl Practice

A Kahoot-style practice quiz for the Kentucky STLP Tech Bowl competition, designed for iPad.

**170 questions** across 17 categories — multiple choice and true/false.

## Play it

Live at: **https://thewahlstedts.github.io/stlp-tech-bowl/**

## Features

- Kahoot-inspired UI: red triangle / blue diamond / yellow circle / green square
- Two quiz modes:
  - **Practice** — see the correct answer after each question
  - **Test** — no feedback until the end (simulates real competition pressure)
- Optional timer per question:
  - **No timer** — untimed (default, good for learning)
  - **20 sec** — Kahoot's standard per-question time
  - **10 sec** — fast practice
- **Shuffle** (default on) — randomizes question order AND answer-option positions each session, so you can't memorize by position
- Timer bar turns yellow at 5 seconds, red and pulses at 3 seconds
- Running out of time counts as wrong (shows "⏱ Ran out of time" in the review)
- Final results with score, per-category breakdown, and review of missed questions
- Works offline once loaded; no login, no tracking, no backend
- Touch-friendly, fits iPad portrait or landscape
- Can be "installed" to iPad home screen as a full-screen app

## Add to iPad home screen (recommended)

1. Open the live URL in Safari on the iPad
2. Tap the share button → **Add to Home Screen**
3. Launches full-screen like a real app (the `apple-mobile-web-app-capable` meta tag is set)

## Printable practice sheets

Two PDFs are in this repo for pencil-and-paper practice:

- [`STLP_Tech_Bowl_Student.pdf`](STLP_Tech_Bowl_Student.pdf) — 72 questions with answer lines
- [`STLP_Tech_Bowl_Coach_Answer_Key.pdf`](STLP_Tech_Bowl_Coach_Answer_Key.pdf) — same questions with answers, difficulty, and point values

## Editing questions

All questions live in the `QUESTIONS` array inside `index.html`. Shape:

```js
{
  text: "What is a loop?",
  options: ["...", "..."],        // 2 options for T/F, 4 for multiple choice
  correct: 0,                     // index of the correct answer (0-based)
  category: "Coding",
  points: 2                       // 1=easy, 2=medium, 3=hard, 5=bonus
}
```

No build step. Edit, save, push.

## Categories (17)

Computer Basics · Internet & Safety · Coding · Tech History · Digital Devices · Tech Vocabulary · Logic · Social Media · Fun Tech Facts · Digital Citizenship · Artificial Intelligence · Keyboard Shortcuts · File Types · Robotics · Networking · Creative Digital Arts · Bonus/Tiebreaker

## Deploying your own copy

1. Fork or clone this repo
2. **Settings → Pages**, source = `main` branch, path = `/ (root)`
3. Wait ~1 minute, visit `https://<your-user>.github.io/stlp-tech-bowl/`

## Caveat

The question bank is Claude-generated practice material aligned with Kentucky Academic Standards for Technology. It is NOT official KDE STLP questions. Use it for prep, not as a guarantee of real test content.

## License

MIT — see [LICENSE](LICENSE).
