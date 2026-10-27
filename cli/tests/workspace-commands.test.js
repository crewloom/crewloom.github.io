import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { initializeWorkspace, verifyWorkspace } from '../bin/workspace-commands.js';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'crewloom-cli-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function suites(root) {
  for (const file of ['core/scripts/check_repository.py', 'agent/apps/crewloom-desktop/tests/a.test.mjs']) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), 'fixture');
  }
}
test('init preserves existing bytes and fails rather than overwriting', t => {
  const root = fixture(t);
  initializeWorkspace(root, '1.0.0');
  const file = path.join(root, '.crewloom/config.json');
  fs.writeFileSync(file, '{"sentinel":"existing"}');
  assert.throws(() => initializeWorkspace(root, '1.0.1'), { code: 'EEXIST' });
  assert.equal(fs.readFileSync(file, 'utf8'), '{"sentinel":"existing"}');
});
test('real CLI returns nonzero on a repeated init', t => {
  const root = fixture(t);
  const cli = fileURLToPath(new URL('../bin/crewloom.js', import.meta.url));
  assert.equal(spawnSync(process.execPath, [cli, 'init'], { cwd: root }).status, 0);
  assert.equal(spawnSync(process.execPath, [cli, 'init'], { cwd: root }).status, 1);
});
for (const statuses of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
  test(`verify runs both suites and preserves results ${statuses}`, t => {
    const root = fixture(t); suites(root); let calls = 0;
    const results = verifyWorkspace(root, (_cmd, args) => {
      assert.ok(!args.includes('tests/*.test.mjs'));
      return { status: statuses[calls++] };
    });
    assert.equal(calls, 2);
    assert.deepEqual(results.map(item => item.success), statuses.map(status => status === 0));
  });
}
test('missing suites never produce a successful verification', t => {
  const results = verifyWorkspace(fixture(t), () => assert.fail('must not launch'));
  assert.ok(results.every(result => !result.success && result.reason === 'missing'));
});
test('launch errors and signal termination fail and do not skip the other suite', t => {
  const root = fixture(t); suites(root); let calls = 0;
  const results = verifyWorkspace(root, () => ++calls === 1
    ? { status: null, error: new Error('binary missing') }
    : { status: null, signal: 'SIGTERM' });
  assert.equal(calls, 2);
  assert.deepEqual(results.map(result => result.reason), ['launch', 'signal']);
  assert.ok(results.every(result => !result.success));
});
