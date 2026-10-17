/**
 * Tiny dependency-free confetti — spawns absolutely-positioned spans that
 * fall with CSS keyframes. Respects prefers-reduced-motion.
 */
export function burstConfetti(theme: 'boy' | 'girl'): void {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = theme === 'girl'
    ? ['#ec4899', '#f9a8d4', '#fbbf24', '#fda4af', '#fdf2f8']
    : ['#3b82f6', '#93c5fd', '#fbbf24', '#7dd3fc', '#eff6ff'];

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:70;overflow:hidden;';
  document.body.appendChild(container);

  const pieces = 80;
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const left = Math.random() * 100;
    const dur = 2.4 + Math.random() * 1.8;
    const delay = Math.random() * 0.25;
    piece.style.cssText = [
      `left:${left}vw`,
      `background:${colors[i % colors.length] ?? '#f472b6'}`,
      `--cx:${(Math.random() - 0.5) * 12}vw`,
      `--dur:${dur}s`,
      `animation-delay:${delay}s`,
      `width:6px;height:${8 + Math.random() * 8}px`,
      `opacity:${0.7 + Math.random() * 0.3}`,
    ].join(';');
    container.appendChild(piece);
  }

  window.setTimeout(() => container.remove(), 5000);
}
