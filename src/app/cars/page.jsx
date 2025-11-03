"use cleint"

import FeaturedComponent from "@/components/cars/FeaturedComponent/FeaturedComponent";
import FilterComponent from "@/components/cars/FilterComponent/FilterComponent";
import HeroComponent from "@/components/cars/HeroComponent/HeroComponent";
import NewsComponent from "@/components/cars/NewsComponent/NewsComponent";
import ServicesComponent from "@/components/cars/ServicesComponent/ServicesComponent";


export default function page() {
  return (
    <>
    <HeroComponent />
      <FilterComponent />
      <ServicesComponent />
      {/* <RentCarCard /> */}
      {/* <BuyCarCard /> */}
      {/* <FeaturedNewsCard/> */}
      <FeaturedComponent />
      <NewsComponent />
    
    </>
  );
}