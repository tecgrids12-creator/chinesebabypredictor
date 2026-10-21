/**
 * Second-layer locale dictionaries merged over translations.ts (getDictionary):
 *
 *   mergeFallback(en, TRANSLATIONS[locale])  →  mergeFallback(…, EXTRA_DICS[locale])
 *
 * - `nl`: complete native Dutch dictionary (new locale added in the
 *   "first 5 fully translated" pass; registered in SUPPORTED_LOCALES).
 * - `hi`, `ru`, `fr`, `es`: completion passes so Hindi, Russian, French and
 *   Spanish render every page fully natively (meta, calculator UI, page prose,
 *   GEO long bodies for Hindi, footer, quiz questions, localized FAQs).
 *
 * Locales absent here deep-fall through to the layer-1 dictionaries, then to
 * English (standard tiering: full fr/ru/es/hi + nl; headings-only elsewhere).
 */
import type { Locale, PartialDictionary } from './translations';
import { nl } from './locales.nl';
import { hi } from './locales.hi';
import { ru } from './locales.ru';
import { fr } from './locales.fr';
import { es } from './locales.es';

export const EXTRA_DICS: Partial<Record<Locale, PartialDictionary>> = {
  nl, hi, ru, fr, es,
} as Partial<Record<Locale, PartialDictionary>>;
