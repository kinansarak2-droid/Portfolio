/**
 * PRODUCT CATEGORIES CONFIG
 * ─────────────────────────
 * Each entry describes one Products & Shop category page.
 *
 * Slugs here mirror src/config/site.ts navigation children.
 *
 * "shop", "brands" and "bulk-orders" are also categories — they share
 * the same template but flag different rendering modes.
 */

import type { ContentCategory } from "@/types";

export const productsIntro = {
  en: "Manufactured systems, sports flooring, artificial grass, turf, tiles, accessories, and sports equipment.",
  fr: "Systèmes fabriqués, revêtements sportifs, gazon synthétique, dalles, accessoires et équipements sportifs.",
  ar: "أنظمة مصنّعة وأرضيات رياضية وعشب صناعي وبلاطات وملحقات وتجهيزات رياضية.",
};

export const productCategoriesConfig: ContentCategory[] = [
  {
    id: "ac-systems",
    slug: "ac-systems",
    title: { en: "AC Systems", fr: "Systèmes AC", ar: "أنظمة الأكريليك" },
    shortDesc: {
      en: "Acrylic-based sport surfacing systems.",
      fr: "Systèmes de revêtement sportif à base d'acrylique.",
      ar: "أنظمة أرضيات رياضية أكريليكية.",
    },
    group: "surfaces",
  },
  {
    id: "pu-systems",
    slug: "pu-systems",
    title: { en: "PU Systems", fr: "Systèmes PU", ar: "أنظمة البولي يوريثان" },
    shortDesc: {
      en: "Polyurethane sport flooring and seamless systems.",
      fr: "Revêtements sportifs polyuréthane et systèmes sans joints.",
      ar: "أرضيات رياضية بولي يوريثان وأنظمة بلا فواصل.",
    },
    group: "surfaces",
  },
  {
    id: "artificial-grass",
    slug: "artificial-grass",
    title: { en: "Artificial Grass", fr: "Gazon synthétique", ar: "العشب الصناعي" },
    shortDesc: {
      en: "Football, padel and landscaping artificial grass.",
      fr: "Gazon synthétique pour football, padel et aménagement paysager.",
      ar: "عشب صناعي لكرة القدم والبادل وتنسيق الحدائق.",
    },
    group: "surfaces",
  },
  {
    id: "turf",
    slug: "turf",
    title: { en: "Turf", fr: "Gazon", ar: "العشب الرياضي" },
    shortDesc: {
      en: "Hybrid and shock-pad turf systems.",
      fr: "Systèmes de gazon hybride et tapis amortissants.",
      ar: "أنظمة عشب هجين وطبقات ماصة للصدمات.",
    },
    group: "surfaces",
  },
  {
    id: "tiles",
    slug: "tiles",
    title: { en: "Tiles", fr: "Dalles", ar: "البلاطات" },
    shortDesc: {
      en: "Modular sports tiles and rubber interlocks.",
      fr: "Dalles sportives modulaires et caoutchouc emboîtable.",
      ar: "بلاطات رياضية معيارية وتعشيقات مطاطية.",
    },
    group: "surfaces",
  },
  {
    id: "accessories",
    slug: "accessories",
    title: { en: "Accessories", fr: "Accessoires", ar: "الملحقات" },
    shortDesc: {
      en: "Lining, edging, fixings and ancillary parts.",
      fr: "Marquage, bordures, fixations et pièces auxiliaires.",
      ar: "تخطيط وحواف ومثبّتات وقطع مساعدة.",
    },
    group: "accessories",
  },
  {
    id: "sports-equipment",
    slug: "sports-equipment",
    title: { en: "Sports Equipment", fr: "Équipement sportif", ar: "التجهيزات الرياضية" },
    shortDesc: {
      en: "Goals, posts, nets, scoreboards and team equipment.",
      fr: "Buts, poteaux, filets, panneaux d'affichage et matériel d'équipe.",
      ar: "مرامى وقوائم وشبكات ولوحات تسجيل وتجهيزات الفِرق.",
    },
    group: "equipment",
  },
  {
    id: "brands",
    slug: "brands",
    title: { en: "Brands", fr: "Marques", ar: "العلامات التجارية" },
    shortDesc: {
      en: "Partner and proprietary brand catalogue.",
      fr: "Catalogue des marques partenaires et propriétaires.",
      ar: "كتالوج العلامات الشريكة والخاصة.",
    },
    group: "directory",
  },
  {
    id: "shop",
    slug: "shop",
    title: { en: "Shop", fr: "Boutique", ar: "المتجر" },
    shortDesc: {
      en: "Online shop placeholder for retail and small orders.",
      fr: "Espace boutique en ligne pour la vente au détail et petites commandes.",
      ar: "منصة المتجر الإلكتروني للبيع بالتجزئة والطلبات الصغيرة.",
    },
    group: "commerce",
  },
  {
    id: "bulk-orders",
    slug: "bulk-orders",
    title: { en: "Bulk Orders / B2B", fr: "Commandes en gros / B2B", ar: "طلبات الجملة / الأعمال" },
    shortDesc: {
      en: "Wholesale, contractor and B2B procurement workflow.",
      fr: "Achats en gros, entrepreneurs et flux de procurement B2B.",
      ar: "طلبات الجملة والمتعاقدين ومسار الشراء بين الشركات.",
    },
    group: "commerce",
  },
];

export function findProductCategory(slug: string): ContentCategory | undefined {
  return productCategoriesConfig.find((c) => c.slug === slug && c.status !== "archived");
}

export function listProductCategories(): ContentCategory[] {
  return productCategoriesConfig.filter((c) => c.status !== "archived");
}
