const PaymentService = require("../services/paymentService");

class PaymentController {
  async createPayment(req, res) {
    try {
      const payment = await PaymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const payments = await PaymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      if (!payment)
        return res.status(404).json({ message: "Payment not found" });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePayment(req, res) {
    try {
      const payment = await PaymentService.updatePayment(
        req.params.id,
        req.body
      );
      if (!payment)
        return res.status(404).json({ message: "Payment not found" });
      res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const payment = await PaymentService.deletePayment(req.params.id);
      if (!payment)
        return res.status(404).json({ message: "Payment not found" });
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PaymentController();
