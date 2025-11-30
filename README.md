# 📱 CourseRedux - NativeScript App

> Aplicación móvil completa con NativeScript, Angular, Express API y Redux

[![NativeScript](https://img.shields.io/badge/NativeScript-8.6-blue.svg)](https://nativescript.org/)
[![Angular](https://img.shields.io/badge/Angular-16.2-red.svg)](https://angular.io/)
[![Express](https://img.shields.io/badge/Express-4.18-green.svg)](https://expressjs.com/)
[![Redux](https://img.shields.io/badge/Redux-NgRx%2016-purple.svg)](https://ngrx.io/)

## 🎯 Descripción

CourseRedux es una aplicación móvil desarrollada con **NativeScript + Angular** que demuestra:
- ✅ Integración con API REST (Express.js)
- ✅ Gestión de estado con Redux (NgRx)
- ✅ Persistencia de datos local
- ✅ Sistema de favoritos
- ✅ Búsqueda y filtrado de productos
- ✅ Configuración dinámica de endpoints

## 🚀 Inicio Rápido

### 1. Clonar repositorio
```bash
git clone https://github.com/malexandera97/courseredux.git
cd courseredux
```

### 2. Instalar dependencias
```bash
npm install
cd express-server && npm install && cd ..
```

### 3. Iniciar servidor Express
```bash
# Opción 1: Script PowerShell
.\start-server.ps1

# Opción 2: Manual
cd express-server
npm start
```

### 4. Ejecutar app NativeScript
```bash
# Android
ns run android

# iOS
ns run ios
```

## 📚 Documentación

- **[README-FINAL.md](README-FINAL.md)** - Documentación completa del proyecto
- **[VALIDATION-PART1.md](VALIDATION-PART1.md)** - Validación Fase 1
- **[VALIDATION-PART2.md](VALIDATION-PART2.md)** - Validación Fase 2
- **[VALIDATION-PART3.md](VALIDATION-PART3.md)** - Validación Fase 3
- **[express-server/README.md](express-server/README.md)** - Documentación del API

## 🏗️ Estructura

```
courseredux/
├── express-server/         # API Express
├── src/app/
│   ├── features/          # Componentes
│   ├── services/          # Services
│   ├── store/             # Redux Store
│   └── directives/        # Custom Directives
└── App_Resources/         # Recursos nativos
```

## 🔧 Tecnologías

- **Frontend:** NativeScript 8.6, Angular 16.2
- **Estado:** NgRx Store 16
- **Backend:** Express.js 4.18
- **Persistencia:** ApplicationSettings
- **HTTP:** Angular HttpClient
- **Notificaciones:** @triniwiz/nativescript-toasty

## 📱 Características

### 🔍 Búsqueda
- Formulario con filtrado en tiempo real
- Conexión a API Express
- Pull-to-refresh

### ⭐ Favoritos
- Sistema de favoritos persistente
- Agregar/remover con un tap
- Listado dedicado

### 📖 Redux "Leer Ahora"
- Store configurado con NgRx
- Actions, Reducers, Selectors
- Listado reactivo en Home

### ⚙️ Configuración
- Editar nombre de usuario
- Configurar URL API (Ngrok)
- Persistencia con ApplicationSettings

## 🌐 API Express

### Endpoints

**GET /api/products**
- Parámetros: `search`, `category`, `minPrice`, `maxPrice`
- Ejemplo: `/api/products?search=laptop&category=Electronics`

**GET /api/products/:id**
- Obtiene producto por ID

**🎉 Proyecto Completo - 100% Requisitos Cumplidos**

