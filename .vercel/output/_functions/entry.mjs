import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_zmmpgE-u.mjs';
import { manifest } from './manifest_RsoNfPgw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-us.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog/_---page_.astro.mjs');
const _page6 = () => import('./pages/chinese-gender-chart.astro.mjs');
const _page7 = () => import('./pages/chinese-gender-predictor.astro.mjs');
const _page8 = () => import('./pages/contact-us.astro.mjs');
const _page9 = () => import('./pages/due-date-calculator.astro.mjs');
const _page10 = () => import('./pages/gender-planner.astro.mjs');
const _page11 = () => import('./pages/gender-quiz.astro.mjs');
const _page12 = () => import('./pages/llms.txt.astro.mjs');
const _page13 = () => import('./pages/lunar-age-calculator.astro.mjs');
const _page14 = () => import('./pages/mayan-gender-predictor.astro.mjs');
const _page15 = () => import('./pages/privacy.astro.mjs');
const _page16 = () => import('./pages/robots.txt.astro.mjs');
const _page17 = () => import('./pages/rss.xml.astro.mjs');
const _page18 = () => import('./pages/sitemap.astro.mjs');
const _page19 = () => import('./pages/terms.astro.mjs');
const _page20 = () => import('./pages/_locale_/_---slug_.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-us/index.astro", _page2],
    ["src/pages/api/contact.ts", _page3],
    ["src/pages/blog/[slug]/index.astro", _page4],
    ["src/pages/blog/[...page].astro", _page5],
    ["src/pages/chinese-gender-chart/index.astro", _page6],
    ["src/pages/chinese-gender-predictor/index.astro", _page7],
    ["src/pages/contact-us/index.astro", _page8],
    ["src/pages/due-date-calculator/index.astro", _page9],
    ["src/pages/gender-planner/index.astro", _page10],
    ["src/pages/gender-quiz/index.astro", _page11],
    ["src/pages/llms.txt.ts", _page12],
    ["src/pages/lunar-age-calculator/index.astro", _page13],
    ["src/pages/mayan-gender-predictor/index.astro", _page14],
    ["src/pages/privacy/index.astro", _page15],
    ["src/pages/robots.txt.ts", _page16],
    ["src/pages/rss.xml.js", _page17],
    ["src/pages/sitemap/index.astro", _page18],
    ["src/pages/terms/index.astro", _page19],
    ["src/pages/[locale]/[...slug].astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d47444e0-9cb2-4c90-a330-e51cef41707c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
