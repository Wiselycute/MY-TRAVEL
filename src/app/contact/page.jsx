"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import  { useEffect, useState } from "react"

export default function page() {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80", // beach
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80", // mountain
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80", // airplane
    "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1600&q=80", // city skyline
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80", // hotel
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80", // nature trail
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80", // resort repeat
  ];

   const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);



  return (
    <>
    <div className="bg-background text-foreground">
      {/* Hero Section */}
     <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden bg-transparent">
      {/* Slideshow Images */}
      <div className="absolute inset-0 w-full h-full bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={images[currentImage]}
              alt="Travel Destination"
              className="w-full h-full object-cover"
            />
            {/* Light blue overlay */}
            <div className="absolute inset-0 bg-blue-400/30 mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-gray-200 text-sm sm:text-base drop-shadow-md">
          Home / Contact
        </p>
      </div>
    </section>
      

      {/* Contact Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left - Form */}
        <div className="bg-card p-5 sm:p-8 rounded-2xl shadow-md w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-primary text-center md:text-left">
            Get In Touch
          </h2>
          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Your name..."
                className="mt-1 w-full text-sm focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                placeholder="example@email.com"
                className="mt-1 w-full text-sm focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Title..."
                className="mt-1 w-full text-sm focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Type your message..."
                rows={5}
                className="mt-1 w-full resize-none text-sm focus-visible:ring-primary"
              />
            </div>
            <Button className="w-full text-white bg-primary hover:bg-primary/90 text-sm py-5">
              Send Now
            </Button>
          </form>
        </div>

        {/* Right - Contact Info */}
        <div className="flex flex-col justify-between space-y-8 w-full">
          <div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center md:text-left">
              Feel free to contact us for any inquiries regarding flights, hotels, cars, or
              travel packages. Our travel experts are ready to help 24/7.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="text-primary w-5 h-5 shrink-0" />
                <p className="font-medium text-sm sm:text-base">+1 (234) 567-890</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="text-primary w-5 h-5 shrink-0" />
                <p className="font-medium text-sm sm:text-base">contact@mytravel.com</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <MessageSquare className="text-primary w-5 h-5 shrink-0" />
                <p className="font-medium text-sm sm:text-base">WhatsApp: +1 (234) 567-891</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin className="text-primary w-5 h-5 shrink-0" />
                <p className="font-medium text-sm sm:text-base">
                  2443 Oak Ridge, Omaha, QA 45065
                </p>
              </div>
            </div>
          </div>

          <iframe
            className="rounded-xl shadow-md w-full h-56 sm:h-64 md:h-72 border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9936.621278470352!2d-0.119824!3d51.503363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b0e2e7b7bb%3A0x8e8b6da38f0508a1!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1712910606881!5m2!1sen!2suk"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-primary text-white text-center py-14 px-4">
        <h3 className="text-2xl sm:text-3xl font-semibold leading-snug">
          We’re Always Ready To Plan Your Perfect Trip
        </h3>
        <Button
          variant="secondary"
          className="mt-6 px-6 py-3 text-sm sm:text-base font-medium rounded-full"
        >
          Get Started
        </Button>
      </section>

      
    </div>
     
    </>
  );
}