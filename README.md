# CourseRedux - NativeScript Application

Este proyecto es una aplicación NativeScript con Angular basada en el template [drawer-navigation-ng](https://github.com/NativeScript/template-drawer-navigation-ng).

## 🎯 Características Implementadas - Fase 1

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

## 🚀 Características Implementadas - Fase 2

### 11. ✅ ListView con FlexboxLayout Anidado
- **SearchComponent** implementa ListView con plantilla personalizada
- FlexboxLayout anidado en dos niveles
- Diseño responsive con justifyContent y alignItems

### 12. ✅ Navegación con RouterExtensions
- Uso de `RouterExtensions.navigate()` en SearchComponent y ProductListComponent
- Transiciones personalizadas (slide, fade)
- Navegación desde lista a detalle con parámetros

### 13. ✅ Pull to Refresh
- ListView en SearchComponent con `pullToRefreshInitiated`
- Genera productos aleatorios al hacer pull
- Actualiza el listado dinámicamente
- Animación nativa de refresh

### 14. ✅ Action Dialog
- Botón "Cambiar Categoría" en ProductListComponent
- Muestra opciones mediante `action()` de NativeScript
- Modifica el atributo `category` del producto
- Confirmación con toast notification

### 15. ✅ Toast Notifications
- Plugin: `@triniwiz/nativescript-toasty`
- Múltiples usos:
  - Al guardar cambios
  - Al cambiar categoría
  - Al agregar a favoritos
  - Al enviar reseña
- Posiciones: top, center, bottom
- Colores personalizados

### 16. ✅ Two-Way Binding [()]
- Búsqueda en SearchComponent: `[(ngModel)]="searchQuery"`
- Edición de producto: `[(ngModel)]="editedName"` y `[(ngModel)]="editedPrice"`
- Formulario de reseña: `[(ngModel)]="userEmail"` y `[(ngModel)]="reviewText"`
- Sincronización automática entre vista y modelo

### 17. ✅ Validadores Personalizados con Directivas
- **MinLengthValidatorDirective**: Valida longitud mínima
- **EmailValidatorDirective**: Valida formato de email
- Implementan `Validator` interface de Angular
- Registrados en `NG_VALIDATORS`
- Mensajes de error dinámicos en HTML

### 18. ✅ Detección de Gestos
- **Long Press**: Muestra alert con información del producto
- **Double Tap**: Agrega a favoritos con toast
- **Tap**: Navegación estándar al detalle
- Implementados en ProductListComponent

### 19. ✅ Animaciones
- Botón en ActionBar con animación rotate 360°
- Duración: 500ms
- Curve: easeInOut
- Reset automático después de la animación

### 20. ✅ Splash Screen Personalizado Android
- `splash_screen.xml`: Layer list con color y logo
- `styles.xml`: LaunchScreenTheme personalizado
- Aplicado en AndroidManifest.xml
- Transición automática a AppTheme

## Estructura del Proyecto

```
courseredux/
├── App_Resources/
│   ├── Android/
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   │           ├── drawable/
│   │           │   ├── splash_screen.xml    # ⭐ Splash personalizado
│   │           │   └── logo.txt
│   │           ├── drawable-hdpi/
│   │           └── values/
│   │               ├── colors.xml
│   │               ├── strings.xml
│   │               └── styles.xml           # ⭐ LaunchScreenTheme
│   └── iOS/
│       ├── Info.plist
│       └── Assets.xcassets/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── browse/
│   │   │   ├── search/                      # ⭐ ListView + FlexboxLayout
│   │   │   │   ├── search.module.ts
│   │   │   │   ├── search-routing.module.ts
│   │   │   │   ├── search.component.ts      # ⭐ Pull-to-refresh
│   │   │   │   ├── search.component.html
│   │   │   │   └── search.component.css
│   │   │   └── products/
│   │   │       ├── products.module.ts
│   │   │       ├── products-routing.module.ts
│   │   │       ├── product-list/
│   │   │       │   ├── product-list.component.ts        # ⭐ Gestos + Animación
│   │   │       │   ├── product-list.component.html
│   │   │       │   ├── product-list.component.css
│   │   │       │   ├── product-list.component.android.css
│   │   │       │   └── product-list.component.ios.css
│   │   │       └── product-detail/
│   │   │           ├── product-detail.component.ts      # ⭐ Two-way binding
│   │   │           ├── product-detail.component.html    # ⭐ Validadores
│   │   │           └── product-detail.component.css
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── directives/                                   # ⭐ NUEVO
│   │   │   ├── min-length-validator.directive.ts        # ⭐ Validador custom
│   │   │   └── email-validator.directive.ts             # ⭐ Validador custom
│   │   ├── shared/
│   │   │   └── drawer-content/
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   ├── main.ts
│   └── app.css
├── package.json                             # ⭐ Incluye @triniwiz/nativescript-toasty
├── tsconfig.json
├── nativescript.config.ts
├── webpack.config.js
├── README.md
├── VALIDATION.md                            # Fase 1
├── VALIDATION-PART2.md                      # ⭐ Fase 2
├── TESTING.md
└── COMO-PROBAR.md
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
