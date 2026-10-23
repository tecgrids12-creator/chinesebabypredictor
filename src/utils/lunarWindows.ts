/**
 * Walk the 12 (+ leap) lunar months of a given lunar year and return each
 * month's exact Gregorian date window. Shared by the 2027 / 2028 calendar
 * hub pages and their embedded planner (Wave-1 annual spokes).
 */
import { lunarNewYear, leapMonth, monthsDays, leapMonthDays } from './lunar';
import { chartGender, type Gender } from './genderChart';


const MS_PER_DAY = 86_400_000;

export interface LunarMonthWindow {
  /** Lunar year this window belongs to. */
  lunarYear: number;
  /** Lunar month number 1–12 (leap window carries the base month number). */
  month: number;
  /** True for the intercalary (leap) month. */
  isLeap: boolean;
  /** First Gregorian day (inclusive). */
  start: Date;
  /** Last Gregorian day (inclusive). */
  end: Date;
  /** Days in this lunar month. */
  days: number;
}

/** All lunar month windows of lunar year `lunarYear` (null when out of table range). */
export function lunarMonthWindows(lunarYear: number): LunarMonthWindow[] | null {
  const start = lunarNewYear(lunarYear);
  if (!start) return null;
  const leap = leapMonth(lunarYear);
  let cursor = start.getTime();
  const rows: LunarMonthWindow[] = [];
  for (let m = 1; m <= 12; m++) {
    const days = monthsDays(lunarYear, m);
    rows.push({
      lunarYear,
      month: m,
      isLeap: false,
      start: new Date(cursor),
      end: new Date(cursor + (days - 1) * MS_PER_DAY),
      days,
    });
    cursor += days * MS_PER_DAY;
    if (leap > 0 && m === leap) {
      const leapDays = leapMonthDays(lunarYear);
      rows.push({
        lunarYear,
        month: m,
        isLeap: true,
        start: new Date(cursor),
        end: new Date(cursor + (leapDays - 1) * MS_PER_DAY),
        days: leapDays,
      });
      cursor += leapDays * MS_PER_DAY;
    }
  }
  return rows;
}

/**
 * Chart prediction for every lunar month window of `lunarYear` for a mother
 * born in lunar year `birthLunarYear` (virtual age = window.lunarYear −
 * birthLunarYear + 1). Used by the birth-year lookup matrices on the hub pages.
 */
/**
 * Chart prediction for every lunar month window of `lunarYear` for a mother
 * born in lunar year `birthLunarYear` (virtual age = window.lunarYear −
 * birthLunarYear + 1). Used by the birth-year lookup matrices on the hub pages.
 */
export interface ChartWindowEntry extends LunarMonthWindow {
  gender: Gender;
  lunarAge: number;
}

export function chartByWindow(windows: LunarMonthWindow[], birthLunarYear: number): ChartWindowEntry[] {
  return windows.map((w) => ({
    ...w,
    gender: chartGender(w.lunarYear - birthLunarYear + 1, w.month),
    lunarAge: w.lunarYear - birthLunarYear + 1,
  }));
}