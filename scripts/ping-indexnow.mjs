import https from 'https';

const host = 'crewloom.org';
const key = '6adab85ec7f9e8a1d2b34e5f6a7b8c9d';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/ar/`,
  `https://${host}/blog/`,
  `https://${host}/blog/introducing-crewloom/`,
  `https://${host}/blog/crewloom-vs-devin-vs-cursor/`,
  `https://${host}/blog/zero-destruction-ast-verification/`,
  `https://${host}/blog/dalil-crewloom-arabic-developer-guide/`,
  `https://${host}/llms.txt`,
  `https://${host}/llms-full.txt`,
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList,
});

console.log('📡 Submitting 9 URLs to IndexNow protocol (Bing, Yandex, Seznam, Naver)...');

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
