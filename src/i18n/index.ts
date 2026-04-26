export { LOCALES, DEFAULT_LOCALE, LOCALE_LABELS, LOCALE_DIR, emptyLocalized } from "./locales";
export type { Locale, LocalizedString } from "./locales";

import en from "./en";
import fr from "./fr";
import ar from "./ar";
import type { Locale } from "./locales";
import type { TranslationShape } from "./en";

export const translations: Record<Locale, TranslationShape> = { en, fr, ar };
export type { TranslationShape };
