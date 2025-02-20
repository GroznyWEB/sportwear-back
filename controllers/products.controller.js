const Products = require("../models/product.model");

module.exports.productsController = {
  getProducts: async (req, res) => {
    try {
      const products  = await products.find().populate("categoryId");

      return res.json(products);
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },

  addProducts: async (req, res) => {
    const { image, name,  price, description, categoryId, } = req.body;

    try {
      const products = await Products.create({
        image,
        name,
        description,
        price,
        categoryId,
        
      });

      return res.json(products);
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },

  deleteProducts: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteProducts = await Products.findByIdAndDelete(id);
      if (!deleteProducts) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ message: "Product deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },



}  