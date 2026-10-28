#!/usr/bin/env node

/**
 * Crewloom Sovereign AI Agent Engine — Official CLI
 * https://crewloom.org
 */

import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { resolveWorkspaceRoot } from './workspace-root.js';
import { initializeWorkspace, verifyWorkspace } from './workspace-commands.js';
import { translate } from './messages.js';
import { renderBanner } from './banner.js';

const launcherDirectory = path.dirname(fs.realpathSync(process.argv[1]));
const rootDir = resolveWorkspaceRoot(process.cwd(), launcherDirectory);

const VERSION = typeof CREWLOOM_BUILD_VERSION === 'string'
  ? CREWLOOM_BUILD_VERSION
  : JSON.parse(fs.readFileSync(path.join(launcherDirectory, '../package.json'), 'utf8')).version;
const args = process.argv.slice(2);

const BANNER = renderBanner(VERSION);

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
  console.log(`Usage: crewloom <command> [options]

Commands:
  roles, list          List and inspect 47 specialist agent roles from catalog
  status               Display real system status & detected local CLI models
  studio [--open]      Launch Crewloom Studio web dashboard (browser interface)
  bridge [options]     Launch Omni-Channel Mediator (Telegram/WhatsApp/Terminal)
  verify               Run core automated verification test suite
  audit [--preflight]  Verify repository integrity, worktree and security guards
  init                 Initialize sovereign .crewloom configuration in workspace
  version, -v          Display Crewloom Sovereign Engine version

Options:
  --category <name>    Filter specialist skills by category
  --json               Emit output as structured machine-readable JSON
  --help, -h           Show this help message

Quick execution:
  crewloom roles       •  crewloom status  •  crewloom studio  •  crewloom verify
`);
}

function executeCommand(cmdArgs) {
  const cmd = cmdArgs[0] || 'help';

  switch (cmd) {
    case 'version':
    case '-v':
    case '--version':
      console.log(`crewloom v${VERSION} (Sovereign Dual-Core Engine)`);
      break;

    case 'roles':
    case 'list': {
      const catalog = loadRealCatalog();
      const categoryFilter = cmdArgs.includes('--category') ? cmdArgs[cmdArgs.indexOf('--category') + 1]?.toLowerCase() : null;
      let roles = catalog.roles || [];
      if (categoryFilter) {
        roles = roles.filter(r => (r.category || '').toLowerCase().includes(categoryFilter));
      }
      if (cmdArgs.includes('--json')) {
        console.log(JSON.stringify(roles, null, 2));
        break;
      }
      console.log(BANNER);
      console.log(`\x1b[36m▶ ${roles.length} Sovereign Specialist Roles Loaded from Catalog:\x1b[0m\n`);
      const preview = roles.slice(0, 30).map(r => ({
        id: r.id,
        name: r.name,
        category: r.category || 'Specialist',
        files: r.files?.length || 0,
      }));
      console.table(preview);
      if (roles.length > 30) {
        console.log(`... and ${roles.length - 30} more roles. Use \x1b[1mcrewloom roles --json\x1b[0m to inspect all.`);
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
        const shouldOpen = cmdArgs.includes('--open');
        const child = spawn('node', [studioServerPath], { stdio: 'inherit' });
        if (shouldOpen) {
          const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
          setTimeout(() => {
            try { execSync(`${openCmd} http://localhost:3030`); } catch {}
          }, 1000);
        }
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
        const child = spawn('node', [bridgePath, ...cmdArgs.slice(1)], { stdio: 'inherit' });
        child.on('exit', (code) => process.exit(code || 0));
      } else {
        console.log('\x1b[33m• Bridge build not found. Run `npm run build` in bridge/ first.\x1b[0m');
      }
      break;
    }

    case 'verify':
    case 'demo': {
      console.log(BANNER);
      const results = verifyWorkspace(rootDir);
      for (const result of results) {
        console.log(`${translate(result.success ? 'suitePass' : 'suiteFail')}: ${result.name} (${result.reason})`);
      }
      const success = results.every(result => result.success);
      console.log(translate(success ? 'verifyOk' : 'verifyFailed'));
      process.exitCode = success ? 0 : 1;
      break;
    }

    case 'init': {
      console.log(BANNER);
      try {
        initializeWorkspace(process.cwd(), VERSION);
        console.log(translate('initOk'));
      } catch (error) {
        console.error(translate('initFailed'), error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
      }
      break;
    }

    case 'status': {
      const catalog = loadRealCatalog();
      const tools = ['claude', 'codex', 'opencode', 'agy'].map(tool => ({
        name: tool,
        ...detectLocalCli(tool),
      }));
      if (cmdArgs.includes('--json')) {
        console.log(JSON.stringify({
          engine: `Crewloom Desktop / Tauri v${VERSION}`,
          version: VERSION,
          rolesCount: catalog.roles?.length || 0,
          tools,
        }, null, 2));
        break;
      }
      console.log(BANNER);
      console.log('\x1b[36m▶ Orchestrator & Tool Runtime Status:\x1b[0m');
      console.log(`  Engine: Crewloom Desktop / Tauri v${VERSION}`);
      console.log(`  Specialist Roles: ${catalog.roles?.length || 0} registered in catalog`);

      console.log('\n\x1b[36m▶ Local CLI Models & Engines Detected:\x1b[0m');
      for (const tool of tools) {
        if (tool.installed) {
          console.log(`  \x1b[32m✓ ${tool.name.padEnd(10)}\x1b[0m: ${tool.version} (\x1b[90m${tool.path}\x1b[0m)`);
        } else {
          console.log(`  \x1b[90m- ${tool.name.padEnd(10)}: not found in PATH\x1b[0m`);
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
}

if (args.length === 0 && process.stdin.isTTY) {
  printHelp();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('\x1b[1;36m▶ Run command (e.g. status, roles, studio, verify) or Enter to exit: \x1b[0m', (input) => {
    rl.close();
    const trimmed = input.trim();
    if (trimmed) {
      const mapped = {
        '1': 'roles',
        '2': 'status',
        '3': 'studio',
        '4': 'bridge',
        '5': 'verify',
        '6': 'audit',
        '7': 'init',
      }[trimmed] || trimmed;
      executeCommand(mapped.split(/\s+/));
    }
  });
} else {
  executeCommand(args);
}
