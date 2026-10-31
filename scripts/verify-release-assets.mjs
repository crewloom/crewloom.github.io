#!/usr/bin/env node
// Usage: node scripts/verify-release-assets.mjs [tag]   (default: the release marked Latest)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const contract = JSON.parse(fs.readFileSync(new URL('../lib/download-contract.json', import.meta.url), 'utf8'));
const tag = process.argv[2];
const args = ['release', 'view', ...(tag ? [tag] : []), '-R', contract.repo, '--json', 'tagName,assets'];
const release = JSON.parse(execFileSync('gh', args, { encoding: 'utf8' }));
const published = new Set(release.assets.map((a) => a.name));
const missing = Object.values(contract.assets).filter((n) => !published.has(n));
if (missing.length) {
  console.error(`Release ${release.tagName} breaks the download contract; missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`Release ${release.tagName} satisfies the download contract (${published.size} assets).`);
