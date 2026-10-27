import { useState } from 'react';
import { solarToLunar, lunarAgeAtConception, clamp } from '../../utils/lunar';
import { chartGender, type Gender } from '../../utils/genderChart';
import { conceptionFromLmp, conceptionFromDueDate, westernZodiac } from '../../utils/gestation';
import { burstConfetti } from './confetti';
import { BabyBoy, BabyGirl, GlossyHeart } from './Babies';
import { utcDate } from './ui';

export interface MayanDualStrings {
  motherDobLabel: string;
  conceptionMethodLabel: string;
  methodExact: string;
  methodLmp: string;
  methodDueDate: string;
  conceptionDateLabel: string;
  lmpDateLabel: string;
  dueDateLabel: string;
  calculateBtn: string;
  resetBtn: string;
  chinaTitle: string;
  mayaTitle: string;
  lunarAgeLabel: string;
  lunarMonthLabel: string;
  westernAgeLabel: string;
  gregorianMonthLabel: string;
  parityLabel: string;
  agreeBanner: string;
  splitBanner: string;
  agreeText: string;
  splitText: string;
  evenWord: string;
  oddWord: string;
  sameParityRule: string;
  diffParityRule: string;
  boyWord: string;
  girlWord: string;
  invalidDates: string;
  futureDateError: string;
  disclaimer: string;
}

export const DEFAULT_MAYAN_DUAL_STRINGS: MayanDualStrings = {
  motherDobLabel: "🎂 Mother's Date of Birth",
  conceptionMethodLabel: 'Date Calculation Method',
  methodExact: 'Conception Date',
  methodLmp: 'Last Period (LMP)',
  methodDueDate: 'Due Date',
  conceptionDateLabel: 'Estimated Conception Date',
  lmpDateLabel: 'First Day of Last Period (LMP)',
  dueDateLabel: 'Estimated Baby Due Date',
  calculateBtn: '🔮 Predict with Both Ancient Systems',
  resetBtn: '↻ Test Other Dates',
  chinaTitle: 'Ancient China',
  mayaTitle: 'Ancient Maya',
  lunarAgeLabel: 'Mother’s Lunar Age (虚岁)',
  lunarMonthLabel: 'Conception Lunar Month',
  westernAgeLabel: 'Western Age at Conception',
  gregorianMonthLabel: 'Conception Month',
  parityLabel: 'Parity Combination',
  agreeBanner: '🌟 ANCIENT CULTURES AGREE: {gender} (DOUBLE FOLKLORE SYNERGY)',
  splitBanner: '⚔️ FOLKLORE SPLIT: China says {chinese} · Maya says {mayan}',
  agreeText: 'Both the Chinese lunisolar palace chart and the Mayan mathematical parity system predict {gender}. In ancient folklore, dual civilizational agreement is celebrated as a double harmony sign!',
  splitText: 'The ancient traditions diverge for your dates: Chinese lunisolar math points to {chinese}, while the Mayan solar parity system indicates {mayan}. Because both systems rely on different calendrical clocks, split verdicts occur in roughly 50% of dates.',
  evenWord: 'Even',
  oddWord: 'Odd',
  sameParityRule: 'Both Even / Both Odd → Girl',
  diffParityRule: 'One Even + One Odd → Boy',
  boyWord: 'BOY',
  girlWord: 'GIRL',
  invalidDates: 'Please enter valid dates to calculate your predictions.',
  futureDateError: 'Mother’s birth date must be in the past and before the conception date.',
  disclaimer: 'For entertainment only. Fetal sex is determined chromosomally by sperm at fertilization (~50% odds) — neither ancient chart has clinical predictive power.',
};

const GREGORIAN_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function MayanDualPredictor({ strings = DEFAULT_MAYAN_DUAL_STRINGS }: { strings?: Partial<MayanDualStrings> }) {
  const s: MayanDualStrings = { ...DEFAULT_MAYAN_DUAL_STRINGS, ...strings };

  const [motherDob, setMotherDob] = useState('1996-05-15');
  const [method, setMethod] = useState<'exact' | 'lmp' | 'dueDate'>('exact');
  const [dateInput, setDateInput] = useState('2026-06-18');
  const [error, setError] = useState<string | null>(null);

  interface DualResult {
    conceptionDateStr: string;
    chineseGender: Gender;
    mayanGender: Gender;
    lunarAge: number;
    lunarMonth: number;
    lunarYear: number;
    zodiac: string;
    zodiacEmoji: string;
    westernAge: number;
    gregorianMonth: number;
    gregorianMonthName: string;
    ageIsEven: boolean;
    monthIsEven: boolean;
    sameParity: boolean;
    westernZodiacSign: string;
    westernZodiacEmoji: string;
    isAgreement: boolean;
  }

  const [result, setResult] = useState<DualResult | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const handlePredict = () => {
    setError(null);
    setResult(null);

    if (!motherDob || !dateInput) {
      setError(s.invalidDates);
      return;
    }

    const birthDate = utcDate(motherDob);
    let resolvedConception: Date;

    if (method === 'exact') {
      resolvedConception = utcDate(dateInput);
    } else if (method === 'lmp') {
      resolvedConception = conceptionFromLmp(utcDate(dateInput));
    } else {
      resolvedConception = conceptionFromDueDate(utcDate(dateInput));
    }

    if (resolvedConception <= birthDate) {
      setError(s.futureDateError);
      return;
    }

    // Chinese Lunisolar calculation
    const rawLunarAge = lunarAgeAtConception(birthDate, resolvedConception);
    const clampedAge = clamp(rawLunarAge, 18, 45);
    const lunarConception = solarToLunar(resolvedConception);
    const chineseGender = chartGender(clampedAge, lunarConception.month);

    // Mayan Parity calculation:
    // Western solar age at conception
    let westernAge = resolvedConception.getUTCFullYear() - birthDate.getUTCFullYear();
    if (
      resolvedConception.getUTCMonth() < birthDate.getUTCMonth() ||
      (resolvedConception.getUTCMonth() === birthDate.getUTCMonth() && resolvedConception.getUTCDate() < birthDate.getUTCDate())
    ) {
      westernAge--;
    }

    const gregorianMonth = resolvedConception.getUTCMonth() + 1; // 1-12
    const gregorianMonthName = GREGORIAN_MONTH_NAMES[resolvedConception.getUTCMonth()] ?? '';
    const ageIsEven = westernAge % 2 === 0;
    const monthIsEven = gregorianMonth % 2 === 0;
    const sameParity = (ageIsEven && monthIsEven) || (!ageIsEven && !monthIsEven);
    const mayanGender: Gender = sameParity ? 'girl' : 'boy';

    const wz = westernZodiac(resolvedConception);
    const isAgreement = chineseGender === mayanGender;

    setResult({
      conceptionDateStr: resolvedConception.toISOString().slice(0, 10),
      chineseGender,
      mayanGender,
      lunarAge: clampedAge,
      lunarMonth: lunarConception.month,
      lunarYear: lunarConception.year,
      zodiac: lunarConception.zodiac,
      zodiacEmoji: lunarConception.zodiacEmoji,
      westernAge,
      gregorianMonth,
      gregorianMonthName,
      ageIsEven,
      monthIsEven,
      sameParity,
      westernZodiacSign: wz.sign,
      westernZodiacEmoji: wz.emoji,
      isAgreement,
    });

    burstConfetti(chineseGender);
  };

  return (
    <div className="calculator-card p-6 sm:p-8" id="mayan-dual-calculator">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-cream-200 pb-4">
        <div>
          <span className="font-display text-sm font-bold uppercase tracking-wider text-plum-500">Dual Ancient Engine</span>
          <h2 className="font-display text-xl font-extrabold text-plum-900 sm:text-2xl">China vs. Maya Gender Comparison</h2>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200">🇨🇳 Lunisolar</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">🏺 Parity Math</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Mother DOB */}
        <div>
          <label htmlFor="md-mom-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-800">
            {s.motherDobLabel}
          </label>
          <input
            id="md-mom-dob"
            type="date"
            min="1950-01-01"
            max={today}
            value={motherDob}
            onChange={(e) => setMotherDob(e.target.value)}
            className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-sm font-semibold text-plum-900 [color-scheme:light]"
          />
        </div>

        {/* Conception Date Calculation Method */}
        <div>
          <span className="mb-1.5 block font-display text-sm font-bold text-plum-800">{s.conceptionMethodLabel}</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMethod('exact')}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                method === 'exact'
                  ? 'bg-plum-800 text-white shadow-soft'
                  : 'bg-cream-100 text-plum-700 hover:bg-cream-200'
              }`}
            >
              📅 {s.methodExact}
            </button>
            <button
              type="button"
              onClick={() => setMethod('lmp')}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                method === 'lmp'
                  ? 'bg-plum-800 text-white shadow-soft'
                  : 'bg-cream-100 text-plum-700 hover:bg-cream-200'
              }`}
            >
              🩸 {s.methodLmp}
            </button>
            <button
              type="button"
              onClick={() => setMethod('dueDate')}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                method === 'dueDate'
                  ? 'bg-plum-800 text-white shadow-soft'
                  : 'bg-cream-100 text-plum-700 hover:bg-cream-200'
              }`}
            >
              🍼 {s.methodDueDate}
            </button>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="md-date-input" className="mb-1.5 block font-display text-sm font-bold text-plum-800">
            {method === 'exact' && s.conceptionDateLabel}
            {method === 'lmp' && `${s.lmpDateLabel} (+14 days ovulation)`}
            {method === 'dueDate' && `${s.dueDateLabel} (−266 days conception)`}
          </label>
          <input
            id="md-date-input"
            type="date"
            min="1970-01-01"
            max="2035-12-31"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-sm font-semibold text-plum-900 [color-scheme:light]"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handlePredict}
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
          {/* Agreement / Split Indicator Banner */}
          <div
            className={`rounded-3xl p-5 text-center text-white shadow-lift transition-all ${
              result.isAgreement
                ? result.chineseGender === 'boy'
                  ? 'bg-gradient-to-r from-boy-600 via-boy-500 to-indigo-600'
                  : 'bg-gradient-to-r from-girl-600 via-girl-500 to-fuchsia-600'
                : 'bg-gradient-to-r from-amber-600 via-plum-700 to-purple-800'
            }`}
          >
            <div className="mx-auto flex max-w-lg flex-col items-center">
              <span className="font-display text-xs font-black uppercase tracking-wider text-white/90">
                {result.isAgreement ? 'Harmonious Double Reading' : 'Civilizational Divergence'}
              </span>
              <h3 className="mt-1 font-display text-xl font-black sm:text-2xl">
                {result.isAgreement
                  ? s.agreeBanner.replace('{gender}', result.chineseGender === 'boy' ? s.boyWord : s.girlWord)
                  : s.splitBanner
                      .replace('{chinese}', result.chineseGender === 'boy' ? s.boyWord : s.girlWord)
                      .replace('{mayan}', result.mayanGender === 'boy' ? s.boyWord : s.girlWord)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/90 sm:text-sm">
                {result.isAgreement
                  ? s.agreeText.replace('{gender}', result.chineseGender === 'boy' ? s.boyWord : s.girlWord)
                  : s.splitText
                      .replace('{chinese}', result.chineseGender === 'boy' ? s.boyWord : s.girlWord)
                      .replace('{mayan}', result.mayanGender === 'boy' ? s.boyWord : s.girlWord)}
              </p>
            </div>
          </div>

          {/* Side-by-Side Cards: China vs. Maya */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* China Card */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-red-200/80 bg-gradient-to-b from-red-50/40 via-white to-cream-50/60 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-700">
                  <span className="text-base">🇨🇳</span> {s.chinaTitle}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-800">
                  Qing Palace Matrix
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                {result.chineseGender === 'boy' ? (
                  <BabyBoy className="h-24 w-24 drop-shadow-md sm:h-28 sm:w-28" />
                ) : (
                  <BabyGirl className="h-24 w-24 drop-shadow-md sm:h-28 sm:w-28" />
                )}
                <div className="text-left">
                  <span className="font-display text-xs font-bold text-plum-500">Verdict</span>
                  <div
                    className={`font-display text-3xl font-black ${
                      result.chineseGender === 'boy' ? 'text-boy-600' : 'text-girl-600'
                    }`}
                  >
                    {result.chineseGender === 'boy' ? '👦 BOY' : '👧 GIRL'}
                  </div>
                  <span className="inline-block mt-1 text-xs font-semibold text-plum-600">
                    {result.zodiacEmoji} {result.zodiac} Year
                  </span>
                </div>
              </div>

              <dl className="mt-5 space-y-2 divide-y divide-cream-200 border-t border-cream-200 pt-3 text-xs">
                <div className="flex justify-between pt-1">
                  <dt className="text-plum-600">{s.lunarAgeLabel}:</dt>
                  <dd className="font-bold text-plum-900">{result.lunarAge} years old</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-plum-600">{s.lunarMonthLabel}:</dt>
                  <dd className="font-bold text-plum-900">Lunar Month {result.lunarMonth}</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-plum-600">Calendar Base:</dt>
                  <dd className="font-bold text-plum-900">Lunisolar New Moon Cycle</dd>
                </div>
              </dl>
            </div>

            {/* Maya Card */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-amber-200/80 bg-gradient-to-b from-amber-50/40 via-white to-cream-50/60 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-800">
                  <span className="text-base">🏺</span> {s.mayaTitle}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                  Parity System
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                {result.mayanGender === 'boy' ? (
                  <BabyBoy className="h-24 w-24 drop-shadow-md sm:h-28 sm:w-28" />
                ) : (
                  <BabyGirl className="h-24 w-24 drop-shadow-md sm:h-28 sm:w-28" />
                )}
                <div className="text-left">
                  <span className="font-display text-xs font-bold text-plum-500">Verdict</span>
                  <div
                    className={`font-display text-3xl font-black ${
                      result.mayanGender === 'boy' ? 'text-boy-600' : 'text-girl-600'
                    }`}
                  >
                    {result.mayanGender === 'boy' ? '👦 BOY' : '👧 GIRL'}
                  </div>
                  <span className="inline-block mt-1 text-xs font-semibold text-plum-600">
                    {result.westernZodiacEmoji} {result.westernZodiacSign}
                  </span>
                </div>
              </div>

              <dl className="mt-5 space-y-2 divide-y divide-cream-200 border-t border-cream-200 pt-3 text-xs">
                <div className="flex justify-between pt-1">
                  <dt className="text-plum-600">{s.westernAgeLabel}:</dt>
                  <dd className="font-bold text-plum-900">
                    {result.westernAge} ({result.ageIsEven ? s.evenWord : s.oddWord})
                  </dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-plum-600">{s.gregorianMonthLabel}:</dt>
                  <dd className="font-bold text-plum-900">
                    {result.gregorianMonthName} ({result.gregorianMonth}, {result.monthIsEven ? s.evenWord : s.oddWord})
                  </dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-plum-600">{s.parityLabel}:</dt>
                  <dd className="font-bold text-plum-900">
                    {result.sameParity ? s.sameParityRule : s.diffParityRule}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="rounded-2xl bg-cream-100 p-3.5 text-center text-xs font-semibold text-plum-600 ring-1 ring-cream-200">
            🍼 {s.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
