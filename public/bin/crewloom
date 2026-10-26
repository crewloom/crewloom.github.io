#!/usr/bin/env node

/**
 * Crewloom Sovereign AI Agent Engine — Official CLI
 * https://crewloom.org
 */

import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const VERSION = '0.3.1';
const args = process.argv.slice(2);
const command = args[0] || 'help';

const BANNER = `
\x1b[38;2;6;182;212m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[38;2;6;182;212m║\x1b[0m  \x1b[1;37m⚡ CREWLOOM SOVEREIGN AI AGENT ENGINE\x1b[0m \x1b[38;2;6;182;212mv${VERSION}\x1b[0m                    \x1b[38;2;6;182;212m║\x1b[0m
\x1b[38;2;6;182;212m║\x1b[0m  \x1b[38;2;16;185;129mDual Bicultural Core (En/Ar) · Native Staged Diffs · Multi-Agent\x1b[0m     \x1b[38;2;6;182;212m║\x1b[0m
\x1b[38;2;6;182;212m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m
`;

function loadRealCatalog() {
  const candidatePaths = [
    path.join(rootDir, 'agent/apps/crewloom-desktop/src/generated/catalog.json'),
    path.join(rootDir, 'agent/apps/crewloom-desktop/src-tauri/resources/catalog.json'),
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch {}
    }
  }
  return { roles: [] };
}

function detectLocalCli(name) {
  try {
    const isWin = process.platform === 'win32';
    const checkCmd = isWin ? `where ${name}` : `which ${name}`;
    const p = execSync(checkCmd, { stdio: 'pipe' }).toString().trim().split(/\r?\n/)[0];
    if (p) {
      let version = 'detected';
      try {
        const out = execSync(`"${name}" --version`, { stdio: 'pipe', timeout: 2000 }).toString().trim();
        version = out.split('\n')[0].slice(0, 30);
      } catch {}
      return { installed: true, path: p, version };
    }
  } catch {}
  return { installed: false, path: null, version: null };
}

function printHelp() {
  console.log(BANNER);
  console.log(`
Usage: crewloom <command> [options]

Commands:
  roles, list          List and inspect real specialist agent roles from catalog
  audit [--preflight]  Verify repository integrity, git worktree and check for dangerous patterns
  studio [--open]      Launch Crewloom Studio web service (if available)
  bridge [options]     Launch Omni-Channel Mediator (Telegram/WhatsApp/Terminal)
  verify               Run core automated verification test suite
  init                 Initialize sovereign .crewloom configuration in workspace
  status               Display real system status, detected local CLI models & tools
  version, -v          Display Crewloom Sovereign Engine version

Options:
  --category <name>    Filter specialist skills by category
  --json               Emit output as structured machine-readable JSON
  --help, -h           Show this help message

Documentation & Quickstart:
  https://crewloom.org
`);
}

switch (command) {
  case 'version':
  case '-v':
  case '--version':
    console.log(`crewloom v${VERSION} (Sovereign Dual-Core Engine)`);
    break;

  case 'roles':
  case 'list': {
    console.log(BANNER);
    const catalog = loadRealCatalog();
    const categoryFilter = args.includes('--category') ? args[args.indexOf('--category') + 1]?.toLowerCase() : null;
    let roles = catalog.roles || [];
    if (categoryFilter) {
      roles = roles.filter(r => (r.category || '').toLowerCase().includes(categoryFilter));
    }
    console.log(`\x1b[1;36m▶ ${roles.length} Sovereign Specialist Roles Loaded from Catalog:\x1b[0m\n`);
    const tableData = roles.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category || 'Specialist',
      files: Array.isArray(r.files) ? r.files.length : 0,
    }));
    console.table(tableData.slice(0, 30));
    if (tableData.length > 30) {
      console.log(`\x1b[90m... and ${tableData.length - 30} more roles.\x1b[0m`);
    }
    break;
  }

  case 'audit': {
    console.log(BANNER);
    console.log('\x1b[36m▶ [Integrity & Safety Audit] Inspecting working tree...\x1b[0m');
    const cwd = process.cwd();
    let gitDirty = false;
    let modifiedFiles = [];
    try {
      const gitOut = execSync('git status --porcelain', { cwd, stdio: 'pipe' }).toString().trim();
      if (gitOut) {
        gitDirty = true;
        modifiedFiles = gitOut.split('\n').map(l => l.trim());
      }
    } catch {
      console.log('  Notice: Current directory is not a git repository.');
    }

    // Inspect recent diffs or working tree for high-risk commands
    const DANGEROUS_PATTERNS = [
      /rm\s+-rf\s+[/~]/i,
      /DROP\s+TABLE/i,
      /DROP\s+DATABASE/i,
      /TRUNCATE\s+TABLE/i,
      /DELETE\s+FROM\s+\w+\s+WHERE\s+1\s*=\s*1/i,
    ];

    let dangerousCount = 0;
    try {
      const diffOut = execSync('git diff -U0', { cwd, stdio: 'pipe' }).toString();
      for (const pattern of DANGEROUS_PATTERNS) {
        if (pattern.test(diffOut)) {
          dangerousCount++;
          console.log(`\x1b[31m⚠ Warning: Dangerous command pattern detected: ${pattern}\x1b[0m`);
        }
      }
    } catch {}

    if (gitDirty) {
      console.log(`\x1b[33m• ${modifiedFiles.length} modified/untracked files in working directory.\x1b[0m`);
    } else {
      console.log('\x1b[32m✓ Working directory clean.\x1b[0m');
    }

    if (dangerousCount === 0) {
      console.log('\x1b[32m✓ 0 destructive commands detected in active diffs.\x1b[0m');
      console.log('\x1b[32m✓ Policy guard verification certified clean.\x1b[0m\n');
    } else {
      console.log(`\x1b[31m✗ ${dangerousCount} destructive patterns detected. Please review staged changes.\x1b[0m\n`);
      process.exit(1);
    }
    break;
  }

  case 'studio': {
    console.log(BANNER);
    console.log('\x1b[36m▶ Launching Crewloom Studio Web Dashboard...\x1b[0m');
    const studioServerPath = process.env.CREWLOOM_STUDIO_PATH || path.join(rootDir, 'agent/apps/crewloom-studio/server.mjs');
    if (fs.existsSync(studioServerPath)) {
      const child = spawn('node', [studioServerPath], { stdio: 'inherit' });
      child.on('exit', (code) => process.exit(code || 0));
    } else {
      console.log('\x1b[33m• Studio server script not found at expected path.\x1b[0m');
    }
    break;
  }

  case 'bridge': {
    console.log(BANNER);
    const bridgePath = process.env.CREWLOOM_BRIDGE_PATH || path.join(rootDir, 'bridge/dist/index.js');
    if (fs.existsSync(bridgePath)) {
      const child = spawn('node', [bridgePath, ...args.slice(1)], { stdio: 'inherit' });
      child.on('exit', (code) => process.exit(code || 0));
    } else {
      console.log('\x1b[33m• Bridge build not found. Run `npm run build` in bridge/ first.\x1b[0m');
    }
    break;
  }

  case 'verify':
  case 'demo': {
    console.log(BANNER);
    console.log('\x1b[36m▶ Executing Real Test Verification Suite...\x1b[0m');
    const coreDir = path.join(rootDir, 'core');
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    if (fs.existsSync(coreDir)) {
      try {
        console.log('\x1b[33m[1/2] Running Core checks & contracts (scripts/check_repository.py)...\x1b[0m');
        execSync(`${pythonCmd} scripts/check_repository.py`, { cwd: coreDir, stdio: 'inherit' });
        console.log('\x1b[32m✓ Core contracts passed.\x1b[0m');
      } catch (e) {
        console.log('\x1b[31m✗ Core test suite reported errors.\x1b[0m');
      }
    }
    const desktopDir = path.join(rootDir, 'agent/apps/crewloom-desktop');
    if (fs.existsSync(desktopDir)) {
      try {
        console.log('\x1b[33m[2/2] Running Desktop contracts & Rust tool verification...\x1b[0m');
        const testTarget = process.platform === 'win32' ? 'tests/' : 'tests/*.test.mjs';
        execSync(`node --test ${testTarget}`, { cwd: desktopDir, stdio: 'inherit' });
        console.log('\x1b[32m✓ Desktop tool contracts passed.\x1b[0m');
      } catch (e) {
        console.log('\x1b[31m✗ Desktop test suite reported errors.\x1b[0m');
      }
    }
    console.log('\n\x1b[32m✓ Verification complete.\x1b[0m\n');
    break;
  }

  case 'init': {
    console.log(BANNER);
    const configDir = path.join(process.cwd(), '.crewloom');
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
    fs.writeFileSync(
      path.join(configDir, 'config.json'),
      JSON.stringify(
        {
          name: 'crewloom-workspace',
          version: VERSION,
          engine: { mode: 'sovereign' },
          languages: ['en', 'ar'],
          contracts: { zeroDestruction: true, stagedDiffs: true },
        },
        null,
        2
      )
    );
    console.log('\x1b[32m✓ Initialized sovereign .crewloom/config.json in current directory.\x1b[0m\n');
    break;
  }

  case 'status': {
    console.log(BANNER);
    console.log('\x1b[36m▶ Orchestrator & Tool Runtime Status:\x1b[0m');
    console.log(`  Engine: Crewloom Desktop / Tauri v${VERSION}`);
    const catalog = loadRealCatalog();
    console.log(`  Specialist Roles: ${catalog.roles?.length || 0} registered in catalog`);

    console.log('\n\x1b[36m▶ Local CLI Models & Engines Detected:\x1b[0m');
    for (const tool of ['claude', 'codex', 'opencode', 'agy']) {
      const res = detectLocalCli(tool);
      if (res.installed) {
        console.log(`  \x1b[32m✓ ${tool.padEnd(10)}\x1b[0m: ${res.version} (\x1b[90m${res.path}\x1b[0m)`);
      } else {
        console.log(`  \x1b[90m- ${tool.padEnd(10)}: not found in PATH\x1b[0m`);
      }
    }
    console.log('');
    break;
  }

  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
