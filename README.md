# CourseRedux - NativeScript Application

Este proyecto es una aplicación NativeScript con Angular basada en el template [drawer-navigation-ng](https://github.com/NativeScript/template-drawer-navigation-ng).

## Características Implementadas

### 1. ✅ Template Drawer Navigation
- Proyecto basado en `template-drawer-navigation-ng`
- Enrutador modularizado en features
- Navegación integrada con barra superior

### 2. ✅ Componentes Nuevos
- **ProductListComponent**: Lista de productos con detección de plataforma
- **ProductDetailComponent**: Detalle individual de cada producto

### 3. ✅ Nuevo Módulo de Features
- **ProductsModule**: Módulo completo de funcionalidad de productos
  - Incluye componentes de lista y detalle
  - Gestión de rutas internas

### 4. ✅ Submódulo de Ruteo
- **ProductsRoutingModule**: Ruteo específico para el módulo de productos
  - Ruta principal: `/products`
  - Ruta de detalle: `/products/detail/:id`

### 5. ✅ Integración con Navegación
- Sistema de navegación modular integrado:
  - Home
  - Browse
  - Search
  - **Productos** (nuevo)

### 6. ✅ Service Global con Inyección de Dependencias
- **ProductService**: Servicio inyectado a nivel root
  - Gestión de productos
  - Métodos: `getProducts()`, `getProductById(id)`, `addProduct()`
  - Providido globalmente mediante `providedIn: 'root'`

### 7. ✅ Vista con ngFor
- `ProductListComponent` implementa `*ngFor` para mostrar lista de productos
- Muestra: nombre, descripción, precio y categoría de cada producto

### 8. ✅ Estilos CSS Específicos por Plataforma
- **product-list.component.android.css**: Estilos para Android
  - Colores verde/Material Design
  - Elevation para cards
- **product-list.component.ios.css**: Estilos para iOS
  - Colores azul/iOS design
  - Border radius más pronunciado
  - Safe area support

### 9. ✅ Ícono Personalizado en App_Resources
- Estructura de recursos para Android: `App_Resources/Android/src/main/res/drawable-*/`
- Estructura de recursos para iOS: `App_Resources/iOS/Assets.xcassets/`
- README files documentando la personalización de íconos

### 10. ✅ Detección de Plataforma Android
- En `ProductListComponent.ngOnInit()`:
```typescript
if (isAndroid) {
    this.platformMessage = 'Estás usando Android';
} else {
    this.platformMessage = 'Estás usando iOS';
}
```
- Variable `platformMessage` se asigna solo cuando se ejecuta en Android

## Estructura del Proyecto

```
courseredux/
├── App_Resources/
│   ├── Android/
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   │           ├── drawable-hdpi/
│   │           └── values/
│   └── iOS/
│       ├── Info.plist
│       └── Assets.xcassets/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── browse/
│   │   │   ├── search/
│   │   │   └── products/          # ⭐ Nuevo módulo
│   │   │       ├── products.module.ts
│   │   │       ├── products-routing.module.ts
│   │   │       ├── product-list/
│   │   │       │   ├── product-list.component.ts
│   │   │       │   ├── product-list.component.html
│   │   │       │   ├── product-list.component.css
│   │   │       │   ├── product-list.component.android.css  # ⭐ Estilos Android
│   │   │       │   └── product-list.component.ios.css      # ⭐ Estilos iOS
│   │   │       └── product-detail/
│   │   │           ├── product-detail.component.ts
│   │   │           ├── product-detail.component.html
│   │   │           └── product-detail.component.css
│   │   ├── services/
│   │   │   └── product.service.ts  # ⭐ Service global
│   │   ├── shared/
│   │   │   └── drawer-content/
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   └── main.ts
├── package.json
├── tsconfig.json
├── nativescript.config.ts
└── webpack.config.js
```

## Instalación

```bash
npm install
```

## Ejecutar la Aplicación

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Tecnologías

- **NativeScript** 8.6
- **Angular** 16.2
- **NativeScript UI SideDrawer** 9.1
- **TypeScript** 5.1

## Autor

Alexander Maldonado
CEUTEC - Estructura de Datos

## Licencia

Este proyecto es para fines educativos.
