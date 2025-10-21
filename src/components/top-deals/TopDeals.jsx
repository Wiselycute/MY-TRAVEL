"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const deals = [
  {
    id: 1,
    title: "Dubai Business Class Special",
    destination: "Dubai, UAE",
    originalPrice: "$2,999",
    salePrice: "$1,899",
    discount: "37% OFF",
    duration: "7 Days",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1748373452031-ee1ae4eb624d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Business Class", "5-Star Hotel", "Airport Transfer"],
  },
  {
    id: 2,
    title: "Maldives Overwater Villa",
    destination: "Maldives",
    originalPrice: "$3,499",
    salePrice: "$2,299",
    discount: "34% OFF",
    duration: "5 Days",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Overwater Villa", "All-Inclusive", "Seaplane Transfer"],
  },
  {
    id: 3,
    title: "Paris Luxury Getaway",
    destination: "Paris, France",
    originalPrice: "$1,899",
    salePrice: "$1,299",
    discount: "32% OFF",
    duration: "4 Days",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1683874022998-401ac10b5c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Boutique Hotel", "City Tours", "Michelin Dining"],
  },
  {
    id: 4,
    title: "Tokyo Cultural Experience",
    destination: "Tokyo, Japan",
    originalPrice: "$2,299",
    salePrice: "$1,599",
    discount: "30% OFF",
    duration: "6 Days",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1563021658-50fdb28875f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Traditional Ryokan", "Cultural Tours", "JR Pass Included"],
  },
];

export function TopDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFA500] mb-3">
            Top Travel Deals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Limited-time offers on premium travel experiences
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary shadow-lg border border-gray-200 rounded-full p-3 sm:p-4 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary shadow-lg border border-gray-200 rounded-full p-3 sm:p-4 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Deals Container */}
          <div className="overflow-hidden mx-10 sm:mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / Math.min(deals.length, 3))
                }%)`,
              }}
            >
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className="bg-background rounded-2xl shadow-md hover:shadow-2xl border border-secondary overflow-hidden hover:border-blue-300 transition-all duration-500 hover:-translate-y-2 group">
                    {/* Image Section */}
                    <div className="relative h-52 sm:h-60 overflow-hidden">
                      <ImageWithFallback
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                        {deal.discount}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-500 transition-colors duration-300">
                        {deal.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3">
                        {deal.destination}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(deal.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">
                          ({deal.rating})
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span>{deal.duration}</span>
                      </div>

                      {/* Pricing and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-blue-500">
                              {deal.salePrice}
                            </span>
                            <span className="text-gray-400 line-through text-sm sm:text-base">
                              {deal.originalPrice}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            per person
                          </p>
                        </div>

                        <button className="bg-[#FFA500] hover:bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/50">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {deals.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
