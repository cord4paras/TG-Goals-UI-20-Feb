# Push TG-Goals-UI to https://github.com/cord4paras/TG-Goal-UI
# Run this in PowerShell from the project folder: .\push-to-github.ps1

Set-Location $PSScriptRoot

git remote set-url origin https://github.com/cord4paras/TG-Goal-UI.git
git add .
git status
git commit -m "Goals Module UI and basic flow"
git branch -M main
git push -u origin main
