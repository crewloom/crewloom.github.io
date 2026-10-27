# Website and CLI ownership

The website owns public distribution and the dependency-free `cli/` source package. Website data/library modules remain below components and routes. The launcher does not import private agent implementation: it locates a source workspace and invokes its existing commands only when the operator requests them.

`cli/bin/workspace-commands.js` owns exclusive initialization and the independent verification suites. `workspace-root.js` resolves source locations from current-directory or launcher ancestors. `messages.js` owns paired Arabic/English operation messages. `crewloom.js` dispatches commands. The old workspace-level `../cli/bin/` files remain forwarding adapters.

`scripts/build-cli.mjs` bundles the canonical source into deployed `bin/crewloom`, `bin/crewloom.js`, and `bin/crewloom.mjs`. Builds refresh `public/bin/` before Next exports it. Generated bundles and root export copies are not source commits. Installers consume the deployed HTTPS site paths. The extensionless payload uses dynamic ESM import so it also runs outside a package on Node 18; `.mjs` is the explicit PowerShell download.

The package version lives in `cli/package.json`; the bundler injects it into download artifacts. A source invocation reads its package metadata. The CLI has its own package version and is attached to the website's GitHub Release; that does not imply a new npm-registry publication.

CI builds and tests the CLI before building and deploying the site. Portable download tests exercise repeated initialization, missing suites, both suite failure combinations, source discovery under nested Arabic/spaced paths, and version consistency. Real Windows installer execution remains a separate platform check.

Production-domain publication uses the linked Vercel project with repository-owned install/build commands. GitHub Pages is an independent Actions output. Both consume canonical CLI builds, and deployment acceptance checks the live domain payload against the tested build.
