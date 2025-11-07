"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "./../bookings/BookingModal";

export default function RoomCard({ room }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl backdrop-blur-sm"
    >
      {/* Room Info */}
      <img
        src={room.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"}
        alt={room.room_type}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{room.room_type} Room</h3>
      <p className="text-orange-400 font-medium mb-1">${room.price} / night</p>
      <p className="text-sm opacity-80 mb-4">Capacity: {room.capacity} people</p>

      {/* Book Button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all"
      >
        Book This Room
      </button>

      {/* Modal */}
      {open && (
        <BookingModal
          item={room}
          type="hotel"
          onClose={() => setOpen(false)}
          onBookingUpdate={() => {}}
        />
      )}
    </motion.div>
  );
}
