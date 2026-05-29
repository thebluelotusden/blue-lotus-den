# Blue Lotus Den

A minimalist, highly responsive portfolio website designed for **Blue Lotus Den** and built with modern vanilla HTML, CSS, and JavaScript. The site design is inspired by Cargo Collective's editorial *Wireframe F298* layout.

## Live Site
Deployable via GitHub Pages.

## Features
- **Sidebar Layout (Desktop)**: Left-hand navigation and brand column, leaving the right side open for content overlays.
- **Dynamic Overlays**: Clicking "Projects" or "Information" slides/fades panels on the right side over a solid white background with high-contrast typography, while leaving the sidebar visible underneath.
- **Dynamic Detail Views**: Selecting a project card launches a detail overlay displaying descriptions, detail images, and quotes.
- **Monospace Live Clock**: Real-time updating clock pinned at the top-right corner.
- **Responsive Stack (Mobile)**: On screen sizes `< 768px`, elements automatically stack into an elegant mobile-first flow, and overlay panels behave as full-screen slide-up sheets.
- **Zero Asset Dependencies**: Uses lightweight inline SVG placeholders for all project visuals to ensure fast loading times.

## File Structure
- `index.html`: Structural markup.
- `style.css`: Clean, standard CSS layout grids, flex containers, media queries, and animations.
- `app.js`: Real-time clock and history hash-routing logic.

## Typography
- Sans-serif: **Inter** (Google Fonts) as a modern neo-grotesque.
- Serif: **Cormorant Garamond** (Google Fonts) for italicized editorial headings and titles.

## Deployment Status
- Last deployment trigger: 2026-05-29T11:05:00-04:00
