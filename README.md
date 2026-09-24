# quillandwing.com

The landing page for **Quill & Wing**, a Mac app where a raven carries your mail.

## It is a static site. There is no backend.

One HTML page, a stylesheet, one script, and folders of images, fonts and raven
sprite sheets, deployed to Netlify from this repo on every push to `main`.
No build command, no functions, no secrets.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole page |
| `styles.css` | Styles; palette and type tokens at the top |
| `flight.js` | The practice flight: the letter types itself, the raven departs and returns |
| `images/` | Crest, courier portrait, wax seal, desktop wallpaper, icons, OG image |
| `fonts/` | Self-hosted Cinzel and EB Garamond subsets (SIL Open Font License) |
| `raven/` | Nine sprite sheets (2400×2000 WebP, 6×5 cells of 400px) — see below |
| `scripts/build-raven-sheets.py` | Rebuilds `raven/` from the app's rendered frames |
| `netlify.toml` | Static publish + security and cache headers |

`Designs/` (the Claude Design mockup this page was built from) and `Assets/`
(the full-resolution wallpaper original) stay on disk and are gitignored.

## The raven

The simulated desktop is laid out at a fixed 1280×800 and the whole frame is
scaled to fit the viewport (`--desk-scale`, set in `flight.js`). The raven is
drawn on a canvas over it from sprite sheets built out of the app's own
rendered frames, at half frame rate:

| Sheet cells | Clip | Source |
|---|---|---|
| 0–123 | departure (124) | `bird-v17/departure` 247 frames @ 36 fps |
| 124–214 | arrival (91) | `bird-v17/arrival` 180 frames @ 30 fps |
| 215–238 | look (24) | `bird-v17/look` 48 frames @ 24 fps |
| 239 | perched | the bird at rest |
| 240 | perch | the empty perch |

The departure path (`QW_PATH` in `flight.js`) is the app's own trajectory from
the bird-v17 manifest. When the app's raven art changes, rebuild the sheets:

    python3 scripts/build-raven-sheets.py "/path/to/app/assets/bird-v17"

The flight plays only while the desk is on screen and fades instead of flying
when the visitor prefers reduced motion.

## Working on it locally

    python3 -m http.server 8123

then open <http://localhost:8123>. Nothing to build or install.

## Before launch

- Point the download buttons at the Mac App Store listing.
- Add the Support and Privacy pages the footer links to. A hosted
  privacy policy on this domain is required for Google OAuth verification.
