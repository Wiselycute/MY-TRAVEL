// import Image from "next/image";

// const HeroComponent = () => (
//   <div className="max-w-7xl bg-background mx-auto px-4 py-12 md:py-16">
//     <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//       <div className="flex flex-col items-start w-full md:w-1/2 space-y-2">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
//           <span className="block text-primary">Buy, Sell & Rent</span>
//           <span className="block text-primary mt-2">reputable cars</span>
//         </h1>
//         <p className="text-base sm:text-lg text-gray-600 max-w-md">
//           Buy and Sell reputable cars. Renting a car is easy and fast with TopCar.
//         </p>
//         <div className="flex items-center gap-8 mt-5">
//           <div>
//             <span className="font-bold text-5xl text-primary">50+</span>
//             <p className="text-lg font-semibold text-gray-600">Car brands</p>
//           </div>
//           <div className="h-16 w-px bg-gray-300" />
//           <div>
//             <span className="font-bold text-5xl text-primary">10k+</span>
//             <p className="text-lg font-semibold text-gray-600">Clients</p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:w-1/2 flex justify-end">
//         <div className="relative w-full max-w-[850px] h-[450px]">
//           <Image
//             src="/assets/images/car_herosec.png"
//             alt="Premium car showcase"
//             fill
//             className="object-contain"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default HeroComponent;
"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const carImages = [
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
];

export default function HeroComponent() {
  return (
    <div className="w-full bg-background py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT SIDE — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-primary">
            Find The Perfect Car <br /> For Your Next Trip
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Rent high-quality cars at the best prices.  
            From economy rides to luxury SUVs — we’ve got you covered.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-8 py-3 bg-[#FFA500] hover:bg-[#e69500] text-white font-semibold rounded-lg transition-all">
              Book Now
            </button>

            <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all">
              Explore Cars
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE — SLIDESHOW */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 2500,
              }),
            ]}
            className="w-full h-[340px] rounded-2xl overflow-hidden shadow-lg"
          >
            <CarouselContent>
              {carImages.map((src, i) => (
                <CarouselItem key={i}>
                  <img
                    src={src}
                    alt="Car Slide"
                    className="w-full h-[340px] object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
}
