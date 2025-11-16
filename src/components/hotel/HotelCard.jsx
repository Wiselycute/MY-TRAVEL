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
        <p className="text-lg text-primary font-semibold">${hotel.price_per_night} / night</p>
        <Link href={`/hotels/${hotel._id}`}>
          <button className="mt-4 w-full py-2 bg-[#FFA500] hover:bg-orange-600 text-white rounded-lg font-medium">
            Book Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
// "use client";
// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function HotelCard({ hotel }) {
//   return (
//     <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
//       <Link href={`/hotels/${hotel._id}`}>
//         <div className="w-full h-48 overflow-hidden">
//           <img src={hotel.image || "/hotel-placeholder.jpg"} alt={hotel.hotel_name} className="w-full h-full object-cover" />
//         </div>
//       </Link>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{hotel.hotel_name}</h3>
//         <p className="text-sm text-gray-400">{hotel.location}</p>
//         <div className="flex items-center justify-between mt-3">
//           <p className="font-bold text-orange-400">${hotel.price_per_night || "—"} / night</p>
//           <Link href={`/hotels/${hotel._id}`} className="px-3 py-1 bg-orange-500 text-white rounded-lg">Book</Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
