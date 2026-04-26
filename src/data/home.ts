/**
 * HOME PAGE CONFIG
 * ────────────────
 * Each entry is a section on the homepage. Order = display order.
 *
 * To remove a homepage section: delete the entry.
 * To reorder: move entries.
 * To add a new section kind: add a `kind` here AND add a renderer in
 *   src/components/home/HomeSectionRenderer.tsx.
 *
 * The home renderer guarantees the page never breaks if a section
 * is missing data or its kind is not yet implemented (it is skipped).
 */

import type { PageSection } from "@/types";

export const homePageMeta = {
  title: {
    en: "SARAKBI SPORT — Sports facility construction & systems",
    fr: "SARAKBI SPORT — Construction d'installations sportives & systèmes",
    ar: "ساركبي سبورت — إنشاء المنشآت الرياضية والأنظمة الرياضية",
  },
  description: {
    en: "From courts and fields to flooring systems, accessories, and equipment — Sarakbi Sport delivers complete sports facilities.",
    fr: "Des terrains aux systèmes de revêtement, accessoires et équipements — Sarakbi Sport livre des installations sportives complètes.",
    ar: "من الملاعب والساحات إلى أنظمة الأرضيات والملحقات والتجهيزات — تقدّم ساركبي سبورت منشآت رياضية متكاملة.",
  },
};

export const homeSections: PageSection[] = [
  {
    id: "hero",
    kind: "hero",
    title: {
      en: "Sports facilities, systems and equipment.",
      fr: "Installations sportives, systèmes et équipements.",
      ar: "منشآت وأنظمة وتجهيزات رياضية.",
    },
    subtitle: {
      en: "Designed, manufactured and installed end-to-end.",
      fr: "Conçus, fabriqués et installés de A à Z.",
      ar: "نصمّمها ونصنّعها ونركّبها بالكامل.",
    },
    ctaLabel: { en: "Get in touch", fr: "Nous contacter", ar: "تواصل معنا" },
    ctaHref: "/contact",
  },
  {
    id: "what-we-do",
    kind: "what-we-do",
    title: { en: "What we do", fr: "Ce que nous faisons", ar: "ماذا نفعل" },
    body: {
      en: "Two complementary capabilities — turnkey sports facility construction and in-house manufacturing of sports systems and equipment.",
      fr: "Deux capacités complémentaires — la construction clé en main d'installations sportives et la fabrication interne de systèmes et d'équipements sportifs.",
      ar: "قدرتان متكاملتان — تنفيذ كامل للمنشآت الرياضية وتصنيع داخلي للأنظمة والتجهيزات الرياضية.",
    },
  },
  {
    id: "sportanlagen-preview",
    kind: "preview-grid",
    title: { en: "Sportanlagen", fr: "Installations sportives", ar: "المنشآت الرياضية" },
    subtitle: {
      en: "Football, basketball, tennis, athletics tracks, padel and more.",
      fr: "Football, basketball, tennis, pistes d'athlétisme, padel et plus encore.",
      ar: "كرة القدم وكرة السلة والتنس والمضامير والبادل وغيرها.",
    },
    source: "sportFacilities",
    limit: 6,
    ctaLabel: { en: "View all sportanlagen", fr: "Voir toutes les installations", ar: "عرض كل المنشآت" },
    ctaHref: "/sportanlagen",
  },
  {
    id: "products-preview",
    kind: "preview-grid",
    title: { en: "Products & Shop", fr: "Produits & Boutique", ar: "المنتجات والمتجر" },
    subtitle: {
      en: "AC and PU systems, artificial grass, turf, tiles, accessories, equipment.",
      fr: "Systèmes AC et PU, gazon synthétique, dalles, accessoires, équipements.",
      ar: "أنظمة الأكريليك والبولي يوريثان والعشب الصناعي والبلاطات والملحقات والتجهيزات.",
    },
    source: "productCategories",
    limit: 6,
    ctaLabel: { en: "Browse products", fr: "Parcourir les produits", ar: "تصفّح المنتجات" },
    ctaHref: "/products",
  },
  {
    id: "projects-preview",
    kind: "featured-projects",
    title: { en: "Featured projects", fr: "Projets phares", ar: "مشاريع مميّزة" },
    subtitle: {
      en: "A selection of our recent and premium installations.",
      fr: "Une sélection de nos installations récentes et premium.",
      ar: "مختارات من أحدث منشآتنا والمشاريع المميزة.",
    },
    source: "featuredProjects",
    limit: 4,
    ctaLabel: { en: "All projects", fr: "Tous les projets", ar: "كل المشاريع" },
    ctaHref: "/projects",
  },
  {
    id: "contact-cta",
    kind: "cta",
    title: { en: "Have a project in mind?", fr: "Un projet en tête ?", ar: "هل لديك مشروع؟" },
    body: {
      en: "Send us your brief, drawings or questions — we'll respond with a proposal.",
      fr: "Envoyez-nous votre cahier des charges, vos plans ou vos questions — nous reviendrons avec une proposition.",
      ar: "أرسل إلينا الموجز أو المخططات أو أسئلتك — وسنعود إليك بعرض.",
    },
    ctaLabel: { en: "Contact us", fr: "Nous contacter", ar: "تواصل معنا" },
    ctaHref: "/contact",
  },
];
