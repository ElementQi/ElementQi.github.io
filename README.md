# Mengqi Li · Portfolio

A warm, minimal personal portfolio for **https://elementqi.github.io**, built with Astro and TypeScript. The homepage leads with Mengqi's role, focus, and selected contributions in plain language, followed by a short personal introduction. A separate research page holds full publications and method diagrams. Includes a printable CV and light/dark themes. Fonts are self-hosted; no analytics or external runtime services are required.

## Local development

Use Node.js 24 LTS or a compatible newer version.

```powershell
npm ci
npm run dev
```

Open **http://127.0.0.1:4321**. To check and build the site, run `npm run build`; to inspect that production build, run `npm run preview`.

## Editing

- `src/data/profile.ts`: identity, links, papers, BibTeX, education, and experience.
- `src/pages/index.astro`: homepage copy and sections.
- `src/pages/research.astro`: full paper entries, diagrams, and citations.
- `src/pages/cv.astro`: academic CV; **Print / Save PDF** uses a dedicated print layout.
- `src/styles/global.css`: layout, colors, typography, and responsive behavior.
- `src/components/PaperArt.astro`: SePT workflow and interactive StreamBP chunk diagram; see [diagram sources](docs/research-diagrams.md).
- `public/social.png`: social sharing image.

The academic CV is rebuilt from the relevant background in the older CV and current public publication records. Review its content before publishing. The original visa PDF is not included. Source links and content decisions are recorded in [docs/content-sources.md](docs/content-sources.md).

## GitHub Pages

1. Create or use the repository **ElementQi/ElementQi.github.io** and push this project's files to its `main` or `master` branch.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. The included `.github/workflows/deploy.yml` builds the site and publishes `dist/`. Check the deployment in the repository's Actions tab.

Node.js runs during development and the Actions build. The resulting HTML, CSS, JavaScript, and fonts run on GitHub Pages without a server. The configured domain is `https://elementqi.github.io`; using a repository subpath instead requires an Astro `base` setting and corresponding internal-link changes.

## Browser checks

```powershell
npx playwright install chromium
npm test
```

The tests use installed Google Chrome on Windows when present, otherwise Playwright Chromium. They check real page navigation, mobile menus, theme persistence, clipboard actions, paper disclosures, content without JavaScript, and accessibility. Tests build the production site before serving it locally.

With the local server running, `node scripts/capture.mjs` refreshes the social preview and saves desktop, mobile, dark-theme, and print previews under `tmp/`.
