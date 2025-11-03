// components/ServicesComponent/ServicesComponent.jsx
import React                         from 'react'
import { rentCarsData, buyCarsData } from '@/lib/carData'
import BuyCarCard                    from '../BuyCarCard/BuyCarCard'
import { ArrowRight }                from 'lucide-react'
import RentCarCard from './../RentCarCard/RentCarCard';


const ServicesComponent = () => {
  return (
    <div className='w-full bg-background py-12 md:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Rent Cars Section */}
        <section className='mb-16 lg:mb-24'>
          {/* Section Header */}
          <div className='flex items-center justify-between mb-8 lg:mb-12'>
            <div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2'>
                Rent Cars
              </h2>
            
            </div>
            
            {/* See All Button */}
            <button className='flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-200 group border border-gray-300 hover:border-red-600'>
              <span>See all</span>
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1' />
            </button>
          </div>
          
          {/* Responsive Flex Layout with Better Tablet Support */}
          <div className='flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-8'>
            {rentCarsData.slice(0, 3).map((car) => (
              <div key={car.id} className='w-full sm:w-[calc(50%-12px)]  max-w-[400px] flex-shrink-0'>
                <RentCarCard data={car} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Buy Cars Section */}
        <section className='mb-16 lg:mb-24'>
          {/* Section Header */}
          <div className='flex items-center justify-between mb-8 lg:mb-12'>
            <div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                Buy Cars
              </h2>
              
            </div>
            
            {/* See All Button */}
            <button className='flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-200 group border border-gray-300 hover:border-red-600'>
              <span>See all</span>
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1' />
            </button>
          </div>
          
          {/* Responsive Flex Layout with Better Tablet Support */}
          <div className='flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-8'>
            {buyCarsData.slice(0, 3).map((car) => (
              <div key={car.id} className='w-full sm:w-[calc(50%-12px)]  max-w-[400px] flex-shrink-0'>
                <BuyCarCard data={car} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ServicesComponent
