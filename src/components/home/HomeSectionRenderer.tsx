"use client";

/**
 * HomeSectionRenderer — picks a renderer for each homepage section.
 *
 * Section "kinds" are open: add a new kind by:
 *   1. Adding a `case` here that returns the right component.
 *   2. Adding an entry in src/data/home.ts with that kind.
 *
 * Sections of unknown kind are skipped — the homepage won't break.
 */

import Link from "next/link";
import { useLocale, localise } from "@/context/LocaleContext";
import type { PageSection } from "@/types";
import SectionBlock from "@/components/ui/SectionBlock";
import CTASection from "@/components/ui/CTASection";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import PreviewCard from "@/components/ui/PreviewCard";
import { resolveSectionSource } from "@/lib/content";
import type { ContentCategory } from "@/types";
import type { Project } from "@/types/project";

interface Props {
  sections: PageSection[];
}

export default function HomeSectionRenderer({ sections }: Props) {
  const { locale } = useLocale();

  return (
    <>
      {sections
        .filter((s) => s.status !== "draft" && s.status !== "archived")
        .map((s) => {
          const title    = s.title    ? localise(s.title,    locale) : undefined;
          const subtitle = s.subtitle ? localise(s.subtitle, locale) : undefined;
          const body     = s.body     ? localise(s.body,     locale) : undefined;
          const cta      = s.ctaLabel ? localise(s.ctaLabel, locale) : undefined;

          switch (s.kind) {
            case "hero":
              return (
                <section
                  key={s.id}
                  className="container-x section-y grid md:grid-cols-2 gap-10 items-end"
                >
                  <div>
                    <h1 className="font-display text-3xl md:text-5xl">
                      {title}
                    </h1>
                    {subtitle ? (
                      <p className="mt-4 text-md text-text-muted max-w-xl">
                        {subtitle}
                      </p>
                    ) : null}
                    {cta && s.ctaHref ? (
                      <div className="mt-6">
                        <Link
                          href={s.ctaHref}
                          className="inline-block px-5 py-3 rounded-full bg-accent text-accent-fg text-sm uppercase tracking-wider hover:opacity-90 transition-opacity duration-base"
                        >
                          {cta}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <PlaceholderImage ratio="4/3" label="Hero placeholder" />
                </section>
              );

            case "what-we-do":
              return (
                <SectionBlock
                  key={s.id}
                  tone="muted"
                  eyebrow={subtitle}
                  title={title}
                  intro={body}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <PreviewCard
                      title="Sportanlagen"
                      description="Sports facility construction"
                      href="/sportanlagen"
                      imageRatio="16/9"
                    />
                    <PreviewCard
                      title="Products & Shop"
                      description="Manufactured systems, surfaces, equipment"
                      href="/products"
                      imageRatio="16/9"
                    />
                  </div>
                </SectionBlock>
              );

            case "preview-grid": {
              const items = resolveSectionSource(s.source, s.limit) as ContentCategory[];
              const hrefBase = s.source === "sportFacilities"
                ? "/sportanlagen"
                : s.source === "productCategories"
                  ? "/products"
                  : s.source === "companyPages"
                    ? "/company"
                    : "/";
              return (
                <SectionBlock
                  key={s.id}
                  eyebrow={subtitle}
                  title={title}
                >
                  {items.length ? (
                    <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
                      {items.map((item) => (
                        <PreviewCard
                          key={item.id}
                          title={localise(item.title, locale)}
                          description={item.shortDesc ? localise(item.shortDesc, locale) : undefined}
                          href={`${hrefBase}/${item.slug}`}
                          imageSrc={item.coverImage}
                          imageLabel={localise(item.title, locale)}
                        />
                      ))}
                    </div>
                  ) : null}
                  {cta && s.ctaHref ? (
                    <div className="mt-8">
                      <Link
                        href={s.ctaHref}
                        className="text-sm uppercase tracking-wider underline underline-offset-4"
                      >
                        {cta} →
                      </Link>
                    </div>
                  ) : null}
                </SectionBlock>
              );
            }

            case "featured-projects": {
              const items = resolveSectionSource(s.source, s.limit) as Project[];
              return (
                <SectionBlock
                  key={s.id}
                  eyebrow={subtitle}
                  title={title}
                >
                  {items.length ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                      {items.map((p) => (
                        <PreviewCard
                          key={p.id}
                          title={localise(p.title, locale)}
                          description={p.shortDesc ? localise(p.shortDesc, locale) : undefined}
                          href={`/projects/detail/${p.slug}`}
                          imageSrc={p.coverImage}
                          imageLabel={localise(p.title, locale)}
                          meta={`${p.year}`}
                          imageRatio="16/9"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-muted">
                      Featured projects placeholder — projects will appear here
                      once entries are added in src/data/projects/.
                    </p>
                  )}
                  {cta && s.ctaHref ? (
                    <div className="mt-8">
                      <Link
                        href={s.ctaHref}
                        className="text-sm uppercase tracking-wider underline underline-offset-4"
                      >
                        {cta} →
                      </Link>
                    </div>
                  ) : null}
                </SectionBlock>
              );
            }

            case "cta":
              return cta && s.ctaHref ? (
                <CTASection
                  key={s.id}
                  title={title ?? ""}
                  body={body}
                  ctaLabel={cta}
                  ctaHref={s.ctaHref}
                />
              ) : null;

            default:
              // Unknown kind — skip silently. Homepage stays robust.
              return null;
          }
        })}
    </>
  );
}
