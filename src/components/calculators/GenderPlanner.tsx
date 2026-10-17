import { useState, useMemo } from 'react';
import { planWindows } from '../../utils/planner';
import { fmtDate, utcDate } from './ui';

export interface PlannerStrings {
  dobLabel: string; want: string; boy: string; girl: string; year: string;
  compute: string; results: string; none: string; window: string;
  lunarAge: string; tip: string; invalid: string;
}

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = [2026, 2027, 2028];

/** Gender-planning calendar island: favourable windows for a desired gender. */
export default function GenderPlanner({ strings }: { strings: PlannerStrings }) {
  const [dob, setDob] = useState('');
  const [want, setWant] = useState<'boy' | 'girl'>('boy');
  const [year, setYear] = useState(2026);
  const [error, setError] = useState<string | null>(null);

  const windows = useMemo(() => {
    if (!dob) return null;
    try {
      return planWindows(utcDate(dob), year, want);
    } catch {
      return null;
    }
  }, [dob, want, year]);

  const summary = useMemo(() => {
    if (!windows) return null;
    const months = [...new Set(windows.map((w) => `${wantedLabel(w)}`))];
    return months;
  }, [windows]);

  function wantedLabel(w: { start: Date; isLeap: boolean; month: number }): string {
    if (w.isLeap) return `M${w.month} (leap)`;
    return MONTHS_EN[w.start.getUTCMonth()];
  }

  const compute = () => {
    setError(dob ? null : strings.invalid);
  };

  return (
    <div className="calculator-card p-6 sm:p-8">
      <div className="calculator-inputs">
        <div>
          <label htmlFor="gp-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">🎂 {strings.dobLabel}</label>
          <input id="gp-dob" type="date" min="1930-01-01" max="2010-12-31" value={dob} onChange={(e) => setDob(e.target.value)}
                 className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
        </div>
        <div>
          <span className="mb-1.5 block font-display text-sm font-bold text-plum-700">🎁 {strings.want}</span>
          <div className="flex gap-2">
            {(
              [
                { id: 'boy', label: strings.boy },
                { id: 'girl', label: strings.girl },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={want === opt.id}
                onClick={() => setWant(opt.id)}
                className={`focusable flex-1 rounded-2xl border-2 px-4 py-3 font-display font-bold transition ${
                  want === opt.id
                    ? opt.id === 'boy'
                      ? 'border-boy-500 bg-boy-100 text-boy-700'
                      : 'border-girl-500 bg-girl-100 text-girl-700'
                    : 'border-cream-200 bg-white text-plum-600 hover:border-girl-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="gp-year" className="font-display text-sm font-bold text-plum-700">🗓️ {strings.year}</label>
        <select id="gp-year" value={year} onChange={(e) => setYear(Number(e.target.value))}
                className="focusable cursor-pointer rounded-2xl border-2 border-cream-200 bg-white px-4 py-2 font-bold [color-scheme:light]">
          {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button type="button" onClick={compute} className="btn-primary ml-auto">{strings.compute}</button>
      </div>
      {error && <p role="alert" className="anim-pop mt-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700">{`⚠️ ${error}`}</p>}

      <div aria-live="polite">
        {windows && (
          <div className="anim-pop mt-6">
            {windows.length === 0 ? (
              <div className="rounded-2xl bg-cream-100 px-4 py-6 text-center font-semibold text-plum-600">{strings.none}</div>
            ) : (
              <>
                <p className="text-center font-display text-lg font-extrabold text-plum-900">
                  {strings.results} · {windows.length}
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {windows.map((w, i) => (
                    <div key={`${w.lunarYear}-${w.month}-${w.isLeap}-${i}`}
                         className={`reveal is-visible rounded-2xl p-4 text-white shadow-soft ${
                           w.gender === 'boy'
                             ? 'bg-gradient-to-br from-boy-500 to-boy-400'
                             : 'bg-gradient-to-br from-girl-500 to-girl-400'
                         }`}>
                      <p className="flex items-baseline justify-between font-display text-xl font-extrabold">
                        <span>
                          {MONTHS_EN[w.start.getUTCMonth()]} {w.start.getUTCFullYear()}
                          {w.isLeap ? <span className="ml-1 text-xs font-bold opacity-80">leap month</span> : null}
                        </span>
                        <span className="text-xs font-bold opacity-85">M{w.month}</span>
                      </p>
                      <p className="mt-1 text-sm font-semibold opacity-95">
                        {strings.window}: {fmtDate(w.start, 'en')} – {fmtDate(w.end, 'en')}
                      </p>
                      <p className="mt-1 text-xs opacity-85">
                        {strings.lunarAge}: {w.lunarAge}
                      </p>
                    </div>
                  ))}
                </div>
                {summary && (
                  <p className="mt-4 text-center text-sm font-semibold text-plum-600">
                    {summary.join(' · ')}
                  </p>
                )}
                <p className="mt-3 text-center text-xs text-plum-500">💡 {strings.tip}</p>
              </>
            )}
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-plum-500">
        📐 Exact lunar-month windows derived from the 1900–2100 lunisolar tables · 50/50 by nature
      </p>
    </div>
  );
}
