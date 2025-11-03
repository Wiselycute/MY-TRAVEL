// components/BuyCarCard/BuyCarCard.jsx
import { Cog, Fuel, MapPin, Star, Users } from 'lucide-react'
import Image                              from 'next/image'
import React                              from 'react'

const BuyCarCard = ({ data }) => {
  return (
    <div className='w-full max-w-[352px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
      
      {/* Image Section */}
      <div className='w-full h-[200px] sm:h-[220px] relative overflow-hidden bg-gray-100'>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className='object-cover hover:scale-105 transition-transform duration-500'
          sizes="(max-width: 640px) 100vw, 352px"
        />
      </div>
      
      {/* Content Section */}
      <div className='flex flex-col p-4 sm:p-5'>
        <div className='w-full flex flex-col gap-3'>
          
          {/* Title */}
          <h3 className='text-xl sm:text-2xl font-bold text-gray-900 leading-tight w-full'>
            {data.title}
          </h3>
          
          {/* Rating Section */}
          <div className='flex items-center gap-2 text-sm sm:text-base w-full'>
            <Star 
              className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' 
              fill='#FBBF24' 
              stroke='#FBBF24'
            />
            <span className='font-semibold text-gray-900'>{data.rating}</span>
            <span className='text-gray-500'>({data.reviews.toLocaleString()} Reviews)</span>
          </div>
          
          {/* Location Section */}
          <div className='flex items-start gap-2 text-sm sm:text-base text-gray-600 w-full'>
            <MapPin className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-500 mt-0.5' />
            <span className='flex-1 line-clamp-1'>{data.location}</span>
          </div>
          
          {/* Specifications Section */}
          <div className='flex items-center gap-2 w-full flex-wrap'>
            <div className='flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#F2F0F0] hover:bg-[#E5E3E3] transition-colors duration-200'>
              <Users className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700' />
              <span className='text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap'>{data.seats} seats</span>
            </div>
            
            <div className='flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#F2F0F0] hover:bg-[#E5E3E3] transition-colors duration-200'>
              <Fuel className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700' />
              <span className='text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap'>{data.fuelType}</span>
            </div>
            
            <div className='flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#F2F0F0] hover:bg-[#E5E3E3] transition-colors duration-200'>
              <Cog className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700' />
              <span className='text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap'>{data.transmission}</span>
            </div>
          </div>
          
          {/* Price & CTA Section */}
          <div className='flex items-center justify-between w-full pt-2'>
            <div className='flex items-baseline gap-1'>
              <span className='text-2xl sm:text-3xl font-bold text-gray-900'>${data.price.toLocaleString()}</span>
            </div>
            
            <button className='bg-black hover:bg-gray-800 active:bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap'>
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCarCard
