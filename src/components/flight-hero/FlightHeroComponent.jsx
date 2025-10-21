"use client";
import React from 'react'
import { useState } from "react";
import { Calendar, MapPin, Users, ChevronDown, Search } from "lucide-react";

export const FlightHeroComponent = () => {
    const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travelers: "1 Adult",
    class: "Economy",
  });

  const [focusedField, setFocusedField] = useState(null);
  return (
    <div className="relative overflow-hidden bg-background ">
      {/* Premium gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, #E8EBF7 100%)",
        }}
      ></div>

      {/* Subtle geometric texture */}
      <div
   className="absolute inset-0 bg-cover bg-center"
   style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1740&q=80')",
    }}
     ></div>


      <div className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-inter text-primary mb-6 font-bold">
              Discover Your Next Journey
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              Experience luxury travel with personalized service and unforgettable destinations
            </p>
          </div>

          {/* Floating Search Card */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">

              
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-7 gap-4 items-end">
                {/* Leaving From */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Leaving From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFA500]" />
                    <input
                      type="text"
                      placeholder="New York (JFK)"
                      className={`w-full h-12 pl-10 pr-4 border border-[#F4D03F] rounded-xl bg-white/20 text-charcoal placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "from"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.from}
                      onChange={(e) =>
                        setFormData({ ...formData, from: e.target.value })
                      }
                      onFocus={() => setFocusedField("from")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Where To */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Where To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFA500]" />
                    <input
                      type="text"
                      placeholder="Dubai (DXB)"
                      className={`w-full h-12 pl-10 pr-4 border border-[#F4D03F] rounded-xl bg-white/20  text-charcoal placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "to"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.to}
                      onChange={(e) =>
                        setFormData({ ...formData, to: e.target.value })
                      }
                      onFocus={() => setFocusedField("to")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFA500]" />
                    <input
                      type="date"
                      className={`w-full h-12 pl-10 pr-4 border border-[#F4D03F] rounded-xl bg-white/20  text-charcoal focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "departureDate"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.departureDate}
                      onChange={(e) =>
                        setFormData({ ...formData, departureDate: e.target.value })
                      }
                      onFocus={() => setFocusedField("departureDate")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFA500]" />
                    <input
                      type="date"
                      className={`w-full h-12 pl-10 pr-4 border border-[#F4D03F] rounded-xl bg-white/20  text-charcoal focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                        focusedField === "returnDate"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.returnDate}
                      onChange={(e) =>
                        setFormData({ ...formData, returnDate: e.target.value })
                      }
                      onFocus={() => setFocusedField("returnDate")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFA500]" />
                    <select
                      className={`w-full h-12 pl-10 pr-10 border border-[#F4D03F] rounded-xl bg-white/20  text-charcoal focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 appearance-none ${
                        focusedField === "travelers"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.travelers}
                      onChange={(e) =>
                        setFormData({ ...formData, travelers: e.target.value })
                      }
                      onFocus={() => setFocusedField("travelers")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="3 Adults">3 Adults</option>
                      <option value="4+ Adults">4+ Adults</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral pointer-events-none" />
                  </div>
                </div>

                {/* Class */}
                <div className="space-y-2">
                  <label className="text-charcoal text-sm block font-medium">Class</label>
                  <div className="relative">
                    <select
                      className={`w-full h-12 px-4 border  rounded-xl border-[#F4D03F]  text-charcoal bg-white/20 backdrop-blur-md  focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 appearance-none ${
                        focusedField === "class"
                          ? "border-blue-300 ring-blue-50 shadow-lg"
                          : "hover:border-blue-200"
                      }`}
                      value={formData.class}
                      onChange={(e) =>
                        setFormData({ ...formData, class: e.target.value })
                      }
                      onFocus={() => setFocusedField("class")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First Class</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2  -translate-y-1/2 h-5 w-5 text-coral pointer-events-none" />
                  </div>
                </div>

                {/* Search Button */}
                <button className="bg-coral hover:bg-gold text-white h-12 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-coral/30 hover:scale-105 flex items-center justify-center space-x-2 group font-bold">
                  <Search className="h-5 w-5 group-hover:scale-110 transition-transform text-[#FFA500]" />
                  <span>Search</span>
                </button>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Leaving From
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral" />
                      <input
                        type="text"
                        placeholder="New York (JFK)"
                        className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl bg-gray-50 text-charcoal placeholder-gray-400 focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all hover:border-blue-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Where To
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral" />
                      <input
                        type="text"
                        placeholder="Dubai (DXB)"
                        className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl bg-gray-50 text-charcoal placeholder-gray-400 focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all hover:border-blue-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Departure
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral" />
                      <input
                        type="date"
                        className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl bg-gray-50 text-charcoal focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all hover:border-blue-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Return
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral" />
                      <input
                        type="date"
                        className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl bg-gray-50 text-charcoal focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all hover:border-blue-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral" />
                      <select className="w-full h-12 pl-10 pr-10 border border-gray-200 rounded-xl bg-gray-50 text-charcoal focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all appearance-none hover:border-blue-200">
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-charcoal text-sm block font-medium">
                      Class
                    </label>
                    <div className="relative">
                      <select className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-charcoal focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all appearance-none hover:border-blue-200">
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coral pointer-events-none" />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-coral hover:bg-gold  h-12 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-coral/30 flex items-center justify-center space-x-2 font-bold">
                  <Search className="h-5 w-5" />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

