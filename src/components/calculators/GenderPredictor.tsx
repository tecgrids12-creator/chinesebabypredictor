import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import { lunarAgeAtConception, chartGender, solarToLunar } from '../../utils';
import { conceptionFromLmp, conceptionFromDueDate, westernZodiac } from '../../utils/gestation';
import { burstConfetti } from './confetti';
import { utcDate } from './ui';

export interface PredictorStrings {
  dobLabel: string; dobHint: string;
  modeConception: string; modeDue: string; modeLmp: string;
  conceptionLabel: string; dueLabel: string; lmpLabel: string;
  predict: string; again: string;
  resultHero: string;
  lunarAge: string; lunarMonth: string; zodiac: string;
  boyTitle: string; girlTitle: string; boyLine: string; girlLine: string;
  invalid: string; invalidConception: string;
  disclaimer: string;
  poll: string; pollYes: string; pollNo: string; pollThanks: string;
  copy: string; copied: string; shareLink: string;
}

type Mode = 'conception' | 'due' | 'lmp';

interface Result {
  gender: 'boy' | 'girl';
  lunarAge: number;
  lunarMonth: number;
  zodiac: string;
  zodiacEmoji: string;
  conception: Date;
  wasLeapMonth: boolean;
}

export default function GenderPredictor({ strings }: { strings: PredictorStrings }) {
  const [mode, setMode] = useState<Mode>('conception');
  const [dob, setDob] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rated, setRated] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const predict = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setResult(null);
      setRated(null);
      if (!dob || !eventDate) {
        setError(strings.invalid);
        return;
      }
      const birth = utcDate(dob);
      const conception =
        mode === 'conception'
          ? utcDate(eventDate)
          : mode === 'due'
            ? conceptionFromDueDate(utcDate(eventDate))
            : conceptionFromLmp(utcDate(eventDate));

      if (conception.getTime() <= birth.getTime()) {
        setError(strings.invalidConception);
        return;
      }

      const conceptionLunar = solarToLunar(conception);
      const age = lunarAgeAtConception(birth, conception);
      const gender = chartGender(age, conceptionLunar.month);

      setError(null);
      setResult({
        gender,
        lunarAge: age,
        lunarMonth: conceptionLunar.month,
        zodiac: conceptionLunar.zodiac,
        zodiacEmoji: conceptionLunar.zodiacEmoji,
        conception,
        wasLeapMonth: conceptionLunar.isLeapMonth,
      });
      burstConfetti(gender);
    },
    [dob, eventDate, mode, strings],
  );

  const share = useCallback(async () => {
    if (!result) return;
    const text = `${result.gender === 'boy' ? '💙 Boy' : '💗 Girl'} — the Chinese Baby Predictor says our lunar age ${result.lunarAge} × lunar month ${result.lunarMonth} points to ${
      result.gender === 'boy' ? 'a boy' : 'a girl'
    }! chinesebabypredictor.com`;
    try {
      if (navigator.share) {
        await navigator.share({ text, title: 'Chinese Baby Predictor' });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed – nothing to do */
    }
  }, [result]);

  const reset = () => {
    setResult(null);
    setRated(null);
  };

  const activeLabel = mode === 'conception' ? strings.conceptionLabel : mode === 'due' ? strings.dueLabel : strings.lmpLabel;

  return (
    <div className="calculator-card relative overflow-hidden" id="calculator">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-transparent to-boy-400/15"
        aria-hidden="true"
      />

      <form onSubmit={predict} className="relative p-6 sm:p-8" noValidate>
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        <div className="calculator-inputs">
          <div>
            <label htmlFor="pred-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              🎂 {strings.dobLabel}
            </label>
            <input
              id="pred-dob"
              type="date"
              required
              autoComplete="bday"
              min="1930-01-01"
              max={today}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby="pred-dob-hint"
            />
            <p id="pred-dob-hint" className="mt-1.5 text-xs text-plum-500">{strings.dobHint}</p>
          </div>

          <div>
            <div className="mb-1.5 flex flex-wrap gap-1" role="tablist" aria-label={strings.conceptionLabel}>
              {(
                [
                  { id: 'conception', label: strings.modeConception },
                  { id: 'due', label: strings.modeDue },
                  { id: 'lmp', label: strings.modeLmp },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === tab.id}
                  onClick={() => {
                    setMode(tab.id);
                    setResult(null);
                  }}
                  className={`focusable rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    mode === tab.id ? 'bg-plum-800 text-white' : 'bg-cream-100 text-plum-600 hover:bg-girl-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <label htmlFor="pred-event" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {mode === 'conception' ? '🌱' : mode === 'due' ? '⏳' : '🩸'} {activeLabel}
            </label>
            <input
              id="pred-event"
              type="date"
              required
              min="1940-01-01"
              max={today}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary text-base">
            <span aria-hidden="true">✨</span>
            {strings.predict}
          </button>
          {result && (
            <button type="button" onClick={reset} className="btn-secondary">
              ↻ {strings.again}
            </button>
          )}
        </div>
        <p className="mt-4 text-xs font-semibold text-plum-500">🍼 {strings.disclaimer}</p>
      </form>

      {/* Result reveal */}
      <div aria-live="polite" className="relative px-6 pb-8 sm:px-8">
        {result && (
          <div
            className={`anim-pop rounded-3xl p-6 text-center shadow-lift sm:p-8 ${
              result.gender === 'boy'
                ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white'
                : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white'
            }`}
          >
            <p className="font-display text-sm font-bold uppercase tracking-widest opacity-90">{strings.resultHero}</p>
            <div className="mt-3 text-7xl sm:text-8xl" role="img" aria-label={result.gender === 'boy' ? 'a boy' : 'a girl'}>
              {result.gender === 'boy' ? '👶💙' : '👶💗'}
            </div>
            <h3 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              {result.gender === 'boy' ? strings.boyTitle : strings.girlTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium opacity-95">
              {result.gender === 'boy' ? strings.boyLine : strings.girlLine}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
              <span className="rounded-full bg-white/20 px-4 py-2 font-bold backdrop-blur">
                {strings.lunarAge}: <strong>{result.lunarAge}</strong>
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 font-bold backdrop-blur">
                {strings.lunarMonth}: <strong>{result.lunarMonth}{result.wasLeapMonth ? '*' : ''}</strong>
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 font-bold backdrop-blur">
                {strings.zodiac}: <strong>{result.zodiacEmoji} {result.zodiac}</strong>
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 font-bold backdrop-blur">
                {westernZodiac(result.conception).emoji} {westernZodiac(result.conception).sign}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => void share()}
                className="focusable rounded-full bg-white/25 px-4 py-2 text-sm font-bold transition hover:bg-white/40"
              >
                {copied ? `✓ ${strings.copied}` : `🔗 ${strings.shareLink}`}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="font-bold">{strings.poll}</span>
              <button
                type="button"
                aria-pressed={rated === true}
                onClick={() => setRated(true)}
                className={`focusable rounded-full px-3 py-1.5 font-bold transition ${
                  rated === true ? 'bg-white text-girl-600' : 'bg-white/20 hover:bg-white/35'
                }`}
              >
                {strings.pollYes}
              </button>
              <button
                type="button"
                aria-pressed={rated === false}
                onClick={() => setRated(false)}
                className={`focusable rounded-full px-3 py-1.5 font-bold transition ${
                  rated === false ? 'bg-white text-boy-600' : 'bg-white/20 hover:bg-white/35'
                }`}
              >
                {strings.pollNo}
              </button>
              {rated !== null && <span className="font-semibold">{strings.pollThanks}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
