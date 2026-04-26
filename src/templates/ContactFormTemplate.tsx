"use client";

/**
 * ContactFormTemplate — wraps a contact form in the standard page chrome.
 * Form behaviour (fields, labels, submit) is driven by the `ContactForm`
 * config object, not by this template.
 */

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import ContactFormPlaceholder from "@/components/ui/ContactFormPlaceholder";
import { useLocale, localise } from "@/context/LocaleContext";
import type { ContactForm } from "@/data/contactForms";
import type { LocalizedString } from "@/i18n";

interface Props {
  form:        ContactForm;
  parentHref:  string;
  parentLabel: LocalizedString;
}

export default function ContactFormTemplate({
  form, parentHref, parentLabel,
}: Props) {
  const { locale } = useLocale();

  return (
    <Layout>
      <PageHeader
        title={localise(form.title, locale)}
        intro={form.shortDesc ? localise(form.shortDesc, locale) : undefined}
        eyebrow={localise(parentLabel, locale)}
        trail={[
          { label: parentLabel, href: parentHref },
          { label: form.title },
        ]}
      />

      <section className="container-x section-y pt-0">
        <ContactFormPlaceholder form={form} />
      </section>
    </Layout>
  );
}
