/**
 * Gestation helpers: derive conception dates from LMP or due date,
 * compute due dates and trimester info.
 */
const MS_PER_DAY = 86_400_000;

/** Estimated conception ≈ LMP + 14 days (ovulation day). */
export function conceptionFromLmp(lmp: Date): Date {
  return new Date(lmp.getTime() + 14 * MS_PER_DAY);
}

/** Estimated conception ≈ average due date − 266 days (38 weeks). */
export function conceptionFromDueDate(dueDate: Date): Date {
  return new Date(dueDate.getTime() - 266 * MS_PER_DAY);
}

/** Standard Naegele's rule: due date = LMP + 280 days. */
export function dueDateFromLmp(lmp: Date): Date {
  return new Date(lmp.getTime() + 280 * MS_PER_DAY);
}

/** Conception + 266 days. */
export function dueDateFromConception(conception: Date): Date {
  return new Date(conception.getTime() + 266 * MS_PER_DAY);
}

/** Gestational age (weeks + days) from LMP to a moment in time. */
export function gestationalAge(lmp: Date, now: Date = new Date()): { weeks: number; days: number } {
  const total = Math.floor((now.getTime() - lmp.getTime()) / MS_PER_DAY);
  return { weeks: Math.floor(total / 7), days: ((total % 7) + 7) % 7 };
}

/** Western zodiac sign name + emoji from a Gregorian date. */
export function westernZodiac(date: Date): { sign: string; emoji: string } {
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const table: Array<{ until: [number, number]; sign: string; emoji: string }> = [
    { until: [1, 19], sign: 'Capricorn', emoji: '♑' },
    { until: [2, 18], sign: 'Aquarius', emoji: '♒' },
    { until: [3, 20], sign: 'Pisces', emoji: '♓' },
    { until: [4, 19], sign: 'Aries', emoji: '♈' },
    { until: [5, 20], sign: 'Taurus', emoji: '♉' },
    { until: [6, 20], sign: 'Gemini', emoji: '♊' },
    { until: [7, 22], sign: 'Cancer', emoji: '♋' },
    { until: [8, 22], sign: 'Leo', emoji: '♌' },
    { until: [9, 22], sign: 'Virgo', emoji: '♍' },
    { until: [10, 22], sign: 'Libra', emoji: '♎' },
    { until: [11, 21], sign: 'Scorpio', emoji: '♏' },
    { until: [12, 21], sign: 'Sagittarius', emoji: '♐' },
    { until: [12, 31], sign: 'Capricorn', emoji: '♑' },
  ];
  const hit = table.find((row) => m < row.until[0] || (m === row.until[0] && d <= row.until[1]))!;
  return { sign: hit.sign, emoji: hit.emoji };
}
