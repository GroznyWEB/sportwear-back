const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  order: [{ name: String, size: String, price: Number, amount: Number, total: Number }],
  total: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

// Генерация номера заказа перед сохранением
orderSchema.pre('save', async function(next) {
    if (!this.orderNumber) {
      const count = await this.constructor.countDocuments();
      this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
    }
    next();
  });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
