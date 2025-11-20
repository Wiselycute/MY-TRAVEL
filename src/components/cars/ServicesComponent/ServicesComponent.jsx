// // "use client";

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Link from "next/link";
// // import Image from "next/image";

// // export default function CarsPage() {
// //   const [cars, setCars] = useState([]);

// //   useEffect(() => {
// //     const fetchCars = async () => {
// //       try {
// //         const res = await axios.get("/api/cars");
// //         setCars(res.data);
// //       } catch (error) {
// //         console.error("Error fetching cars:", error);
// //       }
// //     };
// //     fetchCars();
// //   }, []);

// //   return (
// //     <div className="max-w-7xl bg-backgroun mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //       <h1 className="text-4xl font-bold text-center mb-10 text-[#FFA500]">
// //         Available Cars
// //       </h1>

// //       {/* 4-column responsive grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
// //         {cars.map((car) => (
// //           <div
// //             key={car._id}
// //             className="bg-secondary rounded-2xl border border-secondary hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden "
// //           >
// //             <Link href={`/cars/${car._id}`}>
// //               <div className="relative w-full h-40">
// //                 <img
// //                   src={car.image || "/assets/images/default-car.jpg"}
// //                   alt={car.model}
// //                   fill
// //                   className="object-cover h-[150px] w-[300px]"
// //                 />
// //               </div>
// //             </Link>

// //             <div className="p-4">
// //               <h2 className="text-lg font-semibold text-primary truncate">
// //                 {car.model}
// //               </h2>
// //               <p className="text-sm text-gray-500">{car.category}</p>
// //               <p className="text-sm text-gray-600 mt-1">
// //                 Seats: {car.seats} | ${car.price_per_day}/day
// //               </p>

// //               <Link href={`/cars/${car._id}`}>
// //                 <button className="w-full mt-4 bg-[#FFA500] hover:bg-[#e69500] text-white py-2 rounded-lg font-semibold transition-all duration-200">
// //                   Book Now
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function CarsPage() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get("/api/cars");
//         setCars(res.data);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };
//     fetchCars();
//   }, []);

//   return (
//     <div className="max-w-7xl bg-background mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-4xl font-bold text-center mb-10 text-[#FFA500]">
//         Available Cars
//       </h1>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {cars.map((car) => (
//           <div
//             key={car._id}
//             className="bg-secondary rounded-2xl border border-secondary hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden"
//           >
//             <Link href={`/cars/${car._id}`}>
//               <div className="relative w-full h-40">
//                 <img
//                   src={car.image || "/assets/images/default-car.jpg"}
//                   alt={car.model}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </Link>

//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-primary truncate">
//                 {car.model}
//               </h2>
//               <p className="text-sm text-gray-500">{car.category}</p>
//               <p className="text-sm text-gray-600 mt-1">
//                 Seats: {car.seats} | ${car.price_per_day}/day
//               </p>

//               <Link href={`/cars/${car._id}`}>
//                 <button className="w-full mt-4 bg-[#FFA500] hover:bg-[#e69500] text-white py-2 rounded-lg font-semibold transition-all duration-200">
//                   Book Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import FilterComponent from "@/components/cars/FilterComponent/FilterComponent";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/api/cars");
        setCars(res.data);
        setFilteredCars(res.data); // initialize filter list
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="max-w-7xl bg-background mx-auto px-4 sm:px-6 lg:px-8 py-4">

      {/* FILTER SECTION */}
      <FilterComponent cars={cars} setFilteredCars={setFilteredCars} />

      <h1 className="text-4xl font-bold text-center mb-10 text-[#FFA500]">
        Available Cars
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCars.map((car) => (
          <div
            key={car._id}
            className="bg-secondary rounded-2xl border border-secondary hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden"
          >
            <Link href={`/cars/${car._id}`}>
              <div className="relative w-full h-40">
                <img
                  src={car.image || "/assets/images/default-car.jpg"}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-primary truncate">
                {car.model}
              </h2>
              <p className="text-sm text-gray-500">{car.category}</p>
              <p className="text-sm text-gray-600 mt-1">
                Seats: {car.seats} | ${car.price_per_day}/day
              </p>

              <Link href={`/cars/${car._id}`}>
                <button className="w-full mt-4 bg-[#FFA500] hover:bg-[#e69500] text-white py-2 rounded-lg font-semibold transition-all duration-200">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
