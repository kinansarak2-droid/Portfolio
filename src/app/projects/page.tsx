"use client";

/**
 * /projects — Archive page skeleton
 * ───────────────────────────────────
 * Wired to real data, filters, stats, and i18n.
 * Design is intentionally unstyled (TODO blocks).
 * When ready to design, replace the inline style props
 * with Tailwind classes / CSS modules / styled components.
 */

import { useMemo } from "react";
import Link from "next/link";
import { useLocale, localise } from "@/context/LocaleContext";
import { useFilters }          from "@/hooks/useFilters";
import type { UseFiltersReturn } from "@/hooks/useFilters";
import { useStats }            from "@/hooks/useStats";
import type { ProjectStats }   from "@/hooks/useStats";
import { FILTER_GROUPS, applyFilters } from "@/data/filters";
import type { ChipsFilter, SegmentFilter, RangeFilter, LocationFilter } from "@/data/filters";
import { allProjects }         from "@/data/projects";
import type { Project }        from "@/types/project";

/* ─── Page ─────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const { t, locale, dir } = useLocale();

  const filters = useFilters();

  const visible = useMemo(
    () => applyFilters(allProjects, filters.state),
    [filters.state]
  );

  const stats = useStats(visible);

  return (
    <main dir={dir} style={{ padding: "120px 48px 80px" }}>

      {/* Back */}
      <Link href="/" style={{ display: "block", marginBottom: "48px" }}>
        {t.projects.backToHome}
      </Link>

      {/* Header */}
      <header style={{ marginBottom: "48px" }}>
        <p>{t.projects.pageSubtitle}</p>
        <h1>{t.projects.pageTitle}</h1>
      </header>

      {/* Language switcher */}
      <LanguageSwitcher />

      {/* ── Filter toolbar ── */}
      <FilterToolbar filters={filters} stats={stats} t={t} locale={locale} />

      {/* Results count */}
      <p style={{ marginBottom: "24px" }}>
        {visible.length} / {allProjects.length}
      </p>

      {/* Empty state */}
      {visible.length === 0 && (
        <p>{t.projects.noResults}</p>
      )}

      {/* Grid */}
      <ProjectGrid projects={visible} locale={locale} t={t} />

    </main>
  );
}

/* ─── Language switcher ─────────────────────────────────────── */
function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          disabled={l === locale}
          style={{ fontWeight: l === locale ? 700 : 400 }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ─── Filter toolbar ─────────────────────────────────────────── */
type FilterToolbarProps = {
  filters: UseFiltersReturn;
  stats:   ProjectStats;
  t:       ReturnType<typeof useLocale>["t"];
  locale:  ReturnType<typeof useLocale>["locale"];
};

function FilterToolbar({ filters, stats, t, locale }: FilterToolbarProps) {
  if (FILTER_GROUPS.length === 0) return null;

  return (
    <div style={{ marginBottom: "40px" }}>

      {/* Clear-all button */}
      {filters.hasAnyActive && (
        <button onClick={filters.clearAll} style={{ marginBottom: "16px" }}>
          {t.projects.clearFilters}
        </button>
      )}

      {/* ── Group rows ── */}
      {FILTER_GROUPS.map((group) => (
        <div key={group.id} style={{ marginBottom: "16px" }}>
          <p style={{ marginBottom: "8px" }}>
            {localise(group.label, locale)}
          </p>

          {/* Chips */}
          {group.type === "chips" && (
            <ChipsGroup
              group={group as ChipsFilter}
              isChipActive={filters.isChipActive}
              toggleChip={filters.toggleChip}
              clearGroup={filters.clearGroup}
              locale={locale}
              t={t}
            />
          )}

          {/* Segment */}
          {group.type === "segment" && (
            <SegmentGroup
              group={group as SegmentFilter}
              getSegment={filters.getSegment}
              setSegment={filters.setSegment}
              locale={locale}
            />
          )}

          {/* Range */}
          {group.type === "range" && (
            <RangeGroup
              group={group as RangeFilter}
              getRange={filters.getRange}
              getRangeBounds={filters.getRangeBounds}
              setRange={filters.setRange}
              t={t}
            />
          )}

          {/* Location */}
          {group.type === "location" && (
            <LocationGroup
              group={group as LocationFilter}
              location={filters.state.location}
              setLocation={filters.setLocation}
              clearLocation={filters.clearLocation}
              locale={locale}
              t={t}
            />
          )}
        </div>
      ))}

      {/* ── Stats panel ── */}
      <StatsPanel stats={stats} t={t} locale={locale} />
    </div>
  );
}

/* ─── Chips group ─────────────────────────────────────────────── */
type ChipsGroupProps = {
  group:        ChipsFilter;
  isChipActive: UseFiltersReturn["isChipActive"];
  toggleChip:   UseFiltersReturn["toggleChip"];
  clearGroup:   UseFiltersReturn["clearGroup"];
  locale:       ReturnType<typeof useLocale>["locale"];
  t:            ReturnType<typeof useLocale>["t"];
};

function ChipsGroup({ group, isChipActive, toggleChip, clearGroup, locale, t }: ChipsGroupProps) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {/* "All" resets this group */}
      <button onClick={() => clearGroup(group.id)}>
        {t.common.all}
      </button>

      {group.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => toggleChip(group.id, opt.value)}
          style={{
            fontWeight: isChipActive(group.id, opt.value) ? 700 : 400,
            // Surface chips: show color swatch if defined
            borderLeft: "color" in opt && opt.color
              ? `4px solid ${opt.color}`
              : undefined,
          }}
        >
          {"icon" in opt && opt.icon ? `${opt.icon} ` : ""}
          {localise(opt.label, locale)}
        </button>
      ))}
    </div>
  );
}

/* ─── Segment group ───────────────────────────────────────────── */
type SegmentGroupProps = {
  group:      SegmentFilter;
  getSegment: UseFiltersReturn["getSegment"];
  setSegment: UseFiltersReturn["setSegment"];
  locale:     ReturnType<typeof useLocale>["locale"];
};

function SegmentGroup({ group, getSegment, setSegment, locale }: SegmentGroupProps) {
  const active = getSegment(group.id);
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {group.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setSegment(group.id, opt.value)}
          style={{ fontWeight: active === opt.value ? 700 : 400 }}
        >
          {localise(opt.label, locale)}
        </button>
      ))}
    </div>
  );
}

/* ─── Range group (year slider) ───────────────────────────────── */
type RangeGroupProps = {
  group:          RangeFilter;
  getRange:       UseFiltersReturn["getRange"];
  getRangeBounds: UseFiltersReturn["getRangeBounds"];
  setRange:       UseFiltersReturn["setRange"];
  t:              ReturnType<typeof useLocale>["t"];
};

function RangeGroup({ group, getRange, getRangeBounds, setRange, t }: RangeGroupProps) {
  const [lo, hi]     = getRange(group.id);
  const [min, max]   = getRangeBounds(group.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "320px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{t.filters.yearFrom}: {lo}</span>
        <span>{t.filters.yearTo}: {hi}</span>
      </div>

      {/* Low handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={group.step}
        value={lo}
        onChange={(e) => {
          const v = Number(e.target.value);
          setRange(group.id, [Math.min(v, hi), hi]);
        }}
      />

      {/* High handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={group.step}
        value={hi}
        onChange={(e) => {
          const v = Number(e.target.value);
          setRange(group.id, [lo, Math.max(v, lo)]);
        }}
      />

      {/* Tick labels */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {group.ticks.map((tick) => (
          <span key={tick} style={{ fontSize: "11px" }}>{tick}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Location group (grouped dropdown) ──────────────────────── */
type LocationGroupProps = {
  group:         LocationFilter;
  location:      string;
  setLocation:   UseFiltersReturn["setLocation"];
  clearLocation: UseFiltersReturn["clearLocation"];
  locale:        ReturnType<typeof useLocale>["locale"];
  t:             ReturnType<typeof useLocale>["t"];
};

function LocationGroup({ group, location, setLocation, clearLocation, locale, t }: LocationGroupProps) {
  return (
    <select
      value={location}
      onChange={(e) => {
        if (e.target.value === "") clearLocation();
        else setLocation(e.target.value);
      }}
    >
      <option value="">{t.filters.locationPlaceholder}</option>
      {group.groups.map((grp) => (
        <optgroup key={localise(grp.groupLabel, locale)} label={localise(grp.groupLabel, locale)}>
          {grp.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {localise(opt.label, locale)}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

/* ─── Stats panel ─────────────────────────────────────────────── */
type StatsPanelProps = {
  stats:  ProjectStats;
  t:      ReturnType<typeof useLocale>["t"];
  locale: ReturnType<typeof useLocale>["locale"];
};

function StatsPanel({ stats, t }: StatsPanelProps) {
  const { projects, area, areaUnit, locations, topSport, topSurface, noData } = t.stats;
  return (
    <div style={{ marginTop: "24px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
      <StatItem label={projects}   value={String(stats.count)} />
      <StatItem
        label={area}
        value={stats.totalArea !== undefined
          ? `${stats.totalArea.toLocaleString()} ${areaUnit}`
          : noData}
      />
      <StatItem label={locations}  value={String(stats.locations)} />
      <StatItem label={topSport}   value={stats.topSport   ?? noData} />
      <StatItem label={topSurface} value={stats.topSurface ?? noData} />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ fontSize: "24px", fontWeight: 700 }}>{value}</p>
    </div>
  );
}

/* ─── Project grid ───────────────────────────────────────────── */
type ProjectGridProps = {
  projects: Project[];
  locale:   ReturnType<typeof useLocale>["locale"];
  t:        ReturnType<typeof useLocale>["t"];
};

function ProjectGrid({ projects, locale, t }: ProjectGridProps) {
  // TODO: design — masonry / equal-grid / list-row
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} locale={locale} t={t} />
      ))}
    </div>
  );
}

/* ─── Project card ───────────────────────────────────────────── */
type ProjectCardProps = {
  project: Project;
  locale:  ReturnType<typeof useLocale>["locale"];
  t:       ReturnType<typeof useLocale>["t"];
};

function ProjectCard({ project, locale, t }: ProjectCardProps) {
  // TODO: design — square thumb / wide row / expandable
  return (
    <Link href={`/projects/${project.slug}`} style={{ display: "block" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.coverImage}
        alt={localise(project.title, locale)}
        style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
      />
      <div style={{ padding: "12px 0" }}>
        <p>{localise(project.title, locale)}</p>
        <p>{localise(project.city, locale)}, {localise(project.country, locale)}</p>
        <p>{project.year}</p>
        <p>
          {t.projects.card.surface}: {project.surfaces.join(", ")}
        </p>
        {project.areaSqm && (
          <p>{t.projects.card.area}: {project.areaSqm.toLocaleString()} {t.stats.areaUnit}</p>
        )}
        {project.featured && <span>★</span>}
      </div>
    </Link>
  );
}
