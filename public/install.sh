#!/usr/bin/env bash
# ==============================================================================
# Crewloom Sovereign AI Agent Installer
# https://crewloom.org
# ==============================================================================

set -e

echo ""
echo "  ╔══════════════════════════════════════════════════════════╗"
echo "  ║  CREWLOOM SOVEREIGN AI AGENT — INSTALLER v1.0.0        ║"
echo "  ║  Dual Bicultural Core · 44 Specialist Skills            ║"
echo "  ╚══════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "  [ERROR] Node.js is required but not installed."
    echo "  Please install Node.js (v18+) from https://nodejs.org or via brew:"
    echo "    brew install node"
    exit 1
fi

NODE_VER=$(node -v)
echo "  ✓ Detected Node.js: $NODE_VER"

INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

echo "  ▶ Installing Crewloom Sovereign CLI..."

cat << 'EOF' > "$INSTALL_DIR/crewloom"
#!/usr/bin/env node
import { spawn } from 'child_process';
import fs from 'fs';

const localCli = '/Volumes/data/projects/crewloom/cli/bin/crewloom.js';
if (fs.existsSync(localCli)) {
  const child = spawn('node', [localCli, ...process.argv.slice(2)], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code || 0));
} else {
  const child = spawn('npx', ['-y', 'crewloom', ...process.argv.slice(2)], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code || 0));
}
EOF

chmod +x "$INSTALL_DIR/crewloom"
ln -sf "$INSTALL_DIR/crewloom" "$INSTALL_DIR/cl" 2>/dev/null || true

echo "  ✓ Crewloom CLI installed to: $INSTALL_DIR/crewloom"

# Check PATH
case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *)
        echo ""
        echo "  [NOTE] Please add $INSTALL_DIR to your PATH:"
        echo "    echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc"
        echo "    source ~/.zshrc"
        ;;
esac

echo ""
echo "  🎉 Success! Crewloom is ready to launch."
echo "  Run: crewloom roles or crewloom --help"
echo ""
