/**
 * Editorial content data: FAQs and comparisons shared between pages
 * and JSON-LD. (Kept in TS so schema and visible content can't drift.)
 */
export interface FaqItem { q: string; a: string; }

export const HOME_FAQ: FaqItem[] = [
  {
    q: 'How accurate is the Chinese gender predictor?',
    a: 'Honestly? About the same as a coin flip — roughly 50%. Claims of 70–93% accuracy circulate online, but controlled studies have found no evidence the chart can predict a baby’s sex. We present it as a beloved tradition, not a medical test, and our tool shows exactly how the lunar dates are converted so you can follow along.',
  },
  {
    q: 'What is the Chinese gender calendar and where does it come from?',
    a: 'It’s a traditional chart said to date back 700 years and to have been discovered in a royal tomb near Beijing, with other versions tracing it to the Qing dynasty (1644–1911). Historians can’t verify these tales, but the chart has circled the globe as a fun pregnancy ritual. It predicts using the mother’s lunar age and lunar month of conception.',
  },
  {
    q: 'Do I need to know my lunar age or lunar dates?',
    a: 'No. Our predictor converts your birth date and conception date into exact lunar dates automatically — using the full Chinese lunisolar calendar tables (1900–2100), so dates near Chinese New Year or leap months are handled correctly.',
  },
  {
    q: 'I’m not sure of my conception date. Can I still use it?',
    a: 'Yes. Switch the second input to “Baby’s due date” (we estimate conception ≈ due date − 266 days) or “Last period started” (conception ≈ LMP + 14 days). Small date shifts can matter near lunar month boundaries, so exact dates will always be most precise.',
  },
  {
    q: 'Does the Chinese gender chart change every year?',
    a: 'No — there’s one authentic chart with the same boy/girl cells every year. What changes is the calendar conversion: Chinese New Year moves (Feb 17, 2026, for example) and lunar months start on different Gregorian dates, so the same Western dates can land in different cells each year.',
  },
  {
    q: 'Why is my lunar age one or two years older than my real age?',
    a: 'Chinese tradition counts you as age 1 at birth (pregnancy time counts), and you gain a year at Chinese New Year rather than on your birthday. So your lunar age is usually your Western age plus one, sometimes plus two — our lunar age calculator works it out instantly.',
  },
  {
    q: 'Can the chart or planner really choose my baby’s sex?',
    a: 'No. A baby’s sex is determined by chromosomes at conception, and no calendar can influence it. Use the planner for fun and for understanding how the chart is read — then leave family planning decisions to you and your healthcare provider.',
  },
  {
    q: 'How can I know my baby’s sex for real?',
    a: 'Medical methods only: the NIPT blood test can indicate fetal sex from about 10 weeks, and the 18–20-week anatomy ultrasound is the classic confirmation moment. Both are dramatically more reliable than any folklore method.',
  },
];

export const CHART_FAQ: FaqItem[] = [
  {
    q: 'How do I read the 2026 Chinese gender chart?',
    a: 'Find the mother’s lunar age on the left (18–45), slide across to the lunar month of conception, and read the cell: blue for boy, pink for girl. The chart only works with correctly converted lunar dates — our converter above does the hard part for you.',
  },
  {
    q: 'Why does everyone’s “2026 chart” look the same?',
    a: 'Because the authentic chart never changes. A “2026 edition” is really the same grid plus the 2026 lunar calendar mapping, so you can translate your Western dates into the right lunar month and age.',
  },
  {
    q: 'What happens with leap months?',
    a: 'Some lunar years have 13 months — for example, the leap month in 2025. Most predictors (including ours) map a leap-month conception to its base month and note it on your result, since the classic chart has no separate leap column.',
  },
  {
    q: 'Is the chart different for twins?',
    a: 'The chart was never designed for multiples — it predicts one boy/girl cell from one pregnancy, so it can’t be more than a charming coin flip for twins. For twins, each baby’s sex still depends on genetics, not calendars.',
  },
];

export const COMPARISON_ROWS = [
  { method: 'Chinese gender chart 🇨🇳', how: 'Lunar age × lunar month lookup', reliability: '~50% (chance)' },
  { method: 'Mayan calendar 🇲🇽', how: 'Parity of mom’s age vs. conception year', reliability: '~50% (chance)' },
  { method: 'Ring/pendulum test 💍', how: 'Swing pattern over the belly', reliability: '~50% (chance)' },
  { method: 'Heart-rate myth ❤️', how: 'Fetal heart >140 bpm = girl?', reliability: 'Debunked' },
  { method: 'NIPT blood test 🧬', how: 'Screens fetal DNA from ~10 weeks', reliability: 'Very high' },
  { method: 'Anatomy ultrasound 🩺', how: 'Visual scan at 18–20 weeks', reliability: 'High' },
];

export const HOW_TO_STEPS = [
  { emoji: '🎂', title: 'Enter the mother’s birth date', text: 'We convert it to the lunar calendar — counts as the traditional age (1 at birth, +1 every Chinese New Year).' },
  { emoji: '🌱', title: 'Add your conception, due date or LMP', text: 'Whatever you know best. We derive the conception moment, then map it to the exact lunar month (leap months included).' },
  { emoji: '✨', title: 'Get the chart’s guess instantly', text: 'Your lunar age × lunar month intersection lights up the prediction — boy or girl, with confetti either way.' },
];
