/** Locate a source workspace independently of where the launcher was installed. */
import fs from 'node:fs';
import path from 'node:path';

export function resolveWorkspaceRoot(directory, launcherDirectory) {
  for (const origin of [directory, launcherDirectory]) {
    let current = path.resolve(origin);
    while (true) {
      if (fs.existsSync(path.join(current, 'core/scripts/check_repository.py'))
          && fs.existsSync(path.join(current, 'agent/apps/crewloom-desktop/package.json'))) {
        return current;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  return path.resolve(directory);
}
