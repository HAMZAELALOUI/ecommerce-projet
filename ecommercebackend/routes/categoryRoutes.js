const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - Récupérer toutes les catégories
router.get('/', (req, res) => {
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
});

// GET /api/categories/:id - Récupérer une catégorie par ID
router.get('/:id', (req, res) => {
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
});

// POST /api/categories - Créer une nouvelle catégorie
router.post('/', (req, res) => {
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
});

// PUT /api/categories/:id - Mettre à jour une catégorie
router.put('/:id', (req, res) => {
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
});

// DELETE /api/categories/:id - Supprimer une catégorie
router.delete('/:id', (req, res) => {
  const categoryId = req.params.id;
  
  Category.delete(categoryId, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de la catégorie',
        error: err.message
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Catégorie supprimée avec succès'
    });
  });
});

module.exports = router; 