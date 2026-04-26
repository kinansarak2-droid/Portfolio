/**
 * /company/[section] — single company subpage.
 */

import { notFound } from "next/navigation";
import CompanySubpageTemplate from "@/templates/CompanySubpageTemplate";
import { findCompanyPage, listCompanyPages } from "@/data/companyPages";

const PARENT_LABEL = { en: "Company", fr: "Entreprise", ar: "الشركة" };

interface PageProps {
  params: Promise<{ section: string }>;
}

export default async function CompanySectionPage({ params }: PageProps) {
  const { section: slug } = await params;
  const page = findCompanyPage(slug);
  if (!page) notFound();

  return (
    <CompanySubpageTemplate
      page={page}
      parentHref="/company"
      parentLabel={PARENT_LABEL}
      cta={{
        title: { en: "Get in touch", fr: "Nous contacter", ar: "تواصل معنا" },
        label: { en: "Contact us", fr: "Nous contacter", ar: "تواصل معنا" },
        href:  "/contact",
      }}
    />
  );
}

export function generateStaticParams() {
  return listCompanyPages().map((c) => ({ section: c.slug }));
}
