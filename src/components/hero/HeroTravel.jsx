"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Search } from "lucide-react";

export default function HeroTravel({ category, setCategory }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const heroImages = [
     "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg","https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
     "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
     "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
     "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
     "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"
    ];


  return (
    <section className="w-full bg-background mt-15 p-4" style={{ height: "500px" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 h-full items-center">

        {/* LEFT — TEXT + SEARCH */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-2xl font-bold text-[#FFA500] leading-tight"
          >
            YOUR ALL IN ONE PLATFORM. BOOK TRAVEL FROM THE COMFORT OF YOUR HOME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 max-w-md"
          >
            Discover the best rental cars near you. Compare prices, choose your
            ride, and start your journey with comfort and style.
          </motion.p>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-3 mt-4">
            {["flights", "cars", "hotels", "tours", "insurance", "packages"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    category === item
                      ? "bg-primary text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              )
            )}
          </div>

          {/* SEARCH CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-background p-6 rounded-2xl shadow-lg space-y-4 w-full max-w-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-sm">Pick-up Location</label>
                <input
                  placeholder="Where?"
                  className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-500 text-sm">Pick-up Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-gray-500 text-sm">Drop-off Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
            </div>

            <button className="w-full bg-[#FFA500] hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
              <Search size={18} /> Search Cars
            </button>
          </motion.div>
        </div>

        {/* RIGHT — SLIDESHOW */}
        <div
          className="overflow-hidden rounded-3xl shadow-xl h-full"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {heroImages.map((src, i) => (
              <div key={i} className="flex-none w-full h-full">
                <img
                  src={src}
                  alt="Car rental slideshow"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
