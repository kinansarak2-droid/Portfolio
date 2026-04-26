import type { LocalizedString } from "@/i18n";
import type { Project } from "@/types/project";

/* ═══════════════════════════════════════════════════════════════
   FILTER TYPE SYSTEM
   ───────────────────
   Each filter group has its own type so the UI can render it
   correctly without guessing. Add a new group by:

   1. Choosing a type: "chips" | "segment" | "range" | "location"
   2. Creating a definition object of that type below.
   3. Adding it to FILTER_GROUPS at the bottom.
   4. Adding label + option keys to en.ts / fr.ts / ar.ts.
   5. Adding the locationKey (or sport/surface value) to your
      project data files in src/data/projects/.

   The hooks (useFilters, useStats) and the page read FILTER_GROUPS
   automatically — no page-level changes needed for new options.
═══════════════════════════════════════════════════════════════ */

/* ─── Shared ──────────────────────────────────────────────── */
interface BaseFilter {
  id:    string;           // unique key — used as state map key
  label: LocalizedString;  // column heading shown in toolbar
}

/* ─── 1. Chips filter (multi-select toggles) ──────────────── */
export interface ChipOption {
  value:  string;          // stored in filter state + matched to project field
  label:  LocalizedString;
  icon?:  string;          // icon name / emoji — swap when design is ready
  color?: string;          // for surface swatches (hex)
}

export interface ChipsFilter extends BaseFilter {
  type:  "chips";
  field: string;           // Project field to compare against (supports dot-path)
  match: "includes";       // array field: project[field].includes(value)
  multi: boolean;          // true → many values can be active at once
  options: ChipOption[];
}

/* ─── 2. Segment filter (single-select pill row) ─────────── */
export interface SegmentOption {
  value: string;
  label: LocalizedString;
}

export interface SegmentFilter extends BaseFilter {
  type:  "segment";
  field: string;           // Project field (scalar)
  options: SegmentOption[];
}

/* ─── 3. Range filter (dual-handle slider) ───────────────── */
export interface RangeFilter extends BaseFilter {
  type:      "range";
  field:     string;       // Project field (number)
  min:       number;
  max:       number;
  step:      number;
  ticks:     number[];     // values shown as axis labels
}

/* ─── 4. Location filter (grouped dropdown) ──────────────── */
export interface LocationOption {
  value: string;           // matches Project.locationKey
  label: LocalizedString;
}

export interface LocationGroup {
  groupLabel: LocalizedString;
  options:    LocationOption[];
}

export interface LocationFilter extends BaseFilter {
  type:   "location";
  field:  string;          // "locationKey"
  groups: LocationGroup[];
}

/* ─── Union ───────────────────────────────────────────────── */
export type FilterDefinition =
  | ChipsFilter
  | SegmentFilter
  | RangeFilter
  | LocationFilter;

/* ═══════════════════════════════════════════════════════════════
   FILTER GROUPS
   ─────────────
   Edit values here freely. Adding / removing an option here
   is all that's needed — the hooks and UI adapt automatically.
═══════════════════════════════════════════════════════════════ */

export const FILTER_GROUPS: FilterDefinition[] = [

  /* ── Sport (cols 1–6, row 1) ─────────────────────────────── */
  {
    id:    "sport",
    type:  "chips",
    field: "sports",
    match: "includes",
    multi: true,
    label: { en: "Sport", fr: "Sport", ar: "الرياضة" },
    options: [
      { value: "basketball",    icon: "🏀", label: { en: "Basketball",      fr: "Basketball",      ar: "كرة السلة"      } },
      { value: "football",      icon: "⚽", label: { en: "Football",        fr: "Football",        ar: "كرة القدم"      } },
      { value: "tennis",        icon: "🎾", label: { en: "Tennis",          fr: "Tennis",          ar: "التنس"          } },
      { value: "handball",      icon: "🤾", label: { en: "Handball",        fr: "Handball",        ar: "كرة اليد"       } },
      { value: "running-track", icon: "🏃", label: { en: "Running Track",   fr: "Piste d'athlét.", ar: "مضمار الجري"    } },
      { value: "volleyball",    icon: "🏐", label: { en: "Volleyball",      fr: "Volleyball",      ar: "كرة الطائرة"    } },
      { value: "badminton",     icon: "🏸", label: { en: "Badminton",       fr: "Badminton",       ar: "ريشة الطائرة"   } },
      { value: "other-sports",  icon: "🏅", label: { en: "Other Sports",    fr: "Autres sports",   ar: "رياضات أخرى"   } },
      { value: "support-works", icon: "🔧", label: { en: "Support & Works", fr: "Supports & Trav.", ar: "دعم وأعمال"     } },
    ],
  },

  /* ── Year (cols 7–9, row 1) ──────────────────────────────── */
  {
    id:    "year",
    type:  "range",
    field: "year",
    label: { en: "Year", fr: "Année", ar: "السنة" },
    min:   2001,
    max:   2026,
    step:  1,
    ticks: [2001, 2006, 2011, 2016, 2021, 2026],
  },

  /* ── Surface (cols 1–4, row 2) ───────────────────────────── */
  {
    id:    "surface",
    type:  "chips",
    field: "surfaces",
    match: "includes",
    multi: true,
    label: { en: "Surface", fr: "Surface", ar: "النوع" },
    options: [
      { value: "acrylic",          color: "#4C9BE8", label: { en: "Acrylic",          fr: "Acrylique",      ar: "أكريليك"       } },
      { value: "artificial-grass", color: "#2E8B57", label: { en: "Artificial Grass", fr: "Gazon synthét.", ar: "عشب صناعي"     } },
      { value: "polyurethane",     color: "#E87B4C", label: { en: "Polyurethane",     fr: "Polyuréthane",   ar: "بولي يوريثان"  } },
      { value: "wood",             color: "#C8860A", label: { en: "Wood",             fr: "Bois",           ar: "خشب"           } },
      { value: "rubber-tiles",     color: "#555555", label: { en: "Rubber Tiles",     fr: "Dalles caout.",  ar: "بلاط مطاطي"    } },
      { value: "other",            color: "#888888", label: { en: "Other",            fr: "Autre",          ar: "أخرى"          } },
    ],
  },

  /* ── Setting (cols 5–6, row 2) ───────────────────────────── */
  {
    id:    "setting",
    type:  "segment",
    field: "indoor",
    label: { en: "Setting", fr: "Cadre", ar: "النطاق" },
    options: [
      { value: "all",     label: { en: "All",     fr: "Tout",      ar: "الكل"    } },
      { value: "outdoor", label: { en: "Outdoor", fr: "Extérieur", ar: "خارجي"   } },
      { value: "indoor",  label: { en: "Indoor",  fr: "Intérieur", ar: "داخلي"   } },
    ],
  },

  /* ── Location (cols 7–9, row 2) ──────────────────────────── */
  {
    id:    "location",
    type:  "location",
    field: "locationKey",
    label: { en: "Location", fr: "Lieu", ar: "الموقع" },
    groups: [
      {
        groupLabel: { en: "Syria", fr: "Syrie", ar: "سوريا" },
        options: [
          { value: "damascus",       label: { en: "Damascus",       fr: "Damas",        ar: "دمشق"      } },
          { value: "rural-damascus", label: { en: "Rural Damascus", fr: "Rif Damas",    ar: "ريف دمشق"  } },
          { value: "homs",           label: { en: "Homs",           fr: "Homs",         ar: "حمص"       } },
          { value: "hama",           label: { en: "Hama",           fr: "Hama",         ar: "حماة"      } },
          { value: "aleppo",         label: { en: "Aleppo",         fr: "Alep",         ar: "حلب"       } },
          { value: "lattakia",       label: { en: "Lattakia",       fr: "Lattaquié",    ar: "اللاذقية"  } },
          { value: "tartus",         label: { en: "Tartus",         fr: "Tartous",      ar: "طرطوس"     } },
          { value: "idlib",          label: { en: "Idlib",          fr: "Idlib",        ar: "إدلب"      } },
          { value: "daraa",          label: { en: "Daraa",          fr: "Deraa",        ar: "درعا"      } },
          { value: "suwayda",        label: { en: "Suwayda",        fr: "Soueïda",      ar: "السويداء"  } },
          { value: "hasakah",        label: { en: "Hasakah",        fr: "Hassaké",      ar: "الحسكة"    } },
          { value: "quneitra",       label: { en: "Quneitra",       fr: "Quneïtra",     ar: "القنيطرة"  } },
        ],
      },
      {
        groupLabel: { en: "International", fr: "International", ar: "دولي" },
        options: [
          { value: "kuwait",  label: { en: "Kuwait",  fr: "Koweït",  ar: "الكويت" } },
          { value: "oman",    label: { en: "Oman",    fr: "Oman",    ar: "عُمان"   } },
          { value: "egypt",   label: { en: "Egypt",   fr: "Égypte",  ar: "مصر"    } },
          { value: "lebanon", label: { en: "Lebanon", fr: "Liban",   ar: "لبنان"  } },
        ],
      },
    ],
  },

] as const;

/* ═══════════════════════════════════════════════════════════════
   ACTIVE FILTER STATE TYPES
   ─────────────────────────
   Consumed by useFilters hook.
═══════════════════════════════════════════════════════════════ */

/** Complete snapshot of every active filter */
export interface FilterState {
  /** chips + location: Set of selected values per group id */
  chips:    Record<string, Set<string>>;
  /** segment: one selected value per group id (or "" = first option = "all") */
  segments: Record<string, string>;
  /** range: [activeMin, activeMax] per group id */
  ranges:   Record<string, [number, number]>;
  /** location: single selected locationKey ("" = no filter) */
  location: string;
}

/** Returns a clean, empty FilterState derived from FILTER_GROUPS */
export function emptyFilterState(): FilterState {
  const chips:    Record<string, Set<string>>        = {};
  const segments: Record<string, string>             = {};
  const ranges:   Record<string, [number, number]>   = {};

  for (const f of FILTER_GROUPS) {
    if (f.type === "chips")   chips[f.id]    = new Set();
    if (f.type === "segment") segments[f.id] = (f as SegmentFilter).options[0]?.value ?? "";
    if (f.type === "range") {
      const r = f as RangeFilter;
      ranges[f.id] = [r.min, r.max];
    }
  }

  return { chips, segments, ranges, location: "" };
}

/* ═══════════════════════════════════════════════════════════════
   FILTER LOGIC
   ─────────────
   Pure function — no React, easily unit-testable.
═══════════════════════════════════════════════════════════════ */

export function applyFilters(projects: Project[], state: FilterState): Project[] {
  return projects.filter((p) => {
    for (const f of FILTER_GROUPS) {

      /* ── chips ── */
      if (f.type === "chips") {
        const selected = state.chips[f.id];
        if (!selected || selected.size === 0) continue;
        const raw = getField(p, f.field);
        if (!Array.isArray(raw)) return false;
        const hasMatch = [...selected].some((v) => (raw as string[]).includes(v));
        if (!hasMatch) return false;
      }

      /* ── segment (setting: All / Indoor / Outdoor) ── */
      if (f.type === "segment") {
        const selected = state.segments[f.id];
        if (!selected || selected === "all") continue;
        if (f.id === "setting") {
          const wantIndoor = selected === "indoor";
          if (p.indoor !== wantIndoor) return false;
        } else {
          const raw = String(getField(p, f.field));
          if (raw !== selected) return false;
        }
      }

      /* ── range (year) ── */
      if (f.type === "range") {
        const r = f as RangeFilter;
        const [lo, hi] = state.ranges[f.id] ?? [r.min, r.max];
        const val = getField(p, f.field) as number;
        if (typeof val === "number" && (val < lo || val > hi)) return false;
      }

      /* ── location (dropdown) ── */
      if (f.type === "location") {
        if (!state.location) continue;
        if (p.locationKey !== state.location) return false;
      }
    }
    return true;
  });
}

/* ─── helper ──────────────────────────────────────────────── */
function getField(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

/* ── Legacy compat export (used by older page.tsx) ── */
export const FILTER_GROUPS_LEGACY = FILTER_GROUPS;
export { emptyFilterState as emptyFilters };
