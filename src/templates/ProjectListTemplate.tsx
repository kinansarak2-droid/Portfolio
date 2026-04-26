"use client";

/**
 * ProjectListTemplate — list view for projects.
 *
 * Used by:
 *   /projects                (default view)
 *   /projects/premium        (featured)
 *   /projects/archive        (archived)
 *
 * Pulls projects from the registry, applies a `ProjectView`'s filter,
 * and renders them as cards. Defensive: handles empty registry without
 * breaking — the page just shows the "no results" copy.
 */

import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import PreviewCard from "@/components/ui/PreviewCard";
import FilterBar from "@/components/ui/FilterBar";
import { useLocale, localise } from "@/context/LocaleContext";
import { allProjects, applyProjectView } from "@/lib/content";
import { projectCategoriesConfig } from "@/data/projectViews";
import type { ProjectView } from "@/data/projectViews";
import type { LocalizedString } from "@/i18n";

interface Props {
  view:        ProjectView;
  parentHref:  string;
  parentLabel: LocalizedString;
}

export default function ProjectListTemplate({
  view, parentHref, parentLabel,
}: Props) {
  const { locale, t } = useLocale();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const baseList = useMemo(() => applyProjectView(allProjects, view), [view]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return baseList;
    return baseList.filter((p) => {
      return activeFilters.some((id) => {
        const cfg = projectCategoriesConfig.find((c) => c.id === id);
        if (!cfg) return false;
        if (cfg.match.category && p.category === cfg.match.category) return true;
        if (cfg.match.tag && (p.tags ?? []).includes(cfg.match.tag)) return true;
        return false;
      });
    });
  }, [baseList, activeFilters]);

  return (
    <Layout>
      <PageHeader
        title={localise(view.title, locale)}
        intro={view.shortDesc ? localise(view.shortDesc, locale) : undefined}
        eyebrow={localise(parentLabel, locale)}
        trail={[
          { label: parentLabel, href: parentHref },
          { label: view.title },
        ]}
      />

      <section className="container-x pb-6">
        <FilterBar
          options={projectCategoriesConfig.map((c) => ({ id: c.id, label: c.label }))}
          onChange={setActiveFilters}
        />
      </section>

      <section className="container-x section-y pt-0">
        {filtered.length === 0 ? (
          <p className="text-sm text-text-muted">{t.projects.noResults}</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
            {filtered.map((p) => (
              <PreviewCard
                key={p.id}
                title={localise(p.title, locale)}
                description={p.shortDesc ? localise(p.shortDesc, locale) : undefined}
                href={`/projects/detail/${p.slug}`}
                imageSrc={p.coverImage}
                imageLabel={localise(p.title, locale)}
                meta={`${p.year}`}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
