const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendFeedbackMail(feedback) {
    try {
      await this.transporter.sendMail({
        from: `"Магазин" <${process.env.SMTP_USER}>`,
        to: 'qatarhab@mail.ru',
        subject: `Новая заявка на консультацию`,
        html: `
          <h2>Новая заявка на консультацию</h2>
          <p><strong>Дата:</strong> ${feedback.date}</p>
          <p><strong>Имя:</strong> ${feedback.name}</p>
          <p><strong>Телефон:</strong> ${feedback.phone}</p>
          <p><strong>Тип запроса:</strong> ${feedback.type}</p>
        `
      });

      return true;
    } catch (e) {
      console.error('Ошибка при отправке письма:', e);
      throw e;
    }
  }

  async sendOrderMail(order) {
    try {
      console.log(order)
      // Формируем таблицу с товарами
      const productsTable = order.order.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.size || '-'}</td>
          <td>${item.amount}</td>
          <td>${item.price} р.</td>
          <td>${item.total} р.</td>
        </tr>
      `).join('');

      await this.transporter.sendMail({
        from: `"Магазин" <${process.env.SMTP_USER}>`,
        to: 'qatarhab@mail.ru',
        subject: `Новый заказ №${order.orderNumber}`,
        html: `
          <h2>Детали заказа №${order.orderNumber}</h2>
          <p><strong>Дата:</strong> ${order.createdAt.toLocaleString()}</p>
          <p><strong>Имя:</strong> ${order.name}</p>
          <p><strong>Телефон:</strong> ${order.phone}</p>
          
          <h3>Состав заказа:</h3>
          <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th>Название</th>
                <th>Размер</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              ${productsTable}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="text-align: right;"><strong>Итого:</strong></td>
                <td><strong>${order.total} р.</strong></td>
              </tr>
            </tfoot>
          </table>
        `
      });

      return order.orderNumber; // Возвращаем номер заказа клиенту
    } catch (e) {
      console.error('Ошибка при отправке письма:', e);
      throw e;
    }
  }
}

module.exports = new MailService();