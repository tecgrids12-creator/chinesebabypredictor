import { useState } from 'react';
import { solarToLunar, lunarNewYear } from '../../utils/lunar';
import { fmtDate, utcDate } from './ui';

export interface LunarAgeStrings {
  dobLabel: string; asOfLabel: string; compute: string;
  resultLabel: string; zodiacLabel: string; lunarDateLabel: string;
  nextNewYearLabel: string; birthdayLine: string; invalid: string;
}

/** Compute the traditional (virtual) lunar age for a given "as of" date. */
export default function LunarAgeCalculator({ strings }: { strings: LunarAgeStrings }) {
  const [dob, setDob] = useState('');
  const [asOf, setAsOf] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ age: number; lunar: ReturnType<typeof solarToLunar>; cnyNext: Date | null } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const compute = () => {
    setError(null);
    setResult(null);
    if (!dob) {
      setError(strings.invalid);
      return;
    }
    try {
      const birth = utcDate(dob);
      const ref = asOf ? utcDate(asOf) : new Date();
      const b = solarToLunar(birth);
      const r = solarToLunar(ref);
      const age = r.year - b.year + 1;
      setResult({ age, lunar: r, cnyNext: lunarNewYear(r.year + 1) });
    } catch {
      setError(strings.invalid);
    }
  };

  const zodiac = result && (
    <div className="anim-pop mt-5 grid gap-3 rounded-3xl bg-gradient-to-br from-plum-800 to-plum-700 p-6 text-center text-white shadow-lift">
      <p className="font-display text-6xl" role="img" aria-label={result.lunar.zodiac}>{result.lunar.zodiacEmoji}</p>
      <p className="font-display text-4xl font-extrabold">{strings.resultLabel}: {result.age}</p>
      <div className="mt-1 flex flex-wrap justify-center gap-2 text-sm font-bold">
        <span className="rounded-full bg-white/15 px-3 py-1.5">
          {strings.zodiacLabel}: {result.lunar.zodiac}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1.5">
          {strings.lunarDateLabel}: {result.lunar.year}-{result.lunar.month}{result.lunar.isLeapMonth ? ' (leap)' : ''}-{result.lunar.day}
        </span>
        {result.cnyNext && (
          <span className="rounded-full bg-white/15 px-3 py-1.5">
            {strings.nextNewYearLabel}: {fmtDate(result.cnyNext, 'en')}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs opacity-80">{strings.birthdayLine}</p>
    </div>
  );

  return (
    <div className="calculator-card p-6 sm:p-8">
      <div className="calculator-inputs">
        <div>
          <label htmlFor="la-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">🎂 {strings.dobLabel}</label>
          <input id="la-dob" type="date" min="1901-01-01" max={today} value={dob} onChange={(e) => setDob(e.target.value)}
                 className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
        </div>
        <div>
          <label htmlFor="la-asof" className="mb-1.5 block font-display text-sm font-bold text-plum-700">🗓️ {strings.asOfLabel}</label>
          <input id="la-asof" type="date" min="1901-01-01" max="2100-12-31" value={asOf} onChange={(e) => setAsOf(e.target.value)}
                 placeholder={today}
                 className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
        </div>
      </div>
      <button type="button" onClick={compute} className="btn-primary mt-5">🧮 {strings.compute}</button>
      {error && <p role="alert" className="anim-pop mt-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700">{`⚠️ ${error}`}</p>}
      <div aria-live="polite">{result ? zodiac : null}</div>
      <p className="mt-4 text-center text-xs text-plum-500">{strings.birthdayLine}</p>
    </div>
  );
}
