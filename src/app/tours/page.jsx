"use cleint"
import HeroSection from './../../components/tour/hero/HeroSection';
import TopDestinations from './../../components/tour/destinations/TopDestinations';
import TopSelling from './../../components/tour/top-sale/TopSelling';
import Partners from './../../components/tour/partners/Partners';
import BlogSection from './../../components/tour/bog/BlogSection';
import Testimonials from '@/components/tour/testimonials/Testimonials';
import Adventures from './../../components/tour/adventures/Adventures';


export default function page() {
  return (
    <>
    
    <HeroSection />
      <TopDestinations />
      <TopSelling />
      <Adventures />
      <BlogSection />
      <Testimonials />
      <Partners />
    </>
  );
}