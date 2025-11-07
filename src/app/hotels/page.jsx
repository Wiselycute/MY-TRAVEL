"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HotelCard from './../../components/hotel/HotelCard';
import HotelHero from "@/components/hotel/HotelHero";

export default function HotelsPage() {
 const { id } = useParams();
  const router = useRouter();

  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  // Fetch all hotels or one hotel + rooms based on URL
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/hotels/${id}`)
        .then((res) => setHotel(res.data.data))
        .catch((err) => console.error("Hotel fetch failed:", err));

      axios
        .get("/api/rooms")
        .then((res) =>
          setRooms(res.data.filter((room) => room.hotel_id === id))
        )
        .catch((err) => console.error("Room fetch failed:", err));
    } else {
      axios
        .get("/api/hotels")
        .then((res) => setHotels(res.data))
        .catch((err) => console.error("Hotels fetch failed:", err));
    }
  }, [id]);

  // 🏨 If no hotel is selected → show Hotels List page
  if (!id) {
    return (
      <>
        <HotelHero />
        <div className="min-h-screen bg-background p-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12"
          >
            🏨 Explore Luxury Hotels
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                onClick={() => router.push(`/hotels/${hotel._id}`)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // 🏠 If hotel is selected → show Hotel Details + Rooms
  if (!hotel)
    // return <div className="text-center p-10 text-white">Loading...</div>;
    return (
       
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
       
      );

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
      >
        <img
          src={hotel.image}
          alt={hotel.hotel_name}
          className="w-full h-80 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-4xl font-bold mb-3">{hotel.hotel_name}</h1>
        <p className="text-orange-300 mb-2">{hotel.location}</p>
        <p className="text-lg mb-4 opacity-80">{hotel.description}</p>
        <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
