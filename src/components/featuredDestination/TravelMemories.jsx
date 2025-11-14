"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TravelMemories() {
  const steps = [
    {
      id: "01",
      title: "Find trips that fit your freedom",
      desc: "Travelling offers freedom and flexibility, solitude and spontaneity, and privacy and purpose.",
      color: "bg-sky-400",
    },
    {
      id: "02",
      title: "Get back to nature by travel",
      desc: "The world is a playground and you can finally explore Mother Nature’s inimitable canvas.",
      color: "bg-blue-500",
    },
    {
      id: "03",
      title: "Reignite those travel tastebuds",
      desc: "There are infinite reasons to love travel, one of them being the food, glorious food.",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="bg-background py-20 px-6 md:px-16 lg:px-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Travel to make sweet memories
          </motion.h2>
          <p className="text-gray-500 mb-8">
            Find trips that fit a flexible lifestyle.
          </p>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <span
                  className={`flex-shrink-0 ${step.color} text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center`}
                >
                  {step.id}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-1 ">
                    {step.title}
                  </h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 bg-sky-500  font-medium px-6 py-3 rounded-xl shadow-lg"
          >
            Start your explore
          </motion.button>
        </div>

        {/* Right image with floating avatars */}
        <motion.div
          className="relative w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/mountain.jpg" 
            alt="Beautiful mountain view"
            width={400}
            height={400}
            className="rounded-3xl object-cover shadow-xl"
          />

          {/* Floating review cards */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-xl flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
              alt="Karmelia Diana"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-medium text-black text-sm">Karmelia Diana ⭐ 4.9</span>
          </div>

          <div className="absolute bottom-10 left-10 bg-white shadow-md px-4 py-2 rounded-xl flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
              alt="Joe Zefrano"
              width={40}
              height={60}
              className="rounded-full"
            />
            <span className="font-medium text-black text-sm">Joe Zefrano ⭐ 4.9</span>
          </div>

          <div className="absolute bottom-16 right-5 bg-white shadow-md px-4 py-2 rounded-xl flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
              alt="Haikal Adams"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-medium text-black text-sm">Haikal Adams ⭐ 4.9</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
