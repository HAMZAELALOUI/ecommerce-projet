const Product = require('../models/Product');

// Récupérer tous les produits
const getAllProducts = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Récupérer un produit par ID
const getProductById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Récupérer les produits par catégorie
const getProductsByCategory = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Rechercher des produits
const searchProducts = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Créer un nouveau produit
const createProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
}; 