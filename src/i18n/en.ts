/**
 * English translations — site-wide UI chrome only.
 *
 * What lives here:
 *   • Reusable button / form labels
 *   • Generic words used across pages (loading, error, etc.)
 *   • UI strings that wrap content (filter labels, breadcrumbs, etc.)
 *
 * What does NOT live here:
 *   • Page section content (heroes, descriptions) → src/data/*.ts
 *   • Navigation labels                          → src/config/site.ts
 *   • Category titles                             → src/data/*.ts
 *
 * Add a new key here, then mirror it in fr.ts and ar.ts. TypeScript
 * will fail to compile if any locale is missing a key.
 */
const en = {
  common: {
    all:        "All",
    loading:    "Loading…",
    error:      "Something went wrong.",
    learnMore:  "Learn more",
    readMore:   "Read more",
    viewAll:    "View all",
    back:       "Back",
    next:       "Next",
    previous:   "Previous",
    open:       "Open",
    close:      "Close",
    placeholder:"Placeholder",
    comingSoon: "Coming soon",
  },

  nav: {
    skipToContent: "Skip to content",
    openMenu:      "Open menu",
    closeMenu:     "Close menu",
  },

  breadcrumbs: {
    home: "Home",
  },

  language: {
    label: "Language",
  },

  page: {
    introLabel:    "Introduction",
    overviewLabel: "Overview",
    sectionsLabel: "Sections",
  },

  filters: {
    label:               "Filter",
    yearFrom:            "From",
    yearTo:              "To",
    locationPlaceholder: "All locations",
    locationAllGroups:   "All regions",
    activeCount:         "active",
    clearAll:            "Clear all filters",
    clearGroup:          "Clear",
    noResults:           "No results match these filters.",
  },

  projects: {
    pageTitle:    "Projects",
    pageSubtitle: "Archive",
    backToHome:   "← Back",
    noResults:    "No projects found for this filter combination.",
    filterLabel:  "Filter",
    clearFilters: "Clear all filters",
    clearGroup:   "Clear",
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
      completed:  "Completed",
      inProgress: "In Progress",
      concept:    "Concept",
    },
  },

  stats: {
    projects:   "Projects",
    area:       "Total Area",
    areaUnit:   "m²",
    locations:  "Locations",
    topSport:   "Top Sport",
    topSurface: "Top Surface",
    noData:     "—",
  },

  form: {
    submit:        "Send",
    sending:       "Sending…",
    success:       "Thank you — we'll be in touch.",
    failure:       "Something went wrong. Please try again.",
    requiredMark:  "*",
    optionalLabel: "(optional)",
    selectOption:  "Select…",
    fileHint:      "Drag and drop, or browse",
  },

  footer: {
    rights:    "All rights reserved.",
    languages: "Languages",
  },
} as const;

export default en;
export type TranslationShape = typeof en;
