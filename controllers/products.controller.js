const Products = require("../models/product.model");

module.exports.productsController = {
  // Получение всех продуктов
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      return res.json(products);
    } catch (e) {
      return res.status(500).json({ message: "Ошибка при загрузке продуктов", error: e.message });
    }
  },

  // Получение одного продукта по ID
  getProductById: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }
      return res.json(product);
    } catch (e) {
      return res.status(500).json({ message: "Ошибка при получении продукта", error: e.message });
    }
  },

  // Добавление нового продукта
  addProducts: async (req, res) => {
    const { image, name, price, description, brend, sizes } = req.body;

    if (!name || !price || !description || !brend) {
      return res.status(400).json({ message: "Не все обязательные поля заполнены" });
    }

    try {
      const product = await Products.create({
        image,
        name,
        description,
        price,
        brend,
        sizes,
      });

      return res.status(201).json(product);
    } catch (e) {
      return res.status(500).json({ message: "Ошибка при добавлении продукта", error: e.message });
    }
  },

  // Удаление продукта по ID
  deleteProducts: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteProduct = await Products.findByIdAndDelete(id);
      if (!deleteProduct) {
        return res.status(404).json({ message: "Продукт не найден" });
      }
      return res.json({ message: "Продукт успешно удален" });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка на сервере", error: e.message });
    }
  },
};
