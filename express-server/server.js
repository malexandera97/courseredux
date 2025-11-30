const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos simulada de productos
const products = [
  { id: 1, name: 'Laptop Dell XPS', description: 'Laptop de alta gama', price: 1299.99, category: 'Electronics' },
  { id: 2, name: 'iPhone 15 Pro', description: 'Smartphone Apple', price: 999.99, category: 'Electronics' },
  { id: 3, name: 'Samsung Galaxy S24', description: 'Smartphone Android', price: 899.99, category: 'Electronics' },
  { id: 4, name: 'MacBook Pro M3', description: 'Laptop Apple profesional', price: 2499.99, category: 'Electronics' },
  { id: 5, name: 'Sony WH-1000XM5', description: 'Audífonos con cancelación de ruido', price: 399.99, category: 'Audio' },
  { id: 6, name: 'iPad Air', description: 'Tablet Apple', price: 599.99, category: 'Electronics' },
  { id: 7, name: 'Canon EOS R6', description: 'Cámara profesional', price: 2499.99, category: 'Photography' },
  { id: 8, name: 'Nike Air Max', description: 'Zapatos deportivos', price: 129.99, category: 'Sports' },
  { id: 9, name: 'Adidas Ultraboost', description: 'Zapatos para correr', price: 179.99, category: 'Sports' },
  { id: 10, name: 'The Art of War', description: 'Libro clásico de estrategia', price: 12.99, category: 'Books' },
  { id: 11, name: 'Clean Code', description: 'Libro de programación', price: 45.99, category: 'Books' },
  { id: 12, name: 'PlayStation 5', description: 'Consola de videojuegos', price: 499.99, category: 'Gaming' },
  { id: 13, name: 'Xbox Series X', description: 'Consola Microsoft', price: 499.99, category: 'Gaming' },
  { id: 14, name: 'LG OLED TV 55"', description: 'Televisor 4K', price: 1799.99, category: 'Electronics' },
  { id: 15, name: 'Bose SoundLink', description: 'Bocina Bluetooth portátil', price: 149.99, category: 'Audio' }
];

// WebService GET con filtrado por querystring
app.get('/api/products', (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let filteredProducts = [...products];

    // Filtrar por búsqueda de texto (name o description)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por categoría
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filtrar por precio mínimo
    if (minPrice) {
      const min = parseFloat(minPrice);
      filteredProducts = filteredProducts.filter(p => p.price >= min);
    }

    // Filtrar por precio máximo
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filteredProducts = filteredProducts.filter(p => p.price <= max);
    }

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts
    });

  } catch (error) {
    console.error('Error en /api/products:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud'
    });
  }
});

// Endpoint para obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
      res.json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
  } catch (error) {
    console.error('Error en /api/products/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud'
    });
  }
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API Express - CourseRedux',
    version: '1.0.0',
    endpoints: [
      'GET /api/products - Lista productos con filtrado por querystring',
      'GET /api/products/:id - Obtiene un producto por ID'
    ],
    queryParams: [
      'search - Búsqueda por nombre o descripción',
      'category - Filtrar por categoría',
      'minPrice - Precio mínimo',
      'maxPrice - Precio máximo'
    ],
    examples: [
      '/api/products?search=laptop',
      '/api/products?category=Electronics',
      '/api/products?minPrice=100&maxPrice=500',
      '/api/products?search=phone&category=Electronics'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`📱 Usa Ngrok para exponer el servidor: ngrok http ${PORT}`);
});
