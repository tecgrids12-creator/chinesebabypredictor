import { describe, it, expect } from 'vitest';
import { getDictionary } from '../theme/i18n/translations';
import { getDir, localizedPath, alternatePaths } from '../theme/i18n/utils';

describe('i18n fallbacks', () => {
  it('returns the full dictionary for English', () => {
    const en = getDictionary('en');
    expect(en.hero.title).toBeTruthy();
    expect(en.predictor.boyTitle).toContain('BOY');
    expect(en.chart.legendBoy).toBe('Boy');
  });

  it('merges missing keys from English for every locale', () => {
    const expectedLocales = ['hi', 'es', 'ru', 'fr', 'nl', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'] as const;
    for (const loc of expectedLocales) {
      const d = getDictionary(loc);
      // Untranslated keys fall back to English values
      if (loc === 'es') expect(d.planner.compute).toBe('Calcular ventanas');
      else if (loc === 'nl') expect(d.planner.compute).toBe('Vensters berekenen');
      else if (loc === 'hi') expect(d.planner.compute).toBe('खिड़कियाँ निकालें');
      else if (loc === 'fr') expect(d.planner.compute).toBe('Calculer les fenêtres');
      else if (loc === 'ru') expect(d.planner.compute).toBe('Рассчитать окна');
      else expect(d.planner.compute).toBe('Compute windows');
      expect(d.common.entertainment.length).toBeGreaterThan(5);
      // Localized keys take precedence
      if (loc === 'es') expect(d.chart.legendGirl).toBe('Niña');
      if (loc === 'ar') expect(d.chart.legendGirl).toBe('بنت');
    }
  });
});

describe('routing utilities', () => {
  it('localizes paths with and without prefix', () => {
    expect(localizedPath('blog/', 'es')).toBe('/es/blog/');
    expect(localizedPath('blog/', 'en')).toBe('/blog/');
    expect(localizedPath('', 'ja')).toBe('/ja/');
    expect(localizedPath('', 'en')).toBe('/');
  });

  it('direction flags Arabic RTL', () => {
    expect(getDir('ar')).toBe('rtl');
    expect(getDir('sv')).toBe('ltr');
  });

  it('builds 19 hreflang alternates + x-default', () => {
    const alts = alternatePaths('gender-quiz/');
    expect(alts.length).toBe(20); // 19 locales + EN x-default
    const map = Object.fromEntries(alts.map((a) => [a.hreflang, a.href]));
    expect(map.en).toBe('/gender-quiz/');
    expect(map.ar).toBe('/ar/gender-quiz/');
    expect(map['x-default']).toBe('/gender-quiz/');

    const cuspAlts = alternatePaths('cusp-conception-date-checker/');
    expect(cuspAlts.length).toBe(20);
    const cuspMap = Object.fromEntries(cuspAlts.map((a) => [a.hreflang, a.href]));
    expect(cuspMap.en).toBe('/cusp-conception-date-checker/');
    expect(cuspMap.es).toBe('/es/cusp-conception-date-checker/');

    const privAlts = alternatePaths('privacy/');
    expect(privAlts.length).toBe(2);
    expect(privAlts[0].href).toBe('/privacy/');
    expect(privAlts[1].href).toBe('/privacy/');
  });
});
