
"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PaymentModal({ booking, onClose, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Retrieve user ID (fallback to booking.user_id)
      let userId = booking.user_id;
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("user");
          if (raw) {
            const parsed = JSON.parse(raw);
            const userObj = parsed.user || parsed;
            userId = userObj?._id || userObj?.id || userId;
          }
        } catch {
          // fallback to booking.user_id
        }
      }

      // 1️⃣ Create payment record
      const res = await axios.post("/api/payments", {
        booking_id: booking._id,
        user_id: userId,
        amount: booking.total_amount,
        payment_method: method,
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Payment failed!");
        return;
      }

      // 2️⃣ Update booking to 'paid'
      await axios.put(`/api/bookings/${booking._id}`, { status: "paid" });

      toast.success("✅ Payment successful!");
      onPaymentSuccess?.(res.data.data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-500">
          Complete Your Payment
        </h2>

        {/* Payment details */}
        <div className="mb-4 text-center">
          <p className="text-gray-500">
            Booking ID:{" "}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {booking._id?.slice(-6)}
            </span>
          </p>
          <p className="mt-2 text-lg font-semibold text-orange-500">
            Total Amount: ${booking.total_amount}
          </p>
        </div>

        {/* Payment method selection */}
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Select Payment Method:
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 bg-transparent dark:border-gray-700"
        >
          <option value="card">💳 Credit / Debit Card</option>
          <option value="mobile_money">📱 Mobile Money</option>
          <option value="paypal">🌐 PayPal</option>
        </select>

        {/* Buttons */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-600"
          } text-white py-2 rounded-lg font-semibold transition`}
        >
          {loading ? "Processing..." : `Pay $${booking.total_amount}`}
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 mt-3 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
