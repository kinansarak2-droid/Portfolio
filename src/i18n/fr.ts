import type { TranslationShape } from "./en";

const fr: TranslationShape = {
  common: {
    all:        "Tout",
    loading:    "Chargement…",
    error:      "Une erreur est survenue.",
    learnMore:  "En savoir plus",
    readMore:   "Lire la suite",
    viewAll:    "Tout voir",
    back:       "Retour",
    next:       "Suivant",
    previous:   "Précédent",
    open:       "Ouvrir",
    close:      "Fermer",
    placeholder:"Espace réservé",
    comingSoon: "Bientôt disponible",
  },

  nav: {
    skipToContent: "Aller au contenu",
    openMenu:      "Ouvrir le menu",
    closeMenu:     "Fermer le menu",
  },

  breadcrumbs: {
    home: "Accueil",
  },

  language: {
    label: "Langue",
  },

  page: {
    introLabel:    "Introduction",
    overviewLabel: "Aperçu",
    sectionsLabel: "Sections",
  },

  filters: {
    label:               "Filtrer",
    yearFrom:            "De",
    yearTo:              "À",
    locationPlaceholder: "Tous les lieux",
    locationAllGroups:   "Toutes les régions",
    activeCount:         "actif(s)",
    clearAll:            "Effacer tous les filtres",
    clearGroup:          "Effacer",
    noResults:           "Aucun résultat ne correspond à ces filtres.",
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

  stats: {
    projects:   "Projets",
    area:       "Surface totale",
    areaUnit:   "m²",
    locations:  "Lieux",
    topSport:   "Sport principal",
    topSurface: "Surface principale",
    noData:     "—",
  },

  form: {
    submit:        "Envoyer",
    sending:       "Envoi…",
    success:       "Merci — nous reviendrons vers vous.",
    failure:       "Une erreur est survenue. Veuillez réessayer.",
    requiredMark:  "*",
    optionalLabel: "(facultatif)",
    selectOption:  "Sélectionner…",
    fileHint:      "Glisser-déposer ou parcourir",
  },

  footer: {
    rights:    "Tous droits réservés.",
    languages: "Langues",
  },
};

export default fr;
