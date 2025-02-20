const {Router} = require("express")
//const authMiddleware = require("../middleware/auth.middleware")
const { categoriesController } = require("../controllers/categories.controller")
const router = Router()

router.post('/categories', categoriesController.createCategories)
router.delete('/categories/:id', categoriesController.deleteCategories)
router.get('/categories', categoriesController.getAllCategories)

router.delete('deleteAllCategories', categoriesController.deleteCategories)
module.exports = router