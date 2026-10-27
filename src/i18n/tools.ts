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
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
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
  metaTitle: 'IVF & Frozen Embryo Chinese Baby Predictor (FET, IUI & Donor)',
  metaDesc: 'Read the Chinese gender chart for IVF, FET, IUI and donor-egg cycles: compare the egg retrieval date against the transfer date on the traditional lunar calendar — both lunar readings, split-verdict detection and PGT-A context included.',
  h1: 'IVF & Frozen Embryo',
  h1Accent: 'Chinese Baby Predictor (FET, IUI & Donor)',
  lead: 'Compare the two moments an IVF baby "begins" — egg retrieval and embryo transfer — on the traditional Qing Palace chart at once, with donor-egg readings for both parents-by-intent.',
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
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
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
  metaTitle: 'Was the Chinese Baby Predictor Right? Past Pregnancies Accuracy Tester',
  metaDesc: 'Test the Chinese gender chart against your real past pregnancies: enter each child’s date and gender and get an honest hit-rate scorecard for your lunar cells.',
  h1: 'Past Pregnancies',
  h1Accent: 'Accuracy Tester',
  lead: 'Enter the mother’s date of birth plus each child’s conception (or birth) date and actual gender — the tester replays the lunar chart on your own family and reports the honest hit rate, misses included.',
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
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
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
  monthTableTitle2028: string;
  monthTableIntro2028: string;
  colLunar: string; colLeap: string; colStart: string; colEnd: string; colDays: string;
  matrixTitle: string;
  matrixIntro: string;
  colBirthYear: string; colCny: string; colZodiac: string; colAge: string; colBoyWindows: string; colGirlWindows: string;
  caveat: string;
  boyChip: string; girlChip: string;
}

export const CALENDAR_STRINGS: CalendarStrings = {
  metaTitle: 'Chinese Gender Calendar {year}: Boy or Girl Conception Windows',
  metaDesc: 'The {year} Chinese gender calendar: every favourable lunar conception window for a boy or a girl with exact Gregorian dates, CNY crossover traps and leap-month rules handled on the authentic 1900–2100 lunisolar table.',
  h1: 'Chinese Gender Calendar {year}',
  h1Accent: 'Boy or Girl Conception Windows',
  lead: 'Every lunar month of the {year} chart mapped to real Gregorian dates: pick the gender you hope for and the planner returns exact conception windows from the mother’s date of birth — leap months and New Year crossover traps handled automatically.',
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
  monthTableTitle2028: '📊 Complete 2028 Gregorian ⇄ lunar month conversion table',
  monthTableIntro2028: 'Every lunar month of the Earth Monkey year with its exact Gregorian start and end dates. Conceptions during the early crossover trap (Jan 1 – Jan 25, 2028) belong to the 2027 Fire Goat lunar year, not this table.',
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

/* ───────────── Phase 3 · Cusp / borderline conception checker (Wave-2) ───────────── */

export interface CuspStrings {
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
  dobLabel: string; dobHint: string;
  centerLabel: string; centerHint: string;
  spreadHeading: string; spread2: string; spread3: string; spreadHelp: string;
  calculate: string; again: string;
  resultHeading: string;
  dayCol: string; dateCol: string; lunarCol: string; ageCol: string; cellCol: string;
  dayCenter: string; dayBefore: string; dayAfter: string;
  lunarMonthWord: string; lunarDayWord: string; leapWord: string;
  lockBanner: string; splitBanner: string; splitBody: string;
  boundaryNewMoon: string; boundaryLeap: string; boundaryCny: string;
  genderBoy: string; genderGirl: string; boyWord: string; girlWord: string;
  invalid: string; earlyDate: string;
  disclaimer: string;
}

export const CUSP_STRINGS: CuspStrings = {
  metaTitle: 'Borderline & Cusp Conception Date Chinese Baby Predictor',
  metaDesc: 'Conceived within days of a lunar month boundary or Chinese New Year? The cusp checker tests your whole 5- or 7-day fertile window day by day and shows exactly where a 2-day shift flips BOY to GIRL.',
  h1: 'Borderline &amp; Cusp Conception Date',
  h1Accent: 'Chinese Baby Predictor',
  lead: 'Sperm survives up to 5 days and ovulation shifts by 24–48 hours — so if conception happened near a new moon or Chinese New Year, a 2-day difference can flip the lunar chart from boy to girl. This checker tests every single day of your fertile window and shows the exact day the prediction flips.',
  dobLabel: '🎂 Mother’s date of birth',
  dobHint: 'Selects her traditional lunar-age (虚岁) row for every day of the window.',
  centerLabel: '🩸 Intercourse / ovulation centre date',
  centerHint: 'Your best estimate of the centre of the fertile window — the ovulation date, or the day of (near-ovulation) intercourse.',
  spreadHeading: 'Fertile window spread',
  spread2: '±2 days · 5-day window',
  spread3: '±3 days · 7-day fertile window',
  spreadHelp: 'Sperm survive up to 5 days and the egg is viable 12–24 hours after ovulation, so honest uncertainty spans multiple days — the checker reads every day of it.',
  calculate: '⚖️ Test my cusp window',
  again: '↻ Try other dates',
  resultHeading: 'Day-by-day chart readings across your fertile window',
  dayCol: 'Day',
  dateCol: 'Gregorian date',
  lunarCol: 'Lunar date',
  ageCol: 'Her lunar age',
  cellCol: 'Chart cell',
  dayCenter: 'Centre day',
  dayBefore: '{n} before centre',
  dayAfter: '{n} after centre',
  lunarMonthWord: 'lunar month',
  lunarDayWord: 'day',
  leapWord: 'leap month',
  lockBanner: '🔒 100% LUNAR LOCK (FOLKLORE: {gender}) — all {n} days of your window read the same cell. Your result does not depend on which day fertilization actually happened.',
  splitBanner: '⚡ CUSP SPLIT DETECTED (BOUNDARY CROSSOVER)',
  splitBody: 'The lunar verdict flips on {flipDate} ({boundary}): before it {n1} window day(s) read {g1}, after it {n2} day(s) read {g2}. If intercourse spanned more than one day, both folklore answers were in play — only the actual fertilization day decides.',
  boundaryNewMoon: 'lunar month boundary in the table',
  boundaryLeap: 'leap-month half-month split',
  boundaryCny: 'lunar New Year / lunar-age rollover',
  genderBoy: 'BOY',
  genderGirl: 'GIRL',
  boyWord: 'a boy',
  girlWord: 'a girl',
  invalid: 'Please fill in every required date.',
  earlyDate: 'Dates before January 31, 1900 (the start of the reliable lunar table) are not supported.',
  disclaimer: 'Entertainment only — a cusp split shows where the chart is sensitive, not which sex is likely. Human sex is decided by sperm genetics at a coin-flip level.',
};

export const CUSP_FAQ: FaqItem[] = [
  {
    q: 'When exactly does the Chinese gender chart flip from boy to girl near a boundary?',
    a: 'The chart flips at two boundaries: the new moon that starts each lunar month (the table’s columns), and Chinese New Year (the lunar-age year used for the row). If your conception date sits within a few days of either, day −2 and day +2 of the same fertile window can fall in different columns — different chart cells, opposite folklore answers. The cusp checker prints every day of the window so you can see the exact flip date.',
  },
  {
    q: 'Conceived at the end of a lunar month — does the reading still count?',
    a: 'Yes. A conception on the last day of a lunar month is read with that month’s column; the next day’s conception moves to the new column. The honest question is not "is it legal" but "which day did fertilization happen" — and sperm survival of up to five days makes that genuinely uncertain. That uncertainty is why a split banner exists instead of one confident answer.',
  },
  {
    q: 'What about conceptions right before Chinese New Year (late January / early February)?',
    a: 'Before the lunar New Year you are still in the old lunar year, so the chart row uses the previous year’s age; after it, the age increments by one. A mother conceived a week before CNY and one a week after can sit on different rows even with the same birth date. February convenience-calculators that use a fixed "Gregorian-age + 1" rule get this wrong — our engine converts every window day through the real 1900–2100 lunisolar table.',
  },
  {
    q: 'My result says CUSP SPLIT — is that a bad result?',
    a: 'Neither good nor bad: it means the folklore answer depends on facts nobody can fully reconstruct (the exact fertilization day inside a 5-to-7-day window). About one in six window conceptions lands near a boundary. Treat any single lunar-calendar answer as entertainment at coin-flip odds — clinical sex determination is governed by sperm chromosomes, not by which side of a new moon a date fell on.',
  },
];

/* ───────────── TTC planner strings (extracted from TtcPlannerBody.astro) ───────────── */

export interface TtcToolStrings {
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
  dobLabel: string; dobHint: string; ageNow: string; ageInYear: string;
  wantLabel: string; boyLabel: string; girlLabel: string; bothLabel: string;
  yearLabel: string; compute: string; again: string;
  headline: string; optimalBoy: string; optimalGirl: string;
  lunarMonth: string; lunarAgeLabel: string; windowLabel: string;
  leapFirstHalf: string; leapSecondHalf: string;
  skipLabel: string; none: string; newLunarYear: string;
  save: string; saved: string; print: string; footnote: string;
  invalid: string; matrixNote: string;
}

export const TTC_STRINGS: TtcToolStrings & Record<string, string> = {
  metaTitle: 'Chinese Gender Planner: TTC Calendar for Boy or Girl (2026-2027)',
  metaDesc: 'Plan your pregnancy with our free Chinese Gender TTC Planner. Select your birthdate and desired gender to find optimal lunar conception windows for 2026-2027.',
  h1: 'The Chinese Gender Planner',
  h1Accent: 'for TTC Parents',
  lead: 'Pick your birthdate and the gender you’re hoping for — the ancient lunar chart returns exact conception windows with dates, lunar months and your traditional lunar age for every month of 2026, 2027 and 2028.',
  dobLabel: 'Mother’s date of birth',
  dobHint: 'Pick a date to see your live lunar age (虚岁) instantly.',
  ageNow: 'Lunar age today',
  ageInYear: 'age you’ll carry',
  wantLabel: 'Desired baby gender',
  boyLabel: '💙 Baby Boy',
  girlLabel: '💖 Baby Girl',
  bothLabel: '🌟 Overview',
  yearLabel: 'Planning horizon',
  compute: 'Show My Windows',
  again: '↻ Reset',
  headline: 'Conception windows for',
  optimalBoy: 'BOY MONTH · FOLKLORE',
  optimalGirl: 'GIRL MONTH · FOLKLORE',
  lunarMonth: 'Lunar Month',
  lunarAgeLabel: 'Lunar age',
  windowLabel: 'Window',
  leapFirstHalf: 'leap · 1st half',
  leapSecondHalf: 'leap · 2nd half',
  skipLabel: 'try another month',
  none: 'No windows calculated yet.',
  newLunarYear: '老虎',
  save: 'Save My Planning Calendar',
  saved: 'CALENDAR SAVED!',
  print: 'Print',
  footnote: '',
  invalid: 'Please pick the mother’s date of birth first.',
  matrixNote: 'Authentic 1900–2100 lunisolar tables · Qing Palace 28×12 chart (lunar ages 18–45) · leap months (Runyue) follow the traditional half-month rule: days 1–15 → month N, days 16+ → month N+1.',
};

/* ───────────────────────── Phase 1 · Mayan vs Chinese Dual ───────────────────────── */

export interface MayanDualToolStrings {
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
  motherDobLabel: string;
  conceptionMethodLabel: string;
  methodExact: string; methodLmp: string; methodDueDate: string;
  conceptionDateLabel: string; lmpDateLabel: string; dueDateLabel: string;
  calculateBtn: string; resetBtn: string;
  chinaTitle: string; mayaTitle: string;
  lunarAgeLabel: string; lunarMonthLabel: string;
  westernAgeLabel: string; gregorianMonthLabel: string; parityLabel: string;
  agreeBanner: string; splitBanner: string;
  agreeText: string; splitText: string;
  evenWord: string; oddWord: string;
  sameParityRule: string; diffParityRule: string;
  boyWord: string; girlWord: string;
  invalidDates: string; futureDateError: string; disclaimer: string;
}

export const MAYAN_DUAL_STRINGS: MayanDualToolStrings & Record<string, string> = {
  metaTitle: 'Mayan vs Chinese Gender Predictor: Dual Ancient Calculator & Comparison',
  metaDesc: 'Compare the Ancient Mayan parity method and the Qing Dynasty Chinese lunar chart side-by-side. See if ancient folklore agrees on boy or girl for your conception dates.',
  h1: 'Mayan vs. Chinese Gender Predictor',
  h1Accent: 'Dual Ancient Calculator',
  lead: 'Compare history’s two most famous folklore baby gender systems side-by-side: the Qing Dynasty Lunisolar Palace chart and the Ancient Mayan parity calendar, with live agreement and split detection.',
  motherDobLabel: '🎂 Mother’s Date of Birth',
  conceptionMethodLabel: 'Date Calculation Method',
  methodExact: 'Conception Date',
  methodLmp: 'Last Period (LMP)',
  methodDueDate: 'Due Date',
  conceptionDateLabel: 'Estimated Conception Date',
  lmpDateLabel: 'First Day of Last Period (LMP)',
  dueDateLabel: 'Estimated Baby Due Date',
  calculateBtn: '🔮 Predict with Both Ancient Systems',
  resetBtn: '↻ Test Other Dates',
  chinaTitle: 'Ancient China',
  mayaTitle: 'Ancient Maya',
  lunarAgeLabel: 'Mother’s Lunar Age (虚岁)',
  lunarMonthLabel: 'Conception Lunar Month',
  westernAgeLabel: 'Western Age at Conception',
  gregorianMonthLabel: 'Conception Month',
  parityLabel: 'Parity Combination',
  agreeBanner: '🌟 ANCIENT CULTURES AGREE: {gender} (DOUBLE FOLKLORE SYNERGY)',
  splitBanner: '⚔️ FOLKLORE SPLIT: China says {chinese} · Maya says {mayan}',
  agreeText: 'Both the Chinese lunisolar palace chart and the Mayan mathematical parity system predict {gender}. In ancient folklore, dual civilizational agreement is celebrated as a double harmony sign!',
  splitText: 'The ancient traditions diverge for your dates: Chinese lunisolar math points to {chinese}, while the Mayan solar parity system indicates {mayan}. Because both systems rely on different calendrical clocks, split verdicts occur in roughly 50% of dates.',
  evenWord: 'Even',
  oddWord: 'Odd',
  sameParityRule: 'Both Even / Both Odd → Girl',
  diffParityRule: 'One Even + One Odd → Boy',
  boyWord: 'BOY',
  girlWord: 'GIRL',
  invalidDates: 'Please enter valid dates to calculate your predictions.',
  futureDateError: 'Mother’s birth date must be in the past and before the conception date.',
  disclaimer: 'For entertainment only. Fetal sex is determined chromosomally by sperm at fertilization (~50% odds) — neither ancient chart has clinical predictive power.',
};

export const MAYAN_DUAL_FAQ: FaqItem[] = [
  {
    q: 'How does the Mayan gender predictor work compared to the Chinese gender chart?',
    a: 'The Mayan gender system is based on mathematical parity (odd vs. even numbers): compare the mother’s Western age at conception with the Gregorian conception month. If both numbers are even (e.g., 28 and April) or both are odd (e.g., 27 and July), the prediction is a girl. If one is even and one is odd (e.g., 28 and July), it predicts a boy. In contrast, the Chinese gender chart relies on an astronomical lunisolar calendar that converts both dates into Mother’s Lunar Age (虚岁) and the lunar month of conception, reading a 28×12 imperial palace matrix.',
  },
  {
    q: 'Why do the Mayan and Chinese predictors give different results for the same conception date?',
    a: 'The two ancient civilizations developed entirely independent mathematical and calendrical frameworks. The Maya tracked solar and ceremonial Tzolk’in cycles with simple parity arithmetic, whereas the Chinese court tracked lunisolar new moons, intercalary leap months, and Chinese New Year cutoffs. Because their underlying timing cycles do not align, the two calculators disagree on approximately 50% of conception dates.',
  },
  {
    q: 'What does it mean when both the Mayan and Chinese predictors agree (Ancient Synergy)?',
    a: 'When both systems produce the same gender verdict, folklore enthusiasts call it "Ancient Cultural Synergy" or a "Double Folklore Lock." While exciting for expectant parents planning gender reveals, statistical studies confirm that double agreement still carries the exact same ~50/50 biological probability as a single chart or a coin toss.',
  },
  {
    q: 'Is there any clinical medical evidence supporting either the Mayan or Chinese baby predictor?',
    a: 'No. Clinical obstetrics and genetics conclusively prove that baby gender is determined at the instant of fertilization by whether the father’s fertilizing sperm carries an X or Y chromosome. A landmark 2010 Swedish registry study analyzing over 2.8 million births by Villamor et al. demonstrated that Chinese gender chart predictions perform at exactly 50% (chance levels). The only reliable methods to determine fetal sex are clinical: NIPT cell-free fetal DNA blood testing from 10 weeks, or mid-pregnancy ultrasound anatomy scans from 18–20 weeks.',
  },
];

/* ───────────────────────── Phase 2 · Blood Renewal Theory ───────────────────────── */

export interface BloodRenewalToolStrings {
  metaTitle: string; metaDesc: string;
  h1: string; h1Accent: string; lead: string;
  momDobLabel: string; dadDobLabel: string;
  momBloodLossLabel: string; dadBloodLossLabel: string;
  momBloodLossHint: string; dadBloodLossHint: string;
  conceptionDateLabel: string;
  calculateBtn: string; resetBtn: string;
  momTitle: string; dadTitle: string;
  verdictGirl: string; verdictBoy: string; verdictBalanced: string;
  boyWord: string; girlWord: string;
  cycleLengthMom: string; cycleLengthDad: string;
  bloodAgeLabel: string; cycleCompletedLabel: string;
  invalidDates: string; invalidSequence: string; disclaimer: string;
}

export const BLOOD_RENEWAL_STRINGS: BloodRenewalToolStrings & Record<string, string> = {
  metaTitle: 'Blood Renewal Gender Predictor: Youngest Blood Cycle Calculator',
  metaDesc: 'Calculate baby gender using the European blood renewal theory (3-year mother cycle vs 4-year father cycle). Compare blood regeneration ages and discover the hematology facts.',
  h1: 'Blood Renewal Gender Predictor',
  h1Accent: 'Youngest Blood Cycle Calculator',
  lead: 'Explore the traditional European "youngest blood" gender theory: calculate each parent’s cellular regeneration cycle (3 years for women, 4 years for men) at conception, with live progress bars and hematology facts.',
  momDobLabel: '👩 Mother’s Date of Birth',
  dadDobLabel: '👨 Father’s Date of Birth',
  momBloodLossLabel: 'Mother’s Last Major Blood Loss (Optional)',
  dadBloodLossLabel: 'Father’s Last Major Blood Loss (Optional)',
  momBloodLossHint: 'Prior childbirth, surgery, or major trauma resets the 3-year cycle in folklore.',
  dadBloodLossHint: 'Major surgery, donation, or trauma resets the 4-year cycle in folklore.',
  conceptionDateLabel: 'Estimated Conception Date',
  calculateBtn: '🩸 Calculate Blood Renewal Ages',
  resetBtn: '↻ Reset Calculator',
  momTitle: 'Mother’s 3-Year Cycle',
  dadTitle: 'Father’s 4-Year Cycle',
  verdictGirl: '💖 GIRL PREDICTED (Mother’s Blood Is Younger)',
  verdictBoy: '💙 BOY PREDICTED (Father’s Blood Is Younger)',
  verdictBalanced: '⚖️ BALANCED EQUAL BLOOD (50/50 RANDOM CHANCE)',
  boyWord: 'BOY',
  girlWord: 'GIRL',
  cycleLengthMom: '3.0 Years Cycle',
  cycleLengthDad: '4.0 Years Cycle',
  bloodAgeLabel: 'Blood Regeneration Age at Conception',
  cycleCompletedLabel: 'Current Cycle Progress',
  invalidDates: 'Please enter both mother’s DOB, father’s DOB, and conception date.',
  invalidSequence: 'Conception date must take place after both parents’ birth dates.',
  disclaimer: 'Folklore theory only. Hematology fact: human red blood cells live ~120 days in both sexes; fetal sex is determined chromosomally by sperm at fertilization.',
};

export const BLOOD_RENEWAL_FAQ: FaqItem[] = [
  {
    q: 'How does the Blood Renewal Gender Theory calculate baby gender?',
    a: 'According to European folklore dating back centuries, human blood undergoes periodic total renewal: every 3 years for women and every 4 years for men. The theory divides each parent’s age at conception by their cycle length (Mother’s age ÷ 3, Father’s age ÷ 4). The parent with the smaller mathematical remainder has "younger, more renewed blood," which folklore claims dictates the baby’s sex: younger maternal blood predicts a girl, while younger paternal blood predicts a boy.',
  },
  {
    q: 'How do surgeries, blood donations, or prior childbirth affect the calculation?',
    a: 'In traditional folklore variations, significant blood loss events—such as surgical procedures, blood transfusions, substantial donations, or prior vaginal or cesarean childbirth—are believed to trigger a complete blood renewal prematurely. When such an event occurs, practitioners reset the 3- or 4-year cycle clock to the date of that event rather than using the parent’s original date of birth.',
  },
  {
    q: 'Is there any medical or biological truth to the Blood Renewal theory?',
    a: 'No. Modern hematology has disproved the 3-year and 4-year cycle myth. Human red blood cells (erythrocytes) have an average lifespan of approximately 120 days (4 months) regardless of sex, continuously synthesized in bone marrow through erythropoiesis. Furthermore, human sex determination is purely chromosomal: it depends entirely on whether an X-bearing or Y-bearing sperm fertilizes the ovum, which is unrelated to parental blood age.',
  },
  {
    q: 'What are the only clinically validated methods to find out my baby’s sex?',
    a: 'To confirm fetal sex with medical certainty, clinicians utilize non-invasive prenatal testing (NIPT cell-free fetal DNA screening from maternal blood at 10+ weeks, >99% accuracy), mid-trimester ultrasound anatomy evaluation (typically at 18–20 weeks of gestation), or diagnostic genetic testing such as chorionic villus sampling (CVS) or amniocentesis.',
  },
];
