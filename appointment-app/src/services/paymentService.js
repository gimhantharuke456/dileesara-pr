// services/paymentService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/payments";

class PaymentService {
  async createPayment(paymentData) {
    const response = await axios.post(API_URL, paymentData);
    return response.data;
  }

  async getAllPayments() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getPaymentById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async updatePayment(id, paymentData) {
    const response = await axios.put(`${API_URL}/${id}`, paymentData);
    return response.data;
  }

  async deletePayment(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
}

export default new PaymentService();
