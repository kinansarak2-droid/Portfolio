/**
 * /company — overview of company subpages (about, manufacturing, R&D…).
 */

import OverviewTemplate from "@/templates/OverviewTemplate";
import { listCompanyPages, companyIntro } from "@/data/companyPages";

const TITLE = { en: "Company", fr: "Entreprise", ar: "الشركة" };

export default function CompanyOverviewPage() {
  return (
    <OverviewTemplate
      title={TITLE}
      intro={companyIntro}
      eyebrow={TITLE}
      items={listCompanyPages()}
      hrefBase="/company"
      breadcrumbs={[{ label: TITLE }]}
      cta={{
        title: { en: "Talk to our team", fr: "Parler à notre équipe", ar: "تحدّث إلى فريقنا" },
        body:  { en: "Site visits, partnerships and supplier requests welcome.", fr: "Visites de site, partenariats et demandes fournisseurs bienvenus.", ar: "زيارات الموقع والشراكات وطلبات التوريد موضع ترحيب." },
        label: { en: "Contact us", fr: "Nous contacter", ar: "تواصل معنا" },
        href:  "/contact",
      }}
    />
  );
}
