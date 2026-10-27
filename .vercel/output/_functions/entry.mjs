import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B_TOgt3P.mjs';
import { manifest } from './manifest_BZssfRXC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-us.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog/_---page_.astro.mjs');
const _page6 = () => import('./pages/blood-renewal-gender-predictor.astro.mjs');
const _page7 = () => import('./pages/chinese-gender-calendar-2027.astro.mjs');
const _page8 = () => import('./pages/chinese-gender-calendar-2028.astro.mjs');
const _page9 = () => import('./pages/chinese-gender-chart.astro.mjs');
const _page10 = () => import('./pages/chinese-gender-planner-ttc.astro.mjs');
const _page11 = () => import('./pages/chinese-gender-predictor.astro.mjs');
const _page12 = () => import('./pages/contact-us.astro.mjs');
const _page13 = () => import('./pages/cusp-conception-date-checker.astro.mjs');
const _page14 = () => import('./pages/due-date-calculator.astro.mjs');
const _page15 = () => import('./pages/gender-planner.astro.mjs');
const _page16 = () => import('./pages/gender-quiz.astro.mjs');
const _page17 = () => import('./pages/ivf-chinese-gender-predictor.astro.mjs');
const _page18 = () => import('./pages/llms.txt.astro.mjs');
const _page19 = () => import('./pages/lunar-age-calculator.astro.mjs');
const _page20 = () => import('./pages/mayan-gender-predictor.astro.mjs');
const _page21 = () => import('./pages/mayan-gender-predictor-calculator.astro.mjs');
const _page22 = () => import('./pages/privacy.astro.mjs');
const _page23 = () => import('./pages/robots.txt.astro.mjs');
const _page24 = () => import('./pages/rss.xml.astro.mjs');
const _page25 = () => import('./pages/sitemap.astro.mjs');
const _page26 = () => import('./pages/terms.astro.mjs');
const _page27 = () => import('./pages/test-past-pregnancies-calculator.astro.mjs');
const _page28 = () => import('./pages/lunar-age-_age_.astro.mjs');
const _page29 = () => import('./pages/_locale_/blog/_slug_.astro.mjs');
const _page30 = () => import('./pages/_locale_/_---slug_.astro.mjs');
const _page31 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-us/index.astro", _page2],
    ["src/pages/api/contact.ts", _page3],
    ["src/pages/blog/[slug]/index.astro", _page4],
    ["src/pages/blog/[...page].astro", _page5],
    ["src/pages/blood-renewal-gender-predictor/index.astro", _page6],
    ["src/pages/chinese-gender-calendar-2027/index.astro", _page7],
    ["src/pages/chinese-gender-calendar-2028/index.astro", _page8],
    ["src/pages/chinese-gender-chart/index.astro", _page9],
    ["src/pages/chinese-gender-planner-ttc/index.astro", _page10],
    ["src/pages/chinese-gender-predictor/index.astro", _page11],
    ["src/pages/contact-us/index.astro", _page12],
    ["src/pages/cusp-conception-date-checker/index.astro", _page13],
    ["src/pages/due-date-calculator/index.astro", _page14],
    ["src/pages/gender-planner/index.astro", _page15],
    ["src/pages/gender-quiz/index.astro", _page16],
    ["src/pages/ivf-chinese-gender-predictor/index.astro", _page17],
    ["src/pages/llms.txt.ts", _page18],
    ["src/pages/lunar-age-calculator/index.astro", _page19],
    ["src/pages/mayan-gender-predictor/index.astro", _page20],
    ["src/pages/mayan-gender-predictor-calculator/index.astro", _page21],
    ["src/pages/privacy/index.astro", _page22],
    ["src/pages/robots.txt.ts", _page23],
    ["src/pages/rss.xml.js", _page24],
    ["src/pages/sitemap/index.astro", _page25],
    ["src/pages/terms/index.astro", _page26],
    ["src/pages/test-past-pregnancies-calculator/index.astro", _page27],
    ["src/pages/lunar-age-[age].astro", _page28],
    ["src/pages/[locale]/blog/[slug]/index.astro", _page29],
    ["src/pages/[locale]/[...slug].astro", _page30],
    ["src/pages/index.astro", _page31]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0e9a0b4e-567e-43dd-a979-09f98d3006f8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
