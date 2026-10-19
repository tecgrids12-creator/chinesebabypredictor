/** One-time OG image generator: renders a branded 1200x630 PNG via sharp. */
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF7F3"/>
      <stop offset="1" stop-color="#FDF2F8"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#dd2175"/>
      <stop offset="1" stop-color="#2c63e8"/>
    </linearGradient>
    <radialGradient id="skin" cx="0.4" cy="0.3" r="0.9">
      <stop stop-color="#FFF8EC"/>
      <stop offset="0.62" stop-color="#FCE3C2"/>
      <stop offset="1" stop-color="#F5C795"/>
    </radialGradient>
    <radialGradient id="shade" cx="0.5" cy="0.28" r="0.75">
      <stop offset="0.55" stop-color="#E8A163" stop-opacity="0"/>
      <stop offset="1" stop-color="#E8A163" stop-opacity="0.4"/>
    </radialGradient>
    <linearGradient id="heart" x1="9" y1="6" x2="86" y2="88" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F981BC"/>
      <stop offset="1" stop-color="#E13489"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="220" fill="#FCE7F3" opacity="0.8"/>
  <circle cx="150" cy="560" r="180" fill="#DBEAFE" opacity="0.7"/>
  <text x="90" y="140" font-family="Segoe UI, Arial" font-size="42" font-weight="700" fill="#97124b">chinesebabypredictor.com</text>
  <text x="90" y="300" font-family="Segoe UI, Arial" font-size="88" font-weight="800" fill="#45024f">Is your baby a boy</text>
  <text x="90" y="395" font-family="Segoe UI, Arial" font-size="88" font-weight="800" fill="url(#accent)">or a girl?</text>
  <text x="90" y="470" font-family="Segoe UI, Arial" font-size="34" fill="#a47fae">The 700-year-old lunar chart — with real lunar-calendar conversion.</text>
  <text x="90" y="540" font-family="Segoe UI, Arial" font-size="30" font-weight="600" fill="#6b7280">Free · No sign-up · Instant result</text>
  <rect x="850" y="180" width="260" height="260" rx="70" fill="url(#accent)"/>
  <g transform="translate(848 178) scale(2.2)">
    <circle cx="18" cy="66" r="9" fill="#F5C795"/>
    <circle cx="102" cy="66" r="9" fill="#F5C795"/>
    <circle cx="60" cy="64" r="42" fill="url(#skin)"/>
    <circle cx="60" cy="64" r="42" fill="url(#shade)"/>
    <path d="M57 23 c1.5 -7.5 10.5 -8 12.5 -3 c1.4 3.6 -2.4 6.6 -5.6 4.8" stroke="#D89A5E" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M40 50 q6 -4.5 12 -1" stroke="#C98A4B" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M68 49 q6 -3.5 12 1" stroke="#C98A4B" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <circle cx="45" cy="60" r="6.4" fill="#2E1A33"/>
    <circle cx="75" cy="60" r="6.4" fill="#2E1A33"/>
    <circle cx="47.2" cy="57.8" r="2.2" fill="#fff"/>
    <circle cx="77.2" cy="57.8" r="2.2" fill="#fff"/>
    <ellipse cx="34.5" cy="72" rx="6.4" ry="4.6" fill="#F8A9C4" opacity="0.85"/>
    <ellipse cx="85.5" cy="72" rx="6.4" ry="4.6" fill="#F8A9C4" opacity="0.85"/>
    <path d="M46 77 q14 13 28 0 q-4 12.5 -14 12.5 q-10 0 -14 -12.5 Z" fill="#5E2A38"/>
    <path d="M51.5 85.5 q8.5 5.5 17 0 q-3 4.9 -8.5 4.9 q-5.5 0 -8.5 -4.9 Z" fill="#F27D95"/>
  </g>
  <g transform="translate(1048 340) scale(1.15)">
    <path d="M50 88 C 21 66, 6 46, 13.5 29 C 19 16.5, 35.5 14, 46 23.5 L 50 27.5 L 54 23.5 C 64.5 14, 81 16.5, 86.5 29 C 94 46, 79 66, 50 88 Z" fill="url(#heart)"/>
    <path d="M50 88 C 21 66, 6 46, 13.5 29 C 19 16.5, 35.5 14, 46 23.5 L 50 27.5 L 54 23.5 C 64.5 14, 81 16.5, 86.5 29 C 94 46, 79 66, 50 88 Z" fill="#A31058" transform="translate(21.5 19) scale(0.57)"/>
    <ellipse cx="31" cy="27" rx="12" ry="7.5" fill="#fff" opacity="0.7" transform="rotate(-28 31 27)"/>
  </g>
  <path d="M1058 200 l5.6 16.4 16.4 5.6 -16.4 5.6 -5.6 16.4 -5.6 -16.4 -16.4 -5.6 16.4 -5.6 Z" fill="#fff"/>
</svg>`;

mkdirSync('public', { recursive: true });
const out = 'public/og-default.png';
await sharp(Buffer.from(svg)).png().toFile(out);
const kb = Math.round(readFileSync(out).length / 1024);
console.log(`og-default.png written (${kb} KB)`);
