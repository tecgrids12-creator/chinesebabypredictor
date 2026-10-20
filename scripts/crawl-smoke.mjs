/**
 * Crawler smoke test — Phase 4 verification suite.
 * Checks that every traditional + generative user-agent gets a clean HTTP 200
 * with no opt-out headers on the local servers, and reports the live domain.
 * Usage: node scripts/crawl-smoke.mjs [baseUrls...]
 */
const bots = [
  ['Default fetch', undefined],
  ['Googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ['Google-Extended', 'Google-Extended'],
  ['GPTBot', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)'],
  ['PerplexityBot', 'PerplexityBot/1.0'],
  ['ClaudeBot', 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudeai.com/robots)'],
  ['Applebot', 'Applebot/0.1; +http://www.apple.com/go/applebot'],
];

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['http://localhost:4322/', 'http://localhost:4399/'];

let failures = 0;

for (const target of targets) {
  console.log(`\n════ ${target} ════`);
  // 1-5: status per user-agent on the homepage
  for (const [name, ua] of bots) {
    try {
      const res = await fetch(target, { headers: ua ? { 'user-agent': ua } : {}, redirect: 'manual' });
      const body = res.body ? await res.text() : '';
      const blocked = res.status >= 300 || /noindex|captcha|challenge/i.test(body.slice(0, 4000));
      if (blocked) failures++;
      console.log(`${res.status === 200 ? '✅' : '❌'} ${name.padEnd(16)} Status: ${res.status}`);
    } catch (e) {
      failures++;
      console.log(`❌ ${name.padEnd(16)} Fetch failed: ${String(e.cause?.code || e.message)}`);
    }
  }

  // 6: robots.txt availability + content spot check
  try {
    const rb = await fetch(new URL('robots.txt', target));
    const t = await rb.text();
    const hasAll = ['Googlebot', 'Google-Extended', 'GPTBot', 'PerplexityBot', 'Claude-Web', 'Sitemap: '].every((s) => t.includes(s));
    if (!(rb.status === 200 && hasAll)) failures++;
    console.log(`${rb.status === 200 && hasAll ? '✅' : '❌'} robots.txt        Status: ${rb.status} · SEO+GEO bots declared: ${hasAll} · Sitemap: ${/Sitemap: (\S+)/.exec(t)?.[1]}`);
  } catch (e) {
    failures++;
    console.log(`❌ robots.txt        ${e.message}`);
  }

  // 7: unwanted header check
  try {
    const res = await fetch(target);
    const bad = ['X-Robots-Tag', 'X-Tag2', 'cf-mitigated', 'WAF']
      .filter((h) => [...res.headers.keys()].some((k) => k.toLowerCase() === h.toLowerCase()));
    const all = [...res.headers.keys()].join(', ');
    if (bad.length) failures++;
    console.log(`${bad.length ? '❌' : '✅'} headers           No opt-out headers${bad.length ? ' — FOUND: ' + bad.join(', ') : ''} · response headers: ${all}`);
  } catch { /* covered above */ }
}

console.log(`\n${failures === 0 ? '🎉 ALL SMOKE TESTS PASSED' : `⚠️ ${failures} check(s) failed`}`);
process.exit(failures === 0 ? 0 : 1);
