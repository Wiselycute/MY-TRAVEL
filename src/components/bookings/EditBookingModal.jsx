"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditBookingModal({ booking, onClose, onUpdate }) {
  const [days, setDays] = useState(
    booking.car_details?.number_of_days ||
      booking.hotel_details?.number_of_nights ||
      1
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateField =
        booking.booking_type === "car"
          ? { "car_details.number_of_days": days }
          : booking.booking_type === "hotel"
          ? { "hotel_details.number_of_nights": days }
          : {};
      const res = await axios.put(`/api/bookings/${booking._id}`, updateField);
      if (res.data.success) {
        toast.success("Booking updated!");
        onUpdate();
        onClose();
      } else {
        toast.error("Failed to update booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-orange-500">
          Edit {booking.booking_type} Booking
        </h2>
        <label className="block text-gray-600 mb-2">
          {booking.booking_type === "car"
            ? "Number of Days"
            : booking.booking_type === "hotel"
            ? "Number of Nights"
            : "Modify Booking"}
        </label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
