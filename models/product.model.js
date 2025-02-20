const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    size: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const ProductSchema = new mongoose.Schema({
    image: [String],
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories',
        required: true
    },
    sizes: [sizeSchema] 
});

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;
