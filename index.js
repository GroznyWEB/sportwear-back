require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Настройка кэширования для статических файлов
app.use("/images", express.static(path.resolve(__dirname, "images"), {
  maxAge: "7d", // Кэшировать на 7 дней
  setHeaders: (res, path) => {
    if (path.endsWith(".webp")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }
}));

app.use(require("./routes/products.route"));

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('ok'))
  .catch(() => console.log('error'));

app.listen(PORT, () => console.log("Сервер запущен!"));