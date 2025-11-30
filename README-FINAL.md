# 📱 PROYECTO COMPLETO - CourseRedux
**Aplicación NativeScript con Express API, Redux y Persistencia**

## 📋 Resumen del Proyecto

Este proyecto es una aplicación móvil desarrollada con **NativeScript + Angular** que integra:
- Servidor **Express.js** con API REST
- Gestión de estado con **Redux (NgRx)**
- Persistencia de datos con **ApplicationSettings**
- Consumo de API externa mediante **HttpClient**
- Sistema de favoritos y lectura
- Configuración dinámica de endpoints

---

## 🎯 Fases del Proyecto

### **FASE 1: Fundamentos NativeScript** ✅
- Template drawer-navigation con navegación
- 2 componentes nuevos (ProductList, ProductDetail)
- Módulo de features (ProductsModule)
- Routing submodule
- Service global con DI (ProductService)
- Directiva ngFor
- CSS específicos por plataforma (.android.css, .ios.css)
- App_Resources personalizados
- Detección de plataforma Android

### **FASE 2: Características Avanzadas** ✅
- ListView con FlexboxLayout anidado
- RouterExtensions para navegación
- Pull-to-refresh
- Action dialogs
- Toast notifications
- Two-way binding [(ngModel)]
- Validadores personalizados (directives)
- Detección de gestos (long press, double tap)
- Animaciones (rotate)
- Splash screen personalizado para Android

### **FASE 3: API, Redux y Persistencia** ✅
- Servidor Express con API REST
- Filtrado por querystring
- Formulario de búsqueda funcional
- Configuración de URL Ngrok
- Service HTTP (ApiService)
- Settings con persistencia de usuario
- Sistema de favoritos
- Redux Store con NgRx
- Listado reactivo con selectors

---

## 🏗️ Arquitectura del Proyecto

```
courseredux/
├── express-server/              # Servidor Express API
│   ├── server.js               # API REST con endpoints
│   ├── package.json            # Dependencias del servidor
│   └── README.md               # Documentación del API
│
├── src/
│   ├── app/
│   │   ├── features/           # Módulos de características
│   │   │   ├── home/          # Pantalla principal (Redux)
│   │   │   ├── search/        # Búsqueda con API
│   │   │   ├── favorites/     # Gestión de favoritos
│   │   │   ├── settings/      # Configuración
│   │   │   ├── products/      # Listado de productos
│   │   │   └── browse/        # Navegación
│   │   │
│   │   ├── services/          # Services Angular
│   │   │   ├── api.service.ts           # HTTP Client
│   │   │   ├── favorites.service.ts     # Favoritos
│   │   │   ├── user-settings.service.ts # Persistencia usuario
│   │   │   └── product.service.ts       # Productos locales
│   │   │
│   │   ├── store/             # Redux Store (NgRx)
│   │   │   ├── actions/       # Redux Actions
│   │   │   ├── reducers/      # Redux Reducers
│   │   │   └── selectors/     # Redux Selectors
│   │   │
│   │   ├── directives/        # Custom Directives
│   │   │   ├── email-validator.directive.ts
│   │   │   └── min-length-validator.directive.ts
│   │   │
│   │   ├── app.module.ts      # Módulo raíz con NgRx
│   │   └── app-routing.module.ts
│   │
│   └── App_Resources/         # Recursos nativos
│       ├── Android/           # Splash screen, íconos
│       └── iOS/               # Recursos iOS
│
├── VALIDATION-PART1.md        # Documentación Fase 1
├── VALIDATION-PART2.md        # Documentación Fase 2
├── VALIDATION-PART3.md        # Documentación Fase 3
├── PROYECTO-COMPLETO.md       # Fase 1 y 2 resumen
└── package.json               # Dependencias NativeScript
```

---

## 🔧 Tecnologías Utilizadas

### Frontend (NativeScript)
- **Framework:** NativeScript 8.6
- **UI Framework:** Angular 16.2
- **Estado:** NgRx Store 16 (Redux)
- **HTTP:** Angular HttpClient
- **Persistencia:** ApplicationSettings (NativeScript)
- **Notificaciones:** @triniwiz/nativescript-toasty 4.1.0
- **Navegación:** RouterExtensions
- **Lenguaje:** TypeScript 5.1

### Backend (Express)
- **Framework:** Express.js 4.18
- **CORS:** cors 2.8.5
- **Lenguaje:** JavaScript (Node.js)

### Herramientas Adicionales
- **Túnel HTTP:** Ngrok (opcional)
- **Control de Versiones:** Git / GitHub
- **IDE:** Visual Studio Code

---

## 📦 Dependencias Principales

### NativeScript App
```json
{
  "@nativescript/angular": "~16.2.0",
  "@nativescript/core": "~8.6.0",
  "@ngrx/store": "^16.3.0",
  "@ngrx/effects": "^16.3.0",
  "@triniwiz/nativescript-toasty": "^4.1.0",
  "rxjs": "~7.8.0"
}
```

### Express Server
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar Repositorio
```bash
git clone https://github.com/malexandera97/courseredux.git
cd courseredux
```

### 2. Instalar Dependencias de la App
```bash
npm install
```

### 3. Instalar Dependencias del Servidor
```bash
cd express-server
npm install
```

### 4. Iniciar Servidor Express
```bash
# Dentro de express-server/
npm start
```
El servidor correrá en `http://localhost:3000`

### 5. (Opcional) Exponer con Ngrok
```bash
ngrok http 3000
```
Copiar la URL HTTPS proporcionada (ej: `https://abc123.ngrok.io`)

### 6. Ejecutar App NativeScript
```bash
# Android
ns run android

# iOS
ns run ios
```

### 7. Configurar URL en la App
1. Abrir la app
2. Ir a "⚙️ Settings"
3. Pegar URL de Ngrok o dejar `http://localhost:3000`
4. Presionar "💾 Guardar"
5. Presionar "🔌 Probar Conexión"

---

## 📱 Funcionalidades Principales

### 1. **Búsqueda de Productos**
- Formulario con caja de texto y botón
- Conexión al API Express
- Filtrado por nombre/descripción
- Pull-to-refresh
- Ícono de favorito (⭐/☆)

### 2. **Gestión de Favoritos**
- Agregar/remover favoritos con un tap
- Persistencia con ApplicationSettings
- Listado dedicado en sección "Favoritos"
- Botón "Leer Ahora" que usa Redux

### 3. **Redux "Leer Ahora"**
- Store configurado con NgRx
- Actions: addReadNowItem, removeReadNowItem, clearReadNowItems
- Reducers con estado inmutable
- Selectors para queries reactivas
- Listado en Home actualizado automáticamente

### 4. **Configuración**
- Editar nombre de usuario (persistente)
- Configurar URL del API (Ngrok)
- Probar conexión con el API
- Instrucciones de uso

### 5. **API Express**
- Endpoint GET `/api/products`
- Filtrado por querystring:
  - `search`: nombre o descripción
  - `category`: categoría
  - `minPrice`: precio mínimo
  - `maxPrice`: precio máximo
- Base de datos simulada con 15 productos

---

## 🔄 Flujo de Uso Completo

1. **Configuración Inicial**
   ```
   Settings → Configurar URL API → Guardar → Probar Conexión
   Settings → Editar Nombre Usuario → Guardar
   ```

2. **Buscar Productos**
   ```
   Buscar → Escribir término → Presionar Buscar → Ver resultados del API
   ```

3. **Agregar a Favoritos**
   ```
   Buscar → Ver producto → Presionar ☆ → Se convierte en ⭐
   ```

4. **Ver Favoritos**
   ```
   Favoritos → Ver lista completa → Opciones: Leer Ahora o Eliminar
   ```

5. **"Leer Ahora" con Redux**
   ```
   Favoritos → Presionar "📖 Leer Ahora" → Action se despacha a Redux
   ```

6. **Ver en Home (Redux)**
   ```
   Home → Sección "Leyendo Ahora" → Items aparecen automáticamente
   ```

---


