# STLP Tech Bowl Practice

Live at: **https://thewahlstedts.github.io/stlp-tech-bowl/**

A Kahoot-style practice quiz for the Kentucky STLP Tech Bowl competition, tuned for iPad and iPhone. **410 questions** across **16 categories**, **918 max points**. Single static page, no backend, no accounts.

## Features

Quiz setup (start screen):

- **Practice mode** (default) — correct answer revealed after each question. **Test mode** — no feedback until the end.
- **Question count**: 10 Qs · 30 Qs (default, matches real Tech Bowl) · All 410.
- **Category selector** — all categories (default) or any single category; per-category question counts shown in the dropdown.
- **Timer**: Off · 25 sec (default, matches real Tech Bowl) · 10 sec. Bar turns yellow at 5s, red and pulses at 3s. Running out counts as wrong ("⏱ Ran out of time" in the review).
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

All questions live in the `QUESTIONS` array inside `index.html` (410 entries). Shape:

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

## STLP Tech Bowl — what the real event looks like

Per the official Kentucky Department of Education STLP Tech Bowl rubric:

- **Format**: Live Kahoot! quiz at the STLP State Championship. Individual event, 2 students per school.
- **Divisions** (K–12):
  - Elementary — Grades K–5
  - Middle — Grades 6–8
  - High — Grades 9–12
- **Scope**: "knowledge of all things technology — from devices and digital citizenship to innovation and internet safety." Those four areas (Devices, Digital Citizenship, Innovation, Internet Safety) are the rubric's scope buckets.
- **Session length**: ~30 general technology questions per round. This app defaults to 30.
- **Per-question timer**: up to 25 seconds (or until everyone has answered). This app defaults to 25 sec.
- **Scoring**: Kahoot rewards faster correct answers with more points. This app currently gives flat per-question points (1/2/3/5); a speed-bonus mode is a known future option.
- **Rubric anchor**: the [Kentucky Academic Standards for Technology](https://www.education.ky.gov/curriculum/standards/kyacadstand/Documents/KAS_Technology.pdf).

## Categories (16)

The app keeps 16 granular categories so students can drill specific areas, but the category picker groups them under the rubric's four scope areas (plus Bonus) using HTML `<optgroup>`:

- **Devices** — Computer Basics · Digital Devices · Keyboard Shortcuts · File Types · Tech Vocabulary
- **Digital Citizenship** — Digital Citizenship · Social Media
- **Innovation** — Coding · Artificial Intelligence · Robotics · Tech History · Fun Tech Facts · Creative Digital Arts
- **Internet Safety** — Internet & Safety · Networking
- **Bonus** — Bonus

## Deploying your own copy

1. Fork or clone this repo.
2. **Settings → Pages**, source = `main` branch, path = `/ (root)`.
3. Wait ~1 minute, visit `https://<your-user>.github.io/stlp-tech-bowl/`.

## Caveat

The question bank is Claude-generated practice material aligned with Kentucky Academic Standards for Technology. It is NOT official KDE STLP questions. Use it for prep, not as a guarantee of real test content.

## License

MIT — see [LICENSE](LICENSE).
