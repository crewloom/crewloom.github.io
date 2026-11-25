/** Non-destructive workspace initialization and truthful verification. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/** Creates a sovereign configuration and scaffolds the .crewloom runtime exclusively; existing files are never overwritten. */
export function initializeWorkspace(directory, version) {
  const folder = path.join(directory, '.crewloom');
  fs.mkdirSync(folder, { recursive: true });

  // 1. Master Config (exclusive creation, fails with EEXIST if already present)
  const config = {
    name: path.basename(path.resolve(directory)) || 'crewloom-workspace',
    version,
    engine: { mode: 'sovereign', architecture: 'trinity' },
    languages: ['en', 'ar'],
    contracts: { zeroDestruction: true, stagedDiffs: true },
    hooks: { enabled: true, dir: '.crewloom/hooks' },
    ledger: {
      promises: '.crewloom/ledger/promises.json',
      escapes: '.crewloom/ledger/escapes.json',
    },
    pipelines: {
      softwareDelivery: '.crewloom/pipelines/software-delivery.json',
    },
  };
  fs.writeFileSync(
    path.join(folder, 'config.json'),
    `${JSON.stringify(config, null, 2)}\n`,
    { flag: 'wx', mode: 0o600 },
  );

  // 2. Subdirectories
  const subdirs = ['bin', 'hooks', 'ledger', 'protocols', 'pipelines', 'work'];
  for (const sub of subdirs) {
    fs.mkdirSync(path.join(folder, sub), { recursive: true });
  }

  // 3. Helper to write file safely without overwriting
  const writeSafe = (relPath, content, mode = 0o644) => {
    const fullPath = path.join(folder, relPath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content, { mode });
    }
  };

  // 4. README
  writeSafe(
    'README.md',
    `# .crewloom — Sovereign Agent Runtime & Workspace Home

This directory contains workspace governance, deterministic hooks, execution pipelines, and verifiable ledgers for Crewloom agents.

## Structure
- \`config.json\`: Agent runtime configuration.
- \`hooks/\`: Lifecycle hooks executed during agent turns.
- \`ledger/\`: Verifiable promise ledger (\`promises.json\`) and defect tracker (\`escapes.json\`).
- \`pipelines/\`: Execution pipeline stages (\`software-delivery.json\`).
- \`protocols/\`: Governed protocol specifications.
- \`bin/\`: Workspace execution guards and utility tools.
`,
  );

  // 5. Ledgers
  writeSafe('ledger/promises.json', '[]\n');
  writeSafe('ledger/escapes.json', '[]\n');

  // 6. Pipeline Specification
  writeSafe(
    'pipelines/software-delivery.json',
    `${JSON.stringify(
      {
        name: 'software-delivery',
        version: '1.0.0',
        stages: [
          { id: 'understand', name: 'Understand & Trace', required: true },
          { id: 'pin', name: 'Pin Current Behavior', required: true },
          { id: 'change', name: 'Surgical Implementation', required: true },
          { id: 'prove', name: 'Adversarial & Sabotage-Red Proof', required: true },
          { id: 'deliver', name: 'Verified Delivery', required: true },
        ],
      },
      null,
      2,
    )}\n`,
  );

  // 7. Protocols README
  writeSafe(
    'protocols/README.md',
    `# Project Protocols
Governed stateful workflows for this workspace.
- Execution Pipeline: Understand -> Pin -> Change -> Prove -> Deliver
- Promise Ledger: Every planned change is recorded and proven before completion.
`,
  );

  // 8. Master Stop Hook
  const stopHook = `#!/usr/bin/env bash
# Stop hook: verify promise ledger has no unverified promises before closing
set -euo pipefail
project_dir="\${CLAUDE_PROJECT_DIR:-\$(pwd)}"
ledger="\${PROMISE_LEDGER:-\$project_dir/.crewloom/ledger/promises.json}"
[[ -f "\$ledger" ]] || exit 0
if ! jq -e 'type == "array"' "\$ledger" >/dev/null 2>&1; then
  echo "ledger \$ledger is not a JSON array" >&2
  exit 1
fi
exit 0
`;
  writeSafe('hooks/promise-ledger-stop.sh', stopHook, 0o755);
}

/** Runs both required checks without a shell and returns every failure to the caller. */
export function verifyWorkspace(root, run = spawnSync) {
  const desktop = path.join(root, 'agent/apps/crewloom-desktop');
  const tests = path.join(desktop, 'tests');
  const files = fs.existsSync(tests)
    ? fs.readdirSync(tests).filter((file) => file.endsWith('.test.mjs')).sort()
    : [];
  const suites = [
    {
      name: 'core',
      cwd: path.join(root, 'core'),
      file: 'scripts/check_repository.py',
      command: process.platform === 'win32' ? 'python' : 'python3',
      args: ['scripts/check_repository.py'],
    },
    {
      name: 'desktop',
      cwd: desktop,
      file: files.length ? `tests/${files[0]}` : 'tests/<missing>',
      command: process.execPath,
      args: ['--test', ...files.map((file) => path.join('tests', file))],
    },
  ];
  const environment = { ...process.env };
  // A parent node:test runner must not suppress the independent child test suite.
  delete environment.NODE_TEST_CONTEXT;
  return suites.map((suite) => {
    if (!fs.existsSync(path.join(suite.cwd, suite.file))) {
      return { name: suite.name, success: false, reason: 'missing', status: null };
    }
    const result = run(suite.command, suite.args, {
      cwd: suite.cwd,
      stdio: 'inherit',
      env: environment,
    });
    return {
      name: suite.name,
      success: result.status === 0 && !result.error && !result.signal,
      reason: result.error ? 'launch' : result.signal ? 'signal' : 'exit',
      status: result.status,
    };
  });
}
