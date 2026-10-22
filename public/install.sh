#!/usr/bin/env bash
# ==============================================================================
# Crewloom Sovereign AI Agent Installer
# https://crewloom.org
# ==============================================================================

set -e

echo ""
echo "  ╔══════════════════════════════════════════════════════════╗"
echo "  ║  CREWLOOM SOVEREIGN AI AGENT — INSTALLER v2.1.0        ║"
echo "  ║  Dual Bicultural Core · Zero-Destruction Guaranteed     ║"
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

# Install global CLI wrapper
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

echo "  ▶ Linking global CLI executable..."

cat << 'EOF' > "$INSTALL_DIR/crewloom"
#!/usr/bin/env bash
if [ -f "/Volumes/data/rumuze-edit/dist/index.js" ]; then
    exec node --no-warnings /Volumes/data/rumuze-edit/dist/index.js "$@"
elif [ -f "/Volumes/data/projects/crewloom/bridge/dist/index.js" ]; then
    exec node --no-warnings /Volumes/data/projects/crewloom/bridge/dist/index.js "$@"
elif [ -f "/Volumes/data/projects/crewloom/agent/dist/index.js" ]; then
    exec node --no-warnings /Volumes/data/projects/crewloom/agent/dist/index.js "$@"
else
    exec npx -y agentgram "$@"
fi
EOF

chmod +x "$INSTALL_DIR/crewloom"

# Also symlink cl-bridge and crewloom-bridge
ln -sf "$INSTALL_DIR/crewloom" "$INSTALL_DIR/crewloom-bridge" 2>/dev/null || true
ln -sf "$INSTALL_DIR/crewloom" "$INSTALL_DIR/cl-bridge" 2>/dev/null || true

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
echo "  Run: crewloom --help or crewloom init"
echo ""
