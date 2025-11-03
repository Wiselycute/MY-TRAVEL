"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PaymentModal({ booking, onClose, onPaymentSuccess }) {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Create payment
      const res = await axios.post("/api/payments", {
        booking_id: booking._id,
        user_id: booking.user_id,
        amount: booking.total_amount,
        payment_method: method,
      });

      // Update booking status to paid
      await axios.put(`/api/bookings/${booking._id}`, { 
        status: "paid" 
      });

      toast.success("Payment successful!");
      
      // Notify parent component to update UI
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      onClose();
    } catch (err) {
      toast.error("Payment failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Proceed with Payment</h2>

        <label className="block mb-2 font-medium">Select Payment Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 bg-transparent"
        >
          <option value="card">Card</option>
          <option value="paypal">PayPal</option>
          <option value="mobile_money">Mobile Money</option>
        </select>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} text-white py-2 rounded-lg mb-3`}
        >
          {loading ? 'Processing...' : `Pay ${booking.total_amount} USD`}
        </button>
        <button onClick={onClose} className="w-full py-2 text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  );
}
