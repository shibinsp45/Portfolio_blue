@echo off
echo ==========================================
echo   Setting up GitHub for Portfolio
echo ==========================================

echo 1. Initializing Git Repository...
git init

echo 2. Adding all files...
git add .

echo 3. Committing files...
git commit -m "Initial Portfolio Release"

echo 4. Renaming branch to main...
git branch -M main

echo 5. Adding remote origin (https://github.com/shibinsp45/Portfolio.git)...
git remote add origin https://github.com/shibinsp45/Portfolio.git

echo 6. Pushing code to GitHub...
git push -u origin main

echo ==========================================
echo   Process Complete!
echo ==========================================
echo If you saw "command not found" errors, you need to install Git from https://git-scm.com/
echo.
pause
