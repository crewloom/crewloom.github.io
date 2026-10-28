/**
 * Crewloom Sovereign AI Agent Engine — Official CLI Banner & Logo
 * Geometry and brand colors matching agent/apps/crewloom-desktop/src/lib/logo-geometry.ts
 * and .agent/skills/crewloom-brand-kit/references/brand.md
 */

import { translate } from './messages.js';

export function getTerminalColors(stream = process.stdout) {
  // 1. Color disabled check
  const isColorDisabled =
    process.env.NO_COLOR !== undefined ||
    process.env.NODE_DISABLE_COLORS === '1' ||
    process.env.FORCE_COLOR === '0' ||
    (!process.env.FORCE_COLOR && process.env.TERM === 'dumb') ||
    (stream && !stream.isTTY && !process.env.FORCE_COLOR && !process.env.CI);

  if (isColorDisabled) {
    return {
      mode: 'none',
      isTrueColor: false,
      warp: '',
      weft: '',
      sky: '',
      tileBorder: '',
      text: '',
      white: '',
      bold: '',
      dim: '',
      muted: '',
      badgeBg: '',
      reset: '',
    };
  }

  // 2. Check if TrueColor (24-bit RGB) is supported
  const isTrueColor =
    process.env.COLORTERM === 'truecolor' ||
    process.env.COLORTERM === '24bit' ||
    Boolean(process.env.WT_SESSION) ||
    Boolean(process.env.VSCODE_PID) ||
    Boolean(
      process.env.TERM_PROGRAM &&
        /^(Apple_Terminal|iTerm\.app|vscode|ghostty|WarpTerminal|Hyper|alacritty|foot|wezterm)$/i.test(
          process.env.TERM_PROGRAM,
        ),
    ) ||
    (process.platform === 'darwin' && process.env.TERM !== 'dumb') ||
    (process.env.TERM && /-(24bit|truecolor)$/i.test(process.env.TERM)) ||
    (process.env.TERM && /^(xterm-256color|screen-256color|tmux-256color|alacritty|kitty|rxvt)/i.test(process.env.TERM));

  if (isTrueColor) {
    return {
      mode: 'truecolor',
      isTrueColor: true,
      tileBorder: '\x1b[38;2;71;85;105m',   // #475569 Slate 600
      warp: '\x1b[1;38;2;115;136;245m',     // #7388f5 (Memory / Warp - periwinkle)
      weft: '\x1b[1;38;2;45;212;191m',      // #2dd4bf (Roles / Weft - luminous teal)
      sky: '\x1b[1;38;2;56;189;248m',       // #38bdf8 (Evidence sky blue)
      text: '\x1b[38;2;241;245;249m',       // #f1f5f9
      white: '\x1b[1;38;2;255;255;255m',
      bold: '\x1b[1m',
      dim: '\x1b[38;2;148;163;184m',        // #94a3b8
      muted: '\x1b[38;2;100;116;139m',      // #64748b
      badgeBg: '\x1b[48;2;30;41;59m\x1b[38;2;241;245;249m\x1b[1m',
      reset: '\x1b[0m',
    };
  }

  // 3. High-fidelity 256-color fallback
  return {
    mode: '256',
    isTrueColor: false,
    tileBorder: '\x1b[38;5;242m',
    warp: '\x1b[1;38;5;105m',
    weft: '\x1b[1;38;5;43m',
    sky: '\x1b[1;38;5;81m',
    text: '\x1b[38;5;254m',
    white: '\x1b[1;38;5;255m',
    bold: '\x1b[1m',
    dim: '\x1b[38;5;246m',
    muted: '\x1b[38;5;242m',
    badgeBg: '\x1b[48;5;236m\x1b[38;5;254m\x1b[1m',
    reset: '\x1b[0m',
  };
}

function brandGradientColor(t) {
  const cTeal = [45, 212, 191];
  const cSky = [56, 189, 248];
  const cWarp = [115, 136, 245];
  const lerp = (a, b, u) => Math.round(a + (b - a) * u);
  let r, g, b;
  if (t < 0.5) {
    const u = t * 2;
    r = lerp(cTeal[0], cSky[0], u);
    g = lerp(cTeal[1], cSky[1], u);
    b = lerp(cTeal[2], cSky[2], u);
  } else {
    const u = (t - 0.5) * 2;
    r = lerp(cSky[0], cWarp[0], u);
    g = lerp(cSky[1], cWarp[1], u);
    b = lerp(cSky[2], cWarp[2], u);
  }
  return `\x1b[38;2;${r};${g};${b}m`;
}

function gradientText(text, colors) {
  if (colors.mode === 'none') return text;
  if (colors.mode === 'truecolor') {
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const t = text.length > 1 ? i / (text.length - 1) : 0;
      out += `${brandGradientColor(t)}${text[i]}`;
    }
    return out + colors.reset;
  }
  return `${colors.weft}${text}${colors.reset}`;
}

function formatTagline(templateKey, roleKey, memoryKey, evidenceKey, c, isAlt) {
  const template = translate(templateKey);
  const roleText = translate(roleKey);
  const memoryText = translate(memoryKey);
  const evidenceText = translate(evidenceKey);

  const baseStyle = isAlt ? c.muted : c.dim;
  const roleFormatted = c.weft ? `${c.weft}${roleText}${c.reset}${baseStyle}` : roleText;
  const memoryFormatted = c.warp ? `${c.warp}${memoryText}${c.reset}${baseStyle}` : memoryText;
  const evidenceFormatted = c.sky ? `${c.sky}${evidenceText}${c.reset}${baseStyle}` : evidenceText;

  const content = template
    .replace('{role}', roleFormatted)
    .replace('{memory}', memoryFormatted)
    .replace('{evidence}', evidenceFormatted);

  return `${baseStyle}${content}${c.reset}`;
}

export function renderBanner(version = '1.0.1', stream = process.stdout) {
  const c = getTerminalColors(stream);
  const subtitle = translate('bannerSubtitle');
  const core = translate('bannerCore');

  const wordmark = gradientText('C R E W L O O M', c);
  const badgeStr = c.badgeBg ? `${c.badgeBg} v${version} ${c.reset}` : `v${version}`;

  const primaryTagline = formatTagline('bannerTagline', 'bannerRole', 'bannerMemory', 'bannerEvidence', c, false);
  const secondaryTagline = formatTagline('bannerTaglineAlt', 'bannerRoleAlt', 'bannerMemoryAlt', 'bannerEvidenceAlt', c, true);

  const B = c.tileBorder;
  const W = c.warp;
  const F = c.weft;
  const R = c.reset;
  const E = `${c.sky}◎${R}`;

  // Authentic 17-character rounded tile representing logo.svg
  const t0 = `  ${B}╭───────────────╮${R}`;
  const t1 = `  ${B}│${R}   ${W}║${R}   ${W}║${R}   ${W}║${R}   ${B}│${R}`;
  const t2 = `  ${B}│${R} ${F}══${R}${W}╬${R}${F}═══════${R}${W}╬${R}${F}══${R} ${B}│${R}`;
  const t3 = `  ${B}│${R} ${F}═══════${R}${W}╬${R}${F}═══${E}  ${B}│${R}`;
  const t4 = `  ${B}│${R} ${F}══${R}${W}╬${R}${F}═══════${R}${W}╬${R}${F}══${R} ${B}│${R}`;
  const t5 = `  ${B}│${R}   ${W}║${R}   ${W}║${R}   ${W}║${R}   ${B}│${R}`;
  const t6 = `  ${B}╰───────────────╯${R}`;

  return `
${t0}
${t1}   ${c.bold}${wordmark}${c.reset}  ${badgeStr}
${t2}   ${c.dim}${subtitle}${c.reset}
${t3}   ${c.warp}${core}${c.reset}
${t4}   ${primaryTagline}
${t5}   ${secondaryTagline}
${t6}
`;
}
