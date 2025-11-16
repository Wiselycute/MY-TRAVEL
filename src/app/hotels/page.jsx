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
        <p className="text-primary mb-2">{hotel.location}</p>
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


// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Search, MapPin } from "lucide-react";
// import HotelCard from "@/components/hotel/HotelCard";
// import HotelHero from "@/components/hotel/HotelHero";
// import dynamic from "next/dynamic";

// // dynamic import of leaflet map to avoid SSR issues
// const MapView = dynamic(() => import("@/components/hotel/HotelsMap"), { ssr: false });

// export default function HotelsPage() {
//   const [hotels, setHotels] = useState([]);
//   const [visible, setVisible] = useState([]); // hotels currently visible (for pagination)
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState({ location: "", checkIn: null, checkOut: null, guests: 1 });
//   const [sortBy, setSortBy] = useState("relevance"); // relevance | price_asc | price_desc | rating | location
//   const [page, setPage] = useState(1);
//   const perPage = 9;
//   const [showMap, setShowMap] = useState(false);
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("/api/hotels");
//         const data = res.data?.data || res.data || [];
//         setHotels(data);
//       } catch (err) {
//         console.error("Failed loading hotels:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHotels();
//   }, []);

//   // search & sort applied to full hotels list
//   const filtered = hotels.filter((h) => {
//     const term = (query.location || "").toLowerCase().trim();
//     if (!term) return true;
//     return (
//       (h.hotel_name || "").toLowerCase().includes(term) ||
//       (h.location || "").toLowerCase().includes(term)
//     );
//   });

//   const sorted = filtered.slice().sort((a, b) => {
//     if (sortBy === "price_asc") return (a.price_per_night || 0) - (b.price_per_night || 0);
//     if (sortBy === "price_desc") return (b.price_per_night || 0) - (a.price_per_night || 0);
//     if (sortBy === "rating") return (b.star_rating || 0) - (a.star_rating || 0);
//     if (sortBy === "location") return (a.location || "").localeCompare(b.location || "");
//     // relevance (default) -> preserve order
//     return 0;
//   });

//   // set visible slice by page
//   useEffect(() => {
//     const start = 0;
//     const end = page * perPage;
//     setVisible(sorted.slice(start, end));
//   }, [sorted, page]);

//   // infinite scroll: when loaderRef visible => increase page
//   useEffect(() => {
//     if (!loaderRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setPage((p) => p + 1);
//           }
//         });
//       },
//       { root: null, rootMargin: "200px", threshold: 0.2 }
//     );
//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [loaderRef, sorted]);

//   const handleSearch = (filters) => {
//     setQuery(filters);
//     setPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <HotelHero onSearch={handleSearch} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div>
//             <h2 className="text-3xl font-bold text-primary">Explore Hotels</h2>
//             <p className="text-sm text-gray-500 mt-1">{sorted.length} results</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               value={sortBy}
//               onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
//               className="p-2 rounded-lg border bg-white dark:bg-gray-900"
//             >
//               <option value="relevance">Relevance</option>
//               <option value="price_asc">Price: Low → High</option>
//               <option value="price_desc">Price: High → Low</option>
//               <option value="rating">Rating</option>
//               <option value="location">Location</option>
//             </select>

//             <button
//               onClick={() => setShowMap((s) => !s)}
//               className="flex items-center gap-2 py-2 px-3 rounded-lg border bg-white dark:bg-gray-900"
//             >
//               <MapPin className="w-4 h-4" /> {showMap ? "Hide Map" : "Show Map"}
//             </button>
//           </div>
//         </div>

//         {showMap && <MapView hotels={visible} />}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {visible.map((hotel) => (
//             <HotelCard key={hotel._id} hotel={hotel} />
//           ))}
//         </div>

//         {/* loader for infinite scroll */}
//         <div ref={loaderRef} className="h-8 flex items-center justify-center mt-8">
//           {visible.length < sorted.length ? (
//             <button onClick={() => setPage((p) => p + 1)} className="py-2 px-4 rounded-md bg-orange-500 text-white">
//               Load more
//             </button>
//           ) : (
//             <p className="text-sm text-gray-400">No more results</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
