<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website Deployment & Static Export Invariants

1. **Turbopack & Static Export Zero-Orphaned-Chunks Invariant:**
   - On every `next build`, Turbopack emits new hash-named chunks in `_next/static/chunks/` and build manifests under `_next/static/<buildId>/`.
   - When deploying to GitHub Pages via `scripts/sync-export.mjs`, all newly generated chunks and manifests referenced in exported HTML files MUST be staged and committed (`git add -A`).
   - Stale prior build directories in `_next/static/` must be cleaned up to prevent repo bloat and 404 hydration errors.

2. **pnpm v12 Build Scripts Policy (`pnpm-workspace.yaml`):**
   - Under pnpm v12, lifecycle scripts for packages like `esbuild` require explicit authorization.
   - `pnpm-workspace.yaml` defining `allowBuilds: esbuild: true` must remain committed and tracked in the website directory.

3. **Download Contract & Release Assets:**
   - Every deploy must satisfy `npm run test:contract` (testing all 6 required assets: `Crewloom.dmg`, `Crewloom-Agent-Setup.exe`, `Crewloom-Desktop-Windows-x64.zip`, `Crewloom.apk`, `install.bat`, `install.ps1`).
   - Run `npm run test:seo` and `npm run test:cli` before pushing.

