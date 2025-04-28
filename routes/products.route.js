const { Router } = require('express');
const { productsController } = require('../controllers/products.controller');

const router = Router();

router.get('/product', productsController.getProducts); 
router.get('/product/:id', productsController.getProductById);
router.post('/product', productsController.addProducts); 
router.delete('/product/:id', productsController.deleteProducts); 

module.exports = router;
