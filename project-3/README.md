# Project 3: Interactive Web Elements

**NOVA - Urban Architecture Studio** | DecodeLabs Frontend Development, Batch 2026

**Goal:** add interactivity to a webpage using JavaScript.
**Technology:** HTML5, CSS3 and vanilla JavaScript (no frameworks or libraries).
This project builds on Projects 1 and 2 (same structure, same responsive layout) and adds the JavaScript layer in `js/script.js`.

## Requirements and how they are met

| Requirement | Feature |
|---|---|
| Buttons or toggles | Dark mode toggle in the header, hamburger menu button, featured project buttons |
| Basic user interaction | Click, keyboard (Escape) and form submit events handled with `addEventListener` |
| Dynamic content update | The featured project's title, description and image change without reloading the page; the contact form shows feedback messages |

## Features (Input - Process - Output)

| Feature | Input | Process | Output |
|---|---|---|---|
| Dark mode | Click the theme button | Flip the theme state and save it in `localStorage` | `.dark-mode` class on `<body>`, button `aria-pressed` and label updated, theme remembered after reload |
| Hamburger menu | Click the menu button, a link, Escape or outside the panel | Toggle the open state | `.is-open` class on the panel and button, `aria-expanded` updated |
| Featured project switcher | Click button 01, 02 or 03 | Pick the project from the `projects` array | Title, description and image updated with `textContent` and `setAttribute`, active button highlighted |
| Contact form feedback | Submit the form | Trim values, check for empty fields and a valid email | Error or success message, invalid fields marked, form reset on success |

## JavaScript standards followed

- `const` by default, `let` only when a value changes, no `var`
- `textContent` for text updates, never `innerHTML`
- Small single-purpose functions with clear names and one `init()` function
- `js-` prefix classes are used only as JavaScript hooks and never in CSS
- `is-` prefix classes (`.is-open`, `.is-active`, `.is-invalid`) describe visual state; JavaScript toggles them with `classList` and CSS handles the visuals
- No inline event handlers

## Project structure

```
project-3/
├── index.html
├── css/style.css
├── js/script.js
└── images/ (5 WebP images)
```

## How to run

Open `index.html` in a browser. Test: dark mode toggle (then refresh the page), hamburger menu below 768px, the 01 / 02 / 03 buttons in Featured Project, and the contact form.
