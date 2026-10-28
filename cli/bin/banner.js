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
      warpBright: '',
      weft: '',
      weftBright: '',
      ring1: '',
      ring2: '',
      ring3: '',
      sky: '',
      skyBright: '',
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
      warp: '\x1b[38;2;115;136;245m',       // #7388f5 (Memory / Warp - periwinkle)
      warpBright: '\x1b[1;38;2;147;165;255m', // #93a5ff
      weft: '\x1b[38;2;45;212;191m',        // #2dd4bf (Roles / Weft - luminous teal)
      weftBright: '\x1b[1;38;2;94;234;212m', // #5eead4
      ring1: '\x1b[38;2;45;212;191m',       // #2dd4bf
      ring2: '\x1b[38;2;56;189;248m',       // #38bdf8 (Evidence sky blue)
      ring3: '\x1b[1;38;2;125;211;252m',    // #7dd3fc
      sky: '\x1b[38;2;56;189;248m',         // #38bdf8
      skyBright: '\x1b[1;38;2;125;211;252m',
      text: '\x1b[38;2;237;242;247m',       // #edf2f7
      white: '\x1b[1;38;2;255;255;255m',
      bold: '\x1b[1m',
      dim: '\x1b[38;2;148;163;184m',        // #94a3b8
      muted: '\x1b[38;2;100;116;139m',      // #64748b
      badgeBg: '\x1b[48;2;30;41;59m\x1b[38;2;241;245;249m\x1b[1m', // #1e293b / #f1f5f9
      reset: '\x1b[0m',
    };
  }

  // 3. High-fidelity 256-color fallback
  const is256Color =
    Boolean(process.env.TERM && /256color/i.test(process.env.TERM)) ||
    Boolean(process.env.TERM_PROGRAM);

  if (is256Color) {
    return {
      mode: '256',
      isTrueColor: false,
      warp: '\x1b[38;5;105m',
      warpBright: '\x1b[1;38;5;147m',
      weft: '\x1b[38;5;43m',
      weftBright: '\x1b[1;38;5;79m',
      ring1: '\x1b[38;5;43m',
      ring2: '\x1b[38;5;81m',
      ring3: '\x1b[1;38;5;117m',
      sky: '\x1b[38;5;81m',
      skyBright: '\x1b[1;38;5;117m',
      text: '\x1b[38;5;253m',
      white: '\x1b[1;38;5;255m',
      bold: '\x1b[1m',
      dim: '\x1b[38;5;246m',
      muted: '\x1b[38;5;242m',
      badgeBg: '\x1b[48;5;236m\x1b[38;5;254m\x1b[1m',
      reset: '\x1b[0m',
    };
  }

  // 4. Standard 16-color ANSI fallback
  return {
    mode: '16',
    isTrueColor: false,
    warp: '\x1b[1;34m',
    warpBright: '\x1b[1;94m',
    weft: '\x1b[36m',
    weftBright: '\x1b[1;96m',
    ring1: '\x1b[36m',
    ring2: '\x1b[1;96m',
    ring3: '\x1b[96m',
    sky: '\x1b[1;96m',
    skyBright: '\x1b[1;96m',
    text: '\x1b[37m',
    white: '\x1b[1;97m',
    bold: '\x1b[1m',
    dim: '\x1b[90m',
    muted: '\x1b[90m',
    badgeBg: '\x1b[7m',
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

function renderWordmarkLine(line, colors) {
  if (colors.mode === 'none') return line;
  if (colors.mode === 'truecolor') {
    let out = '';
    for (let i = 0; i < line.length; i++) {
      const t = line.length > 1 ? i / (line.length - 1) : 0;
      out += `${brandGradientColor(t)}${line[i]}`;
    }
    return out + colors.reset;
  }
  if (colors.mode === '256') {
    const stops = [43, 44, 81, 75, 105];
    let out = '';
    for (let i = 0; i < line.length; i++) {
      const idx = Math.min(stops.length - 1, Math.floor((i / line.length) * stops.length));
      out += `\x1b[38;5;${stops[idx]}m${line[i]}`;
    }
    return out + colors.reset;
  }
  return `\x1b[1;96m${line}\x1b[0m`;
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

const WORDMARK_LINES = [
  '█▀▀ █▀█ █▀▀ █   █ █   █▀█ █▀█ █▀▄▀█',
  '█   █▀▄ ██▄ █ █ █ █   █ █ █ █ █ █ █',
  '▀▀▀ ▀ ▀ ▀▀▀  ▀ ▀  ▀▀▀ ▀▀▀ ▀▀▀ ▀   ▀',
];

export function renderBanner(version = '1.0.1', stream = process.stdout) {
  const c = getTerminalColors(stream);
  const subtitle = translate('bannerSubtitle');
  const core = translate('bannerCore');

  const w1 = renderWordmarkLine(WORDMARK_LINES[0], c);
  const w2 = renderWordmarkLine(WORDMARK_LINES[1], c);
  const w3 = renderWordmarkLine(WORDMARK_LINES[2], c);

  const badgeStr = c.badgeBg ? `${c.badgeBg} v${version} ${c.reset}` : `v${version}`;
  const primaryTagline = formatTagline('bannerTagline', 'bannerRole', 'bannerMemory', 'bannerEvidence', c, false);
  const secondaryTagline = formatTagline('bannerTaglineAlt', 'bannerRoleAlt', 'bannerMemoryAlt', 'bannerEvidenceAlt', c, true);

  const E = `${c.ring1}╢${c.ring2}◎${c.ring3}╟${c.reset}`;
  const W = c.warp;
  const F = c.weft;
  const R = c.reset;
  const GAP = '    ';

  // Precision 24-character weave lines
  const m0 = `       ${W}║${R}     ${W}║${R}     ${W}║${R}    `;
  const m1 = `    ${F}══${R} ${W}║${R} ${F}═════════${R} ${W}║${R} ${F}══${R} `;
  const m2 = `       ${W}║${R}     ${W}║${R}     ${W}║${R}    `;
  const m3 = `    ${F}════════${R} ${W}║${R} ${F}══════${E}`;
  const m4 = `       ${W}║${R}     ${W}║${R}     ${W}║${R}    `;
  const m5 = `    ${F}══${R} ${W}║${R} ${F}═════════${R} ${W}║${R} ${F}══${R} `;
  const m6 = `       ${W}║${R}     ${W}║${R}     ${W}║${R}    `;

  return `
${m0}${GAP}${w1}  ${badgeStr}
${m1}${GAP}${w2}  ${c.dim}${subtitle}${c.reset}
${m2}${GAP}${w3}  ${c.warp}${core}${c.reset}
${m3}${GAP}
${m4}${GAP}${primaryTagline}
${m5}${GAP}${secondaryTagline}
${m6}
`;
}
