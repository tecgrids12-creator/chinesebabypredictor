/**
 * Branded vector art: cute flat-style sitting babies (boy / girl, modeled on
 * classic clipart), a glossy 3D heart, an emoji-style 3D baby face and a
 * minimal face icon for chart cells. All React SVG — no emoji.
 * `useId()` keeps gradient defs unique per instance.
 */
import { useId } from 'react';

/* ── Full sitting baby (like the reference clipart) ───────────────────────── */

export function BabyBoy({ className = '' }: { className?: string }) {
  return <SittingBaby gender="boy" className={className} />;
}

export function BabyGirl({ className = '' }: { className?: string }) {
  return <SittingBaby gender="girl" className={className} />;
}

/* shared heart silhouette (used at many scales) */
const HEART_D =
  'M50 88 C 21 66, 6 46, 13.5 29 C 19 16.5, 35.5 14, 46 23.5 L 50 27.5 L 54 23.5 C 64.5 14, 81 16.5, 86.5 29 C 94 46, 79 66, 50 88 Z';

function HeartMini({ transform, fill }: { transform?: string; fill: string }) {
  return <path d={HEART_D} transform={transform} fill={fill} />;
}

function SittingBaby({ gender, className = '' }: { gender: 'boy' | 'girl'; className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const skin = `skin-${uid}`;
  const skinDark = `skinDark-${uid}`;
  const bib = `bib-${uid}`;
  const pink = gender === 'girl';
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={skin} cx="0.38" cy="0.32" r="0.85">
          <stop offset="0" stopColor="#FFEDD9" />
          <stop offset="0.62" stopColor="#FCDDBC" />
          <stop offset="1" stopColor="#F6C396" />
        </radialGradient>
        <linearGradient id={skinDark} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6C396" />
          <stop offset="1" stopColor="#EFAE7B" />
        </linearGradient>
        {pink && (
          <linearGradient id={bib} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F783B4" />
            <stop offset="1" stopColor="#EF5FA2" />
          </linearGradient>
        )}
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="100" cy="182" rx="58" ry="9" fill="#3F2247" opacity="0.08" />

      {/* ears */}
      <circle cx="47" cy="76" r="11" fill={`url(#${skin})`} />
      <circle cx="153" cy="76" r="11" fill={`url(#${skin})`} />
      <circle cx="47" cy="76" r="5" fill="#EFAF7F" opacity="0.55" />
      <circle cx="153" cy="76" r="5" fill="#EFAF7F" opacity="0.55" />

      {/* head */}
      <circle cx="100" cy="74" r="50" fill={`url(#${skin})`} />

      {/* hair + headband — boy sprout / girl bow + band */}
      {pink ? (
        <>
          <path d="M54 62 a46 46 0 0 1 92 0 l-7 1 a39 39 0 0 0 -78 0 Z" fill="#F783B4" />
          <path d="M100 25 C 94 13, 74 9, 73 19 C 72 28, 85 32, 100 28 Z" fill="#F783B4" />
          <path d="M100 25 C 106 13, 126 9, 127 19 C 128 28, 115 32, 100 28 Z" fill="#F783B4" />
          <circle cx="100" cy="26" r="5.5" fill="#EF5FA2" />
          <circle cx="98.4" cy="24.4" r="1.6" fill="#FDD3E5" opacity="0.9" />
          <path d="M98 27 c-1.5 -6 2 -8.5 4 -9 M102 19 q4.5 -5.5 10 -4 M94 19 q-4.5 -5.5 -10 -4" stroke="#3F2247" stroke-width="1.6" stroke-linecap="round" fill="none" />
        </>
      ) : (
        <path
          d="M99 24 q-1.5 -6 3 -8.5 M104 24 q4.5 -5.5 10 -4 M94 24 q-4.5 -5.5 -10 -4"
          stroke="#3F2247"
          stroke-width="2.2"
          stroke-linecap="round"
          fill="none"
        />
      )}

      {/* brows */}
      <path d="M74 60 q7 -5.5 14 -1.5" stroke="#C98A4B" stroke-width="2.6" stroke-linecap="round" fill="none" />
      <path d="M112 58.5 q7 -4 14 1.5" stroke="#C98A4B" stroke-width="2.6" stroke-linecap="round" fill="none" />

      {/* glossy eyes */}
      <circle cx="82" cy="72" r="7" fill="#2E1A33" />
      <circle cx="118" cy="72" r="7" fill="#2E1A33" />
      <circle cx="84.4" cy="69.6" r="2.4" fill="#fff" />
      <circle cx="120.4" cy="69.6" r="2.4" fill="#fff" />
      <circle cx="80" cy="74.6" r="1.1" fill="#fff" opacity="0.85" />
      <circle cx="116" cy="74.6" r="1.1" fill="#fff" opacity="0.85" />

      {/* blush + tiny nose */}
      <ellipse cx="70" cy="86" rx="7" ry="5" fill="#F8A9C4" opacity="0.8" />
      <ellipse cx="130" cy="86" rx="7" ry="5" fill="#F8A9C4" opacity="0.8" />
      <path d="M97 84 q2.5 2.5 5 0" stroke="#D89A5E" stroke-width="2.4" stroke-linecap="round" fill="none" />

      {/* smile */}
      <path d="M88 94 q12 10 24 0" stroke="#3F2247" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M93 98.5 q7 4.5 14 0" stroke="#F27D95" stroke-width="2.6" stroke-linecap="round" fill="none" />

      {/* torso + soft chin/neck shadow (boy) */}
      <path d="M62 122 q38 -12 76 0 l4 44 q-42 10 -84 0 Z" fill={`url(#${skin})`} />
      {!pink && <ellipse cx="100" cy="122" rx="26" ry="6.5" fill="#E8B183" opacity="0.30" />}

      {/* arms */}
      <path d="M60 126 q-16 16 -9 34 q2 5 7 3 l14 -30" fill={`url(#${skinDark})`} />
      <path d="M140 126 q16 16 9 34 q-2 5 -7 3 l-14 -30" fill={`url(#${skinDark})`} />
      <circle cx="60" cy="164" r="9" fill={`url(#${skin})`} />
      <circle cx="140" cy="164" r="9" fill={`url(#${skin})`} />

      {/* bib (girl) with little hearts, like the reference */}
      {pink && (
        <>
          <path d="M72 120 h56 v34 a28 16 0 0 1 -56 0 Z" fill={`url(#${bib})`} />
          <path d="M72 120 h56 v6 a28 10 0 0 1 -56 0 Z" fill="#F9A8CB" />
          <HeartMini transform="translate(78 130) scale(0.17)" fill="#FBB1D1" />
          <HeartMini transform="translate(93 138) scale(0.24)" fill="#FBB1D1" />
          <HeartMini transform="translate(113 130) scale(0.17)" fill="#FBB1D1" />
          <HeartMini transform="translate(78 147) scale(0.13)" fill="#FDD3E5" />
          <HeartMini transform="translate(112 147) scale(0.13)" fill="#FDD3E5" />
        </>
      )}

      {/* diaper */}
      {pink ? (
        <path d="M56 158 q44 -10 88 0 l-3 16 q-41 9 -82 0 Z" fill="#F8C7DE" />
      ) : (
        <path d="M56 158 q44 -10 88 0 l-3 16 q-41 9 -82 0 Z" fill="#fff" />
      )}
      <path d="M60 162 q40 -8.5 80 0" stroke="#DADAE2" stroke-width="2.4" stroke-dasharray="4 5" stroke-linecap="round" fill="none" />
      {pink && <path d="M100 156 l4.6 -8.2 h-9.2 Z" fill="#EF5FA2" opacity="0.7" />}

      {/* legs + chunky feet with toes */}
      <path d="M64 168 q-3 14 6 20 h20 l-2 -22" fill={`url(#${skinDark})`} />
      <path d="M136 168 q3 14 -6 20 h-20 l2 -22" fill={`url(#${skinDark})`} />
      <ellipse cx="74" cy="181" rx="14.5" ry="10.5" fill={`url(#${skin})`} transform="rotate(-8 74 181)" />
      <ellipse cx="126" cy="181" rx="14.5" ry="10.5" fill={`url(#${skin})`} transform="rotate(8 126 181)" />
      <circle cx="64" cy="172.5" r="2.6" fill="#EFAF7F" />
      <circle cx="72" cy="170" r="2.6" fill="#EFAF7F" />
      <circle cx="80" cy="171.5" r="2.6" fill="#EFAF7F" />
      <circle cx="136" cy="172.5" r="2.6" fill="#EFAF7F" />
      <circle cx="128" cy="170" r="2.6" fill="#EFAF7F" />
      <circle cx="120" cy="171.5" r="2.6" fill="#EFAF7F" />

      {/* pacifier resting between the feet (girl, like the reference) */}
      {pink && (
        <>
          <ellipse cx="100" cy="181" rx="8" ry="6.5" fill="#F06CA8" />
          <circle cx="100" cy="173.5" r="4.4" fill="#F5A44C" />
          <circle cx="100" cy="188" r="5.5" fill="none" stroke="#EA5E9F" stroke-width="2.2" />
        </>
      )}
    </svg>
  );
}

/* ── Glossy 3D heart (like the reference result card) ─────────────────────── */

export function GlossyHeart({ tone = 'pink', className = '' }: { tone?: 'pink' | 'blue'; className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const outer = `ho-${uid}`;
  const inner = `hi-${uid}`;
  const heartPath =
    'M50 88 C 21 66, 6 46, 13.5 29 C 19 16.5, 35.5 14, 46 23.5 L 50 27.5 L 54 23.5 C 64.5 14, 81 16.5, 86.5 29 C 94 46, 79 66, 50 88 Z';
  const c = tone === 'pink'
    ? { o1: '#F981BC', o2: '#E13489', i1: '#D62A7E', i2: '#A31058' }
    : { o1: '#7EA9F9', o2: '#3D74EA', i1: '#2C63E8', i2: '#1A50D6' };
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={outer} x1="18" y1="12" x2="86" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.o1} />
          <stop offset="1" stopColor={c.o2} />
        </linearGradient>
        <linearGradient id={inner} x1="30" y1="28" x2="72" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.i1} />
          <stop offset="1" stopColor={c.i2} />
        </linearGradient>
      </defs>
      <path d={heartPath} fill={`url(#${outer})`} />
      <path d={heartPath} fill={`url(#${inner})`} transform="translate(21.5 19) scale(0.57)" />
      {/* gloss */}
      <ellipse cx="31" cy="27" rx="12" ry="7.5" fill="#fff" opacity="0.7" transform="rotate(-28 31 27)" />
      <circle cx="20" cy="40" r="3.2" fill="#fff" opacity="0.45" />
    </svg>
  );
}

/* ── Emoji-style 3D baby face (result cards, logo) ────────────────────────── */

export function BabyFace({ gender = 'girl', className = '' }: { gender?: 'boy' | 'girl'; className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const skin = `face-${uid}`;
  const shade = `shade-${uid}`;
  const pink = gender === 'girl';
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={skin} cx="0.4" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FFF8EC" />
          <stop offset="0.62" stopColor="#FCE3C2" />
          <stop offset="1" stopColor="#F5C795" />
        </radialGradient>
        <radialGradient id={shade} cx="0.5" cy="0.28" r="0.75">
          <stop offset="0.55" stopColor="#E8A163" stopOpacity="0" />
          <stop offset="1" stopColor="#E8A163" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* ears */}
      <circle cx="18" cy="66" r="9" fill="#F5C795" />
      <circle cx="102" cy="66" r="9" fill="#F5C795" />

      {/* head with soft 3D shading */}
      <circle cx="60" cy="64" r="42" fill={`url(#${skin})`} />
      <circle cx="60" cy="64" r="42" fill={`url(#${shade})`} />

      {/* single curl (like the reference emoji) */}
      <path d="M57 23 c1.5 -7.5 10.5 -8 12.5 -3 c1.4 3.6 -2.4 6.6 -5.6 4.8" stroke="#D89A5E" stroke-width="3.4" stroke-linecap="round" fill="none" />
      {pink && (
        <>
          <path d="M38 27.5 l-10.5 -6.5 c-3.6 -2.2 -7.4 1.6 -5.2 5.2 l4 6.2 12.3 0.9 Z" fill="#EF5FA2" />
          <path d="M38 27.5 l10.5 -6.5 c3.6 -2.2 7.4 1.6 5.2 5.2 l-4 6.2 -12.3 0.9 Z" fill="#EF5FA2" />
          <circle cx="38" cy="28.5" r="3" fill="#F9A8CB" />
        </>
      )}

      {/* brows */}
      <path d="M40 50 q6 -4.5 12 -1" stroke="#C98A4B" stroke-width="2.4" stroke-linecap="round" fill="none" />
      <path d="M68 49 q6 -3.5 12 1" stroke="#C98A4B" stroke-width="2.4" stroke-linecap="round" fill="none" />

      {/* big glossy eyes */}
      <circle cx="45" cy="60" r="6.4" fill="#2E1A33" />
      <circle cx="75" cy="60" r="6.4" fill="#2E1A33" />
      <circle cx="47.2" cy="57.8" r="2.2" fill="#fff" />
      <circle cx="77.2" cy="57.8" r="2.2" fill="#fff" />
      <circle cx="43.2" cy="62.4" r="1" fill="#fff" opacity="0.85" />
      <circle cx="73.2" cy="62.4" r="1" fill="#fff" opacity="0.85" />

      {/* blush + nose */}
      <ellipse cx="34.5" cy="72" rx="6.4" ry="4.6" fill="#F8A9C4" opacity="0.85" />
      <ellipse cx="85.5" cy="72" rx="6.4" ry="4.6" fill="#F8A9C4" opacity="0.85" />
      <path d="M57.5 70 q2.5 2.6 5 0" stroke="#D89A5E" stroke-width="2.2" stroke-linecap="round" fill="none" />

      {/* open smile with tongue */}
      <path d="M46 77 q14 13 28 0 q-4 12.5 -14 12.5 q-10 0 -14 -12.5 Z" fill="#5E2A38" />
      <path d="M51.5 85.5 q8.5 5.5 17 0 q-3 4.9 -8.5 4.9 q-5.5 0 -8.5 -4.9 Z" fill="#F27D95" />
    </svg>
  );
}

/* ── Minimal face icon for chart cells ────────────────────────────────────── */

export function MiniFace({ gender, className = 'h-4 w-4' }: { gender: 'boy' | 'girl'; className?: string }) {
  const pink = gender === 'girl';
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M11.8 3.6 c0.5 -1.7 2.3 -1.9 2.7 -0.6 c0.3 1 -0.9 1.7 -1.6 1.1" stroke={pink ? '#B8125F' : '#1A50D6'} stroke-width="1.3" stroke-linecap="round" fill="none" />
      <circle cx="12" cy="13.4" r="8.6" fill="#fff" />
      <circle cx="9.2" cy="12.2" r="1.5" fill="#3F2247" />
      <circle cx="14.8" cy="12.2" r="1.5" fill="#3F2247" />
      <circle cx="9.6" cy="11.7" r="0.55" fill="#fff" />
      <circle cx="15.2" cy="11.7" r="0.55" fill="#fff" />
      <ellipse cx="6.8" cy="15.2" rx="1.5" ry="1" fill="#F8A9C4" />
      <ellipse cx="17.2" cy="15.2" rx="1.5" ry="1" fill="#F8A9C4" />
      <path d="M9.6 16.6 q2.4 2.3 4.8 0" stroke="#3F2247" stroke-width="1.3" stroke-linecap="round" fill="none" />
    </svg>
  );
}
