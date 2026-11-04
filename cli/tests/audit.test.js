import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../bin/crewloom.js', import.meta.url));
for (const locale of ['en', 'ar']) {
  test(`audit fails without Git evidence (${locale})`, t => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'crewloom-audit-'));
    t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
    const result = spawnSync(process.execPath, [cli, 'audit', '--preflight'], {
      cwd, encoding: 'utf8', env: { ...process.env, LC_ALL: locale },
    });
    assert.equal(result.status, 1);
    assert.doesNotMatch(result.stdout, /certified clean|Working directory clean/);
    assert.match(result.stderr, locale === 'ar' ? /تعذر فحص Git/ : /Git inspection failed/);
  });
}

for (const diffStatus of [0, 42]) {
  test(`audit preserves the diff inspection result (${diffStatus})`, t => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'crewloom-audit-git-'));
    t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
    const isWindows = process.platform === 'win32';
    const git = path.join(cwd, isWindows ? 'git.cmd' : 'git');
    const script = isWindows
      ? `@echo off\r\nif "%1"=="diff" exit /b ${diffStatus}\r\nexit /b 0\r\n`
      : `#!/bin/sh\nif [ "$1" = "diff" ]; then exit ${diffStatus}; fi\nexit 0\n`;
    fs.writeFileSync(git, script, { mode: 0o755 });
    const result = spawnSync(process.execPath, [cli, 'audit'], {
      cwd, encoding: 'utf8', env: { ...process.env, PATH: cwd, LC_ALL: 'en' },
    });
    assert.equal(result.status, diffStatus === 0 ? 0 : 1);
    if (diffStatus === 0) assert.match(result.stdout, /certified clean/);
    else {
      assert.doesNotMatch(result.stdout, /certified clean/);
      assert.match(result.stderr, /Git inspection failed/);
    }
  });
}
