import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseReleaseAssets, selectReleaseAsset } from '../lib/release-assets.ts';

function asset(name, id = 1) {
  return { id, name, size: 1024, browser_download_url: `https://github.com/example/releases/${name}`, content_type: 'application/octet-stream' };
}
test('ARM-only releases cannot serve Intel and ambiguous DMGs are not guessed', () => {
  const assets = parseReleaseAssets([asset('Crewloom_arm64.dmg'), asset('Crewloom.dmg', 2)]);
  assert.equal(selectReleaseAsset(assets, 'macos-x64'), undefined);
  assert.equal(selectReleaseAsset(assets, 'macos-arm64')?.name, 'Crewloom_arm64.dmg');
});
test('architecture selection is independent of asset order', () => {
  for (const names of [['Crewloom_x64.dmg', 'Crewloom_arm64.dmg'], ['Crewloom_arm64.dmg', 'Crewloom_x64.dmg']]) {
    const assets = parseReleaseAssets(names.map(asset));
    assert.equal(selectReleaseAsset(assets, 'macos-x64')?.name, 'Crewloom_x64.dmg');
    assert.equal(selectReleaseAsset(assets, 'macos-arm64')?.name, 'Crewloom_arm64.dmg');
  }
});
test('explicit universal installer supports both Macs, and absent platforms return nothing', () => {
  const assets = parseReleaseAssets([asset('Crewloom_universal.dmg')]);
  assert.ok(selectReleaseAsset(assets, 'macos-x64'));
  assert.ok(selectReleaseAsset(assets, 'macos-arm64'));
  assert.equal(selectReleaseAsset(assets, 'windows'), undefined);
  assert.equal(selectReleaseAsset([], 'linux'), undefined);
});
test('untrusted assets reject malformed fields and unsafe URLs', () => {
  assert.throws(() => parseReleaseAssets({}));
  assert.throws(() => parseReleaseAssets([{ ...asset('a.dmg'), size: NaN }]));
  assert.throws(() => parseReleaseAssets([{ ...asset('a.dmg'), browser_download_url: 'javascript:alert(1)' }]));
});
