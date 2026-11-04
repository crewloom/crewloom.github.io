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


test('synchronized latest asset metadata recognizes versioned GitHub download URLs only in the same repository', () => {
  const name = 'Crewloom.dmg';
  const known = [{ name, platform: 'macos-arm64', downloadUrl: `https://github.com/crewloom/site/releases/latest/download/${name}` }];
  const versioned = { ...asset(name), browser_download_url: `https://github.com/crewloom/site/releases/download/v0.10.3/${name}` };
  assert.equal(selectReleaseAsset(parseReleaseAssets([versioned], known), 'macos-arm64')?.name, name);
  for (const url of [
    `https://github.com/other/site/releases/download/v0.10.3/${name}`,
    `https://example.com/crewloom/site/releases/download/v0.10.3/${name}`,
    `https://github.com/crewloom/site/blob/v0.10.3/${name}`,
  ]) {
    assert.equal(selectReleaseAsset(parseReleaseAssets([{ ...versioned, browser_download_url: url }], known), 'macos-arm64'), undefined);
  }
  assert.equal(selectReleaseAsset(parseReleaseAssets([versioned], known), 'macos-x64'), undefined);
});
