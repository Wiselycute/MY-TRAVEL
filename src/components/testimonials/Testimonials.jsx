"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    testimonial:
      "Travel Fusion exceeded every expectation! From the moment I booked until I returned home, every detail was perfectly handled. My Dubai experience was absolutely magical.",
    trip: "Dubai Luxury Package",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, USA",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    testimonial:
      "The level of service was unmatched. My Tokyo cultural tour was curated to perfection, and the 24/7 support made me feel like royalty throughout the journey.",
    trip: "Tokyo Cultural Experience",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    testimonial:
      "Our Maldives honeymoon was a dream come true. The overwater villa was spectacular, and every moment felt like pure luxury. Travel Fusion made it unforgettable.",
    trip: "Maldives Honeymoon",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 lg:py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sky-600 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real experiences from our valued clients who trusted us for their unforgettable journeys.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/70 shadow-lg border border-sky-100 dark:border-slate-700 rounded-full p-3 hover:bg-sky-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/70 shadow-lg border border-sky-100 dark:border-slate-700 rounded-full p-3 hover:bg-sky-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden mx-12 sm:mx-20">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / testimonials.length)}%)`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-sky-100 dark:border-slate-700 p-8 hover:shadow-2xl hover:border-sky-300/40 transition-all duration-500 hover:-translate-y-2 group">
                    <Quote className="absolute top-6 right-6 h-6 w-6 text-sky-400 opacity-40" />

                    {/* Profile */}
                    <div className="flex items-center gap-4 mb-5">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-sky-300/40 group-hover:border-sky-500/60 transition-all duration-300"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors duration-300">
                          {t.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {t.location}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial */}
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-3">
                      “{t.testimonial}”
                    </p>

                    <p className="text-sky-600 dark:text-sky-400 font-medium text-sm">
                      — {t.trip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-sky-600 shadow-sky-400/40 shadow-md scale-110"
                    : "bg-gray-300 hover:bg-sky-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
