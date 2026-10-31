package main

import (
	"bytes"
	"compress/gzip"
	_ "embed"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"time"
)

//go:embed crewloom-desktop.exe.gz
var embeddedDesktopAppGz []byte

//go:embed WebView2Loader.dll
var embeddedWebView2Loader []byte

//go:embed crewloom.mjs
var embeddedCliSource []byte

// appVersion is stamped at build time: -ldflags "-X main.appVersion=<version>".
var appVersion = "dev"

const (
	webView2ClientKey = `{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}`
	webView2Bootstrap = "https://go.microsoft.com/fwlink/p/?LinkId=2124703"
	cyanBold          = "\033[1;36m"
	greenBold         = "\033[1;32m"
	yellow            = "\033[33m"
	whiteBold         = "\033[1;37m"
	reset             = "\033[0m"
)

func main() {
	enableVirtualTerminal()
	printBanner()

	userHome, err := os.UserHomeDir()
	if err != nil {
		userHome = os.Getenv("USERPROFILE")
		if userHome == "" {
			userHome = `C:\Users\Default`
		}
	}

	localAppData := os.Getenv("LOCALAPPDATA")
	if localAppData == "" {
		localAppData = filepath.Join(userHome, "AppData", "Local")
	}

	appDir := filepath.Join(localAppData, "Programs", "Crewloom Agent")
	cliDir := filepath.Join(userHome, ".crewloom", "bin")

	if major := windowsMajorVersion(); major != 0 && major < 10 {
		fmt.Printf("  %s[!] Windows 10 or newer is required (detected major version %d).%s\n", yellow, major, reset)
		waitForEnter()
		os.Exit(1)
	}

	// A running copy keeps its exe locked and would make the upgrade fail.
	_ = exec.Command("taskkill", "/F", "/IM", "Crewloom Agent.exe").Run()
	time.Sleep(500 * time.Millisecond)

	// Step 1: Install Crewloom Desktop Application (GUI)
	fmt.Printf("%s[1/5] Deploying Crewloom Agent Desktop Application (GUI)...%s\n", cyanBold, reset)
	if err := os.MkdirAll(appDir, 0755); err != nil {
		fmt.Printf("  [!] Failed to create app directory: %v\n", err)
	}

	desktopExePath := filepath.Join(appDir, "Crewloom Agent.exe")
	fmt.Printf("  Extracting native desktop application to:\n  %s%s%s\n", whiteBold, appDir, reset)

	if err := decompressGzip(embeddedDesktopAppGz, desktopExePath); err != nil {
		fmt.Printf("  %s[!] Error extracting desktop binary: %v%s\n", yellow, err, reset)
	} else {
		fmt.Printf("  %s[✓]%s Crewloom Agent.exe deployed successfully.\n", greenBold, reset)
	}

	// Deploy WebView2Loader.dll
	dllPath := filepath.Join(appDir, "WebView2Loader.dll")
	if err := os.WriteFile(dllPath, embeddedWebView2Loader, 0755); err != nil {
		fmt.Printf("  [!] Warning: Failed to write WebView2Loader.dll: %v\n", err)
	} else {
		fmt.Printf("  %s[✓]%s WebView2Loader.dll deployed successfully.\n", greenBold, reset)
	}

	// Deploy uninstall.cmd
	uninstallCmdPath := filepath.Join(appDir, "uninstall.cmd")
	uninstallScript := fmt.Sprintf(`@echo off
title Uninstall Crewloom Agent
echo Removing Crewloom Agent...
taskkill /F /IM "Crewloom Agent.exe" >nul 2>&1
del /F /Q "%%USERPROFILE%%\Desktop\Crewloom Agent.lnk" >nul 2>&1
del /F /Q "%%APPDATA%%\Microsoft\Windows\Start Menu\Programs\Crewloom Agent.lnk" >nul 2>&1
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall\CrewloomAgent" /f >nul 2>&1
echo Crewloom Agent application shortcuts and registry entries removed.
pause
`)
	_ = os.WriteFile(uninstallCmdPath, []byte(uninstallScript), 0755)

	// Step 2: Deploy Developer CLI Engine
	fmt.Printf("\n%s[2/5] Deploying Developer CLI Tools...%s\n", cyanBold, reset)
	if err := os.MkdirAll(cliDir, 0755); err != nil {
		fmt.Printf("  [!] Failed to create CLI dir: %v\n", err)
	}

	mjsPath := filepath.Join(cliDir, "crewloom.mjs")
	rawPath := filepath.Join(cliDir, "crewloom")
	pkgPath := filepath.Join(cliDir, "package.json")
	cmdPath := filepath.Join(cliDir, "crewloom.cmd")
	clCmdPath := filepath.Join(cliDir, "cl.cmd")
	ps1Path := filepath.Join(cliDir, "crewloom.ps1")
	clPs1Path := filepath.Join(cliDir, "cl.ps1")

	_ = os.WriteFile(mjsPath, embeddedCliSource, 0755)
	_ = os.WriteFile(rawPath, embeddedCliSource, 0755)
	_ = os.WriteFile(pkgPath, []byte(`{"type":"module"}`), 0644)

	cmdWrapper := "@echo off\r\nnode \"%~dp0crewloom.mjs\" %*\r\n"
	_ = os.WriteFile(cmdPath, []byte(cmdWrapper), 0755)
	_ = os.WriteFile(clCmdPath, []byte(cmdWrapper), 0755)

	ps1Wrapper := `#!/usr/bin/env pwsh
& node "$PSScriptRoot/crewloom.mjs" @args
`
	_ = os.WriteFile(ps1Path, []byte(ps1Wrapper), 0755)
	_ = os.WriteFile(clPs1Path, []byte(ps1Wrapper), 0755)
	fmt.Printf("  %s[✓]%s CLI wrappers installed (crewloom / cl).\n", greenBold, reset)

	// Step 3: Configure Environment PATH & Registry
	fmt.Printf("\n%s[3/5] Configuring Windows PATH and Registry...%s\n", cyanBold, reset)
	appendUserPath(appDir)
	appendUserPath(cliDir)
	registerUninstall(appDir, uninstallCmdPath)
	fmt.Printf("  %s[✓]%s Application registered in Windows Programs.\n", greenBold, reset)

	// Step 4: Create Desktop and Start Menu Shortcuts
	fmt.Printf("\n%s[4/5] Creating Desktop & Start Menu Shortcuts...%s\n", cyanBold, reset)
	createShortcuts(desktopExePath, appDir)

	// Step 5: Make sure the WebView2 runtime exists, then launch
	fmt.Printf("\n%s[5/5] Launching Crewloom Agent Desktop...%s\n", cyanBold, reset)
	ensureWebView2()
	launchDetached(desktopExePath, appDir)
	fmt.Println()
	fmt.Printf("%s══════════════════════════════════════════════════════════════════%s\n", cyanBold, reset)
	fmt.Printf("  %sInstallation complete!%s\n", greenBold, reset)
	fmt.Printf("  • Desktop App: %s%s%s\n", whiteBold, desktopExePath, reset)
	fmt.Printf("  • CLI Command: %screwloom%s or %scl%s\n", greenBold, reset, greenBold, reset)
	fmt.Printf("  • Desktop Shortcut created on your desktop.\n")
	fmt.Printf("%s══════════════════════════════════════════════════════════════════%s\n", cyanBold, reset)
	fmt.Println("\nPress Enter to exit installer...")
	waitForEnter()
}

func waitForEnter() {
	var b [1]byte
	_, _ = os.Stdin.Read(b[:])
}

// windowsMajorVersion returns 0 when it cannot be determined.
func windowsMajorVersion() int {
	out, err := exec.Command("cmd", "/c", "ver").Output()
	if err != nil {
		return 0
	}
	var major, minor int
	text := string(out)
	if i := strings.Index(text, "Version "); i >= 0 {
		_, _ = fmt.Sscanf(text[i+len("Version "):], "%d.%d", &major, &minor)
	}
	return major
}

func webView2Installed() bool {
	keys := []string{
		`HKLM\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\` + webView2ClientKey,
		`HKLM\SOFTWARE\Microsoft\EdgeUpdate\Clients\` + webView2ClientKey,
		`HKCU\SOFTWARE\Microsoft\EdgeUpdate\Clients\` + webView2ClientKey,
	}
	for _, key := range keys {
		out, err := exec.Command("reg", "query", key, "/v", "pv").Output()
		if err == nil && strings.Contains(string(out), "pv") && !strings.Contains(string(out), "0.0.0.0") {
			return true
		}
	}
	return false
}

// ensureWebView2 installs Microsoft's Evergreen WebView2 runtime when missing; the app cannot open a window without it.
func ensureWebView2() {
	if webView2Installed() {
		fmt.Printf("  %s[✓]%s Microsoft WebView2 runtime detected.\n", greenBold, reset)
		return
	}
	fmt.Printf("  %s[!] Microsoft WebView2 runtime is missing; downloading it from Microsoft (Windows may ask for permission)...%s\n", yellow, reset)
	client := &http.Client{Timeout: 3 * time.Minute}
	resp, err := client.Get(webView2Bootstrap)
	if err != nil || resp.StatusCode != http.StatusOK {
		fmt.Printf("  %s[!] Could not download WebView2 (%v). Install it from https://developer.microsoft.com/microsoft-edge/webview2 and start Crewloom Agent again.%s\n", yellow, err, reset)
		return
	}
	defer resp.Body.Close()
	setupPath := filepath.Join(os.TempDir(), "MicrosoftEdgeWebview2Setup.exe")
	f, err := os.Create(setupPath)
	if err != nil {
		fmt.Printf("  %s[!] Could not save the WebView2 installer: %v%s\n", yellow, err, reset)
		return
	}
	_, copyErr := io.Copy(f, resp.Body)
	_ = f.Close()
	if copyErr != nil {
		fmt.Printf("  %s[!] WebView2 download was interrupted: %v%s\n", yellow, copyErr, reset)
		return
	}
	if err := exec.Command(setupPath, "/silent", "/install").Run(); err != nil {
		fmt.Printf("  %s[!] WebView2 installer reported: %v%s\n", yellow, err, reset)
	}
	_ = os.Remove(setupPath)
	if webView2Installed() {
		fmt.Printf("  %s[✓]%s Microsoft WebView2 runtime installed.\n", greenBold, reset)
	} else {
		fmt.Printf("  %s[!] WebView2 is still missing; Crewloom Agent will not open until it is installed.%s\n", yellow, reset)
	}
}

func decompressGzip(data []byte, destPath string) error {
	gr, err := gzip.NewReader(bytes.NewReader(data))
	if err != nil {
		return err
	}
	defer gr.Close()

	out, err := os.OpenFile(destPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0755)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, gr)
	return err
}

func createShortcuts(exePath, appDir string) {
	script := fmt.Sprintf(`
$ws = New-Object -ComObject WScript.Shell
$desktop = [Environment]::GetFolderPath('Desktop')
$s1 = $ws.CreateShortcut("$desktop\Crewloom Agent.lnk")
$s1.TargetPath = "%s"
$s1.WorkingDirectory = "%s"
$s1.IconLocation = "%s,0"
$s1.Description = "Crewloom Agent - Sovereign AI Desktop"
$s1.Save()

$startMenu = [Environment]::GetFolderPath('Programs')
$s2 = $ws.CreateShortcut("$startMenu\Crewloom Agent.lnk")
$s2.TargetPath = "%s"
$s2.WorkingDirectory = "%s"
$s2.IconLocation = "%s,0"
$s2.Description = "Crewloom Agent - Sovereign AI Desktop"
$s2.Save()
`, strings.ReplaceAll(exePath, `\`, `\\`),
		strings.ReplaceAll(appDir, `\`, `\\`),
		strings.ReplaceAll(exePath, `\`, `\\`),
		strings.ReplaceAll(exePath, `\`, `\\`),
		strings.ReplaceAll(appDir, `\`, `\\`),
		strings.ReplaceAll(exePath, `\`, `\\`),
	)

	cmd := exec.Command("powershell", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", script)
	if err := cmd.Run(); err != nil {
		fmt.Printf("  [!] Note: Shortcut creation notice: %v\n", err)
	} else {
		fmt.Printf("  %s[✓]%s Desktop and Start Menu shortcuts ready.\n", greenBold, reset)
	}
}

func registerUninstall(appDir, uninstallCmd string) {
	regBase := `HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall\CrewloomAgent`
	_ = exec.Command("reg", "add", regBase, "/v", "DisplayName", "/d", "Crewloom Agent", "/f").Run()
	_ = exec.Command("reg", "add", regBase, "/v", "DisplayVersion", "/d", appVersion, "/f").Run()
	_ = exec.Command("reg", "add", regBase, "/v", "Publisher", "/d", "Crewloom", "/f").Run()
	_ = exec.Command("reg", "add", regBase, "/v", "InstallLocation", "/d", appDir, "/f").Run()
	_ = exec.Command("reg", "add", regBase, "/v", "DisplayIcon", "/d", filepath.Join(appDir, "Crewloom Agent.exe")+",0", "/f").Run()
	_ = exec.Command("reg", "add", regBase, "/v", "UninstallString", "/d", uninstallCmd, "/f").Run()
}

func appendUserPath(newPath string) {
	out, err := exec.Command("powershell", "-NoProfile", "-Command", `[Environment]::GetEnvironmentVariable("Path", "User")`).Output()
	if err != nil {
		return
	}
	currentPath := strings.TrimSpace(string(out))
	paths := strings.Split(currentPath, ";")
	for _, p := range paths {
		if strings.EqualFold(strings.TrimSpace(p), strings.TrimSpace(newPath)) {
			return
		}
	}
	updatedPath := currentPath
	if updatedPath != "" && !strings.HasSuffix(updatedPath, ";") {
		updatedPath += ";"
	}
	updatedPath += newPath
	_ = exec.Command("reg", "add", `HKCU\Environment`, "/v", "Path", "/t", "REG_EXPAND_SZ", "/d", updatedPath, "/f").Run()
}

func launchDetached(exePath, workDir string) {
	cmd := exec.Command(exePath)
	cmd.Dir = workDir
	// DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP so the app outlives this installer.
	cmd.SysProcAttr = &syscall.SysProcAttr{CreationFlags: 0x00000008 | 0x00000200}
	if err := cmd.Start(); err != nil {
		fmt.Printf("  %s[!] Could not start Crewloom Agent: %v%s\n", yellow, err, reset)
		return
	}
	exited := make(chan error, 1)
	go func() { exited <- cmd.Wait() }()
	select {
	case err := <-exited:
		fmt.Printf("  %s[!] Crewloom Agent closed right after starting (%v). Open it from the Start menu; if it does not appear, install WebView2 and retry.%s\n", yellow, err, reset)
	case <-time.After(4 * time.Second):
		fmt.Printf("  %s[✓] Crewloom Agent is running.%s\n", greenBold, reset)
	}
}

func enableVirtualTerminal() {
	// Handled natively on Windows 10/11
}

func printBanner() {
	fmt.Println()
	fmt.Printf("%s   ██████╗██████╗ ███████╗██╗    ██╗██╗      ██████╗  ██████╗ ███╗   ███╗%s\n", cyanBold, reset)
	fmt.Printf("%s  ██╔════╝██╔══██╗██╔════╝██║    ██║██║     ██╔═══██╗██╔═══██╗████╗ ████║%s\n", cyanBold, reset)
	fmt.Printf("%s  ██║     ██████╔╝█████╗  ██║ █╗ ██║██║     ██║   ██║██║   ██║██╔████╔██║%s\n", cyanBold, reset)
	fmt.Printf("%s  ██║     ██╔══██╗██╔══╝  ██║███╗██║██║     ██║   ██║██║   ██║██║╚██╔╝██║%s\n", cyanBold, reset)
	fmt.Printf("%s  ╚██████╗██║  ██║███████╗╚███╔███╔╝███████╗╚██████╔╝╚██████╔╝██║ ╚═╝ ██║%s\n", cyanBold, reset)
	fmt.Printf("%s   ╚═════╝╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝%s\n", cyanBold, reset)
	fmt.Printf("          %sDesktop Agent & Sovereign AI Studio for Windows%s\n", whiteBold, reset)
	fmt.Println()
}
