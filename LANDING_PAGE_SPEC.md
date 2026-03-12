# Landing Page Spec
**Project:** [Your studio / name]
**Version:** 1.0
**Designer:** [Your name]
**Last updated:** [Date]

> **How to use this document**
> This is the spec you hand me before I build anything.
> Fill in every `[placeholder]` with your real decisions.
> The more precise you are, the closer the first build will be to your vision.
> You can leave sections marked `[TBD]` and we'll fill them in together.

---

## 1. Vision & Vibe

**In 2–3 sentences, what should this site feel like?**
> Example: "It should feel like a high-end editorial magazine crossed with a brutalist art installation. Cold, precise, and a little unsettling — but in a way that makes you want to stay. Think Bottega Veneta website energy."

[Your description here]

**Reference sites (paste URLs):**
- [Site 1] — what I like about it: [what]
- [Site 2] — what I like about it: [what]
- [Site 3] — what I like about it: [what]

**Mood words (pick 5–8):**
[ ] Editorial   [ ] Minimal      [ ] Dark         [ ] Playful
[ ] Corporate   [ ] Experimental [ ] Warm         [ ] Cold
[ ] Brutalist   [ ] Luxury       [ ] Technical    [ ] Organic
[ ] Bold        [ ] Quiet        [ ] Kinetic       [ ] Swiss

---

## 2. Design Tokens

These are the single source of truth for the whole site.
Change them here and everything updates.

### Colors

| Token | Hex Value | Notes |
|-------|-----------|-------|
| Background | `#[hex]` | Main page background |
| Surface | `#[hex]` | Cards, elevated sections |
| Surface 2 | `#[hex]` | Deeper surfaces |
| Text | `#[hex]` | Primary body text |
| Text Muted | `#[hex]` | Secondary / label text |
| Accent | `#[hex]` | Primary highlight color |
| Accent 2 | `#[hex]` | Secondary pop color (optional) |
| Border | `#[hex]` | Subtle dividers |

### Typography

| Role | Font Name | Weight | Notes |
|------|-----------|--------|-------|
| Display / Heading | [Font] | [700 / 800] | Big headline font |
| Body | [Font] | [400 / 500] | Paragraph + UI text |
| Mono | [Font] | [400] | Labels, tags (optional) |

> Font files go in: `public/assets/fonts/[FontName]/`
> Reference sizes: Hero = clamp(60px → 140px), Section title = clamp(40px → 72px), Body = 16px

### Motion Defaults

| Property | Value | Notes |
|----------|-------|-------|
| Primary easing | `cubic-bezier(0.16, 1, 0.3, 1)` | Spring-like, use for reveals |
| Ease-in | `cubic-bezier(0.7, 0, 1, 0.3)` | Use for exits |
| Fast duration | `150ms` | Hover state changes |
| Base duration | `400ms` | Button transitions |
| Slow duration | `800ms` | Full section reveals |
| Hero duration | `1000–1200ms` | Headline entrance |

---

## 3. Global Elements

These appear everywhere and need to be specified once.

### Custom Cursor

**Do you want a custom cursor?** [ ] Yes  [ ] No

If yes:

| State | Image file | Size | Notes |
|-------|-----------|------|-------|
| Default | `cursor/default.png` | 40×40px | Normal browsing |
| Pointer | `cursor/pointer.png` | 40×40px | Hover over links/buttons |
| Drag | `cursor/drag.png` | 48×48px | Hover over draggable items |

**Cursor behavior:**
- Lag: [ ] None  [ ] Slight (recommended)  [ ] Heavy
- On hover: [ ] Scale up  [ ] Change image  [ ] Add glow  [ ] Fill with accent
- Blend mode: [ ] Normal  [ ] Difference (inverts against background)

> Example spec: "Outer ring 36px, 1.5px border, 30% opacity white. Inner dot 5px solid.
> On hover: ring scales to 60px, fills with accent at 10% opacity.
> Slight lag — outer ring lerps at 0.12 speed (about 2 frames behind).
> Blend mode: difference so it inverts against both light and dark content."

[Your cursor spec]

---

### Scroll Progress Bar

**Show scroll progress?** [ ] Yes  [ ] No

- Position: [ ] Top  [ ] Bottom  [ ] Side
- Height/Width: [2px]
- Color: [accent / custom: #hex]
- Style: [ ] Solid fill  [ ] Gradient

---

### Navigation

**Type:** [ ] Fixed top  [ ] Sticky  [ ] Hidden (appears on scroll up)

- Logo: [Your logo type — text / SVG file: `graphics/logo.svg`]
- Logo size: [px]
- Links: [list them] — separated by commas
- CTA button in nav: [ ] Yes  [ ] No — if yes, label: [text]
- On scroll: [ ] Background blur  [ ] Border appears  [ ] Background solid fill
- Link hover style: [ ] Underline draw  [ ] Color change  [ ] Underline slide

---

## 4. Sections

One block per section, in scroll order.

---

### SECTION 1 — Hero

**Purpose:** First impression. Sets the entire visual tone.

**Layout:**
- Height: [ ] Full viewport (100vh)  [ ] Taller  [ ] Content-height
- Content position: [ ] Bottom-left  [ ] Center  [ ] Top-left

**Elements (describe each):**

**Availability label / eyebrow:**
- Text: "[Available for projects — 2025]"
- Size: 11–12px, letter-spacing: 0.18em, uppercase
- Color: text-muted
- Animation: fades up after [0.2s] delay

**Main headline:**
- Text: "[Your headline — can be multi-line]"
- Size: clamp([60px], [10vw], [150px])
- Weight: [700 / 800]
- Line-height: [0.9 / 1 / 1.1]
- Letter-spacing: [-0.04em]
- Color highlights: word "[specific word]" → accent color / italic
- Animation: [ ] Word-by-word reveal from bottom  [ ] Letter-by-letter  [ ] Fade up  [ ] Clip wipe
  - Stagger: [80ms] between words
  - Start delay: [300ms]
  - Duration per word: [1000ms]

**Subtext:**
- Text: "[Your subtext — 1-2 sentences max]"
- Width: [380px max]
- Size: [16px]
- Color: text-dim
- Animation: fades up at [0.9s] delay

**CTA Buttons:**
- Button 1: Label "[See my work]" — Style: [Filled / Ghost / Outline] — Links to: [#work]
- Button 2: Label "[Get in touch]" — Style: [Ghost] — Links to: [#contact]
- Magnetic effect: [ ] Yes  [ ] No — strength: [0.35]

**Background:**
- Style: [ ] Pure color  [ ] Gradient  [ ] Ambient orbs (CSS blurred circles)  [ ] Image
- If orbs: how many? [3] — colors: [[accent], [accent-2], [purple]]  — opacity: [7%]
- Grain texture overlay: [ ] Yes (recommended)  [ ] No — opacity if yes: [3–5%]
- Animated: [ ] Yes (orbs drift slowly)  [ ] No

**Asset slots:**
- No images in default hero — if you want one: `graphics/hero/hero-main.[ext]`

---

### SECTION 2 — Work / Projects

**Purpose:** Showcase selected projects.

**Layout type:**
[ ] Expanding list (rows that open on click — shown in demo)
[ ] Grid of cards (images in a 2–3 column grid)
[ ] Full-width rows (each project is a wide horizontal band)
[ ] Masonry gallery

**Number of projects:** [3 / 4 / 5]

**Per-project row (if list layout):**
- Number: 01, 02, 03...
- Title: [size clamp(22px → 38px), weight 600]
- Category tag: [pill badge, text-muted, border]
- Open/close indicator: [ ] + / × button  [ ] Arrow  [ ] Chevron
- Hover behavior: [ ] Title turns accent color  [ ] Row background changes  [ ] Floating image preview follows cursor

**Floating image preview on hover:**
- [ ] Yes — image size: [300×200px], rotation: [-1deg], appears at cursor +28px X, -110px Y
- [ ] No

**Expanded state (when project is open):**
- Description text: [~2 sentences]
- Metadata: Year / Scope / Client
- Project thumbnail: [ ] Yes — slot: `images/projects/[name].jpg`  [ ] No (placeholder)
- Case study link: [ ] Yes  [ ] No

**Project data to fill in:**
```
Project 1:
  Title:       [         ]
  Category:    [         ]
  Year:        [         ]
  Scope:       [         ]
  Client:      [         ]
  Description: [         ]
  Image:       images/projects/[name].jpg

Project 2:
  [same fields]

Project 3:
  [same fields]
```

---

### SECTION 3 — About

**Purpose:** Who you are, in numbers and words.

**Layout:** [ ] 2-column (text + stats)  [ ] Full-width text only  [ ] Image + text

**Body text:**
- Content: "[Your about paragraph — 2-4 sentences. Note which words should be highlighted in white vs accent]"
- Size: clamp(18px → 26px), letter-spacing: -0.01em
- Word highlights: "[word]" → accent,  "[word]" → white

**Stats (if 2-column layout):**

| Stat | Number | Label |
|------|--------|-------|
| 1 | [7] | [Years of experience] |
| 2 | [80+] | [Projects shipped] |
| 3 | [24] | [Awards received] |
| 4 | [100%] | [Client satisfaction] |

- Number color: [accent]
- Counter animation on scroll: [ ] Yes  [ ] No
- Number size: clamp(52px → 80px), weight 700, letter-spacing: -0.05em

**Skills marquee (scrolling ticker):**
- [ ] Yes  [ ] No
- Items: [Figma, Illustrator, After Effects, Framer, Three.js...] — comma separated
- Speed: [ ] Slow (24s)  [ ] Medium (18s)  [ ] Fast (12s)
- Direction: [ ] Left  [ ] Right
- Pause on hover: [ ] Yes  [ ] No
- Divider style: [ ] ✦ star  [ ] /  [ ] ·  [ ] plain space

---

### SECTION 4 — Services

**Purpose:** What you offer.

**Layout type:**
[ ] Expanding accordion rows (shown in demo)
[ ] 2×2 card grid
[ ] Numbered list with hover expand

**Hover/open behavior (accordion):**
- Background fills on hover: [ ] Yes  [ ] No — fill: [var(--bg-1)]
- Title changes color: [ ] Yes — to: [accent]  [ ] No
- Accent underline sweeps full width on hover: [ ] Yes  [ ] No
- Open indicator: [ ] + / × spin  [ ] Arrow rotate  [ ] Chevron

**Services to list:**

```
Service 1:
  Number:      01
  Title:       [                    ]
  Description: [1-2 sentences       ]
  Tags:        [tag1, tag2, tag3    ]

Service 2:
  [same fields]

Service 3:
  [same fields]

Service 4:
  [same fields]
```

---

### SECTION 5 — Contact

**Purpose:** CTA. Make them reach out.

**Layout:** [ ] Centered full-width  [ ] Split (text left, form right)

**Headline:**
- Text: "[Got a project / in mind?]" — can be multi-line
- Italic word: [ ] Yes — which word: [in mind?]
- Italic color: [ ] Accent  [ ] Text  [ ] Custom

**Email address:**
- Email: [hello@yourdomain.com]
- Hover effect: [ ] Underline draws left to right  [ ] Color changes  [ ] Both
- Size: clamp(20px → 44px), weight 300

**CTA Button:**
- Label: "[Start a conversation ↗]"
- Style: [ ] Large filled (white bg, accent fill on hover)  [ ] Filled accent
- Magnetic: [ ] Yes  [ ] No
- Size: large — padding 20px 52px, font-size 16px

**Social links:**
- [ ] Yes — list them: [Instagram, Dribbble, LinkedIn, Read.cv]
- [ ] No

---

### SECTION 6 — Footer

**Left:** [© 2025 [Your name]. All rights reserved.]
**Right links:** [Instagram, Dribbble, Twitter / X, LinkedIn]

---

## 5. Animations Checklist

Mark everything you want — the more checked, the richer the build.

**Entrance animations (scroll-triggered):**
- [ ] Section labels fade up
- [ ] Headings slide up with stagger
- [ ] Cards fade up with stagger
- [ ] Stats count from 0 on scroll into view
- [ ] Images scale in from 95% → 100%

**Hover effects:**
- [ ] Buttons: shine/gloss sweep on hover
- [ ] Links: underline draws left to right
- [ ] Project rows: title color changes + line sweeps
- [ ] Project rows: floating image appears at cursor
- [ ] Service rows: background fills + title color changes
- [ ] Cards: 3D tilt based on mouse position
- [ ] Images: subtle zoom on hover

**Global / ambient:**
- [ ] Custom cursor with hover/click states
- [ ] Cursor lag (outer ring slightly behind dot)
- [ ] Scroll progress bar
- [ ] Hero background orbs drift slowly
- [ ] Grain texture overlay
- [ ] Marquee pauses on hover
- [ ] Navbar changes on scroll (blur + border)

**Page transitions (advanced — specify if wanted):**
- [ ] None
- [ ] Fade
- [ ] Clip wipe (ink-blot reveal)
- [ ] Slide in from bottom

---

## 6. Asset Checklist

Before the build, confirm which assets you'll drop in.
Mark each as **Ready**, **In Progress**, or **TBD**.

| Asset | File path | Status |
|-------|-----------|--------|
| Logo (SVG) | `graphics/logo.svg` | [Status] |
| Hero graphic (if any) | `graphics/hero/hero.svg` | [Status] |
| Cursor — default | `cursor/default.png` | [Status] |
| Cursor — pointer | `cursor/pointer.png` | [Status] |
| Project 1 image | `images/projects/[name].jpg` | [Status] |
| Project 2 image | `images/projects/[name].jpg` | [Status] |
| Project 3 image | `images/projects/[name].jpg` | [Status] |
| Body font | `fonts/[Name]/Regular.woff2` | [Status] |
| Display font | `fonts/[Name]/Bold.woff2` | [Status] |
| OG image | `images/og/og-default.jpg` | [Status] |

---

## 7. Notes & Open Questions

Use this section to flag anything uncertain or to leave notes for the build session.

```
[Note 1]: ...
[Note 2]: ...
[Question for build session]: ...
```

---

## HOW TO USE THIS WITH ME

1. **Fill in this document** — even partially is fine. Leave `[TBD]` on anything uncertain.
2. **Drop your assets** into the correct `public/assets/` subfolders.
3. **Send me the filled spec** (paste it in or share the file) and say which section to start with.
4. I'll build it and give you a preview link.
5. **Give feedback like a designer** — "the headline feels too tight," "the animation is too slow," "the card needs more shadow." You never need to mention code.
6. We iterate until it's exactly right.
7. Move to the next section and repeat.
