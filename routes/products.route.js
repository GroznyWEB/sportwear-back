const { Router } = require('express')
const { productsController } = require('../controllers/products.controller')

const router = Router()

router.get('/Product', productsController.getProducts)
router.post('/Product', productsController.addProducts)
router.delete('/Product',productsController.deleteProducts)



module.exports = router