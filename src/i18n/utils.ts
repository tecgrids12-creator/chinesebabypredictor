/**
 * i18n utilities (see theme/i18n per the master theme spec).
 * - Default locale `en` renders at the site root (no prefix).
 * - Missing keys in any locale fall back to English.
 * - `ar` is RTL; `getDir()` reports text direction for each locale.
 */
export const SUPPORTED_LOCALES = [
  'en', 'hi', 'es', 'ru', 'fr', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms',
  'pl', 'id', 'ar', 'bg', 'tr', 'sv',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: Locale[] = ['ar'];

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function getDir(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}

export function getLangTag(locale: Locale): string {
  const tags: Record<Locale, string> = {
    en: 'en', hi: 'hi', es: 'es', ru: 'ru', fr: 'fr', de: 'de', it: 'it',
    pt: 'pt', bn: 'bn', ja: 'ja', ko: 'ko', ms: 'ms', pl: 'pl', id: 'id',
    ar: 'ar', bg: 'bg', tr: 'tr', sv: 'sv',
  };
  return tags[locale];
}

/** Locale display names used in the language switcher. */
export const LOCALE_NAMES: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: 'English', english: 'English', flag: '🇺🇸' },
  hi: { native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳' },
  es: { native: 'Español', english: 'Spanish', flag: '🇪🇸' },
  ru: { native: 'Русский', english: 'Russian', flag: '🇷🇺' },
  fr: { native: 'Français', english: 'French', flag: '🇫🇷' },
  de: { native: 'Deutsch', english: 'German', flag: '🇩🇪' },
  it: { native: 'Italiano', english: 'Italian', flag: '🇮🇹' },
  pt: { native: 'Português', english: 'Portuguese', flag: '🇧🇷' },
  bn: { native: 'বাংলা', english: 'Bengali', flag: '🇧🇩' },
  ja: { native: '日本語', english: 'Japanese', flag: '🇯🇵' },
  ko: { native: '한국어', english: 'Korean', flag: '🇰🇷' },
  ms: { native: 'Bahasa Melayu', english: 'Malay', flag: '🇲🇾' },
  pl: { native: 'Polski', english: 'Polish', flag: '🇵🇱' },
  id: { native: 'Bahasa Indonesia', english: 'Indonesian', flag: '🇮🇩' },
  ar: { native: 'العربية', english: 'Arabic', flag: '🇸🇦' },
  bg: { native: 'Български', english: 'Bulgarian', flag: '🇧🇬' },
  tr: { native: 'Türkçe', english: 'Turkish', flag: '🇹🇷' },
  sv: { native: 'Svenska', english: 'Swedish', flag: '🇸🇪' },
};

/**
 * Build a localized URL path.
 *   localizedPath('chinese-gender-chart/', 'es') → '/es/chinese-gender-chart/'
 *   localizedPath('chinese-gender-chart/', 'en') → '/chinese-gender-chart/'
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (locale === DEFAULT_LOCALE) return clean === '' ? '/' : `/${clean}`;
  return clean === '' ? `/${locale}/` : `/${locale}/${clean}`;
}

/** List of canonical alternates for hreflang/sitemap use. */
export function alternatePaths(path: string): Array<{ hreflang: string; href: string }> {
  return SUPPORTED_LOCALES.map((loc) => ({
    hreflang: loc,
    href: localizedPath(path, loc),
  }));
}
