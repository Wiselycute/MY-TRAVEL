"use cleint"
import { FlightHeroComponent } from './../../components/flight-hero/FlightHeroComponent';
import { FeaturedDestinations } from './../../components/featuredDestination/FeaturedDestinations';
import { TopDeals } from './../../components/top-deals/TopDeals';
import { WhyBookWithUs } from './../../components/why-us/WhyBookWithUs';
import { Testimonials } from './../../components/testimonials/Testimonials';



export default function page() {
  return (
    <>
      {/* Hero Section */}
      <FlightHeroComponent />
      
      {/* Featured Destinations */}
      <FeaturedDestinations/>
      
      {/* Top Deals */}
      <TopDeals />
      
      {/* Why Book With Us */}
      <WhyBookWithUs />
      
      {/* Testimonials */}
      <Testimonials />
    
    </>
  );
}