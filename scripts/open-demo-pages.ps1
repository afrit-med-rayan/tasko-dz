# Ouvre les pages demo dans le navigateur (captures PDF)
# Usage: npm run demo:pages
# Prerequis: npm run prototype ou npm run dev deja lance

$WebUrl = "http://localhost:3000"

$pages = @(
  @{ Name = "01 - Accueil"; Url = "$WebUrl/" },
  @{ Name = "02 - Section demo"; Url = "$WebUrl/#demo" },
  @{ Name = "03 - Freelancers"; Url = "$WebUrl/freelancers" },
  @{ Name = "04 - Profil Yacine"; Url = "$WebUrl/freelancer/yacine-bensalem" },
  @{ Name = "05 - Service logo"; Url = "$WebUrl/service/s1" },
  @{ Name = "06 - Dashboard freelancer"; Url = "$WebUrl/freelancer/dashboard" },
  @{ Name = "07 - Dashboard client"; Url = "$WebUrl/client/dashboard" },
  @{ Name = "08 - Comment ca marche"; Url = "$WebUrl/comment-ca-marche" },
  @{ Name = "09 - Tarifs"; Url = "$WebUrl/tarifs" },
  @{ Name = "10 - Inscription"; Url = "$WebUrl/inscription" },
  @{ Name = "11 - Connexion"; Url = "$WebUrl/connexion" }
)

Write-Host ""
Write-Host "  Ouverture des pages demo Tasko..." -ForegroundColor Cyan
Write-Host ""

try {
  $check = Invoke-WebRequest -Uri $WebUrl -UseBasicParsing -TimeoutSec 3
} catch {
  Write-Host "  ERREUR: Le site n est pas accessible sur $WebUrl" -ForegroundColor Red
  Write-Host "  Lancez d abord: npm run prototype" -ForegroundColor Yellow
  exit 1
}

foreach ($p in $pages) {
  Write-Host "  -> $($p.Name)" -ForegroundColor Green
  Start-Process $p.Url
  Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "  Guide PDF : docs/TASKO_PAGES_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
