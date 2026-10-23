import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('out');
const ROOT_DIR = path.resolve('.');

if (!fs.existsSync(OUT_DIR)) {
  console.error('out directory does not exist');
  process.exit(1);
}

// Copy out contents to root for GitHub Pages direct branch root deployment
fs.cpSync(OUT_DIR, ROOT_DIR, {
  recursive: true,
  filter: (src) => {
    const base = path.basename(src);
    return !['node_modules', '.git', '.next'].includes(base);
  },
});

console.log('✅ Exported static files successfully synchronized to root for GitHub Pages.');
