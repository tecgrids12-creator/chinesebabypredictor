import { useState, useCallback, useMemo } from 'react';
import type { FormEvent } from 'react';
import { lunarAgeAtConception, chartGender, solarToLunar } from '../../utils';
import { conceptionFromLmp, conceptionFromDueDate, westernZodiac } from '../../utils/gestation';
import { planWindows } from '../../utils/planner';
import { burstConfetti } from './confetti';
import { BabyFace, GlossyHeart } from './Babies';
import { fmtDate, utcDate } from './ui';

export interface PredictorStrings {
  dobLabel: string; dobHint: string;
  modeHeading: string; eventHint: string;
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
  /* Dual-mode (Phase 1) */
  topPredict: string; topPlan: string;
  planWant: string; planBoy: string; planGirl: string;
  planCompute: string; planResult: string; planLeap: string; planWindow: string;
  planNone: string; planMini: string; planBest: string; planWhite: string;
  /* Transparency drawer */
  showCalc: string; hideCalc: string;
  stepDob: string; stepLunar: string; stepMonth: string; stepCell: string;
  /* Share card */
  shareCard: string; shareCardSaved: string;
}

type TabMode = 'predict' | 'plan';
type Mode = 'conception' | 'due' | 'lmp';

interface Result {
  gender: 'boy' | 'girl';
  lunarAge: number;
  lunarMonth: number;
  zodiac: string;
  zodiacEmoji: string;
  conception: Date;
  wasLeapMonth: boolean;
  /** Transparency drawer data */
  westernAge: number;
  lunarBirthYear: number;
  lunarConceptionYear: number;
}

export default function GenderPredictor({ strings }: { strings: PredictorStrings }) {
  const [tab, setTab] = useState<TabMode>('predict');
  const [mode, setMode] = useState<Mode>('conception');
  const [dob, setDob] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [want, setWant] = useState<'boy' | 'girl'>('boy');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rated, setRated] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardMsg, setCardMsg] = useState(false);

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

      const birthLunar = solarToLunar(birth);
      const conceptionLunar = solarToLunar(conception);
      const age = conceptionLunar.year - birthLunar.year + 1;
      const gender = chartGender(age, conceptionLunar.month);

      // Western (Gregorian) age at conception
      let westernAge = conception.getUTCFullYear() - birth.getUTCFullYear();
      const bDay = Date.UTC(birth.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate());
      const cDay = Date.UTC(conception.getUTCFullYear(), conception.getUTCMonth(), conception.getUTCDate());
      if (cDay < Date.UTC(conception.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate())) westernAge -= 1;

      setError(null);
      setResult({
        gender,
        lunarAge: age,
        lunarMonth: conceptionLunar.month,
        zodiac: conceptionLunar.zodiac,
        zodiacEmoji: conceptionLunar.zodiacEmoji,
        conception,
        wasLeapMonth: conceptionLunar.isLeapMonth,
        westernAge,
        lunarBirthYear: birthLunar.year,
        lunarConceptionYear: conceptionLunar.year,
      });
      burstConfetti(gender);

      // Phase 2: publish the exact cell so the interactive chart lights its
      // crosshair (row / column / intersection).
      const detail = { age, month: conceptionLunar.month, gender, ts: Date.now() };
      try {
        sessionStorage.setItem('cbp-cell', JSON.stringify(detail));
      } catch { /* private mode – event still fires */ }
      window.dispatchEvent(new CustomEvent('cbp-cell', { detail }));
    },
    [dob, eventDate, mode, strings],
  );

  /* ── Phase 1 · Mode B: TTC planning ──────────────────────────────── */

  interface WindowRow { lunarYear: number; month: number; isLeap: boolean; start: Date; end: Date; lunarAge: number }

  const [planResult, setPlanResult] = useState<WindowRow[] | null>(null);

  const plan = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setResult(null);
      setRated(null);
      if (!dob) {
        setError(strings.invalid);
        return;
      }
      const birth = utcDate(dob);
      const now = new Date();
      const year = now.getUTCFullYear();
      const monthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
      const horizon = new Date(monthStart);
      horizon.setUTCMonth(horizon.getUTCMonth() + 18);
      const windows: WindowRow[] = [
        ...planWindows(birth, year, want),
        ...planWindows(birth, year + 1, want),
      ].filter((w) => w.start.getTime() >= monthStart && w.start.getTime() < horizon.getTime());
      setError(null);
      burstConfetti(want);
      try {
        sessionStorage.setItem('cbp-cell', JSON.stringify({ gender: want, ts: Date.now() }));
      } catch { /* ignore */ }
      setPlanResult(windows);
    },
    [dob, want, strings],
  );

  /* 18-month mini-calendar: does a favourable window overlap each month? */
  const miniCalendar = useMemo(() => {
    const now = new Date();
    const base = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
    const rows = planResult ?? [];
    return Array.from({ length: 18 }, (_, i) => {
      const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
      const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i + 1, 1));
      const label = start.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
      const overlap = rows.some((w) => w.start.getTime() < end.getTime() && w.end.getTime() >= start.getTime());
      return { start, label, overlap };
    });
  }, [planResult]);

  /* ── Phase 4: canvas share card ──────────────────────────────────── */
  const shareCard = useCallback(async () => {
    if (!result) return;
    const S = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // background wash
    const g = ctx.createLinearGradient(0, 0, S, S);
    if (result.gender === 'boy') { g.addColorStop(0, '#2C63E8'); g.addColorStop(0.55, '#4E86F5'); g.addColorStop(1, '#7FB0F9'); }
    else { g.addColorStop(0, '#DD2175'); g.addColorStop(0.55, '#EE5A97'); g.addColorStop(1, '#F8A9C4'); }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);

    // soft blobs
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.arc(S * 0.85, S * 0.12, 260, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(S * 0.12, S * 0.9, 300, 0, Math.PI * 2); ctx.fill();

    // header
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '700 52px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👶 Chinese Baby Predictor', S / 2, 120);

    // kicker
    ctx.font = '700 46px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText('OUR LUNAR PREDICTION IS', S / 2, 340);

    // baby emoji + title
    ctx.font = '240px system-ui';
    ctx.fillText(result.gender === 'boy' ? '💙' : '💗', S / 2, 600);
    ctx.font = '800 118px "Fredoka Variable", "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(result.gender === 'boy' ? "It's a BOY!" : "It's a GIRL!", S / 2, 800);

    // chips
    const chips = [
      `Lunar age ${result.lunarAge}`,
      `Lunar month ${result.lunarMonth}${result.wasLeapMonth ? ' (leap)' : ''}`,
      `${result.zodiacEmoji} ${result.zodiac} year`,
    ];
    ctx.font = '700 40px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    let total = chips.reduce((acc, c) => acc + ctx.measureText(c).width + 64, -64 + (chips.length - 1) * 24);
    let x = (S - total) / 2;
    for (const c of chips) {
      const w = ctx.measureText(c).width + 64;
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      roundRect(ctx, x, 880, w, 84, 42);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(c, x + w / 2, 936);
      x += w + 24;
    }

    // watermark
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '600 38px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillText('chinesebabypredictor.com', S / 2, 1030);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
    if (!blob) return;
    const file = new File([blob], `chinese-baby-predictor-${result.gender}.png`, { type: 'image/png' });
    // Web Share API (Instagram Stories / TikTok / WhatsApp all accept files)
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Chinese Baby Predictor' }); return; } catch { /* dismissed */ }
    }
    // fallback: download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    setCardMsg(true);
    window.setTimeout(() => setCardMsg(false), 2200);
  }, [result]);

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
  const isPlan = tab === 'plan';
  const resultGender: 'boy' | 'girl' | null = result ? result.gender : isPlan ? want : null;

  return (
    <div className="calculator-card relative overflow-hidden" id="calculator">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-transparent to-boy-400/15"
        aria-hidden="true"
      />

      <form
        onSubmit={(e) => (isPlan ? plan(e) : predict(e))}
        className="relative p-6 sm:p-8"
        noValidate
      >
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        {/* Top-level mode switcher — Predict (Mode A) vs Plan (Mode B) */}
        <div>
          <p className="mb-2.5 flex items-center gap-2 font-display text-base font-extrabold text-plum-900">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-girl-500 to-boy-500"></span>
            {strings.modeHeading}
          </p>
          <div role="tablist" aria-label={strings.modeHeading} className="grid grid-cols-2">
            {(
              [
                { id: 'predict', label: strings.topPredict },
                { id: 'plan', label: strings.topPlan },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => {
                  setTab(t.id);
                  setResult(null);
                  setError(null);
                }}
                className={`focusable w-full rounded-2xl px-3 py-2.5 text-sm font-bold transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-plum-800 to-plum-600 text-white shadow-[0_10px_20px_-8px_rgba(122,47,136,.55)]'
                    : 'bg-cream-100 text-plum-600 ring-1 ring-cream-200 hover:bg-girl-100 hover:text-plum-800'
                }`}
              >
                {t.id === 'predict' ? '🔮 ' : '🗓️ '}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode A: which "event" input the mother knows */}
        {!isPlan && (
          <div className="mt-4">
            <div role="tablist" aria-label={strings.eventHint} className="grid gap-1.5 sm:grid-cols-3">
              {(
                [
                  { id: 'conception', label: strings.modeConception },
                  { id: 'due', label: strings.modeDue },
                  { id: 'lmp', label: strings.modeLmp },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.id}
                  onClick={() => {
                    setMode(m.id);
                    setResult(null);
                  }}
                  className={`focusable w-full rounded-full px-3 py-2 text-xs font-bold transition-all sm:text-sm ${
                    mode === m.id
                      ? 'bg-gradient-to-r from-plum-800 to-plum-600 text-white shadow-[0_10px_20px_-8px_rgba(122,47,136,.55)]'
                      : 'bg-cream-100 text-plum-600 ring-1 ring-cream-200 hover:bg-girl-100 hover:text-plum-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Inputs */}
        <div className="calculator-inputs mt-6">
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
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

          {!isPlan ? (
            <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
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
                aria-describedby="pred-event-hint"
              />
              <p id="pred-event-hint" className="mt-1.5 text-xs text-plum-500">{strings.eventHint}</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
              <span className="mb-1.5 block font-display text-sm font-bold text-plum-700">🧧 {strings.planWant}</span>
              <div className="grid grid-cols-2 gap-2">
                {(['boy', 'girl'] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={want === id}
                    onClick={() => setWant(id)}
                    className={`focusable rounded-2xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-all ${
                      want === id
                        ? id === 'boy'
                          ? 'border-boy-500 bg-boy-100 text-boy-700 shadow-[0_8px_16px_-8px_rgba(44,99,232,.6)]'
                          : 'border-girl-500 bg-girl-100 text-girl-700 shadow-[0_8px_16px_-8px_rgba(221,33,117,.6)]'
                        : 'border-cream-200 bg-white text-plum-600 hover:border-girl-300'
                    }`}
                  >
                    {id === 'boy' ? strings.planBoy : strings.planGirl}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-plum-500">{strings.planResult}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="submit" className="btn-primary text-base">
            <span aria-hidden="true">{isPlan ? '🗓️' : '✨'}</span>
            {isPlan ? strings.planCompute : strings.predict}
          </button>
          {result && (
            <button type="button" onClick={reset} className="btn-secondary">
              ↻ {strings.again}
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-plum-500">🍼 {strings.disclaimer}</p>
      </form>

      {/* Mode B output */}
      <div aria-live="polite" className={`relative ${result ? 'px-0 pb-8 sm:px-0' : 'px-0 pb-6'}`}>
        {isPlan && !result && planResult !== null && (
          <div className="mt-2 px-6 sm:px-8">
            <PlanOutput
              windows={planResult ?? []}
              want={want}
              strings={strings}
              mini={miniCalendar}
            />
          </div>
        )}

        {/* Style A result reveal */}
        {result && (
          <div className="px-6 pb-8 sm:px-8">
            <div
              className={`anim-pop relative rounded-3xl p-6 text-center shadow-lift sm:p-8 ${
                result.gender === 'boy'
                  ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white'
                  : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white'
              }`}
            >
              <p className="font-display text-sm font-bold uppercase tracking-widest opacity-90">{strings.resultHero}</p>
              <div
                className="mt-4 flex items-end justify-center gap-2 sm:gap-3"
                role="img"
                aria-label={result.gender === 'boy' ? 'a boy' : 'a girl'}
              >
                <BabyFace gender={result.gender} className="h-24 w-24 drop-shadow-lg sm:h-28 sm:w-28" />
                <GlossyHeart tone={result.gender === 'boy' ? 'blue' : 'pink'} className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20" />
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

              {/* Phase 1.2 — transparency drawer */}
              <details className="calc-drawer group mt-6 rounded-2xl bg-white/15 text-left ring-1 ring-white/25 backdrop-blur">
                <summary
                  data-open-label={strings.hideCalc}
                  data-closed-label={strings.showCalc}
                  className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 font-display text-sm font-bold text-white marker:hidden after:content-['▸'] transition-transform after:transition-transform [&[data-open]]:after:rotate-90"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/80"></span>
                  <span className="after:content-['']">🧮 {strings.showCalc}</span>
                  <span className="calc-caret transition-transform" aria-hidden="true">▸</span>
                </summary>
                <div className="border-t border-white/25 px-4 py-4">
                  <ol className="grid gap-2.5 text-sm">
                    <li className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-plum-800">1</span>
                      <p><strong className="font-display">{strings.stepDob}:</strong> {dob} → {result.westernAge}y at conception</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-plum-800">2</span>
                      <p><strong className="font-display">{strings.stepLunar}:</strong> lunar birth year {result.lunarBirthYear} → lunar conception year {result.lunarConceptionYear} = {result.lunarAge} (虚岁)</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-plum-800">3</span>
                      <p><strong className="font-display">{strings.stepMonth}:</strong> {fmtDate(result.conception, 'en')} → lunar month {result.lunarMonth}{result.wasLeapMonth ? ' (leap month — see our Runyue guide below)' : ''}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-plum-800">4</span>
                      <p><strong className="font-display">{strings.stepCell}:</strong> row {result.lunarAge} × column {result.lunarMonth} → <strong>{result.gender === 'boy' ? 'BOY' : 'GIRL'}</strong></p>
                    </li>
                  </ol>
                </div>
              </details>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => void share()}
                  className="focusable rounded-full bg-white/25 px-4 py-2 text-sm font-bold transition hover:bg-white/40"
                >
                  {copied ? `✓ ${strings.copied}` : `🔗 ${strings.shareLink}`}
                </button>
                <button
                  type="button"
                  onClick={() => void shareCard()}
                  className="focusable rounded-full bg-white px-4 py-2 text-sm font-bold text-plum-800 shadow-soft transition hover:bg-white/90"
                >
                  {cardMsg ? `✓ ${strings.shareCardSaved}` : `📸 ${strings.shareCard}`}
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
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Mode B output block ───────────────────────── */

function PlanOutput({
  windows,
  want,
  strings,
  mini,
}: {
  windows: Array<{ lunarYear: number; month: number; isLeap: boolean; start: Date; end: Date; lunarAge: number }>;
  want: 'boy' | 'girl';
  strings: PredictorStrings;
  mini: Array<{ start: Date; label: string; overlap: boolean }>;
}) {
  return (
    <div className="anim-pop rounded-3xl bg-cream-100 p-5 ring-1 ring-cream-200 sm:p-6">
      <p className="font-display text-lg font-extrabold text-plum-900">
        {want === 'boy' ? '💙' : '💗'} {strings.planResult}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {windows.length === 0 && (
          <div className="rounded-2xl bg-white px-4 py-6 text-center font-semibold text-plum-600 sm:col-span-2">
            {strings.planNone}
          </div>
        )}
        {windows.map((w, i) => (
          <div
            key={`${w.lunarYear}-${w.month}-${w.isLeap}-${i}`}
            className={`reveal is-visible rounded-2xl p-4 text-white shadow-soft ${
              want === 'boy' ? 'bg-gradient-to-br from-boy-500 to-boy-400' : 'bg-gradient-to-br from-girl-500 to-girl-400'
            }`}
          >
            <p className="flex items-baseline justify-between font-display text-xl font-extrabold">
              <span>
                {w.start.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })} {w.start.getUTCFullYear()}
                {w.isLeap ? <span className="ml-1 text-xs font-bold opacity-80">{strings.planLeap}</span> : null}
              </span>
              <span className="text-xs font-bold opacity-85">M{w.month}</span>
            </p>
            <p className="mt-1 text-sm font-semibold opacity-95">
              {strings.planWindow}: {fmtDate(w.start, 'en')} – {fmtDate(w.end, 'en')}
            </p>
            <p className="mt-1 text-xs opacity-85">{strings.lunarAge}: {w.lunarAge}</p>
          </div>
        ))}
      </div>

      {/* 18-month mini-calendar strip */}
      <p className="mt-5 font-display text-sm font-bold text-plum-800">{strings.planMini}</p>
      <div className="mt-2 grid grid-cols-6 gap-1.5 sm:grid-cols-9">
        {mini.map((m, i) => (
          <div
            key={i}
            title={m.start.toISOString().slice(0, 7)}
            className={`grid place-items-center rounded-xl px-1 py-2 text-center text-[10px] font-bold leading-tight transition-all sm:text-xs ${
              m.overlap
                ? want === 'boy'
                  ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white shadow-soft'
                  : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white shadow-soft'
                : 'bg-white text-plum-400 ring-1 ring-cream-200'
            }`}
          >
            {m.label}
            <span className="text-[9px] opacity-80">{m.overlap ? strings.planBest : strings.planWhite}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-plum-500">💡 {strings.disclaimer}</p>
    </div>
  );
}

/** Rounded-rect helper (canvas doesn't have one on older engines). */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.fill();
}
