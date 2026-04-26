"use client";

/**
 * FilterBar — generic filter chip strip.
 * Placeholder UI: tracks active chip ids in local state and emits
 * `onChange`. Real filtering logic happens in the parent.
 *
 * Used by project list pages today; can be reused on product / sport
 * lists once those need filtering.
 */

import { useState, useMemo } from "react";
import { useLocale, localise } from "@/context/LocaleContext";
import type { LocalizedString } from "@/i18n";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id:    string;
  label: LocalizedString;
}

interface Props {
  options:   FilterOption[];
  /** Optional initial active set. */
  initial?:  string[];
  multi?:    boolean;
  onChange?: (active: string[]) => void;
  label?:    string;
}

export default function FilterBar({
  options, initial = [], multi = true, onChange, label,
}: Props) {
  const { locale, t } = useLocale();
  const [active, setActive] = useState<Set<string>>(new Set(initial));

  const toggle = (id: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (multi) {
        next.has(id) ? next.delete(id) : next.add(id);
      } else {
        next.clear();
        if (!prev.has(id)) next.add(id);
      }
      onChange?.([...next]);
      return next;
    });
  };

  const clear = () => {
    setActive(new Set());
    onChange?.([]);
  };

  const headingLabel = useMemo(() => label ?? t.filters.label, [label, t]);
  const activeCount = active.size;

  if (!options?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 border-y border-border">
      <span className="text-xs uppercase tracking-wider text-text-subtle me-2">
        {headingLabel}
      </span>
      {options.map((opt) => {
        const on = active.has(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={cn(
              "px-3 py-1.5 rounded-full border text-xs uppercase tracking-wider transition-colors duration-fast",
              on
                ? "bg-accent text-accent-fg border-accent"
                : "border-border text-text-muted hover:border-text",
            )}
            aria-pressed={on}
          >
            {localise(opt.label, locale)}
          </button>
        );
      })}
      {activeCount > 0 ? (
        <button
          type="button"
          onClick={clear}
          className="ms-auto text-xs uppercase tracking-wider text-text-subtle hover:text-text"
        >
          {t.filters.clearAll}
        </button>
      ) : null}
    </div>
  );
}
