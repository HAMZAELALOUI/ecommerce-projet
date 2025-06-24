const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

// GET /api/products - Récupérer tous les produits
router.get('/', getAllProducts);

// GET /api/products/category/:categoryId - Récupérer les produits par catégorie
router.get('/category/:categoryId', getProductsByCategory);

// GET /api/products/search/:term - Rechercher des produits
router.get('/search/:term', searchProducts);

// GET /api/products/:id - Récupérer un produit par ID (doit être après les routes spécifiques)
router.get('/:id', getProductById);

// POST /api/products - Créer un nouveau produit
router.post('/', createProduct);

// PUT /api/products/:id - Mettre à jour un produit
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Supprimer un produit
router.delete('/:id', deleteProduct);

module.exports = router; 