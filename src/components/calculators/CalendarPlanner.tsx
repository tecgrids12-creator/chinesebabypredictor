/**
 * Wave-1 Annual Hub #1/#2 — shared interactive conception planner for the
 * 2027 and 2028 Chinese gender calendar páginas. Pre-filtered to the hub's
 * Gregorian year; leap-month windows are labelled automatically.
 * All strings come from `CALENDAR_STRINGS` (src/i18n/tools.ts) — the hub body
 * passes year-specific heading overrides via the `planHeading` / `computeLabel`
 * props so a single component serves both annual pages.
 */
import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import { planWindows, type LunarWindow } from '../../utils/planner';
import { utcDate, fmtDate } from './ui';
import { burstConfetti } from './confetti';
import { BabyFace } from './Babies';
import type { Gender } from '../../utils/genderChart';
import type { CalendarStrings } from '../../i18n/tools';

type Want = 'boy' | 'girl';

export default function CalendarPlanner({
  year,
  strings: S,
  planHeading,
  computeLabel,
  locale = 'en',
}: {
  year: number;
  strings: CalendarStrings;
  planHeading: string;
  computeLabel: string;
  locale?: string;
}) {
  const [dob, setDob] = useState('');
  const [want, setWant] = useState<Want>('boy');
  const [windows, setWindows] = useState<LunarWindow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lunarAge, setLunarAge] = useState<number | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const compute = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!dob) {
        setError(S.noneResult);
        return;
      }
      const birth = utcDate(dob);
      const rows = planWindows(birth, year, want);
      setLunarAge(rows.length > 0 ? rows[0].lunarAge : null);
      setWindows(rows);
      if (rows.length > 0) burstConfetti(want);
    },
    [dob, year, want, S],
  );

  return (
    <div className="calculator-card relative overflow-hidden" id="calendar-planner">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-transparent to-boy-400/15" aria-hidden="true" />

      <form onSubmit={compute} className="relative p-6 sm:p-8" noValidate>
        <p className="mb-4 flex items-center gap-2 font-display text-lg font-extrabold text-plum-900">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-girl-500 to-boy-500" />
          {planHeading}
        </p>
        <p className="mb-5 text-sm leading-relaxed text-plum-600">{S.plannerIntro}</p>

        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        <div className="calculator-inputs sm:grid sm:grid-cols-2 sm:gap-3">
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor={`cal-dob-${year}`} className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.dobLabel}
            </label>
            <input
              id={`cal-dob-${year}`} type="date" required autoComplete="bday"
              min="1930-01-01" max={today} value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby={`cal-dob-${year}-hint`}
            />
            <p id={`cal-dob-${year}-hint`} className="mt-1.5 text-xs text-plum-500">{S.dobHint}</p>
          </div>

          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <span className="mb-1.5 block font-display text-sm font-bold text-plum-700">{S.wantLabel}</span>
            <div role="radiogroup" aria-label={S.wantLabel} className="grid grid-cols-2 gap-2">
              {([
                { v: 'boy' as Want, label: S.wantBoy },
                { v: 'girl' as Want, label: S.wantGirl },
              ]).map(({ v, label }) => (
                <button
                  key={v} type="button" role="radio" aria-checked={want === v}
                  onClick={() => { setWant(v); setWindows(null); }}
                  className={`focusable rounded-2xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-all ${
                    want === v
                      ? v === 'boy'
                        ? 'border-boy-500 bg-boy-100 text-boy-700 shadow-[0_8px_16px_-8px_rgba(44,99,232,.6)]'
                        : 'border-girl-500 bg-girl-100 text-girl-700 shadow-[0_8px_16px_-8px_rgba(221,33,117,.6)]'
                      : 'border-cream-200 bg-white text-plum-500 hover:border-girl-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="submit" className="btn-primary text-base">{computeLabel}</button>
          {windows && (
            <button type="button" onClick={() => { setWindows(null); setError(null); }} className="btn-secondary">
              ↻
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-plum-500">🍼 {S.disclaimer}</p>
      </form>

      {/* Result windows */}
      {windows && (
        <div className="px-6 pb-8 sm:px-8" aria-live="polite">
          {windows.length === 0 ? (
            <div className="rounded-3xl bg-cream-100 p-6 text-center ring-1 ring-cream-200">
              <p className="font-display text-lg font-bold text-plum-800">🌙 {S.noneResult}</p>
            </div>
          ) : (
            <div className="anim-pop">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg font-extrabold text-plum-900">
                  {S.resultHeading.replace('{year}', String(year))}
                </p>
                <span className="chip bg-white/80">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gradient-to-r from-girl-500 to-boy-500"></span>
                  {S.lunarAgeLabel}: <strong className="mx-1">{lunarAge}</strong> (虚岁)
                </span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {windows.map((w) => (
                  <div
                    key={`${w.lunarYear}-${w.month}-${w.isLeap ? 'L' : 'n'}`}
                    className={`rounded-3xl p-4 text-white shadow-soft ${
                      want === 'boy' ? 'bg-gradient-to-br from-boy-500 to-boy-400' : 'bg-gradient-to-br from-girl-500 to-girl-400'
                    }`}
                  >
                    <p className="flex items-baseline justify-between font-display text-xl font-extrabold">
                      <span>
                        M{w.month}
                        {w.isLeap ? <span className="ml-1 rounded-full bg-white/25 px-2 py-0.5 text-xs font-bold">{S.leapChip}</span> : null}
                      </span>
                      <span className="text-xs font-bold opacity-85">{w.lunarYear}</span>
                    </p>
                    <p className="mt-1.5 text-sm font-semibold opacity-95">
                      {fmtDate(w.start, locale)} – {fmtDate(w.end, locale)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <BabyFace gender={want} className="h-9 w-9 drop-shadow" />
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur">
                        {S.windowLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
