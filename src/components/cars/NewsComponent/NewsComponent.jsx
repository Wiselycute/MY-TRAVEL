// components/CTAComponent/CTAComponent.jsx
import React from 'react'

const NewsComponent = () => {
  return (
    <section className='relative w-full py-16 md:py-20 lg:py-24 overflow-hidden'>
      {/* Background Image */}
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/assets/images/morecar_info_bg.png')" }}
      >
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]' />
      </div>
      
      {/* Content Container */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-start lg:justify-end'>
          {/* Content Box */}
          <div className='max-w-xl w-full lg:w-auto md:bg-white/10 lg:bg-none lg:backdrop-blur-none md:backdrop-blur-md  rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl'>
            {/* Title */}
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
              CAR NEWS
            </h2>
            
            {/* Description */}
            <p className='text-base sm:text-lg text-white/90 leading-relaxed mb-8'>
              More than 5000 car owners are selling and effectively renting on Topcar. Register to become our partner today to increase your monthly income.
            </p>
            
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4'>
              <button className='flex-1 sm:flex-none bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100'>
                Register
              </button>
              
              <button className='flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100'>
                Post News
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsComponent
