# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start Vite dev server (localhost:5173, or $PORT)
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run deploy      # build + publish dist/ to the gh-pages branch (GitHub Pages)
```

There is no test suite and no linter configured in this repo.

## Architecture

This is a single-page, client-only React + Vite prototype of an iOS-style mobile news app ("The Signal"). There is no backend, router, or global state library — everything lives in three files:

- **`src/App.jsx`** — the entire app. All screen state (`screen`, `articleId`, `menuOpen`, `searchOpen`, `category`, `topic`, `loggedIn`, etc.) is held in `useState` hooks at the top of the single `App` component. Navigation is done by setting `screen` to one of `'home' | 'about' | 'topic' | 'login' | 'categories' | 'media'` plus a few boolean overlay flags (`articleId !== null` for the article view, `searchOpen` for search) — there is no router. Each screen is a conditionally rendered block (`{showHome && (...)}`, `{showArticle && (...)}`, etc.) inside one big returned JSX tree. Navigation helper functions (`goHome`, `goAbout`, `goTopic`, `openArticle`, etc.) all reset the other screen flags so only one screen shows at a time.
- **`src/IOSDevice.jsx`** — a presentational component that renders the iPhone bezel, dynamic island, status bar, and home indicator chrome. `App.jsx` renders all screen content as `children` inside `<IOSDevice>`. Treat this as decorative framing, not app logic.
- **`src/data.js`** — the article dataset. `RAW_ARTICLES` is hand-authored source data (title, description, source, image, publishedAt, etc.); `ARTICLES` is the derived array actually consumed by the app, built by mapping over `RAW_ARTICLES` to compute `id`, `featured` (via the `FEATURED_TITLES` title-matching set), `dek`/`body` (split out of `description` by `splitSentences`), `time` (via `timeAgo`, relative to the fixed `NOW` constant), and `readMins`. `CATEGORIES` is the fixed list of topic pills/tabs. When adding articles, edit `RAW_ARTICLES` and let the derivation logic compute the rest — don't hand-write `ARTICLES` entries.

### Styling

All styling is inline `style={{...}}` objects — there is no CSS file, CSS-in-JS library, or Tailwind. Visual constants (accent color, headline font, list density) are centralized in the `THEME` object at the top of `App.jsx`; prefer editing `THEME` over hardcoding new color/font values when restyling globally. Fonts (`Source Serif 4`, `Lora`, `Work Sans`) are loaded from Google Fonts via `<link>` tags in `index.html`. Article images are hotlinked from Unsplash — both require network access at runtime.

### Deployment

Deploys as a static site to GitHub Pages via `gh-pages` (see `homepage` in `package.json` and `base: './'` in `vite.config.js`). If the repo is renamed or moved to a project page, `vite.config.js`'s `base` may need to change accordingly.
