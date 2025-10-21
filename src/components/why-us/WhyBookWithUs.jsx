"use client";
import { Headphones, Shield, Crown, Clock } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "24/7 Concierge Support",
    description:
      "Expert travel consultants available around the clock to assist with every detail of your journey.",
  },
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description:
      "Find a better price within 24 hours? We'll match it and give you an additional 5% off.",
  },
  {
    icon: Crown,
    title: "VIP Upgrades",
    description:
      "Complimentary room upgrades, priority boarding, and exclusive access to VIP lounges.",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description:
      "Secure your booking instantly with real-time availability and immediate confirmation.",
  },
];

export function WhyBookWithUs() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-inter text-gray-900 mb-4 font-bold">
            Why Book With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Experience the difference of premium travel services designed for
            discerning travelers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 bg-background rounded-2xl border border-secondary hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl mb-6 group-hover:bg-blue-400 group-hover:scale-110 transition-all duration-500 shadow-md group-hover:shadow-blue-200">
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:text-white transition-all duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-inter text-gray-900 mb-3 font-semibold group-hover:text-blue-500 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div className="w-10 sm:w-12 h-1 bg-blue-400 mx-auto mt-6 rounded-full group-hover:bg-blue-500 group-hover:w-16 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
