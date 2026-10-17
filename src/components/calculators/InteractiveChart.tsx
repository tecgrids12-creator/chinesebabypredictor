import { useMemo, useState } from 'react';
import { GENDER_CHART, CHART_MIN_AGE, CHART_MAX_AGE, type Gender } from '../../utils/genderChart';
import { lunarNewYear, monthsDays, leapMonth, leapMonthDays } from '../../utils/lunar';
import { fmtDate } from './ui';

const MS_PER_DAY = 86_400_000;

export interface ChartStrings {
  legendBoy: string; legendGirl: string; yourCell: string;
  monthsLabel: string; agesLabel: string; print: string;
  cellHint: string; months: string[]; boy: string; girl: string;
  windowLabel: string; lunarYearLabel: string; leapNote: string;
}

interface HoverDetail {
  age: number;
  month: number;
  gender: Gender;
  start: Date;
  end: Date;
}

/**
 * Interactive Chinese gender chart.
 * - Grid of 28 ages × 12 lunar months
 * - Click a cell to pin details incl. the Gregorian date window in a chosen year
 */
export default function InteractiveChart({ strings, planYear }: { strings: ChartStrings; planYear?: number }) {
  const targetYear = planYear ?? new Date().getUTCFullYear();
  const [selected, setSelected] = useState<{ age: number; month: number } | null>(null);

  // Precise lunar-month windows for the target year (derived from the lunar tables)
  const windowsByMonth = useMemo(() => {
    const map = new Map<number, { start: Date; end: Date; isLeap: boolean }[]>();
    for (const lunarYear of [targetYear, targetYear - 1]) {
      const start = lunarNewYear(lunarYear);
      if (!start) continue;
      const leap = leapMonth(lunarYear);
      let cursor = start.getTime();
      for (let m = 1; m <= 12; m++) {
        const push = (days: number, isLeap: boolean) => {
          const wStart = new Date(cursor);
          const wEnd = new Date(cursor + (days - 1) * MS_PER_DAY);
          cursor += days * MS_PER_DAY;
          if (wStart.getUTCFullYear() > targetYear || wEnd.getUTCFullYear() < targetYear) return;
          map.set(m, [...(map.get(m) ?? []), { start: wStart, end: wEnd, isLeap }]);
        };
        push(monthsDays(lunarYear, m), false);
        if (leap > 0 && m === leap) push(leapMonthDays(lunarYear), true);
      }
    }
    return map;
  }, [targetYear]);

  const detail: HoverDetail | null = useMemo(() => {
    if (!selected) return null;
    const month = selected.month;
    const lunarYearOfCell = windowsByMonth.get(month)?.[0];
    const start = lunarYearOfCell?.start ?? lunarNewYear(targetYear) ?? new Date(Date.UTC(targetYear, 0, 1));
    const end = lunarYearOfCell?.end ?? new Date(Date.UTC(targetYear, 1, 1) - MS_PER_DAY);
    return {
      age: selected.age,
      month,
      gender: GENDER_CHART[selected.age - CHART_MIN_AGE]?.charAt(month - 1) === 'G' ? 'girl' : 'boy',
      start,
      end,
    };
  }, [selected, windowsByMonth, targetYear]);

  const counts = useMemo(() => {
    let b = 0;
    let g = 0;
    for (const row of GENDER_CHART) {
      for (const ch of row) ch === 'G' ? g++ : b++;
    }
    return { b, g };
  }, []);

  return (
    <div className="calculator-card p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <span className="chart-boy chip rounded-full px-3 py-1">🩵 {strings.legendBoy}: {counts.b}</span>
          <span className="chart-girl chip rounded-full px-3 py-1">🩷 {strings.legendGirl}: {counts.g}</span>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="focusable rounded-full border-2 border-girl-200 bg-white px-4 py-2 text-sm font-bold text-girl-600 transition hover:border-girl-400"
        >
          🖨 {strings.print}
        </button>
      </div>

      <div className="overflow-x-auto pb-2">
        <table className="w-full min-w-[640px] border-separate border-spacing-0.5" aria-label={`${strings.agesLabel} × ${strings.monthsLabel}`}>
          <caption className="sr-only">{strings.monthsLabel}</caption>
          <thead>
            <tr>
              <th scope="col" className="rounded-xl bg-plum-800 py-2 font-display text-[11px] text-white sm:text-xs">
                {strings.agesLabel}
              </th>
              {Array.from({ length: 12 }, (_, i) => (
                <th scope="col" key={i} className="rounded-xl bg-boy-50 py-2 font-display text-xs font-bold text-boy-700">
                  {strings.months[i] ?? i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GENDER_CHART.map((rowStr, idx) => {
              const age = CHART_MIN_AGE + idx;
              return (
                <tr key={age}>
                  <th scope="row" className="rounded-xl bg-plum-800 py-1.5 text-center font-display text-xs font-bold text-white">
                    {age}
                  </th>
                  {rowStr.split('').map((cell, mIdx) => {
                    const isGirl = cell === 'G';
                    const month = mIdx + 1;
                    const isSelected = selected?.age === age && selected?.month === month;
                    return (
                      <td key={month} className="p-0">
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          aria-label={`${strings.agesLabel} ${age}, ${strings.monthsLabel} ${month}: ${isGirl ? strings.legendGirl : strings.legendBoy}`}
                          onClick={() => setSelected(isSelected ? null : { age, month })}
                          className={`chart-cell focusable w-full ${isGirl ? 'chart-girl' : 'chart-boy'} ${
                            isSelected ? 'ring-2 ring-gold-500' : ''
                          }`}
                        >
                          <span aria-hidden="true">{isGirl ? '👧' : '👦'}</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {detail && (
        <div aria-live="polite" className="anim-pop mt-4 rounded-2xl bg-cream-100 p-4 text-center ring-1 ring-cream-200">
          <p className="font-display text-lg font-extrabold text-plum-900">
            {detail.gender === 'girl' ? '👧 ' : '👦 '}
            {strings.agesLabel} {detail.age} · {strings.monthsLabel} {strings.months[detail.month - 1] ?? detail.month} →{' '}
            {detail.gender === 'girl' ? strings.legendGirl : strings.legendBoy}
          </p>
          <p className="mt-1 text-sm text-plum-600">
            {strings.windowLabel} {fmtDate(detail.start, 'en')} – {fmtDate(detail.end, 'en')} · {strings.lunarYearLabel} {targetYear}
          </p>
          <p className="mt-1 text-xs text-plum-500">{strings.cellHint}</p>
        </div>
      )}
      <p className="mt-3 text-center text-xs text-plum-400">{strings.leapNote}</p>
    </div>
  );
}

/** Convenience wrapper for reading the cell a user searched manually. */
export function readChartCell(dobIso: string, conceptionIso: string): { age: number; month: number; gender: Gender } | null {
  try {
    const birth = solarToLunar(new Date(`${dobIso}T00:00:00Z`));
    const conception = solarToLunar(new Date(`${conceptionIso}T00:00:00Z`));
    const age = conception.year - birth.year + 1;
    return { age, month: conception.month, gender: GENDER_CHART[Math.min(Math.max(age, CHART_MIN_AGE), CHART_MAX_AGE) - CHART_MIN_AGE]?.charAt(conception.month - 1) === 'G' ? 'girl' : 'boy' };
  } catch {
    return null;
  }
}
