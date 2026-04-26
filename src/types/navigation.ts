/**
 * NAVIGATION TYPES
 * ────────────────
 * Describes the shape of the site's main navigation tree.
 * The tree is rendered by `<Header />` and `<DropdownMenu />`.
 *
 * Adding, removing, or renaming a nav item is a config-only change.
 * Order is determined by array order in the config.
 */

import type { LocalizedString } from "@/i18n";

export interface NavItem {
  id:    string;
  label: LocalizedString;
  href:  string;                // absolute path, e.g. "/sportanlagen"
  /** Optional dropdown of children. Empty / missing = leaf link. */
  children?: NavItem[];
  /** Hide an item from the public nav without deleting it. */
  hidden?: boolean;
  /** Marks an item as external link, e.g. blog or shop subdomain. */
  external?: boolean;
}

export interface NavGroup {
  id:    string;
  label: LocalizedString;
  items: NavItem[];
}
