# Changelog

## 1.1.0 — 2026-11-08

- **VoiceStudio integration preview:** Custom client API alignment and microphone UI are being verified; original engine and model weights require separate installation. No completed engine integration or comparative quality is certified.
- **Studio-Grade In-App Microphone Recording:** Lossless 16-bit linear PCM mono WAV recording directly from the desktop webview, featuring real-time VU meter / waveform visualizer, 5-30s duration safety, and instant preview playback.
- **Reference reading prompts:** Bilingual sample text is available. No measured fidelity or phoneme-alignment improvement has been established.
- **Voice fallback:** Local browser voices only; failure is visible when no permitted engine is available. Cloud playback is not configured in the desktop preview.
- **Voice tool definitions:** Definitions exist; production host registration and original-engine execution remain unverified.
- **Strict Internationalization:** Zero inline ternary localizations (`isAr ?`) enforced with 100% Arabic and English dictionary key parity.

## 1.0.14 — 2026-11-04

- Resolve synchronized macOS asset architecture for versioned GitHub download URLs while preserving repository and CPU isolation.
- Propagate both workspace verification suite failures through the launcher and portable distribution.
- Document release asset selection and CLI verification behavior.

## 1.0.8 — 2026-10-27

- Make Vercel install the npm lockfile and verify the CLI before the complete build, matching the validated GitHub pipeline.
- Deploy the current CLI source to the production domain; keep GitHub Pages in workflow mode.

## 1.0.7 — 2026-10-27

- Own the CLI 1.0.1 source in `cli/`, retaining the previous workspace entry points as forwarding adapters.
- Preserve existing initialization configuration and report missing, failed, interrupted, or unlaunchable verification suites with a nonzero exit status.
- Build portable downloads from one source; point installers at deployed bundles and use the explicit ESM download on Windows.
- Resolve source workspaces independently of installation location; synchronize reported CLI version with package metadata.
- Check source and portable downloads before deployment, including Node 18 compatibility. Attach the CLI source package to the GitHub Release; npm-registry publication is separate.
