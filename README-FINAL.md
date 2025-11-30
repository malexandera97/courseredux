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

## 🎨 Características de UI/UX

- **Navegación:** Barra superior con scroll horizontal
- **Iconos:** Emojis descriptivos en toda la app
- **Feedback:** Toast notifications en todas las acciones
- **Estados:** Loading states, empty states
- **Colores:** Paleta moderna (azul, verde, rojo, gris)
- **Responsive:** FlexboxLayout para layouts flexibles
- **Animaciones:** Rotate en ActionBar
- **Gestos:** Long press, double tap
- **Platform-specific:** CSS diferentes para Android/iOS

---

## 📊 Requisitos Cumplidos (Total: 30)

### Fase 1: 10/10 ✅
- [x] Template drawer-navigation
- [x] 2 componentes nuevos
- [x] Módulo de features
- [x] Routing submodule
- [x] Navegación integrada
- [x] Service global con DI
- [x] ngFor
- [x] CSS por plataforma
- [x] App_Resources personalizados
- [x] Detección de plataforma

### Fase 2: 10/10 ✅
- [x] ListView con FlexboxLayout anidado
- [x] RouterExtensions
- [x] Pull-to-refresh
- [x] Action dialog
- [x] Toast notifications
- [x] Two-way binding
- [x] Validadores custom
- [x] Gestos (long press, double tap)
- [x] Animaciones
- [x] Splash screen Android

### Fase 3: 10/10 ✅
- [x] Express API con GET y querystring
- [x] Formulario búsqueda funcional
- [x] Variable configuración URL Ngrok
- [x] Service Angular HTTP
- [x] Settings con persistencia usuario
- [x] Pantalla editar usuario
- [x] Ícono favorito
- [x] Listado de favoritos
- [x] Botón "Leer Ahora" Redux
- [x] Listado reactivo con Redux

**Total: 30/30 requisitos completados** 🎉

---

## 📝 Archivos de Documentación

1. **VALIDATION-PART1.md** - Validación completa de Fase 1
2. **VALIDATION-PART2.md** - Validación completa de Fase 2
3. **VALIDATION-PART3.md** - Validación completa de Fase 3
4. **PROYECTO-COMPLETO.md** - Resumen Fases 1 y 2
5. **README-FINAL.md** (este archivo) - Documentación completa del proyecto

---

## 🔗 Enlaces Importantes

- **Repositorio:** https://github.com/malexandera97/courseredux
- **Commit Fase 1:** bc06150
- **Commit Fase 2:** a3d2e2b
- **Commit Fase 3:** 5926b5e

---

## 👨‍💻 Desarrollo

**Autor:** Alexander  
**Institución:** CEUTEC - Estructura de Datos  
**Fecha:** Noviembre 2025  

---

## 📄 Licencia

Este proyecto es parte de un ejercicio académico para el curso de Estructura de Datos en CEUTEC.

---

## ✨ Características Destacadas

### Arquitectura Limpia
- Separación de responsabilidades
- Services especializados
- Componentes enfocados en vista
- Redux para estado global

### Reactividad
- Observables en todos los services
- Redux Store con selectors
- Actualizaciones automáticas de UI
- Async pipe en templates

### Persistencia
- ApplicationSettings para configuración
- Favoritos persistentes
- Nombre de usuario persistente
- Estado preservado entre sesiones

### Profesionalismo
- Código bien estructurado
- Manejo de errores
- Validación de inputs
- Feedback visual constante
- Documentación completa

---

## 🎓 Conceptos Aprendidos

1. **NativeScript + Angular**
   - Componentes móviles nativos
   - RouterExtensions
   - ApplicationSettings
   - Platform detection

2. **Redux (NgRx)**
   - Actions, Reducers, Selectors
   - Estado inmutable
   - Store configuration
   - Reactive programming

3. **API REST**
   - Express.js
   - Endpoints con filtrado
   - CORS
   - Querystring parameters

4. **Arquitectura**
   - Feature modules
   - Lazy loading
   - Dependency injection
   - Service layer

5. **Persistencia**
   - ApplicationSettings
   - JSON serialization
   - Observable patterns
   - Reactive updates

---

**🎉 Proyecto Completado Exitosamente - 100% de Requisitos Cumplidos**

---

*Documentación generada el 29 de Noviembre de 2025*
