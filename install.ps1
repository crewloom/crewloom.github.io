# ==============================================================================
# Crewloom Sovereign AI Agent Windows Installer
# https://crewloom.org
# ==============================================================================
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║  ⚡ CREWLOOM SOVEREIGN AI AGENT — WINDOWS INSTALLER      ║" -ForegroundColor Cyan
Write-Host "  ║  Dual Bicultural Core (En/Ar) · 47 Specialist Skills     ║" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Node.js (v18+)
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "  [!] Node.js is required (v18+) to run the CLI engine." -ForegroundColor Yellow
    Write-Host "  Please install Node.js from https://nodejs.org or via winget:" -ForegroundColor Yellow
    Write-Host "    winget install OpenJS.NodeJS.LTS" -ForegroundColor White
    exit 1
}

$nodeVer = (& node -v)
Write-Host "  ✓ Detected Node.js: $nodeVer" -ForegroundColor Green

# 2. Check optional environment tools
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if ($gitCmd) {
    Write-Host "  ✓ Detected Git" -ForegroundColor Green
}
$pyCmd = Get-Command python -ErrorAction SilentlyContinue
if ($pyCmd) {
    $pyVer = (& python --version 2>&1)
    Write-Host "  ✓ Detected Python: $pyVer" -ForegroundColor Green
}

# 3. Target installation directory in user profile
$installDir = Join-Path $HOME ".crewloom\bin"
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

$cliPath = Join-Path $installDir "crewloom"
$mjsPath = Join-Path $installDir "crewloom.mjs"
$cmdPath = Join-Path $installDir "crewloom.cmd"
$ps1Path = Join-Path $installDir "crewloom.ps1"
$pkgPath = Join-Path $installDir "package.json"

Write-Host "  ▶ Downloading Crewloom Sovereign CLI..." -ForegroundColor Cyan
$downloadUrl = "https://crewloom.org/bin/crewloom.mjs"
Invoke-RestMethod -Uri $downloadUrl -OutFile $cliPath
Copy-Item -Path $cliPath -Destination $mjsPath -Force

# Ensure ESM module resolution works universally across all Node versions
Set-Content -Path $pkgPath -Value '{"type":"module"}' -Encoding ASCII

# Write cmd wrappers (runs in Command Prompt & PowerShell without policy restrictions)
$cmdContent = "@echo off`r`nnode `"%~dp0crewloom.mjs`" %*"
Set-Content -Path $cmdPath -Value $cmdContent -Encoding ASCII
Set-Content -Path (Join-Path $installDir "cl.cmd") -Value $cmdContent -Encoding ASCII

# Write ps1 wrappers
$ps1Content = "& node `"`$PSScriptRoot\crewloom.mjs`" `$args"
Set-Content -Path $ps1Path -Value $ps1Content -Encoding ASCII
Set-Content -Path (Join-Path $installDir "cl.ps1") -Value $ps1Content -Encoding ASCII

# Unblock files if downloaded via web
Unblock-File -Path (Join-Path $installDir "*") -ErrorAction SilentlyContinue

Write-Host "  ✓ Crewloom CLI installed to: $installDir" -ForegroundColor Green

# 4. Add to user PATH if not present
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -split ';' -notcontains $installDir) {
    $newPath = if ($userPath) { "$userPath;$installDir" } else { $installDir }
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    $env:Path = "$env:Path;$installDir"
    Write-Host "  ✓ Added $installDir to User PATH." -ForegroundColor Green
}

Write-Host ""
Write-Host "  🎉 Success! Crewloom is ready to launch on Windows." -ForegroundColor Cyan
Write-Host "  Try running: crewloom status" -ForegroundColor White
Write-Host ""
