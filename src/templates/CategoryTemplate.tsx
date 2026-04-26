"use client";

/**
 * CategoryTemplate — single category page.
 *
 * Used by:
 *   /sportanlagen/[category]
 *   /products/[category]
 *
 * Lays out a hero header, a body section for the long description,
 * a placeholder image gallery, and a CTA. Defensive against missing
 * data — every block renders only when it has content.
 */

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import SectionBlock from "@/components/ui/SectionBlock";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import CTASection from "@/components/ui/CTASection";
import { useLocale, localise } from "@/context/LocaleContext";
import type { ContentCategory } from "@/types";
import type { LocalizedString } from "@/i18n";

interface Props {
  category:    ContentCategory;
  /** Base path for the parent section, e.g. "/sportanlagen". */
  parentHref:  string;
  parentLabel: LocalizedString;
  cta?: {
    title:    LocalizedString;
    body?:    LocalizedString;
    label:    LocalizedString;
    href:     string;
  };
}

export default function CategoryTemplate({
  category, parentHref, parentLabel, cta,
}: Props) {
  const { locale } = useLocale();
  const title       = localise(category.title, locale);
  const shortDesc   = category.shortDesc ? localise(category.shortDesc, locale) : undefined;
  const longDesc    = category.longDesc  ? localise(category.longDesc,  locale) : undefined;

  return (
    <Layout>
      <PageHeader
        title={title}
        intro={shortDesc}
        eyebrow={localise(parentLabel, locale)}
        trail={[
          { label: parentLabel, href: parentHref },
          { label: category.title },
        ]}
      />

      <section className="container-x pb-16">
        <PlaceholderImage label={title} ratio="16/9" src={category.coverImage} />
      </section>

      {longDesc ? (
        <SectionBlock title={undefined} intro={longDesc} />
      ) : null}

      {/* Generic placeholder content sections — replaceable per-category later. */}
      <SectionBlock
        eyebrow="Highlights"
        title="Highlights"
        intro="Placeholder for key features, dimensions, certifications, and configuration options for this category."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <PlaceholderImage key={i} ratio="4/3" label={`${title} — image ${i}`} />
          ))}
        </div>
      </SectionBlock>

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
