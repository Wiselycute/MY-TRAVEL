"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import RoomCard from "./../../../components/hotel/RoomCard";

export default function HotelDetailsPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!id) return;

    // Fetch hotel details
    axios
      .get(`/api/hotels/${id}`)
      .then((res) => setHotel(res.data.data || res.data))
      .catch((err) => console.error("Error fetching hotel:", err));

    // Fetch rooms for this hotel
    axios
      .get("/api/rooms")
      .then((res) => {
        const filteredRooms = res.data.filter((room) => room.hotel_id === id);
        setRooms(filteredRooms);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [id]);

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-200">
        Loading hotel details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Hotel Banner Image */}
        <img
          src={hotel.image}
          alt={hotel.hotel_name}
          className="w-full h-96 object-cover"
        />

        {/* Hotel Info Section */}
        <div className="p-8">
          {/* Header: Name & Rating */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {hotel.hotel_name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mt-3 md:mt-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(hotel.star_rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {hotel.star_rating?.toFixed(1) || "4.0"}
              </span>
            </div>
          </div>

          {/* Location */}
          <p className="text-orange-500 font-medium mb-2">{hotel.location}</p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {hotel.description}
          </p>

          {/* Price */}
          <p className="text-xl font-semibold text-orange-500 mb-6">
            ${hotel.price_per_night} / night
          </p>

          {/* CTA */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full font-semibold transition-all mb-10">
            Book Now
          </button>

          {/* Available Rooms */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Rooms
          </h2>

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No available rooms at the moment.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
