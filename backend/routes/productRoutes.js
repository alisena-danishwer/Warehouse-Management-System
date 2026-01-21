const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// 1. Get All (Anyone logged in)
router.get('/', verifyToken, productController.getAllProducts);

// 2. Create (Admin Only)
router.post('/', verifyToken, verifyRole(['Admin', 'Manager']), productController.createProduct);

// 3. Update (Admin Only) - NEW
router.put('/:id', verifyToken, verifyRole(['Admin', 'Manager']), productController.updateProduct);

// 4. Delete (Admin Only) - NEW
router.delete('/:id', verifyToken, verifyRole(['Admin', 'Manager']), productController.deleteProduct);

module.exports = router;