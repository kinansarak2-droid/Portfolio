"use client";

/**
 * useStats — derives the Stats panel values from the currently
 * visible (filtered) project list. All values update live as
 * filters change.
 *
 * Usage:
 *   const visible = applyFilters(allProjects, filters.state);
 *   const stats   = useStats(visible);
 *
 *   stats.count       // number of matching projects
 *   stats.totalArea   // sum of areaSqm (undefined if no data)
 *   stats.locations   // count of unique locationKeys
 *   stats.topSport    // most common sport value string
 *   stats.topSurface  // most common surface value string
 */

import { useMemo } from "react";
import type { Project } from "@/types/project";

export interface ProjectStats {
  count:       number;
  totalArea:   number | undefined;   // undefined when no project has areaSqm
  locations:   number;               // unique locationKey count
  topSport:    string | undefined;   // raw value key, e.g. "basketball"
  topSurface:  string | undefined;   // raw value key, e.g. "acrylic"
}

export function useStats(projects: Project[]): ProjectStats {
  return useMemo(() => {
    if (projects.length === 0) {
      return { count: 0, totalArea: undefined, locations: 0, topSport: undefined, topSurface: undefined };
    }

    /* count */
    const count = projects.length;

    /* totalArea — skip projects without areaSqm */
    const areas = projects.map((p) => p.areaSqm).filter((a): a is number => typeof a === "number");
    const totalArea = areas.length > 0 ? areas.reduce((s, a) => s + a, 0) : undefined;

    /* unique locations */
    const locationSet = new Set(projects.map((p) => p.locationKey).filter(Boolean));
    const locations = locationSet.size;

    /* top sport */
    const topSport = mostCommon(projects.flatMap((p) => p.sports));

    /* top surface */
    const topSurface = mostCommon(projects.flatMap((p) => p.surfaces));

    return { count, totalArea, locations, topSport, topSurface };
  }, [projects]);
}

/* ─── helper ──────────────────────────────────────────────── */
function mostCommon(values: string[]): string | undefined {
  if (values.length === 0) return undefined;
  const freq: Record<string, number> = {};
  for (const v of values) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0];
}
