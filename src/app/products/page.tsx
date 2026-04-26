/**
 * /products — overview of all product categories.
 */

import OverviewTemplate from "@/templates/OverviewTemplate";
import { listProductCategories, productsIntro } from "@/data/productCategories";

const TITLE = { en: "Products & Shop", fr: "Produits & Boutique", ar: "المنتجات والمتجر" };

export default function ProductsOverviewPage() {
  return (
    <OverviewTemplate
      title={TITLE}
      intro={productsIntro}
      eyebrow={TITLE}
      items={listProductCategories()}
      hrefBase="/products"
      breadcrumbs={[{ label: TITLE }]}
      cta={{
        title: { en: "Looking for a specific product?", fr: "Vous cherchez un produit précis ?", ar: "هل تبحث عن منتج محدد؟" },
        body:  { en: "Send a product inquiry — we ship internationally and support B2B orders.", fr: "Envoyez une demande produit — nous livrons à l'international et prenons en charge les commandes B2B.", ar: "أرسل استفسار منتج — نشحن دولياً وندعم طلبات الجملة." },
        label: { en: "Send inquiry", fr: "Envoyer une demande", ar: "إرسال استفسار" },
        href:  "/contact/product-inquiry",
      }}
    />
  );
}
