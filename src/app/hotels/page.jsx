"use cleint"
import { PopularComponent } from './../../components/popular-locations/PopularComponent';
import { BestHotels } from './../../components/best-hotels/BestHotels';
import HeroComponent from './../../components/hero/HeroComponent';


export default function page() {
  return (
    <>
     <HeroComponent/>
    <PopularComponent/>
    <HeroComponent/>
    <BestHotels/>
    
    </>
  );
}