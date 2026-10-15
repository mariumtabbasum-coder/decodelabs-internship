# Project 2: Responsive Web Layout

**NOVA - Urban Architecture Studio** | DecodeLabs Frontend Development, Batch 2026

**Goal:** build a responsive webpage that works across different screen sizes.
**Technology:** HTML5 and CSS3 only. No JavaScript.
This project builds on Project 1 (same structure and design) and adds the responsive layer.

## Requirements and how they are met

| Requirement | Implementation |
|---|---|
| Viewport meta tag | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` (zoom is never disabled) |
| Mobile-first base CSS | Base styles target mobile, larger screens are added with `min-width` media queries |
| CSS media queries | Breakpoints at 480px, 768px and 1024px |
| Grid (macro) and Flexbox (micro) | Grid for hero, cards, featured, contact and footer. Flexbox for header, nav, stats and buttons |
| Fluid units | `rem`, `%`, `clamp()` for type and spacing; card grids use `repeat(auto-fit, minmax(250px, 1fr))` |
| Responsive navigation | Hamburger menu built with the HTML **Popover API**, no JavaScript |
| Accessible touch targets and zoom | Buttons, links, icons and form fields are at least 44 x 44px; pinch zoom is allowed |
| Proper spacing and alignment | Consistent spacing scale, no horizontal scrolling from 320px upwards |

## How the layout changes

| Screen | Layout |
|---|---|
| Below 480px | Single column, stacked stats, hamburger menu |
| 480px and up | Stats in a row, footer in 2 columns |
| 768px and up | Full navigation in the header, two-column hero, featured and contact sections |
| 1024px and up | Taller hero, four-column footer |

## Project structure

```
project-2/
├── index.html
├── css/style.css
└── images/ (5 WebP images)
```

## Notes

- The popover menu closes with the close button, the Escape key or by tapping outside the panel. Tapping a link scrolls the page but leaves the panel open, because closing it on link click needs JavaScript (which is added in Project 3).

## How to run

Open `index.html` in a browser, then resize the window or use the device toolbar in Chrome DevTools (F12) to test 320px, 375px, 768px, 1024px and 1440px.
