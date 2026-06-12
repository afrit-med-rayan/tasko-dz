# Tasko v0 - Prototype launcher (Windows)
# Usage: npm run prototype

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$WebUrl = "http://localhost:3000"
$ApiUrl = "http://localhost:4000"

function Write-Banner {
  Write-Host ""
  Write-Host "  =========================================" -ForegroundColor Cyan
  Write-Host "   TASKO v0 - Prototype de presentation" -ForegroundColor Cyan
  Write-Host "  =========================================" -ForegroundColor Cyan
  Write-Host ""
}

function Test-CommandExists($name) {
  return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

function Stop-Port($port) {
  $conn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($conn) {
    Write-Host "  Liberation du port $port..." -ForegroundColor Yellow
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
  }
}

function Wait-ForUrl($url, $maxSeconds) {
  if (-not $maxSeconds) { $maxSeconds = 60 }
  $elapsed = 0
  while ($elapsed -lt $maxSeconds) {
    try {
      $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
      if ($r.StatusCode -eq 200) { return $true }
    } catch { }
    Start-Sleep -Seconds 2
    $elapsed += 2
    Write-Host "  En attente de $url ..." -ForegroundColor DarkGray
  }
  return $false
}

function Show-DemoGuide {
  Write-Host "  PARCOURS DEMO RECOMMANDE" -ForegroundColor Green
  Write-Host "  ------------------------"
  Write-Host "  1. Accueil           $WebUrl/"
  Write-Host "  2. Demo freelancer   $WebUrl/freelancer/dashboard"
  Write-Host "  3. Profil public     $WebUrl/freelancer/yacine-bensalem"
  Write-Host "  4. Service           $WebUrl/service/s1"
  Write-Host "  5. Demo client       $WebUrl/client/dashboard"
  Write-Host "  6. Catalogue         $WebUrl/freelancers"
  Write-Host "  7. Comment ca marche $WebUrl/comment-ca-marche"
  Write-Host "  8. Tarifs            $WebUrl/tarifs"
  Write-Host "  9. Inscription       $WebUrl/inscription"
  Write-Host " 10. Connexion (OTP)   $WebUrl/connexion  (code test: 1234)"
  Write-Host ""
  Write-Host "  Langue AR : bouton en haut a droite du menu"
  Write-Host "  API sante : $ApiUrl/api/v1/health"
  Write-Host ""
  Write-Host "  Documentation : docs/TASKO_PAGES_GUIDE.md"
  Write-Host ""
  Write-Host "  Captures PDF  : npm run demo:pages"
  Write-Host ""
}

Write-Banner

if (-not (Test-CommandExists "node")) {
  Write-Host "  ERREUR: Node.js n est pas installe." -ForegroundColor Red
  exit 1
}
if (-not (Test-CommandExists "npm")) {
  Write-Host "  ERREUR: npm n est pas installe." -ForegroundColor Red
  exit 1
}

Write-Host "  Verification des dependances..." -ForegroundColor Gray
if (-not (Test-Path "node_modules")) {
  npm install
}
node scripts/link-web-deps.js | Out-Null

Stop-Port 3000
Stop-Port 4000

Show-DemoGuide

Write-Host "  Demarrage API + Web..." -ForegroundColor Gray
npm run dev
