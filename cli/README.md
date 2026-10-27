# Crewloom CLI

CLI 1.0.1 is maintained in this repository's `cli/` directory. It launches source-workspace tools and does not include the private agent, its models, or the core repositories.

## Installation

Install the source package attached to website release v1.0.7:

```bash
npm install -g https://github.com/crewloom/crewloom.github.io/releases/download/v1.0.7/crewloom-1.0.1.tgz
crewloom version
```

The website installer downloads a self-contained launcher from `https://crewloom.org/bin/`. The npm registry is a separate publication channel; this GitHub release does not update it.

## Commands

| Command | Behavior |
|---|---|
| `init` | Creates `.crewloom/config.json` in the current directory exclusively; existing bytes are preserved and the command fails. |
| `verify`, `demo` | Runs both the core repository checker and desktop Node tests, independently. Missing suites, launch errors, signals and failed checks produce nonzero exit status. |
| `roles`, `list` | Reads the real catalog from an available source workspace. |
| `studio`, `bridge` | Launches the existing source-workspace service when available. |
| `audit` | Inspects Git state and scans diffs for a fixed set of dangerous text patterns; this is not a general safety proof. |
| `status`, `version` | Shows detected tools or the launcher version. |

Source lookup checks the current directory and ancestors, then the launcher's location and ancestors. Run verification inside a Crewloom source workspace. Download-only installations cannot verify repositories they do not contain. The launcher strips inherited `NODE_TEST_CONTEXT` before starting its independent test subprocess so a parent Node test runner cannot silently suppress that suite.

Workspace-operation messages use Arabic when `LC_ALL`, `LC_MESSAGES`, or `LANG` starts with `ar`; other legacy diagnostics remain English. Paths and command names stay unchanged.

## Source and tests

`../scripts/build-cli.mjs` builds all download variants from this source. The package version is owned by `package.json`. Previous workspace-level `../cli/` paths outside the website repository remain forwarding adapters.

```bash
# From the website repository
npm run test:cli
npm run build
```

The source and download suites cover exclusive initialization, preservation, real verification subprocesses, workspace discovery and version consistency. Portable launchers were also tested with Node 18. A real Windows PowerShell installation is a separate platform acceptance check.

## العربية

المصدر المعتمد للمشغّل هو `cli/` داخل مستودع الموقع. الإصدار 1.0.1 مرفق بإصدار الموقع v1.0.7 على GitHub؛ نشر npm منفصل. `init` لا يستبدل ملف إعدادات موجودًا. `verify` و`demo` يحتاجان مجلدات المصدر، ويخرجان بفشل عند غياب أي فحص مطلوب أو فشله. المسارات القديمة في مساحة العمل تحيل إلى هذا المصدر. اختبارات التنزيل تعمل في مجلدات مؤقتة دون مفاتيح أو مزوّد حي.

## License

Apache-2.0; see `LICENSE`.
