/**
 * Centralized strings for the Wave-1 specialized spokes (EN source of truth).
 * Each spoke page mounts its React island with a flat, typed string map and
 * pulls editorial copy from the same object — zero raw literals inside the
 * components. Pages are EN-only routes (registered in `EN_ONLY_PATH`,
 * src/i18n/utils.ts); the objects still accept a `locale` prop so a future
 * localization pass only needs to add per-locale strips.
 */
import type { FaqItem } from '../content/data/editorial';

/* ───────────────────────── Phase 1 · IVF / FET / IUI ───────────────────────── */

export interface IvfStrings {
  pathwayHeading: string;
  pathwayFet: string; pathwayFresh: string; pathwayDonor: string;
  fetHint: string; freshHint: string; donorHint: string;
  motherDobLabel: string; motherDobHint: string;
  donorDobLabel: string; donorDobHint: string;
  retrievalLabel: string; retrievalHint: string;
  embryoDayLabel: string; embryoDay3: string; embryoDay5: string; embryoDayHint: string;
  transferLabel: string; transferHint: string;
  calculate: string; again: string;
  methodAHeading: string; methodBHeading: string;
  methodAName: string; methodBName: string;
  methodAShort: string; methodBShort: string;
  methodADesc: string; methodBDesc: string;
  lunarAge: string; lunarMonth: string; zodiac: string;
  agreeBadge: string; lockWord: string;
  splitBadge: string;
  agreeNote: string;
  splitNote: string;
  traditionalNote: string;
  invalidDates: string; invalidSequence: string; invalidDonor: string;
  disclaimer: string;
  genderBoy: string; genderGirl: string;
  boyWord: string; girlWord: string;
}

export const IVF_STRINGS: IvfStrings = {
  pathwayHeading: 'Choose your IVF pathway',
  pathwayFet: '🧬 Frozen Embryo Transfer (FET)',
  pathwayFresh: '🥚 Fresh IVF / IUI Cycle',
  pathwayDonor: '💝 Donor Egg Cycle',
  fetHint: 'Compares the egg retrieval date against the embryo transfer date — the two moments a traditionalist could call "conception".',
  freshHint: 'Uses the egg retrieval (or insemination) date as the moment of fertilization for the lunar chart.',
  donorHint: 'Compares the donor’s lunar age at retrieval against the carrying mother’s lunar age at transfer — two chart readings.',
  motherDobLabel: '🎂 Mother’s date of birth',
  motherDobHint: 'Used to compute the traditional lunar age (虚岁) at each date.',
  donorDobLabel: '💝 Egg donor’s date of birth',
  donorDobHint: 'The donor’s lunar age drives the retrieval-date reading.',
  retrievalLabel: '🥚 Egg retrieval date',
  retrievalHint: 'The day eggs were retrieved — the closest Gregorian date to fertilization.',
  embryoDayLabel: '🧫 Embryo stage at transfer',
  embryoDay3: 'Day 3 embryo',
  embryoDay5: 'Day 5–6 blastocyst',
  embryoDayHint: 'Blastocysts are transferred 2–3 days later, which shifts the apparent conception date.',
  transferLabel: '🏥 Embryo transfer date',
  transferHint: 'The day the embryo was placed in the uterus (implantation perspective).',
  calculate: '🔮 Predict with both dates',
  again: '↻ Try other dates',
  methodAHeading: 'Method A · Fertilization',
  methodBHeading: 'Method B · Implantation',
  methodAName: 'Retrieval / insemination date',
  methodBName: 'Transfer date',
  methodAShort: 'Retrieval',
  methodBShort: 'Transfer',
  methodADesc: 'The date the biology actually happened — egg meets sperm (or ICSI needle).',
  methodBDesc: 'The date the embryo was transferred — the moment the pregnancy "arrives".',
  lunarAge: 'Lunar age',
  lunarMonth: 'Lunar month',
  zodiac: 'Chinese zodiac',
  agreeBadge: 'Both moments agree (folklore)',
  lockWord: 'Lunar Lock',
  splitBadge: 'Split Verdict',
  agreeNote: 'Both readings give the same cell of the Qing Palace chart — a rare 100% lunar agreement.',
  splitNote: 'The two dates land on different cells. This is normal when a transfer crosses a lunar month boundary (or a leap month) — the lunar month flipped between retrieval and transfer.',
  traditionalNote: 'Traditionalists read the chart from the fertilization date (Method A): the baby’s "seed" was already planted at retrieval. Clinics date pregnancies from retrieval or LMP, not transfer.',
  invalidDates: 'Please fill in every required date.',
  invalidSequence: 'The transfer date should be on/after the retrieval date — check the order.',
  invalidDonor: 'The donor’s birth date must come before the retrieval date.',
  disclaimer: 'Entertainment only — a tradition read as folklore, not medicine. PGT-A testing is the clinical answer.',
  genderBoy: 'BOY',
  genderGirl: 'GIRL',
  boyWord: 'a boy',
  girlWord: 'a girl',
};

export const IVF_FAQ: FaqItem[] = [
  {
    q: 'Does the Chinese gender chart work for IVF and frozen embryo transfers?',
    a: 'Traditionally, the chart is read from the moment of conception. In IVF, the closest equivalent is the egg retrieval (fertilization) date — not the transfer date. Most practitioners of the folklore convert the retrieval date. Because a frozen embryo transfer happens weeks later, a strict "implantation" reading can land in a different lunar month, which is why our tool shows both dates side-by-side.',
  },
  {
    q: 'Which date should I use for a day-5 blastocyst transfer?',
    a: 'If you only know the transfer date, subtract the embryo’s age (5 days for a blastocyst, 3 days for a day-3 embryo) to estimate fertilization, then read the chart from that date. Our calculator does this subtraction for you and shows whether the retrieval-date reading and the transfer-date reading agree.',
  },
  {
    q: 'Whose birth date does a donor-egg cycle use?',
    a: 'There are two folkloric conventions: the donor’s lunar age at egg retrieval (the egg’s "lunar lineage") and the carrying mother’s lunar age at transfer (the "energy of the womb"). Our tool computes both readings so you can compare — and explains why traditionalists favor the retrieval date.',
  },
  {
    q: 'Can IVF sex selection be planned with the calendar?',
    a: 'Clinically, the sex of an IVF embryo is only known through PGT-A genetic testing, and elective sex selection is regulated differently across countries. The lunar calendar is a cultural tradition with lottery-level accuracy (about 50%, matching the 2010 Swedish registry study of 2.8 million births) — which is exactly why our tool prints that disclaimer.',
  },
];

/* ─────────────────── Phase 2 · Past pregnancies backtester ─────────────────── */

export interface BacktestStrings {
  motherHeading: string;
  motherDobLabel: string; motherDobHint: string;
  childHeading: string;
  childWord: string;
  lunarAgeWord: string;
  add: string;
  removeAll: string;
  modeLabel: string;
  modeConception: string; modeChildBirth: string;
  conceptionLabel: string; childBirthLabel: string; childBirthHint: string;
  actualLabel: string;
  wasBoy: string; wasGirl: string; currentPregnancy: string;
  remove: string;
  test: string; reset: string;
  rowPrediction: string; rowActual: string; rowVerdict: string;
  match: string; miss: string; predict: string;
  hitScore: string;
  perfectLine: string; mixedLine: string;
  scorecardButton: string; scorecardSaved: string;
  invalidRow: string;
  disclaimer: string;
  emptyHint: string;
  currentHint: string;
}

export const BACKTEST_STRINGS: BacktestStrings = {
  motherHeading: 'Step 1 · Mother’s details',
  motherDobLabel: '🎂 Mother’s date of birth',
  motherDobHint: 'Entered once — drives the lunar age for every child below.',
  childHeading: 'Step 2 · Your children (up to 5)',
  childWord: 'Child',
  lunarAgeWord: 'lunar age',
  add: '+ Add Another Child',
  removeAll: 'Clear all',
  modeLabel: 'Input mode',
  modeConception: 'Conception date',
  modeChildBirth: 'Birth / due date',
  conceptionLabel: '🌱 Conception date',
  childBirthLabel: '👶 Child’s birth or due date',
  childBirthHint: 'We subtract 266 days to reconstruct the conception date (industry-standard gestational length).',
  actualLabel: 'Actual gender',
  wasBoy: '👦 Was a Boy',
  wasGirl: '👧 Was a Girl',
  currentPregnancy: '🤰 Current Pregnancy (Predict!)',
  remove: 'Remove',
  test: '✨ Test the chart on my family',
  reset: '↻ Reset',
  rowPrediction: 'Chart prediction',
  rowActual: 'Actual',
  rowVerdict: 'Verdict',
  match: '✅ Match',
  miss: '❌ Miss',
  predict: '🔮 Predicts',
  hitScore: 'The lunar chart matched {n} of {total} ({pct}%) for your past pregnancies!',
  perfectLine: 'A perfect score — the lunar cells lined up with every one of your children’s cells. Enjoy it, but remember: your next conception is still an independent ~50/50 event, because every new egg and sperm pair reshuffles the chromosomes from scratch.',
  mixedLine: 'Mixed results are the statistical norm: the chart runs at coin-flip odds (≈50%) across 2.8 million births, so a half-and-half scorecard is exactly what chance looks like.',
  scorecardButton: '📸 Download My Family Lunar Scorecard',
  scorecardSaved: '✓ Saved to your device',
  invalidRow: 'Check every child row — each needs a date and a gender.',
  disclaimer: 'A game, not data: three kids is an anecdote, two million births is a study.',
  emptyHint: 'Add at least one child row to run the test.',
  currentHint: 'We’ll show the chart’s prediction instead of scoring this row.',
};

export const BACKTEST_FAQ: FaqItem[] = [
  {
    q: 'Why should I test the Chinese baby predictor on my past children first?',
    a: 'Past pregnancies are the safest blind test you can run: you already know the answers, so there is no temptation to bend the inputs. It also teaches the two conversions that break most people — lunar age versus Western age, and lunar month versus calendar month — before you try a "prediction" for a current pregnancy.',
  },
  {
    q: 'Why do most people think the chart got their children wrong?',
    a: 'Six classic reasons: using Western age instead of lunar (虚岁) age; subtracting months instead of converting to the lunar calendar; using the birth date instead of the conception date (a 266-day gap); ignoring that January/February births straddle the Chinese New Year boundary; the leap-month rule that splits a Runyue month in half; and simple confirmation bias — the chart has 28×12 = 336 cells, so any single mother is guaranteed many "misses" somewhere.',
  },
  {
    q: 'How accurate is the Chinese gender chart, really?',
    a: 'The largest empirical test — the 2010 Swedish population registry study by Villamor & Cnattingius covering about 2.8 million births — found the lunar method performs at chance level, about 50%. That matches a fair coin, which is why any small sample (your 3 kids, your 5 kids) can swing 100% one year and 20% the next.',
  },
  {
    q: 'What is confirmation bias in the "was it right?" game?',
    a: 'When the chart agrees, we remember it; when it disagrees, we assume the inputs were wrong and try a different date conversion until it agrees. That is exactly why our scorecard fixes the inputs first (mother’s DOB, 266-day offset, true lunar month) and then reports the honest hit rate — misses and all.',
  },
];

/* ───────────── Phases 3–4 · 2027 / 2028 calendar hubs (shared) ───────────── */

export interface CalendarStrings {
  plannerHeading: string;
  plannerIntro: string;
  dobLabel: string; dobHint: string;
  wantLabel: string; wantBoy: string; wantGirl: string;
  compute: string;
  windowLabel: string;
  lunarAgeLabel: string;
  noneResult: string;
  resultHeading: string;
  disclaimer: string;
  leapChip: string;
  monthTableTitle: string;
  monthTableIntro: string;
  colLunar: string; colLeap: string; colStart: string; colEnd: string; colDays: string;
  matrixTitle: string;
  matrixIntro: string;
  colBirthYear: string; colCny: string; colZodiac: string; colAge: string; colBoyWindows: string; colGirlWindows: string;
  caveat: string;
  boyChip: string; girlChip: string;
}

export const CALENDAR_STRINGS: CalendarStrings = {
  plannerHeading: '🎯 2027 conception planner (pre-filtered)',
  plannerIntro: 'Enter the mother’s date of birth, pick the gender you hope for, and see every favourable 2027 lunar window with exact Gregorian dates — leap months handled automatically.',
  dobLabel: '🎂 Mother’s date of birth',
  dobHint: 'Lunar age is computed with the traditional virtual-age (虚岁) rule.',
  wantLabel: 'Gender you hope for',
  wantBoy: '💙 A boy',
  wantGirl: '💗 A girl',
  compute: '🗓️ Show my 2027 windows',
  windowLabel: 'Favourable window',
  lunarAgeLabel: 'Her lunar age',
  noneResult: 'No favourable months for this age in 2027 — check the other gender or the full matrix below.',
  resultHeading: 'Favourable {year} windows',
  disclaimer: 'Folkloric tradition at coin-flip odds — for fun and family planning conversations, not medical advice.',
  leapChip: 'Leap month',
  monthTableTitle: '📊 Complete 2027 Gregorian ⇄ lunar month conversion table',
  monthTableIntro: 'Every lunar month of the Fire Goat year with its exact Gregorian start and end dates. Conceptions during the crossover trap (Jan 1 – Feb 5, 2027 — see below) belong to the 2026 Fire Horse lunar year, not this table.',
  colLunar: 'Lunar month',
  colLeap: 'Leap flag',
  colStart: 'Starts (Gregorian)',
  colEnd: 'Ends (Gregorian)',
  colDays: 'Days',
  matrixTitle: '🧮 Mother’s birth-year quick lookup (1982–2009)',
  matrixIntro: 'Find your birth year, read your exact Chinese New Year cutoff and your 2027 lunar age, then jump to the best Gregorian windows the chart predicts for each gender.',
  colBirthYear: 'Birth year',
  colCny: 'CNY cutoff',
  colZodiac: 'Zodiac',
  colAge: '2027 lunar age',
  colBoyWindows: 'Boy windows',
  colGirlWindows: 'Girl windows',
  caveat: 'Ages assume a birthday after that year’s CNY cutoff. If you were born before the cutoff (mostly January–early February), your lunar age is one year higher — the planner above computes it exactly from your full date of birth.',
  boyChip: 'BOY',
  girlChip: 'GIRL',
};

export const CAL2027_FAQ: FaqItem[] = [
  {
    q: 'When is Chinese New Year 2027 and which animal year follows?',
    a: 'Chinese New Year 2027 falls on February 6, 2027, opening the Year of the Fire Goat (丁未). Every lunar month of the 2027 gender chart runs from Feb 6, 2027 through January 25, 2028.',
  },
  {
    q: 'What is the “Jan 1 – Feb 5, 2027 crossover trap”?',
    a: 'Any conception between January 1 and February 5, 2027 still belongs to the 2026 Fire Horse lunar year — its 11th or 12th lunar month — and the mother’s 2026 lunar age, not her 2027 age. Reading those conceptions as “2027 months” is one of the most common ways the chart gets misused; our conversion table above keeps the boundary exact.',
  },
  {
    q: 'How do I find my correct lunar age for 2027?',
    a: 'Count one year at birth and one more at every Chinese New Year you have lived through (the virtual-age rule, 虚岁). A mother born in 1990 after the CNY cutoff turns lunar 38 in 2027. Use the quick-lookup matrix for your birth year, or let the planner compute it from your full date of birth.',
  },
  {
    q: 'Does the 2027 chart have a leap (Runyue) month?',
    a: 'No — the Fire Goat lunar year 2027 has 12 regular months and no intercalary month. Leap months appear about seven times every 19 years; 2025 had a leap 6th month, and the next nearby occurrence is 2028, which has a leap 5th month.',
  },
];

export const CAL2028_FAQ: FaqItem[] = [
  {
    q: 'When is Chinese New Year 2028 and what is special about that year?',
    a: 'Chinese New Year 2028 falls on January 26, 2028, opening the Year of the Earth Monkey (戊申). Because the lunar year starts so early, virtually all of the 2028 Gregorian year sits inside the Monkey lunar year.',
  },
  {
    q: 'What is the 2028 leap 5th month (Runyue) and how is it read?',
    a: 'Lunar year 2028 (Earth Monkey) carries an intercalary 5th month: 13 months total. Traditional practice splits the leap month in half — days 1–15 count as month 5, days 16–29 as month 6. A conception in the first half reads month 5 in the chart, a conception in the second half reads month 6. Our table maps both halves to exact Gregorian dates.',
  },
  {
    q: 'Why does a 13-month lunar year matter for the gender chart?',
    a: 'The chart only has columns for months 1–12, so the extra leap month must be folded back into a numbered month using the half-month rule. Simple calculators either skip it or mislabel it, producing contradictory results — especially for June–July 2028 conceptions, where the leap month lands.',
  },
  {
    q: 'How old is a 1990-born mother in the 2028 chart?',
    a: 'Under the virtual-age rule she is lunar 39 during the 2028 Monkey year (39 = 2028 − 1990 + 1), assuming her birthday falls after the 1990 CNY cutoff; born before the cutoff she counts from lunar 1990 and is lunar 40. Either number selects her chart row — the planner computes it exactly from her date of birth.',
  },
];
