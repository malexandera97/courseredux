# VALIDACIÓN FASE 3 - CourseRedux
**Proyecto NativeScript con Express API, Redux y Persistencia**

## ✅ Requisitos Completados

### 1. ✅ Aplicación Express con WebService GET
**Ubicación:** `express-server/server.js`

**Implementación:**
- Servidor Express en puerto 3000
- Endpoint GET `/api/products` con filtrado por querystring
- Parámetros soportados:
  - `search`: Buscar por nombre o descripción
  - `category`: Filtrar por categoría
  - `minPrice`: Precio mínimo
  - `maxPrice`: Precio máximo

**Ejemplo de uso:**
```
GET /api/products?search=laptop
GET /api/products?category=Electronics
GET /api/products?minPrice=100&maxPrice=500
```

**Código relevante:**
```javascript
app.get('/api/products', (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;
  // Filtrado implementado
});
```

**Para probar:**
1. `cd express-server`
2. `npm install`
3. `npm start`
4. Visitar: http://localhost:3000/api/products

---

### 2. ✅ Formulario de Búsqueda con Filtrado
**Ubicación:** 
- `src/app/features/search/search.component.ts`
- `src/app/features/search/search.component.html`

**Implementación:**
- Caja de texto con two-way binding `[(ngModel)]="searchQuery"`
- Botón "🔍 Buscar" que ejecuta `onSearch()`
- Botón "✖ Limpiar" para resetear búsqueda
- El filtrado se ejecuta llamando al API Express

**Código relevante:**
```html
<TextField [(ngModel)]="searchQuery" hint="Buscar por nombre o descripción"></TextField>
<Button text="🔍 Buscar" (tap)="onSearch()"></Button>
```

```typescript
onSearch(): void {
  const filters = { search: this.searchQuery.trim() || undefined };
  this.apiService.searchProducts(filters).subscribe(...);
}
```

---

### 3. ✅ Variable de Configuración para URL de Ngrok
**Ubicación:** 
- `src/app/services/api.service.ts`
- `src/app/features/settings/settings.component.ts`

**Implementación:**
- Variable `API_BASE_URL` guardada en ApplicationSettings
- Métodos `getApiUrl()` y `setApiUrl()` para gestionar la configuración
- Interfaz en Settings para editar la URL de Ngrok

**Código relevante:**
```typescript
private readonly CONFIG_KEY = 'API_BASE_URL';
private readonly DEFAULT_URL = 'http://localhost:3000';

getApiUrl(): string {
  return ApplicationSettings.getString(this.CONFIG_KEY, this.DEFAULT_URL);
}

setApiUrl(url: string): void {
  ApplicationSettings.setString(this.CONFIG_KEY, url);
}
```

**Configuración:**
1. Ir a Settings
2. Ingresar URL de Ngrok (ej: https://abc123.ngrok.io)
3. Guardar
4. Probar conexión

---

### 4. ✅ Service Angular para Solicitudes HTTP
**Ubicación:** `src/app/services/api.service.ts`

**Implementación:**
- Service `ApiService` inyectable con `providedIn: 'root'`
- Usa `HttpClient` de Angular para solicitudes HTTP
- Métodos:
  - `searchProducts(filters)`: Busca productos con filtros
  - `getProductById(id)`: Obtiene producto por ID
  - `testConnection()`: Verifica conexión con API

**Código relevante:**
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  
  searchProducts(filters?): Observable<ApiProduct[]> {
    const baseUrl = this.getApiUrl();
    return this.http.get<ApiResponse>(`${baseUrl}/api/products`, { params });
  }
}
```

**Separación de responsabilidades:**
- ✅ Los componentes NO hacen solicitudes HTTP directamente
- ✅ El service maneja toda la lógica de comunicación con el API
- ✅ Los componentes solo llaman a métodos del service

---

### 5. ✅ Sección Settings con Persistencia de Nombre de Usuario
**Ubicación:** 
- `src/app/features/settings/settings.component.ts`
- `src/app/services/user-settings.service.ts`

**Implementación:**
- Service `UserSettingsService` que usa ApplicationSettings
- Lee y guarda el nombre de usuario de manera persistente
- Observable `username$` para actualizaciones reactivas
- Pantalla Settings donde se muestra y edita el nombre

**Código relevante:**
```typescript
private readonly USERNAME_KEY = 'USER_NAME';

getUsername(): string {
  return ApplicationSettings.getString(this.USERNAME_KEY, this.DEFAULT_USERNAME);
}

setUsername(username: string): void {
  ApplicationSettings.setString(this.USERNAME_KEY, username.trim());
  this.usernameSubject.next(username.trim());
}
```

**Persistencia verificada:**
- ✅ El nombre se guarda con ApplicationSettings
- ✅ Persiste entre sesiones de la app
- ✅ Se lee al iniciar la aplicación

---

### 6. ✅ Pantalla para Editar Nombre de Usuario
**Ubicación:** `src/app/features/settings/settings.component.html`

**Implementación:**
- TextField con two-way binding al nombre de usuario
- Botón "💾 Guardar" que persiste el cambio
- Botón "🔄 Resetear" para volver al nombre por defecto
- Toast notifications para feedback visual

**Código relevante:**
```html
<TextField [(ngModel)]="username" hint="Ingresa tu nombre"></TextField>
<Button text="💾 Guardar" (tap)="onSaveUsername()"></Button>
```

```typescript
onSaveUsername(): void {
  this.userSettingsService.setUsername(this.username);
  new Toasty({ text: '✅ Nombre de usuario guardado' }).show();
}
```

---

### 7. ✅ Ícono para Guardar como Favorito
**Ubicación:** `src/app/features/search/search.component.html`

**Implementación:**
- Botón con ícono ⭐ (favorito) / ☆ (no favorito)
- Método `onToggleFavorite()` para agregar/remover
- Service `FavoritesService` que maneja la lógica
- Persistencia con ApplicationSettings

**Código relevante:**
```html
<Button 
  [text]="isFavorite(product.id) ? '⭐' : '☆'" 
  (tap)="onToggleFavorite(product)" 
  class="btn-favorite">
</Button>
```

```typescript
onToggleFavorite(product: ApiProduct): void {
  const isFavorite = this.favoritesService.toggleFavorite(product);
  new Toasty({
    text: isFavorite ? '⭐ Agregado a favoritos' : '❌ Removido de favoritos'
  }).show();
}
```

---

### 8. ✅ Favoritos Listados en Componente
**Ubicación:** 
- `src/app/features/favorites/favorites.component.ts`
- `src/app/features/favorites/favorites.component.html`

**Implementación:**
- Componente `FavoritesComponent` dedicado
- Lista todos los productos marcados como favoritos
- Observable `favorites$` para actualizaciones reactivas
- Muestra nombre, descripción, precio y categoría

**Código relevante:**
```typescript
ngOnInit(): void {
  this.loadFavorites();
  this.favoritesService.favorites$.subscribe(
    (favs) => { this.favorites = favs; }
  );
}
```

```html
<StackLayout *ngFor="let favorite of favorites" class="favorite-item">
  <Label [text]="favorite.name"></Label>
  <Label [text]="favorite.description"></Label>
</StackLayout>
```

---

### 9. ✅ Botón "Leer Ahora" con Redux
**Ubicación:** `src/app/features/favorites/favorites.component.ts`

**Implementación:**
- Botón "📖 Leer Ahora" en cada favorito
- Despacha action `addReadNowItem` al Redux Store
- Redux configurado con NgRx Store
- Actions, Reducers y Selectors implementados

**Código relevante:**
```typescript
onReadNow(favorite: Favorite): void {
  const readNowItem: ReadNowItem = {
    id: favorite.id,
    name: favorite.name,
    // ... otros campos
    readAt: new Date().toISOString()
  };
  
  // Despachar acción al Redux Store
  this.store.dispatch(addReadNowItem({ item: readNowItem }));
  
  new Toasty({ text: `📖 "${favorite.name}" agregado a Leer Ahora` }).show();
}
```

**Redux Store configurado:**
- ✅ Actions: `addReadNowItem`, `removeReadNowItem`, `clearReadNowItems`
- ✅ Reducer: `readNowReducer` con estado inmutable
- ✅ Selectors: `selectAllReadNowItems`, `selectReadNowItemsCount`
- ✅ Store configurado en `app.module.ts`

---

### 10. ✅ Listado Reactivo con Redux en Pantalla Principal
**Ubicación:** 
- `src/app/features/home/home.component.ts`
- `src/app/features/home/home.component.html`

**Implementación:**
- Componente Home muestra items de "Leer Ahora"
- Usa `store.select()` para obtener datos del Redux Store
- Observable `readNowItems$` que se actualiza reactivamente
- Se actualiza automáticamente cuando se despacha una acción

**Código relevante:**
```typescript
constructor(private store: Store) {
  // Select con API del Store de Redux
  this.readNowItems$ = this.store.select(selectAllReadNowItems);
  this.readNowCount$ = this.store.select(selectReadNowItemsCount);
}
```

```html
<!-- Listado reactivo que se actualiza automáticamente -->
<StackLayout *ngFor="let item of readNowItems$ | async">
  <Label [text]="item.name"></Label>
  <Label [text]="item.description"></Label>
  <Button text="❌" (tap)="onRemoveItem(item)"></Button>
</StackLayout>
```

**Reactividad verificada:**
- ✅ El listado se actualiza automáticamente al agregar items
- ✅ Usa async pipe para suscripción automática
- ✅ No hay actualizaciones manuales de la vista
- ✅ Estado centralizado en Redux Store

---

## 📁 Estructura de Archivos Creados

### Servidor Express
```
express-server/
├── server.js              ✅ Servidor Express con API
├── package.json          ✅ Dependencias
└── README.md             ✅ Documentación
```

### Services
```
src/app/services/
├── api.service.ts              ✅ Service HTTP para API Express
├── favorites.service.ts        ✅ Gestión de favoritos
├── user-settings.service.ts    ✅ Persistencia de usuario
└── product.service.ts          (Existente)
```

### Redux Store
```
src/app/store/
├── actions/
│   └── read-now.actions.ts     ✅ Actions de Redux
├── reducers/
│   └── read-now.reducer.ts     ✅ Reducer con estado inmutable
└── selectors/
    └── read-now.selectors.ts   ✅ Selectors para queries
```

### Componentes Nuevos
```
src/app/features/
├── settings/
│   ├── settings.component.ts   ✅ Configuración y edición de usuario
│   ├── settings.component.html
│   ├── settings.component.css
│   ├── settings.module.ts
│   └── settings-routing.module.ts
│
└── favorites/
    ├── favorites.component.ts  ✅ Listado de favoritos
    ├── favorites.component.html
    ├── favorites.component.css
    ├── favorites.module.ts
    └── favorites-routing.module.ts
```

### Componentes Actualizados
```
src/app/features/
├── search/
│   ├── search.component.ts     ✅ Formulario búsqueda + API + favoritos
│   └── search.component.html   ✅ Botón buscar + ícono favorito
│
├── home/
│   ├── home.component.ts       ✅ Listado Redux reactivo
│   ├── home.component.html     ✅ Vista items "Leer Ahora"
│   └── home.component.css
│
└── app.component.html          ✅ Navegación actualizada
```

---

## 🚀 Instrucciones de Uso

### 1. Iniciar Servidor Express
```bash
cd express-server
npm install
npm start
```
Servidor corriendo en http://localhost:3000

### 2. Exponer con Ngrok (Opcional)
```bash
ngrok http 3000
```
Copiar URL HTTPS proporcionada (ej: https://abc123.ngrok.io)

### 3. Configurar App NativeScript
1. Abrir app y navegar a "⚙️ Settings"
2. Pegar URL de Ngrok en "Configuración del API"
3. Presionar "💾 Guardar"
4. Presionar "🔌 Probar Conexión" para verificar

### 4. Editar Nombre de Usuario
1. En "⚙️ Settings"
2. Ingresar nombre en "Nombre de Usuario"
3. Presionar "💾 Guardar"
4. El nombre se muestra en Home como "👋 Hola, {nombre}!"

### 5. Buscar Productos
1. Navegar a "🔍 Buscar"
2. Escribir término de búsqueda
3. Presionar "🔍 Buscar"
4. Ver resultados desde el API

### 6. Agregar a Favoritos
1. En listado de búsqueda
2. Presionar botón ☆ para agregar a favoritos
3. Botón cambia a ⭐
4. Toast confirma "⭐ Agregado a favoritos"

### 7. Ver Favoritos
1. Navegar a "⭐ Favoritos"
2. Ver todos los productos favoritos
3. Opciones:
   - "📖 Leer Ahora" → Agrega a Redux Store
   - "❌ Eliminar" → Remueve de favoritos

### 8. Ver Items "Leer Ahora" (Redux)
1. Navegar a "🏠 Home"
2. Ver sección "📖 Leyendo Ahora"
3. El listado se actualiza reactivamente
4. Cada item muestra contador de items
5. Botón ❌ para remover item

---

## 🔄 Flujo Completo de Uso

1. **Configuración Inicial**
   - Iniciar servidor Express
   - Configurar URL en Settings
   - Editar nombre de usuario

2. **Búsqueda de Productos**
   - Buscar productos usando el API
   - Ver resultados filtrados

3. **Gestión de Favoritos**
   - Agregar productos a favoritos (☆ → ⭐)
   - Ver lista de favoritos

4. **Redux "Leer Ahora"**
   - Desde favoritos, presionar "📖 Leer Ahora"
   - Acción se despacha a Redux Store
   - Item aparece automáticamente en Home

5. **Vista Principal Reactiva**
   - Home muestra items de Redux
   - Listado se actualiza en tiempo real
   - Sin necesidad de refresh manual

---

## 🎯 Tecnologías Utilizadas

- **Backend:** Express.js, CORS
- **Frontend:** NativeScript, Angular 16
- **Estado:** Redux (NgRx Store v16)
- **HTTP:** Angular HttpClient
- **Persistencia:** ApplicationSettings (NativeScript)
- **Routing:** RouterExtensions
- **Notificaciones:** Toasty
- **Túnel:** Ngrok (opcional)

---

## ✨ Características Destacadas

1. **Arquitectura Limpia**
   - Services separados por responsabilidad
   - Componentes enfocados en vista
   - Redux para estado global

2. **Reactividad**
   - Observables en todos los services
   - Redux Store con selectors
   - Actualizaciones automáticas de UI

3. **Persistencia**
   - Configuración del API
   - Nombre de usuario
   - Lista de favoritos

4. **UX Mejorada**
   - Toast notifications
   - Estados de carga
   - Validación de inputs
   - Íconos descriptivos

---

## 📊 Resumen de Requisitos

| # | Requisito | Estado | Archivo Principal |
|---|-----------|--------|-------------------|
| 1 | Express API con GET y querystring | ✅ | `express-server/server.js` |
| 2 | Formulario de búsqueda con filtrado | ✅ | `search.component.ts` |
| 3 | Variable configuración URL Ngrok | ✅ | `api.service.ts` |
| 4 | Service Angular para HTTP | ✅ | `api.service.ts` |
| 5 | Settings con persistencia usuario | ✅ | `user-settings.service.ts` |
| 6 | Pantalla editar nombre usuario | ✅ | `settings.component.ts` |
| 7 | Ícono guardar favorito | ✅ | `search.component.html` |
| 8 | Listar favoritos | ✅ | `favorites.component.ts` |
| 9 | Botón "Leer ahora" con Redux | ✅ | `favorites.component.ts` |
| 10 | Listado reactivo con Redux | ✅ | `home.component.ts` |

**TODOS LOS REQUISITOS COMPLETADOS: 10/10** ✅

---

## 📝 Notas Finales

- Todos los requisitos de la Fase 3 han sido implementados y verificados
- El código sigue las mejores prácticas de Angular y NativeScript
- Redux está correctamente configurado con NgRx
- La persistencia funciona con ApplicationSettings
- El API Express está listo para producción
- La app está lista para pruebas y demostración

**Proyecto completado exitosamente** 🎉
