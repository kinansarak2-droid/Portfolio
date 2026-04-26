"use client";

/**
 * useFilters — manages all active filter state for the projects archive.
 *
 * Supports all four filter types defined in filters.ts:
 *   chips    → multi-select Set per group (sport, surface)
 *   segment  → single string per group   (setting)
 *   range    → [min, max] tuple per group (year)
 *   location → single string             (location dropdown)
 *
 * Pair with applyFilters(allProjects, state) from filters.ts to get
 * the visible project list.
 *
 * Usage:
 *   const filters = useFilters();
 *   const visible = applyFilters(allProjects, filters.state);
 */

import { useState, useCallback, useMemo } from "react";
import {
  FILTER_GROUPS,
  emptyFilterState,
  type FilterState,
  type RangeFilter,
  type SegmentFilter,
} from "@/data/filters";

/* ─── Return shape ────────────────────────────────────────── */
export interface UseFiltersReturn {
  state:      FilterState;

  /* ── Chips (sport, surface) ── */
  toggleChip: (groupId: string, value: string) => void;
  isChipActive: (groupId: string, value: string) => boolean;

  /* ── Segment (setting) ── */
  setSegment: (groupId: string, value: string) => void;
  getSegment: (groupId: string) => string;

  /* ── Range (year) ── */
  setRange: (groupId: string, range: [number, number]) => void;
  getRange: (groupId: string) => [number, number];
  getRangeBounds: (groupId: string) => [number, number];

  /* ── Location (dropdown) ── */
  setLocation: (value: string) => void;
  clearLocation: () => void;

  /* ── Global ── */
  clearGroup:  (groupId: string) => void;
  clearAll:    () => void;
  hasAnyActive: boolean;
}

/* ─── Hook ────────────────────────────────────────────────── */
export function useFilters(): UseFiltersReturn {
  const [state, setState] = useState<FilterState>(emptyFilterState);

  /* ── Chips ── */
  const toggleChip = useCallback((groupId: string, value: string) => {
    setState((prev) => {
      const next = new Set(prev.chips[groupId]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, chips: { ...prev.chips, [groupId]: next } };
    });
  }, []);

  const isChipActive = useCallback(
    (groupId: string, value: string) => state.chips[groupId]?.has(value) ?? false,
    [state.chips]
  );

  /* ── Segment ── */
  const setSegment = useCallback((groupId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      segments: { ...prev.segments, [groupId]: value },
    }));
  }, []);

  const getSegment = useCallback(
    (groupId: string) => state.segments[groupId] ?? "",
    [state.segments]
  );

  /* ── Range ── */
  const setRange = useCallback((groupId: string, range: [number, number]) => {
    setState((prev) => ({
      ...prev,
      ranges: { ...prev.ranges, [groupId]: range },
    }));
  }, []);

  const getRange = useCallback(
    (groupId: string): [number, number] => {
      if (state.ranges[groupId]) return state.ranges[groupId];
      const def = FILTER_GROUPS.find((f) => f.id === groupId && f.type === "range") as RangeFilter | undefined;
      return def ? [def.min, def.max] : [0, 9999];
    },
    [state.ranges]
  );

  const getRangeBounds = useCallback(
    (groupId: string): [number, number] => {
      const def = FILTER_GROUPS.find((f) => f.id === groupId && f.type === "range") as RangeFilter | undefined;
      return def ? [def.min, def.max] : [0, 9999];
    },
    []
  );

  /* ── Location ── */
  const setLocation = useCallback((value: string) => {
    setState((prev) => ({ ...prev, location: value }));
  }, []);

  const clearLocation = useCallback(() => {
    setState((prev) => ({ ...prev, location: "" }));
  }, []);

  /* ── Clear helpers ── */
  const clearGroup = useCallback((groupId: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (groupId in prev.chips) {
        next.chips = { ...prev.chips, [groupId]: new Set() };
      } else if (groupId in prev.segments) {
        const def = FILTER_GROUPS.find((f) => f.id === groupId) as SegmentFilter | undefined;
        next.segments = { ...prev.segments, [groupId]: def?.options[0]?.value ?? "" };
      } else if (groupId in prev.ranges) {
        const def = FILTER_GROUPS.find((f) => f.id === groupId && f.type === "range") as RangeFilter | undefined;
        if (def) next.ranges = { ...prev.ranges, [groupId]: [def.min, def.max] };
      } else if (groupId === "location") {
        next.location = "";
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setState(emptyFilterState());
  }, []);

  /* ── hasAnyActive ── */
  const hasAnyActive = useMemo(() => {
    const anyChip     = Object.values(state.chips).some((s) => s.size > 0);
    const anySeg      = Object.entries(state.segments).some(([id, v]) => {
      const def = FILTER_GROUPS.find((f) => f.id === id) as SegmentFilter | undefined;
      return v !== (def?.options[0]?.value ?? "");
    });
    const anyRange    = Object.entries(state.ranges).some(([id, [lo, hi]]) => {
      const def = FILTER_GROUPS.find((f) => f.id === id && f.type === "range") as RangeFilter | undefined;
      return def ? (lo > def.min || hi < def.max) : false;
    });
    const anyLocation = state.location !== "";
    return anyChip || anySeg || anyRange || anyLocation;
  }, [state]);

  return {
    state,
    toggleChip, isChipActive,
    setSegment, getSegment,
    setRange, getRange, getRangeBounds,
    setLocation, clearLocation,
    clearGroup, clearAll,
    hasAnyActive,
  };
}
