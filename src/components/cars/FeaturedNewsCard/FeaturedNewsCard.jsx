// components/FeaturedNewsCard/FeaturedNewsCard.jsx
import { Flame, MoveRight } from 'lucide-react'
import Image                from 'next/image'
import React                from 'react'

const FeaturedNewsCard = ({ data }) => {
  return (
    <div className='w-full max-w-[352px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group'>
      
      {/* Image Section */}
      <div className='w-full h-[200px] sm:h-[220px] relative overflow-hidden bg-gray-100'>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
          sizes="(max-width: 640px) 100vw, 352px"
          priority
        />
      </div>
      
      {/* Content Section */}
      <div className='flex flex-col p-4 sm:p-5'>
        <div className='w-full flex flex-col gap-3'>
          
          {/* Title */}
          <h3 className='text-lg sm:text-xl font-bold text-gray-900 leading-tight w-full line-clamp-2'>
            {data.title}
          </h3>
          
          {/* Description */}
          <p className='text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 w-full'>
            {data.description}
          </p>
          
          {/* Footer Meta Section */}
          <div className='flex items-center justify-between w-full pt-1'>
            {/* Trending Badge */}
            {data.trending && (
              <div className='flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-yellow-50 px-3 py-1.5 rounded-full border border-orange-200'>
                <Flame className='w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0' fill='#FF6B00' stroke='#FF6B00' />
                <span className='text-xs sm:text-sm font-semibold text-orange-700'>Trending</span>
              </div>
            )}
            
            {!data.trending && <div />}
            
            {/* Date */}
            <time className='text-xs sm:text-sm text-gray-500 font-medium'>
              {data.date}
            </time>
          </div>
          
          {/* Read More Button */}
          <button className='flex items-center justify-center gap-2 w-full border-2 border-gray-300 hover:border-gray-900 rounded-md py-2.5 sm:py-3 mt-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 group/btn hover:bg-gray-50 active:bg-gray-100'>
            <span>Read more</span>
            <MoveRight className='w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/btn:translate-x-1' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedNewsCard
