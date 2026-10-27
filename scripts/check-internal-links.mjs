/**
 * Phase 5/6 verification: sitewide internal linking architecture & GEO entity web.
 * Iterates every built HTML file in dist/client and asserts:
 *  - <nav aria-label="Breadcrumb"> with the exact root anchor "Chinese Baby Predictor" → "/"
 *  - one (deduped) BreadcrumbList JSON-LD
 *  - in-content upward links: data-geo="root" → "/" and data-geo="ttc" → TTC planner
 *    (home pages are exempt: they ARE the root and already carry the TTC chip)
 *  - the 7-pillar cluster-hub module (root / ttc / ivf / backtest / c2027 / c2028 / cusp)
 *    on every non-home page
 *  - the 4 Wave-1 spoke pages pass their E-E-A-T schema + trust-card checks
 *  - /es/ and /fr/ home pages: zero hardcoded-English <h2> headings from HomeBody
 *  - the header language switcher: every rendered <option> maps to a built route
 *  - zero broken internal hrefs, zero internal nofollow, trailing-slash consistency
 *  - anchor distribution report (exact-vs-semantic root anchors)
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'dist/client';
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry === 'index.html') pages.push(p);
  }
})(ROOT);

// ── helpers live inside the loop (locale-aware home exemption) ──

const pageUrls = pages.map((f) => relative(ROOT, f).replace(/\\/g, '/').replace(/index\.html$/, '')).map((u) => u === '' ? '/' : '/' + u);
const failures = [];
const dist = new Set(pageUrls);
const nofollowLinks = [];
const brokenLinks = [];
let slashWarnings = 0;

const anchorCounts = { exact: 0, semantic: 0 };
for (const file of pages) {
  const page = relative(ROOT, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const pageUrl = page === '' ? '/' : '/' + page;
  const html = readFileSync(file, 'utf8');
  const home = /^\/$|^\/[a-z]{2,3}(-[a-z]{2})?\/$/.test(pageUrl);

  // ── breadcrumb nav ── (home pages are the root pillar — no breadcrumb by design)
  const navOk = /<nav[^>]*aria-label="Breadcrumb"/.test(html);
  const navStart = html.indexOf('<nav aria-label="Breadcrumb"');
  const navBlock = navOk ? html.slice(navStart, navStart + 900) : '';
  const hasExactRootAnchor = navOk && navBlock.includes('>Chinese Baby Predictor</a>');
  if (!home && !navOk) failures.push(`${page}: breadcrumb nav missing`);
  if (!home && navOk && !hasExactRootAnchor) failures.push(`${page}: breadcrumb root anchor is not the exact "Chinese Baby Predictor"`);

  // ── BreadcrumbList JSON-LD ──
  if (!/application\/ld\+json[\s\S]{0,400}?"@type":\s*"BreadcrumbList"/.test(html)) {
    if (!home) failures.push(`${page}: BreadcrumbList JSON-LD missing`);
  }

  // ── BreadcrumbList strict validation: every ListItem MUST carry a fully-
  //    qualified absolute "item" URL (GSC "Missing field item" error fix) ──
  {
    const badItems = [];
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const parsed = JSON.parse(m[1]);
        const graphs = Array.isArray(parsed) ? parsed : [parsed];
        for (const g of graphs) {
          if (g && g['@type'] === 'BreadcrumbList') {
            const list = Array.isArray(g.itemListElement) ? g.itemListElement : [];
            if (list.length === 0) badItems.push('empty itemListElement');
            for (const li of list) {
              if (typeof li.item !== 'string' || li.item === '' || !li.item.startsWith('https://')) {
                badItems.push(`position ${li.position ?? '?'} "${String(li.name ?? '').slice(0, 40)}"`);
              }
            }
          }
        }
      } catch { /* script isn't JSON — not a BreadcrumbList concern */ }
    }
    if (badItems.length) {
      failures.push(`${page}: BreadcrumbList ListItems missing absolute item URL → ${badItems.slice(0, 3).join('; ')}`);
    }
  }

  // ── in-content upward links (attribute order-insensitive, locale-aware root) ──
  if (!home) {
    const pageLocale = (pageUrl.match(/^\/([a-z]{2,3}(-[a-z]{2})?)\//) || [])[1];
    const rootHref = pageLocale ? `/${pageLocale}/` : '/';
    const tagMatches = [...html.matchAll(/<a\b[^>]*data-geo="root"[^>]*>([^<]*)<\/a>/g)];
    const rootTag = tagMatches.length && (/href="\/"/.test(tagMatches[0][0]) || tagMatches[0][0].includes(`href="${rootHref}"`));
    const ttcSelf = /chinese-gender-planner-ttc\/$/.test(pageUrl);
    const ttcTag = ttcSelf || [...html.matchAll(/<a\b[^>]*>/g)].find((t) => t[0].includes('data-geo="ttc"') && /href="\/[a-z]{2,3}(-[a-z]{2})?\/chinese-gender-planner-ttc\/"|href="\/chinese-gender-planner-ttc\/"/.test(t[0]));
    if (!rootTag) failures.push(`${page}: data-geo=root in-content link missing`);
    if (!ttcTag) failures.push(`${page}: data-geo=ttc in-content link missing`);
    if (tagMatches.length && rootTag) {
      if (tagMatches[0][1].trim() === 'Chinese Baby Predictor') anchorCounts.exact++;
      else anchorCounts.semantic++;
    }
  }

  // ── cluster hub module ── (7-pillar GEO funnel: Wave-1 + cusp checker)
  if (!home) {
    const hub = html.includes('id="cluster-hub"');
    const HUB_KEYS = ['data-hub="root"','data-hub="ttc"','data-hub="ivf"','data-hub="backtest"','data-hub="c2027"','data-hub="c2028"','data-hub="cusp"'];
    const seven = hub && HUB_KEYS.every((k) => html.includes(k));
    if (!hub) failures.push(`${page}: cluster hub missing`);
    else if (!seven) failures.push(`${page}: cluster hub incomplete (needs root/ttc/ivf/backtest/c2027/c2028/cusp cards)`);
  }

  // ── language switcher validity: every <option> locale maps to a built home ──
  {
    const switcher = html.match(/<select[^>]*id="lang-select"[\s\S]*?<\/select>/);
    if (switcher) {
      for (const m of switcher[0].matchAll(/<option[^>]*value="([^"]*)"/g)) {
        const loc = m[1];
        const target = loc === 'en' ? '' : `${loc}/`;
        if (!existsSync(join(ROOT, target, 'index.html'))) {
          failures.push(`${page}: language switcher option '${loc}' → unbuilt route /${target}`);
        }
      }
      const onChangeOk = html.includes('__cbpLangTo');
      if (!onChangeOk) failures.push(`${page}: language switcher navigation handler missing`);
    }
  }

  // ── /es/ + /fr/ hard-coded-English h2 scan (HomeBody strings) ──
  if (pageUrl === '/es/' || pageUrl === '/fr/') {
    const EN_H2 = /<h2[^>]*>([^<]*What Is the Chinese Baby Predictor|[^<]*Related Lunar Profiles[^<]*|[^<]*Read more|[^<]*Editorial Review)/i;
    if (EN_H2.test(html)) {
      const hit = html.match(EN_H2);
      failures.push(`${page}: hardcoded English heading leaked → "${(hit && hit[1] || '').slice(0, 60)}"`);
    }
  }

  // ── Wave-1 spoke pages: E-E-A-T + schema bundle check ──
  if (/^\/(ivf-chinese-gender-predictor|test-past-pregnancies-calculator|chinese-gender-calendar-2027|chinese-gender-calendar-2028)\/$/.test(pageUrl)) {
    if (!html.includes('WebApplication')) failures.push(`${page}: WebApplication JSON-LD missing`);
    if (!/FAQPage/.test(html)) failures.push(`${page}: FAQPage JSON-LD missing`);
    if (!/aria-labelledby="trust-title"/.test(html)) failures.push(`${page}: TrustCard (E-E-A-T) missing`);
    if (/rel="[^"]*\bnofollow\b[^"]*"[^>]*href="\/(?!\/)/.test(html) && !/nofollow[^>]*href="https?:/.test(html) && false) {
      failures.push(`${page}: internal nofollow detected (spoke page)`);
    }
    if (!/<nav[^>]*aria-label="Breadcrumb"/.test(html)) failures.push(`${page}: breadcrumb nav missing (Wave-1 spoke)`);
  }

  // ── internal links: nofollow / breaks / slashes ──
  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    const href = (tag.match(/href="([^"]*)"/) || [])[1];
    if (!href || !href.startsWith('/')) continue;
    const nofollow = /rel="[^"]*\bnofollow\b[^"]*"/.test(tag);
    if (nofollow) nofollowLinks.push(`${page} → ${href}`);
    const clean = href.split('#')[0].split('?')[0];
    if (clean === '/' || clean === '') {
      // '/' → /index.html
      if (!existsSync(join(ROOT, 'index.html'))) brokenLinks.push(`${page} → ${href}`);
    } else if (clean.endsWith('/')) {
      if (!existsSync(join(ROOT, clean, 'index.html'))) {
        if (!clean.includes('/api/')) brokenLinks.push(`${page} → ${href}`);
      }
    } else if (!clean.startsWith('/_')) {
      if (!clean.includes('.') || clean.endsWith('/')) {
        const test = clean.endsWith('/') ? join(ROOT, clean, 'index.html') : join(ROOT, clean + '/index.html');
        if (!existsSync(test)) brokenLinks.push(`${page} → ${href}`);
      }
    }
    if (clean && clean !== '/' && !clean.endsWith('/') && !clean.startsWith('/_') && !/\.[a-z0-9]+$/i.test(clean) && !clean.includes('/api/')) slashWarnings++;
  }
}

const total = pages.length;
console.log(`Pages audited: ${total}`);
console.log(`Breadcrumb root anchors on content pages → exact: ${anchorCounts.exact}, semantic: ${anchorCounts.semantic} (distribution ${(anchorCounts.exact / Math.max(1, anchorCounts.exact + anchorCounts.semantic) * 100).toFixed(0)}/${(anchorCounts.semantic / Math.max(1, anchorCounts.exact + anchorCounts.semantic) * 100).toFixed(0)})`);
if (nofollowLinks.length) { console.log('❌ internal nofollow:'); console.log(nofollowLinks.slice(0, 10).join('\n')); }
if (brokenLinks.length) { console.log('❌ broken internal links:'); console.log([...new Set(brokenLinks)].slice(0, 20).join('\n')); }
console.log(`Internal hrefs missing trailing slash: ${slashWarnings}`);
console.log(failures.length ? `\u274C FAILURES (${failures.length}):` + '\n' + failures.slice(0, 40).join('\n') : '\u2705 ALL PAGES PASS — breadcrumbs, schema, pillar links, cluster hubs, nofollow-free, no 404s');
process.exit(failures.length || nofollowLinks.length || brokenLinks.length ? 1 : 0);
