# Script para iniciar el servidor Express
Write-Host "🚀 Iniciando servidor Express para CourseRedux..." -ForegroundColor Cyan
Write-Host ""

# Verificar si existe la carpeta express-server
if (-not (Test-Path "express-server")) {
    Write-Host "❌ Error: No se encuentra la carpeta express-server" -ForegroundColor Red
    exit 1
}

# Cambiar a la carpeta del servidor
Set-Location express-server

# Verificar si están instaladas las dependencias
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "✅ Servidor listo para iniciar" -ForegroundColor Green
Write-Host ""
Write-Host "📍 El servidor correrá en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 Para exponer con Ngrok: ngrok http 3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Iniciar el servidor
npm start
