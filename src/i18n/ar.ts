import type { TranslationShape } from "./en";

const ar: TranslationShape = {
  nav: {
    home:     "الرئيسية",
    projects: "المشاريع",
    about:    "من نحن",
    contact:  "تواصل معنا",
  },

  projects: {
    pageTitle:    "المشاريع",
    pageSubtitle: "الأرشيف",
    backToHome:   "→ رجوع",
    noResults:    "لم يتم العثور على مشاريع لهذه التصفية.",
    filterLabel:  "تصفية",
    clearFilters: "مسح جميع الفلاتر",
    clearGroup:   "مسح",

    card: {
      viewProject: "عرض المشروع",
      year:        "السنة",
      location:    "الموقع",
      surface:     "السطح",
      area:        "المساحة",
      sport:       "الرياضة",
      client:      "العميل",
      status:      "الحالة",
    },

    status: {
      completed:  "مكتمل",
      inProgress: "جارٍ",
      concept:    "فكرة",
    },
  },

  filters: {
    yearFrom:    "من",
    yearTo:      "إلى",

    locationPlaceholder: "جميع المواقع",
    locationAllGroups:   "جميع المناطق",

    activeCount: "نشط",
  },

  stats: {
    projects:   "المشاريع",
    area:       "المساحة الكلية",
    areaUnit:   "م²",
    locations:  "المواقع",
    topSport:   "الرياضة الأبرز",
    topSurface: "السطح الأبرز",
    noData:     "—",
  },

  common: {
    all:     "الكل",
    loading: "جارٍ التحميل…",
    error:   "حدث خطأ ما.",
  },
};

export default ar;
