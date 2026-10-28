/** Publish portable launchers from website/cli; generated copies have no independent owner. */
import { build } from 'esbuild';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const metadata = JSON.parse(await fs.readFile(new URL('cli/package.json', root), 'utf8'));
const result = await build({
  entryPoints: [fileURLToPath(new URL('cli/bin/crewloom.js', root))],
  bundle: true, write: false, platform: 'node', format: 'esm', target: 'node24',
  define: { CREWLOOM_BUILD_VERSION: JSON.stringify(metadata.version) },
  legalComments: 'none',
});
const source = result.outputFiles[0].text;
// Dynamic ESM import also works for extensionless Node 18 downloads, outside a package.
const portable = '#!/usr/bin/env node\n'
  + `void import('data:text/javascript;base64,${Buffer.from(source).toString('base64')}')`
  + '.catch(error => { console.error(error.message); process.exitCode = 1; });\n';
for (const name of ['crewloom', 'crewloom.js', 'crewloom.mjs']) {
  const content = name === 'crewloom' ? portable : source;
  await fs.writeFile(new URL(`public/bin/${name}`, root), content, { mode: 0o755 });
  await fs.writeFile(new URL(`bin/${name}`, root), content, { mode: 0o755 });
}
console.log(`Built CLI ${metadata.version} from cli/bin/crewloom.js`);
