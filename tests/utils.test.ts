import { describe, it, expect } from 'vitest';
import { solarToLunar, lunarNewYear, lunarAgeAtConception, leapMonth, monthsDays } from '../src/utils/lunar';
import { chartGender, favourableMonths } from '../src/utils/genderChart';
import { mayanGender } from '../src/utils/mayan';
import { conceptionFromDueDate, dueDateFromLmp, westernZodiac } from '../src/utils/gestation';
import { planWindows } from '../src/utils/planner';

const D = (iso: string) => new Date(`${iso}T00:00:00Z`);

describe('lunar conversion', () => {
  it('anchors Chinese New Year dates correctly', () => {
    const cny2026 = lunarNewYear(2026);
    expect(cny2026 && cny2026.toISOString().slice(0, 10)).toBe('2026-02-17');
    const cny2025 = lunarNewYear(2025);
    expect(cny2025 && cny2025.toISOString().slice(0, 10)).toBe('2025-01-29');
    const cny2024 = lunarNewYear(2024);
    expect(cny2024 && cny2024.toISOString().slice(0, 10)).toBe('2024-02-10');
  });

  it('maps a known lunar date (2024-02-10 = lunar 2024-01-01)', () => {
    const lunar = solarToLunar(D('2024-02-10'));
    expect(lunar.year).toBe(2024);
    expect(lunar.month).toBe(1);
    expect(lunar.day).toBe(1);
    expect(lunar.zodiac).toBe('Dragon');
  });

  it('maps mid-2026 conception to lunar year 2026 and a valid month', () => {
    const lunar = solarToLunar(D('2026-05-05'));
    expect(lunar.year).toBe(2026);
    expect(lunar.month).toBeGreaterThanOrEqual(1);
    expect(lunar.month).toBeLessThanOrEqual(12);
    expect(lunar.zodiac).toBe('Horse');
  });

  it('handles pre-CNY birth dates (born Jan 1995 → lunar year 1994)', () => {
    // CNY 1995: 1995-01-31
    const born = solarToLunar(D('1995-01-10'));
    expect(born.year).toBe(1994);
    const bornAfter = solarToLunar(D('1995-02-10'));
    expect(bornAfter.year).toBe(1995);
  });

  it('computes virtual age = (lunar years between) + 1', () => {
    // Born 1995-03-03 (lunar 1995), conceived 2018-06-05 → age 2018-1995+1 = 24
    expect(lunarAgeAtConception(D('1995-03-03'), D('2018-06-05'))).toBe(24);
  });

  it('reports leap months (2025 has a leap 6th month)', () => {
    expect(leapMonth(2025)).toBe(6);
    expect(leapMonth(2024)).toBe(0);
    expect([29, 30]).toContain(monthsDays(2024, 1));
  });
});

describe('chart lookups', () => {
  it('age 21 girl-heavy row (month 1 boy, rest girl)', () => {
    expect(chartGender(21, 1)).toBe('boy');
    for (const m of [2, 5, 12]) expect(chartGender(21, m)).toBe('girl');
  });

  it('clamps out-of-range ages into the chart', () => {
    expect(chartGender(9, 5)).toBe(chartGender(18, 5));
    expect(chartGender(80, 5)).toBe(chartGender(45, 5));
  });

  it('favourableMonths returns a subset of 1..12', () => {
    const months = favourableMonths(28, 'girl');
    expect(months.length).toBeGreaterThan(0);
    for (const m of months) expect(m).toBeGreaterThanOrEqual(1);
    for (const m of months) expect(months.indexOf(m)).toBe(months.lastIndexOf(m));
  });
});

describe('mayan parity rule', () => {
  it('same parity → girl, mixed → boy', () => {
    expect(mayanGender(28, 2024)).toBe('girl'); // even + even
    expect(mayanGender(29, 2025)).toBe('girl'); // odd + odd
    expect(mayanGender(28, 2025)).toBe('boy');  // even + odd
    expect(mayanGender(29, 2024)).toBe('boy');  // odd + even
  });
});

describe('gestation helpers', () => {
  it('Naegele: LMP + 280 days', () => {
    expect(dueDateFromLmp(D('2026-01-01')).toISOString().slice(0, 10)).toBe('2026-10-08');
  });

  it('conception = due date - 266 days', () => {
    expect(conceptionFromDueDate(D('2026-10-08')).toISOString().slice(0, 10)).toBe('2026-01-15');
  });

  it('western zodiac boundaries', () => {
    expect(westernZodiac(D('2026-03-20')).sign).toBe('Pisces');
    expect(westernZodiac(D('2026-03-21')).sign).toBe('Aries');
    expect(westernZodiac(D('2026-12-31')).sign).toBe('Capricorn');
  });
});

describe('planner windows', () => {
  it('produces exact Gregorian windows that overlap the plan year', () => {
    const windows = planWindows(D('1995-03-04'), 2026, 'girl');
    for (const w of windows) {
      expect(w.lunarYear === 2025 || w.lunarYear === 2026).toBe(true);
      expect(w.end.getTime()).toBeGreaterThanOrEqual(w.start.getTime());
      // window must intersect plan year
      expect(w.start.getUTCFullYear() <= 2026 && w.end.getUTCFullYear() >= 2026).toBe(true);
      const fav = favourableMonths(w.lunarAge, 'girl');
      expect(fav).toContain(w.month);
    }
  });

  it('returns at least one window for a typical mother', () => {
    expect(planWindows(D('1995-03-04'), 2026, 'girl').length).toBeGreaterThan(0);
    expect(planWindows(D('1995-03-04'), 2026, 'boy').length).toBeGreaterThan(0);
  });
});
