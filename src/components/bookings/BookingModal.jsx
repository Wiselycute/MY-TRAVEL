"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PaymentModal from "../payment/PaymentModal";

export default function BookingModal({ room, onClose, onBookingUpdate }) {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // New states for nights & total calculation
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(room?.price);

  // Auto-update total when nights change
  useEffect(() => {
    setTotal(nights * room?.price);
  }, [nights, room?.price]);

  // Get logged-in user ID
  const getStoredUserId = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const userObj = parsed.user || parsed;
      return userObj?.id || userObj?._id || null;
    } catch {
      return null;
    }
  };

  // Create booking
  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      const userId = getStoredUserId();
      if (!userId) {
        toast.error("You must be signed in to make a booking");
        setLoading(false);
        return;
      }

      const bookingData = {
        user_id: userId,
        booking_type: "hotel",
        total_amount: total,
        nights,
        status: "pending",
      };

      const res = await axios.post("/api/bookings", bookingData);
      setBooking(res.data);
      toast.success("Booking created successfully!");
    } catch (err) {
      toast.error("Booking failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel + delete booking
  const handleCancelBooking = async () => {
    try {
      if (!booking) return onClose();

      // If booking was paid → delete payment first
      if (booking.status === "paid") {
        const payments = await axios.get("/api/payments");
        const paid = payments.data.find((p) => p.booking_id === booking._id);
        if (paid) await axios.delete(`/api/payments/${paid._id}`);
      }

      await axios.delete(`/api/bookings/${booking._id}`);
      toast.success("Booking deleted successfully!");

      if (onBookingUpdate) onBookingUpdate();
      onClose();
    } catch (err) {
      toast.error("Failed to delete booking!");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        {/* BEFORE BOOKING IS CREATED */}
        {!booking ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">
              Book {room?.room_type} Room
            </h2>

            <p className="text-center text-gray-500 dark:text-gray-300">
              Price:{" "}
              <span className="text-orange-500 font-semibold">
                ${room?.price}
              </span>{" "}
              per night
            </p>

            {/* Nights Selector */}
            <div className="mt-5 mb-4">
              <label className="block text-gray-600 dark:text-gray-300 mb-1">
                Number of Nights
              </label>
              <input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
              />
            </div>

            {/* Total */}
            <p className="text-center text-xl font-semibold">
              Total:{" "}
              <span className="text-orange-600">${total}</span>
            </p>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        ) : (
          <>
            {/* AFTER BOOKING IS CREATED */}
            <h2 className="text-xl font-semibold mb-4 text-center text-orange-400">
              {booking.status === "paid"
                ? "Payment Complete!"
                : "Booking Confirmed!"}
            </h2>

            {booking.status === "paid" ? (
              <div className="text-center">
                <p className="mb-4">Thank you for your payment!</p>

                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    ✅ Paid
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Amount: ${booking.total_amount}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-center mb-6">
                  Your booking is now pending payment. Choose an option below.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Proceed to Payment
                  </button>

                  <button
                    onClick={handleCancelBooking}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    🗑️ Delete Booking
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && booking && (
        <PaymentModal
          booking={booking}
          onClose={() => {
            setShowPayment(false);
            setBooking((prev) => ({
              ...prev,
              status: "paid",
            }));
          }}
          onPaymentSuccess={() => {
            setBooking((prev) => ({
              ...prev,
              status: "paid",
            }));
            if (onBookingUpdate) onBookingUpdate();
          }}
        />
      )}
    </div>
  );
}

