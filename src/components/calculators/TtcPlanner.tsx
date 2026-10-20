import { useState, useMemo, useCallback } from 'react';
import type { FormEvent } from 'react';
import { planWindows, type LunarWindow } from '../../utils/planner';
import { chartGender, type Gender } from '../../utils/genderChart';
import { solarToLunar, zodiacFromLunarYear, zodiacEmoji, lunarNewYear, monthsDays, leapMonthDays } from '../../utils/lunar';
import { fmtDate, utcDate } from './ui';

const MS_PER_DAY = 86_400_000;

export interface TtcStrings {
  dobLabel: string; dobHint: string; ageNow: string; ageInYear: string;
  wantLabel: string; boyLabel: string; girlLabel: string; bothLabel: string;
  yearLabel: string; compute: string; again: string;
  headline: string; optimalBoy: string; optimalGirl: string;
  lunarMonth: string; lunarAgeLabel: string; windowLabel: string;
  turnsOlder: string; leapFirstHalf: string; leapSecondHalf: string;
  skipLabel: string; none: string; legend: string; newLunarYear: string;
  save: string; saved: string; print: string; footnote: string;
  invalid: string; matrixNote: string;
}

export type Want = 'boy' | 'girl' | 'both';

/** One renderable card: a lunar month window (leap months split per half-month rule). */
interface PlanCard {
  start: Date;
  end: Date;
  lunarYear: number;
  animal: string;
  emoji: string;
  lunarAge: number;
  month: number;
  isLeap: boolean;
  split: 'first' | 'second' | null;
  gender: Gender;
}

/** Apply the traditional half-month rule: leap-month days 1–15 → month N, 16+ → N+1. */
function expandWindows(windows: LunarWindow[], birthLunarYear: number): PlanCard[] {
  const cards: PlanCard[] = [];
  for (const w of [...windows].sort((a, b) => a.start.getTime() - b.start.getTime())) {
    const animal = zodiacFromLunarYear(w.lunarYear);
    const emoji = zodiacEmoji(animal);
    if (w.isLeap) {
      // half-month rule: first half (days 1-15) → month N, second half → N+1
      const mid = new Date(w.start.getTime() + 14 * MS_PER_DAY); // day 15
      const secondStart = new Date(mid.getTime() + 1 * MS_PER_DAY);
      const lunarAge = w.lunarYear - birthLunarYear + 1;
      cards.push({ start: w.start, end: mid, lunarYear: w.lunarYear, animal, emoji, lunarAge, month: w.month, isLeap: true, split: 'first', gender: chartGender(lunarAge, w.month) });
      cards.push({ start: secondStart, end: w.end, lunarYear: w.lunarYear, animal, emoji, lunarAge, month: w.month + 1 <= 12 ? w.month + 1 : 12, isLeap: false, split: 'second', gender: chartGender(lunarAge, w.month + 1 <= 12 ? w.month + 1 : 12) });
    } else {
      const lunarAge = w.lunarYear - birthLunarYear + 1;
      cards.push({ start: w.start, end: w.end, lunarYear: w.lunarYear, animal, emoji, lunarAge, month: w.month, isLeap: false, split: null, gender: w.gender });
    }
  }
  return cards;
}

export default function TtcPlanner({ strings }: { strings: TtcStrings }) {  const [dob, setDob] = useState('');
  const [want, setWant] = useState<Want>('both');
  const [year, setYear] = useState(new Date().getUTCFullYear() === 2026 ? 2026 : new Date().getUTCFullYear() + 1);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const birth = useMemo(() => (dob ? utcDate(dob) : null), [dob]);
  const today = new Date().toISOString().slice(0, 10);

  /* live lunar age display */
  const ageInfo = useMemo(() => {
    if (!birth) return null;
    try {
      const b = solarToLunar(birth);
      const nowLunar = solarToLunar(new Date());
      const ageNow = nowLunar.year - b.year + 1;
      const yearCNY = lunarNewYear(year);
      const ageInyear = year ? year - b.year + 1 : null;
      return { ageNow, zodiac: b.zodiac, emoji: b.zodiacEmoji, yearCNY, ageInyear };
    } catch {
      return null;
    }
  }, [birth, year]);

  /* full-year windows, then leap-half split */
  const cards = useMemo<PlanCard[] | null>(() => {
    if (!birth || !showCards) return null;
    try {
      const all = [...planWindows(birth, year, 'boy'), ...planWindows(birth, year, 'girl')];
      const expanded = expandWindows(all, solarToLunar(birth).year);
      // keep only windows overlapping the Gregorian plan year (leap splits may drift)
      return expanded.filter((c) => c.start.getUTCFullYear() >= year - 1 && c.end.getUTCFullYear() <= year + 1)
        .filter((c) => c.start.getTime() < Date.UTC(year + 1, 0, 1) && c.end.getTime() >= Date.UTC(year, 0, 1));
    } catch {
      return null;
    }
  }, [birth, year, showCards]);

  const matched = useMemo(() => (cards ?? []).filter((c) => want === 'both' || c.gender === want).length, [cards, want]);

  const compute = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault?.();
      if (!dob) {
        setError(strings.invalid);
        return;
      }
      setError(null);
      setShowCards(true);
    },
    [dob, strings],
  );

  /* ── Save-as-PNG card (Pinterest / camera roll) ─────────────────────── */
  const saveCard = useCallback(async () => {
    if (!cards) return;
    const W = 1080;
    const H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#45024F');
    bg.addColorStop(0.6, '#6D2A70');
    bg.addColorStop(1, '#57175F');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.arc(W * 0.9, H * 0.08, 280, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(W * 0.1, H * 0.95, 320, 0, Math.PI * 2); ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '700 50px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillText('👶 Chinese Baby Predictor — TTC Planner', W / 2, 100);
    const wantLabel = want === 'boy' ? '💙 Planning a BOY' : want === 'girl' ? '💖 Planning a GIRL' : '🌟 Full-year overview';
    ctx.font = '800 72px "Fredoka Variable", system-ui, sans-serif';
    ctx.fillText(`${year} · ${wantLabel}`, W / 2, 220);
    ctx.font = '600 38px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(`Mother's lunar age at conception: ${ageInfo?.ageNow ?? '?'}+ (虚岁)`, W / 2, 300);

    // favourite month badges grid (up to 14 rows)
    const rows = cards.filter((c) => want === 'both' || c.gender === want).slice(0, 14);
    const startY = 380;
    const rowH = 62;
    let y = startY;
    ctx.font = '700 36px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    for (const c of rows) {
      const label = `${c.start.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })} ${c.start.getUTCFullYear()} · ${stringsOptimal(c.gender)} · LM ${c.month}${c.isLeap ? '*' : ''}`;
      const wTxt = ctx.measureText(label).width + 56;
      const x = (W - wTxt) / 2;
      ctx.fillStyle = c.gender === 'boy' ? 'rgba(44,99,232,0.35)' : 'rgba(221,33,117,0.35)';
      rr(ctx, x, y, wTxt, 50, 25);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, W / 2, y + 34);
      y += rowH;
    }

    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '600 34px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillText('Folk tradition for fun — nature stays 50/50 · chinesebabypredictor.com', W / 2, H - 60);

    function stringsOptimal(g: Gender) {
      return g === 'boy' ? 'OPTIMAL FOR BOY' : 'OPTIMAL FOR GIRL';
    }

    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png', 0.95));
    if (!blob) return;
    const file = new File([blob], `ttc-planner-${year}-${want}.png`, { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Chinese gender planner (TTC)' }); return; } catch { /* dismissed */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }, [cards, want, year, ageInfo]);

  return (
    <div className="calculator-card relative overflow-hidden backdrop-blur-md" id="ttc-planner">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-plum-400/10 to-boy-400/15" aria-hidden="true" />

      <form onSubmit={(e) => { e.preventDefault(); compute(e); }} className="relative p-6 sm:p-8" noValidate>
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">⚠️ {error}</p>
        )}

        {/* live lunar age readout */}
        <p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-plum-700">
          {ageInfo ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-girl-50 px-3 py-1 ring-1 ring-girl-200">
                🎂 {strings.ageNow}: <strong>{ageInfo.ageNow}</strong> 虚岁 · {ageInfo.emoji} {ageInfo.zodiac}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 ring-1 ring-cream-200">
                🗓️ {strings.ageInYear} {year}: <strong>{ageInfo.ageInyear}</strong>
              </span>
            </>
          ) : (
            <span className="text-plum-500">{strings.dobHint}</span>
          )}
        </p>

        <div className="calculator-inputs">
          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <label htmlFor="ttc-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">🎂 {strings.dobLabel}</label>
            <input
              id="ttc-dob"
              type="date"
              required autoComplete="bday" min="1930-01-01" max={today}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
            />
          </div>

          <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
            <span className="mb-1.5 block font-display text-sm font-bold text-plum-700">🧿 {strings.wantLabel}</span>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label={strings.wantLabel}>
              {(
                [
                  { id: 'boy', label: strings.boyLabel, on: 'border-boy-500 bg-boy-100 text-boy-700 shadow-[0_10px_22px_-8px_rgba(44,99,232,.65)]' },
                  { id: 'girl', label: strings.girlLabel, on: 'border-girl-500 bg-girl-100 text-girl-700 shadow-[0_10px_22px_-8px_rgba(221,33,117,.65)]' },
                  { id: 'both', label: strings.bothLabel, on: 'border-plum-600 bg-cream-100 text-plum-800 shadow-[0_10px_22px_-8px_rgba(122,47,136,.6)]' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={want === opt.id}
                  onClick={() => setWant(opt.id)}
                  className={`focusable rounded-2xl border-2 px-2 py-2.5 font-display text-xs font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 sm:text-sm ${
                    want === opt.id ? opt.on : 'border-cream-200 bg-white text-plum-600 hover:border-girl-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* year pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-display text-sm font-bold text-plum-700">{strings.yearLabel}</span>
          {[2026, 2027, 2028].map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={year === y}
              onClick={() => setYear(y)}
              className={`focusable rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                year === y ? 'bg-gradient-to-r from-plum-800 to-plum-600 text-white shadow-[0_8px_18px_-8px_rgba(122,47,136,.6)]' : 'bg-cream-100 text-plum-600 ring-1 ring-cream-200 hover:bg-girl-100'
              }`}
            >
              {y}
            </button>
          ))}
          <button type="submit" className="btn-primary ml-auto text-base">
            <span aria-hidden="true">{want === 'both' ? '🌟' : '🗓️'}</span> {strings.compute}
          </button>
        </div>
      </form>

      {/* cards grid */}
      <div aria-live="polite" className="relative px-6 pb-8 sm:px-8">
        {cards && (
          <div className="anim-pop mt-2">
            <p className="font-display text-lg font-extrabold text-plum-900">
              {strings.headline} {year} · {matched} {want === 'both' ? '' : '★'}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c, i) => {
                const match = want === 'both' || c.gender === want;
                return (
                  <div
                    key={`${c.start.getTime()}-${c.month}-${i}`}
                    className={`reveal is-visible relative rounded-2xl p-4 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift ${
                      match
                        ? c.gender === 'boy'
                          ? 'bg-gradient-to-br from-boy-500 to-boy-400 text-white shadow-soft ring-2 ring-boy-300/60'
                          : 'bg-gradient-to-br from-girl-500 to-girl-400 text-white shadow-soft ring-2 ring-girl-300/60'
                        : 'bg-white/70 text-plum-500 ring-1 ring-cream-200 opacity-70'
                    }`}
                  >
                    <p className="flex items-baseline justify-between font-display text-xl font-extrabold">
                      <span>{c.start.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })} {c.start.getUTCFullYear()}</span>
                      <span className="text-[11px] font-bold opacity-85">{c.emoji}</span>
                    </p>
                    <p className="mt-0.5 text-sm font-semibold opacity-95">
                      {strings.lunarMonth} {c.month}{c.isLeap ? '*' : ''}{c.split === 'first' ? ` · ${strings.leapFirstHalf}` : c.split === 'second' ? ` · ${strings.leapSecondHalf}` : ''} · {c.lunarYear} {c.animal} year
                    </p>
                    <p className="mt-0.5 text-xs opacity-85">
                      {strings.lunarAgeLabel}: <strong>{c.lunarAge}</strong> 虚岁 · {strings.windowLabel} {fmtDate(c.start, 'en')} – {fmtDate(c.end, 'en')}
                    </p>
                    <p
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide ${
                        match
                          ? c.gender === 'boy' ? 'bg-white/25 text-white ring-1 ring-white/40' : 'bg-white/25 text-white ring-1 ring-white/40'
                          : 'bg-cream-100 text-plum-500 ring-1 ring-cream-200'
                      }`}
                    >
                      {match ? (c.gender === 'boy' ? `💙 ${strings.optimalBoy}` : `💖 ${strings.optimalGirl}`) : `⏸ ${strings.skipLabel}`}
                    </p>
                    {c.split === 'first' && <span className="absolute -top-2 -right-2 rounded-full bg-plum-800 px-2 py-0.5 text-[10px] font-bold text-white shadow-soft">leap ½</span>}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button type="button" onClick={() => void saveCard()} className="focusable rounded-full bg-plum-800 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_20px_-8px_rgba(69,2,79,.6)] transition hover:-translate-y-0.5">
                {saved ? `✓ ${strings.saved}` : `💾 ${strings.save}`}
              </button>
              <button type="button" onClick={() => window.print()} className="focusable rounded-full border-2 border-girl-200 bg-white px-4 py-2 text-sm font-bold text-girl-600 transition hover:-translate-y-0.5 hover:border-girl-400">
                🖨 {strings.print}
              </button>
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-plum-500">
              {strings.matrixNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Rounded-rect path helper (canvas-safe across engines). */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}
