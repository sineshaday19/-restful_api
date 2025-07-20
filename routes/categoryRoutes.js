const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validateCategory = require('../middlewares/validateCategory');

// Create category
router.post('/', validateCategory, categoryController.createCategory);
// Get all categories
router.get('/', categoryController.getCategories);
// Get single category
router.get('/:id', categoryController.getCategoryById);
// Update category
router.put('/:id', validateCategory, categoryController.updateCategory);
// Delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; 