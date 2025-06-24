const Category = require('../models/Category');
const Product = require('../models/Product');

// Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    Category.getAll((err, categories) => {
      if (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la récupération des catégories',
          error: err.message
        });
      }
      res.json({
        success: true,
        data: categories
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

// Récupérer une catégorie par ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    Category.getById(categoryId, (err, category) => {
      if (err) {
        console.error('Erreur lors de la récupération de la catégorie:', err);
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la récupération de la catégorie',
          error: err.message
        });
      }
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Catégorie non trouvée'
        });
      }
      
      res.json({
        success: true,
        data: category
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

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Validation des données
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le nom de la catégorie est requis'
      });
    }
    
    const categoryData = {
      name: name.trim()
    };
    
    Category.create(categoryData, (err, newCategory) => {
      if (err) {
        console.error('Erreur lors de la création de la catégorie:', err);
        
        // Gestion des erreurs MySQL spécifiques
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            success: false,
            message: 'Une catégorie avec ce nom existe déjà'
          });
        }
        
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la création de la catégorie',
          error: err.message
        });
      }
      
      res.status(201).json({
        success: true,
        message: 'Catégorie créée avec succès',
        data: newCategory
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

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    
    // Validation des données
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le nom de la catégorie est requis'
      });
    }
    
    const categoryData = {
      name: name.trim()
    };
    
    Category.update(categoryId, categoryData, (err, updatedCategory) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de la catégorie:', err);
        
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            success: false,
            message: 'Une catégorie avec ce nom existe déjà'
          });
        }
        
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la mise à jour de la catégorie',
          error: err.message
        });
      }
      
      res.json({
        success: true,
        message: 'Catégorie mise à jour avec succès',
        data: updatedCategory
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

// Supprimer une catégorie (et tous les produits liés)
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // Supprimer d'abord les produits liés
    Product.deleteByCategory(categoryId, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la suppression des produits liés',
          error: err.message
        });
      }
      
      // Puis supprimer la catégorie
      Category.delete(categoryId, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression de la catégorie',
            error: err.message
          });
        }
        
        res.json({
          success: true,
          message: 'Catégorie et produits liés supprimés'
        });
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
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}; 