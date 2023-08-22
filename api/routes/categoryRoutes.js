const express = require('express');
const {getAllCategories,getCategoryById,createCategory, deleteCategory} = require('../controllers/categoryController');

const router = express.Router();

// Rutas para categorías
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
