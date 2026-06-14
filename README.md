# kevindarty.com

Personal website for Kevin Darty — static HTML, styled with a hand-built
**Material Design 3** system and a **Claude-inspired** warm palette. Hosted on
GitHub Pages. No build step, no runtime dependencies.

## Structure

```
index.html          Single-page site (Hero · About · Online Presence · Footer)
feed.html           Redirect → index.html#presence (preserves old links)
CNAME               Custom domain for GitHub Pages
styles/main.css     Design tokens + components; light & dark themes
scripts/theme.js    Theme toggle + mobile nav
img/                Banner, portrait, and online-presence logos
```

## Theming

- **Light** and **Dark** themes via a `data-theme` attribute on `<html>`.
- Dark mode uses Claude's warm surfaces (`#262624`, `#30302e`, `#1f1e1d`) with
  cream text and the signature clay/coral accent (`#e08a6b` / `#b8552f`).
- The initial theme respects the OS `prefers-color-scheme`; once the visitor
  clicks the toggle, their choice is saved to `localStorage`.
- Theme colors are defined as CSS custom properties at the top of
  `styles/main.css` — edit them in one place to retune the palette.

## Local preview

It's plain static files, so any static server works, e.g.:

```powershell
python -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. Commit these files to the repository's Pages branch (e.g. `main`).
2. In **Settings → Pages**, set the source to that branch / root.
3. Keep the `CNAME` file (`www.kevindarty.com`) so the custom domain sticks.

## Updating content

- **Bio / interests:** edit the About section in `index.html`.
- **Links / tiles:** edit the cards in the "Online presence" section.
- **Images:** drop replacements into `img/` using the same filenames.
- **Copyright year** updates automatically via a one-line script in the footer.
