"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PaymentModal from './../payment/PaymentModal';

export default function BookingModal({ room, onClose, onBookingUpdate }) {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  
  const handlePaymentSuccess = () => {
    // Update local booking state
    setBooking(prev => ({
      ...prev,
      status: "paid"
    }));
    
    // Notify parent component to update bookings list if needed
    if (onBookingUpdate) {
      onBookingUpdate();
    }
  };

  const getStoredUserId = () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // result.data from authentication may be { message, user: { id, ... } }
      const userObj = parsed.user || parsed;
      return userObj?.id || userObj?._id || null;
    } catch (e) {
      console.error('Failed to parse stored user:', e);
      return null;
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      const userId = getStoredUserId();
      if (!userId) {
        toast.error('You must be signed in to make a booking');
        setLoading(false);
        return;
      }

      const bookingData = {
        user_id: userId,
        booking_type: "hotel",
        total_amount: room.price,
        status: "pending",
      };

      const res = await axios.post("/api/bookings", bookingData);
      // API returns booking object in res.data
      setBooking(res.data);
      toast.success("Booking created successfully!");
    } catch (err) {
      toast.error("Booking failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking) return onClose();
    try {
      // If booking is already paid, delete both booking and payment
      if (booking.status === "paid") {
        // Delete associated payment first
        const payments = await axios.get("/api/payments");
        const bookingPayment = payments.data.find(p => p.booking_id === booking._id);
        if (bookingPayment) {
          await axios.delete(`/api/payments/${bookingPayment._id}`);
        }
      }
      
      // Delete the booking
      await axios.delete(`/api/bookings/${booking._id}`);
      toast.success("Booking deleted successfully");
      if (onBookingUpdate) {
        onBookingUpdate(); // Update the parent component's booking list
      }
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

        {!booking ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">
              Book {room.room_type} Room
            </h2>
            <p className="mb-4 text-gray-500 dark:text-gray-300 text-center">
              Price: <span className="text-orange-400 font-semibold">${room.price}</span> / night
            </p>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center text-orange-400">
              {booking.status === "paid" ? "Payment Complete!" : "Booking Confirmed!"}
            </h2>
            {booking.status === "paid" ? (
              <div className="text-center">
                <p className="mb-4">Thank you for your payment!</p>
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 font-semibold">✅ Paid</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
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
                    <span>🗑️</span> Delete Booking
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {showPayment && booking && (
        <PaymentModal
          booking={booking}
          onClose={() => {
            setShowPayment(false);
            // Refresh booking data after payment
            setBooking(prev => ({
              ...prev,
              status: "paid"
            }));
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
