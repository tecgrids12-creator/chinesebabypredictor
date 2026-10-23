// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config

/**
 * Merges every `sitemap-<n>.xml` shard emitted by @astrojs/sitemap into a
 * single flat `sitemap.xml` at the site root after the build. Result:
 *
 *   /sitemap.xml        — full flat sitemap, ALL pages, one canonical URL
 *   /sitemap-index.xml  — Astro's index (kept for compatibility)
 *   /sitemap-0.xml      — Astro's shard feeding the index
 *
 * Registered AFTER `sitemap()` so these files already exist when this
 * post-build hook runs.
 */
function sitemapRoot() {
  /** @returns {import('astro').AstroIntegration} */
  return {
    name: 'sitemap-root',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const fs = await import('node:fs/promises');
        const path = await import('node:path');
        const { fileURLToPath } = await import('node:url');
        const outDir = fileURLToPath(dir); // hook hands us a URL, not a path
        const files = (await fs.readdir(outDir)).filter((f) => /^sitemap-\d+\.xml$/.test(f));
        if (files.length === 0) {
          logger.warn('sitemap-root: no sitemap-* shards found — /sitemap.xml not written');
          return;
        }
        let entries = '';
        for (const file of files.sort()) {
          const xml = await fs.readFile(path.join(outDir, file), 'utf8');
          entries += xml
            .replace(/^[\s\S]*?<urlset[^>]*>/, '') // drop XML prolog + <urlset> opener
            .replace(/<\/urlset>\s*$/, '') // drop <urlset> closer
            .trim();
        }
        const out =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
          entries +
          '</urlset>';
        await fs.writeFile(path.join(outDir, 'sitemap.xml'), out, 'utf8');
        logger.info(`sitemap-root: wrote /sitemap.xml (${(out.match(/<url>/g) || []).length} URLs from ${files.length} shard(s))`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://chinesebabypredictor.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  build: {
    // Inline the (small) CSS bundle into every page: removes the render-blocking
    // stylesheet request, first-paint stable, no FOUC / CLS.
    inlineStylesheets: 'always',
  },
  integrations: [react(), mdx(), sitemap(), sitemapRoot()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            predictor: ['src/components/calculators/GenderPredictor.tsx'],
            'interactive-chart': ['src/components/calculators/InteractiveChart.tsx'],
            'planning-tools': [
              'src/components/calculators/LunarAgeCalculator.tsx',
              'src/components/calculators/GenderPlanner.tsx',
              'src/components/calculators/MayanPredictor.tsx',
              'src/components/calculators/DueDateCalculator.tsx',
            ],
            'wave1-tools': [
              'src/components/calculators/IvfPredictor.tsx',
              'src/components/calculators/PastKidsBacktester.tsx',
              'src/components/calculators/CalendarPlanner.tsx',
            ],
          },
        },
      },
    },
  },
});
