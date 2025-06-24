const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Récupérer tous les produits
router.get('/', (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits',
        error: err.message
      });
    }
    res.json({
      success: true,
      data: products
    });
  });
});

// GET /api/products/category/:categoryId - Récupérer les produits par catégorie
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  
  Product.getByCategory(categoryId, (err, products) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits par catégorie:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits par catégorie',
        error: err.message
      });
    }
    
    res.json({
      success: true,
      data: products
    });
  });
});

// GET /api/products/search/:term - Rechercher des produits
router.get('/search/:term', (req, res) => {
  const searchTerm = req.params.term;
  
  Product.search(searchTerm, (err, products) => {
    if (err) {
      console.error('Erreur lors de la recherche des produits:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche des produits',
        error: err.message
      });
    }
    
    res.json({
      success: true,
      data: products
    });
  });
});

// GET /api/products/:id - Récupérer un produit par ID (doit être après les routes spécifiques)
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  
  Product.getById(productId, (err, product) => {
    if (err) {
      console.error('Erreur lors de la récupération du produit:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du produit',
        error: err.message
      });
    }
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  });
});

// POST /api/products - Créer un nouveau produit
router.post('/', (req, res) => {
  const { name, price, category_id } = req.body;
  
  // Validation des données
  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Le nom du produit est requis'
    });
  }
  
  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Le prix doit être un nombre positif'
    });
  }
  
  const productData = {
    name: name.trim(),
    price: parseFloat(price),
    category_id: category_id || null
  };
  
  Product.create(productData, (err, newProduct) => {
    if (err) {
      console.error('Erreur lors de la création du produit:', err);
      
      // Gestion des erreurs MySQL spécifiques
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          success: false,
          message: 'La catégorie spécifiée n\'existe pas'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du produit',
        error: err.message
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: newProduct
    });
  });
});

// PUT /api/products/:id - Mettre à jour un produit
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price, category_id } = req.body;
  
  // Validation des données
  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Le nom du produit est requis'
    });
  }
  
  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Le prix doit être un nombre positif'
    });
  }
  
  const productData = {
    name: name.trim(),
    price: parseFloat(price),
    category_id: category_id || null
  };
  
  Product.update(productId, productData, (err, updatedProduct) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du produit:', err);
      
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          success: false,
          message: 'La catégorie spécifiée n\'existe pas'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du produit',
        error: err.message
      });
    }
    
    res.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: updatedProduct
    });
  });
});

// DELETE /api/products/:id - Supprimer un produit
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  
  Product.delete(productId, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du produit:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du produit',
        error: err.message
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  });
});

module.exports = router; 