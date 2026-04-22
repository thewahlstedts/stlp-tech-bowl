# STLP Tech Bowl Practice

Live at: **https://thewahlstedts.github.io/stlp-tech-bowl/**

A Kahoot-style practice quiz for the Kentucky STLP Tech Bowl competition, tuned for iPad and iPhone. **369 questions** across **17 categories**, **818 max points**. Single static page, no backend, no accounts.

## Features

Quiz setup (start screen):

- **Practice mode** (default) — correct answer revealed after each question. **Test mode** — no feedback until the end.
- **Question count**: 10 Qs (default) · 25 Qs · All 369.
- **Category selector** — all categories (default) or any single category; per-category question counts shown in the dropdown.
- **Timer**: Off (default) · 20 sec · 10 sec. Bar turns yellow at 5s, red and pulses at 3s. Running out counts as wrong ("⏱ Ran out of time" in the review).
- **Shuffle** (default on) — randomizes both question order and each question's answer positions, so you can't memorize by position.

Sessions and history:

- **Session anti-repeat** — subsequent quizzes in the same browser session prefer questions you haven't seen yet (≥90% new when the pool allows); auto-recycles when the remaining unseen pool gets too small.
- **History on device** — every completed quiz is saved to `localStorage`. "View history" on the start screen shows Games / Best / Avg stats, a per-quiz list, and a **Reset history** button.
- Final results screen shows score, per-category breakdown, and a review of missed questions.

Look and feel:

- Kahoot-inspired UI: red triangle / blue diamond / yellow circle / green square.
- **Dynamic Island aware** — uses `env(safe-area-inset-*)` so the layout behaves on modern iPhones.
- Touch-friendly; works in portrait or landscape.
- Enter/Space activate answer buttons (standard button semantics).

Install and offline:

- **PWA installable** — `manifest.json` plus `apple-touch-icon`, `icon-192`, `icon-512`, and `favicon-32` mean iPhone/iPad users get a proper app icon when adding to Home Screen.
- **Link previews** — `og-preview.png` wired into Open Graph / Twitter cards.
- **No backend** — pure HTML/CSS/JS. Runs offline after first load. No login, no tracking, no analytics.

## Add to iPad / iPhone home screen

1. Open the live URL in Safari.
2. Tap the share button → **Add to Home Screen**.
3. Launches full-screen like a real app.

## Editing questions

All questions live in the `QUESTIONS` array inside `index.html` (369 entries). Shape:

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

Computer Basics · Internet & Safety · Coding · Tech History · Digital Devices · Tech Vocabulary · Logic · Social Media · Fun Tech Facts · Digital Citizenship · Artificial Intelligence · Keyboard Shortcuts · File Types · Robotics · Networking · Creative Digital Arts · Bonus

## Deploying your own copy

1. Fork or clone this repo.
2. **Settings → Pages**, source = `main` branch, path = `/ (root)`.
3. Wait ~1 minute, visit `https://<your-user>.github.io/stlp-tech-bowl/`.

## Caveat

The question bank is Claude-generated practice material aligned with Kentucky Academic Standards for Technology. It is NOT official KDE STLP questions. Use it for prep, not as a guarantee of real test content.

## License

MIT — see [LICENSE](LICENSE).
