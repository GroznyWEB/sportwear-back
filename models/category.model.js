const mongoose = require("mongoose")

const categoriesSchema = mongoose.Schema({
    text: String,
})

const Categories = mongoose.model("Categories", categoriesSchema)

module.exports = Categories