const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    size: { type: String, required: true }
});

const ProductSchema = new mongoose.Schema({
    image: [String],
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brend: { type: String },
    sizes: [sizeSchema] 
});

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;




