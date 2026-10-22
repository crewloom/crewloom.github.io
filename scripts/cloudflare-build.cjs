#!/usr/bin/env node

/**
 * Cloudflare Worker / OpenNext Build Shim for Crewloom Static Export
 * 
 * Cloudflare Workers Builds defaults to `npx opennextjs-cloudflare build`.
 * Since Crewloom is a high-performance static Next.js export (`output: 'export'`),
 * OpenNext's SSR bundle generator is unnecessary and crashes on static exports.
 * 
 * This shim ensures that whether Cloudflare executes `npm run build` or
 * `npx opennextjs-cloudflare build`, the static export compiles cleanly
 * into `./out` for Cloudflare Workers Static Assets.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('⚡ [Crewloom Build Shim] Running optimized Next.js static build...');

try {
  execSync('npm run build', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
    env: process.env,
  });
  console.log('✅ [Crewloom Build Shim] Static assets generated in ./out');
  process.exit(0);
} catch (error) {
  console.error('❌ [Crewloom Build Shim] Build failed:', error);
  process.exit(1);
}
