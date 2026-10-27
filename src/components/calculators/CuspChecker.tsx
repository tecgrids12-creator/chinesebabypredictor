/**
 * Wave-2 Micro-Tool — Borderline / Cusp conception window checker.
 *
 * User pain: sperm survives up to 5 days, ovulation shifts 24–48h — so a
 * conception guessed near a new moon / Chinese New Year can flip the lunar
 * chart from BOY to GIRL depending on which window day fertilization
 * actually fell on. This island reads EVERY day of the fertile window
 * (±2 or ±3 days around the centre date), shows per-day lunar month/day,
 * lunar age and chart cell, then prints a stability verdict:
 *   🔒 100% LUNAR LOCK  — whole window reads the same folklore answer.
 *   ⚡ CUSP SPLIT      — names the flip date + per-side day counts.
 * Every visible string comes from `CUSP_STRINGS` (src/i18n/tools.ts) —
 * zero raw UI literals. Flat string props only (island-safe, no functions).
 */
import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import { solarToLunar } from '../../utils';
import { chartGender, type Gender } from '../../utils/genderChart';
import { fmtDate, utcDate } from './ui';
import type { CuspStrings } from '../../i18n/tools';

const DAY_MS = 86_400_000;

/** Chart column after the traditional leap-month half rule (1–15 stays, 16+ advances). */
function chartMonth(month: number, day: number, isLeapMonth: boolean): number {
  if (!isLeapMonth) return month;
  return Math.min(12, day <= 15 ? month : month + 1);
}

interface DayRow {
  offset: number;
  date: Date;
  lunarYear: number;
  lunarMonth: number; // base month number
  isLeap: boolean;
  lunarDay: number;
  age: number;
  gender: Gender;
  boundary: 'newMoon' | 'leap' | 'cny' | null;
}

/** Template fill: {key} placeholders interpolated at render time. */
function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}

export default function CuspChecker({ strings: S, locale = 'en' }: { strings: CuspStrings; locale?: string }) {
  const [dob, setDob] = useState('');
  const [center, setCenter] = useState('');
  const [spread, setSpread] = useState<2 | 3>(2);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ rows: DayRow[]; dayCount: number } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const compute = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setResult(null);
      setError(null);
      if (!dob || !center) {
        setError(S.invalid);
        return;
      }
      const birth = utcDate(dob);
      const centreDate = utcDate(center);
      const offsets = spread === 2 ? [-2, -1, 0, 1, 2] : [-3, -2, -1, 0, 1, 2, 3];
      const rows: DayRow[] = [];
      let early = false;
      /* Birth conversion first and once: a pre-1900 DOB fails fast with a
         clear message instead of failing on day 3 of the window. */
      let birthLunar: ReturnType<typeof solarToLunar>;
      try {
        birthLunar = solarToLunar(birth);
      } catch {
        setError(S.earlyDate);
        return;
      }
      for (const off of offsets) {
        const d = new Date(centreDate.getTime() + off * DAY_MS);
        try {
          const cl = solarToLunar(d);
          const age = cl.year - birthLunar.year + 1;
          const m = chartMonth(cl.month, cl.day, cl.isLeapMonth);
          rows.push({
            offset: off,
            date: d,
            lunarYear: cl.year,
            lunarMonth: cl.month,
            isLeap: cl.isLeapMonth,
            lunarDay: cl.day,
            age,
            gender: chartGender(age, m),
            boundary: null,
          });
        } catch {
          early = true; // day outside the reliable lunar table
        }
      }
      if (early || rows.length < offsets.length) {
        setError(S.earlyDate);
        setResult(null);
        return;
      }
      // Boundary annotation: label the FIRST day whose lunar reading differs from the previous day.
      for (let i = 1; i < rows.length; i++) {
        const a = rows[i - 1];
        const b = rows[i];
        const mChange = chartMonth(a.lunarMonth, a.lunarDay, a.isLeap) !== chartMonth(b.lunarMonth, b.lunarDay, b.isLeap);
        if (a.lunarYear !== b.lunarYear) b.boundary = 'cny';
        else if (a.isLeap || b.isLeap) b.boundary = 'leap';
        else if (mChange) b.boundary = 'newMoon';
      }
      setResult({ rows, dayCount: rows.length });
    },
    [dob, center, spread, S],
  );

  const reset = () => {
    setResult(null);
    setError(null);
  };

  const genders = result?.rows ?? [];
  const locked = genders.length > 0 && genders.every((r) => r.gender === genders[0].gender);
  const flipIdx = genders.findIndex((r, i) => i > 0 && r.gender !== genders[i - 1].gender);
  const flip = flipIdx > 0 ? genders[flipIdx] : null;
  const g = (r: DayRow | undefined) => (r ? (r.gender === 'boy' ? S.genderBoy : S.genderGirl) : '');
  const verdictGender = genders[0]?.gender === 'boy' ? S.boyWord : S.girlWord;

  const dayLabel = (r: DayRow) =>
    r.offset === 0
      ? S.dayCenter
      : r.offset < 0
        ? fill(S.dayBefore, { n: Math.abs(r.offset) })
        : fill(S.dayAfter, { n: r.offset });

  return (
    <div className="calculator-card relative overflow-hidden" id="cusp-calculator">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-boy-400/15 via-transparent to-girl-400/15" aria-hidden="true" />

      <form onSubmit={compute} className="relative p-6 sm:p-8" noValidate>
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        <div className="calculator-inputs">
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor="cusp-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.dobLabel}
            </label>
            <input
              id="cusp-dob" type="date" required autoComplete="bday"
              min="1930-01-01" max={today} value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby="cusp-dob-hint"
            />
            <p id="cusp-dob-hint" className="mt-1.5 text-xs text-plum-500">{S.dobHint}</p>
          </div>

          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor="cusp-center" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.centerLabel}
            </label>
            <input
              id="cusp-center" type="date" required
              min="1940-01-01" max={today} value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby="cusp-center-hint"
            />
            <p id="cusp-center-hint" className="mt-1.5 text-xs text-plum-500">{S.centerHint}</p>
          </div>

          {/* Window spread selector */}
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <span id="cusp-spread-label" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.spreadHeading}
            </span>
            <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="cusp-spread-label">
              {([2, 3] as const).map((n) => (
                <button
                  key={n} type="button" aria-pressed={spread === n}
                  onClick={() => { setSpread(n); setResult(null); }}
                  className={`focusable rounded-2xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-all ${
                    spread === n
                      ? 'border-plum-500 bg-plum-100 text-plum-800 shadow-[0_8px_16px_-8px_rgba(122,47,136,.6)]'
                      : 'border-cream-200 bg-white text-plum-600 hover:border-girl-300'
                  }`}
                >
                  {n === 2 ? S.spread2 : S.spread3}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-plum-500">{S.spreadHelp}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="submit" className="btn-primary text-base">
            <span aria-hidden="true">⚖️</span>{S.calculate}
          </button>
          {result && (
            <button type="button" onClick={reset} className="btn-secondary">{S.again}</button>
          )}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-plum-500">🍼 {S.disclaimer}</p>
      </form>

      {/* Verdict + per-day output */}
      {result && (
        <div className="px-6 pb-8 sm:px-8" aria-live="polite">
          {locked ? (
            <div
              className={`anim-pop rounded-3xl p-5 text-center shadow-lift sm:p-7 ${
                genders[0].gender === 'boy'
                  ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white'
                  : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white'
              }`}
            >
              <p className="font-display text-sm font-bold uppercase tracking-widest opacity-90">
                {fill(S.lockBanner, { gender: g(genders[0]), n: result.dayCount })}
              </p>
            </div>
          ) : flip ? (
            <div className="anim-pop rounded-3xl bg-cream-100 p-5 shadow-lift ring-1 ring-cream-200 sm:p-7">
              <p className="text-center font-display text-lg font-extrabold uppercase tracking-wide text-plum-900">
                {S.splitBanner}
              </p>
              <p className="mt-2 text-center text-sm leading-relaxed text-plum-700">
                {fill(S.splitBody, {
                  flipDate: fmtDate(flip.date, locale),
                  boundary: flip.boundary === 'cny' ? S.boundaryCny : flip.boundary === 'leap' ? S.boundaryLeap : S.boundaryNewMoon,
                  n1: flipIdx,
                  g1: g(genders[flipIdx - 1]),
                  n2: result.dayCount - flipIdx,
                  g2: g(flip),
                })}
              </p>
            </div>
          ) : null}

          <h3 className="mt-5 text-center font-display text-base font-extrabold text-plum-900">{S.resultHeading}</h3>
          <div className="mt-3 overflow-x-auto rounded-2xl ring-1 ring-cream-200">
            <table className="w-full min-w-[560px] bg-white text-left text-sm">
              <thead>
                <tr className="bg-cream-100 text-xs uppercase tracking-wide text-plum-600">
                  <th scope="col" className="px-4 py-3">{S.dayCol}</th>
                  <th scope="col" className="px-4 py-3">{S.dateCol}</th>
                  <th scope="col" className="px-4 py-3">{S.lunarCol}</th>
                  <th scope="col" className="px-4 py-3">{S.ageCol}</th>
                  <th scope="col" className="px-4 py-3">{S.cellCol}</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r, i) => (
                  <tr key={i} className={`border-t border-cream-100 ${r.boundary ? 'bg-girl-50/70' : flipIdx === i ? 'bg-cream-100 font-semibold' : ''}`}>
                    <td className="px-4 py-3 whitespace-nowrap font-display font-bold text-plum-800">{dayLabel(r)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-plum-600">{fmtDate(r.date, locale)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-plum-600">
                      {S.lunarMonthWord} {r.lunarMonth}{r.isLeap ? ` (${S.leapWord})` : ''} · {S.lunarDayWord} {r.lunarDay}
                      {' · '}{r.lunarYear}
                    </td>
                    <td className="px-4 py-3 text-plum-700">{r.age}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-extrabold text-white ${r.gender === 'boy' ? 'bg-boy-500' : 'bg-girl-500'}`}>
                        {r.gender === 'boy' ? S.genderBoy : S.genderGirl}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-plum-500" aria-hidden="true">
            {S.boundaryNewMoon} · {S.boundaryLeap} · {S.boundaryCny}
          </p>
        </div>
      )}
    </div>
  );
}
