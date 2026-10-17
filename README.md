# Chinese Baby Predictor

**chinesebabypredictor.com** — a free, beautifully-designed, honest entertainment site that predicts a baby's sex with the traditional Chinese gender chart, backed by a genuinely accurate lunisolar calendar engine.

## Features

### Tools (all client-side, instant, zero data collection)
| Route | Tool |
| --- | --- |
| `/` | Main **Chinese Gender Predictor** (3 input modes: conception date / due date / last period) with animated confetti reveal + result poll |
| `/chinese-gender-predictor/` | Dedicated predictor landing page (SEO) |
| `/chinese-gender-chart/` | **Interactive 28×12 lunar chart** — tap any cell, exact Gregorian windows, printable |
| `/gender-planner/` | **Boy-or-Girl planning calendar** — the chart read backwards, with real date windows |
| `/lunar-age-calculator/` | Traditional (virtual) lunar age + zodiac |
| `/mayan-gender-predictor/` | Mayan odd/even parity predictor (second folklore method) |
| `/due-date-calculator/` | Naegele's rule due date + trimester + baby zodiacs |
| `/gender-quiz/` | Old wives' tales quiz with verdict meter |

### Accuracy engineering
- Full **1900–2100 lunisolar conversion table** (Hong Kong Observatory-derived dataset from the battle-tested `calendar.js` port) — exact Chinese New Year anchors, month sizes, leap months flagged.
- Lunar age = `(lunar conception year − lunar birth year) + 1`, the traditional 虚岁 rule.
- Leap lunar months mapped to base month **and flagged on results** (most competitors silently ignore them).

### Content & SEO
- Editorial data (`src/content/data/editorial.ts`) drives both page content and FAQPage JSON-LD so they can't drift.
- 16 MDX blog posts (`src/content/blog/`) with Article schema, related-post cross-links, pagination (12/page).
- WebApplication + FAQPage + BreadcrumbList + Organization structured data.
- HTML sitemap (`/sitemap/`), XML sitemap (`/sitemap-index.xml`), `robots.txt`, `llms.txt`, `rss.xml`.
- 18-locale i18n (`/{locale}/…`, en at root, Arabic RTL, English fallback for missing keys).

## Architecture

```
src/
  components/calculators/   # React islands (predictor, chart, planner, quiz, …)
  components/astro/pages/   # Shared page bodies (EN + locale routes reuse them)
  content/                  # MDX blog + editorial data
  content.config.ts         # Astro 5 content-layer collections
  pages/                    # EN routes + [locale]/ dynamic route
  utils/                    # lunar.ts, genderChart.ts, planner.ts, gestation.ts, mayan.ts
theme/
  components/               # Seo, Header, Footer, Breadcrumbs, FAQ accordion…
  i18n/                     # utils + translations (18 locales, EN fallback)
  layouts/BaseLayout.astro
tests/                      # vitest unit tests for lunar math, chart, i18n
```

Stack: **Astro 5 + Tailwind CSS v4 (CSS-first `@theme` tokens in `src/styles/global.css`) + TypeScript strict + React islands + MDX + Vercel adapter**.

## Commands

```bash
npm install        # install deps
npm run dev        # dev server at http://localhost:4321
npm run build      # production build (static + Vercel adapter)
npm run preview    # preview the production build
npm run test       # vitest unit tests
npm run lint       # eslint
```

## Environment variables (see `.env.example`)

- `PUBLIC_SITE_URL` — canonical origin
- `PUBLIC_CONTACT_FORM_KEY` — Web3Forms access key for `/contact-us/`; unset = dev mode (POSTs are logged, not sent)
- `PUBLIC_GOOGLE_VERIFICATION` — Search Console meta token

## Legal notes

Entertainment only — predictions match a coin flip's accuracy and no tool is medical advice. The site never supports prenatal sex determination where it is restricted (e.g. India's PCPNDT Act) and discloses this prominently.
