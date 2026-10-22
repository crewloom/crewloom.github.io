#!/usr/bin/env bash
# ==============================================================================
# Crewloom Sovereign AI Agent Installer
# https://crewloom.org
# ==============================================================================

set -e

echo ""
echo "  \033[38;2;6;182;212m╔══════════════════════════════════════════════════════════╗\033[0m"
echo "  \033[38;2;6;182;212m║\033[0m  \033[1;37mCREWLOOM SOVEREIGN AI AGENT — INSTALLER v1.0.0\033[0m        \033[38;2;6;182;212m║\033[0m"
echo "  \033[38;2;6;182;212m║\033[0m  \033[38;2;16;185;129mDual Bicultural Core · Zero-Destruction Guaranteed\033[0m     \033[38;2;6;182;212m║\033[0m"
echo "  \033[38;2;6;182;212m╚══════════════════════════════════════════════════════════╝\033[0m"
echo ""

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "  \033[31m[ERROR]\033[0m Node.js is required but not installed."
    echo "  Please install Node.js (v18+) from https://nodejs.org or via brew:"
    echo "    brew install node"
    exit 1
fi

NODE_VER=$(node -v)
echo "  \033[32m✓\033[0m Detected Node.js: \033[1m$NODE_VER\033[0m"

# Install global CLI wrapper
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

echo "  \033[36m▶\033[0m Linking global CLI executable..."

cat << 'EOF' > "$INSTALL_DIR/crewloom"
#!/usr/bin/env bash
if [ -d "/Volumes/data/projects/crewloom/agent" ]; then
    exec node --no-warnings /Volumes/data/projects/crewloom/agent/dist/index.js "$@"
else
    npx -y @crewloom/cli "$@"
fi
EOF

chmod +x "$INSTALL_DIR/crewloom"

echo "  \033[32m✓\033[0m Crewloom CLI installed to: \033[1m$INSTALL_DIR/crewloom\033[0m"

# Check PATH
case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *)
        echo ""
        echo "  \033[33m[NOTE]\033[0m Please add $INSTALL_DIR to your PATH:"
        echo "    echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc"
        echo "    source ~/.zshrc"
        ;;
esac

echo ""
echo "  \033[32m🎉 Success! Crewloom is ready to launch.\033[0m"
echo "  Run: \033[1;36mcrewloom --help\033[0m or \033[1;36mcrewloom studio --open\033[0m"
echo ""
