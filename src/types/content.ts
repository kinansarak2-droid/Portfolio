/**
 * GENERIC CONTENT TYPES
 * ─────────────────────
 * Shared shapes used across all content config files.
 * These types describe a *piece of content*, not a piece of layout.
 *
 * Every text field is a LocalizedString so a single content entry
 * can render in any supported language without changes.
 */

import type { LocalizedString } from "@/i18n";

/**
 * Status of a content entry. Allows publishing / drafting workflows
 * later without breaking the public site.
 */
export type ContentStatus = "published" | "draft" | "archived";

/**
 * Generic category — used for sport categories, product categories,
 * project categories, etc.
 *
 * Every category is reorderable, deletable, and renamable just by
 * editing its config entry. The `slug` is the URL segment.
 */
export interface ContentCategory {
  id:        string;            // unique, kebab-case
  slug:      string;            // URL segment
  title:     LocalizedString;
  shortDesc?: LocalizedString;  // 1–2 sentence intro
  longDesc?:  LocalizedString;  // body copy / long intro
  coverImage?: string;          // /assets/... path or external URL
  status?:   ContentStatus;     // defaults to "published"
  order?:    number;            // optional manual ordering
  tags?:     string[];          // free-form classification
  featured?: boolean;
  /** Optional grouping key — categories sharing a group can be displayed
   *  in clusters, e.g. "Indoor Sports" vs "Outdoor Sports". */
  group?:    string;
}

/**
 * A reusable section that lives on a page (e.g. "Hero", "Services preview").
 * `kind` is a string discriminator that the renderer uses to pick a
 * component. Adding a new kind only requires adding a new component
 * and a config entry.
 */
export interface PageSection {
  id:        string;
  kind:      string;            // e.g. "hero" | "preview" | "cta" | "category-grid"
  title?:    LocalizedString;
  subtitle?: LocalizedString;
  body?:     LocalizedString;
  ctaLabel?: LocalizedString;
  ctaHref?:  string;
  /** Source key for dynamic content (e.g. "sportFacilities", "products") */
  source?:   string;
  /** Maximum items to show when sourced from a list */
  limit?:    number;
  /** Optional manual ordering */
  order?:    number;
  status?:   ContentStatus;
}

/**
 * Page metadata — used for `<title>` and meta description per page.
 */
export interface PageMeta {
  title:        LocalizedString;
  description?: LocalizedString;
  keywords?:    string[];
}
