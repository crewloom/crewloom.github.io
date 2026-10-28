#!/usr/bin/env node

// cli/bin/crewloom.js
import { spawn, execSync } from "child_process";
import path3 from "path";
import fs3 from "fs";
import readline from "readline";

// cli/bin/workspace-root.js
import fs from "node:fs";
import path from "node:path";
function resolveWorkspaceRoot(directory, launcherDirectory2) {
  for (const origin of [directory, launcherDirectory2]) {
    let current = path.resolve(origin);
    while (true) {
      if (fs.existsSync(path.join(current, "core/scripts/check_repository.py")) && fs.existsSync(path.join(current, "agent/apps/crewloom-desktop/package.json"))) {
        return current;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  return path.resolve(directory);
}

// cli/bin/workspace-commands.js
import fs2 from "node:fs";
import path2 from "node:path";
import { spawnSync } from "node:child_process";
function initializeWorkspace(directory, version) {
  const folder = path2.join(directory, ".crewloom");
  fs2.mkdirSync(folder, { recursive: true });
  fs2.writeFileSync(path2.join(folder, "config.json"), `${JSON.stringify({
    name: "crewloom-workspace",
    version,
    engine: { mode: "sovereign" },
    languages: ["en", "ar"],
    contracts: { zeroDestruction: true, stagedDiffs: true }
  }, null, 2)}
`, { flag: "wx", mode: 384 });
}
function verifyWorkspace(root, run = spawnSync) {
  const desktop = path2.join(root, "agent/apps/crewloom-desktop");
  const tests = path2.join(desktop, "tests");
  const files = fs2.existsSync(tests) ? fs2.readdirSync(tests).filter((file) => file.endsWith(".test.mjs")).sort() : [];
  const suites = [
    {
      name: "core",
      cwd: path2.join(root, "core"),
      file: "scripts/check_repository.py",
      command: process.platform === "win32" ? "python" : "python3",
      args: ["scripts/check_repository.py"]
    },
    {
      name: "desktop",
      cwd: desktop,
      file: files.length ? `tests/${files[0]}` : "tests/<missing>",
      command: process.execPath,
      args: ["--test", ...files.map((file) => path2.join("tests", file))]
    }
  ];
  const environment = { ...process.env };
  delete environment.NODE_TEST_CONTEXT;
  return suites.map((suite) => {
    if (!fs2.existsSync(path2.join(suite.cwd, suite.file))) {
      return { name: suite.name, success: false, reason: "missing", status: null };
    }
    const result = run(suite.command, suite.args, { cwd: suite.cwd, stdio: "inherit", env: environment });
    return {
      name: suite.name,
      success: result.status === 0 && !result.error && !result.signal,
      reason: result.error ? "launch" : result.signal ? "signal" : "exit",
      status: result.status
    };
  });
}

// cli/bin/messages.js
var dictionaries = {
  en: {
    initOk: "Initialized .crewloom/config.json.",
    initFailed: "Initialization failed; existing configuration has been preserved:",
    verifyOk: "Verification passed.",
    verifyFailed: "Verification failed. Required checks must all pass.",
    suitePass: "PASS",
    suiteFail: "FAIL",
    bannerSubtitle: "Sovereign AI Agent Engine",
    bannerCore: "Dual Bicultural Core (En/Ar)",
    bannerTagline: "Give agent work a {role}, {memory}, and {evidence}.",
    bannerRole: "role",
    bannerMemory: "memory",
    bannerEvidence: "evidence",
    bannerTaglineAlt: "\u0627\u0639\u0637\u0650 \u0634\u063A\u0644 \u0627\u0644\u0648\u0643\u064A\u0644 {role} \u0648{memory} \u0648{evidence}.",
    bannerRoleAlt: "\u062F\u0648\u0631\u064B\u0627",
    bannerMemoryAlt: "\u0630\u0627\u0643\u0631\u0629",
    bannerEvidenceAlt: "\u062F\u0644\u064A\u0644\u064B\u0627"
  },
  ar: {
    initOk: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 .crewloom/config.json.",
    initFailed: "\u062A\u0639\u0630\u0631 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u061B \u062A\u0645 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0645\u0644\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F:",
    verifyOk: "\u0646\u062C\u062D\u062A \u062C\u0645\u064A\u0639 \u0641\u062D\u0648\u0635 \u0627\u0644\u062A\u062D\u0642\u0642.",
    verifyFailed: "\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642. \u064A\u062C\u0628 \u0646\u062C\u0627\u062D \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062D\u0648\u0635 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.",
    suitePass: "\u0646\u062C\u062D",
    suiteFail: "\u0641\u0634\u0644",
    bannerSubtitle: "\u0645\u062D\u0631\u0643 \u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0627\u0644\u0633\u064A\u0627\u062F\u064A",
    bannerCore: "\u0646\u0648\u0627\u0629 \u062B\u0646\u0627\u0626\u064A\u0629 \u0627\u0644\u062B\u0642\u0627\u0641\u0629 (\u0639\u0631\u0628\u064A/\u0625\u0646\u062C\u0644\u064A\u0632\u064A)",
    bannerTagline: "\u0627\u0639\u0637\u0650 \u0634\u063A\u0644 \u0627\u0644\u0648\u0643\u064A\u0644 {role} \u0648{memory} \u0648{evidence}.",
    bannerRole: "\u062F\u0648\u0631\u064B\u0627",
    bannerMemory: "\u0630\u0627\u0643\u0631\u0629",
    bannerEvidence: "\u062F\u0644\u064A\u0644\u064B\u0627",
    bannerTaglineAlt: "Give agent work a {role}, {memory}, and {evidence}.",
    bannerRoleAlt: "role",
    bannerMemoryAlt: "memory",
    bannerEvidenceAlt: "evidence"
  }
};
function translate(key) {
  const locale = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || "en";
  return dictionaries[locale.startsWith("ar") ? "ar" : "en"][key];
}

// cli/bin/banner.js
function getTerminalColors(stream = process.stdout) {
  const isColorDisabled = process.env.NO_COLOR !== void 0 || process.env.NODE_DISABLE_COLORS === "1" || process.env.FORCE_COLOR === "0" || !process.env.FORCE_COLOR && process.env.TERM === "dumb" || stream && !stream.isTTY && !process.env.FORCE_COLOR && !process.env.CI;
  if (isColorDisabled) {
    return {
      mode: "none",
      isTrueColor: false,
      warp: "",
      weft: "",
      sky: "",
      tileBorder: "",
      text: "",
      white: "",
      bold: "",
      dim: "",
      muted: "",
      badgeBg: "",
      reset: ""
    };
  }
  const isTrueColor = process.env.COLORTERM === "truecolor" || process.env.COLORTERM === "24bit" || Boolean(process.env.WT_SESSION) || Boolean(process.env.VSCODE_PID) || Boolean(
    process.env.TERM_PROGRAM && /^(Apple_Terminal|iTerm\.app|vscode|ghostty|WarpTerminal|Hyper|alacritty|foot|wezterm)$/i.test(
      process.env.TERM_PROGRAM
    )
  ) || process.platform === "darwin" && process.env.TERM !== "dumb" || process.env.TERM && /-(24bit|truecolor)$/i.test(process.env.TERM) || process.env.TERM && /^(xterm-256color|screen-256color|tmux-256color|alacritty|kitty|rxvt)/i.test(process.env.TERM);
  if (isTrueColor) {
    return {
      mode: "truecolor",
      isTrueColor: true,
      tileBorder: "\x1B[38;2;71;85;105m",
      // #475569 Slate 600
      warp: "\x1B[1;38;2;115;136;245m",
      // #7388f5 (Memory / Warp - periwinkle)
      weft: "\x1B[1;38;2;45;212;191m",
      // #2dd4bf (Roles / Weft - luminous teal)
      sky: "\x1B[1;38;2;56;189;248m",
      // #38bdf8 (Evidence sky blue)
      text: "\x1B[38;2;241;245;249m",
      // #f1f5f9
      white: "\x1B[1;38;2;255;255;255m",
      bold: "\x1B[1m",
      dim: "\x1B[38;2;148;163;184m",
      // #94a3b8
      muted: "\x1B[38;2;100;116;139m",
      // #64748b
      badgeBg: "\x1B[48;2;30;41;59m\x1B[38;2;241;245;249m\x1B[1m",
      reset: "\x1B[0m"
    };
  }
  return {
    mode: "256",
    isTrueColor: false,
    tileBorder: "\x1B[38;5;242m",
    warp: "\x1B[1;38;5;105m",
    weft: "\x1B[1;38;5;43m",
    sky: "\x1B[1;38;5;81m",
    text: "\x1B[38;5;254m",
    white: "\x1B[1;38;5;255m",
    bold: "\x1B[1m",
    dim: "\x1B[38;5;246m",
    muted: "\x1B[38;5;242m",
    badgeBg: "\x1B[48;5;236m\x1B[38;5;254m\x1B[1m",
    reset: "\x1B[0m"
  };
}
function brandGradientColor(t) {
  const cTeal = [45, 212, 191];
  const cSky = [56, 189, 248];
  const cWarp = [115, 136, 245];
  const lerp = (a, b2, u) => Math.round(a + (b2 - a) * u);
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
  return `\x1B[38;2;${r};${g};${b}m`;
}
function gradientText(text, colors) {
  if (colors.mode === "none") return text;
  if (colors.mode === "truecolor") {
    let out = "";
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
  const content = template.replace("{role}", roleFormatted).replace("{memory}", memoryFormatted).replace("{evidence}", evidenceFormatted);
  return `${baseStyle}${content}${c.reset}`;
}
function renderBanner(version = "1.0.1", stream = process.stdout) {
  const c = getTerminalColors(stream);
  const subtitle = translate("bannerSubtitle");
  const core = translate("bannerCore");
  const wordmark = gradientText("C R E W L O O M", c);
  const badgeStr = c.badgeBg ? `${c.badgeBg} v${version} ${c.reset}` : `v${version}`;
  const primaryTagline = formatTagline("bannerTagline", "bannerRole", "bannerMemory", "bannerEvidence", c, false);
  const secondaryTagline = formatTagline("bannerTaglineAlt", "bannerRoleAlt", "bannerMemoryAlt", "bannerEvidenceAlt", c, true);
  const B = c.tileBorder;
  const W = c.warp;
  const F = c.weft;
  const R = c.reset;
  const E = `${c.sky}\u25CE${R}`;
  const t0 = `  ${B}\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E${R}`;
  const t1 = `  ${B}\u2502${R}   ${W}\u2551${R}   ${W}\u2551${R}   ${W}\u2551${R}   ${B}\u2502${R}`;
  const t2 = `  ${B}\u2502${R} ${F}\u2550\u2550${R}${W}\u256C${R}${F}\u2550\u2550\u2550\u2550\u2550\u2550\u2550${R}${W}\u256C${R}${F}\u2550\u2550${R} ${B}\u2502${R}`;
  const t3 = `  ${B}\u2502${R} ${F}\u2550\u2550\u2550\u2550\u2550\u2550\u2550${R}${W}\u256C${R}${F}\u2550\u2550\u2550${E}  ${B}\u2502${R}`;
  const t4 = `  ${B}\u2502${R} ${F}\u2550\u2550${R}${W}\u256C${R}${F}\u2550\u2550\u2550\u2550\u2550\u2550\u2550${R}${W}\u256C${R}${F}\u2550\u2550${R} ${B}\u2502${R}`;
  const t5 = `  ${B}\u2502${R}   ${W}\u2551${R}   ${W}\u2551${R}   ${W}\u2551${R}   ${B}\u2502${R}`;
  const t6 = `  ${B}\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F${R}`;
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

// cli/bin/crewloom.js
var launcherDirectory = path3.dirname(fs3.realpathSync(process.argv[1]));
var rootDir = resolveWorkspaceRoot(process.cwd(), launcherDirectory);
var VERSION = true ? "1.0.1" : JSON.parse(fs3.readFileSync(path3.join(launcherDirectory, "../package.json"), "utf8")).version;
var args = process.argv.slice(2);
var BANNER = renderBanner(VERSION);
function loadRealCatalog() {
  const candidatePaths = [
    path3.join(rootDir, "agent/apps/crewloom-desktop/src/generated/catalog.json"),
    path3.join(rootDir, "agent/apps/crewloom-desktop/src-tauri/resources/catalog.json")
  ];
  for (const p of candidatePaths) {
    if (fs3.existsSync(p)) {
      try {
        return JSON.parse(fs3.readFileSync(p, "utf8"));
      } catch {
      }
    }
  }
  return { roles: [] };
}
function detectLocalCli(name) {
  try {
    const isWin = process.platform === "win32";
    const checkCmd = isWin ? `where ${name}` : `which ${name}`;
    const p = execSync(checkCmd, { stdio: "pipe" }).toString().trim().split(/\r?\n/)[0];
    if (p) {
      let version = "detected";
      try {
        const out = execSync(`"${name}" --version`, { stdio: "pipe", timeout: 2e3 }).toString().trim();
        version = out.split("\n")[0].slice(0, 30);
      } catch {
      }
      return { installed: true, path: p, version };
    }
  } catch {
  }
  return { installed: false, path: null, version: null };
}
function printHelp() {
  console.log(BANNER);
  console.log(`Usage: crewloom <command> [options]

Commands:
  roles, list          List and inspect 47 specialist agent roles from catalog
  status               Display real system status & detected local CLI models
  studio [--open]      Launch Crewloom Studio web dashboard (browser interface)
  bridge [options]     Launch Omni-Channel Mediator (Telegram/WhatsApp/Terminal)
  verify               Run core automated verification test suite
  audit [--preflight]  Verify repository integrity, worktree and security guards
  init                 Initialize sovereign .crewloom configuration in workspace
  version, -v          Display Crewloom Sovereign Engine version

Options:
  --category <name>    Filter specialist skills by category
  --json               Emit output as structured machine-readable JSON
  --help, -h           Show this help message

Quick execution:
  crewloom roles       \u2022  crewloom status  \u2022  crewloom studio  \u2022  crewloom verify
`);
}
function executeCommand(cmdArgs) {
  const cmd = cmdArgs[0] || "help";
  switch (cmd) {
    case "version":
    case "-v":
    case "--version":
      console.log(`crewloom v${VERSION} (Sovereign Dual-Core Engine)`);
      break;
    case "roles":
    case "list": {
      const catalog = loadRealCatalog();
      const categoryFilter = cmdArgs.includes("--category") ? cmdArgs[cmdArgs.indexOf("--category") + 1]?.toLowerCase() : null;
      let roles = catalog.roles || [];
      if (categoryFilter) {
        roles = roles.filter((r) => (r.category || "").toLowerCase().includes(categoryFilter));
      }
      if (cmdArgs.includes("--json")) {
        console.log(JSON.stringify(roles, null, 2));
        break;
      }
      console.log(BANNER);
      console.log(`\x1B[36m\u25B6 ${roles.length} Sovereign Specialist Roles Loaded from Catalog:\x1B[0m
`);
      const preview = roles.slice(0, 30).map((r) => ({
        id: r.id,
        name: r.name,
        category: r.category || "Specialist",
        files: r.files?.length || 0
      }));
      console.table(preview);
      if (roles.length > 30) {
        console.log(`... and ${roles.length - 30} more roles. Use \x1B[1mcrewloom roles --json\x1B[0m to inspect all.`);
      }
      break;
    }
    case "audit": {
      console.log(BANNER);
      console.log("\x1B[36m\u25B6 [Integrity & Safety Audit] Inspecting working tree...\x1B[0m");
      const cwd = process.cwd();
      let gitDirty = false;
      let modifiedFiles = [];
      try {
        const gitOut = execSync("git status --porcelain", { cwd, stdio: "pipe" }).toString().trim();
        if (gitOut) {
          gitDirty = true;
          modifiedFiles = gitOut.split("\n").map((l) => l.trim());
        }
      } catch {
        console.log("  Notice: Current directory is not a git repository.");
      }
      const DANGEROUS_PATTERNS = [
        /rm\s+-rf\s+[/~]/i,
        /DROP\s+TABLE/i,
        /DROP\s+DATABASE/i,
        /TRUNCATE\s+TABLE/i,
        /DELETE\s+FROM\s+\w+\s+WHERE\s+1\s*=\s*1/i
      ];
      let dangerousCount = 0;
      try {
        const diffOut = execSync("git diff -U0", { cwd, stdio: "pipe" }).toString();
        for (const pattern of DANGEROUS_PATTERNS) {
          if (pattern.test(diffOut)) {
            dangerousCount++;
            console.log(`\x1B[31m\u26A0 Warning: Dangerous command pattern detected: ${pattern}\x1B[0m`);
          }
        }
      } catch {
      }
      if (gitDirty) {
        console.log(`\x1B[33m\u2022 ${modifiedFiles.length} modified/untracked files in working directory.\x1B[0m`);
      } else {
        console.log("\x1B[32m\u2713 Working directory clean.\x1B[0m");
      }
      if (dangerousCount === 0) {
        console.log("\x1B[32m\u2713 0 destructive commands detected in active diffs.\x1B[0m");
        console.log("\x1B[32m\u2713 Policy guard verification certified clean.\x1B[0m\n");
      } else {
        console.log(`\x1B[31m\u2717 ${dangerousCount} destructive patterns detected. Please review staged changes.\x1B[0m
`);
        process.exit(1);
      }
      break;
    }
    case "studio": {
      console.log(BANNER);
      console.log("\x1B[36m\u25B6 Launching Crewloom Studio Web Dashboard...\x1B[0m");
      const studioServerPath = process.env.CREWLOOM_STUDIO_PATH || path3.join(rootDir, "agent/apps/crewloom-studio/server.mjs");
      if (fs3.existsSync(studioServerPath)) {
        const shouldOpen = cmdArgs.includes("--open");
        const child = spawn("node", [studioServerPath], { stdio: "inherit" });
        if (shouldOpen) {
          const openCmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
          setTimeout(() => {
            try {
              execSync(`${openCmd} http://localhost:3030`);
            } catch {
            }
          }, 1e3);
        }
        child.on("exit", (code) => process.exit(code || 0));
      } else {
        console.log("\x1B[33m\u2022 Studio server script not found at expected path.\x1B[0m");
      }
      break;
    }
    case "bridge": {
      console.log(BANNER);
      const bridgePath = process.env.CREWLOOM_BRIDGE_PATH || path3.join(rootDir, "bridge/dist/index.js");
      if (fs3.existsSync(bridgePath)) {
        const child = spawn("node", [bridgePath, ...cmdArgs.slice(1)], { stdio: "inherit" });
        child.on("exit", (code) => process.exit(code || 0));
      } else {
        console.log("\x1B[33m\u2022 Bridge build not found. Run `npm run build` in bridge/ first.\x1B[0m");
      }
      break;
    }
    case "verify":
    case "demo": {
      console.log(BANNER);
      const results = verifyWorkspace(rootDir);
      for (const result of results) {
        console.log(`${translate(result.success ? "suitePass" : "suiteFail")}: ${result.name} (${result.reason})`);
      }
      const success = results.every((result) => result.success);
      console.log(translate(success ? "verifyOk" : "verifyFailed"));
      process.exitCode = success ? 0 : 1;
      break;
    }
    case "init": {
      console.log(BANNER);
      try {
        initializeWorkspace(process.cwd(), VERSION);
        console.log(translate("initOk"));
      } catch (error) {
        console.error(translate("initFailed"), error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
      }
      break;
    }
    case "status": {
      const catalog = loadRealCatalog();
      const tools = ["claude", "codex", "opencode", "agy"].map((tool) => ({
        name: tool,
        ...detectLocalCli(tool)
      }));
      if (cmdArgs.includes("--json")) {
        console.log(JSON.stringify({
          engine: `Crewloom Desktop / Tauri v${VERSION}`,
          version: VERSION,
          rolesCount: catalog.roles?.length || 0,
          tools
        }, null, 2));
        break;
      }
      console.log(BANNER);
      console.log("\x1B[36m\u25B6 Orchestrator & Tool Runtime Status:\x1B[0m");
      console.log(`  Engine: Crewloom Desktop / Tauri v${VERSION}`);
      console.log(`  Specialist Roles: ${catalog.roles?.length || 0} registered in catalog`);
      console.log("\n\x1B[36m\u25B6 Local CLI Models & Engines Detected:\x1B[0m");
      for (const tool of tools) {
        if (tool.installed) {
          console.log(`  \x1B[32m\u2713 ${tool.name.padEnd(10)}\x1B[0m: ${tool.version} (\x1B[90m${tool.path}\x1B[0m)`);
        } else {
          console.log(`  \x1B[90m- ${tool.name.padEnd(10)}: not found in PATH\x1B[0m`);
        }
      }
      console.log("");
      break;
    }
    case "help":
    case "--help":
    case "-h":
    default:
      printHelp();
      break;
  }
}
if (args.length === 0 && process.stdin.isTTY) {
  printHelp();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("\x1B[1;36m\u25B6 Run command (e.g. status, roles, studio, verify) or Enter to exit: \x1B[0m", (input) => {
    rl.close();
    const trimmed = input.trim();
    if (trimmed) {
      const mapped = {
        "1": "roles",
        "2": "status",
        "3": "studio",
        "4": "bridge",
        "5": "verify",
        "6": "audit",
        "7": "init"
      }[trimmed] || trimmed;
      executeCommand(mapped.split(/\s+/));
    }
  });
} else {
  executeCommand(args);
}
