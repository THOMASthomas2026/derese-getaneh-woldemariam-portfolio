# Derese Getaneh Woldemariam â€” Personal Portfolio

A clean, responsive, static portfolio website for Derese Getaneh Woldemariam, English Language Teacher.

## Architecture

This portfolio is intentionally independent from the private Teacher Platform.

- HTML + CSS + vanilla JavaScript
- No database
- No authentication
- No Supabase dependency
- No backend required
- The Teacher Platform is an outbound link configured in `js/config.js`

## Project structure

```text
derese-getaneh-portfolio/
â”œâ”€â”€ index.html
â”œâ”€â”€ about.html
â”œâ”€â”€ academic-journey.html
â”œâ”€â”€ teaching.html
â”œâ”€â”€ research.html
â”œâ”€â”€ publications.html
â”œâ”€â”€ achievements.html
â”œâ”€â”€ projects.html
â”œâ”€â”€ student-impact.html
â”œâ”€â”€ legacy.html
â”œâ”€â”€ cv.html
â”œâ”€â”€ contact.html
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ config.js
â”‚   â””â”€â”€ main.js
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ icons/
â”‚   â””â”€â”€ images/
â”œâ”€â”€ content/
â”œâ”€â”€ cv/
â””â”€â”€ README.md
```

## Run locally

From this folder:

```powershell
python -m http.server 8000
```

Then open:

`http://localhost:8000`

Stop the server with `Ctrl+C`.

## Optional future updates

1. Add the approved teacher portrait to `assets/images/teacher/` if an approved image is available.
2. Add the real Teacher Platform URL in `js/config.js`.
3. Add a verified Facebook profile URL if one becomes available.
4. Add verified research or publication details if additional information becomes available.


1. Add the approved teacher portrait to `assets/images/teacher/`.
2. Add approved gallery/project images to their matching folders.
3. Add the verified CV PDF as:
   `cv/derese-getaneh-woldemariam-cv.pdf`
4. Add the real Teacher Platform URL in `js/config.js`.
5. Add a verified Facebook profile URL when available.
6. Add verified research/publication details when available.

## Important content rule

Only verified information should be added to the portfolio. Missing dates, titles, research details, publication metadata, certificates, and image captions should remain marked for later verification rather than being invented.

## Deployment

Because this is a static website, it can be deployed on a static hosting service such as GitHub Pages, Netlify, Vercel, or any standard web server. No server-side runtime is required.


