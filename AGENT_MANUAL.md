# AGENT MANUAL — Sarakbi Sport Portfolio
> Last updated: 2026-04-26
> Written for: any AI agent continuing this build in a fresh session.
> Read this entire file before touching any code.

---

## 1. Who This Is For

**Client:** Kinan Sarak (`kinan.sarak@gmail.com`)
**Project:** Sarakbi Sport — a Syrian company that constructs sports courts (basketball, football, tennis, running tracks, etc.). This is their portfolio / showcase website.
**Kinan's background:** Architect + UX designer with animation skills and computational thinking. No coding experience — all code is written by the agent. He has very specific opinions on design quality and will ask for reverts if something looks wrong.
**Design philosophy:** "Business clean professional yet heavily experimental." Animations must feel intentional and sophisticated, not gimmicky.

---

## 2. Stack & Tooling

| Item | Value |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 + CSS variables |
| Animation | Framer Motion v11 |
| Fonts | Syne 800 (headings, `--font-syne`) + DM Sans (body, `--font-dm-sans`) — loaded via `next/font/google` |
| Deployment | Vercel (auto-deploys from GitHub `main` branch) |
| GitHub repo | `kinansarak2-droid/Portfolio` |
| Local folder | `C:\Users\Kinosh\Documents\Portfolio Github` (mounted at `/sessions/.../mnt/Portfolio Github`) |

**Key dependencies in `package.json`:**
```json
"next": "^15.0.0",
"react": "^19.0.0",
"framer-motion": "^11.0.0",
"clsx": "^2.0.0",
"tailwind-merge": "^2.0.0"
```

There are **no `node_modules`** in the sandbox. You cannot run `tsc --noEmit` or `next build` locally. Review code changes manually for correctness. Vercel runs the build on deploy.

---

## 3. Design Tokens

### Color Palette
```
Dark Indigo   #1C0282  ← primary background / brand
Bright Emerald #B3F0CA ← accent (football, parquet courts)
Bright Yellow  #FAF189  ← accent (basketball, running)
Bright Red     #FB9790  ← accent (parquet)
```

### CSS Variables (in `src/styles/variables.css` / `globals.css`)
```css
--font-syne:    /* Syne, loaded by next/font */
--font-dm-sans: /* DM Sans, loaded by next/font */
```

### Fonts
- **Headings:** Syne, weight 800, variable `--font-syne`
- **Body / labels:** DM Sans, variable `--font-dm-sans`

---

## 4. Repository File Map

```
/Portfolio Github
├── AGENT_MANUAL.md              ← THIS FILE
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
│
├── public/
│   ├── courts/
│   │   ├── basketball.svg       ← Illustrator export, exact (do NOT auto-fix)
│   │   ├── football.svg         ← Illustrator export, 3 named layers (see §8)
│   │   ├── parquet.svg
│   │   ├── multisport.svg
│   │   ├── running.svg
│   │   ├── all courts.ai        ← Illustrator source
│   │   ├── all courts.svg
│   │   ├── Basketball/Acrylic/  ← reference photos
│   │   ├── Soccer/Artificial turf/ ← reference photos (incl. pexels-tomfisk-3448250.jpg)
│   │   └── Tennis/              ← reference photos
│   └── assets/                  ← cursor, fonts, graphics (currently empty READMEs)
│
└── src/
    ├── app/
    │   ├── layout.tsx            ← Root layout: wraps with LocaleProvider, Cursor, Navbar
    │   ├── page.tsx              ← Home page: Hero + CourtsScroll + Work + About + Contact
    │   ├── globals.css
    │   └── projects/
    │       └── page.tsx          ← Archive page (see §9)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Cursor.tsx        ← Custom cursor
    │   │   └── Navbar.tsx        ← Navigation bar
    │   ├── sections/
    │   │   ├── Hero.tsx          ← Landing hero section
    │   │   ├── CourtsScroll.tsx  ← MAIN INTERACTIVE SECTION (see §7)
    │   │   ├── Work.tsx          ← Work section (placeholder)
    │   │   ├── About.tsx         ← About section (placeholder)
    │   │   └── Contact.tsx       ← Contact section (placeholder)
    │   ├── animations/
    │   │   ├── FadeIn/
    │   │   └── Parallax/
    │   └── ui/
    │       ├── Button/
    │       ├── Cursor/
    │       └── Icon/
    │
    ├── context/
    │   └── LocaleContext.tsx     ← i18n context (see §6)
    │
    ├── data/
    │   ├── filters.ts            ← Filter type system + FILTER_GROUPS + applyFilters (see §10)
    │   ├── projects/
    │   │   ├── index.ts          ← Master registry (currently empty array)
    │   │   └── _template.ts      ← Copy this to add a project
    │   ├── meta.ts
    │   ├── nav.ts
    │   ├── projects.ts           ← Legacy file (pre-refactor), may be ignored
    │   └── services.ts
    │
    ├── hooks/
    │   ├── useFilters.ts         ← Filter state manager (see §10)
    │   ├── useStats.ts           ← Live stats from filtered projects (see §10)
    │   ├── useCursor.ts
    │   ├── useInView.ts
    │   ├── useMediaQuery.ts
    │   └── useScrollProgress.ts
    │
    ├── i18n/
    │   ├── locales.ts            ← LOCALES, Locale type, LocalizedString, LOCALE_DIR
    │   ├── en.ts                 ← English translations (defines TranslationShape)
    │   ├── fr.ts                 ← French translations
    │   ├── ar.ts                 ← Arabic translations
    │   └── index.ts              ← Re-exports everything
    │
    ├── styles/
    │   ├── variables.css
    │   ├── typography.css
    │   ├── animations.css
    │   └── cursor.css
    │
    └── types/
        ├── index.ts
        └── project.ts            ← Project interface (see §5)
```

---

## 5. The `Project` Type (`src/types/project.ts`)

Every project that appears in the archive must satisfy this interface:

```typescript
interface Project {
  // Identity
  id:       string;           // unique slug, kebab-case
  slug:     string;           // URL segment: /projects/[slug]
  featured: boolean;
  status:   "completed" | "in-progress" | "concept";

  // Localised content (ALL THREE LANGUAGES REQUIRED)
  title:       LocalizedString;   // { en, fr, ar }
  subtitle?:   LocalizedString;
  description: LocalizedString;   // long text for detail page
  shortDesc:   LocalizedString;   // 1–2 sentences for cards

  // Dates
  year:            number;        // REQUIRED
  completionDate?: string;        // ISO 8601, e.g. "2024-06"

  // Location
  country:      LocalizedString;
  city:         LocalizedString;
  region?:      LocalizedString;
  locationKey?: string;           // REQUIRED for location filter
                                  // Valid values — Syria: "damascus" | "rural-damascus" |
                                  // "homs" | "hama" | "aleppo" | "lattakia" | "tartus" |
                                  // "idlib" | "daraa" | "suwayda" | "hasakah" | "quneitra"
                                  // International: "kuwait" | "oman" | "egypt" | "lebanon"

  // Client
  client?: LocalizedString;

  // Sport & surface — values must match filter option values in filters.ts
  sports:   SportType[];
  surfaces: SurfaceType[];
  indoor:   boolean;

  // Dimensions
  areaSqm?: number;               // m²
  courts?:  number;

  // Categorisation
  tags:      string[];
  category?: ProjectCategory;

  // Media
  coverImage: string;             // /projects/{slug}/cover.jpg
  images:     string[];           // gallery images
  svgPlan?:   string;             // optional floor plan
  videoUrl?:  string;
  externalUrl?: string;
}
```

**Sport values** (must match exactly): `"basketball"` `"football"` `"tennis"` `"handball"` `"running-track"` `"volleyball"` `"badminton"` `"other-sports"` `"support-works"` (+ open string for new ones)

**Surface values** (must match filter chips): `"acrylic"` `"artificial-grass"` `"polyurethane"` `"wood"` `"rubber-tiles"` `"other"` (+ open string for new ones)

---

## 6. i18n System

Three locales: `en` (default) | `fr` | `ar` (RTL).

### Types
```typescript
type Locale = "en" | "fr" | "ar";
type LocalizedString = Record<Locale, string>;
// e.g. { en: "Damascus", fr: "Damas", ar: "دمشق" }
```

### Context usage (inside any Client Component)
```tsx
const { t, locale, dir, setLocale, locales } = useLocale();
// t.nav.home          → "Home" / "Accueil" / "الرئيسية"
// t.projects.noResults
// t.filters.yearFrom
// t.stats.area
// dir → "ltr" or "rtl" (use as <main dir={dir}>)
```

### Resolving a LocalizedString on a project field
```tsx
import { localise } from "@/context/LocaleContext";
localise(project.title, locale)  // → "Basketball Court Riyadh"
// Falls back to English if translation is missing.
```

### Translation file structure (`src/i18n/en.ts`)
```
t.nav.{home|projects|about|contact}
t.projects.{pageTitle|pageSubtitle|backToHome|noResults|filterLabel|clearFilters|clearGroup}
t.projects.card.{viewProject|year|location|surface|area|sport|client|status}
t.projects.status.{completed|inProgress|concept}
t.filters.{yearFrom|yearTo|locationPlaceholder|locationAllGroups|activeCount}
t.stats.{projects|area|areaUnit|locations|topSport|topSurface|noData}
t.common.{all|loading|error}
```

**Rule:** Any new translation key must be added to all three files (`en.ts`, `fr.ts`, `ar.ts`) simultaneously. The `TranslationShape` type is inferred from `en.ts` — TypeScript will error if `fr.ts` or `ar.ts` don't match exactly.

---

## 7. CourtsScroll — The Main Hero Section (`src/components/sections/CourtsScroll.tsx`)

This is the most complex and important component. Read carefully before editing.

### Courts array (COURTS)
5 courts: `basketball`, `football`, `parquet`, `multisport`, `running`. Each has:
- `id`, `label`, `surface` (string description), `tag` (standard body), `accent` (hex color)
- `svgSrc` — path to SVG in `/public/courts/`
- `photoSrc` — real photo background shown after click (only football has one; others are `null`)

### SVG rendering approach
Courts are **not** rendered as `<img src={svgSrc}>`. Instead:
- The **background layer** of each SVG is shown as a separate `<img>` element
- The **outlines** for the football court are rendered as inline `<svg>` with `motion.path` elements for pathLength animation
- This allows independent layer control and framer-motion path drawing

### Scroll-driven expansion
Each `CourtPanel` uses `useScroll` with its `panelRef`:
```typescript
const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "end start"] });
const heightPct      = useTransform(scrollYProgress, [0.18, 0.52], ["50%", "100%"]);
const edgeOpacity    = useTransform(scrollYProgress, [0.18, 0.45], [1, 0]);
const infoOpacity    = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
const infoY          = useTransform(scrollYProgress, [0.25, 0.45], [24, 0]);
const counterOpacity = useTransform(scrollYProgress, [0.32, 0.49], [0, 1]);
```
Court height expands from 50% → 100% as user scrolls through. All opacity/Y derives from `scrollYProgress` (a `MotionValue<number>`) — **never** from `heightPct` (which is `MotionValue<string>` and cannot be used in further transforms).

### isExpanded state
```typescript
useMotionValueEvent(scrollYProgress, "change", (v) => {
  setIsExpanded(v >= 0.51);
  if (v < 0.3) { /* reset football state */ }
  if (v < 0.38) setProjectsOpen(false);
});
```

### Hover → sonar pulse
After 500ms hover while `isExpanded && !projectsOpen`, `showPulse` becomes true. Three concentric rings animate (scale 0.4→2.2, opacity 0.7→0) to hint the court is clickable.

### Click flow
**Football (has `photoSrc`):**
1. First click: `bgPhase` → `"photo"`, `drawKey` increments → triggers path drawing animation. After 1500ms, `toolbarReady` → `true` → `projectsOpen` → `true`
2. Second click (already in photo state): toggles `projectsOpen`

**Other courts:** Click toggles `projectsOpen` immediately.

### Football path drawing (FOOTBALL_OUTLINES array)
10 SVG path `d` strings with per-path `delay` values. Rendered as `motion.path` elements. Key `drawKey` is incremented on each click to re-trigger the animation:
```tsx
initial={{ pathLength: isFirstRender ? 1 : 0, opacity: isFirstRender ? 1 : 0 }}
animate={{ pathLength: 1, opacity: 1 }}
transition={{ pathLength: { duration: 1.1, delay: p.delay, ease: "easeInOut" } }}
```

### Toolbar (project squares)
A `div` that slides up from the bottom when `projectsOpen` is true. Currently contains 6 placeholder `PROJECTS` squares in a CSS grid. **Not yet wired to real project data.** This is a known pending task.

### Active court tracking
`IntersectionObserver` with `threshold: 0.4` watches `[data-court-index]` divs and updates `activeIndex` in the parent `CourtsScroll` component. This drives the side-nav dots and the sticky accent-color label.

---

## 8. SVG Layer System (football.svg)

The football court SVG was exported from Adobe Illustrator with **three named layers**:

| Layer ID | Purpose | When shown |
|---|---|---|
| `#Background` | Dark green turf (st0=#013D0B, st1=#026615) | Always (before + after click) |
| `#Background_on_click` | Contains `<image xlink:href="Images/pexels-tomfisk-3448250.jpg">` | After click |
| `#Outlines` | Red stroke lines (stroke: #E02239, stroke-width: 2.8346) | Always |

**Critical:** The photo file must be placed at `public/courts/Images/pexels-tomfisk-3448250.jpg`. The file currently exists at `public/courts/Soccer/Artificial turf/pexels-tomfisk-3448250.jpg` — it needs to be copied/symlinked to the correct path.

In the React component, these three layers are reconstructed as separate elements:
- `<img src="/courts/football.svg">` — renders the background + outlines together (before click)
- A real photo `<img>` — shown after click (`bgPhase === "photo"`)
- Inline `<svg>` with `motion.path` — overlaid at all times for drawing animation

**Rule:** Never auto-edit the SVG files. Kinan exports them from Illustrator and they must be used exactly as exported. If he provides an updated SVG, replace the file content wholesale.

---

## 9. Projects Archive Page (`src/app/projects/page.tsx`)

The archive page is a **skeleton** — fully wired to data and filters but with **no visual design yet** (using inline style props for layout only). When Kinan is ready to design it, replace the inline styles with Tailwind classes.

### Architecture
```
ProjectsPage
  ├── LanguageSwitcher (locale buttons)
  ├── FilterToolbar
  │   ├── [for each group in FILTER_GROUPS]
  │   │   ├── ChipsGroup    (sport, surface)
  │   │   ├── SegmentGroup  (setting: All/Outdoor/Indoor)
  │   │   ├── RangeGroup    (year: dual-handle slider)
  │   │   └── LocationGroup (grouped <select>)
  │   └── StatsPanel (5 live stats)
  ├── [results count]
  └── ProjectGrid
      └── ProjectCard (per project)
```

### Data flow
```typescript
const filters = useFilters();
const visible = useMemo(() => applyFilters(allProjects, filters.state), [filters.state]);
const stats   = useStats(visible);
```

### useFilters return API (IMPORTANT — old API is gone)
```typescript
filters.state                              // FilterState object
filters.toggleChip(groupId, value)         // chips
filters.isChipActive(groupId, value)       // → boolean
filters.setSegment(groupId, value)         // segment
filters.getSegment(groupId)                // → string
filters.setRange(groupId, [lo, hi])        // range
filters.getRange(groupId)                  // → [number, number]
filters.getRangeBounds(groupId)            // → [number, number] (min/max from definition)
filters.setLocation(value)                 // location dropdown
filters.clearLocation()
filters.clearGroup(groupId)
filters.clearAll()
filters.hasAnyActive                       // → boolean
```
**Do NOT use:** `filters.active`, `filters.toggle`, `filters.isActive`, `filters.clear` — these are the old API and no longer exist.

### useStats return shape
```typescript
stats.count        // number of matching projects
stats.totalArea    // number | undefined (sum of areaSqm)
stats.locations    // number (unique locationKeys)
stats.topSport     // string | undefined (most frequent sport value)
stats.topSurface   // string | undefined (most frequent surface value)
```

---

## 10. Filter System (`src/data/filters.ts`)

### 5 groups in FILTER_GROUPS (in order)
1. **sport** — type: `chips`, field: `"sports"`, multi: true, 9 options
2. **year** — type: `range`, field: `"year"`, min: 2001, max: 2026, step: 1
3. **surface** — type: `chips`, field: `"surfaces"`, multi: true, 6 options (with color swatches)
4. **setting** — type: `segment`, field: `"indoor"`, 3 options (all/outdoor/indoor)
5. **location** — type: `location`, field: `"locationKey"`, 2 groups (Syria 12 cities, International 4)

### How to add a new filter option
1. Add a new entry to the relevant `options` array in `FILTER_GROUPS`
2. Add the label to all 3 locale objects (en/fr/ar) directly in the `options` entry (they are `LocalizedString` objects inside `filters.ts` — not in the `i18n/` files)
3. The hooks and UI adapt automatically

### How to add a new filter group
1. Add a new object to `FILTER_GROUPS` (type: `"chips"` | `"segment"` | `"range"` | `"location"`)
2. Any UI chrome labels (like a new "Clear" button text) go in the `i18n/` files
3. Extend `applyFilters()` if the new group type needs special logic beyond the 4 existing types

### FilterState shape
```typescript
{
  chips:    Record<string, Set<string>>;     // e.g. { sport: Set{"basketball"}, surface: Set{} }
  segments: Record<string, string>;           // e.g. { setting: "outdoor" }
  ranges:   Record<string, [number, number]>; // e.g. { year: [2018, 2024] }
  location: string;                           // e.g. "damascus" or "" (no filter)
}
```

---

## 11. How to Add a New Project

1. **Copy the template:**
   `src/data/projects/_template.ts` → `src/data/projects/your-project-slug.ts`

2. **Fill in all fields.** Required ones are marked `// REQUIRED`. Pay special attention to:
   - `locationKey` — must match a value from `filters.ts` LocationOption values
   - `sports` / `surfaces` — must match filter option values exactly (e.g. `"artificial-grass"` not `"artificial turf"`)
   - All three languages for every `LocalizedString` field

3. **Add media:**
   Create folder `public/projects/your-project-slug/`
   Drop in: `cover.jpg` (16:9), `gallery/01.jpg`, `gallery/02.jpg`, …, optionally `plan.svg`

4. **Register the project:**
   In `src/data/projects/index.ts`:
   ```typescript
   import yourProject from "./your-project-slug";
   // …
   export const projects: Project[] = [
     yourProject,
     // …
   ];
   ```

The projects page, filters, and stats all update automatically.

---

## 12. Pending Tasks (as of 2026-04-26)

### High priority
- **Football photo path:** The football SVG references `Images/pexels-tomfisk-3448250.jpg`. The file exists at `public/courts/Soccer/Artificial turf/pexels-tomfisk-3448250.jpg`. It needs to also be accessible at `public/courts/Images/pexels-tomfisk-3448250.jpg`. Copy or move the file.
- **Real project data entry:** Kinan has a folder `C:\Users\Kinosh\My Drive\Sarakbi Website\projects` with real project information. This needs to be entered as individual `src/data/projects/SLUG.ts` files.
- **Toolbar wired to real projects:** The click toolbar inside `CourtsScroll` currently shows 6 placeholder squares. It should show real project thumbnails filtered by the court type being viewed.

### Medium priority
- **Projects page visual design:** The archive page `src/app/projects/page.tsx` is fully functional but has zero visual styling. When Kinan provides Figma mockups or direction, replace the inline style props with Tailwind classes matching the design system.
- **Surface variant system:** Kinan asked how to showcase multiple surface options per court type (e.g. tennis: clay vs. acrylic). Recommended approach: add a `currentSurface` state to `CourtPanel` and show surface chip selectors; clicking a surface updates the court SVG background image. Not yet implemented.
- **Mobile / tablet responsive design:** Not started. Kinan wants to do Figma designs first before implementing.
- **Work, About, Contact sections:** Currently placeholder components. Need design and content.

### Low priority
- **`[slug]` project detail page:** `src/app/projects/[slug]/page.tsx` does not exist yet. Needs to be created to show individual project detail views.
- **Translation completeness:** All filter option labels (sport names, surface names, location names) live in `filters.ts` as `LocalizedString` objects. The Arabic and French in `filters.ts` should be reviewed for accuracy by a native speaker.

---

## 13. Known Decisions & Constraints

**Never auto-edit SVG files.** Kinan controls all SVG exports from Illustrator. The agent should use them exactly as-is.

**No mouse parallax on courts.** An earlier version had parallax on mouse move; it caused misalignment between SVG background and outlines. It was removed. Do not add it back.

**`MotionValue<string>` cannot chain into transforms.** If you need opacity/Y values derived from scroll, derive them directly from `scrollYProgress` (a `MotionValue<number>`) with numeric input/output ranges. Do not chain off `heightPct` (which is `MotionValue<string>`).

**All imports at top of file.** TypeScript requires all `import` / `import type` statements at the file top. Never place them mid-file.

**"use client" directive** is required on any file that uses hooks (`useState`, `useEffect`, `useContext`, etc.) or Framer Motion. Next.js App Router defaults to Server Components.

**Path alias** `@/` maps to `src/`. Use it everywhere: `import X from "@/components/..."`.

**Tailwind vs inline styles:** The current codebase mixes both. `CourtsScroll` uses inline styles heavily (animation values must be inline for Framer Motion). The projects page also uses inline styles as a placeholder. When designing, prefer Tailwind classes for static styling and inline only for motion values.

**RTL support:** When Arabic is active, `dir === "rtl"`. Apply `dir={dir}` to the outermost `<main>` element. Use logical CSS properties (`margin-inline-start`, `padding-inline-end`) rather than `margin-left/right` for RTL-safe spacing.

---

## 14. Running / Deploying

```bash
# Development (run in the project folder)
npm run dev          # http://localhost:3000

# Production build (Vercel handles this automatically)
npm run build
npm run start

# Type check
npx tsc --noEmit     # requires node_modules to be installed
```

**Vercel deployment:** Push to `main` branch. Vercel auto-deploys. Framework setting must be "Next.js" in Vercel project settings. The `vercel.json` file is present for any custom config.

---

## 15. Quick Reference Cheatsheet

```typescript
// i18n
const { t, locale, dir, setLocale } = useLocale();
localise(project.city, locale)   // → string

// Filters
const filters = useFilters();
const visible = applyFilters(allProjects, filters.state);
filters.toggleChip("sport", "basketball");
filters.setSegment("setting", "outdoor");
filters.setRange("year", [2018, 2024]);
filters.setLocation("damascus");
filters.clearAll();

// Stats
const stats = useStats(visible);
// stats.count | stats.totalArea | stats.locations | stats.topSport | stats.topSurface

// Scroll animation
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const val = useTransform(scrollYProgress, [0.18, 0.52], [0, 1]);   // always use numbers

// Adding a project
// 1. Copy _template.ts  →  ./your-slug.ts
// 2. Fill fields + add media to public/projects/your-slug/
// 3. Import + push to projects[] in index.ts
```
