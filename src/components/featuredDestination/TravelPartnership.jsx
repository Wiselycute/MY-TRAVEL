"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const partners = [
  {
    name: "Emirates Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
  },
  {
    name: "Qatar Airways",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Qatar_Airways_logo.svg",
  },
  {
    name: "Booking.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Booking.com_logo.svg",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Expedia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Expedia_Logo.svg",
  },
  {
    name: "TripAdvisor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Tripadvisor_Logo_circle-green_horizontal-lockup_registered.svg",
  },
  {
    name: "Turkish Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/Turkish_Airlines_logo_2019.svg",
  },
  {
    name: "Delta Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Delta_Air_Lines_Logo.svg",
  },
];

export default function TravelPartnership() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 2500, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  return (
    <section className="py-20 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary ">
          Our Trusted Travel Partners
        </h2>
        <p className="text-gray-600 mt-2">
          We collaborate with top travel companies worldwide to make your journeys seamless.
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-10 items-center">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center w-48 h-24 bg-background rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={130}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-14">
        <button className="px-8 py-3 bg-[#FFA500] text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
          Become a Partner
        </button>
      </div>
    </section>
  );
}
