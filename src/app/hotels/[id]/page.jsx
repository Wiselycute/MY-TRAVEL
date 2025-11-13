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
        // API returns { success: true, data: [...] } — normalize
        const roomsData = res.data?.data || res.data || [];

        const filteredRooms = roomsData.filter((room) => {
          // room.hotel_id may be an ObjectId, an object with _id, or a string
          const roomHotelId = room?.hotel_id?._id || room?.hotel_id;
          return String(roomHotelId) === String(id);
        });

        setRooms(filteredRooms);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [id]);

  if (!hotel)
   
       return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Star, MapPin } from "lucide-react";
// import RoomCard from "@/components/hotel/RoomCard";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// export default function HotelDetailsPage() {
//   const { id } = useParams();
//   const [hotel, setHotel] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Default location (in case hotel lacks coordinates)
//   const defaultPosition = [3.848, 11.502];

//   // Fetch hotel + room data
//   useEffect(() => {
//     if (!id) return;

//     axios.get(`/api/hotels/${id}`).then((res) => {
//       setHotel(res.data.data || res.data);
//     });

//     axios.get("/api/rooms").then((res) => {
//       const data = res.data?.data || res.data || [];
//       const filtered = data.filter(
//         (r) => String(r.hotel_id?._id || r.hotel_id) === String(id)
//       );
//       setRooms(filtered);
//     });
//   }, [id]);

//   // Calculate total price
//   useEffect(() => {
//     if (checkIn && checkOut && hotel?.price_per_night) {
//       const diff = Math.ceil(
//         (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
//       );
//       setTotalPrice(diff * hotel.price_per_night);
//     }
//   }, [checkIn, checkOut, hotel]);

//   if (!hotel)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );

//   // Custom marker icon
//   const markerIcon = new L.Icon({
//     iconUrl: "/marker-icon.png", // You can use your custom pin here
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {/* Image Banner */}
//         <img
//           src={hotel.image}
//           alt={hotel.hotel_name}
//           className="w-full h-96 object-cover"
//         />

//         {/* Hotel Info */}
//         <div className="p-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//               {hotel.hotel_name}
//             </h1>
//             <div className="flex items-center gap-1 mt-2 md:mt-0">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-5 h-5 ${
//                     i < Math.round(hotel.star_rating || 4)
//                       ? "text-yellow-400 fill-yellow-400"
//                       : "text-gray-300 dark:text-gray-600"
//                   }`}
//                 />
//               ))}
//               <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
//                 {hotel.star_rating?.toFixed(1) || "4.0"}
//               </span>
//             </div>
//           </div>

//           <p className="text-orange-500 font-medium mb-2 flex items-center gap-1">
//             <MapPin className="w-4 h-4" /> {hotel.location}
//           </p>
//           <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//             {hotel.description}
//           </p>

//           <p className="text-xl font-semibold text-orange-500 mb-6">
//             ${hotel.price_per_night} / night
//           </p>

//           {/* Booking Section */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl mb-8">
//             <h3 className="text-lg font-semibold mb-3">Book your stay</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">Check-in</label>
//                 <input
//                   type="date"
//                   value={checkIn}
//                   onChange={(e) => setCheckIn(e.target.value)}
//                   className="border p-2 rounded-md w-full bg-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Check-out</label>
//                 <input
//                   type="date"
//                   value={checkOut}
//                   onChange={(e) => setCheckOut(e.target.value)}
//                   className="border p-2 rounded-md w-full bg-transparent"
//                 />
//               </div>
//             </div>

//             {totalPrice > 0 && (
//               <p className="mt-4 text-lg font-semibold text-center text-gray-900 dark:text-white">
//                 Total Price: <span className="text-orange-500">${totalPrice}</span>
//               </p>
//             )}

//             <button
//               onClick={() =>
//                 alert(`Booked ${hotel.hotel_name} for $${totalPrice}`)
//               }
//               disabled={!checkIn || !checkOut}
//               className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md disabled:opacity-50"
//             >
//               Confirm Booking
//             </button>
//           </div>

//           {/* Leaflet Map */}
//           <div className="mb-10">
//             <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
//               <MapPin className="w-5 h-5" /> Location
//             </h2>
//             <div className="h-[400px] rounded-xl overflow-hidden">
//               <MapContainer
//                 center={[
//                   hotel.latitude || defaultPosition[0],
//                   hotel.longitude || defaultPosition[1],
//                 ]}
//                 zoom={13}
//                 style={{ width: "100%", height: "100%" }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                 />
//                 <Marker
//                   position={[
//                     hotel.latitude || defaultPosition[0],
//                     hotel.longitude || defaultPosition[1],
//                   ]}
//                   icon={markerIcon}
//                 >
//                   <Popup>{hotel.hotel_name}</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           </div>

//           {/* Rooms Section */}
//           <h2 className="text-2xl font-bold mb-5">Available Rooms</h2>
//           {rooms.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {rooms.map((room) => (
//                 <motion.div
//                   key={room._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   <RoomCard room={room} />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No available rooms at the moment.</p>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Star, MapPin } from "lucide-react";
// import RoomCard from "@/components/hotel/RoomCard";

// //  dynamically import leaflet map (no SSR)
// const HotelDetailsMap = dynamic(() => import("@/components/hotel/HotelDetailsMap"), {
//   ssr: false,
// });

// export default function HotelDetailsPage() {
//   const { id } = useParams();
//   const [hotel, setHotel] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     if (!id) return;
//     axios.get(`/api/hotels/${id}`).then((res) => setHotel(res.data.data || res.data));
//     axios.get("/api/rooms").then((res) => {
//       const all = res.data?.data || res.data || [];
//       setRooms(all.filter((r) => String(r.hotel_id?._id || r.hotel_id) === String(id)));
//     });
//   }, [id]);

//   useEffect(() => {
//     if (checkIn && checkOut && hotel?.price_per_night) {
//       const diff =
//         Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 0;
//       setTotalPrice(diff * hotel.price_per_night);
//     }
//   }, [checkIn, checkOut, hotel]);

//   if (!hotel)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {/* Hotel Info and Booking UI */}

//         {/* ✅ Map Section */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
//             <MapPin className="w-5 h-5" /> Location
//           </h2>
//           <HotelDetailsMap
//             latitude={hotel.latitude}
//             longitude={hotel.longitude}
//             name={hotel.hotel_name}
//           />
//         </div>

//         {/* Rooms Section */}
//       </motion.div>
//     </div>
//   );
// }
