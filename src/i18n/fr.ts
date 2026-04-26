import type { TranslationShape } from "./en";

const fr: TranslationShape = {
  nav: {
    home:     "Accueil",
    projects: "Projets",
    about:    "À propos",
    contact:  "Contact",
  },

  projects: {
    pageTitle:    "Projets",
    pageSubtitle: "Archive",
    backToHome:   "← Retour",
    noResults:    "Aucun projet trouvé pour cette combinaison de filtres.",
    filterLabel:  "Filtrer",
    clearFilters: "Effacer tous les filtres",
    clearGroup:   "Effacer",

    card: {
      viewProject: "Voir le projet",
      year:        "Année",
      location:    "Lieu",
      surface:     "Surface",
      area:        "Superficie",
      sport:       "Sport",
      client:      "Client",
      status:      "Statut",
    },

    status: {
      completed:  "Terminé",
      inProgress: "En cours",
      concept:    "Concept",
    },
  },

  filters: {
    yearFrom:    "De",
    yearTo:      "À",

    locationPlaceholder: "Tous les lieux",
    locationAllGroups:   "Toutes les régions",

    activeCount: "actif(s)",
  },

  stats: {
    projects:   "Projets",
    area:       "Surface totale",
    areaUnit:   "m²",
    locations:  "Lieux",
    topSport:   "Sport principal",
    topSurface: "Surface principale",
    noData:     "—",
  },

  common: {
    all:     "Tout",
    loading: "Chargement…",
    error:   "Une erreur est survenue.",
  },
};

export default fr;
