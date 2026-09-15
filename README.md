# 🕯️ The Conjuring — Official Movie Website

> *"A farmhouse. A crawl-space behind the closet wall. Two investigators who were asked to look."*

An official movie website for a 1970s-set supernatural horror film — built entirely from AI-generated creative assets, and coded from scratch with nothing but plain HTML, CSS, and JavaScript. No frameworks. No build step. Just a flashlight, some film grain, and a room nobody was supposed to find.

**[→ View the live site](#)** &nbsp;•&nbsp; **[→ Scan the QR code](#)**

---

## 📖 About

*The Conjuring* follows paranormal investigators Ed and Lorraine Warren as they're called to an isolated farmhouse where a family is being terrorized by a presence tied to the accused witch Bathsheba. Behind a bricked-over closet wall, they find a hidden crawl-space room — its walls covered floor to ceiling in a single scrawled line — and what happens next is the reason the Warrens stopped taking cases without a priest on call.

This site is the official web presence for that film: synopsis, characters, production design, a mood board, the score, and the scene itself.

Built as an individual assignment for **AI & Creativity — Generative AI Film Production** (BSc Multimedia). Every visual asset — storyboard, mood board, characters, production design, poster, and scene — was generated through layered AI prompts and kept consistent across shots; the website itself is 100% hand-written code.

---

## ✨ Features

| | |
|---|---|
| 🔦 **Flashlight cursor** | A soft radial glow follows the pointer on desktop, revealing texture in the dark — like holding the flashlight from the storyboard yourself |
| 🎞️ **Cinematic scroll-snap** | Each section locks into place as you scroll, smooth in both directions, like cutting between shots |
| ✨ **Particle drift** | Slow-drifting embers lit by the cursor's glow on the hero and hidden-room sections |
| 🧲 **Magnetic buttons** | CTAs subtly pull toward the cursor on hover |
| 📼 **Film-grain overlay** | A constant, low-opacity 8-bit grain across the whole site for that "shot on film" feel |
| 🌀 **3D tilt cards** | Character and gallery cards respond to mouse position with subtle depth |
| 🖼️ **Room reveal** | The hidden room's four camera angles crossfade into each other as you scroll through the section |
| ♿ **Reduced-motion safe** | Every single effect above has a static fallback for `prefers-reduced-motion` |
| 📱 **Fully responsive** | Fluid type via `clamp()`, tested from 320px phones to 1920px ultra-wide, real touch-swipe support throughout |

---

## 🗂️ Pages

| Page | What's there |
|---|---|
| `index.html` | Hero — title reveal, Ken Burns farmhouse loop, "Watch the Scene" CTA |
| `synopsis.html` | The story, with scroll-pinned mood-board imagery |
| `characters.html` | Ed & Lorraine — full front/side/back/close-up turntables |
| `hidden-room.html` | The production design — four explorable camera angles |
| `gallery.html` | Mood board by category (location, lighting, props, costume, texture) + full storyboard |
| `watch.html` | The two-minute scene, plus both poster crops |
| `sound.html` | The original score and end-credits song |
| `credits.html` | In-world cast, AI tools used, and the process behind it |

---

## 🎨 Design System

**Color palette** — story-derived, not decorative:

| Swatch | Name | Hex | Used for |
|---|---|---|---|
| ⬛ | Abyss Black | `#0B0C10` | Background, dominant field |
| 🟥 | Dried Blood Crimson | `#730A07` | CTAs, hover states, key reveals |
| 🟦 | Ghostly Pale Blue | `#A8B8C4` | Dividers, spirit/cold content |
| 🟫 | Barnwood Brown | `#5C4033` | Supporting neutral, wood textures |
| ⬜ | Ashen Off-White | `#EAE6DF` | Body text |

**Typography:** [Bevan](https://fonts.google.com/specimen/Bevan) for headlines (a distressed 1970s editorial serif), [Archivo](https://fonts.google.com/specimen/Archivo) for body and UI (clean grotesque sans).

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup, no templating engine
- **CSS3** — custom properties, `clamp()` fluid type, `scroll-snap`, `dvh`/`svh` units, `@media (prefers-reduced-motion)`
- **Vanilla JavaScript (ES6+)** — no dependencies, no frameworks, no bundler
- **Google Fonts** — Bevan + Archivo
- **Vercel** — zero-config static hosting

No React. No Next.js. No npm install required to run it.

---

## 📁 Project Structure

```
the-conjuring-site/
├── index.html, synopsis.html, characters.html, hidden-room.html,
│   gallery.html, watch.html, sound.html, credits.html
├── css/
│   └── style.css
├── js/
│   ├── cursor.js          # flashlight cursor
│   ├── particles.js       # ember/dust drift
│   ├── reveal.js           # scroll reveals, heading animation, room crossfade
│   ├── carousel.js         # character turntable + swipe
│   ├── tilt.js              # 3D card tilt
│   ├── magnetic.js          # magnetic button hover
│   ├── transitions.js       # cross-page view transitions
│   └── flash-beat.js        # the one deliberate jump-scare beat
└── assets/
    ├── hero/  characters/  hidden-room/  gallery/  storyboard/
    ├── watch/  sound/  palette/  qr/
    ├── favicon.ico  og-image.jpg
```

---

## 🚀 Running Locally

No installation required — this is a static site.

```bash
git clone https://github.com/your-username/the-conjuring-site.git
cd the-conjuring-site

# Option 1: VS Code
# Install the "Live Server" extension, right-click index.html → "Open with Live Server"

# Option 2: Node
npx serve .

# Option 3: Python
python3 -m http.server 8000
```

Then open `http://localhost:8000` (or whatever port your tool reports).

---

## 🕸️ Credits & AI Tools

- **ChatGPT** — mood board reference imagery, color palette, and color-meaning writeups
- **Google Flow / Nano Banana 2** — character photography and video (Ed & Lorraine turntables)
- **Gemini** — hidden-room production design (front/back/side/floor-plan)
- **Claude** — storyboard sketches, site design direction, and every line of site code

---

## 📜 License & Note

The code in this repository (HTML/CSS/JS) is shared under the MIT License — feel free to learn from or reuse the *code*.

This is a student production for an individual BSc Multimedia assignment. All character designs, imagery, and narrative content are original AI-generated works created for coursework and are not affiliated with, or intended to represent, any existing commercial film franchise.

---

## 🎓 Assignment Context

**Module:** AI & Creativity — Generative AI Film Production
**Task:** Official movie website (individual assignment)
**Deadline:** 10th September 2026

*Scan the QR code in the footer to open the live site.*
