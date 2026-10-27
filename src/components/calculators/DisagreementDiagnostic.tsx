/**
 * Wave-2 Authority spoke #2 — "Disagreement Diagnostic" mini widget.
 * Same mother + same conception date, TWO engines:
 *   A) the lazy Western-age shortcut: (calendar year − birth year) + Gregorian month
 *   B) the authentic lunisolar engine: exact DOB → 虚岁 lunar age, exact lunar
 *      month from the 1900–2100 table, leap months via the half-month rule.
 * Whenever the two answers differ, the site explains WHICH conversion
 * separated them — turning mystery into math. Strings are inline EN (blog
 * editorial); island-safe flat props only.
 */
import { useState, useMemo, type FormEvent } from 'react';
import { solarToLunar } from '../../utils';
import { chartGender } from '../../utils/genderChart';
import { fmtDate, utcDate } from './ui';

function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}

interface Reading { gender: 'boy' | 'girl'; age: number; month: number; isLeap: boolean; }

function westernReading(birth: string, conception: string): Reading {
  const b = utcDate(birth);
  const c = utcDate(conception);
  // The lazy shortcut: age reached by birthday-count within the Gregorian year, +1 virtual bump.
  let age = c.getUTCFullYear() - b.getUTCFullYear() + 1;
  const hadBirthday =
    c.getUTCMonth() > b.getUTCMonth() ||
    (c.getUTCMonth() === b.getUTCMonth() && c.getUTCDate() >= b.getUTCDate());
  if (!hadBirthday) age += 1; // sites that forget the virtual rule drift even further
  const month = c.getUTCMonth() + 1; // "March → 3" theft
  return { gender: chartGender(age, month), age, month, isLeap: false };
}

function authenticReading(birth: string, conception: string): Reading | null {
  try {
    const b = solarToLunar(utcDate(birth));
    const c = solarToLunar(utcDate(conception));
    const age = c.year - b.year + 1;
    const month = c.isLeapMonth ? (c.day <= 15 ? c.month : Math.min(12, c.month + 1)) : c.month;
    return { gender: chartGender(age, month), age, month, isLeap: c.isLeapMonth };
  } catch {
    return null;
  }
}

export default function DisagreementDiagnostic() {
  const [birth, setBirth] = useState('');
  const [conception, setConception] = useState('');
  const [ran, setRan] = useState<{ lazy: Reading | null; auth: Reading | null } | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!birth || !conception) return;
    setRan({ lazy: westernReading(birth, conception), auth: authenticReading(birth, conception) });
  };

  const diffs = useMemo(() => {
    if (!ran?.lazy || !ran.auth) return [];
    const out: string[] = [];
    if (ran.lazy.age !== ran.auth.age) {
      out.push(fill('Age row: lazy site used {a} (approx) · authentic table used {b} (虚岁).', { a: ran.lazy.age, b: ran.auth.age }));
    }
    if (ran.lazy.month !== ran.auth.month) {
      out.push(fill('Month column: lazy site used Gregorian month {a} · authentic table used lunar month {b}.', { a: ran.lazy.month, b: ran.auth.month }));
    }
    if (ran.auth.isLeap) out.push('Leap month (Runyue): the authentic engine applied the half-month rule; simple calculators usually ignore it.');
    return out;
  }, [ran]);

  const card = (label: string, r: Reading | null, tone: 'boy' | 'girl' | 'neutral') => (
    <div
      className={`flex-1 rounded-2xl p-4 text-center ${
        r ? (tone === 'boy' ? 'bg-boy-500 text-white' : tone === 'girl' ? 'bg-girl-500 text-white' : 'bg-plum-700 text-white') : 'bg-cream-100 text-plum-500'
      }`}
    >
      <p className="text-[0.68rem] font-extrabold uppercase tracking-widest opacity-90">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">
        {r ? (r.gender === 'boy' ? '💙 BOY' : '💗 GIRL') : '—'}
      </p>
      {r && <p className="mt-1 text-xs font-semibold opacity-90">row {r.age} × column {r.month}{r.isLeap ? ' (leap)' : ''}</p>}
    </div>
  );

  return (
    <div className="calculator-card my-6 overflow-hidden" id="disagreement-diagnostic">
      <form onSubmit={onSubmit} className="p-5 sm:p-6" noValidate>
        <p className="mb-3 font-display text-sm font-bold text-plum-900">🔬 Try the disagreement diagnostic — one date, two engines</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-bold text-plum-700">
            Mother’s date of birth
            <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required
                   min="1930-01-01"
                   className="focusable mt-1 w-full rounded-2xl border-2 border-cream-200 bg-white px-3 py-2.5 text-sm text-plum-800 [color-scheme:light]" />
          </label>
          <label className="block text-xs font-bold text-plum-700">
            Conception date
            <input type="date" value={conception} onChange={(e) => setConception(e.target.value)} required
                   min="1940-01-01"
                   className="focusable mt-1 w-full rounded-2xl border-2 border-cream-200 bg-white px-3 py-2.5 text-sm text-plum-800 [color-scheme:light]" />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary text-sm">Run both engines</button>
          {ran && diffs.length > 0 && (
            <span className="text-xs font-semibold text-plum-600">↻ Change either date and run again</span>
          )}
        </div>
      </form>

      {ran && (
        <div className="px-5 pb-6 sm:px-6" aria-live="polite">
          <div className="flex flex-wrap gap-3">
            {card('Lazy Western-age site', ran.lazy, ran.lazy?.gender ?? 'neutral')}
            {card('Authentic lunisolar engine (this site)', ran.auth, ran.auth?.gender ?? 'neutral')}
          </div>
          {ran.lazy && ran.auth ? (
            ran.lazy.gender !== ran.auth.gender ? (
              <div className="mt-4 rounded-2xl bg-cream-100 p-4 text-sm leading-relaxed text-plum-700 ring-1 ring-cream-200">
                <p className="font-display font-bold text-plum-900">⚡ Opposite answers — here is the exact math that split them:</p>
                <ul className="mt-1.5 list-inside list-disc">
                  {diffs.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-boy-50 p-4 text-sm leading-relaxed text-plum-700 ring-1 ring-cream-200">
                <p>✅ Same answer on this date — the lazy shortcut happens to land in the same lunar cell. Shift the date a few days toward a lunar month boundary (or Chinese New Year) and the engines drift apart; the <a href="/cusp-conception-date-checker/" className="font-semibold underline decoration-girl-400 decoration-2 underline-offset-2">cusp checker</a> shows exactly where.</p>
              </div>
            )
          ) : (
            <p className="mt-3 text-sm text-plum-600">Dates before January 31, 1900 are outside the reliable lunar table.</p>
          )}
        </div>
      )}
    </div>
  );
}
