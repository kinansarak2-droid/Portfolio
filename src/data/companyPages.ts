/**
 * COMPANY PAGES CONFIG
 * ────────────────────
 * Each entry is a single Company subpage (About, Manufacturing, R&D…).
 * They all use the same template but have unique copy.
 *
 * Slugs here mirror nav children in src/config/site.ts.
 */

import type { ContentCategory } from "@/types";

export const companyIntro = {
  en: "Learn about our manufacturing, innovation, research, machinery, installation, and quality process.",
  fr: "Découvrez notre fabrication, notre innovation, notre recherche, nos machines, notre installation et notre processus qualité.",
  ar: "تعرّف على التصنيع والابتكار والبحث والآليات والتركيب وعمليات ضبط الجودة لدينا.",
};

export const companyPagesConfig: ContentCategory[] = [
  {
    id: "about",
    slug: "about",
    title: { en: "About Us", fr: "À propos", ar: "من نحن" },
    shortDesc: {
      en: "Who we are, our story, and the team behind Sarakbi Sport.",
      fr: "Qui nous sommes, notre histoire et l'équipe derrière Sarakbi Sport.",
      ar: "من نحن وقصتنا والفريق وراء ساركبي للرياضة.",
    },
    group: "story",
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: { en: "Manufacturing", fr: "Fabrication", ar: "التصنيع" },
    shortDesc: {
      en: "In-house manufacturing of sports flooring and systems.",
      fr: "Fabrication interne de revêtements et systèmes sportifs.",
      ar: "تصنيع داخلي للأرضيات والأنظمة الرياضية.",
    },
    group: "operations",
  },
  {
    id: "rd",
    slug: "rd",
    title: { en: "R&D", fr: "R&D", ar: "البحث والتطوير" },
    shortDesc: {
      en: "Research, testing and continuous product development.",
      fr: "Recherche, essais et développement produit continu.",
      ar: "البحث والاختبار والتطوير المستمر للمنتجات.",
    },
    group: "operations",
  },
  {
    id: "innovation",
    slug: "innovation",
    title: { en: "Innovation", fr: "Innovation", ar: "الابتكار" },
    shortDesc: {
      en: "How we approach material, system and process innovation.",
      fr: "Notre approche de l'innovation matériaux, systèmes et processus.",
      ar: "منهجنا في الابتكار في المواد والأنظمة والعمليات.",
    },
    group: "operations",
  },
  {
    id: "design",
    slug: "design",
    title: { en: "Design", fr: "Conception", ar: "التصميم" },
    shortDesc: {
      en: "Architectural and engineering design for sports facilities.",
      fr: "Conception architecturale et technique d'installations sportives.",
      ar: "التصميم المعماري والهندسي للمنشآت الرياضية.",
    },
    group: "operations",
  },
  {
    id: "development",
    slug: "development",
    title: { en: "Development", fr: "Développement", ar: "التطوير" },
    shortDesc: {
      en: "Project development from brief to handover.",
      fr: "Développement de projets, du brief à la livraison.",
      ar: "تطوير المشاريع من الفكرة حتى التسليم.",
    },
    group: "operations",
  },
  {
    id: "machinery",
    slug: "machinery",
    title: { en: "Machinery", fr: "Machinerie", ar: "الآليات" },
    shortDesc: {
      en: "Specialised machinery for surfacing, fields and installation.",
      fr: "Machines spécialisées pour revêtements, terrains et installation.",
      ar: "آليات متخصصة للأرضيات والملاعب والتركيب.",
    },
    group: "operations",
  },
  {
    id: "installation",
    slug: "installation",
    title: { en: "Installation", fr: "Installation", ar: "التركيب" },
    shortDesc: {
      en: "Site installation crews and turnkey delivery.",
      fr: "Équipes d'installation sur site et livraison clé en main.",
      ar: "فِرق التركيب في الموقع والتسليم المتكامل.",
    },
    group: "operations",
  },
  {
    id: "quality",
    slug: "quality",
    title: { en: "Quality", fr: "Qualité", ar: "الجودة" },
    shortDesc: {
      en: "Quality assurance, testing and certifications.",
      fr: "Assurance qualité, essais et certifications.",
      ar: "ضمان الجودة والاختبار والاعتمادات.",
    },
    group: "operations",
  },
];

export function findCompanyPage(slug: string): ContentCategory | undefined {
  return companyPagesConfig.find((c) => c.slug === slug && c.status !== "archived");
}

export function listCompanyPages(): ContentCategory[] {
  return companyPagesConfig.filter((c) => c.status !== "archived");
}
