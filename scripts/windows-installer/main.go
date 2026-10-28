package main

import (
	"bufio"
	_ "embed"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

//go:embed crewloom.mjs
var embeddedCliSource []byte

const (
	cyanBold  = "\033[1;36m"
	greenBold = "\033[1;32m"
	yellow    = "\033[33m"
	whiteBold = "\033[1;37m"
	reset     = "\033[0m"
)

func main() {
	enableVirtualTerminal()
	printBanner()

	userHome, err := os.UserHomeDir()
	if err != nil {
		fmt.Printf("[!] Could not determine user home directory: %v\n", err)
		userHome = os.Getenv("USERPROFILE")
		if userHome == "" {
			userHome = `C:\Users\Default`
		}
	}

	installDir := filepath.Join(userHome, ".crewloom", "bin")

	// 1. Check Node.js
	fmt.Printf("%s[1/4] Verifying System Runtime Prerequisites...%s\n", cyanBold, reset)
	nodeVer, err := runCommandOutput("node", "-v")
	if err != nil || nodeVer == "" {
		fmt.Printf("  %s[!] Node.js (v18+) is required for Crewloom Sovereign Engine.%s\n", yellow, reset)
		fmt.Println("  Attempting to install Node.js via Windows Package Manager (winget)...")
		
		wingetCmd := exec.Command("winget", "install", "OpenJS.NodeJS.LTS", "--accept-source-agreements", "--accept-package-agreements")
		wingetCmd.Stdout = os.Stdout
		wingetCmd.Stderr = os.Stderr
		if err := wingetCmd.Run(); err != nil {
			fmt.Printf("  %s[!] Automatic winget installation unavailable.%s\n", yellow, reset)
			fmt.Println("  Please download and install Node.js LTS from: https://nodejs.org")
			fmt.Println("\nPress Enter to exit...")
			bufio.NewReader(os.Stdin).ReadBytes('\n')
			return
		}
		nodeVer, _ = runCommandOutput("node", "-v")
	}
	fmt.Printf("  %s[✓]%s Detected Node.js: %s%s%s\n", greenBold, reset, whiteBold, strings.TrimSpace(nodeVer), reset)

	// Optional check Git & Python
	if gitVer, err := runCommandOutput("git", "--version"); err == nil && gitVer != "" {
		fmt.Printf("  %s[✓]%s Detected Git: %s\n", greenBold, reset, strings.TrimSpace(gitVer))
	}
	if pyVer, err := runCommandOutput("python", "--version"); err == nil && pyVer != "" {
		fmt.Printf("  %s[✓]%s Detected Python: %s\n", greenBold, reset, strings.TrimSpace(pyVer))
	}

	// 2. Prepare installation directory
	fmt.Printf("\n%s[2/4] Deploying Sovereign CLI Engine Files...%s\n", cyanBold, reset)
	if err := os.MkdirAll(installDir, 0755); err != nil {
		fmt.Printf("  [!] Failed to create install dir %s: %v\n", installDir, err)
		return
	}

	cliSource := embeddedCliSource
	// Try downloading latest version if network is active
	fmt.Println("  Checking for latest updates from crewloom.org...")
	if latest, err := downloadFile("https://crewloom.org/bin/crewloom.mjs"); err == nil && len(latest) > 500 {
		cliSource = latest
		fmt.Println("  ✓ Downloaded latest CLI bundle from CDN.")
	} else {
		fmt.Println("  ✓ Using bundled embedded CLI engine.")
	}

	mjsPath := filepath.Join(installDir, "crewloom.mjs")
	rawPath := filepath.Join(installDir, "crewloom")
	pkgPath := filepath.Join(installDir, "package.json")
	cmdPath := filepath.Join(installDir, "crewloom.cmd")
	clCmdPath := filepath.Join(installDir, "cl.cmd")
	ps1Path := filepath.Join(installDir, "crewloom.ps1")
	clPs1Path := filepath.Join(installDir, "cl.ps1")

	_ = os.WriteFile(mjsPath, cliSource, 0755)
	_ = os.WriteFile(rawPath, cliSource, 0755)
	_ = os.WriteFile(pkgPath, []byte(`{"type":"module"}`), 0644)

	cmdWrapper := "@echo off\r\nnode \"%~dp0crewloom.mjs\" %*\r\n"
	_ = os.WriteFile(cmdPath, []byte(cmdWrapper), 0755)
	_ = os.WriteFile(clCmdPath, []byte(cmdWrapper), 0755)

	ps1Wrapper := "& node \"$PSScriptRoot\\crewloom.mjs\" $args\r\n"
	_ = os.WriteFile(ps1Path, []byte(ps1Wrapper), 0755)
	_ = os.WriteFile(clPs1Path, []byte(ps1Wrapper), 0755)

	fmt.Printf("  %s[✓]%s Installed binaries to: %s%s%s\n", greenBold, reset, whiteBold, installDir, reset)

	// 3. Configure Windows User PATH in Registry
	fmt.Printf("\n%s[3/4] Configuring Windows Environment & Registry PATH...%s\n", cyanBold, reset)
	if err := addDirectoryToUserPath(installDir); err != nil {
		fmt.Printf("  %s[!] Warning configuring PATH registry: %v%s\n", yellow, err, reset)
		fmt.Printf("  Please manually add to your User PATH: %s\n", installDir)
	} else {
		fmt.Printf("  %s[✓]%s Successfully registered %s in User PATH.\n", greenBold, reset, installDir)
	}

	// 4. Verify installation
	fmt.Printf("\n%s[4/4] Verifying Engine Installation...%s\n", cyanBold, reset)
	verifyCmd := exec.Command("node", mjsPath, "status")
	verifyCmd.Stdout = os.Stdout
	verifyCmd.Stderr = os.Stderr
	_ = verifyCmd.Run()

	fmt.Printf("\n%s================================================================%s\n", greenBold, reset)
	fmt.Printf("%s  🎉 CREWLOOM SOVEREIGN AI AGENT INSTALLED SUCCESSFULLY!%s\n", greenBold, reset)
	fmt.Printf("%s================================================================%s\n\n", greenBold, reset)
	fmt.Println("  You can now launch Crewloom from any Command Prompt, PowerShell, or Windows Terminal:")
	fmt.Printf("    %screwloom status%s      - Check active tools and orchestrator\n", cyanBold, reset)
	fmt.Printf("    %scl roles%s             - List 47 specialist roles\n", cyanBold, reset)
	fmt.Printf("    %screwloom verify%s      - Run zero-destruction test gate\n\n", cyanBold, reset)

	fmt.Println("Press Enter to complete setup and close...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}

func printBanner() {
	fmt.Printf("%s", cyanBold)
	fmt.Println("╔══════════════════════════════════════════════════════════════════════╗")
	fmt.Println("║  ⚡ CREWLOOM SOVEREIGN AI AGENT ENGINE -- WINDOWS SETUP INSTALLER     ║")
	fmt.Printf("║  %sDual Bicultural Core (En/Ar) · Native Staged Diffs · Multi-Agent%s     ║\n", greenBold, cyanBold)
	fmt.Println("╚══════════════════════════════════════════════════════════════════════╝")
	fmt.Printf("%s\n", reset)
}

func runCommandOutput(name string, args ...string) (string, error) {
	cmd := exec.Command(name, args...)
	out, err := cmd.Output()
	return string(out), err
}

func downloadFile(url string) ([]byte, error) {
	client := http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("bad status: %s", resp.Status)
	}
	return io.ReadAll(resp.Body)
}

func addDirectoryToUserPath(dir string) error {
	// Query current HKCU\Environment Path
	cmdQuery := exec.Command("reg", "query", `HKCU\Environment`, "/v", "Path")
	out, err := cmdQuery.Output()
	var currentPath string
	if err == nil {
		lines := strings.Split(string(out), "\n")
		for _, line := range lines {
			if strings.Contains(line, "REG_") {
				parts := strings.Fields(line)
				if len(parts) >= 3 {
					currentPath = strings.Join(parts[2:], " ")
				}
			}
		}
	}

	parts := strings.Split(currentPath, ";")
	for _, p := range parts {
		if strings.EqualFold(strings.TrimSpace(p), dir) {
			return nil // Already in PATH
		}
	}

	newPath := dir
	if currentPath != "" {
		newPath = currentPath + ";" + dir
	}

	cmdAdd := exec.Command("reg", "add", `HKCU\Environment`, "/v", "Path", "/t", "REG_EXPAND_SZ", "/d", newPath, "/f")
	if err := cmdAdd.Run(); err != nil {
		// Fallback to powershell set environment variable
		psCmd := fmt.Sprintf(`[Environment]::SetEnvironmentVariable("Path", "%s", "User")`, strings.ReplaceAll(newPath, `"`, `\"`))
		return exec.Command("powershell", "-NoProfile", "-Command", psCmd).Run()
	}
	return nil
}

func enableVirtualTerminal() {
	// On Windows 10/11, enable ANSI color sequences in console
	exec.Command("cmd", "/c", "echo off").Run()
}
