import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolveAgentLaunch, runAgentCli } from '../bin/agent-command.js';

function fixture(t, { entry = true, tsx = true } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'crewloom-agent-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file, text) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), text);
  };
  write('agent/package.json', '{"name":"fixture-agent"}');
  if (entry) write('agent/apps/cli/src/bin.ts', '');
  if (tsx) {
    write('agent/node_modules/tsx/package.json', JSON.stringify({ name: 'tsx', exports: { './esm': './esm.mjs' } }));
    write('agent/node_modules/tsx/esm.mjs', '');
  }
  return root;
}

test('agent launch mirrors pnpm dsh with tsx resolved from the agent checkout', t => {
  const root = fixture(t);
  const launch = resolveAgentLaunch(root, ['--profile', 'x', 'plugin', 'list']);
  assert.equal(launch.ok, true);
  assert.equal(launch.command, process.execPath);
  const loader = fs.realpathSync(path.join(root, 'agent/node_modules/tsx/esm.mjs'));
  assert.deepEqual(launch.args, ['--import', pathToFileURL(loader).href,
    path.join(root, 'agent/apps/cli/src/bin.ts'), '--profile', 'x', 'plugin', 'list']);
});

test('missing agent entry or dependencies fail without launching', t => {
  for (const [options, reason] of [[{ entry: false }, 'missing-entry'], [{ tsx: false }, 'missing-dependencies']]) {
    const result = runAgentCli(fixture(t, options), [], () => assert.fail('must not launch'));
    assert.deepEqual([result.ok, result.reason, result.status], [false, reason, 1]);
  }
});

test('dsh exit status, launch errors and signals propagate', t => {
  const root = fixture(t);
  assert.equal(runAgentCli(root, [], () => ({ status: 3 })).status, 3);
  const launch = runAgentCli(root, [], () => ({ status: null, error: new Error('ENOENT') }));
  assert.deepEqual([launch.ok, launch.reason, launch.status], [false, 'launch', 1]);
  const signal = runAgentCli(root, [], () => ({ status: null, signal: 'SIGTERM' }));
  assert.deepEqual([signal.ok, signal.reason, signal.status], [false, 'signal', 1]);
});
