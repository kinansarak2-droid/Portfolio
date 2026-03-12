# Website Repo Structure
**Type:** Business Portfolio — Single Scroll Page
**Stack:** React / Next.js (App Router) + TypeScript + Tailwind CSS

---

## Philosophy

This structure follows a **semi-manual build** approach:
- All asset slots (graphics, illustrations, cursor, buttons) are pre-defined and ready to drop files into
- Each component folder contains a starter file and a `README` explaining exactly what belongs there
- Sections are independent — build and style each one separately, then assemble

---

## Full Directory Tree

```
/
├── public/
│   └── assets/
│       ├── graphics/               ← Custom graphics (SVG, PNG, WebP)
│       │   ├── hero/               ← Hero section visuals
│       │   ├── sections/           ← Per-section decorative graphics
│       │   └── backgrounds/        ← Full-bleed backgrounds / textures
│       │
│       ├── illustrations/          ← Custom illustrator exports
│       │   ├── icons/              ← Icon-scale illustrations (24–64px)
│       │   └── scenes/             ← Large scene illustrations
│       │
│       ├── cursor/                 ← Custom cursor image files
│       │   ├── default.png         ← Default state cursor
│       │   ├── pointer.png         ← Hover/link state cursor
│       │   ├── drag.png            ← Drag/grab state
│       │   └── hidden.png          ← Optional hidden state
│       │
│       ├── fonts/                  ← Self-hosted font files (.woff2, .woff)
│       │   └── [FontName]/
│       │       ├── Regular.woff2
│       │       ├── Medium.woff2
│       │       └── Bold.woff2
│       │
│       └── images/                 ← Photography / real images
│           ├── projects/           ← Project showcase photos
│           ├── team/               ← Team / headshot photos
│           └── og/                 ← Open Graph / social share images
│
├── src/
│   │
│   ├── app/                        ← Next.js App Router root
│   │   ├── layout.tsx              ← Root layout (fonts, metadata, cursor wrapper)
│   │   ├── page.tsx                ← Main scroll page (assembles all sections)
│   │   ├── globals.css             ← Tailwind base + global resets
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                     ← Reusable primitive components
│   │   │   │
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx          ← Main Button component
│   │   │   │   ├── Button.module.css   ← Scoped styles (if not pure Tailwind)
│   │   │   │   ├── Button.types.ts     ← Prop types / variants
│   │   │   │   └── index.ts            ← Re-export
│   │   │   │
│   │   │   ├── Cursor/
│   │   │   │   ├── Cursor.tsx          ← Custom cursor component
│   │   │   │   ├── Cursor.module.css   ← Cursor styles + animations
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Icon/
│   │   │   │   ├── Icon.tsx            ← SVG icon wrapper
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── Tag/
│   │   │       ├── Tag.tsx             ← Label / chip component
│   │   │       └── index.ts
│   │   │
│   │   ├── sections/               ← One folder per scroll section
│   │   │   │
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Hero.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── About/
│   │   │   │   ├── About.tsx
│   │   │   │   ├── About.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Work/
│   │   │   │   ├── Work.tsx
│   │   │   │   ├── ProjectCard.tsx     ← Sub-component
│   │   │   │   ├── Work.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Services/
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── ServiceItem.tsx
│   │   │   │   ├── Services.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Contact/
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── Contact.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── Footer/
│   │   │       ├── Footer.tsx
│   │   │       ├── Footer.module.css
│   │   │       └── index.ts
│   │   │
│   │   ├── layout/                 ← Structural / wrapping components
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Navbar.module.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── PageWrapper/
│   │   │       ├── PageWrapper.tsx     ← Wraps page with cursor, smooth scroll, etc.
│   │   │       └── index.ts
│   │   │
│   │   └── animations/             ← Animation wrapper components
│   │       ├── FadeIn/
│   │       │   ├── FadeIn.tsx          ← Scroll-triggered fade in
│   │       │   └── index.ts
│   │       ├── SlideIn/
│   │       │   ├── SlideIn.tsx
│   │       │   └── index.ts
│   │       └── Parallax/
│   │           ├── Parallax.tsx        ← Parallax scroll wrapper
│   │           └── index.ts
│   │
│   ├── hooks/                      ← Custom React hooks
│   │   ├── useCursor.ts            ← Cursor position + state tracking
│   │   ├── useScrollProgress.ts    ← Page scroll % tracking
│   │   ├── useInView.ts            ← Intersection Observer hook
│   │   └── useMediaQuery.ts        ← Responsive breakpoint detection
│   │
│   ├── styles/                     ← Global style tokens (not component styles)
│   │   ├── variables.css           ← CSS custom properties: colors, spacing, radii
│   │   ├── typography.css          ← Font-face declarations + type scale
│   │   ├── animations.css          ← Keyframe animations
│   │   └── cursor.css              ← Global cursor: none override
│   │
│   ├── lib/                        ← Pure utility functions
│   │   ├── utils.ts                ← General helpers (cn, clamp, etc.)
│   │   └── motion.ts               ← Framer Motion / animation presets
│   │
│   ├── data/                       ← Static content — edit these to update copy
│   │   ├── projects.ts             ← Project entries (title, description, image, link)
│   │   ├── services.ts             ← Services list
│   │   ├── nav.ts                  ← Navigation links
│   │   └── meta.ts                 ← Site metadata (title, description, OG)
│   │
│   └── types/                      ← Shared TypeScript types
│       ├── index.ts                ← Barrel export
│       ├── project.ts              ← Project type definition
│       └── nav.ts                  ← Nav link type
│
├── next.config.ts                  ← Next.js config (image domains, etc.)
├── tailwind.config.ts              ← Tailwind theme (colors, fonts, spacing)
├── tsconfig.json
├── package.json
├── .eslintrc.json
├── .gitignore
└── README.md
```

---

## Asset Drop-In Guide

### Custom Graphics
Drop files into `public/assets/graphics/`. Reference in Next.js using the `<Image>` component:
```tsx
<Image src="/assets/graphics/hero/hero-main.svg" alt="..." width={800} height={600} />
```

### Custom Illustrations
Drop Illustrator exports (SVG recommended) into `public/assets/illustrations/`.
For animated illustrations, use `scenes/`. For static icons use `icons/`.

### Custom Cursor
Drop PNG or SVG files into `public/assets/cursor/`. The `Cursor.tsx` component reads these and positions them with `position: fixed` + mouse tracking via the `useCursor` hook. Add `cursor: none` globally in `styles/cursor.css`.

### Custom Buttons
All button variants live in `src/components/ui/Button/Button.types.ts` as a variant map. Define visual variants there (`primary`, `ghost`, `outline`, `icon`) and implement each in `Button.tsx`. No need to create separate components for each button style.

---

## Suggested Build Order (for the assembly step)

1. **Styles first** — fill in `variables.css` with your color palette and type scale
2. **UI primitives** — build `Button`, `Cursor`, `Icon` before any sections
3. **Data** — populate `data/projects.ts`, `data/services.ts` with real content
4. **Sections** — build each section independently, test in isolation
5. **Assembly** — drop sections into `app/page.tsx` in scroll order
6. **Animations** — layer in `FadeIn`, `Parallax` wrappers last
7. **Polish** — cursor behavior, scroll transitions, mobile responsiveness

---

## Key Dependencies (recommended)

| Package | Purpose |
|---|---|
| `framer-motion` | Scroll animations, transitions |
| `tailwindcss` | Utility-first styling |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `@next/font` | Optimized font loading |
| `next-themes` | Dark/light mode (optional) |
