# Project 1: Static Webpage Design

**NOVA - Urban Architecture Studio** | DecodeLabs Frontend Development, Batch 2026

**Goal:** create a static webpage using HTML and CSS, with a clean and readable layout.
**Technology:** HTML5 and CSS3 only. No JavaScript.

## Requirements and how they are met

| Requirement | Implementation |
|---|---|
| Proper HTML structure | `<!DOCTYPE html>`, `lang`, charset, viewport, title and meta description |
| Semantic tags | `header`, `nav`, `main`, `section`, `article`, `figure`, `address`, `footer` |
| One `<h1>` and a correct heading order | One `h1` in the hero, then `h2` for sections and `h3` for cards (no skipped levels) |
| Headings, sections and images | Hero, stats, selected spaces, featured project, journal, contact, footer; five WebP images |
| Navigation with fewer than 5 items | Studio, Spaces, Journal, Contact (anchor links on one page) |
| External CSS only | `css/style.css`, no inline styles |
| Classes for styling, BEM naming | `.card`, `.card__image`, `.button--primary`, ... (IDs are used only as anchor targets) |
| DRY principle | One `.button` base class with modifiers, colours and fonts as CSS variables |
| Grid for page layout, Flexbox for components | Grid: hero, cards, featured, contact, footer. Flexbox: header, nav, stats, buttons, footer lists |
| Images | WebP format with `width`, `height` and `alt` on every image |
| Accessibility | Alt text, text contrast of at least 4.5:1, labelled form fields, visible focus outlines |

## Project structure

```
project-1/
├── index.html
├── css/style.css
└── images/ (hero, residential, workplace, cultural, casa-terra .webp)
```

## Notes

- This milestone is about structure and styling. Responsive breakpoints are added in Project 2 and interactivity in Project 3.
- The contact form is visual only (no script is used in this project).

## How to run

Open `index.html` in a browser.
