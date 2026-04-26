/**
 * /sportanlagen/[category] — single sport facility category.
 *
 * Adding a new sport: add an entry to src/data/sportFacilities.ts
 * and (optionally) a nav child in src/config/site.ts. No code change
 * to this route is needed — the dynamic segment renders any slug.
 */

import { notFound } from "next/navigation";
import CategoryTemplate from "@/templates/CategoryTemplate";
import { findSportFacility, listSportFacilities } from "@/data/sportFacilities";

const PARENT_LABEL = { en: "Sportanlagen", fr: "Installations sportives", ar: "المنشآت الرياضية" };

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function SportFacilityPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = findSportFacility(slug);
  if (!category) notFound();

  return (
    <CategoryTemplate
      category={category}
      parentHref="/sportanlagen"
      parentLabel={PARENT_LABEL}
      cta={{
        title: { en: "Plan your facility", fr: "Planifiez votre installation", ar: "خطّط لمنشأتك" },
        body:  { en: "Tell us about your site and we'll come back with a tailored quote.", fr: "Parlez-nous de votre site et nous reviendrons avec un devis personnalisé.", ar: "أخبرنا عن موقعك وسنعود إليك بعرض سعر مخصص." },
        label: { en: "Request a quote", fr: "Demander un devis", ar: "طلب عرض سعر" },
        href:  "/contact/request-quote",
      }}
    />
  );
}

/** Build-time hint: prerender every published category. */
export function generateStaticParams() {
  return listSportFacilities().map((c) => ({ category: c.slug }));
}
