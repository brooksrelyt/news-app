# The Signal — News App Prototype (React)

An interactive iOS-style mobile news app prototype, built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy to GitHub Pages

1. Push this project to a GitHub repo.
2. If the repo is NOT `username.github.io` (i.e. it's a project page), open
   `vite.config.js` and set `base: '/your-repo-name/'`.
3. Easiest path — use the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
   Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`
   Then run `npm run deploy`.
4. In the repo's Settings → Pages, set the source to the `gh-pages` branch.
   Your site will be live at `https://username.github.io/your-repo-name/`.

   Alternatively, use a GitHub Actions workflow that runs `npm run build`
   and publishes `dist/` — search "deploy vite to github pages action" for
   a ready-made workflow file.

## Structure

- `src/App.jsx` — the whole app: state, screens, article data mapping.
- `src/IOSDevice.jsx` — the iPhone bezel/status-bar/home-indicator frame component.
- `src/data.js` — the article dataset (from the provided JSON) and helpers.

## Notes

- Article photos load from Unsplash and Google Fonts loads from Google's CDN — both require an internet connection when the site is live (normal for a hosted portfolio piece).
- Colors, headline font, and list density are set as constants at the top of `App.jsx` (`THEME`) — edit them directly to restyle.
