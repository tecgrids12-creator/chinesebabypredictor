/**
 * UI translations for all supported locales.
 * Every locale may define any subset of keys; missing keys fall back to
 * English (deep-merged in `getDictionary`). FAQ / long-form answers are
 * intentionally English-only to guarantee editorial quality.
 */
import type { Locale } from './utils';

export interface Dictionary {
  meta: Record<string, string>;
  nav: Record<string, string>;
  cta: Record<string, string>;
  common: Record<string, string>;
  hero: Record<string, string>;
  predictor: Record<string, string>;
  chart: Record<string, string>;
  planner: Record<string, string>;
  lunarAge: Record<string, string>;
  mayan: Record<string, string>;
  dueDate: Record<string, string>;
  quiz: Record<string, string>;
  footer: Record<string, string>;
}

const en: Dictionary = {
  meta: {
    homeTitle: 'Chinese Baby Predictor: Accurate Lunar Gender Chart & Calculator',
    homeDesc: 'Use our free Chinese baby predictor and interactive lunar calendar. Accurately converts your Gregorian dates to predict baby’s gender instantly.',
    predictorTitle: 'Chinese Gender Predictor 2026 – Boy or Girl Baby Calculator',
    predictorDesc: 'Our accurate Chinese gender predictor converts your dates to the lunar calendar and reads the traditional chart for you. Try the free baby gender calculator now.',
    chartTitle: 'Chinese Gender Chart 2026 – Interactive Boy or Girl Chart',
    chartDesc: 'The complete Chinese gender chart 2026: an interactive, printable lunar age × month grid showing girl and boy predictions for every cell.',
    plannerTitle: 'Conceive a Boy or Girl – Chinese Gender Planning Calendar',
    plannerDesc: 'Planning to conceive? Use the traditional Chinese chart to see which months favour a boy or a girl for your lunar age, with exact date windows.',
    lunarAgeTitle: 'Chinese Lunar Age Calculator – Find Your Virtual Age',
    lunarAgeDesc: 'Calculate your Chinese lunar (virtual) age instantly. Learn why the traditional lunar age is one or two years older than your Western age.',
    mayanTitle: 'Mayan Gender Predictor – Free Odd/Even Baby Calendar',
    mayanDesc: 'Try the Mayan gender predictor: the ancient odd/even calendar method compares your age with the conception year for a fun boy or girl guess.',
    dueTitle: 'Due Date Calculator – Pregnancy Weeks & Baby Zodiac',
    dueDesc: 'Calculate your due date from your last period or conception date, plus gestational weeks, trimester and your baby’s zodiac signs.',
    quizTitle: 'Old Wives’ Tales Gender Quiz – Boy or Girl Predictor',
    quizDesc: 'Cravings, morning sickness, the ring test: answer 12 playful questions and let the old wives’ tales guess if you’re having a boy or a girl.',
    blogTitle: 'Baby Gender Predictions Blog – Guides & Charts',
    blogDesc: 'Guides on the Chinese gender calendar, lunar dates, accuracy myths and every way to guess (and find out) your baby’s sex.',
    aboutTitle: 'About Chinese Baby Predictor',
    contactTitle: 'Contact Us',
  },
  nav: {
    predictor: 'Predictor', chart: 'Gender Chart', planner: 'Planner', lunarAge: 'Lunar Age',
    mayan: 'Mayan', dueDate: 'Due Date', quiz: 'Gender Quiz', blog: 'Blog', menu: 'Menu',
  },
  cta: {
    predict: 'Predict my baby’s gender', tryTools: 'Explore all tools', learnMore: 'Learn more',
    print: 'Print chart', copy: 'Copy result', copied: 'Copied!', shareLink: 'Share',
  },
  common: {
    entertainment: 'For fun & curiosity — not a medical test',
    medicalNote: 'Babies’ sex is set by chromosomes. Only medical tests (NIPT blood test or ultrasound) can confirm it. This site is for entertainment.',
    relatedTools: 'More baby gender tools', readGuide: 'Read the guide', language: 'Language',
    skipToContent: 'Skip to content', backHome: 'Back to home',
  },
  hero: {
    kicker: 'Based on the 700-year-old lunar chart · 2026 edition',
    title: 'Chinese Baby Predictor &',
    titleAccent: 'Lunar Gender Chart',
    subtitle: 'Enter two dates and let the legendary Chinese gender calendar guess who’s on the way — with real lunar-calendar conversion, an interactive chart and a playful planner.',
    trust1: '100% free', trust2: 'No sign-up', trust3: 'Instant result',
  },
  predictor: {
    heading: 'How Does the Chinese Baby Predictor Work?',
    subheading: 'Two dates in, one guess out. The tool converts your dates into the lunar calendar exactly like the traditional chart does.',
    dobLabel: 'Mother’s date of birth',
    dobHint: 'Used to compute your traditional lunar age',
    modeHeading: 'Choose an Option',
    eventHint: 'Used to compute your lunar month of conception',
    modeConception: 'Conception date', modeDue: 'Baby’s due date', modeLmp: 'Last period started',
    conceptionLabel: 'Date of conception', dueLabel: 'Baby’s due date', lmpLabel: 'First day of last period',
    predict: 'Reveal my guess ✨', again: 'Try another date',
    resultHero: 'The lunar calendar guesses…',
    lunarAge: 'Lunar age', lunarMonth: 'Lunar month', zodiac: 'Baby’s zodiac',
    boyTitle: 'It’s a BOY!', girlTitle: 'It’s a GIRL!',
    boyLine: 'The chart points blue — start shortlisting little-man names!',
    girlLine: 'The chart points pink — time to shortlist darling little-girl names!',
    invalid: 'Please make sure both dates are valid.',
    invalidConception: 'The conception date should be after the mother’s date of birth.',
    disclaimer: 'Entertainment only — a 50/50 folk tradition, not medicine.',
    poll: 'Was it right?', pollYes: 'Correct ✓', pollNo: 'Not yet ✗', pollThanks: 'Thanks for sharing!',
    /* top-level dual mode (Phase 1) */
    topPredict: 'Predict Baby’s Gender', topPlan: 'TTC Planning Calendar',
    /* plan mode */
    planWant: 'Desired baby gender', planBoy: 'Boy 💙', planGirl: 'Girl 💗',
    planCompute: 'Find Best Months', planResult: 'Best conception windows in the next 18 months',
    planLeap: 'leap month', planWindow: 'Window', planNone: 'No favourable windows in the next 18 months — open the full planning calendar for other years.',
    planMini: 'Next 18 months at a glance', planBest: 'best to try', planWhite: 'pause',
    /* transparency drawer */
    showCalc: 'Show the Calculation', hideCalc: 'Hide the Calculation',
    stepDob: 'Gregorian DOB → western age at conception',
    stepLunar: 'Chinese New Year conversion → lunar (virtual) age',
    stepMonth: 'Gregorian conception date → lunar month',
    stepCell: 'Coordinate lookup on the Qing Palace chart',
    /* share card */
    shareCard: 'Share Your Result', shareCardSaved: 'CARD SAVED!',
  },
  chart: {
    heading: 'Interactive Chinese Baby Gender Chart',
    subheading: 'Mother’s lunar age (rows) × lunar month of conception (columns). Tap any cell to see the prediction.',
    legendBoy: 'Boy', legendGirl: 'Girl', print: 'Print chart', yourCell: 'Your cell',
    cellHint: 'Cell', monthsLabel: 'Lunar month of conception', agesLabel: 'Mother’s lunar age',
  },
  planner: {
    heading: 'Conceive a Boy or Girl — Planning Calendar',
    subheading: 'Enter the mother’s birthday, choose the gender you’re hoping for, and see which months the chart favours.',
    dobLabel: 'Mother’s date of birth', want: 'Hoping for', boy: 'A boy 🩵', girl: 'A girl 🩷',
    year: 'Planning year', results: 'Favourable windows', none: 'No favourable months in this year — try the other year.',
    compute: 'Compute windows', window: 'Try between', lunarAge: 'Lunar age',
    tip: 'Pick a window above to imagine your perfect month.',
  },
  lunarAge: {
    heading: 'Lunar Age Calculator', subheading: 'Your Western age, translated into the traditional Chinese virtual-age system.',
    dobLabel: 'Your date of birth', asOfLabel: 'Age as of (optional)', compute: 'Compute',
    resultLabel: 'Your lunar age', zodiacLabel: 'Zodiac', lunarDateLabel: 'Lunar date',
    nextNewYearLabel: 'Next Lunar New Year', result: 'Your lunar age',
    birthdayLine: 'Chinese age counts you as 1 at birth, +1 at every Lunar New Year.',
    invalid: 'Please enter a valid date.',
  },
  mayan: {
    heading: 'Mayan Gender Predictor', subheading: 'The Mayan legend compares the parity of the mother’s age with the conception year.',
    rule: 'Odd + odd or even + even → girl · mixed parity → boy',
    dobLabel: 'Mother’s date of birth', conceptionLabel: 'Conception date',
    predict: 'Reveal my guess ✨', again: 'Try another date',
    boyTitle: 'The Mayans guess a boy', girlTitle: 'The Mayans guess a girl',
    ageLabel: 'Age at conception', yearLabel: 'Conception year', parity: 'Parity check',
    invalid: 'Please make sure both dates are valid.',
    disclaimer: 'Entertainment only — a coin-flip tradition, not medicine.',
  },
  dueDate: {
    heading: 'Pregnancy Due Date Calculator', subheading: 'From your last period — or the conception date — to the big day.',
    modeLmp: 'Last period started', modeConception: 'Conception date',
    lmpLabel: 'First day of last period', conceptionLabel: 'Date of conception',
    compute: 'Compute my due date',
    result: 'Your estimated due date', weeks: 'Gestational age right now',
    zodiacLabel: 'Western zodiac', chineseZodiacLabel: 'Chinese zodiac',
    trimester_1: 'First trimester', trimester_2: 'Second trimester', trimester_3: 'Third trimester',
    invalid: 'Please enter a valid date.',
  },
  quiz: {
    heading: 'Old Wives’ Tales Gender Quiz', subheading: 'Cravings, dreams, the ring test — 12 playful clues, one guess.',
    question: 'Question', boySide: 'Team Blue', girlSide: 'Team Pink', restart: 'Play again',
    resultBoy: 'The folklore leans blue — a boy, according to the tales!', resultGirl: 'The folklore leans pink — a girl, according to the tales!',
  },
  footer: {
    tagline: 'Playful lunar-calendar baby gender predictions, made with care and lots of pink & blue confetti.',
    tools: 'Tools', guides: 'Guides', company: 'Company', legal: 'Legal', disclaimer: 'Chinese Baby Predictor is an entertainment website. It is not medical advice and cannot determine the actual sex of a baby — only ultrasound or NIPT testing can. If you’re in India, remember sex determination is illegal (PCPNDT Act); this site never supports it.',
  },
  blog: { readMore: 'Read more', published: 'Published', updated: 'Updated', minutes: 'min read' },
};

/* The type lets any locale define a partial dictionary. */
type PartialDictionary = {
  [K in keyof Dictionary]?: Partial<Dictionary[K]>;
};

const hi: PartialDictionary = {
  meta: {
    homeTitle: 'चाइनीज़ गेंडर प्रेडिक्टर 2026 – लड़का होगा या लड़की? | हिंदी',
    homeDesc: 'फ्री चाइनीज़ गेंडर प्रेडिक्टर: अपनी दो तारीखें डालें और पुराने चंद्र कैलेंडर के अनुसार जानें कि लड़का होगा या लड़की।',
    predictorTitle: 'चाइनीज़ गेंडर प्रेडिक्टर 2026 – नि:शुल्क लड़का/लड़की कैलकुलेटर',
    predictorDesc: 'टूल आपकी तारीखों को चंद्र कैलेंडर में बदलकर और चार्ट देखकर बताता है कि आपका बच्चा लड़का होगा या लड़की।',
    chartTitle: 'चाइनीज़ जेंडर चार्ट 2026 – इंटरैक्टिव चार्ट',
    chartDesc: 'पूरा चाइनीज़ जेंडर चार्ट: चंद्र उम्र × महीने की ग्रिड, हर सेल में लड़के/लड़की का अनुमान।',
    plannerTitle: 'लड़का या लड़की — चाइनीज़ प्लानिंग कैलेंडर',
    plannerDesc: 'जानें आपकी चंद्र उम्र के हिसाब से कौन-से महीने लड़के या लड़की के पक्ष में हैं।',
  },
  nav: {
    predictor: 'प्रेडिक्टर', chart: 'जेंडर चार्ट', planner: 'प्लानर', lunarAge: 'चंद्र उम्र',
    mayan: 'मायन', dueDate: 'ड्यू डेट', quiz: 'क्विज़', blog: 'ब्लॉग', menu: 'मेन्यू',
  },
  cta: { predict: 'मेरे बच्चे का जेंडर जानें ✨', print: 'चार्ट प्रिंट करें', copy: 'परिणाम कॉपी करें', copied: 'कॉपी हो गया!' },
  common: {
    entertainment: 'सिर्फ मनोरंजन — यह कोई मेडिकल टेस्ट नहीं', language: 'भाषा',
    skipToContent: 'सीधे कॉन्टेंट पर जाएँ', relatedTools: 'और बेबी गेंडर टूल्स',
  },
  hero: {
    kicker: '700 साल पुराने चंद्र चार्ट पर आधारित · 2026 संस्करण',
    title: 'आपका बच्चा लड़का है', titleAccent: 'या लड़की?',
    subtitle: 'दो तारीखें डालें और प्रसिद्ध चाइनीज़ जेंडर कैलेंडर से जानें कि आने वाला है कौन — real चंद्र-कैलेंडर गणना के साथ।',
    trust1: 'पूरी तरह फ्री', trust2: 'साइन-अप नहीं', trust3: 'तुरंत नतीजा',
  },
  predictor: {
    heading: 'चाइनीज़ गेंडर प्रेडिक्टर',
    subheading: 'दो तारीखें डालें, एक मजेदार जवाब पाएँ — आपकी तारीखें चंद्र कैलेंडर में बदली जाएंगी।',
    dobLabel: 'माँ की जन्म तिथि', modeHeading: 'विकल्प चुनें', eventHint: 'आपके चंद्र माह की गणना के लिए', modeConception: 'गर्भधारण की तारीख', modeDue: 'बच्चे के आने की तारीख', modeLmp: 'पिछली एम.सी. का पहला दिन',
    conceptionLabel: 'गर्भधारण की तारीख', dueLabel: 'संभावित डिलीवरी की तारीख', lmpLabel: 'पिछली एम.सी. का पहला दिन',
    predict: 'जवाब दिखाएँ ✨', again: 'दोबारा आज़माएँ', resultHero: 'चंद्र कैलेंडर का अनुमान…',
    lunarAge: 'चंद्र उम्र', lunarMonth: 'चंद्र महीना', zodiac: 'बच्चे की राशि',
    boyTitle: 'यह लड़का है!', girlTitle: 'यह लड़की है!', boyLine: 'चार्ट नीला कहता है — बेटे के नाम सोचना शुरू करें!',
    girlLine: 'चार्ट गुलाबी ओर इशारा करता है — बेटी के प्यारे नाम ढूँढें!',
    invalid: 'कृपया दोनों तारीखें सही डालें।', invalidConception: 'गर्भधारण की तारीख जन्म की तारीख के बाद होनी चाहिए।',
    disclaimer: 'सिर्फ मनोरंजन — 50/50 पारंपरिक अनुमान, इलाज नहीं।',
    poll: 'क्या सही निकला?', pollYes: 'सही ✓', pollNo: 'अभी नहीं ✗', pollThanks: 'शेयर करने के लिए धन्यवाद!',
  },
  chart: { heading: 'चाइनीज़ जेंडर चार्ट', legendBoy: 'लड़का', legendGirl: 'लड़की', print: 'प्रिंट चार्ट' },
  planner: { heading: 'लड़का या लड़की — प्लानिंग कैलेंडर', dobLabel: 'माँ की जन्म तिथि', want: 'क्या चाहिए', boy: 'लड़का 🩵', girl: 'लड़की 🩷' },
  lunarAge: { heading: 'चंद्र उम्र कैलकुलेटर', dobLabel: 'आपकी जन्म तिथि' },
  mayan: { heading: 'मायन गेंडर प्रेडिक्टर', dobLabel: 'माँ की जन्म तिथि' },
  dueDate: { heading: 'ड्यू डेट कैलकुलेटर' },
  quiz: { heading: 'पुरानी कहावतों की जेंडर क्विज़' },
  footer: { tagline: 'चंद्र कैलेंडर आधारित मज़ेदार बेबी गेंडर प्रेडिक्शन्स — गुलाबी और नीले कंफ़ेटी के साथ।' },
};

const es: PartialDictionary = {
  meta: {
    homeTitle: 'Predictor del Sexo del Bebé Chino 2026 — ¿Niño o Niña?',
    homeDesc: 'Predictor chino gratuito: introduce tus fechas y descubre si el antiguo calendario lunar predice un niño o una niña. Calculadora de edad lunar incluida.',
    predictorTitle: 'Predictor Chino del Sexo del Bebé 2026 — Calculadora Gratis',
    predictorDesc: 'Nuestro predictor chino convierte tus fechas al calendario lunar y lee el cuadro tradicional por ti. Pruébalo gratis ahora.',
    chartTitle: 'Calendario Chino del Sexo del Bebé 2026 — Cuadro Interactivo',
    chartDesc: 'El cuadro chino completo 2026: cuadrícula interactiva e imprimible de edad lunar × mes con niña o niño en cada casilla.',
  },
  nav: {
    predictor: 'Predictor', chart: 'Cuadro Chino', planner: 'Planificador', lunarAge: 'Edad Lunar',
    mayan: 'Maya', dueDate: 'Fecha Probable', quiz: 'Test', blog: 'Blog', menu: 'Menú',
  },
  cta: { predict: 'Predecir el sexo ✨', print: 'Imprimir cuadro', copy: 'Copiar resultado', copied: '¡Copiado!' },
  common: { entertainment: 'Solo diversión — no es una prueba médica', language: 'Idioma', skipToContent: 'Ir al contenido', relatedTools: 'Más herramientas de bebé' },
  hero: {
    kicker: 'Basado en el cuadro lunar de 700 años · edición 2026',
    title: '¿Será niño', titleAccent: 'o niña?',
    subtitle: 'Introduce dos fechas y deja que el legendario calendario chino adivine quién está en camino — con conversión lunar real y un planificador divertido.',
    trust1: 'Gratis', trust2: 'Sin registro', trust3: 'Resultado al instante',
  },
  predictor: {
    heading: 'Predictor Chino del Sexo del Bebé',
    subheading: 'Dos fechas dentro, una pista fuera: las convertimos al calendario lunar con precisión.',
    dobLabel: 'Fecha de nacimiento de la madre', modeHeading: 'Elige una opción', eventHint: 'Se usa para calcular tu mes lunar', modeConception: 'Fecha de concepción', modeDue: 'Fecha probable del parto', modeLmp: 'Última regla',
    conceptionLabel: 'Fecha de concepción', dueLabel: 'Fecha probable de parto', lmpLabel: 'Primer día del último periodo',
    predict: '¡Revelar! ✨', again: 'Probar otra fecha', resultHero: 'El calendario lunar opina…',
    lunarAge: 'Edad lunar', lunarMonth: 'Mes lunar', zodiac: 'Zodiaco chino',
    boyTitle: '¡Es un NIÑO!', girlTitle: '¡Es una NIÑA!', boyLine: 'El cuadro dice azul: llega el nombre del pequeño.',
    girlLine: 'El cuadro apunta al rosa: prepara nombres preciosos.',
    invalid: 'Verifica que las dos fechas sean válidas.', invalidConception: 'La concepción debe ser posterior al nacimiento de la madre.',
    disclaimer: 'Solo entretenimiento — tradición 50/50, no medicina.',
    poll: '¿Acertó?', pollYes: 'Sí ✓', pollNo: 'Todavía no ✗', pollThanks: '¡Gracias por compartir!',
  },
  chart: { heading: 'El Cuadro Chino del Sexo', legendBoy: 'Niño', legendGirl: 'Niña', print: 'Imprimir cuadro' },
  planner: { heading: 'Calendario para Concebir Niño o Niña', dobLabel: 'Nacimiento de la madre', want: 'Espero', boy: 'Un niño 🩵', girl: 'Una niña 🩷' },
  lunarAge: { heading: 'Calculadora de Edad Lunar', dobLabel: 'Tu fecha de nacimiento' },
  mayan: { heading: 'Predictor Maya', dobLabel: 'Nacimiento de la madre' },
  dueDate: { heading: 'Calculadora de Fecha Probable' },
  quiz: { heading: 'Test de Creencias Populares' },
  footer: { tagline: 'Predicciones lúdicas con calendario lunar, confeti rosa y azul.' },
};

const ru: PartialDictionary = {
  meta: {
    homeTitle: 'Китайский Календарь Пола Ребёнка 2026 — Мальчик или Девочка?',
    homeDesc: 'Бесплатный китайский предсказатель: введите даты и узнайте, кого предсказывает древний лунный календарь — мальчика или девочку.',
    predictorTitle: 'Китайский Календарь Пола Ребёнка 2026 — Бесплатный Калькулятор',
    predictorDesc: 'Точный китайский предсказатель переводит даты в лунный календарь и читает традиционную таблицу за вас.',
    chartTitle: 'Таблица Определения Пола — Интерактивный Календарь 2026',
    chartDesc: 'Полная китайская таблица: сетка «лунный возраст × месяц» с предсказанием в каждой ячейке.',
  },
  nav: {
    predictor: 'Предсказатель', chart: 'Таблица', planner: 'Планировщик', lunarAge: 'Лунный возраст',
    mayan: 'Майя', dueDate: 'Дата родов', quiz: 'Тест', blog: 'Блог', menu: 'Меню',
  },
  cta: { predict: 'Предсказать пол ✨', print: 'Печать таблицы', copy: 'Копировать результат', copied: 'Скопировано!' },
  common: { entertainment: 'Только для веселья — это не медицинский тест', language: 'Язык', skipToContent: 'К содержимому', relatedTools: 'Другие инструменты' },
  hero: {
    kicker: 'По 700-летней лунной таблице · версия 2026',
    title: 'Мальчик или', titleAccent: 'девочка?',
    subtitle: 'Введите две даты — легендарный китайский календарь предположит, кто ждёт вас, с точным лунным пересчётом.',
    trust1: 'Бесплатно', trust2: 'Без регистрации', trust3: 'Мгновенный ответ',
  },
  predictor: {
    heading: 'Китайский Календарь Пола',
    subheading: 'Две даты — один весёлый ответ; даты переводятся в лунный календарь автоматически.',
    dobLabel: 'Дата рождения мамы', modeHeading: 'Выберите вариант', eventHint: 'Нужен для расчёта вашего лунного месяца', modeConception: 'Дата зачатия', modeDue: 'Предполагаемая дата родов', modeLmp: 'Первый день последнего цикла',
    conceptionLabel: 'Дата зачатия', dueLabel: 'Предполагаемая дата родов', lmpLabel: 'Первый день последнего цикла',
    predict: 'Показать ✨', again: 'Попробовать другие даты', resultHero: 'Мнение лунного календаря…',
    lunarAge: 'Лунный возраст', lunarMonth: 'Лунный месяц', zodiac: 'Знак зодиака',
    boyTitle: 'Это МАЛЬЧИК!', girlTitle: 'Это ДЕВОЧКА!', boyLine: 'Таблица говорит «синий» — пора выбирать имя сынишке!',
    girlLine: 'Таблица выбирает розовый — готовьте имя доченьке!',
    invalid: 'Проверьте обе даты.', invalidConception: 'Зачатие должно быть позже дня рождения мамы.',
    disclaimer: 'Только развлечения — фольклор 50/50, не медицина.',
    poll: 'Угадало?', pollYes: 'Да ✓', pollNo: 'Пока нет ✗', pollThanks: 'Спасибо!',
  },
  chart: { heading: 'Традиционная Таблица Пола', legendBoy: 'Мальчик', legendGirl: 'Девочка', print: 'Печатать' },
  planner: { heading: 'Календарь Планирования', dobLabel: 'Дата рождения мамы', want: 'Хочется', boy: 'Мальчик 🩵', girl: 'Девочка 🩷' },
  lunarAge: { heading: 'Калькулятор Лунного Возраста', dobLabel: 'Ваша дата рождения' },
  mayan: { heading: 'Метод Майя', dobLabel: 'Дата рождения мамы' },
  dueDate: { heading: 'Калькулятор Даты Родов' },
  quiz: { heading: 'Тест «Народные приметы»' },
  footer: { tagline: 'Игровые предсказания по лунному календарю — с розовым и синим конфетти.' },
};

const fr: PartialDictionary = {
  meta: {
    homeTitle: 'Prédicteur de Sexe Bébé Chinois 2026 — Garçon ou Fille ?',
    homeDesc: 'Prédicteur chinois gratuit : entrez vos dates et découvrez si l’ancien calendrier lunaire annonce un garçon ou une fille.',
    predictorTitle: 'Prédicteur Chinois du Sexe du Bébé 2026 — Calculateur Gratuit',
    predictorDesc: 'Notre outil convertit vos dates au calendrier lunaire et lit la table traditionnelle pour vous.',
    chartTitle: 'Calendrier Chinois de Grossesse 2026 — Tableau Interactif',
    chartDesc: 'Le tableau chinois complet : grille âge lunaire × mois, interactive et imprimable.',
  },
  nav: { predictor: 'Prédicteur', chart: 'Tableau', planner: 'Planificateur', lunarAge: 'Âge lunaire', mayan: 'Maya', dueDate: 'Date du terme', quiz: 'Quiz', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Prédire ✨', print: 'Imprimer', copy: 'Copier', copied: 'Copié !' },
  common: { entertainment: 'Pour le plaisir — pas un examen médical', language: 'Langue', skipToContent: 'Aller au contenu', relatedTools: 'Autres outils' },
  hero: {
    kicker: 'Basé sur la table lunaire de 700 ans · édition 2026',
    title: 'Garçon…', titleAccent: 'ou fille ?',
    subtitle: 'Entrez deux dates et laissez le légendaire calendrier chinois deviner qui arrive — conversion lunaire réelle.',
    trust1: '100% gratuit', trust2: 'Sans inscription', trust3: 'Résultat instantané',
  },
  predictor: {
    heading: 'Prédicteur Chinois du Sexe du Bébé', subheading: 'Deux dates, une réponse amusante — conversion lunaire automatique.',
    dobLabel: 'Date de naissance de la maman', modeHeading: 'Choisissez une option', eventHint: 'Sert à calculer votre mois lunaire', modeConception: 'Date de conception', modeDue: 'Date prévue de l’accouchement', modeLmp: 'Dernières règles',
    conceptionLabel: 'Date de conception', dueLabel: 'Date prévue du terme', lmpLabel: 'Premier jour des dernières règles',
    predict: 'Révéler ✨', again: 'Essayer d’autres dates', resultHero: 'Le calendrier lunaire pense…',
    lunarAge: 'Âge lunaire', lunarMonth: 'Mois lunaire', zodiac: 'Signe chinois',
    boyTitle: 'C’est un GARÇON !', girlTitle: 'C’est une FILLE !', boyLine: 'La table dit bleu — préparez un joli prénom de garçon !',
    girlLine: 'La table penche rose — place aux jolis prénoms de fille !',
    invalid: 'Vérifiez les deux dates.', invalidConception: 'La conception doit suivre la naissance de la maman.',
    disclaimer: 'Divertissement uniquement — tradition 50/50, pas de médecine.',
    poll: 'C’était juste ?', pollYes: 'Oui ✓', pollNo: 'Pas encore ✗', pollThanks: 'Merci !',
  },
  chart: { heading: 'Le Tableau Chinois', legendBoy: 'Garçon', legendGirl: 'Fille', print: 'Imprimer' },
  planner: { heading: 'Calendrier Garçon ou Fille', dobLabel: 'Naissance de la maman', want: 'Espérances', boy: 'Un garçon 🩵', girl: 'Une fille 🩷' },
  lunarAge: { heading: 'Calculateur d’Âge Lunaire', dobLabel: 'Votre date de naissance' },
  mayan: { heading: 'Prédicteur Maya', dobLabel: 'Naissance de la maman' },
  dueDate: { heading: 'Calcul de la Date du Terme' },
  quiz: { heading: 'Quiz des Recettes de Grand-Mère' },
  footer: { tagline: 'Prédictions ludiques par calendrier lunaire, avec confettis roses et bleus.' },
};

const de: PartialDictionary = {
  meta: {
    homeTitle: 'Chinesischer Geschlechtsrechner 2026 — Junge oder Mädchen?',
    homeDesc: 'Kostenloser chinesischer Baby-Geschlechtsrechner: gib zwei Daten ein und erfahre, was der alte Mondkalender sagt.',
    predictorTitle: 'Chinesischer Geburtskalender 2026 — Junge oder Mädchen Rechner',
    predictorDesc: 'Unser Tool rechnet deine Daten ins Mondjahr um und liest die klassische Tabelle für dich.',
    chartTitle: 'Chinesische Geschlechtstabelle 2026 — Interaktive Tabelle',
    chartDesc: 'Die komplette chinesische Tabelle: Mondalter × Mondmonat als interaktive, druckbare Übersicht.',
  },
  nav: { predictor: 'Rechner', chart: 'Tabelle', planner: 'Planer', lunarAge: 'Mondalter', mayan: 'Maya', dueDate: 'Termin-Rechner', quiz: 'Quiz', blog: 'Blog', menu: 'Menü' },
  cta: { predict: 'Vorhersage zeigen ✨', print: 'Tabelle drucken', copy: 'Ergebnis kopieren', copied: 'Kopiert!' },
  common: { entertainment: 'Nur zum Spaß — kein medizinischer Test', language: 'Sprache', skipToContent: 'Zum Inhalt', relatedTools: 'Weitere Baby-Tools' },
  hero: {
    kicker: 'Basierend auf der 700 Jahre alten Mondtabelle · Ausgabe 2026',
    title: 'Wird es ein Junge', titleAccent: 'oder ein Mädchen?',
    subtitle: 'Zwei Daten eingeben und den legendären chinesischen Kalender raten lassen — mit echter Mondumrechnung.',
    trust1: '100% kostenlos', trust2: 'Keine Anmeldung', trust3: 'Sofortiges Ergebnis',
  },
  predictor: {
    heading: 'Chinesischer Geschlechtsrechner', subheading: 'Zwei Daten rein, eine Antwort raus — automatisch ins Mondjahr umgerechnet.',
    dobLabel: 'Geburtsdatum der Mutter', modeHeading: 'Wähle eine Option', eventHint: 'Wird zur Berechnung deines Mondmonats verwendet', modeConception: 'Zeugungsdatum', modeDue: 'Voraussichtlicher Entbindungstermin', modeLmp: 'Erster Tag der letzten Periode',
    conceptionLabel: 'Zeugungsdatum', dueLabel: 'Entbindungstermin', lmpLabel: 'Erster Tag der letzten Periode',
    predict: 'Aufdecken ✨', again: 'Neues Datum testen', resultHero: 'Der Mondkalender meint…',
    lunarAge: 'Mondalter', lunarMonth: 'Mondmonat', zodiac: 'Chinesisches Sternzeichen',
    boyTitle: 'Es ist ein JUNGE!', girlTitle: 'Es ist ein MÄDCHEN!', boyLine: 'Die Tabelle sagt Blau — die Jungennamen-Kurzliste startet!',
    girlLine: 'Die Tabelle zeigt auf Rosa — los geht’s mit den Mädchennamen!',
    invalid: 'Bitte prüfe beide Daten.', invalidConception: 'Die Zeugung muss nach dem Geburtsdatum der Mutter liegen.',
    disclaimer: 'Nur Unterhaltung — 50/50-Tradition, keine Medizin.',
    poll: 'War es richtig?', pollYes: 'Ja ✓', pollNo: 'Noch nicht ✗', pollThanks: 'Danke!',
  },
  chart: { heading: 'Die chinesische Geschlechtstabelle', legendBoy: 'Junge', legendGirl: 'Mädchen', print: 'Drucken' },
  planner: { heading: 'Junge-oder-Mädchen-Planer', dobLabel: 'Geburtsdatum der Mutter', want: 'Wunsch', boy: 'Ein Junge 🩵', girl: 'Ein Mädchen 🩷' },
  lunarAge: { heading: 'Mondalter-Rechner', dobLabel: 'Dein Geburtsdatum' },
  mayan: { heading: 'Maya-Rechner', dobLabel: 'Geburtsdatum der Mutter' },
  dueDate: { heading: 'Entbindungstermin-Rechner' },
  quiz: { heading: 'Altweibertum-Quiz' },
  footer: { tagline: 'Verspielte Mondkalender-Ratschläge — mit rosa und blauem Konfetti.' },
};

const it: PartialDictionary = {
  meta: {
    homeTitle: 'Calendario Cinese Gravidanza 2026 — Maschio o Femmina?',
    homeDesc: 'Calcolatore gratuito del calendario cinese: inserisci le date e scopri cosa dice l’antico calendario lunare.',
    predictorTitle: 'Calendario Cinese della Gravidanza 2026 — Calcolatore Gratis',
    chartTitle: 'Calendario Cinese 2026 — Tabella Interattiva',
  },
  nav: { predictor: 'Calcolatore', chart: 'Tabella', planner: 'Pianificatore', lunarAge: 'Età lunare', mayan: 'Maya', dueDate: 'Data presunta', quiz: 'Quiz', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Scopri ✨', print: 'Stampa tabella', copy: 'Copia risultato', copied: 'Copiato!' },
  common: { entertainment: 'Solo per divertimento — non è un esame medico', language: 'Lingua', skipToContent: 'Vai al contenuto', relatedTools: 'Altri strumenti' },
  hero: { kicker: 'Basato sulla tabella lunare di 700 anni · edizione 2026', title: 'Maschio o', titleAccent: 'femminuccia?', subtitle: 'Inserisci due date e lascia che il leggendario calendario cinese faccia la sua previsione.', trust1: 'Gratis', trust2: 'Senza registrazione', trust3: 'Risultato immediato' },
  predictor: { heading: 'Calendario Cinese della Gravidanza', dobLabel: 'Data di nascita della mamma', modeConception: 'Data del concepimento', modeDue: 'Data presunta del parto', modeLmp: 'Ultimo ciclo', predict: 'Rivela ✨', again: 'Prova un’altra data', resultHero: 'Il calendario lunare dice…', lunarAge: 'Età lunare', lunarMonth: 'Mese lunare', zodiac: 'Zodiaco cinese', boyTitle: 'È un MASCHIO!', girlTitle: 'È una FEMMINA!', disclaimer: 'Solo intrattenimento.', poll: 'Ha azzeccato?' },
  chart: { heading: 'La tabella cinese', legendBoy: 'Maschio', legendGirl: 'Femmina', print: 'Stampa' },
  planner: { heading: 'Calendario per concepire', dobLabel: 'Nascita della mamma', want: 'Si sogna', boy: 'Un maschietto 🩵', girl: 'Una femminuccia 🩷' },
  lunarAge: { heading: 'Calcolatore di età lunare', dobLabel: 'La tua data di nascita' },
  mayan: { heading: 'Calcolatore Maya', dobLabel: 'Nascita della mamma' },
  dueDate: { heading: 'Calcolatore della data presunta' },
  quiz: { heading: 'Quiz degli antichi detti' },
  footer: { tagline: 'Previzioni giocose con confetti rosa e azzurri.' },
};

const pt: PartialDictionary = {
  meta: {
    homeTitle: 'Calendário Chinês da Gravidez 2026 — Menino ou Menina?',
    homeDesc: 'Calculadora gratuita do calendário chinês: insira as datas e descubra o palpite lunar antigo.',
    predictorTitle: 'Calendário Chinês da Gravidez 2026 — Calculadora Grátis',
    chartTitle: 'Calendário Chinês 2026 — Tabela Interativa',
  },
  nav: { predictor: 'Calculadora', chart: 'Tabela', planner: 'Planejador', lunarAge: 'Idade lunar', mayan: 'Maia', dueDate: 'Data provável', quiz: 'Quiz', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Descobrir ✨', print: 'Imprimir tabela', copy: 'Copiar resultado', copied: 'Copiado!' },
  common: { entertainment: 'Só para diversão — não é exame médico', language: 'Idioma', skipToContent: 'Ir ao conteúdo', relatedTools: 'Mais ferramentas' },
  hero: { kicker: 'Baseado na tabela lunar de 700 anos · edição 2026', title: 'Será menino', titleAccent: 'ou menina?', subtitle: 'Insira duas datas e deixe o lendário calendário chinês arriscar um palpite.', trust1: 'Grátis', trust2: 'Sem cadastro', trust3: 'Resultado na hora' },
  predictor: { heading: 'Calendário Chinês da Gravidez', dobLabel: 'Data de nascimento da mãe', modeConception: 'Data da concepção', modeDue: 'Data provável do parto', modeLmp: 'Primeiro dia da última menstruação', predict: 'Revelar ✨', again: 'Testar outra data', resultHero: 'O calendário lunar acha…', lunarAge: 'Idade lunar', lunarMonth: 'Mês lunar', zodiac: 'Signo chinês', boyTitle: 'É MENINO!', girlTitle: 'É MENINA!', disclaimer: 'Só entretenimento.', poll: 'Acertou?' },
  chart: { heading: 'A tabela chinesa', legendBoy: 'Menino', legendGirl: 'Menina', print: 'Imprimir' },
  planner: { heading: 'Calendário para conceber', dobLabel: 'Nascimento da mãe', want: 'Esperança', boy: 'Um menino 🩵', girl: 'Uma menina 🩷' },
  lunarAge: { heading: 'Calculadora de idade lunar', dobLabel: 'Sua data de nascimento' },
  mayan: { heading: 'Calculadora Maia', dobLabel: 'Nascimento da mãe' },
  dueDate: { heading: 'Calculadora da data provável' },
  quiz: { heading: 'Quiz das crenças antigas' },
  footer: { tagline: 'Palpites divertidos com confete rosa e azul.' },
};

const bn: PartialDictionary = {
  meta: { homeTitle: 'চাইনিজ জেন্ডার প্রেডিক্টর ২০২৬ — ছেলে না মেয়ে?' },
  nav: { predictor: 'প্রেডিক্টর', chart: 'চার্ট', planner: 'প্ল্যানার', lunarAge: 'চান্দ্র বয়স', mayan: 'মায়ান', dueDate: 'প্রসব তারিখ', quiz: 'কুইজ', blog: 'ব্লগ', menu: 'মেনু' },
  cta: { predict: 'ফল দেখুন ✨', print: 'চার্ট প্রিন্ট', copy: 'কপি', copied: 'কপি হয়েছে!' },
  common: { entertainment: 'শুধু মজার জন্য — এটি মেডিকেল টেস্ট নয়', language: 'ভাষা', skipToContent: 'মূল অংশে' },
  hero: { kicker: '৭০০ বছরের পুরনো চান্দ্র চার্টের ভিত্তিতে · ২০২৬', title: 'বাচ্চা ছেলে হবে', titleAccent: 'না মেয়ে?', subtitle: 'দুটি তারিখ দিন, বিখ্যাত চাইনিজ জেন্ডার ক্যালেন্ডার অনুমান করুক।', trust1: 'একদম ফ্রি', trust2: 'সাইন-আপ ছাড়া', trust3: 'সাথে সাথে ফল' },
  predictor: { heading: 'চাইনিজ জেন্ডার প্রেডিক্টর', dobLabel: 'মায়ের জন্ম তারিখ', modeConception: 'গর্ভধারণের তারিখ', modeDue: 'প্রসবের সম্ভাব্য তারিখ', modeLmp: 'শেষ পিরিয়ডের প্রথম দিন', predict: 'আবিষ্কার করুন ✨', again: 'আবার চেষ্টা', resultHero: 'চান্দ্র ক্যালেন্ডার বলছে…', lunarAge: 'চান্দ্র বয়স', lunarMonth: 'চান্দ্র মাস', boyTitle: 'ছেলে হবে!', girlTitle: 'মেয়ে হবে!', disclaimer: 'শুধুই বিনোদন।' },
  chart: { heading: 'চাইনিজ জেন্ডার চার্ট', legendBoy: 'ছেলে', legendGirl: 'মেয়ে', print: 'প্রিন্ট' },
  planner: { heading: 'প্ল্যানিং ক্যালেন্ডার', dobLabel: 'মায়ের জন্ম তারিখ', want: 'প্রত্যাশা', boy: 'ছেলে 🩵', girl: 'মেয়ে 🩷' },
  lunarAge: { heading: 'চান্দ্র বয়স ক্যালকুলেটর', dobLabel: 'আপনার জন্ম তারিখ' },
  mayan: { heading: 'মায়ান প্রেডিক্টর', dobLabel: 'মায়ের জন্ম তারিখ' },
  dueDate: { heading: 'প্রসব তারিখ ক্যালকুলেটর' },
  quiz: { heading: 'প্রবাদের কুইজ' },
  footer: { tagline: 'চান্দ্র ক্যালেন্ডারের মজার অনুমান — গোলাপি-নীল কনফেটি সহ।' },
};

const ja: PartialDictionary = {
  meta: {
    homeTitle: '中国式性別占い 2026 — 男の子？女の子？【無料予想ツール】',
    homeDesc: 'わずか2つの入力で、伝統的な旧暦チャートが男の子か女の子かを予想。対話型チャート・旧暦年齢計算・楽しいプランナー付き。',
    predictorTitle: '中国式 性別予想 2026 — 無料カレンダー＆チャート',
    chartTitle: '中国式チャート 2026 — インタラクティブ表',
  },
  nav: { predictor: '予想ツール', chart: 'チャート', planner: 'プランナー', lunarAge: '旧暦年齢', mayan: 'マヤ式', dueDate: '出産予定日', quiz: 'クイズ', blog: 'ブログ', menu: 'メニュー' },
  cta: { predict: '結果を見る ✨', print: 'チャートを印刷', copy: '結果をコピー', copied: 'コピーしました！' },
  common: { entertainment: '娯楽目的 — 医学的検査ではありません', language: '言語', skipToContent: '本文へ', relatedTools: '他の占いツール' },
  hero: { kicker: '700年の歴史ある旧暦チャート · 2026年版', title: '男の子？', titleAccent: '女の子？', subtitle: '日付を2つ入れるだけで、伝説の中国式カレンダーが予想 — 旧暦変換つき。', trust1: '完全無料', trust2: '登録不要', trust3: '結果はすぐ' },
  predictor: { heading: '中国式 性別予想', dobLabel: 'お母さんの生年月日', modeConception: '受精日の見込', modeDue: '出産予定日', modeLmp: '最終月経日', predict: 'たずねる ✨', again: 'もう一度', resultHero: '旧暦カレンダーの予想…', lunarAge: '旧暦年齢', lunarMonth: '旧暦の月', zodiac: '干支', boyTitle: '男の子！', girlTitle: '女の子！', disclaimer: '娯楽のみ。', poll: '当たってた？', pollYes: '当たり ✓', pollNo: 'まだ ✗' },
  chart: { heading: '中国式チャート', legendBoy: '男の子', legendGirl: '女の子', print: '印刷' },
  planner: { heading: 'プランニングカレンダー', dobLabel: 'お母さんの生年月日', want: '希望', boy: '男の子 🩵', girl: '女の子 🩷' },
  lunarAge: { heading: '旧暦年齢計算', dobLabel: '生年月日' },
  mayan: { heading: 'マヤ式予想', dobLabel: 'お母さんの生年月日' },
  dueDate: { heading: '出産予定日計算' },
  quiz: { heading: 'まさかのジンクスクイズ' },
  footer: { tagline: '旧暦ベースのかわいい性別予想 — ピンクとブルーの紙吹雪つき。' },
};

const ko: PartialDictionary = {
  meta: {
    homeTitle: '중국식 아기 성별 점 2026 — 남자아이? 여자아이?',
    homeDesc: '무료 중국식 성별 점: 날짜 두 개만 넣으면 오래된 음력 달력이 남자아이/여자아이를 추측해 줍니다.',
    predictorTitle: '중국식 아기 성별 점 2026 — 무료 계산기·차트',
    chartTitle: '중국식 성별 차트 2026 — 인터랙티브 표',
  },
  nav: { predictor: '점 보기', chart: '차트', planner: '플래너', lunarAge: '음력 나이', mayan: '마야식', dueDate: '출산 예정일', quiz: '퀴즈', blog: '블로그', menu: '메뉴' },
  cta: { predict: '결과 보기 ✨', print: '차트 인쇄', copy: '복사', copied: '복사됨!' },
  common: { entertainment: '재미용 — 의학 검사가 아닙니다', language: '언어', skipToContent: '본문으로', relatedTools: '다른 도구' },
  hero: { kicker: '700년 전통 음력 차트 기반 · 2026 에디션', title: '남자아이?', titleAccent: '여자아이?', subtitle: '날짜 두 개만 입력하세요 — 전설의 중국식 달력이 추측해 드립니다.', trust1: '완전 무료', trust2: '가입 없이', trust3: '즉시 결과' },
  predictor: { heading: '중국식 아기 성별 점', dobLabel: '엄마 생년월일', modeConception: '수정 날짜', modeDue: '출산 예정일', modeLmp: '마지막 월경일', predict: '점 보기 ✨', again: '다시 시도', resultHero: '음력 달력의 추측…', lunarAge: '음력 나이', lunarMonth: '음력 달', zodiac: '띠', boyTitle: '남자아이!', girlTitle: '여자아이!', disclaimer: '재미용입니다.', poll: '맞았나요?', pollYes: '맞았어요 ✓', pollNo: '아직 ✗' },
  chart: { heading: '중국식 성별 차트', legendBoy: '남자아이', legendGirl: '여자아이', print: '인쇄' },
  planner: { heading: '성별 계획 달력', dobLabel: '엄마 생년월일', want: '바라는 것', boy: '남자아이 🩵', girl: '여자아이 🩷' },
  lunarAge: { heading: '음력 나이 계산', dobLabel: '생년월일' },
  mayan: { heading: '마야식 점', dobLabel: '엄마 생년월일' },
  dueDate: { heading: '출산 예정일 계산' },
  quiz: { heading: '옛말 퀴즈' },
  footer: { tagline: '음력 기반 귀여운 성별 추측 — 분홍·파랑 컨페티와 함께.' },
};

const ms: PartialDictionary = {
  meta: { homeTitle: 'Peramal Jantina Bayi Cina 2026 — Lelaki atau Perempuan?' },
  nav: { predictor: 'Peramal', chart: 'Carta', planner: 'Perancang', lunarAge: 'Umur Lunar', mayan: 'Maya', dueDate: 'Tarikh Jangka', quiz: 'Kuiz', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Tenung ✨', print: 'Cetak carta', copy: 'Salin', copied: 'Disalin!' },
  common: { entertainment: 'Untuk hiburan sahaja — bukan ujian perubatan', language: 'Bahasa', skipToContent: 'Ke kandungan' },
  hero: { kicker: 'Berdasar carta lunar 700 tahun · edisi 2026', title: 'Lelaki', titleAccent: 'atau perempuan?', subtitle: 'Masukkan dua tarikh dan biarkan kalendar Cina legenda lambangkan.', trust1: 'Percuma', trust2: 'Tanda daftar', trust3: 'Keputusan segera' },
  predictor: { heading: 'Peramal Jantung Bayi Cina', dobLabel: 'Tarikh lahir ibu', modeConception: 'Tarikh konsepsi', modeDue: 'Tarikh jangka bersalin', modeLmp: 'Tempoh terakhir', predict: 'Nampak ✨', again: 'Cuba lagi', resultHero: 'Kalendar lunar meneka…', lunarAge: 'Umur lunar', lunarMonth: 'Bulan lunar', boyTitle: 'Anak lelaki!', girlTitle: 'Anak perempuan!', disclaimer: 'Hiburan sahaja.' },
  chart: { heading: 'Carta jantung Cina', legendBoy: 'Lelaki', legendGirl: 'Perempuan', print: 'Cetak' },
  planner: { heading: 'Kalendar perancang', dobLabel: 'Tarikh lahir ibu', want: 'Harapan', boy: 'Lelaki 🩵', girl: 'Perempuan 🩷' },
  lunarAge: { heading: 'Kira umur lunar', dobLabel: 'Tarikh lahir anda' },
  mayan: { heading: 'Peramal Maya', dobLabel: 'Tarikh lahir ibu' },
  dueDate: { heading: 'Kira tarikh jangka' },
  quiz: { heading: 'Kuiz kepercayaan lama' },
  footer: { tagline: 'Tekaan berbanding kalendar lunar — konfeti merah jambu dan biru.' },
};

const pl: PartialDictionary = {
  meta: {
    homeTitle: 'Chiński Kalendarz Płci Dziecka 2026 — Chłopiec czy Dziewczynka?',
    homeDesc: 'Darmowy chiński predyktor płci: wpisz daty i sprawdź, co mówi stary lunarny kalendarz.',
    chartTitle: 'Chińska tabelka płci 2026 — interaktywna',
  },
  nav: { predictor: 'Predyktor', chart: 'Tabelka', planner: 'Planer', lunarAge: 'Wiek księżycowy', mayan: 'Maja', dueDate: 'Termin porodu', quiz: 'Quiz', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Powiedz ✨', print: 'Drukuj tabelkę', copy: 'Kopiuj wynik', copied: 'Skopiowano!' },
  common: { entertainment: 'Tylko dla zabawy — to nie test medyczny', language: 'Język', skipToContent: 'Do treści' },
  hero: { kicker: 'Na bazie 700-letniej tabeli księżycowej · wydanie 2026', title: 'Chłopiec czy', titleAccent: 'dziewczynka?', subtitle: 'Wpisz dwie daty i pozwól legendarnemu kalendarzowi chińskiemu zdradzić sekret.', trust1: 'Darmowe', trust2: 'Bez rejestracji', trust3: 'Natychmiastowy wynik' },
  predictor: { heading: 'Chiński predyktor płci', dobLabel: 'Data urodzenia mamy', modeConception: 'Data poczęcia', modeDue: 'Przewidywany termin porodu', modeLmp: 'Pierwszy dzień ostatniej miesiączki', predict: 'Pokaż ✨', again: 'Spróbuj innej daty', resultHero: 'Kalendarz księżycowy podejrzewa…', lunarAge: 'Wiek księżycowy', lunarMonth: 'Miesiąc księżycowy', boyTitle: 'To CHŁOPIEC!', girlTitle: 'To DZIEWCZYNKA!', disclaimer: 'Tylko rozrywka.', poll: 'Udało się?' },
  chart: { heading: 'Chińska tabelka', legendBoy: 'Chłopiec', legendGirl: 'Dziewczynka', print: 'Drukuj' },
  planner: { heading: 'Kalendarz planowania', dobLabel: 'Urodziny mamy', want: 'Marzenie', boy: 'Chłopiec 🩵', girl: 'Dziewczynka 🩷' },
  lunarAge: { heading: 'Kalkulator wieku księżycowego', dobLabel: 'Twoja data urodzenia' },
  mayan: { heading: 'Predyktor Majów', dobLabel: 'Urodziny mamy' },
  dueDate: { heading: 'Kalkulator terminu porodu' },
  quiz: { heading: 'Quiz przesądów' },
  footer: { tagline: 'Zabawne przepowiednie kalendarza księżycowego — z różowo-niebieskim confetti.' },
};

const id: PartialDictionary = {
  meta: { homeTitle: 'Kalender Cina Penentu Jender Bayi 2026 — Cowok atau Cewek?' },
  nav: { predictor: 'Prediktor', chart: 'Tabel', planner: 'Perencana', lunarAge: 'Umur Cina', mayan: 'Maya', dueDate: 'Perkiraan Lahir', quiz: 'Kuis', blog: 'Blog', menu: 'Menu' },
  cta: { predict: 'Tunjukkan ✨', print: 'Cetak tabel', copy: 'Salin', copied: 'Tersalin!' },
  common: { entertainment: 'Untuk kesenangan — bukan tes medis', language: 'Bahasa', skipToContent: 'Ke konten' },
  hero: { kicker: 'Berdasar tabel bulan 700 tahun · edisi 2026', title: 'Cowok atau', titleAccent: 'cewek?', subtitle: 'Masukkan dua tanggal dan biarkan kalender Cina legendaris menebak.', trust1: 'Gratis', trust2: 'Tanpa daftar', trust3: 'Hasil instan' },
  predictor: { heading: 'Prediktor Jender Bayi Cina', dobLabel: 'Tanggal lahir ibu', modeConception: 'Tanggal pembuahan', modeDue: 'Perkiraan persalinan', modeLmp: 'Hari pertama menstruasi terakhir', predict: 'Buka ✨', again: 'Coba tanggal lain', resultHero: 'Kalender lunar menebak…', lunarAge: 'Umur Cina', lunarMonth: 'Bulan Lunar', boyTitle: 'Anak laki-laki!', girlTitle: 'Anak perempuan!', disclaimer: 'Hanya hiburan.' },
  chart: { heading: 'Tabel Cina', legendBoy: 'Laki-laki', legendGirl: 'Perempuan', print: 'Cetak' },
  planner: { heading: 'Kalender merencanakan', dobLabel: 'Lahir ibu', want: 'Harapan', boy: 'Laki-laki 🩵', girl: 'Perempuan 🩷' },
  lunarAge: { heading: 'Kalkulator umur cina', dobLabel: 'Tanggal lahir Anda' },
  mayan: { heading: 'Prediktor Maya', dobLabel: 'Lahir ibu' },
  dueDate: { heading: 'Kalkulator hari persalinan' },
  quiz: { heading: 'Kuis kepercayaan lama' },
  footer: { tagline: 'Tebakan kalender lunar yang seru — dengan confetti merah muda dan biru.' },
};

const ar: PartialDictionary = {
  meta: {
    homeTitle: 'حاسبة جنس المولد الصينية 2026 — ولد أم بنت؟',
    homeDesc: 'توقع جنس المولد بالتقويم القمري الصيني المجاني: أدخل تاريخين واكتشف ما يقوله الجدول القديم.',
    chartTitle: 'الجدول الصيني 2026 — تفاعلي وقابل للطبع',
  },
  nav: { predictor: 'الحاسبة', chart: 'الجدول', planner: 'المخطط', lunarAge: 'العمر القمري', mayan: 'المايا', dueDate: 'موعد الولادة', quiz: 'اختبار', blog: 'المدونة', menu: 'القائمة' },
  cta: { predict: 'اكتشف ✨', print: 'اطبع الجدول', copy: 'انسخ النتيجة', copied: 'تم النسخ!' },
  common: { entertainment: 'للمتعة فقط — ليس فحصاً طبياً', language: 'اللغة', skipToContent: 'إلى المحتوى' },
  hero: { kicker: 'مبني على الجدول القمري عمره 700 عام · إصدار 2026', title: 'ولد…', titleAccent: 'أم بنت؟', subtitle: 'أدخل تاريخين ودع التقويم الصيني الأسطوري يخمّن من قادم.', trust1: 'مجاني', trust2: 'بدون تسجيل', trust3: 'نتيجة فورية' },
  predictor: { heading: 'حاسبة جنس المولد الصينية', dobLabel: 'تاريخ ميلاد الأم', modeConception: 'تاريخ الحمل', modeDue: 'موعد الولادة المتوقع', modeLmp: 'أول يوم للدورة الأخيرة', predict: 'اكشف ✨', again: 'جرّب تاريخاً آخر', resultHero: 'التقويم القمري يرى…', lunarAge: 'العمر القمري', lunarMonth: 'الشهر القمري', boyTitle: 'إنه ولد!', girlTitle: 'إنها بنت!', disclaimer: 'للمتعة فقط.', poll: 'هل أصاب؟', pollYes: 'نعم ✓', pollNo: 'ليس بعد ✗' },
  chart: { heading: 'الجدول الصيني', legendBoy: 'ولد', legendGirl: 'بنت', print: 'طبع' },
  planner: { heading: 'جدول التخطيط', dobLabel: 'مواليد الأم', want: 'الأمل', boy: 'ولد 🩵', girl: 'بنت 🩷' },
  lunarAge: { heading: 'حاسبة العمر القمري', dobLabel: 'تاريخ ميلادك' },
  mayan: { heading: 'حاسبة المايا', dobLabel: 'مواليد الأم' },
  dueDate: { heading: 'حاسبة موعد الولادة' },
  quiz: { heading: 'اختبار المعتقدات القديمة' },
  footer: { tagline: 'تنبؤات قمرية ممتعة — مع قصاصات وردية وزرقاء.' },
};

const bg: PartialDictionary = {
  meta: { homeTitle: 'Китайски Календар за Пола на Бебето 2026 — Момче или Момиче?' },
  nav: { predictor: 'Прогноза', chart: 'Таблица', planner: 'Планер', lunarAge: 'Лунна възраст', mayan: 'Мая', dueDate: 'Срок', quiz: 'Квиз', blog: 'Блог', menu: 'Меню' },
  cta: { predict: 'Покажи ✨', print: 'Печат', copy: 'Копирай', copied: 'Копирано!' },
  common: { entertainment: 'Само за забавление — не е медицински тест', language: 'Език', skipToContent: 'Към съдържанието' },
  hero: { kicker: 'По 700-годишната лунна таблица · издание 2026', title: 'Момче или', titleAccent: 'момиче?', subtitle: 'Въведете две дати и позволете на легендарния китайски календар да отгатне.', trust1: 'Безплатно', trust2: 'Без регистрация', trust3: 'Мигновен резултат' },
  predictor: { heading: 'Китайска прогноза за пола', dobLabel: 'Рождена дата на майката', modeConception: 'Дата на зачеване', modeDue: 'Очакван срок', modeLmp: 'Първи ден на последния цикъл', predict: 'Разкрий ✨', again: 'Опитайте друга дата', resultHero: 'Лунният календар предполага…', lunarAge: 'Лунна възраст', lunarMonth: 'Лунен месец', boyTitle: 'Това е МОМЧЕ!', girlTitle: 'Това е МОМИЧЕ!', disclaimer: 'Само за развлечение.' },
  chart: { heading: 'Китайската таблица', legendBoy: 'Момче', legendGirl: 'Момиче', print: 'Печат' },
  planner: { heading: 'Календар за планиране', dobLabel: 'Рождена дата на майката', want: 'Желание', boy: 'Момче 🩵', girl: 'Момиче 🩷' },
  lunarAge: { heading: 'Калкулатор за лунна възраст', dobLabel: 'Вашата рождена дата' },
  mayan: { heading: 'Метод на маите', dobLabel: 'Рождена дата на майката' },
  dueDate: { heading: 'Калкулатор на срока' },
  quiz: { heading: 'Квиз с народни поверия' },
  footer: { tagline: 'Забавни лунни предсказания — с розово и синьо конфети.' },
};

const tr: PartialDictionary = {
  meta: {
    homeTitle: 'Çin Cinsiyet Hesaplama 2026 — Erkek mi Kız mı?',
    homeDesc: 'Ücretsiz Çin cinsiyet hesaplama aracı: iki tarih girin ve eski ay takvimi ne diyor, öğrenin.',
    chartTitle: 'Çin Cinsiyet Tablosu 2026 — İnteraktif Tablo',
  },
  nav: { predictor: 'Hesaplayıcı', chart: 'Tablo', planner: 'Planlayıcı', lunarAge: 'Ay yaşı', mayan: 'Maya', dueDate: 'Doğum tarihi', quiz: 'Sınav', blog: 'Blog', menu: 'Menü' },
  cta: { predict: 'Keşfet ✨', print: 'Tabloyu yazdır', copy: 'Kopyala', copied: 'Kopyalandı!' },
  common: { entertainment: 'Sadece eğlence — tıbbi test değildir', language: 'Dil', skipToContent: 'İçeriğe git' },
  hero: { kicker: '700 yıllık ay takvimi tablosuna dayanır · 2026 sürümü', title: 'Erkek mi', titleAccent: 'kız mı?', subtitle: 'İki tarih girin; efsanevi Çin takvimi tahmin etsin.', trust1: 'Ücretsiz', trust2: 'Kayıt yok', trust3: 'Anında sonuç' },
  predictor: { heading: 'Çin Cinsiyet Hesaplama', dobLabel: 'Anne doğum tarihi', modeConception: 'Gebelik tarihi', modeDue: 'Doğum tarihi', modeLmp: 'Son adet tarihi', predict: 'Aç ✨', again: 'Başka tarih dene', resultHero: 'Ay takvimi diyor ki…', lunarAge: 'Ay yaşı', lunarMonth: 'Ay ayı', boyTitle: 'ERKEK!', girlTitle: 'KIZ!', disclaimer: 'Sadece eğlence.' },
  chart: { heading: 'Çin cinsiyet tablosu', legendBoy: 'Erkek', legendGirl: 'Kız', print: 'Yazdır' },
  planner: { heading: 'Planlama takvimi', dobLabel: 'Anne doğum tarihi', want: 'Dileğin', boy: 'Erkek 🩵', girl: 'Kız 🩷' },
  lunarAge: { heading: 'Ay yaşı hesaplayıcı', dobLabel: 'Doğum gününüz' },
  mayan: { heading: 'Maya hesaplayıcı', dobLabel: 'Anne doğum tarihi' },
  dueDate: { heading: 'Doğum tarihi hesaplayıcı' },
  quiz: { heading: 'Batıl inanç testi' },
  footer: { tagline: 'Ay takvimini temelli eğlenceli tahminler — pembe/mavi konfetiler.' },
};

const sv: PartialDictionary = {
  meta: {
    homeTitle: 'Kinesisk Könskalender 2026 — Pojk eller Flicka?',
    homeDesc: 'Gratis kinesisk könsprognos: mata in två datum och se vad den gamla månkalendern svarar.',
    chartTitle: 'Kinesisk könstabell 2026 — interaktiv',
  },
  nav: { predictor: 'Prognos', chart: 'Tabell', planner: 'Planerare', lunarAge: 'Månålder', mayan: 'Maya', dueDate: 'Beräknad tid', quiz: 'Quiz', blog: 'Blogg', menu: 'Meny' },
  cta: { predict: 'Visa ✨', print: 'Skriv ut tabellen', copy: 'Kopiera', copied: 'Kopierad!' },
  common: { entertainment: 'Bara för nöjes skull — inget medicinskt test', language: 'Språk', skipToContent: 'Till innehållet' },
  hero: { kicker: 'Baserad på den 700-åriga månkalendern · utgåva 2026', title: 'Pojke eller', titleAccent: 'flicka?', subtitle: 'Mata in två datum och låt den legendariska kinesiska kalendern gissa.', trust1: 'Kostnadsfri', trust2: 'Ingen registrering', trust3: 'Direkt svar' },
  predictor: { heading: 'Kinesisk könsprognos', dobLabel: 'Mammans födelsedatum', modeConception: 'Konceptionsdag', modeDue: 'Beräknad förlossning', modeLmp: 'Sen mens första dag', predict: 'Visa ✨', again: 'Prova annat datum', resultHero: 'Månkalendern anar…', lunarAge: 'Månålder', lunarMonth: 'Månad', boyTitle: 'Det blir en POJKE!', girlTitle: 'Det blir en FLICKA!', disclaimer: 'Endast underhållning.' },
  chart: { heading: 'Den kinesiska tabellen', legendBoy: 'Pojke', legendGirl: 'Flicka', print: 'Skriv ut' },
  planner: { heading: 'Planeringskalender', dobLabel: 'Mammans födelsedag', want: 'Önskan', boy: 'Pojk 🩵', girl: 'Flicka 🩷' },
  lunarAge: { heading: 'Månålderskalkylator', dobLabel: 'Ditt födelsedatum' },
  mayan: { heading: 'Maya-prognos', dobLabel: 'Mammans födelsedag' },
  dueDate: { heading: 'Beräkna förlossning' },
  quiz: { heading: 'Gummans visor-quiz' },
  footer: { tagline: 'Lekfulla månkalender-gissningar — med rosa och blått konfetti.' },
};

const TRANSLATIONS: Record<Locale, PartialDictionary | Dictionary> = {
  en, hi, es, ru, fr, de, it, pt, bn, ja, ko, ms, pl, id, ar, bg, tr, sv,
};

/** Recursive fallback merge: locale values win, English fills the gaps. */
function mergeFallback<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (typeof base === 'object' && base !== null) {
    const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      merged[key] = mergeFallback((base as Record<string, unknown>)[key], value);
    }
    return merged as T;
  }
  return override as T;
}

/** Get the full dictionary for a locale with English fallback. */
export function getDictionary(locale: Locale): Dictionary {
  return mergeFallback(en, TRANSLATIONS[locale] ?? {});
}
