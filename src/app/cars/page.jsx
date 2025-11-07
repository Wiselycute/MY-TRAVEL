"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HeroComponent from "@/components/cars/HeroComponent/HeroComponent";
import FilterComponent from "@/components/cars/FilterComponent/FilterComponent";
import ServicesComponent from "@/components/cars/ServicesComponent/ServicesComponent";
import NewsComponent from "@/components/cars/NewsComponent/NewsComponent";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/api/cars");
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <HeroComponent />
      <FilterComponent cars={cars} setFilteredCars={setFilteredCars} />
      <ServicesComponent cars={filteredCars} />
      <NewsComponent />
    </>
  );
}
