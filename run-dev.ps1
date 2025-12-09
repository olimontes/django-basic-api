# run-dev.ps1 - inicia backend e frontend em janelas separadas (Windows PowerShell)
# Uso: execute este script na raiz do repositório: .\run-dev.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Iniciar Django (ativa venv e roda runserver) em nova janela PowerShell
Start-Process powershell -ArgumentList '-NoExit', "-Command Set-Location -Path '$repoRoot'; & '.\venv\Scripts\Activate.ps1'; python manage.py runserver"

# Iniciar Angular (ng serve) em nova janela PowerShell
Start-Process powershell -ArgumentList '-NoExit', "-Command Set-Location -Path '$repoRoot\frontend\frontend-api'; npm start"
