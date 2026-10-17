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
      <stop offset="0" stop-color="#EC4899"/>
      <stop offset="1" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="220" fill="#FCE7F3" opacity="0.8"/>
  <circle cx="150" cy="560" r="180" fill="#DBEAFE" opacity="0.7"/>
  <text x="90" y="140" font-family="Segoe UI, Arial" font-size="42" font-weight="700" fill="#be185d">chinesebabypredictor.com</text>
  <text x="90" y="300" font-family="Segoe UI, Arial" font-size="88" font-weight="800" fill="#2b1830">Is your baby a boy</text>
  <text x="90" y="395" font-family="Segoe UI, Arial" font-size="88" font-weight="800" fill="url(#accent)">or a girl?</text>
  <text x="90" y="470" font-family="Segoe UI, Arial" font-size="34" fill="#5e3a64">The 700-year-old lunar chart — with real lunar-calendar conversion.</text>
  <text x="90" y="540" font-family="Segoe UI, Arial" font-size="30" font-weight="600" fill="#6b7280">Free · No sign-up · Instant result</text>
  <rect x="850" y="180" width="260" height="260" rx="70" fill="url(#accent)"/>
  <circle cx="980" cy="290" r="62" fill="#fff"/>
  <circle cx="958" cy="282" r="9" fill="#38203c"/>
  <circle cx="1002" cy="282" r="9" fill="#38203c"/>
  <path d="M955 312 q22 16 46 -2" stroke="#38203c" stroke-width="7" fill="none" stroke-linecap="round"/>
</svg>`;

mkdirSync('public', { recursive: true });
const out = 'public/og-default.png';
await sharp(Buffer.from(svg)).png().toFile(out);
const kb = Math.round(readFileSync(out).length / 1024);
console.log(`og-default.png written (${kb} KB)`);
