/**
 * CONTENT HELPERS
 * ───────────────
 * Pure functions used by templates and components to look up
 * config-driven content. Keeps page components thin.
 *
 * Adding a new content domain (e.g. "events"):
 *   1. Create src/data/events.ts with `eventsConfig`.
 *   2. Add a `findEvent(slug)` and `listEvents()` helper inside
 *      that file (mirroring the pattern of sportFacilities.ts).
 *   3. Optionally re-export here for convenience.
 */

import { findSportFacility, listSportFacilities } from "@/data/sportFacilities";
import { findProductCategory, listProductCategories } from "@/data/productCategories";
import { findCompanyPage, listCompanyPages } from "@/data/companyPages";
import { findProjectView, getDefaultProjectView, projectViewsConfig } from "@/data/projectViews";
import { findContactForm, getDefaultContactForm, contactFormsConfig } from "@/data/contactForms";
import { allProjects, featuredProjects } from "@/data/projects";
import type { Project } from "@/types/project";
import type { ProjectView } from "@/data/projectViews";

export {
  findSportFacility, listSportFacilities,
  findProductCategory, listProductCategories,
  findCompanyPage, listCompanyPages,
  findProjectView, getDefaultProjectView, projectViewsConfig,
  findContactForm, getDefaultContactForm, contactFormsConfig,
  allProjects, featuredProjects,
};

/**
 * Apply a ProjectView's filter to a list of projects.
 * Defensive: returns the input list when the filter is empty / invalid.
 */
export function applyProjectView(projects: Project[], view: ProjectView | undefined): Project[] {
  if (!view) return projects;
  const f = view.filter ?? {};

  return projects.filter((p) => {
    if (f.featured !== undefined && p.featured !== f.featured) return false;
    if (f.archived !== undefined) {
      const isArchived = p.status === "concept" || (p.tags ?? []).includes("archive");
      if (isArchived !== f.archived) return false;
    }
    if (f.sports?.length   && !p.sports.some((s) => f.sports!.includes(s)))   return false;
    if (f.surfaces?.length && !p.surfaces.some((s) => f.surfaces!.includes(s))) return false;
    if (f.categories?.length && p.category && !f.categories.includes(p.category)) return false;
    if (f.yearMin !== undefined && p.year < f.yearMin) return false;
    if (f.yearMax !== undefined && p.year > f.yearMax) return false;
    return true;
  });
}

/**
 * Resolve a homepage section's `source` to a list. Returns [] if no
 * source matches — the renderer will then skip the section.
 */
export function resolveSectionSource(
  source: string | undefined,
  limit?: number,
): unknown[] {
  if (!source) return [];
  let list: unknown[] = [];
  switch (source) {
    case "sportFacilities":   list = listSportFacilities();   break;
    case "productCategories": list = listProductCategories(); break;
    case "companyPages":      list = listCompanyPages();      break;
    case "projects":          list = allProjects;             break;
    case "featuredProjects":  list = featuredProjects;        break;
    default:                  list = [];
  }
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
