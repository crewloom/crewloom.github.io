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

# 2. Target installation directory in user profile
$installDir = Join-Path $HOME ".crewloom\bin"
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

$cliPath = Join-Path $installDir "crewloom"
$cmdPath = Join-Path $installDir "crewloom.cmd"
$ps1Path = Join-Path $installDir "crewloom.ps1"

Write-Host "  ▶ Downloading Crewloom Sovereign CLI..." -ForegroundColor Cyan
$downloadUrl = "https://raw.githubusercontent.com/crewloom/crewloom.github.io/main/public/bin/crewloom"
Invoke-RestMethod -Uri $downloadUrl -OutFile $cliPath

# Write cmd wrapper
$cmdContent = "@echo off`r`nnode `"%~dp0crewloom`" %*"
Set-Content -Path $cmdPath -Value $cmdContent -Encoding ASCII

# Write ps1 wrapper
$ps1Content = "& node `"`$PSScriptRoot\crewloom`" `$args"
Set-Content -Path $ps1Path -Value $ps1Content -Encoding ASCII

# Also write short alias 'cl.cmd'
$clCmdPath = Join-Path $installDir "cl.cmd"
Set-Content -Path $clCmdPath -Value $cmdContent -Encoding ASCII

Write-Host "  ✓ Crewloom CLI installed to: $cliPath" -ForegroundColor Green

# 3. Add to user PATH if not present
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
