/**
 * /contact/[form] — alternate contact form.
 *
 * Forms are defined in src/data/contactForms.ts. Adding a new form
 * (e.g. "service-request") is a config-only change.
 */

import { notFound, redirect } from "next/navigation";
import ContactFormTemplate from "@/templates/ContactFormTemplate";
import { findContactForm, contactFormsConfig, getDefaultContactForm } from "@/data/contactForms";

const PARENT_LABEL = { en: "Contact", fr: "Contact", ar: "اتصل بنا" };

interface PageProps {
  params: Promise<{ form: string }>;
}

export default async function ContactFormPage({ params }: PageProps) {
  const { form: slug } = await params;
  const form = findContactForm(slug);
  if (!form) notFound();
  if (form === getDefaultContactForm()) redirect("/contact");

  return (
    <ContactFormTemplate
      form={form}
      parentHref="/contact"
      parentLabel={PARENT_LABEL}
    />
  );
}

export function generateStaticParams() {
  return contactFormsConfig
    .filter((f) => !f.isDefault)
    .map((f) => ({ form: f.slug }));
}
