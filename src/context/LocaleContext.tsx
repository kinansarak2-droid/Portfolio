"use client";

/**
 * LocaleContext
 * ─────────────
 * Provides the current locale and a setter to every component in the tree.
 * Wrap the root layout (or just the <main>) with <LocaleProvider>.
 *
 * Usage:
 *   const { locale, setLocale, t, dir } = useLocale();
 *   t.nav.home  → "Home" / "Accueil" / "الرئيسية"
 */

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  LOCALES, DEFAULT_LOCALE, LOCALE_DIR,
  translations,
} from "@/i18n";
import type { Locale, TranslationShape } from "@/i18n";

interface LocaleContextValue {
  locale:    Locale;
  setLocale: (l: Locale) => void;
  t:         TranslationShape;           // full translation object
  dir:       "ltr" | "rtl";
  locales:   readonly Locale[];          // all available locales
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    t:       translations[locale],
    dir:     LOCALE_DIR[locale],
    locales: LOCALES,
  }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Must be used inside <LocaleProvider> */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}

/**
 * Shorthand helper for localised strings on a Project field.
 * Resolves a LocalizedString to the current locale,
 * falling back to English if a translation is missing.
 *
 * Usage:
 *   const { locale } = useLocale();
 *   localise(project.title, locale)  // → "Basketball Court Riyadh"
 */
export function localise(
  value: Record<Locale, string> | undefined,
  locale: Locale,
): string {
  if (!value) return "";
  return value[locale] || value["en"] || "";
}
