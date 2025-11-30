# Express API Server

## Instalación

```bash
cd express-server
npm install
```

## Ejecutar servidor

```bash
npm start
```

## Exponer con Ngrok

1. Instalar Ngrok: https://ngrok.com/download
2. Ejecutar: `ngrok http 3000`
3. Copiar la URL HTTPS que proporciona Ngrok (ej: https://abc123.ngrok.io)
4. Configurar esa URL en la app NativeScript en Settings

## Endpoints disponibles

### GET /api/products
Lista todos los productos con filtrado opcional

**Query Parameters:**
- `search`: Buscar en nombre o descripción
- `category`: Filtrar por categoría
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo

**Ejemplos:**
```
GET /api/products?search=laptop
GET /api/products?category=Electronics
GET /api/products?minPrice=100&maxPrice=500
GET /api/products?search=phone&category=Electronics
```

### GET /api/products/:id
Obtiene un producto específico por ID

**Ejemplo:**
```
GET /api/products/1
```
