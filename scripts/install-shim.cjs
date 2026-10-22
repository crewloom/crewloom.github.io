#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const binDir = path.join(rootDir, 'node_modules', '.bin');
const targetFile = path.join(rootDir, 'scripts', 'cloudflare-build.cjs');
const binFile = path.join(binDir, 'opennextjs-cloudflare');

try {
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // Remove existing file or symlink if present
  try {
    if (fs.existsSync(binFile) || fs.lstatSync(binFile).isSymbolicLink()) {
      fs.unlinkSync(binFile);
    }
  } catch {}

  // On Linux/macOS, create symlink or copy
  try {
    fs.symlinkSync(path.relative(binDir, targetFile), binFile);
  } catch {
    fs.copyFileSync(targetFile, binFile);
  }

  fs.chmodSync(binFile, 0o755);
  console.log('⚡ [Crewloom] Cloudflare build shim registered at node_modules/.bin/opennextjs-cloudflare');
} catch (err) {
  // Graceful fallback
  console.warn('⚠️ [Crewloom] Could not link opennextjs-cloudflare shim:', err.message);
}
