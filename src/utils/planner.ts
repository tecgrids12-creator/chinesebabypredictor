/**
 * Gender planning ("swaying") calendar.
 * For a mother's date of birth, a target Gregorian year and a preferred
 * gender, compute the lunar months whose chart cell matches the preference,
 * with their exact Gregorian date windows.
 */
import { solarToLunar, lunarNewYear, leapMonth, monthsDays, leapMonthDays } from './lunar';
import { chartGender, favourableMonths, type Gender } from './genderChart';

const MS_PER_DAY = 86_400_000;

export interface LunarWindow {
  /** Lunar year this window belongs to. */
  lunarYear: number;
  /** Lunar month number (1–12; leap windows carry the base month number). */
  month: number;
  /** True for leap (intercalary) months. */
  isLeap: boolean;
  /** First Gregorian day of this lunar month. */
  start: Date;
  /** Last Gregorian day of this lunar month (inclusive). */
  end: Date;
  /** Chart prediction for this window given the mother's lunar age. */
  gender: Gender;
  /** Mother's traditional (virtual) age at this window's conception. */
  lunarAge: number;
}

/** All lunar month windows overlapping Gregorian `planYear` for a given DOB. */
export function planWindows(
  birth: Date,
  planYear: number,
  want: Gender,
): LunarWindow[] {
  const birthLunar = solarToLunar(birth);
  const windows: LunarWindow[] = [];

  // A Gregorian year straddles two lunar years — check both.
  for (const lunarYear of [planYear - 1, planYear]) {
    const start = lunarNewYear(lunarYear);
    if (!start) continue;
    const leap = leapMonth(lunarYear);
    let cursor = start.getTime();
    const rows: Array<{ month: number; isLeap: boolean; days: number }> = [];
    for (let m = 1; m <= 12; m++) {
      rows.push({ month: m, isLeap: false, days: monthsDays(lunarYear, m) });
      if (leap > 0 && m === leap) {
        rows.push({ month: m, isLeap: true, days: leapMonthDays(lunarYear) });
      }
    }
    for (const row of rows) {
      const windowStart = new Date(cursor);
      const windowEnd = new Date(cursor + (row.days - 1) * MS_PER_DAY);
      cursor += row.days * MS_PER_DAY;
      // Keep only windows that overlap the Gregorian plan year.
      if (windowStart.getUTCFullYear() > planYear || windowEnd.getUTCFullYear() < planYear) continue;
      const lunarAge = lunarYear - birthLunar.year + 1;
      windows.push({
        lunarYear,
        month: row.month,
        isLeap: row.isLeap,
        start: windowStart,
        end: windowEnd,
        gender: chartGender(lunarAge, row.month),
        lunarAge,
      });
    }
  }

  return windows
    .filter((w) => w.gender === want)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Shortcut list of plain lunar month numbers matching a preference, for a fixed lunar age. */
export function favourableLunarMonths(lunarAge: number, want: Gender): number[] {
  return favourableMonths(lunarAge, want);
}
