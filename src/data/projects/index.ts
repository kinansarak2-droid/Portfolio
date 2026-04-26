/**
 * PROJECTS DATA — main registry
 * ─────────────────────────────
 * Each project lives in its own file: ./PROJECT_SLUG.ts
 * Import it here and add it to the array.
 *
 * Ordering: featured projects first, then reverse-chronological.
 * The page handles display ordering via the filter/sort system.
 *
 * HOW TO ADD A NEW PROJECT:
 *  1. Copy _template.ts → ./your-project-slug.ts
 *  2. Fill in all fields. Required fields are marked with // REQUIRED
 *  3. Import it below and add to the `projects` array.
 *  4. Drop media into public/projects/your-project-slug/
 */

import type { Project } from "@/types/project";

// ── Import individual project files here ──────────────────────
// import riyadhBasketball2024 from "./riyadh-basketball-2024";
// import beirutFootball2023   from "./beirut-football-2023";
// … add more as you create them

// ── Master list ───────────────────────────────────────────────
export const projects: Project[] = [
  // riyadhBasketball2024,
  // beirutFootball2023,
  // … add here
];

/** Convenience: projects marked featured:true, ordered by year desc */
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => b.year - a.year);

/** All projects sorted reverse-chronological */
export const allProjects = [...projects].sort((a, b) => b.year - a.year);
