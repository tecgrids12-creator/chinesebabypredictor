/** Minimal static file server for dist/client (Vercel adapter output). */
import { createServer } from 'node:http';
import { statSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = join(process.cwd(), 'dist', 'client');
const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.webmanifest': 'application/manifest+json',
};

createServer((req, res) => {
  try {
    let path = decodeURIComponent((req.url || '/').split('?')[0]);
    if (path.endsWith('/')) path += 'index.html';
    const target = join(ROOT, path.replace(/^\/+/, ''));
    let file = existsSync(target) && statSync(target).isFile() ? target : null;
    if (!file && !path.endsWith('index.html')) {
      const guess = join(ROOT, path.replace(/^\/+/, ''), 'index.html');
      if (existsSync(guess)) file = guess;
    }
    if (!file) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch (e) {
    res.writeHead(500); res.end('err');
  }
}).listen(4399, () => console.log('dist served on http://localhost:4399'));
