/** Non-destructive workspace initialization and truthful verification. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/** Creates a configuration exclusively; an existing file is never replaced. */
export function initializeWorkspace(directory, version) {
  const folder = path.join(directory, '.crewloom');
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'config.json'), `${JSON.stringify({
    name: 'crewloom-workspace', version, engine: { mode: 'sovereign' },
    languages: ['en', 'ar'], contracts: { zeroDestruction: true, stagedDiffs: true },
  }, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
}

/** Runs both required checks without a shell and returns every failure to the caller. */
export function verifyWorkspace(root, run = spawnSync) {
  const desktop = path.join(root, 'agent/apps/crewloom-desktop');
  const tests = path.join(desktop, 'tests');
  const files = fs.existsSync(tests)
    ? fs.readdirSync(tests).filter(file => file.endsWith('.test.mjs')).sort()
    : [];
  const suites = [
    { name: 'core', cwd: path.join(root, 'core'), file: 'scripts/check_repository.py',
      command: process.platform === 'win32' ? 'python' : 'python3', args: ['scripts/check_repository.py'] },
    { name: 'desktop', cwd: desktop, file: files.length ? `tests/${files[0]}` : 'tests/<missing>',
      command: process.execPath, args: ['--test', ...files.map(file => path.join('tests', file))] },
  ];
  const environment = { ...process.env };
  // A parent node:test runner must not suppress the independent child test suite.
  delete environment.NODE_TEST_CONTEXT;
  return suites.map(suite => {
    if (!fs.existsSync(path.join(suite.cwd, suite.file))) {
      return { name: suite.name, success: false, reason: 'missing', status: null };
    }
    const result = run(suite.command, suite.args, { cwd: suite.cwd, stdio: 'inherit', env: environment });
    return { name: suite.name, success: result.status === 0 && !result.error && !result.signal,
      reason: result.error ? 'launch' : result.signal ? 'signal' : 'exit', status: result.status };
  });
}
