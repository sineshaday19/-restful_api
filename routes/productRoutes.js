const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

// Create product
router.post('/', validateProduct, productController.createProduct);
// Get all products (with search/filter)
router.get('/', productController.getProducts);
// Get single product
router.get('/:id', productController.getProductById);
// Update product
router.put('/:id', validateProduct, productController.updateProduct);
// Delete product
router.delete('/:id', productController.deleteProduct);
// Get low-stock products
router.get('/report/low-stock', productController.getLowStockProducts);

module.exports = router; 