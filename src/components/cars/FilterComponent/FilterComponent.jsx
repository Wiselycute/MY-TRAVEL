"use client";
import { useState } from "react";
import { Users, DollarSign, MapPin } from "lucide-react";

const FilterComponent = ({ cars, setFilteredCars }) => {
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    let filtered = cars.filter((car) => {
      return (
        (!seats || car.seats == seats) &&
        (!price || car.price_per_day <= Number(price)) &&
        (!location ||
          car.provider_name.toLowerCase().includes(location.toLowerCase()))
      );
    });
    setFilteredCars(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-start">
        <div className="flex w-full sm:w-auto">
          <button className="flex-1 bg-[#FFA500] text-white rounded-t-2xl py-4 font-semibold hover:bg-[#3d2828]">
            Rent Car
          </button>
          <button className="flex-1 bg-background border border-gray-100 rounded-t-2xl py-4 text-[#A18E8E] font-semibold hover:bg-gray-50">
            Buy Car
          </button>
        </div>

        <div className="w-full border border-secondary rounded-b-2xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:flex-1 relative">
              <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                placeholder="Number of Seats"
                className="w-full pl-12 pr-4 py-4 border rounded-lg"
              />
            </div>
            <div className="w-full lg:flex-1 relative">
              <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Max Price"
                className="w-full pl-12 pr-4 py-4 border rounded-lg"
              />
            </div>
            <div className="w-full lg:flex-1 relative">
              <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Provider name"
                className="w-full pl-12 pr-4 py-4 border rounded-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full lg:w-auto bg-red-500 text-white py-4 px-10 rounded-lg hover:bg-red-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
