/**
 * Wave-1 Micro-Tool #1 — IVF / FET / IUI Chinese Gender Predictor.
 *
 * Three pathways (FET · Fresh IVF-IUI · Donor egg), a dual-comparison output:
 *   Method A — fertilization perspective (retrieval / insemination date)
 *   Method B — implantation perspective (transfer date)
 * Every visible string comes from the `IVF_STRINGS` dictionary
 * (src/i18n/tools.ts) — zero raw UI literals, locale prop ready.
 */
import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import { solarToLunar } from '../../utils';
import { chartGender } from '../../utils/genderChart';
import { burstConfetti } from './confetti';
import { BabyFace, GlossyHeart } from './Babies';
import { fmtDate, utcDate } from './ui';
import type { IvfStrings } from '../../i18n/tools';

type Pathway = 'fet' | 'fresh' | 'donor';
type Gender = 'boy' | 'girl';

interface Reading {
  date: Date;
  lunarAge: number;
  lunarMonth: number;
  isLeap: boolean;
  zodiac: string;
  zodiacEmoji: string;
  gender: Gender;
}

/** Chart reading from a DOB + a conception date. */
function read(birth: string, conception: Date): Reading | null {
  if (!birth) return null;
  const b = utcDate(birth);
  const bl = solarToLunar(b);
  const cl = solarToLunar(conception);
  const age = cl.year - bl.year + 1;
  return {
    date: conception,
    lunarAge: age,
    lunarMonth: cl.month,
    isLeap: cl.isLeapMonth,
    zodiac: cl.zodiac,
    zodiacEmoji: cl.zodiacEmoji,
    gender: chartGender(age, cl.month),
  };
}

const DAY_MS = 86_400_000;

export default function IvfPredictor({ strings: S, locale = 'en' }: { strings: IvfStrings; locale?: string }) {
  const [pathway, setPathway] = useState<Pathway>('fet');
  const [motherDob, setMotherDob] = useState('');
  const [donorDob, setDonorDob] = useState('');
  const [retrieval, setRetrieval] = useState('');
  const [embryoDay, setEmbryoDay] = useState<3 | 5>(5);
  const [transfer, setTransfer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ a: Reading; b: Reading } | null>(null);

  const pathwayHint = pathway === 'fet' ? S.fetHint : pathway === 'fresh' ? S.freshHint : S.donorHint;
  const needsTransfer = pathway !== 'fresh';
  const needsDonor = pathway === 'donor';

  const today = new Date().toISOString().slice(0, 10);

  const calculate = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setResult(null);
      setError(null);
      if (!motherDob || !retrieval || (needsTransfer && !transfer)) {
        setError(S.invalidDates);
        return;
      }
      const setterWho = needsDonor ? donorDob : motherDob;
      if (needsDonor && !donorDob) {
        setError(S.invalidDates);
        return;
      }
      // Method A: fertilization = retrieval date
      const retrievalDate = utcDate(retrieval);
      const aRaw = read(setterWho, retrievalDate);
      if (!aRaw) {
        setError(S.invalidDonor);
        return;
      }
      // Method B: implantation = real transfer date (FET/donor) or retrieval + embryo age (fresh)
      const transferDate = needsTransfer
        ? utcDate(transfer)
        : new Date(retrievalDate.getTime() + (embryoDay - 1) * DAY_MS);
      if (transferDate.getTime() < retrievalDate.getTime()) {
        setError(S.invalidSequence);
        return;
      }
      const bRaw = read(motherDob, transferDate);
      if (!bRaw) {
        setError(S.invalidDates);
        return;
      }
      // Donor mode sanity: donor must be born before retrieval.
      if (needsDonor) {
        const d = utcDate(donorDob);
        if (d.getTime() >= retrievalDate.getTime()) {
          setError(S.invalidDonor);
          return;
        }
      }
      setResult({ a: aRaw, b: bRaw });
      burstConfetti(aRaw.gender === bRaw.gender ? aRaw.gender : 'boy');
    },
    [motherDob, donorDob, retrieval, transfer, embryoDay, needsTransfer, needsDonor, S],
  );

  const reset = () => {
    setResult(null);
    setError(null);
  };

  const pathways: Array<{ id: Pathway; label: string }> = [
    { id: 'fet', label: S.pathwayFet },
    { id: 'fresh', label: S.pathwayFresh },
    { id: 'donor', label: S.pathwayDonor },
  ];

  return (
    <div className="calculator-card relative overflow-hidden" id="ivf-calculator">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-transparent to-boy-400/15" aria-hidden="true" />

      <form onSubmit={calculate} className="relative p-6 sm:p-8" noValidate>
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        {/* Pathway selector tabs */}
        <div>
          <p className="mb-2.5 flex items-center gap-2 font-display text-base font-extrabold text-plum-900">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-girl-500 to-boy-500" />
            {S.pathwayHeading}
          </p>
          <div role="tablist" aria-label={S.pathwayHeading} className="grid gap-1.5 sm:grid-cols-3">
            {pathways.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={pathway === p.id}
                onClick={() => {
                  setPathway(p.id);
                  setResult(null);
                  setError(null);
                }}
                className={`focusable w-full rounded-2xl px-3 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                  pathway === p.id
                    ? 'bg-gradient-to-r from-plum-800 to-plum-600 text-white shadow-[0_10px_20px_-8px_rgba(122,47,136,.55)]'
                    : 'bg-cream-100 text-plum-600 ring-1 ring-cream-200 hover:bg-girl-100 hover:text-plum-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-plum-500">{pathwayHint}</p>
        </div>

        {/* Inputs */}
        <div className="calculator-inputs mt-6">
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor="ivf-mother-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.motherDobLabel}
            </label>
            <input
              id="ivf-mother-dob" type="date" required autoComplete="bday"
              min="1930-01-01" max={today} value={motherDob}
              onChange={(e) => setMotherDob(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby="ivf-mother-dob-hint"
            />
            <p id="ivf-mother-dob-hint" className="mt-1.5 text-xs text-plum-500">{S.motherDobHint}</p>
          </div>

          {needsDonor && (
            <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
              <label htmlFor="ivf-donor-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
                {S.donorDobLabel}
              </label>
              <input
                id="ivf-donor-dob" type="date" required autoComplete="bday"
                min="1930-01-01" max={today} value={donorDob}
                onChange={(e) => setDonorDob(e.target.value)}
                className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              />
              <p className="mt-1.5 text-xs text-plum-500">{S.donorDobHint}</p>
            </div>
          )}

          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor="ivf-retrieval" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
              {S.retrievalLabel}
            </label>
            <input
              id="ivf-retrieval" type="date" required
              min="1940-01-01" max={today} value={retrieval}
              onChange={(e) => setRetrieval(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
              aria-describedby="ivf-retrieval-hint"
            />
            <p id="ivf-retrieval-hint" className="mt-1.5 text-xs text-plum-500">{S.retrievalHint}</p>
          </div>

          {/* Embryo stage — only meaningful for the fresh (estimated transfer) path */}
          {pathway === 'fresh' && (
            <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
              <span className="mb-1.5 block font-display text-sm font-bold text-plum-700">{S.embryoDayLabel}</span>
              <div className="grid grid-cols-2 gap-2">
                {([3, 5] as const).map((d) => (
                  <button
                    key={d} type="button" aria-pressed={embryoDay === d}
                    onClick={() => setEmbryoDay(d)}
                    className={`focusable rounded-2xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-all ${
                      embryoDay === d
                        ? 'border-plum-500 bg-plum-100 text-plum-800 shadow-[0_8px_16px_-8px_rgba(122,47,136,.6)]'
                        : 'border-cream-200 bg-white text-plum-600 hover:border-girl-300'
                    }`}
                  >
                    {d === 3 ? S.embryoDay3 : S.embryoDay5}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-plum-500">{S.embryoDayHint}</p>
            </div>
          )}

          {needsTransfer && (
            <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
              <label htmlFor="ivf-transfer" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
                {S.transferLabel}
              </label>
              <input
                id="ivf-transfer" type="date" required
                min="1940-01-01" max={today} value={transfer}
                onChange={(e) => setTransfer(e.target.value)}
                className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
                aria-describedby="ivf-transfer-hint"
              />
              <p id="ivf-transfer-hint" className="mt-1.5 text-xs text-plum-500">{S.transferHint}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="submit" className="btn-primary text-base">
            <span aria-hidden="true">✨</span>{S.calculate}
          </button>
          {result && (
            <button type="button" onClick={reset} className="btn-secondary">{S.again}</button>
          )}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-plum-500">🍼 {S.disclaimer}</p>
      </form>

      {/* Dual-comparison output */}
      {result && (
        <div className="px-6 pb-8 sm:px-8" aria-live="polite">
          {result.a.gender === result.b.gender ? (
            <div
              className={`anim-pop rounded-3xl p-5 text-center shadow-lift sm:p-7 ${
                result.a.gender === 'boy'
                  ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white'
                  : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white'
              }`}
            >
              <p className="font-display text-sm font-bold uppercase tracking-widest opacity-90">
                ✅ {S.agreeBadge}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                🧲 {S.lockWord}: {result.a.gender === 'boy' ? S.genderBoy : S.genderGirl}
              </p>
              <div className="mt-4 flex items-end justify-center gap-2 sm:gap-3" role="img" aria-label={result.a.gender === 'boy' ? S.boyWord : S.girlWord}>
                <BabyFace gender={result.a.gender} className="h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24" />
                <GlossyHeart tone={result.a.gender === 'boy' ? 'blue' : 'pink'} className="h-14 w-14 drop-shadow-lg sm:h-16 sm:w-16" />
              </div>
              <p className="mx-auto mt-3 max-w-md text-sm font-medium opacity-95">{S.agreeNote}</p>
            </div>
          ) : (
            <div className="anim-pop rounded-3xl bg-cream-100 p-5 text-center shadow-lift ring-1 ring-cream-200 sm:p-7">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-plum-600">
                ✂️ {S.splitBadge}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-plum-900 sm:text-3xl">
                {S.methodAShort} = <span className="text-boy-600">{result.a.gender === 'boy' ? S.genderBoy : S.genderGirl}</span>
                {' · '}
                {S.methodBShort} = <span className="text-girl-600">{result.b.gender === 'boy' ? S.genderBoy : S.genderGirl}</span>
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-plum-600">{S.splitNote}</p>
            </div>
          )}

          {/* Side-by-side readings */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ReadingCard
              heading={S.methodAHeading}
              name={S.methodAName}
              desc={S.methodADesc}
              reading={result.a}
              strings={S}
              locale={locale}
              accent="boy"
            />
            <ReadingCard
              heading={S.methodBHeading}
              name={S.methodBName}
              desc={S.methodBDesc}
              reading={result.b}
              strings={S}
              locale={locale}
              accent="girl"
            />
          </div>

          <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-xs leading-relaxed text-plum-600 ring-1 ring-white/70">
            🧾 {S.traditionalNote}
          </p>
        </div>
      )}
    </div>
  );
}

function ReadingCard({
  heading,
  name,
  desc,
  reading,
  strings: S,
  locale,
  accent,
}: {
  heading: string;
  name: string;
  desc: string;
  reading: Reading;
  strings: IvfStrings;
  locale: string;
  accent: 'boy' | 'girl';
}) {
  return (
    <div className={`rounded-3xl p-5 text-white shadow-soft ${accent === 'boy' ? 'bg-gradient-to-br from-boy-500 to-boy-400' : 'bg-gradient-to-br from-girl-500 to-girl-400'}`}>
      <p className="font-display text-xs font-extrabold uppercase tracking-widest opacity-90">{heading}</p>
      <p className="mt-0.5 text-sm font-bold">{name}</p>
      <p className="mt-0.5 text-xs opacity-85">{desc}</p>
      <p className="mt-2 text-xs font-semibold opacity-90">📅 {fmtDate(reading.date, locale)}</p>
      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-white/20 px-3 py-1.5 font-bold backdrop-blur">
          {S.lunarAge}: <strong>{reading.lunarAge}</strong>
        </span>
        <span className="rounded-full bg-white/20 px-3 py-1.5 font-bold backdrop-blur">
          {S.lunarMonth}: <strong>{reading.lunarMonth}{reading.isLeap ? '*' : ''}</strong>
        </span>
        <span className="rounded-full bg-white/20 px-3 py-1.5 font-bold backdrop-blur">
          {S.zodiac}: <strong>{reading.zodiacEmoji} {reading.zodiac}</strong>
        </span>
      </div>
      <p className="mt-3 font-display text-lg font-extrabold">
        {reading.gender === 'boy' ? '💙' : '💗'} {reading.gender === 'boy' ? S.genderBoy : S.genderGirl}
      </p>
    </div>
  );
}
