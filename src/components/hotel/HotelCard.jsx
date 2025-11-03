"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HotelCard({ hotel }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-all"
    >
      <img 
        src={hotel.image || "/hotel-placeholder.jpg"} 
        alt={hotel.hotel_name} 
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-2">{hotel.hotel_name}</h2>
        <p className="text-sm opacity-80 mb-2">{hotel.location}</p>
        <p className="text-lg text-orange-400 font-semibold">${hotel.price_per_night} / night</p>
        <Link href={`/hotels/${hotel._id}`}>
          <button className="mt-4 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium">
            Book Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
