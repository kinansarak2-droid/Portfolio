# Graphics

Drop custom graphic assets here.

## Subfolders
- `hero/` — Main hero section visuals (SVG, PNG, WebP). Recommended: SVG for scalability.
- `sections/` — Decorative graphics tied to specific scroll sections.
- `backgrounds/` — Full-bleed background images or textures.

## Naming Convention
Use lowercase-kebab-case: `hero-main.svg`, `about-blob.png`, `bg-grain.webp`

## Usage in Next.js
```tsx
import Image from "next/image";
<Image src="/assets/graphics/hero/hero-main.svg" alt="Hero graphic" width={800} height={600} />
```
