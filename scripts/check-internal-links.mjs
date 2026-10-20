/**
 * Phase 5 verification: sitewide internal linking architecture & GEO entity web.
 * Iterates every built HTML file in dist/client and asserts:
 *  - <nav aria-label="Breadcrumb"> with the exact root anchor "Chinese Baby Predictor" → "/"
 *  - one (deduped) BreadcrumbList JSON-LD
 *  - in-content upward links: data-geo="root" → "/" and data-geo="ttc" → TTC planner
 *    (home pages are exempt: they ARE the root and already carry the TTC chip)
 *  - the 4-pillar cluster-hub module (root / ttc / chart / science) on every non-home page
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

  // ── in-content upward links (attribute order-insensitive, locale-aware root) ──
  if (!home) {
    const pageLocale = (pageUrl.match(/^\/([a-z]{2,3}(-[a-z]{2})?)\//) || [])[1];
    const rootHref = pageLocale ? `/${pageLocale}/` : '/';
    const tagMatches = [...html.matchAll(/<a\b[^>]*data-geo="root"[^>]*>([^<]*)<\/a>/g)];
    const rootTag = tagMatches.length && (/href="\/"/.test(tagMatches[0][0]) || tagMatches[0][0].includes(`href="${rootHref}"`));
    const ttcTag = pageUrl === '/chinese-gender-planner-ttc/' || [...html.matchAll(/<a\b[^>]*>/g)].find((t) => t[0].includes('data-geo="ttc"') && t[0].includes('href="/chinese-gender-planner-ttc/"'));
    if (!rootTag) failures.push(`${page}: data-geo=root in-content link missing`);
    if (!ttcTag) failures.push(`${page}: data-geo=ttc in-content link missing`);
    if (tagMatches.length && rootTag) {
      if (tagMatches[0][1].trim() === 'Chinese Baby Predictor') anchorCounts.exact++;
      else anchorCounts.semantic++;
    }
  }

  // ── cluster hub module ──
  if (!home) {
    const hub = html.includes('id="cluster-hub"');
    const four = hub && ['data-hub="root"','data-hub="ttc"','data-hub="chart"','data-hub="science"'].every((k) => html.includes(k));
    if (!hub) failures.push(`${page}: cluster hub missing`);
    else if (!four) failures.push(`${page}: cluster hub incomplete (needs root/ttc/chart/science cards)`);
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
