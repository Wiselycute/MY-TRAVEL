import React from 'react'
import Image from 'next/image'

const HeroComponent = () => {
  return (
    <div className='max-w-7xl bg-background mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20'>
      <div className='flex flex-col bg-background md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-18'>
        
        {/* Left Content Section */}
        <div className='flex flex-col items-start w-full md:w-1/2 space-y-2'>
          {/* Main Heading */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold '>
            <span className='block text-[#FFA500]'>Buy, Sell & Rent</span>
            <span className='block text-[#FFA500] mt-2'>reputable cars</span>
          </h1>
          
          {/* Subtitle */}
          <p className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-md'>
            Buy and Sell reputable cars. Renting a car is easy and fast with TopCar
          </p>
          
          {/* Stats Section */}
          <div className='flex flex-row items-center gap-8 lg:gap-12 mt-5 pt-4 lg:pt-2'>
            <div className='flex flex-col items-start'>
              <span className='font-bold text-5xl lg:text-6xl text-primary'>50+</span>
              <span className='text-base lg:text-lg font-semibold text-[#7A6060] mt-2'>Car brands</span>
            </div>
            
            {/* Divider */}
            <div className='h-16 lg:h-20 w-px bg-[#DBD7D7]' />
            
            <div className='flex flex-col items-start'>
              <span className='font-bold text-5xl lg:text-6xl text-primary'>10k+</span>
              <span className='text-base lg:text-lg font-semibold text-[#7A6060] mt-2'>Clients</span>
            </div>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
          <div className='relative w-full max-w-[850px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]'>
            <Image
              src="/assets/images/car_herosec.png"
              alt="Premium car showcase"
              fill
              className='object-contain'
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroComponent
