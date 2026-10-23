/**
 * i18n utilities (see theme/i18n per the master theme spec).
 * - Default locale `en` renders at the site root (no prefix).
 * - Missing keys in any locale fall back to English.
 * - `ar` is RTL; `getDir()` reports text direction for each locale.
 */
export const SUPPORTED_LOCALES = [
  'en', 'hi', 'es', 'ru', 'fr', 'nl', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms',
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
    en: 'en', hi: 'hi', es: 'es', ru: 'ru', fr: 'fr', nl: 'nl', de: 'de', it: 'it',
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
  nl: { native: 'Nederlands', english: 'Dutch', flag: '🇳🇱' },
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
 * Locale-aware tool slugs with fully localized page variants for every locale.
 * These are the ONLY route segments the language switcher preserves when
 * switching locale; anything else (legal, EN-only spokes, blog posts, TTC)
 * gracefully falls back to the localized home so no dead clicks are possible.
 */
export const LOCALIZED_TOOL_SLUGS = [
  'chinese-gender-predictor',
  'chinese-gender-chart',
  'gender-planner',
  'lunar-age-calculator',
  'mayan-gender-predictor',
  'due-date-calculator',
  'gender-quiz',
] as const;

/** Wave-1 specialized spokes: EN-only routes (registered in EN_ONLY_PATH). */
export const EN_ONLY_TOOL_SLUGS = [
  'ivf-chinese-gender-predictor',
  'test-past-pregnancies-calculator',
  'chinese-gender-calendar-2027',
  'chinese-gender-calendar-2028',
] as const;

/** All tool route segments (localized + EN-only) — single registry. */
export const ALL_TOOL_SLUGS: Array<(typeof LOCALIZED_TOOL_SLUGS)[number] | (typeof EN_ONLY_TOOL_SLUGS)[number]> = [
  ...LOCALIZED_TOOL_SLUGS,
  ...EN_ONLY_TOOL_SLUGS,
];

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

/**
 * Routes that exist only in EN (legal pages, the TTC planner, Wave-1 spokes).
 * A localized href to them would 404 — they always resolve to the EN canonical
 * URL so internal links stay do-follow, redirect-free and unbroken (GEO web).
 * Blog listings and posts localize ONLY for locales with a translated blog
 * (src/content/blog/<lang>/); every other locale keeps EN blog links so no
 * internal href ever points at a page that is not rendered.
 */
const EN_ONLY_PATH =
  /^(about-us|contact-us|sitemap|privacy|terms|chinese-gender-planner-ttc|ivf-chinese-gender-predictor|test-past-pregnancies-calculator|chinese-gender-calendar-2027|chinese-gender-calendar-2028)\//;

/** Locales whose blog is fully translated (16 posts under src/content/blog/<lang>/). */
export const BLOG_FULL_LOCALES: Locale[] = ['es', 'fr', 'nl', 'ru', 'hi', 'it', 'pt', 'pl', 'ar', 'tr', 'id'];

export function safeLocalizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (EN_ONLY_PATH.test(clean)) return localizedPath(clean, 'en');
  if (/^blog(\/|$)/.test(clean) && locale !== DEFAULT_LOCALE && !BLOG_FULL_LOCALES.includes(locale)) {
    return localizedPath(clean, 'en');
  }
  return localizedPath(clean, locale);
}

/**
 * List of canonical alternates for hreflang/sitemap use.
 * Blog posts exist for en + BLOG_FULL_LOCALES only; the blog listing and all
 * other pages exist for every locale.
 */
export function alternatePaths(path: string): Array<{ hreflang: string; href: string }> {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const locales: Locale[] = /^blog\/.+/.test(clean)
    ? [DEFAULT_LOCALE, ...BLOG_FULL_LOCALES]
    : [...SUPPORTED_LOCALES];
  return locales.map((loc) => ({
    hreflang: loc,
    href: localizedPath(path, loc),
  }));
}
