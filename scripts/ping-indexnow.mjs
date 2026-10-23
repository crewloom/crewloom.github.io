import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Universal loader for articles without requiring experimental flags
async function loadArticles() {
  const tsContent = fs.readFileSync(path.join(ROOT_DIR, 'data/articles.ts'), 'utf8');
  const jsContent = tsContent
    .replace(/export interface[\s\S]*?\n\}\n/g, '')
    .replace(/: Article\[\]/g, '');
  const dataUri = `data:text/javascript;base64,${Buffer.from(jsContent).toString('base64')}`;
  const mod = await import(dataUri);
  return mod.ARTICLES;
}

const ARTICLES = await loadArticles();

const host = 'crewloom.org';
const key = '6adab85ec7f9e8a1d2b34e5f6a7b8c9d';
const keyLocation = `https://${host}/${key}.txt`;

const dynamicUrls = [
  `https://${host}/`,
  `https://${host}/ar/`,
  `https://${host}/blog/`,
  ...ARTICLES.map((a) => `https://${host}/blog/${a.slug}/`),
  `https://${host}/llms.txt`,
  `https://${host}/llms-full.txt`,
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList: dynamicUrls,
});

console.log(`📡 Submitting ${dynamicUrls.length} dynamic URLs to IndexNow protocol (Bing, Yandex, Seznam, Naver)...`);

const req = https.request(
  'https://api.indexnow.org/IndexNow',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    console.log(`IndexNow HTTP Response: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ Successfully submitted URLs to IndexNow!');
    } else {
      console.log(`ℹ️ IndexNow response code: ${res.statusCode}`);
    }
  }
);

req.on('error', (err) => {
  console.warn('⚠️ IndexNow submission warning:', err.message);
});

req.write(payload);
req.end();
