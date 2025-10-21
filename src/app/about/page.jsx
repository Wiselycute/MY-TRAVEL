'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: "Chang Qiu Sheng",
    title: "CEO",
    image: "/about-us/img1.png",
    bio: `Mr. Chang is the founder and CEO of Amber Aviation. With over 20 years of experience in the business aviation industry, he has led the company from inception to becoming one of Asia’s most trusted private aviation providers.`,
  },
  {
    name: "Vicky Tsui",
    title: "VP of Marketing",
    image: "/about-us/img2.png",
    bio: `Ms. Tsui oversees business development, management and marketing in the Asia Pacific region. She has over 12 years of management experience in the business jet sector and is known for her deep understanding of client needs.`,
  },
  {
    name: "Yongyi Zhang",
    title: "VP of Flight Operation",
    image: "/yongyi.jpg",
    bio: `Captain Zhang leads the flight operations division with a strong background in commercial and private aviation. He ensures the highest standards of safety and compliance across all flight operations.`,
  },
  {
    name: "Bob Li",
    title: "VP of Operations",
    image: "/bob.jpg",
    bio: `Mr. Li manages all ground operations, ensuring efficiency in logistics and aircraft readiness. His hands-on approach and attention to detail drive excellence in Amber Aviation’s daily execution.`,
  },
  {
    name: "David Du",
    title: "Executive VP",
    image: "/david.jpg",
    bio: `Mr. Du supports corporate strategy, international partnerships, and executive decision-making. He brings global industry expertise and a strategic vision to the leadership team.`,
  },
  {
    name: "Zoe Zhao",
    title: "VP of Finance",
    image: "/zoe.jpg",
    bio: `Ms. Zhao oversees the company’s financial strategy and planning. Her financial acumen has been crucial in scaling operations and maintaining fiscal discipline while enabling growth.`,
  },
  {
    name: "Nicole Chen",
    title: "VP of HR",
    image: "/nicole.jpg",
    bio: `Ms. Chen is responsible for talent development and human resource management. She ensures a positive workplace culture and leads HR initiatives that align with company goals.`,
  },
];



export default function AboutUsPage() {
    const [index, setIndex] = useState(1); // Default to Vicky Tsui
  const [direction, setDirection] = useState(1);

  // Auto-play every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % teamMembers.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const selectedMember = teamMembers[index];
  return (

 <div className="min-h-screen bg-gray-50 text-gray-800 px-4 sm:px-6 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Text Section */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedMember.name + "-text"}
            initial={{ x: direction * -80, opacity: 0, filter: 'blur(5px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: direction * 80, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl font-bold">{selectedMember.name}</h1>
            <h2 className="text-lg sm:text-xl text-gray-600">{selectedMember.title}</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {selectedMember.bio}
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-4">
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-200 transition">
                <ArrowLeft size={24} />
              </button>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-200 transition">
                <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image Section */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedMember.name + "-image"}
            initial={{ x: direction * 80, opacity: 0, filter: 'blur(5px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: direction * -80, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2  flex justify-center items-center"
          >
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className=" w-[280px] sm:w-[350px] lg:w-[400px] object-cover "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Team Thumbnails */}
      <div className="mt-16">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`cursor-pointer flex flex-col items-center text-center space-y-2 transition-all ${
                idx === index ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-300"
              />
              <div className="text-sm font-medium">{member.name}</div>
              <div className="text-xs text-gray-500">{member.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}