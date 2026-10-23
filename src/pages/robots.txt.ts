import type { APIRoute } from 'astro';

const SITE = 'https://chinesebabypredictor.com';

/**
 * Production robots.txt: unrestricted crawling for traditional search
 * engines AND generative-AI answer engines (GEO). Astro's sitemap
 * integration emits `sitemap-index.xml` + `sitemap-0.xml`; the post-build
 * `sitemapRoot()` integration (astro.config.mjs) merges every shard into a
 * single flat `/sitemap.xml` containing ALL pages. robots.txt declares both:
 * `sitemap.xml` (full flat list — canonical) and the index (compatibility).
 */
const body = `# chinesebabypredictor.com — full crawl & indexation permissions granted.
# No opt-out headers, no bot challenges: every response is a clean HTTP 200.

### Unrestricted crawling for everyone (the floor for all agents)
User-agent: *
Allow: /

### Classic search engine crawlers (SEO)
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Googlebot-Mobile
User-agent: Bingbot
User-agent: Slurp
User-agent: DuckDuckBot
User-agent: Baiduspider
User-agent: YandexBot
Allow: /

### Generative Engine Optimization (GEO) — AI answer-engine retrieval bots
User-agent: Google-Extended
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Claude-Web
User-agent: anthropic-ai
User-agent: PerplexityBot
User-agent: Bytespider
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Omgilibot
User-agent: FacebookBot
Allow: /

# Sitemap Declaration (flat full sitemap is canonical; index kept for compat)
Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
