import { useState } from 'react';
import { dueDateFromLmp, dueDateFromConception, gestationalAge, westernZodiac } from '../../utils/gestation';
import { solarToLunar } from '../../utils/lunar';
import { fmtDate, utcDate } from './ui';

export interface DueDateStrings {
  modeLmp: string; modeConception: string; lmpLabel: string; conceptionLabel: string;
  compute: string; result: string; weeks: string; trimester_1: string; trimester_2: string; trimester_3: string;
  zodiacLabel: string; chineseZodiacLabel: string; invalid: string;
}

type Mode = 'lmp' | 'conception';

export default function DueDateCalculator({ strings }: { strings: DueDateStrings }) {
  const [mode, setMode] = useState<Mode>('lmp');
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ due: Date; weeks: number; days: number; trimester: 1 | 2 | 3; conception: Date } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const compute = () => {
    setError(null);
    setResult(null);
    if (!date) {
      setError(strings.invalid);
      return;
    }
    const d = utcDate(date);
    const due = mode === 'lmp' ? dueDateFromLmp(d) : dueDateFromConception(d);
    const conception = mode === 'lmp' ? new Date(d.getTime() + 14 * 86400000) : d;
    const gest = gestationalAge(mode === 'lmp' ? d : new Date(d.getTime() - 14 * 86400000));
    const trimester: 1 | 2 | 3 = gest.weeks < 14 ? 1 : gest.weeks < 28 ? 2 : 3;
    setResult({ due, weeks: gest.weeks, days: gest.days, trimester, conception });
  };

  return (
    <div className="calculator-card p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap gap-1" role="tablist" aria-label={strings.modeLmp}>
        {(
          [
            { id: 'lmp', label: strings.modeLmp },
            { id: 'conception', label: strings.modeConception },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => setMode(tab.id)}
            className={`focusable rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              mode === tab.id ? 'bg-plum-800 text-white' : 'bg-cream-100 text-plum-600 hover:bg-girl-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <label htmlFor="dd-date" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
        🩸 {mode === 'lmp' ? strings.lmpLabel : strings.conceptionLabel}
      </label>
      <input id="dd-date" type="date" min="2023-01-01" max={today} value={date} onChange={(e) => setDate(e.target.value)}
             className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
      <button type="button" onClick={compute} className="btn-primary mt-5">⏳ {strings.compute}</button>
      {error && <p role="alert" className="anim-pop mt-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700">{`⚠️ ${error}`}</p>}

      <div aria-live="polite">
        {result && (
          <div className="anim-pop mt-6 rounded-3xl bg-gradient-to-br from-plum-800 to-plum-700 p-6 text-center text-white shadow-lift">
            <p className="text-5xl" aria-hidden="true">🎯</p>
            <p className="mt-2 font-display text-sm font-bold uppercase tracking-widest opacity-90">{strings.result}</p>
            <p className="font-display text-3xl font-extrabold">{fmtDate(result.due, 'en')}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm font-bold">
              <span className="rounded-full bg-white/15 px-3 py-1.5">
                {strings.weeks}: {result.weeks}w {result.days}d (T{result.trimester})
              </span>
              {solarToLunar(result.due) && (
                <span className="rounded-full bg-white/15 px-3 py-1.5">
                  {strings.chineseZodiacLabel}: {solarToLunar(result.due).zodiacEmoji} {solarToLunar(result.due).zodiac}
                </span>
              )}
              <span className="rounded-full bg-white/15 px-3 py-1.5">
                {strings.zodiacLabel}: {westernZodiac(result.due).emoji} {westernZodiac(result.due).sign}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
