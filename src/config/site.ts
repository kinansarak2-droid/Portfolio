/**
 * SITE CONFIG — single source of truth for the website shell
 * ──────────────────────────────────────────────────────────
 * What lives here:
 *   • Site identity (name, description, social links)
 *   • Top-level route definitions
 *   • The main navigation tree (with optional dropdown children)
 *   • Global CTAs and footer column structure
 *
 * What does NOT live here:
 *   • Content of individual category pages → src/data/sportFacilities.ts etc.
 *   • Individual project entries           → src/data/projects/*.ts
 *   • UI strings (button labels, form labels, common chrome) → src/i18n/*
 *
 * Changing site structure (add a top-level page, rename a section,
 * reorder nav, change brand name, update social link) is done here.
 */

import type { NavItem } from "@/types/navigation";
import type { LocalizedString } from "@/i18n";

/** Branded identity strings, language-aware. */
export const siteIdentity = {
  name:    "SARAKBI SPORT",                     // brand wordmark, locale-agnostic
  legalName: "Sarakbi Sport Co.",
  tagline: {
    en: "Sports facility construction & sports systems manufacturing.",
    fr: "Construction d'installations sportives et fabrication de systèmes sportifs.",
    ar: "إنشاء المنشآت الرياضية وتصنيع الأنظمة الرياضية.",
  } satisfies LocalizedString,
  description: {
    en: "Sarakbi Sport designs, manufactures, and installs complete sports facilities — courts, fields, flooring systems, artificial grass, equipment, and more.",
    fr: "Sarakbi Sport conçoit, fabrique et installe des installations sportives complètes : terrains, revêtements, gazon synthétique, équipements et plus.",
    ar: "تصمّم شركة ساركبي للرياضة وتصنّع وتنفّذ منشآت رياضية متكاملة، تشمل الملاعب والأرضيات الرياضية والعشب الصناعي والتجهيزات وغيرها.",
  } satisfies LocalizedString,
  /** Public domain, used in metadata and absolute links. Update before launch. */
  url: "https://sarakbisport.com",
};

/**
 * Top-level routes (used to build the URL structure and breadcrumbs).
 * Order in this array equals order in the main nav.
 *
 * Adding a top-level page = add an entry here AND create a page.tsx
 * under src/app/[path]/. Removing one = delete here AND remove the route.
 */
export const ROUTES = {
  home:           { id: "home",           path: "/",              navId: "home"           },
  sportanlagen:   { id: "sportanlagen",   path: "/sportanlagen",  navId: "sportanlagen"   },
  products:       { id: "products",       path: "/products",      navId: "products"       },
  projects:       { id: "projects",       path: "/projects",      navId: "projects"       },
  company:        { id: "company",        path: "/company",       navId: "company"        },
  contact:        { id: "contact",        path: "/contact",       navId: "contact"        },
} as const;

/**
 * MAIN NAVIGATION TREE
 * ────────────────────
 * Children render as a dropdown. Reorder by moving objects in the array.
 * Hide an item without deleting it via `hidden: true`.
 *
 * The actual category content (descriptions, etc.) lives in:
 *   • src/data/sportFacilities.ts
 *   • src/data/productCategories.ts
 *   • src/data/projectViews.ts
 *   • src/data/companyPages.ts
 *   • src/data/contactForms.ts
 *
 * The dropdown items below are the *navigation labels* only — they
 * mirror the slugs in those data files.
 */
export const navigation: NavItem[] = [
  {
    id: "home",
    label: { en: "Home", fr: "Accueil", ar: "الرئيسية" },
    href: ROUTES.home.path,
  },
  {
    id: "sportanlagen",
    label: { en: "Sportanlagen", fr: "Installations sportives", ar: "المنشآت الرياضية" },
    href: ROUTES.sportanlagen.path,
    /** Children mirror sportFacilities.ts entries (by slug). */
    children: [
      { id: "overview",                href: "/sportanlagen",                          label: { en: "Overview",                       fr: "Aperçu",                       ar: "نظرة عامة" } },
      { id: "football",                href: "/sportanlagen/football",                 label: { en: "Football / Soccer",              fr: "Football",                     ar: "كرة القدم" } },
      { id: "basketball",              href: "/sportanlagen/basketball",               label: { en: "Basketball",                     fr: "Basketball",                   ar: "كرة السلة" } },
      { id: "tennis",                  href: "/sportanlagen/tennis",                   label: { en: "Tennis",                         fr: "Tennis",                       ar: "التنس" } },
      { id: "tracks-athletics",        href: "/sportanlagen/tracks-athletics",         label: { en: "Tracks & Athletics",             fr: "Pistes & Athlétisme",          ar: "المضامير وألعاب القوى" } },
      { id: "padel",                   href: "/sportanlagen/padel",                    label: { en: "Padel",                          fr: "Padel",                        ar: "البادل" } },
      { id: "badminton",               href: "/sportanlagen/badminton",                label: { en: "Badminton",                      fr: "Badminton",                    ar: "الريشة الطائرة" } },
      { id: "pickleball",              href: "/sportanlagen/pickleball",               label: { en: "Pickleball",                     fr: "Pickleball",                   ar: "البيكلبول" } },
      { id: "volleyball",              href: "/sportanlagen/volleyball",               label: { en: "Volleyball",                     fr: "Volleyball",                   ar: "الكرة الطائرة" } },
      { id: "handball",                href: "/sportanlagen/handball",                 label: { en: "Handball",                       fr: "Handball",                     ar: "كرة اليد" } },
      { id: "multicourt",              href: "/sportanlagen/multicourt",               label: { en: "Multicourt",                     fr: "Terrain multisports",          ar: "ملعب متعدد الرياضات" } },
      { id: "gym-fitness",             href: "/sportanlagen/gym-fitness",              label: { en: "Gym & Fitness",                  fr: "Gym & Fitness",                ar: "الصالات الرياضية واللياقة" } },
      { id: "playgrounds",             href: "/sportanlagen/playgrounds",              label: { en: "Playgrounds",                    fr: "Aires de jeux",                ar: "ساحات اللعب" } },
      { id: "urban-cycling",           href: "/sportanlagen/urban-cycling",            label: { en: "Urban Cycling & Street Furniture", fr: "Cyclisme urbain & mobilier urbain", ar: "الدراجات الحضرية والأثاث العام" } },
      { id: "martial-arts",            href: "/sportanlagen/martial-arts",             label: { en: "Martial Arts",                   fr: "Arts martiaux",                ar: "الفنون القتالية" } },
      { id: "wheelchair-sports",       href: "/sportanlagen/wheelchair-sports",        label: { en: "Wheelchair Sports",              fr: "Sports en fauteuil roulant",   ar: "رياضات الكراسي المتحركة" } },
      { id: "construction-services",   href: "/sportanlagen/construction-services",    label: { en: "Construction Services",          fr: "Services de construction",     ar: "خدمات الإنشاء" } },
      { id: "standards-certifications",href: "/sportanlagen/standards-certifications", label: { en: "Standards & Certifications",     fr: "Normes & Certifications",      ar: "المعايير والاعتمادات" } },
      { id: "complete-system",         href: "/sportanlagen/complete-system",          label: { en: "Complete Integrated System",     fr: "Système intégré complet",      ar: "النظام المتكامل الشامل" } },
    ],
  },
  {
    id: "products",
    label: { en: "Products & Shop", fr: "Produits & Boutique", ar: "المنتجات والمتجر" },
    href: ROUTES.products.path,
    children: [
      { id: "overview",        href: "/products",                  label: { en: "Overview",            fr: "Aperçu",            ar: "نظرة عامة" } },
      { id: "ac-systems",      href: "/products/ac-systems",       label: { en: "AC Systems",          fr: "Systèmes AC",       ar: "أنظمة الأكريليك" } },
      { id: "pu-systems",      href: "/products/pu-systems",       label: { en: "PU Systems",          fr: "Systèmes PU",       ar: "أنظمة البولي يوريثان" } },
      { id: "artificial-grass",href: "/products/artificial-grass", label: { en: "Artificial Grass",    fr: "Gazon synthétique", ar: "العشب الصناعي" } },
      { id: "turf",            href: "/products/turf",             label: { en: "Turf",                fr: "Gazon",             ar: "العشب الرياضي" } },
      { id: "tiles",           href: "/products/tiles",            label: { en: "Tiles",               fr: "Dalles",            ar: "البلاطات" } },
      { id: "accessories",     href: "/products/accessories",      label: { en: "Accessories",        fr: "Accessoires",       ar: "الملحقات" } },
      { id: "sports-equipment",href: "/products/sports-equipment", label: { en: "Sports Equipment",    fr: "Équipement sportif",ar: "التجهيزات الرياضية" } },
      { id: "brands",          href: "/products/brands",           label: { en: "Brands",              fr: "Marques",           ar: "العلامات التجارية" } },
      { id: "shop",            href: "/products/shop",             label: { en: "Shop",                fr: "Boutique",          ar: "المتجر" } },
      { id: "bulk-orders",     href: "/products/bulk-orders",      label: { en: "Bulk Orders / B2B",   fr: "Commandes en gros / B2B", ar: "طلبات الجملة / الأعمال" } },
    ],
  },
  {
    id: "projects",
    label: { en: "Projects", fr: "Projets", ar: "المشاريع" },
    href: ROUTES.projects.path,
    children: [
      { id: "all",     href: "/projects",         label: { en: "All Projects",     fr: "Tous les projets",   ar: "كل المشاريع" } },
      { id: "premium", href: "/projects/premium", label: { en: "Premium Projects", fr: "Projets premium",    ar: "المشاريع المميزة" } },
      { id: "archive", href: "/projects/archive", label: { en: "Archive",          fr: "Archive",            ar: "الأرشيف" } },
    ],
  },
  {
    id: "company",
    label: { en: "Company", fr: "Entreprise", ar: "الشركة" },
    href: ROUTES.company.path,
    children: [
      { id: "overview",      href: "/company",               label: { en: "Overview",      fr: "Aperçu",      ar: "نظرة عامة" } },
      { id: "about",         href: "/company/about",         label: { en: "About Us",      fr: "À propos",    ar: "من نحن" } },
      { id: "manufacturing", href: "/company/manufacturing", label: { en: "Manufacturing", fr: "Fabrication", ar: "التصنيع" } },
      { id: "rd",            href: "/company/rd",            label: { en: "R&D",           fr: "R&D",         ar: "البحث والتطوير" } },
      { id: "innovation",    href: "/company/innovation",    label: { en: "Innovation",    fr: "Innovation",  ar: "الابتكار" } },
      { id: "design",        href: "/company/design",        label: { en: "Design",        fr: "Conception",  ar: "التصميم" } },
      { id: "development",   href: "/company/development",   label: { en: "Development",   fr: "Développement", ar: "التطوير" } },
      { id: "machinery",     href: "/company/machinery",     label: { en: "Machinery",     fr: "Machinerie",  ar: "الآليات" } },
      { id: "installation",  href: "/company/installation",  label: { en: "Installation",  fr: "Installation",ar: "التركيب" } },
      { id: "quality",       href: "/company/quality",       label: { en: "Quality",       fr: "Qualité",     ar: "الجودة" } },
    ],
  },
  {
    id: "contact",
    label: { en: "Contact", fr: "Contact", ar: "اتصل بنا" },
    href: ROUTES.contact.path,
    children: [
      { id: "contact-us",    href: "/contact",                  label: { en: "Contact Us",        fr: "Nous contacter",      ar: "تواصل معنا" } },
      { id: "request-quote", href: "/contact/request-quote",    label: { en: "Request a Quote",   fr: "Demander un devis",   ar: "طلب عرض سعر" } },
      { id: "product-inquiry", href: "/contact/product-inquiry",label: { en: "Product Inquiry",   fr: "Demande produit",     ar: "استفسار عن منتج" } },
      { id: "upload-plans",  href: "/contact/upload-plans",     label: { en: "Upload Project Plans", fr: "Envoyer des plans", ar: "إرفاق مخططات مشروع" } },
    ],
  },
];

/**
 * Footer column structure. Each column reuses LocalizedString labels
 * and a list of nav items. Rendered by `<Footer />`.
 */
export const footerColumns = [
  {
    id: "explore",
    label: { en: "Explore", fr: "Explorer", ar: "استكشف" } satisfies LocalizedString,
    /** IDs reference top-level navigation entries above. */
    items: ["sportanlagen", "products", "projects", "company"] as const,
  },
  {
    id: "support",
    label: { en: "Get in touch", fr: "Contact", ar: "تواصل" } satisfies LocalizedString,
    items: ["contact"] as const,
  },
];

/** Social links — order = display order. Empty array hides the block. */
export const socialLinks: Array<{ id: string; label: string; href: string }> = [
  // { id: "instagram", label: "Instagram", href: "https://instagram.com/sarakbisport" },
  // { id: "linkedin",  label: "LinkedIn",  href: "https://linkedin.com/company/sarakbisport" },
];

/** Default page metadata, used as fallback when a page does not provide its own. */
export const defaultPageMeta = {
  title: siteIdentity.name,
  description: siteIdentity.description,
};
