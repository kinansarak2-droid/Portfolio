"use client";

/**
 * OverviewTemplate — top-of-section overview page.
 *
 * Used by:
 *   /sportanlagen
 *   /products
 *   /company
 *
 * Renders a `PageHeader` and a `CategoryGrid` of children. Children
 * come from the relevant config file; the template doesn't know
 * which one — it's passed in.
 */

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import CategoryGrid from "@/components/ui/CategoryGrid";
import CTASection from "@/components/ui/CTASection";
import { useLocale, localise } from "@/context/LocaleContext";
import type { ContentCategory } from "@/types";
import type { LocalizedString } from "@/i18n";

interface Props {
  /** Page heading. */
  title:    LocalizedString;
  /** Page intro paragraph. */
  intro?:   LocalizedString;
  /** Eyebrow line above the heading (e.g. parent section label). */
  eyebrow?: LocalizedString;
  /** Child categories to render in the grid. */
  items:    ContentCategory[];
  /** Base path for child links — e.g. "/sportanlagen". */
  hrefBase: string;
  /** Breadcrumb trail labels (last entry is the current page). */
  breadcrumbs: Array<{ label: LocalizedString | string; href?: string }>;
  /** Optional bottom CTA. */
  cta?: {
    title:    LocalizedString;
    body?:    LocalizedString;
    label:    LocalizedString;
    href:     string;
  };
}

export default function OverviewTemplate({
  title, intro, eyebrow, items, hrefBase, breadcrumbs, cta,
}: Props) {
  const { locale } = useLocale();

  return (
    <Layout>
      <PageHeader
        title={localise(title, locale)}
        intro={intro ? localise(intro, locale) : undefined}
        eyebrow={eyebrow ? localise(eyebrow, locale) : undefined}
        trail={breadcrumbs}
      />

      <section className="container-x section-y pt-0">
        <CategoryGrid items={items} hrefBase={hrefBase} />
      </section>

      {cta ? (
        <CTASection
          title={localise(cta.title, locale)}
          body={cta.body ? localise(cta.body, locale) : undefined}
          ctaLabel={localise(cta.label, locale)}
          ctaHref={cta.href}
        />
      ) : null}
    </Layout>
  );
}
