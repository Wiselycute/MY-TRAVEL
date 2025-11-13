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
    <main className="min-h-screen w-full bg-background text-gray-800">
      {/*  HERO SECTION */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[80vh] flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: "url('/images/travel-hero.jpg')", 
        }}
      >
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-md">
            Explore the world and enjoy its beauty ✈️
          </h1>
          <p className="text-white/90 mt-4 text-lg max-w-xl mx-auto">
            Find and book your perfect flights, hotels, and car rentals easily.
          </p>
        </motion.div>

        {/* SEARCH CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 mt-10 w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex border-b">
            {["flights", "cars", "hotels"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCategory(tab)}
                className={`flex-1 py-3 font-semibold text-sm sm:text-base transition ${
                  category === tab
                    ? "border-b-4 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 grid sm:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="text-gray-600 text-sm">Destination</label>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">
                {category === "cars" ? "Pick-up" : "Check-in"}
              </label>
              <input type="date" className="w-full border rounded-lg px-3 py-2 mt-1 outline-none" />
            </div>

            <div>
              <label className="text-gray-600 text-sm">
                {category === "cars" ? "Drop-off" : "Check-out"}
              </label>
              <input type="date" className="w-full border rounded-lg px-3 py-2 mt-1 outline-none" />
            </div>
          </div>

          <div className="flex justify-end px-6 pb-6">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              <Search size={18} /> Search
            </button>
          </div>
        </motion.div>
      </section>

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
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-72 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-full h-48">
                    <img
                      src={item.image}
                      alt={item[itemKey]}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold capitalize">
                      {item[itemKey]}
                    </h3>
                    <p className="text-gray-500">{item[descriptionKey]}</p>
                    <p className="mt-1 text-blue-600 font-medium">
                      {priceKey && item[priceKey]
                        ? `From $${item[priceKey]}`
                        : ""}
                    </p>
                    <Link href={`${linkBase}/${item._id}`}>
                      <button className="mt-3 w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
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
