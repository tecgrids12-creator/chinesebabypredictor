/**
 * Tiny dependency-free confetti — spawns absolutely-positioned spans that
 * fall with CSS keyframes. Respects prefers-reduced-motion.
 */
export function burstConfetti(theme: 'boy' | 'girl'): void {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = theme === 'girl'
    ? ['#dd2175', '#f77fb6', '#fbbf24', '#fda4af', '#fdf2f8']
    : ['#2c63e8', '#7ea9f9', '#fbbf24', '#7dd3fc', '#eff6ff'];

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
      `background:${colors[i % colors.length] ?? '#ee5a97'}`,
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

/**
 * Mini celebratory burst anchored at a point (e.g. under a main button):
 * pieces fly outward in all directions and fade. Respects reduced motion.
 */
export function celebrateAt(x: number, y: number, count = 26): void {
  if (typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = ['#dd2175', '#ee5a97', '#2c63e8', '#4b82f2', '#fbbf24', '#ffffff'];
  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:80;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'celebrate-piece';
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const dist = 46 + Math.random() * 64;
    const dur = 0.7 + Math.random() * 0.5;
    const size = 5 + Math.random() * 5;
    piece.style.cssText = [
      `left:${x - size / 2}px`,
      `top:${y - size / 2}px`,
      `width:${size}px`,
      `height:${size * (1.2 + Math.random() * 0.6)}px`,
      `background:${colors[i % colors.length]}`,
      `--dx:${Math.cos(angle) * dist}px`,
      `--dy:${Math.sin(angle) * dist - 14}px`,
      `--rot:${(Math.random() - 0.5) * 480}deg`,
      `--dur:${dur}s`,
      `animation-delay:${Math.random() * 0.08}s`,
    ].join(';');
    container.appendChild(piece);
  }

  window.setTimeout(() => container.remove(), 1400);
}
