@echo off
chcp 65001 >nul
title Crewloom Sovereign AI Agent Installer
echo ================================================================
echo   CREWLOOM SOVEREIGN AI AGENT -- WINDOWS SETUP
echo   Dual Bicultural Core (En/Ar) * 47 Specialist Skills
echo ================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://crewloom.org/install.ps1 | iex"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Installation encountered an error. Please ensure Node.js is installed.
    echo Visit https://crewloom.org for manual instructions.
)
echo.
pause
