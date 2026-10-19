/**
 * Build the site's logo + favicon from the downloaded Vecteezy template:
 * - drop the giant gradient background block and the placeholder text rows
 *   (text paths are identified by their true Y bounding box, > 2600)
 * - re-tint to brand palette: deep-purple ink #45024F, brand pinks; tans kept
 * - emit public/baby-logo.svg (transparent) + public/favicon.svg (cream tile)
 */
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('C:/Users/hp/Downloads/vecteezy_minimalist-cute-baby-inspiring-logo-template_14242625.svg', 'utf8');

const paths = [...src.matchAll(/<path\b[\s\S]*?\/>/g)].map((m) => m[0]);
console.log('paths found:', paths.length);

/**
 * Approximate the Y bounding box of an absolute-coordinate path `d` string.
 * Command arg counts: M/L 2, H 1(x), V 1(y), C 6, S 4, Q 4, T 2, A 7 (y at 3&6), Z 0.
 */
function yRange(d) {
  let minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity;
  let cur = null, pending = [];
  const push = (vals) => { for (const v of vals) { if (minX === undefined) minX = v; } };
  // simple walker
  let i = 0;
  const isLetter = (c) => /[a-zA-Z]/.test(c);
  while (i < d.length) {
    const c = d[i];
    if (isLetter(c)) {
      cur = c === 'M' ? 'ML' : c;
      i++;
      continue;
    }
    // read a number
    let j = i;
    while (j < d.length && !isLetter(d[j])) j++;
    const chunk = d.slice(i, j).trim();
    const nums = chunk.match(/-?\d*\.?\d+(?:e-?\d+)?/g)?.map(Number) ?? [];
    if (cur && nums.length) {
      const cmd = cur.toUpperCase();
      if (cmd === 'M' || cmd === 'L' || cmd === 'T') {
        for (let k = 1; k < nums.length; k += 2) { minY = Math.min(minY, nums[k]); maxY = Math.max(maxY, nums[k]); }
        for (let k = 0; k < nums.length; k += 2) { minX = Math.min(minX, nums[k]); maxX = Math.max(maxX, nums[k]); }
      } else if (cmd === 'C') {
        for (let k = 1; k < nums.length; k += 2) { minY = Math.min(minY, nums[k]); maxY = Math.max(maxY, nums[k]); }
        for (let k = 0; k < nums.length; k += 2) { minX = Math.min(minX, nums[k]); maxX = Math.max(maxX, nums[k]); }
      } else if (cmd === 'Q' || cmd === 'S') {
        for (let k = 1; k < nums.length; k += 2) { minY = Math.min(minY, nums[k]); maxY = Math.max(maxY, nums[k]); }
        for (let k = 0; k < nums.length; k += 2) { minX = Math.min(minX, nums[k]); maxX = Math.max(maxX, nums[k]); }
      } else if (cmd === 'V') {
        for (const n of nums) { minY = Math.min(minY, n); maxY = Math.max(maxY, n); }
      } else if (cmd === 'H') {
        for (const n of nums) { minX = Math.min(minX, n); maxX = Math.max(maxX, n); }
      } else if (cmd === 'A') {
        for (let k = 0; k < nums.length; k += 7) {
          if (k + 6 < nums.length) { minY = Math.min(minY, nums[k + 6]); maxY = Math.max(maxY, nums[k + 6]); minX = Math.min(minX, nums[k + 5]); maxX = Math.max(maxX, nums[k + 5]); }
        }
      }
    }
    i = j;
  }
  return { minY, maxY, minX, maxX };
}

const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round((Number(v) / 100) * 255).toString(16).padStart(2, '0')).join('');

const retint = (tag) =>
  tag
    .replace(/fill="(rgb\(([^)]*)\))"/g, (m, _f, inner) => `fill="${rgbToHex(...inner.split(',').map((x) => parseFloat(x)))}"`);

const kept = [], dropped = [];
for (const p of paths) {
  const fill = (p.match(/fill="([^"]*)"/) || [])[1] ?? '';
  if (fill.includes('url(')) { dropped.push('background'); continue; }
  // the Y threshold only makes sense after retinting/identifying text by Y:
  // check the FIRST command-segment numbers conservatively -> use yRange
  const d = (p.match(/ d="([^"]*)"/) || [])[1] ?? '';
  const { minY } = yRange(d);
  if (minY > 2600) { dropped.push(`text minY=${Math.round(minY)}`); continue; }
  kept.push(retint(p));
}
console.log('kept:', kept.length, '| dropped:', dropped.length);
// report drop histogram by fill prefix
const nearBlackDrops = dropped.filter((r) => r.startsWith('text')).length;
console.log('text drops:', nearBlackDrops);

const PALETTE = [];
const applyPalette = (s) => {
  const out = s.replace(/fill="#([0-9a-fA-F]{6})"/g, (m, h) => {
    const hex = h.toLowerCase();
    let mapped = hex;
    if (['100f0d', '0f0e0d', '3f2319'].includes(hex)) mapped = '45024f';
    else if (hex === 'f26378') mapped = 'ee5a97';
    else if (hex === 'f04458') mapped = 'dd2175';
    return `fill="#${mapped}"`;
  });
  return out;
};

const art = applyPalette(kept.join('\n  '));

// global bounding box of the kept art -> tight square viewBox centered on it
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const p of kept) {
  const { minX: x0, maxX: x1, minY: y0, maxY: y1 } = yRange((p.match(/ d="([^"]*)"/) || [])[1] ?? '');
  minX = Math.min(minX, x0); maxX = Math.max(maxX, x1); minY = Math.min(minY, y0); maxY = Math.max(maxY, y1);
}
const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
const side = Math.ceil(Math.max(maxX - minX, maxY - minY) * 1.18);
const vbX = Math.round(cx - side / 2), vbY = Math.round(cy - side / 2);
console.log('art bbox x', Math.round(minX), '-', Math.round(maxX), 'y', Math.round(minY), '-', Math.round(maxY));
console.log('viewBox', vbX, vbY, side, side);

const normalized = (body, tileRoot = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${side} ${side}">${tileRoot ? ` width="${side}" height="${side}"` : ''}\n  ${body}\n</svg>\n`;

writeFileSync('public/baby-logo.svg', normalized(art));

// favicon: cream rounded tile exactly covering the viewBox
const rx = Math.round(side * 0.075);
const tile = `<rect x="${vbX}" y="${vbY}" width="${side}" height="${side}" rx="${rx}" fill="#FEF5F1"/>`;
writeFileSync('public/favicon.svg', normalized(tile + '\n  ' + art));

const kb = (f) => Math.round(readFileSync(f).length / 102.4) / 10;
console.log('baby-logo.svg', kb('public/baby-logo.svg') + 'KB', '| favicon.svg', kb('public/favicon.svg') + 'KB');
