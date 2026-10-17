/**
 * The traditional Chinese gender chart ( Qing Palace / 太原 chart data as
 * widely circulated and reproduced on international pregnancy sites).
 * Rows   = mother's lunar age at conception (18–45)
 * Columns= lunar month of conception (1–12)
 * "B" = Boy, "G" = Girl.
 * Each string holds exactly 12 characters, one per lunar month.
 */
export const CHART_MIN_AGE = 18;
export const CHART_MAX_AGE = 45;

export const GENDER_CHART: string[] = [
  // Months:                                       1  2  3  4  5  6  7  8  9 10 11 12
  'GBGBBBBBBBBB', // 18
  'BGBGGBBBBGBG', // 19
  'GBGBBBBBBGBB', // 20
  'BGGGGGGGGGGG', // 21
  'GBBGBGGBGGGG', // 22
  'BBGBBGBGBBBG', // 23
  'BGBBGBBGGGGG', // 24
  'GBBGGBGBBBBB', // 25
  'BGBGGBGBGGGG', // 26
  'GBGBGGBGBBGB', // 27
  'BGBGGGBGBBGG', // 28
  'GBGGBGBBBBBB', // 29
  'BGGGGGGGGBBB', // 30
  'BGBGGGGGGBBB', // 31
  'BGBGGGGGGBBB', // 32
  'GBGBGGBGBBBB', // 33
  'BGBGGGGGGBBB', // 34
  'BBGBGGBGGBBB', // 35
  'GBBGBGGBBGBB', // 36
  'BGBBGBGGBGBG', // 37
  'GBGBBGBGBBGB', // 38
  'BGBBBGGBGGBG', // 39
  'GBGBGBBGBGBG', // 40
  'BGBGBGBBGBGB', // 41
  'GBGBGBGBBGBG', // 42
  'BGBGBGBGBBGB', // 43
  'GBGBGBGBGBBG', // 44
  'BGBGBGBGBGBB', // 45
];

export type Gender = 'boy' | 'girl';

/** Look up the chart cell. Ages outside 18–45 are clamped (documented behaviour). */
export function chartGender(lunarAge: number, lunarMonth: number): Gender {
  const row = Math.min(CHART_MAX_AGE, Math.max(CHART_MIN_AGE, Math.round(lunarAge))) - CHART_MIN_AGE;
  const col = Math.min(12, Math.max(1, Math.round(lunarMonth))) - 1;
  const rowStr = GENDER_CHART[row] ?? 'BBBBBBBBBBBB';
  return rowStr.charAt(col) === 'G' ? 'girl' : 'boy';
}

interface ChartCellMeta {
  age: number;
  month: number;
  gender: Gender;
}

export function chartAll(): ChartCellMeta[] {
  const cells: ChartCellMeta[] = [];
  for (let age = CHART_MIN_AGE; age <= CHART_MAX_AGE; age++) {
    for (let month = 1; month <= 12; month++) {
      cells.push({ age, month, gender: chartGender(age, month) });
    }
  }
  return cells;
}

export function chartStats(): { boys: number; girls: number } {
  const cells = chartAll();
  return {
    boys: cells.filter((c) => c.gender === 'boy').length,
    girls: cells.filter((c) => c.gender === 'girl').length,
  };
}

/**
 * For a given lunar age and desired gender, return which lunar months (1–12)
 * of a year favour that gender (leap month mapped to its base month).
 */
export function favourableMonths(lunarAge: number, want: Gender): number[] {
  const row = Math.min(CHART_MAX_AGE, Math.max(CHART_MIN_AGE, Math.round(lunarAge))) - CHART_MIN_AGE;
  const rowStr = GENDER_CHART[row] ?? 'BBBBBBBBBBBB';
  const months: number[] = [];
  for (let m = 1; m <= 12; m++) {
    const cell = rowStr.charAt(m - 1) === 'G' ? 'girl' : 'boy';
    if (cell === want) months.push(m);
  }
  return months;
}
