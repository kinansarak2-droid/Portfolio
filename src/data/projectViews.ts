/**
 * PROJECT VIEWS CONFIG
 * ────────────────────
 * Each entry describes a saved view of the projects collection.
 * The Projects route renders the same list template, but pre-applies
 * a filter based on the view's `filter` block.
 *
 * Slugs here mirror nav children in src/config/site.ts:
 *   /projects               (slug: "all")     → shows all
 *   /projects/premium       (slug: "premium") → featured = true
 *   /projects/archive       (slug: "archive") → status = archived
 *
 * Adding a new view:
 *   1. Add an entry below.
 *   2. (Optional) Add nav child in site.ts.
 *
 * The filter block is interpreted by lib/content.ts → applyProjectView().
 */

import type { LocalizedString } from "@/i18n";

export const projectsIntro: LocalizedString = {
  en: "Explore completed sports facility projects, premium references, and archived works.",
  fr: "Découvrez les installations sportives réalisées, les références premium et les archives.",
  ar: "استكشف المشاريع الرياضية المنفّذة والمراجع المميزة والأرشيف.",
};

export interface ProjectView {
  id:        string;
  slug:      string;
  title:     LocalizedString;
  shortDesc?: LocalizedString;
  filter: {
    featured?: boolean;
    archived?: boolean;
    /** Generic filter slot, used by lib/content.ts → applyProjectView() */
    sports?: string[];
    surfaces?: string[];
    categories?: string[];
    yearMin?: number;
    yearMax?: number;
  };
  /** When true, this view powers the canonical /projects route. */
  isDefault?: boolean;
}

export const projectViewsConfig: ProjectView[] = [
  {
    id: "all",
    slug: "all",
    title: { en: "All Projects", fr: "Tous les projets", ar: "كل المشاريع" },
    shortDesc: {
      en: "Every project across all sports, surfaces, and locations.",
      fr: "Tous les projets, tous sports, surfaces et lieux confondus.",
      ar: "كل المشاريع عبر مختلف الرياضات والأرضيات والمواقع.",
    },
    filter: {},
    isDefault: true,
  },
  {
    id: "premium",
    slug: "premium",
    title: { en: "Premium Projects", fr: "Projets premium", ar: "المشاريع المميزة" },
    shortDesc: {
      en: "Flagship and featured premium references.",
      fr: "Références phares et projets premium mis en avant.",
      ar: "المراجع البارزة والمشاريع المميزة.",
    },
    filter: { featured: true },
  },
  {
    id: "archive",
    slug: "archive",
    title: { en: "Archive", fr: "Archive", ar: "الأرشيف" },
    shortDesc: {
      en: "Older projects and historical references.",
      fr: "Projets anciens et références historiques.",
      ar: "مشاريع سابقة ومراجع تاريخية.",
    },
    filter: { archived: true },
  },
];

/**
 * PROJECT CATEGORY FILTERS
 * ────────────────────────
 * Lightweight filter chips used on project list pages. These are
 * placeholders today; later they will hook into a real filter system.
 */

export interface ProjectCategoryFilter {
  id:    string;
  label: LocalizedString;
  /** Matches `Project.category` or `Project.tags`. */
  match: { category?: string; tag?: string };
}

export const projectCategoriesConfig: ProjectCategoryFilter[] = [
  { id: "indoor",   label: { en: "Indoor",   fr: "Intérieur", ar: "داخلي" },  match: { tag: "indoor"  } },
  { id: "outdoor",  label: { en: "Outdoor",  fr: "Extérieur", ar: "خارجي" },  match: { tag: "outdoor" } },
  { id: "stadium",  label: { en: "Stadium",  fr: "Stade",     ar: "ملعب" },   match: { category: "stadium" } },
  { id: "school",   label: { en: "School",   fr: "École",     ar: "مدرسة" },  match: { category: "school" } },
  { id: "private",  label: { en: "Private",  fr: "Privé",     ar: "خاص" },    match: { category: "private" } },
  { id: "public",   label: { en: "Public",   fr: "Public",    ar: "عام" },    match: { category: "public" } },
  { id: "community",label: { en: "Community",fr: "Communauté",ar: "مجتمعي" }, match: { category: "community" } },
];

export function findProjectView(slug: string): ProjectView | undefined {
  return projectViewsConfig.find((v) => v.slug === slug);
}

export function getDefaultProjectView(): ProjectView {
  return projectViewsConfig.find((v) => v.isDefault) ?? projectViewsConfig[0];
}
