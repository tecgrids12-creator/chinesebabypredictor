/** Client microcopy + formatting helpers used by the calculator islands. */

export function fmtDate(d: Date, locale: string): string {
  try {
    return d.toLocaleDateString(locale === 'en' ? 'en-US' : locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export function utcDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

/** Debounce util (300 ms) for heavy recharts/recomputes. */
export function debounce<T extends (...args: never[]) => void>(fn: T, ms = 300): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
