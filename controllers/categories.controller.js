const Categories = require("../models/category.model")

module.exports.categoriesController = {
    createCategories: async (req,res) => {
        try {
            const data = await Categories.create({
                text:req.body.text
            })
            return res.json(data)
        } catch (error) {
            return res.status(401).json(error.message)
        }
    },
    deleteCategories: async(req,res) => {
        try {
            const data = await Categories.findByIdAndDelete(req.params.id)
            return res.json(data)
        } catch (error) {
            return res.status(401).json(error.message)
        }
    },
    deleteAll: async(req,res) => {
        try {
            await Categories.deleteMany()
           return res.json("Удалены")
        } catch (error) {
            return res.status(401).json(error.message)
        }
    },
    getAllCategories: async(req,res) => {
        try {
            const data = await Categories.find()
            return res.json(data)
        } catch (error) {
            return res.status(401).json(error.message)
        }
    },
  
}