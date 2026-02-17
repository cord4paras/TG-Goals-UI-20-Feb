@echo off
cd /d "%~dp0"

git remote set-url origin https://github.com/cord4paras/TG-Goal-UI.git
git add .
git status
git commit -m "Goals Module UI and basic flow"
git branch -M main
git push -u origin main

pause
