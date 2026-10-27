# Changelog

## 1.0.7 — 2026-10-27

- Own the CLI 1.0.1 source in `cli/`, retaining the previous workspace entry points as forwarding adapters.
- Preserve existing initialization configuration and report missing, failed, interrupted, or unlaunchable verification suites with a nonzero exit status.
- Build portable downloads from one source; point installers at deployed bundles and use the explicit ESM download on Windows.
- Resolve source workspaces independently of installation location; synchronize reported CLI version with package metadata.
- Check source and portable downloads before deployment, including Node 18 compatibility. Attach the CLI source package to the GitHub Release; npm-registry publication is separate.
