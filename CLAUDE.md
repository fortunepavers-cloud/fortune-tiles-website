# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Static single-page marketing website for **Fortune Tiles & Pavers**, a Vadodara-based manufacturer of cement paving products. No build tools, frameworks, or package managers — pure vanilla HTML, CSS, and JavaScript.

## Running the Site

```powershell
# Start the local dev server (serves at http://localhost:5500)
powershell -File server.ps1
```

Alternatively, use the VS Code Live Server extension or any static file server. The `server.ps1` script is a simple PowerShell HTTP listener with no dependencies.

## Architecture

Single page with six anchor-linked sections in `index.html`:

| Section ID | Purpose |
|---|---|
| `#home` | Hero with stats and CTA buttons |
| `#about` | Company info and four info cards |
| `#products` | Tab-filtered product grid |
| `#why-us` | Competitor comparison table |
| `#applications` | Use-case icon cards |
| `#contact` | Contact info + inquiry form (frontend-only, no backend) |

**`styles.css`** — All styling. Design tokens live in `:root` CSS variables at the top of the file. Dark theme: primary blue `#1a6fc4`, accent orange `#e67e22`, dark backgrounds (`--dark`, `--dark-2`, `--dark-3`). Responsive breakpoints at 1024px, 768px, and 480px.

**`script.js`** — Five behaviours:
1. Navbar shrink + back-to-top button on scroll
2. Hamburger mobile menu toggle
3. Product tab filtering via `data-category` attributes on `.product-card` elements
4. Contact form submit handler (shows `.form-success`, then resets — no actual submission)
5. Scroll reveal using `IntersectionObserver` on cards

## Adding Products

Each product card in `#products` needs `data-category` set to one of: `vibro`, `rubber`, `tiles`, `blocks`. The tab buttons filter by matching this attribute. No JS changes needed when adding cards — the existing `tabBtns` listener handles all categories.

## External Dependencies (CDN only)

- Google Fonts: Playfair Display, Inter, Oswald, Raleway, Cinzel
- Font Awesome 6.5.0 (icons throughout)

## Contact Form

The form in `#contact` is **display-only** — it intercepts submit, shows a success message for 5 seconds, and resets. To wire up real submission, replace the handler in `script.js:51-57` with a fetch/POST to a backend or form service (e.g. Formspree, EmailJS).

## Business Details

- Company: Fortune Tiles & Pavers, Dashrath, Vadodara, Gujarat
- Email: fortunepavers@gmail.com | Web: www.fortunepavers.com
- Phone: 0265-2241224, +91 82389 64164, +91 98250 77602
- Representatives: Deep Patel (8238964164), Kishor Patel (9909217315)
