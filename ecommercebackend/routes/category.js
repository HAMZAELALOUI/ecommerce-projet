const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category');

// GET /api/categories - Récupérer toutes les catégories
router.get('/', getAllCategories);

// GET /api/categories/:id - Récupérer une catégorie par ID
router.get('/:id', getCategoryById);

// POST /api/categories - Créer une nouvelle catégorie
router.post('/', createCategory);

// PUT /api/categories/:id - Mettre à jour une catégorie
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Supprimer une catégorie
router.delete('/:id', deleteCategory);

module.exports = router; 