/**
 * /sportanlagen — overview of all sport facility categories.
 * Categories come from src/data/sportFacilities.ts.
 */

import OverviewTemplate from "@/templates/OverviewTemplate";
import { listSportFacilities, sportFacilitiesIntro } from "@/data/sportFacilities";

const TITLE = { en: "Sportanlagen", fr: "Installations sportives", ar: "المنشآت الرياضية" };

export default function SportanlagenOverviewPage() {
  return (
    <OverviewTemplate
      title={TITLE}
      intro={sportFacilitiesIntro}
      eyebrow={{ en: "Sportanlagen", fr: "Installations sportives", ar: "المنشآت الرياضية" }}
      items={listSportFacilities()}
      hrefBase="/sportanlagen"
      breadcrumbs={[{ label: TITLE }]}
      cta={{
        title: { en: "Discuss your facility", fr: "Discutons de votre installation", ar: "ناقش منشأتك" },
        body:  { en: "Share your project requirements and we'll respond with a tailored proposal.", fr: "Partagez les exigences de votre projet et nous reviendrons avec une proposition sur mesure.", ar: "شاركنا متطلبات مشروعك وسنعود إليك بعرض مخصص." },
        label: { en: "Request a quote", fr: "Demander un devis", ar: "طلب عرض سعر" },
        href:  "/contact/request-quote",
      }}
    />
  );
}
