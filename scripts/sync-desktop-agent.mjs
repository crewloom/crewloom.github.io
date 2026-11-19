#!/usr/bin/env node
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);
const contract = JSON.parse(fs.readFileSync(new URL('lib/download-contract.json', root), 'utf8'));
const productName = 'Crewloom Agent';

/** Read the version and updater payload from the same published GitHub release. */
export function metadataFromRelease(release, { repo, assets }) {
  const tagName = release?.tag_name;
  if (!/^v\d+\.\d+\.\d+$/.test(tagName ?? '') || release.draft || release.prerelease ||
      !Number.isFinite(Date.parse(release.published_at))) {
    throw new Error('Expected a published desktop release');
  }
  const dmgName = assets.macos;
  const downloadUrl = `https://github.com/${repo}/releases/download/${tagName}/${dmgName}`;
  const dmg = Array.isArray(release.assets) && release.assets.find(asset =>
    asset?.name === dmgName && asset.browser_download_url === downloadUrl &&
    Number.isSafeInteger(asset.size) && asset.size > 0);
  if (!dmg) throw new Error(`No valid macOS asset on ${tagName}`);

  const dmgSize = dmg.size;
  const mb = dmgSize / (1024 * 1024);
  return {
    version: tagName.slice(1),
    tagName,
    name: release.name || `Crewloom Desktop Agent ${tagName}`,
    productName,
    description: 'Crewloom Agent desktop application',
    dmgName,
    dmgSize,
    dmgSizeFormatted: mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(dmgSize / 1024)} KB`,
    downloadUrl,
    sourcePath: `github:${repo}@${tagName}`,
    syncedAt: release.published_at,
  };
}

async function sync() {
  const metaPath = new URL('lib/desktop-agent.json', root);
  let meta;
  try {
    const response = await fetch(`https://api.github.com/repos/${contract.repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);
    meta = metadataFromRelease(await response.json(), contract);
  } catch (error) {
    const saved = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const expected = `https://github.com/${contract.repo}/releases/download/${saved.tagName}/${contract.assets.macos}`;
    if (!/^v\d+\.\d+\.\d+$/.test(saved.tagName) || saved.tagName !== `v${saved.version}` ||
        saved.downloadUrl !== expected || saved.dmgName !== contract.assets.macos ||
        !Number.isSafeInteger(saved.dmgSize) || saved.dmgSize <= 0 || !Number.isFinite(Date.parse(saved.syncedAt))) {
      throw new Error('No valid pinned desktop release snapshot available', { cause: error });
    }
    console.warn(`[sync-desktop-agent] Using pinned ${saved.tagName} snapshot: ${error.message}`);
    meta = saved;
  }

  const write = (file, value) => fs.writeFileSync(new URL(file, root), JSON.stringify(value, null, 2) + '\n', 'utf8');
  write('lib/desktop-agent.json', meta);
  fs.mkdirSync(new URL('public/updates/', root), { recursive: true });
  write('public/updates/crewloom-agent.json', {
    version: meta.version, notes: meta.name, url: meta.downloadUrl, pub_date: meta.syncedAt,
  });
  const version = { version: meta.version, tagName: meta.tagName, name: meta.name };
  write('public/version.json', version);
  write('version.json', version);
  console.log(`[sync-desktop-agent] Synced ${meta.tagName} from ${meta.sourcePath}`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await sync();
