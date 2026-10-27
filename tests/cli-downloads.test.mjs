import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolveWorkspaceRoot } from '../cli/bin/workspace-root.js';

const packageVersion = JSON.parse(fs.readFileSync(new URL('../cli/package.json', import.meta.url))).version;
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'crewloom-download-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function run(file, args, cwd, env = {}) {
  return spawnSync(process.execPath, [file, ...args], {
    cwd, encoding: 'utf8', env: { ...process.env, ...env },
  });
}
for (const name of ['crewloom', 'crewloom.js', 'crewloom.mjs']) {
  test(`portable ${name} preserves config outside the source checkout`, t => {
    const root = fixture(t);
    if (name.endsWith('.js')) fs.writeFileSync(path.join(root, 'package.json'), '{"type":"module"}');
    const file = path.join(root, name);
    fs.copyFileSync(new URL(`../public/bin/${name}`, import.meta.url), file);
    const version = run(file, ['version'], root);
    assert.equal(version.status, 0, version.stderr);
    assert.ok(version.stdout.includes(`v${packageVersion}`));
    assert.equal(run(file, ['init'], root).status, 0);
    const config = path.join(root, '.crewloom/config.json');
    fs.writeFileSync(config, '{"existing":"keep bytes"}\n');
    const retry = run(file, ['init'], root, { LC_ALL: 'ar_EG.UTF-8' });
    assert.equal(retry.status, 1);
    assert.ok(retry.stderr.includes('تم الحفاظ'));
    assert.equal(fs.readFileSync(config, 'utf8'), '{"existing":"keep bytes"}\n');
    assert.equal(run(file, ['verify'], root).status, 1);
  });
}
for (const statuses of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
  test(`download verify reports both real suites with statuses ${statuses}`, t => {
    const root = fixture(t);
    const files = {
      'core/scripts/check_repository.py': `raise SystemExit(${statuses[0]})\n`,
      'agent/apps/crewloom-desktop/package.json': '{}\n',
      'agent/apps/crewloom-desktop/tests/check.test.mjs': `process.exit(${statuses[1]});\n`,
    };
    for (const [name, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
      fs.writeFileSync(path.join(root, name), content);
    }
    const nested = path.join(root, 'مشروع with spaces', 'nested');
    fs.mkdirSync(nested, { recursive: true });
    const launcher = path.join(fixture(t), 'crewloom');
    fs.copyFileSync(new URL('../public/bin/crewloom', import.meta.url), launcher);
    const result = run(launcher, ['verify'], nested, { LC_ALL: 'en_US.UTF-8' });
    assert.equal(result.status, statuses.every(status => status === 0) ? 0 : 1, result.stderr);
    assert.ok(result.stdout.includes(`${statuses[0] ? 'FAIL' : 'PASS'}: core`));
    assert.ok(result.stdout.includes(`${statuses[1] ? 'FAIL' : 'PASS'}: desktop`));
    assert.equal(resolveWorkspaceRoot(nested, path.dirname(launcher)), root);
  });
}
test('workspace fallback is explicit and source metadata versions match', t => {
  const root = fixture(t);
  assert.equal(resolveWorkspaceRoot(root, root), root);
  const source = fileURLToPath(new URL('../cli/bin/crewloom.js', import.meta.url));
  const result = run(source, ['version'], root);
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes(`v${packageVersion}`));
});
