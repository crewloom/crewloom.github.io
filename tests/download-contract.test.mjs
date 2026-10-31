import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const contract = JSON.parse(read('lib/download-contract.json'));
const names = Object.values(contract.assets);
const versioned = /\d+\.\d+|(^|[-_])v\d/i;
const latestPrefix = `https://github.com/${contract.repo}/releases/latest/download/`;

test('asset names carry no version, so only the release tag changes', () => {
  for (const name of names) assert.doesNotMatch(name, versioned, `${name} must not contain a version`);
  assert.equal(new Set(names).size, names.length);
});

test('every contract asset exists in the site root and public/', () => {
  for (const name of names) {
    assert.ok(fs.existsSync(new URL(`../${name}`, import.meta.url)), `${name} missing in site root`);
    assert.ok(fs.existsSync(new URL(`../public/${name}`, import.meta.url)), `${name} missing in public/`);
  }
});

test('Vercel redirects and desktop-agent.json point at latest/download with contract names', () => {
  const redirects = JSON.parse(read('vercel.json')).redirects.filter((r) => r.destination.includes('/releases/'));
  assert.ok(redirects.length >= 3);
  for (const { source, destination } of redirects) {
    assert.ok(destination.startsWith(latestPrefix), `${source} -> ${destination} must use latest/download`);
    assert.ok(names.includes(destination.slice(latestPrefix.length)), `${destination} is not a contract asset`);
  }
  const meta = JSON.parse(read('lib/desktop-agent.json'));
  assert.equal(meta.downloadUrl, latestPrefix + contract.assets.macos);
  assert.equal(meta.dmgName, contract.assets.macos);
});

test('source files never hardcode a release tag or asset name literal', () => {
  for (const file of ['lib/constants.ts', 'lib/github-releases.ts', 'hooks/useDeviceOS.ts', 'scripts/sync-desktop-agent.mjs']) {
    const text = read(file);
    assert.doesNotMatch(text, /releases\/download\/v\d/, `${file} hardcodes a tag`);
    for (const name of ['Crewloom-Agent-Setup.exe', 'Crewloom-Desktop-Windows-x64.zip']) {
      assert.ok(!text.includes(`'${name}'`), `${file} hardcodes ${name}`);
    }
  }
});
