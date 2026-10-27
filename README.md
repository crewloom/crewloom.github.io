# Crewloom website

The Next.js site is statically exported with Arabic (`/ar/`) and English (`/`) pages. Read the installed Next documentation before changing framework behavior.

## Verification

- `node --test tests/release-assets.test.mjs` checks release asset parsing and CPU-specific selection.
- `npm run build` runs metadata/SEO preparation, the Next build and export synchronization.
- `npm run test:seo` checks the generated pages.

`lib/release-assets.ts` owns asset validation and architecture selection for both server and client release readers. A generic `.dmg` filename does not prove its CPU architecture; explicit synchronized metadata may identify a known asset by its exact URL and name. Intel downloads require an x86_64 installer or an explicitly universal one. If no compatible asset exists, the UI shows an unavailable state in both dictionaries and does not substitute an ARM download. File name, URL and size come from the same selected asset.

The exported `/api/releases/latest/` response is generated at build time, not a running five-minute API service on GitHub Pages. Client fallback may read GitHub when that static response is unavailable. Generated root pages and static chunks are deployment artifacts; review source separately and do not include unrelated build output in a source fix.

الموقع يدعم العربية والإنجليزية. اختيار مثبت Intel لا يعيد استخدام حزمة ARM؛ عند غياب المثبت المطابق تظهر حالة عدم التوفر. بيانات API في النسخة الثابتة تُبنى وقت البناء ولا تمثل خدمة حية تتجدد كل خمس دقائق.

## CLI ownership and distribution

`cli/` is the canonical source package for the `crewloom` and `cl` launchers, versioned independently from the website. The old workspace `../cli/` entry points forward here for compatibility. `npm run build:cli` bundles this source into the three existing `public/bin/` download paths; they are build-time distribution artifacts, not editable copies or committed build output. Installers fetch the deployed site paths, not raw GitHub source snapshots. The extensionless download loads bundled ESM on Node 18+, and PowerShell downloads the `.mjs` variant explicitly.

`npm run test:cli` checks source behavior and the actual portable downloads. CI runs it before the site build. `init` never replaces an existing config; `verify` fails if either required workspace suite fails or is absent. An installed launcher locates source from the current directory and its ancestors; it does not contain the private agent or core repositories. Download-only installs without those sources report failed verification.

المصدر المعتمد للمشغّل هو `cli/` داخل هذا المستودع. يُبنى منه التنزيل للأنظمة المدعومة؛ المسار القديم في مساحة العمل يحيل إليه. التحقق يحتاج مجلدات المصدر الفعلية ولا يعلن النجاح عند غيابها.

The production `crewloom.org` domain is hosted on Vercel. `vercel.json` selects `npm ci` and runs CLI verification before the full build, so deployment does not select the unrelated legacy pnpm lockfile. GitHub Pages uses the custom Actions workflow as a separate deployment target. Verify the actual HTTPS download bytes after publication; a successful GitHub workflow alone does not establish the production-domain version.
