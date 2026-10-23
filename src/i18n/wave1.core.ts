/**
 * Wave-1 additions — English source of truth + tier-2 locales (de, bn, ja,
 * ko, ms, bg, sv). The 11 blog-full locales live in src/i18n/wave1/<locale>.ts
 * (translation passes) and are merged by the aggregator in src/i18n/wave1.ts.
 *
 * Namespaces added:
 * - `predictor` — transparency-drawer value templates + share-sentence atoms
 *   (replaces hard-coded English inside GenderPredictor.tsx)
 * - `trust` — pre-footer E-E-A-T card
 * - `geo.hub5..hub8` — Wave-1 spoke cards in the sitewide ClusterHub
 *
 * {placeholders} are interpolated at render time.
 */
import type { Locale, PartialDictionary } from './translations';

const en: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age}y old at conception',
    stepLunarValue: 'lunar birth year {birth} → lunar conception year {year} = {age} (虚岁)',
    stepMonthValue: '{date} → lunar month {month}',
    stepCellValue: 'row {age} × column {month} → {gender}',
    genderBoy: 'BOY',
    genderGirl: 'GIRL',
    boyWord: 'a boy',
    girlWord: 'a girl',
    leapNote: ' (leap month — see our Runyue guide below)',
    shareText: 'The Chinese Baby Predictor says our lunar age {age} × lunar month {month} points to {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Editorial Review',
    byline: 'Researched and compiled by our Parenting &amp; Lunar Astrology Research Team',
    body: 'Every explanation, chart value and date conversion on this site was researched and compiled by our Parenting &amp; Lunar Astrology Research Team and fact-checked against published demographic studies, including the {studyLink}.',
    studyLinkText: '2010 Swedish population registry analysis (2.8 million births)',
    disclaimerTitle: 'Folklore &amp; medical disclaimer.',
    disclaimerBody: 'The Chinese Baby Predictor is an ancient folkloric tool based on traditional Qing Dynasty lunar methods and is designed strictly for cultural curiosity and entertainment purposes. It does not provide medical diagnosis, fetal sex determination, or reproductive planning. For medically accurate sex determination, consult a licensed healthcare provider regarding ultrasound, Non-Invasive Prenatal Testing (NIPT), or amniocentesis — see the {acogLink} or {medlineLink}.',
    acogLinkText: 'ACOG prenatal testing guidance',
    medlineLinkText: 'MedlinePlus: Prenatal Testing',
  },
  geo: {
    hub5Label: 'IVF &amp; FET Gender Predictor',
    hub5Desc: 'Frozen embryo transfer, fresh IVF and donor-egg chart readings — both dates compared.',
    hub6Label: 'Past Pregnancies Accuracy Tester',
    hub6Desc: 'Test the chart against your actual children — get your family lunar scorecard.',
    hub7Label: '2027 Chinese Gender Calendar',
    hub7Desc: 'Year of the Fire Goat: full lunar month map, the Feb 6 CNY crossover trap and birth-year matrix.',
    hub8Label: '2028 Chinese Gender Calendar',
    hub8Desc: 'Leap 5th-month edition: all 13 lunar months mapped with exact date windows.',
  },
};

const de: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} Jahre alt bei der Empfängnis',
    stepLunarValue: 'Mond-Geburtsjahr {birth} → Mond-Empfängnisjahr {year} = {age} (虚岁)',
    stepMonthValue: '{date} → Mondmonat {month}',
    stepCellValue: 'Zeile {age} × Spalte {month} → {gender}',
    genderBoy: 'JUNGE',
    genderGirl: 'MÄDCHEN',
    boyWord: 'einen Jungen',
    girlWord: 'ein Mädchen',
    leapNote: ' (Schaltmonat — siehe unseren Runyue-Ratgeber unten)',
    shareText: 'Der Chinese Baby Predictor sagt: unser Mondalter {age} × Mondmonat {month} zeigt auf {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Redaktionelle Prüfung',
    byline: 'Recherchiert und erstellt von unserem Eltern- und Mondastrologie-Forschungsteam',
    body: 'Jede Erklärung, jeder Tabellenwert und jede Datumsumrechnung auf dieser Seite wurde von unserem Eltern- und Mondastrologie-Forschungsteam recherchiert und gegen die {studyLink} geprüft.',
    studyLinkText: 'schwedische Bevölkerungsregister-Analyse von 2010 (2,8 Millionen Geburten)',
    disclaimerTitle: 'Folklore- und medizinischer Hinweis.',
    disclaimerBody: 'Der Chinese Baby Predictor ist ein altes folkloristisches Werkzeug auf Basis traditioneller Qing-Dynastie-Mondmethoden und ausschließlich für kulturelle Neugier und Unterhaltung gedacht. Er liefert keine medizinische Diagnose, keine pränatale Geschlechtsbestimmung und keine Familienplanung. Für medizinisch korrekte Angaben zum Geschlecht fragen Sie Ihre Ärztin oder Ihren Arzt zur Ultraschalluntersuchung, zum NIPT (nicht-invasiver Pränataltest) oder zur Amniozentese — siehe {acogLink} oder {medlineLink}.',
    acogLinkText: 'ACOG-Leitlinie zu pränatalen Tests',
    medlineLinkText: 'MedlinePlus: Pränataldiagnostik',
  },
  geo: {
    hub5Label: 'IVF &amp; FET Geschlechtsrechner',
    hub5Desc: 'Kryotransfer, frische IVF und Donor-Egg-Tabellenablesung — beide Daten im Vergleich.',
    hub6Label: 'Tester für frühere Schwangerschaften',
    hub6Desc: 'Prüfen Sie die Tabelle an Ihren echten Kindern — mit Familien-Mondpunktestand.',
    hub7Label: 'Chinesischer Geschlechtskalender 2027',
    hub7Desc: 'Jahr des Feurigen Schafs: vollständige Mondmonat-Karte, die CNY-Falle am 6. Februar und Geburtsjahr-Matrix.',
    hub8Label: 'Chinesischer Geschlechtskalender 2028',
    hub8Desc: 'Schaltmonat-Ausgabe: alle 13 Mondmonate mit exakten Datumsspannen.',
  },
};

const bn: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → সন্তান ধারণের সময় {age} বছর',
    stepLunarValue: 'চন্দ্র জন্মবর্ষ {birth} → চন্দ্র ধারণ-বর্ষ {year} = {age} (虚岁)',
    stepMonthValue: '{date} → চন্দ্র মাস {month}',
    stepCellValue: 'সারি {age} × কলাম {month} → {gender}',
    genderBoy: 'ছেলে',
    genderGirl: 'মেয়ে',
    boyWord: 'ছেলে',
    girlWord: 'মেয়ে',
    leapNote: ' (অধিবর্ষ মাস — নিচে আমাদের Runyue গাইড দেখুন)',
    shareText: 'Chinese Baby Predictor বলছে, আমাদের চন্দ্র বয়স {age} × চন্দ্র মাস {month} {genderWord} নির্দেশ করছে! chinesebabypredictor.com',
  },
  trust: {
    badge: 'সম্পাদকীয় পর্যালোচনা',
    byline: 'আমাদের প্যারেন্টিং ও চন্দ্রজ্যোতিষ রিসার্চ টিম কর্তৃক গবেষিত ও সংকলিত',
    body: 'এই সাইটের প্রতিটি ব্যাখ্যা, টেবিলের মান ও তারিখ রূপান্তর আমাদের প্যারেন্টিং ও চন্দ্রজ্যোতিষ রিসার্চ টিম কর্তৃক গবেষিত এবং {studyLink} সহ প্রকাশিত জনমিতির গবেষণার সঙ্গে মিলিয়ে যাচাই করা।',
    studyLinkText: '২০১০ সালের সুইডিশ পপুলেশন রেজিস্ট্রি বিশ্লেষণ (২৮ লাখ জন্ম)',
    disclaimerTitle: 'লোককাহিনি ও চিকিৎসা সতর্কতা।',
    disclaimerBody: 'Chinese Baby Predictor কিং রাজবংশের ঐতিহ্যবাহী চন্দ্র পদ্ধতির ভিত্তিতে গড়া একটি প্রাচীন লোককাহিনির টুল — কেবল সাংস্কৃতিক কৌতূহল ও বিনোদনের জন্য। এটি চিকিৎসা রোগনির্ণয়, ভ্রূণের লিঙ্গ নির্ধারণ বা প্রজনন পরিকল্পনা দেয় না। চিকিৎসাগতভাবে সঠিক লিঙ্গ নির্ণয়ের জন্য আলট্রাসাউন্ড, NIPT বা অ্যামনিওসেন্টেসিস বিষয়ে অনুমোদিত স্বাস্থ্যসেবাদাতার পরামর্শ নিন — {acogLink} কিংবা {medlineLink} দেখুন।',
    acogLinkText: 'ACOG-এর প্রসবপূর্ব পরীক্ষা নির্দেশিকা',
    medlineLinkText: 'MedlinePlus: প্রসবপূর্ব পরীক্ষা',
  },
  geo: {
    hub5Label: 'IVF ও FET লিঙ্গ পূর্বানুমান',
    hub5Desc: 'ফ্রোজেন এমব্রিও ট্রান্সফার, ফ্রেশ IVF ও ডোনার-ডিম — দুটি তারিখের তুলনা।',
    hub6Label: 'পূর্ববর্তী গর্ভধারণের নির্ভুলতা পরীক্ষক',
    hub6Desc: 'আপনার আসল সন্তানদের বিপরীতে চার্ট পরীক্ষা করুন — পারিবারিক চন্দ্র স্কোরকার্ড নিন।',
    hub7Label: '২০২৭ চীনা লিঙ্গ ক্যালেন্ডার',
    hub7Desc: 'অগ্নি ছাগল বর্ষ: পূর্ণ চন্দ্র মাসের মানচিত্র, ৬ ফেব্রুয়ারির চীনা নববর্ষ ফাঁদ ও জন্মবর্ষ ম্যাট্রিক্স।',
    hub8Label: '২০২৮ চীনা লিঙ্গ ক্যালেন্ডার',
    hub8Desc: 'অধিবর্ষ ৫ম মাস সংস্করণ: ১৩টি চন্দ্র মাসের সঠিক তারিখ-জানালা।',
  },
};

const ja: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → 受胎時の年齢 {age}歳',
    stepLunarValue: '旧暦の出生年 {birth} → 旧暦の受胎年 {year} = {age}（虚岁）',
    stepMonthValue: '{date} → 旧暦 {month} 月',
    stepCellValue: '{age} 行 × {month} 列 → {gender}',
    genderBoy: '男子',
    genderGirl: '女子',
    boyWord: '男の子',
    girlWord: '女の子',
    leapNote: '（閏月 — 下記の閏月ガイドをご覧ください）',
    shareText: 'Chinese Baby Predictor によると、旧暦の年齢 {age} × 旧暦の月 {month} は {genderWord} を示しています！ chinesebabypredictor.com',
  },
  trust: {
    badge: '編集レビュー',
    byline: 'ママ＆月占い研究チームによる調査・作成',
    body: 'このサイトの解説・暦の数値・日付変換はすべて、ママ＆月占い研究チームが調査・作成し、{studyLink}などを含む公刊された人口統計研究と突き合わせて検証しています。',
    studyLinkText: '2010年スウェーデン人口登録データ分析（約280万件の出産）',
    disclaimerTitle: '言い伝え・医学に関する免責事項。',
    disclaimerBody: 'Chinese Baby Predictor は清朝の伝統的な太陰暦に基づく古い民俗占いで、文化的な好奇心と娯楽のためだけのものです。医学的な診断・胎児の性別判定・妊娠計画は提供しません。医学的に正確な性別の確認は、超音波検査・NIPT（母体血胎児染色体検査）・羊水穿刺について、医師にご相談ください — {acogLink} や {medlineLink} をご覧ください。',
    acogLinkText: 'ACOG 出生前検査ガイダンス',
    medlineLinkText: 'MedlinePlus：出生前検査',
  },
  geo: {
    hub5Label: '体外受精・FET 性別予想',
    hub5Desc: '凍結胚移植・新鮮胚・卵子ドナー — 両方の日付を比較。',
    hub6Label: '過去の妊娠 正解テスト',
    hub6Desc: '実際の子供たちでチャートを検証 — 家族のスコアカードを作成。',
    hub7Label: '2027 中文性別カレンダー',
    hub7Desc: '火羊年：旧暦月の全地図、2月6日の旧正月の罠、母親年齢マトリックス。',
    hub8Label: '2028 中文性別カレンダー',
    hub8Desc: '閏5月号：13暦月すべてを正確な日付範囲でマッピング。',
  },
};

const ko: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → 수정 시 {age}세',
    stepLunarValue: '음력 출생 연도 {birth} → 음력 수정 연도 {year} = {age} (虚岁)',
    stepMonthValue: '{date} → 음력 {month}월',
    stepCellValue: '{age}행 × {month}열 → {gender}',
    genderBoy: '남아',
    genderGirl: '여아',
    boyWord: '아들',
    girlWord: '딸',
    leapNote: ' (윤달 — 아래 윤달 가이드를 참고하세요)',
    shareText: 'Chinese Baby Predictor가 말합니다: 음력 나이 {age} × 음력 월 {month}은 {genderWord}을 가리킵니다! chinesebabypredictor.com',
  },
  trust: {
    badge: '편집 리뷰',
    byline: '육아 및 태음역 연구팀이 조사·편찬',
    body: '이 사이트의 모든 설명, 표 값, 날짜 변환은 육아 및 태음역 연구팀이 조사하고 {studyLink} 등 공개된 인구통계 연구와 대조해 검증했습니다.',
    studyLinkText: '2010년 스웨덴 인구등록 분석(280만 건 출생)',
    disclaimerTitle: '속설 및 의학 관련 안내.',
    disclaimerBody: 'Chinese Baby Predictor는 청나라 전통 태음역에 바탕을 둔 옛 민속 도구로, 문화적 호기심과 오락 목적으로만 사용됩니다. 의학적 진단, 태아 성별 판별, 임신 계획을 제공하지 않습니다. 의학적으로 정확한 성별 확인은 초음파, NIPT(비침습 산전 검사), 양수천자에 대해 의사와 상담하세요 — {acogLink} 또는 {medlineLink}를 참고하세요.',
    acogLinkText: 'ACOG 산전 검사 안내',
    medlineLinkText: 'MedlinePlus: 산전 검사',
  },
  geo: {
    hub5Label: 'IVF·FET 성별 예측기',
    hub5Desc: '동결배아 이식, 생체배 이식 및 기증란 표 판독 — 두 날짜 비교.',
    hub6Label: '지난 임신 정확도 테스터',
    hub6Desc: '실제 자녀들로 차트를 검증 — 가족 음력 스코어카드를 받아보세요.',
    hub7Label: '2027 중국 성별 달력',
    hub7Desc: '불염소의 해: 전체 음력월 지도, 2월 6일 새해 함정, 출생연도 매트릭스.',
    hub8Label: '2028 중국 성별 달력',
    hub8Desc: '윤5월 특집: 13개 음력월 전체를 정확한 날짜 창으로 표시.',
  },
};

const ms: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → usia {age} tahun semasa pembentukan',
    stepLunarValue: 'tahun bulan kelahiran {birth} → tahun pembentukan takwim bulan {year} = {age} (虚岁)',
    stepMonthValue: '{date} → bulan qamari {month}',
    stepCellValue: 'baris {age} × lajur {month} → {gender}',
    genderBoy: 'LELAKI',
    genderGirl: 'PEREMPUAN',
    boyWord: 'seorang lelaki',
    girlWord: 'seorang perempuan',
    leapNote: ' (bulan lompat — lihat panduan Runyue kami di bawah)',
    shareText: 'Chinese Baby Predictor kata usia qamari kami {age} × bulan qamari {month} menunjukkan {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Ulasan Editorial',
    byline: 'Diselidiki dan disusun oleh Pasukan Penyelidikan Keibubapaan &amp; Astrologi Bulan kami',
    body: 'Setiap penjelasan, nilai carta dan penukaran tarikh di laman ini diselidiki dan disusun oleh Pasukan Penyelidikan Keibubapaan &amp; Astrologi Bulan kami serta disemak terhadap kajian demografi yang diterbitkan, termasuk {studyLink}.',
    studyLinkText: 'analisis pejabat pendaftaran penduduk Sweden 2010 (2.8 juta kelahiran)',
    disclaimerTitle: 'Penafian folklor dan perubatan.',
    disclaimerBody: 'Chinese Baby Predictor ialah alat folklor kuno berasaskan kaedah bulan tradisi Dinasti Qing dan direka semata-mata untuk ketahanan budaya dan hiburan. Ia tidak memberikan diagnosis perubatan, penentuan jantina fetus atau perancangan reproduktif. Untuk penentuan jantina yang tepat secara perubatan, dapatkan nasihat penyedia penjagaan kesihatan berlesen mengenai imbasan ultrasound, ujian pranatal tidak invasif (NIPT) atau amniosentesis — lihat {acogLink} atau {medlineLink}.',
    acogLinkText: 'panduan ujian pranatal ACOG',
    medlineLinkText: 'MedlinePlus: Ujian Pranatal',
  },
  geo: {
    hub5Label: 'Peramal Jantina IVF &amp; FET',
    hub5Desc: 'Pemindahan embrio beku, kitaran IVF segar dan telur penderma — kedua-dua tarikh dibanding.',
    hub6Label: 'Penguji Tepatan Kehamilan Lepas',
    hub6Desc: 'Uji carta dengan anak-anak sebenar anda — dapatkan skor karterik keluarga.',
    hub7Label: 'Kalendar Jantina Cina 2027',
    hub7Desc: 'Tahun Kambing Api: peta bulan qamari penuh, perangkap Tahun Baru Cina 6 Feb dan matriks tahun kelahiran.',
    hub8Label: 'Kalendar Jantina Cina 2028',
    hub8Desc: 'Edisi bulan lompat ke-5: kesemua 13 bulan qamari dipetakan dengan jendela tarikh tepat.',
  },
};

const bg: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} г. при зачеването',
    stepLunarValue: 'лунна година на раждане {birth} → лунна година на зачеване {year} = {age} (虚岁)',
    stepMonthValue: '{date} → лунен месец {month}',
    stepCellValue: 'ред {age} × колона {month} → {gender}',
    genderBoy: 'МОМЧЕ',
    genderGirl: 'МОМИЧЕ',
    boyWord: 'момче',
    girlWord: 'момиче',
    leapNote: ' (високосен месец — вижте нашето ръководство за Runyue по-долу)',
    shareText: 'Китайският предсказател казва: нашият лунен възраст {age} × лунен месец {month} сочи към {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Редакционна проверка',
    byline: 'Проучено и съставено от нашия екип за изследвания на родителство и лунна астрология',
    body: 'Всяко обяснение, стойност от таблицата и преобразуване на дати на този сайт е проучено и съставено от нашия екип за изследвания на родителство и лунна астрология и е проверено срещу публикувани демографски проучвания, включително {studyLink}.',
    studyLinkText: 'шведският регистър на населението от 2010 г. (2,8 милиона раждания)',
    disclaimerTitle: 'Фолклорно и медицинско опровержение.',
    disclaimerBody: 'Chinese Baby Predictor е древен фолклорен инструмент, основан на традиционните лунни методи от епохата на Цин и е предназначен единствено за културно любопитство и забавление. Той не осигурява медицинска диагноза, определяне на пола на плода или репродуктивно планиране. За медицински точни данни за пола се консултирайте с лицензиран специалист по ултразвук, NIPT (неинвазивно пренатално изследване) или амниоцентеза — вижте {acogLink} или {medlineLink}.',
    acogLinkText: 'ACOG насоки за пренатални изследвания',
    medlineLinkText: 'MedlinePlus: Пренатални изследвания',
  },
  geo: {
    hub5Label: 'IVF и FET предсказател',
    hub5Desc: 'Трансфер на замразени ембриони, свежи IVF китки и яйцеклетки от донор — двата дни са сравнени.',
    hub6Label: 'Тест за предишни бременности',
    hub6Desc: 'П проверете таблицата с вашите деца — получете ваш лунен резултат за семейството.',
    hub7Label: 'Китайски календар за пола 2027',
    hub7Desc: 'Година на огнено козе: пълна карта на лунните месеци, капанът на CNY на 6 февруари и матрица по година на раждане.',
    hub8Label: 'Китайски календар за пола 2028',
    hub8Desc: 'Издание с високосния 5-ти месец: 13-те лунни месеца с точни граници.',
  },
};

const sv: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} år vid befruktningen',
    stepLunarValue: 'månfödelseår {birth} → månkonceptionsår {year} = {age} (虚岁)',
    stepMonthValue: '{date} → månkalendermånad {month}',
    stepCellValue: 'rad {age} × kolumn {month} → {gender}',
    genderBoy: 'POJKE',
    genderGirl: 'FLICKA',
    boyWord: 'en pojke',
    girlWord: 'en flicka',
    leapNote: ' (skottmånad — se vår Runyue-guide nedan)',
    shareText: 'Chinese Baby Predictor säger att vår månålder {age} × månad {month} pekar på {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Redaktionell granskning',
    byline: 'Efterforskad och sammanställd av vårt forskarteam inom föräldraskap &amp; månastrologi',
    body: 'Varje förklaring, tabellvärde och datumkonvertering på den här webbplatsen är efterforskad och sammanställd av vårt forskarteam inom föräldraskap &amp; månastrologi och faktagranskad mot publicerade demografiska studier, däribland {studyLink}.',
    studyLinkText: 'svenska befolkningsregistret 2010 (2,8 miljoner födslar)',
    disclaimerTitle: 'Folklore- och medicinsk varning.',
    disclaimerBody: 'Chinese Baby Predictor är ett forntida folkloristiskt verktyg baserat på traditionella månmetoder från Qingdynastins tid och är enbart avsett för kulturell nyfikenhet och underhållning. Det ger inte medicinsk diagnos, bestämning av barnets kön eller reproduktiv planering. För medicinskt säker könbestämning, rådfråga en legitimerad vårdgivare om ultraljud, NIPT (icke-invasiv prenatal testning) eller fostervattenprov — se {acogLink} eller {medlineLink}.',
    acogLinkText: 'ACOG:s riktlinjer för prenatal testning',
    medlineLinkText: 'MedlinePlus: Prenatal testning',
  },
  geo: {
    hub5Label: 'IVF- och FET-könsprediktor',
    hub5Desc: 'Frusna embryon, färsk IVF och äggdonation — båda datumen jämförs.',
    hub6Label: 'Testare för tidigare graviditeter',
    hub6Desc: 'Testa tabellen mot dina faktiska barn — få din familjs månscore.',
    hub7Label: 'Kinesisk könskalender 2027',
    hub7Desc: 'Eldgetsens år: fullständig månkalenderkarta, fällan vid kinesiska nyåret 6 februari och matris efter födelseår.',
    hub8Label: 'Kinesisk könskalender 2028',
    hub8Desc: 'Skottmånadsutgåvan: alla 13 månkalendermånader med exakta datumsfönster.',
  },
};

export type Wave1Dic = PartialDictionary;

export const WAVE1_CORE: Partial<Record<Locale, PartialDictionary>> = {
  en,
  de,
  bn,
  ja,
  ko,
  ms,
  bg,
  sv,
};
