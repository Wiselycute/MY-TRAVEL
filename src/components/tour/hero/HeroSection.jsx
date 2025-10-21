"use client";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-4">
          Discover the Best Places to Visit!
        </h1>
        <p className="text-gray-600 mb-8">
          The way to the top of the place is always longer than you think — start your journey today.
        </p>

        <div className="bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl p-4 flex flex-col md:flex-row gap-3 justify-between shadow-xl">
          <input
            type="text"
            placeholder="Where to?"
            className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-yellow-400 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="date"
            className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition">
            <Search size={18} /> Search
          </button>
        </div>
      </div>
    </section>
  );
}
