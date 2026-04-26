/**
 * English translations — site-wide UI strings.
 * Key structure mirrors fr.ts and ar.ts exactly.
 * Add new keys to all three files at the same time.
 *
 * NOTE: Filter group labels and option labels live in src/data/filters.ts
 * as LocalizedString objects — they are NOT duplicated here.
 * This file only holds UI chrome that surrounds the filter controls.
 */
const en = {
  nav: {
    home:     "Home",
    projects: "Projects",
    about:    "About",
    contact:  "Contact",
  },

  projects: {
    pageTitle:    "Projects",
    pageSubtitle: "Archive",
    backToHome:   "← Back",
    noResults:    "No projects found for this filter combination.",
    filterLabel:  "Filter",
    clearFilters: "Clear all filters",
    clearGroup:   "Clear",

    // Labels used on project cards / detail pages
    card: {
      viewProject: "View project",
      year:        "Year",
      location:    "Location",
      surface:     "Surface",
      area:        "Area",
      sport:       "Sport",
      client:      "Client",
      status:      "Status",
    },

    status: {
      completed:   "Completed",
      inProgress:  "In Progress",
      concept:     "Concept",
    },
  },

  // ── Filter toolbar chrome ─────────────────────────────────
  // Option / chip labels live in filters.ts as LocalizedStrings.
  // Only UI strings that wrap the controls belong here.
  filters: {
    // Range slider (year)
    yearFrom:     "From",
    yearTo:       "To",

    // Location dropdown
    locationPlaceholder: "All locations",
    locationAllGroups:   "All regions",

    // Active count badge, e.g. "3 active"
    activeCount:  "active",
  },

  // ── Stats panel ───────────────────────────────────────────
  // Shown in the top-right panel of the filter toolbar
  stats: {
    projects:   "Projects",        // count of matching projects
    area:       "Total Area",      // sum of areaSqm
    areaUnit:   "m²",
    locations:  "Locations",       // unique location count
    topSport:   "Top Sport",       // most frequent sport
    topSurface: "Top Surface",     // most frequent surface
    noData:     "—",               // shown when value is undefined
  },

  common: {
    all:      "All",
    loading:  "Loading…",
    error:    "Something went wrong.",
  },
} as const;

export default en;
export type TranslationShape = typeof en;
