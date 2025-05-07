const Order = require("../models/order.model");
const mailService = require("../services/mail.service");

module.exports.ordersController = {

  sendFeedback: async (req, res) => {
    try {
      const { name, phone } = req.body;
      
      await mailService.sendFeedbackMail({
        name,
        phone,
        type: "Консультация",
        date: new Date().toLocaleString()
      });
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending feedback:', error);
      res.status(500).json({ 
        success: false,
        message: 'Ошибка при отправке формы'
      });
    }
},

  createOrder: async (req, res) => {
    try {
      const { name, phone, order, total } = req.body;

      // Преобразуем корзину в формат для заказа
      const orderItems = order.map((item) => ({
        name: item.name,
        size: item.size,
        amount: item.amount,
        price: item.price,
        total: item.total,
      }));

      console.log('sqsqsq', req.body);

      const orderData = {
        name,
        phone,
        order: orderItems,
        total,
      };

      // Создаем новый заказ
      const data = new Order(orderData);
      await data.save();
      // Отправляем письмо и получаем номер заказа
      const orderNumber = await mailService.sendOrderMail(data);

      res.json({
        success: true,
        orderNumber,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Ошибка при оформлении заказа",
        error: e.message,
      });
    }
  },
};
