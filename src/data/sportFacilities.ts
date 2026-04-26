/**
 * SPORT FACILITIES CONFIG
 * ───────────────────────
 * Each entry describes one Sportanlagen category page.
 *
 * To add a new sport:
 *   1. Add a new entry to `sportFacilitiesConfig` below.
 *   2. (Optional) Add a corresponding nav child in src/config/site.ts.
 *      Both files use the same `slug`.
 *
 * To remove a sport: delete the entry. Routes are dynamic
 * (`/sportanlagen/[category]`), so no other code change is needed.
 *
 * To rename: change the `title` LocalizedString. Slugs should stay
 * stable to avoid breaking existing inbound links.
 *
 * To reorder: reorder the entries here OR set explicit `order` numbers.
 */

import type { ContentCategory } from "@/types";

export const sportFacilitiesIntro = {
  en: "Complete sports facility construction from groundworks to final equipment installation.",
  fr: "Construction complète d'installations sportives, des terrassements à l'installation finale.",
  ar: "إنشاء كامل للمنشآت الرياضية من الأعمال الترابية حتى تركيب التجهيزات النهائية.",
};

export const sportFacilitiesConfig: ContentCategory[] = [
  {
    id: "football",
    slug: "football",
    title: { en: "Football / Soccer", fr: "Football", ar: "كرة القدم" },
    shortDesc: {
      en: "Natural grass, hybrid and artificial turf football fields.",
      fr: "Terrains de football en gazon naturel, hybride et synthétique.",
      ar: "ملاعب كرة قدم بعشب طبيعي وهجين وصناعي.",
    },
    group: "outdoor-sports",
  },
  {
    id: "basketball",
    slug: "basketball",
    title: { en: "Basketball", fr: "Basketball", ar: "كرة السلة" },
    shortDesc: {
      en: "Indoor and outdoor basketball courts with certified surfaces.",
      fr: "Terrains de basketball intérieurs et extérieurs avec revêtements certifiés.",
      ar: "ملاعب كرة سلة داخلية وخارجية بأرضيات معتمدة.",
    },
    group: "court-sports",
  },
  {
    id: "tennis",
    slug: "tennis",
    title: { en: "Tennis", fr: "Tennis", ar: "التنس" },
    shortDesc: {
      en: "Acrylic, clay and grass tennis courts to ITF standards.",
      fr: "Courts de tennis en acrylique, terre battue et gazon, normes ITF.",
      ar: "ملاعب تنس بالأكريليك والتراب الأحمر والعشب وفق معايير الاتحاد الدولي.",
    },
    group: "court-sports",
  },
  {
    id: "tracks-athletics",
    slug: "tracks-athletics",
    title: { en: "Tracks & Athletics", fr: "Pistes & Athlétisme", ar: "المضامير وألعاب القوى" },
    shortDesc: {
      en: "IAAF-grade running tracks and athletics fields.",
      fr: "Pistes et installations d'athlétisme conformes aux normes IAAF.",
      ar: "مضامير ومرافق ألعاب قوى وفق معايير الاتحاد الدولي.",
    },
    group: "track-field",
  },
  {
    id: "padel",
    slug: "padel",
    title: { en: "Padel", fr: "Padel", ar: "البادل" },
    shortDesc: {
      en: "Standard, panoramic and competition padel courts.",
      fr: "Courts de padel standards, panoramiques et de compétition.",
      ar: "ملاعب بادل قياسية وبانورامية وتنافسية.",
    },
    group: "court-sports",
  },
  {
    id: "badminton",
    slug: "badminton",
    title: { en: "Badminton", fr: "Badminton", ar: "الريشة الطائرة" },
    shortDesc: {
      en: "Indoor badminton courts with sport-grade flooring.",
      fr: "Courts de badminton intérieurs avec revêtements sportifs.",
      ar: "ملاعب ريشة طائرة داخلية بأرضيات رياضية.",
    },
    group: "indoor-sports",
  },
  {
    id: "pickleball",
    slug: "pickleball",
    title: { en: "Pickleball", fr: "Pickleball", ar: "البيكلبول" },
    shortDesc: {
      en: "Dedicated pickleball courts and conversion lining.",
      fr: "Courts de pickleball dédiés et marquage de conversion.",
      ar: "ملاعب بيكلبول مخصصة وتخطيط للتحويل.",
    },
    group: "court-sports",
  },
  {
    id: "volleyball",
    slug: "volleyball",
    title: { en: "Volleyball", fr: "Volleyball", ar: "الكرة الطائرة" },
    shortDesc: {
      en: "Indoor, beach and outdoor volleyball facilities.",
      fr: "Installations de volleyball en intérieur, beach et extérieur.",
      ar: "مرافق كرة طائرة داخلية وشاطئية وخارجية.",
    },
    group: "court-sports",
  },
  {
    id: "handball",
    slug: "handball",
    title: { en: "Handball", fr: "Handball", ar: "كرة اليد" },
    shortDesc: {
      en: "Sport-floor handball courts and integrated lining.",
      fr: "Terrains de handball avec sol sportif et marquage intégré.",
      ar: "ملاعب كرة يد بأرضيات رياضية وتخطيط متكامل.",
    },
    group: "indoor-sports",
  },
  {
    id: "multicourt",
    slug: "multicourt",
    title: { en: "Multicourt", fr: "Terrain multisports", ar: "ملعب متعدد الرياضات" },
    shortDesc: {
      en: "Multi-purpose courts hosting several sports on one surface.",
      fr: "Terrains polyvalents accueillant plusieurs sports sur une même surface.",
      ar: "ملاعب متعددة الأغراض تستوعب عدة رياضات على أرضية واحدة.",
    },
    group: "court-sports",
  },
  {
    id: "gym-fitness",
    slug: "gym-fitness",
    title: { en: "Gym & Fitness", fr: "Gym & Fitness", ar: "الصالات الرياضية واللياقة" },
    shortDesc: {
      en: "Heavy-duty rubber flooring and weight-area systems.",
      fr: "Revêtements en caoutchouc résistant et systèmes pour zones de musculation.",
      ar: "أرضيات مطاطية متينة وأنظمة لمناطق الأوزان.",
    },
    group: "facilities",
  },
  {
    id: "playgrounds",
    slug: "playgrounds",
    title: { en: "Playgrounds", fr: "Aires de jeux", ar: "ساحات اللعب" },
    shortDesc: {
      en: "Impact-absorbing surfacing and playground installations.",
      fr: "Revêtements amortissants et installations d'aires de jeux.",
      ar: "أرضيات ماصة للصدمات وتركيب ساحات لعب.",
    },
    group: "facilities",
  },
  {
    id: "urban-cycling",
    slug: "urban-cycling",
    title: { en: "Urban Cycling & Street Furniture", fr: "Cyclisme urbain & mobilier urbain", ar: "الدراجات الحضرية والأثاث العام" },
    shortDesc: {
      en: "Cycling lanes, pump tracks and urban sports furniture.",
      fr: "Pistes cyclables, pump tracks et mobilier sportif urbain.",
      ar: "مسارات دراجات وحلبات بمب وتجهيزات رياضية حضرية.",
    },
    group: "urban",
  },
  {
    id: "martial-arts",
    slug: "martial-arts",
    title: { en: "Martial Arts", fr: "Arts martiaux", ar: "الفنون القتالية" },
    shortDesc: {
      en: "Tatami, mats and dedicated martial arts halls.",
      fr: "Tatami, tapis et salles dédiées aux arts martiaux.",
      ar: "تاتامي وحصائر وقاعات مخصصة للفنون القتالية.",
    },
    group: "indoor-sports",
  },
  {
    id: "wheelchair-sports",
    slug: "wheelchair-sports",
    title: { en: "Wheelchair Sports", fr: "Sports en fauteuil roulant", ar: "رياضات الكراسي المتحركة" },
    shortDesc: {
      en: "Accessible courts engineered for wheelchair sports.",
      fr: "Terrains accessibles conçus pour les sports en fauteuil roulant.",
      ar: "ملاعب يمكن الوصول إليها مصمّمة لرياضات الكراسي المتحركة.",
    },
    group: "court-sports",
  },
  {
    id: "construction-services",
    slug: "construction-services",
    title: { en: "Construction Services", fr: "Services de construction", ar: "خدمات الإنشاء" },
    shortDesc: {
      en: "Groundworks, drainage, fencing, lighting and landscaping.",
      fr: "Terrassement, drainage, clôtures, éclairage et aménagement paysager.",
      ar: "أعمال ترابية وصرف وسياج وإنارة وتنسيق المواقع.",
    },
    group: "services",
  },
  {
    id: "standards-certifications",
    slug: "standards-certifications",
    title: { en: "Standards & Certifications", fr: "Normes & Certifications", ar: "المعايير والاعتمادات" },
    shortDesc: {
      en: "FIBA, ITF, FIFA, IAAF and World Padel Tour compliance.",
      fr: "Conformité FIBA, ITF, FIFA, IAAF et World Padel Tour.",
      ar: "اعتمادات فيبا والاتحاد الدولي للتنس والفيفا والاتحاد الدولي لألعاب القوى ووورلد بادل تور.",
    },
    group: "services",
  },
  {
    id: "complete-system",
    slug: "complete-system",
    title: { en: "Complete Integrated System", fr: "Système intégré complet", ar: "النظام المتكامل الشامل" },
    shortDesc: {
      en: "End-to-end facility delivery — design, manufacture, install.",
      fr: "Livraison clé en main : conception, fabrication, installation.",
      ar: "تسليم متكامل: تصميم وتصنيع وتركيب.",
    },
    group: "services",
  },
];

/** Lookup by slug — returns undefined if no match. UI must handle null. */
export function findSportFacility(slug: string): ContentCategory | undefined {
  return sportFacilitiesConfig.find((c) => c.slug === slug && c.status !== "archived");
}

/** All published categories, in author-defined order. */
export function listSportFacilities(): ContentCategory[] {
  return sportFacilitiesConfig.filter((c) => c.status !== "archived");
}
