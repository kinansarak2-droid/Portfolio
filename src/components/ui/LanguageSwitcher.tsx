"use client";

/**
 * LanguageSwitcher — minimal locale switcher.
 * Reads available locales from the LocaleContext.
 */

import { useLocale } from "@/context/LocaleContext";
import { LOCALE_LABELS } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            className={cn(
              "px-2 py-1 transition-colors duration-fast",
              active ? "text-text underline underline-offset-4" : "text-text-subtle hover:text-text",
            )}
            aria-pressed={active}
          >
            {l}
            <span className="sr-only"> — {LOCALE_LABELS[l]}</span>
          </button>
        );
      })}
    </div>
  );
}
