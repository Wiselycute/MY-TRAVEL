"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function HotelHero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    onSearch?.({ location, checkIn, checkOut, guests });
  };

  return (
    <section
      className="relative bg-background rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative px-6 py-16 md:px-12 md:py-20 text-center md:text-left space-y-8 z-10">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg"
        >
          Enjoy your <span className="text-orange-300">Dream Vacation</span>
        </motion.h1>
        <p className="text-sm md:text-lg text-gray-100 max-w-lg mx-auto md:mx-0">
          Book Hotels, Flights, and Stay packages at the lowest prices — all in
          one place.
        </p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 rounded-2xl shadow-xl p-4 flex flex-col md:flex-row items-center gap-4"
        >
          {/* Location Dropdown */}
          <div className="flex-1">
            <label className="text-sm font-medium">Location</label>
            <input
  list="locations"
  placeholder="Enter destination"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 focus:outline-none focus:border-orange-500 p-2 placeholder-gray-400"
/>
<datalist id="locations">
  <option className="bg-background" value="Dubai" />
  <option className="bg-background" value="Paris" />
  <option className="bg-background" value="New York" />
  <option className="bg-background" value="Cape Town" />
  <option className="bg-background" value="Tokyo" />
  <option className="bg-background" value="Rome" />
  <option className="bg-background" value="Lagos" />
</datalist>

          </div>

          {/* Check-in */}
          <div className="flex-1">
            <label className="text-sm font-medium">Check In</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 focus:border-orange-500 p-2 outline-none"
            />
          </div>

          {/* Check-out */}
          <div className="flex-1">
            <label className="text-sm font-medium">Check Out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Add date"
              className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 focus:border-orange-500 p-2 outline-none"
            />
          </div>

          {/* Guests */}
          <div className="flex-1">
            <label className="text-sm font-medium">Guests</label>
            <select
              className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 focus:border-orange-500 p-2"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option className="bg-background" key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 mt-2 md:mt-6 transition-all shadow-lg"
          >
            <Search className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

// export default function HotelHero({ onSearch }) {
//   const [location, setLocation] = useState("");
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [guests, setGuests] = useState(1);

//   const handleSearch = () => {
//     onSearch?.({ location, checkIn, checkOut, guests });
//   };

//   return (
//     <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/hero-hotel.jpg')" }}>
//       <div className="bg-black/40 py-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
//           <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-4xl font-bold mb-2">
//             Enjoy your <span className="text-orange-300">Dream Vacation</span>
//           </motion.h1>
//           <p className="mb-6 text-gray-200 max-w-2xl">Find and book perfect stays — quick, simple, and secure.</p>

//           <div className="bg-white/90 dark:bg-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center">
//             <div className="flex-1">
//               <label className="text-xs text-gray-700">Location</label>
//               <input
//                 list="locations"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Enter destination"
//                 className="w-full p-2 rounded-md border"
//               />
//               <datalist id="locations">
//                 <option value="Dubai" />
//                 <option value="Paris" />
//                 <option value="New York" />
//                 <option value="Cape Town" />
//                 <option value="Tokyo" />
//                 <option value="Rome" />
//                 <option value="Lagos" />
//               </datalist>
//             </div>

//             <div className="flex-1">
//               <label className="text-xs text-gray-700">Check In</label>
//               <DatePicker selected={checkIn} onChange={(d) => setCheckIn(d)} minDate={new Date()} placeholderText="Check in" className="w-full p-2 rounded-md border" />
//             </div>

//             <div className="flex-1">
//               <label className="text-xs text-gray-700">Check Out</label>
//               <DatePicker selected={checkOut} onChange={(d) => setCheckOut(d)} minDate={checkIn || new Date()} placeholderText="Check out" className="w-full p-2 rounded-md border" />
//             </div>

//             <div className="w-40">
//               <label className="text-xs text-gray-700">Guests</label>
//               <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full p-2 rounded-md border">
//                 {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
//               </select>
//             </div>

//             <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
//               <Search /> Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
