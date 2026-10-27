# Crewloom website

The Next.js site is statically exported with Arabic (`/ar/`) and English (`/`) pages. Read the installed Next documentation before changing framework behavior.

## Verification

- `node --test tests/release-assets.test.mjs` checks release asset parsing and CPU-specific selection.
- `npm run build` runs metadata/SEO preparation, the Next build and export synchronization.
- `npm run test:seo` checks the generated pages.

`lib/release-assets.ts` owns asset validation and architecture selection for both server and client release readers. A generic `.dmg` filename does not prove its CPU architecture; explicit synchronized metadata may identify a known asset by its exact URL and name. Intel downloads require an x86_64 installer or an explicitly universal one. If no compatible asset exists, the UI shows an unavailable state in both dictionaries and does not substitute an ARM download. File name, URL and size come from the same selected asset.

The exported `/api/releases/latest/` response is generated at build time, not a running five-minute API service on GitHub Pages. Client fallback may read GitHub when that static response is unavailable. Generated root pages and static chunks are deployment artifacts; review source separately and do not include unrelated build output in a source fix.

الموقع يدعم العربية والإنجليزية. اختيار مثبت Intel لا يعيد استخدام حزمة ARM؛ عند غياب المثبت المطابق تظهر حالة عدم التوفر. بيانات API في النسخة الثابتة تُبنى وقت البناء ولا تمثل خدمة حية تتجدد كل خمس دقائق.
