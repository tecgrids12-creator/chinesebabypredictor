/** Export SittingBaby components as standalone public SVG files (for <img> use, e.g. chart cells). */
import { build } from 'esbuild';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

await build({
  entryPoints: ['src/components/calculators/Babies.tsx'],
  bundle: true,
  format: 'esm',
  outfile: 'scripts/.babies-bundle.mjs',
  external: ['react', 'react-dom'],
  jsx: 'automatic',
  platform: 'node',
});

const art = await import(pathToFileURL('scripts/.babies-bundle.mjs').href);

for (const [name, comp] of [
  ['boy', art.BabyBoy],
  ['girl', art.BabyGirl],
]) {
  let svg = renderToStaticMarkup(React.createElement(comp));
  svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  writeFileSync(`public/baby-${name}.svg`, svg);
}
console.log('exported public/baby-boy.svg + public/baby-girl.svg');
