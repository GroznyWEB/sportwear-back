const { Router } = require('express');
const { productsController } = require('../controllers/products.controller');
const { ordersController } = require('../controllers/orders.controller');

const router = Router();
// Устанавливаем кэш на 5 минут (в миллисекундах)


router.get('/products', productsController.getProducts); 
router.get('/product/:id', productsController.getProductById);
router.post('/product', productsController.addProducts); 
router.delete('/product/:id', productsController.deleteProducts); 

router.post('/create-order', ordersController.createOrder)
router.post('/send-feedback', ordersController.sendFeedback)


module.exports = router;
