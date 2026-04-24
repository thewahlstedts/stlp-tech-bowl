# CLAUDE.md

Cold-start brief for Claude Code. Read this first when dropped into this repo.

## 1. Project overview

Single-file web app (`index.html`) — a Kahoot-style practice quiz for a 5th-grade student ("Ephraim") preparing for the Kentucky STLP Tech Bowl state competition. The user ("Carlo", DevOps/cloud engineer in Kentucky) built it so the kid can drill on iPad via Add-to-Home-Screen. **410 questions across 16 categories, 918 max points.** Deployed as a PWA on GitHub Pages: https://thewahlstedts.github.io/stlp-tech-bowl/. No backend, no build step, no accounts.

## 2. STLP Tech Bowl rubric facts (anchor for design decisions)

From the official Kentucky Department of Education STLP Tech Bowl rubric and the STLP Quick Shots page:

- **Event format**: Live Kahoot! quiz at the STLP State Championship. Individual event, 2 students per school.
- **Divisions (K–12)**: Elementary (K–5), Middle (6–8), High (9–12).
- **Scope** (rubric wording): *"knowledge of all things technology — from devices and digital citizenship to innovation and internet safety."* Those four phrases are effectively the scope buckets: **Devices, Digital Citizenship, Innovation, Internet Safety**.
- **Session length**: ~30 general technology questions per Kahoot round. The app's count chip defaults to 30.
- **Per-question timer**: up to 25 seconds (or until everyone answers). The app's timer chip defaults to 25 sec.
- **Scoring**: Kahoot rewards faster correct answers with higher points. The app currently awards flat per-question points (1/2/3/5) — a speed-bonus scoring mode is a future option (see Open Threads).
- **Rubric anchor**: the [Kentucky Academic Standards for Technology](https://www.education.ky.gov/curriculum/standards/kyacadstand/Documents/KAS_Technology.pdf).

The 16 granular categories are grouped under the four rubric scope areas (plus Bonus) in the category dropdown via HTML `<optgroup>` — keeps granular drill while aligning the UX with the rubric. See `SCOPE_GROUPS` in `index.html`.

## 3. File layout

- `index.html` — the entire web app (HTML + CSS + JS + embedded QUESTIONS array). Source of truth.
- `README.md` — human-facing description of features.
- `manifest.json`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon-32.png` — PWA assets.
- `og-preview.png` — Open Graph / Twitter card image.
- `LICENSE` — MIT.
- `new-questions-batch-N.md` (gitignored) — scratch review files for draft questions. Check the highest-numbered file for current status before drafting more.
- `CONVERSATION_CONTEXT.md` (gitignored) — ephemeral context dump, ignore.
- `.gitignore` — ignores `CONVERSATION_CONTEXT.md`, `new-questions-*.md`, `.DS_Store`.

## 4. The QUESTIONS array

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

**16 categories** (Logic was dropped): Computer Basics, Internet & Safety, Coding, Tech History, Digital Devices, Tech Vocabulary, Social Media, Fun Tech Facts, Digital Citizenship, Artificial Intelligence, Keyboard Shortcuts, File Types, Robotics, Networking, Creative Digital Arts, Bonus.

Scope-area grouping in the picker (matches the rubric):

- **Devices** — Computer Basics, Digital Devices, Keyboard Shortcuts, File Types, Tech Vocabulary
- **Digital Citizenship** — Digital Citizenship, Social Media
- **Innovation** — Coding, Artificial Intelligence, Robotics, Tech History, Fun Tech Facts, Creative Digital Arts
- **Internet Safety** — Internet & Safety, Networking
- **Bonus** — Bonus

Any new category not in `SCOPE_GROUPS` falls into an "Other" optgroup at the bottom so it doesn't silently disappear.

## 5. How `index.html` is organized

- `<style>` block: Kahoot-inspired. Deep royal blue background `#0F3D91`, orange accent `#FFA726`, Montserrat font. CSS vars: `--brand` (`#0F3D91`), `--brand-dark` (`#061B4F`), `--brand-light` (`#4773C7`).
- `<body>` has `.screen` divs toggled via `.hidden`: `#start-screen`, `#question-screen`, `#results-screen`, `#history-screen`. Only one visible at a time.
- `<script>` block at the bottom: QUESTIONS array, `SCOPE_GROUPS` for the category picker, shuffle helper, localStorage history helpers (key `stlp_tech_bowl_history_v1`, 100-entry cap), state object, event wiring, `buildQueue` / `renderQuestion` / `handleAnswer` / `showResults` / `renderHistory`.

## 6. Features already built (don't rebuild)

- Mode: Practice (feedback after each Q) / Test (feedback only at end).
- Question count: 10 / **30 (default, matches real Tech Bowl)** / All 410.
- Category selector dropdown — grouped by rubric scope area (optgroup) with per-category counts.
- Timer: Off / **25 sec (default, matches real Tech Bowl)** / 10 sec. Bar goes yellow at 5s, red+pulse at 3s. Running out = wrong ("⏱ Ran out of time" in the review).
- Shuffle (on by default): randomizes question order AND answer positions per question.
- Session anti-repeat: ≥90% new questions per session in a given browser session; auto-recycles when unseen pool runs low.
- Quit button on question screen (with confirm dialog).
- Local history via localStorage (100-entry cap). "View history" screen shows Games / Best / Avg stats, per-quiz list, Reset history button.
- Results screen: score, per-category breakdown, review of missed questions.
- PWA installable (manifest + full icon set).
- Service worker (`sw.js`) for true offline support — app shell + questions precached, Google Fonts stale-while-revalidate, HTML network-first so new deploys reach online users.
- Dynamic Island / safe-area-aware CSS (`env(safe-area-inset-*)`).
- OG / Twitter card preview wired up.

## 7. Conventions the user has established

- **Be direct and critical.** Carlo prefers candid feedback over hedging. Call out weaknesses in drafts, designs, or approaches.
- **Simple static HTML.** No frameworks, no build step, no bundlers. Vanilla JS in one file.
- **Questions must not give away the answer.** No "(2007)" in an iPhone correct-answer when the question asks about release year. No acronym expansion appearing in the stem when the answer is the expansion. When unsure, ask.
- **No "True or False:" prefix on T/F questions.** The answer buttons make the format obvious; write new T/F as bare statements.
- **New question workflow:** draft in `new-questions-batch-N.md`, user reviews inline or in chat, assistant integrates approved ones into the QUESTIONS array, then updates the start-screen total counter and README.
- **Commits use the trailer** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- **Direct-to-main is fine** for small unambiguous changes. Bigger features or anything worth reviewing should go through a PR (branch `claude/<topic>`, open with `gh pr create`, don't self-merge).

## 8. iOS caching gotcha

When Carlo reports a visual bug on iOS, know that both Safari and the installed PWA cache HTML aggressively (GitHub Pages serves `cache-control: max-age=600`). Before iterating on visual fixes, ask how he'll verify. The nuclear options:

- **PWA**: remove from Home Screen and re-add.
- **Safari**: append a fresh `?v=N` query string on each test (must be a new value each time — `?v=1` only bypasses once).

Don't assume a change is broken until you know the cache isn't lying.

## 9. Service worker cache-bump rule (MANDATORY)

`sw.js` precaches the app shell: `index.html`, `manifest.json`, every icon (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`), and `og-preview.png`. The cache is keyed by a `CACHE` constant at the top of `sw.js` (starts at `stlp-tech-bowl-v1`).

**Any change that modifies a precached file — including adding or editing questions inside `index.html` — MUST bump `CACHE`** (`v1` → `v2` → `v3` …). The `activate` handler evicts the old cache automatically once the version changes. Without a bump, installed PWAs (especially on iPad) keep serving the old cached HTML and the user never sees the new content.

Claude should treat this as automatic, not optional: whenever you edit `index.html`, `manifest.json`, or any icon/OG asset in the same commit, also bump `CACHE` in `sw.js`. If you're unsure whether a change is "material", bump anyway — an unnecessary bump only costs users one extra fetch; a missed bump costs them stale questions.

## 10. Memory system

The user has a persistent memory at `/Users/carlowahlstedt/.claude/projects/-Users-carlowahlstedt-Source-Github-thewahlstedts-stlp-tech-bowl/memory/`. Read `MEMORY.md` there first — it indexes `user_profile.md`, `feedback_style.md`, `feedback_ios_caching.md`, and `project_stlp_tech_bowl.md`.

## 11. Open threads

- **Speed-bonus scoring mode**: real Kahoot awards more points for faster correct answers; the app currently gives flat per-question points. Not implemented. Ask before adding — it changes the shape of every stored history entry and the max-points display.
- **Logic category was removed.** The user rejected the first batch of Logic drafts and Logic is no longer in the QUESTIONS array. Don't reintroduce it unless asked with a specific style direction.
- Check the highest-numbered `new-questions-batch-N.md` file for the current drafting status before drafting more.
