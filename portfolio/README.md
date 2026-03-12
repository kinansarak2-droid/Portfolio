# Portfolio

Business portfolio — single scroll page.
**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Asset Drop-In

| Asset Type | Folder |
|---|---|
| Custom graphics | `public/assets/graphics/` |
| Illustrations | `public/assets/illustrations/` |
| Cursor images | `public/assets/cursor/` |
| Fonts | `public/assets/fonts/[FontName]/` |
| Project photos | `public/assets/images/projects/` |

See `README.md` files inside each folder for details.

---

## Content

Edit content in `src/data/` — no code changes needed for copy updates:
- `meta.ts` — page title, description, OG
- `nav.ts` — navigation links
- `projects.ts` — portfolio projects
- `services.ts` — services list

---

## Design Tokens

All colors, fonts, and spacing live in `src/styles/variables.css`.
Update the CSS custom properties there to apply changes globally.
