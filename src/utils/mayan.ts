/**
 * Mayan gender predictor.
 * Rule as popularly published: compare the parity (odd/even) of the mother's
 * age at conception with the parity of the conception YEAR.
 *   same parity  (odd+odd or even+even) → girl
 *   different    (one odd, one even)   → boy
 * Source variants exist; this is the most widely reproduced version.
 * Entertainment only — mirrors our disclaimer.
 */
import type { Gender } from './genderChart';

export function mayanGender(ageAtConception: number, conceptionYear: number): Gender {
  const sameParity = ageAtConception % 2 === conceptionYear % 2;
  return sameParity ? 'girl' : 'boy';
}
