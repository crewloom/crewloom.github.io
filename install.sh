#!/usr/bin/env bash
# ==============================================================================
# Crewloom Sovereign AI Agent Installer
# https://crewloom.org
# ==============================================================================

set -e

echo ""
echo "  ╔══════════════════════════════════════════════════════════╗"
echo "  ║  ⚡ CREWLOOM SOVEREIGN AI AGENT — INSTALLER v1.0.0       ║"
echo "  ║  Dual Bicultural Core (En/Ar) · 47 Specialist Skills     ║"
echo "  ╚══════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "  [ERROR] Node.js is required (v18+) but not installed."
    echo "  Please install Node.js from https://nodejs.org or via brew:"
    echo "    brew install node"
    exit 1
fi

NODE_VER=$(node -v)
echo "  ✓ Detected Node.js: $NODE_VER"

INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

echo "  ▶ Downloading and installing Crewloom Sovereign CLI..."

# Fetch the launcher built and verified by the website deployment.
DOWNLOAD_URL="https://crewloom.org/bin/crewloom"
if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$DOWNLOAD_URL" -o "$INSTALL_DIR/crewloom"
elif command -v wget >/dev/null 2>&1; then
    wget -qO "$INSTALL_DIR/crewloom" "$DOWNLOAD_URL"
else
    echo "  [ERROR] Neither curl nor wget was found."
    exit 1
fi

chmod +x "$INSTALL_DIR/crewloom"
ln -sf "$INSTALL_DIR/crewloom" "$INSTALL_DIR/cl" 2>/dev/null || true

echo "  ✓ Crewloom CLI installed to: $INSTALL_DIR/crewloom"

# Ensure INSTALL_DIR is in PATH
case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *)
        echo ""
        echo "  [NOTE] Add $INSTALL_DIR to your PATH by running:"
        echo "    echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc"
        echo "    source ~/.zshrc"
        ;;
esac

echo ""
echo "  🎉 Success! Crewloom is ready to launch."
echo "  Try running: crewloom roles"
echo ""
