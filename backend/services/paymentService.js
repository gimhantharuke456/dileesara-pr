const Payment = require("../models/Payment");

class PaymentService {
  async createPayment(paymentData) {
    return await Payment.create(paymentData);
  }

  async getAllPayments() {
    return await Payment.find();
  }

  async getPaymentById(id) {
    return await Payment.findById(id);
  }

  async updatePayment(id, paymentData) {
    return await Payment.findByIdAndUpdate(id, paymentData, { new: true });
  }

  async deletePayment(id) {
    return await Payment.findByIdAndDelete(id);
  }
}

module.exports = new PaymentService();
