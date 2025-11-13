'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, PlaneTakeoff, Globe2, ShieldCheck } from 'lucide-react';

const teamMembers = [
  {
    name: "Chang Qiu Sheng",
    title: "CEO",
    image: "https://i.pinimg.com/1200x/8f/23/44/8f23447418ff5e3e048ad43742eaf93a.jpg",
    bio: `Mr. Chang is the founder and CEO of Amber Aviation. With over 20 years of experience in the business aviation industry, he has led the company from inception to becoming one of Asia’s most trusted private aviation providers.`,
  },
  {
    name: "Vicky Tsui",
    title: "VP of Marketing",
    image: "https://i.pinimg.com/736x/c4/d8/f8/c4d8f8f64e1f00a5ca02253f5ecc27d0.jpg",
    bio: `Ms. Tsui oversees business development, management and marketing in the Asia Pacific region. She has over 12 years of management experience in the business jet sector and is known for her deep understanding of client needs.`,
  },
  {
    name: "Yongyi Zhang",
    title: "VP of Flight Operation",
    image: "https://i.pinimg.com/736x/0b/2e/98/0b2e988dcec7af0209aa42d919c6967b.jpg",
    bio: `Captain Zhang leads the flight operations division with a strong background in commercial and private aviation. He ensures the highest standards of safety and compliance across all flight operations.`,
  },
  {
    name: "Bob Li",
    title: "VP of Operations",
    image: "https://i.pinimg.com/736x/38/bd/10/38bd10063fd5a79dadde2d5d1d3a0590.jpg",
    bio: `Mr. Li manages all ground operations, ensuring efficiency in logistics and aircraft readiness. His hands-on approach and attention to detail drive excellence in Amber Aviation’s daily execution.`,
  },
  {
    name: "David Du",
    title: "Executive VP",
    image: "https://i.pinimg.com/474x/34/da/e2/34dae2b1c9a2c38bfdc18bbb5a414149.jpg",
    bio: `Mr. Du supports corporate strategy, international partnerships, and executive decision-making. He brings global industry expertise and a strategic vision to the leadership team.`,
  },
  {
    name: "Zoe Zhao",
    title: "VP of Finance",
    image: "https://i.pinimg.com/736x/1e/51/9e/1e519e46785cc66de254a962dc0b7c9b.jpg",
    bio: `Ms. Zhao oversees the company’s financial strategy and planning. Her financial acumen has been crucial in scaling operations and maintaining fiscal discipline while enabling growth.`,
  },
  {
    name: "Nicole Chen",
    title: "VP of HR",
    image: "https://i.pinimg.com/1200x/bd/f3/e8/bdf3e8621178bc9207fec2d512de166a.jpg",
    bio: `Ms. Chen is responsible for talent development and human resource management. She ensures a positive workplace culture and leads HR initiatives that align with company goals.`,
  },
];

export default function AboutUsPage() {
  const [index, setIndex] = useState(1);
  const [direction, setDirection] = useState(1);

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
    <div className="min-h-screen bg-background mt-11 px-4 sm:px-6 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center ">
        {/* Text Section */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedMember.name + '-text'}
            initial={{ x: direction * -80, opacity: 0, filter: 'blur(5px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: direction * 80, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl text-[#FFA500] font-bold">
              {selectedMember.name}
            </h1>
            <h2 className="text-lg sm:text-xl text-primary">{selectedMember.title}</h2>
            <p className="leading-relaxed text-sm sm:text-base">
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
            key={selectedMember.name + '-image'}
            initial={{ x: direction * 80, opacity: 0, filter: 'blur(5px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: direction * -80, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex justify-center items-center"
          >
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="w-[280px] sm:w-[350px] lg:w-[300px] lg:h-[300px] object-cover"
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
              <div className="text-xs text-primary">{member.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ✈️ COMPANY STORY SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-24 max-w-6xl mx-auto text-center space-y-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#FFA500]">About My Travel</h2>
        <p className="max-w-3xl mx-auto  leading-relaxed text-base sm:text-lg">
          Founded with a vision to redefine private air travel, <span className="font-semibold text-primary">My Travel</span> offers a seamless fusion of safety, comfort, and luxury. 
          Our mission is to make private flying accessible, reliable, and sustainable — backed by a team that values precision and personalized service.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div whileHover={{ y: -6 }} className="p-6 bg-secondary rounded-2xl shadow-lg border border-blue-200">
            <PlaneTakeoff className="text-[#FFA500] w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Innovation in the Sky</h3>
            <p className="text-gray-600 text-sm">Amber Aviation pioneers smart aviation management systems, offering tailored flight experiences powered by technology.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 bg-secondary rounded-2xl shadow-lg border border-blue-200">
            <ShieldCheck className="text-[#FFA500] w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Uncompromised Safety</h3>
            <p className="text-gray-600 text-sm">Our flight and maintenance crews adhere to global safety standards, ensuring every journey is secure and worry-free.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 bg-secondary rounded-2xl shadow-lg border border-blue-200">
            <Globe2 className="text-[#FFA500] w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Global Connectivity</h3>
            <p className="text-gray-600 text-sm">With partners across continents, Amber Aviation connects you to the world through trusted international operations.</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
