import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

# Fun fact for curious crawlers: this site's calculations run in the browser.

Sitemap: https://chinesebabypredictor.com/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
