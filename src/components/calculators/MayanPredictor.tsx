import { useState } from 'react';
import { mayanGender } from '../../utils/mayan';
import { westernZodiac } from '../../utils/gestation';
import { burstConfetti } from './confetti';
import { BabyBoy, BabyGirl, GlossyHeart } from './Babies';
import { utcDate } from './ui';

export interface MayanStrings {
  dobLabel: string; conceptionLabel: string; rule: string;
  predict: string; again: string;
  boyTitle: string; girlTitle: string;
  ageLabel: string; yearLabel: string; parity: string;
  invalid: string; disclaimer: string;
}

/** Mayan predictor island: parity of mother's age at conception vs conception year. */
export default function MayanPredictor({ strings }: { strings: MayanStrings }) {
  const [dob, setDob] = useState('');
  const [conception, setConception] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ gender: 'boy' | 'girl'; age: number; year: number } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const predict = () => {
    setError(null);
    setResult(null);
    if (!dob || !conception) {
      setError(strings.invalid);
      return;
    }
    const birth = utcDate(dob);
    const conceptionDate = utcDate(conception);
    if (conceptionDate <= birth) {
      setError(strings.invalid);
      return;
    }
    // Western age at conception (full years)
    let age = conceptionDate.getUTCFullYear() - birth.getUTCFullYear();
    if (conceptionDate.getUTCMonth() < birth.getUTCMonth() ||
        (conceptionDate.getUTCMonth() === birth.getUTCMonth() && conceptionDate.getUTCDate() < birth.getUTCDate())) {
      age--;
    }
    const year = conceptionDate.getUTCFullYear();
    const gender = mayanGender(age, year);
    setResult({ gender, age, year });
    burstConfetti(gender);
  };

  return (
    <div className="calculator-card p-6 sm:p-8">
      <p className="mb-5 rounded-2xl bg-cream-100 px-4 py-3 text-center text-xs font-semibold text-plum-600">
        🏛️ {strings.rule}
      </p>
      <div className="calculator-inputs">
        <div>
          <label htmlFor="my-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">{strings.dobLabel}</label>
          <input id="my-dob" type="date" min="1930-01-01" max={today} value={dob} onChange={(e) => setDob(e.target.value)}
                 className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
        </div>
        <div>
          <label htmlFor="my-conc" className="mb-1.5 block font-display text-sm font-bold text-plum-700">{strings.conceptionLabel}</label>
          <input id="my-conc" type="date" min="1940-01-01" max={today} value={conception} onChange={(e) => setConception(e.target.value)}
                 className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 [color-scheme:light]" />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button type="button" onClick={predict} className="btn-primary">{strings.predict}</button>
        {result && <button type="button" onClick={() => setResult(null)} className="btn-secondary">↻ {strings.again}</button>}
      </div>
      {error && <p role="alert" className="anim-pop mt-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700">{`⚠️ ${error}`}</p>}

      <div aria-live="polite" className="relative grid min-h-[0px]">
        {result && (
          <div className={`anim-pop mt-6 rounded-3xl p-6 text-center text-white shadow-lift ${
            result.gender === 'boy' ? 'bg-gradient-to-br from-boy-500 to-boy-400' : 'bg-gradient-to-br from-girl-500 to-girl-400'
          }`}>
            <div aria-hidden="true" className="flex items-end justify-center gap-2">
              {result.gender === 'boy'
                ? <BabyBoy className="h-32 w-32 drop-shadow-lg sm:h-36 sm:w-36" />
                : <BabyGirl className="h-32 w-32 drop-shadow-lg sm:h-36 sm:w-36" />}
              <GlossyHeart tone={result.gender === 'boy' ? 'blue' : 'pink'} className="h-14 w-14 drop-shadow-lg" />
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold">{result.gender === 'boy' ? strings.boyTitle : strings.girlTitle}</h3>
            <p className="mt-2 text-sm font-bold opacity-90">
              {strings.ageLabel}: {result.age} · {strings.yearLabel}: {result.year} · {strings.parity}:{' '}
              {result.age % 2 === result.year % 2 ? 'odd+odd / even+even' : 'mixed'}
            </p>
            <p className="mt-3 text-xs opacity-80">{westernZodiac(new Date(`${conception}T00:00:00Z`)).emoji} {westernZodiac(new Date(`${conception}T00:00:00Z`)).sign}</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs font-semibold text-plum-500">🍼 {strings.disclaimer}</p>
    </div>
  );
}
