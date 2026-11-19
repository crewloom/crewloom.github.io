import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { metadataFromRelease } from '../scripts/sync-desktop-agent.mjs';

const contract = JSON.parse(readFileSync(new URL('../lib/download-contract.json', import.meta.url)));
const base = `https://github.com/${contract.repo}/releases/download/v1.2.3/`;
const published = {
  tag_name: 'v1.2.3',
  name: 'Desktop release',
  published_at: '2026-01-01T00:00:00Z',
  assets: [{ name: contract.assets.macos, size: 1024, browser_download_url: base + contract.assets.macos }],
};

test('version, published date, size and pinned download come from one public release', () => {
  const meta = metadataFromRelease(published, contract);
  assert.equal(meta.version, '1.2.3');
  assert.equal(meta.dmgSize, 1024);
  assert.equal(meta.downloadUrl, base + contract.assets.macos);
  assert.equal(meta.syncedAt, published.published_at);
});

test('a draft, missing DMG or asset from a different release cannot replace the snapshot', () => {
  assert.throws(() => metadataFromRelease({ ...published, draft: true }, contract), /published desktop release/);
  assert.throws(() => metadataFromRelease({ ...published, assets: [] }, contract), /macOS asset/);
  const wrong = [{ ...published.assets[0], browser_download_url: base.replace('v1.2.3', 'v1.2.2') + contract.assets.macos }];
  assert.throws(() => metadataFromRelease({ ...published, assets: wrong }, contract), /macOS asset/);
});
