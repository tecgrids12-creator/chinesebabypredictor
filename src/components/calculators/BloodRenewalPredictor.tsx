import { useState } from 'react';
import { burstConfetti } from './confetti';
import { BabyBoy, BabyGirl, GlossyHeart } from './Babies';
import { utcDate } from './ui';

export interface BloodRenewalStrings {
  momDobLabel: string;
  dadDobLabel: string;
  momBloodLossLabel: string;
  dadBloodLossLabel: string;
  momBloodLossHint: string;
  dadBloodLossHint: string;
  conceptionDateLabel: string;
  calculateBtn: string;
  resetBtn: string;
  momTitle: string;
  dadTitle: string;
  verdictGirl: string;
  verdictBoy: string;
  verdictBalanced: string;
  boyWord: string;
  girlWord: string;
  cycleLengthMom: string;
  cycleLengthDad: string;
  bloodAgeLabel: string;
  cycleCompletedLabel: string;
  invalidDates: string;
  invalidSequence: string;
  disclaimer: string;
}

export const DEFAULT_BLOOD_RENEWAL_STRINGS: BloodRenewalStrings = {
  momDobLabel: "👩 Mother's Date of Birth",
  dadDobLabel: "👨 Father's Date of Birth",
  momBloodLossLabel: 'Mother’s Last Major Blood Loss (Optional)',
  dadBloodLossLabel: 'Father’s Last Major Blood Loss (Optional)',
  momBloodLossHint: 'Prior childbirth, surgery, or major trauma resets the 3-year cycle in folklore.',
  dadBloodLossHint: 'Major surgery, donation, or trauma resets the 4-year cycle in folklore.',
  conceptionDateLabel: 'Estimated Conception Date',
  calculateBtn: '🩸 Calculate Blood Renewal Ages',
  resetBtn: '↻ Reset Calculator',
  momTitle: 'Mother’s 3-Year Cycle',
  dadTitle: 'Father’s 4-Year Cycle',
  verdictGirl: '💖 GIRL PREDICTED (Mother’s Blood Is Younger)',
  verdictBoy: '💙 BOY PREDICTED (Father’s Blood Is Younger)',
  verdictBalanced: '⚖️ BALANCED EQUAL BLOOD (50/50 RANDOM CHANCE)',
  boyWord: 'BOY',
  girlWord: 'GIRL',
  cycleLengthMom: '3.0 Years Cycle',
  cycleLengthDad: '4.0 Years Cycle',
  bloodAgeLabel: 'Blood Regeneration Age at Conception',
  cycleCompletedLabel: 'Current Cycle Progress',
  invalidDates: 'Please enter both mother’s DOB, father’s DOB, and conception date.',
  invalidSequence: 'Conception date must take place after both parents’ birth dates.',
  disclaimer: 'Folklore theory only. Hematology fact: human red blood cells live ~120 days in both sexes; fetal sex is determined chromosomally by sperm at fertilization.',
};

export default function BloodRenewalPredictor({ strings = DEFAULT_BLOOD_RENEWAL_STRINGS }: { strings?: Partial<BloodRenewalStrings> }) {
  const s: BloodRenewalStrings = { ...DEFAULT_BLOOD_RENEWAL_STRINGS, ...strings };

  const [momDob, setMomDob] = useState('1997-04-12');
  const [dadDob, setDadDob] = useState('1995-09-20');
  const [momLoss, setMomLoss] = useState('');
  const [dadLoss, setDadLoss] = useState('');
  const [conception, setConception] = useState('2026-07-10');
  const [error, setError] = useState<string | null>(null);

  interface BloodResult {
    momBaseDateStr: string;
    dadBaseDateStr: string;
    momElapsedYears: number;
    dadElapsedYears: number;
    momRemainderYears: number;
    dadRemainderYears: number;
    momCyclePercent: number;
    dadCyclePercent: number;
    verdict: 'girl' | 'boy' | 'balanced';
    verdictDescription: string;
  }

  const [result, setResult] = useState<BloodResult | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    if (!momDob || !dadDob || !conception) {
      setError(s.invalidDates);
      return;
    }

    const momBirth = utcDate(momDob);
    const dadBirth = utcDate(dadDob);
    const concDate = utcDate(conception);

    if (concDate <= momBirth || concDate <= dadBirth) {
      setError(s.invalidSequence);
      return;
    }

    // Determine baseline dates (use blood loss date if provided and before conception, else DOB)
    let momBase = momBirth;
    let momBaseStr = `${momDob} (Birth)`;
    if (momLoss) {
      const ml = utcDate(momLoss);
      if (ml < concDate && ml >= momBirth) {
        momBase = ml;
        momBaseStr = `${momLoss} (Reset)`;
      }
    }

    let dadBase = dadBirth;
    let dadBaseStr = `${dadDob} (Birth)`;
    if (dadLoss) {
      const dl = utcDate(dadLoss);
      if (dl < concDate && dl >= dadBirth) {
        dadBase = dl;
        dadBaseStr = `${dadLoss} (Reset)`;
      }
    }

    // Elapsed days and solar years
    const MS_PER_YEAR = 365.2425 * 86_400_000;
    const momElapsedYears = (concDate.getTime() - momBase.getTime()) / MS_PER_YEAR;
    const dadElapsedYears = (concDate.getTime() - dadBase.getTime()) / MS_PER_YEAR;

    // Remainders in current cycle
    const momRemainderYears = momElapsedYears % 3.0;
    const dadRemainderYears = dadElapsedYears % 4.0;

    const momCyclePercent = Math.min(100, Math.max(0, (momRemainderYears / 3.0) * 100));
    const dadCyclePercent = Math.min(100, Math.max(0, (dadRemainderYears / 4.0) * 100));

    let verdict: 'girl' | 'boy' | 'balanced';
    let verdictDescription: string;

    const diff = Math.abs(momRemainderYears - dadRemainderYears);
    if (diff < 0.05) {
      verdict = 'balanced';
      verdictDescription = `Both parents' blood renewal ages are virtually identical (${momRemainderYears.toFixed(2)} yrs vs ${dadRemainderYears.toFixed(2)} yrs). The folklore theory considers this an even 50/50 probability.`;
    } else if (momRemainderYears < dadRemainderYears) {
      verdict = 'girl';
      verdictDescription = `The mother's blood was renewed more recently (${momRemainderYears.toFixed(2)} years into her 3-year cycle) compared to the father's blood (${dadRemainderYears.toFixed(2)} years into his 4-year cycle). According to the theory, the parent with younger blood passes on their sex to the child.`;
    } else {
      verdict = 'boy';
      verdictDescription = `The father's blood was renewed more recently (${dadRemainderYears.toFixed(2)} years into his 4-year cycle) compared to the mother's blood (${momRemainderYears.toFixed(2)} years into her 3-year cycle). According to the theory, the parent with younger blood passes on their sex to the child.`;
    }

    setResult({
      momBaseDateStr: momBaseStr,
      dadBaseDateStr: dadBaseStr,
      momElapsedYears,
      dadElapsedYears,
      momRemainderYears,
      dadRemainderYears,
      momCyclePercent,
      dadCyclePercent,
      verdict,
      verdictDescription,
    });

    if (verdict === 'girl') burstConfetti('girl');
    else if (verdict === 'boy') burstConfetti('boy');
  };

  return (
    <div className="calculator-card p-6 sm:p-8" id="blood-renewal-calculator">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-cream-200 pb-4">
        <div>
          <span className="font-display text-sm font-bold uppercase tracking-wider text-plum-500">European Folklore Engine</span>
          <h2 className="font-display text-xl font-extrabold text-plum-900 sm:text-2xl">Blood Renewal Cycle Predictor</h2>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-full bg-girl-50 px-2.5 py-1 text-xs font-bold text-girl-700 ring-1 ring-girl-200">♀ 3-Yr Cycle</span>
          <span className="inline-flex items-center rounded-full bg-boy-50 px-2.5 py-1 text-xs font-bold text-boy-700 ring-1 ring-boy-200">♂ 4-Yr Cycle</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Mother Column */}
        <div className="rounded-2xl bg-girl-50/50 p-4 ring-1 ring-girl-200/60">
          <label htmlFor="br-mom-dob" className="mb-1 block font-display text-sm font-bold text-plum-800">
            {s.momDobLabel}
          </label>
          <input
            id="br-mom-dob"
            type="date"
            min="1950-01-01"
            max={today}
            value={momDob}
            onChange={(e) => setMomDob(e.target.value)}
            className="focusable w-full rounded-xl border border-cream-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-plum-900 [color-scheme:light]"
          />

          <label htmlFor="br-mom-loss" className="mb-1 mt-3.5 block font-display text-xs font-bold text-plum-700">
            {s.momBloodLossLabel}
          </label>
          <input
            id="br-mom-loss"
            type="date"
            min="1970-01-01"
            max={today}
            value={momLoss}
            onChange={(e) => setMomLoss(e.target.value)}
            className="focusable w-full rounded-xl border border-cream-200 bg-white px-3.5 py-2 text-xs font-semibold text-plum-900 [color-scheme:light]"
          />
          <p className="mt-1 text-[11px] text-plum-500">{s.momBloodLossHint}</p>
        </div>

        {/* Father Column */}
        <div className="rounded-2xl bg-boy-50/50 p-4 ring-1 ring-boy-200/60">
          <label htmlFor="br-dad-dob" className="mb-1 block font-display text-sm font-bold text-plum-800">
            {s.dadDobLabel}
          </label>
          <input
            id="br-dad-dob"
            type="date"
            min="1950-01-01"
            max={today}
            value={dadDob}
            onChange={(e) => setDadDob(e.target.value)}
            className="focusable w-full rounded-xl border border-cream-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-plum-900 [color-scheme:light]"
          />

          <label htmlFor="br-dad-loss" className="mb-1 mt-3.5 block font-display text-xs font-bold text-plum-700">
            {s.dadBloodLossLabel}
          </label>
          <input
            id="br-dad-loss"
            type="date"
            min="1970-01-01"
            max={today}
            value={dadLoss}
            onChange={(e) => setDadLoss(e.target.value)}
            className="focusable w-full rounded-xl border border-cream-200 bg-white px-3.5 py-2 text-xs font-semibold text-plum-900 [color-scheme:light]"
          />
          <p className="mt-1 text-[11px] text-plum-500">{s.dadBloodLossHint}</p>
        </div>
      </div>

      {/* Conception Date */}
      <div className="mt-4">
        <label htmlFor="br-conc-date" className="mb-1.5 block font-display text-sm font-bold text-plum-800">
          🗓️ {s.conceptionDateLabel}
        </label>
        <input
          id="br-conc-date"
          type="date"
          min="1970-01-01"
          max="2035-12-31"
          value={conception}
          onChange={(e) => setConception(e.target.value)}
          className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-sm font-semibold text-plum-900 [color-scheme:light]"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          className="btn-primary flex-1 min-w-[200px] justify-center py-3.5 text-base"
        >
          {s.calculateBtn}
        </button>
        {result && (
          <button
            type="button"
            onClick={() => setResult(null)}
            className="btn-secondary px-5 py-3.5"
          >
            {s.resetBtn}
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="anim-pop mt-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
          ⚠️ {error}
        </p>
      )}

      {/* Results Section */}
      {result && (
        <div aria-live="polite" className="anim-pop mt-6 space-y-6">
          {/* Verdict Banner */}
          <div
            className={`rounded-3xl p-5 text-center text-white shadow-lift transition-all ${
              result.verdict === 'girl'
                ? 'bg-gradient-to-r from-girl-600 via-girl-500 to-fuchsia-600'
                : result.verdict === 'boy'
                  ? 'bg-gradient-to-r from-boy-600 via-boy-500 to-indigo-600'
                  : 'bg-gradient-to-r from-amber-600 to-plum-700'
            }`}
          >
            <div className="mx-auto flex max-w-lg flex-col items-center">
              <span className="font-display text-xs font-black uppercase tracking-wider text-white/90">
                Blood Regeneration Verdict
              </span>
              <h3 className="mt-1 font-display text-xl font-black sm:text-2xl">
                {result.verdict === 'girl' && s.verdictGirl}
                {result.verdict === 'boy' && s.verdictBoy}
                {result.verdict === 'balanced' && s.verdictBalanced}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/90 sm:text-sm">
                {result.verdictDescription}
              </p>
            </div>
          </div>

          {/* Visual Progress Bars of Both Parents' Cycles */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Mother's Blood Bar */}
            <div className={`rounded-3xl border-2 p-5 shadow-soft ${
              result.momRemainderYears < result.dadRemainderYears
                ? 'border-girl-400 bg-girl-50/40 ring-2 ring-girl-300'
                : 'border-cream-200 bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-plum-900">👩 {s.momTitle}</span>
                {result.momRemainderYears < result.dadRemainderYears && (
                  <span className="rounded-full bg-girl-500 px-2 py-0.5 text-[11px] font-extrabold text-white">
                    ⭐ Younger Blood
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs font-semibold text-plum-600 mb-1">
                  <span>Current cycle age: <strong>{result.momRemainderYears.toFixed(2)} yrs</strong></span>
                  <span>Cap: 3.0 yrs</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-girl-400 to-girl-600 transition-all duration-700"
                    style={{ width: `${result.momCyclePercent}%` }}
                  ></div>
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-plum-500">
                  <span>0 yr (Renewed)</span>
                  <span>{result.momCyclePercent.toFixed(0)}% elapsed</span>
                  <span>3 yrs</span>
                </div>
              </div>

              <dl className="mt-4 space-y-1.5 border-t border-cream-200 pt-3 text-xs text-plum-600">
                <div className="flex justify-between">
                  <dt>Base date:</dt>
                  <dd className="font-semibold text-plum-900">{result.momBaseDateStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Total elapsed time:</dt>
                  <dd className="font-semibold text-plum-900">{result.momElapsedYears.toFixed(2)} years</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Completed 3-year cycles:</dt>
                  <dd className="font-semibold text-plum-900">{Math.floor(result.momElapsedYears / 3.0)} full cycles</dd>
                </div>
              </dl>
            </div>

            {/* Father's Blood Bar */}
            <div className={`rounded-3xl border-2 p-5 shadow-soft ${
              result.dadRemainderYears < result.momRemainderYears
                ? 'border-boy-400 bg-boy-50/40 ring-2 ring-boy-300'
                : 'border-cream-200 bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-plum-900">👨 {s.dadTitle}</span>
                {result.dadRemainderYears < result.momRemainderYears && (
                  <span className="rounded-full bg-boy-500 px-2 py-0.5 text-[11px] font-extrabold text-white">
                    ⭐ Younger Blood
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs font-semibold text-plum-600 mb-1">
                  <span>Current cycle age: <strong>{result.dadRemainderYears.toFixed(2)} yrs</strong></span>
                  <span>Cap: 4.0 yrs</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-boy-400 to-boy-600 transition-all duration-700"
                    style={{ width: `${result.dadCyclePercent}%` }}
                  ></div>
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-plum-500">
                  <span>0 yr (Renewed)</span>
                  <span>{result.dadCyclePercent.toFixed(0)}% elapsed</span>
                  <span>4 yrs</span>
                </div>
              </div>

              <dl className="mt-4 space-y-1.5 border-t border-cream-200 pt-3 text-xs text-plum-600">
                <div className="flex justify-between">
                  <dt>Base date:</dt>
                  <dd className="font-semibold text-plum-900">{result.dadBaseDateStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Total elapsed time:</dt>
                  <dd className="font-semibold text-plum-900">{result.dadElapsedYears.toFixed(2)} years</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Completed 4-year cycles:</dt>
                  <dd className="font-semibold text-plum-900">{Math.floor(result.dadElapsedYears / 4.0)} full cycles</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="rounded-2xl bg-cream-100 p-3.5 text-center text-xs font-semibold text-plum-600 ring-1 ring-cream-200">
            🩸 {s.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
