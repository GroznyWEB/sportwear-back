const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    size: { type: String, required: true }
});

const ProductSchema = new mongoose.Schema({
    images: [String],
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    sizes: [sizeSchema] 
});

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;




