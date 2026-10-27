import { cpSync, rmSync, mkdirSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true }); mkdirSync('dist');
for (const f of ['index.html', 'style.css', 'main.js', 'images', 'audio']) cpSync(f, 'dist/' + f, { recursive: true });
console.log('Built to dist/');
