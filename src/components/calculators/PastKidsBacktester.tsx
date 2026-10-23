/**
 * Wave-1 Micro-Tool #2 — Multi-Child "Was It Right?" Accuracy Backtester.
 *
 * Mother's DOB entered once; up to 5 child rows (conception date or
 * birth/due date − 266 days); boy/girl/current-pregnancy toggle per row;
 * interactive scorecard with per-child verdicts + overall hit-rate banner;
 * canvas PNG "Download My Family Lunar Scorecard".
 * All strings come from `BACKTEST_STRINGS` (src/i18n/tools.ts).
 */
import { useState, useCallback, useMemo, useRef } from 'react';
import type { FormEvent } from 'react';
import { solarToLunar } from '../../utils';
import { chartGender } from '../../utils/genderChart';
import { conceptionFromDueDate } from '../../utils/gestation';
import { burstConfetti } from './confetti';
import { fmtDate, utcDate } from './ui';
import type { BacktestStrings } from '../../i18n/tools';

type Gender = 'boy' | 'girl';

interface ChildRow {
  id: number;
  mode: 'conception' | 'birth';
 conception: string;
  birth: string;
  actual: 'boy' | 'girl' | 'current';
}

interface RowReading {
  row: ChildRow;
  conception: Date;
  lunarAge: number;
  lunarMonth: number;
  isLeap: boolean;
  predicted: Gender;
}

const DAY_MS = 86_400_000;

/** Manual rounded-rect (Safari < 16 lacks ctx.roundRect). */
function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function solveRow(row: ChildRow, motherDob: string): RowReading | null {
  if (!motherDob) return null;
  const raw = row.mode === 'conception' ? row.conception : row.birth;
  if (!raw) return null;
  const mom = solarToLunar(utcDate(motherDob));
  const conception =
    row.mode === 'conception' ? utcDate(raw) : new Date(utcDate(raw).getTime() - 266 * DAY_MS);
  const cl = solarToLunar(conception);
  const age = cl.year - mom.year + 1;
  return {
    row,
    conception,
    lunarAge: age,
    lunarMonth: cl.month,
    isLeap: cl.isLeapMonth,
    predicted: chartGender(age, cl.month),
  };
}

export default function PastKidsBacktester({ strings: S, locale = 'en' }: { strings: BacktestStrings; locale?: string }) {
  const [motherDob, setMotherDob] = useState('');
  const [rows, setRows] = useState<ChildRow[]>([
    { id: 1, mode: 'birth', conception: '', birth: '', actual: 'current' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [readings, setReadings] = useState<RowReading[] | null>(null);
  const nextId = useRef(2);

  const today = new Date().toISOString().slice(0, 10);

  const update = (id: number, patch: Partial<ChildRow>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((rs) =>
      rs.length >= 5 ? rs : [...rs, { id: nextId.current++, mode: 'birth', conception: '', birth: '', actual: 'current' }],
    );

  const removeRow = (id: number) => setRows((rs) => (rs.length <= 1 ? rs : rs.filter((r) => r.id !== id)));

  const test = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!motherDob) {
        setError(S.invalidRow);
        return;
      }
      const solved = rows
        .map((r) => solveRow(r, motherDob))
        .filter((x): x is RowReading => x !== null);
      if (solved.length === 0) {
        setError(S.emptyHint);
        return;
      }
      setReadings(solved);
      const scored = solved.filter((x) => x.row.actual !== 'current');
      if (scored.length > 0) burstConfetti('girl');
    },
    [motherDob, rows, S],
  );

  /* Scorecard stats: only scored rows (actual boy/girl) count. */
  const stats = useMemo(() => {
    if (!readings) return null;
    const scored = readings.filter((x) => x.row.actual === 'boy' || x.row.actual === 'girl');
    const hits = scored.filter((x) => x.predicted === x.row.actual).length;
    const pct = scored.length > 0 ? Math.round((hits / scored.length) * 100) : 0;
    return { scored, hits, pct };
  }, [readings]);

  /* ── Family Lunar Scorecard PNG ─────────────────────────────────────── */
  const downloadScorecard = useCallback(async () => {
    if (!readings || !stats) return;
    const W = 960;
    const pad = 48;
    const headerH = 210;
    const rowH = 96;
    const H = headerH + Math.max(readings.length, 1) * rowH + 150;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#7e2f8c');
    bg.addColorStop(0.5, '#b43d8b');
    bg.addColorStop(1, '#2c63e8');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,0.94)';
    ctx.textAlign = 'center';
    ctx.font = '700 40px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillText('👶 My Family Lunar Scorecard', W / 2, 78);
    ctx.font = '500 22px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText('Chinese Baby Predictor · chinesebabypredictor.com', W / 2, 114);
    ctx.fillText(
      `${S.motherDobLabel.replace(/^[^\p{L}\p{N}]*/u, '')} ${fmtDate(utcDate(motherDob), locale)}`,
      W / 2,
      152,
    );

    readings.forEach((x, i) => {
      const y = headerH + i * rowH;
      roundRectPath(ctx, pad, y, W - pad * 2, rowH - 14, 18);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.font = '700 21px "Plus Jakarta Sans Variable", system-ui, sans-serif';
      const verdict =
        x.row.actual === 'current'
          ? `${x.predicted === 'boy' ? '💙' : '💗'} ${S.predict}`
          : x.predicted === x.row.actual
            ? `✅ ${S.match.replace(/^[^\p{L}]*/u, '')}`
            : `❌ ${S.miss.replace(/^[^\p{L}]*/u, '')}`;
      ctx.fillText(
        `${S.childWord} ${i + 1} — ${S.lunarAgeWord} ${x.lunarAge} × M${x.lunarMonth}${x.isLeap ? '*' : ''} → ${x.predicted === 'boy' ? 'BOY' : 'GIRL'}`,
        pad + 22,
        y + 38,
      );
      ctx.font = '500 18px "Plus Jakarta Sans Variable", system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.fillText(
        `${fmtDate(x.conception, locale)}   ·   ${verdict}`,
        pad + 22,
        y + 68,
      );
    });

    // hit-rate banner
    const by = headerH + readings.length * rowH + 26;
    if (stats.scored.length > 0) {
      ctx.textAlign = 'center';
      ctx.font = '800 30px "Fredoka Variable", "Plus Jakarta Sans Variable", system-ui, sans-serif';
      ctx.fillStyle = '#ffe14d';
      ctx.fillText(S.hitScore(stats.hits, stats.scored.length, stats.pct), W / 2, by + 34);
    }
    ctx.font = '600 17px "Plus Jakarta Sans Variable", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.textAlign = 'center';
    ctx.fillText(S.disclaimer, W / 2, H - 36);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-family-lunar-scorecard.png';
    a.click();
    URL.revokeObjectURL(url);
  }, [readings, stats, motherDob, locale, S]);

  /* "Child 1" style row labels from the dictionary. */
  const rowLabel = (i: number) => `${S.childWord} ${i + 1}`;

  return (
    <div className="calculator-card relative overflow-hidden" id="backtest-calculator">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-girl-400/15 via-transparent to-boy-400/15" aria-hidden="true" />

      <form onSubmit={test} className="relative p-6 sm:p-8" noValidate>
        {error && (
          <p role="alert" className="anim-pop mb-4 rounded-2xl bg-girl-50 px-4 py-3 text-sm font-semibold text-girl-700 ring-1 ring-girl-200">
            ⚠️ {error}
          </p>
        )}

        {/* Step 1 — mother's DOB */}
        <div className="rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
          <label htmlFor="bt-mother-dob" className="mb-1.5 block font-display text-base font-extrabold text-plum-900">
            {S.motherHeading}
          </label>
          <label htmlFor="bt-mother-dob" className="mb-1.5 block font-display text-sm font-bold text-plum-700">
            {S.motherDobLabel}
          </label>
          <input
            id="bt-mother-dob" type="date" required autoComplete="bday"
            min="1930-01-01" max={today} value={motherDob}
            onChange={(e) => setMotherDob(e.target.value)}
            className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
            aria-describedby="bt-mother-hint"
          />
          <p id="bt-mother-hint" className="mt-1.5 text-xs text-plum-500">{S.motherDobHint}</p>
        </div>

        {/* Step 2 — child rows */}
        <div className="mt-6">
          <p className="mb-3 flex items-center justify-between font-display text-base font-extrabold text-plum-900">
            <span>{S.childHeading}</span>
            <button type="button" onClick={() => setRows([{ id: 1, mode: 'birth', conception: '', birth: '', actual: 'current' }])}
                    className="focusable text-xs font-bold text-plum-400 underline decoration-dotted hover:text-girl-600">
              {S.removeAll}
            </button>
          </p>

          {rows.map((r, i) => (
            <div key={r.id} className="mt-3 rounded-3xl bg-white/55 p-4 shadow-sm ring-1 ring-white/70 transition-colors hover:bg-white/75">
              <p className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-plum-700">{rowLabel(i)}</span>
                {rows.length > 1 && (
                  <button type="button" onClick={() => removeRow(r.id)}
                          className="focusable rounded-full px-2.5 py-1 text-xs font-bold text-plum-400 transition-colors hover:bg-girl-100 hover:text-girl-700">
                    ✕ {S.remove}
                  </button>
                )}
              </p>

              {/* input mode */}
              <div className="grid grid-cols-2 gap-2" role="group" aria-label={S.modeLabel}>
                {(['birth', 'conception'] as const).map((m) => (
                  <button
                    key={m} type="button" aria-pressed={r.mode === m}
                    onClick={() => update(r.id, { mode: m })}
                    className={`focusable rounded-2xl border-2 px-3 py-2 text-xs font-bold transition-all ${
                      r.mode === m
                        ? 'border-plum-500 bg-plum-100 text-plum-800'
                        : 'border-cream-200 bg-white text-plum-500 hover:border-girl-300'
                    }`}
                  >
                    {m === 'conception' ? S.modeConception : S.modeChildBirth}
                  </button>
                ))}
              </div>

              <div className="mt-2.5">
                {r.mode === 'conception' ? (
                  <label htmlFor={`bt-date-${r.id}`} className="sr-only">{S.conceptionLabel}</label>
                ) : (
                  <label htmlFor={`bt-date-${r.id}`} className="sr-only">{S.childBirthLabel}</label>
                )}
                <input
                  id={`bt-date-${r.id}`} type="date"
                  min="1940-01-01" max={today}
                  value={r.mode === 'conception' ? r.conception : r.birth}
                  onChange={(e) => update(r.id, r.mode === 'conception' ? { conception: e.target.value } : { birth: e.target.value })}
                  className="focusable w-full rounded-2xl border-2 border-cream-200 bg-white px-4 py-3 text-plum-800 shadow-sm transition-colors hover:border-girl-300 [color-scheme:light]"
                />
                {r.mode === 'birth' && <p className="mt-1.5 text-xs text-plum-500">{S.childBirthHint}</p>}
              </div>

              {/* actual gender toggle */}
              <div className="mt-2.5" role="radiogroup" aria-label={S.actualLabel}>
                <span className="mb-1 block text-xs font-bold text-plum-600">{S.actualLabel}</span>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: 'boy', label: S.wasBoy },
                    { v: 'girl', label: S.wasGirl },
                    { v: 'current', label: S.currentPregnancy },
                  ] as const).map(({ v, label }) => (
                    <button
                      key={v} type="button" role="radio" aria-checked={r.actual === v}
                      onClick={() => update(r.id, { actual: v })}
                      className={`focusable rounded-2xl border-2 px-2 py-2 text-xs font-bold transition-all ${
                        r.actual === v
                          ? v === 'boy'
                            ? 'border-boy-500 bg-boy-100 text-boy-700'
                            : v === 'girl'
                              ? 'border-girl-500 bg-girl-100 text-girl-700'
                              : 'border-plum-500 bg-plum-100 text-plum-800'
                          : 'border-cream-200 bg-white text-plum-500 hover:border-girl-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {r.actual === 'current' && (
                  <p className="mt-1.5 text-xs font-semibold text-plum-500">💡 {S.currentHint}</p>
                )}
              </div>
            </div>
          ))}

          {rows.length < 5 && (
            <button
              type="button" onClick={addRow}
              className="focusable mt-3 w-full rounded-2xl border-2 border-dashed border-cream-300 bg-white/60 px-4 py-3 font-display text-sm font-bold text-plum-600 transition-all hover:border-girl-400 hover:bg-girl-50 hover:text-girl-700"
            >
              {S.add}
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="submit" className="btn-primary text-base">{S.test}</button>
          {readings && (
            <button type="button" onClick={() => { setReadings(null); setError(null); }} className="btn-secondary">
              {S.reset}
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-plum-500">🎲 {S.disclaimer}</p>
      </form>

      {/* Scorecard output */}
      {readings && stats && (
        <div className="px-6 pb-8 sm:px-8" aria-live="polite">
          {/* per-child table */}
          <div className="overflow-hidden rounded-3xl ring-1 ring-cream-200">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-cream-100 text-left font-display text-xs font-extrabold uppercase tracking-wide text-plum-600">
                  <th className="px-3 py-2.5">{S.rowPrediction}</th>
                  <th className="px-3 py-2.5">{S.rowActual}</th>
                  <th className="px-3 py-2.5">{S.rowVerdict}</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((x, i) => (
                  <tr key={x.row.id} className={i % 2 ? 'bg-cream-50' : 'bg-white'}>
                    <td className="px-3 py-3 font-semibold text-plum-800">
                      {rowLabel(i)} · {S.lunarAgeWord} {x.lunarAge} × M{x.lunarMonth}{x.isLeap ? '*' : ''} →{' '}
                      <strong>{x.predicted === 'boy' ? '💙' : '💗'}</strong>
                      <span className="block text-xs text-plum-400">{fmtDate(x.conception, locale)}</span>
                    </td>
                    <td className="px-3 py-3 font-semibold text-plum-700">
                      {x.row.actual === 'boy' ? '👦' : x.row.actual === 'girl' ? '👧' : '🤰'}
                    </td>
                    <td className="px-3 py-3 font-bold">
                      {x.row.actual === 'current' ? (
                        <span className="text-plum-600">{S.predict} {x.predicted === 'boy' ? '💙 BOY' : '💗 GIRL'}</span>
                      ) : x.predicted === x.row.actual ? (
                        <span className="text-emerald-600">{S.match}</span>
                      ) : (
                        <span className="text-girl-600">{S.miss}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* hit-rate banner */}
          {stats.scored.length > 0 && (
            <div className={`anim-pop mt-4 rounded-3xl p-5 text-center text-white shadow-lift ${
              stats.pct >= 80 ? 'bg-gradient-to-br from-emerald-500 to-emerald-400'
                : stats.pct >= 50 ? 'bg-gradient-to-br from-plum-700 to-plum-500'
                  : 'bg-gradient-to-br from-girl-500 to-girl-400'
            }`}>
              <p className="font-display text-xl font-extrabold sm:text-2xl">
                {stats.pct >= 99 ? '🌟' : '📊'} {S.hitScore(stats.hits, stats.scored.length, stats.pct)}
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm font-medium opacity-95">
                {stats.hits === stats.scored.length ? S.perfectLine : S.mixedLine}
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <button type="button" onClick={downloadScorecard} className="btn-primary">
              {S.scorecardButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
