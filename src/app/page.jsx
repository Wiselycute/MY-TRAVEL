"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Search } from "lucide-react";
import { FeaturedDestinations } from "@/components/featuredDestination/FeaturedDestinations";
import TravelMemories from "@/components/featuredDestination/TravelMemories";
import TravelPartnership from './../components/featuredDestination/TravelPartnership';
import { Testimonials } from "@/components/testimonials/Testimonials";
import HeroTravel from './../components/hero/HeroTravel';



export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [category, setCategory] = useState("flights");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      router.push("/auth/signup");
    }
  }, [router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cRes, hRes] = await Promise.all([
          fetch("/api/cars"),
          fetch("/api/hotels"),
        ]);
        const [cData, hData] = await Promise.all([
          cRes.json(),
          hRes.json(),
        ]);
        setCars(cData);
        setHotels(hData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <main className="min-h-screen w-full  bg-background text-gray-800">
      {/*  HERO SECTION */}
     
      <HeroTravel category={category} setCategory={setCategory} />

      {/*  FEATURED DESTINATIONS SECTION */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <FeaturedDestinations />
      </div>

      {/*  CARS CAROUSEL */}
      <CarouselSection
        title=" Car Rentals"
        items={cars}
        linkBase="/cars"
        itemKey="model"
        descriptionKey="category"
        priceKey="price_per_day"
        buttonText="Book Car"
      />

      {/*  HOTELS CAROUSEL */}
      <CarouselSection
        title="Luxury Hotels"
        items={hotels}
        linkBase="/hotels"
        itemKey="hotel_name"
        descriptionKey="location"
        priceKey="price_per_night"
        buttonText="Book Hotel"
      />
    </main>

     <TravelMemories/>
     <TravelPartnership/>
     <Testimonials/>
    </>
  );
}

/*  Carousel Section */
function CarouselSection({
  title,
  items,
  linkBase,
  itemKey,
  descriptionKey,
  priceKey,
  buttonText,
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3500 })]);

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6  flex justify-center text-primary">{title}</h2>

        <div className="overflow-hidden " ref={emblaRef}>
          <div className="flex gap-6">
            {items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-72 bg-background rounded-2xl shadow-md overflow-hidden   hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-full h-48 ">
                    <img
                      src={item.image}
                      alt={item[itemKey]}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-primary font-semibold capitalize">
                      {item[itemKey]}
                    </h3>
                    <p className="text-gray-500">{item[descriptionKey]}</p>
                    <p className="mt-1 text-blue-600 font-medium">
                      {priceKey && item[priceKey]
                        ? `From $${item[priceKey]}`
                        : ""}
                    </p>
                    <Link href={`${linkBase}/${item._id}`}>
                      <button className="mt-3 w-full px-4 py-2 text-sm bg-[#FFA500] text-white rounded-full hover:bg-blue-700 transition">
                        {buttonText}
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No data available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
    
   
  );
}
