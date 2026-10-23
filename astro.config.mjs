// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
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
  integrations: [react(), mdx(), sitemap()],
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
