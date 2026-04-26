import type { LocalizedString } from "@/i18n";

/* ─────────────────────────────────────────────────────────────
   PROJECT TYPE
   Every field that could ever appear on a project is defined here.
   Optional fields (?) can be omitted safely — the UI handles nulls.
   Add new fields here first, then mirror them in the data files.
───────────────────────────────────────────────────────────── */
export interface Project {
  // ── Identity ──────────────────────────────────────────────
  id:       string;          // unique slug, e.g. "riyadh-basketball-2024"
  slug:     string;          // URL segment: /projects/[slug]
  featured: boolean;
  status:   ProjectStatus;

  // ── Localised content ─────────────────────────────────────
  title:       LocalizedString;
  subtitle?:   LocalizedString; // optional tagline under the title
  description: LocalizedString; // long text for the detail page
  shortDesc:   LocalizedString; // 1–2 sentences for cards

  // ── Dates ─────────────────────────────────────────────────
  year:            number;   // completion / expected year
  completionDate?: string;   // ISO 8601, e.g. "2024-06"

  // ── Location ──────────────────────────────────────────────
  country:      LocalizedString;
  city:         LocalizedString;
  region?:      LocalizedString;  // governorate / state / emirate
  locationKey?: string;           // matches LocationOption.value in filters.ts
                                  // e.g. "damascus" | "kuwait" | "aleppo"

  // ── Client ────────────────────────────────────────────────
  client?: LocalizedString;

  // ── Sport & surface ───────────────────────────────────────
  // Values must match FilterOption.value in filters.ts
  sports:   SportType[];
  surfaces: SurfaceType[];
  indoor:   boolean;

  // ── Dimensions ────────────────────────────────────────────
  areaSqm?: number;          // total surface area m²
  courts?:  number;          // number of courts / pitches

  // ── Categorisation ────────────────────────────────────────
  // TODO: confirm top-level category taxonomy with user
  tags:      string[];       // free-form fallback / search
  category?: ProjectCategory;

  // ── Media ─────────────────────────────────────────────────
  coverImage: string;        // /projects/{slug}/cover.jpg
  images:     string[];      // /projects/{slug}/gallery/01.jpg …
  svgPlan?:   string;        // /projects/{slug}/plan.svg
  videoUrl?:  string;        // Vimeo / YouTube embed URL

  // ── Links ─────────────────────────────────────────────────
  externalUrl?: string;
}

/* ─── Status ──────────────────────────────────────────────── */
export type ProjectStatus = "completed" | "in-progress" | "concept";

/* ─── Sport types ─────────────────────────────────────────── */
// TODO: extend with all sports Sarakbi builds for
export type SportType =
  | "basketball" | "football" | "tennis" | "volleyball"
  | "badminton"  | "running"  | "multisport" | "padel"
  | "swimming"
  | string; // open — add in data without a type change

/* ─── Surface types ───────────────────────────────────────── */
// TODO: extend with all surfaces
export type SurfaceType =
  | "hardwood" | "synthetic-wood" | "acrylic"
  | "artificial-turf" | "natural-grass" | "clay"
  | "rubber"   | "polyurethane"  | "concrete" | "mosaic"
  | string; // open

/* ─── Category ────────────────────────────────────────────── */
// TODO: confirm top-level categories
export type ProjectCategory =
  | "indoor-court" | "outdoor-court" | "stadium"
  | "community"    | "school"        | "private"
  | string; // open
