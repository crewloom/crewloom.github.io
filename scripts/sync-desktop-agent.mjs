#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Candidate paths to the desktop agent package.json
const candidateDesktopPkgPaths = [
  path.resolve(__dirname, '../../agent/apps/crewloom-desktop/package.json'),
  path.resolve(process.cwd(), '../agent/apps/crewloom-desktop/package.json'),
  path.resolve(process.cwd(), 'agent/apps/crewloom-desktop/package.json'),
  '/Volumes/data/projects/crewloom/agent/apps/crewloom-desktop/package.json',
];

let desktopPkg = null;
let foundPath = null;

for (const p of candidateDesktopPkgPaths) {
  if (fs.existsSync(p)) {
    try {
      desktopPkg = JSON.parse(fs.readFileSync(p, 'utf8'));
      foundPath = p;
      break;
    } catch {
      // ignore
    }
  }
}

const websiteRoot = path.resolve(__dirname, '..');
const desktopAgentJsonPath = path.join(websiteRoot, 'lib', 'desktop-agent.json');

let existingMeta = {};
if (fs.existsSync(desktopAgentJsonPath)) {
  try {
    existingMeta = JSON.parse(fs.readFileSync(desktopAgentJsonPath, 'utf8'));
  } catch {
    // ignore
  }
}

const version = desktopPkg?.version || existingMeta.version || '0.3.5';
const productName = 'Crewloom Agent';
const tagName = `v${version}`;
const releaseName = `Crewloom Desktop Agent ${tagName}`;

// Check DMG size
const dmgCandidates = [
  path.join(websiteRoot, 'Crewloom.dmg'),
  path.join(websiteRoot, 'public', 'Crewloom.dmg'),
];

let dmgSize = existingMeta.dmgSize || 5269425;
for (const dmg of dmgCandidates) {
  if (fs.existsSync(dmg)) {
    try {
      const stats = fs.statSync(dmg);
      dmgSize = stats.size;
      break;
    } catch {
      // ignore
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

const meta = {
  version,
  tagName,
  name: releaseName,
  productName,
  description: desktopPkg?.description || 'Crewloom Agent desktop application (macOS, Windows, Linux)',
  dmgName: 'Crewloom.dmg',
  dmgSize,
  dmgSizeFormatted: formatBytes(dmgSize),
  downloadUrl: `https://github.com/crewloom/crewloom.github.io/releases/download/${tagName}/Crewloom.dmg`,
  sourcePath: foundPath ? path.relative(websiteRoot, foundPath) : 'embedded',
  syncedAt: new Date().toISOString(),
};

// 1. Write lib/desktop-agent.json
fs.writeFileSync(desktopAgentJsonPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');
console.log(`[sync-desktop-agent] Synced version ${version} from ${foundPath || 'fallback'} -> ${desktopAgentJsonPath}`);

// 2. Ensure public/updates exists and write update manifest for the desktop agent updater
const updatesDir = path.join(websiteRoot, 'public', 'updates');
if (!fs.existsSync(updatesDir)) {
  fs.mkdirSync(updatesDir, { recursive: true });
}
const agentManifest = {
  version,
  notes: `Official Crewloom Desktop Agent ${tagName} for macOS Apple Silicon with verified zero-destruction guarantees.`,
  url: meta.downloadUrl,
  pub_date: meta.syncedAt,
};
fs.writeFileSync(path.join(updatesDir, 'crewloom-agent.json'), JSON.stringify(agentManifest, null, 2) + '\n', 'utf8');

// 3. Write public/version.json
const versionJsonPath = path.join(websiteRoot, 'public', 'version.json');
fs.writeFileSync(versionJsonPath, JSON.stringify({ version, tagName, name: releaseName }, null, 2) + '\n', 'utf8');
