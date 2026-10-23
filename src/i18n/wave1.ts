/**
 * Wave-1 translation aggregator — merges the per-locale strips from
 * src/i18n/wave1/<locale>.ts (blog-full locales) over the English core in
 * src/i18n/wave1.core.ts. Merged in getDictionary() AFTER the layer-2
 * dictionaries so these additions win.
 */
import type { Locale } from './translations';
import { WAVE1_CORE } from './wave1.core';
import type { PartialDictionary } from './translations';
import { dic as es } from './wave1/es';
import { dic as fr } from './wave1/fr';
import { dic as it } from './wave1/it';
import { dic as pt } from './wave1/pt';
import { dic as pl } from './wave1/pl';
import { dic as ar } from './wave1/ar';
import { dic as tr } from './wave1/tr';
import { dic as id } from './wave1/id';
import { dic as nl } from './wave1/nl';
import { dic as hi } from './wave1/hi';
import { dic as ru } from './wave1/ru';

export const WAVE1_DICS: Partial<Record<Locale, PartialDictionary>> = {
  ...WAVE1_CORE,
  es,
  fr,
  it,
  pt,
  pl,
  ar,
  tr,
  id,
  nl,
  hi,
  ru,
};
