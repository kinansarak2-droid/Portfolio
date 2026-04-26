/**
 * PROJECT TEMPLATE
 * ─────────────────
 * Copy this file, rename it to your-project-slug.ts,
 * fill in every TODO, then import it in index.ts.
 *
 * Media goes in:  public/projects/YOUR-SLUG/
 *   cover.jpg        — 16:9 hero image
 *   gallery/01.jpg   — additional images (numbered)
 *   plan.svg         — optional floorplan
 */

import type { Project } from "@/types/project";

const project: Project = {
  // ── Identity ────────────────────────────────────────────────
  id:       "YOUR-SLUG",   // REQUIRED — unique, kebab-case
  slug:     "YOUR-SLUG",   // REQUIRED — matches folder name in public/projects/
  featured: false,
  status:   "completed",   // "completed" | "in-progress" | "concept"

  // ── Title & description (all 3 languages) ───────────────────
  title: {
    en: "TODO — Project Title (English)",
    fr: "TODO — Titre du projet (Français)",
    ar: "TODO — عنوان المشروع (العربية)",
  },
  subtitle: {                         // optional
    en: "TODO",
    fr: "TODO",
    ar: "TODO",
  },
  shortDesc: {                        // 1–2 sentences, for cards
    en: "TODO",
    fr: "TODO",
    ar: "TODO",
  },
  description: {                      // full text for detail page
    en: "TODO",
    fr: "TODO",
    ar: "TODO",
  },

  // ── Dates ───────────────────────────────────────────────────
  year:           2024,               // REQUIRED
  completionDate: "2024-01",          // optional, ISO 8601

  // ── Location ────────────────────────────────────────────────
  country:     { en: "TODO", fr: "TODO", ar: "TODO" },  // REQUIRED
  city:        { en: "TODO", fr: "TODO", ar: "TODO" },  // REQUIRED
  region:      { en: "TODO", fr: "TODO", ar: "TODO" },  // optional
  locationKey: "damascus",  // REQUIRED for filtering — pick from filters.ts LocationOption values:
                            // Syria:         "damascus" | "rural-damascus" | "homs" | "hama" |
                            //                "aleppo" | "lattakia" | "tartus" | "idlib" |
                            //                "daraa" | "suwayda" | "hasakah" | "quneitra"
                            // International: "kuwait" | "oman" | "egypt" | "lebanon"

  // ── Client ──────────────────────────────────────────────────
  client: { en: "TODO", fr: "TODO", ar: "TODO" },   // optional

  // ── Sport & surface ─────────────────────────────────────────
  sports:   ["TODO"],   // REQUIRED — e.g. ["basketball"]
  surfaces: ["TODO"],   // REQUIRED — e.g. ["hardwood"]
  indoor:   true,       // REQUIRED

  // ── Dimensions ──────────────────────────────────────────────
  areaSqm: 0,           // optional, m²
  courts:  1,           // optional

  // ── Categorisation ──────────────────────────────────────────
  tags:     ["TODO"],   // free-form, used for search
  category: "TODO",     // optional

  // ── Media ───────────────────────────────────────────────────
  coverImage: "/projects/YOUR-SLUG/cover.jpg",   // REQUIRED
  images: [
    "/projects/YOUR-SLUG/gallery/01.jpg",
    "/projects/YOUR-SLUG/gallery/02.jpg",
    // add more …
  ],
  svgPlan:  "/projects/YOUR-SLUG/plan.svg",      // optional
  videoUrl: undefined,                            // optional

  // ── Links ───────────────────────────────────────────────────
  externalUrl: undefined,                         // optional
};

export default project;
