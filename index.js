require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

// Настройка кэширования для статических файлов
app.use("/images", express.static(path.resolve(__dirname, "images"), {
  maxAge: "7d", // Кэшировать на 7 дней
  setHeaders: (res, path) => {
    if (path.endsWith(".webp")) {
      // Для .webp можно установить более агрессивное кэширование
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }
}));

app.use(require("./routes/products.route"));

mongoose.connect("mongodb+srv://Khalid:1234abcd@khalid.9spd7ka.mongodb.net/Back-bjj")
  .then(() => console.log('ok'))
  .catch(() => console.log('error'));

app.listen(4000, () => console.log("Сервер запущен!"));