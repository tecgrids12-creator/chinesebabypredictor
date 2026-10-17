/**
 * Chinese lunisolar calendar engine.
 * Converts Gregorian (solar) dates to Chinese lunar dates, computes the
 * traditional "virtual age" (虚岁), Chinese New Year boundaries and zodiac.
 *
 * Algorithm ported from the widely-mirrored open-source `calendar.js`
 * converter (data 1900–2100). All Math is timezone-safe via UTC math.
 */

import { LUNAR_INFO } from './lunarData';

/** Lunar 1900-01-01 corresponds to Gregorian 1900-01-31. */
const BASE_UTC = Date.UTC(1900, 0, 31);
const MS_PER_DAY = 86_400_000;
export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;

const ZODIAC_ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
] as const;

const ZODIAC_EMOJI: Record<string, string> = {
  Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇', Dragon: '🐉', Snake: '🐍',
  Horse: '🐎', Goat: '🐐', Monkey: '🐒', Rooster: '🐓', Dog: '🐕', Pig: '🐖',
};

/** Total number of days in lunar year `year` (leap month included). */
function lunarYearDays(year: number): number {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (LUNAR_INFO[year - MIN_YEAR] & i) !== 0 ? 1 : 0;
  }
  return sum + leapMonthDays(year);
}

/** Which lunar month of `year` is the leap month (0 = none). */
export function leapMonth(year: number): number {
  return LUNAR_INFO[year - MIN_YEAR] & 0x0f;
}

/** Days in the leap month of `year` (0 when no leap month). */
export function leapMonthDays(year: number): number {
  if (leapMonth(year) !== 0) {
    return (LUNAR_INFO[year - MIN_YEAR] & 0x10000) !== 0 ? 30 : 29;
  }
  return 0;
}

/** Days in lunar `month` (1–12, non-leap) of `year`. */
export function monthsDays(year: number, month: number): number {
  return (LUNAR_INFO[year - MIN_YEAR] & (0x10000 >> month)) !== 0 ? 30 : 29;
}

export interface LunarDate {
  /** Lunar year number (e.g. 2024 is a Dragon year). */
  year: number;
  /** Lunar month 1–12 (base month when isLeapMonth). */
  month: number;
  /** Lunar day 1–30. */
  day: number;
  /** True when the date falls in the leap (intercalary) month. */
  isLeapMonth: boolean;
  /** The lunar year of the Chinese zodiac name. */
  zodiac: string;
  /** Emoji of the zodiac animal. */
  zodiacEmoji: string;
  /** Chinese New Year date of this lunar year (start of the lunar year). */
  yearStart: Date;
}

/** Convert a Gregorian Date into a Chinese lunar date. */
export function solarToLunar(date: Date): LunarDate {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  const day = date.getUTCDate();

  let offset = Math.round((Date.UTC(year, month, day) - BASE_UTC) / MS_PER_DAY);
  if (offset < 0) {
    throw new Error('Solar date is before the Chinese lunar baseline (1900-01-31)');
  }

  // Find the lunar year.
  let lunarYear = MIN_YEAR;
  let daysInYear = 0;
  for (let y = MIN_YEAR; y <= MAX_YEAR; y++) {
    daysInYear = lunarYearDays(y);
    if (offset < daysInYear) {
      lunarYear = y;
      break;
    }
    offset -= daysInYear;
  }

  // Find the lunar month within the year.
  const leap = leapMonth(lunarYear);
  let isLeap = false;
  let lunarMonth = 1;
  let monthLength = 0;
  for (lunarMonth = 1; lunarMonth <= 12 && offset > 0; lunarMonth++) {
    if (leap !== 0 && lunarMonth === leap + 1 && isLeap === false) {
      lunarMonth -= 1;
      isLeap = true;
      monthLength = leapMonthDays(lunarYear);
    } else {
      monthLength = monthsDays(lunarYear, lunarMonth);
    }
    // remove the leap month flag for the next loop iteration
    if (isLeap === true && lunarMonth === leap + 1) isLeap = false;
    offset -= monthLength;
  }
  // Leap-month boundary fix (day 1 of month after leap, etc).
  if (offset === 0 && leap !== 0 && lunarMonth === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      lunarMonth -= 1;
    }
  }
  if (offset < 0) {
    offset += monthLength;
    lunarMonth -= 1;
  }

  const lunarDay = offset + 1;
  const zodiac = ZODIAC_ANIMALS[(lunarYear - 4) % 12] ?? 'Rat';
  const yearStart = lunarNewYear(lunarYear)!;

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: isLeap,
    zodiac,
    zodiacEmoji: ZODIAC_EMOJI[zodiac] ?? '✨',
    yearStart,
  };
}

/**
 * Gregorian start date of lunar year `year`, or null when out of range.
 * Derived by walking the lunarInfo table (days from the 1900 base date),
 * so it is exact — not an estimated "Feb 4" shortcut.
 */
export function lunarNewYear(year: number): Date | null {
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) return null;
  let offset = 0;
  for (let y = MIN_YEAR; y < year; y++) {
    offset += lunarYearDays(y);
  }
  return new Date(BASE_UTC + offset * MS_PER_DAY);
}

/**
 * Traditional Chinese virtual age (虚岁) of a person born `birth`
 * at the moment they were in a pregnancy conceived on `conception`.
 * Formula: (lunar conception year − lunar birth year) + 1.
 */
export function lunarAgeAtConception(birth: Date, conception: Date): number {
  const b = solarToLunar(birth);
  const c = solarToLunar(conception);
  return c.year - b.year + 1;
}

/** Zodiac animal of a (lunar) year: 1900 → Rat, 1901 → Ox, … */
export function zodiacFromLunarYear(year: number): string {
  return ZODIAC_ANIMALS[((year - 4) % 12 + 12) % 12] ?? 'Rat';
}

export function zodiacEmoji(animal: string): string {
  return ZODIAC_EMOJI[animal] ?? '✨';
}

/** Clamp helper used by chart lookup. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
