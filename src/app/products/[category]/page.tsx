/**
 * /products/[category] — single product category page.
 *
 * Adding a new product category: add an entry to
 * src/data/productCategories.ts. No code change here.
 */

import { notFound } from "next/navigation";
import CategoryTemplate from "@/templates/CategoryTemplate";
import { findProductCategory, listProductCategories } from "@/data/productCategories";

const PARENT_LABEL = { en: "Products & Shop", fr: "Produits & Boutique", ar: "المنتجات والمتجر" };

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = findProductCategory(slug);
  if (!category) notFound();

  return (
    <CategoryTemplate
      category={category}
      parentHref="/products"
      parentLabel={PARENT_LABEL}
      cta={{
        title: { en: "Order or enquire", fr: "Commander ou demander", ar: "اطلب أو استفسر" },
        body:  { en: "We support retail, project, and bulk B2B orders worldwide.", fr: "Nous prenons en charge les commandes de détail, projet et B2B à l'international.", ar: "ندعم طلبات التجزئة والمشاريع والجملة دولياً." },
        label: { en: "Send inquiry", fr: "Envoyer une demande", ar: "إرسال استفسار" },
        href:  "/contact/product-inquiry",
      }}
    />
  );
}

export function generateStaticParams() {
  return listProductCategories().map((c) => ({ category: c.slug }));
}
