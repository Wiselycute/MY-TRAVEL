"use client";

import React from "react";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1748373452031-ee1ae4eb624d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    price: "From $899",
    description:
      "Experience the pinnacle of luxury in this modern metropolis.",
  },
  {
    id: 2,
    name: "Maldives",
    country: "Republic of Maldives",
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    price: "From $1,299",
    description:
      "Paradise found in crystal-clear waters and overwater villas.",
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1683874022998-401ac10b5c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    price: "From $699",
    description:
      "Romance and elegance in the City of Light.",
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1563021658-50fdb28875f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    price: "From $999",
    description:
      "Where ancient traditions meet cutting-edge innovation.",
  },
];

export function FeaturedDestinations() {
  return (
    <section className="py-16 lg:py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sky-600 mb-4">
            Featured Destinations
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover breathtaking destinations curated for the discerning traveler.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Blue overlay on hover */}
                <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-white text-sky-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg group-hover:shadow-sky-300/30">
                  {destination.price}
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">{destination.country}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-md">
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-sky-400/30">
                  Book Now
                </button>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-400/40 group-hover:shadow-sky-300/20 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
