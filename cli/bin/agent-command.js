/** Forwards `crewloom agent` to the upstream `dsh` CLI in the workspace's agent checkout. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

/**
 * Builds the same launch as the agent repo's `pnpm dsh` script (`node --import tsx/esm
 * apps/cli/src/bin.ts`), with tsx resolved from the agent checkout so the user's
 * working directory stays the dsh session directory.
 */
export function resolveAgentLaunch(root, args) {
  const agent = path.join(root, 'agent');
  const entry = path.join(agent, 'apps/cli/src/bin.ts');
  if (!fs.existsSync(entry)) return { ok: false, reason: 'missing-entry', path: entry };
  let loader;
  try {
    loader = createRequire(path.join(agent, 'package.json')).resolve('tsx/esm');
  } catch (error) {
    if (error?.code !== 'MODULE_NOT_FOUND') throw error;
    return { ok: false, reason: 'missing-dependencies', path: agent };
  }
  return { ok: true, command: process.execPath, args: ['--import', pathToFileURL(loader).href, entry, ...args] };
}

/** Runs dsh without a shell and returns its exit status; launch failures are reported, never hidden. */
export function runAgentCli(root, args, run = spawnSync) {
  const launch = resolveAgentLaunch(root, args);
  if (!launch.ok) return { ...launch, status: 1 };
  const result = run(launch.command, launch.args, { cwd: process.cwd(), stdio: 'inherit' });
  if (result.error) return { ok: false, reason: 'launch', path: launch.args[2], status: 1, error: result.error };
  if (result.signal) return { ok: false, reason: 'signal', path: launch.args[2], status: 1, signal: result.signal };
  return { ok: true, status: result.status ?? 1 };
}
