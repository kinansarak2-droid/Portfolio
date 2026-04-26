/**
 * Supported locales for the entire site.
 * Add / change codes here when needed — everything else picks them up automatically.
 *
 *  en  →  English  (LTR)
 *  fr  →  French   (LTR)
 *  ar  →  Arabic   (RTL)
 */
export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Human-readable label for each locale (shown in language switcher) */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

/** Reading direction per locale */
export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
};

/**
 * A string that exists in all three languages.
 * Every user-facing text field on the site uses this shape.
 */
export type LocalizedString = Record<Locale, string>;

/**
 * Helper — returns an empty LocalizedString with placeholder text.
 * Use this when scaffolding new content so nothing is accidentally missing.
 */
export function emptyLocalized(placeholder = "TODO"): LocalizedString {
  return { en: placeholder, fr: placeholder, ar: placeholder };
}
