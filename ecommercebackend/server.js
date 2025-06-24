const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import de la connexion à la base de données
require('./db');

// Import des routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true
}));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes de base
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API E-commerce Backend',
    version: '1.0.0',
    description: 'Backend Node.js avec MySQL pour gestion des produits et catégories',
    endpoints: {
      categories: '/api/categories',
      products: '/api/products'
    }
  });
});

// Route de test de la base de données
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Serveur opérationnel',
    timestamp: new Date().toISOString(),
    database: 'MySQL via XAMPP'
  });
});

// Routes API
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Middleware de gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🛒 E-commerce Backend Server');
  console.log('='.repeat(50));
  console.log(`📡 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
  console.log('📋 Endpoints disponibles:');
  console.log('   GET    /api/categories');
  console.log('   POST   /api/categories');
  console.log('   GET    /api/categories/:id');
  console.log('   PUT    /api/categories/:id');
  console.log('   DELETE /api/categories/:id');
  console.log('   GET    /api/products');
  console.log('   POST   /api/products');
  console.log('   GET    /api/products/:id');
  console.log('   PUT    /api/products/:id');
  console.log('   DELETE /api/products/:id');
  console.log('   GET    /api/products/category/:categoryId');
  console.log('   GET    /api/products/search/:term');
  console.log('='.repeat(50));
});

// Gestion de l'arrêt gracieux
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
}); 