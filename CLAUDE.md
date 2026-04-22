# CLAUDE.md

Cold-start brief for Claude Code. Read this first when dropped into this repo.

## 1. Project overview

Single-file web app (`index.html`) — a Kahoot-style practice quiz for a 5th-grade student ("Ephraim") preparing for the Kentucky STLP Tech Bowl state competition. The user ("Carlo", DevOps/cloud engineer in Kentucky) built it so the kid can drill on iPad via Add-to-Home-Screen. 298 questions across 17 categories. Deployed as a PWA on GitHub Pages: https://thewahlstedts.github.io/stlp-tech-bowl/. No backend, no build step, no accounts.

## 2. File layout

- `index.html` — the entire web app (HTML + CSS + JS + embedded QUESTIONS array, ~1800 lines). Source of truth.
- `README.md` — human-facing description of features.
- `manifest.json`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon-32.png` — PWA assets.
- `og-preview.png` — Open Graph / Twitter card image.
- `LICENSE` — MIT.
- `new-questions-batch-N.md` (gitignored) — scratch review files for draft questions. Batches 1–6 integrated; batch 7 was drafted when this file was created (check the latest file for current status).
- `CONVERSATION_CONTEXT.md` (gitignored) — ephemeral context dump, ignore.
- `.gitignore` — ignores `CONVERSATION_CONTEXT.md`, `new-questions-*.md`, `.DS_Store`.

## 3. The QUESTIONS array

Shape (inside `index.html`):

```js
{
  text: "...",
  options: [...],   // 2 for T/F, 4 for multiple choice
  correct: 0,       // 0-based index of correct option
  category: "...",
  points: 2         // 1=easy, 2=medium, 3=hard, 5=bonus
}
```

17 categories: Computer Basics, Internet & Safety, Coding, Tech History, Digital Devices, Tech Vocabulary, Logic, Social Media, Fun Tech Facts, Digital Citizenship, Artificial Intelligence, Keyboard Shortcuts, File Types, Robotics, Networking, Creative Digital Arts, Bonus.

**Logic is deliberately small (5 questions)** — the user rejected the first batch of Logic drafts. Don't redraft Logic unless they ask with a specific style direction.

## 4. How `index.html` is organized

- `<style>` block: Kahoot-inspired. Deep royal blue background `#0F3D91`, orange accent `#FFA726`, Montserrat font. CSS vars: `--brand` (`#0F3D91`), `--brand-dark` (`#061B4F`), `--brand-light` (`#4773C7`).
- `<body>` has `.screen` divs toggled via `.hidden`: `#start-screen`, `#question-screen`, `#results-screen`, `#history-screen`. Only one visible at a time.
- `<script>` block at the bottom: QUESTIONS array, shuffle helper, localStorage history helpers (key `stlp_tech_bowl_history_v1`, 100-entry cap), state object, event wiring, `buildQueue` / `renderQuestion` / `handleAnswer` / `showResults` / `renderHistory`.

## 5. Features already built (don't rebuild)

- Mode: Practice (feedback after each Q) / Test (feedback only at end).
- Question count: 10 (default) / 25 / All 298.
- Category selector dropdown with per-category counts.
- Timer: Off / 20s / 10s. Bar goes yellow at 5s, red+pulse at 3s. Running out = wrong.
- Shuffle (on by default): randomizes question order AND answer positions per question.
- Session anti-repeat: ≥90% new questions per session in a given browser session; auto-recycles when unseen pool runs low.
- Quit button on question screen (with confirm dialog).
- Local history via localStorage (100-entry cap). "View history" screen shows Games / Best / Avg stats, per-quiz list, Reset history button.
- Results screen: score, per-category breakdown, review of missed questions.
- PWA installable (manifest + full icon set).
- Dynamic Island / safe-area-aware CSS (`env(safe-area-inset-*)`).
- OG / Twitter card preview wired up.

## 6. Conventions the user has established

- **Be direct and critical.** Carlo prefers candid feedback over hedging. Call out weaknesses in drafts, designs, or approaches.
- **Simple static HTML.** No frameworks, no build step, no bundlers. Vanilla JS in one file.
- **Questions must not give away the answer.** No "(2007)" in an iPhone correct-answer when the question asks about release year. No acronym expansion appearing in the stem when the answer is the expansion. When unsure, ask.
- **No "True or False:" prefix on T/F questions.** The answer buttons make the format obvious; write new T/F as bare statements.
- **New question workflow:** draft in `new-questions-batch-N.md`, user reviews inline or in chat, assistant integrates approved ones into the QUESTIONS array, then updates the start-screen total counter and README.
- **Commits use the trailer** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- **Direct-to-main is fine** for small unambiguous changes. Bigger features or anything worth reviewing should go through a PR (branch `claude/<topic>`, open with `gh pr create`, don't self-merge).

## 7. iOS caching gotcha

When Carlo reports a visual bug on iOS, know that both Safari and the installed PWA cache HTML aggressively (GitHub Pages serves `cache-control: max-age=600`). Before iterating on visual fixes, ask how he'll verify. The nuclear options:

- **PWA**: remove from Home Screen and re-add.
- **Safari**: append a fresh `?v=N` query string on each test (must be a new value each time — `?v=1` only bypasses once).

Don't assume a change is broken until you know the cache isn't lying.

## 8. Memory system

The user has a persistent memory at `/Users/carlowahlstedt/.claude/projects/-Users-carlowahlstedt-Source-Github-thewahlstedts-stlp-tech-bowl/memory/`. Read `MEMORY.md` there first — it indexes `user_profile.md`, `feedback_style.md`, `feedback_ios_caching.md`, and `project_stlp_tech_bowl.md`.

## 9. Open threads

- Logic category sits at 5 questions; further drafts parked pending a style direction from the user.
- Batch 7 (`new-questions-batch-7.md`) was drafted when this file was created — check its current review state before drafting more.
