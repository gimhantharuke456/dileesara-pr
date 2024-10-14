import React, { useState, useEffect } from "react";
import paymentService from "../services/paymentService";
import CreatePayment from "./CreatePayment";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await paymentService.getAllPayments();
      setPayments(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to fetch payments.");
      setIsLoading(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await paymentService.deletePayment(id);
        setPayments(payments.filter((payment) => payment._id !== id));
      } catch (error) {
        console.error("Error deleting payment:", error);
        setError("Failed to delete the payment.");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPayment = await paymentService.updatePayment(
        editingPayment._id,
        editingPayment
      );
      setPayments(
        payments.map((payment) =>
          payment._id === updatedPayment._id ? updatedPayment : payment
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating payment:", error);
      setError("Failed to update the payment.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading payments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>
      <CreatePayment onPaymentCreated={paymentService.createPayment} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{payment.reason}</td>
                <td className="px-4 py-2">{payment.service}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(payment)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(payment._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Payment</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block mb-1">
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={editingPayment.amount}
                    onChange={(e) =>
                      setEditingPayment({
                        ...editingPayment,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block mb-1">
                    Reason
                  </label>
                  <input
                    id="reason"
                    type="text"
                    value={editingPayment.reason}
                    onChange={(e) =>
                      setEditingPayment({
                        ...editingPayment,
                        reason: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block mb-1">
                    Service
                  </label>
                  <input
                    id="service"
                    type="text"
                    value={editingPayment.service}
                    onChange={(e) =>
                      setEditingPayment({
                        ...editingPayment,
                        service: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
