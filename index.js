require("dotenv").config()
const cors = require("cors")
const path = require("path")

const mongoose = require("mongoose")
const express = require("express")

const app = express()


app.use(express.json())
app.use(cors())

app.use("/images", express.static(path.resolve(__dirname, "images")))

app.use(require("./routes/categories.route"))
app.use(require("./routes/products.route"))

mongoose.connect("mongodb+srv://Khalid:1234abcd@khalid.9spd7ka.mongodb.net/Back-bjj")
.then(() => console.log('ok'))
.catch(() => console.log('error'))

app.listen(4000, () => console.log("Сервер запущен!"))